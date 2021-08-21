define(['ko', 'text!./navigation-bar.html'], function (ko, htmlString) {
    function MyComponentViewModel(params) {
        this.search = params.search;
        this.search_function = params.search_function;
        this.username = params.username;
    }

return { viewModel: MyComponentViewModel, template: htmlString };
});
