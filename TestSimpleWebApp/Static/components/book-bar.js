define(['ko', 'text!./book-bar.html'], function (ko, htmlString) {
    function bookBar(params) {
        //console.log(ko.toJSON(params));
        self = this;
        this.id = params.reservation.id;
        this.checkedId = params.checkedId;
        this.barClass = ko.pureComputed(function () {
            let bc = 'book-bar-td';
            if (params.reservation.status() == 'Reserved') {
                bc = bc + ' book-bar-reserved';
            } else if (params.reservation.status() == 'CheckedIn') {
                bc = bc + ' book-bar-checked-in';
            }
            return bc;
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
