﻿-define(['ko'], function (ko) {
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
        };

        this.grid.prototype.deleteSubscriptions = function (object) {
            $.each(object.subscriptions, function (i, s) {
                s.dispose();
            });
        }

        this.grid.prototype.refreshFunction = function (filter) {
            let self = this;
            $.each(this.list, function (i, e) {
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

                    e.markedForUpdate = false;
                    let subscriptions = [];

                    for (var propt in e) {
                        //console.log(propt + ': ' + typeof e[propt]);
                        if (self.dateFields.includes(propt)) {
                            if (e[propt]) {
                                e[propt] = e[propt].split("T")[0];
                            }
                        }
                        e[propt] = ko.observable(e[propt]);
                        if (propt != 'markedForUpdate') {
                            subscriptions.push(
                                e[propt].subscribe(function (newValue) {
                                    //alert("subscribe " + ko.toJSON(g));
                                    e.markedForUpdate(true);
                                })
                            );
                        }
                    }

                    e.subscriptions = subscriptions;

                    self.list.push(e);
                });

            });
        }

        this.grid.prototype.searchFunction = function (filter) {
            this.page(1);
            this.refreshFunction(filter);
        }

        function prepareForOData(data) {
            delete data.markedForUpdate;
            delete data.subscriptions;
            return data;
        }

        this.grid.prototype.saveFunction = function (object) {
            ///object["@odata.type"] = "Microsoft.OData.TestSimpleWebApp.Models.Guest";
            let self = this;
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
                    object.markedForUpdate(false);
                    if (insert && jqXHR.id) {
                        object.id(jqXHR.id);
                    }
                    console.log(JSON.stringify(jqXHR));
                },
                error: function (jqXHR) {
                    console.error(JSON.stringify(jqXHR));
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
        $.each(list, function (i, e) {
            self.grids[gridName].deleteSubscriptions(e);
        });
        delete this.grids[gridName];
        console.log("grid " + gridName + " deleted");
    }

    return new gridBuilder();
});
    

