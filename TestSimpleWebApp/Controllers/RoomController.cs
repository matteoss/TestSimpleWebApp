
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

namespace TestSimpleWebApp.Controllers
{
    public class RoomController : ODataController
    {

        private readonly PropertyManagementSystemDbContext _propertyManagementSystemDbContext;

        public RoomController(PropertyManagementSystemDbContext propertyManagementSystemDbContext)
        {
            _propertyManagementSystemDbContext = propertyManagementSystemDbContext;
        }

        [HttpGet("odata/Rooms")]
        [EnableQuery(MaxExpansionDepth = 3)]
        public IActionResult Get()
        {
            return Ok(_propertyManagementSystemDbContext.Rooms);
        }

        [HttpGet("odata/Rooms({propertyId},{roomNumber})")]
        [EnableQuery]
        public IActionResult Get(int propertyId, int roomNumber)
        {
            return Ok(_propertyManagementSystemDbContext.Rooms.FirstOrDefault(o => o.PropertyId == propertyId && o.RoomNumber == roomNumber));
        }


        [HttpPost("odata/Rooms")]
        public async Task<IActionResult> Post([FromBody] Room room)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _propertyManagementSystemDbContext.Rooms.Add(room);
            await _propertyManagementSystemDbContext.SaveChangesAsync();
            return Created(room);
        }

        [HttpPatch("odata/Rooms({propertyId},{roomNumber})")]
        public async Task<IActionResult> Patch([FromODataUri] int propertyId, [FromODataUri] int roomNumber, [FromBody] Delta<Room> room)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await _propertyManagementSystemDbContext.Rooms.FindAsync(new { propertyId, roomNumber });
            if (entity == null)
            {
                return NotFound();
            }
            room.Patch(entity);
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
                if (!_propertyManagementSystemDbContext.Rooms.Any(o => o.PropertyId == propertyId && o.RoomNumber == roomNumber))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(room);
        }

        [HttpDelete("odata/Rooms({propertyId},{roomNumber})")]
        public async Task<IActionResult> Delete([FromODataUri] int propertyId, [FromODataUri] int roomNumber)
        {
            var room = await _propertyManagementSystemDbContext.Rooms.FindAsync(new {propertyId, roomNumber });
            if (room == null)
            {
                return NotFound();
            }

            _propertyManagementSystemDbContext.Remove(room);
            await _propertyManagementSystemDbContext.SaveChangesAsync();

            return StatusCode((int)HttpStatusCode.NoContent);
        }

    }
}
