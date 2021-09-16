define(['ko', 'text!./book-params.html'], function (ko, htmlString) {
    function bookDetails(params) {
        console.log(ko.toJSON(params));
        self = this;
        this.params = params.params;
        this.refreshFunction = params.refreshFunction;
        console.log("book-params loaded");
    }
    return { viewModel: bookDetails, template: htmlString };
});
