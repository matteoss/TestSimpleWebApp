using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestSimpleWebApp.Security;

namespace TestSimpleWebApp.Controllers
{
    
    public class HomeController : Controller
    {
        [HttpGet("")]
        [HttpGet("home")]
        //[HttpGet("index")]
        public IActionResult Index()
        {
            return Redirect("index.html");
        }

    }
}
