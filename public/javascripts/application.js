/**
 * Created by .
 * User: oladipeter
 * Date: 2011.03.30.
 * Time: 14:29
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {
    $(".slidetabs").tabs(".images > div", {

        // enable "cross-fading" effect
        effect: 'fade',
        fadeOutSpeed: "slow",

        // start from the beginning after the last tab
        rotate: true

        // use the slideshow plugin. It accepts its own configuration
    }).slideshow();

    $(".slidetabs").data("slideshow").play();

    $('.play').click(function() {
        $(".slidetabs").data("slideshow").play();
    });

    $('.stop').click(function() {
        $(".slidetabs").data("slideshow").stop();
    });

    // SCROLLABLE

    // EASING

    // custom easing called "custom"
    $.easing.custom = function (x, t, b, c, d) {
        var s = 1.70158;
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    }

    $(function() {

	// initialize scrollable with mousewheel support
	$(".scrollable").scrollable({ vertical: true, mousewheel: true, easing: 'custom', speed: 3000, circular: true });
    $(".scrollable").autoscroll({ autoplay: true, interval: 7000 });

    /* TABOK ELTUNTETTESE */

    $("div.close").click(function () {
        $(this).fadeOut("slow");
    });

});

});








