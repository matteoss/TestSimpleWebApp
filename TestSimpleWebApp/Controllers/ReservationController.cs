
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TestSimpleWebApp.Data;
using TestSimpleWebApp.Hubs;
using TestSimpleWebApp.Models;

namespace TestSimpleWebApp.Controllers
{
    public class ReservationController : ODataController
    {

        private readonly PropertyManagementSystemDbContext _propertyManagementSystemDbContext;
        private readonly IHubContext<ReservationHub> _hub;

        public ReservationController(PropertyManagementSystemDbContext propertyManagementSystemDbContext, IHubContext<ReservationHub> hub)
        {
            _propertyManagementSystemDbContext = propertyManagementSystemDbContext;
            _hub = hub;
        }

        [HttpGet("odata/Reservations")]
        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_propertyManagementSystemDbContext.Reservations);
        }

        [HttpGet("odata/Reservations({id})")]
        [EnableQuery]
        public IActionResult Get(int id)
        {
            return Ok(_propertyManagementSystemDbContext.Reservations.FirstOrDefault(o => o.Id == id));
        }

        [HttpPost("odata/Reservations")]
        public async Task<IActionResult> Post([FromBody] Reservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _propertyManagementSystemDbContext.Reservations.Add(reservation);
            await _propertyManagementSystemDbContext.SaveChangesAsync();
            await _hub.Clients.All.SendAsync("PostReservation", reservation);
            return Created(reservation);
        }

        [HttpPatch("odata/Reservations({id})")]
        public async Task<IActionResult> Patch([FromODataUri] int id, [FromBody] Delta<Reservation> reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await _propertyManagementSystemDbContext.Reservations.FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }
            reservation.Patch(entity);

            try
            {
                await _propertyManagementSystemDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_propertyManagementSystemDbContext.Reservations.Any(g => g.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            await _hub.Clients.All.SendAsync("PatchReservation", entity);
            return Updated(reservation);
        }

        [HttpDelete("odata/Reservations({id})")]
        public async Task<IActionResult> Delete([FromODataUri] int id)
        {
            var reservation = await _propertyManagementSystemDbContext.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            _propertyManagementSystemDbContext.Remove(reservation);
            await _propertyManagementSystemDbContext.SaveChangesAsync();

            return StatusCode((int)HttpStatusCode.NoContent);
        }
    }
}
