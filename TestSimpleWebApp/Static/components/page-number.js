define(['ko', 'text!./page-number.html'], function (ko, htmlString) {
    function PageNumber(params) {
        this.page = params.page;
        var self = this;
        this.showFirstPage = ko.pureComputed(function () {
            return self.page() > 1;
        });
        this.hasMorePages = params.hasMorePages;
        this.refreshFunction = params.refreshFunction;
        this.nextPage = function () {
            var lastPage = self.page();
            this.page(lastPage + 1);
            this.refreshFunction();
        };
        this.previousPage = function () {
            var lastPage = self.page();
            if (lastPage > 1) {
                this.page(lastPage - 1);
                self.refreshFunction();
            }
        };
    }

    return { viewModel: PageNumber, template: htmlString };
});
