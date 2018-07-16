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
            X = Convert.ToInt32( cards.Average( i => i.X ) );
            Y = Convert.ToInt32( cards.Average( i => i.Y ) );
            _hd2 = Height / 2;
            _wd2 = Width / 2;
            Radius = Convert.ToInt32( Math.Sqrt( Height * Height + Width * Width ) );
        }

        private List<Card> _cards;
        private readonly Random _rnd = new Random();

        public Guid Id { get; } = Guid.NewGuid();

        public readonly int Height;

        public readonly int Width;

        private readonly int _hd2;
        private readonly int _wd2;

        #region impl
        private bool _isGrabbed;

        public int X { get; protected set; }
        public int Y { get; protected set; }
        public int Z { get; protected set; }
        public double Alpha { get; protected set; }
        public int Mx { get; protected set; }
        public int My { get; protected set; }

        public void Drop()
        {
            if( !_isGrabbed )
            {
                throw new MethodAccessException( $"Колода не была взята. Id: {Id}" );
            }
            _isGrabbed = false;
            Owner = null;
        }

        public void Flip()
        {
            _cards.Reverse();
            foreach( var card in _cards )
            {
                card.Flip();
            }
        }

        public void Grab( User owner, int mx, int my, double alpha )
        {
            if( _isGrabbed )
            {
                throw new MethodAccessException( $"Колода уже была взята. Id: {Id}, UserId: {owner.Id}, OwnerId: {Owner.Id}" );
            }
            Owner = owner;
            Alpha = alpha;
            Mx = mx;
            My = my;
            _isGrabbed = true;
        }

        public User Owner { get; protected set; }

        public bool IsGrabbed => _isGrabbed;

        public void Move( int x, int y )
        {
            X = x;
            Y = y;
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

        public int Radius { get; protected set; }
        #endregion

        public int Length { get => _cards.Count; }

        public void Add( Card card )
        {
            _cards.Insert( 0, card );
        }

        public void Add( IEnumerable<Card> cards )
        {
            _cards.InsertRange( 0, cards );
        }

        public void Add( Deck deck )
        {
            Add( deck._cards );
        }

        public Card TakeTop()
        {
            if( _cards.Count == 0 )
            {
                throw new ArgumentException( "Колода пуста" );
            }
            var card = _cards.First();
            _cards.RemoveAt( 0 );
            card.Id = Guid.NewGuid();
            card.Move( X, Y );

            return card;
        }

        public void Shuffle()
        {
            _cards = _cards.OrderBy( i => _rnd.Next() ).ToList();
        }
    }
}
