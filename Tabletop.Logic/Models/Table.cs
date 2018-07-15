using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabletop.Logic.Interfaces;
using Tabletop.Logic.Models.Actions;
using Tabletop.Logic.Models.Actions.Card;
using Tabletop.Logic.Models.Actions.Deck;
using Tabletop.Logic.Models.Actions.Filter;
using Tabletop.Logic.Models.Actions.In.Card;
using Tabletop.Logic.Models.Actions.In.User;
using Tabletop.Logic.Models.Actions.Out.Card;
using Tabletop.Logic.Models.Actions.Out.User;
using Tabletop.Logic.Models.Actions.User;

namespace Tabletop.Logic.Models
{
    public class Table
    {
        private List<Card> _cards = new List<Card>();
        private List<Deck> _decks = new List<Deck>();
        private List<User> _users = new List<User>();
        private List<Filter> _filters = new List<Filter>();
        private const int _dropRadius = 50;

        public readonly int Height;
        public readonly int Width;

        public Table( int width, int height )
        {
            Height = height;
            Width = width;
        }

        #region Table
        public GetTableAction GetTable( string userId )
        {
            var user = _users.FirstOrDefault( i => i.Id == userId );
            if( user == null )
            {
                throw new ArgumentException( "Пользователь не найден" );
            }

            var action = new GetTableAction( this )
            {
                Cards = _cards.Select( card => new TableCard( card, user ) ).ToList(),
                Decks = _decks.Select( deck => new TableDeck( deck, user ) ).ToList(),
                Users = _users.Select( u => new TableUser( u ) ).ToList(),
                Filters = _filters.Select( filter => new TableFilter( filter ) ).ToList(),
            };
            return action;
        }
        #endregion

        #region Users
        public IEnumerable<ITableAction> Dispatch( AddUserAction action )
        {
            var user = new User( action.Id, action.Name, action.X, action.Y );
            _users.Add( user );
            return new List<ITableAction>
            {
                action
            };
        }
        public IEnumerable<ITableAction> Dispatch( MoveUserAction action )
        {
            var user = _users.FirstOrDefault( i => i.Id == action.Id );
            if( user == null )
            {
                throw new ArgumentException( "Пользователь не найден" );
            }
            user.Move( action.X, action.Y );
            return new List<ITableAction>
            {
                action
            };
        }
        public IEnumerable<ITableAction> Dispatch( InRemoveUserAction action )
        {
            var user = _users.FirstOrDefault( i => i.Id == action.Id );
            if( user == null )
            {
                throw new ArgumentException( "Пользователь не найден" );
            }
            _users.Remove( user );
            var deckToDrop = _decks.FirstOrDefault( i => i.Owner == user );
            var cardToDrop = _cards.FirstOrDefault( i => i.Owner == user );
            deckToDrop?.Drop();
            cardToDrop?.Drop();
            var resievers = _users.Select( i => i.Id ).ToList();
            return new List<ITableAction>
            {
                new OutRemoveUserAction( action.Id, cardToDrop?.Id, deckToDrop?.Id, resievers )
            };
        }
        #endregion

        #region Filters
        public IEnumerable<ITableAction> Dispatch( AddFilterAction action )
        {
            var user = _users.FirstOrDefault( i => i.Id == action.OwnerId );
            if( user == null )
            {
                throw new ArgumentException( "Пользователь не найден" );
            }
            var filter = new Filter( user, action.X, action.Y, action.H, action.W );
            action.Id = filter.Id;
            _filters.Add( filter );
            return new List<ITableAction>
            {
                action
            };
        }
        public IEnumerable<ITableAction> Dispatch( RemoveFilterAction action )
        {
            var filter = _filters.FirstOrDefault( i => i.Id == action.Id );
            if( filter == null )
            {
                throw new ArgumentException( "Фильтр не найден" );
            }
            _filters.Remove( filter );
            return new List<ITableAction>
            {
                action
            };
        }
        #endregion

        #region Cards
        public IEnumerable<ITableAction> Dispatch( AddCardAction action )
        {
            var result = new List<ITableAction>
            {
                action
            };
            var card = new Card( action.ContentTop, action.ContentBottom, action.X, action.Y, 0, action.H, action.W );
            _cards.Add( card );
            action.Id = card.Id;
            var users = UsersWhoCanSee( card );
            action.ResieverIds = users.Select( i => i.Id ).ToList();
            action.Content = card.GetContent();
            action.ContentTop = action.ContentBottom = null;
            if( users.Count() < _users.Count() )
            {
                result.Add( new AddCardAction( card, _users.Except( users ).Select( i => i.Id ).ToList(), true ) );
            }
            return result;
        }
        public IEnumerable<ITableAction> Dispatch( FlipCardAction action )
        {
            var card = _cards.FirstOrDefault( i => i.Id == action.Id );
            if( card == null )
            {
                throw new ArgumentException( "Карта не найдена" );
            }
            var result = new List<ITableAction>
            {
                action
            };
            card.Flip();
            action.Content = card.GetContent();

            var users = UsersWhoCanSee( card );
            action.ResieverIds = users.Select( i => i.Id ).ToList();

            if( users.Count() < _users.Count() )
            {
                result.Add( new FlipCardAction( card, _users.Except( users ).Select( i => i.Id ).ToList(), true ) );
            }

            return result;
        }
        public IEnumerable<ITableAction> Dispatch( CardUpAction action )
        {
            var result = new List<ITableAction>
            {
                action
            };
            var card = _cards.FirstOrDefault( i => i.Id == action.Id );
            if( card == null )
            {
                throw new ArgumentException( "Карта не найдена" );
            }
            action.IsOwner = true;
            action.ResieverIds = new List<string> { action.OwnerId };
            var users = _users.Where( i => action.ResieverIds.Contains( i.Id ) );
            card.Grab( null, 0, 0, 0 );
            card.Alpha = action.Alpha;
            if( users.Count() < _users.Count() )
            {
                result.Add( new CardUpAction( card, _users.Except( users ).Select( i => i.Id ).ToList(), false ) );
            }
            return result;
        }
        public IEnumerable<ITableAction> Dispatch( CardDownAction action )
        {
            var result = new List<ITableAction>
            {
                action
            };
            
            var card = _cards.FirstOrDefault( i => i.Id == action.Id );
            if( card == null )
            {
                throw new ArgumentException( "Карта не найдена" );
            }

            var cards = _cards
                .Select( i => new
                {
                    dist = GetDistance( card, i ),
                    card = i
                } )
                .Where( i => i.dist <= _dropRadius )
                .OrderBy( i => i.dist )
                .Select( i => i.card );
            var decks = _decks
                .Select( i => new
                {
                    dist = GetDistance( card, i ),
                    deck = i
                } )
                .Where( i => i.dist <= _dropRadius )
                .OrderBy( i => i.dist )
                .Select( i => i.deck );

            card.Drop();

            if( decks.Any() )
            {
                var nearestDeck = decks.First();
                nearestDeck.Add( cards );

                var users = UsersWhoCanSee( nearestDeck );

                result.Add( new RemoveCardAction( card ) );
                result.Add( new ChangeDeckAction( nearestDeck, users.Select( i => i.Id ).ToList(), false ) );
                if( users.Count() < _users.Count() )
                {
                    result.Add( new ChangeDeckAction( nearestDeck, _users.Except( users ).Select( i => i.Id ).ToList(), true ) );
                }
                foreach( var c in cards )
                {
                    _cards.Remove( c );
                }
            }
            else if( cards.Count() > 1 )
            {
                var deck = new Deck( cards );
                _decks.Add( deck );

                var users = UsersWhoCanSee( deck );
                result.Add( new AddDeckAction( deck, users.Select( i => i.Id ).ToList(), false ) );
                if( users.Count() < _users.Count() )
                {
                    result.Add( new AddDeckAction( deck, _users.Except( users ).Select( i => i.Id ).ToList(), true ) );
                }

                foreach( var c in cards )
                {
                    _cards.Remove( c );
                    result.Add( new RemoveCardAction( c ) );
                }
            }
            return result;
        }
        public IEnumerable<ITableAction> Dispatch( MoveCardAction action )
        {
            var result = new List<ITableAction>
            {
                action
            };
            var card = _cards.FirstOrDefault( i => i.Id == action.Id );
            if( card == null )
            {
                throw new ArgumentException( "Карта не найдена" );
            }
            (action.X, action.Y) = FixCoords( action.X, action.Y, card.Height, card.Width );

            // пользователи, которые видели карту
            var oldUsers = UsersWhoCanSee( card );
            // пользователи, которые сейчас видят
            card.Move( action.X, action.Y );
            var newUsers = UsersWhoCanSee( card );

            var hideFrom = oldUsers.Except( newUsers );
            var showTo = newUsers.Except( oldUsers );

            if( hideFrom.Any() )
            {
                result.Add( new HideCardContentAction( card, hideFrom.Select( i => i.Id ) ) );
            }
            if( showTo.Any() )
            {
                result.Add( new ShowCardContentAction( card, showTo.Select( i => i.Id ) ) );
            }

            return result;
        }
        #endregion

        public IEnumerable<ITableAction> Dispatch( InAddCardAction action, string userId )
        {
            var user = _users.FirstOrDefault( i => i.Id == userId );
            if( user == null )
            {
                throw new ArgumentException( "Пользователь не найден" );
            }
            var card = new Card( action.ContentTop, action.ContentBottom, action.X, action.Y, user.Alpha, action.H, action.W );
            _cards.Add( card );

            var canSee = UserIdsWhoCanSee( card );
            var canNotSee = _users.Select( i => i.Id ).Except( canSee ).ToList();
            var result = new List<ITableAction>
            {
                new OutAddCardAction( card, canSee, true ),
                new OutAddCardAction( card, canNotSee, false )
            };
            return result;
        }
        public IEnumerable<ITableAction> Dispatch( InFlipCardAction action )
        {
            var card = _cards.FirstOrDefault( i => i.Id == action.Id );
            if( card == null )
            {
                throw new ArgumentException( "Карта не найдена" );
            }
            card.Flip();

            var canSee = UserIdsWhoCanSee( card );
            var canNotSee = _users.Select( i => i.Id ).Except( canSee ).ToList();
            var result = new List<ITableAction>
            {
                new OutFlipCardAction( card, canSee, true ),
                new OutFlipCardAction( card, canNotSee, false )
            };
            return result.Where( i => i.ResieverIds.Any() );
        }
        public IEnumerable<ITableAction> Dispatch( InCardUpAction action, string userId )
        {
            var user = _users.FirstOrDefault( i => i.Id == userId );
            if( user == null )
            {
                throw new ArgumentException( "Пользователь не найден" );
            }
            var card = _cards.FirstOrDefault( i => i.Id == action.Id && !i.IsGrabbed );
            if( card == null )
            {
                throw new ArgumentException( "Карта не найдена" );
            }
            card.Grab( user, action.Mx, action.My, action.Alpha );

            var others = _users.Where( i => i.Id != userId ).Select( i => i.Id ).ToList();
            var result = new List<ITableAction>
            {
                new OutGrabCardAction( card, userId ),
                new OutUpCardAction( card, others )
            };
            return result;
        }
        public IEnumerable<ITableAction> Dispatch( InDropCardAction action, string userId )
        {
            var card = _cards.Where( i => i.IsGrabbed && i.Owner.Id == userId ).FirstOrDefault();
            if( card == null )
            {
                throw new ArgumentException( "Карта не найдена" );
            }

            (action.X, action.Y) = FixCoords( action.X, action.Y, card.Height, card.Width );
            card.Move( action.X, action.Y );
            card.Drop();

            var cards = _cards
                .Select( i => new
                {
                    dist = GetDistance( card, i ),
                    card = i
                } )
                .Where( i => i.dist <= _dropRadius )
                .OrderBy( i => i.dist )
                .Select( i => i.card );
            var decks = _decks
                .Select( i => new
                {
                    dist = GetDistance( card, i ),
                    deck = i
                } )
                .Where( i => i.dist <= _dropRadius )
                .OrderBy( i => i.dist )
                .Select( i => i.deck );

            if( decks.Any() )
            {
                var nearestDeck = decks.First();
                nearestDeck.Add( card );

                var showTo = UsersWhoCanSee( nearestDeck );
                var showToIds = showTo.Select( i => i.Id ).ToList();
                var hideFromIds = _users.Except( showTo ).Select( i => i.Id ).ToList();
                return new List<ITableAction>
                {
                    new OutPutCardInDeckAction( nearestDeck, showToIds, true ),
                    new OutPutCardInDeckAction( nearestDeck, hideFromIds, false )
                };
            }
            else if( cards.Count() > 1 )
            {
                var deck = new Deck( cards );
                _decks.Add( deck );

                var showTo = UsersWhoCanSee( deck );
                var showToIds = showTo.Select( i => i.Id ).ToList();
                var hideFromIds = _users.Except( showTo ).Select( i => i.Id ).ToList();
                return new List<ITableAction>
                {
                    new OutCreateDeckAction( cards, deck, showToIds, true ),
                    new OutCreateDeckAction( cards, deck, hideFromIds, false )
                };
            }

            return new List<ITableAction>
            {
                new OutDropCardAction( card, _users.Select( i => i.Id ).ToList() )
            };
        }
        public IEnumerable<ITableAction> Dispatch( InMoveCardAction action, string userId )
        {
            var card = _cards.FirstOrDefault( i => i.Id == action.Id );
            if( card == null )
            {
                throw new ArgumentException( "Карта не найдена" );
            }
            (action.X, action.Y) = FixCoords( action.X, action.Y, card.Height, card.Width );
            var oldShownTo = UsersWhoCanSee( card );
            card.Move( action.X, action.Y );
            var newShownTo = UsersWhoCanSee( card );

            var showToIds = newShownTo.Except( oldShownTo ).Select( i => i.Id ).ToList();
            var hideFromIds = oldShownTo.Except( newShownTo ).Select( i => i.Id ).ToList();
            var notChanged = _users
                .Where( u => !showToIds.Contains( u.Id ) && !hideFromIds.Contains( u.Id ) && u.Id != userId )
                .Select( u => u.Id )
                .ToList();

            var result = new List<ITableAction>();
            if( showToIds.Contains( userId ) )
            {
                result.Add( new OutChangeCardContent( card, new List<string> { userId }, true ) );
                result.Add( new OutMoveCardAndChangeContentAction( card, showToIds.Except( new[] { userId } ).ToList(), true ) );
                result.Add( new OutMoveCardAndChangeContentAction( card, hideFromIds, false ) );
            }
            else if( hideFromIds.Contains( userId ) )
            {
                result.Add( new OutChangeCardContent( card, new List<string> { userId }, false ) );
                result.Add( new OutMoveCardAndChangeContentAction( card, showToIds, true ) );
                result.Add( new OutMoveCardAndChangeContentAction( card, hideFromIds.Except( new[] { userId } ).ToList(), false ) );
            }
            else
            {
                result.Add( new OutMoveCardAndChangeContentAction( card, showToIds, true ) );
                result.Add( new OutMoveCardAndChangeContentAction( card, hideFromIds, false ) );
            }
            result.Add( new OutMoveCardAction( card, notChanged ) );
            return result.Where( i => i.ResieverIds.Any() );
        }

        #region Decks
        public IEnumerable<ITableAction> Dispatch( FlipDeckAction action )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == action.Id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            var result = new List<ITableAction>
            {
                action
            };

            deck.Flip();
            action.Content = deck.GetContent();
            
            var users = UsersWhoCanSee( deck );
            action.ResieverIds = users.Select( i => i.Id ).ToList();

            if( users.Count() < _users.Count() )
            {
                result.Add( new FlipDeckAction( deck, _users.Except( users ).Select( i => i.Id ).ToList(), true ) );
            }

            return result;
        }
        public IEnumerable<ITableAction> Dispatch( DeckUpAction action )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == action.Id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            action.IsOwner = true;
            action.ResieverIds = new List<string> { action.OwnerId };
            var users = _users.Where( i => i.Id != action.OwnerId ).Select( i => i.Id ).ToList();
            var result = new List<ITableAction>
            {
                action,
                new DeckUpAction( deck, users, false )
            };
            deck.Grab( null, 0, 0, 0 );
            return result;
        }
        public IEnumerable<ITableAction> Dispatch( DeckDownAction action )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == action.Id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            deck.Drop();
            return new List<ITableAction>
            {
                action
            };
        }
        public IEnumerable<ITableAction> Dispatch( MoveDeckAction action )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == action.Id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            (action.X, action.Y) = FixCoords( action.X, action.Y, deck.Height, deck.Width );
            var result = new List<ITableAction>
            {
                action
            };

            // пользователи, которые видели колоду
            var oldUsers = UsersWhoCanSee( deck );

            // пользователи, которые сейчас видят
            deck.Move( action.X, action.Y );
            var newUsers = UsersWhoCanSee( deck );

            var hideFrom = oldUsers.Except( newUsers );
            var showTo = newUsers.Except( oldUsers );

            if( hideFrom.Any() )
            {
                result.Add( new HideDeckContentAction( deck, hideFrom.Select( i => i.Id ) ) );
            }
            if( showTo.Any() )
            {
                result.Add( new ShowDeckContentAction( deck, showTo.Select( i => i.Id ) ) );
            }

            return result;
        }
        public IEnumerable<ITableAction> Dispatch( TakeTopDeckCardAction action )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == action.Id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }

            var result = new List<ITableAction>();

            var card = deck.TakeTop();
            _cards.Add( card );
            card.Grab( null, 0, 0, 0 );
            var users = UsersWhoCanSee( deck );
            if( deck.Length > 1 )
            {
                action.Content = deck.GetContent();
                action.Length = deck.Length;
                result.Add( action );
            }
            else
            {
                var lastCard = deck.TakeTop();
                _cards.Add( lastCard );
                _decks.Remove( deck );
                result.Add( new AddCardAction( lastCard, users.Select( i => i.Id ).ToList(), false ) );
                if( users.Count() < _users.Count() )
                {
                    result.Add( new AddCardAction( lastCard, _users.Except( users ).Select( i => i.Id ).ToList(), true ) );
                }
                result.Add( new RemoveDeckAction( deck ) );
            }
            result.Add( new AddCardAction( card, users.Select( i => i.Id ).ToList(), false )
            {
                Mx = action.Mx,
                My = action.My,
                IsOwner = true
            } );
            if( users.Count() < _users.Count() )
            {
                result.Add( new AddCardAction( card, _users.Except( users ).Select( i => i.Id ).ToList(), true )
                {
                    Mx = action.Mx,
                    My = action.My,
                    IsOwner = true
                } );
            }

            return result;
        }
        public IEnumerable<ITableAction> Dispatch( ShuffleDeckAction action )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == action.Id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            deck.Shuffle();
            action.Content = deck.GetContent();
            return new List<ITableAction>
            {
                action
            };
        }
        #endregion

        #region private
        /// <summary>
        /// Кто из пользователей может видеть объект
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        private List<User> UsersWhoCanSee( IDraggable obj )
        {
            return _users
                .Where( i => _filters.All( j => !j.IsFiltered( obj ) || j.Owner == i ) )
                .ToList();
        }
        private List<string> UserIdsWhoCanSee( IDraggable obj )
        {
            return UsersWhoCanSee( obj ).Select( i => i.Id ).ToList();
        }
        /// <summary>
        /// Расстояние между центрами объектов
        /// </summary>
        /// <param name="obj1"></param>
        /// <param name="obj2"></param>
        /// <returns></returns>
        private double GetDistance( IObject obj1, IObject obj2 )
        {
            var dx = obj1.X - obj2.X;
            var dy = obj1.Y - obj2.Y;
            return Math.Sqrt( dx * dx + dy * dy );
        }
        /// <summary>
        /// Для того, чтобы координаты не выходили за пределы стола
        /// </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <param name="objHeigth"></param>
        /// <param name="objWidth"></param>
        /// <returns></returns>
        private (int, int) FixCoords(int x, int y, int objHeigth, int objWidth)
        {
            var maxX = Width - objWidth;
            var maxY = Height - objHeigth;
            if( x < 0 )
            {
                x = 0;
            }
            else if( x > maxX )
            {
                x = maxX;
            }
            if( y < 0 )
            {
                y = 0;
            }
            else if( y > maxY )
            {
                y = maxY;
            }
            return (x, y);
        }
        #endregion
    }
}
