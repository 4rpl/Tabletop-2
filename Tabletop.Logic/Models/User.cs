﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabletop.Logic.Interfaces;

namespace Tabletop.Logic.Models
{
    public class User
    {
        public User( string id, string name, int x, int y, string color )
        {
            Id = id;
            Name = name;
            X = x;
            Y = y;
            Color = color;
        }

        #region impl

        public int X { get; protected set; } = 0;

        public int Y { get; protected set; } = 0;

        public int Radius { get; } = 0;

        public double Alpha { get; protected set; } = 0;

        public void Move( int x, int y )
        {
            X = x;
            Y = y;
        }

        #endregion
        
        public string Id { get; protected set; }

        public string Name { get; protected set; }

        public string Color { get; protected set; }
    }
}
