if (
    (!(function ($) {
        "use strict";
        ($.fn.fitVids = function (options) {
            var head,
                div,
                settings = { customSelector: null, ignore: null };
            return (
                document.getElementById("fit-vids-style") ||
                    ((head = document.head || document.getElementsByTagName("head")[0]),
                    ((div = document.createElement("div")).innerHTML =
                        '<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>'),
                    head.appendChild(div.childNodes[1])),
                options && $.extend(settings, options),
                this.each(function () {
                    var selectors = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"],
                        ignoreList = (settings.customSelector && selectors.push(settings.customSelector), ".fitvidsignore"),
                        selectors = (settings.ignore && (ignoreList = ignoreList + ", " + settings.ignore), $(this).find(selectors.join(",")));
                    (selectors = (selectors = selectors.not("object object")).not(ignoreList)).each(function () {
                        var aspectRatio,
                            videoName,
                            $this = $(this);
                        0 < $this.parents(ignoreList).length ||
                            ("embed" === this.tagName.toLowerCase() && $this.parent("object").length) ||
                            $this.parent(".fluid-width-video-wrapper").length ||
                            ($this.css("height") || $this.css("width") || (!isNaN($this.attr("height")) && !isNaN($this.attr("width"))) || ($this.attr("height", 9), $this.attr("width", 16)),
                            (aspectRatio =
                                ("object" === this.tagName.toLowerCase() || ($this.attr("height") && !isNaN(parseInt($this.attr("height"), 10))) ? parseInt($this.attr("height"), 10) : $this.height()) /
                                (isNaN(parseInt($this.attr("width"), 10)) ? $this.width() : parseInt($this.attr("width"), 10))),
                            $this.attr("name") || ((videoName = "fitvid" + $.fn.fitVids._count), $this.attr("name", videoName), $.fn.fitVids._count++),
                            $this
                                .wrap('<div class="fluid-width-video-wrapper"></div>')
                                .parent(".fluid-width-video-wrapper")
                                .css("padding-top", 100 * aspectRatio + "%"),
                            $this.removeAttr("height").removeAttr("width"));
                    });
                })
            );
        }),
            ($.fn.fitVids._count = 0);
    })(window.jQuery || window.Zepto),
    !(function (a) {
        "use strict";
        function b(b, c) {
            (this.element = a(b)), (this.settings = a.extend({}, d, c)), (this._defaults = d), this._init();
        }
        var c = "Morphext",
            d = { animation: "bounceIn", separator: ",", speed: 2e3, complete: a.noop };
        (b.prototype = {
            _init: function () {
                var b = this;
                (this.phrases = []),
                    this.element.addClass("morphext"),
                    a.each(this.element.html().split(this.settings.separator), function (c, d) {
                        b.phrases.push(a.trim(d));
                    }),
                    (this.index = -1),
                    this.animate(),
                    this.start();
            },
            animate: function () {
                (this.index = ++this.index % this.phrases.length),
                    (this.element[0].innerHTML = '<span class="animated ' + this.settings.animation + '">' + this.phrases[this.index] + "</span>"),
                    a.isFunction(this.settings.complete) && this.settings.complete.call(this);
            },
            start: function () {
                var a = this;
                this._interval = setInterval(function () {
                    a.animate();
                }, this.settings.speed);
            },
            stop: function () {
                this._interval = clearInterval(this._interval);
            },
        }),
            (a.fn[c] = function (d) {
                return this.each(function () {
                    a.data(this, "plugin_" + c) || a.data(this, "plugin_" + c, new b(this, d));
                });
            });
    })(jQuery),
    !(function (a, d, p) {
        (a.fn.backstretch = function (c, b) {
            return (
                (c !== p && 0 !== c.length) || a.error("No images were supplied for Backstretch"),
                0 === a(d).scrollTop() && d.scrollTo(0, 0),
                this.each(function () {
                    var d = a(this),
                        g = d.data("backstretch");
                    if (g) {
                        if ("string" == typeof c && "function" == typeof g[c]) return void g[c](b);
                        (b = a.extend(g.options, b)), g.destroy(!0);
                    }
                    (g = new q(this, c, b)), d.data("backstretch", g);
                })
            );
        }),
            (a.backstretch = function (c, b) {
                return a("body").backstretch(c, b).data("backstretch");
            }),
            (a.expr[":"].backstretch = function (c) {
                return a(c).data("backstretch") !== p;
            }),
            (a.fn.backstretch.defaults = { centeredX: !0, centeredY: !0, duration: 5e3, fade: 0 });
        var r = { left: 0, top: 0, overflow: "hidden", margin: 0, padding: 0, height: "100%", width: "100%", zIndex: -999999 },
            s = { position: "absolute", display: "none", margin: 0, padding: 0, border: "none", width: "auto", height: "auto", maxHeight: "none", maxWidth: "none", zIndex: -999999 },
            q = function (c, b, e) {
                (this.options = a.extend({}, a.fn.backstretch.defaults, e || {})),
                    (this.images = a.isArray(b) ? b : [b]),
                    a.each(this.images, function () {
                        a("<img alt=\"NOBLE TYRES & EXHAUSTS. 1ST CHOICE CAR GARAGE FOR TYRES, EXHAUSTS, BRAKES, MOT AND SERVICING IN ABERDARE\"/>")[0].src = this;
                    }),
                    (this.isBody = c === document.body),
                    (this.$container = a(c)),
                    (this.$root = this.isBody ? a(l ? d : document) : this.$container),
                    (c = this.$container.children(".backstretch").first()),
                    (this.$wrap = c.length ? c : a('<div class="backstretch"></div>').css(r).appendTo(this.$container)),
                    this.isBody ||
                        ((c = this.$container.css("position")),
                        (b = this.$container.css("zIndex")),
                        this.$container.css({ position: "static" === c ? "relative" : c, zIndex: "auto" === b ? 0 : b, background: "none" }),
                        this.$wrap.css({ zIndex: -999998 })),
                    this.$wrap.css({ position: this.isBody && l ? "fixed" : "absolute" }),
                    (this.index = 0),
                    this.show(this.index),
                    a(d)
                        .on("resize.backstretch", a.proxy(this.resize, this))
                        .on(
                            "orientationchange.backstretch",
                            a.proxy(function () {
                                this.isBody && 0 === d.pageYOffset && (d.scrollTo(0, 1), this.resize());
                            }, this)
                        );
            };
        q.prototype = {
            resize: function () {
                try {
                    var f,
                        a = { left: 0, top: 0 },
                        b = this.isBody ? this.$root.width() : this.$root.innerWidth(),
                        e = b,
                        g = this.isBody ? d.innerHeight || this.$root.height() : this.$root.innerHeight(),
                        j = e / this.$img.data("ratio");
                    g <= j ? ((f = (j - g) / 2), this.options.centeredY && (a.top = "-" + f + "px")) : ((f = ((e = (j = g) * this.$img.data("ratio")) - b) / 2), this.options.centeredX && (a.left = "-" + f + "px")),
                        this.$wrap.css({ width: b, height: g }).find("img:not(.deleteable)").css({ width: e, height: j }).css(a);
                } catch (h) {}
                return this;
            },
            show: function (c) {
                var b, e, d;
                if (!(Math.abs(c) > this.images.length - 1))
                    return (
                        (e = (b = this).$wrap.find("img").addClass("deleteable")),
                        (d = { relatedTarget: b.$container[0] }),
                        b.$container.trigger(a.Event("backstretch.before", d), [b, c]),
                        (this.index = c),
                        clearInterval(b.interval),
                        (b.$img = a("<img alt=\"NOBLE TYRES & EXHAUSTS. 1ST CHOICE CAR GARAGE FOR TYRES, EXHAUSTS, BRAKES, MOT AND SERVICING IN ABERDARE\"/>")
                            .css(s)
                            .bind("load", function (f) {
                                var h = this.width || a(f.target).width();
                                (f = this.height || a(f.target).height()),
                                    a(this).data("ratio", h / f),
                                    a(this).fadeIn(b.options.speed || b.options.fade, function () {
                                        e.remove(),
                                            b.paused || b.cycle(),
                                            a(["after", "show"]).each(function () {
                                                b.$container.trigger(a.Event("backstretch." + this, d), [b, c]);
                                            });
                                    }),
                                    b.resize();
                            })
                            .appendTo(b.$wrap)),
                        b.$img.attr("src", b.images[c]),
                        b
                    );
            },
            next: function () {
                return this.show(this.index < this.images.length - 1 ? this.index + 1 : 0);
            },
            prev: function () {
                return this.show(0 === this.index ? this.images.length - 1 : this.index - 1);
            },
            pause: function () {
                return (this.paused = !0), this;
            },
            resume: function () {
                return (this.paused = !1), this.next(), this;
            },
            cycle: function () {
                return (
                    1 < this.images.length &&
                        (clearInterval(this.interval),
                        (this.interval = setInterval(
                            a.proxy(function () {
                                this.paused || this.next();
                            }, this),
                            this.options.duration
                        ))),
                    this
                );
            },
            destroy: function (c) {
                a(d).off("resize.backstretch orientationchange.backstretch"), clearInterval(this.interval), c || this.$wrap.remove(), this.$container.removeData("backstretch");
            },
        };
        var f = navigator.userAgent,
            m = navigator.platform,
            e = !!(e = f.match(/AppleWebKit\/([0-9]+)/)) && e[1],
            h = !!(h = f.match(/Fennec\/([0-9]+)/)) && h[1],
            n = f.match(/Opera Mobi\/([0-9]+)/),
            t = !!n && n[1],
            k = !!(k = f.match(/MSIE ([0-9]+)/)) && k[1],
            l = !(
                ((-1 < m.indexOf("iPhone") || -1 < m.indexOf("iPad") || -1 < m.indexOf("iPod")) && e && e < 534) ||
                (d.operamini && "[object OperaMini]" === {}.toString.call(d.operamini)) ||
                (n && t < 7458) ||
                (-1 < f.indexOf("Android") && e && e < 533) ||
                (h && h < 6) ||
                ("palmGetResource" in d && e && e < 534) ||
                (-1 < f.indexOf("MeeGo") && -1 < f.indexOf("NokiaBrowser/8.5.0")) ||
                (k && k <= 6)
            );
    })(jQuery, window),
    !function () {
        function f(a, b) {
            return function () {
                return a.apply(b, arguments);
            };
        }
        var g =
                [].indexOf ||
                function (a) {
                    for (var b = 0, c = this.length; b < c; b++) if (b in this && this[b] === a) return b;
                    return -1;
                },
            b = (function () {
                function a() {}
                return (
                    (a.prototype.extend = function (a, b) {
                        var c, d;
                        for (c in b) (d = b[c]), null == a[c] && (a[c] = d);
                        return a;
                    }),
                    (a.prototype.isMobile = function (a) {
                        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a);
                    }),
                    (a.prototype.createEvent = function (a, b, c, d) {
                        var e;
                        return (
                            null == b && (b = !1),
                            null == c && (c = !1),
                            null == d && (d = null),
                            null != document.createEvent ? (e = document.createEvent("CustomEvent")).initCustomEvent(a, b, c, d) : null != document.createEventObject ? ((e = document.createEventObject()).eventType = a) : (e.eventName = a),
                            e
                        );
                    }),
                    (a.prototype.emitEvent = function (a, b) {
                        return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0;
                    }),
                    (a.prototype.addEvent = function (a, b, c) {
                        return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : (a[b] = c);
                    }),
                    (a.prototype.removeEvent = function (a, b, c) {
                        return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b];
                    }),
                    (a.prototype.innerHeight = function () {
                        return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight;
                    }),
                    a
                );
            })(),
            c =
                this.WeakMap ||
                this.MozWeakMap ||
                (function () {
                    function a() {
                        (this.keys = []), (this.values = []);
                    }
                    return (
                        (a.prototype.get = function (a) {
                            for (var d, f = this.keys, b = (d = 0), e = f.length; d < e; b = ++d) if (f[b] === a) return this.values[b];
                        }),
                        (a.prototype.set = function (a, b) {
                            for (var e, g = this.keys, c = (e = 0), f = g.length; e < f; c = ++e) if (g[c] === a) return void (this.values[c] = b);
                            return this.keys.push(a), this.values.push(b);
                        }),
                        a
                    );
                })(),
            a =
                this.MutationObserver ||
                this.WebkitMutationObserver ||
                this.MozMutationObserver ||
                (function () {
                    function a() {
                        "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."),
                            "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.");
                    }
                    return (a.notSupported = !0), (a.prototype.observe = function () {}), a;
                })(),
            d =
                this.getComputedStyle ||
                function (a) {
                    return (
                        (this.getPropertyValue = function (b) {
                            var c;
                            return (
                                e.test((b = "float" === b ? "styleFloat" : b)) &&
                                    b.replace(e, function (a, b) {
                                        return b.toUpperCase();
                                    }),
                                (null != (c = a.currentStyle) ? c[b] : void 0) || null
                            );
                        }),
                        this
                    );
                },
            e = /(\-([a-z]){1})/g;
        this.WOW = (function () {
            function e(a) {
                null == a && (a = {}),
                    (this.scrollCallback = f(this.scrollCallback, this)),
                    (this.scrollHandler = f(this.scrollHandler, this)),
                    (this.resetAnimation = f(this.resetAnimation, this)),
                    (this.start = f(this.start, this)),
                    (this.scrolled = !0),
                    (this.config = this.util().extend(a, this.defaults)),
                    null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)),
                    (this.animationNameCache = new c()),
                    (this.wowEvent = this.util().createEvent(this.config.boxClass));
            }
            return (
                (e.prototype.defaults = { boxClass: "wow", animateClass: "animated", offset: 0, mobile: !0, live: !0, callback: null, scrollContainer: null }),
                (e.prototype.init = function () {
                    var a;
                    return (
                        (this.element = window.document.documentElement), "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), (this.finished = [])
                    );
                }),
                (e.prototype.start = function () {
                    var b, c, d, e;
                    if (
                        ((this.stopped = !1),
                        (this.boxes = function () {
                            for (var d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; a < c; a++) (b = d[a]), e.push(b);
                            return e;
                        }.call(this)),
                        (this.all = function () {
                            for (var d = this.boxes, e = [], a = 0, c = d.length; a < c; a++) (b = d[a]), e.push(b);
                            return e;
                        }.call(this)),
                        this.boxes.length)
                    )
                        if (this.disabled()) this.resetStyle();
                        else for (c = 0, d = (e = this.boxes).length; c < d; c++) (b = e[c]), this.applyStyle(b, !0);
                    return (
                        this.disabled() ||
                            (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), (this.interval = setInterval(this.scrollCallback, 50))),
                        this.config.live
                            ? new a(
                                  (function (a) {
                                      return function (b) {
                                          for (var e, f, g = [], c = 0, d = b.length; c < d; c++)
                                              (f = b[c]),
                                                  g.push(
                                                      function () {
                                                          for (var c = f.addedNodes || [], d = [], a = 0, b = c.length; a < b; a++) (e = c[a]), d.push(this.doSync(e));
                                                          return d;
                                                      }.call(a)
                                                  );
                                          return g;
                                      };
                                  })(this)
                              ).observe(document.body, { childList: !0, subtree: !0 })
                            : void 0
                    );
                }),
                (e.prototype.stop = function () {
                    return (
                        (this.stopped = !0),
                        this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler),
                        this.util().removeEvent(window, "resize", this.scrollHandler),
                        null != this.interval ? clearInterval(this.interval) : void 0
                    );
                }),
                (e.prototype.sync = function () {
                    return a.notSupported ? this.doSync(this.element) : void 0;
                }),
                (e.prototype.doSync = function (a) {
                    var b, c, d, e, f;
                    if (1 === (a = null == a ? this.element : a).nodeType) {
                        for (f = [], c = 0, d = (e = (a = a.parentNode || a).querySelectorAll("." + this.config.boxClass)).length; c < d; c++)
                            (b = e[c]), g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push((this.scrolled = !0))) : f.push(void 0);
                        return f;
                    }
                }),
                (e.prototype.show = function (a) {
                    return (
                        this.applyStyle(a),
                        (a.className = a.className + " " + this.config.animateClass),
                        null != this.config.callback && this.config.callback(a),
                        this.util().emitEvent(a, this.wowEvent),
                        this.util().addEvent(a, "animationend", this.resetAnimation),
                        this.util().addEvent(a, "oanimationend", this.resetAnimation),
                        this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation),
                        this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation),
                        a
                    );
                }),
                (e.prototype.applyStyle = function (a, b) {
                    var f,
                        d = a.getAttribute("data-wow-duration"),
                        c = a.getAttribute("data-wow-delay"),
                        e = a.getAttribute("data-wow-iteration");
                    return this.animate(
                        ((f = this),
                        function () {
                            return f.customStyle(a, b, d, c, e);
                        })
                    );
                }),
                (e.prototype.animate =
                    "requestAnimationFrame" in window
                        ? function (a) {
                              return window.requestAnimationFrame(a);
                          }
                        : function (a) {
                              return a();
                          }),
                (e.prototype.resetStyle = function () {
                    for (var a, d = this.boxes, e = [], b = 0, c = d.length; b < c; b++) (a = d[b]), e.push((a.style.visibility = "visible"));
                    return e;
                }),
                (e.prototype.resetAnimation = function (a) {
                    return 0 <= a.type.toLowerCase().indexOf("animationend") ? ((a = a.target || a.srcElement).className = a.className.replace(this.config.animateClass, "").trim()) : void 0;
                }),
                (e.prototype.customStyle = function (a, b, c, d, e) {
                    return (
                        b && this.cacheAnimationName(a),
                        (a.style.visibility = b ? "hidden" : "visible"),
                        c && this.vendorSet(a.style, { animationDuration: c }),
                        d && this.vendorSet(a.style, { animationDelay: d }),
                        e && this.vendorSet(a.style, { animationIterationCount: e }),
                        this.vendorSet(a.style, { animationName: b ? "none" : this.cachedAnimationName(a) }),
                        a
                    );
                }),
                (e.prototype.vendors = ["moz", "webkit"]),
                (e.prototype.vendorSet = function (a, b) {
                    var c,
                        e,
                        f,
                        d = [];
                    for (c in b)
                        (e = b[c]),
                            (a["" + c] = e),
                            d.push(
                                function () {
                                    for (var g = this.vendors, h = [], b = 0, d = g.length; b < d; b++) (f = g[b]), h.push((a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e));
                                    return h;
                                }.call(this)
                            );
                    return d;
                }),
                (e.prototype.vendorCSS = function (a, b) {
                    for (var i, h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; c < e; c++) (i = f[c]), (g = g || h.getPropertyCSSValue("-" + i + "-" + b));
                    return g;
                }),
                (e.prototype.animationName = function (a) {
                    var b;
                    try {
                        b = this.vendorCSS(a, "animation-name").cssText;
                    } catch (c) {
                        b = d(a).getPropertyValue("animation-name");
                    }
                    return "none" === b ? "" : b;
                }),
                (e.prototype.cacheAnimationName = function (a) {
                    return this.animationNameCache.set(a, this.animationName(a));
                }),
                (e.prototype.cachedAnimationName = function (a) {
                    return this.animationNameCache.get(a);
                }),
                (e.prototype.scrollHandler = function () {
                    return (this.scrolled = !0);
                }),
                (e.prototype.scrollCallback = function () {
                    var a;
                    return !this.scrolled ||
                        ((this.scrolled = !1),
                        (this.boxes = function () {
                            for (var d = this.boxes, e = [], b = 0, c = d.length; b < c; b++) (a = d[b]) && (this.isVisible(a) ? this.show(a) : e.push(a));
                            return e;
                        }.call(this)),
                        this.boxes.length) ||
                        this.config.live
                        ? void 0
                        : this.stop();
                }),
                (e.prototype.offsetTop = function (a) {
                    for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
                    for (b = a.offsetTop; (a = a.offsetParent); ) b += a.offsetTop;
                    return b;
                }),
                (e.prototype.isVisible = function (a) {
                    var c = a.getAttribute("data-wow-offset") || this.config.offset,
                        f = (this.config.scrollContainer && this.config.scrollContainer.scrollTop) || window.pageYOffset,
                        c = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c,
                        d = this.offsetTop(a),
                        a = d + a.clientHeight;
                    return d <= c && f <= a;
                }),
                (e.prototype.util = function () {
                    return null != this._util ? this._util : (this._util = new b());
                }),
                (e.prototype.disabled = function () {
                    return !this.config.mobile && this.util().isMobile(navigator.userAgent);
                }),
                e
            );
        })();
    }.call(this),
    !(function () {
        "use strict";
        function t(o) {
            if (!o) throw new Error("No options passed to Waypoint constructor");
            if (!o.element) throw new Error("No element option passed to Waypoint constructor");
            if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
            (this.key = "waypoint-" + e),
                (this.options = t.Adapter.extend({}, t.defaults, o)),
                (this.element = this.options.element),
                (this.adapter = new t.Adapter(this.element)),
                (this.callback = o.handler),
                (this.axis = this.options.horizontal ? "horizontal" : "vertical"),
                (this.enabled = this.options.enabled),
                (this.triggerPoint = null),
                (this.group = t.Group.findOrCreate({ name: this.options.group, axis: this.axis })),
                (this.context = t.Context.findOrCreateByElement(this.options.context)),
                t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]),
                this.group.add(this),
                this.context.add(this),
                (i[this.key] = this),
                (e += 1);
        }
        var e = 0,
            i = {};
        (t.prototype.queueTrigger = function (t) {
            this.group.queueTrigger(this, t);
        }),
            (t.prototype.trigger = function (t) {
                this.enabled && this.callback && this.callback.apply(this, t);
            }),
            (t.prototype.destroy = function () {
                this.context.remove(this), this.group.remove(this), delete i[this.key];
            }),
            (t.prototype.disable = function () {
                return (this.enabled = !1), this;
            }),
            (t.prototype.enable = function () {
                return this.context.refresh(), (this.enabled = !0), this;
            }),
            (t.prototype.next = function () {
                return this.group.next(this);
            }),
            (t.prototype.previous = function () {
                return this.group.previous(this);
            }),
            (t.invokeAll = function (t) {
                var o,
                    e = [];
                for (o in i) e.push(i[o]);
                for (var n = 0, r = e.length; n < r; n++) e[n][t]();
            }),
            (t.destroyAll = function () {
                t.invokeAll("destroy");
            }),
            (t.disableAll = function () {
                t.invokeAll("disable");
            }),
            (t.enableAll = function () {
                for (var e in (t.Context.refreshAll(), i)) i[e].enabled = !0;
                return this;
            }),
            (t.refreshAll = function () {
                t.Context.refreshAll();
            }),
            (t.viewportHeight = function () {
                return window.innerHeight || document.documentElement.clientHeight;
            }),
            (t.viewportWidth = function () {
                return document.documentElement.clientWidth;
            }),
            (t.adapters = []),
            (t.defaults = { context: window, continuous: !0, enabled: !0, group: "default", horizontal: !1, offset: 0 }),
            (t.offsetAliases = {
                "bottom-in-view": function () {
                    return this.context.innerHeight() - this.adapter.outerHeight();
                },
                "right-in-view": function () {
                    return this.context.innerWidth() - this.adapter.outerWidth();
                },
            }),
            (window.Waypoint = t);
    })(),
    (function () {
        "use strict";
        function t(t) {
            window.setTimeout(t, 1e3 / 60);
        }
        function e(t) {
            (this.element = t),
                (this.Adapter = n.Adapter),
                (this.adapter = new this.Adapter(t)),
                (this.key = "waypoint-context-" + i),
                (this.didScroll = !1),
                (this.didResize = !1),
                (this.oldScroll = { x: this.adapter.scrollLeft(), y: this.adapter.scrollTop() }),
                (this.waypoints = { vertical: {}, horizontal: {} }),
                (t.waypointContextKey = this.key),
                (o[t.waypointContextKey] = this),
                (i += 1),
                n.windowContext || ((n.windowContext = !0), (n.windowContext = new e(window))),
                this.createThrottledScrollHandler(),
                this.createThrottledResizeHandler();
        }
        var i = 0,
            o = {},
            n = window.Waypoint,
            r = window.onload;
        (e.prototype.add = function (t) {
            var e = t.options.horizontal ? "horizontal" : "vertical";
            (this.waypoints[e][t.key] = t), this.refresh();
        }),
            (e.prototype.checkEmpty = function () {
                var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
                    e = this.Adapter.isEmptyObject(this.waypoints.vertical),
                    i = this.element == this.element.window;
                t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key]);
            }),
            (e.prototype.createThrottledResizeHandler = function () {
                function t() {
                    e.handleResize(), (e.didResize = !1);
                }
                var e = this;
                this.adapter.on("resize.waypoints", function () {
                    e.didResize || ((e.didResize = !0), n.requestAnimationFrame(t));
                });
            }),
            (e.prototype.createThrottledScrollHandler = function () {
                function t() {
                    e.handleScroll(), (e.didScroll = !1);
                }
                var e = this;
                this.adapter.on("scroll.waypoints", function () {
                    (e.didScroll && !n.isTouch) || ((e.didScroll = !0), n.requestAnimationFrame(t));
                });
            }),
            (e.prototype.handleResize = function () {
                n.Context.refreshAll();
            }),
            (e.prototype.handleScroll = function () {
                var i,
                    c,
                    t = {},
                    e = {
                        horizontal: { newScroll: this.adapter.scrollLeft(), oldScroll: this.oldScroll.x, forward: "right", backward: "left" },
                        vertical: { newScroll: this.adapter.scrollTop(), oldScroll: this.oldScroll.y, forward: "down", backward: "up" },
                    };
                for (i in e) {
                    var s,
                        o = e[i],
                        r = o.newScroll > o.oldScroll ? o.forward : o.backward;
                    for (s in this.waypoints[i]) {
                        var l,
                            h,
                            a = this.waypoints[i][s];
                        null !== a.triggerPoint && ((l = o.oldScroll < a.triggerPoint), (h = o.newScroll >= a.triggerPoint), (l && h) || (!l && !h)) && (a.queueTrigger(r), (t[a.group.id] = a.group));
                    }
                }
                for (c in t) t[c].flushTriggers();
                this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll };
            }),
            (e.prototype.innerHeight = function () {
                return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight();
            }),
            (e.prototype.remove = function (t) {
                delete this.waypoints[t.axis][t.key], this.checkEmpty();
            }),
            (e.prototype.innerWidth = function () {
                return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth();
            }),
            (e.prototype.destroy = function () {
                var e,
                    t = [];
                for (e in this.waypoints) for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
                for (var o = 0, n = t.length; o < n; o++) t[o].destroy();
            }),
            (e.prototype.refresh = function () {
                var t,
                    r,
                    e = this.element == this.element.window,
                    i = e ? void 0 : this.adapter.offset(),
                    o = {};
                for (r in (this.handleScroll(),
                (t = {
                    horizontal: { contextOffset: e ? 0 : i.left, contextScroll: e ? 0 : this.oldScroll.x, contextDimension: this.innerWidth(), oldScroll: this.oldScroll.x, forward: "right", backward: "left", offsetProp: "left" },
                    vertical: { contextOffset: e ? 0 : i.top, contextScroll: e ? 0 : this.oldScroll.y, contextDimension: this.innerHeight(), oldScroll: this.oldScroll.y, forward: "down", backward: "up", offsetProp: "top" },
                }))) {
                    var a,
                        s = t[r];
                    for (a in this.waypoints[r]) {
                        var l,
                            d = this.waypoints[r][a],
                            f = d.options.offset,
                            w = d.triggerPoint,
                            y = 0,
                            g = null == w;
                        d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]),
                            "function" == typeof f ? (f = f.apply(d)) : "string" == typeof f && ((f = parseFloat(f)), -1 < d.options.offset.indexOf("%")) && (f = Math.ceil((s.contextDimension * f) / 100)),
                            (l = s.contextScroll - s.contextOffset),
                            (d.triggerPoint = Math.floor(y + l - f)),
                            (y = w < s.oldScroll),
                            (l = d.triggerPoint >= s.oldScroll),
                            (f = !y && !l),
                            !g && y && l ? (d.queueTrigger(s.backward), (o[d.group.id] = d.group)) : ((!g && f) || (g && s.oldScroll >= d.triggerPoint)) && (d.queueTrigger(s.forward), (o[d.group.id] = d.group));
                    }
                }
                return (
                    n.requestAnimationFrame(function () {
                        for (var t in o) o[t].flushTriggers();
                    }),
                    this
                );
            }),
            (e.findOrCreateByElement = function (t) {
                return e.findByElement(t) || new e(t);
            }),
            (e.refreshAll = function () {
                for (var t in o) o[t].refresh();
            }),
            (e.findByElement = function (t) {
                return o[t.waypointContextKey];
            }),
            (window.onload = function () {
                r && r(), e.refreshAll();
            }),
            (n.requestAnimationFrame = function (e) {
                (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t).call(window, e);
            }),
            (n.Context = e);
    })(),
    (function () {
        "use strict";
        function t(t, e) {
            return t.triggerPoint - e.triggerPoint;
        }
        function e(t, e) {
            return e.triggerPoint - t.triggerPoint;
        }
        function i(t) {
            (this.name = t.name), (this.axis = t.axis), (this.id = this.name + "-" + this.axis), (this.waypoints = []), this.clearTriggerQueues(), (o[this.axis][this.name] = this);
        }
        var o = { vertical: {}, horizontal: {} },
            n = window.Waypoint;
        (i.prototype.add = function (t) {
            this.waypoints.push(t);
        }),
            (i.prototype.clearTriggerQueues = function () {
                this.triggerQueues = { up: [], down: [], left: [], right: [] };
            }),
            (i.prototype.flushTriggers = function () {
                for (var i in this.triggerQueues) {
                    var o = this.triggerQueues[i];
                    o.sort("up" === i || "left" === i ? e : t);
                    for (var r = 0, s = o.length; r < s; r += 1) {
                        var a = o[r];
                        (!a.options.continuous && r !== o.length - 1) || a.trigger([i]);
                    }
                }
                this.clearTriggerQueues();
            }),
            (i.prototype.next = function (e) {
                this.waypoints.sort(t);
                e = n.Adapter.inArray(e, this.waypoints);
                return e === this.waypoints.length - 1 ? null : this.waypoints[e + 1];
            }),
            (i.prototype.previous = function (e) {
                this.waypoints.sort(t);
                e = n.Adapter.inArray(e, this.waypoints);
                return e ? this.waypoints[e - 1] : null;
            }),
            (i.prototype.queueTrigger = function (t, e) {
                this.triggerQueues[e].push(t);
            }),
            (i.prototype.remove = function (t) {
                t = n.Adapter.inArray(t, this.waypoints);
                -1 < t && this.waypoints.splice(t, 1);
            }),
            (i.prototype.first = function () {
                return this.waypoints[0];
            }),
            (i.prototype.last = function () {
                return this.waypoints[this.waypoints.length - 1];
            }),
            (i.findOrCreate = function (t) {
                return o[t.axis][t.name] || new i(t);
            }),
            (n.Group = i);
    })(),
    (function () {
        "use strict";
        function t(t) {
            this.$element = e(t);
        }
        var e = window.jQuery,
            i = window.Waypoint;
        e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function (e, i) {
            t.prototype[i] = function () {
                var t = Array.prototype.slice.call(arguments);
                return this.$element[i].apply(this.$element, t);
            };
        }),
            e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
                t[o] = e[o];
            }),
            i.adapters.push({ name: "jquery", Adapter: t }),
            (i.Adapter = t);
    })(),
    (function () {
        "use strict";
        function t(t) {
            return function () {
                var i = [],
                    o = arguments[0];
                return (
                    t.isFunction(arguments[0]) && ((o = t.extend({}, arguments[1])).handler = arguments[0]),
                    this.each(function () {
                        var n = t.extend({}, o, { element: this });
                        "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n));
                    }),
                    i
                );
            };
        }
        var e = window.Waypoint;
        window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
    })(),
    !(function (t, e) {
        "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? (module.exports = e(require, 0, module)) : (t.Tether = e());
    })(this, function (t, e, o) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function n(t) {
            var i,
                e = t.getBoundingClientRect(),
                o = {};
            for (i in e) o[i] = e[i];
            return t.ownerDocument !== document && (t = t.ownerDocument.defaultView.frameElement) && ((t = n(t)), (o.top += t.top), (o.bottom += t.top), (o.left += t.left), (o.right += t.left)), o;
        }
        function r(t) {
            var o = (getComputedStyle(t) || {}).position,
                i = [];
            if ("fixed" === o) return [t];
            for (var n = t; (n = n.parentNode) && 1 === n.nodeType; ) {
                var r = void 0;
                try {
                    r = getComputedStyle(n);
                } catch (s) {}
                if (null == r) return i.push(n), i;
                var a = r,
                    f = a.overflow,
                    l = a.overflowX,
                    a = a.overflowY;
                /(auto|scroll|overlay)/.test(f + a + l) && ("absolute" !== o || 0 <= ["relative", "absolute", "fixed"].indexOf(r.position)) && i.push(n);
            }
            return i.push(t.ownerDocument.body), t.ownerDocument !== document && i.push(t.ownerDocument.defaultView), i;
        }
        function s() {
            A && document.body.removeChild(A), (A = null);
        }
        function a(t) {
            var e = void 0,
                o = (t === document ? (t = (e = document).documentElement) : (e = t.ownerDocument), e.documentElement),
                t = n(t),
                r = (function () {
                    var t = A,
                        e =
                            ((t && document.body.contains(t)) || ((t = document.createElement("div")).setAttribute("data-tether-id", T()), h(t.style, { top: 0, left: 0, position: "absolute" }), document.body.appendChild(t), (A = t)),
                            t.getAttribute("data-tether-id"));
                    return (
                        "undefined" == typeof S[e] &&
                            ((S[e] = n(t)),
                            k(function () {
                                delete S[e];
                            })),
                        S[e]
                    );
                })();
            return (
                (t.top -= r.top),
                (t.left -= r.left),
                void 0 === t.width && (t.width = document.body.scrollWidth - t.left - t.right),
                void 0 === t.height && (t.height = document.body.scrollHeight - t.top - t.bottom),
                (t.top = t.top - o.clientTop),
                (t.left = t.left - o.clientLeft),
                (t.right = e.body.clientWidth - t.width - t.left),
                (t.bottom = e.body.clientHeight - t.height - t.top),
                t
            );
        }
        function f(t) {
            return t.offsetParent || document.documentElement;
        }
        function l() {
            var o, t, e;
            return (
                M ||
                (((t = document.createElement("div")).style.width = "100%"),
                (t.style.height = "200px"),
                (e = document.createElement("div")),
                h(e.style, { position: "absolute", top: 0, left: 0, pointerEvents: "none", visibility: "hidden", width: "200px", height: "150px", overflow: "hidden" }),
                e.appendChild(t),
                document.body.appendChild(e),
                (o = t.offsetWidth),
                (e.style.overflow = "scroll"),
                o === (t = t.offsetWidth) && (t = e.clientWidth),
                document.body.removeChild(e),
                (M = { width: (e = o - t), height: e }))
            );
        }
        function h() {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                e = [];
            return (
                Array.prototype.push.apply(e, arguments),
                e.slice(1).forEach(function (e) {
                    if (e) for (var o in e) !{}.hasOwnProperty.call(e, o) || (t[o] = e[o]);
                }),
                t
            );
        }
        function d(t, e) {
            void 0 !== t.classList
                ? e.split(" ").forEach(function (e) {
                      e.trim() && t.classList.remove(e);
                  })
                : ((e = new RegExp("(^| )" + e.split(" ").join("|") + "( |$)", "gi")), (e = c(t).replace(e, " ")), g(t, e));
        }
        function p(t, e) {
            void 0 !== t.classList
                ? e.split(" ").forEach(function (e) {
                      e.trim() && t.classList.add(e);
                  })
                : (d(t, e), (e = c(t) + " " + e), g(t, e));
        }
        function u(t, e) {
            return void 0 !== t.classList ? t.classList.contains(e) : ((t = c(t)), new RegExp("(^| )" + e + "( |$)", "gi").test(t));
        }
        function c(t) {
            return t.className instanceof t.ownerDocument.defaultView.SVGAnimatedString ? t.className.baseVal : t.className;
        }
        function g(t, e) {
            t.setAttribute("class", e);
        }
        function m(t, e, o) {
            o.forEach(function (o) {
                -1 === e.indexOf(o) && u(t, o) && d(t, o);
            }),
                e.forEach(function (e) {
                    u(t, e) || p(t, e);
                });
        }
        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function b() {
            return performance && performance.now ? performance.now() : +new Date();
        }
        function w() {
            for (var t = { top: 0, left: 0 }, e = arguments.length, o = Array(e), i = 0; i < e; i++) o[i] = arguments[i];
            return (
                o.forEach(function (e) {
                    var o = e.top,
                        e = e.left;
                    "string" == typeof o && (o = parseFloat(o, 10)), "string" == typeof e && (e = parseFloat(e, 10)), (t.top += o), (t.left += e);
                }),
                t
            );
        }
        function C(t, e) {
            return (
                "string" == typeof t.left && -1 !== t.left.indexOf("%") && (t.left = (parseFloat(t.left, 10) / 100) * e.width), "string" == typeof t.top && -1 !== t.top.indexOf("%") && (t.top = (parseFloat(t.top, 10) / 100) * e.height), t
            );
        }
        function O(t, e) {
            return (
                "scrollParent" === e ? (e = t.scrollParents[0]) : "window" === e && (e = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset]),
                void 0 !== (e = e === document ? e.documentElement : e).nodeType &&
                    (function () {
                        var t = e,
                            o = a(e),
                            i = o,
                            n = getComputedStyle(e);
                        (e = [i.left, i.top, o.width + i.left, o.height + i.top]),
                            t.ownerDocument !== document && ((o = t.ownerDocument.defaultView), (e[0] += o.pageXOffset), (e[1] += o.pageYOffset), (e[2] += o.pageXOffset), (e[3] += o.pageYOffset)),
                            G.forEach(function (t, o) {
                                "Top" === (t = t[0].toUpperCase() + t.substr(1)) || "Left" === t ? (e[o] += parseFloat(n["border" + t + "Width"])) : (e[o] -= parseFloat(n["border" + t + "Width"]));
                            });
                    })(),
                e
            );
        }
        var E = (function () {
                function t(t, e) {
                    for (var o = 0; o < e.length; o++) {
                        var i = e[o];
                        (i.enumerable = i.enumerable || !1), (i.configurable = !0), "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
                    }
                }
                return function (e, o, i) {
                    return o && t(e.prototype, o), i && t(e, i), e;
                };
            })(),
            x = void 0,
            A = (void 0 === x && (x = { modules: [] }), null),
            T = (function () {
                var t = 0;
                return function () {
                    return ++t;
                };
            })(),
            S = {},
            M = null,
            W = [],
            k = function (t) {
                W.push(t);
            },
            _ = function () {
                for (var t = void 0; (t = W.pop()); ) t();
            },
            B = (function () {
                function t() {
                    i(this, t);
                }
                return (
                    E(t, [
                        {
                            key: "on",
                            value: function (t, e, o) {
                                var i = !(arguments.length <= 3 || void 0 === arguments[3]) && arguments[3];
                                void 0 === this.bindings && (this.bindings = {}), void 0 === this.bindings[t] && (this.bindings[t] = []), this.bindings[t].push({ handler: e, ctx: o, once: i });
                            },
                        },
                        {
                            key: "once",
                            value: function (t, e, o) {
                                this.on(t, e, o, !0);
                            },
                        },
                        {
                            key: "off",
                            value: function (t, e) {
                                if (void 0 !== this.bindings && void 0 !== this.bindings[t])
                                    if (void 0 === e) delete this.bindings[t];
                                    else for (var o = 0; o < this.bindings[t].length; ) this.bindings[t][o].handler === e ? this.bindings[t].splice(o, 1) : ++o;
                            },
                        },
                        {
                            key: "trigger",
                            value: function (t) {
                                if (void 0 !== this.bindings && this.bindings[t]) {
                                    for (var e = 0, o = arguments.length, i = Array(1 < o ? o - 1 : 0), n = 1; n < o; n++) i[n - 1] = arguments[n];
                                    for (; e < this.bindings[t].length; ) {
                                        var r = this.bindings[t][e],
                                            s = r.handler,
                                            a = r.ctx,
                                            r = r.once,
                                            a = void 0 === a ? this : a;
                                        s.apply(a, i), r ? this.bindings[t].splice(e, 1) : ++e;
                                    }
                                }
                            },
                        },
                    ]),
                    t
                );
            })(),
            z =
                ((x.Utils = {
                    getActualBoundingClientRect: n,
                    getScrollParents: r,
                    getBounds: a,
                    getOffsetParent: f,
                    extend: h,
                    addClass: p,
                    removeClass: d,
                    hasClass: u,
                    updateClasses: m,
                    defer: k,
                    flush: _,
                    uniqueId: T,
                    Evented: B,
                    getScrollBarSize: l,
                    removeUtilElements: s,
                }),
                function (e, o) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e))
                        return (function (t, e) {
                            var o = [],
                                i = !0,
                                n = !1,
                                r = void 0;
                            try {
                                for (var s, a = t[Symbol.iterator](); !(i = (s = a.next()).done) && (o.push(s.value), !e || o.length !== e); i = !0);
                            } catch (f) {
                                (n = !0), (r = f);
                            } finally {
                                try {
                                    !i && a.return && a.return();
                                } finally {
                                    if (n) throw r;
                                }
                            }
                            return o;
                        })(e, o);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                }),
            E = (function () {
                function t(t, e) {
                    for (var o = 0; o < e.length; o++) {
                        var i = e[o];
                        (i.enumerable = i.enumerable || !1), (i.configurable = !0), "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
                    }
                }
                return function (e, o, i) {
                    return o && t(e.prototype, o), i && t(e, i), e;
                };
            })();
        if (void 0 === x) throw new Error("You must include the utils.js file before tether.js");
        function X() {
            D.forEach(function (t) {
                t.position(!1);
            }),
                _();
        }
        function V(t) {
            var e = t.left,
                o = t.top;
            return { left: (e = void 0 !== N[t.left] ? N[t.left] : e), top: (o = void 0 !== N[t.top] ? N[t.top] : o) };
        }
        function R(t) {
            return (t = t.split(" ")), { top: (t = z(t, 2))[0], left: t[1] };
        }
        var Y = x.Utils,
            r = Y.getScrollParents,
            a = Y.getBounds,
            f = Y.getOffsetParent,
            h = Y.extend,
            p = Y.addClass,
            d = Y.removeClass,
            m = Y.updateClasses,
            k = Y.defer,
            _ = Y.flush,
            l = Y.getScrollBarSize,
            s = Y.removeUtilElements,
            L = (function () {
                if ("undefined" == typeof document) return "";
                for (var t = document.createElement("div"), e = ["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"], o = 0; o < e.length; ++o) {
                    var i = e[o];
                    if (void 0 !== t.style[i]) return i;
                }
            })(),
            D = [],
            F =
                (!(function () {
                    function i() {
                        return void 0 !== e && 16 < e ? ((e = Math.min(e - 16, 250)), void (o = setTimeout(i, 250))) : void ((void 0 !== t && b() - t < 10) || (null != o && (clearTimeout(o), (o = null)), (t = b()), X(), (e = b() - t)));
                    }
                    var t = null,
                        e = null,
                        o = null;
                    "undefined" != typeof window &&
                        void 0 !== window.addEventListener &&
                        ["resize", "scroll", "touchmove"].forEach(function (t) {
                            window.addEventListener(t, i);
                        });
                })(),
                { center: "center", left: "right", right: "left" }),
            H = { middle: "middle", top: "bottom", bottom: "top" },
            N = { top: 0, left: 0, middle: "50%", center: "50%", bottom: "100%", right: "100%" },
            q = R,
            I = (function () {
                function e(t) {
                    var o = this;
                    i(this, e),
                        (function (t, e, o) {
                            for (var i = !0; i; ) {
                                var n = t,
                                    r = e,
                                    s = o,
                                    i = !1,
                                    a = (null === n && (n = Function.prototype), Object.getOwnPropertyDescriptor(n, r));
                                if (void 0 !== a) return "value" in a ? a.value : void 0 === (a = a.get) ? void 0 : a.call(s);
                                a = Object.getPrototypeOf(n);
                                if (null === a) return;
                                (t = a), (e = r), (o = s), (i = !0);
                            }
                        })(Object.getPrototypeOf(e.prototype), "constructor", this).call(this),
                        (this.position = this.position.bind(this)),
                        D.push(this),
                        (this.history = []),
                        this.setOptions(t, !1),
                        x.modules.forEach(function (t) {
                            void 0 !== t.initialize && t.initialize.call(o);
                        }),
                        this.position();
                }
                return (
                    (function (t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                        (t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } })), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e));
                    })(e, B),
                    E(e, [
                        {
                            key: "getClass",
                            value: function () {
                                var t = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0],
                                    e = this.options.classes;
                                return void 0 !== e && e[t] ? this.options.classes[t] : this.options.classPrefix ? this.options.classPrefix + "-" + t : t;
                            },
                        },
                        {
                            key: "setOptions",
                            value: function (t) {
                                var e = this,
                                    o = arguments.length <= 1 || void 0 === arguments[1] || arguments[1],
                                    t = ((this.options = h({ offset: "0 0", targetOffset: "0 0", targetAttachment: "auto auto", classPrefix: "tether" }, t)), this.options),
                                    s = t.element,
                                    a = t.target,
                                    t = t.targetModifier;
                                if (
                                    ((this.element = s),
                                    (this.target = a),
                                    (this.targetModifier = t),
                                    "viewport" === this.target
                                        ? ((this.target = document.body), (this.targetModifier = "visible"))
                                        : "scroll-handle" === this.target && ((this.target = document.body), (this.targetModifier = "scroll-handle")),
                                    ["element", "target"].forEach(function (t) {
                                        if (void 0 === e[t]) throw new Error("Tether Error: Both element and target must be defined");
                                        void 0 !== e[t].jquery ? (e[t] = e[t][0]) : "string" == typeof e[t] && (e[t] = document.querySelector(e[t]));
                                    }),
                                    p(this.element, this.getClass("element")),
                                    !1 !== this.options.addTargetClasses && p(this.target, this.getClass("target")),
                                    !this.options.attachment)
                                )
                                    throw new Error("Tether Error: You must provide an attachment");
                                (this.targetAttachment = q(this.options.targetAttachment)),
                                    (this.attachment = q(this.options.attachment)),
                                    (this.offset = R(this.options.offset)),
                                    (this.targetOffset = R(this.options.targetOffset)),
                                    void 0 !== this.scrollParents && this.disable(),
                                    "scroll-handle" === this.targetModifier ? (this.scrollParents = [this.target]) : (this.scrollParents = r(this.target)),
                                    !1 !== this.options.enabled && this.enable(o);
                            },
                        },
                        {
                            key: "getTargetBounds",
                            value: function () {
                                var t, i, r, e, f, o;
                                return void 0 === this.targetModifier
                                    ? a(this.target)
                                    : "visible" === this.targetModifier
                                    ? this.target === document.body
                                        ? { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth }
                                        : (((e = { height: (t = a(this.target)).height, width: t.width, top: t.top, left: t.left }).height = Math.min(e.height, t.height - (pageYOffset - t.top))),
                                          (e.height = Math.min(e.height, t.height - (t.top + t.height - (pageYOffset + innerHeight)))),
                                          (e.height = Math.min(innerHeight, e.height)),
                                          (e.height -= 2),
                                          (e.width = Math.min(e.width, t.width - (pageXOffset - t.left))),
                                          (e.width = Math.min(e.width, t.width - (t.left + t.width - (pageXOffset + innerWidth)))),
                                          (e.width = Math.min(innerWidth, e.width)),
                                          (e.width -= 2),
                                          e.top < pageYOffset && (e.top = pageYOffset),
                                          e.left < pageXOffset && (e.left = pageXOffset),
                                          e)
                                    : "scroll-handle" === this.targetModifier
                                    ? ((t = void 0),
                                      (t = (o = this.target) === document.body ? ((o = document.documentElement), { left: pageXOffset, top: pageYOffset, height: innerHeight, width: innerWidth }) : a(o)),
                                      (i = getComputedStyle(o)),
                                      (r = 0),
                                      (o.scrollWidth > o.clientWidth || 0 <= [i.overflow, i.overflowX].indexOf("scroll") || this.target !== document.body) && (r = 15),
                                      (e = {
                                          width: 15,
                                          height: 0.975 * (r = t.height - parseFloat(i.borderTopWidth) - parseFloat(i.borderBottomWidth) - r) * (r / o.scrollHeight),
                                          left: t.left + t.width - parseFloat(i.borderLeftWidth) - 15,
                                      }),
                                      (f = 0),
                                      r < 408 && this.target === document.body && (f = -11e-5 * Math.pow(r, 2) - 0.00727 * r + 22.58),
                                      this.target !== document.body && (e.height = Math.max(e.height, 24)),
                                      (o = this.target.scrollTop / (o.scrollHeight - r)),
                                      (e.top = o * (r - e.height - f) + t.top + parseFloat(i.borderTopWidth)),
                                      this.target === document.body && (e.height = Math.max(e.height, 24)),
                                      e)
                                    : void 0;
                            },
                        },
                        {
                            key: "clearCache",
                            value: function () {
                                this._cache = {};
                            },
                        },
                        {
                            key: "cache",
                            value: function (t, e) {
                                return void 0 === this._cache && (this._cache = {}), void 0 === this._cache[t] && (this._cache[t] = e.call(this)), this._cache[t];
                            },
                        },
                        {
                            key: "enable",
                            value: function () {
                                var t = this,
                                    e = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                                !1 !== this.options.addTargetClasses && p(this.target, this.getClass("enabled")),
                                    p(this.element, this.getClass("enabled")),
                                    (this.enabled = !0),
                                    this.scrollParents.forEach(function (e) {
                                        e !== t.target.ownerDocument && e.addEventListener("scroll", t.position);
                                    }),
                                    e && this.position();
                            },
                        },
                        {
                            key: "disable",
                            value: function () {
                                var t = this;
                                d(this.target, this.getClass("enabled")),
                                    d(this.element, this.getClass("enabled")),
                                    (this.enabled = !1),
                                    void 0 !== this.scrollParents &&
                                        this.scrollParents.forEach(function (e) {
                                            e.removeEventListener("scroll", t.position);
                                        });
                            },
                        },
                        {
                            key: "destroy",
                            value: function () {
                                var t = this;
                                this.disable(),
                                    D.forEach(function (e, o) {
                                        e === t && D.splice(o, 1);
                                    }),
                                    0 === D.length && s();
                            },
                        },
                        {
                            key: "updateAttachClasses",
                            value: function (t, e) {
                                var o = this,
                                    n =
                                        ((t = t || this.attachment),
                                        (e = e || this.targetAttachment),
                                        void 0 !== this._addAttachClasses && this._addAttachClasses.length && this._addAttachClasses.splice(0, this._addAttachClasses.length),
                                        void 0 === this._addAttachClasses && (this._addAttachClasses = []),
                                        this._addAttachClasses),
                                    r =
                                        (t.top && n.push(this.getClass("element-attached") + "-" + t.top),
                                        t.left && n.push(this.getClass("element-attached") + "-" + t.left),
                                        e.top && n.push(this.getClass("target-attached") + "-" + e.top),
                                        e.left && n.push(this.getClass("target-attached") + "-" + e.left),
                                        []);
                                ["left", "top", "bottom", "right", "middle", "center"].forEach(function (t) {
                                    r.push(o.getClass("element-attached") + "-" + t), r.push(o.getClass("target-attached") + "-" + t);
                                }),
                                    k(function () {
                                        void 0 !== o._addAttachClasses && (m(o.element, o._addAttachClasses, r), !1 !== o.options.addTargetClasses && m(o.target, o._addAttachClasses, r), delete o._addAttachClasses);
                                    });
                            },
                        },
                        {
                            key: "position",
                            value: function () {
                                var t = this,
                                    e = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                                if (this.enabled) {
                                    this.clearCache();
                                    for (
                                        var o = (function (t, e) {
                                                var o = t.left,
                                                    t = t.top;
                                                return { left: (o = "auto" === o ? F[e.left] : o), top: (t = "auto" === t ? H[e.top] : t) };
                                            })(this.targetAttachment, this.attachment),
                                            i =
                                                (this.updateAttachClasses(this.attachment, o),
                                                this.cache("element-bounds", function () {
                                                    return a(t.element);
                                                })),
                                            n = i.width,
                                            r = i.height,
                                            h =
                                                (0 === n && 0 === r && void 0 !== this.lastSize ? ((n = (s = this.lastSize).width), (r = s.height)) : (this.lastSize = { width: n, height: r }),
                                                this.cache("target-bounds", function () {
                                                    return t.getTargetBounds();
                                                })),
                                            s = h,
                                            p = C(V(this.attachment), { width: n, height: r }),
                                            u = C(V(o), s),
                                            c = C(this.offset, { width: n, height: r }),
                                            g = C(this.targetOffset, s),
                                            p = w(p, c),
                                            u = w(u, g),
                                            m = h.left + u.left - p.left,
                                            v = h.top + u.top - p.top,
                                            y = 0;
                                        y < x.modules.length;
                                        ++y
                                    ) {
                                        var O = x.modules[y].position.call(this, {
                                            left: m,
                                            top: v,
                                            targetAttachment: o,
                                            targetPos: h,
                                            elementPos: i,
                                            offset: p,
                                            targetOffset: u,
                                            manualOffset: c,
                                            manualTargetOffset: g,
                                            scrollbarSize: S,
                                            attachment: this.attachment,
                                        });
                                        if (!1 === O) return !1;
                                        void 0 !== O && "object" == typeof O && ((v = O.top), (m = O.left));
                                    }
                                    var E = { page: { top: v, left: m }, viewport: { top: v - pageYOffset, bottom: pageYOffset - v - r + innerHeight, left: m - pageXOffset, right: pageXOffset - m - n + innerWidth } },
                                        A = this.target.ownerDocument,
                                        s = A.defaultView,
                                        S = void 0;
                                    return (
                                        s.innerHeight > A.documentElement.clientHeight && ((S = this.cache("scrollbar-size", l)), (E.viewport.bottom -= S.height)),
                                        s.innerWidth > A.documentElement.clientWidth && ((S = this.cache("scrollbar-size", l)), (E.viewport.right -= S.width)),
                                        (-1 !== ["", "static"].indexOf(A.body.style.position) && -1 !== ["", "static"].indexOf(A.body.parentElement.style.position)) ||
                                            ((E.page.bottom = A.body.scrollHeight - v - r), (E.page.right = A.body.scrollWidth - m - n)),
                                        void 0 !== this.options.optimizations &&
                                            !1 !== this.options.optimizations.moveElement &&
                                            void 0 === this.targetModifier &&
                                            (function () {
                                                var l,
                                                    e = t.cache("target-offsetparent", function () {
                                                        return f(t.target);
                                                    }),
                                                    o = t.cache("target-offsetparent-bounds", function () {
                                                        return a(e);
                                                    }),
                                                    i = getComputedStyle(e),
                                                    n = o,
                                                    r = {};
                                                ["Top", "Left", "Bottom", "Right"].forEach(function (t) {
                                                    r[t.toLowerCase()] = parseFloat(i["border" + t + "Width"]);
                                                }),
                                                    (o.right = A.body.scrollWidth - o.left - n.width + r.right),
                                                    (o.bottom = A.body.scrollHeight - o.top - n.height + r.bottom),
                                                    E.page.top >= o.top + r.top &&
                                                        E.page.bottom >= o.bottom &&
                                                        E.page.left >= o.left + r.left &&
                                                        E.page.right >= o.right &&
                                                        ((n = e.scrollTop), (l = e.scrollLeft), (E.offset = { top: E.page.top - o.top + n - r.top, left: E.page.left - o.left + l - r.left }));
                                            })(),
                                        this.move(E),
                                        this.history.unshift(E),
                                        3 < this.history.length && this.history.pop(),
                                        e && _(),
                                        !0
                                    );
                                }
                            },
                        },
                        {
                            key: "move",
                            value: function (t) {
                                var e = this;
                                if (void 0 !== this.element.parentNode) {
                                    var i,
                                        o = {};
                                    for (i in t)
                                        for (var n in ((o[i] = {}), t[i])) {
                                            for (var r = !1, s = 0; s < this.history.length; ++s) {
                                                var a = this.history[s];
                                                if (
                                                    void 0 !== a[i] &&
                                                    !(function (t, e, argument_2) {
                                                        return e <= t + (argument_2 = arguments.length <= 2 || void 0 === argument_2 ? 1 : argument_2) && t - argument_2 <= e;
                                                    })(a[i][n], t[i][n])
                                                ) {
                                                    r = !0;
                                                    break;
                                                }
                                            }
                                            r || (o[i][n] = !0);
                                        }
                                    var l = { top: "", left: "", right: "", bottom: "" },
                                        d = function (t, o) {
                                            var r, s;
                                            !1 !== (void 0 !== e.options.optimizations ? e.options.optimizations.gpu : null)
                                                ? ((s = r = void 0),
                                                  (r = t.top ? ((l.top = 0), o.top) : ((l.bottom = 0), -o.bottom)),
                                                  (s = t.left ? ((l.left = 0), o.left) : ((l.right = 0), -o.right)),
                                                  !window.matchMedia ||
                                                      window.matchMedia("only screen and (min-resolution: 1.3dppx)").matches ||
                                                      window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.3)").matches ||
                                                      ((s = Math.round(s)), (r = Math.round(r))),
                                                  (l[L] = "translateX(" + s + "px) translateY(" + r + "px)"),
                                                  "msTransform" !== L && (l[L] += " translateZ(0)"))
                                                : (t.top ? (l.top = o.top + "px") : (l.bottom = o.bottom + "px"), t.left ? (l.left = o.left + "px") : (l.right = o.right + "px"));
                                        },
                                        p = !1;
                                    if (
                                        ((o.page.top || o.page.bottom) && (o.page.left || o.page.right)
                                            ? ((l.position = "absolute"), d(o.page, t.page))
                                            : (o.viewport.top || o.viewport.bottom) && (o.viewport.left || o.viewport.right)
                                            ? ((l.position = "fixed"), d(o.viewport, t.viewport))
                                            : void 0 !== o.offset && o.offset.top && o.offset.left
                                            ? (function () {
                                                  l.position = "absolute";
                                                  var i = e.cache("target-offsetparent", function () {
                                                      return f(e.target);
                                                  });
                                                  f(e.element) !== i &&
                                                      k(function () {
                                                          e.element.parentNode.removeChild(e.element), i.appendChild(e.element);
                                                      }),
                                                      d(o.offset, t.offset),
                                                      (p = !0);
                                              })()
                                            : ((l.position = "absolute"), d({ top: !0, left: !0 }, t.page)),
                                        !p)
                                    )
                                        if (this.options.bodyElement) this.element.parentNode !== this.options.bodyElement && this.options.bodyElement.appendChild(this.element);
                                        else {
                                            for (var u = !0, c = this.element.parentNode; c && 1 === c.nodeType && "BODY" !== c.tagName; ) {
                                                if ("static" !== getComputedStyle(c).position) {
                                                    u = !1;
                                                    break;
                                                }
                                                c = c.parentNode;
                                            }
                                            u || (this.element.parentNode.removeChild(this.element), this.element.ownerDocument.body.appendChild(this.element));
                                        }
                                    var g = {},
                                        m = !1;
                                    for (n in l) {
                                        var v = l[n];
                                        this.element.style[n] !== v && ((m = !0), (g[n] = v));
                                    }
                                    m &&
                                        k(function () {
                                            h(e.element.style, g), e.trigger("repositioned");
                                        });
                                }
                            },
                        },
                    ]),
                    e
                );
            })(),
            I = ((I.modules = []), (x.position = X), h(I, x)),
            z = function (e, o) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e))
                    return (function (t, e) {
                        var o = [],
                            i = !0,
                            n = !1,
                            r = void 0;
                        try {
                            for (var s, a = t[Symbol.iterator](); !(i = (s = a.next()).done) && (o.push(s.value), !e || o.length !== e); i = !0);
                        } catch (f) {
                            (n = !0), (r = f);
                        } finally {
                            try {
                                !i && a.return && a.return();
                            } finally {
                                if (n) throw r;
                            }
                        }
                        return o;
                    })(e, o);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            },
            a = (Y = x.Utils).getBounds,
            h = Y.extend,
            m = Y.updateClasses,
            k = Y.defer,
            G = ["left", "top", "right", "bottom"];
        x.modules.push({
            position: function (t) {
                var f,
                    s,
                    p,
                    u,
                    c,
                    g,
                    v,
                    y,
                    e = this,
                    o = t.top,
                    i = t.left,
                    n = t.targetAttachment;
                return (
                    !this.options.constraints ||
                    ((t = this.cache("element-bounds", function () {
                        return a(e.element);
                    })),
                    (s = t.height),
                    0 === (f = t.width) && 0 === s && void 0 !== this.lastSize && ((t = this.lastSize), (f = t.width), (s = t.height)),
                    (t = this.cache("target-bounds", function () {
                        return e.getTargetBounds();
                    })),
                    (p = t.height),
                    (u = t.width),
                    (c = [this.getClass("pinned"), this.getClass("out-of-bounds")]),
                    this.options.constraints.forEach(function (t) {
                        var e = t.outOfBoundsClass,
                            t = t.pinnedClass;
                        e && c.push(e), t && c.push(t);
                    }),
                    c.forEach(function (t) {
                        ["left", "top", "right", "bottom"].forEach(function (e) {
                            c.push(t + "-" + e);
                        });
                    }),
                    (g = []),
                    (v = h({}, n)),
                    (y = h({}, this.attachment)),
                    this.options.constraints.forEach(function (t) {
                        var r = t.to,
                            a = t.attachment,
                            t = t.pin,
                            h = void 0,
                            d = void 0,
                            c = ((h = 0 <= (a = void 0 === a ? "" : a).indexOf(" ") ? ((c = a.split(" ")), (d = (c = z(c, 2))[0]), c[1]) : (d = a)), O(e, r)),
                            w =
                                (("target" !== d && "both" !== d) || (o < c[1] && "top" === v.top && ((o += p), (v.top = "bottom")), o + s > c[3] && "bottom" === v.top && ((o -= p), (v.top = "top"))),
                                "together" === d &&
                                    ("top" === v.top &&
                                        ("bottom" === y.top && o < c[1]
                                            ? ((o += p), (v.top = "bottom"), (o += s), (y.top = "top"))
                                            : "top" === y.top && o + s > c[3] && o - (s - p) >= c[1] && ((o -= s - p), (v.top = "bottom"), (y.top = "bottom"))),
                                    "bottom" === v.top &&
                                        ("top" === y.top && o + s > c[3]
                                            ? ((o -= p), (v.top = "top"), (o -= s), (y.top = "bottom"))
                                            : "bottom" === y.top && o < c[1] && o + (2 * s - p) <= c[3] && ((o += s - p), (v.top = "top"), (y.top = "top"))),
                                    "middle" === v.top) &&
                                    (o + s > c[3] && "top" === y.top ? ((o -= s), (y.top = "bottom")) : o < c[1] && "bottom" === y.top && ((o += s), (y.top = "top"))),
                                ("target" !== h && "both" !== h) || (i < c[0] && "left" === v.left && ((i += u), (v.left = "right")), i + f > c[2] && "right" === v.left && ((i -= u), (v.left = "left"))),
                                "together" === h &&
                                    (i < c[0] && "left" === v.left
                                        ? "right" === y.left
                                            ? ((i += u), (v.left = "right"), (i += f), (y.left = "left"))
                                            : "left" === y.left && ((i += u), (v.left = "right"), (i -= f), (y.left = "right"))
                                        : i + f > c[2] && "right" === v.left
                                        ? "left" === y.left
                                            ? ((i -= u), (v.left = "left"), (i -= f), (y.left = "right"))
                                            : "right" === y.left && ((i -= u), (v.left = "left"), (i += f), (y.left = "left"))
                                        : "center" === v.left && (i + f > c[2] && "left" === y.left ? ((i -= f), (y.left = "right")) : i < c[0] && "right" === y.left && ((i += f), (y.left = "left")))),
                                ("element" !== d && "both" !== d) || (o < c[1] && "bottom" === y.top && ((o += s), (y.top = "top")), o + s > c[3] && "top" === y.top && ((o -= s), (y.top = "bottom"))),
                                ("element" !== h && "both" !== h) ||
                                    (i < c[0] && ("right" === y.left ? ((i += f), (y.left = "left")) : "center" === y.left && ((i += f / 2), (y.left = "left"))),
                                    i + f > c[2] && ("left" === y.left ? ((i -= f), (y.left = "right")) : "center" === y.left && ((i -= f / 2), (y.left = "right")))),
                                "string" == typeof t
                                    ? (t = t.split(",").map(function (t) {
                                          return t.trim();
                                      }))
                                    : !0 === t && (t = ["top", "left", "right", "bottom"]),
                                (t = t || []),
                                []),
                            C = [];
                        o < c[1] && (0 <= t.indexOf("top") ? ((o = c[1]), w) : C).push("top"),
                            o + s > c[3] && (0 <= t.indexOf("bottom") ? ((o = c[3] - s), w) : C).push("bottom"),
                            i < c[0] && (0 <= t.indexOf("left") ? ((i = c[0]), w) : C).push("left"),
                            i + f > c[2] && (0 <= t.indexOf("right") ? ((i = c[2] - f), w) : C).push("right"),
                            w.length &&
                                (function () {
                                    var t = void 0 !== e.options.pinnedClass ? e.options.pinnedClass : e.getClass("pinned");
                                    g.push(t),
                                        w.forEach(function (e) {
                                            g.push(t + "-" + e);
                                        });
                                })(),
                            C.length &&
                                (function () {
                                    var t = void 0 !== e.options.outOfBoundsClass ? e.options.outOfBoundsClass : e.getClass("out-of-bounds");
                                    g.push(t),
                                        C.forEach(function (e) {
                                            g.push(t + "-" + e);
                                        });
                                })(),
                            (0 <= w.indexOf("left") || 0 <= w.indexOf("right")) && (y.left = v.left = !1),
                            (0 <= w.indexOf("top") || 0 <= w.indexOf("bottom")) && (y.top = v.top = !1),
                            (v.top === n.top && v.left === n.left && y.top === e.attachment.top && y.left === e.attachment.left) || (e.updateAttachClasses(y, v), e.trigger("update", { attachment: y, targetAttachment: v }));
                    }),
                    k(function () {
                        !1 !== e.options.addTargetClasses && m(e.target, g, c), m(e.element, g, c);
                    }),
                    { top: o, left: i })
                );
            },
        });
        var a = (Y = x.Utils).getBounds,
            m = Y.updateClasses,
            k = Y.defer,
            z =
                (x.modules.push({
                    position: function (t) {
                        var e = this,
                            o = t.top,
                            i = t.left,
                            t = this.cache("element-bounds", function () {
                                return a(e.element);
                            }),
                            r = t.height,
                            t = t.width,
                            f = this.getTargetBounds(),
                            l = o + r,
                            h = i + t,
                            d = [],
                            p =
                                (o <= f.bottom &&
                                    l >= f.top &&
                                    ["left", "right"].forEach(function (t) {
                                        var e = f[t];
                                        (e !== i && e !== h) || d.push(t);
                                    }),
                                i <= f.right &&
                                    h >= f.left &&
                                    ["top", "bottom"].forEach(function (t) {
                                        var e = f[t];
                                        (e !== o && e !== l) || d.push(t);
                                    }),
                                []),
                            u = [];
                        return (
                            p.push(this.getClass("abutted")),
                            ["left", "top", "right", "bottom"].forEach(function (t) {
                                p.push(e.getClass("abutted") + "-" + t);
                            }),
                            d.length && u.push(this.getClass("abutted")),
                            d.forEach(function (t) {
                                u.push(e.getClass("abutted") + "-" + t);
                            }),
                            k(function () {
                                !1 !== e.options.addTargetClasses && m(e.target, u, p), m(e.element, u, p);
                            }),
                            !0
                        );
                    },
                }),
                function (e, o) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e))
                        return (function (t, e) {
                            var o = [],
                                i = !0,
                                n = !1,
                                r = void 0;
                            try {
                                for (var s, a = t[Symbol.iterator](); !(i = (s = a.next()).done) && (o.push(s.value), !e || o.length !== e); i = !0);
                            } catch (f) {
                                (n = !0), (r = f);
                            } finally {
                                try {
                                    !i && a.return && a.return();
                                } finally {
                                    if (n) throw r;
                                }
                            }
                            return o;
                        })(e, o);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                });
        return (
            x.modules.push({
                position: function (t) {
                    var i,
                        a,
                        n,
                        r,
                        e = t.top,
                        t = t.left;
                    if (this.options.shift)
                        return (
                            (i = this.options.shift),
                            (r = n = void 0),
                            (r =
                                "string" == typeof (i = "function" == typeof this.options.shift ? this.options.shift.call(this, { top: e, left: t }) : i)
                                    ? (((i = i.split(" "))[1] = i[1] || i[0]), (n = (a = z(i, 2))[0]), (r = a[1]), (n = parseFloat(n, 10)), parseFloat(r, 10))
                                    : ((n = i.top), i.left)),
                            { top: (e += n), left: (t += r) }
                        );
                },
            }),
            I
        );
    }),
    !(function ($) {
        "use strict";
        $.fn.counterUp = function (options) {
            var s,
                settings = $.extend({ time: 400, delay: 10, offset: 100, beginAt: 0, formatter: !1, context: "window", callback: function () {} }, options);
            return this.each(function () {
                var $this = $(this),
                    counter = {
                        time: $(this).data("counterup-time") || settings.time,
                        delay: $(this).data("counterup-delay") || settings.delay,
                        offset: $(this).data("counterup-offset") || settings.offset,
                        beginAt: $(this).data("counterup-beginat") || settings.beginAt,
                        context: $(this).data("counterup-context") || settings.context,
                    };
                $this.waypoint(
                    function (direction) {
                        !(function () {
                            var nums = [],
                                divisions = counter.time / counter.delay,
                                num = $this.attr("data-num") ? $this.attr("data-num") : $this.text(),
                                isComma = /[0-9]+,[0-9]+/.test(num),
                                decimalPlaces = ((num = num.replace(/,/g, "")).split(".")[1] || []).length,
                                isTime = (counter.beginAt > num && (counter.beginAt = num), /[0-9]+:[0-9]+:[0-9]+/.test(num));
                            if (isTime) {
                                var times = num.split(":"),
                                    m = 1;
                                for (s = 0; 0 < times.length; ) (s += m * parseInt(times.pop(), 10)), (m *= 60);
                            }
                            for (var i = divisions; i >= (counter.beginAt / num) * divisions; i--) {
                                var hours,
                                    newNum = parseFloat((num / divisions) * i).toFixed(decimalPlaces);
                                if (
                                    (isTime &&
                                        ((newNum = parseInt((s / divisions) * i)),
                                        (newNum =
                                            ((hours = parseInt(newNum / 3600) % 24) < 10 ? "0" + hours : hours) +
                                            ":" +
                                            ((hours = parseInt(newNum / 60) % 60) < 10 ? "0" + hours : hours) +
                                            ":" +
                                            ((hours = parseInt(newNum % 60, 10)) < 10 ? "0" + hours : hours))),
                                    isComma)
                                )
                                    for (; /(\d+)(\d{3})/.test(newNum.toString()); ) newNum = newNum.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                                settings.formatter && (newNum = settings.formatter.call(this, newNum)), nums.unshift(newNum);
                            }
                            $this.data("counterup-nums", nums), $this.text(counter.beginAt);
                            $this.data("counterup-func", function () {
                                $this.data("counterup-nums")
                                    ? ($this.html($this.data("counterup-nums").shift()),
                                      $this.data("counterup-nums").length ? setTimeout($this.data("counterup-func"), counter.delay) : ($this.data("counterup-nums", null), $this.data("counterup-func", null), settings.callback.call(this)))
                                    : settings.callback.call(this);
                            }),
                                setTimeout($this.data("counterup-func"), counter.delay);
                        })(),
                            this.destroy();
                    },
                    { offset: counter.offset + "%", context: counter.context }
                );
            });
        };
    })(jQuery),
    !(function (t, e) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? (module.exports = e()) : (t.EvEmitter = e());
    })("undefined" != typeof window ? window : this, function () {
        function t() {}
        var e = t.prototype;
        return (
            (e.on = function (t, e) {
                var i;
                if (t && e) return -1 == (i = (i = this._events = this._events || {})[t] = i[t] || []).indexOf(e) && i.push(e), this;
            }),
            (e.once = function (t, e) {
                var i;
                if (t && e) return this.on(t, e), (((i = this._onceEvents = this._onceEvents || {})[t] = i[t] || {})[e] = !0), this;
            }),
            (e.off = function (t, e) {
                t = this._events && this._events[t];
                if (t && t.length) return -1 != (e = t.indexOf(e)) && t.splice(e, 1), this;
            }),
            (e.emitEvent = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = 0,
                        o = i[n];
                    e = e || [];
                    for (var r = this._onceEvents && this._onceEvents[t]; o; ) {
                        var s = r && r[o];
                        s && (this.off(t, o), delete r[o]), o.apply(this, e), (o = i[(n += s ? 0 : 1)]);
                    }
                    return this;
                }
            }),
            t
        );
    }),
    (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd
            ? define(["ev-emitter/ev-emitter"], function (i) {
                  return e(t, i);
              })
            : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("ev-emitter")))
            : (t.imagesLoaded = e(t, t.EvEmitter));
    })(window, function (t, e) {
        function i(t, e) {
            for (var i in e) t[i] = e[i];
            return t;
        }
        function o(t, e, r) {
            return this instanceof o
                ? ("string" == typeof t && (t = document.querySelectorAll(t)),
                  (this.elements = (function (t) {
                      var e = [];
                      if (Array.isArray(t)) e = t;
                      else if ("number" == typeof t.length) for (var i = 0; i < t.length; i++) e.push(t[i]);
                      else e.push(t);
                      return e;
                  })(t)),
                  (this.options = i({}, this.options)),
                  "function" == typeof e ? (r = e) : i(this.options, e),
                  r && this.on("always", r),
                  this.getImages(),
                  h && (this.jqDeferred = new h.Deferred()),
                  void setTimeout(
                      function () {
                          this.check();
                      }.bind(this)
                  ))
                : new o(t, e, r);
        }
        function r(t) {
            this.img = t;
        }
        function s(t, e) {
            (this.url = t), (this.element = e), (this.img = new Image());
        }
        var h = t.jQuery,
            a = t.console,
            d =
                (((o.prototype = Object.create(e.prototype)).options = {}),
                (o.prototype.getImages = function () {
                    (this.images = []), this.elements.forEach(this.addElementImages, this);
                }),
                (o.prototype.addElementImages = function (t) {
                    "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
                    var e = t.nodeType;
                    if (e && d[e]) {
                        for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                            var o = i[n];
                            this.addImage(o);
                        }
                        if ("string" == typeof this.options.background)
                            for (var r = t.querySelectorAll(this.options.background), n = 0; n < r.length; n++) {
                                var s = r[n];
                                this.addElementBackgroundImages(s);
                            }
                    }
                }),
                { 1: !0, 9: !0, 11: !0 });
        return (
            (o.prototype.addElementBackgroundImages = function (t) {
                var e = getComputedStyle(t);
                if (e)
                    for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n; ) {
                        var o = n && n[2];
                        o && this.addBackground(o, t), (n = i.exec(e.backgroundImage));
                    }
            }),
            (o.prototype.addImage = function (t) {
                t = new r(t);
                this.images.push(t);
            }),
            (o.prototype.addBackground = function (t, e) {
                t = new s(t, e);
                this.images.push(t);
            }),
            (o.prototype.check = function () {
                function t(t, i, n) {
                    setTimeout(function () {
                        e.progress(t, i, n);
                    });
                }
                var e = this;
                return (
                    (this.progressedCount = 0),
                    (this.hasAnyBroken = !1),
                    this.images.length
                        ? void this.images.forEach(function (e) {
                              e.once("progress", t), e.check();
                          })
                        : void this.complete()
                );
            }),
            (o.prototype.progress = function (t, e, i) {
                this.progressedCount++,
                    (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
                    this.emitEvent("progress", [this, t, e]),
                    this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t),
                    this.progressedCount == this.images.length && this.complete(),
                    this.options.debug && a && a.log("progress: " + i, t, e);
            }),
            (o.prototype.complete = function () {
                var t = this.hasAnyBroken ? "fail" : "done";
                (this.isComplete = !0), this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred && ((t = this.hasAnyBroken ? "reject" : "resolve"), this.jqDeferred[t](this));
            }),
            ((r.prototype = Object.create(e.prototype)).check = function () {
                return this.getIsImageComplete()
                    ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
                    : ((this.proxyImage = new Image()),
                      this.proxyImage.addEventListener("load", this),
                      this.proxyImage.addEventListener("error", this),
                      this.img.addEventListener("load", this),
                      this.img.addEventListener("error", this),
                      void (this.proxyImage.src = this.img.src));
            }),
            (r.prototype.getIsImageComplete = function () {
                return this.img.complete && void 0 !== this.img.naturalWidth;
            }),
            (r.prototype.confirm = function (t, e) {
                (this.isLoaded = t), this.emitEvent("progress", [this, this.img, e]);
            }),
            (r.prototype.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (r.prototype.onload = function () {
                this.confirm(!0, "onload"), this.unbindEvents();
            }),
            (r.prototype.onerror = function () {
                this.confirm(!1, "onerror"), this.unbindEvents();
            }),
            (r.prototype.unbindEvents = function () {
                this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
            }),
            ((s.prototype = Object.create(r.prototype)).check = function () {
                this.img.addEventListener("load", this), this.img.addEventListener("error", this), (this.img.src = this.url), this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
            }),
            (s.prototype.unbindEvents = function () {
                this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
            }),
            (s.prototype.confirm = function (t, e) {
                (this.isLoaded = t), this.emitEvent("progress", [this, this.element, e]);
            }),
            (o.makeJQueryPlugin = function (e) {
                (e = e || t.jQuery) &&
                    ((h = e).fn.imagesLoaded = function (t, e) {
                        return new o(this, t, e).jqDeferred.promise(h(this));
                    });
            })(),
            o
        );
    }),
    !(function (a, b) {
        "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? (module.exports = b(require("jquery"))) : b(a.jQuery);
    })(this, function (a) {
        !(function () {
            "use strict";
            function b(b, d) {
                if (((this.el = b), (this.$el = a(b)), (this.s = a.extend({}, c, d)), this.s.dynamic && "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length))
                    throw "When using dynamic mode, you must also define dynamicEl as an Array.";
                return (
                    (this.modules = {}),
                    (this.lGalleryOn = !1),
                    (this.lgBusy = !1),
                    (this.hideBartimeout = !1),
                    (this.isTouch = "ontouchstart" in document.documentElement),
                    this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1),
                    this.s.dynamic
                        ? (this.$items = this.s.dynamicEl)
                        : "this" === this.s.selector
                        ? (this.$items = this.$el)
                        : "" !== this.s.selector
                        ? this.s.selectWithin
                            ? (this.$items = a(this.s.selectWithin).find(this.s.selector))
                            : (this.$items = this.$el.find(a(this.s.selector)))
                        : (this.$items = this.$el.children()),
                    (this.$slide = ""),
                    (this.$outer = ""),
                    this.init(),
                    this
                );
            }
            var c = {
                mode: "lg-slide",
                cssEasing: "ease",
                easing: "linear",
                speed: 600,
                height: "100%",
                width: "100%",
                addClass: "",
                startClass: "lg-start-zoom",
                backdropDuration: 150,
                hideBarsDelay: 6e3,
                useLeft: !1,
                closable: !0,
                loop: !0,
                escKey: !0,
                keyPress: !0,
                controls: !0,
                slideEndAnimatoin: !0,
                hideControlOnEnd: !1,
                mousewheel: !0,
                getCaptionFromTitleOrAlt: !0,
                appendSubHtmlTo: ".lg-sub-html",
                subHtmlSelectorRelative: !1,
                preload: 1,
                showAfterLoad: !0,
                selector: "",
                selectWithin: "",
                nextHtml: "",
                prevHtml: "",
                index: !1,
                iframeMaxWidth: "100%",
                download: !0,
                counter: !0,
                appendCounterTo: ".lg-toolbar",
                swipeThreshold: 50,
                enableSwipe: !0,
                enableDrag: !0,
                dynamic: !1,
                dynamicEl: [],
                galleryId: 1,
            };
            (b.prototype.init = function () {
                var b = this,
                    c = (b.s.preload > b.$items.length && (b.s.preload = b.$items.length), window.location.hash);
                0 < c.indexOf("lg=" + this.s.galleryId) &&
                    ((b.index = parseInt(c.split("&slide=")[1], 10)),
                    a("body").addClass("lg-from-hash"),
                    a("body").hasClass("lg-on") ||
                        (setTimeout(function () {
                            b.build(b.index);
                        }),
                        a("body").addClass("lg-on"))),
                    b.s.dynamic
                        ? (b.$el.trigger("onBeforeOpen.lg"),
                          (b.index = b.s.index || 0),
                          a("body").hasClass("lg-on") ||
                              setTimeout(function () {
                                  b.build(b.index), a("body").addClass("lg-on");
                              }))
                        : b.$items.on("click.lgcustom", function (c) {
                              try {
                                  c.preventDefault(), c.preventDefault();
                              } catch (a) {
                                  c.returnValue = !1;
                              }
                              b.$el.trigger("onBeforeOpen.lg"), (b.index = b.s.index || b.$items.index(this)), a("body").hasClass("lg-on") || (b.build(b.index), a("body").addClass("lg-on"));
                          });
            }),
                (b.prototype.build = function (b) {
                    var c = this;
                    c.structure(),
                        a.each(a.fn.lightGallery.modules, function (b) {
                            c.modules[b] = new a.fn.lightGallery.modules[b](c.el);
                        }),
                        c.slide(b, !1, !1, !1),
                        c.s.keyPress && c.keyPress(),
                        1 < c.$items.length &&
                            (c.arrow(),
                            setTimeout(function () {
                                c.enableDrag(), c.enableSwipe();
                            }, 50),
                            c.s.mousewheel) &&
                            c.mousewheel(),
                        c.counter(),
                        c.closeGallery(),
                        c.$el.trigger("onAfterOpen.lg"),
                        c.$outer.on("mousemove.lg click.lg touchstart.lg", function () {
                            c.$outer.removeClass("lg-hide-items"),
                                clearTimeout(c.hideBartimeout),
                                (c.hideBartimeout = setTimeout(function () {
                                    c.$outer.addClass("lg-hide-items");
                                }, c.s.hideBarsDelay));
                        }),
                        c.$outer.trigger("mousemove.lg");
                }),
                (b.prototype.structure = function () {
                    var c = "",
                        d = "",
                        e = 0,
                        f = "",
                        g = this;
                    for (a("body").append('<div class="lg-backdrop"></div>'), a(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms"), e = 0; e < this.$items.length; e++) c += '<div class="lg-item"></div>';
                    this.s.controls && 1 < this.$items.length && (d = '<div class="lg-actions"><div class="lg-prev lg-icon">' + this.s.prevHtml + '</div><div class="lg-next lg-icon">' + this.s.nextHtml + "</div></div>"),
                        ".lg-sub-html" === this.s.appendSubHtmlTo && (f = '<div class="lg-sub-html"></div>'),
                        (d =
                            '<div class="lg-outer ' +
                            this.s.addClass +
                            " " +
                            this.s.startClass +
                            '"><div class="lg" style="width:' +
                            this.s.width +
                            "; height:" +
                            this.s.height +
                            '"><div class="lg-inner">' +
                            c +
                            '</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>' +
                            d +
                            f +
                            "</div></div>"),
                        a("body").append(d),
                        (this.$outer = a(".lg-outer")),
                        (this.$slide = this.$outer.find(".lg-item")),
                        this.s.useLeft ? (this.$outer.addClass("lg-use-left"), (this.s.mode = "lg-slide")) : this.$outer.addClass("lg-use-css3"),
                        g.setTop(),
                        a(window).on("resize.lg orientationchange.lg", function () {
                            setTimeout(function () {
                                g.setTop();
                            }, 100);
                        }),
                        this.$slide.eq(this.index).addClass("lg-current"),
                        this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"), (this.s.speed = 0)),
                        this.$outer.addClass(this.s.mode),
                        this.s.enableDrag && 1 < this.$items.length && this.$outer.addClass("lg-grab"),
                        this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"),
                        this.doCss() && ((f = this.$outer.find(".lg-inner")).css("transition-timing-function", this.s.cssEasing), f.css("transition-duration", this.s.speed + "ms")),
                        setTimeout(function () {
                            a(".lg-backdrop").addClass("in");
                        }),
                        setTimeout(function () {
                            g.$outer.addClass("lg-visible");
                        }, this.s.backdropDuration),
                        this.s.download && this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'),
                        (this.prevScrollTop = a(window).scrollTop());
                }),
                (b.prototype.setTop = function () {
                    var b, c, d;
                    "100%" !== this.s.height && ((c = ((b = a(window).height()) - parseInt(this.s.height, 10)) / 2), (d = this.$outer.find(".lg")), b >= parseInt(this.s.height, 10) ? d.css("top", c + "px") : d.css("top", "0px"));
                }),
                (b.prototype.doCss = function () {
                    return !!(function () {
                        for (var a = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"], b = document.documentElement, c = 0, c = 0; c < a.length; c++) if (a[c] in b.style) return !0;
                    })();
                }),
                (b.prototype.isVideo = function (a, b) {
                    var e, f;
                    return (
                        (b = this.s.dynamic ? this.s.dynamicEl[b].html : this.$items.eq(b).attr("data-html")),
                        !a && b
                            ? { html5: !0 }
                            : ((b = a.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i)),
                              (e = a.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i)),
                              (f = a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i)),
                              (a = a.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i)),
                              b ? { youtube: b } : e ? { vimeo: e } : f ? { dailymotion: f } : a ? { vk: a } : void 0)
                    );
                }),
                (b.prototype.counter = function () {
                    this.s.counter && a(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + "</span></div>");
                }),
                (b.prototype.addHtml = function (b) {
                    var c,
                        d,
                        f,
                        e = null;
                    this.s.dynamic
                        ? this.s.dynamicEl[b].subHtmlUrl
                            ? (c = this.s.dynamicEl[b].subHtmlUrl)
                            : (e = this.s.dynamicEl[b].subHtml)
                        : (d = this.$items.eq(b)).attr("data-sub-html-url")
                        ? (c = d.attr("data-sub-html-url"))
                        : ((e = d.attr("data-sub-html")), this.s.getCaptionFromTitleOrAlt && !e && (e = d.attr("title") || d.find("img").first().attr("alt"))),
                        c || (null != e ? ("." !== (f = e.substring(0, 1)) && "#" !== f) || (e = (this.s.subHtmlSelectorRelative && !this.s.dynamic ? d.find(e) : a(e)).html()) : (e = "")),
                        ".lg-sub-html" === this.s.appendSubHtmlTo ? (c ? this.$outer.find(this.s.appendSubHtmlTo).load(c) : this.$outer.find(this.s.appendSubHtmlTo).html(e)) : c ? this.$slide.eq(b).load(c) : this.$slide.eq(b).append(e),
                        null != e && ("" === e ? this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html") : this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")),
                        this.$el.trigger("onAfterAppendSubHtml.lg", [b]);
                }),
                (b.prototype.preload = function (a) {
                    for (var b = 1, c = 1, b = 1; b <= this.s.preload && !(b >= this.$items.length - a); b++) this.loadContent(a + b, !1, 0);
                    for (c = 1; c <= this.s.preload && !(a - c < 0); c++) this.loadContent(a - c, !1, 0);
                }),
                (b.prototype.loadContent = function (b, c, d) {
                    function m(b) {
                        for (var c = [], d = [], e = 0; e < b.length; e++) {
                            var g = b[e].split(" ");
                            "" === g[0] && g.splice(0, 1), d.push(g[0]), c.push(g[1]);
                        }
                        for (var h = a(window).width(), i = 0; i < c.length; i++)
                            if (parseInt(c[i], 10) > h) {
                                f = d[i];
                                break;
                            }
                    }
                    var f,
                        g,
                        h,
                        j,
                        k = this,
                        l = !1,
                        i = k.s.dynamic
                            ? (k.s.dynamicEl[b].poster && ((l = !0), (g = k.s.dynamicEl[b].poster)),
                              (j = k.s.dynamicEl[b].html),
                              (f = k.s.dynamicEl[b].src),
                              k.s.dynamicEl[b].responsive && m(k.s.dynamicEl[b].responsive.split(",")),
                              (h = k.s.dynamicEl[b].srcset),
                              k.s.dynamicEl[b].sizes)
                            : (k.$items.eq(b).attr("data-poster") && ((l = !0), (g = k.$items.eq(b).attr("data-poster"))),
                              (j = k.$items.eq(b).attr("data-html")),
                              (f = k.$items.eq(b).attr("href") || k.$items.eq(b).attr("data-src")),
                              k.$items.eq(b).attr("data-responsive") && m(k.$items.eq(b).attr("data-responsive").split(",")),
                              (h = k.$items.eq(b).attr("data-srcset")),
                              k.$items.eq(b).attr("data-sizes")),
                        p = !1,
                        q = (k.s.dynamic ? k.s.dynamicEl[b].iframe && (p = !0) : "true" === k.$items.eq(b).attr("data-iframe") && (p = !0), k.isVideo(f, b));
                    if (!k.$slide.eq(b).hasClass("lg-loaded")) {
                        if (
                            (p
                                ? k.$slide
                                      .eq(b)
                                      .prepend(
                                          '<div class="lg-video-cont" style="max-width:' +
                                              k.s.iframeMaxWidth +
                                              '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' +
                                              f +
                                              '"  allowfullscreen="true"></iframe></div></div>'
                                      )
                                : l
                                ? ((p = ""),
                                  (p = q && q.youtube ? "lg-has-youtube" : q && q.vimeo ? "lg-has-vimeo" : "lg-has-html5"),
                                  k.$slide.eq(b).prepend('<div class="lg-video-cont ' + p + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + g + '" /></div></div>'))
                                : q
                                ? (k.$slide.eq(b).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'), k.$el.trigger("hasVideo.lg", [b, f, j]))
                                : k.$slide.eq(b).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + f + '" /></div>'),
                            k.$el.trigger("onAferAppendSlide.lg", [b]),
                            (p = k.$slide.eq(b).find(".lg-object")),
                            i && p.attr("sizes", i),
                            h)
                        ) {
                            p.attr("srcset", h);
                            try {
                                picturefill({ elements: [p[0]] });
                            } catch (a) {
                                console.error("Make sure you have included Picturefill version 2");
                            }
                        }
                        ".lg-sub-html" !== this.s.appendSubHtmlTo && k.addHtml(b), k.$slide.eq(b).addClass("lg-loaded");
                    }
                    k.$slide
                        .eq(b)
                        .find(".lg-object")
                        .on("load.lg error.lg", function () {
                            var c = 0;
                            d && !a("body").hasClass("lg-from-hash") && (c = d),
                                setTimeout(function () {
                                    k.$slide.eq(b).addClass("lg-complete"), k.$el.trigger("onSlideItemLoad.lg", [b, d || 0]);
                                }, c);
                        }),
                        q && q.html5 && !l && k.$slide.eq(b).addClass("lg-complete"),
                        !0 === c &&
                            (k.$slide.eq(b).hasClass("lg-complete")
                                ? k.preload(b)
                                : k.$slide
                                      .eq(b)
                                      .find(".lg-object")
                                      .on("load.lg error.lg", function () {
                                          k.preload(b);
                                      }));
                }),
                (b.prototype.slide = function (b, c, d, e) {
                    var h,
                        i,
                        j,
                        k,
                        l,
                        f = this.$outer.find(".lg-current").index(),
                        g = this;
                    (g.lGalleryOn && f === b) ||
                        ((h = this.$slide.length), (i = g.lGalleryOn ? this.s.speed : 0), g.lgBusy) ||
                        (this.s.download &&
                            ((j = g.s.dynamic
                                ? !1 !== g.s.dynamicEl[b].downloadUrl && (g.s.dynamicEl[b].downloadUrl || g.s.dynamicEl[b].src)
                                : "false" !== g.$items.eq(b).attr("data-download-url") && (g.$items.eq(b).attr("data-download-url") || g.$items.eq(b).attr("href") || g.$items.eq(b).attr("data-src")))
                                ? (a("#lg-download").attr("href", j), g.$outer.removeClass("lg-hide-download"))
                                : g.$outer.addClass("lg-hide-download")),
                        this.$el.trigger("onBeforeSlide.lg", [f, b, c, d]),
                        (g.lgBusy = !0),
                        clearTimeout(g.hideBartimeout),
                        ".lg-sub-html" === this.s.appendSubHtmlTo &&
                            setTimeout(function () {
                                g.addHtml(b);
                            }, i),
                        this.arrowDisable(b),
                        e || (b < f ? (e = "prev") : f < b && (e = "next")),
                        c
                            ? (this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide"),
                              2 < h ? ((k = b - 1), (l = b + 1), ((0 === b && f === h - 1) || (b === h - 1 && 0 === f)) && ((l = 0), (k = h - 1))) : ((k = 0), (l = 1)),
                              "prev" === e ? g.$slide.eq(l).addClass("lg-next-slide") : g.$slide.eq(k).addClass("lg-prev-slide"),
                              g.$slide.eq(b).addClass("lg-current"))
                            : (g.$outer.addClass("lg-no-trans"),
                              this.$slide.removeClass("lg-prev-slide lg-next-slide"),
                              "prev" === e ? (this.$slide.eq(b).addClass("lg-prev-slide"), this.$slide.eq(f).addClass("lg-next-slide")) : (this.$slide.eq(b).addClass("lg-next-slide"), this.$slide.eq(f).addClass("lg-prev-slide")),
                              setTimeout(function () {
                                  g.$slide.removeClass("lg-current"), g.$slide.eq(b).addClass("lg-current"), g.$outer.removeClass("lg-no-trans");
                              }, 50)),
                        g.lGalleryOn
                            ? (setTimeout(function () {
                                  g.loadContent(b, !0, 0);
                              }, this.s.speed + 50),
                              setTimeout(function () {
                                  (g.lgBusy = !1), g.$el.trigger("onAfterSlide.lg", [f, b, c, d]);
                              }, this.s.speed))
                            : (g.loadContent(b, !0, g.s.backdropDuration), (g.lgBusy = !1), g.$el.trigger("onAfterSlide.lg", [f, b, c, d])),
                        (g.lGalleryOn = !0),
                        this.s.counter && a("#lg-counter-current").text(b + 1));
                }),
                (b.prototype.goToNextSlide = function (a) {
                    var b = this,
                        c = b.s.loop;
                    a && b.$slide.length < 3 && (c = !1),
                        b.lgBusy ||
                            (b.index + 1 < b.$slide.length
                                ? (b.index++, b.$el.trigger("onBeforeNextSlide.lg", [b.index]), b.slide(b.index, a, !1, "next"))
                                : c
                                ? ((b.index = 0), b.$el.trigger("onBeforeNextSlide.lg", [b.index]), b.slide(b.index, a, !1, "next"))
                                : b.s.slideEndAnimatoin &&
                                  !a &&
                                  (b.$outer.addClass("lg-right-end"),
                                  setTimeout(function () {
                                      b.$outer.removeClass("lg-right-end");
                                  }, 400)));
                }),
                (b.prototype.goToPrevSlide = function (a) {
                    var b = this,
                        c = b.s.loop;
                    a && b.$slide.length < 3 && (c = !1),
                        b.lgBusy ||
                            (0 < b.index
                                ? (b.index--, b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]), b.slide(b.index, a, !1, "prev"))
                                : c
                                ? ((b.index = b.$items.length - 1), b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]), b.slide(b.index, a, !1, "prev"))
                                : b.s.slideEndAnimatoin &&
                                  !a &&
                                  (b.$outer.addClass("lg-left-end"),
                                  setTimeout(function () {
                                      b.$outer.removeClass("lg-left-end");
                                  }, 400)));
                }),
                (b.prototype.keyPress = function () {
                    var b = this;
                    1 < this.$items.length &&
                        a(window).on("keyup.lg", function (a) {
                            1 < b.$items.length && (37 === a.keyCode && (a.preventDefault(), b.goToPrevSlide()), 39 === a.keyCode) && (a.preventDefault(), b.goToNextSlide());
                        }),
                        a(window).on("keydown.lg", function (a) {
                            !0 === b.s.escKey && 27 === a.keyCode && (a.preventDefault(), b.$outer.hasClass("lg-thumb-open") ? b.$outer.removeClass("lg-thumb-open") : b.destroy());
                        });
                }),
                (b.prototype.arrow = function () {
                    var a = this;
                    this.$outer.find(".lg-prev").on("click.lg", function () {
                        a.goToPrevSlide();
                    }),
                        this.$outer.find(".lg-next").on("click.lg", function () {
                            a.goToNextSlide();
                        });
                }),
                (b.prototype.arrowDisable = function (a) {
                    !this.s.loop &&
                        this.s.hideControlOnEnd &&
                        (a + 1 < this.$slide.length ? this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled"),
                        0 < a ? this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled"));
                }),
                (b.prototype.setTranslate = function (a, b, c) {
                    this.s.useLeft ? a.css("left", b) : a.css({ transform: "translate3d(" + b + "px, " + c + "px, 0px)" });
                }),
                (b.prototype.touchMove = function (b, c) {
                    c -= b;
                    15 < Math.abs(c) &&
                        (this.$outer.addClass("lg-dragging"),
                        this.setTranslate(this.$slide.eq(this.index), c, 0),
                        this.setTranslate(a(".lg-prev-slide"), -this.$slide.eq(this.index).width() + c, 0),
                        this.setTranslate(a(".lg-next-slide"), this.$slide.eq(this.index).width() + c, 0));
                }),
                (b.prototype.touchEnd = function (a) {
                    var b = this;
                    "lg-slide" !== b.s.mode && b.$outer.addClass("lg-slide"),
                        this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0"),
                        setTimeout(function () {
                            b.$outer.removeClass("lg-dragging"),
                                a < 0 && Math.abs(a) > b.s.swipeThreshold ? b.goToNextSlide(!0) : 0 < a && Math.abs(a) > b.s.swipeThreshold ? b.goToPrevSlide(!0) : Math.abs(a) < 5 && b.$el.trigger("onSlideClick.lg"),
                                b.$slide.removeAttr("style");
                        }),
                        setTimeout(function () {
                            b.$outer.hasClass("lg-dragging") || "lg-slide" === b.s.mode || b.$outer.removeClass("lg-slide");
                        }, b.s.speed + 100);
                }),
                (b.prototype.enableSwipe = function () {
                    var a = this,
                        b = 0,
                        c = 0,
                        d = !1;
                    a.s.enableSwipe &&
                        a.isTouch &&
                        a.doCss() &&
                        (a.$slide.on("touchstart.lg", function (c) {
                            a.$outer.hasClass("lg-zoomed") || a.lgBusy || (c.preventDefault(), a.manageSwipeClass(), (b = c.originalEvent.targetTouches[0].pageX));
                        }),
                        a.$slide.on("touchmove.lg", function (e) {
                            a.$outer.hasClass("lg-zoomed") || (e.preventDefault(), (c = e.originalEvent.targetTouches[0].pageX), a.touchMove(b, c), (d = !0));
                        }),
                        a.$slide.on("touchend.lg", function () {
                            a.$outer.hasClass("lg-zoomed") || (d ? ((d = !1), a.touchEnd(c - b)) : a.$el.trigger("onSlideClick.lg"));
                        }));
                }),
                (b.prototype.enableDrag = function () {
                    var b = this,
                        c = 0,
                        d = 0,
                        e = !1,
                        f = !1;
                    b.s.enableDrag &&
                        !b.isTouch &&
                        b.doCss() &&
                        (b.$slide.on("mousedown.lg", function (d) {
                            b.$outer.hasClass("lg-zoomed") ||
                                ((a(d.target).hasClass("lg-object") || a(d.target).hasClass("lg-video-play")) &&
                                    (d.preventDefault(),
                                    b.lgBusy || (b.manageSwipeClass(), (c = d.pageX), (e = !0), (b.$outer.scrollLeft += 1), --b.$outer.scrollLeft, b.$outer.removeClass("lg-grab").addClass("lg-grabbing"), b.$el.trigger("onDragstart.lg"))));
                        }),
                        a(window).on("mousemove.lg", function (a) {
                            e && ((f = !0), (d = a.pageX), b.touchMove(c, d), b.$el.trigger("onDragmove.lg"));
                        }),
                        a(window).on("mouseup.lg", function (g) {
                            f ? ((f = !1), b.touchEnd(d - c), b.$el.trigger("onDragend.lg")) : (a(g.target).hasClass("lg-object") || a(g.target).hasClass("lg-video-play")) && b.$el.trigger("onSlideClick.lg"),
                                e && ((e = !1), b.$outer.removeClass("lg-grabbing").addClass("lg-grab"));
                        }));
                }),
                (b.prototype.manageSwipeClass = function () {
                    var a = this.index + 1,
                        b = this.index - 1;
                    this.s.loop && 2 < this.$slide.length && (0 === this.index ? (b = this.$slide.length - 1) : this.index === this.$slide.length - 1 && (a = 0)),
                        this.$slide.removeClass("lg-next-slide lg-prev-slide"),
                        -1 < b && this.$slide.eq(b).addClass("lg-prev-slide"),
                        this.$slide.eq(a).addClass("lg-next-slide");
                }),
                (b.prototype.mousewheel = function () {
                    var a = this;
                    a.$outer.on("mousewheel.lg", function (b) {
                        b.deltaY && (0 < b.deltaY ? a.goToPrevSlide() : a.goToNextSlide(), b.preventDefault());
                    });
                }),
                (b.prototype.closeGallery = function () {
                    var b = this,
                        c = !1;
                    this.$outer.find(".lg-close").on("click.lg", function () {
                        b.destroy();
                    }),
                        b.s.closable &&
                            (b.$outer.on("mousedown.lg", function (b) {
                                c = !!(a(b.target).is(".lg-outer") || a(b.target).is(".lg-item ") || a(b.target).is(".lg-img-wrap"));
                            }),
                            b.$outer.on("mouseup.lg", function (d) {
                                !(a(d.target).is(".lg-outer") || a(d.target).is(".lg-item ") || (a(d.target).is(".lg-img-wrap") && c)) || b.$outer.hasClass("lg-dragging") || b.destroy();
                            }));
                }),
                (b.prototype.destroy = function (b) {
                    var c = this;
                    b || (c.$el.trigger("onBeforeClose.lg"), a(window).scrollTop(c.prevScrollTop)),
                        b && (c.s.dynamic || this.$items.off("click.lg click.lgcustom"), a.removeData(c.el, "lightGallery")),
                        this.$el.off(".lg.tm"),
                        a.each(a.fn.lightGallery.modules, function (a) {
                            c.modules[a] && c.modules[a].destroy();
                        }),
                        (this.lGalleryOn = !1),
                        clearTimeout(c.hideBartimeout),
                        (this.hideBartimeout = !1),
                        a(window).off(".lg"),
                        a("body").removeClass("lg-on lg-from-hash"),
                        c.$outer && c.$outer.removeClass("lg-visible"),
                        a(".lg-backdrop").removeClass("in"),
                        setTimeout(function () {
                            c.$outer && c.$outer.remove(), a(".lg-backdrop").remove(), b || c.$el.trigger("onCloseAfter.lg");
                        }, c.s.backdropDuration + 50);
                }),
                (a.fn.lightGallery = function (c) {
                    return this.each(function () {
                        if (a.data(this, "lightGallery"))
                            try {
                                a(this).data("lightGallery").init();
                            } catch (a) {
                                console.error("lightGallery has not initiated properly");
                            }
                        else a.data(this, "lightGallery", new b(this, c));
                    });
                }),
                (a.fn.lightGallery.modules = {});
        })();
    }),
    !(function ($) {
        "use strict";
        function Video(element) {
            return (this.core = $(element).data("lightGallery")), (this.$el = $(element)), (this.core.s = $.extend({}, defaults, this.core.s)), (this.videoLoaded = !1), this.init(), this;
        }
        var defaults = { videoMaxWidth: "855px", youtubePlayerParams: !1, vimeoPlayerParams: !1, dailymotionPlayerParams: !1, vkPlayerParams: !1, videojs: !1, videojsOptions: {} };
        (Video.prototype.init = function () {
            function loadOnClick($el) {
                if ($el.find(".lg-object").hasClass("lg-has-poster") && $el.find(".lg-object").is(":visible"))
                    if ($el.hasClass("lg-has-video")) {
                        var youtubePlayer = $el.find(".lg-youtube").get(0),
                            vimeoPlayer = $el.find(".lg-vimeo").get(0),
                            dailymotionPlayer = $el.find(".lg-dailymotion").get(0),
                            html5Player = $el.find(".lg-html5").get(0);
                        if (youtubePlayer) youtubePlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
                        else if (vimeoPlayer)
                            try {
                                $f(vimeoPlayer).api("play");
                            } catch (e) {
                                console.error("Make sure you have included froogaloop2 js");
                            }
                        else if (dailymotionPlayer) dailymotionPlayer.contentWindow.postMessage("play", "*");
                        else if (html5Player)
                            if (_this.core.s.videojs)
                                try {
                                    videojs(html5Player).play();
                                } catch (e) {
                                    console.error("Make sure you have included videojs");
                                }
                            else html5Player.play();
                        $el.addClass("lg-video-playing");
                    } else {
                        $el.addClass("lg-video-playing lg-has-video");
                        (youtubePlayer = function (_src, _html) {
                            if (($el.find(".lg-video").append(_this.loadVideo(_src, "", !1, _this.core.index, _html)), _html))
                                if (_this.core.s.videojs)
                                    try {
                                        videojs(_this.core.$slide.eq(_this.core.index).find(".lg-html5").get(0), _this.core.s.videojsOptions, function () {
                                            this.play();
                                        });
                                    } catch (e) {
                                        console.error("Make sure you have included videojs");
                                    }
                                else _this.core.$slide.eq(_this.core.index).find(".lg-html5").get(0).play();
                        }),
                            (vimeoPlayer =
                                (_this.core.s.dynamic
                                    ? youtubePlayer(_this.core.s.dynamicEl[_this.core.index].src, _this.core.s.dynamicEl[_this.core.index].html)
                                    : youtubePlayer(_this.core.$items.eq(_this.core.index).attr("href") || _this.core.$items.eq(_this.core.index).attr("data-src"), _this.core.$items.eq(_this.core.index).attr("data-html")),
                                $el.find(".lg-object")));
                        $el.find(".lg-video").append(vimeoPlayer),
                            $el.find(".lg-video-object").hasClass("lg-html5") ||
                                ($el.removeClass("lg-complete"),
                                $el.find(".lg-video-object").on("load.lg error.lg", function () {
                                    $el.addClass("lg-complete");
                                }));
                    }
            }
            var _this = this;
            _this.core.$el.on("hasVideo.lg.tm", function (event, index, src, html) {
                if ((_this.core.$slide.eq(index).find(".lg-video").append(_this.loadVideo(src, "lg-object", !0, index, html)), html))
                    if (_this.core.s.videojs)
                        try {
                            videojs(_this.core.$slide.eq(index).find(".lg-html5").get(0), _this.core.s.videojsOptions, function () {
                                _this.videoLoaded || this.play();
                            });
                        } catch (e) {
                            console.error("Make sure you have included videojs");
                        }
                    else _this.core.$slide.eq(index).find(".lg-html5").get(0).play();
            }),
                _this.core.$el.on("onAferAppendSlide.lg.tm", function (event, index) {
                    _this.core.$slide.eq(index).find(".lg-video-cont").css("max-width", _this.core.s.videoMaxWidth), (_this.videoLoaded = !0);
                });
            _this.core.doCss() && 1 < _this.core.$items.length && ((_this.core.s.enableSwipe && _this.core.isTouch) || (_this.core.s.enableDrag && !_this.core.isTouch))
                ? _this.core.$el.on("onSlideClick.lg.tm", function () {
                      var $el = _this.core.$slide.eq(_this.core.index);
                      loadOnClick($el);
                  })
                : _this.core.$slide.on("click.lg", function () {
                      loadOnClick($(this));
                  }),
                _this.core.$el.on("onBeforeSlide.lg.tm", function (event, prevIndex, index) {
                    var prevIndex = _this.core.$slide.eq(prevIndex),
                        youtubePlayer = prevIndex.find(".lg-youtube").get(0),
                        vimeoPlayer = prevIndex.find(".lg-vimeo").get(0),
                        dailymotionPlayer = prevIndex.find(".lg-dailymotion").get(0),
                        vkPlayer = prevIndex.find(".lg-vk").get(0),
                        prevIndex = prevIndex.find(".lg-html5").get(0);
                    if (youtubePlayer) youtubePlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
                    else if (vimeoPlayer)
                        try {
                            $f(vimeoPlayer).api("pause");
                        } catch (e) {
                            console.error("Make sure you have included froogaloop2 js");
                        }
                    else if (dailymotionPlayer) dailymotionPlayer.contentWindow.postMessage("pause", "*");
                    else if (prevIndex)
                        if (_this.core.s.videojs)
                            try {
                                videojs(prevIndex).pause();
                            } catch (e) {
                                console.error("Make sure you have included videojs");
                            }
                        else prevIndex.pause();
                    vkPlayer && $(vkPlayer).attr("src", $(vkPlayer).attr("src").replace("&autoplay", "&noplay"));
                    (youtubePlayer = _this.core.s.dynamic ? _this.core.s.dynamicEl[index].src : _this.core.$items.eq(index).attr("href") || _this.core.$items.eq(index).attr("data-src")),
                        (vimeoPlayer = _this.core.isVideo(youtubePlayer, index) || {});
                    (vimeoPlayer.youtube || vimeoPlayer.vimeo || vimeoPlayer.dailymotion || vimeoPlayer.vk) && _this.core.$outer.addClass("lg-hide-download");
                }),
                _this.core.$el.on("onAfterSlide.lg.tm", function (event, prevIndex) {
                    _this.core.$slide.eq(prevIndex).removeClass("lg-video-playing");
                });
        }),
            (Video.prototype.loadVideo = function (src, addClass, noposter, index, html) {
                var video = "",
                    autoplay = 1,
                    a = "",
                    src = this.core.isVideo(src, index) || {};
                return (
                    noposter && (autoplay = this.videoLoaded ? 0 : 1),
                    src.youtube
                        ? ((a = "?wmode=opaque&autoplay=" + autoplay + "&enablejsapi=1"),
                          this.core.s.youtubePlayerParams && (a = a + "&" + $.param(this.core.s.youtubePlayerParams)),
                          (video = '<iframe class="lg-video-object lg-youtube ' + addClass + '" width="560" height="315" src="//www.youtube.com/embed/' + src.youtube[1] + a + '" frameborder="0" allowfullscreen></iframe>'))
                        : src.vimeo
                        ? ((a = "?autoplay=" + autoplay + "&api=1"),
                          this.core.s.vimeoPlayerParams && (a = a + "&" + $.param(this.core.s.vimeoPlayerParams)),
                          (video =
                              '<iframe class="lg-video-object lg-vimeo ' +
                              addClass +
                              '" width="560" height="315"  src="//player.vimeo.com/video/' +
                              src.vimeo[1] +
                              a +
                              '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'))
                        : src.dailymotion
                        ? ((a = "?wmode=opaque&autoplay=" + autoplay + "&api=postMessage"),
                          this.core.s.dailymotionPlayerParams && (a = a + "&" + $.param(this.core.s.dailymotionPlayerParams)),
                          (video = '<iframe class="lg-video-object lg-dailymotion ' + addClass + '" width="560" height="315" src="//www.dailymotion.com/embed/video/' + src.dailymotion[1] + a + '" frameborder="0" allowfullscreen></iframe>'))
                        : src.html5
                        ? (video = html = "." !== (index = html.substring(0, 1)) && "#" !== index ? html : $(html).html())
                        : src.vk &&
                          ((a = "&autoplay=" + autoplay),
                          this.core.s.vkPlayerParams && (a = a + "&" + $.param(this.core.s.vkPlayerParams)),
                          (video = '<iframe class="lg-video-object lg-vk ' + addClass + '" width="560" height="315" src="https://vk.com/video_ext.php?' + src.vk[1] + a + '" frameborder="0" allowfullscreen></iframe>')),
                    video
                );
            }),
            (Video.prototype.destroy = function () {
                this.videoLoaded = !1;
            }),
            ($.fn.lightGallery.modules.video = Video);
    })(jQuery, (window, document)),
    !(function (factory) {
        "function" == typeof define && define.amd ? define(["jquery"], factory) : "object" == typeof exports ? (module.exports = factory(require("jquery"))) : factory(jQuery);
    })(function ($) {
        var viewportSize,
            viewportOffset,
            timer,
            inviewObjects = [],
            d = document,
            w = window,
            documentElement = d.documentElement;
        function checkInView() {
            if (inviewObjects.length) {
                var mode,
                    size,
                    i = 0,
                    $elements = $.map(inviewObjects, function (inviewObject) {
                        var selector = inviewObject.data.selector,
                            inviewObject = inviewObject.$element;
                        return selector ? inviewObject.find(selector) : inviewObject;
                    });
                for (
                    viewportSize =
                        viewportSize ||
                        (size =
                            (size = { height: w.innerHeight, width: w.innerWidth }).height || (!(mode = d.compatMode) && $.support.boxModel)
                                ? size
                                : { height: (mode = "CSS1Compat" === mode ? documentElement : d.body).clientHeight, width: mode.clientWidth }),
                        viewportOffset = viewportOffset || { top: w.pageYOffset || documentElement.scrollTop || d.body.scrollTop, left: w.pageXOffset || documentElement.scrollLeft || d.body.scrollLeft };
                    i < inviewObjects.length;
                    i++
                )
                    if ($.contains(documentElement, $elements[i][0])) {
                        var $element = $($elements[i]),
                            elementSize_height = $element[0].offsetHeight,
                            elementSize_width = $element[0].offsetWidth,
                            elementOffset = $element.offset(),
                            inView = $element.data("inview");
                        if (!viewportOffset || !viewportSize) return;
                        elementOffset.top + elementSize_height > viewportOffset.top &&
                        elementOffset.top < viewportOffset.top + viewportSize.height &&
                        elementOffset.left + elementSize_width > viewportOffset.left &&
                        elementOffset.left < viewportOffset.left + viewportSize.width
                            ? inView || $element.data("inview", !0).trigger("inview", [!0])
                            : inView && $element.data("inview", !1).trigger("inview", [!1]);
                    }
            }
        }
        ($.event.special.inview = {
            add: function (data) {
                inviewObjects.push({ data: data, $element: $(this), element: this }), !timer && inviewObjects.length && (timer = setInterval(checkInView, 250));
            },
            remove: function (data) {
                for (var i = 0; i < inviewObjects.length; i++) {
                    var inviewObject = inviewObjects[i];
                    if (inviewObject.element === this && inviewObject.data.guid === data.guid) {
                        inviewObjects.splice(i, 1);
                        break;
                    }
                }
                inviewObjects.length || (clearInterval(timer), (timer = null));
            },
        }),
            $(w).on("scroll resize scrollstop", function () {
                viewportSize = viewportOffset = null;
            }),
            !documentElement.addEventListener &&
                documentElement.attachEvent &&
                documentElement.attachEvent("onfocusin", function () {
                    viewportOffset = null;
                });
    }),
    !(function (global, factory) {
        "object" == typeof exports && "undefined" != typeof module
            ? (module.exports = factory())
            : "function" == typeof define && define.amd
            ? define(factory)
            : ((global = "undefined" != typeof globalThis ? globalThis : global || self).jarallax = factory());
    })(this, function () {
        "use strict";
        function ready(callback) {
            "complete" === document.readyState || "interactive" === document.readyState ? callback() : document.addEventListener("DOMContentLoaded", callback, { capture: !0, once: !0, passive: !0 });
        }
        let win;
        var global$1 = (win = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}),
            defaults = {
                type: "scroll",
                speed: 0.5,
                containerClass: "jarallax-container",
                imgSrc: null,
                imgElement: ".jarallax-img",
                imgSize: "cover",
                imgPosition: "50% 50%",
                imgRepeat: "no-repeat",
                keepImg: !1,
                elementInViewport: null,
                zIndex: -100,
                disableParallax: !1,
                onScroll: null,
                onInit: null,
                onDestroy: null,
                onCoverImage: null,
                videoClass: "jarallax-video",
                videoSrc: null,
                videoStartTime: 0,
                videoEndTime: 0,
                videoVolume: 0,
                videoLoop: !0,
                videoPlayOnlyVisible: !0,
                videoLazyLoading: !0,
                disableVideo: !1,
                onVideoInsert: null,
                onVideoWorkerInit: null,
            };
        var navigator$1 = global$1["navigator"];
        const mobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator$1.userAgent);
        let wndW, wndH, $deviceHelper;
        function updateWindowHeight() {
            (wndW = global$1.innerWidth || document.documentElement.clientWidth),
                (wndH = mobileAgent
                    ? (!$deviceHelper && document.body && ((($deviceHelper = document.createElement("div")).style.cssText = "position: fixed; top: -9999px; left: 0; height: 100vh; width: 0;"), document.body.appendChild($deviceHelper)),
                      ($deviceHelper ? $deviceHelper.clientHeight : 0) || global$1.innerHeight || document.documentElement.clientHeight)
                    : global$1.innerHeight || document.documentElement.clientHeight);
        }
        function getWindowSize() {
            return { width: wndW, height: wndH };
        }
        updateWindowHeight(),
            global$1.addEventListener("resize", updateWindowHeight),
            global$1.addEventListener("orientationchange", updateWindowHeight),
            global$1.addEventListener("load", updateWindowHeight),
            ready(() => {
                updateWindowHeight();
            });
        const jarallaxList = [];
        function updateParallax() {
            if (jarallaxList.length) {
                const { width: wndW, height: wndH } = getWindowSize();
                jarallaxList.forEach((data, k) => {
                    var clientRect,
                        isResized,
                        { instance: data, oldData } = data;
                    data.isVisible() &&
                        ((clientRect = { width: (clientRect = data.$item.getBoundingClientRect()).width, height: clientRect.height, top: clientRect.top, bottom: clientRect.bottom, wndW: wndW, wndH: wndH }),
                        (oldData =
                            (isResized = !oldData || oldData.wndW !== clientRect.wndW || oldData.wndH !== clientRect.wndH || oldData.width !== clientRect.width || oldData.height !== clientRect.height) ||
                            !oldData ||
                            oldData.top !== clientRect.top ||
                            oldData.bottom !== clientRect.bottom),
                        (jarallaxList[k].oldData = clientRect),
                        isResized && data.onResize(),
                        oldData) &&
                        data.onScroll();
                }),
                    global$1.requestAnimationFrame(updateParallax);
            }
        }
        const visibilityObserver = new global$1.IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.jarallax.isElementInViewport = entry.isIntersecting;
                });
            },
            { rootMargin: "50px" }
        );
        const navigator = global$1["navigator"];
        let instanceID = 0;
        class Jarallax {
            constructor(item, userOptions) {
                const self = this,
                    dataOptions = ((self.instanceID = instanceID), (instanceID += 1), (self.$item = item), (self.defaults = { ...defaults }), self.$item.dataset || {}),
                    pureDataOptions = {};
                if (
                    (Object.keys(dataOptions).forEach((key) => {
                        var lowerCaseOption = key.substr(0, 1).toLowerCase() + key.substr(1);
                        lowerCaseOption && void 0 !== self.defaults[lowerCaseOption] && (pureDataOptions[lowerCaseOption] = dataOptions[key]);
                    }),
                    (self.options = self.extend({}, self.defaults, pureDataOptions, userOptions)),
                    (self.pureOptions = self.extend({}, self.options)),
                    Object.keys(self.options).forEach((key) => {
                        "true" === self.options[key] ? (self.options[key] = !0) : "false" === self.options[key] && (self.options[key] = !1);
                    }),
                    (self.options.speed = Math.min(2, Math.max(-1, parseFloat(self.options.speed)))),
                    "string" == typeof self.options.disableParallax && (self.options.disableParallax = new RegExp(self.options.disableParallax)),
                    self.options.disableParallax instanceof RegExp)
                ) {
                    const disableParallaxRegexp = self.options.disableParallax;
                    self.options.disableParallax = () => disableParallaxRegexp.test(navigator.userAgent);
                }
                if (
                    ("function" != typeof self.options.disableParallax && (self.options.disableParallax = () => !1),
                    "string" == typeof self.options.disableVideo && (self.options.disableVideo = new RegExp(self.options.disableVideo)),
                    self.options.disableVideo instanceof RegExp)
                ) {
                    const disableVideoRegexp = self.options.disableVideo;
                    self.options.disableVideo = () => disableVideoRegexp.test(navigator.userAgent);
                }
                "function" != typeof self.options.disableVideo && (self.options.disableVideo = () => !1);
                let elementInVP = self.options.elementInViewport;
                elementInVP && "object" == typeof elementInVP && void 0 !== elementInVP.length && ([elementInVP] = elementInVP),
                    elementInVP instanceof Element || (elementInVP = null),
                    (self.options.elementInViewport = elementInVP),
                    (self.image = { src: self.options.imgSrc || null, $container: null, useImgTag: !1, position: "fixed" }),
                    self.initImg() && self.canInitParallax() && self.init();
            }
            css(el, styles) {
                return "string" == typeof styles
                    ? global$1.getComputedStyle(el).getPropertyValue(styles)
                    : (Object.keys(styles).forEach((key) => {
                          el.style[key] = styles[key];
                      }),
                      el);
            }
            extend(out, ...args) {
                return (function (out, ...args) {
                    return (
                        (out = out || {}),
                        Object.keys(args).forEach((i) => {
                            args[i] &&
                                Object.keys(args[i]).forEach((key) => {
                                    out[key] = args[i][key];
                                });
                        }),
                        out
                    );
                })(out, ...args);
            }
            getWindowData() {
                var { width, height } = getWindowSize();
                return { width: width, height: height, y: document.documentElement.scrollTop };
            }
            initImg() {
                let $imgElement = this.options.imgElement;
                return (
                    ($imgElement = $imgElement && "string" == typeof $imgElement ? this.$item.querySelector($imgElement) : $imgElement) instanceof Element ||
                        (this.options.imgSrc ? (($imgElement = new Image()).src = this.options.imgSrc) : ($imgElement = null)),
                    $imgElement && (this.options.keepImg ? (this.image.$item = $imgElement.cloneNode(!0)) : ((this.image.$item = $imgElement), (this.image.$itemParent = $imgElement.parentNode)), (this.image.useImgTag = !0)),
                    !(
                        !this.image.$item &&
                        (null === this.image.src && ((this.image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"), (this.image.bgImage = this.css(this.$item, "background-image"))),
                        !this.image.bgImage || "none" === this.image.bgImage)
                    )
                );
            }
            canInitParallax() {
                return !this.options.disableParallax();
            }
            init() {
                var curStyle,
                    containerStyles = { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden" };
                let imageStyles = { pointerEvents: "none", transformStyle: "preserve-3d", backfaceVisibility: "hidden" };
                this.options.keepImg ||
                    ((curStyle = this.$item.getAttribute("style")) && this.$item.setAttribute("data-jarallax-original-styles", curStyle),
                    this.image.useImgTag && (curStyle = this.image.$item.getAttribute("style")) && this.image.$item.setAttribute("data-jarallax-original-styles", curStyle)),
                    "static" === this.css(this.$item, "position") && this.css(this.$item, { position: "relative" }),
                    "auto" === this.css(this.$item, "z-index") && this.css(this.$item, { zIndex: 0 }),
                    (this.image.$container = document.createElement("div")),
                    this.css(this.image.$container, containerStyles),
                    this.css(this.image.$container, { "z-index": this.options.zIndex }),
                    "fixed" === this.image.position && this.css(this.image.$container, { "-webkit-clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)", "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }),
                    this.image.$container.setAttribute("id", "jarallax-container-" + this.instanceID),
                    this.options.containerClass && this.image.$container.setAttribute("class", this.options.containerClass),
                    this.$item.appendChild(this.image.$container),
                    this.image.useImgTag
                        ? (imageStyles = this.extend({ "object-fit": this.options.imgSize, "object-position": this.options.imgPosition, "max-width": "none" }, containerStyles, imageStyles))
                        : ((this.image.$item = document.createElement("div")),
                          this.image.src &&
                              (imageStyles = this.extend(
                                  {
                                      "background-position": this.options.imgPosition,
                                      "background-size": this.options.imgSize,
                                      "background-repeat": this.options.imgRepeat,
                                      "background-image": this.image.bgImage || `url("${this.image.src}")`,
                                  },
                                  containerStyles,
                                  imageStyles
                              ))),
                    ("opacity" !== this.options.type && "scale" !== this.options.type && "scale-opacity" !== this.options.type && 1 !== this.options.speed) || (this.image.position = "absolute"),
                    "fixed" === this.image.position &&
                        ((curStyle = (function (elem) {
                            for (var parents = []; null !== elem.parentElement; ) 1 === (elem = elem.parentElement).nodeType && parents.push(elem);
                            return parents;
                        })(this.$item).filter((el) => {
                            var el = global$1.getComputedStyle(el),
                                parentTransform = el["-webkit-transform"] || el["-moz-transform"] || el.transform;
                            return (parentTransform && "none" !== parentTransform) || /(auto|scroll)/.test(el.overflow + el["overflow-y"] + el["overflow-x"]);
                        })),
                        (this.image.position = curStyle.length ? "absolute" : "fixed")),
                    (imageStyles.position = this.image.position),
                    this.css(this.image.$item, imageStyles),
                    this.image.$container.appendChild(this.image.$item),
                    this.onResize(),
                    this.onScroll(!0),
                    this.options.onInit && this.options.onInit.call(this),
                    "none" !== this.css(this.$item, "background-image") && this.css(this.$item, { "background-image": "none" }),
                    (containerStyles = this),
                    jarallaxList.push({ instance: containerStyles }),
                    1 === jarallaxList.length && global$1.requestAnimationFrame(updateParallax),
                    visibilityObserver.observe(containerStyles.options.elementInViewport || containerStyles.$item);
            }
            destroy() {
                (instance = this),
                    jarallaxList.forEach((data, key) => {
                        data.instance.instanceID === instance.instanceID && jarallaxList.splice(key, 1);
                    }),
                    visibilityObserver.unobserve(instance.options.elementInViewport || instance.$item);
                var instance,
                    originalStylesImgTag,
                    originalStylesTag = this.$item.getAttribute("data-jarallax-original-styles");
                this.$item.removeAttribute("data-jarallax-original-styles"),
                    originalStylesTag ? this.$item.setAttribute("style", originalStylesTag) : this.$item.removeAttribute("style"),
                    this.image.useImgTag &&
                        ((originalStylesImgTag = this.image.$item.getAttribute("data-jarallax-original-styles")),
                        this.image.$item.removeAttribute("data-jarallax-original-styles"),
                        originalStylesImgTag ? this.image.$item.setAttribute("style", originalStylesTag) : this.image.$item.removeAttribute("style"),
                        this.image.$itemParent) &&
                        this.image.$itemParent.appendChild(this.image.$item),
                    this.image.$container && this.image.$container.parentNode.removeChild(this.image.$container),
                    this.options.onDestroy && this.options.onDestroy.call(this),
                    delete this.$item.jarallax;
            }
            coverImage() {
                var wndH = getWindowSize()["height"],
                    rect = this.image.$container.getBoundingClientRect(),
                    contH = rect.height,
                    speed = this.options["speed"],
                    isScroll = "scroll" === this.options.type || "scroll-opacity" === this.options.type;
                let scrollDist = 0,
                    resultH = contH,
                    resultMT = 0;
                return (
                    isScroll &&
                        (speed < 0 ? ((scrollDist = speed * Math.max(contH, wndH)), wndH < contH && (scrollDist -= speed * (contH - wndH))) : (scrollDist = speed * (contH + wndH)),
                        1 < speed ? (resultH = Math.abs(scrollDist - wndH)) : speed < 0 ? (resultH = scrollDist / speed + Math.abs(scrollDist)) : (resultH += (wndH - contH) * (1 - speed)),
                        (scrollDist /= 2)),
                    (this.parallaxScrollDistance = scrollDist),
                    (resultMT = isScroll ? (wndH - resultH) / 2 : (contH - resultH) / 2),
                    this.css(this.image.$item, { height: resultH + "px", marginTop: resultMT + "px", left: "fixed" === this.image.position ? rect.left + "px" : "0", width: rect.width + "px" }),
                    this.options.onCoverImage && this.options.onCoverImage.call(this),
                    { image: { height: resultH, marginTop: resultMT }, container: rect }
                );
            }
            isVisible() {
                return this.isElementInViewport || !1;
            }
            onScroll(force) {
                if (force || this.isVisible()) {
                    var force = getWindowSize()["height"],
                        rect = this.$item.getBoundingClientRect(),
                        contT = rect.top,
                        contH = rect.height,
                        styles = {},
                        beforeTop = Math.max(0, contT),
                        beforeTopEnd = Math.max(0, contH + contT),
                        afterTop = Math.max(0, -contT),
                        beforeBottom = Math.max(0, contT + contH - force),
                        beforeBottomEnd = Math.max(0, contH - (contT + contH - force)),
                        afterBottom = Math.max(0, -contT + force - contH),
                        fromViewportCenter = 1 - ((force - contT) / (force + contH)) * 2;
                    let visiblePercent = 1;
                    if (
                        (contH < force ? (visiblePercent = 1 - (afterTop || beforeBottom) / contH) : beforeTopEnd <= force ? (visiblePercent = beforeTopEnd / force) : beforeBottomEnd <= force && (visiblePercent = beforeBottomEnd / force),
                        ("opacity" !== this.options.type && "scale-opacity" !== this.options.type && "scroll-opacity" !== this.options.type) || ((styles.transform = "translate3d(0,0,0)"), (styles.opacity = visiblePercent)),
                        "scale" === this.options.type || "scale-opacity" === this.options.type)
                    ) {
                        let scale = 1;
                        this.options.speed < 0 ? (scale -= this.options.speed * visiblePercent) : (scale += this.options.speed * (1 - visiblePercent)), (styles.transform = `scale(${scale}) translate3d(0,0,0)`);
                    }
                    if ("scroll" === this.options.type || "scroll-opacity" === this.options.type) {
                        let positionY = this.parallaxScrollDistance * fromViewportCenter;
                        "absolute" === this.image.position && (positionY -= contT), (styles.transform = `translate3d(0,${positionY}px,0)`);
                    }
                    this.css(this.image.$item, styles),
                        this.options.onScroll &&
                            this.options.onScroll.call(this, {
                                section: rect,
                                beforeTop: beforeTop,
                                beforeTopEnd: beforeTopEnd,
                                afterTop: afterTop,
                                beforeBottom: beforeBottom,
                                beforeBottomEnd: beforeBottomEnd,
                                afterBottom: afterBottom,
                                visiblePercent: visiblePercent,
                                fromViewportCenter: fromViewportCenter,
                            });
                }
            }
            onResize() {
                this.coverImage();
            }
        }
        function jarallax(items, options, ...args) {
            var len = (items = ("object" == typeof HTMLElement ? items instanceof HTMLElement : items && "object" == typeof items && null !== items && 1 === items.nodeType && "string" == typeof items.nodeName) ? [items] : items).length;
            let k = 0,
                ret;
            for (k; k < len; k += 1)
                if (
                    ("object" == typeof options || void 0 === options ? items[k].jarallax || (items[k].jarallax = new Jarallax(items[k], options)) : items[k].jarallax && (ret = items[k].jarallax[options].apply(items[k].jarallax, args)),
                    void 0 !== ret)
                )
                    return ret;
            return items;
        }
        jarallax.constructor = Jarallax;
        const $ = global$1.jQuery;
        if (void 0 !== $) {
            navigator$1 = function (...args) {
                Array.prototype.unshift.call(args, this);
                args = jarallax.apply(global$1, args);
                return "object" != typeof args ? args : this;
            };
            navigator$1.constructor = jarallax.constructor;
            const old$Plugin = $.fn.jarallax;
            ($.fn.jarallax = navigator$1),
                ($.fn.jarallax.noConflict = function () {
                    return ($.fn.jarallax = old$Plugin), this;
                });
        }
        return (
            ready(() => {
                jarallax(document.querySelectorAll("[data-jarallax]"));
            }),
            jarallax
        );
    }),
    "undefined" == typeof jQuery)
)
    throw new Error("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
!(function () {
    var e = jQuery.fn.jquery.split(" ")[0].split(".");
    if ((e[0] < 2 && e[1] < 9) || (1 == e[0] && 9 == e[1] && e[2] < 1) || 4 <= e[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
})(),
    (function () {
        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        var i =
                "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                    ? function (t) {
                          return typeof t;
                      }
                    : function (t) {
                          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                      },
            o = (function () {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var i = e[n];
                        (i.enumerable = i.enumerable || !1), (i.configurable = !0), "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
                    }
                }
                return function (e, n, i) {
                    return n && t(e.prototype, n), i && t(e, i), e;
                };
            })(),
            r = (function (t) {
                function r(e) {
                    var n = this,
                        i = !1;
                    return (
                        t(this).one(c.TRANSITION_END, function () {
                            i = !0;
                        }),
                        setTimeout(function () {
                            i || c.triggerTransitionEnd(n);
                        }, e),
                        this
                    );
                }
                var a = !1,
                    h = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" },
                    c = {
                        TRANSITION_END: "bsTransitionEnd",
                        getUID: function (t) {
                            for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); );
                            return t;
                        },
                        getSelectorFromElement: function (t) {
                            var e = t.getAttribute("data-target");
                            return e || ((e = t.getAttribute("href") || ""), (e = /^#[a-z]/i.test(e) ? e : null)), e;
                        },
                        reflow: function (t) {
                            return t.offsetHeight;
                        },
                        triggerTransitionEnd: function (e) {
                            t(e).trigger(a.end);
                        },
                        supportsTransitionEnd: function () {
                            return Boolean(a);
                        },
                        typeCheckConfig: function (t, i, o) {
                            for (var r in o)
                                if (o.hasOwnProperty(r)) {
                                    var s = o[r],
                                        a = i[r],
                                        a =
                                            a &&
                                            (function (t) {
                                                return (t[0] || t).nodeType;
                                            })(a)
                                                ? "element"
                                                : (function (t) {
                                                      return {}.toString
                                                          .call(t)
                                                          .match(/\s([a-zA-Z]+)/)[1]
                                                          .toLowerCase();
                                                  })(a);
                                    if (!new RegExp(s).test(a)) throw new Error(t.toUpperCase() + ': Option "' + r + '" provided type "' + a + '" but expected type "' + s + '".');
                                }
                        },
                    };
                return (
                    (a = (function () {
                        if (!window.QUnit) {
                            var e,
                                t = document.createElement("bootstrap");
                            for (e in h) if (void 0 !== t.style[e]) return { end: h[e] };
                        }
                        return !1;
                    })()),
                    (t.fn.emulateTransitionEnd = r),
                    c.supportsTransitionEnd() &&
                        (t.event.special[c.TRANSITION_END] = {
                            bindType: a.end,
                            delegateType: a.end,
                            handle: function (e) {
                                if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
                            },
                        }),
                    c
                );
            })(jQuery),
            s =
                ((function (t) {
                    var e = "alert",
                        s = "bs.alert",
                        a = "." + s,
                        h = t.fn[e],
                        d = { CLOSE: "close" + a, CLOSED: "closed" + a, CLICK_DATA_API: "click" + a + ".data-api" },
                        f_ALERT = "alert",
                        f_FADE = "fade",
                        f_SHOW = "show",
                        _ = (function () {
                            function e(t) {
                                n(this, e), (this._element = t);
                            }
                            return (
                                (e.prototype.close = function (t) {
                                    t = t || this._element;
                                    t = this._getRootElement(t);
                                    this._triggerCloseEvent(t).isDefaultPrevented() || this._removeElement(t);
                                }),
                                (e.prototype.dispose = function () {
                                    t.removeData(this._element, s), (this._element = null);
                                }),
                                (e.prototype._getRootElement = function (e) {
                                    var n = r.getSelectorFromElement(e),
                                        i = !1;
                                    return (i = (i = n ? t(n)[0] : i) || t(e).closest("." + f_ALERT)[0]);
                                }),
                                (e.prototype._triggerCloseEvent = function (e) {
                                    var n = t.Event(d.CLOSE);
                                    return t(e).trigger(n), n;
                                }),
                                (e.prototype._removeElement = function (e) {
                                    var n = this;
                                    return (
                                        t(e).removeClass(f_SHOW),
                                        r.supportsTransitionEnd() && t(e).hasClass(f_FADE)
                                            ? void t(e)
                                                  .one(r.TRANSITION_END, function (t) {
                                                      return n._destroyElement(e, t);
                                                  })
                                                  .emulateTransitionEnd(150)
                                            : void this._destroyElement(e)
                                    );
                                }),
                                (e.prototype._destroyElement = function (e) {
                                    t(e).detach().trigger(d.CLOSED).remove();
                                }),
                                (e._jQueryInterface = function (n) {
                                    return this.each(function () {
                                        var i = t(this),
                                            o = i.data(s);
                                        o || ((o = new e(this)), i.data(s, o)), "close" === n && o[n](this);
                                    });
                                }),
                                (e._handleDismiss = function (t) {
                                    return function (e) {
                                        e && e.preventDefault(), t.close(this);
                                    };
                                }),
                                o(e, null, [
                                    {
                                        key: "VERSION",
                                        get: function () {
                                            return "4.0.0-alpha.6";
                                        },
                                    },
                                ]),
                                e
                            );
                        })();
                    t(document).on(d.CLICK_DATA_API, '[data-dismiss="alert"]', _._handleDismiss(new _())),
                        (t.fn[e] = _._jQueryInterface),
                        (t.fn[e].Constructor = _),
                        (t.fn[e].noConflict = function () {
                            return (t.fn[e] = h), _._jQueryInterface;
                        });
                })(jQuery),
                (function (t) {
                    var e = "button",
                        r = "bs.button",
                        s = "." + r,
                        a = ".data-api",
                        l = t.fn[e],
                        h_ACTIVE = "active",
                        h_BUTTON = "btn",
                        h_FOCUS = "focus",
                        c_DATA_TOGGLE_CARROT = '[data-toggle^="button"]',
                        c_DATA_TOGGLE = '[data-toggle="buttons"]',
                        c_INPUT = "input",
                        c_ACTIVE = ".active",
                        c_BUTTON = ".btn",
                        s = { CLICK_DATA_API: "click" + s + a, FOCUS_BLUR_DATA_API: "focus" + s + a + " blur" + s + a },
                        d = (function () {
                            function e(t) {
                                n(this, e), (this._element = t);
                            }
                            return (
                                (e.prototype.toggle = function () {
                                    var i,
                                        e = !0,
                                        n = t(this._element).closest(c_DATA_TOGGLE)[0];
                                    n &&
                                        (i = t(this._element).find(c_INPUT)[0]) &&
                                        ("radio" === i.type && (i.checked && t(this._element).hasClass(h_ACTIVE) ? (e = !1) : (n = t(n).find(c_ACTIVE)[0]) && t(n).removeClass(h_ACTIVE)),
                                        e && ((i.checked = !t(this._element).hasClass(h_ACTIVE)), t(i).trigger("change")),
                                        i.focus()),
                                        this._element.setAttribute("aria-pressed", !t(this._element).hasClass(h_ACTIVE)),
                                        e && t(this._element).toggleClass(h_ACTIVE);
                                }),
                                (e.prototype.dispose = function () {
                                    t.removeData(this._element, r), (this._element = null);
                                }),
                                (e._jQueryInterface = function (n) {
                                    return this.each(function () {
                                        var i = t(this).data(r);
                                        i || ((i = new e(this)), t(this).data(r, i)), "toggle" === n && i[n]();
                                    });
                                }),
                                o(e, null, [
                                    {
                                        key: "VERSION",
                                        get: function () {
                                            return "4.0.0-alpha.6";
                                        },
                                    },
                                ]),
                                e
                            );
                        })();
                    t(document)
                        .on(s.CLICK_DATA_API, c_DATA_TOGGLE_CARROT, function (e) {
                            e.preventDefault();
                            e = e.target;
                            t(e).hasClass(h_BUTTON) || (e = t(e).closest(c_BUTTON)), d._jQueryInterface.call(t(e), "toggle");
                        })
                        .on(s.FOCUS_BLUR_DATA_API, c_DATA_TOGGLE_CARROT, function (e) {
                            var n = t(e.target).closest(c_BUTTON)[0];
                            t(n).toggleClass(h_FOCUS, /^focus(in)?$/.test(e.type));
                        }),
                        (t.fn[e] = d._jQueryInterface),
                        (t.fn[e].Constructor = d),
                        (t.fn[e].noConflict = function () {
                            return (t.fn[e] = l), d._jQueryInterface;
                        });
                })(jQuery),
                (function (t) {
                    var e = "carousel",
                        a = "bs.carousel",
                        l = "." + a,
                        h = ".data-api",
                        c = t.fn[e],
                        _ = { interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0 },
                        g = { interval: "(number|boolean)", keyboard: "boolean", slide: "(boolean|string)", pause: "(string|boolean)", wrap: "boolean" },
                        p = { NEXT: "next", PREV: "prev", LEFT: "left", RIGHT: "right" },
                        m = { SLIDE: "slide" + l, SLID: "slid" + l, KEYDOWN: "keydown" + l, MOUSEENTER: "mouseenter" + l, MOUSELEAVE: "mouseleave" + l, LOAD_DATA_API: "load" + l + h, CLICK_DATA_API: "click" + l + h },
                        E_CAROUSEL = "carousel",
                        E_ACTIVE = "active",
                        E_SLIDE = "slide",
                        E_RIGHT = "carousel-item-right",
                        E_LEFT = "carousel-item-left",
                        E_NEXT = "carousel-item-next",
                        E_PREV = "carousel-item-prev",
                        v_ACTIVE = ".active",
                        v_ACTIVE_ITEM = ".active.carousel-item",
                        v_ITEM = ".carousel-item",
                        v_NEXT_PREV = ".carousel-item-next, .carousel-item-prev",
                        v_INDICATORS = ".carousel-indicators",
                        h = "[data-slide], [data-slide-to]",
                        v_DATA_RIDE = '[data-ride="carousel"]',
                        T = (function () {
                            function h(e, i) {
                                n(this, h),
                                    (this._items = null),
                                    (this._interval = null),
                                    (this._activeElement = null),
                                    (this._isPaused = !1),
                                    (this._isSliding = !1),
                                    (this._config = this._getConfig(i)),
                                    (this._element = t(e)[0]),
                                    (this._indicatorsElement = t(this._element).find(v_INDICATORS)[0]),
                                    this._addEventListeners();
                            }
                            return (
                                (h.prototype.next = function () {
                                    if (this._isSliding) throw new Error("Carousel is sliding");
                                    this._slide(p.NEXT);
                                }),
                                (h.prototype.nextWhenVisible = function () {
                                    document.hidden || this.next();
                                }),
                                (h.prototype.prev = function () {
                                    if (this._isSliding) throw new Error("Carousel is sliding");
                                    this._slide(p.PREVIOUS);
                                }),
                                (h.prototype.pause = function (e) {
                                    e || (this._isPaused = !0),
                                        t(this._element).find(v_NEXT_PREV)[0] && r.supportsTransitionEnd() && (r.triggerTransitionEnd(this._element), this.cycle(!0)),
                                        clearInterval(this._interval),
                                        (this._interval = null);
                                }),
                                (h.prototype.cycle = function (t) {
                                    t || (this._isPaused = !1),
                                        this._interval && (clearInterval(this._interval), (this._interval = null)),
                                        this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
                                }),
                                (h.prototype.to = function (e) {
                                    var n = this,
                                        i = ((this._activeElement = t(this._element).find(v_ACTIVE_ITEM)[0]), this._getItemIndex(this._activeElement));
                                    e > this._items.length - 1 ||
                                        e < 0 ||
                                        (this._isSliding
                                            ? t(this._element).one(m.SLID, function () {
                                                  return n.to(e);
                                              })
                                            : i === e
                                            ? (this.pause(), this.cycle())
                                            : this._slide(i < e ? p.NEXT : p.PREVIOUS, this._items[e]));
                                }),
                                (h.prototype.dispose = function () {
                                    t(this._element).off(l),
                                        t.removeData(this._element, a),
                                        (this._items = null),
                                        (this._config = null),
                                        (this._element = null),
                                        (this._interval = null),
                                        (this._isPaused = null),
                                        (this._isSliding = null),
                                        (this._activeElement = null),
                                        (this._indicatorsElement = null);
                                }),
                                (h.prototype._getConfig = function (n) {
                                    return (n = t.extend({}, _, n)), r.typeCheckConfig(e, n, g), n;
                                }),
                                (h.prototype._addEventListeners = function () {
                                    var e = this;
                                    this._config.keyboard &&
                                        t(this._element).on(m.KEYDOWN, function (t) {
                                            return e._keydown(t);
                                        }),
                                        "hover" !== this._config.pause ||
                                            "ontouchstart" in document.documentElement ||
                                            t(this._element)
                                                .on(m.MOUSEENTER, function (t) {
                                                    return e.pause(t);
                                                })
                                                .on(m.MOUSELEAVE, function (t) {
                                                    return e.cycle(t);
                                                });
                                }),
                                (h.prototype._keydown = function (t) {
                                    if (!/input|textarea/i.test(t.target.tagName))
                                        switch (t.which) {
                                            case 37:
                                                t.preventDefault(), this.prev();
                                                break;
                                            case 39:
                                                t.preventDefault(), this.next();
                                                break;
                                            default:
                                                return;
                                        }
                                }),
                                (h.prototype._getItemIndex = function (e) {
                                    return (this._items = t.makeArray(t(e).parent().find(v_ITEM))), this._items.indexOf(e);
                                }),
                                (h.prototype._getItemByDirection = function (t, e) {
                                    var n = t === p.NEXT,
                                        i = t === p.PREVIOUS,
                                        o = this._getItemIndex(e),
                                        r = this._items.length - 1;
                                    return ((i && 0 === o) || (n && o === r)) && !this._config.wrap ? e : -1 == (i = (o + (t === p.PREVIOUS ? -1 : 1)) % this._items.length) ? this._items[this._items.length - 1] : this._items[i];
                                }),
                                (h.prototype._triggerSlideEvent = function (e, n) {
                                    e = t.Event(m.SLIDE, { relatedTarget: e, direction: n });
                                    return t(this._element).trigger(e), e;
                                }),
                                (h.prototype._setActiveIndicatorElement = function (e) {
                                    this._indicatorsElement && (t(this._indicatorsElement).find(v_ACTIVE).removeClass(E_ACTIVE), (e = this._indicatorsElement.children[this._getItemIndex(e)])) && t(e).addClass(E_ACTIVE);
                                }),
                                (h.prototype._slide = function (e, n) {
                                    var f,
                                        i = this,
                                        o = t(this._element).find(v_ACTIVE_ITEM)[0],
                                        s = n || (o && this._getItemByDirection(e, o)),
                                        n = Boolean(this._interval),
                                        l = void 0,
                                        h = void 0,
                                        c = void 0;
                                    (c = e === p.NEXT ? ((l = E_LEFT), (h = E_NEXT), p.LEFT) : ((l = E_RIGHT), (h = E_PREV), p.RIGHT)),
                                        s && t(s).hasClass(E_ACTIVE)
                                            ? (this._isSliding = !1)
                                            : !this._triggerSlideEvent(s, c).isDefaultPrevented() &&
                                              o &&
                                              s &&
                                              ((this._isSliding = !0),
                                              n && this.pause(),
                                              this._setActiveIndicatorElement(s),
                                              (f = t.Event(m.SLID, { relatedTarget: s, direction: c })),
                                              r.supportsTransitionEnd() && t(this._element).hasClass(E_SLIDE)
                                                  ? (t(s).addClass(h),
                                                    r.reflow(s),
                                                    t(o).addClass(l),
                                                    t(s).addClass(l),
                                                    t(o)
                                                        .one(r.TRANSITION_END, function () {
                                                            t(s)
                                                                .removeClass(l + " " + h)
                                                                .addClass(E_ACTIVE),
                                                                t(o).removeClass(E_ACTIVE + " " + h + " " + l),
                                                                (i._isSliding = !1),
                                                                setTimeout(function () {
                                                                    return t(i._element).trigger(f);
                                                                }, 0);
                                                        })
                                                        .emulateTransitionEnd(600))
                                                  : (t(o).removeClass(E_ACTIVE), t(s).addClass(E_ACTIVE), (this._isSliding = !1), t(this._element).trigger(f)),
                                              n) &&
                                              this.cycle();
                                }),
                                (h._jQueryInterface = function (e) {
                                    return this.each(function () {
                                        var n = t(this).data(a),
                                            o = t.extend({}, _, t(this).data()),
                                            r = ("object" === (void 0 === e ? "undefined" : i(e)) && t.extend(o, e), "string" == typeof e ? e : o.slide);
                                        if ((n || ((n = new h(this, o)), t(this).data(a, n)), "number" == typeof e)) n.to(e);
                                        else if ("string" == typeof r) {
                                            if (void 0 === n[r]) throw new Error('No method named "' + r + '"');
                                            n[r]();
                                        } else o.interval && (n.pause(), n.cycle());
                                    });
                                }),
                                (h._dataApiClickHandler = function (e) {
                                    var o,
                                        s,
                                        n = r.getSelectorFromElement(this);
                                    n &&
                                        (n = t(n)[0]) &&
                                        t(n).hasClass(E_CAROUSEL) &&
                                        ((o = t.extend({}, t(n).data(), t(this).data())), (s = this.getAttribute("data-slide-to")) && (o.interval = !1), h._jQueryInterface.call(t(n), o), s && t(n).data(a).to(s), e.preventDefault());
                                }),
                                o(h, null, [
                                    {
                                        key: "VERSION",
                                        get: function () {
                                            return "4.0.0-alpha.6";
                                        },
                                    },
                                    {
                                        key: "Default",
                                        get: function () {
                                            return _;
                                        },
                                    },
                                ]),
                                h
                            );
                        })();
                    t(document).on(m.CLICK_DATA_API, h, T._dataApiClickHandler),
                        t(window).on(m.LOAD_DATA_API, function () {
                            t(v_DATA_RIDE).each(function () {
                                var e = t(this);
                                T._jQueryInterface.call(e, e.data());
                            });
                        }),
                        (t.fn[e] = T._jQueryInterface),
                        (t.fn[e].Constructor = T),
                        (t.fn[e].noConflict = function () {
                            return (t.fn[e] = c), T._jQueryInterface;
                        });
                })(jQuery),
                (function (t) {
                    var e = "collapse",
                        a = "bs.collapse",
                        l = "." + a,
                        c = t.fn[e],
                        d = { toggle: !0, parent: "" },
                        f = { toggle: "boolean", parent: "string" },
                        _ = { SHOW: "show" + l, SHOWN: "shown" + l, HIDE: "hide" + l, HIDDEN: "hidden" + l, CLICK_DATA_API: "click" + l + ".data-api" },
                        g_SHOW = "show",
                        g_COLLAPSE = "collapse",
                        g_COLLAPSING = "collapsing",
                        g_COLLAPSED = "collapsed",
                        p_WIDTH = "width",
                        p_HEIGHT = "height",
                        m_ACTIVES = ".card > .show, .card > .collapsing",
                        l = '[data-toggle="collapse"]',
                        E = (function () {
                            function l(e, i) {
                                n(this, l),
                                    (this._isTransitioning = !1),
                                    (this._element = e),
                                    (this._config = this._getConfig(i)),
                                    (this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'))),
                                    (this._parent = this._config.parent ? this._getParent() : null),
                                    this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray),
                                    this._config.toggle && this.toggle();
                            }
                            return (
                                (l.prototype.toggle = function () {
                                    t(this._element).hasClass(g_SHOW) ? this.hide() : this.show();
                                }),
                                (l.prototype.show = function () {
                                    var n,
                                        s,
                                        o,
                                        i,
                                        e = this;
                                    if (this._isTransitioning) throw new Error("Collapse is transitioning");
                                    t(this._element).hasClass(g_SHOW) ||
                                        ((i = n = void 0), (n = this._parent && !(n = t.makeArray(t(this._parent).find(m_ACTIVES))).length ? null : n) && (i = t(n).data(a)) && i._isTransitioning) ||
                                        ((o = t.Event(_.SHOW)), t(this._element).trigger(o), o.isDefaultPrevented()) ||
                                        (n && (l._jQueryInterface.call(t(n), "hide"), i || t(n).data(a, null)),
                                        (s = this._getDimension()),
                                        t(this._element).removeClass(g_COLLAPSE).addClass(g_COLLAPSING),
                                        (this._element.style[s] = 0),
                                        this._element.setAttribute("aria-expanded", !0),
                                        this._triggerArray.length && t(this._triggerArray).removeClass(g_COLLAPSED).attr("aria-expanded", !0),
                                        this.setTransitioning(!0),
                                        (o = function () {
                                            t(e._element).removeClass(g_COLLAPSING).addClass(g_COLLAPSE).addClass(g_SHOW), (e._element.style[s] = ""), e.setTransitioning(!1), t(e._element).trigger(_.SHOWN);
                                        }),
                                        r.supportsTransitionEnd()
                                            ? ((i = "scroll" + (s[0].toUpperCase() + s.slice(1))), t(this._element).one(r.TRANSITION_END, o).emulateTransitionEnd(600), (this._element.style[s] = this._element[i] + "px"))
                                            : o());
                                }),
                                (l.prototype.hide = function () {
                                    var e = this;
                                    if (this._isTransitioning) throw new Error("Collapse is transitioning");
                                    if (t(this._element).hasClass(g_SHOW)) {
                                        var o,
                                            n = t.Event(_.HIDE);
                                        if ((t(this._element).trigger(n), !n.isDefaultPrevented()))
                                            return (
                                                (o = (n = this._getDimension()) === p_WIDTH ? "offsetWidth" : "offsetHeight"),
                                                (this._element.style[n] = this._element[o] + "px"),
                                                r.reflow(this._element),
                                                t(this._element).addClass(g_COLLAPSING).removeClass(g_COLLAPSE).removeClass(g_SHOW),
                                                this._element.setAttribute("aria-expanded", !1),
                                                this._triggerArray.length && t(this._triggerArray).addClass(g_COLLAPSED).attr("aria-expanded", !1),
                                                this.setTransitioning(!0),
                                                (o = function () {
                                                    e.setTransitioning(!1), t(e._element).removeClass(g_COLLAPSING).addClass(g_COLLAPSE).trigger(_.HIDDEN);
                                                }),
                                                (this._element.style[n] = ""),
                                                r.supportsTransitionEnd() ? void t(this._element).one(r.TRANSITION_END, o).emulateTransitionEnd(600) : void o()
                                            );
                                    }
                                }),
                                (l.prototype.setTransitioning = function (t) {
                                    this._isTransitioning = t;
                                }),
                                (l.prototype.dispose = function () {
                                    t.removeData(this._element, a), (this._config = null), (this._parent = null), (this._element = null), (this._triggerArray = null), (this._isTransitioning = null);
                                }),
                                (l.prototype._getConfig = function (n) {
                                    return ((n = t.extend({}, d, n)).toggle = Boolean(n.toggle)), r.typeCheckConfig(e, n, f), n;
                                }),
                                (l.prototype._getDimension = function () {
                                    return t(this._element).hasClass(p_WIDTH) ? p_WIDTH : p_HEIGHT;
                                }),
                                (l.prototype._getParent = function () {
                                    var e = this,
                                        n = t(this._config.parent)[0],
                                        i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                                    return (
                                        t(n)
                                            .find(i)
                                            .each(function (t, n) {
                                                e._addAriaAndCollapsedClass(l._getTargetFromElement(n), [n]);
                                            }),
                                        n
                                    );
                                }),
                                (l.prototype._addAriaAndCollapsedClass = function (e, n) {
                                    var i;
                                    e && ((i = t(e).hasClass(g_SHOW)), e.setAttribute("aria-expanded", i), n.length) && t(n).toggleClass(g_COLLAPSED, !i).attr("aria-expanded", i);
                                }),
                                (l._getTargetFromElement = function (e) {
                                    e = r.getSelectorFromElement(e);
                                    return e ? t(e)[0] : null;
                                }),
                                (l._jQueryInterface = function (e) {
                                    return this.each(function () {
                                        var n = t(this),
                                            o = n.data(a),
                                            r = t.extend({}, d, n.data(), "object" === (void 0 === e ? "undefined" : i(e)) && e);
                                        if ((!o && r.toggle && /show|hide/.test(e) && (r.toggle = !1), o || ((o = new l(this, r)), n.data(a, o)), "string" == typeof e)) {
                                            if (void 0 === o[e]) throw new Error('No method named "' + e + '"');
                                            o[e]();
                                        }
                                    });
                                }),
                                o(l, null, [
                                    {
                                        key: "VERSION",
                                        get: function () {
                                            return "4.0.0-alpha.6";
                                        },
                                    },
                                    {
                                        key: "Default",
                                        get: function () {
                                            return d;
                                        },
                                    },
                                ]),
                                l
                            );
                        })();
                    t(document).on(_.CLICK_DATA_API, l, function (e) {
                        e.preventDefault();
                        var e = E._getTargetFromElement(this),
                            o = t(e).data(a) ? "toggle" : t(this).data();
                        E._jQueryInterface.call(t(e), o);
                    }),
                        (t.fn[e] = E._jQueryInterface),
                        (t.fn[e].Constructor = E),
                        (t.fn[e].noConflict = function () {
                            return (t.fn[e] = c), E._jQueryInterface;
                        });
                })(jQuery),
                (function (t) {
                    var e = "dropdown",
                        s = "bs.dropdown",
                        a = "." + s,
                        l = ".data-api",
                        h = t.fn[e],
                        _ = { HIDE: "hide" + a, HIDDEN: "hidden" + a, SHOW: "show" + a, SHOWN: "shown" + a, CLICK: "click" + a, CLICK_DATA_API: "click" + a + l, FOCUSIN_DATA_API: "focusin" + a + l, KEYDOWN_DATA_API: "keydown" + a + l },
                        g_BACKDROP = "dropdown-backdrop",
                        g_DISABLED = "disabled",
                        g_SHOW = "show",
                        p_BACKDROP = ".dropdown-backdrop",
                        p_DATA_TOGGLE = '[data-toggle="dropdown"]',
                        l = ".dropdown form",
                        p_ROLE_MENU = '[role="menu"]',
                        p_ROLE_LISTBOX = '[role="listbox"]',
                        p_NAVBAR_NAV = ".navbar-nav",
                        p_VISIBLE_ITEMS = '[role="menu"] li:not(.disabled) a, [role="listbox"] li:not(.disabled) a',
                        m = (function () {
                            function e(t) {
                                n(this, e), (this._element = t), this._addEventListeners();
                            }
                            return (
                                (e.prototype.toggle = function () {
                                    if (this.disabled || t(this).hasClass(g_DISABLED)) return !1;
                                    var n = e._getParentFromElement(this),
                                        i = t(n).hasClass(g_SHOW);
                                    if ((e._clearMenus(), i)) return !1;
                                    "ontouchstart" in document.documentElement &&
                                        !t(n).closest(p_NAVBAR_NAV).length &&
                                        (((i = document.createElement("div")).className = g_BACKDROP), t(i).insertBefore(this), t(i).on("click", e._clearMenus));
                                    var i = { relatedTarget: this },
                                        s = t.Event(_.SHOW, i);
                                    return t(n).trigger(s), !s.isDefaultPrevented() && (this.focus(), this.setAttribute("aria-expanded", !0), t(n).toggleClass(g_SHOW), t(n).trigger(t.Event(_.SHOWN, i)), !1);
                                }),
                                (e.prototype.dispose = function () {
                                    t.removeData(this._element, s), t(this._element).off(a), (this._element = null);
                                }),
                                (e.prototype._addEventListeners = function () {
                                    t(this._element).on(_.CLICK, this.toggle);
                                }),
                                (e._jQueryInterface = function (n) {
                                    return this.each(function () {
                                        var i = t(this).data(s);
                                        if ((i || ((i = new e(this)), t(this).data(s, i)), "string" == typeof n)) {
                                            if (void 0 === i[n]) throw new Error('No method named "' + n + '"');
                                            i[n].call(this);
                                        }
                                    });
                                }),
                                (e._clearMenus = function (n) {
                                    if (!n || 3 !== n.which) {
                                        var i = t(p_BACKDROP)[0];
                                        i && i.parentNode.removeChild(i);
                                        for (var o = t.makeArray(t(p_DATA_TOGGLE)), r = 0; r < o.length; r++) {
                                            var l,
                                                s = e._getParentFromElement(o[r]),
                                                a = { relatedTarget: o[r] };
                                            !t(s).hasClass(g_SHOW) ||
                                                (n && (("click" === n.type && /input|textarea/i.test(n.target.tagName)) || "focusin" === n.type) && t.contains(s, n.target)) ||
                                                ((l = t.Event(_.HIDE, a)), t(s).trigger(l), l.isDefaultPrevented()) ||
                                                (o[r].setAttribute("aria-expanded", "false"), t(s).removeClass(g_SHOW).trigger(t.Event(_.HIDDEN, a)));
                                        }
                                    }
                                }),
                                (e._getParentFromElement = function (e) {
                                    var n = void 0,
                                        i = r.getSelectorFromElement(e);
                                    return (n = i ? t(i)[0] : n) || e.parentNode;
                                }),
                                (e._dataApiKeydownHandler = function (n) {
                                    var o, i;
                                    !/(38|40|27|32)/.test(n.which) ||
                                        /input|textarea/i.test(n.target.tagName) ||
                                        (n.preventDefault(), n.stopPropagation(), this.disabled) ||
                                        t(this).hasClass(g_DISABLED) ||
                                        ((i = e._getParentFromElement(this)),
                                        (!(o = t(i).hasClass(g_SHOW)) && 27 !== n.which) || (o && 27 === n.which)
                                            ? (27 === n.which && ((o = t(i).find(p_DATA_TOGGLE)[0]), t(o).trigger("focus")), t(this).trigger("click"))
                                            : (o = t(i).find(p_VISIBLE_ITEMS).get()).length && ((i = o.indexOf(n.target)), 38 === n.which && 0 < i && i--, 40 === n.which && i < o.length - 1 && i++, o[(i = i < 0 ? 0 : i)].focus()));
                                }),
                                o(e, null, [
                                    {
                                        key: "VERSION",
                                        get: function () {
                                            return "4.0.0-alpha.6";
                                        },
                                    },
                                ]),
                                e
                            );
                        })();
                    t(document)
                        .on(_.KEYDOWN_DATA_API, p_DATA_TOGGLE, m._dataApiKeydownHandler)
                        .on(_.KEYDOWN_DATA_API, p_ROLE_MENU, m._dataApiKeydownHandler)
                        .on(_.KEYDOWN_DATA_API, p_ROLE_LISTBOX, m._dataApiKeydownHandler)
                        .on(_.CLICK_DATA_API + " " + _.FOCUSIN_DATA_API, m._clearMenus)
                        .on(_.CLICK_DATA_API, p_DATA_TOGGLE, m.prototype.toggle)
                        .on(_.CLICK_DATA_API, l, function (t) {
                            t.stopPropagation();
                        }),
                        (t.fn[e] = m._jQueryInterface),
                        (t.fn[e].Constructor = m),
                        (t.fn[e].noConflict = function () {
                            return (t.fn[e] = h), m._jQueryInterface;
                        });
                })(jQuery),
                (function (t) {
                    var e = "modal",
                        a = "bs.modal",
                        l = "." + a,
                        c = t.fn[e],
                        _ = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
                        g = { backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean" },
                        p = {
                            HIDE: "hide" + l,
                            HIDDEN: "hidden" + l,
                            SHOW: "show" + l,
                            SHOWN: "shown" + l,
                            FOCUSIN: "focusin" + l,
                            RESIZE: "resize" + l,
                            CLICK_DISMISS: "click.dismiss" + l,
                            KEYDOWN_DISMISS: "keydown.dismiss" + l,
                            MOUSEUP_DISMISS: "mouseup.dismiss" + l,
                            MOUSEDOWN_DISMISS: "mousedown.dismiss" + l,
                            CLICK_DATA_API: "click" + l + ".data-api",
                        },
                        m_SCROLLBAR_MEASURER = "modal-scrollbar-measure",
                        m_BACKDROP = "modal-backdrop",
                        m_OPEN = "modal-open",
                        m_FADE = "fade",
                        m_SHOW = "show",
                        E_DIALOG = ".modal-dialog",
                        E_DATA_TOGGLE = '[data-toggle="modal"]',
                        E_DATA_DISMISS = '[data-dismiss="modal"]',
                        E_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                        v = (function () {
                            function h(e, i) {
                                n(this, h),
                                    (this._config = this._getConfig(i)),
                                    (this._element = e),
                                    (this._dialog = t(e).find(E_DIALOG)[0]),
                                    (this._backdrop = null),
                                    (this._isShown = !1),
                                    (this._isBodyOverflowing = !1),
                                    (this._ignoreBackdropClick = !1),
                                    (this._isTransitioning = !1),
                                    (this._originalBodyPadding = 0),
                                    (this._scrollbarWidth = 0);
                            }
                            return (
                                (h.prototype.toggle = function (t) {
                                    return this._isShown ? this.hide() : this.show(t);
                                }),
                                (h.prototype.show = function (e) {
                                    var n = this;
                                    if (this._isTransitioning) throw new Error("Modal is transitioning");
                                    r.supportsTransitionEnd() && t(this._element).hasClass(m_FADE) && (this._isTransitioning = !0);
                                    var i = t.Event(p.SHOW, { relatedTarget: e });
                                    t(this._element).trigger(i),
                                        this._isShown ||
                                            i.isDefaultPrevented() ||
                                            ((this._isShown = !0),
                                            this._checkScrollbar(),
                                            this._setScrollbar(),
                                            t(document.body).addClass(m_OPEN),
                                            this._setEscapeEvent(),
                                            this._setResizeEvent(),
                                            t(this._element).on(p.CLICK_DISMISS, E_DATA_DISMISS, function (t) {
                                                return n.hide(t);
                                            }),
                                            t(this._dialog).on(p.MOUSEDOWN_DISMISS, function () {
                                                t(n._element).one(p.MOUSEUP_DISMISS, function (e) {
                                                    t(e.target).is(n._element) && (n._ignoreBackdropClick = !0);
                                                });
                                            }),
                                            this._showBackdrop(function () {
                                                return n._showElement(e);
                                            }));
                                }),
                                (h.prototype.hide = function (e) {
                                    var n = this;
                                    if ((e && e.preventDefault(), this._isTransitioning)) throw new Error("Modal is transitioning");
                                    var e = r.supportsTransitionEnd() && t(this._element).hasClass(m_FADE),
                                        o = (e && (this._isTransitioning = !0), t.Event(p.HIDE));
                                    t(this._element).trigger(o),
                                        this._isShown &&
                                            !o.isDefaultPrevented() &&
                                            ((this._isShown = !1),
                                            this._setEscapeEvent(),
                                            this._setResizeEvent(),
                                            t(document).off(p.FOCUSIN),
                                            t(this._element).removeClass(m_SHOW),
                                            t(this._element).off(p.CLICK_DISMISS),
                                            t(this._dialog).off(p.MOUSEDOWN_DISMISS),
                                            e
                                                ? t(this._element)
                                                      .one(r.TRANSITION_END, function (t) {
                                                          return n._hideModal(t);
                                                      })
                                                      .emulateTransitionEnd(300)
                                                : this._hideModal());
                                }),
                                (h.prototype.dispose = function () {
                                    t.removeData(this._element, a),
                                        t(window, document, this._element, this._backdrop).off(l),
                                        (this._config = null),
                                        (this._element = null),
                                        (this._dialog = null),
                                        (this._backdrop = null),
                                        (this._isShown = null),
                                        (this._isBodyOverflowing = null),
                                        (this._ignoreBackdropClick = null),
                                        (this._originalBodyPadding = null),
                                        (this._scrollbarWidth = null);
                                }),
                                (h.prototype._getConfig = function (n) {
                                    return (n = t.extend({}, _, n)), r.typeCheckConfig(e, n, g), n;
                                }),
                                (h.prototype._showElement = function (e) {
                                    function s() {
                                        n._config.focus && n._element.focus(), (n._isTransitioning = !1), t(n._element).trigger(o);
                                    }
                                    var n = this,
                                        i = r.supportsTransitionEnd() && t(this._element).hasClass(m_FADE),
                                        o =
                                            ((this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE) || document.body.appendChild(this._element),
                                            (this._element.style.display = "block"),
                                            this._element.removeAttribute("aria-hidden"),
                                            (this._element.scrollTop = 0),
                                            i && r.reflow(this._element),
                                            t(this._element).addClass(m_SHOW),
                                            this._config.focus && this._enforceFocus(),
                                            t.Event(p.SHOWN, { relatedTarget: e }));
                                    i ? t(this._dialog).one(r.TRANSITION_END, s).emulateTransitionEnd(300) : s();
                                }),
                                (h.prototype._enforceFocus = function () {
                                    var e = this;
                                    t(document)
                                        .off(p.FOCUSIN)
                                        .on(p.FOCUSIN, function (n) {
                                            document === n.target || e._element === n.target || t(e._element).has(n.target).length || e._element.focus();
                                        });
                                }),
                                (h.prototype._setEscapeEvent = function () {
                                    var e = this;
                                    this._isShown && this._config.keyboard
                                        ? t(this._element).on(p.KEYDOWN_DISMISS, function (t) {
                                              27 === t.which && e.hide();
                                          })
                                        : this._isShown || t(this._element).off(p.KEYDOWN_DISMISS);
                                }),
                                (h.prototype._setResizeEvent = function () {
                                    var e = this;
                                    this._isShown
                                        ? t(window).on(p.RESIZE, function (t) {
                                              return e._handleUpdate(t);
                                          })
                                        : t(window).off(p.RESIZE);
                                }),
                                (h.prototype._hideModal = function () {
                                    var e = this;
                                    (this._element.style.display = "none"),
                                        this._element.setAttribute("aria-hidden", "true"),
                                        (this._isTransitioning = !1),
                                        this._showBackdrop(function () {
                                            t(document.body).removeClass(m_OPEN), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(p.HIDDEN);
                                        });
                                }),
                                (h.prototype._removeBackdrop = function () {
                                    this._backdrop && (t(this._backdrop).remove(), (this._backdrop = null));
                                }),
                                (h.prototype._showBackdrop = function (e) {
                                    var o,
                                        n = this,
                                        i = t(this._element).hasClass(m_FADE) ? m_FADE : "";
                                    this._isShown && this._config.backdrop
                                        ? ((o = r.supportsTransitionEnd() && i),
                                          (this._backdrop = document.createElement("div")),
                                          (this._backdrop.className = m_BACKDROP),
                                          i && t(this._backdrop).addClass(i),
                                          t(this._backdrop).appendTo(document.body),
                                          t(this._element).on(p.CLICK_DISMISS, function (t) {
                                              return n._ignoreBackdropClick ? void (n._ignoreBackdropClick = !1) : void (t.target === t.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide()));
                                          }),
                                          o && r.reflow(this._backdrop),
                                          t(this._backdrop).addClass(m_SHOW),
                                          e && (o ? t(this._backdrop).one(r.TRANSITION_END, e).emulateTransitionEnd(150) : e()))
                                        : !this._isShown && this._backdrop
                                        ? (t(this._backdrop).removeClass(m_SHOW),
                                          (i = function () {
                                              n._removeBackdrop(), e && e();
                                          }),
                                          r.supportsTransitionEnd() && t(this._element).hasClass(m_FADE) ? t(this._backdrop).one(r.TRANSITION_END, i).emulateTransitionEnd(150) : i())
                                        : e && e();
                                }),
                                (h.prototype._handleUpdate = function () {
                                    this._adjustDialog();
                                }),
                                (h.prototype._adjustDialog = function () {
                                    var t = this._element.scrollHeight > document.documentElement.clientHeight;
                                    !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px");
                                }),
                                (h.prototype._resetAdjustments = function () {
                                    (this._element.style.paddingLeft = ""), (this._element.style.paddingRight = "");
                                }),
                                (h.prototype._checkScrollbar = function () {
                                    (this._isBodyOverflowing = document.body.clientWidth < window.innerWidth), (this._scrollbarWidth = this._getScrollbarWidth());
                                }),
                                (h.prototype._setScrollbar = function () {
                                    var e = parseInt(t(E_FIXED_CONTENT).css("padding-right") || 0, 10);
                                    (this._originalBodyPadding = document.body.style.paddingRight || ""), this._isBodyOverflowing && (document.body.style.paddingRight = e + this._scrollbarWidth + "px");
                                }),
                                (h.prototype._resetScrollbar = function () {
                                    document.body.style.paddingRight = this._originalBodyPadding;
                                }),
                                (h.prototype._getScrollbarWidth = function () {
                                    var t = document.createElement("div"),
                                        e = ((t.className = m_SCROLLBAR_MEASURER), document.body.appendChild(t), t.offsetWidth - t.clientWidth);
                                    return document.body.removeChild(t), e;
                                }),
                                (h._jQueryInterface = function (e, n) {
                                    return this.each(function () {
                                        var o = t(this).data(a),
                                            r = t.extend({}, h.Default, t(this).data(), "object" === (void 0 === e ? "undefined" : i(e)) && e);
                                        if ((o || ((o = new h(this, r)), t(this).data(a, o)), "string" == typeof e)) {
                                            if (void 0 === o[e]) throw new Error('No method named "' + e + '"');
                                            o[e](n);
                                        } else r.show && o.show(n);
                                    });
                                }),
                                o(h, null, [
                                    {
                                        key: "VERSION",
                                        get: function () {
                                            return "4.0.0-alpha.6";
                                        },
                                    },
                                    {
                                        key: "Default",
                                        get: function () {
                                            return _;
                                        },
                                    },
                                ]),
                                h
                            );
                        })();
                    t(document).on(p.CLICK_DATA_API, E_DATA_TOGGLE, function (e) {
                        var n = this,
                            i = void 0,
                            o = r.getSelectorFromElement(this),
                            o = (o && (i = t(o)[0]), t(i).data(a) ? "toggle" : t.extend({}, t(i).data(), t(this).data())),
                            l =
                                (("A" !== this.tagName && "AREA" !== this.tagName) || e.preventDefault(),
                                t(i).one(p.SHOW, function (e) {
                                    e.isDefaultPrevented() ||
                                        l.one(p.HIDDEN, function () {
                                            t(n).is(":visible") && n.focus();
                                        });
                                }));
                        v._jQueryInterface.call(t(i), o, this);
                    }),
                        (t.fn[e] = v._jQueryInterface),
                        (t.fn[e].Constructor = v),
                        (t.fn[e].noConflict = function () {
                            return (t.fn[e] = c), v._jQueryInterface;
                        });
                })(jQuery),
                (function (t) {
                    var e = "scrollspy",
                        a = "bs.scrollspy",
                        l = "." + a,
                        c = t.fn[e],
                        u = { offset: 10, method: "auto", target: "" },
                        d = { offset: "number", method: "string", target: "(string|element)" },
                        f = { ACTIVATE: "activate" + l, SCROLL: "scroll" + l, LOAD_DATA_API: "load" + l + ".data-api" },
                        __DROPDOWN_ITEM = "dropdown-item",
                        __ACTIVE = "active",
                        g_DATA_SPY = '[data-spy="scroll"]',
                        g_ACTIVE = ".active",
                        g_LI = "li",
                        g_NAV_LINKS = ".nav-link",
                        g_DROPDOWN = ".dropdown",
                        g_DROPDOWN_ITEMS = ".dropdown-item",
                        g_DROPDOWN_TOGGLE = ".dropdown-toggle",
                        p_OFFSET = "offset",
                        p_POSITION = "position",
                        m = (function () {
                            function h(e, i) {
                                var o = this;
                                n(this, h),
                                    (this._element = e),
                                    (this._scrollElement = "BODY" === e.tagName ? window : e),
                                    (this._config = this._getConfig(i)),
                                    (this._selector = this._config.target + " " + g_NAV_LINKS + "," + this._config.target + " " + g_DROPDOWN_ITEMS),
                                    (this._offsets = []),
                                    (this._targets = []),
                                    (this._activeTarget = null),
                                    (this._scrollHeight = 0),
                                    t(this._scrollElement).on(f.SCROLL, function (t) {
                                        return o._process(t);
                                    }),
                                    this.refresh(),
                                    this._process();
                            }
                            return (
                                (h.prototype.refresh = function () {
                                    var e = this,
                                        n = this._scrollElement !== this._scrollElement.window ? p_POSITION : p_OFFSET,
                                        i = "auto" === this._config.method ? n : this._config.method,
                                        o = i === p_POSITION ? this._getScrollTop() : 0;
                                    (this._offsets = []),
                                        (this._targets = []),
                                        (this._scrollHeight = this._getScrollHeight()),
                                        t
                                            .makeArray(t(this._selector))
                                            .map(function (e) {
                                                var n = void 0,
                                                    e = r.getSelectorFromElement(e);
                                                return (n = e ? t(e)[0] : n) && (n.offsetWidth || n.offsetHeight) ? [t(n)[i]().top + o, e] : null;
                                            })
                                            .filter(function (t) {
                                                return t;
                                            })
                                            .sort(function (t, e) {
                                                return t[0] - e[0];
                                            })
                                            .forEach(function (t) {
                                                e._offsets.push(t[0]), e._targets.push(t[1]);
                                            });
                                }),
                                (h.prototype.dispose = function () {
                                    t.removeData(this._element, a),
                                        t(this._scrollElement).off(l),
                                        (this._element = null),
                                        (this._scrollElement = null),
                                        (this._config = null),
                                        (this._selector = null),
                                        (this._offsets = null),
                                        (this._targets = null),
                                        (this._activeTarget = null),
                                        (this._scrollHeight = null);
                                }),
                                (h.prototype._getConfig = function (n) {
                                    var i;
                                    return "string" != typeof (n = t.extend({}, u, n)).target && ((i = t(n.target).attr("id")) || ((i = r.getUID(e)), t(n.target).attr("id", i)), (n.target = "#" + i)), r.typeCheckConfig(e, n, d), n;
                                }),
                                (h.prototype._getScrollTop = function () {
                                    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
                                }),
                                (h.prototype._getScrollHeight = function () {
                                    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                                }),
                                (h.prototype._getOffsetHeight = function () {
                                    return this._scrollElement === window ? window.innerHeight : this._scrollElement.offsetHeight;
                                }),
                                (h.prototype._process = function () {
                                    var t = this._getScrollTop() + this._config.offset,
                                        e = this._getScrollHeight(),
                                        n = this._config.offset + e - this._getOffsetHeight();
                                    if ((this._scrollHeight !== e && this.refresh(), n <= t)) (e = this._targets[this._targets.length - 1]), this._activeTarget !== e && this._activate(e);
                                    else if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) (this._activeTarget = null), this._clear();
                                    else
                                        for (var o = this._offsets.length; o--; )
                                            this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o]);
                                }),
                                (h.prototype._activate = function (e) {
                                    (this._activeTarget = e), this._clear();
                                    var n = (n = this._selector.split(",")).map(function (t) {
                                            return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]';
                                        }),
                                        n = t(n.join(","));
                                    (n.hasClass(__DROPDOWN_ITEM) ? (n.closest(g_DROPDOWN).find(g_DROPDOWN_TOGGLE).addClass(__ACTIVE), n) : n.parents(g_LI).find("> " + g_NAV_LINKS)).addClass(__ACTIVE),
                                        t(this._scrollElement).trigger(f.ACTIVATE, { relatedTarget: e });
                                }),
                                (h.prototype._clear = function () {
                                    t(this._selector).filter(g_ACTIVE).removeClass(__ACTIVE);
                                }),
                                (h._jQueryInterface = function (e) {
                                    return this.each(function () {
                                        var n = t(this).data(a),
                                            o = "object" === (void 0 === e ? "undefined" : i(e)) && e;
                                        if ((n || ((n = new h(this, o)), t(this).data(a, n)), "string" == typeof e)) {
                                            if (void 0 === n[e]) throw new Error('No method named "' + e + '"');
                                            n[e]();
                                        }
                                    });
                                }),
                                o(h, null, [
                                    {
                                        key: "VERSION",
                                        get: function () {
                                            return "4.0.0-alpha.6";
                                        },
                                    },
                                    {
                                        key: "Default",
                                        get: function () {
                                            return u;
                                        },
                                    },
                                ]),
                                h
                            );
                        })();
                    t(window).on(f.LOAD_DATA_API, function () {
                        for (var e = t.makeArray(t(g_DATA_SPY)), n = e.length; n--; ) {
                            var i = t(e[n]);
                            m._jQueryInterface.call(i, i.data());
                        }
                    }),
                        (t.fn[e] = m._jQueryInterface),
                        (t.fn[e].Constructor = m),
                        (t.fn[e].noConflict = function () {
                            return (t.fn[e] = c), m._jQueryInterface;
                        });
                })(jQuery),
                (function (t) {
                    var e = "tab",
                        s = "bs.tab",
                        a = "." + s,
                        h = t.fn[e],
                        u = { HIDE: "hide" + a, HIDDEN: "hidden" + a, SHOW: "show" + a, SHOWN: "shown" + a, CLICK_DATA_API: "click" + a + ".data-api" },
                        d_DROPDOWN_MENU = "dropdown-menu",
                        d_ACTIVE = "active",
                        d_DISABLED = "disabled",
                        d_FADE = "fade",
                        d_SHOW = "show",
                        f_DROPDOWN = ".dropdown",
                        f_LIST = "ul:not(.dropdown-menu), ol:not(.dropdown-menu), nav:not(.dropdown-menu)",
                        f_FADE_CHILD = "> .nav-item .fade, > .fade",
                        f_ACTIVE = ".active",
                        f_ACTIVE_CHILD = "> .nav-item > .active, > .active",
                        a = '[data-toggle="tab"], [data-toggle="pill"]',
                        f_DROPDOWN_TOGGLE = ".dropdown-toggle",
                        f_DROPDOWN_ACTIVE_CHILD = "> .dropdown-menu .active",
                        _ = (function () {
                            function e(t) {
                                n(this, e), (this._element = t);
                            }
                            return (
                                (e.prototype.show = function () {
                                    var n,
                                        i,
                                        o,
                                        s,
                                        a,
                                        l,
                                        e = this;
                                    (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(d_ACTIVE)) ||
                                        t(this._element).hasClass(d_DISABLED) ||
                                        ((i = n = void 0),
                                        (o = t(this._element).closest(f_LIST)[0]),
                                        (s = r.getSelectorFromElement(this._element)),
                                        o && (i = (i = t.makeArray(t(o).find(f_ACTIVE)))[i.length - 1]),
                                        (a = t.Event(u.HIDE, { relatedTarget: this._element })),
                                        (l = t.Event(u.SHOW, { relatedTarget: i })),
                                        i && t(i).trigger(a),
                                        t(this._element).trigger(l),
                                        l.isDefaultPrevented()) ||
                                        a.isDefaultPrevented() ||
                                        (s && (n = t(s)[0]),
                                        this._activate(this._element, o),
                                        (l = function () {
                                            var n = t.Event(u.HIDDEN, { relatedTarget: e._element }),
                                                o = t.Event(u.SHOWN, { relatedTarget: i });
                                            t(i).trigger(n), t(e._element).trigger(o);
                                        }),
                                        n ? this._activate(n, n.parentNode, l) : l());
                                }),
                                (e.prototype.dispose = function () {
                                    t.removeClass(this._element, s), (this._element = null);
                                }),
                                (e.prototype._activate = function (e, n, i) {
                                    function l() {
                                        return o._transitionComplete(e, s, a, i);
                                    }
                                    var o = this,
                                        s = t(n).find(f_ACTIVE_CHILD)[0],
                                        a = i && r.supportsTransitionEnd() && ((s && t(s).hasClass(d_FADE)) || Boolean(t(n).find(f_FADE_CHILD)[0]));
                                    s && a ? t(s).one(r.TRANSITION_END, l).emulateTransitionEnd(150) : l(), s && t(s).removeClass(d_SHOW);
                                }),
                                (e.prototype._transitionComplete = function (e, n, i, o) {
                                    var s;
                                    n && (t(n).removeClass(d_ACTIVE), (s = t(n.parentNode).find(f_DROPDOWN_ACTIVE_CHILD)[0]) && t(s).removeClass(d_ACTIVE), n.setAttribute("aria-expanded", !1)),
                                        t(e).addClass(d_ACTIVE),
                                        e.setAttribute("aria-expanded", !0),
                                        i ? (r.reflow(e), t(e).addClass(d_SHOW)) : t(e).removeClass(d_FADE),
                                        e.parentNode && t(e.parentNode).hasClass(d_DROPDOWN_MENU) && ((s = t(e).closest(f_DROPDOWN)[0]) && t(s).find(f_DROPDOWN_TOGGLE).addClass(d_ACTIVE), e.setAttribute("aria-expanded", !0)),
                                        o && o();
                                }),
                                (e._jQueryInterface = function (n) {
                                    return this.each(function () {
                                        var i = t(this),
                                            o = i.data(s);
                                        if ((o || ((o = new e(this)), i.data(s, o)), "string" == typeof n)) {
                                            if (void 0 === o[n]) throw new Error('No method named "' + n + '"');
                                            o[n]();
                                        }
                                    });
                                }),
                                o(e, null, [
                                    {
                                        key: "VERSION",
                                        get: function () {
                                            return "4.0.0-alpha.6";
                                        },
                                    },
                                ]),
                                e
                            );
                        })();
                    t(document).on(u.CLICK_DATA_API, a, function (e) {
                        e.preventDefault(), _._jQueryInterface.call(t(this), "show");
                    }),
                        (t.fn[e] = _._jQueryInterface),
                        (t.fn[e].Constructor = _),
                        (t.fn[e].noConflict = function () {
                            return (t.fn[e] = h), _._jQueryInterface;
                        });
                })(jQuery),
                (function (t) {
                    if ("undefined" == typeof Tether) throw new Error("Bootstrap tooltips require Tether (http://tether.io/)");
                    var e = "tooltip",
                        a = "bs.tooltip",
                        l = "." + a,
                        h = t.fn[e],
                        d = {
                            animation: !0,
                            template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
                            trigger: "hover focus",
                            title: "",
                            delay: 0,
                            html: !1,
                            selector: !1,
                            placement: "top",
                            offset: "0 0",
                            constraints: [],
                            container: !1,
                        },
                        f = {
                            animation: "boolean",
                            template: "string",
                            title: "(string|element|function)",
                            trigger: "string",
                            delay: "(number|object)",
                            html: "boolean",
                            selector: "(string|boolean)",
                            placement: "(string|function)",
                            offset: "string",
                            constraints: "array",
                            container: "(string|element|boolean)",
                        },
                        _ = { TOP: "bottom center", RIGHT: "middle left", BOTTOM: "top center", LEFT: "middle right" },
                        g_SHOW = "show",
                        g_OUT = "out",
                        p = {
                            HIDE: "hide" + l,
                            HIDDEN: "hidden" + l,
                            SHOW: "show" + l,
                            SHOWN: "shown" + l,
                            INSERTED: "inserted" + l,
                            CLICK: "click" + l,
                            FOCUSIN: "focusin" + l,
                            FOCUSOUT: "focusout" + l,
                            MOUSEENTER: "mouseenter" + l,
                            MOUSELEAVE: "mouseleave" + l,
                        },
                        m_FADE = "fade",
                        m_SHOW = "show",
                        E_TOOLTIP_INNER = ".tooltip-inner",
                        v = { element: !1, enabled: !1 },
                        T_HOVER = "hover",
                        T_FOCUS = "focus",
                        T_CLICK = "click",
                        T_MANUAL = "manual",
                        I = (function () {
                            function h(t, e) {
                                n(this, h),
                                    (this._isEnabled = !0),
                                    (this._timeout = 0),
                                    (this._hoverState = ""),
                                    (this._activeTrigger = {}),
                                    (this._isTransitioning = !1),
                                    (this._tether = null),
                                    (this.element = t),
                                    (this.config = this._getConfig(e)),
                                    (this.tip = null),
                                    this._setListeners();
                            }
                            return (
                                (h.prototype.enable = function () {
                                    this._isEnabled = !0;
                                }),
                                (h.prototype.disable = function () {
                                    this._isEnabled = !1;
                                }),
                                (h.prototype.toggleEnabled = function () {
                                    this._isEnabled = !this._isEnabled;
                                }),
                                (h.prototype.toggle = function (e) {
                                    var n, i;
                                    e
                                        ? ((n = this.constructor.DATA_KEY),
                                          (i = t(e.currentTarget).data(n)) || ((i = new this.constructor(e.currentTarget, this._getDelegateConfig())), t(e.currentTarget).data(n, i)),
                                          (i._activeTrigger.click = !i._activeTrigger.click),
                                          i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i))
                                        : t(this.getTipElement()).hasClass(m_SHOW)
                                        ? this._leave(null, this)
                                        : this._enter(null, this);
                                }),
                                (h.prototype.dispose = function () {
                                    clearTimeout(this._timeout),
                                        this.cleanupTether(),
                                        t.removeData(this.element, this.constructor.DATA_KEY),
                                        t(this.element).off(this.constructor.EVENT_KEY),
                                        t(this.element).closest(".modal").off("hide.bs.modal"),
                                        this.tip && t(this.tip).remove(),
                                        (this._isEnabled = null),
                                        (this._timeout = null),
                                        (this._hoverState = null),
                                        (this._activeTrigger = null),
                                        (this._tether = null),
                                        (this.element = null),
                                        (this.config = null),
                                        (this.tip = null);
                                }),
                                (h.prototype.show = function () {
                                    var e = this;
                                    if ("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");
                                    var n = t.Event(this.constructor.Event.SHOW);
                                    if (this.isWithContent() && this._isEnabled) {
                                        if (this._isTransitioning) throw new Error("Tooltip is transitioning");
                                        t(this.element).trigger(n);
                                        var c,
                                            i = t.contains(this.element.ownerDocument.documentElement, this.element);
                                        !n.isDefaultPrevented() &&
                                            i &&
                                            ((n = this.getTipElement()),
                                            (i = r.getUID(this.constructor.NAME)),
                                            n.setAttribute("id", i),
                                            this.element.setAttribute("aria-describedby", i),
                                            this.setContent(),
                                            this.config.animation && t(n).addClass(m_FADE),
                                            (i = "function" == typeof this.config.placement ? this.config.placement.call(this, n, this.element) : this.config.placement),
                                            (i = this._getAttachment(i)),
                                            (c = !1 === this.config.container ? document.body : t(this.config.container)),
                                            t(n).data(this.constructor.DATA_KEY, this).appendTo(c),
                                            t(this.element).trigger(this.constructor.Event.INSERTED),
                                            (this._tether = new Tether({
                                                attachment: i,
                                                element: n,
                                                target: this.element,
                                                classes: v,
                                                classPrefix: "bs-tether",
                                                offset: this.config.offset,
                                                constraints: this.config.constraints,
                                                addTargetClasses: !1,
                                            })),
                                            r.reflow(n),
                                            this._tether.position(),
                                            t(n).addClass(m_SHOW),
                                            (c = function () {
                                                var n = e._hoverState;
                                                (e._hoverState = null), (e._isTransitioning = !1), t(e.element).trigger(e.constructor.Event.SHOWN), n === g_OUT && e._leave(null, e);
                                            }),
                                            r.supportsTransitionEnd() && t(this.tip).hasClass(m_FADE) ? ((this._isTransitioning = !0), t(this.tip).one(r.TRANSITION_END, c).emulateTransitionEnd(h._TRANSITION_DURATION)) : c());
                                    }
                                }),
                                (h.prototype.hide = function (e) {
                                    var n = this,
                                        i = this.getTipElement(),
                                        o = t.Event(this.constructor.Event.HIDE);
                                    if (this._isTransitioning) throw new Error("Tooltip is transitioning");
                                    function s() {
                                        n._hoverState !== g_SHOW && i.parentNode && i.parentNode.removeChild(i),
                                            n.element.removeAttribute("aria-describedby"),
                                            t(n.element).trigger(n.constructor.Event.HIDDEN),
                                            (n._isTransitioning = !1),
                                            n.cleanupTether(),
                                            e && e();
                                    }
                                    t(this.element).trigger(o),
                                        o.isDefaultPrevented() ||
                                            (t(i).removeClass(m_SHOW),
                                            (this._activeTrigger[T_CLICK] = !1),
                                            (this._activeTrigger[T_FOCUS] = !1),
                                            (this._activeTrigger[T_HOVER] = !1),
                                            r.supportsTransitionEnd() && t(this.tip).hasClass(m_FADE) ? ((this._isTransitioning = !0), t(i).one(r.TRANSITION_END, s).emulateTransitionEnd(150)) : s(),
                                            (this._hoverState = ""));
                                }),
                                (h.prototype.isWithContent = function () {
                                    return Boolean(this.getTitle());
                                }),
                                (h.prototype.getTipElement = function () {
                                    return (this.tip = this.tip || t(this.config.template)[0]);
                                }),
                                (h.prototype.setContent = function () {
                                    var e = t(this.getTipElement());
                                    this.setElementContent(e.find(E_TOOLTIP_INNER), this.getTitle()), e.removeClass(m_FADE + " " + m_SHOW), this.cleanupTether();
                                }),
                                (h.prototype.setElementContent = function (e, n) {
                                    var o = this.config.html;
                                    "object" === (void 0 === n ? "undefined" : i(n)) && (n.nodeType || n.jquery) ? (o ? t(n).parent().is(e) || e.empty().append(n) : e.text(t(n).text())) : e[o ? "html" : "text"](n);
                                }),
                                (h.prototype.getTitle = function () {
                                    return this.element.getAttribute("data-original-title") || ("function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title);
                                }),
                                (h.prototype.cleanupTether = function () {
                                    this._tether && this._tether.destroy();
                                }),
                                (h.prototype._getAttachment = function (t) {
                                    return _[t.toUpperCase()];
                                }),
                                (h.prototype._setListeners = function () {
                                    var e = this;
                                    this.config.trigger.split(" ").forEach(function (n) {
                                        var i;
                                        "click" === n
                                            ? t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (t) {
                                                  return e.toggle(t);
                                              })
                                            : n !== T_MANUAL &&
                                              ((i = n === T_HOVER ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN),
                                              (n = n === T_HOVER ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT),
                                              t(e.element)
                                                  .on(i, e.config.selector, function (t) {
                                                      return e._enter(t);
                                                  })
                                                  .on(n, e.config.selector, function (t) {
                                                      return e._leave(t);
                                                  })),
                                            t(e.element)
                                                .closest(".modal")
                                                .on("hide.bs.modal", function () {
                                                    return e.hide();
                                                });
                                    }),
                                        this.config.selector ? (this.config = t.extend({}, this.config, { trigger: "manual", selector: "" })) : this._fixTitle();
                                }),
                                (h.prototype._fixTitle = function () {
                                    var t = i(this.element.getAttribute("data-original-title"));
                                    (!this.element.getAttribute("title") && "string" === t) || (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
                                }),
                                (h.prototype._enter = function (e, n) {
                                    var i = this.constructor.DATA_KEY;
                                    return (
                                        (n = n || t(e.currentTarget).data(i)) || ((n = new this.constructor(e.currentTarget, this._getDelegateConfig())), t(e.currentTarget).data(i, n)),
                                        e && (n._activeTrigger["focusin" === e.type ? T_FOCUS : T_HOVER] = !0),
                                        t(n.getTipElement()).hasClass(m_SHOW) || n._hoverState === g_SHOW
                                            ? void (n._hoverState = g_SHOW)
                                            : (clearTimeout(n._timeout),
                                              (n._hoverState = g_SHOW),
                                              n.config.delay && n.config.delay.show
                                                  ? void (n._timeout = setTimeout(function () {
                                                        n._hoverState === g_SHOW && n.show();
                                                    }, n.config.delay.show))
                                                  : void n.show())
                                    );
                                }),
                                (h.prototype._leave = function (e, n) {
                                    var i = this.constructor.DATA_KEY;
                                    if (
                                        ((n = n || t(e.currentTarget).data(i)) || ((n = new this.constructor(e.currentTarget, this._getDelegateConfig())), t(e.currentTarget).data(i, n)),
                                        e && (n._activeTrigger["focusout" === e.type ? T_FOCUS : T_HOVER] = !1),
                                        !n._isWithActiveTrigger())
                                    )
                                        return (
                                            clearTimeout(n._timeout),
                                            (n._hoverState = g_OUT),
                                            n.config.delay && n.config.delay.hide
                                                ? void (n._timeout = setTimeout(function () {
                                                      n._hoverState === g_OUT && n.hide();
                                                  }, n.config.delay.hide))
                                                : void n.hide()
                                        );
                                }),
                                (h.prototype._isWithActiveTrigger = function () {
                                    for (var t in this._activeTrigger) if (this._activeTrigger[t]) return !0;
                                    return !1;
                                }),
                                (h.prototype._getConfig = function (n) {
                                    return (
                                        (n = t.extend({}, this.constructor.Default, t(this.element).data(), n)).delay && "number" == typeof n.delay && (n.delay = { show: n.delay, hide: n.delay }),
                                        r.typeCheckConfig(e, n, this.constructor.DefaultType),
                                        n
                                    );
                                }),
                                (h.prototype._getDelegateConfig = function () {
                                    var t = {};
                                    if (this.config) for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                                    return t;
                                }),
                                (h._jQueryInterface = function (e) {
                                    return this.each(function () {
                                        var n = t(this).data(a),
                                            o = "object" === (void 0 === e ? "undefined" : i(e)) && e;
                                        if ((n || !/dispose|hide/.test(e)) && (n || ((n = new h(this, o)), t(this).data(a, n)), "string" == typeof e)) {
                                            if (void 0 === n[e]) throw new Error('No method named "' + e + '"');
                                            n[e]();
                                        }
                                    });
                                }),
                                o(h, null, [
                                    {
                                        key: "VERSION",
                                        get: function () {
                                            return "4.0.0-alpha.6";
                                        },
                                    },
                                    {
                                        key: "Default",
                                        get: function () {
                                            return d;
                                        },
                                    },
                                    {
                                        key: "NAME",
                                        get: function () {
                                            return e;
                                        },
                                    },
                                    {
                                        key: "DATA_KEY",
                                        get: function () {
                                            return a;
                                        },
                                    },
                                    {
                                        key: "Event",
                                        get: function () {
                                            return p;
                                        },
                                    },
                                    {
                                        key: "EVENT_KEY",
                                        get: function () {
                                            return l;
                                        },
                                    },
                                    {
                                        key: "DefaultType",
                                        get: function () {
                                            return f;
                                        },
                                    },
                                ]),
                                h
                            );
                        })();
                    return (
                        (t.fn[e] = I._jQueryInterface),
                        (t.fn[e].Constructor = I),
                        (t.fn[e].noConflict = function () {
                            return (t.fn[e] = h), I._jQueryInterface;
                        }),
                        I
                    );
                })(jQuery));
        !(function (r) {
            var a = "popover",
                h = "bs.popover",
                c = "." + h,
                u = r.fn[a],
                d = r.extend({}, s.Default, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }),
                f = r.extend({}, s.DefaultType, { content: "(string|element|function)" }),
                __FADE = "fade",
                __SHOW = "show",
                g_TITLE = ".popover-title",
                g_CONTENT = ".popover-content",
                p = {
                    HIDE: "hide" + c,
                    HIDDEN: "hidden" + c,
                    SHOW: "show" + c,
                    SHOWN: "shown" + c,
                    INSERTED: "inserted" + c,
                    CLICK: "click" + c,
                    FOCUSIN: "focusin" + c,
                    FOCUSOUT: "focusout" + c,
                    MOUSEENTER: "mouseenter" + c,
                    MOUSELEAVE: "mouseleave" + c,
                },
                m = (function (s) {
                    function u() {
                        return (
                            n(this, u),
                            (function (t, e) {
                                if (t) return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            })(this, s.apply(this, arguments))
                        );
                    }
                    return (
                        (function (t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            (t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } })), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e));
                        })(u, s),
                        (u.prototype.isWithContent = function () {
                            return this.getTitle() || this._getContent();
                        }),
                        (u.prototype.getTipElement = function () {
                            return (this.tip = this.tip || r(this.config.template)[0]);
                        }),
                        (u.prototype.setContent = function () {
                            var t = r(this.getTipElement());
                            this.setElementContent(t.find(g_TITLE), this.getTitle()), this.setElementContent(t.find(g_CONTENT), this._getContent()), t.removeClass(__FADE + " " + __SHOW), this.cleanupTether();
                        }),
                        (u.prototype._getContent = function () {
                            return this.element.getAttribute("data-content") || ("function" == typeof this.config.content ? this.config.content.call(this.element) : this.config.content);
                        }),
                        (u._jQueryInterface = function (t) {
                            return this.each(function () {
                                var e = r(this).data(h),
                                    n = "object" === (void 0 === t ? "undefined" : i(t)) ? t : null;
                                if ((e || !/destroy|hide/.test(t)) && (e || ((e = new u(this, n)), r(this).data(h, e)), "string" == typeof t)) {
                                    if (void 0 === e[t]) throw new Error('No method named "' + t + '"');
                                    e[t]();
                                }
                            });
                        }),
                        o(u, null, [
                            {
                                key: "VERSION",
                                get: function () {
                                    return "4.0.0-alpha.6";
                                },
                            },
                            {
                                key: "Default",
                                get: function () {
                                    return d;
                                },
                            },
                            {
                                key: "NAME",
                                get: function () {
                                    return a;
                                },
                            },
                            {
                                key: "DATA_KEY",
                                get: function () {
                                    return h;
                                },
                            },
                            {
                                key: "Event",
                                get: function () {
                                    return p;
                                },
                            },
                            {
                                key: "EVENT_KEY",
                                get: function () {
                                    return c;
                                },
                            },
                            {
                                key: "DefaultType",
                                get: function () {
                                    return f;
                                },
                            },
                        ]),
                        u
                    );
                })(s);
            (r.fn[a] = m._jQueryInterface),
                (r.fn[a].Constructor = m),
                (r.fn[a].noConflict = function () {
                    return (r.fn[a] = u), m._jQueryInterface;
                });
        })(jQuery);
    })();
var onepressIsMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return onepressIsMobile.Android() || onepressIsMobile.BlackBerry() || onepressIsMobile.iOS() || onepressIsMobile.Opera() || onepressIsMobile.Windows();
    },
};
function preload_images(images, complete_callback) {
    var id;
    onepress_js_settings.hero_disable_preload
        ? complete_callback && complete_callback()
        : ((id = "_img_loading_" + new Date().getTime()),
          jQuery("body").append('<div id="' + id + '"></div>'),
          jQuery.each(images, function (index, src) {
              var img = jQuery("<img>");
              img.attr("alt", ""), img.attr("class", "image__preload"), img.css("display", "none"), img.attr("src", src), jQuery("#" + id).append(img);
          }),
          jQuery("#" + id).imagesLoaded(function () {
              complete_callback && complete_callback(),
                  setTimeout(function () {
                      jQuery("#" + id).remove();
                  }, 5e3);
          }));
}
function _to_number(string) {
    return "number" == typeof string ? string : (string = string.match(/\d+$/)) ? parseFloat(string[0]) : 0;
}
function _to_bool(v) {
    return "boolean" == typeof v ? v : "number" == typeof v ? 0 !== v : "string" == typeof v && ("true" === v || "1" === v);
}
function isElementInViewport(el) {
    el = (el = "function" == typeof jQuery && el instanceof jQuery ? el[0] : el).getBoundingClientRect();
    return 0 <= el.top && 0 <= el.left && el.bottom <= (window.innerHeight || document.documentElement.clientHeight) && el.right <= (window.innerWidth || document.documentElement.clientWidth);
}
!(function () {
    var is_webkit = -1 < navigator.userAgent.toLowerCase().indexOf("webkit"),
        is_opera = -1 < navigator.userAgent.toLowerCase().indexOf("opera"),
        is_ie = -1 < navigator.userAgent.toLowerCase().indexOf("msie");
    (is_webkit || is_opera || is_ie) &&
        document.getElementById &&
        window.addEventListener &&
        window.addEventListener(
            "hashchange",
            function () {
                var id = location.hash.substring(1);
                /^[A-z0-9_-]+$/.test(id) && (id = document.getElementById(id)) && (/^(?:a|select|input|button|textarea)$/i.test(id.tagName) || (id.tabIndex = -1), id.focus());
            },
            !1
        );
})(),
    (function () {
        var vh, vw;
        onepressIsMobile.any() &&
            ((vh = 0.01 * window.innerHeight),
            (vw = 0.01 * window.innerWidth),
            document.documentElement.style.setProperty("--vh", vh + "px"),
            document.documentElement.style.setProperty("--vw", vw + "px"),
            window.addEventListener("resize", function () {
                var vh = 0.01 * window.innerHeight,
                    vw = 0.01 * window.innerWidth;
                document.documentElement.style.setProperty("--vh", vh + "px"), document.documentElement.style.setProperty("--vw", vw + "px");
            }));
    })(),
    jQuery(document).ready(function ($) {
        var $stickies,
            $window = $(window),
            $document = $(document),
            getAdminBarHeight =
                ($(document).on("mouseenter resize", ".sub-menu .menu-item-has-children", function () {
                    var submenuEl = $(this).find(".sub-menu");
                    0 < submenuEl.length && !isElementInViewport(submenuEl) && submenuEl.css({ right: "100%", left: "auto" });
                }),
                function () {
                    var h = 0;
                    return (h = $("#wpadminbar").length && "fixed" == $("#wpadminbar").css("position") ? $("#wpadminbar").height() : h);
                }),
            stickyHeaders = {
                load: function (stickies) {
                    "object" == typeof stickies &&
                        stickies instanceof jQuery &&
                        0 < stickies.length &&
                        (setData(stickies),
                        $window.scroll(function () {
                            _whenScrolling();
                        }),
                        $window.resize(function () {
                            setData(stickies, !1),
                                stickies.each(function () {
                                    $(this).removeClass("fixed").removeAttr("style");
                                }),
                                _whenScrolling();
                        }),
                        $document.on("hero_ready", function () {
                            $(".followWrap").removeAttr("style"),
                                setTimeout(function () {
                                    $(".followWrap").removeAttr("style"), setData(stickies, !1), _whenScrolling();
                                }, 500);
                        }));
                },
            };
        function setData(stickies, addWrap) {
            void 0 === addWrap && (addWrap = !0),
                ($stickies = stickies.each(function () {
                    var $thisSticky = $(this);
                    $thisSticky.parent().hasClass("followWrap") || (addWrap && $thisSticky.wrap('<div class="followWrap" />')), $thisSticky.parent().removeAttr("style"), $thisSticky.parent().height($thisSticky.height());
                }));
        }
        function _whenScrolling() {
            var top = getAdminBarHeight(),
                scrollTop = $window.scrollTop();
            $stickies.each(function (i) {
                var $thisSticky = $(this),
                    $stickyPosition = $thisSticky.parent().offset().top;
                0 === scrollTop && $thisSticky.addClass("no-scroll"),
                    $stickyPosition - top <= scrollTop
                        ? (0 < scrollTop && $thisSticky.removeClass("no-scroll"), $thisSticky.addClass("header-fixed"), $thisSticky.css("top", top))
                        : $thisSticky.removeClass("header-fixed").removeAttr("style").addClass("no-scroll");
            });
        }
        stickyHeaders.load($("#masthead.is-sticky")),
            $document.on("header_view_changed", function () {
                stickyHeaders.load($("#masthead.is-sticky"));
            });
        function getNavHeight(fitWindow) {
            return (fitWindow = void 0 === fitWindow ? !0 : fitWindow)
                ? ((fitWindow = header.getBoundingClientRect()), $(window).height() - (fitWindow.x + fitWindow.height) + 1)
                : (main_navigation.css("height", "auto"), (fitWindow = main_navigation[0].getBoundingClientRect()), main_navigation.css("height", 0), fitWindow.height);
        }
        var noSticky,
            h,
            main_navigation = jQuery(".main-navigation .onepress-menu"),
            header = document.getElementById("masthead");
        header && (noSticky = header.classList.contains("no-sticky"));
        function autoMenuAlign() {
            const isMobile = $(window).width() <= 1140;
            var header = $("#masthead > .container");
            const headerRect = header.length ? header[0].getBoundingClientRect() : {};
            $("#site-navigation  .onepress-menu > li").each(function () {
                var liRect,
                    subRect,
                    li = $(this),
                    sub = $("> .sub-menu", li);
                isMobile
                    ? sub.removeAttr("style")
                    : sub.length &&
                      ((liRect = li[0].getBoundingClientRect()), (subRect = sub[0].getBoundingClientRect()), headerRect.right < liRect.left + subRect.width) &&
                      (li.addClass("sub-li-r"), sub.addClass("sub-ul-r"), (subRect = headerRect.right - (liRect.left + liRect.width)), sub.css("right", `-${subRect}px`));
            });
        }
        $document.on("click", "#nav-toggle", function (event) {
            var h;
            event.preventDefault(),
                jQuery("#nav-toggle").toggleClass("nav-is-visible"),
                jQuery(".header-widget").toggleClass("header-widget-mobile"),
                main_navigation.stop(),
                main_navigation.hasClass("onepress-menu-mobile")
                    ? (main_navigation.css({ height: main_navigation.height(), "min-height": 0, overflow: "hidden" }),
                      setTimeout(function () {
                          main_navigation.animate({ height: 0 }, 300, function () {
                              main_navigation.removeAttr("style"), main_navigation.removeClass("onepress-menu-mobile"), $("body").removeClass("onepress-menu-mobile-opening");
                          });
                      }, 40))
                    : (main_navigation.addClass("onepress-menu-mobile"),
                      $("body").addClass("onepress-menu-mobile-opening"),
                      (event = (event = header.getBoundingClientRect()).x + event.height - 1),
                      main_navigation.css({ top: event }),
                      (h = getNavHeight(!noSticky)),
                      isNaN(h) && (h = $(window).height()),
                      main_navigation.animate({ height: h }, 300, function () {
                          noSticky && main_navigation.css({ "min-height": h, height: "auto" });
                      }));
        }),
            !noSticky &&
                onepressIsMobile.any() &&
                $(document).on("scroll", function () {
                    var newViewportHeight, offset;
                    main_navigation.hasClass("onepress-menu-mobile") &&
                        ((newViewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)),
                        (offset = (offset = header.getBoundingClientRect()).x + offset.height - 1),
                        main_navigation.css({ height: newViewportHeight - offset + 1, top: offset }));
                }),
            autoMenuAlign();
        let timeOutResize = !1;
        function inViewPort($element, offset_top) {
            offset_top = offset_top || 0;
            var view_port_top = jQuery(window).scrollTop(),
                view_port_h = (0 < $("#wpadminbar").length && ((view_port_top -= $("#wpadminbar").outerHeight() - 1), (offset_top += $("#wpadminbar").outerHeight() - 1)), $("body").outerHeight()),
                el_top = $element.offset().top,
                $element = el_top + $element.height(),
                view_port_bot = view_port_top + view_port_h,
                in_view_port = !1;
            return (
                $("body")[0].scrollHeight - view_port_h <= view_port_top
                    ? ((el_top < view_port_top && view_port_bot < el_top) || (view_port_top < el_top && $element < view_port_top)) && (in_view_port = !0)
                    : el_top <= view_port_top + offset_top && view_port_top < $element && (in_view_port = !0),
                in_view_port
            );
        }
        $(window).resize(function () {
            timeOutResize && clearTimeout(timeOutResize),
                (timeOutResize = setTimeout(() => {
                    main_navigation.hasClass("onepress-menu-mobile") && $(window).width() <= 1140
                        ? noSticky || main_navigation.css({ height: getNavHeight(), overflow: "auto" })
                        : (main_navigation.removeAttr("style"), main_navigation.removeClass("onepress-menu-mobile"), jQuery("#nav-toggle").removeClass("nav-is-visible")),
                        autoMenuAlign();
                }, 500));
        }),
            jQuery(".onepress-menu li.menu-item-has-children, .onepress-menu li.page_item_has_children").each(function () {
                jQuery(this).prepend('<div class="nav-toggle-subarrow"><i class="fa fa-angle-down"></i></div>');
            }),
            $document.on("click", ".nav-toggle-subarrow, .nav-toggle-subarrow .nav-toggle-subarrow", function () {
                var p = jQuery(this).parent();
                p.removeAttr("style"), p.toggleClass("nav-toggle-dropdown");
            }),
            (window.current_nav_item = !1),
            (h = "1" != onepress_js_settings.onepress_disable_sticky_header ? jQuery("#wpadminbar").height() + jQuery(".site-header").height() : jQuery("#wpadminbar").height()),
            jQuery('#site-navigation li a[href*="#"]').on("click", function (event) {
                var $el,
                    url = new URL(this.href);
                url.origin + url.pathname === window.location.origin + window.location.pathname &&
                    (($el = jQuery(this.hash)), jQuery(".onepress-menu").hasClass("onepress-menu-mobile") && jQuery("#nav-toggle").trigger("click"), $el.length) &&
                    (event.preventDefault(), window.history.pushState({}, null, url.href), smoothScroll($el));
            });
        var _scroll_top = $window.scrollTop();
        function smoothScroll(element) {
            element.length <= 0 ||
                jQuery("html, body").animate(
                    { scrollTop: jQuery(element).offset().top - h + "px" },
                    {
                        duration: 800,
                        easing: "swing",
                        complete: function () {
                            window.current_nav_item = !1;
                        },
                    }
                );
        }
        jQuery(window).scroll(function () {
            var currentNode = null;
            if (window.current_nav_item) currentNode = window.current_nav_item.replace("#", "");
            else {
                var current_top = $window.scrollTop(),
                    adminBarHeight = 0 < jQuery("#wpadminbar").length ? jQuery("#wpadminbar").height() : 0;
                if (((h = "1" != onepress_js_settings.onepress_disable_sticky_header ? adminBarHeight + jQuery(".site-header").height() : adminBarHeight), _scroll_top < current_top))
                    jQuery("section").each(function (index) {
                        var section = jQuery(this),
                            currentId = section.attr("id") || "";
                        inViewPort(section, h + 10) && (currentNode = currentId);
                    });
                else
                    for (var i = jQuery("section").length - 1; 0 <= i; i--) {
                        var section = jQuery("section").eq(i),
                            currentId = section.attr("id") || "";
                        inViewPort(section, h + 10) && (currentNode = currentId);
                    }
                _scroll_top = current_top;
            }
            !(function (currentNode) {
                currentNode &&
                    ((currentNode = currentNode.replace("#", "")) && jQuery("#site-navigation li").removeClass("onepress-current-item"), currentNode) &&
                    jQuery("#site-navigation li")
                        .find('a[href$="#' + currentNode + '"]')
                        .parent()
                        .addClass("onepress-current-item");
            })(currentNode);
        }),
            jQuery(window).on("load", function () {
                var urlCurrent = location.hash;
                0 < jQuery(urlCurrent).length && smoothScroll(urlCurrent);
            }),
            jQuery('.hero-slideshow-wrapper a[href*="#"]:not([href="#"]), .parallax-content a[href*="#"]:not([href="#"]), .back-to-top').on("click", function (event) {
                event.preventDefault(), smoothScroll(jQuery(this.hash));
            }),
            onepress_js_settings.is_home &&
                jQuery(".site-branding .site-brand-inner").on("click", function (e) {
                    e.preventDefault(), jQuery("html, body").animate({ scrollTop: "0px" }, { duration: 300, easing: "swing" });
                }),
            onepressIsMobile.any() ? jQuery("body").addClass("body-mobile").removeClass("body-desktop") : jQuery("body").addClass("body-desktop").removeClass("body-mobile"),
            "1" != onepress_js_settings.onepress_disable_animation && new WOW({ offset: 50, mobile: !1, live: !1 }).init();
        function text_rotator() {
            jQuery(".js-rotating").Morphext({ animation: onepress_js_settings.hero_animation, separator: "|", speed: parseInt(onepress_js_settings.hero_speed), complete: function () {} });
        }
        var header_height;
        function hero_full_screen(no_trigger) {
            var wh, top, $header;
            0 < $(".hero-slideshow-fullscreen").length &&
                ((wh = $window.height()),
                (top = getAdminBarHeight()),
                ($header = ($header = jQuery("#masthead")).hasClass("is-t") ? 0 : $header.height()),
                ($header += top),
                jQuery(".hero-slideshow-fullscreen").css("height", wh - $header + 1 + "px"),
                (void 0 !== no_trigger && no_trigger) || $document.trigger("hero_ready"));
        }
        text_rotator(),
            $document.on("header_view_changed", function () {
                text_rotator();
            }),
            jQuery(".site-content").fitVids({ ignore: ".wp-block-embed iframe, .wp-block-embed object" }),
            $.fn.lightGallery && $(".videolightbox-popup").lightGallery({}),
            $(".counter").counterUp({ delay: 10, time: 1e3 }),
            "1" == onepress_js_settings.onepress_vertical_align_menu && ((header_height = jQuery(".site-header").height()), jQuery(".site-header .onepress-menu").css("line-height", header_height + "px")),
            $window.on("resize", function () {
                hero_full_screen();
            }),
            hero_full_screen(),
            $document.on("header_view_changed", function () {
                hero_full_screen();
            }),
            $document.on("hero_ready", function () {
                hero_full_screen(!0);
            });
        function heroSliders() {
            $("#parallax-hero").length <= 0 &&
                jQuery(".hero-slideshow-wrapper").each(function () {
                    var images,
                        hero = $(this);
                    hero.hasClass("video-hero") ||
                        ((images = "string" == typeof (images = hero.data("images") || !1) ? jQuery.parseJSON(images) : images)
                            ? preload_images(images, function () {
                                  hero.backstretch(images, { fade: _to_number(onepress_js_settings.hero_fade), duration: _to_number(onepress_js_settings.hero_duration) }),
                                      hero.addClass("loaded"),
                                      hero.removeClass("loading"),
                                      setTimeout(function () {
                                          hero.find(".slider-spinner").remove();
                                      }, 600);
                              })
                            : (hero.addClass("loaded"), hero.removeClass("loading"), hero.find(".slider-spinner").remove()));
                });
        }
        function onepress_gallery_init($context) {
            $.fn.justifiedGallery &&
                $(".gallery-justified", $context).imagesLoaded(function () {
                    $(".gallery-justified", $context).each(function () {
                        var margin = $(this).attr("data-spacing") || 20,
                            row_height = $(this).attr("data-row-height") || 120,
                            margin = _to_number(margin),
                            row_height = _to_number(row_height);
                        $(this).justifiedGallery({ rowHeight: row_height, margins: margin, selector: "a, div:not(.spinner), .inner" });
                    });
                });
            var tag_selector,
                is_rtl = onepress_js_settings.is_rtl;
            function isotope_init() {
                $.fn.isotope &&
                    $(".gallery-masonry", $context).each(function () {
                        var m = $(this),
                            gutter = m.attr("data-gutter") || 10,
                            columns = m.attr("data-col") || 5,
                            columns = (_to_number(gutter), _to_number(columns)),
                            gutter = $(window).width();
                        gutter <= 940 && (columns = 2 < columns ? columns - 1 : columns),
                            gutter <= 720 && (columns = 3 < columns ? 3 : columns),
                            gutter <= 576 && (columns = 2 < columns ? 2 : columns),
                            m.find(".g-item").css({ width: 100 / columns + "%", float: "left", padding: 0 }),
                            m.isotope({ itemSelector: ".g-item", percentPosition: !0, masonry: { columnWidth: ".inner" } });
                    });
            }
            $.fn.owlCarousel &&
                ($(".gallery-slider", $context).owlCarousel({
                    items: 1,
                    itemsCustom: !1,
                    itemsDesktop: 1,
                    itemsDesktopSmall: 1,
                    itemsTablet: 1,
                    itemsTabletSmall: !1,
                    itemsMobile: 1,
                    singleItem: !0,
                    itemsScaleUp: !1,
                    slideSpeed: 200,
                    paginationSpeed: 800,
                    rewindSpeed: 1e3,
                    autoPlay: 4e3,
                    stopOnHover: !0,
                    nav: !0,
                    navText: ["<i class='lg-icon'></i>", "<i class='lg-icon'></i>"],
                    autoHeight: !0,
                    rtl: 0 != is_rtl,
                    dots: !1,
                }),
                $(".gallery-carousel", $context).each(function () {
                    var n = $(this).attr("data-col") || 5;
                    (n = _to_number(n)) <= 0 && (n = 5),
                        $(this).owlCarousel({
                            items: n,
                            responsive: { 0: { items: 2 }, 768: { items: 2 < n ? 2 : n }, 979: { items: 3 < n ? 3 : n }, 1199: { items: n } },
                            rtl: 0 != is_rtl,
                            navSpeed: 800,
                            autoplaySpeed: 4e3,
                            autoplayHoverPause: !0,
                            nav: !0,
                            navText: ["<i class='lg-icon'></i>", "<i class='lg-icon'></i>"],
                            dots: !1,
                        });
                })),
                $(".gallery-masonry", $context).imagesLoaded(function () {
                    isotope_init();
                }),
                $(window).resize(function () {
                    isotope_init();
                }),
                $.fn.lightGallery &&
                    ((tag_selector = "a"), $(".enable-lightbox", $context).find(".g-item").first().is("div") && (tag_selector = "div"), $(".enable-lightbox", $context).lightGallery({ mode: "lg-fade", selector: tag_selector }));
        }
        heroSliders(),
            $document.on("header_view_changed", function () {
                heroSliders();
            }),
            $(".parallax-hero").each(function () {
                var hero = $(this),
                    bg = (hero.addClass("loading"), !0);
                0 < hero.find("img").length && (bg = !1),
                    $(".parallax-bg", hero)
                        .imagesLoaded({ background: bg }, function () {
                            hero.find(".hero-slideshow-wrapper").addClass("loaded"),
                                hero.removeClass("loading"),
                                setTimeout(function () {
                                    hero.find(".hero-slideshow-wrapper").find(".slider-spinner").remove();
                                }, 600);
                        })
                        .fail(function (instance) {
                            hero.removeClass("loading"), hero.find(".hero-slideshow-wrapper").addClass("loaded"), hero.find(".hero-slideshow-wrapper").find(".slider-spinner").remove();
                        });
            }),
            $(".section-parallax").each(function () {
                var hero = $(this),
                    bg = !0;
                0 < hero.find("img").length && (bg = !1),
                    $(".parallax-bg", hero)
                        .imagesLoaded({ background: bg }, function () {})
                        .fail(function (instance) {});
            }),
            setTimeout(function () {
                $(window).trigger("scroll");
            }, 500),
            onepress_gallery_init($(".gallery-content")),
            "undefined" != typeof jarallax && jarallax(document.querySelectorAll(".jarallax"), { speed: parseFloat(onepress_js_settings.parallax_speed || 0.5) }),
            "undefined" != typeof wp &&
                wp.customize &&
                wp.customize.selectiveRefresh &&
                wp.customize.selectiveRefresh.bind("partial-content-rendered", function (placement) {
                    "section-gallery" == placement.partial.id && (onepress_gallery_init(placement.container.find(".gallery-content")), $(window).resize());
                });
    });
