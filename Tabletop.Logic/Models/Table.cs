using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabletop.Logic.Interfaces;

namespace Tabletop.Logic.Models
{
    public class Table
    {
        private List<Card> _cards;
        private List<Deck> _decks;
        private const int _dropRadius = 50;

        public readonly int Height;
        public readonly int Width;

        public Table( int width, int height )
        {
            Height = height;
            Width = width;
        }

        #region Cards
        public void FlipCard( Guid id )
        {
            var card = _cards.FirstOrDefault( i => i.Id == id );
            if( card == null )
            {
                throw new ArgumentException( "Карта не найдена" );
            }
            card.Flip();
        }
        public void GrabCard( Guid id )
        {
            var card = _cards.FirstOrDefault( i => i.Id == id );
            if( card == null )
            {
                throw new ArgumentException( "Карта не найдена" );
            }
            card.Grab();
        }
        public void DropCard( Guid id )
        {
            var card = _cards.FirstOrDefault( i => i.Id == id );
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

            if( decks.Any() )
            {
                var nearestDeck = decks.First();
                nearestDeck.Add( card );
                nearestDeck.Add( cards );
            }
            else if( cards.Any() )
            {
                _decks.Add( new Deck( cards ) );
            }
            card.Drop();
        }
        public void MoveCard( Guid id, int x, int y )
        {
            var card = _cards.FirstOrDefault( i => i.Id == id );
            if( card == null )
            {
                throw new ArgumentException( "Карта не найдена" );
            }
            (x, y) = FixCoords( x, y, card.Height, card.Width );
            card.Move( x, y );
        }
        #endregion

        #region Decks
        public void FlipDeck( Guid id )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            deck.Flip();
        }
        public void GrabDeck( Guid id )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            deck.Grab();
        }
        public void DropDeck( Guid id )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            deck.Drop();
        }
        public void MoveDeck( Guid id, int x, int y )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            (x, y) = FixCoords( x, y, deck.Height, deck.Width );
            deck.Move( x, y );
        }
        public void GetFromDeck( Guid id )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            var card = deck.TakeTop();
            if( deck.Length == 0 )
            {
                _decks.Remove( deck );
            }
            _cards.Add( card );
        }
        public void ShuffleDeck( Guid id )
        {
            var deck = _decks.FirstOrDefault( i => i.Id == id );
            if( deck == null )
            {
                throw new ArgumentException( "Колода не найдена" );
            }
            deck.Shuffle();
        }
        #endregion

        private double GetDistance( IObject obj1, IObject obj2 )
        {
            return Math.Sqrt( (obj1.X - obj2.X)^2 + (obj1.Y - obj2.Y) ^ 2 );
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
