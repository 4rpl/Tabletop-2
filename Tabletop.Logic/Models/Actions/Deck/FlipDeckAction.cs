using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop.Logic.Models.Actions.Deck
{
    public class FlipDeckAction : ITableAction
    {
        public string Type { get; set; }
        public Guid Id { get; set; }
        public string Content { get; set; }
    }
}
