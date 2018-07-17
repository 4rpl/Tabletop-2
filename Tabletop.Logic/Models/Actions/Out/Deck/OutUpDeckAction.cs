using System;
using System.Collections.Generic;
using System.Text;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Out.Deck
{
    public class OutDeckUpAction : OutActionBase
    {
        public OutDeckUpAction( DeckModel deck )
        {
            Type = OutActionNames.DeckUp;
            Id = deck.Id;
            Mx = deck.Mx;
            My = deck.My;
            Alpha = deck.Alpha;
            Resiever = Resiever.Others;
        }

        public Guid Id { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
        public double Alpha { get; set; }
        public string OwnerId { get; set; }
    }
}
