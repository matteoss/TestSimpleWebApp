define(['ko', 'jquery', 'book_controller', 'text!./book-table.html'], function (ko, $, b, htmlString) {
    function bookTable(params) {
        var self = this;
        this.reservationRows = ko.observableArray([]);
        this.refreshFunction = function () {
            self.reservationRows.removeAll();
            $.getJSON("/odata/Reservations/?$filter=StartDate ge " + (new Date(b.dateFrom())).toISOString() +"&$orderby=PropertyId,RoomNumber,StartDate", function (result) {
                //alert(JSON.stringify(result));
                let lastPropertyId;
                let lastRoomNumber;
                let currReservations = ko.observableArray([]);
                $.each(result.value, function (i, res) {
                    alert(JSON.stringify(currReservations()));

                    if (lastPropertyId != res.PropertyId || lastRoomNumber != res.RoomNumber) {
                        if (currReservations().length > 0) {
                            self.reservationRows().push({
                                "propertyId": lastPropertyId,
                                "roomNumber": lastRoomNumber,
                                "reservations": currReservations
                            });
                            currReservations = ko.observableArray([]);
                        }
                    }

                    currReservations().push({
                        "id": res.Id,
                        "status": res.Status,
                        "startDate": res.StartDate,
                        "rndDate": res.EndDate,
                        "serviceId": res.ServiceId,
                        "guestId": res.GuestId,
                        "previousStay": res.PreviousStay,
                        "nextStay": res.NextStay,
                    });

                    lastPropertyId = res.PropertyId;
                    lastRoomNumber = res.RoomNumber;
                });

                if (currReservations().length > 0) {
                    self.reservationRows().push({
                        "propertyId": lastPropertyId,
                        "roomNumber": lastRoomNumber,
                        "reservations": currReservations
                    });
                }
                alert(JSON.stringify(self.reservationRows()));

            });
        }

        $(document).ready(
            function () {
                self.refreshFunction();
            }
        );

    }


    return { viewModel: bookTable, template: htmlString };
});
