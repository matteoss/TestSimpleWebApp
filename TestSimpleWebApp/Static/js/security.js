
define([], function () {
    var Security = {
        version: null,
        username: null,
        beforeSendFunction: null,
        checkLogin: null,
        login: null,
        logout: null,
        makeRequest: null,
        authorizationAction: null,
        isLoggedIn: null,
    };
    require(['jquery', 'ko'], function ($, ko) {
        Security.version = "1.0";
        Security.username = ko.observable("");
        Security.beforeSendFunction = function (xhr) {
            let token = document.cookie.match('(^|;)\\s*' + 'token' + '\\s*=\\s*([^;]+)')?.pop() || '';
            if (token != null) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }
        };

        let beforeSendFunctionLocal = Security.beforeSendFunction;
        let usernameLocal = Security.username;
        let logoutLocal = function () {
            document.cookie = "username= ; expires=Thu, 01 Jan 1970 00:00:01 GMT";
            document.cookie = "token= ; expires=Thu, 01 Jan 1970 00:00:01 GMT";
            usernameLocal("");
        };

        Security.checkLogin = function () {
            //console.log(document.cookie.match('(^|;)\\s*' + 'token' + '\\s*=\\s*([^;]+)')?.pop() || '');
            $.ajax({
                url: "authorized",
                beforeSend: beforeSendFunctionLocal,
                success: function (result) {
                    usernameLocal(document.cookie.match('(^|;)\\s*' + 'username' + '\\s*=\\s*([^;]+)')?.pop() || '');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 401) {
                        logoutLocal();
                    }
                }
            });
        };

        Security.login = function (username, password, error) {
            $.ajax({
                url: "login",
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify({ Username: username, Password: password }),
                success: function (result) {
                    console.log(JSON.stringify(result));
                    var expires = new Date(result.expires).toUTCString();
                    document.cookie = "username=" + username + "; expires=" + expires;
                    document.cookie = "token=" + result.token + "; expires=" + expires;
                    usernameLocal(username);
                },
                error: error
            });
        };

        Security.logout = logoutLocal;

        Security.makeRequest = function (url, type, data, success, error) {
            $.ajax({
                url: url,
                type: type,
                contentType: "application/json",
                beforeSend: beforeSendFunctionLocal,
                data: data,
                success: success,
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 401) {
                        logoutLocal();
                    }
                    error();
                }
            });
        };

        Security.authorizationAction = function () {
            if (Security.username()) {

                require(['dialog_yes_no_controller'], function (d) {
                    d.setSubject("Odjava?");
                    d.setYesFunction(
                        function () {
                            logoutLocal();
                            alert("Logged out.");
                        }
                    );
                    d.setNoFunction(
                        function () {
                        }
                    );
                    d.show();
                });

            } else {
                var popup = document.getElementById("login-popup");
                popup.classList.toggle("show");
            }
        };

        Security.isLoggedIn = ko.pureComputed(function () {
            if (usernameLocal()) {
                return true;
            } else {
                return false;
            }
        });
    });
    return Security;
});
    

