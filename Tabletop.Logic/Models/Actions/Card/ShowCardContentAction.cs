using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardModel = Tabletop.Logic.Models.Card;

namespace Tabletop.Logic.Models.Actions.Card
{
    public class ShowCardContentAction : ITableAction
    {
        public ShowCardContentAction( CardModel card, IEnumerable<string> resievers )
        {
            Type = "ShowCardContent";
            Id = card.Id;
            Content = card.GetContent();
            ResieverIds = resievers.ToList();
        }

        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.Special;
        public List<string> ResieverIds { get; set; }
        public Guid Id { get; set; }
        public string Content { get; set; }
    }
}
