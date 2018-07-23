using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Tabletop.Logic.Models.Actions.Filter
{
    public class AddFilterAction : ITableAction
    {
        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.All;
        public List<string> ResieverIds { get; set; }
        public Guid Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int H { get; set; }
        public int W { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        [JsonIgnore]
        public string OwnerId { get; set; }
    }
}
