using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop.Models.Actions
{
    public class CardUp : ITableAction
    {
        public string Type { get; set; }
        public string Id { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
        public int Z { get; set; }
    }
}
