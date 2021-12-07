using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace TestSimpleWebApp.Models
{
    public partial class Reservation
    {
        public int Id { get; set; }
        [Required(AllowEmptyStrings = false)]
        [StringLength(50)]
        public string Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int ServiceId { get; set; }
        [Required(AllowEmptyStrings = false)]
        public int PropertyId { get; set; }
        [Required(AllowEmptyStrings = false)]
        public int GuestId { get; set; }
        public int? PreviousStay { get; set; }
        public int? NextStay { get; set; }
        public int RoomNumber { get; set; }
        public int ResStatusId { get; set; }

        public virtual Guest Guest { get; set; }
        public virtual Property Property { get; set; }
        public virtual Room Room { get; set; }
        public virtual ResStatus ResStatus { get; set; }
    }
}
