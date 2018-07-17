using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop.Logic.Models.Actions.In.Deck
{
    public class InTakeTopDeckCardAction : InActionBase
    {
        public Guid Id { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
        public double Alpha { get; set; }
    }
}
