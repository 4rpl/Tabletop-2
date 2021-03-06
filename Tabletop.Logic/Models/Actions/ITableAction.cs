﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Tabletop.Logic.Models.Actions
{
    public enum Resiever
    {
        Caller,
        Others,
        All,
        Special
    }

    public interface ITableAction
    {
        string Type { get; set; }
        [JsonIgnore]
        Resiever Resiever { get; set; }
        [JsonIgnore]
        List<string> ResieverIds { get; set; }
    }
}
