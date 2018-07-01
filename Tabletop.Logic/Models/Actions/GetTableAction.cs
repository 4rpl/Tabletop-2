using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardModel = Tabletop.Logic.Models.Card;
using DeckModel = Tabletop.Logic.Models.Deck;
using UserModel = Tabletop.Logic.Models.User;
using FilterModel = Tabletop.Logic.Models.Filter;

namespace Tabletop.Logic.Models.Actions
{
    public class GetTableAction : ITableAction
    {
        public GetTableAction() { }

        public GetTableAction( Table table )
        {
            Type = "GetTable";
            H = table.Height;
            W = table.Width;
        }

        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.Caller;
        public List<string> ResieverIds { get; set; }
        public int H { get; set; }
        public int W { get; set; }
        public List<TableCard> Cards { get; set; }
        public List<TableDeck> Decks { get; set; }
        public List<TableUser> Users { get; set; }
        public List<TableFilter> Filters { get; set; }
    }

    public class TableCard
    {
        public TableCard( CardModel card )
        {
            Active = card.IsGrabbed();
            Content = card.GetContent();
            H = card.Height;
            Id = card.Id;
            W = card.Width;
            X = card.X;
            Y = card.Y;
            Z = card.Z;
        }
        
        public Guid? Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Z { get; set; }
        public int H { get; set; }
        public int W { get; set; }
        public bool Active { get; set; }
        public string Content { get; set; }
    }

    public class TableDeck
    {
        public TableDeck( DeckModel deck )
        {
            Active = deck.IsGrabbed();
            Content = deck.GetContent();
            H = deck.Height;
            Id = deck.Id;
            W = deck.Width;
            X = deck.X;
            Y = deck.Y;
            Z = deck.Z;
            Length = deck.Length;
        }
        
        public Guid? Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Z { get; set; }
        public int H { get; set; }
        public int W { get; set; }
        public bool Active { get; set; }
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

        }

        public string Id { get; set; }
        public string Name { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }

    public class TableFilter
    {
        public TableFilter( FilterModel filter )
        {
            Id = filter.Id;
            X = filter.X;
            Y = filter.Y;
            H = filter.H;
            W = filter.W;
        }

        public Guid Id { get; protected set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int H { get; protected set; }
        public int W { get; protected set; }
    }
}
