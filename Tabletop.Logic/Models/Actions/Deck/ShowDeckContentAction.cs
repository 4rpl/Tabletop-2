using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Deck
{
    public class ShowDeckContentAction : ITableAction
    {
        public ShowDeckContentAction( DeckModel deck, IEnumerable<string> resievers )
        {
            Type = "ShowDeckContent";
            Id = deck.Id;
            Content = deck.GetContent();
            ResieverIds = resievers.ToList();
        }

        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.Special;
        public List<string> ResieverIds { get; set; }
        public Guid Id { get; set; }
        public string Content { get; set; }
    }
}
