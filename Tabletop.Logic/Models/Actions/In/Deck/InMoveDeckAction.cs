using System;
using System.Collections.Generic;
using System.Text;

namespace Tabletop.Logic.Models.Actions.In.Deck
{
    public class InMoveDeckAction : InActionBase
    {
        public Guid Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }
}
