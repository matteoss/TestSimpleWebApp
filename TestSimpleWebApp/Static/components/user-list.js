define(['ko', 'text!./user-list.html', 'grid_controller'], function (ko, htmlString, gcBuilder) {

    function user(params) {
        console.log(ko.toJSON(params));
        self = this;
        this.gridName = "UserGrid";
        this.grid = gcBuilder.getGrid(this.gridName, "Users", ['id'], []);
        this.loaded = this.grid.loaded;
        this.users = this.grid.list;
        this.userId = (params.id) ? params.id : null;
        this.page = this.grid.page;
        this.hasMorePages = this.grid.hasMorePages;
        this.refreshFunction = function () {
            self.grid.refreshFunction();
        }
        this.user = function () {
            return self.grid.initObject(function () {
                this.id = null;
                this.username = "";
                this.description = "";
                this.role = "";
            })
        }
        this.newFunction = function () {
            self.grid.list.push(self.user());
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

        console.log("user-list loaded");

        $(document).ready(
            function () {
                self.grid.refreshFunction();
            }
        );
    }

    user.prototype.dispose = function () {
        gcBuilder.deleteGrid(this.gridName);
    }

    return { viewModel: user, template: htmlString };
});
