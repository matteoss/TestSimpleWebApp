define(['ko', 'jquery', 'text!./drop-down-list.html'], function (ko, $, htmlString) {
    function ddlist(params) {
        console.log("drop-down-list " + ko.toJSON(params));
        let self = this;
        this.componentId = params.componentId;

        if (ko.isObservable(params.id)) {
            this.checkedId = params.id;
        } else {
            this.checkedId = ko.observable(params.id);
        }

        this.valueRateLimitIgnore = false;
        this.valueRateLimit = function (action, timeout) {
            var timeoutInstance;
            var initTimeoutInstance = false;
            return function () {
                console.log(" valueRateLimit 0 " + JSON.stringify(timeoutInstance));
                if (!initTimeoutInstance || self.valueRateLimitIgnore) {
                    action();
                    initTimeoutInstance = true;
                    self.valueRateLimitIgnore = false;
                } else {
                    if (timeoutInstance) {
                        clearTimeout(timeoutInstance);
                    }
                    timeoutInstance = setTimeout(function () {
                        timeoutInstance = undefined;
                        action();
                        console.log(" valueRateLimit 2 " +JSON.stringify(timeoutInstance));
                    }, timeout);
                }
            };
        }

        this.value = ko.observable().extend({ rateLimit: { timeout: 500, method: self.valueRateLimit }  });

        this.valueSkipRefresh = false;
        this.valueSubscription = this.value.subscribe(function (newValue) {
            console.log("drop-down-list update: " + newValue);
            if (!self.valueSkipRefresh) {
                self.refreshFunction();
            } else {
                self.valueSkipRefresh = false;
            }
        });
        this.setValue = function (value) {
            self.valueSkipRefresh = true;
            self.valueRateLimitIgnore = true;
            self.value(value);
        }
        this.checkedIdSubscription = this.checkedId.subscribe(function (newValue) {
            console.log("drop-down-list " + newValue);
            self.setValue(self.list1().find(element => element.id == newValue).itemText);
        });

        this.inputHasFocus = ko.observable(false);
        this.display = ko.pureComputed(function () {
            if (self.inputHasFocus() /*|| self.list1().findIndex((e) => e.itemHasFocus()) > -1*/ || self.scrollDivClicked()) {
                $(document).ready(function () {
                    $("#" + self.scrollDivId).on('scroll', function () {
                        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                            console.log('drop-down-list end reached');
                            self.loadMoreFunction();
                        }
                        //console.log($(this).scrollTop() + '-' + $(this).innerHeight() + '-' + $(this)[0].scrollHeight);
                    });
                    $('#' + self.scrollDivId).on('mousedown', function () {
                        self.scrollDivClicked(true);
                        console.log("drop-down-list scrolldivcliked true");
                    });
                    $('#' + self.scrollDivId).on('mouseup', function () {
                        self.scrollDivClicked(false);
                        console.log("drop-down-list scrolldivcliked false");
                    });
                    console.log("drop-down-list #" + self.scrollDivId);
                });
                return true;
            } else {
                return false;
            }
        }).extend({ rateLimit: 20 });

        this.radioGroupName = "drop-down-list-" + this.componentId;
        this.scrollDivId = "scroll-div-" + this.componentId;
        this.scrollDivClicked = ko.observable(false);
        this.scrollContentId = "scroll-content-" + this.componentId;

        this.list1 = ko.observableArray();
        this.fetchSize = 10;
        this.fetchIteration = 0;
        this.hasMore = true;
        this.modelName = params.modelName;
        this.searchColumns = params.searchColumns;
        this.searchRegExp = new RegExp("[a-zA-Z0-9]");
        this.valueFunction = typeof params.valueFunction === 'function' ? params.valueFunction : (e) => "" + e.id;

        this.selected = null;

        this.getData = function (filter, onSuccess) {
            if (self.hasMore === true) {
                let args = [];
                if (filter) {
                    args.push("$filter=" + filter);
                } else if (self.value()) {
                    let ftmp = [];
                    $.each(self.value().split(" "), function (i, e) {
                        $.each(self.searchColumns, function (j, c) {
                            if (c === 'id') {
                                if (!isNaN(parseInt(e))) {
                                    ftmp.push(c + " eq " + e);
                                }
                            } else if (self.searchRegExp.test(e)) {
                                ftmp.push("contains(" + c + ", '" + e + "')");
                            }
                            
                        });
                    });
                    args.push("$filter="+ftmp.join(" or "));
                }
                args.push("$skip=" + self.fetchSize * (self.fetchIteration));
                args.push("$top=" + self.fetchSize);
                args.push("$orderby=Id");

                let query = "/odata/" + self.modelName + "/?" + args.join("&");
                console.log("drop-down-list"+query);
                $.getJSON(query, function (result) {
                    //console.log(JSON.stringify(result));
                    //self.guests(result.value);

                    let size = 0;
                    $.each(result.value, function (i, e) {

                        self.list1.push({
                            id: e.id,
                            itemText: self.valueFunction(e),
                            htmlId: self.radioGroupName + '-' + (self.list1().length+1),
                            liHtmlId: self.radioGroupName + '-li-' + (self.list1().length+1),
                            ///itemHasFocus: ko.observable(false),
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
            self.selected = null;
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
            self.selected = null;
            self.selectFunction();
            self.getData("id eq " + self.checkedId(), () => {
                if (self.list1().length === 1) {
                    self.setValue(self.list1()[0].itemText);
                }
            });
        }

        this.selectFunction = function(){
            $.each(self.list1(), (i, e) => e.itemClass(""));
            if (self.selected != null) {
                self.list1()[self.selected].itemClass("drop-down-list-selected-item");
            }
        }

        this.upDownEvent = function (data, event) {
            //console.log("drop-down-list key down " + JSON.stringify(event.keyCode)); // 38 40
            if (event.keyCode == 38) {
                if (self.selected > 0) {
                    self.selected--;
                } else {
                    self.selected = 0;
                }
                self.selectFunction();

                console.log("drop-down-list key down " + $("#" + self.list1()[self.selected].liHtmlId).position().top
                    + " " + $("#" + self.list1()[self.selected].liHtmlId).innerHeight()
                    + " " + $("#" + self.scrollDivId).innerHeight()
                    + " " + $("#" + self.scrollDivId).scrollTop()
                );

                if ($("#" + self.list1()[self.selected].liHtmlId).position().top < 0) {
                    $("#" + self.scrollDivId).scrollTop($("#" + self.scrollDivId).scrollTop() + $("#" + self.list1()[self.selected].liHtmlId).position().top);
                }

            } else if (event.keyCode == 40) {
                if (self.selected != null && self.selected < self.list1().length-1) {
                    self.selected++;
                } else {
                    self.selected = 0;
                }
                self.selectFunction();

                console.log("drop-down-list key down " + $("#" + self.list1()[self.selected].liHtmlId).position().top
                    + " " + $("#" + self.list1()[self.selected].liHtmlId).innerHeight()
                    + " " + $("#" + self.scrollDivId).innerHeight()
                    + " " + $("#" + self.scrollDivId).scrollTop()
                );

                if ($("#" + self.list1()[self.selected].liHtmlId).position().top + $("#" + self.list1()[self.selected].liHtmlId).innerHeight() >= $("#" + self.scrollDivId).innerHeight()) {
                    $("#" + self.scrollDivId).scrollTop($("#" + self.scrollDivId).scrollTop()
                        + $("#" + self.list1()[self.selected].liHtmlId).position().top + $("#" + self.list1()[self.selected].liHtmlId).innerHeight() - $("#" + self.scrollDivId).innerHeight()
                    );
                }

            } else if (event.keyCode == 13) {
                if (self.selected != null) {
                    self.checkedId(self.list1()[self.selected].id);
                    self.setValue(self.list1()[self.selected].itemText);
                    self.inputHasFocus(false);
                }
            }
            return true;
        }

        console.log("drop-down-list loaded");


        $(document).ready(function () {
            if (self.checkedId()) {
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
