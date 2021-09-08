using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TestSimpleWebApp.Data;
using TestSimpleWebApp.Models;
using TestSimpleWebApp.Security;

namespace TestSimpleWebApp.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly PropertyManagementSystemDbContext _propertyManagementSystemDbContext;
        private readonly IUserService _userService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(PropertyManagementSystemDbContext propertyManagementSystemDbContext, IUserService userService, ILogger<AuthController> logger)
        {
            _propertyManagementSystemDbContext = propertyManagementSystemDbContext;
            _userService = userService;
            _logger = logger;
        }

        [HttpPost("login")]
        public IActionResult Login(AuthRequest authRequest)
        {
            var response = _userService.Authenticate(authRequest);
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
