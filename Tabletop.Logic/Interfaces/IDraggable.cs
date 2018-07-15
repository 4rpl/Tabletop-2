using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabletop.Logic.Models;

namespace Tabletop.Logic.Interfaces
{
    public interface IDraggable : IObject
    {
        /// <summary>
        /// Взять
        /// </summary>
        void Grab( User owner, int mx, int my, double alpha );
        /// <summary>
        /// Подвигать
        /// </summary>
        void Move(int x, int y);
        /// <summary>
        /// Отпустить
        /// </summary>
        void Drop();
        /// <summary>
        /// Перетаскивается ли кем-то
        /// </summary>
        /// <returns></returns>
        bool IsGrabbed { get; }
        /// <summary>
        /// Взявший
        /// </summary>
        User Owner { get; }
        /// <summary>
        /// Z-координата
        /// </summary>
        int Z { get; }
        int Mx { get; }
        int My { get; }
    }
}
