define(['ko', 'text!./login.html', 'security', 'navigator'], function (ko, htmlString, security, navigator) {
    function MyComponentViewModel(params) {
        this.username = ko.observable("");
        this.password = ko.observable("");

        var usernameLocal = this.username;
        var passwordLocal = this.password;
        this.login = function () {
            security.login(usernameLocal(), passwordLocal(),
                function () {
                    navigator.setView('book-table');
                },
                function (result) {
                    console.error(JSON.stringify(result));
                    alert(result.responseText);
                }
            );
        };
    }

    return { viewModel: MyComponentViewModel, template: htmlString };
});
