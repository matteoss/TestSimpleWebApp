using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TestSimpleWebApp.Models
{
    public class Korisnik
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string KorisnickoIme { get; set; }
        public string Opis { get; set; }
        [JsonIgnore]
        public string Lozinka { get; set; }

        public Korisnik(string korisnickoIme, string opis)
        {
            KorisnickoIme = korisnickoIme;
            Opis = opis;
        }
    }
}
