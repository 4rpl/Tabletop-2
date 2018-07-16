using System;
using System.Collections.Generic;
using System.Text;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Out.Deck
{
    public class OutFlipDeckAction : OutActionBase
    {
        public OutFlipDeckAction( DeckModel deck, List<string> resievers, bool visible )
        {
            Type = OutActionNames.FlipDeck;
            Content = visible ? deck.GetContent() : null;
            Id = deck.Id;
            ResieverIds = resievers;
        }

        public Guid Id { get; set; }
        public string Content { get; set; }
    }
}
