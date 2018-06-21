using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop.Models.Actions
{
    public class CardDown : ITableAction
    {
        public string Type { get; set; }
        public string Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }
}
