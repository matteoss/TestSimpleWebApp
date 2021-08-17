using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestSimpleWebApp.Models
{
    public class PagedList<T>
    {
        public List<T> List { get; set; }
        public Boolean HasMore { get; set; }
    }
}
