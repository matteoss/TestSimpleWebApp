define(['ko', 'text!./navigation-bar.html', 'security'], function (ko, htmlString, security) {
    function MyComponentViewModel(params) {
        this.search = params.search;
        this.search_function = params.search_function;
        this.username = ko.pureComputed(function () {
            if (security.username()) {
                return security.username();
            } else {
                return "Login"
            }
        }); 
        this.authorization_action = security.authorization_action;
    }

return { viewModel: MyComponentViewModel, template: htmlString };
});
