using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TestSimpleWebApp.Models
{
    public class Korisnik
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public String KorisnickoIme { get; set; }
        public String Opis { get; set; }

        public Korisnik(string korisnickoIme, string opis)
        {
            KorisnickoIme = korisnickoIme;
            Opis = opis;
        }
    }
}
