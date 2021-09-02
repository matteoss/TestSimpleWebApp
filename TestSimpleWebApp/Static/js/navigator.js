
define([], function () {
    var Navigator = {
        version: "1.0",
        main_params: null,
        main_view: null,
        set_view: null,
        set_params: null
    };

    Navigator.set_view = function (page) {
        Navigator.main_view(page);
    };

    Navigator.set_params = function (params) {
        Navigator.main_params.params = params;
    };

    return Navigator;
});
    

