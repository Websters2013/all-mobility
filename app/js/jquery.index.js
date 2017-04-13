( function(){

    $(function () {

        $('.main-slider').each(function () {

            new MainSlider( $(this) );

        } );

    } );


    var MainSlider = function (obj) {

        //private properties
        var _obj = obj,
            _window = $(window),
            _slide = _obj.find('.swiper-slide'),
            _swiper;

        //private methods

        var _addEvents = function () {

                _window.resize( function() {

                    _slide.css( {
                        minHeight: ''
                    } );
                    _slide.css( {
                        minHeight: $('.swiper-container').height()
                    } );

                } );
            },
            _initSlider = function() {

                _swiper = new Swiper( _obj.find( '.swiper-container' ), {
                    pagination: _obj.find('.swiper-pagination'),
                    paginationClickable: true,
                    speed: 600,
                    loop: true,
                    autoplay: 5000,
                    autoplayDisableOnInteraction: false,
                    nextButton: _obj.find('.swiper-button-next'),
                    prevButton: _obj.find('.swiper-button-prev')
                } );

                _slide.css( {
                    minHeight: $('.swiper-container').height()
                } );

            },
            _init = function () {
                _addEvents();
                _initSlider();
            };

        //public properties

        //public methods

        _init();
    };

} )();
