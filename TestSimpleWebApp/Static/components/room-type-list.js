define(['ko', 'text!./room-type-list.html', 'grid_controller'], function (ko, htmlString, gcBuilder) {

    function roomType(params) {
        console.log(ko.toJSON(params));
        self = this;
        this.gridName = "RoomTypeGrid";
        this.grid = gcBuilder.getGrid(this.gridName, "RoomTypes", ['id'], []);
        this.loaded = this.grid.loaded;
        this.roomTypes = this.grid.list;
        this.roomTypeId = (params.id) ? params.id : null;
        this.page = this.grid.page;
        this.hasMorePages = this.grid.hasMorePages;
        this.refreshFunction = function () {
            self.grid.refreshFunction();
        }
        this.roomType = function () {
            return self.grid.initObject(function () {
                this.id = null;
                this.name = "";
            })
        }
        this.newFunction = function () {
            self.grid.list.push(self.roomType());
        }
        this.deleteAction = function (index, object) {
            console.log("Deleting at " + index + "  " + ko.toJSON(object));
            
        }
        this.deleteFunction = function (index, object) {
            console.log(index + "  " + ko.toJSON(object));
            require(['dialog_yes_no_controller'], function (d) {
                d.setSubject("Delete?");
                d.setText("Delete room type " + object.id());
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

        console.log("room-type-list loaded");

        $(document).ready(
            function () {
                self.grid.refreshFunction();
            }
        );
    }

    roomType.prototype.dispose = function () {
        gcBuilder.deleteGrid(this.gridName);
    }

    return { viewModel: roomType, template: htmlString };
});
