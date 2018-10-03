using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TableModel = Tabletop.Logic.Models.Table;
using CardModel = Tabletop.Logic.Models.Card;
using DeckModel = Tabletop.Logic.Models.Deck;
using UserModel = Tabletop.Logic.Models.User;
using FilterModel = Tabletop.Logic.Models.Filter;

namespace Tabletop.Logic.Models.Actions.Out.Table
{
    public class OutGetTableAction : OutActionBase
    {
        public OutGetTableAction( TableModel table )
        {
            Type = OutActionNames.GetTable;
            Resiever = Resiever.Caller;
            H = table.Height;
            W = table.Width;
        }
        
        public int H { get; set; }
        public int W { get; set; }
        public List<TableCard> Cards { get; set; }
        public List<TableDeck> Decks { get; set; }
        public List<TableUser> Users { get; set; }
        public List<TableFilter> Filters { get; set; }
    }

    public class TableCard
    {
        public TableCard( CardModel card, UserModel user, bool visible )
        {
            Active = card.IsGrabbed;
            IsOwner = card.Owner == user;
            Content = visible ? card.GetContent() : null;
            H = card.Height;
            Id = card.Id;
            W = card.Width;
            X = card.X;
            Y = card.Y;
            Z = card.Z;
            Alpha = card.Alpha;
        }
        
        public Guid? Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Z { get; set; }
        public int H { get; set; }
        public int W { get; set; }
        public double Alpha { get; set; }
        public bool Active { get; set; }
        public bool IsOwner { get; set; }
        public string Content { get; set; }
    }

    public class TableDeck
    {
        public TableDeck( DeckModel deck, UserModel user, bool visible )
        {
            Active = deck.IsGrabbed;
            IsOwner = deck.Owner == user;
            Content = visible ? deck.GetContent() : null;
            H = deck.Height;
            Id = deck.Id;
            W = deck.Width;
            X = deck.X;
            Y = deck.Y;
            Z = deck.Z;
            Length = deck.Length;
            Alpha = deck.Alpha;
        }
        
        public Guid? Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Z { get; set; }
        public int H { get; set; }
        public int W { get; set; }
        public double Alpha { get; set; }
        public bool Active { get; set; }
        public bool IsOwner { get; set; }
        public string Content { get; set; }
        public int Length { get; set; }
    }

    public class TableUser
    {
        public TableUser( UserModel user )
        {
            Id = user.Id;
            Name = user.Name;
            X = user.X;
            Y = user.Y;
            Color = user.Color;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }

    public class TableFilter
    {
        public TableFilter( FilterModel filter )
        {
            Id = filter.Id;
            Alpha = filter.Alpha;
            X = filter.X;
            Y = filter.Y;
            H = filter.H;
            W = filter.W;
            Color = filter.Color;
            Name = filter.Name;
        }

        public Guid Id { get; protected set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int H { get; protected set; }
        public int W { get; protected set; }
        public double Alpha { get; protected set; }
        public string Color { get; protected set; }
        public string Name { get; protected set; }
    }
}
