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
using Tabletop.Logic.Models.Actions.In.Chat;
using Tabletop.Logic.Models.Actions.In.Deck;
using Tabletop.Logic.Models.Actions.In.Filter;
using Tabletop.Logic.Models.Actions.In.User;
using Tabletop.Logic.Models.Actions.Out.Card;
using Tabletop.Logic.Models.Actions.Out.Chat;
using Tabletop.Logic.Models.Actions.Out.Deck;
using Tabletop.Logic.Models.Actions.Out.Filter;
using Tabletop.Logic.Models.Actions.Out.Table;
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
        private List<string> _colors = new List<string>
        {
            "#E53935",
            "#2196F3",
            "#43A047",
            "#FDD835",
            "#5E35B1",
            "#009688",
            "#E91E63",
            "#795548",
        };
        private const int _dropRadius = 50;

        public readonly int Height;
        public readonly int Width;

        public Table( int width, int height )
        {
            Height = height;
            Width = width;
        }

        #region Chat
        public IEnumerable<ITableAction> Dispatch( InSendMessageAction action, string userId )
        {
            var user = _users.FirstOrDefault( i => i.Id == userId );
            if( user == null )
            {
                throw new ArgumentException( "Пользователь не найден" );
            }
            return new List<ITableAction>
            {
                new OutSendMessageAction( user, action.Message ),
            };
        }
        #endregion

        #region Table
        public IEnumerable<ITableAction> Dispatch( InConnectAction action, string userId )
        {
            var color = GetNextColor();
            var user = new User( userId, action.Name, 0, 0, color );
            _users.Add( user );

            return new List<ITableAction>
            {
                new OutAddUserAction( user ),
                new OutGetTableAction( this )
                {
                    Cards = _cards.Select( card => new TableCard( card, user ) ).ToList(),
                    Decks = _decks.Select( deck => new TableDeck( deck, user ) ).ToList(),
                    Users = _users.Select( u => new TableUser( u ) ).ToList(),
                    Filters = _filters.Select( filter => new TableFilter( filter ) ).ToList(),
                },
            };
        }
        #endregion

        #region Users
        public IEnumerable<ITableAction> Dispatch( AddUserAction action )
        {
            action.Color = GetNextColor();
            var user = new User( action.Id, action.Name, action.X, action.Y, action.Color );
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
            _colors.Add( user.Color );
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
        public IEnumerable<ITableAction> Dispatch( InAddFilterAction action, string userId )
        {
            var user = _users.FirstOrDefault( i => i.Id == userId );
            if( user == null )
            {
                throw new ArgumentException( "Пользователь не найден" );
            }
            var filter = new Filter( user, action.X, action.Y, action.H, action.W, action.Alpha );
            _filters.Add( filter );

            var canSee = _users.Where( i => i.Id != userId ).Select( i => i.Id ).ToList();
            var canNotSee = new List<string> { userId };

            var cardsToHide = _cards.Where( i => filter.IsFiltered( i ) ).ToList();
            var decksToHide = _decks.Where( i => filter.IsFiltered( i ) ).ToList();

            return new List<ITableAction>
            {
                new OutAddFilterAction( user, filter, new List<Card>(), new List<Deck>(), canSee ),
                new OutAddFilterAction( user, filter, cardsToHide, decksToHide, canNotSee )
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
            return result.Where( i => i.Resiever != Resiever.Special || i.ResieverIds.Any() );
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
            
            var result = new List<ITableAction>
            {
                new OutGrabCardAction( card ),
                new OutUpCardAction( card )
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
                .Select( i => i.card )
                .ToList();
            var decks = _decks
                .Select( i => new
                {
                    dist = GetDistance( card, i ),
                    deck = i
                } )
                .Where( i => i.dist <= _dropRadius )
                .OrderBy( i => i.dist )
                .Select( i => i.deck )
                .ToList();

            if( decks.Any() )
            {
                var nearestDeck = decks.First();
                nearestDeck.Add( card );
                _cards.Remove( card );

                var showTo = UsersWhoCanSee( nearestDeck );
                var showToIds = showTo.Select( i => i.Id ).ToList();
                var hideFromIds = _users.Except( showTo ).Select( i => i.Id ).ToList();
                return new List<ITableAction>
                {
                    new OutPutCardInDeckAction( card, nearestDeck, showToIds, true ),
                    new OutPutCardInDeckAction( card, nearestDeck, hideFromIds, false )
                };
            }
            if( cards.Count() > 1 )
            {
                var deck = new Deck( cards );
                _decks.Add( deck );
                foreach( var c in cards )
                {
                    _cards.Remove( c );
                }

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
                new OutDropCardAction( card )
            };
        }
        public IEnumerable<ITableAction> Dispatch( InMoveCardAction action, string userId )
        {
            var card = _cards.FirstOrDefault( i => i.Id == action.Id && i.IsGrabbed && i.Owner.Id == userId );
            if( card == null )
            {
                return new List<ITableAction>();
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
                result.Add( new OutChangeCardContent( card, true ) );
                result.Add( new OutMoveCardAndChangeContentAction( card, showToIds.Except( new[] { userId } ).ToList(), true ) );
                result.Add( new OutMoveCardAndChangeContentAction( card, hideFromIds, false ) );
            }
            else if( hideFromIds.Contains( userId ) )
            {
                result.Add( new OutChangeCardContent( card, false ) );
                result.Add( new OutMoveCardAndChangeContentAction( card, showToIds, true ) );
                result.Add( new OutMoveCardAndChangeContentAction( card, hideFromIds.Except( new[] { userId } ).ToList(), false ) );
            }
            else
            {
                result.Add( new OutMoveCardAndChangeContentAction( card, showToIds, true ) );
                result.Add( new OutMoveCardAndChangeContentAction( card, hideFromIds, false ) );
            }
            result.Add( new OutMoveCardAction( card, notChanged ) );
            return result.Where( i => i.Resiever != Resiever.Special || i.ResieverIds.Any() );
        }
        #endregion

        #region Decks
        public IEnumerable<ITableAction> Dispatch( InFlipDeckAction action )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == action.Id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            deck.Flip();

            var canSee = UserIdsWhoCanSee( deck );
            var canNotSee = _users.Select( i => i.Id ).Except( canSee ).ToList();
            var result = new List<ITableAction>
            {
                new OutFlipDeckAction( deck, canSee, true ),
                new OutFlipDeckAction( deck, canNotSee, false )
            };
            return result.Where( i => i.Resiever != Resiever.Special || i.ResieverIds.Any() );
        }
        public IEnumerable<ITableAction> Dispatch( InDeckUpAction action, string userId )
        {
            var user = _users.FirstOrDefault( i => i.Id == userId );
            if( user == null )
            {
                throw new ArgumentException( "Пользователь не найден" );
            }
            var deck = _decks.FirstOrDefault( i => i.Id == action.Id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            deck.Grab( user, action.Mx, action.My, action.Alpha );
            
            return new List<ITableAction>
            {
                new OutGrabDeckAction( deck ),
                new OutDeckUpAction( deck )
            };
        }
        public IEnumerable<ITableAction> Dispatch( InMoveDeckAction action, string userId )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == action.Id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            (action.X, action.Y) = FixCoords( action.X, action.Y, deck.Height, deck.Width );
            var oldShownTo = UsersWhoCanSee( deck );
            deck.Move( action.X, action.Y );
            var newShownTo = UsersWhoCanSee( deck );

            var showToIds = newShownTo.Except( oldShownTo ).Select( i => i.Id ).ToList();
            var hideFromIds = oldShownTo.Except( newShownTo ).Select( i => i.Id ).ToList();
            var notChanged = _users
                .Where( u => !showToIds.Contains( u.Id ) && !hideFromIds.Contains( u.Id ) && u.Id != userId )
                .Select( u => u.Id )
                .ToList();
            
            var result = new List<ITableAction>();
            if( showToIds.Contains( userId ) )
            {
                result.Add( new OutChangeDeckContent( deck, true ) );
                result.Add( new OutMoveDeckAndChangeContentAction( deck, showToIds.Except( new[] { userId } ).ToList(), true ) );
                result.Add( new OutMoveDeckAndChangeContentAction( deck, hideFromIds, false ) );
            }
            else if( hideFromIds.Contains( userId ) )
            {
                result.Add( new OutChangeDeckContent( deck, false ) );
                result.Add( new OutMoveDeckAndChangeContentAction( deck, showToIds, true ) );
                result.Add( new OutMoveDeckAndChangeContentAction( deck, hideFromIds.Except( new[] { userId } ).ToList(), false ) );
            }
            else
            {
                result.Add( new OutMoveDeckAndChangeContentAction( deck, showToIds, true ) );
                result.Add( new OutMoveDeckAndChangeContentAction( deck, hideFromIds, false ) );
            }
            result.Add( new OutMoveDeckAction( deck, notChanged ) );
            return result.Where( i => i.Resiever != Resiever.Special || i.ResieverIds.Any() );
        }
        public IEnumerable<ITableAction> Dispatch( InDropDeckAction action, string userId )
        {
            var deck = _decks.Where( i => i.IsGrabbed && i.Owner.Id == userId ).FirstOrDefault();
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }

            (action.X, action.Y) = FixCoords( action.X, action.Y, deck.Height, deck.Width );
            deck.Move( action.X, action.Y );
            deck.Drop();

            var decks = _decks
                .Where( i => i.Id != deck.Id )
                .Select( i => new
                {
                    dist = GetDistance( deck, i ),
                    deck = i
                } )
                .Where( i => i.dist <= _dropRadius )
                .OrderBy( i => i.dist )
                .Select( i => i.deck )
                .ToList();

            if( decks.Any() )
            {
                var nearestDeck = decks.First();
                nearestDeck.Add( deck );
                _decks.Remove( deck );
                
                return new List<ITableAction>
                {
                    new OutMergeDecksAction( deck, nearestDeck )
                };
            }

            return new List<ITableAction>
            {
                new OutDropDeckAction( deck )
            };
        }
        public IEnumerable<ITableAction> Dispatch( InShuffleDeckAction action )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == action.Id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            deck.Shuffle();

            var showTo = UsersWhoCanSee( deck );
            var showToIds = showTo.Select( i => i.Id ).ToList();
            var hideFromIds = _users.Except( showTo ).Select( i => i.Id ).ToList();
            return new List<ITableAction>
            {
                new OutShuffleDeckAction( deck, showToIds, true ),
                new OutShuffleDeckAction( deck, hideFromIds, false ),
            };
        }
        public IEnumerable<ITableAction> Dispatch( InTakeTopDeckCardAction action, string userId )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == action.Id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            var user = _users.FirstOrDefault( i => i.Id == userId );
            if( user == null )
            {
                throw new ArgumentException( "Пользователь не найден" );
            }
            var card = deck.TakeTop();
            _cards.Add( card );
            card.Grab( user, action.Mx, action.My, action.Alpha );
            
            var showTo = UsersWhoCanSee( deck );
            var showToIds = showTo.Select( i => i.Id ).ToList();
            var hideFromIds = _users.Except( showTo ).Select( i => i.Id ).ToList();
            

            if( deck.Length > 1 )
            {
                return new List<ITableAction>
                {
                    new OutTakeTopDeckCardAction( card, deck, showToIds, true ),
                    new OutTakeTopDeckCardAction( card, deck, hideFromIds, false ),
                };
            }
            else
            {
                var lastCard = deck.TakeTop();
                _cards.Add( lastCard );
                _decks.Remove( deck );
                return new List<ITableAction>
                {
                    new OutTakeTopDeckCardAction( card, lastCard, deck, showToIds, true ),
                    new OutTakeTopDeckCardAction( card, lastCard, deck, hideFromIds, false ),
                };
            }
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
        private string GetNextColor()
        {
            if(!_colors.Any())
            {
                return "#000000";
            }
            var color = _colors.First();
            _colors.RemoveAt( 0 );
            return color;
        }
        #endregion
    }
}
