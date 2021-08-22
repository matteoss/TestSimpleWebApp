using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestSimpleWebApp.Data;
using TestSimpleWebApp.Models;
using TestSimpleWebApp.Security;

namespace TestSimpleWebApp.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TestSimpleWebAppContext _testSimpleWebAppContext;
        private readonly IKorisnikService _korisnikService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(TestSimpleWebAppContext testSimpleWebAppContext, IKorisnikService korisnikService, ILogger<AuthController> logger)
        {
            _testSimpleWebAppContext = testSimpleWebAppContext;
            _korisnikService = korisnikService;
            _logger = logger;
        }

        [HttpPost("login")]
        public IActionResult Login(AuthRequest authRequest)
        {
            var response = _korisnikService.Authenticate(authRequest);
            if (response == null)
            {
                _logger.LogDebug("Login failed for username: {user}", authRequest.Username);
                return BadRequest(new { message = "Login Failed for "+ authRequest.Username });
            } 
            else
            {
                _logger.LogDebug("Login success for username: {user}", authRequest.Username);
                _logger.LogDebug("Login token: {token} expires: {exp}", response.Token, response.Expires);
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
