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
    public class ResStatusController : ODataController
    {

        private readonly PropertyManagementSystemDbContext _propertyManagementSystemDbContext;

        public ResStatusController(PropertyManagementSystemDbContext propertyManagementSystemDbContext)
        {
            _propertyManagementSystemDbContext = propertyManagementSystemDbContext;
        }

        [HttpGet("odata/ResStatuses")]
        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_propertyManagementSystemDbContext.ResStatuses);
        }

        [HttpGet("odata/ResStatuses({id})")]
        [EnableQuery]
        public IActionResult Get(int id)
        {
            return Ok(_propertyManagementSystemDbContext.ResStatuses.FirstOrDefault(o => o.Id == id));
        }

        [HttpPost("odata/ResStatuses")]
        public async Task<IActionResult> Post([FromBody] ResStatus resStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _propertyManagementSystemDbContext.ResStatuses.Add(resStatus);
            await _propertyManagementSystemDbContext.SaveChangesAsync();
            return Created(resStatus);
        }

        [HttpPatch("odata/ResStatuses({id})")]
        public async Task<IActionResult> Patch([FromODataUri] int id, [FromBody] Delta<ResStatus> resStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await _propertyManagementSystemDbContext.ResStatuses.FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }
            resStatus.Patch(entity);
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
                if (!_propertyManagementSystemDbContext.ResStatuses.Any(g => g.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(resStatus);
        }

        [HttpDelete("odata/ResStatuses({id})")]
        public async Task<IActionResult> Delete([FromODataUri] int id)
        {
            var resStatus = await _propertyManagementSystemDbContext.ResStatuses.FindAsync(id);
            if (resStatus == null)
            {
                return NotFound();
            }

            _propertyManagementSystemDbContext.Remove(resStatus);
            await _propertyManagementSystemDbContext.SaveChangesAsync();

            return StatusCode((int)HttpStatusCode.NoContent);
        }
    }
}
