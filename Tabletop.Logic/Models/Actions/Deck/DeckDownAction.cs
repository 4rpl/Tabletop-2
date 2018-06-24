using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop.Logic.Models.Actions.Deck
{
    public class DeckDownAction : ITableAction
    {
        public string Type { get; set; }
        public Guid Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }
}
