using System;
using System.Collections.Generic;
using System.Text;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Out.Card
{
    public class OutPutCardInDeckAction : OutActionBase
    {
        public OutPutCardInDeckAction( DeckModel deck, List<string> resievers, bool visible )
        {
            Type = OutActionNames.PutCardInDeck;
            ResieverIds = resievers;
            DeckLength = deck.Length;
            Content = visible ? deck.GetContent() : null;
        }

        public Guid DeckId { get; set; }
        public Guid CardToRemove { get; set; }
        public int DeckLength { get; set; }
        public string Content { get; set; }
    }
}
