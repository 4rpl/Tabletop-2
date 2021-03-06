﻿using System;
using System.Collections.Generic;
using System.Text;
using CardModel = Tabletop.Logic.Models.Card;

namespace Tabletop.Logic.Models.Actions.Out.Card
{
    public class OutGrabCardAction : OutActionBase
    {
        public OutGrabCardAction( CardModel card )
        {
            Type = OutActionNames.GrabCard;
            Id = card.Id;
            Resiever = Resiever.Caller;
            Mx = card.Mx;
            My = card.My;
            Alpha = card.Alpha;
        }
        public Guid Id { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
        public double Alpha { get; set; }
    }
}
