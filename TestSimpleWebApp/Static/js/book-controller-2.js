
define(['ko'], function (ko) {
    function Book2() {
        let self = this;
        this.version  = "1.0";
        this.propertyId = ko.observable("");
        this.roomId = ko.observable("");
        this.dateFrom = ko.observable(new Date(2021, 9, 1));
        this.reservationRows = ko.observableArray([]);
        this.numberOfDays = 30;
        this.dates = ko.pureComputed(function () {
            let d = [];
            for (let i = 0; i < self.numberOfDays; i++) {
                let date = new Date(self.dateFrom());
                date.setDate(date.getDate() + i);
                d.push(date.toISOString().split('T')[0]);
            }
            return d;
        }, this);
    };

    Book2.prototype.refreshFunction = function () {
        this.reservationRows.removeAll();
        let self = this;
        let dateTo = new Date(this.dateFrom());
        dateTo.setDate(dateTo.getDate() + this.numberOfDays);
        let query = "/odata/Reservations/?$filter=EndDate gt " + new Date(this.dateFrom()).toISOString() + " and StartDate le " + dateTo.toISOString() + " &$expand=Guest&$orderby=PropertyId,RoomNumber,StartDate";
        console.log(query);
        $.getJSON(query, function (result) {
            //console.log(JSON.stringify(result));
            let lastPropertyId;
            let lastRoomNumber;
            let lastEndIndex = 0;
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
                    lastEndIndex = 0;
                }


                let offset = self.dates().findIndex((e) => e == res.StartDate.split('T')[0]);
                if (offset == -1) {
                    offset = 0;
                }
                let size = self.dates().findIndex((e) => e == res.EndDate.split('T')[0]);
                if (size > -1) {
                    size = size - offset;
                } else {
                    size = self.numberOfDays - 1 - offset;
                }
                offset = offset - lastEndIndex;

                function reservation() {
                    this.id = res.Id;
                    this.status= res.Status;
                    this.startDate= res.StartDate;
                    this.endDate= res.EndDate;
                    this.serviceId= res.ServiceId;
                    this.guestId= res.GuestId;
                    this.previousStay= res.PreviousStay;
                    this.nextStay = res.NextStay;
                    this.guest = res.Guest;
                    this.offset = offset;
                    this.offsetArray = new Array(this.offset);
                    this.size = ko.observable(size);
                }

                currReservations.push(new reservation());


                lastPropertyId = res.PropertyId;
                lastRoomNumber = res.RoomNumber;
                lastEndIndex = lastEndIndex + offset + size;
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

    return new Book2();
});
    

