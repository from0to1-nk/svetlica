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
    var s = 0,
        n = 0,
        i = 0,
        r = 0,
        a = 0,
        c = 0,
        e = "Что-то не выбрано",
        o = ".form__count",
        l = localStorage.getItem("state"),
        u = "",
        d = "",
        f = 0,
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
            var o = parseInt(t.getAttribute("data-hit")),
                a = parseInt(e.getAttribute("data-hit"));
            return a < o ? 1 : o < a ? -1 : 0
        }), $(".pjWrap").html(t)
    }), $("#projects_sort").on("change", function () {
        var s = $(this).val();
        t.sort(function (t, e) {
            var o = parseInt(t.getAttribute("data-" + s)),
                a = parseInt(e.getAttribute("data-" + s));
            return a < o ? 1 : o < a ? -1 : 0
        }), $(".pjWrap").html(t)
    }), check_state_form = function () {
        null === l ? ($(".form__block_contacts").fadeIn(), $(".form__block_contacts").removeClass("hide"), $(".btn_count").attr("type", "submit")) : ($(".form__block_contacts").addClass("hide"), $(".btn_count").attr("type", "button"), $(".politic_calc").prev().css("display", "none"))
    }, check_state_form(), setTimeout(function () {
        localStorage.clear(), check_state_form()
    }, 9e5);
    var _ = function (t, e, o) {
            $(".form__message .form__icon").removeClass().addClass("form__icon"), $(".form__message .form__text").removeClass().addClass("form__text"), $(".form__message").addClass("active"), $(".form__message .form__icon").addClass(t + "-solid"), $(".form__message .form__text").addClass("form__text_" + e).text(o), setTimeout(function () {
                $(".form__message").removeClass("active")
            }, 3e3)
        },
        m = function (t) {
            $(o + "[name=" + t + "]").next().children().first().addClass("form__error")
        },
        h = function (t) {
            $(o + "[name=" + t + "]").next().children().first().removeClass("form__error")
        },
        p = function (t) {
            "house" == t && (0 === s ? m("foundation") : h("foundation"), 0 === n ? m("set") : h("set"), 0 === i ? m("thickness") : h("thickness"), 0 === r ? m("floors") : h("floors")), "beam" == t && (0 === c ? m("cut") : h("cut")), 0 === a ? $(o + "_square[name=square]").addClass("form__error") : $(o + "_square[name=square]").removeClass("form__error")
        },
        v = function (t) {
            if ("house" == t) {
                if (0 !== s && 0 !== n && 0 !== r && 0 !== a && 0 !== i) return p(t), !0;
                p(t), _("sad", "error", e)
            }
            if ("beam" == t) {
                if (0 !== c && 0 !== a) return p(t), !0;
                p(t), _("sad", "error", e)
            }
        };
    $(".tel").mask("+7(999) 999-99-99"), $(document).on("click", ".form__count", function () {
        var t, e, o, a = $(this).attr("id");
        t = a, e = $("#" + t).data("count"), "set" == (o = $("#" + t).attr("name")) && (n = e), "foundation" == o && (s = e), "thickness" == o && (i = e), "floors" == o && (r = e), "cut" == o && (c = e)
    }), $(document).on("change", ".form__count_square", function () {
        0 === $(this).val() && p(), a = $(this).val()
    }), $(document).on("change", "[name=set]", function () {
        var t = $(this).attr("id");
        "set-1" == t && ($("#thickness-1").val("185х205").attr("data-count", 22e3), $("#thickness-2").val("185х164").attr("data-count", 22500), $("#thickness-3").val("185х123").attr("data-count", 23e3), $(".js-tLabel_1").text("185х205"), $(".js-tLabel_2").text("185х164"), $(".js-tLabel_3").text("185х123")), "set-2" == t && ($("#thickness-1").val("190х190").attr("data-count", 25e3), $("#thickness-2").val("140х190").attr("data-count", 18500), $("#thickness-3").val("140х140").attr("data-count", 13600), $(".js-tLabel_1").text("190х190"), $(".js-tLabel_2").text("140х190"), $(".js-tLabel_3").text("140х140")), "set-3" == t && ($("#thickness-1").val("190х190").attr("data-count", 22800), $("#thickness-2").val("140х190").attr("data-count", 16800), $("#thickness-3").val("140х140").attr("data-count", 12500), $(".js-tLabel_1").text("190х190"), $(".js-tLabel_2").text("140х190"), $(".js-tLabel_3").text("140х140"))
    });
    $(document).on("click", ".btn_count", function () {
        var t, e = $(".form").data("form");
        "house" == (t = e) && v(t) && (f = a * i + s * a), "beam" == t && v(t) && (f = a * c), "button" == $(".btn_count").attr("type") && $("#result__count").text(f)
    }), $(document).on("submit", ".form", function (t) {
        if (t.preventDefault(), null === l) {
            var e = $(".form").data("form");
            v(e) && ($("#form__result").val(f), o = e, $.ajax({
                type: "POST",
                url: "assets/php/ajax_mail_calculator.php",
                data: $(".form").serialize(),
                success: function (t) {
                    "Заявка отправлена" == t ? ($(".form").trigger("reset"), _("smile", "success", t), localStorage.setItem("state", "1"), $(".wrap-politic").fadeOut(500), $(".form__block_contacts").fadeOut(500), $(".form__block_contacts").addClass("hide"), $(".btn_count").attr("type", "button"), $("#result__count").text(f), "house" === o && (s = n = r = a = 0, i = 0), "beam" === o && (c = a = 0), f = 0) : (console.log($(this).serialize()), _("sad", "error", t))
                }
            }))
        }
        var o
    }), $(".btn").on("click", function () {
        var t = $(this).data("type");
        "order" == t && (d = u = "Заказать обратный звонок"), "getPrice" == t && (d = u = "Получить прайс на услуги"), "drying" == t && (d = u = "Оставить заявку на сушку"), "beam" == t && (u = $(this).data("title"), d = u), "project" == t && (u = $(this).data("title"), d = "Страница " + u), "cut" == t && (d = u = "Оставить заявку на нарезку чаш по проекту"), "saw" == t && (d = u = "Оставить заявку на строжку"), "molded" == t && (d = u = "Получить прайс на погонажные изделия"), "propil" == t && (d = u = "Оставить заявку на нарезку пропилов")
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
            $(".form__title").html(u), $("#form_sub").val(d)
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
}), $(".tmFolder").hover(function () {
    $(this).find(".tmHideMenu").stop(!1).slideDown(200)
}), $(".tmFolder").mouseleave(function () {
    $(this).find(".tmHideMenu").stop(!1).slideUp(200)
}), $("#hPhotos").bxSlider({
    pagerCustom: "#hPager",
    infiniteLoop: !1,
    adaptiveHeight: !0,
    touchEnabled: !0,
    responsive: !0,
    controls: !1
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

function number_format(t, e, o, a) {
    t = (t + "").replace(/[^0-9+\-Ee.]/g, "");
    var s, n, i, r = isFinite(+t) ? +t : 0,
        c = isFinite(+e) ? Math.abs(e) : 0,
        l = void 0 === a ? " " : a,
        u = void 0 === o ? "." : o,
        d = "";
    return 3 < (d = (c ? (s = r, n = c, i = Math.pow(10, n), "" + (Math.round(s * i) / i).toFixed(n)) : "" + Math.round(r)).split("."))[0].length && (d[0] = d[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, l)), (d[1] || "").length < c && (d[1] = d[1] || "", d[1] += new Array(c - d[1].length + 1).join("0")), d.join(u)
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
}), $(".homeActions").bxSlider({
    mode: "horizontal",
    easing: "ease",
    speed: 200,
    randomStart: !0,
    responsive: !0,
    adaptiveHeight: !1,
    prevSelector: "#aNavL",
    nextSelector: "#aNavR",
    nextText: "&nbsp;",
    prevText: "&nbsp;",
    pager: !0,
    touchEnabled: 1
}), $(window).resize(function () {
    tbSlideHight()
}), tbSlideHight()



// function () {
//     var t = $(".menu-icon"),
//         o = $(".top_menu"),
//         e = $("body");

//     function a() {
//         o.fadeOut(200), setTimeout(function () {
//             o.removeClass("showed")
//         }, 200), e.removeClass("scroll-off"), null
//     }
//     $(t).click(function () {
//         o.addClass("showed").fadeIn(200), e.addClass("scroll-off"),
//             function () {
//                 function e(t) {
//                     o.is(t.target) || 0 !== o.has(t.target).length || a()
//                 }
//                 $(document).on("touchstart  mousedown", function (t) {
//                     if ($(".top_menu.showed").is(":visible")) {
//                         if ("touchstart" == t.type) {
//                             t.originalEvent.touches[0] || t.originalEvent.changedTouches[0];
//                             e(t)
//                         } else e(t);
//                         t.stopPropagation()
//                     }
//                 })
//             }()
//     }), o.find(".window-close").click(function () {
//         a()
//     }), $(window).scroll(function () {
//         $(window).width() < 1250 && (200 < $(this).scrollTop() ? t.hasClass("sticky") || (t.hide(), setTimeout(function () {
//             t.fadeIn(200).addClass("sticky")
//         }, 0)) : t.hasClass("sticky") && (t.fadeOut(200), setTimeout(function () {
//             t.fadeIn(200).removeClass("sticky")
//         }, 200)))
//     }), $(window).resize(function () {
//         $(window).width() < 1250 ? t.show() : t.hide()
//     })
// }();
// #
// sourceMappingURL = main.min.js.map