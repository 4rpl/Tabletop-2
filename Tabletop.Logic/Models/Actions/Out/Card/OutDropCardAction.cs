using System;
using System.Collections.Generic;
using System.Text;
using CardModel = Tabletop.Logic.Models.Card;

namespace Tabletop.Logic.Models.Actions.Out.Card
{
    public class OutDropCardAction : OutActionBase
    {
        public OutDropCardAction( CardModel card, List<string> resievers )
        {
            Type = OutActionNames.DropCard;
            ResieverIds = resievers;
            Id = card.Id;
            X = card.X;
            Y = card.Y;
        }

        public Guid Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }
}
