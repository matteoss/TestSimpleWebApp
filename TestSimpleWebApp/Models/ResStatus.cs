using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestSimpleWebApp.Models
{
    public class ResStatus
    {
        public ResStatus()
        {
            Reservations = new HashSet<Reservation>();
        }

        public int Id { get; set; }
        public String Name { get; set; }
        public int ColorId { get; set; }
        public virtual Color Color { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }

    }
}
