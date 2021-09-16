
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.Linq;
using TestSimpleWebApp.Data;
using TestSimpleWebApp.Models;

namespace TestSimpleWebApp.Controllers
{
    public class GuestController : ODataController
    {

        private readonly PropertyManagementSystemDbContext _propertyManagementSystemDbContext;

        public GuestController(PropertyManagementSystemDbContext propertyManagementSystemDbContext)
        {
            _propertyManagementSystemDbContext = propertyManagementSystemDbContext;
        }

        [HttpGet("odata/Guests")]
        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_propertyManagementSystemDbContext.Guests);
        }

        [Route("odata/Guests({id})")]
        [EnableQuery]
        public IActionResult Get(int id)
        {
            return Ok(_propertyManagementSystemDbContext.Guests.FirstOrDefault(o => o.Id == id));
        }

    }
}
