define(['ko', 'text!./page-number.html'], function (ko, htmlString) {
    function PageNumber(params) {
        this.page = params.page;
        var self = this;
        this.showFirstPage = ko.pureComputed(function () {
            return self.page() > 1;
        });
        this.hasMorePages = params.hasMorePages;
        this.refresh_function = params.refresh_function;
        this.next_page = function () {
            var last_page = this.page();
            this.page(last_page + 1);
            this.refresh_function();
        };
        this.previous_page = function () {
            var last_page = this.page();
            if (last_page > 1) {
                this.page(last_page - 1);
                this.refresh_function();
            }
        };
    }

    return { viewModel: PageNumber, template: htmlString };
});
