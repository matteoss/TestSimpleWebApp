define(['ko', 'text!./dialog-yes-no.html', 'dialog_yes_no'], function (ko, htmlString, d) {
    function dialog(params) {
        d.id = params.id;
        this.dialog_subject = d.dialog_subject;
        this.dialog_text = d.dialog_text;
        this.button_yes_text = d.button_yes_text;
        this.button_no_text = d.button_no_text;
        this.yes_action = d.yes_action;
        this.no_action = d.no_action;
    }
    return { viewModel: dialog, template: htmlString };
});

