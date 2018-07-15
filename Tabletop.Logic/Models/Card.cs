using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabletop.Logic.Interfaces;

namespace Tabletop.Logic.Models
{
    public enum CardSideEnum
    {
        Top = 0,
        Bottom = 1
    }

    public class Card : IDraggable, IFlippable
    {
        public Card( string topContent, string bottomContent, int x, int y, double alpha, int height, int width )
        {
            X = x;
            Y = y;
            Alpha = alpha;
            _topContent = topContent;
            _bottomContent = bottomContent;
            Height = height;
            Width = width;
            _hd2 = Height / 2;
            _wd2 = Width / 2;
            Radius = Convert.ToInt32( Math.Sqrt( Height * Height + Width * Width ) );
        }

        private readonly string _topContent;
        private readonly string _bottomContent;

        public Guid Id { get; set; } = Guid.NewGuid();
        public readonly int Height;
        public readonly int Width;

        private readonly int _hd2;
        private readonly int _wd2;

        #region impl

        private bool _isGrabbed;

        private CardSideEnum _side;

        public int X { get; protected set; }
        public int Y { get; protected set; }
        public int Z { get; protected set; }
        public int Mx { get; protected set; }
        public int My { get; protected set; }
        public double Alpha { get; set; }

        public CardSideEnum Side => _side;

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
            if(_side == CardSideEnum.Top)
            {
                _side = CardSideEnum.Bottom;
            }
            else
            {
                _side = CardSideEnum.Top;
            }
        }

        public void Grab( User owner, int mx, int my, double alpha )
        {
            if( _isGrabbed )
            {
                throw new MethodAccessException( $"Карта уже была взята. Id: {Id}, UserId: {owner.Id}, OwnerId: {Owner.Id}" );
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

        public int Radius { get; protected set; }

        public string GetContent()
        {
            if( _side == CardSideEnum.Top )
            {
                return _topContent;
            }
            else
            {
                return _bottomContent;
            }
        }

        #endregion
    }
}
