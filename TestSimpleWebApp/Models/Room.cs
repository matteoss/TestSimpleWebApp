using System;
using System.Collections.Generic;

#nullable disable

namespace TestSimpleWebApp.Models
{
    public partial class Room
    {
        public Room()
        {
            Reservations = new HashSet<Reservation>();
        }

        public int PropertyId { get; set; }
        public int RoomNumber { get; set; }
        public int RoomTypeId { get; set; }
        public string Status { get; set; }

        public virtual RoomType RoomType { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
