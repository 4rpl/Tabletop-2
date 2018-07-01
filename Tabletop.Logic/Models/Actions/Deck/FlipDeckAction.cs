using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Deck
{
    public class FlipDeckAction : ITableAction
    {
        public FlipDeckAction() { }

        public FlipDeckAction( DeckModel deck, List<string> resievers, bool isHidden )
        {
            Type = "FlipDeck";
            ResieverIds = resievers;
            Id = deck.Id;
            Content = isHidden ? null : deck.GetContent();
        }

        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.Special;
        public List<string> ResieverIds { get; set; }
        public Guid Id { get; set; }
        public string Content { get; set; }
    }
}
