define(['ko', 'text!./property-list.html', 'grid_controller'], function (ko, htmlString, gcBuilder) {

    function property(params) {
        console.log(ko.toJSON(params));
        self = this;
        this.gridName = "PropertyGrid";
        this.grid = gcBuilder.getGrid(this.gridName, "Properties", []);
        this.properties = this.grid.list;
        this.search = params.search;
        this.page = this.grid.page;
        this.hasMorePages = this.grid.hasMorePages;
        this.refreshFunction = function () {
            self.grid.refreshFunction();
        }
        this.property = function () {
            this.id = ko.observable("");
            this.name = ko.observable("");
            this.markedForUpdate = ko.observable(true);
        }
        this.newFunction = function () {
            self.grid.list.push(new self.property());
        }
        this.deleteAction = function (index, property) {
            console.log("Deleting at " + index + "  " + ko.toJSON(property));
            
        }
        this.deleteFunction = function (index, property) {
            console.log(index + "  " + ko.toJSON(property));
            require(['dialog_yes_no_controller'], function (d) {
                d.setSubject("Delete?");
                d.setText("Delete property " + property.name());
                d.setYesFunction(
                    function () {
                        self.grid.deleteFunction(index, property);
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
            $.each(self.properties(), function (i, g) {
                if (g.markedForUpdate()) {
                    //alert("marker for update: " + ko.toJSON(g));
                    self.grid.saveFunction(g);
                }
            });
        };

        console.log("property-list loaded");

        $(document).ready(
            function () {
                self.grid.refreshFunction();
            }
        );
    }

    property.prototype.dispose = function () {
        gcBuilder.deleteGrid(this.gridName);
    }

    return { viewModel: property, template: htmlString };
});
