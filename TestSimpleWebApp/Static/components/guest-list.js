define(['ko', 'text!./guest-list.html', 'guest_search'], function (ko, htmlString, gs) {
    function guest(params) {
        console.log(ko.toJSON(params));
        self = this;
        this.guests = gs.guests;
        this.search = params.search;
        this.page = gs.page;
        this.hasMorePages = gs.hasMorePages;
        this.searchFunction = function () {
            gs.searchFunction(self.search());
        }
        this.refreshFunction = function () {
            gs.refreshFunction(self.search());
        }
        this.newFunction = function () {
            gs.guests.push(new gs.guest());
        }
        this.deleteAction = function (index, guest) {
            console.log("Deleting at " + index + "  " + ko.toJSON(guest));
            if (guest.id) {
                alert("DB delete not implemented yet");
                gs.guests.splice(index, 1);
            } else {
                gs.guests.splice(index, 1);
            }
        }
        this.deleteFunction = function (index, guest) {
            console.log(index + "  " + ko.toJSON(guest));
            require(['dialog_yes_no_controller'], function (d) {
                d.setSubject("Delete?");
                d.setText("Delete guest " + guest.surname + " " + guest.name);
                d.setYesFunction(
                    function () {
                        self.deleteAction(index, guest);
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
                    alert("marker for update: " + ko.toJSON(g));
                    gs.saveFunction(g);
                }
            });
        };


        for (var propt in this.guests()) {
            if (typeof this.guests()[propt].subscribe === 'function') {
                console.log(propt + ': ' + typeof this.guests()[propt].subscribe);
            }
        }

        console.log("guest-list loaded");
    }


    return { viewModel: guest, template: htmlString };
});
