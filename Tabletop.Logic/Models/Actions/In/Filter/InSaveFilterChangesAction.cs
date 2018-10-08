using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop.Logic.Models.Actions.In.Filter
{
    public class InSaveFilterChangesAction : InActionBase
    {
        public Guid Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int H { get; set; }
        public int W { get; set; }
        public double Alpha { get; set; }
    }
}
