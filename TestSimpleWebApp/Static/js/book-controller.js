
define(['ko'], function (ko) {
    var Book = {
        version: "1.0",
        propertyId: ko.observable(""),
        roomId: ko.observable(""),
        dateFrom: ko.observable((new Date()).setHours(0, 0, 0, 0)),
        numberOfDays: 30
    };

    return Book;
});
    

