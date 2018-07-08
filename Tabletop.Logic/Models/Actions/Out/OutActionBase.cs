using System;
using System.Collections.Generic;
using System.Text;

namespace Tabletop.Logic.Models.Actions.Out
{
    public abstract class OutActionBase : ITableAction
    {
        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.Special;
        public List<string> ResieverIds { get; set; }
    }
}
