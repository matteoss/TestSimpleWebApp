using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestSimpleWebApp.Models;

namespace TestSimpleWebApp.Services
{
    public interface Validator<T>
    {
        public void Validate(T entity);
    }
}
