define(['ko', 'text!./novi-oglas.html'], function (ko, htmlString) {
    function about(params) {
        this.tekst = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor lorem, auctor et ipsum quis, varius congue nibh. Morbi vitae ligula erat. Sed ac nunc euismod, auctor nulla volutpat, malesuada libero. Nam aliquet eros mi, sed pellentesque purus fringilla vitae. Curabitur odio quam, rutrum et lorem eu, placerat pharetra ligula. Nulla molestie rutrum metus a pellentesque. Nulla consequat tortor non feugiat suscipit. Fusce sit amet erat at elit feugiat vehicula eget eget orci. Morbi ipsum justo, blandit non sollicitudin et, mollis quis quam. Suspendisse commodo tristique consectetur. Fusce tristique imperdiet ipsum eu consequat.";
    }
    return { viewModel: about, template: htmlString };
});
