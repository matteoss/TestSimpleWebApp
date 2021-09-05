
requirejs(['js/common']);

var main_view;
var main_params = { params: null };

require(['ko'], function (ko) {
    main_view = ko.observable("about");
});


function navigate(view) {
    require(['ko', 'navigator'], function (ko, navigator) {
        navigator.set_view(view);
        navigator.set_params(null);
    });
}


var search_function = function (search) {
    require(['navigator'], function (navigator) {
        navigator.set_params({ search: search});
        navigator.set_view('lista-oglasa-paged');
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
        d.set_text(text);
        d.set_yes_function(
            function () {
                alert('yes');
            }
        );
        d.set_no_function(
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
                security.check_login();
                navigator.main_view = main_view;
                navigator.main_params = main_params;
                search_function();
            });
        }
    );
});
