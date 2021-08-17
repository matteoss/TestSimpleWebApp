
require(['ko', 'jquery'], function (ko, $) {
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
        ko.applyBindings();
    });
});
