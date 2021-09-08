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
        this.novi_oglas_action = params.novi_oglas_action;
        this.show_novi_oglas = ko.pureComputed(function () {
            if (security.username()) {
                return true;
            } else {
                return false;
            }
        });
    }

return { viewModel: MyComponentViewModel, template: htmlString };
});
