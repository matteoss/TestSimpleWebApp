
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
    public class PropertyController : ODataController
    {

        private readonly PropertyManagementSystemDbContext _propertyManagementSystemDbContext;

        public PropertyController(PropertyManagementSystemDbContext propertyManagementSystemDbContext)
        {
            _propertyManagementSystemDbContext = propertyManagementSystemDbContext;
        }

        [HttpGet("odata/Properties")]
        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_propertyManagementSystemDbContext.Properties);
        }

        [HttpGet("odata/Properties({id})")]
        [EnableQuery]
        public IActionResult Get(int id)
        {
            return Ok(_propertyManagementSystemDbContext.Properties.FirstOrDefault(o => o.Id == id));
        }

        [HttpPost("odata/Properties")]
        public async Task<IActionResult> Post([FromBody] Property property)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _propertyManagementSystemDbContext.Properties.Add(property);
            await _propertyManagementSystemDbContext.SaveChangesAsync();
            return Created(property);
        }

        [HttpPatch("odata/Properties({id})")]
        public async Task<IActionResult> Patch([FromODataUri] int id, [FromBody] Delta<Property> property)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await _propertyManagementSystemDbContext.Properties.FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }
            property.Patch(entity);
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
                if (!_propertyManagementSystemDbContext.Properties.Any(g => g.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(property);
        }

        [HttpDelete("odata/Properties({id})")]
        public async Task<IActionResult> Delete([FromODataUri] int id)
        {
            var property = await _propertyManagementSystemDbContext.Properties.FindAsync(id);
            if (property == null)
            {
                return NotFound();
            }

            _propertyManagementSystemDbContext.Remove(property);
            await _propertyManagementSystemDbContext.SaveChangesAsync();

            return StatusCode((int)HttpStatusCode.NoContent);
        }
    }
}
