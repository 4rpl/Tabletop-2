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
        public Card( string topContent, string bottomContent, int height, int width )
        {
            _topContent = topContent;
            _bottomContent = bottomContent;
            Height = height;
            Width = width;
        }

        #region impl

        private bool _isGrabbed;

        private CardSideEnum _side;

        public int X { get; protected set; } = 0;

        public int Y { get; protected set; } = 0;

        public int Z { get; protected set; } = 0;

        public CardSideEnum Side => _side;

        public void Drop()
        {
            _isGrabbed = false;
        }

        public void Flip()
        {
            if(_side == CardSideEnum.Top)
            {
                _side = CardSideEnum.Bottom;
            } else
            {
                _side = CardSideEnum.Top;
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

        private readonly string _topContent;
        private readonly string _bottomContent;

        public Guid Id { get; } = Guid.NewGuid();
        public readonly int Height;
        public readonly int Width;

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
    }
}
