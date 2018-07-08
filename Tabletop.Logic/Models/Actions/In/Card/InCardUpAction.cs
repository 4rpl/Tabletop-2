using System;
using System.Collections.Generic;
using System.Text;

namespace Tabletop.Logic.Models.Actions.In.Card
{
    public class InCardUpAction : InActionBase
    {
        public Guid Id { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
        public double Alpha { get; set; }
    }
}
