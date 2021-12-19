
define(['jquery', 'ko'], function ($, ko) {

    function Security() {
        let self = this;
        this.version = "1.0";
        this.username = ko.observable("");
        this.role = ko.observable("");
        this.navigator = null;
        this.isLoggedIn = ko.pureComputed(function () {
            if (self.username()) {
                return true;
            } else {
                return false;
            }
        });
    };

    Security.prototype.setNavigator = function(navigator){
        this.navigator = navigator;
    }

    Security.prototype.beforeSendFunction = function (xhr) {
        let token = document.cookie.match('(^|;)\\s*' + 'token' + '\\s*=\\s*([^;]+)')?.pop() || '';
        if (token != null) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        }
    };

    Security.prototype.logout = function (onSuccess) {
        console.log('security logout');
        document.cookie = "username= ; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        document.cookie = "token= ; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        document.cookie = "role= ; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        this.username("");
        this.role("");
        if (onSuccess) {
            onSuccess();
        }
    };

    Security.prototype.checkLogin = function (onSuccess) {
        //console.log(document.cookie.match('(^|;)\\s*' + 'token' + '\\s*=\\s*([^;]+)')?.pop() || '');
        console.log('security checkLogin');
        let self = this;
        $.ajax({
            url: "authorized",
            beforeSend: self.beforeSendFunction,
            success: function (result) {
                self.username(document.cookie.match('(^|;)\\s*' + 'username' + '\\s*=\\s*([^;]+)')?.pop() || '');
                self.role(document.cookie.match('(^|;)\\s*' + 'role' + '\\s*=\\s*([^;]+)')?.pop() || '');
                if (onSuccess) {
                    onSuccess();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 401) {
                    self.logout(function () {
                        if (self.navigator) {
                            self.navigator.setView('login');
                        }
                    });
                }
            }
        });
    };

    Security.prototype.login = function (username, password, onSuccess, onError) {
        console.log('security login');
        let self = this;
        $.ajax({
            url: "login",
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({ Username: username, Password: password }),
            success: function (result) {
                console.log(JSON.stringify(result));
                var expires = new Date(result.expires).toUTCString();
                document.cookie = "username=" + username + "; expires=" + expires;
                document.cookie = "role=" + result.role + "; expires=" + expires;
                document.cookie = "token=" + result.token + "; expires=" + expires;
                self.username(username);
                self.role(result.role);
                if (onSuccess) {
                    onSuccess();
                }
            },
            error: onError
        });
    };

    Security.prototype.makeRequest = function (params) {
        let self = this;
        $.ajax({
            url: params.url,
            type: params.type,
            contentType: params.contentType == null ? "application/json" : params.contentType,
            dataType: params.dataType,
            beforeSend: self.beforeSendFunction,
            data: params.data,
            success: params.success,
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(jqXHR);
                if (jqXHR.status == 401) {
                    self.logout();
                }
                if (typeof params.error === 'function') {
                    params.error(jqXHR);
                }
            }
        });
    };

    Security.prototype.authorizationAction = function (onLogout) {
        console.log('security authorizationAction');
        if (this.username()) {
            let self = this;
            require(['dialog_yes_no_controller'], function (d) {
                d.setSubject("Odjava?");
                d.setYesFunction(
                    function () {
                        self.logout(onLogout);
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
            this.navigator.setView('login');
        }
    };

    console.log('security loaded');
    return new Security();
});
    

