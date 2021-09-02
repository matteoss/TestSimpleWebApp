define(['ko', 'text!./lista-oglasa-paged.html'], function (ko, htmlString) {
    function ListaOglasaP(params) {
        this.oglasi = params.oglasi;
        this.page = params.page;
        this.hasMorePages = params.hasMorePages;
        this.refresh_function = params.refresh_function;
    }

    return { viewModel: ListaOglasaP, template: htmlString };
});
