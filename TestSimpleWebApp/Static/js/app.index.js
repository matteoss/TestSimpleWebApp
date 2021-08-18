
requirejs(['js/common']);

var oglasi;
var page;
var hasMorePages;
var search;
require(['ko'], function (ko) {
    oglasi = ko.observableArray(); //[]; // [{naslov: "oglas1", opis: "opis1"}, {naslov: "oglas2", opis: "opis2"}];
    page = ko.observable(1);
    search = ko.observable("");
    hasMorePages = ko.observable(false);
});
var refresh_function = function () {
    require(['ko', 'jquery'], function (ko, $) {
        oglasi.removeAll();
        $.getJSON("/Oglasi/" + page() + "/" + search(), function (result) {
            $.each(result.List, function (i, field) {
                oglasi.push(field);
            });
            hasMorePages(result.HasMore);
        });
    });
}
refresh_function();

var search_function = function () {
    page(1);
    refresh_function();
}
