using System;
using System.Collections.Generic;
using System.Text;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Out.Deck
{
    public class OutChangeDeckContent : OutActionBase
    {
        public OutChangeDeckContent( DeckModel deck, bool visible )
        {
            Type = OutActionNames.ChangeDeckContent;
            Resiever = Resiever.Caller;
            Content = visible ? deck.GetContent() : null;
        }

        public Guid Id { get; set; }
        public string Content { get; set; }
    }
}
