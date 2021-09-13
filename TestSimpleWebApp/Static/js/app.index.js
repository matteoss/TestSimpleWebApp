
requirejs(['js/common']);

var mainView;
var mainParams = { params: null };

require(['ko'], function (ko) {
    mainView = ko.observable("about");
});


function navigate(view) {
    require(['ko', 'navigator'], function (ko, navigator) {
        navigator.setView(view);
        navigator.setParams(null);
    });
}


var search_function = function (search) {
    require(['navigator'], function (navigator) {
        navigator.setParams({ search: search});
        navigator.setView('lista-oglasa-paged');
    });
}


var novi_oglas_action = function () {
    navigate('novi-oglas');
}

var make_alert = function () {
    require(['jquery'], function ($) {
        $.getJSON("/authorized/", function (result) {
            alert(JSON.stringify(result));
        });
    });
}

var d_y_n = function (text) {
    require(['dialog_yes_no'], function (d) {
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


require(['jquery'], function ($) {
    $(document).ready(
        function () {
            require(['security', 'navigator'], function (security, navigator) {
                security.checkLogin();
                navigator.mainView = mainView;
                navigator.mainParams = mainParams;
                navigator.setParams({});
                navigator.setView('book-table');
            });
        }
    );
});

require(['jquery', 'book_controller'], function ($,b) {
    $(document).ready(
        function () {
            b.refreshFunction();
        }
    );
});
