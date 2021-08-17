using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TestSimpleWebApp.Models
{
    public class Oglas
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public String Naziv { get; set; }
        public int VlasnikID { get; set; }
        public String Opis { get; set; }
        public DateTime DatumKreiranja { get; set; }

        public Oglas()
        {

        }

        public Oglas(string naziv, int vlasnikID, string opis, DateTime datumKreiranja)
        {
            Naziv = naziv;
            VlasnikID = vlasnikID;
            Opis = opis;
            DatumKreiranja = datumKreiranja;
        }

        public override string ToString()
        {
            return "ID: "+ID+", Naziv: "+Naziv + ", VlasnikID: "+VlasnikID+", Opis: "+Opis;
        }
    }
}
