using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop.Logic.Models.Actions.Deck
{
    public class DeckUpAction : ITableAction
    {
        public string Type { get; set; }
        public Guid Id { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
        public int Z { get; set; }
    }
}
