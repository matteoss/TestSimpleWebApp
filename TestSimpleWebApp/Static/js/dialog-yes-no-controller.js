
define(['ko'], function (ko) {
    var Dialog = {
        version: "1.0",
        id: null,
        dialog_subject: ko.observable("Obavijest"),
        dialog_text: ko.observable("Text"),
        button_yes_text: "Yes",
        button_no_text: "No",
        yes_function: null,
        no_function: null,
        yes_action: null,
        no_action: null,
    };

    Dialog.yes_action = function () {
        var popup = document.getElementById(Dialog.id);
        popup.classList.toggle("show");
        if (typeof Dialog.yes_function === 'function') {
            Dialog.yes_function();
        }
        Dialog.yes_function = null;
    };
    Dialog.no_action = function () {
        var popup = document.getElementById(Dialog.id);
        popup.classList.toggle("show");
        if (typeof Dialog.no_function === 'function') {
            Dialog.no_function();
        }
        Dialog.no_function = null;
    };

    Dialog.set_text = function (text) {
        Dialog.dialog_text(text);
    };
    Dialog.set_subject = function (text) {
        Dialog.dialog_subject(text);
    };

    Dialog.set_yes_function = function (f) {
        Dialog.yes_function = f;
    };
    Dialog.set_no_function = function (f) {
        Dialog.no_function = f;
    };
    Dialog.show = function () {
        var popup = document.getElementById(Dialog.id);
        popup.classList.toggle("show");
    };

    return Dialog;
});
    

