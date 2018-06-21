using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Tabletop.Models.Actions;

namespace Tabletop.Services
{
    public static class TableActionParser
    {
        public static ITableAction Parse( JObject jObject )
        {
            var type = jObject.GetValue( "type" ).ToObject<string>();
            switch( type )
            {
                case TableActionTypes.ADD_CARD:
                    {
                        return jObject.ToObject<AddCard>();
                    }
                case TableActionTypes.CARD_DOWN:
                    {
                        return jObject.ToObject<CardDown>();
                    }
                case TableActionTypes.CARD_UP:
                    {
                        return jObject.ToObject<CardUp>();
                    }
                case TableActionTypes.FLIP_CARD:
                    {
                        return jObject.ToObject<FlipCard>();
                    }
                case TableActionTypes.MOVE_CARD:
                    {
                        return jObject.ToObject<MoveCard>();
                    }
                default:
                    {
                        throw new NotImplementedException( "Неизвестный ActionType" );
                    }
            }
        }
    }
}
