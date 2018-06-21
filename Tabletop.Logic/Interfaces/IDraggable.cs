using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop.Logic.Interfaces
{
    interface IDraggable : IObject
    {
        /// <summary>
        /// Взять
        /// </summary>
        void Grab();
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
        bool IsGrabbed();
    }
}
