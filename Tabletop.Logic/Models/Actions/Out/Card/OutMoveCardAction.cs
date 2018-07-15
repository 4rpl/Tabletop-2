using System;
using System.Collections.Generic;
using System.Text;
using CardModel = Tabletop.Logic.Models.Card;

namespace Tabletop.Logic.Models.Actions.Out.Card
{
    public class OutMoveCardAction : OutActionBase
    {
        public OutMoveCardAction( CardModel card, List<string> resievers )
        {
            Type = OutActionNames.MoveCard;
            ResieverIds = resievers;
            Id = card.Id;
            X = card.X;
            Y = card.Y;
            Mx = card.Mx;
            My = card.My;
            UserId = card.Owner.Id;
        }

        public Guid Id { get; set; }
        public string UserId { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
    }
}
