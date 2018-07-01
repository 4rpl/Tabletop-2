using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Deck
{
    public class ChangeDeckAction : ITableAction
    {
        public ChangeDeckAction( DeckModel deck, List<string> resievers, bool isHidden )
        {
            Type = "ChangeDeck";
            Id = deck.Id;
            Content = isHidden ? null : deck.GetContent();
            Length = deck.Length;
            ResieverIds = resievers;
        }

        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.Special;
        public List<string> ResieverIds { get; set; }
        public Guid? Id { get; set; }
        public string Content { get; set; }
        public int Length { get; set; }
    }
}
