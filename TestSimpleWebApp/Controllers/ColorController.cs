using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TestSimpleWebApp.Models;

namespace TestSimpleWebApp.Controllers
{
    public class ColorController : ODataController
    {

        private readonly PropertyManagementSystemDbContext _propertyManagementSystemDbContext;

        public ColorController(PropertyManagementSystemDbContext propertyManagementSystemDbContext)
        {
            _propertyManagementSystemDbContext = propertyManagementSystemDbContext;
        }

        [HttpGet("odata/Colors")]
        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_propertyManagementSystemDbContext.Colors);
        }

        [HttpGet("odata/Colors({id})")]
        [EnableQuery]
        public IActionResult Get(int id)
        {
            return Ok(_propertyManagementSystemDbContext.Colors.FirstOrDefault(o => o.Id == id));
        }

        [HttpPost("odata/Colors")]
        public async Task<IActionResult> Post([FromBody] Color color)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _propertyManagementSystemDbContext.Colors.Add(color);
            await _propertyManagementSystemDbContext.SaveChangesAsync();
            return Created(color);
        }

        [HttpPatch("odata/Colors({id})")]
        public async Task<IActionResult> Patch([FromODataUri] int id, [FromBody] Delta<Color> color)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await _propertyManagementSystemDbContext.Colors.FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }
            color.Patch(entity);
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
                if (!_propertyManagementSystemDbContext.Colors.Any(g => g.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(color);
        }

        [HttpDelete("odata/Colors({id})")]
        public async Task<IActionResult> Delete([FromODataUri] int id)
        {
            var color = await _propertyManagementSystemDbContext.Colors.FindAsync(id);
            if (color == null)
            {
                return NotFound();
            }

            _propertyManagementSystemDbContext.Remove(color);
            await _propertyManagementSystemDbContext.SaveChangesAsync();

            return StatusCode((int)HttpStatusCode.NoContent);
        }
    }
}
