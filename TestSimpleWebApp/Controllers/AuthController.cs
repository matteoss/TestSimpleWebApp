using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestSimpleWebApp.Data;
using TestSimpleWebApp.Models;
using TestSimpleWebApp.Security;

namespace TestSimpleWebApp.Controllers
{
    public class AuthController : Controller
    {
        private readonly TestSimpleWebAppContext _testSimpleWebAppContext;
        private readonly IKorisnikService _korisnikService;


        public AuthController(TestSimpleWebAppContext testSimpleWebAppContext, IKorisnikService korisnikService)
        {
            _testSimpleWebAppContext = testSimpleWebAppContext;
            _korisnikService = korisnikService;
        }

        [HttpPost("login")]
        public IActionResult Login(AuthRequest authRequest)
        {
            var response = _korisnikService.Authenticate(authRequest);
            if (response == null)
            {
                return BadRequest(new { message = "Login Failed." });
            } 
            else
            {
                return Ok(response);
            }
        }

        [Authorize]
        [HttpGet("authorized")]
        public IActionResult AuthMessage()
        {
            return Ok(new { message = "Authorized." });
        }
    }
}
