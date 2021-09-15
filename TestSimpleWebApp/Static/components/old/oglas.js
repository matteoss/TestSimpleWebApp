define(['ko', 'text!./oglas.html'], function (ko, htmlString) {
    function Oglas(params) {
        this.naslov = ko.observable(params.oglas.naziv);
        this.opis = ko.observable(params.oglas.opis);
        this.vrijeme_kreiranja = ko.observable(params.oglas.datumKreiranja);
        //alert(JSON.stringify(params));
    }
    return { viewModel: Oglas, template: htmlString };
});
