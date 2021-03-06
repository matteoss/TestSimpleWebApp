-define(['ko', 'security'], function (ko, security) {
    function gridBuilder() {

        this.grids = {};


        this.grid = function (modelName, primaryKeyFields, dateFields, orderByFields) {
            let self = this;
            this.version = "1.0";
            this.loaded = ko.observable(false);
            this.modelName = modelName;
            this.primaryKeyFields = primaryKeyFields;
            this.dateFields = dateFields;
            this.orderByFields = orderByFields;
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
            this.loaded(false);
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
            if (this.orderByFields) {
                args.push("$orderby=" + this.orderByFields.join(","));
            } else {
                args.push("$orderby=" + this.primaryKeyFields.join(","));
            }

            let query = "/odata/" + this.modelName + "/?" + args.join("&");
            console.log(query);

            security.makeRequest({
                url: query,
                type: 'GET',
                success: function (result) {
                    //console.log(JSON.stringify(result));
                    //self.guests(result.value);

                    $.each(result.value, function (i, e) {

                        //console.log(JSON.stringify(e));
                        self.addGridMetaDataFields(e);
                        self.list.push(e);

                    });

                    self.loaded(true);
                },
                error: function (jqXHR) {
                    self.loaded(true);
                }
            });

            /*$.getJSON(query, function (result) {
                //console.log(JSON.stringify(result));
                //self.guests(result.value);

                $.each(result.value, function (i, e) {

                    //console.log(JSON.stringify(e));
                    self.addGridMetaDataFields(e);
                    self.list.push(e);

                });

                self.loaded(true);
            });*/
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
            this.loaded(false);
            let saveCount = 0;
            $.each(this.list(), function (i, object) {
                if (object.gridMetaData.markedForUpdate()) {
                    //alert("marker for update: " + ko.toJSON(g));
                    saveCount++;
                    let data = prepareForOData(Object.assign({}, object));
                    if (object.gridMetaData.insert) {
                        delete data.id;
                        /*$.each(self.primaryKeyFields, function (i, f) {
                            delete data[f];
                        });*/
                    }

                    let pks = [];

                    $.each(self.primaryKeyFields, function (i, f) {
                        if (typeof data[f] === 'function') {
                            pks.push(data[f]());
                        }
                    });

                    console.log(ko.toJSON(data));

                    security.makeRequest({
                        type: object.gridMetaData.insert ? "POST" : "PATCH",
                        url: "/odata/" + self.modelName + (object.gridMetaData.insert ? "" : "(" + pks.join(",") + ")"),
                        contentType: "application/json;odata.metadata=minimal",
                        dataType: "json",
                        data: ko.toJSON(data),
                        success: function (jqXHR) {
                            //if (insert && jqXHR.id) {
                            //    object.id(jqXHR.id);
                            //}
                            if (object.gridMetaData.insert) {
                                $.each(self.primaryKeyFields, function (i, f) {
                                    if (f === 'id') {
                                        object[f](jqXHR[f]);
                                    }
                                });
                            }
                            self.clearErrorTexts(object);
                            object.gridMetaData.markedForUpdate(false);
                            object.gridMetaData.insert = false;
                            console.log(JSON.stringify(jqXHR));
                            saveCount--;
                            if (saveCount <= 0) {
                                self.loaded(true);
                            }
                        },
                        error: function (jqXHR) {
                            console.error(JSON.stringify(jqXHR.responseText));
                            self.clearErrorTexts(object);

                            let errorObject = JSON.parse(jqXHR.responseText);

                            if (errorObject.error) {
                                if (errorObject.error.details) {
                                    $.each(errorObject.error.details, function (i, e) {
                                        if (e.target && e.message) {
                                            console.error(upperCaseFirstLetter(e.target) + ": " + e.message);
                                            object.gridMetaData.errors[self.errorTextFieldPrefix + upperCaseFirstLetter(e.target)](e.message);
                                        } else if (e.message) {
                                            alert(e.message);
                                        }
                                    });
                                } else {
                                    alert(errorObject.error);
                                }
                            } else if (errorObject.value) {
                                alert(errorObject.value);
                            }
                            saveCount--;
                            if (saveCount <= 0) {
                                self.loaded(true);
                            }
                        }
                    });

                }
            });
            if (saveCount == 0) {
                self.loaded(true);
            }
        }

        this.grid.prototype.removeFromList = function (index, object) {
            this.deleteSubscriptions(object);
            this.list.splice(index, 1);
        }

        this.grid.prototype.deleteFunction = function (index, object) {
            ///object["@odata.type"] = "Microsoft.OData.TestSimpleWebApp.Models.Guest";
            let self = this;

            let pks = [];
            let dbdel = true;
            $.each(self.primaryKeyFields, function (i, f) {
                pks.push(object[f]());
                if (!object[f]()) {
                    dbdel = false;
                }
            });
            if (dbdel) {
                let data = prepareForOData(Object.assign({}, object));
                console.log(ko.toJSON(data));
                //$.ajax(
                security.makeRequest( {
                    type: "DELETE",
                    url: "/odata/" + this.modelName + "(" + pks.join(",") + ")",
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
            gridMetaData.insert = false;
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
            object.gridMetaData.insert = true;
            return object;
        }
    }


    gridBuilder.prototype.getGrid = function (gridName, modelName, primaryKeyFields, dateFields, orderByFields) {
        if (this.grids[gridName]) {

        } else {
            this.grids[gridName] = new this.grid(modelName, primaryKeyFields, dateFields, orderByFields);
            console.log("grid " + gridName + " created. Params: " + JSON.stringify({ modelName: modelName, primaryKeyFields: primaryKeyFields, dateFields: dateFields, orderByFields: orderByFields }));
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
    

