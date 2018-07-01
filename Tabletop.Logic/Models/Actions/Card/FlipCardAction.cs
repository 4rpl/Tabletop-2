using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardModel = Tabletop.Logic.Models.Card;

namespace Tabletop.Logic.Models.Actions.Card
{
    public class FlipCardAction : ITableAction
    {
        public FlipCardAction() { }

        public FlipCardAction( CardModel card, List<string> resievers, bool isHidden )
        {
            Type = "FlipDeck";
            ResieverIds = resievers;
            Id = card.Id;
            Content = isHidden ? null : card.GetContent();
        }

        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.Special;
        public List<string> ResieverIds { get; set; }
        public Guid Id { get; set; }
        public string Content { get; set; }
    }
}
