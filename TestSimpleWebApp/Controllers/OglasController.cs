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
    [ApiController]
    public class OglasController : ControllerBase
    {
        private readonly TestSimpleWebAppContext _testSimpleWebAppContext;
        private readonly int _itemsPerPage = 2;

        public OglasController(TestSimpleWebAppContext testSimpleWebAppContext)
        {
            _testSimpleWebAppContext = testSimpleWebAppContext;
        }

        [HttpGet("/Oglasi/{page:int:min(1)}/{trazi?}")]
        public IActionResult getOglasi(String trazi, int page)
        {
            List<Oglas> oglasi = _testSimpleWebAppContext.Oglasi
                .Where(o => o.Naziv.Contains(trazi) || String.IsNullOrEmpty(trazi))
                .OrderBy(a => a.Naziv)
                .Skip(_itemsPerPage * (page - 1))
                .Take(_itemsPerPage + 1)
                .ToList();
            PagedList<Oglas> oglasiPaged = new PagedList<Oglas>();
            if (oglasi.Count > _itemsPerPage) {
                oglasi.RemoveAt(oglasi.Count - 1);
                oglasiPaged.HasMore = true;
            } else
            {
                oglasiPaged.HasMore = false;
            }
            oglasiPaged.List = oglasi;
            return Ok(oglasiPaged);
        }
    }
}
