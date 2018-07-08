using System;
using System.Collections.Generic;
using System.Text;
using CardModel = Tabletop.Logic.Models.Card;

namespace Tabletop.Logic.Models.Actions.Out.Card
{
    public class OutFlipCardAction : OutActionBase
    {
        public OutFlipCardAction( CardModel card, List<string> resievers, bool visible )
        {
            Type = OutActionNames.FlipCard;
            Content = visible ? card.GetContent() : null;
            Id = card.Id;
            ResieverIds = resievers;
        }

        public Guid Id { get; set; }
        public string Content { get; set; }
    }
}
