using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using TestSimpleWebApp.Data;
using TestSimpleWebApp.Models;

namespace TestSimpleWebApp.Controllers
{
    public class OglasController : Controller
    {
        private readonly TestSimpleWebAppContext _testSimpleWebAppContext;

        public OglasController(TestSimpleWebAppContext testSimpleWebAppContext)
        {
            _testSimpleWebAppContext = testSimpleWebAppContext;
        }

        [HttpGet("/Oglasi/{trazi?}")]
        public String getOglasi(String trazi)
        {
            List<Oglas> oglasi = _testSimpleWebAppContext.Oglasi.Where(o => o.Naziv.Contains(trazi) || String.IsNullOrEmpty(trazi)).ToList();
            return JsonSerializer.Serialize(oglasi);
        }
    }
}
