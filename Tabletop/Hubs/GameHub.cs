using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Tabletop.Logic.Models;
using Tabletop.Logic.Models.Actions;
using Tabletop.Logic.Models.Actions.Card;
using Tabletop.Logic.Models.Actions.Deck;
using Tabletop.Logic.Models.Actions.Filter;
using Tabletop.Logic.Models.Actions.User;

namespace Tabletop.Hubs
{
    public class GameHub : Hub
    {
        private static Table _table = new Table( 3000, 3000 );

        public override async Task OnConnectedAsync()
        {
            var result = new List<ITableAction>();
            result.Add( _table.GetTable() );
            result.AddRange( _table.Dispatch( new AddUserAction
            {
                Id = Context.ConnectionId,
                Type = "AddUser",
                Name = "Test",
                X = 0,
                Y = 0
            } ) );
            await PerformActions( result );

            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync( Exception exception )
        {
            var action = new RemoveUserAction
            {
                Id = Context.ConnectionId,
                Type = "RemoveUser"
            };
            await PerformActions( _table.Dispatch( action ) );

            await base.OnDisconnectedAsync( exception );
        }
        
        public async Task MoveUser( MoveUserAction action )
        {
            action.Id = Context.ConnectionId;
            await PerformActions( _table.Dispatch( action ) );
        }

        public async Task AddFilter( AddFilterAction action )
        {
            action.OwnerId = Context.ConnectionId;
            await PerformActions( _table.Dispatch( action ) );
        }
        public async Task RemoveFilter( RemoveFilterAction action )
        {
            await PerformActions( _table.Dispatch( action ) );
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
            action.OwnerId = Context.ConnectionId;
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
                switch( action.Resiever )
                {
                    case Resiever.All:
                        {
                            await Clients.All.SendAsync( "PerformAction", action );
                            break;
                        }
                    case Resiever.Caller:
                        {
                            await Clients.Caller.SendAsync( "PerformAction", action );
                            break;
                        }
                    case Resiever.Others:
                        {
                            await Clients.Others.SendAsync( "PerformAction", action );
                            break;
                        }
                    case Resiever.Special:
                        {
                            await Clients.Clients( action.ResieverIds ).SendAsync( "PerformAction", action );
                            break;
                        }
                }
            }
        }
    }
}