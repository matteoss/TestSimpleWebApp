
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

        /*ko.components.register('oglas', {
            require: '/components/oglas.js'
        });
        ko.components.register('lista-oglasa', {
            require: '/components/lista-oglasa.js'
        });
        ko.components.register('lista-oglasa-paged', {
            require: '/components/lista-oglasa-paged.js'
        });*/
        ko.components.register('page-number', {
            require: '/components/page-number.js'
        });
        ko.components.register('about', {
            require: '/components/about.js'
        });
        /*ko.components.register('novi-oglas', {
            require: '/components/novi-oglas.js'
        });*/
        ko.components.register('popup', {
            require: '/components/popup.js'
        });
        ko.components.register('login-popup', {
            require: '/components/login-popup.js'
        });
        ko.components.register('dialog-yes-no', {
            require: '/components/dialog-yes-no.js'
        });
        ko.components.register('book-bar', {
            require: '/components/book-bar.js'
        });
        ko.components.register('book-row', {
            require: '/components/book-row.js'
        });
        ko.components.register('book-table', {
            require: '/components/book-table.js'
        });
        ko.components.register('book-details', {
            require: '/components/book-details.js'
        });
        ko.components.register('book-params', {
            require: '/components/book-params.js'
        });
        ko.components.register('guest', {
            require: '/components/guest.js'
        });
        ko.components.register('guest-list', {
            require: '/components/guest-list.js'
        });
        ko.components.register('property-list', {
            require: '/components/property-list.js'
        });
        ko.components.register('reservation-list', {
            require: '/components/reservation-list.js'
        });
        ko.components.register('book-table-2', {
            require: '/components/book-table-2.js'
        });
        ko.applyBindings();
    });
});
