
requirejs(['js/common']);

var main_view;
var main_params = { params: null };

require(['ko', 'navigator'], function (ko, navigator) {
    main_view = ko.observable("about");

    navigator.main_view = main_view;
    navigator.main_params = main_params;
});

var refresh_function = function () {
    require(['ko', 'jquery', 'oglasi'], function (ko, $, o) {
        o.oglasi.removeAll();
        $.getJSON("/Oglasi/" + o.page() + "/" + o.search(), function (result) {
            //alert(JSON.stringify(result));
            $.each(result.list, function (i, field) {
                o.oglasi.push(field);
            });
            o.hasMorePages(result.hasMore);
        });
    });
}


function navigate(view) {
    require(['ko', 'navigator'], function (ko, navigator) {
        navigator.set_view(view);
        navigator.set_params(null);
    });
}


var search_function = function () {
    require(['navigator', 'oglasi'], function (navigator,o) {
        o.page(1);
        navigator.set_params({ oglasi: o.oglasi, page: o.page, hasMorePages: o.hasMorePages, refresh_function: refresh_function });
        navigator.set_view('lista-oglasa-paged');
    });
    refresh_function();
}

search_function();

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

var show_popup = function (id) {
    var popup = document.getElementById(id);
    popup.classList.toggle("show");
}


require(['jquery', 'security'], function ($, security) {
    $(document).ready(
        function () {
            security.check_login();
        }
    );
});
