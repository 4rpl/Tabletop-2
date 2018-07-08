﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabletop.Logic.Interfaces;

namespace Tabletop.Logic.Models
{
    public class Filter : IObject
    {
        public Filter( User owner, int x, int y, int h, int w )
        {
            Id = Guid.NewGuid();
            X = x;
            Y = y;
            H = h;
            W = w;
            Radius = Convert.ToInt32( h * h + w * w );
            Owner = owner;
        }

        #region impl

        public int X { get; protected set; } = 0;

        public int Y { get; protected set; } = 0;

        public int Z { get; protected set; } = 0;

        public double Alpha { get; protected set; } = 0;

        public void Move( int x, int y )
        {
            X = x;
            Y = y;
        }

        #endregion

        public Guid Id { get; protected set; }

        public User Owner { get; protected set; }

        public int H { get; protected set; }

        public int W { get; protected set; }

        public int Radius { get; protected set; }

        public bool IsFiltered( IDraggable obj )
        {
            return X <= obj.X && X + W >= obj.X && Y <= obj.Y && Y + H >= obj.Y;
        }
    }
}
