using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Tabletop.Logic.Models;
using Tabletop.Logic.Models.Actions;
using Tabletop.Logic.Models.Actions.Card;
using Tabletop.Logic.Models.Actions.Deck;

namespace Tabletop.Hubs
{
    public class GameHub : Hub
    {
        private static Table _table = new Table( 3000, 3000 );

        public override async Task OnConnectedAsync()
        {
            var action = _table.GetTable();
            await Clients.Caller.SendAsync( "PerformAction", action );
        }

        public async Task FlipCard( FlipCardAction action )
        {
            await PerformActions( _table.Dispatch( action ) );
        }
        public async Task MoveCard( MoveCardAction action )
        {
            await PerformActions( _table.Dispatch( action ) );
        }
        public async Task CardUp( CardUpAction action )
        {
            await PerformActions( _table.Dispatch( action ) );
        }
        public async Task CardDown( CardDownAction action )
        {
            await PerformActions( _table.Dispatch( action ) );
        }
        public async Task AddCard( AddCardAction action )
        {
            await PerformActions( _table.Dispatch( action ) );
        }

        public async Task FlipDeck( FlipDeckAction action )
        {
            await PerformActions( _table.Dispatch( action ) );
        }
        public async Task MoveDeck( MoveDeckAction action )
        {
            await PerformActions( _table.Dispatch( action ) );
        }
        public async Task DeckUp( DeckUpAction action )
        {
            await PerformActions( _table.Dispatch( action ) );
        }
        public async Task DeckDown( DeckDownAction action )
        {
            await PerformActions( _table.Dispatch( action ) );
        }
        public async Task ShuffleDeck( ShuffleDeckAction action )
        {
            await PerformActions( _table.Dispatch( action ) );
        }
        public async Task TakeTopDeckCard( TakeTopDeckCardAction action )
        {
            await PerformActions( _table.Dispatch( action ) );
        }

        private async Task PerformActions( IEnumerable<ITableAction> actions )
        {
            foreach( var action in actions )
            {
                await Clients.All.SendAsync( "PerformAction", action );
            }
        }
    }
}