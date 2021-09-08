define(['ko', 'text!./reservation-bar.html'], function (ko, htmlString) {
    function about(params) {
        this.id = params.reservation.id;
        this.checkedId = ko.observable("");
        this.reservationText = params.reservation.guest.surname;
    }
    return { viewModel: about, template: htmlString };
});
