
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TestSimpleWebApp.Data;
using TestSimpleWebApp.Models;
using TestSimpleWebApp.Security;

namespace TestSimpleWebApp.Controllers
{
    [Authorize(Role = new string[] { "User", "Admin" })]
    public class UserController : ODataController
    {

        private readonly PropertyManagementSystemDbContext _propertyManagementSystemDbContext;
        private readonly IUserService _userService;

        public UserController(PropertyManagementSystemDbContext propertyManagementSystemDbContext, IUserService userService)
        {
            _propertyManagementSystemDbContext = propertyManagementSystemDbContext;
            _userService = userService;
        }

        [HttpGet("odata/Users")]
        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_propertyManagementSystemDbContext.Users);
        }

        [HttpGet("odata/Users({id})")]
        [EnableQuery]
        public IActionResult Get(int id)
        {
            return Ok(_propertyManagementSystemDbContext.Users.FirstOrDefault(o => o.Id == id));
        }

        [HttpPost("odata/Users")]
        public async Task<IActionResult> Post([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            user.Password = _userService.HashPassword(user.Password);
            _propertyManagementSystemDbContext.Users.Add(user);
            await _propertyManagementSystemDbContext.SaveChangesAsync();
            return Created(user);
        }

        [HttpPatch("odata/Users({id})")]
        public async Task<IActionResult> Patch([FromODataUri] int id, [FromBody] Delta<User> user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await _propertyManagementSystemDbContext.Users.FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }

            bool passwordChanged = false;
            object newPassword = "";
            user.TryGetPropertyValue("Password", out newPassword);

            if (newPassword != null && !entity.Password.Equals(newPassword))
            {
                passwordChanged = true;
            }

            user.Patch(entity);
            if (passwordChanged)
            {
                entity.Password = _userService.HashPassword(entity.Password);
            }
            if (!TryValidateModel(entity))
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _propertyManagementSystemDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_propertyManagementSystemDbContext.Users.Any(g => g.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(user);
        }

        [HttpDelete("odata/Users({id})")]
        public async Task<IActionResult> Delete([FromODataUri] int id)
        {
            var user = await _propertyManagementSystemDbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _propertyManagementSystemDbContext.Remove(user);
            await _propertyManagementSystemDbContext.SaveChangesAsync();

            return StatusCode((int)HttpStatusCode.NoContent);
        }
    }
}
