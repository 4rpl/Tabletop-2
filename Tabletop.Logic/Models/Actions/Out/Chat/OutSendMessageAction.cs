using System;
using System.Collections.Generic;
using System.Text;
using UserModel = Tabletop.Logic.Models.User;

namespace Tabletop.Logic.Models.Actions.Out.Chat
{
    public class OutSendMessageAction : OutActionBase
    {
        public OutSendMessageAction( UserModel user, string message )
        {
            Type = OutActionNames.SendMessage;
            Resiever = Resiever.All;
            Date = DateTime.Now;
            Name = user.Name;
            Color = user.Color;
            Message = message;
        }

        public DateTime Date { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
        public string Color { get; set; }
    }
}
