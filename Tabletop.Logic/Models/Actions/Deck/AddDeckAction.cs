﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Deck
{
    public class AddDeckAction : ITableAction
    {
        public AddDeckAction( DeckModel deck, List<string> resievers, bool isHidden )
        {
            Type = "AddDeck";
            Active = deck.IsGrabbed;
            Content = isHidden ? null : deck.GetContent();
            H = deck.Height;
            Id = deck.Id;
            W = deck.Width;
            X = deck.X;
            Y = deck.Y;
            Length = deck.Length;
            ResieverIds = resievers;
        }

        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.Special;
        public List<string> ResieverIds { get; set; }
        public Guid? Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int H { get; set; }
        public int W { get; set; }
        public bool Active { get; set; }
        public string Content { get; set; }
        public int Length { get; set; }
    }
}
