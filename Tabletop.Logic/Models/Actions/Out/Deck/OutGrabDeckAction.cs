using System;
using System.Collections.Generic;
using System.Text;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Out.Card
{
    public class OutGrabDeckAction : OutActionBase
    {
        public OutGrabDeckAction( DeckModel deck )
        {
            Type = OutActionNames.GrabDeck;
            Id = deck.Id;
            Mx = deck.Mx;
            My = deck.My;
            Alpha = deck.Alpha;
            Resiever = Resiever.Caller;
        }
        public Guid Id { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
        public double Alpha { get; set; }
    }
}
