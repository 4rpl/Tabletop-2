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
        [HttpGet]
        [Route( "RequestSession" )]
        public async Task<IActionResult> RequestSession()
        {
            return Ok();
        }
    }
}
