define(['ko', 'text!./navigation-bar.html'], function (ko, htmlString) {
    function MyComponentViewModel(params) {
        // Set up properties, etc.
        this.search = params.search;
        this.search_function = params.search_function;
    }

    // Use prototype to declare any public methods
    //MyComponentViewModel.prototype.doSomething = function () { ... };

// Return component definition
return { viewModel: MyComponentViewModel, template: htmlString };
});
