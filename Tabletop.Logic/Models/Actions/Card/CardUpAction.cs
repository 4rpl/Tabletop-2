using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using CardModel = Tabletop.Logic.Models.Card;

namespace Tabletop.Logic.Models.Actions.Card
{
    public class CardUpAction : ITableAction
    {
        public CardUpAction() { }

        public CardUpAction( CardModel card, List<string> resievers, bool isOwner )
        {
            Type = "CardUp";
            Id = card.Id;
            Z = card.Z;
            ResieverIds = resievers;
            IsOwner = isOwner;
        }

        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.Special;
        public List<string> ResieverIds { get; set; }
        public Guid Id { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
        public int Z { get; set; }
        public bool IsOwner { get; set; }
        [JsonIgnore]
        public string OwnerId { get; set; }
    }
}
