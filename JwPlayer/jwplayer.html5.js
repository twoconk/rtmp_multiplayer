(function (b) {
    b.html5 = {};
    b.html5.version = "6.12.0";
    var e = b.utils.css;
    var a = ".jwplayer ";
    var d = [a, "div", "span", "a", "img", "ul", "li", "video"]
			.join(", " + a);
    e(d + ", .jwclick", {
        margin: 0,
        padding: 0,
        border: 0,
        color: "#000000",
        "font-size": "100%",
        font: "inherit",
        "vertical-align": "baseline",
        "background-color": "transparent",
        "text-align": "left",
        direction: "ltr",
        "line-height": 20,
        "-webkit-tap-highlight-color": "rgba(255, 255, 255, 0)"
    });
    e(a + "," + a + "*", {
        "box-sizing": "content-box"
    });
    e(a + "* button," + a + "* input," + a + "* select," + a + "* textarea", {
        "box-sizing": "border-box"
    });
    e(a + "ul", {
        "list-style": "none"
    });
    e(".jwplayer .jwcontrols", {
        "pointer-events": "none"
    });
    e(".jwplayer.jw-user-inactive .jwcontrols", {
        "pointer-events": "all"
    });
    var c = [".jwplayer .jwcontrols .jwdockbuttons",
			".jwplayer .jwcontrols .jwcontrolbar",
			".jwplayer .jwcontrols .jwskip",
			".jwplayer .jwcontrols .jwdisplayIcon",
			".jwplayer .jwcontrols .jwpreview", ".jwplayer .jwcontrols .jwlogo"];
    e(c.join(", "), {
        "pointer-events": "all"
    })
})(jwplayer);
(function (a) {
    var b = document;
    a.parseDimension = function (c) {
        if (typeof c === "string") {
            if (c === "") {
                return 0
            } else {
                if (c.lastIndexOf("%") > -1) {
                    return c
                }
            }
            return parseInt(c.replace("px", ""), 10)
        }
        return c
    };
    a.timeFormat = function (e) {
        if (e > 0) {
            var d = Math.floor(e / 3600), f = Math.floor((e - d * 3600) / 60), c = Math
					.floor(e % 60);
            return (d ? d + ":" : "") + (f < 10 ? "0" : "") + f + ":"
					+ (c < 10 ? "0" : "") + c
        } else {
            return "00:00"
        }
    };
    a.bounds = function (d) {
        var g = {
            left: 0,
            right: 0,
            width: 0,
            height: 0,
            top: 0,
            bottom: 0
        };
        if (!d || !b.body.contains(d)) {
            return g
        }
        if (d.getBoundingClientRect) {
            var f = d.getBoundingClientRect(d), c = window.pageYOffset, e = window.pageXOffset;
            if (!f.width && !f.height && !f.left && !f.top) {
                return g
            }
            g.left = f.left + e;
            g.right = f.right + e;
            g.top = f.top + c;
            g.bottom = f.bottom + c;
            g.width = f.right - f.left;
            g.height = f.bottom - f.top
        } else {
            g.width = d.offsetWidth | 0;
            g.height = d.offsetHeight | 0;
            do {
                g.left += d.offsetLeft | 0;
                g.top += d.offsetTop | 0
            } while (d = d.offsetParent);
            g.right = g.left + g.width;
            g.bottom = g.top + g.height
        }
        return g
    };
    a.empty = function (c) {
        if (!c) {
            return
        }
        while (c.childElementCount > 0) {
            c.removeChild(c.children[0])
        }
    }
})(jwplayer.utils);
(function (a) {
    var b = a.stretching = {
        NONE: "none",
        FILL: "fill",
        UNIFORM: "uniform",
        EXACTFIT: "exactfit"
    };
    a.scale = function (e, d, c, g, h) {
        var f = "";
        d = d || 1;
        c = c || 1;
        g = g | 0;
        h = h | 0;
        if (d !== 1 || c !== 1) {
            f = "scale(" + d + ", " + c + ")"
        }
        if (g || h) {
            if (f) {
                f += " "
            }
            f = "translate(" + g + "px, " + h + "px)"
        }
        a.transform(e, f)
    };
    a.stretch = function (j, n, m, h, l, i) {
        if (!n) {
            return false
        }
        if (!m || !h || !l || !i) {
            return false
        }
        j = j || b.UNIFORM;
        var d = Math.ceil(m / 2) * 2 / l, g = Math.ceil(h / 2) * 2 / i, e = (n.tagName
				.toLowerCase() === "video"), f = false, k = "jw"
				+ j.toLowerCase();
        switch (j.toLowerCase()) {
            case b.FILL:
                if (d > g) {
                    g = d
                } else {
                    d = g
                }
                f = true;
                break;
            case b.NONE:
                d = g = 1;
            case b.EXACTFIT:
                f = true;
                break;
            case b.UNIFORM:
            default:
                if (d > g) {
                    if (l * g / m > 0.95) {
                        f = true;
                        k = "jwexactfit"
                    } else {
                        l = l * g;
                        i = i * g
                    }
                } else {
                    if (i * d / h > 0.95) {
                        f = true;
                        k = "jwexactfit"
                    } else {
                        l = l * d;
                        i = i * d
                    }
                }
                if (f) {
                    d = Math.ceil(m / 2) * 2 / l;
                    g = Math.ceil(h / 2) * 2 / i
                }
        }
        if (e) {
            var c = {
                left: "",
                right: "",
                width: "",
                height: ""
            };
            if (f) {
                if (m < l) {
                    c.left = c.right = Math.ceil((m - l) / 2)
                }
                if (h < i) {
                    c.top = c.bottom = Math.ceil((h - i) / 2)
                }
                c.width = l;
                c.height = i;
                a.scale(n, d, g, 0, 0)
            } else {
                f = false;
                a.transform(n)
            }
            a.css.style(n, c)
        } else {
            n.className = n.className.replace(
					/\s*jw(none|exactfit|uniform|fill)/g, "")
					+ " " + k
        }
        return f
    }
})(jwplayer.utils);
(function (a) {
    a.dfxp = function () {
        var c = jwplayer.utils.seconds;
        this.parse = function (h) {
            var e = [{
                begin: 0,
                text: ""
            }];
            h = h.replace(/^\s+/, "").replace(/\s+$/, "");
            var g = h.split("</p>");
            var k = h.split("</tt:p>");
            var j = [];
            var d;
            for (d = 0; d < g.length; d++) {
                if (g[d].indexOf("<p") >= 0) {
                    g[d] = g[d].substr(g[d].indexOf("<p") + 2).replace(/^\s+/,
							"").replace(/\s+$/, "");
                    j.push(g[d])
                }
            }
            for (d = 0; d < k.length; d++) {
                if (k[d].indexOf("<tt:p") >= 0) {
                    k[d] = k[d].substr(k[d].indexOf("<tt:p") + 5).replace(
							/^\s+/, "").replace(/\s+$/, "");
                    j.push(k[d])
                }
            }
            g = j;
            for (d = 0; d < g.length; d++) {
                var f = b(g[d]);
                if (f.text) {
                    e.push(f);
                    if (f.end) {
                        e.push({
                            begin: f.end,
                            text: ""
                        });
                        delete f.end
                    }
                }
            }
            if (e.length > 1) {
                return e
            } else {
                throw {
                    message: "Invalid DFXP file:"
                }
            }
        };
        function b(g) {
            var f = {};
            try {
                var d = g.indexOf('begin="');
                g = g.substr(d + 7);
                d = g.indexOf('" end="');
                f.begin = c(g.substr(0, d));
                g = g.substr(d + 7);
                d = g.indexOf('"');
                f.end = c(g.substr(0, d));
                d = g.indexOf('">');
                g = g.substr(d + 2);
                f.text = g
            } catch (e) {
            }
            return f
        }
    }
})(jwplayer.parsers);
(function (a) {
    a.srt = function () {
        var c = jwplayer.utils, d = c.seconds;
        this.parse = function (j, k) {
            var f = k ? [] : [{
                begin: 0,
                text: ""
            }];
            j = c.trim(j);
            var h = j.split("\r\n\r\n");
            if (h.length === 1) {
                h = j.split("\n\n")
            }
            for (var e = 0; e < h.length; e++) {
                if (h[e] === "WEBVTT") {
                    continue
                }
                var g = b(h[e]);
                if (g.text) {
                    f.push(g);
                    if (g.end && !k) {
                        f.push({
                            begin: g.end,
                            text: ""
                        });
                        delete g.end
                    }
                }
            }
            if (f.length > 1) {
                return f
            } else {
                throw {
                    message: "Invalid SRT file"
                }
            }
        };
        function b(k) {
            var j = {};
            var l = k.split("\r\n");
            if (l.length === 1) {
                l = k.split("\n")
            }
            try {
                var e = 1;
                if (l[0].indexOf(" --> ") > 0) {
                    e = 0
                }
                var g = l[e].indexOf(" --> ");
                if (g > 0) {
                    j.begin = d(l[e].substr(0, g));
                    j.end = d(l[e].substr(g + 5))
                }
                if (l[e + 1]) {
                    j.text = l[e + 1];
                    for (var h = e + 2; h < l.length; h++) {
                        j.text += "<br/>" + l[h]
                    }
                }
            } catch (f) {
            }
            return j
        }
    }
})(jwplayer.parsers);
(function (b) {
    var e = b.utils.noop, a = b._, d = b.events, c = a.constant(false);
    var f = {
        supports: c,
        play: e,
        load: e,
        stop: e,
        volume: e,
        mute: e,
        seek: e,
        seekDrag: e,
        resize: e,
        remove: e,
        destroy: e,
        setVisibility: e,
        setFullscreen: c,
        getFullscreen: e,
        getContainer: e,
        setContainer: c,
        isAudioFile: c,
        supportsFullscreen: c,
        getQualityLevels: e,
        getCurrentQuality: e,
        setCurrentQuality: e,
        getAudioTracks: e,
        getCurrentAudioTrack: e,
        setCurrentAudioTrack: e,
        checkComplete: e,
        setControls: e,
        attachMedia: e,
        detachMedia: e,
        setState: function (h) {
            if (h === this.state) {
                return
            }
            var g = this.state || d.state.IDLE;
            this.state = h;
            this.sendEvent(d.JWPLAYER_PLAYER_STATE, {
                oldstate: g,
                newstate: h
            })
        }
    };
    b.html5.DefaultProvider = f
})(jwplayer);
(function (a) {
    function b(c) {
        if (a._.isObject(c) && a.html5.YoutubeProvider.supports(c)) {
            return a.html5.YoutubeProvider
        }
        return a.html5.VideoProvider
    }
    a.html5.chooseProvider = b
})(jwplayer);
(function (b) {
    var j = b.utils, k = b._, o = b.events, q = o.state, m = window.clearInterval, f = b.html5.DefaultProvider, p = j
			.isMSIE(), h = j.isMobile(), g = j.isSafari(), e = j
			.isAndroidNative(), c = j.isIOS(7);
    function d(s, r) {
        j.foreach(s, function (t, u) {
            r.addEventListener(t, u, false)
        })
    }
    function l(s, r) {
        j.foreach(s, function (t, u) {
            r.removeEventListener(t, u, false)
        })
    }
    function a(r) {
        return Math.floor(r * 10) / 10
    }
    function i(ag) {
        this.state = q.IDLE;
        var r = new b.events.eventdispatcher("provider." + this.name);
        j.extend(this, r);
        var t = this, ad = {
            abort: L,
            canplay: D,
            canplaythrough: L,
            click: I,
            durationchange: Q,
            emptied: L,
            ended: y,
            error: z,
            loadeddata: L,
            loadedmetadata: D,
            loadstart: L,
            pause: ah,
            play: ah,
            playing: ah,
            progress: R,
            ratechange: L,
            readystatechange: L,
            seeked: U,
            seeking: p ? H : L,
            stalled: L,
            suspend: L,
            timeupdate: ai,
            volumechange: w,
            waiting: H,
            webkitbeginfullscreen: P,
            webkitendfullscreen: aj
        }, M, Z, am, B, ak = false, Y, ae = 0, T = false, aa, A = -1, X = -1, E = false, V, S = -1, K = false, al = false;
        this.sendEvent = function () {
            if (!E) {
                return
            }
            r.sendEvent.apply(this, arguments)
        };
        var F = document.getElementById(ag);
        var J = F.querySelector("video");
        J = J || document.createElement("video");
        d(ad, J);
        if (!c) {
            J.controls = true;
            J.controls = false
        }
        J.setAttribute("x-webkit-airplay", "allow");
        J.setAttribute("webkit-playsinline", "");
        E = true;
        function L() {
        }
        function I() {
            t.sendEvent(o.JWPLAYER_PROVIDER_CLICK)
        }
        function Q(ao) {
            L(ao);
            if (!E) {
                return
            }
            var an = a(J.duration);
            if (am !== an) {
                am = an
            }
            if (e && ae > 0 && an > ae) {
                t.seek(ae)
            }
            ai()
        }
        function ai(an) {
            L(an);
            R(an);
            if (!E) {
                return
            }
            if (t.state === q.PLAYING && !T) {
                B = a(J.currentTime);
                if (an) {
                    ak = true
                }
                t.sendEvent(o.JWPLAYER_MEDIA_TIME, {
                    position: B,
                    duration: am
                })
            }
        }
        function W() {
            t.sendEvent(o.JWPLAYER_MEDIA_META, {
                duration: J.duration,
                height: J.videoHeight,
                width: J.videoWidth
            })
        }
        function D(an) {
            L(an);
            if (!E) {
                return
            }
            if (!ak) {
                ak = true;
                C()
            }
            if (an.type === "loadedmetadata") {
                if (J.muted) {
                    J.muted = false;
                    J.muted = true
                }
                W()
            }
        }
        function R(an) {
            L(an);
            if (ak && ae > 0 && !e) {
                if (p) {
                    setTimeout(function () {
                        if (ae > 0) {
                            t.seek(ae)
                        }
                    }, 200)
                } else {
                    t.seek(ae)
                }
            }
        }
        function C() {
            if (!Y) {
                Y = true;
                t.sendEvent(o.JWPLAYER_MEDIA_BUFFER_FULL)
            }
        }
        function ah(an) {
            L(an);
            if (!E || T) {
                return
            }
            if (J.paused) {
                if (J.currentTime === J.duration && J.duration > 3) {
                } else {
                    t.pause()
                }
            } else {
                if (j.isFF() && an.type === "play" && t.state === q.BUFFERING) {
                    return
                } else {
                    t.setState(q.PLAYING)
                }
            }
        }
        function H(an) {
            L(an);
            if (!E) {
                return
            }
            if (!T) {
                t.setState(q.BUFFERING)
            }
        }
        function z() {
            if (!E) {
                return
            }
            j.log("Error playing media: %o %s", J.error, J.src || Z.file);
            t.sendEvent(o.JWPLAYER_MEDIA_ERROR, {
                message: "Error loading media: File could not be played"
            });
            t.setState(q.IDLE)
        }
        function x(aq) {
            var an;
            if (j.typeOf(aq) === "array" && aq.length > 0) {
                an = [];
                for (var ap = 0; ap < aq.length; ap++) {
                    var ar = aq[ap], ao = {};
                    ao.label = ac(ar) ? ac(ar) : ap;
                    an[ap] = ao
                }
            }
            return an
        }
        function v(ao) {
            var an = x(ao);
            if (an) {
                t.sendEvent(o.JWPLAYER_MEDIA_LEVELS, {
                    levels: an,
                    currentQuality: S
                })
            }
        }
        function ac(an) {
            if (an.label) {
                return an.label
            }
            return 0
        }
        function O() {
            if (S < 0) {
                S = 0
            }
            if (V) {
                var ap = j.getCookies(), an = ap.qualityLabel;
                for (var ao = 0; ao < V.length; ao++) {
                    if (V[ao]["default"]) {
                        S = ao
                    }
                    if (an && V[ao].label === an) {
                        S = ao;
                        break
                    }
                }
            }
        }
        function N() {
            return (h || g)
        }
        function G(an, ap) {
            Z = V[S];
            m(A);
            A = setInterval(u, 100);
            ae = 0;
            var ao = (J.src !== Z.file);
            if (ao || N()) {
                if (!h) {
                    t.setState(q.BUFFERING)
                }
                ak = false;
                Y = false;
                am = ap ? ap : -1;
                J.src = Z.file;
                J.load()
            } else {
                if (an === 0) {
                    ae = -1;
                    t.seek(an)
                }
                W();
                J.play()
            }
            B = J.currentTime;
            if (h) {
                C()
            }
            if (j.isIOS() && t.getFullScreen()) {
                J.controls = true
            }
            if (an > 0) {
                t.seek(an)
            }
        }
        this.stop = function () {
            if (!E) {
                return
            }
            m(A);
            J.removeAttribute("src");
            if (!p) {
                J.load()
            }
            S = -1;
            this.setState(q.IDLE)
        };
        this.destroy = function () {
            l(ad, J);
            this.remove()
        };
        this.load = function (an) {
            if (!E) {
                return
            }
            V = an.sources;
            O();
            v(V);
            G(an.starttime || 0, an.duration)
        };
        this.play = function () {
            if (E && !T) {
                J.play()
            }
        };
        this.pause = function () {
            if (E) {
                J.pause();
                this.setState(q.PAUSED)
            }
        };
        this.seekDrag = function (an) {
            if (!E) {
                return
            }
            T = an;
            if (an) {
                J.pause()
            } else {
                J.play()
            }
        };
        this.seek = function (ao) {
            if (!E) {
                return
            }
            if (!T && ae === 0) {
                this.sendEvent(o.JWPLAYER_MEDIA_SEEK, {
                    position: B,
                    offset: ao
                })
            }
            if (ak) {
                ae = 0;
                try {
                    J.currentTime = ao
                } catch (an) {
                    ae = ao
                }
            } else {
                ae = ao
            }
        };
        function U(an) {
            L(an);
            if (!T && t.state !== q.PAUSED) {
                t.setState(q.PLAYING)
            }
        }
        this.volume = function (an) {
            if (j.exists(an)) {
                J.volume = Math.min(Math.max(0, an / 100), 1);
                aa = J.volume * 100
            }
        };
        function w() {
            t.sendEvent(o.JWPLAYER_MEDIA_VOLUME, {
                volume: Math.round(J.volume * 100)
            });
            t.sendEvent(o.JWPLAYER_MEDIA_MUTE, {
                mute: J.muted
            })
        }
        this.mute = function (an) {
            if (!j.exists(an)) {
                an = !J.muted
            }
            if (an) {
                aa = J.volume * 100;
                J.muted = true
            } else {
                this.volume(aa);
                J.muted = false
            }
        };
        this.setState = function (an) {
            if (an === q.PAUSED && this.state === q.IDLE) {
                return
            }
            if (T) {
                return
            }
            f.setState.apply(this, arguments)
        };
        function u() {
            if (!E) {
                return
            }
            var an = ab();
            if (an >= 1) {
                m(A)
            }
            if (an !== X) {
                X = an;
                t.sendEvent(o.JWPLAYER_MEDIA_BUFFER, {
                    bufferPercent: Math.round(X * 100)
                })
            }
        }
        function ab() {
            var an = J.buffered;
            if (!an || !J.duration || an.length === 0) {
                return 0
            }
            return an.end(an.length - 1) / J.duration
        }
        function y(an) {
            L(an);
            if (E) {
                af()
            }
        }
        function af() {
            if (t.state !== q.IDLE) {
                m(A);
                S = -1;
                K = true;
                t.sendEvent(o.JWPLAYER_MEDIA_BEFORECOMPLETE);
                if (E) {
                    t.setState(q.IDLE);
                    K = false;
                    t.sendEvent(o.JWPLAYER_MEDIA_COMPLETE)
                }
            }
        }
        function P(an) {
            al = true;
            s(an);
            if (j.isIOS()) {
                J.controls = false
            }
        }
        function aj(an) {
            al = false;
            s(an);
            if (j.isIOS()) {
                J.controls = false
            }
        }
        function s(an) {
            t.sendEvent("fullscreenchange", {
                target: an.target,
                jwstate: al
            })
        }
        this.checkComplete = function () {
            return K
        };
        this.detachMedia = function () {
            m(A);
            E = false;
            return J
        };
        this.attachMedia = function (an) {
            E = true;
            if (!an) {
                ak = false
            }
            if (K) {
                this.setState(q.IDLE);
                this.sendEvent(o.JWPLAYER_MEDIA_COMPLETE);
                K = false
            }
        };
        this.setContainer = function (an) {
            M = an;
            an.appendChild(J)
        };
        this.getContainer = function () {
            return M
        };
        this.remove = function () {
            if (J) {
                J.removeAttribute("src");
                if (!p) {
                    J.load()
                }
            }
            m(A);
            S = -1;
            if (M === J.parentNode) {
                M.removeChild(J)
            }
        };
        this.setVisibility = function (an) {
            an = !!an;
            if (an || e) {
                j.css.style(M, {
                    visibility: "visible",
                    opacity: 1
                })
            } else {
                j.css.style(M, {
                    visibility: "",
                    opacity: 0
                })
            }
        };
        this.resize = function (ap, ao, an) {
            return j.stretch(an, J, ap, ao, J.videoWidth, J.videoHeight)
        };
        this.setControls = function (an) {
            J.controls = !!an
        };
        this.supportsFullscreen = k.constant(true);
        this.setFullScreen = function (ao) {
            ao = !!ao;
            if (ao) {
                try {
                    var an = J.webkitEnterFullscreen || J.webkitEnterFullScreen;
                    if (an) {
                        an.apply(J)
                    }
                } catch (aq) {
                    return false
                }
                return t.getFullScreen()
            } else {
                var ap = J.webkitExitFullscreen || J.webkitExitFullScreen;
                if (ap) {
                    ap.apply(J)
                }
            }
            return ao
        };
        t.getFullScreen = function () {
            return al || !!J.webkitDisplayingFullscreen
        };
        this.isAudioFile = function () {
            if (!V) {
                return false
            }
            var an = V[0].type;
            return (an === "oga" || an === "aac" || an === "mp3" || an === "vorbis")
        };
        this.setCurrentQuality = function (ap) {
            if (S === ap) {
                return
            }
            ap = parseInt(ap, 10);
            if (ap >= 0) {
                if (V && V.length > ap) {
                    S = ap;
                    j.saveCookie("qualityLabel", V[ap].label);
                    this.sendEvent(o.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                        currentQuality: ap,
                        levels: x(V)
                    });
                    var ao = a(J.currentTime);
                    var an = a(J.duration);
                    if (an <= 0) {
                        an = am
                    }
                    G(ao, an)
                }
            }
        };
        this.getCurrentQuality = function () {
            return S
        };
        this.getQualityLevels = function () {
            return x(V)
        }
    }
    var n = function () {
    };
    n.prototype = f;
    i.prototype = new n();
    i.supports = k.constant(true);
    b.html5.VideoProvider = i
})(jwplayer);
(function (c) {
    var f = c.utils, g = c._, i = c.events, j = i.state, d = c.html5.DefaultProvider, a = new f.scriptloader(
			window.location.protocol + "//www.youtube.com/iframe_api"), e = f
			.isMobile();
    function b(M) {
        this.state = j.IDLE;
        var m = f.extend(this, new c.events.eventdispatcher("provider."
				+ this.name)), U = window.YT, q = null, K = document
				.createElement("div"), x, F = -1, G = false, s = null, l = null, Q = -1, o = -1, H, u = false, E = e;
        this.setState = function (V) {
            clearInterval(Q);
            if (V !== j.IDLE) {
                Q = setInterval(t, 250);
                if (V === j.PLAYING) {
                    N()
                } else {
                    if (V === j.BUFFERING) {
                        y()
                    }
                }
            }
            d.setState.apply(this, arguments)
        };
        if (!U && a) {
            a.addEventListener(i.COMPLETE, z);
            a.addEventListener(i.ERROR, J);
            a.load()
        }
        K.id = M + "_youtube";
        function z() {
            if (window.YT && window.YT.loaded) {
                U = window.YT;
                I()
            } else {
                setTimeout(z, 100)
            }
        }
        function J() {
            a = null
        }
        function v() {
            var V = K && K.parentNode;
            if (!V) {
                if (!G) {
                    c(M).onReady(I);
                    G = true
                }
                return false
            }
            return V
        }
        function I() {
            if (U && v()) {
                if (s) {
                    s.apply(m)
                }
            }
        }
        function t() {
            if (!q || !q.getPlayerState) {
                return
            }
            var V = q.getPlayerState();
            if (V !== null && V !== undefined && V !== o) {
                p({
                    data: V
                })
            }
            var W = U.PlayerState;
            if (V === W.PLAYING) {
                P()
            } else {
                if (V === W.BUFFERING) {
                    y()
                }
            }
        }
        function R(V) {
            return Math.round(V * 10) / 10
        }
        function P() {
            y();
            m.sendEvent(i.JWPLAYER_MEDIA_TIME, {
                position: R(q.getCurrentTime()),
                duration: q.getDuration()
            })
        }
        function y() {
            var V = 0;
            if (q && q.getVideoLoadedFraction) {
                V = Math.round(q.getVideoLoadedFraction() * 100)
            }
            if (F !== V) {
                F = V;
                m.sendEvent(i.JWPLAYER_MEDIA_BUFFER, {
                    bufferPercent: V
                })
            }
        }
        function T() {
            if (m.state !== j.IDLE) {
                u = true;
                m.sendEvent(i.JWPLAYER_MEDIA_BEFORECOMPLETE);
                m.setState(j.IDLE);
                u = false;
                m.sendEvent(i.JWPLAYER_MEDIA_COMPLETE)
            }
        }
        function S() {
            m.sendEvent(i.JWPLAYER_MEDIA_META, {
                duration: q.getDuration(),
                width: K.clientWidth,
                height: K.clientHeight
            })
        }
        function A() {
            var V = arguments;
            var W = V.length - 1;
            return function () {
                var Y = W;
                var X = V[W].apply(this, arguments);
                while (Y--) {
                    X = V[Y].call(this, X)
                }
                return X
            }
        }
        function w(V, Y) {
            if (!V) {
                throw "invalid Youtube ID"
            }
            var X = K.parentNode;
            if (!X) {
                return
            }
            var W = {
                height: "100%",
                width: "100%",
                videoId: V,
                playerVars: f.extend({
                    html5: 1,
                    autoplay: 0,
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    modestbranding: 0,
                    playsinline: 1,
                    origin: location.protocol + "//" + location.hostname
                }, Y),
                events: {
                    onReady: O,
                    onStateChange: p,
                    onPlaybackQualityChange: D,
                    onError: r
                }
            };
            m.setVisibility(true);
            q = new U.Player(K, W);
            K = q.getIframe();
            s = null;
            C();
            n()
        }
        function O() {
            if (l) {
                l.apply(m);
                l = null
            }
        }
        function p(V) {
            var W = U.PlayerState;
            o = V.data;
            switch (o) {
                case W.UNSTARTED:
                    return;
                case W.ENDED:
                    T();
                    return;
                case W.PLAYING:
                    if (g.isFunction(q.unloadModule)) {
                        q.unloadModule("captions")
                    }
                    E = false;
                    S();
                    m.sendEvent(i.JWPLAYER_MEDIA_LEVELS, {
                        levels: m.getQualityLevels(),
                        currentQuality: m.getCurrentQuality()
                    });
                    m.setState(j.PLAYING);
                    return;
                case W.PAUSED:
                    m.setState(j.PAUSED);
                    return;
                case W.BUFFERING:
                    m.setState(j.BUFFERING);
                    return;
                case W.CUED:
                    m.setState(j.IDLE);
                    return
            }
        }
        function D() {
            if (o !== U.PlayerState.ENDED) {
                m.play()
            }
            m.sendEvent(i.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                currentQuality: m.getCurrentQuality(),
                levels: m.getQualityLevels()
            })
        }
        function r() {
            m.sendEvent(i.JWPLAYER_MEDIA_ERROR, {
                message: "Error loading YouTube: Video could not be played"
            })
        }
        function C() {
            if (e) {
                m.setVisibility(true);
                f.css("#" + M + " .jwcontrols", {
                    display: "none"
                })
            }
        }
        function N() {
            f.css("#" + M + " .jwcontrols", {
                display: ""
            })
        }
        function L() {
            clearInterval(Q);
            if (q && q.stopVideo) {
                try {
                    q.stopVideo();
                    q.clearVideo()
                } catch (V) {
                }
            }
        }
        this.init = function (V) {
            B(V)
        };
        this.destroy = function () {
            this.remove();
            x = K = U = m = null
        };
        this.load = function (V) {
            this.setState(j.BUFFERING);
            B(V);
            m.play()
        };
        function B(X) {
            l = null;
            var W = X.sources[0].file;
            var aa = f.youTubeID(W);
            if (!X.image) {
                X.image = "//i.ytimg.com/vi/" + aa + "/0.jpg"
            }
            m.setVisibility(true);
            if (!U || !q) {
                s = function () {
                    w(aa)
                };
                I();
                return
            }
            if (!q.getPlayerState) {
                var V = function () {
                    n();
                    m.load(X)
                };
                if (l) {
                    l = A(V, l)
                } else {
                    l = V
                }
                return
            }
            var Z = q.getVideoData().video_id;
            if (Z !== aa) {
                if (E) {
                    L();
                    q.cueVideoById(aa)
                } else {
                    q.loadVideoById(aa)
                }
                var Y = q.getPlayerState();
                var ab = U.PlayerState;
                if (Y === ab.UNSTARTED || Y === ab.CUED) {
                    C()
                }
            } else {
                if (q.getCurrentTime() > 0) {
                    q.seekTo(0)
                }
                S()
            }
        }
        this.stop = function () {
            L();
            this.setState(j.IDLE)
        };
        this.play = function () {
            if (E) {
                return
            }
            if (q && q.playVideo) {
                q.playVideo()
            } else {
                if (l) {
                    l = A(this.play, l)
                } else {
                    l = this.play
                }
            }
        };
        this.pause = function () {
            if (E) {
                return
            }
            if (q.pauseVideo) {
                q.pauseVideo()
            }
        };
        this.seek = function (V) {
            if (E) {
                return
            }
            if (q.seekTo) {
                q.seekTo(V)
            }
        };
        this.volume = function (V) {
            if (!q || !q.getVolume) {
                return
            }
            if (f.exists(V)) {
                H = Math.min(Math.max(0, V), 100);
                q.setVolume(H)
            }
        };
        function n() {
            if (!q || !q.getVolume) {
                return
            }
            m.sendEvent(i.JWPLAYER_MEDIA_VOLUME, {
                volume: Math.round(q.getVolume())
            });
            m.sendEvent(i.JWPLAYER_MEDIA_MUTE, {
                mute: q.isMuted()
            })
        }
        this.mute = function (V) {
            if (!q || !q.getVolume) {
                return
            }
            if (!f.exists(V)) {
                V = !q.isMuted()
            }
            if (V) {
                H = q.getVolume();
                q.mute()
            } else {
                this.volume(H);
                q.unMute()
            }
        };
        this.detachMedia = function () {
            return document.createElement("video")
        };
        this.attachMedia = function () {
            if (u) {
                this.setState(j.IDLE);
                this.sendEvent(i.JWPLAYER_MEDIA_COMPLETE);
                u = false
            }
        };
        this.setContainer = function (V) {
            x = V;
            V.appendChild(K);
            this.setVisibility(true)
        };
        this.getContainer = function () {
            return x
        };
        this.supportsFullscreen = function () {
            return !!(x && (x.requestFullscreen || x.requestFullScreen
					|| x.webkitRequestFullscreen || x.webkitRequestFullScreen
					|| x.webkitEnterFullscreen || x.webkitEnterFullScreen
					|| x.mozRequestFullScreen || x.msRequestFullscreen))
        };
        this.remove = function () {
            L();
            if (K && x && x === K.parentNode) {
                x.removeChild(K)
            }
            s = l = q = null
        };
        this.setVisibility = function (V) {
            V = !!V;
            if (V) {
                f.css.style(K, {
                    display: "block"
                });
                f.css.style(x, {
                    visibility: "visible",
                    opacity: 1
                })
            } else {
                if (!e) {
                    f.css.style(x, {
                        opacity: 0
                    })
                }
            }
        };
        this.resize = function (X, W, V) {
            return f.stretch(V, K, X, W, K.clientWidth, K.clientHeight)
        };
        this.checkComplete = function () {
            return u
        };
        this.getCurrentQuality = function () {
            if (!q) {
                return
            }
            if (q.getAvailableQualityLevels) {
                var W = q.getPlaybackQuality();
                var V = q.getAvailableQualityLevels();
                return V.indexOf(W)
            }
            return -1
        };
        this.getQualityLevels = function () {
            if (!q) {
                return
            }
            if (!g.isFunction(q.getAvailableQualityLevels)) {
                return []
            }
            var W = q.getAvailableQualityLevels();
            if (W.length === 2 && g.contains(W, "auto")) {
                return {
                    label: g.without(W, "auto")
                }
            }
            var V = g.map(W, function (X) {
                return {
                    label: X
                }
            });
            return V.reverse()
        };
        this.setCurrentQuality = function (X) {
            if (!q) {
                return
            }
            if (q.getAvailableQualityLevels) {
                var W = q.getAvailableQualityLevels();
                if (W.length) {
                    var V = W[W.length - X - 1];
                    q.setPlaybackQuality(V)
                }
            }
        }
    }
    window.onYouTubeIframeAPIReady = function () {
        a = null
    };
    function k(l) {
        return (f.isYouTube(l.file, l.type))
    }
    var h = function () {
    };
    h.prototype = d;
    b.prototype = new h();
    b.supports = k;
    c.html5.YoutubeProvider = b
})(jwplayer);
(function (b) {
    var l = b.utils, h = l.css, c = b.events, d = "jwskip", e = "jwskipimage", g = "jwskipover", f = "jwskipout", k = 80, i = 30, j = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAICAYAAAArzdW1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODkzMWI3Ny04YjE5LTQzYzMtOGM2Ni0wYzdkODNmZTllNDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDI0OTcxRkE0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDI0OTcxRjk0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDA5ZGQxNDktNzdkMi00M2E3LWJjYWYtOTRjZmM2MWNkZDI0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ4OTMxYjc3LThiMTktNDNjMy04YzY2LTBjN2Q4M2ZlOWU0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqAZXX0AAABYSURBVHjafI2BCcAwCAQ/kr3ScRwjW+g2SSezCi0kYHpwKLy8JCLDbWaGTM+MAFzuVNXhNiTQsh+PS9QhZ7o9JuFMeUVNwjsamDma4K+3oy1cqX/hxyPAAAQwNKV27g9PAAAAAElFTkSuQmCC", a = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAICAYAAAArzdW1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODkzMWI3Ny04YjE5LTQzYzMtOGM2Ni0wYzdkODNmZTllNDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDI0OTcxRkU0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDI0OTcxRkQ0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDA5ZGQxNDktNzdkMi00M2E3LWJjYWYtOTRjZmM2MWNkZDI0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ4OTMxYjc3LThiMTktNDNjMy04YzY2LTBjN2Q4M2ZlOWU0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvgIj/QAAABYSURBVHjadI6BCcAgDAS/0jmyih2tm2lHSRZJX6hQQ3w4FP49LKraSHV3ZLDzAuAi3cwaqUhSfvft+EweznHneUdTzPGRmp5hEJFhAo3LaCnjn7blzCvAAH9YOSCL5RZKAAAAAElFTkSuQmCC";
    b.html5.adskipbutton = function (J, C, o, H) {
        var m, q, D = -1, I = false, B, r = 0, p, u, w = false, z = l.extend(
				this, new c.eventdispatcher());
        function s() {
            p = new Image();
            p.src = j;
            p.className = e + " " + f;
            u = new Image();
            u.src = a;
            u.className = e + " " + g;
            m = F("div", d);
            m.id = J + "_skipcontainer";
            q = F("canvas");
            m.appendChild(q);
            z.width = q.width = k;
            z.height = q.height = i;
            m.appendChild(u);
            m.appendChild(p);
            h.style(m, {
                visibility: "hidden",
                bottom: C
            });
            m.addEventListener("mouseover", x);
            m.addEventListener("mouseout", v);
            if (l.isMobile()) {
                var K = new l.touch(m);
                K.addEventListener(l.touchEvents.TAP, A)
            } else {
                m.addEventListener("click", A)
            }
        }
        function G(K) {
            if (D < 0) {
                return
            }
            var L = o.replace(/xx/gi, Math.ceil(D - K));
            y(L)
        }
        function n(M, L) {
            if (l.typeOf(r) === "number") {
                D = r
            } else {
                if (r.slice(-1) === "%") {
                    var K = parseFloat(r.slice(0, -1));
                    if (L && !isNaN(K)) {
                        D = L * K / 100
                    }
                } else {
                    if (l.typeOf(r) === "string") {
                        D = l.seconds(r)
                    } else {
                        if (!isNaN(r)) {
                            D = r
                        }
                    }
                }
            }
        }
        z.updateSkipTime = function (L, K) {
            n(L, K);
            if (D >= 0) {
                h.style(m, {
                    visibility: B ? "visible" : "hidden"
                });
                if (D - L > 0) {
                    G(L);
                    if (I) {
                        I = false;
                        m.style.cursor = "default"
                    }
                } else {
                    if (!I) {
                        if (!I) {
                            I = true;
                            m.style.cursor = "pointer"
                        }
                        if (w) {
                            E()
                        } else {
                            y()
                        }
                    }
                }
            }
        };
        function A() {
            if (I) {
                z.sendEvent(c.JWPLAYER_AD_SKIPPED)
            }
        }
        this.reset = function (K) {
            I = false;
            r = K;
            n(0, 0);
            G(0)
        };
        function x() {
            w = true;
            if (I) {
                E()
            }
        }
        function v() {
            w = false;
            if (I) {
                y()
            }
        }
        function y(M) {
            M = M || H;
            var L = q.getContext("2d");
            L.clearRect(0, 0, k, i);
            t(L, 0, 0, k, i, 5, true, false, false);
            t(L, 0, 0, k, i, 5, false, true, false);
            L.fillStyle = "#979797";
            L.globalAlpha = 1;
            var N = q.height / 2;
            var K = q.width / 2;
            L.textAlign = "center";
            L.font = "Bold 12px Sans-Serif";
            if (M === H) {
                K -= p.width;
                L.drawImage(p, q.width
						- ((q.width - L.measureText(H).width) / 2) - 4,
						(i - p.height) / 2)
            }
            L.fillText(M, K, N + 4)
        }
        function E(M) {
            M = M || H;
            var L = q.getContext("2d");
            L.clearRect(0, 0, k, i);
            t(L, 0, 0, k, i, 5, true, false, true);
            t(L, 0, 0, k, i, 5, false, true, true);
            L.fillStyle = "#FFFFFF";
            L.globalAlpha = 1;
            var N = q.height / 2;
            var K = q.width / 2;
            L.textAlign = "center";
            L.font = "Bold 12px Sans-Serif";
            if (M === H) {
                K -= p.width;
                L.drawImage(u, q.width
						- ((q.width - L.measureText(H).width) / 2) - 4,
						(i - p.height) / 2)
            }
            L.fillText(M, K, N + 4)
        }
        function t(S, O, N, K, P, L, Q, R, M) {
            if (typeof R === "undefined") {
                R = true
            }
            if (typeof L === "undefined") {
                L = 5
            }
            S.beginPath();
            S.moveTo(O + L, N);
            S.lineTo(O + K - L, N);
            S.quadraticCurveTo(O + K, N, O + K, N + L);
            S.lineTo(O + K, N + P - L);
            S.quadraticCurveTo(O + K, N + P, O + K - L, N + P);
            S.lineTo(O + L, N + P);
            S.quadraticCurveTo(O, N + P, O, N + P - L);
            S.lineTo(O, N + L);
            S.quadraticCurveTo(O, N, O + L, N);
            S.closePath();
            if (R) {
                S.strokeStyle = "white";
                S.globalAlpha = M ? 1 : 0.25;
                S.stroke()
            }
            if (Q) {
                S.fillStyle = "#000000";
                S.globalAlpha = 0.5;
                S.fill()
            }
        }
        z.show = function () {
            B = true;
            if (D > 0) {
                h.style(m, {
                    visibility: "visible"
                })
            }
        };
        z.hide = function () {
            B = false;
            h.style(m, {
                visibility: "hidden"
            })
        };
        function F(L, K) {
            var M = document.createElement(L);
            if (K) {
                M.className = K
            }
            return M
        }
        this.element = function () {
            return m
        };
        s()
    };
    h("." + d, {
        position: "absolute",
        "float": "right",
        display: "inline-block",
        width: k,
        height: i,
        right: 10
    });
    h("." + e, {
        position: "relative",
        display: "none"
    })
})(window.jwplayer);
(function (f) {
    var i = f.html5, m = f.utils, o = f.events, p = o.state, n = f.parsers, l = m.css, d = m
			.isAndroid(4, true), k = "playing", a = ".jwcaptions", b = "absolute", c = "none", j = "100%", g = "hidden", h = "normal", e = "#FFFFFF";
    i.captions = function (M, y) {
        var T = M, z, Q = {
            back: true,
            color: e,
            fontSize: 15,
            fontFamily: "Arial,sans-serif",
            fontOpacity: 100,
            backgroundColor: "#000",
            backgroundOpacity: 100,
            edgeStyle: null,
            windowColor: e,
            windowOpacity: 0
        }, P = {
            fontStyle: h,
            fontWeight: h,
            textDecoration: c
        }, W, V, B, w = [], F = 0, K = -1, v = 0, X = false, E = new o.eventdispatcher();
        m.extend(this, E);
        function I() {
            z = document.createElement("div");
            z.id = T.id + "_caption";
            z.className = "jwcaptions";
            T.jwAddEventListener(o.JWPLAYER_PLAYER_STATE, G);
            T.jwAddEventListener(o.JWPLAYER_PLAYLIST_ITEM, S);
            T.jwAddEventListener(o.JWPLAYER_MEDIA_ERROR, R);
            T.jwAddEventListener(o.JWPLAYER_ERROR, R);
            T.jwAddEventListener(o.JWPLAYER_READY, x);
            T.jwAddEventListener(o.JWPLAYER_MEDIA_TIME, q);
            T.jwAddEventListener(o.JWPLAYER_FULLSCREEN, A);
            T.jwAddEventListener(o.JWPLAYER_RESIZE, r)
        }
        function r() {
            u(false)
        }
        function R(Z) {
            m.log("CAPTIONS(" + Z + ")")
        }
        function L() {
            V = "idle";
            u(false)
        }
        function G(Z) {
            switch (Z.newstate) {
                case p.IDLE:
                    L();
                    break;
                case p.PLAYING:
                    D();
                    break
            }
        }
        function A(Z) {
            X = Z.fullscreen;
            if (Z.fullscreen) {
                N();
                setTimeout(N, 500)
            } else {
                u(true)
            }
        }
        function N() {
            var Z = z.offsetHeight, aa = z.offsetWidth;
            if (Z !== 0 && aa !== 0) {
                W.resize(aa, Math.round(Z * 0.94))
            }
        }
        function S() {
            B = 0;
            w = [];
            W.update(0);
            F = 0;
            var ah = T.jwGetPlaylist()[T.jwGetPlaylistIndex()], ae = ah.tracks, ad = [], ac = 0, af = "", Z = 0, aa = "", ag;
            for (ac = 0; ac < ae.length; ac++) {
                var ab = ae[ac].kind.toLowerCase();
                if (ab === "captions" || ab === "subtitles") {
                    ad.push(ae[ac])
                }
            }
            v = 0;
            if (d) {
                return
            }
            for (ac = 0; ac < ad.length; ac++) {
                aa = ad[ac].file;
                if (aa) {
                    if (!ad[ac].label) {
                        ad[ac].label = ac.toString()
                    }
                    w.push(ad[ac]);
                    Y(w[ac].file, ac)
                }
            }
            for (ac = 0; ac < w.length; ac++) {
                if (w[ac]["default"]) {
                    Z = ac + 1;
                    break
                }
            }
            ag = m.getCookies();
            af = ag.captionLabel;
            if (af) {
                ae = t();
                for (ac = 0; ac < ae.length; ac++) {
                    if (af === ae[ac].label) {
                        Z = ac;
                        break
                    }
                }
            }
            if (Z > 0) {
                s(Z)
            }
            u(false);
            U(o.JWPLAYER_CAPTIONS_LIST, t(), v)
        }
        function Y(aa, Z) {
            m.ajax(aa, function (ab) {
                C(ab, Z)
            }, J, true)
        }
        function C(aa, Z) {
            var ae = aa.responseXML ? aa.responseXML.firstChild : null, ad;
            F++;
            if (ae) {
                if (n.localName(ae) === "xml") {
                    ae = ae.nextSibling
                }
                while (ae.nodeType === ae.COMMENT_NODE) {
                    ae = ae.nextSibling
                }
            }
            if (ae && n.localName(ae) === "tt") {
                ad = new f.parsers.dfxp()
            } else {
                ad = new f.parsers.srt()
            }
            try {
                var ab = ad.parse(aa.responseText);
                if (B < w.length) {
                    w[Z].data = ab
                }
                u(false)
            } catch (ac) {
                R(ac.message + ": " + w[Z].file)
            }
            if (F === w.length) {
                if (K > 0) {
                    s(K);
                    K = -1
                }
                O()
            }
        }
        function J(Z) {
            F++;
            R(Z);
            if (F === w.length) {
                if (K > 0) {
                    s(K);
                    K = -1
                }
                O()
            }
        }
        function O() {
            var aa = [];
            for (var Z = 0; Z < w.length; Z++) {
                aa.push(w[Z])
            }
            E.sendEvent(o.JWPLAYER_CAPTIONS_LOADED, {
                captionData: aa
            })
        }
        function D() {
            V = k;
            u(false)
        }
        function u(Z) {
            if (!w.length) {
                W.hide()
            } else {
                if (V === k && v > 0) {
                    W.show();
                    if (X) {
                        A({
                            fullscreen: true
                        });
                        return
                    }
                    H();
                    if (Z) {
                        setTimeout(H, 500)
                    }
                } else {
                    W.hide()
                }
            }
        }
        function H() {
            W.resize()
        }
        function x() {
            m.foreach(Q, function (Z, aa) {
                if (y) {
                    if (y[Z] !== undefined) {
                        aa = y[Z]
                    } else {
                        if (y[Z.toLowerCase()] !== undefined) {
                            aa = y[Z.toLowerCase()]
                        }
                    }
                }
                P[Z] = aa
            });
            W = new f.html5.captions.renderer(P, z);
            u(false)
        }
        function s(Z) {
            if (Z > 0) {
                B = Z - 1;
                v = Math.floor(Z)
            } else {
                v = 0;
                u(false);
                return
            }
            if (B >= w.length) {
                return
            }
            if (w[B].data) {
                W.populate(w[B].data)
            } else {
                if (F === w.length) {
                    R("file not loaded: " + w[B].file);
                    if (v !== 0) {
                        U(o.JWPLAYER_CAPTIONS_CHANGED, w, 0)
                    }
                    v = 0
                } else {
                    K = Z
                }
            }
            u(false)
        }
        function q(Z) {
            W.update(Z.position)
        }
        function U(ac, ab, aa) {
            var Z = {
                type: ac,
                tracks: ab,
                track: aa
            };
            E.sendEvent(ac, Z)
        }
        function t() {
            var aa = [{
                label: "Off"
            }];
            for (var Z = 0; Z < w.length; Z++) {
                aa.push({
                    label: w[Z].label
                })
            }
            return aa
        }
        this.element = function () {
            return z
        };
        this.getCaptionsList = function () {
            return t()
        };
        this.getCurrentCaptions = function () {
            return v
        };
        this.setCurrentCaptions = function (aa) {
            if (aa >= 0 && v !== aa && aa <= w.length) {
                s(aa);
                var Z = t();
                m.saveCookie("captionLabel", Z[v].label);
                U(o.JWPLAYER_CAPTIONS_CHANGED, Z, v)
            }
        };
        I()
    };
    l(a, {
        position: b,
        cursor: "pointer",
        width: j,
        height: j,
        overflow: g
    })
})(jwplayer);
(function (d) {
    var c = d.html5, b = d.utils, a = b.css.style;
    c.captions.renderer = function (s, i) {
        var r, h, m, q, l, n, e = "visible", g = -1;
        this.hide = function () {
            clearInterval(g);
            a(h, {
                display: "none"
            })
        };
        this.populate = function (t) {
            l = -1;
            r = t;
            f()
        };
        function o(t) {
            t = t || "";
            e = "hidden";
            a(h, {
                visibility: e
            });
            q.innerHTML = t;
            if (t.length) {
                e = "visible";
                setTimeout(p, 16)
            }
        }
        this.resize = function () {
            p()
        };
        function p() {
            if (e === "visible") {
                var u = h.clientWidth, v = Math.pow(u / 400, 0.6);
                var t = s.fontSize * v;
                a(q, {
                    maxWidth: u + "px",
                    fontSize: Math.round(t) + "px",
                    lineHeight: Math.round(t * 1.4) + "px",
                    padding: Math.round(1 * v) + "px " + Math.round(8 * v)
							+ "px"
                });
                if (s.windowOpacity) {
                    a(m, {
                        padding: Math.round(5 * v) + "px",
                        borderRadius: Math.round(5 * v) + "px"
                    })
                }
                a(h, {
                    visibility: e
                })
            }
        }
        function f() {
            var u = -1;
            for (var t = 0; t < r.length; t++) {
                if (r[t].begin <= n
						&& (t === r.length - 1 || r[t + 1].begin >= n)) {
                    u = t;
                    break
                }
            }
            if (u === -1) {
                o("")
            } else {
                if (u !== l) {
                    l = u;
                    o(r[t].text)
                }
            }
        }
        function j() {
            var u = s.fontOpacity, y = s.windowOpacity, x = s.edgeStyle, v = s.backgroundColor, t = {
                display: "inline-block"
            }, w = {
                color: b.hexToRgba(b.rgbHex(s.color), u),
                display: "inline-block",
                fontFamily: s.fontFamily,
                fontStyle: s.fontStyle,
                fontWeight: s.fontWeight,
                textAlign: "center",
                textDecoration: s.textDecoration,
                wordWrap: "break-word"
            };
            if (y) {
                t.backgroundColor = b.hexToRgba(b.rgbHex(s.windowColor), y)
            }
            k(x, w, u);
            if (s.back) {
                w.backgroundColor = b.hexToRgba(b.rgbHex(v),
						s.backgroundOpacity)
            } else {
                if (x === null) {
                    k("uniform", w)
                }
            }
            h = document.createElement("div");
            m = document.createElement("div");
            q = document.createElement("span");
            a(h, {
                display: "block",
                height: "auto",
                position: "absolute",
                bottom: "20px",
                textAlign: "center",
                width: "100%"
            });
            a(m, t);
            a(q, w);
            m.appendChild(q);
            h.appendChild(m);
            i.appendChild(h)
        }
        function k(w, v, u) {
            var t = b.hexToRgba("#000000", u);
            if (w === "dropshadow") {
                v.textShadow = "0 2px 1px " + t
            } else {
                if (w === "raised") {
                    v.textShadow = "0 0 5px " + t + ", 0 1px 5px " + t
							+ ", 0 2px 5px " + t
                } else {
                    if (w === "depressed") {
                        v.textShadow = "0 -2px 1px " + t
                    } else {
                        if (w === "uniform") {
                            v.textShadow = "-2px 0 1px " + t + ",2px 0 1px "
									+ t + ",0 -2px 1px " + t + ",0 2px 1px "
									+ t + ",-1px 1px 1px " + t
									+ ",1px 1px 1px " + t + ",1px -1px 1px "
									+ t + ",1px 1px 1px " + t
                        }
                    }
                }
            }
        }
        this.show = function () {
            a(h, {
                display: "block"
            });
            p();
            clearInterval(g);
            g = setInterval(p, 250)
        };
        this.update = function (t) {
            n = t;
            if (r) {
                f()
            }
        };
        j()
    }
})(jwplayer);
(function (i, q, g) {
    var m = i.jwplayer, j = m.html5, v = m.utils, z = m._, b = m.events, f = b.state, p = v.css, w = v.transitionStyle, t = v
			.isMobile(), e = v.isAndroid(4, true), x = (i.top !== i.self), c = "button", o = "text", h = "divider", r = "slider", y = 250, s = {
			    display: "none"
			}, k = {
			    display: "block"
			}, a = {
			    display: ""
			};
    function n(C, B) {
        var A = z.indexOf(C, B);
        if (A > -1) {
            C.splice(A, 1)
        }
    }
    function l(C, B) {
        var A = z.indexOf(C, B);
        if (A === -1) {
            C.push(B)
        }
    }
    function d(B, A) {
        return B + "_" + A
    }
    function u(A) {
        return A ? parseInt(A.width, 10) + "px " + parseInt(A.height, 10)
				+ "px" : "0 0"
    }
    j.controlbar = function (bS, ak) {
        ak = ak || {};
        var bT, bH = aU("divider", h), aJ = {
            margin: 8,
            maxwidth: 800,
            font: "Arial,sans-serif",
            fontsize: 11,
            fontcolor: parseInt("eeeeee", 16),
            fontweight: "bold",
            layout: {
                left: {
                    position: "left",
                    elements: [aU("play", c), aU("prev", c), aU("next", c),
							aU("elapsed", o)]
                },
                center: {
                    position: "center",
                    elements: [aU("time", r), aU("alt", o)]
                },
                right: {
                    position: "right",
                    elements: [aU("duration", o), aU("hd", c), aU("cc", c),
							aU("mute", c), aU("volume", r), aU("volumeH", r),
							aU("cast", c), aU("fullscreen", c)]
                }
            }
        }, a8, ax, aI, bE, av, bU, bL, a5, aE = [], Y, bs, bV, a6, bY = {}, aO, am, bl, I, bt, aS, bG, aH, O, aB, H, b1, a0, ac, K, T = -1, a4 = false, aT = false, aX = false, bI = false, S = null, bw = 0, bh = [], B, aP = {
            play: "pause",
            mute: "unmute",
            cast: "casting",
            fullscreen: "normalscreen"
        }, bu = {
            play: false,
            mute: false,
            cast: false,
            fullscreen: ak.fullscreen || false
        }, af = {
            play: aC,
            mute: bf,
            fullscreen: ae,
            next: bg,
            prev: b5,
            hd: b3,
            cc: aK,
            cast: bp
        }, aq = {
            time: au,
            volume: bD
        }, aW = {}, bm = [], bd = v.extend(this, new b.eventdispatcher());
        function aU(b8, ca, b9) {
            return {
                name: b8,
                type: ca,
                className: b9
            }
        }
        function aa() {
            aI = {};
            bU = bS.id + "_controlbar";
            bL = a5 = 0;
            av = by();
            av.id = bU;
            av.className = "jwcontrolbar";
            bT = bS.skin;
            ax = bT.getComponentLayout("controlbar");
            if (!ax) {
                ax = aJ.layout
            }
            v.clearCss(V());
            p.block(bU + "build");
            bz();
            ag();
            p.unblock(bU + "build");
            G();
            setTimeout(ao, 0);
            b7();
            bd.visible = false;
            R()
        }
        function G() {
            bS.jwAddEventListener(b.JWPLAYER_MEDIA_TIME, aA);
            bS.jwAddEventListener(b.JWPLAYER_PLAYER_STATE, bX);
            bS.jwAddEventListener(b.JWPLAYER_PLAYLIST_ITEM, bi);
            bS.jwAddEventListener(b.JWPLAYER_MEDIA_MUTE, ao);
            bS.jwAddEventListener(b.JWPLAYER_MEDIA_VOLUME, ao);
            bS.jwAddEventListener(b.JWPLAYER_MEDIA_BUFFER, bW);
            bS.jwAddEventListener(b.JWPLAYER_FULLSCREEN, bB);
            bS.jwAddEventListener(b.JWPLAYER_PLAYLIST_LOADED, b7);
            bS.jwAddEventListener(b.JWPLAYER_MEDIA_LEVELS, ai);
            bS.jwAddEventListener(b.JWPLAYER_MEDIA_LEVEL_CHANGED, bJ);
            bS.jwAddEventListener(b.JWPLAYER_CAPTIONS_LIST, bZ);
            bS.jwAddEventListener(b.JWPLAYER_CAPTIONS_CHANGED, D);
            bS.jwAddEventListener(b.JWPLAYER_RESIZE, bn);
            bS.jwAddEventListener(b.JWPLAYER_CAST_AVAILABLE, R);
            bS.jwAddEventListener(b.JWPLAYER_CAST_SESSION, an);
            if (!t) {
                av.addEventListener("mouseover", function () {
                    i.addEventListener("mousedown", bO, false)
                }, false);
                av.addEventListener("mouseout", function () {
                    i.removeEventListener("mousedown", bO);
                    q.onselectstart = null
                }, false)
            }
        }
        function bn() {
            am = v.bounds(av);
            if (am.width > 0) {
                bd.show(true)
            }
        }
        function aM(b8) {
            var ca = (b8.duration === Number.POSITIVE_INFINITY);
            var b9 = (b8.duration === 0 && b8.position !== 0 && v.isSafari() && !t);
            return ca || b9
        }
        function aA(b8) {
            p.block(bU);
            if (aM(b8)) {
                bd.setText(bS.jwGetPlaylist()[bS.jwGetPlaylistIndex()].title
						|| "Live broadcast");
                ab(false)
            } else {
                var b9;
                if (aI.elapsed) {
                    b9 = v.timeFormat(b8.position);
                    aI.elapsed.innerHTML = b9
                }
                if (aI.duration) {
                    b9 = v.timeFormat(b8.duration);
                    aI.duration.innerHTML = b9
                }
                if (b8.duration > 0) {
                    Q(b8.position / b8.duration)
                } else {
                    Q(0)
                }
                bL = b8.duration;
                a5 = b8.position;
                if (!aT) {
                    bd.setText()
                }
            }
        }
        function bX(b8) {
            switch (b8.newstate) {
                case f.BUFFERING:
                case f.PLAYING:
                    if (aI.timeSliderThumb) {
                        p.style(aI.timeSliderThumb, {
                            opacity: 1
                        })
                    }
                    aF("play", true);
                    break;
                case f.PAUSED:
                    if (!S) {
                        aF("play", false)
                    }
                    break;
                case f.IDLE:
                    aF("play", false);
                    if (aI.timeSliderThumb) {
                        p.style(aI.timeSliderThumb, {
                            opacity: 0
                        })
                    }
                    if (aI.timeRail) {
                        aI.timeRail.className = "jwrail"
                    }
                    aN(0);
                    aA({
                        position: 0,
                        duration: 0
                    });
                    break
            }
        }
        function bi(b8) {
            if (!aT) {
                var ca = bS.jwGetPlaylist()[b8.index].tracks, b9 = false, cc = false;
                aj();
                if (z.isArray(ca) && !t) {
                    for (var cb = 0; cb < ca.length; cb++) {
                        if (!b9 && ca[cb].file && ca[cb].kind
								&& ca[cb].kind.toLowerCase() === "thumbnails") {
                            bG.load(ca[cb].file);
                            b9 = true
                        }
                        if (ca[cb].file && ca[cb].kind
								&& ca[cb].kind.toLowerCase() === "chapters") {
                            ap(ca[cb].file);
                            cc = true
                        }
                    }
                }
                if (!b9) {
                    bG.load()
                }
            }
        }
        function ao() {
            var b8 = bS.jwGetMute();
            a6 = bS.jwGetVolume() / 100;
            aF("mute", b8 || a6 === 0);
            ay(b8 ? 0 : a6)
        }
        function bW(b8) {
            aN(b8.bufferPercent / 100)
        }
        function bB(b8) {
            aF("fullscreen", b8.fullscreen);
            ah();
            if (bd.visible) {
                bd.show(true)
            }
        }
        function b7() {
            p.style([aI.hd, aI.cc], s);
            ah();
            ar()
        }
        function be() {
            return (!aT && aE.length > 1 && H)
        }
        function ai(b8) {
            aE = b8.levels || [];
            if (be()) {
                p.style(aI.hd, a);
                H.clearOptions();
                for (var b9 = 0; b9 < aE.length; b9++) {
                    H.addOption(aE[b9].label, b9)
                }
                bJ(b8)
            } else {
                p.style(aI.hd, s)
            }
            ar()
        }
        function bJ(b8) {
            Y = Math.floor(b8.currentQuality);
            if (aI.hd) {
                aI.hd.querySelector("button").className = (aE.length === 2 && Y === 0) ? "off"
						: ""
            }
            if (H && Y >= 0) {
                H.setActive(b8.currentQuality)
            }
        }
        function b4() {
            return (!aT && bs && bs.length > 1 && ac)
        }
        function bZ(b8) {
            bs = b8.tracks;
            if (b4()) {
                p.style(aI.cc, a);
                ac.clearOptions();
                for (var b9 = 0; b9 < bs.length; b9++) {
                    ac.addOption(bs[b9].label, b9)
                }
                D(b8)
            } else {
                p.style(aI.cc, s)
            }
            ar()
        }
        function D(b8) {
            if (!bs) {
                return
            }
            bV = Math.floor(b8.track);
            if (aI.cc) {
                aI.cc.querySelector("button").className = (bs.length === 2 && bV === 0) ? "off"
						: ""
            }
            if (ac && bV >= 0) {
                ac.setActive(b8.track)
            }
        }
        function R(b8) {
            if (aI.cast) {
                if (v.canCast()) {
                    v.addClass(aI.cast, "jwcancast")
                } else {
                    v.removeClass(aI.cast, "jwcancast")
                }
            }
            an(b8 || bY)
        }
        function an(b8) {
            bY = b8;
            aF("cast", b8.active);
            ar()
        }
        function aw() {
            return (!!q.querySelector("#" + bS.id + " .jwplaylist") && !bS
					.jwGetFullscreen())
        }
        function bz() {
            a8 = v.extend({}, aJ, bT.getComponentSettings("controlbar"), ak);
            bE = W("background").height;
            var b9 = a4 ? 0 : a8.margin;
            var b8 = {
                height: bE,
                bottom: b9,
                left: b9,
                right: b9,
                "max-width": a4 ? "" : a8.maxwidth
            };
            p.style(av, b8);
            p(V(".jwtext"), {
                font: a8.fontsize + "px/" + W("background").height + "px "
						+ a8.font,
                color: a8.fontcolor,
                "font-weight": a8.fontweight
            });
            p(V(".jwoverlay"), {
                bottom: bE
            })
        }
        function V(b8) {
            return "#" + bU + (b8 ? " " + b8 : "")
        }
        function by() {
            return bo("span")
        }
        function bo(b8) {
            return q.createElement(b8)
        }
        function ag() {
            var ca = Z("capLeft");
            var b9 = Z("capRight");
            var b8 = Z("background", {
                position: "absolute",
                left: W("capLeft").width,
                right: W("capRight").width,
                "background-repeat": "repeat-x"
            }, true);
            if (b8) {
                bx(av, b8)
            }
            if (ca) {
                bx(av, ca)
            }
            a3();
            if (b9) {
                bx(av, b9)
            }
        }
        function aD(b8, b9) {
            switch (b8.type) {
                case o:
                    return bc(b8.name);
                case c:
                    if (b8.name !== "blank") {
                        return ad(b8.name, b9)
                    }
                    break;
                case r:
                    return bq(b8.name)
            }
        }
        function Z(ca, b9, cb, cf, cc) {
            var ce = by(), cg = W(ca), b8 = cf ? " left center" : " center", ch = u(cg), cd;
            ce.className = "jw" + ca;
            ce.innerHTML = "&nbsp;";
            if (!cg || !cg.src) {
                return
            }
            if (cb) {
                cd = {
                    background: 'url("' + cg.src + '") repeat-x ' + b8,
                    "background-size": ch,
                    height: cc ? cg.height : ""
                }
            } else {
                cd = {
                    background: 'url("' + cg.src + '") no-repeat' + b8,
                    "background-size": ch,
                    width: cg.width,
                    height: cc ? cg.height : ""
                }
            }
            ce.skin = cg;
            p(V((cc ? ".jwvertical " : "") + ".jw" + ca), v.extend(cd, b9));
            aI[ca] = ce;
            return ce
        }
        function ad(b9, cg) {
            if (!W(b9 + "Button").src) {
                return null
            }
            if (t && (b9 === "mute" || b9.indexOf("volume") === 0)) {
                return null
            }
            if (e && /hd|cc/.test(b9)) {
                return null
            }
            var cc = by();
            var ch = by();
            var cb = U(bH);
            var ce = bo("button");
            cc.className = "jw" + b9;
            if (cg === "left") {
                bx(cc, ch);
                bx(cc, cb)
            } else {
                bx(cc, cb);
                bx(cc, ch)
            }
            if (!t) {
                ce.addEventListener("click", J(b9), false)
            } else {
                if (b9 !== "hd" && b9 !== "cc") {
                    var b8 = new v.touch(ce);
                    b8.addEventListener(v.touchEvents.TAP, J(b9))
                }
            }
            ce.innerHTML = "&nbsp;";
            ce.tabIndex = -1;
            ce.setAttribute("type", "button");
            bx(ch, ce);
            var ca = W(b9 + "Button"), cf = W(b9 + "ButtonOver"), ci = W(b9
					+ "ButtonOff");
            a9(V(".jw" + b9 + " button"), ca, cf, ci);
            var cd = aP[b9];
            if (cd) {
                a9(V(".jw" + b9 + ".jwtoggle button"), W(cd + "Button"), W(cd
						+ "ButtonOver"))
            }
            if (bu[b9]) {
                v.addClass(cc, "jwtoggle")
            } else {
                v.removeClass(cc, "jwtoggle")
            }
            aI[b9] = cc;
            return cc
        }
        function a9(b8, b9, ca, cb) {
            if (!b9 || !b9.src) {
                return
            }
            p(b8, {
                width: b9.width,
                background: "url(" + b9.src + ") no-repeat center",
                "background-size": u(b9)
            });
            if (ca.src && !t) {
                p(b8 + ":hover," + b8 + ".off:hover", {
                    background: "url(" + ca.src + ") no-repeat center",
                    "background-size": u(ca)
                })
            }
            if (cb && cb.src) {
                p(b8 + ".off", {
                    background: "url(" + cb.src + ") no-repeat center",
                    "background-size": u(cb)
                })
            }
        }
        function J(b8) {
            return function (b9) {
                if (af[b8]) {
                    af[b8]();
                    if (t) {
                        bd.sendEvent(b.JWPLAYER_USER_ACTION)
                    }
                }
                if (b9.preventDefault) {
                    b9.preventDefault()
                }
            }
        }
        function aC() {
            if (bu.play) {
                bS.jwPause()
            } else {
                bS.jwPlay()
            }
        }
        function bf() {
            var b8 = !bu.mute;
            bS.jwSetMute(b8);
            if (!b8 && a6 === 0) {
                bS.jwSetVolume(20)
            }
            ao()
        }
        function E(b8) {
            v.foreach(aW, function (ca, b9) {
                if (ca !== b8) {
                    if (ca === "cc") {
                        bQ()
                    }
                    if (ca === "hd") {
                        b2()
                    }
                    b9.hide()
                }
            })
        }
        function ab(b8) {
            if (!av || !aI.alt) {
                return
            }
            if (b8 === g) {
                b8 = (av.parentNode && av.parentNode.clientWidth >= 320)
            }
            if (b8 && !aT) {
                p.style(bm, a)
            } else {
                p.style(bm, s)
            }
        }
        function A() {
            if (a4 || aT) {
                return
            }
            p.block(bU);
            aO.show();
            P("volume", aO);
            E("volume")
        }
        function bD(b8) {
            ay(b8);
            if (b8 < 0.1) {
                b8 = 0
            }
            if (b8 > 0.9) {
                b8 = 1
            }
            bS.jwSetVolume(b8 * 100)
        }
        function au(b9) {
            var b8;
            if (B) {
                b9 = B.position;
                if (b9.toString().slice(-1) === "%") {
                    b8 = bL * parseFloat(b9.slice(0, -1)) / 100
                } else {
                    b8 = parseFloat(b9)
                }
            } else {
                b8 = b9 * bL
            }
            bS.jwSeek(b8)
        }
        function ae() {
            bS.jwSetFullscreen()
        }
        function bg() {
            bS.jwPlaylistNext()
        }
        function b5() {
            bS.jwPlaylistPrev()
        }
        function aF(b8, b9) {
            if (!z.isBoolean(b9)) {
                b9 = !bu[b8]
            }
            if (aI[b8]) {
                if (b9) {
                    v.addClass(aI[b8], "jwtoggle")
                } else {
                    v.removeClass(aI[b8], "jwtoggle")
                }
                v.addClass(aI[b8], "jwtoggling");
                setTimeout(function () {
                    v.removeClass(aI[b8], "jwtoggling")
                }, 100)
            }
            bu[b8] = b9
        }
        function bc(b9) {
            var cc = {}, b8 = (b9 === "alt") ? "elapsed" : b9, cb = W(b8
					+ "Background");
            if (cb.src) {
                var ca = by();
                ca.id = d(bU, b9);
                if (b9 === "elapsed" || b9 === "duration") {
                    ca.className = "jwtext jw" + b9 + " jwhidden";
                    bm.push(ca)
                } else {
                    ca.className = "jwtext jw" + b9
                }
                cc.background = "url(" + cb.src + ") repeat-x center";
                cc["background-size"] = u(W("background"));
                p.style(ca, cc);
                ca.innerHTML = (b9 !== "alt") ? "00:00" : "";
                aI[b9] = ca;
                return ca
            }
            return null
        }
        function U(b9) {
            var b8 = Z(b9.name);
            if (!b8) {
                b8 = by();
                b8.className = "jwblankDivider"
            }
            if (b9.className) {
                b8.className += " " + b9.className
            }
            return b8
        }
        function a7() {
            if (aE.length > 2) {
                if (O) {
                    clearTimeout(O);
                    O = g
                }
                p.block(bU);
                H.show();
                P("hd", H);
                E("hd")
            }
        }
        function b6() {
            if (bs && bs.length > 2) {
                if (b1) {
                    clearTimeout(b1);
                    b1 = g
                }
                p.block(bU);
                ac.show();
                P("cc", ac);
                E("cc")
            }
        }
        function C(b8) {
            if (b8 >= 0 && b8 < aE.length) {
                bS.jwSetCurrentQuality(b8);
                b2();
                H.hide()
            }
        }
        function bb(b8) {
            if (b8 >= 0 && b8 < bs.length) {
                bS.jwSetCurrentCaptions(b8);
                bQ();
                ac.hide()
            }
        }
        function aK() {
            if (bs.length !== 2) {
                return
            }
            bb((bV + 1) % 2)
        }
        function b3() {
            if (aE.length !== 2) {
                return
            }
            C((Y + 1) % 2)
        }
        function bp() {
            if (bY.active) {
                bS.jwOpenExtension()
            } else {
                bS.jwStartCasting()
            }
        }
        function bq(b8) {
            if (t && b8.indexOf("volume") === 0) {
                return
            }
            var ca = by(), cd = b8 === "volume", cb = b8
					+ (b8 === "time" ? "Slider" : ""), cg = cb + "Cap", cc = cd ? "Top"
					: "Left", ci = cd ? "Bottom" : "Right", ce = Z(cg + cc,
					null, false, false, cd), cf = Z(cg + ci, null, false,
					false, cd), b9 = bA(b8, cd, cc, ci), cj = W(cg + cc), ch = W(cg
					+ cc);
            ca.className = "jwslider jw" + b8;
            if (ce) {
                bx(ca, ce)
            }
            bx(ca, b9);
            if (cf) {
                if (cd) {
                    cf.className += " jwcapBottom"
                }
                bx(ca, cf)
            }
            p(V(".jw" + b8 + " .jwrail"), {
                left: cd ? "" : cj.width,
                right: cd ? "" : ch.width,
                top: cd ? cj.height : "",
                bottom: cd ? ch.height : "",
                width: cd ? "100%" : "",
                height: cd ? "auto" : ""
            });
            aI[b8] = ca;
            ca.vertical = cd;
            if (b8 === "time") {
                bt = new j.overlay(bU + "_timetooltip", bT);
                bG = new j.thumbs(bU + "_thumb");
                aH = bo("div");
                aH.className = "jwoverlaytext";
                aS = bo("div");
                bx(aS, bG.element());
                bx(aS, aH);
                bt.setContents(aS);
                bl = b9;
                bv(0);
                bx(b9, bt.element());
                L(ca);
                Q(0);
                aN(0)
            } else {
                if (b8.indexOf("volume") === 0) {
                    aZ(ca, cd, cc, ci)
                }
            }
            return ca
        }
        function bA(cr, b9, cd, cp) {
            var ca = by(), ci = ["Rail", "Buffer", "Progress"], ce, cl;
            ca.className = "jwrail";
            for (var ck = 0; ck < ci.length; ck++) {
                cl = (cr === "time" ? "Slider" : "");
                var cj = cr + cl + ci[ck], cc = Z(cj, null, !b9, (cr
						.indexOf("volume") === 0), b9), cf = Z(cj + "Cap" + cd,
						null, false, false, b9), cg = Z(cj + "Cap" + cp, null,
						false, false, b9), cb = W(cj + "Cap" + cd), b8 = W(cj
						+ "Cap" + cp);
                if (cc) {
                    var ch = by();
                    ch.className = "jwrailgroup " + ci[ck];
                    if (cf) {
                        bx(ch, cf)
                    }
                    bx(ch, cc);
                    if (cg) {
                        bx(ch, cg);
                        cg.className += " jwcap" + (b9 ? "Bottom" : "Right")
                    }
                    p(V(".jwrailgroup." + ci[ck]), {
                        "min-width": (b9 ? "" : cb.width + b8.width)
                    });
                    ch.capSize = b9 ? cb.height + b8.height : cb.width
							+ b8.width;
                    p(V("." + cc.className), {
                        left: b9 ? "" : cb.width,
                        right: b9 ? "" : b8.width,
                        top: b9 ? cb.height : "",
                        bottom: b9 ? b8.height : "",
                        height: b9 ? "auto" : ""
                    });
                    if (ck === 2) {
                        ce = ch
                    }
                    if (ck === 2 && !b9) {
                        var cq = by();
                        cq.className = "jwprogressOverflow";
                        bx(cq, ch);
                        aI[cj] = cq;
                        bx(ca, cq)
                    } else {
                        aI[cj] = ch;
                        bx(ca, ch)
                    }
                }
            }
            var cn = Z(cr + cl + "Thumb", null, false, false, b9);
            if (cn) {
                p(V("." + cn.className), {
                    opacity: cr === "time" ? 0 : 1,
                    "margin-top": b9 ? cn.skin.height / -2 : ""
                });
                cn.className += " jwthumb";
                bx(b9 && ce ? ce : ca, cn)
            }
            if (!t) {
                var co = cr;
                if (co === "volume" && !b9) {
                    co += "H"
                }
                ca.addEventListener("mousedown", bP(co), false)
            } else {
                var cm = new v.touch(ca);
                cm.addEventListener(v.touchEvents.DRAG_START, X);
                cm.addEventListener(v.touchEvents.DRAG, bM);
                cm.addEventListener(v.touchEvents.DRAG_END, bM);
                cm.addEventListener(v.touchEvents.TAP, at)
            }
            if (cr === "time" && !t) {
                ca.addEventListener("mousemove", bN, false);
                ca.addEventListener("mouseout", N, false)
            }
            aI[cr + "Rail"] = ca;
            return ca
        }
        function F() {
            var b8 = bS.jwGetState();
            return (b8 === f.IDLE)
        }
        function bO(b8) {
            b8.preventDefault();
            q.onselectstart = function () {
                return false
            }
        }
        function az(b8) {
            M();
            S = b8;
            i.addEventListener("mouseup", bF, false);
            i.addEventListener("mousemove", bF, false)
        }
        function M() {
            i.removeEventListener("mouseup", bF);
            i.removeEventListener("mousemove", bF);
            S = null
        }
        function X() {
            aI.timeRail.className = "jwrail";
            if (!F()) {
                bS.jwSeekDrag(true);
                az("time");
                bN();
                bd.sendEvent(b.JWPLAYER_USER_ACTION)
            }
        }
        function bM(b8) {
            if (!S) {
                return
            }
            var cb = aI[S].querySelector(".jwrail"), cc = v.bounds(cb), ca = b8.x
					/ cc.width;
            if (ca > 100) {
                ca = 100
            }
            if (b8.type === v.touchEvents.DRAG_END) {
                bS.jwSeekDrag(false);
                aI.timeRail.className = "jwrail";
                M();
                aq.time(ca);
                N();
                bd.sendEvent(b.JWPLAYER_USER_ACTION)
            } else {
                Q(ca);
                var b9 = (new Date()).getTime();
                if (b9 - bw > 500) {
                    bw = b9;
                    aq.time(ca)
                }
                bd.sendEvent(b.JWPLAYER_USER_ACTION)
            }
        }
        function at(b8) {
            var ca = aI.time.querySelector(".jwrail"), cb = v.bounds(ca), b9 = b8.x
					/ cb.width;
            if (b9 > 100) {
                b9 = 100
            }
            if (!F()) {
                aq.time(b9);
                bd.sendEvent(b.JWPLAYER_USER_ACTION)
            }
        }
        function bP(b8) {
            return function (b9) {
                if (b9.button) {
                    return
                }
                aI[b8 + "Rail"].className = "jwrail";
                if (b8 === "time") {
                    if (!F()) {
                        bS.jwSeekDrag(true);
                        az(b8)
                    }
                } else {
                    az(b8)
                }
            }
        }
        function bF(b8) {
            if (!S || b8.button) {
                return
            }
            var cc = aI[S].querySelector(".jwrail"), cd = v.bounds(cc), b9 = S, cb;
            if (al()) {
                cb = aI[b9].vertical ? ((cd.bottom * 100 - b8.pageY) / (cd.height * 100))
						: ((b8.pageX - (cd.left * 100)) / (cd.width * 100))
            } else {
                cb = aI[b9].vertical ? ((cd.bottom - b8.pageY) / cd.height)
						: ((b8.pageX - cd.left) / cd.width)
            }
            if (b8.type === "mouseup") {
                if (b9 === "time") {
                    bS.jwSeekDrag(false)
                }
                aI[b9 + "Rail"].className = "jwrail";
                M();
                aq[b9.replace("H", "")](cb)
            } else {
                if (S === "time") {
                    Q(cb)
                } else {
                    ay(cb)
                }
                var ca = (new Date()).getTime();
                if (ca - bw > 500) {
                    bw = ca;
                    aq[S.replace("H", "")](cb)
                }
            }
            return false
        }
        function bN(b8) {
            if (b8) {
                a2.apply(this, arguments)
            }
            if (bt && bL && !a4 && !t) {
                p.block(bU);
                bt.show();
                P("time", bt)
            }
        }
        function N() {
            if (bt) {
                bt.hide()
            }
        }
        function a2(b9) {
            am = v.bounds(av);
            I = v.bounds(bl);
            if (!I || I.width === 0) {
                return
            }
            var b8, ca;
            if (al()) {
                b8 = (b9.pageX ? (b9.pageX - I.left * 100) : b9.x);
                ca = I.width * 100
            } else {
                b8 = (b9.pageX ? (b9.pageX - I.left) : b9.x);
                ca = I.width
            }
            bt.positionX(Math.round(b8));
            bv(bL * b8 / ca)
        }
        var bv = (function () {
            var b9;
            var b8 = function (ca) {
                p.style(bt.element(), {
                    width: ca
                });
                P("time", bt)
            };
            return function (ca) {
                var cc = bG.updateTimeline(ca, b8);
                var cb;
                if (B) {
                    cb = B.text;
                    if (cb && (cb !== b9)) {
                        b9 = cb;
                        p.style(bt.element(), {
                            width: (cb.length > 32) ? 160 : ""
                        })
                    }
                } else {
                    cb = v.timeFormat(ca);
                    if (!cc) {
                        p.style(bt.element(), {
                            width: ""
                        })
                    }
                }
                if (aH.innerHTML !== cb) {
                    aH.innerHTML = cb
                }
                P("time", bt)
            }
        })();
        function L() {
            if (!aI.timeSliderRail) {
                p.style(aI.time, s)
            }
            if (aI.timeSliderThumb) {
                p.style(aI.timeSliderThumb, {
                    "margin-left": (W("timeSliderThumb").width / -2)
                })
            }
            var ca = "timeSliderCue", b8 = W(ca), b9 = {
                "z-index": 1
            };
            if (b8 && b8.src) {
                Z(ca);
                b9["margin-left"] = b8.width / -2
            } else {
                b9.display = "none"
            }
            p(V(".jw" + ca), b9);
            aN(0);
            Q(0)
        }
        function aY(cc, cb) {
            if (/^[\d\.]+%?$/.test(cc.toString())) {
                var b9 = Z("timeSliderCue"), ca = aI.timeSliderRail, b8 = {
                    position: cc,
                    text: cb,
                    element: b9
                };
                if (b9 && ca) {
                    ca.appendChild(b9);
                    b9.addEventListener("mouseover", function () {
                        B = b8
                    }, false);
                    b9.addEventListener("mouseout", function () {
                        B = null
                    }, false);
                    bh.push(b8)
                }
            }
            aR()
        }
        function aR() {
            v.foreach(bh, function (b9, b8) {
                var ca = {};
                if (b8.position.toString().slice(-1) === "%") {
                    ca.left = b8.position
                } else {
                    if (bL > 0) {
                        ca.left = (100 * b8.position / bL).toFixed(2) + "%";
                        ca.display = null
                    } else {
                        ca.left = 0;
                        ca.display = "none"
                    }
                }
                p.style(b8.element, ca)
            })
        }
        function aj() {
            var b8 = aI.timeSliderRail;
            v.foreach(bh, function (ca, b9) {
                b8.removeChild(b9.element)
            });
            bh.length = 0
        }
        bd.setText = function (ca) {
            p.block(bU);
            var b8 = aI.alt, b9 = aI.time;
            if (!aI.timeSliderRail) {
                p.style(b9, s)
            } else {
                p.style(b9, ca ? s : k)
            }
            if (b8) {
                p.style(b8, ca ? k : s);
                b8.innerHTML = ca || ""
            }
            ar()
        };
        function aZ(ca, b8, cd, b9) {
            var cb = "volume" + (b8 ? "" : "H"), cc = b8 ? "vertical"
					: "horizontal";
            p(V(".jw" + cb + ".jw" + cc),
					{
					    width: W(cb + "Rail", b8).width
								+ (b8 ? 0 : (W(cb + "Cap" + cd).width
										+ W(cb + "RailCap" + cd).width
										+ W(cb + "RailCap" + b9).width + W(cb
										+ "Cap" + b9).width)),
					    height: b8 ? (W(cb + "Cap" + cd).height
								+ W(cb + "Rail").height
								+ W(cb + "RailCap" + cd).height
								+ W(cb + "RailCap" + b9).height + W(cb + "Cap"
								+ b9).height) : ""
					});
            ca.className += " jw" + cc
        }
        var aQ = {};
        function a3() {
            a1("left");
            a1("center");
            a1("right");
            bx(av, aQ.left);
            bx(av, aQ.center);
            bx(av, aQ.right);
            aV();
            p.style(aQ.right, {
                right: W("capRight").width
            })
        }
        function aV() {
            if (aI.hd) {
                H = new j.menu("hd", bU + "_hd", bT, C);
                if (!t) {
                    aL(H, aI.hd, a7, bK)
                } else {
                    bC(H, aI.hd, a7, "hd")
                }
                aW.hd = H
            }
            if (aI.cc) {
                ac = new j.menu("cc", bU + "_cc", bT, bb);
                if (!t) {
                    aL(ac, aI.cc, b6, bj)
                } else {
                    bC(ac, aI.cc, b6, "cc")
                }
                aW.cc = ac
            }
            if (aI.mute && aI.volume && aI.volume.vertical) {
                aO = new j.overlay(bU + "_volumeoverlay", bT);
                aO.setContents(aI.volume);
                aL(aO, aI.mute, A);
                aW.volume = aO
            }
        }
        function bj() {
            b1 = setTimeout(ac.hide, 500)
        }
        function bK() {
            O = setTimeout(H.hide, 500)
        }
        function aL(b8, ca, cb, cc) {
            if (t) {
                return
            }
            var b9 = b8.element();
            bx(ca, b9);
            ca.addEventListener("mousemove", cb, false);
            if (cc) {
                ca.addEventListener("mouseout", cc, false)
            } else {
                ca.addEventListener("mouseout", b8.hide, false)
            }
            p.style(b9, {
                left: "50%"
            })
        }
        function bC(b9, cc, cd, b8) {
            if (!t) {
                return
            }
            var cb = b9.element();
            bx(cc, cb);
            var ca = new v.touch(cc);
            ca.addEventListener(v.touchEvents.TAP, function () {
                b0(b9, cd, b8)
            })
        }
        function b0(b9, ca, b8) {
            if (b8 === "cc") {
                if (bs.length === 2) {
                    ca = aK
                }
                if (a0) {
                    bQ();
                    b9.hide()
                } else {
                    a0 = setTimeout(function () {
                        b9.hide();
                        a0 = g
                    }, 4000);
                    ca()
                }
                bd.sendEvent(b.JWPLAYER_USER_ACTION)
            } else {
                if (b8 === "hd") {
                    if (aE.length === 2) {
                        ca = b3
                    }
                    if (aB) {
                        b2();
                        b9.hide()
                    } else {
                        aB = setTimeout(function () {
                            b9.hide();
                            aB = g
                        }, 4000);
                        ca()
                    }
                    bd.sendEvent(b.JWPLAYER_USER_ACTION)
                }
            }
        }
        function a1(b9) {
            var b8 = by();
            b8.className = "jwgroup jw" + b9;
            aQ[b9] = b8;
            if (ax[b9]) {
                aG(ax[b9], aQ[b9], b9)
            }
        }
        function aG(cb, b8, cc) {
            if (cb && cb.elements.length > 0) {
                for (var ca = 0; ca < cb.elements.length; ca++) {
                    var b9 = aD(cb.elements[ca], cc);
                    if (b9) {
                        if (cb.elements[ca].name === "volume" && b9.vertical) {
                            aO = new j.overlay(bU + "_volumeOverlay", bT);
                            aO.setContents(b9)
                        } else {
                            bx(b8, b9)
                        }
                    }
                }
            }
        }
        function al() {
            return (x && v.isIE() && bS.jwGetFullscreen())
        }
        function ar() {
            clearTimeout(K);
            K = setTimeout(bd.redraw, 0)
        }
        bd.redraw = function (ca) {
            p.block(bU);
            if (ca && bd.visible) {
                bd.show(true)
            }
            bz();
            var ce = x && v.isMSIE();
            var b9 = bY.active;
            p.style(aI.fullscreen, {
                display: (a4 || b9 || bI || ce) ? "none" : ""
            });
            p.style(aI.volumeH, {
                display: a4 || aT ? "block" : "none"
            });
            var cd = Math.floor(a8.maxwidth);
            if (cd) {
                if (av.parentNode && v.isIE()) {
                    if (!a4
							&& av.parentNode.clientWidth > cd
									+ (Math.floor(a8.margin) * 2)) {
                        p.style(av, {
                            width: cd
                        })
                    } else {
                        p.style(av, {
                            width: ""
                        })
                    }
                }
            }
            if (aO) {
                p.style(aO.element(), {
                    display: !(a4 || aT) ? "block" : "none"
                })
            }
            p.style(aI.hd, {
                display: !a4 && !b9 && be() ? "" : "none"
            });
            p.style(aI.cc, {
                display: !a4 && b4() ? "" : "none"
            });
            aR();
            p.unblock(bU);
            if (bd.visible) {
                var cc = W("capLeft"), cb = W("capRight"), b8;
                if (al()) {
                    b8 = {
                        left: Math.round(v
								.parseDimension(aQ.left.offsetWidth * 62)
								+ cc.width),
                        right: Math.round(v
								.parseDimension(aQ.right.offsetWidth * 86)
								+ cb.width)
                    }
                } else {
                    b8 = {
                        left: Math.round(v.parseDimension(aQ.left.offsetWidth)
								+ cc.width),
                        right: Math.round(v
								.parseDimension(aQ.right.offsetWidth)
								+ cb.width)
                    }
                }
                p.style(aQ.center, b8)
            }
        };
        function ah() {
            if (!aX && bS.jwGetPlaylist().length > 1 && !aw()) {
                p.style(aI.next, a);
                p.style(aI.prev, a)
            } else {
                p.style(aI.next, s);
                p.style(aI.prev, s)
            }
        }
        function P(ca, b9) {
            if (!am) {
                am = v.bounds(av)
            }
            var b8 = true;
            b9.constrainX(am, b8)
        }
        bd.audioMode = function (b8) {
            if (b8 !== g && b8 !== a4) {
                a4 = !!b8;
                ar()
            }
            return a4
        };
        bd.instreamMode = function (b8) {
            if (b8 !== g && b8 !== aT) {
                aT = !!b8;
                p.style(aI.cast, aT ? s : a)
            }
            return aT
        };
        bd.adMode = function (b8) {
            if (z.isBoolean(b8) && b8 !== aX) {
                aX = b8;
                if (b8) {
                    n(bm, aI.elapsed);
                    n(bm, aI.duration)
                } else {
                    l(bm, aI.elapsed);
                    l(bm, aI.duration)
                }
                p.style([aI.cast, aI.elapsed, aI.duration], b8 ? s : a);
                ah()
            }
            return aX
        };
        bd.hideFullscreen = function (b8) {
            if (b8 !== g && b8 !== bI) {
                bI = !!b8;
                ar()
            }
            return bI
        };
        bd.element = function () {
            return av
        };
        bd.margin = function () {
            return parseInt(a8.margin, 10)
        };
        bd.height = function () {
            return bE
        };
        function aN(b8) {
            if (aI.timeSliderBuffer) {
                b8 = Math.min(Math.max(0, b8), 1);
                p.style(aI.timeSliderBuffer, {
                    width: (b8 * 100).toFixed(1) + "%",
                    opacity: b8 > 0 ? 1 : 0
                })
            }
        }
        function bR(cb, cf) {
            if (!aI[cb]) {
                return
            }
            var b9 = aI[cb].vertical, ce = cb + (cb === "time" ? "Slider" : ""), cc = 100
					* Math.min(Math.max(0, cf), 1) + "%", ca = aI[ce
					+ "Progress"], b8 = aI[ce + "Thumb"], cd;
            if (ca) {
                cd = {};
                if (b9) {
                    cd.height = cc;
                    cd.bottom = 0
                } else {
                    cd.width = cc
                }
                if (cb !== "volume") {
                    cd.opacity = (cf > 0 || S) ? 1 : 0
                }
                p.style(ca, cd)
            }
            if (b8) {
                cd = {};
                if (b9) {
                    cd.top = 0
                } else {
                    cd.left = cc
                }
                p.style(b8, cd)
            }
        }
        function ay(b8) {
            bR("volume", b8);
            bR("volumeH", b8)
        }
        function Q(b8) {
            bR("time", b8)
        }
        function W(b9) {
            var b8 = "controlbar", cb, ca = b9;
            if (b9.indexOf("volume") === 0) {
                if (b9.indexOf("volumeH") === 0) {
                    ca = b9.replace("volumeH", "volume")
                } else {
                    b8 = "tooltip"
                }
            }
            cb = bT.getSkinElement(b8, ca);
            if (cb) {
                return cb
            } else {
                return {
                    width: 0,
                    height: 0,
                    src: "",
                    image: g,
                    ready: false
                }
            }
        }
        function bx(b8, b9) {
            b8.appendChild(b9)
        }
        bd.show = function (b8) {
            if (bd.visible && !b8) {
                return
            }
            bd.visible = true;
            var b9 = {
                display: "inline-block"
            };
            p.style(av, b9);
            am = v.bounds(av);
            ab();
            p.block(bU);
            ao();
            ar();
            br();
            T = setTimeout(function () {
                p.style(av, {
                    opacity: 1
                })
            }, 0)
        };
        bd.showTemp = function () {
            if (!this.visible) {
                av.style.opacity = 0;
                av.style.display = "inline-block"
            }
        };
        bd.hideTemp = function () {
            if (!this.visible) {
                av.style.display = "none"
            }
        };
        function br() {
            clearTimeout(T);
            T = -1
        }
        function bQ() {
            clearTimeout(a0);
            a0 = g
        }
        function b2() {
            clearTimeout(aB);
            aB = g
        }
        function ap(b8) {
            if (b8) {
                v.ajax(b8, ba, bk, true)
            } else {
                bh.length = 0
            }
        }
        function ba(b8) {
            var b9 = new m.parsers.srt().parse(b8.responseText, true);
            if (!z.isArray(b9)) {
                return bk("Invalid data")
            }
            bd.addCues(b9)
        }
        bd.addCues = function (b8) {
            v.foreach(b8, function (b9, ca) {
                if (ca.text) {
                    aY(ca.begin, ca.text)
                }
            })
        };
        function bk(b8) {
            v.log("Cues failed to load: " + b8)
        }
        bd.hide = function () {
            if (!bd.visible) {
                return
            }
            if (aT && t && bS.jwGetControls()) {
                return
            }
            bd.visible = false;
            p.style(av, {
                opacity: 0
            });
            br();
            T = setTimeout(function () {
                p.style(av, {
                    display: "none"
                })
            }, y)
        };
        aa()
    };
    (function () {
        var C = "absolute", B = "relative", A = "opacity .25s, background .25s, visibility .25s", D = "span.jwcontrolbar";
        p(D, {
            position: C,
            margin: "auto",
            opacity: 0,
            display: "none"
        });
        p(D + " span", {
            height: "100%"
        });
        v.dragStyle(D + " span", "none");
        p(D + " .jwgroup", {
            display: "inline"
        });
        p(D + " span, " + D + " .jwgroup button," + D + " .jwleft", {
            position: B,
            "float": "left"
        });
        p(D + " .jwright", {
            position: B,
            "float": "right"
        });
        p(D + " .jwcenter", {
            position: C
        });
        p(D + " button", {
            display: "inline-block",
            height: "100%",
            border: "none",
            cursor: "pointer"
        });
        p(D + " .jwcapRight," + D + " .jwtimeSliderCapRight," + D
				+ " .jwvolumeCapRight", {
				    right: 0,
				    position: C
				});
        p(D + " .jwcapBottom", {
            bottom: 0,
            position: C
        });
        p(D + " .jwtime", {
            position: C,
            height: "100%",
            width: "100%",
            left: 0
        });
        p(D + " .jwthumb", {
            position: C,
            height: "100%",
            cursor: "pointer"
        });
        p(D + " .jwrail", {
            position: C,
            cursor: "pointer"
        });
        p(D + " .jwrailgroup", {
            position: C,
            width: "100%"
        });
        p(D + " .jwrailgroup span", {
            position: C
        });
        p(D + " .jwdivider+.jwdivider", {
            display: "none"
        });
        p(D + " .jwtext", {
            padding: "0 5px",
            "text-align": "center"
        });
        p(D + " .jwcast", {
            display: "none"
        });
        p(D + " .jwcast.jwcancast", {
            display: "block"
        });
        p(D + " .jwalt", {
            display: "none",
            overflow: "hidden"
        });
        p(D + " .jwalt", {
            position: C,
            left: 0,
            right: 0,
            "text-align": "left"
        }, true);
        p(D + " .jwoverlaytext", {
            padding: 3,
            "text-align": "center"
        });
        p(D + " .jwvertical *", {
            display: "block"
        });
        p(D + " .jwvertical .jwvolumeProgress", {
            height: "auto"
        }, true);
        p(D + " .jwprogressOverflow", {
            position: C,
            overflow: "hidden"
        });
        w(D, A);
        w(D + " button", A);
        w(D + " .jwtoggling", "none")
    })()
})(window, document);
(function (d) {
    var c = d.html5, a = d.utils, e = d.events, b = e.state, f = d.playlist;
    c.controller = function (m, j) {
        var s = false, o = -1, B = false, L, P = false, h, z = [], n = a
				.extend(this, new e.eventdispatcher(m.id, m.config.debug));
        function Q() {
            m.addEventListener(e.JWPLAYER_MEDIA_BUFFER_FULL, r);
            m.addEventListener(e.JWPLAYER_MEDIA_COMPLETE, function () {
                setTimeout(E, 25)
            });
            m.addEventListener(e.JWPLAYER_MEDIA_ERROR, function (V) {
                var U = a.extend({}, V);
                U.type = e.JWPLAYER_ERROR;
                n.sendEvent(U.type, U)
            })
        }
        function q() {
            return m.getVideo()
        }
        function t(U) {
            if (!s) {
                j.completeSetup();
                n.sendEvent(U.type, U);
                if (d.utils.exists(d.playerReady)) {
                    d.playerReady(U)
                }
                m.addGlobalListener(p);
                j.addGlobalListener(p);
                n.sendEvent(d.events.JWPLAYER_PLAYLIST_LOADED, {
                    playlist: d(m.id).getPlaylist()
                });
                n.sendEvent(d.events.JWPLAYER_PLAYLIST_ITEM, {
                    index: m.item
                });
                N();
                if (m.autostart && !a.isMobile()) {
                    F()
                }
                s = true;
                while (z.length > 0) {
                    var V = z.shift();
                    D(V.method, V.arguments)
                }
            }
        }
        function p(U) {
            n.sendEvent(U.type, U)
        }
        function r() {
            q().play()
        }
        function N(U) {
            y(true);
            switch (a.typeOf(U)) {
                case "string":
                    S(U);
                    break;
                case "object":
                case "array":
                    m.setPlaylist(new d.playlist(U));
                    break;
                case "number":
                    m.setItem(U);
                    break
            }
        }
        function S(V) {
            var U = new f.loader();
            U.addEventListener(e.JWPLAYER_PLAYLIST_LOADED, function (W) {
                N(W.playlist)
            });
            U.addEventListener(e.JWPLAYER_ERROR, function (W) {
                N([]);
                W.message = "Could not load playlist: " + W.message;
                p(W)
            });
            U.load(V)
        }
        function F(V) {
            if (!a.exists(V)) {
                V = true
            } else {
                if (!V) {
                    return i()
                }
            }
            try {
                if (o >= 0) {
                    N(o);
                    o = -1
                }
                if (!B) {
                    B = true;
                    n.sendEvent(e.JWPLAYER_MEDIA_BEFOREPLAY);
                    B = false;
                    if (h) {
                        h = false;
                        L = null;
                        return
                    }
                }
                if (g()) {
                    if (m.playlist.length === 0) {
                        return false
                    }
                    q().load(m.playlist[m.item])
                } else {
                    if (m.state === b.PAUSED) {
                        q().play()
                    }
                }
                return true
            } catch (U) {
                n.sendEvent(e.JWPLAYER_ERROR, U);
                L = null
            }
            return false
        }
        function y(U) {
            L = null;
            try {
                q().stop();
                if (!U) {
                    P = true
                }
                if (B) {
                    h = true
                }
                return true
            } catch (V) {
                n.sendEvent(e.JWPLAYER_ERROR, V)
            }
            return false
        }
        function i(V) {
            L = null;
            if (!a.exists(V)) {
                V = true
            } else {
                if (!V) {
                    return F()
                }
            }
            switch (m.state) {
                case b.PLAYING:
                case b.BUFFERING:
                    try {
                        q().pause()
                    } catch (U) {
                        n.sendEvent(e.JWPLAYER_ERROR, U);
                        return false
                    }
                    break;
                default:
                    if (B) {
                        h = true
                    }
            }
            return true
        }
        function g() {
            return (m.state === b.IDLE)
        }
        function A(U) {
            if (m.state !== b.PLAYING) {
                F(true)
            }
            q().seek(U)
        }
        function w(U) {
            j.fullscreen(U)
        }
        function G(U) {
            a.css.block(m.id + "_next");
            N(U);
            F();
            a.css.unblock(m.id + "_next")
        }
        function H() {
            G(m.item - 1)
        }
        function k() {
            G(m.item + 1)
        }
        function E() {
            if (!g()) {
                return
            } else {
                if (P) {
                    P = false;
                    return
                }
            }
            L = E;
            if (m.repeat) {
                k()
            } else {
                if (m.item === m.playlist.length - 1) {
                    o = 0;
                    y(true);
                    setTimeout(function () {
                        n.sendEvent(e.JWPLAYER_PLAYLIST_COMPLETE)
                    }, 0)
                } else {
                    k()
                }
            }
        }
        function x(U) {
            q().setCurrentQuality(U)
        }
        function R() {
            if (q()) {
                return q().getCurrentQuality()
            }
            return -1
        }
        function O() {
            if (q()) {
                return q().getQualityLevels()
            }
            return null
        }
        function u(U) {
            q().setCurrentAudioTrack(U)
        }
        function I() {
            if (q()) {
                return q().getCurrentAudioTrack()
            }
            return -1
        }
        function J() {
            if (q()) {
                return q().getAudioTracks()
            }
            return null
        }
        function T(U) {
            j.setCurrentCaptions(U)
        }
        function K() {
            return j.getCurrentCaptions()
        }
        function C() {
            return j.getCaptionsList()
        }
        function v() {
            try {
                return m.getVideo().detachMedia()
            } catch (U) {
                a.log("Error calling detachMedia", U)
            }
            return null
        }
        function l(V) {
            try {
                m.getVideo().attachMedia(V)
            } catch (U) {
                a.log("Error calling detachMedia", U);
                return
            }
            if (typeof L === "function") {
                L()
            }
        }
        function M(U) {
            return function () {
                var V = Array.prototype.slice.call(arguments, 0);
                if (s) {
                    D(U, V)
                } else {
                    z.push({
                        method: U,
                        arguments: V
                    })
                }
            }
        }
        function D(V, U) {
            V.apply(this, U)
        }
        this.play = M(F);
        this.pause = M(i);
        this.seek = M(A);
        this.stop = function () {
            if (g()) {
                P = true
            }
            M(y)()
        };
        this.load = M(N);
        this.next = M(k);
        this.prev = M(H);
        this.item = M(G);
        this.setVolume = M(m.setVolume);
        this.setMute = M(m.setMute);
        this.setFullscreen = M(w);
        this.detachMedia = v;
        this.attachMedia = l;
        this.setCurrentQuality = M(x);
        this.getCurrentQuality = R;
        this.getQualityLevels = O;
        this.setCurrentAudioTrack = u;
        this.getCurrentAudioTrack = I;
        this.getAudioTracks = J;
        this.setCurrentCaptions = M(T);
        this.getCurrentCaptions = K;
        this.getCaptionsList = C;
        this.checkBeforePlay = function () {
            return B
        };
        this.playerReady = t;
        Q()
    }
})(jwplayer);
(function (b) {
    var c = '<?xml version="1.0" ?><skin author="JW Player" name="Six" target="6.7" version="3.0"><components><component name="controlbar"><settings><setting name="margin" value="10"/><setting name="maxwidth" value="800"/><setting name="fontsize" value="11"/><setting name="fontweight" value="normal"/><setting name="fontcase" value="normal"/><setting name="fontcolor" value="0xd2d2d2"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAANklEQVR4AWMUFRW/x2RiYqLI9O3bNwam////MzAxAAGcAImBWf9RuRAxnFyEUQgDCLKATLCDAFb+JfgLDLOxAAAAAElFTkSuQmCC"/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAeCAYAAAARgF8NAAAAr0lEQVR4AWNhAAJRUXEFIFUOxNZAzMOABFiAkkpAeh0fH5+IgoKCKBsQoCgA4lJeXl5ReXl5qb9//zJ8+/aNAV2Btbi4uOifP39gYhgKeFiBAEjjUAAFlCn4/5+gCf9pbwVhNwxhKxAm/KdDZA16E778/v37DwsLKwsuBUdfvXopISUlLYpLQc+vX78snz17yigqKibAAgQoCuTlFe4+fPggCKio9OnTJzZAMW5kBQAEFD9DdqDrQQAAAABJRU5ErkJggg=="/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAeCAYAAAARgF8NAAAArklEQVR4Ad2TMQrCQBBF/y5rYykEa++QxibRK3gr0dt4BPUSLiTbKMYUSlgt3IFxyogJsRHFB6/7/A+7jIqiYYZnvLgV56IzcRyPUOMuOOcGVVWNAcxUmk4ZNZRS0Fojz/O9936lkmTCaICIgrV2Z9CCMaYHoK/RQWfAMHcEAP7QxPsNAP/BBDN/+7N+uoEoEIBba0NRHM8A1i8vSUJZni4hhAOAZdPxXsWNuBCzB0E+V9jBVxF8AAAAAElFTkSuQmCC"/><element name="playButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAQAAACcJxZuAAAAtElEQVR4AWOgLRgFnAyiDPwMzMRrkHuwuCSdQZ14Tbpv9v/cf2UN8ZoMHu5/uP/l/h9EazK4sx8Cn+7/RpQmg+v74RBo11eCmgwu7keFd/d/wavJ4PR+THhj/6f9N1ZODWTgxKLhyH7scMvK3iCsGvbtx4Tz1oZn4HTSjv2ocObakAy8nt60HwGnrA3KIBisa/dD4IS1/lDFBJLGiv0r9ves9YUpJpz4Ji72hiomNXnTH4wCAAxXpSnKMgKaAAAAAElFTkSuQmCC"/><element name="playButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAQAAACcJxZuAAAAtElEQVR4AWOgLRgFPAwyDCIMLMRr0Hhws6SLwYR4TTZv/v/8f+UZ8ZocHv5/+P/l/x9Ea3K48x8Cn/7/RpQmh+v/4RBo11eCmhwu/keFd/9/wavJ4fR/THjj/6f/Nx5OzWHgwaLhyH/scMuj3lysGvb9x4Tznod343TSjv+ocObzkG68nt70HwGnPA/qJhisa/9D4ITn/lDFBJLGiv8r/vc894UpJpz4Jt7yhiomNXnTH4wCAHC8wQF60KqlAAAAAElFTkSuQmCC"/><element name="pauseButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAQAAACcJxZuAAAAYElEQVR4AWOgNRgFPAwqDAZAqAJkofPhgBFJg8r/2VDBVIY7GHwoYEG24RmchcnHpoHhDxDj4WNq+I0m+ZvqGn6hSf6iuoafaJI/SbaB7hroHw9f/sBZ6HzSkzdtwSgAADNtJoABsotOAAAAAElFTkSuQmCC"/><element name="pauseButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAQAAACcJxZuAAAAWklEQVR4AWOgNRgFAgwGDA5AaABkofOxAoP/UMBggMGHAxZkG57BWeh87BoY/gAxHj6mht9okr+pruEXmuQvqmv4iSb5k2Qb6K6B/vHw4Q+chc4nPXnTFowCADYgMi8+iyldAAAAAElFTkSuQmCC"/><element name="prevButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAeCAQAAACLBYanAAAAmElEQVR4AWMYMDAKeBgkgBgGmBn4GUQZONEVqfzfz6ACV6Bekv5gMYMcuiKDR/sZDGAKrqz5sf/lfgZdDEW39jPYQxR82/94/y0gZDDAUHR+f3rpjZWf99/efx4CsSk6sj+pbMvKI/vhEJuiXWDrQjNmr921HwyxKVoPd3hAxsS16/evx+JwleUoQeCbMRkRBIQDk/5gFAAAvD5I9xunLg8AAAAASUVORK5CYII="/><element name="prevButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAeCAQAAACLBYanAAAAmUlEQVR4AWMYMDAKBBgUgBgGWBhEGGQYeNAVGfz/z2AAV2BS0vXgJoMGuiKHR/8ZHGAKrjz78f/lfwYbDEW3/jOEQBR8+//4/y0gZHDAUHT+f/qcGw8//7/9/zwEYlN05H/S3C2PjvyHQ2yKdoGtC+2e/XzXfzDEpmg93OEB3ROfr/+/HovDDZajBIFv9+RbDBpEByb9wSgAAHeuVc8xgA8jAAAAAElFTkSuQmCC"/><element name="nextButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAeCAQAAABgMj2kAAAAlUlEQVR4AWOgAxgFnAyiDPwMzHA+D4MEEKMAuQeLS9IZ1OHKVP7vZ1BBVaL7cv+P/VfWwJUZPNrPYICqxODW/lv7H+//BlNmfwtTyfn9EHh7/+f9N1aml57HVHJkPwJuWZlUdgRTya79EDh7bWgGyKJdGEp01+9fv3/i2oAMmHPXYyiRm7zYNwPZ08vBniYcdDQHowAA/MZI93f1cSkAAAAASUVORK5CYII="/><element name="nextButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAeCAQAAABgMj2kAAAAlUlEQVR4AWOgAxgFPAwyDCIMLHC+AIMCEKMAjQc3S7oYTODKDP7/ZzBAVWLz8v+P/1eewZU5PPrP4ICqxOHW/1v/H///BlMWcgtTyfn/EHj7/+f/Nx6mzzmPqeTIfwTc8ihp7hFMJbv+Q+Ds56HdIIt2YSixWf9//f+JzwO6Yc5dj6FEY/It325kTy8He5pw0NEcjAIAWP9Vz4mR7dgAAAAASUVORK5CYII="/><element name="elapsedBackground" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAeCAYAAAAPSW++AAAAD0lEQVQoU2NgGAWjYKQAAALuAAGL6/H9AAAAAElFTkSuQmCC"/><element name="durationBackground" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAeCAYAAAAPSW++AAAAD0lEQVQoU2NgGAWjYKQAAALuAAGL6/H9AAAAAElFTkSuQmCC"/><element name="timeSliderCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII="/><element name="timeSliderCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII="/><element name="timeSliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAALklEQVQI12NgIBmIior/ZxIVFWNgAgI4wcjAxMgI4zIyMkJYYMUM////5yXJCgBxnwX/1bpOMAAAAABJRU5ErkJggg=="/><element name="timeSliderRailCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAnUlEQVR42t3NSwrCMBSF4TsQBHHaaklJKRTalKZJ+lAXoTPBDTlyUYprKo6PN4F2D3rgm/yQG/rfRdHuwp5smsNdCImiKKFUAx/OaSpR1xpNYwKK4/2rLBXa1s1CnIxxsLZbhGhtD+eGBSWJePt7fX9YUFXVVylzdN2IYTgGBGCVZfmDQWuDcTyB/ACsOdz8Kf7jQ/P8C7ZhW/rlfQGDz0pa/ncctQAAAABJRU5ErkJggg=="/><element name="timeSliderRailCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAn0lEQVR42t3MTwqCQBTH8bcIgmirJYoiCOowzh8ds0PULjpRqw5VdCZr/WueMJfwC5/NezOP1lcUHWbv5V0o1LYSVVUjTXP4xYM4KTWYEB2ybFlcSSmLoK4F4vj4JmN6BFpbHs5krUNgzMDDLw3DCQHfTZL0Q85NYH0/Is9LNI240Tie0XUaRVGyJ4AN+Rs//qKUuQPYEgdg7+2WF2voDzqVSl5A2koAAAAAAElFTkSuQmCC"/><element name="timeSliderBuffer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAAKElEQVQI12NgIA/IyMj9Z2JhYWFgAgIGJkZGRhDBwMDEwMAI5TKQDwCHIAF/C8ws/gAAAABJRU5ErkJggg=="/><element name="timeSliderBufferCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAY0lEQVR42uXJyxGAIAxFUfrgI5CgzajdqlWxQffxaeiCzJyZ5MYMNtb6zTl/OhfuP2BZQ4h1mpLEmOWPCMd3pESSM2vE0YiKdBqJuDEXUT0yzydIp7GUZYMKAhr7Y4cLHjPGvMB5JcRMsOVwAAAAAElFTkSuQmCC"/><element name="timeSliderBufferCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAYElEQVQoz+WLyxGAIAwF6YM/CdqMlCtdcRHvMSIw9sCb2ctuIsQaU8pUpfQppT6mdC6QtZ6McYUPUpMhIHkP9EYOuUmASAOOV5OIkQYAWLvc6Mf3HuNOncKkIW8mT7HOHpUUJcPzmTX0AAAAAElFTkSuQmCC"/><element name="timeSliderProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAQAAABHnLxMAAAAH0lEQVQI12NgIAT+/2e6x8D0k4HpOxj9AJM/CWpjAACWQgi68LWdTgAAAABJRU5ErkJggg=="/><element name="timeSliderProgressCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAQAAABOdxw2AAAARUlEQVQYV2NkgANG+jP/+zJkMtgCmf99vi38KPQTJPpq6xsvqIKznxh4ocwjCOaebQyeUOZmX4YFDEJQw9b4QQ2DAfoyAVkTEmC7RwxJAAAAAElFTkSuQmCC"/><element name="timeSliderProgressCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAQAAABOdxw2AAAASklEQVQYV8XLIRKAMAxE0R4QbhrXoQqJxWJxCGZqaKs/m1yi+80TSUqzRmNjCd48jMoqXnhvEU+iTzyImrgT+UFG1exv1q2YY95+oTIxx/xENX8AAAAASUVORK5CYII="/><element name="timeSliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAQAAACP8FaaAAABMElEQVR4AeWSv0rzYBjFfy1NlU5RKC3dCjqZDwRXEapOuuik+BfbNLdUeg86pHSrm1Z3G3w7VAdbB+sNFFKIZ1FCjTjL95wQOOd3IC/vE/6vSZEmQ5Z5KUtGLhWjshYLbHCIKx2wLmcp/cJzOFTb/vtoGk7D8bDtc4GjNP2J/+ENzFv0FBnpORpHA4OnVBWwKFANTD96jKkfBYYqRVFyVC5bCr/pqsWmKDZHd8Okwv2IY1HyuL0wqRCE1EUp/lR4mFAT1XNym/iJ7pBTCpBnp5l4yGaLXVFsVqh1zCzuGGoiNuQoUcG7NjPYU1oSxVKrzDZuw+++BtPe5Oal4eOypdQWRVfNoswa+5xTl87YkysrjW3DpsQyDquSw5KcjXB83TlFeYoU9LbltO7ff5i/Mh+pOuncDFLYKwAAAABJRU5ErkJggg=="/><element name="timeSliderCue" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAAAcUlEQVQ4y2NgGAWjYBTgBaKi4llAfASKs0jWbGNj96S1tf03CIPYJBkCsrW6uu53bm7+fxAGsUFiJBmQlpbxOzMz5z8Ig9hAsaMkecHIyORJUlLq78TElN8gNlAsm9RwyAbZCsSHgDhzNFmNglGAHwAAo/gvURVBmFAAAAAASUVORK5CYII="/><element name="hdButtonOff" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAABf0lEQVR42u2VvUoDQRSFA0awMIVCsv+z/1oE8yOE9MYmtb2P4AspSOyECFZqtU9gbZvK6CNoNZ6zMMuSQpxdEAJbHC737pz59mbmblpSyn9XA22gDXRLod2uMYfWkKwh+uc60LVtO9J1RWXBn4N1oNL3QxkEEcwuzYybOWMh07QJ4xqK/ryuBQ3DWEZRoowdx3FfhAgkI3NVp7IsO5xMpnPDsFae59NHvzaURgWlWpblPEOSkbmqQzfQK2DT8fj0HB0rrz40jlOqgA4Go1m/f3LJWIYC8uQ4nkSX94vF3S5qX8qrDU2SlCqgOMMrAK4Zy1B27nlCIj4i34G+lbcC9ChXuSNeFEbmpZe5RZdv+BU4ZjM8V159aJoe5yp3JIS/eaZcv7dcPhzghc6Qr3DZlLc6FOelRoTn9OvI4DKxw2rQXs/84KzRyLPhTSSQGzIyV2OBdYzIYz4rgKxjn88/Q4fD0QUNNT6BBL5zH50Pfhvahzo1RH+7+WtroA10O6E/bVCWtAEB8p4AAAAASUVORK5CYII="/><element name="hdButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAQAAAB6Dt0qAAABPUlEQVR4Ae2SsUrDUBiF/0EFfYK8Rl4g5BUUHGILRWghUHAQHJzaUcjSgB1EtCApliDoUApSKggZRFSUQsVAawspElz1OunxhwtZcm0Ht9LzQfLByVluLs145lkkjXQyyPwTg3uNv0tFKzuR+MAkIlF2eJyKPhBjRBMZYyBIp1SMEV6nMgIZlIoZQkJuIw7RiMll36XN5e31k0AkramYdiGhQjPsohlSgT13GTy8WXurR0mrmt5BQla+ZJ/mS2SxF8+GT7joLRRvvmWrnAaQULbi1R4rHmXZi/VhAO9laev6R7bKaQcSsv3+Lfw+2ey548B/t/Yz3pVs1dMWJORW4xaqfEzsfEwrO2te5ytpFVPjHJJntPnZ5jc708M9muwS1c/Ra8LHNGrKK6FlnENRxyQOPjcc0v5z/Wc68/wCXWlzVKUYIC4AAAAASUVORK5CYII="/><element name="ccButtonOff" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAABzUlEQVR42u1Uu0oDQRQVTCMopMjmtZvdJPswKCQbC6tYCEqMBDUGrf2NCDF+gmXEyiZWiTb+gMTGxtrGwmh8IOKjUoLjueNGfCBk10rYC4eZOey5Z+7M3O1zww033Og5BCGQA9oAcw6uz9kxbYfDIpMk2TGg58Z2TJmixFg0GueIRBQWDIZ5BX5/kIli5AcfCIS6PIH0nLdlGoupLB7XmCxHyegymTSXa7UdoVBYHBVFqQEDMjozzfRCvd7w5fNzKfD74ElHevumEHKEQiJD4nmYz4JvwWirWt30YiO36fTYNKotgj8Hv1GprPvAP1obtm+qqjqBhC/l8toAkh18uqs7rK8ZY/0Yj8AT90o80LG09k01TQe48Bnw4O6asqzw5DjGXVR2Qt9iPLb4Dh07NnGvqhq0jkwNQvehTCYSI0tIeIWqtq1jfAA/bhiJFcxvcPzVUmlVwPwJVZLWvqmuD3MgGYlbGHPN5qE3m52JYU0PifhTGEwRn8lMaFjvYVNdrXNT7BjGX1tGkvgL/dYyxMv0vTNTahH02ocY1cBEpTbgeL8z41eeNKSn6+jZNJUyiyT4y28Q+gvK07MpWsEDDAJDzsH1nj433HDjX8YbqHFYmhICTLsAAAAASUVORK5CYII="/><element name="ccButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAQAAAB6Dt0qAAABWElEQVR4AWMY5mAUsDJIMBgy2DE44IR2QHkJoDoMINHQ/eTbl//44JNvDd1AzRjA8N63p/+f4IVP/9/7BrQZA9g9/H+fIHz4H+hsDOBw6z8EnvqZsJ6vznDCkke3/h/9Hr2ap9Z08oqnMFkGByxaL/+HwMiVafNufFl+hWvmiR+BC/IX3/yy4Bz/nJN/wbLYtZ75D4In/3GV7n56/v+1/zd/H/rGkHPgJYh94/fp/2B57FqP/AfBg/84SlY/O/L/8P+JLze/Z8je8PrI/0P/Jrza+Rcsj13r3v8guO9/+LKEhZu+9lzmn7zrl++c9BWbv7WfE5iy/S9YHrvWbf8hcP+P0FVsVSo9y57s+L/vm/9ytiqtvhVANlgWq1a79f8hcDPQR9eBAbIHyN7y/yyQfQnEhkCskWM4/9uq/4TgfKxJQiK6e/a3pf/xwZlfo4AJkZLkP6zBKAAAGMt/2TouFxQAAAAASUVORK5CYII="/><element name="muteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAQAAACY0sZTAAABZ0lEQVR4AWMYjGAUMDEwMzCSpoUxju+kDQMXAW1AaRYGdiCGsFjchd/OWmELFMGrhd1a4UUTAy+QzXLSdKMhA1+Z/tuF0qIMTLjdz9tp+27ly/0M4kBbWGdqv1/gJcMgdLz6YAA2u9gYhBgkGGR2pH3ZfWf/1f0Mshdsk8UZBDYlXMthEJhqfbuVgQ9Tk9D//SD4dv/F/eeBkEHuaNjjegYBT/k78xiEOcWuLWIQxtQkcWI/MmSQYhC/shioUPjUAhB5cgFWTQf3I0MGaQ6JwyBNIofBmsAkpvN27UeGDPI349dXMghEKu2byyAsKLZ/IYMQzoBoTNm4e8v+LcCA2GBoKsQgcDFjcRqDwBr7dU0MfLiDnCfaavHKdaAgZ2ZgXWd4cZ6eJIPQ5YYZXgzseCNXQ35GPSRyt+lVaTLwTTA9NJdTmIGJ2GTEzMCSKPZifoklpj14jTDj6jJj4CI5nYOzxkCCUQAAMVp+znQAUSsAAAAASUVORK5CYII="/><element name="muteButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAQAAACY0sZTAAABfUlEQVR4AWMYjGAUsDJwMLCQpoXRTnZZIoM0AzMBZQzcDCIMXEAWC5Dk0tZ6fK0uFyiCBzAziCh5Xd7PoAJkc64I7QxhUPWLf/yQ3xjoTByAjUExrvzB+5f/GewYOBn4cgOf3ddxYNDftH1OCza7BBgMGBwYfCas/fjnzv+r/xn8NiXYGTJoTZ25ZymDTn7W8UMMapiaDP6Dwdv/F/+fB0KGgJXtF3YyaGp7XLrLYMhqce4hgyGmJocT/5EhgxuD7ZknDEYMJgcfMBgzGB8AkZiaDv5HhgzuLPa7nwBNN90N1gQmMZ236z8yZAjcN3H+JgZNM+8tQOdxWm17yGCAMyBSV6//s+X/lv8Mvv2BChoM2hsXd89n0GnKn7+PQRV3kCvYlsx6v+4/gy0DOwNvU8SJO1LWDAb791bUMgjji1xhMc/u3QzKoMid6hPtxaCakrbzDqsBAytxyYgZmFQ5bfXu3Q1Lx7QHrxHykgWRDFJAA0gCLAzsQC0DCUYBAC3AlmbNhvr6AAAAAElFTkSuQmCC"/><element name="unmuteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAQAAACY0sZTAAAAiklEQVR4AWMYWWAUMDKwMLADMUla2K0VnjUx8BKvhYmBt83m3cp3+xnEiFHOxiDEIMEgsz3l6+5H++/sB7KJAEL/94Pgu/1X918GQuI0SZzcjwSJ1XRgPxIk1nnb9iNBoCYSAqI6ZdXOtfvXAjWREuQ84VZzVi4DBjmJkassN7GegZe8ZDQSwSgAAJ/LQok1XVtuAAAAAElFTkSuQmCC"/><element name="unmuteButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAQAAACY0sZTAAAAjUlEQVR4AWMYWWAUMDJwM4gwcJGihZlBRMnr0l4GZeK1sDEoxpQ+eP/uP4MVMcoFGAwYHBh8+ld/+vPo/53/QDYRwOA/GLz7f/X/ZSAkTpPDyf9IkFhNB/4jQWKdt+0/EgRqIiEgElct/7P2/1qgJlKCXMG6eNL7Zf8ZLEmLXGFhj5bdDMrkJaORCEYBAOZEUGMjl+JZAAAAAElFTkSuQmCC"/><element name="castButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAABuUlEQVR42mNggAA2IBYCYgkKsBDUHDAQevr06X5KMdRQMJDYvXs3SECLTNdpQfVLwA3cuXMnigCJAEO/xPbt2ykyEF2/8NatW0ECwuQaCNUPNpAZiAVqamqsgTQXuQZu2rQJYqCXl5cQ0LkpjY2Nbuzs7BJQQ5lINXD9+vUQA8PDwyWPHz++4/Lly/uvXr26btmyZUkCAgKiQElWIGYk1sC1a9fCvczNwcEhHxER4T59+vTuEydO7APiqS4uLkpQQ4kycNWqVRADQ0JCxIAu7JgwYUI0CwuLWlpaWtDmzZu3AsVmqaurSwIVsRBj4IoVKyAGurm5iQKdO/fUqVP7Tp48Odfe3t4wNjbWG2jo3o0bN5YAFfES4XUJYFDBvQyKBBmgIX5r1qzZBHTZAh4eHrWOjo6GPXv27ARaqApVI4wvpyxZsgRiIDDsZM6cOTPT19fXLDIy0hvo2n3z5s1L8fT0tF66dOm+uXPnxldXV+vdunVrPz68aNEiSF4OCgqSBUU50GXTgQLSU6dOnbFt27YpIFfPnj17JdCCalA6JeBClNKGHYgFgZgfiDmhYcYL9SaI5iEyYsAAACZV+irLroZ6AAAAAElFTkSuQmCC"/><element name="castButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAABuUlEQVR42mNggAAOIJYAYgUKsATUHDCQePr06X9KMdRQMFDYvXs3SMCCTNdZQPUrwA3cuXMnigCJAEO/wvbt2ykyEF2/1NatW0ECUuQaCNUPNpAFiEVramr8gTQfuQZu2rQJYqCXl5cE0LltjY2Ncezs7CAbeIGYmVQD169fDzEwPDxc8fjx498uX778/+rVqy+WLVvWLCAgIAOUZAdiRmINXLt2LdzL/BwcHFoRERHx06dP33nixIl/QHzcxcVFF2ooUQauWrUKYmBISIgs0IXbJkyYUMnCwmKclpaWt3nz5k9AsXPq6upKQEWsxBi4YsUKiIFubm4yQOdeOnXq1L+TJ09etLe3d4yNjU0BGvpn48aNs4GKBInwugIwqOBeBsWsGtCQjDVr1rwFuuwqDw+PcUdHx+o9e/Z8B1poBFUjiS+nLFmyBGIgMOxUzwCBr6+vR2RkZArQtf/mzZvX6unp6b906dJ/c+fOra+urra7devWf3x40aJFkLwcFBSkDopyoMtOAQVUpk6denrbtm3HQK6ePXv2I6AFS4BsMQIuRCltOIFYHIhFgJgHiIWgmBdKCxAZMWAAABFDD0iNkbKIAAAAAElFTkSuQmCC"/><element name="castingButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAB60lEQVR42mNggAAOIJYAYgUKsATUHDCQ+E8FADUUDBRevXoFEnAAYgsoTSwGq4fqV4Ab+OLFC5CABZkus4DqRxj49OlTsAtBNKkYpg/ZQKmHDx+CBCxBNKkYZCCUBhvIDMQis2fP9gfSKjdv3vx07969/6RgkIFQGmwg35kzZ+omTpwYxcPDo6mmpmaybNmy6devX/9569at/8RgkIFQGmyg8Nu3b39++/bt/9evX1/u3r27lYuLSy87Ozvy1KlTz65du/afEAYZCKXBBvKKiIhol5WVpe3cuXMX0PB/z58/P+3u7m4dFxfnD3T9x0uXLv3Hh0EGQmmwgYJPnjzZvGTJkkpOTk6TysrKbKB3P718+fKKvLy8QUNDQ965c+f+48MgA6E02EChy5cv33z37t3/N2/eXA4ODnYrKipKuXr16s8LFy4sAsprAl1+6vTp0/9xYVA6hNIQLwOxWnFxcd7Zs2ffvn79+q6cnJz5ggULFj148OBXUFCQNVBeCYjN8eWU48ePww0Uef/+/en09HRfYESkAJ3+Z//+/f1OTk7uR44cAbG7qqurCeYgoFp4XhYDBSgwL14FpcNNmzYdunHjxkWQq4FevXb+/PmNQLY4EEsSW9pwQDWIAjEPKJJA4QoNCiEon5WBSAAAryiVoYy0dtoAAAAASUVORK5CYII="/><element name="castingButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAB60lEQVR42mNggAAOIJYAYgUKsATUHDCQ+E8FADUUDBRevXoFEnAAYgsoTSwGq4fqV4Ab+OLFC5CABZkus4DqRxj49OlTsAtBNKkYpg/ZQKmHDx+CBCxBNKkYZCCUBhvIDMQis2fP9gfSKjdv3vx07969/6RgkIFQGmwg35kzZ+omTpwYxcPDo6mmpmaybNmy6devX/9569at/8RgkIFQGmyg8Nu3b39++/bt/9evX1/u3r27lYuLSy87Ozvy1KlTz65du/afEAYZCKXBBvKKiIhol5WVpe3cuXMX0PB/z58/P+3u7m4dFxfnD3T9x0uXLv3Hh0EGQmmwgYJPnjzZvGTJkkpOTk6TysrKbKB3P718+fKKvLy8QUNDQ965c+f+48MgA6E02EChy5cv33z37t3/N2/eXA4ODnYrKipKuXr16s8LFy4sAsprAl1+6vTp0/9xYVA6hNIQLwOxWnFxcd7Zs2ffvn79+q6cnJz5ggULFj148OBXUFCQNVBeCYjN8eWU48ePww0Uef/+/en09HRfYESkAJ3+Z//+/f1OTk7uR44cAbG7qqurCeYgoFp4XhYDBSgwL14FpcNNmzYdunHjxkWQq4FevXb+/PmNQLY4EEsSW9pwQDWIAjEPKJJA4QoNCiEon5WBSAAAryiVoYy0dtoAAAAASUVORK5CYII="/><element name="trackButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAYAAAA/xX6fAAAB3ElEQVR42u2VP0sCYRzHLwiFUm4oIcUGz4ZMsRqkhhan2hzyBWSvwMXhAsGlFxA46y2JeJpDIeEfDnV1UhdX/+Du5mS/LzyC2F09KDjdAx94nuf3fZ6PPj53CovFQtglgik0habwX+FasxDHhJfwM7xsDjUbcUZc6YB5G69wj7C7XK5AqVSSR6NRfj6f1wD6xWLxBTXKXNMazQhIeYX2SCQSnk6naqfTySYSiZgkSXcAfZpTUAuFQrHxeKwZwSu04NNPJhM1k8m80thHiMQ+A30fasPh8EMUxQiNw0SUeFrhgTjhER6pqio3Gg2FySzC74Y5H2WyyFL/Zpsj9Xa73Xw8Hn9m38aoiZSJIUv9+16vp63DKwz0+/2G2+1+pL6HONCRYc6DDLLUv2U3M7rJkQaazWY9l8u9z2azCo0lHaGEGjKtVquONezbbHSkF7TR52Aw0NrtNhYFdYRB1JCh7BfWYHP6TbVVeIX+arVaq1QqGmBHtd6ulnVk2Qth/SXA/eCf04NdK5fLGjASLuvIYo3RzeIROlOpVLpQKGiAxpc6+1wu68lk8g2XYxuh1eFwBGRZTiuK8m10aVBDhrI4Tus2QoFt4CROiUOdfQ5ZzfmXjEto/gGbQlO4c+EPA9e3TyseGL0AAAAASUVORK5CYII="/><element name="trackButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAYAAAA/xX6fAAAB3ElEQVR42u2VvUsCYRzHj4awhq5AF3Mol5bSFjMSstYabGusuaVbHBwEsf9DpMDBF4QGB8FBhSYnvQahIfTEtsIg6AWevt94hLCzDoWm+8EHfi/fe74+j/eiCCGU/0SxDW1D2/BPw5FwgGXgBzsSv+xxtgg2wZ4J7C9aNZwBS263O1QoFC673e79qwzm+Xz+ijNo9sUvQVOrhkuRSOS43+8bjUZDj0ajSa/Xe0SYo3fLWSAQSBqGIcZh1dDBX9/r9YxUKnWNOgicYFbCPMhZp9N5UFX1DPUx0EDiG6dgxYqhO5fLXVYqlVtp5lB+BntBaHRqkR9Mc6T+ZrN5r2nahdzNuHBCk6QW+Umr1RKjWDUM6br+4fF4zpGvgwUTM/bWqaEW+aG8M7VJjjRUrVbfM5nM3WAweEa9YWK4wRk1tVrtndfI3Ux0pNtY6LHdbot6vc7GronhLmfUQPvEa7g4/lPxHauGO+Vy+a1UKgkij2o09oZzauULYfQlYPnB38KD/VosFgUZZzicU4s6MO7OsmK4mkgkbrLZrCCowybrhIfzeDxe5c0xjeG8y+UKxWKxm3Q6/YLaZ7KOjzNqoOVxzk1j+GXKnYI1oJqso8rZqtQqExvaH2Db0Db8d8NP8a/SZovcDd8AAAAASUVORK5CYII="/><element name="fullscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAQAAACC7ibdAAAA5ElEQVR4Ae3KsUrzYBhH8RPIFAJ5O3/ig5COgVyHW7N09x7aXSrESafuHeLi0A6iGEX+Y3edLMqnpe7egfbFMZCMXfo762GH9gIijIx8W0rcMQ9tU/3oL9KOGXdYLOuNfOS0CrGLyVr/fZ1zMht9a6VXqV6JjFa9efmiZ43PDoqnCqMh8BGS4IjpT8vTMYY7NiIaooHhsNnovqRPTA9HSOCjwT6ro+Jy8qV3PZT0aJUt9VavdadbnY9IaJUv9KiF5jqZYIQd87V80/rfAEdAq/RKvht9VEPrmmNS8m0ZRkTAzuz9AlNJVl+tEWchAAAAAElFTkSuQmCC"/><element name="fullscreenButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAQAAACC7ibdAAAA5klEQVR4Ae3MIUzDUACE4b8VlU1FaQWEBPlQna+oxqHm0dTicShQcyWZwSBWEgohEIKcB8UKAZbhcZXHmsw1eZUz+357OdZow8HHkJItSwiwcodmUWuFpO852s2nzUJtZFh5mPNyrq+23nE4Lv4007templIsYon1ZtedXKzkz/XGDocXBw8QiICBqPq9JJ9ogODT4d/aIgw4+KhYkBAzBbe6qLD/NR7+UX5q089VsRYpVN9NHPd605nBSFWWaknlZroqMTg9Yyv1TZqto+JcLBKrtR2q+96aHCxCkjIlqUYfBzWZuMfAHJlDLF+xFEAAAAASUVORK5CYII="/><element name="normalscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAQAAACC7ibdAAAA50lEQVR4Ae3KsU6DUBhA4QMNAtsNFcJLyKBx8mXYmNxkculDuJG4OOOmcbr/QNS1xKaJqxJjTJpUk84KuHW4d+nY76yHvV1zxlx8AiZYeJeHBKgmX14wte1qXZ1l98VG/8iyJMQo+ZJVvdGddPohx8co7eRThvWmQOFa5ncZWtSnRwQ4GEVvMvQh62oW2+YDItK+BIW3PTt4KJJxiPrVyJnF39Wv/EdkmQlOsqd6IUOkGLmou+JVv0ifdfabfKVbaXVTt0KCUfhczmWur4rj7LFCYTRhelte5yiC8xgPbHuIj4sztrdbfxJjV3K8mZ7yAAAAAElFTkSuQmCC"/><element name="normalscreenButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAQAAACC7ibdAAAA7ElEQVR4Ae3Sr07DUBzF8e+daKaaiaYNAoH8uc43pK+AmsHimETxDAQBQZVkCQhAUFMBewkUCG4W/ib4haTykCYzmFszuc+xX3lYtw3HAEdEQsqQHvGekWKz6qFh3Jfbl9+Znta/WmrekBFU/GjRLvWuN11UJASVXh/yetVxjRH1xM/qNm+3D0lxBOVP6vaiTz8xBgSNyCkpKTBiHP84YoyiC8gZETSY2LfXCjlBjnRretk26kZJUISd1I+679YbJ7NqoTvd6Ly9FQVB2ay51pX262x65jGChoyPmoMKI901YujLMxKi1TnXa+MPEjlkhvYbWGMAAAAASUVORK5CYII="/><element name="volumeCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII="/><element name="volumeCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII="/><element name="volumeRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAeCAYAAABaKIzgAAAASElEQVRYCe3BsQ3AMAwDQRIW4Cqlkf031AZKVkg6An8nAQCAH3zOPQpQe28lqJcS1FpLCcpWhJKsBGVbCaq7lcAzcwkAAHz0AE0SB2llBfTtAAAAAElFTkSuQmCC"/><element name="volumeRailCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAYAAAALvL+DAAAAeElEQVR42tWKQQqDMBBFB3cFt9oQQ0wniW51b5f2ti30ZLX1AN+ZQA/hhwfz/zw6eZrmmoWn8NUyCh9jLJzzoLY1L2sd+v6GEBikmh7MCTHmYvyYI1LKBeo69/Y+SBkKtCz3SaztPxKAal0fs5ry2Emjo3ARajpNDtqHL/b2HUUVAAAAAElFTkSuQmCC"/><element name="volumeRailCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAYAAAALvL+DAAAAeUlEQVQYV9WKOw7CMBBEV3RItAmWYzlmbUMLfSjDbUHiZASFfpj1LTLSW+18RLarrjt+yZPUFoQQ4ZwHgw+5SEqKcTzB+4C+dy/JuUK1wAouVimlwlDNtvgxOMOIMWEYwrsFZtgu03S/Cp/Vmnl+3ADshOdA9s1sSn8goC/6ib5oHgAAAABJRU5ErkJggg=="/><element name="volumeProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAeCAQAAADwIURrAAAALElEQVRIx2NgGAWjYBSMRMD4/z/1DWW5TQOXsnwdMoZ+GyouHQWjYBSMTAAAnO8GxIQ7mhMAAAAASUVORK5CYII="/><element name="volumeProgressCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAQAAAChtXcIAAAANUlEQVQY02NkgAJGOjH+9zEkAxm/JrzJ/wYSufTxLx9Y6shHBghj10SGPKji9RMYkhjp6EIAcaIN1SJ2FnYAAAAASUVORK5CYII="/><element name="volumeProgressCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAQAAAChtXcIAAAANklEQVQYV2NgoCP4//F/H5hx5/+z/78mABnn/5//f+kzkHHkPxCCGLv+A+FEIGP9p/UgFXQFAHkZGwN2fDIsAAAAAElFTkSuQmCC"/></elements></component><component name="display"><settings><setting name="bufferrotation" value="90"/><setting name="bufferinterval" value="125"/><setting name="fontcase" value="normal"/><setting name="fontcolor" value="0xffffff"/><setting name="fontsize" value="11"/><setting name="fontweight" value="normal"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAA0CAYAAACQGfi1AAAAYklEQVR4Ae2VwQ2AMAwD/cgKVRbJuAyH+mOBfMMQyBKCuwWsxoaLtfKQkaiqtAZ0t5yEzMSMOUCa15+IAGZqgO+AFTFTSmZFnyyZv+kfjEYH+ABlIhz7Cx4n4GROtPd5ycgNe0AqrojABCoAAAAASUVORK5CYII="/><element name="backgroundOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAA0CAYAAACQGfi1AAAAY0lEQVR4Ae2VsQ2AQAwDXWSFF91Pkf1rxkAZIm0YAllCcF7Aiu3/i7WOU0ZFZm6rQXfLaiCzYkbuC+b1EWHATM3iHbAiZkrJrIiSP/ObQjQ6gAcg8w/AsV/w2AEmE1HVVTLqBmJaKtrlUvCnAAAAAElFTkSuQmCC"/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA4UlEQVR4Ae2XwUoDMRRFT17GTscIMoWOqwF1WUSFIv6Autf/X5TuxG6FBkOeHfAHpk+GLnI+4HBzLzyI44/l8uoBeAVugJqRuIMA4L1t24+u685DCGci4hhJBdwPkr7vL3POLsaIqnKM6G2xaJuUksPAILquqtlMFayiuYhzYDMJIygi+2qonloi0CkTldXK/NOXXVYrZRs6UgyUjsrxL6d28sP2b4n0xJ62z1nVHbCutolx/4MRH8LFt6o+Nc28tqTyq9Xd5273RUrpVsSL915gvNCt188MbLebR+Dl2K/oL+WmRveI4jXNAAAAAElFTkSuQmCC"/><element name="capLeftOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA5ElEQVR4Ae2XMU7DQBBF346sIDAUDoqprNBCm4Im3IPcAE7EEbgId6BF6akQjheZGTYSF7DXQi7mSdM+zf4vjbSBP1arqy2wA26BUwZSJAHAY1VVT3VdX5RluZDEYBGwPUqaprlUVYkxYmaMEe2Wy+q873shgwK4KYrFiRnkis5EgkCeScjHRQNaw2xuG4HNYiNvzeufPmxvzcPOz8jIwDPy4++n9t8P22Qb2cye1qqahhAkt7W3GLvvKep/+Uyo/igYY0fW6+vXtv16/kgcDl2nagkYOmGzuePIfv9+DzyM/Yr+AujSfWZZzzLnAAAAAElFTkSuQmCC"/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA20lEQVR4Ae2XQUrEQBBFX4e29QJDVgFv4Cb7wSt4Ps8wLtw5B3A97mfmAFlkkbaZMpAynkBiBRGpd4Ci6j/4UGGzqR9ZjgBn4AV4A4ht29YsZJomzTnXXdfd9X2/A55iKYWlhJmU0nXTNAl4mIedwnZ7/4wBkcvH8Xh6jaqYiDFdAbcRFAtVFQJwU7ESPuh7zPrX3wj0T2zk1lz/+mG7NQ/bnpFixDPy8veq/dViW20j/W+drTOAmK2JXEbgbDrt628bhqEA+x+dpjMiMuY8lFLed8DB+orugQPAJ8i7bEsKl1PuAAAAAElFTkSuQmCC"/><element name="capRightOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA2UlEQVR4Ae3XwUkEMRTG8X8eIaLgwYXF0xRgKYsVWIIVrR1sI3uwANkSvMxhDhOzRoZ5pgOZSZiDvF8Bjy/vgwdx+/3jO8tdgQtwAs4A7nB4/mShuYgx5r7v4zAMR+DNp5RYyjknIYTbrutugNcy7ENYQVUpoZimSXa7h3vgxatSxfsQgCcPdZNEnAB3QiM26G/V9bdPBLp9ImvN6t9y2daaLbtiR0ol25Edfzu1mx62Zon0v91sVZ2Bq1Ap5+8f4FL1tLkYC+C06mla5CLGcUzp6wicm31FfwHzmG90m7lXIAAAAABJRU5ErkJggg=="/><element name="bufferIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAABGElEQVR4Ae3Rr0pEQRSA8Zl1b1uDQTAt4j8QES1qURZvEf8lfYJVsfoAisYFq9mgyfUFVptgMtk3CAaD6DN8HoYbFhk9w9x0Yc6XDsv8LrNj0vgnTZo05LzzyR7m/wxafQC+sDHQENkv6DsG2uFV2i62nDc+2C82SybVwqAX+tIzxlOdzBUEPTnosTy0wgM9lryQpS7pVwutetAiN3RZU481mJYaf0PX9KR7rALNMCtNaVC3PLTALXesYpSGlatFVDFonnNOmfQeGKHFOqNhUIcr6cwLtdiVNkIgy6WDLrxQ7qBNrApJy0J1mCu2CY6k4qKMCbJFM/TPHvzeASfS8cBvtbhXazvosPzzN2lL4/GQXoISlKAqQz+eXnU2Tp6C2QAAAABJRU5ErkJggg=="/><element name="bufferIconOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAABGElEQVR4Ae3Rr0pEQRSA8Zl1b1uDQTAt4j8QES1qURZvEf8lfYJVsfoAisYFq9mgyfUFVptgMtk3CAaD6DN8HoYbFhk9w9x0Yc6XDsv8LrNj0vgnTZo05LzzyR7m/wxafQC+sDHQENkv6DsG2uFV2i62nDc+2C82SybVwqAX+tIzxlOdzBUEPTnosTy0wgM9lryQpS7pVwutetAiN3RZU481mJYaf0PX9KR7rALNMCtNaVC3PLTALXesYpSGlatFVDFonnNOmfQeGKHFOqNhUIcr6cwLtdiVNkIgy6WDLrxQ7qBNrApJy0J1mCu2CY6k4qKMCbJFM/TPHvzeASfS8cBvtbhXazvosPzzN2lL4/GQXoISlKAqQz+eXnU2Tp6C2QAAAABJRU5ErkJggg=="/><element name="errorIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAAB3ElEQVR42u2Tv0sCYRzGv5WFJIVgkEVLSy1ObWGDUE0OgdRYtBZC/QENFv0DDTW0FEYJGkgEBUZCEFxYlJpnEMSpUxpBNAkiT++rlb+uvNOpuOcz3Pt+j3vgeN8PkRYtWv5Z2qmb0d58kXl7ZXuFzM3W6E3jybfUW+8E6ZupaaXB3ZNnPGPnlAbZruF02ebTuRRSSOds89TVaE0bWYJiEhIjiaBIFjZpKKaF1TSePknDuUamRmo6dKPRzCNKRDO6UepQW9NCAxseCXHGlHvKzZ8SNjw0wN6oSqfFIWXvwSE72YsrKWtxkEHdsQ/5hRjuCpCNbMVVDEdXNKzmGhhnlqT8DYrwoq+1lJ9ZIqNyu0aERAhXn/Cir3UIQoJGlJpndm2KuPyGF5V2IlxbyszTmybi7xcowYvK9/H3/sn65hXsEnBeBi8q3wuKzGN2PeQCKIcff+Xkoa55zK4zMYCTCubcs+7KSQBn3DzdL3Ytrt3iuIpXRvXsFs516vnFruuMH8oI/Whewa4gDmsY8435aqfBH81jdoWzXtTi8Dm8cvOwrHkFu/zwyJDBi+yc/aCMecyuUH4f6rjOTy9Xm9cXiRxgTyX7iESor7LIQENk5XdYFVb2lYG0aNHyF/MB+x5LQiE6gt8AAAAASUVORK5CYII="/><element name="errorIconOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAAB3ElEQVR42u2Tv0sCYRzGv5WFJIVgkEVLSy1ObWGDUE0OgdRYtBZC/QENFv0DDTW0FEYJGkgEBUZCEFxYlJpnEMSpUxpBNAkiT++rlb+uvNOpuOcz3Pt+j3vgeN8PkRYtWv5Z2qmb0d58kXl7ZXuFzM3W6E3jybfUW+8E6ZupaaXB3ZNnPGPnlAbZruF02ebTuRRSSOds89TVaE0bWYJiEhIjiaBIFjZpKKaF1TSePknDuUamRmo6dKPRzCNKRDO6UepQW9NCAxseCXHGlHvKzZ8SNjw0wN6oSqfFIWXvwSE72YsrKWtxkEHdsQ/5hRjuCpCNbMVVDEdXNKzmGhhnlqT8DYrwoq+1lJ9ZIqNyu0aERAhXn/Cir3UIQoJGlJpndm2KuPyGF5V2IlxbyszTmybi7xcowYvK9/H3/sn65hXsEnBeBi8q3wuKzGN2PeQCKIcff+Xkoa55zK4zMYCTCubcs+7KSQBn3DzdL3Ytrt3iuIpXRvXsFs516vnFruuMH8oI/Whewa4gDmsY8435aqfBH81jdoWzXtTi8Dm8cvOwrHkFu/zwyJDBi+yc/aCMecyuUH4f6rjOTy9Xm9cXiRxgTyX7iESor7LIQENk5XdYFVb2lYG0aNHyF/MB+x5LQiE6gt8AAAAASUVORK5CYII="/><element name="playIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAABHUlEQVR4Ae2Vu0oDQRRAB2xSWVmmtQncLzFREUUsnW/wJ0SCWgQV8TUQBBEsjlgIFoJFCsFCCT5QgwZFtPGtncUWIcTZnd2pAnNOf2Bn5t5VgUCge8mpPtWrevxD+cbi1KTq948VXvjlbMM/Jk2aPPPjHZM7Ip88Y3JLy0e+M8fkmnYfMsbkkk7v+Uodkzr/2+AzVUxOsXvDh3NMToj3inenmByT7AVviTGp4WadV85XK0WVs4SOcHd3rVyyhg5xc91M6NhPOyDZFTOuEw97n3iXzZh2uv497C6YUe38ILFQMSM61Yjs0Om8Gdaph3abdmfNkM60RrZoWTaDOvNi2yRyxpQsETcKVapMm6JHJCI/tzTgEfH4QXYxgUDgD+1pwmmFlV3oAAAAAElFTkSuQmCC"/><element name="playIconOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAABHklEQVR4Ae2VvUpDQRBGt7BMaekD5AEsU0zvL6KI76CdL6FDUItgIYJNEERIoVgIFoKFhWChBBNRYwwZRBv/tfostgghuXf37lSBPac/cHd35ppIJDK45MyIGTZDRk2+UVteNaP6WOEVf7hu62PUQgsv+FXHqAnrszJGD+go+AmO0R26bQfGqI5en/CdOUZV9LeBr0wxukKy9/j0jtEl0r3Fh1eMLuC2hndnjM7hZxVvuHksLZpcQugM/h42i0uJoVP4uSMLnPppJ3C7LfPsPOxjpLslc+x1/UdIdlNm2ftBHqC/JZnhTCNSQa8bMs2Zh3Yf3a7JFAetkT10LMokBy+2XVhZJgIjlkIZZazIuCJiya/Xx9QR/Q8yEokMFv9/Ax7UXjl24wAAAABJRU5ErkJggg=="/><element name="replayIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAADOElEQVR4Ae2VUWhbVRjH/0nqdk0m0eTGITVZNsmiZCLTlooNPoWlbk27lzmGSIeyh7YgFSYaGO2yDZk4GMi65kG9d6kkbfCuyf1bqZmmlsYxCK51KwxkrpM4qBRla18cIngvw0qgN7ea1/z+L4fDn4/vO+c730G9NGjQQIALj8CKumn+afjIQWyDHRbUxTO/8w/Ojux9Bc0Q6gn27B3eoRZM5Zm2l7EVm/5bMAsEiPAjiFiFun7hXa5MjJ7Y1gI3mjYaxA5vZzSdmJeWlfvqz/xHFd7jr5+fP+rYgU0wpQlibE8peV+9yyVWeJuLVapwleU4tsCEh9B8sn8lt8SbBprJvHUEXrOMmuCVj61o9h81fXEhEY/GHAf09QOVlaF3N4fgNDsjCzxnBn7jDU3T2TfexE64IeC5G9Q1lz/7/vY2iBs5aHtndCm/wAXmUtvb8ShsD/pogdf46bm2CJ7Qr16THY87t0Iwzsf77ch1/sBCdmcYjrVuaZ4813UAPjwMC3SXsztS+ujqWTxp1E9CV8ct9Sq/56EeOGGpemtb1t6a9bXdq7nbvKV2dRjlJKaOl1lm+gICsME47x1jsu5LHYeIdfEXpCu8wsE43KiFezCu+woS/FiX4KxSYon7YhBQC2FfTPfNKghiXUIldYYzdLfChlpYxRbd952KkEGgr9Uii3z6JbNAnhbd941hoOBF5RIv8WC3SWmbuzt130XD0vyfSFOc4gfvwIVauD48qvs+Njxs8URikpOckmtevw2Br2Tdd9Lw+oVIR15VeZl91Q1Z3UXOvp7LVJlXI4YNaYHvdHKCE7ye3fXvE6l2OHaFr43rntNJ+IxHrj0czeQVFjifCrbDCRuqi3IG2+dTBSrM5MNR2GuOkcMD48xymotZrcAAXBBghQ0C3Aj09Sxmp5nlOA8PwAOLyWDrPZbhGL/kMufkkff2xx5rferFQ/vPx+fkZW13jBn2D8KrOc1H7av9ci7NNIu8yVX+xT95T1sVqe/J+dffhldzYUPD/4U9Q8lR9TNWa5RDyeej8BhkY/Qd7Y72Jk5Jw4qkSuqwckrqTbTuhc/44zb/IEOagtpK/N8fdoMGDf4G6kd7103/csoAAAAASUVORK5CYII="/><element name="replayIconOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAADTElEQVR4Ae2VX2xTZRjGH1iBzDMrU6lxLdOFhLJ/CepwTWCJiUSTDTdilikxJmAo2GlJ9I7EsCgkw6jRG5ALtZNJy7QDiwxK0dZllSypssqatCHIMKdzM4uEnUUrtj2P57uAULNzOtltf8/Nl3OevHnf73u/70WJxVKiRAWqcD/KsGjsvyScb6EBZizFoth4nX9zJNn6KtZCwhLcNU9NcpJasPw3o80vogbl/y/YUkiwoRHNcMsUSvMGlX/6zz3SCiuWLzSIGXVbnN5gXJ7566b6K29J5ix///PwMWk9ylGUZVj93M5o6qZ6g9OUeY0TBZI5x9ggKlGEFbDvP6Jkp3lFR8PX93yEOpQXy6a2L6Bo9suaTv/2tv/ZPdLey7ylWKZnYEULLFhWbG+q3/f8waSmiPLKB3gSVkh4OkmhsdyHkZoO2Bay0eYtzulcggl+PVXTiYdggmBjgpf42XjzDqwRRy+OAo/eVwNJP5+675Pj/JkhZW0XVt7uFvvQePte1ONezSFclo4d0fjFH7FOr9Ol9l1X1Yv8idt6Ybmj6SRUofL2XSt76Zm57DVeVdt36eVkO3o2xhi9k9gAE/TzXn88LXxHz8KGeWkMyaMc5T4/rDDCus8vfCEZjZgXx0gmyijb3JBghNTmFr6RDByYl5ZofpjDfKANJhhR9mCr8P2QR4tOoG/zYYa57vligVa1Ct93uoEcJzLneZ4vvIEKGHFPx+vCd0K3tMZP5SCDfNeLKhjx8HvHhO8T3c22vRMc4hCDaTQZFGdC07m08O3XPX5p8+6AeooX2F3QkAUsgaW79wJPMaBu3g1Jr9XqD6ZO8iTHlYY7rkhBmJUNXZdmhedgCvX6w8C8yenLDTLE+JS9ExaY/lOUxd4ZnwpxkL7cJifMhs/Ids8Av2SEE4pWYBOqIKEMJlTAiqbu3gklov0d4HYPqo2H03LUugI+HucZznAs/fFXW92VbWu2bnvzsH8sPcMz2h8fXzuNWs1Z/KntOtKX9dLLMK9wjnlmOautwhTf+nIvf446zYUFPf5P7OxJ9atfsFD97Ek97kS1TjZ64+gxpyt4QD6U8age9VDmgOwKbnChXn9wFxuQDrRocmir1ai4y+lfokSJfwEhAcqxd5L4JgAAAABJRU5ErkJggg=="/></elements></component><component name="dock"><settings><setting name="iconalpha" value="1"/><setting name="iconalphaactive" value="1"/><setting name="iconalphaover" value="1"/></settings><elements><element name="button" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAAxklEQVR4Ae2YsQ3CMBBF7+yIximQSERSMgYNI1AxJgswAaMkLREpEnQ2Z6Chooqwpf+k65+evhtzXW8LIjrp7fUcpcmod9U7v2Sbpjm2bVtaa5kSRERC13V13/ePIpatqk05zzOHEChFWImOKnyIwk7EMyXMJyTrOUOZAeGlKd4byUtYCZjEN9gwCuPRYRKYBCbx18JLJ0bh3IQJk/gFHh0Ko3BWwqOID8YYpoTx3ofoap0r18y0WymspCo7DLf7NE2X7L5bnyz7UgI6sO7WAAAAAElFTkSuQmCC"/><element name="buttonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAAzklEQVR4Ae2YMU7FMBAFx04osQvyRQIX4nfcgRZOAxW3oMqRkhKbBkWyjVfiCiD7a0dKPxq9dZHxdLq9Al6AB8DRJl/ACryOwPM8z0/LsvhhGCwNklLK27bd7fv+LcLnabrxx3HYUgotYoyx4liFH0XYpZQtDfMb0orrSGeo8L8Il9Jd4dL5JFRYN6xHp5PQSegkLuwd/uPEWrg3YXQSenRaWAtfVOGYUs62QsPkiriK8Brj571z3ot0q7IxhgB8iPBbCMHU7wxcN/679f0HQzRYj4Eg/3AAAAAASUVORK5CYII="/><element name="buttonActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAAwUlEQVR4Ae2YsQ3CMBBFD8e0CVESUcFMpGMKapgAKvagymKWiF3RxMe/IUDn6J70I5dPX98u4odhvyWiG3JCdqSTiEzI3eNz7fv+0nVdW1WVI4VkEEI4IB8RHjXLCg6II4TPXmbgADOTZhwQV0+F4ekPmDBzcQ2zTcKEC9+wXTqbhE3CJrGyd5jpp1jDxb0SNgm7dNawNbyqhudlydkBUkwG4irCU0rzsa6bVqt0BinFN44vEX7EGDfIiHOj/Hfr8wvCZ0/Xf6TpeQAAAABJRU5ErkJggg=="/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAgCAYAAAA1zNleAAAAD0lEQVQoU2NgGAWjADcAAAIgAAEeEYatAAAAAElFTkSuQmCC"/></elements></component><component name="playlist"><settings><setting name="backgroundcolor" value="0x3c3c3e"/><setting name="fontcolor" value="0x848489"/><setting name="fontsize" value="11"/><setting name="fontweight" value="normal"/><setting name="activecolor" value="0xb2b2b6"/><setting name="overcolor" value="0xb2b2b6"/><setting name="titlecolor" value="0xb9b9be"/><setting name="titlesize" value="12"/><setting name="titleweight" value="bold"/><setting name="titleactivecolor" value="0xececf4"/><setting name="titleovercolor" value="0xececf4"/></settings><elements><element name="item" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABMAQMAAAASt2oTAAAAA1BMVEU8PD44mUV6AAAAFklEQVR4AWMYMmAUjIJRMApGwSgYBQAHuAABIqNCjAAAAABJRU5ErkJggg=="/><element name="itemActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABMAQMAAAASt2oTAAAAA1BMVEUvLzHXqQRQAAAAFklEQVR4AWMYMmAUjIJRMApGwSgYBQAHuAABIqNCjAAAAABJRU5ErkJggg=="/><element name="itemImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAA2CAMAAAAPkWzgAAAAk1BMVEU0NDcVFRcWFhgXFxknJyozMzYyMjUlJSgrKy4jIyYZGRssLC8YGBobGx0kJCcuLjAiIiQaGhwjIyUpKSwkJCYaGh0nJykiIiUgICIwMDMqKi0cHB8lJScdHSAtLTAuLjEdHR8VFRgxMTQvLzIvLzEoKCsZGRwqKiwbGx4gICMoKCofHyImJigmJikhISMeHiAhISRWJqoOAAAA/klEQVR4Ae3VNYLDMBQG4X8kme2QwwzLfP/TbeO0qfQ6zQW+coRxQqYl4HEJSEACEvA8NQamRkCoF40kNUxMgC3gc0lrtiZAB1BKuSOPDIzcXroB0EtL3hQXuIHLNboDC+aRgRnQ6GUAjtBEBmrgdcwA/OCyuMATraOvBiB3HBQTOJ8KZp5QwwXoA3xFBdrVjpPnHVgBfQfjqMChZSoAugDMwCsqUMFeAHwEwMFnXKDkshGAz5YAEOIC2fpbAqhUAMDG4AcO3HUAahkAHYykOQATC6Bsf7M7UNotswLwmR2wAviTHVAAHA2BMXCWIaDC7642wIMSkIAEJCABxv0D1B4Kmtm5dvAAAAAASUVORK5CYII="/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAAABCAIAAAAkUWeUAAAAEUlEQVR42mPQ1zccRaOIzggAmuR1T+nadMkAAAAASUVORK5CYII="/><element name="sliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAABCAYAAADErm6rAAAAHklEQVQI12NgIABERcX/Kymp/FdWVkXBIDGQHCH9AAmVCvfMHD66AAAAAElFTkSuQmCC"/><element name="sliderCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAKCAYAAACuaZ5oAAAAEUlEQVQoU2NgGAWjYBQMfQAAA8oAAZphnjsAAAAASUVORK5CYII="/><element name="sliderCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAKCAYAAACuaZ5oAAAAEUlEQVQoU2NgGAWjYBQMfQAAA8oAAZphnjsAAAAASUVORK5CYII="/><element name="sliderRailCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAYAAACUY/8YAAAAX0lEQVR42q2P4QqAIAyEewktLUy3pKevVwvpAdZO+q9Qgw+OO25jQ88YM2blUAp4dW71epfvyuXcLCGsFWh4yD4fsHY6vV8kRpKUGFQND9kfHxQsJNqEOYOq4Wl2t/oPXdoiX8vd60IAAAAASUVORK5CYII="/><element name="sliderRailCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAYAAACUY/8YAAAAXElEQVQY02NgIADExCQ+KSmp/FdWVkXBIDGg3BcGSoG0tMxGWVl5DAtAYiA5ii2wsbE1ALr0A8hAkKtBGMQGiYHkKLbg////TK6uboYg1wIN/QzCIDZIDCRHSD8AB2YrZ5n2CLAAAAAASUVORK5CYII="/><element name="sliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAABCAAAAADhxTF3AAAAAnRSTlMA/1uRIrUAAAAUSURBVHjaY/oPA49unT+yaz2cCwAcKhapymVMMwAAAABJRU5ErkJggg=="/><element name="sliderThumbCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAQAAAA+ajeTAAAAMElEQVQI12NgwACPPt76f/7/kf+7/q//yEAMeNQH19DHQBy41Xf+/ZH3u4hVjh8AAJAYGojU8tLHAAAAAElFTkSuQmCC"/><element name="sliderThumbCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAQAAAA+ajeTAAAANUlEQVQI12NgoAbY2rf+49KPs/uIVH54wrH/h/7v+L/y//QJRGm4/PHa/7NALdv+L/6MKQsAZV8ZczFGWjAAAAAASUVORK5CYII="/></elements></component><component name="tooltip"><settings><setting name="fontcase" value="normal"/><setting name="fontcolor" value="0xacacac"/><setting name="fontsize" value="11"/><setting name="fontweight" value="normal"/><setting name="activecolor" value="0xffffff"/><setting name="overcolor" value="0xffffff"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAACCAYAAABsfz2XAAAAEUlEQVR4AWOwtnV8RgomWQMAWvcm6W7AcF8AAAAASUVORK5CYII="/><element name="arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAADCAYAAACnI+4yAAAAEklEQVR42mP4//8/AymYgeYaABssa5WUTzsyAAAAAElFTkSuQmCC"/><element name="capTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAECAYAAAC6Jt6KAAAAHUlEQVR42mMUFRU/wUACYHR1935GkgZrW0faagAAqHQGCWgiU9QAAAAASUVORK5CYII="/><element name="capBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAECAYAAAC6Jt6KAAAAGElEQVR42mOwtnV8RgpmoL0GUVHxE6RgAO7IRsl4Cw8cAAAAAElFTkSuQmCC"/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAACCAYAAACUn8ZgAAAAFklEQVR42mMQFRU/YW3r+AwbZsAnCQBUPRWHq8l/fAAAAABJRU5ErkJggg=="/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAACCAYAAACUn8ZgAAAAFklEQVR42mOwtnV8hg2LioqfYMAnCQBwXRWHw2Rr1wAAAABJRU5ErkJggg=="/><element name="capTopLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAAPklEQVR4XmMQFRVnBeIiIN4FxCeQMQOQU6ijq3/VycXjiau79zNkDJLcZWvv9MTGzumZta0jCgZJnkAXhPEBnhkmTDF7/FAAAAAASUVORK5CYII="/><element name="capTopRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAAPklEQVR42mMQFRU/gYZ3A3ERELMyuLp7P0PGTi4eT3R09a8CJbMYrG0dnyFjGzunZ7b2Tk+AkrswJGEYZAUA8XwmRnLnEVMAAAAASUVORK5CYII="/><element name="capBottomLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAAMUlEQVR4AWMQFRU/YW3r+AwbBknusrSye4JLslBdQ/uqpbX9E2ySrEBcBMS7QVYgYwAWViWcql/T2AAAAABJRU5ErkJggg=="/><element name="capBottomRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAANUlEQVR42mOwtnV8hg2LioqfYMAmYWll9wQouQtD0tLa/om6hvZVoGQ2A0g7Gt4NxEVAzAoAZzolltlSH50AAAAASUVORK5CYII="/><element name="menuOption" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAYAAADkIz3lAAAAcklEQVQoz2NgGLFAVFRcDoh3AfFnKC2HVaGYmMQeSUnp/7Kycv9BNJB/AJeJn+XlFf8rKir/V1BQ+g/k/8SqEGjKPhkZuf/Kyqr/QTSQfwirQm9vX3WQYqCVX0G0p6e3BlaF////ZwJiLiDmgdJMwzr2ANEWKw6VGUzBAAAAAElFTkSuQmCC"/><element name="menuOptionOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAYAAADkIz3lAAAAcklEQVQoz2NgGLFAVFRcDoh3AfFnKC2HVaGYmMQeSUnp/7Kycv9BNJB/AJeJn+XlFf8rKir/V1BQ+g/k/8SqEGjKPhkZuf/Kyqr/QTSQfwirQm9vX3WQYqCVX0G0p6e3BlaF////ZwJiLiDmgdJMwzr2ANEWKw6VGUzBAAAAAElFTkSuQmCC"/><element name="menuOptionActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAQAAABOKvVuAAAAdElEQVR4AWOgJ5BhcGQIBWIZhJCsW+6jS7+/P7rklssgBxN0un/59f+n/1//f3SVwQUmGPrs+6P/IPj8N0M4TNBl/+Vr/0Hw4FUGN5igkm3ursvnf+y6bJ/LoAwTZGZQY/BgCANiNSCbASHMwcANxMy09DcAxqMsxkMxUYIAAAAASUVORK5CYII="/><element name="volumeCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAFCAYAAAB1j90SAAAAE0lEQVR42mP4//8/AzmYYQRoBADgm9EvDrkmuwAAAABJRU5ErkJggg=="/><element name="volumeCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAFCAYAAAB1j90SAAAAE0lEQVR42mP4//8/AzmYYQRoBADgm9EvDrkmuwAAAABJRU5ErkJggg=="/><element name="volumeRailCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAYAAAC+0w63AAAAXklEQVR42n2NWwqAIBRE3YSmJT4KafW1tZAWMN2RPkSojwPDPO5VAFSP1lMRDqG+UJexN4524bJ2hvehQU2P2efQGHs6tyCEhBhzg5oes7+PlcWUVuS8Nah5QLK77z7Bcm/CZuJM1AAAAABJRU5ErkJggg=="/><element name="volumeRailCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAYAAAC+0w63AAAAWklEQVQI12NgQAJiYhKfVFXV/6upaaBgkBhQ7gsDLiAtLbNRXl4RQyNIDCSHU6ONja0B0OQPIIUgW0AYxAaJgeRwavz//z+Tq6ubIch0oOLPIAxig8RAcshqARVfK+sjJ8UzAAAAAElFTkSuQmCC"/><element name="volumeRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAA0CAYAAAC6qQkaAAAAXklEQVR42mP5//8/AwyIiUn85+bmZmBkZGRABiA1X79+ZXj16gVcgoUBDaBrwiWGoZFYMCg0MpKnkZFxCPlxVONw0MjIyDgaOCM7AdC7lBuNjtGiY1TjqMbRwooijQBUhw3jnmCdzgAAAABJRU5ErkJggg=="/><element name="volumeProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAA0CAAAAACfwlbGAAAAAnRSTlMA/1uRIrUAAAAmSURBVHgBY/gPBPdunT+yaw2IBeY+BHHXwbmPQNz1w5w7yh3lAgBeJpPWLirUWgAAAABJRU5ErkJggg=="/><element name="volumeProgressCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAQAAAAU2sY8AAAANElEQVQI12NgIA5s7Vv/cenH2X1YpA5POPb/0P8d/1f+nz4BQ/Lyx2v/zwKlt/1f/BkmBgDJshlzy7m4BgAAAABJRU5ErkJggg=="/><element name="volumeProgressCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAQAAAAU2sY8AAAAL0lEQVQI12NggIJHH2/9P///yP9d/9d/ZkAHjybCJScyYIJbE85/OvJp1wQG4gAADBkams/Cpm0AAAAASUVORK5CYII="/><element name="volumeThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAQAAACMnYaxAAAA/klEQVR4AYXQoW7CUBjF8f9IYWkgq2l2k8llrmJBTOBxsyQlJENs4236CDhEywNUIEGh12WZuYDC4W9A3B2zhTVLds8VJ+fnPv5/FzQIaHGptNQaWn4ooM0DA56VgVpbi1hEk2vSvNjbozu6vc0LUi1NCQFXDBflwW/9p7L1B78oGRJJCOnN8o3/OMvGz3J6EiLStdX0K2tLKiFm8n6qY3XiVYL5C98cLxL90dLWcWkZSYjpZ0Uds4K+hIg7nqblOU1LxlojCDF0GWfz1a5ylVvtsrmoi5EQ0OGGhEdNE2WslmjpSND5VAy3mu6VRM1o0fm+Dx8SEWOUWC3UIvoCCFqphCwr/x8AAAAASUVORK5CYII="/></elements></component></components></skin>';
    var a;
    b.html5.defaultskin = function () {
        a = a || b.utils.parseXML(c);
        return a
    }
})(jwplayer);
(function (b) {
    var c = b.html5, g = b.utils, h = b.events, i = h.state, e = g.css, f = g
			.isMobile(), a = ".jwdisplay", d = ".jwpreview";
    var j = {
        showicons: true,
        bufferrotation: 45,
        bufferinterval: 100,
        fontcolor: "#ccc",
        overcolor: "#fff",
        fontsize: 15,
        fontweight: ""
    };
    c.display = function (m, N) {
        var z = m.skin, X, aa, I, E, o, B, T, k = false, ab = {}, R = false, W = false, l, K, F, P, G, Y = g
				.extend({}, j, z.getComponentSettings("display"), N), O = new h.eventdispatcher(), p, V;
        g.extend(this, O);
        function U() {
            X = document.createElement("div");
            X.id = m.id + "_display";
            X.className = "jwdisplay";
            aa = document.createElement("div");
            aa.className = "jwpreview jw" + m.jwGetStretching();
            X.appendChild(aa);
            m.jwAddEventListener(h.JWPLAYER_PLAYER_STATE, s);
            m.jwAddEventListener(h.JWPLAYER_PLAYLIST_ITEM, r);
            m.jwAddEventListener(h.JWPLAYER_PLAYLIST_COMPLETE, Q);
            m.jwAddEventListener(h.JWPLAYER_MEDIA_ERROR, q);
            m.jwAddEventListener(h.JWPLAYER_ERROR, q);
            m.jwAddEventListener(h.JWPLAYER_PROVIDER_CLICK, Z);
            if (!f) {
                X.addEventListener("click", Z, false)
            } else {
                I = new g.touch(X);
                I.addEventListener(g.touchEvents.TAP, Z)
            }
            S();
            s({
                newstate: i.IDLE
            })
        }
        function Z(ad) {
            if (p && (m.jwGetControls() || m.jwGetState() === i.PLAYING)) {
                p(ad);
                return
            }
            if (!f || !m.jwGetControls()) {
                O.sendEvent(h.JWPLAYER_DISPLAY_CLICK)
            }
            if (!m.jwGetControls()) {
                return
            }
            var ae = D();
            if (V && ae - V < 500) {
                m.jwSetFullscreen();
                V = undefined
            } else {
                V = D()
            }
            var ac = g.bounds(X.parentNode.querySelector(".jwcontrolbar")), ah = g
					.bounds(X), ag = {
					    left: ac.left - 10 - ah.left,
					    right: ac.left + 30 - ah.left,
					    top: ah.bottom - 40,
					    bottom: ah.bottom
					}, af = {
					    left: ac.right - 30 - ah.left,
					    right: ac.right + 10 - ah.left,
					    top: ag.top,
					    bottom: ag.bottom
					};
            if (f) {
                if (H(ag, ad.x, ad.y)) {
                } else {
                    if (H(af, ad.x, ad.y)) {
                        m.jwSetFullscreen();
                        return
                    } else {
                        O.sendEvent(h.JWPLAYER_DISPLAY_CLICK);
                        if (l) {
                            return
                        }
                    }
                }
            }
            switch (m.jwGetState()) {
                case i.PLAYING:
                case i.BUFFERING:
                    m.jwPause();
                    break;
                default:
                    m.jwPlay();
                    break
            }
        }
        function H(ad, ac, ae) {
            return (ac >= ad.left && ac <= ad.right && ae >= ad.top && ae <= ad.bottom)
        }
        function D() {
            return new Date().getTime()
        }
        this.clickHandler = Z;
        function S() {
            var ac = {
                font: Y.fontweight + " " + Y.fontsize + "px/"
						+ (parseInt(Y.fontsize, 10) + 3)
						+ "px Arial, Helvetica, sans-serif",
                color: Y.fontcolor
            }, ad = {
                color: Y.overcolor
            };
            F = new c.displayicon(X.id + "_button", m, ac, ad);
            X.appendChild(F.element())
        }
        function u(ac, ad) {
            if (!Y.showicons) {
                return
            }
            if (ac || ad) {
                F.setRotation(ac === "buffer" ? parseInt(Y.bufferrotation, 10)
						: 0, parseInt(Y.bufferinterval, 10));
                F.setIcon(ac);
                F.setText(ad)
            } else {
                F.hide()
            }
        }
        function r() {
            v();
            E = m.jwGetPlaylist()[m.jwGetPlaylistIndex()];
            var ac = E ? E.image : "";
            G = undefined;
            n(ac)
        }
        function n(ac) {
            if (o !== ac) {
                if (o) {
                    L(d, false)
                }
                o = ac;
                C()
            } else {
                if (o && !l) {
                    L(d, true)
                }
            }
            t(m.jwGetState())
        }
        function Q() {
            W = true;
            u("replay");
            var ac = m.jwGetPlaylist()[0];
            n(ac.image)
        }
        var A;
        function y() {
            return P ? P : (m ? m.jwGetState() : i.IDLE)
        }
        function s(ac) {
            clearTimeout(A);
            A = setTimeout(function () {
                t(ac.newstate)
            }, 100)
        }
        function t(ad) {
            ad = y();
            if (ad !== G) {
                G = ad;
                if (F) {
                    F.setRotation(0)
                }
                switch (ad) {
                    case i.IDLE:
                        if (!R && !W) {
                            if (o && !k) {
                                L(d, true)
                            }
                            var ac = true;
                            if (m._model && m._model.config.displaytitle === false) {
                                ac = false
                            }
                            u("play", (E && ac) ? E.title : "")
                        }
                        break;
                    case i.BUFFERING:
                        v();
                        W = false;
                        u("buffer");
                        break;
                    case i.PLAYING:
                        u();
                        break;
                    case i.PAUSED:
                        u("play");
                        break
                }
            }
        }
        this.forceState = function (ac) {
            P = ac;
            t(ac);
            this.show()
        };
        this.releaseState = function (ac) {
            P = null;
            t(ac);
            this.show()
        };
        this.hidePreview = function (ac) {
            k = ac;
            L(d, !ac);
            if (ac) {
                l = true
            }
        };
        this.setHiding = function () {
            l = true
        };
        this.element = function () {
            return X
        };
        function M(ac) {
            return "#" + X.id + " " + ac
        }
        function C() {
            if (o) {
                var ac = new Image();
                ac.addEventListener("load", x, false);
                ac.src = o
            } else {
                e(M(d), {
                    "background-image": ""
                });
                L(d, false);
                B = T = 0
            }
        }
        function x() {
            B = this.width;
            T = this.height;
            t(m.jwGetState());
            w();
            if (o) {
                e(M(d), {
                    "background-image": "url(" + o + ")"
                })
            }
        }
        function q(ac) {
            R = true;
            u("error", ac.message)
        }
        function v() {
            R = false;
            if (ab.error) {
                ab.error.setText()
            }
        }
        function w() {
            if (X.clientWidth * X.clientHeight > 0) {
                g.stretch(m.jwGetStretching(), aa, X.clientWidth,
						X.clientHeight, B, T)
            }
        }
        this.redraw = w;
        function L(ac, ad) {
            e(M(ac), {
                opacity: ad ? 1 : 0,
                visibility: ad ? "visible" : "hidden"
            })
        }
        this.show = function (ac) {
            if (F && (ac || y() !== i.PLAYING)) {
                J();
                X.style.display = "block";
                F.show();
                l = false
            }
        };
        this.hide = function () {
            if (F) {
                F.hide();
                l = true
            }
        };
        function J() {
            clearTimeout(K);
            K = undefined
        }
        this.setAlternateClickHandler = function (ac) {
            p = ac
        };
        this.revertAlternateClickHandler = function () {
            p = null
        };
        U()
    };
    e(a, {
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden"
    });
    e(a + " " + d, {
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "#000 no-repeat center",
        overflow: "hidden",
        opacity: 0
    });
    g.transitionStyle(a + ", " + a + " *", "opacity .25s, color .25s")
})(jwplayer);
(function (b) {
    var d = b.html5, h = b.utils, f = h.css, c = ".jwplayer .jwdisplayIcon", g = document, a = "none", e = "100%", i = "center";
    d.displayicon = function (n, H, s, B) {
        var v = H.skin, P = H.id, w, I, O, z, u, m, C, A = {}, E, D = 0, x = -1, L = 0;
        if (H instanceof b.html5.instream) {
            P = P.replace("_instream", "")
        }
        function y() {
            w = K("jwdisplayIcon");
            w.id = n;
            t();
            m = K("jwtext", w, s, B);
            C = K("jwicon", w);
            H.jwAddEventListener(b.events.JWPLAYER_RESIZE, r);
            k();
            l()
        }
        function p() {
            return "#" + n
        }
        function K(R, T, S, Q) {
            var U = g.createElement("div");
            U.className = R;
            if (T) {
                T.appendChild(U)
            }
            if (w) {
                M(R, "." + R, S, Q)
            }
            return U
        }
        function t() {
            I = F("background");
            O = F("capLeft");
            z = F("capRight");
            u = (O.width * z.width > 0);
            var Q = {
                "background-image": "url(" + O.src + "), url(" + I.src
						+ "), url(" + z.src + ")",
                "background-position": "left,center,right",
                "background-repeat": "no-repeat",
                padding: "0 " + z.width + "px 0 " + O.width + "px",
                height: I.height,
                "margin-top": I.height / -2
            };
            f(p(), Q);
            if (!h.isMobile()) {
                if (I.overSrc) {
                    Q["background-image"] = "url(" + O.overSrc + "), url("
							+ I.overSrc + "), url(" + z.overSrc + ")"
                }
                f(".jw-tab-focus " + p() + ", #" + P + " .jwdisplay:hover "
						+ p(), Q)
            }
        }
        function M(S, Q, U, R) {
            var T = F(S);
            if (S === "replayIcon" && !T.src) {
                T = F("playIcon")
            }
            if (T.overSrc) {
                R = h.extend({}, R);
                R["background-image"] = "url(" + T.overSrc + ")"
            }
            if (T.src) {
                U = h.extend({}, U);
                if (S.indexOf("Icon") > 0) {
                    D = T.width | 0
                }
                U.width = T.width;
                U["background-image"] = "url(" + T.src + ")";
                U["background-size"] = T.width + "px " + T.height + "px";
                U["float"] = "none";
                f.style(w, {
                    display: "table"
                })
            } else {
                f.style(w, {
                    display: "none"
                })
            }
            if (U) {
                f("#" + P + " .jwdisplay " + Q, U)
            }
            if (R) {
                f("#" + P + " .jwdisplay:hover " + Q, R)
            }
            E = T
        }
        function F(R) {
            var S = v.getSkinElement("display", R), Q = v.getSkinElement(
					"display", R + "Over");
            if (S) {
                S.overSrc = (Q && Q.src) ? Q.src : "";
                return S
            }
            return {
                src: "",
                overSrc: "",
                width: 0,
                height: 0
            }
        }
        function l() {
            var Q = u || (D === 0);
            f.style(m, {
                display: (m.innerHTML && Q) ? "" : a
            });
            L = Q ? 30 : 0;
            r()
        }
        function r() {
            clearTimeout(x);
            if (L-- > 0) {
                x = setTimeout(r, 33)
            }
            var S = "px " + e;
            var Q = Math.ceil(Math.max(E.width, h.bounds(w).width - z.width
					- O.width));
            var R = [O.width + S, Q + S, z.width + S].join(", ");
            var T = {
                "background-size": R
            };
            if (w.parentNode) {
                T.left = (w.parentNode.clientWidth % 2 === 1) ? "0.5px" : ""
            }
            f.style(w, T)
        }
        this.element = function () {
            return w
        };
        this.setText = function (R) {
            var Q = m.style;
            m.innerHTML = R ? R.replace(":", ":<br>") : "";
            Q.height = "0";
            Q.display = "block";
            if (R) {
                while (j(m) > 2) {
                    m.innerHTML = m.innerHTML.replace(/(.*) .*$/, "$1...")
                }
            }
            Q.height = "";
            Q.display = "";
            l()
        };
        this.setIcon = function (Q) {
            var R = A[Q];
            if (!R) {
                R = K("jwicon");
                R.id = w.id + "_" + Q;
                A[Q] = R
            }
            M(Q + "Icon", "#" + R.id);
            if (w.contains(C)) {
                w.replaceChild(R, C)
            } else {
                w.appendChild(R)
            }
            C = R
        };
        var q, o = 0, N;
        function G(R, Q) {
            clearInterval(q);
            N = 0;
            o = R | 0;
            if (o === 0) {
                J()
            } else {
                q = setInterval(J, Q)
            }
        }
        function J() {
            N = (N + o) % 360;
            h.rotate(C, N)
        }
        this.setRotation = G;
        function j(Q) {
            return Math.floor(Q.scrollHeight
					/ g.defaultView.getComputedStyle(Q, null).lineHeight
							.replace("px", ""))
        }
        var k = this.hide = function () {
            w.style.opacity = 0;
            w.style.cursor = ""
        };
        this.show = function () {
            w.style.opacity = 1;
            w.style.cursor = "pointer"
        };
        y()
    };
    f(c, {
        display: "table",
        position: "relative",
        "margin-left": "auto",
        "margin-right": "auto",
        top: "50%",
        "float": "none"
    });
    f(c + " div", {
        position: "relative",
        display: "table-cell",
        "vertical-align": "middle",
        "background-repeat": "no-repeat",
        "background-position": i
    });
    f(c + " div", {
        "vertical-align": "middle"
    }, true);
    f(c + " .jwtext", {
        color: "#fff",
        padding: "0 1px",
        "max-width": "300px",
        "overflow-y": "hidden",
        "text-align": i,
        "-webkit-user-select": a,
        "-moz-user-select": a,
        "-ms-user-select": a,
        "user-select": a
    })
})(jwplayer);
(function (c) {
    var b = c.html5, a = c.utils, d = a.css, h = a.bounds, g = (window.top !== window.self), e = ".jwdock", f = ".jwdockbuttons";
    b.dock = function (t, E) {
        var w = t, v = {
            iconalpha: 0.75,
            iconalphaactive: 0.5,
            iconalphaover: 1,
            margin: 8
        }, o = a.extend({}, v, E), i = w.id + "_dock", p = w.skin, z = 0, l = {}, m = {}, q, A, F, x, y = this;
        function r() {
            y.visible = false;
            q = D("div", "jwdock");
            A = D("div", "jwdockbuttons");
            q.appendChild(A);
            q.id = i;
            s();
            setTimeout(function () {
                F = h(q)
            })
        }
        function s() {
            var H = u("button"), I = u("buttonOver"), J = u("buttonActive");
            if (!H) {
                return
            }
            d(j(), {
                height: H.height,
                padding: o.margin
            });
            d(f, {
                height: H.height
            });
            d(j("div.button"), a.extend(n(H), {
                width: H.width,
                cursor: "pointer",
                border: "none"
            }));
            d(j("div.button:hover"), n(I));
            d(j("div.button:active"), n(J));
            d(j("div.button>div"), {
                opacity: o.iconalpha
            });
            d(j("div.button:hover>div"), {
                opacity: o.iconalphaover
            });
            d(j("div.button:active>div"), {
                opacity: o.iconalphaactive
            });
            d(j(".jwoverlay"), {
                top: o.margin + H.height
            });
            B("capLeft", A);
            B("capRight", A);
            B("divider")
        }
        function n(H) {
            if (!(H && H.src)) {
                return {}
            }
            return {
                background: "url(" + H.src + ") center",
                "background-size": H.width + "px " + H.height + "px"
            }
        }
        function B(J, I) {
            var H = u(J);
            d(j("." + J), a.extend(n(H), {
                width: H.width
            }));
            return D("div", J, I)
        }
        function j(H) {
            return "#" + i + " " + (H ? H : "")
        }
        function D(J, H, I) {
            var K = document.createElement(J);
            if (H) {
                K.className = H
            }
            if (I) {
                I.appendChild(K)
            }
            return K
        }
        function u(H) {
            var I = p.getSkinElement("dock", H);
            return I ? I : {
                width: 0,
                height: 0,
                src: ""
            }
        }
        y.redraw = function () {
            F = h(q)
        };
        function C() {
            return (g && a.isIE() && w.jwGetFullscreen())
        }
        function G(I) {
            var L = m[I], H, K = l[I], M, J = h(K.icon);
            L.offsetX(0);
            M = h(q);
            if (C()) {
                d("#" + L.element().id, {
                    left: J.left * 100 + 50 + J.width * 100 / 2
                })
            } else {
                d("#" + L.element().id, {
                    left: J.left - M.left + J.width / 2
                })
            }
            H = h(L.element());
            if (M.left > H.left) {
                L.offsetX(M.left - H.left + 8)
            }
        }
        y.element = function () {
            return q
        };
        y.offset = function (H) {
            d(j(), {
                "margin-left": H
            })
        };
        y.hide = function () {
            if (!y.visible) {
                return
            }
            y.visible = false;
            q.style.opacity = 0;
            clearTimeout(x);
            x = setTimeout(function () {
                q.style.display = "none"
            }, 250)
        };
        y.showTemp = function () {
            if (!y.visible) {
                q.style.opacity = 0;
                q.style.display = "block"
            }
        };
        y.hideTemp = function () {
            if (!y.visible) {
                q.style.display = "none"
            }
        };
        y.show = function () {
            if (y.visible || !z) {
                return
            }
            y.visible = true;
            q.style.display = "block";
            clearTimeout(x);
            x = setTimeout(function () {
                q.style.opacity = 1
            }, 0)
        };
        y.addButton = function (I, Q, M, J) {
            if (l[J]) {
                return
            }
            var K = D("div", "divider", A), L = D("div", "button", A), P = D(
					"div", null, L);
            P.id = i + "_" + J;
            P.innerHTML = "&nbsp;";
            d("#" + P.id, {
                "background-image": I
            });
            if (typeof M === "string") {
                M = new Function(M)
            }
            if (!a.isMobile()) {
                L.addEventListener("click", function (S) {
                    M(S);
                    S.preventDefault()
                })
            } else {
                var H = new a.touch(L);
                H.addEventListener(a.touchEvents.TAP, function (S) {
                    M(S)
                })
            }
            l[J] = {
                element: L,
                label: Q,
                divider: K,
                icon: P
            };
            if (Q) {
                var R = new b.overlay(P.id + "_tooltip", p, true), N = D("div");
                N.id = P.id + "_label";
                N.innerHTML = Q;
                d("#" + N.id, {
                    padding: 3
                });
                R.setContents(N);
                if (!a.isMobile()) {
                    var O;
                    L.addEventListener("mouseover", function () {
                        clearTimeout(O);
                        G(J);
                        R.show();
                        a.foreach(m, function (S, T) {
                            if (S !== J) {
                                T.hide()
                            }
                        })
                    }, false);
                    L.addEventListener("mouseout", function () {
                        O = setTimeout(R.hide, 100)
                    }, false);
                    q.appendChild(R.element());
                    m[J] = R
                }
            }
            z++;
            k()
        };
        y.removeButton = function (I) {
            if (l[I]) {
                A.removeChild(l[I].element);
                A.removeChild(l[I].divider);
                var H = document.getElementById("" + i + "_" + I + "_tooltip");
                if (H) {
                    q.removeChild(H)
                }
                delete l[I];
                z--;
                k()
            }
        };
        y.numButtons = function () {
            return z
        };
        function k() {
            d(f + " .capLeft, " + f + " .capRight", {
                display: z ? "block" : "none"
            })
        }
        r()
    };
    d(e, {
        opacity: 0,
        display: "none"
    });
    d(e + " > *", {
        height: "100%",
        "float": "left"
    });
    d(e + " > .jwoverlay", {
        height: "auto",
        "float": "none",
        "z-index": 99
    });
    d(f + " div.button", {
        position: "relative"
    });
    d(f + " > *", {
        height: "100%",
        "float": "left"
    });
    d(f + " .divider", {
        display: "none"
    });
    d(f + " div.button ~ .divider", {
        display: "block"
    });
    d(f + " .capLeft, " + f + " .capRight", {
        display: "none"
    });
    d(f + " .capRight", {
        "float": "right"
    });
    d(f + " div.button > div", {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 5,
        position: "absolute",
        "background-position": "center",
        "background-repeat": "no-repeat"
    });
    a.transitionStyle(e, "background .25s, opacity .25s");
    a.transitionStyle(e + " .jwoverlay", "opacity .25s");
    a.transitionStyle(f + " div.button div", "opacity .25s")
})(jwplayer);
(function (c) {
    var a = c.html5, e = c.utils, b = c._, f = c.events, d = f.state, g = c.playlist;
    a.instream = function (C, G, n, x) {
        var u = {
            controlbarseekable: "never",
            controlbarpausable: true,
            controlbarstoppable: true,
            loadingmessage: "Loading ad",
            playlistclickable: true,
            skipoffset: null,
            tag: null
        };
        var w, M, y = 0, J, z = {
            controlbarseekable: "never",
            controlbarpausable: false,
            controlbarstoppable: false
        }, h, t, I, j, k, K, l, p, o, i, F = -1, E = e.extend(this,
				new f.eventdispatcher());
        C.jwAddEventListener(f.JWPLAYER_RESIZE, r);
        C.jwAddEventListener(f.JWPLAYER_FULLSCREEN, q);
        E.init = function () {
            t = x.detachMedia();
            H();
            K = new a.model({}, l);
            K.setVolume(G.volume);
            K.setFullscreen(G.fullscreen);
            K.setMute(G.mute);
            K.addEventListener("fullscreenchange", A);
            k = G.playlist[G.item];
            I = t.currentTime;
            if (x.checkBeforePlay() || I === 0) {
                I = 0;
                j = d.PLAYING
            } else {
                if (G.getVideo().checkComplete()) {
                    j = d.IDLE
                } else {
                    if (C.jwGetState() === d.IDLE) {
                        j = d.IDLE
                    } else {
                        j = d.PLAYING
                    }
                }
            }
            if (j === d.PLAYING) {
                t.pause()
            }
            o = new a.display(E);
            o.forceState(d.BUFFERING);
            i = document.createElement("div");
            i.id = E.id + "_instream_container";
            e.css.style(i, {
                width: "100%",
                height: "100%"
            });
            i.appendChild(o.element());
            var P = {
                fullscreen: G.fullscreen
            };
            p = new a.controlbar(E, P);
            p.instreamMode(true);
            i.appendChild(p.element());
            if (C.jwGetControls()) {
                p.show();
                o.show()
            } else {
                p.hide();
                o.hide()
            }
            n.setupInstream(i, p, o, K);
            r();
            E.jwInstreamSetText(u.loadingmessage)
        };
        E.load = function (T, Q) {
            if (e.isAndroid(2.3)) {
                s({
                    type: f.JWPLAYER_ERROR,
                    message: "Error loading instream: Cannot play instream on Android 2.3"
                });
                return
            }
            D(f.JWPLAYER_PLAYLIST_ITEM, {
                index: y
            }, true);
            var S = i.parentNode;
            var P = 10 + e.bounds(S).bottom - e.bounds(p.element()).top;
            if (b.isArray(T)) {
                if (Q) {
                    J = Q;
                    Q = Q[y]
                }
                M = T;
                T = M[y]
            }
            z = e.extend(u, Q);
            w = new g.item(T);
            K.setPlaylist([T]);
            h = new a.adskipbutton(C.id, P, z.skipMessage, z.skipText);
            h.addEventListener(f.JWPLAYER_AD_SKIPPED, m);
            h.reset(z.skipoffset || -1);
            if (C.jwGetControls()) {
                h.show()
            } else {
                h.hide()
            }
            var R = h.element();
            i.appendChild(R);
            K.addEventListener(f.JWPLAYER_ERROR, s);
            o.setAlternateClickHandler(function (U) {
                U = U || {};
                U.hasControls = !!C.jwGetControls();
                D(f.JWPLAYER_INSTREAM_CLICK, U);
                if (K.state === d.PAUSED) {
                    if (U.hasControls) {
                        E.jwInstreamPlay()
                    }
                } else {
                    E.jwInstreamPause()
                }
            });
            if (e.isMSIE()) {
                t.parentElement.addEventListener("click", o.clickHandler)
            }
            n.addEventListener(f.JWPLAYER_AD_SKIPPED, m);
            l.load(K.playlist[0])
        };
        function s(P) {
            D(P.type, P);
            if (K) {
                C.jwInstreamDestroy(false, E)
            }
        }
        E.jwInstreamDestroy = function (P) {
            if (!K) {
                return
            }
            K.removeEventListener("fullscreenchange", A);
            clearTimeout(F);
            F = -1;
            l.detachMedia();
            x.attachMedia();
            if (j !== d.IDLE) {
                var Q = e.extend({}, k);
                Q.starttime = I;
                G.getVideo().load(Q)
            } else {
                G.getVideo().stop()
            }
            E.resetEventListeners();
            l.resetEventListeners();
            K.resetEventListeners();
            if (p) {
                try {
                    p.element().parentNode.removeChild(p.element())
                } catch (R) {
                }
            }
            if (o) {
                if (t && t.parentElement) {
                    t.parentElement
							.removeEventListener("click", o.clickHandler)
                }
                o.revertAlternateClickHandler()
            }
            D(f.JWPLAYER_INSTREAM_DESTROYED, {
                reason: P ? "complete" : "destroyed"
            }, true);
            if (j === d.PLAYING) {
                t.play()
            }
            n.destroyInstream(l.isAudioFile());
            K = null
        };
        E.jwInstreamAddEventListener = function (P, Q) {
            E.addEventListener(P, Q)
        };
        E.jwInstreamRemoveEventListener = function (P, Q) {
            E.removeEventListener(P, Q)
        };
        E.jwInstreamPlay = function () {
            l.play(true);
            G.state = d.PLAYING;
            o.show()
        };
        E.jwInstreamPause = function () {
            l.pause(true);
            G.state = d.PAUSED;
            if (C.jwGetControls()) {
                o.show();
                p.show()
            }
        };
        E.jwInstreamSeek = function (P) {
            l.seek(P)
        };
        E.jwInstreamSetText = function (P) {
            p.setText(P)
        };
        E.jwInstreamState = function () {
            return K.state
        };
        function H() {
            var P = c.html5.chooseProvider({});
            l = new P(G.id);
            l.addGlobalListener(L);
            l.addEventListener(f.JWPLAYER_MEDIA_META, O);
            l.addEventListener(f.JWPLAYER_MEDIA_COMPLETE, v);
            l.addEventListener(f.JWPLAYER_MEDIA_BUFFER_FULL, B);
            l.addEventListener(f.JWPLAYER_MEDIA_ERROR, s);
            l.addEventListener(f.JWPLAYER_PLAYER_STATE, N);
            l.addEventListener(f.JWPLAYER_MEDIA_TIME, function (Q) {
                if (h) {
                    h.updateSkipTime(Q.position, Q.duration)
                }
            });
            l.attachMedia();
            l.mute(G.mute);
            l.volume(G.volume)
        }
        function N(P) {
            if (P.newstate === K.state) {
                return
            }
            K.state = P.newstate;
            switch (K.state) {
                case d.PLAYING:
                    E.jwInstreamPlay();
                    break;
                case d.PAUSED:
                    E.jwInstreamPause();
                    break
            }
        }
        function m(P) {
            D(P.type, P);
            v()
        }
        function L(P) {
            D(P.type, P)
        }
        function A(P) {
            G.sendEvent(P.type, P);
            D(f.JWPLAYER_FULLSCREEN, {
                fullscreen: P.jwstate
            })
        }
        function q(P) {
            L(P);
            if (!K) {
                return
            }
            r();
            if (!P.fullscreen && e.isIPad()) {
                if (K.state === d.PAUSED) {
                    o.show(true)
                } else {
                    if (K.state === d.PLAYING) {
                        o.hide()
                    }
                }
            }
        }
        function B() {
            if (o) {
                o.releaseState(E.jwGetState())
            }
            l.play()
        }
        function v() {
            if (M && y + 1 < M.length) {
                y++;
                var P = M[y];
                w = new g.item(P);
                K.setPlaylist([P]);
                var Q;
                if (J) {
                    Q = J[y]
                }
                z = e.extend(u, Q);
                l.load(K.playlist[0]);
                h.reset(z.skipoffset || -1);
                F = setTimeout(function () {
                    D(f.JWPLAYER_PLAYLIST_ITEM, {
                        index: y
                    }, true)
                }, 0)
            } else {
                F = setTimeout(function () {
                    D(f.JWPLAYER_PLAYLIST_COMPLETE, {}, true);
                    C.jwInstreamDestroy(true, E)
                }, 0)
            }
        }
        function O(P) {
            if (P.width && P.height) {
                if (o) {
                    o.releaseState(E.jwGetState())
                }
                n.resizeMedia()
            }
        }
        function D(P, Q) {
            Q = Q || {};
            if (u.tag && !Q.tag) {
                Q.tag = u.tag
            }
            E.sendEvent(P, Q)
        }
        function r() {
            if (p) {
                p.redraw()
            }
            if (o) {
                o.redraw()
            }
        }
        E.setControls = function (P) {
            if (P) {
                h.show()
            } else {
                h.hide()
            }
        };
        E.jwPlay = function () {
            if (z.controlbarpausable.toString().toLowerCase() === "true") {
                E.jwInstreamPlay()
            }
        };
        E.jwPause = function () {
            if (z.controlbarpausable.toString().toLowerCase() === "true") {
                E.jwInstreamPause()
            }
        };
        E.jwStop = function () {
            if (z.controlbarstoppable.toString().toLowerCase() === "true") {
                C.jwInstreamDestroy(false, E);
                C.jwStop()
            }
        };
        E.jwSeek = function (P) {
            switch (z.controlbarseekable.toLowerCase()) {
                case "never":
                    return;
                case "always":
                    E.jwInstreamSeek(P);
                    break;
                case "backwards":
                    if (K.position > P) {
                        E.jwInstreamSeek(P)
                    }
                    break
            }
        };
        E.jwSeekDrag = function (P) {
            K.seekDrag(P)
        };
        E.jwGetPosition = function () {
        };
        E.jwGetDuration = function () {
        };
        E.jwGetWidth = C.jwGetWidth;
        E.jwGetHeight = C.jwGetHeight;
        E.jwGetFullscreen = C.jwGetFullscreen;
        E.jwSetFullscreen = C.jwSetFullscreen;
        E.jwGetVolume = function () {
            return G.volume
        };
        E.jwSetVolume = function (P) {
            K.setVolume(P);
            C.jwSetVolume(P)
        };
        E.jwGetMute = function () {
            return G.mute
        };
        E.jwSetMute = function (P) {
            K.setMute(P);
            C.jwSetMute(P)
        };
        E.jwGetState = function () {
            if (!K) {
                return d.IDLE
            }
            return K.state
        };
        E.jwGetPlaylist = function () {
            return [w]
        };
        E.jwGetPlaylistIndex = function () {
            return 0
        };
        E.jwGetStretching = function () {
            return G.config.stretching
        };
        E.jwAddEventListener = function (Q, P) {
            E.addEventListener(Q, P)
        };
        E.jwRemoveEventListener = function (Q, P) {
            E.removeEventListener(Q, P)
        };
        E.jwSetCurrentQuality = function () {
        };
        E.jwGetQualityLevels = function () {
            return []
        };
        E.jwGetControls = function () {
            return C.jwGetControls()
        };
        E.skin = C.skin;
        E.id = C.id + "_instream";
        return E
    }
})(window.jwplayer);
(function (b) {
    var i = b.utils, e = b.html5, h = i.css, k = b.events.state, f = "free", c = "pro", d = "premium", j = "ads", l = "http://11.12.112.243/JwPlayer/jwplogo.png", g = ".jwplogo";
    var a = e.logo = function (t, u) {
        var z = t, A = z.id + "_logo", q, n, r = a.defaults, y = false;
        function s() {
            x();
            o()
        }
        function x() {
            var B = "o";
            if (z.edition) {
                B = v(z.edition())
            }
            if (B === "o" || B === "f") {
                r.link = l + b.version + "&m=h&e=" + B
            }
            q = i.extend({}, r, u);
            q.hide = (q.hide.toString() === "true")
        }
        function o() {
            n = document.createElement("img");
            n.className = "jwlogo";
            n.id = A;
            if (!q.file) {
                n.style.display = "none";
                return
            }
            var B = (/(\w+)-(\w+)/).exec(q.position), C = {}, E = q.margin;
            if (B.length === 3) {
                C[B[1]] = E;
                C[B[2]] = E
            } else {
                C.top = C.right = E
            }
            h(m(), C);
            n.src = (q.prefix ? q.prefix : "") + q.file;
            if (!i.isMobile()) {
                n.onclick = w
            } else {
                var D = new i.touch(n);
                D.addEventListener(i.touchEvents.TAP, w)
            }
        }
        this.resize = function () {
        };
        this.element = function () {
            return n
        };
        this.offset = function (B) {
            h(m(), {
                "margin-bottom": B
            })
        };
        this.position = function () {
            return q.position
        };
        this.margin = function () {
            return parseInt(q.margin, 10)
        };
        function p() {
            if (z.jwGetState() === k.IDLE || z.jwGetState() === k.PAUSED) {
                z.jwPlay()
            } else {
                z.jwPause()
            }
        }
        function w(B) {
            if (i.exists(B) && B.stopPropagation) {
                B.stopPropagation()
            }
            if (!y || !q.link) {
                p()
            }
            if (y && q.link) {
                z.jwPause();
                z.jwSetFullscreen(false);
                window.open(q.link, q.linktarget)
            }
            return
        }
        function v(B) {
            if (B === c) {
                return "p"
            } else {
                if (B === d) {
                    return "r"
                } else {
                    if (B === j) {
                        return "a"
                    } else {
                        if (B === f) {
                            return "f"
                        } else {
                            return "o"
                        }
                    }
                }
            }
        }
        function m(B) {
            return "#" + A + " " + (B ? B : "")
        }
        this.hide = function (B) {
            if (q.hide || B) {
                y = false;
                n.style.visibility = "hidden";
                n.style.opacity = 0
            }
        };
        this.show = function () {
            y = true;
            n.style.visibility = "visible";
            n.style.opacity = 1
        };
        s();
        return this
    };
    a.defaults = {
        prefix: i.repo(),
        file: "logo.png",
        linktarget: "_top",
        margin: 8,
        hide: false,
        position: "top-right"
    };
    h(g, {
        cursor: "pointer",
        position: "absolute"
    })
})(jwplayer);
(function (e) {
    var d = e.html5, b = e.utils, f = b.css, g = "jwmenu", a = "jwoption";
    d.menu = function (i, j, w, p) {
        var t = j, k = p, m = new d.overlay(t + "_overlay", w), n = b.extend({
            fontcase: undefined,
            fontcolor: "#cccccc",
            fontsize: 11,
            fontweight: undefined,
            activecolor: "#ffffff",
            overcolor: "#ffffff"
        }, w.getComponentSettings("tooltip")), l, v = [];
        function s() {
            l = q(g);
            l.id = t;
            var B = o("menuTop" + i), z = o("menuOption"), y = o("menuOptionOver"), A = o("menuOptionActive");
            if (B && B.image) {
                var C = new Image();
                C.src = B.src;
                C.width = B.width;
                C.height = B.height;
                l.appendChild(C)
            }
            if (z) {
                var x = "#" + j + " ." + a;
                f(x, b.extend(u(z), {
                    height: z.height,
                    color: n.fontcolor,
                    "padding-left": z.width,
                    font: n.fontweight + " " + n.fontsize
							+ "px Arial,Helvetica,sans-serif",
                    "line-height": z.height,
                    "text-transform": (n.fontcase === "upper") ? "uppercase"
							: undefined
                }));
                f(x + ":hover", b.extend(u(y), {
                    color: n.overcolor
                }));
                f(x + ".active", b.extend(u(A), {
                    color: n.activecolor
                }))
            }
            m.setContents(l)
        }
        function u(x) {
            if (!(x && x.src)) {
                return {}
            }
            return {
                background: "url(" + x.src + ") no-repeat left",
                "background-size": x.width + "px " + x.height + "px"
            }
        }
        this.element = function () {
            return m.element()
        };
        this.addOption = function (y, A) {
            var z = q(a, l);
            z.id = t + "_option_" + A;
            z.innerHTML = y;
            if (!b.isMobile()) {
                z.addEventListener("click", r(v.length, A))
            } else {
                var x = new b.touch(z);
                x.addEventListener(b.touchEvents.TAP, r(v.length, A))
            }
            v.push(z)
        };
        function r(x, y) {
            return function () {
                h(x);
                if (k) {
                    k(y)
                }
            }
        }
        this.clearOptions = function () {
            while (v.length > 0) {
                l.removeChild(v.pop())
            }
        };
        var h = this.setActive = function (x) {
            for (var y = 0; y < v.length; y++) {
                var z = v[y];
                z.className = z.className.replace(" active", "");
                if (y === x) {
                    z.className += " active"
                }
            }
        };
        function q(y, x) {
            var z = document.createElement("div");
            if (y) {
                z.className = y
            }
            if (x) {
                x.appendChild(z)
            }
            return z
        }
        function o(x) {
            var y = w.getSkinElement("tooltip", x);
            return y ? y : {
                width: 0,
                height: 0,
                src: undefined
            }
        }
        this.show = m.show;
        this.hide = m.hide;
        this.offsetX = m.offsetX;
        this.positionX = m.positionX;
        this.constrainX = m.constrainX;
        s()
    };
    function c(h) {
        return "." + h.replace(/ /g, " .")
    }
    f(c(g + " " + a), {
        cursor: "pointer",
        "white-space": "nowrap",
        position: "relative"
    })
})(jwplayer);
(function (c) {
    var b = c.html5, a = c.utils, d = c.events;
    b.model = function (h, e) {
        var n = this, j, p = a.getCookies(), f = {
            controlbar: {},
            display: {}
        }, g = a.noop, l = {
            autostart: false,
            controls: true,
            fullscreen: false,
            height: 320,
            mobilecontrols: false,
            mute: false,
            playlist: [],
            playlistposition: "none",
            playlistsize: 180,
            playlistlayout: "extended",
            repeat: false,
            stretching: a.stretching.UNIFORM,
            width: 480,
            volume: 90
        };
        function m(q) {
            a.foreach(q, function (r, s) {
                q[r] = a.serialize(s)
            });
            return q
        }
        function o() {
            a.extend(n, new d.eventdispatcher());
            n.config = m(a.extend({}, l, p, h));
            a.extend(n, {
                id: h.id,
                state: d.state.IDLE,
                duration: -1,
                position: 0,
                buffer: 0
            }, n.config);
            n.playlist = [];
            n.setItem(0)
        }
        var k = {};
        k[d.JWPLAYER_MEDIA_MUTE] = ["mute"];
        k[d.JWPLAYER_MEDIA_VOLUME] = ["volume"];
        k[d.JWPLAYER_PLAYER_STATE] = ["newstate->state"];
        k[d.JWPLAYER_MEDIA_BUFFER] = ["bufferPercent->buffer"];
        k[d.JWPLAYER_MEDIA_TIME] = ["position", "duration"];
        function i(q) {
            var x = k[q.type];
            if (x && x.length) {
                var w = false;
                for (var u = 0; u < x.length; u++) {
                    var s = x[u];
                    var t = s.split("->");
                    var v = t[0];
                    var r = t[1] || v;
                    if (n[r] !== q[v]) {
                        n[r] = q[v];
                        w = true
                    }
                }
                if (w) {
                    n.sendEvent(q.type, q)
                }
            } else {
                n.sendEvent(q.type, q)
            }
        }
        n.setVideoProvider = function (r) {
            if (j) {
                j.removeGlobalListener(i);
                var q = j.getContainer();
                if (q) {
                    j.remove();
                    r.setContainer(q)
                }
            }
            j = r;
            j.volume(n.volume);
            j.mute(n.mute);
            j.addGlobalListener(i)
        };
        n.destroy = function () {
            if (j) {
                j.removeGlobalListener(i);
                j.destroy()
            }
        };
        n.getVideo = function () {
            return j
        };
        n.seekDrag = function (q) {
            j.seekDrag(q)
        };
        n.setFullscreen = function (q) {
            q = !!q;
            if (q !== n.fullscreen) {
                n.fullscreen = q;
                n.sendEvent(d.JWPLAYER_FULLSCREEN, {
                    fullscreen: q
                })
            }
        };
        n.setPlaylist = function (q) {
            n.playlist = c.playlist.filterPlaylist(q, n.androidhls);
            if (n.playlist.length === 0) {
                n
						.sendEvent(
								d.JWPLAYER_ERROR,
								{
								    message: "Error loading playlist: No playable sources found"
								})
            } else {
                n.sendEvent(d.JWPLAYER_PLAYLIST_LOADED, {
                    playlist: c(n.id).getPlaylist()
                });
                n.item = -1;
                n.setItem(0)
            }
        };
        n.setItem = function (q) {
            var r;
            var u = false;
            if (q === n.playlist.length || q < -1) {
                r = 0;
                u = true
            } else {
                if (q === -1 || q > n.playlist.length) {
                    r = n.playlist.length - 1
                } else {
                    r = q
                }
            }
            if (u || r !== n.item) {
                n.item = r;
                n.sendEvent(d.JWPLAYER_PLAYLIST_ITEM, {
                    index: n.item
                });
                var s = n.playlist[r];
                var t = s && s.sources && s.sources[0];
                var v = b.chooseProvider(t);
                if (!(g instanceof v)) {
                    g = e || new v(n.id);
                    n.setVideoProvider(g)
                }
                if (g.init) {
                    g.init(s)
                }
            }
        };
        n.setVolume = function (q) {
            if (n.mute && q > 0) {
                n.setMute(false)
            }
            q = Math.round(q);
            if (!n.mute) {
                a.saveCookie("volume", q)
            }
            i({
                type: d.JWPLAYER_MEDIA_VOLUME,
                volume: q
            });
            j.volume(q)
        };
        n.setMute = function (q) {
            if (!a.exists(q)) {
                q = !n.mute
            }
            a.saveCookie("mute", q);
            i({
                type: d.JWPLAYER_MEDIA_MUTE,
                mute: q
            });
            j.mute(q)
        };
        n.componentConfig = function (q) {
            return f[q]
        };
        o()
    }
})(jwplayer);
(function (e) {
    var h = e.html5, l = e.utils, k = l.css, m = l.transitionStyle, b = ".jwoverlay", g = "jwcontents", d = "top", j = "bottom", i = "right", a = "left", c = "#ffffff", f = {
        fontcase: undefined,
        fontcolor: c,
        fontsize: 12,
        fontweight: undefined,
        activecolor: c,
        overcolor: c
    };
    h.overlay = function (z, B, x) {
        var C = this, p = z, u = B, D = x, v, G, A, n, o = l.extend({}, f, u
				.getComponentSettings("tooltip")), r = {};
        function w() {
            v = E(b.replace(".", ""));
            v.id = p;
            var I = q("arrow", "jwarrow");
            n = I[0];
            A = I[1];
            k.style(n, {
                position: "absolute",
                bottom: D ? undefined : 0,
                top: D ? 0 : undefined,
                width: A.width,
                height: A.height,
                left: "50%"
            });
            F(d, a);
            F(j, a);
            F(d, i);
            F(j, i);
            F(a);
            F(i);
            F(d);
            F(j);
            var H = q("background", "jwback");
            k.style(H[0], {
                left: r.left,
                right: r.right,
                top: r.top,
                bottom: r.bottom
            });
            G = E(g, v);
            k(s(g) + " *", {
                color: o.fontcolor,
                font: o.fontweight + " " + (o.fontsize)
						+ "px Arial,Helvetica,sans-serif",
                "text-transform": (o.fontcase === "upper") ? "uppercase"
						: undefined
            });
            if (D) {
                l.transform(s("jwarrow"), "rotate(180deg)")
            }
            k.style(v, {
                padding: (r.top + 1) + "px " + r.right + "px "
						+ (r.bottom + 1) + "px " + r.left + "px"
            });
            C.showing = false
        }
        function s(H) {
            return "#" + p + (H ? " ." + H : "")
        }
        function E(I, H) {
            var J = document.createElement("div");
            if (I) {
                J.className = I
            }
            if (H) {
                H.appendChild(J)
            }
            return J
        }
        function q(H, J) {
            var I = y(H), K = E(J, v);
            k.style(K, t(I));
            return [K, I]
        }
        function t(H) {
            return {
                background: "url(" + H.src + ") center",
                "background-size": H.width + "px " + H.height + "px"
            }
        }
        function F(N, M) {
            if (!M) {
                M = ""
            }
            var J = q("cap" + N + M, "jwborder jw" + N + (M ? M : "")), H = J[0], K = J[1], I = l
					.extend(
							t(K),
							{
							    width: (N === a || M === a || N === i || M === i) ? K.width
										: undefined,
							    height: (N === d || M === d || N === j || M === j) ? K.height
										: undefined
							});
            I[N] = ((N === j && !D) || (N === d && D)) ? A.height : 0;
            if (M) {
                I[M] = 0
            }
            k.style(H, I);
            var L = {}, P = {}, O = {
                left: K.width,
                right: K.width,
                top: (D ? A.height : 0) + K.height,
                bottom: (D ? 0 : A.height) + K.height
            };
            if (M) {
                L[M] = O[M];
                L[N] = 0;
                P[N] = O[N];
                P[M] = 0;
                k(s("jw" + N), L);
                k(s("jw" + M), P);
                r[N] = O[N];
                r[M] = O[M]
            }
        }
        C.element = function () {
            return v
        };
        C.setContents = function (H) {
            l.empty(G);
            G.appendChild(H)
        };
        C.positionX = function (H) {
            k.style(v, {
                left: Math.round(H)
            })
        };
        C.constrainX = function (H, I) {
            if (C.showing && H.width !== 0) {
                var J = C.offsetX(0);
                if (J) {
                    if (I) {
                        k.unblock()
                    }
                    var K = l.bounds(v);
                    if (K.width !== 0) {
                        if (K.right > H.right) {
                            C.offsetX(H.right - K.right)
                        } else {
                            if (K.left < H.left) {
                                C.offsetX(H.left - K.left)
                            }
                        }
                    }
                }
            }
        };
        C.offsetX = function (I) {
            I = Math.round(I);
            var H = v.clientWidth;
            if (H !== 0) {
                k.style(v, {
                    "margin-left": Math.round(-H / 2) + I
                });
                k.style(n, {
                    "margin-left": Math.round(-A.width / 2) - I
                })
            }
            return H
        };
        C.borderWidth = function () {
            return r.left
        };
        function y(H) {
            var I = u.getSkinElement("tooltip", H);
            if (I) {
                return I
            } else {
                return {
                    width: 0,
                    height: 0,
                    src: "",
                    image: undefined,
                    ready: false
                }
            }
        }
        C.show = function () {
            C.showing = true;
            k.style(v, {
                opacity: 1,
                visibility: "visible"
            })
        };
        C.hide = function () {
            C.showing = false;
            k.style(v, {
                opacity: 0,
                visibility: "hidden"
            })
        };
        w()
    };
    k(b, {
        position: "absolute",
        visibility: "hidden",
        opacity: 0
    });
    k(b + " .jwcontents", {
        position: "relative",
        "z-index": 1
    });
    k(b + " .jwborder", {
        position: "absolute",
        "background-size": "100% 100%"
    }, true);
    k(b + " .jwback", {
        position: "absolute",
        "background-size": "100% 100%"
    });
    m(b, "opacity .25s, visibility .25s")
})(jwplayer);
(function (c) {
    var b = c.html5, a = c.utils;
    b.player = function (f) {
        var o = this, p, l, m, n, e;
        function q() {
            p = new b.model(f);
            o.id = p.id;
            o._model = p;
            a.css.block(o.id);
            l = new b.view(o, p);
            m = new b.controller(p, l);
            h();
            o.initializeAPI = h;
            n = new b.setup(p, l);
            n.addEventListener(c.events.JWPLAYER_READY, i);
            n.addEventListener(c.events.JWPLAYER_ERROR, k);
            n.start()
        }
        function i(r) {
            m.playerReady(r);
            a.css.unblock(o.id)
        }
        function k(r) {
            a.css.unblock(o.id);
            c(o.id).dispatchEvent(c.events.JWPLAYER_SETUP_ERROR, r)
        }
        function g() {
            var t = p.playlist, r = [];
            for (var s = 0; s < t.length; s++) {
                r.push(d(t[s]))
            }
            return r
        }
        function d(r) {
            var s = {
                description: r.description,
                file: r.file,
                image: r.image,
                mediaid: r.mediaid,
                title: r.title
            };
            a.foreach(r, function (t, u) {
                s[t] = u
            });
            s.sources = [];
            s.tracks = [];
            if (r.sources.length > 0) {
                a.foreach(r.sources, function (t, u) {
                    var v = {
                        file: u.file,
                        type: u.type ? u.type : undefined,
                        label: u.label,
                        "default": u["default"] ? true : false
                    };
                    s.sources.push(v)
                })
            }
            if (r.tracks.length > 0) {
                a.foreach(r.tracks, function (v, u) {
                    var t = {
                        file: u.file,
                        kind: u.kind ? u.kind : undefined,
                        label: u.label,
                        "default": u["default"] ? true : false
                    };
                    s.tracks.push(t)
                })
            }
            if (!r.file && r.sources.length > 0) {
                s.file = r.sources[0].file
            }
            return s
        }
        function h() {
            o.jwPlay = m.play;
            o.jwPause = m.pause;
            o.jwStop = m.stop;
            o.jwSeek = m.seek;
            o.jwSetVolume = m.setVolume;
            o.jwSetMute = m.setMute;
            o.jwLoad = m.load;
            o.jwPlaylistNext = m.next;
            o.jwPlaylistPrev = m.prev;
            o.jwPlaylistItem = m.item;
            o.jwSetFullscreen = m.setFullscreen;
            o.jwResize = l.resize;
            o.jwSeekDrag = p.seekDrag;
            o.jwGetQualityLevels = m.getQualityLevels;
            o.jwGetCurrentQuality = m.getCurrentQuality;
            o.jwSetCurrentQuality = m.setCurrentQuality;
            o.jwGetAudioTracks = m.getAudioTracks;
            o.jwGetCurrentAudioTrack = m.getCurrentAudioTrack;
            o.jwSetCurrentAudioTrack = m.setCurrentAudioTrack;
            o.jwGetCaptionsList = m.getCaptionsList;
            o.jwGetCurrentCaptions = m.getCurrentCaptions;
            o.jwSetCurrentCaptions = m.setCurrentCaptions;
            o.jwGetSafeRegion = l.getSafeRegion;
            o.jwForceState = l.forceState;
            o.jwReleaseState = l.releaseState;
            o.jwGetPlaylistIndex = j("item");
            o.jwGetPosition = j("position");
            o.jwGetDuration = j("duration");
            o.jwGetBuffer = j("buffer");
            o.jwGetWidth = j("width");
            o.jwGetHeight = j("height");
            o.jwGetFullscreen = j("fullscreen");
            o.jwGetVolume = j("volume");
            o.jwGetMute = j("mute");
            o.jwGetState = j("state");
            o.jwGetStretching = j("stretching");
            o.jwGetPlaylist = g;
            o.jwGetControls = j("controls");
            o.jwDetachMedia = m.detachMedia;
            o.jwAttachMedia = m.attachMedia;
            o.jwPlayAd = function (s) {
                var r = c(o.id).plugins;
                if (r.vast) {
                    r.vast.jwPlayAd(s)
                }
            };
            o.jwPauseAd = function () {
                var r = c(o.id).plugins;
                if (r.googima) {
                    r.googima.jwPauseAd()
                }
            };
            o.jwDestroyGoogima = function () {
                var r = c(o.id).plugins;
                if (r.googima) {
                    r.googima.jwDestroyGoogima()
                }
            };
            o.jwInitInstream = function () {
                o.jwInstreamDestroy();
                e = new b.instream(o, p, l, m);
                e.init()
            };
            o.jwLoadItemInstream = function (s, r) {
                if (!e) {
                    throw "Instream player undefined"
                }
                e.load(s, r)
            };
            o.jwLoadArrayInstream = function (s, r) {
                if (!e) {
                    throw "Instream player undefined"
                }
                e.load(s, r)
            };
            o.jwSetControls = function (r) {
                l.setControls(r);
                if (e) {
                    e.setControls(r)
                }
            };
            o.jwInstreamPlay = function () {
                if (e) {
                    e.jwInstreamPlay()
                }
            };
            o.jwInstreamPause = function () {
                if (e) {
                    e.jwInstreamPause()
                }
            };
            o.jwInstreamState = function () {
                if (e) {
                    return e.jwInstreamState()
                }
                return ""
            };
            o.jwInstreamDestroy = function (r, s) {
                s = s || e;
                if (s) {
                    s.jwInstreamDestroy(r || false);
                    if (s === e) {
                        e = undefined
                    }
                }
            };
            o.jwInstreamAddEventListener = function (r, s) {
                if (e) {
                    e.jwInstreamAddEventListener(r, s)
                }
            };
            o.jwInstreamRemoveEventListener = function (r, s) {
                if (e) {
                    e.jwInstreamRemoveEventListener(r, s)
                }
            };
            o.jwPlayerDestroy = function () {
                if (m) {
                    m.stop()
                }
                if (l) {
                    l.destroy()
                }
                if (p) {
                    p.destroy()
                }
                if (n) {
                    n.resetEventListeners();
                    n.destroy()
                }
            };
            o.jwInstreamSetText = function (r) {
                if (e) {
                    e.jwInstreamSetText(r)
                }
            };
            o.jwIsBeforePlay = function () {
                return m.checkBeforePlay()
            };
            o.jwIsBeforeComplete = function () {
                return p.getVideo().checkComplete()
            };
            o.jwSetCues = l.addCues;
            o.jwAddEventListener = m.addEventListener;
            o.jwRemoveEventListener = m.removeEventListener;
            o.jwDockAddButton = l.addButton;
            o.jwDockRemoveButton = l.removeButton
        }
        function j(r) {
            return function () {
                return p[r]
            }
        }
        q()
    }
})(window.jwplayer);
(function (c) {
    var a = "#FFFFFF", b = "#CCCCCC", g = "#333333", e = "#999999", d = {
        size: 180,
        backgroundcolor: g,
        fontcolor: e,
        overcolor: b,
        activecolor: b,
        titlecolor: b,
        titleovercolor: a,
        titleactivecolor: a,
        fontweight: "normal",
        titleweight: "normal",
        fontsize: 11,
        titlesize: 13
    }, f = c.html5, l = c.events, j = c.utils, h = j.css, i = j.isMobile(), k = ".jwplaylist";
    f.playlistcomponent = function (E, P) {
        var I = E, x = I.skin, o = j.extend({}, d, I.skin
				.getComponentSettings("playlist"), P), J, y, m, q, w = -1, z, p, r = 76, s = {
				    background: undefined,
				    divider: undefined,
				    item: undefined,
				    itemOver: undefined,
				    itemImage: undefined,
				    itemActive: undefined
				}, v, K = this;
        K.element = function () {
            return J
        };
        K.redraw = function () {
            if (p) {
                p.redraw()
            }
        };
        K.show = function () {
            j.show(J)
        };
        K.hide = function () {
            j.hide(J)
        };
        function u() {
            J = N("div", "jwplaylist");
            J.id = I.id + "_jwplayer_playlistcomponent";
            v = (I._model.playlistlayout === "basic");
            y = N("div", "jwlistcontainer");
            O(J, y);
            M();
            if (v) {
                r = 32
            }
            if (s.divider) {
                r += s.divider.height
            }
            C();
            I.jwAddEventListener(l.JWPLAYER_PLAYLIST_LOADED, F);
            I.jwAddEventListener(l.JWPLAYER_PLAYLIST_ITEM, H);
            I.jwAddEventListener(l.JWPLAYER_RESIZE, n)
        }
        function n() {
            K.redraw()
        }
        function t(Q) {
            return "#" + J.id + (Q ? " ." + Q : "")
        }
        function C() {
            var T = 0, S = 0, Q = 0;
            j.clearCss(t());
            h(t(), {
                "background-color": o.backgroundcolor
            });
            h(t("jwlist"), {
                "background-image": s.background ? " url(" + s.background.src
						+ ")" : ""
            });
            h(t("jwlist *"), {
                color: o.fontcolor,
                font: o.fontweight + " " + o.fontsize
						+ "px Arial, Helvetica, sans-serif"
            });
            if (s.itemImage) {
                T = (r - s.itemImage.height) / 2 + "px ";
                S = s.itemImage.width;
                Q = s.itemImage.height
            } else {
                S = r * 4 / 3;
                Q = r
            }
            if (s.divider) {
                h(t("jwplaylistdivider"), {
                    "background-image": "url(" + s.divider.src + ")",
                    "background-size": "100% " + s.divider.height + "px",
                    width: "100%",
                    height: s.divider.height
                })
            }
            h(t("jwplaylistimg"), {
                height: Q,
                width: S,
                margin: T ? (T + "0 " + T + T) : "0 5px 0 0"
            });
            h(t("jwlist li"), {
                "background-image": s.item ? "url(" + s.item.src + ")" : "",
                height: r,
                overflow: "hidden",
                "background-size": "100% " + r + "px",
                cursor: "pointer"
            });
            var R = {
                overflow: "hidden"
            };
            if (o.activecolor !== "") {
                R.color = o.activecolor
            }
            if (s.itemActive) {
                R["background-image"] = "url(" + s.itemActive.src + ")"
            }
            h(t("jwlist li.active"), R);
            h(t("jwlist li.active .jwtitle"), {
                color: o.titleactivecolor
            });
            h(t("jwlist li.active .jwdescription"), {
                color: o.activecolor
            });
            var U = {
                overflow: "hidden"
            };
            if (o.overcolor !== "") {
                U.color = o.overcolor
            }
            if (s.itemOver) {
                U["background-image"] = "url(" + s.itemOver.src + ")"
            }
            if (!i) {
                h(t("jwlist li:hover"), U);
                h(t("jwlist li:hover .jwtitle"), {
                    color: o.titleovercolor
                });
                h(t("jwlist li:hover .jwdescription"), {
                    color: o.overcolor
                })
            }
            h(t("jwtextwrapper"), {
                height: r,
                position: "relative"
            });
            h(t("jwtitle"), {
                overflow: "hidden",
                display: "inline-block",
                height: v ? r : 20,
                color: o.titlecolor,
                "font-size": o.titlesize,
                "font-weight": o.titleweight,
                "margin-top": v ? "0 10px" : 10,
                "margin-left": 10,
                "margin-right": 10,
                "line-height": v ? r : 20
            });
            h(t("jwdescription"), {
                display: "block",
                "font-size": o.fontsize,
                "line-height": 18,
                "margin-left": 10,
                "margin-right": 10,
                overflow: "hidden",
                height: 36,
                position: "relative"
            })
        }
        function B() {
            var Q = N("ul", "jwlist");
            Q.id = J.id + "_ul" + Math.round(Math.random() * 10000000);
            return Q
        }
        function D(U) {
            var Z = m[U], Y = N("li", "jwitem"), R;
            Y.id = q.id + "_item_" + U;
            if (U > 0) {
                R = N("div", "jwplaylistdivider");
                O(Y, R)
            } else {
                var S = s.divider ? s.divider.height : 0;
                Y.style.height = (r - S) + "px";
                Y.style["background-size"] = "100% " + (r - S) + "px"
            }
            var V = N("div", "jwplaylistimg jwfill");
            var X;
            if (Z["playlist.image"] && s.itemImage) {
                X = Z["playlist.image"]
            } else {
                if (Z.image && s.itemImage) {
                    X = Z.image
                } else {
                    if (s.itemImage) {
                        X = s.itemImage.src
                    }
                }
            }
            if (X && !v) {
                h("#" + Y.id + " .jwplaylistimg", {
                    "background-image": X
                });
                O(Y, V)
            }
            var Q = N("div", "jwtextwrapper");
            var W = N("span", "jwtitle");
            W.innerHTML = (Z && Z.title) ? Z.title : "";
            O(Q, W);
            if (Z.description && !v) {
                var T = N("span", "jwdescription");
                T.innerHTML = Z.description;
                O(Q, T)
            }
            O(Y, Q);
            return Y
        }
        function N(R, Q) {
            var S = document.createElement(R);
            if (Q) {
                S.className = Q
            }
            return S
        }
        function O(Q, R) {
            Q.appendChild(R)
        }
        function F() {
            y.innerHTML = "";
            m = G();
            if (!m) {
                return
            }
            q = B();
            for (var R = 0; R < m.length; R++) {
                var Q = D(R);
                if (i) {
                    var S = new j.touch(Q);
                    S.addEventListener(j.touchEvents.TAP, L(R))
                } else {
                    Q.onclick = L(R)
                }
                O(q, Q)
            }
            w = I.jwGetPlaylistIndex();
            O(y, q);
            p = new f.playlistslider(J.id + "_slider", I.skin, J, q)
        }
        function G() {
            var R = I.jwGetPlaylist();
            var S = [];
            for (var Q = 0; Q < R.length; Q++) {
                if (!R[Q]["ova.hidden"]) {
                    S.push(R[Q])
                }
            }
            return S
        }
        function L(Q) {
            return function () {
                z = Q;
                I.jwPlaylistItem(Q);
                I.jwPlay(true)
            }
        }
        function A() {
            var Q = I.jwGetPlaylistIndex();
            if (Q === z) {
                return
            }
            z = -1;
            if (p && p.visible()) {
                p.thumbPosition(Q / (I.jwGetPlaylist().length - 1))
            }
        }
        function H(Q) {
            if (w >= 0) {
                document.getElementById(q.id + "_item_" + w).className = "jwitem";
                w = Q.index
            }
            document.getElementById(q.id + "_item_" + Q.index).className = "jwitem active";
            A()
        }
        function M() {
            j.foreach(s, function (Q) {
                s[Q] = x.getSkinElement("playlist", Q)
            })
        }
        u();
        return this
    };
    h(k, {
        position: "absolute",
        width: "100%",
        height: "100%"
    });
    j.dragStyle(k, "none");
    h(k + " .jwplaylistimg", {
        position: "relative",
        width: "100%",
        "float": "left",
        margin: "0 5px 0 0",
        background: "#000",
        overflow: "hidden"
    });
    h(k + " .jwlist", {
        position: "absolute",
        width: "100%",
        "list-style": "none",
        margin: 0,
        padding: 0,
        overflow: "hidden"
    });
    h(k + " .jwlistcontainer", {
        position: "absolute",
        overflow: "hidden",
        width: "100%",
        height: "100%"
    });
    h(k + " .jwlist li", {
        width: "100%"
    });
    h(k + " .jwtextwrapper", {
        overflow: "hidden"
    });
    h(k + " .jwplaylistdivider", {
        position: "absolute"
    });
    if (i) {
        j.transitionStyle(k + " .jwlist", "top .35s")
    }
})(jwplayer);
(function (i) {
    var r = jwplayer.utils, n = r.touchEvents, m = r.css, a = "jwslider", p = "jwslidertop", g = "jwsliderbottom", e = "jwrail", q = "jwrailtop", o = "jwrailback", l = "jwrailbottom", b = "jwthumb", u = "jwthumbtop", h = "jwthumbback", t = "jwthumbbottom", d = document, s = window, v, f = "absolute", j = "hidden", k = "100%";
    i.playlistslider = function (U, M, I, Y) {
        var N = M, Z = Y, ag, D, ad, R, ah = 0, V, ae, B = r.isMobile(), aj, ak = true, E, Q, ac, y, ab, w, F, P, T, af, K;
        this.element = function () {
            return ag
        };
        this.visible = function () {
            return ak
        };
        function H() {
            var am, al;
            ag = ai(a, null, I);
            ag.id = U;
            aj = new r.touch(Z);
            if (B) {
                aj.addEventListener(n.DRAG, X)
            } else {
                ag.addEventListener("mousedown", C, false);
                ag.addEventListener("click", aa, false)
            }
            O();
            T = E.height;
            af = Q.height;
            m(W(), {
                width: ac.width
            });
            m(W(e), {
                top: T,
                bottom: af
            });
            m(W(b), {
                top: T
            });
            am = ai(p, E, ag);
            al = ai(g, Q, ag);
            D = ai(e, null, ag);
            ad = ai(b, null, ag);
            if (!B) {
                am.addEventListener("mousedown", x(-1), false);
                al.addEventListener("mousedown", x(1), false)
            }
            ai(q, y, D);
            ai(o, ac, D, true);
            ai(l, ab, D);
            m(W(o), {
                top: y.height,
                bottom: ab.height
            });
            ai(u, F, ad);
            ai(h, w, ad, true);
            ai(t, P, ad);
            m(W(h), {
                top: F.height,
                bottom: P.height
            });
            J();
            if (Z) {
                if (!B) {
                    Z.addEventListener("mousewheel", A, false);
                    Z.addEventListener("DOMMouseScroll", A, false)
                }
            }
        }
        function W(al) {
            return "#" + ag.id + (al ? " ." + al : "")
        }
        function ai(ao, an, am, al) {
            var ap = d.createElement("div");
            if (ao) {
                ap.className = ao;
                if (an) {
                    m(W(ao), {
                        "background-image": an.src ? an.src : v,
                        "background-repeat": al ? "repeat-y" : "no-repeat",
                        height: al ? v : an.height
                    })
                }
            }
            if (am) {
                am.appendChild(ap)
            }
            return ap
        }
        function O() {
            E = G("sliderCapTop");
            Q = G("sliderCapBottom");
            ac = G("sliderRail");
            y = G("sliderRailCapTop");
            ab = G("sliderRailCapBottom");
            w = G("sliderThumb");
            F = G("sliderThumbCapTop");
            P = G("sliderThumbCapBottom")
        }
        function G(al) {
            var am = N.getSkinElement("playlist", al);
            return am ? am : {
                width: 0,
                height: 0,
                src: v
            }
        }
        var J = this.redraw = function () {
            clearTimeout(K);
            K = setTimeout(function () {
                if (Z && Z.clientHeight) {
                    S(Z.parentNode.clientHeight / Z.clientHeight)
                } else {
                    K = setTimeout(J, 10)
                }
            }, 0)
        };
        function A(al) {
            if (!ak) {
                return
            }
            al = al ? al : s.event;
            var am = al.detail ? al.detail * -1 : al.wheelDelta / 40;
            L(ah - am / 10);
            if (al.stopPropagation) {
                al.stopPropagation()
            }
            if (al.preventDefault) {
                al.preventDefault()
            } else {
                al.returnValue = false
            }
            al.cancelBubble = true;
            al.cancel = true;
            return false
        }
        function S(al) {
            if (al < 0) {
                al = 0
            }
            if (al > 1) {
                ak = false
            } else {
                ak = true;
                m(W(b), {
                    height: Math.max(D.clientHeight * al, F.height + P.height)
                })
            }
            m(W(), {
                visibility: ak ? "visible" : j
            });
            if (Z) {
                Z.style.width = ak ? Z.parentElement.clientWidth - ac.width
						+ "px" : ""
            }
        }
        var L = this.thumbPosition = function (al) {
            if (isNaN(al)) {
                al = 0
            }
            ah = Math.max(0, Math.min(1, al));
            m(W(b), {
                top: T + (D.clientHeight - ad.clientHeight) * ah
            });
            if (Y) {
                Y.style.top = Math.min(0, ag.clientHeight - Y.scrollHeight)
						* ah + "px"
            }
        };
        function C(al) {
            if (al.button === 0) {
                R = true
            }
            d.onselectstart = function () {
                return false
            };
            s.addEventListener("mousemove", aa, false);
            s.addEventListener("mouseup", z, false)
        }
        function X(al) {
            L(ah - (al.deltaY * 2 / Z.clientHeight))
        }
        function aa(al) {
            if (R || al.type === "click") {
                var aq = r.bounds(D), an = ad.clientHeight / 2, am = aq.height
						- an, ap = al.pageY - aq.top, ao = (ap - an)
						/ (am - an);
                L(ao)
            }
        }
        function x(al) {
            return function (am) {
                if (am.button > 0) {
                    return
                }
                L(ah + (al * 0.05));
                V = setTimeout(function () {
                    ae = setInterval(function () {
                        L(ah + (al * 0.05))
                    }, 50)
                }, 500)
            }
        }
        function z() {
            R = false;
            s.removeEventListener("mousemove", aa);
            s.removeEventListener("mouseup", z);
            d.onselectstart = v;
            clearTimeout(V);
            clearInterval(ae)
        }
        H();
        return this
    };
    function c() {
        var w = [], x;
        for (x = 0; x < arguments.length; x++) {
            w.push(".jwplaylist ." + arguments[x])
        }
        return w.join(",")
    }
    m(c(a), {
        position: f,
        height: k,
        visibility: j,
        right: 0,
        top: 0,
        cursor: "pointer",
        "z-index": 1,
        overflow: j
    });
    m(c(a) + " *", {
        position: f,
        width: k,
        "background-position": "center",
        "background-size": k + " " + k,
        overflow: j
    });
    m(c(p, q, u), {
        top: 0
    });
    m(c(g, l, t), {
        bottom: 0
    })
})(jwplayer.html5);
(function (e) {
    var k = jwplayer.utils, i = k.css, a = "About JW Player ", l = "http://11.12.112.243/JwPlayer/jwpabout.htm", j = document, h = ".jwclick", g = h
			+ "_item", f = "100%", d = "5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset", b = "none", c = "#FFF";
    e.rightclick = function (q, o) {
        var w = q, p, v = k.extend({
            aboutlink: l + e.version + "&m=h&e=o",
            abouttext: a + e.version + "..."
        }, o), m = false, x, r;
        function u() {
            p = j.getElementById(w.id);
            x = s(h);
            x.id = w.id + "_menu";
            x.style.display = b;
            p.oncontextmenu = n;
            x.onmouseover = function () {
                m = true
            };
            x.onmouseout = function () {
                m = false
            };
            j.addEventListener("mousedown", y, false);
            r = s(g);
            r.innerHTML = v.abouttext;
            r.onclick = t;
            x.appendChild(r);
            p.appendChild(x)
        }
        function s(z) {
            var A = j.createElement("div");
            A.className = z.replace(".", "");
            return A
        }
        function t() {
            window.top.location = v.aboutlink
        }
        function n(A) {
            var C, z, B;
            if (m) {
                return
            }
            A = A || window.event;
            C = A.target || A.srcElement;
            z = k.bounds(p);
            B = k.bounds(C);
            x.style.display = b;
            x.style.left = (A.offsetX ? A.offsetX : A.layerX) + B.left - z.left
					+ "px";
            x.style.top = (A.offsetY ? A.offsetY : A.layerY) + B.top - z.top
					+ "px";
            x.style.display = "block";
            A.preventDefault()
        }
        function y() {
            if (m) {
                return
            } else {
                x.style.display = b
            }
        }
        this.element = function () {
            return x
        };
        this.destroy = function () {
            j.removeEventListener("mousedown", y, false)
        };
        u()
    };
    i(h, {
        "background-color": c,
        "-webkit-border-radius": 5,
        "-moz-border-radius": 5,
        "border-radius": 5,
        height: "auto",
        border: "1px solid #bcbcbc",
        "font-family": "'MS Sans Serif', 'Geneva', sans-serif",
        "font-size": 10,
        width: 320,
        "-webkit-box-shadow": d,
        "-moz-box-shadow": d,
        "box-shadow": d,
        position: "absolute",
        "z-index": 999
    }, true);
    i(h + " div", {
        padding: "8px 21px",
        margin: "0px",
        "background-color": c,
        border: "none",
        "font-family": "'MS Sans Serif', 'Geneva', sans-serif",
        "font-size": 10,
        color: "inherit"
    }, true);
    i(g, {
        padding: "8px 21px",
        "text-align": "left",
        cursor: "pointer"
    }, true);
    i(g + ":hover", {
        "background-color": "#595959",
        color: c
    }, true);
    i(g + " a", {
        "text-decoration": b,
        color: "#000"
    }, true);
    i(h + " hr", {
        width: f,
        padding: 0,
        margin: 0,
        border: "1px #e9e9e9 solid"
    }, true)
})(jwplayer.html5);
(function (d) {
    var b = d.html5, a = d.utils, c = d._, e = d.events;
    b.setup = function (k, v) {
        var x = k, h = v, q, p = new e.eventdispatcher(), l = false;
        var F = {
            method: g,
            depends: []
        }, j = {
            method: E,
            depends: [F]
        }, D = {
            method: o,
            depends: [F]
        }, B = {
            method: C,
            depends: [D, j]
        }, r = {
            method: w,
            depends: [B, D]
        }, A = {
            method: t,
            depends: [r]
        };
        var m = [F, j, D, B, r, A];
        this.start = function () {
            c.defer(u)
        };
        function u() {
            if (this.cancelled) {
                return
            }
            for (var H = 0; H < m.length; H++) {
                var G = m[H];
                if (z(G.depends)) {
                    m.splice(H, 1);
                    G.method();
                    c.defer(u)
                }
            }
        }
        function z(G) {
            return c.all(c.map(G, c.property("complete")))
        }
        function f(G) {
            G.complete = true;
            if (m.length > 0 && !l) {
                c.defer(u)
            }
        }
        function g() {
            if (k.edition && k.edition() === "invalid") {
                n("Error setting up player: Invalid license key")
            } else {
                f(F)
            }
        }
        function E() {
            q = new b.skin();
            q.load(x.config.skin, s, y)
        }
        function s() {
            f(j)
        }
        function y(G) {
            n("Error loading skin: " + G)
        }
        function o() {
            var G = a.typeOf(x.config.playlist);
            if (G === "array") {
                i(new d.playlist(x.config.playlist))
            } else {
                n("Playlist type not supported: " + G)
            }
        }
        function i(G) {
            x.setPlaylist(G);
            if (x.playlist.length === 0 || x.playlist[0].sources.length === 0) {
                n("Error loading playlist: No playable sources found")
            } else {
                f(D)
            }
        }
        function C() {
            h.setup(q);
            f(B)
        }
        function w() {
            f(r)
        }
        function t() {
            if (this.cancelled) {
                return
            }
            p.sendEvent(e.JWPLAYER_READY);
            f(A)
        }
        function n(G) {
            l = true;
            p.sendEvent(e.JWPLAYER_ERROR, {
                message: G
            });
            h.setupError(G)
        }
        this.destroy = function () {
            this.cancelled = true
        };
        a.extend(this, p)
    }
})(jwplayer);
(function (a) {
    a.skin = function () {
        var b = {};
        var d = false;
        this.load = function (g, f, e) {
            new a.skinloader(g, function (h) {
                d = true;
                b = h;
                if (typeof f === "function") {
                    f()
                }
            }, function (h) {
                if (typeof e === "function") {
                    e(h)
                }
            })
        };
        this.getSkinElement = function (e, f) {
            e = c(e);
            f = c(f);
            if (d) {
                try {
                    return b[e].elements[f]
                } catch (g) {
                    jwplayer.utils.log("No such skin component / element: ", [
							e, f])
                }
            }
            return null
        };
        this.getComponentSettings = function (e) {
            e = c(e);
            if (d && b && b[e]) {
                return b[e].settings
            }
            return null
        };
        this.getComponentLayout = function (e) {
            e = c(e);
            if (d) {
                var f = b[e].layout;
                if (f && (f.left || f.right || f.center)) {
                    return b[e].layout
                }
            }
            return null
        };
        function c(e) {
            return e.toLowerCase()
        }
    }
})(jwplayer.html5);
(function (b) {
    var a = jwplayer.utils, c = "Skin formatting error";
    b.skinloader = function (e, j, g) {
        var h = {}, l = j, r = g, p = true, s = e, f = false, u = jwplayer.utils
				.isMobile() ? 1 : 1, t = 1;
        function w() {
            if (typeof s !== "string" || s === "") {
                v(b.defaultskin())
            } else {
                if (a.extension(s) !== "xml") {
                    r("Skin not a valid file type");
                    return
                }
                new b.skinloader("", m, r)
            }
        }
        function m(x) {
            h = x;
            a.ajax(a.getAbsolutePath(s), function (y) {
                try {
                    if (a.exists(y.responseXML)) {
                        v(y.responseXML)
                    }
                } catch (z) {
                    r(c)
                }
            }, function (y) {
                r(y)
            })
        }
        function k(x, y) {
            return x ? x.getElementsByTagName(y) : null
        }
        function v(D) {
            var C = k(D, "skin")[0], L = k(C, "component"), W = C
					.getAttribute("target"), G = parseFloat(C
					.getAttribute("pixelratio"));
            if (G > 0) {
                t = G
            }
            if (!a.versionCheck(W)) {
                r("Incompatible player version")
            }
            if (L.length === 0) {
                l(h);
                return
            }
            for (var O = 0; O < L.length; O++) {
                var J = i(L[O].getAttribute("name")), I = {
                    settings: {},
                    elements: {},
                    layout: {}
                }, N = k(k(L[O], "elements")[0], "element");
                h[J] = I;
                for (var M = 0; M < N.length; M++) {
                    n(N[M], J)
                }
                var E = k(L[O], "settings")[0];
                if (E && E.childNodes.length > 0) {
                    var Q = k(E, "setting");
                    for (var V = 0; V < Q.length; V++) {
                        var X = Q[V].getAttribute("name");
                        var P = Q[V].getAttribute("value");
                        if (/color$/.test(X)) {
                            P = a.stringToColor(P)
                        }
                        I.settings[i(X)] = P
                    }
                }
                var R = k(L[O], "layout")[0];
                if (R && R.childNodes.length > 0) {
                    var S = k(R, "group");
                    for (var A = 0; A < S.length; A++) {
                        var H = S[A], F = {
                            elements: []
                        };
                        I.layout[i(H.getAttribute("position"))] = F;
                        for (var U = 0; U < H.attributes.length; U++) {
                            var K = H.attributes[U];
                            F[K.name] = K.value
                        }
                        var T = k(H, "*");
                        for (var z = 0; z < T.length; z++) {
                            var y = T[z];
                            F.elements.push({
                                type: y.tagName
                            });
                            for (var B = 0; B < y.attributes.length; B++) {
                                var x = y.attributes[B];
                                F.elements[z][i(x.name)] = x.value
                            }
                            if (!a.exists(F.elements[z].name)) {
                                F.elements[z].name = y.tagName
                            }
                        }
                    }
                }
                p = false;
                d()
            }
        }
        function n(C, B) {
            B = i(B);
            var A = new Image(), x = i(C.getAttribute("name")), z = C
					.getAttribute("src"), E;
            if (z.indexOf("data:image/png;base64,") === 0) {
                E = z
            } else {
                var y = a.getAbsolutePath(s);
                var D = y.substr(0, y.lastIndexOf("/"));
                E = [D, B, z].join("/")
            }
            h[B].elements[x] = {
                height: 0,
                width: 0,
                src: "",
                ready: false,
                image: A
            };
            A.onload = function () {
                o(A, x, B)
            };
            A.onerror = function () {
                f = true;
                r("Skin image not found: " + this.src)
            };
            A.src = E
        }
        function d() {
            var z = true;
            for (var x in h) {
                if (x !== "properties" && h.hasOwnProperty(x)) {
                    var A = h[x].elements;
                    for (var y in A) {
                        if (A.hasOwnProperty(y)) {
                            z &= q(x, y).ready
                        }
                    }
                }
            }
            if (!z) {
                return
            }
            if (!p) {
                l(h)
            }
        }
        function o(y, A, z) {
            var x = q(z, A);
            if (x) {
                x.height = Math.round((y.height / t) * u);
                x.width = Math.round((y.width / t) * u);
                x.src = y.src;
                x.ready = true;
                d()
            } else {
                a.log("Loaded an image for a missing element: " + z + "." + A)
            }
        }
        function q(x, y) {
            return h[i(x)] ? h[i(x)].elements[i(y)] : null
        }
        function i(x) {
            return x ? x.toLowerCase() : ""
        }
        w()
    }
})(jwplayer.html5);
(function (c) {
    var b = c.html5, a = c.utils, d = c.events, e = a.css;
    b.thumbs = function (g) {
        var n, j, p, t, o = g, k, i = {}, m, h = new d.eventdispatcher();
        a.extend(this, h);
        n = document.createElement("div");
        n.id = o;
        function s(u) {
            e.style(n, {
                display: "none"
            });
            if (t) {
                t.onload = null;
                t.onreadystatechange = null;
                t.onerror = null;
                if (t.abort) {
                    t.abort()
                }
                t = null
            }
            if (m) {
                m.onload = null
            }
            if (u) {
                p = u.split("?")[0].split("/").slice(0, -1).join("/");
                t = a.ajax(u, q, r, true)
            } else {
                j = k = m = null;
                i = {}
            }
        }
        function q(u) {
            t = null;
            try {
                u = new c.parsers.srt().parse(u.responseText, true)
            } catch (v) {
                r(v.message);
                return
            }
            if (a.typeOf(u) !== "array") {
                return r("Invalid data")
            }
            j = u
        }
        function r(u) {
            t = null;
            a.log("Thumbnails could not be loaded: " + u)
        }
        function f(v, A) {
            if (v && v !== k) {
                k = v;
                if (v.indexOf("://") < 0) {
                    v = p ? p + "/" + v : v
                }
                var x = {
                    display: "block",
                    margin: "0 auto",
                    "background-position": "0 0",
                    width: 0,
                    height: 0
                };
                var w = v.indexOf("#xywh");
                if (w > 0) {
                    try {
                        var u = (/(.+)\#xywh=(\d+),(\d+),(\d+),(\d+)/).exec(v);
                        v = u[1];
                        x["background-position"] = (u[2] * -1) + "px "
								+ (u[3] * -1) + "px";
                        x.width = u[4];
                        x.height = u[5]
                    } catch (z) {
                        r("Could not parse thumbnail");
                        return
                    }
                }
                var y = i[v];
                if (!y) {
                    y = new Image();
                    y.onload = function () {
                        l(y, x, A)
                    };
                    i[v] = y;
                    y.src = v
                } else {
                    l(y, x, A)
                }
                if (m) {
                    m.onload = null
                }
                m = y
            }
        }
        function l(v, u, w) {
            v.onload = null;
            if (!u.width) {
                u.width = v.width;
                u.height = v.height
            }
            u["background-image"] = v.src;
            e.style(n, u);
            if (w) {
                w(u.width)
            }
        }
        this.load = function (u) {
            s(u)
        };
        this.element = function () {
            return n
        };
        this.updateTimeline = function (w, x) {
            if (!j) {
                return
            }
            var v = 0;
            while (v < j.length && w > j[v].end) {
                v++
            }
            if (v === j.length) {
                v--
            }
            var u = j[v].text;
            f(u, x);
            return u
        }
    }
})(jwplayer);
(function (k) {
    var p = k.jwplayer, l = p.html5, y = p.utils, c = p.events, i = c.state, s = y.css, t = y.bounds, w = y
			.isMobile(), g = y.isIPad(), B = y.isIPod(), q = "jwplayer", e = "aspectMode", d = "."
			+ q + ".jwfullscreen", r = "jwmain", A = "jwinstream", z = "jwvideo", f = "jwcontrols", b = "jwaspect", h = "jwplaylistcontainer", x = [
			"fullscreenchange", "webkitfullscreenchange",
			"mozfullscreenchange", "MSFullscreenChange"], v = "opacity .25s ease", o = "100%", j = "absolute", u = " !important", m = "hidden", a = "none", n = "block";
    l.view = function (aQ, E) {
        var a4, a8, aX, Z, Q, aZ = -1, aH = w ? 4000 : 2000, av, at, Y, ae, aG, J, X, aD = false, a1, af, be, aE, L, az = y
				.extend({}, E.componentConfig("logo")), aY, N, aL, ao = false, ap = false, R = null, ax, an, a7 = -1, O = false, ar, H, ac, bd = false, aF = false, U = y
				.extend(this, new c.eventdispatcher());
        function aR() {
            a4 = a3("div", q + " playlist-" + E.playlistposition);
            a4.id = aQ.id;
            a4.tabIndex = 0;
            H = a4.requestFullscreen || a4.webkitRequestFullscreen
					|| a4.webkitRequestFullScreen || a4.mozRequestFullScreen
					|| a4.msRequestFullscreen;
            ac = document.exitFullscreen || document.webkitExitFullscreen
					|| document.webkitCancelFullScreen
					|| document.mozCancelFullScreen
					|| document.msExitFullscreen;
            bd = H && ac;
            if (E.aspectratio) {
                s.style(a4, {
                    display: "inline-block"
                });
                a4.className = a4.className.replace(q, q + " " + e)
            }
            S(E.width, E.height);
            var bk = document.getElementById(aQ.id);
            bk.parentNode.replaceChild(a4, bk)
        }
        function bg(bl) {
            var bk = y.between(E.position + bl, 0, this.getDuration());
            this.seek(bk)
        }
        function bj(bk) {
            var bl = y.between(this.getVolume() + bk, 0, 100);
            this.setVolume(bl)
        }
        function aS(bk) {
            if (bk.ctrlKey || bk.metaKey) {
                return false
            }
            if (!E.controls) {
                return false
            }
            return true
        }
        function M(bk) {
            if (!aS(bk)) {
                return true
            }
            if (!a1.adMode()) {
                G();
                aB()
            }
            var bm = p(aQ.id);
            switch (bk.keyCode) {
                case 27:
                    bm.setFullscreen(false);
                    break;
                case 13:
                case 32:
                    bm.play();
                    break;
                case 37:
                    if (!a1.adMode()) {
                        bg.call(bm, -5)
                    }
                    break;
                case 39:
                    if (!a1.adMode()) {
                        bg.call(bm, 5)
                    }
                    break;
                case 38:
                    bj.call(bm, 10);
                    break;
                case 40:
                    bj.call(bm, -10);
                    break;
                case 77:
                    bm.setMute();
                    break;
                case 70:
                    bm.setFullscreen();
                    break;
                default:
                    if (bk.keyCode >= 48 && bk.keyCode <= 59) {
                        var bn = bk.keyCode - 48;
                        var bl = (bn / 10) * bm.getDuration();
                        bm.seek(bl)
                    }
                    break
            }
            if (/13|32|37|38|39|40/.test(bk.keyCode)) {
                bk.preventDefault();
                return false
            }
        }
        function aT() {
            aF = true;
            U.sendEvent(c.JWPLAYER_VIEW_TAB_FOCUS, {
                hasFocus: false
            })
        }
        function I() {
            var bk = !aF;
            aF = false;
            if (bk) {
                U.sendEvent(c.JWPLAYER_VIEW_TAB_FOCUS, {
                    hasFocus: true
                })
            }
            if (!a1.adMode()) {
                G();
                aB()
            }
        }
        function aA() {
            aF = false;
            U.sendEvent(c.JWPLAYER_VIEW_TAB_FOCUS, {
                hasFocus: false
            })
        }
        this.getCurrentCaptions = function () {
            return aY.getCurrentCaptions()
        };
        this.setCurrentCaptions = function (bk) {
            aY.setCurrentCaptions(bk)
        };
        this.getCaptionsList = function () {
            return aY.getCaptionsList()
        };
        function aP() {
            var bk = t(a4), bm = Math.round(bk.width), bl = Math
					.round(bk.height);
            if (!document.body.contains(a4)) {
                k.removeEventListener("resize", aP);
                if (w) {
                    k.removeEventListener("orientationchange", aP)
                }
            } else {
                if (bm && bl) {
                    if (bm !== at || bl !== Y) {
                        at = bm;
                        Y = bl;
                        if (af) {
                            af.redraw()
                        }
                        clearTimeout(a7);
                        a7 = setTimeout(al, 50);
                        U.sendEvent(c.JWPLAYER_RESIZE, {
                            width: bm,
                            height: bl
                        })
                    }
                }
            }
            return bk
        }
        this.setup = function (bn) {
            if (ao) {
                return
            }
            aQ.skin = bn;
            a8 = a3("span", r);
            a8.id = aQ.id + "_view";
            av = a3("span", z);
            av.id = aQ.id + "_media";
            aX = a3("span", f);
            ae = a3("span", A);
            Q = a3("span", h);
            Z = a3("span", b);
            T();
            a8.appendChild(av);
            a8.appendChild(aX);
            a8.appendChild(ae);
            a4.appendChild(a8);
            a4.appendChild(Z);
            a4.appendChild(Q);
            E.getVideo().setContainer(av);
            E.addEventListener("fullscreenchange", F);
            for (var bm = x.length; bm--; ) {
                document.addEventListener(x[bm], F, false)
            }
            k.removeEventListener("resize", aP);
            k.addEventListener("resize", aP, false);
            if (w) {
                k.removeEventListener("orientationchange", aP);
                k.addEventListener("orientationchange", aP, false)
            }
            p(aQ.id).onAdPlay(function () {
                a1.adMode(true);
                ad(i.PLAYING);
                aB()
            });
            p(aQ.id).onAdSkipped(function () {
                a1.adMode(false)
            });
            p(aQ.id).onAdComplete(function () {
                a1.adMode(false)
            });
            p(aQ.id).onAdError(function () {
                a1.adMode(false)
            });
            aQ.jwAddEventListener(c.JWPLAYER_PLAYER_STATE, P);
            aQ.jwAddEventListener(c.JWPLAYER_MEDIA_ERROR, aU);
            aQ.jwAddEventListener(c.JWPLAYER_PLAYLIST_COMPLETE, a2);
            aQ.jwAddEventListener(c.JWPLAYER_PLAYLIST_ITEM, ag);
            aQ.jwAddEventListener(c.JWPLAYER_CAST_AVAILABLE, function () {
                if (y.canCast()) {
                    U.forceControls(true)
                } else {
                    U.releaseControls()
                }
            });
            aQ.jwAddEventListener(c.JWPLAYER_CAST_SESSION, function (bo) {
                if (!be) {
                    be = new p.html5.castDisplay(aQ.id);
                    be.statusDelegate = function (bp) {
                        be.setState(bp.newstate)
                    }
                }
                if (bo.active) {
                    s.style(aY.element(), {
                        display: "none"
                    });
                    U.forceControls(true);
                    be.setState("connecting").setName(bo.deviceName).show();
                    aQ.jwAddEventListener(c.JWPLAYER_PLAYER_STATE,
							be.statusDelegate);
                    aQ.jwAddEventListener(c.JWPLAYER_CAST_AD_CHANGED, bh)
                } else {
                    aQ.jwRemoveEventListener(c.JWPLAYER_PLAYER_STATE,
							be.statusDelegate);
                    aQ.jwRemoveEventListener(c.JWPLAYER_CAST_AD_CHANGED, bh);
                    be.hide();
                    if (a1.adMode()) {
                        aK()
                    }
                    s.style(aY.element(), {
                        display: null
                    });
                    P({
                        newstate: aQ.jwGetState()
                    });
                    aP()
                }
            });
            P({
                newstate: i.IDLE
            });
            if (!w) {
                aX.addEventListener("mouseout", aq, false);
                aX.addEventListener("mousemove", a9, false);
                if (y.isMSIE()) {
                    av.addEventListener("mousemove", a9, false);
                    av.addEventListener("click", af.clickHandler)
                }
            }
            aa(a1);
            aa(aE);
            aa(L);
            s("#" + a4.id + "." + e + " ." + b, {
                "margin-top": E.aspectratio,
                display: n
            });
            var bk = y.exists(E.aspectratio) ? parseFloat(E.aspectratio) : 100, bl = E.playlistsize;
            s("#" + a4.id + ".playlist-right ." + b, {
                "margin-bottom": -1 * bl * (bk / 100) + "px"
            });
            s("#" + a4.id + ".playlist-right ." + h, {
                width: bl + "px",
                right: 0,
                top: 0,
                height: "100%"
            });
            s("#" + a4.id + ".playlist-bottom ." + b, {
                "padding-bottom": bl + "px"
            });
            s("#" + a4.id + ".playlist-bottom ." + h, {
                width: "100%",
                height: bl + "px",
                bottom: 0
            });
            s("#" + a4.id + ".playlist-right ." + r, {
                right: bl + "px"
            });
            s("#" + a4.id + ".playlist-bottom ." + r, {
                bottom: bl + "px"
            });
            setTimeout(function () {
                S(E.width, E.height)
            }, 0)
        };
        function aa(bk) {
            if (bk) {
                bk.element().addEventListener("mousemove", ah, false);
                bk.element().addEventListener("mouseout", ba, false)
            }
        }
        function aJ() {
        }
        function aq() {
            clearTimeout(aZ);
            aZ = setTimeout(bc, aH)
        }
        function a3(bl, bk) {
            var bm = document.createElement(bl);
            if (bk) {
                bm.className = bk
            }
            return bm
        }
        function am() {
            if (w) {
                if (ap) {
                    bc()
                } else {
                    aj()
                }
            } else {
                P({
                    newstate: aQ.jwGetState()
                })
            }
            if (ap) {
                aB()
            }
        }
        function aB() {
            clearTimeout(aZ);
            aZ = setTimeout(bc, aH)
        }
        function a9() {
            clearTimeout(aZ);
            var bk = aQ.jwGetState();
            if (bk === i.PLAYING || bk === i.PAUSED || aD) {
                aj();
                if (!O) {
                    aZ = setTimeout(bc, aH)
                }
            }
        }
        function ah() {
            clearTimeout(aZ);
            O = true
        }
        function ba() {
            O = false
        }
        function aM(bk) {
            U.sendEvent(bk.type, bk)
        }
        function T() {
            var bk = E.height, bm = E.componentConfig("controlbar"), bl = E
					.componentConfig("display");
            ab(bk);
            aY = new l.captions(aQ, E.captions);
            aY.addEventListener(c.JWPLAYER_CAPTIONS_LIST, aM);
            aY.addEventListener(c.JWPLAYER_CAPTIONS_CHANGED, aM);
            aY.addEventListener(c.JWPLAYER_CAPTIONS_LOADED, aJ);
            aX.appendChild(aY.element());
            af = new l.display(aQ, bl);
            af.addEventListener(c.JWPLAYER_DISPLAY_CLICK, function (bn) {
                aM(bn);
                am()
            });
            if (aL) {
                af.hidePreview(true)
            }
            aX.appendChild(af.element());
            L = new l.logo(aQ, az);
            aX.appendChild(L.element());
            aE = new l.dock(aQ, E.componentConfig("dock"));
            aX.appendChild(aE.element());
            if (aQ.edition && !w) {
                an = new l.rightclick(aQ, {
                    abouttext: E.abouttext,
                    aboutlink: E.aboutlink
                })
            } else {
                if (!w) {
                    an = new l.rightclick(aQ, {})
                }
            }
            if (E.playlistsize && E.playlistposition
					&& E.playlistposition !== a) {
                N = new l.playlistcomponent(aQ, {});
                Q.appendChild(N.element())
            }
            a1 = new l.controlbar(aQ, bm);
            a1.addEventListener(c.JWPLAYER_USER_ACTION, aB);
            aX.appendChild(a1.element());
            if (B) {
                aN()
            }
            if (y.canCast()) {
                U.forceControls(true)
            }
            a4.onmousedown = aT;
            a4.onfocusin = I;
            a4.addEventListener("focus", I);
            a4.onfocusout = aA;
            a4.addEventListener("blur", aA);
            a4.addEventListener("keydown", M)
        }
        function bh(bk) {
            if (bk.done) {
                aK();
                return
            }
            if (!bk.complete) {
                if (!a1.adMode()) {
                    aO()
                }
                a1.setText(bk.message);
                var bm = bk.onClick;
                if (bm !== undefined) {
                    af.setAlternateClickHandler(function () {
                        bm(bk)
                    })
                }
                var bl = bk.onSkipAd;
                if (bl !== undefined && be) {
                    be.setSkipoffset(bk, bk.onSkipAd)
                }
            }
            if (be) {
                be.adChanged(bk)
            }
        }
        function aO() {
            a1.instreamMode(true);
            a1.adMode(true);
            a1.show(true)
        }
        function aK() {
            a1.setText("");
            a1.adMode(false);
            a1.instreamMode(false);
            a1.show(true);
            if (be) {
                be.adsEnded();
                be.setState(aQ.jwGetState())
            }
            af.revertAlternateClickHandler()
        }
        var aw = this.fullscreen = function (bk) {
            if (!y.exists(bk)) {
                bk = !E.fullscreen
            }
            bk = !!bk;
            if (bk === E.fullscreen) {
                return
            }
            if (bd) {
                if (bk) {
                    H.apply(a4)
                } else {
                    ac.apply(document)
                }
                aI(a4, bk)
            } else {
                if (y.isIE()) {
                    aI(a4, bk)
                } else {
                    if (X) {
                        X.getVideo().setFullScreen(bk)
                    }
                    E.getVideo().setFullScreen(bk)
                }
            }
        };
        function bb(bk) {
            if (bk) {
                bk.redraw()
            }
        }
        function S(bl, bs, bp) {
            var bo = a4.className, bt, bn, br, bm, bq, bk = aQ.id + "_view";
            s.block(bk);
            bp = !!bp;
            if (bp) {
                bo = bo.replace(/\s*aspectMode/, "");
                if (a4.className !== bo) {
                    a4.className = bo
                }
                s.style(a4, {
                    display: n
                }, bp)
            }
            if (y.exists(bl) && y.exists(bs)) {
                E.width = bl;
                E.height = bs
            }
            bt = {
                width: bl
            };
            if (bo.indexOf(e) === -1) {
                bt.height = bs
            }
            s.style(a4, bt, true);
            if (af) {
                af.redraw()
            }
            if (a1) {
                a1.redraw(true)
            }
            if (L) {
                L.offset(a1 && L.position().indexOf("bottom") >= 0 ? a1
						.height()
						+ a1.margin() : 0);
                setTimeout(function () {
                    if (aE) {
                        aE
								.offset(L.position() === "top-left" ? L
										.element().clientWidth
										+ L.margin() : 0)
                    }
                }, 500)
            }
            ab(bs);
            bm = E.playlistsize;
            bq = E.playlistposition;
            if (N && bm && (bq === "right" || bq === "bottom")) {
                N.redraw();
                bn = {
                    display: n
                };
                br = {};
                bn[bq] = 0;
                br[bq] = bm;
                if (bq === "right") {
                    bn.width = bm
                } else {
                    bn.height = bm
                }
                s.style(Q, bn);
                s.style(a8, br)
            }
            al(bl, bs);
            s.unblock(bk)
        }
        function ab(bk) {
            aL = ai(bk);
            if (a1) {
                if (aL) {
                    a1.audioMode(true);
                    aj();
                    af.hidePreview(true);
                    C();
                    a5(false)
                } else {
                    a1.audioMode(false);
                    ad(aQ.jwGetState())
                }
            }
            if (L && aL) {
                D()
            }
            a4.style.backgroundColor = aL ? "transparent" : "#000"
        }
        function ai(bk) {
            var bl = t(a4);
            if (bk.toString().indexOf("%") > 0) {
                return false
            } else {
                if (bl.height === 0) {
                    return false
                } else {
                    if (E.playlistposition === "bottom") {
                        return bl.height <= 40 + E.playlistsize
                    }
                }
            }
            return bl.height <= 40
        }
        function al(bl, bk) {
            if (!bl || isNaN(Number(bl))) {
                if (!av) {
                    return
                }
                bl = av.clientWidth
            }
            if (!bk || isNaN(Number(bk))) {
                if (!av) {
                    return
                }
                bk = av.clientHeight
            }
            if (y.isMSIE(9) && document.all && !k.atob) {
                bl = bk = "100%"
            }
            var bm = E.getVideo().resize(bl, bk, E.stretching);
            if (bm) {
                clearTimeout(a7);
                a7 = setTimeout(al, 250)
            }
        }
        this.resize = function (bm, bk) {
            var bl = true;
            S(bm, bk, bl);
            aP()
        };
        this.resizeMedia = al;
        var ay = this.completeSetup = function () {
            s.style(a4, {
                opacity: 1
            });
            k.addEventListener("beforeunload", function () {
                if (!bi()) {
                    aQ.jwStop()
                }
            })
        };
        function W() {
            if (bd) {
                var bk = document.fullscreenElement
						|| document.webkitCurrentFullScreenElement
						|| document.mozFullScreenElement
						|| document.msFullscreenElement;
                return !!(bk && bk.id === aQ.id)
            }
            return aD ? X.getVideo().getFullScreen() : E.getVideo()
					.getFullScreen()
        }
        function F(bl) {
            var bk = (bl.jwstate !== undefined) ? bl.jwstate : W();
            if (bd) {
                aI(a4, bk)
            } else {
                aV(bk)
            }
        }
        function aI(bl, bk) {
            y.removeClass(bl, "jwfullscreen");
            if (bk) {
                y.addClass(bl, "jwfullscreen");
                s.style(document.body, {
                    "overflow-y": m
                });
                aB()
            } else {
                s.style(document.body, {
                    "overflow-y": ""
                })
            }
            bb(a1);
            bb(af);
            bb(aE);
            al();
            aV(bk)
        }
        function aV(bk) {
            E.setFullscreen(bk);
            if (X) {
                X.setFullscreen(bk)
            }
            if (bk) {
                clearTimeout(a7);
                a7 = setTimeout(al, 200)
            } else {
                if (g && aQ.jwGetState() === i.PAUSED) {
                    setTimeout(ak, 500)
                }
            }
        }
        function G() {
            if (a1 && E.controls) {
                if (aD) {
                    aG.show()
                } else {
                    a1.show()
                }
            }
        }
        function aN() {
            if (R === true) {
                return
            }
            if (a1 && !aL && !E.getVideo().isAudioFile()) {
                if (aD) {
                    aG.hide()
                }
                a1.hide()
            }
        }
        function V() {
            if (aE && !aL && E.controls) {
                aE.show()
            }
        }
        function au() {
            if (aE && !ax && !E.getVideo().isAudioFile()) {
                aE.hide()
            }
        }
        function aW() {
            if (L && !aL) {
                L.show()
            }
        }
        function D() {
            if (L && (!E.getVideo().isAudioFile() || aL)) {
                L.hide(aL)
            }
        }
        function ak() {
            if (af && E.controls && !aL) {
                if (!B || aQ.jwGetState() === i.IDLE) {
                    af.show()
                }
            }
            if (!(w && E.fullscreen)) {
                E.getVideo().setControls(false)
            }
        }
        function C() {
            if (af) {
                af.hide()
            }
        }
        function bc() {
            clearTimeout(aZ);
            if (R === true) {
                return
            }
            ap = false;
            var bk = aQ.jwGetState();
            if (!E.controls || bk !== i.PAUSED) {
                aN()
            }
            if (!E.controls) {
                au()
            }
            if (bk !== i.IDLE && bk !== i.PAUSED) {
                au();
                D()
            }
            y.addClass(a4, "jw-user-inactive")
        }
        function aj() {
            if (R === false) {
                return
            }
            ap = true;
            if (E.controls || aL) {
                G();
                V()
            }
            if (az.hide) {
                aW()
            }
            y.removeClass(a4, "jw-user-inactive")
        }
        function a5(bk) {
            bk = bk && !aL;
            E.getVideo().setVisibility(bk)
        }
        function a2() {
            ax = true;
            aw(false);
            if (E.controls) {
                V()
            }
        }
        function ag() {
            if (be) {
                be.setState(aQ.jwGetState())
            }
        }
        var a0;
        function P(bk) {
            ax = false;
            clearTimeout(a0);
            a0 = setTimeout(function () {
                ad(bk.newstate)
            }, 100)
        }
        function aU() {
            aN()
        }
        function K() {
            var bk = aD ? X : E;
            return bk.getVideo().isAudioFile()
        }
        function bi() {
            return E.getVideo().isCaster
        }
        function ad(bk) {
            ar = bk;
            if (bi()) {
                if (af) {
                    af.show();
                    af.hidePreview(false)
                }
                s.style(av, {
                    visibility: "visible",
                    opacity: 1
                });
                if (a1) {
                    a1.show();
                    a1.hideFullscreen(true)
                }
                return
            }
            switch (bk) {
                case i.PLAYING:
                    if (E.getVideo().isCaster !== true) {
                        R = null
                    } else {
                        R = true
                    }
                    if (K()) {
                        a5(false);
                        af.hidePreview(aL);
                        af.setHiding(true);
                        if (a1) {
                            aj();
                            a1.hideFullscreen(true)
                        }
                        V()
                    } else {
                        a5(true);
                        al();
                        af.hidePreview(true);
                        if (a1) {
                            a1.hideFullscreen(!E.getVideo().supportsFullscreen())
                        }
                    }
                    break;
                case i.IDLE:
                    a5(false);
                    if (!aL) {
                        af.hidePreview(false);
                        ak();
                        V();
                        if (a1) {
                            a1.hideFullscreen(false)
                        }
                    }
                    break;
                case i.BUFFERING:
                    ak();
                    bc();
                    if (w) {
                        a5(true)
                    }
                    break;
                case i.PAUSED:
                    ak();
                    aj();
                    break
            }
            aW()
        }
        function aC(bk) {
            return "#" + aQ.id + (bk ? " ." + bk : "")
        }
        this.setupInstream = function (bl, bk, bn, bm) {
            s.unblock();
            bf(aC(A), true);
            bf(aC(f), false);
            ae.appendChild(bl);
            aG = bk;
            J = bn;
            X = bm;
            P({
                newstate: i.PLAYING
            });
            aD = true;
            ae.addEventListener("mousemove", a9);
            ae.addEventListener("mouseout", aq)
        };
        this.destroyInstream = function () {
            s.unblock();
            bf(aC(A), false);
            bf(aC(f), true);
            ae.innerHTML = "";
            ae.removeEventListener("mousemove", a9);
            ae.removeEventListener("mouseout", aq);
            aD = false
        };
        this.setupError = function (bk) {
            ao = true;
            p.embed.errorScreen(a4, bk, E);
            ay()
        };
        function bf(bk, bl) {
            s(bk, {
                display: bl ? n : a
            })
        }
        this.addButton = function (bm, bk, bl, bn) {
            if (aE) {
                aE.addButton(bm, bk, bl, bn);
                if (aQ.jwGetState() === i.IDLE) {
                    V()
                }
            }
        };
        this.removeButton = function (bk) {
            if (aE) {
                aE.removeButton(bk)
            }
        };
        this.setControls = function (bl) {
            var bk = !!bl;
            if (bk === E.controls) {
                return
            }
            E.controls = bk;
            if (aD) {
                a6(!bl)
            } else {
                if (bk) {
                    P({
                        newstate: aQ.jwGetState()
                    })
                }
            }
            if (!bk) {
                bc();
                C()
            }
            U.sendEvent(c.JWPLAYER_CONTROLS, {
                controls: bk
            })
        };
        this.forceControls = function (bk) {
            R = !!bk;
            if (bk) {
                aj()
            } else {
                bc()
            }
        };
        this.releaseControls = function () {
            R = null;
            ad(aQ.jwGetState())
        };
        function a6(bk) {
            if (bk) {
                aG.hide();
                J.hide()
            } else {
                aG.show();
                J.show()
            }
        }
        this.addCues = function (bk) {
            if (a1) {
                a1.addCues(bk)
            }
        };
        this.forceState = function (bk) {
            af.forceState(bk)
        };
        this.releaseState = function () {
            af.releaseState(aQ.jwGetState())
        };
        this.getSafeRegion = function (bl) {
            var bk = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            bl = bl || !y.exists(bl);
            a1.showTemp();
            aE.showTemp();
            var bs = t(a8), bn = bs.top, bq = aD ? t(document
					.getElementById(aQ.id + "_instream_controlbar")) : t(a1
					.element()), bm = aD ? false : (aE.numButtons() > 0), br = (L
					.position().indexOf("top") === 0), bp, bo = t(L.element());
            if (bm && E.controls) {
                bp = t(aE.element());
                bk.y = Math.max(0, bp.bottom - bn)
            }
            if (br) {
                bk.y = Math.max(bk.y, bo.bottom - bn)
            }
            bk.width = bs.width;
            if (bq.height && bl && E.controls) {
                bk.height = (br ? bq.top : bo.top) - bn - bk.y
            } else {
                bk.height = bs.height - bk.y
            }
            a1.hideTemp();
            aE.hideTemp();
            return bk
        };
        this.destroy = function () {
            k.removeEventListener("resize", aP);
            k.removeEventListener("orientationchange", aP);
            for (var bk = x.length; bk--; ) {
                document.removeEventListener(x[bk], F, false)
            }
            E.removeEventListener("fullscreenchange", F);
            a4.removeEventListener("keydown", M, false);
            if (an) {
                an.destroy()
            }
            if (be) {
                aQ.jwRemoveEventListener(c.JWPLAYER_PLAYER_STATE,
						be.statusDelegate);
                be.destroy();
                be = null
            }
            if (aX) {
                aX.removeEventListener("mousemove", a9);
                aX.removeEventListener("mouseout", aq)
            }
            if (av) {
                av.removeEventListener("mousemove", a9);
                av.removeEventListener("click", af.clickHandler)
            }
            if (aD) {
                this.destroyInstream()
            }
        };
        aR()
    };
    s("." + q, {
        position: "relative",
        display: "block",
        opacity: 0,
        "min-height": 0,
        "-webkit-transition": v,
        "-moz-transition": v,
        "-o-transition": v
    });
    s("." + r, {
        position: j,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        "-webkit-transition": v,
        "-moz-transition": v,
        "-o-transition": v
    });
    s("." + z + ", ." + f, {
        position: j,
        height: o,
        width: o,
        "-webkit-transition": v,
        "-moz-transition": v,
        "-o-transition": v
    });
    s("." + z, {
        overflow: m,
        visibility: m,
        opacity: 0
    });
    s("." + z + " video", {
        background: "transparent",
        height: o,
        width: o,
        position: "absolute",
        margin: "auto",
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
    });
    s("." + h, {
        position: j,
        height: o,
        width: o,
        display: a
    });
    s("." + A, {
        position: j,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "none"
    });
    s("." + b, {
        display: "none"
    });
    s("." + q + "." + e, {
        height: "auto"
    });
    s(d, {
        width: o,
        height: o,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        "z-index": 1000,
        margin: 0,
        position: "fixed"
    }, true);
    s(d + ".jw-user-inactive", {
        cursor: "none",
        "-webkit-cursor-visibility": "auto-hide"
    });
    s(d + " ." + r, {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }, true);
    s(d + " ." + h, {
        display: a
    }, true);
    s("." + q + " .jwuniform", {
        "background-size": "contain" + u
    });
    s("." + q + " .jwfill", {
        "background-size": "cover" + u,
        "background-position": "center"
    });
    s("." + q + " .jwexactfit", {
        "background-size": o + " " + o + u
    })
})(window);