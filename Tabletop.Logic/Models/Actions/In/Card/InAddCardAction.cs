using System;
using System.Collections.Generic;
using System.Text;

namespace Tabletop.Logic.Models.Actions.In.Card
{
    public class InAddCardAction : InActionBase
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int H { get; set; }
        public int W { get; set; }
        public string ContentTop { get; set; }
        public string ContentBottom { get; set; }
    }
}
