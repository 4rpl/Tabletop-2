using System;
using System.Collections.Generic;
using System.Text;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Out.Deck
{
    public class OutUpDeckAction : OutActionBase
    {
        public OutUpDeckAction( DeckModel card )
        {
            Type = OutActionNames.CardUp;
            Id = card.Id;
            Mx = card.Mx;
            My = card.My;
            Alpha = card.Alpha;
            Resiever = Resiever.Others;
        }

        public Guid Id { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
        public double Alpha { get; set; }
        public string OwnerId { get; set; }
    }
}
