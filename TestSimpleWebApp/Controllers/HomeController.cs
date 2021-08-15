using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestSimpleWebApp.Controllers
{
    
    public class HomeController : Controller
    {
        [HttpGet("")]
        [HttpGet("home")]
        //[HttpGet("index")]
        public String Index()
        {
            return "Hello world from HomeController!";
        }
    }
}
