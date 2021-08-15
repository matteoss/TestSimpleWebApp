
require.config({
    //baseUrl: '/Static',
    paths: {
        ko: '/js/lib/knockout-3.5.1'
    }
});

require(['ko'], function (ko) {
    ko.components.register('navigation-bar', {
        //viewModel: { require: 'files/component-like-widget' },
        template: { require: 'text!components/navigation-bar.html' }
    });
    alert("nav bar registered");
});
