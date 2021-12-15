define(['ko', 'text!./res-status-list.html', 'grid_controller'], function (ko, htmlString, gcBuilder) {

    function resStatus(params) {
        console.log(ko.toJSON(params));
        self = this;
        this.gridName = "ResStatusGrid";
        this.grid = gcBuilder.getGrid(this.gridName, "ResStatuses", ['id'], []);
        this.loaded = this.grid.loaded;
        this.resStatuses = this.grid.list;
        this.resStatusId = (params.id) ? params.id : null;
        this.page = this.grid.page;
        this.hasMorePages = this.grid.hasMorePages;
        this.refreshFunction = function () {
            self.grid.refreshFunction();
        }
        this.resStatus = function () {
            return self.grid.initObject(function () {
                this.id = null;
                this.name = "";
                this.colorId = "";
            })
        }
        this.newFunction = function () {
            self.grid.list.push(self.resStatus());
        }
        this.deleteAction = function (index, object) {
            console.log("Deleting at " + index + "  " + ko.toJSON(object));
            
        }
        this.deleteFunction = function (index, object) {
            console.log(index + "  " + ko.toJSON(object));
            require(['dialog_yes_no_controller'], function (d) {
                d.setSubject("Delete?");
                d.setText("Delete status " + object.id());
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

        console.log("res-status-list loaded");

        $(document).ready(
            function () {
                self.grid.refreshFunction();
            }
        );
    }

    resStatus.prototype.dispose = function () {
        gcBuilder.deleteGrid(this.gridName);
    }

    return { viewModel: resStatus, template: htmlString };
});
