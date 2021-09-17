-define(['ko'], function (ko) {
    function guestSearch() {
        let self = this;
        this.version = "1.0";
        this.pageSize = 10;
        this.guests = ko.observableArray();
        this.page = ko.observable(1);
        this.hasMorePages = ko.pureComputed(function () {
            return self.guests().length != 0;
        });
    };

    guestSearch.prototype.guest = function () {
        this.id = ko.observable("");
        this.name = ko.observable("");
        this.surname = ko.observable("");
        this.dateOfBirth = ko.observable("");
        this.documentId = ko.observable("");
        this.documentType = ko.observable("");
        this.country = ko.observable("");
        this.city = ko.observable("");
        this.address = ko.observable("");
        this.markedForUpdate = ko.observable(true);

    }

    guestSearch.prototype.refreshFunction = function (search) {
        this.guests.removeAll();
        let self = this;

        let query = "/odata/Guests/?$filter=contains(Surname,'" + search + "') or contains(Name,'" + search + "')"
            + "&$skip=" + (this.pageSize * (this.page() - 1))
            + "&$top=" + (this.pageSize)
            + "&$orderby=Id";
        console.log(query);
    
        $.getJSON(query, function (result) {
            //console.log(JSON.stringify(result));
            //self.guests(result.value);

            $.each(result.value, function (i, g) {

                g.dateOfBirth = g.dateOfBirth.split("T")[0];

                g.markedForUpdate = false;

                for (var propt in g) {
                    console.log(propt + ': ' + typeof g[propt]);
                    g[propt] = ko.observable(g[propt]);
                    if (propt != 'markedForUpdate') {
                        g[propt].subscribe(function (newValue) {
                            //alert("subscribe " + ko.toJSON(g));
                            g.markedForUpdate(true);
                        });
                    }
                }



                self.guests.push(g);
            });

            //console.log(ko.toJSON(self.reservationRows()));
        });
    }

    guestSearch.prototype.searchFunction = function (search) {
        this.page(1);
        this.refreshFunction(search);
    }

    guestSearch.prototype.saveFunction = function (object) {
        ///object["@odata.type"] = "Microsoft.OData.TestSimpleWebApp.Models.Guest";
        let data = Object.assign({}, object);
        delete data.markedForUpdate;
        let insert = !data.id();
        if (insert) {
            delete data.id;
        }
        console.log(ko.toJSON(data));
        $.ajax({
            type: insert ? "POST" : "PATCH" ,
            url: "/odata/Guests" + (insert ? "" : "(" + data.id() + ")"),
            contentType: "application/json;odata.metadata=minimal",
            dataType: "json",
            data: ko.toJSON(data),
            success: function (jqXHR) {
                object.markedForUpdate(false);
                console.log(JSON.stringify(jqXHR));
            },
            error: function (jqXHR) {
                console.error(JSON.stringify(jqXHR));
            }
        });
    }

    guestSearch.prototype.deleteFunction = function (object, onSuccess) {
        ///object["@odata.type"] = "Microsoft.OData.TestSimpleWebApp.Models.Guest";
        let data = Object.assign({}, object);
        delete data.markedForUpdate;
        console.log(ko.toJSON(data));
        $.ajax({
            type: "DELETE",
            url: "/odata/Guests(" + data.id() + ")",
            contentType: "application/json;odata.metadata=minimal",
            dataType: "json",
            data: ko.toJSON(data),
            success: function (jqXHR) {
                console.log(JSON.stringify(jqXHR));
                if (typeof onSuccess === 'function') {
                    onSuccess();
                }
            },
            error: function (jqXHR) {
                console.error(JSON.stringify(jqXHR));
            }
        });
    }

    return new guestSearch();
});
    

