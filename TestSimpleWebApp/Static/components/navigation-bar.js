define(['ko', 'text!./navigation-bar.html', 'security', 'navigator'], function (ko, htmlString, security, navigator) {
    function MyComponentViewModel(params) {
        var self = this;
        this.search = ko.observable("");
        this.isLoggedIn = security.isLoggedIn;
        this.searchFunction = function () {
            params.searchFunction(self.search);
        }
        this.username = ko.pureComputed(function () {
            if (security.username()) {
                return security.username();
            } else {
                return "Login"
            }
        }); 
        this.authorizationAction = function () {
            security.authorizationAction(function () {
                navigator.setView('login');
            });
        }
    }

return { viewModel: MyComponentViewModel, template: htmlString };
});
