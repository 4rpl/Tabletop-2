using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using Tabletop.Models.Actions;
using Tabletop.Services;

namespace Tabletop.Controllers
{
    [Route( "api/[controller]" )]
    public class TableController : Controller
    {
        [HttpGet]
        [Route( "RequestSession" )]
        public async Task<IActionResult> RequestSession()
        {
            if( HttpContext.WebSockets.IsWebSocketRequest )
            {
                var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();

                var buffer = new byte[1024 * 4];
                var result = await webSocket.ReceiveAsync( new ArraySegment<byte>( buffer ), CancellationToken.None );
                while( !result.CloseStatus.HasValue )
                {
                    try
                    {
                        var actionJObject = DeserializeAction( buffer );
                        var action = TableActionParser.Parse( actionJObject );
                        // TODO: process
                        var responseAction = SerializeAction( action );
                        Array.Clear( buffer, 0, buffer.Length );
                        await webSocket.SendAsync( new ArraySegment<byte>( responseAction ), result.MessageType, result.EndOfMessage, CancellationToken.None );

                        result = await webSocket.ReceiveAsync( new ArraySegment<byte>( buffer ), CancellationToken.None );
                    }
                    catch( Exception e )
                    {

                    }
                }
                await webSocket.CloseAsync( result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None );
                return Ok();
            }
            else
            {
                return BadRequest( "Not WebSocket Request" );
            }
        }

        private JObject DeserializeAction( byte[] buffer )
        {
            var actionJson = Encoding.UTF8.GetString( buffer ).TrimEnd( '\0' );
            var action = JObject.Parse( actionJson );
            return action;
        }

        private byte[] SerializeAction( ITableAction action )
        {
            var json = JsonConvert.SerializeObject( action, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            } );
            var array = Encoding.UTF8.GetBytes( json );
            return array;
        }
    }
}
