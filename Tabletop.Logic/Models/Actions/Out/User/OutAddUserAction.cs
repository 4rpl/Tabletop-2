using System;
using System.Collections.Generic;
using System.Text;
using UserModel = Tabletop.Logic.Models.User;

namespace Tabletop.Logic.Models.Actions.Out.User
{
    public class OutAddUserAction : OutActionBase
    {
        public OutAddUserAction( UserModel user )
        {
            Type = OutActionNames.AddUser;
            Resiever = Resiever.Others;
            Id = user.Id;
            Name = user.Name;
            Color = user.Color;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
    }
}
