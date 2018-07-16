using System;
using System.Collections.Generic;
using System.Text;
using CardModel = Tabletop.Logic.Models.Card;

namespace Tabletop.Logic.Models.Actions.Out.Card
{
    public class OutMoveCardAndChangeContentAction : OutActionBase
    {
        public OutMoveCardAndChangeContentAction( CardModel card, List<string> resievers, bool visible )
        {
            Type = OutActionNames.MoveCardAndChangeContent;
            ResieverIds = resievers;
            Id = card.Id;
            X = card.X;
            Y = card.Y;
            Mx = card.Mx;
            My = card.My;
            Content = visible ? card.GetContent() : null;
        }

        public Guid Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
        public string Content { get; set; }
    }
}
