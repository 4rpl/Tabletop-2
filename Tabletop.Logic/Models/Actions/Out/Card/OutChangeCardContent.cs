using System;
using System.Collections.Generic;
using System.Text;
using CardModel = Tabletop.Logic.Models.Card;

namespace Tabletop.Logic.Models.Actions.Out.Card
{
    public class OutChangeCardContent : OutActionBase
    {
        public OutChangeCardContent( CardModel card, bool visible )
        {
            Type = OutActionNames.ChangeCardContent;
            Resiever = Resiever.Caller;
            Content = visible ? card.GetContent() : null;
        }

        public Guid Id { get; set; }
        public string Content { get; set; }
    }
}
