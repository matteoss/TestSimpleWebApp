using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestSimpleWebApp.Models
{
    public class Color
    {
        public Color()
        {
            ResStatuses = new HashSet<ResStatus>();
        }

        public int Id { get; set; }
        public String Name { get; set; }
        public String Definition { get; set; }
        public virtual ICollection<ResStatus> ResStatuses { get; set; }
    }
}
