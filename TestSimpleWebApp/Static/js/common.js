
//requirejs(['js/security']);

require(['ko', 'jquery', 'security'], function (ko, $, s) {
    $(document).ready(function () {
        ko.components.register('navigation-bar', {
            require: '/components/navigation-bar.js' 
        });
        ko.components.register('test-temp', {
            //viewModel: { require: 'files/component-like-widget' },
            template: '<p>ovo je template 2</p>'
        });

        ko.components.register('oglas', {
            require: '/components/oglas.js'
        });
        ko.components.register('lista-oglasa', {
            require: '/components/lista-oglasa.js'
        });
        ko.components.register('page-number', {
            require: '/components/page-number.js'
        });
        ko.components.register('lista-oglasa-paged', {
            require: '/components/lista-oglasa-paged.js'
        });
        ko.components.register('about', {
            require: '/components/about.js'
        });
        ko.components.register('novi-oglas', {
            require: '/components/novi-oglas.js'
        });
        ko.components.register('popup', {
            require: '/components/popup.js'
        });
        ko.components.register('login-popup', {
            require: '/components/login-popup.js'
        });
        ko.components.register('dialog-yes-no', {
            require: '/components/dialog-yes-no.js'
        });
        ko.applyBindings();
    });
});
