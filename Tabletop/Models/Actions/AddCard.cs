using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop.Models.Actions
{
    public class AddCard : ITableAction
    {
        public string Type { get; set; }
        public string Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int H { get; set; }
        public int W { get; set; }
        public bool Visible { get; set; }
        public bool Active { get; set; }
        public string ContentTop { get; set; }
        public string ContentBottom { get; set; }
    }
}
