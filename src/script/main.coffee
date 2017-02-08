util = require('./assets/util.coffee')

$window = $(window);
$container = $('.container');
$contentContainer = $('.content-container');
$rightContainer = $('.right-content-container');
$leftConainer = $('.left-content-container');

margin = 40;
contentMargin = 24;

themeLoaded = false;

theme = "dark";

initWindow = ->
    if $window.width() <= 1280
        $container.css("width", $window.width() - margin * 2);
        $container.css("marginLeft", margin);
    else
        $container.css("width", 1200);
        $container.css("marginLeft", ($window.width() - 1200) / 2);


    if $window.height() <= 650 + margin * 2
        $container.css("height", $window.height() - margin * 2);
        $container.css("margin-top", margin);
    else
        $container.css("height", 650)
        $container.css("margin-top", ($window.height() - 650) / 2);
    $contentContainer.css("height", $container.height() - 64);
#    $('body').fadeIn();

toggleTheme = ->
    $('.content-container').mCustomScrollbar("destroy")
    if theme == 'dark'
        $('body').removeClass('theme-dark').addClass('theme-light')
        $('.content-container').mCustomScrollbar({
            axis: "y",
            theme: "dark"
        });
        theme = 'light';
    else
        $('body').removeClass('theme-light').addClass('theme-dark')
        $('.content-container').mCustomScrollbar({
            axis: "y"
        });
        theme = 'dark';


$ ->
    if $window.width() >= 1100
        $('body').removeClass('mobile-view').addClass('theme-dark').fadeIn(2000)
        $('.logo').appendTo $('.logo-web')
        $('.game-highlight').appendTo $('.left-content-container')
        $('.banner').appendTo $('.left-content-container')
        $('.show-more').hide()
        $('.hot-topics').insertBefore $('.hot-wanted')

        initWindow();

        $('.content-container').mCustomScrollbar({
            axis: "y"
        });

        $(window).resize -> initWindow()

#    $('.change-theme').on 'click', (e) ->
#        e.stopPropagation()
#        if themeLoaded
#            toggleTheme()
#        else
#            util.loadCss('style/light/index.css').then ->
#                toggleTheme()
#                themeLoaded = true
