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
        this.id = null;
        this.name = null;
        this.surname = null;
        this.dateOfBirth = null;
        this.documentId = null;
        this.documentType = null;
        this.country = null;
        this.city = null;
        this.address = null;
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
        object["@odata.type"] = "Microsoft.OData.TestSimpleWebApp.Models.Guest";
        console.log(ko.toJSON(object));
        $.ajax({
            type: "PATCH",
            url: "/odata/Guests(" + object.id() + ")",
            contentType: "application/json;odata.metadata=minimal",
            dataType: "json",
            data: ko.toJSON(object),
            success: function (jqXHR) {
                console.log(JSON.stringify(jqXHR));
            },
            error: function (jqXHR) {
                console.error(JSON.stringify(jqXHR));
            }
        });
    }

    return new guestSearch();
});
    

