﻿define(['ko', 'text!./book-row.html'], function (ko, htmlString) {
    function bookRow(params) {
        console.log(ko.toJSON(params));
        this.propertyId = params.reservationRow.propertyId;
        this.roomNumber = params.reservationRow.roomNumber;
        this.reservations = params.reservationRow.reservations;
    }
    return { viewModel: bookRow, template: htmlString };
});
