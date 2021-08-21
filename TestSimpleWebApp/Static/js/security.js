
var Security;

require(['jquery', 'ko'], function ($, ko) {
    var SecurityFunction = function () {
        this.username = ko.observable("");

        this.beforeSendFunction = function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.match('(^|;)\\s*' + 'token' + '\\s*=\\s*([^;]+)')?.pop() || '');
        };

        var beforeSendFunctionTmp = this.beforeSendFunction;
        var usernameTmp = this.username;

        this.check_login = function () {
            $.ajax({
                url: "authorized",
                beforeSend: beforeSendFunctionTmp,
                success: function (result) {
                    username(document.cookie.match('(^|;)\\s*' + 'username' + '\\s*=\\s*([^;]+)')?.pop() || '');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 401) {
                        document.cookie = "";
                        usernameTmp("");
                    }
                }
            });
        };

        this.login = function (username, password, onError) {
            $.ajax({
                url: "login",
                type: 'POST',
                data: JSON.stringify({ username: username, password: password }),
                success: function (result) {
                    document.cookie = "username=" + username + "; token=" + result.Token + "; expires=Thu, 18 Dec 2013 12:00:00 UTC";
                    username(username);
                },
                error: onError
            });
        };
    };
    Security = new SecurityFunction();
    $(document).ready(
        function () {
            Security.check_login();
        }
    );

});

    

