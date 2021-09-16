define(['ko', 'text!./book-details.html'], function (ko, htmlString) {
    function bookDetails(params) {
        console.log(ko.toJSON(params));
        self = this;
        this.checkedId = params.checkedId;
        this.reservation = params.reservation;
        console.log("book-details loaded");
    }
    return { viewModel: bookDetails, template: htmlString };
});
