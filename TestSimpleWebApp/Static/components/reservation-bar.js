define(['ko', 'text!./reservation-bar.html'], function (ko, htmlString) {
    function about(params) {
        this.tekst = params.tekst;
    }
    return { viewModel: about, template: htmlString };
});
