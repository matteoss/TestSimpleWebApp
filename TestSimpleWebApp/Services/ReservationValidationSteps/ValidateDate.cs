using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestSimpleWebApp.Models;

namespace TestSimpleWebApp.Services.ReservationValidationSteps
{
    public class ValidateDate : ValidationStep<Reservation>
    {
        public void Validate(Reservation reservation)
        {
            if (reservation.StartDate > reservation.EndDate)
            {
                throw new ReservationValidationException("Start date should be before end date.");
            }
        }
    }
}
