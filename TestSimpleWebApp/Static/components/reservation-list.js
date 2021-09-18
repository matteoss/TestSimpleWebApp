define(['ko', 'text!./reservation-list.html', 'grid_controller'], function (ko, htmlString, gcBuilder) {

    function reservation(params) {
        console.log(ko.toJSON(params));
        self = this;
        this.gridName = "ReservationGrid";
        this.grid = gcBuilder.getGrid(this.gridName, "Reservations", ['startDate', 'endDate']);
        this.reservations = this.grid.list;
        this.resId = (params.id) ? params.id : null;
        this.page = this.grid.page;
        this.hasMorePages = this.grid.hasMorePages;
        this.refreshFunction = function () {
            self.grid.refreshFunction();
        }
        this.reservation = function () {
            this.id = ko.observable("");
            this.status = ko.observable("");
            this.startDate = ko.observable("");
            this.endDate = ko.observable("");
            this.serviceId = ko.observable("");
            this.propertyId = ko.observable("");
            this.guestId = ko.observable("");
            this.roomNumber = ko.observable("");
            this.markedForUpdate = ko.observable(true);
        }
        this.newFunction = function () {
            self.grid.list.push(new self.reservation());
        }
        this.deleteAction = function (index, object) {
            console.log("Deleting at " + index + "  " + ko.toJSON(object));
            
        }
        this.deleteFunction = function (index, object) {
            console.log(index + "  " + ko.toJSON(object));
            require(['dialog_yes_no_controller'], function (d) {
                d.setSubject("Delete?");
                d.setText("Delete reservation " + object.id());
                d.setYesFunction(
                    function () {
                        self.grid.deleteFunction(index, object);
                    }
                );
                d.setNoFunction(
                    function () {
                    }
                );
                d.show();
            });
        };
        this.saveFunction = function () {
            $.each(self.reservations(), function (i, g) {
                if (g.markedForUpdate()) {
                    //alert("marker for update: " + ko.toJSON(g));
                    self.grid.saveFunction(g);
                }
            });
        };

        console.log("reservation-list loaded");

        $(document).ready(
            function () {
                self.grid.refreshFunction();
            }
        );
    }

    reservation.prototype.dispose = function () {
        gcBuilder.deleteGrid(this.gridName);
    }

    return { viewModel: reservation, template: htmlString };
});
