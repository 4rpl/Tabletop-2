using System;
using System.Collections.Generic;
using System.Text;
using CardModel = Tabletop.Logic.Models.Card;

namespace Tabletop.Logic.Models.Actions.Out.Card
{
    public class OutAddCardAction : OutActionBase
    {
        public OutAddCardAction( CardModel card, List<string> resievers, bool visible )
        {
            Type = OutActionNames.AddCard;
            Content = visible ? card.GetContent() : null;
            H = card.Height;
            Id = card.Id;
            W = card.Width;
            X = card.X;
            Y = card.Y;
            Alpha = card.Alpha;
            ResieverIds = resievers;
        }

        public Guid? Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public double Alpha { get; set; }
        public int H { get; set; }
        public int W { get; set; }
        public string Content { get; set; }
    }
}
