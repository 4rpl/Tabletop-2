using System;
using System.Collections.Generic;
using System.Text;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Out.Deck
{
    public class OutMoveDeckAction : OutActionBase
    {
        public OutMoveDeckAction( DeckModel deck, List<string> resievers )
        {
            Type = OutActionNames.MoveDeck;
            ResieverIds = resievers;
            Id = deck.Id;
            X = deck.X;
            Y = deck.Y;
            Mx = deck.Mx;
            My = deck.My;
            UserId = deck.Owner.Id;
        }

        public Guid Id { get; set; }
        public string UserId { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
    }
}
