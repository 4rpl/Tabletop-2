using System;
using System.Collections.Generic;
using System.Text;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Out.Card
{
    public class OutMoveDeckAndChangeContentAction : OutActionBase
    {
        public OutMoveDeckAndChangeContentAction( DeckModel deck, List<string> resievers, bool visible )
        {
            Type = OutActionNames.MoveDeckAndChangeContent;
            ResieverIds = resievers;
            Id = deck.Id;
            X = deck.X;
            Y = deck.Y;
            Mx = deck.Mx;
            My = deck.My;
            Content = visible ? deck.GetContent() : null;
        }

        public Guid Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
        public string Content { get; set; }
    }
}
