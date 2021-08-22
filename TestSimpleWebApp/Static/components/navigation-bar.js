define(['ko', 'text!./navigation-bar.html', 'security'], function (ko, htmlString, security) {
    function MyComponentViewModel(params) {
        this.search = params.search;
        this.search_function = params.search_function;
        this.username = security.username;
    }

return { viewModel: MyComponentViewModel, template: htmlString };
});
