define(['ko', 'jquery', 'text!./drop-down-list.html'], function (ko, $, htmlString) {
    function ddlist(params) {
        console.log(ko.toJSON(params));
        let self = this;
        this.componentId = params.componentId;
        this.id = params.id;
        this.value = ko.observable().extend({ rateLimit: 400 });

        this.valueSubscription = this.value.subscribe(function (newValue) {
            self.id = null;
            console.log("dropdown update: " + newValue);
            self.refreshFunction();
        });

        this.inputHasFocus = ko.observable(false);
        this.display = ko.pureComputed(function () {
            if (self.inputHasFocus() /*|| self.list1().findIndex((e) => e.itemHasFocus()) > -1*/) {
                $(document).ready(function () {
                    $("#" + self.scrollDivId).on('scroll', function () {
                        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                            console.log('end reached');
                            self.loadMoreFunction();
                        }
                        //console.log($(this).scrollTop() + '-' + $(this).innerHeight() + '-' + $(this)[0].scrollHeight);
                    });
                    console.log("#" + self.scrollDivId);
                });
                return true;
            } else {
                return false;
            }
        }).extend({ rateLimit: 50 });
        this.checkedId = ko.observable();
        this.checkedIdSubscription = this.checkedId.subscribe(function (newValue) {
            console.log(newValue);
        });
        this.radioGroupName = "drop-down-list-" + this.componentId;
        this.scrollDivId = "scroll-div-" + this.componentId;
        this.scrollContentId = "scroll-content-" + this.componentId;
        this.list1 = ko.observableArray();
        this.fetchSize = 10;
        this.fetchIteration = 0;
        this.hasMore = true;
        this.modelName = "Guests";

        this.selected = null;

        this.getData = function (filter, onSuccess) {
            if (self.hasMore === true) {
                let args = [];
                if (filter) {
                    args.push("$filter=" + filter);
                } else if (self.value()) {
                    let ftmp = [];
                    $.each(self.value().split(" "), function (i, e) {
                        ftmp.push("contains(Surname, '" + e + "')");
                        ftmp.push("contains(Name, '" + e + "')");
                    });
                    args.push("$filter="+ftmp.join(" or "));
                }
                args.push("$skip=" + self.fetchSize * (self.fetchIteration));
                args.push("$top=" + self.fetchSize);
                args.push("$orderby=Id");

                let query = "/odata/" + self.modelName + "/?" + args.join("&");
                console.log(query);
                $.getJSON(query, function (result) {
                    //console.log(JSON.stringify(result));
                    //self.guests(result.value);

                    let size = 0;
                    $.each(result.value, function (i, e) {

                        self.list1.push({
                            id: e.id,
                            itemText: e.id + " - "+e.surname + " " + e.name,
                            htmlId: self.radioGroupName + '-' + (self.list1.length+1),
                            itemHasFocus: ko.observable(false),
                            itemClass: ko.observable("")
                        });

                        size++;

                    });

                    if (size == self.fetchSize) {
                        self.hasMore = true;
                    } else {
                        self.hasMore = false;
                    }
                    self.fetchIteration++;

                    if (onSuccess) {
                        onSuccess();
                    }

                });

            }

        }

        this.refreshFunction = function () {
            self.list1.removeAll();
            self.fetchIteration = 0;
            self.hasMore = true;
            this.selected = null;
            self.selectFunction();
            self.getData();
        }

        this.loadMoreFunction = function () {
            self.getData();
        }
        this.initFunction = function () {
            self.list1.removeAll();
            self.fetchIteration = 0;
            self.hasMore = true;
            this.selected = null;
            self.selectFunction();
            self.getData("id eq " + self.id, () => {
                if (self.list1().length === 1) {
                    self.value(self.list1()[0].itemText);
                }
            });
        }

        this.selectFunction = function(){
            $.each(self.list1(), (i, e) => e.itemClass(""));
            if (self.selected != null) {
                self.list1()[self.selected].itemClass("dd-selected-item");
            }
        }

        this.upDownEvent = function (data, event) {
            console.log("drop-down-list key down " + JSON.stringify(event.keyCode)); // 38 40
            if (event.keyCode == 38) {
                if (self.selected > 0) {
                    self.selected--;
                } else {
                    self.selected = 0;
                }
                self.selectFunction();
            } else if (event.keyCode == 40) {
                if (self.selected != null && self.selected < self.list1().length-1) {
                    self.selected++;
                } else {
                    self.selected = 0;
                }
                self.selectFunction();
            } else if (event.keyCode == 13) {
                if (self.selected != null) {
                    self.checkedId(self.list1()[self.selected].id);
                    self.id = self.checkedId();
                    self.initFunction();
                }
            }
            return true;
        }

        console.log("drop-down-list loaded");


        $(document).ready(function () {
            if (self.id) {
                self.initFunction();
            } else {
                self.refreshFunction();
            }
            
        });
    }

    ddlist.prototype.dispose = function () {
        this.valueSubscription.dispose();
        this.checkedIdSubscription.dispose();
    }

    return { viewModel: ddlist, template: htmlString };
});
