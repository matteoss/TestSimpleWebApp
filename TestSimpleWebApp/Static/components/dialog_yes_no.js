define(['ko', 'text!./dialog_yes_no.html'], function (ko, htmlString) {
    function dialog(params) {
        this.dialog_subject = "Obavijest";
        this.dialog_text = params.text;
        this.button_yes_text = "Yes";
        this.button_no_text = "No";
        this.yes_action = function () {
            var popup = document.getElementById(params.id);
            popup.classList.toggle("show");
            params.yes_action();
        };
        this.no_action = function () {
            var popup = document.getElementById(params.id);
            popup.classList.toggle("show");
            params.no_action();
        };
    }
    return { viewModel: dialog, template: htmlString };
});

