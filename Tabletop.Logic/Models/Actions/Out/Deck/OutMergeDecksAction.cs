using System;
using System.Collections.Generic;
using System.Text;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Out.Deck
{
    public class OutMergeDecksAction : OutActionBase
    {
        public OutMergeDecksAction( DeckModel topDeck, DeckModel bottomDeck )
        {
            Type = OutActionNames.MergeDecks;
            Resiever = Resiever.All;
            TopDeckId = topDeck.Id;
            BottomDeckId = bottomDeck.Id;
        }

        public Guid TopDeckId { get; set; }
        public Guid BottomDeckId { get; set; }
    }
}
