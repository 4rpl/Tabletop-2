using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Deck
{
    public class HideDeckContentAction : ITableAction
    {
        public HideDeckContentAction( DeckModel deck, IEnumerable<string> resievers )
        {
            Type = "HideDeckContent";
            Id = deck.Id;
            ResieverIds = resievers.ToList();
        }

        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.Special;
        public List<string> ResieverIds { get; set; }
        public Guid Id { get; set; }
    }
}
