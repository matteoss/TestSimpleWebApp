
requirejs(['js/common']);

var mainView;
var mainParams = { params: null };

require(['ko'], function (ko) {
    mainView = ko.observable("about");
});


function navigate(view, params) {
    require(['ko', 'navigator'], function (ko, navigator) {
        navigator.setParams(params ? params : {});
        navigator.setView(view);
    });
}


var searchFunction = function (search) {
    require(['navigator', 'grid_controller'], function (navigator, gs) {
        navigator.setParams({ search: search });
        navigator.setView('guest-list');
        gs.getGrid("GuestGrid", "Guests", ['dateOfBirth']).searchFunction("contains(Surname,'" + search() + "') or contains(Name,'" + search() + "')");
    });
}


var make_alert = function () {
    require(['jquery'], function ($) {
        $.getJSON("/authorized/", function (result) {
            alert(JSON.stringify(result));
        });
    });
}

var d_y_n = function (text) {
    require(['dialog_yes_no_controller'], function (d) {
        d.setText(text);
        d.setYesFunction(
            function () {
                alert('yes');
            }
        );
        d.setNoFunction(
            function () {
                alert('no');
            }
        );
        d.show();
    });
}

var show_popup = function (id) {
    var popup = document.getElementById(id);
    popup.classList.toggle("show");
}

function book_2_test() {
    require(['book_controller_2'], function (b) {
        b.reservationRows()[0].reservations()[0].size(b.reservationRows()[0].reservations()[0].size() - 1);
    });
}

require(['jquery'], function ($) {
    $(document).ready(
        function () {
            require(['security', 'navigator', 'book_controller', 'book_controller_2'], function (security, navigator, b, b2) {
                security.checkLogin();
                navigator.mainView = mainView;
                navigator.mainParams = mainParams;
                navigator.setParams({});
                //navigator.setView('book-table-2');
                navigator.setView('book-table');
                b.refreshFunction();
                b2.refreshFunction();
            });
        }
    );
});

