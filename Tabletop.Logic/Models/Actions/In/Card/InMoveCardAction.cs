using System;
using System.Collections.Generic;
using System.Text;

namespace Tabletop.Logic.Models.Actions.In.Card
{
    public class InMoveCardAction : InActionBase
    {
        public Guid Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }
}
