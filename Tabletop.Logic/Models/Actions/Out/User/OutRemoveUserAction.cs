using System;
using System.Collections.Generic;
using System.Text;

namespace Tabletop.Logic.Models.Actions.Out.User
{
    public class OutRemoveUserAction : OutActionBase
    {
        public OutRemoveUserAction( string id, Guid? cardToDrop, Guid? deckToDrop, List<string> resievers )
        {
            Type = OutActionNames.RemoveUser;
            ResieverIds = resievers;
            Id = id;
            CardToDrop = cardToDrop;
            DeckToDrop = deckToDrop;
        }

        public string Id { get; set; }
        public Guid? CardToDrop { get; set; }
        public Guid? DeckToDrop { get; set; }
    }
}
