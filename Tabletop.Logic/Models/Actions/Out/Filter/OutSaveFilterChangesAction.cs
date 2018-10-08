using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardModel = Tabletop.Logic.Models.Card;
using DeckModel = Tabletop.Logic.Models.Deck;
using FilterModel = Tabletop.Logic.Models.Filter;
using UserModel = Tabletop.Logic.Models.User;

namespace Tabletop.Logic.Models.Actions.Out.Filter
{
    public class OutSaveFilterChangesAction : OutActionBase
    {
        public OutSaveFilterChangesAction( FilterModel filter )
        {
            Type = OutActionNames.SaveFilterChanges;
            Resiever = Resiever.All;
            Id = filter.Id;
            X = filter.X;
            Y = filter.Y;
            H = filter.H;
            W = filter.W;
            Alpha = filter.Alpha;
        }

        public Guid Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int H { get; set; }
        public int W { get; set; }
        public double Alpha { get; set; }
    }
}
