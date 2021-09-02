
define(['ko'], function (ko) {
    var Oglasi = {
        version: "1.0",
        oglasi: ko.observableArray(), //[]; // [{naslov: "oglas1", opis: "opis1"}, {naslov: "oglas2", opis: "opis2"}];
        page: ko.observable(1),
        hasMorePages: ko.observable(false),
        search: ko.observable("")
    };

    return Oglasi;
});
    

