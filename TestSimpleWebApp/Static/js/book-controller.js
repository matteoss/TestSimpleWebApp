-define(['ko', 'signalr'], function (ko, signalR) {
    function Book() {
        let self = this;
        this.version = "1.0";
        this.params = {
            propertyId: ko.observable(""),
            roomNumber: ko.observable(""),
            dateFrom: ko.observable(new Date(2021, 9, 1).toISOString().split("T")[0])
        };
        this.loaded = ko.observable(false);
        this.reservationRows = ko.observableArray([]);
        this.legendItems = ko.observableArray([]);
        this.numberOfDays = 30;
        this.currentDate = ko.observable(new Date().toISOString().split("T")[0]);
        this.dates = ko.pureComputed(function () {
            let d = [];
            for (let i = 0; i < self.numberOfDays; i++) {
                let date = new Date(self.params.dateFrom());
                date.setDate(date.getDate() + i);
                let dateString = date.toISOString().split('T')[0]
                let dateClass;
                if (dateString === self.currentDate()) {
                    dateClass = "current-date";
                } else if (date.getDay() == 6 || date.getDay() == 0) {
                    dateClass = "weekend-date";
                } else {
                    dateClass = "default-date";
                }
                d.push({
                    date: date,
                    dateString: dateString,
                    dateClass: dateClass
                });
            }
            return d;
        }, this);

        $(document).ready(
            function () {
                var connection = new signalR.HubConnectionBuilder().withUrl("/reservation/sync").build();
                connection.on("PatchReservation", function (reservation) {
                    console.log("reservation change: " + JSON.stringify(reservation));
                    $.each(self.reservationRows(), function (i, row) {
                        $.each(row.reservations(), function (i, res) {
                            if (reservation.id === res.id()) {
                                for (var propt in reservation) {
                                    if (!['id', 'guest'].includes(propt)) {
                                        res[propt](reservation[propt]);
                                    }
                                }
                                //need exit;
                            }
                        });
                    });
                });

                connection.start().then(function () {
                    console.log("signalR connection started");
                }).catch(function (err) {
                    return console.error(err.toString());
                });

                /*document.getElementById("sendButton").addEventListener("click", function (event) {
                    var user = document.getElementById("userInput").value;
                    var message = document.getElementById("messageInput").value;
                    connection.invoke("SendMessage", user, message).catch(function (err) {
                        return console.error(err.toString());
                    });
                    event.preventDefault();
                });*/
            }
        );
    };

    Book.prototype.addLegendItemIfNotExists = function (legendItem){
        let found = false;
        for (let i = 0; i < this.legendItems().length;i++) {
            if (legendItem.name == this.legendItems()[i].name) {
                found = true;
                break;
            }
        }
        if (!found) {
            this.legendItems.push(legendItem);
        }
    }

    Book.prototype.refreshFunction = function () {
        this.loaded(false);
        this.reservationRows.removeAll();
        this.legendItems.removeAll();
        let self = this;
        let dateTo = new Date(this.params.dateFrom());
        dateTo.setDate(dateTo.getDate() + this.numberOfDays);
        console.log(ko.toJSON(this.params));
        let additionalQueryFilter = [];
        if (this.params.propertyId()) {
            additionalQueryFilter.push("PropertyId eq " + this.params.propertyId());
        }
        if (this.params.roomNumber()) {
            additionalQueryFilter.push("RoomNumber eq " + this.params.roomNumber());
        }
        let query = "/odata/Rooms/?$expand=Reservations($filter=EndDate gt "
            + new Date(this.params.dateFrom()).toISOString()
            + " and StartDate le " + dateTo.toISOString()
            + ";$expand=Guest,ResStatus($expand=Color);$orderby=StartDate)"
            + (additionalQueryFilter.length > 0 ? "&$filter=" + additionalQueryFilter.join(' and ') : "")
            + "&$orderby=PropertyId,RoomNumber";
        console.log(query);
        $.getJSON(query, function (result) {
            //console.log(JSON.stringify(result));

            self.reservationRows(result.value);


            $.each(self.reservationRows(), function (i, room) {
                //console.log(JSON.stringify(res));


                let lastEndIndex = ko.observable(0);

                room.reservations = ko.observableArray(room.reservations);

                $.each(room.reservations(), function (i, res) {

                    self.addLegendItemIfNotExists({ name: res.resStatus.name, colorClass: res.resStatus.color.definition });

                    for (var propt in res) {
                        res[propt] = ko.observable(res[propt]);
                    }

                    res.lastEndIndex = lastEndIndex;

                    res.offset = ko.computed(function () {
                        let offset = self.dates().findIndex((e) => e.dateString == res.startDate().split('T')[0]);
                        if (offset == -1) {
                            offset = 0;
                        }
                        offset = offset - res.lastEndIndex();
                        return offset;
                    });
                    res.size = ko.computed(function () {
                        let size = self.dates().findIndex((e) => e.dateString == res.endDate().split('T')[0]);
                        if (size > -1) {
                            size = size - res.offset() + res.lastEndIndex();
                        } else {
                            size = self.numberOfDays - res.offset();
                        }
                        return size;
                    });

                    res.endIndex = ko.computed(function () {
                        return res.lastEndIndex() + res.offset() + res.size()
                    });

                    console.log(ko.toJSON(res));

                    lastEndIndex = res.endIndex;
                });
            });
            self.loaded(true);

            //console.log(ko.toJSON(self.reservationRows()));
        });
    }

    return new Book();
});
    

