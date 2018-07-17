using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Out.Card
{
    public class OutShuffleDeckAction : OutActionBase
    {
        public OutShuffleDeckAction( DeckModel deck, List<string> resievers, bool visible )
        {
            Type = OutActionNames.ShuffleDeck;
            ResieverIds = resievers;
            Id = deck.Id;
            Content = visible ? deck.GetContent() : null;
        }

        public Guid Id { get; set; }
        public string Content { get; set; }
    }
}
