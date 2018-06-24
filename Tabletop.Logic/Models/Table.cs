using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabletop.Logic.Interfaces;
using Tabletop.Logic.Models.Actions;
using Tabletop.Logic.Models.Actions.Card;
using Tabletop.Logic.Models.Actions.Deck;

namespace Tabletop.Logic.Models
{
    public class Table
    {
        private List<Card> _cards = new List<Card>();
        private List<Deck> _decks = new List<Deck>();
        private const int _dropRadius = 50;

        public readonly int Height;
        public readonly int Width;

        public Table( int width, int height )
        {
            Height = height;
            Width = width;
        }

        #region Table
        public GetTableAction GetTable()
        {
            var action = new GetTableAction( this )
            {
                Cards = _cards.Select( card => new TableCard( card ) ).ToList(),
                Decks = _decks.Select( deck => new TableDeck( deck ) ).ToList()
            };
            return action;
        }
        #endregion

        #region Cards
        public IEnumerable<ITableAction> Dispatch( AddCardAction action )
        {
            var card = new Card( action.ContentTop, action.ContentBottom, action.H, action.W );
            card.Move( action.X, action.Y );
            _cards.Add( card );
            action.Id = card.Id;
            action.Content = card.GetContent();
            action.ContentTop = action.ContentBottom = null;
            return new List<ITableAction>
            {
                action
            };
        }
        public IEnumerable<ITableAction> Dispatch( FlipCardAction action )
        {
            var card = _cards.FirstOrDefault( i => i.Id == action.Id );
            if( card == null )
            {
                throw new ArgumentException( "Карта не найдена" );
            }
            card.Flip();
            action.Content = card.GetContent();
            return new List<ITableAction>
            {
                action
            };
        }
        public IEnumerable<ITableAction> Dispatch( CardUpAction action )
        {
            var card = _cards.FirstOrDefault( i => i.Id == action.Id );
            if( card == null )
            {
                throw new ArgumentException( "Карта не найдена" );
            }
            card.Grab();
            return new List<ITableAction>
            {
                action
            };
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

                result.Add( new RemoveCardAction( card ) );
                result.Add( new ChangeDeckAction( nearestDeck ) );
                foreach( var c in cards )
                {
                    _cards.Remove( c );
                }
            }
            else if( cards.Count() > 1 )
            {
                var deck = new Deck( cards );
                _decks.Add( deck );

                result.Add( new AddDeckAction( deck ) );
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
            var card = _cards.FirstOrDefault( i => i.Id == action.Id );
            if( card == null )
            {
                throw new ArgumentException( "Карта не найдена" );
            }
            (action.X, action.Y) = FixCoords( action.X, action.Y, card.Height, card.Width );
            card.Move( action.X, action.Y );
            return new List<ITableAction>
            {
                action
            };
        }
        #endregion

        #region Decks
        public IEnumerable<ITableAction> Dispatch( FlipDeckAction action )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == action.Id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            deck.Flip();
            action.Content = deck.GetContent();
            return new List<ITableAction>
            {
                action
            };
        }
        public IEnumerable<ITableAction> Dispatch( DeckUpAction action )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == action.Id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            deck.Grab();
            return new List<ITableAction>
            {
                action
            };
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
            deck.Move( action.X, action.Y );
            return new List<ITableAction>
            {
                action
            };
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
            result.Add( new AddCardAction( card ) );
            result.Add( new CardUpAction( card ) );
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
                result.Add( new AddCardAction( lastCard ) );
                result.Add( new RemoveDeckAction( deck ) );
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

        private double GetDistance( IObject obj1, IObject obj2 )
        {
            var dx = obj1.X - obj2.X;
            var dy = obj1.Y - obj2.Y;
            return Math.Sqrt( dx * dx + dy * dy );
        }
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
    }
}
