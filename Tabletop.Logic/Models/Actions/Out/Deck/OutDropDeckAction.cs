using System;
using System.Collections.Generic;
using System.Text;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Out.Deck
{
    public class OutDropDeckAction : OutActionBase
    {
        public OutDropDeckAction( DeckModel deck )
        {
            Type = OutActionNames.DropDeck;
            Resiever = Resiever.All;
            Id = deck.Id;
            X = deck.X;
            Y = deck.Y;
        }

        public Guid Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }
}
