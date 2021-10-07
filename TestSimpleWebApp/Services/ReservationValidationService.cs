using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestSimpleWebApp.Models;

namespace TestSimpleWebApp.Services
{
    public class ReservationValidationService
    {
        private readonly Validator<Reservation> _reservationValidator;

        public ReservationValidationService()
        {
            _reservationValidator = ReservationValidationFactory.getStandardReservationValidator(); ;
        }

        public void ValidateReservation(Reservation reservation)
        {
            _reservationValidator.Validate(reservation);
        }
    }
}
