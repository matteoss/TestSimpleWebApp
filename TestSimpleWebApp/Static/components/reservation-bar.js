define(['ko', 'text!./reservation-bar.html'], function (ko, htmlString) {
    function about(params) {
        console.log(ko.toJSON(params));
        self = this;
        this.id = params.reservation.id;
        this.checkedId = ko.observable("");
        this.reservationText = params.reservation.guest.Surname;
        this.offset = ko.pureComputed(function () {
            return params.dates().findIndex((e) => e == params.reservation.startDate.split('T')[0]);
        });
        this.size = ko.pureComputed(function () {
            let end = params.dates().findIndex((e) => e == params.reservation.endDate.split('T')[0]);
            if (end > -1) {
                return end - self.offset;
            } else {
                return 0;
            }
        });
    }
    return { viewModel: about, template: htmlString };
});
