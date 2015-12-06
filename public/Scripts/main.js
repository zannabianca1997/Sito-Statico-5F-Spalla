(function(){
    var imagesNumber = $('.mosaic li').size();
    var minImageSize = 150;

    $( window ).resize(function() {
        refreshMosaic();
    });

    $(document).ready(function() {
        refreshMosaic();
    });

    function refreshMosaic(){
        var width = $( window ).width();
        var height = $( window ).height();

    }

})();