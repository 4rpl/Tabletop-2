﻿using System;
using System.Collections.Generic;
using System.Text;
using CardModel = Tabletop.Logic.Models.Card;

namespace Tabletop.Logic.Models.Actions.Out.Card
{
    public class OutUpCardAction : OutActionBase
    {
        public OutUpCardAction( CardModel card, List<string> resievers )
        {
            Type = OutActionNames.CardUp;
            ResieverIds = resievers;
            Id = card.Id;
            Mx = card.Mx;
            My = card.My;
            Alpha = card.Alpha;
        }

        public Guid Id { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
        public double Alpha { get; set; }
        public string OwnerId { get; set; }
    }
}
