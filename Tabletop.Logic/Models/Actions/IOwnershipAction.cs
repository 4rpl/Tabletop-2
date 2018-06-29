using System;
using System.Collections.Generic;
using System.Text;

namespace Tabletop.Logic.Models.Actions
{
    public interface IOwnershipAction
    {
        bool IsOwner { get; set; }
    }
}
