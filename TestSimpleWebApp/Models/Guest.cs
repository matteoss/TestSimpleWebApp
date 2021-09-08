using System;
using System.Collections.Generic;

#nullable disable

namespace TestSimpleWebApp.Models
{
    public partial class Guest
    {
        public Guest()
        {
            Reservations = new HashSet<Reservation>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string DocumentType { get; set; }
        public string DocumentId { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
