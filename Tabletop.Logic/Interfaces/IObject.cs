using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop.Logic.Interfaces
{
    public interface IObject
    {
        int X { get; }
        int Y { get; }
        double Alpha { get; }
        int Radius { get; }
    }
}
