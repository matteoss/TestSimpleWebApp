define(['ko', 'text!./guest-list.html', 'grid_controller'], function (ko, htmlString, gcBuilder) {

    function guest(params) {
        console.log(ko.toJSON(params));
        self = this;
        this.gridName = "GuestGrid";
        this.grid = gcBuilder.getGrid(this.gridName);
        this.guests = this.grid.list;
        this.search = params.search;
        this.page = this.grid.page;
        this.hasMorePages = this.grid.hasMorePages;
        this.refreshFunction = function () {
            self.grid.refreshFunction("contains(Surname,'" + self.search() + "') or contains(Name,'" + self.search() + "')");
        }
        this.guest = function () {
            this.id = ko.observable("");
            this.name = ko.observable("");
            this.surname = ko.observable("");
            this.dateOfBirth = ko.observable("");
            this.documentId = ko.observable("");
            this.documentType = ko.observable("");
            this.country = ko.observable("");
            this.city = ko.observable("");
            this.address = ko.observable("");
            this.markedForUpdate = ko.observable(true);
        }
        this.newFunction = function () {
            self.grid.list.push(new self.guest());
        }
        this.deleteAction = function (index, guest) {
            console.log("Deleting at " + index + "  " + ko.toJSON(guest));
            
        }
        this.deleteFunction = function (index, guest) {
            console.log(index + "  " + ko.toJSON(guest));
            require(['dialog_yes_no_controller'], function (d) {
                d.setSubject("Delete?");
                d.setText("Delete guest " + guest.surname() + " " + guest.name());
                d.setYesFunction(
                    function () {
                        self.grid.deleteFunction(index, guest);
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
            $.each(self.guests(), function (i, g) {
                if (g.markedForUpdate()) {
                    //alert("marker for update: " + ko.toJSON(g));
                    self.grid.saveFunction(g);
                }
            });
        };


        console.log("guest-list loaded");
    }

    guest.prototype.dispose = function () {
        gcBuilder.deleteGrid(this.gridName);
    }

    return { viewModel: guest, template: htmlString };
});
