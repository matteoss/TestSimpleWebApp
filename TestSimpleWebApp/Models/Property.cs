using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
        [Required(AllowEmptyStrings = false)]
        [StringLength(250)]
        public string Name { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
