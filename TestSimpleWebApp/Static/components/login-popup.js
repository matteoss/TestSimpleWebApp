define(['ko', 'text!./login-popup.html', 'security'], function (ko, htmlString, security) {
    function MyComponentViewModel(params) {
        this.username = ko.observable("");
        this.password = ko.observable("");
        this.button_login_text = "Login";
        this.button_cancel_text = "Cancel";

        var usernameLocal = this.username;
        var passwordLocal = this.password;
        this.login = function () {
            security.login(usernameLocal(), passwordLocal(), null, function (result) {
                console.error(JSON.stringify(result));
                alert(result.responseText);
            });
            var popup = document.getElementById(params.id);
            popup.classList.toggle("show");
        };
        this.close_function = function () {
            var popup = document.getElementById(params.id);
            popup.classList.toggle("show");
        }
    }

    return { viewModel: MyComponentViewModel, template: htmlString };
});
