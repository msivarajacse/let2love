/*!
 * froala_editor v2.8.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */

! function(n) { "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof module && module.exports ? module.exports = function(e, t) { return t === undefined && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), n(t) } : n(window.jQuery) }(function(Ee) {
    var s = function(e, t) {
        this.id = ++Ee.FE.ID, this.opts = Ee.extend(!0, {}, Ee.extend({}, s.DEFAULTS, "object" == typeof t && t));
        var n = JSON.stringify(this.opts);
        Ee.FE.OPTS_MAPPING[n] = Ee.FE.OPTS_MAPPING[n] || this.id, this.sid = Ee.FE.OPTS_MAPPING[n], Ee.FE.SHARED[this.sid] = Ee.FE.SHARED[this.sid] || {}, this.shared = Ee.FE.SHARED[this.sid], this.shared.count = (this.shared.count || 0) + 1, this.$oel = Ee(e), this.$oel.data("froala.editor", this), this.o_doc = e.ownerDocument, this.o_win = "defaultView" in this.o_doc ? this.o_doc.defaultView : this.o_doc.parentWindow;
        var r = Ee(this.o_win).scrollTop();
        this.$oel.on("froala.doInit", Ee.proxy(function() {
            this.$oel.off("froala.doInit"), this.doc = this.$el.get(0).ownerDocument, this.win = "defaultView" in this.doc ? this.doc.defaultView : this.doc.parentWindow, this.$doc = Ee(this.doc), this.$win = Ee(this.win), this.opts.pluginsEnabled || (this.opts.pluginsEnabled = Object.keys(Ee.FE.PLUGINS)), this.opts.initOnClick ? (this.load(Ee.FE.MODULES), this.$el.on("touchstart.init", function() { Ee(this).data("touched", !0) }), this.$el.on("touchmove.init", function() { Ee(this).removeData("touched") }), this.$el.on("mousedown.init touchend.init dragenter.init focus.init", Ee.proxy(function(e) {
                if ("touchend" == e.type && !this.$el.data("touched")) return !0;
                if (1 === e.which || !e.which) {
                    this.$el.off("mousedown.init touchstart.init touchmove.init touchend.init dragenter.init focus.init"), this.load(Ee.FE.MODULES), this.load(Ee.FE.PLUGINS);
                    var t = e.originalEvent && e.originalEvent.originalTarget;
                    t && "IMG" == t.tagName && Ee(t).trigger("mousedown"), "undefined" == typeof this.ul && this.destroy(), "touchend" == e.type && this.image && e.originalEvent && e.originalEvent.target && Ee(e.originalEvent.target).is("img") && setTimeout(Ee.proxy(function() { this.image.edit(Ee(e.originalEvent.target)) }, this), 100), this.ready = !0, this.events.trigger("initialized")
                }
            }, this)), this.events.trigger("initializationDelayed")) : (this.load(Ee.FE.MODULES), this.load(Ee.FE.PLUGINS), Ee(this.o_win).scrollTop(r), "undefined" == typeof this.ul && this.destroy(), this.ready = !0, this.events.trigger("initialized"))
        }, this)), this._init()
    };
    s.DEFAULTS = { initOnClick: !1, pluginsEnabled: null }, s.MODULES = {}, s.PLUGINS = {}, s.VERSION = "2.8.1", s.INSTANCES = [], s.OPTS_MAPPING = {}, s.SHARED = {}, s.ID = 0, s.prototype._init = function() {
        var e = this.$oel.prop("tagName");
        this.$oel.closest("label").length;
        var t = Ee.proxy(function() { "TEXTAREA" != e && (this._original_html = this._original_html || this.$oel.html()), this.$box = this.$box || this.$oel, this.opts.fullPage && (this.opts.iframe = !0), this.opts.iframe ? (this.$iframe = Ee('<iframe src="about:blank" frameBorder="0">'), this.$wp = Ee("<div></div>"), this.$box.html(this.$wp), this.$wp.append(this.$iframe), this.$iframe.get(0).contentWindow.document.open(), this.$iframe.get(0).contentWindow.document.write("<!DOCTYPE html>"), this.$iframe.get(0).contentWindow.document.write("<html><head></head><body></body></html>"), this.$iframe.get(0).contentWindow.document.close(), this.$el = this.$iframe.contents().find("body"), this.el = this.$el.get(0), this.$head = this.$iframe.contents().find("head"), this.$html = this.$iframe.contents().find("html"), this.iframe_document = this.$iframe.get(0).contentWindow.document) : (this.$el = Ee("<div></div>"), this.el = this.$el.get(0), this.$wp = Ee("<div></div>").append(this.$el), this.$box.html(this.$wp)), this.$oel.trigger("froala.doInit") }, this),
            n = Ee.proxy(function() { this.$box = Ee("<div>"), this.$oel.before(this.$box).hide(), this._original_html = this.$oel.val(), this.$oel.parents("form").on("submit." + this.id, Ee.proxy(function() { this.events.trigger("form.submit") }, this)), this.$oel.parents("form").on("reset." + this.id, Ee.proxy(function() { this.events.trigger("form.reset") }, this)), t() }, this),
            r = Ee.proxy(function() { this.$el = this.$oel, this.el = this.$el.get(0), this.$el.attr("contenteditable", !0).css("outline", "none").css("display", "inline-block"), this.opts.multiLine = !1, this.opts.toolbarInline = !1, this.$oel.trigger("froala.doInit") }, this),
            i = Ee.proxy(function() { this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = !1, this.$oel.trigger("froala.doInit") }, this),
            a = Ee.proxy(function() { this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = !1, this.$oel.on("click.popup", function(e) { e.preventDefault() }), this.$oel.trigger("froala.doInit") }, this);
        this.opts.editInPopup ? a() : "TEXTAREA" == e ? n() : "A" == e ? r() : "IMG" == e ? i() : "BUTTON" == e || "INPUT" == e ? (this.opts.editInPopup = !0, this.opts.toolbarInline = !1, a()) : t()
    }, s.prototype.load = function(e) {
        for (var t in e)
            if (e.hasOwnProperty(t)) { if (this[t]) continue; if (Ee.FE.PLUGINS[t] && this.opts.pluginsEnabled.indexOf(t) < 0) continue; if (this[t] = new e[t](this), this[t]._init && (this[t]._init(), this.opts.initOnClick && "core" == t)) return !1 }
    }, s.prototype.destroy = function() {
        this.shared.count--, this.events.$off();
        var e = this.html.get();
        if (this.opts.iframe && (this.events.disableBlur(), this.win.focus(), this.events.enableBlur()), this.events.trigger("destroy", [], !0), this.events.trigger("shared.destroy", undefined, !0), 0 === this.shared.count) {
            for (var t in this.shared) this.shared.hasOwnProperty(t) && (this.shared[t], Ee.FE.SHARED[this.sid][t] = null);
            delete Ee.FE.SHARED[this.sid]
        }
        this.$oel.parents("form").off("." + this.id), this.$oel.off("click.popup"), this.$oel.removeData("froala.editor"), this.$oel.off("froalaEditor"), this.core.destroy(e), Ee.FE.INSTANCES.splice(Ee.FE.INSTANCES.indexOf(this), 1)
    }, Ee.fn.froalaEditor = function(i) {
        for (var a = [], e = 0; e < arguments.length; e++) a.push(arguments[e]);
        if ("string" == typeof i) {
            var o = [];
            return this.each(function() {
                var e = Ee(this).data("froala.editor");
                if (e) {
                    var t, n;
                    if (0 < i.indexOf(".") && e[i.split(".")[0]] ? (e[i.split(".")[0]] && (t = e[i.split(".")[0]]), n = i.split(".")[1]) : (t = e, n = i.split(".")[0]), !t[n]) return Ee.error("Method " + i + " does not exist in Froala Editor.");
                    var r = t[n].apply(e, a.slice(1));
                    r === undefined ? o.push(this) : 0 === o.length && o.push(r)
                }
            }), 1 == o.length ? o[0] : o
        }
        if ("object" == typeof i || !i) return this.each(function() { if (!Ee(this).data("froala.editor")) { new s(this, i) } })
    }, Ee.fn.froalaEditor.Constructor = s, Ee.FroalaEditor = s, Ee.FE = s, Ee.FE.XS = 0, Ee.FE.SM = 1, Ee.FE.MD = 2, Ee.FE.LG = 3;
    if (Ee.FE.LinkRegExCommon = "[a-z\\u0080-\\u009f\\u00a1-\\uffff0-9-_.]{1,}", Ee.FE.LinkRegExEnd = "((:[0-9]{1,5})|)(((\\/|\\?|#)[a-z\\u00a1-\\uffff0-9@?\\|!^=%&amp;/~+#-\\'*-_{}]*)|())", Ee.FE.LinkRegExTLD = "((" + Ee.FE.LinkRegExCommon + ")(\\.(com|net|org|edu|mil|gov|co|biz|info|me|dev)))", Ee.FE.LinkRegExHTTP = "((ftp|http|https):\\/\\/" + Ee.FE.LinkRegExCommon + ")", Ee.FE.LinkRegExAuth = "((ftp|http|https):\\/\\/[\\u0021-\\uffff]{1,}@" + Ee.FE.LinkRegExCommon + ")", Ee.FE.LinkRegExWWW = "(www\\." + Ee.FE.LinkRegExCommon + "\\.[a-z0-9-]{2,24})", Ee.FE.LinkRegEx = "(" + Ee.FE.LinkRegExTLD + "|" + Ee.FE.LinkRegExHTTP + "|" + Ee.FE.LinkRegExWWW + "|" + Ee.FE.LinkRegExAuth + ")" + Ee.FE.LinkRegExEnd, Ee.FE.LinkProtocols = ["mailto", "tel", "sms", "notes", "data"], Ee.FE.MAIL_REGEX = /.+@.+\..+/i, Ee.FE.MODULES.helpers = function(a) {
            function e() {
                var e, t, n = {},
                    r = (t = -1, "Microsoft Internet Explorer" == navigator.appName ? (e = navigator.userAgent, null !== new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))) : "Netscape" == navigator.appName && (e = navigator.userAgent, null !== new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))), t);
                if (0 < r) n.msie = !0;
                else {
                    var i = navigator.userAgent.toLowerCase(),
                        a = /(edge)[ \/]([\w.]+)/.exec(i) || /(chrome)[ \/]([\w.]+)/.exec(i) || /(webkit)[ \/]([\w.]+)/.exec(i) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(i) || /(msie) ([\w.]+)/.exec(i) || i.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(i) || [],
                        o = a[1] || "";
                    a[2];
                    a[1] && (n[o] = !0), n.chrome ? n.webkit = !0 : n.webkit && (n.safari = !0)
                }
                return n.msie && (n.version = r), n
            }

            function t() { return /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && !i() }

            function n() { return /(Android)/g.test(navigator.userAgent) && !i() }

            function r() { return /(Blackberry)/g.test(navigator.userAgent) }

            function i() { return /(Windows Phone)/gi.test(navigator.userAgent) }

            function o(e) { return parseInt(e, 10) || 0 }
            var s;
            var l = null;
            return {
                _init: function() {
                    a.browser = e(),
                        function() {
                            function e(e, t) {
                                var a = e[t];
                                e[t] = function(e) {
                                    var t, n = !1,
                                        r = !1;
                                    if (e && e.match(s)) { e = e.replace(s, ""), this.parentNode || (o.appendChild(this), r = !0); var i = this.parentNode; return this.id || (this.id = "rootedQuerySelector_id_" + (new Date).getTime(), n = !0), t = a.call(i, "#" + this.id + " " + e), n && (this.id = ""), r && o.removeChild(this), t }
                                    return a.call(this, e)
                                }
                            }
                            var o = a.o_doc.createElement("div");
                            try { o.querySelectorAll(":scope *") } catch (t) {
                                var s = /^\s*:scope/gi;
                                e(Element.prototype, "querySelector"), e(Element.prototype, "querySelectorAll"), e(HTMLElement.prototype, "querySelector"), e(HTMLElement.prototype, "querySelectorAll")
                            }
                        }(), Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(e) {
                            var t = this;
                            if (!t) return null;
                            if (!document.documentElement.contains(this)) return null;
                            do {
                                if (t.matches(e)) return t;
                                t = t.parentElement
                            } while (null !== t);
                            return null
                        })
                },
                isIOS: t,
                isMac: function() { return null == l && (l = 0 <= navigator.platform.toUpperCase().indexOf("MAC")), l },
                isAndroid: n,
                isBlackberry: r,
                isWindowsPhone: i,
                isMobile: function() { return n() || t() || r() },
                isEmail: function(e) { return !/^(https?:|ftps?:|)\/\//i.test(e) && Ee.FE.MAIL_REGEX.test(e) },
                requestAnimationFrame: function() { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) { window.setTimeout(e, 1e3 / 60) } },
                getPX: o,
                screenSize: function() { var e = Ee('<div class="fr-visibility-helper"></div>').appendTo("body:first"); try { var t = o(e.css("margin-left")); return e.remove(), t } catch (n) { return Ee.FE.LG } },
                isTouch: function() { return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch },
                sanitizeURL: function(e) { return /^(https?:|ftps?:|)\/\//i.test(e) ? e : /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(e) ? e : new RegExp("^(" + Ee.FE.LinkProtocols.join("|") + "):\\/\\/", "i").test(e) ? e : e = encodeURIComponent(e).replace(/%23/g, "#").replace(/%2F/g, "/").replace(/%25/g, "%").replace(/mailto%3A/gi, "mailto:").replace(/file%3A/gi, "file:").replace(/sms%3A/gi, "sms:").replace(/tel%3A/gi, "tel:").replace(/notes%3A/gi, "notes:").replace(/data%3Aimage/gi, "data:image").replace(/blob%3A/gi, "blob:").replace(/webkit-fake-url%3A/gi, "webkit-fake-url:").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&").replace(/&amp;/g, "&").replace(/%2C/g, ",").replace(/%3B/g, ";").replace(/%2B/g, "+").replace(/%40/g, "@").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/%7B/g, "{").replace(/%7D/g, "}") },
                isArray: function(e) { return e && !e.propertyIsEnumerable("length") && "object" == typeof e && "number" == typeof e.length },
                RGBToHex: function(e) {
                    function t(e) { return ("0" + parseInt(e, 10).toString(16)).slice(-2) }
                    try { return e && "transparent" !== e ? /^#[0-9A-F]{6}$/i.test(e) ? e : ("#" + t((e = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))[1]) + t(e[2]) + t(e[3])).toUpperCase() : "" } catch (n) { return null }
                },
                HEXtoRGB: function(e) { e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(e, t, n, r) { return t + t + n + n + r + r }); var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e); return t ? "rgb(" + parseInt(t[1], 16) + ", " + parseInt(t[2], 16) + ", " + parseInt(t[3], 16) + ")" : "" },
                isURL: function(e) { return !!/^(https?:|ftps?:|)\/\//i.test(e) && (e = String(e).replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/ /g, "%20"), new RegExp("^" + Ee.FE.LinkRegExHTTP + Ee.FE.LinkRegExEnd + "$", "gi").test(e)) },
                getAlignment: function(e) {
                    var t = (e.css("text-align") || "").replace(/-(.*)-/g, "");
                    if (["left", "right", "justify", "center"].indexOf(t) < 0) {
                        if (!s) {
                            var n = Ee('<div dir="' + ("rtl" == a.opts.direction ? "rtl" : "auto") + '" style="text-align: ' + a.$el.css("text-align") + '; position: fixed; left: -3000px;"><span id="s1">.</span><span id="s2">.</span></div>');
                            Ee("body:first").append(n);
                            var r = n.find("#s1").get(0).getBoundingClientRect().left,
                                i = n.find("#s2").get(0).getBoundingClientRect().left;
                            n.remove(), s = r < i ? "left" : "right"
                        }
                        t = s
                    }
                    return t
                },
                scrollTop: function() { return a.o_win.pageYOffset ? a.o_win.pageYOffset : a.o_doc.documentElement && a.o_doc.documentElement.scrollTop ? a.o_doc.documentElement.scrollTop : a.o_doc.body.scrollTop ? a.o_doc.body.scrollTop : 0 },
                scrollLeft: function() { return a.o_win.pageXOffset ? a.o_win.pageXOffset : a.o_doc.documentElement && a.o_doc.documentElement.scrollLeft ? a.o_doc.documentElement.scrollLeft : a.o_doc.body.scrollLeft ? a.o_doc.body.scrollLeft : 0 },
                isInViewPort: function(e) { var t = e.getBoundingClientRect(); return 0 <= t.top && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) || t.top <= 0 && t.bottom >= (window.innerHeight || document.documentElement.clientHeight) }
            }
        }, Ee.FE.MODULES.events = function(s) {
            var e, o = {};

            function t(e, t, n) { f(e, t, n) }

            function n(e) {
                if (void 0 === e && (e = !0), !s.$wp) return !1;
                if (s.helpers.isIOS() && s.$win.get(0).focus(), s.core.hasFocus()) return !1;
                if (!s.core.hasFocus() && e) { var t = s.$win.scrollTop(); if (s.browser.msie && s.$box && s.$box.css("position", "fixed"), s.browser.msie && s.$wp && s.$wp.css("overflow", "visible"), a(), s.$el.focus(), s.events.trigger("focus"), i(), s.browser.msie && s.$box && s.$box.css("position", ""), s.browser.msie && s.$wp && s.$wp.css("overflow", "auto"), t != s.$win.scrollTop() && s.$win.scrollTop(t), !s.selection.info(s.el).atStart) return !1 }
                if (!s.core.hasFocus() || 0 < s.$el.find(".fr-marker").length) return !1;
                if (s.selection.info(s.el).atStart && s.selection.isCollapsed() && null != s.html.defaultTag()) {
                    var n = s.markers.insert();
                    if (n && !s.node.blockParent(n)) {
                        Ee(n).remove();
                        var r = s.$el.find(s.html.blockTagsQuery()).get(0);
                        r && (Ee(r).prepend(Ee.FE.MARKERS), s.selection.restore())
                    } else n && Ee(n).remove()
                }
            }
            var r = !1;

            function i() { e = !0 }

            function a() { e = !1 }

            function l() { return e }

            function d(e, t, n) {
                var r, i = e.split(" ");
                if (1 < i.length) { for (var a = 0; a < i.length; a++) d(i[a], t, n); return !0 }
                void 0 === n && (n = !1), r = 0 !== e.indexOf("shared.") ? o[e] = o[e] || [] : s.shared._events[e] = s.shared._events[e] || [], n ? r.unshift(t) : r.push(t)
            }
            var c = [];

            function f(e, t, n, r, i) {
                "function" == typeof n && (i = r, r = n, n = !1);
                var a = i ? s.shared.$_events : c,
                    o = i ? s.sid : s.id;
                n ? e.on(t.split(" ").join(".ed" + o + " ") + ".ed" + o, n, r) : e.on(t.split(" ").join(".ed" + o + " ") + ".ed" + o, r), a.push([e, t.split(" ").join(".ed" + o + " ") + ".ed" + o])
            }

            function p(e) { for (var t = 0; t < e.length; t++) e[t][0].off(e[t][1]) }

            function u(e, t, n) {
                if (!s.edit.isDisabled() || n) {
                    var r, i;
                    if (0 !== e.indexOf("shared.")) r = o[e];
                    else {
                        if (0 < s.shared.count) return !1;
                        r = s.shared._events[e]
                    }
                    if (r)
                        for (var a = 0; a < r.length; a++)
                            if (!1 === (i = r[a].apply(s, t))) return !1;
                    return !1 !== (i = s.$oel.triggerHandler("froalaEditor." + e, Ee.merge([s], t || []))) && i
                }
            }

            function h() { for (var e in o) o.hasOwnProperty(e) && delete o[e] }

            function g() { for (var e in s.shared._events) s.shared._events.hasOwnProperty(e) && delete s.shared._events[e] }
            return {
                _init: function() { s.shared.$_events = s.shared.$_events || [], s.shared._events = {}, s.helpers.isMobile() ? (s._mousedown = "touchstart", s._mouseup = "touchend", s._move = "touchmove", s._mousemove = "touchmove") : (s._mousedown = "mousedown", s._mouseup = "mouseup", s._move = "", s._mousemove = "mousemove"), t(s.$el, "click mouseup mousedown touchstart touchend dragenter dragover dragleave dragend drop dragstart", function(e) { u(e.type, [e]) }), d("mousedown", function() { for (var e = 0; e < Ee.FE.INSTANCES.length; e++) Ee.FE.INSTANCES[e] != s && Ee.FE.INSTANCES[e].popups && Ee.FE.INSTANCES[e].popups.areVisible() && Ee.FE.INSTANCES[e].$el.find(".fr-marker").remove() }), t(s.$win, s._mousedown, function(e) { u("window.mousedown", [e]), i() }), t(s.$win, s._mouseup, function(e) { u("window.mouseup", [e]) }), t(s.$win, "cut copy keydown keyup touchmove touchend", function(e) { u("window." + e.type, [e]) }), t(s.$doc, "dragend drop", function(e) { u("document." + e.type, [e]) }), t(s.$el, "keydown keypress keyup input", function(e) { u(e.type, [e]) }), t(s.$el, "focus", function(e) { l() && (n(!1), !1 === r && u(e.type, [e])) }), t(s.$el, "blur", function(e) { l() && !0 === r && (u(e.type, [e]), i()) }), d("focus", function() { r = !0 }), d("blur", function() { r = !1 }), i(), t(s.$el, "cut copy paste beforepaste", function(e) { u(e.type, [e]) }), d("destroy", h), d("shared.destroy", g) },
                on: d,
                trigger: u,
                bindClick: function(e, t, n) {
                    f(e, s._mousedown, t, function(e) {
                        var t, n;
                        s.edit.isDisabled() || (n = Ee((t = e).currentTarget), s.edit.isDisabled() || s.node.hasClass(n.get(0), "fr-disabled") ? t.preventDefault() : "mousedown" === t.type && 1 !== t.which || (s.helpers.isMobile() || t.preventDefault(), (s.helpers.isAndroid() || s.helpers.isWindowsPhone()) && 0 === n.parents(".fr-dropdown-menu").length && (t.preventDefault(), t.stopPropagation()), n.addClass("fr-selected"), s.events.trigger("commands.mousedown", [n])))
                    }, !0), f(e, s._mouseup + " " + s._move, t, function(e) {
                        s.edit.isDisabled() || function(e, t) {
                            var n = Ee(e.currentTarget);
                            if (s.edit.isDisabled() || s.node.hasClass(n.get(0), "fr-disabled")) return e.preventDefault();
                            if (("mouseup" !== e.type || 1 === e.which) && s.node.hasClass(n.get(0), "fr-selected"))
                                if ("touchmove" != e.type) {
                                    if (e.stopPropagation(), e.stopImmediatePropagation(), e.preventDefault(), !s.node.hasClass(n.get(0), "fr-selected")) return s.button.getButtons(".fr-selected", !0).removeClass("fr-selected");
                                    if (s.button.getButtons(".fr-selected", !0).removeClass("fr-selected"), n.data("dragging") || n.attr("disabled")) return n.removeData("dragging");
                                    var r = n.data("timeout");
                                    r && (clearTimeout(r), n.removeData("timeout")), t.apply(s, [e])
                                } else n.data("timeout") || n.data("timeout", setTimeout(function() { n.data("dragging", !0) }, 100))
                        }(e, n)
                    }, !0), f(e, "mousedown click mouseup", t, function(e) { s.edit.isDisabled() || e.stopPropagation() }, !0), d("window.mouseup", function() { s.edit.isDisabled() || (e.find(t).removeClass("fr-selected"), i()) })
                },
                disableBlur: a,
                enableBlur: i,
                blurActive: l,
                focus: n,
                chainTrigger: function(e, t, n) {
                    if (!s.edit.isDisabled() || n) {
                        var r, i;
                        if (0 !== e.indexOf("shared.")) r = o[e];
                        else {
                            if (0 < s.shared.count) return !1;
                            r = s.shared._events[e]
                        }
                        if (r)
                            for (var a = 0; a < r.length; a++) void 0 !== (i = r[a].apply(s, [t])) && (t = i);
                        return void 0 !== (i = s.$oel.triggerHandler("froalaEditor." + e, Ee.merge([s], [t]))) && (t = i), t
                    }
                },
                $on: f,
                $off: function() { p(c), c = [], 0 === s.shared.count && (p(s.shared.$_events), s.shared.$_events = []) }
            }
        }, Ee.FE.MODULES.node = function(o) {
            function s(e) { return e && "IFRAME" != e.tagName ? Array.prototype.slice.call(e.childNodes || []) : [] }

            function l(e) { return !!e && (e.nodeType == Node.ELEMENT_NODE && 0 <= Ee.FE.BLOCK_TAGS.indexOf(e.tagName.toLowerCase())) }

            function d(e) {
                var t = {},
                    n = e.attributes;
                if (n)
                    for (var r = 0; r < n.length; r++) {
                        var i = n[r];
                        t[i.nodeName] = i.value
                    }
                return t
            }

            function t(e) {
                for (var t = "", n = d(e), r = Object.keys(n).sort(), i = 0; i < r.length; i++) {
                    var a = r[i],
                        o = n[a];
                    o.indexOf("'") < 0 && 0 <= o.indexOf('"') ? t += " " + a + "='" + o + "'" : 0 <= o.indexOf('"') && 0 <= o.indexOf("'") ? t += " " + a + '="' + (o = o.replace(/"/g, "&quot;")) + '"' : t += " " + a + '="' + o + '"'
                }
                return t
            }

            function n(e) { return e === o.el }
            return {
                isBlock: l,
                isEmpty: function(e, t) {
                    if (!e) return !0;
                    if (e.querySelector("table")) return !1;
                    var n = s(e);
                    1 == n.length && l(n[0]) && (n = s(n[0]));
                    for (var r = !1, i = 0; i < n.length; i++) { var a = n[i]; if (!(t && o.node.hasClass(a, "fr-marker") || a.nodeType == Node.TEXT_NODE && 0 === a.textContent.length)) { if ("BR" != a.tagName && 0 < (a.textContent || "").replace(/\u200B/gi, "").replace(/\n/g, "").length) return !1; if (r) return !1; "BR" == a.tagName && (r = !0) } }
                    return !(e.querySelectorAll(Ee.FE.VOID_ELEMENTS.join(",")).length - e.querySelectorAll("br").length || e.querySelector(o.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)") || 1 < e.querySelectorAll(Ee.FE.BLOCK_TAGS.join(",")).length || e.querySelector(o.opts.htmlDoNotWrapTags.join(":not(.fr-marker),") + ":not(.fr-marker)"))
                },
                blockParent: function(e) {
                    for (; e && e.parentNode !== o.el && (!e.parentNode || !o.node.hasClass(e.parentNode, "fr-inner"));)
                        if (l(e = e.parentNode)) return e;
                    return null
                },
                deepestParent: function(e, t, n) { if (void 0 === t && (t = []), void 0 === n && (n = !0), t.push(o.el), 0 <= t.indexOf(e.parentNode) || e.parentNode && o.node.hasClass(e.parentNode, "fr-inner") || e.parentNode && 0 <= Ee.FE.SIMPLE_ENTER_TAGS.indexOf(e.parentNode.tagName) && n) return null; for (; t.indexOf(e.parentNode) < 0 && e.parentNode && !o.node.hasClass(e.parentNode, "fr-inner") && (Ee.FE.SIMPLE_ENTER_TAGS.indexOf(e.parentNode.tagName) < 0 || !n) && (!l(e) || !l(e.parentNode) || !n);) e = e.parentNode; return e },
                rawAttributes: d,
                attributes: t,
                clearAttributes: function(e) {
                    for (var t = e.attributes, n = t.length - 1; 0 <= n; n--) {
                        var r = t[n];
                        e.removeAttribute(r.nodeName)
                    }
                },
                openTagString: function(e) { return "<" + e.tagName.toLowerCase() + t(e) + ">" },
                closeTagString: function(e) { return "</" + e.tagName.toLowerCase() + ">" },
                isFirstSibling: function e(t, n) { void 0 === n && (n = !0); for (var r = t.previousSibling; r && n && o.node.hasClass(r, "fr-marker");) r = r.previousSibling; return !r || r.nodeType == Node.TEXT_NODE && "" === r.textContent && e(r) },
                isLastSibling: function e(t, n) { void 0 === n && (n = !0); for (var r = t.nextSibling; r && n && o.node.hasClass(r, "fr-marker");) r = r.nextSibling; return !r || r.nodeType == Node.TEXT_NODE && "" === r.textContent && e(r) },
                isList: function(e) { return !!e && 0 <= ["UL", "OL"].indexOf(e.tagName) },
                isLink: function(e) { return !!e && e.nodeType == Node.ELEMENT_NODE && "a" == e.tagName.toLowerCase() },
                isElement: n,
                contents: s,
                isVoid: function(e) { return e && e.nodeType == Node.ELEMENT_NODE && 0 <= Ee.FE.VOID_ELEMENTS.indexOf((e.tagName || "").toLowerCase()) },
                hasFocus: function(e) { return e === o.doc.activeElement && (!o.doc.hasFocus || o.doc.hasFocus()) && !!(n(e) || e.type || e.href || ~e.tabIndex) },
                isEditable: function(e) { return (!e.getAttribute || "false" != e.getAttribute("contenteditable")) && ["STYLE", "SCRIPT"].indexOf(e.tagName) < 0 },
                isDeletable: function(e) { return e && e.nodeType == Node.ELEMENT_NODE && e.getAttribute("class") && 0 <= (e.getAttribute("class") || "").indexOf("fr-deletable") },
                hasClass: function(e, t) { return e instanceof Ee && (e = e.get(0)), e && e.classList && e.classList.contains(t) },
                filter: function(e) { return o.browser.msie ? e : { acceptNode: e } }
            }
        }, Ee.FE.INVISIBLE_SPACE = "&#8203;", Ee.FE.START_MARKER = '<span class="fr-marker" data-id="0" data-type="true" style="display: none; line-height: 0;">' + Ee.FE.INVISIBLE_SPACE + "</span>", Ee.FE.END_MARKER = '<span class="fr-marker" data-id="0" data-type="false" style="display: none; line-height: 0;">' + Ee.FE.INVISIBLE_SPACE + "</span>", Ee.FE.MARKERS = Ee.FE.START_MARKER + Ee.FE.END_MARKER, Ee.FE.MODULES.markers = function(d) {
            function l() {
                if (!d.$wp) return null;
                try {
                    var e = d.selection.ranges(0),
                        t = e.commonAncestorContainer;
                    if (t != d.el && 0 === d.$el.find(t).length) return null;
                    var n = e.cloneRange(),
                        r = e.cloneRange();
                    n.collapse(!0);
                    var i = Ee('<span class="fr-marker" style="display: none; line-height: 0;">' + Ee.FE.INVISIBLE_SPACE + "</span>", d.doc)[0];
                    if (n.insertNode(i), i = d.$el.find("span.fr-marker").get(0)) { for (var a = i.nextSibling; a && a.nodeType === Node.TEXT_NODE && 0 === a.textContent.length;) Ee(a).remove(), a = d.$el.find("span.fr-marker").get(0).nextSibling; return d.selection.clear(), d.selection.get().addRange(r), i }
                    return null
                } catch (o) {}
            }

            function c() { d.$el.find(".fr-marker").remove() }
            return {
                place: function(e, t, n) {
                    var r, i, a;
                    try {
                        var o = e.cloneRange();
                        if (o.collapse(t), o.insertNode(Ee('<span class="fr-marker" data-id="' + n + '" data-type="' + t + '" style="display: ' + (d.browser.safari ? "none" : "inline-block") + '; line-height: 0;">' + Ee.FE.INVISIBLE_SPACE + "</span>", d.doc)[0]), !0 === t)
                            for (a = (r = d.$el.find('span.fr-marker[data-type="true"][data-id="' + n + '"]').get(0)).nextSibling; a && a.nodeType === Node.TEXT_NODE && 0 === a.textContent.length;) Ee(a).remove(), a = r.nextSibling;
                        if (!0 === t && !e.collapsed) {
                            for (; !d.node.isElement(r.parentNode) && !a;) Ee(r.parentNode).after(r), a = r.nextSibling;
                            if (a && a.nodeType === Node.ELEMENT_NODE && d.node.isBlock(a) && "HR" !== a.tagName) {
                                for (i = [a]; a = i[0], (i = d.node.contents(a))[0] && d.node.isBlock(i[0]););
                                Ee(a).prepend(Ee(r))
                            }
                        }
                        if (!1 === t && !e.collapsed) {
                            if ((a = (r = d.$el.find('span.fr-marker[data-type="false"][data-id="' + n + '"]').get(0)).previousSibling) && a.nodeType === Node.ELEMENT_NODE && d.node.isBlock(a) && "HR" !== a.tagName) {
                                for (i = [a]; a = i[i.length - 1], (i = d.node.contents(a))[i.length - 1] && d.node.isBlock(i[i.length - 1]););
                                Ee(a).append(Ee(r))
                            }
                            r.parentNode && 0 <= ["TD", "TH"].indexOf(r.parentNode.tagName) && r.parentNode.previousSibling && !r.previousSibling && Ee(r.parentNode.previousSibling).append(r)
                        }
                        var s = d.$el.find('span.fr-marker[data-type="' + t + '"][data-id="' + n + '"]').get(0);
                        return s && (s.style.display = "none"), s
                    } catch (l) { return null }
                },
                insert: l,
                split: function() {
                    d.selection.isCollapsed() || d.selection.remove();
                    var e = d.$el.find(".fr-marker").get(0);
                    if (null == e && (e = l()), null == e) return null;
                    var t = d.node.deepestParent(e);
                    if (t || (t = d.node.blockParent(e)) && "LI" != t.tagName && (t = null), t)
                        if (d.node.isBlock(t) && d.node.isEmpty(t)) "LI" != t.tagName || t.parentNode.firstElementChild != t || d.node.isEmpty(t.parentNode) ? Ee(t).replaceWith('<span class="fr-marker"></span>') : Ee(t).append('<span class="fr-marker"></span>');
                        else if (d.cursor.isAtStart(e, t)) Ee(t).before('<span class="fr-marker"></span>'), Ee(e).remove();
                    else if (d.cursor.isAtEnd(e, t)) Ee(t).after('<span class="fr-marker"></span>'), Ee(e).remove();
                    else {
                        for (var n = e, r = "", i = ""; n = n.parentNode, r += d.node.closeTagString(n), i = d.node.openTagString(n) + i, n != t;);
                        Ee(e).replaceWith('<span id="fr-break"></span>');
                        var a = d.node.openTagString(t) + Ee(t).html() + d.node.closeTagString(t);
                        a = a.replace(/<span id="fr-break"><\/span>/g, r + '<span class="fr-marker"></span>' + i), Ee(t).replaceWith(a)
                    }
                    return d.$el.find(".fr-marker").get(0)
                },
                insertAtPoint: function(e) {
                    var t, n = e.clientX,
                        r = e.clientY;
                    c();
                    var i = null;
                    if ("undefined" != typeof d.doc.caretPositionFromPoint ? (t = d.doc.caretPositionFromPoint(n, r), (i = d.doc.createRange()).setStart(t.offsetNode, t.offset), i.setEnd(t.offsetNode, t.offset)) : "undefined" != typeof d.doc.caretRangeFromPoint && (t = d.doc.caretRangeFromPoint(n, r), (i = d.doc.createRange()).setStart(t.startContainer, t.startOffset), i.setEnd(t.startContainer, t.startOffset)), null !== i && "undefined" != typeof d.win.getSelection) {
                        var a = d.win.getSelection();
                        a.removeAllRanges(), a.addRange(i)
                    } else if ("undefined" != typeof d.doc.body.createTextRange) try {
                        (i = d.doc.body.createTextRange()).moveToPoint(n, r);
                        var o = i.duplicate();
                        o.moveToPoint(n, r), i.setEndPoint("EndToEnd", o), i.select()
                    } catch (s) { return !1 }
                    l()
                },
                remove: c
            }
        }, Ee.FE.MODULES.selection = function(T) {
            function s() { var e = ""; return T.win.getSelection ? e = T.win.getSelection() : T.doc.getSelection ? e = T.doc.getSelection() : T.doc.selection && (e = T.doc.selection.createRange().text), e.toString() }

            function A() { return T.win.getSelection ? T.win.getSelection() : T.doc.getSelection ? T.doc.getSelection() : T.doc.selection.createRange() }

            function c(e) {
                var t = A(),
                    n = [];
                if (t && t.getRangeAt && t.rangeCount) { n = []; for (var r = 0; r < t.rangeCount; r++) n.push(t.getRangeAt(r)) } else n = T.doc.createRange ? [T.doc.createRange()] : [];
                return void 0 !== e ? n[e] : n
            }

            function C() { var e = A(); try { e.removeAllRanges ? e.removeAllRanges() : e.empty ? e.empty() : e.clear && e.clear() } catch (t) {} }

            function f(e, t) { var n = e; return n.nodeType == Node.ELEMENT_NODE && 0 < n.childNodes.length && n.childNodes[t] && (n = n.childNodes[t]), n.nodeType == Node.TEXT_NODE && (n = n.parentNode), n }

            function S() {
                if (T.$wp) {
                    T.markers.remove();
                    var e, t, n = c(),
                        r = [];
                    for (t = 0; t < n.length; t++)
                        if (n[t].startContainer !== T.doc || T.browser.msie) {
                            var i = (e = n[t]).collapsed,
                                a = T.markers.place(e, !0, t),
                                o = T.markers.place(e, !1, t);
                            void 0 !== a && a || !i || (Ee(".fr-marker").remove(), T.selection.setAtEnd(T.el)), T.el.normalize(), T.browser.safari && !i && ((e = T.doc.createRange()).setStartAfter(a), e.setEndBefore(o), r.push(e))
                        }
                    if (T.browser.safari && r.length)
                        for (T.selection.clear(), t = 0; t < r.length; t++) T.selection.get().addRange(r[t])
                }
            }

            function R() {
                var e, t = T.el.querySelectorAll('.fr-marker[data-type="true"]');
                if (!T.$wp) return T.markers.remove(), !1;
                if (0 === t.length) return !1;
                if (T.browser.msie || T.browser.edge)
                    for (e = 0; e < t.length; e++) t[e].style.display = "inline-block";
                T.core.hasFocus() || T.browser.msie || T.browser.webkit || T.$el.focus(), C();
                var n = A();
                for (e = 0; e < t.length; e++) {
                    var r = Ee(t[e]).data("id"),
                        i = t[e],
                        a = T.doc.createRange(),
                        o = T.$el.find('.fr-marker[data-type="false"][data-id="' + r + '"]');
                    (T.browser.msie || T.browser.edge) && o.css("display", "inline-block");
                    var s = null;
                    if (0 < o.length) {
                        o = o[0];
                        try {
                            for (var l, d = !1, c = i.nextSibling; c && c.nodeType == Node.TEXT_NODE && 0 === c.textContent.length;) c = (l = c).nextSibling, Ee(l).remove();
                            for (var f, p, u = o.nextSibling; u && u.nodeType == Node.TEXT_NODE && 0 === u.textContent.length;) u = (l = u).nextSibling, Ee(l).remove();
                            if (i.nextSibling == o || o.nextSibling == i) {
                                for (var h = i.nextSibling == o ? i : o, g = h == i ? o : i, m = h.previousSibling; m && m.nodeType == Node.TEXT_NODE && 0 === m.length;) m = (l = m).previousSibling, Ee(l).remove();
                                if (m && m.nodeType == Node.TEXT_NODE)
                                    for (; m && m.previousSibling && m.previousSibling.nodeType == Node.TEXT_NODE;) m.previousSibling.textContent = m.previousSibling.textContent + m.textContent, m = m.previousSibling, Ee(m.nextSibling).remove();
                                for (var v = g.nextSibling; v && v.nodeType == Node.TEXT_NODE && 0 === v.length;) v = (l = v).nextSibling, Ee(l).remove();
                                if (v && v.nodeType == Node.TEXT_NODE)
                                    for (; v && v.nextSibling && v.nextSibling.nodeType == Node.TEXT_NODE;) v.nextSibling.textContent = v.textContent + v.nextSibling.textContent, v = v.nextSibling, Ee(v.previousSibling).remove();
                                if (m && (T.node.isVoid(m) || T.node.isBlock(m)) && (m = null), v && (T.node.isVoid(v) || T.node.isBlock(v)) && (v = null), m && v && m.nodeType == Node.TEXT_NODE && v.nodeType == Node.TEXT_NODE) {
                                    Ee(i).remove(), Ee(o).remove();
                                    var E = m.textContent.length;
                                    m.textContent = m.textContent + v.textContent, Ee(v).remove(), T.opts.htmlUntouched || T.spaces.normalize(m), a.setStart(m, E), a.setEnd(m, E), d = !0
                                } else !m && v && v.nodeType == Node.TEXT_NODE ? (Ee(i).remove(), Ee(o).remove(), T.opts.htmlUntouched || T.spaces.normalize(v), s = Ee(T.doc.createTextNode("\u200b")), Ee(v).before(s), a.setStart(v, 0), a.setEnd(v, 0), d = !0) : !v && m && m.nodeType == Node.TEXT_NODE && (Ee(i).remove(), Ee(o).remove(), T.opts.htmlUntouched || T.spaces.normalize(m), s = Ee(T.doc.createTextNode("\u200b")), Ee(m).after(s), a.setStart(m, m.textContent.length), a.setEnd(m, m.textContent.length), d = !0)
                            }
                            if (!d)(T.browser.chrome || T.browser.edge) && i.nextSibling == o ? (f = y(o, a, !0) || a.setStartAfter(o), p = y(i, a, !1) || a.setEndBefore(i)) : (i.previousSibling == o && (o = (i = o).nextSibling), o.nextSibling && "BR" === o.nextSibling.tagName || !o.nextSibling && T.node.isBlock(i.previousSibling) || i.previousSibling && "BR" == i.previousSibling.tagName || (i.style.display = "inline", o.style.display = "inline", s = Ee(T.doc.createTextNode("\u200b"))), f = y(i, a, !0) || Ee(i).before(s) && a.setStartBefore(i), p = y(o, a, !1) || Ee(o).after(s) && a.setEndAfter(o)), "function" == typeof f && f(), "function" == typeof p && p()
                        } catch (b) {}
                    }
                    s && s.remove();
                    try { n.addRange(a) } catch (b) {}
                }
                T.markers.remove()
            }

            function y(e, t, n) {
                var r, i = e.previousSibling,
                    a = e.nextSibling;
                return i && a && i.nodeType == Node.TEXT_NODE && a.nodeType == Node.TEXT_NODE ? (r = i.textContent.length, n ? (a.textContent = i.textContent + a.textContent, Ee(i).remove(), Ee(e).remove(), T.opts.htmlUntouched || T.spaces.normalize(a), function() { t.setStart(a, r) }) : (i.textContent = i.textContent + a.textContent, Ee(a).remove(), Ee(e).remove(), T.opts.htmlUntouched || T.spaces.normalize(i), function() { t.setEnd(i, r) })) : i && !a && i.nodeType == Node.TEXT_NODE ? (r = i.textContent.length, n ? (T.opts.htmlUntouched || T.spaces.normalize(i), function() { t.setStart(i, r) }) : (T.opts.htmlUntouched || T.spaces.normalize(i), function() { t.setEnd(i, r) })) : !(!a || i || a.nodeType != Node.TEXT_NODE) && (n ? (T.opts.htmlUntouched || T.spaces.normalize(a), function() { t.setStart(a, 0) }) : (T.opts.htmlUntouched || T.spaces.normalize(a), function() { t.setEnd(a, 0) }))
            }

            function _() {
                for (var e = c(), t = 0; t < e.length; t++)
                    if (!e[t].collapsed) return !1;
                return !0
            }

            function i(e) {
                var t, n, r = !1,
                    i = !1;
                if (T.win.getSelection) {
                    var a = T.win.getSelection();
                    a.rangeCount && ((n = (t = a.getRangeAt(0)).cloneRange()).selectNodeContents(e), n.setEnd(t.startContainer, t.startOffset), r = "" === n.toString(), n.selectNodeContents(e), n.setStart(t.endContainer, t.endOffset), i = "" === n.toString())
                } else T.doc.selection && "Control" != T.doc.selection.type && ((n = (t = T.doc.selection.createRange()).duplicate()).moveToElementText(e), n.setEndPoint("EndToStart", t), r = "" === n.text, n.moveToElementText(e), n.setEndPoint("StartToEnd", t), i = "" === n.text);
                return { atStart: r, atEnd: i }
            }

            function L(e, t) {
                void 0 === t && (t = !0);
                var n = Ee(e).html();
                n && n.replace(/\u200b/g, "").length != n.length && Ee(e).html(n.replace(/\u200b/g, ""));
                for (var r = T.node.contents(e), i = 0; i < r.length; i++) r[i].nodeType != Node.ELEMENT_NODE ? Ee(r[i]).remove() : (L(r[i], 0 === i), 0 === i && (t = !1));
                e.nodeType == Node.TEXT_NODE ? Ee(e).replaceWith('<span data-first="true" data-text="true"></span>') : t && Ee(e).attr("data-first", !0)
            }

            function x() { return 0 === Ee(this).find("fr-inner").length }

            function p() { try { if (!T.$wp) return !1; for (var e = c(0).commonAncestorContainer; e && !T.node.isElement(e);) e = e.parentNode; return !!T.node.isElement(e) } catch (t) { return !1 } }

            function r(e, t) {
                if (!e || 0 < e.getElementsByClassName("fr-marker").length) return !1;
                for (var n = e.firstChild; n && (T.node.isBlock(n) || t && !T.node.isVoid(n) && n.nodeType == Node.ELEMENT_NODE);) n = (e = n).firstChild;
                e.innerHTML = Ee.FE.MARKERS + e.innerHTML
            }

            function a(e, t) {
                if (!e || 0 < e.getElementsByClassName("fr-marker").length) return !1;
                for (var n = e.lastChild; n && (T.node.isBlock(n) || t && !T.node.isVoid(n) && n.nodeType == Node.ELEMENT_NODE);) n = (e = n).lastChild;
                var r = T.doc.createElement("SPAN");
                r.setAttribute("id", "fr-sel-markers"), r.innerHTML = Ee.FE.MARKERS, e.appendChild(r);
                var i = e.querySelector("#fr-sel-markers");
                i.outerHTML = i.innerHTML
            }
            return {
                text: s,
                get: A,
                ranges: c,
                clear: C,
                element: function() {
                    var e = A();
                    try {
                        if (e.rangeCount) {
                            var t, n = c(0),
                                r = n.startContainer;
                            if (r.nodeType == Node.TEXT_NODE && n.startOffset == (r.textContent || "").length && r.nextSibling && (r = r.nextSibling), r.nodeType == Node.ELEMENT_NODE) {
                                var i = !1;
                                if (0 < r.childNodes.length && r.childNodes[n.startOffset]) {
                                    for (t = r.childNodes[n.startOffset]; t && t.nodeType == Node.TEXT_NODE && 0 === t.textContent.length;) t = t.nextSibling;
                                    if (t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, i = !0), !i && 1 < r.childNodes.length && 0 < n.startOffset && r.childNodes[n.startOffset - 1]) {
                                        for (t = r.childNodes[n.startOffset - 1]; t && t.nodeType == Node.TEXT_NODE && 0 === t.textContent.length;) t = t.nextSibling;
                                        t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, i = !0)
                                    }
                                } else !n.collapsed && r.nextSibling && r.nextSibling.nodeType == Node.ELEMENT_NODE && (t = r.nextSibling) && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, i = !0);
                                !i && 0 < r.childNodes.length && Ee(r.childNodes[0]).text().replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && ["BR", "IMG", "HR"].indexOf(r.childNodes[0].tagName) < 0 && (r = r.childNodes[0])
                            }
                            for (; r.nodeType != Node.ELEMENT_NODE && r.parentNode;) r = r.parentNode;
                            for (var a = r; a && "HTML" != a.tagName;) {
                                if (a == T.el) return r;
                                a = Ee(a).parent()[0]
                            }
                        }
                    } catch (o) {}
                    return T.el
                },
                endElement: function() {
                    var e = A();
                    try {
                        if (e.rangeCount) {
                            var t, n = c(0),
                                r = n.endContainer;
                            if (r.nodeType == Node.ELEMENT_NODE) {
                                var i = !1;
                                0 < r.childNodes.length && r.childNodes[n.endOffset] && Ee(r.childNodes[n.endOffset]).text() === s() ? (r = r.childNodes[n.endOffset], i = !0) : !n.collapsed && r.previousSibling && r.previousSibling.nodeType == Node.ELEMENT_NODE ? (t = r.previousSibling) && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, i = !0) : !n.collapsed && 0 < r.childNodes.length && r.childNodes[n.endOffset] && (t = r.childNodes[n.endOffset].previousSibling).nodeType == Node.ELEMENT_NODE && t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, i = !0), !i && 0 < r.childNodes.length && Ee(r.childNodes[r.childNodes.length - 1]).text() === s() && ["BR", "IMG", "HR"].indexOf(r.childNodes[r.childNodes.length - 1].tagName) < 0 && (r = r.childNodes[r.childNodes.length - 1])
                            }
                            for (r.nodeType == Node.TEXT_NODE && 0 === n.endOffset && r.previousSibling && r.previousSibling.nodeType == Node.ELEMENT_NODE && (r = r.previousSibling); r.nodeType != Node.ELEMENT_NODE && r.parentNode;) r = r.parentNode;
                            for (var a = r; a && "HTML" != a.tagName;) {
                                if (a == T.el) return r;
                                a = Ee(a).parent()[0]
                            }
                        }
                    } catch (o) {}
                    return T.el
                },
                save: S,
                restore: R,
                isCollapsed: _,
                isFull: function() {
                    if (_()) return !1;
                    T.selection.save();
                    var e, t = T.el.querySelectorAll("td, th, img, br");
                    for (e = 0; e < t.length; e++) t[e].nextSibling && (t[e].innerHTML = '<span class="fr-mk">' + Ee.FE.INVISIBLE_SPACE + "</span>" + t[e].innerHTML);
                    var n = !1,
                        r = i(T.el);
                    for (r.atStart && r.atEnd && (n = !0), t = T.el.querySelectorAll(".fr-mk"), e = 0; e < t.length; e++) t[e].parentNode.removeChild(t[e]);
                    return T.selection.restore(), n
                },
                inEditor: p,
                remove: function() {
                    if (_()) return !0;
                    var t;
                    S();
                    var n = function(e) {
                            for (var t = e.previousSibling; t && t.nodeType == Node.TEXT_NODE && 0 === t.textContent.length;) {
                                var n = t;
                                t = t.previousSibling, Ee(n).remove()
                            }
                            return t
                        },
                        r = function(e) {
                            for (var t = e.nextSibling; t && t.nodeType == Node.TEXT_NODE && 0 === t.textContent.length;) {
                                var n = t;
                                t = t.nextSibling, Ee(n).remove()
                            }
                            return t
                        },
                        i = T.$el.find('.fr-marker[data-type="true"]');
                    for (t = 0; t < i.length; t++)
                        for (var a = i[t]; !(n(a) || T.node.isBlock(a.parentNode) || T.$el.is(a.parentNode) || T.node.hasClass(a.parentNode, "fr-inner"));) Ee(a.parentNode).before(a);
                    var o = T.$el.find('.fr-marker[data-type="false"]');
                    for (t = 0; t < o.length; t++) {
                        for (var s = o[t]; !(r(s) || T.node.isBlock(s.parentNode) || T.$el.is(s.parentNode) || T.node.hasClass(s.parentNode, "fr-inner"));) Ee(s.parentNode).after(s);
                        s.parentNode && T.node.isBlock(s.parentNode) && T.node.isEmpty(s.parentNode) && !T.$el.is(s.parentNode) && !T.node.hasClass(s.parentNode, "fr-inner") && T.opts.keepFormatOnDelete && Ee(s.parentNode).after(s)
                    }
                    if (function() {
                            for (var e = T.$el.find(".fr-marker"), t = 0; t < e.length; t++)
                                if (Ee(e[t]).parentsUntil('.fr-element, [contenteditable="true"]', '[contenteditable="false"]').length) return !1;
                            return !0
                        }()) {
                        ! function e(t, n) {
                            var r = T.node.contents(t.get(0));
                            0 <= ["TD", "TH"].indexOf(t.get(0).tagName) && 1 == t.find(".fr-marker").length && T.node.hasClass(r[0], "fr-marker") && t.attr("data-del-cell", !0);
                            for (var i = 0; i < r.length; i++) {
                                var a = r[i];
                                T.node.hasClass(a, "fr-marker") ? n = (n + 1) % 2 : n ? 0 < Ee(a).find(".fr-marker").length ? n = e(Ee(a), n) : ["TD", "TH"].indexOf(a.tagName) < 0 && !T.node.hasClass(a, "fr-inner") ? !T.opts.keepFormatOnDelete || 0 < T.$el.find("[data-first]").length || T.node.isVoid(a) ? Ee(a).remove() : L(a) : T.node.hasClass(a, "fr-inner") ? 0 === Ee(a).find(".fr-inner").length ? Ee(a).html("<br>") : Ee(a).find(".fr-inner").filter(x).html("<br>") : (Ee(a).empty(), Ee(a).attr("data-del-cell", !0)) : 0 < Ee(a).find(".fr-marker").length && (n = e(Ee(a), n))
                            }
                            return n
                        }(T.$el, 0);
                        var l = T.$el.find('[data-first="true"]');
                        if (l.length) T.$el.find(".fr-marker").remove(), l.append(Ee.FE.INVISIBLE_SPACE + Ee.FE.MARKERS).removeAttr("data-first"), l.attr("data-text") && l.replaceWith(l.html());
                        else
                            for (T.$el.find("table").filter(function() { return 0 < Ee(this).find("[data-del-cell]").length && Ee(this).find("[data-del-cell]").length == Ee(this).find("td, th").length }).remove(), T.$el.find("[data-del-cell]").removeAttr("data-del-cell"), i = T.$el.find('.fr-marker[data-type="true"]'), t = 0; t < i.length; t++) {
                                var d = i[t],
                                    c = d.nextSibling,
                                    f = T.$el.find('.fr-marker[data-type="false"][data-id="' + Ee(d).data("id") + '"]').get(0);
                                if (f) {
                                    if (d && (!c || c != f)) {
                                        var p = T.node.blockParent(d),
                                            u = T.node.blockParent(f),
                                            h = !1,
                                            g = !1;
                                        if (p && 0 <= ["UL", "OL"].indexOf(p.tagName) && (h = !(p = null)), u && 0 <= ["UL", "OL"].indexOf(u.tagName) && (g = !(u = null)), Ee(d).after(f), p != u)
                                            if (null != p || h)
                                                if (null != u || g || 0 !== Ee(p).parentsUntil(T.$el, "table").length) p && u && 0 === Ee(p).parentsUntil(T.$el, "table").length && 0 === Ee(u).parentsUntil(T.$el, "table").length && 0 === Ee(p).find(u).length && 0 === Ee(u).find(p).length && (Ee(p).append(Ee(u).html()), Ee(u).remove());
                                                else {
                                                    for (c = p; !c.nextSibling && c.parentNode != T.el;) c = c.parentNode;
                                                    for (c = c.nextSibling; c && "BR" != c.tagName;) {
                                                        var m = c.nextSibling;
                                                        Ee(p).append(c), c = m
                                                    }
                                                    c && "BR" == c.tagName && Ee(c).remove()
                                                }
                                        else {
                                            var v = T.node.deepestParent(d);
                                            v ? (Ee(v).after(Ee(u).html()), Ee(u).remove()) : 0 === Ee(u).parentsUntil(T.$el, "table").length && (Ee(d).next().after(Ee(u).html()), Ee(u).remove())
                                        }
                                    }
                                } else f = Ee(d).clone().attr("data-type", !1), Ee(d).after(f)
                            }
                    }
                    T.opts.keepFormatOnDelete || T.html.fillEmptyBlocks(), T.html.cleanEmptyTags(!0), T.opts.htmlUntouched || (T.clean.lists(), T.spaces.normalize());
                    var E = T.$el.find(".fr-marker:last").get(0),
                        b = T.$el.find(".fr-marker:first").get(0);
                    void 0 !== E && void 0 !== b && !E.nextSibling && b.previousSibling && "BR" == b.previousSibling.tagName && T.node.isElement(E.parentNode) && T.node.isElement(b.parentNode) && T.$el.append("<br>"), R()
                },
                blocks: function() {
                    var e, t = [],
                        n = A();
                    if (p() && n.rangeCount) {
                        var r = c();
                        for (e = 0; e < r.length; e++) {
                            var i, a = r[e],
                                o = f(a.startContainer, a.startOffset),
                                s = f(a.endContainer, a.endOffset);
                            (T.node.isBlock(o) || T.node.hasClass(o, "fr-inner")) && t.indexOf(o) < 0 && t.push(o), (i = T.node.blockParent(o)) && t.indexOf(i) < 0 && t.push(i);
                            for (var l = [], d = o; d !== s && d !== T.el;) l.indexOf(d) < 0 && d.children && d.children.length ? (l.push(d), d = d.children[0]) : d.nextSibling ? d = d.nextSibling : d.parentNode && (d = d.parentNode, l.push(d)), T.node.isBlock(d) && l.indexOf(d) < 0 && t.indexOf(d) < 0 && (d !== s || 0 < a.endOffset) && t.push(d);
                            T.node.isBlock(s) && t.indexOf(s) < 0 && 0 < a.endOffset && t.push(s), (i = T.node.blockParent(s)) && t.indexOf(i) < 0 && t.push(i)
                        }
                    }
                    for (e = t.length - 1; 0 < e; e--) Ee(t[e]).find(t).length && t.splice(e, 1);
                    return t
                },
                info: i,
                setAtEnd: a,
                setAtStart: r,
                setBefore: function(e, t) { void 0 === t && (t = !0); for (var n = e.previousSibling; n && n.nodeType == Node.TEXT_NODE && 0 === n.textContent.length;) n = n.previousSibling; return n ? (T.node.isBlock(n) ? a(n) : "BR" == n.tagName ? Ee(n).before(Ee.FE.MARKERS) : Ee(n).after(Ee.FE.MARKERS), !0) : !!t && (T.node.isBlock(e) ? r(e) : Ee(e).before(Ee.FE.MARKERS), !0) },
                setAfter: function(e, t) { void 0 === t && (t = !0); for (var n = e.nextSibling; n && n.nodeType == Node.TEXT_NODE && 0 === n.textContent.length;) n = n.nextSibling; return n ? (T.node.isBlock(n) ? r(n) : Ee(n).before(Ee.FE.MARKERS), !0) : !!t && (T.node.isBlock(e) ? a(e) : Ee(e).after(Ee.FE.MARKERS), !0) },
                rangeElement: f
            }
        }, Ee.extend(Ee.FE.DEFAULTS, { htmlAllowedTags: ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "queue", "rp", "rt", "ruby", "s", "samp", "script", "style", "section", "select", "small", "source", "span", "strike", "strong", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video", "wbr"], htmlRemoveTags: ["script", "style"], htmlAllowedAttrs: ["accept", "accept-charset", "accesskey", "action", "align", "allowfullscreen", "allowtransparency", "alt", "async", "autocomplete", "autofocus", "autoplay", "autosave", "background", "bgcolor", "border", "charset", "cellpadding", "cellspacing", "checked", "cite", "class", "color", "cols", "colspan", "content", "contenteditable", "contextmenu", "controls", "coords", "data", "data-.*", "datetime", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "dropzone", "enctype", "for", "form", "formaction", "frameborder", "headers", "height", "hidden", "high", "href", "hreflang", "http-equiv", "icon", "id", "ismap", "itemprop", "keytype", "kind", "label", "lang", "language", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "mozallowfullscreen", "multiple", "muted", "name", "novalidate", "open", "optimum", "pattern", "ping", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "scoped", "scrolling", "seamless", "selected", "shape", "size", "sizes", "span", "src", "srcdoc", "srclang", "srcset", "start", "step", "summary", "spellcheck", "style", "tabindex", "target", "title", "type", "translate", "usemap", "value", "valign", "webkitallowfullscreen", "width", "wrap"], htmlAllowedStyleProps: [".*"], htmlAllowComments: !0, htmlUntouched: !1, fullPage: !1 }), Ee.FE.HTML5Map = { B: "STRONG", I: "EM", STRIKE: "S" }, Ee.FE.MODULES.clean = function(c) {
            var f, p, u, h;

            function i(e) {
                if (e.nodeType == Node.ELEMENT_NODE && e.getAttribute("class") && 0 <= e.getAttribute("class").indexOf("fr-marker")) return !1;
                var t, n = c.node.contents(e),
                    r = [];
                for (t = 0; t < n.length; t++) n[t].nodeType != Node.ELEMENT_NODE || c.node.isVoid(n[t]) ? n[t].nodeType == Node.TEXT_NODE && (n[t].textContent = n[t].textContent.replace(/\u200b/g, "")) : n[t].textContent.replace(/\u200b/g, "").length != n[t].textContent.length && i(n[t]);
                if (e.nodeType == Node.ELEMENT_NODE && !c.node.isVoid(e) && (e.normalize(), n = c.node.contents(e), r = e.querySelectorAll(".fr-marker"), n.length - r.length == 0)) {
                    for (t = 0; t < n.length; t++)
                        if (n[t].nodeType == Node.ELEMENT_NODE && (n[t].getAttribute("class") || "").indexOf("fr-marker") < 0) return !1;
                    for (t = 0; t < r.length; t++) e.parentNode.insertBefore(r[t].cloneNode(!0), e);
                    return e.parentNode.removeChild(e), !1
                }
            }

            function s(e, t) {
                if (e.nodeType == Node.COMMENT_NODE) return "\x3c!--" + e.nodeValue + "--\x3e";
                if (e.nodeType == Node.TEXT_NODE) return t ? e.textContent.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e.textContent.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00A0/g, "&nbsp;").replace(/\u0009/g, "");
                if (e.nodeType != Node.ELEMENT_NODE) return e.outerHTML;
                if (e.nodeType == Node.ELEMENT_NODE && 0 <= ["STYLE", "SCRIPT", "NOSCRIPT"].indexOf(e.tagName)) return e.outerHTML;
                if (e.nodeType == Node.ELEMENT_NODE && "svg" == e.tagName) {
                    var n = document.createElement("div"),
                        r = e.cloneNode(!0);
                    return n.appendChild(r), n.innerHTML
                }
                if ("IFRAME" == e.tagName) return e.outerHTML.replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
                var i = e.childNodes;
                if (0 === i.length) return e.outerHTML;
                for (var a = "", o = 0; o < i.length; o++) "PRE" == e.tagName && (t = !0), a += s(i[o], t);
                return c.node.openTagString(e) + a + c.node.closeTagString(e)
            }
            var o = [];

            function g(e) { var t = e.replace(/;;/gi, ";"); return ";" != (t = t.replace(/^;/gi, "")).charAt(t.length) && (t += ";"), t }

            function l(e) {
                var t;
                for (t in e)
                    if (e.hasOwnProperty(t)) {
                        var n = t.match(u),
                            r = null;
                        "style" == t && c.opts.htmlAllowedStyleProps.length && (r = e[t].match(h)), n && r ? e[t] = g(r.join(";")) : n && ("style" != t || r) || delete e[t]
                    }
                for (var i = "", a = Object.keys(e).sort(), o = 0; o < a.length; o++) e[t = a[o]].indexOf('"') < 0 ? i += " " + t + '="' + e[t] + '"' : i += " " + t + "='" + e[t] + "'";
                return i
            }

            function d(e, t) {
                var n, r = document.implementation.createHTMLDocument("Froala DOC").createElement("DIV");
                Ee(r).append(e);
                var i = "";
                if (r) { var a = c.node.contents(r); for (n = 0; n < a.length; n++) t(a[n]); for (a = c.node.contents(r), n = 0; n < a.length; n++) i += s(a[n]) }
                return i
            }

            function m(e, t, n) {
                o = [];
                var r = e = e.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, function(e) { return o.push(e), "[FROALA.EDITOR.SCRIPT " + (o.length - 1) + "]" }).replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, function(e) { return o.push(e), "[FROALA.EDITOR.NOSCRIPT " + (o.length - 1) + "]" }).replace(/<img((?:[\w\W]*?)) src="/g, '<img$1 data-fr-src="'),
                    i = null;
                c.opts.fullPage && (r = c.html.extractNode(e, "body") || (0 <= e.indexOf("<body") ? "" : e), n && (i = c.html.extractNode(e, "head") || "")), r = d(r, t), i && (i = d(i, t));
                var a = function(e, t, n) {
                    if (c.opts.fullPage) {
                        var r = c.html.extractDoctype(n),
                            i = l(c.html.extractNodeAttrs(n, "html"));
                        return t = null == t ? c.html.extractNode(n, "head") || "<title></title>" : t, r + "<html" + i + "><head" + l(c.html.extractNodeAttrs(n, "head")) + ">" + t + "</head><body" + l(c.html.extractNodeAttrs(n, "body")) + ">" + e + "</body></html>"
                    }
                    return e
                }(r, i, e);
                return a.replace(/\[FROALA\.EDITOR\.SCRIPT ([\d]*)\]/gi, function(e, t) { return 0 <= c.opts.htmlRemoveTags.indexOf("script") ? "" : o[parseInt(t, 10)] }).replace(/\[FROALA\.EDITOR\.NOSCRIPT ([\d]*)\]/gi, function(e, t) { return 0 <= c.opts.htmlRemoveTags.indexOf("noscript") ? "" : o[parseInt(t, 10)].replace(/\&lt;/g, "<").replace(/\&gt;/g, ">") }).replace(/<img((?:[\w\W]*?)) data-fr-src="/g, '<img$1 src="')
            }

            function v(e) { var t = c.doc.createElement("DIV"); return t.innerText = e, t.textContent }

            function E(e) {
                for (var t = c.node.contents(e), n = 0; n < t.length; n++) t[n].nodeType != Node.TEXT_NODE && E(t[n]);
                ! function(e) {
                    if ("SPAN" == e.tagName && 0 <= (e.getAttribute("class") || "").indexOf("fr-marker")) return;
                    var t, n;
                    if ("PRE" == e.tagName && 0 <= (n = (t = e).innerHTML).indexOf("\n") && (t.innerHTML = n.replace(/\n/g, "<br>")), e.nodeType == Node.ELEMENT_NODE && (e.getAttribute("data-fr-src") && 0 !== e.getAttribute("data-fr-src").indexOf("blob:") && e.setAttribute("data-fr-src", c.helpers.sanitizeURL(v(e.getAttribute("data-fr-src")))), e.getAttribute("href") && e.setAttribute("href", c.helpers.sanitizeURL(v(e.getAttribute("href")))), e.getAttribute("src") && e.setAttribute("src", c.helpers.sanitizeURL(v(e.getAttribute("src")))), 0 <= ["TABLE", "TBODY", "TFOOT", "TR"].indexOf(e.tagName) && (e.innerHTML = e.innerHTML.trim())), !c.opts.pasteAllowLocalImages && e.nodeType == Node.ELEMENT_NODE && "IMG" == e.tagName && e.getAttribute("data-fr-src") && 0 === e.getAttribute("data-fr-src").indexOf("file://")) return e.parentNode.removeChild(e);
                    if (e.nodeType == Node.ELEMENT_NODE && Ee.FE.HTML5Map[e.tagName] && "" === c.node.attributes(e)) {
                        var r = Ee.FE.HTML5Map[e.tagName],
                            i = "<" + r + ">" + e.innerHTML + "</" + r + ">";
                        e.insertAdjacentHTML("beforebegin", i), (e = e.previousSibling).parentNode.removeChild(e.nextSibling)
                    }
                    if (c.opts.htmlAllowComments || e.nodeType != Node.COMMENT_NODE)
                        if (e.tagName && e.tagName.match(p)) e.parentNode.removeChild(e);
                        else if (e.tagName && !e.tagName.match(f)) "svg" === e.tagName ? e.parentNode.removeChild(e) : c.browser.safari && "path" == e.tagName && e.parentNode && "svg" == e.parentNode.tagName || (e.outerHTML = e.innerHTML);
                    else {
                        var a = e.attributes;
                        if (a)
                            for (var o = a.length - 1; 0 <= o; o--) {
                                var s = a[o],
                                    l = s.nodeName.match(u),
                                    d = null;
                                "style" == s.nodeName && c.opts.htmlAllowedStyleProps.length && (d = s.value.match(h)), l && d ? s.value = g(d.join(";")) : l && ("style" != s.nodeName || d) || e.removeAttribute(s.nodeName)
                            }
                    } else 0 !== e.data.indexOf("[FROALA.EDITOR") && e.parentNode.removeChild(e)
                }(e)
            }
            return {
                _init: function() { c.opts.fullPage && Ee.merge(c.opts.htmlAllowedTags, ["head", "title", "style", "link", "base", "body", "html", "meta"]) },
                html: function(e, t, n, r) { void 0 === t && (t = []), void 0 === n && (n = []), void 0 === r && (r = !1); var i, a = Ee.merge([], c.opts.htmlAllowedTags); for (i = 0; i < t.length; i++) 0 <= a.indexOf(t[i]) && a.splice(a.indexOf(t[i]), 1); var o = Ee.merge([], c.opts.htmlAllowedAttrs); for (i = 0; i < n.length; i++) 0 <= o.indexOf(n[i]) && o.splice(o.indexOf(n[i]), 1); return o.push("data-fr-.*"), o.push("fr-.*"), f = new RegExp("^" + a.join("$|^") + "$", "gi"), u = new RegExp("^" + o.join("$|^") + "$", "gi"), p = new RegExp("^" + c.opts.htmlRemoveTags.join("$|^") + "$", "gi"), h = c.opts.htmlAllowedStyleProps.length ? new RegExp("((^|;|\\s)" + c.opts.htmlAllowedStyleProps.join(":.+?(?=;|$))|((^|;|\\s)") + ":.+?(?=(;)|$))", "gi") : null, e = m(e, E, !0) },
                toHTML5: function() {
                    var e = c.el.querySelectorAll(Object.keys(Ee.FE.HTML5Map).join(","));
                    if (e.length) {
                        var t = !1;
                        c.el.querySelector(".fr-marker") || (c.selection.save(), t = !0);
                        for (var n = 0; n < e.length; n++) "" === c.node.attributes(e[n]) && Ee(e[n]).replaceWith("<" + Ee.FE.HTML5Map[e[n].tagName] + ">" + e[n].innerHTML + "</" + Ee.FE.HTML5Map[e[n].tagName] + ">");
                        t && c.selection.restore()
                    }
                },
                tables: function() {
                    ! function() {
                        for (var e = c.el.querySelectorAll("tr"), t = 0; t < e.length; t++) {
                            for (var n = e[t].children, r = !0, i = 0; i < n.length; i++)
                                if ("TH" != n[i].tagName) { r = !1; break }
                            if (!1 !== r && 0 !== n.length) { for (var a = e[t]; a && "TABLE" != a.tagName && "THEAD" != a.tagName;) a = a.parentNode; var o = a; "THEAD" != o.tagName && (o = c.doc.createElement("THEAD"), a.insertBefore(o, a.firstChild)), o.appendChild(e[t]) }
                        }
                    }()
                },
                lists: function() {
                    ! function() {
                        var e, t = [];
                        do {
                            if (t.length) {
                                var n = t[0],
                                    r = c.doc.createElement("ul");
                                n.parentNode.insertBefore(r, n);
                                do {
                                    var i = n;
                                    n = n.nextSibling, r.appendChild(i)
                                } while (n && "LI" == n.tagName)
                            }
                            t = [];
                            for (var a = c.el.querySelectorAll("li"), o = 0; o < a.length; o++) e = a[o], c.node.isList(e.parentNode) || t.push(a[o])
                        } while (0 < t.length)
                    }(),
                    function() {
                        for (var e = c.el.querySelectorAll("ol + ol, ul + ul"), t = 0; t < e.length; t++) {
                            var n = e[t];
                            if (c.node.isList(n.previousSibling) && c.node.openTagString(n) == c.node.openTagString(n.previousSibling)) {
                                for (var r = c.node.contents(n), i = 0; i < r.length; i++) n.previousSibling.appendChild(r[i]);
                                n.parentNode.removeChild(n)
                            }
                        }
                    }(),
                    function() {
                        for (var e = c.el.querySelectorAll("ul, ol"), t = 0; t < e.length; t++)
                            for (var n = c.node.contents(e[t]), r = null, i = n.length - 1; 0 <= i; i--) "LI" != n[i].tagName ? (r || (r = Ee("<li>")).insertBefore(n[i]), r.prepend(n[i])) : r = null
                    }(),
                    function() {
                        var e, t, n;
                        do { t = !1; var r = c.el.querySelectorAll("li:empty"); for (e = 0; e < r.length; e++) r[e].parentNode.removeChild(r[e]); var i = c.el.querySelectorAll("ul, ol"); for (e = 0; e < i.length; e++)(n = i[e]).querySelector("LI") || (t = !0, n.parentNode.removeChild(n)) } while (!0 === t)
                    }(),
                    function() {
                        for (var e = c.el.querySelectorAll("ul > ul, ol > ol, ul > ol, ol > ul"), t = 0; t < e.length; t++) {
                            var n = e[t],
                                r = n.previousSibling;
                            r && ("LI" == r.tagName ? r.appendChild(n) : Ee(n).wrap("<li></li>"))
                        }
                    }(),
                    function() {
                        for (var e = c.el.querySelectorAll("li > ul, li > ol"), t = 0; t < e.length; t++) {
                            var n = e[t];
                            if (n.nextSibling) {
                                var r = n.nextSibling,
                                    i = Ee("<li>");
                                Ee(n.parentNode).after(i);
                                do {
                                    var a = r;
                                    r = r.nextSibling, i.append(a)
                                } while (r)
                            }
                        }
                    }(),
                    function() {
                        for (var e = c.el.querySelectorAll("li > ul, li > ol"), t = 0; t < e.length; t++) {
                            var n = e[t];
                            if (c.node.isFirstSibling(n)) Ee(n).before("<br/>");
                            else if (n.previousSibling && "BR" == n.previousSibling.tagName) {
                                for (var r = n.previousSibling.previousSibling; r && c.node.hasClass(r, "fr-marker");) r = r.previousSibling;
                                r && "BR" != r.tagName && Ee(n.previousSibling).remove()
                            }
                        }
                    }(),
                    function() { for (var e = c.el.querySelectorAll("li:empty"), t = 0; t < e.length; t++) Ee(e[t]).remove() }()
                },
                invisibleSpaces: function(e) { return e.replace(/\u200b/g, "").length == e.length ? e : c.clean.exec(e, i) },
                exec: m
            }
        }, Ee.FE.MODULES.spaces = function(l) {
            function r(e, t) {
                var n = e.previousSibling,
                    r = e.nextSibling,
                    i = e.textContent,
                    a = e.parentNode;
                if (!l.html.isPreformatted(a)) {
                    t && (i = i.replace(/[\f\n\r\t\v ]{2,}/g, " "), r && "BR" !== r.tagName && !l.node.isBlock(r) || !(l.node.isBlock(a) || l.node.isLink(a) && !a.nextSibling || l.node.isElement(a)) || (i = i.replace(/[\f\n\r\t\v ]{1,}$/g, "")), n && "BR" !== n.tagName && !l.node.isBlock(n) || !(l.node.isBlock(a) || l.node.isLink(a) && !a.previousSibling || l.node.isElement(a)) || (i = i.replace(/^[\f\n\r\t\v ]{1,}/g, "")), " " === i && (n && l.node.isVoid(n) || r && l.node.isVoid(r)) && (i = "")), (!n && l.node.isBlock(r) || !r && l.node.isBlock(n)) && l.node.isBlock(a) && (i = i.replace(/^[\f\n\r\t\v ]{1,}/g, "")), t || (i = i.replace(new RegExp(Ee.FE.UNICODE_NBSP, "g"), " "));
                    for (var o = "", s = 0; s < i.length; s++) 32 != i.charCodeAt(s) || 0 !== s && 32 != o.charCodeAt(s - 1) ? o += i[s] : o += Ee.FE.UNICODE_NBSP;
                    (!r || r && l.node.isBlock(r) || r && r.nodeType == Node.ELEMENT_NODE && l.win.getComputedStyle(r) && "block" == l.win.getComputedStyle(r).display) && (o = o.replace(/ $/, Ee.FE.UNICODE_NBSP)), !n || l.node.isVoid(n) || l.node.isBlock(n) || 1 !== (o = o.replace(/^\u00A0([^ $])/, " $1")).length || 160 !== o.charCodeAt(0) || !r || l.node.isVoid(r) || l.node.isBlock(r) || (o = " "), t || (o = o.replace(/([^ \u00A0])\u00A0([^ \u00A0])/g, "$1 $2")), e.textContent != o && (e.textContent = o)
                }
            }

            function d(e, t) {
                if (void 0 !== e && e || (e = l.el), void 0 === t && (t = !1), !e.getAttribute || "false" != e.getAttribute("contenteditable"))
                    if (e.nodeType == Node.TEXT_NODE) r(e, t);
                    else if (e.nodeType == Node.ELEMENT_NODE)
                    for (var n = l.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, l.node.filter(function(e) {
                            for (var t = e.parentNode; t && t !== l.el;) {
                                if ("STYLE" == t.tagName || "IFRAME" == t.tagName) return !1;
                                if ("PRE" === t.tagName) return !1;
                                t = t.parentNode
                            }
                            return null != e.textContent.match(/([ \u00A0\f\n\r\t\v]{2,})|(^[ \u00A0\f\n\r\t\v]{1,})|([ \u00A0\f\n\r\t\v]{1,}$)/g) && !l.node.hasClass(e.parentNode, "fr-marker")
                        }), !1); n.nextNode();) r(n.currentNode, t)
            }
            return {
                normalize: d,
                normalizeAroundCursor: function() {
                    for (var e = [], t = l.el.querySelectorAll(".fr-marker"), n = 0; n < t.length; n++) {
                        for (var r = null, i = l.node.blockParent(t[n]), a = (r = i || t[n]).nextSibling, o = r.previousSibling; a && "BR" == a.tagName;) a = a.nextSibling;
                        for (; o && "BR" == o.tagName;) o = o.previousSibling;
                        r && e.indexOf(r) < 0 && e.push(r), o && e.indexOf(o) < 0 && e.push(o), a && e.indexOf(a) < 0 && e.push(a)
                    }
                    for (var s = 0; s < e.length; s++) d(e[s])
                }
            }
        }, Ee.FE.UNICODE_NBSP = String.fromCharCode(160), Ee.FE.VOID_ELEMENTS = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"], Ee.FE.BLOCK_TAGS = ["address", "article", "aside", "audio", "blockquote", "canvas", "details", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "main", "nav", "noscript", "ol", "output", "p", "pre", "section", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul", "video"], Ee.extend(Ee.FE.DEFAULTS, { htmlAllowedEmptyTags: ["textarea", "a", "iframe", "object", "video", "style", "script", ".fa", ".fr-emoticon", ".fr-inner", "path", "line"], htmlDoNotWrapTags: ["script", "style"], htmlSimpleAmpersand: !1, htmlIgnoreCSSProperties: [], htmlExecuteScripts: !0 }), Ee.FE.MODULES.html = function(x) {
            function c() { return x.opts.enter == Ee.FE.ENTER_P ? "p" : x.opts.enter == Ee.FE.ENTER_DIV ? "div" : x.opts.enter == Ee.FE.ENTER_BR ? null : void 0 }

            function s(e, t) { return !(!e || e === x.el) && (t ? -1 != ["PRE", "SCRIPT", "STYLE"].indexOf(e.tagName) || s(e.parentNode, t) : -1 != ["PRE", "SCRIPT", "STYLE"].indexOf(e.tagName)) }

            function a(e) {
                var t, n = [],
                    r = [];
                if (e) {
                    var i = x.el.querySelectorAll(".fr-marker");
                    for (t = 0; t < i.length; t++) {
                        var a = x.node.blockParent(i[t]) || i[t];
                        if (a) {
                            var o = a.nextSibling,
                                s = a.previousSibling;
                            a && r.indexOf(a) < 0 && x.node.isBlock(a) && r.push(a), s && x.node.isBlock(s) && r.indexOf(s) < 0 && r.push(s), o && x.node.isBlock(o) && r.indexOf(o) < 0 && r.push(o)
                        }
                    }
                } else r = x.el.querySelectorAll(p());
                var l = p();
                for (l += "," + Ee.FE.VOID_ELEMENTS.join(","), l += ", .fr-inner", l += "," + x.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)", t = r.length - 1; 0 <= t; t--)
                    if (!(r[t].textContent && 0 < r[t].textContent.replace(/\u200B|\n/g, "").length || 0 < r[t].querySelectorAll(l).length)) {
                        for (var d = x.node.contents(r[t]), c = !1, f = 0; f < d.length; f++)
                            if (d[f].nodeType != Node.COMMENT_NODE && d[f].textContent && 0 < d[f].textContent.replace(/\u200B|\n/g, "").length) { c = !0; break }
                        c || n.push(r[t])
                    }
                return n
            }

            function p() { return Ee.FE.BLOCK_TAGS.join(", ") }

            function e(e) {
                var t, n, r = Ee.merge([], Ee.FE.VOID_ELEMENTS);
                r = Ee.merge(r, x.opts.htmlAllowedEmptyTags), r = void 0 === e ? Ee.merge(r, Ee.FE.BLOCK_TAGS) : Ee.merge(r, Ee.FE.NO_DELETE_TAGS), t = x.el.querySelectorAll("*:empty:not(" + r.join("):not(") + "):not(.fr-marker)");
                do {
                    n = !1;
                    for (var i = 0; i < t.length; i++) 0 !== t[i].attributes.length && void 0 === t[i].getAttribute("href") || (t[i].parentNode.removeChild(t[i]), n = !0);
                    t = x.el.querySelectorAll("*:empty:not(" + r.join("):not(") + "):not(.fr-marker)")
                } while (t.length && n)
            }

            function o(e, t) {
                var n = c();
                if (t && (n = "div"), n) {
                    for (var r = x.doc.createDocumentFragment(), i = null, a = !1, o = e.firstChild, s = !1; o;) {
                        var l = o.nextSibling;
                        if (o.nodeType == Node.ELEMENT_NODE && (x.node.isBlock(o) || 0 <= x.opts.htmlDoNotWrapTags.indexOf(o.tagName.toLowerCase()) && !x.node.hasClass(o, "fr-marker"))) i = null, r.appendChild(o.cloneNode(!0));
                        else if (o.nodeType != Node.ELEMENT_NODE && o.nodeType != Node.TEXT_NODE) i = null, r.appendChild(o.cloneNode(!0));
                        else if ("BR" == o.tagName) null == i ? (i = x.doc.createElement(n), s = !0, t && (i.setAttribute("class", "fr-temp-div"), i.setAttribute("data-empty", !0)), i.appendChild(o.cloneNode(!0)), r.appendChild(i)) : !1 === a && (i.appendChild(x.doc.createElement("br")), t && (i.setAttribute("class", "fr-temp-div"), i.setAttribute("data-empty", !0))), i = null;
                        else {
                            var d = o.textContent;
                            (o.nodeType !== Node.TEXT_NODE || 0 < d.replace(/\n/g, "").replace(/(^ *)|( *$)/g, "").length || d.length && d.indexOf("\n") < 0) && (null == i && (i = x.doc.createElement(n), s = !0, t && i.setAttribute("class", "fr-temp-div"), r.appendChild(i), a = !1), i.appendChild(o.cloneNode(!0)), a || x.node.hasClass(o, "fr-marker") || o.nodeType == Node.TEXT_NODE && 0 === d.replace(/ /g, "").length || (a = !0))
                        }
                        o = l
                    }
                    s && (e.innerHTML = "", e.appendChild(r))
                }
            }

            function l(e, t) { for (var n = e.length - 1; 0 <= n; n--) o(e[n], t) }

            function t(e, t, n, r, i) {
                if (!x.$wp) return !1;
                void 0 === e && (e = !1), void 0 === t && (t = !1), void 0 === n && (n = !1), void 0 === r && (r = !1), void 0 === i && (i = !1);
                var a = x.$wp.scrollTop();
                o(x.el, e), r && l(x.el.querySelectorAll(".fr-inner"), e), t && l(x.el.querySelectorAll("td, th"), e), n && l(x.el.querySelectorAll("blockquote"), e), i && l(x.el.querySelectorAll("li"), e), a != x.$wp.scrollTop() && x.$wp.scrollTop(a)
            }

            function n(e) {
                if (void 0 === e && (e = x.el), e && 0 <= ["SCRIPT", "STYLE", "PRE"].indexOf(e.tagName)) return !1;
                for (var t = x.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, x.node.filter(function(e) { return null != e.textContent.match(/([ \n]{2,})|(^[ \n]{1,})|([ \n]{1,}$)/g) }), !1); t.nextNode();) {
                    var n = t.currentNode;
                    if (!s(n.parentNode, !0)) {
                        var r = x.node.isBlock(n.parentNode) || x.node.isElement(n.parentNode),
                            i = n.textContent.replace(/(?!^)( ){2,}(?!$)/g, " ").replace(/\n/g, " ").replace(/^[ ]{2,}/g, " ").replace(/[ ]{2,}$/g, " ");
                        if (r) {
                            var a = n.previousSibling,
                                o = n.nextSibling;
                            a && o && " " == i ? i = x.node.isBlock(a) && x.node.isBlock(o) ? "" : " " : (a || (i = i.replace(/^ */, "")), o || (i = i.replace(/ *$/, "")))
                        }
                        n.textContent = i
                    }
                }
            }

            function r(e, t, n) { var r = new RegExp(t, "gi").exec(e); return r ? r[n] : null }

            function N(e) {
                var t = e.doctype,
                    n = "<!DOCTYPE html>";
                return t && (n = "<!DOCTYPE " + t.name + (t.publicId ? ' PUBLIC "' + t.publicId + '"' : "") + (!t.publicId && t.systemId ? " SYSTEM" : "") + (t.systemId ? ' "' + t.systemId + '"' : "") + ">"), n
            }

            function d(e) {
                var t = e.parentNode;
                if (t && (x.node.isBlock(t) || x.node.isElement(t)) && ["TD", "TH"].indexOf(t.tagName) < 0) {
                    for (var n = e.previousSibling, r = e.nextSibling; n && (n.nodeType == Node.TEXT_NODE && 0 === n.textContent.replace(/\n|\r/g, "").length || x.node.hasClass(n, "fr-tmp"));) n = n.previousSibling;
                    if (r) return !1;
                    n && t && "BR" != n.tagName && !x.node.isBlock(n) && !r && 0 < t.textContent.replace(/\u200B/g, "").length && 0 < n.textContent.length && !x.node.hasClass(n, "fr-marker") && (x.el == t && !r && x.opts.enter == Ee.FE.ENTER_BR && x.browser.msie || e.parentNode.removeChild(e))
                } else !t || x.node.isBlock(t) || x.node.isElement(t) || e.previousSibling || e.nextSibling || !x.node.isDeletable(e.parentNode) || d(e.parentNode)
            }

            function u() { x.opts.htmlUntouched || (e(), t(), n(), x.spaces.normalize(null, !0), x.html.fillEmptyBlocks(), x.clean.lists(), x.clean.tables(), x.clean.toHTML5(), x.html.cleanBRs()), x.selection.restore(), i(), x.placeholder.refresh() }

            function i() { x.node.isEmpty(x.el) && (null != c() ? x.el.querySelector(p()) || x.el.querySelector(x.opts.htmlDoNotWrapTags.join(":not(.fr-marker),") + ":not(.fr-marker)") || (x.core.hasFocus() ? (x.$el.html("<" + c() + ">" + Ee.FE.MARKERS + "<br/></" + c() + ">"), x.selection.restore()) : x.$el.html("<" + c() + "><br/></" + c() + ">")) : x.el.querySelector("*:not(.fr-marker):not(br)") || (x.core.hasFocus() ? (x.$el.html(Ee.FE.MARKERS + "<br/>"), x.selection.restore()) : x.$el.html("<br/>"))) }

            function h(e, t) { return r(e, "<" + t + "[^>]*?>([\\w\\W]*)</" + t + ">", 1) }

            function g(e, t) { var n = Ee("<div " + (r(e, "<" + t + "([^>]*?)>", 1) || "") + ">"); return x.node.rawAttributes(n.get(0)) }

            function m(e) { return (r(e, "<!DOCTYPE([^>]*?)>", 0) || "<!DOCTYPE html>").replace(/\n/g, " ").replace(/ {2,}/g, " ") }

            function v(e, t) { x.opts.htmlExecuteScripts ? e.html(t) : e.get(0).innerHTML = t }

            function O(e) {
                var t;
                (t = /:not\(([^\)]*)\)/g).test(e) && (e = e.replace(t, "     $1 "));
                var n = 100 * (e.match(/(#[^\s\+>~\.\[:]+)/g) || []).length + 10 * (e.match(/(\[[^\]]+\])/g) || []).length + 10 * (e.match(/(\.[^\s\+>~\.\[:]+)/g) || []).length + 10 * (e.match(/(:[\w-]+\([^\)]*\))/gi) || []).length + 10 * (e.match(/(:[^\s\+>~\.\[:]+)/g) || []).length + (e.match(/(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi) || []).length;
                return n += ((e = (e = e.replace(/[\*\s\+>~]/g, " ")).replace(/[#\.]/g, " ")).match(/([^\s\+>~\.\[:]+)/g) || []).length
            }

            function w(e) {
                if (x.events.trigger("html.processGet", [e]), e && e.getAttribute && "" === e.getAttribute("class") && e.removeAttribute("class"), e && e.getAttribute && "" === e.getAttribute("style") && e.removeAttribute("style"), e && e.nodeType == Node.ELEMENT_NODE) {
                    var t, n = e.querySelectorAll('[class=""],[style=""]');
                    for (t = 0; t < n.length; t++) { var r = n[t]; "" === r.getAttribute("class") && r.removeAttribute("class"), "" === r.getAttribute("style") && r.removeAttribute("style") }
                    if ("BR" === e.tagName) d(e);
                    else { var i = e.querySelectorAll("br"); for (t = 0; t < i.length; t++) d(i[t]) }
                }
            }

            function I(e, t) { return e[3] - t[3] }

            function f(e) { var t = x.doc.createElement("div"); return t.innerHTML = e, null !== t.querySelector(p()) }

            function E(e) {
                var t = null;
                if (void 0 === e && (t = x.selection.element()), x.opts.keepFormatOnDelete) return !1;
                var n, r, i = t ? (t.textContent.match(/\u200B/g) || []).length - t.querySelectorAll(".fr-marker").length : 0;
                if ((x.el.textContent.match(/\u200B/g) || []).length - x.el.querySelectorAll(".fr-marker").length == i) return !1;
                do {
                    r = !1, n = x.el.querySelectorAll("*:not(.fr-marker)");
                    for (var a = 0; a < n.length; a++) {
                        var o = n[a];
                        if (t != o) {
                            var s = o.textContent;
                            0 === o.children.length && 1 === s.length && 8203 == s.charCodeAt(0) && "TD" !== o.tagName && (Ee(o).remove(), r = !0)
                        }
                    }
                } while (r)
            }
            return {
                defaultTag: c,
                isPreformatted: s,
                emptyBlocks: a,
                emptyBlockTagsQuery: function() { return Ee.FE.BLOCK_TAGS.join(":empty, ") + ":empty" },
                blockTagsQuery: p,
                fillEmptyBlocks: function(e) {
                    for (var t = a(e), n = 0; n < t.length; n++) { var r = t[n]; "false" === r.getAttribute("contenteditable") || r.querySelector(x.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)") || x.node.isVoid(r) || "TABLE" != r.tagName && "TBODY" != r.tagName && "TR" != r.tagName && "UL" != r.tagName && "OL" != r.tagName && r.appendChild(x.doc.createElement("br")) }
                    if (x.browser.msie && x.opts.enter == Ee.FE.ENTER_BR) {
                        var i = x.node.contents(x.el);
                        i.length && i[i.length - 1].nodeType == Node.TEXT_NODE && x.$el.append("<br>")
                    }
                },
                cleanEmptyTags: e,
                cleanWhiteTags: E,
                cleanBlankSpaces: n,
                blocks: function() { return x.$el.get(0).querySelectorAll(p()) },
                getDoctype: N,
                set: function(e) {
                    var t, n, r, i = x.clean.html((e || "").trim(), [], [], x.opts.fullPage);
                    if (x.opts.fullPage) {
                        var a = h(i, "body") || (0 <= i.indexOf("<body") ? "" : i),
                            o = g(i, "body"),
                            s = h(i, "head") || "<title></title>",
                            l = g(i, "head"),
                            d = Ee("<div>").append(s).contents().each(function() {
                                (this.nodeType == Node.COMMENT_NODE || 0 <= ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName)) && this.parentNode.removeChild(this)
                            }).end().html().trim();
                        s = Ee("<div>").append(s).contents().map(function() { return this.nodeType == Node.COMMENT_NODE ? "\x3c!--" + this.nodeValue + "--\x3e" : 0 <= ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName) ? this.outerHTML : "" }).toArray().join("");
                        var c = m(i),
                            f = g(i, "html");
                        v(x.$el, d + "\n" + a), x.node.clearAttributes(x.el), x.$el.attr(o), x.$el.addClass("fr-view"), x.$el.attr("spellcheck", x.opts.spellcheck), x.$el.attr("dir", x.opts.direction), v(x.$head, s), x.node.clearAttributes(x.$head.get(0)), x.$head.attr(l), x.node.clearAttributes(x.$html.get(0)), x.$html.attr(f), x.iframe_document.doctype.parentNode.replaceChild((t = c, n = x.iframe_document, (r = t.match(/<!DOCTYPE ?([^ ]*) ?([^ ]*) ?"?([^"]*)"? ?"?([^"]*)"?>/i)) ? n.implementation.createDocumentType(r[1], r[3], r[4]) : n.implementation.createDocumentType("html")), x.iframe_document.doctype)
                    } else v(x.$el, i);
                    var p = x.edit.isDisabled();
                    x.edit.on(), x.core.injectStyle(x.opts.iframeDefaultStyle + x.opts.iframeStyle), u(), x.opts.useClasses || (x.$el.find("[fr-original-class]").each(function() { this.setAttribute("class", this.getAttribute("fr-original-class")), this.removeAttribute("fr-original-class") }), x.$el.find("[fr-original-style]").each(function() { this.setAttribute("style", this.getAttribute("fr-original-style")), this.removeAttribute("fr-original-style") })), p && x.edit.off(), x.events.trigger("html.set")
                },
                get: function(e, t) {
                    if (!x.$wp) return x.$oel.clone().removeClass("fr-view").removeAttr("contenteditable").get(0).outerHTML;
                    var n = "";
                    x.events.trigger("html.beforeGet");
                    var r, i, a = [],
                        o = {},
                        s = [],
                        l = x.el.querySelectorAll("input, textarea");
                    for (r = 0; r < l.length; r++) l[r].setAttribute("value", l[r].value);
                    if (!x.opts.useClasses && !t) {
                        var d = new RegExp("^" + x.opts.htmlIgnoreCSSProperties.join("$|^") + "$", "gi");
                        for (r = 0; r < x.doc.styleSheets.length; r++) {
                            var c, f = 0;
                            try { c = x.doc.styleSheets[r].cssRules, x.doc.styleSheets[r].ownerNode && "STYLE" == x.doc.styleSheets[r].ownerNode.nodeType && (f = 1) } catch (L) {}
                            if (c)
                                for (var p = 0, u = c.length; p < u; p++)
                                    if (c[p].selectorText && 0 < c[p].style.cssText.length) {
                                        var h, g = c[p].selectorText.replace(/body |\.fr-view /g, "").replace(/::/g, ":");
                                        try { h = x.el.querySelectorAll(g) } catch (L) { h = [] }
                                        for (i = 0; i < h.length; i++) {
                                            !h[i].getAttribute("fr-original-style") && h[i].getAttribute("style") ? (h[i].setAttribute("fr-original-style", h[i].getAttribute("style")), a.push(h[i])) : h[i].getAttribute("fr-original-style") || (h[i].setAttribute("fr-original-style", ""), a.push(h[i])), o[h[i]] || (o[h[i]] = {});
                                            for (var m = 1e3 * f + O(c[p].selectorText), v = c[p].style.cssText.split(";"), E = 0; E < v.length; E++) {
                                                var b = v[E].trim().split(":")[0];
                                                if (b && !b.match(d) && (o[h[i]][b] || (o[h[i]][b] = 0) <= (h[i].getAttribute("fr-original-style") || "").indexOf(b + ":") && (o[h[i]][b] = 1e4), m >= o[h[i]][b] && (o[h[i]][b] = m, v[E].trim().length))) {
                                                    var T = v[E].trim().split(":");
                                                    T.splice(0, 1), s.push([h[i], b.trim(), T.join(":").trim(), m])
                                                }
                                            }
                                        }
                                    }
                        }
                        for (s.sort(I), r = 0; r < s.length; r++) {
                            var A = s[r];
                            A[0].style[A[1]] = A[2]
                        }
                        for (r = 0; r < a.length; r++)
                            if (a[r].getAttribute("class") && (a[r].setAttribute("fr-original-class", a[r].getAttribute("class")), a[r].removeAttribute("class")), 0 < (a[r].getAttribute("fr-original-style") || "").trim().length) {
                                var C = a[r].getAttribute("fr-original-style").split(";");
                                for (i = 0; i < C.length; i++)
                                    if (0 < C[i].indexOf(":")) {
                                        var S = C[i].split(":"),
                                            R = S[0];
                                        S.splice(0, 1), a[r].style[R.trim()] = S.join(":").trim()
                                    }
                            }
                    }
                    if (x.node.isEmpty(x.el)) x.opts.fullPage && (n = N(x.iframe_document), n += "<html" + x.node.attributes(x.$html.get(0)) + ">" + x.$html.find("head").get(0).outerHTML + "<body></body></html>");
                    else if (void 0 === e && (e = !1), x.opts.fullPage) {
                        n = N(x.iframe_document), x.$el.removeClass("fr-view");
                        var y = x.opts.heightMin;
                        x.opts.heightMin = null, x.size.refresh(), n += "<html" + x.node.attributes(x.$html.get(0)) + ">" + x.$html.html() + "</html>", x.opts.heightMin = y, x.size.refresh(), x.$el.addClass("fr-view")
                    } else n = x.$el.html();
                    if (!x.opts.useClasses && !t)
                        for (r = 0; r < a.length; r++) a[r].getAttribute("fr-original-class") && (a[r].setAttribute("class", a[r].getAttribute("fr-original-class")), a[r].removeAttribute("fr-original-class")), null != a[r].getAttribute("fr-original-style") && void 0 !== a[r].getAttribute("fr-original-style") ? (0 !== a[r].getAttribute("fr-original-style").length ? a[r].setAttribute("style", a[r].getAttribute("fr-original-style")) : a[r].removeAttribute("style"), a[r].removeAttribute("fr-original-style")) : a[r].removeAttribute("style");
                    x.opts.fullPage && (n = (n = (n = (n = (n = (n = (n = (n = n.replace(/<style data-fr-style="true">(?:[\w\W]*?)<\/style>/g, "")).replace(/<link([^>]*)data-fr-style="true"([^>]*)>/g, "")).replace(/<style(?:[\w\W]*?)class="firebugResetStyles"(?:[\w\W]*?)>(?:[\w\W]*?)<\/style>/g, "")).replace(/<body((?:[\w\W]*?)) spellcheck="true"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")).replace(/<body((?:[\w\W]*?)) contenteditable="(true|false)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?)) dir="([\w]*)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?))class="([\w\W]*?)(fr-rtl|fr-ltr)([\w\W]*?)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, '<body$1class="$2$4"$5>$6</body>')).replace(/<body((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")), x.opts.htmlSimpleAmpersand && (n = n.replace(/\&amp;/gi, "&")), x.events.trigger("html.afterGet"), e || (n = n.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")), n = x.clean.invisibleSpaces(n), n = x.clean.exec(n, w);
                    var _ = x.events.chainTrigger("html.get", n);
                    return "string" == typeof _ && (n = _), n = n.replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g, function(e) { return e.replace(/<br>/g, "\n") })
                },
                getSelected: function() {
                    var e, t, n = function(e, t) {
                            for (; t && (t.nodeType == Node.TEXT_NODE || !x.node.isBlock(t)) && !x.node.isElement(t) && !x.node.hasClass(t, "fr-inner");) t && t.nodeType != Node.TEXT_NODE && Ee(e).wrapInner(x.node.openTagString(t) + x.node.closeTagString(t)), t = t.parentNode;
                            t && e.innerHTML == t.innerHTML && (e.innerHTML = t.outerHTML)
                        },
                        r = "";
                    if ("undefined" != typeof x.win.getSelection) {
                        x.browser.mozilla && (x.selection.save(), 1 < x.$el.find('.fr-marker[data-type="false"]').length && (x.$el.find('.fr-marker[data-type="false"][data-id="0"]').remove(), x.$el.find('.fr-marker[data-type="false"]:last').attr("data-id", "0"), x.$el.find(".fr-marker").not('[data-id="0"]').remove()), x.selection.restore());
                        for (var i = x.selection.ranges(), a = 0; a < i.length; a++) {
                            var o = document.createElement("div");
                            o.appendChild(i[a].cloneContents()), n(o, (t = e = void 0, t = null, x.win.getSelection ? (e = x.win.getSelection()) && e.rangeCount && (t = e.getRangeAt(0).commonAncestorContainer).nodeType != Node.ELEMENT_NODE && (t = t.parentNode) : (e = x.doc.selection) && "Control" != e.type && (t = e.createRange().parentElement()), null != t && (0 <= Ee.inArray(x.el, Ee(t).parents()) || t == x.el) ? t : null)), 0 < Ee(o).find(".fr-element").length && (o = x.el), r += o.innerHTML
                        }
                    } else "undefined" != typeof x.doc.selection && "Text" == x.doc.selection.type && (r = x.doc.selection.createRange().htmlText);
                    return r
                },
                insert: function(e, t, n) {
                    var r, i, a;
                    if (x.selection.isCollapsed() || x.selection.remove(), r = t ? e : x.clean.html(e), e.indexOf('class="fr-marker"') < 0 && (i = r, (a = x.doc.createElement("div")).innerHTML = i, x.selection.setAtEnd(a), r = a.innerHTML), x.node.isEmpty(x.el) && !x.opts.keepFormatOnDelete && f(r)) x.el.innerHTML = r;
                    else {
                        var o = x.markers.insert();
                        if (o) {
                            x.node.isLastSibling(o) && Ee(o).parent().hasClass("fr-deletable") && Ee(o).insertAfter(Ee(o).parent());
                            var s = x.node.blockParent(o);
                            if ((f(r) || n) && (x.node.deepestParent(o) || s && "LI" == s.tagName)) {
                                if (s && "LI" == s.tagName && (r = function(e) {
                                        if (!x.html.defaultTag()) return e;
                                        var t = x.doc.createElement("div");
                                        t.innerHTML = e;
                                        for (var n = t.querySelectorAll(":scope > " + x.html.defaultTag()), r = n.length - 1; 0 <= r; r--) {
                                            var i = n[r];
                                            x.node.isBlock(i.previousSibling) || (i.previousSibling && !x.node.isEmpty(i) && Ee("<br>").insertAfter(i.previousSibling), i.outerHTML = i.innerHTML)
                                        }
                                        return t.innerHTML
                                    }(r)), !(o = x.markers.split())) return !1;
                                o.outerHTML = r
                            } else o.outerHTML = r
                        } else x.el.innerHTML = x.el.innerHTML + r
                    }
                    u(), x.keys.positionCaret(), x.events.trigger("html.inserted")
                },
                wrap: t,
                unwrap: function() { x.$el.find("div.fr-temp-div").each(function() { this.previousSibling && this.previousSibling.nodeType === Node.TEXT_NODE && Ee(this).before("<br>"), Ee(this).attr("data-empty") || !this.nextSibling || x.node.isBlock(this.nextSibling) && !Ee(this.nextSibling).hasClass("fr-temp-div") ? Ee(this).replaceWith(Ee(this).html()) : Ee(this).replaceWith(Ee(this).html() + "<br>") }), x.$el.find(".fr-temp-div").removeClass("fr-temp-div").filter(function() { return "" === Ee(this).attr("class") }).removeAttr("class") },
                escapeEntities: function(e) { return e.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/"/gi, "&quot;").replace(/'/gi, "&#39;") },
                checkIfEmpty: i,
                extractNode: h,
                extractNodeAttrs: g,
                extractDoctype: m,
                cleanBRs: function() { for (var e = x.el.getElementsByTagName("br"), t = 0; t < e.length; t++) d(e[t]) },
                _init: function() {
                    if (x.$wp) {
                        var e = function() { E(), x.placeholder && setTimeout(x.placeholder.refresh, 0) };
                        x.events.on("mouseup", e), x.events.on("keydown", e), x.events.on("contentChanged", i)
                    }
                }
            }
        }, Ee.extend(Ee.FE.DEFAULTS, { height: null, heightMax: null, heightMin: null, width: null }), Ee.FE.MODULES.size = function(e) {
            function t() { n(), e.opts.height && e.$el.css("minHeight", e.opts.height - e.helpers.getPX(e.$el.css("padding-top")) - e.helpers.getPX(e.$el.css("padding-bottom"))), e.$iframe.height(e.$el.outerHeight(!0)) }

            function n() { e.opts.heightMin ? e.$el.css("minHeight", e.opts.heightMin) : e.$el.css("minHeight", ""), e.opts.heightMax ? (e.$wp.css("maxHeight", e.opts.heightMax), e.$wp.css("overflow", "auto")) : (e.$wp.css("maxHeight", ""), e.$wp.css("overflow", "")), e.opts.height ? (e.$wp.height(e.opts.height), e.$wp.css("overflow", "auto"), e.$el.css("minHeight", e.opts.height - e.helpers.getPX(e.$el.css("padding-top")) - e.helpers.getPX(e.$el.css("padding-bottom")))) : (e.$wp.css("height", ""), e.opts.heightMin || e.$el.css("minHeight", ""), e.opts.heightMax || e.$wp.css("overflow", "")), e.opts.width && e.$box.width(e.opts.width) }
            return {
                _init: function() {
                    if (!e.$wp) return !1;
                    n(), e.$iframe && (e.events.on("keyup keydown", function() { setTimeout(t, 0) }, !0), e.events.on("commands.after html.set init initialized paste.after", t))
                },
                syncIframe: t,
                refresh: n
            }
        }, Ee.extend(Ee.FE.DEFAULTS, { language: null }), Ee.FE.LANGUAGE = {}, Ee.FE.MODULES.language = function(e) { var t; return { _init: function() { Ee.FE.LANGUAGE && (t = Ee.FE.LANGUAGE[e.opts.language]), t && t.direction && (e.opts.direction = t.direction) }, translate: function(e) { return t && t.translation[e] && t.translation[e].length ? t.translation[e] : e } } }, Ee.extend(Ee.FE.DEFAULTS, { placeholderText: "Type something" }), Ee.FE.MODULES.placeholder = function(c) {
            function e() {
                c.$placeholder || (c.$placeholder = Ee('<span class="fr-placeholder"></span>'), c.$wp.append(c.$placeholder));
                var e = c.opts.iframe ? c.$iframe.prev().outerHeight(!0) : c.$el.prev().outerHeight(!0),
                    t = 0,
                    n = 0,
                    r = 0,
                    i = 0,
                    a = 0,
                    o = 0,
                    s = c.node.contents(c.el),
                    l = Ee(c.selection.element()).css("text-align");
                if (s.length && s[0].nodeType == Node.ELEMENT_NODE) {
                    var d = Ee(s[0]);
                    (!c.opts.toolbarInline || 0 < c.$el.prev().length) && c.ready && (t = c.helpers.getPX(d.css("margin-top")), i = c.helpers.getPX(d.css("padding-top")), n = c.helpers.getPX(d.css("margin-left")), r = c.helpers.getPX(d.css("margin-right")), a = c.helpers.getPX(d.css("padding-left")), o = c.helpers.getPX(d.css("padding-right"))), c.$placeholder.css("font-size", d.css("font-size")), c.$placeholder.css("line-height", d.css("line-height"))
                } else c.$placeholder.css("font-size", c.$el.css("font-size")), c.$placeholder.css("line-height", c.$el.css("line-height"));
                c.$wp.addClass("show-placeholder"), c.$placeholder.css({ marginTop: Math.max(c.helpers.getPX(c.$el.css("margin-top")), t) + (e || 0), paddingTop: Math.max(c.helpers.getPX(c.$el.css("padding-top")), i), paddingLeft: Math.max(c.helpers.getPX(c.$el.css("padding-left")), a), marginLeft: Math.max(c.helpers.getPX(c.$el.css("margin-left")), n), paddingRight: Math.max(c.helpers.getPX(c.$el.css("padding-right")), o), marginRight: Math.max(c.helpers.getPX(c.$el.css("margin-right")), r), textAlign: l }).text(c.language.translate(c.opts.placeholderText || c.$oel.attr("placeholder") || "")), c.$placeholder.html(c.$placeholder.text().replace(/\n/g, "<br>"))
            }

            function t() { c.$wp.removeClass("show-placeholder") }

            function n() {
                if (!c.$wp) return !1;
                c.core.isEmpty() ? e() : t()
            }
            return {
                _init: function() {
                    if (!c.$wp) return !1;
                    c.events.on("init input keydown keyup contentChanged initialized", n)
                },
                show: e,
                hide: t,
                refresh: n,
                isVisible: function() { return !c.$wp || c.node.hasClass(c.$wp.get(0), "show-placeholder") }
            }
        }, Ee.FE.MODULES.edit = function(t) {
            function e() {
                if (t.browser.mozilla) try { t.doc.execCommand("enableObjectResizing", !1, "false"), t.doc.execCommand("enableInlineTableEditing", !1, "false") } catch (e) {}
                if (t.browser.msie) try { t.doc.body.addEventListener("mscontrolselect", function(e) { return e.preventDefault(), !1 }) } catch (e) {}
            }
            var n = !1;

            function r() { return n }
            return { _init: function() { t.events.on("focus", function() { r() ? t.edit.off() : t.edit.on() }) }, on: function() { t.$wp ? (t.$el.attr("contenteditable", !0), t.$el.removeClass("fr-disabled").attr("aria-disabled", !1), t.$tb && t.$tb.removeClass("fr-disabled").removeAttr("aria-disabled"), e()) : t.$el.is("a") && t.$el.attr("contenteditable", !0), n = !1 }, off: function() { t.events.disableBlur(), t.$wp ? (t.$el.attr("contenteditable", !1), t.$el.addClass("fr-disabled").attr("aria-disabled", !0), t.$tb && t.$tb.addClass("fr-disabled").attr("aria-disabled", !0)) : t.$el.is("a") && t.$el.attr("contenteditable", !1), t.events.enableBlur(), n = !0 }, disableDesign: e, isDisabled: r }
        }, Ee.extend(Ee.FE.DEFAULTS, { editorClass: null, typingTimer: 500, iframe: !1, requestWithCORS: !0, requestWithCredentials: !1, requestHeaders: {}, useClasses: !0, spellcheck: !0, iframeDefaultStyle: 'html{margin:0px;height:auto;}body{height:auto;padding:10px;background:transparent;color:#000000;position:relative;z-index: 2;-webkit-user-select:auto;margin:0px;overflow:hidden;min-height:20px;}body:after{content:"";display:block;clear:both;}body::-moz-selection{background:#b5d6fd;color:#000;}body::selection{background:#b5d6fd;color:#000;}', iframeStyle: "", iframeStyleFiles: [], direction: "auto", zIndex: 1, tabIndex: null, disableRightClick: !1, scrollableContainer: "body", keepFormatOnDelete: !1, theme: null }), Ee.FE.MODULES.core = function(a) {
            function t() {
                if (a.$box.addClass("fr-box" + (a.opts.editorClass ? " " + a.opts.editorClass : "")), a.$box.attr("role", "application"), a.$wp.addClass("fr-wrapper"), a.opts.iframe || a.$el.addClass("fr-element fr-view"), a.opts.iframe) {
                    a.$iframe.addClass("fr-iframe"), a.$el.addClass("fr-view");
                    for (var e = 0; e < a.o_doc.styleSheets.length; e++) {
                        var t;
                        try { t = a.o_doc.styleSheets[e].cssRules } catch (i) {}
                        if (t)
                            for (var n = 0, r = t.length; n < r; n++) !t[n].selectorText || 0 !== t[n].selectorText.indexOf(".fr-view") && 0 !== t[n].selectorText.indexOf(".fr-element") || 0 < t[n].style.cssText.length && (0 === t[n].selectorText.indexOf(".fr-view") ? a.opts.iframeStyle += t[n].selectorText.replace(/\.fr-view/g, "body") + "{" + t[n].style.cssText + "}" : a.opts.iframeStyle += t[n].selectorText.replace(/\.fr-element/g, "body") + "{" + t[n].style.cssText + "}")
                    }
                }
                "auto" != a.opts.direction && a.$box.removeClass("fr-ltr fr-rtl").addClass("fr-" + a.opts.direction), a.$el.attr("dir", a.opts.direction), a.$wp.attr("dir", a.opts.direction), 1 < a.opts.zIndex && a.$box.css("z-index", a.opts.zIndex), a.opts.theme && a.$box.addClass(a.opts.theme + "-theme"), a.opts.tabIndex = a.opts.tabIndex || a.$oel.attr("tabIndex"), a.opts.tabIndex && a.$el.attr("tabIndex", a.opts.tabIndex)
            }
            return {
                _init: function() { if (Ee.FE.INSTANCES.push(a), a.drag_support = { filereader: "undefined" != typeof FileReader, formdata: !!a.win.FormData, progress: "upload" in new XMLHttpRequest }, a.$wp) { t(), a.html.set(a._original_html), a.$el.attr("spellcheck", a.opts.spellcheck), a.helpers.isMobile() && (a.$el.attr("autocomplete", a.opts.spellcheck ? "on" : "off"), a.$el.attr("autocorrect", a.opts.spellcheck ? "on" : "off"), a.$el.attr("autocapitalize", a.opts.spellcheck ? "on" : "off")), a.opts.disableRightClick && a.events.$on(a.$el, "contextmenu", function(e) { if (2 == e.button) return !1 }); try { a.doc.execCommand("styleWithCSS", !1, !1) } catch (e) {} } "TEXTAREA" == a.$oel.get(0).tagName && (a.events.on("contentChanged", function() { a.$oel.val(a.html.get()) }), a.events.on("form.submit", function() { a.$oel.val(a.html.get()) }), a.events.on("form.reset", function() { a.html.set(a._original_html) }), a.$oel.val(a.html.get())), a.helpers.isIOS() && a.events.$on(a.$doc, "selectionchange", function() { a.$doc.get(0).hasFocus() || a.$win.get(0).focus() }), a.events.trigger("init"), a.opts.autofocus && !a.opts.initOnClick && a.$wp && a.events.on("initialized", function() { a.events.focus(!0) }) },
                destroy: function(e) { "TEXTAREA" == a.$oel.get(0).tagName && a.$oel.val(e), a.$box && a.$box.removeAttr("role"), a.$wp && ("TEXTAREA" == a.$oel.get(0).tagName ? (a.$el.html(""), a.$wp.html(""), a.$box.replaceWith(a.$oel), a.$oel.show()) : (a.$wp.replaceWith(e), a.$el.html(""), a.$box.removeClass("fr-view fr-ltr fr-box " + (a.opts.editorClass || "")), a.opts.theme && a.$box.addClass(a.opts.theme + "-theme"))), this.$wp = null, this.$el = null, this.el = null, this.$box = null },
                isEmpty: function() { return a.node.isEmpty(a.el) },
                getXHR: function(e, t) { var n = new XMLHttpRequest; for (var r in n.open(t, e, !0), a.opts.requestWithCredentials && (n.withCredentials = !0), a.opts.requestHeaders) a.opts.requestHeaders.hasOwnProperty(r) && n.setRequestHeader(r, a.opts.requestHeaders[r]); return n },
                injectStyle: function(e) {
                    if (a.opts.iframe) {
                        a.$head.find("style[data-fr-style], link[data-fr-style]").remove(), a.$head.append('<style data-fr-style="true">' + e + "</style>");
                        for (var t = 0; t < a.opts.iframeStyleFiles.length; t++) {
                            var n = Ee('<link data-fr-style="true" rel="stylesheet" href="' + a.opts.iframeStyleFiles[t] + '">');
                            n.get(0).addEventListener("load", a.size.syncIframe), a.$head.append(n)
                        }
                    }
                },
                hasFocus: function() { return a.browser.mozilla && a.helpers.isMobile() ? a.selection.inEditor() : a.node.hasFocus(a.el) || 0 < a.$el.find("*:focus").length },
                sameInstance: function(e) { if (!e) return !1; var t = e.data("instance"); return !!t && t.id == a.id }
            }
        }, Ee.FE.MODULES.cursorLists = function(g) {
            function m(e) {
                for (var t = e;
                    "LI" != t.tagName;) t = t.parentNode;
                return t
            }

            function v(e) { for (var t = e; !g.node.isList(t);) t = t.parentNode; return t }
            return {
                _startEnter: function(e) {
                    var t, n = m(e),
                        r = n.nextSibling,
                        i = n.previousSibling,
                        a = g.html.defaultTag();
                    if (g.node.isEmpty(n, !0) && r) {
                        for (var o = "", s = "", l = e.parentNode; !g.node.isList(l) && l.parentNode && "LI" !== l.parentNode.tagName;) o = g.node.openTagString(l) + o, s += g.node.closeTagString(l), l = l.parentNode;
                        o = g.node.openTagString(l) + o, s += g.node.closeTagString(l);
                        var d = "";
                        for (d = l.parentNode && "LI" == l.parentNode.tagName ? s + "<li>" + Ee.FE.MARKERS + "<br>" + o : a ? s + "<" + a + ">" + Ee.FE.MARKERS + "<br></" + a + ">" + o : s + Ee.FE.MARKERS + "<br>" + o, Ee(n).html('<span id="fr-break"></span>');
                            ["UL", "OL"].indexOf(l.tagName) < 0 || l.parentNode && "LI" === l.parentNode.tagName;) l = l.parentNode;
                        var c = g.node.openTagString(l) + Ee(l).html() + g.node.closeTagString(l);
                        c = c.replace(/<span id="fr-break"><\/span>/g, d), Ee(l).replaceWith(c), g.$el.find("li:empty").remove()
                    } else if (i && r || !g.node.isEmpty(n, !0)) {
                        for (var f = "<br>", p = e.parentNode; p && "LI" != p.tagName;) f = g.node.openTagString(p) + f + g.node.closeTagString(p), p = p.parentNode;
                        Ee(n).before("<li>" + f + "</li>"), Ee(e).remove()
                    } else if (i) {
                        t = v(n);
                        for (var u = Ee.FE.MARKERS + "<br>", h = e.parentNode; h && "LI" != h.tagName;) u = g.node.openTagString(h) + u + g.node.closeTagString(h), h = h.parentNode;
                        t.parentNode && "LI" == t.parentNode.tagName ? Ee(t.parentNode).after("<li>" + u + "</li>") : a ? Ee(t).after("<" + a + ">" + u + "</" + a + ">") : Ee(t).after(u), Ee(n).remove()
                    } else(t = v(n)).parentNode && "LI" == t.parentNode.tagName ? r ? Ee(t.parentNode).before(g.node.openTagString(n) + Ee.FE.MARKERS + "<br></li>") : Ee(t.parentNode).after(g.node.openTagString(n) + Ee.FE.MARKERS + "<br></li>") : a ? Ee(t).before("<" + a + ">" + Ee.FE.MARKERS + "<br></" + a + ">") : Ee(t).before(Ee.FE.MARKERS + "<br>"), Ee(n).remove()
                },
                _middleEnter: function(e) {
                    for (var t = m(e), n = "", r = e, i = "", a = ""; r != t;) {
                        var o = "A" == (r = r.parentNode).tagName && g.cursor.isAtEnd(e, r) ? "fr-to-remove" : "";
                        i = g.node.openTagString(Ee(r).clone().addClass(o).get(0)) + i, a = g.node.closeTagString(r) + a
                    }
                    n = a + n + i + Ee.FE.MARKERS + Ee.FE.INVISIBLE_SPACE, Ee(e).replaceWith('<span id="fr-break"></span>');
                    var s = g.node.openTagString(t) + Ee(t).html() + g.node.closeTagString(t);
                    s = s.replace(/<span id="fr-break"><\/span>/g, n), Ee(t).replaceWith(s)
                },
                _endEnter: function(e) {
                    for (var t = m(e), n = Ee.FE.MARKERS, r = "", i = e, a = !1; i != t;) {
                        var o = "A" == (i = i.parentNode).tagName && g.cursor.isAtEnd(e, i) ? "fr-to-remove" : "";
                        a || i == t || g.node.isBlock(i) || (a = !0, r += Ee.FE.INVISIBLE_SPACE), r = g.node.openTagString(Ee(i).clone().addClass(o).get(0)) + r, n += g.node.closeTagString(i)
                    }
                    var s = r + n;
                    Ee(e).remove(), Ee(t).after(s)
                },
                _backspace: function(e) {
                    var t = m(e),
                        n = t.previousSibling;
                    if (n) {
                        n = Ee(n).find(g.html.blockTagsQuery()).get(-1) || n, Ee(e).replaceWith(Ee.FE.MARKERS);
                        var r = g.node.contents(n);
                        r.length && "BR" == r[r.length - 1].tagName && Ee(r[r.length - 1]).remove(), Ee(t).find(g.html.blockTagsQuery()).not("ol, ul, table").each(function() { this.parentNode == t && Ee(this).replaceWith(Ee(this).html() + (g.node.isEmpty(this) ? "" : "<br>")) });
                        for (var i, a = g.node.contents(t)[0]; a && !g.node.isList(a);) i = a.nextSibling, Ee(n).append(a), a = i;
                        for (n = t.previousSibling; a;) i = a.nextSibling, Ee(n).append(a), a = i;
                        Ee(t).remove()
                    } else {
                        var o = v(t);
                        if (Ee(e).replaceWith(Ee.FE.MARKERS), o.parentNode && "LI" == o.parentNode.tagName) {
                            var s = o.previousSibling;
                            g.node.isBlock(s) ? (Ee(t).find(g.html.blockTagsQuery()).not("ol, ul, table").each(function() { this.parentNode == t && Ee(this).replaceWith(Ee(this).html() + (g.node.isEmpty(this) ? "" : "<br>")) }), Ee(s).append(Ee(t).html())) : Ee(o).before(Ee(t).html())
                        } else {
                            var l = g.html.defaultTag();
                            l && 0 === Ee(t).find(g.html.blockTagsQuery()).length ? Ee(o).before("<" + l + ">" + Ee(t).html() + "</" + l + ">") : Ee(o).before(Ee(t).html())
                        }
                        Ee(t).remove(), g.html.wrap(), 0 === Ee(o).find("li").length && Ee(o).remove()
                    }
                },
                _del: function(e) {
                    var t, n = m(e),
                        r = n.nextSibling;
                    if (r) {
                        (t = g.node.contents(r)).length && "BR" == t[0].tagName && Ee(t[0]).remove(), Ee(r).find(g.html.blockTagsQuery()).not("ol, ul, table").each(function() { this.parentNode == r && Ee(this).replaceWith(Ee(this).html() + (g.node.isEmpty(this) ? "" : "<br>")) });
                        for (var i, a = e, o = g.node.contents(r)[0]; o && !g.node.isList(o);) i = o.nextSibling, Ee(a).after(o), a = o, o = i;
                        for (; o;) i = o.nextSibling, Ee(n).append(o), o = i;
                        Ee(e).replaceWith(Ee.FE.MARKERS), Ee(r).remove()
                    } else {
                        for (var s = n; !s.nextSibling && s != g.el;) s = s.parentNode;
                        if (s == g.el) return !1;
                        if (s = s.nextSibling, g.node.isBlock(s)) Ee.FE.NO_DELETE_TAGS.indexOf(s.tagName) < 0 && (Ee(e).replaceWith(Ee.FE.MARKERS), (t = g.node.contents(n)).length && "BR" == t[t.length - 1].tagName && Ee(t[t.length - 1]).remove(), Ee(n).append(Ee(s).html()), Ee(s).remove());
                        else
                            for ((t = g.node.contents(n)).length && "BR" == t[t.length - 1].tagName && Ee(t[t.length - 1]).remove(), Ee(e).replaceWith(Ee.FE.MARKERS); s && !g.node.isBlock(s) && "BR" != s.tagName;) Ee(n).append(Ee(s)), s = s.nextSibling
                    }
                }
            }
        }, Ee.FE.NO_DELETE_TAGS = ["TH", "TD", "TR", "TABLE", "FORM"], Ee.FE.SIMPLE_ENTER_TAGS = ["TH", "TD", "LI", "DL", "DT", "FORM"], Ee.FE.MODULES.cursor = function(u) {
            function a(e) { return !!e && (!!u.node.isBlock(e) || (e.nextSibling && e.nextSibling.nodeType == Node.TEXT_NODE && 0 === e.nextSibling.textContent.replace(/\u200b/g, "").length ? a(e.nextSibling) : !(e.nextSibling && (!e.previousSibling || "BR" != e.nextSibling.tagName || e.nextSibling.nextSibling)) && a(e.parentNode))) }

            function o(e) { return !!e && (!!u.node.isBlock(e) || (e.previousSibling && e.previousSibling.nodeType == Node.TEXT_NODE && 0 === e.previousSibling.textContent.replace(/\u200b/g, "").length ? o(e.previousSibling) : !e.previousSibling && (!(e.previousSibling || !u.node.hasClass(e.parentNode, "fr-inner")) || o(e.parentNode)))) }

            function h(e, t) { return !!e && (e != u.$wp.get(0) && (e.previousSibling && e.previousSibling.nodeType == Node.TEXT_NODE && 0 === e.previousSibling.textContent.replace(/\u200b/g, "").length ? h(e.previousSibling, t) : !e.previousSibling && (e.parentNode == t || h(e.parentNode, t)))) }

            function g(e, t) { return !!e && (e != u.$wp.get(0) && (e.nextSibling && e.nextSibling.nodeType == Node.TEXT_NODE && 0 === e.nextSibling.textContent.replace(/\u200b/g, "").length ? g(e.nextSibling, t) : !(e.nextSibling && (!e.previousSibling || "BR" != e.nextSibling.tagName || e.nextSibling.nextSibling)) && (e.parentNode == t || g(e.parentNode, t)))) }

            function s(e) { return 0 < Ee(e).parentsUntil(u.$el, "LI").length && 0 === Ee(e).parentsUntil("LI", "TABLE").length }

            function d(e, t) {
                var n = new RegExp((t ? "^" : "") + "(([\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+\\u200D)*[\\uD83C-\\uDBFF\\uDC00-\\uDFFF]{2})" + (t ? "" : "$"), "i"),
                    r = e.match(n);
                return r ? r[0].length : 1
            }

            function c(e) {
                for (var t, n = e; !n.previousSibling;)
                    if (n = n.parentNode, u.node.isElement(n)) return !1;
                if (n = n.previousSibling, !u.node.isBlock(n) && u.node.isEditable(n)) {
                    for (t = u.node.contents(n); n.nodeType != Node.TEXT_NODE && !u.node.isDeletable(n) && t.length && u.node.isEditable(n);) n = t[t.length - 1], t = u.node.contents(n);
                    if (n.nodeType == Node.TEXT_NODE) {
                        var r = n.textContent,
                            i = r.length;
                        if (r.length && "\n" === r[r.length - 1]) return n.textContent = r.substring(0, i - 2), 0 === n.textContent.length && n.parentNode.removeChild(n), c(e);
                        if (u.opts.tabSpaces && r.length >= u.opts.tabSpaces) 0 === r.substr(r.length - u.opts.tabSpaces, r.length - 1).replace(/ /g, "").replace(new RegExp(Ee.FE.UNICODE_NBSP, "g"), "").length && (i = r.length - u.opts.tabSpaces + 1);
                        n.textContent = r.substring(0, i - d(r));
                        var a = r.length != n.textContent.length;
                        if (0 === n.textContent.length)
                            if (a && u.opts.keepFormatOnDelete) Ee(n).after(Ee.FE.INVISIBLE_SPACE + Ee.FE.MARKERS);
                            else if ((2 != n.parentNode.childNodes.length || n.parentNode != e.parentNode) && 1 != n.parentNode.childNodes.length || u.node.isBlock(n.parentNode) || u.node.isElement(n.parentNode) || !u.node.isDeletable(n.parentNode)) {
                            for (; !u.node.isElement(n.parentNode) && u.node.isEmpty(n.parentNode);) {
                                var o = n;
                                n = n.parentNode, o.parentNode.removeChild(o)
                            }
                            Ee(n).after(Ee.FE.MARKERS), u.node.isElement(n.parentNode) && !e.nextSibling && n.previousSibling && "BR" == n.previousSibling.tagName && Ee(e).after("<br>"), n.parentNode.removeChild(n)
                        } else Ee(n.parentNode).after(Ee.FE.MARKERS), Ee(n.parentNode).remove();
                        else Ee(n).after(Ee.FE.MARKERS)
                    } else u.node.isDeletable(n) ? (Ee(n).after(Ee.FE.MARKERS), Ee(n).remove()) : e.nextSibling && "BR" == e.nextSibling.tagName && u.node.isVoid(n) && "BR" != n.tagName ? (Ee(e.nextSibling).remove(), Ee(e).replaceWith(Ee.FE.MARKERS)) : !1 !== u.events.trigger("node.remove", [Ee(n)]) && (Ee(n).after(Ee.FE.MARKERS), Ee(n).remove())
                } else if (Ee.FE.NO_DELETE_TAGS.indexOf(n.tagName) < 0 && (u.node.isEditable(n) || u.node.isDeletable(n)))
                    if (u.node.isDeletable(n)) Ee(e).replaceWith(Ee.FE.MARKERS), Ee(n).remove();
                    else if (u.node.isEmpty(n) && !u.node.isList(n)) Ee(n).remove(), Ee(e).replaceWith(Ee.FE.MARKERS);
                else {
                    for (u.node.isList(n) && (n = Ee(n).find("li:last").get(0)), (t = u.node.contents(n)) && "BR" == t[t.length - 1].tagName && Ee(t[t.length - 1]).remove(), t = u.node.contents(n); t && u.node.isBlock(t[t.length - 1]);) n = t[t.length - 1], t = u.node.contents(n);
                    Ee(n).append(Ee.FE.MARKERS);
                    for (var s = e; !s.previousSibling;) s = s.parentNode;
                    for (; s && "BR" !== s.tagName && !u.node.isBlock(s);) {
                        var l = s;
                        s = s.nextSibling, Ee(n).append(l)
                    }
                    s && "BR" == s.tagName && Ee(s).remove(), Ee(e).remove()
                } else e.nextSibling && "BR" == e.nextSibling.tagName && Ee(e.nextSibling).remove()
            }

            function l(e) {
                var t = 0 < Ee(e).parentsUntil(u.$el, "BLOCKQUOTE").length,
                    n = u.node.deepestParent(e, [], !t);
                if (n && "BLOCKQUOTE" == n.tagName) {
                    var r = u.node.deepestParent(e, [Ee(e).parentsUntil(u.$el, "BLOCKQUOTE").get(0)]);
                    r && r.nextSibling && (n = r)
                }
                if (null !== n) {
                    var i, a = n.nextSibling;
                    if (u.node.isBlock(n) && (u.node.isEditable(n) || u.node.isDeletable(n)) && a && Ee.FE.NO_DELETE_TAGS.indexOf(a.tagName) < 0)
                        if (u.node.isDeletable(a)) Ee(a).remove(), Ee(e).replaceWith(Ee.FE.MARKERS);
                        else if (u.node.isBlock(a) && u.node.isEditable(a))
                        if (u.node.isList(a))
                            if (u.node.isEmpty(n, !0)) Ee(n).remove(), Ee(a).find("li:first").prepend(Ee.FE.MARKERS);
                            else { var o = Ee(a).find("li:first"); "BLOCKQUOTE" == n.tagName && (i = u.node.contents(n)).length && u.node.isBlock(i[i.length - 1]) && (n = i[i.length - 1]), 0 === o.find("ul, ol").length && (Ee(e).replaceWith(Ee.FE.MARKERS), o.find(u.html.blockTagsQuery()).not("ol, ul, table").each(function() { this.parentNode == o.get(0) && Ee(this).replaceWith(Ee(this).html() + (u.node.isEmpty(this) ? "" : "<br>")) }), Ee(n).append(u.node.contents(o.get(0))), o.remove(), 0 === Ee(a).find("li").length && Ee(a).remove()) }
                    else {
                        if ((i = u.node.contents(a)).length && "BR" == i[0].tagName && Ee(i[0]).remove(), "BLOCKQUOTE" != a.tagName && "BLOCKQUOTE" == n.tagName)
                            for (i = u.node.contents(n); i.length && u.node.isBlock(i[i.length - 1]);) n = i[i.length - 1], i = u.node.contents(n);
                        else if ("BLOCKQUOTE" == a.tagName && "BLOCKQUOTE" != n.tagName)
                            for (i = u.node.contents(a); i.length && u.node.isBlock(i[0]);) a = i[0], i = u.node.contents(a);
                        Ee(e).replaceWith(Ee.FE.MARKERS), Ee(n).append(a.innerHTML), Ee(a).remove()
                    } else {
                        for (Ee(e).replaceWith(Ee.FE.MARKERS); a && "BR" !== a.tagName && !u.node.isBlock(a) && u.node.isEditable(a);) {
                            var s = a;
                            a = a.nextSibling, Ee(n).append(s)
                        }
                        a && "BR" == a.tagName && u.node.isEditable(a) && Ee(a).remove()
                    }
                }
            }

            function n(e) {
                for (var t, n = e; !n.nextSibling;)
                    if (n = n.parentNode, u.node.isElement(n)) return !1;
                if ("BR" == (n = n.nextSibling).tagName && u.node.isEditable(n))
                    if (n.nextSibling) {
                        if (u.node.isBlock(n.nextSibling) && u.node.isEditable(n.nextSibling)) {
                            if (!(Ee.FE.NO_DELETE_TAGS.indexOf(n.nextSibling.tagName) < 0)) return void Ee(n).remove();
                            n = n.nextSibling, Ee(n.previousSibling).remove()
                        }
                    } else if (a(n)) {
                    if (s(e)) u.cursorLists._del(e);
                    else u.node.deepestParent(n) && ((!u.node.isEmpty(u.node.blockParent(n)) || (u.node.blockParent(n).nextSibling && Ee.FE.NO_DELETE_TAGS.indexOf(u.node.blockParent(n).nextSibling.tagName)) < 0) && Ee(n).remove(), l(e));
                    return
                }
                if (!u.node.isBlock(n) && u.node.isEditable(n)) {
                    for (t = u.node.contents(n); n.nodeType != Node.TEXT_NODE && t.length && !u.node.isDeletable(n) && u.node.isEditable(n);) n = t[0], t = u.node.contents(n);
                    n.nodeType == Node.TEXT_NODE ? (Ee(n).before(Ee.FE.MARKERS), n.textContent.length && (n.textContent = n.textContent.substring(d(n.textContent, !0), n.textContent.length))) : u.node.isDeletable(n) ? (Ee(n).before(Ee.FE.MARKERS), Ee(n).remove()) : !1 !== u.events.trigger("node.remove", [Ee(n)]) && (Ee(n).before(Ee.FE.MARKERS), Ee(n).remove()), Ee(e).remove()
                } else if (Ee.FE.NO_DELETE_TAGS.indexOf(n.tagName) < 0 && (u.node.isEditable(n) || u.node.isDeletable(n)))
                    if (u.node.isDeletable(n)) Ee(e).replaceWith(Ee.FE.MARKERS), Ee(n).remove();
                    else if (u.node.isList(n)) e.previousSibling ? (Ee(n).find("li:first").prepend(e), u.cursorLists._backspace(e)) : (Ee(n).find("li:first").prepend(Ee.FE.MARKERS), Ee(e).remove());
                else if ((t = u.node.contents(n)) && "BR" == t[0].tagName && Ee(t[0]).remove(), t && "BLOCKQUOTE" == n.tagName) {
                    var r = t[0];
                    for (Ee(e).before(Ee.FE.MARKERS); r && "BR" != r.tagName;) {
                        var i = r;
                        r = r.nextSibling, Ee(e).before(i)
                    }
                    r && "BR" == r.tagName && Ee(r).remove()
                } else Ee(e).after(Ee(n).html()).after(Ee.FE.MARKERS), Ee(n).remove()
            }

            function f() { for (var e = u.el.querySelectorAll("blockquote:empty"), t = 0; t < e.length; t++) e[t].parentNode.removeChild(e[t]) }

            function p(e, t, n) {
                var r, i = u.node.deepestParent(e, [], !n);
                if (i && "BLOCKQUOTE" == i.tagName) return g(e, i) ? ((r = u.html.defaultTag()) ? Ee(i).after("<" + r + ">" + Ee.FE.MARKERS + "<br></" + r + ">") : Ee(i).after(Ee.FE.MARKERS + "<br>"), Ee(e).remove()) : m(e, t, n), !1;
                if (null == i)(r = u.html.defaultTag()) && u.node.isElement(e.parentNode) ? Ee(e).replaceWith("<" + r + ">" + Ee.FE.MARKERS + "<br></" + r + ">") : !e.previousSibling || Ee(e.previousSibling).is("br") || e.nextSibling ? Ee(e).replaceWith("<br>" + Ee.FE.MARKERS) : Ee(e).replaceWith("<br>" + Ee.FE.MARKERS + "<br>");
                else {
                    var a = e,
                        o = "";
                    u.node.isBlock(i) && !t || (o = "<br/>");
                    var s, l = "",
                        d = "",
                        c = "",
                        f = "";
                    (r = u.html.defaultTag()) && u.node.isBlock(i) && (c = "<" + r + ">", f = "</" + r + ">", i.tagName == r.toUpperCase() && (c = u.node.openTagString(Ee(i).clone().removeAttr("id").get(0))));
                    do {
                        if (a = a.parentNode, !t || a != i || t && !u.node.isBlock(i))
                            if (l += u.node.closeTagString(a), a == i && u.node.isBlock(i)) d = c + d;
                            else {
                                var p = "A" == a.tagName && g(e, a) ? "fr-to-remove" : "";
                                d = u.node.openTagString(Ee(a).clone().addClass(p).get(0)) + d
                            }
                    } while (a != i);
                    o = l + o + d + (e.parentNode == i && u.node.isBlock(i) ? "" : Ee.FE.INVISIBLE_SPACE) + Ee.FE.MARKERS, u.node.isBlock(i) && !Ee(i).find("*:last").is("br") && Ee(i).append("<br/>"), Ee(e).after('<span id="fr-break"></span>'), Ee(e).remove(), i.nextSibling && !u.node.isBlock(i.nextSibling) || u.node.isBlock(i) || Ee(i).after("<br>"), s = (s = !t && u.node.isBlock(i) ? u.node.openTagString(i) + Ee(i).html() + f : u.node.openTagString(i) + Ee(i).html() + u.node.closeTagString(i)).replace(/<span id="fr-break"><\/span>/g, o), Ee(i).replaceWith(s)
                }
            }

            function m(e, t, n) {
                var r = u.node.deepestParent(e, [], !n);
                if (null == r) u.html.defaultTag() && e.parentNode === u.el ? Ee(e).replaceWith("<" + u.html.defaultTag() + ">" + Ee.FE.MARKERS + "<br></" + u.html.defaultTag() + ">") : (e.nextSibling && !u.node.isBlock(e.nextSibling) || Ee(e).after("<br>"), Ee(e).replaceWith("<br>" + Ee.FE.MARKERS));
                else {
                    var i = e,
                        a = "";
                    "PRE" == r.tagName && (t = !0), u.node.isBlock(r) && !t || (a = "<br>");
                    var o = "",
                        s = "";
                    do {
                        var l = i;
                        if (i = i.parentNode, "BLOCKQUOTE" == r.tagName && u.node.isEmpty(l) && !u.node.hasClass(l, "fr-marker") && 0 < Ee(l).find(e).length && Ee(l).after(e), ("BLOCKQUOTE" != r.tagName || !g(e, i) && !h(e, i)) && (!t || i != r || t && !u.node.isBlock(r))) {
                            o += u.node.closeTagString(i);
                            var d = "A" == i.tagName && g(e, i) ? "fr-to-remove" : "";
                            s = u.node.openTagString(Ee(i).clone().addClass(d).removeAttr("id").get(0)) + s
                        }
                    } while (i != r);
                    var c = r == e.parentNode && u.node.isBlock(r) || e.nextSibling;
                    if ("BLOCKQUOTE" == r.tagName) {
                        e.previousSibling && u.node.isBlock(e.previousSibling) && e.nextSibling && "BR" == e.nextSibling.tagName && (Ee(e.nextSibling).after(e), e.nextSibling && "BR" == e.nextSibling.tagName && Ee(e.nextSibling).remove());
                        var f = u.html.defaultTag();
                        a = o + a + (f ? "<" + f + ">" : "") + Ee.FE.MARKERS + "<br>" + (f ? "</" + f + ">" : "") + s
                    } else a = o + a + s + (c ? "" : Ee.FE.INVISIBLE_SPACE) + Ee.FE.MARKERS;
                    Ee(e).replaceWith('<span id="fr-break"></span>');
                    var p = u.node.openTagString(r) + Ee(r).html() + u.node.closeTagString(r);
                    p = p.replace(/<span id="fr-break"><\/span>/g, a), Ee(r).replaceWith(p)
                }
            }
            return {
                enter: function(t) {
                    var n = u.markers.insert();
                    if (!n) return !0;
                    u.el.normalize();
                    var r = !1;
                    0 < Ee(n).parentsUntil(u.$el, "BLOCKQUOTE").length && (r = !(t = !1)), Ee(n).parentsUntil(u.$el, "TD, TH").length && (r = !1), a(n) ? !s(n) || t || r ? p(n, t, r) : u.cursorLists._endEnter(n) : o(n) ? !s(n) || t || r ? function e(t, n, r) {
                        var i, a = u.node.deepestParent(t, [], !r);
                        if (a && "TABLE" == a.tagName) return Ee(a).find("td:first, th:first").prepend(t), e(t, n, r);
                        if (a && "BLOCKQUOTE" == a.tagName) {
                            if (h(t, a)) return (i = u.html.defaultTag()) ? Ee(a).before("<" + i + ">" + Ee.FE.MARKERS + "<br></" + i + ">") : Ee(a).before(Ee.FE.MARKERS + "<br>"), Ee(t).remove(), !1;
                            g(t, a) ? p(t, n, !0) : m(t, n, !0)
                        }
                        if (null == a)(i = u.html.defaultTag()) && u.node.isElement(t.parentNode) ? Ee(t).replaceWith("<" + i + ">" + Ee.FE.MARKERS + "<br></" + i + ">") : Ee(t).replaceWith("<br>" + Ee.FE.MARKERS);
                        else {
                            if (u.node.isBlock(a))
                                if ("PRE" == a.tagName && (n = !0), n) Ee(t).remove(), Ee(a).prepend("<br>" + Ee.FE.MARKERS);
                                else {
                                    if (u.node.isEmpty(a, !0)) return p(t, n, r);
                                    if (u.opts.keepFormatOnDelete) {
                                        for (var o = t, s = Ee.FE.INVISIBLE_SPACE; o != a && !u.node.isElement(o);) o = o.parentNode, s = u.node.openTagString(o) + s + u.node.closeTagString(o);
                                        Ee(a).before(s)
                                    } else Ee(a).before(u.node.openTagString(Ee(a).clone().removeAttr("id").get(0)) + "<br>" + u.node.closeTagString(a))
                                }
                            else Ee(a).before("<br>");
                            Ee(t).remove()
                        }
                    }(n, t, r) : u.cursorLists._startEnter(n) : !s(n) || t || r ? m(n, t, r) : u.cursorLists._middleEnter(n), u.$el.find(".fr-to-remove").each(function() {
                        for (var e = u.node.contents(this), t = 0; t < e.length; t++) e[t].nodeType == Node.TEXT_NODE && (e[t].textContent = e[t].textContent.replace(/\u200B/g, ""));
                        Ee(this).replaceWith(this.innerHTML)
                    }), u.html.fillEmptyBlocks(!0), u.opts.htmlUntouched || (u.html.cleanEmptyTags(), u.clean.lists()), u.spaces.normalizeAroundCursor(), u.selection.restore()
                },
                backspace: function() {
                    var e = !1,
                        t = u.markers.insert();
                    if (!t) return !0;
                    for (var n = t.parentNode; n && !u.node.isElement(n);) {
                        if ("false" === n.getAttribute("contenteditable")) return Ee(t).replaceWith(Ee.FE.MARKERS), u.selection.restore(), !1;
                        if ("true" === n.getAttribute("contenteditable")) break;
                        n = n.parentNode
                    }
                    u.el.normalize();
                    var r = t.previousSibling;
                    if (r) {
                        var i = r.textContent;
                        i && i.length && 8203 == i.charCodeAt(i.length - 1) && (1 == i.length ? Ee(r).remove() : r.textContent = r.textContent.substr(0, i.length - d(i)))
                    }
                    return a(t) ? e = c(t) : o(t) ? s(t) && h(t, Ee(t).parents("li:first").get(0)) ? u.cursorLists._backspace(t) : function(e) {
                        for (var t = 0 < Ee(e).parentsUntil(u.$el, "BLOCKQUOTE").length, n = u.node.deepestParent(e, [], !t), r = n; n && !n.previousSibling && "BLOCKQUOTE" != n.tagName && n.parentElement != u.el && !u.node.hasClass(n.parentElement, "fr-inner") && Ee.FE.SIMPLE_ENTER_TAGS.indexOf(n.parentElement.tagName) < 0;) n = n.parentElement;
                        if (n && "BLOCKQUOTE" == n.tagName) {
                            var i = u.node.deepestParent(e, [Ee(e).parentsUntil(u.$el, "BLOCKQUOTE").get(0)]);
                            i && i.previousSibling && (r = n = i)
                        }
                        if (null !== n) {
                            var a, o = n.previousSibling;
                            if (u.node.isBlock(n) && u.node.isEditable(n) && o && Ee.FE.NO_DELETE_TAGS.indexOf(o.tagName) < 0)
                                if (u.node.isDeletable(o)) Ee(o).remove(), Ee(e).replaceWith(Ee.FE.MARKERS);
                                else if (u.node.isEditable(o))
                                if (u.node.isBlock(o))
                                    if (u.node.isEmpty(o) && !u.node.isList(o)) Ee(o).remove(), Ee(e).after(u.opts.keepFormatOnDelete ? Ee.FE.INVISIBLE_SPACE : "");
                                    else {
                                        if (u.node.isList(o) && (o = Ee(o).find("li:last").get(0)), (a = u.node.contents(o)).length && "BR" == a[a.length - 1].tagName && Ee(a[a.length - 1]).remove(), "BLOCKQUOTE" == o.tagName && "BLOCKQUOTE" != n.tagName)
                                            for (a = u.node.contents(o); a.length && u.node.isBlock(a[a.length - 1]);) o = a[a.length - 1], a = u.node.contents(o);
                                        else if ("BLOCKQUOTE" != o.tagName && "BLOCKQUOTE" == n.tagName)
                                            for (a = u.node.contents(n); a.length && u.node.isBlock(a[0]);) n = a[0], a = u.node.contents(n);
                                        if (u.node.isEmpty(n)) Ee(e).remove(), u.selection.setAtEnd(o, !0);
                                        else {
                                            Ee(e).replaceWith(Ee.FE.MARKERS);
                                            var s = o.childNodes;
                                            u.node.isBlock(s[s.length - 1]) ? Ee(s[s.length - 1]).append(r.innerHTML) : Ee(o).append(r.innerHTML)
                                        }
                                        Ee(r).remove(), u.node.isEmpty(n) && Ee(n).remove()
                                    }
                            else Ee(e).replaceWith(Ee.FE.MARKERS), "BLOCKQUOTE" == n.tagName && o.nodeType == Node.ELEMENT_NODE ? Ee(o).remove() : (Ee(o).after(u.node.isEmpty(n) ? "" : Ee(n).html()), Ee(n).remove(), "BR" == o.tagName && Ee(o).remove())
                        }
                    }(t) : e = c(t), Ee(t).remove(), f(), u.html.fillEmptyBlocks(!0), u.opts.htmlUntouched || (u.html.cleanEmptyTags(), u.clean.lists(), u.spaces.normalizeAroundCursor()), u.selection.restore(), e
                },
                del: function() {
                    var e = u.markers.insert();
                    if (!e) return !1;
                    if (u.el.normalize(), a(e))
                        if (s(e))
                            if (0 === Ee(e).parents("li:first").find("ul, ol").length) u.cursorLists._del(e);
                            else {
                                var t = Ee(e).parents("li:first").find("ul:first, ol:first").find("li:first");
                                (t = t.find(u.html.blockTagsQuery()).get(-1) || t).prepend(e), u.cursorLists._backspace(e)
                            }
                    else l(e);
                    else o(e), n(e);
                    Ee(e).remove(), f(), u.html.fillEmptyBlocks(!0), u.opts.htmlUntouched || (u.html.cleanEmptyTags(), u.clean.lists()), u.spaces.normalizeAroundCursor(), u.selection.restore()
                },
                isAtEnd: g,
                isAtStart: h
            }
        }, Ee.FE.ENTER_P = 0, Ee.FE.ENTER_DIV = 1, Ee.FE.ENTER_BR = 2, Ee.FE.KEYCODE = { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, ARROW_LEFT: 37, ARROW_UP: 38, ARROW_RIGHT: 39, ARROW_DOWN: 40, DELETE: 46, ZERO: 48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57, FF_SEMICOLON: 59, FF_EQUALS: 61, QUESTION_MARK: 63, A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90, META: 91, NUM_ZERO: 96, NUM_ONE: 97, NUM_TWO: 98, NUM_THREE: 99, NUM_FOUR: 100, NUM_FIVE: 101, NUM_SIX: 102, NUM_SEVEN: 103, NUM_EIGHT: 104, NUM_NINE: 105, NUM_MULTIPLY: 106, NUM_PLUS: 107, NUM_MINUS: 109, NUM_PERIOD: 110, NUM_DIVISION: 111, F1: 112, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F8: 119, F9: 120, F10: 121, F11: 122, F12: 123, FF_HYPHEN: 173, SEMICOLON: 186, DASH: 189, EQUALS: 187, COMMA: 188, HYPHEN: 189, PERIOD: 190, SLASH: 191, APOSTROPHE: 192, TILDE: 192, SINGLE_QUOTE: 222, OPEN_SQUARE_BRACKET: 219, BACKSLASH: 220, CLOSE_SQUARE_BRACKET: 221, IME: 229 }, Ee.extend(Ee.FE.DEFAULTS, { enter: Ee.FE.ENTER_P, multiLine: !0, tabSpaces: 0 }), Ee.FE.MODULES.keys = function(l) {
            var d, n, r, c = !1;

            function e() {
                if (l.browser.mozilla && l.selection.isCollapsed() && !c) {
                    var e = l.selection.ranges(0),
                        t = e.startContainer,
                        n = e.startOffset;
                    t && t.nodeType == Node.TEXT_NODE && n <= t.textContent.length && 0 < n && 32 == t.textContent.charCodeAt(n - 1) && (l.selection.save(), l.spaces.normalize(), l.selection.restore())
                }
            }

            function t() {
                l.selection.isFull() && setTimeout(function() {
                    var e = l.html.defaultTag();
                    e ? l.$el.html("<" + e + ">" + Ee.FE.MARKERS + "<br/></" + e + ">") : l.$el.html(Ee.FE.MARKERS + "<br/>"), l.selection.restore(), l.placeholder.refresh(), l.button.bulkRefresh(), l.undo.saveStep()
                }, 0)
            }

            function i() { c = !1 }

            function a() { c = !1 }

            function f() {
                var e = l.html.defaultTag();
                e ? l.$el.html("<" + e + ">" + Ee.FE.MARKERS + "<br/></" + e + ">") : l.$el.html(Ee.FE.MARKERS + "<br/>"), l.selection.restore()
            }

            function o(e) {
                var t = l.selection.element();
                if (t && 0 <= ["INPUT", "TEXTAREA"].indexOf(t.tagName)) return !0;
                if (e && h(e.which)) return !0;
                l.events.disableBlur(), null;
                var n = e.which;
                if (16 === n) return !0;
                if ((d = n) === Ee.FE.KEYCODE.IME) return c = !0;
                c = !1;
                var r, i, a, o = g(n) && !u(e) && !e.altKey,
                    s = n == Ee.FE.KEYCODE.BACKSPACE || n == Ee.FE.KEYCODE.DELETE;
                if ((l.selection.isFull() && !l.opts.keepFormatOnDelete && !l.placeholder.isVisible() || s && l.placeholder.isVisible() && l.opts.keepFormatOnDelete) && (o || s) && (f(), !g(n))) return e.preventDefault(), !0;
                n == Ee.FE.KEYCODE.ENTER ? e.shiftKey ? ((a = e).preventDefault(), a.stopPropagation(), l.opts.multiLine && (l.selection.isCollapsed() || l.selection.remove(), l.cursor.enter(!0))) : (i = e, l.opts.multiLine ? (l.helpers.isIOS() || (i.preventDefault(), i.stopPropagation()), l.selection.isCollapsed() || l.selection.remove(), l.cursor.enter()) : (i.preventDefault(), i.stopPropagation())) : n === Ee.FE.KEYCODE.BACKSPACE && (e.metaKey || e.ctrlKey) ? setTimeout(function() { l.events.disableBlur(), l.events.focus() }, 0) : n != Ee.FE.KEYCODE.BACKSPACE || u(e) || e.altKey ? n != Ee.FE.KEYCODE.DELETE || u(e) || e.altKey || e.shiftKey ? n == Ee.FE.KEYCODE.SPACE ? function(e) { var t = l.selection.element(); if (!l.helpers.isMobile() && t && "A" == t.tagName) { e.preventDefault(), e.stopPropagation(), l.selection.isCollapsed() || l.selection.remove(); var n = l.markers.insert(); if (n) { var r = n.previousSibling;!n.nextSibling && n.parentNode && "A" == n.parentNode.tagName ? (n.parentNode.insertAdjacentHTML("afterend", "&nbsp;" + Ee.FE.MARKERS), n.parentNode.removeChild(n)) : (r && r.nodeType == Node.TEXT_NODE && 1 == r.textContent.length && 160 == r.textContent.charCodeAt(0) ? r.textContent = r.textContent + " " : n.insertAdjacentHTML("beforebegin", "&nbsp;"), n.outerHTML = Ee.FE.MARKERS), l.selection.restore() } } }(e) : n == Ee.FE.KEYCODE.TAB ? function(e) {
                    if (0 < l.opts.tabSpaces)
                        if (l.selection.isCollapsed()) {
                            l.undo.saveStep(), e.preventDefault(), e.stopPropagation();
                            for (var t = "", n = 0; n < l.opts.tabSpaces; n++) t += "&nbsp;";
                            l.html.insert(t), l.placeholder.refresh(), l.undo.saveStep()
                        } else e.preventDefault(), e.stopPropagation(), e.shiftKey ? l.commands.outdent() : l.commands.indent()
                }(e) : u(e) || !g(e.which) || l.selection.isCollapsed() || e.ctrlKey || l.selection.remove() : l.placeholder.isVisible() ? (l.opts.keepFormatOnDelete || f(), e.preventDefault(), e.stopPropagation()) : ((r = e).preventDefault(), r.stopPropagation(), "" === l.selection.text() ? l.cursor.del() : l.selection.remove(), l.placeholder.refresh()) : l.placeholder.isVisible() ? (l.opts.keepFormatOnDelete || f(), e.preventDefault(), e.stopPropagation()) : function(e) {
                    if (l.selection.isCollapsed())
                        if (l.cursor.backspace(), l.helpers.isIOS()) {
                            var t = l.selection.ranges(0);
                            t.deleteContents(), t.insertNode(document.createTextNode("\u200b")), l.selection.get().modify("move", "forward", "character")
                        } else e.preventDefault(), e.stopPropagation();
                    else e.preventDefault(), e.stopPropagation(), l.selection.remove(), l.html.fillEmptyBlocks();
                    l.placeholder.refresh()
                }(e), l.events.enableBlur()
            }

            function s() {
                if (!l.$wp) return !0;
                var e;
                l.opts.height || l.opts.heightMax ? (e = l.position.getBoundingRect().top, (l.helpers.isIOS() || l.helpers.isAndroid()) && (e -= l.helpers.scrollTop()), l.opts.iframe && (e += l.$iframe.offset().top), e > l.$wp.offset().top - l.helpers.scrollTop() + l.$wp.height() - 20 && l.$wp.scrollTop(e + l.$wp.scrollTop() - (l.$wp.height() + l.$wp.offset().top) + l.helpers.scrollTop() + 20)) : (e = l.position.getBoundingRect().top, l.opts.toolbarBottom && (e += l.opts.toolbarStickyOffset), (l.helpers.isIOS() || l.helpers.isAndroid()) && (e -= l.helpers.scrollTop()), l.opts.iframe && (e += l.$iframe.offset().top, e -= l.helpers.scrollTop()), (e += l.opts.toolbarStickyOffset) > l.o_win.innerHeight - 20 && Ee(l.o_win).scrollTop(e + l.helpers.scrollTop() - l.o_win.innerHeight + 20), e = l.position.getBoundingRect().top, l.opts.toolbarBottom || (e -= l.opts.toolbarStickyOffset), (l.helpers.isIOS() || l.helpers.isAndroid()) && (e -= l.helpers.scrollTop()), l.opts.iframe && (e += l.$iframe.offset().top, e -= l.helpers.scrollTop()), e < l.$tb.height() + 20 && Ee(l.o_win).scrollTop(e + l.helpers.scrollTop() - l.$tb.height() - 20))
            }

            function p(e) {
                var t = l.selection.element();
                if (t && 0 <= ["INPUT", "TEXTAREA"].indexOf(t.tagName)) return !0;
                if (e && 0 === e.which && d && (e.which = d), l.helpers.isAndroid() && l.browser.mozilla) return !0;
                if (c) return !1;
                if (e && l.helpers.isIOS() && e.which == Ee.FE.KEYCODE.ENTER && l.doc.execCommand("delete"), !l.selection.isCollapsed()) return !0;
                if (e && (e.which === Ee.FE.KEYCODE.META || e.which == Ee.FE.KEYCODE.CTRL)) return !0;
                if (e && h(e.which)) return !0;
                e && !l.helpers.isIOS() && (e.which == Ee.FE.KEYCODE.ENTER || e.which == Ee.FE.KEYCODE.BACKSPACE || 37 <= e.which && e.which <= 40 && !l.browser.msie) && s();
                var n, r = l.selection.element();
                ! function(e) { if (!e) return !1; var t = e.innerHTML; return !!((t = t.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")) && /\u200B/.test(t) && 0 < t.replace(/\u200B/gi, "").length) }(r) || l.node.hasClass(r, "fr-marker") || "IFRAME" == r.tagName || (n = r, l.helpers.isIOS() && 0 !== ((n.textContent || "").match(/[\u3041-\u3096\u30A0-\u30FF\u4E00-\u9FFF\u3130-\u318F\uAC00-\uD7AF]/gi) || []).length) || (l.selection.save(), function(e) {
                    for (var t = l.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, l.node.filter(function(e) { return /\u200B/gi.test(e.textContent) }), !1); t.nextNode();) {
                        var n = t.currentNode;
                        n.textContent = n.textContent.replace(/\u200B/gi, "")
                    }
                }(r), l.selection.restore())
            }

            function u(e) { if (-1 != navigator.userAgent.indexOf("Mac OS X")) { if (e.metaKey && !e.altKey) return !0 } else if (e.ctrlKey && !e.altKey) return !0; return !1 }

            function h(e) { if (e >= Ee.FE.KEYCODE.ARROW_LEFT && e <= Ee.FE.KEYCODE.ARROW_DOWN) return !0 }

            function g(e) {
                if (e >= Ee.FE.KEYCODE.ZERO && e <= Ee.FE.KEYCODE.NINE) return !0;
                if (e >= Ee.FE.KEYCODE.NUM_ZERO && e <= Ee.FE.KEYCODE.NUM_MULTIPLY) return !0;
                if (e >= Ee.FE.KEYCODE.A && e <= Ee.FE.KEYCODE.Z) return !0;
                if (l.browser.webkit && 0 === e) return !0;
                switch (e) {
                    case Ee.FE.KEYCODE.SPACE:
                    case Ee.FE.KEYCODE.QUESTION_MARK:
                    case Ee.FE.KEYCODE.NUM_PLUS:
                    case Ee.FE.KEYCODE.NUM_MINUS:
                    case Ee.FE.KEYCODE.NUM_PERIOD:
                    case Ee.FE.KEYCODE.NUM_DIVISION:
                    case Ee.FE.KEYCODE.SEMICOLON:
                    case Ee.FE.KEYCODE.FF_SEMICOLON:
                    case Ee.FE.KEYCODE.DASH:
                    case Ee.FE.KEYCODE.EQUALS:
                    case Ee.FE.KEYCODE.FF_EQUALS:
                    case Ee.FE.KEYCODE.COMMA:
                    case Ee.FE.KEYCODE.PERIOD:
                    case Ee.FE.KEYCODE.SLASH:
                    case Ee.FE.KEYCODE.APOSTROPHE:
                    case Ee.FE.KEYCODE.SINGLE_QUOTE:
                    case Ee.FE.KEYCODE.OPEN_SQUARE_BRACKET:
                    case Ee.FE.KEYCODE.BACKSLASH:
                    case Ee.FE.KEYCODE.CLOSE_SQUARE_BRACKET:
                        return !0;
                    default:
                        return !1
                }
            }

            function m(e) {
                var t = e.which;
                if (u(e) || 37 <= t && t <= 40 || !g(t) && t != Ee.FE.KEYCODE.DELETE && t != Ee.FE.KEYCODE.BACKSPACE && t != Ee.FE.KEYCODE.ENTER && t != Ee.FE.KEYCODE.IME) return !0;
                n || (r = l.snapshot.get(), l.undo.canDo() || l.undo.saveStep()), clearTimeout(n), n = setTimeout(function() { n = null, l.undo.saveStep() }, Math.max(250, l.opts.typingTimer))
            }

            function v(e) {
                var t = e.which;
                if (u(e) || 37 <= t && t <= 40) return !0;
                r && n ? (l.undo.saveStep(r), r = null) : void 0 !== t && 0 !== t || r || n || l.undo.saveStep()
            }

            function E(e) { if (e && "BR" == e.tagName) return !1; try { return 0 === (e.textContent || "").length && e.querySelector && !e.querySelector(":scope > br") || e.childNodes && 1 == e.childNodes.length && e.childNodes[0].getAttribute && ("false" == e.childNodes[0].getAttribute("contenteditable") || l.node.hasClass(e.childNodes[0], "fr-img-caption")) } catch (t) { return !1 } }

            function b(e) {
                var t = l.el.childNodes,
                    n = l.html.defaultTag();
                return !(!e.target || e.target === l.el) || (0 === t.length || void(l.$el.outerHeight() - e.offsetY <= 10 ? E(t[t.length - 1]) && (n ? l.$el.append("<" + n + ">" + Ee.FE.MARKERS + "<br></" + n + ">") : l.$el.append(Ee.FE.MARKERS + "<br>"), l.selection.restore(), s()) : e.offsetY <= 10 && E(t[0]) && (n ? l.$el.prepend("<" + n + ">" + Ee.FE.MARKERS + "<br></" + n + ">") : l.$el.prepend(Ee.FE.MARKERS + "<br>"), l.selection.restore(), s())))
            }

            function T() { n && clearTimeout(n) }
            return { _init: function() { l.events.on("keydown", m), l.events.on("input", e), l.events.on("mousedown", a), l.events.on("keyup input", v), l.events.on("keypress", i), l.events.on("keydown", o), l.events.on("keyup", p), l.events.on("destroy", T), l.events.on("html.inserted", p), l.events.on("cut", t), l.events.on("click", b) }, ctrlKey: u, isCharacter: g, isArrow: h, forceUndo: function() { n && (clearTimeout(n), l.undo.saveStep(), r = null) }, isIME: function() { return c }, isBrowserAction: function(e) { var t = e.which; return u(e) || t == Ee.FE.KEYCODE.F5 }, positionCaret: s }
        }, Ee.FE.MODULES.accessibility = function(f) {
            var a = !0;

            function s(t) {
                t && t.length && !f.$el.find('[contenteditable="true"]').is(":focus") && (t.data("blur-event-set") || t.parents(".fr-popup").length || (f.events.$on(t, "blur", function() {
                    var e = t.parents(".fr-toolbar, .fr-popup").data("instance") || f;
                    e.events.blurActive() && e.events.trigger("blur"), setTimeout(function() { e.events.enableBlur() }, 100)
                }, !0), t.data("blur-event-set", !0)), (t.parents(".fr-toolbar, .fr-popup").data("instance") || f).events.disableBlur(), t.focus(), f.shared.$f_el = t)
            }

            function p(e, t) {
                var n = t ? "last" : "first",
                    r = e.find("button:visible:not(.fr-disabled), .fr-group span.fr-command:visible")[n]();
                if (r.length) return s(r), !0
            }

            function o(e) { return e.is("input, textarea, select") && t(), f.events.disableBlur(), e.focus(), !0 }

            function u(e, t) { var n = e.find("input, textarea, button, select").filter(":visible").not(":disabled").filter(t ? ":last" : ":first"); if (n.length) return o(n); if (f.shared.with_kb) { var r = e.find(".fr-active-item:visible:first"); if (r.length) return o(r); var i = e.find("[tabIndex]:visible:first"); if (i.length) return o(i) } }

            function t() { 0 === f.$el.find(".fr-marker").length && f.core.hasFocus() && f.selection.save() }

            function l() { var e = f.popups.areVisible(); if (e) { var t = e.find(".fr-buttons"); return t.find("button:focus, .fr-group span:focus").length ? !p(e.data("instance").$tb) : !p(t) } return !p(f.$tb) }

            function d() { var e = null; return f.shared.$f_el.is(".fr-dropdown.fr-active") ? e = f.shared.$f_el : f.shared.$f_el.closest(".fr-dropdown-menu").prev().is(".fr-dropdown.fr-active") && (e = f.shared.$f_el.closest(".fr-dropdown-menu").prev()), e }

            function n(e, t, n) {
                if (f.shared.$f_el) {
                    var r = d();
                    r && (f.button.click(r), f.shared.$f_el = r);
                    var i = e.find("button:visible:not(.fr-disabled), .fr-group span.fr-command:visible"),
                        a = i.index(f.shared.$f_el);
                    if (0 === a && !n || a == i.length - 1 && n) {
                        var o;
                        if (t) { if (e.parent().is(".fr-popup")) o = !u(e.parent().children().not(".fr-buttons"), !n);!1 === o && (f.shared.$f_el = null) }
                        t && !1 === o || p(e, !n)
                    } else s(Ee(i.get(a + (n ? 1 : -1))));
                    return !1
                }
            }

            function c(e, t) { return n(e, t, !0) }

            function h(e, t) { return n(e, t) }

            function g(e) { if (f.shared.$f_el) { var t; if (f.shared.$f_el.is(".fr-dropdown.fr-active")) return s(t = e ? f.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").last()), !1; if (f.shared.$f_el.is("a.fr-command")) return (t = e ? f.shared.$f_el.closest("li").nextAll(":visible:first").find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.closest("li").prevAll(":visible:first").find(".fr-command:not(.fr-disabled)").first()).length || (t = e ? f.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").last()), s(t), !1 } }

            function m() {
                if (f.shared.$f_el) {
                    if (f.shared.$f_el.hasClass("fr-dropdown")) f.button.click(f.shared.$f_el);
                    else if (f.shared.$f_el.is("button.fr-back")) {
                        f.opts.toolbarInline && (f.events.disableBlur(), f.events.focus());
                        var e = f.popups.areVisible(f);
                        e && (f.shared.with_kb = !1), f.button.click(f.shared.$f_el), E(e)
                    } else {
                        if (f.events.disableBlur(), f.button.click(f.shared.$f_el), f.shared.$f_el.attr("data-popup")) {
                            var t = f.popups.areVisible(f);
                            t && t.data("popup-button", f.shared.$f_el)
                        } else if (f.shared.$f_el.attr("data-modal")) {
                            var n = f.modals.areVisible(f);
                            n && n.data("modal-button", f.shared.$f_el)
                        }
                        f.shared.$f_el = null
                    }
                    return !1
                }
            }

            function v() { f.shared.$f_el && (f.events.disableBlur(), f.shared.$f_el.blur(), f.shared.$f_el = null), !1 !== f.events.trigger("toolbar.focusEditor") && (f.events.disableBlur(), f.$el.focus(), f.events.focus()) }

            function r(r) {
                r && r.length && (f.events.$on(r, "keydown", function(e) {
                    if (!Ee(e.target).is("a.fr-command, button.fr-command, .fr-group span.fr-command")) return !0;
                    var t = r.parents(".fr-popup").data("instance") || r.data("instance") || f;
                    f.shared.with_kb = !0;
                    var n = t.accessibility.exec(e, r);
                    return f.shared.with_kb = !1, n
                }, !0), f.events.$on(r, "mouseenter", "[tabIndex]", function(e) {
                    var t = r.parents(".fr-popup").data("instance") || r.data("instance") || f;
                    if (!a) return e.stopPropagation(), void e.preventDefault();
                    var n = Ee(e.currentTarget);
                    t.shared.$f_el && t.shared.$f_el.not(n) && t.accessibility.focusEditor()
                }, !0))
            }

            function E(e) {
                var t = e.data("popup-button");
                t && setTimeout(function() { s(t), e.data("popup-button", null) }, 0)
            }

            function i(e) {
                var t = f.popups.areVisible(e);
                t && t.data("popup-button", null)
            }

            function e(e) {
                var t = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey;
                if (e.which == Ee.FE.KEYCODE.F10 && !t && !e.shiftKey && e.altKey) {
                    f.shared.with_kb = !0;
                    var n = f.popups.areVisible(f),
                        r = !1;
                    return n && (r = u(n.children().not(".fr-buttons"))), r || l(), f.shared.with_kb = !1, e.preventDefault(), e.stopPropagation(), !1
                }
                return !0
            }
            return {
                _init: function() { f.$wp ? f.events.on("keydown", e, !0) : f.events.$on(f.$win, "keydown", e, !0), f.events.on("mousedown", function(e) { i(f), f.shared.$f_el && (f.accessibility.restoreSelection(), e.stopPropagation(), f.events.disableBlur(), f.shared.$f_el = null) }, !0), f.events.on("blur", function() { f.shared.$f_el = null, i(f) }, !0) },
                registerPopup: function(e) {
                    var d, c, t = f.popups.get(e),
                        n = (d = e, c = f.popups.get(d), {
                            _tiKeydown: function(e) {
                                var t = c.data("instance") || f;
                                if (!1 === t.events.trigger("popup.tab", [e])) return !1;
                                var n = e.which,
                                    r = c.find(":focus:first");
                                if (Ee.FE.KEYCODE.TAB == n) {
                                    e.preventDefault();
                                    var i = c.children().not(".fr-buttons"),
                                        a = i.find("input, textarea, button, select").filter(":visible").not(".fr-no-touch input, .fr-no-touch textarea, .fr-no-touch button, .fr-no-touch select, :disabled").toArray(),
                                        o = a.indexOf(this) + (e.shiftKey ? -1 : 1);
                                    if (0 <= o && o < a.length) return t.events.disableBlur(), Ee(a[o]).focus(), e.stopPropagation(), !1;
                                    var s = c.find(".fr-buttons");
                                    if (s.length && p(s, !!e.shiftKey)) return e.stopPropagation(), !1;
                                    if (u(i)) return e.stopPropagation(), !1
                                } else {
                                    if (Ee.FE.KEYCODE.ENTER != n || !e.target || "TEXTAREA" === e.target.tagName) return Ee.FE.KEYCODE.ESC == n ? (e.preventDefault(), e.stopPropagation(), t.accessibility.restoreSelection(), t.popups.isVisible(d) && c.find(".fr-back:visible").length ? (t.opts.toolbarInline && (t.events.disableBlur(), t.events.focus()), t.button.exec(c.find(".fr-back:visible:first")), E(c)) : t.popups.isVisible(d) && c.find(".fr-dismiss:visible").length ? t.button.exec(c.find(".fr-dismiss:visible:first")) : (t.popups.hide(d), t.opts.toolbarInline && t.toolbar.showInline(null, !0), E(c)), !1) : Ee.FE.KEYCODE.SPACE == n && (r.is(".fr-submit") || r.is(".fr-dismiss")) ? (e.preventDefault(), e.stopPropagation(), t.events.disableBlur(), t.button.exec(r), !0) : t.keys.isBrowserAction(e) ? void e.stopPropagation() : r.is("input[type=text], textarea") ? void e.stopPropagation() : Ee.FE.KEYCODE.SPACE == n && (r.is(".fr-link-attr") || r.is("input[type=file]")) ? void e.stopPropagation() : (e.stopPropagation(), e.preventDefault(), !1);
                                    var l = null;
                                    0 < c.find(".fr-submit:visible").length ? l = c.find(".fr-submit:visible:first") : c.find(".fr-dismiss:visible").length && (l = c.find(".fr-dismiss:visible:first")), l && (e.preventDefault(), e.stopPropagation(), t.events.disableBlur(), t.button.exec(l))
                                }
                            },
                            _tiMouseenter: function() {
                                var e = c.data("instance") || f;
                                i(e)
                            }
                        });
                    r(t.find(".fr-buttons")), f.events.$on(t, "mouseenter", "tabIndex", n._tiMouseenter, !0), f.events.$on(t.children().not(".fr-buttons"), "keydown", "[tabIndex]", n._tiKeydown, !0), f.popups.onHide(e, function() {
                        (t.data("instance") || f).accessibility.restoreSelection()
                    }), f.popups.onShow(e, function() { a = !1, setTimeout(function() { a = !0 }, 0) })
                },
                registerToolbar: r,
                focusToolbarElement: s,
                focusToolbar: p,
                focusContent: u,
                focusPopup: function(r) {
                    var i = r.children().not(".fr-buttons");
                    i.data("mouseenter-event-set") || (f.events.$on(i, "mouseenter", "[tabIndex]", function(e) {
                        var t = r.data("instance") || f;
                        if (!a) return e.stopPropagation(), void e.preventDefault();
                        var n = i.find(":focus:first");
                        n.length && !n.is("input, button, textarea, select") && (t.events.disableBlur(), n.blur(), t.events.disableBlur(), t.events.focus())
                    }), i.data("mouseenter-event-set", !0)), !u(i) && f.shared.with_kb && p(r.find(".fr-buttons"))
                },
                focusModal: function(e) { f.core.hasFocus() || (f.events.disableBlur(), f.events.focus()), f.accessibility.saveSelection(), f.events.disableBlur(), f.$el.blur(), f.selection.clear(), f.events.disableBlur(), f.shared.with_kb ? e.find(".fr-command[tabIndex], [tabIndex]").first().focus() : e.find("[tabIndex]:first").focus() },
                focusEditor: v,
                focusPopupButton: E,
                focusModalButton: function(e) {
                    var t = e.data("modal-button");
                    t && setTimeout(function() { s(t), e.data("modal-button", null) }, 0)
                },
                hasFocus: function() { return null != f.shared.$f_el },
                exec: function(e, t) {
                    var n = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey,
                        r = e.which,
                        i = !1;
                    return r != Ee.FE.KEYCODE.TAB || n || e.shiftKey || e.altKey ? r != Ee.FE.KEYCODE.ARROW_RIGHT || n || e.shiftKey || e.altKey ? r != Ee.FE.KEYCODE.TAB || n || !e.shiftKey || e.altKey ? r != Ee.FE.KEYCODE.ARROW_LEFT || n || e.shiftKey || e.altKey ? r != Ee.FE.KEYCODE.ARROW_UP || n || e.shiftKey || e.altKey ? r != Ee.FE.KEYCODE.ARROW_DOWN || n || e.shiftKey || e.altKey ? r != Ee.FE.KEYCODE.ENTER && r != Ee.FE.KEYCODE.SPACE || n || e.shiftKey || e.altKey ? r != Ee.FE.KEYCODE.ESC || n || e.shiftKey || e.altKey ? r != Ee.FE.KEYCODE.F10 || n || e.shiftKey || !e.altKey || (i = l()) : i = function(e) { if (f.shared.$f_el) { var t = d(); return t ? (f.button.click(t), s(t)) : e.parent().find(".fr-back:visible").length ? (f.shared.with_kb = !1, f.opts.toolbarInline && (f.events.disableBlur(), f.events.focus()), f.button.exec(e.parent().find(".fr-back:visible:first")), E(e.parent())) : f.shared.$f_el.is("button, .fr-group span") && (e.parent().is(".fr-popup") ? (f.accessibility.restoreSelection(), f.shared.$f_el = null, !1 !== f.events.trigger("toolbar.esc") && (f.popups.hide(e.parent()), f.opts.toolbarInline && f.toolbar.showInline(null, !0), E(e.parent()))) : v()), !1 } }(t) : i = m() : i = f.shared.$f_el && f.shared.$f_el.is(".fr-dropdown:not(.fr-active)") ? m() : g(!0) : i = g() : i = h(t) : i = h(t, !0) : i = c(t) : i = c(t, !0), f.shared.$f_el || i !== undefined || (i = !0), !i && f.keys.isBrowserAction(e) && (i = !0), !!i || (e.preventDefault(), e.stopPropagation(), !1)
                },
                saveSelection: t,
                restoreSelection: function() { f.$el.find(".fr-marker").length && (f.events.disableBlur(), f.selection.restore(), f.events.enableBlur()) }
            }
        }, Ee.FE.MODULES.format = function(g) {
            function l(e, t) { var n = "<" + e; for (var r in t) t.hasOwnProperty(r) && (n += " " + r + '="' + t[r] + '"'); return n += ">" }

            function f(e, t) { var n = e; for (var r in t) t.hasOwnProperty(r) && (n += "id" == r ? "#" + t[r] : "class" == r ? "." + t[r] : "[" + r + '="' + t[r] + '"]'); return n }

            function p(e, t) { return !(!e || e.nodeType != Node.ELEMENT_NODE) && (e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector).call(e, t) }

            function m(e, t, n) {
                if (e) {
                    for (; e.nodeType === Node.COMMENT_NODE;) e = e.nextSibling;
                    if (e) {
                        if (g.node.isBlock(e) && "HR" !== e.tagName) return m(e.firstChild, t, n), !1;
                        for (var r = Ee(l(t, n)).insertBefore(e), i = e; i && !Ee(i).is(".fr-marker") && 0 === Ee(i).find(".fr-marker").length && "UL" != i.tagName && "OL" != i.tagName;) {
                            var a = i;
                            i = i.nextSibling, r.append(a)
                        }
                        if (i)(Ee(i).find(".fr-marker").length || "UL" == i.tagName || "OL" == i.tagName) && m(i.firstChild, t, n);
                        else {
                            for (var o = r.get(0).parentNode; o && !o.nextSibling && !g.node.isElement(o);) o = o.parentNode;
                            if (o) {
                                var s = o.nextSibling;
                                s && (g.node.isBlock(s) ? "HR" === s.tagName ? m(s.nextSibling, t, n) : m(s.firstChild, t, n) : m(s, t, n))
                            }
                        }
                        r.is(":empty") && r.remove()
                    }
                }
            }

            function n(e, t) {
                var n;
                if (void 0 === t && (t = {}), t.style && delete t.style, g.selection.isCollapsed()) { g.markers.insert(), g.$el.find(".fr-marker").replaceWith(l(e, t) + Ee.FE.INVISIBLE_SPACE + Ee.FE.MARKERS + ("</" + e + ">")), g.selection.restore() } else {
                    var r;
                    g.selection.save(), m(g.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling, e, t);
                    do { for (r = g.$el.find(f(e, t) + " > " + f(e, t)), n = 0; n < r.length; n++) r[n].outerHTML = r[n].innerHTML } while (r.length);
                    g.el.normalize();
                    var i = g.el.querySelectorAll(".fr-marker");
                    for (n = 0; n < i.length; n++) { var a = Ee(i[n]);!0 === a.data("type") ? p(a.get(0).nextSibling, f(e, t)) && a.next().prepend(a) : p(a.get(0).previousSibling, f(e, t)) && a.prev().append(a) }
                    g.selection.restore()
                }
            }

            function v(e, t, n, r) {
                if (!r) {
                    var i = !1;
                    if (!0 === e.data("type"))
                        for (; g.node.isFirstSibling(e.get(0)) && !e.parent().is(g.$el) && !e.parent().is("ol") && !e.parent().is("ul");) e.parent().before(e), i = !0;
                    else if (!1 === e.data("type"))
                        for (; g.node.isLastSibling(e.get(0)) && !e.parent().is(g.$el) && !e.parent().is("ol") && !e.parent().is("ul");) e.parent().after(e), i = !0;
                    if (i) return !0
                }
                if (e.parents(t).length || void 0 === t) {
                    var a = "",
                        o = "",
                        s = e.parent();
                    if (s.is(g.$el) || g.node.isBlock(s.get(0))) return !1;
                    for (; !g.node.isBlock(s.parent().get(0)) && (void 0 === t || void 0 !== t && !p(s.get(0), f(t, n)));) a += g.node.closeTagString(s.get(0)), o = g.node.openTagString(s.get(0)) + o, s = s.parent();
                    var l = e.get(0).outerHTML;
                    e.replaceWith('<span id="mark"></span>');
                    var d = s.html().replace(/<span id="mark"><\/span>/, a + g.node.closeTagString(s.get(0)) + o + l + a + g.node.openTagString(s.get(0)) + o);
                    return s.replaceWith(g.node.openTagString(s.get(0)) + d + g.node.closeTagString(s.get(0))), !0
                }
                return !1
            }

            function r(t, n) {
                void 0 === n && (n = {}), n.style && delete n.style;
                var r = g.selection.isCollapsed();
                g.selection.save();
                for (var i = !0; i;) {
                    i = !1;
                    for (var a = g.$el.find(".fr-marker"), o = 0; o < a.length; o++) {
                        var s = Ee(a[o]),
                            l = null;
                        if (s.attr("data-cloned") || r || (l = s.clone().removeClass("fr-marker").addClass("fr-clone"), !0 === s.data("type") ? s.attr("data-cloned", !0).after(l) : s.attr("data-cloned", !0).before(l)), v(s, t, n, r)) { i = !0; break }
                    }
                }! function e(t, n, r, i) {
                    for (var a = g.node.contents(t.get(0)), o = 0; o < a.length; o++) {
                        var s = a[o];
                        if (g.node.hasClass(s, "fr-marker")) n = (n + 1) % 2;
                        else if (n)
                            if (0 < Ee(s).find(".fr-marker").length) n = e(Ee(s), n, r, i);
                            else {
                                for (var l = Ee(s).find(r || "*:not(a):not(br)"), d = l.length - 1; 0 <= d; d--) {
                                    var c = l[d];
                                    g.node.isBlock(c) || g.node.isVoid(c) || void 0 !== r && !p(c, f(r, i)) ? g.node.isBlock(c) && void 0 === r && "TABLE" != s.tagName && g.node.clearAttributes(c) : g.node.hasClass(c, "fr-clone") || (c.outerHTML = c.innerHTML)
                                }
                                void 0 === r && s.nodeType == Node.ELEMENT_NODE && !g.node.isVoid(s) || p(s, f(r, i)) ? Ee(s).replaceWith(s.innerHTML) : void 0 === r && s.nodeType == Node.ELEMENT_NODE && g.node.isBlock(s) && "TABLE" != s.tagName && g.node.clearAttributes(s)
                            }
                        else 0 < Ee(s).find(".fr-marker").length && (n = e(Ee(s), n, r, i))
                    }
                    return n
                }(g.$el, 0, t, n), r || (g.$el.find(".fr-marker").remove(), g.$el.find(".fr-clone").removeClass("fr-clone").addClass("fr-marker")), r && g.$el.find(".fr-marker").before(Ee.FE.INVISIBLE_SPACE).after(Ee.FE.INVISIBLE_SPACE), g.html.cleanEmptyTags(), g.el.normalize(), g.selection.restore()
            }

            function t(e, t) {
                var n, r, i, a, o, s = null;
                if (g.selection.isCollapsed()) {
                    g.markers.insert();
                    var l = (r = g.$el.find(".fr-marker")).parent();
                    if (g.node.openTagString(l.get(0)) == '<span style="' + e + ": " + l.css(e) + ';">') {
                        if (g.node.isEmpty(l.get(0))) s = Ee('<span style="' + e + ": " + t + ';">' + Ee.FE.INVISIBLE_SPACE + Ee.FE.MARKERS + "</span>"), l.replaceWith(s);
                        else {
                            var d = {};
                            d["style*"] = e + ":", v(r, "span", d, !0), r = g.$el.find(".fr-marker"), t ? (s = Ee('<span style="' + e + ": " + t + ';">' + Ee.FE.INVISIBLE_SPACE + Ee.FE.MARKERS + "</span>"), r.replaceWith(s)) : r.replaceWith(Ee.FE.INVISIBLE_SPACE + Ee.FE.MARKERS)
                        }
                        g.html.cleanEmptyTags()
                    } else g.node.isEmpty(l.get(0)) && l.is("span") ? (r.replaceWith(Ee.FE.MARKERS), l.css(e, t)) : (s = Ee('<span style="' + e + ": " + t + ';">' + Ee.FE.INVISIBLE_SPACE + Ee.FE.MARKERS + "</span>"), r.replaceWith(s));
                    s && E(s, e, t)
                } else {
                    if (g.selection.save(), null == t || "color" == e && 0 < g.$el.find(".fr-marker").parents("u, a").length) {
                        var c = g.$el.find(".fr-marker");
                        for (n = 0; n < c.length; n++)
                            if (!0 === (r = Ee(c[n])).data("type"))
                                for (; g.node.isFirstSibling(r.get(0)) && !r.parent().is(g.$el) && !g.node.isElement(r.parent().get(0)) && !g.node.isBlock(r.parent().get(0));) r.parent().before(r);
                            else
                                for (; g.node.isLastSibling(r.get(0)) && !r.parent().is(g.$el) && !g.node.isElement(r.parent().get(0)) && !g.node.isBlock(r.parent().get(0));) r.parent().after(r)
                    }
                    var f = g.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling,
                        p = { "class": "fr-unprocessed" };
                    for (t && (p.style = e + ": " + t + ";"), m(f, "span", p), g.$el.find(".fr-marker + .fr-unprocessed").each(function() { Ee(this).prepend(Ee(this).prev()) }), g.$el.find(".fr-unprocessed + .fr-marker").each(function() { Ee(this).prev().append(this) }), (t || "").match(/\dem$/) && g.$el.find("span.fr-unprocessed").removeClass("fr-unprocessed"); 0 < g.$el.find("span.fr-unprocessed").length;) {
                        if ((s = g.$el.find("span.fr-unprocessed:first").removeClass("fr-unprocessed")).parent().get(0).normalize(), s.parent().is("span") && 1 == s.parent().get(0).childNodes.length) {
                            s.parent().css(e, t);
                            var u = s;
                            s = s.parent(), u.replaceWith(u.html())
                        }
                        var h = s.find("span");
                        for (n = h.length - 1; 0 <= n; n--) i = h[n], a = e, o = void 0, (o = Ee(i)).css(a, ""), "" === o.attr("style") && o.replaceWith(o.html());
                        E(s, e, t)
                    }
                }! function() {
                    var e;
                    for (; 0 < g.$el.find(".fr-split:empty").length;) g.$el.find(".fr-split:empty").remove();
                    g.$el.find(".fr-split").removeClass("fr-split"), g.$el.find('[style=""]').removeAttr("style"), g.$el.find('[class=""]').removeAttr("class"), g.html.cleanEmptyTags(), Ee(g.$el.find("span").get().reverse()).each(function() { this.attributes && 0 !== this.attributes.length || Ee(this).replaceWith(this.innerHTML) }), g.el.normalize();
                    var t = g.$el.find("span[style] + span[style]");
                    for (e = 0; e < t.length; e++) {
                        var n = Ee(t[e]),
                            r = Ee(t[e]).prev();
                        n.get(0).previousSibling == r.get(0) && g.node.openTagString(n.get(0)) == g.node.openTagString(r.get(0)) && (n.prepend(r.html()), r.remove())
                    }
                    g.$el.find("span[style] span[style]").each(function() {
                        if (0 <= Ee(this).attr("style").indexOf("font-size")) {
                            var e = Ee(this).parents("span[style]");
                            0 <= e.attr("style").indexOf("background-color") && (Ee(this).attr("style", Ee(this).attr("style") + ";" + e.attr("style")), v(Ee(this), "span[style]", {}, !1))
                        }
                    }), g.el.normalize(), g.selection.restore()
                }()
            }

            function E(e, t, n) {
                var r, i, a, o = e.parentsUntil(g.$el, "span[style]"),
                    s = [];
                for (r = o.length - 1; 0 <= r; r--) i = o[r], a = t, 0 === Ee(i).attr("style").indexOf(a + ":") || 0 <= Ee(i).attr("style").indexOf(";" + a + ":") || 0 <= Ee(i).attr("style").indexOf("; " + a + ":") || s.push(o[r]);
                if ((o = o.not(s)).length) {
                    for (var l = "", d = "", c = "", f = "", p = e.get(0); p = p.parentNode, Ee(p).addClass("fr-split"), l += g.node.closeTagString(p), d = g.node.openTagString(Ee(p).clone().addClass("fr-split").get(0)) + d, o.get(0) != p && (c += g.node.closeTagString(p), f = g.node.openTagString(Ee(p).clone().addClass("fr-split").get(0)) + f), o.get(0) != p;);
                    var u = l + g.node.openTagString(Ee(o.get(0)).clone().css(t, n || "").get(0)) + f + e.css(t, "").get(0).outerHTML + c + "</span>" + d;
                    e.replaceWith('<span id="fr-break"></span>');
                    var h = o.get(0).outerHTML;
                    Ee(o.get(0)).replaceWith(h.replace(/<span id="fr-break"><\/span>/g, u))
                }
            }

            function i(e, t) {
                void 0 === t && (t = {}), t.style && delete t.style;
                var n = g.selection.ranges(0),
                    r = n.startContainer;
                if (r.nodeType == Node.ELEMENT_NODE && 0 < r.childNodes.length && r.childNodes[n.startOffset] && (r = r.childNodes[n.startOffset]), !n.collapsed && r.nodeType == Node.TEXT_NODE && n.startOffset == (r.textContent || "").length) {
                    for (; !g.node.isBlock(r.parentNode) && !r.nextSibling;) r = r.parentNode;
                    r.nextSibling && (r = r.nextSibling)
                }
                for (var i = r; i && i.nodeType == Node.ELEMENT_NODE && !p(i, f(e, t));) i = i.firstChild;
                if (i && i.nodeType == Node.ELEMENT_NODE && p(i, f(e, t))) return !0;
                var a = r;
                for (a && a.nodeType != Node.ELEMENT_NODE && (a = a.parentNode); a && a.nodeType == Node.ELEMENT_NODE && a != g.el && !p(a, f(e, t));) a = a.parentNode;
                return !(!a || a.nodeType != Node.ELEMENT_NODE || a == g.el || !p(a, f(e, t)))
            }
            return { is: i, toggle: function(e, t) { i(e, t) ? r(e, t) : n(e, t) }, apply: n, remove: r, applyStyle: t, removeStyle: function(e) { t(e, null) } }
        }, Ee.extend(Ee.FE.DEFAULTS, { indentMargin: 20 }), Ee.FE.COMMANDS = {
            bold: {
                title: "Bold",
                toggle: !0,
                refresh: function(e) {
                    var t = this.format.is("strong");
                    e.toggleClass("fr-active", t).attr("aria-pressed", t)
                }
            },
            italic: {
                title: "Italic",
                toggle: !0,
                refresh: function(e) {
                    var t = this.format.is("em");
                    e.toggleClass("fr-active", t).attr("aria-pressed", t)
                }
            },
            underline: {
                title: "Underline",
                toggle: !0,
                refresh: function(e) {
                    var t = this.format.is("u");
                    e.toggleClass("fr-active", t).attr("aria-pressed", t)
                }
            },
            strikeThrough: {
                title: "Strikethrough",
                toggle: !0,
                refresh: function(e) {
                    var t = this.format.is("s");
                    e.toggleClass("fr-active", t).attr("aria-pressed", t)
                }
            },
            subscript: {
                title: "Subscript",
                toggle: !0,
                refresh: function(e) {
                    var t = this.format.is("sub");
                    e.toggleClass("fr-active", t).attr("aria-pressed", t)
                }
            },
            superscript: {
                title: "Superscript",
                toggle: !0,
                refresh: function(e) {
                    var t = this.format.is("sup");
                    e.toggleClass("fr-active", t).attr("aria-pressed", t)
                }
            },
            outdent: { title: "Decrease Indent" },
            indent: { title: "Increase Indent" },
            undo: { title: "Undo", undo: !1, forcedRefresh: !0, disabled: !0 },
            redo: { title: "Redo", undo: !1, forcedRefresh: !0, disabled: !0 },
            insertHR: { title: "Insert Horizontal Line" },
            clearFormatting: { title: "Clear Formatting" },
            selectAll: { title: "Select All", undo: !1 }
        }, Ee.FE.RegisterCommand = function(e, t) { Ee.FE.COMMANDS[e] = t }, Ee.FE.MODULES.commands = function(o) {
            function i(e) { return o.html.defaultTag() && (e = "<" + o.html.defaultTag() + ">" + e + "</" + o.html.defaultTag() + ">"), e }
            var a = {
                bold: function() { e("bold", "strong") },
                subscript: function() { o.format.is("sup") && o.format.remove("sup"), e("subscript", "sub") },
                superscript: function() { o.format.is("sub") && o.format.remove("sub"), e("superscript", "sup") },
                italic: function() { e("italic", "em") },
                strikeThrough: function() { e("strikeThrough", "s") },
                underline: function() { e("underline", "u") },
                undo: function() { o.undo.run() },
                redo: function() { o.undo.redo() },
                indent: function() { n(1) },
                outdent: function() { n(-1) },
                show: function() { o.opts.toolbarInline && o.toolbar.showInline(null, !0) },
                insertHR: function() {
                    o.selection.remove();
                    var e = "";
                    o.core.isEmpty() && (e = i(e = "<br>")), o.html.insert('<hr id="fr-just">' + e);
                    var t, n = o.$el.find("hr#fr-just");
                    if (n.removeAttr("id"), 0 === n.next().length) {
                        var r = o.html.defaultTag();
                        r ? n.after(Ee("<" + r + ">").append("<br>")) : n.after("<br>")
                    }
                    n.prev().is("hr") ? t = o.selection.setAfter(n.get(0), !1) : n.next().is("hr") ? t = o.selection.setBefore(n.get(0), !1) : o.selection.setAfter(n.get(0), !1) || o.selection.setBefore(n.get(0), !1), t || void 0 === t || (e = i(e = Ee.FE.MARKERS + "<br>"), n.after(e)), o.selection.restore()
                },
                clearFormatting: function() { o.format.remove() },
                selectAll: function() { o.doc.execCommand("selectAll", !1, !1) }
            };

            function t(e, t) {
                if (!1 !== o.events.trigger("commands.before", Ee.merge([e], t || []))) {
                    var n = Ee.FE.COMMANDS[e] && Ee.FE.COMMANDS[e].callback || a[e],
                        r = !0,
                        i = !1;
                    Ee.FE.COMMANDS[e] && ("undefined" != typeof Ee.FE.COMMANDS[e].focus && (r = Ee.FE.COMMANDS[e].focus), "undefined" != typeof Ee.FE.COMMANDS[e].accessibilityFocus && (i = Ee.FE.COMMANDS[e].accessibilityFocus)), (!o.core.hasFocus() && r && !o.popups.areVisible() || !o.core.hasFocus() && i && o.accessibility.hasFocus()) && o.events.focus(!0), Ee.FE.COMMANDS[e] && !1 !== Ee.FE.COMMANDS[e].undo && (o.$el.find(".fr-marker").length && (o.events.disableBlur(), o.selection.restore()), o.undo.saveStep()), n && n.apply(o, Ee.merge([e], t || [])), o.events.trigger("commands.after", Ee.merge([e], t || [])), Ee.FE.COMMANDS[e] && !1 !== Ee.FE.COMMANDS[e].undo && o.undo.saveStep()
                }
            }

            function e(e, t) { o.format.toggle(t) }

            function n(e) {
                o.selection.save(), o.html.wrap(!0, !0, !0, !0), o.selection.restore();
                for (var t = o.selection.blocks(), n = 0; n < t.length; n++)
                    if ("LI" != t[n].tagName && "LI" != t[n].parentNode.tagName) {
                        var r = Ee(t[n]),
                            i = "rtl" == o.opts.direction || "rtl" == r.css("direction") ? "margin-right" : "margin-left",
                            a = o.helpers.getPX(r.css(i));
                        if (r.width() < 2 * o.opts.indentMargin && 0 < e) continue;
                        r.css(i, Math.max(a + e * o.opts.indentMargin, 0) || ""), r.removeClass("fr-temp-div")
                    }
                o.selection.save(), o.html.unwrap(), o.selection.restore()
            }

            function r(e) { return function() { t(e) } }
            var s = {};
            for (var l in a) a.hasOwnProperty(l) && (s[l] = r(l));
            return Ee.extend(s, {
                exec: t,
                _init: function() {
                    o.events.on("keydown", function(e) { var t = o.selection.element(); if (t && "HR" == t.tagName && !o.keys.isArrow(e.which)) return e.preventDefault(), !1 }), o.events.on("keyup", function(e) {
                        var t = o.selection.element();
                        if (t && "HR" == t.tagName)
                            if (e.which == Ee.FE.KEYCODE.ARROW_LEFT || e.which == Ee.FE.KEYCODE.ARROW_UP) { if (t.previousSibling) return o.node.isBlock(t.previousSibling) ? o.selection.setAtEnd(t.previousSibling) : Ee(t).before(Ee.FE.MARKERS), o.selection.restore(), !1 } else if ((e.which == Ee.FE.KEYCODE.ARROW_RIGHT || e.which == Ee.FE.KEYCODE.ARROW_DOWN) && t.nextSibling) return o.node.isBlock(t.nextSibling) ? o.selection.setAtStart(t.nextSibling) : Ee(t).after(Ee.FE.MARKERS), o.selection.restore(), !1
                    }), o.events.on("mousedown", function(e) { if (e.target && "HR" == e.target.tagName) return e.preventDefault(), e.stopPropagation(), !1 }), o.events.on("mouseup", function() {
                        var e = o.selection.element();
                        e == o.selection.endElement() && e && "HR" == e.tagName && (e.nextSibling && (o.node.isBlock(e.nextSibling) ? o.selection.setAtStart(e.nextSibling) : Ee(e).after(Ee.FE.MARKERS)), o.selection.restore())
                    })
                }
            })
        }, Ee.FE.MODULES.data = function(f) {
            var p = "NCKB1zwtPA9tqzajXC2c2A7B-16VD3spzJ1C9C3D5oOF2OB1NB1LD7VA5QF4TE3gytXB2A4C-8VA2AC4E1D3GB2EB2KC3KD1MF1juuSB1A8C6yfbmd1B2a1A5qdsdB2tivbC3CB1KC1CH1eLA2sTF1B4I4H-7B-21UB6b1F5bzzzyAB4JC3MG2hjdKC1JE6C1E1cj1pD-16pUE5B4prra2B5ZB3D3C3pxj1EA6A3rnJA2C-7I-7JD9D1E1wYH1F3sTB5TA2G4H4ZA22qZA5BB3mjcvcCC3JB1xillavC-21VE6PC5SI4YC5C8mb1A3WC3BD2B5aoDA2qqAE3A5D-17fOD1D5RD4WC10tE6OAZC3nF-7b1C4A4D3qCF2fgmapcromlHA2QA6a1E1D3e1A6C2bie2F4iddnIA7B2mvnwcIB5OA1DB2OLQA3PB10WC7WC5d1E3uI-7b1D5D6b1E4D2arlAA4EA1F-11srxI-7MB1D7PF1E5B4adB-21YD5vrZH3D3xAC4E1A2GF2CF2J-7yNC2JE1MI2hH-7QB1C6B5B-9bA-7XB13a1B5VievwpKB4LA3NF-10H-9I-8hhaC-16nqPG4wsleTD5zqYF3h1G2B7B4yvGE2Pi1H-7C-21OE6B1uLD1kI4WC1E7C5g1D-8fue1C8C6c1D4D3Hpi1CC4kvGC2E1legallyXB4axVA11rsA4A-9nkdtlmzBA2GD3A13A6CB1dabE1lezrUE6RD5TB4A-7f1C8c1B5d1D4D3tyfCD5C2D2==",
                u = function() { for (var e = 0, t = document.domain, n = t.split("."), r = "_gd" + (new Date).getTime(); e < n.length - 1 && -1 == document.cookie.indexOf(r + "=" + r);) t = n.slice(-1 - ++e).join("."), document.cookie = r + "=" + r + ";domain=" + t + ";"; return document.cookie = r + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + t + ";", (t || "").replace(/(^\.*)|(\.*$)/g, "") }();

            function h(e) { return e }
            var g, m, v = h(function(e) {
                if (!e) return e;
                for (var t = "", n = h("charCodeAt"), r = h("fromCharCode"), i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".indexOf(e[0]), a = 1; a < e.length - 2; a++) {
                    for (var o = d(++i), s = e[n](a), l = "";
                        /[0-9-]/.test(e[a + 1]);) l += e[++a];
                    s = E(s, o, l = parseInt(l, 10) || 0), s ^= i - 1 & 31, t += String[r](s)
                }
                return t
            });

            function d(e) { for (var t = e.toString(), n = 0, r = 0; r < t.length; r++) n += parseInt(t.charAt(r), 10); return 10 < n ? n % 9 + 1 : n }

            function E(e, t, n) { for (var r = Math.abs(n); 0 < r--;) e -= t; return n < 0 && (e += 123), e }

            function b(e) { return !(!e || "block" === e.css("display") || (e.remove(), 0)) }

            function T(e) { return e && 0 === f.$box.find(e).length }
            var e = 0;

            function A() {
                if (10 < e && (f[h(v("0ppecjvc=="))](), setTimeout(function() { Ee.FE = null }, 10)), !f.$box) return !1;
                f.$wp.prepend(v(h(v(p)))), g = f.$wp.find("> div:first"), m = g.find("> a"), "rtl" == f.opts.direction && g.css("left", "auto").css("right", 0).attr("direction", "rtl"), e++
            }

            function C(e) {
                for (var t = [v("9qqG-7amjlwq=="), v("KA3B3C2A6D1D5H5H1A3=="), v("3B9B3B5F3C4G3E3=="), v("QzbzvxyB2yA-9m=="), v("ji1kacwmgG5bc=="), v("nmA-13aogi1A3c1jd==")], n = 0; n < t.length; n++)
                    if (String.prototype.endsWith || (String.prototype.endsWith = function(e, t) { return (t === undefined || t > this.length) && (t = this.length), this.substring(t - e.length, t) === e }), e.endsWith(t[n])) return !0;
                return !1
            }
            return {
                _init: function() {
                    var e = f.o_win.FEK;
                    try { e = e || localStorage && localStorage.FEK } catch (E) {}
                    e = f.opts.key || e || [""];
                    var t = v(h("ziRA1E3B9pA5B-11D-11xg1A3ZB5D1D4B-11ED2EG2pdeoC1clIH4wB-22yQD5uF4YE3E3A9=="));
                    "string" == typeof e && (e = [e]);
                    for (var n, r, i, a = !(f.ul = !0), o = 0, s = 0; s < e.length; s++) {
                        var l = (r = e[s], 3 === (i = (v(r) || "").split("|")).length ? i : [null, null, v(r) || ""]),
                            d = l[2];
                        if (d === v(h(v("mcVRDoB1BGILD7YFe1BTXBA7B6=="))) || 0 <= d.indexOf(u, d.length - u.length) || C(u)) {
                            if (!(null === (n = l[1]) || new Date(n) < new Date(v("OB1F1A4D3I1A15A11D3E6B5=="))) || C(u)) { f.ul = !1; break }
                            a = !0, p = "RCZB17botVG4A-8yzia1C4A5DG3CD2cFB4qflmCE4I2FB1SC7F6PE4WE3RD6e2A4c1D3d1E2E3ehxdGE3CE2IB2LC1HG2LE1QA3QC7B-13cC-9epmkjc1B4e1C4pgjgvkOC5E1eNE1HB2LD2B-13WD5tvabUA5a1A4f1A2G3C2A-21cihKE3FE2DB2cccJE1iC-7G-7tD-17tVD6A-9qC-7QC7a1E4B4je1E3E2G2ecmsAA1xH-8HB11C1D1lgzQA3dTB8od1D4XE3ohb1B4E4D3mbLA10NA7C-21d1genodKC11PD9PE5tA-8UI3ZC5XB5B-11qXF2F-7wtwjAG3NA1IB1OD1HC1RD4QJ4evUF2D5XG2G4XA8pqocH1F3G2J2hcpHC4D1MD4C1MB8PD5klcQD1A8A6e2A3ed1E2A24A7HC5C3qA-9tiA-61dcC3MD1LE1D4SA3A9ZZXSE4g1C3Pa2C5ufbcGI3I2B4skLF2CA1vxB-22wgUC4kdH-8cVB5iwe1A2D3H3G-7DD5JC2ED2OH2JB10D3C2xHE1KA29PB11wdC-11C4cixb2C7a1C4YYE3B2A15uB-21wpCA1MF1NuC-21dyzD6pPG4I-7pmjc1A4yte1F3B-22yvCC3VbC-7qC-22qNE2hC1vH-8zad1RF6WF3DpI-7C8A-16hpf1F3D2ylalB-13BB2lpA-63IB3uOF6D5G4gabC-21UD2A3PH4ZA20B11b2C6ED4A2H3I1A15DB4KD2laC-8LA5B8B7==", o = l[0] || -1
                        }
                    }
                    var c = new Image;
                    !0 === f.ul && (A(), c.src = a ? h(v(t)) + "e=" + o : h(v(t)) + "u"), !0 === f.ul && f.events.on("contentChanged", function() {
                        (b(g) || b(m) || T(g) || T(m)) && A()
                    }), f.events.on("destroy", function() { g && g.length && g.remove() }, !0)
                }
            }
        }, Ee.extend(Ee.FE.DEFAULTS, { pastePlain: !1, pasteDeniedTags: ["colgroup", "col", "meta"], pasteDeniedAttrs: ["class", "id", "style"], pasteAllowedStyleProps: [".*"], pasteAllowLocalImages: !1 }), Ee.FE.MODULES.paste = function(b) {
            var o, s, i, T;

            function n(e, t) { try { b.win.localStorage.setItem("fr-copied-html", e), b.win.localStorage.setItem("fr-copied-text", t) } catch (n) {} }

            function e(e) {
                var t = b.html.getSelected();
                n(t, Ee("<div>").html(t).text()), "cut" == e.type && (b.undo.saveStep(), setTimeout(function() { b.selection.save(), b.html.wrap(), b.selection.restore(), b.events.focus(), b.undo.saveStep() }, 0))
            }
            var a = !1;

            function t(e) {
                if (a) return !1;
                if (e.originalEvent && (e = e.originalEvent), !1 === b.events.trigger("paste.before", [e])) return e.preventDefault(), !1;
                if (b.$win.scrollTop(), e && e.clipboardData && e.clipboardData.getData) {
                    var t = "",
                        n = e.clipboardData.types;
                    if (b.helpers.isArray(n))
                        for (var r = 0; r < n.length; r++) t += n[r] + ";";
                    else t = n;
                    if (o = "", /text\/rtf/.test(t) && (s = e.clipboardData.getData("text/rtf")), /text\/html/.test(t) && !b.browser.safari ? o = e.clipboardData.getData("text/html") : /text\/rtf/.test(t) && b.browser.safari ? o = s : /public.rtf/.test(t) && b.browser.safari && (o = e.clipboardData.getData("text/rtf")), "" !== o) return l(), e.preventDefault && (e.stopPropagation(), e.preventDefault()), !1;
                    o = null
                }
                return function() {
                    b.selection.save(), b.events.disableBlur(), o = null, i ? (i.html(""), b.browser.edge && b.opts.iframe && b.$el.append(i)) : (i = Ee('<div contenteditable="true" style="position: fixed; top: 0; left: -9999px; height: 100%; width: 0; word-break: break-all; overflow:hidden; z-index: 2147483647; line-height: 140%; -moz-user-select: text; -webkit-user-select: text; -ms-user-select: text; user-select: text;" tabIndex="-1"></div>'), b.browser.safari ? (i.css("top", b.$sc.scrollTop()), b.$el.after(i)) : b.browser.edge && b.opts.iframe ? b.$el.append(i) : b.$box.after(i), b.events.on("destroy", function() { i.remove() }));
                    i.focus(), b.win.setTimeout(l, 1)
                }(), !1
            }

            function r(e) {
                if (e.originalEvent && (e = e.originalEvent), e && e.dataTransfer && e.dataTransfer.getData) {
                    var t = "",
                        n = e.dataTransfer.types;
                    if (b.helpers.isArray(n))
                        for (var r = 0; r < n.length; r++) t += n[r] + ";";
                    else t = n;
                    if (o = "", /text\/rtf/.test(t) && (s = e.dataTransfer.getData("text/rtf")), /text\/html/.test(t) ? o = e.dataTransfer.getData("text/html") : /text\/rtf/.test(t) && b.browser.safari ? o = s : /text\/plain/.test(t) && !this.browser.mozilla && (o = b.html.escapeEntities(e.dataTransfer.getData("text/plain")).replace(/\n/g, "<br>")), "" !== o) { b.keys.forceUndo(), T = b.snapshot.get(), b.selection.save(), b.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-helper"); var i = b.markers.insertAtPoint(e); if (b.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-placeholder"), b.$el.find(".fr-marker-helper").addClass("fr-marker").removeClass("fr-marker-helper"), b.selection.restore(), b.selection.remove(), b.$el.find(".fr-marker-placeholder").addClass("fr-marker").removeClass("fr-marker-placeholder"), !1 !== i) { var a = b.el.querySelector(".fr-marker"); return Ee(a).replaceWith(Ee.FE.MARKERS), b.selection.restore(), l(), e.preventDefault && (e.stopPropagation(), e.preventDefault()), !1 } } else o = null
                }
            }

            function l() {
                b.browser.edge && b.opts.iframe && b.$box.after(i), T || (b.keys.forceUndo(), T = b.snapshot.get()), o || (o = i.get(0).innerHTML, b.selection.restore(), b.events.enableBlur());
                var e = o.match(/(class=\"?Mso|class=\'?Mso|class="?Xl|class='?Xl|class=Xl|style=\"[^\"]*\bmso\-|style=\'[^\']*\bmso\-|w:WordDocument)/gi),
                    t = b.events.chainTrigger("paste.beforeCleanup", o);
                t && "string" == typeof t && (o = t), (!e || e && !1 !== b.events.trigger("paste.wordPaste", [o])) && d(o, e)
            }

            function A(e) { for (var t = "", n = 0; n++ < e;) t += "&nbsp;"; return t }

            function d(e, t, n) {
                var r, i = null,
                    a = null;
                if (0 <= e.toLowerCase().indexOf("<body")) {
                    var o = "";
                    0 <= e.indexOf("<style") && (o = e.replace(/[.\s\S\w\W<>]*(<style[^>]*>[\s]*[.\s\S\w\W<>]*[\s]*<\/style>)[.\s\S\w\W<>]*/gi, "$1")), e = (e = o + e.replace(/[.\s\S\w\W<>]*<body[^>]*>[\s]*([.\s\S\w\W<>]*)[\s]*<\/body>[.\s\S\w\W<>]*/gi, "$1")).replace(/ \n/g, " ").replace(/\n /g, " ").replace(/([^>])\n([^<])/g, "$1 $2")
                }
                var s = !1;
                0 <= e.indexOf('id="docs-internal-guid') && (e = e.replace(/^[\w\W\s\S]* id="docs-internal-guid[^>]*>([\w\W\s\S]*)<\/b>[\w\W\s\S]*$/g, "$1"), s = !0);
                var l = !1;
                if (!t && ((l = function(e) { var t = null; try { t = b.win.localStorage.getItem("fr-copied-text") } catch (n) {} return !(!t || Ee("<div>").html(e).text().replace(/\u00A0/gi, " ").replace(/\r|\n/gi, "") != t.replace(/\u00A0/gi, " ").replace(/\r|\n/gi, "")) }(e)) && (e = b.win.localStorage.getItem("fr-copied-html")), !l)) {
                    var d = b.opts.htmlAllowedStyleProps;
                    b.opts.htmlAllowedStyleProps = b.opts.pasteAllowedStyleProps, b.opts.htmlAllowComments = !1, e = (e = (e = e.replace(/<span class="Apple-tab-span">\s*<\/span>/g, A(b.opts.tabSpaces || 4))).replace(/<span class="Apple-tab-span" style="white-space:pre">(\t*)<\/span>/g, function(e, t) { return A(t.length * (b.opts.tabSpaces || 4)) })).replace(/\t/g, A(b.opts.tabSpaces || 4)), e = b.clean.html(e, b.opts.pasteDeniedTags, b.opts.pasteDeniedAttrs), b.opts.htmlAllowedStyleProps = d, b.opts.htmlAllowComments = !0, e = (e = (e = C(e)).replace(/\r/g, "")).replace(/^ */g, "").replace(/ *$/g, "")
                }!t || b.wordPaste && n || (0 === (e = e.replace(/^\n*/g, "").replace(/^ /g, "")).indexOf("<colgroup>") && (e = "<table>" + e + "</table>"), e = C(e = function(e) {
                    var t;
                    e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/<p(.*?)class="?'?MsoListParagraph"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li>$3</li></ul>")).replace(/<p(.*?)class="?'?NumberedText"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li>$3</li></ol>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li$3>$5</li>")).replace(/<p(.*?)class="?'?NumberedTextCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?NumberedTextCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListBullet"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ul>")).replace(/<p(.*?)class="?'?NumberedTextCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ol>")).replace(/<span([^<]*?)style="?'?mso-list:Ignore"?'?([\s\S]*?)>([\s\S]*?)<span/gi, "<span><span")).replace(/<!--\[if \!supportLists\]-->([\s\S]*?)<!--\[endif\]-->/gi, "")).replace(/<!\[if \!supportLists\]>([\s\S]*?)<!\[endif\]>/gi, "")).replace(/(\n|\r| class=(")?Mso[a-zA-Z0-9]+(")?)/gi, " ")).replace(/<!--[\s\S]*?-->/gi, "")).replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi, "");
                    var n, r = ["style", "script", "applet", "embed", "noframes", "noscript"];
                    for (t = 0; t < r.length; t++) {
                        var i = new RegExp("<" + r[t] + ".*?" + r[t] + "(.*?)>", "gi");
                        e = e.replace(i, "")
                    }
                    for (e = (e = (e = e.replace(/&nbsp;/gi, " ")).replace(/<td([^>]*)><\/td>/g, "<td$1><br></td>")).replace(/<th([^>]*)><\/th>/g, "<th$1><br></th>");
                        (e = (n = e).replace(/<[^\/>][^>]*><\/[^>]+>/gi, "")) != n;);
                    e = (e = e.replace(/<lilevel([^1])([^>]*)>/gi, '<li data-indent="true"$2>')).replace(/<lilevel1([^>]*)>/gi, "<li$1>"), e = (e = (e = b.clean.html(e, b.opts.pasteDeniedTags, b.opts.pasteDeniedAttrs)).replace(/<a>(.[^<]+)<\/a>/gi, "$1")).replace(/<br> */g, "<br>");
                    var a = b.o_doc.createElement("div");
                    a.innerHTML = e;
                    var o = a.querySelectorAll("li[data-indent]");
                    for (t = 0; t < o.length; t++) {
                        var s = o[t],
                            l = s.previousElementSibling;
                        if (l && "LI" == l.tagName) {
                            var d = l.querySelector(":scope > ul, :scope > ol");
                            d || (d = document.createElement("ul"), l.appendChild(d)), d.appendChild(s)
                        } else s.removeAttribute("data-indent")
                    }
                    return b.html.cleanBlankSpaces(a), e = a.innerHTML
                }(e))), b.opts.pastePlain && !l && (e = function(e) {
                    var t, n = null,
                        r = b.doc.createElement("div");
                    r.innerHTML = e;
                    var i = r.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote");
                    for (t = 0; t < i.length; t++)(n = i[t]).outerHTML = "<" + (b.html.defaultTag() || "DIV") + ">" + n.innerHTML + "</" + (b.html.defaultTag() || "DIV") + ">";
                    for (t = (i = r.querySelectorAll("*:not(" + "p, div, h1, h2, h3, h4, h5, h6, pre, blockquote, ul, ol, li, table, tbody, thead, tr, td, br, img".split(",").join("):not(") + ")")).length - 1; 0 <= t; t--)(n = i[t]).outerHTML = n.innerHTML;
                    var a = function(e) { for (var t = b.node.contents(e), n = 0; n < t.length; n++) t[n].nodeType != Node.TEXT_NODE && t[n].nodeType != Node.ELEMENT_NODE ? t[n].parentNode.removeChild(t[n]) : a(t[n]) };
                    return a(r), r.innerHTML
                }(e));
                var c = b.events.chainTrigger("paste.afterCleanup", e);
                if ("string" == typeof c && (e = c), "" !== e) {
                    var f = b.o_doc.createElement("div");
                    0 <= (f.innerHTML = e).indexOf("<body>") ? (b.html.cleanBlankSpaces(f), b.spaces.normalize(f, !0)) : b.spaces.normalize(f);
                    var p = f.getElementsByTagName("span");
                    for (r = p.length - 1; 0 <= r; r--) {
                        var u = p[r];
                        0 === u.attributes.length && (u.outerHTML = u.innerHTML)
                    }
                    var h = b.selection.element(),
                        g = !1;
                    if (h && Ee(h).parentsUntil(b.el, "ul, ol").length && (g = !0), g) {
                        var m = f.children;
                        1 == m.length && 0 <= ["OL", "UL"].indexOf(m[0].tagName) && (m[0].outerHTML = m[0].innerHTML)
                    }
                    if (!s) {
                        var v = f.getElementsByTagName("br");
                        for (r = v.length - 1; 0 <= r; r--) {
                            var E = v[r];
                            b.node.isBlock(E.previousSibling) && E.parentNode.removeChild(E)
                        }
                    }
                    if (b.opts.enter == Ee.FE.ENTER_BR)
                        for (r = (i = f.querySelectorAll("p, div")).length - 1; 0 <= r; r--) 0 === (a = i[r]).attributes.length && (a.outerHTML = a.innerHTML + (a.nextSibling && !b.node.isEmpty(a) ? "<br>" : ""));
                    else if (b.opts.enter == Ee.FE.ENTER_DIV)
                        for (r = (i = f.getElementsByTagName("p")).length - 1; 0 <= r; r--) 0 === (a = i[r]).attributes.length && (a.outerHTML = "<div>" + a.innerHTML + "</div>");
                    else b.opts.enter == Ee.FE.ENTER_P && 1 == f.childNodes.length && "P" == f.childNodes[0].tagName && 0 === f.childNodes[0].attributes.length && (f.childNodes[0].outerHTML = f.childNodes[0].innerHTML);
                    e = f.innerHTML, l && (e = function(e) {
                        var t, n = b.o_doc.createElement("div");
                        n.innerHTML = e;
                        var r = n.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(" + Ee.FE.VOID_ELEMENTS.join("):not(") + "):not(" + b.opts.htmlAllowedEmptyTags.join("):not(") + ")");
                        for (; r.length;) {
                            for (t = 0; t < r.length; t++) r[t].parentNode.removeChild(r[t]);
                            r = n.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(" + Ee.FE.VOID_ELEMENTS.join("):not(") + "):not(" + b.opts.htmlAllowedEmptyTags.join("):not(") + ")")
                        }
                        return n.innerHTML
                    }(e)), b.html.insert(e, !0)
                }
                b.events.trigger("paste.after"), b.undo.saveStep(T), T = null, b.undo.saveStep()
            }

            function c(e) { for (var t = e.length - 1; 0 <= t; t--) e[t].attributes && e[t].attributes.length && e.splice(t, 1); return e }

            function C(e) {
                var t, n = b.o_doc.createElement("div");
                n.innerHTML = e;
                for (var r = c(Array.prototype.slice.call(n.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])"))); r.length;) {
                    var i = r[r.length - 1];
                    if (b.html.defaultTag() && "div" != b.html.defaultTag()) i.querySelector(b.html.blockTagsQuery()) ? i.outerHTML = i.innerHTML : i.outerHTML = "<" + b.html.defaultTag() + ">" + i.innerHTML + "</" + b.html.defaultTag() + ">";
                    else { var a = i.querySelectorAll("*");!a.length || "BR" !== a[a.length - 1].tagName && 0 === i.innerText.length ? i.outerHTML = i.innerHTML + "<br>" : i.outerHTML = i.innerHTML }
                    r = c(Array.prototype.slice.call(n.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])")))
                }
                for (r = c(Array.prototype.slice.call(n.querySelectorAll("div:not([style])"))); r.length;) {
                    for (t = 0; t < r.length; t++) {
                        var o = r[t],
                            s = o.innerHTML.replace(/\u0009/gi, "").trim();
                        o.outerHTML = s
                    }
                    r = c(Array.prototype.slice.call(n.querySelectorAll("div:not([style])")))
                }
                return n.innerHTML
            }

            function f() { b.el.removeEventListener("copy", e), b.el.removeEventListener("cut", e), b.el.removeEventListener("paste", t) }
            return { _init: function() { b.el.addEventListener("copy", e), b.el.addEventListener("cut", e), b.el.addEventListener("paste", t, { capture: !0 }), b.events.on("drop", r), b.browser.msie && b.browser.version < 11 && (b.events.on("mouseup", function(e) { 2 == e.button && (setTimeout(function() { a = !1 }, 50), a = !0) }, !0), b.events.on("beforepaste", t)), b.events.on("destroy", f) }, cleanEmptyTagsAndDivs: C, getRtfClipboard: function() { return s }, saveCopiedText: n, clean: d }
        }, Ee.extend(Ee.FE.DEFAULTS, { shortcutsEnabled: [], shortcutsHint: !0 }), Ee.FE.SHORTCUTS_MAP = {}, Ee.FE.RegisterShortcut = function(e, t, n, r, i, a) { Ee.FE.SHORTCUTS_MAP[(i ? "^" : "") + (a ? "@" : "") + e] = { cmd: t, val: n, letter: r, shift: i, option: a }, Ee.FE.DEFAULTS.shortcutsEnabled.push(t) }, Ee.FE.RegisterShortcut(Ee.FE.KEYCODE.E, "show", null, "E", !1, !1), Ee.FE.RegisterShortcut(Ee.FE.KEYCODE.B, "bold", null, "B", !1, !1), Ee.FE.RegisterShortcut(Ee.FE.KEYCODE.I, "italic", null, "I", !1, !1), Ee.FE.RegisterShortcut(Ee.FE.KEYCODE.U, "underline", null, "U", !1, !1), Ee.FE.RegisterShortcut(Ee.FE.KEYCODE.S, "strikeThrough", null, "S", !1, !1), Ee.FE.RegisterShortcut(Ee.FE.KEYCODE.CLOSE_SQUARE_BRACKET, "indent", null, "]", !1, !1), Ee.FE.RegisterShortcut(Ee.FE.KEYCODE.OPEN_SQUARE_BRACKET, "outdent", null, "[", !1, !1), Ee.FE.RegisterShortcut(Ee.FE.KEYCODE.Z, "undo", null, "Z", !1, !1), Ee.FE.RegisterShortcut(Ee.FE.KEYCODE.Z, "redo", null, "Z", !0, !1), Ee.FE.RegisterShortcut(Ee.FE.KEYCODE.Y, "redo", null, "Y", !1, !1), Ee.FE.MODULES.shortcuts = function(s) {
            var r = null;
            var l = !1;

            function e(e) {
                if (!s.core.hasFocus()) return !0;
                var t = e.which,
                    n = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey;
                if ("keyup" == e.type && l && t != Ee.FE.KEYCODE.META) return l = !1;
                "keydown" == e.type && (l = !1);
                var r = (e.shiftKey ? "^" : "") + (e.altKey ? "@" : "") + t;
                if (n && Ee.FE.SHORTCUTS_MAP[r]) { var i = Ee.FE.SHORTCUTS_MAP[r].cmd; if (i && 0 <= s.opts.shortcutsEnabled.indexOf(i)) { var a, o = Ee.FE.SHORTCUTS_MAP[r].val; if (i && !o ? a = s.$tb.find('.fr-command[data-cmd="' + i + '"]') : i && o && (a = s.$tb.find('.fr-command[data-cmd="' + i + '"][data-param1="' + o + '"]')), a.length) return e.preventDefault(), e.stopPropagation(), a.parents(".fr-toolbar").data("instance", s), "keydown" == e.type && (s.button.exec(a), l = !0), !1; if (i && (s.commands[i] || Ee.FE.COMMANDS[i] && Ee.FE.COMMANDS[i].callback)) return e.preventDefault(), e.stopPropagation(), "keydown" == e.type && ((s.commands[i] || Ee.FE.COMMANDS[i].callback)(), l = !0), !1 } }
            }
            return {
                _init: function() { s.events.on("keydown", e, !0), s.events.on("keyup", e, !0) },
                get: function(e) {
                    if (!s.opts.shortcutsHint) return null;
                    if (!r)
                        for (var t in r = {}, Ee.FE.SHORTCUTS_MAP) Ee.FE.SHORTCUTS_MAP.hasOwnProperty(t) && 0 <= s.opts.shortcutsEnabled.indexOf(Ee.FE.SHORTCUTS_MAP[t].cmd) && (r[Ee.FE.SHORTCUTS_MAP[t].cmd + "." + (Ee.FE.SHORTCUTS_MAP[t].val || "")] = { shift: Ee.FE.SHORTCUTS_MAP[t].shift, option: Ee.FE.SHORTCUTS_MAP[t].option, letter: Ee.FE.SHORTCUTS_MAP[t].letter });
                    var n = r[e];
                    return n ? (s.helpers.isMac() ? String.fromCharCode(8984) : "Ctrl+") + (n.shift ? s.helpers.isMac() ? String.fromCharCode(8679) : "Shift+" : "") + (n.option ? s.helpers.isMac() ? String.fromCharCode(8997) : "Alt+" : "") + n.letter : null
                }
            }
        }, Ee.FE.MODULES.snapshot = function(l) {
            function n(e) {
                for (var t = e.parentNode.childNodes, n = 0, r = null, i = 0; i < t.length; i++) {
                    if (r) {
                        var a = t[i].nodeType === Node.TEXT_NODE && "" === t[i].textContent,
                            o = r.nodeType === Node.TEXT_NODE && t[i].nodeType === Node.TEXT_NODE;
                        a || o || n++
                    }
                    if (t[i] == e) return n;
                    r = t[i]
                }
            }

            function i(e) { var t = []; if (!e.parentNode) return []; for (; !l.node.isElement(e);) t.push(n(e)), e = e.parentNode; return t.reverse() }

            function a(e, t) {
                for (; e && e.nodeType === Node.TEXT_NODE;) {
                    var n = e.previousSibling;
                    n && n.nodeType == Node.TEXT_NODE && (t += n.textContent.length), e = n
                }
                return t
            }

            function d(e) { for (var t = l.el, n = 0; n < e.length; n++) t = t.childNodes[e[n]]; return t }

            function r(e, t) {
                try {
                    var n = d(t.scLoc),
                        r = t.scOffset,
                        i = d(t.ecLoc),
                        a = t.ecOffset,
                        o = l.doc.createRange();
                    o.setStart(n, r), o.setEnd(i, a), e.addRange(o)
                } catch (s) {}
            }
            return {
                get: function() {
                    var e, t = {};
                    if (l.events.trigger("snapshot.before"), t.html = (l.$wp ? l.$el.html() : l.$oel.get(0).outerHTML).replace(/ style=""/g, ""), t.ranges = [], l.$wp && l.selection.inEditor() && l.core.hasFocus())
                        for (var n = l.selection.ranges(), r = 0; r < n.length; r++) t.ranges.push({ scLoc: i((e = n[r]).startContainer), scOffset: a(e.startContainer, e.startOffset), ecLoc: i(e.endContainer), ecOffset: a(e.endContainer, e.endOffset) });
                    return l.events.trigger("snapshot.after", [t]), t
                },
                restore: function(e) {
                    l.$el.html() != e.html && (l.opts.htmlExecuteScripts ? l.$el.html(e.html) : l.el.innerHTML = e.html);
                    var t = l.selection.get();
                    l.selection.clear(), l.events.focus(!0);
                    for (var n = 0; n < e.ranges.length; n++) r(t, e.ranges[n])
                },
                equal: function(e, t) { return e.html == t.html && (!l.core.hasFocus() || JSON.stringify(e.ranges) == JSON.stringify(t.ranges)) }
            }
        }, Ee.FE.MODULES.undo = function(n) {
            function e(e) {
                var t = e.which;
                n.keys.ctrlKey(e) && (90 == t && e.shiftKey && e.preventDefault(), 90 == t && e.preventDefault())
            }
            var t = null;

            function r() { if (!n.undo_stack || n.undoing) return !1; for (; n.undo_stack.length > n.undo_index;) n.undo_stack.pop() }

            function i() { n.undo_index = 0, n.undo_stack = [] }

            function a() { n.undo_stack = [] }
            return {
                _init: function() { i(), n.events.on("initialized", function() { t = (n.$wp ? n.$el.html() : n.$oel.get(0).outerHTML).replace(/ style=""/g, "") }), n.events.on("blur", function() { n.el.querySelector(".fr-dragging") || n.undo.saveStep() }), n.events.on("keydown", e), n.events.on("destroy", a) },
                run: function() {
                    if (1 < n.undo_index) {
                        n.undoing = !0;
                        var e = n.undo_stack[--n.undo_index - 1];
                        clearTimeout(n._content_changed_timer), n.snapshot.restore(e), t = e.html, n.popups.hideAll(), n.toolbar.enable(), n.events.trigger("contentChanged"), n.events.trigger("commands.undo"), n.undoing = !1
                    }
                },
                redo: function() {
                    if (n.undo_index < n.undo_stack.length) {
                        n.undoing = !0;
                        var e = n.undo_stack[n.undo_index++];
                        clearTimeout(n._content_changed_timer), n.snapshot.restore(e), t = e.html, n.popups.hideAll(), n.toolbar.enable(), n.events.trigger("contentChanged"), n.events.trigger("commands.redo"), n.undoing = !1
                    }
                },
                canDo: function() { return !(0 === n.undo_stack.length || n.undo_index <= 1) },
                canRedo: function() { return n.undo_index != n.undo_stack.length },
                dropRedo: r,
                reset: i,
                saveStep: function(e) {
                    if (!n.undo_stack || n.undoing || n.el.querySelector(".fr-marker")) return !1;
                    void 0 === e ? (e = n.snapshot.get(), n.undo_stack[n.undo_index - 1] && n.snapshot.equal(n.undo_stack[n.undo_index - 1], e) || (r(), n.undo_stack.push(e), n.undo_index++, e.html != t && (n.events.trigger("contentChanged"), t = e.html))) : (r(), 0 < n.undo_index ? n.undo_stack[n.undo_index - 1] = e : (n.undo_stack.push(e), n.undo_index++))
                }
            }
        }, Ee.FE.ICON_TEMPLATES = { font_awesome: '<i class="fa fa-[NAME]" aria-hidden="true"></i>', font_awesome_5: '<i class="fas fa-[FA5NAME]" aria-hidden="true"></i>', font_awesome_5r: '<i class="far fa-[FA5NAME]" aria-hidden="true"></i>', font_awesome_5l: '<i class="fal fa-[FA5NAME]" aria-hidden="true"></i>', text: '<span style="text-align: center;">[NAME]</span>', image: "<img src=[SRC] alt=[ALT] />", svg: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">[PATH]</svg>' }, Ee.FE.ICONS = { bold: { NAME: "bold" }, italic: { NAME: "italic" }, underline: { NAME: "underline" }, strikeThrough: { NAME: "strikethrough" }, subscript: { NAME: "subscript" }, superscript: { NAME: "superscript" }, color: { NAME: "tint" }, outdent: { NAME: "outdent" }, indent: { NAME: "indent" }, undo: { NAME: "rotate-left", FA5NAME: "undo" }, redo: { NAME: "rotate-right", FA5NAME: "redo" }, insertHR: { NAME: "minus" }, clearFormatting: { NAME: "eraser" }, selectAll: { NAME: "mouse-pointer" } }, Ee.FE.DefineIconTemplate = function(e, t) { Ee.FE.ICON_TEMPLATES[e] = t }, Ee.FE.DefineIcon = function(e, t) { Ee.FE.ICONS[e] = t }, Ee.extend(Ee.FE.DEFAULTS, { iconsTemplate: "font_awesome" }), Ee.FE.MODULES.icon = function(i) {
            return {
                create: function(n) {
                    var e = null,
                        r = Ee.FE.ICONS[n];
                    if (void 0 !== r) {
                        var t = r.template || Ee.FE.ICON_DEFAULT_TEMPLATE || i.opts.iconsTemplate;
                        r.FA5NAME || (r.FA5NAME = r.NAME), t && (t = Ee.FE.ICON_TEMPLATES[t]) && (e = t.replace(/\[([a-zA-Z0-9]*)\]/g, function(e, t) { return "NAME" == t ? r[t] || n : r[t] }))
                    }
                    return e || n
                },
                getTemplate: function(e) {
                    var t = Ee.FE.ICONS[e],
                        n = i.opts.iconsTemplate;
                    return void 0 !== t ? n = t.template || Ee.FE.ICON_DEFAULT_TEMPLATE || i.opts.iconsTemplate : n
                }
            }
        }, Ee.extend(Ee.FE.DEFAULTS, { tooltips: !0 }), Ee.FE.MODULES.tooltip = function(i) {
            function r() {
                if (i.helpers.isMobile()) return !1;
                i.$tooltip && i.$tooltip.removeClass("fr-visible").css("left", "-3000px").css("position", "fixed")
            }

            function a(e, t) {
                if (i.helpers.isMobile()) return !1;
                if (e.data("title") || e.data("title", e.attr("title")), !e.data("title")) return !1;
                i.$tooltip || i.opts.tooltips && !i.helpers.isMobile() && (i.shared.$tooltip ? i.$tooltip = i.shared.$tooltip : (i.shared.$tooltip = Ee('<div class="fr-tooltip"></div>'), i.$tooltip = i.shared.$tooltip, i.opts.theme && i.$tooltip.addClass(i.opts.theme + "-theme"), Ee(i.o_doc).find("body:first").append(i.$tooltip)), i.events.on("shared.destroy", function() { i.$tooltip.html("").removeData().remove(), i.$tooltip = null }, !0)), e.removeAttr("title"), i.$tooltip.text(i.language.translate(e.data("title"))), i.$tooltip.addClass("fr-visible");
                var n = e.offset().left + (e.outerWidth() - i.$tooltip.outerWidth()) / 2;
                n < 0 && (n = 0), n + i.$tooltip.outerWidth() > Ee(i.o_win).width() && (n = Ee(i.o_win).width() - i.$tooltip.outerWidth()), void 0 === t && (t = i.opts.toolbarBottom);
                var r = t ? e.offset().top - i.$tooltip.height() : e.offset().top + e.outerHeight();
                i.$tooltip.css("position", ""), i.$tooltip.css("left", n), i.$tooltip.css("top", Math.ceil(r)), "static" != Ee(i.o_doc).find("body:first").css("position") ? (i.$tooltip.css("margin-left", -Ee(i.o_doc).find("body:first").offset().left), i.$tooltip.css("margin-top", -Ee(i.o_doc).find("body:first").offset().top)) : (i.$tooltip.css("margin-left", ""), i.$tooltip.css("margin-top", ""))
            }
            return { hide: r, to: a, bind: function(e, t, n) { i.opts.tooltips && !i.helpers.isMobile() && (i.events.$on(e, "mouseenter", t, function(e) { i.node.hasClass(e.currentTarget, "fr-disabled") || i.edit.isDisabled() || a(Ee(e.currentTarget), n) }, !0), i.events.$on(e, "mouseleave " + i._mousedown + " " + i._mouseup, t, function() { r() }, !0)) } }
        }, Ee.FE.MODULES.button = function(u) {
            var o = [];
            (u.opts.toolbarInline || u.opts.toolbarContainer) && (u.shared.buttons || (u.shared.buttons = []), o = u.shared.buttons);
            var s = [];

            function l(e, t, n) {
                for (var r = Ee(), i = 0; i < e.length; i++) {
                    var a = Ee(e[i]);
                    if (a.is(t) && (r = r.add(a)), n && a.is(".fr-dropdown")) {
                        var o = a.next().find(t);
                        r = r.add(o)
                    }
                }
                return r
            }

            function d(e, t) {
                var n, r = Ee();
                if (!e) return r;
                for (n in r = (r = r.add(l(o, e, t))).add(l(s, e, t)), u.shared.popups)
                    if (u.shared.popups.hasOwnProperty(n)) {
                        var i = u.shared.popups[n].children().find(e);
                        r = r.add(i)
                    }
                for (n in u.shared.modals)
                    if (u.shared.modals.hasOwnProperty(n)) {
                        var a = u.shared.modals[n].$modal.find(e);
                        r = r.add(a)
                    }
                return r
            }

            function r(e) {
                e.addClass("fr-blink"), setTimeout(function() { e.removeClass("fr-blink") }, 500);
                for (var t = e.data("cmd"), n = []; void 0 !== e.data("param" + (n.length + 1));) n.push(e.data("param" + (n.length + 1)));
                var r = d(".fr-dropdown.fr-active");
                r.length && (r.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0), r.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", "")), e.parents(".fr-popup, .fr-toolbar").data("instance").commands.exec(t, n)
            }

            function t(e) {
                var t = e.parents(".fr-popup, .fr-toolbar").data("instance");
                if (0 !== e.parents(".fr-popup").length || e.data("popup") || t.popups.hideAll(), t.popups.areVisible() && !t.popups.areVisible(t)) {
                    for (var n = 0; n < Ee.FE.INSTANCES.length; n++) Ee.FE.INSTANCES[n] != t && Ee.FE.INSTANCES[n].popups && Ee.FE.INSTANCES[n].popups.areVisible() && Ee.FE.INSTANCES[n].$el.find(".fr-marker").remove();
                    t.popups.hideAll()
                }
                u.node.hasClass(e.get(0), "fr-dropdown") ? function(e) {
                    var t = e.next(),
                        n = u.node.hasClass(e.get(0), "fr-active"),
                        r = d(".fr-dropdown.fr-active").not(e),
                        i = e.parents(".fr-toolbar, .fr-popup").data("instance") || u;
                    if (i.helpers.isIOS() && !i.el.querySelector(".fr-marker") && (i.selection.save(), i.selection.clear(), i.selection.restore()), !n) {
                        var a = e.data("cmd");
                        t.find(".fr-command").removeClass("fr-active").attr("aria-selected", !1), Ee.FE.COMMANDS[a] && Ee.FE.COMMANDS[a].refreshOnShow && Ee.FE.COMMANDS[a].refreshOnShow.apply(i, [e, t]), t.css("left", e.offset().left - e.parent().offset().left - ("rtl" == u.opts.direction ? t.width() - e.outerWidth() : 0)), t.addClass("test-height");
                        var o = t.outerHeight();
                        t.removeClass("test-height"), t.css("top", "").css("bottom", ""), !u.opts.toolbarBottom && t.offset().top + e.outerHeight() + o < Ee(u.o_doc).height() ? t.css("top", e.position().top + e.outerHeight()) : t.css("bottom", e.parents(".fr-popup, .fr-toolbar").first().height() - e.position().top)
                    }
                    e.addClass("fr-blink").toggleClass("fr-active"), e.hasClass("fr-active") ? (t.attr("aria-hidden", !1), e.attr("aria-expanded", !0)) : (t.attr("aria-hidden", !0), e.attr("aria-expanded", !1)), setTimeout(function() { e.removeClass("fr-blink") }, 300), t.css("margin-left", ""), t.offset().left + t.outerWidth() > u.$sc.offset().left + u.$sc.width() && t.css("margin-left", -(t.offset().left + t.outerWidth() - u.$sc.offset().left - u.$sc.width())), t.offset().left < u.$sc.offset().left && "rtl" == u.opts.direction && t.css("margin-left", u.$sc.offset().left), r.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0), r.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", ""), 0 !== e.parents(".fr-popup").length || u.opts.toolbarInline || (u.node.hasClass(e.get(0), "fr-active") ? u.$tb.css("zIndex", (u.opts.zIndex || 1) + 4) : u.$tb.css("zIndex", ""));
                    var s = t.find("a.fr-command.fr-active:first");
                    u.helpers.isMobile() || (s.length ? u.accessibility.focusToolbarElement(s) : u.accessibility.focusToolbarElement(e))
                }(e) : (r(e), Ee.FE.COMMANDS[e.data("cmd")] && !1 !== Ee.FE.COMMANDS[e.data("cmd")].refreshAfterCallback && t.button.bulkRefresh())
            }

            function a(e) { t(Ee(e.currentTarget)) }

            function c(e) {
                var t = e.find(".fr-dropdown.fr-active");
                t.length && (t.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0), t.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", ""))
            }

            function f(e) { e.preventDefault(), e.stopPropagation() }

            function p(e) { if (e.stopPropagation(), !u.helpers.isMobile()) return !1 }

            function h(e, t, n) {
                if (u.helpers.isMobile() && !1 === t.showOnMobile) return "";
                var r, i = t.displaySelection;
                if ("function" == typeof i && (i = i(u)), i) {
                    var a = "function" == typeof t.defaultSelection ? t.defaultSelection(u) : t.defaultSelection;
                    r = '<span style="width:' + (t.displaySelectionWidth || 100) + 'px">' + u.language.translate(a || t.title) + "</span>"
                } else r = u.icon.create(t.icon || e), r += '<span class="fr-sr-only">' + (u.language.translate(t.title) || "") + "</span>";
                var o = t.popup ? ' data-popup="true"' : "",
                    s = t.modal ? ' data-modal="true"' : "",
                    l = u.shortcuts.get(e + ".");
                l = l ? " (" + l + ")" : "";
                var d = e + "-" + u.id,
                    c = "dropdown-menu-" + d,
                    f = '<button id="' + d + '"type="button" tabIndex="-1" role="button"' + (t.toggle ? ' aria-pressed="false"' : "") + ("dropdown" == t.type ? ' aria-controls="' + c + '" aria-expanded="false" aria-haspopup="true"' : "") + (t.disabled ? ' aria-disabled="true"' : "") + ' title="' + (u.language.translate(t.title) || "") + l + '" class="fr-command fr-btn' + ("dropdown" == t.type ? " fr-dropdown" : "") + " fr-btn-" + u.icon.getTemplate(t.icon) + (t.displaySelection ? " fr-selection" : "") + (t.back ? " fr-back" : "") + (t.disabled ? " fr-disabled" : "") + (n ? "" : " fr-hidden") + '" data-cmd="' + e + '"' + o + s + ">" + r + "</button>";
                if ("dropdown" == t.type) {
                    var p = '<div id="' + c + '" class="fr-dropdown-menu" role="listbox" aria-labelledby="' + d + '" aria-hidden="true"><div class="fr-dropdown-wrapper" role="presentation"><div class="fr-dropdown-content" role="presentation">';
                    p += function(e, t) {
                        var n = "";
                        if (t.html) "function" == typeof t.html ? n += t.html.call(u) : n += t.html;
                        else {
                            var r = t.options;
                            for (var i in "function" == typeof r && (r = r()), n += '<ul class="fr-dropdown-list" role="presentation">', r)
                                if (r.hasOwnProperty(i)) {
                                    var a = u.shortcuts.get(e + "." + i);
                                    a = a ? '<span class="fr-shortcut">' + a + "</span>" : "", n += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="' + e + '" data-param1="' + i + '" title="' + r[i] + '">' + u.language.translate(r[i]) + "</a></li>"
                                }
                            n += "</ul>"
                        }
                        return n
                    }(e, t), f += p += "</div></div></div>"
                }
                return f
            }

            function e(i) {
                var a = u.$tb && u.$tb.data("instance") || u;
                if (!1 === u.events.trigger("buttons.refresh")) return !0;
                setTimeout(function() {
                    for (var e = a.selection.inEditor() && a.core.hasFocus(), t = 0; t < i.length; t++) {
                        var n = Ee(i[t]),
                            r = n.data("cmd");
                        0 === n.parents(".fr-popup").length ? e || Ee.FE.COMMANDS[r] && Ee.FE.COMMANDS[r].forcedRefresh ? a.button.refresh(n) : u.node.hasClass(n.get(0), "fr-dropdown") || (n.removeClass("fr-active"), n.attr("aria-pressed") && n.attr("aria-pressed", !1)) : n.parents(".fr-popup").is(":visible") && a.button.refresh(n)
                    }
                }, 0)
            }

            function n() { e(o), e(s) }

            function i() { o = [], s = [] }
            u.shared.popup_buttons || (u.shared.popup_buttons = []), s = u.shared.popup_buttons;
            var g = null;

            function m() { clearTimeout(g), g = setTimeout(n, 50) }
            return {
                _init: function() { u.opts.toolbarInline ? u.events.on("toolbar.show", n) : (u.events.on("mouseup", m), u.events.on("keyup", m), u.events.on("blur", m), u.events.on("focus", m), u.events.on("contentChanged", m), u.helpers.isMobile() && u.events.$on(u.$doc, "selectionchange", n)), u.events.on("shared.destroy", i) },
                buildList: function(e, t) {
                    for (var n = "", r = 0; r < e.length; r++) {
                        var i = e[r],
                            a = Ee.FE.COMMANDS[i];
                        a && "undefined" != typeof a.plugin && u.opts.pluginsEnabled.indexOf(a.plugin) < 0 || (a ? n += h(i, a, void 0 === t || 0 <= t.indexOf(i)) : "|" == i ? n += '<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>' : "-" == i && (n += '<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>'))
                    }
                    return n
                },
                bindCommands: function(t, e) {
                    u.events.bindClick(t, ".fr-command:not(.fr-disabled)", a), u.events.$on(t, u._mousedown + " " + u._mouseup + " " + u._move, ".fr-dropdown-menu", f, !0), u.events.$on(t, u._mousedown + " " + u._mouseup + " " + u._move, ".fr-dropdown-menu .fr-dropdown-wrapper", p, !0);
                    var n = t.get(0).ownerDocument,
                        r = "defaultView" in n ? n.defaultView : n.parentWindow,
                        i = function(e) {
                            (!e || e.type == u._mouseup && e.target != Ee("html").get(0) || "keydown" == e.type && (u.keys.isCharacter(e.which) && !u.keys.ctrlKey(e) || e.which == Ee.FE.KEYCODE.ESC)) && c(t)
                        };
                    u.events.$on(Ee(r), u._mouseup + " resize keydown", i, !0), u.opts.iframe && u.events.$on(u.$win, u._mouseup, i, !0), u.node.hasClass(t.get(0), "fr-popup") ? Ee.merge(s, t.find(".fr-btn").toArray()) : Ee.merge(o, t.find(".fr-btn").toArray()), u.tooltip.bind(t, ".fr-btn, .fr-title", e)
                },
                refresh: function(e) {
                    var t, n = e.parents(".fr-popup, .fr-toolbar").data("instance") || u,
                        r = e.data("cmd");
                    u.node.hasClass(e.get(0), "fr-dropdown") ? t = e.next() : (e.removeClass("fr-active"), e.attr("aria-pressed") && e.attr("aria-pressed", !1)), Ee.FE.COMMANDS[r] && Ee.FE.COMMANDS[r].refresh ? Ee.FE.COMMANDS[r].refresh.apply(n, [e, t]) : u.refresh[r] && n.refresh[r](e, t)
                },
                bulkRefresh: n,
                exec: r,
                click: t,
                hideActiveDropdowns: c,
                getButtons: d
            }
        }, Ee.FE.MODULES.modals = function(l) {
            l.shared.modals || (l.shared.modals = {});
            var s, d = l.shared.modals;

            function e() {
                for (var e in d) {
                    var t = d[e];
                    t && t.$modal && t.$modal.removeData().remove()
                }
                s && s.removeData().remove(), d = {}
            }

            function c(e, t) {
                if (d[e]) {
                    var n = d[e].$modal,
                        r = n.data("instance") || l;
                    r.events.enableBlur(), n.hide(), s.hide(), Ee(r.o_doc).find("body:first").removeClass("prevent-scroll fr-mobile"), n.removeClass("fr-active"), t || (r.accessibility.restoreSelection(), r.events.trigger("modals.hide"))
                }
            }

            function n(e) {
                var t;
                if ("string" == typeof e) {
                    if (!d[e]) return;
                    t = d[e].$modal
                } else t = e;
                return t && l.node.hasClass(t, "fr-active") && l.core.sameInstance(t) || !1
            }
            return {
                _init: function() { l.events.on("shared.destroy", e, !0) },
                get: function(e) { return d[e] },
                create: function(n, e, t) {
                    if (l.shared.$overlay || (l.shared.$overlay = Ee('<div class="fr-overlay">').appendTo("body:first")), s = l.shared.$overlay, l.opts.theme && s.addClass(l.opts.theme + "-theme"), !d[n]) {
                        var r = (i = e, a = t, o = '<div tabIndex="-1" class="fr-modal' + (l.opts.theme ? " " + l.opts.theme + "-theme" : "") + '"><div class="fr-modal-wrapper">', o += '<div class="fr-modal-head">' + i + '<i title="' + l.language.translate("Cancel") + '" class="fa fa-times fr-modal-close"></i></div>', o += '<div tabIndex="-1" class="fr-modal-body">' + a + "</div>", Ee(o += "</div></div>"));
                        d[n] = { $modal: r, $head: r.find(".fr-modal-head"), $body: r.find(".fr-modal-body") }, l.helpers.isMobile() || r.addClass("fr-desktop"), r.appendTo("body:first"), l.events.$on(r, "click", ".fr-modal-close", function() { c(n) }, !0), d[n].$body.css("margin-top", d[n].$head.outerHeight()), l.events.$on(r, "keydown", function(e) { var t = e.which; return t == Ee.FE.KEYCODE.ESC ? (c(n), l.accessibility.focusModalButton(r), !1) : !(!Ee(e.currentTarget).is("input[type=text], textarea") && t != Ee.FE.KEYCODE.ARROW_UP && t != Ee.FE.KEYCODE.ARROW_DOWN && !l.keys.isBrowserAction(e) && (e.preventDefault(), e.stopPropagation(), 1)) }, !0), c(n, !0)
                    }
                    var i, a, o;
                    return d[n]
                },
                show: function(e) {
                    if (d[e]) {
                        var t = d[e].$modal;
                        t.data("instance", l), t.show(), s.show(), Ee(l.o_doc).find("body:first").addClass("prevent-scroll"), l.helpers.isMobile() && Ee(l.o_doc).find("body:first").addClass("fr-mobile"), t.addClass("fr-active"), l.accessibility.focusModal(t)
                    }
                },
                hide: c,
                resize: function(e) {
                    if (d[e]) {
                        var t = d[e],
                            n = t.$modal,
                            r = t.$body,
                            i = Ee(l.o_win).height(),
                            a = n.find(".fr-modal-wrapper"),
                            o = i - a.outerHeight(!0) + (a.height() - (r.outerHeight(!0) - r.height())),
                            s = "auto";
                        o < r.get(0).scrollHeight && (s = o), r.height(s)
                    }
                },
                isVisible: n,
                areVisible: function(e) {
                    for (var t in d)
                        if (d.hasOwnProperty(t) && n(t) && (void 0 === e || d[t].$modal.data("instance") == e)) return d[t].$modal;
                    return !1
                }
            }
        }, Ee.FE.POPUP_TEMPLATES = { "text.edit": "[_EDIT_]" }, Ee.FE.RegisterTemplate = function(e, t) { Ee.FE.POPUP_TEMPLATES[e] = t }, Ee.FE.MODULES.popups = function(c) {
            c.shared.popups || (c.shared.popups = {});
            var f = c.shared.popups;

            function p(e, t) { t.is(":visible") || (t = c.$sc), t.is(f[e].data("container")) || (f[e].data("container", t), t.append(f[e])) }

            function u(e) { return f[e] && c.node.hasClass(f[e], "fr-active") && c.core.sameInstance(f[e]) || !1 }

            function h(e) {
                for (var t in f)
                    if (f.hasOwnProperty(t) && u(t) && (void 0 === e || f[t].data("instance") == e)) return f[t];
                return !1
            }

            function n(e) {
                var t = null;
                (t = "string" != typeof e ? e : f[e]) && c.node.hasClass(t, "fr-active") && (t.removeClass("fr-active fr-above"), c.events.trigger("popups.hide." + e), c.$tb && (1 < c.opts.zIndex ? c.$tb.css("zIndex", c.opts.zIndex + 1) : c.$tb.css("zIndex", "")), c.events.disableBlur(), t.find("input, textarea, button").filter(":focus").blur(), t.find("input, textarea").attr("disabled", "disabled"))
            }

            function g(e) { for (var t in void 0 === e && (e = []), f) f.hasOwnProperty(t) && e.indexOf(t) < 0 && n(t) }

            function t() { c.shared.exit_flag = !0 }

            function m() { c.shared.exit_flag = !1 }

            function a() { return c.shared.exit_flag }

            function i(e, t) { var n, r, i = function(e, t) { var n = Ee.FE.POPUP_TEMPLATES[e]; if (!n) return null; for (var r in "function" == typeof n && (n = n.apply(c)), t) t.hasOwnProperty(r) && (n = n.replace("[_" + r.toUpperCase() + "_]", t[r])); return n }(e, t); return i ? (n = Ee('<div class="fr-popup' + (c.helpers.isMobile() ? " fr-mobile" : " fr-desktop") + (c.opts.toolbarInline ? " fr-inline" : "") + '"><span class="fr-arrow"></span>' + i + "</div>"), c.opts.theme && n.addClass(c.opts.theme + "-theme"), 1 < c.opts.zIndex && (c.opts.editInPopup ? n.css("z-index", c.opts.zIndex + 2) : c.$tb.css("z-index", c.opts.zIndex + 2)), "auto" != c.opts.direction && n.removeClass("fr-ltr fr-rtl").addClass("fr-" + c.opts.direction), n.find("input, textarea").attr("dir", c.opts.direction).attr("disabled", "disabled"), (r = Ee("body:first")).append(n), n.data("container", r), f[e] = n, c.button.bindCommands(n, !1), n) : (n = Ee('<div class="fr-popup fr-empty"></div>'), (r = Ee("body:first")).append(n), n.data("container", r), f[e] = n) }

            function v(r) {
                var i = f[r];
                return {
                    _windowResize: function() { var e = i.data("instance") || c;!e.helpers.isMobile() && i.is(":visible") && (e.events.disableBlur(), e.popups.hide(r), e.events.enableBlur()) },
                    _inputFocus: function(e) {
                        var t = i.data("instance") || c,
                            n = Ee(e.currentTarget);
                        if (n.is("input:file") && n.closest(".fr-layer").addClass("fr-input-focus"), e.preventDefault(), e.stopPropagation(), setTimeout(function() { t.events.enableBlur() }, 100), t.helpers.isMobile()) {
                            var r = Ee(t.o_win).scrollTop();
                            setTimeout(function() { Ee(t.o_win).scrollTop(r) }, 0)
                        }
                    },
                    _inputBlur: function(e) {
                        var t = i.data("instance") || c,
                            n = Ee(e.currentTarget);
                        n.is("input:file") && n.closest(".fr-layer").removeClass("fr-input-focus"), document.activeElement != this && Ee(this).is(":visible") && (t.events.blurActive() && t.events.trigger("blur"), t.events.enableBlur())
                    },
                    _editorKeydown: function(e) {
                        var t = i.data("instance") || c;
                        t.keys.ctrlKey(e) || e.which == Ee.FE.KEYCODE.ALT || e.which == Ee.FE.KEYCODE.ESC || (u(r) && i.find(".fr-back:visible").length ? t.button.exec(i.find(".fr-back:visible:first")) : e.which != Ee.FE.KEYCODE.ALT && t.popups.hide(r))
                    },
                    _preventFocus: function(e) {
                        var t = i.data("instance") || c,
                            n = e.originalEvent ? e.originalEvent.target || e.originalEvent.originalTarget : null;
                        "mouseup" == e.type || Ee(n).is(":focus") || t.events.disableBlur(), "mouseup" != e.type || Ee(n).hasClass("fr-command") || 0 < Ee(n).parents(".fr-command").length || Ee(n).hasClass("fr-dropdown-content") || c.button.hideActiveDropdowns(i), (c.browser.safari || c.browser.mozilla) && "mousedown" == e.type && Ee(n).is("input[type=file]") && t.events.disableBlur();
                        var r = "input, textarea, button, select, label, .fr-command";
                        if (n && !Ee(n).is(r) && 0 === Ee(n).parents(r).length) return e.stopPropagation(), !1;
                        n && Ee(n).is(r) && e.stopPropagation(), m()
                    },
                    _editorMouseup: function() { i.is(":visible") && a() && 0 < i.find("input:focus, textarea:focus, button:focus, select:focus").filter(":visible").length && c.events.disableBlur() },
                    _windowMouseup: function(e) {
                        if (!c.core.sameInstance(i)) return !0;
                        var t = i.data("instance") || c;
                        i.is(":visible") && a() && (e.stopPropagation(), t.markers.remove(), t.popups.hide(r), m())
                    },
                    _windowKeydown: function(e) {
                        if (!c.core.sameInstance(i)) return !0;
                        var t = i.data("instance") || c,
                            n = e.which;
                        if (Ee.FE.KEYCODE.ESC == n) { if (t.popups.isVisible(r) && t.opts.toolbarInline) return e.stopPropagation(), t.popups.isVisible(r) && (i.find(".fr-back:visible").length ? (t.button.exec(i.find(".fr-back:visible:first")), t.accessibility.focusPopupButton(i)) : i.find(".fr-dismiss:visible").length ? t.button.exec(i.find(".fr-dismiss:visible:first")) : (t.popups.hide(r), t.toolbar.showInline(null, !0), t.accessibility.FocusPopupButton(i))), !1; if (t.popups.isVisible(r)) return i.find(".fr-back:visible").length ? (t.button.exec(i.find(".fr-back:visible:first")), t.accessibility.focusPopupButton(i)) : i.find(".fr-dismiss:visible").length ? t.button.exec(i.find(".fr-dismiss:visible:first")) : (t.popups.hide(r), t.accessibility.focusPopupButton(i)), !1 }
                    },
                    _doPlaceholder: function() { 0 === Ee(this).next().length && Ee(this).attr("placeholder") && Ee(this).after('<label for="' + Ee(this).attr("id") + '">' + Ee(this).attr("placeholder") + "</label>"), Ee(this).toggleClass("fr-not-empty", "" !== Ee(this).val()) },
                    _repositionPopup: function() {
                        if (!c.opts.height && !c.opts.heightMax || c.opts.toolbarInline) return !0;
                        if (c.$wp && u(r) && i.parent().get(0) == c.$sc.get(0)) {
                            var e = i.offset().top - c.$wp.offset().top,
                                t = c.$wp.outerHeight();
                            c.node.hasClass(i.get(0), "fr-above") && (e += i.outerHeight()), t < e || e < 0 ? i.addClass("fr-hidden") : i.removeClass("fr-hidden")
                        }
                    }
                }
            }

            function o(e, t) { c.events.on("mouseup", e._editorMouseup, !0), c.$wp && c.events.on("keydown", e._editorKeydown), c.events.on("blur", function() { h() && c.markers.remove(), g() }), c.$wp && !c.helpers.isMobile() && c.events.$on(c.$wp, "scroll.popup" + t, e._repositionPopup), c.events.on("window.mouseup", e._windowMouseup, !0), c.events.on("window.keydown", e._windowKeydown, !0), f[t].data("inst" + c.id, !0), c.events.on("destroy", function() { c.core.sameInstance(f[t]) && f[t].removeClass("fr-active").appendTo("body:first") }, !0) }

            function e() {
                for (var e in f)
                    if (f.hasOwnProperty(e)) {
                        var t = f[e];
                        t && (t.html("").removeData().remove(), f[e] = null)
                    }
                f = []
            }
            return c.shared.exit_flag = !1, {
                _init: function() { c.events.on("shared.destroy", e, !0), c.events.on("window.mousedown", t), c.events.on("window.touchmove", m), c.events.$on(Ee(c.o_win), "scroll", m), c.events.on("mousedown", function(e) { h() && (e.stopPropagation(), c.$el.find(".fr-marker").remove(), t(), c.events.disableBlur()) }) },
                create: function(e, t) {
                    var n = i(e, t),
                        r = v(e);
                    return o(r, e), c.events.$on(n, "mousedown mouseup touchstart touchend touch", "*", r._preventFocus, !0), c.events.$on(n, "focus", "input, textarea, button, select", r._inputFocus, !0), c.events.$on(n, "blur", "input, textarea, button, select", r._inputBlur, !0), c.accessibility.registerPopup(e), c.events.$on(n, "keydown keyup change input", "input, textarea", r._doPlaceholder, !0), c.helpers.isIOS() && c.events.$on(n, "touchend", "label", function() { Ee("#" + Ee(this).attr("for")).prop("checked", function(e, t) { return !t }) }, !0), c.events.$on(Ee(c.o_win), "resize", r._windowResize, !0), n
                },
                get: function(e) { var t = f[e]; return t && !t.data("inst" + c.id) && o(v(e), e), t },
                show: function(e, t, n, r) {
                    if (u(e) || (h() && 0 < c.$el.find(".fr-marker").length ? (c.events.disableBlur(), c.selection.restore()) : h() || (c.events.disableBlur(), c.events.focus(), c.events.enableBlur())), g([e]), !f[e]) return !1;
                    var i = c.button.getButtons(".fr-dropdown.fr-active");
                    i.removeClass("fr-active").attr("aria-expanded", !1).parent(".fr-toolbar").css("zIndex", ""), i.next().attr("aria-hidden", !0), f[e].data("instance", c), c.$tb && c.$tb.data("instance", c);
                    var a = f[e].outerWidth(),
                        o = u(e);
                    f[e].addClass("fr-active").removeClass("fr-hidden").find("input, textarea").removeAttr("disabled");
                    var s, l, d = f[e].data("container");
                    s = e, (l = d).is(":visible") || (l = c.$sc), 0 === l.find([f[s]]).length && l.append(f[s]), c.opts.toolbarInline && d && c.$tb && d.get(0) == c.$tb.get(0) && (p(e, c.$sc), n = c.$tb.offset().top - c.helpers.getPX(c.$tb.css("margin-top")), t = c.$tb.offset().left + c.$tb.outerWidth() / 2 + (parseFloat(c.$tb.find(".fr-arrow").css("margin-left")) || 0) + c.$tb.find(".fr-arrow").outerWidth() / 2, c.node.hasClass(c.$tb.get(0), "fr-above") && n && (n += c.$tb.outerHeight()), r = 0), d = f[e].data("container"), !c.opts.iframe || r || o || (t && (t -= c.$iframe.offset().left), n && (n -= c.$iframe.offset().top)), d.is(c.$tb) ? c.$tb.css("zIndex", (c.opts.zIndex || 1) + 4) : f[e].css("zIndex", (c.opts.zIndex || 1) + 4), t && (t -= a / 2), c.opts.toolbarBottom && d && c.$tb && d.get(0) == c.$tb.get(0) && (f[e].addClass("fr-above"), n && (n -= f[e].outerHeight())), f[e].removeClass("fr-active"), c.position.at(t, n, f[e], r || 0), f[e].addClass("fr-active"), o || c.accessibility.focusPopup(f[e]), c.opts.toolbarInline && c.toolbar.hide(), c.events.trigger("popups.show." + e), v(e)._repositionPopup(), m()
                },
                hide: n,
                onHide: function(e, t) { c.events.on("popups.hide." + e, t) },
                hideAll: g,
                setContainer: p,
                refresh: function(e) {
                    f[e].data("instance", c), c.events.trigger("popups.refresh." + e);
                    for (var t = f[e].find(".fr-command"), n = 0; n < t.length; n++) {
                        var r = Ee(t[n]);
                        0 === r.parents(".fr-dropdown-menu").length && c.button.refresh(r)
                    }
                },
                onRefresh: function(e, t) { c.events.on("popups.refresh." + e, t) },
                onShow: function(e, t) { c.events.on("popups.show." + e, t) },
                isVisible: u,
                areVisible: h
            }
        }, Ee.FE.MODULES.position = function(v) {
            function i() {
                var e = v.selection.ranges(0).getBoundingClientRect();
                if (0 === e.top && 0 === e.left && 0 === e.width || 0 === e.height) {
                    var t = !1;
                    0 === v.$el.find(".fr-marker").length && (v.selection.save(), t = !0);
                    var n = v.$el.find(".fr-marker:first");
                    n.css("display", "inline"), n.css("line-height", "");
                    var r = n.offset(),
                        i = n.outerHeight();
                    n.css("display", "none"), n.css("line-height", 0), (e = {}).left = r.left, e.width = 0, e.height = i, e.top = r.top - (v.helpers.isMobile() && !v.helpers.isIOS() || v.opts.iframe ? 0 : v.helpers.scrollTop()), e.right = 1, e.bottom = 1, e.ok = !0, t && v.selection.restore()
                }
                return e
            }

            function a(e, t, n, r) {
                var i = n.data("container");
                !i || "BODY" === i.get(0).tagName && "static" == i.css("position") || (e && (e -= i.offset().left), t && (t -= i.offset().top), "BODY" != i.get(0).tagName ? (e && (e += i.get(0).scrollLeft), t && (t += i.get(0).scrollTop)) : "absolute" == i.css("position") && (e && (e += i.position().left), t && (t += i.position().top))), v.opts.iframe && i && v.$tb && i.get(0) != v.$tb.get(0) && (e && (e += v.$iframe.offset().left), t && (t += v.$iframe.offset().top));
                var a, o, s = (a = e, o = n.outerWidth(!0), a + o > v.$sc.get(0).clientWidth - 10 && (a = v.$sc.get(0).clientWidth - o - 10), a < 0 && (a = 10), a);
                if (e) {
                    n.css("left", s);
                    var l = n.data("fr-arrow");
                    l || (l = n.find(".fr-arrow"), n.data("fr-arrow", l)), l.data("margin-left") || l.data("margin-left", v.helpers.getPX(l.css("margin-left"))), l.css("margin-left", e - s + l.data("margin-left"))
                }
                t && n.css("top", function(e, t, n) {
                    var r = e.outerHeight(!0);
                    if (!v.helpers.isMobile() && v.$tb && e.parent().get(0) != v.$tb.get(0)) {
                        var i = e.parent().offset().top,
                            a = t - r - (n || 0);
                        e.parent().get(0) == v.$sc.get(0) && (i -= e.parent().position().top);
                        var o = v.$sc.get(0).clientHeight;
                        i + t + r > v.$sc.offset().top + o && 0 < e.parent().offset().top + a && 0 < a ? a > v.$wp.scrollTop() && (t = a, e.addClass("fr-above")) : e.removeClass("fr-above")
                    }
                    return t
                }(n, t, r))
            }

            function n(e) {
                var n = Ee(e),
                    t = n.is(".fr-sticky-on"),
                    r = n.data("sticky-top"),
                    i = n.data("sticky-scheduled");
                if (void 0 === r) {
                    n.data("sticky-top", 0);
                    var a = Ee('<div class="fr-sticky-dummy" style="height: ' + n.outerHeight() + 'px;"></div>');
                    v.$box.prepend(a)
                } else v.$box.find(".fr-sticky-dummy").css("height", n.outerHeight());
                if (v.core.hasFocus() || 0 < v.$tb.find("input:visible:focus").length) {
                    var o = v.helpers.scrollTop(),
                        s = Math.min(Math.max(o - v.$tb.parent().offset().top, 0), v.$tb.parent().outerHeight() - n.outerHeight());
                    s != r && s != i && (clearTimeout(n.data("sticky-timeout")), n.data("sticky-scheduled", s), n.outerHeight() < o - v.$tb.parent().offset().top && n.addClass("fr-opacity-0"), n.data("sticky-timeout", setTimeout(function() {
                        var e = v.helpers.scrollTop(),
                            t = Math.min(Math.max(e - v.$tb.parent().offset().top, 0), v.$tb.parent().outerHeight() - n.outerHeight());
                        0 < t && "BODY" == v.$tb.parent().get(0).tagName && (t += v.$tb.parent().position().top), t != r && (n.css("top", Math.max(t, 0)), n.data("sticky-top", t), n.data("sticky-scheduled", t)), n.removeClass("fr-opacity-0")
                    }, 100))), t || (n.css("top", "0"), n.width(v.$tb.parent().width()), n.addClass("fr-sticky-on"), v.$box.addClass("fr-sticky-box"))
                } else clearTimeout(Ee(e).css("sticky-timeout")), n.css("top", "0"), n.css("position", ""), n.width(""), n.data("sticky-top", 0), n.removeClass("fr-sticky-on"), v.$box.removeClass("fr-sticky-box")
            }

            function t(e) {
                if (e.offsetWidth) {
                    var t, n, r = Ee(e),
                        i = r.outerHeight(),
                        a = r.data("sticky-position"),
                        o = Ee("body" == v.opts.scrollableContainer ? v.o_win : v.opts.scrollableContainer).outerHeight(),
                        s = 0,
                        l = 0;
                    "body" !== v.opts.scrollableContainer && (s = v.$sc.offset().top, l = Ee(v.o_win).outerHeight() - s - o);
                    var d = "body" == v.opts.scrollableContainer ? v.helpers.scrollTop() : s,
                        c = r.is(".fr-sticky-on");
                    r.data("sticky-parent") || r.data("sticky-parent", r.parent());
                    var f = r.data("sticky-parent"),
                        p = f.offset().top,
                        u = f.outerHeight();
                    if (r.data("sticky-offset") ? v.$box.find(".fr-sticky-dummy").css("height", i + "px") : (r.data("sticky-offset", !0), r.after('<div class="fr-sticky-dummy" style="height: ' + i + 'px;"></div>')), !a) {
                        var h = "auto" !== r.css("top") || "auto" !== r.css("bottom");
                        h || r.css("position", "fixed"), a = { top: v.node.hasClass(r.get(0), "fr-top"), bottom: v.node.hasClass(r.get(0), "fr-bottom") }, h || r.css("position", ""), r.data("sticky-position", a), r.data("top", v.node.hasClass(r.get(0), "fr-top") ? r.css("top") : "auto"), r.data("bottom", v.node.hasClass(r.get(0), "fr-bottom") ? r.css("bottom") : "auto")
                    }
                    t = v.helpers.getPX(r.data("top")), n = v.helpers.getPX(r.data("bottom"));
                    var g = a.top && p < d + t && d + t <= p + u - i && (v.helpers.isInViewPort(v.$sc.get(0)) || "body" == v.opts.scrollableContainer),
                        m = a.bottom && p + i < d + o - n && d + o - n < p + u;
                    g || m ? (r.css("width", f.get(0).getBoundingClientRect().width + "px"), c || (r.addClass("fr-sticky-on"), r.removeClass("fr-sticky-off"), r.css("top") && ("auto" != r.data("top") ? r.css("top", v.helpers.getPX(r.data("top")) + s) : r.data("top", "auto")), r.css("bottom") && ("auto" != r.data("bottom") ? r.css("bottom", v.helpers.getPX(r.data("bottom")) + l) : r.css("bottom", "auto")))) : v.node.hasClass(r.get(0), "fr-sticky-off") || (r.width(""), r.removeClass("fr-sticky-on"), r.addClass("fr-sticky-off"), r.css("top") && "auto" != r.data("top") && a.top && r.css("top", 0), r.css("bottom") && "auto" != r.data("bottom") && a.bottom && r.css("bottom", 0))
                }
            }

            function r() { var e = document.createElement("test").style; return e.cssText = "position:" + ["-webkit-", "-moz-", "-ms-", "-o-", ""].join("sticky; position:") + " sticky;", -1 !== e.position.indexOf("sticky") && !v.helpers.isIOS() && !v.helpers.isAndroid() && !v.browser.chrome }

            function e() {
                if (v._stickyElements)
                    for (var e = 0; e < v._stickyElements.length; e++) t(v._stickyElements[e])
            }
            return {
                _init: function() {
                    ! function() {
                        if (!r())
                            if (v._stickyElements = [], v.helpers.isIOS()) {
                                var t = function() {
                                    if (v.helpers.requestAnimationFrame()(t), !1 !== v.events.trigger("position.refresh"))
                                        for (var e = 0; e < v._stickyElements.length; e++) n(v._stickyElements[e])
                                };
                                t(), v.events.$on(Ee(v.o_win), "scroll", function() {
                                    if (v.core.hasFocus())
                                        for (var e = 0; e < v._stickyElements.length; e++) {
                                            var t = Ee(v._stickyElements[e]),
                                                n = t.parent(),
                                                r = v.helpers.scrollTop();
                                            t.outerHeight() < r - n.offset().top && (t.addClass("fr-opacity-0"), t.data("sticky-top", -1), t.data("sticky-scheduled", -1))
                                        }
                                }, !0)
                            } else "body" !== v.opts.scrollableContainer && v.events.$on(Ee(v.opts.scrollableContainer), "scroll", e, !0), v.events.$on(Ee(v.o_win), "scroll", e, !0), v.events.$on(Ee(v.o_win), "resize", e, !0), v.events.on("initialized", e), v.events.on("focus", e), v.events.$on(Ee(v.o_win), "resize", "textarea", e, !0);
                        v.events.on("destroy", function() { v._stickyElements = [] })
                    }()
                },
                forSelection: function(e) {
                    var t = i();
                    e.css({ top: 0, left: 0 });
                    var n = t.top + t.height,
                        r = t.left + t.width / 2 - e.get(0).offsetWidth / 2 + v.helpers.scrollLeft();
                    v.opts.iframe || (n += v.helpers.scrollTop()), a(r, n, e, t.height)
                },
                addSticky: function(e) { e.addClass("fr-sticky"), v.helpers.isIOS() && e.addClass("fr-sticky-ios"), r() || (e.removeClass("fr-sticky"), v._stickyElements.push(e.get(0))) },
                refresh: e,
                at: a,
                getBoundingRect: i
            }
        }, Ee.FE.MODULES.refresh = function(i) {
            function a(e, t) { e.toggleClass("fr-disabled", t).attr("aria-disabled", t) }
            return {
                undo: function(e) { a(e, !i.undo.canDo()) },
                redo: function(e) { a(e, !i.undo.canRedo()) },
                outdent: function(e) {
                    if (i.node.hasClass(e.get(0), "fr-no-refresh")) return !1;
                    for (var t = i.selection.blocks(), n = 0; n < t.length; n++) { var r = "rtl" == i.opts.direction || "rtl" == Ee(t[n]).css("direction") ? "margin-right" : "margin-left"; if ("LI" == t[n].tagName || "LI" == t[n].parentNode.tagName) return a(e, !1), !0; if (0 < i.helpers.getPX(Ee(t[n]).css(r))) return a(e, !1), !0 }
                    a(e, !0)
                },
                indent: function(e) {
                    if (i.node.hasClass(e.get(0), "fr-no-refresh")) return !1;
                    for (var t = i.selection.blocks(), n = 0; n < t.length; n++) {
                        for (var r = t[n].previousSibling; r && r.nodeType == Node.TEXT_NODE && 0 === r.textContent.length;) r = r.previousSibling;
                        if ("LI" != t[n].tagName || r) return a(e, !1), !0;
                        a(e, !0)
                    }
                }
            }
        }, Ee.extend(Ee.FE.DEFAULTS, { editInPopup: !1 }), Ee.FE.MODULES.textEdit = function(n) {
            function t() {
                n.events.$on(n.$el, n._mouseup, function() {
                    setTimeout(function() {
                        var e, t;
                        t = n.popups.get("text.edit"), e = "INPUT" === n.$el.prop("tagName") ? n.$el.attr("placeholder") : n.$el.text(), t.find("input").val(e).trigger("change"), n.popups.setContainer("text.edit", n.$sc), n.popups.show("text.edit", n.$el.offset().left + n.$el.outerWidth() / 2, n.$el.offset().top + n.$el.outerHeight(), n.$el.outerHeight())
                    }, 10)
                })
            }
            return {
                _init: function() {
                    var e;
                    n.opts.editInPopup && (e = { edit: '<div id="fr-text-edit-' + n.id + '" class="fr-layer fr-text-edit-layer"><div class="fr-input-line"><input type="text" placeholder="' + n.language.translate("Text") + '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="updateText" tabIndex="2">' + n.language.translate("Update") + "</button></div></div>" }, n.popups.create("text.edit", e), t())
                },
                update: function() {
                    var e = n.popups.get("text.edit").find("input").val();
                    0 === e.length && (e = n.opts.placeholderText), "INPUT" === n.$el.prop("tagName") ? n.$el.attr("placeholder", e) : n.$el.text(e), n.events.trigger("contentChanged"), n.popups.hide("text.edit")
                }
            }
        }, Ee.FE.RegisterCommand("updateText", { focus: !1, undo: !1, callback: function() { this.textEdit.update() } }), Ee.extend(Ee.FE.DEFAULTS, { toolbarBottom: !1, toolbarButtons: null, toolbarButtonsXS: null, toolbarButtonsSM: null, toolbarButtonsMD: null, toolbarContainer: null, toolbarInline: !1, toolbarSticky: !0, toolbarStickyOffset: 0, toolbarVisibleWithoutSelection: !1 }), Ee.FE.TOOLBAR_BUTTONS = ["fullscreen", "bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "|", "fontFamily", "fontSize", "color", "inlineStyle", "paragraphStyle", "|", "paragraphFormat", "align", "formatOL", "formatUL", "outdent", "indent", "quote", "-", "insertLink", "insertImage", "insertVideo", "embedly", "insertFile", "insertTable", "|", "emoticons", "specialCharacters", "insertHR", "selectAll", "clearFormatting", "|", "print", "spellChecker", "help", "html", "|", "undo", "redo"], Ee.FE.TOOLBAR_BUTTONS_MD = null, Ee.FE.TOOLBAR_BUTTONS_SM = ["bold", "italic", "underline", "|", "fontFamily", "fontSize", "insertLink", "insertImage", "table", "|", "undo", "redo"], Ee.FE.TOOLBAR_BUTTONS_XS = ["bold", "italic", "fontFamily", "fontSize", "|", "undo", "redo"], Ee.FE.MODULES.toolbar = function(i) {
            var r = [];

            function a(e, t) { for (var n = 0; n < t.length; n++) "-" != t[n] && "|" != t[n] && e.indexOf(t[n]) < 0 && e.push(t[n]) }

            function o() { var e = i.helpers.screenSize(); return r[e] }

            function e() {
                var e = o();
                i.$tb.find(".fr-separator").remove(), i.$tb.find("> .fr-command").addClass("fr-hidden");
                for (var t = 0; t < e.length; t++)
                    if ("|" == e[t] || "-" == e[t]) i.$tb.append(i.button.buildList([e[t]]));
                    else {
                        var n = i.$tb.find('> .fr-command[data-cmd="' + e[t] + '"]'),
                            r = null;
                        i.node.hasClass(n.next().get(0), "fr-dropdown-menu") && (r = n.next()), n.removeClass("fr-hidden").appendTo(i.$tb), r && r.appendTo(i.$tb)
                    }
            }

            function t(e, t) {
                setTimeout(function() {
                    if ((!e || e.which != Ee.FE.KEYCODE.ESC) && i.selection.inEditor() && i.core.hasFocus() && !i.popups.areVisible() && (i.opts.toolbarVisibleWithoutSelection || !i.selection.isCollapsed() && !i.keys.isIME() || t)) {
                        if (i.$tb.data("instance", i), !1 === i.events.trigger("toolbar.show", [e])) return !1;
                        i.$tb.show(), i.opts.toolbarContainer || i.position.forSelection(i.$tb), 1 < i.opts.zIndex ? i.$tb.css("z-index", i.opts.zIndex + 1) : i.$tb.css("z-index", null)
                    }
                }, 0)
            }

            function n(e) { return (!e || "blur" !== e.type || document.activeElement !== i.el) && (!(!e || "keydown" !== e.type || !i.keys.ctrlKey(e)) || (!!i.button.getButtons(".fr-dropdown.fr-active").next().find(i.o_doc.activeElement).length || void(!1 !== i.events.trigger("toolbar.hide") && i.$tb.hide()))) }
            r[Ee.FE.XS] = i.opts.toolbarButtonsXS || i.opts.toolbarButtons || Ee.FE.TOOLBAR_BUTTONS_XS || Ee.FE.TOOLBAR_BUTTONS || [], r[Ee.FE.SM] = i.opts.toolbarButtonsSM || i.opts.toolbarButtons || Ee.FE.TOOLBAR_BUTTONS_SM || Ee.FE.TOOLBAR_BUTTONS || [], r[Ee.FE.MD] = i.opts.toolbarButtonsMD || i.opts.toolbarButtons || Ee.FE.TOOLBAR_BUTTONS_MD || Ee.FE.TOOLBAR_BUTTONS || [], r[Ee.FE.LG] = i.opts.toolbarButtons || Ee.FE.TOOLBAR_BUTTONS || [];
            var s = null;

            function l(e) { clearTimeout(s), e && e.which == Ee.FE.KEYCODE.ESC || (s = setTimeout(t, i.opts.typingTimer)) }

            function d() { i.events.on("window.mousedown", n), i.events.on("keydown", n), i.events.on("blur", n), i.helpers.isMobile() || i.events.on("window.mouseup", t), i.helpers.isMobile() ? i.helpers.isIOS() || (i.events.on("window.touchend", t), i.browser.mozilla && setInterval(t, 200)) : i.events.on("window.keyup", l), i.events.on("keydown", function(e) { e && e.which == Ee.FE.KEYCODE.ESC && n() }), i.events.on("keydown", function(e) { if (e.which == Ee.FE.KEYCODE.ALT) return e.stopPropagation(), !1 }, !0), i.events.$on(i.$wp, "scroll.toolbar", t), i.events.on("commands.after", t), i.helpers.isMobile() && (i.events.$on(i.$doc, "selectionchange", l), i.events.$on(i.$doc, "orientationchange", t)) }

            function c() { i.$tb.html("").removeData().remove(), i.$tb = null }

            function f() { i.$box.removeClass("fr-top fr-bottom fr-inline fr-basic"), i.$box.find(".fr-sticky-dummy").remove() }

            function p() {
                i.opts.theme && i.$tb.addClass(i.opts.theme + "-theme"), 1 < i.opts.zIndex && i.$tb.css("z-index", i.opts.zIndex + 1), "auto" != i.opts.direction && i.$tb.removeClass("fr-ltr fr-rtl").addClass("fr-" + i.opts.direction), i.helpers.isMobile() ? i.$tb.addClass("fr-mobile") : i.$tb.addClass("fr-desktop"), i.opts.toolbarContainer ? (i.opts.toolbarInline && (d(), n()), i.opts.toolbarBottom ? i.$tb.addClass("fr-bottom") : i.$tb.addClass("fr-top")) : i.opts.toolbarInline ? (i.$sc.append(i.$tb), i.$tb.data("container", i.$sc), i.$tb.addClass("fr-inline"), i.$tb.prepend('<span class="fr-arrow"></span>'), d(), i.opts.toolbarBottom = !1) : (i.opts.toolbarBottom && !i.helpers.isIOS() ? (i.$box.append(i.$tb), i.$tb.addClass("fr-bottom"), i.$box.addClass("fr-bottom")) : (i.opts.toolbarBottom = !1, i.$box.prepend(i.$tb), i.$tb.addClass("fr-top"), i.$box.addClass("fr-top")), i.$tb.addClass("fr-basic"), i.opts.toolbarSticky && (i.opts.toolbarStickyOffset && (i.opts.toolbarBottom ? i.$tb.css("bottom", i.opts.toolbarStickyOffset) : i.$tb.css("top", i.opts.toolbarStickyOffset)), i.position.addSticky(i.$tb))),
                    function() {
                        var e = Ee.merge([], o());
                        a(e, r[Ee.FE.XS]), a(e, r[Ee.FE.SM]), a(e, r[Ee.FE.MD]), a(e, r[Ee.FE.LG]);
                        for (var t = e.length - 1; 0 <= t; t--) "-" != e[t] && "|" != e[t] && e.indexOf(e[t]) < t && e.splice(t, 1);
                        var n = i.button.buildList(e, o());
                        i.$tb.append(n), i.button.bindCommands(i.$tb)
                    }(), i.events.$on(Ee(i.o_win), "resize", e), i.events.$on(Ee(i.o_win), "orientationchange", e), i.accessibility.registerToolbar(i.$tb), i.events.$on(i.$tb, i._mousedown + " " + i._mouseup, function(e) { var t = e.originalEvent ? e.originalEvent.target || e.originalEvent.originalTarget : null; if (t && "INPUT" != t.tagName && !i.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), !1 }, !0)
            }
            var u = !1;
            return {
                _init: function() {
                    if (i.$sc = Ee(i.opts.scrollableContainer).first(), !i.$wp) return !1;
                    i.opts.toolbarContainer ? (i.shared.$tb ? (i.$tb = i.shared.$tb, i.opts.toolbarInline && d()) : (i.shared.$tb = Ee('<div class="fr-toolbar"></div>'), i.$tb = i.shared.$tb, Ee(i.opts.toolbarContainer).append(i.$tb), p(), i.$tb.data("instance", i)), i.opts.toolbarInline ? i.$box.addClass("fr-inline") : i.$box.addClass("fr-basic"), i.events.on("focus", function() { i.$tb.data("instance", i) }, !0), i.opts.toolbarInline = !1) : i.opts.toolbarInline ? (i.$box.addClass("fr-inline"), i.shared.$tb ? (i.$tb = i.shared.$tb, d()) : (i.shared.$tb = Ee('<div class="fr-toolbar"></div>'), i.$tb = i.shared.$tb, p())) : (i.$box.addClass("fr-basic"), i.$tb = Ee('<div class="fr-toolbar"></div>'), p(), i.$tb.data("instance", i)), i.events.on("destroy", f, !0), i.events.on(i.opts.toolbarInline || i.opts.toolbarContainer ? "shared.destroy" : "destroy", c, !0)
                },
                hide: n,
                show: function() {
                    if (!1 === i.events.trigger("toolbar.show")) return !1;
                    i.$tb.show()
                },
                showInline: t,
                disable: function() {!u && i.$tb && (i.$tb.find("> .fr-command").addClass("fr-disabled fr-no-refresh").attr("aria-disabled", !0), u = !0) },
                enable: function() { u && i.$tb && (i.$tb.find("> .fr-command").removeClass("fr-disabled fr-no-refresh").attr("aria-disabled", !1), u = !1), i.button.bulkRefresh() }
            }
        }, Ee.FE.PLUGINS.align = function(i) {
            return {
                apply: function(e) {
                    var t = i.selection.element();
                    if (Ee(t).parents(".fr-img-caption").length) Ee(t).css("text-align", e);
                    else {
                        i.selection.save(), i.html.wrap(!0, !0, !0, !0), i.selection.restore();
                        for (var n = i.selection.blocks(), r = 0; r < n.length; r++) i.helpers.getAlignment(Ee(n[r].parentNode)) == e ? Ee(n[r]).css("text-align", "").removeClass("fr-temp-div") : Ee(n[r]).css("text-align", e).removeClass("fr-temp-div"), "" === Ee(n[r]).attr("class") && Ee(n[r]).removeAttr("class"), "" === Ee(n[r]).attr("style") && Ee(n[r]).removeAttr("style");
                        i.selection.save(), i.html.unwrap(), i.selection.restore()
                    }
                },
                refresh: function(e) {
                    var t = i.selection.blocks();
                    if (t.length) {
                        var n = i.helpers.getAlignment(Ee(t[0]));
                        e.find("> *:first").replaceWith(i.icon.create("align-" + n))
                    }
                },
                refreshOnShow: function(e, t) {
                    var n = i.selection.blocks();
                    if (n.length) {
                        var r = i.helpers.getAlignment(Ee(n[0]));
                        t.find('a.fr-command[data-param1="' + r + '"]').addClass("fr-active").attr("aria-selected", !0)
                    }
                }
            }
        }, Ee.FE.DefineIcon("align", { NAME: "align-left" }), Ee.FE.DefineIcon("align-left", { NAME: "align-left" }), Ee.FE.DefineIcon("align-right", { NAME: "align-right" }), Ee.FE.DefineIcon("align-center", { NAME: "align-center" }), Ee.FE.DefineIcon("align-justify", { NAME: "align-justify" }), Ee.FE.RegisterCommand("align", {
            type: "dropdown",
            title: "Align",
            options: { left: "Align Left", center: "Align Center", right: "Align Right", justify: "Align Justify" },
            html: function() {
                var e = '<ul class="fr-dropdown-list" role="presentation">',
                    t = Ee.FE.COMMANDS.align.options;
                for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="align" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.icon.create("align-" + n) + '<span class="fr-sr-only">' + this.language.translate(t[n]) + "</span></a></li>");
                return e += "</ul>"
            },
            callback: function(e, t) { this.align.apply(t) },
            refresh: function(e) { this.align.refresh(e) },
            refreshOnShow: function(e, t) { this.align.refreshOnShow(e, t) },
            plugin: "align"
        }), Ee.extend(Ee.FE.DEFAULTS, { charCounterMax: -1, charCounterCount: !0 }), Ee.FE.PLUGINS.charCounter = function(n) {
            var r;

            function i() { return (n.el.textContent || "").replace(/\u200B/g, "").length }

            function e(e) { if (n.opts.charCounterMax < 0) return !0; if (i() < n.opts.charCounterMax) return !0; var t = e.which; return !(!n.keys.ctrlKey(e) && n.keys.isCharacter(t) || t === Ee.FE.KEYCODE.IME) || (e.preventDefault(), e.stopPropagation(), n.events.trigger("charCounter.exceeded"), !1) }

            function t(e) { return n.opts.charCounterMax < 0 ? e : Ee("<div>").html(e).text().length + i() <= n.opts.charCounterMax ? e : (n.events.trigger("charCounter.exceeded"), "") }

            function a() {
                if (n.opts.charCounterCount) {
                    var e = i() + (0 < n.opts.charCounterMax ? "/" + n.opts.charCounterMax : "");
                    r.text(e), n.opts.toolbarBottom && r.css("margin-bottom", n.$tb.outerHeight(!0));
                    var t = n.$wp.get(0).offsetWidth - n.$wp.get(0).clientWidth;
                    0 <= t && ("rtl" == n.opts.direction ? r.css("margin-left", t) : r.css("margin-right", t))
                }
            }
            return { _init: function() { return !!n.$wp && !!n.opts.charCounterCount && ((r = Ee('<span class="fr-counter"></span>')).css("bottom", n.$wp.css("border-bottom-width")), n.$box.append(r), n.events.on("keydown", e, !0), n.events.on("paste.afterCleanup", t), n.events.on("keyup contentChanged input", function() { n.events.trigger("charCounter.update") }), n.events.on("charCounter.update", a), n.events.trigger("charCounter.update"), void n.events.on("destroy", function() { Ee(n.o_win).off("resize.char" + n.id), r.removeData().remove(), r = null })) }, count: i }
        }, Ee.FE.PLUGINS.codeBeautifier = function() {
            var e, t, n, r, Y = {};

            function x(r, e) {
                var t = { "@page": !0, "@font-face": !0, "@keyframes": !0, "@media": !0, "@supports": !0, "@document": !0 },
                    n = { "@media": !0, "@supports": !0, "@document": !0 };
                e = e || {}, r = (r = r || "").replace(/\r\n|[\r\u2028\u2029]/g, "\n");
                var i = e.indent_size || 4,
                    a = e.indent_char || " ",
                    o = e.selector_separator_newline === undefined || e.selector_separator_newline,
                    s = e.end_with_newline !== undefined && e.end_with_newline,
                    l = e.newline_between_rules === undefined || e.newline_between_rules,
                    d = e.eol ? e.eol : "\n";
                "string" == typeof i && (i = parseInt(i, 10)), e.indent_with_tabs && (a = "\t", i = 1), d = d.replace(/\\r/, "\r").replace(/\\n/, "\n");
                var c, f = /^\s+$/,
                    p = -1,
                    u = 0;

                function h() { return (c = r.charAt(++p)) || "" }

                function g(e) { var t, n = p; return e && v(), t = r.charAt(p + 1) || "", p = n - 1, h(), t }

                function m(e) {
                    for (var t = p; h();)
                        if ("\\" === c) h();
                        else { if (-1 !== e.indexOf(c)) break; if ("\n" === c) break }
                    return r.substring(t, p + 1)
                }

                function v() { for (var e = ""; f.test(g());) h(), e += c; return e }

                function E() { var e = ""; for (c && f.test(c) && (e = c); f.test(h());) e += c; return e }

                function b(e) { var t = p; for (e = "/" === g(), h(); h();) { if (!e && "*" === c && "/" === g()) { h(); break } if (e && "\n" === c) return r.substring(t, p) } return r.substring(t, p) + c }

                function T(e) { return r.substring(p - e.length, p).toLowerCase() === e }

                function A() {
                    for (var e = 0, t = p + 1; t < r.length; t++) {
                        var n = r.charAt(t);
                        if ("{" === n) return !0;
                        if ("(" === n) e += 1;
                        else if (")" === n) {
                            if (0 == e) return !1;
                            e -= 1
                        } else if (";" === n || "}" === n) return !1
                    }
                    return !1
                }
                var C = r.match(/^[\t ]*/)[0],
                    S = new Array(i + 1).join(a),
                    R = 0,
                    y = 0;
                for (var _, L, x = { "{": function(e) { x.singleSpace(), N.push(e), x.newLine() }, "}": function(e) { x.newLine(), N.push(e), x.newLine() }, _lastCharWhitespace: function() { return f.test(N[N.length - 1]) }, newLine: function(e) { N.length && (e || "\n" === N[N.length - 1] || x.trim(), N.push("\n"), C && N.push(C)) }, singleSpace: function() { N.length && !x._lastCharWhitespace() && N.push(" ") }, preserveSingleSpace: function() { M && x.singleSpace() }, trim: function() { for (; x._lastCharWhitespace();) N.pop() } }, N = [], O = !1, w = !1, I = !1, D = "", k = "";;) {
                    var F = E(),
                        M = "" !== F,
                        $ = -1 !== F.indexOf("\n");
                    if (k = D, !(D = c)) break;
                    if ("/" === c && "*" === g()) {
                        var B = 0 === R;
                        ($ || B) && x.newLine(), N.push(b()), x.newLine(), B && x.newLine(!0)
                    } else if ("/" === c && "/" === g()) $ || "{" === k || x.trim(), x.singleSpace(), N.push(b()), x.newLine();
                    else if ("@" === c) {
                        x.preserveSingleSpace(), N.push(c);
                        var P = (void 0, _ = p, L = m(": ,;{}()[]/='\""), p = _ - 1, h(), L);
                        P.match(/[ :]$/) && (h(), P = m(": ").replace(/\s$/, ""), N.push(P), x.singleSpace()), (P = P.replace(/\s$/, "")) in t && (y += 1, P in n && (I = !0))
                    } else "#" === c && "{" === g() ? (x.preserveSingleSpace(), N.push(m("}"))) : "{" === c ? "}" === g(!0) ? (v(), h(), x.singleSpace(), N.push("{}"), x.newLine(), l && 0 === R && x.newLine(!0)) : (R++, C += S, x["{"](c), I ? (I = !1, O = y < R) : O = y <= R) : "}" === c ? (R--, C = C.slice(0, -i), x["}"](c), w = O = !1, y && y--, l && 0 === R && x.newLine(!0)) : ":" === c ? (v(), !O && !I || T("&") || A() ? ":" === g() ? (h(), N.push("::")) : N.push(":") : (w = !0, N.push(":"), x.singleSpace())) : '"' === c || "'" === c ? (x.preserveSingleSpace(), N.push(m(c))) : ";" === c ? (w = !1, N.push(c), x.newLine()) : "(" === c ? T("url") ? (N.push(c), v(), h() && (")" !== c && '"' !== c && "'" !== c ? N.push(m(")")) : p--)) : (u++, x.preserveSingleSpace(), N.push(c), v()) : ")" === c ? (N.push(c), u--) : "," === c ? (N.push(c), v(), o && !w && u < 1 ? x.newLine() : x.singleSpace()) : ("]" === c || ("[" === c ? x.preserveSingleSpace() : "=" === c ? (v(), c = "=") : x.preserveSingleSpace()), N.push(c))
                }
                var K = "";
                return C && (K += C), K += N.join("").replace(/[\r\n\t ]+$/, ""), s && (K += "\n"), "\n" != d && (K = K.replace(/[\n]/g, d)), K
            }

            function G(e, t) {
                for (var n = 0; n < t.length; n += 1)
                    if (t[n] === e) return !0;
                return !1
            }

            function V(e) { return e.replace(/^\s+|\s+$/g, "") }

            function N(e, t) {
                return new function(r, e) {
                    var o, i, a, s, l, d, c, f, p, t, n, u, h, g = [],
                        m = "";

                    function v(e, t) {
                        var n = 0;
                        e && (n = e.indentation_level, !o.just_added_newline() && e.line_indent_level > n && (n = e.line_indent_level));
                        var r = { mode: t, parent: e, last_text: e ? e.last_text : "", last_word: e ? e.last_word : "", declaration_statement: !1, declaration_assignment: !1, multiline_frame: !1, if_block: !1, else_block: !1, do_block: !1, do_while: !1, in_case_statement: !1, in_case: !1, case_body: !1, indentation_level: n, line_indent_level: e ? e.line_indent_level : n, start_line_index: o.get_line_number(), ternary_depth: 0 };
                        return r
                    }
                    u = {
                        TK_START_EXPR: function() {
                            O();
                            var e = k.Expression;
                            if ("[" === s.text) {
                                if ("TK_WORD" === l || ")" === f.last_text) return "TK_RESERVED" === l && G(f.last_text, a.line_starters) && (o.space_before_token = !0), y(e), S(), R(), void(h.space_in_paren && (o.space_before_token = !0));
                                e = k.ArrayLiteral, _(f.mode) && ("[" !== f.last_text && ("," !== f.last_text || "]" !== d && "}" !== d) || h.keep_array_indentation || A())
                            } else "TK_RESERVED" === l && "for" === f.last_text ? e = k.ForInitializer : "TK_RESERVED" === l && G(f.last_text, ["if", "while"]) && (e = k.Conditional);
                            ";" === f.last_text || "TK_START_BLOCK" === l ? A() : "TK_END_EXPR" === l || "TK_START_EXPR" === l || "TK_END_BLOCK" === l || "." === f.last_text ? T(s.wanted_newline) : "TK_RESERVED" === l && "(" === s.text || "TK_WORD" === l || "TK_OPERATOR" === l ? "TK_RESERVED" === l && ("function" === f.last_word || "typeof" === f.last_word) || "*" === f.last_text && "function" === d ? h.space_after_anon_function && (o.space_before_token = !0) : "TK_RESERVED" !== l || !G(f.last_text, a.line_starters) && "catch" !== f.last_text || h.space_before_conditional && (o.space_before_token = !0) : o.space_before_token = !0, "(" === s.text && "TK_RESERVED" === l && "await" === f.last_word && (o.space_before_token = !0), "(" === s.text && ("TK_EQUALS" !== l && "TK_OPERATOR" !== l || N() || T()), y(e), S(), h.space_in_paren && (o.space_before_token = !0), R()
                        },
                        TK_END_EXPR: function() {
                            for (; f.mode === k.Statement;) x();
                            f.multiline_frame && T("]" === s.text && _(f.mode) && !h.keep_array_indentation), h.space_in_paren && ("TK_START_EXPR" !== l || h.space_in_empty_paren ? o.space_before_token = !0 : (o.trim(), o.space_before_token = !1)), "]" === s.text && h.keep_array_indentation ? (S(), x()) : (x(), S()), o.remove_redundant_indentation(p), f.do_while && p.mode === k.Conditional && (p.mode = k.Expression, f.do_block = !1, f.do_while = !1)
                        },
                        TK_START_BLOCK: function() {
                            var e = I(1),
                                t = I(2);
                            t && (":" === t.text && G(e.type, ["TK_STRING", "TK_WORD", "TK_RESERVED"]) || G(e.text, ["get", "set"]) && G(t.type, ["TK_WORD", "TK_RESERVED"])) ? G(d, ["class", "interface"]) ? y(k.BlockStatement) : y(k.ObjectLiteral) : y(k.BlockStatement);
                            var n = !e.comments_before.length && "}" === e.text && "function" === f.last_word && "TK_END_EXPR" === l;
                            "expand" === h.brace_style || "none" === h.brace_style && s.wanted_newline ? "TK_OPERATOR" !== l && (n || "TK_EQUALS" === l || "TK_RESERVED" === l && w(f.last_text) && "else" !== f.last_text) ? o.space_before_token = !0 : A(!1, !0) : "TK_OPERATOR" !== l && "TK_START_EXPR" !== l ? "TK_START_BLOCK" === l ? A() : o.space_before_token = !0 : _(p.mode) && "," === f.last_text && ("}" === d ? o.space_before_token = !0 : A()), S(), R()
                        },
                        TK_END_BLOCK: function() { for (; f.mode === k.Statement;) x(); var e = "TK_START_BLOCK" === l; "expand" === h.brace_style ? e || A() : e || (_(f.mode) && h.keep_array_indentation ? (h.keep_array_indentation = !1, A(), h.keep_array_indentation = !0) : A()), x(), S() },
                        TK_WORD: D,
                        TK_RESERVED: D,
                        TK_SEMICOLON: function() {
                            for (O() && (o.space_before_token = !1); f.mode === k.Statement && !f.if_block && !f.do_block;) x();
                            S()
                        },
                        TK_STRING: function() { O() ? o.space_before_token = !0 : "TK_RESERVED" === l || "TK_WORD" === l ? o.space_before_token = !0 : "TK_COMMA" === l || "TK_START_EXPR" === l || "TK_EQUALS" === l || "TK_OPERATOR" === l ? N() || T() : A(), S() },
                        TK_EQUALS: function() { O(), f.declaration_statement && (f.declaration_assignment = !0), o.space_before_token = !0, S(), o.space_before_token = !0 },
                        TK_OPERATOR: function() {
                            if (O(), "TK_RESERVED" === l && w(f.last_text)) return o.space_before_token = !0, void S();
                            if ("*" !== s.text || "TK_DOT" !== l) {
                                if (":" === s.text && f.in_case) return f.case_body = !0, R(), S(), A(), void(f.in_case = !1);
                                if ("::" !== s.text) {
                                    "TK_OPERATOR" === l && T();
                                    var e = !0,
                                        t = !0;
                                    G(s.text, ["--", "++", "!", "~"]) || G(s.text, ["-", "+"]) && (G(l, ["TK_START_BLOCK", "TK_START_EXPR", "TK_EQUALS", "TK_OPERATOR"]) || G(f.last_text, a.line_starters) || "," === f.last_text) ? (t = e = !1, !s.wanted_newline || "--" !== s.text && "++" !== s.text || A(!1, !0), ";" === f.last_text && L(f.mode) && (e = !0), "TK_RESERVED" === l ? e = !0 : "TK_END_EXPR" === l ? e = !("]" === f.last_text && ("--" === s.text || "++" === s.text)) : "TK_OPERATOR" === l && (e = G(s.text, ["--", "-", "++", "+"]) && G(f.last_text, ["--", "-", "++", "+"]), G(s.text, ["+", "-"]) && G(f.last_text, ["--", "++"]) && (t = !0)), f.mode !== k.BlockStatement && f.mode !== k.Statement || "{" !== f.last_text && ";" !== f.last_text || A()) : ":" === s.text ? 0 === f.ternary_depth ? e = !1 : f.ternary_depth -= 1 : "?" === s.text ? f.ternary_depth += 1 : "*" === s.text && "TK_RESERVED" === l && "function" === f.last_text && (t = e = !1), o.space_before_token = o.space_before_token || e, S(), o.space_before_token = t
                                } else S()
                            } else S()
                        },
                        TK_COMMA: function() {
                            if (f.declaration_statement) return L(f.parent.mode) && (f.declaration_assignment = !1), S(), void(f.declaration_assignment ? A(f.declaration_assignment = !1, !0) : (o.space_before_token = !0, h.comma_first && T()));
                            S(), f.mode === k.ObjectLiteral || f.mode === k.Statement && f.parent.mode === k.ObjectLiteral ? (f.mode === k.Statement && x(), A()) : (o.space_before_token = !0, h.comma_first && T())
                        },
                        TK_BLOCK_COMMENT: function() {
                            if (o.raw) return o.add_raw_token(s), void(s.directives && "end" === s.directives.preserve && (h.test_output_raw || (o.raw = !1)));
                            if (s.directives) return A(!1, !0), S(), "start" === s.directives.preserve && (o.raw = !0), void A(!1, !0);
                            if (!Y.newline.test(s.text) && !s.wanted_newline) return o.space_before_token = !0, S(), void(o.space_before_token = !0);
                            var e, t = function(e) { e = e.replace(/\x0d/g, ""); for (var t = [], n = e.indexOf("\n"); - 1 !== n;) t.push(e.substring(0, n)), e = e.substring(n + 1), n = e.indexOf("\n"); return e.length && t.push(e), t }(s.text),
                                n = !1,
                                r = !1,
                                i = s.whitespace_before,
                                a = i.length;
                            for (A(!1, !0), 1 < t.length && (function(e, t) { for (var n = 0; n < e.length; n++) { var r = V(e[n]); if (r.charAt(0) !== t) return !1 } return !0 }(t.slice(1), "*") ? n = !0 : function(e, t) {
                                    for (var n, r = 0, i = e.length; r < i; r++)
                                        if ((n = e[r]) && 0 !== n.indexOf(t)) return !1;
                                    return !0
                                }(t.slice(1), i) && (r = !0)), S(t[0]), e = 1; e < t.length; e++) A(!1, !0), n ? S(" " + t[e].replace(/^\s+/g, "")) : r && t[e].length > a ? S(t[e].substring(a)) : o.add_token(t[e]);
                            A(!1, !0)
                        },
                        TK_COMMENT: function() { s.wanted_newline ? A(!1, !0) : o.trim(!0), o.space_before_token = !0, S(), A(!1, !0) },
                        TK_DOT: function() { O(), "TK_RESERVED" === l && w(f.last_text) ? o.space_before_token = !0 : T(")" === f.last_text && h.break_chained_methods), S() },
                        TK_UNKNOWN: function() { S(), "\n" === s.text[s.text.length - 1] && A() },
                        TK_EOF: function() { for (; f.mode === k.Statement;) x() }
                    }, h = {}, (e = e || {}).braces_on_own_line !== undefined && (h.brace_style = e.braces_on_own_line ? "expand" : "collapse");
                    h.brace_style = e.brace_style ? e.brace_style : h.brace_style ? h.brace_style : "collapse", "expand-strict" === h.brace_style && (h.brace_style = "expand");
                    h.indent_size = e.indent_size ? parseInt(e.indent_size, 10) : 4, h.indent_char = e.indent_char ? e.indent_char : " ", h.eol = e.eol ? e.eol : "\n", h.preserve_newlines = e.preserve_newlines === undefined || e.preserve_newlines, h.break_chained_methods = e.break_chained_methods !== undefined && e.break_chained_methods, h.max_preserve_newlines = e.max_preserve_newlines === undefined ? 0 : parseInt(e.max_preserve_newlines, 10), h.space_in_paren = e.space_in_paren !== undefined && e.space_in_paren, h.space_in_empty_paren = e.space_in_empty_paren !== undefined && e.space_in_empty_paren, h.jslint_happy = e.jslint_happy !== undefined && e.jslint_happy, h.space_after_anon_function = e.space_after_anon_function !== undefined && e.space_after_anon_function, h.keep_array_indentation = e.keep_array_indentation !== undefined && e.keep_array_indentation, h.space_before_conditional = e.space_before_conditional === undefined || e.space_before_conditional, h.unescape_strings = e.unescape_strings !== undefined && e.unescape_strings, h.wrap_line_length = e.wrap_line_length === undefined ? 0 : parseInt(e.wrap_line_length, 10), h.e4x = e.e4x !== undefined && e.e4x, h.end_with_newline = e.end_with_newline !== undefined && e.end_with_newline, h.comma_first = e.comma_first !== undefined && e.comma_first, h.test_output_raw = e.test_output_raw !== undefined && e.test_output_raw, h.jslint_happy && (h.space_after_anon_function = !0);
                    e.indent_with_tabs && (h.indent_char = "\t", h.indent_size = 1);
                    h.eol = h.eol.replace(/\\r/, "\r").replace(/\\n/, "\n"), c = "";
                    for (; 0 < h.indent_size;) c += h.indent_char, h.indent_size -= 1;
                    var E = 0;
                    if (r && r.length) {
                        for (;
                            " " === r.charAt(E) || "\t" === r.charAt(E);) m += r.charAt(E), E += 1;
                        r = r.substring(E)
                    }

                    function b(e) {
                        var t = e.newlines,
                            n = h.keep_array_indentation && _(f.mode);
                        if (n)
                            for (r = 0; r < t; r += 1) A(0 < r);
                        else if (h.max_preserve_newlines && t > h.max_preserve_newlines && (t = h.max_preserve_newlines), h.preserve_newlines && 1 < e.newlines) { A(); for (var r = 1; r < t; r += 1) A(!0) }
                        u[(s = e).type]()
                    }

                    function T(e) {
                        if (e = e !== undefined && e, !o.just_added_newline())
                            if (h.preserve_newlines && s.wanted_newline || e) A(!1, !0);
                            else if (h.wrap_line_length) {
                            var t = o.current_line.get_character_count() + s.text.length + (o.space_before_token ? 1 : 0);
                            t >= h.wrap_line_length && A(!1, !0)
                        }
                    }

                    function A(e, t) {
                        if (!t && ";" !== f.last_text && "," !== f.last_text && "=" !== f.last_text && "TK_OPERATOR" !== l)
                            for (; f.mode === k.Statement && !f.if_block && !f.do_block;) x();
                        o.add_new_line(e) && (f.multiline_frame = !0)
                    }

                    function C() { o.just_added_newline() && (h.keep_array_indentation && _(f.mode) && s.wanted_newline ? (o.current_line.push(s.whitespace_before), o.space_before_token = !1) : o.set_indent(f.indentation_level) && (f.line_indent_level = f.indentation_level)) }

                    function S(e) { o.raw ? o.add_raw_token(s) : (h.comma_first && "TK_COMMA" === l && o.just_added_newline() && "," === o.previous_line.last() && (o.previous_line.pop(), C(), o.add_token(","), o.space_before_token = !0), e = e || s.text, C(), o.add_token(e)) }

                    function R() { f.indentation_level += 1 }

                    function y(e) { f ? (t.push(f), p = f) : p = v(null, e), f = v(p, e) }

                    function _(e) { return e === k.ArrayLiteral }

                    function L(e) { return G(e, [k.Expression, k.ForInitializer, k.Conditional]) }

                    function x() { 0 < t.length && (p = f, f = t.pop(), p.mode === k.Statement && o.remove_redundant_indentation(p)) }

                    function N() { return f.parent.mode === k.ObjectLiteral && f.mode === k.Statement && (":" === f.last_text && 0 === f.ternary_depth || "TK_RESERVED" === l && G(f.last_text, ["get", "set"])) }

                    function O() { return !!("TK_RESERVED" === l && G(f.last_text, ["var", "let", "const"]) && "TK_WORD" === s.type || "TK_RESERVED" === l && "do" === f.last_text || "TK_RESERVED" === l && "return" === f.last_text && !s.wanted_newline || "TK_RESERVED" === l && "else" === f.last_text && ("TK_RESERVED" !== s.type || "if" !== s.text) || "TK_END_EXPR" === l && (p.mode === k.ForInitializer || p.mode === k.Conditional) || "TK_WORD" === l && f.mode === k.BlockStatement && !f.in_case && "--" !== s.text && "++" !== s.text && "function" !== d && "TK_WORD" !== s.type && "TK_RESERVED" !== s.type || f.mode === k.ObjectLiteral && (":" === f.last_text && 0 === f.ternary_depth || "TK_RESERVED" === l && G(f.last_text, ["get", "set"]))) && (y(k.Statement), R(), "TK_RESERVED" === l && G(f.last_text, ["var", "let", "const"]) && "TK_WORD" === s.type && (f.declaration_statement = !0), N() || T("TK_RESERVED" === s.type && G(s.text, ["do", "for", "if", "while"])), !0) }

                    function w(e) { return G(e, ["case", "return", "do", "if", "throw", "else"]) }

                    function I(e) { var t = i + (e || 0); return t < 0 || t >= g.length ? null : g[t] }

                    function D() {
                        if ("TK_RESERVED" === s.type && f.mode !== k.ObjectLiteral && G(s.text, ["set", "get"]) && (s.type = "TK_WORD"), "TK_RESERVED" === s.type && f.mode === k.ObjectLiteral) { var e = I(1); ":" == e.text && (s.type = "TK_WORD") }
                        if (O() || !s.wanted_newline || L(f.mode) || "TK_OPERATOR" === l && "--" !== f.last_text && "++" !== f.last_text || "TK_EQUALS" === l || !h.preserve_newlines && "TK_RESERVED" === l && G(f.last_text, ["var", "let", "const", "set", "get"]) || A(), f.do_block && !f.do_while) {
                            if ("TK_RESERVED" === s.type && "while" === s.text) return o.space_before_token = !0, S(), o.space_before_token = !0, void(f.do_while = !0);
                            A(), f.do_block = !1
                        }
                        if (f.if_block)
                            if (f.else_block || "TK_RESERVED" !== s.type || "else" !== s.text) {
                                for (; f.mode === k.Statement;) x();
                                f.if_block = !1, f.else_block = !1
                            } else f.else_block = !0;
                        if ("TK_RESERVED" === s.type && ("case" === s.text || "default" === s.text && f.in_case_statement)) return A(), (f.case_body || h.jslint_happy) && (0 < f.indentation_level && (!f.parent || f.indentation_level > f.parent.indentation_level) && (f.indentation_level -= 1), f.case_body = !1), S(), f.in_case = !0, void(f.in_case_statement = !0);
                        if ("TK_RESERVED" === s.type && "function" === s.text && ((G(f.last_text, ["}", ";"]) || o.just_added_newline() && !G(f.last_text, ["[", "{", ":", "=", ","])) && (o.just_added_blankline() || s.comments_before.length || (A(), A(!0))), "TK_RESERVED" === l || "TK_WORD" === l ? "TK_RESERVED" === l && G(f.last_text, ["get", "set", "new", "return", "export", "async"]) ? o.space_before_token = !0 : "TK_RESERVED" === l && "default" === f.last_text && "export" === d ? o.space_before_token = !0 : A() : "TK_OPERATOR" === l || "=" === f.last_text ? o.space_before_token = !0 : (f.multiline_frame || !L(f.mode) && !_(f.mode)) && A()), "TK_COMMA" !== l && "TK_START_EXPR" !== l && "TK_EQUALS" !== l && "TK_OPERATOR" !== l || N() || T(), "TK_RESERVED" === s.type && G(s.text, ["function", "get", "set"])) return S(), void(f.last_word = s.text);
                        if (n = "NONE", "TK_END_BLOCK" === l ? "TK_RESERVED" === s.type && G(s.text, ["else", "catch", "finally"]) ? "expand" === h.brace_style || "end-expand" === h.brace_style || "none" === h.brace_style && s.wanted_newline ? n = "NEWLINE" : (n = "SPACE", o.space_before_token = !0) : n = "NEWLINE" : "TK_SEMICOLON" === l && f.mode === k.BlockStatement ? n = "NEWLINE" : "TK_SEMICOLON" === l && L(f.mode) ? n = "SPACE" : "TK_STRING" === l ? n = "NEWLINE" : "TK_RESERVED" === l || "TK_WORD" === l || "*" === f.last_text && "function" === d ? n = "SPACE" : "TK_START_BLOCK" === l ? n = "NEWLINE" : "TK_END_EXPR" === l && (o.space_before_token = !0, n = "NEWLINE"), "TK_RESERVED" === s.type && G(s.text, a.line_starters) && ")" !== f.last_text && (n = "else" === f.last_text || "export" === f.last_text ? "SPACE" : "NEWLINE"), "TK_RESERVED" === s.type && G(s.text, ["else", "catch", "finally"]))
                            if ("TK_END_BLOCK" !== l || "expand" === h.brace_style || "end-expand" === h.brace_style || "none" === h.brace_style && s.wanted_newline) A();
                            else { o.trim(!0); var t = o.current_line; "}" !== t.last() && A(), o.space_before_token = !0 }
                        else "NEWLINE" === n ? "TK_RESERVED" === l && w(f.last_text) ? o.space_before_token = !0 : "TK_END_EXPR" !== l ? "TK_START_EXPR" === l && "TK_RESERVED" === s.type && G(s.text, ["var", "let", "const"]) || ":" === f.last_text || ("TK_RESERVED" === s.type && "if" === s.text && "else" === f.last_text ? o.space_before_token = !0 : A()) : "TK_RESERVED" === s.type && G(s.text, a.line_starters) && ")" !== f.last_text && A() : f.multiline_frame && _(f.mode) && "," === f.last_text && "}" === d ? A() : "SPACE" === n && (o.space_before_token = !0);
                        S(), f.last_word = s.text, "TK_RESERVED" === s.type && "do" === s.text && (f.do_block = !0), "TK_RESERVED" === s.type && "if" === s.text && (f.if_block = !0)
                    }
                    l = "TK_START_BLOCK", d = "", (o = new function(t, n) {
                        n = n || "", this.indent_cache = [n], this.baseIndentLength = n.length, this.indent_length = t.length, this.raw = !1;
                        var r = [];
                        this.baseIndentString = n, this.indent_string = t, this.previous_line = null, this.current_line = null, this.space_before_token = !1, this.add_outputline = function() {
                            this.previous_line = this.current_line, this.current_line = new function(t) {
                                var n = 0,
                                    r = -1,
                                    i = [],
                                    a = !0;
                                this.set_indent = function(e) { n = t.baseIndentLength + e * t.indent_length, r = e }, this.get_character_count = function() { return n }, this.is_empty = function() { return a }, this.last = function() { return this._empty ? null : i[i.length - 1] }, this.push = function(e) { i.push(e), n += e.length, a = !1 }, this.pop = function() { var e = null; return a || (e = i.pop(), n -= e.length, a = 0 === i.length), e }, this.remove_indent = function() { 0 < r && (r -= 1, n -= t.indent_length) }, this.trim = function() {
                                    for (;
                                        " " === this.last();) {
                                        i.pop();
                                        n -= 1
                                    }
                                    a = 0 === i.length
                                }, this.toString = function() { var e = ""; return this._empty || (0 <= r && (e = t.indent_cache[r]), e += i.join("")), e }
                            }(this), r.push(this.current_line)
                        }, this.add_outputline(), this.get_line_number = function() { return r.length }, this.add_new_line = function(e) { return (1 !== this.get_line_number() || !this.just_added_newline()) && (!(!e && this.just_added_newline()) && (this.raw || this.add_outputline(), !0)) }, this.get_code = function() { var e = r.join("\n").replace(/[\r\n\t ]+$/, ""); return e }, this.set_indent = function(e) { if (1 < r.length) { for (; e >= this.indent_cache.length;) this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string); return this.current_line.set_indent(e), !0 } return this.current_line.set_indent(0), !1 }, this.add_raw_token = function(e) {
                            for (var t = 0; t < e.newlines; t++) this.add_outputline();
                            this.current_line.push(e.whitespace_before), this.current_line.push(e.text), this.space_before_token = !1
                        }, this.add_token = function(e) { this.add_space_before_token(), this.current_line.push(e) }, this.add_space_before_token = function() { this.space_before_token && !this.just_added_newline() && this.current_line.push(" "), this.space_before_token = !1 }, this.remove_redundant_indentation = function(e) {
                            if (!e.multiline_frame && e.mode !== k.ForInitializer && e.mode !== k.Conditional)
                                for (var t = e.start_line_index, n = r.length; t < n;) r[t].remove_indent(), t++
                        }, this.trim = function(e) {
                            for (e = e !== undefined && e, this.current_line.trim(t, n); e && 1 < r.length && this.current_line.is_empty();) r.pop(), this.current_line = r[r.length - 1], this.current_line.trim();
                            this.previous_line = 1 < r.length ? r[r.length - 2] : null
                        }, this.just_added_newline = function() { return this.current_line.is_empty() }, this.just_added_blankline = function() { if (this.just_added_newline()) { if (1 === r.length) return !0; var e = r[r.length - 2]; return e.is_empty() } return !1 }
                    }(c, m)).raw = h.test_output_raw, t = [], y(k.BlockStatement), this.beautify = function() {
                        var e, t;
                        for (a = new function(y, _, e) {
                                var L = "\n\r\t ".split(""),
                                    x = /[0-9]/,
                                    N = /[01234567]/,
                                    O = /[0123456789abcdefABCDEF]/,
                                    w = "+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! ~ , : ? ^ ^= |= :: =>".split(" ");
                                this.line_starters = "continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(",");
                                var I, D, k, F, M, $, B = this.line_starters.concat(["do", "in", "else", "get", "set", "new", "catch", "finally", "typeof", "yield", "async", "await"]),
                                    P = /([\s\S]*?)((?:\*\/)|$)/g,
                                    K = /([^\n\r\u2028\u2029]*)/g,
                                    U = /\/\* beautify( \w+[:]\w+)+ \*\//g,
                                    H = / (\w+)[:](\w+)/g,
                                    W = /([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g,
                                    z = /((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g;

                                function o() {
                                    var e, t, n = [];
                                    if (I = 0, D = "", $ <= M) return ["", "TK_EOF"];
                                    t = F.length ? F[F.length - 1] : new X("TK_START_BLOCK", "{");
                                    var r = y.charAt(M);
                                    for (M += 1; G(r, L);) {
                                        if (Y.newline.test(r) ? "\n" === r && "\r" === y.charAt(M - 2) || (I += 1, n = []) : n.push(r), $ <= M) return ["", "TK_EOF"];
                                        r = y.charAt(M), M += 1
                                    }
                                    if (n.length && (D = n.join("")), x.test(r)) {
                                        var i = !0,
                                            a = !0,
                                            o = x;
                                        for ("0" === r && M < $ && /[Xxo]/.test(y.charAt(M)) ? (a = i = !1, r += y.charAt(M), M += 1, o = /[o]/.test(y.charAt(M)) ? N : O) : (r = "", M -= 1); M < $ && o.test(y.charAt(M));) r += y.charAt(M), M += 1, i && M < $ && "." === y.charAt(M) && (r += y.charAt(M), M += 1, i = !1), a && M < $ && /[Ee]/.test(y.charAt(M)) && (r += y.charAt(M), (M += 1) < $ && /[+-]/.test(y.charAt(M)) && (r += y.charAt(M), M += 1), i = a = !1);
                                        return [r, "TK_WORD"]
                                    }
                                    if (Y.isIdentifierStart(y.charCodeAt(M - 1))) {
                                        if (M < $)
                                            for (; Y.isIdentifierChar(y.charCodeAt(M)) && (r += y.charAt(M), (M += 1) !== $););
                                        return "TK_DOT" === t.type || "TK_RESERVED" === t.type && G(t.text, ["set", "get"]) || !G(r, B) ? [r, "TK_WORD"] : "in" === r ? [r, "TK_OPERATOR"] : [r, "TK_RESERVED"]
                                    }
                                    if ("(" === r || "[" === r) return [r, "TK_START_EXPR"];
                                    if (")" === r || "]" === r) return [r, "TK_END_EXPR"];
                                    if ("{" === r) return [r, "TK_START_BLOCK"];
                                    if ("}" === r) return [r, "TK_END_BLOCK"];
                                    if (";" === r) return [r, "TK_SEMICOLON"];
                                    if ("/" === r) {
                                        var s = "";
                                        if ("*" === y.charAt(M)) {
                                            M += 1, P.lastIndex = M;
                                            var l = P.exec(y);
                                            s = "/*" + l[0], M += l[0].length;
                                            var d = function(e) {
                                                if (!e.match(U)) return null;
                                                var t = {};
                                                H.lastIndex = 0;
                                                var n = H.exec(e);
                                                for (; n;) t[n[1]] = n[2], n = H.exec(e);
                                                return t
                                            }(s);
                                            return d && "start" === d.ignore && (W.lastIndex = M, l = W.exec(y), s += l[0], M += l[0].length), [s = s.replace(Y.lineBreak, "\n"), "TK_BLOCK_COMMENT", d]
                                        }
                                        if ("/" === y.charAt(M)) { M += 1, K.lastIndex = M; var l = K.exec(y); return s = "//" + l[0], M += l[0].length, [s, "TK_COMMENT"] }
                                    }
                                    if ("`" === r || "'" === r || '"' === r || ("/" === r || _.e4x && "<" === r && y.slice(M - 1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/)) && ("TK_RESERVED" === t.type && G(t.text, ["return", "case", "throw", "else", "do", "typeof", "yield"]) || "TK_END_EXPR" === t.type && ")" === t.text && t.parent && "TK_RESERVED" === t.parent.type && G(t.parent.text, ["if", "while", "for"]) || G(t.type, ["TK_COMMENT", "TK_START_EXPR", "TK_START_BLOCK", "TK_END_BLOCK", "TK_OPERATOR", "TK_EQUALS", "TK_EOF", "TK_SEMICOLON", "TK_COMMA"]))) {
                                        var c = r,
                                            f = !1,
                                            p = !1;
                                        if (e = r, "/" === c)
                                            for (var u = !1; M < $ && (f || u || y.charAt(M) !== c) && !Y.newline.test(y.charAt(M));) e += y.charAt(M), f ? f = !1 : (f = "\\" === y.charAt(M), "[" === y.charAt(M) ? u = !0 : "]" === y.charAt(M) && (u = !1)), M += 1;
                                        else if (_.e4x && "<" === c) {
                                            var h = /<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/g,
                                                g = y.slice(M - 1),
                                                m = h.exec(g);
                                            if (m && 0 === m.index) {
                                                for (var v = m[2], E = 0; m;) {
                                                    var b = !!m[1],
                                                        T = m[2],
                                                        A = !!m[m.length - 1] || "![CDATA[" === T.slice(0, 8);
                                                    if (T !== v || A || (b ? --E : ++E), E <= 0) break;
                                                    m = h.exec(g)
                                                }
                                                var C = m ? m.index + m[0].length : g.length;
                                                return g = g.slice(0, C), M += C - 1, [g = g.replace(Y.lineBreak, "\n"), "TK_STRING"]
                                            }
                                        } else
                                            for (; M < $ && (f || y.charAt(M) !== c && ("`" === c || !Y.newline.test(y.charAt(M))));)(f || "`" === c) && Y.newline.test(y.charAt(M)) ? ("\r" === y.charAt(M) && "\n" === y.charAt(M + 1) && (M += 1), e += "\n") : e += y.charAt(M), f ? ("x" !== y.charAt(M) && "u" !== y.charAt(M) || (p = !0), f = !1) : f = "\\" === y.charAt(M), M += 1;
                                        if (p && _.unescape_strings && (e = function(e) {
                                                var t, n = !1,
                                                    r = "",
                                                    i = 0,
                                                    a = "",
                                                    o = 0;
                                                for (; n || i < e.length;)
                                                    if (t = e.charAt(i), i++, n) {
                                                        if (n = !1, "x" === t) a = e.substr(i, 2), i += 2;
                                                        else {
                                                            if ("u" !== t) { r += "\\" + t; continue }
                                                            a = e.substr(i, 4), i += 4
                                                        }
                                                        if (!a.match(/^[0123456789abcdefABCDEF]+$/)) return e;
                                                        if (0 <= (o = parseInt(a, 16)) && o < 32) { r += "x" === t ? "\\x" + a : "\\u" + a; continue }
                                                        if (34 === o || 39 === o || 92 === o) r += "\\" + String.fromCharCode(o);
                                                        else {
                                                            if ("x" === t && 126 < o && o <= 255) return e;
                                                            r += String.fromCharCode(o)
                                                        }
                                                    } else "\\" === t ? n = !0 : r += t;
                                                return r
                                            }(e)), M < $ && y.charAt(M) === c && (e += c, M += 1, "/" === c))
                                            for (; M < $ && Y.isIdentifierStart(y.charCodeAt(M));) e += y.charAt(M), M += 1;
                                        return [e, "TK_STRING"]
                                    }
                                    if ("#" === r) { if (0 === F.length && "!" === y.charAt(M)) { for (e = r; M < $ && "\n" !== r;) r = y.charAt(M), e += r, M += 1; return [V(e) + "\n", "TK_UNKNOWN"] } var S = "#"; if (M < $ && x.test(y.charAt(M))) { for (; r = y.charAt(M), S += r, (M += 1) < $ && "#" !== r && "=" !== r;); return "#" === r || ("[" === y.charAt(M) && "]" === y.charAt(M + 1) ? (S += "[]", M += 2) : "{" === y.charAt(M) && "}" === y.charAt(M + 1) && (S += "{}", M += 2)), [S, "TK_WORD"] } }
                                    if ("<" === r && ("?" === y.charAt(M) || "%" === y.charAt(M))) { z.lastIndex = M - 1; var R = z.exec(y); if (R) return r = R[0], M += r.length - 1, [r = r.replace(Y.lineBreak, "\n"), "TK_STRING"] }
                                    if ("<" === r && "\x3c!--" === y.substring(M - 1, M + 3)) { for (M += 3, r = "\x3c!--"; !Y.newline.test(y.charAt(M)) && M < $;) r += y.charAt(M), M++; return k = !0, [r, "TK_COMMENT"] }
                                    if ("-" === r && k && "--\x3e" === y.substring(M - 1, M + 2)) return k = !1, M += 2, ["--\x3e", "TK_COMMENT"];
                                    if ("." === r) return [r, "TK_DOT"];
                                    if (G(r, w)) { for (; M < $ && G(r + y.charAt(M), w) && (r += y.charAt(M), !($ <= (M += 1)));); return "," === r ? [r, "TK_COMMA"] : "=" === r ? [r, "TK_EQUALS"] : [r, "TK_OPERATOR"] }
                                    return [r, "TK_UNKNOWN"]
                                }
                                this.tokenize = function() {
                                    var e, t, n;
                                    $ = y.length, M = 0, k = !1, F = [];
                                    for (var r = null, i = [], a = []; !t || "TK_EOF" !== t.type;) {
                                        for (n = o(), e = new X(n[1], n[0], I, D);
                                            "TK_COMMENT" === e.type || "TK_BLOCK_COMMENT" === e.type || "TK_UNKNOWN" === e.type;) "TK_BLOCK_COMMENT" === e.type && (e.directives = n[2]), a.push(e), n = o(), e = new X(n[1], n[0], I, D);
                                        a.length && (e.comments_before = a, a = []), "TK_START_BLOCK" === e.type || "TK_START_EXPR" === e.type ? (e.parent = t, i.push(r), r = e) : ("TK_END_BLOCK" === e.type || "TK_END_EXPR" === e.type) && r && ("]" === e.text && "[" === r.text || ")" === e.text && "(" === r.text || "}" === e.text && "{" === r.text) && (e.parent = r.parent, r = i.pop()), F.push(e), t = e
                                    }
                                    return F
                                }
                            }(r, h, c), g = a.tokenize(), i = 0; e = I();) {
                            for (var n = 0; n < e.comments_before.length; n++) b(e.comments_before[n]);
                            b(e), d = f.last_text, l = e.type, f.last_text = e.text, i += 1
                        }
                        return t = o.get_code(), h.end_with_newline && (t += "\n"), "\n" != h.eol && (t = t.replace(/[\n]/g, h.eol)), t
                    }
                }(e, t).beautify()
            }
            e = Y, t = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc", n = new RegExp("[" + t + "]"), r = new RegExp("[" + t + "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]"), e.newline = /[\n\r\u2028\u2029]/, e.lineBreak = new RegExp("\r\n|" + e.newline.source), e.allLineBreaks = new RegExp(e.lineBreak.source, "g"), e.isIdentifierStart = function(e) { return e < 65 ? 36 === e || 64 === e : e < 91 || (e < 97 ? 95 === e : e < 123 || 170 <= e && n.test(String.fromCharCode(e))) }, e.isIdentifierChar = function(e) { return e < 48 ? 36 === e : e < 58 || !(e < 65) && (e < 91 || (e < 97 ? 95 === e : e < 123 || 170 <= e && r.test(String.fromCharCode(e)))) };
            var k = { BlockStatement: "BlockStatement", Statement: "Statement", ObjectLiteral: "ObjectLiteral", ArrayLiteral: "ArrayLiteral", ForInitializer: "ForInitializer", Conditional: "Conditional", Expression: "Expression" };
            var X = function(e, t, n, r, i, a) { this.type = e, this.text = t, this.comments_before = [], this.newlines = n || 0, this.wanted_newline = 0 < n, this.whitespace_before = r || "", this.parent = null, this.directives = null };
            return {
                run: function(e, t) {
                    function o(e) { return e.replace(/\s+$/g, "") }
                    var n, r, i, m, a, s, v, l, d, E, b, T, c, f;
                    for ((t = t || {}).wrap_line_length !== undefined && 0 !== parseInt(t.wrap_line_length, 10) || t.max_char === undefined || 0 === parseInt(t.max_char, 10) || (t.wrap_line_length = t.max_char), r = t.indent_inner_html !== undefined && t.indent_inner_html, i = t.indent_size === undefined ? 4 : parseInt(t.indent_size, 10), m = t.indent_char === undefined ? " " : t.indent_char, s = t.brace_style === undefined ? "collapse" : t.brace_style, a = 0 === parseInt(t.wrap_line_length, 10) ? 32786 : parseInt(t.wrap_line_length || 250, 10), v = t.unformatted || ["a", "span", "img", "bdo", "em", "strong", "dfn", "code", "samp", "kbd", "var", "cite", "abbr", "acronym", "q", "sub", "sup", "tt", "i", "b", "big", "small", "u", "s", "strike", "font", "ins", "del", "address", "pre"], l = t.preserve_newlines === undefined || t.preserve_newlines, d = l ? isNaN(parseInt(t.max_preserve_newlines, 10)) ? 32786 : parseInt(t.max_preserve_newlines, 10) : 0, E = t.indent_handlebars !== undefined && t.indent_handlebars, b = t.wrap_attributes === undefined ? "auto" : t.wrap_attributes, T = t.wrap_attributes_indent_size === undefined ? i : parseInt(t.wrap_attributes_indent_size, 10) || i, c = t.end_with_newline !== undefined && t.end_with_newline, f = Array.isArray(t.extra_liners) ? t.extra_liners.concat() : "string" == typeof t.extra_liners ? t.extra_liners.split(",") : "head,body,/html".split(","), t.indent_with_tabs && (m = "\t", i = 1), (n = new function() {
                            return this.pos = 0, this.token = "", this.current_mode = "CONTENT", this.tags = { parent: "parent1", parentcount: 1, parent1: "" }, this.tag_type = "", this.token_text = this.last_token = this.last_text = this.token_type = "", this.newlines = 0, this.indent_content = r, this.Utils = {
                                whitespace: "\n\r\t ".split(""),
                                single_token: "br,input,link,meta,source,!doctype,basefont,base,area,hr,wbr,param,img,isindex,embed".split(","),
                                extra_liners: f,
                                in_array: function(e, t) {
                                    for (var n = 0; n < t.length; n++)
                                        if (e == t[n]) return !0;
                                    return !1
                                }
                            }, this.is_whitespace = function(e) {
                                for (; 0 < e.length; e++)
                                    if (!this.Utils.in_array(e.charAt(0), this.Utils.whitespace)) return !1;
                                return !0
                            }, this.traverse_whitespace = function() { var e = ""; if (e = this.input.charAt(this.pos), this.Utils.in_array(e, this.Utils.whitespace)) { for (this.newlines = 0; this.Utils.in_array(e, this.Utils.whitespace);) l && "\n" == e && this.newlines <= d && (this.newlines += 1), this.pos++, e = this.input.charAt(this.pos); return !0 } return !1 }, this.space_or_wrap = function(e) { this.line_char_count >= this.wrap_line_length ? (this.print_newline(!1, e), this.print_indentation(e)) : (this.line_char_count++, e.push(" ")) }, this.get_content = function() {
                                for (var e = "", t = [];
                                    "<" != this.input.charAt(this.pos);) {
                                    if (this.pos >= this.input.length) return t.length ? t.join("") : ["", "TK_EOF"];
                                    if (this.traverse_whitespace()) this.space_or_wrap(t);
                                    else {
                                        if (E) { var n = this.input.substr(this.pos, 3); if ("{{#" == n || "{{/" == n) break; if ("{{!" == n) return [this.get_tag(), "TK_TAG_HANDLEBARS_COMMENT"]; if ("{{" == this.input.substr(this.pos, 2) && "{{else}}" == this.get_tag(!0)) break }
                                        e = this.input.charAt(this.pos), this.pos++, this.line_char_count++, t.push(e)
                                    }
                                }
                                return t.length ? t.join("") : ""
                            }, this.get_contents_to = function(e) {
                                if (this.pos == this.input.length) return ["", "TK_EOF"];
                                var t = "",
                                    n = new RegExp("</" + e + "\\s*>", "igm");
                                n.lastIndex = this.pos;
                                var r = n.exec(this.input),
                                    i = r ? r.index : this.input.length;
                                return this.pos < i && (t = this.input.substring(this.pos, i), this.pos = i), t
                            }, this.record_tag = function(e) { this.tags[e + "count"] ? this.tags[e + "count"]++ : this.tags[e + "count"] = 1, this.tags[e + this.tags[e + "count"]] = this.indent_level, this.tags[e + this.tags[e + "count"] + "parent"] = this.tags.parent, this.tags.parent = e + this.tags[e + "count"] }, this.retrieve_tag = function(e) {
                                if (this.tags[e + "count"]) {
                                    for (var t = this.tags.parent; t && e + this.tags[e + "count"] != t;) t = this.tags[t + "parent"];
                                    t && (this.indent_level = this.tags[e + this.tags[e + "count"]], this.tags.parent = this.tags[t + "parent"]), delete this.tags[e + this.tags[e + "count"] + "parent"], delete this.tags[e + this.tags[e + "count"]], 1 == this.tags[e + "count"] ? delete this.tags[e + "count"] : this.tags[e + "count"]--
                                }
                            }, this.indent_to_tag = function(e) {
                                if (this.tags[e + "count"]) {
                                    for (var t = this.tags.parent; t && e + this.tags[e + "count"] != t;) t = this.tags[t + "parent"];
                                    t && (this.indent_level = this.tags[e + this.tags[e + "count"]])
                                }
                            }, this.get_tag = function(e) {
                                var t, n, r = "",
                                    i = [],
                                    a = "",
                                    o = !1,
                                    s = !0,
                                    l = this.pos,
                                    d = this.line_char_count;
                                e = e !== undefined && e;
                                do {
                                    if (this.pos >= this.input.length) return e && (this.pos = l, this.line_char_count = d), i.length ? i.join("") : ["", "TK_EOF"];
                                    if (r = this.input.charAt(this.pos), this.pos++, this.Utils.in_array(r, this.Utils.whitespace)) o = !0;
                                    else {
                                        if ("'" != r && '"' != r || (r += this.get_unformatted(r), o = !0), "=" == r && (o = !1), i.length && "=" != i[i.length - 1] && ">" != r && o) {
                                            if (this.space_or_wrap(i), o = !1, !s && "force" == b && "/" != r) { this.print_newline(!0, i), this.print_indentation(i); for (var c = 0; c < T; c++) i.push(m) }
                                            for (var f = 0; f < i.length; f++)
                                                if (" " == i[f]) { s = !1; break }
                                        }
                                        if (E && "<" == n && r + this.input.charAt(this.pos) == "{{" && (r += this.get_unformatted("}}"), i.length && " " != i[i.length - 1] && "<" != i[i.length - 1] && (r = " " + r), o = !0), "<" != r || n || (t = this.pos - 1, n = "<"), E && !n && 2 <= i.length && "{" == i[i.length - 1] && "{" == i[i.length - 2] && (t = "#" == r || "/" == r || "!" == r ? this.pos - 3 : this.pos - 2, n = "{"), this.line_char_count++, i.push(r), i[1] && ("!" == i[1] || "?" == i[1] || "%" == i[1])) { i = [this.get_comment(t)]; break }
                                        if (E && i[1] && "{" == i[1] && i[2] && "!" == i[2]) { i = [this.get_comment(t)]; break }
                                        if (E && "{" == n && 2 < i.length && "}" == i[i.length - 2] && "}" == i[i.length - 1]) break
                                    }
                                } while (">" != r);
                                var p, u, h = i.join("");
                                p = -1 != h.indexOf(" ") ? h.indexOf(" ") : "{" == h[0] ? h.indexOf("}") : h.indexOf(">"), u = "<" != h[0] && E ? "#" == h[2] ? 3 : 2 : 1;
                                var g = h.substring(u, p).toLowerCase();
                                return "/" == h.charAt(h.length - 2) || this.Utils.in_array(g, this.Utils.single_token) ? e || (this.tag_type = "SINGLE") : E && "{" == h[0] && "else" == g ? e || (this.indent_to_tag("if"), this.tag_type = "HANDLEBARS_ELSE", this.indent_content = !0, this.traverse_whitespace()) : this.is_unformatted(g, v) ? (a = this.get_unformatted("</" + g + ">", h), i.push(a), this.pos, this.tag_type = "SINGLE") : "script" == g && (-1 == h.search("type") || -1 < h.search("type") && -1 < h.search(/\b(text|application)\/(x-)?(javascript|ecmascript|jscript|livescript)/)) ? e || (this.record_tag(g), this.tag_type = "SCRIPT") : "style" == g && (-1 == h.search("type") || -1 < h.search("type") && -1 < h.search("text/css")) ? e || (this.record_tag(g), this.tag_type = "STYLE") : "!" == g.charAt(0) ? e || (this.tag_type = "SINGLE", this.traverse_whitespace()) : e || ("/" == g.charAt(0) ? (this.retrieve_tag(g.substring(1)), this.tag_type = "END") : (this.record_tag(g), "html" != g.toLowerCase() && (this.indent_content = !0), this.tag_type = "START"), this.traverse_whitespace() && this.space_or_wrap(i), this.Utils.in_array(g, this.Utils.extra_liners) && (this.print_newline(!1, this.output), this.output.length && "\n" != this.output[this.output.length - 2] && this.print_newline(!0, this.output))), e && (this.pos = l, this.line_char_count = d), i.join("")
                            }, this.get_comment = function(e) {
                                var t = "",
                                    n = ">",
                                    r = !1;
                                this.pos = e;
                                var i = this.input.charAt(this.pos);
                                for (this.pos++; this.pos <= this.input.length && ((t += i)[t.length - 1] != n[n.length - 1] || -1 == t.indexOf(n));) !r && t.length < 10 && (0 === t.indexOf("<![if") ? (n = "<![endif]>", r = !0) : 0 === t.indexOf("<![cdata[") ? (n = "]]>", r = !0) : 0 === t.indexOf("<![") ? (n = "]>", r = !0) : 0 === t.indexOf("\x3c!--") ? (n = "--\x3e", r = !0) : 0 === t.indexOf("{{!") ? (n = "}}", r = !0) : 0 === t.indexOf("<?") ? (n = "?>", r = !0) : 0 === t.indexOf("<%") && (n = "%>", r = !0)), i = this.input.charAt(this.pos), this.pos++;
                                return t
                            }, this.get_unformatted = function(e, t) {
                                if (t && -1 != t.toLowerCase().indexOf(e)) return "";
                                var n = "",
                                    r = "",
                                    i = 0,
                                    a = !0;
                                do {
                                    if (this.pos >= this.input.length) return r;
                                    if (n = this.input.charAt(this.pos), this.pos++, this.Utils.in_array(n, this.Utils.whitespace)) { if (!a) { this.line_char_count--; continue } if ("\n" == n || "\r" == n) { r += "\n", this.line_char_count = 0; continue } }
                                    r += n, this.line_char_count++, a = !0, E && "{" == n && r.length && "{" == r[r.length - 2] && (i = (r += this.get_unformatted("}}")).length)
                                } while (-1 == r.toLowerCase().indexOf(e, i));
                                return r
                            }, this.get_token = function() { var e; if ("TK_TAG_SCRIPT" == this.last_token || "TK_TAG_STYLE" == this.last_token) { var t = this.last_token.substr(7); return "string" != typeof(e = this.get_contents_to(t)) ? e : [e, "TK_" + t] } return "CONTENT" == this.current_mode ? "string" != typeof(e = this.get_content()) ? e : [e, "TK_CONTENT"] : "TAG" == this.current_mode ? "string" != typeof(e = this.get_tag()) ? e : [e, "TK_TAG_" + this.tag_type] : void 0 }, this.get_full_indent = function(e) { return (e = this.indent_level + e || 0) < 1 ? "" : new Array(e + 1).join(this.indent_string) }, this.is_unformatted = function(e, t) { if (!this.Utils.in_array(e, t)) return !1; if ("a" != e.toLowerCase() || !this.Utils.in_array("a", t)) return !0; var n = (this.get_tag(!0) || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/); return !(n && !this.Utils.in_array(n, t)) }, this.printer = function(e, t, n, r, i) {
                                this.input = e || "", this.output = [], this.indent_character = t, this.indent_string = "", this.indent_size = n, this.brace_style = i, this.indent_level = 0, this.wrap_line_length = r;
                                for (var a = this.line_char_count = 0; a < this.indent_size; a++) this.indent_string += this.indent_character;
                                this.print_newline = function(e, t) { this.line_char_count = 0, t && t.length && (e || "\n" != t[t.length - 1]) && ("\n" != t[t.length - 1] && (t[t.length - 1] = o(t[t.length - 1])), t.push("\n")) }, this.print_indentation = function(e) { for (var t = 0; t < this.indent_level; t++) e.push(this.indent_string), this.line_char_count += this.indent_string.length }, this.print_token = function(e) { this.is_whitespace(e) && !this.output.length || ((e || "" !== e) && this.output.length && "\n" == this.output[this.output.length - 1] && (this.print_indentation(this.output), e = e.replace(/^\s+/g, "")), this.print_token_raw(e)) }, this.print_token_raw = function(e) {
                                    0 < this.newlines && (e = o(e)), e && "" !== e && (1 < e.length && "\n" == e[e.length - 1] ? (this.output.push(e.slice(0, -1)), this.print_newline(!1, this.output)) : this.output.push(e));
                                    for (var t = 0; t < this.newlines; t++) this.print_newline(0 < t, this.output);
                                    this.newlines = 0
                                }, this.indent = function() { this.indent_level++ }, this.unindent = function() { 0 < this.indent_level && this.indent_level-- }
                            }, this
                        }).printer(e, m, i, a, s);;) {
                        var p = n.get_token();
                        if (n.token_text = p[0], n.token_type = p[1], "TK_EOF" == n.token_type) break;
                        switch (n.token_type) {
                            case "TK_TAG_START":
                                n.print_newline(!1, n.output), n.print_token(n.token_text), n.indent_content && (n.indent(), n.indent_content = !1), n.current_mode = "CONTENT";
                                break;
                            case "TK_TAG_STYLE":
                            case "TK_TAG_SCRIPT":
                                n.print_newline(!1, n.output), n.print_token(n.token_text), n.current_mode = "CONTENT";
                                break;
                            case "TK_TAG_END":
                                if ("TK_CONTENT" == n.last_token && "" === n.last_text) {
                                    var u = n.token_text.match(/\w+/)[0],
                                        h = null;
                                    n.output.length && (h = n.output[n.output.length - 1].match(/(?:<|{{#)\s*(\w+)/)), (null == h || h[1] != u && !n.Utils.in_array(h[1], v)) && n.print_newline(!1, n.output)
                                }
                                n.print_token(n.token_text), n.current_mode = "CONTENT";
                                break;
                            case "TK_TAG_SINGLE":
                                var g = n.token_text.match(/^\s*<([a-z-]+)/i);
                                g && n.Utils.in_array(g[1], v) || n.print_newline(!1, n.output), n.print_token(n.token_text), n.current_mode = "CONTENT";
                                break;
                            case "TK_TAG_HANDLEBARS_ELSE":
                                n.print_token(n.token_text), n.indent_content && (n.indent(), n.indent_content = !1), n.current_mode = "CONTENT";
                                break;
                            case "TK_TAG_HANDLEBARS_COMMENT":
                            case "TK_CONTENT":
                                n.print_token(n.token_text), n.current_mode = "TAG";
                                break;
                            case "TK_STYLE":
                            case "TK_SCRIPT":
                                if ("" !== n.token_text) {
                                    n.print_newline(!1, n.output);
                                    var A, C = n.token_text,
                                        S = 1;
                                    "TK_SCRIPT" == n.token_type ? A = N : "TK_STYLE" == n.token_type && (A = x), "keep" == t.indent_scripts ? S = 0 : "separate" == t.indent_scripts && (S = -n.indent_level);
                                    var R = n.get_full_indent(S);
                                    if (A) C = A(C.replace(/^\s*/, R), t);
                                    else {
                                        var y = C.match(/^\s*/)[0].match(/[^\n\r]*$/)[0].split(n.indent_string).length - 1,
                                            _ = n.get_full_indent(S - y);
                                        C = C.replace(/^\s*/, R).replace(/\r\n|\r|\n/g, "\n" + _).replace(/\s+$/, "")
                                    }
                                    C && (n.print_token_raw(C), n.print_newline(!0, n.output))
                                }
                                n.current_mode = "TAG";
                                break;
                            default:
                                "" !== n.token_text && n.print_token(n.token_text)
                        }
                        n.last_token = n.token_type, n.last_text = n.token_text
                    }
                    var L = n.output.join("").replace(/[\r\n\t ]+$/, "");
                    return c && (L += "\n"), L
                }
            }
        }, Ee.extend(Ee.FE.DEFAULTS, { codeMirror: window.CodeMirror, codeMirrorOptions: { lineNumbers: !0, tabMode: "indent", indentWithTabs: !0, lineWrapping: !0, mode: "text/html", tabSize: 2 }, codeBeautifierOptions: { end_with_newline: !0, indent_inner_html: !0, extra_liners: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "ul", "ol", "table", "dl"], brace_style: "expand", indent_char: "\t", indent_size: 1, wrap_line_length: 0 }, codeViewKeepActiveButtons: ["fullscreen"] }), Ee.FE.PLUGINS.codeView = function(l) {
            var d, c;

            function f() { return l.$box.hasClass("fr-code-view") }

            function p() { return c ? c.getValue() : d.val() }

            function u() { f() && (c && c.setSize(null, l.opts.height ? l.opts.height : "auto"), l.opts.heightMin || l.opts.height ? l.$box.find(".CodeMirror-scroll, .CodeMirror-gutters").css("min-height", l.opts.heightMin || l.opts.height) : l.$box.find(".CodeMirror-scroll, .CodeMirror-gutters").css("min-height", "")) }
            var h, g = !1;

            function m() { f() && l.events.trigger("blur") }

            function v() { f() && g && l.events.trigger("focus") }

            function i(e) {
                d || (! function() {
                    d = Ee('<textarea class="fr-code" tabIndex="-1">'), l.$wp.append(d), d.attr("dir", l.opts.direction), l.$box.hasClass("fr-basic") || (h = Ee('<a data-cmd="html" title="Code View" class="fr-command fr-btn html-switch' + (l.helpers.isMobile() ? "" : " fr-desktop") + '" role="button" tabIndex="-1"><i class="fa fa-code"></i></button>'), l.$box.append(h), l.events.bindClick(l.$box, "a.html-switch", function() { E(!1) }));
                    var e = function() { return !f() };
                    l.events.on("buttons.refresh", e), l.events.on("copy", e, !0), l.events.on("cut", e, !0), l.events.on("paste", e, !0), l.events.on("destroy", b, !0), l.events.on("html.set", function() { f() && E(!0) }), l.events.on("codeView.update", u), l.events.on("form.submit", function() { f() && (l.html.set(p()), l.events.trigger("contentChanged", [], !0)) }, !0)
                }(), !c && l.opts.codeMirror ? ((c = l.opts.codeMirror.fromTextArea(d.get(0), l.opts.codeMirrorOptions)).on("blur", m), c.on("focus", v)) : (l.events.$on(d, "keydown keyup change input", function() { l.opts.height ? this.removeAttribute("rows") : (this.rows = 1, 0 === this.value.length ? this.style.height = "auto" : this.style.height = this.scrollHeight + "px") }), l.events.$on(d, "blur", m), l.events.$on(d, "focus", v))), l.undo.saveStep(), l.html.cleanEmptyTags(), l.html.cleanWhiteTags(!0), l.core.hasFocus() && (l.core.isEmpty() || (l.selection.save(), l.$el.find('.fr-marker[data-type="true"]:first').replaceWith('<span class="fr-tmp fr-sm">F</span>'), l.$el.find('.fr-marker[data-type="false"]:last').replaceWith('<span class="fr-tmp fr-em">F</span>')));
                var t = l.html.get(!1, !0);
                l.$el.find("span.fr-tmp").remove(), l.$box.toggleClass("fr-code-view", !0);
                var n, r, i = !1;
                if (l.core.hasFocus() && (i = !0, l.events.disableBlur(), l.$el.blur()), t = (t = t.replace(/<span class="fr-tmp fr-sm">F<\/span>/, "FROALA-SM")).replace(/<span class="fr-tmp fr-em">F<\/span>/, "FROALA-EM"), l.codeBeautifier && (t = l.codeBeautifier.run(t, l.opts.codeBeautifierOptions)), c) {
                    n = t.indexOf("FROALA-SM"), (r = t.indexOf("FROALA-EM")) < n ? n = r : r -= 9;
                    var a = (t = t.replace(/FROALA-SM/g, "").replace(/FROALA-EM/g, "")).substring(0, n).length - t.substring(0, n).replace(/\n/g, "").length,
                        o = t.substring(0, r).length - t.substring(0, r).replace(/\n/g, "").length;
                    n = t.substring(0, n).length - t.substring(0, t.substring(0, n).lastIndexOf("\n") + 1).length, r = t.substring(0, r).length - t.substring(0, t.substring(0, r).lastIndexOf("\n") + 1).length, c.setSize(null, l.opts.height ? l.opts.height : "auto"), l.opts.heightMin && l.$box.find(".CodeMirror-scroll").css("min-height", l.opts.heightMin), c.setValue(t), g = !i, c.focus(), g = !0, c.setSelection({ line: a, ch: n }, { line: o, ch: r }), c.refresh(), c.clearHistory()
                } else {
                    n = t.indexOf("FROALA-SM"), r = t.indexOf("FROALA-EM") - 9, l.opts.heightMin && d.css("min-height", l.opts.heightMin), l.opts.height && d.css("height", l.opts.height), l.opts.heightMax && d.css("max-height", l.opts.height || l.opts.heightMax), d.val(t.replace(/FROALA-SM/g, "").replace(/FROALA-EM/g, "")).trigger("change");
                    var s = Ee(l.o_doc).scrollTop();
                    g = !i, d.focus(), g = !0, d.get(0).setSelectionRange(n, r), Ee(l.o_doc).scrollTop(s)
                }
                l.$tb.find(" > .fr-command").not(e).filter(function() { return l.opts.codeViewKeepActiveButtons.indexOf(Ee(this).data("cmd")) < 0 }).addClass("fr-disabled").attr("aria-disabled", !0), e.addClass("fr-active").attr("aria-pressed", !0), !l.helpers.isMobile() && l.opts.toolbarInline && l.toolbar.hide()
            }

            function E(e) {
                void 0 === e && (e = !f());
                var t, n, r = l.$tb.find('.fr-command[data-cmd="html"]');
                e ? (l.popups.hideAll(), i(r)) : (l.$box.toggleClass("fr-code-view", !1), t = r, n = p(), l.html.set(n), l.$el.blur(), l.$tb.find(" > .fr-command").not(t).removeClass("fr-disabled").attr("aria-disabled", !1), t.removeClass("fr-active").attr("aria-pressed", !1), l.selection.setAtStart(l.el), l.selection.restore(), l.placeholder.refresh(), l.undo.saveStep())
            }

            function b() { f() && E(!1), c && c.toTextArea(), d.val("").removeData().remove(), d = null, h && (h.remove(), h = null) }
            return { _init: function() { if (!l.$wp) return !1 }, toggle: E, isActive: f, get: p }
        }, Ee.FE.RegisterCommand("html", { title: "Code View", undo: !1, focus: !1, forcedRefresh: !0, toggle: !0, callback: function() { this.codeView.toggle() }, plugin: "codeView" }), Ee.FE.DefineIcon("html", { NAME: "code" }), Ee.extend(Ee.FE.POPUP_TEMPLATES, { "colors.picker": "[_BUTTONS_][_TEXT_COLORS_][_BACKGROUND_COLORS_][_CUSTOM_COLOR_]" }), Ee.extend(Ee.FE.DEFAULTS, { colorsText: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"], colorsBackground: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"], colorsStep: 7, colorsHEXInput: !0, colorsDefaultTab: "text", colorsButtons: ["colorsBack", "|", "-"] }), Ee.FE.PLUGINS.colors = function(g) {
            function t() { g.popups.hide("colors.picker") }

            function a(e) { for (var t = "text" == e ? g.opts.colorsText : g.opts.colorsBackground, n = '<div class="fr-color-set fr-' + e + "-color" + (g.opts.colorsDefaultTab == e || "text" != g.opts.colorsDefaultTab && "background" != g.opts.colorsDefaultTab && "text" == e ? " fr-selected-set" : "") + '">', r = 0; r < t.length; r++) 0 !== r && r % g.opts.colorsStep == 0 && (n += "<br>"), "REMOVE" != t[r] ? n += '<span class="fr-command fr-select-color" style="background: ' + t[r] + ';" tabIndex="-1" aria-selected="false" role="button" data-cmd="' + e + 'Color" data-param1="' + t[r] + '"><span class="fr-sr-only">' + g.language.translate("Color") + " " + t[r] + "&nbsp;&nbsp;&nbsp;</span></span>" : n += '<span class="fr-command fr-select-color" data-cmd="' + e + 'Color" tabIndex="-1" role="button" data-param1="REMOVE" title="' + g.language.translate("Clear Formatting") + '">' + g.icon.create("remove") + '<span class="fr-sr-only">' + g.language.translate("Clear Formatting") + "</span></span>"; return n + "</div>" }

            function i(e) {
                var t, n = g.popups.get("colors.picker"),
                    r = Ee(g.selection.element());
                t = "background" == e ? "background-color" : "color";
                var i = n.find(".fr-" + e + "-color .fr-select-color");
                for (i.find(".fr-selected-color").remove(), i.removeClass("fr-active-item"), i.not('[data-param1="REMOVE"]').attr("aria-selected", !1); r.get(0) != g.el;) {
                    if ("transparent" != r.css(t) && "rgba(0, 0, 0, 0)" != r.css(t)) {
                        var a = n.find(".fr-" + e + '-color .fr-select-color[data-param1="' + g.helpers.RGBToHex(r.css(t)) + '"]');
                        a.append('<span class="fr-selected-color" aria-hidden="true">\uf00c</span>'), a.addClass("fr-active-item").attr("aria-selected", !0);
                        break
                    }
                    r = r.parent()
                }
                var o = n.find(".fr-color-hex-layer input");
                o.length && o.val(g.helpers.RGBToHex(r.css(t))).trigger("change")
            }

            function r(e) { "REMOVE" != e ? g.format.applyStyle("background-color", g.helpers.HEXtoRGB(e)) : g.format.removeStyle("background-color"), t() }

            function o(e) { "REMOVE" != e ? g.format.applyStyle("color", g.helpers.HEXtoRGB(e)) : g.format.removeStyle("color"), t() }
            return {
                showColorsPopup: function() {
                    var e = g.$tb.find('.fr-command[data-cmd="color"]'),
                        t = g.popups.get("colors.picker");
                    if (t || (t = function() {
                            var e, t = '<div class="fr-buttons fr-colors-buttons">';
                            g.opts.toolbarInline && 0 < g.opts.colorsButtons.length && (t += g.button.buildList(g.opts.colorsButtons)), t += (e = '<div class="fr-colors-tabs fr-group">', e += '<span class="fr-colors-tab ' + ("background" == g.opts.colorsDefaultTab ? "" : "fr-selected-tab ") + 'fr-command" tabIndex="-1" role="button" aria-pressed="' + ("background" != g.opts.colorsDefaultTab) + '" data-param1="text" data-cmd="colorChangeSet" title="' + g.language.translate("Text") + '">' + g.language.translate("Text") + "</span>", (e += '<span class="fr-colors-tab ' + ("background" == g.opts.colorsDefaultTab ? "fr-selected-tab " : "") + 'fr-command" tabIndex="-1" role="button" aria-pressed="' + ("background" == g.opts.colorsDefaultTab) + '" data-param1="background" data-cmd="colorChangeSet" title="' + g.language.translate("Background") + '">' + g.language.translate("Background") + "</span>") + "</div></div>");
                            var n = "";
                            g.opts.colorsHEXInput && (n = '<div class="fr-color-hex-layer fr-active fr-layer" id="fr-color-hex-layer-' + g.id + '"><div class="fr-input-line"><input maxlength="7" id="fr-color-hex-layer-text-' + g.id + '" type="text" placeholder="' + g.language.translate("HEX Color") + '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="customColor" tabIndex="2" role="button">' + g.language.translate("OK") + "</button></div></div>");
                            var h, r = { buttons: t, text_colors: a("text"), background_colors: a("background"), custom_color: n },
                                i = g.popups.create("colors.picker", r);
                            return h = i, g.events.on("popup.tab", function(e) {
                                var t = Ee(e.currentTarget);
                                if (!g.popups.isVisible("colors.picker") || !t.is("span")) return !0;
                                var n = e.which,
                                    r = !0;
                                if (Ee.FE.KEYCODE.TAB == n) {
                                    var i = h.find(".fr-buttons");
                                    r = !g.accessibility.focusToolbar(i, !!e.shiftKey)
                                } else if (Ee.FE.KEYCODE.ARROW_UP == n || Ee.FE.KEYCODE.ARROW_DOWN == n || Ee.FE.KEYCODE.ARROW_LEFT == n || Ee.FE.KEYCODE.ARROW_RIGHT == n) {
                                    if (t.is("span.fr-select-color")) {
                                        var a = t.parent().find("span.fr-select-color"),
                                            o = a.index(t),
                                            s = g.opts.colorsStep,
                                            l = Math.floor(a.length / s),
                                            d = o % s,
                                            c = Math.floor(o / s),
                                            f = c * s + d,
                                            p = l * s;
                                        Ee.FE.KEYCODE.ARROW_UP == n ? f = ((f - s) % p + p) % p : Ee.FE.KEYCODE.ARROW_DOWN == n ? f = (f + s) % p : Ee.FE.KEYCODE.ARROW_LEFT == n ? f = ((f - 1) % p + p) % p : Ee.FE.KEYCODE.ARROW_RIGHT == n && (f = (f + 1) % p);
                                        var u = Ee(a.get(f));
                                        g.events.disableBlur(), u.focus(), r = !1
                                    }
                                } else Ee.FE.KEYCODE.ENTER == n && (g.button.exec(t), r = !1);
                                return !1 === r && (e.preventDefault(), e.stopPropagation()), r
                            }, !0), i
                        }()), !t.hasClass("fr-active"))
                        if (g.popups.setContainer("colors.picker", g.$tb), i(t.find(".fr-selected-tab").attr("data-param1")), e.is(":visible")) {
                            var n = e.offset().left + e.outerWidth() / 2,
                                r = e.offset().top + (g.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
                            g.popups.show("colors.picker", n, r, e.outerHeight())
                        } else g.position.forSelection(t), g.popups.show("colors.picker")
                },
                hideColorsPopup: t,
                changeSet: function(e, t) { e.hasClass("fr-selected-tab") || (e.siblings().removeClass("fr-selected-tab").attr("aria-pressed", !1), e.addClass("fr-selected-tab").attr("aria-pressed", !0), e.parents(".fr-popup").find(".fr-color-set").removeClass("fr-selected-set"), e.parents(".fr-popup").find(".fr-color-set.fr-" + t + "-color").addClass("fr-selected-set"), i(t)), g.accessibility.focusPopup(e.parents(".fr-popup")) },
                background: r,
                customColor: function() {
                    var e = g.popups.get("colors.picker"),
                        t = e.find(".fr-color-hex-layer input");
                    if (t.length) { var n = t.val(); "background" == e.find(".fr-selected-tab").attr("data-param1") ? r(n) : o(n) }
                },
                text: o,
                back: function() { g.popups.hide("colors.picker"), g.toolbar.showInline() }
            }
        }, Ee.FE.DefineIcon("colors", { NAME: "tint" }), Ee.FE.RegisterCommand("color", { title: "Colors", undo: !1, focus: !0, refreshOnCallback: !1, popup: !0, callback: function() { this.popups.isVisible("colors.picker") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("colors.picker")) : this.colors.showColorsPopup() }, plugin: "colors" }), Ee.FE.RegisterCommand("textColor", { undo: !0, callback: function(e, t) { this.colors.text(t) } }), Ee.FE.RegisterCommand("backgroundColor", { undo: !0, callback: function(e, t) { this.colors.background(t) } }), Ee.FE.RegisterCommand("colorChangeSet", {
            undo: !1,
            focus: !1,
            callback: function(e, t) {
                var n = this.popups.get("colors.picker").find('.fr-command[data-cmd="' + e + '"][data-param1="' + t + '"]');
                this.colors.changeSet(n, t)
            }
        }), Ee.FE.DefineIcon("colorsBack", { NAME: "arrow-left" }), Ee.FE.RegisterCommand("colorsBack", { title: "Back", undo: !1, focus: !1, back: !0, refreshAfterCallback: !1, callback: function() { this.colors.back() } }), Ee.FE.RegisterCommand("customColor", { title: "OK", undo: !0, callback: function() { this.colors.customColor() } }), Ee.FE.DefineIcon("remove", { NAME: "eraser" }), Ee.extend(Ee.FE.DEFAULTS, { dragInline: !0 }), Ee.FE.PLUGINS.draggable = function(d) {
            function e(e) { return !(!e.originalEvent || !e.originalEvent.target || e.originalEvent.target.nodeType != Node.TEXT_NODE) || (e.target && "A" == e.target.tagName && 1 == e.target.childNodes.length && "IMG" == e.target.childNodes[0].tagName && (e.target = e.target.childNodes[0]), Ee(e.target).hasClass("fr-draggable") ? (d.undo.canDo() || d.undo.saveStep(), d.opts.dragInline ? d.$el.attr("contenteditable", !0) : d.$el.attr("contenteditable", !1), d.opts.toolbarInline && d.toolbar.hide(), Ee(e.target).addClass("fr-dragging"), d.browser.msie || d.browser.edge || d.selection.clear(), void e.originalEvent.dataTransfer.setData("text", "Froala")) : (e.preventDefault(), !1)) }

            function c(e) { return !(e && ("HTML" == e.tagName || "BODY" == e.tagName || d.node.isElement(e))) }

            function f(e, t, n) { d.opts.iframe && (e += d.$iframe.offset().top, t += d.$iframe.offset().left), p.offset().top != e && p.css("top", e), p.offset().left != t && p.css("left", t), p.width() != n && p.css("width", n) }

            function t(e) {
                e.originalEvent.dataTransfer.dropEffect = "move", d.opts.dragInline ? function() {
                    for (var e = null, t = 0; t < Ee.FE.INSTANCES.length; t++)
                        if ((e = Ee.FE.INSTANCES[t].$el.find(".fr-dragging")).length) return e.get(0)
                }() || !d.browser.msie && !d.browser.edge || e.preventDefault() : (e.preventDefault(), function(e) {
                    var t = d.doc.elementFromPoint(e.originalEvent.pageX - d.win.pageXOffset, e.originalEvent.pageY - d.win.pageYOffset);
                    if (!c(t)) {
                        for (var n = 0, r = t; !c(r) && r == t && 0 < e.originalEvent.pageY - d.win.pageYOffset - n;) n++, r = d.doc.elementFromPoint(e.originalEvent.pageX - d.win.pageXOffset, e.originalEvent.pageY - d.win.pageYOffset - n);
                        (!c(r) || p && 0 === d.$el.find(r).length && r != p.get(0)) && (r = null);
                        for (var i = 0, a = t; !c(a) && a == t && e.originalEvent.pageY - d.win.pageYOffset + i < Ee(d.doc).height();) i++, a = d.doc.elementFromPoint(e.originalEvent.pageX - d.win.pageXOffset, e.originalEvent.pageY - d.win.pageYOffset + i);
                        (!c(a) || p && 0 === d.$el.find(a).length && a != p.get(0)) && (a = null), t = null == a && r ? r : a && null == r ? a : a && r ? n < i ? r : a : null
                    }
                    if (Ee(t).hasClass("fr-drag-helper")) return;
                    if (t && !d.node.isBlock(t) && (t = d.node.blockParent(t)), t && 0 <= ["TD", "TH", "TR", "THEAD", "TBODY"].indexOf(t.tagName) && (t = Ee(t).parents("table").get(0)), t && 0 <= ["LI"].indexOf(t.tagName) && (t = Ee(t).parents("UL, OL").get(0)), t && !Ee(t).hasClass("fr-drag-helper")) {
                        var o;
                        p || (Ee.FE.$draggable_helper || (Ee.FE.$draggable_helper = Ee('<div class="fr-drag-helper"></div>')), p = Ee.FE.$draggable_helper, d.events.on("shared.destroy", function() { p.html("").removeData().remove(), p = null }, !0)), o = e.originalEvent.pageY < Ee(t).offset().top + Ee(t).outerHeight() / 2;
                        var s = Ee(t),
                            l = 0;
                        o || 0 !== s.next().length ? (o || (s = s.next()), "before" == p.data("fr-position") && s.is(p.data("fr-tag")) || (0 < s.prev().length && (l = parseFloat(s.prev().css("margin-bottom")) || 0), l = Math.max(l, parseFloat(s.css("margin-top")) || 0), f(s.offset().top - l / 2 - d.$box.offset().top, s.offset().left - d.win.pageXOffset - d.$box.offset().left, s.width()), p.data("fr-position", "before"))) : "after" == p.data("fr-position") && s.is(p.data("fr-tag")) || (l = parseFloat(s.css("margin-bottom")) || 0, f(s.offset().top + Ee(t).height() + l / 2 - d.$box.offset().top, s.offset().left - d.win.pageXOffset - d.$box.offset().left, s.width()), p.data("fr-position", "after")), p.data("fr-tag", s), p.addClass("fr-visible"), p.appendTo(d.$box)
                    } else p && 0 < d.$box.find(p).length && p.removeClass("fr-visible")
                }(e))
            }

            function n(e) { e.originalEvent.dataTransfer.dropEffect = "move", d.opts.dragInline || e.preventDefault() }

            function r(e) {
                d.$el.attr("contenteditable", !0);
                var t = d.$el.find(".fr-dragging");
                p && p.hasClass("fr-visible") && d.$box.find(p).length ? i(e) : t.length && (e.preventDefault(), e.stopPropagation()), p && d.$box.find(p).length && p.removeClass("fr-visible"), t.removeClass("fr-dragging")
            }

            function i(e) {
                for (var t, n, r = 0; r < Ee.FE.INSTANCES.length; r++)
                    if ((t = Ee.FE.INSTANCES[r].$el.find(".fr-dragging")).length) { n = Ee.FE.INSTANCES[r]; break }
                if (t.length) {
                    if (e.preventDefault(), e.stopPropagation(), p && p.hasClass("fr-visible") && d.$box.find(p).length) p.data("fr-tag")[p.data("fr-position")]('<span class="fr-marker"></span>'), p.removeClass("fr-visible");
                    else if (!1 === d.markers.insertAtPoint(e.originalEvent)) return !1;
                    if (t.removeClass("fr-dragging"), !1 === (t = d.events.chainTrigger("element.beforeDrop", t))) return !1;
                    var i = t;
                    if (t.parent().is("A") && 1 == t.parent().get(0).childNodes.length && (i = t.parent()), d.core.isEmpty()) d.events.focus();
                    else d.$el.find(".fr-marker").replaceWith(Ee.FE.MARKERS), d.selection.restore();
                    if (n == d || d.undo.canDo() || d.undo.saveStep(), d.core.isEmpty()) d.$el.html(i);
                    else {
                        var a = d.markers.insert();
                        0 === i.find(a).length ? Ee(a).replaceWith(i) : 0 === t.find(a).length && Ee(a).replaceWith(t), t.after(Ee.FE.MARKERS), d.selection.restore()
                    }
                    return d.popups.hideAll(), d.selection.save(), d.$el.find(d.html.emptyBlockTagsQuery()).not("TD, TH, LI, .fr-inner").not(d.opts.htmlAllowedEmptyTags.join(",")).remove(), d.html.wrap(), d.html.fillEmptyBlocks(), d.selection.restore(), d.undo.saveStep(), d.opts.iframe && d.size.syncIframe(), n != d && (n.popups.hideAll(), n.$el.find(n.html.emptyBlockTagsQuery()).not("TD, TH, LI, .fr-inner").remove(), n.html.wrap(), n.html.fillEmptyBlocks(), n.undo.saveStep(), n.events.trigger("element.dropped"), n.opts.iframe && n.size.syncIframe()), d.events.trigger("element.dropped", [i]), !1
                }
                p && p.removeClass("fr-visible"), d.undo.canDo() || d.undo.saveStep(), setTimeout(function() { d.undo.saveStep() }, 0)
            }

            function a(e) {
                if (e && "DIV" == e.tagName && d.node.hasClass(e, "fr-drag-helper")) e.parentNode.removeChild(e);
                else if (e && e.nodeType == Node.ELEMENT_NODE)
                    for (var t = e.querySelectorAll("div.fr-drag-helper"), n = 0; n < t.length; n++) t[n].parentNode.removeChild(t[n])
            }
            var p;
            return { _init: function() { d.opts.enter == Ee.FE.ENTER_BR && (d.opts.dragInline = !0), d.events.on("dragstart", e, !0), d.events.on("dragover", t, !0), d.events.on("dragenter", n, !0), d.events.on("document.dragend", r, !0), d.events.on("document.drop", r, !0), d.events.on("drop", i, !0), d.events.on("html.processGet", a) } }
        }, Ee.extend(Ee.FE.POPUP_TEMPLATES, { emoticons: "[_BUTTONS_][_EMOTICONS_]" }), Ee.extend(Ee.FE.DEFAULTS, { emoticonsStep: 8, emoticonsSet: [{ code: "1f600", desc: "Grinning face" }, { code: "1f601", desc: "Grinning face with smiling eyes" }, { code: "1f602", desc: "Face with tears of joy" }, { code: "1f603", desc: "Smiling face with open mouth" }, { code: "1f604", desc: "Smiling face with open mouth and smiling eyes" }, { code: "1f605", desc: "Smiling face with open mouth and cold sweat" }, { code: "1f606", desc: "Smiling face with open mouth and tightly-closed eyes" }, { code: "1f607", desc: "Smiling face with halo" }, { code: "1f608", desc: "Smiling face with horns" }, { code: "1f609", desc: "Winking face" }, { code: "1f60a", desc: "Smiling face with smiling eyes" }, { code: "1f60b", desc: "Face savoring delicious food" }, { code: "1f60c", desc: "Relieved face" }, { code: "1f60d", desc: "Smiling face with heart-shaped eyes" }, { code: "1f60e", desc: "Smiling face with sunglasses" }, { code: "1f60f", desc: "Smirking face" }, { code: "1f610", desc: "Neutral face" }, { code: "1f611", desc: "Expressionless face" }, { code: "1f612", desc: "Unamused face" }, { code: "1f613", desc: "Face with cold sweat" }, { code: "1f614", desc: "Pensive face" }, { code: "1f615", desc: "Confused face" }, { code: "1f616", desc: "Confounded face" }, { code: "1f617", desc: "Kissing face" }, { code: "1f618", desc: "Face throwing a kiss" }, { code: "1f619", desc: "Kissing face with smiling eyes" }, { code: "1f61a", desc: "Kissing face with closed eyes" }, { code: "1f61b", desc: "Face with stuck out tongue" }, { code: "1f61c", desc: "Face with stuck out tongue and winking eye" }, { code: "1f61d", desc: "Face with stuck out tongue and tightly-closed eyes" }, { code: "1f61e", desc: "Disappointed face" }, { code: "1f61f", desc: "Worried face" }, { code: "1f620", desc: "Angry face" }, { code: "1f621", desc: "Pouting face" }, { code: "1f622", desc: "Crying face" }, { code: "1f623", desc: "Persevering face" }, { code: "1f624", desc: "Face with look of triumph" }, { code: "1f625", desc: "Disappointed but relieved face" }, { code: "1f626", desc: "Frowning face with open mouth" }, { code: "1f627", desc: "Anguished face" }, { code: "1f628", desc: "Fearful face" }, { code: "1f629", desc: "Weary face" }, { code: "1f62a", desc: "Sleepy face" }, { code: "1f62b", desc: "Tired face" }, { code: "1f62c", desc: "Grimacing face" }, { code: "1f62d", desc: "Loudly crying face" }, { code: "1f62e", desc: "Face with open mouth" }, { code: "1f62f", desc: "Hushed face" }, { code: "1f630", desc: "Face with open mouth and cold sweat" }, { code: "1f631", desc: "Face screaming in fear" }, { code: "1f632", desc: "Astonished face" }, { code: "1f633", desc: "Flushed face" }, { code: "1f634", desc: "Sleeping face" }, { code: "1f635", desc: "Dizzy face" }, { code: "1f636", desc: "Face without mouth" }, { code: "1f637", desc: "Face with medical mask" }], emoticonsButtons: ["emoticonsBack", "|"], emoticonsUseImage: !0 }), Ee.FE.PLUGINS.emoticons = function(m) {
            function i() {
                if (!m.selection.isCollapsed()) return !1;
                var e = m.selection.element(),
                    t = m.selection.endElement();
                if (e && m.node.hasClass(e, "fr-emoticon")) return e;
                if (t && m.node.hasClass(t, "fr-emoticon")) return t;
                var n = m.selection.ranges(0),
                    r = n.startContainer;
                if (r.nodeType == Node.ELEMENT_NODE && 0 < r.childNodes.length && 0 < n.startOffset) { var i = r.childNodes[n.startOffset - 1]; if (m.node.hasClass(i, "fr-emoticon")) return i }
                return !1
            }
            return {
                _init: function() {
                    var e = function() { for (var e = m.el.querySelectorAll(".fr-emoticon:not(.fr-deletable)"), t = 0; t < e.length; t++) e[t].className += " fr-deletable" };
                    e(), m.events.on("html.set", e), m.events.on("keydown", function(e) {
                        if (m.keys.isCharacter(e.which) && m.selection.inEditor()) {
                            var t = m.selection.ranges(0),
                                n = i();
                            m.node.hasClass(n, "fr-emoticon-img") && n && (0 === t.startOffset && m.selection.element() === n ? Ee(n).before(Ee.FE.MARKERS + Ee.FE.INVISIBLE_SPACE) : Ee(n).after(Ee.FE.INVISIBLE_SPACE + Ee.FE.MARKERS), m.selection.restore())
                        }
                    }), m.events.on("keyup", function(e) {
                        for (var t = m.el.querySelectorAll(".fr-emoticon"), n = 0; n < t.length; n++) "undefined" != typeof t[n].textContent && 0 === t[n].textContent.replace(/\u200B/gi, "").length && Ee(t[n]).remove();
                        if (!(e.which >= Ee.FE.KEYCODE.ARROW_LEFT && e.which <= Ee.FE.KEYCODE.ARROW_DOWN)) {
                            var r = i();
                            m.node.hasClass(r, "fr-emoticon-img") && (Ee(r).append(Ee.FE.MARKERS), m.selection.restore())
                        }
                    })
                },
                insert: function(e, t) {
                    var n = i(),
                        r = m.selection.ranges(0);
                    n ? (0 === r.startOffset && m.selection.element() === n ? Ee(n).before(Ee.FE.MARKERS + Ee.FE.INVISIBLE_SPACE) : 0 < r.startOffset && m.selection.element() === n && r.commonAncestorContainer.parentNode.classList.contains("fr-emoticon") && Ee(n).after(Ee.FE.INVISIBLE_SPACE + Ee.FE.MARKERS), m.selection.restore(), m.html.insert('<span class="fr-emoticon fr-deletable' + (t ? " fr-emoticon-img" : "") + '"' + (t ? ' style="background: url(' + t + ');"' : "") + ">" + (t ? "&nbsp;" : e) + "</span>&nbsp;" + Ee.FE.MARKERS, !0)) : m.html.insert('<span class="fr-emoticon fr-deletable' + (t ? " fr-emoticon-img" : "") + '"' + (t ? ' style="background: url(' + t + ');"' : "") + ">" + (t ? "&nbsp;" : e) + "</span>&nbsp;", !0)
                },
                showEmoticonsPopup: function() {
                    var e = m.$tb.find('.fr-command[data-cmd="emoticons"]'),
                        t = m.popups.get("emoticons");
                    if (t || (t = function() {
                            var e = "";
                            m.opts.toolbarInline && 0 < m.opts.emoticonsButtons.length && (e = '<div class="fr-buttons fr-emoticons-buttons">' + m.button.buildList(m.opts.emoticonsButtons) + "</div>");
                            var g, t = { buttons: e, emoticons: function() { for (var e = '<div style="text-align: center">', t = 0; t < m.opts.emoticonsSet.length; t++) 0 !== t && t % m.opts.emoticonsStep == 0 && (e += "<br>"), e += '<span class="fr-command fr-emoticon" tabIndex="-1" data-cmd="insertEmoticon" title="' + m.language.translate(m.opts.emoticonsSet[t].desc) + '" role="button" data-param1="' + m.opts.emoticonsSet[t].code + '">' + (m.opts.emoticonsUseImage ? '<img src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/' + m.opts.emoticonsSet[t].code + '.svg"/>' : "&#x" + m.opts.emoticonsSet[t].code + ";") + '<span class="fr-sr-only">' + m.language.translate(m.opts.emoticonsSet[t].desc) + "&nbsp;&nbsp;&nbsp;</span></span>"; return m.opts.emoticonsUseImage && (e += '<p style="font-size: 12px; text-align: center; padding: 0 5px;">Emoji free by <a class="fr-link" tabIndex="-1" href="http://emojione.com/" target="_blank" rel="nofollow" role="link" aria-label="Open Emoji One website.">Emoji One</a></p>'), e += "</div>" }() },
                                n = m.popups.create("emoticons", t);
                            return m.tooltip.bind(n, ".fr-emoticon"), g = n, m.events.on("popup.tab", function(e) {
                                var t = Ee(e.currentTarget);
                                if (!m.popups.isVisible("emoticons") || !t.is("span, a")) return !0;
                                var n, r, i, a = e.which;
                                if (Ee.FE.KEYCODE.TAB == a) {
                                    if (t.is("span.fr-emoticon") && e.shiftKey || t.is("a") && !e.shiftKey) {
                                        var o = g.find(".fr-buttons");
                                        n = !m.accessibility.focusToolbar(o, !!e.shiftKey)
                                    }
                                    if (!1 !== n) {
                                        var s = g.find("span.fr-emoticon:focus:first, span.fr-emoticon:visible:first, a");
                                        t.is("span.fr-emoticon") && (s = s.not("span.fr-emoticon:not(:focus)")), r = s.index(t), r = e.shiftKey ? ((r - 1) % s.length + s.length) % s.length : (r + 1) % s.length, i = s.get(r), m.events.disableBlur(), i.focus(), n = !1
                                    }
                                } else if (Ee.FE.KEYCODE.ARROW_UP == a || Ee.FE.KEYCODE.ARROW_DOWN == a || Ee.FE.KEYCODE.ARROW_LEFT == a || Ee.FE.KEYCODE.ARROW_RIGHT == a) {
                                    if (t.is("span.fr-emoticon")) {
                                        var l = t.parent().find("span.fr-emoticon");
                                        r = l.index(t);
                                        var d = m.opts.emoticonsStep,
                                            c = Math.floor(l.length / d),
                                            f = r % d,
                                            p = Math.floor(r / d),
                                            u = p * d + f,
                                            h = c * d;
                                        Ee.FE.KEYCODE.ARROW_UP == a ? u = ((u - d) % h + h) % h : Ee.FE.KEYCODE.ARROW_DOWN == a ? u = (u + d) % h : Ee.FE.KEYCODE.ARROW_LEFT == a ? u = ((u - 1) % h + h) % h : Ee.FE.KEYCODE.ARROW_RIGHT == a && (u = (u + 1) % h), i = Ee(l.get(u)), m.events.disableBlur(), i.focus(), n = !1
                                    }
                                } else Ee.FE.KEYCODE.ENTER == a && (t.is("a") ? t[0].click() : m.button.exec(t), n = !1);
                                return !1 === n && (e.preventDefault(), e.stopPropagation()), n
                            }, !0), n
                        }()), !t.hasClass("fr-active")) {
                        m.popups.refresh("emoticons"), m.popups.setContainer("emoticons", m.$tb);
                        var n = e.offset().left + e.outerWidth() / 2,
                            r = e.offset().top + (m.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
                        m.popups.show("emoticons", n, r, e.outerHeight())
                    }
                },
                hideEmoticonsPopup: function() { m.popups.hide("emoticons") },
                back: function() { m.popups.hide("emoticons"), m.toolbar.showInline() }
            }
        }, Ee.FE.DefineIcon("emoticons", { NAME: "smile-o", FA5NAME: "smile" }), Ee.FE.RegisterCommand("emoticons", { title: "Emoticons", undo: !1, focus: !0, refreshOnCallback: !1, popup: !0, callback: function() { this.popups.isVisible("emoticons") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("emoticons")) : this.emoticons.showEmoticonsPopup() }, plugin: "emoticons" }), Ee.FE.RegisterCommand("insertEmoticon", { callback: function(e, t) { this.emoticons.insert("&#x" + t + ";", this.opts.emoticonsUseImage ? "https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/" + t + ".svg" : null), this.emoticons.hideEmoticonsPopup() } }), Ee.FE.DefineIcon("emoticonsBack", { NAME: "arrow-left" }), Ee.FE.RegisterCommand("emoticonsBack", { title: "Back", undo: !1, focus: !1, back: !0, refreshAfterCallback: !1, callback: function() { this.emoticons.back() } }), Ee.extend(Ee.FE.DEFAULTS, { entities: "&quot;&#39;&iexcl;&cent;&pound;&curren;&yen;&brvbar;&sect;&uml;&copy;&ordf;&laquo;&not;&shy;&reg;&macr;&deg;&plusmn;&sup2;&sup3;&acute;&micro;&para;&middot;&cedil;&sup1;&ordm;&raquo;&frac14;&frac12;&frac34;&iquest;&Agrave;&Aacute;&Acirc;&Atilde;&Auml;&Aring;&AElig;&Ccedil;&Egrave;&Eacute;&Ecirc;&Euml;&Igrave;&Iacute;&Icirc;&Iuml;&ETH;&Ntilde;&Ograve;&Oacute;&Ocirc;&Otilde;&Ouml;&times;&Oslash;&Ugrave;&Uacute;&Ucirc;&Uuml;&Yacute;&THORN;&szlig;&agrave;&aacute;&acirc;&atilde;&auml;&aring;&aelig;&ccedil;&egrave;&eacute;&ecirc;&euml;&igrave;&iacute;&icirc;&iuml;&eth;&ntilde;&ograve;&oacute;&ocirc;&otilde;&ouml;&divide;&oslash;&ugrave;&uacute;&ucirc;&uuml;&yacute;&thorn;&yuml;&OElig;&oelig;&Scaron;&scaron;&Yuml;&fnof;&circ;&tilde;&Alpha;&Beta;&Gamma;&Delta;&Epsilon;&Zeta;&Eta;&Theta;&Iota;&Kappa;&Lambda;&Mu;&Nu;&Xi;&Omicron;&Pi;&Rho;&Sigma;&Tau;&Upsilon;&Phi;&Chi;&Psi;&Omega;&alpha;&beta;&gamma;&delta;&epsilon;&zeta;&eta;&theta;&iota;&kappa;&lambda;&mu;&nu;&xi;&omicron;&pi;&rho;&sigmaf;&sigma;&tau;&upsilon;&phi;&chi;&psi;&omega;&thetasym;&upsih;&piv;&ensp;&emsp;&thinsp;&zwnj;&zwj;&lrm;&rlm;&ndash;&mdash;&lsquo;&rsquo;&sbquo;&ldquo;&rdquo;&bdquo;&dagger;&Dagger;&bull;&hellip;&permil;&prime;&Prime;&lsaquo;&rsaquo;&oline;&frasl;&euro;&image;&weierp;&real;&trade;&alefsym;&larr;&uarr;&rarr;&darr;&harr;&crarr;&lArr;&uArr;&rArr;&dArr;&hArr;&forall;&part;&exist;&empty;&nabla;&isin;&notin;&ni;&prod;&sum;&minus;&lowast;&radic;&prop;&infin;&ang;&and;&or;&cap;&cup;&int;&there4;&sim;&cong;&asymp;&ne;&equiv;&le;&ge;&sub;&sup;&nsub;&sube;&supe;&oplus;&otimes;&perp;&sdot;&lceil;&rceil;&lfloor;&rfloor;&lang;&rang;&loz;&spades;&clubs;&hearts;&diams;" }), Ee.FE.PLUGINS.entities = function(i) {
            var a, o;

            function r(e) {
                var t = e.textContent;
                if (t.match(a)) {
                    for (var n = "", r = 0; r < t.length; r++) o[t[r]] ? n += o[t[r]] : n += t[r];
                    e.textContent = n
                }
            }

            function s(e) {
                if (e && 0 <= ["STYLE", "SCRIPT", "svg", "IFRAME"].indexOf(e.tagName)) return !0;
                for (var t = i.node.contents(e), n = 0; n < t.length; n++) t[n].nodeType == Node.TEXT_NODE ? r(t[n]) : s(t[n]);
                e.nodeType == Node.TEXT_NODE && r(e)
            }

            function l(e) { return 0 === e.length ? "" : i.clean.exec(e, s).replace(/\&amp;/g, "&") }
            return {
                _init: function() {
                    i.opts.htmlSimpleAmpersand || (i.opts.entities = i.opts.entities + "&amp;");
                    var e = Ee("<div>").html(i.opts.entities).text(),
                        t = i.opts.entities.split(";");
                    o = {}, a = "";
                    for (var n = 0; n < e.length; n++) {
                        var r = e.charAt(n);
                        o[r] = t[n] + ";", a += "\\" + r + (n < e.length - 1 ? "|" : "")
                    }
                    a = new RegExp("(" + a + ")", "g"), i.events.on("html.get", l, !0)
                }
            }
        }, Ee.extend(Ee.FE.POPUP_TEMPLATES, { "file.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_PROGRESS_BAR_]" }), Ee.extend(Ee.FE.DEFAULTS, { fileUpload: !0, fileUploadURL: "https://i.froala.com/upload", fileUploadParam: "file", fileUploadParams: {}, fileUploadToS3: !1, fileUploadMethod: "POST", fileMaxSize: 10485760, fileAllowedTypes: ["*"], fileInsertButtons: ["fileBack", "|"], fileUseSelectedText: !1 }), Ee.FE.PLUGINS.file = function(l) {
            var r, d = 2,
                c = 3,
                f = 4,
                s = 5,
                p = 6,
                n = {};

            function u() {
                var e = l.popups.get("file.insert");
                e || (e = A()), e.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), e.find(".fr-file-progress-bar-layer").addClass("fr-active"), e.find(".fr-buttons").hide(), a(l.language.translate("Uploading"), 0)
            }

            function i(e) {
                var t = l.popups.get("file.insert");
                t && (t.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), t.find(".fr-file-progress-bar-layer").removeClass("fr-active"), t.find(".fr-buttons").show(), e && (l.events.focus(), l.popups.hide("file.insert")))
            }

            function a(e, t) {
                var n = l.popups.get("file.insert");
                if (n) {
                    var r = n.find(".fr-file-progress-bar-layer");
                    r.find("h3").text(e + (t ? " " + t + "%" : "")), r.removeClass("fr-error"), t ? (r.find("div").removeClass("fr-indeterminate"), r.find("div > span").css("width", t + "%")) : r.find("div").addClass("fr-indeterminate")
                }
            }

            function h(e, t, n) {
                l.edit.on(), l.events.focus(!0), l.selection.restore(), l.opts.fileUseSelectedText && l.selection.text().length && (t = l.selection.text()), l.html.insert('<a href="' + e + '" target="_blank" id="fr-inserted-file" class="fr-file">' + t + "</a>");
                var r = l.$el.find("#fr-inserted-file");
                r.removeAttr("id"), l.popups.hide("file.insert"), l.undo.saveStep(), C(), l.events.trigger("file.inserted", [r, n])
            }

            function g(e) {
                var t = this.status,
                    n = this.response,
                    r = this.responseXML,
                    i = this.responseText;
                try {
                    if (l.opts.fileUploadToS3)
                        if (201 == t) {
                            var a = function(e) {
                                try {
                                    var t = Ee(e).find("Location").text(),
                                        n = Ee(e).find("Key").text();
                                    return !1 === l.events.trigger("file.uploadedToS3", [t, n, e], !0) ? (l.edit.on(), !1) : t
                                } catch (r) { return E(f, e), !1 }
                            }(r);
                            a && h(a, e, n || r)
                        } else E(f, n || r);
                    else if (200 <= t && t < 300) {
                        var o = function(e) { try { if (!1 === l.events.trigger("file.uploaded", [e], !0)) return l.edit.on(), !1; var t = JSON.parse(e); return t.link ? t : (E(d, e), !1) } catch (n) { return E(f, e), !1 } }(i);
                        o && h(o.link, e, n || i)
                    } else E(c, n || i)
                } catch (s) { E(f, n || i) }
            }

            function m() { E(f, this.response || this.responseText || this.responseXML) }

            function v(e) {
                if (e.lengthComputable) {
                    var t = e.loaded / e.total * 100 | 0;
                    a(l.language.translate("Uploading"), t)
                }
            }

            function E(e, t) {
                l.edit.on(),
                    function(e) {
                        u();
                        var t = l.popups.get("file.insert").find(".fr-file-progress-bar-layer");
                        t.addClass("fr-error");
                        var n = t.find("h3");
                        n.text(e), l.events.disableBlur(), n.focus()
                    }(l.language.translate("Something went wrong. Please try again.")), l.events.trigger("file.error", [{ code: e, message: n[e] }, t])
            }

            function b() { l.edit.on(), i(!0) }

            function o(e) {
                if (void 0 !== e && 0 < e.length) {
                    if (!1 === l.events.trigger("file.beforeUpload", [e])) return !1;
                    var t, n = e[0];
                    if (n.size > l.opts.fileMaxSize) return E(s), !1;
                    if (l.opts.fileAllowedTypes.indexOf("*") < 0 && l.opts.fileAllowedTypes.indexOf(n.type.replace(/file\//g, "")) < 0) return E(p), !1;
                    if (l.drag_support.formdata && (t = l.drag_support.formdata ? new FormData : null), t) {
                        var r;
                        if (!1 !== l.opts.fileUploadToS3)
                            for (r in t.append("key", l.opts.fileUploadToS3.keyStart + (new Date).getTime() + "-" + (n.name || "untitled")), t.append("success_action_status", "201"), t.append("X-Requested-With", "xhr"), t.append("Content-Type", n.type), l.opts.fileUploadToS3.params) l.opts.fileUploadToS3.params.hasOwnProperty(r) && t.append(r, l.opts.fileUploadToS3.params[r]);
                        for (r in l.opts.fileUploadParams) l.opts.fileUploadParams.hasOwnProperty(r) && t.append(r, l.opts.fileUploadParams[r]);
                        t.append(l.opts.fileUploadParam, n);
                        var i = l.opts.fileUploadURL;
                        l.opts.fileUploadToS3 && (i = l.opts.fileUploadToS3.uploadURL ? l.opts.fileUploadToS3.uploadURL : "https://" + l.opts.fileUploadToS3.region + ".amazonaws.com/" + l.opts.fileUploadToS3.bucket);
                        var a = l.core.getXHR(i, l.opts.fileUploadMethod);
                        a.onload = function() { g.call(a, n.name) }, a.onerror = m, a.upload.onprogress = v, a.onabort = b, u();
                        var o = l.popups.get("file.insert");
                        o && o.off("abortUpload").on("abortUpload", function() { 4 != a.readyState && a.abort() }), a.send(t)
                    }
                }
            }

            function T() { i() }

            function A(e) {
                if (e) return l.popups.onHide("file.insert", T), !0;
                var t;
                l.opts.fileUpload || l.opts.fileInsertButtons.splice(l.opts.fileInsertButtons.indexOf("fileUpload"), 1), t = '<div class="fr-buttons">' + l.button.buildList(l.opts.fileInsertButtons) + "</div>";
                var n = "";
                l.opts.fileUpload && (n = '<div class="fr-file-upload-layer fr-layer fr-active" id="fr-file-upload-layer-' + l.id + '"><strong>' + l.language.translate("Drop file") + "</strong><br>(" + l.language.translate("or click") + ')<div class="fr-form"><input type="file" name="' + l.opts.fileUploadParam + '" accept="/*" tabIndex="-1" aria-labelledby="fr-file-upload-layer-' + l.id + '" role="button"></div></div>');
                var r, i = { buttons: t, upload_layer: n, progress_bar: '<div class="fr-file-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="fileDismissError" tabIndex="2" role="button">OK</button></div></div>' },
                    a = l.popups.create("file.insert", i);
                return r = a, l.events.$on(r, "dragover dragenter", ".fr-file-upload-layer", function() { return Ee(this).addClass("fr-drop"), !1 }, !0), l.events.$on(r, "dragleave dragend", ".fr-file-upload-layer", function() { return Ee(this).removeClass("fr-drop"), !1 }, !0), l.events.$on(r, "drop", ".fr-file-upload-layer", function(e) {
                    e.preventDefault(), e.stopPropagation(), Ee(this).removeClass("fr-drop");
                    var t = e.originalEvent.dataTransfer;
                    t && t.files && (r.data("instance") || l).file.upload(t.files)
                }, !0), l.helpers.isIOS() && l.events.$on(r, "touchstart", '.fr-file-upload-layer input[type="file"]', function() { Ee(this).trigger("click") }), l.events.$on(r, "change", '.fr-file-upload-layer input[type="file"]', function() { this.files && (r.data("instance") || l).file.upload(this.files), Ee(this).val("") }, !0), a
            }

            function e(e) { l.node.hasClass(e, "fr-file") }

            function t(e) {
                var t = e.originalEvent.dataTransfer;
                if (t && t.files && t.files.length) {
                    var n = t.files[0];
                    if (n && "undefined" != typeof n.type) {
                        if (n.type.indexOf("image") < 0) {
                            if (!l.opts.fileUpload) return e.preventDefault(), e.stopPropagation(), !1;
                            l.markers.remove(), l.markers.insertAtPoint(e.originalEvent), l.$el.find(".fr-marker").replaceWith(Ee.FE.MARKERS), l.popups.hideAll();
                            var r = l.popups.get("file.insert");
                            return r || (r = A()), l.popups.setContainer("file.insert", l.$sc), l.popups.show("file.insert", e.originalEvent.pageX, e.originalEvent.pageY), u(), o(t.files), e.preventDefault(), e.stopPropagation(), !1
                        }
                    } else n.type.indexOf("image") < 0 && (e.preventDefault(), e.stopPropagation())
                }
            }

            function C() {
                var e, t = Array.prototype.slice.call(l.el.querySelectorAll("a.fr-file")),
                    n = [];
                for (e = 0; e < t.length; e++) n.push(t[e].getAttribute("href"));
                if (r)
                    for (e = 0; e < r.length; e++) n.indexOf(r[e].getAttribute("href")) < 0 && l.events.trigger("file.unlink", [r[e]]);
                r = t
            }
            return n[1] = "File cannot be loaded from the passed link.", n[d] = "No link in upload response.", n[c] = "Error during file upload.", n[f] = "Parsing response failed.", n[s] = "File is too large.", n[p] = "File file type is invalid.", n[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.", {
                _init: function() {
                    l.events.on("drop", t), l.events.$on(l.$win, "keydown", function(e) {
                        var t = e.which,
                            n = l.popups.get("file.insert");
                        n && t == Ee.FE.KEYCODE.ESC && n.trigger("abortUpload")
                    }), l.events.on("destroy", function() {
                        var e = l.popups.get("file.insert");
                        e && e.trigger("abortUpload")
                    }), l.events.on("link.beforeRemove", e), l.$wp && (C(), l.events.on("contentChanged", C)), A(!0)
                },
                showInsertPopup: function() {
                    var e = l.$tb.find('.fr-command[data-cmd="insertFile"]'),
                        t = l.popups.get("file.insert");
                    if (t || (t = A()), i(), !t.hasClass("fr-active"))
                        if (l.popups.refresh("file.insert"), l.popups.setContainer("file.insert", l.$tb), e.is(":visible")) {
                            var n = e.offset().left + e.outerWidth() / 2,
                                r = e.offset().top + (l.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
                            l.popups.show("file.insert", n, r, e.outerHeight())
                        } else l.position.forSelection(t), l.popups.show("file.insert")
                },
                upload: o,
                insert: h,
                back: function() { l.events.disableBlur(), l.selection.restore(), l.events.enableBlur(), l.popups.hide("file.insert"), l.toolbar.showInline() },
                hideProgressBar: i
            }
        }, Ee.FE.DefineIcon("insertFile", { NAME: "file-o", FA5NAME: "file" }), Ee.FE.RegisterCommand("insertFile", { title: "Upload File", undo: !1, focus: !0, refreshAfterCallback: !1, popup: !0, callback: function() { this.popups.isVisible("file.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("file.insert")) : this.file.showInsertPopup() }, plugin: "file" }), Ee.FE.DefineIcon("fileBack", { NAME: "arrow-left" }), Ee.FE.RegisterCommand("fileBack", { title: "Back", undo: !1, focus: !1, back: !0, refreshAfterCallback: !1, callback: function() { this.file.back() }, refresh: function(e) { this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden")) } }), Ee.FE.RegisterCommand("fileDismissError", { title: "OK", callback: function() { this.file.hideProgressBar(!0) } }), Ee.extend(Ee.FE.DEFAULTS, { fontFamily: { "Arial,Helvetica,sans-serif": "Arial", "Georgia,serif": "Georgia", "Impact,Charcoal,sans-serif": "Impact", "Tahoma,Geneva,sans-serif": "Tahoma", "Times New Roman,Times,serif,-webkit-standard": "Times New Roman", "Verdana,Geneva,sans-serif": "Verdana" }, fontFamilySelection: !1, fontFamilyDefaultSelection: "Font Family" }), Ee.FE.PLUGINS.fontFamily = function(i) {
            function a(e) { var t = e.replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi, "").replace(/"|'| /g, "").split(","); return Ee.grep(t, function(e) { return 0 < e.length }) }

            function o(e, t) {
                for (var n = 0; n < e.length; n++)
                    for (var r = 0; r < t.length; r++)
                        if (e[n].toLowerCase() == t[r].toLowerCase()) return [n, r];
                return null
            }

            function s() {
                var e = a(Ee(i.selection.element()).css("font-family")),
                    t = [];
                for (var n in i.opts.fontFamily)
                    if (i.opts.fontFamily.hasOwnProperty(n)) {
                        var r = o(e, a(n));
                        r && t.push([n, r])
                    }
                return 0 === t.length ? null : (t.sort(function(e, t) { var n = e[1][0] - t[1][0]; return 0 === n ? e[1][1] - t[1][1] : n }), t[0][0])
            }
            return {
                apply: function(e) { i.format.applyStyle("font-family", e) },
                refreshOnShow: function(e, t) {
                    t.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1), t.find('.fr-command[data-param1="' + s() + '"]').addClass("fr-active").attr("aria-selected", !0);
                    var n = t.find(".fr-dropdown-list"),
                        r = t.find(".fr-active").parent();
                    r.length ? n.parent().scrollTop(r.offset().top - n.offset().top - (n.parent().outerHeight() / 2 - r.outerHeight() / 2)) : n.parent().scrollTop(0)
                },
                refresh: function(e) {
                    if (i.opts.fontFamilySelection) {
                        var t = Ee(i.selection.element()).css("font-family").replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi, "").replace(/"|'|/g, "").split(",");
                        e.find("> span").text(i.opts.fontFamily[s()] || t[0] || i.language.translate(i.opts.fontFamilyDefaultSelection))
                    }
                }
            }
        }, Ee.FE.RegisterCommand("fontFamily", {
            type: "dropdown",
            displaySelection: function(e) { return e.opts.fontFamilySelection },
            defaultSelection: function(e) { return e.opts.fontFamilyDefaultSelection },
            displaySelectionWidth: 120,
            html: function() {
                var e = '<ul class="fr-dropdown-list" role="presentation">',
                    t = this.opts.fontFamily;
                for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontFamily" data-param1="' + n + '" style="font-family: ' + n + '" title="' + t[n] + '">' + t[n] + "</a></li>");
                return e += "</ul>"
            },
            title: "Font Family",
            callback: function(e, t) { this.fontFamily.apply(t) },
            refresh: function(e) { this.fontFamily.refresh(e) },
            refreshOnShow: function(e, t) { this.fontFamily.refreshOnShow(e, t) },
            plugin: "fontFamily"
        }), Ee.FE.DefineIcon("fontFamily", { NAME: "font" }), Ee.extend(Ee.FE.DEFAULTS, { fontSize: ["8", "9", "10", "11", "12", "14", "18", "24", "30", "36", "48", "60", "72", "96"], fontSizeSelection: !1, fontSizeDefaultSelection: "12", fontSizeUnit: "px" }), Ee.FE.PLUGINS.fontSize = function(a) {
            return {
                apply: function(e) { a.format.applyStyle("font-size", e) },
                refreshOnShow: function(e, t) {
                    var n = Ee(a.selection.element()).css("font-size");
                    t.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1), t.find('.fr-command[data-param1="' + n + '"]').addClass("fr-active").attr("aria-selected", !0);
                    var r = t.find(".fr-dropdown-list"),
                        i = t.find(".fr-active").parent();
                    i.length ? r.parent().scrollTop(i.offset().top - r.offset().top - (r.parent().outerHeight() / 2 - i.outerHeight() / 2)) : r.parent().scrollTop(0)
                },
                refresh: function(e) {
                    if (a.opts.fontSizeSelection) {
                        var t = a.helpers.getPX(Ee(a.selection.element()).css("font-size"));
                        e.find("> span").text(t)
                    }
                }
            }
        }, Ee.FE.RegisterCommand("fontSize", {
            type: "dropdown",
            title: "Font Size",
            displaySelection: function(e) { return e.opts.fontSizeSelection },
            displaySelectionWidth: 30,
            defaultSelection: function(e) { return e.opts.fontSizeDefaultSelection },
            html: function() {
                for (var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.fontSize, n = 0; n < t.length; n++) {
                    var r = t[n];
                    e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontSize" data-param1="' + r + this.opts.fontSizeUnit + '" title="' + r + '">' + r + "</a></li>"
                }
                return e += "</ul>"
            },
            callback: function(e, t) { this.fontSize.apply(t) },
            refresh: function(e) { this.fontSize.refresh(e) },
            refreshOnShow: function(e, t) { this.fontSize.refreshOnShow(e, t) },
            plugin: "fontSize"
        }), Ee.FE.DefineIcon("fontSize", { NAME: "text-height" }), Ee.extend(Ee.FE.POPUP_TEMPLATES, { "forms.edit": "[_BUTTONS_]", "forms.update": "[_BUTTONS_][_TEXT_LAYER_]" }), Ee.extend(Ee.FE.DEFAULTS, { formEditButtons: ["inputStyle", "inputEdit"], formStyles: { "fr-rounded": "Rounded", "fr-large": "Large" }, formMultipleStyles: !0, formUpdateButtons: ["inputBack", "|"] }), Ee.FE.PLUGINS.forms = function(a) {
            var o;

            function e(e) { e.preventDefault(), a.selection.clear(), Ee(this).data("mousedown", !0) }

            function t(e) { Ee(this).data("mousedown") && (e.stopPropagation(), Ee(this).removeData("mousedown"), l(o = this)), e.preventDefault() }

            function n() { a.$el.find("input, textarea, button").removeData("mousedown") }

            function r() { Ee(this).removeData("mousedown") }

            function s() { return o || null }

            function l(e) {
                var t = a.popups.get("forms.edit");
                t || (t = function() {
                    var e = "";
                    0 < a.opts.formEditButtons.length && (e = '<div class="fr-buttons">' + a.button.buildList(a.opts.formEditButtons) + "</div>");
                    var t = { buttons: e },
                        n = a.popups.create("forms.edit", t);
                    return a.$wp && a.events.$on(a.$wp, "scroll.link-edit", function() { s() && a.popups.isVisible("forms.edit") && l(s()) }), n
                }());
                var n = Ee(o = e);
                a.popups.refresh("forms.edit"), a.popups.setContainer("forms.edit", a.$sc);
                var r = n.offset().left + n.outerWidth() / 2,
                    i = n.offset().top + n.outerHeight();
                a.popups.show("forms.edit", r, i, n.outerHeight())
            }

            function d() {
                var e = a.popups.get("forms.update"),
                    t = s();
                if (t) {
                    var n = Ee(t);
                    n.is("button") ? e.find('input[type="text"][name="text"]').val(n.text()) : e.find('input[type="text"][name="text"]').val(n.attr("placeholder"))
                }
                e.find('input[type="text"][name="text"]').trigger("change")
            }

            function c() { o = null }

            function f(e) {
                if (e) return a.popups.onRefresh("forms.update", d), a.popups.onHide("forms.update", c), !0;
                var t = "";
                1 <= a.opts.formUpdateButtons.length && (t = '<div class="fr-buttons">' + a.button.buildList(a.opts.formUpdateButtons) + "</div>");
                var n = "",
                    r = 0;
                n = '<div class="fr-forms-text-layer fr-layer fr-active">', n += '<div class="fr-input-line"><input name="text" type="text" placeholder="Text" tabIndex="' + ++r + '"></div>';
                var i = { buttons: t, text_layer: n += '<div class="fr-action-buttons"><button class="fr-command fr-submit" data-cmd="updateInput" href="#" tabIndex="' + ++r + '" type="button">' + a.language.translate("Update") + "</button></div></div>" };
                return a.popups.create("forms.update", i)
            }
            return {
                _init: function() { a.events.$on(a.$el, a._mousedown, "input, textarea, button", e), a.events.$on(a.$el, a._mouseup, "input, textarea, button", t), a.events.$on(a.$el, "touchmove", "input, textarea, button", r), a.events.$on(a.$el, a._mouseup, n), a.events.$on(a.$win, a._mouseup, n), f(!0), a.events.$on(a.$el, "submit", "form", function(e) { return e.preventDefault(), !1 }) },
                updateInput: function() {
                    var e = a.popups.get("forms.update"),
                        t = s();
                    if (t) {
                        var n = Ee(t),
                            r = e.find('input[type="text"][name="text"]').val() || "";
                        r.length && (n.is("button") ? n.text(r) : n.attr("placeholder", r)), a.popups.hide("forms.update"), l(t)
                    }
                },
                getInput: s,
                applyStyle: function(e, t, n) {
                    void 0 === t && (t = a.opts.formStyles), void 0 === n && (n = a.opts.formMultipleStyles);
                    var r = s();
                    if (!r) return !1;
                    if (!n) {
                        var i = Object.keys(t);
                        i.splice(i.indexOf(e), 1), Ee(r).removeClass(i.join(" "))
                    }
                    Ee(r).toggleClass(e)
                },
                showUpdatePopup: function() {
                    var e = s();
                    if (e) {
                        var t = Ee(e),
                            n = a.popups.get("forms.update");
                        n || (n = f()), a.popups.isVisible("forms.update") || a.popups.refresh("forms.update"), a.popups.setContainer("forms.update", a.$sc);
                        var r = t.offset().left + t.outerWidth() / 2,
                            i = t.offset().top + t.outerHeight();
                        a.popups.show("forms.update", r, i, t.outerHeight())
                    }
                },
                showEditPopup: l,
                back: function() {
                    a.events.disableBlur(), a.selection.restore(), a.events.enableBlur();
                    var e = s();
                    e && a.$wp && ("BUTTON" == e.tagName && a.selection.restore(), l(e))
                }
            }
        }, Ee.FE.RegisterCommand("updateInput", { undo: !1, focus: !1, title: "Update", callback: function() { this.forms.updateInput() } }), Ee.FE.DefineIcon("inputStyle", { NAME: "magic" }), Ee.FE.RegisterCommand("inputStyle", {
            title: "Style",
            type: "dropdown",
            html: function() {
                var e = '<ul class="fr-dropdown-list">',
                    t = this.opts.formStyles;
                for (var n in t) t.hasOwnProperty(n) && (e += '<li><a class="fr-command" tabIndex="-1" data-cmd="inputStyle" data-param1="' + n + '">' + this.language.translate(t[n]) + "</a></li>");
                return e += "</ul>"
            },
            callback: function(e, t) {
                var n = this.forms.getInput();
                n && (this.forms.applyStyle(t), this.forms.showEditPopup(n))
            },
            refreshOnShow: function(e, t) {
                var n = this.forms.getInput();
                if (n) {
                    var r = Ee(n);
                    t.find(".fr-command").each(function() {
                        var e = Ee(this).data("param1");
                        Ee(this).toggleClass("fr-active", r.hasClass(e))
                    })
                }
            }
        }), Ee.FE.DefineIcon("inputEdit", { NAME: "edit" }), Ee.FE.RegisterCommand("inputEdit", { title: "Edit Button", undo: !1, refreshAfterCallback: !1, callback: function() { this.forms.showUpdatePopup() } }), Ee.FE.DefineIcon("inputBack", { NAME: "arrow-left" }), Ee.FE.RegisterCommand("inputBack", { title: "Back", undo: !1, focus: !1, back: !0, refreshAfterCallback: !1, callback: function() { this.forms.back() } }), Ee.FE.RegisterCommand("updateInput", { undo: !1, focus: !1, title: "Update", callback: function() { this.forms.updateInput() } }), Ee.FE.PLUGINS.fullscreen = function(n) {
            var t, r, i, a;

            function o() { return n.$box.hasClass("fr-fullscreen") }

            function e() {
                if (n.helpers.isIOS() && n.core.hasFocus()) return n.$el.blur(), setTimeout(l, 250), !1;
                t = n.helpers.scrollTop(), n.$box.toggleClass("fr-fullscreen"), Ee("body:first").toggleClass("fr-fullscreen"), n.helpers.isMobile() && (n.$tb.data("parent", n.$tb.parent()), n.$tb.prependTo(n.$box), n.$tb.data("sticky-dummy") && n.$tb.after(n.$tb.data("sticky-dummy"))), r = n.opts.height, i = n.opts.heightMax, a = n.opts.zIndex, n.position.refresh(), n.opts.height = n.o_win.innerHeight - (n.opts.toolbarInline ? 0 : n.$tb.outerHeight()), n.opts.zIndex = 2147483641, n.opts.heightMax = null, n.size.refresh(), n.opts.toolbarInline && n.toolbar.showInline();
                for (var e = n.$box.parent(); !e.is("body:first");) e.data("z-index", e.css("z-index")).data("overflow", e.css("overflow")).css("z-index", "2147483640").css("overflow", "visible"), e = e.parent();
                n.opts.toolbarContainer && n.$box.prepend(n.$tb), n.events.trigger("charCounter.update"), n.events.trigger("codeView.update"), n.$win.trigger("scroll")
            }

            function s() {
                if (n.helpers.isIOS() && n.core.hasFocus()) return n.$el.blur(), setTimeout(l, 250), !1;
                n.$box.toggleClass("fr-fullscreen"), Ee("body:first").toggleClass("fr-fullscreen"), n.$tb.prependTo(n.$tb.data("parent")), n.$tb.data("sticky-dummy") && n.$tb.after(n.$tb.data("sticky-dummy")), n.opts.height = r, n.opts.heightMax = i, n.opts.zIndex = a, n.size.refresh(), Ee(n.o_win).scrollTop(t), n.opts.toolbarInline && n.toolbar.showInline(), n.events.trigger("charCounter.update"), n.opts.toolbarSticky && n.opts.toolbarStickyOffset && (n.opts.toolbarBottom ? n.$tb.css("bottom", n.opts.toolbarStickyOffset).data("bottom", n.opts.toolbarStickyOffset) : n.$tb.css("top", n.opts.toolbarStickyOffset).data("top", n.opts.toolbarStickyOffset));
                for (var e = n.$box.parent(); !e.is("body:first");) e.data("z-index") && (e.css("z-index", ""), e.css("z-index") != e.data("z-index") && e.css("z-index", e.data("z-index")), e.removeData("z-index")), e.data("overflow") ? (e.css("overflow", ""), e.css("overflow") != e.data("overflow") && e.css("overflow", e.data("overflow"))) : e.css("overflow", ""), e.removeData("overflow"), e = e.parent();
                n.opts.toolbarContainer && Ee(n.opts.toolbarContainer).append(n.$tb), Ee(n.o_win).trigger("scroll"), n.events.trigger("codeView.update")
            }

            function l() { o() ? s() : e(), d(n.$tb.find('.fr-command[data-cmd="fullscreen"]')) }

            function d(e) {
                var t = o();
                e.toggleClass("fr-active", t).attr("aria-pressed", t), e.find("> *:not(.fr-sr-only)").replaceWith(t ? n.icon.create("fullscreenCompress") : n.icon.create("fullscreen"))
            }
            return {
                _init: function() {
                    if (!n.$wp) return !1;
                    n.events.$on(Ee(n.o_win), "resize", function() { o() && (s(), e()) }), n.events.on("toolbar.hide", function() { if (o() && n.helpers.isMobile()) return !1 }), n.events.on("position.refresh", function() { if (n.helpers.isIOS()) return !o() }), n.events.on("destroy", function() { o() && s() }, !0)
                },
                toggle: l,
                refresh: d,
                isActive: o
            }
        }, Ee.FE.RegisterCommand("fullscreen", { title: "Fullscreen", undo: !1, focus: !1, accessibilityFocus: !0, forcedRefresh: !0, toggle: !0, callback: function() { this.fullscreen.toggle() }, refresh: function(e) { this.fullscreen.refresh(e) }, plugin: "fullscreen" }), Ee.FE.DefineIcon("fullscreen", { NAME: "expand" }), Ee.FE.DefineIcon("fullscreenCompress", { NAME: "compress" }), Ee.extend(Ee.FE.DEFAULTS, { helpSets: [{ title: "Inline Editor", commands: [{ val: "OSkeyE", desc: "Show the editor" }] }, { title: "Common actions", commands: [{ val: "OSkeyC", desc: "Copy" }, { val: "OSkeyX", desc: "Cut" }, { val: "OSkeyV", desc: "Paste" }, { val: "OSkeyZ", desc: "Undo" }, { val: "OSkeyShift+Z", desc: "Redo" }, { val: "OSkeyK", desc: "Insert Link" }, { val: "OSkeyP", desc: "Insert Image" }] }, { title: "Basic Formatting", commands: [{ val: "OSkeyA", desc: "Select All" }, { val: "OSkeyB", desc: "Bold" }, { val: "OSkeyI", desc: "Italic" }, { val: "OSkeyU", desc: "Underline" }, { val: "OSkeyS", desc: "Strikethrough" }, { val: "OSkey]", desc: "Increase Indent" }, { val: "OSkey[", desc: "Decrease Indent" }] }, { title: "Quote", commands: [{ val: "OSkey'", desc: "Increase quote level" }, { val: "OSkeyShift+'", desc: "Decrease quote level" }] }, { title: "Image / Video", commands: [{ val: "OSkey+", desc: "Resize larger" }, { val: "OSkey-", desc: "Resize smaller" }] }, { title: "Table", commands: [{ val: "Alt+Space", desc: "Select table cell" }, { val: "Shift+Left/Right arrow", desc: "Extend selection one cell" }, { val: "Shift+Up/Down arrow", desc: "Extend selection one row" }] }, { title: "Navigation", commands: [{ val: "OSkey/", desc: "Shortcuts" }, { val: "Alt+F10", desc: "Focus popup / toolbar" }, { val: "Esc", desc: "Return focus to previous position" }] }] }), Ee.FE.PLUGINS.help = function(o) {
            var r, i = "help";
            return {
                _init: function() {},
                show: function() {
                    if (!r) {
                        var e = "<h4>" + o.language.translate("Shortcuts") + "</h4>",
                            t = function() {
                                for (var e = '<div class="fr-help-modal">', t = 0; t < o.opts.helpSets.length; t++) {
                                    var n = o.opts.helpSets[t],
                                        r = "<table>";
                                    r += "<thead><tr><th>" + o.language.translate(n.title) + "</th></tr></thead>", r += "<tbody>";
                                    for (var i = 0; i < n.commands.length; i++) {
                                        var a = n.commands[i];
                                        r += "<tr>", r += "<td>" + o.language.translate(a.desc) + "</td>", r += "<td>" + a.val.replace("OSkey", o.helpers.isMac() ? "&#8984;" : "Ctrl+") + "</td>", r += "</tr>"
                                    }
                                    e += r += "</tbody></table>"
                                }
                                return e += "</div>"
                            }(),
                            n = o.modals.create(i, e, t);
                        r = n.$modal, n.$head, n.$body, o.events.$on(Ee(o.o_win), "resize", function() { o.modals.resize(i) })
                    }
                    o.modals.show(i), o.modals.resize(i)
                },
                hide: function() { o.modals.hide(i) }
            }
        }, Ee.FroalaEditor.DefineIcon("help", { NAME: "question" }), Ee.FE.RegisterShortcut(Ee.FE.KEYCODE.SLASH, "help", null, "/"), Ee.FE.RegisterCommand("help", { title: "Help", icon: "help", undo: !1, focus: !1, modal: !0, callback: function() { this.help.show() }, plugin: "help", showOnMobile: !1 }), Ee.extend(Ee.FE.POPUP_TEMPLATES, { "image.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]", "image.edit": "[_BUTTONS_]", "image.alt": "[_BUTTONS_][_ALT_LAYER_]", "image.size": "[_BUTTONS_][_SIZE_LAYER_]" }), Ee.extend(Ee.FE.DEFAULTS, { imageInsertButtons: ["imageBack", "|", "imageUpload", "imageByURL"], imageEditButtons: ["imageReplace", "imageAlign", "imageCaption", "imageRemove", "|", "imageLink", "linkOpen", "linkEdit", "linkRemove", "-", "imageDisplay", "imageStyle", "imageAlt", "imageSize"], imageAltButtons: ["imageBack", "|"], imageSizeButtons: ["imageBack", "|"], imageUpload: !0, imageUploadURL: "https://i.froala.com/upload", imageCORSProxy: "https://cors-anywhere.froala.com", imageUploadRemoteUrls: !0, imageUploadParam: "file", imageUploadParams: {}, imageUploadToS3: !1, imageUploadMethod: "POST", imageMaxSize: 10485760, imageAllowedTypes: ["jpeg", "jpg", "png", "gif"], imageResize: !0, imageResizeWithPercent: !1, imageRoundPercent: !1, imageDefaultWidth: 300, imageDefaultAlign: "center", imageDefaultDisplay: "block", imageSplitHTML: !1, imageStyles: { "fr-rounded": "Rounded", "fr-bordered": "Bordered", "fr-shadow": "Shadow" }, imageMove: !0, imageMultipleStyles: !0, imageTextNear: !0, imagePaste: !0, imagePasteProcess: !1, imageMinWidth: 16, imageOutputSize: !1, imageDefaultMargin: 5 }), Ee.FE.PLUGINS.image = function(c) {
            var f, l, d, p, s, n, t = !1,
                r = 1,
                u = 2,
                h = 3,
                g = 4,
                o = 5,
                m = 6,
                v = 8,
                i = {};

            function E() {
                var e = c.popups.get("image.insert").find(".fr-image-by-url-layer input");
                e.val(""), f && e.val(f.attr("src")), e.trigger("change")
            }

            function a() {
                var e = c.popups.get("image.edit");
                if (e || (e = x()), e) {
                    var t = me();
                    ve() && (t = t.find(".fr-img-wrap")), c.popups.setContainer("image.edit", c.$sc), c.popups.refresh("image.edit");
                    var n = t.offset().left + t.outerWidth() / 2,
                        r = t.offset().top + t.outerHeight();
                    c.popups.show("image.edit", n, r, t.outerHeight())
                }
            }

            function b() { O() }

            function e() { for (var e, t, n = "IMG" == c.el.tagName ? [c.el] : c.el.querySelectorAll("img"), r = 0; r < n.length; r++) { var i = Ee(n[r]);!c.opts.htmlUntouched && c.opts.useClasses ? ((c.opts.imageDefaultAlign || c.opts.imageDefaultDisplay) && (0 < (t = i).parents(".fr-img-caption").length && (t = t.parents(".fr-img-caption:first")), t.hasClass("fr-dii") || t.hasClass("fr-dib") || (t.addClass("fr-fi" + fe(t)[0]), t.addClass("fr-di" + pe(t)[0]), t.css("margin", ""), t.css("float", ""), t.css("display", ""), t.css("z-index", ""), t.css("position", ""), t.css("overflow", ""), t.css("vertical-align", ""))), c.opts.imageTextNear || (0 < i.parents(".fr-img-caption").length ? i.parents(".fr-img-caption:first").removeClass("fr-dii").addClass("fr-dib") : i.removeClass("fr-dii").addClass("fr-dib"))) : c.opts.htmlUntouched || c.opts.useClasses || (c.opts.imageDefaultAlign || c.opts.imageDefaultDisplay) && (0 < (e = i).parents(".fr-img-caption").length && (e = e.parents(".fr-img-caption:first")), ce(e, e.hasClass("fr-dib") ? "block" : e.hasClass("fr-dii") ? "inline" : null, e.hasClass("fr-fil") ? "left" : e.hasClass("fr-fir") ? "right" : fe(e)), e.removeClass("fr-dib fr-dii fr-fir fr-fil")), c.opts.iframe && i.on("load", c.size.syncIframe) } }

            function T(e) {
                void 0 === e && (e = !0);
                var t, n = Array.prototype.slice.call(c.el.querySelectorAll("img")),
                    r = [];
                for (t = 0; t < n.length; t++)
                    if (r.push(n[t].getAttribute("src")), Ee(n[t]).toggleClass("fr-draggable", c.opts.imageMove), "" === n[t].getAttribute("class") && n[t].removeAttribute("class"), "" === n[t].getAttribute("style") && n[t].removeAttribute("style"), n[t].parentNode && n[t].parentNode.parentNode && c.node.hasClass(n[t].parentNode.parentNode, "fr-img-caption")) {
                        var i = n[t].parentNode.parentNode;
                        c.browser.mozilla || i.setAttribute("contenteditable", !1), i.setAttribute("draggable", !1), i.classList.add("fr-draggable");
                        var a = n[t].nextSibling;
                        a && a.setAttribute("contenteditable", !0)
                    }
                if (s)
                    for (t = 0; t < s.length; t++) r.indexOf(s[t].getAttribute("src")) < 0 && c.events.trigger("image.removed", [Ee(s[t])]);
                if (s && e) { var o = []; for (t = 0; t < s.length; t++) o.push(s[t].getAttribute("src")); for (t = 0; t < n.length; t++) o.indexOf(n[t].getAttribute("src")) < 0 && c.events.trigger("image.loaded", [Ee(n[t])]) }
                s = n
            }

            function A() {
                if (l || function() {
                        var e;
                        c.shared.$image_resizer ? (l = c.shared.$image_resizer, p = c.shared.$img_overlay, c.events.on("destroy", function() { l.removeClass("fr-active").appendTo(Ee("body:first")) }, !0)) : (c.shared.$image_resizer = Ee('<div class="fr-image-resizer"></div>'), l = c.shared.$image_resizer, c.events.$on(l, "mousedown", function(e) { e.stopPropagation() }, !0), c.opts.imageResize && (l.append(C("nw") + C("ne") + C("sw") + C("se")), c.shared.$img_overlay = Ee('<div class="fr-image-overlay"></div>'), p = c.shared.$img_overlay, e = l.get(0).ownerDocument, Ee(e).find("body:first").append(p)));
                        c.events.on("shared.destroy", function() { l.html("").removeData().remove(), l = null, c.opts.imageResize && (p.remove(), p = null) }, !0), c.helpers.isMobile() || c.events.$on(Ee(c.o_win), "resize", function() { f && !f.hasClass("fr-uploading") ? oe(!0) : f && (A(), ue(), N(!1)) });
                        if (c.opts.imageResize) {
                            e = l.get(0).ownerDocument, c.events.$on(l, c._mousedown, ".fr-handler", R), c.events.$on(Ee(e), c._mousemove, y), c.events.$on(Ee(e.defaultView || e.parentWindow), c._mouseup, _), c.events.$on(p, "mouseleave", _);
                            var r = 1,
                                i = null,
                                a = 0;
                            c.events.on("keydown", function(e) {
                                if (f) {
                                    var t = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey,
                                        n = e.which;
                                    (n !== i || 200 < e.timeStamp - a) && (r = 1), (n == Ee.FE.KEYCODE.EQUALS || c.browser.mozilla && n == Ee.FE.KEYCODE.FF_EQUALS) && t && !e.altKey ? r = j.call(this, e, 1, 1, r) : (n == Ee.FE.KEYCODE.HYPHEN || c.browser.mozilla && n == Ee.FE.KEYCODE.FF_HYPHEN) && t && !e.altKey ? r = j.call(this, e, 2, -1, r) : c.keys.ctrlKey(e) || n != Ee.FE.KEYCODE.ENTER || (f.before("<br>"), I(f)), i = n, a = e.timeStamp
                                }
                            }, !0), c.events.on("keyup", function() { r = 1 })
                        }
                    }(), !f) return !1;
                var e = c.$wp || c.$sc;
                e.append(l), l.data("instance", c);
                var t = e.scrollTop() - ("static" != e.css("position") ? e.offset().top : 0),
                    n = e.scrollLeft() - ("static" != e.css("position") ? e.offset().left : 0);
                n -= c.helpers.getPX(e.css("border-left-width")), t -= c.helpers.getPX(e.css("border-top-width")), c.$el.is("img") && c.$sc.is("body") && (n = t = 0);
                var r = me();
                ve() && (r = r.find(".fr-img-wrap")), l.css("top", (c.opts.iframe ? r.offset().top : r.offset().top + t) - 1).css("left", (c.opts.iframe ? r.offset().left : r.offset().left + n) - 1).css("width", r.get(0).getBoundingClientRect().width).css("height", r.get(0).getBoundingClientRect().height).addClass("fr-active")
            }

            function C(e) { return '<div class="fr-handler fr-h' + e + '"></div>' }

            function S(e) { ve() ? f.parents(".fr-img-caption").css("width", e) : f.css("width", e) }

            function R(e) {
                if (!c.core.sameInstance(l)) return !0;
                if (e.preventDefault(), e.stopPropagation(), c.$el.find("img.fr-error").left) return !1;
                c.undo.canDo() || c.undo.saveStep();
                var t = e.pageX || e.originalEvent.touches[0].pageX;
                if ("mousedown" == e.type) {
                    var n = c.$oel.get(0).ownerDocument,
                        r = n.defaultView || n.parentWindow,
                        i = !1;
                    try { i = r.location != r.parent.location && !(r.$ && r.$.FE) } catch (s) {}
                    i && r.frameElement && (t += c.helpers.getPX(Ee(r.frameElement).offset().left) + r.frameElement.clientLeft)
                }(d = Ee(this)).data("start-x", t), d.data("start-width", f.width()), d.data("start-height", f.height());
                var a = f.width();
                if (c.opts.imageResizeWithPercent) {
                    var o = f.parentsUntil(c.$el, c.html.blockTagsQuery()).get(0) || c.el;
                    a = (a / Ee(o).outerWidth() * 100).toFixed(2) + "%"
                }
                S(a), p.show(), c.popups.hideAll(), de()
            }

            function y(e) {
                if (!c.core.sameInstance(l)) return !0;
                var t;
                if (d && f) {
                    if (e.preventDefault(), c.$el.find("img.fr-error").left) return !1;
                    var n = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null);
                    if (!n) return !1;
                    var r = n - d.data("start-x"),
                        i = d.data("start-width");
                    if ((d.hasClass("fr-hnw") || d.hasClass("fr-hsw")) && (r = 0 - r), c.opts.imageResizeWithPercent) {
                        var a = f.parentsUntil(c.$el, c.html.blockTagsQuery()).get(0) || c.el;
                        i = ((i + r) / Ee(a).outerWidth() * 100).toFixed(2), c.opts.imageRoundPercent && (i = Math.round(i)), S(i + "%"), (t = ve() ? (c.helpers.getPX(f.parents(".fr-img-caption").css("width")) / Ee(a).outerWidth() * 100).toFixed(2) : (c.helpers.getPX(f.css("width")) / Ee(a).outerWidth() * 100).toFixed(2)) === i || c.opts.imageRoundPercent || S(t + "%"), f.css("height", "").removeAttr("height")
                    } else i + r >= c.opts.imageMinWidth && (S(i + r), t = ve() ? c.helpers.getPX(f.parents(".fr-img-caption").css("width")) : c.helpers.getPX(f.css("width"))), t !== i + r && S(t), ((f.attr("style") || "").match(/(^height:)|(; *height:)/) || f.attr("height")) && (f.css("height", d.data("start-height") * f.width() / d.data("start-width")), f.removeAttr("height"));
                    A(), c.events.trigger("image.resize", [ge()])
                }
            }

            function _(e) {
                if (!c.core.sameInstance(l)) return !0;
                if (d && f) {
                    if (e && e.stopPropagation(), c.$el.find("img.fr-error").left) return !1;
                    d = null, p.hide(), A(), a(), c.undo.saveStep(), c.events.trigger("image.resizeEnd", [ge()])
                }
            }

            function L(e, t, n) {
                c.edit.on(), f && f.addClass("fr-error"),
                    function(e) {
                        N();
                        var t = c.popups.get("image.insert").find(".fr-image-progress-bar-layer");
                        t.addClass("fr-error");
                        var n = t.find("h3");
                        n.text(e), c.events.disableBlur(), n.focus()
                    }(c.language.translate("Something went wrong. Please try again.")), !f && n && Q(n), c.events.trigger("image.error", [{ code: e, message: i[e] }, t, n])
            }

            function x(e) { if (e) return c.$wp && c.events.$on(c.$wp, "scroll", function() { f && c.popups.isVisible("image.edit") && (c.events.disableBlur(), I(f)) }), !0; var t = ""; if (0 < c.opts.imageEditButtons.length) { t += '<div class="fr-buttons">', t += c.button.buildList(c.opts.imageEditButtons); var n = { buttons: t += "</div>" }; return c.popups.create("image.edit", n) } return !1 }

            function N(e) {
                var t = c.popups.get("image.insert");
                if (t || (t = W()), t.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), t.find(".fr-image-progress-bar-layer").addClass("fr-active"), t.find(".fr-buttons").hide(), f) {
                    var n = me();
                    c.popups.setContainer("image.insert", c.$sc);
                    var r = n.offset().left + n.width() / 2,
                        i = n.offset().top + n.height();
                    c.popups.show("image.insert", r, i, n.outerHeight())
                }
                void 0 === e && w(c.language.translate("Uploading"), 0)
            }

            function O(e) {
                var t = c.popups.get("image.insert");
                if (t && (t.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), t.find(".fr-image-progress-bar-layer").removeClass("fr-active"), t.find(".fr-buttons").show(), e || c.$el.find("img.fr-error").length)) {
                    if (c.events.focus(), c.$el.find("img.fr-error").length && (c.$el.find("img.fr-error").remove(), c.undo.saveStep(), c.undo.run(), c.undo.dropRedo()), !c.$wp && f) {
                        var n = f;
                        oe(!0), c.selection.setAfter(n.get(0)), c.selection.restore()
                    }
                    c.popups.hide("image.insert")
                }
            }

            function w(e, t) {
                var n = c.popups.get("image.insert");
                if (n) {
                    var r = n.find(".fr-image-progress-bar-layer");
                    r.find("h3").text(e + (t ? " " + t + "%" : "")), r.removeClass("fr-error"), t ? (r.find("div").removeClass("fr-indeterminate"), r.find("div > span").css("width", t + "%")) : r.find("div").addClass("fr-indeterminate")
                }
            }

            function I(e) { ae.call(e.get(0)) }

            function D() {
                var e = Ee(this);
                c.popups.hide("image.insert"), e.removeClass("fr-uploading"), e.next().is("br") && e.next().remove(), I(e), c.events.trigger("image.loaded", [e])
            }

            function k(o, e, s, l, d) {
                c.edit.off(), w(c.language.translate("Loading image")), e && (o = c.helpers.sanitizeURL(o));
                var t = new Image;
                t.onload = function() {
                    var e, t;
                    if (l) {
                        c.undo.canDo() || l.hasClass("fr-uploading") || c.undo.saveStep();
                        var n = l.data("fr-old-src");
                        l.data("fr-image-pasted") && (n = null), c.$wp ? ((e = l.clone().removeData("fr-old-src").removeClass("fr-uploading").removeAttr("data-fr-image-pasted")).off("load"), n && l.attr("src", n), l.replaceWith(e)) : e = l;
                        for (var r = e.get(0).attributes, i = 0; i < r.length; i++) {
                            var a = r[i];
                            0 === a.nodeName.indexOf("data-") && e.removeAttr(a.nodeName)
                        }
                        if (void 0 !== s)
                            for (t in s) s.hasOwnProperty(t) && "link" != t && e.attr("data-" + t, s[t]);
                        e.on("load", D), e.attr("src", o), c.edit.on(), T(!1), c.undo.saveStep(), c.events.disableBlur(), c.$el.blur(), c.events.trigger(n ? "image.replaced" : "image.inserted", [e, d])
                    } else e = B(o, s, D), T(!1), c.undo.saveStep(), c.$el.blur(), c.events.trigger("image.inserted", [e, d])
                }, t.onerror = function() { L(r) }, N(c.language.translate("Loading image")), t.src = o
            }

            function F(e) {
                w(c.language.translate("Loading image"));
                var t = this.status,
                    n = this.response,
                    r = this.responseXML,
                    i = this.responseText;
                try {
                    if (c.opts.imageUploadToS3)
                        if (201 == t) {
                            var a = function(e) {
                                try {
                                    var t = Ee(e).find("Location").text(),
                                        n = Ee(e).find("Key").text();
                                    return !1 === c.events.trigger("image.uploadedToS3", [t, n, e], !0) ? (c.edit.on(), !1) : t
                                } catch (r) { return L(g, e), !1 }
                            }(r);
                            a && k(a, !1, [], e, n || r)
                        } else L(g, n || r, e);
                    else if (200 <= t && t < 300) {
                        var o = function(e) { try { if (!1 === c.events.trigger("image.uploaded", [e], !0)) return c.edit.on(), !1; var t = JSON.parse(e); return t.link ? t : (L(u, e), !1) } catch (n) { return L(g, e), !1 } }(i);
                        o && k(o.link, !1, o, e, n || i)
                    } else L(h, n || i, e)
                } catch (s) { L(g, n || i, e) }
            }

            function M() { L(g, this.response || this.responseText || this.responseXML) }

            function $(e) {
                if (e.lengthComputable) {
                    var t = e.loaded / e.total * 100 | 0;
                    w(c.language.translate("Uploading"), t)
                }
            }

            function B(e, t, n) {
                var r, i = "";
                if (t && void 0 !== t)
                    for (r in t) t.hasOwnProperty(r) && "link" != r && (i += " data-" + r + '="' + t[r] + '"');
                var a = c.opts.imageDefaultWidth;
                a && "auto" != a && (a += c.opts.imageResizeWithPercent ? "%" : "px");
                var o = Ee('<img src="' + e + '"' + i + (a ? ' style="width: ' + a + ';"' : "") + ">");
                ce(o, c.opts.imageDefaultDisplay, c.opts.imageDefaultAlign), o.on("load", n), o.on("error", function() { Ee(this).addClass("fr-error"), L(v) }), c.edit.on(), c.events.focus(!0), c.selection.restore(), c.undo.saveStep(), c.opts.imageSplitHTML ? c.markers.split() : c.markers.insert(), c.html.wrap();
                var s = c.$el.find(".fr-marker");
                return s.length ? (s.parent().is("hr") && s.parent().after(s), c.node.isLastSibling(s) && s.parent().hasClass("fr-deletable") && s.insertAfter(s.parent()), s.replaceWith(o)) : c.$el.append(o), c.selection.clear(), o
            }

            function P() { c.edit.on(), O(!0) }

            function K(e, t) {
                if (void 0 !== e && 0 < e.length) {
                    if (!1 === c.events.trigger("image.beforeUpload", [e, t])) return !1;
                    var n, r = e[0];
                    if (r.name || (r.name = (new Date).getTime() + "." + (r.type || "image/jpeg").replace(/image\//g, "")), r.size > c.opts.imageMaxSize) return L(o), !1;
                    if (c.opts.imageAllowedTypes.indexOf(r.type.replace(/image\//g, "")) < 0) return L(m), !1;
                    if (c.drag_support.formdata && (n = c.drag_support.formdata ? new FormData : null), n) {
                        var i;
                        if (!1 !== c.opts.imageUploadToS3)
                            for (i in n.append("key", c.opts.imageUploadToS3.keyStart + (new Date).getTime() + "-" + (r.name || "untitled")), n.append("success_action_status", "201"), n.append("X-Requested-With", "xhr"), n.append("Content-Type", r.type), c.opts.imageUploadToS3.params) c.opts.imageUploadToS3.params.hasOwnProperty(i) && n.append(i, c.opts.imageUploadToS3.params[i]);
                        for (i in c.opts.imageUploadParams) c.opts.imageUploadParams.hasOwnProperty(i) && n.append(i, c.opts.imageUploadParams[i]);
                        n.append(c.opts.imageUploadParam, r, r.name);
                        var a = c.opts.imageUploadURL;
                        c.opts.imageUploadToS3 && (a = c.opts.imageUploadToS3.uploadURL ? c.opts.imageUploadToS3.uploadURL : "https://" + c.opts.imageUploadToS3.region + ".amazonaws.com/" + c.opts.imageUploadToS3.bucket),
                            function(t, n, e, i) {
                                function a() {
                                    var e = Ee(this);
                                    e.off("load"), e.addClass("fr-uploading"), e.next().is("br") && e.next().remove(), c.placeholder.refresh(), I(e), A(), N(), c.edit.off(), t.onload = function() { F.call(t, e) }, t.onerror = M, t.upload.onprogress = $, t.onabort = P, e.off("abortUpload").on("abortUpload", function() { 4 != t.readyState && t.abort() }), t.send(n)
                                }
                                var o = new FileReader;
                                o.addEventListener("load", function() {
                                    var e = o.result;
                                    if (o.result.indexOf("svg+xml") < 0) {
                                        for (var t = atob(o.result.split(",")[1]), n = [], r = 0; r < t.length; r++) n.push(t.charCodeAt(r));
                                        e = window.URL.createObjectURL(new Blob([new Uint8Array(n)], { type: "image/jpeg" }))
                                    }
                                    i ? (i.on("load", a), i.one("error", function() { i.off("load"), i.attr("src", i.data("fr-old-src")), L(v) }), c.edit.on(), c.undo.saveStep(), i.data("fr-old-src", i.attr("src")), i.attr("src", e)) : B(e, null, a)
                                }, !1), o.readAsDataURL(e)
                            }(c.core.getXHR(a, c.opts.imageUploadMethod), n, r, t || f)
                    }
                }
            }

            function U(e) { if (e.is("img") && 0 < e.parents(".fr-img-caption").length) return e.parents(".fr-img-caption") }

            function H(e) {
                var t = e.originalEvent.dataTransfer;
                if (t && t.files && t.files.length) {
                    var n = t.files[0];
                    if (n && n.type && -1 !== n.type.indexOf("image") && 0 <= c.opts.imageAllowedTypes.indexOf(n.type.replace(/image\//g, ""))) {
                        if (!c.opts.imageUpload) return e.preventDefault(), e.stopPropagation(), !1;
                        c.markers.remove(), c.markers.insertAtPoint(e.originalEvent), c.$el.find(".fr-marker").replaceWith(Ee.FE.MARKERS), 0 === c.$el.find(".fr-marker").length && c.selection.setAtEnd(c.el), c.popups.hideAll();
                        var r = c.popups.get("image.insert");
                        r || (r = W()), c.popups.setContainer("image.insert", c.$sc);
                        var i = e.originalEvent.pageX,
                            a = e.originalEvent.pageY;
                        return c.opts.iframe && (a += c.$iframe.offset().top, i += c.$iframe.offset().left), c.popups.show("image.insert", i, a), N(), 0 <= c.opts.imageAllowedTypes.indexOf(n.type.replace(/image\//g, "")) ? (oe(!0), K(t.files)) : L(m), e.preventDefault(), e.stopPropagation(), !1
                    }
                }
            }

            function W(e) {
                if (e) return c.popups.onRefresh("image.insert", E), c.popups.onHide("image.insert", b), !0;
                var t, n = "";
                c.opts.imageUpload || c.opts.imageInsertButtons.splice(c.opts.imageInsertButtons.indexOf("imageUpload"), 1), 1 < c.opts.imageInsertButtons.length && (n = '<div class="fr-buttons">' + c.button.buildList(c.opts.imageInsertButtons) + "</div>");
                var r = c.opts.imageInsertButtons.indexOf("imageUpload"),
                    i = c.opts.imageInsertButtons.indexOf("imageByURL"),
                    a = "";
                0 <= r && (t = " fr-active", 0 <= i && i < r && (t = ""), a = '<div class="fr-image-upload-layer' + t + ' fr-layer" id="fr-image-upload-layer-' + c.id + '"><strong>' + c.language.translate("Drop image") + "</strong><br>(" + c.language.translate("or click") + ')<div class="fr-form"><input type="file" accept="image/' + c.opts.imageAllowedTypes.join(", image/").toLowerCase() + '" tabIndex="-1" aria-labelledby="fr-image-upload-layer-' + c.id + '" role="button"></div></div>');
                var o = "";
                0 <= i && (t = " fr-active", 0 <= r && r < i && (t = ""), o = '<div class="fr-image-by-url-layer' + t + ' fr-layer" id="fr-image-by-url-layer-' + c.id + '"><div class="fr-input-line"><input id="fr-image-by-url-layer-text-' + c.id + '" type="text" placeholder="http://" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertByURL" tabIndex="2" role="button">' + c.language.translate("Insert") + "</button></div></div>");
                var s, l = { buttons: n, upload_layer: a, by_url_layer: o, progress_bar: '<div class="fr-image-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="imageDismissError" tabIndex="2" role="button">OK</button></div></div>' },
                    d = c.popups.create("image.insert", l);
                return c.$wp && c.events.$on(c.$wp, "scroll", function() { f && c.popups.isVisible("image.insert") && ue() }), s = d, c.events.$on(s, "dragover dragenter", ".fr-image-upload-layer", function() { return Ee(this).addClass("fr-drop"), !1 }, !0), c.events.$on(s, "dragleave dragend", ".fr-image-upload-layer", function() { return Ee(this).removeClass("fr-drop"), !1 }, !0), c.events.$on(s, "drop", ".fr-image-upload-layer", function(e) {
                    e.preventDefault(), e.stopPropagation(), Ee(this).removeClass("fr-drop");
                    var t = e.originalEvent.dataTransfer;
                    if (t && t.files) {
                        var n = s.data("instance") || c;
                        n.events.disableBlur(), n.image.upload(t.files), n.events.enableBlur()
                    }
                }, !0), c.helpers.isIOS() && c.events.$on(s, "touchstart", '.fr-image-upload-layer input[type="file"]', function() { Ee(this).trigger("click") }, !0), c.events.$on(s, "change", '.fr-image-upload-layer input[type="file"]', function() {
                    if (this.files) {
                        var e = s.data("instance") || c;
                        e.events.disableBlur(), s.find("input:focus").blur(), e.events.enableBlur(), e.image.upload(this.files, f)
                    }
                    Ee(this).val("")
                }, !0), d
            }

            function z() { f && c.popups.get("image.alt").find("input").val(f.attr("alt") || "").trigger("change") }

            function Y() {
                var e = c.popups.get("image.alt");
                e || (e = G()), O(), c.popups.refresh("image.alt"), c.popups.setContainer("image.alt", c.$sc);
                var t = me();
                ve() && (t = t.find(".fr-img-wrap"));
                var n = t.offset().left + t.outerWidth() / 2,
                    r = t.offset().top + t.outerHeight();
                c.popups.show("image.alt", n, r, t.outerHeight())
            }

            function G(e) {
                if (e) return c.popups.onRefresh("image.alt", z), !0;
                var t = { buttons: '<div class="fr-buttons">' + c.button.buildList(c.opts.imageAltButtons) + "</div>", alt_layer: '<div class="fr-image-alt-layer fr-layer fr-active" id="fr-image-alt-layer-' + c.id + '"><div class="fr-input-line"><input id="fr-image-alt-layer-text-' + c.id + '" type="text" placeholder="' + c.language.translate("Alternate Text") + '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetAlt" tabIndex="2" role="button">' + c.language.translate("Update") + "</button></div></div>" },
                    n = c.popups.create("image.alt", t);
                return c.$wp && c.events.$on(c.$wp, "scroll.image-alt", function() { f && c.popups.isVisible("image.alt") && Y() }), n
            }

            function V() {
                if (f) {
                    var e = c.popups.get("image.size");
                    e.find('input[name="width"]').val(f.get(0).style.width).trigger("change"), e.find('input[name="height"]').val(f.get(0).style.height).trigger("change")
                }
            }

            function X() {
                var e = c.popups.get("image.size");
                e || (e = q()), O(), c.popups.refresh("image.size"), c.popups.setContainer("image.size", c.$sc);
                var t = me();
                ve() && (t = t.find(".fr-img-wrap"));
                var n = t.offset().left + t.outerWidth() / 2,
                    r = t.offset().top + t.outerHeight();
                c.popups.show("image.size", n, r, t.outerHeight())
            }

            function q(e) {
                if (e) return c.popups.onRefresh("image.size", V), !0;
                var t = { buttons: '<div class="fr-buttons">' + c.button.buildList(c.opts.imageSizeButtons) + "</div>", size_layer: '<div class="fr-image-size-layer fr-layer fr-active" id="fr-image-size-layer-' + c.id + '"><div class="fr-image-group"><div class="fr-input-line"><input id="fr-image-size-layer-width-' + c.id + '" type="text" name="width" placeholder="' + c.language.translate("Width") + '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-image-size-layer-height' + c.id + '" type="text" name="height" placeholder="' + c.language.translate("Height") + '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetSize" tabIndex="2" role="button">' + c.language.translate("Update") + "</button></div></div>" },
                    n = c.popups.create("image.size", t);
                return c.$wp && c.events.$on(c.$wp, "scroll.image-size", function() { f && c.popups.isVisible("image.size") && X() }), n
            }

            function j(e, t, n, r) { return e.pageX = t, R.call(this, e), e.pageX = e.pageX + n * Math.floor(Math.pow(1.1, r)), y.call(this, e), _.call(this, e), ++r }

            function Q(e) {
                (e = e || me()) && !1 !== c.events.trigger("image.beforeRemove", [e]) && (c.popups.hideAll(), he(), oe(!0), c.undo.canDo() || c.undo.saveStep(), e.get(0) == c.el ? e.removeAttr("src") : ("A" == e.get(0).parentNode.tagName ? (c.selection.setBefore(e.get(0).parentNode) || c.selection.setAfter(e.get(0).parentNode) || e.parent().after(Ee.FE.MARKERS), Ee(e.get(0).parentNode).remove()) : (c.selection.setBefore(e.get(0)) || c.selection.setAfter(e.get(0)) || e.after(Ee.FE.MARKERS), e.remove()), c.html.fillEmptyBlocks(), c.selection.restore()), c.undo.saveStep())
            }

            function Z(e) { var t = e.which; if (f && (t == Ee.FE.KEYCODE.BACKSPACE || t == Ee.FE.KEYCODE.DELETE)) return e.preventDefault(), e.stopPropagation(), Q(), !1; if (f && t == Ee.FE.KEYCODE.ESC) { var n = f; return oe(!0), c.selection.setAfter(n.get(0)), c.selection.restore(), e.preventDefault(), !1 } if (f && (t == Ee.FE.KEYCODE.ARROW_LEFT || t == Ee.FE.KEYCODE.ARROW_RIGHT)) { var r = f.get(0); return oe(!0), t == Ee.FE.KEYCODE.ARROW_LEFT ? c.selection.setBefore(r) : c.selection.setAfter(r), c.selection.restore(), e.preventDefault(), !1 } return f && t != Ee.FE.KEYCODE.F10 && !c.keys.isBrowserAction(e) ? (e.preventDefault(), e.stopPropagation(), !1) : void 0 }

            function J(e) {
                if (e && "IMG" == e.tagName) {
                    if (c.node.hasClass(e, "fr-uploading") || c.node.hasClass(e, "fr-error") ? e.parentNode.removeChild(e) : c.node.hasClass(e, "fr-draggable") && e.classList.remove("fr-draggable"), e.parentNode && e.parentNode.parentNode && c.node.hasClass(e.parentNode.parentNode, "fr-img-caption")) {
                        var t = e.parentNode.parentNode;
                        t.removeAttribute("contenteditable"), t.removeAttribute("draggable"), t.classList.remove("fr-draggable");
                        var n = e.nextSibling;
                        n && n.removeAttribute("contenteditable")
                    }
                } else if (e && e.nodeType == Node.ELEMENT_NODE)
                    for (var r = e.querySelectorAll("img.fr-uploading, img.fr-error, img.fr-draggable"), i = 0; i < r.length; i++) J(r[i])
            }

            function ee(e) {
                if (!1 === c.events.trigger("image.beforePasteUpload", [e])) return !1;
                f = Ee(e), A(), a(), ue(), N();
                for (var t = atob(Ee(e).attr("src").split(",")[1]), n = [], r = 0; r < t.length; r++) n.push(t.charCodeAt(r));
                K([new Blob([new Uint8Array(n)], { type: Ee(e).attr("src").split(",")[0].replace(/data\:/g, "").replace(/;base64/g, "") })], f)
            }

            function te() {
                c.opts.imagePaste ? c.$el.find("img[data-fr-image-pasted]").each(function(e, n) {
                    if (c.opts.imagePasteProcess) {
                        var t = c.opts.imageDefaultWidth;
                        t && "auto" != t && (t += c.opts.imageResizeWithPercent ? "%" : "px"), Ee(n).css("width", t).removeClass("fr-dii fr-dib fr-fir fr-fil"), ce(Ee(n), c.opts.imageDefaultDisplay, c.opts.imageDefaultAlign)
                    }
                    if (0 === n.src.indexOf("data:")) ee(n);
                    else if (0 === n.src.indexOf("blob:") || 0 === n.src.indexOf("http") && c.opts.imageUploadRemoteUrls && c.opts.imageCORSProxy) {
                        var r = new Image;
                        r.crossOrigin = "Anonymous", r.onload = function() {
                            var e = c.o_doc.createElement("CANVAS"),
                                t = e.getContext("2d");
                            e.height = this.naturalHeight, e.width = this.naturalWidth, t.drawImage(this, 0, 0), n.src = e.toDataURL("image/png"), ee(n)
                        }, r.src = (0 === n.src.indexOf("blob:") ? "" : c.opts.imageCORSProxy + "/") + n.src
                    } else 0 !== n.src.indexOf("http") || 0 === n.src.indexOf("https://mail.google.com/mail") ? (c.selection.save(), Ee(n).remove(), c.selection.restore()) : Ee(n).removeAttr("data-fr-image-pasted")
                }) : c.$el.find("img[data-fr-image-pasted]").remove()
            }

            function ne(e) {
                var t = e.target.result,
                    n = c.opts.imageDefaultWidth;
                n && "auto" != n && (n += c.opts.imageResizeWithPercent ? "%" : "px"), c.undo.saveStep(), c.html.insert('<img data-fr-image-pasted="true" src="' + t + '"' + (n ? ' style="width: ' + n + ';"' : "") + ">");
                var r = c.$el.find('img[data-fr-image-pasted="true"]');
                r && ce(r, c.opts.imageDefaultDisplay, c.opts.imageDefaultAlign), c.events.trigger("paste.after")
            }

            function re(e) {
                if (e && e.clipboardData && e.clipboardData.items) {
                    var t = null;
                    if (e.clipboardData.getData("text/html") || e.clipboardData.getData("text/rtf")) t = e.clipboardData.items[0].getAsFile();
                    else
                        for (var n = 0; n < e.clipboardData.items.length && !(t = e.clipboardData.items[n].getAsFile()); n++);
                    if (t) return r = t, (i = new FileReader).onload = ne, i.readAsDataURL(r), !1
                }
                var r, i
            }

            function ie(e) { return e = e.replace(/<img /gi, '<img data-fr-image-pasted="true" ') }

            function ae(e) {
                if ("false" == Ee(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
                if (e && "touchend" == e.type && n) return !0;
                if (e && c.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), !1;
                for (var t = 0; t < Ee.FE.INSTANCES.length; t++) Ee.FE.INSTANCES[t] != c && Ee.FE.INSTANCES[t].events.trigger("image.hideResizer");
                c.toolbar.disable(), e && (e.stopPropagation(), e.preventDefault()), c.helpers.isMobile() && (c.events.disableBlur(), c.$el.blur(), c.events.enableBlur()), c.opts.iframe && c.size.syncIframe(), f = Ee(this), he(), A(), a(), c.browser.msie || c.selection.clear(), c.helpers.isIOS() && (c.events.disableBlur(), c.$el.blur()), c.button.bulkRefresh(), c.events.trigger("video.hideResizer")
            }

            function oe(e) { f && (se || !0 === e) && (c.toolbar.enable(), l.removeClass("fr-active"), c.popups.hide("image.edit"), f = null, de(), d = null, p && p.hide()) }
            i[r] = "Image cannot be loaded from the passed link.", i[u] = "No link in upload response.", i[h] = "Error during file upload.", i[g] = "Parsing response failed.", i[o] = "File is too large.", i[m] = "Image file type is invalid.", i[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.";
            var se = !(i[v] = "Image file is corrupted.");

            function le() { se = !0 }

            function de() { se = !1 }

            function ce(e, t, n) {!c.opts.htmlUntouched && c.opts.useClasses ? (e.removeClass("fr-fil fr-fir fr-dib fr-dii"), n && e.addClass("fr-fi" + n[0]), t && e.addClass("fr-di" + t[0])) : "inline" == t ? (e.css({ display: "inline-block", verticalAlign: "bottom", margin: c.opts.imageDefaultMargin }), "center" == n ? e.css({ "float": "none", marginBottom: "", marginTop: "", maxWidth: "calc(100% - " + 2 * c.opts.imageDefaultMargin + "px)", textAlign: "center" }) : "left" == n ? e.css({ "float": "left", marginLeft: 0, maxWidth: "calc(100% - " + c.opts.imageDefaultMargin + "px)", textAlign: "left" }) : e.css({ "float": "right", marginRight: 0, maxWidth: "calc(100% - " + c.opts.imageDefaultMargin + "px)", textAlign: "right" })) : "block" == t && (e.css({ display: "block", "float": "none", verticalAlign: "top", margin: c.opts.imageDefaultMargin + "px auto", textAlign: "center" }), "left" == n ? e.css({ marginLeft: 0, textAlign: "left" }) : "right" == n && e.css({ marginRight: 0, textAlign: "right" })) }

            function fe(e) { if (void 0 === e && (e = me()), e) { if (e.hasClass("fr-fil")) return "left"; if (e.hasClass("fr-fir")) return "right"; if (e.hasClass("fr-dib") || e.hasClass("fr-dii")) return "center"; var t = e.css("float"); if (e.css("float", "none"), "block" == e.css("display")) { if (e.css("float", ""), e.css("float") != t && e.css("float", t), 0 === parseInt(e.css("margin-left"), 10)) return "left"; if (0 === parseInt(e.css("margin-right"), 10)) return "right" } else { if (e.css("float", ""), e.css("float") != t && e.css("float", t), "left" == e.css("float")) return "left"; if ("right" == e.css("float")) return "right" } } return "center" }

            function pe(e) { void 0 === e && (e = me()); var t = e.css("float"); return e.css("float", "none"), "block" == e.css("display") ? (e.css("float", ""), e.css("float") != t && e.css("float", t), "block") : (e.css("float", ""), e.css("float") != t && e.css("float", t), "inline") }

            function ue() {
                var e = c.popups.get("image.insert");
                e || (e = W()), c.popups.isVisible("image.insert") || (O(), c.popups.refresh("image.insert"), c.popups.setContainer("image.insert", c.$sc));
                var t = me();
                ve() && (t = t.find(".fr-img-wrap"));
                var n = t.offset().left + t.outerWidth() / 2,
                    r = t.offset().top + t.outerHeight();
                c.popups.show("image.insert", n, r, t.outerHeight(!0))
            }

            function he() {
                if (f) {
                    c.events.disableBlur(), c.selection.clear();
                    var e = c.doc.createRange();
                    e.selectNode(f.get(0)), c.browser.msie && e.collapse(!0), c.selection.get().addRange(e), c.events.enableBlur()
                }
            }

            function ge() { return f }

            function me() { return ve() ? f.parents(".fr-img-caption:first") : f }

            function ve() { return !!f && 0 < f.parents(".fr-img-caption").length }
            return {
                _init: function() {
                    var r;
                    c.events.$on(c.$el, c._mousedown, "IMG" == c.el.tagName ? null : 'img:not([contenteditable="false"])', function(e) {
                        if ("false" == Ee(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
                        c.helpers.isMobile() || c.selection.clear(), t = !0, c.popups.areVisible() && c.events.disableBlur(), c.browser.msie && (c.events.disableBlur(), c.$el.attr("contenteditable", !1)), c.draggable || "touchstart" == e.type || e.preventDefault(), e.stopPropagation()
                    }), c.events.$on(c.$el, c._mouseup, "IMG" == c.el.tagName ? null : 'img:not([contenteditable="false"])', function(e) {
                        if ("false" == Ee(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
                        t && (t = !1, e.stopPropagation(), c.browser.msie && (c.$el.attr("contenteditable", !0), c.events.enableBlur()))
                    }), c.events.on("keyup", function(e) {
                        if (e.shiftKey && "" === c.selection.text().replace(/\n/g, "") && c.keys.isArrow(e.which)) {
                            var t = c.selection.element(),
                                n = c.selection.endElement();
                            t && "IMG" == t.tagName ? I(Ee(t)) : n && "IMG" == n.tagName && I(Ee(n))
                        }
                    }, !0), c.events.on("drop", H), c.events.on("element.beforeDrop", U), c.events.on("mousedown window.mousedown", le), c.events.on("window.touchmove", de), c.events.on("mouseup window.mouseup", function() {
                        if (f) return oe(), !1;
                        de()
                    }), c.events.on("commands.mousedown", function(e) { 0 < e.parents(".fr-toolbar").length && oe() }), c.events.on("blur image.hideResizer commands.undo commands.redo element.dropped", function() { oe(!(t = !1)) }), c.events.on("modals.hide", function() { f && (he(), c.selection.clear()) }), "IMG" == c.el.tagName && c.$el.addClass("fr-view"), c.events.$on(c.$el, c.helpers.isMobile() && !c.helpers.isWindowsPhone() ? "touchend" : "click", "IMG" == c.el.tagName ? null : 'img:not([contenteditable="false"])', ae), c.helpers.isMobile() && (c.events.$on(c.$el, "touchstart", "IMG" == c.el.tagName ? null : 'img:not([contenteditable="false"])', function() { n = !1 }), c.events.$on(c.$el, "touchmove", function() { n = !0 })), c.$wp ? (c.events.on("window.keydown keydown", Z, !0), c.events.on("keyup", function(e) { if (f && e.which == Ee.FE.KEYCODE.ENTER) return !1 }, !0)) : c.events.$on(c.$win, "keydown", Z), c.events.on("toolbar.esc", function() {
                        if (f) {
                            if (c.$wp) c.events.disableBlur(), c.events.focus();
                            else {
                                var e = f;
                                oe(!0), c.selection.setAfter(e.get(0)), c.selection.restore()
                            }
                            return !1
                        }
                    }, !0), c.events.on("toolbar.focusEditor", function() { if (f) return !1 }, !0), c.events.on("window.cut window.copy", function(e) {
                        if (f && c.popups.isVisible("image.edit") && !c.popups.get("image.edit").find(":focus").length) {
                            var t = me();
                            ve() ? (t.before(Ee.FE.START_MARKER), t.after(Ee.FE.END_MARKER), c.selection.restore(), c.paste.saveCopiedText(t.get(0).outerHTML, t.text())) : (he(), c.paste.saveCopiedText(f.get(0).outerHTML, f.attr("alt"))), "copy" == e.type ? setTimeout(function() { I(f) }) : (oe(!0), c.undo.saveStep(), setTimeout(function() { c.undo.saveStep() }, 0))
                        }
                    }, !0), c.browser.msie && c.events.on("keydown", function(e) {
                        if (!c.selection.isCollapsed() || !f) return !0;
                        var t = e.which;
                        t == Ee.FE.KEYCODE.C && c.keys.ctrlKey(e) ? c.events.trigger("window.copy") : t == Ee.FE.KEYCODE.X && c.keys.ctrlKey(e) && c.events.trigger("window.cut")
                    }), c.events.$on(Ee(c.o_win), "keydown", function(e) { var t = e.which; if (f && t == Ee.FE.KEYCODE.BACKSPACE) return e.preventDefault(), !1 }), c.events.$on(c.$win, "keydown", function(e) {
                        var t = e.which;
                        f && f.hasClass("fr-uploading") && t == Ee.FE.KEYCODE.ESC && f.trigger("abortUpload")
                    }), c.events.on("destroy", function() { f && f.hasClass("fr-uploading") && f.trigger("abortUpload") }), c.events.on("paste.before", re), c.events.on("paste.beforeCleanup", ie), c.events.on("paste.after", te), c.events.on("html.set", e), c.events.on("html.inserted", e), e(), c.events.on("destroy", function() { s = [] }), c.events.on("html.processGet", J), c.opts.imageOutputSize && c.events.on("html.beforeGet", function() {
                        r = c.el.querySelectorAll("img");
                        for (var e = 0; e < r.length; e++) {
                            var t = r[e].style.width || Ee(r[e]).width(),
                                n = r[e].style.height || Ee(r[e]).height();
                            t && r[e].setAttribute("width", ("" + t).replace(/px/, "")), n && r[e].setAttribute("height", ("" + n).replace(/px/, ""))
                        }
                    }), c.opts.iframe && c.events.on("image.loaded", c.size.syncIframe), c.$wp && (T(), c.events.on("contentChanged", T)), c.events.$on(Ee(c.o_win), "orientationchange.image", function() { setTimeout(function() { f && I(f) }, 100) }), x(!0), W(!0), q(!0), G(!0), c.events.on("node.remove", function(e) { if ("IMG" == e.get(0).tagName) return Q(e), !1 })
                },
                showInsertPopup: function() {
                    var e = c.$tb.find('.fr-command[data-cmd="insertImage"]'),
                        t = c.popups.get("image.insert");
                    if (t || (t = W()), O(), !t.hasClass("fr-active"))
                        if (c.popups.refresh("image.insert"), c.popups.setContainer("image.insert", c.$tb), e.is(":visible")) {
                            var n = e.offset().left + e.outerWidth() / 2,
                                r = e.offset().top + (c.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
                            c.popups.show("image.insert", n, r, e.outerHeight())
                        } else c.position.forSelection(t), c.popups.show("image.insert")
                },
                showLayer: function(e) {
                    var t, n, r = c.popups.get("image.insert");
                    if (f || c.opts.toolbarInline) {
                        if (f) {
                            var i = me();
                            ve() && (i = i.find(".fr-img-wrap")), n = i.offset().top + i.outerHeight(), t = i.offset().left + i.outerWidth() / 2
                        }
                    } else {
                        var a = c.$tb.find('.fr-command[data-cmd="insertImage"]');
                        t = a.offset().left + a.outerWidth() / 2, n = a.offset().top + (c.opts.toolbarBottom ? 10 : a.outerHeight() - 10)
                    }!f && c.opts.toolbarInline && (n = r.offset().top - c.helpers.getPX(r.css("margin-top")), r.hasClass("fr-above") && (n += r.outerHeight())), r.find(".fr-layer").removeClass("fr-active"), r.find(".fr-" + e + "-layer").addClass("fr-active"), c.popups.show("image.insert", t, n, f ? f.outerHeight() : 0), c.accessibility.focusPopup(r)
                },
                refreshUploadButton: function(e) { c.popups.get("image.insert").find(".fr-image-upload-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0) },
                refreshByURLButton: function(e) { c.popups.get("image.insert").find(".fr-image-by-url-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0) },
                upload: K,
                insertByURL: function() {
                    var e = c.popups.get("image.insert").find(".fr-image-by-url-layer input");
                    if (0 < e.val().length) {
                        N(), w(c.language.translate("Loading image"));
                        var t = e.val();
                        if (c.opts.imageUploadRemoteUrls && c.opts.imageCORSProxy && c.opts.imageUpload) {
                            var n = new XMLHttpRequest;
                            n.onload = function() { 200 == this.status ? K([new Blob([this.response], { type: this.response.type || "image/png" })], f) : L(r) }, n.onerror = function() { k(t, !0, [], f) }, n.open("GET", c.opts.imageCORSProxy + "/" + t, !0), n.responseType = "blob", n.send()
                        } else k(t, !0, [], f);
                        e.val(""), e.blur()
                    }
                },
                align: function(e) {
                    var t = me();
                    t.removeClass("fr-fir fr-fil"), !c.opts.htmlUntouched && c.opts.useClasses ? "left" == e ? t.addClass("fr-fil") : "right" == e && t.addClass("fr-fir") : ce(t, pe(), e), he(), A(), a(), c.selection.clear()
                },
                refreshAlign: function(e) { f && e.find("> *:first").replaceWith(c.icon.create("image-align-" + fe())) },
                refreshAlignOnShow: function(e, t) { f && t.find('.fr-command[data-param1="' + fe() + '"]').addClass("fr-active").attr("aria-selected", !0) },
                display: function(e) {
                    var t = me();
                    t.removeClass("fr-dii fr-dib"), !c.opts.htmlUntouched && c.opts.useClasses ? "inline" == e ? t.addClass("fr-dii") : "block" == e && t.addClass("fr-dib") : ce(t, e, fe()), he(), A(), a(), c.selection.clear()
                },
                refreshDisplayOnShow: function(e, t) { f && t.find('.fr-command[data-param1="' + pe() + '"]').addClass("fr-active").attr("aria-selected", !0) },
                replace: ue,
                back: function() { f ? (c.events.disableBlur(), Ee(".fr-popup input:focus").blur(), I(f)) : (c.events.disableBlur(), c.selection.restore(), c.events.enableBlur(), c.popups.hide("image.insert"), c.toolbar.showInline()) },
                get: ge,
                getEl: me,
                insert: k,
                showProgressBar: N,
                remove: Q,
                hideProgressBar: O,
                applyStyle: function(e, t, n) {
                    if (void 0 === t && (t = c.opts.imageStyles), void 0 === n && (n = c.opts.imageMultipleStyles), !f) return !1;
                    var r = me();
                    if (!n) {
                        var i = Object.keys(t);
                        i.splice(i.indexOf(e), 1), r.removeClass(i.join(" "))
                    }
                    "object" == typeof t[e] ? (r.removeAttr("style"), r.css(t[e].style)) : r.toggleClass(e), I(f)
                },
                showAltPopup: Y,
                showSizePopup: X,
                setAlt: function(e) {
                    if (f) {
                        var t = c.popups.get("image.alt");
                        f.attr("alt", e || t.find("input").val() || ""), t.find("input:focus").blur(), I(f)
                    }
                },
                setSize: function(e, t) {
                    if (f) {
                        var n = c.popups.get("image.size");
                        e = e || n.find('input[name="width"]').val() || "", t = t || n.find('input[name="height"]').val() || "";
                        var r = /^[\d]+((px)|%)*$/g;
                        f.removeAttr("width").removeAttr("height"), e.match(r) ? f.css("width", e) : f.css("width", ""), t.match(r) ? f.css("height", t) : f.css("height", ""), ve() && (f.parent().removeAttr("width").removeAttr("height"), e.match(r) ? f.parent().css("width", e) : f.parent().css("width", ""), t.match(r) ? f.parent().css("height", t) : f.parent().css("height", "")), n.find("input:focus").blur(), I(f)
                    }
                },
                toggleCaption: function() {
                    var e;
                    f && !ve() ? ((e = f).parent().is("a") && (e = f.parent()), e.wrap("<span " + (c.browser.mozilla ? "" : 'contenteditable="false"') + 'class="fr-img-caption ' + f.attr("class") + '" style="' + (f.attr("style") ? f.attr("style") + " " : "") + "width: " + f.width() + 'px;" draggable="false"></span>'), e.wrap('<span class="fr-img-wrap"></span>'), e.after('<span class="fr-inner" contenteditable="true">' + Ee.FE.START_MARKER + "Image caption" + Ee.FE.END_MARKER + "</span>"), f.removeAttr("class").removeAttr("style").removeAttr("width"), oe(!0), c.selection.restore()) : (e = me(), f.insertAfter(e), f.attr("class", e.attr("class").replace("fr-img-caption", "")).attr("style", e.attr("style")), e.remove(), I(f))
                },
                hasCaption: ve,
                exitEdit: oe,
                edit: I
            }
        }, Ee.FE.DefineIcon("insertImage", { NAME: "image" }), Ee.FE.RegisterShortcut(Ee.FE.KEYCODE.P, "insertImage", null, "P"), Ee.FE.RegisterCommand("insertImage", { title: "Insert Image", undo: !1, focus: !0, refreshAfterCallback: !1, popup: !0, callback: function() { this.popups.isVisible("image.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("image.insert")) : this.image.showInsertPopup() }, plugin: "image" }), Ee.FE.DefineIcon("imageUpload", { NAME: "upload" }), Ee.FE.RegisterCommand("imageUpload", { title: "Upload Image", undo: !1, focus: !1, toggle: !0, callback: function() { this.image.showLayer("image-upload") }, refresh: function(e) { this.image.refreshUploadButton(e) } }), Ee.FE.DefineIcon("imageByURL", { NAME: "link" }), Ee.FE.RegisterCommand("imageByURL", { title: "By URL", undo: !1, focus: !1, toggle: !0, callback: function() { this.image.showLayer("image-by-url") }, refresh: function(e) { this.image.refreshByURLButton(e) } }), Ee.FE.RegisterCommand("imageInsertByURL", { title: "Insert Image", undo: !0, refreshAfterCallback: !1, callback: function() { this.image.insertByURL() }, refresh: function(e) { this.image.get() ? e.text(this.language.translate("Replace")) : e.text(this.language.translate("Insert")) } }), Ee.FE.DefineIcon("imageDisplay", { NAME: "star" }), Ee.FE.RegisterCommand("imageDisplay", { title: "Display", type: "dropdown", options: { inline: "Inline", block: "Break Text" }, callback: function(e, t) { this.image.display(t) }, refresh: function(e) { this.opts.imageTextNear || e.addClass("fr-hidden") }, refreshOnShow: function(e, t) { this.image.refreshDisplayOnShow(e, t) } }), Ee.FE.DefineIcon("image-align", { NAME: "align-left" }), Ee.FE.DefineIcon("image-align-left", { NAME: "align-left" }), Ee.FE.DefineIcon("image-align-right", { NAME: "align-right" }), Ee.FE.DefineIcon("image-align-center", { NAME: "align-justify" }), Ee.FE.DefineIcon("imageAlign", { NAME: "align-justify" }), Ee.FE.RegisterCommand("imageAlign", {
            type: "dropdown",
            title: "Align",
            options: { left: "Align Left", center: "None", right: "Align Right" },
            html: function() {
                var e = '<ul class="fr-dropdown-list" role="presentation">',
                    t = Ee.FE.COMMANDS.imageAlign.options;
                for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="imageAlign" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.icon.create("image-align-" + n) + '<span class="fr-sr-only">' + this.language.translate(t[n]) + "</span></a></li>");
                return e += "</ul>"
            },
            callback: function(e, t) { this.image.align(t) },
            refresh: function(e) { this.image.refreshAlign(e) },
            refreshOnShow: function(e, t) { this.image.refreshAlignOnShow(e, t) }
        }), Ee.FE.DefineIcon("imageReplace", { NAME: "exchange", FA5NAME: "exchange-alt" }), Ee.FE.RegisterCommand("imageReplace", { title: "Replace", undo: !1, focus: !1, popup: !0, refreshAfterCallback: !1, callback: function() { this.image.replace() } }), Ee.FE.DefineIcon("imageRemove", { NAME: "trash" }), Ee.FE.RegisterCommand("imageRemove", { title: "Remove", callback: function() { this.image.remove() } }), Ee.FE.DefineIcon("imageBack", { NAME: "arrow-left" }), Ee.FE.RegisterCommand("imageBack", { title: "Back", undo: !1, focus: !1, back: !0, callback: function() { this.image.back() }, refresh: function(e) { this.image.get() || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden")) } }), Ee.FE.RegisterCommand("imageDismissError", { title: "OK", undo: !1, callback: function() { this.image.hideProgressBar(!0) } }), Ee.FE.DefineIcon("imageStyle", { NAME: "magic" }), Ee.FE.RegisterCommand("imageStyle", {
            title: "Style",
            type: "dropdown",
            html: function() {
                var e = '<ul class="fr-dropdown-list" role="presentation">',
                    t = this.opts.imageStyles;
                for (var n in t)
                    if (t.hasOwnProperty(n)) { var r = t[n]; "object" == typeof r && (r = r.title), e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="imageStyle" data-param1="' + n + '">' + this.language.translate(r) + "</a></li>" }
                return e += "</ul>"
            },
            callback: function(e, t) { this.image.applyStyle(t) },
            refreshOnShow: function(e, t) {
                var n = this.image.getEl();
                n && t.find(".fr-command").each(function() {
                    var e = Ee(this).data("param1"),
                        t = n.hasClass(e);
                    Ee(this).toggleClass("fr-active", t).attr("aria-selected", t)
                })
            }
        }), Ee.FE.DefineIcon("imageAlt", { NAME: "info" }), Ee.FE.RegisterCommand("imageAlt", { undo: !1, focus: !1, popup: !0, title: "Alternate Text", callback: function() { this.image.showAltPopup() } }), Ee.FE.RegisterCommand("imageSetAlt", { undo: !0, focus: !1, title: "Update", refreshAfterCallback: !1, callback: function() { this.image.setAlt() } }), Ee.FE.DefineIcon("imageSize", { NAME: "arrows-alt" }), Ee.FE.RegisterCommand("imageSize", { undo: !1, focus: !1, popup: !0, title: "Change Size", callback: function() { this.image.showSizePopup() } }), Ee.FE.RegisterCommand("imageSetSize", { undo: !0, focus: !1, title: "Update", refreshAfterCallback: !1, callback: function() { this.image.setSize() } }), Ee.FE.DefineIcon("imageCaption", { NAME: "commenting", FA5NAME: "comment-alt" }), Ee.FE.RegisterCommand("imageCaption", { undo: !0, focus: !1, title: "Image Caption", refreshAfterCallback: !0, callback: function() { this.image.toggleCaption() }, refresh: function(e) { this.image.get() && e.toggleClass("fr-active", this.image.hasCaption()) } }), Ee.extend(Ee.FE.DEFAULTS, { imageManagerLoadURL: "https://i.froala.com/load-files", imageManagerLoadMethod: "get", imageManagerLoadParams: {}, imageManagerPreloader: null, imageManagerDeleteURL: "", imageManagerDeleteMethod: "post", imageManagerDeleteParams: {}, imageManagerPageSize: 12, imageManagerScrollOffset: 20, imageManagerToggleTags: !0 }), Ee.FE.PLUGINS.imageManager = function(s) {
            var l, d, r, i, a, c, o, f, p, u, h, g = "image_manager",
                e = 10,
                m = 11,
                v = 12,
                E = 13,
                b = 14,
                T = 15,
                A = 21,
                C = 22,
                n = {};

            function S() { var e = Ee(window).outerWidth(); return e < 768 ? 2 : e < 1200 ? 3 : 4 }

            function R() { a.empty(); for (var e = 0; e < h; e++) a.append('<div class="fr-list-column"></div>') }

            function y() { if (p < o.length && (a.outerHeight() <= r.outerHeight() + s.opts.imageManagerScrollOffset || r.scrollTop() + s.opts.imageManagerScrollOffset > a.outerHeight() - r.outerHeight())) { f++; for (var e = s.opts.imageManagerPageSize * (f - 1); e < Math.min(o.length, s.opts.imageManagerPageSize * f); e++) t(o[e]) } }

            function t(i) {
                var a = new Image,
                    o = Ee('<div class="fr-image-container fr-empty fr-image-' + u++ + '" data-loading="' + s.language.translate("Loading") + '.." data-deleting="' + s.language.translate("Deleting") + '..">');
                N(!1), a.onload = function() {
                    o.height(Math.floor(o.width() / a.width * a.height));
                    var n = Ee("<img/>");
                    if (i.thumb) n.attr("src", i.thumb);
                    else {
                        if (D(b, i), !i.url) return D(T, i), !1;
                        n.attr("src", i.url)
                    }
                    if (i.url && n.attr("data-url", i.url), i.tag)
                        if (d.find(".fr-modal-more.fr-not-available").removeClass("fr-not-available"), d.find(".fr-modal-tags").show(), 0 <= i.tag.indexOf(",")) {
                            for (var e = i.tag.split(","), t = 0; t < e.length; t++) e[t] = e[t].trim(), 0 === c.find('a[title="' + e[t] + '"]').length && c.append('<a role="button" title="' + e[t] + '">' + e[t] + "</a>");
                            n.attr("data-tag", e.join())
                        } else 0 === c.find('a[title="' + i.tag.trim() + '"]').length && c.append('<a role="button" title="' + i.tag.trim() + '">' + i.tag.trim() + "</a>"), n.attr("data-tag", i.tag.trim());
                    for (var r in i.name && n.attr("alt", i.name), i) i.hasOwnProperty(r) && "thumb" != r && "url" != r && "tag" != r && n.attr("data-" + r, i[r]);
                    o.append(n).append(Ee(s.icon.create("imageManagerDelete")).addClass("fr-delete-img").attr("title", s.language.translate("Delete"))).append(Ee(s.icon.create("imageManagerInsert")).addClass("fr-insert-img").attr("title", s.language.translate("Insert"))), c.find(".fr-selected-tag").each(function(e, t) { $(n, t.text) || o.hide() }), n.on("load", function() { o.removeClass("fr-empty"), o.height("auto"), p++, x(L(parseInt(n.parent().attr("class").match(/fr-image-(\d+)/)[1], 10) + 1)), N(!1), p % s.opts.imageManagerPageSize == 0 && y() }), s.events.trigger("imageManager.imageLoaded", [n])
                }, a.onerror = function() { p++, o.remove(), x(L(parseInt(o.attr("class").match(/fr-image-(\d+)/)[1], 10) + 1)), D(e, i), p % s.opts.imageManagerPageSize == 0 && y() }, a.src = i.thumb || i.url, _().append(o)
            }

            function _() {
                var r, i;
                return a.find(".fr-list-column").each(function(e, t) {
                    var n = Ee(t);
                    0 === e ? (i = n.outerHeight(), r = n) : n.outerHeight() < i && (i = n.outerHeight(), r = n)
                }), r
            }

            function L(e) {
                e === undefined && (e = 0);
                for (var t = [], n = u - 1; e <= n; n--) {
                    var r = a.find(".fr-image-" + n);
                    r.length && (t.push(r), Ee('<div id="fr-image-hidden-container">').append(r), a.find(".fr-image-" + n).remove())
                }
                return t
            }

            function x(e) { for (var t = e.length - 1; 0 <= t; t--) _().append(e[t]) }

            function N(e) {
                if (e === undefined && (e = !0), !l.is(":visible")) return !0;
                var t = S();
                if (t != h) {
                    h = t;
                    var n = L();
                    R(), x(n)
                }
                s.modals.resize(g), e && y()
            }

            function O(e) {
                var t = {},
                    n = e.data();
                for (var r in n) n.hasOwnProperty(r) && "url" != r && "tag" != r && (t[r] = n[r]);
                return t
            }

            function w(e) {
                var t = Ee(e.currentTarget).siblings("img"),
                    n = l.data("instance") || s,
                    r = l.data("current-image");
                if (s.modals.hide(g), n.image.showProgressBar(), r) r.data("fr-old-src", r.attr("src")), r.trigger("click");
                else {
                    n.events.focus(!0), n.selection.restore();
                    var i = n.position.getBoundingRect(),
                        a = i.left + i.width / 2 + Ee(s.doc).scrollLeft(),
                        o = i.top + i.height + Ee(s.doc).scrollTop();
                    n.popups.setContainer("image.insert", s.$sc), n.popups.show("image.insert", a, o)
                }
                n.image.insert(t.data("url"), !1, O(t), r)
            }

            function I(e) {
                var n = Ee(e.currentTarget).siblings("img"),
                    t = s.language.translate("Are you sure? Image will be deleted.");
                confirm(t) && (s.opts.imageManagerDeleteURL ? !1 !== s.events.trigger("imageManager.beforeDeleteImage", [n]) && (n.parent().addClass("fr-image-deleting"), Ee.ajax({ method: s.opts.imageManagerDeleteMethod, url: s.opts.imageManagerDeleteURL, data: Ee.extend(Ee.extend({ src: n.attr("src") }, O(n)), s.opts.imageManagerDeleteParams), crossDomain: s.opts.requestWithCORS, xhrFields: { withCredentials: s.opts.requestWithCredentials }, headers: s.opts.requestHeaders }).done(function(e) {
                    s.events.trigger("imageManager.imageDeleted", [e]);
                    var t = L(parseInt(n.parent().attr("class").match(/fr-image-(\d+)/)[1], 10) + 1);
                    n.parent().remove(), x(t), l.find("#fr-modal-tags > a").each(function() { 0 === l.find('#fr-image-list [data-tag*="' + Ee(this).text() + '"]').length && Ee(this).removeClass("fr-selected-tag").hide() }), F(), N(!0)
                }).fail(function(e) { D(A, e.response || e.responseText) })) : D(C))
            }

            function D(e, t) { 10 <= e && e < 20 ? i.hide() : 20 <= e && e < 30 && Ee(".fr-image-deleting").removeClass("fr-image-deleting"), s.events.trigger("imageManager.error", [{ code: e, message: n[e] }, t]) }

            function k() {
                var e = d.find(".fr-modal-head-line").outerHeight(),
                    t = c.outerHeight();
                d.toggleClass("fr-show-tags"), d.hasClass("fr-show-tags") ? (d.css("height", e + t), c.find("a").css("opacity", 1)) : (d.css("height", e), c.find("a").css("opacity", 0))
            }

            function F() {
                var e = c.find(".fr-selected-tag");
                0 < e.length ? (a.find("img").parent().show(), e.each(function(e, r) {
                    a.find("img").each(function(e, t) {
                        var n = Ee(t);
                        $(n, r.text) || n.parent().hide()
                    })
                })) : a.find("img").parent().show(), x(L()), y()
            }

            function M(e) {
                e.preventDefault();
                var t = Ee(e.currentTarget);
                t.toggleClass("fr-selected-tag"), s.opts.imageManagerToggleTags && t.siblings("a").removeClass("fr-selected-tag"), F()
            }

            function $(e, t) {
                for (var n = (e.attr("data-tag") || "").split(","), r = 0; r < n.length; r++)
                    if (n[r] == t) return !0;
                return !1
            }
            return n[e] = "Image cannot be loaded from the passed link.", n[m] = "Error during load images request.", n[v] = "Missing imageManagerLoadURL option.", n[E] = "Parsing load response failed.", n[b] = "Missing image thumb.", n[T] = "Missing image URL.", n[A] = "Error during delete image request.", n[C] = "Missing imageManagerDeleteURL option.", {
                require: ["image"],
                _init: function() { if (!s.$wp && "IMG" != s.el.tagName) return !1 },
                show: function() {
                    if (!l) {
                        var e, t = '<div class="fr-modal-head-line"><i class="fa fa-bars fr-modal-more fr-not-available" id="fr-modal-more-' + s.sid + '" title="' + s.language.translate("Tags") + '"></i><h4 data-text="true">' + s.language.translate("Manage Images") + "</h4></div>";
                        t += '<div class="fr-modal-tags" id="fr-modal-tags"></div>', e = s.opts.imageManagerPreloader ? '<img class="fr-preloader" id="fr-preloader" alt="' + s.language.translate("Loading") + '.." src="' + s.opts.imageManagerPreloader + '" style="display: none;">' : '<span class="fr-preloader" id="fr-preloader" style="display: none;">' + s.language.translate("Loading") + "</span>", e += '<div class="fr-image-list" id="fr-image-list"></div>';
                        var n = s.modals.create(g, t, e);
                        l = n.$modal, d = n.$head, r = n.$body
                    }
                    l.data("current-image", s.image.get()), s.modals.show(g), i || (i = l.find("#fr-preloader"), a = l.find("#fr-image-list"), c = l.find("#fr-modal-tags"), h = S(), R(), d.css("height", d.find(".fr-modal-head-line").outerHeight()), s.events.$on(Ee(s.o_win), "resize", function() { N(!!o) }), s.helpers.isMobile() && (s.events.bindClick(a, "div.fr-image-container", function(e) { l.find(".fr-mobile-selected").removeClass("fr-mobile-selected"), Ee(e.currentTarget).addClass("fr-mobile-selected") }), l.on(s._mousedown, function() { l.find(".fr-mobile-selected").removeClass("fr-mobile-selected") })), s.events.bindClick(a, ".fr-insert-img", w), s.events.bindClick(a, ".fr-delete-img", I), l.on(s._mousedown + " " + s._mouseup, function(e) { e.stopPropagation() }), l.on(s._mousedown, "*", function() { s.events.disableBlur() }), r.on("scroll", y), s.events.bindClick(l, "i#fr-modal-more-" + s.sid, k), s.events.bindClick(c, "a", M)), i.show(), a.find(".fr-list-column").empty(), s.opts.imageManagerLoadURL ? Ee.ajax({ url: s.opts.imageManagerLoadURL, method: s.opts.imageManagerLoadMethod, data: s.opts.imageManagerLoadParams, dataType: "json", crossDomain: s.opts.requestWithCORS, xhrFields: { withCredentials: s.opts.requestWithCredentials }, headers: s.opts.requestHeaders }).done(function(e, t, n) {
                        s.events.trigger("imageManager.imagesLoaded", [e]),
                            function(e, t) { try { a.find(".fr-list-column").empty(), u = p = f = 0, o = e, y() } catch (n) { D(E, t) } }(e, n.response), i.hide()
                    }).fail(function() {
                        var e = this.xhr();
                        D(m, e.response || e.responseText)
                    }) : D(v)
                },
                hide: function() { s.modals.hide(g) }
            }
        }, !Ee.FE.PLUGINS.image) throw new Error("Image manager plugin requires image plugin.");
    Ee.FE.DEFAULTS.imageInsertButtons.push("imageManager"), Ee.FE.RegisterCommand("imageManager", { title: "Browse", undo: !1, focus: !1, modal: !0, callback: function() { this.imageManager.show() }, plugin: "imageManager" }), Ee.FE.DefineIcon("imageManager", { NAME: "folder" }), Ee.FE.DefineIcon("imageManagerInsert", { NAME: "plus" }), Ee.FE.DefineIcon("imageManagerDelete", { NAME: "trash" }), Ee.extend(Ee.FE.DEFAULTS, { inlineStyles: { "Big Red": "font-size: 20px; color: red;", "Small Blue": "font-size: 14px; color: blue;" } }), Ee.FE.PLUGINS.inlineStyle = function(i) {
        return {
            apply: function(e) {
                if ("" !== i.selection.text())
                    for (var t = e.split(";"), n = 0; n < t.length; n++) {
                        var r = t[n].split(":");
                        t[n].length && 2 == r.length && i.format.applyStyle(r[0].trim(), r[1].trim())
                    } else i.html.insert('<span style="' + e + '">' + Ee.FE.INVISIBLE_SPACE + Ee.FE.MARKERS + "</span>")
            }
        }
    }, Ee.FE.RegisterCommand("inlineStyle", {
        type: "dropdown",
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.inlineStyles;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><span style="' + t[n] + '" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="inlineStyle" data-param1="' + t[n] + '" title="' + this.language.translate(n) + '">' + this.language.translate(n) + "</a></span></li>");
            return e += "</ul>"
        },
        title: "Inline Style",
        callback: function(e, t) { this.inlineStyle.apply(t) },
        plugin: "inlineStyle"
    }), Ee.FE.DefineIcon("inlineStyle", { NAME: "paint-brush" }), Ee.extend(Ee.FE.DEFAULTS, { lineBreakerTags: ["table", "hr", "form", "dl", "span.fr-video", ".fr-embedly"], lineBreakerOffset: 15, lineBreakerHorizontalOffset: 10 }), Ee.FE.PLUGINS.lineBreaker = function(p) {
        var u, t, i;

        function s(e, t) {
            var n, r, i, a, o, s, l, d;
            if (null == e) o = (a = t.parent()).offset().top, n = (l = t.offset().top) - Math.min((l - o) / 2, p.opts.lineBreakerOffset), i = a.outerWidth(), r = a.offset().left;
            else if (null == t)(s = (a = e.parent()).offset().top + a.outerHeight()) < (d = e.offset().top + e.outerHeight()) && (s = (a = Ee(a).parent()).offset().top + a.outerHeight()), n = d + Math.min(Math.abs(s - d) / 2, p.opts.lineBreakerOffset), i = a.outerWidth(), r = a.offset().left;
            else {
                a = e.parent();
                var c = e.offset().top + e.height(),
                    f = t.offset().top;
                if (f < c) return !1;
                n = (c + f) / 2, i = a.outerWidth(), r = a.offset().left
            }
            p.opts.iframe && (r += p.$iframe.offset().left - p.helpers.scrollLeft(), n += p.$iframe.offset().top - p.helpers.scrollTop()), p.$box.append(u), u.css("top", n - p.win.pageYOffset), u.css("left", r - p.win.pageXOffset), u.css("width", i), u.data("tag1", e), u.data("tag2", t), u.addClass("fr-visible").data("instance", p)
        }

        function l(e) { if (e) { var t = Ee(e); if (0 === p.$el.find(t).length) return null; if (e.nodeType != Node.TEXT_NODE && t.is(p.opts.lineBreakerTags.join(","))) return t; if (0 < t.parents(p.opts.lineBreakerTags.join(",")).length) return e = t.parents(p.opts.lineBreakerTags.join(",")).get(0), 0 !== p.$el.find(e).length && Ee(e).is(p.opts.lineBreakerTags.join(",")) ? Ee(e) : null } return null }

        function a(e, t) { var n = p.doc.elementFromPoint(e, t); return n && !Ee(n).closest(".fr-line-breaker").length && !p.node.isElement(n) && n != p.$wp.get(0) && function(e) { if ("undefined" != typeof e.inFroalaWrapper) return e.inFroalaWrapper; for (var t = e; e.parentNode && e.parentNode !== p.$wp.get(0);) e = e.parentNode; return t.inFroalaWrapper = e.parentNode == p.$wp.get(0), t.inFroalaWrapper }(n) ? n : null }

        function o(e, t, n) { for (var r = n, i = null; r <= p.opts.lineBreakerOffset && !i;)(i = a(e, t - r)) || (i = a(e, t + r)), r += n; return i }

        function d(e, t, n) { for (var r = null, i = 100; !r && e > p.$box.offset().left && e < p.$box.offset().left + p.$box.outerWidth() && 0 < i;)(r = a(e, t)) || (r = o(e, t, 5)), "left" == n ? e -= p.opts.lineBreakerHorizontalOffset : e += p.opts.lineBreakerHorizontalOffset, i -= p.opts.lineBreakerHorizontalOffset; return r }

        function n(e) {
            var t = i = null,
                n = null,
                r = p.doc.elementFromPoint(e.pageX - p.win.pageXOffset, e.pageY - p.win.pageYOffset);
            r && ("HTML" == r.tagName || "BODY" == r.tagName || p.node.isElement(r) || 0 <= (r.getAttribute("class") || "").indexOf("fr-line-breaker")) ? ((n = o(e.pageX - p.win.pageXOffset, e.pageY - p.win.pageYOffset, 1)) || (n = d(e.pageX - p.win.pageXOffset - p.opts.lineBreakerHorizontalOffset, e.pageY - p.win.pageYOffset, "left")), n || (n = d(e.pageX - p.win.pageXOffset + p.opts.lineBreakerHorizontalOffset, e.pageY - p.win.pageYOffset, "right")), t = l(n)) : t = l(r), t ? function(e, t) {
                var n, r, i = e.offset().top,
                    a = e.offset().top + e.outerHeight();
                if (Math.abs(a - t) <= p.opts.lineBreakerOffset || Math.abs(t - i) <= p.opts.lineBreakerOffset)
                    if (Math.abs(a - t) < Math.abs(t - i)) { for (var o = (r = e.get(0)).nextSibling; o && o.nodeType == Node.TEXT_NODE && 0 === o.textContent.length;) o = o.nextSibling; if (!o) return s(e, null); if (n = l(o)) return s(e, n) } else { if (!(r = e.get(0)).previousSibling) return s(null, e); if (n = l(r.previousSibling)) return s(n, e) }
                u.removeClass("fr-visible").removeData("instance")
            }(t, e.pageY) : p.core.sameInstance(u) && u.removeClass("fr-visible").removeData("instance")
        }

        function e(e) { return !(u.hasClass("fr-visible") && !p.core.sameInstance(u)) && (p.popups.areVisible() || p.el.querySelector(".fr-selected-cell") ? (u.removeClass("fr-visible"), !0) : void(!1 !== t || p.edit.isDisabled() || (i && clearTimeout(i), i = setTimeout(n, 30, e)))) }

        function r() { i && clearTimeout(i), u.hasClass("fr-visible") && u.removeClass("fr-visible").removeData("instance") }

        function c() { t = !0, r() }

        function f() { t = !1 }

        function h(e) {
            e.preventDefault();
            var t = u.data("instance") || p;
            u.removeClass("fr-visible").removeData("instance");
            var n = u.data("tag1"),
                r = u.data("tag2"),
                i = p.html.defaultTag();
            null == n ? i && "TD" != r.parent().get(0).tagName && 0 === r.parents(i).length ? r.before("<" + i + ">" + Ee.FE.MARKERS + "<br></" + i + ">") : r.before(Ee.FE.MARKERS + "<br>") : i && "TD" != n.parent().get(0).tagName && 0 === n.parents(i).length ? n.after("<" + i + ">" + Ee.FE.MARKERS + "<br></" + i + ">") : n.after(Ee.FE.MARKERS + "<br>"), t.selection.restore()
        }
        return {
            _init: function() {
                if (!p.$wp) return !1;
                p.shared.$line_breaker || (p.shared.$line_breaker = Ee('<div class="fr-line-breaker"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + p.language.translate("Break") + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="21" y="11" width="2" height="8"/><rect x="14" y="17" width="7" height="2"/><path d="M14.000,14.000 L14.000,22.013 L9.000,18.031 L14.000,14.000 Z"/></svg></a></div>')), u = p.shared.$line_breaker, p.events.on("shared.destroy", function() { u.html("").removeData().remove(), u = null }, !0), p.events.on("destroy", function() { u.removeData("instance").removeClass("fr-visible").appendTo("body:first"), clearTimeout(i) }, !0), p.events.$on(u, "mousemove", function(e) { e.stopPropagation() }, !0), p.events.bindClick(u, "a", h), t = !1, p.events.$on(p.$win, "mousemove", e), p.events.$on(Ee(p.win), "scroll", r), p.events.on("popups.show.table.edit", r), p.events.on("commands.after", r), p.events.$on(Ee(p.win), "mousedown", c), p.events.$on(Ee(p.win), "mouseup", f)
            }
        }
    }, Ee.extend(Ee.FE.POPUP_TEMPLATES, { "link.edit": "[_BUTTONS_]", "link.insert": "[_BUTTONS_][_INPUT_LAYER_]" }), Ee.extend(Ee.FE.DEFAULTS, { linkEditButtons: ["linkOpen", "linkStyle", "linkEdit", "linkRemove"], linkInsertButtons: ["linkBack", "|", "linkList"], linkAttributes: {}, linkAutoPrefix: "http://", linkStyles: { "fr-green": "Green", "fr-strong": "Thick" }, linkMultipleStyles: !0, linkConvertEmailAddress: !0, linkAlwaysBlank: !1, linkAlwaysNoFollow: !1, linkNoOpener: !0, linkNoReferrer: !0, linkList: [{ text: "Froala", href: "https://froala.com", target: "_blank" }, { text: "Google", href: "https://google.com", target: "_blank" }, { displayText: "Facebook", href: "https://facebook.com" }], linkText: !0 }), Ee.FE.PLUGINS.link = function(f) {
        function p() {
            var e = f.image ? f.image.get() : null;
            if (!e && f.$wp) {
                var t = f.selection.ranges(0).commonAncestorContainer;
                try { t && (t.contains && t.contains(f.el) || !f.el.contains(t) || f.el == t) && (t = null) } catch (i) { t = null }
                if (t && "A" === t.tagName) return t;
                var n = f.selection.element(),
                    r = f.selection.endElement();
                "A" == n.tagName || f.node.isElement(n) || (n = Ee(n).parentsUntil(f.$el, "a:first").get(0)), "A" == r.tagName || f.node.isElement(r) || (r = Ee(r).parentsUntil(f.$el, "a:first").get(0));
                try { r && (r.contains && r.contains(f.el) || !f.el.contains(r) || f.el == r) && (r = null) } catch (i) { r = null }
                try { n && (n.contains && n.contains(f.el) || !f.el.contains(n) || f.el == n) && (n = null) } catch (i) { n = null }
                return r && r == n && "A" == r.tagName ? (f.browser.msie || f.helpers.isMobile()) && (f.selection.info(n).atEnd || f.selection.info(n).atStart) ? null : n : null
            }
            return "A" == f.el.tagName ? f.el : e && e.get(0).parentNode && "A" == e.get(0).parentNode.tagName ? e.get(0).parentNode : void 0
        }

        function u() {
            var e, t, n, r, i = f.image ? f.image.get() : null,
                a = [];
            if (i) "A" == i.get(0).parentNode.tagName && a.push(i.get(0).parentNode);
            else if (f.win.getSelection) {
                var o = f.win.getSelection();
                if (o.getRangeAt && o.rangeCount) {
                    r = f.doc.createRange();
                    for (var s = 0; s < o.rangeCount; ++s)
                        if ((t = (e = o.getRangeAt(s)).commonAncestorContainer) && 1 != t.nodeType && (t = t.parentNode), t && "a" == t.nodeName.toLowerCase()) a.push(t);
                        else { n = t.getElementsByTagName("a"); for (var l = 0; l < n.length; ++l) r.selectNodeContents(n[l]), r.compareBoundaryPoints(e.END_TO_START, e) < 1 && -1 < r.compareBoundaryPoints(e.START_TO_END, e) && a.push(n[l]) }
                }
            } else if (f.doc.selection && "Control" != f.doc.selection.type)
                if ("a" == (t = (e = f.doc.selection.createRange()).parentElement()).nodeName.toLowerCase()) a.push(t);
                else { n = t.getElementsByTagName("a"), r = f.doc.body.createTextRange(); for (var d = 0; d < n.length; ++d) r.moveToElementText(n[d]), -1 < r.compareEndPoints("StartToEnd", e) && r.compareEndPoints("EndToStart", e) < 1 && a.push(n[d]) }
            return a
        }

        function h(i) {
            if (f.core.hasFocus()) {
                if (o(), i && "keyup" === i.type && (i.altKey || i.which == Ee.FE.KEYCODE.ALT)) return !0;
                setTimeout(function() {
                    if (!i || i && (1 == i.which || "mouseup" != i.type)) {
                        var e = p(),
                            t = f.image ? f.image.get() : null;
                        if (e && !t) {
                            if (f.image) { var n = f.node.contents(e); if (1 == n.length && "IMG" == n[0].tagName) { var r = f.selection.ranges(0); return 0 === r.startOffset && 0 === r.endOffset ? Ee(e).before(Ee.FE.MARKERS) : Ee(e).after(Ee.FE.MARKERS), f.selection.restore(), !1 } }
                            i && i.stopPropagation(), a(e)
                        }
                    }
                }, f.helpers.isIOS() ? 100 : 0)
            }
        }

        function a(e) {
            var t = f.popups.get("link.edit");
            t || (t = function() {
                var e = "";
                1 <= f.opts.linkEditButtons.length && ("A" == f.el.tagName && 0 <= f.opts.linkEditButtons.indexOf("linkRemove") && f.opts.linkEditButtons.splice(f.opts.linkEditButtons.indexOf("linkRemove"), 1), e = '<div class="fr-buttons">' + f.button.buildList(f.opts.linkEditButtons) + "</div>");
                var t = { buttons: e },
                    n = f.popups.create("link.edit", t);
                f.$wp && f.events.$on(f.$wp, "scroll.link-edit", function() { p() && f.popups.isVisible("link.edit") && a(p()) });
                return n
            }());
            var n = Ee(e);
            f.popups.isVisible("link.edit") || f.popups.refresh("link.edit"), f.popups.setContainer("link.edit", f.$sc);
            var r = n.offset().left + Ee(e).outerWidth() / 2,
                i = n.offset().top + n.outerHeight();
            f.popups.show("link.edit", r, i, n.outerHeight())
        }

        function o() { f.popups.hide("link.edit") }

        function l() {}

        function d() {
            var e = f.popups.get("link.insert"),
                t = p();
            if (t) {
                var n, r, i = Ee(t),
                    a = e.find('input.fr-link-attr[type="text"]'),
                    o = e.find('input.fr-link-attr[type="checkbox"]');
                for (n = 0; n < a.length; n++)(r = Ee(a[n])).val(i.attr(r.attr("name") || ""));
                for (o.prop("checked", !1), n = 0; n < o.length; n++) r = Ee(o[n]), i.attr(r.attr("name")) == r.data("checked") && r.prop("checked", !0);
                e.find('input.fr-link-attr[type="text"][name="text"]').val(i.text())
            } else e.find('input.fr-link-attr[type="text"]').val(""), e.find('input.fr-link-attr[type="checkbox"]').prop("checked", !1), e.find('input.fr-link-attr[type="text"][name="text"]').val(f.selection.text());
            e.find("input.fr-link-attr").trigger("change"), (f.image ? f.image.get() : null) ? e.find('.fr-link-attr[name="text"]').parent().hide() : e.find('.fr-link-attr[name="text"]').parent().show()
        }

        function s(e) {
            if (e) return f.popups.onRefresh("link.insert", d), f.popups.onHide("link.insert", l), !0;
            var t = "";
            1 <= f.opts.linkInsertButtons.length && (t = '<div class="fr-buttons">' + f.button.buildList(f.opts.linkInsertButtons) + "</div>");
            var n = "",
                r = 0;
            for (var i in n = '<div class="fr-link-insert-layer fr-layer fr-active" id="fr-link-insert-layer-' + f.id + '">', n += '<div class="fr-input-line"><input id="fr-link-insert-layer-url-' + f.id + '" name="href" type="text" class="fr-link-attr" placeholder="' + f.language.translate("URL") + '" tabIndex="' + ++r + '"></div>', f.opts.linkText && (n += '<div class="fr-input-line"><input id="fr-link-insert-layer-text-' + f.id + '" name="text" type="text" class="fr-link-attr" placeholder="' + f.language.translate("Text") + '" tabIndex="' + ++r + '"></div>'), f.opts.linkAttributes)
                if (f.opts.linkAttributes.hasOwnProperty(i)) {
                    var a = f.opts.linkAttributes[i];
                    n += '<div class="fr-input-line"><input name="' + i + '" type="text" class="fr-link-attr" placeholder="' + f.language.translate(a) + '" tabIndex="' + ++r + '"></div>'
                }
            f.opts.linkAlwaysBlank || (n += '<div class="fr-checkbox-line"><span class="fr-checkbox"><input name="target" class="fr-link-attr" data-checked="_blank" type="checkbox" id="fr-link-target-' + f.id + '" tabIndex="' + ++r + '"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" fill="#FFF"></path></svg></span></span><label for="fr-link-target-' + f.id + '">' + f.language.translate("Open in new tab") + "</label></div>");
            var o = { buttons: t, input_layer: n += '<div class="fr-action-buttons"><button class="fr-command fr-submit" role="button" data-cmd="linkInsert" href="#" tabIndex="' + ++r + '" type="button">' + f.language.translate("Insert") + "</button></div></div>" },
                s = f.popups.create("link.insert", o);
            return f.$wp && f.events.$on(f.$wp, "scroll.link-insert", function() {
                (f.image ? f.image.get() : null) && f.popups.isVisible("link.insert") && m(), f.popups.isVisible("link.insert") && g()
            }), s
        }

        function c(e, t, n) {
            if (void 0 === n && (n = {}), !1 === f.events.trigger("link.beforeInsert", [e, t, n])) return !1;
            var r = f.image ? f.image.get() : null;
            r || "A" == f.el.tagName ? "A" == f.el.tagName && f.$el.focus() : (f.selection.restore(), f.popups.hide("link.insert"));
            var i = e;
            f.opts.linkConvertEmailAddress && f.helpers.isEmail(e) && !/^mailto:.*/i.test(e) && (e = "mailto:" + e);
            if ("" === f.opts.linkAutoPrefix || new RegExp("^(" + Ee.FE.LinkProtocols.join("|") + "):.", "i").test(e) || /^data:image.*/i.test(e) || /^(https?:|ftps?:|file:|)\/\//i.test(e) || /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(e) || ["/", "{", "[", "#", "(", "."].indexOf((e || "")[0]) < 0 && (e = f.opts.linkAutoPrefix + f.helpers.sanitizeURL(e)), e = f.helpers.sanitizeURL(e), f.opts.linkAlwaysBlank && (n.target = "_blank"), f.opts.linkAlwaysNoFollow && (n.rel = "nofollow"), "_blank" == n.target ? (f.opts.linkNoOpener && (n.rel ? n.rel += " noopener" : n.rel = "noopener"), f.opts.linkNoReferrer && (n.rel ? n.rel += " noreferrer" : n.rel = "noreferrer")) : null == n.target && (n.rel ? n.rel = n.rel.replace(/noopener/, "").replace(/noreferrer/, "") : n.rel = null), t = t || "", e === f.opts.linkAutoPrefix) return f.popups.get("link.insert").find('input[name="href"]').addClass("fr-error"), f.events.trigger("link.bad", [i]), !1;
            var a, o = p();
            if (o) {
                if ((a = Ee(o)).attr("href", e), 0 < t.length && a.text() != t && !r) {
                    for (var s = a.get(0); 1 === s.childNodes.length && s.childNodes[0].nodeType == Node.ELEMENT_NODE;) s = s.childNodes[0];
                    Ee(s).text(t)
                }
                r || a.prepend(Ee.FE.START_MARKER).append(Ee.FE.END_MARKER), a.attr(n), r || f.selection.restore()
            } else {
                r ? r.wrap('<a href="' + e + '"></a>') : (f.format.remove("a"), f.selection.isCollapsed() ? (t = 0 === t.length ? i : t, f.html.insert('<a href="' + e + '">' + Ee.FE.START_MARKER + t.replace(/&/g, "&amp;") + Ee.FE.END_MARKER + "</a>"), f.selection.restore()) : 0 < t.length && t != f.selection.text().replace(/\n/g, "") ? (f.selection.remove(), f.html.insert('<a href="' + e + '">' + Ee.FE.START_MARKER + t.replace(/&/g, "&amp;") + Ee.FE.END_MARKER + "</a>"), f.selection.restore()) : (! function() {
                    if (!f.selection.isCollapsed()) {
                        f.selection.save();
                        for (var e = f.$el.find(".fr-marker").addClass("fr-unprocessed").toArray(); e.length;) {
                            var t = Ee(e.pop());
                            t.removeClass("fr-unprocessed");
                            var n = f.node.deepestParent(t.get(0));
                            if (n) {
                                for (var r = t.get(0), i = "", a = ""; r = r.parentNode, f.node.isBlock(r) || (i += f.node.closeTagString(r), a = f.node.openTagString(r) + a), r != n;);
                                var o = f.node.openTagString(t.get(0)) + t.html() + f.node.closeTagString(t.get(0));
                                t.replaceWith('<span id="fr-break"></span>');
                                var s = n.outerHTML;
                                s = s.replace(/<span id="fr-break"><\/span>/g, i + o + a), n.outerHTML = s
                            }
                            e = f.$el.find(".fr-marker.fr-unprocessed").toArray()
                        }
                        f.html.cleanEmptyTags(), f.selection.restore()
                    }
                }(), f.format.apply("a", { href: e })));
                for (var l = u(), d = 0; d < l.length; d++)(a = Ee(l[d])).attr(n), a.removeAttr("_moz_dirty");
                1 == l.length && f.$wp && !r && (Ee(l[0]).prepend(Ee.FE.START_MARKER).append(Ee.FE.END_MARKER), f.selection.restore())
            }
            if (r) {
                var c = f.popups.get("link.insert");
                c && c.find("input:focus").blur(), f.image.edit(r)
            } else h()
        }

        function g() {
            o();
            var e = p();
            if (e) {
                var t = f.popups.get("link.insert");
                t || (t = s()), f.popups.isVisible("link.insert") || (f.popups.refresh("link.insert"), f.selection.save(), f.helpers.isMobile() && (f.events.disableBlur(), f.$el.blur(), f.events.enableBlur())), f.popups.setContainer("link.insert", f.$sc);
                var n = (f.image ? f.image.get() : null) || Ee(e),
                    r = n.offset().left + n.outerWidth() / 2,
                    i = n.offset().top + n.outerHeight();
                f.popups.show("link.insert", r, i, n.outerHeight())
            }
        }

        function m() {
            var e = f.image ? f.image.getEl() : null;
            if (e) {
                var t = f.popups.get("link.insert");
                f.image.hasCaption() && (e = e.find(".fr-img-wrap")), t || (t = s()), d(), f.popups.setContainer("link.insert", f.$sc);
                var n = e.offset().left + e.outerWidth() / 2,
                    r = e.offset().top + e.outerHeight();
                f.popups.show("link.insert", n, r, e.outerHeight())
            }
        }
        return {
            _init: function() { f.events.on("keyup", function(e) { e.which != Ee.FE.KEYCODE.ESC && h(e) }), f.events.on("window.mouseup", h), f.events.$on(f.$el, "click", "a", function(e) { f.edit.isDisabled() && e.preventDefault() }), f.helpers.isMobile() && f.events.$on(f.$doc, "selectionchange", h), s(!0), "A" == f.el.tagName && f.$el.addClass("fr-view"), f.events.on("toolbar.esc", function() { if (f.popups.isVisible("link.edit")) return f.events.disableBlur(), f.events.focus(), !1 }, !0) },
            remove: function() {
                var e = p(),
                    t = f.image ? f.image.get() : null;
                if (!1 === f.events.trigger("link.beforeRemove", [e])) return !1;
                t && e ? (t.unwrap(), f.image.edit(t)) : e && (f.selection.save(), Ee(e).replaceWith(Ee(e).html()), f.selection.restore(), o())
            },
            showInsertPopup: function() {
                var e = f.$tb.find('.fr-command[data-cmd="insertLink"]'),
                    t = f.popups.get("link.insert");
                if (t || (t = s()), !t.hasClass("fr-active"))
                    if (f.popups.refresh("link.insert"), f.popups.setContainer("link.insert", f.$tb || f.$sc), e.is(":visible")) {
                        var n = e.offset().left + e.outerWidth() / 2,
                            r = e.offset().top + (f.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
                        f.popups.show("link.insert", n, r, e.outerHeight())
                    } else f.position.forSelection(t), f.popups.show("link.insert")
            },
            usePredefined: function(e) {
                var t, n, r = f.opts.linkList[e],
                    i = f.popups.get("link.insert"),
                    a = i.find('input.fr-link-attr[type="text"]'),
                    o = i.find('input.fr-link-attr[type="checkbox"]');
                for (n = 0; n < a.length; n++) r[(t = Ee(a[n])).attr("name")] ? t.val(r[t.attr("name")]) : "text" != t.attr("name") && t.val("");
                for (n = 0; n < o.length; n++)(t = Ee(o[n])).prop("checked", t.data("checked") == r[t.attr("name")]);
                f.accessibility.focusPopup(i)
            },
            insertCallback: function() {
                var e, t, n = f.popups.get("link.insert"),
                    r = n.find('input.fr-link-attr[type="text"]'),
                    i = n.find('input.fr-link-attr[type="checkbox"]'),
                    a = (r.filter('[name="href"]').val() || "").trim(),
                    o = r.filter('[name="text"]').val(),
                    s = {};
                for (t = 0; t < r.length; t++) e = Ee(r[t]), ["href", "text"].indexOf(e.attr("name")) < 0 && (s[e.attr("name")] = e.val());
                for (t = 0; t < i.length; t++)(e = Ee(i[t])).is(":checked") ? s[e.attr("name")] = e.data("checked") : s[e.attr("name")] = e.data("unchecked") || null;
                var l = f.helpers.scrollTop();
                c(a, o, s), Ee(f.o_win).scrollTop(l)
            },
            insert: c,
            update: g,
            get: p,
            allSelected: u,
            back: function() { f.image && f.image.get() ? f.image.back() : (f.events.disableBlur(), f.selection.restore(), f.events.enableBlur(), p() && f.$wp ? (f.selection.restore(), o(), h()) : "A" == f.el.tagName ? (f.$el.focus(), h()) : (f.popups.hide("link.insert"), f.toolbar.showInline())) },
            imageLink: m,
            applyStyle: function(e, t, n) {
                void 0 === n && (n = f.opts.linkMultipleStyles), void 0 === t && (t = f.opts.linkStyles);
                var r = p();
                if (!r) return !1;
                if (!n) {
                    var i = Object.keys(t);
                    i.splice(i.indexOf(e), 1), Ee(r).removeClass(i.join(" "))
                }
                Ee(r).toggleClass(e), h()
            }
        }
    }, Ee.FE.DefineIcon("insertLink", { NAME: "link" }), Ee.FE.RegisterShortcut(Ee.FE.KEYCODE.K, "insertLink", null, "K"), Ee.FE.RegisterCommand("insertLink", { title: "Insert Link", undo: !1, focus: !0, refreshOnCallback: !1, popup: !0, callback: function() { this.popups.isVisible("link.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("link.insert")) : this.link.showInsertPopup() }, plugin: "link" }), Ee.FE.DefineIcon("linkOpen", { NAME: "external-link", FA5NAME: "external-link-alt" }), Ee.FE.RegisterCommand("linkOpen", {
        title: "Open Link",
        undo: !1,
        refresh: function(e) { this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden") },
        callback: function() {
            var e = this.link.get();
            e && (this.o_win.open(e.href, "_blank", "noopener"), this.popups.hide("link.edit"))
        },
        plugin: "link"
    }), Ee.FE.DefineIcon("linkEdit", { NAME: "edit" }), Ee.FE.RegisterCommand("linkEdit", { title: "Edit Link", undo: !1, refreshAfterCallback: !1, popup: !0, callback: function() { this.link.update() }, refresh: function(e) { this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden") }, plugin: "link" }), Ee.FE.DefineIcon("linkRemove", { NAME: "unlink" }), Ee.FE.RegisterCommand("linkRemove", { title: "Unlink", callback: function() { this.link.remove() }, refresh: function(e) { this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden") }, plugin: "link" }), Ee.FE.DefineIcon("linkBack", { NAME: "arrow-left" }), Ee.FE.RegisterCommand("linkBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        refreshAfterCallback: !1,
        callback: function() { this.link.back() },
        refresh: function(e) {
            var t = this.link.get() && this.doc.hasFocus();
            (this.image ? this.image.get() : null) || t || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"))
        },
        plugin: "link"
    }), Ee.FE.DefineIcon("linkList", { NAME: "search" }), Ee.FE.RegisterCommand("linkList", { title: "Choose Link", type: "dropdown", focus: !1, undo: !1, refreshAfterCallback: !1, html: function() { for (var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.linkList, n = 0; n < t.length; n++) e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkList" data-param1="' + n + '">' + (t[n].displayText || t[n].text) + "</a></li>"; return e += "</ul>" }, callback: function(e, t) { this.link.usePredefined(t) }, plugin: "link" }), Ee.FE.RegisterCommand("linkInsert", { focus: !1, refreshAfterCallback: !1, callback: function() { this.link.insertCallback() }, refresh: function(e) { this.link.get() ? e.text(this.language.translate("Update")) : e.text(this.language.translate("Insert")) }, plugin: "link" }), Ee.FE.DefineIcon("imageLink", { NAME: "link" }), Ee.FE.RegisterCommand("imageLink", {
        title: "Insert Link",
        undo: !1,
        focus: !1,
        popup: !0,
        callback: function() { this.link.imageLink() },
        refresh: function(e) {
            var t;
            this.link.get() ? ((t = e.prev()).hasClass("fr-separator") && t.removeClass("fr-hidden"), e.addClass("fr-hidden")) : ((t = e.prev()).hasClass("fr-separator") && t.addClass("fr-hidden"), e.removeClass("fr-hidden"))
        },
        plugin: "link"
    }), Ee.FE.DefineIcon("linkStyle", { NAME: "magic" }), Ee.FE.RegisterCommand("linkStyle", {
        title: "Style",
        type: "dropdown",
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.linkStyles;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkStyle" data-param1="' + n + '">' + this.language.translate(t[n]) + "</a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) { this.link.applyStyle(t) },
        refreshOnShow: function(e, t) {
            var n = this.link.get();
            if (n) {
                var r = Ee(n);
                t.find(".fr-command").each(function() {
                    var e = Ee(this).data("param1"),
                        t = r.hasClass(e);
                    Ee(this).toggleClass("fr-active", t).attr("aria-selected", t)
                })
            }
        },
        refresh: function(e) { this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden") },
        plugin: "link"
    }), Ee.FE.PLUGINS.lists = function(f) {
        function p(e) { return '<span class="fr-open-' + e.toLowerCase() + '"></span>' }

        function u(e) { return '<span class="fr-close-' + e.toLowerCase() + '"></span>' }

        function r(e, t) {
            ! function(e, t) {
                for (var n = [], r = 0; r < e.length; r++) { var i = e[r].parentNode; "LI" == e[r].tagName && i.tagName != t && n.indexOf(i) < 0 && n.push(i) }
                for (r = n.length - 1; 0 <= r; r--) {
                    var a = Ee(n[r]);
                    a.replaceWith("<" + t.toLowerCase() + " " + f.node.attributes(a.get(0)) + ">" + a.html() + "</" + t.toLowerCase() + ">")
                }
            }(e, t);
            var n, r = f.html.defaultTag(),
                i = null;
            e.length && (n = "rtl" == f.opts.direction || "rtl" == Ee(e[0]).css("direction") ? "margin-right" : "margin-left");
            for (var a = 0; a < e.length; a++)
                if ("LI" != e[a].tagName) {
                    var o = f.helpers.getPX(Ee(e[a]).css(n)) || 0;
                    (e[a].style.marginLeft = null) === i && (i = o);
                    var s = 0 < i ? "<" + t + ' style="' + n + ": " + i + 'px;">' : "<" + t + ">",
                        l = "</" + t + ">";
                    for (o -= i; 0 < o / f.opts.indentMargin;) s += "<" + t + ">", l += l, o -= f.opts.indentMargin;
                    r && e[a].tagName.toLowerCase() == r ? Ee(e[a]).replaceWith(s + "<li" + f.node.attributes(e[a]) + ">" + Ee(e[a]).html() + "</li>" + l) : Ee(e[a]).wrap(s + "<li></li>" + l)
                }
            f.clean.lists()
        }

        function i(e) {
            var t, n;
            for (t = e.length - 1; 0 <= t; t--)
                for (n = t - 1; 0 <= n; n--)
                    if (Ee(e[n]).find(e[t]).length || e[n] == e[t]) { e.splice(t, 1); break }
            var r = [];
            for (t = 0; t < e.length; t++) {
                var i = Ee(e[t]),
                    a = e[t].parentNode,
                    o = i.attr("class");
                if (i.before(u(a.tagName)), "LI" == a.parentNode.tagName) i.before(u("LI")), i.after(p("LI"));
                else {
                    var s = "";
                    o && (s += ' class="' + o + '"');
                    var l = "rtl" == f.opts.direction || "rtl" == i.css("direction") ? "margin-right" : "margin-left";
                    f.helpers.getPX(Ee(a).css(l)) && 0 <= (Ee(a).attr("style") || "").indexOf(l + ":") && (s += ' style="' + l + ":" + f.helpers.getPX(Ee(a).css(l)) + 'px;"'), f.html.defaultTag() && 0 === i.find(f.html.blockTagsQuery()).length && i.wrapInner("<" + f.html.defaultTag() + s + "></" + f.html.defaultTag() + ">"), f.node.isEmpty(i.get(0), !0) || 0 !== i.find(f.html.blockTagsQuery()).length || i.append("<br>"), i.append(p("LI")), i.prepend(u("LI"))
                }
                i.after(p(a.tagName)), "LI" == a.parentNode.tagName && (a = a.parentNode.parentNode), r.indexOf(a) < 0 && r.push(a)
            }
            for (t = 0; t < r.length; t++) {
                var d = Ee(r[t]),
                    c = d.html();
                c = (c = c.replace(/<span class="fr-close-([a-z]*)"><\/span>/g, "</$1>")).replace(/<span class="fr-open-([a-z]*)"><\/span>/g, "<$1>"), d.replaceWith(f.node.openTagString(d.get(0)) + c + f.node.closeTagString(d.get(0)))
            }
            f.$el.find("li:empty").remove(), f.$el.find("ul:empty, ol:empty").remove(), f.clean.lists(), f.html.wrap()
        }

        function a(e) {
            f.selection.save();
            for (var t = 0; t < e.length; t++) {
                var n = e[t].previousSibling;
                if (n) {
                    var r = Ee(e[t]).find("> ul, > ol").last().get(0);
                    if (r) {
                        for (var i = Ee("<li>").prependTo(Ee(r)), a = f.node.contents(e[t])[0]; a && !f.node.isList(a);) {
                            var o = a.nextSibling;
                            i.append(a), a = o
                        }
                        Ee(n).append(Ee(r)), Ee(e[t]).remove()
                    } else {
                        var s = Ee(n).find("> ul, > ol").last().get(0);
                        if (s) Ee(s).append(Ee(e[t]));
                        else {
                            var l = Ee("<" + e[t].parentNode.tagName + ">");
                            Ee(n).append(l), l.append(Ee(e[t]))
                        }
                    }
                }
            }
            f.clean.lists(), f.selection.restore()
        }

        function o(e) { f.selection.save(), i(e), f.selection.restore() }

        function e(e) {
            if ("indent" == e || "outdent" == e) {
                for (var t = !1, n = f.selection.blocks(), r = [], i = 0; i < n.length; i++) "LI" == n[i].tagName ? (t = !0, r.push(n[i])) : "LI" == n[i].parentNode.tagName && (t = !0, r.push(n[i].parentNode));
                t && ("indent" == e ? a(r) : o(r))
            }
        }
        return {
            _init: function() { f.events.on("commands.after", e), f.events.on("keydown", function(e) { if (e.which == Ee.FE.KEYCODE.TAB) { for (var t = f.selection.blocks(), n = [], r = 0; r < t.length; r++) "LI" == t[r].tagName ? n.push(t[r]) : "LI" == t[r].parentNode.tagName && n.push(t[r].parentNode); if (1 < n.length || n.length && (f.selection.info(n[0]).atStart || f.node.isEmpty(n[0]))) return e.preventDefault(), e.stopPropagation(), e.shiftKey ? o(n) : a(n), !1 } }, !0) },
            format: function(e) {
                f.selection.save(), f.html.wrap(!0, !0, !0, !0), f.selection.restore();
                for (var t = f.selection.blocks(), n = 0; n < t.length; n++) "LI" != t[n].tagName && "LI" == t[n].parentNode.tagName && (t[n] = t[n].parentNode);
                f.selection.save(),
                    function(e, t) {
                        for (var n = !0, r = 0; r < e.length; r++) {
                            if ("LI" != e[r].tagName) return !1;
                            e[r].parentNode.tagName != t && (n = !1)
                        }
                        return n
                    }(t, e) ? i(t) : r(t, e), f.html.unwrap(), f.selection.restore()
            },
            refresh: function(e, t) {
                var n = Ee(f.selection.element());
                if (n.get(0) != f.el) {
                    var r = n.get(0);
                    (r = "LI" != r.tagName && r.firstElementChild && "LI" != r.firstElementChild.tagName ? n.parents("li").get(0) : "LI" == r.tagName || r.firstElementChild ? r.firstElementChild && "LI" == r.firstElementChild.tagName ? n.get(0).firstChild : n.get(0) : n.parents("li").get(0)) && r.parentNode.tagName == t && f.el.contains(r.parentNode) && e.addClass("fr-active")
                }
            }
        }
    }, Ee.FE.RegisterCommand("formatUL", { title: "Unordered List", refresh: function(e) { this.lists.refresh(e, "UL") }, callback: function() { this.lists.format("UL") }, plugin: "lists" }), Ee.FE.RegisterCommand("formatOL", { title: "Ordered List", refresh: function(e) { this.lists.refresh(e, "OL") }, callback: function() { this.lists.format("OL") }, plugin: "lists" }), Ee.FE.DefineIcon("formatUL", { NAME: "list-ul" }), Ee.FE.DefineIcon("formatOL", { NAME: "list-ol" }), Ee.extend(Ee.FE.DEFAULTS, { paragraphFormat: { N: "Normal", H1: "Heading 1", H2: "Heading 2", H3: "Heading 3", H4: "Heading 4", PRE: "Code" }, paragraphFormatSelection: !1, paragraphDefaultSelection: "Paragraph Format" }), Ee.FE.PLUGINS.paragraphFormat = function(p) {
        function u(e, t) {
            var n = p.html.defaultTag();
            if (t && t.toLowerCase() != n)
                if (0 < e.find("ul, ol").length) {
                    var r = Ee("<" + t + ">");
                    e.prepend(r);
                    for (var i = p.node.contents(e.get(0))[0]; i && ["UL", "OL"].indexOf(i.tagName) < 0;) {
                        var a = i.nextSibling;
                        r.append(i), i = a
                    }
                } else e.html("<" + t + ">" + e.html() + "</" + t + ">")
        }
        return {
            apply: function(e) {
                "N" == e && (e = p.html.defaultTag()), p.selection.save(), p.html.wrap(!0, !0, !p.opts.paragraphFormat.BLOCKQUOTE, !0, !0), p.selection.restore();
                var t, n, r, i, a, o, s, l, d = p.selection.blocks();
                p.selection.save(), p.$el.find("pre").attr("skip", !0);
                for (var c = 0; c < d.length; c++)
                    if (d[c].tagName != e && !p.node.isList(d[c])) { var f = Ee(d[c]); "LI" == d[c].tagName ? u(f, e) : "LI" == d[c].parentNode.tagName && d[c] ? (o = f, s = e, l = p.html.defaultTag(), s && s.toLowerCase() != l || (s = 'div class="fr-temp-div"'), o.replaceWith(Ee("<" + s + ">").html(o.html()))) : 0 <= ["TD", "TH"].indexOf(d[c].parentNode.tagName) ? (r = f, i = e, a = p.html.defaultTag(), i || (i = 'div class="fr-temp-div"' + (p.node.isEmpty(r.get(0), !0) ? ' data-empty="true"' : "")), i.toLowerCase() == a ? (p.node.isEmpty(r.get(0), !0) || r.append("<br/>"), r.replaceWith(r.html())) : r.replaceWith(Ee("<" + i + ">").html(r.html()))) : (t = f, (n = e) || (n = 'div class="fr-temp-div"' + (p.node.isEmpty(t.get(0), !0) ? ' data-empty="true"' : "")), t.replaceWith(Ee("<" + n + " " + p.node.attributes(t.get(0)) + ">").html(t.html()).removeAttr("data-empty"))) }
                p.$el.find('pre:not([skip="true"]) + pre:not([skip="true"])').each(function() { Ee(this).prev().append("<br>" + Ee(this).html()), Ee(this).remove() }), p.$el.find("pre").removeAttr("skip"), p.html.unwrap(), p.selection.restore()
            },
            refreshOnShow: function(e, t) {
                var n = p.selection.blocks();
                if (n.length) {
                    var r = n[0],
                        i = "N",
                        a = p.html.defaultTag();
                    r.tagName.toLowerCase() != a && r != p.el && (i = r.tagName), t.find('.fr-command[data-param1="' + i + '"]').addClass("fr-active").attr("aria-selected", !0)
                } else t.find('.fr-command[data-param1="N"]').addClass("fr-active").attr("aria-selected", !0)
            },
            refresh: function(e) {
                if (p.opts.paragraphFormatSelection) {
                    var t = p.selection.blocks();
                    if (t.length) {
                        var n = t[0],
                            r = "N",
                            i = p.html.defaultTag();
                        n.tagName.toLowerCase() != i && n != p.el && (r = n.tagName), 0 <= ["LI", "TD", "TH"].indexOf(r) && (r = "N"), e.find("> span").text(p.language.translate(p.opts.paragraphFormat[r]))
                    } else e.find("> span").text(p.language.translate(p.opts.paragraphFormat.N))
                }
            }
        }
    }, Ee.FE.RegisterCommand("paragraphFormat", {
        type: "dropdown",
        displaySelection: function(e) { return e.opts.paragraphFormatSelection },
        defaultSelection: function(e) { return e.language.translate(e.opts.paragraphDefaultSelection) },
        displaySelectionWidth: 125,
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.paragraphFormat;
            for (var n in t)
                if (t.hasOwnProperty(n)) {
                    var r = this.shortcuts.get("paragraphFormat." + n);
                    r = r ? '<span class="fr-shortcut">' + r + "</span>" : "", e += '<li role="presentation"><' + ("N" == n ? this.html.defaultTag() || "DIV" : n) + ' style="padding: 0 !important; margin: 0 !important;" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="paragraphFormat" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.language.translate(t[n]) + "</a></" + ("N" == n ? this.html.defaultTag() || "DIV" : n) + "></li>"
                }
            return e += "</ul>"
        },
        title: "Paragraph Format",
        callback: function(e, t) { this.paragraphFormat.apply(t) },
        refresh: function(e) { this.paragraphFormat.refresh(e) },
        refreshOnShow: function(e, t) { this.paragraphFormat.refreshOnShow(e, t) },
        plugin: "paragraphFormat"
    }), Ee.FE.DefineIcon("paragraphFormat", { NAME: "paragraph" }), Ee.extend(Ee.FE.DEFAULTS, { paragraphStyles: { "fr-text-gray": "Gray", "fr-text-bordered": "Bordered", "fr-text-spaced": "Spaced", "fr-text-uppercase": "Uppercase" }, paragraphMultipleStyles: !0 }), Ee.FE.PLUGINS.paragraphStyle = function(s) {
        return {
            _init: function() {},
            apply: function(e, t, n) {
                void 0 === t && (t = s.opts.paragraphStyles), void 0 === n && (n = s.opts.paragraphMultipleStyles);
                var r = "";
                n || ((r = Object.keys(t)).splice(r.indexOf(e), 1), r = r.join(" ")), s.selection.save(), s.html.wrap(!0, !0, !0, !0), s.selection.restore();
                var i = s.selection.blocks();
                s.selection.save();
                for (var a = Ee(i[0]).hasClass(e), o = 0; o < i.length; o++) Ee(i[o]).removeClass(r).toggleClass(e, !a), Ee(i[o]).hasClass("fr-temp-div") && Ee(i[o]).removeClass("fr-temp-div"), "" === Ee(i[o]).attr("class") && Ee(i[o]).removeAttr("class");
                s.html.unwrap(), s.selection.restore()
            },
            refreshOnShow: function(e, t) {
                var n = s.selection.blocks();
                if (n.length) {
                    var r = Ee(n[0]);
                    t.find(".fr-command").each(function() {
                        var e = Ee(this).data("param1"),
                            t = r.hasClass(e);
                        Ee(this).toggleClass("fr-active", t).attr("aria-selected", t)
                    })
                }
            }
        }
    }, Ee.FE.RegisterCommand("paragraphStyle", {
        type: "dropdown",
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.paragraphStyles;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command ' + n + '" tabIndex="-1" role="option" data-cmd="paragraphStyle" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.language.translate(t[n]) + "</a></li>");
            return e += "</ul>"
        },
        title: "Paragraph Style",
        callback: function(e, t) { this.paragraphStyle.apply(t) },
        refreshOnShow: function(e, t) { this.paragraphStyle.refreshOnShow(e, t) },
        plugin: "paragraphStyle"
    }), Ee.FE.DefineIcon("paragraphStyle", { NAME: "magic" }), Ee.FE.PLUGINS.print = function(i) {
        return {
            run: function() {
                var e = i.$el.html(),
                    t = null;
                i.shared.print_iframe ? t = i.shared.print_iframe : ((t = document.createElement("iframe")).name = "fr-print", t.style.position = "fixed", t.style.top = "0", t.style.left = "-9999px", t.style.height = "100%", t.style.width = "0", t.style.overflow = "hidden", t.style["z-index"] = "2147483647", t.style.tabIndex = "-1", document.body.appendChild(t), t.onload = function() { setTimeout(function() { i.events.disableBlur(), window.frames["fr-print"].focus(), window.frames["fr-print"].print(), i.$win.get(0).focus(), i.events.disableBlur(), i.events.focus() }, 0) }, i.events.on("shared.destroy", function() { t.remove() }), i.shared.print_iframe = t);
                var n = t.contentWindow;
                n.document.open(), n.document.write("<!DOCTYPE html><html><head><title>" + document.title + "</title>"), Array.prototype.forEach.call(document.querySelectorAll("style"), function(e) { e = e.cloneNode(!0), n.document.write(e.outerHTML) });
                var r = document.querySelectorAll("link[rel=stylesheet]");
                Array.prototype.forEach.call(r, function(e) {
                    var t = document.createElement("link");
                    t.rel = e.rel, t.href = e.href, t.media = "print", t.type = "text/css", t.media = "all", n.document.write(t.outerHTML)
                }), n.document.write('</head><body style="text-align: ' + ("rtl" == i.opts.direction ? "right" : "left") + "; direction: " + i.opts.direction + ';"><div class="fr-view">'), n.document.write(e), n.document.write("</div></body></html>"), n.document.close()
            }
        }
    }, Ee.FE.DefineIcon("print", { NAME: "print" }), Ee.FE.RegisterCommand("print", { title: "Print", undo: !1, focus: !1, plugin: "print", callback: function() { this.print.run() } }), Ee.extend(Ee.FE.DEFAULTS, { quickInsertButtons: ["image", "video", "embedly", "table", "ul", "ol", "hr"], quickInsertTags: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "blockquote"] }), Ee.FE.QUICK_INSERT_BUTTONS = {}, Ee.FE.DefineIcon("quickInsert", { PATH: '<path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/>', template: "svg" }), Ee.FE.RegisterQuickInsertButton = function(e, t) { Ee.FE.QUICK_INSERT_BUTTONS[e] = Ee.extend({ undo: !0 }, t) }, Ee.FE.RegisterQuickInsertButton("image", {
        icon: "insertImage",
        requiredPlugin: "image",
        title: "Insert Image",
        undo: !1,
        callback: function() {
            var e = this;
            e.shared.$qi_image_input || (e.shared.$qi_image_input = Ee('<input accept="image/*" name="quickInsertImage' + this.id + '" style="display: none;" type="file">'), Ee("body:first").append(e.shared.$qi_image_input), e.events.$on(e.shared.$qi_image_input, "change", function() {
                var e = Ee(this).data("inst");
                this.files && (e.quickInsert.hide(), e.image.upload(this.files)), Ee(this).val("")
            }, !0)), e.$qi_image_input = e.shared.$qi_image_input, e.helpers.isMobile() && e.selection.save(), e.events.disableBlur(), e.$qi_image_input.data("inst", e).trigger("click")
        }
    }), Ee.FE.RegisterQuickInsertButton("video", {
        icon: "insertVideo",
        requiredPlugin: "video",
        title: "Insert Video",
        undo: !1,
        callback: function() {
            var e = prompt(this.language.translate("Paste the URL of the video you want to insert."));
            e && this.video.insertByURL(e)
        }
    }), Ee.FE.RegisterQuickInsertButton("embedly", {
        icon: "embedly",
        requiredPlugin: "embedly",
        title: "Embed URL",
        undo: !1,
        callback: function() {
            var e = prompt(this.language.translate("Paste the URL of any web content you want to insert."));
            e && this.embedly.add(e)
        }
    }), Ee.FE.RegisterQuickInsertButton("table", { icon: "insertTable", requiredPlugin: "table", title: "Insert Table", callback: function() { this.table.insert(2, 2) } }), Ee.FE.RegisterQuickInsertButton("ol", { icon: "formatOL", requiredPlugin: "lists", title: "Ordered List", callback: function() { this.lists.format("OL") } }), Ee.FE.RegisterQuickInsertButton("ul", { icon: "formatUL", requiredPlugin: "lists", title: "Unordered List", callback: function() { this.lists.format("UL") } }), Ee.FE.RegisterQuickInsertButton("hr", { icon: "insertHR", title: "Insert Horizontal Line", callback: function() { this.commands.insertHR() } }), Ee.FE.PLUGINS.quickInsert = function(o) {
        var s, l;

        function t(e) {
            var t, n, r;
            t = e.offset().top - o.$box.offset().top, n = 0 - s.outerWidth(), o.opts.enter != Ee.FE.ENTER_BR ? r = (s.outerHeight() - e.outerHeight()) / 2 : (Ee("<span>" + Ee.FE.INVISIBLE_SPACE + "</span>").insertAfter(e), r = (s.outerHeight() - e.next().outerHeight()) / 2, e.next().remove()), o.opts.iframe && (t += o.$iframe.offset().top - o.helpers.scrollTop()), s.hasClass("fr-on") && 0 <= t && l.css("top", t - r), 0 <= t && t - r <= o.$box.outerHeight() - e.outerHeight() ? (s.hasClass("fr-hidden") && (s.hasClass("fr-on") && a(), s.removeClass("fr-hidden")), s.css("top", t - r)) : s.hasClass("fr-visible") && (s.addClass("fr-hidden"), d()), s.css("left", n)
        }

        function n(e) {
            s || function() {
                o.shared.$quick_insert || (o.shared.$quick_insert = Ee('<div class="fr-quick-insert"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + o.language.translate("Quick Insert") + '">' + o.icon.create("quickInsert") + "</a></div>"));
                s = o.shared.$quick_insert, o.tooltip.bind(o.$box, ".fr-quick-insert > a.fr-floating-btn"), o.events.on("destroy", function() { s.removeClass("fr-on").appendTo(Ee("body:first")).css("left", -9999).css("top", -9999), l && (d(), l.appendTo(Ee("body:first"))) }, !0), o.events.on("shared.destroy", function() { s.html("").removeData().remove(), s = null, l && (l.html("").removeData().remove(), l = null) }, !0), o.events.on("commands.before", i), o.events.on("commands.after", function() { o.popups.areVisible() || r() }), o.events.bindClick(o.$box, ".fr-quick-insert > a", a), o.events.bindClick(o.$box, ".fr-qi-helper > a.fr-btn", function(e) {
                    var t = Ee(e.currentTarget).data("cmd");
                    if (!1 === o.events.trigger("quickInsert.commands.before", [t])) return !1;
                    Ee.FE.QUICK_INSERT_BUTTONS[t].callback.apply(o, [e.currentTarget]), Ee.FE.QUICK_INSERT_BUTTONS[t].undo && o.undo.saveStep(), o.events.trigger("quickInsert.commands.after", [t]), o.quickInsert.hide()
                }), o.events.$on(o.$wp, "scroll", function() { s.hasClass("fr-visible") && t(s.data("tag")) })
            }(), s.hasClass("fr-on") && d(), o.$box.append(s), t(e), s.data("tag", e), s.addClass("fr-visible")
        }

        function r() {
            if (o.core.hasFocus()) {
                var e = o.selection.element();
                if (o.opts.enter == Ee.FE.ENTER_BR || o.node.isBlock(e) || (e = o.node.blockParent(e)), o.opts.enter == Ee.FE.ENTER_BR && !o.node.isBlock(e)) {
                    var t = o.node.deepestParent(e);
                    t && (e = t)
                }
                e && (o.opts.enter != Ee.FE.ENTER_BR && o.node.isEmpty(e) && o.node.isElement(e.parentNode) && 0 <= o.opts.quickInsertTags.indexOf(e.tagName.toLowerCase()) || o.opts.enter == Ee.FE.ENTER_BR && ("BR" == e.tagName && (!e.previousSibling || "BR" == e.previousSibling.tagName || o.node.isBlock(e.previousSibling)) || o.node.isEmpty(e) && (!e.previousSibling || "BR" == e.previousSibling.tagName || o.node.isBlock(e.previousSibling)) && (!e.nextSibling || "BR" == e.nextSibling.tagName || o.node.isBlock(e.nextSibling)))) ? s && s.data("tag").is(Ee(e)) && s.hasClass("fr-on") ? d() : o.selection.isCollapsed() && n(Ee(e)) : i()
            }
        }

        function i() { s && (s.hasClass("fr-on") && d(), s.removeClass("fr-visible fr-on"), s.css("left", -9999).css("top", -9999)) }

        function a(e) {
            if (e && e.preventDefault(), s.hasClass("fr-on") && !s.hasClass("fr-hidden")) d();
            else {
                if (!o.shared.$qi_helper) {
                    for (var t = o.opts.quickInsertButtons, n = '<div class="fr-qi-helper">', r = 0, i = 0; i < t.length; i++) {
                        var a = Ee.FE.QUICK_INSERT_BUTTONS[t[i]];
                        a && (!a.requiredPlugin || Ee.FE.PLUGINS[a.requiredPlugin] && 0 <= o.opts.pluginsEnabled.indexOf(a.requiredPlugin)) && (n += '<a class="fr-btn fr-floating-btn" role="button" title="' + o.language.translate(a.title) + '" tabIndex="-1" data-cmd="' + t[i] + '" style="transition-delay: ' + .025 * r++ + 's;">' + o.icon.create(a.icon) + "</a>")
                    }
                    n += "</div>", o.shared.$qi_helper = Ee(n), o.tooltip.bind(o.shared.$qi_helper, "> a.fr-btn"), o.events.$on(o.shared.$qi_helper, "mousedown", function(e) { e.preventDefault() }, !0)
                }(l = o.shared.$qi_helper).appendTo(o.$box), setTimeout(function() { l.css("top", parseFloat(s.css("top"))), l.css("left", parseFloat(s.css("left")) + s.outerWidth()), l.find("a").addClass("fr-size-1"), s.addClass("fr-on") }, 10)
            }
        }

        function d() {
            var e = o.$box.find(".fr-qi-helper");
            e.length && (e.find("a").removeClass("fr-size-1"), e.css("left", -9999), s.hasClass("fr-hidden") || s.removeClass("fr-on"))
        }
        return {
            _init: function() {
                if (!o.$wp) return !1;
                o.opts.iframe && o.$el.parent("html").find("head").append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css">'), o.popups.onShow("image.edit", i), o.events.on("mouseup", r), o.helpers.isMobile() && o.events.$on(Ee(o.o_doc), "selectionchange", r), o.events.on("blur", i), o.events.on("keyup", r), o.events.on("keydown", function() { setTimeout(function() { r() }, 0) })
            },
            hide: i
        }
    }, Ee.FE.PLUGINS.quote = function(r) {
        function i(e) { for (; e.parentNode && e.parentNode != r.el;) e = e.parentNode; return e }
        return {
            apply: function(e) {
                r.selection.save(), r.html.wrap(!0, !0, !0, !0), r.selection.restore(), "increase" == e ? function() {
                    var e, t = r.selection.blocks();
                    for (e = 0; e < t.length; e++) t[e] = i(t[e]);
                    r.selection.save();
                    var n = Ee("<blockquote>");
                    for (n.insertBefore(t[0]), e = 0; e < t.length; e++) n.append(t[e]);
                    r.html.unwrap(), r.selection.restore()
                }() : "decrease" == e && function() {
                    var e, t = r.selection.blocks();
                    for (e = 0; e < t.length; e++) "BLOCKQUOTE" != t[e].tagName && (t[e] = Ee(t[e]).parentsUntil(r.$el, "BLOCKQUOTE").get(0));
                    for (r.selection.save(), e = 0; e < t.length; e++) t[e] && Ee(t[e]).replaceWith(t[e].innerHTML);
                    r.html.unwrap(), r.selection.restore()
                }()
            }
        }
    }, Ee.FE.RegisterShortcut(Ee.FE.KEYCODE.SINGLE_QUOTE, "quote", "increase", "'"), Ee.FE.RegisterShortcut(Ee.FE.KEYCODE.SINGLE_QUOTE, "quote", "decrease", "'", !0), Ee.FE.RegisterCommand("quote", { title: "Quote", type: "dropdown", options: { increase: "Increase", decrease: "Decrease" }, callback: function(e, t) { this.quote.apply(t) }, plugin: "quote" }), Ee.FE.DefineIcon("quote", { NAME: "quote-left" }), Ee.extend(Ee.FE.DEFAULTS, { saveInterval: 1e4, saveURL: null, saveParams: {}, saveParam: "body", saveMethod: "POST" }), Ee.FE.PLUGINS.save = function(s) {
        var e = null,
            l = null,
            t = !1,
            d = 1,
            c = 2,
            n = {};

        function f(e, t) { s.events.trigger("save.error", [{ code: e, message: n[e] }, t]) }

        function r(e) {
            void 0 === e && (e = s.html.get());
            var t = e,
                n = s.events.trigger("save.before", [e]);
            if (!1 === n) return !1;
            if ("string" == typeof n && (e = n), s.opts.saveURL) {
                var r = {};
                for (var i in s.opts.saveParams)
                    if (s.opts.saveParams.hasOwnProperty(i)) {
                        var a = s.opts.saveParams[i];
                        r[i] = "function" == typeof a ? a.call(this) : a
                    }
                var o = {};
                o[s.opts.saveParam] = e, Ee.ajax({ type: s.opts.saveMethod, url: s.opts.saveURL, data: Ee.extend(o, r), crossDomain: s.opts.requestWithCORS, xhrFields: { withCredentials: s.opts.requestWithCredentials }, headers: s.opts.requestHeaders }).done(function(e) { l = t, s.events.trigger("save.after", [e]) }).fail(function(e) { f(c, e.response || e.responseText) })
            } else f(d)
        }

        function i() {
            clearTimeout(e), e = setTimeout(function() {
                var e = s.html.get();
                (l != e || t) && (t = !1, r(l = e))
            }, s.opts.saveInterval)
        }
        return n[d] = "Missing saveURL option.", n[c] = "Something went wrong during save.", { _init: function() { s.opts.saveInterval && (l = s.html.get(), s.events.on("contentChanged", i), s.events.on("keydown destroy", function() { clearTimeout(e) })) }, save: r, reset: function() { i(), t = !1 }, force: function() { t = !0 } }
    }, Ee.FE.DefineIcon("save", { NAME: "floppy-o" }), Ee.FE.RegisterCommand("save", { title: "Save", undo: !1, focus: !1, refreshAfterCallback: !1, callback: function() { this.save.save() }, plugin: "save" }), Ee.extend(Ee.FE.DEFAULTS, { specialCharactersSets: [{ title: "Latin", list: [{ "char": "&iexcl;", desc: "INVERTED EXCLAMATION MARK" }, { "char": "&cent;", desc: "CENT SIGN" }, { "char": "&pound;", desc: "POUND SIGN" }, { "char": "&curren;", desc: "CURRENCY SIGN" }, { "char": "&yen;", desc: "YEN SIGN" }, { "char": "&brvbar;", desc: "BROKEN BAR" }, { "char": "&sect;", desc: "SECTION SIGN" }, { "char": "&uml;", desc: "DIAERESIS" }, { "char": "&copy;", desc: "COPYRIGHT SIGN" }, { "char": "&trade;", desc: "TRADEMARK SIGN" }, { "char": "&ordf;", desc: "FEMININE ORDINAL INDICATOR" }, { "char": "&laquo;", desc: "LEFT-POINTING DOUBLE ANGLE QUOTATION MARK" }, { "char": "&not;", desc: "NOT SIGN" }, { "char": "&reg;", desc: "REGISTERED SIGN" }, { "char": "&macr;", desc: "MACRON" }, { "char": "&deg;", desc: "DEGREE SIGN" }, { "char": "&plusmn;", desc: "PLUS-MINUS SIGN" }, { "char": "&sup2;", desc: "SUPERSCRIPT TWO" }, { "char": "&sup3;", desc: "SUPERSCRIPT THREE" }, { "char": "&acute;", desc: "ACUTE ACCENT" }, { "char": "&micro;", desc: "MICRO SIGN" }, { "char": "&para;", desc: "PILCROW SIGN" }, { "char": "&middot;", desc: "MIDDLE DOT" }, { "char": "&cedil;", desc: "CEDILLA" }, { "char": "&sup1;", desc: "SUPERSCRIPT ONE" }, { "char": "&ordm;", desc: "MASCULINE ORDINAL INDICATOR" }, { "char": "&raquo;", desc: "RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK" }, { "char": "&frac14;", desc: "VULGAR FRACTION ONE QUARTER" }, { "char": "&frac12;", desc: "VULGAR FRACTION ONE HALF" }, { "char": "&frac34;", desc: "VULGAR FRACTION THREE QUARTERS" }, { "char": "&iquest;", desc: "INVERTED QUESTION MARK" }, { "char": "&Agrave;", desc: "LATIN CAPITAL LETTER A WITH GRAVE" }, { "char": "&Aacute;", desc: "LATIN CAPITAL LETTER A WITH ACUTE" }, { "char": "&Acirc;", desc: "LATIN CAPITAL LETTER A WITH CIRCUMFLEX" }, { "char": "&Atilde;", desc: "LATIN CAPITAL LETTER A WITH TILDE" }, { "char": "&Auml;", desc: "LATIN CAPITAL LETTER A WITH DIAERESIS " }, { "char": "&Aring;", desc: "LATIN CAPITAL LETTER A WITH RING ABOVE" }, { "char": "&AElig;", desc: "LATIN CAPITAL LETTER AE" }, { "char": "&Ccedil;", desc: "LATIN CAPITAL LETTER C WITH CEDILLA" }, { "char": "&Egrave;", desc: "LATIN CAPITAL LETTER E WITH GRAVE" }, { "char": "&Eacute;", desc: "LATIN CAPITAL LETTER E WITH ACUTE" }, { "char": "&Ecirc;", desc: "LATIN CAPITAL LETTER E WITH CIRCUMFLEX" }, { "char": "&Euml;", desc: "LATIN CAPITAL LETTER E WITH DIAERESIS" }, { "char": "&Igrave;", desc: "LATIN CAPITAL LETTER I WITH GRAVE" }, { "char": "&Iacute;", desc: "LATIN CAPITAL LETTER I WITH ACUTE" }, { "char": "&Icirc;", desc: "LATIN CAPITAL LETTER I WITH CIRCUMFLEX" }, { "char": "&Iuml;", desc: "LATIN CAPITAL LETTER I WITH DIAERESIS" }, { "char": "&ETH;", desc: "LATIN CAPITAL LETTER ETH" }, { "char": "&Ntilde;", desc: "LATIN CAPITAL LETTER N WITH TILDE" }, { "char": "&Ograve;", desc: "LATIN CAPITAL LETTER O WITH GRAVE" }, { "char": "&Oacute;", desc: "LATIN CAPITAL LETTER O WITH ACUTE" }, { "char": "&Ocirc;", desc: "LATIN CAPITAL LETTER O WITH CIRCUMFLEX" }, { "char": "&Otilde;", desc: "LATIN CAPITAL LETTER O WITH TILDE" }, { "char": "&Ouml;", desc: "LATIN CAPITAL LETTER O WITH DIAERESIS" }, { "char": "&times;", desc: "MULTIPLICATION SIGN" }, { "char": "&Oslash;", desc: "LATIN CAPITAL LETTER O WITH STROKE" }, { "char": "&Ugrave;", desc: "LATIN CAPITAL LETTER U WITH GRAVE" }, { "char": "&Uacute;", desc: "LATIN CAPITAL LETTER U WITH ACUTE" }, { "char": "&Ucirc;", desc: "LATIN CAPITAL LETTER U WITH CIRCUMFLEX" }, { "char": "&Uuml;", desc: "LATIN CAPITAL LETTER U WITH DIAERESIS" }, { "char": "&Yacute;", desc: "LATIN CAPITAL LETTER Y WITH ACUTE" }, { "char": "&THORN;", desc: "LATIN CAPITAL LETTER THORN" }, { "char": "&szlig;", desc: "LATIN SMALL LETTER SHARP S" }, { "char": "&agrave;", desc: "LATIN SMALL LETTER A WITH GRAVE" }, { "char": "&aacute;", desc: "LATIN SMALL LETTER A WITH ACUTE " }, { "char": "&acirc;", desc: "LATIN SMALL LETTER A WITH CIRCUMFLEX" }, { "char": "&atilde;", desc: "LATIN SMALL LETTER A WITH TILDE" }, { "char": "&auml;", desc: "LATIN SMALL LETTER A WITH DIAERESIS" }, { "char": "&aring;", desc: "LATIN SMALL LETTER A WITH RING ABOVE" }, { "char": "&aelig;", desc: "LATIN SMALL LETTER AE" }, { "char": "&ccedil;", desc: "LATIN SMALL LETTER C WITH CEDILLA" }, { "char": "&egrave;", desc: "LATIN SMALL LETTER E WITH GRAVE" }, { "char": "&eacute;", desc: "LATIN SMALL LETTER E WITH ACUTE" }, { "char": "&ecirc;", desc: "LATIN SMALL LETTER E WITH CIRCUMFLEX" }, { "char": "&euml;", desc: "LATIN SMALL LETTER E WITH DIAERESIS" }, { "char": "&igrave;", desc: "LATIN SMALL LETTER I WITH GRAVE" }, { "char": "&iacute;", desc: "LATIN SMALL LETTER I WITH ACUTE" }, { "char": "&icirc;", desc: "LATIN SMALL LETTER I WITH CIRCUMFLEX" }, { "char": "&iuml;", desc: "LATIN SMALL LETTER I WITH DIAERESIS" }, { "char": "&eth;", desc: "LATIN SMALL LETTER ETH" }, { "char": "&ntilde;", desc: "LATIN SMALL LETTER N WITH TILDE" }, { "char": "&ograve;", desc: "LATIN SMALL LETTER O WITH GRAVE" }, { "char": "&oacute;", desc: "LATIN SMALL LETTER O WITH ACUTE" }, { "char": "&ocirc;", desc: "LATIN SMALL LETTER O WITH CIRCUMFLEX" }, { "char": "&otilde;", desc: "LATIN SMALL LETTER O WITH TILDE" }, { "char": "&ouml;", desc: "LATIN SMALL LETTER O WITH DIAERESIS" }, { "char": "&divide;", desc: "DIVISION SIGN" }, { "char": "&oslash;", desc: "LATIN SMALL LETTER O WITH STROKE" }, { "char": "&ugrave;", desc: "LATIN SMALL LETTER U WITH GRAVE" }, { "char": "&uacute;", desc: "LATIN SMALL LETTER U WITH ACUTE" }, { "char": "&ucirc;", desc: "LATIN SMALL LETTER U WITH CIRCUMFLEX" }, { "char": "&uuml;", desc: "LATIN SMALL LETTER U WITH DIAERESIS" }, { "char": "&yacute;", desc: "LATIN SMALL LETTER Y WITH ACUTE" }, { "char": "&thorn;", desc: "LATIN SMALL LETTER THORN" }, { "char": "&yuml;", desc: "LATIN SMALL LETTER Y WITH DIAERESIS" }] }, { title: "Greek", list: [{ "char": "&Alpha;", desc: "GREEK CAPITAL LETTER ALPHA" }, { "char": "&Beta;", desc: "GREEK CAPITAL LETTER BETA" }, { "char": "&Gamma;", desc: "GREEK CAPITAL LETTER GAMMA" }, { "char": "&Delta;", desc: "GREEK CAPITAL LETTER DELTA" }, { "char": "&Epsilon;", desc: "GREEK CAPITAL LETTER EPSILON" }, { "char": "&Zeta;", desc: "GREEK CAPITAL LETTER ZETA" }, { "char": "&Eta;", desc: "GREEK CAPITAL LETTER ETA" }, { "char": "&Theta;", desc: "GREEK CAPITAL LETTER THETA" }, { "char": "&Iota;", desc: "GREEK CAPITAL LETTER IOTA" }, { "char": "&Kappa;", desc: "GREEK CAPITAL LETTER KAPPA" }, { "char": "&Lambda;", desc: "GREEK CAPITAL LETTER LAMBDA" }, { "char": "&Mu;", desc: "GREEK CAPITAL LETTER MU" }, { "char": "&Nu;", desc: "GREEK CAPITAL LETTER NU" }, { "char": "&Xi;", desc: "GREEK CAPITAL LETTER XI" }, { "char": "&Omicron;", desc: "GREEK CAPITAL LETTER OMICRON" }, { "char": "&Pi;", desc: "GREEK CAPITAL LETTER PI" }, { "char": "&Rho;", desc: "GREEK CAPITAL LETTER RHO" }, { "char": "&Sigma;", desc: "GREEK CAPITAL LETTER SIGMA" }, { "char": "&Tau;", desc: "GREEK CAPITAL LETTER TAU" }, { "char": "&Upsilon;", desc: "GREEK CAPITAL LETTER UPSILON" }, { "char": "&Phi;", desc: "GREEK CAPITAL LETTER PHI" }, { "char": "&Chi;", desc: "GREEK CAPITAL LETTER CHI" }, { "char": "&Psi;", desc: "GREEK CAPITAL LETTER PSI" }, { "char": "&Omega;", desc: "GREEK CAPITAL LETTER OMEGA" }, { "char": "&alpha;", desc: "GREEK SMALL LETTER ALPHA" }, { "char": "&beta;", desc: "GREEK SMALL LETTER BETA" }, { "char": "&gamma;", desc: "GREEK SMALL LETTER GAMMA" }, { "char": "&delta;", desc: "GREEK SMALL LETTER DELTA" }, { "char": "&epsilon;", desc: "GREEK SMALL LETTER EPSILON" }, { "char": "&zeta;", desc: "GREEK SMALL LETTER ZETA" }, { "char": "&eta;", desc: "GREEK SMALL LETTER ETA" }, { "char": "&theta;", desc: "GREEK SMALL LETTER THETA" }, { "char": "&iota;", desc: "GREEK SMALL LETTER IOTA" }, { "char": "&kappa;", desc: "GREEK SMALL LETTER KAPPA" }, { "char": "&lambda;", desc: "GREEK SMALL LETTER LAMBDA" }, { "char": "&mu;", desc: "GREEK SMALL LETTER MU" }, { "char": "&nu;", desc: "GREEK SMALL LETTER NU" }, { "char": "&xi;", desc: "GREEK SMALL LETTER XI" }, { "char": "&omicron;", desc: "GREEK SMALL LETTER OMICRON" }, { "char": "&pi;", desc: "GREEK SMALL LETTER PI" }, { "char": "&rho;", desc: "GREEK SMALL LETTER RHO" }, { "char": "&sigmaf;", desc: "GREEK SMALL LETTER FINAL SIGMA" }, { "char": "&sigma;", desc: "GREEK SMALL LETTER SIGMA" }, { "char": "&tau;", desc: "GREEK SMALL LETTER TAU" }, { "char": "&upsilon;", desc: "GREEK SMALL LETTER UPSILON" }, { "char": "&phi;", desc: "GREEK SMALL LETTER PHI" }, { "char": "&chi;", desc: "GREEK SMALL LETTER CHI" }, { "char": "&psi;", desc: "GREEK SMALL LETTER PSI" }, { "char": "&omega;", desc: "GREEK SMALL LETTER OMEGA" }, { "char": "&thetasym;", desc: "GREEK THETA SYMBOL" }, { "char": "&upsih;", desc: "GREEK UPSILON WITH HOOK SYMBOL" }, { "char": "&straightphi;", desc: "GREEK PHI SYMBOL" }, { "char": "&piv;", desc: "GREEK PI SYMBOL" }, { "char": "&Gammad;", desc: "GREEK LETTER DIGAMMA" }, { "char": "&gammad;", desc: "GREEK SMALL LETTER DIGAMMA" }, { "char": "&varkappa;", desc: "GREEK KAPPA SYMBOL" }, { "char": "&varrho;", desc: "GREEK RHO SYMBOL" }, { "char": "&straightepsilon;", desc: "GREEK LUNATE EPSILON SYMBOL" }, { "char": "&backepsilon;", desc: "GREEK REVERSED LUNATE EPSILON SYMBOL" }] }, { title: "Cyrillic", list: [{ "char": "&#x400", desc: "CYRILLIC CAPITAL LETTER IE WITH GRAVE" }, { "char": "&#x401", desc: "CYRILLIC CAPITAL LETTER IO" }, { "char": "&#x402", desc: "CYRILLIC CAPITAL LETTER DJE" }, { "char": "&#x403", desc: "CYRILLIC CAPITAL LETTER GJE" }, { "char": "&#x404", desc: "CYRILLIC CAPITAL LETTER UKRAINIAN IE" }, { "char": "&#x405", desc: "CYRILLIC CAPITAL LETTER DZE" }, { "char": "&#x406", desc: "CYRILLIC CAPITAL LETTER BYELORUSSIAN-UKRAINIAN I" }, { "char": "&#x407", desc: "CYRILLIC CAPITAL LETTER YI" }, { "char": "&#x408", desc: "CYRILLIC CAPITAL LETTER JE" }, { "char": "&#x409", desc: "CYRILLIC CAPITAL LETTER LJE" }, { "char": "&#x40A", desc: "CYRILLIC CAPITAL LETTER NJE" }, { "char": "&#x40B", desc: "CYRILLIC CAPITAL LETTER TSHE" }, { "char": "&#x40C", desc: "CYRILLIC CAPITAL LETTER KJE" }, { "char": "&#x40D", desc: "CYRILLIC CAPITAL LETTER I WITH GRAVE" }, { "char": "&#x40E", desc: "CYRILLIC CAPITAL LETTER SHORT U" }, { "char": "&#x40F", desc: "CYRILLIC CAPITAL LETTER DZHE" }, { "char": "&#x410", desc: "CYRILLIC CAPITAL LETTER A" }, { "char": "&#x411", desc: "CYRILLIC CAPITAL LETTER BE" }, { "char": "&#x412", desc: "CYRILLIC CAPITAL LETTER VE" }, { "char": "&#x413", desc: "CYRILLIC CAPITAL LETTER GHE" }, { "char": "&#x414", desc: "CYRILLIC CAPITAL LETTER DE" }, { "char": "&#x415", desc: "CYRILLIC CAPITAL LETTER IE" }, { "char": "&#x416", desc: "CYRILLIC CAPITAL LETTER ZHE" }, { "char": "&#x417", desc: "CYRILLIC CAPITAL LETTER ZE" }, { "char": "&#x418", desc: "CYRILLIC CAPITAL LETTER I" }, { "char": "&#x419", desc: "CYRILLIC CAPITAL LETTER SHORT I" }, { "char": "&#x41A", desc: "CYRILLIC CAPITAL LETTER KA" }, { "char": "&#x41B", desc: "CYRILLIC CAPITAL LETTER EL" }, { "char": "&#x41C", desc: "CYRILLIC CAPITAL LETTER EM" }, { "char": "&#x41D", desc: "CYRILLIC CAPITAL LETTER EN" }, { "char": "&#x41E", desc: "CYRILLIC CAPITAL LETTER O" }, { "char": "&#x41F", desc: "CYRILLIC CAPITAL LETTER PE" }, { "char": "&#x420", desc: "CYRILLIC CAPITAL LETTER ER" }, { "char": "&#x421", desc: "CYRILLIC CAPITAL LETTER ES" }, { "char": "&#x422", desc: "CYRILLIC CAPITAL LETTER TE" }, { "char": "&#x423", desc: "CYRILLIC CAPITAL LETTER U" }, { "char": "&#x424", desc: "CYRILLIC CAPITAL LETTER EF" }, { "char": "&#x425", desc: "CYRILLIC CAPITAL LETTER HA" }, { "char": "&#x426", desc: "CYRILLIC CAPITAL LETTER TSE" }, { "char": "&#x427", desc: "CYRILLIC CAPITAL LETTER CHE" }, { "char": "&#x428", desc: "CYRILLIC CAPITAL LETTER SHA" }, { "char": "&#x429", desc: "CYRILLIC CAPITAL LETTER SHCHA" }, { "char": "&#x42A", desc: "CYRILLIC CAPITAL LETTER HARD SIGN" }, { "char": "&#x42B", desc: "CYRILLIC CAPITAL LETTER YERU" }, { "char": "&#x42C", desc: "CYRILLIC CAPITAL LETTER SOFT SIGN" }, { "char": "&#x42D", desc: "CYRILLIC CAPITAL LETTER E" }, { "char": "&#x42E", desc: "CYRILLIC CAPITAL LETTER YU" }, { "char": "&#x42F", desc: "CYRILLIC CAPITAL LETTER YA" }, { "char": "&#x430", desc: "CYRILLIC SMALL LETTER A" }, { "char": "&#x431", desc: "CYRILLIC SMALL LETTER BE" }, { "char": "&#x432", desc: "CYRILLIC SMALL LETTER VE" }, { "char": "&#x433", desc: "CYRILLIC SMALL LETTER GHE" }, { "char": "&#x434", desc: "CYRILLIC SMALL LETTER DE" }, { "char": "&#x435", desc: "CYRILLIC SMALL LETTER IE" }, { "char": "&#x436", desc: "CYRILLIC SMALL LETTER ZHE" }, { "char": "&#x437", desc: "CYRILLIC SMALL LETTER ZE" }, { "char": "&#x438", desc: "CYRILLIC SMALL LETTER I" }, { "char": "&#x439", desc: "CYRILLIC SMALL LETTER SHORT I" }, { "char": "&#x43A", desc: "CYRILLIC SMALL LETTER KA" }, { "char": "&#x43B", desc: "CYRILLIC SMALL LETTER EL" }, { "char": "&#x43C", desc: "CYRILLIC SMALL LETTER EM" }, { "char": "&#x43D", desc: "CYRILLIC SMALL LETTER EN" }, { "char": "&#x43E", desc: "CYRILLIC SMALL LETTER O" }, { "char": "&#x43F", desc: "CYRILLIC SMALL LETTER PE" }, { "char": "&#x440", desc: "CYRILLIC SMALL LETTER ER" }, { "char": "&#x441", desc: "CYRILLIC SMALL LETTER ES" }, { "char": "&#x442", desc: "CYRILLIC SMALL LETTER TE" }, { "char": "&#x443", desc: "CYRILLIC SMALL LETTER U" }, { "char": "&#x444", desc: "CYRILLIC SMALL LETTER EF" }, { "char": "&#x445", desc: "CYRILLIC SMALL LETTER HA" }, { "char": "&#x446", desc: "CYRILLIC SMALL LETTER TSE" }, { "char": "&#x447", desc: "CYRILLIC SMALL LETTER CHE" }, { "char": "&#x448", desc: "CYRILLIC SMALL LETTER SHA" }, { "char": "&#x449", desc: "CYRILLIC SMALL LETTER SHCHA" }, { "char": "&#x44A", desc: "CYRILLIC SMALL LETTER HARD SIGN" }, { "char": "&#x44B", desc: "CYRILLIC SMALL LETTER YERU" }, { "char": "&#x44C", desc: "CYRILLIC SMALL LETTER SOFT SIGN" }, { "char": "&#x44D", desc: "CYRILLIC SMALL LETTER E" }, { "char": "&#x44E", desc: "CYRILLIC SMALL LETTER YU" }, { "char": "&#x44F", desc: "CYRILLIC SMALL LETTER YA" }, { "char": "&#x450", desc: "CYRILLIC SMALL LETTER IE WITH GRAVE" }, { "char": "&#x451", desc: "CYRILLIC SMALL LETTER IO" }, { "char": "&#x452", desc: "CYRILLIC SMALL LETTER DJE" }, { "char": "&#x453", desc: "CYRILLIC SMALL LETTER GJE" }, { "char": "&#x454", desc: "CYRILLIC SMALL LETTER UKRAINIAN IE" }, { "char": "&#x455", desc: "CYRILLIC SMALL LETTER DZE" }, { "char": "&#x456", desc: "CYRILLIC SMALL LETTER BYELORUSSIAN-UKRAINIAN I" }, { "char": "&#x457", desc: "CYRILLIC SMALL LETTER YI" }, { "char": "&#x458", desc: "CYRILLIC SMALL LETTER JE" }, { "char": "&#x459", desc: "CYRILLIC SMALL LETTER LJE" }, { "char": "&#x45A", desc: "CYRILLIC SMALL LETTER NJE" }, { "char": "&#x45B", desc: "CYRILLIC SMALL LETTER TSHE" }, { "char": "&#x45C", desc: "CYRILLIC SMALL LETTER KJE" }, { "char": "&#x45D", desc: "CYRILLIC SMALL LETTER I WITH GRAVE" }, { "char": "&#x45E", desc: "CYRILLIC SMALL LETTER SHORT U" }, { "char": "&#x45F", desc: "CYRILLIC SMALL LETTER DZHE" }] }, { title: "Punctuation", list: [{ "char": "&ndash;", desc: "EN DASH" }, { "char": "&mdash;", desc: "EM DASH" }, { "char": "&lsquo;", desc: "LEFT SINGLE QUOTATION MARK" }, { "char": "&rsquo;", desc: "RIGHT SINGLE QUOTATION MARK" }, { "char": "&sbquo;", desc: "SINGLE LOW-9 QUOTATION MARK" }, { "char": "&ldquo;", desc: "LEFT DOUBLE QUOTATION MARK" }, { "char": "&rdquo;", desc: "RIGHT DOUBLE QUOTATION MARK" }, { "char": "&bdquo;", desc: "DOUBLE LOW-9 QUOTATION MARK" }, { "char": "&dagger;", desc: "DAGGER" }, { "char": "&Dagger;", desc: "DOUBLE DAGGER" }, { "char": "&bull;", desc: "BULLET" }, { "char": "&hellip;", desc: "HORIZONTAL ELLIPSIS" }, { "char": "&permil;", desc: "PER MILLE SIGN" }, { "char": "&prime;", desc: "PRIME" }, { "char": "&Prime;", desc: "DOUBLE PRIME" }, { "char": "&lsaquo;", desc: "SINGLE LEFT-POINTING ANGLE QUOTATION MARK" }, { "char": "&rsaquo;", desc: "SINGLE RIGHT-POINTING ANGLE QUOTATION MARK" }, { "char": "&oline;", desc: "OVERLINE" }, { "char": "&frasl;", desc: "FRACTION SLASH" }] }, { title: "Currency", list: [{ "char": "&#x20A0", desc: "EURO-CURRENCY SIGN" }, { "char": "&#x20A1", desc: "COLON SIGN" }, { "char": "&#x20A2", desc: "CRUZEIRO SIGN" }, { "char": "&#x20A3", desc: "FRENCH FRANC SIGN" }, { "char": "&#x20A4", desc: "LIRA SIGN" }, { "char": "&#x20A5", desc: "MILL SIGN" }, { "char": "&#x20A6", desc: "NAIRA SIGN" }, { "char": "&#x20A7", desc: "PESETA SIGN" }, { "char": "&#x20A8", desc: "RUPEE SIGN" }, { "char": "&#x20A9", desc: "WON SIGN" }, { "char": "&#x20AA", desc: "NEW SHEQEL SIGN" }, { "char": "&#x20AB", desc: "DONG SIGN" }, { "char": "&#x20AC", desc: "EURO SIGN" }, { "char": "&#x20AD", desc: "KIP SIGN" }, { "char": "&#x20AE", desc: "TUGRIK SIGN" }, { "char": "&#x20AF", desc: "DRACHMA SIGN" }, { "char": "&#x20B0", desc: "GERMAN PENNY SYMBOL" }, { "char": "&#x20B1", desc: "PESO SIGN" }, { "char": "&#x20B2", desc: "GUARANI SIGN" }, { "char": "&#x20B3", desc: "AUSTRAL SIGN" }, { "char": "&#x20B4", desc: "HRYVNIA SIGN" }, { "char": "&#x20B5", desc: "CEDI SIGN" }, { "char": "&#x20B6", desc: "LIVRE TOURNOIS SIGN" }, { "char": "&#x20B7", desc: "SPESMILO SIGN" }, { "char": "&#x20B8", desc: "TENGE SIGN" }, { "char": "&#x20B9", desc: "INDIAN RUPEE SIGN" }] }, { title: "Arrows", list: [{ "char": "&#x2190", desc: "LEFTWARDS ARROW" }, { "char": "&#x2191", desc: "UPWARDS ARROW" }, { "char": "&#x2192", desc: "RIGHTWARDS ARROW" }, { "char": "&#x2193", desc: "DOWNWARDS ARROW" }, { "char": "&#x2194", desc: "LEFT RIGHT ARROW" }, { "char": "&#x2195", desc: "UP DOWN ARROW" }, { "char": "&#x2196", desc: "NORTH WEST ARROW" }, { "char": "&#x2197", desc: "NORTH EAST ARROW" }, { "char": "&#x2198", desc: "SOUTH EAST ARROW" }, { "char": "&#x2199", desc: "SOUTH WEST ARROW" }, { "char": "&#x219A", desc: "LEFTWARDS ARROW WITH STROKE" }, { "char": "&#x219B", desc: "RIGHTWARDS ARROW WITH STROKE" }, { "char": "&#x219C", desc: "LEFTWARDS WAVE ARROW" }, { "char": "&#x219D", desc: "RIGHTWARDS WAVE ARROW" }, { "char": "&#x219E", desc: "LEFTWARDS TWO HEADED ARROW" }, { "char": "&#x219F", desc: "UPWARDS TWO HEADED ARROW" }, { "char": "&#x21A0", desc: "RIGHTWARDS TWO HEADED ARROW" }, { "char": "&#x21A1", desc: "DOWNWARDS TWO HEADED ARROW" }, { "char": "&#x21A2", desc: "LEFTWARDS ARROW WITH TAIL" }, { "char": "&#x21A3", desc: "RIGHTWARDS ARROW WITH TAIL" }, { "char": "&#x21A4", desc: "LEFTWARDS ARROW FROM BAR" }, { "char": "&#x21A5", desc: "UPWARDS ARROW FROM BAR" }, { "char": "&#x21A6", desc: "RIGHTWARDS ARROW FROM BAR" }, { "char": "&#x21A7", desc: "DOWNWARDS ARROW FROM BAR" }, { "char": "&#x21A8", desc: "UP DOWN ARROW WITH BASE" }, { "char": "&#x21A9", desc: "LEFTWARDS ARROW WITH HOOK" }, { "char": "&#x21AA", desc: "RIGHTWARDS ARROW WITH HOOK" }, { "char": "&#x21AB", desc: "LEFTWARDS ARROW WITH LOOP" }, { "char": "&#x21AC", desc: "RIGHTWARDS ARROW WITH LOOP" }, { "char": "&#x21AD", desc: "LEFT RIGHT WAVE ARROW" }, { "char": "&#x21AE", desc: "LEFT RIGHT ARROW WITH STROKE" }, { "char": "&#x21AF", desc: "DOWNWARDS ZIGZAG ARROW" }, { "char": "&#x21B0", desc: "UPWARDS ARROW WITH TIP LEFTWARDS" }, { "char": "&#x21B1", desc: "UPWARDS ARROW WITH TIP RIGHTWARDS" }, { "char": "&#x21B2", desc: "DOWNWARDS ARROW WITH TIP LEFTWARDS" }, { "char": "&#x21B3", desc: "DOWNWARDS ARROW WITH TIP RIGHTWARDS" }, { "char": "&#x21B4", desc: "RIGHTWARDS ARROW WITH CORNER DOWNWARDS" }, { "char": "&#x21B5", desc: "DOWNWARDS ARROW WITH CORNER LEFTWARDS" }, { "char": "&#x21B6", desc: "ANTICLOCKWISE TOP SEMICIRCLE ARROW" }, { "char": "&#x21B7", desc: "CLOCKWISE TOP SEMICIRCLE ARROW" }, { "char": "&#x21B8", desc: "NORTH WEST ARROW TO LONG BAR" }, { "char": "&#x21B9", desc: "LEFTWARDS ARROW TO BAR OVER RIGHTWARDS ARROW TO BAR" }, { "char": "&#x21BA", desc: "ANTICLOCKWISE OPEN CIRCLE ARROW" }, { "char": "&#x21BB", desc: "CLOCKWISE OPEN CIRCLE ARROW" }, { "char": "&#x21BC", desc: "LEFTWARDS HARPOON WITH BARB UPWARDS" }, { "char": "&#x21BD", desc: "LEFTWARDS HARPOON WITH BARB DOWNWARDS" }, { "char": "&#x21BE", desc: "UPWARDS HARPOON WITH BARB RIGHTWARDS" }, { "char": "&#x21BF", desc: "UPWARDS HARPOON WITH BARB LEFTWARDS" }, { "char": "&#x21C0", desc: "RIGHTWARDS HARPOON WITH BARB UPWARDS" }, { "char": "&#x21C1", desc: "RIGHTWARDS HARPOON WITH BARB DOWNWARDS" }, { "char": "&#x21C2", desc: "DOWNWARDS HARPOON WITH BARB RIGHTWARDS" }, { "char": "&#x21C3", desc: "DOWNWARDS HARPOON WITH BARB LEFTWARDS" }, { "char": "&#x21C4", desc: "RIGHTWARDS ARROW OVER LEFTWARDS ARROW" }, { "char": "&#x21C5", desc: "UPWARDS ARROW LEFTWARDS OF DOWNWARDS ARROW" }, { "char": "&#x21C6", desc: "LEFTWARDS ARROW OVER RIGHTWARDS ARROW" }, { "char": "&#x21C7", desc: "LEFTWARDS PAIRED ARROWS" }, { "char": "&#x21C8", desc: "UPWARDS PAIRED ARROWS" }, { "char": "&#x21C9", desc: "RIGHTWARDS PAIRED ARROWS" }, { "char": "&#x21CA", desc: "DOWNWARDS PAIRED ARROWS" }, { "char": "&#x21CB", desc: "LEFTWARDS HARPOON OVER RIGHTWARDS HARPOON" }, { "char": "&#x21CC", desc: "RIGHTWARDS HARPOON OVER LEFTWARDS HARPOON" }, { "char": "&#x21CD", desc: "LEFTWARDS DOUBLE ARROW WITH STROKE" }, { "char": "&#x21CE", desc: "LEFT RIGHT DOUBLE ARROW WITH STROKE" }, { "char": "&#x21CF", desc: "RIGHTWARDS DOUBLE ARROW WITH STROKE" }, { "char": "&#x21D0", desc: "LEFTWARDS DOUBLE ARROW" }, { "char": "&#x21D1", desc: "UPWARDS DOUBLE ARROW" }, { "char": "&#x21D2", desc: "RIGHTWARDS DOUBLE ARROW" }, { "char": "&#x21D3", desc: "DOWNWARDS DOUBLE ARROW" }, { "char": "&#x21D4", desc: "LEFT RIGHT DOUBLE ARROW" }, { "char": "&#x21D5", desc: "UP DOWN DOUBLE ARROW" }, { "char": "&#x21D6", desc: "NORTH WEST DOUBLE ARROW" }, { "char": "&#x21D7", desc: "NORTH EAST DOUBLE ARROW" }, { "char": "&#x21D8", desc: "SOUTH EAST DOUBLE ARROW" }, { "char": "&#x21D9", desc: "SOUTH WEST DOUBLE ARROW" }, { "char": "&#x21DA", desc: "LEFTWARDS TRIPLE ARROW" }, { "char": "&#x21DB", desc: "RIGHTWARDS TRIPLE ARROW" }, { "char": "&#x21DC", desc: "LEFTWARDS SQUIGGLE ARROW" }, { "char": "&#x21DD", desc: "RIGHTWARDS SQUIGGLE ARROW" }, { "char": "&#x21DE", desc: "UPWARDS ARROW WITH DOUBLE STROKE" }, { "char": "&#x21DF", desc: "DOWNWARDS ARROW WITH DOUBLE STROKE" }, { "char": "&#x21E0", desc: "LEFTWARDS DASHED ARROW" }, { "char": "&#x21E1", desc: "UPWARDS DASHED ARROW" }, { "char": "&#x21E2", desc: "RIGHTWARDS DASHED ARROW" }, { "char": "&#x21E3", desc: "DOWNWARDS DASHED ARROW" }, { "char": "&#x21E4", desc: "LEFTWARDS ARROW TO BAR" }, { "char": "&#x21E5", desc: "RIGHTWARDS ARROW TO BAR" }, { "char": "&#x21E6", desc: "LEFTWARDS WHITE ARROW" }, { "char": "&#x21E7", desc: "UPWARDS WHITE ARROW" }, { "char": "&#x21E8", desc: "RIGHTWARDS WHITE ARROW" }, { "char": "&#x21E9", desc: "DOWNWARDS WHITE ARROW" }, { "char": "&#x21EA", desc: "UPWARDS WHITE ARROW FROM BAR" }, { "char": "&#x21EB", desc: "UPWARDS WHITE ARROW ON PEDESTAL" }, { "char": "&#x21EC", desc: "UPWARDS WHITE ARROW ON PEDESTAL WITH HORIZONTAL BAR" }, { "char": "&#x21ED", desc: "UPWARDS WHITE ARROW ON PEDESTAL WITH VERTICAL BAR" }, { "char": "&#x21EE", desc: "UPWARDS WHITE DOUBLE ARROW" }, { "char": "&#x21EF", desc: "UPWARDS WHITE DOUBLE ARROW ON PEDESTAL" }, { "char": "&#x21F0", desc: "RIGHTWARDS WHITE ARROW FROM WALL" }, { "char": "&#x21F1", desc: "NORTH WEST ARROW TO CORNER" }, { "char": "&#x21F2", desc: "SOUTH EAST ARROW TO CORNER" }, { "char": "&#x21F3", desc: "UP DOWN WHITE ARROW" }, { "char": "&#x21F4", desc: "RIGHT ARROW WITH SMALL CIRCLE" }, { "char": "&#x21F5", desc: "DOWNWARDS ARROW LEFTWARDS OF UPWARDS ARROW" }, { "char": "&#x21F6", desc: "THREE RIGHTWARDS ARROWS" }, { "char": "&#x21F7", desc: "LEFTWARDS ARROW WITH VERTICAL STROKE" }, { "char": "&#x21F8", desc: "RIGHTWARDS ARROW WITH VERTICAL STROKE" }, { "char": "&#x21F9", desc: "LEFT RIGHT ARROW WITH VERTICAL STROKE" }, { "char": "&#x21FA", desc: "LEFTWARDS ARROW WITH DOUBLE VERTICAL STROKE" }, { "char": "&#x21FB", desc: "RIGHTWARDS ARROW WITH DOUBLE VERTICAL STROKE" }, { "char": "&#x21FC", desc: "LEFT RIGHT ARROW WITH DOUBLE VERTICAL STROKE" }, { "char": "&#x21FD", desc: "LEFTWARDS OPEN-HEADED ARROW" }, { "char": "&#x21FE", desc: "RIGHTWARDS OPEN-HEADED ARROW" }, { "char": "&#x21FF", desc: "LEFT RIGHT OPEN-HEADED ARROW" }] }, { title: "Math", list: [{ "char": "&forall;", desc: "FOR ALL" }, { "char": "&part;", desc: "PARTIAL DIFFERENTIAL" }, { "char": "&exist;", desc: "THERE EXISTS" }, { "char": "&empty;", desc: "EMPTY SET" }, { "char": "&nabla;", desc: "NABLA" }, { "char": "&isin;", desc: "ELEMENT OF" }, { "char": "&notin;", desc: "NOT AN ELEMENT OF" }, { "char": "&ni;", desc: "CONTAINS AS MEMBER" }, { "char": "&prod;", desc: "N-ARY PRODUCT" }, { "char": "&sum;", desc: "N-ARY SUMMATION" }, { "char": "&minus;", desc: "MINUS SIGN" }, { "char": "&lowast;", desc: "ASTERISK OPERATOR" }, { "char": "&radic;", desc: "SQUARE ROOT" }, { "char": "&prop;", desc: "PROPORTIONAL TO" }, { "char": "&infin;", desc: "INFINITY" }, { "char": "&ang;", desc: "ANGLE" }, { "char": "&and;", desc: "LOGICAL AND" }, { "char": "&or;", desc: "LOGICAL OR" }, { "char": "&cap;", desc: "INTERSECTION" }, { "char": "&cup;", desc: "UNION" }, { "char": "&int;", desc: "INTEGRAL" }, { "char": "&there4;", desc: "THEREFORE" }, { "char": "&sim;", desc: "TILDE OPERATOR" }, { "char": "&cong;", desc: "APPROXIMATELY EQUAL TO" }, { "char": "&asymp;", desc: "ALMOST EQUAL TO" }, { "char": "&ne;", desc: "NOT EQUAL TO" }, { "char": "&equiv;", desc: "IDENTICAL TO" }, { "char": "&le;", desc: "LESS-THAN OR EQUAL TO" }, { "char": "&ge;", desc: "GREATER-THAN OR EQUAL TO" }, { "char": "&sub;", desc: "SUBSET OF" }, { "char": "&sup;", desc: "SUPERSET OF" }, { "char": "&nsub;", desc: "NOT A SUBSET OF" }, { "char": "&sube;", desc: "SUBSET OF OR EQUAL TO" }, { "char": "&supe;", desc: "SUPERSET OF OR EQUAL TO" }, { "char": "&oplus;", desc: "CIRCLED PLUS" }, { "char": "&otimes;", desc: "CIRCLED TIMES" }, { "char": "&perp;", desc: "UP TACK" }] }, { title: "Misc", list: [{ "char": "&spades;", desc: "BLACK SPADE SUIT" }, { "char": "&clubs;", desc: "BLACK CLUB SUIT" }, { "char": "&hearts;", desc: "BLACK HEART SUIT" }, { "char": "&diams;", desc: "BLACK DIAMOND SUIT" }, { "char": "&#x2669", desc: "QUARTER NOTE" }, { "char": "&#x266A", desc: "EIGHTH NOTE" }, { "char": "&#x266B", desc: "BEAMED EIGHTH NOTES" }, { "char": "&#x266C", desc: "BEAMED SIXTEENTH NOTES" }, { "char": "&#x266D", desc: "MUSIC FLAT SIGN" }, { "char": "&#x266E", desc: "MUSIC NATURAL SIGN" }, { "char": "&#x2600", desc: "BLACK SUN WITH RAYS" }, { "char": "&#x2601", desc: "CLOUD" }, { "char": "&#x2602", desc: "UMBRELLA" }, { "char": "&#x2603", desc: "SNOWMAN" }, { "char": "&#x2615", desc: "HOT BEVERAGE" }, { "char": "&#x2618", desc: "SHAMROCK" }, { "char": "&#x262F", desc: "YIN YANG" }, { "char": "&#x2714", desc: "HEAVY CHECK MARK" }, { "char": "&#x2716", desc: "HEAVY MULTIPLICATION X" }, { "char": "&#x2744", desc: "SNOWFLAKE" }, { "char": "&#x275B", desc: "HEAVY SINGLE TURNED COMMA QUOTATION MARK ORNAMENT" }, { "char": "&#x275C", desc: "HEAVY SINGLE COMMA QUOTATION MARK ORNAMENT" }, { "char": "&#x275D", desc: "HEAVY DOUBLE TURNED COMMA QUOTATION MARK ORNAMENT" }, { "char": "&#x275E", desc: "HEAVY DOUBLE COMMA QUOTATION MARK ORNAMENT" }, { "char": "&#x2764", desc: "HEAVY BLACK HEART" }] }] }), Ee.FE.PLUGINS.specialCharacters = function(s) {
        var o, l, r = "special_characters";

        function d(e, t) { s.events.disableBlur(), e.focus(), t.preventDefault(), t.stopPropagation() }
        return {
            _init: function() {},
            show: function() {
                if (!o) {
                    var e = "<h4>" + s.language.translate("Special Characters") + "</h4>",
                        t = function() {
                            for (var e = '<div class="fr-special-characters-modal">', t = 0; t < s.opts.specialCharactersSets.length; t++) {
                                for (var n = s.opts.specialCharactersSets[t], r = n.list, i = '<div class="fr-special-characters-list"><p class="fr-special-characters-title">' + s.language.translate(n.title) + "</p>", a = 0; a < r.length; a++) {
                                    var o = r[a];
                                    i += '<span class="fr-command fr-special-character" tabIndex="-1" role="button" value="' + o["char"] + '" title="' + o.desc + '">' + o["char"] + '<span class="fr-sr-only">' + s.language.translate(o.desc) + "&nbsp;&nbsp;&nbsp;</span></span>"
                                }
                                e += i + "</div>"
                            }
                            return e += "</div>"
                        }(),
                        n = s.modals.create(r, e, t);
                    o = n.$modal, n.$head, l = n.$body, s.events.$on(Ee(s.o_win), "resize", function() {
                        (o.data("instance") || s).modals.resize(r)
                    }), s.events.bindClick(l, ".fr-special-character", function(e) {
                        var t = o.data("instance") || s,
                            n = Ee(e.currentTarget);
                        t.specialCharacters.insert(n)
                    }), s.events.$on(l, "keydown", function(e) {
                        var t = e.which,
                            n = l.find("span.fr-special-character:focus:first");
                        if (!(n.length || t != Ee.FE.KEYCODE.F10 || s.keys.ctrlKey(e) || e.shiftKey) && e.altKey) return d(l.find("span.fr-special-character:first"), e), !1;
                        if (t == Ee.FE.KEYCODE.TAB || t == Ee.FE.KEYCODE.ARROW_LEFT || t == Ee.FE.KEYCODE.ARROW_RIGHT) {
                            var r = null,
                                i = null,
                                a = !1;
                            return t == Ee.FE.KEYCODE.ARROW_LEFT || t == Ee.FE.KEYCODE.ARROW_RIGHT ? (i = t == Ee.FE.KEYCODE.ARROW_RIGHT, a = !0) : i = !e.shiftKey, n.length ? (a && (r = i ? n.nextAll("span.fr-special-character:first") : n.prevAll("span.fr-special-character:first")), r && r.length || (r = i ? n.parent().next().find("span.fr-special-character:first") : n.parent().prev().find("span.fr-special-character:" + (a ? "last" : "first"))).length || (r = l.find("span.fr-special-character:" + (i ? "first" : "last")))) : r = l.find("span.fr-special-character:" + (i ? "first" : "last")), d(r, e), !1
                        }
                        if (t != Ee.FE.KEYCODE.ENTER || !n.length) return !0;
                        (o.data("instance") || s).specialCharacters.insert(n)
                    }, !0)
                }
                s.modals.show(r), s.modals.resize(r)
            },
            hide: function() { s.modals.hide(r) },
            insert: function(e) { s.specialCharacters.hide(), s.undo.saveStep(), s.html.insert(e.attr("value"), !0), s.undo.saveStep() }
        }
    }, Ee.FroalaEditor.DefineIcon("specialCharacters", { template: "text", NAME: "&#937;" }), Ee.FE.RegisterCommand("specialCharacters", { title: "Special Characters", icon: "specialCharacters", undo: !1, focus: !1, modal: !0, callback: function() { this.specialCharacters.show() }, plugin: "specialCharacters", showOnMobile: !1 }), Ee.extend(Ee.FE.POPUP_TEMPLATES, { "table.insert": "[_BUTTONS_][_ROWS_COLUMNS_]", "table.edit": "[_BUTTONS_]", "table.colors": "[_BUTTONS_][_COLORS_][_CUSTOM_COLOR_]" }), Ee.extend(Ee.FE.DEFAULTS, { tableInsertMaxSize: 10, tableEditButtons: ["tableHeader", "tableRemove", "|", "tableRows", "tableColumns", "tableStyle", "-", "tableCells", "tableCellBackground", "tableCellVerticalAlign", "tableCellHorizontalAlign", "tableCellStyle"], tableInsertButtons: ["tableBack", "|"], tableResizer: !0, tableDefaultWidth: "100%", tableResizerOffset: 5, tableResizingLimit: 30, tableColorsButtons: ["tableBack", "|"], tableColors: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"], tableColorsStep: 7, tableCellStyles: { "fr-highlighted": "Highlighted", "fr-thick": "Thick" }, tableStyles: { "fr-dashed-borders": "Dashed Borders", "fr-alternate-rows": "Alternate Rows" }, tableCellMultipleStyles: !0, tableMultipleStyles: !0, tableInsertHelper: !0, tableInsertHelperOffset: 15 }), Ee.FE.PLUGINS.table = function(T) {
        var A, s, i, a, r, o, b;

        function u() {
            var e = S();
            if (e) {
                var t = T.popups.get("table.edit");
                if (t || (t = p()), t) {
                    T.popups.setContainer("table.edit", T.$sc);
                    var n = O(e),
                        r = (n.left + n.right) / 2,
                        i = n.bottom;
                    T.popups.show("table.edit", r, i, n.bottom - n.top), T.edit.isDisabled() && (1 < Q().length && T.toolbar.disable(), T.$el.removeClass("fr-no-selection"), T.edit.on(), T.button.bulkRefresh(), T.selection.setAtEnd(T.$el.find(".fr-selected-cell:last").get(0)), T.selection.restore())
                }
            }
        }

        function d() {
            var e, t, n, r, i = S();
            if (i) {
                var a = T.popups.get("table.colors");
                a || (a = function() {
                    var e = "";
                    0 < T.opts.tableColorsButtons.length && (e = '<div class="fr-buttons fr-table-colors-buttons">' + T.button.buildList(T.opts.tableColorsButtons) + "</div>");
                    var t = "";
                    T.opts.colorsHEXInput && (t = '<div class="fr-table-colors-hex-layer fr-active fr-layer" id="fr-table-colors-hex-layer-' + T.id + '"><div class="fr-input-line"><input maxlength="7" id="fr-table-colors-hex-layer-text-' + T.id + '" type="text" placeholder="' + T.language.translate("HEX Color") + '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="tableCellBackgroundCustomColor" tabIndex="2" role="button">' + T.language.translate("OK") + "</button></div></div>");
                    var n = { buttons: e, colors: function() { for (var e = '<div class="fr-table-colors">', t = 0; t < T.opts.tableColors.length; t++) 0 !== t && t % T.opts.tableColorsStep == 0 && (e += "<br>"), "REMOVE" != T.opts.tableColors[t] ? e += '<span class="fr-command" style="background: ' + T.opts.tableColors[t] + ';" tabIndex="-1" role="button" data-cmd="tableCellBackgroundColor" data-param1="' + T.opts.tableColors[t] + '"><span class="fr-sr-only">' + T.language.translate("Color") + " " + T.opts.tableColors[t] + "&nbsp;&nbsp;&nbsp;</span></span>" : e += '<span class="fr-command" data-cmd="tableCellBackgroundColor" tabIndex="-1" role="button" data-param1="REMOVE" title="' + T.language.translate("Clear Formatting") + '">' + T.icon.create("tableColorRemove") + '<span class="fr-sr-only">' + T.language.translate("Clear Formatting") + "</span></span>"; return e += "</div>" }(), custom_color: t },
                        r = T.popups.create("table.colors", n);
                    return T.events.$on(T.$wp, "scroll.table-colors", function() { T.popups.isVisible("table.colors") && d() }), h = r, T.events.on("popup.tab", function(e) {
                        var t = Ee(e.currentTarget);
                        if (!T.popups.isVisible("table.colors") || !t.is("span")) return !0;
                        var n = e.which,
                            r = !0;
                        if (Ee.FE.KEYCODE.TAB == n) {
                            var i = h.find(".fr-buttons");
                            r = !T.accessibility.focusToolbar(i, !!e.shiftKey)
                        } else if (Ee.FE.KEYCODE.ARROW_UP == n || Ee.FE.KEYCODE.ARROW_DOWN == n || Ee.FE.KEYCODE.ARROW_LEFT == n || Ee.FE.KEYCODE.ARROW_RIGHT == n) {
                            var a = t.parent().find("span.fr-command"),
                                o = a.index(t),
                                s = T.opts.colorsStep,
                                l = Math.floor(a.length / s),
                                d = o % s,
                                c = Math.floor(o / s),
                                f = c * s + d,
                                p = l * s;
                            Ee.FE.KEYCODE.ARROW_UP == n ? f = ((f - s) % p + p) % p : Ee.FE.KEYCODE.ARROW_DOWN == n ? f = (f + s) % p : Ee.FE.KEYCODE.ARROW_LEFT == n ? f = ((f - 1) % p + p) % p : Ee.FE.KEYCODE.ARROW_RIGHT == n && (f = (f + 1) % p);
                            var u = Ee(a.get(f));
                            T.events.disableBlur(), u.focus(), r = !1
                        } else Ee.FE.KEYCODE.ENTER == n && (T.button.exec(t), r = !1);
                        return !1 === r && (e.preventDefault(), e.stopPropagation()), r
                    }, !0), r;
                    var h
                }()), T.popups.setContainer("table.colors", T.$sc);
                var o = O(i),
                    s = (o.left + o.right) / 2,
                    l = o.bottom;
                e = T.popups.get("table.colors"), t = T.$el.find(".fr-selected-cell:first"), n = T.helpers.RGBToHex(t.css("background-color")), r = e.find(".fr-table-colors-hex-layer input"), e.find(".fr-selected-color").removeClass("fr-selected-color fr-active-item"), e.find('span[data-param1="' + n + '"]').addClass("fr-selected-color fr-active-item"), r.val(n).trigger("change"), T.popups.show("table.colors", s, l, o.bottom - o.top)
            }
        }

        function l() { 0 === Q().length && T.toolbar.enable() }

        function c(e) {
            if (e) return T.popups.onHide("table.insert", function() { T.popups.get("table.insert").find('.fr-table-size .fr-select-table-size > span[data-row="1"][data-col="1"]').trigger("mouseenter") }), !0;
            var t = "";
            0 < T.opts.tableInsertButtons.length && (t = '<div class="fr-buttons">' + T.button.buildList(T.opts.tableInsertButtons) + "</div>");
            var n, r = {
                    buttons: t,
                    rows_columns: function() {
                        for (var e = '<div class="fr-table-size"><div class="fr-table-size-info">1 &times; 1</div><div class="fr-select-table-size">', t = 1; t <= T.opts.tableInsertMaxSize; t++) {
                            for (var n = 1; n <= T.opts.tableInsertMaxSize; n++) {
                                var r = "inline-block";
                                2 < t && !T.helpers.isMobile() && (r = "none");
                                var i = "fr-table-cell ";
                                1 == t && 1 == n && (i += " hover"), e += '<span class="fr-command ' + i + '" tabIndex="-1" data-cmd="tableInsert" data-row="' + t + '" data-col="' + n + '" data-param1="' + t + '" data-param2="' + n + '" style="display: ' + r + ';" role="button"><span></span><span class="fr-sr-only">' + t + " &times; " + n + "&nbsp;&nbsp;&nbsp;</span></span>"
                            }
                            e += '<div class="new-line"></div>'
                        }
                        return e += "</div></div>"
                    }()
                },
                i = T.popups.create("table.insert", r);
            return T.events.$on(i, "mouseenter", ".fr-table-size .fr-select-table-size .fr-table-cell", function(e) { f(Ee(e.currentTarget)) }, !0), n = i, T.events.$on(n, "focus", "[tabIndex]", function(e) {
                var t = Ee(e.currentTarget);
                f(t)
            }), T.events.on("popup.tab", function(e) {
                var t = Ee(e.currentTarget);
                if (!T.popups.isVisible("table.insert") || !t.is("span, a")) return !0;
                var n, r = e.which;
                if (Ee.FE.KEYCODE.ARROW_UP == r || Ee.FE.KEYCODE.ARROW_DOWN == r || Ee.FE.KEYCODE.ARROW_LEFT == r || Ee.FE.KEYCODE.ARROW_RIGHT == r) {
                    if (t.is("span.fr-table-cell")) {
                        var i = t.parent().find("span.fr-table-cell"),
                            a = i.index(t),
                            o = T.opts.tableInsertMaxSize,
                            s = a % o,
                            l = Math.floor(a / o);
                        Ee.FE.KEYCODE.ARROW_UP == r ? l = Math.max(0, l - 1) : Ee.FE.KEYCODE.ARROW_DOWN == r ? l = Math.min(T.opts.tableInsertMaxSize - 1, l + 1) : Ee.FE.KEYCODE.ARROW_LEFT == r ? s = Math.max(0, s - 1) : Ee.FE.KEYCODE.ARROW_RIGHT == r && (s = Math.min(T.opts.tableInsertMaxSize - 1, s + 1));
                        var d = l * o + s,
                            c = Ee(i.get(d));
                        f(c), T.events.disableBlur(), c.focus(), n = !1
                    }
                } else Ee.FE.KEYCODE.ENTER == r && (T.button.exec(t), n = !1);
                return !1 === n && (e.preventDefault(), e.stopPropagation()), n
            }, !0), i
        }

        function f(e) {
            var t = e.data("row"),
                n = e.data("col"),
                r = e.parent();
            r.siblings(".fr-table-size-info").html(t + " &times; " + n), r.find("> span").removeClass("hover fr-active-item");
            for (var i = 1; i <= T.opts.tableInsertMaxSize; i++)
                for (var a = 0; a <= T.opts.tableInsertMaxSize; a++) {
                    var o = r.find('> span[data-row="' + i + '"][data-col="' + a + '"]');
                    i <= t && a <= n ? o.addClass("hover") : i <= t + 1 || i <= 2 && !T.helpers.isMobile() ? o.css("display", "inline-block") : 2 < i && !T.helpers.isMobile() && o.css("display", "none")
                }
            e.addClass("fr-active-item")
        }

        function p(e) {
            if (e) return T.popups.onHide("table.edit", l), !0;
            if (0 < T.opts.tableEditButtons.length) {
                var t = { buttons: '<div class="fr-buttons">' + T.button.buildList(T.opts.tableEditButtons) + "</div>" },
                    n = T.popups.create("table.edit", t);
                return T.events.$on(T.$wp, "scroll.table-edit", function() { T.popups.isVisible("table.edit") && u() }), n
            }
            return !1
        }

        function h() {
            if (0 < Q().length) {
                var e = Z();
                T.selection.setBefore(e.get(0)) || T.selection.setAfter(e.get(0)), T.selection.restore(), T.popups.hide("table.edit"), e.remove(), T.toolbar.enable()
            }
        }

        function g(e) {
            var t = Z();
            if (0 < t.length) {
                if (0 < T.$el.find("th.fr-selected-cell").length && "above" == e) return;
                var n, r, i, a = S(),
                    o = N(a);
                r = "above" == e ? o.min_i : o.max_i;
                var s = "<tr>";
                for (n = 0; n < a[r].length; n++)
                    if ("below" == e && r < a.length - 1 && a[r][n] == a[r + 1][n] || "above" == e && 0 < r && a[r][n] == a[r - 1][n]) {
                        if (0 === n || 0 < n && a[r][n] != a[r][n - 1]) {
                            var l = Ee(a[r][n]);
                            l.attr("rowspan", parseInt(l.attr("rowspan"), 10) + 1)
                        }
                    } else s += "<td><br></td>";
                s += "</tr>", i = 0 < T.$el.find("th.fr-selected-cell").length && "below" == e ? Ee(t.find("tbody").not(t.find("table tbody"))) : Ee(t.find("tr").not(t.find("table tr")).get(r)), "below" == e ? "TBODY" == i.prop("tagName") ? i.prepend(s) : i.after(s) : "above" == e && (i.before(s), T.popups.isVisible("table.edit") && u())
            }
        }

        function m(e, t, n) {
            var r, i, a, o, s, l = 0,
                d = S(n);
            if (e < (t = Math.min(t, d[0].length - 1)))
                for (i = e; i <= t; i++)
                    if (!(e < i && d[0][i] == d[0][i - 1]) && 1 < (o = Math.min(parseInt(d[0][i].getAttribute("colspan"), 10) || 1, t - e + 1)) && d[0][i] == d[0][i + 1])
                        for (l = o - 1, r = 1; r < d.length; r++)
                            if (d[r][i] != d[r - 1][i]) {
                                for (a = i; a < i + o; a++)
                                    if (1 < (s = parseInt(d[r][a].getAttribute("colspan"), 10) || 1) && d[r][a] == d[r][a + 1]) a += l = Math.min(l, s - 1);
                                    else if (!(l = Math.max(0, l - 1))) break;
                                if (!l) break
                            }
            l && E(d, l, "colspan", 0, d.length - 1, e, t)
        }

        function v(e, t, n) {
            var r, i, a, o, s, l = 0,
                d = S(n);
            if (e < (t = Math.min(t, d.length - 1)))
                for (r = e; r <= t; r++)
                    if (!(e < r && d[r][0] == d[r - 1][0]) && 1 < (o = Math.min(parseInt(d[r][0].getAttribute("rowspan"), 10) || 1, t - e + 1)) && d[r][0] == d[r + 1][0])
                        for (l = o - 1, i = 1; i < d[0].length; i++)
                            if (d[r][i] != d[r][i - 1]) {
                                for (a = r; a < r + o; a++)
                                    if (1 < (s = parseInt(d[a][i].getAttribute("rowspan"), 10) || 1) && d[a][i] == d[a + 1][i]) a += l = Math.min(l, s - 1);
                                    else if (!(l = Math.max(0, l - 1))) break;
                                if (!l) break
                            }
            l && E(d, l, "rowspan", e, t, 0, d[0].length - 1)
        }

        function E(e, t, n, r, i, a, o) {
            var s, l, d;
            for (s = r; s <= i; s++)
                for (l = a; l <= o; l++) r < s && e[s][l] == e[s - 1][l] || a < l && e[s][l] == e[s][l - 1] || 1 < (d = parseInt(e[s][l].getAttribute(n), 10) || 1) && (1 < d - t ? e[s][l].setAttribute(n, d - t) : e[s][l].removeAttribute(n))
        }

        function C(e, t, n, r, i) { v(e, t, i), m(n, r, i) }

        function t(e) { var t = T.$el.find(".fr-selected-cell"); "REMOVE" != e ? t.css("background-color", T.helpers.HEXtoRGB(e)) : t.css("background-color", ""), u() }

        function S(e) {
            var d = [];
            return null == (e = e || null) && 0 < Q().length && (e = Z()), e && e.find("tr").not(e.find("table tr")).each(function(s, e) {
                var t = Ee(e),
                    l = 0;
                t.find("> th, > td").each(function(e, t) {
                    for (var n = Ee(t), r = parseInt(n.attr("colspan"), 10) || 1, i = parseInt(n.attr("rowspan"), 10) || 1, a = s; a < s + i; a++)
                        for (var o = l; o < l + r; o++) d[a] || (d[a] = []), d[a][o] ? l++ : d[a][o] = t;
                    l += r
                })
            }), d
        }

        function R(e, t) {
            for (var n = 0; n < t.length; n++)
                for (var r = 0; r < t[n].length; r++)
                    if (t[n][r] == e) return { row: n, col: r }
        }

        function y(e, t, n) {
            for (var r = e + 1, i = t + 1; r < n.length;) {
                if (n[r][t] != n[e][t]) { r--; break }
                r++
            }
            for (r == n.length && r--; i < n[e].length;) {
                if (n[e][i] != n[e][t]) { i--; break }
                i++
            }
            return i == n[e].length && i--, { row: r, col: i }
        }

        function _() { T.el.querySelector(".fr-cell-fixed") && T.el.querySelector(".fr-cell-fixed").classList.remove("fr-cell-fixed"), T.el.querySelector(".fr-cell-handler") && T.el.querySelector(".fr-cell-handler").classList.remove("fr-cell-handler") }

        function L() {
            var e = T.$el.find(".fr-selected-cell");
            0 < e.length && e.each(function() {
                var e = Ee(this);
                e.removeClass("fr-selected-cell"), "" === e.attr("class") && e.removeAttr("class")
            }), _()
        }

        function x() { T.events.disableBlur(), T.selection.clear(), T.$el.addClass("fr-no-selection"), T.$el.blur(), T.events.enableBlur() }

        function N(e) {
            var t = T.$el.find(".fr-selected-cell");
            if (0 < t.length) {
                var n, r = e.length,
                    i = 0,
                    a = e[0].length,
                    o = 0;
                for (n = 0; n < t.length; n++) {
                    var s = R(t[n], e),
                        l = y(s.row, s.col, e);
                    r = Math.min(s.row, r), i = Math.max(l.row, i), a = Math.min(s.col, a), o = Math.max(l.col, o)
                }
                return { min_i: r, max_i: i, min_j: a, max_j: o }
            }
            return null
        }

        function O(e) {
            var t = N(e),
                n = Ee(e[t.min_i][t.min_j]),
                r = Ee(e[t.min_i][t.max_j]),
                i = Ee(e[t.max_i][t.min_j]);
            return { left: n.offset().left, right: r.offset().left + r.outerWidth(), top: n.offset().top, bottom: i.offset().top + i.outerHeight() }
        }

        function w(t, n) {
            if (Ee(t).is(n)) L(), Ee(t).addClass("fr-selected-cell");
            else {
                x(), T.edit.off();
                var r = S(),
                    i = R(t, r),
                    a = R(n, r),
                    o = function e(t, n, r, i, a) {
                        var o, s, l, d, c = t,
                            f = n,
                            p = r,
                            u = i;
                        for (o = c; o <= f; o++)(1 < (parseInt(Ee(a[o][p]).attr("rowspan"), 10) || 1) || 1 < (parseInt(Ee(a[o][p]).attr("colspan"), 10) || 1)) && (d = y((l = R(a[o][p], a)).row, l.col, a), c = Math.min(l.row, c), f = Math.max(d.row, f), p = Math.min(l.col, p), u = Math.max(d.col, u)), (1 < (parseInt(Ee(a[o][u]).attr("rowspan"), 10) || 1) || 1 < (parseInt(Ee(a[o][u]).attr("colspan"), 10) || 1)) && (d = y((l = R(a[o][u], a)).row, l.col, a), c = Math.min(l.row, c), f = Math.max(d.row, f), p = Math.min(l.col, p), u = Math.max(d.col, u));
                        for (s = p; s <= u; s++)(1 < (parseInt(Ee(a[c][s]).attr("rowspan"), 10) || 1) || 1 < (parseInt(Ee(a[c][s]).attr("colspan"), 10) || 1)) && (d = y((l = R(a[c][s], a)).row, l.col, a), c = Math.min(l.row, c), f = Math.max(d.row, f), p = Math.min(l.col, p), u = Math.max(d.col, u)), (1 < (parseInt(Ee(a[f][s]).attr("rowspan"), 10) || 1) || 1 < (parseInt(Ee(a[f][s]).attr("colspan"), 10) || 1)) && (d = y((l = R(a[f][s], a)).row, l.col, a), c = Math.min(l.row, c), f = Math.max(d.row, f), p = Math.min(l.col, p), u = Math.max(d.col, u));
                        return c == t && f == n && p == r && u == i ? { min_i: t, max_i: n, min_j: r, max_j: i } : e(c, f, p, u, a)
                    }(Math.min(i.row, a.row), Math.max(i.row, a.row), Math.min(i.col, a.col), Math.max(i.col, a.col), r);
                L(), t.classList.add("fr-cell-fixed"), n.classList.add("fr-cell-handler");
                for (var s = o.min_i; s <= o.max_i; s++)
                    for (var l = o.min_j; l <= o.max_j; l++) Ee(r[s][l]).addClass("fr-selected-cell")
            }
        }

        function I(e) {
            var t = null,
                n = Ee(e.target);
            return "TD" == e.target.tagName || "TH" == e.target.tagName ? t = e.target : 0 < n.closest("td").length ? t = n.closest("td").get(0) : 0 < n.closest("th").length && (t = n.closest("th").get(0)), 0 === T.$el.find(t).length ? null : t
        }

        function D() { L(), T.popups.hide("table.edit") }

        function e(e) {
            var t = I(e);
            if ("false" == Ee(t).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
            if (0 < Q().length && !t && D(), !T.edit.isDisabled() || T.popups.isVisible("table.edit"))
                if (1 != e.which || 1 == e.which && T.helpers.isMac() && e.ctrlKey)(3 == e.which || 1 == e.which && T.helpers.isMac() && e.ctrlKey) && t && D();
                else if (a = !0, t) {
                0 < Q().length && !e.shiftKey && D(), e.stopPropagation(), T.events.trigger("image.hideResizer"), T.events.trigger("video.hideResizer"), i = !0;
                var n = t.tagName.toLowerCase();
                e.shiftKey && 0 < T.$el.find(n + ".fr-selected-cell").length ? Ee(T.$el.find(n + ".fr-selected-cell").closest("table")).is(Ee(t).closest("table")) ? w(r, t) : x() : ((T.keys.ctrlKey(e) || e.shiftKey) && (1 < Q().length || 0 === Ee(t).find(T.selection.element()).length && !Ee(t).is(T.selection.element())) && x(), w(r = t, r))
            }
        }

        function n(e) {
            if (i || T.$tb.is(e.target) || T.$tb.is(Ee(e.target).closest(T.$tb.get(0))) || (0 < Q().length && T.toolbar.enable(), L()), !(1 != e.which || 1 == e.which && T.helpers.isMac() && e.ctrlKey)) {
                if (a = !1, i) i = !1, I(e) || 1 != Q().length ? 0 < Q().length && (T.selection.isCollapsed() ? u() : L()) : L();
                if (b) {
                    b = !1, A.removeClass("fr-moving"), T.$el.removeClass("fr-no-selection"), T.edit.on();
                    var t = parseFloat(A.css("left")) + T.opts.tableResizerOffset + T.$wp.offset().left;
                    T.opts.iframe && (t -= T.$iframe.offset().left), A.data("release-position", t), A.removeData("max-left"), A.removeData("max-right"),
                        function() {
                            var e = A.data("origin"),
                                t = A.data("release-position");
                            if (e !== t) {
                                var n = A.data("first"),
                                    r = A.data("second"),
                                    i = A.data("table"),
                                    a = i.outerWidth();
                                if (T.undo.canDo() || T.undo.saveStep(), null !== n && null !== r) {
                                    var o, s, l, d = S(i),
                                        c = [],
                                        f = [],
                                        p = [],
                                        u = [];
                                    for (o = 0; o < d.length; o++) s = Ee(d[o][n]), l = Ee(d[o][r]), c[o] = s.outerWidth(), p[o] = l.outerWidth(), f[o] = c[o] / a * 100, u[o] = p[o] / a * 100;
                                    for (o = 0; o < d.length; o++) {
                                        s = Ee(d[o][n]), l = Ee(d[o][r]);
                                        var h = (f[o] * (c[o] + t - e) / c[o]).toFixed(4);
                                        s.css("width", h + "%"), l.css("width", (f[o] + u[o] - h).toFixed(4) + "%")
                                    }
                                } else {
                                    var g, m = i.parent(),
                                        v = a / m.width() * 100,
                                        E = (parseInt(i.css("margin-left"), 10) || 0) / m.width() * 100,
                                        b = (parseInt(i.css("margin-right"), 10) || 0) / m.width() * 100;
                                    "rtl" == T.opts.direction && 0 === r || "rtl" != T.opts.direction && 0 !== r ? (g = (a + t - e) / a * v, i.css("margin-right", "calc(100% - " + Math.round(g).toFixed(4) + "% - " + Math.round(E).toFixed(4) + "%)")) : ("rtl" == T.opts.direction && 0 !== r || "rtl" != T.opts.direction && 0 === r) && (g = (a - t + e) / a * v, i.css("margin-left", "calc(100% - " + Math.round(g).toFixed(4) + "% - " + Math.round(b).toFixed(4) + "%)")), i.css("width", Math.round(g).toFixed(4) + "%")
                                }
                                T.selection.restore(), T.undo.saveStep()
                            }
                            A.removeData("origin"), A.removeData("release-position"), A.removeData("first"), A.removeData("second"), A.removeData("table")
                        }(), B()
                }
            }
        }

        function k(e) {
            if (!0 === i) {
                if (Ee(e.currentTarget).closest("table").is(Z())) { if ("TD" == e.currentTarget.tagName && 0 === T.$el.find("th.fr-selected-cell").length) return void w(r, e.currentTarget); if ("TH" == e.currentTarget.tagName && 0 === T.$el.find("td.fr-selected-cell").length) return void w(r, e.currentTarget) }
                x()
            }
        }

        function F(e, t, n, r) { for (var i, a = t; a != T.el && "TD" != a.tagName && "TH" != a.tagName && ("up" == r ? i = a.previousElementSibling : "down" == r && (i = a.nextElementSibling), !i);) a = a.parentNode; "TD" == a.tagName || "TH" == a.tagName ? function(e, t) { for (var n = e; n && "TABLE" != n.tagName && n.parentNode != T.el;) n = n.parentNode; if (n && "TABLE" == n.tagName) { var r = S(Ee(n)); "up" == t ? M(R(e, r), n, r) : "down" == t && $(R(e, r), n, r) } }(a, r) : i && ("up" == r && T.selection.setAtEnd(i), "down" == r && T.selection.setAtStart(i)) }

        function M(e, t, n) { 0 < e.row ? T.selection.setAtEnd(n[e.row - 1][e.col]) : F(0, t, 0, "up") }

        function $(e, t, n) {
            var r = parseInt(n[e.row][e.col].getAttribute("rowspan"), 10) || 1;
            e.row < n.length - r ? T.selection.setAtStart(n[e.row + r][e.col]) : F(0, t, 0, "down")
        }

        function B() { A && (A.find("div").css("opacity", 0), A.css("top", 0), A.css("left", 0), A.css("height", 0), A.find("div").css("height", 0), A.hide()) }

        function P() { s && s.removeClass("fr-visible").css("left", "-9999px") }

        function K(e, t) {
            var n = Ee(t),
                r = n.closest("table"),
                i = r.parent();
            if (t && "TD" != t.tagName && "TH" != t.tagName && (0 < n.closest("td").length ? t = n.closest("td") : 0 < n.closest("th").length && (t = n.closest("th"))), !t || "TD" != t.tagName && "TH" != t.tagName) A && n.get(0) != A.get(0) && n.parent().get(0) != A.get(0) && T.core.sameInstance(A) && B();
            else {
                if (n = Ee(t), 0 === T.$el.find(n).length) return !1;
                var a = n.offset().left - 1,
                    o = a + n.outerWidth();
                if (Math.abs(e.pageX - a) <= T.opts.tableResizerOffset || Math.abs(o - e.pageX) <= T.opts.tableResizerOffset) {
                    var s, l, d, c, f, p = S(r),
                        u = R(t, p),
                        h = y(u.row, u.col, p),
                        g = r.offset().top,
                        m = r.outerHeight() - 1;
                    "rtl" != T.opts.direction ? e.pageX - a <= T.opts.tableResizerOffset ? (d = a, 0 < u.col ? (c = a - Y(u.col - 1, p) + T.opts.tableResizingLimit, f = a + Y(u.col, p) - T.opts.tableResizingLimit, s = u.col - 1, l = u.col) : (s = null, l = 0, c = r.offset().left - 1 - parseInt(r.css("margin-left"), 10), f = r.offset().left - 1 + r.width() - p[0].length * T.opts.tableResizingLimit)) : o - e.pageX <= T.opts.tableResizerOffset && (d = o, h.col < p[h.row].length && p[h.row][h.col + 1] ? (c = o - Y(h.col, p) + T.opts.tableResizingLimit, f = o + Y(h.col + 1, p) - T.opts.tableResizingLimit, s = h.col, l = h.col + 1) : (s = h.col, l = null, c = r.offset().left - 1 + p[0].length * T.opts.tableResizingLimit, f = i.offset().left - 1 + i.width() + parseFloat(i.css("padding-left")))) : o - e.pageX <= T.opts.tableResizerOffset ? (d = o, 0 < u.col ? (c = o - Y(u.col, p) + T.opts.tableResizingLimit, f = o + Y(u.col - 1, p) - T.opts.tableResizingLimit, s = u.col, l = u.col - 1) : (s = null, l = 0, c = r.offset().left + p[0].length * T.opts.tableResizingLimit, f = i.offset().left - 1 + i.width() + parseFloat(i.css("padding-left")))) : e.pageX - a <= T.opts.tableResizerOffset && (d = a, h.col < p[h.row].length && p[h.row][h.col + 1] ? (c = a - Y(h.col + 1, p) + T.opts.tableResizingLimit, f = a + Y(h.col, p) - T.opts.tableResizingLimit, s = h.col + 1, l = h.col) : (s = h.col, l = null, c = i.offset().left + parseFloat(i.css("padding-left")), f = r.offset().left - 1 + r.width() - p[0].length * T.opts.tableResizingLimit)), A || (T.shared.$table_resizer || (T.shared.$table_resizer = Ee('<div class="fr-table-resizer"><div></div></div>')), A = T.shared.$table_resizer, T.events.$on(A, "mousedown", function(e) { return !T.core.sameInstance(A) || (0 < Q().length && D(), 1 == e.which ? (T.selection.save(), b = !0, A.addClass("fr-moving"), x(), T.edit.off(), A.find("div").css("opacity", 1), !1) : void 0) }), T.events.$on(A, "mousemove", function(e) {
                        if (!T.core.sameInstance(A)) return !0;
                        b && (T.opts.iframe && (e.pageX -= T.$iframe.offset().left), V(e))
                    }), T.events.on("shared.destroy", function() { A.html("").removeData().remove(), A = null }, !0), T.events.on("destroy", function() { T.$el.find(".fr-selected-cell").removeClass("fr-selected-cell"), A.hide().appendTo(Ee("body:first")) }, !0)), A.data("table", r), A.data("first", s), A.data("second", l), A.data("instance", T), T.$wp.append(A);
                    var v = d - T.win.pageXOffset - T.opts.tableResizerOffset - T.$wp.offset().left,
                        E = g - T.$wp.offset().top + T.$wp.scrollTop();
                    T.opts.iframe && (v += T.$iframe.offset().left, E += T.$iframe.offset().top, c += T.$iframe.offset().left, f += T.$iframe.offset().left), A.data("max-left", c), A.data("max-right", f), A.data("origin", d - T.win.pageXOffset), A.css("top", E), A.css("left", v), A.css("height", m), A.find("div").css("height", m), A.css("padding-left", T.opts.tableResizerOffset), A.css("padding-right", T.opts.tableResizerOffset), A.show()
                } else T.core.sameInstance(A) && B()
            }
        }

        function U(e, t) {
            if (T.$box.find(".fr-line-breaker").is(":visible")) return !1;
            s || q(), T.$box.append(s), s.data("instance", T);
            var n, r = Ee(t).find("tr:first"),
                i = e.pageX,
                a = 0,
                o = 0;
            T.opts.iframe && (a += T.$iframe.offset().left - T.helpers.scrollLeft(), o += T.$iframe.offset().top - T.helpers.scrollTop()), r.find("th, td").each(function() { var e = Ee(this); return e.offset().left <= i && i < e.offset().left + e.outerWidth() / 2 ? (n = parseInt(s.find("a").css("width"), 10), s.css("top", o + e.offset().top - T.$box.offset().top - T.win.pageYOffset - n - 5), s.css("left", a + e.offset().left - T.$box.offset().left - T.win.pageXOffset - n / 2), s.data("selected-cell", e), s.data("position", "before"), s.addClass("fr-visible"), !1) : e.offset().left + e.outerWidth() / 2 <= i && i < e.offset().left + e.outerWidth() ? (n = parseInt(s.find("a").css("width"), 10), s.css("top", o + e.offset().top - T.$box.offset().top - T.win.pageYOffset - n - 5), s.css("left", a + e.offset().left - T.$box.offset().left + e.outerWidth() - T.win.pageXOffset - n / 2), s.data("selected-cell", e), s.data("position", "after"), s.addClass("fr-visible"), !1) : void 0 })
        }

        function H(e, t) {
            if (T.$box.find(".fr-line-breaker").is(":visible")) return !1;
            s || q(), T.$box.append(s), s.data("instance", T);
            var n, r = Ee(t),
                i = e.pageY,
                a = 0,
                o = 0;
            T.opts.iframe && (a += T.$iframe.offset().left - T.helpers.scrollLeft(), o += T.$iframe.offset().top - T.helpers.scrollTop()), r.find("tr").each(function() { var e = Ee(this); return e.offset().top <= i && i < e.offset().top + e.outerHeight() / 2 ? (n = parseInt(s.find("a").css("width"), 10), s.css("top", o + e.offset().top - T.$box.offset().top - T.win.pageYOffset - n / 2), s.css("left", a + e.offset().left - T.$box.offset().left - T.win.pageXOffset - n - 5), s.data("selected-cell", e.find("td:first")), s.data("position", "above"), s.addClass("fr-visible"), !1) : e.offset().top + e.outerHeight() / 2 <= i && i < e.offset().top + e.outerHeight() ? (n = parseInt(s.find("a").css("width"), 10), s.css("top", o + e.offset().top - T.$box.offset().top + e.outerHeight() - T.win.pageYOffset - n / 2), s.css("left", a + e.offset().left - T.$box.offset().left - T.win.pageXOffset - n - 5), s.data("selected-cell", e.find("td:first")), s.data("position", "below"), s.addClass("fr-visible"), !1) : void 0 })
        }

        function W(e) {
            o = null;
            var t = T.doc.elementFromPoint(e.pageX - T.win.pageXOffset, e.pageY - T.win.pageYOffset);
            T.opts.tableResizer && (!T.popups.areVisible() || T.popups.areVisible() && T.popups.isVisible("table.edit")) && K(e, t), !T.opts.tableInsertHelper || T.popups.areVisible() || T.$tb.hasClass("fr-inline") && T.$tb.is(":visible") || function(e, t) {
                if (0 === Q().length) {
                    var n, r, i;
                    if (t && ("HTML" == t.tagName || "BODY" == t.tagName || T.node.isElement(t)))
                        for (n = 1; n <= T.opts.tableInsertHelperOffset; n++) { if (r = T.doc.elementFromPoint(e.pageX - T.win.pageXOffset, e.pageY - T.win.pageYOffset + n), Ee(r).hasClass("fr-tooltip")) return; if (r && ("TH" == r.tagName || "TD" == r.tagName || "TABLE" == r.tagName) && (Ee(r).parents(".fr-wrapper").length || T.opts.iframe)) return U(e, Ee(r).closest("table")); if (i = T.doc.elementFromPoint(e.pageX - T.win.pageXOffset + n, e.pageY - T.win.pageYOffset), Ee(i).hasClass("fr-tooltip")) return; if (i && ("TH" == i.tagName || "TD" == i.tagName || "TABLE" == i.tagName) && (Ee(i).parents(".fr-wrapper").length || T.opts.iframe)) return H(e, Ee(i).closest("table")) }
                    T.core.sameInstance(s) && P()
                }
            }(e, t)
        }

        function z() {
            if (b) {
                var e = A.data("table").offset().top - T.win.pageYOffset;
                T.opts.iframe && (e += T.$iframe.offset().top - T.helpers.scrollTop()), A.css("top", e)
            }
        }

        function Y(e, t) { var n, r = Ee(t[0][e]).outerWidth(); for (n = 1; n < t.length; n++) r = Math.min(r, Ee(t[n][e]).outerWidth()); return r }

        function G(e, t, n) { var r, i = 0; for (r = e; r <= t; r++) i += Y(r, n); return i }

        function V(e) {
            if (1 < Q().length && a && x(), !1 === a && !1 === i && !1 === b) o && clearTimeout(o), T.edit.isDisabled() && !T.popups.isVisible("table.edit") || (o = setTimeout(W, 30, e));
            else if (b) {
                var t = e.pageX - T.win.pageXOffset;
                T.opts.iframe && (t += T.$iframe.offset().left);
                var n = A.data("max-left"),
                    r = A.data("max-right");
                n <= t && t <= r ? A.css("left", t - T.opts.tableResizerOffset - T.$wp.offset().left) : t < n && parseFloat(A.css("left"), 10) > n - T.opts.tableResizerOffset ? A.css("left", n - T.opts.tableResizerOffset - T.$wp.offset().left) : r < t && parseFloat(A.css("left"), 10) < r - T.opts.tableResizerOffset && A.css("left", r - T.opts.tableResizerOffset - T.$wp.offset().left)
            } else a && P()
        }

        function X(e) { T.node.isEmpty(e.get(0)) ? e.prepend(Ee.FE.MARKERS) : e.prepend(Ee.FE.START_MARKER).append(Ee.FE.END_MARKER) }

        function q() {
            T.shared.$ti_helper || (T.shared.$ti_helper = Ee('<div class="fr-insert-helper"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + T.language.translate("Insert") + '"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/></svg></a></div>'), T.events.bindClick(T.shared.$ti_helper, "a", function() {
                var e = s.data("selected-cell"),
                    t = s.data("position"),
                    n = s.data("instance") || T;
                "before" == t ? (T.undo.saveStep(), e.addClass("fr-selected-cell"), n.table.insertColumn(t), e.removeClass("fr-selected-cell"), T.undo.saveStep()) : "after" == t ? (T.undo.saveStep(), e.addClass("fr-selected-cell"), n.table.insertColumn(t), e.removeClass("fr-selected-cell"), T.undo.saveStep()) : "above" == t ? (T.undo.saveStep(), e.addClass("fr-selected-cell"), n.table.insertRow(t), e.removeClass("fr-selected-cell"), T.undo.saveStep()) : "below" == t && (T.undo.saveStep(), e.addClass("fr-selected-cell"), n.table.insertRow(t), e.removeClass("fr-selected-cell"), T.undo.saveStep()), P()
            }), T.events.on("shared.destroy", function() { T.shared.$ti_helper.html("").removeData().remove(), T.shared.$ti_helper = null }, !0), T.events.$on(T.shared.$ti_helper, "mousemove", function(e) { e.stopPropagation() }, !0), T.events.$on(Ee(T.o_win), "scroll", function() { P() }, !0), T.events.$on(T.$wp, "scroll", function() { P() }, !0)), s = T.shared.$ti_helper, T.events.on("destroy", function() { s = null }), T.tooltip.bind(T.$box, ".fr-insert-helper > a.fr-floating-btn")
        }

        function j() { r = null, clearTimeout(o) }

        function Q() { return T.el.querySelectorAll(".fr-selected-cell") }

        function Z() { var e = Q(); if (e.length) { for (var t = e[0]; t && "TABLE" != t.tagName && t.parentNode != T.el;) t = t.parentNode; return t && "TABLE" == t.tagName ? Ee(t) : Ee([]) } return Ee([]) }
        return {
            _init: function() {
                if (!T.$wp) return !1;
                if (!T.helpers.isMobile()) {
                    b = i = a = !1, T.events.$on(T.$el, "mousedown", e), T.popups.onShow("image.edit", function() { L(), i = a = !1 }), T.popups.onShow("link.edit", function() { L(), i = a = !1 }), T.events.on("commands.mousedown", function(e) { 0 < e.parents(".fr-toolbar").length && L() }), T.events.$on(T.$el, "mouseenter", "th, td", k), T.events.$on(T.$win, "mouseup", n), T.opts.iframe && T.events.$on(Ee(T.o_win), "mouseup", n), T.events.$on(T.$win, "mousemove", V), T.events.$on(Ee(T.o_win), "scroll", z), T.events.on("contentChanged", function() { 0 < Q().length && (u(), T.$el.find("img").on("load.selected-cells", function() { Ee(this).off("load.selected-cells"), 0 < Q().length && u() })) }), T.events.$on(Ee(T.o_win), "resize", function() { L() }), T.events.on("toolbar.esc", function() { if (0 < Q().length) return T.events.disableBlur(), T.events.focus(), !1 }, !0), T.events.$on(Ee(T.o_win), "keydown", function() { a && i && (i = a = !1, T.$el.removeClass("fr-no-selection"), T.edit.on(), T.selection.setAtEnd(T.$el.find(".fr-selected-cell:last").get(0)), T.selection.restore(), L()) }), T.events.$on(T.$el, "keydown", function(e) {
                        e.shiftKey ? !1 === function(e) {
                            var t = Q();
                            if (0 < t.length) {
                                var n, r, i = S(),
                                    a = e.which;
                                1 == t.length ? r = n = t[0] : (n = T.el.querySelector(".fr-cell-fixed"), r = T.el.querySelector(".fr-cell-handler"));
                                var o = R(r, i);
                                if (Ee.FE.KEYCODE.ARROW_RIGHT == a) { if (o.col < i[0].length - 1) return w(n, i[o.row][o.col + 1]), !1 } else if (Ee.FE.KEYCODE.ARROW_DOWN == a) { if (o.row < i.length - 1) return w(n, i[o.row + 1][o.col]), !1 } else if (Ee.FE.KEYCODE.ARROW_LEFT == a) { if (0 < o.col) return w(n, i[o.row][o.col - 1]), !1 } else if (Ee.FE.KEYCODE.ARROW_UP == a && 0 < o.row) return w(n, i[o.row - 1][o.col]), !1
                            }
                        }(e) && setTimeout(function() { u() }, 0) : function(e) {
                            var t = e.which,
                                n = T.selection.blocks();
                            if (n.length && ("TD" == (n = n[0]).tagName || "TH" == n.tagName)) {
                                for (var r = n; r && "TABLE" != r.tagName && r.parentNode != T.el;) r = r.parentNode;
                                if (r && "TABLE" == r.tagName && (Ee.FE.KEYCODE.ARROW_LEFT == t || Ee.FE.KEYCODE.ARROW_UP == t || Ee.FE.KEYCODE.ARROW_RIGHT == t || Ee.FE.KEYCODE.ARROW_DOWN == t) && (0 < Q().length && D(), T.browser.webkit && (Ee.FE.KEYCODE.ARROW_UP == t || Ee.FE.KEYCODE.ARROW_DOWN == t))) {
                                    var i = T.selection.ranges(0).startContainer;
                                    if (i.nodeType == Node.TEXT_NODE && (Ee.FE.KEYCODE.ARROW_UP == t && i.previousSibling || Ee.FE.KEYCODE.ARROW_DOWN == t && i.nextSibling)) return;
                                    e.preventDefault(), e.stopPropagation();
                                    var a = S(Ee(r)),
                                        o = R(n, a);
                                    Ee.FE.KEYCODE.ARROW_UP == t ? M(o, r, a) : Ee.FE.KEYCODE.ARROW_DOWN == t && $(o, r, a), T.selection.restore()
                                }
                            }
                        }(e)
                    }), T.events.on("keydown", function(e) {
                        if (!1 === function(e) {
                                if (e.which == Ee.FE.KEYCODE.TAB) {
                                    var t;
                                    if (0 < Q().length) t = T.$el.find(".fr-selected-cell:last");
                                    else { var n = T.selection.element(); "TD" == n.tagName || "TH" == n.tagName ? t = Ee(n) : n != T.el && (0 < Ee(n).parentsUntil(T.$el, "td").length ? t = Ee(n).parents("td:first") : 0 < Ee(n).parentsUntil(T.$el, "th").length && (t = Ee(n).parents("th:first"))) }
                                    if (t) return e.preventDefault(), !!(0 < Ee(T.selection.element()).parentsUntil(T.$el, "ol, ul").length && (0 < Ee(T.selection.element()).parents("li").prev().length || Ee(T.selection.element()).is("li") && 0 < Ee(T.selection.element()).prev().length)) || (D(), e.shiftKey ? 0 < t.prev().length ? X(t.prev()) : 0 < t.closest("tr").length && 0 < t.closest("tr").prev().length ? X(t.closest("tr").prev().find("td:last")) : 0 < t.closest("tbody").length && 0 < t.closest("table").find("thead tr").length && X(t.closest("table").find("thead tr th:last")) : 0 < t.next().length ? X(t.next()) : 0 < t.closest("tr").length && 0 < t.closest("tr").next().length ? X(t.closest("tr").next().find("td:first")) : 0 < t.closest("thead").length && 0 < t.closest("table").find("tbody tr").length ? X(t.closest("table").find("tbody tr td:first")) : (t.addClass("fr-selected-cell"), g("below"), L(), X(t.closest("tr").next().find("td:first"))), T.selection.restore(), !1)
                                }
                            }(e)) return !1;
                        var t = Q();
                        if (0 < t.length) { if (0 < t.length && T.keys.ctrlKey(e) && e.which == Ee.FE.KEYCODE.A) return L(), T.popups.isVisible("table.edit") && T.popups.hide("table.edit"), t = [], !0; if (e.which == Ee.FE.KEYCODE.ESC && T.popups.isVisible("table.edit")) return L(), T.popups.hide("table.edit"), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), !(t = []); if (1 < t.length && (e.which == Ee.FE.KEYCODE.BACKSPACE || e.which == Ee.FE.KEYCODE.DELETE)) { T.undo.saveStep(); for (var n = 0; n < t.length; n++) Ee(t[n]).html("<br>"), n == t.length - 1 && Ee(t[n]).prepend(Ee.FE.MARKERS); return T.selection.restore(), T.undo.saveStep(), !(t = []) } if (1 < t.length && e.which != Ee.FE.KEYCODE.F10 && !T.keys.isBrowserAction(e)) return e.preventDefault(), !(t = []) } else if (!(t = []) === function(e) { if (e.altKey && e.which == Ee.FE.KEYCODE.SPACE) { var t, n = T.selection.element(); if ("TD" == n.tagName || "TH" == n.tagName ? t = n : 0 < Ee(n).closest("td").length ? t = Ee(n).closest("td").get(0) : 0 < Ee(n).closest("th").length && (t = Ee(n).closest("th").get(0)), t) return e.preventDefault(), w(t, t), u(), !1 } }(e)) return !1
                    }, !0);
                    var t = [];
                    T.events.on("html.beforeGet", function() { t = Q(); for (var e = 0; e < t.length; e++) t[e].className = (t[e].className || "").replace(/fr-selected-cell/g, "") }), T.events.on("html.afterGet", function() {
                        for (var e = 0; e < t.length; e++) t[e].className = (t[e].className ? t[e].className.trim() + " " : "") + "fr-selected-cell";
                        t = []
                    }), c(!0), p(!0)
                }
                T.events.on("destroy", j)
            },
            insert: function(e, t) {
                var n, r, i = "<table " + (T.opts.tableDefaultWidth ? 'style="width: ' + T.opts.tableDefaultWidth + ';" ' : "") + 'class="fr-inserted-table"><tbody>',
                    a = 100 / t;
                for (n = 0; n < e; n++) {
                    for (i += "<tr>", r = 0; r < t; r++) i += "<td" + (T.opts.tableDefaultWidth ? ' style="width: ' + a.toFixed(4) + '%;"' : "") + ">", 0 === n && 0 === r && (i += Ee.FE.MARKERS), i += "<br></td>";
                    i += "</tr>"
                }
                i += "</tbody></table>", T.html.insert(i), T.selection.restore();
                var o = T.$el.find(".fr-inserted-table");
                o.removeClass("fr-inserted-table"), T.events.trigger("table.inserted", [o.get(0)])
            },
            remove: h,
            insertRow: g,
            deleteRow: function() {
                var e = Z();
                if (0 < e.length) {
                    var t, n, r, i = S(),
                        a = N(i);
                    if (0 === a.min_i && a.max_i == i.length - 1) h();
                    else {
                        for (t = a.max_i; t >= a.min_i; t--) {
                            for (r = Ee(e.find("tr").not(e.find("table tr")).get(t)), n = 0; n < i[t].length; n++)
                                if (0 === n || i[t][n] != i[t][n - 1]) {
                                    var o = Ee(i[t][n]);
                                    if (1 < parseInt(o.attr("rowspan"), 10)) {
                                        var s = parseInt(o.attr("rowspan"), 10) - 1;
                                        1 == s ? o.removeAttr("rowspan") : o.attr("rowspan", s)
                                    }
                                    if (t < i.length - 1 && i[t][n] == i[t + 1][n] && (0 === t || i[t][n] != i[t - 1][n])) {
                                        for (var l = i[t][n], d = n; 0 < d && i[t][d] == i[t][d - 1];) d--;
                                        0 === d ? Ee(e.find("tr").not(e.find("table tr")).get(t + 1)).prepend(l) : Ee(i[t + 1][d - 1]).after(l)
                                    }
                                }
                            var c = r.parent();
                            r.remove(), 0 === c.find("tr").length && c.remove(), i = S(e)
                        }
                        C(0, i.length - 1, 0, i[0].length - 1, e), 0 < a.min_i ? T.selection.setAtEnd(i[a.min_i - 1][0]) : T.selection.setAtEnd(i[0][0]), T.selection.restore(), T.popups.hide("table.edit")
                    }
                }
            },
            insertColumn: function(l) {
                var e = Z();
                if (0 < e.length) {
                    var d, c = S(),
                        t = N(c);
                    d = "before" == l ? t.min_j : t.max_j;
                    var n, f = 100 / c[0].length,
                        p = 100 / (c[0].length + 1);
                    e.find("th, td").each(function() {
                        (n = Ee(this)).data("old-width", n.outerWidth() / e.outerWidth() * 100)
                    }), e.find("tr").not(e.find("table tr")).each(function(e) {
                        for (var t, n = Ee(this), r = 0, i = 0; r - 1 < d;) {
                            if (!(t = n.find("> th, > td").get(i))) { t = null; break }
                            t == c[e][r] ? (r += parseInt(Ee(t).attr("colspan"), 10) || 1, i++) : (r += parseInt(Ee(c[e][r]).attr("colspan"), 10) || 1, "after" == l && (t = 0 === i ? -1 : n.find("> th, > td").get(i - 1)))
                        }
                        var a, o = Ee(t);
                        if ("after" == l && d < r - 1 || "before" == l && 0 < d && c[e][d] == c[e][d - 1]) {
                            if (0 === e || 0 < e && c[e][d] != c[e - 1][d]) {
                                var s = parseInt(o.attr("colspan"), 10) + 1;
                                o.attr("colspan", s), o.css("width", (o.data("old-width") * p / f + p).toFixed(4) + "%"), o.removeData("old-width")
                            }
                        } else a = 0 < n.find("th").length ? '<th style="width: ' + p.toFixed(4) + '%;"><br></th>' : '<td style="width: ' + p.toFixed(4) + '%;"><br></td>', -1 == t ? n.prepend(a) : null == t ? n.append(a) : "before" == l ? o.before(a) : "after" == l && o.after(a)
                    }), e.find("th, td").each(function() {
                        (n = Ee(this)).data("old-width") && (n.css("width", (n.data("old-width") * p / f).toFixed(4) + "%"), n.removeData("old-width"))
                    }), T.popups.isVisible("table.edit") && u()
                }
            },
            deleteColumn: function() {
                var e = Z();
                if (0 < e.length) {
                    var t, n, r, i = S(),
                        a = N(i);
                    if (0 === a.min_j && a.max_j == i[0].length - 1) h();
                    else {
                        var o = 0;
                        for (t = 0; t < i.length; t++)
                            for (n = 0; n < i[0].length; n++)(r = Ee(i[t][n])).hasClass("fr-selected-cell") || (r.data("old-width", r.outerWidth() / e.outerWidth() * 100), (n < a.min_j || n > a.max_j) && (o += r.outerWidth() / e.outerWidth() * 100));
                        for (o /= i.length, n = a.max_j; n >= a.min_j; n--)
                            for (t = 0; t < i.length; t++)
                                if (0 === t || i[t][n] != i[t - 1][n])
                                    if (r = Ee(i[t][n]), 1 < (parseInt(r.attr("colspan"), 10) || 1)) {
                                        var s = parseInt(r.attr("colspan"), 10) - 1;
                                        1 == s ? r.removeAttr("colspan") : r.attr("colspan", s), r.css("width", (100 * (r.data("old-width") - Y(n, i)) / o).toFixed(4) + "%"), r.removeData("old-width")
                                    } else {
                                        var l = Ee(r.parent().get(0));
                                        r.remove(), 0 === l.find("> th, > td").length && (0 === l.prev().length || 0 === l.next().length || l.prev().find("> th[rowspan], > td[rowspan]").length < l.prev().find("> th, > td").length) && l.remove()
                                    }
                        C(0, i.length - 1, 0, i[0].length - 1, e), 0 < a.min_j ? T.selection.setAtEnd(i[a.min_i][a.min_j - 1]) : T.selection.setAtEnd(i[a.min_i][0]), T.selection.restore(), T.popups.hide("table.edit"), e.find("th, td").each(function() {
                            (r = Ee(this)).data("old-width") && (r.css("width", (100 * r.data("old-width") / o).toFixed(4) + "%"), r.removeData("old-width"))
                        })
                    }
                }
            },
            mergeCells: function() {
                if (1 < Q().length && (0 === T.$el.find("th.fr-selected-cell").length || 0 === T.$el.find("td.fr-selected-cell").length)) {
                    _();
                    var e, t, n = N(S()),
                        r = T.$el.find(".fr-selected-cell"),
                        i = Ee(r[0]),
                        a = i.parent().find(".fr-selected-cell"),
                        o = i.closest("table"),
                        s = i.html(),
                        l = 0;
                    for (e = 0; e < a.length; e++) l += Ee(a[e]).outerWidth();
                    for (i.css("width", (l / o.outerWidth() * 100).toFixed(4) + "%"), n.min_j < n.max_j && i.attr("colspan", n.max_j - n.min_j + 1), n.min_i < n.max_i && i.attr("rowspan", n.max_i - n.min_i + 1), e = 1; e < r.length; e++) "<br>" != (t = Ee(r[e])).html() && "" !== t.html() && (s += "<br>" + t.html()), t.remove();
                    i.html(s), T.selection.setAtEnd(i.get(0)), T.selection.restore(), T.toolbar.enable(), v(n.min_i, n.max_i, o);
                    var d = o.find("tr:empty");
                    for (e = d.length - 1; 0 <= e; e--) Ee(d[e]).remove();
                    m(n.min_j, n.max_j, o), u()
                }
            },
            splitCellVertically: function() {
                if (1 == Q().length) {
                    var e = T.$el.find(".fr-selected-cell"),
                        t = parseInt(e.attr("colspan"), 10) || 1,
                        n = e.parent().outerWidth(),
                        r = e.outerWidth(),
                        i = e.clone().html("<br>"),
                        a = S(),
                        o = R(e.get(0), a);
                    if (1 < t) {
                        var s = Math.ceil(t / 2);
                        r = G(o.col, o.col + s - 1, a) / n * 100;
                        var l = G(o.col + s, o.col + t - 1, a) / n * 100;
                        1 < s ? e.attr("colspan", s) : e.removeAttr("colspan"), 1 < t - s ? i.attr("colspan", t - s) : i.removeAttr("colspan"), e.css("width", r.toFixed(4) + "%"), i.css("width", l.toFixed(4) + "%")
                    } else {
                        var d;
                        for (d = 0; d < a.length; d++)
                            if (0 === d || a[d][o.col] != a[d - 1][o.col]) {
                                var c = Ee(a[d][o.col]);
                                if (!c.is(e)) {
                                    var f = (parseInt(c.attr("colspan"), 10) || 1) + 1;
                                    c.attr("colspan", f)
                                }
                            }
                        r = r / n * 100 / 2, e.css("width", r.toFixed(4) + "%"), i.css("width", r.toFixed(4) + "%")
                    }
                    e.after(i), L(), T.popups.hide("table.edit")
                }
            },
            splitCellHorizontally: function() {
                if (1 == Q().length) {
                    var e = T.$el.find(".fr-selected-cell"),
                        t = e.parent(),
                        n = e.closest("table"),
                        r = parseInt(e.attr("rowspan"), 10),
                        i = S(),
                        a = R(e.get(0), i),
                        o = e.clone().html("<br>");
                    if (1 < r) {
                        var s = Math.ceil(r / 2);
                        1 < s ? e.attr("rowspan", s) : e.removeAttr("rowspan"), 1 < r - s ? o.attr("rowspan", r - s) : o.removeAttr("rowspan");
                        for (var l = a.row + s, d = 0 === a.col ? a.col : a.col - 1; 0 <= d && (i[l][d] == i[l][d - 1] || 0 < l && i[l][d] == i[l - 1][d]);) d--; - 1 == d ? Ee(n.find("tr").not(n.find("table tr")).get(l)).prepend(o) : Ee(i[l][d]).after(o)
                    } else {
                        var c, f = Ee("<tr>").append(o);
                        for (c = 0; c < i[0].length; c++)
                            if (0 === c || i[a.row][c] != i[a.row][c - 1]) {
                                var p = Ee(i[a.row][c]);
                                p.is(e) || p.attr("rowspan", (parseInt(p.attr("rowspan"), 10) || 1) + 1)
                            }
                        t.after(f)
                    }
                    L(), T.popups.hide("table.edit")
                }
            },
            addHeader: function() {
                var e = Z();
                if (0 < e.length && 0 === e.find("th").length) {
                    var t, n = "<thead><tr>",
                        r = 0;
                    for (e.find("tr:first > td").each(function() {
                            var e = Ee(this);
                            r += parseInt(e.attr("colspan"), 10) || 1
                        }), t = 0; t < r; t++) n += "<th><br></th>";
                    n += "</tr></thead>", e.prepend(n), u()
                }
            },
            removeHeader: function() {
                var e = Z(),
                    t = e.find("thead");
                if (0 < t.length)
                    if (0 === e.find("tbody tr").length) h();
                    else if (t.remove(), 0 < Q().length) u();
                else {
                    T.popups.hide("table.edit");
                    var n = e.find("tbody tr:first td:first").get(0);
                    n && (T.selection.setAtEnd(n), T.selection.restore())
                }
            },
            setBackground: t,
            showInsertPopup: function() {
                var e = T.$tb.find('.fr-command[data-cmd="insertTable"]'),
                    t = T.popups.get("table.insert");
                if (t || (t = c()), !t.hasClass("fr-active")) {
                    T.popups.refresh("table.insert"), T.popups.setContainer("table.insert", T.$tb);
                    var n = e.offset().left + e.outerWidth() / 2,
                        r = e.offset().top + (T.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
                    T.popups.show("table.insert", n, r, e.outerHeight())
                }
            },
            showEditPopup: u,
            showColorsPopup: d,
            back: function() { 0 < Q().length ? u() : (T.popups.hide("table.insert"), T.toolbar.showInline()) },
            verticalAlign: function(e) { T.$el.find(".fr-selected-cell").css("vertical-align", e) },
            horizontalAlign: function(e) { T.$el.find(".fr-selected-cell").css("text-align", e) },
            applyStyle: function(e, t, n, r) {
                if (0 < t.length) {
                    if (!n) {
                        var i = Object.keys(r);
                        i.splice(i.indexOf(e), 1), t.removeClass(i.join(" "))
                    }
                    t.toggleClass(e)
                }
            },
            selectedTable: Z,
            selectedCells: Q,
            customColor: function() {
                var e = T.popups.get("table.colors").find(".fr-table-colors-hex-layer input");
                e.length && t(e.val())
            }
        }
    }, Ee.FE.DefineIcon("insertTable", { NAME: "table" }), Ee.FE.RegisterCommand("insertTable", { title: "Insert Table", undo: !1, focus: !0, refreshOnCallback: !1, popup: !0, callback: function() { this.popups.isVisible("table.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("table.insert")) : this.table.showInsertPopup() }, plugin: "table" }), Ee.FE.RegisterCommand("tableInsert", { callback: function(e, t, n) { this.table.insert(t, n), this.popups.hide("table.insert") } }), Ee.FE.DefineIcon("tableHeader", { NAME: "header", FA5NAME: "heading" }), Ee.FE.RegisterCommand("tableHeader", {
        title: "Table Header",
        focus: !1,
        toggle: !0,
        callback: function() { this.popups.get("table.edit").find('.fr-command[data-cmd="tableHeader"]').hasClass("fr-active") ? this.table.removeHeader() : this.table.addHeader() },
        refresh: function(e) {
            var t = this.table.selectedTable();
            0 < t.length && (0 === t.find("th").length ? e.removeClass("fr-active").attr("aria-pressed", !1) : e.addClass("fr-active").attr("aria-pressed", !0))
        }
    }), Ee.FE.DefineIcon("tableRows", { NAME: "bars" }), Ee.FE.RegisterCommand("tableRows", {
        type: "dropdown",
        focus: !1,
        title: "Row",
        options: { above: "Insert row above", below: "Insert row below", "delete": "Delete row" },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = Ee.FE.COMMANDS.tableRows.options;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableRows" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.language.translate(t[n]) + "</a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) { "above" == t || "below" == t ? this.table.insertRow(t) : this.table.deleteRow() }
    }), Ee.FE.DefineIcon("tableColumns", { NAME: "bars fa-rotate-90" }), Ee.FE.RegisterCommand("tableColumns", {
        type: "dropdown",
        focus: !1,
        title: "Column",
        options: { before: "Insert column before", after: "Insert column after", "delete": "Delete column" },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = Ee.FE.COMMANDS.tableColumns.options;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableColumns" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.language.translate(t[n]) + "</a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) { "before" == t || "after" == t ? this.table.insertColumn(t) : this.table.deleteColumn() }
    }), Ee.FE.DefineIcon("tableCells", { NAME: "square-o", FA5NAME: "square" }), Ee.FE.RegisterCommand("tableCells", {
        type: "dropdown",
        focus: !1,
        title: "Cell",
        options: { merge: "Merge cells", "vertical-split": "Vertical split", "horizontal-split": "Horizontal split" },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = Ee.FE.COMMANDS.tableCells.options;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCells" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.language.translate(t[n]) + "</a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) { "merge" == t ? this.table.mergeCells() : "vertical-split" == t ? this.table.splitCellVertically() : this.table.splitCellHorizontally() },
        refreshOnShow: function(e, t) { 1 < this.$el.find(".fr-selected-cell").length ? (t.find('a[data-param1="vertical-split"]').addClass("fr-disabled").attr("aria-disabled", !0), t.find('a[data-param1="horizontal-split"]').addClass("fr-disabled").attr("aria-disabled", !0), t.find('a[data-param1="merge"]').removeClass("fr-disabled").attr("aria-disabled", !1)) : (t.find('a[data-param1="merge"]').addClass("fr-disabled").attr("aria-disabled", !0), t.find('a[data-param1="vertical-split"]').removeClass("fr-disabled").attr("aria-disabled", !1), t.find('a[data-param1="horizontal-split"]').removeClass("fr-disabled").attr("aria-disabled", !1)) }
    }), Ee.FE.DefineIcon("tableRemove", { NAME: "trash" }), Ee.FE.RegisterCommand("tableRemove", { title: "Remove Table", focus: !1, callback: function() { this.table.remove() } }), Ee.FE.DefineIcon("tableStyle", { NAME: "paint-brush" }), Ee.FE.RegisterCommand("tableStyle", {
        title: "Table Style",
        type: "dropdown",
        focus: !1,
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.tableStyles;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableStyle" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.language.translate(t[n]) + "</a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) { this.table.applyStyle(t, this.$el.find(".fr-selected-cell").closest("table"), this.opts.tableMultipleStyles, this.opts.tableStyles) },
        refreshOnShow: function(e, t) {
            var n = this.$el.find(".fr-selected-cell").closest("table");
            n && t.find(".fr-command").each(function() {
                var e = Ee(this).data("param1"),
                    t = n.hasClass(e);
                Ee(this).toggleClass("fr-active", t).attr("aria-selected", t)
            })
        }
    }), Ee.FE.DefineIcon("tableCellBackground", { NAME: "tint" }), Ee.FE.RegisterCommand("tableCellBackground", { title: "Cell Background", focus: !1, popup: !0, callback: function() { this.table.showColorsPopup() } }), Ee.FE.RegisterCommand("tableCellBackgroundColor", { undo: !0, focus: !1, callback: function(e, t) { this.table.setBackground(t) } }), Ee.FE.DefineIcon("tableBack", { NAME: "arrow-left" }), Ee.FE.RegisterCommand("tableBack", { title: "Back", undo: !1, focus: !1, back: !0, callback: function() { this.table.back() }, refresh: function(e) { 0 !== this.table.selectedCells().length || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden")) } }), Ee.FE.DefineIcon("tableCellVerticalAlign", { NAME: "arrows-v", FA5NAME: "arrows-alt-v" }), Ee.FE.RegisterCommand("tableCellVerticalAlign", {
        type: "dropdown",
        focus: !1,
        title: "Vertical Align",
        options: { Top: "Align Top", Middle: "Align Middle", Bottom: "Align Bottom" },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = Ee.FE.COMMANDS.tableCellVerticalAlign.options;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellVerticalAlign" data-param1="' + n.toLowerCase() + '" title="' + this.language.translate(t[n]) + '">' + this.language.translate(n) + "</a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) { this.table.verticalAlign(t) },
        refreshOnShow: function(e, t) { t.find('.fr-command[data-param1="' + this.$el.find(".fr-selected-cell").css("vertical-align") + '"]').addClass("fr-active").attr("aria-selected", !0) }
    }), Ee.FE.DefineIcon("tableCellHorizontalAlign", { NAME: "align-left" }), Ee.FE.DefineIcon("align-left", { NAME: "align-left" }), Ee.FE.DefineIcon("align-right", { NAME: "align-right" }), Ee.FE.DefineIcon("align-center", { NAME: "align-center" }), Ee.FE.DefineIcon("align-justify", { NAME: "align-justify" }), Ee.FE.RegisterCommand("tableCellHorizontalAlign", {
        type: "dropdown",
        focus: !1,
        title: "Horizontal Align",
        options: { left: "Align Left", center: "Align Center", right: "Align Right", justify: "Align Justify" },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = Ee.FE.COMMANDS.tableCellHorizontalAlign.options;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="tableCellHorizontalAlign" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.icon.create("align-" + n) + '<span class="fr-sr-only">' + this.language.translate(t[n]) + "</span></a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) { this.table.horizontalAlign(t) },
        refresh: function(e) {
            var t = this.table.selectedCells();
            t.length && e.find("> *:first").replaceWith(this.icon.create("align-" + this.helpers.getAlignment(Ee(t[0]))))
        },
        refreshOnShow: function(e, t) { t.find('.fr-command[data-param1="' + this.helpers.getAlignment(this.$el.find(".fr-selected-cell:first")) + '"]').addClass("fr-active").attr("aria-selected", !0) }
    }), Ee.FE.DefineIcon("tableCellStyle", { NAME: "magic" }), Ee.FE.RegisterCommand("tableCellStyle", {
        title: "Cell Style",
        type: "dropdown",
        focus: !1,
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.tableCellStyles;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellStyle" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.language.translate(t[n]) + "</a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) { this.table.applyStyle(t, this.$el.find(".fr-selected-cell"), this.opts.tableCellMultipleStyles, this.opts.tableCellStyles) },
        refreshOnShow: function(e, t) {
            var n = this.$el.find(".fr-selected-cell:first");
            n && t.find(".fr-command").each(function() {
                var e = Ee(this).data("param1"),
                    t = n.hasClass(e);
                Ee(this).toggleClass("fr-active", t).attr("aria-selected", t)
            })
        }
    }), Ee.FE.RegisterCommand("tableCellBackgroundCustomColor", { title: "OK", undo: !0, callback: function() { this.table.customColor() } }), Ee.FE.DefineIcon("tableColorRemove", { NAME: "eraser" }), Ee.FE.URLRegEx = "(^| |\\u00A0)(" + Ee.FE.LinkRegEx + "|([a-z0-9+-_.]{1,}@[a-z0-9+-_.]{1,}\\.[a-z0-9+-_]{1,}))$", Ee.FE.PLUGINS.url = function(a) {
        var o = null;

        function t(e, t, n) {
            for (var r = ""; n.length && "." == n[n.length - 1];) r += ".", n = n.substring(0, n.length - 1);
            var i = n;
            if (a.opts.linkConvertEmailAddress) a.helpers.isEmail(i) && !/^mailto:.*/i.test(i) && (i = "mailto:" + i);
            else if (a.helpers.isEmail(i)) return t + n;
            return /^((http|https|ftp|ftps|mailto|tel|sms|notes|data)\:)/i.test(i) || (i = "//" + i), (t || "") + "<a" + (a.opts.linkAlwaysBlank ? ' target="_blank"' : "") + (o ? ' rel="' + o + '"' : "") + ' data-fr-linked="true" href="' + i + '">' + n.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&amp;/g, "&").replace(/&/g, "&amp;") + "</a>" + r
        }

        function i() { return new RegExp(Ee.FE.URLRegEx, "gi") }

        function s(e) { return a.opts.linkAlwaysNoFollow && (o = "nofollow"), a.opts.linkAlwaysBlank && (a.opts.linkNoOpener && (o ? o += " noopener" : o = "noopener"), a.opts.linkNoReferrer && (o ? o += " noreferrer" : o = "noreferrer")), e.replace(i(), t) }

        function l(e) { var t = e.split(" "); return t[t.length - 1] }

        function n() {
            var t = a.selection.ranges(0).startContainer;
            if (!t || t.nodeType !== Node.TEXT_NODE) return !1;
            if (function e(t) { return !!t && ("A" === t.tagName || !(!t.parentNode || t.parentNode == a.el) && e(t.parentNode)) }(t)) return !1;
            if (i().test(l(t.textContent))) {
                Ee(t).before(s(t.textContent));
                var n = Ee(t.parentNode).find("a[data-fr-linked]");
                n.removeAttr("data-fr-linked"), t.parentNode.removeChild(t), a.events.trigger("url.linked", [n.get(0)])
            } else if (t.textContent.split(" ").length <= 2 && t.previousSibling && "A" === t.previousSibling.tagName) {
                var r = t.previousSibling.innerText + t.textContent;
                i().test(l(r)) && (Ee(t.previousSibling).replaceWith(s(r)), t.parentNode.removeChild(t))
            }
        }
        return { _init: function() { a.events.on("keypress", function(e) {!a.selection.isCollapsed() || "." != e.key && ")" != e.key && "(" != e.key || n() }, !0), a.events.on("keydown", function(e) { var t = e.which;!a.selection.isCollapsed() || t != Ee.FE.KEYCODE.ENTER && t != Ee.FE.KEYCODE.SPACE || n() }, !0), a.events.on("paste.beforeCleanup", function(e) { if (a.helpers.isURL(e)) { var t = null; return a.opts.linkAlwaysBlank && (a.opts.linkNoOpener && (t ? t += " noopener" : t = "noopener"), a.opts.linkNoReferrer && (t ? t += " noreferrer" : t = "noreferrer")), "<a" + (a.opts.linkAlwaysBlank ? ' target="_blank"' : "") + (t ? ' rel="' + t + '"' : "") + ' href="' + e + '" >' + e + "</a>" } }) } }
    }, Ee.extend(Ee.FE.POPUP_TEMPLATES, { "video.insert": "[_BUTTONS_][_BY_URL_LAYER_][_EMBED_LAYER_][_UPLOAD_LAYER_][_PROGRESS_BAR_]", "video.edit": "[_BUTTONS_]", "video.size": "[_BUTTONS_][_SIZE_LAYER_]" }), Ee.extend(Ee.FE.DEFAULTS, { videoAllowedTypes: ["mp4", "webm", "ogg"], videoAllowedProviders: [".*"], videoDefaultAlign: "center", videoDefaultDisplay: "block", videoDefaultWidth: 600, videoEditButtons: ["videoReplace", "videoRemove", "|", "videoDisplay", "videoAlign", "videoSize"], videoInsertButtons: ["videoBack", "|", "videoByURL", "videoEmbed", "videoUpload"], videoMaxSize: 52428800, videoMove: !0, videoResize: !0, videoSizeButtons: ["videoBack", "|"], videoSplitHTML: !1, videoTextNear: !0, videoUpload: !0, videoUploadMethod: "POST", videoUploadParam: "file", videoUploadParams: {}, videoUploadToS3: !1, videoUploadURL: "https://i.froala.com/upload" }), Ee.FE.VIDEO_PROVIDERS = [{ test_regex: /^.*((youtu.be)|(youtube.com))\/((v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))?\??v?=?([^#\&\?]*).*/, url_regex: /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([0-9a-zA-Z_\-]+)(.+)?/g, url_text: "https://www.youtube.com/embed/$1", html: '<iframe width="640" height="360" src="{url}?wmode=opaque" frameborder="0" allowfullscreen></iframe>', provider: "youtube" }, { test_regex: /^.*(?:vimeo.com)\/(?:channels(\/\w+\/)?|groups\/*\/videos\/\u200b\d+\/|video\/|)(\d+)(?:$|\/|\?)/, url_regex: /(?:https?:\/\/)?(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i, url_text: "https://player.vimeo.com/video/$1", html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>', provider: "vimeo" }, { test_regex: /^.+(dailymotion.com|dai.ly)\/(video|hub)?\/?([^_]+)[^#]*(#video=([^_&]+))?/, url_regex: /(?:https?:\/\/)?(?:www\.)?(?:dailymotion\.com|dai\.ly)\/(?:video|hub)?\/?(.+)/g, url_text: "https://www.dailymotion.com/embed/video/$1", html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>', provider: "dailymotion" }, { test_regex: /^.+(screen.yahoo.com)\/[^_&]+/, url_regex: "", url_text: "", html: '<iframe width="640" height="360" src="{url}?format=embed" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>', provider: "yahoo" }, { test_regex: /^.+(rutube.ru)\/[^_&]+/, url_regex: /(?:https?:\/\/)?(?:www\.)?(?:rutube\.ru)\/(?:video)?\/?(.+)/g, url_text: "https://rutube.ru/play/embed/$1", html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>', provider: "rutube" }, { test_regex: /^(?:.+)vidyard.com\/(?:watch)?\/?([^.&/]+)\/?(?:[^_.&]+)?/, url_regex: /^(?:.+)vidyard.com\/(?:watch)?\/?([^.&/]+)\/?(?:[^_.&]+)?/g, url_text: "https://play.vidyard.com/$1", html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>', provider: "vidyard" }], Ee.FE.VIDEO_EMBED_REGEX = /^\W*((<iframe.*><\/iframe>)|(<embed.*>))\W*$/i, Ee.FE.PLUGINS.video = function(f) {
        var s, c, p, u, r, n, l = 2,
            d = 3,
            h = 4,
            g = 5,
            m = 6,
            i = {};

        function v() {
            var e = f.popups.get("video.insert");
            e.find(".fr-video-by-url-layer input").val("").trigger("change");
            var t = e.find(".fr-video-embed-layer textarea");
            t.val("").trigger("change"), (t = e.find(".fr-video-upload-layer input")).val("").trigger("change")
        }

        function a() {
            var e = f.popups.get("video.edit");
            if (e || (e = function() {
                    var e = "";
                    if (0 < f.opts.videoEditButtons.length) {
                        e += '<div class="fr-buttons">', e += f.button.buildList(f.opts.videoEditButtons);
                        var t = { buttons: e += "</div>" },
                            n = f.popups.create("video.edit", t);
                        return f.events.$on(f.$wp, "scroll.video-edit", function() { u && f.popups.isVisible("video.edit") && (f.events.disableBlur(), R(u)) }), n
                    }
                    return !1
                }()), e) {
                f.popups.setContainer("video.edit", f.$sc), f.popups.refresh("video.edit");
                var t = u.find("iframe, embed, video"),
                    n = t.offset().left + t.outerWidth() / 2,
                    r = t.offset().top + t.outerHeight();
                f.popups.show("video.edit", n, r, t.outerHeight())
            }
        }

        function o(e) {
            if (e) return f.popups.onRefresh("video.insert", v), f.popups.onHide("image.insert", G), !0;
            var t = "";
            f.opts.videoUpload || f.opts.videoInsertButtons.splice(f.opts.videoInsertButtons.indexOf("videoUpload"), 1), 1 < f.opts.videoInsertButtons.length && (t = '<div class="fr-buttons">' + f.button.buildList(f.opts.videoInsertButtons) + "</div>");
            var n, r = "",
                i = f.opts.videoInsertButtons.indexOf("videoUpload"),
                a = f.opts.videoInsertButtons.indexOf("videoByURL"),
                o = f.opts.videoInsertButtons.indexOf("videoEmbed");
            0 <= a && (n = " fr-active", (i < a && 0 <= i || o < a && 0 <= o) && (n = ""), r = '<div class="fr-video-by-url-layer fr-layer' + n + '" id="fr-video-by-url-layer-' + f.id + '"><div class="fr-input-line"><input id="fr-video-by-url-layer-text-' + f.id + '" type="text" placeholder="' + f.language.translate("Paste in a video URL") + '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertByURL" tabIndex="2" role="button">' + f.language.translate("Insert") + "</button></div></div>");
            var s = "";
            0 <= o && (n = " fr-active", (i < o && 0 <= i || a < o && 0 <= a) && (n = ""), s = '<div class="fr-video-embed-layer fr-layer' + n + '" id="fr-video-embed-layer-' + f.id + '"><div class="fr-input-line"><textarea id="fr-video-embed-layer-text' + f.id + '" type="text" placeholder="' + f.language.translate("Embedded Code") + '" tabIndex="1" aria-required="true" rows="5"></textarea></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertEmbed" tabIndex="2" role="button">' + f.language.translate("Insert") + "</button></div></div>");
            var l = "";
            0 <= i && (n = " fr-active", (o < i && 0 <= o || a < i && 0 <= a) && (n = ""), l = '<div class="fr-video-upload-layer fr-layer' + n + '" id="fr-video-upload-layer-' + f.id + '"><strong>' + f.language.translate("Drop video") + "</strong><br>(" + f.language.translate("or click") + ')<div class="fr-form"><input type="file" accept="video/' + f.opts.videoAllowedTypes.join(", video/").toLowerCase() + '" tabIndex="-1" aria-labelledby="fr-video-upload-layer-' + f.id + '" role="button"></div></div>');
            var d = { buttons: t, by_url_layer: r, embed_layer: s, upload_layer: l, progress_bar: '<div class="fr-video-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="videoDismissError" tabIndex="2" role="button">OK</button></div></div>' },
                c = f.popups.create("video.insert", d);
            return function(r) {
                f.events.$on(r, "dragover dragenter", ".fr-video-upload-layer", function() { return Ee(this).addClass("fr-drop"), !1 }, !0), f.events.$on(r, "dragleave dragend", ".fr-video-upload-layer", function() { return Ee(this).removeClass("fr-drop"), !1 }, !0), f.events.$on(r, "drop", ".fr-video-upload-layer", function(e) {
                    e.preventDefault(), e.stopPropagation(), Ee(this).removeClass("fr-drop");
                    var t = e.originalEvent.dataTransfer;
                    if (t && t.files) {
                        var n = r.data("instance") || f;
                        n.events.disableBlur(), n.video.upload(t.files), n.events.enableBlur()
                    }
                }, !0), f.helpers.isIOS() && f.events.$on(r, "touchstart", '.fr-video-upload-layer input[type="file"]', function() { Ee(this).trigger("click") }, !0);
                f.events.$on(r, "change", '.fr-video-upload-layer input[type="file"]', function() {
                    if (this.files) {
                        var e = r.data("instance") || f;
                        e.events.disableBlur(), r.find("input:focus").blur(), e.events.enableBlur(), e.video.upload(this.files)
                    }
                    Ee(this).val("")
                }, !0)
            }(c), c
        }

        function E(e) {
            f.events.focus(!0), f.selection.restore();
            var t = !1;
            u && (Y(), t = !0), f.html.insert('<span contenteditable="false" draggable="true" class="fr-jiv fr-video">' + e + "</span>", !1, f.opts.videoSplitHTML), f.popups.hide("video.insert");
            var n = f.$el.find(".fr-jiv");
            n.removeClass("fr-jiv"), V(n, f.opts.videoDefaultDisplay, f.opts.videoDefaultAlign), n.toggleClass("fr-draggable", f.opts.videoMove), f.events.trigger(t ? "video.replaced" : "video.inserted", [n])
        }

        function b() {
            var e = Ee(this);
            f.popups.hide("video.insert"), e.removeClass("fr-uploading"), e.parent().next().is("br") && e.parent().next().remove(), R(e.parent()), f.events.trigger("video.loaded", [e.parent()])
        }

        function T(s, e, l, d, c) {
            f.edit.off(), S("Loading video"), e && (s = f.helpers.sanitizeURL(s));
            A("Loading video"),
                function() {
                    var e, t;
                    if (d) {
                        f.undo.canDo() || d.find("video").hasClass("fr-uploading") || f.undo.saveStep();
                        var n = d.find("video").data("fr-old-src"),
                            r = d.data("fr-replaced");
                        d.data("fr-replaced", !1), f.$wp ? ((e = d.clone()).find("video").removeData("fr-old-src").removeClass("fr-uploading"), e.find("video").off("canplay"), n && d.find("video").attr("src", n), d.replaceWith(e)) : e = d;
                        for (var i = e.find("video").get(0).attributes, a = 0; a < i.length; a++) {
                            var o = i[a];
                            0 === o.nodeName.indexOf("data-") && e.find("video").removeAttr(o.nodeName)
                        }
                        if (void 0 !== l)
                            for (t in l) l.hasOwnProperty(t) && "link" != t && e.find("video").attr("data-" + t, l[t]);
                        e.find("video").on("canplay", b), e.find("video").attr("src", s), f.edit.on(), D(), f.undo.saveStep(), f.$el.blur(), f.events.trigger(r ? "video.replaced" : "video.inserted", [e, c])
                    } else e = function(e, t, n) {
                        var r, i = "";
                        if (t && void 0 !== t)
                            for (r in t) t.hasOwnProperty(r) && "link" != r && (i += " data-" + r + '="' + t[r] + '"');
                        var a = f.opts.videoDefaultWidth;
                        a && "auto" != a && (a += "px");
                        var o = Ee('<span contenteditable="false" draggable="true" class="fr-video fr-dv' + f.opts.videoDefaultDisplay[0] + ("center" != f.opts.videoDefaultAlign ? " fr-fv" + f.opts.videoDefaultAlign[0] : "") + '"><video src="' + e + '" ' + i + (a ? ' style="width: ' + a + ';" ' : "") + " controls>" + f.language.translate("Your browser does not support HTML5 video.") + "</video></span>");
                        o.toggleClass("fr-draggable", f.opts.videoMove), f.edit.on(), f.events.focus(!0), f.selection.restore(), f.undo.saveStep(), f.opts.videoSplitHTML ? f.markers.split() : f.markers.insert(), f.html.wrap();
                        var s = f.$el.find(".fr-marker");
                        return f.node.isLastSibling(s) && s.parent().hasClass("fr-deletable") && s.insertAfter(s.parent()), s.replaceWith(o), f.selection.clear(), o.find("video").get(0).readyState > o.find("video").get(0).HAVE_FUTURE_DATA || f.helpers.isIOS() ? n.call(o.find("video").get(0)) : o.find("video").on("canplaythrough load", n), o
                    }(s, l, b), D(), f.undo.saveStep(), f.events.trigger("video.inserted", [e, c])
                }()
        }

        function A(e) {
            var t = f.popups.get("video.insert");
            if (t || (t = o()), t.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), t.find(".fr-video-progress-bar-layer").addClass("fr-active"), t.find(".fr-buttons").hide(), u) {
                var n = u.find("video");
                f.popups.setContainer("video.insert", f.$sc);
                var r = n.offset().left + n.width() / 2,
                    i = n.offset().top + n.height();
                f.popups.show("video.insert", r, i, n.outerHeight())
            }
            void 0 === e && S(f.language.translate("Uploading"), 0)
        }

        function C(e) {
            var t = f.popups.get("video.insert");
            if (t && (t.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), t.find(".fr-video-progress-bar-layer").removeClass("fr-active"), t.find(".fr-buttons").show(), e || f.$el.find("video.fr-error").length)) {
                if (f.events.focus(), f.$el.find("video.fr-error").length && (f.$el.find("video.fr-error").parent().remove(), f.undo.saveStep(), f.undo.run(), f.undo.dropRedo()), !f.$wp && u) {
                    var n = u;
                    M(!0), f.selection.setAfter(n.find("video").get(0)), f.selection.restore()
                }
                f.popups.hide("video.insert")
            }
        }

        function S(e, t) {
            var n = f.popups.get("video.insert");
            if (n) {
                var r = n.find(".fr-video-progress-bar-layer");
                r.find("h3").text(e + (t ? " " + t + "%" : "")), r.removeClass("fr-error"), t ? (r.find("div").removeClass("fr-indeterminate"), r.find("div > span").css("width", t + "%")) : r.find("div").addClass("fr-indeterminate")
            }
        }

        function R(e) { F.call(e.get(0)) }

        function y(e) {
            S("Loading video");
            var t = this.status,
                n = this.response,
                r = this.responseXML,
                i = this.responseText;
            try {
                if (f.opts.videoUploadToS3)
                    if (201 == t) {
                        var a = function(e) {
                            try {
                                var t = Ee(e).find("Location").text(),
                                    n = Ee(e).find("Key").text();
                                return !1 === f.events.trigger("video.uploadedToS3", [t, n, e], !0) ? (f.edit.on(), !1) : t
                            } catch (r) { return K(h, e), !1 }
                        }(r);
                        a && T(a, !1, [], e, n || r)
                    } else K(h, n || r);
                else if (200 <= t && t < 300) {
                    var o = function(e) { try { if (!1 === f.events.trigger("video.uploaded", [e], !0)) return f.edit.on(), !1; var t = JSON.parse(e); return t.link ? t : (K(l, e), !1) } catch (n) { return K(h, e), !1 } }(i);
                    o && T(o.link, !1, o, e, n || i)
                } else K(d, n || i)
            } catch (s) { K(h, n || i) }
        }

        function _() { K(h, this.response || this.responseText || this.responseXML) }

        function L(e) {
            if (e.lengthComputable) {
                var t = e.loaded / e.total * 100 | 0;
                S(f.language.translate("Uploading"), t)
            }
        }

        function x() { f.edit.on(), C(!0) }

        function N(e) {
            if (!f.core.sameInstance(p)) return !0;
            e.preventDefault(), e.stopPropagation();
            var t = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null),
                n = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : null);
            if (!t || !n) return !1;
            if ("mousedown" == e.type) {
                var r = f.$oel.get(0).ownerDocument,
                    i = r.defaultView || r.parentWindow,
                    a = !1;
                try { a = i.location != i.parent.location && !(i.$ && i.$.FE) } catch (o) {}
                a && i.frameElement && (t += f.helpers.getPX(Ee(i.frameElement).offset().left) + i.frameElement.clientLeft, n = e.clientY + f.helpers.getPX(Ee(i.frameElement).offset().top) + i.frameElement.clientTop)
            }
            f.undo.canDo() || f.undo.saveStep(), (c = Ee(this)).data("start-x", t), c.data("start-y", n), s.show(), f.popups.hideAll(), $()
        }

        function O(e) {
            if (!f.core.sameInstance(p)) return !0;
            if (c) {
                e.preventDefault();
                var t = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null),
                    n = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : null);
                if (!t || !n) return !1;
                var r = c.data("start-x"),
                    i = c.data("start-y");
                c.data("start-x", t), c.data("start-y", n);
                var a = t - r,
                    o = n - i,
                    s = u.find("iframe, embed, video"),
                    l = s.width(),
                    d = s.height();
                (c.hasClass("fr-hnw") || c.hasClass("fr-hsw")) && (a = 0 - a), (c.hasClass("fr-hnw") || c.hasClass("fr-hne")) && (o = 0 - o), s.css("width", l + a), s.css("height", d + o), s.removeAttr("width"), s.removeAttr("height"), k()
            }
        }

        function w(e) {
            if (!f.core.sameInstance(p)) return !0;
            c && u && (e && e.stopPropagation(), c = null, s.hide(), k(), a(), f.undo.saveStep())
        }

        function t(e) { return '<div class="fr-handler fr-h' + e + '"></div>' }

        function I(e, t, n, r) { return e.pageX = t, e.pageY = t, N.call(this, e), e.pageX = e.pageX + n * Math.floor(Math.pow(1.1, r)), e.pageY = e.pageY + n * Math.floor(Math.pow(1.1, r)), O.call(this, e), w.call(this, e), ++r }

        function D() {
            var e, t = Array.prototype.slice.call(f.el.querySelectorAll("video, .fr-video > *")),
                n = [];
            for (e = 0; e < t.length; e++) n.push(t[e].getAttribute("src")), Ee(t[e]).toggleClass("fr-draggable", f.opts.videoMove), "" === t[e].getAttribute("class") && t[e].removeAttribute("class"), "" === t[e].getAttribute("style") && t[e].removeAttribute("style");
            if (r)
                for (e = 0; e < r.length; e++) n.indexOf(r[e].getAttribute("src")) < 0 && f.events.trigger("video.removed", [Ee(r[e])]);
            r = t
        }

        function k() {
            p || function() {
                var e;
                if (f.shared.$video_resizer ? (p = f.shared.$video_resizer, s = f.shared.$vid_overlay, f.events.on("destroy", function() { p.removeClass("fr-active").appendTo(Ee("body:first")) }, !0)) : (f.shared.$video_resizer = Ee('<div class="fr-video-resizer"></div>'), p = f.shared.$video_resizer, f.events.$on(p, "mousedown", function(e) { e.stopPropagation() }, !0), f.opts.videoResize && (p.append(t("nw") + t("ne") + t("sw") + t("se")), f.shared.$vid_overlay = Ee('<div class="fr-video-overlay"></div>'), s = f.shared.$vid_overlay, e = p.get(0).ownerDocument, Ee(e).find("body:first").append(s))), f.events.on("shared.destroy", function() { p.html("").removeData().remove(), p = null, f.opts.videoResize && (s.remove(), s = null) }, !0), f.helpers.isMobile() || f.events.$on(Ee(f.o_win), "resize.video", function() { M(!0) }), f.opts.videoResize) {
                    e = p.get(0).ownerDocument, f.events.$on(p, f._mousedown, ".fr-handler", N), f.events.$on(Ee(e), f._mousemove, O), f.events.$on(Ee(e.defaultView || e.parentWindow), f._mouseup, w), f.events.$on(s, "mouseleave", w);
                    var r = 1,
                        i = null,
                        a = 0;
                    f.events.on("keydown", function(e) {
                        if (u) {
                            var t = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey,
                                n = e.which;
                            (n !== i || 200 < e.timeStamp - a) && (r = 1), (n == Ee.FE.KEYCODE.EQUALS || f.browser.mozilla && n == Ee.FE.KEYCODE.FF_EQUALS) && t && !e.altKey ? r = I.call(this, e, 1, 1, r) : (n == Ee.FE.KEYCODE.HYPHEN || f.browser.mozilla && n == Ee.FE.KEYCODE.FF_HYPHEN) && t && !e.altKey && (r = I.call(this, e, 2, -1, r)), i = n, a = e.timeStamp
                        }
                    }), f.events.on("keyup", function() { r = 1 })
                }
            }(), (f.$wp || f.$sc).append(p), p.data("instance", f);
            var e = u.find("iframe, embed, video");
            p.css("top", (f.opts.iframe ? e.offset().top - 1 : e.offset().top - f.$wp.offset().top - 1) + f.$wp.scrollTop()).css("left", (f.opts.iframe ? e.offset().left - 1 : e.offset().left - f.$wp.offset().left - 1) + f.$wp.scrollLeft()).css("width", e.get(0).getBoundingClientRect().width).css("height", e.get(0).getBoundingClientRect().height).addClass("fr-active")
        }

        function F(e) {
            if (e && "touchend" == e.type && n) return !0;
            if (e && f.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), !1;
            if (f.edit.isDisabled()) return !1;
            for (var t = 0; t < Ee.FE.INSTANCES.length; t++) Ee.FE.INSTANCES[t] != f && Ee.FE.INSTANCES[t].events.trigger("video.hideResizer");
            f.toolbar.disable(), f.helpers.isMobile() && (f.events.disableBlur(), f.$el.blur(), f.events.enableBlur()), f.$el.find(".fr-video.fr-active").removeClass("fr-active"), (u = Ee(this)).addClass("fr-active"), f.opts.iframe && f.size.syncIframe(), q(), k(), a(), f.selection.clear(), f.button.bulkRefresh(), f.events.trigger("image.hideResizer")
        }

        function M(e) { u && (f.shared.vid_exit_flag || !0 === e) && (p.removeClass("fr-active"), f.toolbar.enable(), u.removeClass("fr-active"), u = null, $()) }

        function e() { f.shared.vid_exit_flag = !0 }

        function $() { f.shared.vid_exit_flag = !1 }

        function B(e) {
            var t = e.originalEvent.dataTransfer;
            if (t && t.files && t.files.length) {
                var n = t.files[0];
                if (n && n.type && -1 !== n.type.indexOf("video")) {
                    if (!f.opts.videoUpload) return e.preventDefault(), e.stopPropagation(), !1;
                    f.markers.remove(), f.markers.insertAtPoint(e.originalEvent), f.$el.find(".fr-marker").replaceWith(Ee.FE.MARKERS), f.popups.hideAll();
                    var r = f.popups.get("video.insert");
                    return r || (r = o()), f.popups.setContainer("video.insert", f.$sc), f.popups.show("video.insert", e.originalEvent.pageX, e.originalEvent.pageY), A(), 0 <= f.opts.videoAllowedTypes.indexOf(n.type.replace(/video\//g, "")) ? P(t.files) : K(m), e.preventDefault(), e.stopPropagation(), !1
                }
            }
        }

        function P(e) {
            if (void 0 !== e && 0 < e.length) {
                if (!1 === f.events.trigger("video.beforeUpload", [e])) return !1;
                var t, n = e[0];
                if (n.size > f.opts.videoMaxSize) return K(g), !1;
                if (f.opts.videoAllowedTypes.indexOf(n.type.replace(/video\//g, "")) < 0) return K(m), !1;
                if (f.drag_support.formdata && (t = f.drag_support.formdata ? new FormData : null), t) {
                    var r;
                    if (!1 !== f.opts.videoUploadToS3)
                        for (r in t.append("key", f.opts.videoUploadToS3.keyStart + (new Date).getTime() + "-" + (n.name || "untitled")), t.append("success_action_status", "201"), t.append("X-Requested-With", "xhr"), t.append("Content-Type", n.type), f.opts.videoUploadToS3.params) f.opts.videoUploadToS3.params.hasOwnProperty(r) && t.append(r, f.opts.videoUploadToS3.params[r]);
                    for (r in f.opts.videoUploadParams) f.opts.videoUploadParams.hasOwnProperty(r) && t.append(r, f.opts.videoUploadParams[r]);
                    t.append(f.opts.videoUploadParam, n);
                    var i = f.opts.videoUploadURL;
                    f.opts.videoUploadToS3 && (i = f.opts.videoUploadToS3.uploadURL ? f.opts.videoUploadToS3.uploadURL : "https://" + f.opts.videoUploadToS3.region + ".amazonaws.com/" + f.opts.videoUploadToS3.bucket);
                    var a = f.core.getXHR(i, f.opts.videoUploadMethod);
                    a.onload = function() { y.call(a, u) }, a.onerror = _, a.upload.onprogress = L, a.onabort = x, A(), f.events.disableBlur(), f.edit.off(), f.events.enableBlur();
                    var o = f.popups.get("video.insert");
                    o && o.off("abortUpload").on("abortUpload", function() { 4 != a.readyState && a.abort() }), a.send(t)
                }
            }
        }

        function K(e, t) {
            f.edit.on(), u && u.find("video").addClass("fr-error"),
                function(e) {
                    A();
                    var t = f.popups.get("video.insert").find(".fr-video-progress-bar-layer");
                    t.addClass("fr-error");
                    var n = t.find("h3");
                    n.text(e), f.events.disableBlur(), n.focus()
                }(f.language.translate("Something went wrong. Please try again.")), f.events.trigger("video.error", [{ code: e, message: i[e] }, t])
        }

        function U() {
            if (u) {
                var e = f.popups.get("video.size"),
                    t = u.find("iframe, embed, video");
                e.find('input[name="width"]').val(t.get(0).style.width || t.attr("width")).trigger("change"), e.find('input[name="height"]').val(t.get(0).style.height || t.attr("height")).trigger("change")
            }
        }

        function H(e) {
            if (e) return f.popups.onRefresh("video.size", U), !0;
            var t = { buttons: '<div class="fr-buttons">' + f.button.buildList(f.opts.videoSizeButtons) + "</div>", size_layer: '<div class="fr-video-size-layer fr-layer fr-active" id="fr-video-size-layer-' + f.id + '"><div class="fr-video-group"><div class="fr-input-line"><input id="fr-video-size-layer-width-' + f.id + '" type="text" name="width" placeholder="' + f.language.translate("Width") + '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-video-size-layer-height-' + f.id + '" type="text" name="height" placeholder="' + f.language.translate("Height") + '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoSetSize" tabIndex="2" role="button">' + f.language.translate("Update") + "</button></div></div>" },
                n = f.popups.create("video.size", t);
            return f.events.$on(f.$wp, "scroll", function() { u && f.popups.isVisible("video.size") && (f.events.disableBlur(), R(u)) }), n
        }

        function W(e) { if (void 0 === e && (e = u), e) { if (e.hasClass("fr-fvl")) return "left"; if (e.hasClass("fr-fvr")) return "right"; if (e.hasClass("fr-dvb") || e.hasClass("fr-dvi")) return "center"; if ("block" == e.css("display")) { if ("left" == e.css("text-algin")) return "left"; if ("right" == e.css("text-align")) return "right" } else { if ("left" == e.css("float")) return "left"; if ("right" == e.css("float")) return "right" } } return "center" }

        function z(e) { void 0 === e && (e = u); var t = e.css("float"); return e.css("float", "none"), "block" == e.css("display") ? (e.css("float", ""), e.css("float") != t && e.css("float", t), "block") : (e.css("float", ""), e.css("float") != t && e.css("float", t), "inline") }

        function Y() {
            if (u && !1 !== f.events.trigger("video.beforeRemove", [u])) {
                var e = u;
                f.popups.hideAll(), M(!0), f.selection.setBefore(e.get(0)) || f.selection.setAfter(e.get(0)), e.remove(), f.selection.restore(), f.html.fillEmptyBlocks(), f.events.trigger("video.removed", [e])
            }
        }

        function G() { C() }

        function V(e, t, n) {!f.opts.htmlUntouched && f.opts.useClasses ? (e.removeClass("fr-fvl fr-fvr fr-dvb fr-dvi"), e.addClass("fr-fv" + n[0] + " fr-dv" + t[0])) : "inline" == t ? (e.css({ display: "inline-block" }), "center" == n ? e.css({ "float": "none" }) : "left" == n ? e.css({ "float": "left" }) : e.css({ "float": "right" })) : (e.css({ display: "block", clear: "both" }), "left" == n ? e.css({ textAlign: "left" }) : "right" == n ? e.css({ textAlign: "right" }) : e.css({ textAlign: "center" })) }

        function X() {
            f.$el.find("video").filter(function() { return 0 === Ee(this).parents("span.fr-video").length }).wrap('<span class="fr-video" contenteditable="false"></span>'), f.$el.find("embed, iframe").filter(function() { if (f.browser.safari && this.getAttribute("src") && this.setAttribute("src", this.src), 0 < Ee(this).parents("span.fr-video").length) return !1; for (var e = Ee(this).attr("src"), t = 0; t < Ee.FE.VIDEO_PROVIDERS.length; t++) { var n = Ee.FE.VIDEO_PROVIDERS[t]; if (n.test_regex.test(e) && new RegExp(f.opts.videoAllowedProviders.join("|")).test(n.provider)) return !0 } return !1 }).map(function() { return 0 === Ee(this).parents("object").length ? this : Ee(this).parents("object").get(0) }).wrap('<span class="fr-video" contenteditable="false"></span>');
            for (var e, t, n = f.$el.find("span.fr-video, video"), r = 0; r < n.length; r++) { var i = Ee(n[r]);!f.opts.htmlUntouched && f.opts.useClasses ? ((t = i).hasClass("fr-dvi") || t.hasClass("fr-dvb") || (t.addClass("fr-fv" + W(t)[0]), t.addClass("fr-dv" + z(t)[0])), f.opts.videoTextNear || i.removeClass("fr-dvi").addClass("fr-dvb")) : f.opts.htmlUntouched || f.opts.useClasses || (V(e = i, e.hasClass("fr-dvb") ? "block" : e.hasClass("fr-dvi") ? "inline" : null, e.hasClass("fr-fvl") ? "left" : e.hasClass("fr-fvr") ? "right" : W(e)), e.removeClass("fr-dvb fr-dvi fr-fvr fr-fvl")) }
            n.toggleClass("fr-draggable", f.opts.videoMove)
        }

        function q() {
            if (u) {
                f.selection.clear();
                var e = f.doc.createRange();
                e.selectNode(u.get(0)), f.selection.get().addRange(e)
            }
        }
        return i[1] = "Video cannot be loaded from the passed link.", i[l] = "No link in upload response.", i[d] = "Error during file upload.", i[h] = "Parsing response failed.", i[g] = "File is too large.", i[m] = "Video file type is invalid.", i[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.", f.shared.vid_exit_flag = !1, {
            _init: function() {
                f.events.on("drop", B, !0), f.events.on("mousedown window.mousedown", e), f.events.on("window.touchmove", $), f.events.on("mouseup window.mouseup", M), f.events.on("commands.mousedown", function(e) { 0 < e.parents(".fr-toolbar").length && M() }), f.events.on("video.hideResizer commands.undo commands.redo element.dropped", function() { M(!0) }), f.helpers.isMobile() && (f.events.$on(f.$el, "touchstart", "span.fr-video", function() { n = !1 }), f.events.$on(f.$el, "touchmove", function() { n = !0 })), f.events.on("html.set", X), X(), f.events.$on(f.$el, "mousedown", "span.fr-video", function(e) { e.stopPropagation() }), f.events.$on(f.$el, "click touchend", "span.fr-video", function(e) {
                    if ("false" == Ee(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
                    F.call(this, e)
                }), f.events.on("keydown", function(e) { var t = e.which; return !u || t != Ee.FE.KEYCODE.BACKSPACE && t != Ee.FE.KEYCODE.DELETE ? u && t == Ee.FE.KEYCODE.ESC ? (M(!0), e.preventDefault(), !1) : u && t != Ee.FE.KEYCODE.F10 && !f.keys.isBrowserAction(e) ? (e.preventDefault(), !1) : void 0 : (e.preventDefault(), Y(), f.undo.saveStep(), !1) }, !0), f.events.on("toolbar.esc", function() { if (u) return f.events.disableBlur(), f.events.focus(), !1 }, !0), f.events.on("toolbar.focusEditor", function() { if (u) return !1 }, !0), f.events.on("keydown", function() { f.$el.find("span.fr-video:empty").remove() }), f.$wp && (D(), f.events.on("contentChanged", D)), o(!0), H(!0)
            },
            showInsertPopup: function() {
                var e = f.$tb.find('.fr-command[data-cmd="insertVideo"]'),
                    t = f.popups.get("video.insert");
                if (t || (t = o()), C(), !t.hasClass("fr-active"))
                    if (f.popups.refresh("video.insert"), f.popups.setContainer("video.insert", f.$tb), e.is(":visible")) {
                        var n = e.offset().left + e.outerWidth() / 2,
                            r = e.offset().top + (f.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
                        f.popups.show("video.insert", n, r, e.outerHeight())
                    } else f.position.forSelection(t), f.popups.show("video.insert")
            },
            showLayer: function(e) {
                var t, n, r = f.popups.get("video.insert");
                if (!u && !f.opts.toolbarInline) {
                    var i = f.$tb.find('.fr-command[data-cmd="insertVideo"]');
                    t = i.offset().left + i.outerWidth() / 2, n = i.offset().top + (f.opts.toolbarBottom ? 10 : i.outerHeight() - 10)
                }
                f.opts.toolbarInline && (n = r.offset().top - f.helpers.getPX(r.css("margin-top")), r.hasClass("fr-above") && (n += r.outerHeight())), r.find(".fr-layer").removeClass("fr-active"), r.find(".fr-" + e + "-layer").addClass("fr-active"), f.popups.show("video.insert", t, n, 0), f.accessibility.focusPopup(r)
            },
            refreshByURLButton: function(e) { f.popups.get("video.insert").find(".fr-video-by-url-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0) },
            refreshEmbedButton: function(e) { f.popups.get("video.insert").find(".fr-video-embed-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0) },
            refreshUploadButton: function(e) { f.popups.get("video.insert").find(".fr-video-upload-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0) },
            upload: P,
            insertByURL: function(e) {
                void 0 === e && (e = (f.popups.get("video.insert").find('.fr-video-by-url-layer input[type="text"]').val() || "").trim());
                var t = null;
                if (/^http/.test(e) || (e = "https://" + e), f.helpers.isURL(e))
                    for (var n = 0; n < Ee.FE.VIDEO_PROVIDERS.length; n++) { var r = Ee.FE.VIDEO_PROVIDERS[n]; if (r.test_regex.test(e) && new RegExp(f.opts.videoAllowedProviders.join("|")).test(r.provider)) { t = e.replace(r.url_regex, r.url_text), t = r.html.replace(/\{url\}/, t); break } }
                t ? E(t) : f.events.trigger("video.linkError", [e])
            },
            insertEmbed: function(e) { void 0 === e && (e = f.popups.get("video.insert").find(".fr-video-embed-layer textarea").val() || ""), 0 !== e.length && Ee.FE.VIDEO_EMBED_REGEX.test(e) ? E(e) : f.events.trigger("video.codeError", [e]) },
            insert: E,
            align: function(e) { u.removeClass("fr-fvr fr-fvl"), !f.opts.htmlUntouched && f.opts.useClasses ? "left" == e ? u.addClass("fr-fvl") : "right" == e && u.addClass("fr-fvr") : V(u, z(), e), q(), k(), a(), f.selection.clear() },
            refreshAlign: function(e) {
                if (!u) return !1;
                e.find("> *:first").replaceWith(f.icon.create("video-align-" + W()))
            },
            refreshAlignOnShow: function(e, t) { u && t.find('.fr-command[data-param1="' + W() + '"]').addClass("fr-active").attr("aria-selected", !0) },
            display: function(e) { u.removeClass("fr-dvi fr-dvb"), !f.opts.htmlUntouched && f.opts.useClasses ? "inline" == e ? u.addClass("fr-dvi") : "block" == e && u.addClass("fr-dvb") : V(u, e, W()), q(), k(), a(), f.selection.clear() },
            refreshDisplayOnShow: function(e, t) { u && t.find('.fr-command[data-param1="' + z() + '"]').addClass("fr-active").attr("aria-selected", !0) },
            remove: Y,
            hideProgressBar: C,
            showSizePopup: function() {
                var e = f.popups.get("video.size");
                e || (e = H()), C(), f.popups.refresh("video.size"), f.popups.setContainer("video.size", f.$sc);
                var t = u.find("iframe, embed, video"),
                    n = t.offset().left + t.width() / 2,
                    r = t.offset().top + t.height();
                f.popups.show("video.size", n, r, t.height())
            },
            replace: function() {
                var e = f.popups.get("video.insert");
                e || (e = o()), f.popups.isVisible("video.insert") || (C(), f.popups.refresh("video.insert"), f.popups.setContainer("video.insert", f.$sc));
                var t = u.offset().left + u.width() / 2,
                    n = u.offset().top + u.height();
                f.popups.show("video.insert", t, n, u.outerHeight())
            },
            back: function() { u ? (f.events.disableBlur(), u.trigger("click")) : (f.events.disableBlur(), f.selection.restore(), f.events.enableBlur(), f.popups.hide("video.insert"), f.toolbar.showInline()) },
            setSize: function(e, t) {
                if (u) {
                    var n = f.popups.get("video.size"),
                        r = u.find("iframe, embed, video");
                    r.css("width", e || n.find('input[name="width"]').val()), r.css("height", t || n.find('input[name="height"]').val()), r.get(0).style.width && r.removeAttr("width"), r.get(0).style.height && r.removeAttr("height"), n.find("input:focus").blur(), setTimeout(function() { u.trigger("click") }, f.helpers.isAndroid() ? 50 : 0)
                }
            },
            get: function() { return u }
        }
    }, Ee.FE.RegisterCommand("insertVideo", { title: "Insert Video", undo: !1, focus: !0, refreshAfterCallback: !1, popup: !0, callback: function() { this.popups.isVisible("video.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("video.insert")) : this.video.showInsertPopup() }, plugin: "video" }), Ee.FE.DefineIcon("insertVideo", { NAME: "video-camera", FA5NAME: "camera" }), Ee.FE.DefineIcon("videoByURL", { NAME: "link" }), Ee.FE.RegisterCommand("videoByURL", { title: "By URL", undo: !1, focus: !1, toggle: !0, callback: function() { this.video.showLayer("video-by-url") }, refresh: function(e) { this.video.refreshByURLButton(e) } }), Ee.FE.DefineIcon("videoEmbed", { NAME: "code" }), Ee.FE.RegisterCommand("videoEmbed", { title: "Embedded Code", undo: !1, focus: !1, toggle: !0, callback: function() { this.video.showLayer("video-embed") }, refresh: function(e) { this.video.refreshEmbedButton(e) } }), Ee.FE.DefineIcon("videoUpload", { NAME: "upload" }), Ee.FE.RegisterCommand("videoUpload", { title: "Upload Video", undo: !1, focus: !1, toggle: !0, callback: function() { this.video.showLayer("video-upload") }, refresh: function(e) { this.video.refreshUploadButton(e) } }), Ee.FE.RegisterCommand("videoInsertByURL", { undo: !0, focus: !0, callback: function() { this.video.insertByURL() } }), Ee.FE.RegisterCommand("videoInsertEmbed", { undo: !0, focus: !0, callback: function() { this.video.insertEmbed() } }), Ee.FE.DefineIcon("videoDisplay", { NAME: "star" }), Ee.FE.RegisterCommand("videoDisplay", { title: "Display", type: "dropdown", options: { inline: "Inline", block: "Break Text" }, callback: function(e, t) { this.video.display(t) }, refresh: function(e) { this.opts.videoTextNear || e.addClass("fr-hidden") }, refreshOnShow: function(e, t) { this.video.refreshDisplayOnShow(e, t) } }), Ee.FE.DefineIcon("video-align", { NAME: "align-left" }), Ee.FE.DefineIcon("video-align-left", { NAME: "align-left" }), Ee.FE.DefineIcon("video-align-right", { NAME: "align-right" }), Ee.FE.DefineIcon("video-align-center", { NAME: "align-justify" }), Ee.FE.DefineIcon("videoAlign", { NAME: "align-center" }), Ee.FE.RegisterCommand("videoAlign", {
        type: "dropdown",
        title: "Align",
        options: { left: "Align Left", center: "None", right: "Align Right" },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = Ee.FE.COMMANDS.videoAlign.options;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="videoAlign" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.icon.create("video-align-" + n) + '<span class="fr-sr-only">' + this.language.translate(t[n]) + "</span></a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) { this.video.align(t) },
        refresh: function(e) { this.video.refreshAlign(e) },
        refreshOnShow: function(e, t) { this.video.refreshAlignOnShow(e, t) }
    }), Ee.FE.DefineIcon("videoReplace", { NAME: "exchange" }), Ee.FE.RegisterCommand("videoReplace", { title: "Replace", undo: !1, focus: !1, popup: !0, refreshAfterCallback: !1, callback: function() { this.video.replace() } }), Ee.FE.DefineIcon("videoRemove", { NAME: "trash" }), Ee.FE.RegisterCommand("videoRemove", { title: "Remove", callback: function() { this.video.remove() } }), Ee.FE.DefineIcon("videoSize", { NAME: "arrows-alt" }), Ee.FE.RegisterCommand("videoSize", { undo: !1, focus: !1, popup: !0, title: "Change Size", callback: function() { this.video.showSizePopup() } }), Ee.FE.DefineIcon("videoBack", { NAME: "arrow-left" }), Ee.FE.RegisterCommand("videoBack", { title: "Back", undo: !1, focus: !1, back: !0, callback: function() { this.video.back() }, refresh: function(e) { this.video.get() || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden")) } }), Ee.FE.RegisterCommand("videoDismissError", { title: "OK", undo: !1, callback: function() { this.video.hideProgressBar(!0) } }), Ee.FE.RegisterCommand("videoSetSize", { undo: !0, focus: !1, title: "Update", refreshAfterCallback: !1, callback: function() { this.video.setSize() } }), Ee.extend(Ee.FE.DEFAULTS, { wordDeniedTags: [], wordDeniedAttrs: [], wordAllowedStyleProps: ["font-family", "font-size", "background", "color", "width", "text-align", "vertical-align", "background-color", "padding", "margin", "height", "margin-top", "margin-left", "margin-right", "margin-bottom", "text-decoration", "font-weight", "font-style", "text-indent"], wordPasteModal: !0 }), Ee.FE.PLUGINS.wordPaste = function(T) {
        var a, r, o = "word_paste";

        function t(e) {
            var t = T.opts.wordAllowedStyleProps;
            e || (T.opts.wordAllowedStyleProps = []), 0 === r.indexOf("<colgroup>") && (r = "<table>" + r + "</table>"), r = function(e, t) {
                ! function(e) {
                    for (var t = e.split("v:shape"), n = 1; n < t.length; n++) {
                        var r = t[n],
                            i = r.split(' id="')[1];
                        if (i && 1 < i.length) {
                            i = i.split('"')[0];
                            var a = r.split(' o:spid="')[1];
                            a && 1 < a.length && (a = a.split('"')[0], h[i] = a)
                        }
                    }
                }(e = e.replace(/[.\s\S\w\W<>]*(<html[^>]*>[.\s\S\w\W<>]*<\/html>)[.\s\S\w\W<>]*/i, "$1"));
                var n = (new DOMParser).parseFromString(e, "text/html"),
                    r = n.head,
                    i = n.body,
                    o = function(e) {
                        var t = {},
                            n = e.getElementsByTagName("style");
                        if (n.length) {
                            var r = n[0],
                                i = r.innerHTML.match(/[\S ]+\s+{[\s\S]+?}/gi);
                            if (i)
                                for (var a = 0; a < i.length; a++) {
                                    var o = i[a],
                                        s = o.replace(/([\S ]+\s+){[\s\S]+?}/gi, "$1"),
                                        l = o.replace(/[\S ]+\s+{([\s\S]+?)}/gi, "$1");
                                    s = s.replace(/^[\s]|[\s]$/gm, ""), l = l.replace(/^[\s]|[\s]$/gm, ""), s = s.replace(/\n|\r|\n\r/g, ""), l = l.replace(/\n|\r|\n\r/g, "");
                                    for (var d = s.split(", "), c = 0; c < d.length; c++) t[d[c]] = l
                                }
                        }
                        return t
                    }(r);
                c(i, function(e) {
                    if (e.nodeType == Node.TEXT_NODE && /\n|\u00a0|\r/.test(e.data)) {
                        if (!/\S| /.test(e.data)) return e.data == Ee.FE.UNICODE_NBSP ? (e.data = "\u200b", !0) : 1 == e.data.length && 10 == e.data.charCodeAt(0) ? (e.data = " ", !0) : (A(e), !1);
                        e.data = e.data.replace(/\n|\r/gi, " ")
                    }
                    return !0
                }), c(i, function(e) {
                    return e.nodeType != Node.ELEMENT_NODE || "V:IMAGEDATA" != e.tagName && "IMG" != e.tagName || function(e, t) {
                        if (!t) return;
                        var n;
                        if ("IMG" == e.tagName) {
                            var r = e.getAttribute("src");
                            if (!r || -1 == r.indexOf("file://")) return;
                            if (0 === r.indexOf("file://") && T.helpers.isURL(e.getAttribute("alt"))) return e.setAttribute("src", e.getAttribute("alt"));
                            (n = h[e.getAttribute("v:shapes")]) || (n = e.getAttribute("v:shapes"))
                        } else n = e.parentNode.getAttribute("o:spid");
                        if (e.removeAttribute("height"), !n) return;
                        i = t, u = {}, f(i, "i", "\\shppict"), f(i, "s", "\\shp{");
                        var i;
                        var a = u[n.substring(7)];
                        if (a) {
                            var o = function(e) { for (var t = e.match(/[0-9a-f]{2}/gi), n = [], r = 0; r < t.length; r++) n.push(String.fromCharCode(parseInt(t[r], 16))); var i = n.join(""); return btoa(i) }(a.image_hex),
                                s = "data:" + a.image_type + ";base64," + o;
                            "IMG" === e.tagName ? (e.src = s, e.setAttribute("data-fr-image-pasted", !0)) : Ee(e.parentNode).before('<img data-fr-image-pasted="true" src="' + s + '" style="' + e.parentNode.getAttribute("style") + '">').remove()
                        }
                    }(e, t), !0
                });
                for (var a = i.querySelectorAll("ul > ul, ul > ol, ol > ul, ol > ol"), s = a.length - 1; 0 <= s; s--) a[s].previousElementSibling && "LI" === a[s].previousElementSibling.tagName && a[s].previousElementSibling.appendChild(a[s]);
                c(i, function(t) {
                    if (t.nodeType == Node.TEXT_NODE) return t.data = t.data.replace(/<br>(\n|\r)/gi, "<br>"), !1;
                    if (t.nodeType == Node.ELEMENT_NODE) {
                        if (C(t)) {
                            var n = t.parentNode,
                                r = t.previousSibling,
                                i = function e(t, n) {
                                    var r = /[0-9a-zA-Z]./gi;
                                    var i = !1;
                                    t.firstElementChild && t.firstElementChild.firstElementChild && t.firstElementChild.firstElementChild.firstChild && !(i = i || r.test(t.firstElementChild.firstElementChild.firstChild.data || "")) && t.firstElementChild.firstElementChild.firstElementChild && t.firstElementChild.firstElementChild.firstElementChild.firstChild && (i = i || r.test(t.firstElementChild.firstElementChild.firstElementChild.firstChild.data || ""));
                                    var a = i ? "ol" : "ul";
                                    var o = g(t);
                                    var s = "<" + a + "><li>" + m(t, n);
                                    var l = t.nextElementSibling;
                                    var d = t.parentNode;
                                    A(t);
                                    t = null;
                                    for (; l && C(l);) {
                                        var c = l.previousElementSibling,
                                            f = g(l);
                                        if (o < f) s += e(l, n).outerHTML;
                                        else {
                                            if (f < o) break;
                                            s += "</li><li>" + m(l, n)
                                        }
                                        if (o = f, l.previousElementSibling || l.nextElementSibling || l.parentNode) {
                                            var p = l;
                                            l = l.nextElementSibling, A(p), p = null
                                        } else l = c ? c.nextElementSibling : d.firstElementChild
                                    }
                                    s += "</li></" + a + ">";
                                    var u = document.createElement("div");
                                    u.innerHTML = s;
                                    var h = u.firstElementChild;
                                    return h
                                }(t, o),
                                a = null;
                            return (a = r ? r.nextSibling : n.firstChild) ? n.insertBefore(i, a) : n.appendChild(i), !1
                        }
                        return p(t, o)
                    }
                    return t.nodeType != Node.COMMENT_NODE || (A(t), !1)
                }), c(i, function(e) {
                    if (e.nodeType == Node.ELEMENT_NODE) {
                        var t = e.tagName;
                        if (!e.innerHTML && -1 == ["BR", "IMG"].indexOf(t)) { for (var n = e.parentNode; n && (A(e), !(e = n).innerHTML);) n = e.parentNode; return !1 }! function(e) {
                            var t = e.getAttribute("style");
                            if (!t) return;
                            (t = R(t)) && ";" != t.slice(-1) && (t += ";");
                            var n = t.match(/(^|\S+?):.+?;{1,1}/gi);
                            if (!n) return;
                            for (var r = {}, i = 0; i < n.length; i++) {
                                var a = n[i],
                                    o = a.split(":");
                                2 == o.length && ("text-align" == o[0] && "SPAN" == e.tagName || (r[o[0]] = o[1]))
                            }
                            var s = "";
                            for (var l in r)
                                if (r.hasOwnProperty(l)) {
                                    if ("font-size" == l && "pt;" == r[l].slice(-3)) {
                                        var d = null;
                                        try { d = parseFloat(r[l].slice(0, -3), 10) } catch (c) {}
                                        d && (d = Math.round(1.33 * d), r[l] = d + "px;")
                                    }
                                    s += l + ":" + r[l]
                                }
                            s && e.setAttribute("style", s)
                        }(e)
                    }
                    return !0
                });
                var l = i.outerHTML,
                    d = T.opts.htmlAllowedStyleProps;
                return T.opts.htmlAllowedStyleProps = T.opts.wordAllowedStyleProps, l = T.clean.html(l, T.opts.wordDeniedTags, T.opts.wordDeniedAttrs, !1), T.opts.htmlAllowedStyleProps = d, l
            }(r = r.replace(/<span[\n\r ]*style='mso-spacerun:yes'>([\r\n\u00a0 ]*)<\/span>/g, function(e, t) { for (var n = "", r = 0; r++ < t.length;) n += "&nbsp;"; return n }), T.paste.getRtfClipboard());
            var n = T.doc.createElement("DIV");
            n.innerHTML = r, T.html.cleanBlankSpaces(n), r = n.innerHTML, r = (r = T.paste.cleanEmptyTagsAndDivs(r)).replace(/\u200b/g, ""), T.modals.hide(o), T.paste.clean(r, !0, !0), T.opts.wordAllowedStyleProps = t
        }

        function A(e) { e.parentNode && e.parentNode.removeChild(e) }

        function c(e, t) {
            if (t(e))
                for (var n = e.firstChild; n;) {
                    var r = n,
                        i = n.previousSibling;
                    n = n.nextSibling, c(r, t), r.previousSibling || r.nextSibling || r.parentNode || !n || i == n.previousSibling || !n.parentNode ? r.previousSibling || r.nextSibling || r.parentNode || !n || n.previousSibling || n.nextSibling || n.parentNode || (i ? n = i.nextSibling ? i.nextSibling.nextSibling : null : e.firstChild && (n = e.firstChild.nextSibling)) : n = i ? i.nextSibling : e.firstChild
                }
        }

        function C(e) { if (!e.getAttribute("style") || !/mso-list:[\s]*l/gi.test(e.getAttribute("style").replace(/\n/gi, ""))) return !1; try { if (!e.querySelector('[style="mso-list:Ignore"]')) return !1 } catch (t) { return !1 } return !0 }

        function g(e) { return e.getAttribute("style").replace(/\n/gi, "").replace(/.*level([0-9]+?).*/gi, "$1") }

        function m(e, t) {
            var n = e.cloneNode(!0);
            if (-1 != ["H1", "H2", "H3", "H4", "H5", "H6"].indexOf(e.tagName)) {
                var r = document.createElement(e.tagName.toLowerCase());
                r.setAttribute("style", e.getAttribute("style")), r.innerHTML = n.innerHTML, n.innerHTML = r.outerHTML
            }
            c(n, function(e) { return e.nodeType == Node.ELEMENT_NODE && ("mso-list:Ignore" == e.getAttribute("style") && e.parentNode.removeChild(e), p(e, t)), !0 });
            var i = n.innerHTML;
            return i = i.replace(/<!--[\s\S]*?-->/gi, "")
        }

        function v(e, t) {
            for (var n = document.createElement(t), r = 0; r < e.attributes.length; r++) {
                var i = e.attributes[r].name;
                n.setAttribute(i, e.getAttribute(i))
            }
            return n.innerHTML = e.innerHTML, e.parentNode.replaceChild(n, e), n
        }

        function S(e) {
            var t = e.parentNode,
                n = e.getAttribute("align");
            n && (t && "TD" == t.tagName ? t.setAttribute("style", t.getAttribute("style") + "text-align:" + n + ";") : e.style["text-align"] = n, e.removeAttribute("align"))
        }

        function R(e) { return e.replace(/\n|\r|\n\r|&quot;/g, "") }

        function y(e, t, n) {
            if (t) {
                var r = e.getAttribute("style");
                r && ";" != r.slice(-1) && (r += ";"), t && ";" != t.slice(-1) && (t += ";"), t = t.replace(/\n/gi, "");
                var i = null;
                i = n ? (r || "") + t : t + (r || ""), e.setAttribute("style", i)
            }
        }
        var u = null;

        function f(e, t, n) {
            for (var r = e.split(n), i = 1; i < r.length; i++) {
                var a = r[i];
                if (1 < (a = a.split("shplid")).length) {
                    a = a[1];
                    for (var o = "", s = 0; s < a.length && "\\" != a[s] && "{" != a[s] && " " != a[s] && "\r" != a[s] && "\n" != a[s];) o += a[s], s++;
                    var l = a.split("bliptag");
                    if (l && l.length < 2) continue;
                    var d = null;
                    if (-1 != l[0].indexOf("pngblip") ? d = "image/png" : -1 != l[0].indexOf("jpegblip") && (d = "image/jpeg"), !d) continue;
                    var c, f = l[1].split("}");
                    if (f && f.length < 2) continue;
                    if (2 < f.length && -1 != f[0].indexOf("blipuid")) c = f[1].split(" ");
                    else {
                        if ((c = f[0].split(" ")) && c.length < 2) continue;
                        c.shift()
                    }
                    var p = c.join("");
                    u[t + o] = { image_hex: p, image_type: d }
                }
            }
        }

        function p(e, t) {
            var n = e.tagName,
                r = n.toLowerCase();
            e.firstElementChild && ("I" == e.firstElementChild.tagName ? v(e.firstElementChild, "em") : "B" == e.firstElementChild.tagName && v(e.firstElementChild, "strong"));
            if (-1 != ["SCRIPT", "APPLET", "EMBED", "NOFRAMES", "NOSCRIPT"].indexOf(n)) return A(e), !1;
            var i = -1,
                a = ["META", "LINK", "XML", "ST1:", "O:", "W:", "FONT"];
            for (i = 0; i < a.length; i++)
                if (-1 != n.indexOf(a[i])) return e.innerHTML && (e.outerHTML = e.innerHTML), A(e), !1;
            if ("TD" != n) {
                var o = e.getAttribute("class");
                if (t && o) {
                    var s = (o = R(o)).split(" ");
                    for (i = 0; i < s.length; i++) {
                        var l = [],
                            d = "." + s[i];
                        l.push(d), d = r + d, l.push(d);
                        for (var c = 0; c < l.length; c++) t[l[c]] && y(e, t[l[c]])
                    }
                    e.removeAttribute("class")
                }
                t && t[r] && y(e, t[r])
            }
            if (-1 != ["P", "H1", "H2", "H3", "H4", "H5", "H6", "PRE"].indexOf(n)) {
                var f = e.getAttribute("class");
                if (f && (t && t[n.toLowerCase() + "." + f] && y(e, t[n.toLowerCase() + "." + f]), -1 != f.toLowerCase().indexOf("mso"))) {
                    var p = R(f);
                    (p = p.replace(/[0-9a-z-_]*mso[0-9a-z-_]*/gi, "")) ? e.setAttribute("class", p): e.removeAttribute("class")
                }
                var u = e.getAttribute("style");
                if (u) {
                    var h = u.match(/text-align:.+?[; "]{1,1}/gi);
                    h && h[h.length - 1].replace(/(text-align:.+?[; "]{1,1})/gi, "$1")
                }
                S(e)
            }
            if ("TR" == n && function(e, t) {
                    T.node.clearAttributes(e);
                    for (var n = e.firstElementChild, r = 0, i = !1, a = null; n;) {
                        n.firstElementChild && -1 != n.firstElementChild.tagName.indexOf("W:") && (n.innerHTML = n.firstElementChild.innerHTML), (a = n.getAttribute("width")) || i || (i = !0), r += parseInt(a, 10), (!n.firstChild || n.firstChild && n.firstChild.data == Ee.FE.UNICODE_NBSP) && (n.firstChild && A(n.firstChild), n.innerHTML = "<br>");
                        for (var o = n.firstElementChild, s = 1 == n.children.length; o;) "P" != o.tagName || C(o) || s && S(o), o = o.nextElementSibling;
                        if (t) {
                            var l = n.getAttribute("class");
                            if (l) {
                                var d = (l = R(l)).match(/xl[0-9]+/gi);
                                if (d) {
                                    var c = "." + d[0];
                                    t[c] && y(n, t[c])
                                }
                            }
                            t.td && y(n, t.td)
                        }
                        var f = n.getAttribute("style");
                        f && (f = R(f)) && ";" != f.slice(-1) && (f += ";");
                        var p = n.getAttribute("valign");
                        if (!p && f) {
                            var u = f.match(/vertical-align:.+?[; "]{1,1}/gi);
                            u && (p = u[u.length - 1].replace(/vertical-align:(.+?)[; "]{1,1}/gi, "$1"))
                        }
                        var h = null;
                        if (f) {
                            var g = f.match(/text-align:.+?[; "]{1,1}/gi);
                            g && (h = g[g.length - 1].replace(/text-align:(.+?)[; "]{1,1}/gi, "$1")), "general" == h && (h = null)
                        }
                        var m = null;
                        if (f) {
                            var v = f.match(/background:.+?[; "]{1,1}/gi);
                            v && (m = v[v.length - 1].replace(/background:(.+?)[; "]{1,1}/gi, "$1"))
                        }
                        var E = n.getAttribute("colspan"),
                            b = n.getAttribute("rowspan");
                        E && n.setAttribute("colspan", E), b && n.setAttribute("rowspan", b), p && (n.style["vertical-align"] = p), h && (n.style["text-align"] = h), m && (n.style["background-color"] = m), a && n.setAttribute("width", a), n = n.nextElementSibling
                    }
                    for (n = e.firstElementChild; n;) a = n.getAttribute("width"), i ? n.removeAttribute("width") : n.setAttribute("width", 100 * parseInt(a, 10) / r + "%"), n = n.nextElementSibling
                }(e, t), "A" != n || e.attributes.getNamedItem("href") || e.attributes.getNamedItem("name") || !e.innerHTML || (e.outerHTML = e.innerHTML), "TD" != n && "TH" != n || e.innerHTML || (e.innerHTML = "<br>"), "TABLE" == n && (e.style.width = "100%"), e.getAttribute("lang") && e.removeAttribute("lang"), e.getAttribute("style") && -1 != e.getAttribute("style").toLowerCase().indexOf("mso")) {
                var g = R(e.getAttribute("style"));
                (g = g.replace(/[0-9a-z-_]*mso[0-9a-z-_]*:.+?(;{1,1}|$)/gi, "")) ? e.setAttribute("style", g): e.removeAttribute("style")
            }
            return !0
        }
        var h = {};
        return {
            _init: function() {
                T.events.on("paste.wordPaste", function(e) {
                    return r = e, T.opts.wordPasteModal ? function() {
                        if (!a) {
                            var e = '<h4><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.95 73.23" style="height: 25px; vertical-align: text-bottom; margin-right: 5px; display: inline-block"><defs><style>.a{fill:#2a5699;}.b{fill:#fff;}</style></defs><path class="a" d="M615.15,827.22h5.09V834c9.11.05,18.21-.09,27.32.05a2.93,2.93,0,0,1,3.29,3.25c.14,16.77,0,33.56.09,50.33-.09,1.72.17,3.63-.83,5.15-1.24.89-2.85.78-4.3.84-8.52,0-17,0-25.56,0v6.81h-5.32c-13-2.37-26-4.54-38.94-6.81q0-29.8,0-59.59c13.05-2.28,26.11-4.5,39.17-6.83Z" transform="translate(-575.97 -827.22)"/><path class="b" d="M620.24,836.59h28.1v54.49h-28.1v-6.81h22.14v-3.41H620.24v-4.26h22.14V873.2H620.24v-4.26h22.14v-3.41H620.24v-4.26h22.14v-3.41H620.24v-4.26h22.14v-3.41H620.24V846h22.14v-3.41H620.24Zm-26.67,15c1.62-.09,3.24-.16,4.85-.25,1.13,5.75,2.29,11.49,3.52,17.21,1-5.91,2-11.8,3.06-17.7,1.7-.06,3.41-.15,5.1-.26-1.92,8.25-3.61,16.57-5.71,24.77-1.42.74-3.55,0-5.24.09-1.13-5.64-2.45-11.24-3.47-16.9-1,5.5-2.29,10.95-3.43,16.42q-2.45-.13-4.92-.3c-1.41-7.49-3.07-14.93-4.39-22.44l4.38-.18c.88,5.42,1.87,10.82,2.64,16.25,1.2-5.57,2.43-11.14,3.62-16.71Z" transform="translate(-575.97 -827.22)"/></svg> ' + T.language.translate("Word Paste Detected") + "</h4>",
                                t = (i = '<div class="fr-word-paste-modal" style="padding: 20px 20px 10px 20px;">', i += '<p style="text-align: left;">' + T.language.translate("The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?") + "</p>", i += '<div style="text-align: right; margin-top: 50px;"><button class="fr-remove-word fr-command">' + T.language.translate("Clean") + '</button> <button class="fr-keep-word fr-command">' + T.language.translate("Keep") + "</button></div>", i += "</div>"),
                                n = T.modals.create(o, e, t),
                                r = n.$body;
                            a = n.$modal, n.$modal.addClass("fr-middle"), T.events.bindClick(r, "button.fr-remove-word", function() {
                                var e = a.data("instance") || T;
                                e.wordPaste.clean()
                            }), T.events.bindClick(r, "button.fr-keep-word", function() {
                                var e = a.data("instance") || T;
                                e.wordPaste.clean(!0)
                            }), T.events.$on(Ee(T.o_win), "resize", function() { T.modals.resize(o) })
                        }
                        var i;
                        T.modals.show(o), T.modals.resize(o)
                    }() : t(!0), !1
                })
            },
            clean: t
        }
    }
});