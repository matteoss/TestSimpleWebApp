define(['ko', 'text!./lista-oglasa.html'], function (ko, htmlString) {
    function ListaOglasa(params) {
        this.oglasi = params.oglasi;
    }

    return { viewModel: ListaOglasa, template: htmlString };
});
