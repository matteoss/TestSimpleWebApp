using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestSimpleWebApp.Models;

namespace TestSimpleWebApp.Services
{
    public interface ValidationStep<T>
    {
        public void Validate(T entity);
    }
}
