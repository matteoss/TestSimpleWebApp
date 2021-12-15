define(['ko', 'text!./room-list.html', 'grid_controller'], function (ko, htmlString, gcBuilder) {

    function room(params) {
        console.log(ko.toJSON(params));
        self = this;
        this.gridName = "RoomGrid";
        this.grid = gcBuilder.getGrid(this.gridName, "Rooms", ['propertyId', 'roomNumber'], ['propertyId']);
        this.loaded = this.grid.loaded;
        this.rooms = this.grid.list;
        this.roomId = (params.id) ? params.id : null;
        this.page = this.grid.page;
        this.hasMorePages = this.grid.hasMorePages;
        this.refreshFunction = function () {
            self.grid.refreshFunction();
        }
        this.room = function () {
            return self.grid.initObject(function () {
                this.propertyId = "";
                this.roomNumber = null;
                this.roomTypeId = null;
                this.status = null;
            })
        }
        this.newFunction = function () {
            self.grid.list.push(self.room());
        }
        this.deleteAction = function (index, object) {
            console.log("Deleting at " + index + "  " + ko.toJSON(object));
            
        }
        this.deleteFunction = function (index, object) {
            console.log(index + "  " + ko.toJSON(object));
            require(['dialog_yes_no_controller'], function (d) {
                d.setSubject("Delete?");
                d.setText("Delete room " + object.roomNumber());
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
            self.grid.saveFunction();
        };

        console.log("room-list loaded");

        $(document).ready(
            function () {
                self.grid.refreshFunction();
            }
        );
    }

    room.prototype.dispose = function () {
        gcBuilder.deleteGrid(this.gridName);
    }

    return { viewModel: room, template: htmlString };
});
