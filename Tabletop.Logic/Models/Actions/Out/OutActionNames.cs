using System;
using System.Collections.Generic;
using System.Text;

namespace Tabletop.Logic.Models.Actions.Out
{
    public static class OutActionNames
    {
        public static string SendMessage = "SendMessage";

        public static string GetTable = "GetTable";

        public static string AddFilter = "AddFilter";

        public static string AddCard = "AddCard";
        public static string FlipCard = "FlipCard";
        public static string GrabCard = "GrabCard";
        public static string CardUp = "CardUp";
        public static string PutCardInDeck = "PutCardInDeck";
        public static string CreateDeck = "CreateDeck";
        public static string DropCard = "DropCard";
        public static string MoveCard = "MoveCard";
        public static string ChangeCardContent = "ChangeCardContent";
        public static string MoveCardAndChangeContent = "MoveCardAndChangeContent";
        
        public static string AddUser = "AddUser";
        public static string RemoveUser = "RemoveUser";

        public static string FlipDeck = "FlipDeck";
        public static string GrabDeck = "GrabDeck";
        public static string MoveDeck = "MoveDeck";
        public static string ChangeDeckContent = "ChangeDeckContent";
        public static string MoveDeckAndChangeContent = "MoveDeckAndChangeContent";
        public static string MergeDecks = "MergeDecks";
        public static string DropDeck = "DropDeck";
        public static string ShuffleDeck = "ShuffleDeck";
        public static string TakeTopDeckCard = "TakeTopDeckCard";
        public static string DeckUp = "DeckUp";
    }
}
