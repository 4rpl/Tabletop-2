using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardModel = Tabletop.Logic.Models.Card;

namespace Tabletop.Logic.Models.Actions.Card
{
    public class AddCardAction : ITableAction
    {
        public AddCardAction() { }

        public AddCardAction( CardModel card )
        {
            Type = "AddCard";
            Active = card.IsGrabbed();
            Content = card.GetContent();
            H = card.Height;
            Id = card.Id;
            W = card.Width;
            X = card.X;
            Y = card.Y;
        }

        public string Type { get; set; }
        public Guid? Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
        public int H { get; set; }
        public int W { get; set; }
        public bool Active { get; set; }
        public string Content { get; set; }
        public string ContentTop { get; set; }
        public string ContentBottom { get; set; }
    }
}
