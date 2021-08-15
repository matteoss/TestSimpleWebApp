using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TestSimpleWebApp.Models;

namespace TestSimpleWebApp.Data
{
    public class TestSimpleWebAppContext : DbContext
    {
        public TestSimpleWebAppContext(DbContextOptions<TestSimpleWebAppContext> options) : base(options)
        {

        }
        public DbSet<Oglas> Oglasi { get; set; }
        public DbSet<Korisnik> Korisnici { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Oglas>().ToTable("Oglas");
            modelBuilder.Entity<Korisnik>().ToTable("Korisnik");
        }
    }
}
