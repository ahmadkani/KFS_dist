var Ja = (i, e) => () => (e || i((e = { exports: {} }).exports, e), e.exports);
import { g as qt, B as ne, L as yr } from "./index-jVhJ2jaE.js";
import { L as Fr, c as Pr } from "./configES6-_CidsW4_.js";
var ol = Ja((Tr, Ki) => {
  function Qa(i) {
    return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
  }
  var fa = { exports: {} }, ze = fa.exports = {}, _t, gt;
  function Mi() {
    throw new Error("setTimeout has not been defined");
  }
  function Ui() {
    throw new Error("clearTimeout has not been defined");
  }
  (function() {
    try {
      typeof setTimeout == "function" ? _t = setTimeout : _t = Mi;
    } catch {
      _t = Mi;
    }
    try {
      typeof clearTimeout == "function" ? gt = clearTimeout : gt = Ui;
    } catch {
      gt = Ui;
    }
  })();
  function ha(i) {
    if (_t === setTimeout)
      return setTimeout(i, 0);
    if ((_t === Mi || !_t) && setTimeout)
      return _t = setTimeout, setTimeout(i, 0);
    try {
      return _t(i, 0);
    } catch {
      try {
        return _t.call(null, i, 0);
      } catch {
        return _t.call(this, i, 0);
      }
    }
  }
  function es(i) {
    if (gt === clearTimeout)
      return clearTimeout(i);
    if ((gt === Ui || !gt) && clearTimeout)
      return gt = clearTimeout, clearTimeout(i);
    try {
      return gt(i);
    } catch {
      try {
        return gt.call(null, i);
      } catch {
        return gt.call(this, i);
      }
    }
  }
  var St = [], Xt = !1, Mt, Sr = -1;
  function ts() {
    !Xt || !Mt || (Xt = !1, Mt.length ? St = Mt.concat(St) : Sr = -1, St.length && da());
  }
  function da() {
    if (!Xt) {
      var i = ha(ts);
      Xt = !0;
      for (var e = St.length; e; ) {
        for (Mt = St, St = []; ++Sr < e; )
          Mt && Mt[Sr].run();
        Sr = -1, e = St.length;
      }
      Mt = null, Xt = !1, es(i);
    }
  }
  ze.nextTick = function(i) {
    var e = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var t = 1; t < arguments.length; t++)
        e[t - 1] = arguments[t];
    St.push(new wa(i, e)), St.length === 1 && !Xt && ha(da);
  };
  function wa(i, e) {
    this.fun = i, this.array = e;
  }
  wa.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  ze.title = "browser";
  ze.browser = !0;
  ze.env = {};
  ze.argv = [];
  ze.version = "";
  ze.versions = {};
  function Tt() {
  }
  ze.on = Tt;
  ze.addListener = Tt;
  ze.once = Tt;
  ze.off = Tt;
  ze.removeListener = Tt;
  ze.removeAllListeners = Tt;
  ze.emit = Tt;
  ze.prependListener = Tt;
  ze.prependOnceListener = Tt;
  ze.listeners = function(i) {
    return [];
  };
  ze.binding = function(i) {
    throw new Error("process.binding is not supported");
  };
  ze.cwd = function() {
    return "/";
  };
  ze.chdir = function(i) {
    throw new Error("process.chdir is not supported");
  };
  ze.umask = function() {
    return 0;
  };
  var rs = fa.exports;
  const Qe = /* @__PURE__ */ Qa(rs);
  var ii, un;
  function is() {
    if (un) return ii;
    un = 1;
    var i = function(e) {
      if (e = e || {}, this.Promise = e.Promise || Promise, this.queues = /* @__PURE__ */ Object.create(null), this.domainReentrant = e.domainReentrant || !1, this.domainReentrant) {
        if (typeof Qe > "u" || typeof Qe.domain > "u")
          throw new Error(
            "Domain-reentrant locks require `process.domain` to exist. Please flip `opts.domainReentrant = false`, use a NodeJS version that still implements Domain, or install a browser polyfill."
          );
        this.domains = /* @__PURE__ */ Object.create(null);
      }
      this.timeout = e.timeout || i.DEFAULT_TIMEOUT, this.maxOccupationTime = e.maxOccupationTime || i.DEFAULT_MAX_OCCUPATION_TIME, this.maxExecutionTime = e.maxExecutionTime || i.DEFAULT_MAX_EXECUTION_TIME, e.maxPending === 1 / 0 || Number.isInteger(e.maxPending) && e.maxPending >= 0 ? this.maxPending = e.maxPending : this.maxPending = i.DEFAULT_MAX_PENDING;
    };
    return i.DEFAULT_TIMEOUT = 0, i.DEFAULT_MAX_OCCUPATION_TIME = 0, i.DEFAULT_MAX_EXECUTION_TIME = 0, i.DEFAULT_MAX_PENDING = 1e3, i.prototype.acquire = function(e, t, r, n) {
      if (Array.isArray(e))
        return this._acquireBatch(e, t, r, n);
      if (typeof t != "function")
        throw new Error("You must pass a function to execute");
      var a = null, s = null, o = null;
      typeof r != "function" && (n = r, r = null, o = new this.Promise(function(S, N) {
        a = S, s = N;
      })), n = n || {};
      var l = !1, d = null, f = null, w = null, m = this, y = function(S, N, D) {
        f && (clearTimeout(f), f = null), w && (clearTimeout(w), w = null), S && (m.queues[e] && m.queues[e].length === 0 && delete m.queues[e], m.domainReentrant && delete m.domains[e]), l || (o ? N ? s(N) : a(D) : typeof r == "function" && r(N, D), l = !0), S && m.queues[e] && m.queues[e].length > 0 && m.queues[e].shift()();
      }, k = function(S) {
        if (l)
          return y(S);
        d && (clearTimeout(d), d = null), m.domainReentrant && S && (m.domains[e] = Qe.domain);
        var N = n.maxExecutionTime || m.maxExecutionTime;
        if (N && (w = setTimeout(function() {
          m.queues[e] && y(S, new Error("Maximum execution time is exceeded " + e));
        }, N)), t.length === 1) {
          var D = !1;
          try {
            t(function(F, I) {
              D || (D = !0, y(S, F, I));
            });
          } catch (F) {
            D || (D = !0, y(S, F));
          }
        } else
          m._promiseTry(function() {
            return t();
          }).then(function(F) {
            y(S, void 0, F);
          }, function(F) {
            y(S, F);
          });
      };
      m.domainReentrant && Qe.domain && (k = Qe.domain.bind(k));
      var x = n.maxPending || m.maxPending;
      if (!m.queues[e])
        m.queues[e] = [], k(!0);
      else if (m.domainReentrant && Qe.domain && Qe.domain === m.domains[e])
        k(!1);
      else if (m.queues[e].length >= x)
        y(!1, new Error("Too many pending tasks in queue " + e));
      else {
        var E = function() {
          k(!0);
        };
        n.skipQueue ? m.queues[e].unshift(E) : m.queues[e].push(E);
        var R = n.timeout || m.timeout;
        R && (d = setTimeout(function() {
          d = null, y(!1, new Error("async-lock timed out in queue " + e));
        }, R));
      }
      var T = n.maxOccupationTime || m.maxOccupationTime;
      if (T && (f = setTimeout(function() {
        m.queues[e] && y(!1, new Error("Maximum occupation time is exceeded in queue " + e));
      }, T)), o)
        return o;
    }, i.prototype._acquireBatch = function(e, t, r, n) {
      typeof r != "function" && (n = r, r = null);
      var a = this, s = function(l, d) {
        return function(f) {
          a.acquire(l, d, f, n);
        };
      }, o = e.reduceRight(function(l, d) {
        return s(d, l);
      }, t);
      if (typeof r == "function")
        o(r);
      else
        return new this.Promise(function(l, d) {
          o.length === 1 ? o(function(f, w) {
            f ? d(f) : l(w);
          }) : l(o());
        });
    }, i.prototype.isBusy = function(e) {
      return e ? !!this.queues[e] : Object.keys(this.queues).length > 0;
    }, i.prototype._promiseTry = function(e) {
      try {
        return this.Promise.resolve(e());
      } catch (t) {
        return this.Promise.reject(t);
      }
    }, ii = i, ii;
  }
  var ni, fn;
  function ns() {
    return fn || (fn = 1, ni = is()), ni;
  }
  var as = ns();
  const $r = /* @__PURE__ */ qt(as);
  var vr = { exports: {} }, hn;
  function ss() {
    return hn || (hn = 1, typeof Object.create == "function" ? vr.exports = function(e, t) {
      t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }));
    } : vr.exports = function(e, t) {
      if (t) {
        e.super_ = t;
        var r = function() {
        };
        r.prototype = t.prototype, e.prototype = new r(), e.prototype.constructor = e;
      }
    }), vr.exports;
  }
  var br = { exports: {} }, ai = {}, dn;
  function os() {
    return dn || (dn = 1, function(i) {
      Object.defineProperties(i, { __esModule: { value: !0 }, [Symbol.toStringTag]: { value: "Module" } });
      var e = {}, t = {};
      t.byteLength = f, t.toByteArray = m, t.fromByteArray = x;
      for (var r = [], n = [], a = typeof Uint8Array < "u" ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, l = s.length; o < l; ++o)
        r[o] = s[o], n[s.charCodeAt(o)] = o;
      n[45] = 62, n[95] = 63;
      function d(T) {
        var S = T.length;
        if (S % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
        var N = T.indexOf("=");
        N === -1 && (N = S);
        var D = N === S ? 0 : 4 - N % 4;
        return [N, D];
      }
      function f(T) {
        var S = d(T), N = S[0], D = S[1];
        return (N + D) * 3 / 4 - D;
      }
      function w(T, S, N) {
        return (S + N) * 3 / 4 - N;
      }
      function m(T) {
        var S, N = d(T), D = N[0], F = N[1], I = new a(w(T, D, F)), A = 0, U = F > 0 ? D - 4 : D, P;
        for (P = 0; P < U; P += 4)
          S = n[T.charCodeAt(P)] << 18 | n[T.charCodeAt(P + 1)] << 12 | n[T.charCodeAt(P + 2)] << 6 | n[T.charCodeAt(P + 3)], I[A++] = S >> 16 & 255, I[A++] = S >> 8 & 255, I[A++] = S & 255;
        return F === 2 && (S = n[T.charCodeAt(P)] << 2 | n[T.charCodeAt(P + 1)] >> 4, I[A++] = S & 255), F === 1 && (S = n[T.charCodeAt(P)] << 10 | n[T.charCodeAt(P + 1)] << 4 | n[T.charCodeAt(P + 2)] >> 2, I[A++] = S >> 8 & 255, I[A++] = S & 255), I;
      }
      function y(T) {
        return r[T >> 18 & 63] + r[T >> 12 & 63] + r[T >> 6 & 63] + r[T & 63];
      }
      function k(T, S, N) {
        for (var D, F = [], I = S; I < N; I += 3)
          D = (T[I] << 16 & 16711680) + (T[I + 1] << 8 & 65280) + (T[I + 2] & 255), F.push(y(D));
        return F.join("");
      }
      function x(T) {
        for (var S, N = T.length, D = N % 3, F = [], I = 16383, A = 0, U = N - D; A < U; A += I)
          F.push(k(T, A, A + I > U ? U : A + I));
        return D === 1 ? (S = T[N - 1], F.push(
          r[S >> 2] + r[S << 4 & 63] + "=="
        )) : D === 2 && (S = (T[N - 2] << 8) + T[N - 1], F.push(
          r[S >> 10] + r[S >> 4 & 63] + r[S << 2 & 63] + "="
        )), F.join("");
      }
      var E = {};
      /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
      E.read = function(T, S, N, D, F) {
        var I, A, U = F * 8 - D - 1, P = (1 << U) - 1, G = P >> 1, $ = -7, Z = N ? F - 1 : 0, Q = N ? -1 : 1, ce = T[S + Z];
        for (Z += Q, I = ce & (1 << -$) - 1, ce >>= -$, $ += U; $ > 0; I = I * 256 + T[S + Z], Z += Q, $ -= 8)
          ;
        for (A = I & (1 << -$) - 1, I >>= -$, $ += D; $ > 0; A = A * 256 + T[S + Z], Z += Q, $ -= 8)
          ;
        if (I === 0)
          I = 1 - G;
        else {
          if (I === P)
            return A ? NaN : (ce ? -1 : 1) * (1 / 0);
          A = A + Math.pow(2, D), I = I - G;
        }
        return (ce ? -1 : 1) * A * Math.pow(2, I - D);
      }, E.write = function(T, S, N, D, F, I) {
        var A, U, P, G = I * 8 - F - 1, $ = (1 << G) - 1, Z = $ >> 1, Q = F === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, ce = D ? 0 : I - 1, X = D ? 1 : -1, H = S < 0 || S === 0 && 1 / S < 0 ? 1 : 0;
        for (S = Math.abs(S), isNaN(S) || S === 1 / 0 ? (U = isNaN(S) ? 1 : 0, A = $) : (A = Math.floor(Math.log(S) / Math.LN2), S * (P = Math.pow(2, -A)) < 1 && (A--, P *= 2), A + Z >= 1 ? S += Q / P : S += Q * Math.pow(2, 1 - Z), S * P >= 2 && (A++, P /= 2), A + Z >= $ ? (U = 0, A = $) : A + Z >= 1 ? (U = (S * P - 1) * Math.pow(2, F), A = A + Z) : (U = S * Math.pow(2, Z - 1) * Math.pow(2, F), A = 0)); F >= 8; T[N + ce] = U & 255, ce += X, U /= 256, F -= 8)
          ;
        for (A = A << F | U, G += F; G > 0; T[N + ce] = A & 255, ce += X, A /= 256, G -= 8)
          ;
        T[N + ce - X] |= H * 128;
      };
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */
      (function(T) {
        const S = t, N = E, D = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
        T.Buffer = $, T.SlowBuffer = ve, T.INSPECT_MAX_BYTES = 50;
        const F = 2147483647;
        T.kMaxLength = F;
        const { Uint8Array: I, ArrayBuffer: A, SharedArrayBuffer: U } = globalThis;
        $.TYPED_ARRAY_SUPPORT = P(), !$.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
        function P() {
          try {
            const p = new I(1), c = { foo: function() {
              return 42;
            } };
            return Object.setPrototypeOf(c, I.prototype), Object.setPrototypeOf(p, c), p.foo() === 42;
          } catch {
            return !1;
          }
        }
        Object.defineProperty($.prototype, "parent", {
          enumerable: !0,
          get: function() {
            if ($.isBuffer(this))
              return this.buffer;
          }
        }), Object.defineProperty($.prototype, "offset", {
          enumerable: !0,
          get: function() {
            if ($.isBuffer(this))
              return this.byteOffset;
          }
        });
        function G(p) {
          if (p > F)
            throw new RangeError('The value "' + p + '" is invalid for option "size"');
          const c = new I(p);
          return Object.setPrototypeOf(c, $.prototype), c;
        }
        function $(p, c, h) {
          if (typeof p == "number") {
            if (typeof c == "string")
              throw new TypeError(
                'The "string" argument must be of type string. Received type number'
              );
            return X(p);
          }
          return Z(p, c, h);
        }
        $.poolSize = 8192;
        function Z(p, c, h) {
          if (typeof p == "string")
            return H(p, c);
          if (A.isView(p))
            return ie(p);
          if (p == null)
            throw new TypeError(
              "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof p
            );
          if (g(p, A) || p && g(p.buffer, A) || typeof U < "u" && (g(p, U) || p && g(p.buffer, U)))
            return de(p, c, h);
          if (typeof p == "number")
            throw new TypeError(
              'The "value" argument must not be of type number. Received type number'
            );
          const b = p.valueOf && p.valueOf();
          if (b != null && b !== p)
            return $.from(b, c, h);
          const B = _e(p);
          if (B) return B;
          if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof p[Symbol.toPrimitive] == "function")
            return $.from(p[Symbol.toPrimitive]("string"), c, h);
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof p
          );
        }
        $.from = function(p, c, h) {
          return Z(p, c, h);
        }, Object.setPrototypeOf($.prototype, I.prototype), Object.setPrototypeOf($, I);
        function Q(p) {
          if (typeof p != "number")
            throw new TypeError('"size" argument must be of type number');
          if (p < 0)
            throw new RangeError('The value "' + p + '" is invalid for option "size"');
        }
        function ce(p, c, h) {
          return Q(p), p <= 0 ? G(p) : c !== void 0 ? typeof h == "string" ? G(p).fill(c, h) : G(p).fill(c) : G(p);
        }
        $.alloc = function(p, c, h) {
          return ce(p, c, h);
        };
        function X(p) {
          return Q(p), G(p < 0 ? 0 : ue(p) | 0);
        }
        $.allocUnsafe = function(p) {
          return X(p);
        }, $.allocUnsafeSlow = function(p) {
          return X(p);
        };
        function H(p, c) {
          if ((typeof c != "string" || c === "") && (c = "utf8"), !$.isEncoding(c))
            throw new TypeError("Unknown encoding: " + c);
          const h = be(p, c) | 0;
          let b = G(h);
          const B = b.write(p, c);
          return B !== h && (b = b.slice(0, B)), b;
        }
        function K(p) {
          const c = p.length < 0 ? 0 : ue(p.length) | 0, h = G(c);
          for (let b = 0; b < c; b += 1)
            h[b] = p[b] & 255;
          return h;
        }
        function ie(p) {
          if (g(p, I)) {
            const c = new I(p);
            return de(c.buffer, c.byteOffset, c.byteLength);
          }
          return K(p);
        }
        function de(p, c, h) {
          if (c < 0 || p.byteLength < c)
            throw new RangeError('"offset" is outside of buffer bounds');
          if (p.byteLength < c + (h || 0))
            throw new RangeError('"length" is outside of buffer bounds');
          let b;
          return c === void 0 && h === void 0 ? b = new I(p) : h === void 0 ? b = new I(p, c) : b = new I(p, c, h), Object.setPrototypeOf(b, $.prototype), b;
        }
        function _e(p) {
          if ($.isBuffer(p)) {
            const c = ue(p.length) | 0, h = G(c);
            return h.length === 0 || p.copy(h, 0, 0, c), h;
          }
          if (p.length !== void 0)
            return typeof p.length != "number" || O(p.length) ? G(0) : K(p);
          if (p.type === "Buffer" && Array.isArray(p.data))
            return K(p.data);
        }
        function ue(p) {
          if (p >= F)
            throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + F.toString(16) + " bytes");
          return p | 0;
        }
        function ve(p) {
          return +p != p && (p = 0), $.alloc(+p);
        }
        $.isBuffer = function(c) {
          return c != null && c._isBuffer === !0 && c !== $.prototype;
        }, $.compare = function(c, h) {
          if (g(c, I) && (c = $.from(c, c.offset, c.byteLength)), g(h, I) && (h = $.from(h, h.offset, h.byteLength)), !$.isBuffer(c) || !$.isBuffer(h))
            throw new TypeError(
              'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
            );
          if (c === h) return 0;
          let b = c.length, B = h.length;
          for (let M = 0, q = Math.min(b, B); M < q; ++M)
            if (c[M] !== h[M]) {
              b = c[M], B = h[M];
              break;
            }
          return b < B ? -1 : B < b ? 1 : 0;
        }, $.isEncoding = function(c) {
          switch (String(c).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }, $.concat = function(c, h) {
          if (!Array.isArray(c))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (c.length === 0)
            return $.alloc(0);
          let b;
          if (h === void 0)
            for (h = 0, b = 0; b < c.length; ++b)
              h += c[b].length;
          const B = $.allocUnsafe(h);
          let M = 0;
          for (b = 0; b < c.length; ++b) {
            let q = c[b];
            if (g(q, I))
              M + q.length > B.length ? ($.isBuffer(q) || (q = $.from(q)), q.copy(B, M)) : I.prototype.set.call(
                B,
                q,
                M
              );
            else if ($.isBuffer(q))
              q.copy(B, M);
            else
              throw new TypeError('"list" argument must be an Array of Buffers');
            M += q.length;
          }
          return B;
        };
        function be(p, c) {
          if ($.isBuffer(p))
            return p.length;
          if (A.isView(p) || g(p, A))
            return p.byteLength;
          if (typeof p != "string")
            throw new TypeError(
              'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof p
            );
          const h = p.length, b = arguments.length > 2 && arguments[2] === !0;
          if (!b && h === 0) return 0;
          let B = !1;
          for (; ; )
            switch (c) {
              case "ascii":
              case "latin1":
              case "binary":
                return h;
              case "utf8":
              case "utf-8":
                return V(p).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return h * 2;
              case "hex":
                return h >>> 1;
              case "base64":
                return L(p).length;
              default:
                if (B)
                  return b ? -1 : V(p).length;
                c = ("" + c).toLowerCase(), B = !0;
            }
        }
        $.byteLength = be;
        function Be(p, c, h) {
          let b = !1;
          if ((c === void 0 || c < 0) && (c = 0), c > this.length || ((h === void 0 || h > this.length) && (h = this.length), h <= 0) || (h >>>= 0, c >>>= 0, h <= c))
            return "";
          for (p || (p = "utf8"); ; )
            switch (p) {
              case "hex":
                return At(this, c, h);
              case "utf8":
              case "utf-8":
                return Oe(this, c, h);
              case "ascii":
                return pe(this, c, h);
              case "latin1":
              case "binary":
                return Ke(this, c, h);
              case "base64":
                return De(this, c, h);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return dt(this, c, h);
              default:
                if (b) throw new TypeError("Unknown encoding: " + p);
                p = (p + "").toLowerCase(), b = !0;
            }
        }
        $.prototype._isBuffer = !0;
        function we(p, c, h) {
          const b = p[c];
          p[c] = p[h], p[h] = b;
        }
        $.prototype.swap16 = function() {
          const c = this.length;
          if (c % 2 !== 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (let h = 0; h < c; h += 2)
            we(this, h, h + 1);
          return this;
        }, $.prototype.swap32 = function() {
          const c = this.length;
          if (c % 4 !== 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (let h = 0; h < c; h += 4)
            we(this, h, h + 3), we(this, h + 1, h + 2);
          return this;
        }, $.prototype.swap64 = function() {
          const c = this.length;
          if (c % 8 !== 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (let h = 0; h < c; h += 8)
            we(this, h, h + 7), we(this, h + 1, h + 6), we(this, h + 2, h + 5), we(this, h + 3, h + 4);
          return this;
        }, $.prototype.toString = function() {
          const c = this.length;
          return c === 0 ? "" : arguments.length === 0 ? Oe(this, 0, c) : Be.apply(this, arguments);
        }, $.prototype.toLocaleString = $.prototype.toString, $.prototype.equals = function(c) {
          if (!$.isBuffer(c)) throw new TypeError("Argument must be a Buffer");
          return this === c ? !0 : $.compare(this, c) === 0;
        }, $.prototype.inspect = function() {
          let c = "";
          const h = T.INSPECT_MAX_BYTES;
          return c = this.toString("hex", 0, h).replace(/(.{2})/g, "$1 ").trim(), this.length > h && (c += " ... "), "<Buffer " + c + ">";
        }, D && ($.prototype[D] = $.prototype.inspect), $.prototype.compare = function(c, h, b, B, M) {
          if (g(c, I) && (c = $.from(c, c.offset, c.byteLength)), !$.isBuffer(c))
            throw new TypeError(
              'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof c
            );
          if (h === void 0 && (h = 0), b === void 0 && (b = c ? c.length : 0), B === void 0 && (B = 0), M === void 0 && (M = this.length), h < 0 || b > c.length || B < 0 || M > this.length)
            throw new RangeError("out of range index");
          if (B >= M && h >= b)
            return 0;
          if (B >= M)
            return -1;
          if (h >= b)
            return 1;
          if (h >>>= 0, b >>>= 0, B >>>= 0, M >>>= 0, this === c) return 0;
          let q = M - B, oe = b - h;
          const Ae = Math.min(q, oe), Te = this.slice(B, M), me = c.slice(h, b);
          for (let ge = 0; ge < Ae; ++ge)
            if (Te[ge] !== me[ge]) {
              q = Te[ge], oe = me[ge];
              break;
            }
          return q < oe ? -1 : oe < q ? 1 : 0;
        };
        function he(p, c, h, b, B) {
          if (p.length === 0) return -1;
          if (typeof h == "string" ? (b = h, h = 0) : h > 2147483647 ? h = 2147483647 : h < -2147483648 && (h = -2147483648), h = +h, O(h) && (h = B ? 0 : p.length - 1), h < 0 && (h = p.length + h), h >= p.length) {
            if (B) return -1;
            h = p.length - 1;
          } else if (h < 0)
            if (B) h = 0;
            else return -1;
          if (typeof c == "string" && (c = $.from(c, b)), $.isBuffer(c))
            return c.length === 0 ? -1 : Ee(p, c, h, b, B);
          if (typeof c == "number")
            return c = c & 255, typeof I.prototype.indexOf == "function" ? B ? I.prototype.indexOf.call(p, c, h) : I.prototype.lastIndexOf.call(p, c, h) : Ee(p, [c], h, b, B);
          throw new TypeError("val must be string, number or Buffer");
        }
        function Ee(p, c, h, b, B) {
          let M = 1, q = p.length, oe = c.length;
          if (b !== void 0 && (b = String(b).toLowerCase(), b === "ucs2" || b === "ucs-2" || b === "utf16le" || b === "utf-16le")) {
            if (p.length < 2 || c.length < 2)
              return -1;
            M = 2, q /= 2, oe /= 2, h /= 2;
          }
          function Ae(me, ge) {
            return M === 1 ? me[ge] : me.readUInt16BE(ge * M);
          }
          let Te;
          if (B) {
            let me = -1;
            for (Te = h; Te < q; Te++)
              if (Ae(p, Te) === Ae(c, me === -1 ? 0 : Te - me)) {
                if (me === -1 && (me = Te), Te - me + 1 === oe) return me * M;
              } else
                me !== -1 && (Te -= Te - me), me = -1;
          } else
            for (h + oe > q && (h = q - oe), Te = h; Te >= 0; Te--) {
              let me = !0;
              for (let ge = 0; ge < oe; ge++)
                if (Ae(p, Te + ge) !== Ae(c, ge)) {
                  me = !1;
                  break;
                }
              if (me) return Te;
            }
          return -1;
        }
        $.prototype.includes = function(c, h, b) {
          return this.indexOf(c, h, b) !== -1;
        }, $.prototype.indexOf = function(c, h, b) {
          return he(this, c, h, b, !0);
        }, $.prototype.lastIndexOf = function(c, h, b) {
          return he(this, c, h, b, !1);
        };
        function Ne(p, c, h, b) {
          h = Number(h) || 0;
          const B = p.length - h;
          b ? (b = Number(b), b > B && (b = B)) : b = B;
          const M = c.length;
          b > M / 2 && (b = M / 2);
          let q;
          for (q = 0; q < b; ++q) {
            const oe = parseInt(c.substr(q * 2, 2), 16);
            if (O(oe)) return q;
            p[h + q] = oe;
          }
          return q;
        }
        function Ze(p, c, h, b) {
          return j(V(c, p.length - h), p, h, b);
        }
        function Le(p, c, h, b) {
          return j(le(c), p, h, b);
        }
        function ae(p, c, h, b) {
          return j(L(c), p, h, b);
        }
        function ke(p, c, h, b) {
          return j(u(c, p.length - h), p, h, b);
        }
        $.prototype.write = function(c, h, b, B) {
          if (h === void 0)
            B = "utf8", b = this.length, h = 0;
          else if (b === void 0 && typeof h == "string")
            B = h, b = this.length, h = 0;
          else if (isFinite(h))
            h = h >>> 0, isFinite(b) ? (b = b >>> 0, B === void 0 && (B = "utf8")) : (B = b, b = void 0);
          else
            throw new Error(
              "Buffer.write(string, encoding, offset[, length]) is no longer supported"
            );
          const M = this.length - h;
          if ((b === void 0 || b > M) && (b = M), c.length > 0 && (b < 0 || h < 0) || h > this.length)
            throw new RangeError("Attempt to write outside buffer bounds");
          B || (B = "utf8");
          let q = !1;
          for (; ; )
            switch (B) {
              case "hex":
                return Ne(this, c, h, b);
              case "utf8":
              case "utf-8":
                return Ze(this, c, h, b);
              case "ascii":
              case "latin1":
              case "binary":
                return Le(this, c, h, b);
              case "base64":
                return ae(this, c, h, b);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return ke(this, c, h, b);
              default:
                if (q) throw new TypeError("Unknown encoding: " + B);
                B = ("" + B).toLowerCase(), q = !0;
            }
        }, $.prototype.toJSON = function() {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
          };
        };
        function De(p, c, h) {
          return c === 0 && h === p.length ? S.fromByteArray(p) : S.fromByteArray(p.slice(c, h));
        }
        function Oe(p, c, h) {
          h = Math.min(p.length, h);
          const b = [];
          let B = c;
          for (; B < h; ) {
            const M = p[B];
            let q = null, oe = M > 239 ? 4 : M > 223 ? 3 : M > 191 ? 2 : 1;
            if (B + oe <= h) {
              let Ae, Te, me, ge;
              switch (oe) {
                case 1:
                  M < 128 && (q = M);
                  break;
                case 2:
                  Ae = p[B + 1], (Ae & 192) === 128 && (ge = (M & 31) << 6 | Ae & 63, ge > 127 && (q = ge));
                  break;
                case 3:
                  Ae = p[B + 1], Te = p[B + 2], (Ae & 192) === 128 && (Te & 192) === 128 && (ge = (M & 15) << 12 | (Ae & 63) << 6 | Te & 63, ge > 2047 && (ge < 55296 || ge > 57343) && (q = ge));
                  break;
                case 4:
                  Ae = p[B + 1], Te = p[B + 2], me = p[B + 3], (Ae & 192) === 128 && (Te & 192) === 128 && (me & 192) === 128 && (ge = (M & 15) << 18 | (Ae & 63) << 12 | (Te & 63) << 6 | me & 63, ge > 65535 && ge < 1114112 && (q = ge));
              }
            }
            q === null ? (q = 65533, oe = 1) : q > 65535 && (q -= 65536, b.push(q >>> 10 & 1023 | 55296), q = 56320 | q & 1023), b.push(q), B += oe;
          }
          return Se(b);
        }
        const je = 4096;
        function Se(p) {
          const c = p.length;
          if (c <= je)
            return String.fromCharCode.apply(String, p);
          let h = "", b = 0;
          for (; b < c; )
            h += String.fromCharCode.apply(
              String,
              p.slice(b, b += je)
            );
          return h;
        }
        function pe(p, c, h) {
          let b = "";
          h = Math.min(p.length, h);
          for (let B = c; B < h; ++B)
            b += String.fromCharCode(p[B] & 127);
          return b;
        }
        function Ke(p, c, h) {
          let b = "";
          h = Math.min(p.length, h);
          for (let B = c; B < h; ++B)
            b += String.fromCharCode(p[B]);
          return b;
        }
        function At(p, c, h) {
          const b = p.length;
          (!c || c < 0) && (c = 0), (!h || h < 0 || h > b) && (h = b);
          let B = "";
          for (let M = c; M < h; ++M)
            B += z[p[M]];
          return B;
        }
        function dt(p, c, h) {
          const b = p.slice(c, h);
          let B = "";
          for (let M = 0; M < b.length - 1; M += 2)
            B += String.fromCharCode(b[M] + b[M + 1] * 256);
          return B;
        }
        $.prototype.slice = function(c, h) {
          const b = this.length;
          c = ~~c, h = h === void 0 ? b : ~~h, c < 0 ? (c += b, c < 0 && (c = 0)) : c > b && (c = b), h < 0 ? (h += b, h < 0 && (h = 0)) : h > b && (h = b), h < c && (h = c);
          const B = this.subarray(c, h);
          return Object.setPrototypeOf(B, $.prototype), B;
        };
        function Ie(p, c, h) {
          if (p % 1 !== 0 || p < 0) throw new RangeError("offset is not uint");
          if (p + c > h) throw new RangeError("Trying to access beyond buffer length");
        }
        $.prototype.readUintLE = $.prototype.readUIntLE = function(c, h, b) {
          c = c >>> 0, h = h >>> 0, b || Ie(c, h, this.length);
          let B = this[c], M = 1, q = 0;
          for (; ++q < h && (M *= 256); )
            B += this[c + q] * M;
          return B;
        }, $.prototype.readUintBE = $.prototype.readUIntBE = function(c, h, b) {
          c = c >>> 0, h = h >>> 0, b || Ie(c, h, this.length);
          let B = this[c + --h], M = 1;
          for (; h > 0 && (M *= 256); )
            B += this[c + --h] * M;
          return B;
        }, $.prototype.readUint8 = $.prototype.readUInt8 = function(c, h) {
          return c = c >>> 0, h || Ie(c, 1, this.length), this[c];
        }, $.prototype.readUint16LE = $.prototype.readUInt16LE = function(c, h) {
          return c = c >>> 0, h || Ie(c, 2, this.length), this[c] | this[c + 1] << 8;
        }, $.prototype.readUint16BE = $.prototype.readUInt16BE = function(c, h) {
          return c = c >>> 0, h || Ie(c, 2, this.length), this[c] << 8 | this[c + 1];
        }, $.prototype.readUint32LE = $.prototype.readUInt32LE = function(c, h) {
          return c = c >>> 0, h || Ie(c, 4, this.length), (this[c] | this[c + 1] << 8 | this[c + 2] << 16) + this[c + 3] * 16777216;
        }, $.prototype.readUint32BE = $.prototype.readUInt32BE = function(c, h) {
          return c = c >>> 0, h || Ie(c, 4, this.length), this[c] * 16777216 + (this[c + 1] << 16 | this[c + 2] << 8 | this[c + 3]);
        }, $.prototype.readBigUInt64LE = re(function(c) {
          c = c >>> 0, ee(c, "offset");
          const h = this[c], b = this[c + 7];
          (h === void 0 || b === void 0) && C(c, this.length - 8);
          const B = h + this[++c] * 2 ** 8 + this[++c] * 2 ** 16 + this[++c] * 2 ** 24, M = this[++c] + this[++c] * 2 ** 8 + this[++c] * 2 ** 16 + b * 2 ** 24;
          return BigInt(B) + (BigInt(M) << BigInt(32));
        }), $.prototype.readBigUInt64BE = re(function(c) {
          c = c >>> 0, ee(c, "offset");
          const h = this[c], b = this[c + 7];
          (h === void 0 || b === void 0) && C(c, this.length - 8);
          const B = h * 2 ** 24 + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + this[++c], M = this[++c] * 2 ** 24 + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + b;
          return (BigInt(B) << BigInt(32)) + BigInt(M);
        }), $.prototype.readIntLE = function(c, h, b) {
          c = c >>> 0, h = h >>> 0, b || Ie(c, h, this.length);
          let B = this[c], M = 1, q = 0;
          for (; ++q < h && (M *= 256); )
            B += this[c + q] * M;
          return M *= 128, B >= M && (B -= Math.pow(2, 8 * h)), B;
        }, $.prototype.readIntBE = function(c, h, b) {
          c = c >>> 0, h = h >>> 0, b || Ie(c, h, this.length);
          let B = h, M = 1, q = this[c + --B];
          for (; B > 0 && (M *= 256); )
            q += this[c + --B] * M;
          return M *= 128, q >= M && (q -= Math.pow(2, 8 * h)), q;
        }, $.prototype.readInt8 = function(c, h) {
          return c = c >>> 0, h || Ie(c, 1, this.length), this[c] & 128 ? (255 - this[c] + 1) * -1 : this[c];
        }, $.prototype.readInt16LE = function(c, h) {
          c = c >>> 0, h || Ie(c, 2, this.length);
          const b = this[c] | this[c + 1] << 8;
          return b & 32768 ? b | 4294901760 : b;
        }, $.prototype.readInt16BE = function(c, h) {
          c = c >>> 0, h || Ie(c, 2, this.length);
          const b = this[c + 1] | this[c] << 8;
          return b & 32768 ? b | 4294901760 : b;
        }, $.prototype.readInt32LE = function(c, h) {
          return c = c >>> 0, h || Ie(c, 4, this.length), this[c] | this[c + 1] << 8 | this[c + 2] << 16 | this[c + 3] << 24;
        }, $.prototype.readInt32BE = function(c, h) {
          return c = c >>> 0, h || Ie(c, 4, this.length), this[c] << 24 | this[c + 1] << 16 | this[c + 2] << 8 | this[c + 3];
        }, $.prototype.readBigInt64LE = re(function(c) {
          c = c >>> 0, ee(c, "offset");
          const h = this[c], b = this[c + 7];
          (h === void 0 || b === void 0) && C(c, this.length - 8);
          const B = this[c + 4] + this[c + 5] * 2 ** 8 + this[c + 6] * 2 ** 16 + (b << 24);
          return (BigInt(B) << BigInt(32)) + BigInt(h + this[++c] * 2 ** 8 + this[++c] * 2 ** 16 + this[++c] * 2 ** 24);
        }), $.prototype.readBigInt64BE = re(function(c) {
          c = c >>> 0, ee(c, "offset");
          const h = this[c], b = this[c + 7];
          (h === void 0 || b === void 0) && C(c, this.length - 8);
          const B = (h << 24) + // Overflow
          this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + this[++c];
          return (BigInt(B) << BigInt(32)) + BigInt(this[++c] * 2 ** 24 + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + b);
        }), $.prototype.readFloatLE = function(c, h) {
          return c = c >>> 0, h || Ie(c, 4, this.length), N.read(this, c, !0, 23, 4);
        }, $.prototype.readFloatBE = function(c, h) {
          return c = c >>> 0, h || Ie(c, 4, this.length), N.read(this, c, !1, 23, 4);
        }, $.prototype.readDoubleLE = function(c, h) {
          return c = c >>> 0, h || Ie(c, 8, this.length), N.read(this, c, !0, 52, 8);
        }, $.prototype.readDoubleBE = function(c, h) {
          return c = c >>> 0, h || Ie(c, 8, this.length), N.read(this, c, !1, 52, 8);
        };
        function Fe(p, c, h, b, B, M) {
          if (!$.isBuffer(p)) throw new TypeError('"buffer" argument must be a Buffer instance');
          if (c > B || c < M) throw new RangeError('"value" argument is out of bounds');
          if (h + b > p.length) throw new RangeError("Index out of range");
        }
        $.prototype.writeUintLE = $.prototype.writeUIntLE = function(c, h, b, B) {
          if (c = +c, h = h >>> 0, b = b >>> 0, !B) {
            const oe = Math.pow(2, 8 * b) - 1;
            Fe(this, c, h, b, oe, 0);
          }
          let M = 1, q = 0;
          for (this[h] = c & 255; ++q < b && (M *= 256); )
            this[h + q] = c / M & 255;
          return h + b;
        }, $.prototype.writeUintBE = $.prototype.writeUIntBE = function(c, h, b, B) {
          if (c = +c, h = h >>> 0, b = b >>> 0, !B) {
            const oe = Math.pow(2, 8 * b) - 1;
            Fe(this, c, h, b, oe, 0);
          }
          let M = b - 1, q = 1;
          for (this[h + M] = c & 255; --M >= 0 && (q *= 256); )
            this[h + M] = c / q & 255;
          return h + b;
        }, $.prototype.writeUint8 = $.prototype.writeUInt8 = function(c, h, b) {
          return c = +c, h = h >>> 0, b || Fe(this, c, h, 1, 255, 0), this[h] = c & 255, h + 1;
        }, $.prototype.writeUint16LE = $.prototype.writeUInt16LE = function(c, h, b) {
          return c = +c, h = h >>> 0, b || Fe(this, c, h, 2, 65535, 0), this[h] = c & 255, this[h + 1] = c >>> 8, h + 2;
        }, $.prototype.writeUint16BE = $.prototype.writeUInt16BE = function(c, h, b) {
          return c = +c, h = h >>> 0, b || Fe(this, c, h, 2, 65535, 0), this[h] = c >>> 8, this[h + 1] = c & 255, h + 2;
        }, $.prototype.writeUint32LE = $.prototype.writeUInt32LE = function(c, h, b) {
          return c = +c, h = h >>> 0, b || Fe(this, c, h, 4, 4294967295, 0), this[h + 3] = c >>> 24, this[h + 2] = c >>> 16, this[h + 1] = c >>> 8, this[h] = c & 255, h + 4;
        }, $.prototype.writeUint32BE = $.prototype.writeUInt32BE = function(c, h, b) {
          return c = +c, h = h >>> 0, b || Fe(this, c, h, 4, 4294967295, 0), this[h] = c >>> 24, this[h + 1] = c >>> 16, this[h + 2] = c >>> 8, this[h + 3] = c & 255, h + 4;
        };
        function st(p, c, h, b, B) {
          J(c, b, B, p, h, 7);
          let M = Number(c & BigInt(4294967295));
          p[h++] = M, M = M >> 8, p[h++] = M, M = M >> 8, p[h++] = M, M = M >> 8, p[h++] = M;
          let q = Number(c >> BigInt(32) & BigInt(4294967295));
          return p[h++] = q, q = q >> 8, p[h++] = q, q = q >> 8, p[h++] = q, q = q >> 8, p[h++] = q, h;
        }
        function Je(p, c, h, b, B) {
          J(c, b, B, p, h, 7);
          let M = Number(c & BigInt(4294967295));
          p[h + 7] = M, M = M >> 8, p[h + 6] = M, M = M >> 8, p[h + 5] = M, M = M >> 8, p[h + 4] = M;
          let q = Number(c >> BigInt(32) & BigInt(4294967295));
          return p[h + 3] = q, q = q >> 8, p[h + 2] = q, q = q >> 8, p[h + 1] = q, q = q >> 8, p[h] = q, h + 8;
        }
        $.prototype.writeBigUInt64LE = re(function(c, h = 0) {
          return st(this, c, h, BigInt(0), BigInt("0xffffffffffffffff"));
        }), $.prototype.writeBigUInt64BE = re(function(c, h = 0) {
          return Je(this, c, h, BigInt(0), BigInt("0xffffffffffffffff"));
        }), $.prototype.writeIntLE = function(c, h, b, B) {
          if (c = +c, h = h >>> 0, !B) {
            const Ae = Math.pow(2, 8 * b - 1);
            Fe(this, c, h, b, Ae - 1, -Ae);
          }
          let M = 0, q = 1, oe = 0;
          for (this[h] = c & 255; ++M < b && (q *= 256); )
            c < 0 && oe === 0 && this[h + M - 1] !== 0 && (oe = 1), this[h + M] = (c / q >> 0) - oe & 255;
          return h + b;
        }, $.prototype.writeIntBE = function(c, h, b, B) {
          if (c = +c, h = h >>> 0, !B) {
            const Ae = Math.pow(2, 8 * b - 1);
            Fe(this, c, h, b, Ae - 1, -Ae);
          }
          let M = b - 1, q = 1, oe = 0;
          for (this[h + M] = c & 255; --M >= 0 && (q *= 256); )
            c < 0 && oe === 0 && this[h + M + 1] !== 0 && (oe = 1), this[h + M] = (c / q >> 0) - oe & 255;
          return h + b;
        }, $.prototype.writeInt8 = function(c, h, b) {
          return c = +c, h = h >>> 0, b || Fe(this, c, h, 1, 127, -128), c < 0 && (c = 255 + c + 1), this[h] = c & 255, h + 1;
        }, $.prototype.writeInt16LE = function(c, h, b) {
          return c = +c, h = h >>> 0, b || Fe(this, c, h, 2, 32767, -32768), this[h] = c & 255, this[h + 1] = c >>> 8, h + 2;
        }, $.prototype.writeInt16BE = function(c, h, b) {
          return c = +c, h = h >>> 0, b || Fe(this, c, h, 2, 32767, -32768), this[h] = c >>> 8, this[h + 1] = c & 255, h + 2;
        }, $.prototype.writeInt32LE = function(c, h, b) {
          return c = +c, h = h >>> 0, b || Fe(this, c, h, 4, 2147483647, -2147483648), this[h] = c & 255, this[h + 1] = c >>> 8, this[h + 2] = c >>> 16, this[h + 3] = c >>> 24, h + 4;
        }, $.prototype.writeInt32BE = function(c, h, b) {
          return c = +c, h = h >>> 0, b || Fe(this, c, h, 4, 2147483647, -2147483648), c < 0 && (c = 4294967295 + c + 1), this[h] = c >>> 24, this[h + 1] = c >>> 16, this[h + 2] = c >>> 8, this[h + 3] = c & 255, h + 4;
        }, $.prototype.writeBigInt64LE = re(function(c, h = 0) {
          return st(this, c, h, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
        }), $.prototype.writeBigInt64BE = re(function(c, h = 0) {
          return Je(this, c, h, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
        });
        function Et(p, c, h, b, B, M) {
          if (h + b > p.length) throw new RangeError("Index out of range");
          if (h < 0) throw new RangeError("Index out of range");
        }
        function ot(p, c, h, b, B) {
          return c = +c, h = h >>> 0, B || Et(p, c, h, 4), N.write(p, c, h, b, 23, 4), h + 4;
        }
        $.prototype.writeFloatLE = function(c, h, b) {
          return ot(this, c, h, !0, b);
        }, $.prototype.writeFloatBE = function(c, h, b) {
          return ot(this, c, h, !1, b);
        };
        function qe(p, c, h, b, B) {
          return c = +c, h = h >>> 0, B || Et(p, c, h, 8), N.write(p, c, h, b, 52, 8), h + 8;
        }
        $.prototype.writeDoubleLE = function(c, h, b) {
          return qe(this, c, h, !0, b);
        }, $.prototype.writeDoubleBE = function(c, h, b) {
          return qe(this, c, h, !1, b);
        }, $.prototype.copy = function(c, h, b, B) {
          if (!$.isBuffer(c)) throw new TypeError("argument should be a Buffer");
          if (b || (b = 0), !B && B !== 0 && (B = this.length), h >= c.length && (h = c.length), h || (h = 0), B > 0 && B < b && (B = b), B === b || c.length === 0 || this.length === 0) return 0;
          if (h < 0)
            throw new RangeError("targetStart out of bounds");
          if (b < 0 || b >= this.length) throw new RangeError("Index out of range");
          if (B < 0) throw new RangeError("sourceEnd out of bounds");
          B > this.length && (B = this.length), c.length - h < B - b && (B = c.length - h + b);
          const M = B - b;
          return this === c && typeof I.prototype.copyWithin == "function" ? this.copyWithin(h, b, B) : I.prototype.set.call(
            c,
            this.subarray(b, B),
            h
          ), M;
        }, $.prototype.fill = function(c, h, b, B) {
          if (typeof c == "string") {
            if (typeof h == "string" ? (B = h, h = 0, b = this.length) : typeof b == "string" && (B = b, b = this.length), B !== void 0 && typeof B != "string")
              throw new TypeError("encoding must be a string");
            if (typeof B == "string" && !$.isEncoding(B))
              throw new TypeError("Unknown encoding: " + B);
            if (c.length === 1) {
              const q = c.charCodeAt(0);
              (B === "utf8" && q < 128 || B === "latin1") && (c = q);
            }
          } else typeof c == "number" ? c = c & 255 : typeof c == "boolean" && (c = Number(c));
          if (h < 0 || this.length < h || this.length < b)
            throw new RangeError("Out of range index");
          if (b <= h)
            return this;
          h = h >>> 0, b = b === void 0 ? this.length : b >>> 0, c || (c = 0);
          let M;
          if (typeof c == "number")
            for (M = h; M < b; ++M)
              this[M] = c;
          else {
            const q = $.isBuffer(c) ? c : $.from(c, B), oe = q.length;
            if (oe === 0)
              throw new TypeError('The value "' + c + '" is invalid for argument "value"');
            for (M = 0; M < b - h; ++M)
              this[M + h] = q[M % oe];
          }
          return this;
        };
        const Ge = {};
        function wt(p, c, h) {
          Ge[p] = class extends h {
            constructor() {
              super(), Object.defineProperty(this, "message", {
                value: c.apply(this, arguments),
                writable: !0,
                configurable: !0
              }), this.name = `${this.name} [${p}]`, this.stack, delete this.name;
            }
            get code() {
              return p;
            }
            set code(B) {
              Object.defineProperty(this, "code", {
                configurable: !0,
                enumerable: !0,
                value: B,
                writable: !0
              });
            }
            toString() {
              return `${this.name} [${p}]: ${this.message}`;
            }
          };
        }
        wt(
          "ERR_BUFFER_OUT_OF_BOUNDS",
          function(p) {
            return p ? `${p} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
          },
          RangeError
        ), wt(
          "ERR_INVALID_ARG_TYPE",
          function(p, c) {
            return `The "${p}" argument must be of type number. Received type ${typeof c}`;
          },
          TypeError
        ), wt(
          "ERR_OUT_OF_RANGE",
          function(p, c, h) {
            let b = `The value of "${p}" is out of range.`, B = h;
            return Number.isInteger(h) && Math.abs(h) > 2 ** 32 ? B = v(String(h)) : typeof h == "bigint" && (B = String(h), (h > BigInt(2) ** BigInt(32) || h < -(BigInt(2) ** BigInt(32))) && (B = v(B)), B += "n"), b += ` It must be ${c}. Received ${B}`, b;
          },
          RangeError
        );
        function v(p) {
          let c = "", h = p.length;
          const b = p[0] === "-" ? 1 : 0;
          for (; h >= b + 4; h -= 3)
            c = `_${p.slice(h - 3, h)}${c}`;
          return `${p.slice(0, h)}${c}`;
        }
        function Y(p, c, h) {
          ee(c, "offset"), (p[c] === void 0 || p[c + h] === void 0) && C(c, p.length - (h + 1));
        }
        function J(p, c, h, b, B, M) {
          if (p > h || p < c) {
            const q = typeof c == "bigint" ? "n" : "";
            let oe;
            throw c === 0 || c === BigInt(0) ? oe = `>= 0${q} and < 2${q} ** ${(M + 1) * 8}${q}` : oe = `>= -(2${q} ** ${(M + 1) * 8 - 1}${q}) and < 2 ** ${(M + 1) * 8 - 1}${q}`, new Ge.ERR_OUT_OF_RANGE("value", oe, p);
          }
          Y(b, B, M);
        }
        function ee(p, c) {
          if (typeof p != "number")
            throw new Ge.ERR_INVALID_ARG_TYPE(c, "number", p);
        }
        function C(p, c, h) {
          throw Math.floor(p) !== p ? (ee(p, h), new Ge.ERR_OUT_OF_RANGE("offset", "an integer", p)) : c < 0 ? new Ge.ERR_BUFFER_OUT_OF_BOUNDS() : new Ge.ERR_OUT_OF_RANGE(
            "offset",
            `>= 0 and <= ${c}`,
            p
          );
        }
        const W = /[^+/0-9A-Za-z-_]/g;
        function _(p) {
          if (p = p.split("=")[0], p = p.trim().replace(W, ""), p.length < 2) return "";
          for (; p.length % 4 !== 0; )
            p = p + "=";
          return p;
        }
        function V(p, c) {
          c = c || 1 / 0;
          let h;
          const b = p.length;
          let B = null;
          const M = [];
          for (let q = 0; q < b; ++q) {
            if (h = p.charCodeAt(q), h > 55295 && h < 57344) {
              if (!B) {
                if (h > 56319) {
                  (c -= 3) > -1 && M.push(239, 191, 189);
                  continue;
                } else if (q + 1 === b) {
                  (c -= 3) > -1 && M.push(239, 191, 189);
                  continue;
                }
                B = h;
                continue;
              }
              if (h < 56320) {
                (c -= 3) > -1 && M.push(239, 191, 189), B = h;
                continue;
              }
              h = (B - 55296 << 10 | h - 56320) + 65536;
            } else B && (c -= 3) > -1 && M.push(239, 191, 189);
            if (B = null, h < 128) {
              if ((c -= 1) < 0) break;
              M.push(h);
            } else if (h < 2048) {
              if ((c -= 2) < 0) break;
              M.push(
                h >> 6 | 192,
                h & 63 | 128
              );
            } else if (h < 65536) {
              if ((c -= 3) < 0) break;
              M.push(
                h >> 12 | 224,
                h >> 6 & 63 | 128,
                h & 63 | 128
              );
            } else if (h < 1114112) {
              if ((c -= 4) < 0) break;
              M.push(
                h >> 18 | 240,
                h >> 12 & 63 | 128,
                h >> 6 & 63 | 128,
                h & 63 | 128
              );
            } else
              throw new Error("Invalid code point");
          }
          return M;
        }
        function le(p) {
          const c = [];
          for (let h = 0; h < p.length; ++h)
            c.push(p.charCodeAt(h) & 255);
          return c;
        }
        function u(p, c) {
          let h, b, B;
          const M = [];
          for (let q = 0; q < p.length && !((c -= 2) < 0); ++q)
            h = p.charCodeAt(q), b = h >> 8, B = h % 256, M.push(B), M.push(b);
          return M;
        }
        function L(p) {
          return S.toByteArray(_(p));
        }
        function j(p, c, h, b) {
          let B;
          for (B = 0; B < b && !(B + h >= c.length || B >= p.length); ++B)
            c[B + h] = p[B];
          return B;
        }
        function g(p, c) {
          return p instanceof c || p != null && p.constructor != null && p.constructor.name != null && p.constructor.name === c.name;
        }
        function O(p) {
          return p !== p;
        }
        const z = function() {
          const p = "0123456789abcdef", c = new Array(256);
          for (let h = 0; h < 16; ++h) {
            const b = h * 16;
            for (let B = 0; B < 16; ++B)
              c[b + B] = p[h] + p[B];
          }
          return c;
        }();
        function re(p) {
          return typeof BigInt > "u" ? te : p;
        }
        function te() {
          throw new Error("BigInt not supported");
        }
      })(e);
      const R = e.Buffer;
      i.Blob = e.Blob, i.BlobOptions = e.BlobOptions, i.Buffer = e.Buffer, i.File = e.File, i.FileOptions = e.FileOptions, i.INSPECT_MAX_BYTES = e.INSPECT_MAX_BYTES, i.SlowBuffer = e.SlowBuffer, i.TranscodeEncoding = e.TranscodeEncoding, i.atob = e.atob, i.btoa = e.btoa, i.constants = e.constants, i.default = R, i.isAscii = e.isAscii, i.isUtf8 = e.isUtf8, i.kMaxLength = e.kMaxLength, i.kStringMaxLength = e.kStringMaxLength, i.resolveObjectURL = e.resolveObjectURL, i.transcode = e.transcode;
    }(ai)), ai;
  }
  /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
  var wn;
  function pa() {
    return wn || (wn = 1, function(i, e) {
      var t = os(), r = t.Buffer;
      function n(s, o) {
        for (var l in s)
          o[l] = s[l];
      }
      r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? i.exports = t : (n(t, e), e.Buffer = a);
      function a(s, o, l) {
        return r(s, o, l);
      }
      a.prototype = Object.create(r.prototype), n(r, a), a.from = function(s, o, l) {
        if (typeof s == "number")
          throw new TypeError("Argument must not be a number");
        return r(s, o, l);
      }, a.alloc = function(s, o, l) {
        if (typeof s != "number")
          throw new TypeError("Argument must be a number");
        var d = r(s);
        return o !== void 0 ? typeof l == "string" ? d.fill(o, l) : d.fill(o) : d.fill(0), d;
      }, a.allocUnsafe = function(s) {
        if (typeof s != "number")
          throw new TypeError("Argument must be a number");
        return r(s);
      }, a.allocUnsafeSlow = function(s) {
        if (typeof s != "number")
          throw new TypeError("Argument must be a number");
        return t.SlowBuffer(s);
      };
    }(br, br.exports)), br.exports;
  }
  var si, pn;
  function cs() {
    if (pn) return si;
    pn = 1;
    var i = pa().Buffer;
    function e(t, r) {
      this._block = i.alloc(t), this._finalSize = r, this._blockSize = t, this._len = 0;
    }
    return e.prototype.update = function(t, r) {
      typeof t == "string" && (r = r || "utf8", t = i.from(t, r));
      for (var n = this._block, a = this._blockSize, s = t.length, o = this._len, l = 0; l < s; ) {
        for (var d = o % a, f = Math.min(s - l, a - d), w = 0; w < f; w++)
          n[d + w] = t[l + w];
        o += f, l += f, o % a === 0 && this._update(n);
      }
      return this._len += s, this;
    }, e.prototype.digest = function(t) {
      var r = this._len % this._blockSize;
      this._block[r] = 128, this._block.fill(0, r + 1), r >= this._finalSize && (this._update(this._block), this._block.fill(0));
      var n = this._len * 8;
      if (n <= 4294967295)
        this._block.writeUInt32BE(n, this._blockSize - 4);
      else {
        var a = (n & 4294967295) >>> 0, s = (n - a) / 4294967296;
        this._block.writeUInt32BE(s, this._blockSize - 8), this._block.writeUInt32BE(a, this._blockSize - 4);
      }
      this._update(this._block);
      var o = this._hash();
      return t ? o.toString(t) : o;
    }, e.prototype._update = function() {
      throw new Error("_update must be implemented by subclass");
    }, si = e, si;
  }
  var oi, mn;
  function ls() {
    if (mn) return oi;
    mn = 1;
    var i = ss(), e = cs(), t = pa().Buffer, r = [
      1518500249,
      1859775393,
      -1894007588,
      -899497514
    ], n = new Array(80);
    function a() {
      this.init(), this._w = n, e.call(this, 64, 56);
    }
    i(a, e), a.prototype.init = function() {
      return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
    };
    function s(f) {
      return f << 1 | f >>> 31;
    }
    function o(f) {
      return f << 5 | f >>> 27;
    }
    function l(f) {
      return f << 30 | f >>> 2;
    }
    function d(f, w, m, y) {
      return f === 0 ? w & m | ~w & y : f === 2 ? w & m | w & y | m & y : w ^ m ^ y;
    }
    return a.prototype._update = function(f) {
      for (var w = this._w, m = this._a | 0, y = this._b | 0, k = this._c | 0, x = this._d | 0, E = this._e | 0, R = 0; R < 16; ++R) w[R] = f.readInt32BE(R * 4);
      for (; R < 80; ++R) w[R] = s(w[R - 3] ^ w[R - 8] ^ w[R - 14] ^ w[R - 16]);
      for (var T = 0; T < 80; ++T) {
        var S = ~~(T / 20), N = o(m) + d(S, y, k, x) + E + w[T] + r[S] | 0;
        E = x, x = k, k = l(y), y = m, m = N;
      }
      this._a = m + this._a | 0, this._b = y + this._b | 0, this._c = k + this._c | 0, this._d = x + this._d | 0, this._e = E + this._e | 0;
    }, a.prototype._hash = function() {
      var f = t.allocUnsafe(20);
      return f.writeInt32BE(this._a | 0, 0), f.writeInt32BE(this._b | 0, 4), f.writeInt32BE(this._c | 0, 8), f.writeInt32BE(this._d | 0, 12), f.writeInt32BE(this._e | 0, 16), f;
    }, oi = a, oi;
  }
  var us = ls();
  const ma = /* @__PURE__ */ qt(us);
  var ci, _n;
  function fs() {
    if (_n) return ci;
    _n = 1;
    function i(n) {
      if (typeof n != "string")
        throw new TypeError("Path must be a string. Received " + JSON.stringify(n));
    }
    function e(n, a) {
      for (var s = "", o = 0, l = -1, d = 0, f, w = 0; w <= n.length; ++w) {
        if (w < n.length)
          f = n.charCodeAt(w);
        else {
          if (f === 47)
            break;
          f = 47;
        }
        if (f === 47) {
          if (!(l === w - 1 || d === 1)) if (l !== w - 1 && d === 2) {
            if (s.length < 2 || o !== 2 || s.charCodeAt(s.length - 1) !== 46 || s.charCodeAt(s.length - 2) !== 46) {
              if (s.length > 2) {
                var m = s.lastIndexOf("/");
                if (m !== s.length - 1) {
                  m === -1 ? (s = "", o = 0) : (s = s.slice(0, m), o = s.length - 1 - s.lastIndexOf("/")), l = w, d = 0;
                  continue;
                }
              } else if (s.length === 2 || s.length === 1) {
                s = "", o = 0, l = w, d = 0;
                continue;
              }
            }
            a && (s.length > 0 ? s += "/.." : s = "..", o = 2);
          } else
            s.length > 0 ? s += "/" + n.slice(l + 1, w) : s = n.slice(l + 1, w), o = w - l - 1;
          l = w, d = 0;
        } else f === 46 && d !== -1 ? ++d : d = -1;
      }
      return s;
    }
    function t(n, a) {
      var s = a.dir || a.root, o = a.base || (a.name || "") + (a.ext || "");
      return s ? s === a.root ? s + o : s + n + o : o;
    }
    var r = {
      // path.resolve([from ...], to)
      resolve: function() {
        for (var a = "", s = !1, o, l = arguments.length - 1; l >= -1 && !s; l--) {
          var d;
          l >= 0 ? d = arguments[l] : (o === void 0 && (o = Qe.cwd()), d = o), i(d), d.length !== 0 && (a = d + "/" + a, s = d.charCodeAt(0) === 47);
        }
        return a = e(a, !s), s ? a.length > 0 ? "/" + a : "/" : a.length > 0 ? a : ".";
      },
      normalize: function(a) {
        if (i(a), a.length === 0) return ".";
        var s = a.charCodeAt(0) === 47, o = a.charCodeAt(a.length - 1) === 47;
        return a = e(a, !s), a.length === 0 && !s && (a = "."), a.length > 0 && o && (a += "/"), s ? "/" + a : a;
      },
      isAbsolute: function(a) {
        return i(a), a.length > 0 && a.charCodeAt(0) === 47;
      },
      join: function() {
        if (arguments.length === 0)
          return ".";
        for (var a, s = 0; s < arguments.length; ++s) {
          var o = arguments[s];
          i(o), o.length > 0 && (a === void 0 ? a = o : a += "/" + o);
        }
        return a === void 0 ? "." : r.normalize(a);
      },
      relative: function(a, s) {
        if (i(a), i(s), a === s || (a = r.resolve(a), s = r.resolve(s), a === s)) return "";
        for (var o = 1; o < a.length && a.charCodeAt(o) === 47; ++o)
          ;
        for (var l = a.length, d = l - o, f = 1; f < s.length && s.charCodeAt(f) === 47; ++f)
          ;
        for (var w = s.length, m = w - f, y = d < m ? d : m, k = -1, x = 0; x <= y; ++x) {
          if (x === y) {
            if (m > y) {
              if (s.charCodeAt(f + x) === 47)
                return s.slice(f + x + 1);
              if (x === 0)
                return s.slice(f + x);
            } else d > y && (a.charCodeAt(o + x) === 47 ? k = x : x === 0 && (k = 0));
            break;
          }
          var E = a.charCodeAt(o + x), R = s.charCodeAt(f + x);
          if (E !== R)
            break;
          E === 47 && (k = x);
        }
        var T = "";
        for (x = o + k + 1; x <= l; ++x)
          (x === l || a.charCodeAt(x) === 47) && (T.length === 0 ? T += ".." : T += "/..");
        return T.length > 0 ? T + s.slice(f + k) : (f += k, s.charCodeAt(f) === 47 && ++f, s.slice(f));
      },
      _makeLong: function(a) {
        return a;
      },
      dirname: function(a) {
        if (i(a), a.length === 0) return ".";
        for (var s = a.charCodeAt(0), o = s === 47, l = -1, d = !0, f = a.length - 1; f >= 1; --f)
          if (s = a.charCodeAt(f), s === 47) {
            if (!d) {
              l = f;
              break;
            }
          } else
            d = !1;
        return l === -1 ? o ? "/" : "." : o && l === 1 ? "//" : a.slice(0, l);
      },
      basename: function(a, s) {
        if (s !== void 0 && typeof s != "string") throw new TypeError('"ext" argument must be a string');
        i(a);
        var o = 0, l = -1, d = !0, f;
        if (s !== void 0 && s.length > 0 && s.length <= a.length) {
          if (s.length === a.length && s === a) return "";
          var w = s.length - 1, m = -1;
          for (f = a.length - 1; f >= 0; --f) {
            var y = a.charCodeAt(f);
            if (y === 47) {
              if (!d) {
                o = f + 1;
                break;
              }
            } else
              m === -1 && (d = !1, m = f + 1), w >= 0 && (y === s.charCodeAt(w) ? --w === -1 && (l = f) : (w = -1, l = m));
          }
          return o === l ? l = m : l === -1 && (l = a.length), a.slice(o, l);
        } else {
          for (f = a.length - 1; f >= 0; --f)
            if (a.charCodeAt(f) === 47) {
              if (!d) {
                o = f + 1;
                break;
              }
            } else l === -1 && (d = !1, l = f + 1);
          return l === -1 ? "" : a.slice(o, l);
        }
      },
      extname: function(a) {
        i(a);
        for (var s = -1, o = 0, l = -1, d = !0, f = 0, w = a.length - 1; w >= 0; --w) {
          var m = a.charCodeAt(w);
          if (m === 47) {
            if (!d) {
              o = w + 1;
              break;
            }
            continue;
          }
          l === -1 && (d = !1, l = w + 1), m === 46 ? s === -1 ? s = w : f !== 1 && (f = 1) : s !== -1 && (f = -1);
        }
        return s === -1 || l === -1 || // We saw a non-dot character immediately before the dot
        f === 0 || // The (right-most) trimmed path component is exactly '..'
        f === 1 && s === l - 1 && s === o + 1 ? "" : a.slice(s, l);
      },
      format: function(a) {
        if (a === null || typeof a != "object")
          throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof a);
        return t("/", a);
      },
      parse: function(a) {
        i(a);
        var s = { root: "", dir: "", base: "", ext: "", name: "" };
        if (a.length === 0) return s;
        var o = a.charCodeAt(0), l = o === 47, d;
        l ? (s.root = "/", d = 1) : d = 0;
        for (var f = -1, w = 0, m = -1, y = !0, k = a.length - 1, x = 0; k >= d; --k) {
          if (o = a.charCodeAt(k), o === 47) {
            if (!y) {
              w = k + 1;
              break;
            }
            continue;
          }
          m === -1 && (y = !1, m = k + 1), o === 46 ? f === -1 ? f = k : x !== 1 && (x = 1) : f !== -1 && (x = -1);
        }
        return f === -1 || m === -1 || // We saw a non-dot character immediately before the dot
        x === 0 || // The (right-most) trimmed path component is exactly '..'
        x === 1 && f === m - 1 && f === w + 1 ? m !== -1 && (w === 0 && l ? s.base = s.name = a.slice(1, m) : s.base = s.name = a.slice(w, m)) : (w === 0 && l ? (s.name = a.slice(1, f), s.base = a.slice(1, m)) : (s.name = a.slice(w, f), s.base = a.slice(w, m)), s.ext = a.slice(f, m)), w > 0 ? s.dir = a.slice(0, w - 1) : l && (s.dir = "/"), s;
      },
      sep: "/",
      delimiter: ":",
      win32: null,
      posix: null
    };
    return r.posix = r, ci = r, ci;
  }
  var $e = fs(), li = {};
  /*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */
  var gn;
  function hs() {
    return gn || (gn = 1, function(i) {
      (function(e) {
        e(typeof DO_NOT_EXPORT_CRC > "u" ? i : {});
      })(function(e) {
        e.version = "1.2.2";
        function t() {
          for (var A = 0, U = new Array(256), P = 0; P != 256; ++P)
            A = P, A = A & 1 ? -306674912 ^ A >>> 1 : A >>> 1, A = A & 1 ? -306674912 ^ A >>> 1 : A >>> 1, A = A & 1 ? -306674912 ^ A >>> 1 : A >>> 1, A = A & 1 ? -306674912 ^ A >>> 1 : A >>> 1, A = A & 1 ? -306674912 ^ A >>> 1 : A >>> 1, A = A & 1 ? -306674912 ^ A >>> 1 : A >>> 1, A = A & 1 ? -306674912 ^ A >>> 1 : A >>> 1, A = A & 1 ? -306674912 ^ A >>> 1 : A >>> 1, U[P] = A;
          return typeof Int32Array < "u" ? new Int32Array(U) : U;
        }
        var r = t();
        function n(A) {
          var U = 0, P = 0, G = 0, $ = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
          for (G = 0; G != 256; ++G) $[G] = A[G];
          for (G = 0; G != 256; ++G)
            for (P = A[G], U = 256 + G; U < 4096; U += 256) P = $[U] = P >>> 8 ^ A[P & 255];
          var Z = [];
          for (G = 1; G != 16; ++G) Z[G - 1] = typeof Int32Array < "u" ? $.subarray(G * 256, G * 256 + 256) : $.slice(G * 256, G * 256 + 256);
          return Z;
        }
        var a = n(r), s = a[0], o = a[1], l = a[2], d = a[3], f = a[4], w = a[5], m = a[6], y = a[7], k = a[8], x = a[9], E = a[10], R = a[11], T = a[12], S = a[13], N = a[14];
        function D(A, U) {
          for (var P = U ^ -1, G = 0, $ = A.length; G < $; ) P = P >>> 8 ^ r[(P ^ A.charCodeAt(G++)) & 255];
          return ~P;
        }
        function F(A, U) {
          for (var P = U ^ -1, G = A.length - 15, $ = 0; $ < G; ) P = N[A[$++] ^ P & 255] ^ S[A[$++] ^ P >> 8 & 255] ^ T[A[$++] ^ P >> 16 & 255] ^ R[A[$++] ^ P >>> 24] ^ E[A[$++]] ^ x[A[$++]] ^ k[A[$++]] ^ y[A[$++]] ^ m[A[$++]] ^ w[A[$++]] ^ f[A[$++]] ^ d[A[$++]] ^ l[A[$++]] ^ o[A[$++]] ^ s[A[$++]] ^ r[A[$++]];
          for (G += 15; $ < G; ) P = P >>> 8 ^ r[(P ^ A[$++]) & 255];
          return ~P;
        }
        function I(A, U) {
          for (var P = U ^ -1, G = 0, $ = A.length, Z = 0, Q = 0; G < $; )
            Z = A.charCodeAt(G++), Z < 128 ? P = P >>> 8 ^ r[(P ^ Z) & 255] : Z < 2048 ? (P = P >>> 8 ^ r[(P ^ (192 | Z >> 6 & 31)) & 255], P = P >>> 8 ^ r[(P ^ (128 | Z & 63)) & 255]) : Z >= 55296 && Z < 57344 ? (Z = (Z & 1023) + 64, Q = A.charCodeAt(G++) & 1023, P = P >>> 8 ^ r[(P ^ (240 | Z >> 8 & 7)) & 255], P = P >>> 8 ^ r[(P ^ (128 | Z >> 2 & 63)) & 255], P = P >>> 8 ^ r[(P ^ (128 | Q >> 6 & 15 | (Z & 3) << 4)) & 255], P = P >>> 8 ^ r[(P ^ (128 | Q & 63)) & 255]) : (P = P >>> 8 ^ r[(P ^ (224 | Z >> 12 & 15)) & 255], P = P >>> 8 ^ r[(P ^ (128 | Z >> 6 & 63)) & 255], P = P >>> 8 ^ r[(P ^ (128 | Z & 63)) & 255]);
          return ~P;
        }
        e.table = r, e.bstr = D, e.buf = F, e.str = I;
      });
    }(li)), li;
  }
  var ds = hs();
  const ws = /* @__PURE__ */ qt(ds);
  var ui = {}, yn;
  function Ot() {
    return yn || (yn = 1, function(i) {
      var e = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
      function t(a, s) {
        return Object.prototype.hasOwnProperty.call(a, s);
      }
      i.assign = function(a) {
        for (var s = Array.prototype.slice.call(arguments, 1); s.length; ) {
          var o = s.shift();
          if (o) {
            if (typeof o != "object")
              throw new TypeError(o + "must be non-object");
            for (var l in o)
              t(o, l) && (a[l] = o[l]);
          }
        }
        return a;
      }, i.shrinkBuf = function(a, s) {
        return a.length === s ? a : a.subarray ? a.subarray(0, s) : (a.length = s, a);
      };
      var r = {
        arraySet: function(a, s, o, l, d) {
          if (s.subarray && a.subarray) {
            a.set(s.subarray(o, o + l), d);
            return;
          }
          for (var f = 0; f < l; f++)
            a[d + f] = s[o + f];
        },
        // Join array of chunks to single array.
        flattenChunks: function(a) {
          var s, o, l, d, f, w;
          for (l = 0, s = 0, o = a.length; s < o; s++)
            l += a[s].length;
          for (w = new Uint8Array(l), d = 0, s = 0, o = a.length; s < o; s++)
            f = a[s], w.set(f, d), d += f.length;
          return w;
        }
      }, n = {
        arraySet: function(a, s, o, l, d) {
          for (var f = 0; f < l; f++)
            a[d + f] = s[o + f];
        },
        // Join array of chunks to single array.
        flattenChunks: function(a) {
          return [].concat.apply([], a);
        }
      };
      i.setTyped = function(a) {
        a ? (i.Buf8 = Uint8Array, i.Buf16 = Uint16Array, i.Buf32 = Int32Array, i.assign(i, r)) : (i.Buf8 = Array, i.Buf16 = Array, i.Buf32 = Array, i.assign(i, n));
      }, i.setTyped(e);
    }(ui)), ui;
  }
  var Zt = {}, ct = {}, Ct = {}, vn;
  function ps() {
    if (vn) return Ct;
    vn = 1;
    var i = Ot(), e = 4, t = 0, r = 1, n = 2;
    function a(v) {
      for (var Y = v.length; --Y >= 0; )
        v[Y] = 0;
    }
    var s = 0, o = 1, l = 2, d = 3, f = 258, w = 29, m = 256, y = m + 1 + w, k = 30, x = 19, E = 2 * y + 1, R = 15, T = 16, S = 7, N = 256, D = 16, F = 17, I = 18, A = (
      /* extra bits for each length code */
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
    ), U = (
      /* extra bits for each distance code */
      [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
    ), P = (
      /* extra bits for each bit length code */
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
    ), G = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], $ = 512, Z = new Array((y + 2) * 2);
    a(Z);
    var Q = new Array(k * 2);
    a(Q);
    var ce = new Array($);
    a(ce);
    var X = new Array(f - d + 1);
    a(X);
    var H = new Array(w);
    a(H);
    var K = new Array(k);
    a(K);
    function ie(v, Y, J, ee, C) {
      this.static_tree = v, this.extra_bits = Y, this.extra_base = J, this.elems = ee, this.max_length = C, this.has_stree = v && v.length;
    }
    var de, _e, ue;
    function ve(v, Y) {
      this.dyn_tree = v, this.max_code = 0, this.stat_desc = Y;
    }
    function be(v) {
      return v < 256 ? ce[v] : ce[256 + (v >>> 7)];
    }
    function Be(v, Y) {
      v.pending_buf[v.pending++] = Y & 255, v.pending_buf[v.pending++] = Y >>> 8 & 255;
    }
    function we(v, Y, J) {
      v.bi_valid > T - J ? (v.bi_buf |= Y << v.bi_valid & 65535, Be(v, v.bi_buf), v.bi_buf = Y >> T - v.bi_valid, v.bi_valid += J - T) : (v.bi_buf |= Y << v.bi_valid & 65535, v.bi_valid += J);
    }
    function he(v, Y, J) {
      we(
        v,
        J[Y * 2],
        J[Y * 2 + 1]
        /*.Len*/
      );
    }
    function Ee(v, Y) {
      var J = 0;
      do
        J |= v & 1, v >>>= 1, J <<= 1;
      while (--Y > 0);
      return J >>> 1;
    }
    function Ne(v) {
      v.bi_valid === 16 ? (Be(v, v.bi_buf), v.bi_buf = 0, v.bi_valid = 0) : v.bi_valid >= 8 && (v.pending_buf[v.pending++] = v.bi_buf & 255, v.bi_buf >>= 8, v.bi_valid -= 8);
    }
    function Ze(v, Y) {
      var J = Y.dyn_tree, ee = Y.max_code, C = Y.stat_desc.static_tree, W = Y.stat_desc.has_stree, _ = Y.stat_desc.extra_bits, V = Y.stat_desc.extra_base, le = Y.stat_desc.max_length, u, L, j, g, O, z, re = 0;
      for (g = 0; g <= R; g++)
        v.bl_count[g] = 0;
      for (J[v.heap[v.heap_max] * 2 + 1] = 0, u = v.heap_max + 1; u < E; u++)
        L = v.heap[u], g = J[J[L * 2 + 1] * 2 + 1] + 1, g > le && (g = le, re++), J[L * 2 + 1] = g, !(L > ee) && (v.bl_count[g]++, O = 0, L >= V && (O = _[L - V]), z = J[L * 2], v.opt_len += z * (g + O), W && (v.static_len += z * (C[L * 2 + 1] + O)));
      if (re !== 0) {
        do {
          for (g = le - 1; v.bl_count[g] === 0; )
            g--;
          v.bl_count[g]--, v.bl_count[g + 1] += 2, v.bl_count[le]--, re -= 2;
        } while (re > 0);
        for (g = le; g !== 0; g--)
          for (L = v.bl_count[g]; L !== 0; )
            j = v.heap[--u], !(j > ee) && (J[j * 2 + 1] !== g && (v.opt_len += (g - J[j * 2 + 1]) * J[j * 2], J[j * 2 + 1] = g), L--);
      }
    }
    function Le(v, Y, J) {
      var ee = new Array(R + 1), C = 0, W, _;
      for (W = 1; W <= R; W++)
        ee[W] = C = C + J[W - 1] << 1;
      for (_ = 0; _ <= Y; _++) {
        var V = v[_ * 2 + 1];
        V !== 0 && (v[_ * 2] = Ee(ee[V]++, V));
      }
    }
    function ae() {
      var v, Y, J, ee, C, W = new Array(R + 1);
      for (J = 0, ee = 0; ee < w - 1; ee++)
        for (H[ee] = J, v = 0; v < 1 << A[ee]; v++)
          X[J++] = ee;
      for (X[J - 1] = ee, C = 0, ee = 0; ee < 16; ee++)
        for (K[ee] = C, v = 0; v < 1 << U[ee]; v++)
          ce[C++] = ee;
      for (C >>= 7; ee < k; ee++)
        for (K[ee] = C << 7, v = 0; v < 1 << U[ee] - 7; v++)
          ce[256 + C++] = ee;
      for (Y = 0; Y <= R; Y++)
        W[Y] = 0;
      for (v = 0; v <= 143; )
        Z[v * 2 + 1] = 8, v++, W[8]++;
      for (; v <= 255; )
        Z[v * 2 + 1] = 9, v++, W[9]++;
      for (; v <= 279; )
        Z[v * 2 + 1] = 7, v++, W[7]++;
      for (; v <= 287; )
        Z[v * 2 + 1] = 8, v++, W[8]++;
      for (Le(Z, y + 1, W), v = 0; v < k; v++)
        Q[v * 2 + 1] = 5, Q[v * 2] = Ee(v, 5);
      de = new ie(Z, A, m + 1, y, R), _e = new ie(Q, U, 0, k, R), ue = new ie(new Array(0), P, 0, x, S);
    }
    function ke(v) {
      var Y;
      for (Y = 0; Y < y; Y++)
        v.dyn_ltree[Y * 2] = 0;
      for (Y = 0; Y < k; Y++)
        v.dyn_dtree[Y * 2] = 0;
      for (Y = 0; Y < x; Y++)
        v.bl_tree[Y * 2] = 0;
      v.dyn_ltree[N * 2] = 1, v.opt_len = v.static_len = 0, v.last_lit = v.matches = 0;
    }
    function De(v) {
      v.bi_valid > 8 ? Be(v, v.bi_buf) : v.bi_valid > 0 && (v.pending_buf[v.pending++] = v.bi_buf), v.bi_buf = 0, v.bi_valid = 0;
    }
    function Oe(v, Y, J, ee) {
      De(v), Be(v, J), Be(v, ~J), i.arraySet(v.pending_buf, v.window, Y, J, v.pending), v.pending += J;
    }
    function je(v, Y, J, ee) {
      var C = Y * 2, W = J * 2;
      return v[C] < v[W] || v[C] === v[W] && ee[Y] <= ee[J];
    }
    function Se(v, Y, J) {
      for (var ee = v.heap[J], C = J << 1; C <= v.heap_len && (C < v.heap_len && je(Y, v.heap[C + 1], v.heap[C], v.depth) && C++, !je(Y, ee, v.heap[C], v.depth)); )
        v.heap[J] = v.heap[C], J = C, C <<= 1;
      v.heap[J] = ee;
    }
    function pe(v, Y, J) {
      var ee, C, W = 0, _, V;
      if (v.last_lit !== 0)
        do
          ee = v.pending_buf[v.d_buf + W * 2] << 8 | v.pending_buf[v.d_buf + W * 2 + 1], C = v.pending_buf[v.l_buf + W], W++, ee === 0 ? he(v, C, Y) : (_ = X[C], he(v, _ + m + 1, Y), V = A[_], V !== 0 && (C -= H[_], we(v, C, V)), ee--, _ = be(ee), he(v, _, J), V = U[_], V !== 0 && (ee -= K[_], we(v, ee, V)));
        while (W < v.last_lit);
      he(v, N, Y);
    }
    function Ke(v, Y) {
      var J = Y.dyn_tree, ee = Y.stat_desc.static_tree, C = Y.stat_desc.has_stree, W = Y.stat_desc.elems, _, V, le = -1, u;
      for (v.heap_len = 0, v.heap_max = E, _ = 0; _ < W; _++)
        J[_ * 2] !== 0 ? (v.heap[++v.heap_len] = le = _, v.depth[_] = 0) : J[_ * 2 + 1] = 0;
      for (; v.heap_len < 2; )
        u = v.heap[++v.heap_len] = le < 2 ? ++le : 0, J[u * 2] = 1, v.depth[u] = 0, v.opt_len--, C && (v.static_len -= ee[u * 2 + 1]);
      for (Y.max_code = le, _ = v.heap_len >> 1; _ >= 1; _--)
        Se(v, J, _);
      u = W;
      do
        _ = v.heap[
          1
          /*SMALLEST*/
        ], v.heap[
          1
          /*SMALLEST*/
        ] = v.heap[v.heap_len--], Se(
          v,
          J,
          1
          /*SMALLEST*/
        ), V = v.heap[
          1
          /*SMALLEST*/
        ], v.heap[--v.heap_max] = _, v.heap[--v.heap_max] = V, J[u * 2] = J[_ * 2] + J[V * 2], v.depth[u] = (v.depth[_] >= v.depth[V] ? v.depth[_] : v.depth[V]) + 1, J[_ * 2 + 1] = J[V * 2 + 1] = u, v.heap[
          1
          /*SMALLEST*/
        ] = u++, Se(
          v,
          J,
          1
          /*SMALLEST*/
        );
      while (v.heap_len >= 2);
      v.heap[--v.heap_max] = v.heap[
        1
        /*SMALLEST*/
      ], Ze(v, Y), Le(J, le, v.bl_count);
    }
    function At(v, Y, J) {
      var ee, C = -1, W, _ = Y[0 * 2 + 1], V = 0, le = 7, u = 4;
      for (_ === 0 && (le = 138, u = 3), Y[(J + 1) * 2 + 1] = 65535, ee = 0; ee <= J; ee++)
        W = _, _ = Y[(ee + 1) * 2 + 1], !(++V < le && W === _) && (V < u ? v.bl_tree[W * 2] += V : W !== 0 ? (W !== C && v.bl_tree[W * 2]++, v.bl_tree[D * 2]++) : V <= 10 ? v.bl_tree[F * 2]++ : v.bl_tree[I * 2]++, V = 0, C = W, _ === 0 ? (le = 138, u = 3) : W === _ ? (le = 6, u = 3) : (le = 7, u = 4));
    }
    function dt(v, Y, J) {
      var ee, C = -1, W, _ = Y[0 * 2 + 1], V = 0, le = 7, u = 4;
      for (_ === 0 && (le = 138, u = 3), ee = 0; ee <= J; ee++)
        if (W = _, _ = Y[(ee + 1) * 2 + 1], !(++V < le && W === _)) {
          if (V < u)
            do
              he(v, W, v.bl_tree);
            while (--V !== 0);
          else W !== 0 ? (W !== C && (he(v, W, v.bl_tree), V--), he(v, D, v.bl_tree), we(v, V - 3, 2)) : V <= 10 ? (he(v, F, v.bl_tree), we(v, V - 3, 3)) : (he(v, I, v.bl_tree), we(v, V - 11, 7));
          V = 0, C = W, _ === 0 ? (le = 138, u = 3) : W === _ ? (le = 6, u = 3) : (le = 7, u = 4);
        }
    }
    function Ie(v) {
      var Y;
      for (At(v, v.dyn_ltree, v.l_desc.max_code), At(v, v.dyn_dtree, v.d_desc.max_code), Ke(v, v.bl_desc), Y = x - 1; Y >= 3 && v.bl_tree[G[Y] * 2 + 1] === 0; Y--)
        ;
      return v.opt_len += 3 * (Y + 1) + 5 + 5 + 4, Y;
    }
    function Fe(v, Y, J, ee) {
      var C;
      for (we(v, Y - 257, 5), we(v, J - 1, 5), we(v, ee - 4, 4), C = 0; C < ee; C++)
        we(v, v.bl_tree[G[C] * 2 + 1], 3);
      dt(v, v.dyn_ltree, Y - 1), dt(v, v.dyn_dtree, J - 1);
    }
    function st(v) {
      var Y = 4093624447, J;
      for (J = 0; J <= 31; J++, Y >>>= 1)
        if (Y & 1 && v.dyn_ltree[J * 2] !== 0)
          return t;
      if (v.dyn_ltree[9 * 2] !== 0 || v.dyn_ltree[10 * 2] !== 0 || v.dyn_ltree[13 * 2] !== 0)
        return r;
      for (J = 32; J < m; J++)
        if (v.dyn_ltree[J * 2] !== 0)
          return r;
      return t;
    }
    var Je = !1;
    function Et(v) {
      Je || (ae(), Je = !0), v.l_desc = new ve(v.dyn_ltree, de), v.d_desc = new ve(v.dyn_dtree, _e), v.bl_desc = new ve(v.bl_tree, ue), v.bi_buf = 0, v.bi_valid = 0, ke(v);
    }
    function ot(v, Y, J, ee) {
      we(v, (s << 1) + (ee ? 1 : 0), 3), Oe(v, Y, J);
    }
    function qe(v) {
      we(v, o << 1, 3), he(v, N, Z), Ne(v);
    }
    function Ge(v, Y, J, ee) {
      var C, W, _ = 0;
      v.level > 0 ? (v.strm.data_type === n && (v.strm.data_type = st(v)), Ke(v, v.l_desc), Ke(v, v.d_desc), _ = Ie(v), C = v.opt_len + 3 + 7 >>> 3, W = v.static_len + 3 + 7 >>> 3, W <= C && (C = W)) : C = W = J + 5, J + 4 <= C && Y !== -1 ? ot(v, Y, J, ee) : v.strategy === e || W === C ? (we(v, (o << 1) + (ee ? 1 : 0), 3), pe(v, Z, Q)) : (we(v, (l << 1) + (ee ? 1 : 0), 3), Fe(v, v.l_desc.max_code + 1, v.d_desc.max_code + 1, _ + 1), pe(v, v.dyn_ltree, v.dyn_dtree)), ke(v), ee && De(v);
    }
    function wt(v, Y, J) {
      return v.pending_buf[v.d_buf + v.last_lit * 2] = Y >>> 8 & 255, v.pending_buf[v.d_buf + v.last_lit * 2 + 1] = Y & 255, v.pending_buf[v.l_buf + v.last_lit] = J & 255, v.last_lit++, Y === 0 ? v.dyn_ltree[J * 2]++ : (v.matches++, Y--, v.dyn_ltree[(X[J] + m + 1) * 2]++, v.dyn_dtree[be(Y) * 2]++), v.last_lit === v.lit_bufsize - 1;
    }
    return Ct._tr_init = Et, Ct._tr_stored_block = ot, Ct._tr_flush_block = Ge, Ct._tr_tally = wt, Ct._tr_align = qe, Ct;
  }
  var fi, bn;
  function _a() {
    if (bn) return fi;
    bn = 1;
    function i(e, t, r, n) {
      for (var a = e & 65535 | 0, s = e >>> 16 & 65535 | 0, o = 0; r !== 0; ) {
        o = r > 2e3 ? 2e3 : r, r -= o;
        do
          a = a + t[n++] | 0, s = s + a | 0;
        while (--o);
        a %= 65521, s %= 65521;
      }
      return a | s << 16 | 0;
    }
    return fi = i, fi;
  }
  var hi, En;
  function ga() {
    if (En) return hi;
    En = 1;
    function i() {
      for (var r, n = [], a = 0; a < 256; a++) {
        r = a;
        for (var s = 0; s < 8; s++)
          r = r & 1 ? 3988292384 ^ r >>> 1 : r >>> 1;
        n[a] = r;
      }
      return n;
    }
    var e = i();
    function t(r, n, a, s) {
      var o = e, l = s + a;
      r ^= -1;
      for (var d = s; d < l; d++)
        r = r >>> 8 ^ o[(r ^ n[d]) & 255];
      return r ^ -1;
    }
    return hi = t, hi;
  }
  var di, kn;
  function Ji() {
    return kn || (kn = 1, di = {
      2: "need dictionary",
      /* Z_NEED_DICT       2  */
      1: "stream end",
      /* Z_STREAM_END      1  */
      0: "",
      /* Z_OK              0  */
      "-1": "file error",
      /* Z_ERRNO         (-1) */
      "-2": "stream error",
      /* Z_STREAM_ERROR  (-2) */
      "-3": "data error",
      /* Z_DATA_ERROR    (-3) */
      "-4": "insufficient memory",
      /* Z_MEM_ERROR     (-4) */
      "-5": "buffer error",
      /* Z_BUF_ERROR     (-5) */
      "-6": "incompatible version"
      /* Z_VERSION_ERROR (-6) */
    }), di;
  }
  var xn;
  function ms() {
    if (xn) return ct;
    xn = 1;
    var i = Ot(), e = ps(), t = _a(), r = ga(), n = Ji(), a = 0, s = 1, o = 3, l = 4, d = 5, f = 0, w = 1, m = -2, y = -3, k = -5, x = -1, E = 1, R = 2, T = 3, S = 4, N = 0, D = 2, F = 8, I = 9, A = 15, U = 8, P = 29, G = 256, $ = G + 1 + P, Z = 30, Q = 19, ce = 2 * $ + 1, X = 15, H = 3, K = 258, ie = K + H + 1, de = 32, _e = 42, ue = 69, ve = 73, be = 91, Be = 103, we = 113, he = 666, Ee = 1, Ne = 2, Ze = 3, Le = 4, ae = 3;
    function ke(u, L) {
      return u.msg = n[L], L;
    }
    function De(u) {
      return (u << 1) - (u > 4 ? 9 : 0);
    }
    function Oe(u) {
      for (var L = u.length; --L >= 0; )
        u[L] = 0;
    }
    function je(u) {
      var L = u.state, j = L.pending;
      j > u.avail_out && (j = u.avail_out), j !== 0 && (i.arraySet(u.output, L.pending_buf, L.pending_out, j, u.next_out), u.next_out += j, L.pending_out += j, u.total_out += j, u.avail_out -= j, L.pending -= j, L.pending === 0 && (L.pending_out = 0));
    }
    function Se(u, L) {
      e._tr_flush_block(u, u.block_start >= 0 ? u.block_start : -1, u.strstart - u.block_start, L), u.block_start = u.strstart, je(u.strm);
    }
    function pe(u, L) {
      u.pending_buf[u.pending++] = L;
    }
    function Ke(u, L) {
      u.pending_buf[u.pending++] = L >>> 8 & 255, u.pending_buf[u.pending++] = L & 255;
    }
    function At(u, L, j, g) {
      var O = u.avail_in;
      return O > g && (O = g), O === 0 ? 0 : (u.avail_in -= O, i.arraySet(L, u.input, u.next_in, O, j), u.state.wrap === 1 ? u.adler = t(u.adler, L, O, j) : u.state.wrap === 2 && (u.adler = r(u.adler, L, O, j)), u.next_in += O, u.total_in += O, O);
    }
    function dt(u, L) {
      var j = u.max_chain_length, g = u.strstart, O, z, re = u.prev_length, te = u.nice_match, p = u.strstart > u.w_size - ie ? u.strstart - (u.w_size - ie) : 0, c = u.window, h = u.w_mask, b = u.prev, B = u.strstart + K, M = c[g + re - 1], q = c[g + re];
      u.prev_length >= u.good_match && (j >>= 2), te > u.lookahead && (te = u.lookahead);
      do
        if (O = L, !(c[O + re] !== q || c[O + re - 1] !== M || c[O] !== c[g] || c[++O] !== c[g + 1])) {
          g += 2, O++;
          do
            ;
          while (c[++g] === c[++O] && c[++g] === c[++O] && c[++g] === c[++O] && c[++g] === c[++O] && c[++g] === c[++O] && c[++g] === c[++O] && c[++g] === c[++O] && c[++g] === c[++O] && g < B);
          if (z = K - (B - g), g = B - K, z > re) {
            if (u.match_start = L, re = z, z >= te)
              break;
            M = c[g + re - 1], q = c[g + re];
          }
        }
      while ((L = b[L & h]) > p && --j !== 0);
      return re <= u.lookahead ? re : u.lookahead;
    }
    function Ie(u) {
      var L = u.w_size, j, g, O, z, re;
      do {
        if (z = u.window_size - u.lookahead - u.strstart, u.strstart >= L + (L - ie)) {
          i.arraySet(u.window, u.window, L, L, 0), u.match_start -= L, u.strstart -= L, u.block_start -= L, g = u.hash_size, j = g;
          do
            O = u.head[--j], u.head[j] = O >= L ? O - L : 0;
          while (--g);
          g = L, j = g;
          do
            O = u.prev[--j], u.prev[j] = O >= L ? O - L : 0;
          while (--g);
          z += L;
        }
        if (u.strm.avail_in === 0)
          break;
        if (g = At(u.strm, u.window, u.strstart + u.lookahead, z), u.lookahead += g, u.lookahead + u.insert >= H)
          for (re = u.strstart - u.insert, u.ins_h = u.window[re], u.ins_h = (u.ins_h << u.hash_shift ^ u.window[re + 1]) & u.hash_mask; u.insert && (u.ins_h = (u.ins_h << u.hash_shift ^ u.window[re + H - 1]) & u.hash_mask, u.prev[re & u.w_mask] = u.head[u.ins_h], u.head[u.ins_h] = re, re++, u.insert--, !(u.lookahead + u.insert < H)); )
            ;
      } while (u.lookahead < ie && u.strm.avail_in !== 0);
    }
    function Fe(u, L) {
      var j = 65535;
      for (j > u.pending_buf_size - 5 && (j = u.pending_buf_size - 5); ; ) {
        if (u.lookahead <= 1) {
          if (Ie(u), u.lookahead === 0 && L === a)
            return Ee;
          if (u.lookahead === 0)
            break;
        }
        u.strstart += u.lookahead, u.lookahead = 0;
        var g = u.block_start + j;
        if ((u.strstart === 0 || u.strstart >= g) && (u.lookahead = u.strstart - g, u.strstart = g, Se(u, !1), u.strm.avail_out === 0) || u.strstart - u.block_start >= u.w_size - ie && (Se(u, !1), u.strm.avail_out === 0))
          return Ee;
      }
      return u.insert = 0, L === l ? (Se(u, !0), u.strm.avail_out === 0 ? Ze : Le) : (u.strstart > u.block_start && (Se(u, !1), u.strm.avail_out === 0), Ee);
    }
    function st(u, L) {
      for (var j, g; ; ) {
        if (u.lookahead < ie) {
          if (Ie(u), u.lookahead < ie && L === a)
            return Ee;
          if (u.lookahead === 0)
            break;
        }
        if (j = 0, u.lookahead >= H && (u.ins_h = (u.ins_h << u.hash_shift ^ u.window[u.strstart + H - 1]) & u.hash_mask, j = u.prev[u.strstart & u.w_mask] = u.head[u.ins_h], u.head[u.ins_h] = u.strstart), j !== 0 && u.strstart - j <= u.w_size - ie && (u.match_length = dt(u, j)), u.match_length >= H)
          if (g = e._tr_tally(u, u.strstart - u.match_start, u.match_length - H), u.lookahead -= u.match_length, u.match_length <= u.max_lazy_match && u.lookahead >= H) {
            u.match_length--;
            do
              u.strstart++, u.ins_h = (u.ins_h << u.hash_shift ^ u.window[u.strstart + H - 1]) & u.hash_mask, j = u.prev[u.strstart & u.w_mask] = u.head[u.ins_h], u.head[u.ins_h] = u.strstart;
            while (--u.match_length !== 0);
            u.strstart++;
          } else
            u.strstart += u.match_length, u.match_length = 0, u.ins_h = u.window[u.strstart], u.ins_h = (u.ins_h << u.hash_shift ^ u.window[u.strstart + 1]) & u.hash_mask;
        else
          g = e._tr_tally(u, 0, u.window[u.strstart]), u.lookahead--, u.strstart++;
        if (g && (Se(u, !1), u.strm.avail_out === 0))
          return Ee;
      }
      return u.insert = u.strstart < H - 1 ? u.strstart : H - 1, L === l ? (Se(u, !0), u.strm.avail_out === 0 ? Ze : Le) : u.last_lit && (Se(u, !1), u.strm.avail_out === 0) ? Ee : Ne;
    }
    function Je(u, L) {
      for (var j, g, O; ; ) {
        if (u.lookahead < ie) {
          if (Ie(u), u.lookahead < ie && L === a)
            return Ee;
          if (u.lookahead === 0)
            break;
        }
        if (j = 0, u.lookahead >= H && (u.ins_h = (u.ins_h << u.hash_shift ^ u.window[u.strstart + H - 1]) & u.hash_mask, j = u.prev[u.strstart & u.w_mask] = u.head[u.ins_h], u.head[u.ins_h] = u.strstart), u.prev_length = u.match_length, u.prev_match = u.match_start, u.match_length = H - 1, j !== 0 && u.prev_length < u.max_lazy_match && u.strstart - j <= u.w_size - ie && (u.match_length = dt(u, j), u.match_length <= 5 && (u.strategy === E || u.match_length === H && u.strstart - u.match_start > 4096) && (u.match_length = H - 1)), u.prev_length >= H && u.match_length <= u.prev_length) {
          O = u.strstart + u.lookahead - H, g = e._tr_tally(u, u.strstart - 1 - u.prev_match, u.prev_length - H), u.lookahead -= u.prev_length - 1, u.prev_length -= 2;
          do
            ++u.strstart <= O && (u.ins_h = (u.ins_h << u.hash_shift ^ u.window[u.strstart + H - 1]) & u.hash_mask, j = u.prev[u.strstart & u.w_mask] = u.head[u.ins_h], u.head[u.ins_h] = u.strstart);
          while (--u.prev_length !== 0);
          if (u.match_available = 0, u.match_length = H - 1, u.strstart++, g && (Se(u, !1), u.strm.avail_out === 0))
            return Ee;
        } else if (u.match_available) {
          if (g = e._tr_tally(u, 0, u.window[u.strstart - 1]), g && Se(u, !1), u.strstart++, u.lookahead--, u.strm.avail_out === 0)
            return Ee;
        } else
          u.match_available = 1, u.strstart++, u.lookahead--;
      }
      return u.match_available && (g = e._tr_tally(u, 0, u.window[u.strstart - 1]), u.match_available = 0), u.insert = u.strstart < H - 1 ? u.strstart : H - 1, L === l ? (Se(u, !0), u.strm.avail_out === 0 ? Ze : Le) : u.last_lit && (Se(u, !1), u.strm.avail_out === 0) ? Ee : Ne;
    }
    function Et(u, L) {
      for (var j, g, O, z, re = u.window; ; ) {
        if (u.lookahead <= K) {
          if (Ie(u), u.lookahead <= K && L === a)
            return Ee;
          if (u.lookahead === 0)
            break;
        }
        if (u.match_length = 0, u.lookahead >= H && u.strstart > 0 && (O = u.strstart - 1, g = re[O], g === re[++O] && g === re[++O] && g === re[++O])) {
          z = u.strstart + K;
          do
            ;
          while (g === re[++O] && g === re[++O] && g === re[++O] && g === re[++O] && g === re[++O] && g === re[++O] && g === re[++O] && g === re[++O] && O < z);
          u.match_length = K - (z - O), u.match_length > u.lookahead && (u.match_length = u.lookahead);
        }
        if (u.match_length >= H ? (j = e._tr_tally(u, 1, u.match_length - H), u.lookahead -= u.match_length, u.strstart += u.match_length, u.match_length = 0) : (j = e._tr_tally(u, 0, u.window[u.strstart]), u.lookahead--, u.strstart++), j && (Se(u, !1), u.strm.avail_out === 0))
          return Ee;
      }
      return u.insert = 0, L === l ? (Se(u, !0), u.strm.avail_out === 0 ? Ze : Le) : u.last_lit && (Se(u, !1), u.strm.avail_out === 0) ? Ee : Ne;
    }
    function ot(u, L) {
      for (var j; ; ) {
        if (u.lookahead === 0 && (Ie(u), u.lookahead === 0)) {
          if (L === a)
            return Ee;
          break;
        }
        if (u.match_length = 0, j = e._tr_tally(u, 0, u.window[u.strstart]), u.lookahead--, u.strstart++, j && (Se(u, !1), u.strm.avail_out === 0))
          return Ee;
      }
      return u.insert = 0, L === l ? (Se(u, !0), u.strm.avail_out === 0 ? Ze : Le) : u.last_lit && (Se(u, !1), u.strm.avail_out === 0) ? Ee : Ne;
    }
    function qe(u, L, j, g, O) {
      this.good_length = u, this.max_lazy = L, this.nice_length = j, this.max_chain = g, this.func = O;
    }
    var Ge;
    Ge = [
      /*      good lazy nice chain */
      new qe(0, 0, 0, 0, Fe),
      /* 0 store only */
      new qe(4, 4, 8, 4, st),
      /* 1 max speed, no lazy matches */
      new qe(4, 5, 16, 8, st),
      /* 2 */
      new qe(4, 6, 32, 32, st),
      /* 3 */
      new qe(4, 4, 16, 16, Je),
      /* 4 lazy matches */
      new qe(8, 16, 32, 32, Je),
      /* 5 */
      new qe(8, 16, 128, 128, Je),
      /* 6 */
      new qe(8, 32, 128, 256, Je),
      /* 7 */
      new qe(32, 128, 258, 1024, Je),
      /* 8 */
      new qe(32, 258, 258, 4096, Je)
      /* 9 max compression */
    ];
    function wt(u) {
      u.window_size = 2 * u.w_size, Oe(u.head), u.max_lazy_match = Ge[u.level].max_lazy, u.good_match = Ge[u.level].good_length, u.nice_match = Ge[u.level].nice_length, u.max_chain_length = Ge[u.level].max_chain, u.strstart = 0, u.block_start = 0, u.lookahead = 0, u.insert = 0, u.match_length = u.prev_length = H - 1, u.match_available = 0, u.ins_h = 0;
    }
    function v() {
      this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = F, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new i.Buf16(ce * 2), this.dyn_dtree = new i.Buf16((2 * Z + 1) * 2), this.bl_tree = new i.Buf16((2 * Q + 1) * 2), Oe(this.dyn_ltree), Oe(this.dyn_dtree), Oe(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new i.Buf16(X + 1), this.heap = new i.Buf16(2 * $ + 1), Oe(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new i.Buf16(2 * $ + 1), Oe(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
    }
    function Y(u) {
      var L;
      return !u || !u.state ? ke(u, m) : (u.total_in = u.total_out = 0, u.data_type = D, L = u.state, L.pending = 0, L.pending_out = 0, L.wrap < 0 && (L.wrap = -L.wrap), L.status = L.wrap ? _e : we, u.adler = L.wrap === 2 ? 0 : 1, L.last_flush = a, e._tr_init(L), f);
    }
    function J(u) {
      var L = Y(u);
      return L === f && wt(u.state), L;
    }
    function ee(u, L) {
      return !u || !u.state || u.state.wrap !== 2 ? m : (u.state.gzhead = L, f);
    }
    function C(u, L, j, g, O, z) {
      if (!u)
        return m;
      var re = 1;
      if (L === x && (L = 6), g < 0 ? (re = 0, g = -g) : g > 15 && (re = 2, g -= 16), O < 1 || O > I || j !== F || g < 8 || g > 15 || L < 0 || L > 9 || z < 0 || z > S)
        return ke(u, m);
      g === 8 && (g = 9);
      var te = new v();
      return u.state = te, te.strm = u, te.wrap = re, te.gzhead = null, te.w_bits = g, te.w_size = 1 << te.w_bits, te.w_mask = te.w_size - 1, te.hash_bits = O + 7, te.hash_size = 1 << te.hash_bits, te.hash_mask = te.hash_size - 1, te.hash_shift = ~~((te.hash_bits + H - 1) / H), te.window = new i.Buf8(te.w_size * 2), te.head = new i.Buf16(te.hash_size), te.prev = new i.Buf16(te.w_size), te.lit_bufsize = 1 << O + 6, te.pending_buf_size = te.lit_bufsize * 4, te.pending_buf = new i.Buf8(te.pending_buf_size), te.d_buf = 1 * te.lit_bufsize, te.l_buf = 3 * te.lit_bufsize, te.level = L, te.strategy = z, te.method = j, J(u);
    }
    function W(u, L) {
      return C(u, L, F, A, U, N);
    }
    function _(u, L) {
      var j, g, O, z;
      if (!u || !u.state || L > d || L < 0)
        return u ? ke(u, m) : m;
      if (g = u.state, !u.output || !u.input && u.avail_in !== 0 || g.status === he && L !== l)
        return ke(u, u.avail_out === 0 ? k : m);
      if (g.strm = u, j = g.last_flush, g.last_flush = L, g.status === _e)
        if (g.wrap === 2)
          u.adler = 0, pe(g, 31), pe(g, 139), pe(g, 8), g.gzhead ? (pe(
            g,
            (g.gzhead.text ? 1 : 0) + (g.gzhead.hcrc ? 2 : 0) + (g.gzhead.extra ? 4 : 0) + (g.gzhead.name ? 8 : 0) + (g.gzhead.comment ? 16 : 0)
          ), pe(g, g.gzhead.time & 255), pe(g, g.gzhead.time >> 8 & 255), pe(g, g.gzhead.time >> 16 & 255), pe(g, g.gzhead.time >> 24 & 255), pe(g, g.level === 9 ? 2 : g.strategy >= R || g.level < 2 ? 4 : 0), pe(g, g.gzhead.os & 255), g.gzhead.extra && g.gzhead.extra.length && (pe(g, g.gzhead.extra.length & 255), pe(g, g.gzhead.extra.length >> 8 & 255)), g.gzhead.hcrc && (u.adler = r(u.adler, g.pending_buf, g.pending, 0)), g.gzindex = 0, g.status = ue) : (pe(g, 0), pe(g, 0), pe(g, 0), pe(g, 0), pe(g, 0), pe(g, g.level === 9 ? 2 : g.strategy >= R || g.level < 2 ? 4 : 0), pe(g, ae), g.status = we);
        else {
          var re = F + (g.w_bits - 8 << 4) << 8, te = -1;
          g.strategy >= R || g.level < 2 ? te = 0 : g.level < 6 ? te = 1 : g.level === 6 ? te = 2 : te = 3, re |= te << 6, g.strstart !== 0 && (re |= de), re += 31 - re % 31, g.status = we, Ke(g, re), g.strstart !== 0 && (Ke(g, u.adler >>> 16), Ke(g, u.adler & 65535)), u.adler = 1;
        }
      if (g.status === ue)
        if (g.gzhead.extra) {
          for (O = g.pending; g.gzindex < (g.gzhead.extra.length & 65535) && !(g.pending === g.pending_buf_size && (g.gzhead.hcrc && g.pending > O && (u.adler = r(u.adler, g.pending_buf, g.pending - O, O)), je(u), O = g.pending, g.pending === g.pending_buf_size)); )
            pe(g, g.gzhead.extra[g.gzindex] & 255), g.gzindex++;
          g.gzhead.hcrc && g.pending > O && (u.adler = r(u.adler, g.pending_buf, g.pending - O, O)), g.gzindex === g.gzhead.extra.length && (g.gzindex = 0, g.status = ve);
        } else
          g.status = ve;
      if (g.status === ve)
        if (g.gzhead.name) {
          O = g.pending;
          do {
            if (g.pending === g.pending_buf_size && (g.gzhead.hcrc && g.pending > O && (u.adler = r(u.adler, g.pending_buf, g.pending - O, O)), je(u), O = g.pending, g.pending === g.pending_buf_size)) {
              z = 1;
              break;
            }
            g.gzindex < g.gzhead.name.length ? z = g.gzhead.name.charCodeAt(g.gzindex++) & 255 : z = 0, pe(g, z);
          } while (z !== 0);
          g.gzhead.hcrc && g.pending > O && (u.adler = r(u.adler, g.pending_buf, g.pending - O, O)), z === 0 && (g.gzindex = 0, g.status = be);
        } else
          g.status = be;
      if (g.status === be)
        if (g.gzhead.comment) {
          O = g.pending;
          do {
            if (g.pending === g.pending_buf_size && (g.gzhead.hcrc && g.pending > O && (u.adler = r(u.adler, g.pending_buf, g.pending - O, O)), je(u), O = g.pending, g.pending === g.pending_buf_size)) {
              z = 1;
              break;
            }
            g.gzindex < g.gzhead.comment.length ? z = g.gzhead.comment.charCodeAt(g.gzindex++) & 255 : z = 0, pe(g, z);
          } while (z !== 0);
          g.gzhead.hcrc && g.pending > O && (u.adler = r(u.adler, g.pending_buf, g.pending - O, O)), z === 0 && (g.status = Be);
        } else
          g.status = Be;
      if (g.status === Be && (g.gzhead.hcrc ? (g.pending + 2 > g.pending_buf_size && je(u), g.pending + 2 <= g.pending_buf_size && (pe(g, u.adler & 255), pe(g, u.adler >> 8 & 255), u.adler = 0, g.status = we)) : g.status = we), g.pending !== 0) {
        if (je(u), u.avail_out === 0)
          return g.last_flush = -1, f;
      } else if (u.avail_in === 0 && De(L) <= De(j) && L !== l)
        return ke(u, k);
      if (g.status === he && u.avail_in !== 0)
        return ke(u, k);
      if (u.avail_in !== 0 || g.lookahead !== 0 || L !== a && g.status !== he) {
        var p = g.strategy === R ? ot(g, L) : g.strategy === T ? Et(g, L) : Ge[g.level].func(g, L);
        if ((p === Ze || p === Le) && (g.status = he), p === Ee || p === Ze)
          return u.avail_out === 0 && (g.last_flush = -1), f;
        if (p === Ne && (L === s ? e._tr_align(g) : L !== d && (e._tr_stored_block(g, 0, 0, !1), L === o && (Oe(g.head), g.lookahead === 0 && (g.strstart = 0, g.block_start = 0, g.insert = 0))), je(u), u.avail_out === 0))
          return g.last_flush = -1, f;
      }
      return L !== l ? f : g.wrap <= 0 ? w : (g.wrap === 2 ? (pe(g, u.adler & 255), pe(g, u.adler >> 8 & 255), pe(g, u.adler >> 16 & 255), pe(g, u.adler >> 24 & 255), pe(g, u.total_in & 255), pe(g, u.total_in >> 8 & 255), pe(g, u.total_in >> 16 & 255), pe(g, u.total_in >> 24 & 255)) : (Ke(g, u.adler >>> 16), Ke(g, u.adler & 65535)), je(u), g.wrap > 0 && (g.wrap = -g.wrap), g.pending !== 0 ? f : w);
    }
    function V(u) {
      var L;
      return !u || !u.state ? m : (L = u.state.status, L !== _e && L !== ue && L !== ve && L !== be && L !== Be && L !== we && L !== he ? ke(u, m) : (u.state = null, L === we ? ke(u, y) : f));
    }
    function le(u, L) {
      var j = L.length, g, O, z, re, te, p, c, h;
      if (!u || !u.state || (g = u.state, re = g.wrap, re === 2 || re === 1 && g.status !== _e || g.lookahead))
        return m;
      for (re === 1 && (u.adler = t(u.adler, L, j, 0)), g.wrap = 0, j >= g.w_size && (re === 0 && (Oe(g.head), g.strstart = 0, g.block_start = 0, g.insert = 0), h = new i.Buf8(g.w_size), i.arraySet(h, L, j - g.w_size, g.w_size, 0), L = h, j = g.w_size), te = u.avail_in, p = u.next_in, c = u.input, u.avail_in = j, u.next_in = 0, u.input = L, Ie(g); g.lookahead >= H; ) {
        O = g.strstart, z = g.lookahead - (H - 1);
        do
          g.ins_h = (g.ins_h << g.hash_shift ^ g.window[O + H - 1]) & g.hash_mask, g.prev[O & g.w_mask] = g.head[g.ins_h], g.head[g.ins_h] = O, O++;
        while (--z);
        g.strstart = O, g.lookahead = H - 1, Ie(g);
      }
      return g.strstart += g.lookahead, g.block_start = g.strstart, g.insert = g.lookahead, g.lookahead = 0, g.match_length = g.prev_length = H - 1, g.match_available = 0, u.next_in = p, u.input = c, u.avail_in = te, g.wrap = re, f;
    }
    return ct.deflateInit = W, ct.deflateInit2 = C, ct.deflateReset = J, ct.deflateResetKeep = Y, ct.deflateSetHeader = ee, ct.deflate = _, ct.deflateEnd = V, ct.deflateSetDictionary = le, ct.deflateInfo = "pako deflate (from Nodeca project)", ct;
  }
  var Nt = {}, Sn;
  function ya() {
    if (Sn) return Nt;
    Sn = 1;
    var i = Ot(), e = !0, t = !0;
    try {
      String.fromCharCode.apply(null, [0]);
    } catch {
      e = !1;
    }
    try {
      String.fromCharCode.apply(null, new Uint8Array(1));
    } catch {
      t = !1;
    }
    for (var r = new i.Buf8(256), n = 0; n < 256; n++)
      r[n] = n >= 252 ? 6 : n >= 248 ? 5 : n >= 240 ? 4 : n >= 224 ? 3 : n >= 192 ? 2 : 1;
    r[254] = r[254] = 1, Nt.string2buf = function(s) {
      var o, l, d, f, w, m = s.length, y = 0;
      for (f = 0; f < m; f++)
        l = s.charCodeAt(f), (l & 64512) === 55296 && f + 1 < m && (d = s.charCodeAt(f + 1), (d & 64512) === 56320 && (l = 65536 + (l - 55296 << 10) + (d - 56320), f++)), y += l < 128 ? 1 : l < 2048 ? 2 : l < 65536 ? 3 : 4;
      for (o = new i.Buf8(y), w = 0, f = 0; w < y; f++)
        l = s.charCodeAt(f), (l & 64512) === 55296 && f + 1 < m && (d = s.charCodeAt(f + 1), (d & 64512) === 56320 && (l = 65536 + (l - 55296 << 10) + (d - 56320), f++)), l < 128 ? o[w++] = l : l < 2048 ? (o[w++] = 192 | l >>> 6, o[w++] = 128 | l & 63) : l < 65536 ? (o[w++] = 224 | l >>> 12, o[w++] = 128 | l >>> 6 & 63, o[w++] = 128 | l & 63) : (o[w++] = 240 | l >>> 18, o[w++] = 128 | l >>> 12 & 63, o[w++] = 128 | l >>> 6 & 63, o[w++] = 128 | l & 63);
      return o;
    };
    function a(s, o) {
      if (o < 65534 && (s.subarray && t || !s.subarray && e))
        return String.fromCharCode.apply(null, i.shrinkBuf(s, o));
      for (var l = "", d = 0; d < o; d++)
        l += String.fromCharCode(s[d]);
      return l;
    }
    return Nt.buf2binstring = function(s) {
      return a(s, s.length);
    }, Nt.binstring2buf = function(s) {
      for (var o = new i.Buf8(s.length), l = 0, d = o.length; l < d; l++)
        o[l] = s.charCodeAt(l);
      return o;
    }, Nt.buf2string = function(s, o) {
      var l, d, f, w, m = o || s.length, y = new Array(m * 2);
      for (d = 0, l = 0; l < m; ) {
        if (f = s[l++], f < 128) {
          y[d++] = f;
          continue;
        }
        if (w = r[f], w > 4) {
          y[d++] = 65533, l += w - 1;
          continue;
        }
        for (f &= w === 2 ? 31 : w === 3 ? 15 : 7; w > 1 && l < m; )
          f = f << 6 | s[l++] & 63, w--;
        if (w > 1) {
          y[d++] = 65533;
          continue;
        }
        f < 65536 ? y[d++] = f : (f -= 65536, y[d++] = 55296 | f >> 10 & 1023, y[d++] = 56320 | f & 1023);
      }
      return a(y, d);
    }, Nt.utf8border = function(s, o) {
      var l;
      for (o = o || s.length, o > s.length && (o = s.length), l = o - 1; l >= 0 && (s[l] & 192) === 128; )
        l--;
      return l < 0 || l === 0 ? o : l + r[s[l]] > o ? l : o;
    }, Nt;
  }
  var wi, In;
  function va() {
    if (In) return wi;
    In = 1;
    function i() {
      this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
    }
    return wi = i, wi;
  }
  var Tn;
  function _s() {
    if (Tn) return Zt;
    Tn = 1;
    var i = ms(), e = Ot(), t = ya(), r = Ji(), n = va(), a = Object.prototype.toString, s = 0, o = 4, l = 0, d = 1, f = 2, w = -1, m = 0, y = 8;
    function k(T) {
      if (!(this instanceof k)) return new k(T);
      this.options = e.assign({
        level: w,
        method: y,
        chunkSize: 16384,
        windowBits: 15,
        memLevel: 8,
        strategy: m,
        to: ""
      }, T || {});
      var S = this.options;
      S.raw && S.windowBits > 0 ? S.windowBits = -S.windowBits : S.gzip && S.windowBits > 0 && S.windowBits < 16 && (S.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new n(), this.strm.avail_out = 0;
      var N = i.deflateInit2(
        this.strm,
        S.level,
        S.method,
        S.windowBits,
        S.memLevel,
        S.strategy
      );
      if (N !== l)
        throw new Error(r[N]);
      if (S.header && i.deflateSetHeader(this.strm, S.header), S.dictionary) {
        var D;
        if (typeof S.dictionary == "string" ? D = t.string2buf(S.dictionary) : a.call(S.dictionary) === "[object ArrayBuffer]" ? D = new Uint8Array(S.dictionary) : D = S.dictionary, N = i.deflateSetDictionary(this.strm, D), N !== l)
          throw new Error(r[N]);
        this._dict_set = !0;
      }
    }
    k.prototype.push = function(T, S) {
      var N = this.strm, D = this.options.chunkSize, F, I;
      if (this.ended)
        return !1;
      I = S === ~~S ? S : S === !0 ? o : s, typeof T == "string" ? N.input = t.string2buf(T) : a.call(T) === "[object ArrayBuffer]" ? N.input = new Uint8Array(T) : N.input = T, N.next_in = 0, N.avail_in = N.input.length;
      do {
        if (N.avail_out === 0 && (N.output = new e.Buf8(D), N.next_out = 0, N.avail_out = D), F = i.deflate(N, I), F !== d && F !== l)
          return this.onEnd(F), this.ended = !0, !1;
        (N.avail_out === 0 || N.avail_in === 0 && (I === o || I === f)) && (this.options.to === "string" ? this.onData(t.buf2binstring(e.shrinkBuf(N.output, N.next_out))) : this.onData(e.shrinkBuf(N.output, N.next_out)));
      } while ((N.avail_in > 0 || N.avail_out === 0) && F !== d);
      return I === o ? (F = i.deflateEnd(this.strm), this.onEnd(F), this.ended = !0, F === l) : (I === f && (this.onEnd(l), N.avail_out = 0), !0);
    }, k.prototype.onData = function(T) {
      this.chunks.push(T);
    }, k.prototype.onEnd = function(T) {
      T === l && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = T, this.msg = this.strm.msg;
    };
    function x(T, S) {
      var N = new k(S);
      if (N.push(T, !0), N.err)
        throw N.msg || r[N.err];
      return N.result;
    }
    function E(T, S) {
      return S = S || {}, S.raw = !0, x(T, S);
    }
    function R(T, S) {
      return S = S || {}, S.gzip = !0, x(T, S);
    }
    return Zt.Deflate = k, Zt.deflate = x, Zt.deflateRaw = E, Zt.gzip = R, Zt;
  }
  var Gt = {}, it = {}, pi, $n;
  function gs() {
    if ($n) return pi;
    $n = 1;
    var i = 30, e = 12;
    return pi = function(r, n) {
      var a, s, o, l, d, f, w, m, y, k, x, E, R, T, S, N, D, F, I, A, U, P, G, $, Z;
      a = r.state, s = r.next_in, $ = r.input, o = s + (r.avail_in - 5), l = r.next_out, Z = r.output, d = l - (n - r.avail_out), f = l + (r.avail_out - 257), w = a.dmax, m = a.wsize, y = a.whave, k = a.wnext, x = a.window, E = a.hold, R = a.bits, T = a.lencode, S = a.distcode, N = (1 << a.lenbits) - 1, D = (1 << a.distbits) - 1;
      e:
        do {
          R < 15 && (E += $[s++] << R, R += 8, E += $[s++] << R, R += 8), F = T[E & N];
          t:
            for (; ; ) {
              if (I = F >>> 24, E >>>= I, R -= I, I = F >>> 16 & 255, I === 0)
                Z[l++] = F & 65535;
              else if (I & 16) {
                A = F & 65535, I &= 15, I && (R < I && (E += $[s++] << R, R += 8), A += E & (1 << I) - 1, E >>>= I, R -= I), R < 15 && (E += $[s++] << R, R += 8, E += $[s++] << R, R += 8), F = S[E & D];
                r:
                  for (; ; ) {
                    if (I = F >>> 24, E >>>= I, R -= I, I = F >>> 16 & 255, I & 16) {
                      if (U = F & 65535, I &= 15, R < I && (E += $[s++] << R, R += 8, R < I && (E += $[s++] << R, R += 8)), U += E & (1 << I) - 1, U > w) {
                        r.msg = "invalid distance too far back", a.mode = i;
                        break e;
                      }
                      if (E >>>= I, R -= I, I = l - d, U > I) {
                        if (I = U - I, I > y && a.sane) {
                          r.msg = "invalid distance too far back", a.mode = i;
                          break e;
                        }
                        if (P = 0, G = x, k === 0) {
                          if (P += m - I, I < A) {
                            A -= I;
                            do
                              Z[l++] = x[P++];
                            while (--I);
                            P = l - U, G = Z;
                          }
                        } else if (k < I) {
                          if (P += m + k - I, I -= k, I < A) {
                            A -= I;
                            do
                              Z[l++] = x[P++];
                            while (--I);
                            if (P = 0, k < A) {
                              I = k, A -= I;
                              do
                                Z[l++] = x[P++];
                              while (--I);
                              P = l - U, G = Z;
                            }
                          }
                        } else if (P += k - I, I < A) {
                          A -= I;
                          do
                            Z[l++] = x[P++];
                          while (--I);
                          P = l - U, G = Z;
                        }
                        for (; A > 2; )
                          Z[l++] = G[P++], Z[l++] = G[P++], Z[l++] = G[P++], A -= 3;
                        A && (Z[l++] = G[P++], A > 1 && (Z[l++] = G[P++]));
                      } else {
                        P = l - U;
                        do
                          Z[l++] = Z[P++], Z[l++] = Z[P++], Z[l++] = Z[P++], A -= 3;
                        while (A > 2);
                        A && (Z[l++] = Z[P++], A > 1 && (Z[l++] = Z[P++]));
                      }
                    } else if ((I & 64) === 0) {
                      F = S[(F & 65535) + (E & (1 << I) - 1)];
                      continue r;
                    } else {
                      r.msg = "invalid distance code", a.mode = i;
                      break e;
                    }
                    break;
                  }
              } else if ((I & 64) === 0) {
                F = T[(F & 65535) + (E & (1 << I) - 1)];
                continue t;
              } else if (I & 32) {
                a.mode = e;
                break e;
              } else {
                r.msg = "invalid literal/length code", a.mode = i;
                break e;
              }
              break;
            }
        } while (s < o && l < f);
      A = R >> 3, s -= A, R -= A << 3, E &= (1 << R) - 1, r.next_in = s, r.next_out = l, r.avail_in = s < o ? 5 + (o - s) : 5 - (s - o), r.avail_out = l < f ? 257 + (f - l) : 257 - (l - f), a.hold = E, a.bits = R;
    }, pi;
  }
  var mi, An;
  function ys() {
    if (An) return mi;
    An = 1;
    var i = Ot(), e = 15, t = 852, r = 592, n = 0, a = 1, s = 2, o = [
      /* Length codes 257..285 base */
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      13,
      15,
      17,
      19,
      23,
      27,
      31,
      35,
      43,
      51,
      59,
      67,
      83,
      99,
      115,
      131,
      163,
      195,
      227,
      258,
      0,
      0
    ], l = [
      /* Length codes 257..285 extra */
      16,
      16,
      16,
      16,
      16,
      16,
      16,
      16,
      17,
      17,
      17,
      17,
      18,
      18,
      18,
      18,
      19,
      19,
      19,
      19,
      20,
      20,
      20,
      20,
      21,
      21,
      21,
      21,
      16,
      72,
      78
    ], d = [
      /* Distance codes 0..29 base */
      1,
      2,
      3,
      4,
      5,
      7,
      9,
      13,
      17,
      25,
      33,
      49,
      65,
      97,
      129,
      193,
      257,
      385,
      513,
      769,
      1025,
      1537,
      2049,
      3073,
      4097,
      6145,
      8193,
      12289,
      16385,
      24577,
      0,
      0
    ], f = [
      /* Distance codes 0..29 extra */
      16,
      16,
      16,
      16,
      17,
      17,
      18,
      18,
      19,
      19,
      20,
      20,
      21,
      21,
      22,
      22,
      23,
      23,
      24,
      24,
      25,
      25,
      26,
      26,
      27,
      27,
      28,
      28,
      29,
      29,
      64,
      64
    ];
    return mi = function(m, y, k, x, E, R, T, S) {
      var N = S.bits, D = 0, F = 0, I = 0, A = 0, U = 0, P = 0, G = 0, $ = 0, Z = 0, Q = 0, ce, X, H, K, ie, de = null, _e = 0, ue, ve = new i.Buf16(e + 1), be = new i.Buf16(e + 1), Be = null, we = 0, he, Ee, Ne;
      for (D = 0; D <= e; D++)
        ve[D] = 0;
      for (F = 0; F < x; F++)
        ve[y[k + F]]++;
      for (U = N, A = e; A >= 1 && ve[A] === 0; A--)
        ;
      if (U > A && (U = A), A === 0)
        return E[R++] = 1 << 24 | 64 << 16 | 0, E[R++] = 1 << 24 | 64 << 16 | 0, S.bits = 1, 0;
      for (I = 1; I < A && ve[I] === 0; I++)
        ;
      for (U < I && (U = I), $ = 1, D = 1; D <= e; D++)
        if ($ <<= 1, $ -= ve[D], $ < 0)
          return -1;
      if ($ > 0 && (m === n || A !== 1))
        return -1;
      for (be[1] = 0, D = 1; D < e; D++)
        be[D + 1] = be[D] + ve[D];
      for (F = 0; F < x; F++)
        y[k + F] !== 0 && (T[be[y[k + F]]++] = F);
      if (m === n ? (de = Be = T, ue = 19) : m === a ? (de = o, _e -= 257, Be = l, we -= 257, ue = 256) : (de = d, Be = f, ue = -1), Q = 0, F = 0, D = I, ie = R, P = U, G = 0, H = -1, Z = 1 << U, K = Z - 1, m === a && Z > t || m === s && Z > r)
        return 1;
      for (; ; ) {
        he = D - G, T[F] < ue ? (Ee = 0, Ne = T[F]) : T[F] > ue ? (Ee = Be[we + T[F]], Ne = de[_e + T[F]]) : (Ee = 96, Ne = 0), ce = 1 << D - G, X = 1 << P, I = X;
        do
          X -= ce, E[ie + (Q >> G) + X] = he << 24 | Ee << 16 | Ne | 0;
        while (X !== 0);
        for (ce = 1 << D - 1; Q & ce; )
          ce >>= 1;
        if (ce !== 0 ? (Q &= ce - 1, Q += ce) : Q = 0, F++, --ve[D] === 0) {
          if (D === A)
            break;
          D = y[k + T[F]];
        }
        if (D > U && (Q & K) !== H) {
          for (G === 0 && (G = U), ie += I, P = D - G, $ = 1 << P; P + G < A && ($ -= ve[P + G], !($ <= 0)); )
            P++, $ <<= 1;
          if (Z += 1 << P, m === a && Z > t || m === s && Z > r)
            return 1;
          H = Q & K, E[H] = U << 24 | P << 16 | ie - R | 0;
        }
      }
      return Q !== 0 && (E[ie + Q] = D - G << 24 | 64 << 16 | 0), S.bits = U, 0;
    }, mi;
  }
  var Rn;
  function vs() {
    if (Rn) return it;
    Rn = 1;
    var i = Ot(), e = _a(), t = ga(), r = gs(), n = ys(), a = 0, s = 1, o = 2, l = 4, d = 5, f = 6, w = 0, m = 1, y = 2, k = -2, x = -3, E = -4, R = -5, T = 8, S = 1, N = 2, D = 3, F = 4, I = 5, A = 6, U = 7, P = 8, G = 9, $ = 10, Z = 11, Q = 12, ce = 13, X = 14, H = 15, K = 16, ie = 17, de = 18, _e = 19, ue = 20, ve = 21, be = 22, Be = 23, we = 24, he = 25, Ee = 26, Ne = 27, Ze = 28, Le = 29, ae = 30, ke = 31, De = 32, Oe = 852, je = 592, Se = 15, pe = Se;
    function Ke(C) {
      return (C >>> 24 & 255) + (C >>> 8 & 65280) + ((C & 65280) << 8) + ((C & 255) << 24);
    }
    function At() {
      this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new i.Buf16(320), this.work = new i.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
    }
    function dt(C) {
      var W;
      return !C || !C.state ? k : (W = C.state, C.total_in = C.total_out = W.total = 0, C.msg = "", W.wrap && (C.adler = W.wrap & 1), W.mode = S, W.last = 0, W.havedict = 0, W.dmax = 32768, W.head = null, W.hold = 0, W.bits = 0, W.lencode = W.lendyn = new i.Buf32(Oe), W.distcode = W.distdyn = new i.Buf32(je), W.sane = 1, W.back = -1, w);
    }
    function Ie(C) {
      var W;
      return !C || !C.state ? k : (W = C.state, W.wsize = 0, W.whave = 0, W.wnext = 0, dt(C));
    }
    function Fe(C, W) {
      var _, V;
      return !C || !C.state || (V = C.state, W < 0 ? (_ = 0, W = -W) : (_ = (W >> 4) + 1, W < 48 && (W &= 15)), W && (W < 8 || W > 15)) ? k : (V.window !== null && V.wbits !== W && (V.window = null), V.wrap = _, V.wbits = W, Ie(C));
    }
    function st(C, W) {
      var _, V;
      return C ? (V = new At(), C.state = V, V.window = null, _ = Fe(C, W), _ !== w && (C.state = null), _) : k;
    }
    function Je(C) {
      return st(C, pe);
    }
    var Et = !0, ot, qe;
    function Ge(C) {
      if (Et) {
        var W;
        for (ot = new i.Buf32(512), qe = new i.Buf32(32), W = 0; W < 144; )
          C.lens[W++] = 8;
        for (; W < 256; )
          C.lens[W++] = 9;
        for (; W < 280; )
          C.lens[W++] = 7;
        for (; W < 288; )
          C.lens[W++] = 8;
        for (n(s, C.lens, 0, 288, ot, 0, C.work, { bits: 9 }), W = 0; W < 32; )
          C.lens[W++] = 5;
        n(o, C.lens, 0, 32, qe, 0, C.work, { bits: 5 }), Et = !1;
      }
      C.lencode = ot, C.lenbits = 9, C.distcode = qe, C.distbits = 5;
    }
    function wt(C, W, _, V) {
      var le, u = C.state;
      return u.window === null && (u.wsize = 1 << u.wbits, u.wnext = 0, u.whave = 0, u.window = new i.Buf8(u.wsize)), V >= u.wsize ? (i.arraySet(u.window, W, _ - u.wsize, u.wsize, 0), u.wnext = 0, u.whave = u.wsize) : (le = u.wsize - u.wnext, le > V && (le = V), i.arraySet(u.window, W, _ - V, le, u.wnext), V -= le, V ? (i.arraySet(u.window, W, _ - V, V, 0), u.wnext = V, u.whave = u.wsize) : (u.wnext += le, u.wnext === u.wsize && (u.wnext = 0), u.whave < u.wsize && (u.whave += le))), 0;
    }
    function v(C, W) {
      var _, V, le, u, L, j, g, O, z, re, te, p, c, h, b = 0, B, M, q, oe, Ae, Te, me, ge, Ve = new i.Buf8(4), kt, pt, ln = (
        /* permutation of code lengths */
        [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
      );
      if (!C || !C.state || !C.output || !C.input && C.avail_in !== 0)
        return k;
      _ = C.state, _.mode === Q && (_.mode = ce), L = C.next_out, le = C.output, g = C.avail_out, u = C.next_in, V = C.input, j = C.avail_in, O = _.hold, z = _.bits, re = j, te = g, ge = w;
      e:
        for (; ; )
          switch (_.mode) {
            case S:
              if (_.wrap === 0) {
                _.mode = ce;
                break;
              }
              for (; z < 16; ) {
                if (j === 0)
                  break e;
                j--, O += V[u++] << z, z += 8;
              }
              if (_.wrap & 2 && O === 35615) {
                _.check = 0, Ve[0] = O & 255, Ve[1] = O >>> 8 & 255, _.check = t(_.check, Ve, 2, 0), O = 0, z = 0, _.mode = N;
                break;
              }
              if (_.flags = 0, _.head && (_.head.done = !1), !(_.wrap & 1) || /* check if zlib header allowed */
              (((O & 255) << 8) + (O >> 8)) % 31) {
                C.msg = "incorrect header check", _.mode = ae;
                break;
              }
              if ((O & 15) !== T) {
                C.msg = "unknown compression method", _.mode = ae;
                break;
              }
              if (O >>>= 4, z -= 4, me = (O & 15) + 8, _.wbits === 0)
                _.wbits = me;
              else if (me > _.wbits) {
                C.msg = "invalid window size", _.mode = ae;
                break;
              }
              _.dmax = 1 << me, C.adler = _.check = 1, _.mode = O & 512 ? $ : Q, O = 0, z = 0;
              break;
            case N:
              for (; z < 16; ) {
                if (j === 0)
                  break e;
                j--, O += V[u++] << z, z += 8;
              }
              if (_.flags = O, (_.flags & 255) !== T) {
                C.msg = "unknown compression method", _.mode = ae;
                break;
              }
              if (_.flags & 57344) {
                C.msg = "unknown header flags set", _.mode = ae;
                break;
              }
              _.head && (_.head.text = O >> 8 & 1), _.flags & 512 && (Ve[0] = O & 255, Ve[1] = O >>> 8 & 255, _.check = t(_.check, Ve, 2, 0)), O = 0, z = 0, _.mode = D;
            /* falls through */
            case D:
              for (; z < 32; ) {
                if (j === 0)
                  break e;
                j--, O += V[u++] << z, z += 8;
              }
              _.head && (_.head.time = O), _.flags & 512 && (Ve[0] = O & 255, Ve[1] = O >>> 8 & 255, Ve[2] = O >>> 16 & 255, Ve[3] = O >>> 24 & 255, _.check = t(_.check, Ve, 4, 0)), O = 0, z = 0, _.mode = F;
            /* falls through */
            case F:
              for (; z < 16; ) {
                if (j === 0)
                  break e;
                j--, O += V[u++] << z, z += 8;
              }
              _.head && (_.head.xflags = O & 255, _.head.os = O >> 8), _.flags & 512 && (Ve[0] = O & 255, Ve[1] = O >>> 8 & 255, _.check = t(_.check, Ve, 2, 0)), O = 0, z = 0, _.mode = I;
            /* falls through */
            case I:
              if (_.flags & 1024) {
                for (; z < 16; ) {
                  if (j === 0)
                    break e;
                  j--, O += V[u++] << z, z += 8;
                }
                _.length = O, _.head && (_.head.extra_len = O), _.flags & 512 && (Ve[0] = O & 255, Ve[1] = O >>> 8 & 255, _.check = t(_.check, Ve, 2, 0)), O = 0, z = 0;
              } else _.head && (_.head.extra = null);
              _.mode = A;
            /* falls through */
            case A:
              if (_.flags & 1024 && (p = _.length, p > j && (p = j), p && (_.head && (me = _.head.extra_len - _.length, _.head.extra || (_.head.extra = new Array(_.head.extra_len)), i.arraySet(
                _.head.extra,
                V,
                u,
                // extra field is limited to 65536 bytes
                // - no need for additional size check
                p,
                /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                me
              )), _.flags & 512 && (_.check = t(_.check, V, p, u)), j -= p, u += p, _.length -= p), _.length))
                break e;
              _.length = 0, _.mode = U;
            /* falls through */
            case U:
              if (_.flags & 2048) {
                if (j === 0)
                  break e;
                p = 0;
                do
                  me = V[u + p++], _.head && me && _.length < 65536 && (_.head.name += String.fromCharCode(me));
                while (me && p < j);
                if (_.flags & 512 && (_.check = t(_.check, V, p, u)), j -= p, u += p, me)
                  break e;
              } else _.head && (_.head.name = null);
              _.length = 0, _.mode = P;
            /* falls through */
            case P:
              if (_.flags & 4096) {
                if (j === 0)
                  break e;
                p = 0;
                do
                  me = V[u + p++], _.head && me && _.length < 65536 && (_.head.comment += String.fromCharCode(me));
                while (me && p < j);
                if (_.flags & 512 && (_.check = t(_.check, V, p, u)), j -= p, u += p, me)
                  break e;
              } else _.head && (_.head.comment = null);
              _.mode = G;
            /* falls through */
            case G:
              if (_.flags & 512) {
                for (; z < 16; ) {
                  if (j === 0)
                    break e;
                  j--, O += V[u++] << z, z += 8;
                }
                if (O !== (_.check & 65535)) {
                  C.msg = "header crc mismatch", _.mode = ae;
                  break;
                }
                O = 0, z = 0;
              }
              _.head && (_.head.hcrc = _.flags >> 9 & 1, _.head.done = !0), C.adler = _.check = 0, _.mode = Q;
              break;
            case $:
              for (; z < 32; ) {
                if (j === 0)
                  break e;
                j--, O += V[u++] << z, z += 8;
              }
              C.adler = _.check = Ke(O), O = 0, z = 0, _.mode = Z;
            /* falls through */
            case Z:
              if (_.havedict === 0)
                return C.next_out = L, C.avail_out = g, C.next_in = u, C.avail_in = j, _.hold = O, _.bits = z, y;
              C.adler = _.check = 1, _.mode = Q;
            /* falls through */
            case Q:
              if (W === d || W === f)
                break e;
            /* falls through */
            case ce:
              if (_.last) {
                O >>>= z & 7, z -= z & 7, _.mode = Ne;
                break;
              }
              for (; z < 3; ) {
                if (j === 0)
                  break e;
                j--, O += V[u++] << z, z += 8;
              }
              switch (_.last = O & 1, O >>>= 1, z -= 1, O & 3) {
                case 0:
                  _.mode = X;
                  break;
                case 1:
                  if (Ge(_), _.mode = ue, W === f) {
                    O >>>= 2, z -= 2;
                    break e;
                  }
                  break;
                case 2:
                  _.mode = ie;
                  break;
                case 3:
                  C.msg = "invalid block type", _.mode = ae;
              }
              O >>>= 2, z -= 2;
              break;
            case X:
              for (O >>>= z & 7, z -= z & 7; z < 32; ) {
                if (j === 0)
                  break e;
                j--, O += V[u++] << z, z += 8;
              }
              if ((O & 65535) !== (O >>> 16 ^ 65535)) {
                C.msg = "invalid stored block lengths", _.mode = ae;
                break;
              }
              if (_.length = O & 65535, O = 0, z = 0, _.mode = H, W === f)
                break e;
            /* falls through */
            case H:
              _.mode = K;
            /* falls through */
            case K:
              if (p = _.length, p) {
                if (p > j && (p = j), p > g && (p = g), p === 0)
                  break e;
                i.arraySet(le, V, u, p, L), j -= p, u += p, g -= p, L += p, _.length -= p;
                break;
              }
              _.mode = Q;
              break;
            case ie:
              for (; z < 14; ) {
                if (j === 0)
                  break e;
                j--, O += V[u++] << z, z += 8;
              }
              if (_.nlen = (O & 31) + 257, O >>>= 5, z -= 5, _.ndist = (O & 31) + 1, O >>>= 5, z -= 5, _.ncode = (O & 15) + 4, O >>>= 4, z -= 4, _.nlen > 286 || _.ndist > 30) {
                C.msg = "too many length or distance symbols", _.mode = ae;
                break;
              }
              _.have = 0, _.mode = de;
            /* falls through */
            case de:
              for (; _.have < _.ncode; ) {
                for (; z < 3; ) {
                  if (j === 0)
                    break e;
                  j--, O += V[u++] << z, z += 8;
                }
                _.lens[ln[_.have++]] = O & 7, O >>>= 3, z -= 3;
              }
              for (; _.have < 19; )
                _.lens[ln[_.have++]] = 0;
              if (_.lencode = _.lendyn, _.lenbits = 7, kt = { bits: _.lenbits }, ge = n(a, _.lens, 0, 19, _.lencode, 0, _.work, kt), _.lenbits = kt.bits, ge) {
                C.msg = "invalid code lengths set", _.mode = ae;
                break;
              }
              _.have = 0, _.mode = _e;
            /* falls through */
            case _e:
              for (; _.have < _.nlen + _.ndist; ) {
                for (; b = _.lencode[O & (1 << _.lenbits) - 1], B = b >>> 24, M = b >>> 16 & 255, q = b & 65535, !(B <= z); ) {
                  if (j === 0)
                    break e;
                  j--, O += V[u++] << z, z += 8;
                }
                if (q < 16)
                  O >>>= B, z -= B, _.lens[_.have++] = q;
                else {
                  if (q === 16) {
                    for (pt = B + 2; z < pt; ) {
                      if (j === 0)
                        break e;
                      j--, O += V[u++] << z, z += 8;
                    }
                    if (O >>>= B, z -= B, _.have === 0) {
                      C.msg = "invalid bit length repeat", _.mode = ae;
                      break;
                    }
                    me = _.lens[_.have - 1], p = 3 + (O & 3), O >>>= 2, z -= 2;
                  } else if (q === 17) {
                    for (pt = B + 3; z < pt; ) {
                      if (j === 0)
                        break e;
                      j--, O += V[u++] << z, z += 8;
                    }
                    O >>>= B, z -= B, me = 0, p = 3 + (O & 7), O >>>= 3, z -= 3;
                  } else {
                    for (pt = B + 7; z < pt; ) {
                      if (j === 0)
                        break e;
                      j--, O += V[u++] << z, z += 8;
                    }
                    O >>>= B, z -= B, me = 0, p = 11 + (O & 127), O >>>= 7, z -= 7;
                  }
                  if (_.have + p > _.nlen + _.ndist) {
                    C.msg = "invalid bit length repeat", _.mode = ae;
                    break;
                  }
                  for (; p--; )
                    _.lens[_.have++] = me;
                }
              }
              if (_.mode === ae)
                break;
              if (_.lens[256] === 0) {
                C.msg = "invalid code -- missing end-of-block", _.mode = ae;
                break;
              }
              if (_.lenbits = 9, kt = { bits: _.lenbits }, ge = n(s, _.lens, 0, _.nlen, _.lencode, 0, _.work, kt), _.lenbits = kt.bits, ge) {
                C.msg = "invalid literal/lengths set", _.mode = ae;
                break;
              }
              if (_.distbits = 6, _.distcode = _.distdyn, kt = { bits: _.distbits }, ge = n(o, _.lens, _.nlen, _.ndist, _.distcode, 0, _.work, kt), _.distbits = kt.bits, ge) {
                C.msg = "invalid distances set", _.mode = ae;
                break;
              }
              if (_.mode = ue, W === f)
                break e;
            /* falls through */
            case ue:
              _.mode = ve;
            /* falls through */
            case ve:
              if (j >= 6 && g >= 258) {
                C.next_out = L, C.avail_out = g, C.next_in = u, C.avail_in = j, _.hold = O, _.bits = z, r(C, te), L = C.next_out, le = C.output, g = C.avail_out, u = C.next_in, V = C.input, j = C.avail_in, O = _.hold, z = _.bits, _.mode === Q && (_.back = -1);
                break;
              }
              for (_.back = 0; b = _.lencode[O & (1 << _.lenbits) - 1], B = b >>> 24, M = b >>> 16 & 255, q = b & 65535, !(B <= z); ) {
                if (j === 0)
                  break e;
                j--, O += V[u++] << z, z += 8;
              }
              if (M && (M & 240) === 0) {
                for (oe = B, Ae = M, Te = q; b = _.lencode[Te + ((O & (1 << oe + Ae) - 1) >> oe)], B = b >>> 24, M = b >>> 16 & 255, q = b & 65535, !(oe + B <= z); ) {
                  if (j === 0)
                    break e;
                  j--, O += V[u++] << z, z += 8;
                }
                O >>>= oe, z -= oe, _.back += oe;
              }
              if (O >>>= B, z -= B, _.back += B, _.length = q, M === 0) {
                _.mode = Ee;
                break;
              }
              if (M & 32) {
                _.back = -1, _.mode = Q;
                break;
              }
              if (M & 64) {
                C.msg = "invalid literal/length code", _.mode = ae;
                break;
              }
              _.extra = M & 15, _.mode = be;
            /* falls through */
            case be:
              if (_.extra) {
                for (pt = _.extra; z < pt; ) {
                  if (j === 0)
                    break e;
                  j--, O += V[u++] << z, z += 8;
                }
                _.length += O & (1 << _.extra) - 1, O >>>= _.extra, z -= _.extra, _.back += _.extra;
              }
              _.was = _.length, _.mode = Be;
            /* falls through */
            case Be:
              for (; b = _.distcode[O & (1 << _.distbits) - 1], B = b >>> 24, M = b >>> 16 & 255, q = b & 65535, !(B <= z); ) {
                if (j === 0)
                  break e;
                j--, O += V[u++] << z, z += 8;
              }
              if ((M & 240) === 0) {
                for (oe = B, Ae = M, Te = q; b = _.distcode[Te + ((O & (1 << oe + Ae) - 1) >> oe)], B = b >>> 24, M = b >>> 16 & 255, q = b & 65535, !(oe + B <= z); ) {
                  if (j === 0)
                    break e;
                  j--, O += V[u++] << z, z += 8;
                }
                O >>>= oe, z -= oe, _.back += oe;
              }
              if (O >>>= B, z -= B, _.back += B, M & 64) {
                C.msg = "invalid distance code", _.mode = ae;
                break;
              }
              _.offset = q, _.extra = M & 15, _.mode = we;
            /* falls through */
            case we:
              if (_.extra) {
                for (pt = _.extra; z < pt; ) {
                  if (j === 0)
                    break e;
                  j--, O += V[u++] << z, z += 8;
                }
                _.offset += O & (1 << _.extra) - 1, O >>>= _.extra, z -= _.extra, _.back += _.extra;
              }
              if (_.offset > _.dmax) {
                C.msg = "invalid distance too far back", _.mode = ae;
                break;
              }
              _.mode = he;
            /* falls through */
            case he:
              if (g === 0)
                break e;
              if (p = te - g, _.offset > p) {
                if (p = _.offset - p, p > _.whave && _.sane) {
                  C.msg = "invalid distance too far back", _.mode = ae;
                  break;
                }
                p > _.wnext ? (p -= _.wnext, c = _.wsize - p) : c = _.wnext - p, p > _.length && (p = _.length), h = _.window;
              } else
                h = le, c = L - _.offset, p = _.length;
              p > g && (p = g), g -= p, _.length -= p;
              do
                le[L++] = h[c++];
              while (--p);
              _.length === 0 && (_.mode = ve);
              break;
            case Ee:
              if (g === 0)
                break e;
              le[L++] = _.length, g--, _.mode = ve;
              break;
            case Ne:
              if (_.wrap) {
                for (; z < 32; ) {
                  if (j === 0)
                    break e;
                  j--, O |= V[u++] << z, z += 8;
                }
                if (te -= g, C.total_out += te, _.total += te, te && (C.adler = _.check = /*UPDATE(state.check, put - _out, _out);*/
                _.flags ? t(_.check, le, te, L - te) : e(_.check, le, te, L - te)), te = g, (_.flags ? O : Ke(O)) !== _.check) {
                  C.msg = "incorrect data check", _.mode = ae;
                  break;
                }
                O = 0, z = 0;
              }
              _.mode = Ze;
            /* falls through */
            case Ze:
              if (_.wrap && _.flags) {
                for (; z < 32; ) {
                  if (j === 0)
                    break e;
                  j--, O += V[u++] << z, z += 8;
                }
                if (O !== (_.total & 4294967295)) {
                  C.msg = "incorrect length check", _.mode = ae;
                  break;
                }
                O = 0, z = 0;
              }
              _.mode = Le;
            /* falls through */
            case Le:
              ge = m;
              break e;
            case ae:
              ge = x;
              break e;
            case ke:
              return E;
            case De:
            /* falls through */
            default:
              return k;
          }
      return C.next_out = L, C.avail_out = g, C.next_in = u, C.avail_in = j, _.hold = O, _.bits = z, (_.wsize || te !== C.avail_out && _.mode < ae && (_.mode < Ne || W !== l)) && wt(C, C.output, C.next_out, te - C.avail_out), re -= C.avail_in, te -= C.avail_out, C.total_in += re, C.total_out += te, _.total += te, _.wrap && te && (C.adler = _.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      _.flags ? t(_.check, le, te, C.next_out - te) : e(_.check, le, te, C.next_out - te)), C.data_type = _.bits + (_.last ? 64 : 0) + (_.mode === Q ? 128 : 0) + (_.mode === ue || _.mode === H ? 256 : 0), (re === 0 && te === 0 || W === l) && ge === w && (ge = R), ge;
    }
    function Y(C) {
      if (!C || !C.state)
        return k;
      var W = C.state;
      return W.window && (W.window = null), C.state = null, w;
    }
    function J(C, W) {
      var _;
      return !C || !C.state || (_ = C.state, (_.wrap & 2) === 0) ? k : (_.head = W, W.done = !1, w);
    }
    function ee(C, W) {
      var _ = W.length, V, le, u;
      return !C || !C.state || (V = C.state, V.wrap !== 0 && V.mode !== Z) ? k : V.mode === Z && (le = 1, le = e(le, W, _, 0), le !== V.check) ? x : (u = wt(C, W, _, _), u ? (V.mode = ke, E) : (V.havedict = 1, w));
    }
    return it.inflateReset = Ie, it.inflateReset2 = Fe, it.inflateResetKeep = dt, it.inflateInit = Je, it.inflateInit2 = st, it.inflate = v, it.inflateEnd = Y, it.inflateGetHeader = J, it.inflateSetDictionary = ee, it.inflateInfo = "pako inflate (from Nodeca project)", it;
  }
  var _i, Bn;
  function ba() {
    return Bn || (Bn = 1, _i = {
      /* Allowed flush values; see deflate() and inflate() below for details */
      Z_NO_FLUSH: 0,
      Z_PARTIAL_FLUSH: 1,
      Z_SYNC_FLUSH: 2,
      Z_FULL_FLUSH: 3,
      Z_FINISH: 4,
      Z_BLOCK: 5,
      Z_TREES: 6,
      /* Return codes for the compression/decompression functions. Negative values
      * are errors, positive values are used for special but normal events.
      */
      Z_OK: 0,
      Z_STREAM_END: 1,
      Z_NEED_DICT: 2,
      Z_ERRNO: -1,
      Z_STREAM_ERROR: -2,
      Z_DATA_ERROR: -3,
      //Z_MEM_ERROR:     -4,
      Z_BUF_ERROR: -5,
      //Z_VERSION_ERROR: -6,
      /* compression levels */
      Z_NO_COMPRESSION: 0,
      Z_BEST_SPEED: 1,
      Z_BEST_COMPRESSION: 9,
      Z_DEFAULT_COMPRESSION: -1,
      Z_FILTERED: 1,
      Z_HUFFMAN_ONLY: 2,
      Z_RLE: 3,
      Z_FIXED: 4,
      Z_DEFAULT_STRATEGY: 0,
      /* Possible values of the data_type field (though see inflate()) */
      Z_BINARY: 0,
      Z_TEXT: 1,
      //Z_ASCII:                1, // = Z_TEXT (deprecated)
      Z_UNKNOWN: 2,
      /* The deflate compression method */
      Z_DEFLATED: 8
      //Z_NULL:                 null // Use -1 or null inline, depending on var type
    }), _i;
  }
  var gi, On;
  function bs() {
    if (On) return gi;
    On = 1;
    function i() {
      this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
    }
    return gi = i, gi;
  }
  var Cn;
  function Es() {
    if (Cn) return Gt;
    Cn = 1;
    var i = vs(), e = Ot(), t = ya(), r = ba(), n = Ji(), a = va(), s = bs(), o = Object.prototype.toString;
    function l(w) {
      if (!(this instanceof l)) return new l(w);
      this.options = e.assign({
        chunkSize: 16384,
        windowBits: 0,
        to: ""
      }, w || {});
      var m = this.options;
      m.raw && m.windowBits >= 0 && m.windowBits < 16 && (m.windowBits = -m.windowBits, m.windowBits === 0 && (m.windowBits = -15)), m.windowBits >= 0 && m.windowBits < 16 && !(w && w.windowBits) && (m.windowBits += 32), m.windowBits > 15 && m.windowBits < 48 && (m.windowBits & 15) === 0 && (m.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new a(), this.strm.avail_out = 0;
      var y = i.inflateInit2(
        this.strm,
        m.windowBits
      );
      if (y !== r.Z_OK)
        throw new Error(n[y]);
      if (this.header = new s(), i.inflateGetHeader(this.strm, this.header), m.dictionary && (typeof m.dictionary == "string" ? m.dictionary = t.string2buf(m.dictionary) : o.call(m.dictionary) === "[object ArrayBuffer]" && (m.dictionary = new Uint8Array(m.dictionary)), m.raw && (y = i.inflateSetDictionary(this.strm, m.dictionary), y !== r.Z_OK)))
        throw new Error(n[y]);
    }
    l.prototype.push = function(w, m) {
      var y = this.strm, k = this.options.chunkSize, x = this.options.dictionary, E, R, T, S, N, D = !1;
      if (this.ended)
        return !1;
      R = m === ~~m ? m : m === !0 ? r.Z_FINISH : r.Z_NO_FLUSH, typeof w == "string" ? y.input = t.binstring2buf(w) : o.call(w) === "[object ArrayBuffer]" ? y.input = new Uint8Array(w) : y.input = w, y.next_in = 0, y.avail_in = y.input.length;
      do {
        if (y.avail_out === 0 && (y.output = new e.Buf8(k), y.next_out = 0, y.avail_out = k), E = i.inflate(y, r.Z_NO_FLUSH), E === r.Z_NEED_DICT && x && (E = i.inflateSetDictionary(this.strm, x)), E === r.Z_BUF_ERROR && D === !0 && (E = r.Z_OK, D = !1), E !== r.Z_STREAM_END && E !== r.Z_OK)
          return this.onEnd(E), this.ended = !0, !1;
        y.next_out && (y.avail_out === 0 || E === r.Z_STREAM_END || y.avail_in === 0 && (R === r.Z_FINISH || R === r.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (T = t.utf8border(y.output, y.next_out), S = y.next_out - T, N = t.buf2string(y.output, T), y.next_out = S, y.avail_out = k - S, S && e.arraySet(y.output, y.output, T, S, 0), this.onData(N)) : this.onData(e.shrinkBuf(y.output, y.next_out))), y.avail_in === 0 && y.avail_out === 0 && (D = !0);
      } while ((y.avail_in > 0 || y.avail_out === 0) && E !== r.Z_STREAM_END);
      return E === r.Z_STREAM_END && (R = r.Z_FINISH), R === r.Z_FINISH ? (E = i.inflateEnd(this.strm), this.onEnd(E), this.ended = !0, E === r.Z_OK) : (R === r.Z_SYNC_FLUSH && (this.onEnd(r.Z_OK), y.avail_out = 0), !0);
    }, l.prototype.onData = function(w) {
      this.chunks.push(w);
    }, l.prototype.onEnd = function(w) {
      w === r.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = w, this.msg = this.strm.msg;
    };
    function d(w, m) {
      var y = new l(m);
      if (y.push(w, !0), y.err)
        throw y.msg || n[y.err];
      return y.result;
    }
    function f(w, m) {
      return m = m || {}, m.raw = !0, d(w, m);
    }
    return Gt.Inflate = l, Gt.inflate = d, Gt.inflateRaw = f, Gt.ungzip = d, Gt;
  }
  var yi, Nn;
  function ks() {
    if (Nn) return yi;
    Nn = 1;
    var i = Ot().assign, e = _s(), t = Es(), r = ba(), n = {};
    return i(n, e, t, r), yi = n, yi;
  }
  var xs = ks();
  const Qi = /* @__PURE__ */ qt(xs);
  var vi, Dn;
  function Ss() {
    if (Dn) return vi;
    Dn = 1;
    const i = (e, t) => function(...r) {
      const n = t.promiseModule;
      return new n((a, s) => {
        t.multiArgs ? r.push((...o) => {
          t.errorFirst ? o[0] ? s(o) : (o.shift(), a(o)) : a(o);
        }) : t.errorFirst ? r.push((o, l) => {
          o ? s(o) : a(l);
        }) : r.push(a), e.apply(this, r);
      });
    };
    return vi = (e, t) => {
      t = Object.assign({
        exclude: [/.+(Sync|Stream)$/],
        errorFirst: !0,
        promiseModule: Promise
      }, t);
      const r = typeof e;
      if (!(e !== null && (r === "object" || r === "function")))
        throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${e === null ? "null" : r}\``);
      const n = (s) => {
        const o = (l) => typeof l == "string" ? s === l : l.test(s);
        return t.include ? t.include.some(o) : !t.exclude.some(o);
      };
      let a;
      r === "function" ? a = function(...s) {
        return t.excludeMain ? e(...s) : i(e, t).apply(this, s);
      } : a = Object.create(Object.getPrototypeOf(e));
      for (const s in e) {
        const o = e[s];
        a[s] = typeof o == "function" && n(s) ? i(o, t) : o;
      }
      return a;
    }, vi;
  }
  var Is = Ss();
  const bi = /* @__PURE__ */ qt(Is);
  var Ei, Fn;
  function Ts() {
    if (Fn) return Ei;
    Fn = 1;
    function i(X) {
      return Array.isArray(X) ? X : [X];
    }
    const e = "", t = " ", r = "\\", n = /^\s+$/, a = /(?:[^\\]|^)\\$/, s = /^\\!/, o = /^\\#/, l = /\r?\n/g, d = /^\.*\/|^\.+$/, f = "/";
    let w = "node-ignore";
    typeof Symbol < "u" && (w = Symbol.for("node-ignore"));
    const m = w, y = (X, H, K) => Object.defineProperty(X, H, { value: K }), k = /([0-z])-([0-z])/g, x = () => !1, E = (X) => X.replace(
      k,
      (H, K, ie) => K.charCodeAt(0) <= ie.charCodeAt(0) ? H : e
    ), R = (X) => {
      const { length: H } = X;
      return X.slice(0, H - H % 2);
    }, T = [
      [
        // remove BOM
        // TODO:
        // Other similar zero-width characters?
        /^\uFEFF/,
        () => e
      ],
      // > Trailing spaces are ignored unless they are quoted with backslash ("\")
      [
        // (a\ ) -> (a )
        // (a  ) -> (a)
        // (a ) -> (a)
        // (a \ ) -> (a  )
        /((?:\\\\)*?)(\\?\s+)$/,
        (X, H, K) => H + (K.indexOf("\\") === 0 ? t : e)
      ],
      // replace (\ ) with ' '
      // (\ ) -> ' '
      // (\\ ) -> '\\ '
      // (\\\ ) -> '\\ '
      [
        /(\\+?)\s/g,
        (X, H) => {
          const { length: K } = H;
          return H.slice(0, K - K % 2) + t;
        }
      ],
      // Escape metacharacters
      // which is written down by users but means special for regular expressions.
      // > There are 12 characters with special meanings:
      // > - the backslash \,
      // > - the caret ^,
      // > - the dollar sign $,
      // > - the period or dot .,
      // > - the vertical bar or pipe symbol |,
      // > - the question mark ?,
      // > - the asterisk or star *,
      // > - the plus sign +,
      // > - the opening parenthesis (,
      // > - the closing parenthesis ),
      // > - and the opening square bracket [,
      // > - the opening curly brace {,
      // > These special characters are often called "metacharacters".
      [
        /[\\$.|*+(){^]/g,
        (X) => `\\${X}`
      ],
      [
        // > a question mark (?) matches a single character
        /(?!\\)\?/g,
        () => "[^/]"
      ],
      // leading slash
      [
        // > A leading slash matches the beginning of the pathname.
        // > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
        // A leading slash matches the beginning of the pathname
        /^\//,
        () => "^"
      ],
      // replace special metacharacter slash after the leading slash
      [
        /\//g,
        () => "\\/"
      ],
      [
        // > A leading "**" followed by a slash means match in all directories.
        // > For example, "**/foo" matches file or directory "foo" anywhere,
        // > the same as pattern "foo".
        // > "**/foo/bar" matches file or directory "bar" anywhere that is directly
        // >   under directory "foo".
        // Notice that the '*'s have been replaced as '\\*'
        /^\^*\\\*\\\*\\\//,
        // '**/foo' <-> 'foo'
        () => "^(?:.*\\/)?"
      ],
      // starting
      [
        // there will be no leading '/'
        //   (which has been replaced by section "leading slash")
        // If starts with '**', adding a '^' to the regular expression also works
        /^(?=[^^])/,
        function() {
          return /\/(?!$)/.test(this) ? "^" : "(?:^|\\/)";
        }
      ],
      // two globstars
      [
        // Use lookahead assertions so that we could match more than one `'/**'`
        /\\\/\\\*\\\*(?=\\\/|$)/g,
        // Zero, one or several directories
        // should not use '*', or it will be replaced by the next replacer
        // Check if it is not the last `'/**'`
        (X, H, K) => H + 6 < K.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
      ],
      // normal intermediate wildcards
      [
        // Never replace escaped '*'
        // ignore rule '\*' will match the path '*'
        // 'abc.*/' -> go
        // 'abc.*'  -> skip this rule,
        //    coz trailing single wildcard will be handed by [trailing wildcard]
        /(^|[^\\]+)(\\\*)+(?=.+)/g,
        // '*.js' matches '.js'
        // '*.js' doesn't match 'abc'
        (X, H, K) => {
          const ie = K.replace(/\\\*/g, "[^\\/]*");
          return H + ie;
        }
      ],
      [
        // unescape, revert step 3 except for back slash
        // For example, if a user escape a '\\*',
        // after step 3, the result will be '\\\\\\*'
        /\\\\\\(?=[$.|*+(){^])/g,
        () => r
      ],
      [
        // '\\\\' -> '\\'
        /\\\\/g,
        () => r
      ],
      [
        // > The range notation, e.g. [a-zA-Z],
        // > can be used to match one of the characters in a range.
        // `\` is escaped by step 3
        /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
        (X, H, K, ie, de) => H === r ? `\\[${K}${R(ie)}${de}` : de === "]" && ie.length % 2 === 0 ? `[${E(K)}${ie}]` : "[]"
      ],
      // ending
      [
        // 'js' will not match 'js.'
        // 'ab' will not match 'abc'
        /(?:[^*])$/,
        // WTF!
        // https://git-scm.com/docs/gitignore
        // changes in [2.22.1](https://git-scm.com/docs/gitignore/2.22.1)
        // which re-fixes #24, #38
        // > If there is a separator at the end of the pattern then the pattern
        // > will only match directories, otherwise the pattern can match both
        // > files and directories.
        // 'js*' will not match 'a.js'
        // 'js/' will not match 'a.js'
        // 'js' will match 'a.js' and 'a.js/'
        (X) => /\/$/.test(X) ? `${X}$` : `${X}(?=$|\\/$)`
      ],
      // trailing wildcard
      [
        /(\^|\\\/)?\\\*$/,
        (X, H) => `${H ? `${H}[^/]+` : "[^/]*"}(?=$|\\/$)`
      ]
    ], S = /* @__PURE__ */ Object.create(null), N = (X, H) => {
      let K = S[X];
      return K || (K = T.reduce(
        (ie, [de, _e]) => ie.replace(de, _e.bind(X)),
        X
      ), S[X] = K), H ? new RegExp(K, "i") : new RegExp(K);
    }, D = (X) => typeof X == "string", F = (X) => X && D(X) && !n.test(X) && !a.test(X) && X.indexOf("#") !== 0, I = (X) => X.split(l);
    class A {
      constructor(H, K, ie, de) {
        this.origin = H, this.pattern = K, this.negative = ie, this.regex = de;
      }
    }
    const U = (X, H) => {
      const K = X;
      let ie = !1;
      X.indexOf("!") === 0 && (ie = !0, X = X.substr(1)), X = X.replace(s, "!").replace(o, "#");
      const de = N(X, H);
      return new A(
        K,
        X,
        ie,
        de
      );
    }, P = (X, H) => {
      throw new H(X);
    }, G = (X, H, K) => D(X) ? X ? G.isNotRelative(X) ? K(
      `path should be a \`path.relative()\`d string, but got "${H}"`,
      RangeError
    ) : !0 : K("path must not be empty", TypeError) : K(
      `path must be a string, but got \`${H}\``,
      TypeError
    ), $ = (X) => d.test(X);
    G.isNotRelative = $, G.convert = (X) => X;
    class Z {
      constructor({
        ignorecase: H = !0,
        ignoreCase: K = H,
        allowRelativePaths: ie = !1
      } = {}) {
        y(this, m, !0), this._rules = [], this._ignoreCase = K, this._allowRelativePaths = ie, this._initCache();
      }
      _initCache() {
        this._ignoreCache = /* @__PURE__ */ Object.create(null), this._testCache = /* @__PURE__ */ Object.create(null);
      }
      _addPattern(H) {
        if (H && H[m]) {
          this._rules = this._rules.concat(H._rules), this._added = !0;
          return;
        }
        if (F(H)) {
          const K = U(H, this._ignoreCase);
          this._added = !0, this._rules.push(K);
        }
      }
      // @param {Array<string> | string | Ignore} pattern
      add(H) {
        return this._added = !1, i(
          D(H) ? I(H) : H
        ).forEach(this._addPattern, this), this._added && this._initCache(), this;
      }
      // legacy
      addPattern(H) {
        return this.add(H);
      }
      //          |           ignored : unignored
      // negative |   0:0   |   0:1   |   1:0   |   1:1
      // -------- | ------- | ------- | ------- | --------
      //     0    |  TEST   |  TEST   |  SKIP   |    X
      //     1    |  TESTIF |  SKIP   |  TEST   |    X
      // - SKIP: always skip
      // - TEST: always test
      // - TESTIF: only test if checkUnignored
      // - X: that never happen
      // @param {boolean} whether should check if the path is unignored,
      //   setting `checkUnignored` to `false` could reduce additional
      //   path matching.
      // @returns {TestResult} true if a file is ignored
      _testOne(H, K) {
        let ie = !1, de = !1;
        return this._rules.forEach((_e) => {
          const { negative: ue } = _e;
          if (de === ue && ie !== de || ue && !ie && !de && !K)
            return;
          _e.regex.test(H) && (ie = !ue, de = ue);
        }), {
          ignored: ie,
          unignored: de
        };
      }
      // @returns {TestResult}
      _test(H, K, ie, de) {
        const _e = H && G.convert(H);
        return G(
          _e,
          H,
          this._allowRelativePaths ? x : P
        ), this._t(_e, K, ie, de);
      }
      _t(H, K, ie, de) {
        if (H in K)
          return K[H];
        if (de || (de = H.split(f)), de.pop(), !de.length)
          return K[H] = this._testOne(H, ie);
        const _e = this._t(
          de.join(f) + f,
          K,
          ie,
          de
        );
        return K[H] = _e.ignored ? _e : this._testOne(H, ie);
      }
      ignores(H) {
        return this._test(H, this._ignoreCache, !1).ignored;
      }
      createFilter() {
        return (H) => !this.ignores(H);
      }
      filter(H) {
        return i(H).filter(this.createFilter());
      }
      // @returns {TestResult}
      test(H) {
        return this._test(H, this._testCache, !0);
      }
    }
    const Q = (X) => new Z(X), ce = (X) => G(X && G.convert(X), X, x);
    if (Q.isPathValid = ce, Q.default = Q, Ei = Q, // Detect `process` so that it can run in browsers.
    typeof Qe < "u" && (Qe.env && Qe.env.IGNORE_TEST_WIN32 || Qe.platform === "win32")) {
      const X = (K) => /^\\\\\?\\/.test(K) || /["<>|\u0000-\u001F]+/u.test(K) ? K : K.replace(/\\/g, "/");
      G.convert = X;
      const H = /^[a-z]:\//i;
      G.isNotRelative = (K) => H.test(K) || $(K);
    }
    return Ei;
  }
  Ts();
  var ki, Pn;
  function $s() {
    if (Pn) return ki;
    Pn = 1;
    function i(r) {
      return r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function e(r, n, a) {
      return n = n instanceof RegExp ? n : new RegExp(i(n), "g"), r.replace(n, a);
    }
    var t = {
      clean: function(n) {
        if (typeof n != "string")
          throw new Error("Expected a string, received: " + n);
        return n = e(n, "./", "/"), n = e(n, "..", "."), n = e(n, " ", "-"), n = e(n, /^[~^:?*\\\-]/g, ""), n = e(n, /[~^:?*\\]/g, "-"), n = e(n, /[~^:?*\\\-]$/g, ""), n = e(n, "@{", "-"), n = e(n, /\.$/g, ""), n = e(n, /\/$/g, ""), n = e(n, /\.lock$/g, ""), n;
      }
    };
    return ki = t, ki;
  }
  var As = $s();
  const Mn = /* @__PURE__ */ qt(As);
  var xi, Un;
  function Rs() {
    return Un || (Un = 1, xi = function(i, e) {
      var t = i, r = e, n = t.length, a = r.length, s = !1, o = null, l = n + 1, d = [], f = [], w = [], m = "", y = -1, k = 0, x = 1, E, R, T = function() {
        n >= a && (E = t, R = n, t = r, r = E, n = a, a = R, s = !0, l = n + 1);
      }, S = function(I, A, U) {
        return {
          x: I,
          y: A,
          k: U
        };
      }, N = function(I, A) {
        return {
          elem: I,
          t: A
        };
      }, D = function(I, A, U) {
        var P, G, $;
        for (A > U ? P = d[I - 1 + l] : P = d[I + 1 + l], $ = Math.max(A, U), G = $ - I; G < n && $ < a && t[G] === r[$]; )
          ++G, ++$;
        return d[I + l] = f.length, f[f.length] = new S(G, $, P), $;
      }, F = function(I) {
        var A, U, P;
        for (A = U = 0, P = I.length - 1; P >= 0; --P)
          for (; A < I[P].x || U < I[P].y; )
            I[P].y - I[P].x > U - A ? (s ? w[w.length] = new N(r[U], y) : w[w.length] = new N(r[U], x), ++U) : I[P].y - I[P].x < U - A ? (s ? w[w.length] = new N(t[A], x) : w[w.length] = new N(t[A], y), ++A) : (w[w.length] = new N(t[A], k), m += t[A], ++A, ++U);
      };
      return T(), {
        SES_DELETE: -1,
        SES_COMMON: 0,
        SES_ADD: 1,
        editdistance: function() {
          return o;
        },
        getlcs: function() {
          return m;
        },
        getses: function() {
          return w;
        },
        compose: function() {
          var I, A, U, P, G, $, Z, Q;
          for (I = a - n, A = n + a + 3, U = {}, Z = 0; Z < A; ++Z)
            U[Z] = -1, d[Z] = -1;
          P = -1;
          do {
            for (++P, Q = -P; Q <= I - 1; ++Q)
              U[Q + l] = D(Q, U[Q - 1 + l] + 1, U[Q + 1 + l]);
            for (Q = I + P; Q >= I + 1; --Q)
              U[Q + l] = D(Q, U[Q - 1 + l] + 1, U[Q + 1 + l]);
            U[I + l] = D(I, U[I - 1 + l] + 1, U[I + 1 + l]);
          } while (U[I + l] !== a);
          for (o = I + 2 * P, G = d[I + l], $ = []; G !== -1; )
            $[$.length] = new S(f[G].x, f[G].y, null), G = f[G].k;
          F($);
        }
      };
    }), xi;
  }
  var Si, zn;
  function Bs() {
    if (zn) return Si;
    zn = 1;
    var i = Rs();
    function e(a, s) {
      var o = new i(a, s);
      o.compose();
      for (var l = o.getses(), d, f, w = a.length - 1, m = s.length - 1, y = l.length - 1; y >= 0; --y)
        l[y].t === o.SES_COMMON ? (f ? (f.chain = {
          file1index: w,
          file2index: m,
          chain: null
        }, f = f.chain) : (d = {
          file1index: w,
          file2index: m,
          chain: null
        }, f = d), w--, m--) : l[y].t === o.SES_DELETE ? w-- : l[y].t === o.SES_ADD && m--;
      var k = {
        file1index: -1,
        file2index: -1,
        chain: null
      };
      return f ? (f.chain = k, d) : k;
    }
    function t(a, s) {
      for (var o = [], l = a.length, d = s.length, f = e(a, s); f !== null; f = f.chain) {
        var w = l - f.file1index - 1, m = d - f.file2index - 1;
        l = f.file1index, d = f.file2index, (w || m) && o.push({
          file1: [l + 1, w],
          file2: [d + 1, m]
        });
      }
      return o.reverse(), o;
    }
    function r(a, s, o) {
      var l, d = t(s, a), f = t(s, o), w = [];
      function m(K, ie) {
        w.push([K.file1[0], ie, K.file1[1], K.file2[0], K.file2[1]]);
      }
      for (l = 0; l < d.length; l++)
        m(d[l], 0);
      for (l = 0; l < f.length; l++)
        m(f[l], 2);
      w.sort(function(K, ie) {
        return K[0] - ie[0];
      });
      var y = [], k = 0;
      function x(K) {
        K > k && (y.push([1, k, K - k]), k = K);
      }
      for (var E = 0; E < w.length; E++) {
        for (var R = E, T = w[E], S = T[0], N = S + T[2]; E < w.length - 1; ) {
          var D = w[E + 1], F = D[0];
          if (F > N) break;
          N = Math.max(N, F + D[2]), E++;
        }
        if (x(S), R == E)
          T[4] > 0 && y.push([T[1], T[3], T[4]]);
        else {
          var I = {
            0: [a.length, -1, s.length, -1],
            2: [o.length, -1, s.length, -1]
          };
          for (l = R; l <= E; l++) {
            T = w[l];
            var A = T[1], U = I[A], P = T[0], G = P + T[2], $ = T[3], Z = $ + T[4];
            U[0] = Math.min($, U[0]), U[1] = Math.max(Z, U[1]), U[2] = Math.min(P, U[2]), U[3] = Math.max(G, U[3]);
          }
          var Q = I[0][0] + (S - I[0][2]), ce = I[0][1] + (N - I[0][3]), X = I[2][0] + (S - I[2][2]), H = I[2][1] + (N - I[2][3]);
          y.push([
            -1,
            Q,
            ce - Q,
            S,
            N - S,
            X,
            H - X
          ]);
        }
        k = N;
      }
      return x(s.length), y;
    }
    function n(a, s, o) {
      var l = [], d = [a, s, o], f = r(a, s, o), w = [];
      function m() {
        w.length && l.push({
          ok: w
        }), w = [];
      }
      function y(T) {
        for (var S = 0; S < T.length; S++)
          w.push(T[S]);
      }
      function k(T) {
        if (T[2] != T[6]) return !0;
        for (var S = T[1], N = T[5], D = 0; D < T[2]; D++)
          if (a[D + S] != o[D + N]) return !0;
        return !1;
      }
      for (var x = 0; x < f.length; x++) {
        var E = f[x], R = E[0];
        R == -1 ? k(E) ? (m(), l.push({
          conflict: {
            a: a.slice(E[1], E[1] + E[2]),
            aIndex: E[1],
            o: s.slice(E[3], E[3] + E[4]),
            oIndex: E[3],
            b: o.slice(E[5], E[5] + E[6]),
            bIndex: E[5]
          }
        })) : y(d[0].slice(E[1], E[1] + E[2])) : y(d[R].slice(E[1], E[1] + E[2]));
      }
      return m(), l;
    }
    return Si = n, Si;
  }
  var Os = Bs();
  const Cs = /* @__PURE__ */ qt(Os);
  class xe extends Error {
    constructor(e) {
      super(e), this.caller = "";
    }
    toJSON() {
      return {
        code: this.code,
        data: this.data,
        caller: this.caller,
        message: this.message,
        stack: this.stack
      };
    }
    fromJSON(e) {
      const t = new xe(e.message);
      return t.code = e.code, t.data = e.data, t.caller = e.caller, t.stack = e.stack, t;
    }
    get isIsomorphicGitError() {
      return !0;
    }
  }
  class Mr extends xe {
    /**
     * @param {Array<string>} filepaths
     */
    constructor(e) {
      super(
        `Modifying the index is not possible because you have unmerged files: ${e.toString}. Fix them up in the work tree, and then use 'git add/rm as appropriate to mark resolution and make a commit.`
      ), this.code = this.name = Mr.code, this.data = { filepaths: e };
    }
  }
  Mr.code = "UnmergedPathsError";
  class ye extends xe {
    /**
     * @param {string} message
     */
    constructor(e) {
      super(
        `An internal error caused this command to fail. Please file a bug report at https://github.com/isomorphic-git/isomorphic-git/issues with this error message: ${e}`
      ), this.code = this.name = ye.code, this.data = { message: e };
    }
  }
  ye.code = "InternalError";
  class wr extends xe {
    /**
     * @param {string} filepath
     */
    constructor(e) {
      super(`The filepath "${e}" contains unsafe character sequences`), this.code = this.name = wr.code, this.data = { filepath: e };
    }
  }
  wr.code = "UnsafeFilepathError";
  class yt {
    constructor(e) {
      this.buffer = e, this._start = 0;
    }
    eof() {
      return this._start >= this.buffer.length;
    }
    tell() {
      return this._start;
    }
    seek(e) {
      this._start = e;
    }
    slice(e) {
      const t = this.buffer.slice(this._start, this._start + e);
      return this._start += e, t;
    }
    toString(e, t) {
      const r = this.buffer.toString(e, this._start, this._start + t);
      return this._start += t, r;
    }
    write(e, t, r) {
      const n = this.buffer.write(e, this._start, t, r);
      return this._start += t, n;
    }
    copy(e, t, r) {
      const n = e.copy(this.buffer, this._start, t, r);
      return this._start += n, n;
    }
    readUInt8() {
      const e = this.buffer.readUInt8(this._start);
      return this._start += 1, e;
    }
    writeUInt8(e) {
      const t = this.buffer.writeUInt8(e, this._start);
      return this._start += 1, t;
    }
    readUInt16BE() {
      const e = this.buffer.readUInt16BE(this._start);
      return this._start += 2, e;
    }
    writeUInt16BE(e) {
      const t = this.buffer.writeUInt16BE(e, this._start);
      return this._start += 2, t;
    }
    readUInt32BE() {
      const e = this.buffer.readUInt32BE(this._start);
      return this._start += 4, e;
    }
    writeUInt32BE(e) {
      const t = this.buffer.writeUInt32BE(e, this._start);
      return this._start += 4, t;
    }
  }
  function Ur(i, e) {
    return -(i < e) || +(i > e);
  }
  function Ea(i, e) {
    return Ur(i.path, e.path);
  }
  function ka(i) {
    let e = i > 0 ? i >> 12 : 0;
    e !== 4 && e !== 8 && e !== 10 && e !== 14 && (e = 8);
    let t = i & 511;
    return t & 73 ? t = 493 : t = 420, e !== 8 && (t = 0), (e << 12) + t;
  }
  const mt = 2 ** 32;
  function Ln(i, e, t, r) {
    if (i !== void 0 && e !== void 0)
      return [i, e];
    t === void 0 && (t = r.valueOf());
    const n = Math.floor(t / 1e3), a = (t - n * 1e3) * 1e6;
    return [n, a];
  }
  function Yt(i) {
    const [e, t] = Ln(
      i.ctimeSeconds,
      i.ctimeNanoseconds,
      i.ctimeMs,
      i.ctime
    ), [r, n] = Ln(
      i.mtimeSeconds,
      i.mtimeNanoseconds,
      i.mtimeMs,
      i.mtime
    );
    return {
      ctimeSeconds: e % mt,
      ctimeNanoseconds: t % mt,
      mtimeSeconds: r % mt,
      mtimeNanoseconds: n % mt,
      dev: i.dev % mt,
      ino: i.ino % mt,
      mode: ka(i.mode % mt),
      uid: i.uid % mt,
      gid: i.gid % mt,
      // size of -1 happens over a BrowserFS HTTP Backend that doesn't serve Content-Length headers
      // (like the Karma webserver) because BrowserFS HTTP Backend uses HTTP HEAD requests to do fs.stat
      size: i.size > -1 ? i.size % mt : 0
    };
  }
  function Ns(i) {
    let e = "";
    for (const t of new Uint8Array(i))
      t < 16 && (e += "0"), e += t.toString(16);
    return e;
  }
  let Ii = null;
  async function Lt(i) {
    return Ii === null && (Ii = await Fs()), Ii ? xa(i) : Ds(i);
  }
  function Ds(i) {
    return new ma().update(i).digest("hex");
  }
  async function xa(i) {
    const e = await crypto.subtle.digest("SHA-1", i);
    return Ns(e);
  }
  async function Fs() {
    try {
      if (await xa(new Uint8Array([])) === "da39a3ee5e6b4b0d3255bfef95601890afd80709") return !0;
    } catch {
    }
    return !1;
  }
  function Ps(i) {
    return {
      assumeValid: !!(i & 32768),
      extended: !!(i & 16384),
      stage: (i & 12288) >> 12,
      nameLength: i & 4095
    };
  }
  function Ms(i) {
    const e = i.flags;
    return e.extended = !1, e.nameLength = Math.min(ne.from(i.path).length, 4095), (e.assumeValid ? 32768 : 0) + (e.extended ? 16384 : 0) + ((e.stage & 3) << 12) + (e.nameLength & 4095);
  }
  class Pt {
    /*::
     _entries: Map<string, CacheEntry>
     _dirty: boolean // Used to determine if index needs to be saved to filesystem
     */
    constructor(e, t) {
      this._dirty = !1, this._unmergedPaths = t || /* @__PURE__ */ new Set(), this._entries = e || /* @__PURE__ */ new Map();
    }
    _addEntry(e) {
      if (e.flags.stage === 0)
        e.stages = [e], this._entries.set(e.path, e), this._unmergedPaths.delete(e.path);
      else {
        let t = this._entries.get(e.path);
        t || (this._entries.set(e.path, e), t = e), t.stages[e.flags.stage] = e, this._unmergedPaths.add(e.path);
      }
    }
    static async from(e) {
      if (ne.isBuffer(e))
        return Pt.fromBuffer(e);
      if (e === null)
        return new Pt(null);
      throw new ye("invalid type passed to GitIndex.from");
    }
    static async fromBuffer(e) {
      if (e.length === 0)
        throw new ye("Index file is empty (.git/index)");
      const t = new Pt(), r = new yt(e), n = r.toString("utf8", 4);
      if (n !== "DIRC")
        throw new ye(`Invalid dircache magic file number: ${n}`);
      const a = await Lt(e.slice(0, -20)), s = e.slice(-20).toString("hex");
      if (s !== a)
        throw new ye(
          `Invalid checksum in GitIndex buffer: expected ${s} but saw ${a}`
        );
      const o = r.readUInt32BE();
      if (o !== 2)
        throw new ye(`Unsupported dircache version: ${o}`);
      const l = r.readUInt32BE();
      let d = 0;
      for (; !r.eof() && d < l; ) {
        const f = {};
        f.ctimeSeconds = r.readUInt32BE(), f.ctimeNanoseconds = r.readUInt32BE(), f.mtimeSeconds = r.readUInt32BE(), f.mtimeNanoseconds = r.readUInt32BE(), f.dev = r.readUInt32BE(), f.ino = r.readUInt32BE(), f.mode = r.readUInt32BE(), f.uid = r.readUInt32BE(), f.gid = r.readUInt32BE(), f.size = r.readUInt32BE(), f.oid = r.slice(20).toString("hex");
        const w = r.readUInt16BE();
        f.flags = Ps(w);
        const m = e.indexOf(0, r.tell() + 1) - r.tell();
        if (m < 1)
          throw new ye(`Got a path length of: ${m}`);
        if (f.path = r.toString("utf8", m), f.path.includes("..\\") || f.path.includes("../"))
          throw new wr(f.path);
        let y = 8 - (r.tell() - 12) % 8;
        for (y === 0 && (y = 8); y--; ) {
          const k = r.readUInt8();
          if (k !== 0)
            throw new ye(
              `Expected 1-8 null characters but got '${k}' after ${f.path}`
            );
          if (r.eof())
            throw new ye("Unexpected end of file");
        }
        f.stages = [], t._addEntry(f), d++;
      }
      return t;
    }
    get unmergedPaths() {
      return [...this._unmergedPaths];
    }
    get entries() {
      return [...this._entries.values()].sort(Ea);
    }
    get entriesMap() {
      return this._entries;
    }
    get entriesFlat() {
      return [...this.entries].flatMap((e) => e.stages.length > 1 ? e.stages.filter((t) => t) : e);
    }
    *[Symbol.iterator]() {
      for (const e of this.entries)
        yield e;
    }
    insert({ filepath: e, stats: t, oid: r, stage: n = 0 }) {
      t || (t = {
        ctimeSeconds: 0,
        ctimeNanoseconds: 0,
        mtimeSeconds: 0,
        mtimeNanoseconds: 0,
        dev: 0,
        ino: 0,
        mode: 0,
        uid: 0,
        gid: 0,
        size: 0
      }), t = Yt(t);
      const a = ne.from(e), s = {
        ctimeSeconds: t.ctimeSeconds,
        ctimeNanoseconds: t.ctimeNanoseconds,
        mtimeSeconds: t.mtimeSeconds,
        mtimeNanoseconds: t.mtimeNanoseconds,
        dev: t.dev,
        ino: t.ino,
        // We provide a fallback value for `mode` here because not all fs
        // implementations assign it, but we use it in GitTree.
        // '100644' is for a "regular non-executable file"
        mode: t.mode || 33188,
        uid: t.uid,
        gid: t.gid,
        size: t.size,
        path: e,
        oid: r,
        flags: {
          assumeValid: !1,
          extended: !1,
          stage: n,
          nameLength: a.length < 4095 ? a.length : 4095
        },
        stages: []
      };
      this._addEntry(s), this._dirty = !0;
    }
    delete({ filepath: e }) {
      if (this._entries.has(e))
        this._entries.delete(e);
      else
        for (const t of this._entries.keys())
          t.startsWith(e + "/") && this._entries.delete(t);
      this._unmergedPaths.has(e) && this._unmergedPaths.delete(e), this._dirty = !0;
    }
    clear() {
      this._entries.clear(), this._dirty = !0;
    }
    has({ filepath: e }) {
      return this._entries.has(e);
    }
    render() {
      return this.entries.map((e) => `${e.mode.toString(8)} ${e.oid}    ${e.path}`).join(`
`);
    }
    static async _entryToBuffer(e) {
      const t = ne.from(e.path), r = Math.ceil((62 + t.length + 1) / 8) * 8, n = ne.alloc(r), a = new yt(n), s = Yt(e);
      return a.writeUInt32BE(s.ctimeSeconds), a.writeUInt32BE(s.ctimeNanoseconds), a.writeUInt32BE(s.mtimeSeconds), a.writeUInt32BE(s.mtimeNanoseconds), a.writeUInt32BE(s.dev), a.writeUInt32BE(s.ino), a.writeUInt32BE(s.mode), a.writeUInt32BE(s.uid), a.writeUInt32BE(s.gid), a.writeUInt32BE(s.size), a.write(e.oid, 20, "hex"), a.writeUInt16BE(Ms(e)), a.write(e.path, t.length, "utf8"), n;
    }
    async toObject() {
      const e = ne.alloc(12), t = new yt(e);
      t.write("DIRC", 4, "utf8"), t.writeUInt32BE(2), t.writeUInt32BE(this.entriesFlat.length);
      let r = [];
      for (const o of this.entries)
        if (r.push(Pt._entryToBuffer(o)), o.stages.length > 1)
          for (const l of o.stages)
            l && l !== o && r.push(Pt._entryToBuffer(l));
      r = await Promise.all(r);
      const n = ne.concat(r), a = ne.concat([e, n]), s = await Lt(a);
      return ne.concat([a, ne.from(s, "hex")]);
    }
  }
  function zi(i, e, t = !0, r = !0) {
    const n = Yt(i), a = Yt(e);
    return t && n.mode !== a.mode || n.mtimeSeconds !== a.mtimeSeconds || n.ctimeSeconds !== a.ctimeSeconds || n.uid !== a.uid || n.gid !== a.gid || r && n.ino !== a.ino || n.size !== a.size;
  }
  let Ti = null;
  const $i = Symbol("IndexCache");
  function Us() {
    return {
      map: /* @__PURE__ */ new Map(),
      stats: /* @__PURE__ */ new Map()
    };
  }
  async function zs(i, e, t) {
    const [r, n] = await Promise.all([
      i.lstat(e),
      i.read(e)
    ]), a = await Pt.from(n);
    t.map.set(e, a), t.stats.set(e, r);
  }
  async function Ls(i, e, t) {
    const r = t.stats.get(e);
    if (r === void 0) return !0;
    if (r === null) return !1;
    const n = await i.lstat(e);
    return n === null ? !1 : zi(r, n);
  }
  class zt {
    /**
     *
     * @param {object} opts
     * @param {import('../models/FileSystem.js').FileSystem} opts.fs
     * @param {string} opts.gitdir
     * @param {object} opts.cache
     * @param {bool} opts.allowUnmerged
     * @param {function(GitIndex): any} closure
     */
    static async acquire({ fs: e, gitdir: t, cache: r, allowUnmerged: n = !0 }, a) {
      r[$i] || (r[$i] = Us());
      const s = `${t}/index`;
      Ti === null && (Ti = new $r({ maxPending: 1 / 0 }));
      let o, l = [];
      return await Ti.acquire(s, async () => {
        const d = r[$i];
        await Ls(e, s, d) && await zs(e, s, d);
        const f = d.map.get(s);
        if (l = f.unmergedPaths, l.length && !n)
          throw new Mr(l);
        if (o = await a(f), f._dirty) {
          const w = await f.toObject();
          await e.write(s, w), d.stats.set(s, await e.lstat(s)), f._dirty = !1;
        }
      }), o;
    }
  }
  function Li(i) {
    const e = Math.max(i.lastIndexOf("/"), i.lastIndexOf("\\"));
    return e > -1 && (i = i.slice(e + 1)), i;
  }
  function Ar(i) {
    const e = Math.max(i.lastIndexOf("/"), i.lastIndexOf("\\"));
    return e === -1 ? "." : e === 0 ? "/" : i.slice(0, e);
  }
  function Sa(i) {
    const e = /* @__PURE__ */ new Map(), t = function(n) {
      if (!e.has(n)) {
        const a = {
          type: "tree",
          fullpath: n,
          basename: Li(n),
          metadata: {},
          children: []
        };
        e.set(n, a), a.parent = t(Ar(n)), a.parent && a.parent !== a && a.parent.children.push(a);
      }
      return e.get(n);
    }, r = function(n, a) {
      if (!e.has(n)) {
        const s = {
          type: "blob",
          fullpath: n,
          basename: Li(n),
          metadata: a,
          // This recursively generates any missing parent folders.
          parent: t(Ar(n)),
          children: []
        };
        s.parent && s.parent.children.push(s), e.set(n, s);
      }
      return e.get(n);
    };
    t(".");
    for (const n of i)
      r(n.path, n);
    return e;
  }
  function js(i) {
    switch (i) {
      case 16384:
        return "tree";
      case 33188:
        return "blob";
      case 33261:
        return "blob";
      case 40960:
        return "blob";
      case 57344:
        return "commit";
    }
    throw new ye(`Unexpected GitTree entry mode: ${i.toString(8)}`);
  }
  class Hs {
    constructor({ fs: e, gitdir: t, cache: r }) {
      this.treePromise = zt.acquire(
        { fs: e, gitdir: t, cache: r },
        async function(a) {
          return Sa(a.entries);
        }
      );
      const n = this;
      this.ConstructEntry = class {
        constructor(s) {
          this._fullpath = s, this._type = !1, this._mode = !1, this._stat = !1, this._oid = !1;
        }
        async type() {
          return n.type(this);
        }
        async mode() {
          return n.mode(this);
        }
        async stat() {
          return n.stat(this);
        }
        async content() {
          return n.content(this);
        }
        async oid() {
          return n.oid(this);
        }
      };
    }
    async readdir(e) {
      const t = e._fullpath, n = (await this.treePromise).get(t);
      if (!n || n.type === "blob") return null;
      if (n.type !== "tree")
        throw new Error(`ENOTDIR: not a directory, scandir '${t}'`);
      const a = n.children.map((s) => s.fullpath);
      return a.sort(Ur), a;
    }
    async type(e) {
      return e._type === !1 && await e.stat(), e._type;
    }
    async mode(e) {
      return e._mode === !1 && await e.stat(), e._mode;
    }
    async stat(e) {
      if (e._stat === !1) {
        const r = (await this.treePromise).get(e._fullpath);
        if (!r)
          throw new Error(
            `ENOENT: no such file or directory, lstat '${e._fullpath}'`
          );
        const n = r.type === "tree" ? {} : Yt(r.metadata);
        e._type = r.type === "tree" ? "tree" : js(n.mode), e._mode = n.mode, r.type === "tree" ? e._stat = void 0 : e._stat = n;
      }
      return e._stat;
    }
    async content(e) {
    }
    async oid(e) {
      if (e._oid === !1) {
        const r = (await this.treePromise).get(e._fullpath);
        e._oid = r.metadata.oid;
      }
      return e._oid;
    }
  }
  const zr = Symbol("GitWalkSymbol");
  function qs() {
    const i = /* @__PURE__ */ Object.create(null);
    return Object.defineProperty(i, zr, {
      value: function({ fs: e, gitdir: t, cache: r }) {
        return new Hs({ fs: e, gitdir: t, cache: r });
      }
    }), Object.freeze(i), i;
  }
  class et extends xe {
    /**
     * @param {string} what
     */
    constructor(e) {
      super(`Could not find ${e}.`), this.code = this.name = et.code, this.data = { what: e };
    }
  }
  et.code = "NotFoundError";
  class $t extends xe {
    /**
     * @param {string} oid
     * @param {'blob'|'commit'|'tag'|'tree'} actual
     * @param {'blob'|'commit'|'tag'|'tree'} expected
     * @param {string} [filepath]
     */
    constructor(e, t, r, n) {
      super(
        `Object ${e} ${n ? `at ${n}` : ""}was anticipated to be a ${r} but it is a ${t}.`
      ), this.code = this.name = $t.code, this.data = { oid: e, actual: t, expected: r, filepath: n };
    }
  }
  $t.code = "ObjectTypeError";
  class jt extends xe {
    /**
     * @param {string} value
     */
    constructor(e) {
      super(`Expected a 40-char hex object id but saw "${e}".`), this.code = this.name = jt.code, this.data = { value: e };
    }
  }
  jt.code = "InvalidOidError";
  class Lr extends xe {
    /**
     * @param {string} remote
     */
    constructor(e) {
      super(`Could not find a fetch refspec for remote "${e}". Make sure the config file has an entry like the following:
[remote "${e}"]
	fetch = +refs/heads/*:refs/remotes/origin/*
`), this.code = this.name = Lr.code, this.data = { remote: e };
    }
  }
  Lr.code = "NoRefspecError";
  class Rr {
    constructor(e) {
      if (this.refs = /* @__PURE__ */ new Map(), this.parsedConfig = [], e) {
        let t = null;
        this.parsedConfig = e.trim().split(`
`).map((r) => {
          if (/^\s*#/.test(r))
            return { line: r, comment: !0 };
          const n = r.indexOf(" ");
          if (r.startsWith("^")) {
            const a = r.slice(1);
            return this.refs.set(t + "^{}", a), { line: r, ref: t, peeled: a };
          } else {
            const a = r.slice(0, n);
            return t = r.slice(n + 1), this.refs.set(t, a), { line: r, ref: t, oid: a };
          }
        });
      }
      return this;
    }
    static from(e) {
      return new Rr(e);
    }
    delete(e) {
      this.parsedConfig = this.parsedConfig.filter((t) => t.ref !== e), this.refs.delete(e);
    }
    toString() {
      return this.parsedConfig.map(({ line: e }) => e).join(`
`) + `
`;
    }
  }
  class Br {
    constructor({ remotePath: e, localPath: t, force: r, matchPrefix: n }) {
      Object.assign(this, {
        remotePath: e,
        localPath: t,
        force: r,
        matchPrefix: n
      });
    }
    static from(e) {
      const [
        t,
        r,
        n,
        a,
        s
      ] = e.match(/^(\+?)(.*?)(\*?):(.*?)(\*?)$/).slice(1), o = t === "+", l = n === "*";
      if (l !== (s === "*"))
        throw new ye("Invalid refspec");
      return new Br({
        remotePath: r,
        localPath: a,
        force: o,
        matchPrefix: l
      });
    }
    translate(e) {
      if (this.matchPrefix) {
        if (e.startsWith(this.remotePath))
          return this.localPath + e.replace(this.remotePath, "");
      } else if (e === this.remotePath) return this.localPath;
      return null;
    }
    reverseTranslate(e) {
      if (this.matchPrefix) {
        if (e.startsWith(this.localPath))
          return this.remotePath + e.replace(this.localPath, "");
      } else if (e === this.localPath) return this.remotePath;
      return null;
    }
  }
  class en {
    constructor(e = []) {
      this.rules = e;
    }
    static from(e) {
      const t = [];
      for (const r of e)
        t.push(Br.from(r));
      return new en(t);
    }
    add(e) {
      const t = Br.from(e);
      this.rules.push(t);
    }
    translate(e) {
      const t = [];
      for (const r of this.rules)
        for (const n of e) {
          const a = r.translate(n);
          a && t.push([n, a]);
        }
      return t;
    }
    translateOne(e) {
      let t = null;
      for (const r of this.rules) {
        const n = r.translate(e);
        n && (t = n);
      }
      return t;
    }
    localNamespaces() {
      return this.rules.filter((e) => e.matchPrefix).map((e) => e.localPath.replace(/\/$/, ""));
    }
  }
  function Ws(i, e) {
    const t = i.replace(/\^\{\}$/, ""), r = e.replace(/\^\{\}$/, ""), n = -(t < r) || +(t > r);
    return n === 0 ? i.endsWith("^{}") ? 1 : -1 : n;
  }
  const Zs = (i) => {
    if (typeof i == "number")
      return i;
    i = i.toLowerCase();
    let e = parseInt(i);
    return i.endsWith("k") && (e *= 1024), i.endsWith("m") && (e *= 1024 * 1024), i.endsWith("g") && (e *= 1024 * 1024 * 1024), e;
  }, nr = (i) => {
    if (typeof i == "boolean")
      return i;
    if (i = i.trim().toLowerCase(), i === "true" || i === "yes" || i === "on") return !0;
    if (i === "false" || i === "no" || i === "off") return !1;
    throw Error(
      `Expected 'true', 'false', 'yes', 'no', 'on', or 'off', but got ${i}`
    );
  }, jn = {
    core: {
      filemode: nr,
      bare: nr,
      logallrefupdates: nr,
      symlinks: nr,
      ignorecase: nr,
      bigFileThreshold: Zs
    }
  }, Gs = /^\[([A-Za-z0-9-.]+)(?: "(.*)")?\]$/, Vs = /^[A-Za-z0-9-.]+$/, Xs = /^([A-Za-z][A-Za-z-]*)(?: *= *(.*))?$/, Ys = /^[A-Za-z][A-Za-z-]*$/, Ks = /^(.*?)( *[#;].*)$/, Js = (i) => {
    const e = Gs.exec(i);
    if (e != null) {
      const [t, r] = e.slice(1);
      return [t, r];
    }
    return null;
  }, Qs = (i) => {
    const e = Xs.exec(i);
    if (e != null) {
      const [t, r = "true"] = e.slice(1), n = eo(r), a = to(n);
      return [t, a];
    }
    return null;
  }, eo = (i) => {
    const e = Ks.exec(i);
    if (e == null)
      return i;
    const [t, r] = e.slice(1);
    return Hn(t) && Hn(r) ? `${t}${r}` : t;
  }, Hn = (i) => (i.match(/(?:^|[^\\])"/g) || []).length % 2 !== 0, to = (i) => i.split("").reduce((e, t, r, n) => {
    const a = t === '"' && n[r - 1] !== "\\", s = t === "\\" && n[r + 1] === '"';
    return a || s ? e : e + t;
  }, ""), qn = (i) => i != null ? i.toLowerCase() : null, ji = (i, e, t) => [qn(i), e, qn(t)].filter((r) => r != null).join("."), Wn = (i) => {
    const e = i.split("."), t = e.shift(), r = e.pop(), n = e.length ? e.join(".") : void 0;
    return {
      section: t,
      subsection: n,
      name: r,
      path: ji(t, n, r),
      sectionPath: ji(t, n, null),
      isSection: !!t
    };
  }, ro = (i, e) => i.reduce((t, r, n) => e(r) ? n : t, -1);
  class tn {
    constructor(e) {
      let t = null, r = null;
      this.parsedConfig = e ? e.split(`
`).map((n) => {
        let a = null, s = null;
        const o = n.trim(), l = Js(o), d = l != null;
        if (d)
          [t, r] = l;
        else {
          const w = Qs(o);
          w != null && ([a, s] = w);
        }
        const f = ji(t, r, a);
        return { line: n, isSection: d, section: t, subsection: r, name: a, value: s, path: f };
      }) : [];
    }
    static from(e) {
      return new tn(e);
    }
    async get(e, t = !1) {
      const r = Wn(e).path, n = this.parsedConfig.filter((a) => a.path === r).map(({ section: a, name: s, value: o }) => {
        const l = jn[a] && jn[a][s];
        return l ? l(o) : o;
      });
      return t ? n : n.pop();
    }
    async getall(e) {
      return this.get(e, !0);
    }
    async getSubsections(e) {
      return this.parsedConfig.filter((t) => t.isSection && t.section === e).map((t) => t.subsection);
    }
    async deleteSection(e, t) {
      this.parsedConfig = this.parsedConfig.filter(
        (r) => !(r.section === e && r.subsection === t)
      );
    }
    async append(e, t) {
      return this.set(e, t, !0);
    }
    async set(e, t, r = !1) {
      const {
        section: n,
        subsection: a,
        name: s,
        path: o,
        sectionPath: l,
        isSection: d
      } = Wn(e), f = ro(
        this.parsedConfig,
        (w) => w.path === o
      );
      if (t == null)
        f !== -1 && this.parsedConfig.splice(f, 1);
      else if (f !== -1) {
        const w = this.parsedConfig[f], m = Object.assign({}, w, {
          name: s,
          value: t,
          modified: !0
        });
        r ? this.parsedConfig.splice(f + 1, 0, m) : this.parsedConfig[f] = m;
      } else {
        const w = this.parsedConfig.findIndex(
          (y) => y.path === l
        ), m = {
          section: n,
          subsection: a,
          name: s,
          value: t,
          modified: !0,
          path: o
        };
        if (Vs.test(n) && Ys.test(s))
          if (w >= 0)
            this.parsedConfig.splice(w + 1, 0, m);
          else {
            const y = {
              isSection: d,
              section: n,
              subsection: a,
              modified: !0,
              path: l
            };
            this.parsedConfig.push(y, m);
          }
      }
    }
    toString() {
      return this.parsedConfig.map(({ line: e, section: t, subsection: r, name: n, value: a, modified: s = !1 }) => s ? n != null && a != null ? typeof a == "string" && /[#;]/.test(a) ? `	${n} = "${a}"` : `	${n} = ${a}` : r != null ? `[${t} "${r}"]` : `[${t}]` : e).join(`
`);
    }
  }
  class ut {
    static async get({ fs: e, gitdir: t }) {
      const r = await e.read(`${t}/config`, { encoding: "utf8" });
      return tn.from(r);
    }
    static async save({ fs: e, gitdir: t, config: r }) {
      await e.write(`${t}/config`, r.toString(), {
        encoding: "utf8"
      });
    }
  }
  const Er = (i) => [
    `${i}`,
    `refs/${i}`,
    `refs/tags/${i}`,
    `refs/heads/${i}`,
    `refs/remotes/${i}`,
    `refs/remotes/${i}/HEAD`
  ], io = ["config", "description", "index", "shallow", "commondir"];
  let Ai;
  async function Rt(i, e) {
    return Ai === void 0 && (Ai = new $r()), Ai.acquire(i, e);
  }
  class se {
    static async updateRemoteRefs({
      fs: e,
      gitdir: t,
      remote: r,
      refs: n,
      symrefs: a,
      tags: s,
      refspecs: o = void 0,
      prune: l = !1,
      pruneTags: d = !1
    }) {
      for (const E of n.values())
        if (!E.match(/[0-9a-f]{40}/))
          throw new jt(E);
      const f = await ut.get({ fs: e, gitdir: t });
      if (!o) {
        if (o = await f.getall(`remote.${r}.fetch`), o.length === 0)
          throw new Lr(r);
        o.unshift(`+HEAD:refs/remotes/${r}/HEAD`);
      }
      const w = en.from(o), m = /* @__PURE__ */ new Map();
      if (d) {
        const E = await se.listRefs({
          fs: e,
          gitdir: t,
          filepath: "refs/tags"
        });
        await se.deleteRefs({
          fs: e,
          gitdir: t,
          refs: E.map((R) => `refs/tags/${R}`)
        });
      }
      if (s) {
        for (const E of n.keys())
          if (E.startsWith("refs/tags") && !E.endsWith("^{}") && !await se.exists({ fs: e, gitdir: t, ref: E })) {
            const R = n.get(E);
            m.set(E, R);
          }
      }
      const y = w.translate([...n.keys()]);
      for (const [E, R] of y) {
        const T = n.get(E);
        m.set(R, T);
      }
      const k = w.translate([...a.keys()]);
      for (const [E, R] of k) {
        const T = a.get(E), S = w.translateOne(T);
        S && m.set(R, `ref: ${S}`);
      }
      const x = [];
      if (l) {
        for (const E of w.localNamespaces()) {
          const R = (await se.listRefs({
            fs: e,
            gitdir: t,
            filepath: E
          })).map((T) => `${E}/${T}`);
          for (const T of R)
            m.has(T) || x.push(T);
        }
        x.length > 0 && await se.deleteRefs({ fs: e, gitdir: t, refs: x });
      }
      for (const [E, R] of m)
        await Rt(
          E,
          async () => e.write($e.join(t, E), `${R.trim()}
`, "utf8")
        );
      return { pruned: x };
    }
    // TODO: make this less crude?
    static async writeRef({ fs: e, gitdir: t, ref: r, value: n }) {
      if (!n.match(/[0-9a-f]{40}/))
        throw new jt(n);
      await Rt(
        r,
        async () => e.write($e.join(t, r), `${n.trim()}
`, "utf8")
      );
    }
    static async writeSymbolicRef({ fs: e, gitdir: t, ref: r, value: n }) {
      await Rt(
        r,
        async () => e.write($e.join(t, r), `ref: ${n.trim()}
`, "utf8")
      );
    }
    static async deleteRef({ fs: e, gitdir: t, ref: r }) {
      return se.deleteRefs({ fs: e, gitdir: t, refs: [r] });
    }
    static async deleteRefs({ fs: e, gitdir: t, refs: r }) {
      await Promise.all(r.map((o) => e.rm($e.join(t, o))));
      let n = await Rt(
        "packed-refs",
        async () => e.read(`${t}/packed-refs`, { encoding: "utf8" })
      );
      const a = Rr.from(n), s = a.refs.size;
      for (const o of r)
        a.refs.has(o) && a.delete(o);
      a.refs.size < s && (n = a.toString(), await Rt(
        "packed-refs",
        async () => e.write(`${t}/packed-refs`, n, { encoding: "utf8" })
      ));
    }
    /**
     * @param {object} args
     * @param {import('../models/FileSystem.js').FileSystem} args.fs
     * @param {string} args.gitdir
     * @param {string} args.ref
     * @param {number} [args.depth]
     * @returns {Promise<string>}
     */
    static async resolve({ fs: e, gitdir: t, ref: r, depth: n = void 0 }) {
      if (n !== void 0 && (n--, n === -1))
        return r;
      if (r.startsWith("ref: "))
        return r = r.slice(5), se.resolve({ fs: e, gitdir: t, ref: r, depth: n });
      if (r.length === 40 && /[0-9a-f]{40}/.test(r))
        return r;
      const a = await se.packedRefs({ fs: e, gitdir: t }), s = Er(r).filter((o) => !io.includes(o));
      for (const o of s) {
        const l = await Rt(
          o,
          async () => await e.read(`${t}/${o}`, { encoding: "utf8" }) || a.get(o)
        );
        if (l)
          return se.resolve({ fs: e, gitdir: t, ref: l.trim(), depth: n });
      }
      throw new et(r);
    }
    static async exists({ fs: e, gitdir: t, ref: r }) {
      try {
        return await se.expand({ fs: e, gitdir: t, ref: r }), !0;
      } catch {
        return !1;
      }
    }
    static async expand({ fs: e, gitdir: t, ref: r }) {
      if (r.length === 40 && /[0-9a-f]{40}/.test(r))
        return r;
      const n = await se.packedRefs({ fs: e, gitdir: t }), a = Er(r);
      for (const s of a)
        if (await Rt(
          s,
          async () => e.exists(`${t}/${s}`)
        ) || n.has(s)) return s;
      throw new et(r);
    }
    static async expandAgainstMap({ ref: e, map: t }) {
      const r = Er(e);
      for (const n of r)
        if (await t.has(n)) return n;
      throw new et(e);
    }
    static resolveAgainstMap({ ref: e, fullref: t = e, depth: r = void 0, map: n }) {
      if (r !== void 0 && (r--, r === -1))
        return { fullref: t, oid: e };
      if (e.startsWith("ref: "))
        return e = e.slice(5), se.resolveAgainstMap({ ref: e, fullref: t, depth: r, map: n });
      if (e.length === 40 && /[0-9a-f]{40}/.test(e))
        return { fullref: t, oid: e };
      const a = Er(e);
      for (const s of a) {
        const o = n.get(s);
        if (o)
          return se.resolveAgainstMap({
            ref: o.trim(),
            fullref: s,
            depth: r,
            map: n
          });
      }
      throw new et(e);
    }
    static async packedRefs({ fs: e, gitdir: t }) {
      const r = await Rt(
        "packed-refs",
        async () => e.read(`${t}/packed-refs`, { encoding: "utf8" })
      );
      return Rr.from(r).refs;
    }
    // List all the refs that match the `filepath` prefix
    static async listRefs({ fs: e, gitdir: t, filepath: r }) {
      const n = se.packedRefs({ fs: e, gitdir: t });
      let a = null;
      try {
        a = await e.readdirDeep(`${t}/${r}`), a = a.map((s) => s.replace(`${t}/${r}/`, ""));
      } catch {
        a = [];
      }
      for (let s of (await n).keys())
        s.startsWith(r) && (s = s.replace(r + "/", ""), a.includes(s) || a.push(s));
      return a.sort(Ws), a;
    }
    static async listBranches({ fs: e, gitdir: t, remote: r }) {
      return r ? se.listRefs({
        fs: e,
        gitdir: t,
        filepath: `refs/remotes/${r}`
      }) : se.listRefs({ fs: e, gitdir: t, filepath: "refs/heads" });
    }
    static async listTags({ fs: e, gitdir: t }) {
      return (await se.listRefs({
        fs: e,
        gitdir: t,
        filepath: "refs/tags"
      })).filter((n) => !n.endsWith("^{}"));
    }
  }
  function no(i, e) {
    return Ur(Zn(i), Zn(e));
  }
  function Zn(i) {
    return i.mode === "040000" ? i.path + "/" : i.path;
  }
  function Ia(i) {
    switch (i) {
      case "040000":
        return "tree";
      case "100644":
        return "blob";
      case "100755":
        return "blob";
      case "120000":
        return "blob";
      case "160000":
        return "commit";
    }
    throw new ye(`Unexpected GitTree entry mode: ${i}`);
  }
  function ao(i) {
    const e = [];
    let t = 0;
    for (; t < i.length; ) {
      const r = i.indexOf(32, t);
      if (r === -1)
        throw new ye(
          `GitTree: Error parsing buffer at byte location ${t}: Could not find the next space character.`
        );
      const n = i.indexOf(0, t);
      if (n === -1)
        throw new ye(
          `GitTree: Error parsing buffer at byte location ${t}: Could not find the next null character.`
        );
      let a = i.slice(t, r).toString("utf8");
      a === "40000" && (a = "040000");
      const s = Ia(a), o = i.slice(r + 1, n).toString("utf8");
      if (o.includes("\\") || o.includes("/"))
        throw new wr(o);
      const l = i.slice(n + 1, n + 21).toString("hex");
      t = n + 21, e.push({ mode: a, path: o, oid: l, type: s });
    }
    return e;
  }
  function so(i) {
    if (typeof i == "number" && (i = i.toString(8)), i.match(/^0?4.*/)) return "040000";
    if (i.match(/^1006.*/)) return "100644";
    if (i.match(/^1007.*/)) return "100755";
    if (i.match(/^120.*/)) return "120000";
    if (i.match(/^160.*/)) return "160000";
    throw new ye(`Could not understand file mode: ${i}`);
  }
  function oo(i) {
    return !i.oid && i.sha && (i.oid = i.sha), i.mode = so(i.mode), i.type || (i.type = Ia(i.mode)), i;
  }
  class bt {
    constructor(e) {
      if (ne.isBuffer(e))
        this._entries = ao(e);
      else if (Array.isArray(e))
        this._entries = e.map(oo);
      else
        throw new ye("invalid type passed to GitTree constructor");
      this._entries.sort(Ea);
    }
    static from(e) {
      return new bt(e);
    }
    render() {
      return this._entries.map((e) => `${e.mode} ${e.type} ${e.oid}    ${e.path}`).join(`
`);
    }
    toObject() {
      const e = [...this._entries];
      return e.sort(no), ne.concat(
        e.map((t) => {
          const r = ne.from(t.mode.replace(/^0/, "")), n = ne.from(" "), a = ne.from(t.path, "utf8"), s = ne.from([0]), o = ne.from(t.oid, "hex");
          return ne.concat([r, n, a, s, o]);
        })
      );
    }
    /**
     * @returns {TreeEntry[]}
     */
    entries() {
      return this._entries;
    }
    *[Symbol.iterator]() {
      for (const e of this._entries)
        yield e;
    }
  }
  class jr {
    static wrap({ type: e, object: t }) {
      return ne.concat([
        ne.from(`${e} ${t.byteLength.toString()}\0`),
        ne.from(t)
      ]);
    }
    static unwrap(e) {
      const t = e.indexOf(32), r = e.indexOf(0), n = e.slice(0, t).toString("utf8"), a = e.slice(t + 1, r).toString("utf8"), s = e.length - (r + 1);
      if (parseInt(a) !== s)
        throw new ye(
          `Length mismatch: expected ${a} bytes but got ${s} instead.`
        );
      return {
        type: n,
        object: ne.from(e.slice(r + 1))
      };
    }
  }
  async function co({ fs: i, gitdir: e, oid: t }) {
    const r = `objects/${t.slice(0, 2)}/${t.slice(2)}`, n = await i.read(`${e}/${r}`);
    return n ? { object: n, format: "deflated", source: r } : null;
  }
  function lo(i, e) {
    const t = new yt(i), r = Gn(t);
    if (r !== e.byteLength)
      throw new ye(
        `applyDelta expected source buffer to be ${r} bytes but the provided buffer was ${e.length} bytes`
      );
    const n = Gn(t);
    let a;
    const s = Xn(t, e);
    if (s.byteLength === n)
      a = s;
    else {
      a = ne.alloc(n);
      const o = new yt(a);
      for (o.copy(s); !t.eof(); )
        o.copy(Xn(t, e));
      const l = o.tell();
      if (n !== l)
        throw new ye(
          `applyDelta expected target buffer to be ${n} bytes but the resulting buffer was ${l} bytes`
        );
    }
    return a;
  }
  function Gn(i) {
    let e = 0, t = 0, r = null;
    do
      r = i.readUInt8(), e |= (r & 127) << t, t += 7;
    while (r & 128);
    return e;
  }
  function Vn(i, e, t) {
    let r = 0, n = 0;
    for (; t--; )
      e & 1 && (r |= i.readUInt8() << n), e >>= 1, n += 8;
    return r;
  }
  function Xn(i, e) {
    const t = i.readUInt8(), r = 128, n = 15, a = 112;
    if (t & r) {
      const s = Vn(i, t & n, 4);
      let o = Vn(i, (t & a) >> 4, 3);
      return o === 0 && (o = 65536), e.slice(s, s + o);
    } else
      return i.slice(t);
  }
  function uo(i) {
    let e = [i];
    return {
      next() {
        return Promise.resolve({ done: e.length === 0, value: e.pop() });
      },
      return() {
        return e = [], {};
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }
  function Ta(i) {
    return i[Symbol.asyncIterator] ? i[Symbol.asyncIterator]() : i[Symbol.iterator] ? i[Symbol.iterator]() : i.next ? i : uo(i);
  }
  class $a {
    constructor(e) {
      if (typeof ne > "u")
        throw new Error("Missing Buffer dependency");
      this.stream = Ta(e), this.buffer = null, this.cursor = 0, this.undoCursor = 0, this.started = !1, this._ended = !1, this._discardedBytes = 0;
    }
    eof() {
      return this._ended && this.cursor === this.buffer.length;
    }
    tell() {
      return this._discardedBytes + this.cursor;
    }
    async byte() {
      if (!this.eof() && (this.started || await this._init(), !(this.cursor === this.buffer.length && (await this._loadnext(), this._ended))))
        return this._moveCursor(1), this.buffer[this.undoCursor];
    }
    async chunk() {
      if (!this.eof() && (this.started || await this._init(), !(this.cursor === this.buffer.length && (await this._loadnext(), this._ended))))
        return this._moveCursor(this.buffer.length), this.buffer.slice(this.undoCursor, this.cursor);
    }
    async read(e) {
      if (!this.eof())
        return this.started || await this._init(), this.cursor + e > this.buffer.length && (this._trim(), await this._accumulate(e)), this._moveCursor(e), this.buffer.slice(this.undoCursor, this.cursor);
    }
    async skip(e) {
      this.eof() || (this.started || await this._init(), this.cursor + e > this.buffer.length && (this._trim(), await this._accumulate(e)), this._moveCursor(e));
    }
    async undo() {
      this.cursor = this.undoCursor;
    }
    async _next() {
      this.started = !0;
      let { done: e, value: t } = await this.stream.next();
      return e && (this._ended = !0, !t) ? ne.alloc(0) : (t && (t = ne.from(t)), t);
    }
    _trim() {
      this.buffer = this.buffer.slice(this.undoCursor), this.cursor -= this.undoCursor, this._discardedBytes += this.undoCursor, this.undoCursor = 0;
    }
    _moveCursor(e) {
      this.undoCursor = this.cursor, this.cursor += e, this.cursor > this.buffer.length && (this.cursor = this.buffer.length);
    }
    async _accumulate(e) {
      if (this._ended) return;
      const t = [this.buffer];
      for (; this.cursor + e > fo(t); ) {
        const r = await this._next();
        if (this._ended) break;
        t.push(r);
      }
      this.buffer = ne.concat(t);
    }
    async _loadnext() {
      this._discardedBytes += this.buffer.length, this.undoCursor = 0, this.cursor = 0, this.buffer = await this._next();
    }
    async _init() {
      this.buffer = await this._next();
    }
  }
  function fo(i) {
    return i.reduce((e, t) => e + t.length, 0);
  }
  async function ho(i, e) {
    const t = new $a(i);
    let r = await t.read(4);
    if (r = r.toString("utf8"), r !== "PACK")
      throw new ye(`Invalid PACK header '${r}'`);
    let n = await t.read(4);
    if (n = n.readUInt32BE(0), n !== 2)
      throw new ye(`Invalid packfile version: ${n}`);
    let a = await t.read(4);
    if (a = a.readUInt32BE(0), !(a < 1))
      for (; !t.eof() && a--; ) {
        const s = t.tell(), { type: o, length: l, ofs: d, reference: f } = await wo(t), w = new Qi.Inflate();
        for (; !w.result; ) {
          const m = await t.chunk();
          if (!m) break;
          if (w.push(m, !1), w.err)
            throw new ye(`Pako error: ${w.msg}`);
          if (w.result) {
            if (w.result.length !== l)
              throw new ye(
                "Inflated object size is different from that stated in packfile."
              );
            await t.undo(), await t.read(m.length - w.strm.avail_in);
            const y = t.tell();
            await e({
              data: w.result,
              type: o,
              num: a,
              offset: s,
              end: y,
              reference: f,
              ofs: d
            });
          }
        }
      }
  }
  async function wo(i) {
    let e = await i.byte();
    const t = e >> 4 & 7;
    let r = e & 15;
    if (e & 128) {
      let s = 4;
      do
        e = await i.byte(), r |= (e & 127) << s, s += 7;
      while (e & 128);
    }
    let n, a;
    if (t === 6) {
      let s = 0;
      n = 0;
      const o = [];
      do
        e = await i.byte(), n |= (e & 127) << s, s += 7, o.push(e);
      while (e & 128);
      a = ne.from(o);
    }
    return t === 7 && (a = await i.read(20)), { type: t, length: r, ofs: n, reference: a };
  }
  async function Aa(i) {
    return Qi.inflate(i);
  }
  function po(i) {
    const e = [];
    let t = 0, r = 0;
    do {
      t = i.readUInt8();
      const n = t & 127;
      e.push(n), r = t & 128;
    } while (r);
    return e.reduce((n, a) => n + 1 << 7 | a, -1);
  }
  function mo(i, e) {
    let t = e, r = 4, n = null;
    do
      n = i.readUInt8(), t |= (n & 127) << r, r += 7;
    while (n & 128);
    return t;
  }
  class or {
    constructor(e) {
      Object.assign(this, e), this.offsetCache = {};
    }
    static async fromIdx({ idx: e, getExternalRefDelta: t }) {
      const r = new yt(e);
      if (r.slice(4).toString("hex") !== "ff744f63")
        return;
      const a = r.readUInt32BE();
      if (a !== 2)
        throw new ye(
          `Unable to read version ${a} packfile IDX. (Only version 2 supported)`
        );
      if (e.byteLength > 2048 * 1024 * 1024)
        throw new ye(
          "To keep implementation simple, I haven't implemented the layer 5 feature needed to support packfiles > 2GB in size."
        );
      r.seek(r.tell() + 4 * 255);
      const s = r.readUInt32BE(), o = [];
      for (let f = 0; f < s; f++) {
        const w = r.slice(20).toString("hex");
        o[f] = w;
      }
      r.seek(r.tell() + 4 * s);
      const l = /* @__PURE__ */ new Map();
      for (let f = 0; f < s; f++)
        l.set(o[f], r.readUInt32BE());
      const d = r.slice(20).toString("hex");
      return new or({
        hashes: o,
        crcs: {},
        offsets: l,
        packfileSha: d,
        getExternalRefDelta: t
      });
    }
    static async fromPack({ pack: e, getExternalRefDelta: t, onProgress: r }) {
      const n = {
        1: "commit",
        2: "tree",
        3: "blob",
        4: "tag",
        6: "ofs-delta",
        7: "ref-delta"
      }, a = {}, s = e.slice(-20).toString("hex"), o = [], l = {}, d = /* @__PURE__ */ new Map();
      let f = null, w = null;
      await ho([e], async ({ data: E, type: R, reference: T, offset: S, num: N }) => {
        f === null && (f = N);
        const D = Math.floor(
          (f - N) * 100 / f
        );
        D !== w && r && await r({
          phase: "Receiving objects",
          loaded: f - N,
          total: f
        }), w = D, R = n[R], ["commit", "tree", "blob", "tag"].includes(R) ? a[S] = {
          type: R,
          offset: S
        } : R === "ofs-delta" ? a[S] = {
          type: R,
          offset: S
        } : R === "ref-delta" && (a[S] = {
          type: R,
          offset: S
        });
      });
      const m = Object.keys(a).map(Number);
      for (const [E, R] of m.entries()) {
        const T = E + 1 === m.length ? e.byteLength - 20 : m[E + 1], S = a[R], N = ws.buf(e.slice(R, T)) >>> 0;
        S.end = T, S.crc = N;
      }
      const y = new or({
        pack: Promise.resolve(e),
        packfileSha: s,
        crcs: l,
        hashes: o,
        offsets: d,
        getExternalRefDelta: t
      });
      w = null;
      let k = 0;
      const x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let E in a) {
        E = Number(E);
        const R = Math.floor(k * 100 / f);
        R !== w && r && await r({
          phase: "Resolving deltas",
          loaded: k,
          total: f
        }), k++, w = R;
        const T = a[E];
        if (!T.oid)
          try {
            y.readDepth = 0, y.externalReadDepth = 0;
            const { type: S, object: N } = await y.readSlice({ start: E });
            x[y.readDepth] += 1;
            const D = await Lt(jr.wrap({ type: S, object: N }));
            T.oid = D, o.push(D), d.set(D, E), l[D] = T.crc;
          } catch {
            continue;
          }
      }
      return o.sort(), y;
    }
    async toBuffer() {
      const e = [], t = (d, f) => {
        e.push(ne.from(d, f));
      };
      t("ff744f63", "hex"), t("00000002", "hex");
      const r = new yt(ne.alloc(256 * 4));
      for (let d = 0; d < 256; d++) {
        let f = 0;
        for (const w of this.hashes)
          parseInt(w.slice(0, 2), 16) <= d && f++;
        r.writeUInt32BE(f);
      }
      e.push(r.buffer);
      for (const d of this.hashes)
        t(d, "hex");
      const n = new yt(ne.alloc(this.hashes.length * 4));
      for (const d of this.hashes)
        n.writeUInt32BE(this.crcs[d]);
      e.push(n.buffer);
      const a = new yt(ne.alloc(this.hashes.length * 4));
      for (const d of this.hashes)
        a.writeUInt32BE(this.offsets.get(d));
      e.push(a.buffer), t(this.packfileSha, "hex");
      const s = ne.concat(e), o = await Lt(s), l = ne.alloc(20);
      return l.write(o, "hex"), ne.concat([s, l]);
    }
    async load({ pack: e }) {
      this.pack = e;
    }
    async unload() {
      this.pack = null;
    }
    async read({ oid: e }) {
      if (!this.offsets.get(e)) {
        if (this.getExternalRefDelta)
          return this.externalReadDepth++, this.getExternalRefDelta(e);
        throw new ye(`Could not read object ${e} from packfile`);
      }
      const t = this.offsets.get(e);
      return this.readSlice({ start: t });
    }
    async readSlice({ start: e }) {
      if (this.offsetCache[e])
        return Object.assign({}, this.offsetCache[e]);
      this.readDepth++;
      const t = {
        16: "commit",
        32: "tree",
        48: "blob",
        64: "tag",
        96: "ofs_delta",
        112: "ref_delta"
      };
      if (!this.pack)
        throw new ye(
          "Tried to read from a GitPackIndex with no packfile loaded into memory"
        );
      const r = (await this.pack).slice(e), n = new yt(r), a = n.readUInt8(), s = a & 112;
      let o = t[s];
      if (o === void 0)
        throw new ye("Unrecognized type: 0b" + s.toString(2));
      const l = a & 15;
      let d = l;
      a & 128 && (d = mo(n, l));
      let w = null, m = null;
      if (o === "ofs_delta") {
        const k = po(n), x = e - k;
        ({ object: w, type: o } = await this.readSlice({ start: x }));
      }
      if (o === "ref_delta") {
        const k = n.slice(20).toString("hex");
        ({ object: w, type: o } = await this.read({ oid: k }));
      }
      const y = r.slice(n.tell());
      if (m = ne.from(await Aa(y)), m.byteLength !== d)
        throw new ye(
          `Packfile told us object would have length ${d} but it had length ${m.byteLength}`
        );
      return w && (m = ne.from(lo(m, w))), this.readDepth > 3 && (this.offsetCache[e] = { type: o, object: m }), { type: o, format: "content", object: m };
    }
  }
  const kr = Symbol("PackfileCache");
  async function _o({
    fs: i,
    filename: e,
    getExternalRefDelta: t,
    emitter: r,
    emitterPrefix: n
  }) {
    const a = await i.read(e);
    return or.fromIdx({ idx: a, getExternalRefDelta: t });
  }
  function Ra({
    fs: i,
    cache: e,
    filename: t,
    getExternalRefDelta: r,
    emitter: n,
    emitterPrefix: a
  }) {
    e[kr] || (e[kr] = /* @__PURE__ */ new Map());
    let s = e[kr].get(t);
    return s || (s = _o({
      fs: i,
      filename: t,
      getExternalRefDelta: r,
      emitter: n,
      emitterPrefix: a
    }), e[kr].set(t, s)), s;
  }
  async function go({
    fs: i,
    cache: e,
    gitdir: t,
    oid: r,
    format: n = "content",
    getExternalRefDelta: a
  }) {
    let s = await i.readdir($e.join(t, "objects/pack"));
    s = s.filter((o) => o.endsWith(".idx"));
    for (const o of s) {
      const l = `${t}/objects/pack/${o}`, d = await Ra({
        fs: i,
        cache: e,
        filename: l,
        getExternalRefDelta: a
      });
      if (d.error) throw new ye(d.error);
      if (d.offsets.has(r)) {
        if (!d.pack) {
          const w = l.replace(/idx$/, "pack");
          d.pack = i.read(w);
        }
        const f = await d.read({ oid: r, getExternalRefDelta: a });
        return f.format = "content", f.source = `objects/pack/${o.replace(/idx$/, "pack")}`, f;
      }
    }
    return null;
  }
  async function Ye({
    fs: i,
    cache: e,
    gitdir: t,
    oid: r,
    format: n = "content"
  }) {
    const a = (f) => Ye({ fs: i, cache: e, gitdir: t, oid: f });
    let s;
    if (r === "4b825dc642cb6eb9a060e54bf8d69288fbee4904" && (s = { format: "wrapped", object: ne.from("tree 0\0") }), s || (s = await co({ fs: i, gitdir: t, oid: r })), !s) {
      if (s = await go({
        fs: i,
        cache: e,
        gitdir: t,
        oid: r,
        getExternalRefDelta: a
      }), !s)
        throw new et(r);
      return s;
    }
    if (n === "deflated" || (s.format === "deflated" && (s.object = ne.from(await Aa(s.object)), s.format = "wrapped"), n === "wrapped"))
      return s;
    const o = await Lt(s.object);
    if (o !== r)
      throw new ye(
        `SHA check failed! Expected ${r}, computed ${o}`
      );
    const { object: l, type: d } = jr.unwrap(s.object);
    if (s.type = d, s.object = l, s.format = "content", n === "content")
      return s;
    throw new ye(`invalid requested format "${n}"`);
  }
  class Hr extends xe {
    /**
     * @param {'note'|'remote'|'tag'|'branch'} noun
     * @param {string} where
     * @param {boolean} canForce
     */
    constructor(e, t, r = !0) {
      super(
        `Failed to create ${e} at ${t} because it already exists.${r ? ` (Hint: use 'force: true' parameter to overwrite existing ${e}.)` : ""}`
      ), this.code = this.name = Hr.code, this.data = { noun: e, where: t, canForce: r };
    }
  }
  Hr.code = "AlreadyExistsError";
  class rn extends xe {
    /**
     * @param {'oids'|'refs'} nouns
     * @param {string} short
     * @param {string[]} matches
     */
    constructor(e, t, r) {
      super(
        `Found multiple ${e} matching "${t}" (${r.join(
          ", "
        )}). Use a longer abbreviation length to disambiguate them.`
      ), this.code = this.name = rn.code, this.data = { nouns: e, short: t, matches: r };
    }
  }
  rn.code = "AmbiguousError";
  class qr extends xe {
    /**
     * @param {string[]} filepaths
     */
    constructor(e) {
      super(
        `Your local changes to the following files would be overwritten by checkout: ${e.join(
          ", "
        )}`
      ), this.code = this.name = qr.code, this.data = { filepaths: e };
    }
  }
  qr.code = "CheckoutConflictError";
  class Wr extends xe {
    /**
     * @param {string} ref
     * @param {string} oid
     */
    constructor(e, t) {
      super(
        `Failed to checkout "${e}" because commit ${t} is not available locally. Do a git fetch to make the branch available locally.`
      ), this.code = this.name = Wr.code, this.data = { ref: e, oid: t };
    }
  }
  Wr.code = "CommitNotFetchedError";
  class Zr extends xe {
    constructor() {
      super("Empty response from git server."), this.code = this.name = Zr.code, this.data = {};
    }
  }
  Zr.code = "EmptyServerResponseError";
  class Gr extends xe {
    constructor() {
      super("A simple fast-forward merge was not possible."), this.code = this.name = Gr.code, this.data = {};
    }
  }
  Gr.code = "FastForwardError";
  class Vr extends xe {
    /**
     * @param {string} prettyDetails
     * @param {PushResult} result
     */
    constructor(e, t) {
      super(`One or more branches were not updated: ${e}`), this.code = this.name = Vr.code, this.data = { prettyDetails: e, result: t };
    }
  }
  Vr.code = "GitPushError";
  class cr extends xe {
    /**
     * @param {number} statusCode
     * @param {string} statusMessage
     * @param {string} response
     */
    constructor(e, t, r) {
      super(`HTTP Error: ${e} ${t}`), this.code = this.name = cr.code, this.data = { statusCode: e, statusMessage: t, response: r };
    }
  }
  cr.code = "HttpError";
  class lr extends xe {
    /**
     * @param {'leading-slash'|'trailing-slash'|'directory'} [reason]
     */
    constructor(e) {
      let t = "invalid filepath";
      e === "leading-slash" || e === "trailing-slash" ? t = '"filepath" parameter should not include leading or trailing directory separators because these can cause problems on some platforms.' : e === "directory" && (t = '"filepath" should not be a directory.'), super(t), this.code = this.name = lr.code, this.data = { reason: e };
    }
  }
  lr.code = "InvalidFilepathError";
  class Xr extends xe {
    /**
     * @param {string} ref
     * @param {string} suggestion
     * @param {boolean} canForce
     */
    constructor(e, t) {
      super(
        `"${e}" would be an invalid git reference. (Hint: a valid alternative would be "${t}".)`
      ), this.code = this.name = Xr.code, this.data = { ref: e, suggestion: t };
    }
  }
  Xr.code = "InvalidRefNameError";
  class Yr extends xe {
    /**
     * @param {number} depth
     */
    constructor(e) {
      super(`Maximum search depth of ${e} exceeded.`), this.code = this.name = Yr.code, this.data = { depth: e };
    }
  }
  Yr.code = "MaxDepthError";
  class pr extends xe {
    constructor() {
      super("Merges with conflicts are not supported yet."), this.code = this.name = pr.code, this.data = {};
    }
  }
  pr.code = "MergeNotSupportedError";
  class mr extends xe {
    /**
     * @param {Array<string>} filepaths
     * @param {Array<string>} bothModified
     * @param {Array<string>} deleteByUs
     * @param {Array<string>} deleteByTheirs
     */
    constructor(e, t, r, n) {
      super(
        `Automatic merge failed with one or more merge conflicts in the following files: ${e.toString()}. Fix conflicts then commit the result.`
      ), this.code = this.name = mr.code, this.data = { filepaths: e, bothModified: t, deleteByUs: r, deleteByTheirs: n };
    }
  }
  mr.code = "MergeConflictError";
  class Ht extends xe {
    /**
     * @param {'author'|'committer'|'tagger'} role
     */
    constructor(e) {
      super(
        `No name was provided for ${e} in the argument or in the .git/config file.`
      ), this.code = this.name = Ht.code, this.data = { role: e };
    }
  }
  Ht.code = "MissingNameError";
  class lt extends xe {
    /**
     * @param {string} parameter
     */
    constructor(e) {
      super(
        `The function requires a "${e}" parameter but none was provided.`
      ), this.code = this.name = lt.code, this.data = { parameter: e };
    }
  }
  lt.code = "MissingParameterError";
  class nn extends xe {
    /**
     * @param {Error[]} errors
     * @param {string} message
     */
    constructor(e) {
      super(
        'There are multiple errors that were thrown by the method. Please refer to the "errors" property to see more'
      ), this.code = this.name = nn.code, this.data = { errors: e }, this.errors = e;
    }
  }
  nn.code = "MultipleGitError";
  class Kt extends xe {
    /**
     * @param {string} expected
     * @param {string} actual
     */
    constructor(e, t) {
      super(`Expected "${e}" but received "${t}".`), this.code = this.name = Kt.code, this.data = { expected: e, actual: t };
    }
  }
  Kt.code = "ParseError";
  class ur extends xe {
    /**
     * @param {'not-fast-forward'|'tag-exists'} reason
     */
    constructor(e) {
      let t = "";
      e === "not-fast-forward" ? t = " because it was not a simple fast-forward" : e === "tag-exists" && (t = " because tag already exists"), super(`Push rejected${t}. Use "force: true" to override.`), this.code = this.name = ur.code, this.data = { reason: e };
    }
  }
  ur.code = "PushRejectedError";
  class Ut extends xe {
    /**
     * @param {'shallow'|'deepen-since'|'deepen-not'|'deepen-relative'} capability
     * @param {'depth'|'since'|'exclude'|'relative'} parameter
     */
    constructor(e, t) {
      super(
        `Remote does not support the "${e}" so the "${t}" parameter cannot be used.`
      ), this.code = this.name = Ut.code, this.data = { capability: e, parameter: t };
    }
  }
  Ut.code = "RemoteCapabilityError";
  class Kr extends xe {
    /**
     * @param {string} preview
     * @param {string} response
     */
    constructor(e, t) {
      super(
        `Remote did not reply using the "smart" HTTP protocol. Expected "001e# service=git-upload-pack" but received: ${e}`
      ), this.code = this.name = Kr.code, this.data = { preview: e, response: t };
    }
  }
  Kr.code = "SmartHttpError";
  class Jr extends xe {
    /**
     * @param {string} url
     * @param {string} transport
     * @param {string} [suggestion]
     */
    constructor(e, t, r) {
      super(
        `Git remote "${e}" uses an unrecognized transport protocol: "${t}"`
      ), this.code = this.name = Jr.code, this.data = { url: e, transport: t, suggestion: r };
    }
  }
  Jr.code = "UnknownTransportError";
  class Qr extends xe {
    /**
     * @param {string} url
     */
    constructor(e) {
      super(`Cannot parse remote URL: "${e}"`), this.code = this.name = Qr.code, this.data = { url: e };
    }
  }
  Qr.code = "UrlParseError";
  class _r extends xe {
    constructor() {
      super("The operation was canceled."), this.code = this.name = _r.code, this.data = {};
    }
  }
  _r.code = "UserCanceledError";
  class an extends xe {
    /**
     * @param {Array<string>} filepaths
     */
    constructor(e) {
      super(
        `Could not merge index: Entry for '${e}' is not up to date. Either reset the index entry to HEAD, or stage your unstaged changes.`
      ), this.code = this.name = an.code, this.data = { filepath: e };
    }
  }
  an.code = "IndexResetError";
  class ei extends xe {
    /**
     * @param {string} ref
     */
    constructor(e) {
      super(
        `"${e}" does not point to any commit. You're maybe working on a repository with no commits yet. `
      ), this.code = this.name = ei.code, this.data = { ref: e };
    }
  }
  ei.code = "NoCommitError";
  function Hi({ name: i, email: e, timestamp: t, timezoneOffset: r }) {
    return r = yo(r), `${i} <${e}> ${t} ${r}`;
  }
  function yo(i) {
    const e = vo(bo(i));
    i = Math.abs(i);
    const t = Math.floor(i / 60);
    i -= t * 60;
    let r = String(t), n = String(i);
    return r.length < 2 && (r = "0" + r), n.length < 2 && (n = "0" + n), (e === -1 ? "-" : "+") + r + n;
  }
  function vo(i) {
    return Math.sign(i) || (Object.is(i, -0) ? -1 : 1);
  }
  function bo(i) {
    return i === 0 ? i : -i;
  }
  function xt(i) {
    return i = i.replace(/\r/g, ""), i = i.replace(/^\n+/, ""), i = i.replace(/\n+$/, "") + `
`, i;
  }
  function Or(i) {
    const [, e, t, r, n] = i.match(
      /^(.*) <(.*)> (.*) (.*)$/
    );
    return {
      name: e,
      email: t,
      timestamp: Number(r),
      timezoneOffset: Eo(n)
    };
  }
  function Eo(i) {
    let [, e, t, r] = i.match(/(\+|-)(\d\d)(\d\d)/);
    return r = (e === "+" ? 1 : -1) * (Number(t) * 60 + Number(r)), ko(r);
  }
  function ko(i) {
    return i === 0 ? i : -i;
  }
  class Bt {
    constructor(e) {
      if (typeof e == "string")
        this._tag = e;
      else if (ne.isBuffer(e))
        this._tag = e.toString("utf8");
      else if (typeof e == "object")
        this._tag = Bt.render(e);
      else
        throw new ye(
          "invalid type passed to GitAnnotatedTag constructor"
        );
    }
    static from(e) {
      return new Bt(e);
    }
    static render(e) {
      return `object ${e.object}
type ${e.type}
tag ${e.tag}
tagger ${Hi(e.tagger)}

${e.message}
${e.gpgsig ? e.gpgsig : ""}`;
    }
    justHeaders() {
      return this._tag.slice(0, this._tag.indexOf(`

`));
    }
    message() {
      const e = this.withoutSignature();
      return e.slice(e.indexOf(`

`) + 2);
    }
    parse() {
      return Object.assign(this.headers(), {
        message: this.message(),
        gpgsig: this.gpgsig()
      });
    }
    render() {
      return this._tag;
    }
    headers() {
      const e = this.justHeaders().split(`
`), t = [];
      for (const n of e)
        n[0] === " " ? t[t.length - 1] += `
` + n.slice(1) : t.push(n);
      const r = {};
      for (const n of t) {
        const a = n.slice(0, n.indexOf(" ")), s = n.slice(n.indexOf(" ") + 1);
        Array.isArray(r[a]) ? r[a].push(s) : r[a] = s;
      }
      return r.tagger && (r.tagger = Or(r.tagger)), r.committer && (r.committer = Or(r.committer)), r;
    }
    withoutSignature() {
      const e = xt(this._tag);
      return e.indexOf(`
-----BEGIN PGP SIGNATURE-----`) === -1 ? e : e.slice(0, e.lastIndexOf(`
-----BEGIN PGP SIGNATURE-----`));
    }
    gpgsig() {
      if (this._tag.indexOf(`
-----BEGIN PGP SIGNATURE-----`) === -1) return;
      const e = this._tag.slice(
        this._tag.indexOf("-----BEGIN PGP SIGNATURE-----"),
        this._tag.indexOf("-----END PGP SIGNATURE-----") + 27
      );
      return xt(e);
    }
    payload() {
      return this.withoutSignature() + `
`;
    }
    toObject() {
      return ne.from(this._tag, "utf8");
    }
    static async sign(e, t, r) {
      const n = e.payload();
      let { signature: a } = await t({ payload: n, secretKey: r });
      a = xt(a);
      const s = n + a;
      return Bt.from(s);
    }
  }
  function Ri(i) {
    return i.trim().split(`
`).map((e) => " " + e).join(`
`) + `
`;
  }
  function xo(i) {
    return i.split(`
`).map((e) => e.replace(/^ /, "")).join(`
`);
  }
  class Pe {
    constructor(e) {
      if (typeof e == "string")
        this._commit = e;
      else if (ne.isBuffer(e))
        this._commit = e.toString("utf8");
      else if (typeof e == "object")
        this._commit = Pe.render(e);
      else
        throw new ye("invalid type passed to GitCommit constructor");
    }
    static fromPayloadSignature({ payload: e, signature: t }) {
      const r = Pe.justHeaders(e), n = Pe.justMessage(e), a = xt(
        r + `
gpgsig` + Ri(t) + `
` + n
      );
      return new Pe(a);
    }
    static from(e) {
      return new Pe(e);
    }
    toObject() {
      return ne.from(this._commit, "utf8");
    }
    // Todo: allow setting the headers and message
    headers() {
      return this.parseHeaders();
    }
    // Todo: allow setting the headers and message
    message() {
      return Pe.justMessage(this._commit);
    }
    parse() {
      return Object.assign({ message: this.message() }, this.headers());
    }
    static justMessage(e) {
      return xt(e.slice(e.indexOf(`

`) + 2));
    }
    static justHeaders(e) {
      return e.slice(0, e.indexOf(`

`));
    }
    parseHeaders() {
      const e = Pe.justHeaders(this._commit).split(`
`), t = [];
      for (const n of e)
        n[0] === " " ? t[t.length - 1] += `
` + n.slice(1) : t.push(n);
      const r = {
        parent: []
      };
      for (const n of t) {
        const a = n.slice(0, n.indexOf(" ")), s = n.slice(n.indexOf(" ") + 1);
        Array.isArray(r[a]) ? r[a].push(s) : r[a] = s;
      }
      return r.author && (r.author = Or(r.author)), r.committer && (r.committer = Or(r.committer)), r;
    }
    static renderHeaders(e) {
      let t = "";
      if (e.tree ? t += `tree ${e.tree}
` : t += `tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
`, e.parent) {
        if (e.parent.length === void 0)
          throw new ye("commit 'parent' property should be an array");
        for (const a of e.parent)
          t += `parent ${a}
`;
      }
      const r = e.author;
      t += `author ${Hi(r)}
`;
      const n = e.committer || e.author;
      return t += `committer ${Hi(n)}
`, e.gpgsig && (t += "gpgsig" + Ri(e.gpgsig)), t;
    }
    static render(e) {
      return Pe.renderHeaders(e) + `
` + xt(e.message);
    }
    render() {
      return this._commit;
    }
    withoutSignature() {
      const e = xt(this._commit);
      if (e.indexOf(`
gpgsig`) === -1) return e;
      const t = e.slice(0, e.indexOf(`
gpgsig`)), r = e.slice(
        e.indexOf(`-----END PGP SIGNATURE-----
`) + 28
      );
      return xt(t + `
` + r);
    }
    isolateSignature() {
      const e = this._commit.slice(
        this._commit.indexOf("-----BEGIN PGP SIGNATURE-----"),
        this._commit.indexOf("-----END PGP SIGNATURE-----") + 27
      );
      return xo(e);
    }
    static async sign(e, t, r) {
      const n = e.withoutSignature(), a = Pe.justMessage(e._commit);
      let { signature: s } = await t({ payload: n, secretKey: r });
      s = xt(s);
      const l = Pe.justHeaders(e._commit) + `
gpgsig` + Ri(s) + `
` + a;
      return Pe.from(l);
    }
  }
  async function fr({ fs: i, cache: e, gitdir: t, oid: r }) {
    if (r === "4b825dc642cb6eb9a060e54bf8d69288fbee4904")
      return { tree: bt.from([]), oid: r };
    const { type: n, object: a } = await Ye({ fs: i, cache: e, gitdir: t, oid: r });
    if (n === "tag")
      return r = Bt.from(a).parse().object, fr({ fs: i, cache: e, gitdir: t, oid: r });
    if (n === "commit")
      return r = Pe.from(a).parse().tree, fr({ fs: i, cache: e, gitdir: t, oid: r });
    if (n !== "tree")
      throw new $t(r, n, "tree");
    return { tree: bt.from(a), oid: r };
  }
  class So {
    constructor({ fs: e, gitdir: t, ref: r, cache: n }) {
      this.fs = e, this.cache = n, this.gitdir = t, this.mapPromise = (async () => {
        const s = /* @__PURE__ */ new Map();
        let o;
        try {
          o = await se.resolve({ fs: e, gitdir: t, ref: r });
        } catch (d) {
          d instanceof et && (o = "4b825dc642cb6eb9a060e54bf8d69288fbee4904");
        }
        const l = await fr({ fs: e, cache: this.cache, gitdir: t, oid: o });
        return l.type = "tree", l.mode = "40000", s.set(".", l), s;
      })();
      const a = this;
      this.ConstructEntry = class {
        constructor(o) {
          this._fullpath = o, this._type = !1, this._mode = !1, this._stat = !1, this._content = !1, this._oid = !1;
        }
        async type() {
          return a.type(this);
        }
        async mode() {
          return a.mode(this);
        }
        async stat() {
          return a.stat(this);
        }
        async content() {
          return a.content(this);
        }
        async oid() {
          return a.oid(this);
        }
      };
    }
    async readdir(e) {
      const t = e._fullpath, { fs: r, cache: n, gitdir: a } = this, s = await this.mapPromise, o = s.get(t);
      if (!o) throw new Error(`No obj for ${t}`);
      const l = o.oid;
      if (!l) throw new Error(`No oid for obj ${JSON.stringify(o)}`);
      if (o.type !== "tree")
        return null;
      const { type: d, object: f } = await Ye({ fs: r, cache: n, gitdir: a, oid: l });
      if (d !== o.type)
        throw new $t(l, d, o.type);
      const w = bt.from(f);
      for (const m of w)
        s.set($e.join(t, m.path), m);
      return w.entries().map((m) => $e.join(t, m.path));
    }
    async type(e) {
      if (e._type === !1) {
        const t = await this.mapPromise, { type: r } = t.get(e._fullpath);
        e._type = r;
      }
      return e._type;
    }
    async mode(e) {
      if (e._mode === !1) {
        const t = await this.mapPromise, { mode: r } = t.get(e._fullpath);
        e._mode = ka(parseInt(r, 8));
      }
      return e._mode;
    }
    async stat(e) {
    }
    async content(e) {
      if (e._content === !1) {
        const t = await this.mapPromise, { fs: r, cache: n, gitdir: a } = this, o = t.get(e._fullpath).oid, { type: l, object: d } = await Ye({ fs: r, cache: n, gitdir: a, oid: o });
        l !== "blob" ? e._content = void 0 : e._content = new Uint8Array(d);
      }
      return e._content;
    }
    async oid(e) {
      if (e._oid === !1) {
        const r = (await this.mapPromise).get(e._fullpath);
        e._oid = r.oid;
      }
      return e._oid;
    }
  }
  function sr({ ref: i = "HEAD" } = {}) {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.defineProperty(e, zr, {
      value: function({ fs: t, gitdir: r, cache: n }) {
        return new So({ fs: t, gitdir: r, ref: i, cache: n });
      }
    }), Object.freeze(e), e;
  }
  class Io {
    constructor({ fs: e, dir: t, gitdir: r, cache: n }) {
      this.fs = e, this.cache = n, this.dir = t, this.gitdir = r, this.config = null;
      const a = this;
      this.ConstructEntry = class {
        constructor(o) {
          this._fullpath = o, this._type = !1, this._mode = !1, this._stat = !1, this._content = !1, this._oid = !1;
        }
        async type() {
          return a.type(this);
        }
        async mode() {
          return a.mode(this);
        }
        async stat() {
          return a.stat(this);
        }
        async content() {
          return a.content(this);
        }
        async oid() {
          return a.oid(this);
        }
      };
    }
    async readdir(e) {
      const t = e._fullpath, { fs: r, dir: n } = this, a = await r.readdir($e.join(n, t));
      return a === null ? null : a.map((s) => $e.join(t, s));
    }
    async type(e) {
      return e._type === !1 && await e.stat(), e._type;
    }
    async mode(e) {
      return e._mode === !1 && await e.stat(), e._mode;
    }
    async stat(e) {
      if (e._stat === !1) {
        const { fs: t, dir: r } = this;
        let n = await t.lstat(`${r}/${e._fullpath}`);
        if (!n)
          throw new Error(
            `ENOENT: no such file or directory, lstat '${e._fullpath}'`
          );
        let a = n.isDirectory() ? "tree" : "blob";
        a === "blob" && !n.isFile() && !n.isSymbolicLink() && (a = "special"), e._type = a, n = Yt(n), e._mode = n.mode, n.size === -1 && e._actualSize && (n.size = e._actualSize), e._stat = n;
      }
      return e._stat;
    }
    async content(e) {
      if (e._content === !1) {
        const { fs: t, dir: r, gitdir: n } = this;
        if (await e.type() === "tree")
          e._content = void 0;
        else {
          const s = await (await this._getGitConfig(t, n)).get("core.autocrlf"), o = await t.read(`${r}/${e._fullpath}`, { autocrlf: s });
          e._actualSize = o.length, e._stat && e._stat.size === -1 && (e._stat.size = e._actualSize), e._content = new Uint8Array(o);
        }
      }
      return e._content;
    }
    async oid(e) {
      if (e._oid === !1) {
        const t = this, { fs: r, gitdir: n, cache: a } = this;
        let s;
        await zt.acquire({ fs: r, gitdir: n, cache: a }, async function(o) {
          const l = o.entriesMap.get(e._fullpath), d = await e.stat(), w = await (await t._getGitConfig(r, n)).get("core.filemode"), m = typeof Qe < "u" ? Qe.platform !== "win32" : !0;
          if (!l || zi(d, l, w, m)) {
            const y = await e.content();
            y === void 0 ? s = void 0 : (s = await Lt(
              jr.wrap({ type: "blob", object: y })
            ), l && s === l.oid && (!w || d.mode === l.mode) && zi(d, l, w, m) && o.insert({
              filepath: e._fullpath,
              stats: d,
              oid: s
            }));
          } else
            s = l.oid;
        }), e._oid = s;
      }
      return e._oid;
    }
    async _getGitConfig(e, t) {
      return this.config ? this.config : (this.config = await ut.get({ fs: e, gitdir: t }), this.config);
    }
  }
  function To() {
    const i = /* @__PURE__ */ Object.create(null);
    return Object.defineProperty(i, zr, {
      value: function({ fs: e, dir: t, gitdir: r, cache: n }) {
        return new Io({ fs: e, dir: t, gitdir: r, cache: n });
      }
    }), Object.freeze(i), i;
  }
  function $o(i, e) {
    const t = e - i;
    return Array.from({ length: t }, (r, n) => i + n);
  }
  const Ba = typeof Array.prototype.flat > "u" ? (i) => i.reduce((e, t) => e.concat(t), []) : (i) => i.flat();
  class Ao {
    constructor() {
      this.value = null;
    }
    consider(e) {
      e != null && (this.value === null ? this.value = e : e < this.value && (this.value = e));
    }
    reset() {
      this.value = null;
    }
  }
  function* Ro(i) {
    const e = new Ao();
    let t;
    const r = [], n = i.length;
    for (let a = 0; a < n; a++)
      r[a] = i[a].next().value, r[a] !== void 0 && e.consider(r[a]);
    if (e.value !== null)
      for (; ; ) {
        const a = [];
        t = e.value, e.reset();
        for (let s = 0; s < n; s++)
          r[s] !== void 0 && r[s] === t ? (a[s] = r[s], r[s] = i[s].next().value) : a[s] = null, r[s] !== void 0 && e.consider(r[s]);
        if (yield a, e.value === null) return;
      }
  }
  async function qi({
    fs: i,
    cache: e,
    dir: t,
    gitdir: r,
    trees: n,
    // @ts-ignore
    map: a = async (l, d) => d,
    // The default reducer is a flatmap that filters out undefineds.
    reduce: s = async (l, d) => {
      const f = Ba(d);
      return l !== void 0 && f.unshift(l), f;
    },
    // The default iterate function walks all children concurrently
    iterate: o = (l, d) => Promise.all([...d].map(l))
  }) {
    const l = n.map(
      (y) => y[zr]({ fs: i, dir: t, gitdir: r, cache: e })
    ), d = new Array(l.length).fill("."), f = $o(0, l.length), w = async (y) => {
      f.map((E) => {
        const R = y[E];
        y[E] = R && new l[E].ConstructEntry(R);
      });
      const x = (await Promise.all(
        f.map((E) => {
          const R = y[E];
          return R ? l[E].readdir(R) : [];
        })
      )).map((E) => (E === null ? [] : E)[Symbol.iterator]());
      return {
        entries: y,
        children: Ro(x)
      };
    }, m = async (y) => {
      const { entries: k, children: x } = await w(y), E = k.find((T) => T && T._fullpath)._fullpath, R = await a(E, k);
      if (R !== null) {
        let T = await o(m, x);
        return T = T.filter((S) => S !== void 0), s(R, T);
      }
    };
    return m(d);
  }
  async function Wi(i, e) {
    const t = await i.readdir(e);
    t == null ? await i.rm(e) : t.length ? await Promise.all(
      t.map((r) => {
        const n = $e.join(e, r);
        return i.lstat(n).then((a) => {
          if (a)
            return a.isDirectory() ? Wi(i, n) : i.rm(n);
        });
      })
    ).then(() => i.rmdir(e)) : await i.rmdir(e);
  }
  function Bo(i) {
    return Oo(i) && Yn(i.then) && Yn(i.catch);
  }
  function Oo(i) {
    return i && typeof i == "object";
  }
  function Yn(i) {
    return typeof i == "function";
  }
  function Kn(i) {
    return Bo(((t) => {
      try {
        return t.readFile().catch((r) => r);
      } catch (r) {
        return r;
      }
    })(i));
  }
  const Jn = [
    "readFile",
    "writeFile",
    "mkdir",
    "rmdir",
    "unlink",
    "stat",
    "lstat",
    "readdir",
    "readlink",
    "symlink"
  ];
  function Qn(i, e) {
    if (Kn(e))
      for (const t of Jn)
        i[`_${t}`] = e[t].bind(e);
    else
      for (const t of Jn)
        i[`_${t}`] = bi(e[t].bind(e));
    Kn(e) ? e.rm ? i._rm = e.rm.bind(e) : e.rmdir.length > 1 ? i._rm = e.rmdir.bind(e) : i._rm = Wi.bind(null, i) : e.rm ? i._rm = bi(e.rm.bind(e)) : e.rmdir.length > 2 ? i._rm = bi(e.rmdir.bind(e)) : i._rm = Wi.bind(null, i);
  }
  class Wt {
    constructor(e) {
      if (typeof e._original_unwrapped_fs < "u") return e;
      const t = Object.getOwnPropertyDescriptor(e, "promises");
      t && t.enumerable ? Qn(this, e.promises) : Qn(this, e), this._original_unwrapped_fs = e;
    }
    /**
     * Return true if a file exists, false if it doesn't exist.
     * Rethrows errors that aren't related to file existence.
     */
    async exists(e, t = {}) {
      try {
        return await this._stat(e), !0;
      } catch (r) {
        if (r.code === "ENOENT" || r.code === "ENOTDIR" || (r.code || "").includes("ENS"))
          return !1;
        throw console.log('Unhandled error in "FileSystem.exists()" function', r), r;
      }
    }
    /**
     * Return the contents of a file if it exists, otherwise returns null.
     *
     * @param {string} filepath
     * @param {object} [options]
     *
     * @returns {Promise<Buffer|string|null>}
     */
    async read(e, t = {}) {
      try {
        let r = await this._readFile(e, t);
        if (t.autocrlf === "true")
          try {
            r = new TextDecoder("utf8", { fatal: !0 }).decode(r), r = r.replace(/\r\n/g, `
`), r = new TextEncoder().encode(r);
          } catch {
          }
        return typeof r != "string" && (r = ne.from(r)), r;
      } catch {
        return null;
      }
    }
    /**
     * Write a file (creating missing directories if need be) without throwing errors.
     *
     * @param {string} filepath
     * @param {Buffer|Uint8Array|string} contents
     * @param {object|string} [options]
     */
    async write(e, t, r = {}) {
      try {
        await this._writeFile(e, t, r);
        return;
      } catch {
        await this.mkdir(Ar(e)), await this._writeFile(e, t, r);
      }
    }
    /**
     * Make a directory (or series of nested directories) without throwing an error if it already exists.
     */
    async mkdir(e, t = !1) {
      try {
        await this._mkdir(e);
        return;
      } catch (r) {
        if (r === null || r.code === "EEXIST") return;
        if (t) throw r;
        if (r.code === "ENOENT") {
          const n = Ar(e);
          if (n === "." || n === "/" || n === e) throw r;
          await this.mkdir(n), await this.mkdir(e, !0);
        }
      }
    }
    /**
     * Delete a file without throwing an error if it is already deleted.
     */
    async rm(e) {
      try {
        await this._unlink(e);
      } catch (t) {
        if (t.code !== "ENOENT") throw t;
      }
    }
    /**
     * Delete a directory without throwing an error if it is already deleted.
     */
    async rmdir(e, t) {
      try {
        t && t.recursive ? await this._rm(e, t) : await this._rmdir(e);
      } catch (r) {
        if (r.code !== "ENOENT") throw r;
      }
    }
    /**
     * Read a directory without throwing an error is the directory doesn't exist
     */
    async readdir(e) {
      try {
        const t = await this._readdir(e);
        return t.sort(Ur), t;
      } catch (t) {
        return t.code === "ENOTDIR" ? null : [];
      }
    }
    /**
     * Return a flast list of all the files nested inside a directory
     *
     * Based on an elegant concurrent recursive solution from SO
     * https://stackoverflow.com/a/45130990/2168416
     */
    async readdirDeep(e) {
      const t = await this._readdir(e);
      return (await Promise.all(
        t.map(async (n) => {
          const a = e + "/" + n;
          return (await this._stat(a)).isDirectory() ? this.readdirDeep(a) : a;
        })
      )).reduce((n, a) => n.concat(a), []);
    }
    /**
     * Return the Stats of a file/symlink if it exists, otherwise returns null.
     * Rethrows errors that aren't related to file existence.
     */
    async lstat(e) {
      try {
        return await this._lstat(e);
      } catch (t) {
        if (t.code === "ENOENT" || (t.code || "").includes("ENS"))
          return null;
        throw t;
      }
    }
    /**
     * Reads the contents of a symlink if it exists, otherwise returns null.
     * Rethrows errors that aren't related to file existence.
     */
    async readlink(e, t = { encoding: "buffer" }) {
      try {
        const r = await this._readlink(e, t);
        return ne.isBuffer(r) ? r : ne.from(r);
      } catch (r) {
        if (r.code === "ENOENT" || (r.code || "").includes("ENS"))
          return null;
        throw r;
      }
    }
    /**
     * Write the contents of buffer to a symlink.
     */
    async writelink(e, t) {
      return this._symlink(t.toString("utf8"), e);
    }
  }
  function Ce(i, e) {
    if (e === void 0)
      throw new lt(i);
  }
  async function ea(i, e) {
    return !i && !e ? !1 : i && !e || !i && e ? !0 : !(await i.type() === "tree" && await e.type() === "tree" || await i.type() === await e.type() && await i.mode() === await e.mode() && await i.oid() === await e.oid());
  }
  async function Co({ fs: i, gitdir: e, object: t, format: r, oid: n }) {
    const a = `objects/${n.slice(0, 2)}/${n.slice(2)}`, s = `${e}/${a}`;
    await i.exists(s) || await i.write(s, t);
  }
  let Bi = null;
  async function Oa(i) {
    return Bi === null && (Bi = Do()), Bi ? No(i) : Qi.deflate(i);
  }
  async function No(i) {
    const e = new CompressionStream("deflate"), t = new Blob([i]).stream().pipeThrough(e);
    return new Uint8Array(await new Response(t).arrayBuffer());
  }
  function Do() {
    try {
      return new CompressionStream("deflate").writable.close(), new Blob([]).stream().cancel(), !0;
    } catch {
      return !1;
    }
  }
  async function ti({
    fs: i,
    gitdir: e,
    type: t,
    object: r,
    format: n = "content",
    oid: a = void 0,
    dryRun: s = !1
  }) {
    return n !== "deflated" && (n !== "wrapped" && (r = jr.wrap({ type: t, object: r })), a = await Lt(r), r = ne.from(await Oa(r))), s || await Co({ fs: i, gitdir: e, object: r, format: "deflated", oid: a }), a;
  }
  async function Cr({ fs: i, gitdir: e, path: t }) {
    return (await ut.get({ fs: i, gitdir: e })).get(t);
  }
  function Ca(i, ...e) {
    for (const t of e)
      if (t)
        for (const r of Object.keys(t)) {
          const n = t[r];
          n !== void 0 && (i[r] = n);
        }
    return i;
  }
  async function Zi({ fs: i, gitdir: e, author: t, commit: r }) {
    const n = Math.floor(Date.now() / 1e3), a = {
      name: await Cr({ fs: i, gitdir: e, path: "user.name" }),
      email: await Cr({ fs: i, gitdir: e, path: "user.email" }) || "",
      // author.email is allowed to be empty string
      timestamp: n,
      timezoneOffset: new Date(n * 1e3).getTimezoneOffset()
    }, s = Ca(
      {},
      a,
      r ? r.author : void 0,
      t
    );
    if (s.name !== void 0)
      return s;
  }
  async function Gi({
    fs: i,
    gitdir: e,
    author: t,
    committer: r,
    commit: n
  }) {
    const a = Math.floor(Date.now() / 1e3), s = {
      name: await Cr({ fs: i, gitdir: e, path: "user.name" }),
      email: await Cr({ fs: i, gitdir: e, path: "user.email" }) || "",
      // committer.email is allowed to be empty string
      timestamp: a,
      timezoneOffset: new Date(a * 1e3).getTimezoneOffset()
    }, o = Ca(
      {},
      s,
      n ? n.committer : void 0,
      t,
      r
    );
    if (o.name !== void 0)
      return o;
  }
  async function Na({ fs: i, cache: e, gitdir: t, oid: r }) {
    const { type: n, object: a } = await Ye({ fs: i, cache: e, gitdir: t, oid: r });
    if (n === "tag")
      return r = Bt.from(a).parse().object, Na({ fs: i, cache: e, gitdir: t, oid: r });
    if (n !== "commit")
      throw new $t(r, n, "commit");
    return { commit: Pe.from(a), oid: r };
  }
  async function Vi({ fs: i, cache: e, gitdir: t, oid: r }) {
    const { commit: n, oid: a } = await Na({
      fs: i,
      cache: e,
      gitdir: t,
      oid: r
    });
    return {
      oid: a,
      commit: n.parse(),
      payload: n.withoutSignature()
    };
  }
  async function Fo({
    fs: i,
    cache: e,
    onSign: t,
    gitdir: r,
    message: n,
    author: a,
    committer: s,
    signingKey: o,
    amend: l = !1,
    dryRun: d = !1,
    noUpdateBranch: f = !1,
    ref: w,
    parent: m,
    tree: y
  }) {
    let k = !1;
    w || (w = await se.resolve({
      fs: i,
      gitdir: r,
      ref: "HEAD",
      depth: 2
    }));
    let x, E;
    try {
      x = await se.resolve({
        fs: i,
        gitdir: r,
        ref: w
      }), E = await Vi({ fs: i, gitdir: r, oid: x, cache: {} });
    } catch {
      k = !0;
    }
    if (l && k)
      throw new ei(w);
    const R = l ? await Zi({
      fs: i,
      gitdir: r,
      author: a,
      commit: E.commit
    }) : await Zi({ fs: i, gitdir: r, author: a });
    if (!R) throw new Ht("author");
    const T = l ? await Gi({
      fs: i,
      gitdir: r,
      author: R,
      committer: s,
      commit: E.commit
    }) : await Gi({
      fs: i,
      gitdir: r,
      author: R,
      committer: s
    });
    if (!T) throw new Ht("committer");
    return zt.acquire(
      { fs: i, gitdir: r, cache: e, allowUnmerged: !1 },
      async function(S) {
        const D = Sa(S.entries).get(".");
        if (y || (y = await Da({ fs: i, gitdir: r, inode: D, dryRun: d })), m ? m = await Promise.all(
          m.map((A) => se.resolve({ fs: i, gitdir: r, ref: A }))
        ) : l ? m = E.commit.parent : m = x ? [x] : [], !n)
          if (l)
            n = E.commit.message;
          else
            throw new lt("message");
        let F = Pe.from({
          tree: y,
          parent: m,
          author: R,
          committer: T,
          message: n
        });
        o && (F = await Pe.sign(F, t, o));
        const I = await ti({
          fs: i,
          gitdir: r,
          type: "commit",
          object: F.toObject(),
          dryRun: d
        });
        return !f && !d && await se.writeRef({
          fs: i,
          gitdir: r,
          ref: w,
          value: I
        }), I;
      }
    );
  }
  async function Da({ fs: i, gitdir: e, inode: t, dryRun: r }) {
    const n = t.children;
    for (const l of n)
      l.type === "tree" && (l.metadata.mode = "040000", l.metadata.oid = await Da({ fs: i, gitdir: e, inode: l, dryRun: r }));
    const a = n.map((l) => ({
      mode: l.metadata.mode,
      path: l.basename,
      oid: l.metadata.oid,
      type: l.type
    })), s = bt.from(a);
    return await ti({
      fs: i,
      gitdir: e,
      type: "tree",
      object: s.toObject(),
      dryRun: r
    });
  }
  async function Po({ fs: i, cache: e, gitdir: t, oid: r, filepath: n }) {
    if (n.startsWith("/"))
      throw new lr("leading-slash");
    if (n.endsWith("/"))
      throw new lr("trailing-slash");
    const a = r, s = await fr({ fs: i, cache: e, gitdir: t, oid: r }), o = s.tree;
    if (n === "")
      r = s.oid;
    else {
      const l = n.split("/");
      r = await Fa({
        fs: i,
        cache: e,
        gitdir: t,
        tree: o,
        pathArray: l,
        oid: a,
        filepath: n
      });
    }
    return r;
  }
  async function Fa({
    fs: i,
    cache: e,
    gitdir: t,
    tree: r,
    pathArray: n,
    oid: a,
    filepath: s
  }) {
    const o = n.shift();
    for (const l of r)
      if (l.path === o) {
        if (n.length === 0)
          return l.oid;
        {
          const { type: d, object: f } = await Ye({
            fs: i,
            cache: e,
            gitdir: t,
            oid: l.oid
          });
          if (d !== "tree")
            throw new $t(a, d, "tree", s);
          return r = bt.from(f), Fa({
            fs: i,
            cache: e,
            gitdir: t,
            tree: r,
            pathArray: n,
            oid: a,
            filepath: s
          });
        }
      }
    throw new et(`file or directory found at "${a}:${s}"`);
  }
  async function Mo({ fs: i, gitdir: e, remote: t, url: r, force: n }) {
    if (t !== Mn.clean(t))
      throw new Xr(t, Mn.clean(t));
    const a = await ut.get({ fs: i, gitdir: e });
    if ((await a.getSubsections("remote")).includes(t) && r !== await a.get(`remote.${t}.url`))
      throw new Hr("remote", t);
    await a.set(`remote.${t}.url`, r), await a.set(
      `remote.${t}.fetch`,
      `+refs/heads/*:refs/remotes/${t}/*`
    ), await ut.save({ fs: i, gitdir: e, config: a });
  }
  const Uo = (i, e) => i === "." || e == null || e.length === 0 || e === "." ? !0 : e.length >= i.length ? e.startsWith(i) : i.startsWith(e);
  async function sn({
    fs: i,
    cache: e,
    onProgress: t,
    onPostCheckout: r,
    dir: n,
    gitdir: a,
    remote: s,
    ref: o,
    filepaths: l,
    noCheckout: d,
    noUpdateHead: f,
    dryRun: w,
    force: m,
    track: y = !0
  }) {
    let k;
    if (r)
      try {
        k = await se.resolve({ fs: i, gitdir: a, ref: "HEAD" });
      } catch {
        k = "0000000000000000000000000000000000000000";
      }
    let x;
    try {
      x = await se.resolve({ fs: i, gitdir: a, ref: o });
    } catch (E) {
      if (o === "HEAD") throw E;
      const R = `${s}/${o}`;
      if (x = await se.resolve({
        fs: i,
        gitdir: a,
        ref: R
      }), y) {
        const T = await ut.get({ fs: i, gitdir: a });
        await T.set(`branch.${o}.remote`, s), await T.set(`branch.${o}.merge`, `refs/heads/${o}`), await ut.save({ fs: i, gitdir: a, config: T });
      }
      await se.writeRef({
        fs: i,
        gitdir: a,
        ref: `refs/heads/${o}`,
        value: x
      });
    }
    if (!d) {
      let E;
      try {
        E = await zo({
          fs: i,
          cache: e,
          onProgress: t,
          dir: n,
          gitdir: a,
          ref: o,
          force: m,
          filepaths: l
        });
      } catch (D) {
        throw D instanceof et && D.data.what === x ? new Wr(o, x) : D;
      }
      const R = E.filter(([D]) => D === "conflict").map(([D, F]) => F);
      if (R.length > 0)
        throw new qr(R);
      const T = E.filter(([D]) => D === "error").map(([D, F]) => F);
      if (T.length > 0)
        throw new ye(T.join(", "));
      if (w) {
        r && await r({
          previousHead: k,
          newHead: x,
          type: l != null && l.length > 0 ? "file" : "branch"
        });
        return;
      }
      let S = 0;
      const N = E.length;
      await zt.acquire({ fs: i, gitdir: a, cache: e }, async function(D) {
        await Promise.all(
          E.filter(
            ([F]) => F === "delete" || F === "delete-index"
          ).map(async function([F, I]) {
            const A = `${n}/${I}`;
            F === "delete" && await i.rm(A), D.delete({ filepath: I }), t && await t({
              phase: "Updating workdir",
              loaded: ++S,
              total: N
            });
          })
        );
      }), await zt.acquire({ fs: i, gitdir: a, cache: e }, async function(D) {
        for (const [F, I] of E)
          if (F === "rmdir" || F === "rmdir-index") {
            const A = `${n}/${I}`;
            try {
              F === "rmdir-index" && D.delete({ filepath: I }), await i.rmdir(A), t && await t({
                phase: "Updating workdir",
                loaded: ++S,
                total: N
              });
            } catch (U) {
              if (U.code === "ENOTEMPTY")
                console.log(
                  `Did not delete ${I} because directory is not empty`
                );
              else
                throw U;
            }
          }
      }), await Promise.all(
        E.filter(([D]) => D === "mkdir" || D === "mkdir-index").map(async function([D, F]) {
          const I = `${n}/${F}`;
          await i.mkdir(I), t && await t({
            phase: "Updating workdir",
            loaded: ++S,
            total: N
          });
        })
      ), await zt.acquire({ fs: i, gitdir: a, cache: e }, async function(D) {
        await Promise.all(
          E.filter(
            ([F]) => F === "create" || F === "create-index" || F === "update" || F === "mkdir-index"
          ).map(async function([F, I, A, U, P]) {
            const G = `${n}/${I}`;
            try {
              if (F !== "create-index" && F !== "mkdir-index") {
                const { object: Z } = await Ye({ fs: i, cache: e, gitdir: a, oid: A });
                if (P && await i.rm(G), U === 33188)
                  await i.write(G, Z);
                else if (U === 33261)
                  await i.write(G, Z, { mode: 511 });
                else if (U === 40960)
                  await i.writelink(G, Z);
                else
                  throw new ye(
                    `Invalid mode 0o${U.toString(8)} detected in blob ${A}`
                  );
              }
              const $ = await i.lstat(G);
              U === 33261 && ($.mode = 493), F === "mkdir-index" && ($.mode = 57344), D.insert({
                filepath: I,
                stats: $,
                oid: A
              }), t && await t({
                phase: "Updating workdir",
                loaded: ++S,
                total: N
              });
            } catch ($) {
              console.log($);
            }
          })
        );
      }), r && await r({
        previousHead: k,
        newHead: x,
        type: l != null && l.length > 0 ? "file" : "branch"
      });
    }
    if (!f) {
      const E = await se.expand({ fs: i, gitdir: a, ref: o });
      E.startsWith("refs/heads") ? await se.writeSymbolicRef({
        fs: i,
        gitdir: a,
        ref: "HEAD",
        value: E
      }) : await se.writeRef({ fs: i, gitdir: a, ref: "HEAD", value: x });
    }
  }
  async function zo({
    fs: i,
    cache: e,
    onProgress: t,
    dir: r,
    gitdir: n,
    ref: a,
    force: s,
    filepaths: o
  }) {
    let l = 0;
    return qi({
      fs: i,
      cache: e,
      dir: r,
      gitdir: n,
      trees: [sr({ ref: a }), To(), qs()],
      map: async function(d, [f, w, m]) {
        if (d === ".") return;
        if (o && !o.some((k) => Uo(d, k)))
          return null;
        switch (t && await t({ phase: "Analyzing workdir", loaded: ++l }), [!!m, !!f, !!w].map(Number).join("")) {
          // Impossible case.
          case "000":
            return;
          // Ignore workdir files that are not tracked and not part of the new commit.
          case "001":
            return s && o && o.includes(d) ? ["delete", d] : void 0;
          // New entries
          case "010":
            switch (await f.type()) {
              case "tree":
                return ["mkdir", d];
              case "blob":
                return [
                  "create",
                  d,
                  await f.oid(),
                  await f.mode()
                ];
              case "commit":
                return [
                  "mkdir-index",
                  d,
                  await f.oid(),
                  await f.mode()
                ];
              default:
                return [
                  "error",
                  `new entry Unhandled type ${await f.type()}`
                ];
            }
          // New entries but there is already something in the workdir there.
          case "011":
            switch (`${await f.type()}-${await w.type()}`) {
              case "tree-tree":
                return;
              case "tree-blob":
              case "blob-tree":
                return ["conflict", d];
              case "blob-blob":
                return await f.oid() !== await w.oid() ? s ? [
                  "update",
                  d,
                  await f.oid(),
                  await f.mode(),
                  await f.mode() !== await w.mode()
                ] : ["conflict", d] : await f.mode() !== await w.mode() ? s ? [
                  "update",
                  d,
                  await f.oid(),
                  await f.mode(),
                  !0
                ] : ["conflict", d] : [
                  "create-index",
                  d,
                  await f.oid(),
                  await f.mode()
                ];
              case "commit-tree":
                return;
              case "commit-blob":
                return ["conflict", d];
              default:
                return ["error", `new entry Unhandled type ${f.type}`];
            }
          // Something in stage but not in the commit OR the workdir.
          // Note: I verified this behavior against canonical git.
          case "100":
            return ["delete-index", d];
          // Deleted entries
          // TODO: How to handle if stage type and workdir type mismatch?
          case "101":
            switch (await m.type()) {
              case "tree":
                return ["rmdir", d];
              case "blob":
                return await m.oid() !== await w.oid() ? s ? ["delete", d] : ["conflict", d] : ["delete", d];
              case "commit":
                return ["rmdir-index", d];
              default:
                return [
                  "error",
                  `delete entry Unhandled type ${await m.type()}`
                ];
            }
          /* eslint-disable no-fallthrough */
          // File missing from workdir
          case "110":
          // Possibly modified entries
          case "111":
            switch (`${await m.type()}-${await f.type()}`) {
              case "tree-tree":
                return;
              case "blob-blob": {
                if (await m.oid() === await f.oid() && await m.mode() === await f.mode() && !s)
                  return;
                if (w) {
                  if (await w.oid() !== await m.oid() && await w.oid() !== await f.oid())
                    return s ? [
                      "update",
                      d,
                      await f.oid(),
                      await f.mode(),
                      await f.mode() !== await w.mode()
                    ] : ["conflict", d];
                } else if (s)
                  return [
                    "update",
                    d,
                    await f.oid(),
                    await f.mode(),
                    await f.mode() !== await m.mode()
                  ];
                return await f.mode() !== await m.mode() ? [
                  "update",
                  d,
                  await f.oid(),
                  await f.mode(),
                  !0
                ] : await f.oid() !== await m.oid() ? [
                  "update",
                  d,
                  await f.oid(),
                  await f.mode(),
                  !1
                ] : void 0;
              }
              case "tree-blob":
                return ["update-dir-to-blob", d, await f.oid()];
              case "blob-tree":
                return ["update-blob-to-tree", d];
              case "commit-commit":
                return [
                  "mkdir-index",
                  d,
                  await f.oid(),
                  await f.mode()
                ];
              default:
                return [
                  "error",
                  `update entry Unhandled type ${await m.type()}-${await f.type()}`
                ];
            }
        }
      },
      // Modify the default flat mapping
      reduce: async function(d, f) {
        return f = Ba(f), d ? d && d[0] === "rmdir" ? (f.push(d), f) : (f.unshift(d), f) : f;
      }
    });
  }
  async function Lo({
    fs: i,
    onProgress: e,
    onPostCheckout: t,
    dir: r,
    gitdir: n = $e.join(r, ".git"),
    remote: a = "origin",
    ref: s,
    filepaths: o,
    noCheckout: l = !1,
    noUpdateHead: d = s === void 0,
    dryRun: f = !1,
    force: w = !1,
    track: m = !0,
    cache: y = {}
  }) {
    try {
      Ce("fs", i), Ce("dir", r), Ce("gitdir", n);
      const k = s || "HEAD";
      return await sn({
        fs: new Wt(i),
        cache: y,
        onProgress: e,
        onPostCheckout: t,
        dir: r,
        gitdir: n,
        remote: a,
        ref: k,
        filepaths: o,
        noCheckout: l,
        noUpdateHead: d,
        dryRun: f,
        force: w,
        track: m
      });
    } catch (k) {
      throw k.caller = "git.checkout", k;
    }
  }
  const jo = new RegExp("^refs/(heads/|tags/|remotes/)?(.*)");
  function Vt(i) {
    const e = jo.exec(i);
    return e ? e[1] === "remotes/" && i.endsWith("/HEAD") ? e[2].slice(0, -5) : e[2] : i;
  }
  async function ri({
    fs: i,
    gitdir: e,
    fullname: t = !1,
    test: r = !1
  }) {
    const n = await se.resolve({
      fs: i,
      gitdir: e,
      ref: "HEAD",
      depth: 2
    });
    if (r)
      try {
        await se.resolve({ fs: i, gitdir: e, ref: n });
      } catch {
        return;
      }
    if (n.startsWith("refs/"))
      return t ? n : Vt(n);
  }
  function Ho(i) {
    return i = i.replace(/^git@([^:]+):/, "https://$1/"), i = i.replace(/^ssh:\/\//, "https://"), i;
  }
  function Pa({ username: i = "", password: e = "" }) {
    return `Basic ${ne.from(`${i}:${e}`).toString("base64")}`;
  }
  async function gr(i, e) {
    const t = Ta(i);
    for (; ; ) {
      const { value: r, done: n } = await t.next();
      if (r && await e(r), n) break;
    }
    t.return && t.return();
  }
  async function Xi(i) {
    let e = 0;
    const t = [];
    await gr(i, (a) => {
      t.push(a), e += a.byteLength;
    });
    const r = new Uint8Array(e);
    let n = 0;
    for (const a of t)
      r.set(a, n), n += a.byteLength;
    return r;
  }
  function ta(i) {
    let e = i.match(/^https?:\/\/([^/]+)@/);
    if (e == null) return { url: i, auth: {} };
    e = e[1];
    const [t, r] = e.split(":");
    return i = i.replace(`${e}@`, ""), { url: i, auth: { username: t, password: r } };
  }
  function Yi(i, e) {
    const t = e.toString(16);
    return "0".repeat(i - t.length) + t;
  }
  class Me {
    static flush() {
      return ne.from("0000", "utf8");
    }
    static delim() {
      return ne.from("0001", "utf8");
    }
    static encode(e) {
      typeof e == "string" && (e = ne.from(e));
      const t = e.length + 4, r = Yi(4, t);
      return ne.concat([ne.from(r, "utf8"), e]);
    }
    static streamReader(e) {
      const t = new $a(e);
      return async function() {
        try {
          let n = await t.read(4);
          if (n == null) return !0;
          if (n = parseInt(n.toString("utf8"), 16), n === 0 || n === 1) return null;
          const a = await t.read(n - 4);
          return a ?? !0;
        } catch (n) {
          return e.error = n, !0;
        }
      };
    }
  }
  async function ra(i) {
    const e = {};
    let t;
    for (; t = await i(), t !== !0; ) {
      if (t === null) continue;
      t = t.toString("utf8").replace(/\n$/, "");
      const r = t.indexOf("=");
      if (r > -1) {
        const n = t.slice(0, r), a = t.slice(r + 1);
        e[n] = a;
      } else
        e[t] = !0;
    }
    return { protocolVersion: 2, capabilities2: e };
  }
  async function ia(i, { service: e }) {
    const t = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), a = Me.streamReader(i);
    let s = await a();
    for (; s === null; ) s = await a();
    if (s === !0) throw new Zr();
    if (s.includes("version 2"))
      return ra(a);
    if (s.toString("utf8").replace(/\n$/, "") !== `# service=${e}`)
      throw new Kt(`# service=${e}\\n`, s.toString("utf8"));
    let o = await a();
    for (; o === null; ) o = await a();
    if (o === !0) return { capabilities: t, refs: r, symrefs: n };
    if (o = o.toString("utf8"), o.includes("version 2"))
      return ra(a);
    const [l, d] = Oi(o, "\0", "\\x00");
    if (d.split(" ").map((f) => t.add(f)), l !== "0000000000000000000000000000000000000000 capabilities^{}") {
      const [f, w] = Oi(l, " ", " ");
      for (r.set(w, f); ; ) {
        const m = await a();
        if (m === !0) break;
        if (m !== null) {
          const [y, k] = Oi(m.toString("utf8"), " ", " ");
          r.set(k, y);
        }
      }
    }
    for (const f of t)
      if (f.startsWith("symref=")) {
        const w = f.match(/symref=([^:]+):(.*)/);
        w.length === 3 && n.set(w[1], w[2]);
      }
    return { protocolVersion: 1, capabilities: t, refs: r, symrefs: n };
  }
  function Oi(i, e, t) {
    const r = i.trim().split(e);
    if (r.length !== 2)
      throw new Kt(
        `Two strings separated by '${t}'`,
        i.toString("utf8")
      );
    return r;
  }
  const na = (i, e) => i.endsWith("?") ? `${i}${e}` : `${i}/${e.replace(/^https?:\/\//, "")}`, aa = (i, e) => {
    (e.username || e.password) && (i.Authorization = Pa(e)), e.headers && Object.assign(i, e.headers);
  }, Ci = async (i) => {
    try {
      const e = ne.from(await Xi(i.body)), t = e.toString("utf8");
      return { preview: t.length < 256 ? t : t.slice(0, 256) + "...", response: t, data: e };
    } catch {
      return {};
    }
  };
  class Nr {
    static async capabilities() {
      return ["discover", "connect"];
    }
    /**
     * @param {Object} args
     * @param {HttpClient} args.http
     * @param {ProgressCallback} [args.onProgress]
     * @param {AuthCallback} [args.onAuth]
     * @param {AuthFailureCallback} [args.onAuthFailure]
     * @param {AuthSuccessCallback} [args.onAuthSuccess]
     * @param {string} [args.corsProxy]
     * @param {string} args.service
     * @param {string} args.url
     * @param {Object<string, string>} args.headers
     * @param {1 | 2} args.protocolVersion - Git Protocol Version
     */
    static async discover({
      http: e,
      onProgress: t,
      onAuth: r,
      onAuthSuccess: n,
      onAuthFailure: a,
      corsProxy: s,
      service: o,
      url: l,
      headers: d,
      protocolVersion: f
    }) {
      let { url: w, auth: m } = ta(l);
      const y = s ? na(s, w) : w;
      (m.username || m.password) && (d.Authorization = Pa(m)), f === 2 && (d["Git-Protocol"] = "version=2");
      let k, x, E = !1;
      do
        if (k = await e.request({
          onProgress: t,
          method: "GET",
          url: `${y}/info/refs?service=${o}`,
          headers: d
        }), x = !1, k.statusCode === 401 || k.statusCode === 203) {
          const R = E ? a : r;
          if (R) {
            if (m = await R(w, {
              ...m,
              headers: { ...d }
            }), m && m.cancel)
              throw new _r();
            m && (aa(d, m), E = !0, x = !0);
          }
        } else k.statusCode === 200 && E && n && await n(w, m);
      while (x);
      if (k.statusCode !== 200) {
        const { response: R } = await Ci(k);
        throw new cr(k.statusCode, k.statusMessage, R);
      }
      if (k.headers["content-type"] === `application/x-${o}-advertisement`) {
        const R = await ia(k.body, { service: o });
        return R.auth = m, R;
      } else {
        const { preview: R, response: T, data: S } = await Ci(k);
        try {
          const N = await ia([S], { service: o });
          return N.auth = m, N;
        } catch {
          throw new Kr(R, T);
        }
      }
    }
    /**
     * @param {Object} args
     * @param {HttpClient} args.http
     * @param {ProgressCallback} [args.onProgress]
     * @param {string} [args.corsProxy]
     * @param {string} args.service
     * @param {string} args.url
     * @param {Object<string, string>} [args.headers]
     * @param {any} args.body
     * @param {any} args.auth
     */
    static async connect({
      http: e,
      onProgress: t,
      corsProxy: r,
      service: n,
      url: a,
      auth: s,
      body: o,
      headers: l
    }) {
      const d = ta(a);
      d && (a = d.url), r && (a = na(r, a)), l["content-type"] = `application/x-${n}-request`, l.accept = `application/x-${n}-result`, aa(l, s);
      const f = await e.request({
        onProgress: t,
        method: "POST",
        url: `${a}/${n}`,
        body: o,
        headers: l
      });
      if (f.statusCode !== 200) {
        const { response: w } = Ci(f);
        throw new cr(f.statusCode, f.statusMessage, w);
      }
      return f;
    }
  }
  function qo({ url: i }) {
    if (i.startsWith("git@"))
      return {
        transport: "ssh",
        address: i
      };
    const e = i.match(/(\w+)(:\/\/|::)(.*)/);
    if (e !== null) {
      if (e[2] === "://")
        return {
          transport: e[1],
          address: e[0]
        };
      if (e[2] === "::")
        return {
          transport: e[1],
          address: e[3]
        };
    }
  }
  class Ma {
    static getRemoteHelperFor({ url: e }) {
      const t = /* @__PURE__ */ new Map();
      t.set("http", Nr), t.set("https", Nr);
      const r = qo({ url: e });
      if (!r)
        throw new Qr(e);
      if (t.has(r.transport))
        return t.get(r.transport);
      throw new Jr(
        e,
        r.transport,
        r.transport === "ssh" ? Ho(e) : void 0
      );
    }
  }
  let Dt = null;
  class hr {
    static async read({ fs: e, gitdir: t }) {
      Dt === null && (Dt = new $r());
      const r = $e.join(t, "shallow"), n = /* @__PURE__ */ new Set();
      return await Dt.acquire(r, async function() {
        const a = await e.read(r, { encoding: "utf8" });
        if (a === null || a.trim() === "") return n;
        a.trim().split(`
`).map((s) => n.add(s));
      }), n;
    }
    static async write({ fs: e, gitdir: t, oids: r }) {
      Dt === null && (Dt = new $r());
      const n = $e.join(t, "shallow");
      if (r.size > 0) {
        const a = [...r].join(`
`) + `
`;
        await Dt.acquire(n, async function() {
          await e.write(n, a, {
            encoding: "utf8"
          });
        });
      } else
        await Dt.acquire(n, async function() {
          await e.rm(n);
        });
    }
  }
  async function Wo({ fs: i, gitdir: e, oid: t }) {
    const r = `objects/${t.slice(0, 2)}/${t.slice(2)}`;
    return i.exists(`${e}/${r}`);
  }
  async function Zo({
    fs: i,
    cache: e,
    gitdir: t,
    oid: r,
    getExternalRefDelta: n
  }) {
    let a = await i.readdir($e.join(t, "objects/pack"));
    a = a.filter((s) => s.endsWith(".idx"));
    for (const s of a) {
      const o = `${t}/objects/pack/${s}`, l = await Ra({
        fs: i,
        cache: e,
        filename: o,
        getExternalRefDelta: n
      });
      if (l.error) throw new ye(l.error);
      if (l.offsets.has(r))
        return !0;
    }
    return !1;
  }
  async function sa({
    fs: i,
    cache: e,
    gitdir: t,
    oid: r,
    format: n = "content"
  }) {
    const a = (o) => Ye({ fs: i, cache: e, gitdir: t, oid: o });
    let s = await Wo({ fs: i, gitdir: t, oid: r });
    return s || (s = await Zo({
      fs: i,
      cache: e,
      gitdir: t,
      oid: r,
      getExternalRefDelta: a
    })), s;
  }
  function Go(i) {
    const n = "5041434b" + "00000002" + "00000000";
    return i.slice(0, 12).toString("hex") === n;
  }
  function Ua(i, e) {
    const t = i.map((r) => r.split("=", 1)[0]);
    return e.filter((r) => {
      const n = r.split("=", 1)[0];
      return t.includes(n);
    });
  }
  const on = {
    agent: "git/isomorphic-git@1.30.1"
  };
  class Ir {
    constructor() {
      this._queue = [];
    }
    write(e) {
      if (this._ended)
        throw Error("You cannot write to a FIFO that has already been ended!");
      if (this._waiting) {
        const t = this._waiting;
        this._waiting = null, t({ value: e });
      } else
        this._queue.push(e);
    }
    end() {
      if (this._ended = !0, this._waiting) {
        const e = this._waiting;
        this._waiting = null, e({ done: !0 });
      }
    }
    destroy(e) {
      this.error = e, this.end();
    }
    async next() {
      if (this._queue.length > 0)
        return { value: this._queue.shift() };
      if (this._ended)
        return { done: !0 };
      if (this._waiting)
        throw Error(
          "You cannot call read until the previous call to read has returned!"
        );
      return new Promise((e) => {
        this._waiting = e;
      });
    }
  }
  function Vo(i) {
    const e = i.indexOf("\r"), t = i.indexOf(`
`);
    return e === -1 && t === -1 ? -1 : e === -1 ? t + 1 : t === -1 ? e + 1 : t === e + 1 ? t + 1 : Math.min(e, t) + 1;
  }
  function za(i) {
    const e = new Ir();
    let t = "";
    return (async () => (await gr(i, (r) => {
      for (r = r.toString("utf8"), t += r; ; ) {
        const n = Vo(t);
        if (n === -1) break;
        e.write(t.slice(0, n)), t = t.slice(n);
      }
    }), t.length > 0 && e.write(t), e.end()))(), e;
  }
  class La {
    static demux(e) {
      const t = Me.streamReader(e), r = new Ir(), n = new Ir(), a = new Ir(), s = async function() {
        const o = await t();
        if (o === null) return s();
        if (o === !0) {
          r.end(), a.end(), e.error ? n.destroy(e.error) : n.end();
          return;
        }
        switch (o[0]) {
          case 1: {
            n.write(o.slice(1));
            break;
          }
          case 2: {
            a.write(o.slice(1));
            break;
          }
          case 3: {
            const l = o.slice(1);
            a.write(l), r.end(), a.end(), n.destroy(new Error(l.toString("utf8")));
            return;
          }
          default:
            r.write(o);
        }
        s();
      };
      return s(), {
        packetlines: r,
        packfile: n,
        progress: a
      };
    }
    // static mux ({
    //   protocol, // 'side-band' or 'side-band-64k'
    //   packetlines,
    //   packfile,
    //   progress,
    //   error
    // }) {
    //   const MAX_PACKET_LENGTH = protocol === 'side-band-64k' ? 999 : 65519
    //   let output = new PassThrough()
    //   packetlines.on('data', data => {
    //     if (data === null) {
    //       output.write(GitPktLine.flush())
    //     } else {
    //       output.write(GitPktLine.encode(data))
    //     }
    //   })
    //   let packfileWasEmpty = true
    //   let packfileEnded = false
    //   let progressEnded = false
    //   let errorEnded = false
    //   let goodbye = Buffer.concat([
    //     GitPktLine.encode(Buffer.from('010A', 'hex')),
    //     GitPktLine.flush()
    //   ])
    //   packfile
    //     .on('data', data => {
    //       packfileWasEmpty = false
    //       const buffers = splitBuffer(data, MAX_PACKET_LENGTH)
    //       for (const buffer of buffers) {
    //         output.write(
    //           GitPktLine.encode(Buffer.concat([Buffer.from('01', 'hex'), buffer]))
    //         )
    //       }
    //     })
    //     .on('end', () => {
    //       packfileEnded = true
    //       if (!packfileWasEmpty) output.write(goodbye)
    //       if (progressEnded && errorEnded) output.end()
    //     })
    //   progress
    //     .on('data', data => {
    //       const buffers = splitBuffer(data, MAX_PACKET_LENGTH)
    //       for (const buffer of buffers) {
    //         output.write(
    //           GitPktLine.encode(Buffer.concat([Buffer.from('02', 'hex'), buffer]))
    //         )
    //       }
    //     })
    //     .on('end', () => {
    //       progressEnded = true
    //       if (packfileEnded && errorEnded) output.end()
    //     })
    //   error
    //     .on('data', data => {
    //       const buffers = splitBuffer(data, MAX_PACKET_LENGTH)
    //       for (const buffer of buffers) {
    //         output.write(
    //           GitPktLine.encode(Buffer.concat([Buffer.from('03', 'hex'), buffer]))
    //         )
    //       }
    //     })
    //     .on('end', () => {
    //       errorEnded = true
    //       if (progressEnded && packfileEnded) output.end()
    //     })
    //   return output
    // }
  }
  async function Xo(i) {
    const { packetlines: e, packfile: t, progress: r } = La.demux(i), n = [], a = [], s = [];
    let o = !1, l = !1;
    return new Promise((d, f) => {
      gr(e, (w) => {
        const m = w.toString("utf8").trim();
        if (m.startsWith("shallow")) {
          const y = m.slice(-41).trim();
          y.length !== 40 && f(new jt(y)), n.push(y);
        } else if (m.startsWith("unshallow")) {
          const y = m.slice(-41).trim();
          y.length !== 40 && f(new jt(y)), a.push(y);
        } else if (m.startsWith("ACK")) {
          const [, y, k] = m.split(" ");
          s.push({ oid: y, status: k }), k || (l = !0);
        } else m.startsWith("NAK") ? (o = !0, l = !0) : (l = !0, o = !0);
        l && (i.error ? f(i.error) : d({ shallows: n, unshallows: a, acks: s, nak: o, packfile: t, progress: r }));
      }).finally(() => {
        l || (i.error ? f(i.error) : d({ shallows: n, unshallows: a, acks: s, nak: o, packfile: t, progress: r }));
      });
    });
  }
  function Yo({
    capabilities: i = [],
    wants: e = [],
    haves: t = [],
    shallows: r = [],
    depth: n = null,
    since: a = null,
    exclude: s = []
  }) {
    const o = [];
    e = [...new Set(e)];
    let l = ` ${i.join(" ")}`;
    for (const d of e)
      o.push(Me.encode(`want ${d}${l}
`)), l = "";
    for (const d of r)
      o.push(Me.encode(`shallow ${d}
`));
    n !== null && o.push(Me.encode(`deepen ${n}
`)), a !== null && o.push(
      Me.encode(`deepen-since ${Math.floor(a.valueOf() / 1e3)}
`)
    );
    for (const d of s)
      o.push(Me.encode(`deepen-not ${d}
`));
    o.push(Me.flush());
    for (const d of t)
      o.push(Me.encode(`have ${d}
`));
    return o.push(Me.encode(`done
`)), o;
  }
  async function cn({
    fs: i,
    cache: e,
    http: t,
    onProgress: r,
    onMessage: n,
    onAuth: a,
    onAuthSuccess: s,
    onAuthFailure: o,
    gitdir: l,
    ref: d,
    remoteRef: f,
    remote: w,
    url: m,
    corsProxy: y,
    depth: k = null,
    since: x = null,
    exclude: E = [],
    relative: R = !1,
    tags: T = !1,
    singleBranch: S = !1,
    headers: N = {},
    prune: D = !1,
    pruneTags: F = !1
  }) {
    const I = d || await ri({ fs: i, gitdir: l, test: !0 }), A = await ut.get({ fs: i, gitdir: l }), U = w || I && await A.get(`branch.${I}.remote`) || "origin", P = m || await A.get(`remote.${U}.url`);
    if (typeof P > "u")
      throw new lt("remote OR url");
    const G = f || I && await A.get(`branch.${I}.merge`) || d || "HEAD";
    y === void 0 && (y = await A.get("http.corsProxy"));
    const $ = Ma.getRemoteHelperFor({ url: P }), Z = await $.discover({
      http: t,
      onAuth: a,
      onAuthSuccess: s,
      onAuthFailure: o,
      corsProxy: y,
      service: "git-upload-pack",
      url: P,
      headers: N,
      protocolVersion: 1
    }), Q = Z.auth, ce = Z.refs;
    if (ce.size === 0)
      return {
        defaultBranch: null,
        fetchHead: null,
        fetchHeadDescription: null
      };
    if (k !== null && !Z.capabilities.has("shallow"))
      throw new Ut("shallow", "depth");
    if (x !== null && !Z.capabilities.has("deepen-since"))
      throw new Ut("deepen-since", "since");
    if (E.length > 0 && !Z.capabilities.has("deepen-not"))
      throw new Ut("deepen-not", "exclude");
    if (R === !0 && !Z.capabilities.has("deepen-relative"))
      throw new Ut("deepen-relative", "relative");
    const { oid: X, fullref: H } = se.resolveAgainstMap({
      ref: G,
      map: ce
    });
    for (const ae of ce.keys())
      ae === H || ae === "HEAD" || ae.startsWith("refs/heads/") || T && ae.startsWith("refs/tags/") || ce.delete(ae);
    const K = Ua(
      [...Z.capabilities],
      [
        "multi_ack_detailed",
        "no-done",
        "side-band-64k",
        // Note: I removed 'thin-pack' option since our code doesn't "fatten" packfiles,
        // which is necessary for compatibility with git. It was the cause of mysterious
        // 'fatal: pack has [x] unresolved deltas' errors that plagued us for some time.
        // isomorphic-git is perfectly happy with thin packfiles in .git/objects/pack but
        // canonical git it turns out is NOT.
        "ofs-delta",
        `agent=${on.agent}`
      ]
    );
    R && K.push("deepen-relative");
    const ie = S ? [X] : ce.values(), de = S ? [I] : await se.listRefs({
      fs: i,
      gitdir: l,
      filepath: "refs"
    });
    let _e = [];
    for (let ae of de)
      try {
        ae = await se.expand({ fs: i, gitdir: l, ref: ae });
        const ke = await se.resolve({ fs: i, gitdir: l, ref: ae });
        await sa({ fs: i, cache: e, gitdir: l, oid: ke }) && _e.push(ke);
      } catch {
      }
    _e = [...new Set(_e)];
    const ue = await hr.read({ fs: i, gitdir: l }), ve = Z.capabilities.has("shallow") ? [...ue] : [], be = Yo({
      capabilities: K,
      wants: ie,
      haves: _e,
      shallows: ve,
      depth: k,
      since: x,
      exclude: E
    }), Be = ne.from(await Xi(be)), we = await $.connect({
      http: t,
      onProgress: r,
      corsProxy: y,
      service: "git-upload-pack",
      url: P,
      auth: Q,
      body: [Be],
      headers: N
    }), he = await Xo(we.body);
    we.headers && (he.headers = we.headers);
    for (const ae of he.shallows)
      if (!ue.has(ae))
        try {
          const { object: ke } = await Ye({ fs: i, cache: e, gitdir: l, oid: ae }), De = new Pe(ke), Oe = await Promise.all(
            De.headers().parent.map((Se) => sa({ fs: i, cache: e, gitdir: l, oid: Se }))
          );
          Oe.length === 0 || Oe.every((Se) => Se) || ue.add(ae);
        } catch {
          ue.add(ae);
        }
    for (const ae of he.unshallows)
      ue.delete(ae);
    if (await hr.write({ fs: i, gitdir: l, oids: ue }), S) {
      const ae = /* @__PURE__ */ new Map([[H, X]]), ke = /* @__PURE__ */ new Map();
      let De = 10, Oe = H;
      for (; De--; ) {
        const pe = Z.symrefs.get(Oe);
        if (pe === void 0) break;
        ke.set(Oe, pe), Oe = pe;
      }
      const je = ce.get(Oe);
      je && ae.set(Oe, je);
      const { pruned: Se } = await se.updateRemoteRefs({
        fs: i,
        gitdir: l,
        remote: U,
        refs: ae,
        symrefs: ke,
        tags: T,
        prune: D
      });
      D && (he.pruned = Se);
    } else {
      const { pruned: ae } = await se.updateRemoteRefs({
        fs: i,
        gitdir: l,
        remote: U,
        refs: ce,
        symrefs: Z.symrefs,
        tags: T,
        prune: D,
        pruneTags: F
      });
      D && (he.pruned = ae);
    }
    if (he.HEAD = Z.symrefs.get("HEAD"), he.HEAD === void 0) {
      const { oid: ae } = se.resolveAgainstMap({
        ref: "HEAD",
        map: ce
      });
      for (const [ke, De] of ce.entries())
        if (ke !== "HEAD" && De === ae) {
          he.HEAD = ke;
          break;
        }
    }
    const Ee = H.startsWith("refs/tags") ? "tag" : "branch";
    if (he.FETCH_HEAD = {
      oid: X,
      description: `${Ee} '${Vt(H)}' of ${P}`
    }, r || n) {
      const ae = za(he.progress);
      gr(ae, async (ke) => {
        if (n && await n(ke), r) {
          const De = ke.match(/([^:]*).*\((\d+?)\/(\d+?)\)/);
          De && await r({
            phase: De[1].trim(),
            loaded: parseInt(De[2], 10),
            total: parseInt(De[3], 10)
          });
        }
      });
    }
    const Ne = ne.from(await Xi(he.packfile));
    if (we.body.error) throw we.body.error;
    const Ze = Ne.slice(-20).toString("hex"), Le = {
      defaultBranch: he.HEAD,
      fetchHead: he.FETCH_HEAD.oid,
      fetchHeadDescription: he.FETCH_HEAD.description
    };
    if (he.headers && (Le.headers = he.headers), D && (Le.pruned = he.pruned), Ze !== "" && !Go(Ne)) {
      Le.packfile = `objects/pack/pack-${Ze}.pack`;
      const ae = $e.join(l, Le.packfile);
      await i.write(ae, Ne);
      const ke = (Oe) => Ye({ fs: i, cache: e, gitdir: l, oid: Oe }), De = await or.fromPack({
        pack: Ne,
        getExternalRefDelta: ke,
        onProgress: r
      });
      await i.write(ae.replace(/\.pack$/, ".idx"), await De.toBuffer());
    }
    return Le;
  }
  async function Ko({
    fs: i,
    bare: e = !1,
    dir: t,
    gitdir: r = e ? t : $e.join(t, ".git"),
    defaultBranch: n = "master"
  }) {
    if (await i.exists(r + "/config")) return;
    let a = [
      "hooks",
      "info",
      "objects/info",
      "objects/pack",
      "refs/heads",
      "refs/tags"
    ];
    a = a.map((s) => r + "/" + s);
    for (const s of a)
      await i.mkdir(s);
    await i.write(
      r + "/config",
      `[core]
	repositoryformatversion = 0
	filemode = false
	bare = ${e}
` + (e ? "" : `	logallrefupdates = true
`) + `	symlinks = false
	ignorecase = true
`
    ), await i.write(r + "/HEAD", `ref: refs/heads/${n}
`);
  }
  async function Jo({
    fs: i,
    cache: e,
    http: t,
    onProgress: r,
    onMessage: n,
    onAuth: a,
    onAuthSuccess: s,
    onAuthFailure: o,
    onPostCheckout: l,
    dir: d,
    gitdir: f,
    url: w,
    corsProxy: m,
    ref: y,
    remote: k,
    depth: x,
    since: E,
    exclude: R,
    relative: T,
    singleBranch: S,
    noCheckout: N,
    noTags: D,
    headers: F
  }) {
    try {
      if (await Ko({ fs: i, gitdir: f }), await Mo({ fs: i, gitdir: f, remote: k, url: w, force: !1 }), m) {
        const U = await ut.get({ fs: i, gitdir: f });
        await U.set("http.corsProxy", m), await ut.save({ fs: i, gitdir: f, config: U });
      }
      const { defaultBranch: I, fetchHead: A } = await cn({
        fs: i,
        cache: e,
        http: t,
        onProgress: r,
        onMessage: n,
        onAuth: a,
        onAuthSuccess: s,
        onAuthFailure: o,
        gitdir: f,
        ref: y,
        remote: k,
        corsProxy: m,
        depth: x,
        since: E,
        exclude: R,
        relative: T,
        singleBranch: S,
        headers: F,
        tags: !D
      });
      if (A === null) return;
      y = y || I, y = y.replace("refs/heads/", ""), await sn({
        fs: i,
        cache: e,
        onProgress: r,
        onPostCheckout: l,
        dir: d,
        gitdir: f,
        ref: y,
        remote: k,
        noCheckout: N
      });
    } catch (I) {
      throw await i.rmdir(f, { recursive: !0, maxRetries: 10 }).catch(() => {
      }), I;
    }
  }
  async function Qo({
    fs: i,
    http: e,
    onProgress: t,
    onMessage: r,
    onAuth: n,
    onAuthSuccess: a,
    onAuthFailure: s,
    onPostCheckout: o,
    dir: l,
    gitdir: d = $e.join(l, ".git"),
    url: f,
    corsProxy: w = void 0,
    ref: m = void 0,
    remote: y = "origin",
    depth: k = void 0,
    since: x = void 0,
    exclude: E = [],
    relative: R = !1,
    singleBranch: T = !1,
    noCheckout: S = !1,
    noTags: N = !1,
    headers: D = {},
    cache: F = {}
  }) {
    try {
      return Ce("fs", i), Ce("http", e), Ce("gitdir", d), S || Ce("dir", l), Ce("url", f), await Jo({
        fs: new Wt(i),
        cache: F,
        http: e,
        onProgress: t,
        onMessage: r,
        onAuth: n,
        onAuthSuccess: a,
        onAuthFailure: s,
        onPostCheckout: o,
        dir: l,
        gitdir: d,
        url: f,
        corsProxy: w,
        ref: m,
        remote: y,
        depth: k,
        since: x,
        exclude: E,
        relative: R,
        singleBranch: T,
        noCheckout: S,
        noTags: N,
        headers: D
      });
    } catch (I) {
      throw I.caller = "git.clone", I;
    }
  }
  async function ja({ fs: i, cache: e, gitdir: t, oids: r }) {
    const n = {}, a = r.length;
    let s = r.map((o, l) => ({ index: l, oid: o }));
    for (; s.length; ) {
      const o = /* @__PURE__ */ new Set();
      for (const { oid: d, index: f } of s)
        n[d] || (n[d] = /* @__PURE__ */ new Set()), n[d].add(f), n[d].size === a && o.add(d);
      if (o.size > 0)
        return [...o];
      const l = /* @__PURE__ */ new Map();
      for (const { oid: d, index: f } of s)
        try {
          const { object: w } = await Ye({ fs: i, cache: e, gitdir: t, oid: d }), m = Pe.from(w), { parent: y } = m.parseHeaders();
          for (const k of y)
            (!n[k] || !n[k].has(f)) && l.set(k + ":" + f, { oid: k, index: f });
        } catch {
        }
      s = Array.from(l.values());
    }
    return [];
  }
  const Ni = /^.*(\r?\n|$)/gm;
  function ec({ branches: i, contents: e }) {
    const t = i[1], r = i[2], n = e[0], a = e[1], s = e[2], o = a.match(Ni), l = n.match(Ni), d = s.match(Ni), f = Cs(o, l, d), w = 7;
    let m = "", y = !0;
    for (const k of f)
      k.ok && (m += k.ok.join("")), k.conflict && (y = !1, m += `${"<".repeat(w)} ${t}
`, m += k.conflict.a.join(""), m += `${"=".repeat(w)}
`, m += k.conflict.b.join(""), m += `${">".repeat(w)} ${r}
`);
    return { cleanMerge: y, mergedText: m };
  }
  async function tc({
    fs: i,
    cache: e,
    dir: t,
    gitdir: r = $e.join(t, ".git"),
    index: n,
    ourOid: a,
    baseOid: s,
    theirOid: o,
    ourName: l = "ours",
    baseName: d = "base",
    theirName: f = "theirs",
    dryRun: w = !1,
    abortOnConflict: m = !0,
    mergeDriver: y
  }) {
    const k = sr({ ref: a }), x = sr({ ref: s }), E = sr({ ref: o }), R = [], T = [], S = [], N = [], D = await qi({
      fs: i,
      cache: e,
      dir: t,
      gitdir: r,
      trees: [k, x, E],
      map: async function(F, [I, A, U]) {
        const P = Li(F), G = await ea(I, A), $ = await ea(U, A);
        switch (`${G}-${$}`) {
          case "false-false":
            return {
              mode: await A.mode(),
              path: P,
              oid: await A.oid(),
              type: await A.type()
            };
          case "false-true":
            return U ? {
              mode: await U.mode(),
              path: P,
              oid: await U.oid(),
              type: await U.type()
            } : void 0;
          case "true-false":
            return I ? {
              mode: await I.mode(),
              path: P,
              oid: await I.oid(),
              type: await I.type()
            } : void 0;
          case "true-true": {
            if (I && A && U && await I.type() === "blob" && await A.type() === "blob" && await U.type() === "blob")
              return rc({
                fs: i,
                gitdir: r,
                path: P,
                ours: I,
                base: A,
                theirs: U,
                ourName: l,
                baseName: d,
                theirName: f,
                mergeDriver: y
              }).then(async (Z) => {
                if (Z.cleanMerge)
                  m || n.insert({ filepath: F, oid: Z.mergeResult.oid, stage: 0 });
                else if (R.push(F), T.push(F), !m) {
                  const Q = await A.oid(), ce = await I.oid(), X = await U.oid();
                  n.delete({ filepath: F }), n.insert({ filepath: F, oid: Q, stage: 1 }), n.insert({ filepath: F, oid: ce, stage: 2 }), n.insert({ filepath: F, oid: X, stage: 3 });
                }
                return Z.mergeResult;
              });
            if (A && !I && U && await A.type() === "blob" && await U.type() === "blob") {
              if (R.push(F), S.push(F), !m) {
                const Z = await A.oid(), Q = await U.oid();
                n.delete({ filepath: F }), n.insert({ filepath: F, oid: Z, stage: 1 }), n.insert({ filepath: F, oid: Q, stage: 3 });
              }
              return {
                mode: await U.mode(),
                oid: await U.oid(),
                type: "blob",
                path: P
              };
            }
            if (A && I && !U && await A.type() === "blob" && await I.type() === "blob") {
              if (R.push(F), N.push(F), !m) {
                const Z = await A.oid(), Q = await I.oid();
                n.delete({ filepath: F }), n.insert({ filepath: F, oid: Z, stage: 1 }), n.insert({ filepath: F, oid: Q, stage: 2 });
              }
              return {
                mode: await I.mode(),
                oid: await I.oid(),
                type: "blob",
                path: P
              };
            }
            if (A && !I && !U && await A.type() === "blob")
              return;
            throw new pr();
          }
        }
      },
      /**
       * @param {TreeEntry} [parent]
       * @param {Array<TreeEntry>} children
       */
      reduce: R.length !== 0 && (!t || m) ? void 0 : async (F, I) => {
        const A = I.filter(Boolean);
        if (F && !(F && F.type === "tree" && A.length === 0)) {
          if (A.length > 0) {
            const P = new bt(A).toObject(), G = await ti({
              fs: i,
              gitdir: r,
              type: "tree",
              object: P,
              dryRun: w
            });
            F.oid = G;
          }
          return F;
        }
      }
    });
    return R.length !== 0 ? (t && !m && await qi({
      fs: i,
      cache: e,
      dir: t,
      gitdir: r,
      trees: [sr({ ref: D.oid })],
      map: async function(F, [I]) {
        const A = `${t}/${F}`;
        if (await I.type() === "blob") {
          const U = await I.mode(), P = new TextDecoder().decode(await I.content());
          await i.write(A, P, { mode: U });
        }
        return !0;
      }
    }), new mr(
      R,
      T,
      S,
      N
    )) : D.oid;
  }
  async function rc({
    fs: i,
    gitdir: e,
    path: t,
    ours: r,
    base: n,
    theirs: a,
    ourName: s,
    theirName: o,
    baseName: l,
    dryRun: d,
    mergeDriver: f = ec
  }) {
    const w = "blob", m = await n.mode() === await r.mode() ? await a.mode() : await r.mode();
    if (await r.oid() === await a.oid())
      return {
        cleanMerge: !0,
        mergeResult: { mode: m, path: t, oid: await r.oid(), type: w }
      };
    if (await r.oid() === await n.oid())
      return {
        cleanMerge: !0,
        mergeResult: { mode: m, path: t, oid: await a.oid(), type: w }
      };
    if (await a.oid() === await n.oid())
      return {
        cleanMerge: !0,
        mergeResult: { mode: m, path: t, oid: await r.oid(), type: w }
      };
    const y = ne.from(await r.content()).toString("utf8"), k = ne.from(await n.content()).toString("utf8"), x = ne.from(await a.content()).toString("utf8"), { mergedText: E, cleanMerge: R } = await f({
      branches: [l, s, o],
      contents: [k, y, x],
      path: t
    }), T = await ti({
      fs: i,
      gitdir: e,
      type: "blob",
      object: ne.from(E, "utf8"),
      dryRun: d
    });
    return { cleanMerge: R, mergeResult: { mode: m, path: t, oid: T, type: w } };
  }
  async function ic({
    fs: i,
    cache: e,
    dir: t,
    gitdir: r,
    ours: n,
    theirs: a,
    fastForward: s = !0,
    fastForwardOnly: o = !1,
    dryRun: l = !1,
    noUpdateBranch: d = !1,
    abortOnConflict: f = !0,
    message: w,
    author: m,
    committer: y,
    signingKey: k,
    onSign: x,
    mergeDriver: E
  }) {
    n === void 0 && (n = await ri({ fs: i, gitdir: r, fullname: !0 })), n = await se.expand({
      fs: i,
      gitdir: r,
      ref: n
    }), a = await se.expand({
      fs: i,
      gitdir: r,
      ref: a
    });
    const R = await se.resolve({
      fs: i,
      gitdir: r,
      ref: n
    }), T = await se.resolve({
      fs: i,
      gitdir: r,
      ref: a
    }), S = await ja({
      fs: i,
      cache: e,
      gitdir: r,
      oids: [R, T]
    });
    if (S.length !== 1)
      throw new pr();
    const N = S[0];
    if (N === T)
      return {
        oid: R,
        alreadyMerged: !0
      };
    if (s && N === R)
      return !l && !d && await se.writeRef({ fs: i, gitdir: r, ref: n, value: T }), {
        oid: T,
        fastForward: !0
      };
    {
      if (o)
        throw new Gr();
      const D = await zt.acquire(
        { fs: i, gitdir: r, cache: e, allowUnmerged: !1 },
        async (I) => tc({
          fs: i,
          cache: e,
          dir: t,
          gitdir: r,
          index: I,
          ourOid: R,
          theirOid: T,
          baseOid: N,
          ourName: Vt(n),
          baseName: "base",
          theirName: Vt(a),
          dryRun: l,
          abortOnConflict: f,
          mergeDriver: E
        })
      );
      if (D instanceof mr) throw D;
      return w || (w = `Merge branch '${Vt(a)}' into ${Vt(
        n
      )}`), {
        oid: await Fo({
          fs: i,
          cache: e,
          gitdir: r,
          message: w,
          ref: n,
          tree: D,
          parent: [R, T],
          author: m,
          committer: y,
          signingKey: k,
          onSign: x,
          dryRun: l,
          noUpdateBranch: d
        }),
        tree: D,
        mergeCommit: !0
      };
    }
  }
  async function Ha({
    fs: i,
    cache: e,
    http: t,
    onProgress: r,
    onMessage: n,
    onAuth: a,
    onAuthSuccess: s,
    onAuthFailure: o,
    dir: l,
    gitdir: d,
    ref: f,
    url: w,
    remote: m,
    remoteRef: y,
    prune: k,
    pruneTags: x,
    fastForward: E,
    fastForwardOnly: R,
    corsProxy: T,
    singleBranch: S,
    headers: N,
    author: D,
    committer: F,
    signingKey: I
  }) {
    try {
      if (!f) {
        const P = await ri({ fs: i, gitdir: d });
        if (!P)
          throw new lt("ref");
        f = P;
      }
      const { fetchHead: A, fetchHeadDescription: U } = await cn({
        fs: i,
        cache: e,
        http: t,
        onProgress: r,
        onMessage: n,
        onAuth: a,
        onAuthSuccess: s,
        onAuthFailure: o,
        gitdir: d,
        corsProxy: T,
        ref: f,
        url: w,
        remote: m,
        remoteRef: y,
        singleBranch: S,
        headers: N,
        prune: k,
        pruneTags: x
      });
      await ic({
        fs: i,
        cache: e,
        gitdir: d,
        ours: f,
        theirs: A,
        fastForward: E,
        fastForwardOnly: R,
        message: `Merge ${U}`,
        author: D,
        committer: F,
        signingKey: I,
        dryRun: !1,
        noUpdateBranch: !1
      }), await sn({
        fs: i,
        cache: e,
        onProgress: r,
        dir: l,
        gitdir: d,
        ref: f,
        remote: m,
        noCheckout: !1
      });
    } catch (A) {
      throw A.caller = "git.pull", A;
    }
  }
  async function nc({
    fs: i,
    http: e,
    onProgress: t,
    onMessage: r,
    onAuth: n,
    onAuthSuccess: a,
    onAuthFailure: s,
    dir: o,
    gitdir: l = $e.join(o, ".git"),
    ref: d,
    url: f,
    remote: w,
    remoteRef: m,
    corsProxy: y,
    singleBranch: k,
    headers: x = {},
    cache: E = {}
  }) {
    try {
      Ce("fs", i), Ce("http", e), Ce("gitdir", l);
      const R = {
        name: "",
        email: "",
        timestamp: Date.now(),
        timezoneOffset: 0
      };
      return await Ha({
        fs: new Wt(i),
        cache: E,
        http: e,
        onProgress: t,
        onMessage: r,
        onAuth: n,
        onAuthSuccess: a,
        onAuthFailure: s,
        dir: o,
        gitdir: l,
        ref: d,
        url: f,
        remote: w,
        remoteRef: m,
        fastForwardOnly: !0,
        corsProxy: y,
        singleBranch: k,
        headers: x,
        author: R,
        committer: R
      });
    } catch (R) {
      throw R.caller = "git.fastForward", R;
    }
  }
  async function ac({
    fs: i,
    http: e,
    onProgress: t,
    onMessage: r,
    onAuth: n,
    onAuthSuccess: a,
    onAuthFailure: s,
    dir: o,
    gitdir: l = $e.join(o, ".git"),
    ref: d,
    remote: f,
    remoteRef: w,
    url: m,
    corsProxy: y,
    depth: k = null,
    since: x = null,
    exclude: E = [],
    relative: R = !1,
    tags: T = !1,
    singleBranch: S = !1,
    headers: N = {},
    prune: D = !1,
    pruneTags: F = !1,
    cache: I = {}
  }) {
    try {
      return Ce("fs", i), Ce("http", e), Ce("gitdir", l), await cn({
        fs: new Wt(i),
        cache: I,
        http: e,
        onProgress: t,
        onMessage: r,
        onAuth: n,
        onAuthSuccess: a,
        onAuthFailure: s,
        gitdir: l,
        ref: d,
        remote: f,
        remoteRef: w,
        url: m,
        corsProxy: y,
        depth: k,
        since: x,
        exclude: E,
        relative: R,
        tags: T,
        singleBranch: S,
        headers: N,
        prune: D,
        pruneTags: F
      });
    } catch (A) {
      throw A.caller = "git.fetch", A;
    }
  }
  function sc(i, e, t, r) {
    const n = [];
    for (const [a, s] of i.refs) {
      if (e && !a.startsWith(e)) continue;
      if (a.endsWith("^{}")) {
        if (r) {
          const l = a.replace("^{}", ""), d = n[n.length - 1], f = d.ref === l ? d : n.find((w) => w.ref === l);
          if (f === void 0)
            throw new Error("I did not expect this to happen");
          f.peeled = s;
        }
        continue;
      }
      const o = { ref: a, oid: s };
      t && i.symrefs.has(a) && (o.target = i.symrefs.get(a)), n.push(o);
    }
    return n;
  }
  async function oc({
    fs: i,
    cache: e,
    gitdir: t,
    oid: r,
    ancestor: n,
    depth: a
  }) {
    const s = await hr.read({ fs: i, gitdir: t });
    if (!r)
      throw new lt("oid");
    if (r === n) return !1;
    const o = [r], l = /* @__PURE__ */ new Set();
    let d = 0;
    for (; o.length; ) {
      if (d++ === a)
        throw new Yr(a);
      const f = o.shift(), { type: w, object: m } = await Ye({
        fs: i,
        cache: e,
        gitdir: t,
        oid: f
      });
      if (w !== "commit")
        throw new $t(f, w, "commit");
      const y = Pe.from(m).parse();
      for (const k of y.parent)
        if (k === n) return !0;
      if (!s.has(f))
        for (const k of y.parent)
          l.has(k) || (o.push(k), l.add(k));
    }
    return !1;
  }
  async function cc(i) {
    const e = Me.streamReader(i), t = [];
    let r;
    for (; r = await e(), r !== !0; ) {
      if (r === null) continue;
      r = r.toString("utf8").replace(/\n$/, "");
      const [n, a, ...s] = r.split(" "), o = { ref: a, oid: n };
      for (const l of s) {
        const [d, f] = l.split(":");
        d === "symref-target" ? o.target = f : d === "peeled" && (o.peeled = f);
      }
      t.push(o);
    }
    return t;
  }
  async function lc({ prefix: i, symrefs: e, peelTags: t }) {
    const r = [];
    return r.push(Me.encode(`command=ls-refs
`)), r.push(Me.encode(`agent=${on.agent}
`)), (t || e || i) && r.push(Me.delim()), t && r.push(Me.encode("peel")), e && r.push(Me.encode("symrefs")), i && r.push(Me.encode(`ref-prefix ${i}`)), r.push(Me.flush()), r;
  }
  async function uc({
    http: i,
    onAuth: e,
    onAuthSuccess: t,
    onAuthFailure: r,
    corsProxy: n,
    url: a,
    headers: s = {},
    forPush: o = !1,
    protocolVersion: l = 2,
    prefix: d,
    symrefs: f,
    peelTags: w
  }) {
    try {
      Ce("http", i), Ce("url", a);
      const m = await Nr.discover({
        http: i,
        onAuth: e,
        onAuthSuccess: t,
        onAuthFailure: r,
        corsProxy: n,
        service: o ? "git-receive-pack" : "git-upload-pack",
        url: a,
        headers: s,
        protocolVersion: l
      });
      if (m.protocolVersion === 1)
        return sc(m, d, f, w);
      const y = await lc({ prefix: d, symrefs: f, peelTags: w }), k = await Nr.connect({
        http: i,
        auth: m.auth,
        headers: s,
        corsProxy: n,
        service: o ? "git-receive-pack" : "git-upload-pack",
        url: a,
        body: y
      });
      return cc(k.body);
    } catch (m) {
      throw m.caller = "git.listServerRefs", m;
    }
  }
  function fc(i, e) {
    return i.committer.timestamp - e.committer.timestamp;
  }
  const hc = "e69de29bb2d1d6434b8b29ae775ad8c2e48c5391";
  async function oa({ fs: i, cache: e, gitdir: t, oid: r, fileId: n }) {
    if (n === hc) return;
    const a = r;
    let s;
    const o = await fr({ fs: i, cache: e, gitdir: t, oid: r }), l = o.tree;
    return n === o.oid ? s = o.path : (s = await qa({
      fs: i,
      cache: e,
      gitdir: t,
      tree: l,
      fileId: n,
      oid: a
    }), Array.isArray(s) && (s.length === 0 ? s = void 0 : s.length === 1 && (s = s[0]))), s;
  }
  async function qa({
    fs: i,
    cache: e,
    gitdir: t,
    tree: r,
    fileId: n,
    oid: a,
    filepaths: s = [],
    parentPath: o = ""
  }) {
    const l = r.entries().map(function(d) {
      let f;
      return d.oid === n ? (f = $e.join(o, d.path), s.push(f)) : d.type === "tree" && (f = Ye({
        fs: i,
        cache: e,
        gitdir: t,
        oid: d.oid
      }).then(function({ object: w }) {
        return qa({
          fs: i,
          cache: e,
          gitdir: t,
          tree: bt.from(w),
          fileId: n,
          oid: a,
          filepaths: s,
          parentPath: $e.join(o, d.path)
        });
      })), f;
    });
    return await Promise.all(l), s;
  }
  async function dc({
    fs: i,
    cache: e,
    gitdir: t,
    filepath: r,
    ref: n,
    depth: a,
    since: s,
    force: o,
    follow: l
  }) {
    const d = typeof s > "u" ? void 0 : Math.floor(s.valueOf() / 1e3), f = [], w = await hr.read({ fs: i, gitdir: t }), m = await se.resolve({ fs: i, gitdir: t, ref: n }), y = [await Vi({ fs: i, cache: e, gitdir: t, oid: m })];
    let k, x, E;
    function R(T) {
      E && r && f.push(T);
    }
    for (; y.length > 0; ) {
      const T = y.pop();
      if (d !== void 0 && T.commit.committer.timestamp <= d)
        break;
      if (r) {
        let S;
        try {
          S = await Po({
            fs: i,
            cache: e,
            gitdir: t,
            oid: T.commit.tree,
            filepath: r
          }), x && k !== S && f.push(x), k = S, x = T, E = !0;
        } catch (N) {
          if (N instanceof et) {
            let D = l && k;
            if (D && (D = await oa({
              fs: i,
              cache: e,
              gitdir: t,
              oid: T.commit.tree,
              fileId: k
            }), D))
              if (Array.isArray(D)) {
                if (x) {
                  const F = await oa({
                    fs: i,
                    cache: e,
                    gitdir: t,
                    oid: x.commit.tree,
                    fileId: k
                  });
                  if (Array.isArray(F))
                    if (D = D.filter((I) => F.indexOf(I) === -1), D.length === 1)
                      D = D[0], r = D, x && f.push(x);
                    else {
                      D = !1, x && f.push(x);
                      break;
                    }
                }
              } else
                r = D, x && f.push(x);
            if (!D) {
              if (E && k && (f.push(x), !o))
                break;
              if (!o && !l) throw N;
            }
            x = T, E = !1;
          } else throw N;
        }
      } else
        f.push(T);
      if (a !== void 0 && f.length === a) {
        R(T);
        break;
      }
      if (!w.has(T.oid))
        for (const S of T.commit.parent) {
          const N = await Vi({ fs: i, cache: e, gitdir: t, oid: S });
          y.map((D) => D.oid).includes(N.oid) || y.push(N);
        }
      y.length === 0 && R(T), y.sort((S, N) => fc(S.commit, N.commit));
    }
    return f;
  }
  async function wc({
    fs: i,
    dir: e,
    gitdir: t = $e.join(e, ".git"),
    filepath: r,
    ref: n = "HEAD",
    depth: a,
    since: s,
    // Date
    force: o,
    follow: l,
    cache: d = {}
  }) {
    try {
      return Ce("fs", i), Ce("gitdir", t), Ce("ref", n), await dc({
        fs: new Wt(i),
        cache: d,
        gitdir: t,
        filepath: r,
        ref: n,
        depth: a,
        since: s,
        force: o,
        follow: l
      });
    } catch (f) {
      throw f.caller = "git.log", f;
    }
  }
  const pc = {
    commit: 16,
    tree: 32,
    blob: 48,
    tag: 64,
    ofs_delta: 96,
    ref_delta: 112
  };
  async function mc({
    fs: i,
    cache: e,
    dir: t,
    gitdir: r = $e.join(t, ".git"),
    oids: n
  }) {
    const a = new ma(), s = [];
    function o(f, w) {
      const m = ne.from(f, w);
      s.push(m), a.update(m);
    }
    async function l({ stype: f, object: w }) {
      const m = pc[f];
      let y = w.length, k = y > 15 ? 128 : 0;
      const x = y & 15;
      y = y >>> 4;
      let E = (k | m | x).toString(16);
      for (o(E, "hex"); k; )
        k = y > 127 ? 128 : 0, E = k | y & 127, o(Yi(2, E), "hex"), y = y >>> 7;
      o(ne.from(await Oa(w)));
    }
    o("PACK"), o("00000002", "hex"), o(Yi(8, n.length), "hex");
    for (const f of n) {
      const { type: w, object: m } = await Ye({ fs: i, cache: e, gitdir: r, oid: f });
      await l({ object: m, stype: w });
    }
    const d = a.digest();
    return s.push(d), s;
  }
  async function _c({
    fs: i,
    http: e,
    onProgress: t,
    onMessage: r,
    onAuth: n,
    onAuthSuccess: a,
    onAuthFailure: s,
    dir: o,
    gitdir: l = $e.join(o, ".git"),
    ref: d,
    url: f,
    remote: w,
    remoteRef: m,
    prune: y = !1,
    pruneTags: k = !1,
    fastForward: x = !0,
    fastForwardOnly: E = !1,
    corsProxy: R,
    singleBranch: T,
    headers: S = {},
    author: N,
    committer: D,
    signingKey: F,
    cache: I = {}
  }) {
    try {
      Ce("fs", i), Ce("gitdir", l);
      const A = new Wt(i), U = await Zi({ fs: A, gitdir: l, author: N });
      if (!U) throw new Ht("author");
      const P = await Gi({
        fs: A,
        gitdir: l,
        author: U,
        committer: D
      });
      if (!P) throw new Ht("committer");
      return await Ha({
        fs: A,
        cache: I,
        http: e,
        onProgress: t,
        onMessage: r,
        onAuth: n,
        onAuthSuccess: a,
        onAuthFailure: s,
        dir: o,
        gitdir: l,
        ref: d,
        url: f,
        remote: w,
        remoteRef: m,
        fastForward: x,
        fastForwardOnly: E,
        corsProxy: R,
        singleBranch: T,
        headers: S,
        author: U,
        committer: P,
        signingKey: F,
        prune: y,
        pruneTags: k
      });
    } catch (A) {
      throw A.caller = "git.pull", A;
    }
  }
  async function gc({
    fs: i,
    cache: e,
    dir: t,
    gitdir: r = $e.join(t, ".git"),
    start: n,
    finish: a
  }) {
    const s = await hr.read({ fs: i, gitdir: r }), o = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set();
    for (const w of n)
      o.add(await se.resolve({ fs: i, gitdir: r, ref: w }));
    for (const w of a)
      try {
        const m = await se.resolve({ fs: i, gitdir: r, ref: w });
        l.add(m);
      } catch {
      }
    const d = /* @__PURE__ */ new Set();
    async function f(w) {
      d.add(w);
      const { type: m, object: y } = await Ye({ fs: i, cache: e, gitdir: r, oid: w });
      if (m === "tag") {
        const x = Bt.from(y).headers().object;
        return f(x);
      }
      if (m !== "commit")
        throw new $t(w, m, "commit");
      if (!s.has(w)) {
        const x = Pe.from(y).headers().parent;
        for (w of x)
          !l.has(w) && !d.has(w) && await f(w);
      }
    }
    for (const w of o)
      await f(w);
    return d;
  }
  async function Di({
    fs: i,
    cache: e,
    dir: t,
    gitdir: r = $e.join(t, ".git"),
    oids: n
  }) {
    const a = /* @__PURE__ */ new Set();
    async function s(o) {
      if (a.has(o)) return;
      a.add(o);
      const { type: l, object: d } = await Ye({ fs: i, cache: e, gitdir: r, oid: o });
      if (l === "tag") {
        const w = Bt.from(d).headers().object;
        await s(w);
      } else if (l === "commit") {
        const w = Pe.from(d).headers().tree;
        await s(w);
      } else if (l === "tree") {
        const f = bt.from(d);
        for (const w of f)
          w.type === "blob" && a.add(w.oid), w.type === "tree" && await s(w.oid);
      }
    }
    for (const o of n)
      await s(o);
    return a;
  }
  async function yc(i) {
    const e = {};
    let t = "";
    const r = Me.streamReader(i);
    let n = await r();
    for (; n !== !0; )
      n !== null && (t += n.toString("utf8") + `
`), n = await r();
    const a = t.toString("utf8").split(`
`);
    if (n = a.shift(), !n.startsWith("unpack "))
      throw new Kt('unpack ok" or "unpack [error message]', n);
    e.ok = n === "unpack ok", e.ok || (e.error = n.slice(7)), e.refs = {};
    for (const s of a) {
      if (s.trim() === "") continue;
      const o = s.slice(0, 2), l = s.slice(3);
      let d = l.indexOf(" ");
      d === -1 && (d = l.length);
      const f = l.slice(0, d), w = l.slice(d + 1);
      e.refs[f] = {
        ok: o === "ok",
        error: w
      };
    }
    return e;
  }
  async function vc({
    capabilities: i = [],
    triplets: e = []
  }) {
    const t = [];
    let r = `\0 ${i.join(" ")}`;
    for (const n of e)
      t.push(
        Me.encode(
          `${n.oldoid} ${n.oid} ${n.fullRef}${r}
`
        )
      ), r = "";
    return t.push(Me.flush()), t;
  }
  async function bc({
    fs: i,
    cache: e,
    http: t,
    onProgress: r,
    onMessage: n,
    onAuth: a,
    onAuthSuccess: s,
    onAuthFailure: o,
    onPrePush: l,
    gitdir: d,
    ref: f,
    remoteRef: w,
    remote: m,
    url: y,
    force: k = !1,
    delete: x = !1,
    corsProxy: E,
    headers: R = {}
  }) {
    const T = f || await ri({ fs: i, gitdir: d });
    if (typeof T > "u")
      throw new lt("ref");
    const S = await ut.get({ fs: i, gitdir: d });
    m = m || await S.get(`branch.${T}.pushRemote`) || await S.get("remote.pushDefault") || await S.get(`branch.${T}.remote`) || "origin";
    const N = y || await S.get(`remote.${m}.pushurl`) || await S.get(`remote.${m}.url`);
    if (typeof N > "u")
      throw new lt("remote OR url");
    const D = w || await S.get(`branch.${T}.merge`);
    if (typeof N > "u")
      throw new lt("remoteRef");
    E === void 0 && (E = await S.get("http.corsProxy"));
    const F = await se.expand({ fs: i, gitdir: d, ref: T }), I = x ? "0000000000000000000000000000000000000000" : await se.resolve({ fs: i, gitdir: d, ref: F }), A = Ma.getRemoteHelperFor({ url: N }), U = await A.discover({
      http: t,
      onAuth: a,
      onAuthSuccess: s,
      onAuthFailure: o,
      corsProxy: E,
      service: "git-receive-pack",
      url: N,
      headers: R,
      protocolVersion: 1
    }), P = U.auth;
    let G;
    if (!D)
      G = F;
    else
      try {
        G = await se.expandAgainstMap({
          ref: D,
          map: U.refs
        });
      } catch (ue) {
        if (ue instanceof et)
          G = D.startsWith("refs/") ? D : `refs/heads/${D}`;
        else
          throw ue;
      }
    const $ = U.refs.get(G) || "0000000000000000000000000000000000000000";
    if (l && !await l({
      remote: m,
      url: N,
      localRef: { ref: x ? "(delete)" : F, oid: I },
      remoteRef: { ref: G, oid: $ }
    }))
      throw new _r();
    const Z = !U.capabilities.has("no-thin");
    let Q = /* @__PURE__ */ new Set();
    if (!x) {
      const ue = [...U.refs.values()];
      let ve = /* @__PURE__ */ new Set();
      if ($ !== "0000000000000000000000000000000000000000") {
        const be = await ja({
          fs: i,
          cache: e,
          gitdir: d,
          oids: [I, $]
        });
        for (const Be of be) ue.push(Be);
        Z && (ve = await Di({ fs: i, cache: e, gitdir: d, oids: be }));
      }
      if (!ue.includes(I)) {
        const be = await gc({
          fs: i,
          cache: e,
          gitdir: d,
          start: [I],
          finish: ue
        });
        Q = await Di({ fs: i, cache: e, gitdir: d, oids: be });
      }
      if (Z) {
        try {
          const be = await se.resolve({
            fs: i,
            gitdir: d,
            ref: `refs/remotes/${m}/HEAD`,
            depth: 2
          }), { oid: Be } = await se.resolveAgainstMap({
            ref: be.replace(`refs/remotes/${m}/`, ""),
            fullref: be,
            map: U.refs
          }), we = [Be];
          for (const he of await Di({ fs: i, cache: e, gitdir: d, oids: we }))
            ve.add(he);
        } catch {
        }
        for (const be of ve)
          Q.delete(be);
      }
      if (I === $ && (k = !0), !k) {
        if (F.startsWith("refs/tags") && $ !== "0000000000000000000000000000000000000000")
          throw new ur("tag-exists");
        if (I !== "0000000000000000000000000000000000000000" && $ !== "0000000000000000000000000000000000000000" && !await oc({
          fs: i,
          cache: e,
          gitdir: d,
          oid: I,
          ancestor: $,
          depth: -1
        }))
          throw new ur("not-fast-forward");
      }
    }
    const ce = Ua(
      [...U.capabilities],
      ["report-status", "side-band-64k", `agent=${on.agent}`]
    ), X = await vc({
      capabilities: ce,
      triplets: [{ oldoid: $, oid: I, fullRef: G }]
    }), H = x ? [] : await mc({
      fs: i,
      cache: e,
      gitdir: d,
      oids: [...Q]
    }), K = await A.connect({
      http: t,
      onProgress: r,
      corsProxy: E,
      service: "git-receive-pack",
      url: N,
      auth: P,
      headers: R,
      body: [...X, ...H]
    }), { packfile: ie, progress: de } = await La.demux(K.body);
    if (n) {
      const ue = za(de);
      gr(ue, async (ve) => {
        await n(ve);
      });
    }
    const _e = await yc(ie);
    if (K.headers && (_e.headers = K.headers), m && _e.ok && _e.refs[G].ok && !F.startsWith("refs/tags")) {
      const ue = `refs/remotes/${m}/${G.replace(
        "refs/heads",
        ""
      )}`;
      x ? await se.deleteRef({ fs: i, gitdir: d, ref: ue }) : await se.writeRef({ fs: i, gitdir: d, ref: ue, value: I });
    }
    if (_e.ok && Object.values(_e.refs).every((ue) => ue.ok))
      return _e;
    {
      const ue = Object.entries(_e.refs).filter(([ve, be]) => !be.ok).map(([ve, be]) => `
  - ${ve}: ${be.error}`).join("");
      throw new Vr(ue, _e);
    }
  }
  async function Ec({
    fs: i,
    http: e,
    onProgress: t,
    onMessage: r,
    onAuth: n,
    onAuthSuccess: a,
    onAuthFailure: s,
    onPrePush: o,
    dir: l,
    gitdir: d = $e.join(l, ".git"),
    ref: f,
    remoteRef: w,
    remote: m = "origin",
    url: y,
    force: k = !1,
    delete: x = !1,
    corsProxy: E,
    headers: R = {},
    cache: T = {}
  }) {
    try {
      return Ce("fs", i), Ce("http", e), Ce("gitdir", d), await bc({
        fs: new Wt(i),
        cache: T,
        http: e,
        onProgress: t,
        onMessage: r,
        onAuth: n,
        onAuthSuccess: a,
        onAuthFailure: s,
        onPrePush: o,
        gitdir: d,
        ref: f,
        remoteRef: w,
        remote: m,
        url: y,
        force: k,
        delete: x,
        corsProxy: E,
        headers: R
      });
    } catch (S) {
      throw S.caller = "git.push", S;
    }
  }
  function kc(i) {
    let e = [i];
    return {
      next() {
        return Promise.resolve({ done: e.length === 0, value: e.pop() });
      },
      return() {
        return e = [], {};
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }
  function xc(i) {
    return i[Symbol.asyncIterator] ? i[Symbol.asyncIterator]() : i[Symbol.iterator] ? i[Symbol.iterator]() : i.next ? i : kc(i);
  }
  async function Sc(i, e) {
    const t = xc(i);
    for (; ; ) {
      const { value: r, done: n } = await t.next();
      if (r && await e(r), n) break;
    }
    t.return && t.return();
  }
  async function Ic(i) {
    let e = 0;
    const t = [];
    await Sc(i, (a) => {
      t.push(a), e += a.byteLength;
    });
    const r = new Uint8Array(e);
    let n = 0;
    for (const a of t)
      r.set(a, n), n += a.byteLength;
    return r;
  }
  function Tc(i) {
    if (i[Symbol.asyncIterator]) return i;
    const e = i.getReader();
    return {
      next() {
        return e.read();
      },
      return() {
        return e.releaseLock(), {};
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }
  async function Wa({
    onProgress: i,
    url: e,
    method: t = "GET",
    headers: r = {},
    body: n
  }) {
    n && (n = await Ic(n));
    const a = await fetch(e, { method: t, headers: r, body: n }), s = a.body && a.body.getReader ? Tc(a.body) : [new Uint8Array(await a.arrayBuffer())];
    r = {};
    for (const [o, l] of a.headers.entries())
      r[o] = l;
    return {
      url: a.url,
      method: a.method,
      statusCode: a.status,
      statusMessage: a.statusText,
      body: s,
      headers: r
    };
  }
  var $c = { request: Wa };
  const Ac = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: $c,
    request: Wa
  }, Symbol.toStringTag, { value: "Module" }));
  (function(i, e) {
    typeof Tr == "object" && typeof Ki == "object" ? Ki.exports = e() : typeof define == "function" && define.amd ? define([], e) : typeof Tr == "object" ? Tr.LightningFS = e() : i.LightningFS = e();
  })(self, function() {
    return function(i) {
      var e = {};
      function t(r) {
        if (e[r]) return e[r].exports;
        var n = e[r] = { i: r, l: !1, exports: {} };
        return i[r].call(n.exports, n, n.exports, t), n.l = !0, n.exports;
      }
      return t.m = i, t.c = e, t.d = function(r, n, a) {
        t.o(r, n) || Object.defineProperty(r, n, { enumerable: !0, get: a });
      }, t.r = function(r) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r, "__esModule", { value: !0 });
      }, t.t = function(r, n) {
        if (1 & n && (r = t(r)), 8 & n || 4 & n && typeof r == "object" && r && r.__esModule) return r;
        var a = /* @__PURE__ */ Object.create(null);
        if (t.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: r }), 2 & n && typeof r != "string") for (var s in r) t.d(a, s, function(o) {
          return r[o];
        }.bind(null, s));
        return a;
      }, t.n = function(r) {
        var n = r && r.__esModule ? function() {
          return r.default;
        } : function() {
          return r;
        };
        return t.d(n, "a", n), n;
      }, t.o = function(r, n) {
        return Object.prototype.hasOwnProperty.call(r, n);
      }, t.p = "", t(t.s = 3);
    }([function(i, e) {
      function t(s) {
        if (s.length === 0) return ".";
        let o = n(s);
        return o = o.reduce(a, []), r(...o);
      }
      function r(...s) {
        if (s.length === 0) return "";
        let o = s.join("/");
        return o = o.replace(/\/{2,}/g, "/");
      }
      function n(s) {
        if (s.length === 0) return [];
        if (s === "/") return ["/"];
        let o = s.split("/");
        return o[o.length - 1] === "" && o.pop(), s[0] === "/" ? o[0] = "/" : o[0] !== "." && o.unshift("."), o;
      }
      function a(s, o) {
        if (s.length === 0) return s.push(o), s;
        if (o === ".") return s;
        if (o === "..") {
          if (s.length === 1) {
            if (s[0] === "/") throw new Error("Unable to normalize path - traverses above root directory");
            if (s[0] === ".") return s.push(o), s;
          }
          return s[s.length - 1] === ".." ? (s.push(".."), s) : (s.pop(), s);
        }
        return s.push(o), s;
      }
      i.exports = { join: r, normalize: t, split: n, basename: function(s) {
        if (s === "/") throw new Error(`Cannot get basename of "${s}"`);
        const o = s.lastIndexOf("/");
        return o === -1 ? s : s.slice(o + 1);
      }, dirname: function(s) {
        const o = s.lastIndexOf("/");
        if (o === -1) throw new Error(`Cannot get dirname of "${s}"`);
        return o === 0 ? "/" : s.slice(0, o);
      }, resolve: function(...s) {
        let o = "";
        for (let l of s) o = l.startsWith("/") ? l : t(r(o, l));
        return o;
      } };
    }, function(i, e) {
      function t(l) {
        return class extends Error {
          constructor(...d) {
            super(...d), this.code = l, this.message ? this.message = l + ": " + this.message : this.message = l;
          }
        };
      }
      const r = t("EEXIST"), n = t("ENOENT"), a = t("ENOTDIR"), s = t("ENOTEMPTY"), o = t("ETIMEDOUT");
      i.exports = { EEXIST: r, ENOENT: n, ENOTDIR: a, ENOTEMPTY: s, ETIMEDOUT: o };
    }, function(i, e, t) {
      t.r(e), t.d(e, "Store", function() {
        return r;
      }), t.d(e, "get", function() {
        return s;
      }), t.d(e, "set", function() {
        return o;
      }), t.d(e, "update", function() {
        return l;
      }), t.d(e, "del", function() {
        return d;
      }), t.d(e, "clear", function() {
        return f;
      }), t.d(e, "keys", function() {
        return w;
      }), t.d(e, "close", function() {
        return m;
      });
      class r {
        constructor(k = "keyval-store", x = "keyval") {
          this.storeName = x, this._dbName = k, this._storeName = x, this._init();
        }
        _init() {
          this._dbp || (this._dbp = new Promise((k, x) => {
            const E = indexedDB.open(this._dbName);
            E.onerror = () => x(E.error), E.onsuccess = () => k(E.result), E.onupgradeneeded = () => {
              E.result.createObjectStore(this._storeName);
            };
          }));
        }
        _withIDBStore(k, x) {
          return this._init(), this._dbp.then((E) => new Promise((R, T) => {
            const S = E.transaction(this.storeName, k);
            S.oncomplete = () => R(), S.onabort = S.onerror = () => T(S.error), x(S.objectStore(this.storeName));
          }));
        }
        _close() {
          return this._init(), this._dbp.then((k) => {
            k.close(), this._dbp = void 0;
          });
        }
      }
      let n;
      function a() {
        return n || (n = new r()), n;
      }
      function s(y, k = a()) {
        let x;
        return k._withIDBStore("readwrite", (E) => {
          x = E.get(y);
        }).then(() => x.result);
      }
      function o(y, k, x = a()) {
        return x._withIDBStore("readwrite", (E) => {
          E.put(k, y);
        });
      }
      function l(y, k, x = a()) {
        return x._withIDBStore("readwrite", (E) => {
          const R = E.get(y);
          R.onsuccess = () => {
            E.put(k(R.result), y);
          };
        });
      }
      function d(y, k = a()) {
        return k._withIDBStore("readwrite", (x) => {
          x.delete(y);
        });
      }
      function f(y = a()) {
        return y._withIDBStore("readwrite", (k) => {
          k.clear();
        });
      }
      function w(y = a()) {
        const k = [];
        return y._withIDBStore("readwrite", (x) => {
          (x.openKeyCursor || x.openCursor).call(x).onsuccess = function() {
            this.result && (k.push(this.result.key), this.result.continue());
          };
        }).then(() => k);
      }
      function m(y = a()) {
        return y._close();
      }
    }, function(i, e, t) {
      const r = t(4), n = t(5);
      function a(s, o) {
        return typeof s == "function" && (o = s), [(...l) => o(null, ...l), o = r(o)];
      }
      i.exports = class {
        constructor(...s) {
          this.promises = new n(...s), this.init = this.init.bind(this), this.readFile = this.readFile.bind(this), this.writeFile = this.writeFile.bind(this), this.unlink = this.unlink.bind(this), this.readdir = this.readdir.bind(this), this.mkdir = this.mkdir.bind(this), this.rmdir = this.rmdir.bind(this), this.rename = this.rename.bind(this), this.stat = this.stat.bind(this), this.lstat = this.lstat.bind(this), this.readlink = this.readlink.bind(this), this.symlink = this.symlink.bind(this), this.backFile = this.backFile.bind(this), this.du = this.du.bind(this), this.flush = this.flush.bind(this);
        }
        init(s, o) {
          return this.promises.init(s, o);
        }
        readFile(s, o, l) {
          const [d, f] = a(o, l);
          this.promises.readFile(s, o).then(d).catch(f);
        }
        writeFile(s, o, l, d) {
          const [f, w] = a(l, d);
          this.promises.writeFile(s, o, l).then(f).catch(w);
        }
        unlink(s, o, l) {
          const [d, f] = a(o, l);
          this.promises.unlink(s, o).then(d).catch(f);
        }
        readdir(s, o, l) {
          const [d, f] = a(o, l);
          this.promises.readdir(s, o).then(d).catch(f);
        }
        mkdir(s, o, l) {
          const [d, f] = a(o, l);
          this.promises.mkdir(s, o).then(d).catch(f);
        }
        rmdir(s, o, l) {
          const [d, f] = a(o, l);
          this.promises.rmdir(s, o).then(d).catch(f);
        }
        rename(s, o, l) {
          const [d, f] = a(l);
          this.promises.rename(s, o).then(d).catch(f);
        }
        stat(s, o, l) {
          const [d, f] = a(o, l);
          this.promises.stat(s).then(d).catch(f);
        }
        lstat(s, o, l) {
          const [d, f] = a(o, l);
          this.promises.lstat(s).then(d).catch(f);
        }
        readlink(s, o, l) {
          const [d, f] = a(o, l);
          this.promises.readlink(s).then(d).catch(f);
        }
        symlink(s, o, l) {
          const [d, f] = a(l);
          this.promises.symlink(s, o).then(d).catch(f);
        }
        backFile(s, o, l) {
          const [d, f] = a(o, l);
          this.promises.backFile(s, o).then(d).catch(f);
        }
        du(s, o) {
          const [l, d] = a(o);
          this.promises.du(s).then(l).catch(d);
        }
        flush(s) {
          const [o, l] = a(s);
          this.promises.flush().then(o).catch(l);
        }
      };
    }, function(i, e) {
      i.exports = function(t) {
        var r, n;
        if (typeof t != "function") throw new Error("expected a function but got " + t);
        return function() {
          return r ? n : (r = !0, n = t.apply(this, arguments));
        };
      };
    }, function(i, e, t) {
      const r = t(6), n = t(16), a = t(0);
      function s(d, f, ...w) {
        return f !== void 0 && typeof f != "function" || (f = {}), typeof f == "string" && (f = { encoding: f }), [d = a.normalize(d), f, ...w];
      }
      function o(d, f, w, ...m) {
        return w !== void 0 && typeof w != "function" || (w = {}), typeof w == "string" && (w = { encoding: w }), [d = a.normalize(d), f, w, ...m];
      }
      function l(d, f, ...w) {
        return [a.normalize(d), a.normalize(f), ...w];
      }
      i.exports = class {
        constructor(d, f = {}) {
          this.init = this.init.bind(this), this.readFile = this._wrap(this.readFile, s, !1), this.writeFile = this._wrap(this.writeFile, o, !0), this.unlink = this._wrap(this.unlink, s, !0), this.readdir = this._wrap(this.readdir, s, !1), this.mkdir = this._wrap(this.mkdir, s, !0), this.rmdir = this._wrap(this.rmdir, s, !0), this.rename = this._wrap(this.rename, l, !0), this.stat = this._wrap(this.stat, s, !1), this.lstat = this._wrap(this.lstat, s, !1), this.readlink = this._wrap(this.readlink, s, !1), this.symlink = this._wrap(this.symlink, l, !0), this.backFile = this._wrap(this.backFile, s, !0), this.du = this._wrap(this.du, s, !1), this._deactivationPromise = null, this._deactivationTimeout = null, this._activationPromise = null, this._operations = /* @__PURE__ */ new Set(), d && this.init(d, f);
        }
        async init(...d) {
          return this._initPromiseResolve && await this._initPromise, this._initPromise = this._init(...d), this._initPromise;
        }
        async _init(d, f = {}) {
          await this._gracefulShutdown(), this._activationPromise && await this._deactivate(), this._backend && this._backend.destroy && await this._backend.destroy(), this._backend = f.backend || new r(), this._backend.init && await this._backend.init(d, f), this._initPromiseResolve && (this._initPromiseResolve(), this._initPromiseResolve = null), f.defer || this.stat("/");
        }
        async _gracefulShutdown() {
          this._operations.size > 0 && (this._isShuttingDown = !0, await new Promise((d) => this._gracefulShutdownResolve = d), this._isShuttingDown = !1, this._gracefulShutdownResolve = null);
        }
        _wrap(d, f, w) {
          return async (...m) => {
            m = f(...m);
            let y = { name: d.name, args: m };
            this._operations.add(y);
            try {
              return await this._activate(), await d.apply(this, m);
            } finally {
              this._operations.delete(y), w && this._backend.saveSuperblock(), this._operations.size === 0 && (this._deactivationTimeout || clearTimeout(this._deactivationTimeout), this._deactivationTimeout = setTimeout(this._deactivate.bind(this), 500));
            }
          };
        }
        async _activate() {
          this._initPromise || console.warn(new Error(`Attempted to use LightningFS ${this._name} before it was initialized.`)), await this._initPromise, this._deactivationTimeout && (clearTimeout(this._deactivationTimeout), this._deactivationTimeout = null), this._deactivationPromise && await this._deactivationPromise, this._deactivationPromise = null, this._activationPromise || (this._activationPromise = this._backend.activate ? this._backend.activate() : Promise.resolve()), await this._activationPromise;
        }
        async _deactivate() {
          return this._activationPromise && await this._activationPromise, this._deactivationPromise || (this._deactivationPromise = this._backend.deactivate ? this._backend.deactivate() : Promise.resolve()), this._activationPromise = null, this._gracefulShutdownResolve && this._gracefulShutdownResolve(), this._deactivationPromise;
        }
        async readFile(d, f) {
          return this._backend.readFile(d, f);
        }
        async writeFile(d, f, w) {
          return await this._backend.writeFile(d, f, w), null;
        }
        async unlink(d, f) {
          return await this._backend.unlink(d, f), null;
        }
        async readdir(d, f) {
          return this._backend.readdir(d, f);
        }
        async mkdir(d, f) {
          return await this._backend.mkdir(d, f), null;
        }
        async rmdir(d, f) {
          return await this._backend.rmdir(d, f), null;
        }
        async rename(d, f) {
          return await this._backend.rename(d, f), null;
        }
        async stat(d, f) {
          const w = await this._backend.stat(d, f);
          return new n(w);
        }
        async lstat(d, f) {
          const w = await this._backend.lstat(d, f);
          return new n(w);
        }
        async readlink(d, f) {
          return this._backend.readlink(d, f);
        }
        async symlink(d, f) {
          return await this._backend.symlink(d, f), null;
        }
        async backFile(d, f) {
          return await this._backend.backFile(d, f), null;
        }
        async du(d) {
          return this._backend.du(d);
        }
        async flush() {
          return this._backend.flush();
        }
      };
    }, function(i, e, t) {
      const { encode: r, decode: n } = t(7), a = t(10), s = t(11), { ENOENT: o, ENOTEMPTY: l, ETIMEDOUT: d } = t(1), f = t(12), w = t(13), m = t(14), y = t(15), k = t(0);
      i.exports = class {
        constructor() {
          this.saveSuperblock = a(() => {
            this.flush();
          }, 500);
        }
        async init(x, { wipe: E, url: R, urlauto: T, fileDbName: S = x, db: N = null, fileStoreName: D = x + "_files", lockDbName: F = x + "_lock", lockStoreName: I = x + "_lock" } = {}) {
          this._name = x, this._idb = N || new f(S, D), this._mutex = navigator.locks ? new y(x) : new m(F, I), this._cache = new s(x), this._opts = { wipe: E, url: R }, this._needsWipe = !!E, R && (this._http = new w(R), this._urlauto = !!T);
        }
        async activate() {
          if (this._cache.activated) return;
          this._needsWipe && (this._needsWipe = !1, await this._idb.wipe(), await this._mutex.release({ force: !0 })), await this._mutex.has() || await this._mutex.wait();
          const x = await this._idb.loadSuperblock();
          if (x) this._cache.activate(x);
          else if (this._http) {
            const E = await this._http.loadSuperblock();
            this._cache.activate(E), await this._saveSuperblock();
          } else this._cache.activate();
          if (!await this._mutex.has()) throw new d();
        }
        async deactivate() {
          await this._mutex.has() && await this._saveSuperblock(), this._cache.deactivate();
          try {
            await this._mutex.release();
          } catch (x) {
            console.log(x);
          }
          await this._idb.close();
        }
        async _saveSuperblock() {
          this._cache.activated && (this._lastSavedAt = Date.now(), await this._idb.saveSuperblock(this._cache._root));
        }
        _writeStat(x, E, R) {
          let T = k.split(k.dirname(x)), S = T.shift();
          for (let N of T) {
            S = k.join(S, N);
            try {
              this._cache.mkdir(S, { mode: 511 });
            } catch {
            }
          }
          return this._cache.writeStat(x, E, R);
        }
        async readFile(x, E) {
          const { encoding: R } = E;
          if (R && R !== "utf8") throw new Error('Only "utf8" encoding is supported in readFile');
          let T = null, S = null;
          try {
            S = this._cache.stat(x), T = await this._idb.readFile(S.ino);
          } catch (N) {
            if (!this._urlauto) throw N;
          }
          if (!T && this._http) {
            let N = this._cache.lstat(x);
            for (; N.type === "symlink"; ) x = k.resolve(k.dirname(x), N.target), N = this._cache.lstat(x);
            T = await this._http.readFile(x);
          }
          if (T && (S && S.size == T.byteLength || (S = await this._writeStat(x, T.byteLength, { mode: S ? S.mode : 438 }), this.saveSuperblock()), R === "utf8" ? T = n(T) : T.toString = () => n(T)), !S) throw new o(x);
          return T;
        }
        async writeFile(x, E, R) {
          const { mode: T, encoding: S = "utf8" } = R;
          if (typeof E == "string") {
            if (S !== "utf8") throw new Error('Only "utf8" encoding is supported in writeFile');
            E = r(E);
          }
          const N = await this._cache.writeStat(x, E.byteLength, { mode: T });
          await this._idb.writeFile(N.ino, E);
        }
        async unlink(x, E) {
          const R = this._cache.lstat(x);
          this._cache.unlink(x), R.type !== "symlink" && await this._idb.unlink(R.ino);
        }
        readdir(x, E) {
          return this._cache.readdir(x);
        }
        mkdir(x, E) {
          const { mode: R = 511 } = E;
          this._cache.mkdir(x, { mode: R });
        }
        rmdir(x, E) {
          if (x === "/") throw new l();
          this._cache.rmdir(x);
        }
        rename(x, E) {
          this._cache.rename(x, E);
        }
        stat(x, E) {
          return this._cache.stat(x);
        }
        lstat(x, E) {
          return this._cache.lstat(x);
        }
        readlink(x, E) {
          return this._cache.readlink(x);
        }
        symlink(x, E) {
          this._cache.symlink(x, E);
        }
        async backFile(x, E) {
          let R = await this._http.sizeFile(x);
          await this._writeStat(x, R, E);
        }
        du(x) {
          return this._cache.du(x);
        }
        flush() {
          return this._saveSuperblock();
        }
      };
    }, function(i, e, t) {
      t(8), i.exports = { encode: (r) => new TextEncoder().encode(r), decode: (r) => new TextDecoder().decode(r) };
    }, function(i, e, t) {
      (function(r) {
        (function(n) {
          function a(o) {
            if ((o = o === void 0 ? "utf-8" : o) !== "utf-8") throw new RangeError("Failed to construct 'TextEncoder': The encoding label provided ('" + o + "') is invalid.");
          }
          function s(o, l) {
            if (l = l === void 0 ? { fatal: !1 } : l, (o = o === void 0 ? "utf-8" : o) !== "utf-8") throw new RangeError("Failed to construct 'TextDecoder': The encoding label provided ('" + o + "') is invalid.");
            if (l.fatal) throw Error("Failed to construct 'TextDecoder': the 'fatal' option is unsupported.");
          }
          if (n.TextEncoder && n.TextDecoder) return !1;
          Object.defineProperty(a.prototype, "encoding", { value: "utf-8" }), a.prototype.encode = function(o, l) {
            if ((l = l === void 0 ? { stream: !1 } : l).stream) throw Error("Failed to encode: the 'stream' option is unsupported.");
            l = 0;
            for (var d = o.length, f = 0, w = Math.max(32, d + (d >> 1) + 7), m = new Uint8Array(w >> 3 << 3); l < d; ) {
              var y = o.charCodeAt(l++);
              if (55296 <= y && 56319 >= y) {
                if (l < d) {
                  var k = o.charCodeAt(l);
                  (64512 & k) == 56320 && (++l, y = ((1023 & y) << 10) + (1023 & k) + 65536);
                }
                if (55296 <= y && 56319 >= y) continue;
              }
              if (f + 4 > m.length && (w += 8, w = (w *= 1 + l / o.length * 2) >> 3 << 3, (k = new Uint8Array(w)).set(m), m = k), (4294967168 & y) == 0) m[f++] = y;
              else {
                if ((4294965248 & y) == 0) m[f++] = y >> 6 & 31 | 192;
                else if ((4294901760 & y) == 0) m[f++] = y >> 12 & 15 | 224, m[f++] = y >> 6 & 63 | 128;
                else {
                  if ((4292870144 & y) != 0) continue;
                  m[f++] = y >> 18 & 7 | 240, m[f++] = y >> 12 & 63 | 128, m[f++] = y >> 6 & 63 | 128;
                }
                m[f++] = 63 & y | 128;
              }
            }
            return m.slice(0, f);
          }, Object.defineProperty(s.prototype, "encoding", { value: "utf-8" }), Object.defineProperty(s.prototype, "fatal", { value: !1 }), Object.defineProperty(s.prototype, "ignoreBOM", { value: !1 }), s.prototype.decode = function(o, l) {
            if ((l = l === void 0 ? { stream: !1 } : l).stream) throw Error("Failed to decode: the 'stream' option is unsupported.");
            l = 0;
            for (var d = (o = new Uint8Array(o)).length, f = []; l < d; ) {
              var w = o[l++];
              if (w === 0) break;
              if ((128 & w) == 0) f.push(w);
              else if ((224 & w) == 192) {
                var m = 63 & o[l++];
                f.push((31 & w) << 6 | m);
              } else if ((240 & w) == 224) {
                m = 63 & o[l++];
                var y = 63 & o[l++];
                f.push((31 & w) << 12 | m << 6 | y);
              } else (248 & w) == 240 && (65535 < (w = (7 & w) << 18 | (m = 63 & o[l++]) << 12 | (y = 63 & o[l++]) << 6 | 63 & o[l++]) && (w -= 65536, f.push(w >>> 10 & 1023 | 55296), w = 56320 | 1023 & w), f.push(w));
            }
            return String.fromCharCode.apply(null, f);
          }, n.TextEncoder = a, n.TextDecoder = s;
        })(typeof window < "u" ? window : r !== void 0 ? r : this);
      }).call(this, t(9));
    }, function(i, e) {
      var t;
      t = /* @__PURE__ */ function() {
        return this;
      }();
      try {
        t = t || new Function("return this")();
      } catch {
        typeof window == "object" && (t = window);
      }
      i.exports = t;
    }, function(i, e) {
      i.exports = function(t, r, n) {
        var a;
        return function() {
          if (!r) return t.apply(this, arguments);
          var s = this, o = arguments, l = n && !a;
          return clearTimeout(a), a = setTimeout(function() {
            if (a = null, !l) return t.apply(s, o);
          }, r), l ? t.apply(this, arguments) : void 0;
        };
      };
    }, function(i, e, t) {
      const r = t(0), { EEXIST: n, ENOENT: a, ENOTDIR: s, ENOTEMPTY: o } = t(1), l = 0;
      i.exports = class {
        constructor() {
        }
        _makeRoot(d = /* @__PURE__ */ new Map()) {
          return d.set(l, { mode: 511, type: "dir", size: 0, ino: 0, mtimeMs: Date.now() }), d;
        }
        activate(d = null) {
          this._root = d === null ? /* @__PURE__ */ new Map([["/", this._makeRoot()]]) : typeof d == "string" ? /* @__PURE__ */ new Map([["/", this._makeRoot(this.parse(d))]]) : d;
        }
        get activated() {
          return !!this._root;
        }
        deactivate() {
          this._root = void 0;
        }
        size() {
          return this._countInodes(this._root.get("/")) - 1;
        }
        _countInodes(d) {
          let f = 1;
          for (let [w, m] of d) w !== l && (f += this._countInodes(m));
          return f;
        }
        autoinc() {
          return this._maxInode(this._root.get("/")) + 1;
        }
        _maxInode(d) {
          let f = d.get(l).ino;
          for (let [w, m] of d) w !== l && (f = Math.max(f, this._maxInode(m)));
          return f;
        }
        print(d = this._root.get("/")) {
          let f = "";
          const w = (m, y) => {
            for (let [k, x] of m) {
              if (k === 0) continue;
              let E = x.get(l), R = E.mode.toString(8);
              f += `${"	".repeat(y)}${k}	${R}`, E.type === "file" ? f += `	${E.size}	${E.mtimeMs}
` : (f += `
`, w(x, y + 1));
            }
          };
          return w(d, 0), f;
        }
        parse(d) {
          let f = 0;
          function w(x) {
            const E = ++f, R = x.length === 1 ? "dir" : "file";
            let [T, S, N] = x;
            return T = parseInt(T, 8), S = S ? parseInt(S) : 0, N = N ? parseInt(N) : Date.now(), /* @__PURE__ */ new Map([[l, { mode: T, type: R, size: S, mtimeMs: N, ino: E }]]);
          }
          let m = d.trim().split(`
`), y = this._makeRoot(), k = [{ indent: -1, node: y }, { indent: 0, node: null }];
          for (let x of m) {
            let E = x.match(/^\t*/)[0].length;
            x = x.slice(E);
            let [R, ...T] = x.split("	"), S = w(T);
            if (E <= k[k.length - 1].indent) for (; E <= k[k.length - 1].indent; ) k.pop();
            k.push({ indent: E, node: S }), k[k.length - 2].node.set(R, S);
          }
          return y;
        }
        _lookup(d, f = !0) {
          let w = this._root, m = "/", y = r.split(d);
          for (let k = 0; k < y.length; ++k) {
            let x = y[k];
            if (!(w = w.get(x))) throw new a(d);
            if (f || k < y.length - 1) {
              const E = w.get(l);
              if (E.type === "symlink") {
                let R = r.resolve(m, E.target);
                w = this._lookup(R);
              }
              m = m ? r.join(m, x) : x;
            }
          }
          return w;
        }
        mkdir(d, { mode: f }) {
          if (d === "/") throw new n();
          let w = this._lookup(r.dirname(d)), m = r.basename(d);
          if (w.has(m)) throw new n();
          let y = /* @__PURE__ */ new Map(), k = { mode: f, type: "dir", size: 0, mtimeMs: Date.now(), ino: this.autoinc() };
          y.set(l, k), w.set(m, y);
        }
        rmdir(d) {
          let f = this._lookup(d);
          if (f.get(l).type !== "dir") throw new s();
          if (f.size > 1) throw new o();
          let w = this._lookup(r.dirname(d)), m = r.basename(d);
          w.delete(m);
        }
        readdir(d) {
          let f = this._lookup(d);
          if (f.get(l).type !== "dir") throw new s();
          return [...f.keys()].filter((w) => typeof w == "string");
        }
        writeStat(d, f, { mode: w }) {
          let m;
          try {
            let R = this.stat(d);
            w == null && (w = R.mode), m = R.ino;
          } catch {
          }
          w == null && (w = 438), m == null && (m = this.autoinc());
          let y = this._lookup(r.dirname(d)), k = r.basename(d), x = { mode: w, type: "file", size: f, mtimeMs: Date.now(), ino: m }, E = /* @__PURE__ */ new Map();
          return E.set(l, x), y.set(k, E), x;
        }
        unlink(d) {
          let f = this._lookup(r.dirname(d)), w = r.basename(d);
          f.delete(w);
        }
        rename(d, f) {
          let w = r.basename(f), m = this._lookup(d);
          this._lookup(r.dirname(f)).set(w, m), this.unlink(d);
        }
        stat(d) {
          return this._lookup(d).get(l);
        }
        lstat(d) {
          return this._lookup(d, !1).get(l);
        }
        readlink(d) {
          return this._lookup(d, !1).get(l).target;
        }
        symlink(d, f) {
          let w, m;
          try {
            let R = this.stat(f);
            m === null && (m = R.mode), w = R.ino;
          } catch {
          }
          m == null && (m = 40960), w == null && (w = this.autoinc());
          let y = this._lookup(r.dirname(f)), k = r.basename(f), x = { mode: m, type: "symlink", target: d, size: 0, mtimeMs: Date.now(), ino: w }, E = /* @__PURE__ */ new Map();
          return E.set(l, x), y.set(k, E), x;
        }
        _du(d) {
          let f = 0;
          for (const [w, m] of d.entries()) f += w === l ? m.size : this._du(m);
          return f;
        }
        du(d) {
          let f = this._lookup(d);
          return this._du(f);
        }
      };
    }, function(i, e, t) {
      const r = t(2);
      i.exports = class {
        constructor(n, a) {
          this._database = n, this._storename = a, this._store = new r.Store(this._database, this._storename);
        }
        saveSuperblock(n) {
          return r.set("!root", n, this._store);
        }
        loadSuperblock() {
          return r.get("!root", this._store);
        }
        readFile(n) {
          return r.get(n, this._store);
        }
        writeFile(n, a) {
          return r.set(n, a, this._store);
        }
        unlink(n) {
          return r.del(n, this._store);
        }
        wipe() {
          return r.clear(this._store);
        }
        close() {
          return r.close(this._store);
        }
      };
    }, function(i, e) {
      i.exports = class {
        constructor(t) {
          this._url = t;
        }
        loadSuperblock() {
          return fetch(this._url + "/.superblock.txt").then((t) => t.ok ? t.text() : null);
        }
        async readFile(t) {
          const r = await fetch(this._url + t);
          if (r.status === 200) return r.arrayBuffer();
          throw new Error("ENOENT");
        }
        async sizeFile(t) {
          const r = await fetch(this._url + t, { method: "HEAD" });
          if (r.status === 200) return r.headers.get("content-length");
          throw new Error("ENOENT");
        }
      };
    }, function(i, e, t) {
      const r = t(2), n = (a) => new Promise((s) => setTimeout(s, a));
      i.exports = class {
        constructor(a, s) {
          this._id = Math.random(), this._database = a, this._storename = s, this._store = new r.Store(this._database, this._storename), this._lock = null;
        }
        async has({ margin: a = 2e3 } = {}) {
          if (this._lock && this._lock.holder === this._id) {
            const s = Date.now();
            return this._lock.expires > s + a || await this.renew();
          }
          return !1;
        }
        async renew({ ttl: a = 5e3 } = {}) {
          let s;
          return await r.update("lock", (o) => {
            const l = Date.now() + a;
            return s = o && o.holder === this._id, this._lock = s ? { holder: this._id, expires: l } : o, this._lock;
          }, this._store), s;
        }
        async acquire({ ttl: a = 5e3 } = {}) {
          let s, o, l;
          if (await r.update("lock", (d) => {
            const f = Date.now(), w = f + a;
            return o = d && d.expires < f, s = d === void 0 || o, l = d && d.holder === this._id, this._lock = s ? { holder: this._id, expires: w } : d, this._lock;
          }, this._store), l) throw new Error("Mutex double-locked");
          return s;
        }
        async wait({ interval: a = 100, limit: s = 6e3, ttl: o } = {}) {
          for (; s--; ) {
            if (await this.acquire({ ttl: o })) return !0;
            await n(a);
          }
          throw new Error("Mutex timeout");
        }
        async release({ force: a = !1 } = {}) {
          let s, o, l;
          if (await r.update("lock", (d) => (s = a || d && d.holder === this._id, o = d === void 0, l = d && d.holder !== this._id, this._lock = s ? void 0 : d, this._lock), this._store), await r.close(this._store), !s && !a) {
            if (o) throw new Error("Mutex double-freed");
            if (l) throw new Error("Mutex lost ownership");
          }
          return s;
        }
      };
    }, function(i, e) {
      i.exports = class {
        constructor(t) {
          this._id = Math.random(), this._database = t, this._has = !1, this._release = null;
        }
        async has() {
          return this._has;
        }
        async acquire() {
          return new Promise((t) => {
            navigator.locks.request(this._database + "_lock", { ifAvailable: !0 }, (r) => (this._has = !!r, t(!!r), new Promise((n) => {
              this._release = n;
            })));
          });
        }
        async wait({ timeout: t = 6e5 } = {}) {
          return new Promise((r, n) => {
            const a = new AbortController();
            setTimeout(() => {
              a.abort(), n(new Error("Mutex timeout"));
            }, t), navigator.locks.request(this._database + "_lock", { signal: a.signal }, (s) => (this._has = !!s, r(!!s), new Promise((o) => {
              this._release = o;
            })));
          });
        }
        async release({ force: t = !1 } = {}) {
          this._has = !1, this._release ? this._release() : t && navigator.locks.request(this._database + "_lock", { steal: !0 }, (r) => !0);
        }
      };
    }, function(i, e) {
      i.exports = class {
        constructor(t) {
          this.type = t.type, this.mode = t.mode, this.size = t.size, this.ino = t.ino, this.mtimeMs = t.mtimeMs, this.ctimeMs = t.ctimeMs || t.mtimeMs, this.uid = 1, this.gid = 1, this.dev = 1;
        }
        isFile() {
          return this.type === "file";
        }
        isDirectory() {
          return this.type === "dir";
        }
        isSymbolicLink() {
          return this.type === "symlink";
        }
      };
    }]);
  });
  const Rc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null
  }, Symbol.toStringTag, { value: "Module" })), Za = new Fr(Pr.logging.swUtils);
  function Ft(...i) {
    Za.consoleDotLog("[ SWUtils ]", ...i);
  }
  function xr(...i) {
    Za.consoleDotError("[ SWUtils ]", ...i);
  }
  class Bc {
    constructor() {
    }
    async fetchWithServiceWorker(e, t) {
      Ft("Starting fetchWithServiceWorker with operation:", e, "and args:", t);
      try {
        const r = new URL("/git", self.location.origin).toString();
        Ft("Constructed URL for fetch:", r);
        const n = {
          method: "POST",
          body: JSON.stringify({ operation: e, args: t }),
          headers: { "Content-Type": "application/json" }
        };
        Ft("Request options:", n);
        const a = await fetch(r, n);
        Ft("Fetch response received:", a);
        let s;
        try {
          s = await a.json(), Ft("Parsed JSON response:", s);
        } catch (o) {
          throw xr("Error parsing JSON response:", o), new Error("Response is not valid JSON");
        }
        if (!a.ok) {
          let o = `Fetch failed with status: ${a.status}`;
          switch (Ft("Response status is not OK:", a.status), a.status) {
            case 400:
              o = "Bad Request: The server could not understand the request.";
              break;
            case 401:
              o = "Unauthorized: Authentication is required or has failed.";
              break;
            case 403:
              o = "Forbidden: You do not have permission to access this resource.";
              break;
            case 404:
              o = "Not Found: The requested resource could not be found.";
              break;
            case 500:
              o = "Internal Server Error: The server encountered an error.";
              break;
            case 502:
              o = "Bad Gateway: The server received an invalid response from the upstream server.";
              break;
            case 503:
              o = "Service Unavailable: The server is currently unable to handle the request.";
              break;
            case 504:
              o = "Gateway Timeout: The server did not receive a timely response from the upstream server.";
              break;
            default:
              o = `Unexpected status code: ${a.status}`;
          }
          throw xr("Error message based on status code:", o), xr("Response details:", s.details), new Error(JSON.stringify(s.details));
        }
        return Ft("Fetch completed successfully with response:", s), s;
      } catch (r) {
        throw xr("Fetch error:", r), r;
      }
    }
    async sendMessageToChannel(e, t = "worker-channel") {
      return new Promise((r) => {
        const n = new BroadcastChannel(t);
        n.onmessage = (a) => {
          a.data.operation === `${e.operation}` && (n.close(), r(a.data));
        }, n.postMessage(e);
      });
    }
  }
  const Ga = new Fr(Pr.logging.memoryBackendES6);
  function Xe(...i) {
    Ga.consoleDotLog("[MemoryBackend ES6]", ...i);
  }
  function ar(...i) {
    Ga.consoleDotError("[MemoryBackend ES6]", ...i);
  }
  function Oc() {
    return "tab-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }
  Xe("Loading memoryBackend module");
  class ca {
    constructor(e = {}, t = "default") {
      this.dbName = t, this.options = e, this.deviceId = e.deviceId || Oc(), this._files = /* @__PURE__ */ new Map(), this.versionVector = { [this.deviceId]: 0 }, this.swUtilsInstance = new Bc(), this.channel = null, this.isProcessing = !1, this.pendingUpdates = [], this.processingQueue = !1, this._initializeRoot(), this.options?.supportsServiceWorker && this.options?.useSW && this._setupReceiveChannel(), Promise.resolve().then(() => this._requestInitialSync()), Xe(`Initialized with dbName: ${this.dbName}, deviceId: ${this.deviceId}`);
    }
    _initializeRoot() {
      this._files.set("/", {
        type: "dir",
        mode: 511,
        size: 0,
        ino: "/",
        mtimeMs: Date.now(),
        ctimeMs: Date.now()
      });
    }
    _incrementVersionVector() {
      this.versionVector[this.deviceId] || (this.versionVector[this.deviceId] = 0), this.versionVector[this.deviceId]++;
    }
    _isNewerVersionVector(e) {
      let t = !1;
      for (const r in e) {
        const n = this.versionVector[r] || 0;
        e[r] > n && (t = !0);
      }
      return t;
    }
    _mergeVersionVector(e) {
      for (const t in e)
        (!this.versionVector[t] || e[t] > this.versionVector[t]) && (this.versionVector[t] = e[t]);
    }
    _requestInitialSync() {
      try {
        const e = new BroadcastChannel(`memory-backend-${this.dbName}`);
        e.postMessage({
          operation: "memorySyncRequest",
          data: {
            dbName: this.dbName,
            requesterVV: this.versionVector,
            requesterId: this.deviceId
          }
        }), e.close(), Xe("Initial sync request sent");
      } catch (e) {
        ar("Failed to send initial sync request:", e);
      }
    }
    async getFiles() {
      return new Map(
        Array.from(this._files.entries()).map(([t, r]) => [t, { ...r }])
      );
    }
    async sendFilesToSW(e = null) {
      const t = {
        operation: "memorySync",
        data: {
          files: Array.from(this._files.entries()),
          dbName: this.dbName,
          versionVector: { ...this.versionVector },
          sender: this.deviceId,
          targetId: e
        }
      };
      if (this.isProcessing) {
        Xe("Queueing update due to ongoing processing"), this.pendingUpdates.push(t);
        return;
      }
      try {
        this.isProcessing = !0, Xe("Sending files to SW:", t);
        const r = new BroadcastChannel(`memory-backend-${this.dbName}`);
        r.postMessage(t), r.close(), Xe("Files sent to SW successfully"), await this._processPendingUpdates();
      } catch (r) {
        ar("Failed to send files to SW:", r);
      } finally {
        this.isProcessing = !1;
      }
    }
    async _processPendingUpdates() {
      if (!(this.processingQueue || this.pendingUpdates.length === 0)) {
        this.processingQueue = !0;
        try {
          for (; this.pendingUpdates.length > 0; ) {
            const e = this.pendingUpdates.shift();
            Xe("Processing queued update:", e);
            const t = new BroadcastChannel(`memory-backend-${this.dbName}`);
            t.postMessage(e), t.close();
          }
        } catch (e) {
          ar("Error processing queued updates:", e);
        } finally {
          this.processingQueue = !1;
        }
      }
    }
    _setupReceiveChannel() {
      try {
        const e = new BroadcastChannel(`memory-backend-${this.dbName}`);
        Xe("Listening for updates on:", e.name), this.channel = e, this.channel.onmessage = async (t) => {
          Promise.resolve().then(() => this._handleChannelMessage(t));
        }, this._requestInitialSync();
      } catch (e) {
        ar("BroadcastChannel init failed:", e);
      }
    }
    async _handleChannelMessage(e) {
      const { operation: t, data: r } = e.data || {};
      if (!r?.dbName || r.dbName !== this.dbName) return;
      if (t === "memorySyncRequest") {
        this._isNewerVersionVector(r.requesterVV) ? (Xe("Responding to sync request with newer data"), Promise.resolve().then(() => this.sendFilesToSW(r.requesterId))) : Xe("No newer data to send to requester");
        return;
      }
      if (t !== "memorySync") return;
      const n = r.versionVector;
      if (r.sender === this.deviceId) {
        Xe("Skipping own update");
        return;
      }
      if (r.targetId && r.targetId !== this.deviceId) {
        Xe("Message not meant for this tab. Ignoring.");
        return;
      }
      if (!this._isNewerVersionVector(n)) {
        Xe("Skipping received update - not newer than current", this.versionVector, n);
        return;
      }
      try {
        Xe("Applying update from channel:", r), this._files = new Map(r.files), this._mergeVersionVector(n), Xe("Memory updated from channel successfully");
      } catch (s) {
        ar("Failed to apply channel message:", s);
      }
    }
    async wipe() {
      Xe(`Wiping db: ${this.dbName}`), this._files.clear(), this._initializeRoot(), this.versionVector = { [this.deviceId]: 0 }, await this._handleFilesChange();
    }
    async _handleFilesChange() {
      this._incrementVersionVector(), this.options?.supportsServiceWorker && this.options?.useSW && await this.sendFilesToSW();
    }
    async readFile(e, t = {}) {
      if (Xe("this.files", this._files), !this._files.has(e))
        throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
      const r = this._files.get(e);
      if (r.type !== "file")
        throw Object.assign(new Error("EISDIR"), { code: "EISDIR" });
      return t.encoding === "utf8" ? new TextDecoder().decode(r.data) : r.data;
    }
    async writeFile(e, t, r = {}) {
      const n = typeof t == "string" ? new TextEncoder().encode(t) : t || new Uint8Array();
      this._files.set(e, {
        type: "file",
        mode: r.mode || 438,
        data: n,
        size: n.length,
        ino: e,
        mtimeMs: Date.now(),
        ctimeMs: Date.now()
      }), await this._handleFilesChange();
    }
    async unlink(e) {
      if (!this._files.has(e))
        throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
      this._files.delete(e), await this._handleFilesChange();
    }
    async readdir(e) {
      if (!this._files.has(e))
        throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
      if (this._files.get(e).type !== "dir")
        throw Object.assign(new Error("ENOTDIR"), { code: "ENOTDIR" });
      const r = /* @__PURE__ */ new Set(), n = e === "/" ? "/" : `${e}/`;
      for (const a of this._files.keys())
        if (a.startsWith(n) && a !== e) {
          const s = a.slice(n.length).split("/")[0];
          r.add(s);
        }
      return [...r];
    }
    async stat(e) {
      if (!this._files.has(e))
        throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
      return this._files.get(e);
    }
    async lstat(e) {
      return this.stat(e);
    }
    async mkdir(e) {
      const t = this._getParentDir(e);
      if (t !== "/" && !this._files.has(t))
        throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
      this._files.set(e, {
        type: "dir",
        mode: 511,
        size: 0,
        ino: e,
        mtimeMs: Date.now(),
        ctimeMs: Date.now()
      }), await this._handleFilesChange();
    }
    async rmdir(e) {
      const t = e === "/" ? "/" : e.replace(/\/+$/, "");
      if (!this._files.has(t))
        throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
      if (this._files.get(t).type !== "dir")
        throw Object.assign(new Error("ENOTDIR"), { code: "ENOTDIR" });
      for (const n of this._files.keys())
        if (n.startsWith(`${t}/`))
          throw Object.assign(new Error("ENOTEMPTY"), { code: "ENOTEMPTY" });
      this._files.delete(t), await this._handleFilesChange();
    }
    _getParentDir(e) {
      const t = e.lastIndexOf("/");
      return t <= 0 ? "/" : e.slice(0, t);
    }
    _getBaseName(e) {
      return e.slice(e.lastIndexOf("/") + 1);
    }
    async saveSuperblock() {
    }
    async loadSuperblock() {
    }
  }
  const Va = new Fr(Pr.logging.fsManagerES6);
  function nt(...i) {
    Va.consoleDotLog("[fsManagerES6] ", ...i);
  }
  function Fi(...i) {
    Va.consoleDotError("[fsManagerES6] ", ...i);
  }
  nt("Loading fsmanagerES6.");
  class Cc {
    constructor(e = { supportsServiceWorker: !0, useSW: !0 }) {
      this.fsInstances = /* @__PURE__ */ new Map(), this.initializationLocks = /* @__PURE__ */ new Map(), this.debug = !0, this.options = e, this.memoryBackends = /* @__PURE__ */ new Map();
    }
    _log(...e) {
      this.debug && nt("[fsManager]", ...e);
    }
    _error(...e) {
      Fi("[fsManager]", ...e);
    }
    async initializeFS(e, t) {
      const r = `${e}-${t}`;
      this._log(`Initializing FS: ${r}`);
      try {
        if (nt("Initializing."), this.fsInstances.has(r))
          return this._log(`FS ${r} already exists`), this.fsInstances.get(r);
        let n;
        if (t === "memory") {
          nt(`Creating memory FS for ${r}`);
          const a = new ca(this.options, e);
          nt(`Memory backend created for ${r} backend: `, a), this.memoryBackends.set(r, a), n = new yr(e, { backend: a }), nt(`Memory FS created for ${r}`), this._log(`Created memory FS with backend for ${r}`);
        } else if (t === "idb")
          n = new yr(e), this._log(`Created IDB FS for ${r}`);
        else
          throw new Error(`Unsupported FS type: ${t}`);
        return this.fsInstances.set(r, n), n;
      } catch (n) {
        throw this._error(`Failed to initialize ${r}:`, n), n;
      }
    }
    async getFS(e, t) {
      const r = `${e}-${t}`;
      if (this._log(`Requesting FS: ${r}`), this.initializationLocks.has(r))
        return this._log(`Waiting for existing initialization of ${r}`), this.initializationLocks.get(r);
      const n = (async () => {
        try {
          return this.fsInstances.has(r) ? this.fsInstances.get(r) : await this.initializeFS(e, t);
        } finally {
          this.initializationLocks.delete(r);
        }
      })();
      return this.initializationLocks.set(r, n), n;
    }
    async deleteFS(e, t) {
      const r = `${e}-${t}`;
      this._log(`Deleting FS: ${r}`);
      try {
        if (!this.fsInstances.has(r)) {
          this._log(`File system ${r} does not exist. Nothing to delete.`);
          return;
        }
        const n = this.fsInstances.get(r);
        if (t === "idb")
          try {
            await this.deleteIndexedDB(e), this._log(`IndexedDB file system ${r} deleted successfully.`);
          } catch (a) {
            throw this._error(`Error deleting IndexedDB file system ${r}:`, a), a;
          }
        else if (t === "memory") {
          if (this.memoryBackends.has(r)) {
            const a = this.memoryBackends.get(r);
            if (a && a.close)
              try {
                await a.close(), this._log(`Memory backend for ${r} closed successfully.`);
              } catch (s) {
                this._error(`Error closing memory backend for ${r}:`, s);
              }
            this.memoryBackends.delete(r);
          }
          this._log(`Memory file system ${r} deleted successfully.`);
        } else
          throw new Error(`Unsupported file system type: ${t}`);
        this.fsInstances.delete(r);
      } catch (n) {
        throw this._error(`Failed to delete ${r}:`, n), n;
      }
    }
    // Enhanced createBackupFS method with better memory support
    async createBackupFS(e, t, r = "_replica") {
      const n = `${e}${r}`, a = `${e}-${t}`, s = `${n}-${t}`;
      this._log(`Creating backup of ${a} as ${s}`);
      try {
        const o = await this.getFS(e, t);
        if (t === "memory") {
          const l = this.memoryBackends.get(a);
          if (!l)
            throw new Error("Original memory backend not found");
          const d = new ca({
            ...this.options,
            deviceId: `${this.options.deviceId || "default"}-${Date.now()}`
          }, n);
          if (l._files instanceof Map)
            for (const [w, m] of l._files)
              d._files.set(w, { ...m });
          else
            throw new Error("Original memory backend files not in expected format");
          const f = new yr(n, { backend: d });
          this.fsInstances.set(s, f), this.memoryBackends.set(s, d);
        } else if (t === "idb") {
          const l = new yr(n);
          this.fsInstances.set(s, l), await this._copyIDBContents(o, l, "/");
        } else
          throw new Error(`Unsupported FS type for backup: ${t}`);
        return await this._registerBackupMount(e, n), this._log(`Backup created successfully: ${s}`), this.fsInstances.get(s);
      } catch (o) {
        throw this._error(`Failed to create backup ${s}:`, o), this.fsInstances.has(s) && this.fsInstances.delete(s), this.memoryBackends.has(s) && this.memoryBackends.delete(s), o;
      }
    }
    // Memory-specific methods
    async getMemorySnapshot(e) {
      const t = `${e}-memory`;
      if (!this.memoryBackends.has(t))
        throw new Error(`Memory filesystem ${e} not found`);
      const r = this.memoryBackends.get(t);
      if (!r._files)
        throw new Error("Memory backend files not initialized");
      const n = /* @__PURE__ */ new Map();
      for (const [a, s] of r._files)
        n.set(a, { ...s });
      return n;
    }
    async restoreMemorySnapshot(e, t) {
      const r = `${e}-memory`;
      if (!this.memoryBackends.has(r))
        throw new Error(`Memory filesystem ${e} not found`);
      const n = this.memoryBackends.get(r);
      n._files || n._initializeRoot(), n._files.clear();
      for (const [a, s] of t)
        n._files.set(a, { ...s });
      this._log(`Memory filesystem ${e} restored from snapshot`);
    }
    async getMemoryStats(e) {
      const t = `${e}-memory`;
      if (!this.memoryBackends.has(t))
        throw new Error(`Memory filesystem ${e} not found`);
      const r = this.memoryBackends.get(t);
      if (!r._files)
        return {
          fileCount: 0,
          totalSize: 0,
          paths: []
        };
      let n = 0, a = 0;
      const s = [];
      for (const [o, l] of r._files)
        n++, a += l.data ? l.data.byteLength : 0, s.push(o);
      return {
        fileCount: n,
        totalSize: a,
        paths: s.sort()
      };
    }
    async _copyIDBContents(e, t, r = "/") {
      try {
        const n = r === "/" ? "/" : r.replace(/\/+$/, ""), a = await e.promises.readdir(n);
        for (const s of a) {
          const o = n === "/" ? `/${s}` : `${n}/${s}`, l = o;
          try {
            if ((await e.promises.stat(o)).isDirectory()) {
              try {
                await t.promises.mkdir(l, { recursive: !0 });
              } catch (f) {
                if (f.code !== "EEXIST")
                  throw f;
                nt(`Directory ${l} already exists, continuing`);
              }
              await this._copyIDBContents(e, t, o);
            } else {
              const f = await e.promises.readFile(o);
              await t.promises.writeFile(l, f);
            }
          } catch (d) {
            this._error(`Error processing ${o}:`, d);
            continue;
          }
        }
      } catch (n) {
        throw n.code === "ENOENT" ? this._error(`Source path ${r} does not exist`) : n.code === "EEXIST" ? nt(`Path ${r} already exists`) : this._error(`Error copying path ${r}:`, n), n;
      }
    }
    async _registerBackupMount(e, t, r = {}) {
      const a = { ...{
        readOnly: !0,
        // Backups are typically read-only
        hidden: !1,
        // Whether to hide from normal listings
        preserveOriginal: !0,
        // Keep original metadata
        mountPath: `/${t}`
        // Customizable mount path
      }, ...r }, { mountPath: s } = a;
      this._log(`Registering backup mount from ${e} to ${s}`);
      try {
        if (typeof this.mounts != "object" && (this.mounts = {}), this.backupRegistry || (this.backupRegistry = /* @__PURE__ */ new Map()), this.mounts[s])
          throw new Error(`Mount path ${s} already in use`);
        const o = this.mounts[`/${e}`] || {};
        return this.mounts[s] = {
          ...a.preserveOriginal ? o : {},
          fsName: t,
          isBackup: !0,
          originalFsName: e,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          lastAccessed: null,
          accessCount: 0,
          metadata: {
            ...o.metadata || {},
            backupType: "full",
            // could be 'incremental' or 'differential'
            backupVersion: 1,
            ...a
          }
        }, this.backupRegistry.set(t, {
          original: e,
          mountPoint: s,
          createdAt: this.mounts[s].createdAt,
          options: a,
          stats: {
            fileCount: 0,
            // Could be populated during backup
            totalSize: 0,
            // Could be populated during backup
            lastVerified: null
          }
        }), this._log(`Successfully registered backup mount at ${s}`), {
          mountPath: s,
          backupName: t,
          originalName: e,
          details: this.mounts[s]
        };
      } catch (o) {
        throw this._error("Failed to register backup mount:", o), this.mounts && this.mounts[s] && delete this.mounts[s], this.backupRegistry && this.backupRegistry.has(t) && this.backupRegistry.delete(t), o;
      }
    }
    async deleteIndexedDB(e) {
      return new Promise((t, r) => {
        const n = indexedDB.deleteDatabase(e);
        n.onsuccess = () => {
          nt(`Deleted database ${e} successfully`), t();
        }, n.onerror = (a) => {
          Fi(`Error deleting database ${e}:`, a), r(a);
        }, n.onblocked = () => {
          console.warn(`Delete database ${e} blocked`);
        };
      });
    }
    async getFileStoreNames(e, t) {
      const r = `${e}-${t}`;
      if (!this.fsInstances.has(r))
        throw new Error(`File system ${r} not found. Call initializeFS first.`);
      if (t === "idb")
        try {
          const n = await this.getFileStoresFromDatabases();
          return nt(`File store names for ${r}:`, n), n;
        } catch (n) {
          throw Fi(`Error retrieving file store names for ${r}:`, n), n;
        }
      else if (t === "memory") {
        if (this.memoryBackends.has(r)) {
          const n = this.memoryBackends.get(r);
          if (n._files)
            return {
              fileCount: n._files.size,
              filePaths: Array.from(n._files.keys())
            };
        }
        return {
          fileCount: 0,
          filePaths: []
        };
      } else
        throw new Error(`Unsupported file system type: ${t}`);
    }
    async processDatabaseList(e) {
      const t = [];
      for (const r of e) {
        const n = typeof r == "string" ? r : r.name, s = (await this.openDatabase(n)).objectStoreNames, o = Array.from(s).filter((l) => l.startsWith("fs_")).map((l) => ({ database: n, fileStore: l }));
        t.push(...o);
      }
      return nt("Processing database list:", t), t;
    }
    async openDatabase(e) {
      return nt("Opening database:", e), new Promise((t, r) => {
        const n = indexedDB.open(e);
        n.onsuccess = (a) => {
          const s = a.target.result;
          t(s);
        }, n.onerror = (a) => {
          r(`Error opening database ${e}: ${a.target.error}`);
        };
      });
    }
    async getFileStoresFromDatabases() {
      return new Promise((e, t) => {
        const r = indexedDB.webkitGetDatabaseNames ? indexedDB.webkitGetDatabaseNames() : indexedDB.databases ? indexedDB.databases() : null;
        if (!r) {
          t("Your browser does not support retrieving a list of IndexedDB databases");
          return;
        }
        r instanceof Promise ? r.then((n) => {
          this.processDatabaseList(n).then((a) => e(a)).catch((a) => t(a));
        }).catch((n) => t(n)) : (r.onsuccess = async (n) => {
          const a = n.target.result;
          try {
            const s = await this.processDatabaseList(a);
            e(s);
          } catch (s) {
            t(s);
          }
        }, r.onerror = (n) => {
          t(`Error retrieving database list: ${n.target.error}`);
        });
      });
    }
  }
  const Xa = new Fr(Pr.logging.serviceWorker);
  function fe(...i) {
    Xa.consoleDotLog("[WorkerPool]", ...i);
  }
  function Ue(...i) {
    Xa.consoleDotError("[WorkerPool]", ...i);
  }
  let ft = "", ht = "", tt = "/", dr = 1, Jt = Ac, It = "origin", Re = "main", Qt = "http://localhost:9000", Dr = {}, Ya = 0, We, He = null, vt = {};
  const Nc = new Cc(), er = "cache-v1", Dc = [], la = new URL(self.registration.scope).pathname.split("/")[1], Pi = la ? `/${la}/` : "/";
  self.addEventListener("install", (i) => {
    self.skipWaiting(), fe("install"), i.waitUntil(
      caches.open(er).then((e) => (fe("Opened cache"), e.addAll(Dc))).catch((e) => {
        Ue("Failed to cache", e);
      })
    );
  });
  self.addEventListener("activate", (i) => (i.waitUntil(
    (async () => {
      ft = "", ht = "", tt = "/", dr = 1, It = "origin", Re = "main", Dr = {}, Ya = 0, He = new Rc("fs"), vt = {};
      const e = await caches.keys();
      await Promise.all(
        e.map((t) => {
          if (t !== er)
            return caches.delete(t);
        })
      );
    })()
  ), self.clients.claim()));
  self.addEventListener("message", (i) => {
    i.data.action === "skipWaiting" && self.skipWaiting();
  });
  self.broadcastChannelInitialized = !1;
  self.broadcastChannelInitialized || (We = new BroadcastChannel("worker-channel"), We.onmessage = async function(i) {
    const e = i.data;
    fe(e);
    try {
      switch (e.operation) {
        case "setAuthParams":
          await Pc(e.data);
          break;
        case "setDir":
          await Mc(e.data);
          break;
        case "setRepoDir":
          await zc(e.data);
          break;
        case "setDepth":
          await Lc(e.data);
          break;
        case "setRemote":
          await jc(e.data);
          break;
        case "setRef":
          await Uc(e.data);
          break;
        case "setSettingsAddresses":
          await Hc(e.data);
          break;
        case "passFsArgs":
          await qc(e.data);
          break;
        case "memorySync":
          await Wc(e.data);
          break;
        default:
          await Fc(e);
          break;
      }
    } catch (t) {
      throw Ue(`${e.operation} failed`, t), new Error(t);
    }
  }, self.broadcastChannelInitialized = !0);
  async function Fc(i) {
    Ue("Unhandled message operation:", i.operation);
  }
  async function Pc(i) {
    ft !== i.username || ht !== i.password ? (ft = i.username || "", ht = i.password || "", fe("handlesetauthparame: ", i), We.postMessage({ operation: "setAuthParams", success: !0 })) : We.postMessage({ operation: "setAuthParams", success: !0 });
  }
  async function Mc(i) {
    tt !== i ? (tt = i, We.postMessage({ operation: "setDir", success: !0 })) : We.postMessage({ operation: "setDir", success: !0 });
  }
  async function Uc(i) {
    Re !== i ? (Re = i, We.postMessage({ operation: "setRef", success: !0 })) : We.postMessage({ operation: "setRef", success: !0 });
  }
  async function zc(i) {
    tt !== i ? (tt = i, We.postMessage({ operation: "setRepoDir", success: !0 })) : We.postMessage({ operation: "setRepoDir", success: !0 });
  }
  async function Lc(i) {
    dr !== i ? (dr = i, We.postMessage({ operation: "setDepth", success: !0 })) : We.postMessage({ operation: "setDepth", success: !0 });
  }
  async function jc(i) {
    It !== i ? (It = i, We.postMessage({ operation: "setRemote", success: !0 })) : We.postMessage({ operation: "setRemote", success: !0 });
  }
  async function Hc(i) {
    Dr !== i ? (Dr = i, We.postMessage({ operation: "setSettingsAddresses", success: !0 })) : We.postMessage({ operation: "setSettingsAddresses", success: !0 });
  }
  async function qc(i) {
    try {
      vt !== i ? (vt = i, fe("fsArgs", vt), He = await Nc.getFS(vt.fsName, vt.fsType), We.postMessage({ operation: "passFsArgs", success: !0 })) : We.postMessage({ operation: "passFsArgs", success: !0 });
    } catch (e) {
      Ue("some error happened in passFsArgs: ", e);
    }
  }
  async function Wc(i) {
    fe("handle sync yoo hoo: ", i);
  }
  async function Zc(i) {
    try {
      fe("pathname", i);
      const e = await He.promises.readFile(i, "utf8");
      if (e)
        return fe("fetch content", e), e;
    } catch (e) {
      throw new Error("Unable to fetch file content: " + e);
    }
  }
  self.addEventListener("fetch", (i) => {
    try {
      const e = new URL(i.request.url);
      if (console.log(`Fetching: ${e.pathname}`), console.log("Service Worker scope:", self.registration.scope), console.log("Request URL path:", e.pathname), e.pathname.endsWith("/git")) {
        i.respondWith(
          Vc(i.request).catch((r) => (console.error("Error handling Git request:", r), new Response(
            JSON.stringify({ error: "Git request failed", details: r.message || r.toString() }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          )))
        );
        return;
      }
      const t = Pi && e.pathname.startsWith(Pi) ? e.pathname.slice(Pi.length - 1) : e.pathname;
      if (console.log(`Extracted path: ${t}`), Dr[t]) {
        console.log("Matched settings file path:", t), i.respondWith(
          Zc(t).then(
            (r) => new Response(r, {
              headers: { "Content-Type": "application/json" }
            })
          ).catch((r) => (console.error("Error reading file:", r), new Response(
            JSON.stringify({ error: "File not found or inaccessible", details: r.message || r.toString() }),
            { status: 404, headers: { "Content-Type": "application/json" } }
          )))
        );
        return;
      }
      i.respondWith(
        fetch(i.request).then((r) => r.ok ? r : (console.error("HTTP error response:", r.status), new Response(
          JSON.stringify({ error: "HTTP error", status: r.status }),
          { status: r.status, headers: { "Content-Type": "application/json" } }
        ))).catch((r) => (console.error("Network fetch failed:", r), new Response(
          JSON.stringify({ error: "Network error", details: r.message || r.toString() }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        )))
      );
    } catch (e) {
      console.error("Error in fetch handler:", e), i.respondWith(
        new Response(
          JSON.stringify({ error: "Unexpected error", details: e.message || e.toString() }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        )
      );
    }
  });
  class Gc {
    constructor() {
      this.queue = [], this.locked = !1;
    }
    async lock() {
      return new Promise((e) => {
        const t = () => {
          this.locked = !0, e();
        };
        this.locked ? this.queue.push(t) : t();
      });
    }
    unlock() {
      this.queue.length > 0 ? this.queue.shift()() : this.locked = !1;
    }
  }
  const rt = new Gc();
  async function Vc(i) {
    try {
      const e = await i.json().catch(() => {
        throw new Error("Invalid JSON in request body");
      }), { operation: t, args: r } = e;
      if (!t)
        return new Response(
          JSON.stringify({ error: "Missing operation field" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      let n;
      try {
        switch (t) {
          case "clone":
            n = await Kc(r);
            break;
          case "pull":
            n = await rl(r);
            break;
          case "push":
            n = await nl(r);
            break;
          case "fetch":
            n = await al(r);
            break;
          case "fastForward":
            n = await il(r);
            break;
          case "listServerRefs":
            n = await Yc(r);
            break;
          default:
            return new Response(
              JSON.stringify({ error: "Invalid operation" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
      } catch (a) {
        return console.error(`Error executing ${t}:`, a), new Response(
          JSON.stringify({
            error: `Error executing ${t}`,
            details: a.message || a.toString()
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify(n),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (e) {
      return console.error("Error in handleGitRequest:", e), new Response(
        JSON.stringify({ error: "Unexpected error", details: e.message || e.toString() }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  async function Xc({ dir: i, ref: e, branch: t }) {
    var r = /^HEAD~([0-9]+)$/, n = e.match(r);
    if (n) {
      var a = +n[1], s = await wc({ fs: He, dir: i, depth: a + 1 }), o = s.pop().oid;
      return new Promise((l, d) => {
        He.writeFile(i + `/.git/refs/heads/${t}`, o, (f) => {
          if (f)
            return d(f);
          He.unlink(i + "/.git/index", (w) => {
            if (w)
              return d(w);
            Lo({ dir: i, fs: He, ref: t, force: !0 }).then(l);
          });
        });
      });
    }
    return Promise.reject(`Wrong ref ${e}`);
  }
  async function tr(i, e, t = 2) {
    let r = 0, n = 1e3;
    for (; r <= t; )
      try {
        return await i(e);
      } catch (a) {
        if (a.message.includes("Failed to fetch") || a.message.includes("CORS") || a.message.includes("HTTP Error")) {
          if (r++, r > t) throw new Error("Max retries reached for operation.");
          fe(`Network error, Retrying operation in ${n / 1e3} seconds... (Attempt ${r})`), await new Promise((s) => setTimeout(s, n)), n *= 2;
        } else
          throw a;
      }
  }
  function rr(i, e) {
    return !i && !e ? (fe("No username or password provided. Returning empty headers."), {}) : {
      authorization: `Basic ${btoa(`${i}:${e}`)}`
    };
  }
  async function Yc(i) {
    return fe("listServerRefs args", i), await tr(async () => {
      await rt.lock();
      try {
        if (fe("Entering listServerRefs function with arguments:", i), !i.url)
          throw new Error("URL parameter is required for listServerRefs");
        const e = await uc({
          ...i,
          fs: He,
          http: Jt,
          dir: tt,
          corsProxy: Qt,
          remote: i.remote || It,
          // Fallback to global remote
          headers: rr(ft, ht),
          onAuth() {
            return at.fill();
          },
          onAuthFailure() {
            return at.rejected();
          }
        });
        return fe("ListServerRefs successful. Result:", e), { success: !0, refs: e };
      } catch (e) {
        if (e?.message?.includes("Could not find") && e?.code === "NotFoundError") {
          if (!await ir())
            throw e;
          return { success: !0, message: "listServerRefs was successful" };
        }
        return Ue("Error occurred during listServerRefs operation:", e), { success: !1, error: e.message };
      } finally {
        fe("Exiting listServerRefs function."), rt.unlock();
      }
    }, i);
  }
  async function Kc(i) {
    return fe("entering clone with : ", i), await tr(async () => {
      fe("Entering clone function with arguments:", i);
      let e = {};
      await rt.lock();
      try {
        if (e = await Qc(vt.fsName), e)
          await el(e), await Xc({ dir: tt, ref: "HEAD~1", branch: Re }), await ua("clone (from cache)", { fsName: vt.fsName }), fe("log", await sl()), e = { isCacheUsed: !0, ref: Re };
        else {
          const t = await Qo({
            ...i,
            fs: He,
            http: Jt,
            dir: tt,
            remote: It,
            ref: Re,
            corsProxy: Qt,
            depth: dr,
            headers: rr(ft, ht),
            onAuth() {
              return at.fill();
            },
            onAuthFailure() {
              return at.rejected();
            }
          });
          if (Ya) {
            const r = await Ka();
            await Jc(vt.fsName, r);
          }
          e = { isCacheUsed: !1, ref: Re }, await ua("clone", { fsName: vt.fsName, result: t });
        }
        return { success: !0, message: "The repo has successfully cloned", data: e };
      } catch (t) {
        if (Ue("Clone failed with error:", t), t?.message?.includes("Could not find") && t?.code === "NotFoundError") {
          if (!await ir())
            throw t;
          return e = { isCacheUsed: !1, ref: Re }, { success: !0, message: "The repo has successfully cloned", data: e };
        } else throw t?.response?.status === 500 ? (Ue("Server responded with 500 Internal Server Error"), new Error("Internal Server Error: The server encountered an error.")) : typeof t == "object" ? (Ue("Error properties:", Object.keys(t)), new Error(t || "An unknown error occurred during the clone operation")) : (Ue("Unknown error:", t), new Error("An unknown error occurred during the clone operation"));
      } finally {
        rt.unlock();
      }
    }, i);
  }
  async function Jc(i, e) {
    try {
      const t = await caches.open(er), r = {};
      fe("fl", e);
      for (const [a, s] of Object.entries(e)) {
        fe("fn, fp", a, s);
        const o = await He.promises.stat(s);
        if (o.isDirectory())
          r[s] = "";
        else if (o.isFile()) {
          const l = await He.promises.readFile(s, "utf8");
          r[s] = l;
        }
      }
      fe("filesWithContent", r);
      const n = new Response(JSON.stringify(r), {
        headers: { "Content-Type": "application/json" }
      });
      await t.put(i, n), fe("File list and contents cached successfully", n);
    } catch (t) {
      Ue("Error caching file list and contents:", t);
    }
  }
  async function Ka(i = tt) {
    try {
      let e = i, t = await He.promises.readdir(i), r = {};
      fe("files", t), r[i] = i;
      for (const n of t) {
        fe("file", n);
        let a = e !== "/" ? `${e}/${n}` : `${e}${n}`;
        (await He.promises.lstat(a)).isDirectory() ? (fe("fullPath", a), r = { ...r, ...await Ka(a) }) : (fe("result", r), r[a] = a);
      }
      return r;
    } catch (e) {
      throw Ue("Error listing files:", e), e;
    }
  }
  async function Qc(i) {
    try {
      const t = await (await caches.open(er)).match(i);
      if (t) {
        const r = await t.json();
        return fe("Files and contents fetched from cache:", r), r;
      } else
        return fe("No cached file list found"), null;
    } catch (e) {
      return Ue("Error fetching cached file list and contents:", e), null;
    }
  }
  async function el(i) {
    for (const [e, t] of Object.entries(i)) {
      const r = e.split("/").slice(0, -1).join("/");
      r && await tl(He, r), t === "" ? (await He.promises.mkdir(e, { recursive: !0 }), fe(`Directory created: ${e}`)) : await He.promises.writeFile(e, t);
    }
    fe("All files and contents have been written to IndexedDB using LightningFS.");
  }
  async function tl(i, e) {
    const t = e.split("/").filter((n) => n);
    let r = "";
    for (const n of t) {
      r += `/${n}`;
      try {
        await i.promises.mkdir(r), fe(`Directory created: ${r}`);
      } catch (a) {
        if (a.code !== "EEXIST")
          throw Ue(`Error creating directory: ${r}`, a), a;
      }
    }
  }
  const at = {
    async fill() {
      return fe("authenticate", ft, ht), { username: ft, password: ht };
    },
    async rejected() {
      const i = new Error("Authentication rejected");
      throw fe("Authentication rejected", i), i;
    }
  };
  async function rl(i) {
    return await tr(async () => {
      let e = {};
      await rt.lock();
      try {
        if (fe("Entering pull function with arguments:", i), !Re)
          throw new Error("Reference (ref) is not defined.");
        fe("Using reference (ref):", Re);
        const t = await _c({
          ...i,
          fs: He,
          http: Jt,
          dir: tt,
          corsProxy: Qt,
          remote: It,
          remoteRef: Re,
          fastForward: !0,
          forced: !0,
          singleBranch: !0,
          headers: rr(ft, ht),
          onAuth() {
            return at.fill();
          },
          onAuthFailure() {
            return at.rejected();
          }
        });
        return e = { ref: Re }, fe("Pull successful. Result:", t), { success: !0, message: t, data: e };
      } catch (t) {
        if (t?.message?.includes("Could not find") && t?.code === "NotFoundError") {
          if (!await ir())
            throw t;
          return e = { ref: Re }, { success: !0, message: "pull was successful", data: e };
        }
        throw Ue("Error occurred during pull operation:", t), new Error(`Pull failed: ${t}`);
      } finally {
        fe("Exiting pull function."), rt.unlock();
      }
    }, i);
  }
  async function il(i) {
    return await tr(async () => {
      let e = {};
      await rt.lock();
      try {
        if (fe("Entering fastForward function with arguments:", i), !Re)
          throw new Error("Reference (ref) is not defined.");
        const t = await nc({
          ...i,
          fs: He,
          http: Jt,
          dir: tt,
          remote: It,
          corsProxy: Qt,
          ref: Re,
          remoteref: Re,
          forced: !0,
          singleBranch: !1,
          headers: rr(ft, ht),
          onAuth() {
            return at.fill();
          },
          onAuthFailure() {
            return at.rejected();
          }
        });
        return e = { ref: Re }, fe("FastForward pull successful. Result:", t), { success: !0, message: t, data: e };
      } catch (t) {
        if (t?.message?.includes("Could not find") && t?.code === "NotFoundError") {
          if (!await ir())
            throw t;
          return e = { ref: Re }, { success: !0, message: "FastForward was successful", data: e };
        }
        throw Ue("Error occurred during fastForward operation:", t), new Error(`FastForward pull failed: ${t}`);
      } finally {
        fe("Exiting fastForward function."), rt.unlock();
      }
    }, i);
  }
  async function nl(i) {
    return await tr(async () => {
      let e = {};
      await rt.lock();
      try {
        if (fe("Entering push function with arguments:", i), !Re)
          throw new Error("Reference (ref) is not defined.");
        const t = await Ec({
          ...i,
          fs: He,
          http: Jt,
          dir: tt,
          corsProxy: Qt,
          remote: It,
          ref: Re,
          force: !0,
          headers: rr(ft, ht),
          onAuth() {
            return at.fill();
          },
          onAuthFailure() {
            return at.rejected();
          }
        });
        return e = { ref: Re }, fe("Push successful. Result:", t), { success: !0, message: "Push was successful", data: e };
      } catch (t) {
        if (t?.message?.includes("Could not find") && t?.code === "NotFoundError") {
          if (!await ir())
            throw t;
          return e = { ref: Re }, { success: !0, message: "Push was successful", data: e };
        }
        Ue("Error occurred during push operation:", t);
      } finally {
        fe("Exiting push function."), rt.unlock();
      }
    }, i);
  }
  async function al(i) {
    return await tr(async () => {
      let e = {};
      await rt.lock();
      try {
        if (fe("Entering doFetch function with arguments:", i), !Re)
          throw new Error("Reference (ref) is not defined.");
        let t = i?.ref || Re;
        const r = await ac({
          ...i,
          fs: He,
          http: Jt,
          dir: tt,
          corsProxy: Qt,
          ref: t,
          remote: It,
          depth: dr,
          singleBranch: !1,
          tags: !1,
          onProgress: (n) => {
            fe("Fetch progress event:", n);
          },
          headers: rr(ft, ht),
          onAuth() {
            return at.fill();
          },
          onAuthFailure() {
            return at.rejected();
          }
        });
        return e = { ref: Re }, fe("Fetch successful. Result:", r), { success: !0, message: "Fetch was successful", data: e };
      } catch (t) {
        if (t?.message?.includes("Could not find") && t?.code === "NotFoundError") {
          if (!await ir())
            throw t;
          return e = { ref: Re }, { success: !0, message: "The repo has successfully cloned", data: e };
        }
        throw Ue("Error occurred during fetch operation:", t), new Error(`Fetch failed: ${t}`);
      } finally {
        fe("Exiting doFetch function."), rt.unlock();
      }
    }, i);
  }
  async function ua(i, e) {
    try {
      const t = await caches.open(er);
      let r = await caches.match("log"), n = r ? await r.json() : [];
      const a = (/* @__PURE__ */ new Date()).toISOString(), s = { action: i, data: e, timestamp: a };
      n.push(s);
      let o = new Blob([JSON.stringify(n)]).size;
      const l = 5 * 1024;
      for (; o > l; )
        n.shift(), o = new Blob([JSON.stringify(n)]).size;
      const d = new Response(JSON.stringify(n), { headers: { "Content-Type": "application/json" } });
      await t.put("log", d), fe(`Logged action: ${i} at ${a}`, s);
    } catch (t) {
      Ue("Error logging data to cache:", t);
    }
  }
  async function sl() {
    try {
      const e = await (await caches.open(er)).match("log");
      if (e) {
        const t = await e.json();
        return fe("Retrieved logs from cache:", t), t;
      } else
        return fe("No logs found in cache."), [];
    } catch (i) {
      return Ue("Error retrieving logs from cache:", i), [];
    }
  }
  async function ir() {
    try {
      throw rt.unlock(), Ue("Only Main is supported for refs."), new Error("Only Main is supported for refs.");
    } catch (i) {
      throw Ue(`Checkout to branch "${Re}" failed:`, i), i;
    }
  }
});
export default ol();
//# sourceMappingURL=service-worker.js.map
