define(['ko', 'text!./guest-list.html', 'grid_controller'], function (ko, htmlString, gcBuilder) {

    function guest(params) {
        console.log(ko.toJSON(params));
        self = this;
        this.gridName = "GuestGrid";
        this.grid = gcBuilder.getGrid(this.gridName, "Guests", ['id'], [], ['id']);
        this.loaded = this.grid.loaded;
        this.guests = this.grid.list;
        this.search = params.search;
        this.page = this.grid.page;
        this.hasMorePages = this.grid.hasMorePages;
        this.refreshFunction = function () {
            self.grid.refreshFunction("contains(Surname,'" + self.search() + "') or contains(Name,'" + self.search() + "')");
        }
        this.guest = function () {
            return self.grid.initObject(function () {
                this.id = null;
                this.name = "";
                this.surname = "";
                this.dateOfBirth = "";
                this.documentId = "";
                this.documentType = "";
                this.country = "";
                this.city = "";
                this.address = "";
            })
        }
        this.newFunction = function () {
            self.grid.list.push(self.guest());
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
            self.grid.saveFunction();
        };


        console.log("guest-list loaded");
    }

    guest.prototype.dispose = function () {
        gcBuilder.deleteGrid(this.gridName);
    }

    return { viewModel: guest, template: htmlString };
});
