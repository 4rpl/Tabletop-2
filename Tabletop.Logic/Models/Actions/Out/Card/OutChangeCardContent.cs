using System;
using System.Collections.Generic;
using System.Text;
using CardModel = Tabletop.Logic.Models.Card;

namespace Tabletop.Logic.Models.Actions.Out.Card
{
    public class OutChangeCardContent : OutActionBase
    {
        public OutChangeCardContent( CardModel card, List<string> resievers, bool visible )
        {
            Type = OutActionNames.MoveCardAndChangeContent;
            ResieverIds = resievers;
            Content = visible ? card.GetContent() : null;
        }

        public Guid Id { get; set; }
        public string Content { get; set; }
    }
}
