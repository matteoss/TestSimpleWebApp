using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestSimpleWebApp.Models
{
    public class AuthResponse
    {
        public string Token { get; set; }
        public DateTime Expires { get; set; }
        public String Role { get; set; }

        public AuthResponse(string token, DateTime expires)
        {
            Token = token;
            Expires = expires;
        }
        public AuthResponse(string token, DateTime expires, String role)
        {
            Token = token;
            Expires = expires;
            Role = role;
        }
    }
}
