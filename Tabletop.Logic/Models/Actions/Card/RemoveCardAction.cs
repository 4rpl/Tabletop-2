using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardModel = Tabletop.Logic.Models.Card;

namespace Tabletop.Logic.Models.Actions.Card
{
    public class RemoveCardAction : ITableAction
    {
        public RemoveCardAction( CardModel card )
        {
            Type = "RemoveCard";
            Id = card.Id;
        }

        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.All;
        public Guid? Id { get; set; }
    }
}
