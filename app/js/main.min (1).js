! function (Z) {
    var U = {
        mode: "horizontal",
        slideSelector: "",
        infiniteLoop: !0,
        hideControlOnEnd: !1,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: !1,
        captions: !1,
        ticker: !1,
        tickerHover: !1,
        adaptiveHeight: !1,
        adaptiveHeightSpeed: 500,
        video: !1,
        useCSS: !0,
        preloadImages: "visible",
        responsive: !0,
        slideZIndex: 50,
        wrapperClass: "bx-wrapper",
        touchEnabled: !0,
        swipeThreshold: 50,
        oneToOneTouch: !0,
        preventDefaultSwipeX: !0,
        preventDefaultSwipeY: !1,
        ariaLive: !0,
        ariaHidden: !0,
        keyboardEnabled: !1,
        pager: !0,
        pagerType: "full",
        pagerShortSeparator: " / ",
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,
        controls: !0,
        nextText: "Next",
        prevText: "Prev",
        nextSelector: null,
        prevSelector: null,
        autoControls: !1,
        startText: "Start",
        stopText: "Stop",
        autoControlsCombine: !1,
        autoControlsSelector: null,
        auto: !1,
        pause: 4e3,
        autoStart: !0,
        autoDirection: "next",
        stopAutoOnClick: !1,
        autoHover: !1,
        autoDelay: 0,
        autoSlideForOnePage: !1,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        shrinkItems: !1,
        onSliderLoad: function () {
            return !0
        },
        onSlideBefore: function () {
            return !0
        },
        onSlideAfter: function () {
            return !0
        },
        onSlideNext: function () {
            return !0
        },
        onSlidePrev: function () {
            return !0
        },
        onSliderResize: function () {
            return !0
        },
        onAutoChange: function () {
            return !0
        }
    };
    Z.fn.bxSlider = function (e) {
        if (0 === this.length) return this;
        if (1 < this.length) return this.each(function () {
            Z(this).bxSlider(e)
        }), this;
        var g = {},
            p = this,
            n = Z(window).width(),
            s = Z(window).height();
        if (!Z(p).data("bxSlider")) {
            var o = function () {
                    Z(p).data("bxSlider") || (g.settings = Z.extend({}, U, e), g.settings.slideWidth = parseInt(g.settings.slideWidth), g.children = p.children(g.settings.slideSelector), g.children.length < g.settings.minSlides && (g.settings.minSlides = g.children.length), g.children.length < g.settings.maxSlides && (g.settings.maxSlides = g.children.length), g.settings.randomStart && (g.settings.startSlide = Math.floor(Math.random() * g.children.length)), g.active = {
                        index: g.settings.startSlide
                    }, g.carousel = 1 < g.settings.minSlides || 1 < g.settings.maxSlides, g.carousel && (g.settings.preloadImages = "all"), g.minThreshold = g.settings.minSlides * g.settings.slideWidth + (g.settings.minSlides - 1) * g.settings.slideMargin, g.maxThreshold = g.settings.maxSlides * g.settings.slideWidth + (g.settings.maxSlides - 1) * g.settings.slideMargin, g.working = !1, g.controls = {}, g.interval = null, g.animProp = "vertical" === g.settings.mode ? "top" : "left", g.usingCSS = g.settings.useCSS && "fade" !== g.settings.mode && function () {
                        for (var t = document.createElement("div"), e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"], i = 0; i < e.length; i++)
                            if (void 0 !== t.style[e[i]]) return g.cssPrefix = e[i].replace("Perspective", "").toLowerCase(), g.animProp = "-" + g.cssPrefix + "-transform", !0;
                        return !1
                    }(), "vertical" === g.settings.mode && (g.settings.maxSlides = g.settings.minSlides), p.data("origStyle", p.attr("style")), p.children(g.settings.slideSelector).each(function () {
                        Z(this).data("origStyle", Z(this).attr("style"))
                    }), t())
                },
                t = function () {
                    var t = g.children.eq(g.settings.startSlide);
                    p.wrap('<div class="' + g.settings.wrapperClass + '"><div class="bx-viewport"></div></div>'), g.viewport = p.parent(), g.settings.ariaLive && !g.settings.ticker && g.viewport.attr("aria-live", "polite"), g.loader = Z('<div class="bx-loading" />'), g.viewport.prepend(g.loader), p.css({
                        width: "horizontal" === g.settings.mode ? 1e3 * g.children.length + 215 + "%" : "auto",
                        position: "relative"
                    }), g.usingCSS && g.settings.easing ? p.css("-" + g.cssPrefix + "-transition-timing-function", g.settings.easing) : g.settings.easing || (g.settings.easing = "swing"), g.viewport.css({
                        width: "100%",
                        overflow: "hidden",
                        position: "relative"
                    }), g.viewport.parent().css({
                        maxWidth: l()
                    }), g.children.css({
                        float: "horizontal" === g.settings.mode ? "left" : "none",
                        listStyle: "none",
                        position: "relative"
                    }), g.children.css("width", d()), "horizontal" === g.settings.mode && 0 < g.settings.slideMargin && g.children.css("marginRight", g.settings.slideMargin), "vertical" === g.settings.mode && 0 < g.settings.slideMargin && g.children.css("marginBottom", g.settings.slideMargin), "fade" === g.settings.mode && (g.children.css({
                        position: "absolute",
                        zIndex: 0,
                        display: "none"
                    }), g.children.eq(g.settings.startSlide).css({
                        zIndex: g.settings.slideZIndex,
                        display: "block"
                    })), g.controls.el = Z('<div class="bx-controls" />'), g.settings.captions && C(), g.active.last = g.settings.startSlide === h() - 1, g.settings.video && p.fitVids(), "none" === g.settings.preloadImages ? t = null : ("all" === g.settings.preloadImages || g.settings.ticker) && (t = g.children), g.settings.ticker ? g.settings.pager = !1 : (g.settings.controls && w(), g.settings.auto && g.settings.autoControls && b(), g.settings.pager && S(), (g.settings.controls || g.settings.autoControls || g.settings.pager) && g.viewport.after(g.controls.el)), null === t ? a() : r(t, a)
                },
                r = function (t, e) {
                    var i = t.find('img:not([src=""]), iframe').length,
                        n = 0;
                    0 !== i ? t.find('img:not([src=""]), iframe').each(function () {
                        Z(this).one("load error", function () {
                            ++n === i && e()
                        }).each(function () {
                            (this.complete || "" == this.src) && Z(this).trigger("load")
                        })
                    }) : e()
                },
                a = function () {
                    if (g.settings.infiniteLoop && "fade" !== g.settings.mode && !g.settings.ticker) {
                        var t = "vertical" === g.settings.mode ? g.settings.minSlides : g.settings.maxSlides,
                            e = g.children.slice(0, t).clone(!0).addClass("bx-clone"),
                            i = g.children.slice(-t).clone(!0).addClass("bx-clone");
                        g.settings.ariaHidden && (e.attr("aria-hidden", !0), i.attr("aria-hidden", !0)), p.append(e).prepend(i)
                    }
                    g.loader.remove(), f(), "vertical" === g.settings.mode && (g.settings.adaptiveHeight = !0), g.viewport.height(u()), p.redrawSlider(), g.settings.onSliderLoad.call(p, g.active.index), g.initialized = !0, g.settings.responsive && Z(window).on("resize", V), g.settings.auto && g.settings.autoStart && (1 < h() || g.settings.autoSlideForOnePage) && H(), g.settings.ticker && W(), g.settings.pager && y(g.settings.startSlide), g.settings.controls && A(), g.settings.touchEnabled && !g.settings.ticker && F(), g.settings.keyboardEnabled && !g.settings.ticker && Z(document).keydown(O)
                },
                u = function () {
                    var e = 0,
                        t = Z();
                    if ("vertical" === g.settings.mode || g.settings.adaptiveHeight)
                        if (g.carousel) {
                            var n = 1 === g.settings.moveSlides ? g.active.index : g.active.index * v();
                            for (t = g.children.eq(n), i = 1; i <= g.settings.maxSlides - 1; i++) t = n + i >= g.children.length ? t.add(g.children.eq(i - 1)) : t.add(g.children.eq(n + i))
                        } else t = g.children.eq(g.active.index);
                    else t = g.children;
                    return "vertical" === g.settings.mode ? (t.each(function (t) {
                        e += Z(this).outerHeight()
                    }), 0 < g.settings.slideMargin && (e += g.settings.slideMargin * (g.settings.minSlides - 1))) : e = Math.max.apply(Math, t.map(function () {
                        return Z(this).outerHeight(!1)
                    }).get()), "border-box" === g.viewport.css("box-sizing") ? e += parseFloat(g.viewport.css("padding-top")) + parseFloat(g.viewport.css("padding-bottom")) + parseFloat(g.viewport.css("border-top-width")) + parseFloat(g.viewport.css("border-bottom-width")) : "padding-box" === g.viewport.css("box-sizing") && (e += parseFloat(g.viewport.css("padding-top")) + parseFloat(g.viewport.css("padding-bottom"))), e
                },
                l = function () {
                    var t = "100%";
                    return 0 < g.settings.slideWidth && (t = "horizontal" === g.settings.mode ? g.settings.maxSlides * g.settings.slideWidth + (g.settings.maxSlides - 1) * g.settings.slideMargin : g.settings.slideWidth), t
                },
                d = function () {
                    var t = g.settings.slideWidth,
                        e = g.viewport.width();
                    if (0 === g.settings.slideWidth || g.settings.slideWidth > e && !g.carousel || "vertical" === g.settings.mode) t = e;
                    else if (1 < g.settings.maxSlides && "horizontal" === g.settings.mode) {
                        if (e > g.maxThreshold) return t;
                        e < g.minThreshold ? t = (e - g.settings.slideMargin * (g.settings.minSlides - 1)) / g.settings.minSlides : g.settings.shrinkItems && (t = Math.floor((e + g.settings.slideMargin) / Math.ceil((e + g.settings.slideMargin) / (t + g.settings.slideMargin)) - g.settings.slideMargin))
                    }
                    return t
                },
                c = function () {
                    var t = 1,
                        e = null;
                    return "horizontal" === g.settings.mode && 0 < g.settings.slideWidth ? t = g.viewport.width() < g.minThreshold ? g.settings.minSlides : g.viewport.width() > g.maxThreshold ? g.settings.maxSlides : (e = g.children.first().width() + g.settings.slideMargin, Math.floor((g.viewport.width() + g.settings.slideMargin) / e) || 1) : "vertical" === g.settings.mode && (t = g.settings.minSlides), t
                },
                h = function () {
                    var t = 0,
                        e = 0,
                        i = 0;
                    if (0 < g.settings.moveSlides) {
                        if (!g.settings.infiniteLoop) {
                            for (; e < g.children.length;) ++t, e = i + c(), i += g.settings.moveSlides <= c() ? g.settings.moveSlides : c();
                            return i
                        }
                        t = Math.ceil(g.children.length / v())
                    } else t = Math.ceil(g.children.length / c());
                    return t
                },
                v = function () {
                    return 0 < g.settings.moveSlides && g.settings.moveSlides <= c() ? g.settings.moveSlides : c()
                },
                f = function () {
                    var t, e, i;
                    g.children.length > g.settings.maxSlides && g.active.last && !g.settings.infiniteLoop ? "horizontal" === g.settings.mode ? (t = (e = g.children.last()).position(), x(-(t.left - (g.viewport.width() - e.outerWidth())), "reset", 0)) : "vertical" === g.settings.mode && (i = g.children.length - g.settings.minSlides, t = g.children.eq(i).position(), x(-t.top, "reset", 0)) : (t = g.children.eq(g.active.index * v()).position(), g.active.index === h() - 1 && (g.active.last = !0), void 0 !== t && ("horizontal" === g.settings.mode ? x(-t.left, "reset", 0) : "vertical" === g.settings.mode && x(-t.top, "reset", 0)))
                },
                x = function (t, e, i, n) {
                    var s, o;
                    g.usingCSS ? (o = "vertical" === g.settings.mode ? "translate3d(0, " + t + "px, 0)" : "translate3d(" + t + "px, 0, 0)", p.css("-" + g.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" === e ? (p.css(g.animProp, o), 0 !== i ? p.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function (t) {
                        Z(t.target).is(p) && (p.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), I())
                    }) : I()) : "reset" === e ? p.css(g.animProp, o) : "ticker" === e && (p.css("-" + g.cssPrefix + "-transition-timing-function", "linear"), p.css(g.animProp, o), 0 !== i ? p.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function (t) {
                        Z(t.target).is(p) && (p.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), x(n.resetValue, "reset", 0), L())
                    }) : (x(n.resetValue, "reset", 0), L()))) : ((s = {})[g.animProp] = t, "slide" === e ? p.animate(s, i, g.settings.easing, function () {
                        I()
                    }) : "reset" === e ? p.css(g.animProp, t) : "ticker" === e && p.animate(s, i, "linear", function () {
                        x(n.resetValue, "reset", 0), L()
                    }))
                },
                m = function () {
                    for (var t = "", e = "", i = h(), n = 0; n < i; n++) e = "", g.settings.buildPager && Z.isFunction(g.settings.buildPager) || g.settings.pagerCustom ? (e = g.settings.buildPager(n), g.pagerEl.addClass("bx-custom-pager")) : (e = n + 1, g.pagerEl.addClass("bx-default-pager")), t += '<div class="bx-pager-item"><a href="" data-slide-index="' + n + '" class="bx-pager-link">' + e + "</a></div>";
                    g.pagerEl.html(t)
                },
                S = function () {
                    g.settings.pagerCustom ? g.pagerEl = Z(g.settings.pagerCustom) : (g.pagerEl = Z('<div class="bx-pager" />'), g.settings.pagerSelector ? Z(g.settings.pagerSelector).html(g.pagerEl) : g.controls.el.addClass("bx-has-pager").append(g.pagerEl), m()), g.pagerEl.on("click touchend", "a", M)
                },
                w = function () {
                    g.controls.next = Z('<a class="bx-next" href="">' + g.settings.nextText + "</a>"), g.controls.prev = Z('<a class="bx-prev" href="">' + g.settings.prevText + "</a>"), g.controls.next.on("click touchend", T), g.controls.prev.on("click touchend", k), g.settings.nextSelector && Z(g.settings.nextSelector).append(g.controls.next), g.settings.prevSelector && Z(g.settings.prevSelector).append(g.controls.prev), g.settings.nextSelector || g.settings.prevSelector || (g.controls.directionEl = Z('<div class="bx-controls-direction" />'), g.controls.directionEl.append(g.controls.prev).append(g.controls.next), g.controls.el.addClass("bx-has-controls-direction").append(g.controls.directionEl))
                },
                b = function () {
                    g.controls.start = Z('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + g.settings.startText + "</a></div>"), g.controls.stop = Z('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + g.settings.stopText + "</a></div>"), g.controls.autoEl = Z('<div class="bx-controls-auto" />'), g.controls.autoEl.on("click", ".bx-start", P), g.controls.autoEl.on("click", ".bx-stop", E), g.settings.autoControlsCombine ? g.controls.autoEl.append(g.controls.start) : g.controls.autoEl.append(g.controls.start).append(g.controls.stop), g.settings.autoControlsSelector ? Z(g.settings.autoControlsSelector).html(g.controls.autoEl) : g.controls.el.addClass("bx-has-controls-auto").append(g.controls.autoEl), z(g.settings.autoStart ? "stop" : "start")
                },
                C = function () {
                    g.children.each(function (t) {
                        var e = Z(this).find("img:first").attr("title");
                        void 0 !== e && ("" + e).length && Z(this).append('<div class="bx-caption"><span>' + e + "</span></div>")
                    })
                },
                T = function (t) {
                    t.preventDefault(), g.controls.el.hasClass("disabled") || (g.settings.auto && g.settings.stopAutoOnClick && p.stopAuto(), p.goToNextSlide())
                },
                k = function (t) {
                    t.preventDefault(), g.controls.el.hasClass("disabled") || (g.settings.auto && g.settings.stopAutoOnClick && p.stopAuto(), p.goToPrevSlide())
                },
                P = function (t) {
                    p.startAuto(), t.preventDefault()
                },
                E = function (t) {
                    p.stopAuto(), t.preventDefault()
                },
                M = function (t) {
                    var e, i;
                    t.preventDefault(), g.controls.el.hasClass("disabled") || (g.settings.auto && g.settings.stopAutoOnClick && p.stopAuto(), void 0 !== (e = Z(t.currentTarget)).attr("data-slide-index") && (i = parseInt(e.attr("data-slide-index"))) !== g.active.index && p.goToSlide(i))
                },
                y = function (i) {
                    var t = g.children.length;
                    if ("short" === g.settings.pagerType) return 1 < g.settings.maxSlides && (t = Math.ceil(g.children.length / g.settings.maxSlides)), void g.pagerEl.html(i + 1 + g.settings.pagerShortSeparator + t);
                    g.pagerEl.find("a").removeClass("active"), g.pagerEl.each(function (t, e) {
                        Z(e).find("a").eq(i).addClass("active")
                    })
                },
                I = function () {
                    if (g.settings.infiniteLoop) {
                        var t = "";
                        0 === g.active.index ? t = g.children.eq(0).position() : g.active.index === h() - 1 && g.carousel ? t = g.children.eq((h() - 1) * v()).position() : g.active.index === g.children.length - 1 && (t = g.children.eq(g.children.length - 1).position()), t && ("horizontal" === g.settings.mode ? x(-t.left, "reset", 0) : "vertical" === g.settings.mode && x(-t.top, "reset", 0))
                    }
                    g.working = !1, g.settings.onSlideAfter.call(p, g.children.eq(g.active.index), g.oldIndex, g.active.index)
                },
                z = function (t) {
                    g.settings.autoControlsCombine ? g.controls.autoEl.html(g.controls[t]) : (g.controls.autoEl.find("a").removeClass("active"), g.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active"))
                },
                A = function () {
                    1 === h() ? (g.controls.prev.addClass("disabled"), g.controls.next.addClass("disabled")) : !g.settings.infiniteLoop && g.settings.hideControlOnEnd && (0 === g.active.index ? (g.controls.prev.addClass("disabled"), g.controls.next.removeClass("disabled")) : g.active.index === h() - 1 ? (g.controls.next.addClass("disabled"), g.controls.prev.removeClass("disabled")) : (g.controls.prev.removeClass("disabled"), g.controls.next.removeClass("disabled")))
                },
                D = function () {
                    p.startAuto()
                },
                q = function () {
                    p.stopAuto()
                },
                H = function () {
                    0 < g.settings.autoDelay ? setTimeout(p.startAuto, g.settings.autoDelay) : (p.startAuto(), Z(window).focus(D).blur(q)), g.settings.autoHover && p.hover(function () {
                        g.interval && (p.stopAuto(!0), g.autoPaused = !0)
                    }, function () {
                        g.autoPaused && (p.startAuto(!0), g.autoPaused = null)
                    })
                },
                W = function () {
                    var t, e, i, n, s, o, r, a, l = 0;
                    "next" === g.settings.autoDirection ? p.append(g.children.clone().addClass("bx-clone")) : (p.prepend(g.children.clone().addClass("bx-clone")), t = g.children.first().position(), l = "horizontal" === g.settings.mode ? -t.left : -t.top), x(l, "reset", 0), g.settings.pager = !1, g.settings.controls = !1, g.settings.autoControls = !1, g.settings.tickerHover && (g.usingCSS ? (n = "horizontal" === g.settings.mode ? 4 : 5, g.viewport.hover(function () {
                        e = p.css("-" + g.cssPrefix + "-transform"), i = parseFloat(e.split(",")[n]), x(i, "reset", 0)
                    }, function () {
                        a = 0, g.children.each(function (t) {
                            a += "horizontal" === g.settings.mode ? Z(this).outerWidth(!0) : Z(this).outerHeight(!0)
                        }), s = g.settings.speed / a, o = "horizontal" === g.settings.mode ? "left" : "top", r = s * (a - Math.abs(parseInt(i))), L(r)
                    })) : g.viewport.hover(function () {
                        p.stop()
                    }, function () {
                        a = 0, g.children.each(function (t) {
                            a += "horizontal" === g.settings.mode ? Z(this).outerWidth(!0) : Z(this).outerHeight(!0)
                        }), s = g.settings.speed / a, o = "horizontal" === g.settings.mode ? "left" : "top", r = s * (a - Math.abs(parseInt(p.css(o)))), L(r)
                    })), L()
                },
                L = function (t) {
                    var e, i, n = t || g.settings.speed,
                        s = {
                            left: 0,
                            top: 0
                        },
                        o = {
                            left: 0,
                            top: 0
                        };
                    "next" === g.settings.autoDirection ? s = p.find(".bx-clone").first().position() : o = g.children.first().position(), e = "horizontal" === g.settings.mode ? -s.left : -s.top, i = "horizontal" === g.settings.mode ? -o.left : -o.top, x(e, "ticker", n, {
                        resetValue: i
                    })
                },
                O = function (t) {
                    var e, i, n, s, o = document.activeElement.tagName.toLowerCase();
                    if (null == new RegExp(o, ["i"]).exec("input|textarea") && (e = p, i = Z(window), n = {
                            top: i.scrollTop(),
                            left: i.scrollLeft()
                        }, s = e.offset(), n.right = n.left + i.width(), n.bottom = n.top + i.height(), s.right = s.left + e.outerWidth(), s.bottom = s.top + e.outerHeight(), !(n.right < s.left || n.left > s.right || n.bottom < s.top || n.top > s.bottom))) {
                        if (39 === t.keyCode) return T(t), !1;
                        if (37 === t.keyCode) return k(t), !1
                    }
                },
                F = function () {
                    g.touch = {
                        start: {
                            x: 0,
                            y: 0
                        },
                        end: {
                            x: 0,
                            y: 0
                        }
                    }, g.viewport.on("touchstart MSPointerDown pointerdown", N), g.viewport.on("click", ".bxslider a", function (t) {
                        g.viewport.hasClass("click-disabled") && (t.preventDefault(), g.viewport.removeClass("click-disabled"))
                    })
                },
                N = function (t) {
                    if ("touchstart" === t.type || 0 === t.button)
                        if (t.preventDefault(), g.controls.el.addClass("disabled"), g.working) g.controls.el.removeClass("disabled");
                        else {
                            g.touch.originalPos = p.position();
                            var e = t.originalEvent,
                                i = void 0 !== e.changedTouches ? e.changedTouches : [e];
                            if ("function" == typeof PointerEvent && void 0 === e.pointerId) return;
                            g.touch.start.x = i[0].pageX, g.touch.start.y = i[0].pageY, g.viewport.get(0).setPointerCapture && (g.pointerId = e.pointerId, g.viewport.get(0).setPointerCapture(g.pointerId)), g.originalClickTarget = e.originalTarget || e.target, g.originalClickButton = e.button, g.originalClickButtons = e.buttons, g.originalEventType = e.type, g.hasMove = !1, g.viewport.on("touchmove MSPointerMove pointermove", X), g.viewport.on("touchend MSPointerUp pointerup", Y), g.viewport.on("MSPointerCancel pointercancel", B)
                        }
                },
                B = function (t) {
                    t.preventDefault(), x(g.touch.originalPos.left, "reset", 0), g.controls.el.removeClass("disabled"), g.viewport.off("MSPointerCancel pointercancel", B), g.viewport.off("touchmove MSPointerMove pointermove", X), g.viewport.off("touchend MSPointerUp pointerup", Y), g.viewport.get(0).releasePointerCapture && g.viewport.get(0).releasePointerCapture(g.pointerId)
                },
                X = function (t) {
                    var e = t.originalEvent,
                        i = void 0 !== e.changedTouches ? e.changedTouches : [e],
                        n = Math.abs(i[0].pageX - g.touch.start.x),
                        s = Math.abs(i[0].pageY - g.touch.start.y),
                        o = 0,
                        r = 0;
                    g.hasMove = !0, s < 3 * n && g.settings.preventDefaultSwipeX ? t.preventDefault() : n < 3 * s && g.settings.preventDefaultSwipeY && t.preventDefault(), "touchmove" !== t.type && t.preventDefault(), "fade" !== g.settings.mode && g.settings.oneToOneTouch && (o = "horizontal" === g.settings.mode ? (r = i[0].pageX - g.touch.start.x, g.touch.originalPos.left + r) : (r = i[0].pageY - g.touch.start.y, g.touch.originalPos.top + r), x(o, "reset", 0))
                },
                Y = function (t) {
                    t.preventDefault(), g.viewport.off("touchmove MSPointerMove pointermove", X), g.controls.el.removeClass("disabled");
                    var e = t.originalEvent,
                        i = void 0 !== e.changedTouches ? e.changedTouches : [e],
                        n = 0,
                        s = 0;
                    g.touch.end.x = i[0].pageX, g.touch.end.y = i[0].pageY, "fade" === g.settings.mode ? (s = Math.abs(g.touch.start.x - g.touch.end.x)) >= g.settings.swipeThreshold && (g.touch.start.x > g.touch.end.x ? p.goToNextSlide() : p.goToPrevSlide(), p.stopAuto()) : (n = "horizontal" === g.settings.mode ? (s = g.touch.end.x - g.touch.start.x, g.touch.originalPos.left) : (s = g.touch.end.y - g.touch.start.y, g.touch.originalPos.top), !g.settings.infiniteLoop && (0 === g.active.index && 0 < s || g.active.last && s < 0) ? x(n, "reset", 200) : Math.abs(s) >= g.settings.swipeThreshold ? (s < 0 ? p.goToNextSlide() : p.goToPrevSlide(), p.stopAuto()) : x(n, "reset", 200)), g.viewport.off("touchend MSPointerUp pointerup", Y), g.viewport.get(0).releasePointerCapture && g.viewport.get(0).releasePointerCapture(g.pointerId), !1 !== g.hasMove || 0 !== g.originalClickButton && "touchstart" !== g.originalEventType || Z(g.originalClickTarget).trigger({
                        type: "click",
                        button: g.originalClickButton,
                        buttons: g.originalClickButtons
                    })
                },
                V = function (t) {
                    if (g.initialized)
                        if (g.working) window.setTimeout(V, 10);
                        else {
                            var e = Z(window).width(),
                                i = Z(window).height();
                            n === e && s === i || (n = e, s = i, p.redrawSlider(), g.settings.onSliderResize.call(p, g.active.index))
                        }
                },
                R = function (t) {
                    var e = c();
                    g.settings.ariaHidden && !g.settings.ticker && (g.children.attr("aria-hidden", "true"), g.children.slice(t, t + e).attr("aria-hidden", "false"))
                };
            return p.goToSlide = function (t, e) {
                var i, n, s, o, r, a = !0,
                    l = 0,
                    d = {
                        left: 0,
                        top: 0
                    },
                    c = null;
                if (g.oldIndex = g.active.index, g.active.index = (r = t) < 0 ? g.settings.infiniteLoop ? h() - 1 : g.active.index : r >= h() ? g.settings.infiniteLoop ? 0 : g.active.index : r, !g.working && g.active.index !== g.oldIndex) {
                    if (g.working = !0, void 0 !== (a = g.settings.onSlideBefore.call(p, g.children.eq(g.active.index), g.oldIndex, g.active.index)) && !a) return g.active.index = g.oldIndex, void(g.working = !1);
                    "next" === e ? g.settings.onSlideNext.call(p, g.children.eq(g.active.index), g.oldIndex, g.active.index) || (a = !1) : "prev" === e && (g.settings.onSlidePrev.call(p, g.children.eq(g.active.index), g.oldIndex, g.active.index) || (a = !1)), g.active.last = g.active.index >= h() - 1, (g.settings.pager || g.settings.pagerCustom) && y(g.active.index), g.settings.controls && A(), "fade" === g.settings.mode ? (g.settings.adaptiveHeight && g.viewport.height() !== u() && g.viewport.animate({
                        height: u()
                    }, g.settings.adaptiveHeightSpeed), g.children.filter(":visible").fadeOut(g.settings.speed).css({
                        zIndex: 0
                    }), g.children.eq(g.active.index).css("zIndex", g.settings.slideZIndex + 1).fadeIn(g.settings.speed, function () {
                        Z(this).css("zIndex", g.settings.slideZIndex), I()
                    })) : (g.settings.adaptiveHeight && g.viewport.height() !== u() && g.viewport.animate({
                        height: u()
                    }, g.settings.adaptiveHeightSpeed), !g.settings.infiniteLoop && g.carousel && g.active.last ? "horizontal" === g.settings.mode ? (d = (c = g.children.eq(g.children.length - 1)).position(), l = g.viewport.width() - c.outerWidth()) : (i = g.children.length - g.settings.minSlides, d = g.children.eq(i).position()) : g.carousel && g.active.last && "prev" === e ? (n = 1 === g.settings.moveSlides ? g.settings.maxSlides - v() : (h() - 1) * v() - (g.children.length - g.settings.maxSlides), d = (c = p.children(".bx-clone").eq(n)).position()) : "next" === e && 0 === g.active.index ? (d = p.find("> .bx-clone").eq(g.settings.maxSlides).position(), g.active.last = !1) : 0 <= t && (o = t * parseInt(v()), d = g.children.eq(o).position()), void 0 !== d && (s = "horizontal" === g.settings.mode ? -(d.left - l) : -d.top, x(s, "slide", g.settings.speed)), g.working = !1), g.settings.ariaHidden && R(g.active.index * v())
                }
            }, p.goToNextSlide = function () {
                if ((g.settings.infiniteLoop || !g.active.last) && !0 !== g.working) {
                    var t = parseInt(g.active.index) + 1;
                    p.goToSlide(t, "next")
                }
            }, p.goToPrevSlide = function () {
                if ((g.settings.infiniteLoop || 0 !== g.active.index) && !0 !== g.working) {
                    var t = parseInt(g.active.index) - 1;
                    p.goToSlide(t, "prev")
                }
            }, p.startAuto = function (t) {
                g.interval || (g.interval = setInterval(function () {
                    "next" === g.settings.autoDirection ? p.goToNextSlide() : p.goToPrevSlide()
                }, g.settings.pause), g.settings.onAutoChange.call(p, !0), g.settings.autoControls && !0 !== t && z("stop"))
            }, p.stopAuto = function (t) {
                g.autoPaused && (g.autoPaused = !1), g.interval && (clearInterval(g.interval), g.interval = null, g.settings.onAutoChange.call(p, !1), g.settings.autoControls && !0 !== t && z("start"))
            }, p.getCurrentSlide = function () {
                return g.active.index
            }, p.getCurrentSlideElement = function () {
                return g.children.eq(g.active.index)
            }, p.getSlideElement = function (t) {
                return g.children.eq(t)
            }, p.getSlideCount = function () {
                return g.children.length
            }, p.isWorking = function () {
                return g.working
            }, p.redrawSlider = function () {
                g.children.add(p.find(".bx-clone")).outerWidth(d()), g.viewport.css("height", u()), g.settings.ticker || f(), g.active.last && (g.active.index = h() - 1), g.active.index >= h() && (g.active.last = !0), g.settings.pager && !g.settings.pagerCustom && (m(), y(g.active.index)), g.settings.ariaHidden && R(g.active.index * v())
            }, p.destroySlider = function () {
                g.initialized && (g.initialized = !1, Z(".bx-clone", this).remove(), g.children.each(function () {
                    void 0 !== Z(this).data("origStyle") ? Z(this).attr("style", Z(this).data("origStyle")) : Z(this).removeAttr("style")
                }), void 0 !== Z(this).data("origStyle") ? this.attr("style", Z(this).data("origStyle")) : Z(this).removeAttr("style"), Z(this).unwrap().unwrap(), g.controls.el && g.controls.el.remove(), g.controls.next && g.controls.next.remove(), g.controls.prev && g.controls.prev.remove(), g.pagerEl && g.settings.controls && !g.settings.pagerCustom && g.pagerEl.remove(), Z(".bx-caption", this).remove(), g.controls.autoEl && g.controls.autoEl.remove(), clearInterval(g.interval), g.settings.responsive && Z(window).off("resize", V), g.settings.keyboardEnabled && Z(document).off("keydown", O), Z(this).removeData("bxSlider"), Z(window).off("blur", q).off("focus", D))
            }, p.reloadSlider = function (t) {
                void 0 !== t && (e = t), p.destroySlider(), o(), Z(p).data("bxSlider", this)
            }, o(), Z(p).data("bxSlider", this), this
        }
    }
}(jQuery);

function moFormInteraction() {
    $(".input_text").focus(function () {
        $(this).addClass("it_focus").prev().addClass("qfl_has_value qfl_focus")
    }), $(".input_text").focusout(function () {
        $(this).val() ? $(this).removeClass("it_focus").prev().removeClass("qfl_focus") : $(this).removeClass("it_focus").prev().removeClass("qfl_has_value qfl_focus")
    })
}
$(document).ready(function () {
    localStorage.getItem("state");
    var e = "",
        i = "",
        t = $(".pjItem");
    $("#sliderAbout").bxSlider({
        infiniteLoop: 0,
        pager: 0,
        controls: 0,
        minSlides: 1,
        maxSlides: 10,
        slideWidth: 400,
        shrinkItems: 1
    }), $(".pjItem").each(function () {
        t.sort(function (t, e) {
            var i = parseInt(t.getAttribute("data-hit")),
                o = parseInt(e.getAttribute("data-hit"));
            return o < i ? 1 : i < o ? -1 : 0
        }), $(".pjWrap").html(t)
    }), $("#projects_sort").on("change", function () {
        var n = $(this).val();
        t.sort(function (t, e) {
            var i = parseInt(t.getAttribute("data-" + n)),
                o = parseInt(e.getAttribute("data-" + n));
            return o < i ? 1 : i < o ? -1 : 0
        }), $(".pjWrap").html(t)
    }), $(document).on("submit", ".form", function (t) {
        t.preventDefault()
    }), $(".btn").on("click", function () {
        var t = $(this).data("type");
        "order" == t && (i = e = "Заказать обратный звонок"), "getPrice" == t && (i = e = "Получить прайс на услуги"), "drying" == t && (i = e = "Оставить заявку на сушку"), "beam" == t && (e = $(this).data("title"), i = e), "project" == t && (e = $(this).data("title"), i = "Страница " + e), "cut" == t && (i = e = "Оставить заявку на нарезку чаш по проекту"), "saw" == t && (i = e = "Оставить заявку на строжку"), "molded" == t && (i = e = "Получить прайс на погонажные изделия"), "propil" == t && (i = e = "Оставить заявку на нарезку пропилов")
    });
    $(".ajax_form").fancybox({
        width: 530,
        minWidth: 500,
        height: 600,
        autoSize: !1,
        closeClick: !1,
        openEffect: "fade",
        closeEffect: "fade",
        openSpeed: 200,
        closeSpeed: 50,
        padding: 0,
        closeBtn: 1,
        wrapCSS: "form_theme",
        overlay: {
            closeClick: !0
        },
        afterShow: function () {
            $(".form__title").html(e), $("#form_sub").val(i)
        }
    })
}), $(".sliderProjects").bxSlider({
    slideWidth: 320,
    minSlides: 1,
    maxSlides: 3,
    easing: "ease",
    responsive: !0,
    adaptiveHeight: !0,
    prevSelector: "#pNavL",
    nextSelector: "#pNavR",
    nextText: "&nbsp;",
    prevText: "&nbsp;",
    pager: !0,
    infiniteLoop: !1
}), $(document).ready(function () {
    var t = $("#hPhotos").bxSlider({
        pagerCustom: "#hPager",
        infiniteLoop: !1,
        adaptiveHeight: !0,
        touchEnabled: !0,
        responsive: !0,
        controls: 0
    });
    $("#hp-next").click(function () {
        t.goToNextSlide()
    }), $("#hp-prev").click(function () {
        t.goToPrevSlide()
    })
}), $("#tb_slides").bxSlider({
    pager: !1,
    controls: !1,
    speed: 1500,
    randomStart: !0,
    auto: !0,
    mode: "fade",
    pause: 6e3
}), moFormInteraction();
var formSub = "Заявка на обратный звонок";

function moFocusError() {
    $("input.f_error").focus(function () {
        $(this).removeClass("f_error").prev().removeClass("f_error")
    })
}

function moProjecTabs() {
    $("#prj_desc").click(function (t) {
        t.preventDefault(), $(".prj_tab_item").hide(), $(".prj_calc").removeClass("active"), $(this).addClass("active"), $("#prj_desc_cont").fadeIn(200)
    }), $("#prj_calc").click(function (t) {
        t.preventDefault(), $(".prj_tab_item").hide(), $(".prj_desc").removeClass("active"), $(this).addClass("active"), $("#prj_calc_cont").fadeIn(200)
    })
}

function print_doc() {
    window.print()
}

function number_format(t, e, i, o) {
    t = (t + "").replace(/[^0-9+\-Ee.]/g, "");
    var n, a, s, r = isFinite(+t) ? +t : 0,
        c = isFinite(+e) ? Math.abs(e) : 0,
        l = void 0 === o ? " " : o,
        d = void 0 === i ? "." : i,
        u = "";
    return 3 < (u = (c ? (n = r, a = c, s = Math.pow(10, a), "" + (Math.round(n * s) / s).toFixed(a)) : "" + Math.round(r)).split("."))[0].length && (u[0] = u[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, l)), (u[1] || "").length < c && (u[1] = u[1] || "", u[1] += new Array(c - u[1].length + 1).join("0")), u.join(d)
}

function moCalc() {
    var t = 0;
    $(".opt_checked").removeClass("opt_checked"), $("#calc_box input:checked").each(function () {
        t += parseInt($(this).val()), $(this).parent().addClass("opt_checked")
    }), $("#total_cost_price").text(number_format(t))
}

function tbSlideHight() {
    var t = $(".topImageBox").height();
    $(".tb_slide").height(t), $(".topImageBox__layer").height(t)
}
$(".ajax_form").click(function () {
    formSub = $(this).attr("sub")
}), $.fn.ajax_form_pp = function () {
    $(this).submit(function () {
        var t = $(this).serialize();
        return $.ajax({
            type: "POST",
            url: "assets/php/handler.php",
            data: t,
            success: function (t) {
                "OK" == t ? (result = '<div class="notification_ok"><h2>Спасибо!</h2>Запрос отправлен</div>', $("#transfer_pp").hide(), setTimeout(function () {
                    $.fancybox.close()
                }, 1500)) : result = t, $("#transfer_note_pp").html(result)
            }
        }), !1
    })
}, $.fn.ajax_form_page = function () {
    $(this).submit(function () {
        var t = $(this).serialize();
        return $.ajax({
            type: "POST",
            url: "assets/php/handler.php",
            data: t,
            success: function (t) {
                "OK" == t ? (result = '<div class="notification_ok"><h2>Спасибо!</h2>Запрос отправлен</div>', $("#transfer_page").hide(), setTimeout(function () {
                    $.fancybox.close()
                }, 1500)) : result = t, $("#transfer_note_page").html(result)
            }
        }), !1
    })
}, $("#transfer_page").ajax_form_page(), $("#calc_box input").click(function () {
    moCalc()
}), $(document).ready(function () {
    var t = $(".homeActions").bxSlider({
        mode: "horizontal",
        speed: 200,
        randomStart: !0,
        responsive: !0,
        adaptiveHeight: !1,
        prevSelector: "#aNavL",
        nextSelector: "#aNavR",
        nextText: "&nbsp;",
        prevText: "&nbsp;",
        pager: !0,
        oneToOneTouch: 1,
        swipeThreshold: 500,
        infiniteLoop: !1
    });
    $("#aNavR").click(function () {
        t.goToNextSlide()
    }), $("#aNavL").click(function () {
        t.goToPrevSlide()
    }), $(".ai-desc, .ai-lttl, .ai-ttl").click(function () {
        this.click()
    })
}), $(window).resize(function () {
    tbSlideHight()
}), tbSlideHight()


$(document).on('click', '.js-modal-call', function (e) {
    e.preventDefault();
    var modal = $(this).data('modal');

    $('#modal-' + modal)
        .css("display", "flex")
        .hide()
        .fadeIn(400);
    $('html body').css('overflow', 'hidden');
})

$(document).on('click', '.js-modal-close', function (e) {
    var modal = $(this).data('modal');

    $('#modal-' + modal).fadeOut();
    $('html body').css('overflow', 'initial');
})

$(document).on('submit', '.js-form-sender', function (e) {
    e.preventDefault();
    var $form = $(this);

    $.ajax({
            method: "POST",
            url: "/assets/php/handler.php",
            data: $form.serialize()
        })
        .done(function (res) {
            var res = JSON.parse(res);

            if (res.error) {
                for (var key in res.inputs) {
                    var el = $form.find('[name="' + res.inputs[key] + '"]');
                    $(el).addClass('is--error');
                    $(el).parent().find('.input-group__error').html('Заполните номер телефона').fadeIn();
                }

                setTimeout(function () {
                    $form.find('.is--error').removeClass('is--error');
                    $form.find('.input-group__error').html('').fadeOut();
                }, 2000);
            } else {
                $('.modal').fadeOut();
                $form[0].reset();
                $('#modal-thank')
                    .css("display", "flex")
                    .hide()
                    .fadeIn(400);

                setTimeout(function () {
                    $('#modal-thank').fadeOut();
                }, 2000);
            }

        });
})

$(document).on("click", ".js-anchor", function (e) {
    let anchor = $(this).data('id');
    e.preventDefault();
    $('html,body').animate({
        scrollTop: $("#" + anchor).offset().top - 100
    }, 1000);
});

$(document).on('click', '.modal-overlay', function () {
    $(this).parent().fadeOut();
    $('html body').css('overflow', 'initial');
})

$(document).on('ready', function () {


    $(document).on('click', '.js-employes-sort', function () {
        var city = $(this).data('city');

        if (city == 'all') {
            $('.js-employes-card').show();
            $('.js-employes-section').fadeIn();
        } else {
            $('.js-employes-section').each(function (i, e) {
                let isCards = $(e).find('.js-employes-card').filter(function (i, e) {
                    if ($(e).data("city") == city) return true;
                });
                (!isCards.length) ? $(e).fadeOut(): $(e).fadeIn();
            })
            $('.js-employes-card').hide();
            $('.js-employes-card[data-city=' + city + ']').show();
        }

    })



    var keyCode;

    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function (a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    $(document).on('input', '.js-phone-mask', mask);
    $(document).on('focus', '.js-phone-mask', mask);
    $(document).on('blur', '.js-phone-mask', mask);
    $(document).on('keydown', '.js-phone-mask', mask);

    $(document).ready(function () {
        $('#imageGallery').lightSlider({
            gallery: true,
            item: 1,
            loop: false,
            thumbItem: 9,
            slideMargin: 0,
            enableDrag: false,
            currentPagerPosition: 'left'
        });
    });

    var sliderPopularProjects = $('.js-slider-popular').lightSlider({
        item: 2,
        slideMove: 1,
        loop: true,
        pager: true,
        slideMargin: 40,
        controls: true,
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        speed: 600,
        responsive: [{
                breakpoint: 768,
                settings: {
                    item: 2,
                    slideMove: 1,
                    slideMargin: 6,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    item: 1,
                    slideMove: 1
                }
            }
        ]
    });

    var sliderStock = $('.js-slider-stock').lightSlider({
        item: 1,
        slideMove: 1,
        loop: true,
        pager: true,
        slideMargin: 40,
        controls: false,
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        speed: 600,
        responsive: [{
                breakpoint: 768,
                settings: {
                    item: 2,
                    slideMove: 1,
                    slideMargin: 6,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    item: 1,
                    slideMove: 1
                }
            }
        ]
    });

    $(document).on('click', '.js-stock-left', function () {
        sliderStock.goToPrevSlide();
    })
    $(document).on('click', '.js-stock-right', function () {
        sliderStock.goToNextSlide();
    })

    var sliderDetailProject = $('.js-project-detail').lightSlider({
        item: 1,
        slideMove: 1,
        loop: true,
        pager: true,
        slideMargin: 0,
        controls: false,
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        speed: 600,
    });

    $(document).on('click', '.js-project-detail-zoom', function () {
        $('.js-project-detail-slide.active').find('.js-gallery-popup').trigger('click');
    })

    $(document).on('click', '.js-project-detail-left', function () {
        sliderDetailProject.goToPrevSlide();
    })
    $(document).on('click', '.js-project-detail-right', function () {
        sliderDetailProject.goToNextSlide();
    })

    if ($(document).width() > 768) {
        $('.js-slider-project-info').bxSlider({
            minSlides: 1,
            maxSlides: 3,
            easing: 'ease',
            responsive: true,
            prevSelector: '.js-slider-control-prev',
            nextSelector: '.js-slider-control-next',
            nextText: '&nbsp;',
            prevText: '&nbsp;',
            pager: true
        });
    }

    /* */
    if ($(document).width() < 960) {
        $(document).on('click', '.js-header-menu-item', function () {
            let $submenu = $(this).find('.js-header-submenu');
            $submenu.slideToggle();
            $(this).toggleClass('is-active');
        })
    } else {
        $(".tmFolder").hover(function () {
            $(this).find(".tmHideMenu").stop(!1).slideDown(200)
        });
        $(".tmFolder").mouseleave(function () {
            $(this).find(".tmHideMenu").stop(!1).slideUp(200)
        });
    }

    $('.js-gallery-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        callbacks: {
            beforeOpen: function () {
                $(this.contentContainer).addClass('fixImages')
            }
        }
    })

    $('.js-plans-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
    })

    $('.js-done-projects-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        callbacks: {
            beforeOpen: function () {
                $(this.contentContainer).addClass('fixImages')
            }
        }
    })

    // var sliderProjectInfo = $('.js-slider-project-info').lightSlider({
    //     item: 1,
    //     slideMove: 1,
    //     loop: true,
    //     pager: false,
    //     slideMargin: 0,
    //     controls: true,
    //     easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    //     speed:600,
    //     enableTouch: false,
    //     enableDrag: false
    // });
})