define(['ko', 'text!./legend.html'], function (ko, htmlString) {
    function legend(params) {
        console.log(ko.toJSON(params));
        self = this;
        this.legendItems = params.legendItems;
        console.log("legend loaded");
    }
    return { viewModel: legend, template: htmlString };
});
