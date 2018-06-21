using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop.Models.Actions
{
    public static class TableActionTypes
    {
        public const string FLIP_CARD = nameof( FLIP_CARD );
        public const string MOVE_CARD = nameof( MOVE_CARD );
        public const string CARD_UP = nameof( CARD_UP );
        public const string CARD_DOWN = nameof( CARD_DOWN );
        public const string ADD_CARD = nameof( ADD_CARD );
    }
}
