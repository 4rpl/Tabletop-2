using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabletop.Logic.Interfaces;

namespace Tabletop.Logic.Models
{
    public class Filter
    {
        public Filter( User owner, int x, int y, int h, int w, double alpha )
        {
            Id = Guid.NewGuid();
            X = x;
            Y = y;
            H = h;
            W = w;
            Alpha = alpha;
            Radius = Convert.ToInt32( h * h + w * w );
            Owner = owner;
            Color = owner.Color;
            Name = owner.Name;
        }

        #region impl

        public int X { get; protected set; } = 0;

        public int Y { get; protected set; } = 0;

        public int Z { get; protected set; } = 0;

        public double Alpha { get; protected set; } = 0;

        public void Modify( int x, int y, int h, int w, double alpha )
        {
            X = x;
            Y = y;
            H = h;
            W = w;
            Alpha = alpha;
        }

        #endregion

        public Guid Id { get; protected set; }

        public User Owner { get; protected set; }

        public int H { get; protected set; }

        public int W { get; protected set; }

        public int Radius { get; protected set; }

        public string Color { get; protected set; }

        public string Name { get; protected set; }

        public bool IsFiltered( IDraggable obj )
        {
            var cos = Math.Cos( -Alpha );
            var sin = Math.Sin( -Alpha );
            var x = obj.Cx - X - W / 2;
            var y = obj.Cy - Y - H / 2;
            var vx2 = 2 * (x * cos - y * sin);
            var vy2 = 2 * (x * sin + y * cos);
            return vx2 >= -W && vx2 <= W && vy2 >= -H && vy2 <= H;
        }
    }
}
