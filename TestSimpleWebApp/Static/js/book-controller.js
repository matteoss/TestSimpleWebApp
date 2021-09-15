
define(['ko'], function (ko) {
    function Book() {
        let self = this;
        this.version  = "1.0";
        this.propertyId = ko.observable("");
        this.roomId = ko.observable("");
        this.dateFrom = ko.observable(new Date(2021, 9, 1));
        this.reservationRows = ko.observableArray([]);
        this.numberOfDays = 30;
    };

    Book.prototype.refreshFunction = function () {
        this.reservationRows.removeAll();
        let self = this;
        let dateTo = new Date(this.dateFrom());
        dateTo.setDate(dateTo.getDate() + this.numberOfDays);
        let query = "/odata/Reservations/?$filter=EndDate le " + dateTo.toISOString() + "&$expand=Guest&$orderby=PropertyId,RoomNumber,StartDate";
        console.log(query);
        $.getJSON(query, function (result) {
            //console.log(JSON.stringify(result));
            let lastPropertyId;
            let lastRoomNumber;
            let currReservations = [];
            $.each(result.value, function (i, res) {
                //console.log(JSON.stringify(res));

                if (lastPropertyId != res.PropertyId || lastRoomNumber != res.RoomNumber) {
                    if (currReservations.length > 0) {
                        let resRow = {
                            propertyId: lastPropertyId,
                            roomNumber: lastRoomNumber,
                            reservations: ko.observableArray(Array.from(currReservations))
                        };
                        self.reservationRows.push(resRow);
                        currReservations = [];
                    }
                }


                currReservations.push({
                    id: res.Id,
                    status: res.Status,
                    startDate: res.StartDate,
                    endDate: res.EndDate,
                    serviceId: res.ServiceId,
                    guestId: res.GuestId,
                    previousStay: res.PreviousStay,
                    nextStay: res.NextStay,
                    guest: res.Guest
                });


                lastPropertyId = res.PropertyId;
                lastRoomNumber = res.RoomNumber;
            });

            if (currReservations.length > 0) {
                let resRow = {
                    propertyId: lastPropertyId,
                    roomNumber: lastRoomNumber,
                    reservations: ko.observableArray(currReservations.slice())
                };
                self.reservationRows.push(resRow);
            }
            //console.log(ko.toJSON(self.reservationRows()));

        });
    }

    return new Book();
});
    

