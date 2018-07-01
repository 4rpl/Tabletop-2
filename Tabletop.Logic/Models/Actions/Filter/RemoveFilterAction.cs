using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Tabletop.Logic.Models.Actions.Filter
{
    public class RemoveFilterAction : ITableAction
    {
        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.All;
        public List<string> ResieverIds { get; set; }
        public Guid Id { get; set; }
    }
}
