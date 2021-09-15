define(['ko', 'text!./navigation-bar.html', 'security'], function (ko, htmlString, security) {
    function MyComponentViewModel(params) {
        var self = this;
        this.search = ko.observable("");
        this.search_function = function () {
            params.search_function(self.search);
        }
        this.username = ko.pureComputed(function () {
            if (security.username()) {
                return security.username();
            } else {
                return "Login"
            }
        }); 
        this.authorizationAction = security.authorizationAction;
    }

return { viewModel: MyComponentViewModel, template: htmlString };
});
