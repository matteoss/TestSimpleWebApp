define(['ko', 'text!./book-table.html'], function (ko, htmlString) {
    function about(params) {
        this.reservationRows = params.reservationRows;
    }
    return { viewModel: about, template: htmlString };
});
