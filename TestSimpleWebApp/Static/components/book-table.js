define(['ko', 'jquery', 'book_controller', 'text!./book-table.html'], function (ko, $, b, htmlString) {
    function bookTable(params) {
        //console.log(ko.toJSON(b.reservationRows()));
        this.dates = ko.pureComputed(function () {
            let d = [];
            for (let i = 0; i < b.numberOfDays; i++) {
                let date = new Date(b.dateFrom());
                date.setDate(date.getDate() + i);
                d.push(date.toISOString().split('T')[0]);
            }
            return d;
        }, this);
        this.reservationRows = b.reservationRows;

    }


    return { viewModel: bookTable, template: htmlString };
});
