define(['ko', 'text!./popup.html'], function (ko, htmlString) {
    function Popup(params) {
        this.popup_subject = "Obavijest";
        this.popup_text = "Popup text";
        this.button_text = "Ok";
        this.close_function = function () {
            var popup = document.getElementById(params.id);
            popup.classList.toggle("show");
        }
    }
    return { viewModel: Popup, template: htmlString };
});

