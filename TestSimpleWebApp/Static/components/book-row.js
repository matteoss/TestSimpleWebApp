define(['ko', 'text!./book-row.html'], function (ko, htmlString) {
    function about(params) {
        this.roomNumber = params.reservationRow.roomNumber;
        this.reservations = params.reservationRow.reservations;
    }
    return { viewModel: about, template: htmlString };
});
