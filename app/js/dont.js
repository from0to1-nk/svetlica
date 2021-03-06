function fixedHeader() {
    let e = document.querySelector("#header");
    e.classList.contains("fixed") || window.addEventListener("scroll", function () {
        let t = window.pageYOffset;
        t > 0 ? (e.classList.add("fixed"), document.querySelector("body").style.paddingTop = "100px") : (e.classList.remove("fixed"), document.querySelector("body").style.paddingTop = "0px")
    })
}! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t()
}(this, function () {
    "use strict";

    function e(e) {
        return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
    }

    function t(s = {}, a = {}) {
        Object.keys(a).forEach(i => {
            void 0 === s[i] ? s[i] = a[i] : e(a[i]) && e(s[i]) && Object.keys(a[i]).length > 0 && t(s[i], a[i])
        })
    }

    function s() {
        const e = "undefined" != typeof document ? document : {};
        return t(e, $), e
    }

    function a() {
        const e = "undefined" != typeof window ? window : {};
        return t(e, M), e
    }

    function i(e = []) {
        const t = [];
        return e.forEach(e => {
            Array.isArray(e) ? t.push(...i(e)) : t.push(e)
        }), t
    }

    function r(e, t) {
        return Array.prototype.filter.call(e, t)
    }

    function n(e, t) {
        const i = a(),
            r = s();
        let n = [];
        if (!t && e instanceof P) return e;
        if (!e) return new P(n);
        if ("string" == typeof e) {
            const s = e.trim();
            if (s.indexOf("<") < 0 || s.indexOf(">") < 0) n = function (e, t) {
                if ("string" != typeof e) return [e];
                const s = [],
                    a = t.querySelectorAll(e);
                for (let e = 0; e < a.length; e += 1) s.push(a[e]);
                return s
            }(e.trim(), t || r);
            else {
                let e = "div";
                0 === s.indexOf("<li") && (e = "ul"), 0 === s.indexOf("<tr") && (e = "tbody"), 0 !== s.indexOf("<td") && 0 !== s.indexOf("<th") || (e = "tr"), 0 === s.indexOf("<tbody") && (e = "table"), 0 === s.indexOf("<option") && (e = "select");
                const t = r.createElement(e);
                t.innerHTML = s;
                for (let e = 0; e < t.childNodes.length; e += 1) n.push(t.childNodes[e])
            }
        } else if (e.nodeType || e === i || e === r) n.push(e);
        else if (Array.isArray(e)) {
            if (e instanceof P) return e;
            n = e
        }
        return new P(function (e) {
            const t = [];
            for (let s = 0; s < e.length; s += 1) - 1 === t.indexOf(e[s]) && t.push(e[s]);
            return t
        }(n))
    }

    function l(e, t = 0) {
        return setTimeout(e, t)
    }

    function o() {
        return Date.now()
    }

    function d(e, t = "x") {
        const s = a();
        let i, r, n;
        const l = function (e) {
            const t = a();
            let s;
            return t.getComputedStyle && (s = t.getComputedStyle(e, null)), !s && e.currentStyle && (s = e.currentStyle), s || (s = e.style), s
        }(e);
        return s.WebKitCSSMatrix ? ((r = l.transform || l.webkitTransform).split(",").length > 6 && (r = r.split(", ").map(e => e.replace(",", ".")).join(", ")), n = new s.WebKitCSSMatrix("none" === r ? "" : r)) : i = (n = l.MozTransform || l.OTransform || l.MsTransform || l.msTransform || l.transform || l.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (r = s.WebKitCSSMatrix ? n.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (r = s.WebKitCSSMatrix ? n.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), r || 0
    }

    function c(e) {
        return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
    }

    function p(...e) {
        const t = Object(e[0]),
            s = ["__proto__", "constructor", "prototype"];
        for (let i = 1; i < e.length; i += 1) {
            const r = e[i];
            if (null != r && (a = r, !("undefined" != typeof window && void 0 !== window.HTMLElement ? a instanceof HTMLElement : a && (1 === a.nodeType || 11 === a.nodeType)))) {
                const e = Object.keys(Object(r)).filter(e => 0 > s.indexOf(e));
                for (let s = 0, a = e.length; a > s; s += 1) {
                    const a = e[s],
                        i = Object.getOwnPropertyDescriptor(r, a);
                    void 0 !== i && i.enumerable && (c(t[a]) && c(r[a]) ? r[a].__swiper__ ? t[a] = r[a] : p(t[a], r[a]) : !c(t[a]) && c(r[a]) ? (t[a] = {}, r[a].__swiper__ ? t[a] = r[a] : p(t[a], r[a])) : t[a] = r[a])
                }
            }
        }
        var a;
        return t
    }

    function u(e, t, s) {
        e.style.setProperty(t, s)
    }

    function h({
        swiper: e,
        targetPosition: t,
        side: s
    }) {
        const i = a(),
            r = -e.translate;
        let n, l = null;
        const o = e.params.speed;
        e.wrapperEl.style.scrollSnapType = "none", i.cancelAnimationFrame(e.cssModeFrameID);
        const d = t > r ? "next" : "prev",
            c = (e, t) => "next" === d && e >= t || "prev" === d && t >= e,
            p = () => {
                n = (new Date).getTime(), null === l && (l = n);
                let a = r + (.5 - Math.cos(Math.max(Math.min((n - l) / o, 1), 0) * Math.PI) / 2) * (t - r);
                if (c(a, t) && (a = t), e.wrapperEl.scrollTo({
                        [s]: a
                    }), c(a, t)) return e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
                    e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
                        [s]: a
                    })
                }), void i.cancelAnimationFrame(e.cssModeFrameID);
                e.cssModeFrameID = i.requestAnimationFrame(p)
            };
        p()
    }

    function m() {
        return z || (z = function () {
            const e = a(),
                t = s();
            return {
                smoothScroll: t.documentElement && "scrollBehavior" in t.documentElement.style,
                touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch),
                passiveListener: function () {
                    let t = !1;
                    try {
                        const s = Object.defineProperty({}, "passive", {
                            get() {
                                t = !0
                            }
                        });
                        e.addEventListener("testPassiveListener", null, s)
                    } catch (e) {}
                    return t
                }(),
                gestures: "ongesturestart" in e
            }
        }()), z
    }

    function f(e = {}) {
        return O || (O = function ({
            userAgent: e
        } = {}) {
            const t = m(),
                s = a(),
                i = s.navigator.platform,
                r = e || s.navigator.userAgent,
                n = {
                    ios: !1,
                    android: !1
                },
                l = s.screen.width,
                o = s.screen.height,
                d = r.match(/(Android);?[\s\/]+([\d.]+)?/);
            let c = r.match(/(iPad).*OS\s([\d_]+)/);
            const p = r.match(/(iPod)(.*OS\s([\d_]+))?/),
                u = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                h = "Win32" === i;
            let f = "MacIntel" === i;
            return !c && f && t.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${l}x${o}`) >= 0 && ((c = r.match(/(Version)\/([\d.]+)/)) || (c = [0, 1, "13_0_0"]), f = !1), d && !h && (n.os = "android", n.android = !0), (c || u || p) && (n.os = "ios", n.ios = !0), n
        }(e)), O
    }

    function g() {
        return I || (I = function () {
            const e = a();
            return {
                isSafari: function () {
                    const t = e.navigator.userAgent.toLowerCase();
                    return t.indexOf("safari") >= 0 && 0 > t.indexOf("chrome") && 0 > t.indexOf("android")
                }(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
            }
        }()), I
    }

    function v({
        swiper: e,
        runCallbacks: t,
        direction: s,
        step: a
    }) {
        const {
            activeIndex: i,
            previousIndex: r
        } = e;
        let n = s;
        if (n || (n = i > r ? "next" : r > i ? "prev" : "reset"), e.emit("transition" + a), t && i !== r) {
            if ("reset" === n) return void e.emit("slideResetTransition" + a);
            e.emit("slideChangeTransition" + a), "next" === n ? e.emit("slideNextTransition" + a) : e.emit("slidePrevTransition" + a)
        }
    }

    function w() {
        const e = this,
            {
                params: t,
                el: s
            } = e;
        if (s && 0 === s.offsetWidth) return;
        t.breakpoints && e.setBreakpoint();
        const {
            allowSlideNext: a,
            allowSlidePrev: i,
            snapGrid: r
        } = e;
        e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses(), "auto" !== t.slidesPerView && 1 >= t.slidesPerView || !e.isEnd || e.isBeginning || e.params.centeredSlides ? e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(), e.allowSlidePrev = i, e.allowSlideNext = a, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
    }

    function b() {}

    function x(e, t, a, i) {
        const r = s();
        return e.params.createElements && Object.keys(i).forEach(s => {
            if (!a[s] && !0 === a.auto) {
                let n = e.$el.children("." + i[s])[0];
                n || ((n = r.createElement("div")).className = i[s], e.$el.append(n)), a[s] = n, t[s] = n
            }
        }), a
    }

    function y(e = "") {
        return "." + e.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")
    }

    function E(e) {
        const {
            effect: t,
            swiper: s,
            on: a,
            setTranslate: i,
            setTransition: r,
            overwriteParams: n,
            perspective: l
        } = e;
        a("beforeInit", () => {
            if (s.params.effect !== t) return;
            s.classNames.push(`${s.params.containerModifierClass}${t}`), l && l() && s.classNames.push(s.params.containerModifierClass + "3d");
            const e = n ? n() : {};
            Object.assign(s.params, e), Object.assign(s.originalParams, e)
        }), a("setTranslate", () => {
            s.params.effect === t && i()
        }), a("setTransition", (e, a) => {
            s.params.effect === t && r(a)
        })
    }

    function T(e, t) {
        return e.transformEl ? t.find(e.transformEl).css({
            "backface-visibility": "hidden",
            "-webkit-backface-visibility": "hidden"
        }) : t
    }

    function C({
        swiper: e,
        duration: t,
        transformEl: s,
        allSlides: a
    }) {
        const {
            slides: i,
            activeIndex: r,
            $wrapperEl: n
        } = e;
        if (e.params.virtualTranslate && 0 !== t) {
            let t, l = !1;
            (t = a ? s ? i.find(s) : i : s ? i.eq(r).find(s) : i.eq(r)).transitionEnd(() => {
                if (l) return;
                if (!e || e.destroyed) return;
                l = !0, e.animating = !1;
                const t = ["webkitTransitionEnd", "transitionend"];
                for (let e = 0; t.length > e; e += 1) n.trigger(t[e])
            })
        }
    }

    function S(e, t, s) {
        const a = "swiper-slide-shadow" + (s ? "-" + s : ""),
            i = e.transformEl ? t.find(e.transformEl) : t;
        let r = i.children("." + a);
        return r.length || (r = n(`<div class="swiper-slide-shadow${s?"-"+s:""}"></div>`), i.append(r)), r
    }
    const $ = {
            body: {},
            addEventListener() {},
            removeEventListener() {},
            activeElement: {
                blur() {},
                nodeName: ""
            },
            querySelector: () => null,
            querySelectorAll: () => [],
            getElementById: () => null,
            createEvent: () => ({
                initEvent() {}
            }),
            createElement: () => ({
                children: [],
                childNodes: [],
                style: {},
                setAttribute() {},
                getElementsByTagName: () => []
            }),
            createElementNS: () => ({}),
            importNode: () => null,
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            }
        },
        M = {
            document: $,
            navigator: {
                userAgent: ""
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            },
            history: {
                replaceState() {},
                pushState() {},
                go() {},
                back() {}
            },
            CustomEvent: function () {
                return this
            },
            addEventListener() {},
            removeEventListener() {},
            getComputedStyle: () => ({
                getPropertyValue: () => ""
            }),
            Image() {},
            Date() {},
            screen: {},
            setTimeout() {},
            clearTimeout() {},
            matchMedia: () => ({}),
            requestAnimationFrame: e => void 0 === setTimeout ? (e(), null) : setTimeout(e, 0),
            cancelAnimationFrame(e) {
                void 0 !== setTimeout && clearTimeout(e)
            }
        };
    class P extends Array {
        constructor(e) {
            super(...e || []),
                function (e) {
                    const t = e.__proto__;
                    Object.defineProperty(e, "__proto__", {
                        get: () => t,
                        set(e) {
                            t.__proto__ = e
                        }
                    })
                }(this)
        }
    }
    n.fn = P.prototype;
    const k = {
        addClass: function (...e) {
            const t = i(e.map(e => e.split(" ")));
            return this.forEach(e => {
                e.classList.add(...t)
            }), this
        },
        removeClass: function (...e) {
            const t = i(e.map(e => e.split(" ")));
            return this.forEach(e => {
                e.classList.remove(...t)
            }), this
        },
        hasClass: function (...e) {
            const t = i(e.map(e => e.split(" ")));
            return r(this, e => t.filter(t => e.classList.contains(t)).length > 0).length > 0
        },
        toggleClass: function (...e) {
            const t = i(e.map(e => e.split(" ")));
            this.forEach(e => {
                t.forEach(t => {
                    e.classList.toggle(t)
                })
            })
        },
        attr: function (e, t) {
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (let s = 0; s < this.length; s += 1)
                if (2 === arguments.length) this[s].setAttribute(e, t);
                else
                    for (const t in e) this[s][t] = e[t], this[s].setAttribute(t, e[t]);
            return this
        },
        removeAttr: function (e) {
            for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        },
        transform: function (e) {
            for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
            return this
        },
        transition: function (e) {
            for (let t = 0; t < this.length; t += 1) this[t].style.transitionDuration = "string" != typeof e ? e + "ms" : e;
            return this
        },
        on: function (...e) {
            function t(e) {
                const t = e.target;
                if (!t) return;
                const s = e.target.dom7EventData || [];
                if (0 > s.indexOf(e) && s.unshift(e), n(t).is(i)) r.apply(t, s);
                else {
                    const e = n(t).parents();
                    for (let t = 0; t < e.length; t += 1) n(e[t]).is(i) && r.apply(e[t], s)
                }
            }

            function s(e) {
                const t = e && e.target && e.target.dom7EventData || [];
                0 > t.indexOf(e) && t.unshift(e), r.apply(this, t)
            }
            let [a, i, r, l] = e;
            "function" == typeof e[1] && ([a, r, l] = e, i = void 0), l || (l = !1);
            const o = a.split(" ");
            let d;
            for (let e = 0; e < this.length; e += 1) {
                const a = this[e];
                if (i)
                    for (d = 0; d < o.length; d += 1) {
                        const e = o[d];
                        a.dom7LiveListeners || (a.dom7LiveListeners = {}), a.dom7LiveListeners[e] || (a.dom7LiveListeners[e] = []), a.dom7LiveListeners[e].push({
                            listener: r,
                            proxyListener: t
                        }), a.addEventListener(e, t, l)
                    } else
                        for (d = 0; d < o.length; d += 1) {
                            const e = o[d];
                            a.dom7Listeners || (a.dom7Listeners = {}), a.dom7Listeners[e] || (a.dom7Listeners[e] = []), a.dom7Listeners[e].push({
                                listener: r,
                                proxyListener: s
                            }), a.addEventListener(e, s, l)
                        }
            }
            return this
        },
        off: function (...e) {
            let [t, s, a, i] = e;
            "function" == typeof e[1] && ([t, a, i] = e, s = void 0), i || (i = !1);
            const r = t.split(" ");
            for (let e = 0; e < r.length; e += 1) {
                const t = r[e];
                for (let e = 0; e < this.length; e += 1) {
                    const r = this[e];
                    let n;
                    if (!s && r.dom7Listeners ? n = r.dom7Listeners[t] : s && r.dom7LiveListeners && (n = r.dom7LiveListeners[t]), n && n.length)
                        for (let e = n.length - 1; e >= 0; e -= 1) {
                            const s = n[e];
                            a && s.listener === a || a && s.listener && s.listener.dom7proxy && s.listener.dom7proxy === a ? (r.removeEventListener(t, s.proxyListener, i), n.splice(e, 1)) : a || (r.removeEventListener(t, s.proxyListener, i), n.splice(e, 1))
                        }
                }
            }
            return this
        },
        trigger: function (...e) {
            const t = a(),
                s = e[0].split(" "),
                i = e[1];
            for (let a = 0; a < s.length; a += 1) {
                const r = s[a];
                for (let s = 0; s < this.length; s += 1) {
                    const a = this[s];
                    if (t.CustomEvent) {
                        const s = new t.CustomEvent(r, {
                            detail: i,
                            bubbles: !0,
                            cancelable: !0
                        });
                        a.dom7EventData = e.filter((e, t) => t > 0), a.dispatchEvent(s), a.dom7EventData = [], delete a.dom7EventData
                    }
                }
            }
            return this
        },
        transitionEnd: function (e) {
            const t = this;
            return e && t.on("transitionend", function s(a) {
                a.target === this && (e.call(this, a), t.off("transitionend", s))
            }), this
        },
        outerWidth: function (e) {
            if (this.length > 0) {
                if (e) {
                    const e = this.styles();
                    return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function (e) {
            if (this.length > 0) {
                if (e) {
                    const e = this.styles();
                    return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        styles: function () {
            const e = a();
            return this[0] ? e.getComputedStyle(this[0], null) : {}
        },
        offset: function () {
            if (this.length > 0) {
                const e = a(),
                    t = s(),
                    i = this[0],
                    r = i.getBoundingClientRect(),
                    n = t.body,
                    l = i.clientTop || n.clientTop || 0,
                    o = i.clientLeft || n.clientLeft || 0,
                    d = i === e ? e.scrollY : i.scrollTop,
                    c = i === e ? e.scrollX : i.scrollLeft;
                return {
                    top: r.top + d - l,
                    left: r.left + c - o
                }
            }
            return null
        },
        css: function (e, t) {
            const s = a();
            let i;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (i = 0; i < this.length; i += 1)
                        for (const t in e) this[i].style[t] = e[t];
                    return this
                }
                if (this[0]) return s.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
                return this
            }
            return this
        },
        each: function (e) {
            return e ? (this.forEach((t, s) => {
                e.call(t, t, s)
            }), this) : this
        },
        html: function (e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : null;
            for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        },
        text: function (e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        },
        is: function (e) {
            const t = a(),
                i = s(),
                r = this[0];
            let l, o;
            if (!r || void 0 === e) return !1;
            if ("string" == typeof e) {
                if (r.matches) return r.matches(e);
                if (r.webkitMatchesSelector) return r.webkitMatchesSelector(e);
                if (r.msMatchesSelector) return r.msMatchesSelector(e);
                for (l = n(e), o = 0; o < l.length; o += 1)
                    if (l[o] === r) return !0;
                return !1
            }
            if (e === i) return r === i;
            if (e === t) return r === t;
            if (e.nodeType || e instanceof P) {
                for (l = e.nodeType ? [e] : e, o = 0; o < l.length; o += 1)
                    if (l[o] === r) return !0;
                return !1
            }
            return !1
        },
        index: function () {
            let e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function (e) {
            if (void 0 === e) return this;
            const t = this.length;
            if (e > t - 1) return n([]);
            if (0 > e) {
                const s = t + e;
                return n(0 > s ? [] : [this[s]])
            }
            return n([this[e]])
        },
        append: function (...e) {
            let t;
            const a = s();
            for (let s = 0; s < e.length; s += 1) {
                t = e[s];
                for (let e = 0; e < this.length; e += 1)
                    if ("string" == typeof t) {
                        const s = a.createElement("div");
                        for (s.innerHTML = t; s.firstChild;) this[e].appendChild(s.firstChild)
                    } else if (t instanceof P)
                    for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
                else this[e].appendChild(t)
            }
            return this
        },
        prepend: function (e) {
            const t = s();
            let a, i;
            for (a = 0; a < this.length; a += 1)
                if ("string" == typeof e) {
                    const s = t.createElement("div");
                    for (s.innerHTML = e, i = s.childNodes.length - 1; i >= 0; i -= 1) this[a].insertBefore(s.childNodes[i], this[a].childNodes[0])
                } else if (e instanceof P)
                for (i = 0; i < e.length; i += 1) this[a].insertBefore(e[i], this[a].childNodes[0]);
            else this[a].insertBefore(e, this[a].childNodes[0]);
            return this
        },
        next: function (e) {
            return this.length > 0 ? e ? this[0].nextElementSibling && n(this[0].nextElementSibling).is(e) ? n([this[0].nextElementSibling]) : n([]) : this[0].nextElementSibling ? n([this[0].nextElementSibling]) : n([]) : n([])
        },
        nextAll: function (e) {
            const t = [];
            let s = this[0];
            if (!s) return n([]);
            for (; s.nextElementSibling;) {
                const a = s.nextElementSibling;
                e ? n(a).is(e) && t.push(a) : t.push(a), s = a
            }
            return n(t)
        },
        prev: function (e) {
            if (this.length > 0) {
                const t = this[0];
                return e ? t.previousElementSibling && n(t.previousElementSibling).is(e) ? n([t.previousElementSibling]) : n([]) : t.previousElementSibling ? n([t.previousElementSibling]) : n([])
            }
            return n([])
        },
        prevAll: function (e) {
            const t = [];
            let s = this[0];
            if (!s) return n([]);
            for (; s.previousElementSibling;) {
                const a = s.previousElementSibling;
                e ? n(a).is(e) && t.push(a) : t.push(a), s = a
            }
            return n(t)
        },
        parent: function (e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) null !== this[s].parentNode && (e ? n(this[s].parentNode).is(e) && t.push(this[s].parentNode) : t.push(this[s].parentNode));
            return n(t)
        },
        parents: function (e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
                let a = this[s].parentNode;
                for (; a;) e ? n(a).is(e) && t.push(a) : t.push(a), a = a.parentNode
            }
            return n(t)
        },
        closest: function (e) {
            let t = this;
            return void 0 === e ? n([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        },
        find: function (e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
                const a = this[s].querySelectorAll(e);
                for (let e = 0; e < a.length; e += 1) t.push(a[e])
            }
            return n(t)
        },
        children: function (e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
                const a = this[s].children;
                for (let s = 0; s < a.length; s += 1) e && !n(a[s]).is(e) || t.push(a[s])
            }
            return n(t)
        },
        filter: function (e) {
            return n(r(this, e))
        },
        remove: function () {
            for (let e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        }
    };
    let z, O, I;
    Object.keys(k).forEach(e => {
        Object.defineProperty(n.fn, e, {
            value: k[e],
            writable: !0
        })
    });
    let L = !1;
    const A = (e, t) => {
            const a = s(),
                {
                    params: i,
                    touchEvents: r,
                    el: n,
                    wrapperEl: l,
                    device: o,
                    support: d
                } = e,
                c = !!i.nested,
                p = "on" === t ? "addEventListener" : "removeEventListener",
                u = t;
            if (d.touch) {
                const t = !("touchstart" !== r.start || !d.passiveListener || !i.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                n[p](r.start, e.onTouchStart, t), n[p](r.move, e.onTouchMove, d.passiveListener ? {
                    passive: !1,
                    capture: c
                } : c), n[p](r.end, e.onTouchEnd, t), r.cancel && n[p](r.cancel, e.onTouchEnd, t)
            } else n[p](r.start, e.onTouchStart, !1), a[p](r.move, e.onTouchMove, c), a[p](r.end, e.onTouchEnd, !1);
            (i.preventClicks || i.preventClicksPropagation) && n[p]("click", e.onClick, !0), i.cssMode && l[p]("scroll", e.onScroll), i.updateOnWindowResize ? e[u](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", w, !0) : e[u]("observerUpdate", w, !0)
        },
        D = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    var G = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        enabled: !0,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1
    };
    const B = {
            eventsEmitter: {
                on(e, t, s) {
                    const a = this;
                    if ("function" != typeof t) return a;
                    const i = s ? "unshift" : "push";
                    return e.split(" ").forEach(e => {
                        a.eventsListeners[e] || (a.eventsListeners[e] = []), a.eventsListeners[e][i](t)
                    }), a
                },
                once(e, t, s) {
                    function a(...s) {
                        i.off(e, a), a.__emitterProxy && delete a.__emitterProxy, t.apply(i, s)
                    }
                    const i = this;
                    return "function" != typeof t ? i : (a.__emitterProxy = t, i.on(e, a, s))
                },
                onAny(e, t) {
                    const s = this;
                    if ("function" != typeof e) return s;
                    const a = t ? "unshift" : "push";
                    return 0 > s.eventsAnyListeners.indexOf(e) && s.eventsAnyListeners[a](e), s
                },
                offAny(e) {
                    const t = this;
                    if (!t.eventsAnyListeners) return t;
                    const s = t.eventsAnyListeners.indexOf(e);
                    return s >= 0 && t.eventsAnyListeners.splice(s, 1), t
                },
                off(e, t) {
                    const s = this;
                    return s.eventsListeners ? (e.split(" ").forEach(e => {
                        void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach((a, i) => {
                            (a === t || a.__emitterProxy && a.__emitterProxy === t) && s.eventsListeners[e].splice(i, 1)
                        })
                    }), s) : s
                },
                emit(...e) {
                    const t = this;
                    if (!t.eventsListeners) return t;
                    let s, a, i;
                    return "string" == typeof e[0] || Array.isArray(e[0]) ? (s = e[0], a = e.slice(1, e.length), i = t) : (s = e[0].events, a = e[0].data, i = e[0].context || t), a.unshift(i), (Array.isArray(s) ? s : s.split(" ")).forEach(e => {
                        t.eventsAnyListeners && t.eventsAnyListeners.length && t.eventsAnyListeners.forEach(t => {
                            t.call(i, e, ...a)
                        }), t.eventsListeners && t.eventsListeners[e] && t.eventsListeners[e].forEach(e => {
                            e.apply(i, a)
                        })
                    }), t
                }
            },
            update: {
                updateSize: function () {
                    const e = this;
                    let t, s;
                    const a = e.$el;
                    t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : a[0].clientWidth, s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : a[0].clientHeight, 0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(a.css("padding-left") || 0, 10) - parseInt(a.css("padding-right") || 0, 10), s = s - parseInt(a.css("padding-top") || 0, 10) - parseInt(a.css("padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(s) && (s = 0), Object.assign(e, {
                        width: t,
                        height: s,
                        size: e.isHorizontal() ? t : s
                    }))
                },
                updateSlides: function () {
                    function e(e) {
                        return s.isHorizontal() ? e : {
                            width: "height",
                            "margin-top": "margin-left",
                            "margin-bottom ": "margin-right",
                            "margin-left": "margin-top",
                            "margin-right": "margin-bottom",
                            "padding-left": "padding-top",
                            "padding-right": "padding-bottom",
                            marginRight: "marginBottom"
                        } [e]
                    }

                    function t(t, s) {
                        return parseFloat(t.getPropertyValue(e(s)) || 0)
                    }
                    const s = this,
                        a = s.params,
                        {
                            $wrapperEl: i,
                            size: r,
                            rtlTranslate: n,
                            wrongRTL: l
                        } = s,
                        o = s.virtual && a.virtual.enabled,
                        d = o ? s.virtual.slides.length : s.slides.length,
                        c = i.children("." + s.params.slideClass),
                        p = o ? s.virtual.slides.length : c.length;
                    let h = [];
                    const m = [],
                        f = [];
                    let g = a.slidesOffsetBefore;
                    "function" == typeof g && (g = a.slidesOffsetBefore.call(s));
                    let v = a.slidesOffsetAfter;
                    "function" == typeof v && (v = a.slidesOffsetAfter.call(s));
                    const w = s.snapGrid.length,
                        b = s.slidesGrid.length;
                    let x = a.spaceBetween,
                        y = -g,
                        E = 0,
                        T = 0;
                    if (void 0 === r) return;
                    "string" == typeof x && x.indexOf("%") >= 0 && (x = parseFloat(x.replace("%", "")) / 100 * r), s.virtualSize = -x, n ? c.css({
                        marginLeft: "",
                        marginBottom: "",
                        marginTop: ""
                    }) : c.css({
                        marginRight: "",
                        marginBottom: "",
                        marginTop: ""
                    }), a.centeredSlides && a.cssMode && (u(s.wrapperEl, "--swiper-centered-offset-before", ""), u(s.wrapperEl, "--swiper-centered-offset-after", ""));
                    const C = a.grid && a.grid.rows > 1 && s.grid;
                    let S;
                    C && s.grid.initSlides(p);
                    const $ = "auto" === a.slidesPerView && a.breakpoints && Object.keys(a.breakpoints).filter(e => void 0 !== a.breakpoints[e].slidesPerView).length > 0;
                    for (let i = 0; p > i; i += 1) {
                        S = 0;
                        const n = c.eq(i);
                        if (C && s.grid.updateSlide(i, n, p, e), "none" !== n.css("display")) {
                            if ("auto" === a.slidesPerView) {
                                $ && (c[i].style[e("width")] = "");
                                const r = getComputedStyle(n[0]),
                                    l = n[0].style.transform,
                                    o = n[0].style.webkitTransform;
                                if (l && (n[0].style.transform = "none"), o && (n[0].style.webkitTransform = "none"), a.roundLengths) S = s.isHorizontal() ? n.outerWidth(!0) : n.outerHeight(!0);
                                else {
                                    const e = t(r, "width"),
                                        s = t(r, "padding-left"),
                                        a = t(r, "padding-right"),
                                        i = t(r, "margin-left"),
                                        l = t(r, "margin-right"),
                                        o = r.getPropertyValue("box-sizing");
                                    if (o && "border-box" === o) S = e + i + l;
                                    else {
                                        const {
                                            clientWidth: t,
                                            offsetWidth: r
                                        } = n[0];
                                        S = e + s + a + i + l + (r - t)
                                    }
                                }
                                l && (n[0].style.transform = l), o && (n[0].style.webkitTransform = o), a.roundLengths && (S = Math.floor(S))
                            } else S = (r - (a.slidesPerView - 1) * x) / a.slidesPerView, a.roundLengths && (S = Math.floor(S)), c[i] && (c[i].style[e("width")] = S + "px");
                            c[i] && (c[i].swiperSlideSize = S), f.push(S), a.centeredSlides ? (y = y + S / 2 + E / 2 + x, 0 === E && 0 !== i && (y = y - r / 2 - x), 0 === i && (y = y - r / 2 - x), .001 > Math.abs(y) && (y = 0), a.roundLengths && (y = Math.floor(y)), T % a.slidesPerGroup == 0 && h.push(y), m.push(y)) : (a.roundLengths && (y = Math.floor(y)), (T - Math.min(s.params.slidesPerGroupSkip, T)) % s.params.slidesPerGroup == 0 && h.push(y), m.push(y), y = y + S + x), s.virtualSize += S + x, E = S, T += 1
                        }
                    }
                    if (s.virtualSize = Math.max(s.virtualSize, r) + v, n && l && ("slide" === a.effect || "coverflow" === a.effect) && i.css({
                            width: s.virtualSize + a.spaceBetween + "px"
                        }), a.setWrapperSize && i.css({
                            [e("width")]: s.virtualSize + a.spaceBetween + "px"
                        }), C && s.grid.updateWrapperSize(S, h, e), !a.centeredSlides) {
                        const e = [];
                        for (let t = 0; t < h.length; t += 1) {
                            let i = h[t];
                            a.roundLengths && (i = Math.floor(i)), h[t] <= s.virtualSize - r && e.push(i)
                        }
                        h = e, Math.floor(s.virtualSize - r) - Math.floor(h[h.length - 1]) > 1 && h.push(s.virtualSize - r)
                    }
                    if (0 === h.length && (h = [0]), 0 !== a.spaceBetween) {
                        const t = s.isHorizontal() && n ? "marginLeft" : e("marginRight");
                        c.filter((e, t) => !a.cssMode || t !== c.length - 1).css({
                            [t]: x + "px"
                        })
                    }
                    if (a.centeredSlides && a.centeredSlidesBounds) {
                        let e = 0;
                        f.forEach(t => {
                            e += t + (a.spaceBetween ? a.spaceBetween : 0)
                        });
                        const t = (e -= a.spaceBetween) - r;
                        h = h.map(e => 0 > e ? -g : e > t ? t + v : e)
                    }
                    if (a.centerInsufficientSlides) {
                        let e = 0;
                        if (f.forEach(t => {
                                e += t + (a.spaceBetween ? a.spaceBetween : 0)
                            }), r > (e -= a.spaceBetween)) {
                            const t = (r - e) / 2;
                            h.forEach((e, s) => {
                                h[s] = e - t
                            }), m.forEach((e, s) => {
                                m[s] = e + t
                            })
                        }
                    }
                    if (Object.assign(s, {
                            slides: c,
                            snapGrid: h,
                            slidesGrid: m,
                            slidesSizesGrid: f
                        }), a.centeredSlides && a.cssMode && !a.centeredSlidesBounds) {
                        u(s.wrapperEl, "--swiper-centered-offset-before", -h[0] + "px"), u(s.wrapperEl, "--swiper-centered-offset-after", s.size / 2 - f[f.length - 1] / 2 + "px");
                        const e = -s.snapGrid[0],
                            t = -s.slidesGrid[0];
                        s.snapGrid = s.snapGrid.map(t => t + e), s.slidesGrid = s.slidesGrid.map(e => e + t)
                    }
                    p !== d && s.emit("slidesLengthChange"), h.length !== w && (s.params.watchOverflow && s.checkOverflow(), s.emit("snapGridLengthChange")), m.length !== b && s.emit("slidesGridLengthChange"), a.watchSlidesProgress && s.updateSlidesOffset()
                },
                updateAutoHeight: function (e) {
                    const t = this,
                        s = [],
                        a = t.virtual && t.params.virtual.enabled;
                    let i, r = 0;
                    "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
                    const n = e => a ? t.slides.filter(t => parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e)[0] : t.slides.eq(e)[0];
                    if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                        if (t.params.centeredSlides) t.visibleSlides.each(e => {
                            s.push(e)
                        });
                        else
                            for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
                                const e = t.activeIndex + i;
                                if (e > t.slides.length && !a) break;
                                s.push(n(e))
                            } else s.push(n(t.activeIndex));
                    for (i = 0; i < s.length; i += 1)
                        if (void 0 !== s[i]) {
                            const e = s[i].offsetHeight;
                            r = e > r ? e : r
                        }(r || 0 === r) && t.$wrapperEl.css("height", r + "px")
                },
                updateSlidesOffset: function () {
                    const e = this,
                        t = e.slides;
                    for (let s = 0; s < t.length; s += 1) t[s].swiperSlideOffset = e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop
                },
                updateSlidesProgress: function (e = this && this.translate || 0) {
                    const t = this,
                        s = t.params,
                        {
                            slides: a,
                            rtlTranslate: i,
                            snapGrid: r
                        } = t;
                    if (0 === a.length) return;
                    void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
                    let l = -e;
                    i && (l = e), a.removeClass(s.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                    for (let e = 0; e < a.length; e += 1) {
                        const n = a[e];
                        let o = n.swiperSlideOffset;
                        s.cssMode && s.centeredSlides && (o -= a[0].swiperSlideOffset);
                        const d = (l + (s.centeredSlides ? t.minTranslate() : 0) - o) / (n.swiperSlideSize + s.spaceBetween),
                            c = (l - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) / (n.swiperSlideSize + s.spaceBetween),
                            p = -(l - o),
                            u = p + t.slidesSizesGrid[e];
                        (p >= 0 && p < t.size - 1 || u > 1 && u <= t.size || 0 >= p && u >= t.size) && (t.visibleSlides.push(n), t.visibleSlidesIndexes.push(e), a.eq(e).addClass(s.slideVisibleClass)), n.progress = i ? -d : d, n.originalProgress = i ? -c : c
                    }
                    t.visibleSlides = n(t.visibleSlides)
                },
                updateProgress: function (e) {
                    const t = this;
                    if (void 0 === e) {
                        const s = t.rtlTranslate ? -1 : 1;
                        e = t && t.translate && t.translate * s || 0
                    }
                    const s = t.params,
                        a = t.maxTranslate() - t.minTranslate();
                    let {
                        progress: i,
                        isBeginning: r,
                        isEnd: n
                    } = t;
                    const l = r,
                        o = n;
                    0 === a ? (i = 0, r = !0, n = !0) : (r = 0 >= (i = (e - t.minTranslate()) / a), n = i >= 1), Object.assign(t, {
                        progress: i,
                        isBeginning: r,
                        isEnd: n
                    }), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e), r && !l && t.emit("reachBeginning toEdge"), n && !o && t.emit("reachEnd toEdge"), (l && !r || o && !n) && t.emit("fromEdge"), t.emit("progress", i)
                },
                updateSlidesClasses: function () {
                    const e = this,
                        {
                            slides: t,
                            params: s,
                            $wrapperEl: a,
                            activeIndex: i,
                            realIndex: r
                        } = e,
                        n = e.virtual && s.virtual.enabled;
                    let l;
                    t.removeClass(`${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`), (l = n ? e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${i}"]`) : t.eq(i)).addClass(s.slideActiveClass), s.loop && (l.hasClass(s.slideDuplicateClass) ? a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass) : a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass));
                    let o = l.nextAll("." + s.slideClass).eq(0).addClass(s.slideNextClass);
                    s.loop && 0 === o.length && (o = t.eq(0)).addClass(s.slideNextClass);
                    let d = l.prevAll("." + s.slideClass).eq(0).addClass(s.slidePrevClass);
                    s.loop && 0 === d.length && (d = t.eq(-1)).addClass(s.slidePrevClass), s.loop && (o.hasClass(s.slideDuplicateClass) ? a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass) : a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass), d.hasClass(s.slideDuplicateClass) ? a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass) : a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass)), e.emitSlidesClasses()
                },
                updateActiveIndex: function (e) {
                    const t = this,
                        s = t.rtlTranslate ? t.translate : -t.translate,
                        {
                            slidesGrid: a,
                            snapGrid: i,
                            params: r,
                            activeIndex: n,
                            realIndex: l,
                            snapIndex: o
                        } = t;
                    let d, c = e;
                    if (void 0 === c) {
                        for (let e = 0; e < a.length; e += 1) void 0 !== a[e + 1] ? s >= a[e] && s < a[e + 1] - (a[e + 1] - a[e]) / 2 ? c = e : s >= a[e] && s < a[e + 1] && (c = e + 1) : s >= a[e] && (c = e);
                        r.normalizeSlideIndex && (0 > c || void 0 === c) && (c = 0)
                    }
                    if (i.indexOf(s) < 0) {
                        const e = Math.min(r.slidesPerGroupSkip, c);
                        d = e + Math.floor((c - e) / r.slidesPerGroup)
                    } else d = i.indexOf(s);
                    if (d >= i.length && (d = i.length - 1), c === n) return void(d !== o && (t.snapIndex = d, t.emit("snapIndexChange")));
                    const p = parseInt(t.slides.eq(c).attr("data-swiper-slide-index") || c, 10);
                    Object.assign(t, {
                        snapIndex: d,
                        realIndex: p,
                        previousIndex: n,
                        activeIndex: c
                    }), t.emit("activeIndexChange"), t.emit("snapIndexChange"), l !== p && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange")
                },
                updateClickedSlide: function (e) {
                    const t = this,
                        s = t.params,
                        a = n(e).closest("." + s.slideClass)[0];
                    let i, r = !1;
                    if (a)
                        for (let e = 0; e < t.slides.length; e += 1)
                            if (t.slides[e] === a) {
                                r = !0, i = e;
                                break
                            } if (!a || !r) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
                    t.clickedSlide = a, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(n(a).attr("data-swiper-slide-index"), 10) : t.clickedIndex = i, s.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
                }
            },
            translate: {
                getTranslate: function (e = (this.isHorizontal() ? "x" : "y")) {
                    const {
                        params: t,
                        rtlTranslate: s,
                        translate: a,
                        $wrapperEl: i
                    } = this;
                    if (t.virtualTranslate) return s ? -a : a;
                    if (t.cssMode) return a;
                    let r = d(i[0], e);
                    return s && (r = -r), r || 0
                },
                setTranslate: function (e, t) {
                    const s = this,
                        {
                            rtlTranslate: a,
                            params: i,
                            $wrapperEl: r,
                            wrapperEl: n,
                            progress: l
                        } = s;
                    let o, d = 0,
                        c = 0;
                    s.isHorizontal() ? d = a ? -e : e : c = e, i.roundLengths && (d = Math.floor(d), c = Math.floor(c)),
                        i.cssMode ? n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -d : -c : i.virtualTranslate || r.transform(`translate3d(${d}px, ${c}px, 0px)`), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? d : c;
                    const p = s.maxTranslate() - s.minTranslate();
                    (o = 0 === p ? 0 : (e - s.minTranslate()) / p) !== l && s.updateProgress(e), s.emit("setTranslate", s.translate, t)
                },
                minTranslate: function () {
                    return -this.snapGrid[0]
                },
                maxTranslate: function () {
                    return -this.snapGrid[this.snapGrid.length - 1]
                },
                translateTo: function (e = 0, t = this.params.speed, s = !0, a = !0, i) {
                    const r = this,
                        {
                            params: n,
                            wrapperEl: l
                        } = r;
                    if (r.animating && n.preventInteractionOnTransition) return !1;
                    const o = r.minTranslate(),
                        d = r.maxTranslate();
                    let c;
                    if (c = a && e > o ? o : a && d > e ? d : e, r.updateProgress(c), n.cssMode) {
                        const e = r.isHorizontal();
                        if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
                        else {
                            if (!r.support.smoothScroll) return h({
                                swiper: r,
                                targetPosition: -c,
                                side: e ? "left" : "top"
                            }), !0;
                            l.scrollTo({
                                [e ? "left" : "top"]: -c,
                                behavior: "smooth"
                            })
                        }
                        return !0
                    }
                    return 0 === t ? (r.setTransition(0), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function (e) {
                        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, s && r.emit("transitionEnd"))
                    }), r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd))), !0
                }
            },
            transition: {
                setTransition: function (e, t) {
                    const s = this;
                    s.params.cssMode || s.$wrapperEl.transition(e), s.emit("setTransition", e, t)
                },
                transitionStart: function (e = !0, t) {
                    const s = this,
                        {
                            params: a
                        } = s;
                    a.cssMode || (a.autoHeight && s.updateAutoHeight(), v({
                        swiper: s,
                        runCallbacks: e,
                        direction: t,
                        step: "Start"
                    }))
                },
                transitionEnd: function (e = !0, t) {
                    const s = this,
                        {
                            params: a
                        } = s;
                    s.animating = !1, a.cssMode || (s.setTransition(0), v({
                        swiper: s,
                        runCallbacks: e,
                        direction: t,
                        step: "End"
                    }))
                }
            },
            slide: {
                slideTo: function (e = 0, t = this.params.speed, s = !0, a, i) {
                    if ("number" != typeof e && "string" != typeof e) throw Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
                    if ("string" == typeof e) {
                        const t = parseInt(e, 10);
                        if (!isFinite(t)) throw Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                        e = t
                    }
                    const r = this;
                    let n = e;
                    0 > n && (n = 0);
                    const {
                        params: l,
                        snapGrid: o,
                        slidesGrid: d,
                        previousIndex: c,
                        activeIndex: p,
                        rtlTranslate: u,
                        wrapperEl: m,
                        enabled: f
                    } = r;
                    if (r.animating && l.preventInteractionOnTransition || !f && !a && !i) return !1;
                    const g = Math.min(r.params.slidesPerGroupSkip, n);
                    let v = g + Math.floor((n - g) / r.params.slidesPerGroup);
                    v >= o.length && (v = o.length - 1), (p || l.initialSlide || 0) === (c || 0) && s && r.emit("beforeSlideChangeStart");
                    const w = -o[v];
                    if (r.updateProgress(w), l.normalizeSlideIndex)
                        for (let e = 0; e < d.length; e += 1) {
                            const t = -Math.floor(100 * w),
                                s = Math.floor(100 * d[e]),
                                a = Math.floor(100 * d[e + 1]);
                            void 0 !== d[e + 1] ? t >= s && a - (a - s) / 2 > t ? n = e : t >= s && a > t && (n = e + 1) : t >= s && (n = e)
                        }
                    if (r.initialized && n !== p) {
                        if (!r.allowSlideNext && w < r.translate && w < r.minTranslate()) return !1;
                        if (!r.allowSlidePrev && w > r.translate && w > r.maxTranslate() && (p || 0) !== n) return !1
                    }
                    let b;
                    if (b = n > p ? "next" : p > n ? "prev" : "reset", u && -w === r.translate || !u && w === r.translate) return r.updateActiveIndex(n), l.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== l.effect && r.setTranslate(w), "reset" !== b && (r.transitionStart(s, b), r.transitionEnd(s, b)), !1;
                    if (l.cssMode) {
                        const e = r.isHorizontal(),
                            s = u ? w : -w;
                        if (0 === t) {
                            const t = r.virtual && r.params.virtual.enabled;
                            t && (r.wrapperEl.style.scrollSnapType = "none", r._immediateVirtual = !0), m[e ? "scrollLeft" : "scrollTop"] = s, t && requestAnimationFrame(() => {
                                r.wrapperEl.style.scrollSnapType = "", r._swiperImmediateVirtual = !1
                            })
                        } else {
                            if (!r.support.smoothScroll) return h({
                                swiper: r,
                                targetPosition: s,
                                side: e ? "left" : "top"
                            }), !0;
                            m.scrollTo({
                                [e ? "left" : "top"]: s,
                                behavior: "smooth"
                            })
                        }
                        return !0
                    }
                    return r.setTransition(t), r.setTranslate(w), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, a), r.transitionStart(s, b), 0 === t ? r.transitionEnd(s, b) : r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function (e) {
                        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(s, b))
                    }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd)), !0
                },
                slideToLoop: function (e = 0, t = this.params.speed, s = !0, a) {
                    const i = this;
                    let r = e;
                    return i.params.loop && (r += i.loopedSlides), i.slideTo(r, t, s, a)
                },
                slideNext: function (e = this.params.speed, t = !0, s) {
                    const a = this,
                        {
                            animating: i,
                            enabled: r,
                            params: n
                        } = a;
                    if (!r) return a;
                    let l = n.slidesPerGroup;
                    "auto" === n.slidesPerView && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && (l = Math.max(a.slidesPerViewDynamic("current", !0), 1));
                    const o = a.activeIndex < n.slidesPerGroupSkip ? 1 : l;
                    if (n.loop) {
                        if (i && n.loopPreventsSlide) return !1;
                        a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft
                    }
                    return n.rewind && a.isEnd ? a.slideTo(0, e, t, s) : a.slideTo(a.activeIndex + o, e, t, s)
                },
                slidePrev: function (e = this.params.speed, t = !0, s) {
                    function a(e) {
                        return 0 > e ? -Math.floor(Math.abs(e)) : Math.floor(e)
                    }
                    const i = this,
                        {
                            params: r,
                            animating: n,
                            snapGrid: l,
                            slidesGrid: o,
                            rtlTranslate: d,
                            enabled: c
                        } = i;
                    if (!c) return i;
                    if (r.loop) {
                        if (n && r.loopPreventsSlide) return !1;
                        i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
                    }
                    const p = a(d ? i.translate : -i.translate);
                    let u = l[l.map(e => a(e)).indexOf(p) - 1];
                    if (void 0 === u && r.cssMode) {
                        let e;
                        l.forEach((t, s) => {
                            p >= t && (e = s)
                        }), void 0 !== e && (u = l[e > 0 ? e - 1 : e])
                    }
                    let h = 0;
                    return void 0 !== u && (0 > (h = o.indexOf(u)) && (h = i.activeIndex - 1), "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (h = h - i.slidesPerViewDynamic("previous", !0) + 1, h = Math.max(h, 0))), r.rewind && i.isBeginning ? i.slideTo(i.slides.length - 1, e, t, s) : i.slideTo(h, e, t, s)
                },
                slideReset: function (e = this.params.speed, t = !0, s) {
                    return this.slideTo(this.activeIndex, e, t, s)
                },
                slideToClosest: function (e = this.params.speed, t = !0, s, a = .5) {
                    const i = this;
                    let r = i.activeIndex;
                    const n = Math.min(i.params.slidesPerGroupSkip, r),
                        l = n + Math.floor((r - n) / i.params.slidesPerGroup),
                        o = i.rtlTranslate ? i.translate : -i.translate;
                    if (o < i.snapGrid[l]) {
                        const e = i.snapGrid[l - 1];
                        o - e <= (i.snapGrid[l] - e) * a && (r -= i.params.slidesPerGroup)
                    } else {
                        const e = i.snapGrid[l];
                        o - e > (i.snapGrid[l + 1] - e) * a && (r += i.params.slidesPerGroup)
                    }
                    return r = Math.min(r = Math.max(r, 0), i.slidesGrid.length - 1), i.slideTo(r, e, t, s)
                },
                slideToClickedSlide: function () {
                    const e = this,
                        {
                            params: t,
                            $wrapperEl: s
                        } = e,
                        a = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
                    let i, r = e.clickedIndex;
                    if (t.loop) {
                        if (e.animating) return;
                        i = parseInt(n(e.clickedSlide).attr("data-swiper-slide-index"), 10), t.centeredSlides ? r < e.loopedSlides - a / 2 || r > e.slides.length - e.loopedSlides + a / 2 ? (e.loopFix(), r = s.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), l(() => {
                            e.slideTo(r)
                        })) : e.slideTo(r) : r > e.slides.length - a ? (e.loopFix(), r = s.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), l(() => {
                            e.slideTo(r)
                        })) : e.slideTo(r)
                    } else e.slideTo(r)
                }
            },
            loop: {
                loopCreate: function () {
                    const e = this,
                        t = s(),
                        {
                            params: a,
                            $wrapperEl: i
                        } = e,
                        r = i.children().length > 0 ? n(i.children()[0].parentNode) : i;
                    r.children(`.${a.slideClass}.${a.slideDuplicateClass}`).remove();
                    let l = r.children("." + a.slideClass);
                    if (a.loopFillGroupWithBlank) {
                        const e = a.slidesPerGroup - l.length % a.slidesPerGroup;
                        if (e !== a.slidesPerGroup) {
                            for (let s = 0; e > s; s += 1) {
                                const e = n(t.createElement("div")).addClass(`${a.slideClass} ${a.slideBlankClass}`);
                                r.append(e)
                            }
                            l = r.children("." + a.slideClass)
                        }
                    }
                    "auto" !== a.slidesPerView || a.loopedSlides || (a.loopedSlides = l.length), e.loopedSlides = Math.ceil(parseFloat(a.loopedSlides || a.slidesPerView, 10)), e.loopedSlides += a.loopAdditionalSlides, e.loopedSlides > l.length && (e.loopedSlides = l.length);
                    const o = [],
                        d = [];
                    l.each((t, s) => {
                        const a = n(t);
                        s < e.loopedSlides && d.push(t), s < l.length && s >= l.length - e.loopedSlides && o.push(t), a.attr("data-swiper-slide-index", s)
                    });
                    for (let e = 0; e < d.length; e += 1) r.append(n(d[e].cloneNode(!0)).addClass(a.slideDuplicateClass));
                    for (let e = o.length - 1; e >= 0; e -= 1) r.prepend(n(o[e].cloneNode(!0)).addClass(a.slideDuplicateClass))
                },
                loopFix: function () {
                    const e = this;
                    e.emit("beforeLoopFix");
                    const {
                        activeIndex: t,
                        slides: s,
                        loopedSlides: a,
                        allowSlidePrev: i,
                        allowSlideNext: r,
                        snapGrid: n,
                        rtlTranslate: l
                    } = e;
                    let o;
                    e.allowSlidePrev = !0, e.allowSlideNext = !0;
                    const d = -n[t] - e.getTranslate();
                    a > t ? (o = s.length - 3 * a + t, o += a, e.slideTo(o, 0, !1, !0) && 0 !== d && e.setTranslate((l ? -e.translate : e.translate) - d)) : t >= s.length - a && (o = -s.length + t + a, o += a, e.slideTo(o, 0, !1, !0) && 0 !== d && e.setTranslate((l ? -e.translate : e.translate) - d)), e.allowSlidePrev = i, e.allowSlideNext = r, e.emit("loopFix")
                },
                loopDestroy: function () {
                    const {
                        $wrapperEl: e,
                        params: t,
                        slides: s
                    } = this;
                    e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(), s.removeAttr("data-swiper-slide-index")
                }
            },
            grabCursor: {
                setGrabCursor: function (e) {
                    const t = this;
                    if (t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
                    const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                    s.style.cursor = "move", s.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", s.style.cursor = e ? "-moz-grabbin" : "-moz-grab", s.style.cursor = e ? "grabbing" : "grab"
                },
                unsetGrabCursor: function () {
                    const e = this;
                    e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "")
                }
            },
            events: {
                attachEvents: function () {
                    const e = this,
                        t = s(),
                        {
                            params: i,
                            support: r
                        } = e;
                    e.onTouchStart = function (e) {
                        const t = this,
                            i = s(),
                            r = a(),
                            l = t.touchEventsData,
                            {
                                params: d,
                                touches: c,
                                enabled: p
                            } = t;
                        if (!p) return;
                        if (t.animating && d.preventInteractionOnTransition) return;
                        !t.animating && d.cssMode && d.loop && t.loopFix();
                        let u = e;
                        u.originalEvent && (u = u.originalEvent);
                        let h = n(u.target);
                        if ("wrapper" === d.touchEventsTarget && !h.closest(t.wrapperEl).length) return;
                        if (l.isTouchEvent = "touchstart" === u.type, !l.isTouchEvent && "which" in u && 3 === u.which) return;
                        if (!l.isTouchEvent && "button" in u && u.button > 0) return;
                        if (l.isTouched && l.isMoved) return;
                        d.noSwipingClass && "" !== d.noSwipingClass && u.target && u.target.shadowRoot && e.path && e.path[0] && (h = n(e.path[0]));
                        const m = d.noSwipingSelector ? d.noSwipingSelector : "." + d.noSwipingClass,
                            f = !(!u.target || !u.target.shadowRoot);
                        if (d.noSwiping && (f ? function (e, t = this) {
                                return function t(i) {
                                    return i && i !== s() && i !== a() ? (i.assignedSlot && (i = i.assignedSlot), i.closest(e) || t(i.getRootNode().host)) : null
                                }(t)
                            }(m, u.target) : h.closest(m)[0])) return void(t.allowClick = !0);
                        if (d.swipeHandler && !h.closest(d.swipeHandler)[0]) return;
                        c.currentX = "touchstart" === u.type ? u.targetTouches[0].pageX : u.pageX, c.currentY = "touchstart" === u.type ? u.targetTouches[0].pageY : u.pageY;
                        const g = c.currentX,
                            v = c.currentY,
                            w = d.edgeSwipeDetection || d.iOSEdgeSwipeDetection,
                            b = d.edgeSwipeThreshold || d.iOSEdgeSwipeThreshold;
                        if (w && (b >= g || g >= r.innerWidth - b)) {
                            if ("prevent" !== w) return;
                            e.preventDefault()
                        }
                        if (Object.assign(l, {
                                isTouched: !0,
                                isMoved: !1,
                                allowTouchCallbacks: !0,
                                isScrolling: void 0,
                                startMoving: void 0
                            }), c.startX = g, c.startY = v, l.touchStartTime = o(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, d.threshold > 0 && (l.allowThresholdMove = !1), "touchstart" !== u.type) {
                            let e = !0;
                            h.is(l.focusableElements) && (e = !1), i.activeElement && n(i.activeElement).is(l.focusableElements) && i.activeElement !== h[0] && i.activeElement.blur();
                            const s = e && t.allowTouchMove && d.touchStartPreventDefault;
                            !d.touchStartForcePreventDefault && !s || h[0].isContentEditable || u.preventDefault()
                        }
                        t.emit("touchStart", u)
                    }.bind(e), e.onTouchMove = function (e) {
                        const t = s(),
                            a = this,
                            i = a.touchEventsData,
                            {
                                params: r,
                                touches: l,
                                rtlTranslate: d,
                                enabled: c
                            } = a;
                        if (!c) return;
                        let p = e;
                        if (p.originalEvent && (p = p.originalEvent), !i.isTouched) return void(i.startMoving && i.isScrolling && a.emit("touchMoveOpposite", p));
                        if (i.isTouchEvent && "touchmove" !== p.type) return;
                        const u = "touchmove" === p.type && p.targetTouches && (p.targetTouches[0] || p.changedTouches[0]),
                            h = "touchmove" === p.type ? u.pageX : p.pageX,
                            m = "touchmove" === p.type ? u.pageY : p.pageY;
                        if (p.preventedByNestedSwiper) return l.startX = h, void(l.startY = m);
                        if (!a.allowTouchMove) return a.allowClick = !1, void(i.isTouched && (Object.assign(l, {
                            startX: h,
                            startY: m,
                            currentX: h,
                            currentY: m
                        }), i.touchStartTime = o()));
                        if (i.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
                            if (a.isVertical()) {
                                if (m < l.startY && a.translate <= a.maxTranslate() || m > l.startY && a.translate >= a.minTranslate()) return i.isTouched = !1, void(i.isMoved = !1)
                            } else if (h < l.startX && a.translate <= a.maxTranslate() || h > l.startX && a.translate >= a.minTranslate()) return;
                        if (i.isTouchEvent && t.activeElement && p.target === t.activeElement && n(p.target).is(i.focusableElements)) return i.isMoved = !0, void(a.allowClick = !1);
                        if (i.allowTouchCallbacks && a.emit("touchMove", p), p.targetTouches && p.targetTouches.length > 1) return;
                        l.currentX = h, l.currentY = m;
                        const f = l.currentX - l.startX,
                            g = l.currentY - l.startY;
                        if (a.params.threshold && Math.sqrt(f ** 2 + g ** 2) < a.params.threshold) return;
                        if (void 0 === i.isScrolling) {
                            let e;
                            a.isHorizontal() && l.currentY === l.startY || a.isVertical() && l.currentX === l.startX ? i.isScrolling = !1 : f * f + g * g >= 25 && (e = 180 * Math.atan2(Math.abs(g), Math.abs(f)) / Math.PI, i.isScrolling = a.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle)
                        }
                        if (i.isScrolling && a.emit("touchMoveOpposite", p), void 0 === i.startMoving && (l.currentX === l.startX && l.currentY === l.startY || (i.startMoving = !0)), i.isScrolling) return void(i.isTouched = !1);
                        if (!i.startMoving) return;
                        a.allowClick = !1, !r.cssMode && p.cancelable && p.preventDefault(), r.touchMoveStopPropagation && !r.nested && p.stopPropagation(), i.isMoved || (r.loop && !r.cssMode && a.loopFix(), i.startTranslate = a.getTranslate(), a.setTransition(0), a.animating && a.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !r.grabCursor || !0 !== a.allowSlideNext && !0 !== a.allowSlidePrev || a.setGrabCursor(!0), a.emit("sliderFirstMove", p)), a.emit("sliderMove", p), i.isMoved = !0;
                        let v = a.isHorizontal() ? f : g;
                        l.diff = v, v *= r.touchRatio, d && (v = -v), a.swipeDirection = v > 0 ? "prev" : "next", i.currentTranslate = v + i.startTranslate;
                        let w = !0,
                            b = r.resistanceRatio;
                        if (r.touchReleaseOnEdges && (b = 0), v > 0 && i.currentTranslate > a.minTranslate() ? (w = !1, r.resistance && (i.currentTranslate = a.minTranslate() - 1 + (-a.minTranslate() + i.startTranslate + v) ** b)) : 0 > v && i.currentTranslate < a.maxTranslate() && (w = !1, r.resistance && (i.currentTranslate = a.maxTranslate() + 1 - (a.maxTranslate() - i.startTranslate - v) ** b)), w && (p.preventedByNestedSwiper = !0), !a.allowSlideNext && "next" === a.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !a.allowSlidePrev && "prev" === a.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), a.allowSlidePrev || a.allowSlideNext || (i.currentTranslate = i.startTranslate), r.threshold > 0) {
                            if (Math.abs(v) <= r.threshold && !i.allowThresholdMove) return void(i.currentTranslate = i.startTranslate);
                            if (!i.allowThresholdMove) return i.allowThresholdMove = !0, l.startX = l.currentX, l.startY = l.currentY, i.currentTranslate = i.startTranslate, void(l.diff = a.isHorizontal() ? l.currentX - l.startX : l.currentY - l.startY)
                        }
                        r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && a.freeMode || r.watchSlidesProgress) && (a.updateActiveIndex(), a.updateSlidesClasses()), a.params.freeMode && r.freeMode.enabled && a.freeMode && a.freeMode.onTouchMove(), a.updateProgress(i.currentTranslate), a.setTranslate(i.currentTranslate))
                    }.bind(e), e.onTouchEnd = function (e) {
                        const t = this,
                            s = t.touchEventsData,
                            {
                                params: a,
                                touches: i,
                                rtlTranslate: r,
                                slidesGrid: n,
                                enabled: d
                            } = t;
                        if (!d) return;
                        let c = e;
                        if (c.originalEvent && (c = c.originalEvent), s.allowTouchCallbacks && t.emit("touchEnd", c), s.allowTouchCallbacks = !1, !s.isTouched) return s.isMoved && a.grabCursor && t.setGrabCursor(!1), s.isMoved = !1, void(s.startMoving = !1);
                        a.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                        const p = o(),
                            u = p - s.touchStartTime;
                        if (t.allowClick) {
                            const e = c.path || c.composedPath && c.composedPath();
                            t.updateClickedSlide(e && e[0] || c.target), t.emit("tap click", c), 300 > u && 300 > p - s.lastClickTime && t.emit("doubleTap doubleClick", c)
                        }
                        if (s.lastClickTime = o(), l(() => {
                                t.destroyed || (t.allowClick = !0)
                            }), !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === i.diff || s.currentTranslate === s.startTranslate) return s.isTouched = !1, s.isMoved = !1, void(s.startMoving = !1);
                        let h;
                        if (s.isTouched = !1, s.isMoved = !1, s.startMoving = !1, h = a.followFinger ? r ? t.translate : -t.translate : -s.currentTranslate, a.cssMode) return;
                        if (t.params.freeMode && a.freeMode.enabled) return void t.freeMode.onTouchEnd({
                            currentPos: h
                        });
                        let m = 0,
                            f = t.slidesSizesGrid[0];
                        for (let e = 0; e < n.length; e += e < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup) {
                            const t = e < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
                            void 0 !== n[e + t] ? h >= n[e] && h < n[e + t] && (m = e, f = n[e + t] - n[e]) : h >= n[e] && (m = e, f = n[n.length - 1] - n[n.length - 2])
                        }
                        const g = (h - n[m]) / f,
                            v = m < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
                        if (u > a.longSwipesMs) {
                            if (!a.longSwipes) return void t.slideTo(t.activeIndex);
                            "next" === t.swipeDirection && (g < a.longSwipesRatio ? t.slideTo(m) : t.slideTo(m + v)), "prev" === t.swipeDirection && (g > 1 - a.longSwipesRatio ? t.slideTo(m + v) : t.slideTo(m))
                        } else {
                            if (!a.shortSwipes) return void t.slideTo(t.activeIndex);
                            !t.navigation || c.target !== t.navigation.nextEl && c.target !== t.navigation.prevEl ? ("next" === t.swipeDirection && t.slideTo(m + v), "prev" === t.swipeDirection && t.slideTo(m)) : c.target === t.navigation.nextEl ? t.slideTo(m + v) : t.slideTo(m)
                        }
                    }.bind(e), i.cssMode && (e.onScroll = function () {
                        const e = this,
                            {
                                wrapperEl: t,
                                rtlTranslate: s,
                                enabled: a
                            } = e;
                        if (!a) return;
                        let i;
                        e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, -0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
                        const r = e.maxTranslate() - e.minTranslate();
                        (i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r) !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
                    }.bind(e)), e.onClick = function (e) {
                        const t = this;
                        t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())))
                    }.bind(e), r.touch && !L && (t.addEventListener("touchstart", b), L = !0), A(e, "on")
                },
                detachEvents: function () {
                    A(this, "off")
                }
            },
            breakpoints: {
                setBreakpoint: function () {
                    const e = this,
                        {
                            activeIndex: t,
                            initialized: s,
                            loopedSlides: a = 0,
                            params: i,
                            $el: r
                        } = e,
                        n = i.breakpoints;
                    if (!n || n && 0 === Object.keys(n).length) return;
                    const l = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
                    if (!l || e.currentBreakpoint === l) return;
                    const o = (l in n ? n[l] : void 0) || e.originalParams,
                        d = D(e, i),
                        c = D(e, o),
                        u = i.enabled;
                    d && !c ? (r.removeClass(`${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`), e.emitContainerClasses()) : !d && c && (r.addClass(i.containerModifierClass + "grid"), (o.grid.fill && "column" === o.grid.fill || !o.grid.fill && "column" === i.grid.fill) && r.addClass(i.containerModifierClass + "grid-column"), e.emitContainerClasses());
                    const h = o.direction && o.direction !== i.direction,
                        m = i.loop && (o.slidesPerView !== i.slidesPerView || h);
                    h && s && e.changeDirection(), p(e.params, o);
                    const f = e.params.enabled;
                    Object.assign(e, {
                        allowTouchMove: e.params.allowTouchMove,
                        allowSlideNext: e.params.allowSlideNext,
                        allowSlidePrev: e.params.allowSlidePrev
                    }), u && !f ? e.disable() : !u && f && e.enable(), e.currentBreakpoint = l, e.emit("_beforeBreakpoint", o), m && s && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - a + e.loopedSlides, 0, !1)), e.emit("breakpoint", o)
                },
                getBreakpoint: function (e, t = "window", s) {
                    if (!e || "container" === t && !s) return;
                    let i = !1;
                    const r = a(),
                        n = "window" === t ? r.innerHeight : s.clientHeight,
                        l = Object.keys(e).map(e => {
                            if ("string" == typeof e && 0 === e.indexOf("@")) {
                                const t = parseFloat(e.substr(1));
                                return {
                                    value: n * t,
                                    point: e
                                }
                            }
                            return {
                                value: e,
                                point: e
                            }
                        });
                    l.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
                    for (let e = 0; e < l.length; e += 1) {
                        const {
                            point: a,
                            value: n
                        } = l[e];
                        "window" === t ? r.matchMedia(`(min-width: ${n}px)`).matches && (i = a) : n <= s.clientWidth && (i = a)
                    }
                    return i || "max"
                }
            },
            checkOverflow: {
                checkOverflow: function () {
                    const e = this,
                        {
                            isLocked: t,
                            params: s
                        } = e,
                        {
                            slidesOffsetBefore: a
                        } = s;
                    if (a) {
                        const t = e.slides.length - 1,
                            s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * a;
                        e.isLocked = e.size > s
                    } else e.isLocked = 1 === e.snapGrid.length;
                    !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
                }
            },
            classes: {
                addClasses: function () {
                    const e = this,
                        {
                            classNames: t,
                            params: s,
                            rtl: a,
                            $el: i,
                            device: r,
                            support: n
                        } = e,
                        l = function (e, t) {
                            const s = [];
                            return e.forEach(e => {
                                "object" == typeof e ? Object.keys(e).forEach(a => {
                                    e[a] && s.push(t + a)
                                }) : "string" == typeof e && s.push(t + e)
                            }), s
                        }(["initialized", s.direction, {
                            "pointer-events": !n.touch
                        }, {
                            "free-mode": e.params.freeMode && s.freeMode.enabled
                        }, {
                            autoheight: s.autoHeight
                        }, {
                            rtl: a
                        }, {
                            grid: s.grid && s.grid.rows > 1
                        }, {
                            "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
                        }, {
                            android: r.android
                        }, {
                            ios: r.ios
                        }, {
                            "css-mode": s.cssMode
                        }, {
                            centered: s.cssMode && s.centeredSlides
                        }], s.containerModifierClass);
                    t.push(...l), i.addClass([...t].join(" ")), e.emitContainerClasses()
                },
                removeClasses: function () {
                    const {
                        $el: e,
                        classNames: t
                    } = this;
                    e.removeClass(t.join(" ")), this.emitContainerClasses()
                }
            },
            images: {
                loadImage: function (e, t, s, i, r, l) {
                    function o() {
                        l && l()
                    }
                    const d = a();
                    let c;
                    n(e).parent("picture")[0] || e.complete && r ? o() : t ? ((c = new d.Image).onload = o, c.onerror = o, i && (c.sizes = i), s && (c.srcset = s), t && (c.src = t)) : o()
                },
                preloadImages: function () {
                    function e() {
                        null != t && t && !t.destroyed && (void 0 !== t.imagesLoaded && (t.imagesLoaded += 1), t.imagesLoaded === t.imagesToLoad.length && (t.params.updateOnImagesReady && t.update(), t.emit("imagesReady")))
                    }
                    const t = this;
                    t.imagesToLoad = t.$el.find("img");
                    for (let s = 0; s < t.imagesToLoad.length; s += 1) {
                        const a = t.imagesToLoad[s];
                        t.loadImage(a, a.currentSrc || a.getAttribute("src"), a.srcset || a.getAttribute("srcset"), a.sizes || a.getAttribute("sizes"), !0, e)
                    }
                }
            }
        },
        N = {};
    class H {
        constructor(...e) {
            let t, s;
            if (1 === e.length && e[0].constructor && "Object" === Object.prototype.toString.call(e[0]).slice(8, -1) ? s = e[0] : [t, s] = e, s || (s = {}), s = p({}, s), t && !s.el && (s.el = t), s.el && n(s.el).length > 1) {
                const e = [];
                return n(s.el).each(t => {
                    const a = p({}, s, {
                        el: t
                    });
                    e.push(new H(a))
                }), e
            }
            const a = this;
            a.__swiper__ = !0, a.support = m(), a.device = f({
                userAgent: s.userAgent
            }), a.browser = g(), a.eventsListeners = {}, a.eventsAnyListeners = [], a.modules = [...a.__modules__], s.modules && Array.isArray(s.modules) && a.modules.push(...s.modules);
            const i = {};
            a.modules.forEach(e => {
                e({
                    swiper: a,
                    extendParams: function (e, t) {
                        return function (s = {}) {
                            const a = Object.keys(s)[0],
                                i = s[a];
                            "object" == typeof i && null !== i ? (["navigation", "pagination", "scrollbar"].indexOf(a) >= 0 && !0 === e[a] && (e[a] = {
                                auto: !0
                            }), a in e && "enabled" in i ? (!0 === e[a] && (e[a] = {
                                enabled: !0
                            }), "object" != typeof e[a] || "enabled" in e[a] || (e[a].enabled = !0), e[a] || (e[a] = {
                                enabled: !1
                            }), p(t, s)) : p(t, s)) : p(t, s)
                        }
                    }(s, i),
                    on: a.on.bind(a),
                    once: a.once.bind(a),
                    off: a.off.bind(a),
                    emit: a.emit.bind(a)
                })
            });
            const r = p({}, G, i);
            return a.params = p({}, r, N, s), a.originalParams = p({}, a.params), a.passedParams = p({}, s), a.params && a.params.on && Object.keys(a.params.on).forEach(e => {
                a.on(e, a.params.on[e])
            }), a.params && a.params.onAny && a.onAny(a.params.onAny), a.$ = n, Object.assign(a, {
                enabled: a.params.enabled,
                el: t,
                classNames: [],
                slides: n(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: () => "horizontal" === a.params.direction,
                isVertical: () => "vertical" === a.params.direction,
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                allowSlideNext: a.params.allowSlideNext,
                allowSlidePrev: a.params.allowSlidePrev,
                touchEvents: function () {
                    const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
                        t = ["pointerdown", "pointermove", "pointerup"];
                    return a.touchEventsTouch = {
                        start: e[0],
                        move: e[1],
                        end: e[2],
                        cancel: e[3]
                    }, a.touchEventsDesktop = {
                        start: t[0],
                        move: t[1],
                        end: t[2]
                    }, a.support.touch || !a.params.simulateTouch ? a.touchEventsTouch : a.touchEventsDesktop
                }(),
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: a.params.focusableElements,
                    lastClickTime: o(),
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    isTouchEvent: void 0,
                    startMoving: void 0
                },
                allowClick: !0,
                allowTouchMove: a.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            }), a.emit("_swiper"), a.params.init && a.init(), a
        }
        enable() {
            const e = this;
            e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"))
        }
        disable() {
            const e = this;
            e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"))
        }
        setProgress(e, t) {
            const s = this;
            e = Math.min(Math.max(e, 0), 1);
            const a = s.minTranslate(),
                i = (s.maxTranslate() - a) * e + a;
            s.translateTo(i, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses()
        }
        emitContainerClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = e.el.className.split(" ").filter(t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass));
            e.emit("_containerClasses", t.join(" "))
        }
        getSlideClasses(e) {
            const t = this;
            return e.className.split(" ").filter(e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)).join(" ")
        }
        emitSlidesClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = [];
            e.slides.each(s => {
                const a = e.getSlideClasses(s);
                t.push({
                    slideEl: s,
                    classNames: a
                }), e.emit("_slideClass", s, a)
            }), e.emit("_slideClasses", t)
        }
        slidesPerViewDynamic(e = "current", t = !1) {
            const {
                params: s,
                slides: a,
                slidesGrid: i,
                slidesSizesGrid: r,
                size: n,
                activeIndex: l
            } = this;
            let o = 1;
            if (s.centeredSlides) {
                let e, t = a[l].swiperSlideSize;
                for (let s = l + 1; s < a.length; s += 1) a[s] && !e && (o += 1, (t += a[s].swiperSlideSize) > n && (e = !0));
                for (let s = l - 1; s >= 0; s -= 1) a[s] && !e && (o += 1, (t += a[s].swiperSlideSize) > n && (e = !0))
            } else if ("current" === e)
                for (let e = l + 1; e < a.length; e += 1)(t ? i[e] + r[e] - i[l] < n : i[e] - i[l] < n) && (o += 1);
            else
                for (let e = l - 1; e >= 0; e -= 1) i[l] - i[e] < n && (o += 1);
            return o
        }
        update() {
            function e() {
                const e = t.rtlTranslate ? -1 * t.translate : t.translate,
                    s = Math.min(Math.max(e, t.maxTranslate()), t.minTranslate());
                t.setTranslate(s), t.updateActiveIndex(), t.updateSlidesClasses()
            }
            const t = this;
            if (!t || t.destroyed) return;
            const {
                snapGrid: s,
                params: a
            } = t;
            let i;
            a.breakpoints && t.setBreakpoint(), t.updateSize(), t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.params.freeMode && t.params.freeMode.enabled ? (e(), t.params.autoHeight && t.updateAutoHeight()) : (i = "auto" !== t.params.slidesPerView && 1 >= t.params.slidesPerView || !t.isEnd || t.params.centeredSlides ? t.slideTo(t.activeIndex, 0, !1, !0) : t.slideTo(t.slides.length - 1, 0, !1, !0)) || e(), a.watchOverflow && s !== t.snapGrid && t.checkOverflow(), t.emit("update")
        }
        changeDirection(e, t = !0) {
            const s = this,
                a = s.params.direction;
            return e || (e = "horizontal" === a ? "vertical" : "horizontal"), e === a || "horizontal" !== e && "vertical" !== e || (s.$el.removeClass(`${s.params.containerModifierClass}${a}`).addClass(`${s.params.containerModifierClass}${e}`), s.emitContainerClasses(), s.params.direction = e, s.slides.each(t => {
                "vertical" === e ? t.style.width = "" : t.style.height = ""
            }), s.emit("changeDirection"), t && s.update()), s
        }
        mount(e) {
            const t = this;
            if (t.mounted) return !0;
            const a = n(e || t.params.el);
            if (!(e = a[0])) return !1;
            e.swiper = t;
            const i = () => "." + (t.params.wrapperClass || "").trim().split(" ").join(".");
            let r = (() => {
                if (e && e.shadowRoot && e.shadowRoot.querySelector) {
                    const t = n(e.shadowRoot.querySelector(i()));
                    return t.children = (e => a.children(e)), t
                }
                return a.children(i())
            })();
            if (0 === r.length && t.params.createElements) {
                const e = s().createElement("div");
                r = n(e), e.className = t.params.wrapperClass, a.append(e), a.children("." + t.params.slideClass).each(e => {
                    r.append(e)
                })
            }
            return Object.assign(t, {
                $el: a,
                el: e,
                $wrapperEl: r,
                wrapperEl: r[0],
                mounted: !0,
                rtl: "rtl" === e.dir.toLowerCase() || "rtl" === a.css("direction"),
                rtlTranslate: "horizontal" === t.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === a.css("direction")),
                wrongRTL: "-webkit-box" === r.css("display")
            }), !0
        }
        init(e) {
            const t = this;
            return t.initialized || !1 === t.mount(e) || (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.params.loop && t.loopCreate(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.preloadImages && t.preloadImages(), t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.attachEvents(), t.initialized = !0, t.emit("init"), t.emit("afterInit")), t
        }
        destroy(e = !0, t = !0) {
            const s = this,
                {
                    params: a,
                    $el: i,
                    $wrapperEl: r,
                    slides: n
                } = s;
            return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), a.loop && s.loopDestroy(), t && (s.removeClasses(), i.removeAttr("style"), r.removeAttr("style"), n && n.length && n.removeClass([a.slideVisibleClass, a.slideActiveClass, a.slideNextClass, a.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), s.emit("destroy"), Object.keys(s.eventsListeners).forEach(e => {
                s.off(e)
            }), !1 !== e && (s.$el[0].swiper = null, function (e) {
                const t = s;
                Object.keys(t).forEach(e => {
                    try {
                        t[e] = null
                    } catch (e) {}
                    try {
                        delete t[e]
                    } catch (e) {}
                })
            }()), s.destroyed = !0), null
        }
        static extendDefaults(e) {
            p(N, e)
        }
        static get extendedDefaults() {
            return N
        }
        static get defaults() {
            return G
        }
        static installModule(e) {
            H.prototype.__modules__ || (H.prototype.__modules__ = []);
            const t = H.prototype.__modules__;
            "function" == typeof e && 0 > t.indexOf(e) && t.push(e)
        }
        static use(e) {
            return Array.isArray(e) ? (e.forEach(e => H.installModule(e)), H) : (H.installModule(e), H)
        }
    }
    Object.keys(B).forEach(e => {
        Object.keys(B[e]).forEach(t => {
            H.prototype[t] = B[e][t]
        })
    }), H.use([function ({
        swiper: e,
        on: t,
        emit: s
    }) {
        const i = a();
        let r = null;
        const n = () => {
                e && !e.destroyed && e.initialized && (s("beforeResize"), s("resize"))
            },
            l = () => {
                e && !e.destroyed && e.initialized && s("orientationchange")
            };
        t("init", () => {
            e.params.resizeObserver && void 0 !== i.ResizeObserver ? e && !e.destroyed && e.initialized && (r = new ResizeObserver(t => {
                const {
                    width: s,
                    height: a
                } = e;
                let i = s,
                    r = a;
                t.forEach(({
                    contentBoxSize: t,
                    contentRect: s,
                    target: a
                }) => {
                    a && a !== e.el || (i = s ? s.width : (t[0] || t).inlineSize, r = s ? s.height : (t[0] || t).blockSize)
                }), i === s && r === a || n()
            })).observe(e.el) : (i.addEventListener("resize", n), i.addEventListener("orientationchange", l))
        }), t("destroy", () => {
            r && r.unobserve && e.el && (r.unobserve(e.el), r = null), i.removeEventListener("resize", n), i.removeEventListener("orientationchange", l)
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s,
        emit: i
    }) {
        const r = [],
            n = a(),
            l = (e, t = {}) => {
                const s = new(n.MutationObserver || n.WebkitMutationObserver)(e => {
                    if (1 === e.length) return void i("observerUpdate", e[0]);
                    const t = function () {
                        i("observerUpdate", e[0])
                    };
                    n.requestAnimationFrame ? n.requestAnimationFrame(t) : n.setTimeout(t, 0)
                });
                s.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData: void 0 === t.characterData || t.characterData
                }), r.push(s)
            };
        t({
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1
        }), s("init", () => {
            if (e.params.observer) {
                if (e.params.observeParents) {
                    const t = e.$el.parents();
                    for (let e = 0; e < t.length; e += 1) l(t[e])
                }
                l(e.$el[0], {
                    childList: e.params.observeSlideChildren
                }), l(e.$wrapperEl[0], {
                    attributes: !1
                })
            }
        }), s("destroy", () => {
            r.forEach(e => {
                e.disconnect()
            }), r.splice(0, r.length)
        })
    }]);
    const X = [function ({
        swiper: e,
        extendParams: t,
        on: s
    }) {
        function a(t, s) {
            const a = e.params.virtual;
            if (a.cache && e.virtual.cache[s]) return e.virtual.cache[s];
            const i = a.renderSlide ? n(a.renderSlide.call(e, t, s)) : n(`<div class="${e.params.slideClass}" data-swiper-slide-index="${s}">${t}</div>`);
            return i.attr("data-swiper-slide-index") || i.attr("data-swiper-slide-index", s), a.cache && (e.virtual.cache[s] = i), i
        }

        function i(t) {
            function s() {
                e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.lazy && e.params.lazy.enabled && e.lazy.load()
            }
            const {
                slidesPerView: i,
                slidesPerGroup: r,
                centeredSlides: n
            } = e.params, {
                addSlidesBefore: l,
                addSlidesAfter: o
            } = e.params.virtual, {
                from: d,
                to: c,
                slides: p,
                slidesGrid: u,
                offset: h
            } = e.virtual;
            e.params.cssMode || e.updateActiveIndex();
            const m = e.activeIndex || 0;
            let f, g, v;
            f = e.rtlTranslate ? "right" : e.isHorizontal() ? "left" : "top", n ? (g = Math.floor(i / 2) + r + o, v = Math.floor(i / 2) + r + l) : (g = i + (r - 1) + o, v = r + l);
            const w = Math.max((m || 0) - v, 0),
                b = Math.min((m || 0) + g, p.length - 1),
                x = (e.slidesGrid[w] || 0) - (e.slidesGrid[0] || 0);
            if (Object.assign(e.virtual, {
                    from: w,
                    to: b,
                    offset: x,
                    slidesGrid: e.slidesGrid
                }), d === w && c === b && !t) return e.slidesGrid !== u && x !== h && e.slides.css(f, x + "px"), void e.updateProgress();
            if (e.params.virtual.renderExternal) return e.params.virtual.renderExternal.call(e, {
                offset: x,
                from: w,
                to: b,
                slides: function () {
                    const e = [];
                    for (let t = w; b >= t; t += 1) e.push(p[t]);
                    return e
                }()
            }), void(e.params.virtual.renderExternalUpdate && s());
            const y = [],
                E = [];
            if (t) e.$wrapperEl.find("." + e.params.slideClass).remove();
            else
                for (let t = d; c >= t; t += 1)(w > t || t > b) && e.$wrapperEl.find(`.${e.params.slideClass}[data-swiper-slide-index="${t}"]`).remove();
            for (let e = 0; e < p.length; e += 1) e >= w && b >= e && (void 0 === c || t ? E.push(e) : (e > c && E.push(e), d > e && y.push(e)));
            E.forEach(t => {
                e.$wrapperEl.append(a(p[t], t))
            }), y.sort((e, t) => t - e).forEach(t => {
                e.$wrapperEl.prepend(a(p[t], t))
            }), e.$wrapperEl.children(".swiper-slide").css(f, x + "px"), s()
        }
        let r;
        t({
            virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null,
                renderExternalUpdate: !0,
                addSlidesBefore: 0,
                addSlidesAfter: 0
            }
        }), e.virtual = {
            cache: {},
            from: void 0,
            to: void 0,
            slides: [],
            offset: 0,
            slidesGrid: []
        }, s("beforeInit", () => {
            e.params.virtual.enabled && (e.virtual.slides = e.params.virtual.slides, e.classNames.push(e.params.containerModifierClass + "virtual"), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0, e.params.initialSlide || i())
        }), s("setTranslate", () => {
            e.params.virtual.enabled && (e.params.cssMode && !e._immediateVirtual ? (clearTimeout(r), r = setTimeout(() => {
                i()
            }, 100)) : i())
        }), s("init update resize", () => {
            e.params.virtual.enabled && e.params.cssMode && u(e.wrapperEl, "--swiper-virtual-size", e.virtualSize + "px")
        }), Object.assign(e.virtual, {
            appendSlide: function (t) {
                if ("object" == typeof t && "length" in t)
                    for (let s = 0; s < t.length; s += 1) t[s] && e.virtual.slides.push(t[s]);
                else e.virtual.slides.push(t);
                i(!0)
            },
            prependSlide: function (t) {
                const s = e.activeIndex;
                let a = s + 1,
                    r = 1;
                if (Array.isArray(t)) {
                    for (let s = 0; s < t.length; s += 1) t[s] && e.virtual.slides.unshift(t[s]);
                    a = s + t.length, r = t.length
                } else e.virtual.slides.unshift(t);
                if (e.params.virtual.cache) {
                    const t = e.virtual.cache,
                        s = {};
                    Object.keys(t).forEach(e => {
                        const a = t[e],
                            i = a.attr("data-swiper-slide-index");
                        i && a.attr("data-swiper-slide-index", parseInt(i, 10) + r), s[parseInt(e, 10) + r] = a
                    }), e.virtual.cache = s
                }
                i(!0), e.slideTo(a, 0)
            },
            removeSlide: function (t) {
                if (null == t) return;
                let s = e.activeIndex;
                if (Array.isArray(t))
                    for (let a = t.length - 1; a >= 0; a -= 1) e.virtual.slides.splice(t[a], 1), e.params.virtual.cache && delete e.virtual.cache[t[a]], t[a] < s && (s -= 1), s = Math.max(s, 0);
                else e.virtual.slides.splice(t, 1), e.params.virtual.cache && delete e.virtual.cache[t], s > t && (s -= 1), s = Math.max(s, 0);
                i(!0), e.slideTo(s, 0)
            },
            removeAllSlides: function () {
                e.virtual.slides = [], e.params.virtual.cache && (e.virtual.cache = {}), i(!0), e.slideTo(0, 0)
            },
            update: i
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: i,
        emit: r
    }) {
        function l(t) {
            if (!e.enabled) return;
            const {
                rtlTranslate: s
            } = e;
            let a = t;
            a.originalEvent && (a = a.originalEvent);
            const i = a.keyCode || a.charCode,
                n = e.params.keyboard.pageUpDown,
                l = n && 33 === i,
                o = n && 34 === i,
                d = 37 === i,
                u = 39 === i,
                h = 38 === i,
                m = 40 === i;
            if (!e.allowSlideNext && (e.isHorizontal() && u || e.isVertical() && m || o)) return !1;
            if (!e.allowSlidePrev && (e.isHorizontal() && d || e.isVertical() && h || l)) return !1;
            if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || c.activeElement && c.activeElement.nodeName && ("input" === c.activeElement.nodeName.toLowerCase() || "textarea" === c.activeElement.nodeName.toLowerCase()))) {
                if (e.params.keyboard.onlyInViewport && (l || o || d || u || h || m)) {
                    let t = !1;
                    if (e.$el.parents("." + e.params.slideClass).length > 0 && 0 === e.$el.parents("." + e.params.slideActiveClass).length) return;
                    const a = e.$el,
                        i = a[0].clientWidth,
                        r = a[0].clientHeight,
                        n = p.innerWidth,
                        l = p.innerHeight,
                        o = e.$el.offset();
                    s && (o.left -= e.$el[0].scrollLeft);
                    const d = [
                        [o.left, o.top],
                        [o.left + i, o.top],
                        [o.left, o.top + r],
                        [o.left + i, o.top + r]
                    ];
                    for (let e = 0; e < d.length; e += 1) {
                        const s = d[e];
                        if (!(0 > s[0] || s[0] > n || 0 > s[1] || s[1] > l)) {
                            if (0 === s[0] && 0 === s[1]) continue;
                            t = !0
                        }
                    }
                    if (!t) return
                }
                e.isHorizontal() ? ((l || o || d || u) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), ((o || u) && !s || (l || d) && s) && e.slideNext(), ((l || d) && !s || (o || u) && s) && e.slidePrev()) : ((l || o || h || m) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (o || m) && e.slideNext(), (l || h) && e.slidePrev()), r("keyPress", i)
            }
        }

        function o() {
            e.keyboard.enabled || (n(c).on("keydown", l), e.keyboard.enabled = !0)
        }

        function d() {
            e.keyboard.enabled && (n(c).off("keydown", l), e.keyboard.enabled = !1)
        }
        const c = s(),
            p = a();
        e.keyboard = {
            enabled: !1
        }, t({
            keyboard: {
                enabled: !1,
                onlyInViewport: !0,
                pageUpDown: !0
            }
        }), i("init", () => {
            e.params.keyboard.enabled && o()
        }), i("destroy", () => {
            e.keyboard.enabled && d()
        }), Object.assign(e.keyboard, {
            enable: o,
            disable: d
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s,
        emit: i
    }) {
        function r() {
            e.enabled && (e.mouseEntered = !0)
        }

        function d() {
            e.enabled && (e.mouseEntered = !1)
        }

        function c(t) {
            return !(e.params.mousewheel.thresholdDelta && t.delta < e.params.mousewheel.thresholdDelta || e.params.mousewheel.thresholdTime && o() - w < e.params.mousewheel.thresholdTime || (6 > t.delta || o() - w >= 60) && (0 > t.direction ? e.isEnd && !e.params.loop || e.animating || (e.slideNext(), i("scroll", t.raw)) : e.isBeginning && !e.params.loop || e.animating || (e.slidePrev(), i("scroll", t.raw)), w = (new f.Date).getTime(), 1))
        }

        function p(t) {
            let s = t,
                a = !0;
            if (!e.enabled) return;
            const r = e.params.mousewheel;
            e.params.cssMode && s.preventDefault();
            let d = e.$el;
            if ("container" !== e.params.mousewheel.eventsTarget && (d = n(e.params.mousewheel.eventsTarget)), !e.mouseEntered && !d[0].contains(s.target) && !r.releaseOnEdges) return !0;
            s.originalEvent && (s = s.originalEvent);
            let p = 0;
            const u = e.rtlTranslate ? -1 : 1,
                h = function (e) {
                    let t = 0,
                        s = 0,
                        a = 0,
                        i = 0;
                    return "detail" in e && (s = e.detail), "wheelDelta" in e && (s = -e.wheelDelta / 120), "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = s, s = 0), a = 10 * t, i = 10 * s, "deltaY" in e && (i = e.deltaY), "deltaX" in e && (a = e.deltaX), e.shiftKey && !a && (a = i, i = 0), (a || i) && e.deltaMode && (1 === e.deltaMode ? (a *= 40, i *= 40) : (a *= 800, i *= 800)), a && !t && (t = 1 > a ? -1 : 1), i && !s && (s = 1 > i ? -1 : 1), {
                        spinX: t,
                        spinY: s,
                        pixelX: a,
                        pixelY: i
                    }
                }(s);
            if (r.forceToAxis)
                if (e.isHorizontal()) {
                    if (Math.abs(h.pixelX) <= Math.abs(h.pixelY)) return !0;
                    p = -h.pixelX * u
                } else {
                    if (Math.abs(h.pixelY) <= Math.abs(h.pixelX)) return !0;
                    p = -h.pixelY
                }
            else p = Math.abs(h.pixelX) > Math.abs(h.pixelY) ? -h.pixelX * u : -h.pixelY;
            if (0 === p) return !0;
            r.invert && (p = -p);
            let m = e.getTranslate() + p * r.sensitivity;
            if (m >= e.minTranslate() && (m = e.minTranslate()), m <= e.maxTranslate() && (m = e.maxTranslate()), (a = !!e.params.loop || !(m === e.minTranslate() || m === e.maxTranslate())) && e.params.nested && s.stopPropagation(), e.params.freeMode && e.params.freeMode.enabled) {
                const t = {
                        time: o(),
                        delta: Math.abs(p),
                        direction: Math.sign(p)
                    },
                    a = v && t.time < v.time + 500 && t.delta <= v.delta && t.direction === v.direction;
                if (!a) {
                    v = void 0, e.params.loop && e.loopFix();
                    let n = e.getTranslate() + p * r.sensitivity;
                    const o = e.isBeginning,
                        d = e.isEnd;
                    if (n >= e.minTranslate() && (n = e.minTranslate()), n <= e.maxTranslate() && (n = e.maxTranslate()), e.setTransition(0), e.setTranslate(n), e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses(), (!o && e.isBeginning || !d && e.isEnd) && e.updateSlidesClasses(), e.params.freeMode.sticky) {
                        clearTimeout(g), g = void 0, b.length >= 15 && b.shift();
                        const s = b.length ? b[b.length - 1] : void 0,
                            a = b[0];
                        if (b.push(t), s && (t.delta > s.delta || t.direction !== s.direction)) b.splice(0);
                        else if (b.length >= 15 && 500 > t.time - a.time && a.delta - t.delta >= 1 && 6 >= t.delta) {
                            const s = p > 0 ? .8 : .2;
                            v = t, b.splice(0), g = l(() => {
                                e.slideToClosest(e.params.speed, !0, void 0, s)
                            }, 0)
                        }
                        g || (g = l(() => {
                            v = t, b.splice(0), e.slideToClosest(e.params.speed, !0, void 0, .5)
                        }, 500))
                    }
                    if (a || i("scroll", s), e.params.autoplay && e.params.autoplayDisableOnInteraction && e.autoplay.stop(), n === e.minTranslate() || n === e.maxTranslate()) return !0
                }
            } else {
                const s = {
                    time: o(),
                    delta: Math.abs(p),
                    direction: Math.sign(p),
                    raw: t
                };
                b.length >= 2 && b.shift();
                const a = b.length ? b[b.length - 1] : void 0;
                if (b.push(s), a ? (s.direction !== a.direction || s.delta > a.delta || s.time > a.time + 150) && c(s) : c(s), function (t) {
                        const s = e.params.mousewheel;
                        if (0 > t.direction) {
                            if (e.isEnd && !e.params.loop && s.releaseOnEdges) return !0
                        } else if (e.isBeginning && !e.params.loop && s.releaseOnEdges) return !0;
                        return !1
                    }(s)) return !0
            }
            return s.preventDefault ? s.preventDefault() : s.returnValue = !1, !1
        }

        function u(t) {
            let s = e.$el;
            "container" !== e.params.mousewheel.eventsTarget && (s = n(e.params.mousewheel.eventsTarget)), s[t]("mouseenter", r), s[t]("mouseleave", d), s[t]("wheel", p)
        }

        function h() {
            return e.params.cssMode ? (e.wrapperEl.removeEventListener("wheel", p), !0) : !e.mousewheel.enabled && (u("on"), e.mousewheel.enabled = !0, !0)
        }

        function m() {
            return e.params.cssMode ? (e.wrapperEl.addEventListener(event, p), !0) : !!e.mousewheel.enabled && (u("off"), e.mousewheel.enabled = !1, !0)
        }
        const f = a();
        let g;
        t({
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarget: "container",
                thresholdDelta: null,
                thresholdTime: null
            }
        }), e.mousewheel = {
            enabled: !1
        };
        let v, w = o();
        const b = [];
        s("init", () => {
            !e.params.mousewheel.enabled && e.params.cssMode && m(), e.params.mousewheel.enabled && h()
        }), s("destroy", () => {
            e.params.cssMode && h(), e.mousewheel.enabled && m()
        }), Object.assign(e.mousewheel, {
            enable: h,
            disable: m
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s,
        emit: a
    }) {
        function i(t) {
            let s;
            return t && (s = n(t), e.params.uniqueNavElements && "string" == typeof t && s.length > 1 && 1 === e.$el.find(t).length && (s = e.$el.find(t))), s
        }

        function r(t, s) {
            const a = e.params.navigation;
            t && t.length > 0 && (t[s ? "addClass" : "removeClass"](a.disabledClass), t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = s), e.params.watchOverflow && e.enabled && t[e.isLocked ? "addClass" : "removeClass"](a.lockClass))
        }

        function l() {
            if (e.params.loop) return;
            const {
                $nextEl: t,
                $prevEl: s
            } = e.navigation;
            r(s, e.isBeginning && !e.params.rewind), r(t, e.isEnd && !e.params.rewind)
        }

        function o(t) {
            t.preventDefault(), (!e.isBeginning || e.params.loop || e.params.rewind) && e.slidePrev()
        }

        function d(t) {
            t.preventDefault(), (!e.isEnd || e.params.loop || e.params.rewind) && e.slideNext()
        }

        function c() {
            const t = e.params.navigation;
            if (e.params.navigation = x(e, e.originalParams.navigation, e.params.navigation, {
                    nextEl: "swiper-button-next",
                    prevEl: "swiper-button-prev"
                }), !t.nextEl && !t.prevEl) return;
            const s = i(t.nextEl),
                a = i(t.prevEl);
            s && s.length > 0 && s.on("click", d), a && a.length > 0 && a.on("click", o), Object.assign(e.navigation, {
                $nextEl: s,
                nextEl: s && s[0],
                $prevEl: a,
                prevEl: a && a[0]
            }), e.enabled || (s && s.addClass(t.lockClass), a && a.addClass(t.lockClass))
        }

        function p() {
            const {
                $nextEl: t,
                $prevEl: s
            } = e.navigation;
            t && t.length && (t.off("click", d), t.removeClass(e.params.navigation.disabledClass)), s && s.length && (s.off("click", o), s.removeClass(e.params.navigation.disabledClass))
        }
        t({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock"
            }
        }), e.navigation = {
            nextEl: null,
            $nextEl: null,
            prevEl: null,
            $prevEl: null
        }, s("init", () => {
            c(), l()
        }), s("toEdge fromEdge lock unlock", () => {
            l()
        }), s("destroy", () => {
            p()
        }), s("enable disable", () => {
            const {
                $nextEl: t,
                $prevEl: s
            } = e.navigation;
            t && t[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass), s && s[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass)
        }), s("click", (t, s) => {
            const {
                $nextEl: i,
                $prevEl: r
            } = e.navigation, l = s.target;
            if (e.params.navigation.hideOnClick && !n(l).is(r) && !n(l).is(i)) {
                if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === l || e.pagination.el.contains(l))) return;
                let t;
                i ? t = i.hasClass(e.params.navigation.hiddenClass) : r && (t = r.hasClass(e.params.navigation.hiddenClass)), a(!0 === t ? "navigationShow" : "navigationHide"), i && i.toggleClass(e.params.navigation.hiddenClass), r && r.toggleClass(e.params.navigation.hiddenClass)
            }
        }), Object.assign(e.navigation, {
            update: l,
            init: c,
            destroy: p
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s,
        emit: a
    }) {
        function i() {
            return !e.params.pagination.el || !e.pagination.el || !e.pagination.$el || 0 === e.pagination.$el.length
        }

        function r(t, s) {
            const {
                bulletActiveClass: a
            } = e.params.pagination;
            t[s]().addClass(`${a}-${s}`)[s]().addClass(`${a}-${s}-${s}`)
        }

        function l() {
            const t = e.rtl,
                s = e.params.pagination;
            if (i()) return;
            const l = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                o = e.pagination.$el;
            let d;
            const c = e.params.loop ? Math.ceil((l - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
            if (e.params.loop ? ((d = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > l - 1 - 2 * e.loopedSlides && (d -= l - 2 * e.loopedSlides), d > c - 1 && (d -= c), 0 > d && "bullets" !== e.params.paginationType && (d = c + d)) : d = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === s.type && e.pagination.bullets && e.pagination.bullets.length > 0) {
                const a = e.pagination.bullets;
                let i, l, c;
                if (s.dynamicBullets && (u = a.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), o.css(e.isHorizontal() ? "width" : "height", u * (s.dynamicMainBullets + 4) + "px"), s.dynamicMainBullets > 1 && void 0 !== e.previousIndex && ((h += d - (e.previousIndex - e.loopedSlides || 0)) > s.dynamicMainBullets - 1 ? h = s.dynamicMainBullets - 1 : 0 > h && (h = 0)), c = ((l = (i = Math.max(d - h, 0)) + (Math.min(a.length, s.dynamicMainBullets) - 1)) + i) / 2), a.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(e => `${s.bulletActiveClass}${e}`).join(" ")), o.length > 1) a.each(e => {
                    const t = n(e),
                        a = t.index();
                    a === d && t.addClass(s.bulletActiveClass), s.dynamicBullets && (a >= i && l >= a && t.addClass(s.bulletActiveClass + "-main"), a === i && r(t, "prev"), a === l && r(t, "next"))
                });
                else {
                    const t = a.eq(d),
                        n = t.index();
                    if (t.addClass(s.bulletActiveClass), s.dynamicBullets) {
                        const t = a.eq(i),
                            o = a.eq(l);
                        for (let e = i; l >= e; e += 1) a.eq(e).addClass(s.bulletActiveClass + "-main");
                        if (e.params.loop)
                            if (n < a.length) r(t, "prev"), r(o, "next");
                            else {
                                for (let e = s.dynamicMainBullets; e >= 0; e -= 1) a.eq(a.length - e).addClass(s.bulletActiveClass + "-main");
                                a.eq(a.length - s.dynamicMainBullets - 1).addClass(s.bulletActiveClass + "-prev")
                            }
                        else r(t, "prev"), r(o, "next")
                    }
                }
                if (s.dynamicBullets) {
                    const i = Math.min(a.length, s.dynamicMainBullets + 4),
                        r = (u * i - u) / 2 - c * u,
                        n = t ? "right" : "left";
                    a.css(e.isHorizontal() ? n : "top", r + "px")
                }
            }
            if ("fraction" === s.type && (o.find(y(s.currentClass)).text(s.formatFractionCurrent(d + 1)), o.find(y(s.totalClass)).text(s.formatFractionTotal(c))), "progressbar" === s.type) {
                let t;
                t = s.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                const a = (d + 1) / c;
                let i = 1,
                    r = 1;
                "horizontal" === t ? i = a : r = a, o.find(y(s.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${i}) scaleY(${r})`).transition(e.params.speed)
            }
            "custom" === s.type && s.renderCustom ? (o.html(s.renderCustom(e, d + 1, c)), a("paginationRender", o[0])) : a("paginationUpdate", o[0]), e.params.watchOverflow && e.enabled && o[e.isLocked ? "addClass" : "removeClass"](s.lockClass)
        }

        function o() {
            const t = e.params.pagination;
            if (i()) return;
            const s = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                r = e.pagination.$el;
            let n = "";
            if ("bullets" === t.type) {
                let a = e.params.loop ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                e.params.freeMode && e.params.freeMode.enabled && !e.params.loop && a > s && (a = s);
                for (let s = 0; a > s; s += 1) t.renderBullet ? n += t.renderBullet.call(e, s, t.bulletClass) : n += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`;
                r.html(n), e.pagination.bullets = r.find(y(t.bulletClass))
            }
            "fraction" === t.type && (n = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`, r.html(n)), "progressbar" === t.type && (n = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : `<span class="${t.progressbarFillClass}"></span>`, r.html(n)), "custom" !== t.type && a("paginationRender", e.pagination.$el[0])
        }

        function d() {
            e.params.pagination = x(e, e.originalParams.pagination, e.params.pagination, {
                el: "swiper-pagination"
            });
            const t = e.params.pagination;
            if (!t.el) return;
            let s = n(t.el);
            0 !== s.length && (e.params.uniqueNavElements && "string" == typeof t.el && s.length > 1 && ((s = e.$el.find(t.el)).length > 1 && (s = s.filter(t => n(t).parents(".swiper")[0] === e.el))), "bullets" === t.type && t.clickable && s.addClass(t.clickableClass), s.addClass(t.modifierClass + t.type), s.addClass(t.modifierClass + e.params.direction), "bullets" === t.type && t.dynamicBullets && (s.addClass(`${t.modifierClass}${t.type}-dynamic`), h = 0, 1 > t.dynamicMainBullets && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && s.addClass(t.progressbarOppositeClass), t.clickable && s.on("click", y(t.bulletClass), function (t) {
                t.preventDefault();
                let s = n(this).index() * e.params.slidesPerGroup;
                e.params.loop && (s += e.loopedSlides), e.slideTo(s)
            }), Object.assign(e.pagination, {
                $el: s,
                el: s[0]
            }), e.enabled || s.addClass(t.lockClass))
        }

        function c() {
            const t = e.params.pagination;
            if (i()) return;
            const s = e.pagination.$el;
            s.removeClass(t.hiddenClass), s.removeClass(t.modifierClass + t.type), s.removeClass(t.modifierClass + e.params.direction), e.pagination.bullets && e.pagination.bullets.removeClass && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && s.off("click", y(t.bulletClass))
        }
        const p = "swiper-pagination";
        let u;
        t({
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: e => e,
                formatFractionTotal: e => e,
                bulletClass: p + "-bullet",
                bulletActiveClass: p + "-bullet-active",
                modifierClass: p + "-",
                currentClass: p + "-current",
                totalClass: p + "-total",
                hiddenClass: p + "-hidden",
                progressbarFillClass: p + "-progressbar-fill",
                progressbarOppositeClass: p + "-progressbar-opposite",
                clickableClass: p + "-clickable",
                lockClass: p + "-lock",
                horizontalClass: p + "-horizontal",
                verticalClass: p + "-vertical"
            }
        }), e.pagination = {
            el: null,
            $el: null,
            bullets: []
        };
        let h = 0;
        s("init", () => {
            d(), o(), l()
        }), s("activeIndexChange", () => {
            (e.params.loop || void 0 === e.snapIndex) && l()
        }), s("snapIndexChange", () => {
            e.params.loop || l()
        }), s("slidesLengthChange", () => {
            e.params.loop && (o(), l())
        }), s("snapGridLengthChange", () => {
            e.params.loop || (o(), l())
        }), s("destroy", () => {
            c()
        }), s("enable disable", () => {
            const {
                $el: t
            } = e.pagination;
            t && t[e.enabled ? "removeClass" : "addClass"](e.params.pagination.lockClass)
        }), s("lock unlock", () => {
            l()
        }), s("click", (t, s) => {
            const i = s.target,
                {
                    $el: r
                } = e.pagination;
            if (e.params.pagination.el && e.params.pagination.hideOnClick && r.length > 0 && !n(i).hasClass(e.params.pagination.bulletClass)) {
                if (e.navigation && (e.navigation.nextEl && i === e.navigation.nextEl || e.navigation.prevEl && i === e.navigation.prevEl)) return;
                const t = r.hasClass(e.params.pagination.hiddenClass);
                a(!0 === t ? "paginationShow" : "paginationHide"), r.toggleClass(e.params.pagination.hiddenClass)
            }
        }), Object.assign(e.pagination, {
            render: o,
            update: l,
            init: d,
            destroy: c
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: a,
        emit: i
    }) {
        function r() {
            if (!e.params.scrollbar.el || !e.scrollbar.el) return;
            const {
                scrollbar: t,
                rtlTranslate: s,
                progress: a
            } = e, {
                $dragEl: i,
                $el: r
            } = t, n = e.params.scrollbar;
            let l = b,
                o = (y - b) * a;
            s ? (o = -o) > 0 ? (l = b - o, o = 0) : -o + b > y && (l = y + o) : 0 > o ? (l = b + o, o = 0) : o + b > y && (l = y - o), e.isHorizontal() ? (i.transform(`translate3d(${o}px, 0, 0)`), i[0].style.width = l + "px") : (i.transform(`translate3d(0px, ${o}px, 0)`), i[0].style.height = l + "px"), n.hide && (clearTimeout(C), r[0].style.opacity = 1, C = setTimeout(() => {
                r[0].style.opacity = 0, r.transition(400)
            }, 1e3))
        }

        function o() {
            if (!e.params.scrollbar.el || !e.scrollbar.el) return;
            const {
                scrollbar: t
            } = e, {
                $dragEl: s,
                $el: a
            } = t;
            s[0].style.width = "", s[0].style.height = "", y = e.isHorizontal() ? a[0].offsetWidth : a[0].offsetHeight, E = e.size / (e.virtualSize + e.params.slidesOffsetBefore - (e.params.centeredSlides ? e.snapGrid[0] : 0)), b = "auto" === e.params.scrollbar.dragSize ? y * E : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? s[0].style.width = b + "px" : s[0].style.height = b + "px", a[0].style.display = 1 > E ? "" : "none", e.params.scrollbar.hide && (a[0].style.opacity = 0), e.params.watchOverflow && e.enabled && t.$el[e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
        }

        function d(t) {
            return e.isHorizontal() ? "touchstart" === t.type || "touchmove" === t.type ? t.targetTouches[0].clientX : t.clientX : "touchstart" === t.type || "touchmove" === t.type ? t.targetTouches[0].clientY : t.clientY
        }

        function c(t) {
            const {
                scrollbar: s,
                rtlTranslate: a
            } = e, {
                $el: i
            } = s;
            let r;
            r = (d(t) - i.offset()[e.isHorizontal() ? "left" : "top"] - (null !== w ? w : b / 2)) / (y - b), r = Math.max(Math.min(r, 1), 0), a && (r = 1 - r);
            const n = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * r;
            e.updateProgress(n), e.setTranslate(n), e.updateActiveIndex(), e.updateSlidesClasses()
        }

        function p(t) {
            const s = e.params.scrollbar,
                {
                    scrollbar: a,
                    $wrapperEl: r
                } = e,
                {
                    $el: n,
                    $dragEl: l
                } = a;
            T = !0, w = t.target === l[0] || t.target === l ? d(t) - t.target.getBoundingClientRect()[e.isHorizontal() ? "left" : "top"] : null, t.preventDefault(), t.stopPropagation(), r.transition(100), l.transition(100), c(t), clearTimeout(S), n.transition(0), s.hide && n.css("opacity", 1), e.params.cssMode && e.$wrapperEl.css("scroll-snap-type", "none"), i("scrollbarDragStart", t)
        }

        function u(t) {
            const {
                scrollbar: s,
                $wrapperEl: a
            } = e, {
                $el: r,
                $dragEl: n
            } = s;
            T && (t.preventDefault ? t.preventDefault() : t.returnValue = !1, c(t), a.transition(0), r.transition(0), n.transition(0), i("scrollbarDragMove", t))
        }

        function h(t) {
            const s = e.params.scrollbar,
                {
                    scrollbar: a,
                    $wrapperEl: r
                } = e,
                {
                    $el: n
                } = a;
            T && (T = !1, e.params.cssMode && (e.$wrapperEl.css("scroll-snap-type", ""), r.transition("")), s.hide && (clearTimeout(S), S = l(() => {
                n.css("opacity", 0), n.transition(400)
            }, 1e3)), i("scrollbarDragEnd", t), s.snapOnRelease && e.slideToClosest())
        }

        function m(t) {
            const {
                scrollbar: s,
                touchEventsTouch: a,
                touchEventsDesktop: i,
                params: r,
                support: n
            } = e, l = s.$el[0], o = !(!n.passiveListener || !r.passiveListeners) && {
                passive: !1,
                capture: !1
            }, d = !(!n.passiveListener || !r.passiveListeners) && {
                passive: !0,
                capture: !1
            };
            if (!l) return;
            const c = "on" === t ? "addEventListener" : "removeEventListener";
            n.touch ? (l[c](a.start, p, o), l[c](a.move, u, o), l[c](a.end, h, d)) : (l[c](i.start, p, o), v[c](i.move, u, o), v[c](i.end, h, d))
        }

        function f() {
            const {
                scrollbar: t,
                $el: s
            } = e;
            e.params.scrollbar = x(e, e.originalParams.scrollbar, e.params.scrollbar, {
                el: "swiper-scrollbar"
            });
            const a = e.params.scrollbar;
            if (!a.el) return;
            let i = n(a.el);
            e.params.uniqueNavElements && "string" == typeof a.el && i.length > 1 && 1 === s.find(a.el).length && (i = s.find(a.el));
            let r = i.find("." + e.params.scrollbar.dragClass);
            0 === r.length && (r = n(`<div class="${e.params.scrollbar.dragClass}"></div>`), i.append(r)), Object.assign(t, {
                $el: i,
                el: i[0],
                $dragEl: r,
                dragEl: r[0]
            }), a.draggable && e.params.scrollbar.el && m("on"), i && i[e.enabled ? "removeClass" : "addClass"](e.params.scrollbar.lockClass)
        }

        function g() {
            e.params.scrollbar.el && m("off")
        }
        const v = s();
        let w, b, y, E, T = !1,
            C = null,
            S = null;
        t({
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag"
            }
        }), e.scrollbar = {
            el: null,
            dragEl: null,
            $el: null,
            $dragEl: null
        }, a("init", () => {
            f(), o(), r()
        }), a("update resize observerUpdate lock unlock", () => {
            o()
        }), a("setTranslate", () => {
            r()
        }), a("setTransition", (t, s) => {
            ! function (t) {
                e.params.scrollbar.el && e.scrollbar.el && e.scrollbar.$dragEl.transition(t)
            }(s)
        }), a("enable disable", () => {
            const {
                $el: t
            } = e.scrollbar;
            t && t[e.enabled ? "removeClass" : "addClass"](e.params.scrollbar.lockClass)
        }), a("destroy", () => {
            g()
        }), Object.assign(e.scrollbar, {
            updateSize: o,
            setTranslate: r,
            init: f,
            destroy: g
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s
    }) {
        t({
            parallax: {
                enabled: !1
            }
        });
        const a = (t, s) => {
                const {
                    rtl: a
                } = e, i = n(t), r = a ? -1 : 1, l = i.attr("data-swiper-parallax") || "0";
                let o = i.attr("data-swiper-parallax-x"),
                    d = i.attr("data-swiper-parallax-y");
                const c = i.attr("data-swiper-parallax-scale"),
                    p = i.attr("data-swiper-parallax-opacity");
                if (o || d ? (o = o || "0", d = d || "0") : e.isHorizontal() ? (o = l, d = "0") : (d = l, o = "0"), o = 0 > o.indexOf("%") ? o * s * r + "px" : parseInt(o, 10) * s * r + "%", d = 0 > d.indexOf("%") ? d * s + "px" : parseInt(d, 10) * s + "%", null != p) {
                    const e = p - (p - 1) * (1 - Math.abs(s));
                    i[0].style.opacity = e
                }
                if (null == c) i.transform(`translate3d(${o}, ${d}, 0px)`);
                else {
                    const e = c - (c - 1) * (1 - Math.abs(s));
                    i.transform(`translate3d(${o}, ${d}, 0px) scale(${e})`)
                }
            },
            i = () => {
                const {
                    $el: t,
                    slides: s,
                    progress: i,
                    snapGrid: r
                } = e;
                t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
                    a(e, i)
                }), s.each((t, s) => {
                    let l = t.progress;
                    e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (l += Math.ceil(s / 2) - i * (r.length - 1)), l = Math.min(Math.max(l, -1), 1), n(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
                        a(e, l)
                    })
                })
            };
        s("beforeInit", () => {
            e.params.parallax.enabled && (e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
        }), s("init", () => {
            e.params.parallax.enabled && i()
        }), s("setTranslate", () => {
            e.params.parallax.enabled && i()
        }), s("setTransition", (t, s) => {
            e.params.parallax.enabled && ((t = e.params.speed) => {
                const {
                    $el: s
                } = e;
                s.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
                    const s = n(e);
                    let a = parseInt(s.attr("data-swiper-parallax-duration"), 10) || t;
                    0 === t && (a = 0), s.transition(a)
                })
            })(s)
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s,
        emit: i
    }) {
        function r(e) {
            if (2 > e.targetTouches.length) return 1;
            const t = e.targetTouches[0].pageX,
                s = e.targetTouches[0].pageY,
                a = e.targetTouches[1].pageX,
                i = e.targetTouches[1].pageY;
            return Math.sqrt((a - t) ** 2 + (i - s) ** 2)
        }

        function l(t) {
            const s = e.support,
                a = e.params.zoom;
            if (S = !1, $ = !1, !s.gestures) {
                if ("touchstart" !== t.type || "touchstart" === t.type && 2 > t.targetTouches.length) return;
                S = !0, k.scaleStart = r(t)
            }
            k.$slideEl && k.$slideEl.length || (k.$slideEl = n(t.target).closest("." + e.params.slideClass), 0 === k.$slideEl.length && (k.$slideEl = e.slides.eq(e.activeIndex)), k.$imageEl = k.$slideEl.find("." + a.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), k.$imageWrapEl = k.$imageEl.parent("." + a.containerClass), k.maxRatio = k.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio, 0 !== k.$imageWrapEl.length) ? (k.$imageEl && k.$imageEl.transition(0), P = !0) : k.$imageEl = void 0
        }

        function o(t) {
            const s = e.support,
                a = e.params.zoom,
                i = e.zoom;
            if (!s.gestures) {
                if ("touchmove" !== t.type || "touchmove" === t.type && 2 > t.targetTouches.length) return;
                $ = !0, k.scaleMove = r(t)
            }
            k.$imageEl && 0 !== k.$imageEl.length ? (s.gestures ? i.scale = t.scale * M : i.scale = k.scaleMove / k.scaleStart * M, i.scale > k.maxRatio && (i.scale = k.maxRatio - 1 + (i.scale - k.maxRatio + 1) ** .5), i.scale < a.minRatio && (i.scale = a.minRatio + 1 - (a.minRatio - i.scale + 1) ** .5), k.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`)) : "gesturechange" === t.type && l(t)
        }

        function c(t) {
            const s = e.device,
                a = e.support,
                i = e.params.zoom,
                r = e.zoom;
            if (!a.gestures) {
                if (!S || !$) return;
                if ("touchend" !== t.type || "touchend" === t.type && 2 > t.changedTouches.length && !s.android) return;
                S = !1, $ = !1
            }
            k.$imageEl && 0 !== k.$imageEl.length && (r.scale = Math.max(Math.min(r.scale, k.maxRatio), i.minRatio), k.$imageEl.transition(e.params.speed).transform(`translate3d(0,0,0) scale(${r.scale})`), M = r.scale, P = !1, 1 === r.scale && (k.$slideEl = void 0))
        }

        function p(t) {
            const s = e.zoom;
            if (!k.$imageEl || 0 === k.$imageEl.length) return;
            if (e.allowClick = !1, !z.isTouched || !k.$slideEl) return;
            z.isMoved || (z.width = k.$imageEl[0].offsetWidth, z.height = k.$imageEl[0].offsetHeight, z.startX = d(k.$imageWrapEl[0], "x") || 0, z.startY = d(k.$imageWrapEl[0], "y") || 0, k.slideWidth = k.$slideEl[0].offsetWidth, k.slideHeight = k.$slideEl[0].offsetHeight, k.$imageWrapEl.transition(0));
            const a = z.width * s.scale,
                i = z.height * s.scale;
            if (a >= k.slideWidth || i >= k.slideHeight) {
                if (z.minX = Math.min(k.slideWidth / 2 - a / 2, 0), z.maxX = -z.minX, z.minY = Math.min(k.slideHeight / 2 - i / 2, 0), z.maxY = -z.minY, z.touchesCurrent.x = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, z.touchesCurrent.y = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY, !z.isMoved && !P) {
                    if (e.isHorizontal() && (Math.floor(z.minX) === Math.floor(z.startX) && z.touchesCurrent.x < z.touchesStart.x || Math.floor(z.maxX) === Math.floor(z.startX) && z.touchesCurrent.x > z.touchesStart.x)) return void(z.isTouched = !1);
                    if (!e.isHorizontal() && (Math.floor(z.minY) === Math.floor(z.startY) && z.touchesCurrent.y < z.touchesStart.y || Math.floor(z.maxY) === Math.floor(z.startY) && z.touchesCurrent.y > z.touchesStart.y)) return void(z.isTouched = !1)
                }
                t.cancelable && t.preventDefault(), t.stopPropagation(), z.isMoved = !0, z.currentX = z.touchesCurrent.x - z.touchesStart.x + z.startX, z.currentY = z.touchesCurrent.y - z.touchesStart.y + z.startY, z.currentX < z.minX && (z.currentX = z.minX + 1 - (z.minX - z.currentX + 1) ** .8), z.currentX > z.maxX && (z.currentX = z.maxX - 1 + (z.currentX - z.maxX + 1) ** .8), z.currentY < z.minY && (z.currentY = z.minY + 1 - (z.minY - z.currentY + 1) ** .8), z.currentY > z.maxY && (z.currentY = z.maxY - 1 + (z.currentY - z.maxY + 1) ** .8), O.prevPositionX || (O.prevPositionX = z.touchesCurrent.x), O.prevPositionY || (O.prevPositionY = z.touchesCurrent.y), O.prevTime || (O.prevTime = Date.now()), O.x = (z.touchesCurrent.x - O.prevPositionX) / (Date.now() - O.prevTime) / 2, O.y = (z.touchesCurrent.y - O.prevPositionY) / (Date.now() - O.prevTime) / 2, 2 > Math.abs(z.touchesCurrent.x - O.prevPositionX) && (O.x = 0), 2 > Math.abs(z.touchesCurrent.y - O.prevPositionY) && (O.y = 0), O.prevPositionX = z.touchesCurrent.x, O.prevPositionY = z.touchesCurrent.y, O.prevTime = Date.now(), k.$imageWrapEl.transform(`translate3d(${z.currentX}px, ${z.currentY}px,0)`)
            }
        }

        function u() {
            const t = e.zoom;
            k.$slideEl && e.previousIndex !== e.activeIndex && (k.$imageEl && k.$imageEl.transform("translate3d(0,0,0) scale(1)"), k.$imageWrapEl && k.$imageWrapEl.transform("translate3d(0,0,0)"), t.scale = 1, M = 1, k.$slideEl = void 0, k.$imageEl = void 0, k.$imageWrapEl = void 0)
        }

        function h(t) {
            const s = e.zoom,
                a = e.params.zoom;
            if (k.$slideEl || (t && t.target && (k.$slideEl = n(t.target).closest("." + e.params.slideClass)), k.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? k.$slideEl = e.$wrapperEl.children("." + e.params.slideActiveClass) : k.$slideEl = e.slides.eq(e.activeIndex)), k.$imageEl = k.$slideEl.find("." + a.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), k.$imageWrapEl = k.$imageEl.parent("." + a.containerClass)), !k.$imageEl || 0 === k.$imageEl.length || !k.$imageWrapEl || 0 === k.$imageWrapEl.length) return;
            let i, r, l, o, d, c, p, u, h, m, f, g, v, w, b, x, y, E;
            e.params.cssMode && (e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.touchAction = "none"), k.$slideEl.addClass("" + a.zoomedSlideClass), void 0 === z.touchesStart.x && t ? (i = "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX, r = "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY) : (i = z.touchesStart.x, r = z.touchesStart.y), s.scale = k.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio, M = k.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio, t ? (y = k.$slideEl[0].offsetWidth, E = k.$slideEl[0].offsetHeight, d = (l = k.$slideEl.offset().left + T.scrollX) + y / 2 - i, c = (o = k.$slideEl.offset().top + T.scrollY) + E / 2 - r, h = k.$imageEl[0].offsetWidth, m = k.$imageEl[0].offsetHeight, f = h * s.scale, g = m * s.scale, b = -(v = Math.min(y / 2 - f / 2, 0)), x = -(w = Math.min(E / 2 - g / 2, 0)), p = d * s.scale, u = c * s.scale, v > p && (p = v), p > b && (p = b), w > u && (u = w), u > x && (u = x)) : (p = 0, u = 0), k.$imageWrapEl.transition(300).transform(`translate3d(${p}px, ${u}px,0)`), k.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${s.scale})`)
        }

        function m() {
            const t = e.zoom,
                s = e.params.zoom;
            k.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? k.$slideEl = e.$wrapperEl.children("." + e.params.slideActiveClass) : k.$slideEl = e.slides.eq(e.activeIndex), k.$imageEl = k.$slideEl.find("." + s.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), k.$imageWrapEl = k.$imageEl.parent("." + s.containerClass)), k.$imageEl && 0 !== k.$imageEl.length && k.$imageWrapEl && 0 !== k.$imageWrapEl.length && (e.params.cssMode && (e.wrapperEl.style.overflow = "", e.wrapperEl.style.touchAction = ""), t.scale = 1, M = 1, k.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), k.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), k.$slideEl.removeClass("" + s.zoomedSlideClass), k.$slideEl = void 0)
        }

        function f(t) {
            const s = e.zoom;
            s.scale && 1 !== s.scale ? m() : h(t)
        }

        function g() {
            const t = e.support;
            return {
                passiveListener: !("touchstart" !== e.touchEvents.start || !t.passiveListener || !e.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                },
                activeListenerWithCapture: !t.passiveListener || {
                    passive: !1,
                    capture: !0
                }
            }
        }

        function v() {
            return "." + e.params.slideClass
        }

        function w(t) {
            const {
                passiveListener: s
            } = g(), a = v();
            e.$wrapperEl[t]("gesturestart", a, l, s), e.$wrapperEl[t]("gesturechange", a, o, s), e.$wrapperEl[t]("gestureend", a, c, s)
        }

        function b() {
            C || (C = !0, w("on"))
        }

        function x() {
            C && (C = !1, w("off"))
        }

        function y() {
            const t = e.zoom;
            if (t.enabled) return;
            t.enabled = !0;
            const s = e.support,
                {
                    passiveListener: a,
                    activeListenerWithCapture: i
                } = g(),
                r = v();
            s.gestures ? (e.$wrapperEl.on(e.touchEvents.start, b, a), e.$wrapperEl.on(e.touchEvents.end, x, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, r, l, a), e.$wrapperEl.on(e.touchEvents.move, r, o, i), e.$wrapperEl.on(e.touchEvents.end, r, c, a), e.touchEvents.cancel && e.$wrapperEl.on(e.touchEvents.cancel, r, c, a)), e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, p, i)
        }

        function E() {
            const t = e.zoom;
            if (!t.enabled) return;
            const s = e.support;
            t.enabled = !1;
            const {
                passiveListener: a,
                activeListenerWithCapture: i
            } = g(), r = v();
            s.gestures ? (e.$wrapperEl.off(e.touchEvents.start, b, a), e.$wrapperEl.off(e.touchEvents.end, x, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, r, l, a), e.$wrapperEl.off(e.touchEvents.move, r, o, i), e.$wrapperEl.off(e.touchEvents.end, r, c, a), e.touchEvents.cancel && e.$wrapperEl.off(e.touchEvents.cancel, r, c, a)), e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, p, i)
        }
        const T = a();
        t({
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        }), e.zoom = {
            enabled: !1
        };
        let C, S, $, M = 1,
            P = !1;
        const k = {
                $slideEl: void 0,
                slideWidth: void 0,
                slideHeight: void 0,
                $imageEl: void 0,
                $imageWrapEl: void 0,
                maxRatio: 3
            },
            z = {
                isTouched: void 0,
                isMoved: void 0,
                currentX: void 0,
                currentY: void 0,
                minX: void 0,
                minY: void 0,
                maxX: void 0,
                maxY: void 0,
                width: void 0,
                height: void 0,
                startX: void 0,
                startY: void 0,
                touchesStart: {},
                touchesCurrent: {}
            },
            O = {
                x: void 0,
                y: void 0,
                prevPositionX: void 0,
                prevPositionY: void 0,
                prevTime: void 0
            };
        let I = 1;
        Object.defineProperty(e.zoom, "scale", {
            get: () => I,
            set(e) {
                if (I !== e) {
                    const t = k.$imageEl ? k.$imageEl[0] : void 0,
                        s = k.$slideEl ? k.$slideEl[0] : void 0;
                    i("zoomChange", e, t, s)
                }
                I = e
            }
        }), s("init", () => {
            e.params.zoom.enabled && y()
        }), s("destroy", () => {
            E()
        }), s("touchStart", (t, s) => {
            e.zoom.enabled && function (t) {
                const s = e.device;
                k.$imageEl && 0 !== k.$imageEl.length && (z.isTouched || (s.android && t.cancelable && t.preventDefault(), z.isTouched = !0, z.touchesStart.x = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX, z.touchesStart.y = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY))
            }(s)
        }), s("touchEnd", (t, s) => {
            e.zoom.enabled && function () {
                const t = e.zoom;
                if (!k.$imageEl || 0 === k.$imageEl.length) return;
                if (!z.isTouched || !z.isMoved) return z.isTouched = !1, void(z.isMoved = !1);
                z.isTouched = !1, z.isMoved = !1;
                let s = 300,
                    a = 300;
                const i = O.x * s,
                    r = z.currentX + i,
                    n = O.y * a,
                    l = z.currentY + n;
                0 !== O.x && (s = Math.abs((r - z.currentX) / O.x)), 0 !== O.y && (a = Math.abs((l - z.currentY) / O.y));
                const o = Math.max(s, a);
                z.currentX = r, z.currentY = l;
                const d = z.width * t.scale,
                    c = z.height * t.scale;
                z.minX = Math.min(k.slideWidth / 2 - d / 2, 0), z.maxX = -z.minX, z.minY = Math.min(k.slideHeight / 2 - c / 2, 0), z.maxY = -z.minY, z.currentX = Math.max(Math.min(z.currentX, z.maxX), z.minX), z.currentY = Math.max(Math.min(z.currentY, z.maxY), z.minY), k.$imageWrapEl.transition(o).transform(`translate3d(${z.currentX}px, ${z.currentY}px,0)`)
            }()
        }), s("doubleTap", (t, s) => {
            !e.animating && e.params.zoom.enabled && e.zoom.enabled && e.params.zoom.toggle && f(s)
        }), s("transitionEnd", () => {
            e.zoom.enabled && e.params.zoom.enabled && u()
        }), s("slideChange", () => {
            e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && u()
        }), Object.assign(e.zoom, {
            enable: y,
            disable: E,
            in: h,
            out: m,
            toggle: f
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s,
        emit: i
    }) {
        function r(t, s = !0) {
            const a = e.params.lazy;
            if (void 0 === t) return;
            if (0 === e.slides.length) return;
            const l = e.virtual && e.params.virtual.enabled ? e.$wrapperEl.children(`.${e.params.slideClass}[data-swiper-slide-index="${t}"]`) : e.slides.eq(t),
                o = l.find(`.${a.elementClass}:not(.${a.loadedClass}):not(.${a.loadingClass})`);
            !l.hasClass(a.elementClass) || l.hasClass(a.loadedClass) || l.hasClass(a.loadingClass) || o.push(l[0]), 0 !== o.length && o.each(t => {
                const o = n(t);
                o.addClass(a.loadingClass);
                const d = o.attr("data-background"),
                    c = o.attr("data-src"),
                    p = o.attr("data-srcset"),
                    u = o.attr("data-sizes"),
                    h = o.parent("picture");
                e.loadImage(o[0], c || d, p, u, !1, () => {
                    if (null != e && e && (!e || e.params) && !e.destroyed) {
                        if (d ? (o.css("background-image", `url("${d}")`), o.removeAttr("data-background")) : (p && (o.attr("srcset", p), o.removeAttr("data-srcset")), u && (o.attr("sizes", u), o.removeAttr("data-sizes")), h.length && h.children("source").each(e => {
                                const t = n(e);
                                t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")), t.removeAttr("data-srcset"))
                            }), c && (o.attr("src", c), o.removeAttr("data-src"))), o.addClass(a.loadedClass).removeClass(a.loadingClass), l.find("." + a.preloaderClass).remove(), e.params.loop && s) {
                            const t = l.attr("data-swiper-slide-index");
                            l.hasClass(e.params.slideDuplicateClass) ? r(e.$wrapperEl.children(`[data-swiper-slide-index="${t}"]:not(.${e.params.slideDuplicateClass})`).index(), !1) : r(e.$wrapperEl.children(`.${e.params.slideDuplicateClass}[data-swiper-slide-index="${t}"]`).index(), !1)
                        }
                        i("lazyImageReady", l[0], o[0]), e.params.autoHeight && e.updateAutoHeight()
                    }
                }), i("lazyImageLoad", l[0], o[0])
            })
        }

        function l() {
            function t(e) {
                if (d) {
                    if (a.children(`.${i.slideClass}[data-swiper-slide-index="${e}"]`).length) return !0
                } else if (l[e]) return !0;
                return !1
            }

            function s(e) {
                return d ? n(e).attr("data-swiper-slide-index") : n(e).index()
            }
            const {
                $wrapperEl: a,
                params: i,
                slides: l,
                activeIndex: o
            } = e, d = e.virtual && i.virtual.enabled, p = i.lazy;
            let u = i.slidesPerView;
            if ("auto" === u && (u = 0), c || (c = !0), e.params.watchSlidesProgress) a.children("." + i.slideVisibleClass).each(e => {
                r(d ? n(e).attr("data-swiper-slide-index") : n(e).index())
            });
            else if (u > 1)
                for (let e = o; o + u > e; e += 1) t(e) && r(e);
            else r(o);
            if (p.loadPrevNext)
                if (u > 1 || p.loadPrevNextAmount && p.loadPrevNextAmount > 1) {
                    const e = p.loadPrevNextAmount,
                        s = u,
                        a = Math.min(o + s + Math.max(e, s), l.length),
                        i = Math.max(o - Math.max(s, e), 0);
                    for (let e = o + u; a > e; e += 1) t(e) && r(e);
                    for (let e = i; o > e; e += 1) t(e) && r(e)
                } else {
                    const e = a.children("." + i.slideNextClass);
                    e.length > 0 && r(s(e));
                    const t = a.children("." + i.slidePrevClass);
                    t.length > 0 && r(s(t))
                }
        }

        function o() {
            const t = a();
            if (!e || e.destroyed) return;
            const s = e.params.lazy.scrollingElement ? n(e.params.lazy.scrollingElement) : n(t),
                i = s[0] === t,
                r = i ? t.innerWidth : s[0].offsetWidth,
                c = i ? t.innerHeight : s[0].offsetHeight,
                p = e.$el.offset(),
                {
                    rtlTranslate: u
                } = e;
            let h = !1;
            u && (p.left -= e.$el[0].scrollLeft);
            const m = [
                [p.left, p.top],
                [p.left + e.width, p.top],
                [p.left, p.top + e.height],
                [p.left + e.width, p.top + e.height]
            ];
            for (let e = 0; m.length > e; e += 1) {
                const t = m[e];
                if (!(0 > t[0] || t[0] > r || 0 > t[1] || t[1] > c)) {
                    if (0 === t[0] && 0 === t[1]) continue;
                    h = !0
                }
            }
            const f = !("touchstart" !== e.touchEvents.start || !e.support.passiveListener || !e.params.passiveListeners) && {
                passive: !0,
                capture: !1
            };
            h ? (l(), s.off("scroll", o, f)) : d || (d = !0, s.on("scroll", o, f))
        }
        t({
            lazy: {
                checkInView: !1,
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                scrollingElement: "",
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        }), e.lazy = {};
        let d = !1,
            c = !1;
        s("beforeInit", () => {
            e.params.lazy.enabled && e.params.preloadImages && (e.params.preloadImages = !1)
        }), s("init", () => {
            e.params.lazy.enabled && (e.params.lazy.checkInView ? o() : l())
        }), s("scroll", () => {
            e.params.freeMode && e.params.freeMode.enabled && !e.params.freeMode.sticky && l()
        }), s("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
            e.params.lazy.enabled && (e.params.lazy.checkInView ? o() : l())
        }), s("transitionStart", () => {
            e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !c) && (e.params.lazy.checkInView ? o() : l())
        }), s("transitionEnd", () => {
            e.params.lazy.enabled && !e.params.lazy.loadOnTransitionStart && (e.params.lazy.checkInView ? o() : l())
        }), s("slideChange", () => {
            const {
                lazy: t,
                cssMode: s,
                watchSlidesProgress: a,
                touchReleaseOnEdges: i,
                resistanceRatio: r
            } = e.params;
            t.enabled && (s || a && (i || 0 === r)) && l()
        }), Object.assign(e.lazy, {
            load: l,
            loadInSlide: r
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s
    }) {
        function a(e, t) {
            const s = function () {
                let e, t, s;
                return (a, i) => {
                    for (t = -1, e = a.length; e - t > 1;) a[s = e + t >> 1] > i ? e = s : t = s;
                    return e
                }
            }();
            let a, i;
            return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
                return e ? (i = s(this.x, e), a = i - 1, (e - this.x[a]) * (this.y[i] - this.y[a]) / (this.x[i] - this.x[a]) + this.y[a]) : 0
            }, this
        }

        function i() {
            e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
        }
        t({
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        }), e.controller = {
            control: void 0
        }, s("beforeInit", () => {
            e.controller.control = e.params.controller.control
        }), s("update", () => {
            i()
        }), s("resize", () => {
            i()
        }), s("observerUpdate", () => {
            i()
        }), s("setTranslate", (t, s, a) => {
            e.controller.control && e.controller.setTranslate(s, a)
        }), s("setTransition", (t, s, a) => {
            e.controller.control && e.controller.setTransition(s, a)
        }), Object.assign(e.controller, {
            setTranslate: function (t, s) {
                function i(t) {
                    const s = e.rtlTranslate ? -e.translate : e.translate;
                    "slide" === e.params.controller.by && (function (t) {
                        e.controller.spline || (e.controller.spline = e.params.loop ? new a(e.slidesGrid, t.slidesGrid) : new a(e.snapGrid, t.snapGrid))
                    }(t), l = -e.controller.spline.interpolate(-s)), l && "container" !== e.params.controller.by || (n = (t.maxTranslate() - t.minTranslate()) / (e.maxTranslate() - e.minTranslate()), l = (s - e.minTranslate()) * n + t.minTranslate()), e.params.controller.inverse && (l = t.maxTranslate() - l), t.updateProgress(l), t.setTranslate(l, e), t.updateActiveIndex(), t.updateSlidesClasses()
                }
                const r = e.controller.control;
                let n, l;
                const o = e.constructor;
                if (Array.isArray(r))
                    for (let e = 0; e < r.length; e += 1) r[e] !== s && r[e] instanceof o && i(r[e]);
                else r instanceof o && s !== r && i(r)
            },
            setTransition: function (t, s) {
                function a(s) {
                    s.setTransition(t, e), 0 !== t && (s.transitionStart(), s.params.autoHeight && l(() => {
                        s.updateAutoHeight()
                    }), s.$wrapperEl.transitionEnd(() => {
                        r && (s.params.loop && "slide" === e.params.controller.by && s.loopFix(), s.transitionEnd())
                    }))
                }
                const i = e.constructor,
                    r = e.controller.control;
                let n;
                if (Array.isArray(r))
                    for (n = 0; n < r.length; n += 1) r[n] !== s && r[n] instanceof i && a(r[n]);
                else r instanceof i && s !== r && a(r)
            }
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s
    }) {
        function a(e) {
            const t = g;
            0 !== t.length && (t.html(""), t.html(e))
        }

        function i(e) {
            e.attr("tabIndex", "0")
        }

        function r(e) {
            e.attr("tabIndex", "-1")
        }

        function l(e, t) {
            e.attr("role", t)
        }

        function o(e, t) {
            e.attr("aria-roledescription", t)
        }

        function d(e, t) {
            e.attr("aria-label", t)
        }

        function c(e) {
            e.attr("aria-disabled", !0)
        }

        function p(e) {
            e.attr("aria-disabled", !1)
        }

        function u(t) {
            if (13 !== t.keyCode && 32 !== t.keyCode) return;
            const s = e.params.a11y,
                i = n(t.target);
            e.navigation && e.navigation.$nextEl && i.is(e.navigation.$nextEl) && (e.isEnd && !e.params.loop || e.slideNext(), e.isEnd ? a(s.lastSlideMessage) : a(s.nextSlideMessage)), e.navigation && e.navigation.$prevEl && i.is(e.navigation.$prevEl) && (e.isBeginning && !e.params.loop || e.slidePrev(), e.isBeginning ? a(s.firstSlideMessage) : a(s.prevSlideMessage)), e.pagination && i.is(y(e.params.pagination.bulletClass)) && i[0].click()
        }

        function h() {
            if (e.params.loop || e.params.rewind || !e.navigation) return;
            const {
                $nextEl: t,
                $prevEl: s
            } = e.navigation;
            s && s.length > 0 && (e.isBeginning ? (c(s), r(s)) : (p(s), i(s))), t && t.length > 0 && (e.isEnd ? (c(t), r(t)) : (p(t), i(t)))
        }

        function m() {
            return e.pagination && e.pagination.bullets && e.pagination.bullets.length
        }

        function f() {
            return m() && e.params.pagination.clickable
        }
        t({
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                slideLabelMessage: "{{index}} / {{slidesLength}}",
                containerMessage: null,
                containerRoleDescriptionMessage: null,
                itemRoleDescriptionMessage: null,
                slideRole: "group"
            }
        });
        let g = null;
        const v = (e, t, s) => {
            i(e), "BUTTON" !== e[0].tagName && (l(e, "button"), e.on("keydown", u)), d(e, s),
                function (e, t) {
                    e.attr("aria-controls", t)
                }(e, t)
        };
        s("beforeInit", () => {
            g = n(`<span class="${e.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`)
        }), s("afterInit", () => {
            e.params.a11y.enabled && (function () {
                const t = e.params.a11y;
                e.$el.append(g);
                const s = e.$el;
                t.containerRoleDescriptionMessage && o(s, t.containerRoleDescriptionMessage), t.containerMessage && d(s, t.containerMessage);
                const a = e.$wrapperEl,
                    i = a.attr("id") || "swiper-wrapper-" + function (e = 16) {
                        return "x".repeat(e).replace(/x/g, () => Math.round(16 * Math.random()).toString(16))
                    }(16),
                    r = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
                var c;
                c = i, a.attr("id", c),
                    function (e, t) {
                        a.attr("aria-live", t)
                    }(0, r), t.itemRoleDescriptionMessage && o(n(e.slides), t.itemRoleDescriptionMessage), l(n(e.slides), t.slideRole);
                const p = e.params.loop ? e.slides.filter(t => !t.classList.contains(e.params.slideDuplicateClass)).length : e.slides.length;
                let h, m;
                e.slides.each((s, a) => {
                    const i = n(s),
                        r = e.params.loop ? parseInt(i.attr("data-swiper-slide-index"), 10) : a;
                    d(i, t.slideLabelMessage.replace(/\{\{index\}\}/, r + 1).replace(/\{\{slidesLength\}\}/, p))
                }), e.navigation && e.navigation.$nextEl && (h = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (m = e.navigation.$prevEl), h && h.length && v(h, i, t.nextSlideMessage), m && m.length && v(m, i, t.prevSlideMessage), f() && e.pagination.$el.on("keydown", y(e.params.pagination.bulletClass), u)
            }(), h())
        }), s("toEdge", () => {
            e.params.a11y.enabled && h()
        }), s("fromEdge", () => {
            e.params.a11y.enabled && h()
        }), s("paginationUpdate", () => {
            e.params.a11y.enabled && function () {
                const t = e.params.a11y;
                m() && e.pagination.bullets.each(s => {
                    const a = n(s);
                    e.params.pagination.clickable && (i(a), e.params.pagination.renderBullet || (l(a, "button"), d(a, t.paginationBulletMessage.replace(/\{\{index\}\}/, a.index() + 1)))), a.is("." + e.params.pagination.bulletActiveClass) ? a.attr("aria-current", "true") : a.removeAttr("aria-current")
                })
            }()
        }), s("destroy", () => {
            e.params.a11y.enabled && function () {
                let t, s;
                g && g.length > 0 && g.remove(), e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (s = e.navigation.$prevEl), t && t.off("keydown", u), s && s.off("keydown", u), f() && e.pagination.$el.off("keydown", y(e.params.pagination.bulletClass), u)
            }()
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s
    }) {
        t({
            history: {
                enabled: !1,
                root: "",
                replaceState: !1,
                key: "slides"
            }
        });
        let i = !1,
            r = {};
        const n = e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""),
            l = e => {
                const t = a();
                let s;
                const i = (s = e ? new URL(e) : t.location).pathname.slice(1).split("/").filter(e => "" !== e),
                    r = i.length;
                return {
                    key: i[r - 2],
                    value: i[r - 1]
                }
            },
            o = (t, s) => {
                const r = a();
                if (!i || !e.params.history.enabled) return;
                let l;
                l = e.params.url ? new URL(e.params.url) : r.location;
                const o = e.slides.eq(s);
                let d = n(o.attr("data-history"));
                if (e.params.history.root.length > 0) {
                    let s = e.params.history.root;
                    "/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)), d = `${s}/${t}/${d}`
                } else l.pathname.includes(t) || (d = `${t}/${d}`);
                const c = r.history.state;
                c && c.value === d || (e.params.history.replaceState ? r.history.replaceState({
                    value: d
                }, null, d) : r.history.pushState({
                    value: d
                }, null, d))
            },
            d = (t, s, a) => {
                if (s)
                    for (let i = 0, r = e.slides.length; r > i; i += 1) {
                        const r = e.slides.eq(i);
                        if (n(r.attr("data-history")) === s && !r.hasClass(e.params.slideDuplicateClass)) {
                            const s = r.index();
                            e.slideTo(s, t, a)
                        }
                    } else e.slideTo(0, t, a)
            },
            c = () => {
                r = l(e.params.url), d(e.params.speed, e.paths.value, !1)
            };
        s("init", () => {
            e.params.history.enabled && (() => {
                const t = a();
                if (e.params.history) {
                    if (!t.history || !t.history.pushState) return e.params.history.enabled = !1, void(e.params.hashNavigation.enabled = !0);
                    i = !0, ((r = l(e.params.url)).key || r.value) && (d(0, r.value, e.params.runCallbacksOnInit), e.params.history.replaceState || t.addEventListener("popstate", c))
                }
            })()
        }), s("destroy", () => {
            e.params.history.enabled && (() => {
                const t = a();
                e.params.history.replaceState || t.removeEventListener("popstate", c)
            })()
        }), s("transitionEnd _freeModeNoMomentumRelease", () => {
            i && o(e.params.history.key, e.activeIndex)
        }), s("slideChange", () => {
            i && e.params.cssMode && o(e.params.history.key, e.activeIndex)
        })
    }, function ({
        swiper: e,
        extendParams: t,
        emit: i,
        on: r
    }) {
        let l = !1;
        const o = s(),
            d = a();
        t({
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1
            }
        });
        const c = () => {
                i("hashChange");
                const t = o.location.hash.replace("#", "");
                if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
                    const s = e.$wrapperEl.children(`.${e.params.slideClass}[data-hash="${t}"]`).index();
                    if (void 0 === s) return;
                    e.slideTo(s)
                }
            },
            p = () => {
                if (l && e.params.hashNavigation.enabled)
                    if (e.params.hashNavigation.replaceState && d.history && d.history.replaceState) d.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || ""), i("hashSet");
                    else {
                        const t = e.slides.eq(e.activeIndex),
                            s = t.attr("data-hash") || t.attr("data-history");
                        o.location.hash = s || "", i("hashSet")
                    }
            };
        r("init", () => {
            e.params.hashNavigation.enabled && (() => {
                if (!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled) return;
                l = !0;
                const t = o.location.hash.replace("#", "");
                if (t) {
                    const s = 0;
                    for (let a = 0, i = e.slides.length; i > a; a += 1) {
                        const i = e.slides.eq(a);
                        if ((i.attr("data-hash") || i.attr("data-history")) === t && !i.hasClass(e.params.slideDuplicateClass)) {
                            const t = i.index();
                            e.slideTo(t, s, e.params.runCallbacksOnInit, !0)
                        }
                    }
                }
                e.params.hashNavigation.watchState && n(d).on("hashchange", c)
            })()
        }), r("destroy", () => {
            e.params.hashNavigation.enabled && e.params.hashNavigation.watchState && n(d).off("hashchange", c)
        }), r("transitionEnd _freeModeNoMomentumRelease", () => {
            l && p()
        }), r("slideChange", () => {
            l && e.params.cssMode && p()
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: a,
        emit: i
    }) {
        function r() {
            const t = e.slides.eq(e.activeIndex);
            let s = e.params.autoplay.delay;
            t.attr("data-swiper-autoplay") && (s = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(m), m = l(() => {
                let t;
                e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), t = e.slidePrev(e.params.speed, !0, !0), i("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? o() : (t = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), i("autoplay")) : (t = e.slidePrev(e.params.speed, !0, !0), i("autoplay")) : e.params.loop ? (e.loopFix(), t = e.slideNext(e.params.speed, !0, !0), i("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? o() : (t = e.slideTo(0, e.params.speed, !0, !0), i("autoplay")) : (t = e.slideNext(e.params.speed, !0, !0), i("autoplay")), (e.params.cssMode && e.autoplay.running || !1 === t) && r()
            }, s)
        }

        function n() {
            return void 0 === m && !e.autoplay.running && (e.autoplay.running = !0, i("autoplayStart"), r(), !0)
        }

        function o() {
            return !!e.autoplay.running && void 0 !== m && (m && (clearTimeout(m), m = void 0), e.autoplay.running = !1, i("autoplayStop"), !0)
        }

        function d(t) {
            e.autoplay.running && (e.autoplay.paused || (m && clearTimeout(m), e.autoplay.paused = !0, 0 !== t && e.params.autoplay.waitForTransition ? ["transitionend", "webkitTransitionEnd"].forEach(t => {
                e.$wrapperEl[0].addEventListener(t, p)
            }) : (e.autoplay.paused = !1, r())))
        }

        function c() {
            const t = s();
            "hidden" === t.visibilityState && e.autoplay.running && d(), "visible" === t.visibilityState && e.autoplay.paused && (r(), e.autoplay.paused = !1)
        }

        function p(t) {
            e && !e.destroyed && e.$wrapperEl && t.target === e.$wrapperEl[0] && (["transitionend", "webkitTransitionEnd"].forEach(t => {
                e.$wrapperEl[0].removeEventListener(t, p)
            }), e.autoplay.paused = !1, e.autoplay.running ? r() : o())
        }

        function u() {
            e.params.autoplay.disableOnInteraction ? o() : d(), ["transitionend", "webkitTransitionEnd"].forEach(t => {
                e.$wrapperEl[0].removeEventListener(t, p)
            })
        }

        function h() {
            e.params.autoplay.disableOnInteraction || (e.autoplay.paused = !1, r())
        }
        let m;
        e.autoplay = {
            running: !1,
            paused: !1
        }, t({
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1,
                pauseOnMouseEnter: !1
            }
        }), a("init", () => {
            e.params.autoplay.enabled && (n(), s().addEventListener("visibilitychange", c), e.params.autoplay.pauseOnMouseEnter && (e.$el.on("mouseenter", u), e.$el.on("mouseleave", h)))
        }), a("beforeTransitionStart", (t, s, a) => {
            e.autoplay.running && (a || !e.params.autoplay.disableOnInteraction ? e.autoplay.pause(s) : o())
        }), a("sliderFirstMove", () => {
            e.autoplay.running && (e.params.autoplay.disableOnInteraction ? o() : d())
        }), a("touchEnd", () => {
            e.params.cssMode && e.autoplay.paused && !e.params.autoplay.disableOnInteraction && r()
        }), a("destroy", () => {
            e.$el.off("mouseenter", u), e.$el.off("mouseleave", h), e.autoplay.running && o(), s().removeEventListener("visibilitychange", c)
        }), Object.assign(e.autoplay, {
            pause: d,
            run: r,
            start: n,
            stop: o
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s
    }) {
        function a() {
            const t = e.thumbs.swiper;
            if (!t) return;
            const s = t.clickedIndex,
                a = t.clickedSlide;
            if (a && n(a).hasClass(e.params.thumbs.slideThumbActiveClass)) return;
            if (null == s) return;
            let i;
            if (i = t.params.loop ? parseInt(n(t.clickedSlide).attr("data-swiper-slide-index"), 10) : s, e.params.loop) {
                let t = e.activeIndex;
                e.slides.eq(t).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, t = e.activeIndex);
                const s = e.slides.eq(t).prevAll(`[data-swiper-slide-index="${i}"]`).eq(0).index(),
                    a = e.slides.eq(t).nextAll(`[data-swiper-slide-index="${i}"]`).eq(0).index();
                i = void 0 === s ? a : void 0 === a ? s : t - s > a - t ? a : s
            }
            e.slideTo(i)
        }

        function i() {
            const {
                thumbs: t
            } = e.params;
            if (l) return !1;
            l = !0;
            const s = e.constructor;
            if (t.swiper instanceof s) e.thumbs.swiper = t.swiper, Object.assign(e.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }), Object.assign(e.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            });
            else if (c(t.swiper)) {
                const a = Object.assign({}, t.swiper);
                Object.assign(a, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }), e.thumbs.swiper = new s(a), o = !0
            }
            return e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", a), !0
        }

        function r(t) {
            const s = e.thumbs.swiper;
            if (!s) return;
            const a = "auto" === s.params.slidesPerView ? s.slidesPerViewDynamic() : s.params.slidesPerView,
                i = e.params.thumbs.autoScrollOffset,
                r = i && !s.params.loop;
            if (e.realIndex !== s.realIndex || r) {
                let n, l, o = s.activeIndex;
                if (s.params.loop) {
                    s.slides.eq(o).hasClass(s.params.slideDuplicateClass) && (s.loopFix(), s._clientLeft = s.$wrapperEl[0].clientLeft, o = s.activeIndex);
                    const t = s.slides.eq(o).prevAll(`[data-swiper-slide-index="${e.realIndex}"]`).eq(0).index(),
                        a = s.slides.eq(o).nextAll(`[data-swiper-slide-index="${e.realIndex}"]`).eq(0).index();
                    n = void 0 === t ? a : void 0 === a ? t : a - o == o - t ? s.params.slidesPerGroup > 1 ? a : o : o - t > a - o ? a : t, l = e.activeIndex > e.previousIndex ? "next" : "prev"
                } else l = (n = e.realIndex) > e.previousIndex ? "next" : "prev";
                r && (n += "next" === l ? i : -1 * i), s.visibleSlidesIndexes && 0 > s.visibleSlidesIndexes.indexOf(n) && (s.params.centeredSlides ? n = n > o ? n - Math.floor(a / 2) + 1 : n + Math.floor(a / 2) - 1 : n > o && s.params.slidesPerGroup, s.slideTo(n, t ? 0 : void 0))
            }
            let n = 1;
            const l = e.params.thumbs.slideThumbActiveClass;
            if (e.params.slidesPerView > 1 && !e.params.centeredSlides && (n = e.params.slidesPerView), e.params.thumbs.multipleActiveThumbs || (n = 1), n = Math.floor(n), s.slides.removeClass(l), s.params.loop || s.params.virtual && s.params.virtual.enabled)
                for (let t = 0; n > t; t += 1) s.$wrapperEl.children(`[data-swiper-slide-index="${e.realIndex+t}"]`).addClass(l);
            else
                for (let t = 0; n > t; t += 1) s.slides.eq(e.realIndex + t).addClass(l)
        }
        t({
            thumbs: {
                swiper: null,
                multipleActiveThumbs: !0,
                autoScrollOffset: 0,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-thumbs"
            }
        });
        let l = !1,
            o = !1;
        e.thumbs = {
            swiper: null
        }, s("beforeInit", () => {
            const {
                thumbs: t
            } = e.params;
            t && t.swiper && (i(), r(!0))
        }), s("slideChange update resize observerUpdate", () => {
            e.thumbs.swiper && r()
        }), s("setTransition", (t, s) => {
            const a = e.thumbs.swiper;
            a && a.setTransition(s)
        }), s("beforeDestroy", () => {
            const t = e.thumbs.swiper;
            t && o && t && t.destroy()
        }), Object.assign(e.thumbs, {
            init: i,
            update: r
        })
    }, function ({
        swiper: e,
        extendParams: t,
        emit: s,
        once: a
    }) {
        t({
            freeMode: {
                enabled: !1,
                momentum: !0,
                momentumRatio: 1,
                momentumBounce: !0,
                momentumBounceRatio: 1,
                momentumVelocityRatio: 1,
                sticky: !1,
                minimumVelocity: .02
            }
        }), Object.assign(e, {
            freeMode: {
                onTouchMove: function () {
                    const {
                        touchEventsData: t,
                        touches: s
                    } = e;
                    0 === t.velocities.length && t.velocities.push({
                        position: s[e.isHorizontal() ? "startX" : "startY"],
                        time: t.touchStartTime
                    }), t.velocities.push({
                        position: s[e.isHorizontal() ? "currentX" : "currentY"],
                        time: o()
                    })
                },
                onTouchEnd: function ({
                    currentPos: t
                }) {
                    const {
                        params: i,
                        $wrapperEl: r,
                        rtlTranslate: n,
                        snapGrid: l,
                        touchEventsData: d
                    } = e, c = o() - d.touchStartTime;
                    if (t < -e.minTranslate()) e.slideTo(e.activeIndex);
                    else if (t > -e.maxTranslate()) e.slides.length < l.length ? e.slideTo(l.length - 1) : e.slideTo(e.slides.length - 1);
                    else {
                        if (i.freeMode.momentum) {
                            if (d.velocities.length > 1) {
                                const t = d.velocities.pop(),
                                    s = d.velocities.pop(),
                                    a = t.position - s.position,
                                    r = t.time - s.time;
                                e.velocity = a / r, e.velocity /= 2, Math.abs(e.velocity) < i.freeMode.minimumVelocity && (e.velocity = 0), (r > 150 || o() - t.time > 300) && (e.velocity = 0)
                            } else e.velocity = 0;
                            e.velocity *= i.freeMode.momentumVelocityRatio, d.velocities.length = 0;
                            let t = 1e3 * i.freeMode.momentumRatio;
                            const c = e.velocity * t;
                            let p = e.translate + c;
                            n && (p = -p);
                            let u, h = !1;
                            const m = 20 * Math.abs(e.velocity) * i.freeMode.momentumBounceRatio;
                            let f;
                            if (p < e.maxTranslate()) i.freeMode.momentumBounce ? (p + e.maxTranslate() < -m && (p = e.maxTranslate() - m), u = e.maxTranslate(), h = !0, d.allowMomentumBounce = !0) : p = e.maxTranslate(), i.loop && i.centeredSlides && (f = !0);
                            else if (p > e.minTranslate()) i.freeMode.momentumBounce ? (p - e.minTranslate() > m && (p = e.minTranslate() + m), u = e.minTranslate(), h = !0, d.allowMomentumBounce = !0) : p = e.minTranslate(), i.loop && i.centeredSlides && (f = !0);
                            else if (i.freeMode.sticky) {
                                let t;
                                for (let e = 0; e < l.length; e += 1)
                                    if (l[e] > -p) {
                                        t = e;
                                        break
                                    } p = -(p = Math.abs(l[t] - p) < Math.abs(l[t - 1] - p) || "next" === e.swipeDirection ? l[t] : l[t - 1])
                            }
                            if (f && a("transitionEnd", () => {
                                    e.loopFix()
                                }), 0 !== e.velocity) {
                                if (t = Math.abs(n ? (-p - e.translate) / e.velocity : (p - e.translate) / e.velocity), i.freeMode.sticky) {
                                    const s = Math.abs((n ? -p : p) - e.translate),
                                        a = e.slidesSizesGrid[e.activeIndex];
                                    t = a > s ? i.speed : 2 * a > s ? 1.5 * i.speed : 2.5 * i.speed
                                }
                            } else if (i.freeMode.sticky) return void e.slideToClosest();
                            i.freeMode.momentumBounce && h ? (e.updateProgress(u), e.setTransition(t), e.setTranslate(p), e.transitionStart(!0, e.swipeDirection), e.animating = !0, r.transitionEnd(() => {
                                e && !e.destroyed && d.allowMomentumBounce && (s("momentumBounce"), e.setTransition(i.speed), setTimeout(() => {
                                    e.setTranslate(u), r.transitionEnd(() => {
                                        e && !e.destroyed && e.transitionEnd()
                                    })
                                }, 0))
                            })) : e.velocity ? (s("_freeModeNoMomentumRelease"), e.updateProgress(p), e.setTransition(t), e.setTranslate(p), e.transitionStart(!0, e.swipeDirection), e.animating || (e.animating = !0, r.transitionEnd(() => {
                                e && !e.destroyed && e.transitionEnd()
                            }))) : e.updateProgress(p), e.updateActiveIndex(), e.updateSlidesClasses()
                        } else {
                            if (i.freeMode.sticky) return void e.slideToClosest();
                            i.freeMode && s("_freeModeNoMomentumRelease")
                        }(!i.freeMode.momentum || c >= i.longSwipesMs) && (e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses())
                    }
                }
            }
        })
    }, function ({
        swiper: e,
        extendParams: t
    }) {
        let s, a, i;
        t({
            grid: {
                rows: 1,
                fill: "column"
            }
        }), e.grid = {
            initSlides: t => {
                const {
                    slidesPerView: r
                } = e.params, {
                    rows: n,
                    fill: l
                } = e.params.grid;
                a = s / n, i = Math.floor(t / n), s = Math.floor(t / n) === t / n ? t : Math.ceil(t / n) * n, "auto" !== r && "row" === l && (s = Math.max(s, r * n))
            },
            updateSlide: (t, r, n, l) => {
                const {
                    slidesPerGroup: o,
                    spaceBetween: d
                } = e.params, {
                    rows: c,
                    fill: p
                } = e.params.grid;
                let u, h, m;
                if ("row" === p && o > 1) {
                    const e = Math.floor(t / (o * c)),
                        a = t - c * o * e,
                        i = 0 === e ? o : Math.min(Math.ceil((n - e * c * o) / c), o);
                    u = (h = a - (m = Math.floor(a / i)) * i + e * o) + m * s / c, r.css({
                        "-webkit-order": u,
                        order: u
                    })
                } else "column" === p ? (m = t - (h = Math.floor(t / c)) * c, (h > i || h === i && m === c - 1) && ((m += 1) >= c && (m = 0, h += 1))) : h = t - (m = Math.floor(t / a)) * a;
                r.css(l("margin-top"), 0 !== m ? d && d + "px" : "")
            },
            updateWrapperSize: (t, a, i) => {
                const {
                    spaceBetween: r,
                    centeredSlides: n,
                    roundLengths: l
                } = e.params, {
                    rows: o
                } = e.params.grid;
                if (e.virtualSize = (t + r) * s, e.virtualSize = Math.ceil(e.virtualSize / o) - r, e.$wrapperEl.css({
                        [i("width")]: e.virtualSize + r + "px"
                    }), n) {
                    a.splice(0, a.length);
                    const t = [];
                    for (let s = 0; s < a.length; s += 1) {
                        let i = a[s];
                        l && (i = Math.floor(i)), a[s] < e.virtualSize + a[0] && t.push(i)
                    }
                    a.push(...t)
                }
            }
        }
    }, function ({
        swiper: e
    }) {
        Object.assign(e, {
            appendSlide: function (e) {
                const t = this,
                    {
                        $wrapperEl: s,
                        params: a
                    } = t;
                if (a.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
                    for (let t = 0; t < e.length; t += 1) e[t] && s.append(e[t]);
                else s.append(e);
                a.loop && t.loopCreate(), a.observer || t.update()
            }.bind(e),
            prependSlide: function (e) {
                const t = this,
                    {
                        params: s,
                        $wrapperEl: a,
                        activeIndex: i
                    } = t;
                s.loop && t.loopDestroy();
                let r = i + 1;
                if ("object" == typeof e && "length" in e) {
                    for (let t = 0; t < e.length; t += 1) e[t] && a.prepend(e[t]);
                    r = i + e.length
                } else a.prepend(e);
                s.loop && t.loopCreate(), s.observer || t.update(), t.slideTo(r, 0, !1)
            }.bind(e),
            addSlide: function (e, t) {
                const s = this,
                    {
                        $wrapperEl: a,
                        params: i,
                        activeIndex: r
                    } = s;
                let n = r;
                i.loop && (n -= s.loopedSlides, s.loopDestroy(), s.slides = a.children("." + i.slideClass));
                const l = s.slides.length;
                if (0 >= e) return void s.prependSlide(t);
                if (e >= l) return void s.appendSlide(t);
                let o = n > e ? n + 1 : n;
                const d = [];
                for (let t = l - 1; t >= e; t -= 1) {
                    const e = s.slides.eq(t);
                    e.remove(), d.unshift(e)
                }
                if ("object" == typeof t && "length" in t) {
                    for (let e = 0; e < t.length; e += 1) t[e] && a.append(t[e]);
                    o = n > e ? n + t.length : n
                } else a.append(t);
                for (let e = 0; e < d.length; e += 1) a.append(d[e]);
                i.loop && s.loopCreate(), i.observer || s.update(), i.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1)
            }.bind(e),
            removeSlide: function (e) {
                const t = this,
                    {
                        params: s,
                        $wrapperEl: a,
                        activeIndex: i
                    } = t;
                let r = i;
                s.loop && (r -= t.loopedSlides, t.loopDestroy(), t.slides = a.children("." + s.slideClass));
                let n, l = r;
                if ("object" == typeof e && "length" in e) {
                    for (let s = 0; s < e.length; s += 1) n = e[s], t.slides[n] && t.slides.eq(n).remove(), l > n && (l -= 1);
                    l = Math.max(l, 0)
                } else n = e, t.slides[n] && t.slides.eq(n).remove(), l > n && (l -= 1), l = Math.max(l, 0);
                s.loop && t.loopCreate(), s.observer || t.update(), s.loop ? t.slideTo(l + t.loopedSlides, 0, !1) : t.slideTo(l, 0, !1)
            }.bind(e),
            removeAllSlides: function () {
                const e = this,
                    t = [];
                for (let s = 0; s < e.slides.length; s += 1) t.push(s);
                e.removeSlide(t)
            }.bind(e)
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s
    }) {
        t({
            fadeEffect: {
                crossFade: !1,
                transformEl: null
            }
        }), E({
            effect: "fade",
            swiper: e,
            on: s,
            setTranslate: () => {
                const {
                    slides: t
                } = e, s = e.params.fadeEffect;
                for (let a = 0; a < t.length; a += 1) {
                    const t = e.slides.eq(a);
                    let i = -t[0].swiperSlideOffset;
                    e.params.virtualTranslate || (i -= e.translate);
                    let r = 0;
                    e.isHorizontal() || (r = i, i = 0);
                    const n = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
                    T(s, t).css({
                        opacity: n
                    }).transform(`translate3d(${i}px, ${r}px, 0px)`)
                }
            },
            setTransition: t => {
                const {
                    transformEl: s
                } = e.params.fadeEffect;
                (s ? e.slides.find(s) : e.slides).transition(t), C({
                    swiper: e,
                    duration: t,
                    transformEl: s,
                    allSlides: !0
                })
            },
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !e.params.cssMode
            })
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s
    }) {
        t({
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        }), E({
            effect: "cube",
            swiper: e,
            on: s,
            setTranslate: () => {
                const {
                    $el: t,
                    $wrapperEl: s,
                    slides: a,
                    width: i,
                    height: r,
                    rtlTranslate: l,
                    size: o,
                    browser: d
                } = e, c = e.params.cubeEffect, p = e.isHorizontal(), u = e.virtual && e.params.virtual.enabled;
                let h, m = 0;
                c.shadow && (p ? (0 === (h = s.find(".swiper-cube-shadow")).length && (h = n('<div class="swiper-cube-shadow"></div>'), s.append(h)), h.css({
                    height: i + "px"
                })) : 0 === (h = t.find(".swiper-cube-shadow")).length && (h = n('<div class="swiper-cube-shadow"></div>'), t.append(h)));
                for (let e = 0; e < a.length; e += 1) {
                    const t = a.eq(e);
                    let s = e;
                    u && (s = parseInt(t.attr("data-swiper-slide-index"), 10));
                    let i = 90 * s,
                        r = Math.floor(i / 360);
                    l && (r = Math.floor(-(i = -i) / 360));
                    const d = Math.max(Math.min(t[0].progress, 1), -1);
                    let h = 0,
                        f = 0,
                        g = 0;
                    s % 4 == 0 ? (h = 4 * -r * o, g = 0) : (s - 1) % 4 == 0 ? (h = 0, g = 4 * -r * o) : (s - 2) % 4 == 0 ? (h = o + 4 * r * o, g = o) : (s - 3) % 4 == 0 && (h = -o, g = 3 * o + 4 * o * r), l && (h = -h), p || (f = h, h = 0);
                    const v = `rotateX(${p?0:-i}deg) rotateY(${p?i:0}deg) translate3d(${h}px, ${f}px, ${g}px)`;
                    if (1 >= d && d > -1 && (m = 90 * s + 90 * d, l && (m = 90 * -s - 90 * d)), t.transform(v), c.slideShadows) {
                        let e = p ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                            s = p ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                        0 === e.length && (e = n(`<div class="swiper-slide-shadow-${p?"left":"top"}"></div>`), t.append(e)), 0 === s.length && (s = n(`<div class="swiper-slide-shadow-${p?"right":"bottom"}"></div>`), t.append(s)), e.length && (e[0].style.opacity = Math.max(-d, 0)), s.length && (s[0].style.opacity = Math.max(d, 0))
                    }
                }
                if (s.css({
                        "-webkit-transform-origin": `50% 50% -${o/2}px`,
                        "transform-origin": `50% 50% -${o/2}px`
                    }), c.shadow)
                    if (p) h.transform(`translate3d(0px, ${i/2+c.shadowOffset}px, ${-i/2}px) rotateX(90deg) rotateZ(0deg) scale(${c.shadowScale})`);
                    else {
                        const e = Math.abs(m) - 90 * Math.floor(Math.abs(m) / 90),
                            t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2),
                            s = c.shadowScale,
                            a = c.shadowScale / t,
                            i = c.shadowOffset;
                        h.transform(`scale3d(${s}, 1, ${a}) translate3d(0px, ${r/2+i}px, ${-r/2/a}px) rotateX(-90deg)`)
                    } const f = d.isSafari || d.isWebView ? -o / 2 : 0;
                s.transform(`translate3d(0px,0,${f}px) rotateX(${e.isHorizontal()?0:m}deg) rotateY(${e.isHorizontal()?-m:0}deg)`)
            },
            setTransition: t => {
                const {
                    $el: s,
                    slides: a
                } = e;
                a.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t), e.params.cubeEffect.shadow && !e.isHorizontal() && s.find(".swiper-cube-shadow").transition(t)
            },
            perspective: () => !0,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: !1,
                virtualTranslate: !0
            })
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s
    }) {
        t({
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0,
                transformEl: null
            }
        }), E({
            effect: "flip",
            swiper: e,
            on: s,
            setTranslate: () => {
                const {
                    slides: t,
                    rtlTranslate: s
                } = e, a = e.params.flipEffect;
                for (let i = 0; i < t.length; i += 1) {
                    const r = t.eq(i);
                    let n = r[0].progress;
                    e.params.flipEffect.limitRotation && (n = Math.max(Math.min(r[0].progress, 1), -1));
                    const l = r[0].swiperSlideOffset;
                    let o = -180 * n,
                        d = 0,
                        c = e.params.cssMode ? -l - e.translate : -l,
                        p = 0;
                    if (e.isHorizontal() ? s && (o = -o) : (p = c, c = 0, d = -o, o = 0), r[0].style.zIndex = -Math.abs(Math.round(n)) + t.length, a.slideShadows) {
                        let t = e.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
                            s = e.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
                        0 === t.length && (t = S(a, r, e.isHorizontal() ? "left" : "top")), 0 === s.length && (s = S(a, r, e.isHorizontal() ? "right" : "bottom")), t.length && (t[0].style.opacity = Math.max(-n, 0)), s.length && (s[0].style.opacity = Math.max(n, 0))
                    }
                    const u = `translate3d(${c}px, ${p}px, 0px) rotateX(${d}deg) rotateY(${o}deg)`;
                    T(a, r).transform(u)
                }
            },
            setTransition: t => {
                const {
                    transformEl: s
                } = e.params.flipEffect;
                (s ? e.slides.find(s) : e.slides).transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t), C({
                    swiper: e,
                    duration: t,
                    transformEl: s
                })
            },
            perspective: () => !0,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !e.params.cssMode
            })
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s
    }) {
        t({
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                scale: 1,
                modifier: 1,
                slideShadows: !0,
                transformEl: null
            }
        }), E({
            effect: "coverflow",
            swiper: e,
            on: s,
            setTranslate: () => {
                const {
                    width: t,
                    height: s,
                    slides: a,
                    slidesSizesGrid: i
                } = e, r = e.params.coverflowEffect, n = e.isHorizontal(), l = e.translate, o = n ? t / 2 - l : s / 2 - l, d = n ? r.rotate : -r.rotate, c = r.depth;
                for (let e = 0, t = a.length; t > e; e += 1) {
                    const t = a.eq(e),
                        s = i[e],
                        l = (o - t[0].swiperSlideOffset - s / 2) / s * r.modifier;
                    let p = n ? d * l : 0,
                        u = n ? 0 : d * l,
                        h = -c * Math.abs(l),
                        m = r.stretch;
                    "string" == typeof m && -1 !== m.indexOf("%") && (m = parseFloat(r.stretch) / 100 * s);
                    let f = n ? 0 : m * l,
                        g = n ? m * l : 0,
                        v = 1 - (1 - r.scale) * Math.abs(l);
                    .001 > Math.abs(g) && (g = 0), .001 > Math.abs(f) && (f = 0), .001 > Math.abs(h) && (h = 0), .001 > Math.abs(p) && (p = 0), .001 > Math.abs(u) && (u = 0), .001 > Math.abs(v) && (v = 0);
                    const w = `translate3d(${g}px,${f}px,${h}px)  rotateX(${u}deg) rotateY(${p}deg) scale(${v})`;
                    if (T(r, t).transform(w), t[0].style.zIndex = 1 - Math.abs(Math.round(l)), r.slideShadows) {
                        let e = n ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                            s = n ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                        0 === e.length && (e = S(r, t, n ? "left" : "top")), 0 === s.length && (s = S(r, t, n ? "right" : "bottom")), e.length && (e[0].style.opacity = l > 0 ? l : 0), s.length && (s[0].style.opacity = -l > 0 ? -l : 0)
                    }
                }
            },
            setTransition: t => {
                const {
                    transformEl: s
                } = e.params.coverflowEffect;
                (s ? e.slides.find(s) : e.slides).transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t)
            },
            perspective: () => !0,
            overwriteParams: () => ({
                watchSlidesProgress: !0
            })
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s
    }) {
        t({
            creativeEffect: {
                transformEl: null,
                limitProgress: 1,
                shadowPerProgress: !1,
                progressMultiplier: 1,
                perspective: !0,
                prev: {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    opacity: 1,
                    scale: 1
                },
                next: {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    opacity: 1,
                    scale: 1
                }
            }
        });
        const a = e => "string" == typeof e ? e : e + "px";
        E({
            effect: "creative",
            swiper: e,
            on: s,
            setTranslate: () => {
                const {
                    slides: t,
                    $wrapperEl: s,
                    slidesSizesGrid: i
                } = e, r = e.params.creativeEffect, {
                    progressMultiplier: n
                } = r, l = e.params.centeredSlides;
                if (l) {
                    const t = i[0] / 2 - e.params.slidesOffsetBefore || 0;
                    s.transform(`translateX(calc(50% - ${t}px))`)
                }
                for (let s = 0; s < t.length; s += 1) {
                    const i = t.eq(s),
                        o = i[0].progress,
                        d = Math.min(Math.max(i[0].progress, -r.limitProgress), r.limitProgress);
                    let c = d;
                    l || (c = Math.min(Math.max(i[0].originalProgress, -r.limitProgress), r.limitProgress));
                    const p = i[0].swiperSlideOffset,
                        u = [e.params.cssMode ? -p - e.translate : -p, 0, 0],
                        h = [0, 0, 0];
                    let m = !1;
                    e.isHorizontal() || (u[1] = u[0], u[0] = 0);
                    let f = {
                        translate: [0, 0, 0],
                        rotate: [0, 0, 0],
                        scale: 1,
                        opacity: 1
                    };
                    0 > d ? (f = r.next, m = !0) : d > 0 && (f = r.prev, m = !0), u.forEach((e, t) => {
                        u[t] = `calc(${e}px + (${a(f.translate[t])} * ${Math.abs(d*n)}))`
                    }), h.forEach((e, t) => {
                        h[t] = f.rotate[t] * Math.abs(d * n)
                    }), i[0].style.zIndex = -Math.abs(Math.round(o)) + t.length;
                    const g = u.join(", "),
                        v = `rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,
                        w = 0 > c ? `scale(${1+(1-f.scale)*c*n})` : `scale(${1-(1-f.scale)*c*n})`,
                        b = 0 > c ? 1 + (1 - f.opacity) * c * n : 1 - (1 - f.opacity) * c * n,
                        x = `translate3d(${g}) ${v} ${w}`;
                    if (m && f.shadow || !m) {
                        let e = i.children(".swiper-slide-shadow");
                        if (0 === e.length && f.shadow && (e = S(r, i)), e.length) {
                            const t = r.shadowPerProgress ? d * (1 / r.limitProgress) : d;
                            e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1)
                        }
                    }
                    const y = T(r, i);
                    y.transform(x).css({
                        opacity: b
                    }), f.origin && y.css("transform-origin", f.origin)
                }
            },
            setTransition: t => {
                const {
                    transformEl: s
                } = e.params.creativeEffect;
                (s ? e.slides.find(s) : e.slides).transition(t).find(".swiper-slide-shadow").transition(t), C({
                    swiper: e,
                    duration: t,
                    transformEl: s,
                    allSlides: !0
                })
            },
            perspective: () => e.params.creativeEffect.perspective,
            overwriteParams: () => ({
                watchSlidesProgress: !0,
                virtualTranslate: !e.params.cssMode
            })
        })
    }, function ({
        swiper: e,
        extendParams: t,
        on: s
    }) {
        t({
            cardsEffect: {
                slideShadows: !0,
                transformEl: null
            }
        }), E({
            effect: "cards",
            swiper: e,
            on: s,
            setTranslate: () => {
                const {
                    slides: t,
                    activeIndex: s
                } = e, a = e.params.cardsEffect, {
                    startTranslate: i,
                    isTouched: r
                } = e.touchEventsData, n = e.translate;
                for (let l = 0; l < t.length; l += 1) {
                    const o = t.eq(l),
                        d = o[0].progress,
                        c = Math.min(Math.max(d, -4), 4);
                    let p = o[0].swiperSlideOffset;
                    e.params.centeredSlides && !e.params.cssMode && e.$wrapperEl.transform(`translateX(${e.minTranslate()}px)`), e.params.centeredSlides && e.params.cssMode && (p -= t[0].swiperSlideOffset);
                    let u = e.params.cssMode ? -p - e.translate : -p,
                        h = 0;
                    const m = -100 * Math.abs(c);
                    let f = 1,
                        g = -2 * c,
                        v = 8 - .75 * Math.abs(c);
                    const w = (l === s || l === s - 1) && c > 0 && 1 > c && (r || e.params.cssMode) && i > n,
                        b = (l === s || l === s + 1) && 0 > c && c > -1 && (r || e.params.cssMode) && n > i;
                    if (w || b) {
                        const e = (1 - Math.abs((Math.abs(c) - .5) / .5)) ** .5;
                        g += -28 * c * e, f += -.5 * e, v += 96 * e, h = -25 * e * Math.abs(c) + "%"
                    }
                    if (u = 0 > c ? `calc(${u}px + (${v*Math.abs(c)}%))` : c > 0 ? `calc(${u}px + (-${v*Math.abs(c)}%))` : u + "px", !e.isHorizontal()) {
                        const e = h;
                        h = u, u = e
                    }
                    const x = `\n        translate3d(${u}, ${h}, ${m}px)\n        rotateZ(${g}deg)\n        scale(${0>c?""+(1+(1-f)*c):""+(1-(1-f)*c)})\n      `;
                    if (a.slideShadows) {
                        let e = o.find(".swiper-slide-shadow");
                        0 === e.length && (e = S(a, o)), e.length && (e[0].style.opacity = Math.min(Math.max((Math.abs(c) - .5) / .5, 0), 1))
                    }
                    o[0].style.zIndex = -Math.abs(Math.round(d)) + t.length, T(a, o).transform(x)
                }
            },
            setTransition: t => {
                const {
                    transformEl: s
                } = e.params.cardsEffect;
                (s ? e.slides.find(s) : e.slides).transition(t).find(".swiper-slide-shadow").transition(t), C({
                    swiper: e,
                    duration: t,
                    transformEl: s
                })
            },
            perspective: () => !0,
            overwriteParams: () => ({
                watchSlidesProgress: !0,
                virtualTranslate: !e.params.cssMode
            })
        })
    }];
    return H.use(X), H
});
const projectSwiper = new Swiper(".projectSwiper", {
        enabled: !1
    }),
    projectInfoSwiper = new Swiper(".projectInfoSwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination"
        },
        navigation: {
            nextEl: ".projectInfoSwiper__button-next",
            prevEl: ".projectInfoSwiper__button-prev"
        }
    });
projectSwiper.controller.control = projectInfoSwiper, projectInfoSwiper.controller.control = projectSwiper;
const observer = new IntersectionObserver((e, t) => {
    e.forEach(e => {
        if (e.isIntersecting) {
            let t = e.target.getBoundingClientRect().top;
            window.scrollBy({
                top: t,
                behavior: "smooth"
            })
        }
    })
}, {
    threshold: .15
});

$(function () {
    $(".menu-icon").on("click", function () {
        $(".header__main-menu").slideToggle();

    });

    $(".menu__arrow").on('click', function () {
        if ($(this).parent('.header-menu__link').has('.header-submenu')) {
            $(this).next().slideToggle(150)
        }
    });

})
fixedHeader();

function windowSize() {
    const windowInnerWidth = window.innerWidth;
    if (windowInnerWidth > 992) {
        document.querySelectorAll('.anchor').forEach(el => observer.observe(el));
    }
}


window.addEventListener('load', windowSize);
window.addEventListener('resize', windowSize)

$(window).on('load resize', windowSize);
$(window).scroll(function () {
    var height = $(window).scrollTop();
    if (height > 10) {
        $('header').addClass('header-background');
    } else {
        $('header').removeClass('header-background');
    }
});