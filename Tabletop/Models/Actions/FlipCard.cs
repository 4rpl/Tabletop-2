using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop.Models.Actions
{
    public class FlipCard : ITableAction
    {
        public string Type { get; set; }
        public string Id { get; set; }
    }
}
