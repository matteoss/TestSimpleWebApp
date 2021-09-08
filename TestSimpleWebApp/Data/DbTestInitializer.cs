using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestSimpleWebApp.Models;
using TestSimpleWebApp.Security;

namespace TestSimpleWebApp.Data
{
    public static class DbTestInitializer
    {
        public static void Initialize(TestSimpleWebAppContext context, IUserService korisnikService)
        {
            context.Database.EnsureCreated();

            if (context.Oglasi.Any())
            {
                return;
            }

            var korisnici = new User[]
            {
                new User("mateo", "", korisnikService.HashPassword("lozinka"), "Admin"),
                new User("marko", "", korisnikService.HashPassword("lozinka"), "User"),
            };
            foreach(User k in korisnici){
                context.Korisnici.Add(k);
            }
            context.SaveChanges();

            var oglasi = new Oglas[]
            {
                new Oglas("Samsung S10", 1, "Prodajem mobitel Samsung S10", new DateTime()),
                new Oglas("BMW 5", 1, "BMW 520i", new DateTime()),
                new Oglas("Lenovo", 1, "Prodajem laptop lenovo", new DateTime()),
                new Oglas("Tipkovnica", 2, "Prodajem tipkovnicu Logitech", new DateTime()),
            };

            foreach(Oglas o in oglasi)
            {
                context.Oglasi.Add(o);
            }
            context.SaveChanges();
        }
    }
}
