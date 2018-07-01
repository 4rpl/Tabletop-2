using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Deck
{
    public class RemoveDeckAction : ITableAction
    {
        public RemoveDeckAction( DeckModel deck )
        {
            Type = "RemoveDeck";
            Id = deck.Id;
        }

        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.All;
        public Guid Id { get; set; }
    }
}
