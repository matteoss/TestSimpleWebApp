define(['ko', 'jquery', 'text!./lista-oglasa-paged.html'], function (ko, $, htmlString) {
    function ListaOglasaP(params) {
        var self = this;
        this.oglasi = ko.observableArray(); //[]; // [{naslov: "oglas1", opis: "opis1"}, {naslov: "oglas2", opis: "opis2"}];
        this.page = ko.observable(1);
        this.hasMorePages = ko.observable(false);
        this.search = params.search;

        this.refreshFunction = function () {
            self.oglasi.removeAll();
            $.getJSON("/Oglasi/" + self.page() + "/" + ((typeof self.search === 'function') ? self.search() : ""), function (result) {
                //alert(JSON.stringify(result));
                $.each(result.list, function (i, field) {
                    self.oglasi.push(field);
                });
                self.hasMorePages(result.hasMore);
            });
        };

        $(document).ready(
            function () {
                self.refreshFunction();
            }
        );
    }

    return { viewModel: ListaOglasaP, template: htmlString };
});
