import { g as Ht, B as ae, L as Er } from "./index-jVhJ2jaE.js";
import { g as Mr, L as Ur } from "./configES6-CEaFOXV3.js";
function ac(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var us = { exports: {} }, qe = us.exports = {}, gt, _t;
function Mi() {
  throw new Error("setTimeout has not been defined");
}
function Ui() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? gt = setTimeout : gt = Mi;
  } catch {
    gt = Mi;
  }
  try {
    typeof clearTimeout == "function" ? _t = clearTimeout : _t = Ui;
  } catch {
    _t = Ui;
  }
})();
function fs(n) {
  if (gt === setTimeout)
    return setTimeout(n, 0);
  if ((gt === Mi || !gt) && setTimeout)
    return gt = setTimeout, setTimeout(n, 0);
  try {
    return gt(n, 0);
  } catch {
    try {
      return gt.call(null, n, 0);
    } catch {
      return gt.call(this, n, 0);
    }
  }
}
function oc(n) {
  if (_t === clearTimeout)
    return clearTimeout(n);
  if ((_t === Ui || !_t) && clearTimeout)
    return _t = clearTimeout, clearTimeout(n);
  try {
    return _t(n);
  } catch {
    try {
      return _t.call(null, n);
    } catch {
      return _t.call(this, n);
    }
  }
}
var At = [], Xt = !1, Mt, Rr = -1;
function sc() {
  !Xt || !Mt || (Xt = !1, Mt.length ? At = Mt.concat(At) : Rr = -1, At.length && hs());
}
function hs() {
  if (!Xt) {
    var n = fs(sc);
    Xt = !0;
    for (var e = At.length; e; ) {
      for (Mt = At, At = []; ++Rr < e; )
        Mt && Mt[Rr].run();
      Rr = -1, e = At.length;
    }
    Mt = null, Xt = !1, oc(n);
  }
}
qe.nextTick = function(n) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var t = 1; t < arguments.length; t++)
      e[t - 1] = arguments[t];
  At.push(new ds(n, e)), At.length === 1 && !Xt && fs(hs);
};
function ds(n, e) {
  this.fun = n, this.array = e;
}
ds.prototype.run = function() {
  this.fun.apply(null, this.array);
};
qe.title = "browser";
qe.browser = !0;
qe.env = {};
qe.argv = [];
qe.version = "";
qe.versions = {};
function Rt() {
}
qe.on = Rt;
qe.addListener = Rt;
qe.once = Rt;
qe.off = Rt;
qe.removeListener = Rt;
qe.removeAllListeners = Rt;
qe.emit = Rt;
qe.prependListener = Rt;
qe.prependOnceListener = Rt;
qe.listeners = function(n) {
  return [];
};
qe.binding = function(n) {
  throw new Error("process.binding is not supported");
};
qe.cwd = function() {
  return "/";
};
qe.chdir = function(n) {
  throw new Error("process.chdir is not supported");
};
qe.umask = function() {
  return 0;
};
var cc = us.exports;
const rt = /* @__PURE__ */ ac(cc);
var sn, ha;
function lc() {
  if (ha) return sn;
  ha = 1;
  var n = function(e) {
    if (e = e || {}, this.Promise = e.Promise || Promise, this.queues = /* @__PURE__ */ Object.create(null), this.domainReentrant = e.domainReentrant || !1, this.domainReentrant) {
      if (typeof rt > "u" || typeof rt.domain > "u")
        throw new Error(
          "Domain-reentrant locks require `process.domain` to exist. Please flip `opts.domainReentrant = false`, use a NodeJS version that still implements Domain, or install a browser polyfill."
        );
      this.domains = /* @__PURE__ */ Object.create(null);
    }
    this.timeout = e.timeout || n.DEFAULT_TIMEOUT, this.maxOccupationTime = e.maxOccupationTime || n.DEFAULT_MAX_OCCUPATION_TIME, this.maxExecutionTime = e.maxExecutionTime || n.DEFAULT_MAX_EXECUTION_TIME, e.maxPending === 1 / 0 || Number.isInteger(e.maxPending) && e.maxPending >= 0 ? this.maxPending = e.maxPending : this.maxPending = n.DEFAULT_MAX_PENDING;
  };
  return n.DEFAULT_TIMEOUT = 0, n.DEFAULT_MAX_OCCUPATION_TIME = 0, n.DEFAULT_MAX_EXECUTION_TIME = 0, n.DEFAULT_MAX_PENDING = 1e3, n.prototype.acquire = function(e, t, r, i) {
    if (Array.isArray(e))
      return this._acquireBatch(e, t, r, i);
    if (typeof t != "function")
      throw new Error("You must pass a function to execute");
    var a = null, o = null, c = null;
    typeof r != "function" && (i = r, r = null, c = new this.Promise(function(k, P) {
      a = k, o = P;
    })), i = i || {};
    var s = !1, h = null, l = null, p = null, w = this, _ = function(k, P, D) {
      l && (clearTimeout(l), l = null), p && (clearTimeout(p), p = null), k && (w.queues[e] && w.queues[e].length === 0 && delete w.queues[e], w.domainReentrant && delete w.domains[e]), s || (c ? P ? o(P) : a(D) : typeof r == "function" && r(P, D), s = !0), k && w.queues[e] && w.queues[e].length > 0 && w.queues[e].shift()();
    }, A = function(k) {
      if (s)
        return _(k);
      h && (clearTimeout(h), h = null), w.domainReentrant && k && (w.domains[e] = rt.domain);
      var P = i.maxExecutionTime || w.maxExecutionTime;
      if (P && (p = setTimeout(function() {
        w.queues[e] && _(k, new Error("Maximum execution time is exceeded " + e));
      }, P)), t.length === 1) {
        var D = !1;
        try {
          t(function(F, I) {
            D || (D = !0, _(k, F, I));
          });
        } catch (F) {
          D || (D = !0, _(k, F));
        }
      } else
        w._promiseTry(function() {
          return t();
        }).then(function(F) {
          _(k, void 0, F);
        }, function(F) {
          _(k, F);
        });
    };
    w.domainReentrant && rt.domain && (A = rt.domain.bind(A));
    var S = i.maxPending || w.maxPending;
    if (!w.queues[e])
      w.queues[e] = [], A(!0);
    else if (w.domainReentrant && rt.domain && rt.domain === w.domains[e])
      A(!1);
    else if (w.queues[e].length >= S)
      _(!1, new Error("Too many pending tasks in queue " + e));
    else {
      var v = function() {
        A(!0);
      };
      i.skipQueue ? w.queues[e].unshift(v) : w.queues[e].push(v);
      var R = i.timeout || w.timeout;
      R && (h = setTimeout(function() {
        h = null, _(!1, new Error("async-lock timed out in queue " + e));
      }, R));
    }
    var x = i.maxOccupationTime || w.maxOccupationTime;
    if (x && (l = setTimeout(function() {
      w.queues[e] && _(!1, new Error("Maximum occupation time is exceeded in queue " + e));
    }, x)), c)
      return c;
  }, n.prototype._acquireBatch = function(e, t, r, i) {
    typeof r != "function" && (i = r, r = null);
    var a = this, o = function(s, h) {
      return function(l) {
        a.acquire(s, h, l, i);
      };
    }, c = e.reduceRight(function(s, h) {
      return o(h, s);
    }, t);
    if (typeof r == "function")
      c(r);
    else
      return new this.Promise(function(s, h) {
        c.length === 1 ? c(function(l, p) {
          l ? h(l) : s(p);
        }) : s(c());
      });
  }, n.prototype.isBusy = function(e) {
    return e ? !!this.queues[e] : Object.keys(this.queues).length > 0;
  }, n.prototype._promiseTry = function(e) {
    try {
      return this.Promise.resolve(e());
    } catch (t) {
      return this.Promise.reject(t);
    }
  }, sn = n, sn;
}
var cn, da;
function uc() {
  return da || (da = 1, cn = lc()), cn;
}
var fc = uc();
const $r = /* @__PURE__ */ Ht(fc);
var kr = { exports: {} }, pa;
function hc() {
  return pa || (pa = 1, typeof Object.create == "function" ? kr.exports = function(e, t) {
    t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
      constructor: {
        value: e,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : kr.exports = function(e, t) {
    if (t) {
      e.super_ = t;
      var r = function() {
      };
      r.prototype = t.prototype, e.prototype = new r(), e.prototype.constructor = e;
    }
  }), kr.exports;
}
var Sr = { exports: {} }, ln = {}, wa;
function dc() {
  return wa || (wa = 1, function(n) {
    Object.defineProperties(n, { __esModule: { value: !0 }, [Symbol.toStringTag]: { value: "Module" } });
    var e = {}, t = {};
    t.byteLength = l, t.toByteArray = w, t.fromByteArray = S;
    for (var r = [], i = [], a = typeof Uint8Array < "u" ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = 0, s = o.length; c < s; ++c)
      r[c] = o[c], i[o.charCodeAt(c)] = c;
    i[45] = 62, i[95] = 63;
    function h(x) {
      var k = x.length;
      if (k % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      var P = x.indexOf("=");
      P === -1 && (P = k);
      var D = P === k ? 0 : 4 - P % 4;
      return [P, D];
    }
    function l(x) {
      var k = h(x), P = k[0], D = k[1];
      return (P + D) * 3 / 4 - D;
    }
    function p(x, k, P) {
      return (k + P) * 3 / 4 - P;
    }
    function w(x) {
      var k, P = h(x), D = P[0], F = P[1], I = new a(p(x, D, F)), $ = 0, U = F > 0 ? D - 4 : D, N;
      for (N = 0; N < U; N += 4)
        k = i[x.charCodeAt(N)] << 18 | i[x.charCodeAt(N + 1)] << 12 | i[x.charCodeAt(N + 2)] << 6 | i[x.charCodeAt(N + 3)], I[$++] = k >> 16 & 255, I[$++] = k >> 8 & 255, I[$++] = k & 255;
      return F === 2 && (k = i[x.charCodeAt(N)] << 2 | i[x.charCodeAt(N + 1)] >> 4, I[$++] = k & 255), F === 1 && (k = i[x.charCodeAt(N)] << 10 | i[x.charCodeAt(N + 1)] << 4 | i[x.charCodeAt(N + 2)] >> 2, I[$++] = k >> 8 & 255, I[$++] = k & 255), I;
    }
    function _(x) {
      return r[x >> 18 & 63] + r[x >> 12 & 63] + r[x >> 6 & 63] + r[x & 63];
    }
    function A(x, k, P) {
      for (var D, F = [], I = k; I < P; I += 3)
        D = (x[I] << 16 & 16711680) + (x[I + 1] << 8 & 65280) + (x[I + 2] & 255), F.push(_(D));
      return F.join("");
    }
    function S(x) {
      for (var k, P = x.length, D = P % 3, F = [], I = 16383, $ = 0, U = P - D; $ < U; $ += I)
        F.push(A(x, $, $ + I > U ? U : $ + I));
      return D === 1 ? (k = x[P - 1], F.push(
        r[k >> 2] + r[k << 4 & 63] + "=="
      )) : D === 2 && (k = (x[P - 2] << 8) + x[P - 1], F.push(
        r[k >> 10] + r[k >> 4 & 63] + r[k << 2 & 63] + "="
      )), F.join("");
    }
    var v = {};
    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    v.read = function(x, k, P, D, F) {
      var I, $, U = F * 8 - D - 1, N = (1 << U) - 1, G = N >> 1, T = -7, Z = P ? F - 1 : 0, Q = P ? -1 : 1, se = x[k + Z];
      for (Z += Q, I = se & (1 << -T) - 1, se >>= -T, T += U; T > 0; I = I * 256 + x[k + Z], Z += Q, T -= 8)
        ;
      for ($ = I & (1 << -T) - 1, I >>= -T, T += D; T > 0; $ = $ * 256 + x[k + Z], Z += Q, T -= 8)
        ;
      if (I === 0)
        I = 1 - G;
      else {
        if (I === N)
          return $ ? NaN : (se ? -1 : 1) * (1 / 0);
        $ = $ + Math.pow(2, D), I = I - G;
      }
      return (se ? -1 : 1) * $ * Math.pow(2, I - D);
    }, v.write = function(x, k, P, D, F, I) {
      var $, U, N, G = I * 8 - F - 1, T = (1 << G) - 1, Z = T >> 1, Q = F === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, se = D ? 0 : I - 1, V = D ? 1 : -1, q = k < 0 || k === 0 && 1 / k < 0 ? 1 : 0;
      for (k = Math.abs(k), isNaN(k) || k === 1 / 0 ? (U = isNaN(k) ? 1 : 0, $ = T) : ($ = Math.floor(Math.log(k) / Math.LN2), k * (N = Math.pow(2, -$)) < 1 && ($--, N *= 2), $ + Z >= 1 ? k += Q / N : k += Q * Math.pow(2, 1 - Z), k * N >= 2 && ($++, N /= 2), $ + Z >= T ? (U = 0, $ = T) : $ + Z >= 1 ? (U = (k * N - 1) * Math.pow(2, F), $ = $ + Z) : (U = k * Math.pow(2, Z - 1) * Math.pow(2, F), $ = 0)); F >= 8; x[P + se] = U & 255, se += V, U /= 256, F -= 8)
        ;
      for ($ = $ << F | U, G += F; G > 0; x[P + se] = $ & 255, se += V, $ /= 256, G -= 8)
        ;
      x[P + se - V] |= q * 128;
    };
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */
    (function(x) {
      const k = t, P = v, D = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
      x.Buffer = T, x.SlowBuffer = _e, x.INSPECT_MAX_BYTES = 50;
      const F = 2147483647;
      x.kMaxLength = F;
      const { Uint8Array: I, ArrayBuffer: $, SharedArrayBuffer: U } = globalThis;
      T.TYPED_ARRAY_SUPPORT = N(), !T.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
      function N() {
        try {
          const m = new I(1), u = { foo: function() {
            return 42;
          } };
          return Object.setPrototypeOf(u, I.prototype), Object.setPrototypeOf(m, u), m.foo() === 42;
        } catch {
          return !1;
        }
      }
      Object.defineProperty(T.prototype, "parent", {
        enumerable: !0,
        get: function() {
          if (T.isBuffer(this))
            return this.buffer;
        }
      }), Object.defineProperty(T.prototype, "offset", {
        enumerable: !0,
        get: function() {
          if (T.isBuffer(this))
            return this.byteOffset;
        }
      });
      function G(m) {
        if (m > F)
          throw new RangeError('The value "' + m + '" is invalid for option "size"');
        const u = new I(m);
        return Object.setPrototypeOf(u, T.prototype), u;
      }
      function T(m, u, d) {
        if (typeof m == "number") {
          if (typeof u == "string")
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          return V(m);
        }
        return Z(m, u, d);
      }
      T.poolSize = 8192;
      function Z(m, u, d) {
        if (typeof m == "string")
          return q(m, u);
        if ($.isView(m))
          return ne(m);
        if (m == null)
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof m
          );
        if (g(m, $) || m && g(m.buffer, $) || typeof U < "u" && (g(m, U) || m && g(m.buffer, U)))
          return we(m, u, d);
        if (typeof m == "number")
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        const E = m.valueOf && m.valueOf();
        if (E != null && E !== m)
          return T.from(E, u, d);
        const B = ge(m);
        if (B) return B;
        if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof m[Symbol.toPrimitive] == "function")
          return T.from(m[Symbol.toPrimitive]("string"), u, d);
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof m
        );
      }
      T.from = function(m, u, d) {
        return Z(m, u, d);
      }, Object.setPrototypeOf(T.prototype, I.prototype), Object.setPrototypeOf(T, I);
      function Q(m) {
        if (typeof m != "number")
          throw new TypeError('"size" argument must be of type number');
        if (m < 0)
          throw new RangeError('The value "' + m + '" is invalid for option "size"');
      }
      function se(m, u, d) {
        return Q(m), m <= 0 ? G(m) : u !== void 0 ? typeof d == "string" ? G(m).fill(u, d) : G(m).fill(u) : G(m);
      }
      T.alloc = function(m, u, d) {
        return se(m, u, d);
      };
      function V(m) {
        return Q(m), G(m < 0 ? 0 : ce(m) | 0);
      }
      T.allocUnsafe = function(m) {
        return V(m);
      }, T.allocUnsafeSlow = function(m) {
        return V(m);
      };
      function q(m, u) {
        if ((typeof u != "string" || u === "") && (u = "utf8"), !T.isEncoding(u))
          throw new TypeError("Unknown encoding: " + u);
        const d = ke(m, u) | 0;
        let E = G(d);
        const B = E.write(m, u);
        return B !== d && (E = E.slice(0, B)), E;
      }
      function K(m) {
        const u = m.length < 0 ? 0 : ce(m.length) | 0, d = G(u);
        for (let E = 0; E < u; E += 1)
          d[E] = m[E] & 255;
        return d;
      }
      function ne(m) {
        if (g(m, I)) {
          const u = new I(m);
          return we(u.buffer, u.byteOffset, u.byteLength);
        }
        return K(m);
      }
      function we(m, u, d) {
        if (u < 0 || m.byteLength < u)
          throw new RangeError('"offset" is outside of buffer bounds');
        if (m.byteLength < u + (d || 0))
          throw new RangeError('"length" is outside of buffer bounds');
        let E;
        return u === void 0 && d === void 0 ? E = new I(m) : d === void 0 ? E = new I(m, u) : E = new I(m, u, d), Object.setPrototypeOf(E, T.prototype), E;
      }
      function ge(m) {
        if (T.isBuffer(m)) {
          const u = ce(m.length) | 0, d = G(u);
          return d.length === 0 || m.copy(d, 0, 0, u), d;
        }
        if (m.length !== void 0)
          return typeof m.length != "number" || O(m.length) ? G(0) : K(m);
        if (m.type === "Buffer" && Array.isArray(m.data))
          return K(m.data);
      }
      function ce(m) {
        if (m >= F)
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + F.toString(16) + " bytes");
        return m | 0;
      }
      function _e(m) {
        return +m != m && (m = 0), T.alloc(+m);
      }
      T.isBuffer = function(u) {
        return u != null && u._isBuffer === !0 && u !== T.prototype;
      }, T.compare = function(u, d) {
        if (g(u, I) && (u = T.from(u, u.offset, u.byteLength)), g(d, I) && (d = T.from(d, d.offset, d.byteLength)), !T.isBuffer(u) || !T.isBuffer(d))
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        if (u === d) return 0;
        let E = u.length, B = d.length;
        for (let M = 0, H = Math.min(E, B); M < H; ++M)
          if (u[M] !== d[M]) {
            E = u[M], B = d[M];
            break;
          }
        return E < B ? -1 : B < E ? 1 : 0;
      }, T.isEncoding = function(u) {
        switch (String(u).toLowerCase()) {
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
      }, T.concat = function(u, d) {
        if (!Array.isArray(u))
          throw new TypeError('"list" argument must be an Array of Buffers');
        if (u.length === 0)
          return T.alloc(0);
        let E;
        if (d === void 0)
          for (d = 0, E = 0; E < u.length; ++E)
            d += u[E].length;
        const B = T.allocUnsafe(d);
        let M = 0;
        for (E = 0; E < u.length; ++E) {
          let H = u[E];
          if (g(H, I))
            M + H.length > B.length ? (T.isBuffer(H) || (H = T.from(H)), H.copy(B, M)) : I.prototype.set.call(
              B,
              H,
              M
            );
          else if (T.isBuffer(H))
            H.copy(B, M);
          else
            throw new TypeError('"list" argument must be an Array of Buffers');
          M += H.length;
        }
        return B;
      };
      function ke(m, u) {
        if (T.isBuffer(m))
          return m.length;
        if ($.isView(m) || g(m, $))
          return m.byteLength;
        if (typeof m != "string")
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof m
          );
        const d = m.length, E = arguments.length > 2 && arguments[2] === !0;
        if (!E && d === 0) return 0;
        let B = !1;
        for (; ; )
          switch (u) {
            case "ascii":
            case "latin1":
            case "binary":
              return d;
            case "utf8":
            case "utf-8":
              return X(m).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return d * 2;
            case "hex":
              return d >>> 1;
            case "base64":
              return L(m).length;
            default:
              if (B)
                return E ? -1 : X(m).length;
              u = ("" + u).toLowerCase(), B = !0;
          }
      }
      T.byteLength = ke;
      function Ce(m, u, d) {
        let E = !1;
        if ((u === void 0 || u < 0) && (u = 0), u > this.length || ((d === void 0 || d > this.length) && (d = this.length), d <= 0) || (d >>>= 0, u >>>= 0, d <= u))
          return "";
        for (m || (m = "utf8"); ; )
          switch (m) {
            case "hex":
              return et(this, u, d);
            case "utf8":
            case "utf-8":
              return Oe(this, u, d);
            case "ascii":
              return pe(this, u, d);
            case "latin1":
            case "binary":
              return We(this, u, d);
            case "base64":
              return Be(this, u, d);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return He(this, u, d);
            default:
              if (E) throw new TypeError("Unknown encoding: " + m);
              m = (m + "").toLowerCase(), E = !0;
          }
      }
      T.prototype._isBuffer = !0;
      function me(m, u, d) {
        const E = m[u];
        m[u] = m[d], m[d] = E;
      }
      T.prototype.swap16 = function() {
        const u = this.length;
        if (u % 2 !== 0)
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (let d = 0; d < u; d += 2)
          me(this, d, d + 1);
        return this;
      }, T.prototype.swap32 = function() {
        const u = this.length;
        if (u % 4 !== 0)
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (let d = 0; d < u; d += 4)
          me(this, d, d + 3), me(this, d + 1, d + 2);
        return this;
      }, T.prototype.swap64 = function() {
        const u = this.length;
        if (u % 8 !== 0)
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (let d = 0; d < u; d += 8)
          me(this, d, d + 7), me(this, d + 1, d + 6), me(this, d + 2, d + 5), me(this, d + 3, d + 4);
        return this;
      }, T.prototype.toString = function() {
        const u = this.length;
        return u === 0 ? "" : arguments.length === 0 ? Oe(this, 0, u) : Ce.apply(this, arguments);
      }, T.prototype.toLocaleString = T.prototype.toString, T.prototype.equals = function(u) {
        if (!T.isBuffer(u)) throw new TypeError("Argument must be a Buffer");
        return this === u ? !0 : T.compare(this, u) === 0;
      }, T.prototype.inspect = function() {
        let u = "";
        const d = x.INSPECT_MAX_BYTES;
        return u = this.toString("hex", 0, d).replace(/(.{2})/g, "$1 ").trim(), this.length > d && (u += " ... "), "<Buffer " + u + ">";
      }, D && (T.prototype[D] = T.prototype.inspect), T.prototype.compare = function(u, d, E, B, M) {
        if (g(u, I) && (u = T.from(u, u.offset, u.byteLength)), !T.isBuffer(u))
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof u
          );
        if (d === void 0 && (d = 0), E === void 0 && (E = u ? u.length : 0), B === void 0 && (B = 0), M === void 0 && (M = this.length), d < 0 || E > u.length || B < 0 || M > this.length)
          throw new RangeError("out of range index");
        if (B >= M && d >= E)
          return 0;
        if (B >= M)
          return -1;
        if (d >= E)
          return 1;
        if (d >>>= 0, E >>>= 0, B >>>= 0, M >>>= 0, this === u) return 0;
        let H = M - B, le = E - d;
        const De = Math.min(H, le), Pe = this.slice(B, M), ye = u.slice(d, E);
        for (let be = 0; be < De; ++be)
          if (Pe[be] !== ye[be]) {
            H = Pe[be], le = ye[be];
            break;
          }
        return H < le ? -1 : le < H ? 1 : 0;
      };
      function de(m, u, d, E, B) {
        if (m.length === 0) return -1;
        if (typeof d == "string" ? (E = d, d = 0) : d > 2147483647 ? d = 2147483647 : d < -2147483648 && (d = -2147483648), d = +d, O(d) && (d = B ? 0 : m.length - 1), d < 0 && (d = m.length + d), d >= m.length) {
          if (B) return -1;
          d = m.length - 1;
        } else if (d < 0)
          if (B) d = 0;
          else return -1;
        if (typeof u == "string" && (u = T.from(u, E)), T.isBuffer(u))
          return u.length === 0 ? -1 : Se(m, u, d, E, B);
        if (typeof u == "number")
          return u = u & 255, typeof I.prototype.indexOf == "function" ? B ? I.prototype.indexOf.call(m, u, d) : I.prototype.lastIndexOf.call(m, u, d) : Se(m, [u], d, E, B);
        throw new TypeError("val must be string, number or Buffer");
      }
      function Se(m, u, d, E, B) {
        let M = 1, H = m.length, le = u.length;
        if (E !== void 0 && (E = String(E).toLowerCase(), E === "ucs2" || E === "ucs-2" || E === "utf16le" || E === "utf-16le")) {
          if (m.length < 2 || u.length < 2)
            return -1;
          M = 2, H /= 2, le /= 2, d /= 2;
        }
        function De(ye, be) {
          return M === 1 ? ye[be] : ye.readUInt16BE(be * M);
        }
        let Pe;
        if (B) {
          let ye = -1;
          for (Pe = d; Pe < H; Pe++)
            if (De(m, Pe) === De(u, ye === -1 ? 0 : Pe - ye)) {
              if (ye === -1 && (ye = Pe), Pe - ye + 1 === le) return ye * M;
            } else
              ye !== -1 && (Pe -= Pe - ye), ye = -1;
        } else
          for (d + le > H && (d = H - le), Pe = d; Pe >= 0; Pe--) {
            let ye = !0;
            for (let be = 0; be < le; be++)
              if (De(m, Pe + be) !== De(u, be)) {
                ye = !1;
                break;
              }
            if (ye) return Pe;
          }
        return -1;
      }
      T.prototype.includes = function(u, d, E) {
        return this.indexOf(u, d, E) !== -1;
      }, T.prototype.indexOf = function(u, d, E) {
        return de(this, u, d, E, !0);
      }, T.prototype.lastIndexOf = function(u, d, E) {
        return de(this, u, d, E, !1);
      };
      function Te(m, u, d, E) {
        d = Number(d) || 0;
        const B = m.length - d;
        E ? (E = Number(E), E > B && (E = B)) : E = B;
        const M = u.length;
        E > M / 2 && (E = M / 2);
        let H;
        for (H = 0; H < E; ++H) {
          const le = parseInt(u.substr(H * 2, 2), 16);
          if (O(le)) return H;
          m[d + H] = le;
        }
        return H;
      }
      function ve(m, u, d, E) {
        return z(X(u, m.length - d), m, d, E);
      }
      function xe(m, u, d, E) {
        return z(ue(u), m, d, E);
      }
      function ee(m, u, d, E) {
        return z(L(u), m, d, E);
      }
      function fe(m, u, d, E) {
        return z(f(u, m.length - d), m, d, E);
      }
      T.prototype.write = function(u, d, E, B) {
        if (d === void 0)
          B = "utf8", E = this.length, d = 0;
        else if (E === void 0 && typeof d == "string")
          B = d, E = this.length, d = 0;
        else if (isFinite(d))
          d = d >>> 0, isFinite(E) ? (E = E >>> 0, B === void 0 && (B = "utf8")) : (B = E, E = void 0);
        else
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        const M = this.length - d;
        if ((E === void 0 || E > M) && (E = M), u.length > 0 && (E < 0 || d < 0) || d > this.length)
          throw new RangeError("Attempt to write outside buffer bounds");
        B || (B = "utf8");
        let H = !1;
        for (; ; )
          switch (B) {
            case "hex":
              return Te(this, u, d, E);
            case "utf8":
            case "utf-8":
              return ve(this, u, d, E);
            case "ascii":
            case "latin1":
            case "binary":
              return xe(this, u, d, E);
            case "base64":
              return ee(this, u, d, E);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return fe(this, u, d, E);
            default:
              if (H) throw new TypeError("Unknown encoding: " + B);
              B = ("" + B).toLowerCase(), H = !0;
          }
      }, T.prototype.toJSON = function() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function Be(m, u, d) {
        return u === 0 && d === m.length ? k.fromByteArray(m) : k.fromByteArray(m.slice(u, d));
      }
      function Oe(m, u, d) {
        d = Math.min(m.length, d);
        const E = [];
        let B = u;
        for (; B < d; ) {
          const M = m[B];
          let H = null, le = M > 239 ? 4 : M > 223 ? 3 : M > 191 ? 2 : 1;
          if (B + le <= d) {
            let De, Pe, ye, be;
            switch (le) {
              case 1:
                M < 128 && (H = M);
                break;
              case 2:
                De = m[B + 1], (De & 192) === 128 && (be = (M & 31) << 6 | De & 63, be > 127 && (H = be));
                break;
              case 3:
                De = m[B + 1], Pe = m[B + 2], (De & 192) === 128 && (Pe & 192) === 128 && (be = (M & 15) << 12 | (De & 63) << 6 | Pe & 63, be > 2047 && (be < 55296 || be > 57343) && (H = be));
                break;
              case 4:
                De = m[B + 1], Pe = m[B + 2], ye = m[B + 3], (De & 192) === 128 && (Pe & 192) === 128 && (ye & 192) === 128 && (be = (M & 15) << 18 | (De & 63) << 12 | (Pe & 63) << 6 | ye & 63, be > 65535 && be < 1114112 && (H = be));
            }
          }
          H === null ? (H = 65533, le = 1) : H > 65535 && (H -= 65536, E.push(H >>> 10 & 1023 | 55296), H = 56320 | H & 1023), E.push(H), B += le;
        }
        return Ae(E);
      }
      const Re = 4096;
      function Ae(m) {
        const u = m.length;
        if (u <= Re)
          return String.fromCharCode.apply(String, m);
        let d = "", E = 0;
        for (; E < u; )
          d += String.fromCharCode.apply(
            String,
            m.slice(E, E += Re)
          );
        return d;
      }
      function pe(m, u, d) {
        let E = "";
        d = Math.min(m.length, d);
        for (let B = u; B < d; ++B)
          E += String.fromCharCode(m[B] & 127);
        return E;
      }
      function We(m, u, d) {
        let E = "";
        d = Math.min(m.length, d);
        for (let B = u; B < d; ++B)
          E += String.fromCharCode(m[B]);
        return E;
      }
      function et(m, u, d) {
        const E = m.length;
        (!u || u < 0) && (u = 0), (!d || d < 0 || d > E) && (d = E);
        let B = "";
        for (let M = u; M < d; ++M)
          B += j[m[M]];
        return B;
      }
      function He(m, u, d) {
        const E = m.slice(u, d);
        let B = "";
        for (let M = 0; M < E.length - 1; M += 2)
          B += String.fromCharCode(E[M] + E[M + 1] * 256);
        return B;
      }
      T.prototype.slice = function(u, d) {
        const E = this.length;
        u = ~~u, d = d === void 0 ? E : ~~d, u < 0 ? (u += E, u < 0 && (u = 0)) : u > E && (u = E), d < 0 ? (d += E, d < 0 && (d = 0)) : d > E && (d = E), d < u && (d = u);
        const B = this.subarray(u, d);
        return Object.setPrototypeOf(B, T.prototype), B;
      };
      function Ie(m, u, d) {
        if (m % 1 !== 0 || m < 0) throw new RangeError("offset is not uint");
        if (m + u > d) throw new RangeError("Trying to access beyond buffer length");
      }
      T.prototype.readUintLE = T.prototype.readUIntLE = function(u, d, E) {
        u = u >>> 0, d = d >>> 0, E || Ie(u, d, this.length);
        let B = this[u], M = 1, H = 0;
        for (; ++H < d && (M *= 256); )
          B += this[u + H] * M;
        return B;
      }, T.prototype.readUintBE = T.prototype.readUIntBE = function(u, d, E) {
        u = u >>> 0, d = d >>> 0, E || Ie(u, d, this.length);
        let B = this[u + --d], M = 1;
        for (; d > 0 && (M *= 256); )
          B += this[u + --d] * M;
        return B;
      }, T.prototype.readUint8 = T.prototype.readUInt8 = function(u, d) {
        return u = u >>> 0, d || Ie(u, 1, this.length), this[u];
      }, T.prototype.readUint16LE = T.prototype.readUInt16LE = function(u, d) {
        return u = u >>> 0, d || Ie(u, 2, this.length), this[u] | this[u + 1] << 8;
      }, T.prototype.readUint16BE = T.prototype.readUInt16BE = function(u, d) {
        return u = u >>> 0, d || Ie(u, 2, this.length), this[u] << 8 | this[u + 1];
      }, T.prototype.readUint32LE = T.prototype.readUInt32LE = function(u, d) {
        return u = u >>> 0, d || Ie(u, 4, this.length), (this[u] | this[u + 1] << 8 | this[u + 2] << 16) + this[u + 3] * 16777216;
      }, T.prototype.readUint32BE = T.prototype.readUInt32BE = function(u, d) {
        return u = u >>> 0, d || Ie(u, 4, this.length), this[u] * 16777216 + (this[u + 1] << 16 | this[u + 2] << 8 | this[u + 3]);
      }, T.prototype.readBigUInt64LE = ie(function(u) {
        u = u >>> 0, te(u, "offset");
        const d = this[u], E = this[u + 7];
        (d === void 0 || E === void 0) && C(u, this.length - 8);
        const B = d + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + this[++u] * 2 ** 24, M = this[++u] + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + E * 2 ** 24;
        return BigInt(B) + (BigInt(M) << BigInt(32));
      }), T.prototype.readBigUInt64BE = ie(function(u) {
        u = u >>> 0, te(u, "offset");
        const d = this[u], E = this[u + 7];
        (d === void 0 || E === void 0) && C(u, this.length - 8);
        const B = d * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + this[++u], M = this[++u] * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + E;
        return (BigInt(B) << BigInt(32)) + BigInt(M);
      }), T.prototype.readIntLE = function(u, d, E) {
        u = u >>> 0, d = d >>> 0, E || Ie(u, d, this.length);
        let B = this[u], M = 1, H = 0;
        for (; ++H < d && (M *= 256); )
          B += this[u + H] * M;
        return M *= 128, B >= M && (B -= Math.pow(2, 8 * d)), B;
      }, T.prototype.readIntBE = function(u, d, E) {
        u = u >>> 0, d = d >>> 0, E || Ie(u, d, this.length);
        let B = d, M = 1, H = this[u + --B];
        for (; B > 0 && (M *= 256); )
          H += this[u + --B] * M;
        return M *= 128, H >= M && (H -= Math.pow(2, 8 * d)), H;
      }, T.prototype.readInt8 = function(u, d) {
        return u = u >>> 0, d || Ie(u, 1, this.length), this[u] & 128 ? (255 - this[u] + 1) * -1 : this[u];
      }, T.prototype.readInt16LE = function(u, d) {
        u = u >>> 0, d || Ie(u, 2, this.length);
        const E = this[u] | this[u + 1] << 8;
        return E & 32768 ? E | 4294901760 : E;
      }, T.prototype.readInt16BE = function(u, d) {
        u = u >>> 0, d || Ie(u, 2, this.length);
        const E = this[u + 1] | this[u] << 8;
        return E & 32768 ? E | 4294901760 : E;
      }, T.prototype.readInt32LE = function(u, d) {
        return u = u >>> 0, d || Ie(u, 4, this.length), this[u] | this[u + 1] << 8 | this[u + 2] << 16 | this[u + 3] << 24;
      }, T.prototype.readInt32BE = function(u, d) {
        return u = u >>> 0, d || Ie(u, 4, this.length), this[u] << 24 | this[u + 1] << 16 | this[u + 2] << 8 | this[u + 3];
      }, T.prototype.readBigInt64LE = ie(function(u) {
        u = u >>> 0, te(u, "offset");
        const d = this[u], E = this[u + 7];
        (d === void 0 || E === void 0) && C(u, this.length - 8);
        const B = this[u + 4] + this[u + 5] * 2 ** 8 + this[u + 6] * 2 ** 16 + (E << 24);
        return (BigInt(B) << BigInt(32)) + BigInt(d + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + this[++u] * 2 ** 24);
      }), T.prototype.readBigInt64BE = ie(function(u) {
        u = u >>> 0, te(u, "offset");
        const d = this[u], E = this[u + 7];
        (d === void 0 || E === void 0) && C(u, this.length - 8);
        const B = (d << 24) + // Overflow
        this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + this[++u];
        return (BigInt(B) << BigInt(32)) + BigInt(this[++u] * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + E);
      }), T.prototype.readFloatLE = function(u, d) {
        return u = u >>> 0, d || Ie(u, 4, this.length), P.read(this, u, !0, 23, 4);
      }, T.prototype.readFloatBE = function(u, d) {
        return u = u >>> 0, d || Ie(u, 4, this.length), P.read(this, u, !1, 23, 4);
      }, T.prototype.readDoubleLE = function(u, d) {
        return u = u >>> 0, d || Ie(u, 8, this.length), P.read(this, u, !0, 52, 8);
      }, T.prototype.readDoubleBE = function(u, d) {
        return u = u >>> 0, d || Ie(u, 8, this.length), P.read(this, u, !1, 52, 8);
      };
      function Me(m, u, d, E, B, M) {
        if (!T.isBuffer(m)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (u > B || u < M) throw new RangeError('"value" argument is out of bounds');
        if (d + E > m.length) throw new RangeError("Index out of range");
      }
      T.prototype.writeUintLE = T.prototype.writeUIntLE = function(u, d, E, B) {
        if (u = +u, d = d >>> 0, E = E >>> 0, !B) {
          const le = Math.pow(2, 8 * E) - 1;
          Me(this, u, d, E, le, 0);
        }
        let M = 1, H = 0;
        for (this[d] = u & 255; ++H < E && (M *= 256); )
          this[d + H] = u / M & 255;
        return d + E;
      }, T.prototype.writeUintBE = T.prototype.writeUIntBE = function(u, d, E, B) {
        if (u = +u, d = d >>> 0, E = E >>> 0, !B) {
          const le = Math.pow(2, 8 * E) - 1;
          Me(this, u, d, E, le, 0);
        }
        let M = E - 1, H = 1;
        for (this[d + M] = u & 255; --M >= 0 && (H *= 256); )
          this[d + M] = u / H & 255;
        return d + E;
      }, T.prototype.writeUint8 = T.prototype.writeUInt8 = function(u, d, E) {
        return u = +u, d = d >>> 0, E || Me(this, u, d, 1, 255, 0), this[d] = u & 255, d + 1;
      }, T.prototype.writeUint16LE = T.prototype.writeUInt16LE = function(u, d, E) {
        return u = +u, d = d >>> 0, E || Me(this, u, d, 2, 65535, 0), this[d] = u & 255, this[d + 1] = u >>> 8, d + 2;
      }, T.prototype.writeUint16BE = T.prototype.writeUInt16BE = function(u, d, E) {
        return u = +u, d = d >>> 0, E || Me(this, u, d, 2, 65535, 0), this[d] = u >>> 8, this[d + 1] = u & 255, d + 2;
      }, T.prototype.writeUint32LE = T.prototype.writeUInt32LE = function(u, d, E) {
        return u = +u, d = d >>> 0, E || Me(this, u, d, 4, 4294967295, 0), this[d + 3] = u >>> 24, this[d + 2] = u >>> 16, this[d + 1] = u >>> 8, this[d] = u & 255, d + 4;
      }, T.prototype.writeUint32BE = T.prototype.writeUInt32BE = function(u, d, E) {
        return u = +u, d = d >>> 0, E || Me(this, u, d, 4, 4294967295, 0), this[d] = u >>> 24, this[d + 1] = u >>> 16, this[d + 2] = u >>> 8, this[d + 3] = u & 255, d + 4;
      };
      function Je(m, u, d, E, B) {
        J(u, E, B, m, d, 7);
        let M = Number(u & BigInt(4294967295));
        m[d++] = M, M = M >> 8, m[d++] = M, M = M >> 8, m[d++] = M, M = M >> 8, m[d++] = M;
        let H = Number(u >> BigInt(32) & BigInt(4294967295));
        return m[d++] = H, H = H >> 8, m[d++] = H, H = H >> 8, m[d++] = H, H = H >> 8, m[d++] = H, d;
      }
      function tt(m, u, d, E, B) {
        J(u, E, B, m, d, 7);
        let M = Number(u & BigInt(4294967295));
        m[d + 7] = M, M = M >> 8, m[d + 6] = M, M = M >> 8, m[d + 5] = M, M = M >> 8, m[d + 4] = M;
        let H = Number(u >> BigInt(32) & BigInt(4294967295));
        return m[d + 3] = H, H = H >> 8, m[d + 2] = H, H = H >> 8, m[d + 1] = H, H = H >> 8, m[d] = H, d + 8;
      }
      T.prototype.writeBigUInt64LE = ie(function(u, d = 0) {
        return Je(this, u, d, BigInt(0), BigInt("0xffffffffffffffff"));
      }), T.prototype.writeBigUInt64BE = ie(function(u, d = 0) {
        return tt(this, u, d, BigInt(0), BigInt("0xffffffffffffffff"));
      }), T.prototype.writeIntLE = function(u, d, E, B) {
        if (u = +u, d = d >>> 0, !B) {
          const De = Math.pow(2, 8 * E - 1);
          Me(this, u, d, E, De - 1, -De);
        }
        let M = 0, H = 1, le = 0;
        for (this[d] = u & 255; ++M < E && (H *= 256); )
          u < 0 && le === 0 && this[d + M - 1] !== 0 && (le = 1), this[d + M] = (u / H >> 0) - le & 255;
        return d + E;
      }, T.prototype.writeIntBE = function(u, d, E, B) {
        if (u = +u, d = d >>> 0, !B) {
          const De = Math.pow(2, 8 * E - 1);
          Me(this, u, d, E, De - 1, -De);
        }
        let M = E - 1, H = 1, le = 0;
        for (this[d + M] = u & 255; --M >= 0 && (H *= 256); )
          u < 0 && le === 0 && this[d + M + 1] !== 0 && (le = 1), this[d + M] = (u / H >> 0) - le & 255;
        return d + E;
      }, T.prototype.writeInt8 = function(u, d, E) {
        return u = +u, d = d >>> 0, E || Me(this, u, d, 1, 127, -128), u < 0 && (u = 255 + u + 1), this[d] = u & 255, d + 1;
      }, T.prototype.writeInt16LE = function(u, d, E) {
        return u = +u, d = d >>> 0, E || Me(this, u, d, 2, 32767, -32768), this[d] = u & 255, this[d + 1] = u >>> 8, d + 2;
      }, T.prototype.writeInt16BE = function(u, d, E) {
        return u = +u, d = d >>> 0, E || Me(this, u, d, 2, 32767, -32768), this[d] = u >>> 8, this[d + 1] = u & 255, d + 2;
      }, T.prototype.writeInt32LE = function(u, d, E) {
        return u = +u, d = d >>> 0, E || Me(this, u, d, 4, 2147483647, -2147483648), this[d] = u & 255, this[d + 1] = u >>> 8, this[d + 2] = u >>> 16, this[d + 3] = u >>> 24, d + 4;
      }, T.prototype.writeInt32BE = function(u, d, E) {
        return u = +u, d = d >>> 0, E || Me(this, u, d, 4, 2147483647, -2147483648), u < 0 && (u = 4294967295 + u + 1), this[d] = u >>> 24, this[d + 1] = u >>> 16, this[d + 2] = u >>> 8, this[d + 3] = u & 255, d + 4;
      }, T.prototype.writeBigInt64LE = ie(function(u, d = 0) {
        return Je(this, u, d, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      }), T.prototype.writeBigInt64BE = ie(function(u, d = 0) {
        return tt(this, u, d, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function kt(m, u, d, E, B, M) {
        if (d + E > m.length) throw new RangeError("Index out of range");
        if (d < 0) throw new RangeError("Index out of range");
      }
      function lt(m, u, d, E, B) {
        return u = +u, d = d >>> 0, B || kt(m, u, d, 4), P.write(m, u, d, E, 23, 4), d + 4;
      }
      T.prototype.writeFloatLE = function(u, d, E) {
        return lt(this, u, d, !0, E);
      }, T.prototype.writeFloatBE = function(u, d, E) {
        return lt(this, u, d, !1, E);
      };
      function Ze(m, u, d, E, B) {
        return u = +u, d = d >>> 0, B || kt(m, u, d, 8), P.write(m, u, d, E, 52, 8), d + 8;
      }
      T.prototype.writeDoubleLE = function(u, d, E) {
        return Ze(this, u, d, !0, E);
      }, T.prototype.writeDoubleBE = function(u, d, E) {
        return Ze(this, u, d, !1, E);
      }, T.prototype.copy = function(u, d, E, B) {
        if (!T.isBuffer(u)) throw new TypeError("argument should be a Buffer");
        if (E || (E = 0), !B && B !== 0 && (B = this.length), d >= u.length && (d = u.length), d || (d = 0), B > 0 && B < E && (B = E), B === E || u.length === 0 || this.length === 0) return 0;
        if (d < 0)
          throw new RangeError("targetStart out of bounds");
        if (E < 0 || E >= this.length) throw new RangeError("Index out of range");
        if (B < 0) throw new RangeError("sourceEnd out of bounds");
        B > this.length && (B = this.length), u.length - d < B - E && (B = u.length - d + E);
        const M = B - E;
        return this === u && typeof I.prototype.copyWithin == "function" ? this.copyWithin(d, E, B) : I.prototype.set.call(
          u,
          this.subarray(E, B),
          d
        ), M;
      }, T.prototype.fill = function(u, d, E, B) {
        if (typeof u == "string") {
          if (typeof d == "string" ? (B = d, d = 0, E = this.length) : typeof E == "string" && (B = E, E = this.length), B !== void 0 && typeof B != "string")
            throw new TypeError("encoding must be a string");
          if (typeof B == "string" && !T.isEncoding(B))
            throw new TypeError("Unknown encoding: " + B);
          if (u.length === 1) {
            const H = u.charCodeAt(0);
            (B === "utf8" && H < 128 || B === "latin1") && (u = H);
          }
        } else typeof u == "number" ? u = u & 255 : typeof u == "boolean" && (u = Number(u));
        if (d < 0 || this.length < d || this.length < E)
          throw new RangeError("Out of range index");
        if (E <= d)
          return this;
        d = d >>> 0, E = E === void 0 ? this.length : E >>> 0, u || (u = 0);
        let M;
        if (typeof u == "number")
          for (M = d; M < E; ++M)
            this[M] = u;
        else {
          const H = T.isBuffer(u) ? u : T.from(u, B), le = H.length;
          if (le === 0)
            throw new TypeError('The value "' + u + '" is invalid for argument "value"');
          for (M = 0; M < E - d; ++M)
            this[M + d] = H[M % le];
        }
        return this;
      };
      const Xe = {};
      function wt(m, u, d) {
        Xe[m] = class extends d {
          constructor() {
            super(), Object.defineProperty(this, "message", {
              value: u.apply(this, arguments),
              writable: !0,
              configurable: !0
            }), this.name = `${this.name} [${m}]`, this.stack, delete this.name;
          }
          get code() {
            return m;
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
            return `${this.name} [${m}]: ${this.message}`;
          }
        };
      }
      wt(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(m) {
          return m ? `${m} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
        },
        RangeError
      ), wt(
        "ERR_INVALID_ARG_TYPE",
        function(m, u) {
          return `The "${m}" argument must be of type number. Received type ${typeof u}`;
        },
        TypeError
      ), wt(
        "ERR_OUT_OF_RANGE",
        function(m, u, d) {
          let E = `The value of "${m}" is out of range.`, B = d;
          return Number.isInteger(d) && Math.abs(d) > 2 ** 32 ? B = b(String(d)) : typeof d == "bigint" && (B = String(d), (d > BigInt(2) ** BigInt(32) || d < -(BigInt(2) ** BigInt(32))) && (B = b(B)), B += "n"), E += ` It must be ${u}. Received ${B}`, E;
        },
        RangeError
      );
      function b(m) {
        let u = "", d = m.length;
        const E = m[0] === "-" ? 1 : 0;
        for (; d >= E + 4; d -= 3)
          u = `_${m.slice(d - 3, d)}${u}`;
        return `${m.slice(0, d)}${u}`;
      }
      function Y(m, u, d) {
        te(u, "offset"), (m[u] === void 0 || m[u + d] === void 0) && C(u, m.length - (d + 1));
      }
      function J(m, u, d, E, B, M) {
        if (m > d || m < u) {
          const H = typeof u == "bigint" ? "n" : "";
          let le;
          throw u === 0 || u === BigInt(0) ? le = `>= 0${H} and < 2${H} ** ${(M + 1) * 8}${H}` : le = `>= -(2${H} ** ${(M + 1) * 8 - 1}${H}) and < 2 ** ${(M + 1) * 8 - 1}${H}`, new Xe.ERR_OUT_OF_RANGE("value", le, m);
        }
        Y(E, B, M);
      }
      function te(m, u) {
        if (typeof m != "number")
          throw new Xe.ERR_INVALID_ARG_TYPE(u, "number", m);
      }
      function C(m, u, d) {
        throw Math.floor(m) !== m ? (te(m, d), new Xe.ERR_OUT_OF_RANGE("offset", "an integer", m)) : u < 0 ? new Xe.ERR_BUFFER_OUT_OF_BOUNDS() : new Xe.ERR_OUT_OF_RANGE(
          "offset",
          `>= 0 and <= ${u}`,
          m
        );
      }
      const W = /[^+/0-9A-Za-z-_]/g;
      function y(m) {
        if (m = m.split("=")[0], m = m.trim().replace(W, ""), m.length < 2) return "";
        for (; m.length % 4 !== 0; )
          m = m + "=";
        return m;
      }
      function X(m, u) {
        u = u || 1 / 0;
        let d;
        const E = m.length;
        let B = null;
        const M = [];
        for (let H = 0; H < E; ++H) {
          if (d = m.charCodeAt(H), d > 55295 && d < 57344) {
            if (!B) {
              if (d > 56319) {
                (u -= 3) > -1 && M.push(239, 191, 189);
                continue;
              } else if (H + 1 === E) {
                (u -= 3) > -1 && M.push(239, 191, 189);
                continue;
              }
              B = d;
              continue;
            }
            if (d < 56320) {
              (u -= 3) > -1 && M.push(239, 191, 189), B = d;
              continue;
            }
            d = (B - 55296 << 10 | d - 56320) + 65536;
          } else B && (u -= 3) > -1 && M.push(239, 191, 189);
          if (B = null, d < 128) {
            if ((u -= 1) < 0) break;
            M.push(d);
          } else if (d < 2048) {
            if ((u -= 2) < 0) break;
            M.push(
              d >> 6 | 192,
              d & 63 | 128
            );
          } else if (d < 65536) {
            if ((u -= 3) < 0) break;
            M.push(
              d >> 12 | 224,
              d >> 6 & 63 | 128,
              d & 63 | 128
            );
          } else if (d < 1114112) {
            if ((u -= 4) < 0) break;
            M.push(
              d >> 18 | 240,
              d >> 12 & 63 | 128,
              d >> 6 & 63 | 128,
              d & 63 | 128
            );
          } else
            throw new Error("Invalid code point");
        }
        return M;
      }
      function ue(m) {
        const u = [];
        for (let d = 0; d < m.length; ++d)
          u.push(m.charCodeAt(d) & 255);
        return u;
      }
      function f(m, u) {
        let d, E, B;
        const M = [];
        for (let H = 0; H < m.length && !((u -= 2) < 0); ++H)
          d = m.charCodeAt(H), E = d >> 8, B = d % 256, M.push(B), M.push(E);
        return M;
      }
      function L(m) {
        return k.toByteArray(y(m));
      }
      function z(m, u, d, E) {
        let B;
        for (B = 0; B < E && !(B + d >= u.length || B >= m.length); ++B)
          u[B + d] = m[B];
        return B;
      }
      function g(m, u) {
        return m instanceof u || m != null && m.constructor != null && m.constructor.name != null && m.constructor.name === u.name;
      }
      function O(m) {
        return m !== m;
      }
      const j = function() {
        const m = "0123456789abcdef", u = new Array(256);
        for (let d = 0; d < 16; ++d) {
          const E = d * 16;
          for (let B = 0; B < 16; ++B)
            u[E + B] = m[d] + m[B];
        }
        return u;
      }();
      function ie(m) {
        return typeof BigInt > "u" ? re : m;
      }
      function re() {
        throw new Error("BigInt not supported");
      }
    })(e);
    const R = e.Buffer;
    n.Blob = e.Blob, n.BlobOptions = e.BlobOptions, n.Buffer = e.Buffer, n.File = e.File, n.FileOptions = e.FileOptions, n.INSPECT_MAX_BYTES = e.INSPECT_MAX_BYTES, n.SlowBuffer = e.SlowBuffer, n.TranscodeEncoding = e.TranscodeEncoding, n.atob = e.atob, n.btoa = e.btoa, n.constants = e.constants, n.default = R, n.isAscii = e.isAscii, n.isUtf8 = e.isUtf8, n.kMaxLength = e.kMaxLength, n.kStringMaxLength = e.kStringMaxLength, n.resolveObjectURL = e.resolveObjectURL, n.transcode = e.transcode;
  }(ln)), ln;
}
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var ma;
function Ki() {
  return ma || (ma = 1, function(n, e) {
    var t = dc(), r = t.Buffer;
    function i(o, c) {
      for (var s in o)
        c[s] = o[s];
    }
    r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? n.exports = t : (i(t, e), e.Buffer = a);
    function a(o, c, s) {
      return r(o, c, s);
    }
    a.prototype = Object.create(r.prototype), i(r, a), a.from = function(o, c, s) {
      if (typeof o == "number")
        throw new TypeError("Argument must not be a number");
      return r(o, c, s);
    }, a.alloc = function(o, c, s) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      var h = r(o);
      return c !== void 0 ? typeof s == "string" ? h.fill(c, s) : h.fill(c) : h.fill(0), h;
    }, a.allocUnsafe = function(o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return r(o);
    }, a.allocUnsafeSlow = function(o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return t.SlowBuffer(o);
    };
  }(Sr, Sr.exports)), Sr.exports;
}
var un, ya;
function pc() {
  if (ya) return un;
  ya = 1;
  var n = {}.toString;
  return un = Array.isArray || function(e) {
    return n.call(e) == "[object Array]";
  }, un;
}
var fn, ga;
function pr() {
  return ga || (ga = 1, fn = TypeError), fn;
}
var hn, _a;
function ps() {
  return _a || (_a = 1, hn = Object), hn;
}
var dn, va;
function wc() {
  return va || (va = 1, dn = Error), dn;
}
var pn, ba;
function mc() {
  return ba || (ba = 1, pn = EvalError), pn;
}
var wn, Ea;
function yc() {
  return Ea || (Ea = 1, wn = RangeError), wn;
}
var mn, ka;
function gc() {
  return ka || (ka = 1, mn = ReferenceError), mn;
}
var yn, Sa;
function ws() {
  return Sa || (Sa = 1, yn = SyntaxError), yn;
}
var gn, xa;
function _c() {
  return xa || (xa = 1, gn = URIError), gn;
}
var _n, Aa;
function vc() {
  return Aa || (Aa = 1, _n = Math.abs), _n;
}
var vn, Ia;
function bc() {
  return Ia || (Ia = 1, vn = Math.floor), vn;
}
var bn, Ra;
function Ec() {
  return Ra || (Ra = 1, bn = Math.max), bn;
}
var En, Ta;
function kc() {
  return Ta || (Ta = 1, En = Math.min), En;
}
var kn, $a;
function Sc() {
  return $a || ($a = 1, kn = Math.pow), kn;
}
var Sn, Ba;
function xc() {
  return Ba || (Ba = 1, Sn = Math.round), Sn;
}
var xn, Oa;
function Ac() {
  return Oa || (Oa = 1, xn = Number.isNaN || function(e) {
    return e !== e;
  }), xn;
}
var An, Pa;
function Ic() {
  if (Pa) return An;
  Pa = 1;
  var n = /* @__PURE__ */ Ac();
  return An = function(t) {
    return n(t) || t === 0 ? t : t < 0 ? -1 : 1;
  }, An;
}
var In, Ca;
function Rc() {
  return Ca || (Ca = 1, In = Object.getOwnPropertyDescriptor), In;
}
var Rn, Fa;
function wr() {
  if (Fa) return Rn;
  Fa = 1;
  var n = /* @__PURE__ */ Rc();
  if (n)
    try {
      n([], "length");
    } catch {
      n = null;
    }
  return Rn = n, Rn;
}
var Tn, Da;
function jr() {
  if (Da) return Tn;
  Da = 1;
  var n = Object.defineProperty || !1;
  if (n)
    try {
      n({}, "a", { value: 1 });
    } catch {
      n = !1;
    }
  return Tn = n, Tn;
}
var $n, Na;
function ms() {
  return Na || (Na = 1, $n = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), r = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(r) !== "[object Symbol]")
      return !1;
    var i = 42;
    e[t] = i;
    for (var a in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(e);
    if (o.length !== 1 || o[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var c = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(e, t)
      );
      if (c.value !== i || c.enumerable !== !0)
        return !1;
    }
    return !0;
  }), $n;
}
var Bn, Ma;
function Tc() {
  if (Ma) return Bn;
  Ma = 1;
  var n = typeof Symbol < "u" && Symbol, e = ms();
  return Bn = function() {
    return typeof n != "function" || typeof Symbol != "function" || typeof n("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, Bn;
}
var On, Ua;
function ys() {
  return Ua || (Ua = 1, On = typeof Reflect < "u" && Reflect.getPrototypeOf || null), On;
}
var Pn, ja;
function gs() {
  if (ja) return Pn;
  ja = 1;
  var n = /* @__PURE__ */ ps();
  return Pn = n.getPrototypeOf || null, Pn;
}
var Cn, La;
function $c() {
  if (La) return Cn;
  La = 1;
  var n = "Function.prototype.bind called on incompatible ", e = Object.prototype.toString, t = Math.max, r = "[object Function]", i = function(s, h) {
    for (var l = [], p = 0; p < s.length; p += 1)
      l[p] = s[p];
    for (var w = 0; w < h.length; w += 1)
      l[w + s.length] = h[w];
    return l;
  }, a = function(s, h) {
    for (var l = [], p = h, w = 0; p < s.length; p += 1, w += 1)
      l[w] = s[p];
    return l;
  }, o = function(c, s) {
    for (var h = "", l = 0; l < c.length; l += 1)
      h += c[l], l + 1 < c.length && (h += s);
    return h;
  };
  return Cn = function(s) {
    var h = this;
    if (typeof h != "function" || e.apply(h) !== r)
      throw new TypeError(n + h);
    for (var l = a(arguments, 1), p, w = function() {
      if (this instanceof p) {
        var R = h.apply(
          this,
          i(l, arguments)
        );
        return Object(R) === R ? R : this;
      }
      return h.apply(
        s,
        i(l, arguments)
      );
    }, _ = t(0, h.length - l.length), A = [], S = 0; S < _; S++)
      A[S] = "$" + S;
    if (p = Function("binder", "return function (" + o(A, ",") + "){ return binder.apply(this,arguments); }")(w), h.prototype) {
      var v = function() {
      };
      v.prototype = h.prototype, p.prototype = new v(), v.prototype = null;
    }
    return p;
  }, Cn;
}
var Fn, za;
function mr() {
  if (za) return Fn;
  za = 1;
  var n = $c();
  return Fn = Function.prototype.bind || n, Fn;
}
var Dn, qa;
function Ji() {
  return qa || (qa = 1, Dn = Function.prototype.call), Dn;
}
var Nn, Ha;
function Qi() {
  return Ha || (Ha = 1, Nn = Function.prototype.apply), Nn;
}
var Mn, Ga;
function Bc() {
  return Ga || (Ga = 1, Mn = typeof Reflect < "u" && Reflect && Reflect.apply), Mn;
}
var Un, Wa;
function _s() {
  if (Wa) return Un;
  Wa = 1;
  var n = mr(), e = Qi(), t = Ji(), r = Bc();
  return Un = r || n.call(t, e), Un;
}
var jn, Za;
function ea() {
  if (Za) return jn;
  Za = 1;
  var n = mr(), e = /* @__PURE__ */ pr(), t = Ji(), r = _s();
  return jn = function(a) {
    if (a.length < 1 || typeof a[0] != "function")
      throw new e("a function is required");
    return r(n, t, a);
  }, jn;
}
var Ln, Va;
function Oc() {
  if (Va) return Ln;
  Va = 1;
  var n = ea(), e = /* @__PURE__ */ wr(), t;
  try {
    t = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (o) {
    if (!o || typeof o != "object" || !("code" in o) || o.code !== "ERR_PROTO_ACCESS")
      throw o;
  }
  var r = !!t && e && e(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), i = Object, a = i.getPrototypeOf;
  return Ln = r && typeof r.get == "function" ? n([r.get]) : typeof a == "function" ? (
    /** @type {import('./get')} */
    function(c) {
      return a(c == null ? c : i(c));
    }
  ) : !1, Ln;
}
var zn, Xa;
function vs() {
  if (Xa) return zn;
  Xa = 1;
  var n = ys(), e = gs(), t = /* @__PURE__ */ Oc();
  return zn = n ? function(i) {
    return n(i);
  } : e ? function(i) {
    if (!i || typeof i != "object" && typeof i != "function")
      throw new TypeError("getProto: not an object");
    return e(i);
  } : t ? function(i) {
    return t(i);
  } : null, zn;
}
var qn, Ya;
function Pc() {
  if (Ya) return qn;
  Ya = 1;
  var n = Function.prototype.call, e = Object.prototype.hasOwnProperty, t = mr();
  return qn = t.call(n, e), qn;
}
var Hn, Ka;
function bs() {
  if (Ka) return Hn;
  Ka = 1;
  var n, e = /* @__PURE__ */ ps(), t = /* @__PURE__ */ wc(), r = /* @__PURE__ */ mc(), i = /* @__PURE__ */ yc(), a = /* @__PURE__ */ gc(), o = /* @__PURE__ */ ws(), c = /* @__PURE__ */ pr(), s = /* @__PURE__ */ _c(), h = /* @__PURE__ */ vc(), l = /* @__PURE__ */ bc(), p = /* @__PURE__ */ Ec(), w = /* @__PURE__ */ kc(), _ = /* @__PURE__ */ Sc(), A = /* @__PURE__ */ xc(), S = /* @__PURE__ */ Ic(), v = Function, R = function(Te) {
    try {
      return v('"use strict"; return (' + Te + ").constructor;")();
    } catch {
    }
  }, x = /* @__PURE__ */ wr(), k = /* @__PURE__ */ jr(), P = function() {
    throw new c();
  }, D = x ? function() {
    try {
      return arguments.callee, P;
    } catch {
      try {
        return x(arguments, "callee").get;
      } catch {
        return P;
      }
    }
  }() : P, F = Tc()(), I = vs(), $ = gs(), U = ys(), N = Qi(), G = Ji(), T = {}, Z = typeof Uint8Array > "u" || !I ? n : I(Uint8Array), Q = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? n : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? n : ArrayBuffer,
    "%ArrayIteratorPrototype%": F && I ? I([][Symbol.iterator]()) : n,
    "%AsyncFromSyncIteratorPrototype%": n,
    "%AsyncFunction%": T,
    "%AsyncGenerator%": T,
    "%AsyncGeneratorFunction%": T,
    "%AsyncIteratorPrototype%": T,
    "%Atomics%": typeof Atomics > "u" ? n : Atomics,
    "%BigInt%": typeof BigInt > "u" ? n : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? n : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? n : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? n : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": t,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": r,
    "%Float16Array%": typeof Float16Array > "u" ? n : Float16Array,
    "%Float32Array%": typeof Float32Array > "u" ? n : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? n : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? n : FinalizationRegistry,
    "%Function%": v,
    "%GeneratorFunction%": T,
    "%Int8Array%": typeof Int8Array > "u" ? n : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? n : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? n : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": F && I ? I(I([][Symbol.iterator]())) : n,
    "%JSON%": typeof JSON == "object" ? JSON : n,
    "%Map%": typeof Map > "u" ? n : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !F || !I ? n : I((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": e,
    "%Object.getOwnPropertyDescriptor%": x,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? n : Promise,
    "%Proxy%": typeof Proxy > "u" ? n : Proxy,
    "%RangeError%": i,
    "%ReferenceError%": a,
    "%Reflect%": typeof Reflect > "u" ? n : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? n : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !F || !I ? n : I((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? n : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": F && I ? I(""[Symbol.iterator]()) : n,
    "%Symbol%": F ? Symbol : n,
    "%SyntaxError%": o,
    "%ThrowTypeError%": D,
    "%TypedArray%": Z,
    "%TypeError%": c,
    "%Uint8Array%": typeof Uint8Array > "u" ? n : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? n : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? n : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? n : Uint32Array,
    "%URIError%": s,
    "%WeakMap%": typeof WeakMap > "u" ? n : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? n : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? n : WeakSet,
    "%Function.prototype.call%": G,
    "%Function.prototype.apply%": N,
    "%Object.defineProperty%": k,
    "%Object.getPrototypeOf%": $,
    "%Math.abs%": h,
    "%Math.floor%": l,
    "%Math.max%": p,
    "%Math.min%": w,
    "%Math.pow%": _,
    "%Math.round%": A,
    "%Math.sign%": S,
    "%Reflect.getPrototypeOf%": U
  };
  if (I)
    try {
      null.error;
    } catch (Te) {
      var se = I(I(Te));
      Q["%Error.prototype%"] = se;
    }
  var V = function Te(ve) {
    var xe;
    if (ve === "%AsyncFunction%")
      xe = R("async function () {}");
    else if (ve === "%GeneratorFunction%")
      xe = R("function* () {}");
    else if (ve === "%AsyncGeneratorFunction%")
      xe = R("async function* () {}");
    else if (ve === "%AsyncGenerator%") {
      var ee = Te("%AsyncGeneratorFunction%");
      ee && (xe = ee.prototype);
    } else if (ve === "%AsyncIteratorPrototype%") {
      var fe = Te("%AsyncGenerator%");
      fe && I && (xe = I(fe.prototype));
    }
    return Q[ve] = xe, xe;
  }, q = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, K = mr(), ne = /* @__PURE__ */ Pc(), we = K.call(G, Array.prototype.concat), ge = K.call(N, Array.prototype.splice), ce = K.call(G, String.prototype.replace), _e = K.call(G, String.prototype.slice), ke = K.call(G, RegExp.prototype.exec), Ce = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, me = /\\(\\)?/g, de = function(ve) {
    var xe = _e(ve, 0, 1), ee = _e(ve, -1);
    if (xe === "%" && ee !== "%")
      throw new o("invalid intrinsic syntax, expected closing `%`");
    if (ee === "%" && xe !== "%")
      throw new o("invalid intrinsic syntax, expected opening `%`");
    var fe = [];
    return ce(ve, Ce, function(Be, Oe, Re, Ae) {
      fe[fe.length] = Re ? ce(Ae, me, "$1") : Oe || Be;
    }), fe;
  }, Se = function(ve, xe) {
    var ee = ve, fe;
    if (ne(q, ee) && (fe = q[ee], ee = "%" + fe[0] + "%"), ne(Q, ee)) {
      var Be = Q[ee];
      if (Be === T && (Be = V(ee)), typeof Be > "u" && !xe)
        throw new c("intrinsic " + ve + " exists, but is not available. Please file an issue!");
      return {
        alias: fe,
        name: ee,
        value: Be
      };
    }
    throw new o("intrinsic " + ve + " does not exist!");
  };
  return Hn = function(ve, xe) {
    if (typeof ve != "string" || ve.length === 0)
      throw new c("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof xe != "boolean")
      throw new c('"allowMissing" argument must be a boolean');
    if (ke(/^%?[^%]*%?$/, ve) === null)
      throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var ee = de(ve), fe = ee.length > 0 ? ee[0] : "", Be = Se("%" + fe + "%", xe), Oe = Be.name, Re = Be.value, Ae = !1, pe = Be.alias;
    pe && (fe = pe[0], ge(ee, we([0, 1], pe)));
    for (var We = 1, et = !0; We < ee.length; We += 1) {
      var He = ee[We], Ie = _e(He, 0, 1), Me = _e(He, -1);
      if ((Ie === '"' || Ie === "'" || Ie === "`" || Me === '"' || Me === "'" || Me === "`") && Ie !== Me)
        throw new o("property names with quotes must have matching quotes");
      if ((He === "constructor" || !et) && (Ae = !0), fe += "." + He, Oe = "%" + fe + "%", ne(Q, Oe))
        Re = Q[Oe];
      else if (Re != null) {
        if (!(He in Re)) {
          if (!xe)
            throw new c("base intrinsic for " + ve + " exists, but the property is not available.");
          return;
        }
        if (x && We + 1 >= ee.length) {
          var Je = x(Re, He);
          et = !!Je, et && "get" in Je && !("originalValue" in Je.get) ? Re = Je.get : Re = Re[He];
        } else
          et = ne(Re, He), Re = Re[He];
        et && !Ae && (Q[Oe] = Re);
      }
    }
    return Re;
  }, Hn;
}
var Gn, Ja;
function Es() {
  if (Ja) return Gn;
  Ja = 1;
  var n = /* @__PURE__ */ bs(), e = ea(), t = e([n("%String.prototype.indexOf%")]);
  return Gn = function(i, a) {
    var o = (
      /** @type {(this: unknown, ...args: unknown[]) => unknown} */
      n(i, !!a)
    );
    return typeof o == "function" && t(i, ".prototype.") > -1 ? e(
      /** @type {const} */
      [o]
    ) : o;
  }, Gn;
}
var Wn, Qa;
function Cc() {
  if (Qa) return Wn;
  Qa = 1;
  var n = Function.prototype.toString, e = typeof Reflect == "object" && Reflect !== null && Reflect.apply, t, r;
  if (typeof e == "function" && typeof Object.defineProperty == "function")
    try {
      t = Object.defineProperty({}, "length", {
        get: function() {
          throw r;
        }
      }), r = {}, e(function() {
        throw 42;
      }, null, t);
    } catch (x) {
      x !== r && (e = null);
    }
  else
    e = null;
  var i = /^\s*class\b/, a = function(k) {
    try {
      var P = n.call(k);
      return i.test(P);
    } catch {
      return !1;
    }
  }, o = function(k) {
    try {
      return a(k) ? !1 : (n.call(k), !0);
    } catch {
      return !1;
    }
  }, c = Object.prototype.toString, s = "[object Object]", h = "[object Function]", l = "[object GeneratorFunction]", p = "[object HTMLAllCollection]", w = "[object HTML document.all class]", _ = "[object HTMLCollection]", A = typeof Symbol == "function" && !!Symbol.toStringTag, S = !(0 in [,]), v = function() {
    return !1;
  };
  if (typeof document == "object") {
    var R = document.all;
    c.call(R) === c.call(document.all) && (v = function(k) {
      if ((S || !k) && (typeof k > "u" || typeof k == "object"))
        try {
          var P = c.call(k);
          return (P === p || P === w || P === _ || P === s) && k("") == null;
        } catch {
        }
      return !1;
    });
  }
  return Wn = e ? function(k) {
    if (v(k))
      return !0;
    if (!k || typeof k != "function" && typeof k != "object")
      return !1;
    try {
      e(k, null, t);
    } catch (P) {
      if (P !== r)
        return !1;
    }
    return !a(k) && o(k);
  } : function(k) {
    if (v(k))
      return !0;
    if (!k || typeof k != "function" && typeof k != "object")
      return !1;
    if (A)
      return o(k);
    if (a(k))
      return !1;
    var P = c.call(k);
    return P !== h && P !== l && !/^\[object HTML/.test(P) ? !1 : o(k);
  }, Wn;
}
var Zn, eo;
function Fc() {
  if (eo) return Zn;
  eo = 1;
  var n = Cc(), e = Object.prototype.toString, t = Object.prototype.hasOwnProperty, r = function(s, h, l) {
    for (var p = 0, w = s.length; p < w; p++)
      t.call(s, p) && (l == null ? h(s[p], p, s) : h.call(l, s[p], p, s));
  }, i = function(s, h, l) {
    for (var p = 0, w = s.length; p < w; p++)
      l == null ? h(s.charAt(p), p, s) : h.call(l, s.charAt(p), p, s);
  }, a = function(s, h, l) {
    for (var p in s)
      t.call(s, p) && (l == null ? h(s[p], p, s) : h.call(l, s[p], p, s));
  };
  function o(c) {
    return e.call(c) === "[object Array]";
  }
  return Zn = function(s, h, l) {
    if (!n(h))
      throw new TypeError("iterator must be a function");
    var p;
    arguments.length >= 3 && (p = l), o(s) ? r(s, h, p) : typeof s == "string" ? i(s, h, p) : a(s, h, p);
  }, Zn;
}
var Vn, to;
function Dc() {
  return to || (to = 1, Vn = [
    "Float16Array",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array"
  ]), Vn;
}
var Xn, ro;
function Nc() {
  if (ro) return Xn;
  ro = 1;
  var n = /* @__PURE__ */ Dc(), e = globalThis;
  return Xn = function() {
    for (var r = [], i = 0; i < n.length; i++)
      typeof e[n[i]] == "function" && (r[r.length] = n[i]);
    return r;
  }, Xn;
}
var Yn = { exports: {} }, Kn, no;
function Mc() {
  if (no) return Kn;
  no = 1;
  var n = /* @__PURE__ */ jr(), e = /* @__PURE__ */ ws(), t = /* @__PURE__ */ pr(), r = /* @__PURE__ */ wr();
  return Kn = function(a, o, c) {
    if (!a || typeof a != "object" && typeof a != "function")
      throw new t("`obj` must be an object or a function`");
    if (typeof o != "string" && typeof o != "symbol")
      throw new t("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new t("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new t("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new t("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new t("`loose`, if provided, must be a boolean");
    var s = arguments.length > 3 ? arguments[3] : null, h = arguments.length > 4 ? arguments[4] : null, l = arguments.length > 5 ? arguments[5] : null, p = arguments.length > 6 ? arguments[6] : !1, w = !!r && r(a, o);
    if (n)
      n(a, o, {
        configurable: l === null && w ? w.configurable : !l,
        enumerable: s === null && w ? w.enumerable : !s,
        value: c,
        writable: h === null && w ? w.writable : !h
      });
    else if (p || !s && !h && !l)
      a[o] = c;
    else
      throw new e("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, Kn;
}
var Jn, io;
function Uc() {
  if (io) return Jn;
  io = 1;
  var n = /* @__PURE__ */ jr(), e = function() {
    return !!n;
  };
  return e.hasArrayLengthDefineBug = function() {
    if (!n)
      return null;
    try {
      return n([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, Jn = e, Jn;
}
var Qn, ao;
function jc() {
  if (ao) return Qn;
  ao = 1;
  var n = /* @__PURE__ */ bs(), e = /* @__PURE__ */ Mc(), t = /* @__PURE__ */ Uc()(), r = /* @__PURE__ */ wr(), i = /* @__PURE__ */ pr(), a = n("%Math.floor%");
  return Qn = function(c, s) {
    if (typeof c != "function")
      throw new i("`fn` is not a function");
    if (typeof s != "number" || s < 0 || s > 4294967295 || a(s) !== s)
      throw new i("`length` must be a positive 32-bit integer");
    var h = arguments.length > 2 && !!arguments[2], l = !0, p = !0;
    if ("length" in c && r) {
      var w = r(c, "length");
      w && !w.configurable && (l = !1), w && !w.writable && (p = !1);
    }
    return (l || p || !h) && (t ? e(
      /** @type {Parameters<define>[0]} */
      c,
      "length",
      s,
      !0,
      !0
    ) : e(
      /** @type {Parameters<define>[0]} */
      c,
      "length",
      s
    )), c;
  }, Qn;
}
var ei, oo;
function Lc() {
  if (oo) return ei;
  oo = 1;
  var n = mr(), e = Qi(), t = _s();
  return ei = function() {
    return t(n, e, arguments);
  }, ei;
}
var so;
function zc() {
  return so || (so = 1, function(n) {
    var e = /* @__PURE__ */ jc(), t = /* @__PURE__ */ jr(), r = ea(), i = Lc();
    n.exports = function(o) {
      var c = r(arguments), s = o.length - (arguments.length - 1);
      return e(
        c,
        1 + (s > 0 ? s : 0),
        !0
      );
    }, t ? t(n.exports, "apply", { value: i }) : n.exports.apply = i;
  }(Yn)), Yn.exports;
}
var ti, co;
function qc() {
  if (co) return ti;
  co = 1;
  var n = ms();
  return ti = function() {
    return n() && !!Symbol.toStringTag;
  }, ti;
}
var ri, lo;
function Hc() {
  if (lo) return ri;
  lo = 1;
  var n = Fc(), e = /* @__PURE__ */ Nc(), t = zc(), r = /* @__PURE__ */ Es(), i = /* @__PURE__ */ wr(), a = vs(), o = r("Object.prototype.toString"), c = qc()(), s = globalThis, h = e(), l = r("String.prototype.slice"), p = r("Array.prototype.indexOf", !0) || function(v, R) {
    for (var x = 0; x < v.length; x += 1)
      if (v[x] === R)
        return x;
    return -1;
  }, w = { __proto__: null };
  c && i && a ? n(h, function(S) {
    var v = new s[S]();
    if (Symbol.toStringTag in v && a) {
      var R = a(v), x = i(R, Symbol.toStringTag);
      if (!x && R) {
        var k = a(R);
        x = i(k, Symbol.toStringTag);
      }
      w["$" + S] = t(x.get);
    }
  }) : n(h, function(S) {
    var v = new s[S](), R = v.slice || v.set;
    R && (w[
      /** @type {`$${import('.').TypedArrayName}`} */
      "$" + S
    ] = /** @type {import('./types').BoundSlice | import('./types').BoundSet} */
    // @ts-expect-error TODO FIXME
    t(R));
  });
  var _ = function(v) {
    var R = !1;
    return n(
      /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
      w,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(x, k) {
        if (!R)
          try {
            "$" + x(v) === k && (R = /** @type {import('.').TypedArrayName} */
            l(k, 1));
          } catch {
          }
      }
    ), R;
  }, A = function(v) {
    var R = !1;
    return n(
      /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
      w,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(x, k) {
        if (!R)
          try {
            x(v), R = /** @type {import('.').TypedArrayName} */
            l(k, 1);
          } catch {
          }
      }
    ), R;
  };
  return ri = function(v) {
    if (!v || typeof v != "object")
      return !1;
    if (!c) {
      var R = l(o(v), 8, -1);
      return p(h, R) > -1 ? R : R !== "Object" ? !1 : A(v);
    }
    return i ? _(v) : null;
  }, ri;
}
var ni, uo;
function Gc() {
  if (uo) return ni;
  uo = 1;
  var n = /* @__PURE__ */ Hc();
  return ni = function(t) {
    return !!n(t);
  }, ni;
}
var ii, fo;
function Wc() {
  if (fo) return ii;
  fo = 1;
  var n = /* @__PURE__ */ pr(), e = /* @__PURE__ */ Es(), t = e("TypedArray.prototype.buffer", !0), r = /* @__PURE__ */ Gc();
  return ii = t || function(a) {
    if (!r(a))
      throw new n("Not a Typed Array");
    return a.buffer;
  }, ii;
}
var ai, ho;
function Zc() {
  if (ho) return ai;
  ho = 1;
  var n = Ki().Buffer, e = pc(), t = /* @__PURE__ */ Wc(), r = ArrayBuffer.isView || function(s) {
    try {
      return t(s), !0;
    } catch {
      return !1;
    }
  }, i = typeof Uint8Array < "u", a = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", o = a && (n.prototype instanceof Uint8Array || n.TYPED_ARRAY_SUPPORT);
  return ai = function(s, h) {
    if (s instanceof n)
      return s;
    if (typeof s == "string")
      return n.from(s, h);
    if (a && r(s)) {
      if (s.byteLength === 0)
        return n.alloc(0);
      if (o) {
        var l = n.from(s.buffer, s.byteOffset, s.byteLength);
        if (l.byteLength === s.byteLength)
          return l;
      }
      var p = s instanceof Uint8Array ? s : new Uint8Array(s.buffer, s.byteOffset, s.byteLength), w = n.from(p);
      if (w.length === s.byteLength)
        return w;
    }
    if (i && s instanceof Uint8Array)
      return n.from(s);
    var _ = e(s);
    if (_)
      for (var A = 0; A < s.length; A += 1) {
        var S = s[A];
        if (typeof S != "number" || S < 0 || S > 255 || ~~S !== S)
          throw new RangeError("Array items must be numbers in the range 0-255.");
      }
    if (_ || n.isBuffer(s) && s.constructor && typeof s.constructor.isBuffer == "function" && s.constructor.isBuffer(s))
      return n.from(s);
    throw new TypeError('The "data" argument must be a string, an Array, a Buffer, a Uint8Array, or a DataView.');
  }, ai;
}
var oi, po;
function Vc() {
  if (po) return oi;
  po = 1;
  var n = Ki().Buffer, e = /* @__PURE__ */ Zc();
  function t(r, i) {
    this._block = n.alloc(r), this._finalSize = i, this._blockSize = r, this._len = 0;
  }
  return t.prototype.update = function(r, i) {
    r = e(r, i || "utf8");
    for (var a = this._block, o = this._blockSize, c = r.length, s = this._len, h = 0; h < c; ) {
      for (var l = s % o, p = Math.min(c - h, o - l), w = 0; w < p; w++)
        a[l + w] = r[h + w];
      s += p, h += p, s % o === 0 && this._update(a);
    }
    return this._len += c, this;
  }, t.prototype.digest = function(r) {
    var i = this._len % this._blockSize;
    this._block[i] = 128, this._block.fill(0, i + 1), i >= this._finalSize && (this._update(this._block), this._block.fill(0));
    var a = this._len * 8;
    if (a <= 4294967295)
      this._block.writeUInt32BE(a, this._blockSize - 4);
    else {
      var o = (a & 4294967295) >>> 0, c = (a - o) / 4294967296;
      this._block.writeUInt32BE(c, this._blockSize - 8), this._block.writeUInt32BE(o, this._blockSize - 4);
    }
    this._update(this._block);
    var s = this._hash();
    return r ? s.toString(r) : s;
  }, t.prototype._update = function() {
    throw new Error("_update must be implemented by subclass");
  }, oi = t, oi;
}
var si, wo;
function Xc() {
  if (wo) return si;
  wo = 1;
  var n = hc(), e = Vc(), t = Ki().Buffer, r = [
    1518500249,
    1859775393,
    -1894007588,
    -899497514
  ], i = new Array(80);
  function a() {
    this.init(), this._w = i, e.call(this, 64, 56);
  }
  n(a, e), a.prototype.init = function() {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
  };
  function o(l) {
    return l << 1 | l >>> 31;
  }
  function c(l) {
    return l << 5 | l >>> 27;
  }
  function s(l) {
    return l << 30 | l >>> 2;
  }
  function h(l, p, w, _) {
    return l === 0 ? p & w | ~p & _ : l === 2 ? p & w | p & _ | w & _ : p ^ w ^ _;
  }
  return a.prototype._update = function(l) {
    for (var p = this._w, w = this._a | 0, _ = this._b | 0, A = this._c | 0, S = this._d | 0, v = this._e | 0, R = 0; R < 16; ++R)
      p[R] = l.readInt32BE(R * 4);
    for (; R < 80; ++R)
      p[R] = o(p[R - 3] ^ p[R - 8] ^ p[R - 14] ^ p[R - 16]);
    for (var x = 0; x < 80; ++x) {
      var k = ~~(x / 20), P = c(w) + h(k, _, A, S) + v + p[x] + r[k] | 0;
      v = S, S = A, A = s(_), _ = w, w = P;
    }
    this._a = w + this._a | 0, this._b = _ + this._b | 0, this._c = A + this._c | 0, this._d = S + this._d | 0, this._e = v + this._e | 0;
  }, a.prototype._hash = function() {
    var l = t.allocUnsafe(20);
    return l.writeInt32BE(this._a | 0, 0), l.writeInt32BE(this._b | 0, 4), l.writeInt32BE(this._c | 0, 8), l.writeInt32BE(this._d | 0, 12), l.writeInt32BE(this._e | 0, 16), l;
  }, si = a, si;
}
var Yc = Xc();
const ks = /* @__PURE__ */ Ht(Yc);
var ci, mo;
function Kc() {
  if (mo) return ci;
  mo = 1;
  function n(i) {
    if (typeof i != "string")
      throw new TypeError("Path must be a string. Received " + JSON.stringify(i));
  }
  function e(i, a) {
    for (var o = "", c = 0, s = -1, h = 0, l, p = 0; p <= i.length; ++p) {
      if (p < i.length)
        l = i.charCodeAt(p);
      else {
        if (l === 47)
          break;
        l = 47;
      }
      if (l === 47) {
        if (!(s === p - 1 || h === 1)) if (s !== p - 1 && h === 2) {
          if (o.length < 2 || c !== 2 || o.charCodeAt(o.length - 1) !== 46 || o.charCodeAt(o.length - 2) !== 46) {
            if (o.length > 2) {
              var w = o.lastIndexOf("/");
              if (w !== o.length - 1) {
                w === -1 ? (o = "", c = 0) : (o = o.slice(0, w), c = o.length - 1 - o.lastIndexOf("/")), s = p, h = 0;
                continue;
              }
            } else if (o.length === 2 || o.length === 1) {
              o = "", c = 0, s = p, h = 0;
              continue;
            }
          }
          a && (o.length > 0 ? o += "/.." : o = "..", c = 2);
        } else
          o.length > 0 ? o += "/" + i.slice(s + 1, p) : o = i.slice(s + 1, p), c = p - s - 1;
        s = p, h = 0;
      } else l === 46 && h !== -1 ? ++h : h = -1;
    }
    return o;
  }
  function t(i, a) {
    var o = a.dir || a.root, c = a.base || (a.name || "") + (a.ext || "");
    return o ? o === a.root ? o + c : o + i + c : c;
  }
  var r = {
    // path.resolve([from ...], to)
    resolve: function() {
      for (var a = "", o = !1, c, s = arguments.length - 1; s >= -1 && !o; s--) {
        var h;
        s >= 0 ? h = arguments[s] : (c === void 0 && (c = rt.cwd()), h = c), n(h), h.length !== 0 && (a = h + "/" + a, o = h.charCodeAt(0) === 47);
      }
      return a = e(a, !o), o ? a.length > 0 ? "/" + a : "/" : a.length > 0 ? a : ".";
    },
    normalize: function(a) {
      if (n(a), a.length === 0) return ".";
      var o = a.charCodeAt(0) === 47, c = a.charCodeAt(a.length - 1) === 47;
      return a = e(a, !o), a.length === 0 && !o && (a = "."), a.length > 0 && c && (a += "/"), o ? "/" + a : a;
    },
    isAbsolute: function(a) {
      return n(a), a.length > 0 && a.charCodeAt(0) === 47;
    },
    join: function() {
      if (arguments.length === 0)
        return ".";
      for (var a, o = 0; o < arguments.length; ++o) {
        var c = arguments[o];
        n(c), c.length > 0 && (a === void 0 ? a = c : a += "/" + c);
      }
      return a === void 0 ? "." : r.normalize(a);
    },
    relative: function(a, o) {
      if (n(a), n(o), a === o || (a = r.resolve(a), o = r.resolve(o), a === o)) return "";
      for (var c = 1; c < a.length && a.charCodeAt(c) === 47; ++c)
        ;
      for (var s = a.length, h = s - c, l = 1; l < o.length && o.charCodeAt(l) === 47; ++l)
        ;
      for (var p = o.length, w = p - l, _ = h < w ? h : w, A = -1, S = 0; S <= _; ++S) {
        if (S === _) {
          if (w > _) {
            if (o.charCodeAt(l + S) === 47)
              return o.slice(l + S + 1);
            if (S === 0)
              return o.slice(l + S);
          } else h > _ && (a.charCodeAt(c + S) === 47 ? A = S : S === 0 && (A = 0));
          break;
        }
        var v = a.charCodeAt(c + S), R = o.charCodeAt(l + S);
        if (v !== R)
          break;
        v === 47 && (A = S);
      }
      var x = "";
      for (S = c + A + 1; S <= s; ++S)
        (S === s || a.charCodeAt(S) === 47) && (x.length === 0 ? x += ".." : x += "/..");
      return x.length > 0 ? x + o.slice(l + A) : (l += A, o.charCodeAt(l) === 47 && ++l, o.slice(l));
    },
    _makeLong: function(a) {
      return a;
    },
    dirname: function(a) {
      if (n(a), a.length === 0) return ".";
      for (var o = a.charCodeAt(0), c = o === 47, s = -1, h = !0, l = a.length - 1; l >= 1; --l)
        if (o = a.charCodeAt(l), o === 47) {
          if (!h) {
            s = l;
            break;
          }
        } else
          h = !1;
      return s === -1 ? c ? "/" : "." : c && s === 1 ? "//" : a.slice(0, s);
    },
    basename: function(a, o) {
      if (o !== void 0 && typeof o != "string") throw new TypeError('"ext" argument must be a string');
      n(a);
      var c = 0, s = -1, h = !0, l;
      if (o !== void 0 && o.length > 0 && o.length <= a.length) {
        if (o.length === a.length && o === a) return "";
        var p = o.length - 1, w = -1;
        for (l = a.length - 1; l >= 0; --l) {
          var _ = a.charCodeAt(l);
          if (_ === 47) {
            if (!h) {
              c = l + 1;
              break;
            }
          } else
            w === -1 && (h = !1, w = l + 1), p >= 0 && (_ === o.charCodeAt(p) ? --p === -1 && (s = l) : (p = -1, s = w));
        }
        return c === s ? s = w : s === -1 && (s = a.length), a.slice(c, s);
      } else {
        for (l = a.length - 1; l >= 0; --l)
          if (a.charCodeAt(l) === 47) {
            if (!h) {
              c = l + 1;
              break;
            }
          } else s === -1 && (h = !1, s = l + 1);
        return s === -1 ? "" : a.slice(c, s);
      }
    },
    extname: function(a) {
      n(a);
      for (var o = -1, c = 0, s = -1, h = !0, l = 0, p = a.length - 1; p >= 0; --p) {
        var w = a.charCodeAt(p);
        if (w === 47) {
          if (!h) {
            c = p + 1;
            break;
          }
          continue;
        }
        s === -1 && (h = !1, s = p + 1), w === 46 ? o === -1 ? o = p : l !== 1 && (l = 1) : o !== -1 && (l = -1);
      }
      return o === -1 || s === -1 || // We saw a non-dot character immediately before the dot
      l === 0 || // The (right-most) trimmed path component is exactly '..'
      l === 1 && o === s - 1 && o === c + 1 ? "" : a.slice(o, s);
    },
    format: function(a) {
      if (a === null || typeof a != "object")
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof a);
      return t("/", a);
    },
    parse: function(a) {
      n(a);
      var o = { root: "", dir: "", base: "", ext: "", name: "" };
      if (a.length === 0) return o;
      var c = a.charCodeAt(0), s = c === 47, h;
      s ? (o.root = "/", h = 1) : h = 0;
      for (var l = -1, p = 0, w = -1, _ = !0, A = a.length - 1, S = 0; A >= h; --A) {
        if (c = a.charCodeAt(A), c === 47) {
          if (!_) {
            p = A + 1;
            break;
          }
          continue;
        }
        w === -1 && (_ = !1, w = A + 1), c === 46 ? l === -1 ? l = A : S !== 1 && (S = 1) : l !== -1 && (S = -1);
      }
      return l === -1 || w === -1 || // We saw a non-dot character immediately before the dot
      S === 0 || // The (right-most) trimmed path component is exactly '..'
      S === 1 && l === w - 1 && l === p + 1 ? w !== -1 && (p === 0 && s ? o.base = o.name = a.slice(1, w) : o.base = o.name = a.slice(p, w)) : (p === 0 && s ? (o.name = a.slice(1, l), o.base = a.slice(1, w)) : (o.name = a.slice(p, l), o.base = a.slice(p, w)), o.ext = a.slice(l, w)), p > 0 ? o.dir = a.slice(0, p - 1) : s && (o.dir = "/"), o;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
  };
  return r.posix = r, ci = r, ci;
}
var Fe = Kc(), li = {};
/*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */
var yo;
function Jc() {
  return yo || (yo = 1, function(n) {
    (function(e) {
      e(typeof DO_NOT_EXPORT_CRC > "u" ? n : {});
    })(function(e) {
      e.version = "1.2.2";
      function t() {
        for (var $ = 0, U = new Array(256), N = 0; N != 256; ++N)
          $ = N, $ = $ & 1 ? -306674912 ^ $ >>> 1 : $ >>> 1, $ = $ & 1 ? -306674912 ^ $ >>> 1 : $ >>> 1, $ = $ & 1 ? -306674912 ^ $ >>> 1 : $ >>> 1, $ = $ & 1 ? -306674912 ^ $ >>> 1 : $ >>> 1, $ = $ & 1 ? -306674912 ^ $ >>> 1 : $ >>> 1, $ = $ & 1 ? -306674912 ^ $ >>> 1 : $ >>> 1, $ = $ & 1 ? -306674912 ^ $ >>> 1 : $ >>> 1, $ = $ & 1 ? -306674912 ^ $ >>> 1 : $ >>> 1, U[N] = $;
        return typeof Int32Array < "u" ? new Int32Array(U) : U;
      }
      var r = t();
      function i($) {
        var U = 0, N = 0, G = 0, T = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
        for (G = 0; G != 256; ++G) T[G] = $[G];
        for (G = 0; G != 256; ++G)
          for (N = $[G], U = 256 + G; U < 4096; U += 256) N = T[U] = N >>> 8 ^ $[N & 255];
        var Z = [];
        for (G = 1; G != 16; ++G) Z[G - 1] = typeof Int32Array < "u" ? T.subarray(G * 256, G * 256 + 256) : T.slice(G * 256, G * 256 + 256);
        return Z;
      }
      var a = i(r), o = a[0], c = a[1], s = a[2], h = a[3], l = a[4], p = a[5], w = a[6], _ = a[7], A = a[8], S = a[9], v = a[10], R = a[11], x = a[12], k = a[13], P = a[14];
      function D($, U) {
        for (var N = U ^ -1, G = 0, T = $.length; G < T; ) N = N >>> 8 ^ r[(N ^ $.charCodeAt(G++)) & 255];
        return ~N;
      }
      function F($, U) {
        for (var N = U ^ -1, G = $.length - 15, T = 0; T < G; ) N = P[$[T++] ^ N & 255] ^ k[$[T++] ^ N >> 8 & 255] ^ x[$[T++] ^ N >> 16 & 255] ^ R[$[T++] ^ N >>> 24] ^ v[$[T++]] ^ S[$[T++]] ^ A[$[T++]] ^ _[$[T++]] ^ w[$[T++]] ^ p[$[T++]] ^ l[$[T++]] ^ h[$[T++]] ^ s[$[T++]] ^ c[$[T++]] ^ o[$[T++]] ^ r[$[T++]];
        for (G += 15; T < G; ) N = N >>> 8 ^ r[(N ^ $[T++]) & 255];
        return ~N;
      }
      function I($, U) {
        for (var N = U ^ -1, G = 0, T = $.length, Z = 0, Q = 0; G < T; )
          Z = $.charCodeAt(G++), Z < 128 ? N = N >>> 8 ^ r[(N ^ Z) & 255] : Z < 2048 ? (N = N >>> 8 ^ r[(N ^ (192 | Z >> 6 & 31)) & 255], N = N >>> 8 ^ r[(N ^ (128 | Z & 63)) & 255]) : Z >= 55296 && Z < 57344 ? (Z = (Z & 1023) + 64, Q = $.charCodeAt(G++) & 1023, N = N >>> 8 ^ r[(N ^ (240 | Z >> 8 & 7)) & 255], N = N >>> 8 ^ r[(N ^ (128 | Z >> 2 & 63)) & 255], N = N >>> 8 ^ r[(N ^ (128 | Q >> 6 & 15 | (Z & 3) << 4)) & 255], N = N >>> 8 ^ r[(N ^ (128 | Q & 63)) & 255]) : (N = N >>> 8 ^ r[(N ^ (224 | Z >> 12 & 15)) & 255], N = N >>> 8 ^ r[(N ^ (128 | Z >> 6 & 63)) & 255], N = N >>> 8 ^ r[(N ^ (128 | Z & 63)) & 255]);
        return ~N;
      }
      e.table = r, e.bstr = D, e.buf = F, e.str = I;
    });
  }(li)), li;
}
var Qc = Jc();
const el = /* @__PURE__ */ Ht(Qc);
var ui = {}, go;
function Ot() {
  return go || (go = 1, function(n) {
    var e = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
    function t(a, o) {
      return Object.prototype.hasOwnProperty.call(a, o);
    }
    n.assign = function(a) {
      for (var o = Array.prototype.slice.call(arguments, 1); o.length; ) {
        var c = o.shift();
        if (c) {
          if (typeof c != "object")
            throw new TypeError(c + "must be non-object");
          for (var s in c)
            t(c, s) && (a[s] = c[s]);
        }
      }
      return a;
    }, n.shrinkBuf = function(a, o) {
      return a.length === o ? a : a.subarray ? a.subarray(0, o) : (a.length = o, a);
    };
    var r = {
      arraySet: function(a, o, c, s, h) {
        if (o.subarray && a.subarray) {
          a.set(o.subarray(c, c + s), h);
          return;
        }
        for (var l = 0; l < s; l++)
          a[h + l] = o[c + l];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        var o, c, s, h, l, p;
        for (s = 0, o = 0, c = a.length; o < c; o++)
          s += a[o].length;
        for (p = new Uint8Array(s), h = 0, o = 0, c = a.length; o < c; o++)
          l = a[o], p.set(l, h), h += l.length;
        return p;
      }
    }, i = {
      arraySet: function(a, o, c, s, h) {
        for (var l = 0; l < s; l++)
          a[h + l] = o[c + l];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        return [].concat.apply([], a);
      }
    };
    n.setTyped = function(a) {
      a ? (n.Buf8 = Uint8Array, n.Buf16 = Uint16Array, n.Buf32 = Int32Array, n.assign(n, r)) : (n.Buf8 = Array, n.Buf16 = Array, n.Buf32 = Array, n.assign(n, i));
    }, n.setTyped(e);
  }(ui)), ui;
}
var Wt = {}, ut = {}, Pt = {}, _o;
function tl() {
  if (_o) return Pt;
  _o = 1;
  var n = Ot(), e = 4, t = 0, r = 1, i = 2;
  function a(b) {
    for (var Y = b.length; --Y >= 0; )
      b[Y] = 0;
  }
  var o = 0, c = 1, s = 2, h = 3, l = 258, p = 29, w = 256, _ = w + 1 + p, A = 30, S = 19, v = 2 * _ + 1, R = 15, x = 16, k = 7, P = 256, D = 16, F = 17, I = 18, $ = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  ), U = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  ), N = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  ), G = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], T = 512, Z = new Array((_ + 2) * 2);
  a(Z);
  var Q = new Array(A * 2);
  a(Q);
  var se = new Array(T);
  a(se);
  var V = new Array(l - h + 1);
  a(V);
  var q = new Array(p);
  a(q);
  var K = new Array(A);
  a(K);
  function ne(b, Y, J, te, C) {
    this.static_tree = b, this.extra_bits = Y, this.extra_base = J, this.elems = te, this.max_length = C, this.has_stree = b && b.length;
  }
  var we, ge, ce;
  function _e(b, Y) {
    this.dyn_tree = b, this.max_code = 0, this.stat_desc = Y;
  }
  function ke(b) {
    return b < 256 ? se[b] : se[256 + (b >>> 7)];
  }
  function Ce(b, Y) {
    b.pending_buf[b.pending++] = Y & 255, b.pending_buf[b.pending++] = Y >>> 8 & 255;
  }
  function me(b, Y, J) {
    b.bi_valid > x - J ? (b.bi_buf |= Y << b.bi_valid & 65535, Ce(b, b.bi_buf), b.bi_buf = Y >> x - b.bi_valid, b.bi_valid += J - x) : (b.bi_buf |= Y << b.bi_valid & 65535, b.bi_valid += J);
  }
  function de(b, Y, J) {
    me(
      b,
      J[Y * 2],
      J[Y * 2 + 1]
      /*.Len*/
    );
  }
  function Se(b, Y) {
    var J = 0;
    do
      J |= b & 1, b >>>= 1, J <<= 1;
    while (--Y > 0);
    return J >>> 1;
  }
  function Te(b) {
    b.bi_valid === 16 ? (Ce(b, b.bi_buf), b.bi_buf = 0, b.bi_valid = 0) : b.bi_valid >= 8 && (b.pending_buf[b.pending++] = b.bi_buf & 255, b.bi_buf >>= 8, b.bi_valid -= 8);
  }
  function ve(b, Y) {
    var J = Y.dyn_tree, te = Y.max_code, C = Y.stat_desc.static_tree, W = Y.stat_desc.has_stree, y = Y.stat_desc.extra_bits, X = Y.stat_desc.extra_base, ue = Y.stat_desc.max_length, f, L, z, g, O, j, ie = 0;
    for (g = 0; g <= R; g++)
      b.bl_count[g] = 0;
    for (J[b.heap[b.heap_max] * 2 + 1] = 0, f = b.heap_max + 1; f < v; f++)
      L = b.heap[f], g = J[J[L * 2 + 1] * 2 + 1] + 1, g > ue && (g = ue, ie++), J[L * 2 + 1] = g, !(L > te) && (b.bl_count[g]++, O = 0, L >= X && (O = y[L - X]), j = J[L * 2], b.opt_len += j * (g + O), W && (b.static_len += j * (C[L * 2 + 1] + O)));
    if (ie !== 0) {
      do {
        for (g = ue - 1; b.bl_count[g] === 0; )
          g--;
        b.bl_count[g]--, b.bl_count[g + 1] += 2, b.bl_count[ue]--, ie -= 2;
      } while (ie > 0);
      for (g = ue; g !== 0; g--)
        for (L = b.bl_count[g]; L !== 0; )
          z = b.heap[--f], !(z > te) && (J[z * 2 + 1] !== g && (b.opt_len += (g - J[z * 2 + 1]) * J[z * 2], J[z * 2 + 1] = g), L--);
    }
  }
  function xe(b, Y, J) {
    var te = new Array(R + 1), C = 0, W, y;
    for (W = 1; W <= R; W++)
      te[W] = C = C + J[W - 1] << 1;
    for (y = 0; y <= Y; y++) {
      var X = b[y * 2 + 1];
      X !== 0 && (b[y * 2] = Se(te[X]++, X));
    }
  }
  function ee() {
    var b, Y, J, te, C, W = new Array(R + 1);
    for (J = 0, te = 0; te < p - 1; te++)
      for (q[te] = J, b = 0; b < 1 << $[te]; b++)
        V[J++] = te;
    for (V[J - 1] = te, C = 0, te = 0; te < 16; te++)
      for (K[te] = C, b = 0; b < 1 << U[te]; b++)
        se[C++] = te;
    for (C >>= 7; te < A; te++)
      for (K[te] = C << 7, b = 0; b < 1 << U[te] - 7; b++)
        se[256 + C++] = te;
    for (Y = 0; Y <= R; Y++)
      W[Y] = 0;
    for (b = 0; b <= 143; )
      Z[b * 2 + 1] = 8, b++, W[8]++;
    for (; b <= 255; )
      Z[b * 2 + 1] = 9, b++, W[9]++;
    for (; b <= 279; )
      Z[b * 2 + 1] = 7, b++, W[7]++;
    for (; b <= 287; )
      Z[b * 2 + 1] = 8, b++, W[8]++;
    for (xe(Z, _ + 1, W), b = 0; b < A; b++)
      Q[b * 2 + 1] = 5, Q[b * 2] = Se(b, 5);
    we = new ne(Z, $, w + 1, _, R), ge = new ne(Q, U, 0, A, R), ce = new ne(new Array(0), N, 0, S, k);
  }
  function fe(b) {
    var Y;
    for (Y = 0; Y < _; Y++)
      b.dyn_ltree[Y * 2] = 0;
    for (Y = 0; Y < A; Y++)
      b.dyn_dtree[Y * 2] = 0;
    for (Y = 0; Y < S; Y++)
      b.bl_tree[Y * 2] = 0;
    b.dyn_ltree[P * 2] = 1, b.opt_len = b.static_len = 0, b.last_lit = b.matches = 0;
  }
  function Be(b) {
    b.bi_valid > 8 ? Ce(b, b.bi_buf) : b.bi_valid > 0 && (b.pending_buf[b.pending++] = b.bi_buf), b.bi_buf = 0, b.bi_valid = 0;
  }
  function Oe(b, Y, J, te) {
    Be(b), Ce(b, J), Ce(b, ~J), n.arraySet(b.pending_buf, b.window, Y, J, b.pending), b.pending += J;
  }
  function Re(b, Y, J, te) {
    var C = Y * 2, W = J * 2;
    return b[C] < b[W] || b[C] === b[W] && te[Y] <= te[J];
  }
  function Ae(b, Y, J) {
    for (var te = b.heap[J], C = J << 1; C <= b.heap_len && (C < b.heap_len && Re(Y, b.heap[C + 1], b.heap[C], b.depth) && C++, !Re(Y, te, b.heap[C], b.depth)); )
      b.heap[J] = b.heap[C], J = C, C <<= 1;
    b.heap[J] = te;
  }
  function pe(b, Y, J) {
    var te, C, W = 0, y, X;
    if (b.last_lit !== 0)
      do
        te = b.pending_buf[b.d_buf + W * 2] << 8 | b.pending_buf[b.d_buf + W * 2 + 1], C = b.pending_buf[b.l_buf + W], W++, te === 0 ? de(b, C, Y) : (y = V[C], de(b, y + w + 1, Y), X = $[y], X !== 0 && (C -= q[y], me(b, C, X)), te--, y = ke(te), de(b, y, J), X = U[y], X !== 0 && (te -= K[y], me(b, te, X)));
      while (W < b.last_lit);
    de(b, P, Y);
  }
  function We(b, Y) {
    var J = Y.dyn_tree, te = Y.stat_desc.static_tree, C = Y.stat_desc.has_stree, W = Y.stat_desc.elems, y, X, ue = -1, f;
    for (b.heap_len = 0, b.heap_max = v, y = 0; y < W; y++)
      J[y * 2] !== 0 ? (b.heap[++b.heap_len] = ue = y, b.depth[y] = 0) : J[y * 2 + 1] = 0;
    for (; b.heap_len < 2; )
      f = b.heap[++b.heap_len] = ue < 2 ? ++ue : 0, J[f * 2] = 1, b.depth[f] = 0, b.opt_len--, C && (b.static_len -= te[f * 2 + 1]);
    for (Y.max_code = ue, y = b.heap_len >> 1; y >= 1; y--)
      Ae(b, J, y);
    f = W;
    do
      y = b.heap[
        1
        /*SMALLEST*/
      ], b.heap[
        1
        /*SMALLEST*/
      ] = b.heap[b.heap_len--], Ae(
        b,
        J,
        1
        /*SMALLEST*/
      ), X = b.heap[
        1
        /*SMALLEST*/
      ], b.heap[--b.heap_max] = y, b.heap[--b.heap_max] = X, J[f * 2] = J[y * 2] + J[X * 2], b.depth[f] = (b.depth[y] >= b.depth[X] ? b.depth[y] : b.depth[X]) + 1, J[y * 2 + 1] = J[X * 2 + 1] = f, b.heap[
        1
        /*SMALLEST*/
      ] = f++, Ae(
        b,
        J,
        1
        /*SMALLEST*/
      );
    while (b.heap_len >= 2);
    b.heap[--b.heap_max] = b.heap[
      1
      /*SMALLEST*/
    ], ve(b, Y), xe(J, ue, b.bl_count);
  }
  function et(b, Y, J) {
    var te, C = -1, W, y = Y[0 * 2 + 1], X = 0, ue = 7, f = 4;
    for (y === 0 && (ue = 138, f = 3), Y[(J + 1) * 2 + 1] = 65535, te = 0; te <= J; te++)
      W = y, y = Y[(te + 1) * 2 + 1], !(++X < ue && W === y) && (X < f ? b.bl_tree[W * 2] += X : W !== 0 ? (W !== C && b.bl_tree[W * 2]++, b.bl_tree[D * 2]++) : X <= 10 ? b.bl_tree[F * 2]++ : b.bl_tree[I * 2]++, X = 0, C = W, y === 0 ? (ue = 138, f = 3) : W === y ? (ue = 6, f = 3) : (ue = 7, f = 4));
  }
  function He(b, Y, J) {
    var te, C = -1, W, y = Y[0 * 2 + 1], X = 0, ue = 7, f = 4;
    for (y === 0 && (ue = 138, f = 3), te = 0; te <= J; te++)
      if (W = y, y = Y[(te + 1) * 2 + 1], !(++X < ue && W === y)) {
        if (X < f)
          do
            de(b, W, b.bl_tree);
          while (--X !== 0);
        else W !== 0 ? (W !== C && (de(b, W, b.bl_tree), X--), de(b, D, b.bl_tree), me(b, X - 3, 2)) : X <= 10 ? (de(b, F, b.bl_tree), me(b, X - 3, 3)) : (de(b, I, b.bl_tree), me(b, X - 11, 7));
        X = 0, C = W, y === 0 ? (ue = 138, f = 3) : W === y ? (ue = 6, f = 3) : (ue = 7, f = 4);
      }
  }
  function Ie(b) {
    var Y;
    for (et(b, b.dyn_ltree, b.l_desc.max_code), et(b, b.dyn_dtree, b.d_desc.max_code), We(b, b.bl_desc), Y = S - 1; Y >= 3 && b.bl_tree[G[Y] * 2 + 1] === 0; Y--)
      ;
    return b.opt_len += 3 * (Y + 1) + 5 + 5 + 4, Y;
  }
  function Me(b, Y, J, te) {
    var C;
    for (me(b, Y - 257, 5), me(b, J - 1, 5), me(b, te - 4, 4), C = 0; C < te; C++)
      me(b, b.bl_tree[G[C] * 2 + 1], 3);
    He(b, b.dyn_ltree, Y - 1), He(b, b.dyn_dtree, J - 1);
  }
  function Je(b) {
    var Y = 4093624447, J;
    for (J = 0; J <= 31; J++, Y >>>= 1)
      if (Y & 1 && b.dyn_ltree[J * 2] !== 0)
        return t;
    if (b.dyn_ltree[9 * 2] !== 0 || b.dyn_ltree[10 * 2] !== 0 || b.dyn_ltree[13 * 2] !== 0)
      return r;
    for (J = 32; J < w; J++)
      if (b.dyn_ltree[J * 2] !== 0)
        return r;
    return t;
  }
  var tt = !1;
  function kt(b) {
    tt || (ee(), tt = !0), b.l_desc = new _e(b.dyn_ltree, we), b.d_desc = new _e(b.dyn_dtree, ge), b.bl_desc = new _e(b.bl_tree, ce), b.bi_buf = 0, b.bi_valid = 0, fe(b);
  }
  function lt(b, Y, J, te) {
    me(b, (o << 1) + (te ? 1 : 0), 3), Oe(b, Y, J);
  }
  function Ze(b) {
    me(b, c << 1, 3), de(b, P, Z), Te(b);
  }
  function Xe(b, Y, J, te) {
    var C, W, y = 0;
    b.level > 0 ? (b.strm.data_type === i && (b.strm.data_type = Je(b)), We(b, b.l_desc), We(b, b.d_desc), y = Ie(b), C = b.opt_len + 3 + 7 >>> 3, W = b.static_len + 3 + 7 >>> 3, W <= C && (C = W)) : C = W = J + 5, J + 4 <= C && Y !== -1 ? lt(b, Y, J, te) : b.strategy === e || W === C ? (me(b, (c << 1) + (te ? 1 : 0), 3), pe(b, Z, Q)) : (me(b, (s << 1) + (te ? 1 : 0), 3), Me(b, b.l_desc.max_code + 1, b.d_desc.max_code + 1, y + 1), pe(b, b.dyn_ltree, b.dyn_dtree)), fe(b), te && Be(b);
  }
  function wt(b, Y, J) {
    return b.pending_buf[b.d_buf + b.last_lit * 2] = Y >>> 8 & 255, b.pending_buf[b.d_buf + b.last_lit * 2 + 1] = Y & 255, b.pending_buf[b.l_buf + b.last_lit] = J & 255, b.last_lit++, Y === 0 ? b.dyn_ltree[J * 2]++ : (b.matches++, Y--, b.dyn_ltree[(V[J] + w + 1) * 2]++, b.dyn_dtree[ke(Y) * 2]++), b.last_lit === b.lit_bufsize - 1;
  }
  return Pt._tr_init = kt, Pt._tr_stored_block = lt, Pt._tr_flush_block = Xe, Pt._tr_tally = wt, Pt._tr_align = Ze, Pt;
}
var fi, vo;
function Ss() {
  if (vo) return fi;
  vo = 1;
  function n(e, t, r, i) {
    for (var a = e & 65535 | 0, o = e >>> 16 & 65535 | 0, c = 0; r !== 0; ) {
      c = r > 2e3 ? 2e3 : r, r -= c;
      do
        a = a + t[i++] | 0, o = o + a | 0;
      while (--c);
      a %= 65521, o %= 65521;
    }
    return a | o << 16 | 0;
  }
  return fi = n, fi;
}
var hi, bo;
function xs() {
  if (bo) return hi;
  bo = 1;
  function n() {
    for (var r, i = [], a = 0; a < 256; a++) {
      r = a;
      for (var o = 0; o < 8; o++)
        r = r & 1 ? 3988292384 ^ r >>> 1 : r >>> 1;
      i[a] = r;
    }
    return i;
  }
  var e = n();
  function t(r, i, a, o) {
    var c = e, s = o + a;
    r ^= -1;
    for (var h = o; h < s; h++)
      r = r >>> 8 ^ c[(r ^ i[h]) & 255];
    return r ^ -1;
  }
  return hi = t, hi;
}
var di, Eo;
function ta() {
  return Eo || (Eo = 1, di = {
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
var ko;
function rl() {
  if (ko) return ut;
  ko = 1;
  var n = Ot(), e = tl(), t = Ss(), r = xs(), i = ta(), a = 0, o = 1, c = 3, s = 4, h = 5, l = 0, p = 1, w = -2, _ = -3, A = -5, S = -1, v = 1, R = 2, x = 3, k = 4, P = 0, D = 2, F = 8, I = 9, $ = 15, U = 8, N = 29, G = 256, T = G + 1 + N, Z = 30, Q = 19, se = 2 * T + 1, V = 15, q = 3, K = 258, ne = K + q + 1, we = 32, ge = 42, ce = 69, _e = 73, ke = 91, Ce = 103, me = 113, de = 666, Se = 1, Te = 2, ve = 3, xe = 4, ee = 3;
  function fe(f, L) {
    return f.msg = i[L], L;
  }
  function Be(f) {
    return (f << 1) - (f > 4 ? 9 : 0);
  }
  function Oe(f) {
    for (var L = f.length; --L >= 0; )
      f[L] = 0;
  }
  function Re(f) {
    var L = f.state, z = L.pending;
    z > f.avail_out && (z = f.avail_out), z !== 0 && (n.arraySet(f.output, L.pending_buf, L.pending_out, z, f.next_out), f.next_out += z, L.pending_out += z, f.total_out += z, f.avail_out -= z, L.pending -= z, L.pending === 0 && (L.pending_out = 0));
  }
  function Ae(f, L) {
    e._tr_flush_block(f, f.block_start >= 0 ? f.block_start : -1, f.strstart - f.block_start, L), f.block_start = f.strstart, Re(f.strm);
  }
  function pe(f, L) {
    f.pending_buf[f.pending++] = L;
  }
  function We(f, L) {
    f.pending_buf[f.pending++] = L >>> 8 & 255, f.pending_buf[f.pending++] = L & 255;
  }
  function et(f, L, z, g) {
    var O = f.avail_in;
    return O > g && (O = g), O === 0 ? 0 : (f.avail_in -= O, n.arraySet(L, f.input, f.next_in, O, z), f.state.wrap === 1 ? f.adler = t(f.adler, L, O, z) : f.state.wrap === 2 && (f.adler = r(f.adler, L, O, z)), f.next_in += O, f.total_in += O, O);
  }
  function He(f, L) {
    var z = f.max_chain_length, g = f.strstart, O, j, ie = f.prev_length, re = f.nice_match, m = f.strstart > f.w_size - ne ? f.strstart - (f.w_size - ne) : 0, u = f.window, d = f.w_mask, E = f.prev, B = f.strstart + K, M = u[g + ie - 1], H = u[g + ie];
    f.prev_length >= f.good_match && (z >>= 2), re > f.lookahead && (re = f.lookahead);
    do
      if (O = L, !(u[O + ie] !== H || u[O + ie - 1] !== M || u[O] !== u[g] || u[++O] !== u[g + 1])) {
        g += 2, O++;
        do
          ;
        while (u[++g] === u[++O] && u[++g] === u[++O] && u[++g] === u[++O] && u[++g] === u[++O] && u[++g] === u[++O] && u[++g] === u[++O] && u[++g] === u[++O] && u[++g] === u[++O] && g < B);
        if (j = K - (B - g), g = B - K, j > ie) {
          if (f.match_start = L, ie = j, j >= re)
            break;
          M = u[g + ie - 1], H = u[g + ie];
        }
      }
    while ((L = E[L & d]) > m && --z !== 0);
    return ie <= f.lookahead ? ie : f.lookahead;
  }
  function Ie(f) {
    var L = f.w_size, z, g, O, j, ie;
    do {
      if (j = f.window_size - f.lookahead - f.strstart, f.strstart >= L + (L - ne)) {
        n.arraySet(f.window, f.window, L, L, 0), f.match_start -= L, f.strstart -= L, f.block_start -= L, g = f.hash_size, z = g;
        do
          O = f.head[--z], f.head[z] = O >= L ? O - L : 0;
        while (--g);
        g = L, z = g;
        do
          O = f.prev[--z], f.prev[z] = O >= L ? O - L : 0;
        while (--g);
        j += L;
      }
      if (f.strm.avail_in === 0)
        break;
      if (g = et(f.strm, f.window, f.strstart + f.lookahead, j), f.lookahead += g, f.lookahead + f.insert >= q)
        for (ie = f.strstart - f.insert, f.ins_h = f.window[ie], f.ins_h = (f.ins_h << f.hash_shift ^ f.window[ie + 1]) & f.hash_mask; f.insert && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[ie + q - 1]) & f.hash_mask, f.prev[ie & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = ie, ie++, f.insert--, !(f.lookahead + f.insert < q)); )
          ;
    } while (f.lookahead < ne && f.strm.avail_in !== 0);
  }
  function Me(f, L) {
    var z = 65535;
    for (z > f.pending_buf_size - 5 && (z = f.pending_buf_size - 5); ; ) {
      if (f.lookahead <= 1) {
        if (Ie(f), f.lookahead === 0 && L === a)
          return Se;
        if (f.lookahead === 0)
          break;
      }
      f.strstart += f.lookahead, f.lookahead = 0;
      var g = f.block_start + z;
      if ((f.strstart === 0 || f.strstart >= g) && (f.lookahead = f.strstart - g, f.strstart = g, Ae(f, !1), f.strm.avail_out === 0) || f.strstart - f.block_start >= f.w_size - ne && (Ae(f, !1), f.strm.avail_out === 0))
        return Se;
    }
    return f.insert = 0, L === s ? (Ae(f, !0), f.strm.avail_out === 0 ? ve : xe) : (f.strstart > f.block_start && (Ae(f, !1), f.strm.avail_out === 0), Se);
  }
  function Je(f, L) {
    for (var z, g; ; ) {
      if (f.lookahead < ne) {
        if (Ie(f), f.lookahead < ne && L === a)
          return Se;
        if (f.lookahead === 0)
          break;
      }
      if (z = 0, f.lookahead >= q && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + q - 1]) & f.hash_mask, z = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart), z !== 0 && f.strstart - z <= f.w_size - ne && (f.match_length = He(f, z)), f.match_length >= q)
        if (g = e._tr_tally(f, f.strstart - f.match_start, f.match_length - q), f.lookahead -= f.match_length, f.match_length <= f.max_lazy_match && f.lookahead >= q) {
          f.match_length--;
          do
            f.strstart++, f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + q - 1]) & f.hash_mask, z = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart;
          while (--f.match_length !== 0);
          f.strstart++;
        } else
          f.strstart += f.match_length, f.match_length = 0, f.ins_h = f.window[f.strstart], f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + 1]) & f.hash_mask;
      else
        g = e._tr_tally(f, 0, f.window[f.strstart]), f.lookahead--, f.strstart++;
      if (g && (Ae(f, !1), f.strm.avail_out === 0))
        return Se;
    }
    return f.insert = f.strstart < q - 1 ? f.strstart : q - 1, L === s ? (Ae(f, !0), f.strm.avail_out === 0 ? ve : xe) : f.last_lit && (Ae(f, !1), f.strm.avail_out === 0) ? Se : Te;
  }
  function tt(f, L) {
    for (var z, g, O; ; ) {
      if (f.lookahead < ne) {
        if (Ie(f), f.lookahead < ne && L === a)
          return Se;
        if (f.lookahead === 0)
          break;
      }
      if (z = 0, f.lookahead >= q && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + q - 1]) & f.hash_mask, z = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart), f.prev_length = f.match_length, f.prev_match = f.match_start, f.match_length = q - 1, z !== 0 && f.prev_length < f.max_lazy_match && f.strstart - z <= f.w_size - ne && (f.match_length = He(f, z), f.match_length <= 5 && (f.strategy === v || f.match_length === q && f.strstart - f.match_start > 4096) && (f.match_length = q - 1)), f.prev_length >= q && f.match_length <= f.prev_length) {
        O = f.strstart + f.lookahead - q, g = e._tr_tally(f, f.strstart - 1 - f.prev_match, f.prev_length - q), f.lookahead -= f.prev_length - 1, f.prev_length -= 2;
        do
          ++f.strstart <= O && (f.ins_h = (f.ins_h << f.hash_shift ^ f.window[f.strstart + q - 1]) & f.hash_mask, z = f.prev[f.strstart & f.w_mask] = f.head[f.ins_h], f.head[f.ins_h] = f.strstart);
        while (--f.prev_length !== 0);
        if (f.match_available = 0, f.match_length = q - 1, f.strstart++, g && (Ae(f, !1), f.strm.avail_out === 0))
          return Se;
      } else if (f.match_available) {
        if (g = e._tr_tally(f, 0, f.window[f.strstart - 1]), g && Ae(f, !1), f.strstart++, f.lookahead--, f.strm.avail_out === 0)
          return Se;
      } else
        f.match_available = 1, f.strstart++, f.lookahead--;
    }
    return f.match_available && (g = e._tr_tally(f, 0, f.window[f.strstart - 1]), f.match_available = 0), f.insert = f.strstart < q - 1 ? f.strstart : q - 1, L === s ? (Ae(f, !0), f.strm.avail_out === 0 ? ve : xe) : f.last_lit && (Ae(f, !1), f.strm.avail_out === 0) ? Se : Te;
  }
  function kt(f, L) {
    for (var z, g, O, j, ie = f.window; ; ) {
      if (f.lookahead <= K) {
        if (Ie(f), f.lookahead <= K && L === a)
          return Se;
        if (f.lookahead === 0)
          break;
      }
      if (f.match_length = 0, f.lookahead >= q && f.strstart > 0 && (O = f.strstart - 1, g = ie[O], g === ie[++O] && g === ie[++O] && g === ie[++O])) {
        j = f.strstart + K;
        do
          ;
        while (g === ie[++O] && g === ie[++O] && g === ie[++O] && g === ie[++O] && g === ie[++O] && g === ie[++O] && g === ie[++O] && g === ie[++O] && O < j);
        f.match_length = K - (j - O), f.match_length > f.lookahead && (f.match_length = f.lookahead);
      }
      if (f.match_length >= q ? (z = e._tr_tally(f, 1, f.match_length - q), f.lookahead -= f.match_length, f.strstart += f.match_length, f.match_length = 0) : (z = e._tr_tally(f, 0, f.window[f.strstart]), f.lookahead--, f.strstart++), z && (Ae(f, !1), f.strm.avail_out === 0))
        return Se;
    }
    return f.insert = 0, L === s ? (Ae(f, !0), f.strm.avail_out === 0 ? ve : xe) : f.last_lit && (Ae(f, !1), f.strm.avail_out === 0) ? Se : Te;
  }
  function lt(f, L) {
    for (var z; ; ) {
      if (f.lookahead === 0 && (Ie(f), f.lookahead === 0)) {
        if (L === a)
          return Se;
        break;
      }
      if (f.match_length = 0, z = e._tr_tally(f, 0, f.window[f.strstart]), f.lookahead--, f.strstart++, z && (Ae(f, !1), f.strm.avail_out === 0))
        return Se;
    }
    return f.insert = 0, L === s ? (Ae(f, !0), f.strm.avail_out === 0 ? ve : xe) : f.last_lit && (Ae(f, !1), f.strm.avail_out === 0) ? Se : Te;
  }
  function Ze(f, L, z, g, O) {
    this.good_length = f, this.max_lazy = L, this.nice_length = z, this.max_chain = g, this.func = O;
  }
  var Xe;
  Xe = [
    /*      good lazy nice chain */
    new Ze(0, 0, 0, 0, Me),
    /* 0 store only */
    new Ze(4, 4, 8, 4, Je),
    /* 1 max speed, no lazy matches */
    new Ze(4, 5, 16, 8, Je),
    /* 2 */
    new Ze(4, 6, 32, 32, Je),
    /* 3 */
    new Ze(4, 4, 16, 16, tt),
    /* 4 lazy matches */
    new Ze(8, 16, 32, 32, tt),
    /* 5 */
    new Ze(8, 16, 128, 128, tt),
    /* 6 */
    new Ze(8, 32, 128, 256, tt),
    /* 7 */
    new Ze(32, 128, 258, 1024, tt),
    /* 8 */
    new Ze(32, 258, 258, 4096, tt)
    /* 9 max compression */
  ];
  function wt(f) {
    f.window_size = 2 * f.w_size, Oe(f.head), f.max_lazy_match = Xe[f.level].max_lazy, f.good_match = Xe[f.level].good_length, f.nice_match = Xe[f.level].nice_length, f.max_chain_length = Xe[f.level].max_chain, f.strstart = 0, f.block_start = 0, f.lookahead = 0, f.insert = 0, f.match_length = f.prev_length = q - 1, f.match_available = 0, f.ins_h = 0;
  }
  function b() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = F, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new n.Buf16(se * 2), this.dyn_dtree = new n.Buf16((2 * Z + 1) * 2), this.bl_tree = new n.Buf16((2 * Q + 1) * 2), Oe(this.dyn_ltree), Oe(this.dyn_dtree), Oe(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new n.Buf16(V + 1), this.heap = new n.Buf16(2 * T + 1), Oe(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new n.Buf16(2 * T + 1), Oe(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  function Y(f) {
    var L;
    return !f || !f.state ? fe(f, w) : (f.total_in = f.total_out = 0, f.data_type = D, L = f.state, L.pending = 0, L.pending_out = 0, L.wrap < 0 && (L.wrap = -L.wrap), L.status = L.wrap ? ge : me, f.adler = L.wrap === 2 ? 0 : 1, L.last_flush = a, e._tr_init(L), l);
  }
  function J(f) {
    var L = Y(f);
    return L === l && wt(f.state), L;
  }
  function te(f, L) {
    return !f || !f.state || f.state.wrap !== 2 ? w : (f.state.gzhead = L, l);
  }
  function C(f, L, z, g, O, j) {
    if (!f)
      return w;
    var ie = 1;
    if (L === S && (L = 6), g < 0 ? (ie = 0, g = -g) : g > 15 && (ie = 2, g -= 16), O < 1 || O > I || z !== F || g < 8 || g > 15 || L < 0 || L > 9 || j < 0 || j > k)
      return fe(f, w);
    g === 8 && (g = 9);
    var re = new b();
    return f.state = re, re.strm = f, re.wrap = ie, re.gzhead = null, re.w_bits = g, re.w_size = 1 << re.w_bits, re.w_mask = re.w_size - 1, re.hash_bits = O + 7, re.hash_size = 1 << re.hash_bits, re.hash_mask = re.hash_size - 1, re.hash_shift = ~~((re.hash_bits + q - 1) / q), re.window = new n.Buf8(re.w_size * 2), re.head = new n.Buf16(re.hash_size), re.prev = new n.Buf16(re.w_size), re.lit_bufsize = 1 << O + 6, re.pending_buf_size = re.lit_bufsize * 4, re.pending_buf = new n.Buf8(re.pending_buf_size), re.d_buf = 1 * re.lit_bufsize, re.l_buf = 3 * re.lit_bufsize, re.level = L, re.strategy = j, re.method = z, J(f);
  }
  function W(f, L) {
    return C(f, L, F, $, U, P);
  }
  function y(f, L) {
    var z, g, O, j;
    if (!f || !f.state || L > h || L < 0)
      return f ? fe(f, w) : w;
    if (g = f.state, !f.output || !f.input && f.avail_in !== 0 || g.status === de && L !== s)
      return fe(f, f.avail_out === 0 ? A : w);
    if (g.strm = f, z = g.last_flush, g.last_flush = L, g.status === ge)
      if (g.wrap === 2)
        f.adler = 0, pe(g, 31), pe(g, 139), pe(g, 8), g.gzhead ? (pe(
          g,
          (g.gzhead.text ? 1 : 0) + (g.gzhead.hcrc ? 2 : 0) + (g.gzhead.extra ? 4 : 0) + (g.gzhead.name ? 8 : 0) + (g.gzhead.comment ? 16 : 0)
        ), pe(g, g.gzhead.time & 255), pe(g, g.gzhead.time >> 8 & 255), pe(g, g.gzhead.time >> 16 & 255), pe(g, g.gzhead.time >> 24 & 255), pe(g, g.level === 9 ? 2 : g.strategy >= R || g.level < 2 ? 4 : 0), pe(g, g.gzhead.os & 255), g.gzhead.extra && g.gzhead.extra.length && (pe(g, g.gzhead.extra.length & 255), pe(g, g.gzhead.extra.length >> 8 & 255)), g.gzhead.hcrc && (f.adler = r(f.adler, g.pending_buf, g.pending, 0)), g.gzindex = 0, g.status = ce) : (pe(g, 0), pe(g, 0), pe(g, 0), pe(g, 0), pe(g, 0), pe(g, g.level === 9 ? 2 : g.strategy >= R || g.level < 2 ? 4 : 0), pe(g, ee), g.status = me);
      else {
        var ie = F + (g.w_bits - 8 << 4) << 8, re = -1;
        g.strategy >= R || g.level < 2 ? re = 0 : g.level < 6 ? re = 1 : g.level === 6 ? re = 2 : re = 3, ie |= re << 6, g.strstart !== 0 && (ie |= we), ie += 31 - ie % 31, g.status = me, We(g, ie), g.strstart !== 0 && (We(g, f.adler >>> 16), We(g, f.adler & 65535)), f.adler = 1;
      }
    if (g.status === ce)
      if (g.gzhead.extra) {
        for (O = g.pending; g.gzindex < (g.gzhead.extra.length & 65535) && !(g.pending === g.pending_buf_size && (g.gzhead.hcrc && g.pending > O && (f.adler = r(f.adler, g.pending_buf, g.pending - O, O)), Re(f), O = g.pending, g.pending === g.pending_buf_size)); )
          pe(g, g.gzhead.extra[g.gzindex] & 255), g.gzindex++;
        g.gzhead.hcrc && g.pending > O && (f.adler = r(f.adler, g.pending_buf, g.pending - O, O)), g.gzindex === g.gzhead.extra.length && (g.gzindex = 0, g.status = _e);
      } else
        g.status = _e;
    if (g.status === _e)
      if (g.gzhead.name) {
        O = g.pending;
        do {
          if (g.pending === g.pending_buf_size && (g.gzhead.hcrc && g.pending > O && (f.adler = r(f.adler, g.pending_buf, g.pending - O, O)), Re(f), O = g.pending, g.pending === g.pending_buf_size)) {
            j = 1;
            break;
          }
          g.gzindex < g.gzhead.name.length ? j = g.gzhead.name.charCodeAt(g.gzindex++) & 255 : j = 0, pe(g, j);
        } while (j !== 0);
        g.gzhead.hcrc && g.pending > O && (f.adler = r(f.adler, g.pending_buf, g.pending - O, O)), j === 0 && (g.gzindex = 0, g.status = ke);
      } else
        g.status = ke;
    if (g.status === ke)
      if (g.gzhead.comment) {
        O = g.pending;
        do {
          if (g.pending === g.pending_buf_size && (g.gzhead.hcrc && g.pending > O && (f.adler = r(f.adler, g.pending_buf, g.pending - O, O)), Re(f), O = g.pending, g.pending === g.pending_buf_size)) {
            j = 1;
            break;
          }
          g.gzindex < g.gzhead.comment.length ? j = g.gzhead.comment.charCodeAt(g.gzindex++) & 255 : j = 0, pe(g, j);
        } while (j !== 0);
        g.gzhead.hcrc && g.pending > O && (f.adler = r(f.adler, g.pending_buf, g.pending - O, O)), j === 0 && (g.status = Ce);
      } else
        g.status = Ce;
    if (g.status === Ce && (g.gzhead.hcrc ? (g.pending + 2 > g.pending_buf_size && Re(f), g.pending + 2 <= g.pending_buf_size && (pe(g, f.adler & 255), pe(g, f.adler >> 8 & 255), f.adler = 0, g.status = me)) : g.status = me), g.pending !== 0) {
      if (Re(f), f.avail_out === 0)
        return g.last_flush = -1, l;
    } else if (f.avail_in === 0 && Be(L) <= Be(z) && L !== s)
      return fe(f, A);
    if (g.status === de && f.avail_in !== 0)
      return fe(f, A);
    if (f.avail_in !== 0 || g.lookahead !== 0 || L !== a && g.status !== de) {
      var m = g.strategy === R ? lt(g, L) : g.strategy === x ? kt(g, L) : Xe[g.level].func(g, L);
      if ((m === ve || m === xe) && (g.status = de), m === Se || m === ve)
        return f.avail_out === 0 && (g.last_flush = -1), l;
      if (m === Te && (L === o ? e._tr_align(g) : L !== h && (e._tr_stored_block(g, 0, 0, !1), L === c && (Oe(g.head), g.lookahead === 0 && (g.strstart = 0, g.block_start = 0, g.insert = 0))), Re(f), f.avail_out === 0))
        return g.last_flush = -1, l;
    }
    return L !== s ? l : g.wrap <= 0 ? p : (g.wrap === 2 ? (pe(g, f.adler & 255), pe(g, f.adler >> 8 & 255), pe(g, f.adler >> 16 & 255), pe(g, f.adler >> 24 & 255), pe(g, f.total_in & 255), pe(g, f.total_in >> 8 & 255), pe(g, f.total_in >> 16 & 255), pe(g, f.total_in >> 24 & 255)) : (We(g, f.adler >>> 16), We(g, f.adler & 65535)), Re(f), g.wrap > 0 && (g.wrap = -g.wrap), g.pending !== 0 ? l : p);
  }
  function X(f) {
    var L;
    return !f || !f.state ? w : (L = f.state.status, L !== ge && L !== ce && L !== _e && L !== ke && L !== Ce && L !== me && L !== de ? fe(f, w) : (f.state = null, L === me ? fe(f, _) : l));
  }
  function ue(f, L) {
    var z = L.length, g, O, j, ie, re, m, u, d;
    if (!f || !f.state || (g = f.state, ie = g.wrap, ie === 2 || ie === 1 && g.status !== ge || g.lookahead))
      return w;
    for (ie === 1 && (f.adler = t(f.adler, L, z, 0)), g.wrap = 0, z >= g.w_size && (ie === 0 && (Oe(g.head), g.strstart = 0, g.block_start = 0, g.insert = 0), d = new n.Buf8(g.w_size), n.arraySet(d, L, z - g.w_size, g.w_size, 0), L = d, z = g.w_size), re = f.avail_in, m = f.next_in, u = f.input, f.avail_in = z, f.next_in = 0, f.input = L, Ie(g); g.lookahead >= q; ) {
      O = g.strstart, j = g.lookahead - (q - 1);
      do
        g.ins_h = (g.ins_h << g.hash_shift ^ g.window[O + q - 1]) & g.hash_mask, g.prev[O & g.w_mask] = g.head[g.ins_h], g.head[g.ins_h] = O, O++;
      while (--j);
      g.strstart = O, g.lookahead = q - 1, Ie(g);
    }
    return g.strstart += g.lookahead, g.block_start = g.strstart, g.insert = g.lookahead, g.lookahead = 0, g.match_length = g.prev_length = q - 1, g.match_available = 0, f.next_in = m, f.input = u, f.avail_in = re, g.wrap = ie, l;
  }
  return ut.deflateInit = W, ut.deflateInit2 = C, ut.deflateReset = J, ut.deflateResetKeep = Y, ut.deflateSetHeader = te, ut.deflate = y, ut.deflateEnd = X, ut.deflateSetDictionary = ue, ut.deflateInfo = "pako deflate (from Nodeca project)", ut;
}
var Ct = {}, So;
function As() {
  if (So) return Ct;
  So = 1;
  var n = Ot(), e = !0, t = !0;
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
  for (var r = new n.Buf8(256), i = 0; i < 256; i++)
    r[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
  r[254] = r[254] = 1, Ct.string2buf = function(o) {
    var c, s, h, l, p, w = o.length, _ = 0;
    for (l = 0; l < w; l++)
      s = o.charCodeAt(l), (s & 64512) === 55296 && l + 1 < w && (h = o.charCodeAt(l + 1), (h & 64512) === 56320 && (s = 65536 + (s - 55296 << 10) + (h - 56320), l++)), _ += s < 128 ? 1 : s < 2048 ? 2 : s < 65536 ? 3 : 4;
    for (c = new n.Buf8(_), p = 0, l = 0; p < _; l++)
      s = o.charCodeAt(l), (s & 64512) === 55296 && l + 1 < w && (h = o.charCodeAt(l + 1), (h & 64512) === 56320 && (s = 65536 + (s - 55296 << 10) + (h - 56320), l++)), s < 128 ? c[p++] = s : s < 2048 ? (c[p++] = 192 | s >>> 6, c[p++] = 128 | s & 63) : s < 65536 ? (c[p++] = 224 | s >>> 12, c[p++] = 128 | s >>> 6 & 63, c[p++] = 128 | s & 63) : (c[p++] = 240 | s >>> 18, c[p++] = 128 | s >>> 12 & 63, c[p++] = 128 | s >>> 6 & 63, c[p++] = 128 | s & 63);
    return c;
  };
  function a(o, c) {
    if (c < 65534 && (o.subarray && t || !o.subarray && e))
      return String.fromCharCode.apply(null, n.shrinkBuf(o, c));
    for (var s = "", h = 0; h < c; h++)
      s += String.fromCharCode(o[h]);
    return s;
  }
  return Ct.buf2binstring = function(o) {
    return a(o, o.length);
  }, Ct.binstring2buf = function(o) {
    for (var c = new n.Buf8(o.length), s = 0, h = c.length; s < h; s++)
      c[s] = o.charCodeAt(s);
    return c;
  }, Ct.buf2string = function(o, c) {
    var s, h, l, p, w = c || o.length, _ = new Array(w * 2);
    for (h = 0, s = 0; s < w; ) {
      if (l = o[s++], l < 128) {
        _[h++] = l;
        continue;
      }
      if (p = r[l], p > 4) {
        _[h++] = 65533, s += p - 1;
        continue;
      }
      for (l &= p === 2 ? 31 : p === 3 ? 15 : 7; p > 1 && s < w; )
        l = l << 6 | o[s++] & 63, p--;
      if (p > 1) {
        _[h++] = 65533;
        continue;
      }
      l < 65536 ? _[h++] = l : (l -= 65536, _[h++] = 55296 | l >> 10 & 1023, _[h++] = 56320 | l & 1023);
    }
    return a(_, h);
  }, Ct.utf8border = function(o, c) {
    var s;
    for (c = c || o.length, c > o.length && (c = o.length), s = c - 1; s >= 0 && (o[s] & 192) === 128; )
      s--;
    return s < 0 || s === 0 ? c : s + r[o[s]] > c ? s : c;
  }, Ct;
}
var pi, xo;
function Is() {
  if (xo) return pi;
  xo = 1;
  function n() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return pi = n, pi;
}
var Ao;
function nl() {
  if (Ao) return Wt;
  Ao = 1;
  var n = rl(), e = Ot(), t = As(), r = ta(), i = Is(), a = Object.prototype.toString, o = 0, c = 4, s = 0, h = 1, l = 2, p = -1, w = 0, _ = 8;
  function A(x) {
    if (!(this instanceof A)) return new A(x);
    this.options = e.assign({
      level: p,
      method: _,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: w,
      to: ""
    }, x || {});
    var k = this.options;
    k.raw && k.windowBits > 0 ? k.windowBits = -k.windowBits : k.gzip && k.windowBits > 0 && k.windowBits < 16 && (k.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new i(), this.strm.avail_out = 0;
    var P = n.deflateInit2(
      this.strm,
      k.level,
      k.method,
      k.windowBits,
      k.memLevel,
      k.strategy
    );
    if (P !== s)
      throw new Error(r[P]);
    if (k.header && n.deflateSetHeader(this.strm, k.header), k.dictionary) {
      var D;
      if (typeof k.dictionary == "string" ? D = t.string2buf(k.dictionary) : a.call(k.dictionary) === "[object ArrayBuffer]" ? D = new Uint8Array(k.dictionary) : D = k.dictionary, P = n.deflateSetDictionary(this.strm, D), P !== s)
        throw new Error(r[P]);
      this._dict_set = !0;
    }
  }
  A.prototype.push = function(x, k) {
    var P = this.strm, D = this.options.chunkSize, F, I;
    if (this.ended)
      return !1;
    I = k === ~~k ? k : k === !0 ? c : o, typeof x == "string" ? P.input = t.string2buf(x) : a.call(x) === "[object ArrayBuffer]" ? P.input = new Uint8Array(x) : P.input = x, P.next_in = 0, P.avail_in = P.input.length;
    do {
      if (P.avail_out === 0 && (P.output = new e.Buf8(D), P.next_out = 0, P.avail_out = D), F = n.deflate(P, I), F !== h && F !== s)
        return this.onEnd(F), this.ended = !0, !1;
      (P.avail_out === 0 || P.avail_in === 0 && (I === c || I === l)) && (this.options.to === "string" ? this.onData(t.buf2binstring(e.shrinkBuf(P.output, P.next_out))) : this.onData(e.shrinkBuf(P.output, P.next_out)));
    } while ((P.avail_in > 0 || P.avail_out === 0) && F !== h);
    return I === c ? (F = n.deflateEnd(this.strm), this.onEnd(F), this.ended = !0, F === s) : (I === l && (this.onEnd(s), P.avail_out = 0), !0);
  }, A.prototype.onData = function(x) {
    this.chunks.push(x);
  }, A.prototype.onEnd = function(x) {
    x === s && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = x, this.msg = this.strm.msg;
  };
  function S(x, k) {
    var P = new A(k);
    if (P.push(x, !0), P.err)
      throw P.msg || r[P.err];
    return P.result;
  }
  function v(x, k) {
    return k = k || {}, k.raw = !0, S(x, k);
  }
  function R(x, k) {
    return k = k || {}, k.gzip = !0, S(x, k);
  }
  return Wt.Deflate = A, Wt.deflate = S, Wt.deflateRaw = v, Wt.gzip = R, Wt;
}
var Zt = {}, ot = {}, wi, Io;
function il() {
  if (Io) return wi;
  Io = 1;
  var n = 30, e = 12;
  return wi = function(r, i) {
    var a, o, c, s, h, l, p, w, _, A, S, v, R, x, k, P, D, F, I, $, U, N, G, T, Z;
    a = r.state, o = r.next_in, T = r.input, c = o + (r.avail_in - 5), s = r.next_out, Z = r.output, h = s - (i - r.avail_out), l = s + (r.avail_out - 257), p = a.dmax, w = a.wsize, _ = a.whave, A = a.wnext, S = a.window, v = a.hold, R = a.bits, x = a.lencode, k = a.distcode, P = (1 << a.lenbits) - 1, D = (1 << a.distbits) - 1;
    e:
      do {
        R < 15 && (v += T[o++] << R, R += 8, v += T[o++] << R, R += 8), F = x[v & P];
        t:
          for (; ; ) {
            if (I = F >>> 24, v >>>= I, R -= I, I = F >>> 16 & 255, I === 0)
              Z[s++] = F & 65535;
            else if (I & 16) {
              $ = F & 65535, I &= 15, I && (R < I && (v += T[o++] << R, R += 8), $ += v & (1 << I) - 1, v >>>= I, R -= I), R < 15 && (v += T[o++] << R, R += 8, v += T[o++] << R, R += 8), F = k[v & D];
              r:
                for (; ; ) {
                  if (I = F >>> 24, v >>>= I, R -= I, I = F >>> 16 & 255, I & 16) {
                    if (U = F & 65535, I &= 15, R < I && (v += T[o++] << R, R += 8, R < I && (v += T[o++] << R, R += 8)), U += v & (1 << I) - 1, U > p) {
                      r.msg = "invalid distance too far back", a.mode = n;
                      break e;
                    }
                    if (v >>>= I, R -= I, I = s - h, U > I) {
                      if (I = U - I, I > _ && a.sane) {
                        r.msg = "invalid distance too far back", a.mode = n;
                        break e;
                      }
                      if (N = 0, G = S, A === 0) {
                        if (N += w - I, I < $) {
                          $ -= I;
                          do
                            Z[s++] = S[N++];
                          while (--I);
                          N = s - U, G = Z;
                        }
                      } else if (A < I) {
                        if (N += w + A - I, I -= A, I < $) {
                          $ -= I;
                          do
                            Z[s++] = S[N++];
                          while (--I);
                          if (N = 0, A < $) {
                            I = A, $ -= I;
                            do
                              Z[s++] = S[N++];
                            while (--I);
                            N = s - U, G = Z;
                          }
                        }
                      } else if (N += A - I, I < $) {
                        $ -= I;
                        do
                          Z[s++] = S[N++];
                        while (--I);
                        N = s - U, G = Z;
                      }
                      for (; $ > 2; )
                        Z[s++] = G[N++], Z[s++] = G[N++], Z[s++] = G[N++], $ -= 3;
                      $ && (Z[s++] = G[N++], $ > 1 && (Z[s++] = G[N++]));
                    } else {
                      N = s - U;
                      do
                        Z[s++] = Z[N++], Z[s++] = Z[N++], Z[s++] = Z[N++], $ -= 3;
                      while ($ > 2);
                      $ && (Z[s++] = Z[N++], $ > 1 && (Z[s++] = Z[N++]));
                    }
                  } else if ((I & 64) === 0) {
                    F = k[(F & 65535) + (v & (1 << I) - 1)];
                    continue r;
                  } else {
                    r.msg = "invalid distance code", a.mode = n;
                    break e;
                  }
                  break;
                }
            } else if ((I & 64) === 0) {
              F = x[(F & 65535) + (v & (1 << I) - 1)];
              continue t;
            } else if (I & 32) {
              a.mode = e;
              break e;
            } else {
              r.msg = "invalid literal/length code", a.mode = n;
              break e;
            }
            break;
          }
      } while (o < c && s < l);
    $ = R >> 3, o -= $, R -= $ << 3, v &= (1 << R) - 1, r.next_in = o, r.next_out = s, r.avail_in = o < c ? 5 + (c - o) : 5 - (o - c), r.avail_out = s < l ? 257 + (l - s) : 257 - (s - l), a.hold = v, a.bits = R;
  }, wi;
}
var mi, Ro;
function al() {
  if (Ro) return mi;
  Ro = 1;
  var n = Ot(), e = 15, t = 852, r = 592, i = 0, a = 1, o = 2, c = [
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
  ], s = [
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
  ], h = [
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
  ], l = [
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
  return mi = function(w, _, A, S, v, R, x, k) {
    var P = k.bits, D = 0, F = 0, I = 0, $ = 0, U = 0, N = 0, G = 0, T = 0, Z = 0, Q = 0, se, V, q, K, ne, we = null, ge = 0, ce, _e = new n.Buf16(e + 1), ke = new n.Buf16(e + 1), Ce = null, me = 0, de, Se, Te;
    for (D = 0; D <= e; D++)
      _e[D] = 0;
    for (F = 0; F < S; F++)
      _e[_[A + F]]++;
    for (U = P, $ = e; $ >= 1 && _e[$] === 0; $--)
      ;
    if (U > $ && (U = $), $ === 0)
      return v[R++] = 1 << 24 | 64 << 16 | 0, v[R++] = 1 << 24 | 64 << 16 | 0, k.bits = 1, 0;
    for (I = 1; I < $ && _e[I] === 0; I++)
      ;
    for (U < I && (U = I), T = 1, D = 1; D <= e; D++)
      if (T <<= 1, T -= _e[D], T < 0)
        return -1;
    if (T > 0 && (w === i || $ !== 1))
      return -1;
    for (ke[1] = 0, D = 1; D < e; D++)
      ke[D + 1] = ke[D] + _e[D];
    for (F = 0; F < S; F++)
      _[A + F] !== 0 && (x[ke[_[A + F]]++] = F);
    if (w === i ? (we = Ce = x, ce = 19) : w === a ? (we = c, ge -= 257, Ce = s, me -= 257, ce = 256) : (we = h, Ce = l, ce = -1), Q = 0, F = 0, D = I, ne = R, N = U, G = 0, q = -1, Z = 1 << U, K = Z - 1, w === a && Z > t || w === o && Z > r)
      return 1;
    for (; ; ) {
      de = D - G, x[F] < ce ? (Se = 0, Te = x[F]) : x[F] > ce ? (Se = Ce[me + x[F]], Te = we[ge + x[F]]) : (Se = 96, Te = 0), se = 1 << D - G, V = 1 << N, I = V;
      do
        V -= se, v[ne + (Q >> G) + V] = de << 24 | Se << 16 | Te | 0;
      while (V !== 0);
      for (se = 1 << D - 1; Q & se; )
        se >>= 1;
      if (se !== 0 ? (Q &= se - 1, Q += se) : Q = 0, F++, --_e[D] === 0) {
        if (D === $)
          break;
        D = _[A + x[F]];
      }
      if (D > U && (Q & K) !== q) {
        for (G === 0 && (G = U), ne += I, N = D - G, T = 1 << N; N + G < $ && (T -= _e[N + G], !(T <= 0)); )
          N++, T <<= 1;
        if (Z += 1 << N, w === a && Z > t || w === o && Z > r)
          return 1;
        q = Q & K, v[q] = U << 24 | N << 16 | ne - R | 0;
      }
    }
    return Q !== 0 && (v[ne + Q] = D - G << 24 | 64 << 16 | 0), k.bits = U, 0;
  }, mi;
}
var To;
function ol() {
  if (To) return ot;
  To = 1;
  var n = Ot(), e = Ss(), t = xs(), r = il(), i = al(), a = 0, o = 1, c = 2, s = 4, h = 5, l = 6, p = 0, w = 1, _ = 2, A = -2, S = -3, v = -4, R = -5, x = 8, k = 1, P = 2, D = 3, F = 4, I = 5, $ = 6, U = 7, N = 8, G = 9, T = 10, Z = 11, Q = 12, se = 13, V = 14, q = 15, K = 16, ne = 17, we = 18, ge = 19, ce = 20, _e = 21, ke = 22, Ce = 23, me = 24, de = 25, Se = 26, Te = 27, ve = 28, xe = 29, ee = 30, fe = 31, Be = 32, Oe = 852, Re = 592, Ae = 15, pe = Ae;
  function We(C) {
    return (C >>> 24 & 255) + (C >>> 8 & 65280) + ((C & 65280) << 8) + ((C & 255) << 24);
  }
  function et() {
    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new n.Buf16(320), this.work = new n.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  function He(C) {
    var W;
    return !C || !C.state ? A : (W = C.state, C.total_in = C.total_out = W.total = 0, C.msg = "", W.wrap && (C.adler = W.wrap & 1), W.mode = k, W.last = 0, W.havedict = 0, W.dmax = 32768, W.head = null, W.hold = 0, W.bits = 0, W.lencode = W.lendyn = new n.Buf32(Oe), W.distcode = W.distdyn = new n.Buf32(Re), W.sane = 1, W.back = -1, p);
  }
  function Ie(C) {
    var W;
    return !C || !C.state ? A : (W = C.state, W.wsize = 0, W.whave = 0, W.wnext = 0, He(C));
  }
  function Me(C, W) {
    var y, X;
    return !C || !C.state || (X = C.state, W < 0 ? (y = 0, W = -W) : (y = (W >> 4) + 1, W < 48 && (W &= 15)), W && (W < 8 || W > 15)) ? A : (X.window !== null && X.wbits !== W && (X.window = null), X.wrap = y, X.wbits = W, Ie(C));
  }
  function Je(C, W) {
    var y, X;
    return C ? (X = new et(), C.state = X, X.window = null, y = Me(C, W), y !== p && (C.state = null), y) : A;
  }
  function tt(C) {
    return Je(C, pe);
  }
  var kt = !0, lt, Ze;
  function Xe(C) {
    if (kt) {
      var W;
      for (lt = new n.Buf32(512), Ze = new n.Buf32(32), W = 0; W < 144; )
        C.lens[W++] = 8;
      for (; W < 256; )
        C.lens[W++] = 9;
      for (; W < 280; )
        C.lens[W++] = 7;
      for (; W < 288; )
        C.lens[W++] = 8;
      for (i(o, C.lens, 0, 288, lt, 0, C.work, { bits: 9 }), W = 0; W < 32; )
        C.lens[W++] = 5;
      i(c, C.lens, 0, 32, Ze, 0, C.work, { bits: 5 }), kt = !1;
    }
    C.lencode = lt, C.lenbits = 9, C.distcode = Ze, C.distbits = 5;
  }
  function wt(C, W, y, X) {
    var ue, f = C.state;
    return f.window === null && (f.wsize = 1 << f.wbits, f.wnext = 0, f.whave = 0, f.window = new n.Buf8(f.wsize)), X >= f.wsize ? (n.arraySet(f.window, W, y - f.wsize, f.wsize, 0), f.wnext = 0, f.whave = f.wsize) : (ue = f.wsize - f.wnext, ue > X && (ue = X), n.arraySet(f.window, W, y - X, ue, f.wnext), X -= ue, X ? (n.arraySet(f.window, W, y - X, X, 0), f.wnext = X, f.whave = f.wsize) : (f.wnext += ue, f.wnext === f.wsize && (f.wnext = 0), f.whave < f.wsize && (f.whave += ue))), 0;
  }
  function b(C, W) {
    var y, X, ue, f, L, z, g, O, j, ie, re, m, u, d, E = 0, B, M, H, le, De, Pe, ye, be, Ye = new n.Buf8(4), St, mt, fa = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!C || !C.state || !C.output || !C.input && C.avail_in !== 0)
      return A;
    y = C.state, y.mode === Q && (y.mode = se), L = C.next_out, ue = C.output, g = C.avail_out, f = C.next_in, X = C.input, z = C.avail_in, O = y.hold, j = y.bits, ie = z, re = g, be = p;
    e:
      for (; ; )
        switch (y.mode) {
          case k:
            if (y.wrap === 0) {
              y.mode = se;
              break;
            }
            for (; j < 16; ) {
              if (z === 0)
                break e;
              z--, O += X[f++] << j, j += 8;
            }
            if (y.wrap & 2 && O === 35615) {
              y.check = 0, Ye[0] = O & 255, Ye[1] = O >>> 8 & 255, y.check = t(y.check, Ye, 2, 0), O = 0, j = 0, y.mode = P;
              break;
            }
            if (y.flags = 0, y.head && (y.head.done = !1), !(y.wrap & 1) || /* check if zlib header allowed */
            (((O & 255) << 8) + (O >> 8)) % 31) {
              C.msg = "incorrect header check", y.mode = ee;
              break;
            }
            if ((O & 15) !== x) {
              C.msg = "unknown compression method", y.mode = ee;
              break;
            }
            if (O >>>= 4, j -= 4, ye = (O & 15) + 8, y.wbits === 0)
              y.wbits = ye;
            else if (ye > y.wbits) {
              C.msg = "invalid window size", y.mode = ee;
              break;
            }
            y.dmax = 1 << ye, C.adler = y.check = 1, y.mode = O & 512 ? T : Q, O = 0, j = 0;
            break;
          case P:
            for (; j < 16; ) {
              if (z === 0)
                break e;
              z--, O += X[f++] << j, j += 8;
            }
            if (y.flags = O, (y.flags & 255) !== x) {
              C.msg = "unknown compression method", y.mode = ee;
              break;
            }
            if (y.flags & 57344) {
              C.msg = "unknown header flags set", y.mode = ee;
              break;
            }
            y.head && (y.head.text = O >> 8 & 1), y.flags & 512 && (Ye[0] = O & 255, Ye[1] = O >>> 8 & 255, y.check = t(y.check, Ye, 2, 0)), O = 0, j = 0, y.mode = D;
          /* falls through */
          case D:
            for (; j < 32; ) {
              if (z === 0)
                break e;
              z--, O += X[f++] << j, j += 8;
            }
            y.head && (y.head.time = O), y.flags & 512 && (Ye[0] = O & 255, Ye[1] = O >>> 8 & 255, Ye[2] = O >>> 16 & 255, Ye[3] = O >>> 24 & 255, y.check = t(y.check, Ye, 4, 0)), O = 0, j = 0, y.mode = F;
          /* falls through */
          case F:
            for (; j < 16; ) {
              if (z === 0)
                break e;
              z--, O += X[f++] << j, j += 8;
            }
            y.head && (y.head.xflags = O & 255, y.head.os = O >> 8), y.flags & 512 && (Ye[0] = O & 255, Ye[1] = O >>> 8 & 255, y.check = t(y.check, Ye, 2, 0)), O = 0, j = 0, y.mode = I;
          /* falls through */
          case I:
            if (y.flags & 1024) {
              for (; j < 16; ) {
                if (z === 0)
                  break e;
                z--, O += X[f++] << j, j += 8;
              }
              y.length = O, y.head && (y.head.extra_len = O), y.flags & 512 && (Ye[0] = O & 255, Ye[1] = O >>> 8 & 255, y.check = t(y.check, Ye, 2, 0)), O = 0, j = 0;
            } else y.head && (y.head.extra = null);
            y.mode = $;
          /* falls through */
          case $:
            if (y.flags & 1024 && (m = y.length, m > z && (m = z), m && (y.head && (ye = y.head.extra_len - y.length, y.head.extra || (y.head.extra = new Array(y.head.extra_len)), n.arraySet(
              y.head.extra,
              X,
              f,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              m,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              ye
            )), y.flags & 512 && (y.check = t(y.check, X, m, f)), z -= m, f += m, y.length -= m), y.length))
              break e;
            y.length = 0, y.mode = U;
          /* falls through */
          case U:
            if (y.flags & 2048) {
              if (z === 0)
                break e;
              m = 0;
              do
                ye = X[f + m++], y.head && ye && y.length < 65536 && (y.head.name += String.fromCharCode(ye));
              while (ye && m < z);
              if (y.flags & 512 && (y.check = t(y.check, X, m, f)), z -= m, f += m, ye)
                break e;
            } else y.head && (y.head.name = null);
            y.length = 0, y.mode = N;
          /* falls through */
          case N:
            if (y.flags & 4096) {
              if (z === 0)
                break e;
              m = 0;
              do
                ye = X[f + m++], y.head && ye && y.length < 65536 && (y.head.comment += String.fromCharCode(ye));
              while (ye && m < z);
              if (y.flags & 512 && (y.check = t(y.check, X, m, f)), z -= m, f += m, ye)
                break e;
            } else y.head && (y.head.comment = null);
            y.mode = G;
          /* falls through */
          case G:
            if (y.flags & 512) {
              for (; j < 16; ) {
                if (z === 0)
                  break e;
                z--, O += X[f++] << j, j += 8;
              }
              if (O !== (y.check & 65535)) {
                C.msg = "header crc mismatch", y.mode = ee;
                break;
              }
              O = 0, j = 0;
            }
            y.head && (y.head.hcrc = y.flags >> 9 & 1, y.head.done = !0), C.adler = y.check = 0, y.mode = Q;
            break;
          case T:
            for (; j < 32; ) {
              if (z === 0)
                break e;
              z--, O += X[f++] << j, j += 8;
            }
            C.adler = y.check = We(O), O = 0, j = 0, y.mode = Z;
          /* falls through */
          case Z:
            if (y.havedict === 0)
              return C.next_out = L, C.avail_out = g, C.next_in = f, C.avail_in = z, y.hold = O, y.bits = j, _;
            C.adler = y.check = 1, y.mode = Q;
          /* falls through */
          case Q:
            if (W === h || W === l)
              break e;
          /* falls through */
          case se:
            if (y.last) {
              O >>>= j & 7, j -= j & 7, y.mode = Te;
              break;
            }
            for (; j < 3; ) {
              if (z === 0)
                break e;
              z--, O += X[f++] << j, j += 8;
            }
            switch (y.last = O & 1, O >>>= 1, j -= 1, O & 3) {
              case 0:
                y.mode = V;
                break;
              case 1:
                if (Xe(y), y.mode = ce, W === l) {
                  O >>>= 2, j -= 2;
                  break e;
                }
                break;
              case 2:
                y.mode = ne;
                break;
              case 3:
                C.msg = "invalid block type", y.mode = ee;
            }
            O >>>= 2, j -= 2;
            break;
          case V:
            for (O >>>= j & 7, j -= j & 7; j < 32; ) {
              if (z === 0)
                break e;
              z--, O += X[f++] << j, j += 8;
            }
            if ((O & 65535) !== (O >>> 16 ^ 65535)) {
              C.msg = "invalid stored block lengths", y.mode = ee;
              break;
            }
            if (y.length = O & 65535, O = 0, j = 0, y.mode = q, W === l)
              break e;
          /* falls through */
          case q:
            y.mode = K;
          /* falls through */
          case K:
            if (m = y.length, m) {
              if (m > z && (m = z), m > g && (m = g), m === 0)
                break e;
              n.arraySet(ue, X, f, m, L), z -= m, f += m, g -= m, L += m, y.length -= m;
              break;
            }
            y.mode = Q;
            break;
          case ne:
            for (; j < 14; ) {
              if (z === 0)
                break e;
              z--, O += X[f++] << j, j += 8;
            }
            if (y.nlen = (O & 31) + 257, O >>>= 5, j -= 5, y.ndist = (O & 31) + 1, O >>>= 5, j -= 5, y.ncode = (O & 15) + 4, O >>>= 4, j -= 4, y.nlen > 286 || y.ndist > 30) {
              C.msg = "too many length or distance symbols", y.mode = ee;
              break;
            }
            y.have = 0, y.mode = we;
          /* falls through */
          case we:
            for (; y.have < y.ncode; ) {
              for (; j < 3; ) {
                if (z === 0)
                  break e;
                z--, O += X[f++] << j, j += 8;
              }
              y.lens[fa[y.have++]] = O & 7, O >>>= 3, j -= 3;
            }
            for (; y.have < 19; )
              y.lens[fa[y.have++]] = 0;
            if (y.lencode = y.lendyn, y.lenbits = 7, St = { bits: y.lenbits }, be = i(a, y.lens, 0, 19, y.lencode, 0, y.work, St), y.lenbits = St.bits, be) {
              C.msg = "invalid code lengths set", y.mode = ee;
              break;
            }
            y.have = 0, y.mode = ge;
          /* falls through */
          case ge:
            for (; y.have < y.nlen + y.ndist; ) {
              for (; E = y.lencode[O & (1 << y.lenbits) - 1], B = E >>> 24, M = E >>> 16 & 255, H = E & 65535, !(B <= j); ) {
                if (z === 0)
                  break e;
                z--, O += X[f++] << j, j += 8;
              }
              if (H < 16)
                O >>>= B, j -= B, y.lens[y.have++] = H;
              else {
                if (H === 16) {
                  for (mt = B + 2; j < mt; ) {
                    if (z === 0)
                      break e;
                    z--, O += X[f++] << j, j += 8;
                  }
                  if (O >>>= B, j -= B, y.have === 0) {
                    C.msg = "invalid bit length repeat", y.mode = ee;
                    break;
                  }
                  ye = y.lens[y.have - 1], m = 3 + (O & 3), O >>>= 2, j -= 2;
                } else if (H === 17) {
                  for (mt = B + 3; j < mt; ) {
                    if (z === 0)
                      break e;
                    z--, O += X[f++] << j, j += 8;
                  }
                  O >>>= B, j -= B, ye = 0, m = 3 + (O & 7), O >>>= 3, j -= 3;
                } else {
                  for (mt = B + 7; j < mt; ) {
                    if (z === 0)
                      break e;
                    z--, O += X[f++] << j, j += 8;
                  }
                  O >>>= B, j -= B, ye = 0, m = 11 + (O & 127), O >>>= 7, j -= 7;
                }
                if (y.have + m > y.nlen + y.ndist) {
                  C.msg = "invalid bit length repeat", y.mode = ee;
                  break;
                }
                for (; m--; )
                  y.lens[y.have++] = ye;
              }
            }
            if (y.mode === ee)
              break;
            if (y.lens[256] === 0) {
              C.msg = "invalid code -- missing end-of-block", y.mode = ee;
              break;
            }
            if (y.lenbits = 9, St = { bits: y.lenbits }, be = i(o, y.lens, 0, y.nlen, y.lencode, 0, y.work, St), y.lenbits = St.bits, be) {
              C.msg = "invalid literal/lengths set", y.mode = ee;
              break;
            }
            if (y.distbits = 6, y.distcode = y.distdyn, St = { bits: y.distbits }, be = i(c, y.lens, y.nlen, y.ndist, y.distcode, 0, y.work, St), y.distbits = St.bits, be) {
              C.msg = "invalid distances set", y.mode = ee;
              break;
            }
            if (y.mode = ce, W === l)
              break e;
          /* falls through */
          case ce:
            y.mode = _e;
          /* falls through */
          case _e:
            if (z >= 6 && g >= 258) {
              C.next_out = L, C.avail_out = g, C.next_in = f, C.avail_in = z, y.hold = O, y.bits = j, r(C, re), L = C.next_out, ue = C.output, g = C.avail_out, f = C.next_in, X = C.input, z = C.avail_in, O = y.hold, j = y.bits, y.mode === Q && (y.back = -1);
              break;
            }
            for (y.back = 0; E = y.lencode[O & (1 << y.lenbits) - 1], B = E >>> 24, M = E >>> 16 & 255, H = E & 65535, !(B <= j); ) {
              if (z === 0)
                break e;
              z--, O += X[f++] << j, j += 8;
            }
            if (M && (M & 240) === 0) {
              for (le = B, De = M, Pe = H; E = y.lencode[Pe + ((O & (1 << le + De) - 1) >> le)], B = E >>> 24, M = E >>> 16 & 255, H = E & 65535, !(le + B <= j); ) {
                if (z === 0)
                  break e;
                z--, O += X[f++] << j, j += 8;
              }
              O >>>= le, j -= le, y.back += le;
            }
            if (O >>>= B, j -= B, y.back += B, y.length = H, M === 0) {
              y.mode = Se;
              break;
            }
            if (M & 32) {
              y.back = -1, y.mode = Q;
              break;
            }
            if (M & 64) {
              C.msg = "invalid literal/length code", y.mode = ee;
              break;
            }
            y.extra = M & 15, y.mode = ke;
          /* falls through */
          case ke:
            if (y.extra) {
              for (mt = y.extra; j < mt; ) {
                if (z === 0)
                  break e;
                z--, O += X[f++] << j, j += 8;
              }
              y.length += O & (1 << y.extra) - 1, O >>>= y.extra, j -= y.extra, y.back += y.extra;
            }
            y.was = y.length, y.mode = Ce;
          /* falls through */
          case Ce:
            for (; E = y.distcode[O & (1 << y.distbits) - 1], B = E >>> 24, M = E >>> 16 & 255, H = E & 65535, !(B <= j); ) {
              if (z === 0)
                break e;
              z--, O += X[f++] << j, j += 8;
            }
            if ((M & 240) === 0) {
              for (le = B, De = M, Pe = H; E = y.distcode[Pe + ((O & (1 << le + De) - 1) >> le)], B = E >>> 24, M = E >>> 16 & 255, H = E & 65535, !(le + B <= j); ) {
                if (z === 0)
                  break e;
                z--, O += X[f++] << j, j += 8;
              }
              O >>>= le, j -= le, y.back += le;
            }
            if (O >>>= B, j -= B, y.back += B, M & 64) {
              C.msg = "invalid distance code", y.mode = ee;
              break;
            }
            y.offset = H, y.extra = M & 15, y.mode = me;
          /* falls through */
          case me:
            if (y.extra) {
              for (mt = y.extra; j < mt; ) {
                if (z === 0)
                  break e;
                z--, O += X[f++] << j, j += 8;
              }
              y.offset += O & (1 << y.extra) - 1, O >>>= y.extra, j -= y.extra, y.back += y.extra;
            }
            if (y.offset > y.dmax) {
              C.msg = "invalid distance too far back", y.mode = ee;
              break;
            }
            y.mode = de;
          /* falls through */
          case de:
            if (g === 0)
              break e;
            if (m = re - g, y.offset > m) {
              if (m = y.offset - m, m > y.whave && y.sane) {
                C.msg = "invalid distance too far back", y.mode = ee;
                break;
              }
              m > y.wnext ? (m -= y.wnext, u = y.wsize - m) : u = y.wnext - m, m > y.length && (m = y.length), d = y.window;
            } else
              d = ue, u = L - y.offset, m = y.length;
            m > g && (m = g), g -= m, y.length -= m;
            do
              ue[L++] = d[u++];
            while (--m);
            y.length === 0 && (y.mode = _e);
            break;
          case Se:
            if (g === 0)
              break e;
            ue[L++] = y.length, g--, y.mode = _e;
            break;
          case Te:
            if (y.wrap) {
              for (; j < 32; ) {
                if (z === 0)
                  break e;
                z--, O |= X[f++] << j, j += 8;
              }
              if (re -= g, C.total_out += re, y.total += re, re && (C.adler = y.check = /*UPDATE(state.check, put - _out, _out);*/
              y.flags ? t(y.check, ue, re, L - re) : e(y.check, ue, re, L - re)), re = g, (y.flags ? O : We(O)) !== y.check) {
                C.msg = "incorrect data check", y.mode = ee;
                break;
              }
              O = 0, j = 0;
            }
            y.mode = ve;
          /* falls through */
          case ve:
            if (y.wrap && y.flags) {
              for (; j < 32; ) {
                if (z === 0)
                  break e;
                z--, O += X[f++] << j, j += 8;
              }
              if (O !== (y.total & 4294967295)) {
                C.msg = "incorrect length check", y.mode = ee;
                break;
              }
              O = 0, j = 0;
            }
            y.mode = xe;
          /* falls through */
          case xe:
            be = w;
            break e;
          case ee:
            be = S;
            break e;
          case fe:
            return v;
          case Be:
          /* falls through */
          default:
            return A;
        }
    return C.next_out = L, C.avail_out = g, C.next_in = f, C.avail_in = z, y.hold = O, y.bits = j, (y.wsize || re !== C.avail_out && y.mode < ee && (y.mode < Te || W !== s)) && wt(C, C.output, C.next_out, re - C.avail_out), ie -= C.avail_in, re -= C.avail_out, C.total_in += ie, C.total_out += re, y.total += re, y.wrap && re && (C.adler = y.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    y.flags ? t(y.check, ue, re, C.next_out - re) : e(y.check, ue, re, C.next_out - re)), C.data_type = y.bits + (y.last ? 64 : 0) + (y.mode === Q ? 128 : 0) + (y.mode === ce || y.mode === q ? 256 : 0), (ie === 0 && re === 0 || W === s) && be === p && (be = R), be;
  }
  function Y(C) {
    if (!C || !C.state)
      return A;
    var W = C.state;
    return W.window && (W.window = null), C.state = null, p;
  }
  function J(C, W) {
    var y;
    return !C || !C.state || (y = C.state, (y.wrap & 2) === 0) ? A : (y.head = W, W.done = !1, p);
  }
  function te(C, W) {
    var y = W.length, X, ue, f;
    return !C || !C.state || (X = C.state, X.wrap !== 0 && X.mode !== Z) ? A : X.mode === Z && (ue = 1, ue = e(ue, W, y, 0), ue !== X.check) ? S : (f = wt(C, W, y, y), f ? (X.mode = fe, v) : (X.havedict = 1, p));
  }
  return ot.inflateReset = Ie, ot.inflateReset2 = Me, ot.inflateResetKeep = He, ot.inflateInit = tt, ot.inflateInit2 = Je, ot.inflate = b, ot.inflateEnd = Y, ot.inflateGetHeader = J, ot.inflateSetDictionary = te, ot.inflateInfo = "pako inflate (from Nodeca project)", ot;
}
var yi, $o;
function Rs() {
  return $o || ($o = 1, yi = {
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
  }), yi;
}
var gi, Bo;
function sl() {
  if (Bo) return gi;
  Bo = 1;
  function n() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
  }
  return gi = n, gi;
}
var Oo;
function cl() {
  if (Oo) return Zt;
  Oo = 1;
  var n = ol(), e = Ot(), t = As(), r = Rs(), i = ta(), a = Is(), o = sl(), c = Object.prototype.toString;
  function s(p) {
    if (!(this instanceof s)) return new s(p);
    this.options = e.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, p || {});
    var w = this.options;
    w.raw && w.windowBits >= 0 && w.windowBits < 16 && (w.windowBits = -w.windowBits, w.windowBits === 0 && (w.windowBits = -15)), w.windowBits >= 0 && w.windowBits < 16 && !(p && p.windowBits) && (w.windowBits += 32), w.windowBits > 15 && w.windowBits < 48 && (w.windowBits & 15) === 0 && (w.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new a(), this.strm.avail_out = 0;
    var _ = n.inflateInit2(
      this.strm,
      w.windowBits
    );
    if (_ !== r.Z_OK)
      throw new Error(i[_]);
    if (this.header = new o(), n.inflateGetHeader(this.strm, this.header), w.dictionary && (typeof w.dictionary == "string" ? w.dictionary = t.string2buf(w.dictionary) : c.call(w.dictionary) === "[object ArrayBuffer]" && (w.dictionary = new Uint8Array(w.dictionary)), w.raw && (_ = n.inflateSetDictionary(this.strm, w.dictionary), _ !== r.Z_OK)))
      throw new Error(i[_]);
  }
  s.prototype.push = function(p, w) {
    var _ = this.strm, A = this.options.chunkSize, S = this.options.dictionary, v, R, x, k, P, D = !1;
    if (this.ended)
      return !1;
    R = w === ~~w ? w : w === !0 ? r.Z_FINISH : r.Z_NO_FLUSH, typeof p == "string" ? _.input = t.binstring2buf(p) : c.call(p) === "[object ArrayBuffer]" ? _.input = new Uint8Array(p) : _.input = p, _.next_in = 0, _.avail_in = _.input.length;
    do {
      if (_.avail_out === 0 && (_.output = new e.Buf8(A), _.next_out = 0, _.avail_out = A), v = n.inflate(_, r.Z_NO_FLUSH), v === r.Z_NEED_DICT && S && (v = n.inflateSetDictionary(this.strm, S)), v === r.Z_BUF_ERROR && D === !0 && (v = r.Z_OK, D = !1), v !== r.Z_STREAM_END && v !== r.Z_OK)
        return this.onEnd(v), this.ended = !0, !1;
      _.next_out && (_.avail_out === 0 || v === r.Z_STREAM_END || _.avail_in === 0 && (R === r.Z_FINISH || R === r.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (x = t.utf8border(_.output, _.next_out), k = _.next_out - x, P = t.buf2string(_.output, x), _.next_out = k, _.avail_out = A - k, k && e.arraySet(_.output, _.output, x, k, 0), this.onData(P)) : this.onData(e.shrinkBuf(_.output, _.next_out))), _.avail_in === 0 && _.avail_out === 0 && (D = !0);
    } while ((_.avail_in > 0 || _.avail_out === 0) && v !== r.Z_STREAM_END);
    return v === r.Z_STREAM_END && (R = r.Z_FINISH), R === r.Z_FINISH ? (v = n.inflateEnd(this.strm), this.onEnd(v), this.ended = !0, v === r.Z_OK) : (R === r.Z_SYNC_FLUSH && (this.onEnd(r.Z_OK), _.avail_out = 0), !0);
  }, s.prototype.onData = function(p) {
    this.chunks.push(p);
  }, s.prototype.onEnd = function(p) {
    p === r.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = p, this.msg = this.strm.msg;
  };
  function h(p, w) {
    var _ = new s(w);
    if (_.push(p, !0), _.err)
      throw _.msg || i[_.err];
    return _.result;
  }
  function l(p, w) {
    return w = w || {}, w.raw = !0, h(p, w);
  }
  return Zt.Inflate = s, Zt.inflate = h, Zt.inflateRaw = l, Zt.ungzip = h, Zt;
}
var _i, Po;
function ll() {
  if (Po) return _i;
  Po = 1;
  var n = Ot().assign, e = nl(), t = cl(), r = Rs(), i = {};
  return n(i, e, t, r), _i = i, _i;
}
var ul = ll();
const ra = /* @__PURE__ */ Ht(ul);
var vi, Co;
function fl() {
  if (Co) return vi;
  Co = 1;
  const n = (e, t) => function(...r) {
    const i = t.promiseModule;
    return new i((a, o) => {
      t.multiArgs ? r.push((...c) => {
        t.errorFirst ? c[0] ? o(c) : (c.shift(), a(c)) : a(c);
      }) : t.errorFirst ? r.push((c, s) => {
        c ? o(c) : a(s);
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
    const i = (o) => {
      const c = (s) => typeof s == "string" ? o === s : s.test(o);
      return t.include ? t.include.some(c) : !t.exclude.some(c);
    };
    let a;
    r === "function" ? a = function(...o) {
      return t.excludeMain ? e(...o) : n(e, t).apply(this, o);
    } : a = Object.create(Object.getPrototypeOf(e));
    for (const o in e) {
      const c = e[o];
      a[o] = typeof c == "function" && i(o) ? n(c, t) : c;
    }
    return a;
  }, vi;
}
var hl = fl();
const bi = /* @__PURE__ */ Ht(hl);
var Ei, Fo;
function dl() {
  if (Fo) return Ei;
  Fo = 1;
  function n(V) {
    return Array.isArray(V) ? V : [V];
  }
  const e = "", t = " ", r = "\\", i = /^\s+$/, a = /(?:[^\\]|^)\\$/, o = /^\\!/, c = /^\\#/, s = /\r?\n/g, h = /^\.*\/|^\.+$/, l = "/";
  let p = "node-ignore";
  typeof Symbol < "u" && (p = Symbol.for("node-ignore"));
  const w = p, _ = (V, q, K) => Object.defineProperty(V, q, { value: K }), A = /([0-z])-([0-z])/g, S = () => !1, v = (V) => V.replace(
    A,
    (q, K, ne) => K.charCodeAt(0) <= ne.charCodeAt(0) ? q : e
  ), R = (V) => {
    const { length: q } = V;
    return V.slice(0, q - q % 2);
  }, x = [
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
      (V, q, K) => q + (K.indexOf("\\") === 0 ? t : e)
    ],
    // replace (\ ) with ' '
    // (\ ) -> ' '
    // (\\ ) -> '\\ '
    // (\\\ ) -> '\\ '
    [
      /(\\+?)\s/g,
      (V, q) => {
        const { length: K } = q;
        return q.slice(0, K - K % 2) + t;
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
      (V) => `\\${V}`
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
      (V, q, K) => q + 6 < K.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
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
      (V, q, K) => {
        const ne = K.replace(/\\\*/g, "[^\\/]*");
        return q + ne;
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
      (V, q, K, ne, we) => q === r ? `\\[${K}${R(ne)}${we}` : we === "]" && ne.length % 2 === 0 ? `[${v(K)}${ne}]` : "[]"
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
      (V) => /\/$/.test(V) ? `${V}$` : `${V}(?=$|\\/$)`
    ],
    // trailing wildcard
    [
      /(\^|\\\/)?\\\*$/,
      (V, q) => `${q ? `${q}[^/]+` : "[^/]*"}(?=$|\\/$)`
    ]
  ], k = /* @__PURE__ */ Object.create(null), P = (V, q) => {
    let K = k[V];
    return K || (K = x.reduce(
      (ne, [we, ge]) => ne.replace(we, ge.bind(V)),
      V
    ), k[V] = K), q ? new RegExp(K, "i") : new RegExp(K);
  }, D = (V) => typeof V == "string", F = (V) => V && D(V) && !i.test(V) && !a.test(V) && V.indexOf("#") !== 0, I = (V) => V.split(s);
  class $ {
    constructor(q, K, ne, we) {
      this.origin = q, this.pattern = K, this.negative = ne, this.regex = we;
    }
  }
  const U = (V, q) => {
    const K = V;
    let ne = !1;
    V.indexOf("!") === 0 && (ne = !0, V = V.substr(1)), V = V.replace(o, "!").replace(c, "#");
    const we = P(V, q);
    return new $(
      K,
      V,
      ne,
      we
    );
  }, N = (V, q) => {
    throw new q(V);
  }, G = (V, q, K) => D(V) ? V ? G.isNotRelative(V) ? K(
    `path should be a \`path.relative()\`d string, but got "${q}"`,
    RangeError
  ) : !0 : K("path must not be empty", TypeError) : K(
    `path must be a string, but got \`${q}\``,
    TypeError
  ), T = (V) => h.test(V);
  G.isNotRelative = T, G.convert = (V) => V;
  class Z {
    constructor({
      ignorecase: q = !0,
      ignoreCase: K = q,
      allowRelativePaths: ne = !1
    } = {}) {
      _(this, w, !0), this._rules = [], this._ignoreCase = K, this._allowRelativePaths = ne, this._initCache();
    }
    _initCache() {
      this._ignoreCache = /* @__PURE__ */ Object.create(null), this._testCache = /* @__PURE__ */ Object.create(null);
    }
    _addPattern(q) {
      if (q && q[w]) {
        this._rules = this._rules.concat(q._rules), this._added = !0;
        return;
      }
      if (F(q)) {
        const K = U(q, this._ignoreCase);
        this._added = !0, this._rules.push(K);
      }
    }
    // @param {Array<string> | string | Ignore} pattern
    add(q) {
      return this._added = !1, n(
        D(q) ? I(q) : q
      ).forEach(this._addPattern, this), this._added && this._initCache(), this;
    }
    // legacy
    addPattern(q) {
      return this.add(q);
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
    _testOne(q, K) {
      let ne = !1, we = !1;
      return this._rules.forEach((ge) => {
        const { negative: ce } = ge;
        if (we === ce && ne !== we || ce && !ne && !we && !K)
          return;
        ge.regex.test(q) && (ne = !ce, we = ce);
      }), {
        ignored: ne,
        unignored: we
      };
    }
    // @returns {TestResult}
    _test(q, K, ne, we) {
      const ge = q && G.convert(q);
      return G(
        ge,
        q,
        this._allowRelativePaths ? S : N
      ), this._t(ge, K, ne, we);
    }
    _t(q, K, ne, we) {
      if (q in K)
        return K[q];
      if (we || (we = q.split(l)), we.pop(), !we.length)
        return K[q] = this._testOne(q, ne);
      const ge = this._t(
        we.join(l) + l,
        K,
        ne,
        we
      );
      return K[q] = ge.ignored ? ge : this._testOne(q, ne);
    }
    ignores(q) {
      return this._test(q, this._ignoreCache, !1).ignored;
    }
    createFilter() {
      return (q) => !this.ignores(q);
    }
    filter(q) {
      return n(q).filter(this.createFilter());
    }
    // @returns {TestResult}
    test(q) {
      return this._test(q, this._testCache, !0);
    }
  }
  const Q = (V) => new Z(V), se = (V) => G(V && G.convert(V), V, S);
  if (Q.isPathValid = se, Q.default = Q, Ei = Q, // Detect `process` so that it can run in browsers.
  typeof rt < "u" && (rt.env && rt.env.IGNORE_TEST_WIN32 || rt.platform === "win32")) {
    const V = (K) => /^\\\\\?\\/.test(K) || /["<>|\u0000-\u001F]+/u.test(K) ? K : K.replace(/\\/g, "/");
    G.convert = V;
    const q = /^[a-z]:\//i;
    G.isNotRelative = (K) => q.test(K) || T(K);
  }
  return Ei;
}
dl();
var ki, Do;
function pl() {
  if (Do) return ki;
  Do = 1;
  function n(r) {
    return r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function e(r, i, a) {
    return i = i instanceof RegExp ? i : new RegExp(n(i), "g"), r.replace(i, a);
  }
  var t = {
    clean: function(i) {
      if (typeof i != "string")
        throw new Error("Expected a string, received: " + i);
      return i = e(i, "./", "/"), i = e(i, "..", "."), i = e(i, " ", "-"), i = e(i, /^[~^:?*\\\-]/g, ""), i = e(i, /[~^:?*\\]/g, "-"), i = e(i, /[~^:?*\\\-]$/g, ""), i = e(i, "@{", "-"), i = e(i, /\.$/g, ""), i = e(i, /\/$/g, ""), i = e(i, /\.lock$/g, ""), i;
    }
  };
  return ki = t, ki;
}
var wl = pl();
const No = /* @__PURE__ */ Ht(wl);
var Si, Mo;
function ml() {
  return Mo || (Mo = 1, Si = function(n, e) {
    var t = n, r = e, i = t.length, a = r.length, o = !1, c = null, s = i + 1, h = [], l = [], p = [], w = "", _ = -1, A = 0, S = 1, v, R, x = function() {
      i >= a && (v = t, R = i, t = r, r = v, i = a, a = R, o = !0, s = i + 1);
    }, k = function(I, $, U) {
      return {
        x: I,
        y: $,
        k: U
      };
    }, P = function(I, $) {
      return {
        elem: I,
        t: $
      };
    }, D = function(I, $, U) {
      var N, G, T;
      for ($ > U ? N = h[I - 1 + s] : N = h[I + 1 + s], T = Math.max($, U), G = T - I; G < i && T < a && t[G] === r[T]; )
        ++G, ++T;
      return h[I + s] = l.length, l[l.length] = new k(G, T, N), T;
    }, F = function(I) {
      var $, U, N;
      for ($ = U = 0, N = I.length - 1; N >= 0; --N)
        for (; $ < I[N].x || U < I[N].y; )
          I[N].y - I[N].x > U - $ ? (o ? p[p.length] = new P(r[U], _) : p[p.length] = new P(r[U], S), ++U) : I[N].y - I[N].x < U - $ ? (o ? p[p.length] = new P(t[$], S) : p[p.length] = new P(t[$], _), ++$) : (p[p.length] = new P(t[$], A), w += t[$], ++$, ++U);
    };
    return x(), {
      SES_DELETE: -1,
      SES_COMMON: 0,
      SES_ADD: 1,
      editdistance: function() {
        return c;
      },
      getlcs: function() {
        return w;
      },
      getses: function() {
        return p;
      },
      compose: function() {
        var I, $, U, N, G, T, Z, Q;
        for (I = a - i, $ = i + a + 3, U = {}, Z = 0; Z < $; ++Z)
          U[Z] = -1, h[Z] = -1;
        N = -1;
        do {
          for (++N, Q = -N; Q <= I - 1; ++Q)
            U[Q + s] = D(Q, U[Q - 1 + s] + 1, U[Q + 1 + s]);
          for (Q = I + N; Q >= I + 1; --Q)
            U[Q + s] = D(Q, U[Q - 1 + s] + 1, U[Q + 1 + s]);
          U[I + s] = D(I, U[I - 1 + s] + 1, U[I + 1 + s]);
        } while (U[I + s] !== a);
        for (c = I + 2 * N, G = h[I + s], T = []; G !== -1; )
          T[T.length] = new k(l[G].x, l[G].y, null), G = l[G].k;
        F(T);
      }
    };
  }), Si;
}
var xi, Uo;
function yl() {
  if (Uo) return xi;
  Uo = 1;
  var n = ml();
  function e(a, o) {
    var c = new n(a, o);
    c.compose();
    for (var s = c.getses(), h, l, p = a.length - 1, w = o.length - 1, _ = s.length - 1; _ >= 0; --_)
      s[_].t === c.SES_COMMON ? (l ? (l.chain = {
        file1index: p,
        file2index: w,
        chain: null
      }, l = l.chain) : (h = {
        file1index: p,
        file2index: w,
        chain: null
      }, l = h), p--, w--) : s[_].t === c.SES_DELETE ? p-- : s[_].t === c.SES_ADD && w--;
    var A = {
      file1index: -1,
      file2index: -1,
      chain: null
    };
    return l ? (l.chain = A, h) : A;
  }
  function t(a, o) {
    for (var c = [], s = a.length, h = o.length, l = e(a, o); l !== null; l = l.chain) {
      var p = s - l.file1index - 1, w = h - l.file2index - 1;
      s = l.file1index, h = l.file2index, (p || w) && c.push({
        file1: [s + 1, p],
        file2: [h + 1, w]
      });
    }
    return c.reverse(), c;
  }
  function r(a, o, c) {
    var s, h = t(o, a), l = t(o, c), p = [];
    function w(K, ne) {
      p.push([K.file1[0], ne, K.file1[1], K.file2[0], K.file2[1]]);
    }
    for (s = 0; s < h.length; s++)
      w(h[s], 0);
    for (s = 0; s < l.length; s++)
      w(l[s], 2);
    p.sort(function(K, ne) {
      return K[0] - ne[0];
    });
    var _ = [], A = 0;
    function S(K) {
      K > A && (_.push([1, A, K - A]), A = K);
    }
    for (var v = 0; v < p.length; v++) {
      for (var R = v, x = p[v], k = x[0], P = k + x[2]; v < p.length - 1; ) {
        var D = p[v + 1], F = D[0];
        if (F > P) break;
        P = Math.max(P, F + D[2]), v++;
      }
      if (S(k), R == v)
        x[4] > 0 && _.push([x[1], x[3], x[4]]);
      else {
        var I = {
          0: [a.length, -1, o.length, -1],
          2: [c.length, -1, o.length, -1]
        };
        for (s = R; s <= v; s++) {
          x = p[s];
          var $ = x[1], U = I[$], N = x[0], G = N + x[2], T = x[3], Z = T + x[4];
          U[0] = Math.min(T, U[0]), U[1] = Math.max(Z, U[1]), U[2] = Math.min(N, U[2]), U[3] = Math.max(G, U[3]);
        }
        var Q = I[0][0] + (k - I[0][2]), se = I[0][1] + (P - I[0][3]), V = I[2][0] + (k - I[2][2]), q = I[2][1] + (P - I[2][3]);
        _.push([
          -1,
          Q,
          se - Q,
          k,
          P - k,
          V,
          q - V
        ]);
      }
      A = P;
    }
    return S(o.length), _;
  }
  function i(a, o, c) {
    var s = [], h = [a, o, c], l = r(a, o, c), p = [];
    function w() {
      p.length && s.push({
        ok: p
      }), p = [];
    }
    function _(x) {
      for (var k = 0; k < x.length; k++)
        p.push(x[k]);
    }
    function A(x) {
      if (x[2] != x[6]) return !0;
      for (var k = x[1], P = x[5], D = 0; D < x[2]; D++)
        if (a[D + k] != c[D + P]) return !0;
      return !1;
    }
    for (var S = 0; S < l.length; S++) {
      var v = l[S], R = v[0];
      R == -1 ? A(v) ? (w(), s.push({
        conflict: {
          a: a.slice(v[1], v[1] + v[2]),
          aIndex: v[1],
          o: o.slice(v[3], v[3] + v[4]),
          oIndex: v[3],
          b: c.slice(v[5], v[5] + v[6]),
          bIndex: v[5]
        }
      })) : _(h[0].slice(v[1], v[1] + v[2])) : _(h[R].slice(v[1], v[1] + v[2]));
    }
    return w(), s;
  }
  return xi = i, xi;
}
var gl = yl();
const _l = /* @__PURE__ */ Ht(gl);
class $e extends Error {
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
    const t = new $e(e.message);
    return t.code = e.code, t.data = e.data, t.caller = e.caller, t.stack = e.stack, t;
  }
  get isIsomorphicGitError() {
    return !0;
  }
}
class Lr extends $e {
  /**
   * @param {Array<string>} filepaths
   */
  constructor(e) {
    super(
      `Modifying the index is not possible because you have unmerged files: ${e.toString}. Fix them up in the work tree, and then use 'git add/rm as appropriate to mark resolution and make a commit.`
    ), this.code = this.name = Lr.code, this.data = { filepaths: e };
  }
}
Lr.code = "UnmergedPathsError";
class Ee extends $e {
  /**
   * @param {string} message
   */
  constructor(e) {
    super(
      `An internal error caused this command to fail. Please file a bug report at https://github.com/isomorphic-git/isomorphic-git/issues with this error message: ${e}`
    ), this.code = this.name = Ee.code, this.data = { message: e };
  }
}
Ee.code = "InternalError";
class yr extends $e {
  /**
   * @param {string} filepath
   */
  constructor(e) {
    super(`The filepath "${e}" contains unsafe character sequences`), this.code = this.name = yr.code, this.data = { filepath: e };
  }
}
yr.code = "UnsafeFilepathError";
class vt {
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
    const i = this.buffer.write(e, this._start, t, r);
    return this._start += t, i;
  }
  copy(e, t, r) {
    const i = e.copy(this.buffer, this._start, t, r);
    return this._start += i, i;
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
function zr(n, e) {
  return -(n < e) || +(n > e);
}
function Ts(n, e) {
  return zr(n.path, e.path);
}
function $s(n) {
  let e = n > 0 ? n >> 12 : 0;
  e !== 4 && e !== 8 && e !== 10 && e !== 14 && (e = 8);
  let t = n & 511;
  return t & 73 ? t = 493 : t = 420, e !== 8 && (t = 0), (e << 12) + t;
}
const yt = 2 ** 32;
function jo(n, e, t, r) {
  if (n !== void 0 && e !== void 0)
    return [n, e];
  t === void 0 && (t = r.valueOf());
  const i = Math.floor(t / 1e3), a = (t - i * 1e3) * 1e6;
  return [i, a];
}
function Yt(n) {
  const [e, t] = jo(
    n.ctimeSeconds,
    n.ctimeNanoseconds,
    n.ctimeMs,
    n.ctime
  ), [r, i] = jo(
    n.mtimeSeconds,
    n.mtimeNanoseconds,
    n.mtimeMs,
    n.mtime
  );
  return {
    ctimeSeconds: e % yt,
    ctimeNanoseconds: t % yt,
    mtimeSeconds: r % yt,
    mtimeNanoseconds: i % yt,
    dev: n.dev % yt,
    ino: n.ino % yt,
    mode: $s(n.mode % yt),
    uid: n.uid % yt,
    gid: n.gid % yt,
    // size of -1 happens over a BrowserFS HTTP Backend that doesn't serve Content-Length headers
    // (like the Karma webserver) because BrowserFS HTTP Backend uses HTTP HEAD requests to do fs.stat
    size: n.size > -1 ? n.size % yt : 0
  };
}
function vl(n) {
  let e = "";
  for (const t of new Uint8Array(n))
    t < 16 && (e += "0"), e += t.toString(16);
  return e;
}
let Ai = null;
async function Lt(n) {
  return Ai === null && (Ai = await El()), Ai ? Bs(n) : bl(n);
}
function bl(n) {
  return new ks().update(n).digest("hex");
}
async function Bs(n) {
  const e = await crypto.subtle.digest("SHA-1", n);
  return vl(e);
}
async function El() {
  try {
    if (await Bs(new Uint8Array([])) === "da39a3ee5e6b4b0d3255bfef95601890afd80709") return !0;
  } catch {
  }
  return !1;
}
function kl(n) {
  return {
    assumeValid: !!(n & 32768),
    extended: !!(n & 16384),
    stage: (n & 12288) >> 12,
    nameLength: n & 4095
  };
}
function Sl(n) {
  const e = n.flags;
  return e.extended = !1, e.nameLength = Math.min(ae.from(n.path).length, 4095), (e.assumeValid ? 32768 : 0) + (e.extended ? 16384 : 0) + ((e.stage & 3) << 12) + (e.nameLength & 4095);
}
class Nt {
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
    if (ae.isBuffer(e))
      return Nt.fromBuffer(e);
    if (e === null)
      return new Nt(null);
    throw new Ee("invalid type passed to GitIndex.from");
  }
  static async fromBuffer(e) {
    if (e.length === 0)
      throw new Ee("Index file is empty (.git/index)");
    const t = new Nt(), r = new vt(e), i = r.toString("utf8", 4);
    if (i !== "DIRC")
      throw new Ee(`Invalid dircache magic file number: ${i}`);
    const a = await Lt(e.slice(0, -20)), o = e.slice(-20).toString("hex");
    if (o !== a)
      throw new Ee(
        `Invalid checksum in GitIndex buffer: expected ${o} but saw ${a}`
      );
    const c = r.readUInt32BE();
    if (c !== 2)
      throw new Ee(`Unsupported dircache version: ${c}`);
    const s = r.readUInt32BE();
    let h = 0;
    for (; !r.eof() && h < s; ) {
      const l = {};
      l.ctimeSeconds = r.readUInt32BE(), l.ctimeNanoseconds = r.readUInt32BE(), l.mtimeSeconds = r.readUInt32BE(), l.mtimeNanoseconds = r.readUInt32BE(), l.dev = r.readUInt32BE(), l.ino = r.readUInt32BE(), l.mode = r.readUInt32BE(), l.uid = r.readUInt32BE(), l.gid = r.readUInt32BE(), l.size = r.readUInt32BE(), l.oid = r.slice(20).toString("hex");
      const p = r.readUInt16BE();
      l.flags = kl(p);
      const w = e.indexOf(0, r.tell() + 1) - r.tell();
      if (w < 1)
        throw new Ee(`Got a path length of: ${w}`);
      if (l.path = r.toString("utf8", w), l.path.includes("..\\") || l.path.includes("../"))
        throw new yr(l.path);
      let _ = 8 - (r.tell() - 12) % 8;
      for (_ === 0 && (_ = 8); _--; ) {
        const A = r.readUInt8();
        if (A !== 0)
          throw new Ee(
            `Expected 1-8 null characters but got '${A}' after ${l.path}`
          );
        if (r.eof())
          throw new Ee("Unexpected end of file");
      }
      l.stages = [], t._addEntry(l), h++;
    }
    return t;
  }
  get unmergedPaths() {
    return [...this._unmergedPaths];
  }
  get entries() {
    return [...this._entries.values()].sort(Ts);
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
  insert({ filepath: e, stats: t, oid: r, stage: i = 0 }) {
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
    const a = ae.from(e), o = {
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
        stage: i,
        nameLength: a.length < 4095 ? a.length : 4095
      },
      stages: []
    };
    this._addEntry(o), this._dirty = !0;
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
    const t = ae.from(e.path), r = Math.ceil((62 + t.length + 1) / 8) * 8, i = ae.alloc(r), a = new vt(i), o = Yt(e);
    return a.writeUInt32BE(o.ctimeSeconds), a.writeUInt32BE(o.ctimeNanoseconds), a.writeUInt32BE(o.mtimeSeconds), a.writeUInt32BE(o.mtimeNanoseconds), a.writeUInt32BE(o.dev), a.writeUInt32BE(o.ino), a.writeUInt32BE(o.mode), a.writeUInt32BE(o.uid), a.writeUInt32BE(o.gid), a.writeUInt32BE(o.size), a.write(e.oid, 20, "hex"), a.writeUInt16BE(Sl(e)), a.write(e.path, t.length, "utf8"), i;
  }
  async toObject() {
    const e = ae.alloc(12), t = new vt(e);
    t.write("DIRC", 4, "utf8"), t.writeUInt32BE(2), t.writeUInt32BE(this.entriesFlat.length);
    let r = [];
    for (const c of this.entries)
      if (r.push(Nt._entryToBuffer(c)), c.stages.length > 1)
        for (const s of c.stages)
          s && s !== c && r.push(Nt._entryToBuffer(s));
    r = await Promise.all(r);
    const i = ae.concat(r), a = ae.concat([e, i]), o = await Lt(a);
    return ae.concat([a, ae.from(o, "hex")]);
  }
}
function ji(n, e, t = !0, r = !0) {
  const i = Yt(n), a = Yt(e);
  return t && i.mode !== a.mode || i.mtimeSeconds !== a.mtimeSeconds || i.ctimeSeconds !== a.ctimeSeconds || i.uid !== a.uid || i.gid !== a.gid || r && i.ino !== a.ino || i.size !== a.size;
}
let Ii = null;
const Ri = Symbol("IndexCache");
function xl() {
  return {
    map: /* @__PURE__ */ new Map(),
    stats: /* @__PURE__ */ new Map()
  };
}
async function Al(n, e, t) {
  const [r, i] = await Promise.all([
    n.lstat(e),
    n.read(e)
  ]), a = await Nt.from(i);
  t.map.set(e, a), t.stats.set(e, r);
}
async function Il(n, e, t) {
  const r = t.stats.get(e);
  if (r === void 0) return !0;
  if (r === null) return !1;
  const i = await n.lstat(e);
  return i === null ? !1 : ji(r, i);
}
class jt {
  /**
   *
   * @param {object} opts
   * @param {import('../models/FileSystem.js').FileSystem} opts.fs
   * @param {string} opts.gitdir
   * @param {object} opts.cache
   * @param {bool} opts.allowUnmerged
   * @param {function(GitIndex): any} closure
   */
  static async acquire({ fs: e, gitdir: t, cache: r, allowUnmerged: i = !0 }, a) {
    r[Ri] || (r[Ri] = xl());
    const o = `${t}/index`;
    Ii === null && (Ii = new $r({ maxPending: 1 / 0 }));
    let c, s = [];
    return await Ii.acquire(o, async () => {
      const h = r[Ri];
      await Il(e, o, h) && await Al(e, o, h);
      const l = h.map.get(o);
      if (s = l.unmergedPaths, s.length && !i)
        throw new Lr(s);
      if (c = await a(l), l._dirty) {
        const p = await l.toObject();
        await e.write(o, p), h.stats.set(o, await e.lstat(o)), l._dirty = !1;
      }
    }), c;
  }
}
function Li(n) {
  const e = Math.max(n.lastIndexOf("/"), n.lastIndexOf("\\"));
  return e > -1 && (n = n.slice(e + 1)), n;
}
function Br(n) {
  const e = Math.max(n.lastIndexOf("/"), n.lastIndexOf("\\"));
  return e === -1 ? "." : e === 0 ? "/" : n.slice(0, e);
}
function Os(n) {
  const e = /* @__PURE__ */ new Map(), t = function(i) {
    if (!e.has(i)) {
      const a = {
        type: "tree",
        fullpath: i,
        basename: Li(i),
        metadata: {},
        children: []
      };
      e.set(i, a), a.parent = t(Br(i)), a.parent && a.parent !== a && a.parent.children.push(a);
    }
    return e.get(i);
  }, r = function(i, a) {
    if (!e.has(i)) {
      const o = {
        type: "blob",
        fullpath: i,
        basename: Li(i),
        metadata: a,
        // This recursively generates any missing parent folders.
        parent: t(Br(i)),
        children: []
      };
      o.parent && o.parent.children.push(o), e.set(i, o);
    }
    return e.get(i);
  };
  t(".");
  for (const i of n)
    r(i.path, i);
  return e;
}
function Rl(n) {
  switch (n) {
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
  throw new Ee(`Unexpected GitTree entry mode: ${n.toString(8)}`);
}
class Tl {
  constructor({ fs: e, gitdir: t, cache: r }) {
    this.treePromise = jt.acquire(
      { fs: e, gitdir: t, cache: r },
      async function(a) {
        return Os(a.entries);
      }
    );
    const i = this;
    this.ConstructEntry = class {
      constructor(o) {
        this._fullpath = o, this._type = !1, this._mode = !1, this._stat = !1, this._oid = !1;
      }
      async type() {
        return i.type(this);
      }
      async mode() {
        return i.mode(this);
      }
      async stat() {
        return i.stat(this);
      }
      async content() {
        return i.content(this);
      }
      async oid() {
        return i.oid(this);
      }
    };
  }
  async readdir(e) {
    const t = e._fullpath, i = (await this.treePromise).get(t);
    if (!i || i.type === "blob") return null;
    if (i.type !== "tree")
      throw new Error(`ENOTDIR: not a directory, scandir '${t}'`);
    const a = i.children.map((o) => o.fullpath);
    return a.sort(zr), a;
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
      const i = r.type === "tree" ? {} : Yt(r.metadata);
      e._type = r.type === "tree" ? "tree" : Rl(i.mode), e._mode = i.mode, r.type === "tree" ? e._stat = void 0 : e._stat = i;
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
const qr = Symbol("GitWalkSymbol");
function $l() {
  const n = /* @__PURE__ */ Object.create(null);
  return Object.defineProperty(n, qr, {
    value: function({ fs: e, gitdir: t, cache: r }) {
      return new Tl({ fs: e, gitdir: t, cache: r });
    }
  }), Object.freeze(n), n;
}
class nt extends $e {
  /**
   * @param {string} what
   */
  constructor(e) {
    super(`Could not find ${e}.`), this.code = this.name = nt.code, this.data = { what: e };
  }
}
nt.code = "NotFoundError";
class Tt extends $e {
  /**
   * @param {string} oid
   * @param {'blob'|'commit'|'tag'|'tree'} actual
   * @param {'blob'|'commit'|'tag'|'tree'} expected
   * @param {string} [filepath]
   */
  constructor(e, t, r, i) {
    super(
      `Object ${e} ${i ? `at ${i}` : ""}was anticipated to be a ${r} but it is a ${t}.`
    ), this.code = this.name = Tt.code, this.data = { oid: e, actual: t, expected: r, filepath: i };
  }
}
Tt.code = "ObjectTypeError";
class zt extends $e {
  /**
   * @param {string} value
   */
  constructor(e) {
    super(`Expected a 40-char hex object id but saw "${e}".`), this.code = this.name = zt.code, this.data = { value: e };
  }
}
zt.code = "InvalidOidError";
class Hr extends $e {
  /**
   * @param {string} remote
   */
  constructor(e) {
    super(`Could not find a fetch refspec for remote "${e}". Make sure the config file has an entry like the following:
[remote "${e}"]
	fetch = +refs/heads/*:refs/remotes/origin/*
`), this.code = this.name = Hr.code, this.data = { remote: e };
  }
}
Hr.code = "NoRefspecError";
class Or {
  constructor(e) {
    if (this.refs = /* @__PURE__ */ new Map(), this.parsedConfig = [], e) {
      let t = null;
      this.parsedConfig = e.trim().split(`
`).map((r) => {
        if (/^\s*#/.test(r))
          return { line: r, comment: !0 };
        const i = r.indexOf(" ");
        if (r.startsWith("^")) {
          const a = r.slice(1);
          return this.refs.set(t + "^{}", a), { line: r, ref: t, peeled: a };
        } else {
          const a = r.slice(0, i);
          return t = r.slice(i + 1), this.refs.set(t, a), { line: r, ref: t, oid: a };
        }
      });
    }
    return this;
  }
  static from(e) {
    return new Or(e);
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
class Pr {
  constructor({ remotePath: e, localPath: t, force: r, matchPrefix: i }) {
    Object.assign(this, {
      remotePath: e,
      localPath: t,
      force: r,
      matchPrefix: i
    });
  }
  static from(e) {
    const [
      t,
      r,
      i,
      a,
      o
    ] = e.match(/^(\+?)(.*?)(\*?):(.*?)(\*?)$/).slice(1), c = t === "+", s = i === "*";
    if (s !== (o === "*"))
      throw new Ee("Invalid refspec");
    return new Pr({
      remotePath: r,
      localPath: a,
      force: c,
      matchPrefix: s
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
class na {
  constructor(e = []) {
    this.rules = e;
  }
  static from(e) {
    const t = [];
    for (const r of e)
      t.push(Pr.from(r));
    return new na(t);
  }
  add(e) {
    const t = Pr.from(e);
    this.rules.push(t);
  }
  translate(e) {
    const t = [];
    for (const r of this.rules)
      for (const i of e) {
        const a = r.translate(i);
        a && t.push([i, a]);
      }
    return t;
  }
  translateOne(e) {
    let t = null;
    for (const r of this.rules) {
      const i = r.translate(e);
      i && (t = i);
    }
    return t;
  }
  localNamespaces() {
    return this.rules.filter((e) => e.matchPrefix).map((e) => e.localPath.replace(/\/$/, ""));
  }
}
function Bl(n, e) {
  const t = n.replace(/\^\{\}$/, ""), r = e.replace(/\^\{\}$/, ""), i = -(t < r) || +(t > r);
  return i === 0 ? n.endsWith("^{}") ? 1 : -1 : i;
}
const Ol = (n) => {
  if (typeof n == "number")
    return n;
  n = n.toLowerCase();
  let e = parseInt(n);
  return n.endsWith("k") && (e *= 1024), n.endsWith("m") && (e *= 1024 * 1024), n.endsWith("g") && (e *= 1024 * 1024 * 1024), e;
}, ir = (n) => {
  if (typeof n == "boolean")
    return n;
  if (n = n.trim().toLowerCase(), n === "true" || n === "yes" || n === "on") return !0;
  if (n === "false" || n === "no" || n === "off") return !1;
  throw Error(
    `Expected 'true', 'false', 'yes', 'no', 'on', or 'off', but got ${n}`
  );
}, Lo = {
  core: {
    filemode: ir,
    bare: ir,
    logallrefupdates: ir,
    symlinks: ir,
    ignorecase: ir,
    bigFileThreshold: Ol
  }
}, Pl = /^\[([A-Za-z0-9-.]+)(?: "(.*)")?\]$/, Cl = /^[A-Za-z0-9-.]+$/, Fl = /^([A-Za-z][A-Za-z-]*)(?: *= *(.*))?$/, Dl = /^[A-Za-z][A-Za-z-]*$/, Nl = /^(.*?)( *[#;].*)$/, Ml = (n) => {
  const e = Pl.exec(n);
  if (e != null) {
    const [t, r] = e.slice(1);
    return [t, r];
  }
  return null;
}, Ul = (n) => {
  const e = Fl.exec(n);
  if (e != null) {
    const [t, r = "true"] = e.slice(1), i = jl(r), a = Ll(i);
    return [t, a];
  }
  return null;
}, jl = (n) => {
  const e = Nl.exec(n);
  if (e == null)
    return n;
  const [t, r] = e.slice(1);
  return zo(t) && zo(r) ? `${t}${r}` : t;
}, zo = (n) => (n.match(/(?:^|[^\\])"/g) || []).length % 2 !== 0, Ll = (n) => n.split("").reduce((e, t, r, i) => {
  const a = t === '"' && i[r - 1] !== "\\", o = t === "\\" && i[r + 1] === '"';
  return a || o ? e : e + t;
}, ""), qo = (n) => n != null ? n.toLowerCase() : null, zi = (n, e, t) => [qo(n), e, qo(t)].filter((r) => r != null).join("."), Ho = (n) => {
  const e = n.split("."), t = e.shift(), r = e.pop(), i = e.length ? e.join(".") : void 0;
  return {
    section: t,
    subsection: i,
    name: r,
    path: zi(t, i, r),
    sectionPath: zi(t, i, null),
    isSection: !!t
  };
}, zl = (n, e) => n.reduce((t, r, i) => e(r) ? i : t, -1);
class ia {
  constructor(e) {
    let t = null, r = null;
    this.parsedConfig = e ? e.split(`
`).map((i) => {
      let a = null, o = null;
      const c = i.trim(), s = Ml(c), h = s != null;
      if (h)
        [t, r] = s;
      else {
        const p = Ul(c);
        p != null && ([a, o] = p);
      }
      const l = zi(t, r, a);
      return { line: i, isSection: h, section: t, subsection: r, name: a, value: o, path: l };
    }) : [];
  }
  static from(e) {
    return new ia(e);
  }
  async get(e, t = !1) {
    const r = Ho(e).path, i = this.parsedConfig.filter((a) => a.path === r).map(({ section: a, name: o, value: c }) => {
      const s = Lo[a] && Lo[a][o];
      return s ? s(c) : c;
    });
    return t ? i : i.pop();
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
      section: i,
      subsection: a,
      name: o,
      path: c,
      sectionPath: s,
      isSection: h
    } = Ho(e), l = zl(
      this.parsedConfig,
      (p) => p.path === c
    );
    if (t == null)
      l !== -1 && this.parsedConfig.splice(l, 1);
    else if (l !== -1) {
      const p = this.parsedConfig[l], w = Object.assign({}, p, {
        name: o,
        value: t,
        modified: !0
      });
      r ? this.parsedConfig.splice(l + 1, 0, w) : this.parsedConfig[l] = w;
    } else {
      const p = this.parsedConfig.findIndex(
        (_) => _.path === s
      ), w = {
        section: i,
        subsection: a,
        name: o,
        value: t,
        modified: !0,
        path: c
      };
      if (Cl.test(i) && Dl.test(o))
        if (p >= 0)
          this.parsedConfig.splice(p + 1, 0, w);
        else {
          const _ = {
            isSection: h,
            section: i,
            subsection: a,
            modified: !0,
            path: s
          };
          this.parsedConfig.push(_, w);
        }
    }
  }
  toString() {
    return this.parsedConfig.map(({ line: e, section: t, subsection: r, name: i, value: a, modified: o = !1 }) => o ? i != null && a != null ? typeof a == "string" && /[#;]/.test(a) ? `	${i} = "${a}"` : `	${i} = ${a}` : r != null ? `[${t} "${r}"]` : `[${t}]` : e).join(`
`);
  }
}
class ht {
  static async get({ fs: e, gitdir: t }) {
    const r = await e.read(`${t}/config`, { encoding: "utf8" });
    return ia.from(r);
  }
  static async save({ fs: e, gitdir: t, config: r }) {
    await e.write(`${t}/config`, r.toString(), {
      encoding: "utf8"
    });
  }
}
const xr = (n) => [
  `${n}`,
  `refs/${n}`,
  `refs/tags/${n}`,
  `refs/heads/${n}`,
  `refs/remotes/${n}`,
  `refs/remotes/${n}/HEAD`
], ql = ["config", "description", "index", "shallow", "commondir"];
let Ti;
async function $t(n, e) {
  return Ti === void 0 && (Ti = new $r()), Ti.acquire(n, e);
}
class oe {
  static async updateRemoteRefs({
    fs: e,
    gitdir: t,
    remote: r,
    refs: i,
    symrefs: a,
    tags: o,
    refspecs: c = void 0,
    prune: s = !1,
    pruneTags: h = !1
  }) {
    for (const v of i.values())
      if (!v.match(/[0-9a-f]{40}/))
        throw new zt(v);
    const l = await ht.get({ fs: e, gitdir: t });
    if (!c) {
      if (c = await l.getall(`remote.${r}.fetch`), c.length === 0)
        throw new Hr(r);
      c.unshift(`+HEAD:refs/remotes/${r}/HEAD`);
    }
    const p = na.from(c), w = /* @__PURE__ */ new Map();
    if (h) {
      const v = await oe.listRefs({
        fs: e,
        gitdir: t,
        filepath: "refs/tags"
      });
      await oe.deleteRefs({
        fs: e,
        gitdir: t,
        refs: v.map((R) => `refs/tags/${R}`)
      });
    }
    if (o) {
      for (const v of i.keys())
        if (v.startsWith("refs/tags") && !v.endsWith("^{}") && !await oe.exists({ fs: e, gitdir: t, ref: v })) {
          const R = i.get(v);
          w.set(v, R);
        }
    }
    const _ = p.translate([...i.keys()]);
    for (const [v, R] of _) {
      const x = i.get(v);
      w.set(R, x);
    }
    const A = p.translate([...a.keys()]);
    for (const [v, R] of A) {
      const x = a.get(v), k = p.translateOne(x);
      k && w.set(R, `ref: ${k}`);
    }
    const S = [];
    if (s) {
      for (const v of p.localNamespaces()) {
        const R = (await oe.listRefs({
          fs: e,
          gitdir: t,
          filepath: v
        })).map((x) => `${v}/${x}`);
        for (const x of R)
          w.has(x) || S.push(x);
      }
      S.length > 0 && await oe.deleteRefs({ fs: e, gitdir: t, refs: S });
    }
    for (const [v, R] of w)
      await $t(
        v,
        async () => e.write(Fe.join(t, v), `${R.trim()}
`, "utf8")
      );
    return { pruned: S };
  }
  // TODO: make this less crude?
  static async writeRef({ fs: e, gitdir: t, ref: r, value: i }) {
    if (!i.match(/[0-9a-f]{40}/))
      throw new zt(i);
    await $t(
      r,
      async () => e.write(Fe.join(t, r), `${i.trim()}
`, "utf8")
    );
  }
  static async writeSymbolicRef({ fs: e, gitdir: t, ref: r, value: i }) {
    await $t(
      r,
      async () => e.write(Fe.join(t, r), `ref: ${i.trim()}
`, "utf8")
    );
  }
  static async deleteRef({ fs: e, gitdir: t, ref: r }) {
    return oe.deleteRefs({ fs: e, gitdir: t, refs: [r] });
  }
  static async deleteRefs({ fs: e, gitdir: t, refs: r }) {
    await Promise.all(r.map((c) => e.rm(Fe.join(t, c))));
    let i = await $t(
      "packed-refs",
      async () => e.read(`${t}/packed-refs`, { encoding: "utf8" })
    );
    const a = Or.from(i), o = a.refs.size;
    for (const c of r)
      a.refs.has(c) && a.delete(c);
    a.refs.size < o && (i = a.toString(), await $t(
      "packed-refs",
      async () => e.write(`${t}/packed-refs`, i, { encoding: "utf8" })
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
  static async resolve({ fs: e, gitdir: t, ref: r, depth: i = void 0 }) {
    if (i !== void 0 && (i--, i === -1))
      return r;
    if (r.startsWith("ref: "))
      return r = r.slice(5), oe.resolve({ fs: e, gitdir: t, ref: r, depth: i });
    if (r.length === 40 && /[0-9a-f]{40}/.test(r))
      return r;
    const a = await oe.packedRefs({ fs: e, gitdir: t }), o = xr(r).filter((c) => !ql.includes(c));
    for (const c of o) {
      const s = await $t(
        c,
        async () => await e.read(`${t}/${c}`, { encoding: "utf8" }) || a.get(c)
      );
      if (s)
        return oe.resolve({ fs: e, gitdir: t, ref: s.trim(), depth: i });
    }
    throw new nt(r);
  }
  static async exists({ fs: e, gitdir: t, ref: r }) {
    try {
      return await oe.expand({ fs: e, gitdir: t, ref: r }), !0;
    } catch {
      return !1;
    }
  }
  static async expand({ fs: e, gitdir: t, ref: r }) {
    if (r.length === 40 && /[0-9a-f]{40}/.test(r))
      return r;
    const i = await oe.packedRefs({ fs: e, gitdir: t }), a = xr(r);
    for (const o of a)
      if (await $t(
        o,
        async () => e.exists(`${t}/${o}`)
      ) || i.has(o)) return o;
    throw new nt(r);
  }
  static async expandAgainstMap({ ref: e, map: t }) {
    const r = xr(e);
    for (const i of r)
      if (await t.has(i)) return i;
    throw new nt(e);
  }
  static resolveAgainstMap({ ref: e, fullref: t = e, depth: r = void 0, map: i }) {
    if (r !== void 0 && (r--, r === -1))
      return { fullref: t, oid: e };
    if (e.startsWith("ref: "))
      return e = e.slice(5), oe.resolveAgainstMap({ ref: e, fullref: t, depth: r, map: i });
    if (e.length === 40 && /[0-9a-f]{40}/.test(e))
      return { fullref: t, oid: e };
    const a = xr(e);
    for (const o of a) {
      const c = i.get(o);
      if (c)
        return oe.resolveAgainstMap({
          ref: c.trim(),
          fullref: o,
          depth: r,
          map: i
        });
    }
    throw new nt(e);
  }
  static async packedRefs({ fs: e, gitdir: t }) {
    const r = await $t(
      "packed-refs",
      async () => e.read(`${t}/packed-refs`, { encoding: "utf8" })
    );
    return Or.from(r).refs;
  }
  // List all the refs that match the `filepath` prefix
  static async listRefs({ fs: e, gitdir: t, filepath: r }) {
    const i = oe.packedRefs({ fs: e, gitdir: t });
    let a = null;
    try {
      a = await e.readdirDeep(`${t}/${r}`), a = a.map((o) => o.replace(`${t}/${r}/`, ""));
    } catch {
      a = [];
    }
    for (let o of (await i).keys())
      o.startsWith(r) && (o = o.replace(r + "/", ""), a.includes(o) || a.push(o));
    return a.sort(Bl), a;
  }
  static async listBranches({ fs: e, gitdir: t, remote: r }) {
    return r ? oe.listRefs({
      fs: e,
      gitdir: t,
      filepath: `refs/remotes/${r}`
    }) : oe.listRefs({ fs: e, gitdir: t, filepath: "refs/heads" });
  }
  static async listTags({ fs: e, gitdir: t }) {
    return (await oe.listRefs({
      fs: e,
      gitdir: t,
      filepath: "refs/tags"
    })).filter((i) => !i.endsWith("^{}"));
  }
}
function Hl(n, e) {
  return zr(Go(n), Go(e));
}
function Go(n) {
  return n.mode === "040000" ? n.path + "/" : n.path;
}
function Ps(n) {
  switch (n) {
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
  throw new Ee(`Unexpected GitTree entry mode: ${n}`);
}
function Gl(n) {
  const e = [];
  let t = 0;
  for (; t < n.length; ) {
    const r = n.indexOf(32, t);
    if (r === -1)
      throw new Ee(
        `GitTree: Error parsing buffer at byte location ${t}: Could not find the next space character.`
      );
    const i = n.indexOf(0, t);
    if (i === -1)
      throw new Ee(
        `GitTree: Error parsing buffer at byte location ${t}: Could not find the next null character.`
      );
    let a = n.slice(t, r).toString("utf8");
    a === "40000" && (a = "040000");
    const o = Ps(a), c = n.slice(r + 1, i).toString("utf8");
    if (c.includes("\\") || c.includes("/"))
      throw new yr(c);
    const s = n.slice(i + 1, i + 21).toString("hex");
    t = i + 21, e.push({ mode: a, path: c, oid: s, type: o });
  }
  return e;
}
function Wl(n) {
  if (typeof n == "number" && (n = n.toString(8)), n.match(/^0?4.*/)) return "040000";
  if (n.match(/^1006.*/)) return "100644";
  if (n.match(/^1007.*/)) return "100755";
  if (n.match(/^120.*/)) return "120000";
  if (n.match(/^160.*/)) return "160000";
  throw new Ee(`Could not understand file mode: ${n}`);
}
function Zl(n) {
  return !n.oid && n.sha && (n.oid = n.sha), n.mode = Wl(n.mode), n.type || (n.type = Ps(n.mode)), n;
}
class Et {
  constructor(e) {
    if (ae.isBuffer(e))
      this._entries = Gl(e);
    else if (Array.isArray(e))
      this._entries = e.map(Zl);
    else
      throw new Ee("invalid type passed to GitTree constructor");
    this._entries.sort(Ts);
  }
  static from(e) {
    return new Et(e);
  }
  render() {
    return this._entries.map((e) => `${e.mode} ${e.type} ${e.oid}    ${e.path}`).join(`
`);
  }
  toObject() {
    const e = [...this._entries];
    return e.sort(Hl), ae.concat(
      e.map((t) => {
        const r = ae.from(t.mode.replace(/^0/, "")), i = ae.from(" "), a = ae.from(t.path, "utf8"), o = ae.from([0]), c = ae.from(t.oid, "hex");
        return ae.concat([r, i, a, o, c]);
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
class Gr {
  static wrap({ type: e, object: t }) {
    return ae.concat([
      ae.from(`${e} ${t.byteLength.toString()}\0`),
      ae.from(t)
    ]);
  }
  static unwrap(e) {
    const t = e.indexOf(32), r = e.indexOf(0), i = e.slice(0, t).toString("utf8"), a = e.slice(t + 1, r).toString("utf8"), o = e.length - (r + 1);
    if (parseInt(a) !== o)
      throw new Ee(
        `Length mismatch: expected ${a} bytes but got ${o} instead.`
      );
    return {
      type: i,
      object: ae.from(e.slice(r + 1))
    };
  }
}
async function Vl({ fs: n, gitdir: e, oid: t }) {
  const r = `objects/${t.slice(0, 2)}/${t.slice(2)}`, i = await n.read(`${e}/${r}`);
  return i ? { object: i, format: "deflated", source: r } : null;
}
function Xl(n, e) {
  const t = new vt(n), r = Wo(t);
  if (r !== e.byteLength)
    throw new Ee(
      `applyDelta expected source buffer to be ${r} bytes but the provided buffer was ${e.length} bytes`
    );
  const i = Wo(t);
  let a;
  const o = Vo(t, e);
  if (o.byteLength === i)
    a = o;
  else {
    a = ae.alloc(i);
    const c = new vt(a);
    for (c.copy(o); !t.eof(); )
      c.copy(Vo(t, e));
    const s = c.tell();
    if (i !== s)
      throw new Ee(
        `applyDelta expected target buffer to be ${i} bytes but the resulting buffer was ${s} bytes`
      );
  }
  return a;
}
function Wo(n) {
  let e = 0, t = 0, r = null;
  do
    r = n.readUInt8(), e |= (r & 127) << t, t += 7;
  while (r & 128);
  return e;
}
function Zo(n, e, t) {
  let r = 0, i = 0;
  for (; t--; )
    e & 1 && (r |= n.readUInt8() << i), e >>= 1, i += 8;
  return r;
}
function Vo(n, e) {
  const t = n.readUInt8(), r = 128, i = 15, a = 112;
  if (t & r) {
    const o = Zo(n, t & i, 4);
    let c = Zo(n, (t & a) >> 4, 3);
    return c === 0 && (c = 65536), e.slice(o, o + c);
  } else
    return n.slice(t);
}
function Yl(n) {
  let e = [n];
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
function Cs(n) {
  return n[Symbol.asyncIterator] ? n[Symbol.asyncIterator]() : n[Symbol.iterator] ? n[Symbol.iterator]() : n.next ? n : Yl(n);
}
class Fs {
  constructor(e) {
    if (typeof ae > "u")
      throw new Error("Missing Buffer dependency");
    this.stream = Cs(e), this.buffer = null, this.cursor = 0, this.undoCursor = 0, this.started = !1, this._ended = !1, this._discardedBytes = 0;
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
    return e && (this._ended = !0, !t) ? ae.alloc(0) : (t && (t = ae.from(t)), t);
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
    for (; this.cursor + e > Kl(t); ) {
      const r = await this._next();
      if (this._ended) break;
      t.push(r);
    }
    this.buffer = ae.concat(t);
  }
  async _loadnext() {
    this._discardedBytes += this.buffer.length, this.undoCursor = 0, this.cursor = 0, this.buffer = await this._next();
  }
  async _init() {
    this.buffer = await this._next();
  }
}
function Kl(n) {
  return n.reduce((e, t) => e + t.length, 0);
}
async function Jl(n, e) {
  const t = new Fs(n);
  let r = await t.read(4);
  if (r = r.toString("utf8"), r !== "PACK")
    throw new Ee(`Invalid PACK header '${r}'`);
  let i = await t.read(4);
  if (i = i.readUInt32BE(0), i !== 2)
    throw new Ee(`Invalid packfile version: ${i}`);
  let a = await t.read(4);
  if (a = a.readUInt32BE(0), !(a < 1))
    for (; !t.eof() && a--; ) {
      const o = t.tell(), { type: c, length: s, ofs: h, reference: l } = await Ql(t), p = new ra.Inflate();
      for (; !p.result; ) {
        const w = await t.chunk();
        if (!w) break;
        if (p.push(w, !1), p.err)
          throw new Ee(`Pako error: ${p.msg}`);
        if (p.result) {
          if (p.result.length !== s)
            throw new Ee(
              "Inflated object size is different from that stated in packfile."
            );
          await t.undo(), await t.read(w.length - p.strm.avail_in);
          const _ = t.tell();
          await e({
            data: p.result,
            type: c,
            num: a,
            offset: o,
            end: _,
            reference: l,
            ofs: h
          });
        }
      }
    }
}
async function Ql(n) {
  let e = await n.byte();
  const t = e >> 4 & 7;
  let r = e & 15;
  if (e & 128) {
    let o = 4;
    do
      e = await n.byte(), r |= (e & 127) << o, o += 7;
    while (e & 128);
  }
  let i, a;
  if (t === 6) {
    let o = 0;
    i = 0;
    const c = [];
    do
      e = await n.byte(), i |= (e & 127) << o, o += 7, c.push(e);
    while (e & 128);
    a = ae.from(c);
  }
  return t === 7 && (a = await n.read(20)), { type: t, length: r, ofs: i, reference: a };
}
async function Ds(n) {
  return ra.inflate(n);
}
function eu(n) {
  const e = [];
  let t = 0, r = 0;
  do {
    t = n.readUInt8();
    const i = t & 127;
    e.push(i), r = t & 128;
  } while (r);
  return e.reduce((i, a) => i + 1 << 7 | a, -1);
}
function tu(n, e) {
  let t = e, r = 4, i = null;
  do
    i = n.readUInt8(), t |= (i & 127) << r, r += 7;
  while (i & 128);
  return t;
}
class sr {
  constructor(e) {
    Object.assign(this, e), this.offsetCache = {};
  }
  static async fromIdx({ idx: e, getExternalRefDelta: t }) {
    const r = new vt(e);
    if (r.slice(4).toString("hex") !== "ff744f63")
      return;
    const a = r.readUInt32BE();
    if (a !== 2)
      throw new Ee(
        `Unable to read version ${a} packfile IDX. (Only version 2 supported)`
      );
    if (e.byteLength > 2048 * 1024 * 1024)
      throw new Ee(
        "To keep implementation simple, I haven't implemented the layer 5 feature needed to support packfiles > 2GB in size."
      );
    r.seek(r.tell() + 4 * 255);
    const o = r.readUInt32BE(), c = [];
    for (let l = 0; l < o; l++) {
      const p = r.slice(20).toString("hex");
      c[l] = p;
    }
    r.seek(r.tell() + 4 * o);
    const s = /* @__PURE__ */ new Map();
    for (let l = 0; l < o; l++)
      s.set(c[l], r.readUInt32BE());
    const h = r.slice(20).toString("hex");
    return new sr({
      hashes: c,
      crcs: {},
      offsets: s,
      packfileSha: h,
      getExternalRefDelta: t
    });
  }
  static async fromPack({ pack: e, getExternalRefDelta: t, onProgress: r }) {
    const i = {
      1: "commit",
      2: "tree",
      3: "blob",
      4: "tag",
      6: "ofs-delta",
      7: "ref-delta"
    }, a = {}, o = e.slice(-20).toString("hex"), c = [], s = {}, h = /* @__PURE__ */ new Map();
    let l = null, p = null;
    await Jl([e], async ({ data: v, type: R, reference: x, offset: k, num: P }) => {
      l === null && (l = P);
      const D = Math.floor(
        (l - P) * 100 / l
      );
      D !== p && r && await r({
        phase: "Receiving objects",
        loaded: l - P,
        total: l
      }), p = D, R = i[R], ["commit", "tree", "blob", "tag"].includes(R) ? a[k] = {
        type: R,
        offset: k
      } : R === "ofs-delta" ? a[k] = {
        type: R,
        offset: k
      } : R === "ref-delta" && (a[k] = {
        type: R,
        offset: k
      });
    });
    const w = Object.keys(a).map(Number);
    for (const [v, R] of w.entries()) {
      const x = v + 1 === w.length ? e.byteLength - 20 : w[v + 1], k = a[R], P = el.buf(e.slice(R, x)) >>> 0;
      k.end = x, k.crc = P;
    }
    const _ = new sr({
      pack: Promise.resolve(e),
      packfileSha: o,
      crcs: s,
      hashes: c,
      offsets: h,
      getExternalRefDelta: t
    });
    p = null;
    let A = 0;
    const S = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let v in a) {
      v = Number(v);
      const R = Math.floor(A * 100 / l);
      R !== p && r && await r({
        phase: "Resolving deltas",
        loaded: A,
        total: l
      }), A++, p = R;
      const x = a[v];
      if (!x.oid)
        try {
          _.readDepth = 0, _.externalReadDepth = 0;
          const { type: k, object: P } = await _.readSlice({ start: v });
          S[_.readDepth] += 1;
          const D = await Lt(Gr.wrap({ type: k, object: P }));
          x.oid = D, c.push(D), h.set(D, v), s[D] = x.crc;
        } catch {
          continue;
        }
    }
    return c.sort(), _;
  }
  async toBuffer() {
    const e = [], t = (h, l) => {
      e.push(ae.from(h, l));
    };
    t("ff744f63", "hex"), t("00000002", "hex");
    const r = new vt(ae.alloc(256 * 4));
    for (let h = 0; h < 256; h++) {
      let l = 0;
      for (const p of this.hashes)
        parseInt(p.slice(0, 2), 16) <= h && l++;
      r.writeUInt32BE(l);
    }
    e.push(r.buffer);
    for (const h of this.hashes)
      t(h, "hex");
    const i = new vt(ae.alloc(this.hashes.length * 4));
    for (const h of this.hashes)
      i.writeUInt32BE(this.crcs[h]);
    e.push(i.buffer);
    const a = new vt(ae.alloc(this.hashes.length * 4));
    for (const h of this.hashes)
      a.writeUInt32BE(this.offsets.get(h));
    e.push(a.buffer), t(this.packfileSha, "hex");
    const o = ae.concat(e), c = await Lt(o), s = ae.alloc(20);
    return s.write(c, "hex"), ae.concat([o, s]);
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
      throw new Ee(`Could not read object ${e} from packfile`);
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
      throw new Ee(
        "Tried to read from a GitPackIndex with no packfile loaded into memory"
      );
    const r = (await this.pack).slice(e), i = new vt(r), a = i.readUInt8(), o = a & 112;
    let c = t[o];
    if (c === void 0)
      throw new Ee("Unrecognized type: 0b" + o.toString(2));
    const s = a & 15;
    let h = s;
    a & 128 && (h = tu(i, s));
    let p = null, w = null;
    if (c === "ofs_delta") {
      const A = eu(i), S = e - A;
      ({ object: p, type: c } = await this.readSlice({ start: S }));
    }
    if (c === "ref_delta") {
      const A = i.slice(20).toString("hex");
      ({ object: p, type: c } = await this.read({ oid: A }));
    }
    const _ = r.slice(i.tell());
    if (w = ae.from(await Ds(_)), w.byteLength !== h)
      throw new Ee(
        `Packfile told us object would have length ${h} but it had length ${w.byteLength}`
      );
    return p && (w = ae.from(Xl(w, p))), this.readDepth > 3 && (this.offsetCache[e] = { type: c, object: w }), { type: c, format: "content", object: w };
  }
}
const Ar = Symbol("PackfileCache");
async function ru({
  fs: n,
  filename: e,
  getExternalRefDelta: t,
  emitter: r,
  emitterPrefix: i
}) {
  const a = await n.read(e);
  return sr.fromIdx({ idx: a, getExternalRefDelta: t });
}
function Ns({
  fs: n,
  cache: e,
  filename: t,
  getExternalRefDelta: r,
  emitter: i,
  emitterPrefix: a
}) {
  e[Ar] || (e[Ar] = /* @__PURE__ */ new Map());
  let o = e[Ar].get(t);
  return o || (o = ru({
    fs: n,
    filename: t,
    getExternalRefDelta: r,
    emitter: i,
    emitterPrefix: a
  }), e[Ar].set(t, o)), o;
}
async function nu({
  fs: n,
  cache: e,
  gitdir: t,
  oid: r,
  format: i = "content",
  getExternalRefDelta: a
}) {
  let o = await n.readdir(Fe.join(t, "objects/pack"));
  o = o.filter((c) => c.endsWith(".idx"));
  for (const c of o) {
    const s = `${t}/objects/pack/${c}`, h = await Ns({
      fs: n,
      cache: e,
      filename: s,
      getExternalRefDelta: a
    });
    if (h.error) throw new Ee(h.error);
    if (h.offsets.has(r)) {
      if (!h.pack) {
        const p = s.replace(/idx$/, "pack");
        h.pack = n.read(p);
      }
      const l = await h.read({ oid: r, getExternalRefDelta: a });
      return l.format = "content", l.source = `objects/pack/${c.replace(/idx$/, "pack")}`, l;
    }
  }
  return null;
}
async function Qe({
  fs: n,
  cache: e,
  gitdir: t,
  oid: r,
  format: i = "content"
}) {
  const a = (l) => Qe({ fs: n, cache: e, gitdir: t, oid: l });
  let o;
  if (r === "4b825dc642cb6eb9a060e54bf8d69288fbee4904" && (o = { format: "wrapped", object: ae.from("tree 0\0") }), o || (o = await Vl({ fs: n, gitdir: t, oid: r })), !o) {
    if (o = await nu({
      fs: n,
      cache: e,
      gitdir: t,
      oid: r,
      getExternalRefDelta: a
    }), !o)
      throw new nt(r);
    return o;
  }
  if (i === "deflated" || (o.format === "deflated" && (o.object = ae.from(await Ds(o.object)), o.format = "wrapped"), i === "wrapped"))
    return o;
  const c = await Lt(o.object);
  if (c !== r)
    throw new Ee(
      `SHA check failed! Expected ${r}, computed ${c}`
    );
  const { object: s, type: h } = Gr.unwrap(o.object);
  if (o.type = h, o.object = s, o.format = "content", i === "content")
    return o;
  throw new Ee(`invalid requested format "${i}"`);
}
class Wr extends $e {
  /**
   * @param {'note'|'remote'|'tag'|'branch'} noun
   * @param {string} where
   * @param {boolean} canForce
   */
  constructor(e, t, r = !0) {
    super(
      `Failed to create ${e} at ${t} because it already exists.${r ? ` (Hint: use 'force: true' parameter to overwrite existing ${e}.)` : ""}`
    ), this.code = this.name = Wr.code, this.data = { noun: e, where: t, canForce: r };
  }
}
Wr.code = "AlreadyExistsError";
class aa extends $e {
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
    ), this.code = this.name = aa.code, this.data = { nouns: e, short: t, matches: r };
  }
}
aa.code = "AmbiguousError";
class Zr extends $e {
  /**
   * @param {string[]} filepaths
   */
  constructor(e) {
    super(
      `Your local changes to the following files would be overwritten by checkout: ${e.join(
        ", "
      )}`
    ), this.code = this.name = Zr.code, this.data = { filepaths: e };
  }
}
Zr.code = "CheckoutConflictError";
class Vr extends $e {
  /**
   * @param {string} ref
   * @param {string} oid
   */
  constructor(e, t) {
    super(
      `Failed to checkout "${e}" because commit ${t} is not available locally. Do a git fetch to make the branch available locally.`
    ), this.code = this.name = Vr.code, this.data = { ref: e, oid: t };
  }
}
Vr.code = "CommitNotFetchedError";
class Xr extends $e {
  constructor() {
    super("Empty response from git server."), this.code = this.name = Xr.code, this.data = {};
  }
}
Xr.code = "EmptyServerResponseError";
class Yr extends $e {
  constructor() {
    super("A simple fast-forward merge was not possible."), this.code = this.name = Yr.code, this.data = {};
  }
}
Yr.code = "FastForwardError";
class Kr extends $e {
  /**
   * @param {string} prettyDetails
   * @param {PushResult} result
   */
  constructor(e, t) {
    super(`One or more branches were not updated: ${e}`), this.code = this.name = Kr.code, this.data = { prettyDetails: e, result: t };
  }
}
Kr.code = "GitPushError";
class cr extends $e {
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
class lr extends $e {
  /**
   * @param {'leading-slash'|'trailing-slash'|'directory'} [reason]
   */
  constructor(e) {
    let t = "invalid filepath";
    e === "leading-slash" || e === "trailing-slash" ? t = '"filepath" parameter should not include leading or trailing directory separators because these can cause problems on some platforms.' : e === "directory" && (t = '"filepath" should not be a directory.'), super(t), this.code = this.name = lr.code, this.data = { reason: e };
  }
}
lr.code = "InvalidFilepathError";
class Jr extends $e {
  /**
   * @param {string} ref
   * @param {string} suggestion
   * @param {boolean} canForce
   */
  constructor(e, t) {
    super(
      `"${e}" would be an invalid git reference. (Hint: a valid alternative would be "${t}".)`
    ), this.code = this.name = Jr.code, this.data = { ref: e, suggestion: t };
  }
}
Jr.code = "InvalidRefNameError";
class Qr extends $e {
  /**
   * @param {number} depth
   */
  constructor(e) {
    super(`Maximum search depth of ${e} exceeded.`), this.code = this.name = Qr.code, this.data = { depth: e };
  }
}
Qr.code = "MaxDepthError";
class gr extends $e {
  constructor() {
    super("Merges with conflicts are not supported yet."), this.code = this.name = gr.code, this.data = {};
  }
}
gr.code = "MergeNotSupportedError";
class _r extends $e {
  /**
   * @param {Array<string>} filepaths
   * @param {Array<string>} bothModified
   * @param {Array<string>} deleteByUs
   * @param {Array<string>} deleteByTheirs
   */
  constructor(e, t, r, i) {
    super(
      `Automatic merge failed with one or more merge conflicts in the following files: ${e.toString()}. Fix conflicts then commit the result.`
    ), this.code = this.name = _r.code, this.data = { filepaths: e, bothModified: t, deleteByUs: r, deleteByTheirs: i };
  }
}
_r.code = "MergeConflictError";
class qt extends $e {
  /**
   * @param {'author'|'committer'|'tagger'} role
   */
  constructor(e) {
    super(
      `No name was provided for ${e} in the argument or in the .git/config file.`
    ), this.code = this.name = qt.code, this.data = { role: e };
  }
}
qt.code = "MissingNameError";
class ft extends $e {
  /**
   * @param {string} parameter
   */
  constructor(e) {
    super(
      `The function requires a "${e}" parameter but none was provided.`
    ), this.code = this.name = ft.code, this.data = { parameter: e };
  }
}
ft.code = "MissingParameterError";
class oa extends $e {
  /**
   * @param {Error[]} errors
   * @param {string} message
   */
  constructor(e) {
    super(
      'There are multiple errors that were thrown by the method. Please refer to the "errors" property to see more'
    ), this.code = this.name = oa.code, this.data = { errors: e }, this.errors = e;
  }
}
oa.code = "MultipleGitError";
class Kt extends $e {
  /**
   * @param {string} expected
   * @param {string} actual
   */
  constructor(e, t) {
    super(`Expected "${e}" but received "${t}".`), this.code = this.name = Kt.code, this.data = { expected: e, actual: t };
  }
}
Kt.code = "ParseError";
class ur extends $e {
  /**
   * @param {'not-fast-forward'|'tag-exists'} reason
   */
  constructor(e) {
    let t = "";
    e === "not-fast-forward" ? t = " because it was not a simple fast-forward" : e === "tag-exists" && (t = " because tag already exists"), super(`Push rejected${t}. Use "force: true" to override.`), this.code = this.name = ur.code, this.data = { reason: e };
  }
}
ur.code = "PushRejectedError";
class Ut extends $e {
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
class en extends $e {
  /**
   * @param {string} preview
   * @param {string} response
   */
  constructor(e, t) {
    super(
      `Remote did not reply using the "smart" HTTP protocol. Expected "001e# service=git-upload-pack" but received: ${e}`
    ), this.code = this.name = en.code, this.data = { preview: e, response: t };
  }
}
en.code = "SmartHttpError";
class tn extends $e {
  /**
   * @param {string} url
   * @param {string} transport
   * @param {string} [suggestion]
   */
  constructor(e, t, r) {
    super(
      `Git remote "${e}" uses an unrecognized transport protocol: "${t}"`
    ), this.code = this.name = tn.code, this.data = { url: e, transport: t, suggestion: r };
  }
}
tn.code = "UnknownTransportError";
class rn extends $e {
  /**
   * @param {string} url
   */
  constructor(e) {
    super(`Cannot parse remote URL: "${e}"`), this.code = this.name = rn.code, this.data = { url: e };
  }
}
rn.code = "UrlParseError";
class vr extends $e {
  constructor() {
    super("The operation was canceled."), this.code = this.name = vr.code, this.data = {};
  }
}
vr.code = "UserCanceledError";
class sa extends $e {
  /**
   * @param {Array<string>} filepaths
   */
  constructor(e) {
    super(
      `Could not merge index: Entry for '${e}' is not up to date. Either reset the index entry to HEAD, or stage your unstaged changes.`
    ), this.code = this.name = sa.code, this.data = { filepath: e };
  }
}
sa.code = "IndexResetError";
class nn extends $e {
  /**
   * @param {string} ref
   */
  constructor(e) {
    super(
      `"${e}" does not point to any commit. You're maybe working on a repository with no commits yet. `
    ), this.code = this.name = nn.code, this.data = { ref: e };
  }
}
nn.code = "NoCommitError";
function qi({ name: n, email: e, timestamp: t, timezoneOffset: r }) {
  return r = iu(r), `${n} <${e}> ${t} ${r}`;
}
function iu(n) {
  const e = au(ou(n));
  n = Math.abs(n);
  const t = Math.floor(n / 60);
  n -= t * 60;
  let r = String(t), i = String(n);
  return r.length < 2 && (r = "0" + r), i.length < 2 && (i = "0" + i), (e === -1 ? "-" : "+") + r + i;
}
function au(n) {
  return Math.sign(n) || (Object.is(n, -0) ? -1 : 1);
}
function ou(n) {
  return n === 0 ? n : -n;
}
function xt(n) {
  return n = n.replace(/\r/g, ""), n = n.replace(/^\n+/, ""), n = n.replace(/\n+$/, "") + `
`, n;
}
function Cr(n) {
  const [, e, t, r, i] = n.match(
    /^(.*) <(.*)> (.*) (.*)$/
  );
  return {
    name: e,
    email: t,
    timestamp: Number(r),
    timezoneOffset: su(i)
  };
}
function su(n) {
  let [, e, t, r] = n.match(/(\+|-)(\d\d)(\d\d)/);
  return r = (e === "+" ? 1 : -1) * (Number(t) * 60 + Number(r)), cu(r);
}
function cu(n) {
  return n === 0 ? n : -n;
}
class Bt {
  constructor(e) {
    if (typeof e == "string")
      this._tag = e;
    else if (ae.isBuffer(e))
      this._tag = e.toString("utf8");
    else if (typeof e == "object")
      this._tag = Bt.render(e);
    else
      throw new Ee(
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
tagger ${qi(e.tagger)}

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
    for (const i of e)
      i[0] === " " ? t[t.length - 1] += `
` + i.slice(1) : t.push(i);
    const r = {};
    for (const i of t) {
      const a = i.slice(0, i.indexOf(" ")), o = i.slice(i.indexOf(" ") + 1);
      Array.isArray(r[a]) ? r[a].push(o) : r[a] = o;
    }
    return r.tagger && (r.tagger = Cr(r.tagger)), r.committer && (r.committer = Cr(r.committer)), r;
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
    return ae.from(this._tag, "utf8");
  }
  static async sign(e, t, r) {
    const i = e.payload();
    let { signature: a } = await t({ payload: i, secretKey: r });
    a = xt(a);
    const o = i + a;
    return Bt.from(o);
  }
}
function $i(n) {
  return n.trim().split(`
`).map((e) => " " + e).join(`
`) + `
`;
}
function lu(n) {
  return n.split(`
`).map((e) => e.replace(/^ /, "")).join(`
`);
}
class je {
  constructor(e) {
    if (typeof e == "string")
      this._commit = e;
    else if (ae.isBuffer(e))
      this._commit = e.toString("utf8");
    else if (typeof e == "object")
      this._commit = je.render(e);
    else
      throw new Ee("invalid type passed to GitCommit constructor");
  }
  static fromPayloadSignature({ payload: e, signature: t }) {
    const r = je.justHeaders(e), i = je.justMessage(e), a = xt(
      r + `
gpgsig` + $i(t) + `
` + i
    );
    return new je(a);
  }
  static from(e) {
    return new je(e);
  }
  toObject() {
    return ae.from(this._commit, "utf8");
  }
  // Todo: allow setting the headers and message
  headers() {
    return this.parseHeaders();
  }
  // Todo: allow setting the headers and message
  message() {
    return je.justMessage(this._commit);
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
    const e = je.justHeaders(this._commit).split(`
`), t = [];
    for (const i of e)
      i[0] === " " ? t[t.length - 1] += `
` + i.slice(1) : t.push(i);
    const r = {
      parent: []
    };
    for (const i of t) {
      const a = i.slice(0, i.indexOf(" ")), o = i.slice(i.indexOf(" ") + 1);
      Array.isArray(r[a]) ? r[a].push(o) : r[a] = o;
    }
    return r.author && (r.author = Cr(r.author)), r.committer && (r.committer = Cr(r.committer)), r;
  }
  static renderHeaders(e) {
    let t = "";
    if (e.tree ? t += `tree ${e.tree}
` : t += `tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
`, e.parent) {
      if (e.parent.length === void 0)
        throw new Ee("commit 'parent' property should be an array");
      for (const a of e.parent)
        t += `parent ${a}
`;
    }
    const r = e.author;
    t += `author ${qi(r)}
`;
    const i = e.committer || e.author;
    return t += `committer ${qi(i)}
`, e.gpgsig && (t += "gpgsig" + $i(e.gpgsig)), t;
  }
  static render(e) {
    return je.renderHeaders(e) + `
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
    return lu(e);
  }
  static async sign(e, t, r) {
    const i = e.withoutSignature(), a = je.justMessage(e._commit);
    let { signature: o } = await t({ payload: i, secretKey: r });
    o = xt(o);
    const s = je.justHeaders(e._commit) + `
gpgsig` + $i(o) + `
` + a;
    return je.from(s);
  }
}
async function fr({ fs: n, cache: e, gitdir: t, oid: r }) {
  if (r === "4b825dc642cb6eb9a060e54bf8d69288fbee4904")
    return { tree: Et.from([]), oid: r };
  const { type: i, object: a } = await Qe({ fs: n, cache: e, gitdir: t, oid: r });
  if (i === "tag")
    return r = Bt.from(a).parse().object, fr({ fs: n, cache: e, gitdir: t, oid: r });
  if (i === "commit")
    return r = je.from(a).parse().tree, fr({ fs: n, cache: e, gitdir: t, oid: r });
  if (i !== "tree")
    throw new Tt(r, i, "tree");
  return { tree: Et.from(a), oid: r };
}
class uu {
  constructor({ fs: e, gitdir: t, ref: r, cache: i }) {
    this.fs = e, this.cache = i, this.gitdir = t, this.mapPromise = (async () => {
      const o = /* @__PURE__ */ new Map();
      let c;
      try {
        c = await oe.resolve({ fs: e, gitdir: t, ref: r });
      } catch (h) {
        h instanceof nt && (c = "4b825dc642cb6eb9a060e54bf8d69288fbee4904");
      }
      const s = await fr({ fs: e, cache: this.cache, gitdir: t, oid: c });
      return s.type = "tree", s.mode = "40000", o.set(".", s), o;
    })();
    const a = this;
    this.ConstructEntry = class {
      constructor(c) {
        this._fullpath = c, this._type = !1, this._mode = !1, this._stat = !1, this._content = !1, this._oid = !1;
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
    const t = e._fullpath, { fs: r, cache: i, gitdir: a } = this, o = await this.mapPromise, c = o.get(t);
    if (!c) throw new Error(`No obj for ${t}`);
    const s = c.oid;
    if (!s) throw new Error(`No oid for obj ${JSON.stringify(c)}`);
    if (c.type !== "tree")
      return null;
    const { type: h, object: l } = await Qe({ fs: r, cache: i, gitdir: a, oid: s });
    if (h !== c.type)
      throw new Tt(s, h, c.type);
    const p = Et.from(l);
    for (const w of p)
      o.set(Fe.join(t, w.path), w);
    return p.entries().map((w) => Fe.join(t, w.path));
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
      e._mode = $s(parseInt(r, 8));
    }
    return e._mode;
  }
  async stat(e) {
  }
  async content(e) {
    if (e._content === !1) {
      const t = await this.mapPromise, { fs: r, cache: i, gitdir: a } = this, c = t.get(e._fullpath).oid, { type: s, object: h } = await Qe({ fs: r, cache: i, gitdir: a, oid: c });
      s !== "blob" ? e._content = void 0 : e._content = new Uint8Array(h);
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
function or({ ref: n = "HEAD" } = {}) {
  const e = /* @__PURE__ */ Object.create(null);
  return Object.defineProperty(e, qr, {
    value: function({ fs: t, gitdir: r, cache: i }) {
      return new uu({ fs: t, gitdir: r, ref: n, cache: i });
    }
  }), Object.freeze(e), e;
}
class fu {
  constructor({ fs: e, dir: t, gitdir: r, cache: i }) {
    this.fs = e, this.cache = i, this.dir = t, this.gitdir = r, this.config = null;
    const a = this;
    this.ConstructEntry = class {
      constructor(c) {
        this._fullpath = c, this._type = !1, this._mode = !1, this._stat = !1, this._content = !1, this._oid = !1;
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
    const t = e._fullpath, { fs: r, dir: i } = this, a = await r.readdir(Fe.join(i, t));
    return a === null ? null : a.map((o) => Fe.join(t, o));
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
      let i = await t.lstat(`${r}/${e._fullpath}`);
      if (!i)
        throw new Error(
          `ENOENT: no such file or directory, lstat '${e._fullpath}'`
        );
      let a = i.isDirectory() ? "tree" : "blob";
      a === "blob" && !i.isFile() && !i.isSymbolicLink() && (a = "special"), e._type = a, i = Yt(i), e._mode = i.mode, i.size === -1 && e._actualSize && (i.size = e._actualSize), e._stat = i;
    }
    return e._stat;
  }
  async content(e) {
    if (e._content === !1) {
      const { fs: t, dir: r, gitdir: i } = this;
      if (await e.type() === "tree")
        e._content = void 0;
      else {
        const o = await (await this._getGitConfig(t, i)).get("core.autocrlf"), c = await t.read(`${r}/${e._fullpath}`, { autocrlf: o });
        e._actualSize = c.length, e._stat && e._stat.size === -1 && (e._stat.size = e._actualSize), e._content = new Uint8Array(c);
      }
    }
    return e._content;
  }
  async oid(e) {
    if (e._oid === !1) {
      const t = this, { fs: r, gitdir: i, cache: a } = this;
      let o;
      await jt.acquire({ fs: r, gitdir: i, cache: a }, async function(c) {
        const s = c.entriesMap.get(e._fullpath), h = await e.stat(), p = await (await t._getGitConfig(r, i)).get("core.filemode"), w = typeof rt < "u" ? rt.platform !== "win32" : !0;
        if (!s || ji(h, s, p, w)) {
          const _ = await e.content();
          _ === void 0 ? o = void 0 : (o = await Lt(
            Gr.wrap({ type: "blob", object: _ })
          ), s && o === s.oid && (!p || h.mode === s.mode) && ji(h, s, p, w) && c.insert({
            filepath: e._fullpath,
            stats: h,
            oid: o
          }));
        } else
          o = s.oid;
      }), e._oid = o;
    }
    return e._oid;
  }
  async _getGitConfig(e, t) {
    return this.config ? this.config : (this.config = await ht.get({ fs: e, gitdir: t }), this.config);
  }
}
function hu() {
  const n = /* @__PURE__ */ Object.create(null);
  return Object.defineProperty(n, qr, {
    value: function({ fs: e, dir: t, gitdir: r, cache: i }) {
      return new fu({ fs: e, dir: t, gitdir: r, cache: i });
    }
  }), Object.freeze(n), n;
}
function du(n, e) {
  const t = e - n;
  return Array.from({ length: t }, (r, i) => n + i);
}
const Ms = typeof Array.prototype.flat > "u" ? (n) => n.reduce((e, t) => e.concat(t), []) : (n) => n.flat();
class pu {
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
function* wu(n) {
  const e = new pu();
  let t;
  const r = [], i = n.length;
  for (let a = 0; a < i; a++)
    r[a] = n[a].next().value, r[a] !== void 0 && e.consider(r[a]);
  if (e.value !== null)
    for (; ; ) {
      const a = [];
      t = e.value, e.reset();
      for (let o = 0; o < i; o++)
        r[o] !== void 0 && r[o] === t ? (a[o] = r[o], r[o] = n[o].next().value) : a[o] = null, r[o] !== void 0 && e.consider(r[o]);
      if (yield a, e.value === null) return;
    }
}
async function Hi({
  fs: n,
  cache: e,
  dir: t,
  gitdir: r,
  trees: i,
  // @ts-ignore
  map: a = async (s, h) => h,
  // The default reducer is a flatmap that filters out undefineds.
  reduce: o = async (s, h) => {
    const l = Ms(h);
    return s !== void 0 && l.unshift(s), l;
  },
  // The default iterate function walks all children concurrently
  iterate: c = (s, h) => Promise.all([...h].map(s))
}) {
  const s = i.map(
    (_) => _[qr]({ fs: n, dir: t, gitdir: r, cache: e })
  ), h = new Array(s.length).fill("."), l = du(0, s.length), p = async (_) => {
    l.map((v) => {
      const R = _[v];
      _[v] = R && new s[v].ConstructEntry(R);
    });
    const S = (await Promise.all(
      l.map((v) => {
        const R = _[v];
        return R ? s[v].readdir(R) : [];
      })
    )).map((v) => (v === null ? [] : v)[Symbol.iterator]());
    return {
      entries: _,
      children: wu(S)
    };
  }, w = async (_) => {
    const { entries: A, children: S } = await p(_), v = A.find((x) => x && x._fullpath)._fullpath, R = await a(v, A);
    if (R !== null) {
      let x = await c(w, S);
      return x = x.filter((k) => k !== void 0), o(R, x);
    }
  };
  return w(h);
}
async function Gi(n, e) {
  const t = await n.readdir(e);
  t == null ? await n.rm(e) : t.length ? await Promise.all(
    t.map((r) => {
      const i = Fe.join(e, r);
      return n.lstat(i).then((a) => {
        if (a)
          return a.isDirectory() ? Gi(n, i) : n.rm(i);
      });
    })
  ).then(() => n.rmdir(e)) : await n.rmdir(e);
}
function mu(n) {
  return yu(n) && Xo(n.then) && Xo(n.catch);
}
function yu(n) {
  return n && typeof n == "object";
}
function Xo(n) {
  return typeof n == "function";
}
function Yo(n) {
  return mu(((t) => {
    try {
      return t.readFile().catch((r) => r);
    } catch (r) {
      return r;
    }
  })(n));
}
const Ko = [
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
function Jo(n, e) {
  if (Yo(e))
    for (const t of Ko)
      n[`_${t}`] = e[t].bind(e);
  else
    for (const t of Ko)
      n[`_${t}`] = bi(e[t].bind(e));
  Yo(e) ? e.rm ? n._rm = e.rm.bind(e) : e.rmdir.length > 1 ? n._rm = e.rmdir.bind(e) : n._rm = Gi.bind(null, n) : e.rm ? n._rm = bi(e.rm.bind(e)) : e.rmdir.length > 2 ? n._rm = bi(e.rmdir.bind(e)) : n._rm = Gi.bind(null, n);
}
class Gt {
  constructor(e) {
    if (typeof e._original_unwrapped_fs < "u") return e;
    const t = Object.getOwnPropertyDescriptor(e, "promises");
    t && t.enumerable ? Jo(this, e.promises) : Jo(this, e), this._original_unwrapped_fs = e;
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
      return typeof r != "string" && (r = ae.from(r)), r;
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
      await this.mkdir(Br(e)), await this._writeFile(e, t, r);
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
        const i = Br(e);
        if (i === "." || i === "/" || i === e) throw r;
        await this.mkdir(i), await this.mkdir(e, !0);
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
      return t.sort(zr), t;
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
      t.map(async (i) => {
        const a = e + "/" + i;
        return (await this._stat(a)).isDirectory() ? this.readdirDeep(a) : a;
      })
    )).reduce((i, a) => i.concat(a), []);
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
      return ae.isBuffer(r) ? r : ae.from(r);
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
function Ue(n, e) {
  if (e === void 0)
    throw new ft(n);
}
async function Qo(n, e) {
  return !n && !e ? !1 : n && !e || !n && e ? !0 : !(await n.type() === "tree" && await e.type() === "tree" || await n.type() === await e.type() && await n.mode() === await e.mode() && await n.oid() === await e.oid());
}
async function gu({ fs: n, gitdir: e, object: t, format: r, oid: i }) {
  const a = `objects/${i.slice(0, 2)}/${i.slice(2)}`, o = `${e}/${a}`;
  await n.exists(o) || await n.write(o, t);
}
let Bi = null;
async function Us(n) {
  return Bi === null && (Bi = vu()), Bi ? _u(n) : ra.deflate(n);
}
async function _u(n) {
  const e = new CompressionStream("deflate"), t = new Blob([n]).stream().pipeThrough(e);
  return new Uint8Array(await new Response(t).arrayBuffer());
}
function vu() {
  try {
    return new CompressionStream("deflate").writable.close(), new Blob([]).stream().cancel(), !0;
  } catch {
    return !1;
  }
}
async function an({
  fs: n,
  gitdir: e,
  type: t,
  object: r,
  format: i = "content",
  oid: a = void 0,
  dryRun: o = !1
}) {
  return i !== "deflated" && (i !== "wrapped" && (r = Gr.wrap({ type: t, object: r })), a = await Lt(r), r = ae.from(await Us(r))), o || await gu({ fs: n, gitdir: e, object: r, format: "deflated", oid: a }), a;
}
async function Fr({ fs: n, gitdir: e, path: t }) {
  return (await ht.get({ fs: n, gitdir: e })).get(t);
}
function js(n, ...e) {
  for (const t of e)
    if (t)
      for (const r of Object.keys(t)) {
        const i = t[r];
        i !== void 0 && (n[r] = i);
      }
  return n;
}
async function Wi({ fs: n, gitdir: e, author: t, commit: r }) {
  const i = Math.floor(Date.now() / 1e3), a = {
    name: await Fr({ fs: n, gitdir: e, path: "user.name" }),
    email: await Fr({ fs: n, gitdir: e, path: "user.email" }) || "",
    // author.email is allowed to be empty string
    timestamp: i,
    timezoneOffset: new Date(i * 1e3).getTimezoneOffset()
  }, o = js(
    {},
    a,
    r ? r.author : void 0,
    t
  );
  if (o.name !== void 0)
    return o;
}
async function Zi({
  fs: n,
  gitdir: e,
  author: t,
  committer: r,
  commit: i
}) {
  const a = Math.floor(Date.now() / 1e3), o = {
    name: await Fr({ fs: n, gitdir: e, path: "user.name" }),
    email: await Fr({ fs: n, gitdir: e, path: "user.email" }) || "",
    // committer.email is allowed to be empty string
    timestamp: a,
    timezoneOffset: new Date(a * 1e3).getTimezoneOffset()
  }, c = js(
    {},
    o,
    i ? i.committer : void 0,
    t,
    r
  );
  if (c.name !== void 0)
    return c;
}
async function Ls({ fs: n, cache: e, gitdir: t, oid: r }) {
  const { type: i, object: a } = await Qe({ fs: n, cache: e, gitdir: t, oid: r });
  if (i === "tag")
    return r = Bt.from(a).parse().object, Ls({ fs: n, cache: e, gitdir: t, oid: r });
  if (i !== "commit")
    throw new Tt(r, i, "commit");
  return { commit: je.from(a), oid: r };
}
async function Vi({ fs: n, cache: e, gitdir: t, oid: r }) {
  const { commit: i, oid: a } = await Ls({
    fs: n,
    cache: e,
    gitdir: t,
    oid: r
  });
  return {
    oid: a,
    commit: i.parse(),
    payload: i.withoutSignature()
  };
}
async function bu({
  fs: n,
  cache: e,
  onSign: t,
  gitdir: r,
  message: i,
  author: a,
  committer: o,
  signingKey: c,
  amend: s = !1,
  dryRun: h = !1,
  noUpdateBranch: l = !1,
  ref: p,
  parent: w,
  tree: _
}) {
  let A = !1;
  p || (p = await oe.resolve({
    fs: n,
    gitdir: r,
    ref: "HEAD",
    depth: 2
  }));
  let S, v;
  try {
    S = await oe.resolve({
      fs: n,
      gitdir: r,
      ref: p
    }), v = await Vi({ fs: n, gitdir: r, oid: S, cache: {} });
  } catch {
    A = !0;
  }
  if (s && A)
    throw new nn(p);
  const R = s ? await Wi({
    fs: n,
    gitdir: r,
    author: a,
    commit: v.commit
  }) : await Wi({ fs: n, gitdir: r, author: a });
  if (!R) throw new qt("author");
  const x = s ? await Zi({
    fs: n,
    gitdir: r,
    author: R,
    committer: o,
    commit: v.commit
  }) : await Zi({
    fs: n,
    gitdir: r,
    author: R,
    committer: o
  });
  if (!x) throw new qt("committer");
  return jt.acquire(
    { fs: n, gitdir: r, cache: e, allowUnmerged: !1 },
    async function(k) {
      const D = Os(k.entries).get(".");
      if (_ || (_ = await zs({ fs: n, gitdir: r, inode: D, dryRun: h })), w ? w = await Promise.all(
        w.map(($) => oe.resolve({ fs: n, gitdir: r, ref: $ }))
      ) : s ? w = v.commit.parent : w = S ? [S] : [], !i)
        if (s)
          i = v.commit.message;
        else
          throw new ft("message");
      let F = je.from({
        tree: _,
        parent: w,
        author: R,
        committer: x,
        message: i
      });
      c && (F = await je.sign(F, t, c));
      const I = await an({
        fs: n,
        gitdir: r,
        type: "commit",
        object: F.toObject(),
        dryRun: h
      });
      return !l && !h && await oe.writeRef({
        fs: n,
        gitdir: r,
        ref: p,
        value: I
      }), I;
    }
  );
}
async function zs({ fs: n, gitdir: e, inode: t, dryRun: r }) {
  const i = t.children;
  for (const s of i)
    s.type === "tree" && (s.metadata.mode = "040000", s.metadata.oid = await zs({ fs: n, gitdir: e, inode: s, dryRun: r }));
  const a = i.map((s) => ({
    mode: s.metadata.mode,
    path: s.basename,
    oid: s.metadata.oid,
    type: s.type
  })), o = Et.from(a);
  return await an({
    fs: n,
    gitdir: e,
    type: "tree",
    object: o.toObject(),
    dryRun: r
  });
}
async function Eu({ fs: n, cache: e, gitdir: t, oid: r, filepath: i }) {
  if (i.startsWith("/"))
    throw new lr("leading-slash");
  if (i.endsWith("/"))
    throw new lr("trailing-slash");
  const a = r, o = await fr({ fs: n, cache: e, gitdir: t, oid: r }), c = o.tree;
  if (i === "")
    r = o.oid;
  else {
    const s = i.split("/");
    r = await qs({
      fs: n,
      cache: e,
      gitdir: t,
      tree: c,
      pathArray: s,
      oid: a,
      filepath: i
    });
  }
  return r;
}
async function qs({
  fs: n,
  cache: e,
  gitdir: t,
  tree: r,
  pathArray: i,
  oid: a,
  filepath: o
}) {
  const c = i.shift();
  for (const s of r)
    if (s.path === c) {
      if (i.length === 0)
        return s.oid;
      {
        const { type: h, object: l } = await Qe({
          fs: n,
          cache: e,
          gitdir: t,
          oid: s.oid
        });
        if (h !== "tree")
          throw new Tt(a, h, "tree", o);
        return r = Et.from(l), qs({
          fs: n,
          cache: e,
          gitdir: t,
          tree: r,
          pathArray: i,
          oid: a,
          filepath: o
        });
      }
    }
  throw new nt(`file or directory found at "${a}:${o}"`);
}
async function ku({ fs: n, gitdir: e, remote: t, url: r, force: i }) {
  if (t !== No.clean(t))
    throw new Jr(t, No.clean(t));
  const a = await ht.get({ fs: n, gitdir: e });
  if ((await a.getSubsections("remote")).includes(t) && r !== await a.get(`remote.${t}.url`))
    throw new Wr("remote", t);
  await a.set(`remote.${t}.url`, r), await a.set(
    `remote.${t}.fetch`,
    `+refs/heads/*:refs/remotes/${t}/*`
  ), await ht.save({ fs: n, gitdir: e, config: a });
}
const Su = (n, e) => n === "." || e == null || e.length === 0 || e === "." ? !0 : e.length >= n.length ? e.startsWith(n) : n.startsWith(e);
async function ca({
  fs: n,
  cache: e,
  onProgress: t,
  onPostCheckout: r,
  dir: i,
  gitdir: a,
  remote: o,
  ref: c,
  filepaths: s,
  noCheckout: h,
  noUpdateHead: l,
  dryRun: p,
  force: w,
  track: _ = !0
}) {
  let A;
  if (r)
    try {
      A = await oe.resolve({ fs: n, gitdir: a, ref: "HEAD" });
    } catch {
      A = "0000000000000000000000000000000000000000";
    }
  let S;
  try {
    S = await oe.resolve({ fs: n, gitdir: a, ref: c });
  } catch (v) {
    if (c === "HEAD") throw v;
    const R = `${o}/${c}`;
    if (S = await oe.resolve({
      fs: n,
      gitdir: a,
      ref: R
    }), _) {
      const x = await ht.get({ fs: n, gitdir: a });
      await x.set(`branch.${c}.remote`, o), await x.set(`branch.${c}.merge`, `refs/heads/${c}`), await ht.save({ fs: n, gitdir: a, config: x });
    }
    await oe.writeRef({
      fs: n,
      gitdir: a,
      ref: `refs/heads/${c}`,
      value: S
    });
  }
  if (!h) {
    let v;
    try {
      v = await xu({
        fs: n,
        cache: e,
        onProgress: t,
        dir: i,
        gitdir: a,
        ref: c,
        force: w,
        filepaths: s
      });
    } catch (D) {
      throw D instanceof nt && D.data.what === S ? new Vr(c, S) : D;
    }
    const R = v.filter(([D]) => D === "conflict").map(([D, F]) => F);
    if (R.length > 0)
      throw new Zr(R);
    const x = v.filter(([D]) => D === "error").map(([D, F]) => F);
    if (x.length > 0)
      throw new Ee(x.join(", "));
    if (p) {
      r && await r({
        previousHead: A,
        newHead: S,
        type: s != null && s.length > 0 ? "file" : "branch"
      });
      return;
    }
    let k = 0;
    const P = v.length;
    await jt.acquire({ fs: n, gitdir: a, cache: e }, async function(D) {
      await Promise.all(
        v.filter(
          ([F]) => F === "delete" || F === "delete-index"
        ).map(async function([F, I]) {
          const $ = `${i}/${I}`;
          F === "delete" && await n.rm($), D.delete({ filepath: I }), t && await t({
            phase: "Updating workdir",
            loaded: ++k,
            total: P
          });
        })
      );
    }), await jt.acquire({ fs: n, gitdir: a, cache: e }, async function(D) {
      for (const [F, I] of v)
        if (F === "rmdir" || F === "rmdir-index") {
          const $ = `${i}/${I}`;
          try {
            F === "rmdir-index" && D.delete({ filepath: I }), await n.rmdir($), t && await t({
              phase: "Updating workdir",
              loaded: ++k,
              total: P
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
      v.filter(([D]) => D === "mkdir" || D === "mkdir-index").map(async function([D, F]) {
        const I = `${i}/${F}`;
        await n.mkdir(I), t && await t({
          phase: "Updating workdir",
          loaded: ++k,
          total: P
        });
      })
    ), await jt.acquire({ fs: n, gitdir: a, cache: e }, async function(D) {
      await Promise.all(
        v.filter(
          ([F]) => F === "create" || F === "create-index" || F === "update" || F === "mkdir-index"
        ).map(async function([F, I, $, U, N]) {
          const G = `${i}/${I}`;
          try {
            if (F !== "create-index" && F !== "mkdir-index") {
              const { object: Z } = await Qe({ fs: n, cache: e, gitdir: a, oid: $ });
              if (N && await n.rm(G), U === 33188)
                await n.write(G, Z);
              else if (U === 33261)
                await n.write(G, Z, { mode: 511 });
              else if (U === 40960)
                await n.writelink(G, Z);
              else
                throw new Ee(
                  `Invalid mode 0o${U.toString(8)} detected in blob ${$}`
                );
            }
            const T = await n.lstat(G);
            U === 33261 && (T.mode = 493), F === "mkdir-index" && (T.mode = 57344), D.insert({
              filepath: I,
              stats: T,
              oid: $
            }), t && await t({
              phase: "Updating workdir",
              loaded: ++k,
              total: P
            });
          } catch (T) {
            console.log(T);
          }
        })
      );
    }), r && await r({
      previousHead: A,
      newHead: S,
      type: s != null && s.length > 0 ? "file" : "branch"
    });
  }
  if (!l) {
    const v = await oe.expand({ fs: n, gitdir: a, ref: c });
    v.startsWith("refs/heads") ? await oe.writeSymbolicRef({
      fs: n,
      gitdir: a,
      ref: "HEAD",
      value: v
    }) : await oe.writeRef({ fs: n, gitdir: a, ref: "HEAD", value: S });
  }
}
async function xu({
  fs: n,
  cache: e,
  onProgress: t,
  dir: r,
  gitdir: i,
  ref: a,
  force: o,
  filepaths: c
}) {
  let s = 0;
  return Hi({
    fs: n,
    cache: e,
    dir: r,
    gitdir: i,
    trees: [or({ ref: a }), hu(), $l()],
    map: async function(h, [l, p, w]) {
      if (h === ".") return;
      if (c && !c.some((A) => Su(h, A)))
        return null;
      switch (t && await t({ phase: "Analyzing workdir", loaded: ++s }), [!!w, !!l, !!p].map(Number).join("")) {
        // Impossible case.
        case "000":
          return;
        // Ignore workdir files that are not tracked and not part of the new commit.
        case "001":
          return o && c && c.includes(h) ? ["delete", h] : void 0;
        // New entries
        case "010":
          switch (await l.type()) {
            case "tree":
              return ["mkdir", h];
            case "blob":
              return [
                "create",
                h,
                await l.oid(),
                await l.mode()
              ];
            case "commit":
              return [
                "mkdir-index",
                h,
                await l.oid(),
                await l.mode()
              ];
            default:
              return [
                "error",
                `new entry Unhandled type ${await l.type()}`
              ];
          }
        // New entries but there is already something in the workdir there.
        case "011":
          switch (`${await l.type()}-${await p.type()}`) {
            case "tree-tree":
              return;
            case "tree-blob":
            case "blob-tree":
              return ["conflict", h];
            case "blob-blob":
              return await l.oid() !== await p.oid() ? o ? [
                "update",
                h,
                await l.oid(),
                await l.mode(),
                await l.mode() !== await p.mode()
              ] : ["conflict", h] : await l.mode() !== await p.mode() ? o ? [
                "update",
                h,
                await l.oid(),
                await l.mode(),
                !0
              ] : ["conflict", h] : [
                "create-index",
                h,
                await l.oid(),
                await l.mode()
              ];
            case "commit-tree":
              return;
            case "commit-blob":
              return ["conflict", h];
            default:
              return ["error", `new entry Unhandled type ${l.type}`];
          }
        // Something in stage but not in the commit OR the workdir.
        // Note: I verified this behavior against canonical git.
        case "100":
          return ["delete-index", h];
        // Deleted entries
        // TODO: How to handle if stage type and workdir type mismatch?
        case "101":
          switch (await w.type()) {
            case "tree":
              return ["rmdir", h];
            case "blob":
              return await w.oid() !== await p.oid() ? o ? ["delete", h] : ["conflict", h] : ["delete", h];
            case "commit":
              return ["rmdir-index", h];
            default:
              return [
                "error",
                `delete entry Unhandled type ${await w.type()}`
              ];
          }
        /* eslint-disable no-fallthrough */
        // File missing from workdir
        case "110":
        // Possibly modified entries
        case "111":
          switch (`${await w.type()}-${await l.type()}`) {
            case "tree-tree":
              return;
            case "blob-blob": {
              if (await w.oid() === await l.oid() && await w.mode() === await l.mode() && !o)
                return;
              if (p) {
                if (await p.oid() !== await w.oid() && await p.oid() !== await l.oid())
                  return o ? [
                    "update",
                    h,
                    await l.oid(),
                    await l.mode(),
                    await l.mode() !== await p.mode()
                  ] : ["conflict", h];
              } else if (o)
                return [
                  "update",
                  h,
                  await l.oid(),
                  await l.mode(),
                  await l.mode() !== await w.mode()
                ];
              return await l.mode() !== await w.mode() ? [
                "update",
                h,
                await l.oid(),
                await l.mode(),
                !0
              ] : await l.oid() !== await w.oid() ? [
                "update",
                h,
                await l.oid(),
                await l.mode(),
                !1
              ] : void 0;
            }
            case "tree-blob":
              return ["update-dir-to-blob", h, await l.oid()];
            case "blob-tree":
              return ["update-blob-to-tree", h];
            case "commit-commit":
              return [
                "mkdir-index",
                h,
                await l.oid(),
                await l.mode()
              ];
            default:
              return [
                "error",
                `update entry Unhandled type ${await w.type()}-${await l.type()}`
              ];
          }
      }
    },
    // Modify the default flat mapping
    reduce: async function(h, l) {
      return l = Ms(l), h ? h && h[0] === "rmdir" ? (l.push(h), l) : (l.unshift(h), l) : l;
    }
  });
}
async function Au({
  fs: n,
  onProgress: e,
  onPostCheckout: t,
  dir: r,
  gitdir: i = Fe.join(r, ".git"),
  remote: a = "origin",
  ref: o,
  filepaths: c,
  noCheckout: s = !1,
  noUpdateHead: h = o === void 0,
  dryRun: l = !1,
  force: p = !1,
  track: w = !0,
  cache: _ = {}
}) {
  try {
    Ue("fs", n), Ue("dir", r), Ue("gitdir", i);
    const A = o || "HEAD";
    return await ca({
      fs: new Gt(n),
      cache: _,
      onProgress: e,
      onPostCheckout: t,
      dir: r,
      gitdir: i,
      remote: a,
      ref: A,
      filepaths: c,
      noCheckout: s,
      noUpdateHead: h,
      dryRun: l,
      force: p,
      track: w
    });
  } catch (A) {
    throw A.caller = "git.checkout", A;
  }
}
const Iu = new RegExp("^refs/(heads/|tags/|remotes/)?(.*)");
function Vt(n) {
  const e = Iu.exec(n);
  return e ? e[1] === "remotes/" && n.endsWith("/HEAD") ? e[2].slice(0, -5) : e[2] : n;
}
async function on({
  fs: n,
  gitdir: e,
  fullname: t = !1,
  test: r = !1
}) {
  const i = await oe.resolve({
    fs: n,
    gitdir: e,
    ref: "HEAD",
    depth: 2
  });
  if (r)
    try {
      await oe.resolve({ fs: n, gitdir: e, ref: i });
    } catch {
      return;
    }
  if (i.startsWith("refs/"))
    return t ? i : Vt(i);
}
function Ru(n) {
  return n = n.replace(/^git@([^:]+):/, "https://$1/"), n = n.replace(/^ssh:\/\//, "https://"), n;
}
function Hs({ username: n = "", password: e = "" }) {
  return `Basic ${ae.from(`${n}:${e}`).toString("base64")}`;
}
async function br(n, e) {
  const t = Cs(n);
  for (; ; ) {
    const { value: r, done: i } = await t.next();
    if (r && await e(r), i) break;
  }
  t.return && t.return();
}
async function Xi(n) {
  let e = 0;
  const t = [];
  await br(n, (a) => {
    t.push(a), e += a.byteLength;
  });
  const r = new Uint8Array(e);
  let i = 0;
  for (const a of t)
    r.set(a, i), i += a.byteLength;
  return r;
}
function es(n) {
  let e = n.match(/^https?:\/\/([^/]+)@/);
  if (e == null) return { url: n, auth: {} };
  e = e[1];
  const [t, r] = e.split(":");
  return n = n.replace(`${e}@`, ""), { url: n, auth: { username: t, password: r } };
}
function Yi(n, e) {
  const t = e.toString(16);
  return "0".repeat(n - t.length) + t;
}
class Le {
  static flush() {
    return ae.from("0000", "utf8");
  }
  static delim() {
    return ae.from("0001", "utf8");
  }
  static encode(e) {
    typeof e == "string" && (e = ae.from(e));
    const t = e.length + 4, r = Yi(4, t);
    return ae.concat([ae.from(r, "utf8"), e]);
  }
  static streamReader(e) {
    const t = new Fs(e);
    return async function() {
      try {
        let i = await t.read(4);
        if (i == null) return !0;
        if (i = parseInt(i.toString("utf8"), 16), i === 0 || i === 1) return null;
        const a = await t.read(i - 4);
        return a ?? !0;
      } catch (i) {
        return e.error = i, !0;
      }
    };
  }
}
async function ts(n) {
  const e = {};
  let t;
  for (; t = await n(), t !== !0; ) {
    if (t === null) continue;
    t = t.toString("utf8").replace(/\n$/, "");
    const r = t.indexOf("=");
    if (r > -1) {
      const i = t.slice(0, r), a = t.slice(r + 1);
      e[i] = a;
    } else
      e[t] = !0;
  }
  return { protocolVersion: 2, capabilities2: e };
}
async function rs(n, { service: e }) {
  const t = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = Le.streamReader(n);
  let o = await a();
  for (; o === null; ) o = await a();
  if (o === !0) throw new Xr();
  if (o.includes("version 2"))
    return ts(a);
  if (o.toString("utf8").replace(/\n$/, "") !== `# service=${e}`)
    throw new Kt(`# service=${e}\\n`, o.toString("utf8"));
  let c = await a();
  for (; c === null; ) c = await a();
  if (c === !0) return { capabilities: t, refs: r, symrefs: i };
  if (c = c.toString("utf8"), c.includes("version 2"))
    return ts(a);
  const [s, h] = Oi(c, "\0", "\\x00");
  if (h.split(" ").map((l) => t.add(l)), s !== "0000000000000000000000000000000000000000 capabilities^{}") {
    const [l, p] = Oi(s, " ", " ");
    for (r.set(p, l); ; ) {
      const w = await a();
      if (w === !0) break;
      if (w !== null) {
        const [_, A] = Oi(w.toString("utf8"), " ", " ");
        r.set(A, _);
      }
    }
  }
  for (const l of t)
    if (l.startsWith("symref=")) {
      const p = l.match(/symref=([^:]+):(.*)/);
      p.length === 3 && i.set(p[1], p[2]);
    }
  return { protocolVersion: 1, capabilities: t, refs: r, symrefs: i };
}
function Oi(n, e, t) {
  const r = n.trim().split(e);
  if (r.length !== 2)
    throw new Kt(
      `Two strings separated by '${t}'`,
      n.toString("utf8")
    );
  return r;
}
const ns = (n, e) => n.endsWith("?") ? `${n}${e}` : `${n}/${e.replace(/^https?:\/\//, "")}`, is = (n, e) => {
  (e.username || e.password) && (n.Authorization = Hs(e)), e.headers && Object.assign(n, e.headers);
}, Pi = async (n) => {
  try {
    const e = ae.from(await Xi(n.body)), t = e.toString("utf8");
    return { preview: t.length < 256 ? t : t.slice(0, 256) + "...", response: t, data: e };
  } catch {
    return {};
  }
};
class Dr {
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
    onAuthSuccess: i,
    onAuthFailure: a,
    corsProxy: o,
    service: c,
    url: s,
    headers: h,
    protocolVersion: l
  }) {
    let { url: p, auth: w } = es(s);
    const _ = o ? ns(o, p) : p;
    (w.username || w.password) && (h.Authorization = Hs(w)), l === 2 && (h["Git-Protocol"] = "version=2");
    let A, S, v = !1;
    do
      if (A = await e.request({
        onProgress: t,
        method: "GET",
        url: `${_}/info/refs?service=${c}`,
        headers: h
      }), S = !1, A.statusCode === 401 || A.statusCode === 203) {
        const R = v ? a : r;
        if (R) {
          if (w = await R(p, {
            ...w,
            headers: { ...h }
          }), w && w.cancel)
            throw new vr();
          w && (is(h, w), v = !0, S = !0);
        }
      } else A.statusCode === 200 && v && i && await i(p, w);
    while (S);
    if (A.statusCode !== 200) {
      const { response: R } = await Pi(A);
      throw new cr(A.statusCode, A.statusMessage, R);
    }
    if (A.headers["content-type"] === `application/x-${c}-advertisement`) {
      const R = await rs(A.body, { service: c });
      return R.auth = w, R;
    } else {
      const { preview: R, response: x, data: k } = await Pi(A);
      try {
        const P = await rs([k], { service: c });
        return P.auth = w, P;
      } catch {
        throw new en(R, x);
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
    service: i,
    url: a,
    auth: o,
    body: c,
    headers: s
  }) {
    const h = es(a);
    h && (a = h.url), r && (a = ns(r, a)), s["content-type"] = `application/x-${i}-request`, s.accept = `application/x-${i}-result`, is(s, o);
    const l = await e.request({
      onProgress: t,
      method: "POST",
      url: `${a}/${i}`,
      body: c,
      headers: s
    });
    if (l.statusCode !== 200) {
      const { response: p } = Pi(l);
      throw new cr(l.statusCode, l.statusMessage, p);
    }
    return l;
  }
}
function Tu({ url: n }) {
  if (n.startsWith("git@"))
    return {
      transport: "ssh",
      address: n
    };
  const e = n.match(/(\w+)(:\/\/|::)(.*)/);
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
class Gs {
  static getRemoteHelperFor({ url: e }) {
    const t = /* @__PURE__ */ new Map();
    t.set("http", Dr), t.set("https", Dr);
    const r = Tu({ url: e });
    if (!r)
      throw new rn(e);
    if (t.has(r.transport))
      return t.get(r.transport);
    throw new tn(
      e,
      r.transport,
      r.transport === "ssh" ? Ru(e) : void 0
    );
  }
}
let Ft = null;
class hr {
  static async read({ fs: e, gitdir: t }) {
    Ft === null && (Ft = new $r());
    const r = Fe.join(t, "shallow"), i = /* @__PURE__ */ new Set();
    return await Ft.acquire(r, async function() {
      const a = await e.read(r, { encoding: "utf8" });
      if (a === null || a.trim() === "") return i;
      a.trim().split(`
`).map((o) => i.add(o));
    }), i;
  }
  static async write({ fs: e, gitdir: t, oids: r }) {
    Ft === null && (Ft = new $r());
    const i = Fe.join(t, "shallow");
    if (r.size > 0) {
      const a = [...r].join(`
`) + `
`;
      await Ft.acquire(i, async function() {
        await e.write(i, a, {
          encoding: "utf8"
        });
      });
    } else
      await Ft.acquire(i, async function() {
        await e.rm(i);
      });
  }
}
async function $u({ fs: n, gitdir: e, oid: t }) {
  const r = `objects/${t.slice(0, 2)}/${t.slice(2)}`;
  return n.exists(`${e}/${r}`);
}
async function Bu({
  fs: n,
  cache: e,
  gitdir: t,
  oid: r,
  getExternalRefDelta: i
}) {
  let a = await n.readdir(Fe.join(t, "objects/pack"));
  a = a.filter((o) => o.endsWith(".idx"));
  for (const o of a) {
    const c = `${t}/objects/pack/${o}`, s = await Ns({
      fs: n,
      cache: e,
      filename: c,
      getExternalRefDelta: i
    });
    if (s.error) throw new Ee(s.error);
    if (s.offsets.has(r))
      return !0;
  }
  return !1;
}
async function as({
  fs: n,
  cache: e,
  gitdir: t,
  oid: r,
  format: i = "content"
}) {
  const a = (c) => Qe({ fs: n, cache: e, gitdir: t, oid: c });
  let o = await $u({ fs: n, gitdir: t, oid: r });
  return o || (o = await Bu({
    fs: n,
    cache: e,
    gitdir: t,
    oid: r,
    getExternalRefDelta: a
  })), o;
}
function Ou(n) {
  const i = "5041434b" + "00000002" + "00000000";
  return n.slice(0, 12).toString("hex") === i;
}
function Ws(n, e) {
  const t = n.map((r) => r.split("=", 1)[0]);
  return e.filter((r) => {
    const i = r.split("=", 1)[0];
    return t.includes(i);
  });
}
const la = {
  agent: "git/isomorphic-git@1.30.1"
};
class Tr {
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
function Pu(n) {
  const e = n.indexOf("\r"), t = n.indexOf(`
`);
  return e === -1 && t === -1 ? -1 : e === -1 ? t + 1 : t === -1 ? e + 1 : t === e + 1 ? t + 1 : Math.min(e, t) + 1;
}
function Zs(n) {
  const e = new Tr();
  let t = "";
  return (async () => (await br(n, (r) => {
    for (r = r.toString("utf8"), t += r; ; ) {
      const i = Pu(t);
      if (i === -1) break;
      e.write(t.slice(0, i)), t = t.slice(i);
    }
  }), t.length > 0 && e.write(t), e.end()))(), e;
}
class Vs {
  static demux(e) {
    const t = Le.streamReader(e), r = new Tr(), i = new Tr(), a = new Tr(), o = async function() {
      const c = await t();
      if (c === null) return o();
      if (c === !0) {
        r.end(), a.end(), e.error ? i.destroy(e.error) : i.end();
        return;
      }
      switch (c[0]) {
        case 1: {
          i.write(c.slice(1));
          break;
        }
        case 2: {
          a.write(c.slice(1));
          break;
        }
        case 3: {
          const s = c.slice(1);
          a.write(s), r.end(), a.end(), i.destroy(new Error(s.toString("utf8")));
          return;
        }
        default:
          r.write(c);
      }
      o();
    };
    return o(), {
      packetlines: r,
      packfile: i,
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
async function Cu(n) {
  const { packetlines: e, packfile: t, progress: r } = Vs.demux(n), i = [], a = [], o = [];
  let c = !1, s = !1;
  return new Promise((h, l) => {
    br(e, (p) => {
      const w = p.toString("utf8").trim();
      if (w.startsWith("shallow")) {
        const _ = w.slice(-41).trim();
        _.length !== 40 && l(new zt(_)), i.push(_);
      } else if (w.startsWith("unshallow")) {
        const _ = w.slice(-41).trim();
        _.length !== 40 && l(new zt(_)), a.push(_);
      } else if (w.startsWith("ACK")) {
        const [, _, A] = w.split(" ");
        o.push({ oid: _, status: A }), A || (s = !0);
      } else w.startsWith("NAK") ? (c = !0, s = !0) : (s = !0, c = !0);
      s && (n.error ? l(n.error) : h({ shallows: i, unshallows: a, acks: o, nak: c, packfile: t, progress: r }));
    }).finally(() => {
      s || (n.error ? l(n.error) : h({ shallows: i, unshallows: a, acks: o, nak: c, packfile: t, progress: r }));
    });
  });
}
function Fu({
  capabilities: n = [],
  wants: e = [],
  haves: t = [],
  shallows: r = [],
  depth: i = null,
  since: a = null,
  exclude: o = []
}) {
  const c = [];
  e = [...new Set(e)];
  let s = ` ${n.join(" ")}`;
  for (const h of e)
    c.push(Le.encode(`want ${h}${s}
`)), s = "";
  for (const h of r)
    c.push(Le.encode(`shallow ${h}
`));
  i !== null && c.push(Le.encode(`deepen ${i}
`)), a !== null && c.push(
    Le.encode(`deepen-since ${Math.floor(a.valueOf() / 1e3)}
`)
  );
  for (const h of o)
    c.push(Le.encode(`deepen-not ${h}
`));
  c.push(Le.flush());
  for (const h of t)
    c.push(Le.encode(`have ${h}
`));
  return c.push(Le.encode(`done
`)), c;
}
async function ua({
  fs: n,
  cache: e,
  http: t,
  onProgress: r,
  onMessage: i,
  onAuth: a,
  onAuthSuccess: o,
  onAuthFailure: c,
  gitdir: s,
  ref: h,
  remoteRef: l,
  remote: p,
  url: w,
  corsProxy: _,
  depth: A = null,
  since: S = null,
  exclude: v = [],
  relative: R = !1,
  tags: x = !1,
  singleBranch: k = !1,
  headers: P = {},
  prune: D = !1,
  pruneTags: F = !1
}) {
  const I = h || await on({ fs: n, gitdir: s, test: !0 }), $ = await ht.get({ fs: n, gitdir: s }), U = p || I && await $.get(`branch.${I}.remote`) || "origin", N = w || await $.get(`remote.${U}.url`);
  if (typeof N > "u")
    throw new ft("remote OR url");
  const G = l || I && await $.get(`branch.${I}.merge`) || h || "HEAD";
  _ === void 0 && (_ = await $.get("http.corsProxy"));
  const T = Gs.getRemoteHelperFor({ url: N }), Z = await T.discover({
    http: t,
    onAuth: a,
    onAuthSuccess: o,
    onAuthFailure: c,
    corsProxy: _,
    service: "git-upload-pack",
    url: N,
    headers: P,
    protocolVersion: 1
  }), Q = Z.auth, se = Z.refs;
  if (se.size === 0)
    return {
      defaultBranch: null,
      fetchHead: null,
      fetchHeadDescription: null
    };
  if (A !== null && !Z.capabilities.has("shallow"))
    throw new Ut("shallow", "depth");
  if (S !== null && !Z.capabilities.has("deepen-since"))
    throw new Ut("deepen-since", "since");
  if (v.length > 0 && !Z.capabilities.has("deepen-not"))
    throw new Ut("deepen-not", "exclude");
  if (R === !0 && !Z.capabilities.has("deepen-relative"))
    throw new Ut("deepen-relative", "relative");
  const { oid: V, fullref: q } = oe.resolveAgainstMap({
    ref: G,
    map: se
  });
  for (const ee of se.keys())
    ee === q || ee === "HEAD" || ee.startsWith("refs/heads/") || x && ee.startsWith("refs/tags/") || se.delete(ee);
  const K = Ws(
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
      `agent=${la.agent}`
    ]
  );
  R && K.push("deepen-relative");
  const ne = k ? [V] : se.values(), we = k ? [I] : await oe.listRefs({
    fs: n,
    gitdir: s,
    filepath: "refs"
  });
  let ge = [];
  for (let ee of we)
    try {
      ee = await oe.expand({ fs: n, gitdir: s, ref: ee });
      const fe = await oe.resolve({ fs: n, gitdir: s, ref: ee });
      await as({ fs: n, cache: e, gitdir: s, oid: fe }) && ge.push(fe);
    } catch {
    }
  ge = [...new Set(ge)];
  const ce = await hr.read({ fs: n, gitdir: s }), _e = Z.capabilities.has("shallow") ? [...ce] : [], ke = Fu({
    capabilities: K,
    wants: ne,
    haves: ge,
    shallows: _e,
    depth: A,
    since: S,
    exclude: v
  }), Ce = ae.from(await Xi(ke)), me = await T.connect({
    http: t,
    onProgress: r,
    corsProxy: _,
    service: "git-upload-pack",
    url: N,
    auth: Q,
    body: [Ce],
    headers: P
  }), de = await Cu(me.body);
  me.headers && (de.headers = me.headers);
  for (const ee of de.shallows)
    if (!ce.has(ee))
      try {
        const { object: fe } = await Qe({ fs: n, cache: e, gitdir: s, oid: ee }), Be = new je(fe), Oe = await Promise.all(
          Be.headers().parent.map((Ae) => as({ fs: n, cache: e, gitdir: s, oid: Ae }))
        );
        Oe.length === 0 || Oe.every((Ae) => Ae) || ce.add(ee);
      } catch {
        ce.add(ee);
      }
  for (const ee of de.unshallows)
    ce.delete(ee);
  if (await hr.write({ fs: n, gitdir: s, oids: ce }), k) {
    const ee = /* @__PURE__ */ new Map([[q, V]]), fe = /* @__PURE__ */ new Map();
    let Be = 10, Oe = q;
    for (; Be--; ) {
      const pe = Z.symrefs.get(Oe);
      if (pe === void 0) break;
      fe.set(Oe, pe), Oe = pe;
    }
    const Re = se.get(Oe);
    Re && ee.set(Oe, Re);
    const { pruned: Ae } = await oe.updateRemoteRefs({
      fs: n,
      gitdir: s,
      remote: U,
      refs: ee,
      symrefs: fe,
      tags: x,
      prune: D
    });
    D && (de.pruned = Ae);
  } else {
    const { pruned: ee } = await oe.updateRemoteRefs({
      fs: n,
      gitdir: s,
      remote: U,
      refs: se,
      symrefs: Z.symrefs,
      tags: x,
      prune: D,
      pruneTags: F
    });
    D && (de.pruned = ee);
  }
  if (de.HEAD = Z.symrefs.get("HEAD"), de.HEAD === void 0) {
    const { oid: ee } = oe.resolveAgainstMap({
      ref: "HEAD",
      map: se
    });
    for (const [fe, Be] of se.entries())
      if (fe !== "HEAD" && Be === ee) {
        de.HEAD = fe;
        break;
      }
  }
  const Se = q.startsWith("refs/tags") ? "tag" : "branch";
  if (de.FETCH_HEAD = {
    oid: V,
    description: `${Se} '${Vt(q)}' of ${N}`
  }, r || i) {
    const ee = Zs(de.progress);
    br(ee, async (fe) => {
      if (i && await i(fe), r) {
        const Be = fe.match(/([^:]*).*\((\d+?)\/(\d+?)\)/);
        Be && await r({
          phase: Be[1].trim(),
          loaded: parseInt(Be[2], 10),
          total: parseInt(Be[3], 10)
        });
      }
    });
  }
  const Te = ae.from(await Xi(de.packfile));
  if (me.body.error) throw me.body.error;
  const ve = Te.slice(-20).toString("hex"), xe = {
    defaultBranch: de.HEAD,
    fetchHead: de.FETCH_HEAD.oid,
    fetchHeadDescription: de.FETCH_HEAD.description
  };
  if (de.headers && (xe.headers = de.headers), D && (xe.pruned = de.pruned), ve !== "" && !Ou(Te)) {
    xe.packfile = `objects/pack/pack-${ve}.pack`;
    const ee = Fe.join(s, xe.packfile);
    await n.write(ee, Te);
    const fe = (Oe) => Qe({ fs: n, cache: e, gitdir: s, oid: Oe }), Be = await sr.fromPack({
      pack: Te,
      getExternalRefDelta: fe,
      onProgress: r
    });
    await n.write(ee.replace(/\.pack$/, ".idx"), await Be.toBuffer());
  }
  return xe;
}
async function Du({
  fs: n,
  bare: e = !1,
  dir: t,
  gitdir: r = e ? t : Fe.join(t, ".git"),
  defaultBranch: i = "master"
}) {
  if (await n.exists(r + "/config")) return;
  let a = [
    "hooks",
    "info",
    "objects/info",
    "objects/pack",
    "refs/heads",
    "refs/tags"
  ];
  a = a.map((o) => r + "/" + o);
  for (const o of a)
    await n.mkdir(o);
  await n.write(
    r + "/config",
    `[core]
	repositoryformatversion = 0
	filemode = false
	bare = ${e}
` + (e ? "" : `	logallrefupdates = true
`) + `	symlinks = false
	ignorecase = true
`
  ), await n.write(r + "/HEAD", `ref: refs/heads/${i}
`);
}
async function Nu({
  fs: n,
  cache: e,
  http: t,
  onProgress: r,
  onMessage: i,
  onAuth: a,
  onAuthSuccess: o,
  onAuthFailure: c,
  onPostCheckout: s,
  dir: h,
  gitdir: l,
  url: p,
  corsProxy: w,
  ref: _,
  remote: A,
  depth: S,
  since: v,
  exclude: R,
  relative: x,
  singleBranch: k,
  noCheckout: P,
  noTags: D,
  headers: F
}) {
  try {
    if (await Du({ fs: n, gitdir: l }), await ku({ fs: n, gitdir: l, remote: A, url: p, force: !1 }), w) {
      const U = await ht.get({ fs: n, gitdir: l });
      await U.set("http.corsProxy", w), await ht.save({ fs: n, gitdir: l, config: U });
    }
    const { defaultBranch: I, fetchHead: $ } = await ua({
      fs: n,
      cache: e,
      http: t,
      onProgress: r,
      onMessage: i,
      onAuth: a,
      onAuthSuccess: o,
      onAuthFailure: c,
      gitdir: l,
      ref: _,
      remote: A,
      corsProxy: w,
      depth: S,
      since: v,
      exclude: R,
      relative: x,
      singleBranch: k,
      headers: F,
      tags: !D
    });
    if ($ === null) return;
    _ = _ || I, _ = _.replace("refs/heads/", ""), await ca({
      fs: n,
      cache: e,
      onProgress: r,
      onPostCheckout: s,
      dir: h,
      gitdir: l,
      ref: _,
      remote: A,
      noCheckout: P
    });
  } catch (I) {
    throw await n.rmdir(l, { recursive: !0, maxRetries: 10 }).catch(() => {
    }), I;
  }
}
async function Mu({
  fs: n,
  http: e,
  onProgress: t,
  onMessage: r,
  onAuth: i,
  onAuthSuccess: a,
  onAuthFailure: o,
  onPostCheckout: c,
  dir: s,
  gitdir: h = Fe.join(s, ".git"),
  url: l,
  corsProxy: p = void 0,
  ref: w = void 0,
  remote: _ = "origin",
  depth: A = void 0,
  since: S = void 0,
  exclude: v = [],
  relative: R = !1,
  singleBranch: x = !1,
  noCheckout: k = !1,
  noTags: P = !1,
  headers: D = {},
  cache: F = {}
}) {
  try {
    return Ue("fs", n), Ue("http", e), Ue("gitdir", h), k || Ue("dir", s), Ue("url", l), await Nu({
      fs: new Gt(n),
      cache: F,
      http: e,
      onProgress: t,
      onMessage: r,
      onAuth: i,
      onAuthSuccess: a,
      onAuthFailure: o,
      onPostCheckout: c,
      dir: s,
      gitdir: h,
      url: l,
      corsProxy: p,
      ref: w,
      remote: _,
      depth: A,
      since: S,
      exclude: v,
      relative: R,
      singleBranch: x,
      noCheckout: k,
      noTags: P,
      headers: D
    });
  } catch (I) {
    throw I.caller = "git.clone", I;
  }
}
async function Xs({ fs: n, cache: e, gitdir: t, oids: r }) {
  const i = {}, a = r.length;
  let o = r.map((c, s) => ({ index: s, oid: c }));
  for (; o.length; ) {
    const c = /* @__PURE__ */ new Set();
    for (const { oid: h, index: l } of o)
      i[h] || (i[h] = /* @__PURE__ */ new Set()), i[h].add(l), i[h].size === a && c.add(h);
    if (c.size > 0)
      return [...c];
    const s = /* @__PURE__ */ new Map();
    for (const { oid: h, index: l } of o)
      try {
        const { object: p } = await Qe({ fs: n, cache: e, gitdir: t, oid: h }), w = je.from(p), { parent: _ } = w.parseHeaders();
        for (const A of _)
          (!i[A] || !i[A].has(l)) && s.set(A + ":" + l, { oid: A, index: l });
      } catch {
      }
    o = Array.from(s.values());
  }
  return [];
}
const Ci = /^.*(\r?\n|$)/gm;
function Uu({ branches: n, contents: e }) {
  const t = n[1], r = n[2], i = e[0], a = e[1], o = e[2], c = a.match(Ci), s = i.match(Ci), h = o.match(Ci), l = _l(c, s, h), p = 7;
  let w = "", _ = !0;
  for (const A of l)
    A.ok && (w += A.ok.join("")), A.conflict && (_ = !1, w += `${"<".repeat(p)} ${t}
`, w += A.conflict.a.join(""), w += `${"=".repeat(p)}
`, w += A.conflict.b.join(""), w += `${">".repeat(p)} ${r}
`);
  return { cleanMerge: _, mergedText: w };
}
async function ju({
  fs: n,
  cache: e,
  dir: t,
  gitdir: r = Fe.join(t, ".git"),
  index: i,
  ourOid: a,
  baseOid: o,
  theirOid: c,
  ourName: s = "ours",
  baseName: h = "base",
  theirName: l = "theirs",
  dryRun: p = !1,
  abortOnConflict: w = !0,
  mergeDriver: _
}) {
  const A = or({ ref: a }), S = or({ ref: o }), v = or({ ref: c }), R = [], x = [], k = [], P = [], D = await Hi({
    fs: n,
    cache: e,
    dir: t,
    gitdir: r,
    trees: [A, S, v],
    map: async function(F, [I, $, U]) {
      const N = Li(F), G = await Qo(I, $), T = await Qo(U, $);
      switch (`${G}-${T}`) {
        case "false-false":
          return {
            mode: await $.mode(),
            path: N,
            oid: await $.oid(),
            type: await $.type()
          };
        case "false-true":
          return U ? {
            mode: await U.mode(),
            path: N,
            oid: await U.oid(),
            type: await U.type()
          } : void 0;
        case "true-false":
          return I ? {
            mode: await I.mode(),
            path: N,
            oid: await I.oid(),
            type: await I.type()
          } : void 0;
        case "true-true": {
          if (I && $ && U && await I.type() === "blob" && await $.type() === "blob" && await U.type() === "blob")
            return Lu({
              fs: n,
              gitdir: r,
              path: N,
              ours: I,
              base: $,
              theirs: U,
              ourName: s,
              baseName: h,
              theirName: l,
              mergeDriver: _
            }).then(async (Z) => {
              if (Z.cleanMerge)
                w || i.insert({ filepath: F, oid: Z.mergeResult.oid, stage: 0 });
              else if (R.push(F), x.push(F), !w) {
                const Q = await $.oid(), se = await I.oid(), V = await U.oid();
                i.delete({ filepath: F }), i.insert({ filepath: F, oid: Q, stage: 1 }), i.insert({ filepath: F, oid: se, stage: 2 }), i.insert({ filepath: F, oid: V, stage: 3 });
              }
              return Z.mergeResult;
            });
          if ($ && !I && U && await $.type() === "blob" && await U.type() === "blob") {
            if (R.push(F), k.push(F), !w) {
              const Z = await $.oid(), Q = await U.oid();
              i.delete({ filepath: F }), i.insert({ filepath: F, oid: Z, stage: 1 }), i.insert({ filepath: F, oid: Q, stage: 3 });
            }
            return {
              mode: await U.mode(),
              oid: await U.oid(),
              type: "blob",
              path: N
            };
          }
          if ($ && I && !U && await $.type() === "blob" && await I.type() === "blob") {
            if (R.push(F), P.push(F), !w) {
              const Z = await $.oid(), Q = await I.oid();
              i.delete({ filepath: F }), i.insert({ filepath: F, oid: Z, stage: 1 }), i.insert({ filepath: F, oid: Q, stage: 2 });
            }
            return {
              mode: await I.mode(),
              oid: await I.oid(),
              type: "blob",
              path: N
            };
          }
          if ($ && !I && !U && await $.type() === "blob")
            return;
          throw new gr();
        }
      }
    },
    /**
     * @param {TreeEntry} [parent]
     * @param {Array<TreeEntry>} children
     */
    reduce: R.length !== 0 && (!t || w) ? void 0 : async (F, I) => {
      const $ = I.filter(Boolean);
      if (F && !(F && F.type === "tree" && $.length === 0)) {
        if ($.length > 0) {
          const N = new Et($).toObject(), G = await an({
            fs: n,
            gitdir: r,
            type: "tree",
            object: N,
            dryRun: p
          });
          F.oid = G;
        }
        return F;
      }
    }
  });
  return R.length !== 0 ? (t && !w && await Hi({
    fs: n,
    cache: e,
    dir: t,
    gitdir: r,
    trees: [or({ ref: D.oid })],
    map: async function(F, [I]) {
      const $ = `${t}/${F}`;
      if (await I.type() === "blob") {
        const U = await I.mode(), N = new TextDecoder().decode(await I.content());
        await n.write($, N, { mode: U });
      }
      return !0;
    }
  }), new _r(
    R,
    x,
    k,
    P
  )) : D.oid;
}
async function Lu({
  fs: n,
  gitdir: e,
  path: t,
  ours: r,
  base: i,
  theirs: a,
  ourName: o,
  theirName: c,
  baseName: s,
  dryRun: h,
  mergeDriver: l = Uu
}) {
  const p = "blob", w = await i.mode() === await r.mode() ? await a.mode() : await r.mode();
  if (await r.oid() === await a.oid())
    return {
      cleanMerge: !0,
      mergeResult: { mode: w, path: t, oid: await r.oid(), type: p }
    };
  if (await r.oid() === await i.oid())
    return {
      cleanMerge: !0,
      mergeResult: { mode: w, path: t, oid: await a.oid(), type: p }
    };
  if (await a.oid() === await i.oid())
    return {
      cleanMerge: !0,
      mergeResult: { mode: w, path: t, oid: await r.oid(), type: p }
    };
  const _ = ae.from(await r.content()).toString("utf8"), A = ae.from(await i.content()).toString("utf8"), S = ae.from(await a.content()).toString("utf8"), { mergedText: v, cleanMerge: R } = await l({
    branches: [s, o, c],
    contents: [A, _, S],
    path: t
  }), x = await an({
    fs: n,
    gitdir: e,
    type: "blob",
    object: ae.from(v, "utf8"),
    dryRun: h
  });
  return { cleanMerge: R, mergeResult: { mode: w, path: t, oid: x, type: p } };
}
async function zu({
  fs: n,
  cache: e,
  dir: t,
  gitdir: r,
  ours: i,
  theirs: a,
  fastForward: o = !0,
  fastForwardOnly: c = !1,
  dryRun: s = !1,
  noUpdateBranch: h = !1,
  abortOnConflict: l = !0,
  message: p,
  author: w,
  committer: _,
  signingKey: A,
  onSign: S,
  mergeDriver: v
}) {
  i === void 0 && (i = await on({ fs: n, gitdir: r, fullname: !0 })), i = await oe.expand({
    fs: n,
    gitdir: r,
    ref: i
  }), a = await oe.expand({
    fs: n,
    gitdir: r,
    ref: a
  });
  const R = await oe.resolve({
    fs: n,
    gitdir: r,
    ref: i
  }), x = await oe.resolve({
    fs: n,
    gitdir: r,
    ref: a
  }), k = await Xs({
    fs: n,
    cache: e,
    gitdir: r,
    oids: [R, x]
  });
  if (k.length !== 1)
    throw new gr();
  const P = k[0];
  if (P === x)
    return {
      oid: R,
      alreadyMerged: !0
    };
  if (o && P === R)
    return !s && !h && await oe.writeRef({ fs: n, gitdir: r, ref: i, value: x }), {
      oid: x,
      fastForward: !0
    };
  {
    if (c)
      throw new Yr();
    const D = await jt.acquire(
      { fs: n, gitdir: r, cache: e, allowUnmerged: !1 },
      async (I) => ju({
        fs: n,
        cache: e,
        dir: t,
        gitdir: r,
        index: I,
        ourOid: R,
        theirOid: x,
        baseOid: P,
        ourName: Vt(i),
        baseName: "base",
        theirName: Vt(a),
        dryRun: s,
        abortOnConflict: l,
        mergeDriver: v
      })
    );
    if (D instanceof _r) throw D;
    return p || (p = `Merge branch '${Vt(a)}' into ${Vt(
      i
    )}`), {
      oid: await bu({
        fs: n,
        cache: e,
        gitdir: r,
        message: p,
        ref: i,
        tree: D,
        parent: [R, x],
        author: w,
        committer: _,
        signingKey: A,
        onSign: S,
        dryRun: s,
        noUpdateBranch: h
      }),
      tree: D,
      mergeCommit: !0
    };
  }
}
async function Ys({
  fs: n,
  cache: e,
  http: t,
  onProgress: r,
  onMessage: i,
  onAuth: a,
  onAuthSuccess: o,
  onAuthFailure: c,
  dir: s,
  gitdir: h,
  ref: l,
  url: p,
  remote: w,
  remoteRef: _,
  prune: A,
  pruneTags: S,
  fastForward: v,
  fastForwardOnly: R,
  corsProxy: x,
  singleBranch: k,
  headers: P,
  author: D,
  committer: F,
  signingKey: I
}) {
  try {
    if (!l) {
      const N = await on({ fs: n, gitdir: h });
      if (!N)
        throw new ft("ref");
      l = N;
    }
    const { fetchHead: $, fetchHeadDescription: U } = await ua({
      fs: n,
      cache: e,
      http: t,
      onProgress: r,
      onMessage: i,
      onAuth: a,
      onAuthSuccess: o,
      onAuthFailure: c,
      gitdir: h,
      corsProxy: x,
      ref: l,
      url: p,
      remote: w,
      remoteRef: _,
      singleBranch: k,
      headers: P,
      prune: A,
      pruneTags: S
    });
    await zu({
      fs: n,
      cache: e,
      gitdir: h,
      ours: l,
      theirs: $,
      fastForward: v,
      fastForwardOnly: R,
      message: `Merge ${U}`,
      author: D,
      committer: F,
      signingKey: I,
      dryRun: !1,
      noUpdateBranch: !1
    }), await ca({
      fs: n,
      cache: e,
      onProgress: r,
      dir: s,
      gitdir: h,
      ref: l,
      remote: w,
      noCheckout: !1
    });
  } catch ($) {
    throw $.caller = "git.pull", $;
  }
}
async function qu({
  fs: n,
  http: e,
  onProgress: t,
  onMessage: r,
  onAuth: i,
  onAuthSuccess: a,
  onAuthFailure: o,
  dir: c,
  gitdir: s = Fe.join(c, ".git"),
  ref: h,
  url: l,
  remote: p,
  remoteRef: w,
  corsProxy: _,
  singleBranch: A,
  headers: S = {},
  cache: v = {}
}) {
  try {
    Ue("fs", n), Ue("http", e), Ue("gitdir", s);
    const R = {
      name: "",
      email: "",
      timestamp: Date.now(),
      timezoneOffset: 0
    };
    return await Ys({
      fs: new Gt(n),
      cache: v,
      http: e,
      onProgress: t,
      onMessage: r,
      onAuth: i,
      onAuthSuccess: a,
      onAuthFailure: o,
      dir: c,
      gitdir: s,
      ref: h,
      url: l,
      remote: p,
      remoteRef: w,
      fastForwardOnly: !0,
      corsProxy: _,
      singleBranch: A,
      headers: S,
      author: R,
      committer: R
    });
  } catch (R) {
    throw R.caller = "git.fastForward", R;
  }
}
async function Hu({
  fs: n,
  http: e,
  onProgress: t,
  onMessage: r,
  onAuth: i,
  onAuthSuccess: a,
  onAuthFailure: o,
  dir: c,
  gitdir: s = Fe.join(c, ".git"),
  ref: h,
  remote: l,
  remoteRef: p,
  url: w,
  corsProxy: _,
  depth: A = null,
  since: S = null,
  exclude: v = [],
  relative: R = !1,
  tags: x = !1,
  singleBranch: k = !1,
  headers: P = {},
  prune: D = !1,
  pruneTags: F = !1,
  cache: I = {}
}) {
  try {
    return Ue("fs", n), Ue("http", e), Ue("gitdir", s), await ua({
      fs: new Gt(n),
      cache: I,
      http: e,
      onProgress: t,
      onMessage: r,
      onAuth: i,
      onAuthSuccess: a,
      onAuthFailure: o,
      gitdir: s,
      ref: h,
      remote: l,
      remoteRef: p,
      url: w,
      corsProxy: _,
      depth: A,
      since: S,
      exclude: v,
      relative: R,
      tags: x,
      singleBranch: k,
      headers: P,
      prune: D,
      pruneTags: F
    });
  } catch ($) {
    throw $.caller = "git.fetch", $;
  }
}
function Gu(n, e, t, r) {
  const i = [];
  for (const [a, o] of n.refs) {
    if (e && !a.startsWith(e)) continue;
    if (a.endsWith("^{}")) {
      if (r) {
        const s = a.replace("^{}", ""), h = i[i.length - 1], l = h.ref === s ? h : i.find((p) => p.ref === s);
        if (l === void 0)
          throw new Error("I did not expect this to happen");
        l.peeled = o;
      }
      continue;
    }
    const c = { ref: a, oid: o };
    t && n.symrefs.has(a) && (c.target = n.symrefs.get(a)), i.push(c);
  }
  return i;
}
async function Wu({
  fs: n,
  cache: e,
  gitdir: t,
  oid: r,
  ancestor: i,
  depth: a
}) {
  const o = await hr.read({ fs: n, gitdir: t });
  if (!r)
    throw new ft("oid");
  if (r === i) return !1;
  const c = [r], s = /* @__PURE__ */ new Set();
  let h = 0;
  for (; c.length; ) {
    if (h++ === a)
      throw new Qr(a);
    const l = c.shift(), { type: p, object: w } = await Qe({
      fs: n,
      cache: e,
      gitdir: t,
      oid: l
    });
    if (p !== "commit")
      throw new Tt(l, p, "commit");
    const _ = je.from(w).parse();
    for (const A of _.parent)
      if (A === i) return !0;
    if (!o.has(l))
      for (const A of _.parent)
        s.has(A) || (c.push(A), s.add(A));
  }
  return !1;
}
async function Zu(n) {
  const e = Le.streamReader(n), t = [];
  let r;
  for (; r = await e(), r !== !0; ) {
    if (r === null) continue;
    r = r.toString("utf8").replace(/\n$/, "");
    const [i, a, ...o] = r.split(" "), c = { ref: a, oid: i };
    for (const s of o) {
      const [h, l] = s.split(":");
      h === "symref-target" ? c.target = l : h === "peeled" && (c.peeled = l);
    }
    t.push(c);
  }
  return t;
}
async function Vu({ prefix: n, symrefs: e, peelTags: t }) {
  const r = [];
  return r.push(Le.encode(`command=ls-refs
`)), r.push(Le.encode(`agent=${la.agent}
`)), (t || e || n) && r.push(Le.delim()), t && r.push(Le.encode("peel")), e && r.push(Le.encode("symrefs")), n && r.push(Le.encode(`ref-prefix ${n}`)), r.push(Le.flush()), r;
}
async function Xu({
  http: n,
  onAuth: e,
  onAuthSuccess: t,
  onAuthFailure: r,
  corsProxy: i,
  url: a,
  headers: o = {},
  forPush: c = !1,
  protocolVersion: s = 2,
  prefix: h,
  symrefs: l,
  peelTags: p
}) {
  try {
    Ue("http", n), Ue("url", a);
    const w = await Dr.discover({
      http: n,
      onAuth: e,
      onAuthSuccess: t,
      onAuthFailure: r,
      corsProxy: i,
      service: c ? "git-receive-pack" : "git-upload-pack",
      url: a,
      headers: o,
      protocolVersion: s
    });
    if (w.protocolVersion === 1)
      return Gu(w, h, l, p);
    const _ = await Vu({ prefix: h, symrefs: l, peelTags: p }), A = await Dr.connect({
      http: n,
      auth: w.auth,
      headers: o,
      corsProxy: i,
      service: c ? "git-receive-pack" : "git-upload-pack",
      url: a,
      body: _
    });
    return Zu(A.body);
  } catch (w) {
    throw w.caller = "git.listServerRefs", w;
  }
}
function Yu(n, e) {
  return n.committer.timestamp - e.committer.timestamp;
}
const Ku = "e69de29bb2d1d6434b8b29ae775ad8c2e48c5391";
async function os({ fs: n, cache: e, gitdir: t, oid: r, fileId: i }) {
  if (i === Ku) return;
  const a = r;
  let o;
  const c = await fr({ fs: n, cache: e, gitdir: t, oid: r }), s = c.tree;
  return i === c.oid ? o = c.path : (o = await Ks({
    fs: n,
    cache: e,
    gitdir: t,
    tree: s,
    fileId: i,
    oid: a
  }), Array.isArray(o) && (o.length === 0 ? o = void 0 : o.length === 1 && (o = o[0]))), o;
}
async function Ks({
  fs: n,
  cache: e,
  gitdir: t,
  tree: r,
  fileId: i,
  oid: a,
  filepaths: o = [],
  parentPath: c = ""
}) {
  const s = r.entries().map(function(h) {
    let l;
    return h.oid === i ? (l = Fe.join(c, h.path), o.push(l)) : h.type === "tree" && (l = Qe({
      fs: n,
      cache: e,
      gitdir: t,
      oid: h.oid
    }).then(function({ object: p }) {
      return Ks({
        fs: n,
        cache: e,
        gitdir: t,
        tree: Et.from(p),
        fileId: i,
        oid: a,
        filepaths: o,
        parentPath: Fe.join(c, h.path)
      });
    })), l;
  });
  return await Promise.all(s), o;
}
async function Ju({
  fs: n,
  cache: e,
  gitdir: t,
  filepath: r,
  ref: i,
  depth: a,
  since: o,
  force: c,
  follow: s
}) {
  const h = typeof o > "u" ? void 0 : Math.floor(o.valueOf() / 1e3), l = [], p = await hr.read({ fs: n, gitdir: t }), w = await oe.resolve({ fs: n, gitdir: t, ref: i }), _ = [await Vi({ fs: n, cache: e, gitdir: t, oid: w })];
  let A, S, v;
  function R(x) {
    v && r && l.push(x);
  }
  for (; _.length > 0; ) {
    const x = _.pop();
    if (h !== void 0 && x.commit.committer.timestamp <= h)
      break;
    if (r) {
      let k;
      try {
        k = await Eu({
          fs: n,
          cache: e,
          gitdir: t,
          oid: x.commit.tree,
          filepath: r
        }), S && A !== k && l.push(S), A = k, S = x, v = !0;
      } catch (P) {
        if (P instanceof nt) {
          let D = s && A;
          if (D && (D = await os({
            fs: n,
            cache: e,
            gitdir: t,
            oid: x.commit.tree,
            fileId: A
          }), D))
            if (Array.isArray(D)) {
              if (S) {
                const F = await os({
                  fs: n,
                  cache: e,
                  gitdir: t,
                  oid: S.commit.tree,
                  fileId: A
                });
                if (Array.isArray(F))
                  if (D = D.filter((I) => F.indexOf(I) === -1), D.length === 1)
                    D = D[0], r = D, S && l.push(S);
                  else {
                    D = !1, S && l.push(S);
                    break;
                  }
              }
            } else
              r = D, S && l.push(S);
          if (!D) {
            if (v && A && (l.push(S), !c))
              break;
            if (!c && !s) throw P;
          }
          S = x, v = !1;
        } else throw P;
      }
    } else
      l.push(x);
    if (a !== void 0 && l.length === a) {
      R(x);
      break;
    }
    if (!p.has(x.oid))
      for (const k of x.commit.parent) {
        const P = await Vi({ fs: n, cache: e, gitdir: t, oid: k });
        _.map((D) => D.oid).includes(P.oid) || _.push(P);
      }
    _.length === 0 && R(x), _.sort((k, P) => Yu(k.commit, P.commit));
  }
  return l;
}
async function Qu({
  fs: n,
  dir: e,
  gitdir: t = Fe.join(e, ".git"),
  filepath: r,
  ref: i = "HEAD",
  depth: a,
  since: o,
  // Date
  force: c,
  follow: s,
  cache: h = {}
}) {
  try {
    return Ue("fs", n), Ue("gitdir", t), Ue("ref", i), await Ju({
      fs: new Gt(n),
      cache: h,
      gitdir: t,
      filepath: r,
      ref: i,
      depth: a,
      since: o,
      force: c,
      follow: s
    });
  } catch (l) {
    throw l.caller = "git.log", l;
  }
}
const ef = {
  commit: 16,
  tree: 32,
  blob: 48,
  tag: 64,
  ofs_delta: 96,
  ref_delta: 112
};
async function tf({
  fs: n,
  cache: e,
  dir: t,
  gitdir: r = Fe.join(t, ".git"),
  oids: i
}) {
  const a = new ks(), o = [];
  function c(l, p) {
    const w = ae.from(l, p);
    o.push(w), a.update(w);
  }
  async function s({ stype: l, object: p }) {
    const w = ef[l];
    let _ = p.length, A = _ > 15 ? 128 : 0;
    const S = _ & 15;
    _ = _ >>> 4;
    let v = (A | w | S).toString(16);
    for (c(v, "hex"); A; )
      A = _ > 127 ? 128 : 0, v = A | _ & 127, c(Yi(2, v), "hex"), _ = _ >>> 7;
    c(ae.from(await Us(p)));
  }
  c("PACK"), c("00000002", "hex"), c(Yi(8, i.length), "hex");
  for (const l of i) {
    const { type: p, object: w } = await Qe({ fs: n, cache: e, gitdir: r, oid: l });
    await s({ object: w, stype: p });
  }
  const h = a.digest();
  return o.push(h), o;
}
async function rf({
  fs: n,
  http: e,
  onProgress: t,
  onMessage: r,
  onAuth: i,
  onAuthSuccess: a,
  onAuthFailure: o,
  dir: c,
  gitdir: s = Fe.join(c, ".git"),
  ref: h,
  url: l,
  remote: p,
  remoteRef: w,
  prune: _ = !1,
  pruneTags: A = !1,
  fastForward: S = !0,
  fastForwardOnly: v = !1,
  corsProxy: R,
  singleBranch: x,
  headers: k = {},
  author: P,
  committer: D,
  signingKey: F,
  cache: I = {}
}) {
  try {
    Ue("fs", n), Ue("gitdir", s);
    const $ = new Gt(n), U = await Wi({ fs: $, gitdir: s, author: P });
    if (!U) throw new qt("author");
    const N = await Zi({
      fs: $,
      gitdir: s,
      author: U,
      committer: D
    });
    if (!N) throw new qt("committer");
    return await Ys({
      fs: $,
      cache: I,
      http: e,
      onProgress: t,
      onMessage: r,
      onAuth: i,
      onAuthSuccess: a,
      onAuthFailure: o,
      dir: c,
      gitdir: s,
      ref: h,
      url: l,
      remote: p,
      remoteRef: w,
      fastForward: S,
      fastForwardOnly: v,
      corsProxy: R,
      singleBranch: x,
      headers: k,
      author: U,
      committer: N,
      signingKey: F,
      prune: _,
      pruneTags: A
    });
  } catch ($) {
    throw $.caller = "git.pull", $;
  }
}
async function nf({
  fs: n,
  cache: e,
  dir: t,
  gitdir: r = Fe.join(t, ".git"),
  start: i,
  finish: a
}) {
  const o = await hr.read({ fs: n, gitdir: r }), c = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const p of i)
    c.add(await oe.resolve({ fs: n, gitdir: r, ref: p }));
  for (const p of a)
    try {
      const w = await oe.resolve({ fs: n, gitdir: r, ref: p });
      s.add(w);
    } catch {
    }
  const h = /* @__PURE__ */ new Set();
  async function l(p) {
    h.add(p);
    const { type: w, object: _ } = await Qe({ fs: n, cache: e, gitdir: r, oid: p });
    if (w === "tag") {
      const S = Bt.from(_).headers().object;
      return l(S);
    }
    if (w !== "commit")
      throw new Tt(p, w, "commit");
    if (!o.has(p)) {
      const S = je.from(_).headers().parent;
      for (p of S)
        !s.has(p) && !h.has(p) && await l(p);
    }
  }
  for (const p of c)
    await l(p);
  return h;
}
async function Fi({
  fs: n,
  cache: e,
  dir: t,
  gitdir: r = Fe.join(t, ".git"),
  oids: i
}) {
  const a = /* @__PURE__ */ new Set();
  async function o(c) {
    if (a.has(c)) return;
    a.add(c);
    const { type: s, object: h } = await Qe({ fs: n, cache: e, gitdir: r, oid: c });
    if (s === "tag") {
      const p = Bt.from(h).headers().object;
      await o(p);
    } else if (s === "commit") {
      const p = je.from(h).headers().tree;
      await o(p);
    } else if (s === "tree") {
      const l = Et.from(h);
      for (const p of l)
        p.type === "blob" && a.add(p.oid), p.type === "tree" && await o(p.oid);
    }
  }
  for (const c of i)
    await o(c);
  return a;
}
async function af(n) {
  const e = {};
  let t = "";
  const r = Le.streamReader(n);
  let i = await r();
  for (; i !== !0; )
    i !== null && (t += i.toString("utf8") + `
`), i = await r();
  const a = t.toString("utf8").split(`
`);
  if (i = a.shift(), !i.startsWith("unpack "))
    throw new Kt('unpack ok" or "unpack [error message]', i);
  e.ok = i === "unpack ok", e.ok || (e.error = i.slice(7)), e.refs = {};
  for (const o of a) {
    if (o.trim() === "") continue;
    const c = o.slice(0, 2), s = o.slice(3);
    let h = s.indexOf(" ");
    h === -1 && (h = s.length);
    const l = s.slice(0, h), p = s.slice(h + 1);
    e.refs[l] = {
      ok: c === "ok",
      error: p
    };
  }
  return e;
}
async function of({
  capabilities: n = [],
  triplets: e = []
}) {
  const t = [];
  let r = `\0 ${n.join(" ")}`;
  for (const i of e)
    t.push(
      Le.encode(
        `${i.oldoid} ${i.oid} ${i.fullRef}${r}
`
      )
    ), r = "";
  return t.push(Le.flush()), t;
}
async function sf({
  fs: n,
  cache: e,
  http: t,
  onProgress: r,
  onMessage: i,
  onAuth: a,
  onAuthSuccess: o,
  onAuthFailure: c,
  onPrePush: s,
  gitdir: h,
  ref: l,
  remoteRef: p,
  remote: w,
  url: _,
  force: A = !1,
  delete: S = !1,
  corsProxy: v,
  headers: R = {}
}) {
  const x = l || await on({ fs: n, gitdir: h });
  if (typeof x > "u")
    throw new ft("ref");
  const k = await ht.get({ fs: n, gitdir: h });
  w = w || await k.get(`branch.${x}.pushRemote`) || await k.get("remote.pushDefault") || await k.get(`branch.${x}.remote`) || "origin";
  const P = _ || await k.get(`remote.${w}.pushurl`) || await k.get(`remote.${w}.url`);
  if (typeof P > "u")
    throw new ft("remote OR url");
  const D = p || await k.get(`branch.${x}.merge`);
  if (typeof P > "u")
    throw new ft("remoteRef");
  v === void 0 && (v = await k.get("http.corsProxy"));
  const F = await oe.expand({ fs: n, gitdir: h, ref: x }), I = S ? "0000000000000000000000000000000000000000" : await oe.resolve({ fs: n, gitdir: h, ref: F }), $ = Gs.getRemoteHelperFor({ url: P }), U = await $.discover({
    http: t,
    onAuth: a,
    onAuthSuccess: o,
    onAuthFailure: c,
    corsProxy: v,
    service: "git-receive-pack",
    url: P,
    headers: R,
    protocolVersion: 1
  }), N = U.auth;
  let G;
  if (!D)
    G = F;
  else
    try {
      G = await oe.expandAgainstMap({
        ref: D,
        map: U.refs
      });
    } catch (ce) {
      if (ce instanceof nt)
        G = D.startsWith("refs/") ? D : `refs/heads/${D}`;
      else
        throw ce;
    }
  const T = U.refs.get(G) || "0000000000000000000000000000000000000000";
  if (s && !await s({
    remote: w,
    url: P,
    localRef: { ref: S ? "(delete)" : F, oid: I },
    remoteRef: { ref: G, oid: T }
  }))
    throw new vr();
  const Z = !U.capabilities.has("no-thin");
  let Q = /* @__PURE__ */ new Set();
  if (!S) {
    const ce = [...U.refs.values()];
    let _e = /* @__PURE__ */ new Set();
    if (T !== "0000000000000000000000000000000000000000") {
      const ke = await Xs({
        fs: n,
        cache: e,
        gitdir: h,
        oids: [I, T]
      });
      for (const Ce of ke) ce.push(Ce);
      Z && (_e = await Fi({ fs: n, cache: e, gitdir: h, oids: ke }));
    }
    if (!ce.includes(I)) {
      const ke = await nf({
        fs: n,
        cache: e,
        gitdir: h,
        start: [I],
        finish: ce
      });
      Q = await Fi({ fs: n, cache: e, gitdir: h, oids: ke });
    }
    if (Z) {
      try {
        const ke = await oe.resolve({
          fs: n,
          gitdir: h,
          ref: `refs/remotes/${w}/HEAD`,
          depth: 2
        }), { oid: Ce } = await oe.resolveAgainstMap({
          ref: ke.replace(`refs/remotes/${w}/`, ""),
          fullref: ke,
          map: U.refs
        }), me = [Ce];
        for (const de of await Fi({ fs: n, cache: e, gitdir: h, oids: me }))
          _e.add(de);
      } catch {
      }
      for (const ke of _e)
        Q.delete(ke);
    }
    if (I === T && (A = !0), !A) {
      if (F.startsWith("refs/tags") && T !== "0000000000000000000000000000000000000000")
        throw new ur("tag-exists");
      if (I !== "0000000000000000000000000000000000000000" && T !== "0000000000000000000000000000000000000000" && !await Wu({
        fs: n,
        cache: e,
        gitdir: h,
        oid: I,
        ancestor: T,
        depth: -1
      }))
        throw new ur("not-fast-forward");
    }
  }
  const se = Ws(
    [...U.capabilities],
    ["report-status", "side-band-64k", `agent=${la.agent}`]
  ), V = await of({
    capabilities: se,
    triplets: [{ oldoid: T, oid: I, fullRef: G }]
  }), q = S ? [] : await tf({
    fs: n,
    cache: e,
    gitdir: h,
    oids: [...Q]
  }), K = await $.connect({
    http: t,
    onProgress: r,
    corsProxy: v,
    service: "git-receive-pack",
    url: P,
    auth: N,
    headers: R,
    body: [...V, ...q]
  }), { packfile: ne, progress: we } = await Vs.demux(K.body);
  if (i) {
    const ce = Zs(we);
    br(ce, async (_e) => {
      await i(_e);
    });
  }
  const ge = await af(ne);
  if (K.headers && (ge.headers = K.headers), w && ge.ok && ge.refs[G].ok && !F.startsWith("refs/tags")) {
    const ce = `refs/remotes/${w}/${G.replace(
      "refs/heads",
      ""
    )}`;
    S ? await oe.deleteRef({ fs: n, gitdir: h, ref: ce }) : await oe.writeRef({ fs: n, gitdir: h, ref: ce, value: I });
  }
  if (ge.ok && Object.values(ge.refs).every((ce) => ce.ok))
    return ge;
  {
    const ce = Object.entries(ge.refs).filter(([_e, ke]) => !ke.ok).map(([_e, ke]) => `
  - ${_e}: ${ke.error}`).join("");
    throw new Kr(ce, ge);
  }
}
async function cf({
  fs: n,
  http: e,
  onProgress: t,
  onMessage: r,
  onAuth: i,
  onAuthSuccess: a,
  onAuthFailure: o,
  onPrePush: c,
  dir: s,
  gitdir: h = Fe.join(s, ".git"),
  ref: l,
  remoteRef: p,
  remote: w = "origin",
  url: _,
  force: A = !1,
  delete: S = !1,
  corsProxy: v,
  headers: R = {},
  cache: x = {}
}) {
  try {
    return Ue("fs", n), Ue("http", e), Ue("gitdir", h), await sf({
      fs: new Gt(n),
      cache: x,
      http: e,
      onProgress: t,
      onMessage: r,
      onAuth: i,
      onAuthSuccess: a,
      onAuthFailure: o,
      onPrePush: c,
      gitdir: h,
      ref: l,
      remoteRef: p,
      remote: w,
      url: _,
      force: A,
      delete: S,
      corsProxy: v,
      headers: R
    });
  } catch (k) {
    throw k.caller = "git.push", k;
  }
}
function lf(n) {
  let e = [n];
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
function uf(n) {
  return n[Symbol.asyncIterator] ? n[Symbol.asyncIterator]() : n[Symbol.iterator] ? n[Symbol.iterator]() : n.next ? n : lf(n);
}
async function ff(n, e) {
  const t = uf(n);
  for (; ; ) {
    const { value: r, done: i } = await t.next();
    if (r && await e(r), i) break;
  }
  t.return && t.return();
}
async function hf(n) {
  let e = 0;
  const t = [];
  await ff(n, (a) => {
    t.push(a), e += a.byteLength;
  });
  const r = new Uint8Array(e);
  let i = 0;
  for (const a of t)
    r.set(a, i), i += a.byteLength;
  return r;
}
function df(n) {
  if (n[Symbol.asyncIterator]) return n;
  const e = n.getReader();
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
async function Js({
  onProgress: n,
  url: e,
  method: t = "GET",
  headers: r = {},
  body: i
}) {
  i && (i = await hf(i));
  const a = await fetch(e, { method: t, headers: r, body: i }), o = a.body && a.body.getReader ? df(a.body) : [new Uint8Array(await a.arrayBuffer())];
  r = {};
  for (const [c, s] of a.headers.entries())
    r[c] = s;
  return {
    url: a.url,
    method: a.method,
    statusCode: a.status,
    statusMessage: a.statusText,
    body: o,
    headers: r
  };
}
var pf = { request: Js };
const wf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pf,
  request: Js
}, Symbol.toStringTag, { value: "Module" }));
(function(n, e) {
  typeof exports == "object" && typeof module == "object" ? module.exports = e() : typeof define == "function" && define.amd ? define([], e) : typeof exports == "object" ? exports.LightningFS = e() : n.LightningFS = e();
})(self, function() {
  return function(n) {
    var e = {};
    function t(r) {
      if (e[r]) return e[r].exports;
      var i = e[r] = { i: r, l: !1, exports: {} };
      return n[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports;
    }
    return t.m = n, t.c = e, t.d = function(r, i, a) {
      t.o(r, i) || Object.defineProperty(r, i, { enumerable: !0, get: a });
    }, t.r = function(r) {
      typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r, "__esModule", { value: !0 });
    }, t.t = function(r, i) {
      if (1 & i && (r = t(r)), 8 & i || 4 & i && typeof r == "object" && r && r.__esModule) return r;
      var a = /* @__PURE__ */ Object.create(null);
      if (t.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: r }), 2 & i && typeof r != "string") for (var o in r) t.d(a, o, function(c) {
        return r[c];
      }.bind(null, o));
      return a;
    }, t.n = function(r) {
      var i = r && r.__esModule ? function() {
        return r.default;
      } : function() {
        return r;
      };
      return t.d(i, "a", i), i;
    }, t.o = function(r, i) {
      return Object.prototype.hasOwnProperty.call(r, i);
    }, t.p = "", t(t.s = 3);
  }([function(n, e) {
    function t(o) {
      if (o.length === 0) return ".";
      let c = i(o);
      return c = c.reduce(a, []), r(...c);
    }
    function r(...o) {
      if (o.length === 0) return "";
      let c = o.join("/");
      return c = c.replace(/\/{2,}/g, "/");
    }
    function i(o) {
      if (o.length === 0) return [];
      if (o === "/") return ["/"];
      let c = o.split("/");
      return c[c.length - 1] === "" && c.pop(), o[0] === "/" ? c[0] = "/" : c[0] !== "." && c.unshift("."), c;
    }
    function a(o, c) {
      if (o.length === 0) return o.push(c), o;
      if (c === ".") return o;
      if (c === "..") {
        if (o.length === 1) {
          if (o[0] === "/") throw new Error("Unable to normalize path - traverses above root directory");
          if (o[0] === ".") return o.push(c), o;
        }
        return o[o.length - 1] === ".." ? (o.push(".."), o) : (o.pop(), o);
      }
      return o.push(c), o;
    }
    n.exports = { join: r, normalize: t, split: i, basename: function(o) {
      if (o === "/") throw new Error(`Cannot get basename of "${o}"`);
      const c = o.lastIndexOf("/");
      return c === -1 ? o : o.slice(c + 1);
    }, dirname: function(o) {
      const c = o.lastIndexOf("/");
      if (c === -1) throw new Error(`Cannot get dirname of "${o}"`);
      return c === 0 ? "/" : o.slice(0, c);
    }, resolve: function(...o) {
      let c = "";
      for (let s of o) c = s.startsWith("/") ? s : t(r(c, s));
      return c;
    } };
  }, function(n, e) {
    function t(s) {
      return class extends Error {
        constructor(...h) {
          super(...h), this.code = s, this.message ? this.message = s + ": " + this.message : this.message = s;
        }
      };
    }
    const r = t("EEXIST"), i = t("ENOENT"), a = t("ENOTDIR"), o = t("ENOTEMPTY"), c = t("ETIMEDOUT");
    n.exports = { EEXIST: r, ENOENT: i, ENOTDIR: a, ENOTEMPTY: o, ETIMEDOUT: c };
  }, function(n, e, t) {
    t.r(e), t.d(e, "Store", function() {
      return r;
    }), t.d(e, "get", function() {
      return o;
    }), t.d(e, "set", function() {
      return c;
    }), t.d(e, "update", function() {
      return s;
    }), t.d(e, "del", function() {
      return h;
    }), t.d(e, "clear", function() {
      return l;
    }), t.d(e, "keys", function() {
      return p;
    }), t.d(e, "close", function() {
      return w;
    });
    class r {
      constructor(A = "keyval-store", S = "keyval") {
        this.storeName = S, this._dbName = A, this._storeName = S, this._init();
      }
      _init() {
        this._dbp || (this._dbp = new Promise((A, S) => {
          const v = indexedDB.open(this._dbName);
          v.onerror = () => S(v.error), v.onsuccess = () => A(v.result), v.onupgradeneeded = () => {
            v.result.createObjectStore(this._storeName);
          };
        }));
      }
      _withIDBStore(A, S) {
        return this._init(), this._dbp.then((v) => new Promise((R, x) => {
          const k = v.transaction(this.storeName, A);
          k.oncomplete = () => R(), k.onabort = k.onerror = () => x(k.error), S(k.objectStore(this.storeName));
        }));
      }
      _close() {
        return this._init(), this._dbp.then((A) => {
          A.close(), this._dbp = void 0;
        });
      }
    }
    let i;
    function a() {
      return i || (i = new r()), i;
    }
    function o(_, A = a()) {
      let S;
      return A._withIDBStore("readwrite", (v) => {
        S = v.get(_);
      }).then(() => S.result);
    }
    function c(_, A, S = a()) {
      return S._withIDBStore("readwrite", (v) => {
        v.put(A, _);
      });
    }
    function s(_, A, S = a()) {
      return S._withIDBStore("readwrite", (v) => {
        const R = v.get(_);
        R.onsuccess = () => {
          v.put(A(R.result), _);
        };
      });
    }
    function h(_, A = a()) {
      return A._withIDBStore("readwrite", (S) => {
        S.delete(_);
      });
    }
    function l(_ = a()) {
      return _._withIDBStore("readwrite", (A) => {
        A.clear();
      });
    }
    function p(_ = a()) {
      const A = [];
      return _._withIDBStore("readwrite", (S) => {
        (S.openKeyCursor || S.openCursor).call(S).onsuccess = function() {
          this.result && (A.push(this.result.key), this.result.continue());
        };
      }).then(() => A);
    }
    function w(_ = a()) {
      return _._close();
    }
  }, function(n, e, t) {
    const r = t(4), i = t(5);
    function a(o, c) {
      return typeof o == "function" && (c = o), [(...s) => c(null, ...s), c = r(c)];
    }
    n.exports = class {
      constructor(...o) {
        this.promises = new i(...o), this.init = this.init.bind(this), this.readFile = this.readFile.bind(this), this.writeFile = this.writeFile.bind(this), this.unlink = this.unlink.bind(this), this.readdir = this.readdir.bind(this), this.mkdir = this.mkdir.bind(this), this.rmdir = this.rmdir.bind(this), this.rename = this.rename.bind(this), this.stat = this.stat.bind(this), this.lstat = this.lstat.bind(this), this.readlink = this.readlink.bind(this), this.symlink = this.symlink.bind(this), this.backFile = this.backFile.bind(this), this.du = this.du.bind(this), this.flush = this.flush.bind(this);
      }
      init(o, c) {
        return this.promises.init(o, c);
      }
      readFile(o, c, s) {
        const [h, l] = a(c, s);
        this.promises.readFile(o, c).then(h).catch(l);
      }
      writeFile(o, c, s, h) {
        const [l, p] = a(s, h);
        this.promises.writeFile(o, c, s).then(l).catch(p);
      }
      unlink(o, c, s) {
        const [h, l] = a(c, s);
        this.promises.unlink(o, c).then(h).catch(l);
      }
      readdir(o, c, s) {
        const [h, l] = a(c, s);
        this.promises.readdir(o, c).then(h).catch(l);
      }
      mkdir(o, c, s) {
        const [h, l] = a(c, s);
        this.promises.mkdir(o, c).then(h).catch(l);
      }
      rmdir(o, c, s) {
        const [h, l] = a(c, s);
        this.promises.rmdir(o, c).then(h).catch(l);
      }
      rename(o, c, s) {
        const [h, l] = a(s);
        this.promises.rename(o, c).then(h).catch(l);
      }
      stat(o, c, s) {
        const [h, l] = a(c, s);
        this.promises.stat(o).then(h).catch(l);
      }
      lstat(o, c, s) {
        const [h, l] = a(c, s);
        this.promises.lstat(o).then(h).catch(l);
      }
      readlink(o, c, s) {
        const [h, l] = a(c, s);
        this.promises.readlink(o).then(h).catch(l);
      }
      symlink(o, c, s) {
        const [h, l] = a(s);
        this.promises.symlink(o, c).then(h).catch(l);
      }
      backFile(o, c, s) {
        const [h, l] = a(c, s);
        this.promises.backFile(o, c).then(h).catch(l);
      }
      du(o, c) {
        const [s, h] = a(c);
        this.promises.du(o).then(s).catch(h);
      }
      flush(o) {
        const [c, s] = a(o);
        this.promises.flush().then(c).catch(s);
      }
    };
  }, function(n, e) {
    n.exports = function(t) {
      var r, i;
      if (typeof t != "function") throw new Error("expected a function but got " + t);
      return function() {
        return r ? i : (r = !0, i = t.apply(this, arguments));
      };
    };
  }, function(n, e, t) {
    const r = t(6), i = t(16), a = t(0);
    function o(h, l, ...p) {
      return l !== void 0 && typeof l != "function" || (l = {}), typeof l == "string" && (l = { encoding: l }), [h = a.normalize(h), l, ...p];
    }
    function c(h, l, p, ...w) {
      return p !== void 0 && typeof p != "function" || (p = {}), typeof p == "string" && (p = { encoding: p }), [h = a.normalize(h), l, p, ...w];
    }
    function s(h, l, ...p) {
      return [a.normalize(h), a.normalize(l), ...p];
    }
    n.exports = class {
      constructor(h, l = {}) {
        this.init = this.init.bind(this), this.readFile = this._wrap(this.readFile, o, !1), this.writeFile = this._wrap(this.writeFile, c, !0), this.unlink = this._wrap(this.unlink, o, !0), this.readdir = this._wrap(this.readdir, o, !1), this.mkdir = this._wrap(this.mkdir, o, !0), this.rmdir = this._wrap(this.rmdir, o, !0), this.rename = this._wrap(this.rename, s, !0), this.stat = this._wrap(this.stat, o, !1), this.lstat = this._wrap(this.lstat, o, !1), this.readlink = this._wrap(this.readlink, o, !1), this.symlink = this._wrap(this.symlink, s, !0), this.backFile = this._wrap(this.backFile, o, !0), this.du = this._wrap(this.du, o, !1), this._deactivationPromise = null, this._deactivationTimeout = null, this._activationPromise = null, this._operations = /* @__PURE__ */ new Set(), h && this.init(h, l);
      }
      async init(...h) {
        return this._initPromiseResolve && await this._initPromise, this._initPromise = this._init(...h), this._initPromise;
      }
      async _init(h, l = {}) {
        await this._gracefulShutdown(), this._activationPromise && await this._deactivate(), this._backend && this._backend.destroy && await this._backend.destroy(), this._backend = l.backend || new r(), this._backend.init && await this._backend.init(h, l), this._initPromiseResolve && (this._initPromiseResolve(), this._initPromiseResolve = null), l.defer || this.stat("/");
      }
      async _gracefulShutdown() {
        this._operations.size > 0 && (this._isShuttingDown = !0, await new Promise((h) => this._gracefulShutdownResolve = h), this._isShuttingDown = !1, this._gracefulShutdownResolve = null);
      }
      _wrap(h, l, p) {
        return async (...w) => {
          w = l(...w);
          let _ = { name: h.name, args: w };
          this._operations.add(_);
          try {
            return await this._activate(), await h.apply(this, w);
          } finally {
            this._operations.delete(_), p && this._backend.saveSuperblock(), this._operations.size === 0 && (this._deactivationTimeout || clearTimeout(this._deactivationTimeout), this._deactivationTimeout = setTimeout(this._deactivate.bind(this), 500));
          }
        };
      }
      async _activate() {
        this._initPromise || console.warn(new Error(`Attempted to use LightningFS ${this._name} before it was initialized.`)), await this._initPromise, this._deactivationTimeout && (clearTimeout(this._deactivationTimeout), this._deactivationTimeout = null), this._deactivationPromise && await this._deactivationPromise, this._deactivationPromise = null, this._activationPromise || (this._activationPromise = this._backend.activate ? this._backend.activate() : Promise.resolve()), await this._activationPromise;
      }
      async _deactivate() {
        return this._activationPromise && await this._activationPromise, this._deactivationPromise || (this._deactivationPromise = this._backend.deactivate ? this._backend.deactivate() : Promise.resolve()), this._activationPromise = null, this._gracefulShutdownResolve && this._gracefulShutdownResolve(), this._deactivationPromise;
      }
      async readFile(h, l) {
        return this._backend.readFile(h, l);
      }
      async writeFile(h, l, p) {
        return await this._backend.writeFile(h, l, p), null;
      }
      async unlink(h, l) {
        return await this._backend.unlink(h, l), null;
      }
      async readdir(h, l) {
        return this._backend.readdir(h, l);
      }
      async mkdir(h, l) {
        return await this._backend.mkdir(h, l), null;
      }
      async rmdir(h, l) {
        return await this._backend.rmdir(h, l), null;
      }
      async rename(h, l) {
        return await this._backend.rename(h, l), null;
      }
      async stat(h, l) {
        const p = await this._backend.stat(h, l);
        return new i(p);
      }
      async lstat(h, l) {
        const p = await this._backend.lstat(h, l);
        return new i(p);
      }
      async readlink(h, l) {
        return this._backend.readlink(h, l);
      }
      async symlink(h, l) {
        return await this._backend.symlink(h, l), null;
      }
      async backFile(h, l) {
        return await this._backend.backFile(h, l), null;
      }
      async du(h) {
        return this._backend.du(h);
      }
      async flush() {
        return this._backend.flush();
      }
    };
  }, function(n, e, t) {
    const { encode: r, decode: i } = t(7), a = t(10), o = t(11), { ENOENT: c, ENOTEMPTY: s, ETIMEDOUT: h } = t(1), l = t(12), p = t(13), w = t(14), _ = t(15), A = t(0);
    n.exports = class {
      constructor() {
        this.saveSuperblock = a(() => {
          this.flush();
        }, 500);
      }
      async init(S, { wipe: v, url: R, urlauto: x, fileDbName: k = S, db: P = null, fileStoreName: D = S + "_files", lockDbName: F = S + "_lock", lockStoreName: I = S + "_lock" } = {}) {
        this._name = S, this._idb = P || new l(k, D), this._mutex = navigator.locks ? new _(S) : new w(F, I), this._cache = new o(S), this._opts = { wipe: v, url: R }, this._needsWipe = !!v, R && (this._http = new p(R), this._urlauto = !!x);
      }
      async activate() {
        if (this._cache.activated) return;
        this._needsWipe && (this._needsWipe = !1, await this._idb.wipe(), await this._mutex.release({ force: !0 })), await this._mutex.has() || await this._mutex.wait();
        const S = await this._idb.loadSuperblock();
        if (S) this._cache.activate(S);
        else if (this._http) {
          const v = await this._http.loadSuperblock();
          this._cache.activate(v), await this._saveSuperblock();
        } else this._cache.activate();
        if (!await this._mutex.has()) throw new h();
      }
      async deactivate() {
        await this._mutex.has() && await this._saveSuperblock(), this._cache.deactivate();
        try {
          await this._mutex.release();
        } catch (S) {
          console.log(S);
        }
        await this._idb.close();
      }
      async _saveSuperblock() {
        this._cache.activated && (this._lastSavedAt = Date.now(), await this._idb.saveSuperblock(this._cache._root));
      }
      _writeStat(S, v, R) {
        let x = A.split(A.dirname(S)), k = x.shift();
        for (let P of x) {
          k = A.join(k, P);
          try {
            this._cache.mkdir(k, { mode: 511 });
          } catch {
          }
        }
        return this._cache.writeStat(S, v, R);
      }
      async readFile(S, v) {
        const { encoding: R } = v;
        if (R && R !== "utf8") throw new Error('Only "utf8" encoding is supported in readFile');
        let x = null, k = null;
        try {
          k = this._cache.stat(S), x = await this._idb.readFile(k.ino);
        } catch (P) {
          if (!this._urlauto) throw P;
        }
        if (!x && this._http) {
          let P = this._cache.lstat(S);
          for (; P.type === "symlink"; ) S = A.resolve(A.dirname(S), P.target), P = this._cache.lstat(S);
          x = await this._http.readFile(S);
        }
        if (x && (k && k.size == x.byteLength || (k = await this._writeStat(S, x.byteLength, { mode: k ? k.mode : 438 }), this.saveSuperblock()), R === "utf8" ? x = i(x) : x.toString = () => i(x)), !k) throw new c(S);
        return x;
      }
      async writeFile(S, v, R) {
        const { mode: x, encoding: k = "utf8" } = R;
        if (typeof v == "string") {
          if (k !== "utf8") throw new Error('Only "utf8" encoding is supported in writeFile');
          v = r(v);
        }
        const P = await this._cache.writeStat(S, v.byteLength, { mode: x });
        await this._idb.writeFile(P.ino, v);
      }
      async unlink(S, v) {
        const R = this._cache.lstat(S);
        this._cache.unlink(S), R.type !== "symlink" && await this._idb.unlink(R.ino);
      }
      readdir(S, v) {
        return this._cache.readdir(S);
      }
      mkdir(S, v) {
        const { mode: R = 511 } = v;
        this._cache.mkdir(S, { mode: R });
      }
      rmdir(S, v) {
        if (S === "/") throw new s();
        this._cache.rmdir(S);
      }
      rename(S, v) {
        this._cache.rename(S, v);
      }
      stat(S, v) {
        return this._cache.stat(S);
      }
      lstat(S, v) {
        return this._cache.lstat(S);
      }
      readlink(S, v) {
        return this._cache.readlink(S);
      }
      symlink(S, v) {
        this._cache.symlink(S, v);
      }
      async backFile(S, v) {
        let R = await this._http.sizeFile(S);
        await this._writeStat(S, R, v);
      }
      du(S) {
        return this._cache.du(S);
      }
      flush() {
        return this._saveSuperblock();
      }
    };
  }, function(n, e, t) {
    t(8), n.exports = { encode: (r) => new TextEncoder().encode(r), decode: (r) => new TextDecoder().decode(r) };
  }, function(n, e, t) {
    (function(r) {
      (function(i) {
        function a(c) {
          if ((c = c === void 0 ? "utf-8" : c) !== "utf-8") throw new RangeError("Failed to construct 'TextEncoder': The encoding label provided ('" + c + "') is invalid.");
        }
        function o(c, s) {
          if (s = s === void 0 ? { fatal: !1 } : s, (c = c === void 0 ? "utf-8" : c) !== "utf-8") throw new RangeError("Failed to construct 'TextDecoder': The encoding label provided ('" + c + "') is invalid.");
          if (s.fatal) throw Error("Failed to construct 'TextDecoder': the 'fatal' option is unsupported.");
        }
        if (i.TextEncoder && i.TextDecoder) return !1;
        Object.defineProperty(a.prototype, "encoding", { value: "utf-8" }), a.prototype.encode = function(c, s) {
          if ((s = s === void 0 ? { stream: !1 } : s).stream) throw Error("Failed to encode: the 'stream' option is unsupported.");
          s = 0;
          for (var h = c.length, l = 0, p = Math.max(32, h + (h >> 1) + 7), w = new Uint8Array(p >> 3 << 3); s < h; ) {
            var _ = c.charCodeAt(s++);
            if (55296 <= _ && 56319 >= _) {
              if (s < h) {
                var A = c.charCodeAt(s);
                (64512 & A) == 56320 && (++s, _ = ((1023 & _) << 10) + (1023 & A) + 65536);
              }
              if (55296 <= _ && 56319 >= _) continue;
            }
            if (l + 4 > w.length && (p += 8, p = (p *= 1 + s / c.length * 2) >> 3 << 3, (A = new Uint8Array(p)).set(w), w = A), (4294967168 & _) == 0) w[l++] = _;
            else {
              if ((4294965248 & _) == 0) w[l++] = _ >> 6 & 31 | 192;
              else if ((4294901760 & _) == 0) w[l++] = _ >> 12 & 15 | 224, w[l++] = _ >> 6 & 63 | 128;
              else {
                if ((4292870144 & _) != 0) continue;
                w[l++] = _ >> 18 & 7 | 240, w[l++] = _ >> 12 & 63 | 128, w[l++] = _ >> 6 & 63 | 128;
              }
              w[l++] = 63 & _ | 128;
            }
          }
          return w.slice(0, l);
        }, Object.defineProperty(o.prototype, "encoding", { value: "utf-8" }), Object.defineProperty(o.prototype, "fatal", { value: !1 }), Object.defineProperty(o.prototype, "ignoreBOM", { value: !1 }), o.prototype.decode = function(c, s) {
          if ((s = s === void 0 ? { stream: !1 } : s).stream) throw Error("Failed to decode: the 'stream' option is unsupported.");
          s = 0;
          for (var h = (c = new Uint8Array(c)).length, l = []; s < h; ) {
            var p = c[s++];
            if (p === 0) break;
            if ((128 & p) == 0) l.push(p);
            else if ((224 & p) == 192) {
              var w = 63 & c[s++];
              l.push((31 & p) << 6 | w);
            } else if ((240 & p) == 224) {
              w = 63 & c[s++];
              var _ = 63 & c[s++];
              l.push((31 & p) << 12 | w << 6 | _);
            } else (248 & p) == 240 && (65535 < (p = (7 & p) << 18 | (w = 63 & c[s++]) << 12 | (_ = 63 & c[s++]) << 6 | 63 & c[s++]) && (p -= 65536, l.push(p >>> 10 & 1023 | 55296), p = 56320 | 1023 & p), l.push(p));
          }
          return String.fromCharCode.apply(null, l);
        }, i.TextEncoder = a, i.TextDecoder = o;
      })(typeof window < "u" ? window : r !== void 0 ? r : this);
    }).call(this, t(9));
  }, function(n, e) {
    var t;
    t = /* @__PURE__ */ function() {
      return this;
    }();
    try {
      t = t || new Function("return this")();
    } catch {
      typeof window == "object" && (t = window);
    }
    n.exports = t;
  }, function(n, e) {
    n.exports = function(t, r, i) {
      var a;
      return function() {
        if (!r) return t.apply(this, arguments);
        var o = this, c = arguments, s = i && !a;
        return clearTimeout(a), a = setTimeout(function() {
          if (a = null, !s) return t.apply(o, c);
        }, r), s ? t.apply(this, arguments) : void 0;
      };
    };
  }, function(n, e, t) {
    const r = t(0), { EEXIST: i, ENOENT: a, ENOTDIR: o, ENOTEMPTY: c } = t(1), s = 0;
    n.exports = class {
      constructor() {
      }
      _makeRoot(h = /* @__PURE__ */ new Map()) {
        return h.set(s, { mode: 511, type: "dir", size: 0, ino: 0, mtimeMs: Date.now() }), h;
      }
      activate(h = null) {
        this._root = h === null ? /* @__PURE__ */ new Map([["/", this._makeRoot()]]) : typeof h == "string" ? /* @__PURE__ */ new Map([["/", this._makeRoot(this.parse(h))]]) : h;
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
      _countInodes(h) {
        let l = 1;
        for (let [p, w] of h) p !== s && (l += this._countInodes(w));
        return l;
      }
      autoinc() {
        return this._maxInode(this._root.get("/")) + 1;
      }
      _maxInode(h) {
        let l = h.get(s).ino;
        for (let [p, w] of h) p !== s && (l = Math.max(l, this._maxInode(w)));
        return l;
      }
      print(h = this._root.get("/")) {
        let l = "";
        const p = (w, _) => {
          for (let [A, S] of w) {
            if (A === 0) continue;
            let v = S.get(s), R = v.mode.toString(8);
            l += `${"	".repeat(_)}${A}	${R}`, v.type === "file" ? l += `	${v.size}	${v.mtimeMs}
` : (l += `
`, p(S, _ + 1));
          }
        };
        return p(h, 0), l;
      }
      parse(h) {
        let l = 0;
        function p(S) {
          const v = ++l, R = S.length === 1 ? "dir" : "file";
          let [x, k, P] = S;
          return x = parseInt(x, 8), k = k ? parseInt(k) : 0, P = P ? parseInt(P) : Date.now(), /* @__PURE__ */ new Map([[s, { mode: x, type: R, size: k, mtimeMs: P, ino: v }]]);
        }
        let w = h.trim().split(`
`), _ = this._makeRoot(), A = [{ indent: -1, node: _ }, { indent: 0, node: null }];
        for (let S of w) {
          let v = S.match(/^\t*/)[0].length;
          S = S.slice(v);
          let [R, ...x] = S.split("	"), k = p(x);
          if (v <= A[A.length - 1].indent) for (; v <= A[A.length - 1].indent; ) A.pop();
          A.push({ indent: v, node: k }), A[A.length - 2].node.set(R, k);
        }
        return _;
      }
      _lookup(h, l = !0) {
        let p = this._root, w = "/", _ = r.split(h);
        for (let A = 0; A < _.length; ++A) {
          let S = _[A];
          if (!(p = p.get(S))) throw new a(h);
          if (l || A < _.length - 1) {
            const v = p.get(s);
            if (v.type === "symlink") {
              let R = r.resolve(w, v.target);
              p = this._lookup(R);
            }
            w = w ? r.join(w, S) : S;
          }
        }
        return p;
      }
      mkdir(h, { mode: l }) {
        if (h === "/") throw new i();
        let p = this._lookup(r.dirname(h)), w = r.basename(h);
        if (p.has(w)) throw new i();
        let _ = /* @__PURE__ */ new Map(), A = { mode: l, type: "dir", size: 0, mtimeMs: Date.now(), ino: this.autoinc() };
        _.set(s, A), p.set(w, _);
      }
      rmdir(h) {
        let l = this._lookup(h);
        if (l.get(s).type !== "dir") throw new o();
        if (l.size > 1) throw new c();
        let p = this._lookup(r.dirname(h)), w = r.basename(h);
        p.delete(w);
      }
      readdir(h) {
        let l = this._lookup(h);
        if (l.get(s).type !== "dir") throw new o();
        return [...l.keys()].filter((p) => typeof p == "string");
      }
      writeStat(h, l, { mode: p }) {
        let w;
        try {
          let R = this.stat(h);
          p == null && (p = R.mode), w = R.ino;
        } catch {
        }
        p == null && (p = 438), w == null && (w = this.autoinc());
        let _ = this._lookup(r.dirname(h)), A = r.basename(h), S = { mode: p, type: "file", size: l, mtimeMs: Date.now(), ino: w }, v = /* @__PURE__ */ new Map();
        return v.set(s, S), _.set(A, v), S;
      }
      unlink(h) {
        let l = this._lookup(r.dirname(h)), p = r.basename(h);
        l.delete(p);
      }
      rename(h, l) {
        let p = r.basename(l), w = this._lookup(h);
        this._lookup(r.dirname(l)).set(p, w), this.unlink(h);
      }
      stat(h) {
        return this._lookup(h).get(s);
      }
      lstat(h) {
        return this._lookup(h, !1).get(s);
      }
      readlink(h) {
        return this._lookup(h, !1).get(s).target;
      }
      symlink(h, l) {
        let p, w;
        try {
          let R = this.stat(l);
          w === null && (w = R.mode), p = R.ino;
        } catch {
        }
        w == null && (w = 40960), p == null && (p = this.autoinc());
        let _ = this._lookup(r.dirname(l)), A = r.basename(l), S = { mode: w, type: "symlink", target: h, size: 0, mtimeMs: Date.now(), ino: p }, v = /* @__PURE__ */ new Map();
        return v.set(s, S), _.set(A, v), S;
      }
      _du(h) {
        let l = 0;
        for (const [p, w] of h.entries()) l += p === s ? w.size : this._du(w);
        return l;
      }
      du(h) {
        let l = this._lookup(h);
        return this._du(l);
      }
    };
  }, function(n, e, t) {
    const r = t(2);
    n.exports = class {
      constructor(i, a) {
        this._database = i, this._storename = a, this._store = new r.Store(this._database, this._storename);
      }
      saveSuperblock(i) {
        return r.set("!root", i, this._store);
      }
      loadSuperblock() {
        return r.get("!root", this._store);
      }
      readFile(i) {
        return r.get(i, this._store);
      }
      writeFile(i, a) {
        return r.set(i, a, this._store);
      }
      unlink(i) {
        return r.del(i, this._store);
      }
      wipe() {
        return r.clear(this._store);
      }
      close() {
        return r.close(this._store);
      }
    };
  }, function(n, e) {
    n.exports = class {
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
  }, function(n, e, t) {
    const r = t(2), i = (a) => new Promise((o) => setTimeout(o, a));
    n.exports = class {
      constructor(a, o) {
        this._id = Math.random(), this._database = a, this._storename = o, this._store = new r.Store(this._database, this._storename), this._lock = null;
      }
      async has({ margin: a = 2e3 } = {}) {
        if (this._lock && this._lock.holder === this._id) {
          const o = Date.now();
          return this._lock.expires > o + a || await this.renew();
        }
        return !1;
      }
      async renew({ ttl: a = 5e3 } = {}) {
        let o;
        return await r.update("lock", (c) => {
          const s = Date.now() + a;
          return o = c && c.holder === this._id, this._lock = o ? { holder: this._id, expires: s } : c, this._lock;
        }, this._store), o;
      }
      async acquire({ ttl: a = 5e3 } = {}) {
        let o, c, s;
        if (await r.update("lock", (h) => {
          const l = Date.now(), p = l + a;
          return c = h && h.expires < l, o = h === void 0 || c, s = h && h.holder === this._id, this._lock = o ? { holder: this._id, expires: p } : h, this._lock;
        }, this._store), s) throw new Error("Mutex double-locked");
        return o;
      }
      async wait({ interval: a = 100, limit: o = 6e3, ttl: c } = {}) {
        for (; o--; ) {
          if (await this.acquire({ ttl: c })) return !0;
          await i(a);
        }
        throw new Error("Mutex timeout");
      }
      async release({ force: a = !1 } = {}) {
        let o, c, s;
        if (await r.update("lock", (h) => (o = a || h && h.holder === this._id, c = h === void 0, s = h && h.holder !== this._id, this._lock = o ? void 0 : h, this._lock), this._store), await r.close(this._store), !o && !a) {
          if (c) throw new Error("Mutex double-freed");
          if (s) throw new Error("Mutex lost ownership");
        }
        return o;
      }
    };
  }, function(n, e) {
    n.exports = class {
      constructor(t) {
        this._id = Math.random(), this._database = t, this._has = !1, this._release = null;
      }
      async has() {
        return this._has;
      }
      async acquire() {
        return new Promise((t) => {
          navigator.locks.request(this._database + "_lock", { ifAvailable: !0 }, (r) => (this._has = !!r, t(!!r), new Promise((i) => {
            this._release = i;
          })));
        });
      }
      async wait({ timeout: t = 6e5 } = {}) {
        return new Promise((r, i) => {
          const a = new AbortController();
          setTimeout(() => {
            a.abort(), i(new Error("Mutex timeout"));
          }, t), navigator.locks.request(this._database + "_lock", { signal: a.signal }, (o) => (this._has = !!o, r(!!o), new Promise((c) => {
            this._release = c;
          })));
        });
      }
      async release({ force: t = !1 } = {}) {
        this._has = !1, this._release ? this._release() : t && navigator.locks.request(this._database + "_lock", { steal: !0 }, (r) => !0);
      }
    };
  }, function(n, e) {
    n.exports = class {
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
const mf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), yf = await Mr(), Qs = new Ur(yf.logging.swUtils);
function Dt(...n) {
  Qs.consoleDotLog("[ SWUtils ]", ...n);
}
function Ir(...n) {
  Qs.consoleDotError("[ SWUtils ]", ...n);
}
class gf {
  constructor() {
  }
  async fetchWithServiceWorker(e, t) {
    Dt("Starting fetchWithServiceWorker with operation:", e, "and args:", t);
    try {
      const r = new URL("/git", self.location.origin).toString();
      Dt("Constructed URL for fetch:", r);
      const i = {
        method: "POST",
        body: JSON.stringify({ operation: e, args: t }),
        headers: { "Content-Type": "application/json" }
      };
      Dt("Request options:", i);
      const a = await fetch(r, i);
      Dt("Fetch response received:", a);
      let o;
      try {
        o = await a.json(), Dt("Parsed JSON response:", o);
      } catch (c) {
        throw Ir("Error parsing JSON response:", c), new Error("Response is not valid JSON");
      }
      if (!a.ok) {
        let c = `Fetch failed with status: ${a.status}`;
        switch (Dt("Response status is not OK:", a.status), a.status) {
          case 400:
            c = "Bad Request: The server could not understand the request.";
            break;
          case 401:
            c = "Unauthorized: Authentication is required or has failed.";
            break;
          case 403:
            c = "Forbidden: You do not have permission to access this resource.";
            break;
          case 404:
            c = "Not Found: The requested resource could not be found.";
            break;
          case 500:
            c = "Internal Server Error: The server encountered an error.";
            break;
          case 502:
            c = "Bad Gateway: The server received an invalid response from the upstream server.";
            break;
          case 503:
            c = "Service Unavailable: The server is currently unable to handle the request.";
            break;
          case 504:
            c = "Gateway Timeout: The server did not receive a timely response from the upstream server.";
            break;
          default:
            c = `Unexpected status code: ${a.status}`;
        }
        throw Ir("Error message based on status code:", c), Ir("Response details:", o.details), new Error(JSON.stringify(o.details));
      }
      return Dt("Fetch completed successfully with response:", o), o;
    } catch (r) {
      throw Ir("Fetch error:", r), r;
    }
  }
  async sendMessageToChannel(e, t = "worker-channel") {
    return new Promise((r) => {
      const i = new BroadcastChannel(t);
      i.onmessage = (a) => {
        a.data.operation === `${e.operation}` && (i.close(), r(a.data));
      }, i.postMessage(e);
    });
  }
}
const _f = await Mr(), ec = new Ur(_f.logging.memoryBackendES6);
function Ke(...n) {
  ec.consoleDotLog("[MemoryBackend ES6]", ...n);
}
function ar(...n) {
  ec.consoleDotError("[MemoryBackend ES6]", ...n);
}
function vf() {
  return "tab-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
}
Ke("Loading memoryBackend module");
class ss {
  constructor(e = {}, t = "default") {
    this.dbName = t, this.options = e, this.deviceId = e.deviceId || vf(), this._files = /* @__PURE__ */ new Map(), this.versionVector = { [this.deviceId]: 0 }, this.swUtilsInstance = new gf(), this.channel = null, this.isProcessing = !1, this.pendingUpdates = [], this.processingQueue = !1, this._initializeRoot(), this.options?.supportsServiceWorker && this.options?.useSW && this._setupReceiveChannel(), Promise.resolve().then(() => this._requestInitialSync()), Ke(`Initialized with dbName: ${this.dbName}, deviceId: ${this.deviceId}`);
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
      const i = this.versionVector[r] || 0;
      e[r] > i && (t = !0);
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
      }), e.close(), Ke("Initial sync request sent");
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
      Ke("Queueing update due to ongoing processing"), this.pendingUpdates.push(t);
      return;
    }
    try {
      this.isProcessing = !0, Ke("Sending files to SW:", t);
      const r = new BroadcastChannel(`memory-backend-${this.dbName}`);
      r.postMessage(t), r.close(), Ke("Files sent to SW successfully"), await this._processPendingUpdates();
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
          Ke("Processing queued update:", e);
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
      Ke("Listening for updates on:", e.name), this.channel = e, this.channel.onmessage = async (t) => {
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
      this._isNewerVersionVector(r.requesterVV) ? (Ke("Responding to sync request with newer data"), Promise.resolve().then(() => this.sendFilesToSW(r.requesterId))) : Ke("No newer data to send to requester");
      return;
    }
    if (t !== "memorySync") return;
    const i = r.versionVector;
    if (r.sender === this.deviceId) {
      Ke("Skipping own update");
      return;
    }
    if (r.targetId && r.targetId !== this.deviceId) {
      Ke("Message not meant for this tab. Ignoring.");
      return;
    }
    if (!this._isNewerVersionVector(i)) {
      Ke("Skipping received update - not newer than current", this.versionVector, i);
      return;
    }
    try {
      Ke("Applying update from channel:", r), this._files = new Map(r.files), this._mergeVersionVector(i), Ke("Memory updated from channel successfully");
    } catch (o) {
      ar("Failed to apply channel message:", o);
    }
  }
  async wipe() {
    Ke(`Wiping db: ${this.dbName}`), this._files.clear(), this._initializeRoot(), this.versionVector = { [this.deviceId]: 0 }, await this._handleFilesChange();
  }
  async _handleFilesChange() {
    this._incrementVersionVector(), this.options?.supportsServiceWorker && this.options?.useSW && await this.sendFilesToSW();
  }
  async readFile(e, t = {}) {
    if (Ke("this.files", this._files), !this._files.has(e))
      throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
    const r = this._files.get(e);
    if (r.type !== "file")
      throw Object.assign(new Error("EISDIR"), { code: "EISDIR" });
    return t.encoding === "utf8" ? new TextDecoder().decode(r.data) : r.data;
  }
  async writeFile(e, t, r = {}) {
    const i = typeof t == "string" ? new TextEncoder().encode(t) : t || new Uint8Array();
    this._files.set(e, {
      type: "file",
      mode: r.mode || 438,
      data: i,
      size: i.length,
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
    const r = /* @__PURE__ */ new Set(), i = e === "/" ? "/" : `${e}/`;
    for (const a of this._files.keys())
      if (a.startsWith(i) && a !== e) {
        const o = a.slice(i.length).split("/")[0];
        r.add(o);
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
    for (const i of this._files.keys())
      if (i.startsWith(`${t}/`))
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
const bf = await Mr(), tc = new Ur(bf.logging.fsManagerES6);
function st(...n) {
  tc.consoleDotLog("[fsManagerES6] ", ...n);
}
function Di(...n) {
  tc.consoleDotError("[fsManagerES6] ", ...n);
}
st("Loading fsmanagerES6.");
class Ef {
  constructor(e = { supportsServiceWorker: !0, useSW: !0 }) {
    this.fsInstances = /* @__PURE__ */ new Map(), this.initializationLocks = /* @__PURE__ */ new Map(), this.debug = !0, this.options = e, this.memoryBackends = /* @__PURE__ */ new Map();
  }
  _log(...e) {
    this.debug && st("[fsManager]", ...e);
  }
  _error(...e) {
    Di("[fsManager]", ...e);
  }
  async initializeFS(e, t) {
    const r = `${e}-${t}`;
    this._log(`Initializing FS: ${r}`);
    try {
      if (st("Initializing."), this.fsInstances.has(r))
        return this._log(`FS ${r} already exists`), this.fsInstances.get(r);
      let i;
      if (t === "memory") {
        st(`Creating memory FS for ${r}`);
        const a = new ss(this.options, e);
        st(`Memory backend created for ${r} backend: `, a), this.memoryBackends.set(r, a), i = new Er(e, { backend: a }), st(`Memory FS created for ${r}`), this._log(`Created memory FS with backend for ${r}`);
      } else if (t === "idb")
        i = new Er(e), this._log(`Created IDB FS for ${r}`);
      else
        throw new Error(`Unsupported FS type: ${t}`);
      return this.fsInstances.set(r, i), i;
    } catch (i) {
      throw this._error(`Failed to initialize ${r}:`, i), i;
    }
  }
  async getFS(e, t) {
    const r = `${e}-${t}`;
    if (this._log(`Requesting FS: ${r}`), this.initializationLocks.has(r))
      return this._log(`Waiting for existing initialization of ${r}`), this.initializationLocks.get(r);
    const i = (async () => {
      try {
        return this.fsInstances.has(r) ? { new: !1, fs: this.fsInstances.get(r) } : { new: !0, fs: await this.initializeFS(e, t) };
      } finally {
        this.initializationLocks.delete(r);
      }
    })();
    return this.initializationLocks.set(r, i), i;
  }
  async deleteFS(e, t) {
    const r = `${e}-${t}`;
    this._log(`Deleting FS: ${r}`);
    try {
      if (!this.fsInstances.has(r)) {
        this._log(`File system ${r} does not exist. Nothing to delete.`);
        return;
      }
      const i = this.fsInstances.get(r);
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
            } catch (o) {
              this._error(`Error closing memory backend for ${r}:`, o);
            }
          this.memoryBackends.delete(r);
        }
        this._log(`Memory file system ${r} deleted successfully.`);
      } else
        throw new Error(`Unsupported file system type: ${t}`);
      this.fsInstances.delete(r);
    } catch (i) {
      throw this._error(`Failed to delete ${r}:`, i), i;
    }
  }
  // Enhanced createBackupFS method with better memory support
  async createBackupFS(e, t, r = "_replica") {
    const i = `${e}${r}`, a = `${e}-${t}`, o = `${i}-${t}`;
    this._log(`Creating backup of ${a} as ${o}`);
    try {
      const s = (await this.getFS(e, t))?.fs;
      if (t === "memory") {
        const h = this.memoryBackends.get(a);
        if (!h)
          throw new Error("Original memory backend not found");
        const l = new ss({
          ...this.options,
          deviceId: `${this.options.deviceId || "default"}-${Date.now()}`
        }, i);
        if (h._files instanceof Map)
          for (const [w, _] of h._files)
            l._files.set(w, { ..._ });
        else
          throw new Error("Original memory backend files not in expected format");
        const p = new Er(i, { backend: l });
        this.fsInstances.set(o, p), this.memoryBackends.set(o, l);
      } else if (t === "idb") {
        const h = new Er(i);
        this.fsInstances.set(o, h), await this._copyIDBContents(s, h, "/");
      } else
        throw new Error(`Unsupported FS type for backup: ${t}`);
      return await this._registerBackupMount(e, i), this._log(`Backup created successfully: ${o}`), this.fsInstances.get(o);
    } catch (c) {
      throw this._error(`Failed to create backup ${o}:`, c), this.fsInstances.has(o) && this.fsInstances.delete(o), this.memoryBackends.has(o) && this.memoryBackends.delete(o), c;
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
    const i = /* @__PURE__ */ new Map();
    for (const [a, o] of r._files)
      i.set(a, { ...o });
    return i;
  }
  async restoreMemorySnapshot(e, t) {
    const r = `${e}-memory`;
    if (!this.memoryBackends.has(r))
      throw new Error(`Memory filesystem ${e} not found`);
    const i = this.memoryBackends.get(r);
    i._files || i._initializeRoot(), i._files.clear();
    for (const [a, o] of t)
      i._files.set(a, { ...o });
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
    let i = 0, a = 0;
    const o = [];
    for (const [c, s] of r._files)
      i++, a += s.data ? s.data.byteLength : 0, o.push(c);
    return {
      fileCount: i,
      totalSize: a,
      paths: o.sort()
    };
  }
  async _copyIDBContents(e, t, r = "/") {
    try {
      const i = r === "/" ? "/" : r.replace(/\/+$/, ""), a = await e.promises.readdir(i);
      for (const o of a) {
        const c = i === "/" ? `/${o}` : `${i}/${o}`, s = c;
        try {
          if ((await e.promises.stat(c)).isDirectory()) {
            try {
              await t.promises.mkdir(s, { recursive: !0 });
            } catch (l) {
              if (l.code !== "EEXIST")
                throw l;
              st(`Directory ${s} already exists, continuing`);
            }
            await this._copyIDBContents(e, t, c);
          } else {
            const l = await e.promises.readFile(c);
            await t.promises.writeFile(s, l);
          }
        } catch (h) {
          this._error(`Error processing ${c}:`, h);
          continue;
        }
      }
    } catch (i) {
      throw i.code === "ENOENT" ? this._error(`Source path ${r} does not exist`) : i.code === "EEXIST" ? st(`Path ${r} already exists`) : this._error(`Error copying path ${r}:`, i), i;
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
    }, ...r }, { mountPath: o } = a;
    this._log(`Registering backup mount from ${e} to ${o}`);
    try {
      if (typeof this.mounts != "object" && (this.mounts = {}), this.backupRegistry || (this.backupRegistry = /* @__PURE__ */ new Map()), this.mounts[o])
        throw new Error(`Mount path ${o} already in use`);
      const c = this.mounts[`/${e}`] || {};
      return this.mounts[o] = {
        ...a.preserveOriginal ? c : {},
        fsName: t,
        isBackup: !0,
        originalFsName: e,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        lastAccessed: null,
        accessCount: 0,
        metadata: {
          ...c.metadata || {},
          backupType: "full",
          // could be 'incremental' or 'differential'
          backupVersion: 1,
          ...a
        }
      }, this.backupRegistry.set(t, {
        original: e,
        mountPoint: o,
        createdAt: this.mounts[o].createdAt,
        options: a,
        stats: {
          fileCount: 0,
          // Could be populated during backup
          totalSize: 0,
          // Could be populated during backup
          lastVerified: null
        }
      }), this._log(`Successfully registered backup mount at ${o}`), {
        mountPath: o,
        backupName: t,
        originalName: e,
        details: this.mounts[o]
      };
    } catch (c) {
      throw this._error("Failed to register backup mount:", c), this.mounts && this.mounts[o] && delete this.mounts[o], this.backupRegistry && this.backupRegistry.has(t) && this.backupRegistry.delete(t), c;
    }
  }
  async deleteIndexedDB(e) {
    return new Promise((t, r) => {
      const i = indexedDB.deleteDatabase(e);
      i.onsuccess = () => {
        st(`Deleted database ${e} successfully`), t();
      }, i.onerror = (a) => {
        Di(`Error deleting database ${e}:`, a), r(a);
      }, i.onblocked = () => {
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
        const i = await this.getFileStoresFromDatabases();
        return st(`File store names for ${r}:`, i), i;
      } catch (i) {
        throw Di(`Error retrieving file store names for ${r}:`, i), i;
      }
    else if (t === "memory") {
      if (this.memoryBackends.has(r)) {
        const i = this.memoryBackends.get(r);
        if (i._files)
          return {
            fileCount: i._files.size,
            filePaths: Array.from(i._files.keys())
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
      const i = typeof r == "string" ? r : r.name, o = (await this.openDatabase(i)).objectStoreNames, c = Array.from(o).filter((s) => s.startsWith("fs_")).map((s) => ({ database: i, fileStore: s }));
      t.push(...c);
    }
    return st("Processing database list:", t), t;
  }
  async openDatabase(e) {
    return st("Opening database:", e), new Promise((t, r) => {
      const i = indexedDB.open(e);
      i.onsuccess = (a) => {
        const o = a.target.result;
        t(o);
      }, i.onerror = (a) => {
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
      r instanceof Promise ? r.then((i) => {
        this.processDatabaseList(i).then((a) => e(a)).catch((a) => t(a));
      }).catch((i) => t(i)) : (r.onsuccess = async (i) => {
        const a = i.target.result;
        try {
          const o = await this.processDatabaseList(a);
          e(o);
        } catch (o) {
          t(o);
        }
      }, r.onerror = (i) => {
        t(`Error retrieving database list: ${i.target.error}`);
      });
    });
  }
}
const kf = await Mr(), rc = new Ur(kf.logging.serviceWorker);
function he(...n) {
  rc.consoleDotLog("[WorkerPool]", ...n);
}
function ze(...n) {
  rc.consoleDotError("[WorkerPool]", ...n);
}
let dt = "", pt = "", it = "/", dr = 1, Jt = wf, It = "origin", Ne = "main", Qt = "http://localhost:9000", Nr = {}, nc = 0, Ve, Ge = null, bt = {};
const Sf = new Ef(), er = "cache-v1", xf = [], cs = new URL(self.registration.scope).pathname.split("/")[1], Ni = cs ? `/${cs}/` : "/";
self.addEventListener("install", (n) => {
  self.skipWaiting(), he("install"), n.waitUntil(
    caches.open(er).then((e) => (he("Opened cache"), e.addAll(xf))).catch((e) => {
      ze("Failed to cache", e);
    })
  );
});
self.addEventListener("activate", (n) => (n.waitUntil(
  (async () => {
    dt = "", pt = "", it = "/", dr = 1, It = "origin", Ne = "main", Nr = {}, nc = 0, Ge = new mf("fs"), bt = {};
    const e = await caches.keys();
    await Promise.all(
      e.map((t) => {
        if (t !== er)
          return caches.delete(t);
      })
    );
  })()
), self.clients.claim()));
self.addEventListener("message", (n) => {
  n.data.action === "skipWaiting" && self.skipWaiting();
});
self.broadcastChannelInitialized = !1;
self.broadcastChannelInitialized || (Ve = new BroadcastChannel("worker-channel"), Ve.onmessage = async function(n) {
  const e = n.data;
  he(e);
  try {
    switch (e.operation) {
      case "setAuthParams":
        await If(e.data);
        break;
      case "setDir":
        await Rf(e.data);
        break;
      case "setRepoDir":
        await $f(e.data);
        break;
      case "setDepth":
        await Bf(e.data);
        break;
      case "setRemote":
        await Of(e.data);
        break;
      case "setRef":
        await Tf(e.data);
        break;
      case "setSettingsAddresses":
        await Pf(e.data);
        break;
      case "passFsArgs":
        await Cf(e.data);
        break;
      case "memorySync":
        await Ff(e.data);
        break;
      default:
        await Af(e);
        break;
    }
  } catch (t) {
    throw ze(`${e.operation} failed`, t), new Error(t);
  }
}, self.broadcastChannelInitialized = !0);
async function Af(n) {
  ze("Unhandled message operation:", n.operation);
}
async function If(n) {
  dt !== n.username || pt !== n.password ? (dt = n.username || "", pt = n.password || "", he("handlesetauthparame: ", n), Ve.postMessage({ operation: "setAuthParams", success: !0 })) : Ve.postMessage({ operation: "setAuthParams", success: !0 });
}
async function Rf(n) {
  it !== n ? (it = n, Ve.postMessage({ operation: "setDir", success: !0 })) : Ve.postMessage({ operation: "setDir", success: !0 });
}
async function Tf(n) {
  Ne !== n ? (Ne = n, Ve.postMessage({ operation: "setRef", success: !0 })) : Ve.postMessage({ operation: "setRef", success: !0 });
}
async function $f(n) {
  it !== n ? (it = n, Ve.postMessage({ operation: "setRepoDir", success: !0 })) : Ve.postMessage({ operation: "setRepoDir", success: !0 });
}
async function Bf(n) {
  dr !== n ? (dr = n, Ve.postMessage({ operation: "setDepth", success: !0 })) : Ve.postMessage({ operation: "setDepth", success: !0 });
}
async function Of(n) {
  It !== n ? (It = n, Ve.postMessage({ operation: "setRemote", success: !0 })) : Ve.postMessage({ operation: "setRemote", success: !0 });
}
async function Pf(n) {
  Nr !== n ? (Nr = n, Ve.postMessage({ operation: "setSettingsAddresses", success: !0 })) : Ve.postMessage({ operation: "setSettingsAddresses", success: !0 });
}
async function Cf(n) {
  try {
    bt !== n ? (bt = n, he("fsArgs", bt), Ge = await Sf.getFS(bt.fsName, bt.fsType), Ve.postMessage({ operation: "passFsArgs", success: !0 })) : Ve.postMessage({ operation: "passFsArgs", success: !0 });
  } catch (e) {
    ze("some error happened in passFsArgs: ", e);
  }
}
async function Ff(n) {
  he("handle sync yoo hoo: ", n);
}
async function Df(n) {
  try {
    he("pathname", n);
    const e = await Ge.promises.readFile(n, "utf8");
    if (e)
      return he("fetch content", e), e;
  } catch (e) {
    throw new Error("Unable to fetch file content: " + e);
  }
}
self.addEventListener("fetch", (n) => {
  try {
    const e = new URL(n.request.url);
    if (console.log(`Fetching: ${e.pathname}`), console.log("Service Worker scope:", self.registration.scope), console.log("Request URL path:", e.pathname), e.pathname.endsWith("/git")) {
      n.respondWith(
        Mf(n.request).catch((r) => (console.error("Error handling Git request:", r), new Response(
          JSON.stringify({ error: "Git request failed", details: r.message || r.toString() }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        )))
      );
      return;
    }
    const t = Ni && e.pathname.startsWith(Ni) ? e.pathname.slice(Ni.length - 1) : e.pathname;
    if (console.log(`Extracted path: ${t}`), Nr[t]) {
      console.log("Matched settings file path:", t), n.respondWith(
        Df(t).then(
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
    n.respondWith(
      fetch(n.request).then((r) => r.ok ? r : (console.error("HTTP error response:", r.status), new Response(
        JSON.stringify({ error: "HTTP error", status: r.status }),
        { status: r.status, headers: { "Content-Type": "application/json" } }
      ))).catch((r) => (console.error("Network fetch failed:", r), new Response(
        JSON.stringify({ error: "Network error", details: r.message || r.toString() }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )))
    );
  } catch (e) {
    console.error("Error in fetch handler:", e), n.respondWith(
      new Response(
        JSON.stringify({ error: "Unexpected error", details: e.message || e.toString() }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    );
  }
});
class Nf {
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
const at = new Nf();
async function Mf(n) {
  try {
    const e = await n.json().catch(() => {
      throw new Error("Invalid JSON in request body");
    }), { operation: t, args: r } = e;
    if (!t)
      return new Response(
        JSON.stringify({ error: "Missing operation field" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    let i;
    try {
      switch (t) {
        case "clone":
          i = await Lf(r);
          break;
        case "pull":
          i = await Wf(r);
          break;
        case "push":
          i = await Vf(r);
          break;
        case "fetch":
          i = await Xf(r);
          break;
        case "fastForward":
          i = await Zf(r);
          break;
        case "listServerRefs":
          i = await jf(r);
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
      JSON.stringify(i),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    return console.error("Error in handleGitRequest:", e), new Response(
      JSON.stringify({ error: "Unexpected error", details: e.message || e.toString() }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
async function Uf({ dir: n, ref: e, branch: t }) {
  var r = /^HEAD~([0-9]+)$/, i = e.match(r);
  if (i) {
    var a = +i[1], o = await Qu({ fs: Ge, dir: n, depth: a + 1 }), c = o.pop().oid;
    return new Promise((s, h) => {
      Ge.writeFile(n + `/.git/refs/heads/${t}`, c, (l) => {
        if (l)
          return h(l);
        Ge.unlink(n + "/.git/index", (p) => {
          if (p)
            return h(p);
          Au({ dir: n, fs: Ge, ref: t, force: !0 }).then(s);
        });
      });
    });
  }
  return Promise.reject(`Wrong ref ${e}`);
}
async function tr(n, e, t = 2) {
  let r = 0, i = 1e3;
  for (; r <= t; )
    try {
      return await n(e);
    } catch (a) {
      if (a.message.includes("Failed to fetch") || a.message.includes("CORS") || a.message.includes("HTTP Error")) {
        if (r++, r > t) throw new Error("Max retries reached for operation.");
        he(`Network error, Retrying operation in ${i / 1e3} seconds... (Attempt ${r})`), await new Promise((o) => setTimeout(o, i)), i *= 2;
      } else
        throw a;
    }
}
function rr(n, e) {
  return !n && !e ? (he("No username or password provided. Returning empty headers."), {}) : {
    authorization: `Basic ${btoa(`${n}:${e}`)}`
  };
}
async function jf(n) {
  return he("listServerRefs args", n), await tr(async () => {
    await at.lock();
    try {
      if (he("Entering listServerRefs function with arguments:", n), !n.url)
        throw new Error("URL parameter is required for listServerRefs");
      const e = await Xu({
        ...n,
        fs: Ge,
        http: Jt,
        dir: it,
        corsProxy: Qt,
        remote: n.remote || It,
        // Fallback to global remote
        headers: rr(dt, pt),
        onAuth() {
          return ct.fill();
        },
        onAuthFailure() {
          return ct.rejected();
        }
      });
      return he("ListServerRefs successful. Result:", e), { success: !0, refs: e };
    } catch (e) {
      if (e?.message?.includes("Could not find") && e?.code === "NotFoundError") {
        if (!await nr())
          throw e;
        return { success: !0, message: "listServerRefs was successful" };
      }
      return ze("Error occurred during listServerRefs operation:", e), { success: !1, error: e.message };
    } finally {
      he("Exiting listServerRefs function."), at.unlock();
    }
  }, n);
}
async function Lf(n) {
  return he("entering clone with : ", n), await tr(async () => {
    he("Entering clone function with arguments:", n);
    let e = {};
    await at.lock();
    try {
      if (e = await qf(bt.fsName), e)
        await Hf(e), await Uf({ dir: it, ref: "HEAD~1", branch: Ne }), await ls("clone (from cache)", { fsName: bt.fsName }), he("log", await Yf()), e = { isCacheUsed: !0, ref: Ne };
      else {
        const t = await Mu({
          ...n,
          fs: Ge,
          http: Jt,
          dir: it,
          remote: It,
          ref: Ne,
          corsProxy: Qt,
          depth: dr,
          headers: rr(dt, pt),
          onAuth() {
            return ct.fill();
          },
          onAuthFailure() {
            return ct.rejected();
          }
        });
        if (nc) {
          const r = await ic();
          await zf(bt.fsName, r);
        }
        e = { isCacheUsed: !1, ref: Ne }, await ls("clone", { fsName: bt.fsName, result: t });
      }
      return { success: !0, message: "The repo has successfully cloned", data: e };
    } catch (t) {
      if (ze("Clone failed with error:", t), t?.message?.includes("Could not find") && t?.code === "NotFoundError") {
        if (!await nr())
          throw t;
        return e = { isCacheUsed: !1, ref: Ne }, { success: !0, message: "The repo has successfully cloned", data: e };
      } else throw t?.response?.status === 500 ? (ze("Server responded with 500 Internal Server Error"), new Error("Internal Server Error: The server encountered an error.")) : typeof t == "object" ? (ze("Error properties:", Object.keys(t)), new Error(t || "An unknown error occurred during the clone operation")) : (ze("Unknown error:", t), new Error("An unknown error occurred during the clone operation"));
    } finally {
      at.unlock();
    }
  }, n);
}
async function zf(n, e) {
  try {
    const t = await caches.open(er), r = {};
    he("fl", e);
    for (const [a, o] of Object.entries(e)) {
      he("fn, fp", a, o);
      const c = await Ge.promises.stat(o);
      if (c.isDirectory())
        r[o] = "";
      else if (c.isFile()) {
        const s = await Ge.promises.readFile(o, "utf8");
        r[o] = s;
      }
    }
    he("filesWithContent", r);
    const i = new Response(JSON.stringify(r), {
      headers: { "Content-Type": "application/json" }
    });
    await t.put(n, i), he("File list and contents cached successfully", i);
  } catch (t) {
    ze("Error caching file list and contents:", t);
  }
}
async function ic(n = it) {
  try {
    let e = n, t = await Ge.promises.readdir(n), r = {};
    he("files", t), r[n] = n;
    for (const i of t) {
      he("file", i);
      let a = e !== "/" ? `${e}/${i}` : `${e}${i}`;
      (await Ge.promises.lstat(a)).isDirectory() ? (he("fullPath", a), r = { ...r, ...await ic(a) }) : (he("result", r), r[a] = a);
    }
    return r;
  } catch (e) {
    throw ze("Error listing files:", e), e;
  }
}
async function qf(n) {
  try {
    const t = await (await caches.open(er)).match(n);
    if (t) {
      const r = await t.json();
      return he("Files and contents fetched from cache:", r), r;
    } else
      return he("No cached file list found"), null;
  } catch (e) {
    return ze("Error fetching cached file list and contents:", e), null;
  }
}
async function Hf(n) {
  for (const [e, t] of Object.entries(n)) {
    const r = e.split("/").slice(0, -1).join("/");
    r && await Gf(Ge, r), t === "" ? (await Ge.promises.mkdir(e, { recursive: !0 }), he(`Directory created: ${e}`)) : await Ge.promises.writeFile(e, t);
  }
  he("All files and contents have been written to IndexedDB using LightningFS.");
}
async function Gf(n, e) {
  const t = e.split("/").filter((i) => i);
  let r = "";
  for (const i of t) {
    r += `/${i}`;
    try {
      await n.promises.mkdir(r), he(`Directory created: ${r}`);
    } catch (a) {
      if (a.code !== "EEXIST")
        throw ze(`Error creating directory: ${r}`, a), a;
    }
  }
}
const ct = {
  async fill() {
    return he("authenticate", dt, pt), { username: dt, password: pt };
  },
  async rejected() {
    const n = new Error("Authentication rejected");
    throw he("Authentication rejected", n), n;
  }
};
async function Wf(n) {
  return await tr(async () => {
    let e = {};
    await at.lock();
    try {
      if (he("Entering pull function with arguments:", n), !Ne)
        throw new Error("Reference (ref) is not defined.");
      he("Using reference (ref):", Ne);
      const t = await rf({
        ...n,
        fs: Ge,
        http: Jt,
        dir: it,
        corsProxy: Qt,
        remote: It,
        remoteRef: Ne,
        fastForward: !0,
        forced: !0,
        singleBranch: !0,
        headers: rr(dt, pt),
        onAuth() {
          return ct.fill();
        },
        onAuthFailure() {
          return ct.rejected();
        }
      });
      return e = { ref: Ne }, he("Pull successful. Result:", t), { success: !0, message: t, data: e };
    } catch (t) {
      if (t?.message?.includes("Could not find") && t?.code === "NotFoundError") {
        if (!await nr())
          throw t;
        return e = { ref: Ne }, { success: !0, message: "pull was successful", data: e };
      }
      throw ze("Error occurred during pull operation:", t), new Error(`Pull failed: ${t}`);
    } finally {
      he("Exiting pull function."), at.unlock();
    }
  }, n);
}
async function Zf(n) {
  return await tr(async () => {
    let e = {};
    await at.lock();
    try {
      if (he("Entering fastForward function with arguments:", n), !Ne)
        throw new Error("Reference (ref) is not defined.");
      const t = await qu({
        ...n,
        fs: Ge,
        http: Jt,
        dir: it,
        remote: It,
        corsProxy: Qt,
        ref: Ne,
        remoteref: Ne,
        forced: !0,
        singleBranch: !1,
        headers: rr(dt, pt),
        onAuth() {
          return ct.fill();
        },
        onAuthFailure() {
          return ct.rejected();
        }
      });
      return e = { ref: Ne }, he("FastForward pull successful. Result:", t), { success: !0, message: t, data: e };
    } catch (t) {
      if (t?.message?.includes("Could not find") && t?.code === "NotFoundError") {
        if (!await nr())
          throw t;
        return e = { ref: Ne }, { success: !0, message: "FastForward was successful", data: e };
      }
      throw ze("Error occurred during fastForward operation:", t), new Error(`FastForward pull failed: ${t}`);
    } finally {
      he("Exiting fastForward function."), at.unlock();
    }
  }, n);
}
async function Vf(n) {
  return await tr(async () => {
    let e = {};
    await at.lock();
    try {
      if (he("Entering push function with arguments:", n), !Ne)
        throw new Error("Reference (ref) is not defined.");
      const t = await cf({
        ...n,
        fs: Ge,
        http: Jt,
        dir: it,
        corsProxy: Qt,
        remote: It,
        ref: Ne,
        force: !0,
        headers: rr(dt, pt),
        onAuth() {
          return ct.fill();
        },
        onAuthFailure() {
          return ct.rejected();
        }
      });
      return e = { ref: Ne }, he("Push successful. Result:", t), { success: !0, message: "Push was successful", data: e };
    } catch (t) {
      if (t?.message?.includes("Could not find") && t?.code === "NotFoundError") {
        if (!await nr())
          throw t;
        return e = { ref: Ne }, { success: !0, message: "Push was successful", data: e };
      }
      ze("Error occurred during push operation:", t);
    } finally {
      he("Exiting push function."), at.unlock();
    }
  }, n);
}
async function Xf(n) {
  return await tr(async () => {
    let e = {};
    await at.lock();
    try {
      if (he("Entering doFetch function with arguments:", n), !Ne)
        throw new Error("Reference (ref) is not defined.");
      let t = n?.ref || Ne;
      const r = await Hu({
        ...n,
        fs: Ge,
        http: Jt,
        dir: it,
        corsProxy: Qt,
        ref: t,
        remote: It,
        depth: dr,
        singleBranch: !1,
        tags: !1,
        onProgress: (i) => {
          he("Fetch progress event:", i);
        },
        headers: rr(dt, pt),
        onAuth() {
          return ct.fill();
        },
        onAuthFailure() {
          return ct.rejected();
        }
      });
      return e = { ref: Ne }, he("Fetch successful. Result:", r), { success: !0, message: "Fetch was successful", data: e };
    } catch (t) {
      if (t?.message?.includes("Could not find") && t?.code === "NotFoundError") {
        if (!await nr())
          throw t;
        return e = { ref: Ne }, { success: !0, message: "The repo has successfully cloned", data: e };
      }
      throw ze("Error occurred during fetch operation:", t), new Error(`Fetch failed: ${t}`);
    } finally {
      he("Exiting doFetch function."), at.unlock();
    }
  }, n);
}
async function ls(n, e) {
  try {
    const t = await caches.open(er);
    let r = await caches.match("log"), i = r ? await r.json() : [];
    const a = (/* @__PURE__ */ new Date()).toISOString(), o = { action: n, data: e, timestamp: a };
    i.push(o);
    let c = new Blob([JSON.stringify(i)]).size;
    const s = 5 * 1024;
    for (; c > s; )
      i.shift(), c = new Blob([JSON.stringify(i)]).size;
    const h = new Response(JSON.stringify(i), { headers: { "Content-Type": "application/json" } });
    await t.put("log", h), he(`Logged action: ${n} at ${a}`, o);
  } catch (t) {
    ze("Error logging data to cache:", t);
  }
}
async function Yf() {
  try {
    const e = await (await caches.open(er)).match("log");
    if (e) {
      const t = await e.json();
      return he("Retrieved logs from cache:", t), t;
    } else
      return he("No logs found in cache."), [];
  } catch (n) {
    return ze("Error retrieving logs from cache:", n), [];
  }
}
async function nr() {
  try {
    throw at.unlock(), ze("Only Main is supported for refs."), new Error("Only Main is supported for refs.");
  } catch (n) {
    throw ze(`Checkout to branch "${Ne}" failed:`, n), n;
  }
}
//# sourceMappingURL=service-worker.js.map
