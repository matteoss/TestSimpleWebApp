
define(['module'], function (module) {
    var Security = {
        version: null,
        username: null,
        beforeSendFunction: null,
        check_login: null,
        login: null,
    };
    require(['jquery', 'ko'], function ($, ko) {
        Security.version = "1.0";
        Security.username = ko.observable("");
        Security.beforeSendFunction = function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + document.cookie.match('(^|;)\\s*' + 'token' + '\\s*=\\s*([^;]+)')?.pop() || '');
        };

        var beforeSendFunctionTmp = Security.beforeSendFunction;
        var usernameTmp = Security.username;

        Security.check_login = function () {
            console.log(document.cookie.match('(^|;)\\s*' + 'token' + '\\s*=\\s*([^;]+)')?.pop() || '');
            $.ajax({
                url: "authorized",
                beforeSend: beforeSendFunctionTmp,
                success: function (result) {
                    usernameTmp(document.cookie.match('(^|;)\\s*' + 'username' + '\\s*=\\s*([^;]+)')?.pop() || '');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 401) {
                        document.cookie = "username= ; expires=Thu, 01 Jan 1970 00:00:01 GMT";
                        document.cookie = "token= ; expires=Thu, 01 Jan 1970 00:00:01 GMT";
                        usernameTmp("");
                    }
                }
            });
        };

        Security.login = function (username, password, onError) {
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
                    usernameTmp(username);
                },
                error: onError
            });
        };

        /*$(document).ready(
            function () {
                Security.check_login();
            }
        );*/

    });
    return Security;
});
    

