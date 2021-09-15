define(['ko', 'text!./dialog-yes-no.html', 'dialog_yes_no_controller'], function (ko, htmlString, d) {
    function dialog(params) {
        d.setId(params.id);
        this.dialogSubject = d.dialogSubject;
        this.dialogText = d.dialogText;
        this.buttonYesText = d.buttonYesText;
        this.buttonNoText = d.buttonNoText;
        this.yesAction = function () {
            d.yesAction();
        }
        this.noAction = function () {
            d.noAction();
        }
        console.log("dialog-yes-no loaded " + params.id);
    }
    return { viewModel: dialog, template: htmlString };
});

