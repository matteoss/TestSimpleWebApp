using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
        [StringLength(250, ErrorMessage = "Name can't be more than 250.")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "Name is required.")]
        public string Name { get; set; }
        [StringLength(250, ErrorMessage = "Surname can't be more than 250.")]
        [Required(AllowEmptyStrings = false)]
        public string Surname { get; set; }
        public DateTime? DateOfBirth { get; set; }
        [StringLength(100, ErrorMessage = "DocumentType can't be more than 100.")]
        public string DocumentType { get; set; }
        [StringLength(200, ErrorMessage = "DocumentId can't be more than 200.")]
        public string DocumentId { get; set; }
        [StringLength(3, ErrorMessage = "Country code can't be more than 3.")]
        public string Country { get; set; }
        [StringLength(100, ErrorMessage = "City can't be more than 100.")]
        public string City { get; set; }
        [StringLength(250, ErrorMessage = "Address can't be more than 250.")]
        public string Address { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
