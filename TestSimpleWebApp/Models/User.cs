using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TestSimpleWebApp.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        public string Role { get; set; }

        public User() { }

        public User(string username, string desc, string pass, string role)
        {
            Username = username;
            Description = desc;
            Password = pass;
            Role = role;
        }
    }
}
