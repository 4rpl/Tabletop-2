using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Deck
{
    public class ChangeDeckAction : ITableAction
    {
        public ChangeDeckAction( DeckModel deck)
        {
            Type = "ChangeDeck";
            Id = deck.Id;
            Content = deck.GetContent();
            Length = deck.Length;
        }

        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.All;
        public Guid? Id { get; set; }
        public string Content { get; set; }
        public int Length { get; set; }
    }
}
