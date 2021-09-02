define(['ko', 'text!./navigation-bar.html', 'security', 'oglasi'], function (ko, htmlString, security, o) {
    function MyComponentViewModel(params) {
        this.search = o.search;
        this.search_function = params.search_function;
        this.username = ko.pureComputed(function () {
            if (security.username()) {
                return security.username();
            } else {
                return "Login"
            }
        }); 
        this.authorization_action = security.authorization_action;
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
