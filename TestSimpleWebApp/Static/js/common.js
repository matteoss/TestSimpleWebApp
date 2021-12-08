
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

        ko.components.register('about', {
            template: { element: 'AboutTemplate' },
            viewModel: function (params) {
                this.tekst = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor lorem, auctor et ipsum quis, varius congue nibh. Morbi vitae ligula erat. Sed ac nunc euismod, auctor nulla volutpat, malesuada libero. Nam aliquet eros mi, sed pellentesque purus fringilla vitae. Curabitur odio quam, rutrum et lorem eu, placerat pharetra ligula. Nulla molestie rutrum metus a pellentesque. Nulla consequat tortor non feugiat suscipit. Fusce sit amet erat at elit feugiat vehicula eget eget orci. Morbi ipsum justo, blandit non sollicitudin et, mollis quis quam. Suspendisse commodo tristique consectetur. Fusce tristique imperdiet ipsum eu consequat.";
            }
        });

        ko.components.register('loading', {
            template: { element: 'LoadingTemplate' }
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
        ko.components.register('legend', {
            require: '/components/legend.js'
        });
        ko.components.register('property-list', {
            require: '/components/property-list.js'
        });
        ko.components.register('reservation-list', {
            require: '/components/reservation-list.js'
        });
        ko.components.register('res-status-list', {
            require: '/components/res-status-list.js'
        });
        ko.components.register('drop-down-list', {
            require: '/components/drop-down-list.js'
        });
        ko.components.register('book-table-2', {
            require: '/components/book-table-2.js'
        });
        ko.applyBindings();
    });
});
