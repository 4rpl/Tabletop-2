using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Deck
{
    public class DeckUpAction : ITableAction
    {
        public DeckUpAction() { }

        public DeckUpAction( DeckModel deck, List<string> resievers, bool isOwner )
        {
            Id = deck.Id;
            IsOwner = false;
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
