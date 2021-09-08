using System;
using System.Collections.Generic;

#nullable disable

namespace TestSimpleWebApp.Models
{
    public partial class Property
    {
        public Property()
        {
            Reservations = new HashSet<Reservation>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
