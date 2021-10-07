using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestSimpleWebApp.Models;
using TestSimpleWebApp.Services.ReservationValidationSteps;

namespace TestSimpleWebApp.Services
{
    public class ReservationValidationFactory
    {
        public static Validator<Reservation> getStandardReservationValidator()
        {
            ValidatorBuilder<Reservation> builder = new ValidatorBuilder<Reservation>();
            builder.addValidationStep(new ValidateDate());
            builder.addValidationStep(new ValidateOverlap());
            return builder.Build();
        }
    }
}
