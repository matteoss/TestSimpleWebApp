
require.config({
    //baseUrl: '/js',
    paths: {
        ko: '/js/lib/knockout-3.5.1',
        jquery: '/js/lib/jquery-3.6.0'
    }
});

require(['ko', 'jquery'], function (ko, $) {
    $(document).ready(function () {
        ko.components.register('navigation-bar', {
            require: '/components/navigation-bar.js' 
        });
        ko.components.register('test-temp', {
            //viewModel: { require: 'files/component-like-widget' },
            template: '<p>ovo je template 2</p>'
        });
        ko.applyBindings();
    });
});
