define(['ko', 'text!./oglas.html'], function (ko, htmlString) {
    function Oglas(params) {
        this.naslov = ko.observable(params.oglas.Naziv);
        this.opis = ko.observable(params.oglas.Opis);
        this.vrijeme_kreiranja = ko.observable(params.oglas.VrijemeKreiranja);
        //alert(JSON.stringify(params));
    }
return { viewModel: Oglas, template: htmlString };
});
