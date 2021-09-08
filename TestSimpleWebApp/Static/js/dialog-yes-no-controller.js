
define(['ko'], function (ko) {
    var Dialog = {
        version: "1.0",
        id: null,
        dialogSubject: ko.observable("Obavijest"),
        dialogText: ko.observable("Text"),
        buttonYesText: "Yes",
        buttonNoText: "No",
        yesFunction: null,
        noFunction: null,
        yesAction: null,
        noAction: null,
    };

    Dialog.yesAction = function () {
        var popup = document.getElementById(Dialog.id);
        popup.classList.toggle("show");
        if (typeof Dialog.yesFunction === 'function') {
            Dialog.yesFunction();
        }
        Dialog.yesFunction = null;
    };
    Dialog.noAction = function () {
        var popup = document.getElementById(Dialog.id);
        popup.classList.toggle("show");
        if (typeof Dialog.noFunction === 'function') {
            Dialog.noFunction();
        }
        Dialog.noFunction = null;
    };

    Dialog.setText = function (text) {
        Dialog.dialogText(text);
    };
    Dialog.setSubject = function (text) {
        Dialog.dialogSubject(text);
    };

    Dialog.setYesFunction = function (f) {
        Dialog.yesFunction = f;
    };
    Dialog.setNoFunction = function (f) {
        Dialog.noFunction = f;
    };
    Dialog.show = function () {
        var popup = document.getElementById(Dialog.id);
        popup.classList.toggle("show");
    };

    return Dialog;
});
    

