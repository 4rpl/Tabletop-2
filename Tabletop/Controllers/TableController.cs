using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Tabletop.Controllers
{
    [Route( "api/[controller]" )]
    public class TableController : Controller
    {
        [HttpPost]
        [Route( "Create" )]
        public async Task<IActionResult> Create( JoinParams model )
        {
            return Redirect( "/table/" + model.Id );
        }

        [HttpPost]
        [Route( "Join" )]
        public async Task<IActionResult> Join( [FromBody]JoinParams model )
        {
            return Redirect( "/table/" + model.Id );
        }

        public class JoinParams
        {
            public string Id { get; set; }
            public string Password { get; set; }
        }
    }
}
