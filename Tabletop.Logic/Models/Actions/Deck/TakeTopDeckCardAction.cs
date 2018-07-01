using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop.Logic.Models.Actions.Deck
{
    public class TakeTopDeckCardAction : ITableAction
    {
        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.All;
        public List<string> ResieverIds { get; set; }
        public Guid Id { get; set; }
        public string Content { get; set; }
        public int Length { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
    }
}
