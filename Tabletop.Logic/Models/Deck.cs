using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Tabletop.Logic.Interfaces;

namespace Tabletop.Logic.Models
{
    public class Deck : IDraggable, IFlippable
    {
        public Deck( IEnumerable<Card> cards )
        {
            if( cards.Count() < 2 )
            {
                throw new ArgumentException( "Нельзя создать колоду из менее чем двух карт" );
            }
            var height = cards.First().Height;
            var width = cards.First().Width;
            if( cards.Any( i => i.Height != height || i.Width != width ) )
            {
                throw new ArgumentException( "Формат карт для колоды не одинаков" );
            }
            Height = height;
            Width = width;
            _cards = cards.ToList();
        }

        #region impl
        private bool _isGrabbed;

        public int X { get; protected set; } = 0;

        public int Y { get; protected set; } = 0;

        public int Z { get; protected set; } = 0;

        public void Drop()
        {
            _isGrabbed = false;
        }

        public void Flip()
        {
            _cards.Reverse();
            foreach( var card in _cards )
            {
                card.Flip();
            }
        }

        public void Grab()
        {
            _isGrabbed = true;
        }

        public bool IsGrabbed() => _isGrabbed;

        public void Move( int x, int y )
        {
            X = x;
            Y = y;
        }
        #endregion

        private readonly List<Card> _cards;
        private readonly Random _rnd = new Random();

        public Guid Id { get; } = Guid.NewGuid();

        public readonly int Height;

        public readonly int Width;

        public int Length { get => _cards.Count; }

        public void Add( Card card )
        {
            _cards.Add( card );
        }

        public void Add( IEnumerable<Card> cards )
        {
            _cards.AddRange( cards );
        }

        public Card TakeTop()
        {
            if( _cards.Count == 0 )
            {
                throw new ArgumentException( "Колода пуста" );
            }
            var card = _cards.First();
            _cards.RemoveAt( 0 );

            return card;
        }

        public void Shuffle()
        {
            _cards.OrderBy( i => _rnd.Next() );
        }

        public string GetContent()
        {
            if( _cards.Count == 0 )
            {
                throw new ArgumentException( "Колода пуста" );
            }
            else
            {
                return _cards.First().GetContent();
            }
        }
    }
}
