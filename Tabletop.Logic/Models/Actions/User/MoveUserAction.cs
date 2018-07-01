using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop.Logic.Models.Actions.User
{
    public class MoveUserAction : ITableAction
    {
        public string Type { get; set; }
        public Resiever Resiever { get; set; } = Resiever.Others;
        public List<string> ResieverIds { get; set; }
        public string Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }
}
