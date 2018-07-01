using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardModel = Tabletop.Logic.Models.Card;

namespace Tabletop.Logic.Models.Actions.Card
{
    public class CardUpAction : ITableAction, IOwnershipAction
    {
        public CardUpAction() { }

        public CardUpAction( CardModel card )
        {
            Type = "CardUp";
            Id = card.Id;
            Z = card.Z;
        }

        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.All;
        public Guid Id { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
        public int Z { get; set; }
        public bool IsOwner { get; set; }
    }
}
