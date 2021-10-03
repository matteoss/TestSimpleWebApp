
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TestSimpleWebApp.Data;
using TestSimpleWebApp.Models;

namespace TestSimpleWebApp.Controllers
{
    public class GuestController : ODataController
    {

        private readonly PropertyManagementSystemDbContext _propertyManagementSystemDbContext;
        private readonly ILogger<GuestController> _logger;

        public GuestController(PropertyManagementSystemDbContext propertyManagementSystemDbContext, ILogger<GuestController> logger)
        {
            _propertyManagementSystemDbContext = propertyManagementSystemDbContext;
            _logger = logger;
        }

        [HttpGet("odata/Guests")]
        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_propertyManagementSystemDbContext.Guests);
        }

        [HttpGet("odata/Guests({id})")]
        [EnableQuery]
        public IActionResult Get(int id)
        {
            return Ok(_propertyManagementSystemDbContext.Guests.FirstOrDefault(o => o.Id == id));
        }

        [HttpPost("odata/Guests")]
        public async Task<IActionResult> Post([FromBody]Guest guest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _propertyManagementSystemDbContext.Guests.Add(guest);
            await _propertyManagementSystemDbContext.SaveChangesAsync();
            return Created(guest);
        }

        [HttpPatch("odata/Guests({id})")]
        public async Task<IActionResult> Patch([FromODataUri]int id, [FromBody]Delta<Guest> guest)
        { 
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await _propertyManagementSystemDbContext.Guests.FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }
            guest.Patch(entity); 
            
            if (!TryValidateModel(entity))
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _propertyManagementSystemDbContext.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException)
            {
                if (!_propertyManagementSystemDbContext.Guests.Any(g => g.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(guest);
        }

        [HttpDelete("odata/Guests({id})")]
        public async Task<IActionResult> Delete([FromODataUri] int id)
        {
            var guest = await _propertyManagementSystemDbContext.Guests.FindAsync(id);
            if (guest == null)
            {
                return NotFound();
            }

            _propertyManagementSystemDbContext.Remove(guest);
            await _propertyManagementSystemDbContext.SaveChangesAsync();

            return StatusCode((int)HttpStatusCode.NoContent);
        }

    }
}
