
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
    public class RoomTypeController : ODataController
    {

        private readonly PropertyManagementSystemDbContext _propertyManagementSystemDbContext;

        public RoomTypeController(PropertyManagementSystemDbContext propertyManagementSystemDbContext)
        {
            _propertyManagementSystemDbContext = propertyManagementSystemDbContext;
        }

        [HttpGet("odata/RoomTypes")]
        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_propertyManagementSystemDbContext.RoomTypes);
        }

        [HttpGet("odata/RoomTypes({id})")]
        [EnableQuery]
        public IActionResult Get(int id)
        {
            return Ok(_propertyManagementSystemDbContext.RoomTypes.FirstOrDefault(o => o.Id == id));
        }

        [HttpPost("odata/RoomTypes")]
        public async Task<IActionResult> Post([FromBody] RoomType roomType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _propertyManagementSystemDbContext.RoomTypes.Add(roomType);
            await _propertyManagementSystemDbContext.SaveChangesAsync();
            return Created(roomType);
        }

        [HttpPatch("odata/RoomTypes({id})")]
        public async Task<IActionResult> Patch([FromODataUri] int id, [FromBody] Delta<RoomType> roomType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await _propertyManagementSystemDbContext.RoomTypes.FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }
            roomType.Patch(entity);
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
                if (!_propertyManagementSystemDbContext.RoomTypes.Any(g => g.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(roomType);
        }

        [HttpDelete("odata/RoomTypes({id})")]
        public async Task<IActionResult> Delete([FromODataUri] int id)
        {
            var roomType = await _propertyManagementSystemDbContext.RoomTypes.FindAsync(id);
            if (roomType == null)
            {
                return NotFound();
            }

            _propertyManagementSystemDbContext.Remove(roomType);
            await _propertyManagementSystemDbContext.SaveChangesAsync();

            return StatusCode((int)HttpStatusCode.NoContent);
        }
    }
}
