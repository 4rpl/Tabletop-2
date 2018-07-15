using System;
using System.Collections.Generic;
using System.Text;
using DeckModel = Tabletop.Logic.Models.Deck;
using CardModel = Tabletop.Logic.Models.Card;
using System.Linq;

namespace Tabletop.Logic.Models.Actions.Out.Card
{
    public class OutCreateDeckAction : OutActionBase
    {
        public OutCreateDeckAction( IEnumerable<CardModel> cards, DeckModel deck, List<string> resievers, bool visible )
        {
            Type = OutActionNames.CreateDeck;
            ResieverIds = resievers;
            Deck = new TableDeck( deck, visible );
            CardsToRemove = cards.Select( i => i.Id ).ToList();
        }

        public List<Guid> CardsToRemove { get; set; }
        public TableDeck Deck { get; set; }

        public class TableDeck
        {
            public TableDeck( DeckModel deck, bool visible )
            {
                Active = deck.IsGrabbed;
                Content = visible ? deck.GetContent() : null;
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
    }
}
