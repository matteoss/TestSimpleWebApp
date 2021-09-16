define(['ko', 'text!./guest.html'], function (ko, htmlString) {
    function guest(params) {
        console.log(ko.toJSON(params));
        self = this;
        this.guest = params.guest;
        this.deleteFunction = params.deleteFunction;
        this.saveFunction = params.saveFunction;
        console.log("guest loaded");
    }
    return { viewModel: guest, template: htmlString };
});
