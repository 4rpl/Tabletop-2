using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabletop.Logic.Interfaces;
using CardModel = Tabletop.Logic.Models.Card;
using DeckModel = Tabletop.Logic.Models.Deck;

namespace Tabletop.Logic.Models.Actions.Out.Deck
{
    public class OutTakeTopDeckCardAction : OutActionBase
    {
        /// <summary>
        /// Без удаления колоды
        /// </summary>
        public OutTakeTopDeckCardAction( CardModel card, DeckModel deck, List<string> resievers, bool visible )
        {
            DeckId = deck.Id;
            BottomContent = visible ? deck.GetContent() : null;
            Init( card, deck, resievers, visible );
        }

        /// <summary>
        /// С удалением колоды
        /// </summary>
        public OutTakeTopDeckCardAction( CardModel top, CardModel bottom, DeckModel deck, List<string> resievers, bool visible )
        {
            BottomId = bottom.Id;
            DeckId = deck.Id;
            BottomContent = visible ? bottom.GetContent() : null;
            Init( top, bottom, resievers, visible );
        }

        private void Init( CardModel top, IDraggable bottom, List<string> resievers, bool visible )
        {
            Type = OutActionNames.TakeTopDeckCard;
            ResieverIds = resievers;
            TopId = top.Id;
            X = top.X;
            Y = top.Y;
            W = top.Width;
            H = top.Height;
            TopContent = visible ? top.GetContent() : null;
            Alpha = top.Alpha;
            Mx = top.Mx;
            My = top.My;
        }

        public Guid TopId { get; set; }
        public Guid? BottomId { get; set; }
        public Guid DeckId { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int H { get; set; }
        public int W { get; set; }
        public string TopContent { get; set; }
        public string BottomContent { get; set; }
        public double Alpha { get; set; }
        public int Mx { get; set; }
        public int My { get; set; }
    }
}
