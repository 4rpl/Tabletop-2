using System;
using System.Collections.Generic;
using System.Text;
using CardModel = Tabletop.Logic.Models.Card;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Out.Card
{
    public class OutPutCardInDeckAction : OutActionBase
    {
        public OutPutCardInDeckAction( CardModel card, DeckModel deck, List<string> resievers, bool visible )
        {
            Type = OutActionNames.PutCardInDeck;
            DeckId = deck.Id;
            CardToRemove = card.Id;
            DeckLength = deck.Length;
            ResieverIds = resievers;
            Content = visible ? card.GetContent() : null;
        }

        public Guid DeckId { get; set; }
        public Guid CardToRemove { get; set; }
        public int DeckLength { get; set; }
        public string Content { get; set; }
    }
}
