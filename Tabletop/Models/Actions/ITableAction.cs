using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop.Models.Actions
{
    public interface ITableAction
    {
        string Type { get; set; }
    }
}
