using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardModel = Tabletop.Logic.Models.Card;

namespace Tabletop.Logic.Models.Actions.Card
{
    public class HideCardContentAction : ITableAction
    {
        public HideCardContentAction( CardModel card, IEnumerable<string> resievers )
        {
            Type = "HideCardContent";
            Id = card.Id;
            ResieverIds = resievers.ToList();
        }

        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.Special;
        public List<string> ResieverIds { get; set; }
        public Guid Id { get; set; }
    }
}
