using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Tabletop.Logic.Models;
using Tabletop.Logic.Models.Actions;
using Tabletop.Logic.Models.Actions.Filter;
using Tabletop.Logic.Models.Actions.In.Card;
using Tabletop.Logic.Models.Actions.In.Chat;
using Tabletop.Logic.Models.Actions.In.Deck;
using Tabletop.Logic.Models.Actions.In.User;
using Tabletop.Logic.Models.Actions.User;

namespace Tabletop.Hubs
{
    public class GameHub : Hub
    {
        private static Table _table = new Table( 1000, 1000 );

        public async Task Connect( InConnectAction action )
        {
            var result = new List<ITableAction>();
            await PerformActions( _table.Dispatch( action, Context.ConnectionId ) );
        }
        public override async Task OnDisconnectedAsync( Exception exception )
        {
            var action = new InRemoveUserAction
            {
                Id = Context.ConnectionId
            };
            await PerformActions( _table.Dispatch( action ) );

            await base.OnDisconnectedAsync( exception );
        }

        public async Task SendMessage( InSendMessageAction action )
        {
            await PerformActions( _table.Dispatch( action, Context.ConnectionId ) );
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

        public async Task FlipCard( InFlipCardAction action )
        {
            await PerformActions( _table.Dispatch( action ) );
        }
        public async Task MoveCard( InMoveCardAction action )
        {
            await PerformActions( _table.Dispatch( action, Context.ConnectionId ) );
        }
        public async Task CardUp( InCardUpAction action )
        {
            await PerformActions( _table.Dispatch( action, Context.ConnectionId ) );
        }
        public async Task DropCard( InDropCardAction action )
        {
            await PerformActions( _table.Dispatch( action, Context.ConnectionId ) );
        }
        public async Task AddCard( InAddCardAction action )
        {
            await PerformActions( _table.Dispatch( action, Context.ConnectionId ) );
        }

        public async Task FlipDeck( InFlipDeckAction action )
        {
            await PerformActions( _table.Dispatch( action ) );
        }
        public async Task MoveDeck( InMoveDeckAction action )
        {
            await PerformActions( _table.Dispatch( action, Context.ConnectionId ) );
        }
        public async Task DeckUp( InDeckUpAction action )
        {
            await PerformActions( _table.Dispatch( action, Context.ConnectionId ) );
        }
        public async Task DeckDown( InDropDeckAction action )
        {
            await PerformActions( _table.Dispatch( action, Context.ConnectionId ) );
        }
        public async Task ShuffleDeck( InShuffleDeckAction action )
        {
            await PerformActions( _table.Dispatch( action ) );
        }
        public async Task TakeTopDeckCard( InTakeTopDeckCardAction action )
        {
            await PerformActions( _table.Dispatch( action, Context.ConnectionId ) );
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