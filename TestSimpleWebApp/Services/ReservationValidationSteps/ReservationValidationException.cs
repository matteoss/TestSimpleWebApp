using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestSimpleWebApp.Services
{
    public class ReservationValidationException : Exception
    {
        public ReservationValidationException(string message) : base(message)
        {

        }

    }
}
