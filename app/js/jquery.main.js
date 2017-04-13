( function(){

    $(function () {

        $('.site__menu').each(function () {

            new SubMenu( $(this) );
            new Menu( $(this) );

        } );

    } );

    var SubMenu = function (obj) {

        //private properties
        var _obj = obj,
            _items = _obj.find('.site__menu-item'),
            _arrow = _obj.find('.fa-chevron-down'),
            _window = $(window),
            _startWinWidth = _window.width();

        //private methods

        var _addEvents = function () {

                _window.on( {
                    resize: function () {

                        if( _startWinWidth > _window.width() ) {

                            _startWinWidth = _window.width();

                            _window.find('.opened').removeClass('opened');

                        }

                    }
                } );

                $('body').on('click', '.fa-chevron-down', function() {

                    if( jQuery(window).width() < 1000 ) {

                        var curItem = jQuery(this),
                            parent = curItem.parent('li');

                        if ( parent.hasClass('opened') ) {

                            parent.removeClass('opened');

                        } else {

                            parent.addClass('opened');

                        }

                    }

                    return false;

                });
                _arrow.on( {
                    click: function () {

                        var curItem = jQuery(this),
                            parent = curItem.parent('li');

                        if( _window.width() < 1024 ) {
                            if ( parent.hasClass('opened') ) {

                                parent.removeClass('opened');

                            } else {

                                parent.addClass('opened');

                            }
                        }


                        return false;
                    }
                } );
                _items.on( {
                    mouseenter: function() {

                        if( _window.width() >= 1024 ) {

                            var curItem = $(this),
                                parent = curItem.parent('ul');

                            if( curItem.hasClass('site__menu-item_sub') ) {

                                curItem.addClass('opened');

                                var subMenu = curItem.find('.site__menu-sub');

                                if( ( _window.width() - ( subMenu.innerWidth() + curItem.offset().left ) ) < 0 ) {

                                    subMenu.css( {
                                        left: curItem.position().left - subMenu.innerWidth() + curItem.innerWidth()
                                    } );

                                } else {

                                    subMenu.css( {
                                        left: curItem.position().left
                                    } );

                                }

                            }

                        }

                    }
                } );
                $('[data-product]').on( {
                    mouseenter: function() {

                        if( _window.width() >= 1024 ) {

                            var curItem = $(this);

                            var data = curItem.data('product');

                            console.log(data);

                            _obj.find('.featured-product').find('.featured-product__title').text(data.name);
                            _obj.find('.featured-product').find('.featured-product__pic img').attr('src', data.src);
                            _obj.find('.featured-product').find('.btn').attr('url', data.href);
                            _obj.find('.featured-product').find('.featured-product__price span').text(data.price);


                            if( data.onSale ) {
                                _obj.find('.featured-product').find('.featured-product__remark').addClass('visible');
                            } else {
                                _obj.find('.featured-product').find('.featured-product__remark').removeClass('visible');
                            }

                            if( data.oldPrice ) {
                                _obj.find('.featured-product').find('.featured-product__price del').text(data.oldPrice );
                            } else {
                                _obj.find('.featured-product').find('.featured-product__price del').addClass('hidden');
                            }

                        }

                    }
                } );
                _obj.on( 'mouseleave', function(){

                    if( _window.width() >= 1024 ) {

                        $(this).find('.opened').removeClass('opened');

                    }

                } );
                _obj.find('ul').on( 'mouseleave', function(){

                    if( _window.width() >= 1024 ) {

                        $(this).find('.opened').removeClass('opened');

                    }

                } );
                _obj.find('li').on( 'mouseleave', function(){

                    if( _window.width() >= 1024 ) {

                        $(this).removeClass('opened');

                    }

                } );

            },
            _init = function () {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };
    var Menu = function (obj) {

        //private properties
        var _self = this,
            _menu = obj,
            _window = $(window),
            _action = false,
            _lastPos,
            _header = $('.site__header'),
            _headerHeight = _header.innerHeight(),
            _showBtn = $('.site__header-btn');

        //private methods
        var _addEvents = function () {

                _showBtn.on({
                    click: function () {

                        _openMenu($(this));

                    }
                });

                _window.on( {
                    scroll: function () {
                        _fixedHeader();
                        _action = _window.scrollTop() >= _headerHeight;

                    },
                    DOMMouseScroll: function (e) {

                        var delta = e.originalEvent.detail;

                        if (delta) {
                            var direction = (delta > 0) ? 1 : -1;

                            _checkScroll(direction);

                        }

                    },
                    mousewheel: function (e) {

                        var delta = e.originalEvent.wheelDelta;

                        if (delta) {
                            var direction = (delta > 0) ? -1 : 1;

                            _checkScroll(direction);

                        }

                    },
                    touchmove: function (e) {

                        var currentPos = e.originalEvent.touches[0].clientY;

                        if (currentPos > _lastPos) {

                            _checkScroll(-1);


                        } else if (currentPos < _lastPos) {

                            _checkScroll(1);

                        }

                        _lastPos = currentPos;

                    },
                    keydown: function (e) {
                        switch (e.which) {

                            case 32:
                                _checkScroll(1);
                                break;
                            case 33:
                                _checkScroll(-1);
                                break;
                            case 34 :
                                _checkScroll(1);
                                break;
                            case 35 :
                                _checkScroll(1);
                                break;
                            case 36 :
                                _checkScroll(-1);
                                break;
                            case 38:
                                _checkScroll(-1);
                                break;
                            case 40:
                                _checkScroll(1);
                                break;

                            default:
                                return;
                        }
                    }


                } );

            },
            _checkScroll = function (direction) {

                if (direction > 0 && !_header.hasClass('site__header_hidden') && !_showBtn.hasClass('opened') && _action) {

                    _header.addClass('site__header_hidden');

                }

                if (direction < 0 && _header.hasClass('site__header_hidden') && !_showBtn.hasClass('opened') && _action) {

                    _header.removeClass('site__header_hidden');

                }

            },
            _fixedHeader = function () {

                if (_window.scrollTop() > _headerHeight  ) {

                    //setTimeout( function() {
                        _header.addClass('fixed');
                    //}, 500 );

                } else {

                    //_header.removeClass('fixed');

                    //setTimeout( function() {
                        _header.removeClass('fixed');
                    //}, 510 );

                }

            },
            _openMenu = function (elem) {

                var curItem = elem;

                if (curItem.hasClass('opened')) {

                    curItem.removeClass('opened');

                } else {

                    curItem.addClass('opened');

                }

            },
            _init = function () {
                _menu[0].obj = _self;
                _addEvents();
            };

        _init();
    };

} )();