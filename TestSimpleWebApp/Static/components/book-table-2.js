define(['ko', 'jquery', 'book_controller_2', 'text!./book-table-2.html'], function (ko, $, b, htmlString) {
    function bookTable2(params) {
        //console.log(ko.toJSON(b.reservationRows()));
        let self = this;
        this.dates = b.dates;
        this.reservationRows = b.reservationRows;
        this.checkedId = ko.observable("");
        this.selectedRes = ko.pureComputed(function () {
            try {
                let row = self.reservationRows().findIndex((r) => {
                    let res = r.reservations();
                    return res.findIndex((e) => e.id == self.checkedId()) > -1;
                });
                if (row > -1) {
                    return self.reservationRows()[row].reservations().find((e) => e.id == self.checkedId());
                } else {
                    return null;
                }                
            } catch (e) {
                console.log(e);
                return null;
            }
        });
        this.displayDetails = ko.pureComputed(function () {
            return self.checkedId() > 0 && self.selectedRes() != null;
        });
        $(document).ready(function () {
            b.refreshFunction();
        });
        console.log("book-table-2 loaded");
    }


    return { viewModel: bookTable2, template: htmlString };
});
