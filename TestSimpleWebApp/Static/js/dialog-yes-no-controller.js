
define(['ko'], function (ko) {
    function Dialog() {
        this.version = "1.0";
        this.dialogId = "";
        this.dialogSubject = ko.observable("Obavijest");
        this.dialogText = ko.observable("Text");
        this.buttonYesText= "Yes";
        this.buttonNoText= "No";
        this.yesFunction= null;
        this.noFunction= null;
    };

    Dialog.prototype.setId = function (id) {
        this.dialogId = id;
    }

    Dialog.prototype.yesAction = function () {
        var popup = document.getElementById(this.dialogId);
        popup.classList.toggle("show");
        if (typeof this.yesFunction === 'function') {
            this.yesFunction();
        }
        this.yesFunction = null;
        console.log("Dialog.yesAction");
    };

    Dialog.prototype.noAction = function () {
        var popup = document.getElementById(this.dialogId);
        popup.classList.toggle("show");
        if (typeof this.noFunction === 'function') {
            this.noFunction();
        }
        this.noFunction = null;
        console.log("Dialog.noAction");
    };

    Dialog.prototype.setText = function (text) {
        this.dialogText(text);
    };
    Dialog.prototype.setSubject = function (text) {
        this.dialogSubject(text);
    };

    Dialog.prototype.setYesFunction = function (f) {
        this.yesFunction = f;
    };
    Dialog.prototype.setNoFunction = function (f) {
        this.noFunction = f;
    };
    Dialog.prototype.show = function () {
        var popup = document.getElementById(this.dialogId);
        popup.classList.toggle("show");
        console.log("Dialog.show " + this.dialogId);
    };
    console.log("dialog-yes-no-controller ready");
    return new Dialog();
});
    

