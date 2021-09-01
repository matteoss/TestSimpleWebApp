
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.Linq;
using TestSimpleWebApp.Data;
using TestSimpleWebApp.Models;

namespace TestSimpleWebApp.Controllers
{
    public class OglasOdataController : ODataController
    {

        private readonly TestSimpleWebAppContext _testSimpleWebAppContext;

        public OglasOdataController(TestSimpleWebAppContext testSimpleWebAppContext)
        {
            _testSimpleWebAppContext = testSimpleWebAppContext;
        }

        [HttpGet("odata/Oglasi")]
        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_testSimpleWebAppContext.Oglasi);
        }

        [HttpGet("odata/Oglasi({id})")]
        [EnableQuery]
        public IActionResult Get(int id)
        {
            return Ok(_testSimpleWebAppContext.Oglasi.FirstOrDefault(o => o.ID == id));
        }

    }
}
