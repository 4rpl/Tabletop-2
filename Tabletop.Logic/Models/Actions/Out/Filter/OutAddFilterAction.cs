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
    public class OutAddFilterAction : OutActionBase
    {
        public OutAddFilterAction( UserModel user, FilterModel filter, List<CardModel> cards, List<DeckModel> decks, List<string> resievers )
        {
            Type = OutActionNames.AddFilter;
            Id = filter.Id;
            X = filter.X;
            Y = filter.Y;
            H = filter.H;
            W = filter.W;
            Alpha = filter.Alpha;
            Name = user.Name;
            Color = user.Color;
            CardsToHide = cards.Select( i => i.Id ).ToList();
            DecksToHide = decks.Select( i => i.Id ).ToList();
            ResieverIds = resievers;
        }

        public Guid Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int H { get; set; }
        public int W { get; set; }
        public double Alpha { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public List<Guid> CardsToHide { get; set; }
        public List<Guid> DecksToHide { get; set; }
    }
}
