
define([], function () {
    var Navigator = {
        version: "1.0",
        mainParams: null,
        mainView: null,
        setView: null,
        setParams: null
    };

    Navigator.setView = function (page) {
        Navigator.mainView(page);
    };

    Navigator.setParams = function (params) {
        Navigator.mainParams.params = params;
    };

    return Navigator;
});
    

