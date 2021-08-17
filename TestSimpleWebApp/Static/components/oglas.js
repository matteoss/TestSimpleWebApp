define(['ko', 'text!./oglas.html'], function (ko, htmlString) {
    function Oglas(naslov, opis) {
        this.naziv = ko.observable(naslov);
        this.opis = ko.observable(opis);
    }

    Oglas.prototype.postaviOglas = function (oglas) {
        this.naziv = oglas.naziv;
        this.opis = oglas.opis;
    };

return { viewModel: Oglas, template: htmlString };
});
