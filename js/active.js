(function ($) {
    'use strict';
    if ($.fn.footerReveal) {
        $('footer').footerReveal({
            shadow: true,
            shadowOpacity: 0.3,
            zIndex: -101,
            outerHeight: 300
        });
    }
    window.onload = () => {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    };
})(jQuery);

const uploadBtn = document.querySelector('.uploading-btn');
$(document).ready(function () {
    $(".uploading-btn a span").click(function () {
        var btn = $(this).parent().parent();
        var loadSVG = btn.children("a").children(".load");
        var loadBar = btn.children("div").children("span");
        var checkSVG = btn.children("a").children(".check");

        btn.children("a").children("span").fadeOut(200, function () {
            btn.children("a").animate({
                width: 56
            }, 100, function () {
                loadSVG.fadeIn(300);
                btn.animate({
                    width: "80%"
                }, 200, function () {
                    btn.children("div").fadeIn(200, function () {
                        loadBar.animate({
                            width: "100%"
                        }, 2000, function () {
                            loadSVG.fadeOut(200, function () {
                                checkSVG.fadeIn(200, function () {
                                    setTimeout(function () {
                                        btn.children("div").fadeOut(200, function () {
                                            loadBar.width(0);
                                            checkSVG.fadeOut(200, function () {
                                                btn.children("a").animate({
                                                    width: "100%"
                                                });
                                                btn.animate({
                                                    width: "100%"
                                                }, 300, function () {
                                                    btn.children("a").children("span").fadeIn(200);
                                                });
                                            });
                                        });
                                    }, 2000);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});