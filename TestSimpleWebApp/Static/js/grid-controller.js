-define(['ko'], function (ko) {
    function gridBuilder() {

        this.grids = {};


        this.grid = function (modelName, dateFields) {
            let self = this;
            this.version = "1.0";
            this.modelName = modelName;
            this.dateFields = dateFields;
            this.pageSize = 10;
            this.list = ko.observableArray();
            this.subscriptions = [];
            this.page = ko.observable(1);
            this.hasMorePages = ko.pureComputed(function () {
                return self.list().length != 0;
            });
            this.errorTextFieldPrefix = "errorTextFor";
        };

        this.grid.prototype.deleteSubscriptions = function (object) {
            $.each(object.gridMetaData.subscriptions, function (i, s) {
                s.dispose();
            });
        }

        this.grid.prototype.refreshFunction = function (filter) {
            let self = this;
            $.each(this.list(), function (i, e) {
                self.deleteSubscriptions(e);
            });
            this.list.removeAll();

            let args = [];
            if (filter) {
                args.push("$filter=" + filter);
            }
            args.push("$skip=" + (this.pageSize * (this.page() - 1)));
            args.push("$top=" + (this.pageSize));
            args.push("$orderby=Id");

            let query = "/odata/" + this.modelName + "/?" + args.join("&");
            console.log(query);

            $.getJSON(query, function (result) {
                //console.log(JSON.stringify(result));
                //self.guests(result.value);

                $.each(result.value, function (i, e) {

                    //console.log(JSON.stringify(e));
                    self.addGridMetaDataFields(e);
                    self.list.push(e);

                });

            });
        }

        this.grid.prototype.searchFunction = function (filter) {
            this.page(1);
            this.refreshFunction(filter);
        }

        function prepareForOData(data) {
            delete data.gridMetaData;
            return data;
        }

        function lowerCaseFirstLetter(string) {
            return string.charAt(0).toLowerCase() + string.slice(1);
        }
        function upperCaseFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        this.grid.prototype.clearErrorTexts = function (object) {
            for (var propt in object.gridMetaData.errors) {
                object.gridMetaData.errors[propt]("");
            }
        }

        this.grid.prototype.saveFunction = function (object) {
            ///object["@odata.type"] = "Microsoft.OData.TestSimpleWebApp.Models.Guest";
            let self = this;
            $.each(this.list(), function (i, object) {
                if (object.gridMetaData.markedForUpdate()) {
                    //alert("marker for update: " + ko.toJSON(g));
                    let data = prepareForOData(Object.assign({}, object));
                    let insert = !data.id();
                    if (insert) {
                        delete data.id;
                    }
                    console.log(ko.toJSON(data));
                    $.ajax({
                        type: insert ? "POST" : "PATCH",
                        url: "/odata/" + self.modelName + (insert ? "" : "(" + data.id() + ")"),
                        contentType: "application/json;odata.metadata=minimal",
                        dataType: "json",
                        data: ko.toJSON(data),
                        success: function (jqXHR) {
                            if (insert && jqXHR.id) {
                                object.id(jqXHR.id);
                            }
                            self.clearErrorTexts(object);
                            object.gridMetaData.markedForUpdate(false);
                            console.log(JSON.stringify(jqXHR));
                        },
                        error: function (jqXHR) {
                            console.error(JSON.stringify(jqXHR.responseText));
                            self.clearErrorTexts(object);

                            $.each(JSON.parse(jqXHR.responseText).error.details, function (i, e) {
                                if (e.target && e.message) {
                                    console.error(upperCaseFirstLetter(e.target) + ": " + e.message);
                                    object.gridMetaData.errors[self.errorTextFieldPrefix + upperCaseFirstLetter(e.target)](e.message);
                                } else if (e.message) {
                                    alert(e.message);
                                }
                            });
                        }
                    });
                }
            });
        }

        this.grid.prototype.removeFromList = function (index, object) {
            this.deleteSubscriptions(object);
            this.list.splice(index, 1);
        }

        this.grid.prototype.deleteFunction = function (index, object) {
            ///object["@odata.type"] = "Microsoft.OData.TestSimpleWebApp.Models.Guest";
            let self = this;
            if (typeof object.id() === 'number') {
                let data = prepareForOData(Object.assign({}, object));
                console.log(ko.toJSON(data));
                $.ajax({
                    type: "DELETE",
                    url: "/odata/" + this.modelName + "(" + data.id() + ")",
                    contentType: "application/json;odata.metadata=minimal",
                    dataType: "json",
                    data: ko.toJSON(data),
                    success: function (jqXHR) {
                        console.log(JSON.stringify(jqXHR));
                        self.removeFromList(index, object);
                    },
                    error: function (jqXHR) {
                        console.error(JSON.stringify(jqXHR));
                    }
                });
            } else {
                self.removeFromList(index, object);
            }
            
        }

        this.grid.prototype.addGridMetaDataFields = function (e) {

            let gridMetaData = {};
            gridMetaData.markedForUpdate = ko.observable(false);
            gridMetaData.errors = {};

            let subscriptions = [];

            for (var propt in e) {
                //console.log(propt + ': ' + typeof e[propt]);
                if (this.dateFields.includes(propt)) {
                    if (typeof e[propt].split === 'function') {
                        e[propt] = e[propt].split("T")[0];
                    }
                }
                e[propt] = ko.observable(e[propt]);
                subscriptions.push(
                    e[propt].subscribe(function (newValue) {
                        //console.log("subscribe " + ko.toJSON(newValue));
                        e.gridMetaData.markedForUpdate(true);
                    })
                );
                gridMetaData.errors[this.errorTextFieldPrefix + upperCaseFirstLetter(propt)] = ko.observable("");
            }
            gridMetaData.subscriptions = subscriptions;

            e.gridMetaData = gridMetaData;
        }

        this.grid.prototype.initObject = function (objectFunc) {
            object = new objectFunc();
            this.addGridMetaDataFields(object);
            object.gridMetaData.markedForUpdate(true);
            return object;
        }
    }


    gridBuilder.prototype.getGrid = function (gridName, modelName, dateFields) {
        if (this.grids[gridName]) {

        } else {
            this.grids[gridName] = new this.grid(modelName, dateFields);
            console.log("grid " + gridName + " created. Params: " + JSON.stringify({ modelName: modelName, dateFields: dateFields }));
        }
        return this.grids[gridName];
    }

    gridBuilder.prototype.deleteGrid = function (gridName) {
        let list = this.grids[gridName].list;
        let self = this;
        $.each(list(), function (i, e) {
            self.grids[gridName].deleteSubscriptions(e);
        });
        delete this.grids[gridName];
        console.log("grid " + gridName + " deleted");
    }

    return new gridBuilder();
});
    

