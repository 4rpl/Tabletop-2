﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop.Logic.Models.Actions.Deck
{
    public class DeckUpAction : ITableAction, IOwnershipAction
    {
        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.All;
        public List<string> ResieverIds { get; set; }
        public Guid Id { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
        public int Z { get; set; }
        public bool IsOwner { get; set; }
    }
}
