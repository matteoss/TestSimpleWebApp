define(['ko', 'text!./book-bar.html'], function (ko, htmlString) {
    function bookBar(params) {
        //console.log(ko.toJSON(params));
        self = this;
        this.id = params.reservation.id;
        this.checkedId = params.checkedId;
        this.barClass = ko.pureComputed(function () {
            return 'book-bar-td ' + params.reservation.resStatus().color.definition;
        });
        this.reservationText = ko.pureComputed(function () {
            return params.reservation.guest().surname + " " + params.reservation.guest().name
                + " " + params.reservation.offset() + "/" + params.reservation.size();
        });
        this.offset = params.reservation.offset;
        this.size = params.reservation.size;
        console.log("book-bar loaded");
    }
    return { viewModel: bookBar, template: htmlString };
});
