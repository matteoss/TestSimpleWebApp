define(['ko', 'jquery', 'book_controller', 'text!./book-table.html'], function (ko, $, b, htmlString) {
    function bookTable(params) {
        //console.log(ko.toJSON(b.reservationRows()));
        let self = this;
        this.params = b.params;
        this.refreshFunction = function () {
            b.refreshFunction();
            self.checkedId("");
        };
        this.dates = b.dates;
        this.reservationRows = b.reservationRows;
        this.checkedId = ko.observable("");
        this.selectedRes = ko.pureComputed(function () {
            let chkId = self.checkedId();
            try {
                let row = self.reservationRows().findIndex((r) => {
                    if (typeof r.reservations === 'function') {
                        let res = r.reservations();
                        return res.findIndex((e) => e.id() == chkId) > -1;
                    } else {
                        return -1;
                    }
                });
                if (row > -1) {
                    let res = self.reservationRows()[row].reservations().find((e) => e.id() == chkId);
                    console.log(ko.toJSON(res));
                    return res;
                } else {
                    console.log("selected res not found");
                    return null;
                }
            } catch (e) {
                console.log(e);
                return null;
            }
        }, this);
        this.displayDetails = ko.pureComputed(function () {
            return self.checkedId() > 0 /*&& self.selectedRes() != null*/;
        });
        console.log("book-table loaded");
    }


    return { viewModel: bookTable, template: htmlString };
});
