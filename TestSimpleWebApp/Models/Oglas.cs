using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestSimpleWebApp.Models
{
    public class Oglas
    {
        public int ID { get; set; }
        public String Naziv { get; set; }
        public int VlasnikID { get; set; }
        public String Opis { get; set; }
    }
}
