function we(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
function me(c) {
  if (Object.prototype.hasOwnProperty.call(c, "__esModule")) return c;
  var l = c.default;
  if (typeof l == "function") {
    var f = function m() {
      return this instanceof m ? Reflect.construct(l, arguments, this.constructor) : l.apply(this, arguments);
    };
    f.prototype = l.prototype;
  } else f = {};
  return Object.defineProperty(f, "__esModule", { value: !0 }), Object.keys(c).forEach(function(m) {
    var p = Object.getOwnPropertyDescriptor(c, m);
    Object.defineProperty(f, m, p.get ? p : {
      enumerable: !0,
      get: function() {
        return c[m];
      }
    });
  }), f;
}
var st, Nt;
function ye() {
  if (Nt) return st;
  Nt = 1, st = c;
  function c(l) {
    var f, m;
    if (typeof l != "function")
      throw new Error("expected a function but got " + l);
    return function() {
      return f || (f = !0, m = l.apply(this, arguments)), m;
    };
  }
  return st;
}
var Vt = {}, et = {};
et.byteLength = Ee;
et.toByteArray = ke;
et.fromByteArray = ve;
var $ = [], L = [], _e = typeof Uint8Array < "u" ? Uint8Array : Array, at = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var V = 0, ge = at.length; V < ge; ++V)
  $[V] = at[V], L[at.charCodeAt(V)] = V;
L[45] = 62;
L[95] = 63;
function Kt(c) {
  var l = c.length;
  if (l % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var f = c.indexOf("=");
  f === -1 && (f = l);
  var m = f === l ? 0 : 4 - f % 4;
  return [f, m];
}
function Ee(c) {
  var l = Kt(c), f = l[0], m = l[1];
  return (f + m) * 3 / 4 - m;
}
function Be(c, l, f) {
  return (l + f) * 3 / 4 - f;
}
function ke(c) {
  var l, f = Kt(c), m = f[0], p = f[1], h = new _e(Be(c, m, p)), d = 0, n = p > 0 ? m - 4 : m, a;
  for (a = 0; a < n; a += 4)
    l = L[c.charCodeAt(a)] << 18 | L[c.charCodeAt(a + 1)] << 12 | L[c.charCodeAt(a + 2)] << 6 | L[c.charCodeAt(a + 3)], h[d++] = l >> 16 & 255, h[d++] = l >> 8 & 255, h[d++] = l & 255;
  return p === 2 && (l = L[c.charCodeAt(a)] << 2 | L[c.charCodeAt(a + 1)] >> 4, h[d++] = l & 255), p === 1 && (l = L[c.charCodeAt(a)] << 10 | L[c.charCodeAt(a + 1)] << 4 | L[c.charCodeAt(a + 2)] >> 2, h[d++] = l >> 8 & 255, h[d++] = l & 255), h;
}
function be(c) {
  return $[c >> 18 & 63] + $[c >> 12 & 63] + $[c >> 6 & 63] + $[c & 63];
}
function Ie(c, l, f) {
  for (var m, p = [], h = l; h < f; h += 3)
    m = (c[h] << 16 & 16711680) + (c[h + 1] << 8 & 65280) + (c[h + 2] & 255), p.push(be(m));
  return p.join("");
}
function ve(c) {
  for (var l, f = c.length, m = f % 3, p = [], h = 16383, d = 0, n = f - m; d < n; d += h)
    p.push(Ie(c, d, d + h > n ? n : d + h));
  return m === 1 ? (l = c[f - 1], p.push(
    $[l >> 2] + $[l << 4 & 63] + "=="
  )) : m === 2 && (l = (c[f - 2] << 8) + c[f - 1], p.push(
    $[l >> 10] + $[l >> 4 & 63] + $[l << 2 & 63] + "="
  )), p.join("");
}
var bt = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
bt.read = function(c, l, f, m, p) {
  var h, d, n = p * 8 - m - 1, a = (1 << n) - 1, _ = a >> 1, o = -7, k = f ? p - 1 : 0, v = f ? -1 : 1, y = c[l + k];
  for (k += v, h = y & (1 << -o) - 1, y >>= -o, o += n; o > 0; h = h * 256 + c[l + k], k += v, o -= 8)
    ;
  for (d = h & (1 << -o) - 1, h >>= -o, o += m; o > 0; d = d * 256 + c[l + k], k += v, o -= 8)
    ;
  if (h === 0)
    h = 1 - _;
  else {
    if (h === a)
      return d ? NaN : (y ? -1 : 1) * (1 / 0);
    d = d + Math.pow(2, m), h = h - _;
  }
  return (y ? -1 : 1) * d * Math.pow(2, h - m);
};
bt.write = function(c, l, f, m, p, h) {
  var d, n, a, _ = h * 8 - p - 1, o = (1 << _) - 1, k = o >> 1, v = p === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, y = m ? 0 : h - 1, B = m ? 1 : -1, b = l < 0 || l === 0 && 1 / l < 0 ? 1 : 0;
  for (l = Math.abs(l), isNaN(l) || l === 1 / 0 ? (n = isNaN(l) ? 1 : 0, d = o) : (d = Math.floor(Math.log(l) / Math.LN2), l * (a = Math.pow(2, -d)) < 1 && (d--, a *= 2), d + k >= 1 ? l += v / a : l += v * Math.pow(2, 1 - k), l * a >= 2 && (d++, a /= 2), d + k >= o ? (n = 0, d = o) : d + k >= 1 ? (n = (l * a - 1) * Math.pow(2, p), d = d + k) : (n = l * Math.pow(2, k - 1) * Math.pow(2, p), d = 0)); p >= 8; c[f + y] = n & 255, y += B, n /= 256, p -= 8)
    ;
  for (d = d << p | n, _ += p; _ > 0; c[f + y] = d & 255, y += B, d /= 256, _ -= 8)
    ;
  c[f + y - B] |= b * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(c) {
  const l = et, f = bt, m = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  c.Buffer = o, c.SlowBuffer = O, c.INSPECT_MAX_BYTES = 50;
  const p = 2147483647;
  c.kMaxLength = p;
  const { Uint8Array: h, ArrayBuffer: d, SharedArrayBuffer: n } = globalThis;
  o.TYPED_ARRAY_SUPPORT = a(), !o.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function a() {
    try {
      const i = new h(1), t = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(t, h.prototype), Object.setPrototypeOf(i, t), i.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(o.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (o.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(o.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (o.isBuffer(this))
        return this.byteOffset;
    }
  });
  function _(i) {
    if (i > p)
      throw new RangeError('The value "' + i + '" is invalid for option "size"');
    const t = new h(i);
    return Object.setPrototypeOf(t, o.prototype), t;
  }
  function o(i, t, e) {
    if (typeof i == "number") {
      if (typeof t == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return B(i);
    }
    return k(i, t, e);
  }
  o.poolSize = 8192;
  function k(i, t, e) {
    if (typeof i == "string")
      return b(i, t);
    if (d.isView(i))
      return g(i);
    if (i == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof i
      );
    if (j(i, d) || i && j(i.buffer, d) || typeof n < "u" && (j(i, n) || i && j(i.buffer, n)))
      return E(i, t, e);
    if (typeof i == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const r = i.valueOf && i.valueOf();
    if (r != null && r !== i)
      return o.from(r, t, e);
    const s = T(i);
    if (s) return s;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof i[Symbol.toPrimitive] == "function")
      return o.from(i[Symbol.toPrimitive]("string"), t, e);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof i
    );
  }
  o.from = function(i, t, e) {
    return k(i, t, e);
  }, Object.setPrototypeOf(o.prototype, h.prototype), Object.setPrototypeOf(o, h);
  function v(i) {
    if (typeof i != "number")
      throw new TypeError('"size" argument must be of type number');
    if (i < 0)
      throw new RangeError('The value "' + i + '" is invalid for option "size"');
  }
  function y(i, t, e) {
    return v(i), i <= 0 ? _(i) : t !== void 0 ? typeof e == "string" ? _(i).fill(t, e) : _(i).fill(t) : _(i);
  }
  o.alloc = function(i, t, e) {
    return y(i, t, e);
  };
  function B(i) {
    return v(i), _(i < 0 ? 0 : x(i) | 0);
  }
  o.allocUnsafe = function(i) {
    return B(i);
  }, o.allocUnsafeSlow = function(i) {
    return B(i);
  };
  function b(i, t) {
    if ((typeof t != "string" || t === "") && (t = "utf8"), !o.isEncoding(t))
      throw new TypeError("Unknown encoding: " + t);
    const e = U(i, t) | 0;
    let r = _(e);
    const s = r.write(i, t);
    return s !== e && (r = r.slice(0, s)), r;
  }
  function S(i) {
    const t = i.length < 0 ? 0 : x(i.length) | 0, e = _(t);
    for (let r = 0; r < t; r += 1)
      e[r] = i[r] & 255;
    return e;
  }
  function g(i) {
    if (j(i, h)) {
      const t = new h(i);
      return E(t.buffer, t.byteOffset, t.byteLength);
    }
    return S(i);
  }
  function E(i, t, e) {
    if (t < 0 || i.byteLength < t)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (i.byteLength < t + (e || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let r;
    return t === void 0 && e === void 0 ? r = new h(i) : e === void 0 ? r = new h(i, t) : r = new h(i, t, e), Object.setPrototypeOf(r, o.prototype), r;
  }
  function T(i) {
    if (o.isBuffer(i)) {
      const t = x(i.length) | 0, e = _(t);
      return e.length === 0 || i.copy(e, 0, 0, t), e;
    }
    if (i.length !== void 0)
      return typeof i.length != "number" || ot(i.length) ? _(0) : S(i);
    if (i.type === "Buffer" && Array.isArray(i.data))
      return S(i.data);
  }
  function x(i) {
    if (i >= p)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + p.toString(16) + " bytes");
    return i | 0;
  }
  function O(i) {
    return +i != i && (i = 0), o.alloc(+i);
  }
  o.isBuffer = function(t) {
    return t != null && t._isBuffer === !0 && t !== o.prototype;
  }, o.compare = function(t, e) {
    if (j(t, h) && (t = o.from(t, t.offset, t.byteLength)), j(e, h) && (e = o.from(e, e.offset, e.byteLength)), !o.isBuffer(t) || !o.isBuffer(e))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (t === e) return 0;
    let r = t.length, s = e.length;
    for (let u = 0, w = Math.min(r, s); u < w; ++u)
      if (t[u] !== e[u]) {
        r = t[u], s = e[u];
        break;
      }
    return r < s ? -1 : s < r ? 1 : 0;
  }, o.isEncoding = function(t) {
    switch (String(t).toLowerCase()) {
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
  }, o.concat = function(t, e) {
    if (!Array.isArray(t))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (t.length === 0)
      return o.alloc(0);
    let r;
    if (e === void 0)
      for (e = 0, r = 0; r < t.length; ++r)
        e += t[r].length;
    const s = o.allocUnsafe(e);
    let u = 0;
    for (r = 0; r < t.length; ++r) {
      let w = t[r];
      if (j(w, h))
        u + w.length > s.length ? (o.isBuffer(w) || (w = o.from(w)), w.copy(s, u)) : h.prototype.set.call(
          s,
          w,
          u
        );
      else if (o.isBuffer(w))
        w.copy(s, u);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      u += w.length;
    }
    return s;
  };
  function U(i, t) {
    if (o.isBuffer(i))
      return i.length;
    if (d.isView(i) || j(i, d))
      return i.byteLength;
    if (typeof i != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof i
      );
    const e = i.length, r = arguments.length > 2 && arguments[2] === !0;
    if (!r && e === 0) return 0;
    let s = !1;
    for (; ; )
      switch (t) {
        case "ascii":
        case "latin1":
        case "binary":
          return e;
        case "utf8":
        case "utf-8":
          return nt(i).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return e * 2;
        case "hex":
          return e >>> 1;
        case "base64":
          return Ft(i).length;
        default:
          if (s)
            return r ? -1 : nt(i).length;
          t = ("" + t).toLowerCase(), s = !0;
      }
  }
  o.byteLength = U;
  function M(i, t, e) {
    let r = !1;
    if ((t === void 0 || t < 0) && (t = 0), t > this.length || ((e === void 0 || e > this.length) && (e = this.length), e <= 0) || (e >>>= 0, t >>>= 0, e <= t))
      return "";
    for (i || (i = "utf8"); ; )
      switch (i) {
        case "hex":
          return se(this, t, e);
        case "utf8":
        case "utf-8":
          return vt(this, t, e);
        case "ascii":
          return ne(this, t, e);
        case "latin1":
        case "binary":
          return oe(this, t, e);
        case "base64":
          return ie(this, t, e);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ae(this, t, e);
        default:
          if (r) throw new TypeError("Unknown encoding: " + i);
          i = (i + "").toLowerCase(), r = !0;
      }
  }
  o.prototype._isBuffer = !0;
  function C(i, t, e) {
    const r = i[t];
    i[t] = i[e], i[e] = r;
  }
  o.prototype.swap16 = function() {
    const t = this.length;
    if (t % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let e = 0; e < t; e += 2)
      C(this, e, e + 1);
    return this;
  }, o.prototype.swap32 = function() {
    const t = this.length;
    if (t % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let e = 0; e < t; e += 4)
      C(this, e, e + 3), C(this, e + 1, e + 2);
    return this;
  }, o.prototype.swap64 = function() {
    const t = this.length;
    if (t % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let e = 0; e < t; e += 8)
      C(this, e, e + 7), C(this, e + 1, e + 6), C(this, e + 2, e + 5), C(this, e + 3, e + 4);
    return this;
  }, o.prototype.toString = function() {
    const t = this.length;
    return t === 0 ? "" : arguments.length === 0 ? vt(this, 0, t) : M.apply(this, arguments);
  }, o.prototype.toLocaleString = o.prototype.toString, o.prototype.equals = function(t) {
    if (!o.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
    return this === t ? !0 : o.compare(this, t) === 0;
  }, o.prototype.inspect = function() {
    let t = "";
    const e = c.INSPECT_MAX_BYTES;
    return t = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (t += " ... "), "<Buffer " + t + ">";
  }, m && (o.prototype[m] = o.prototype.inspect), o.prototype.compare = function(t, e, r, s, u) {
    if (j(t, h) && (t = o.from(t, t.offset, t.byteLength)), !o.isBuffer(t))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t
      );
    if (e === void 0 && (e = 0), r === void 0 && (r = t ? t.length : 0), s === void 0 && (s = 0), u === void 0 && (u = this.length), e < 0 || r > t.length || s < 0 || u > this.length)
      throw new RangeError("out of range index");
    if (s >= u && e >= r)
      return 0;
    if (s >= u)
      return -1;
    if (e >= r)
      return 1;
    if (e >>>= 0, r >>>= 0, s >>>= 0, u >>>= 0, this === t) return 0;
    let w = u - s, I = r - e;
    const P = Math.min(w, I), A = this.slice(s, u), F = t.slice(e, r);
    for (let R = 0; R < P; ++R)
      if (A[R] !== F[R]) {
        w = A[R], I = F[R];
        break;
      }
    return w < I ? -1 : I < w ? 1 : 0;
  };
  function H(i, t, e, r, s) {
    if (i.length === 0) return -1;
    if (typeof e == "string" ? (r = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, ot(e) && (e = s ? 0 : i.length - 1), e < 0 && (e = i.length + e), e >= i.length) {
      if (s) return -1;
      e = i.length - 1;
    } else if (e < 0)
      if (s) e = 0;
      else return -1;
    if (typeof t == "string" && (t = o.from(t, r)), o.isBuffer(t))
      return t.length === 0 ? -1 : q(i, t, e, r, s);
    if (typeof t == "number")
      return t = t & 255, typeof h.prototype.indexOf == "function" ? s ? h.prototype.indexOf.call(i, t, e) : h.prototype.lastIndexOf.call(i, t, e) : q(i, [t], e, r, s);
    throw new TypeError("val must be string, number or Buffer");
  }
  function q(i, t, e, r, s) {
    let u = 1, w = i.length, I = t.length;
    if (r !== void 0 && (r = String(r).toLowerCase(), r === "ucs2" || r === "ucs-2" || r === "utf16le" || r === "utf-16le")) {
      if (i.length < 2 || t.length < 2)
        return -1;
      u = 2, w /= 2, I /= 2, e /= 2;
    }
    function P(F, R) {
      return u === 1 ? F[R] : F.readUInt16BE(R * u);
    }
    let A;
    if (s) {
      let F = -1;
      for (A = e; A < w; A++)
        if (P(i, A) === P(t, F === -1 ? 0 : A - F)) {
          if (F === -1 && (F = A), A - F + 1 === I) return F * u;
        } else
          F !== -1 && (A -= A - F), F = -1;
    } else
      for (e + I > w && (e = w - I), A = e; A >= 0; A--) {
        let F = !0;
        for (let R = 0; R < I; R++)
          if (P(i, A + R) !== P(t, R)) {
            F = !1;
            break;
          }
        if (F) return A;
      }
    return -1;
  }
  o.prototype.includes = function(t, e, r) {
    return this.indexOf(t, e, r) !== -1;
  }, o.prototype.indexOf = function(t, e, r) {
    return H(this, t, e, r, !0);
  }, o.prototype.lastIndexOf = function(t, e, r) {
    return H(this, t, e, r, !1);
  };
  function Y(i, t, e, r) {
    e = Number(e) || 0;
    const s = i.length - e;
    r ? (r = Number(r), r > s && (r = s)) : r = s;
    const u = t.length;
    r > u / 2 && (r = u / 2);
    let w;
    for (w = 0; w < r; ++w) {
      const I = parseInt(t.substr(w * 2, 2), 16);
      if (ot(I)) return w;
      i[e + w] = I;
    }
    return w;
  }
  function Z(i, t, e, r) {
    return tt(nt(t, i.length - e), i, e, r);
  }
  function it(i, t, e, r) {
    return tt(le(t), i, e, r);
  }
  function z(i, t, e, r) {
    return tt(Ft(t), i, e, r);
  }
  function ee(i, t, e, r) {
    return tt(fe(t, i.length - e), i, e, r);
  }
  o.prototype.write = function(t, e, r, s) {
    if (e === void 0)
      s = "utf8", r = this.length, e = 0;
    else if (r === void 0 && typeof e == "string")
      s = e, r = this.length, e = 0;
    else if (isFinite(e))
      e = e >>> 0, isFinite(r) ? (r = r >>> 0, s === void 0 && (s = "utf8")) : (s = r, r = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const u = this.length - e;
    if ((r === void 0 || r > u) && (r = u), t.length > 0 && (r < 0 || e < 0) || e > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    s || (s = "utf8");
    let w = !1;
    for (; ; )
      switch (s) {
        case "hex":
          return Y(this, t, e, r);
        case "utf8":
        case "utf-8":
          return Z(this, t, e, r);
        case "ascii":
        case "latin1":
        case "binary":
          return it(this, t, e, r);
        case "base64":
          return z(this, t, e, r);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ee(this, t, e, r);
        default:
          if (w) throw new TypeError("Unknown encoding: " + s);
          s = ("" + s).toLowerCase(), w = !0;
      }
  }, o.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function ie(i, t, e) {
    return t === 0 && e === i.length ? l.fromByteArray(i) : l.fromByteArray(i.slice(t, e));
  }
  function vt(i, t, e) {
    e = Math.min(i.length, e);
    const r = [];
    let s = t;
    for (; s < e; ) {
      const u = i[s];
      let w = null, I = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
      if (s + I <= e) {
        let P, A, F, R;
        switch (I) {
          case 1:
            u < 128 && (w = u);
            break;
          case 2:
            P = i[s + 1], (P & 192) === 128 && (R = (u & 31) << 6 | P & 63, R > 127 && (w = R));
            break;
          case 3:
            P = i[s + 1], A = i[s + 2], (P & 192) === 128 && (A & 192) === 128 && (R = (u & 15) << 12 | (P & 63) << 6 | A & 63, R > 2047 && (R < 55296 || R > 57343) && (w = R));
            break;
          case 4:
            P = i[s + 1], A = i[s + 2], F = i[s + 3], (P & 192) === 128 && (A & 192) === 128 && (F & 192) === 128 && (R = (u & 15) << 18 | (P & 63) << 12 | (A & 63) << 6 | F & 63, R > 65535 && R < 1114112 && (w = R));
        }
      }
      w === null ? (w = 65533, I = 1) : w > 65535 && (w -= 65536, r.push(w >>> 10 & 1023 | 55296), w = 56320 | w & 1023), r.push(w), s += I;
    }
    return re(r);
  }
  const St = 4096;
  function re(i) {
    const t = i.length;
    if (t <= St)
      return String.fromCharCode.apply(String, i);
    let e = "", r = 0;
    for (; r < t; )
      e += String.fromCharCode.apply(
        String,
        i.slice(r, r += St)
      );
    return e;
  }
  function ne(i, t, e) {
    let r = "";
    e = Math.min(i.length, e);
    for (let s = t; s < e; ++s)
      r += String.fromCharCode(i[s] & 127);
    return r;
  }
  function oe(i, t, e) {
    let r = "";
    e = Math.min(i.length, e);
    for (let s = t; s < e; ++s)
      r += String.fromCharCode(i[s]);
    return r;
  }
  function se(i, t, e) {
    const r = i.length;
    (!t || t < 0) && (t = 0), (!e || e < 0 || e > r) && (e = r);
    let s = "";
    for (let u = t; u < e; ++u)
      s += pe[i[u]];
    return s;
  }
  function ae(i, t, e) {
    const r = i.slice(t, e);
    let s = "";
    for (let u = 0; u < r.length - 1; u += 2)
      s += String.fromCharCode(r[u] + r[u + 1] * 256);
    return s;
  }
  o.prototype.slice = function(t, e) {
    const r = this.length;
    t = ~~t, e = e === void 0 ? r : ~~e, t < 0 ? (t += r, t < 0 && (t = 0)) : t > r && (t = r), e < 0 ? (e += r, e < 0 && (e = 0)) : e > r && (e = r), e < t && (e = t);
    const s = this.subarray(t, e);
    return Object.setPrototypeOf(s, o.prototype), s;
  };
  function N(i, t, e) {
    if (i % 1 !== 0 || i < 0) throw new RangeError("offset is not uint");
    if (i + t > e) throw new RangeError("Trying to access beyond buffer length");
  }
  o.prototype.readUintLE = o.prototype.readUIntLE = function(t, e, r) {
    t = t >>> 0, e = e >>> 0, r || N(t, e, this.length);
    let s = this[t], u = 1, w = 0;
    for (; ++w < e && (u *= 256); )
      s += this[t + w] * u;
    return s;
  }, o.prototype.readUintBE = o.prototype.readUIntBE = function(t, e, r) {
    t = t >>> 0, e = e >>> 0, r || N(t, e, this.length);
    let s = this[t + --e], u = 1;
    for (; e > 0 && (u *= 256); )
      s += this[t + --e] * u;
    return s;
  }, o.prototype.readUint8 = o.prototype.readUInt8 = function(t, e) {
    return t = t >>> 0, e || N(t, 1, this.length), this[t];
  }, o.prototype.readUint16LE = o.prototype.readUInt16LE = function(t, e) {
    return t = t >>> 0, e || N(t, 2, this.length), this[t] | this[t + 1] << 8;
  }, o.prototype.readUint16BE = o.prototype.readUInt16BE = function(t, e) {
    return t = t >>> 0, e || N(t, 2, this.length), this[t] << 8 | this[t + 1];
  }, o.prototype.readUint32LE = o.prototype.readUInt32LE = function(t, e) {
    return t = t >>> 0, e || N(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + this[t + 3] * 16777216;
  }, o.prototype.readUint32BE = o.prototype.readUInt32BE = function(t, e) {
    return t = t >>> 0, e || N(t, 4, this.length), this[t] * 16777216 + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
  }, o.prototype.readBigUInt64LE = G(function(t) {
    t = t >>> 0, J(t, "offset");
    const e = this[t], r = this[t + 7];
    (e === void 0 || r === void 0) && Q(t, this.length - 8);
    const s = e + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24, u = this[++t] + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + r * 2 ** 24;
    return BigInt(s) + (BigInt(u) << BigInt(32));
  }), o.prototype.readBigUInt64BE = G(function(t) {
    t = t >>> 0, J(t, "offset");
    const e = this[t], r = this[t + 7];
    (e === void 0 || r === void 0) && Q(t, this.length - 8);
    const s = e * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t], u = this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + r;
    return (BigInt(s) << BigInt(32)) + BigInt(u);
  }), o.prototype.readIntLE = function(t, e, r) {
    t = t >>> 0, e = e >>> 0, r || N(t, e, this.length);
    let s = this[t], u = 1, w = 0;
    for (; ++w < e && (u *= 256); )
      s += this[t + w] * u;
    return u *= 128, s >= u && (s -= Math.pow(2, 8 * e)), s;
  }, o.prototype.readIntBE = function(t, e, r) {
    t = t >>> 0, e = e >>> 0, r || N(t, e, this.length);
    let s = e, u = 1, w = this[t + --s];
    for (; s > 0 && (u *= 256); )
      w += this[t + --s] * u;
    return u *= 128, w >= u && (w -= Math.pow(2, 8 * e)), w;
  }, o.prototype.readInt8 = function(t, e) {
    return t = t >>> 0, e || N(t, 1, this.length), this[t] & 128 ? (255 - this[t] + 1) * -1 : this[t];
  }, o.prototype.readInt16LE = function(t, e) {
    t = t >>> 0, e || N(t, 2, this.length);
    const r = this[t] | this[t + 1] << 8;
    return r & 32768 ? r | 4294901760 : r;
  }, o.prototype.readInt16BE = function(t, e) {
    t = t >>> 0, e || N(t, 2, this.length);
    const r = this[t + 1] | this[t] << 8;
    return r & 32768 ? r | 4294901760 : r;
  }, o.prototype.readInt32LE = function(t, e) {
    return t = t >>> 0, e || N(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
  }, o.prototype.readInt32BE = function(t, e) {
    return t = t >>> 0, e || N(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
  }, o.prototype.readBigInt64LE = G(function(t) {
    t = t >>> 0, J(t, "offset");
    const e = this[t], r = this[t + 7];
    (e === void 0 || r === void 0) && Q(t, this.length - 8);
    const s = this[t + 4] + this[t + 5] * 2 ** 8 + this[t + 6] * 2 ** 16 + (r << 24);
    return (BigInt(s) << BigInt(32)) + BigInt(e + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24);
  }), o.prototype.readBigInt64BE = G(function(t) {
    t = t >>> 0, J(t, "offset");
    const e = this[t], r = this[t + 7];
    (e === void 0 || r === void 0) && Q(t, this.length - 8);
    const s = (e << 24) + // Overflow
    this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t];
    return (BigInt(s) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + r);
  }), o.prototype.readFloatLE = function(t, e) {
    return t = t >>> 0, e || N(t, 4, this.length), f.read(this, t, !0, 23, 4);
  }, o.prototype.readFloatBE = function(t, e) {
    return t = t >>> 0, e || N(t, 4, this.length), f.read(this, t, !1, 23, 4);
  }, o.prototype.readDoubleLE = function(t, e) {
    return t = t >>> 0, e || N(t, 8, this.length), f.read(this, t, !0, 52, 8);
  }, o.prototype.readDoubleBE = function(t, e) {
    return t = t >>> 0, e || N(t, 8, this.length), f.read(this, t, !1, 52, 8);
  };
  function D(i, t, e, r, s, u) {
    if (!o.isBuffer(i)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (t > s || t < u) throw new RangeError('"value" argument is out of bounds');
    if (e + r > i.length) throw new RangeError("Index out of range");
  }
  o.prototype.writeUintLE = o.prototype.writeUIntLE = function(t, e, r, s) {
    if (t = +t, e = e >>> 0, r = r >>> 0, !s) {
      const I = Math.pow(2, 8 * r) - 1;
      D(this, t, e, r, I, 0);
    }
    let u = 1, w = 0;
    for (this[e] = t & 255; ++w < r && (u *= 256); )
      this[e + w] = t / u & 255;
    return e + r;
  }, o.prototype.writeUintBE = o.prototype.writeUIntBE = function(t, e, r, s) {
    if (t = +t, e = e >>> 0, r = r >>> 0, !s) {
      const I = Math.pow(2, 8 * r) - 1;
      D(this, t, e, r, I, 0);
    }
    let u = r - 1, w = 1;
    for (this[e + u] = t & 255; --u >= 0 && (w *= 256); )
      this[e + u] = t / w & 255;
    return e + r;
  }, o.prototype.writeUint8 = o.prototype.writeUInt8 = function(t, e, r) {
    return t = +t, e = e >>> 0, r || D(this, t, e, 1, 255, 0), this[e] = t & 255, e + 1;
  }, o.prototype.writeUint16LE = o.prototype.writeUInt16LE = function(t, e, r) {
    return t = +t, e = e >>> 0, r || D(this, t, e, 2, 65535, 0), this[e] = t & 255, this[e + 1] = t >>> 8, e + 2;
  }, o.prototype.writeUint16BE = o.prototype.writeUInt16BE = function(t, e, r) {
    return t = +t, e = e >>> 0, r || D(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = t & 255, e + 2;
  }, o.prototype.writeUint32LE = o.prototype.writeUInt32LE = function(t, e, r) {
    return t = +t, e = e >>> 0, r || D(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = t & 255, e + 4;
  }, o.prototype.writeUint32BE = o.prototype.writeUInt32BE = function(t, e, r) {
    return t = +t, e = e >>> 0, r || D(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = t & 255, e + 4;
  };
  function Tt(i, t, e, r, s) {
    Pt(t, r, s, i, e, 7);
    let u = Number(t & BigInt(4294967295));
    i[e++] = u, u = u >> 8, i[e++] = u, u = u >> 8, i[e++] = u, u = u >> 8, i[e++] = u;
    let w = Number(t >> BigInt(32) & BigInt(4294967295));
    return i[e++] = w, w = w >> 8, i[e++] = w, w = w >> 8, i[e++] = w, w = w >> 8, i[e++] = w, e;
  }
  function xt(i, t, e, r, s) {
    Pt(t, r, s, i, e, 7);
    let u = Number(t & BigInt(4294967295));
    i[e + 7] = u, u = u >> 8, i[e + 6] = u, u = u >> 8, i[e + 5] = u, u = u >> 8, i[e + 4] = u;
    let w = Number(t >> BigInt(32) & BigInt(4294967295));
    return i[e + 3] = w, w = w >> 8, i[e + 2] = w, w = w >> 8, i[e + 1] = w, w = w >> 8, i[e] = w, e + 8;
  }
  o.prototype.writeBigUInt64LE = G(function(t, e = 0) {
    return Tt(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
  }), o.prototype.writeBigUInt64BE = G(function(t, e = 0) {
    return xt(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
  }), o.prototype.writeIntLE = function(t, e, r, s) {
    if (t = +t, e = e >>> 0, !s) {
      const P = Math.pow(2, 8 * r - 1);
      D(this, t, e, r, P - 1, -P);
    }
    let u = 0, w = 1, I = 0;
    for (this[e] = t & 255; ++u < r && (w *= 256); )
      t < 0 && I === 0 && this[e + u - 1] !== 0 && (I = 1), this[e + u] = (t / w >> 0) - I & 255;
    return e + r;
  }, o.prototype.writeIntBE = function(t, e, r, s) {
    if (t = +t, e = e >>> 0, !s) {
      const P = Math.pow(2, 8 * r - 1);
      D(this, t, e, r, P - 1, -P);
    }
    let u = r - 1, w = 1, I = 0;
    for (this[e + u] = t & 255; --u >= 0 && (w *= 256); )
      t < 0 && I === 0 && this[e + u + 1] !== 0 && (I = 1), this[e + u] = (t / w >> 0) - I & 255;
    return e + r;
  }, o.prototype.writeInt8 = function(t, e, r) {
    return t = +t, e = e >>> 0, r || D(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = t & 255, e + 1;
  }, o.prototype.writeInt16LE = function(t, e, r) {
    return t = +t, e = e >>> 0, r || D(this, t, e, 2, 32767, -32768), this[e] = t & 255, this[e + 1] = t >>> 8, e + 2;
  }, o.prototype.writeInt16BE = function(t, e, r) {
    return t = +t, e = e >>> 0, r || D(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = t & 255, e + 2;
  }, o.prototype.writeInt32LE = function(t, e, r) {
    return t = +t, e = e >>> 0, r || D(this, t, e, 4, 2147483647, -2147483648), this[e] = t & 255, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24, e + 4;
  }, o.prototype.writeInt32BE = function(t, e, r) {
    return t = +t, e = e >>> 0, r || D(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = t & 255, e + 4;
  }, o.prototype.writeBigInt64LE = G(function(t, e = 0) {
    return Tt(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), o.prototype.writeBigInt64BE = G(function(t, e = 0) {
    return xt(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function Rt(i, t, e, r, s, u) {
    if (e + r > i.length) throw new RangeError("Index out of range");
    if (e < 0) throw new RangeError("Index out of range");
  }
  function Ut(i, t, e, r, s) {
    return t = +t, e = e >>> 0, s || Rt(i, t, e, 4), f.write(i, t, e, r, 23, 4), e + 4;
  }
  o.prototype.writeFloatLE = function(t, e, r) {
    return Ut(this, t, e, !0, r);
  }, o.prototype.writeFloatBE = function(t, e, r) {
    return Ut(this, t, e, !1, r);
  };
  function At(i, t, e, r, s) {
    return t = +t, e = e >>> 0, s || Rt(i, t, e, 8), f.write(i, t, e, r, 52, 8), e + 8;
  }
  o.prototype.writeDoubleLE = function(t, e, r) {
    return At(this, t, e, !0, r);
  }, o.prototype.writeDoubleBE = function(t, e, r) {
    return At(this, t, e, !1, r);
  }, o.prototype.copy = function(t, e, r, s) {
    if (!o.isBuffer(t)) throw new TypeError("argument should be a Buffer");
    if (r || (r = 0), !s && s !== 0 && (s = this.length), e >= t.length && (e = t.length), e || (e = 0), s > 0 && s < r && (s = r), s === r || t.length === 0 || this.length === 0) return 0;
    if (e < 0)
      throw new RangeError("targetStart out of bounds");
    if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
    if (s < 0) throw new RangeError("sourceEnd out of bounds");
    s > this.length && (s = this.length), t.length - e < s - r && (s = t.length - e + r);
    const u = s - r;
    return this === t && typeof h.prototype.copyWithin == "function" ? this.copyWithin(e, r, s) : h.prototype.set.call(
      t,
      this.subarray(r, s),
      e
    ), u;
  }, o.prototype.fill = function(t, e, r, s) {
    if (typeof t == "string") {
      if (typeof e == "string" ? (s = e, e = 0, r = this.length) : typeof r == "string" && (s = r, r = this.length), s !== void 0 && typeof s != "string")
        throw new TypeError("encoding must be a string");
      if (typeof s == "string" && !o.isEncoding(s))
        throw new TypeError("Unknown encoding: " + s);
      if (t.length === 1) {
        const w = t.charCodeAt(0);
        (s === "utf8" && w < 128 || s === "latin1") && (t = w);
      }
    } else typeof t == "number" ? t = t & 255 : typeof t == "boolean" && (t = Number(t));
    if (e < 0 || this.length < e || this.length < r)
      throw new RangeError("Out of range index");
    if (r <= e)
      return this;
    e = e >>> 0, r = r === void 0 ? this.length : r >>> 0, t || (t = 0);
    let u;
    if (typeof t == "number")
      for (u = e; u < r; ++u)
        this[u] = t;
    else {
      const w = o.isBuffer(t) ? t : o.from(t, s), I = w.length;
      if (I === 0)
        throw new TypeError('The value "' + t + '" is invalid for argument "value"');
      for (u = 0; u < r - e; ++u)
        this[u + e] = w[u % I];
    }
    return this;
  };
  const X = {};
  function rt(i, t, e) {
    X[i] = class extends e {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: t.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${i}]`, this.stack, delete this.name;
      }
      get code() {
        return i;
      }
      set code(s) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: s,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${i}]: ${this.message}`;
      }
    };
  }
  rt(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(i) {
      return i ? `${i} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), rt(
    "ERR_INVALID_ARG_TYPE",
    function(i, t) {
      return `The "${i}" argument must be of type number. Received type ${typeof t}`;
    },
    TypeError
  ), rt(
    "ERR_OUT_OF_RANGE",
    function(i, t, e) {
      let r = `The value of "${i}" is out of range.`, s = e;
      return Number.isInteger(e) && Math.abs(e) > 2 ** 32 ? s = Mt(String(e)) : typeof e == "bigint" && (s = String(e), (e > BigInt(2) ** BigInt(32) || e < -(BigInt(2) ** BigInt(32))) && (s = Mt(s)), s += "n"), r += ` It must be ${t}. Received ${s}`, r;
    },
    RangeError
  );
  function Mt(i) {
    let t = "", e = i.length;
    const r = i[0] === "-" ? 1 : 0;
    for (; e >= r + 4; e -= 3)
      t = `_${i.slice(e - 3, e)}${t}`;
    return `${i.slice(0, e)}${t}`;
  }
  function ue(i, t, e) {
    J(t, "offset"), (i[t] === void 0 || i[t + e] === void 0) && Q(t, i.length - (e + 1));
  }
  function Pt(i, t, e, r, s, u) {
    if (i > e || i < t) {
      const w = typeof t == "bigint" ? "n" : "";
      let I;
      throw t === 0 || t === BigInt(0) ? I = `>= 0${w} and < 2${w} ** ${(u + 1) * 8}${w}` : I = `>= -(2${w} ** ${(u + 1) * 8 - 1}${w}) and < 2 ** ${(u + 1) * 8 - 1}${w}`, new X.ERR_OUT_OF_RANGE("value", I, i);
    }
    ue(r, s, u);
  }
  function J(i, t) {
    if (typeof i != "number")
      throw new X.ERR_INVALID_ARG_TYPE(t, "number", i);
  }
  function Q(i, t, e) {
    throw Math.floor(i) !== i ? (J(i, e), new X.ERR_OUT_OF_RANGE("offset", "an integer", i)) : t < 0 ? new X.ERR_BUFFER_OUT_OF_BOUNDS() : new X.ERR_OUT_OF_RANGE(
      "offset",
      `>= 0 and <= ${t}`,
      i
    );
  }
  const he = /[^+/0-9A-Za-z-_]/g;
  function ce(i) {
    if (i = i.split("=")[0], i = i.trim().replace(he, ""), i.length < 2) return "";
    for (; i.length % 4 !== 0; )
      i = i + "=";
    return i;
  }
  function nt(i, t) {
    t = t || 1 / 0;
    let e;
    const r = i.length;
    let s = null;
    const u = [];
    for (let w = 0; w < r; ++w) {
      if (e = i.charCodeAt(w), e > 55295 && e < 57344) {
        if (!s) {
          if (e > 56319) {
            (t -= 3) > -1 && u.push(239, 191, 189);
            continue;
          } else if (w + 1 === r) {
            (t -= 3) > -1 && u.push(239, 191, 189);
            continue;
          }
          s = e;
          continue;
        }
        if (e < 56320) {
          (t -= 3) > -1 && u.push(239, 191, 189), s = e;
          continue;
        }
        e = (s - 55296 << 10 | e - 56320) + 65536;
      } else s && (t -= 3) > -1 && u.push(239, 191, 189);
      if (s = null, e < 128) {
        if ((t -= 1) < 0) break;
        u.push(e);
      } else if (e < 2048) {
        if ((t -= 2) < 0) break;
        u.push(
          e >> 6 | 192,
          e & 63 | 128
        );
      } else if (e < 65536) {
        if ((t -= 3) < 0) break;
        u.push(
          e >> 12 | 224,
          e >> 6 & 63 | 128,
          e & 63 | 128
        );
      } else if (e < 1114112) {
        if ((t -= 4) < 0) break;
        u.push(
          e >> 18 | 240,
          e >> 12 & 63 | 128,
          e >> 6 & 63 | 128,
          e & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return u;
  }
  function le(i) {
    const t = [];
    for (let e = 0; e < i.length; ++e)
      t.push(i.charCodeAt(e) & 255);
    return t;
  }
  function fe(i, t) {
    let e, r, s;
    const u = [];
    for (let w = 0; w < i.length && !((t -= 2) < 0); ++w)
      e = i.charCodeAt(w), r = e >> 8, s = e % 256, u.push(s), u.push(r);
    return u;
  }
  function Ft(i) {
    return l.toByteArray(ce(i));
  }
  function tt(i, t, e, r) {
    let s;
    for (s = 0; s < r && !(s + e >= t.length || s >= i.length); ++s)
      t[s + e] = i[s];
    return s;
  }
  function j(i, t) {
    return i instanceof t || i != null && i.constructor != null && i.constructor.name != null && i.constructor.name === t.name;
  }
  function ot(i) {
    return i !== i;
  }
  const pe = function() {
    const i = "0123456789abcdef", t = new Array(256);
    for (let e = 0; e < 16; ++e) {
      const r = e * 16;
      for (let s = 0; s < 16; ++s)
        t[r + s] = i[e] + i[s];
    }
    return t;
  }();
  function G(i) {
    return typeof BigInt > "u" ? de : i;
  }
  function de() {
    throw new Error("BigInt not supported");
  }
})(Vt);
const K = Vt.Buffer;
var ut = {}, Dt;
function Se() {
  return Dt || (Dt = 1, function(c) {
    function l(g, E) {
      var T;
      return g instanceof K ? T = g : T = K.from(g.buffer, g.byteOffset, g.byteLength), T.toString(E);
    }
    var f = function(g) {
      return K.from(g);
    };
    function m(g) {
      for (var E = 0, T = Math.min(256 * 256, g.length + 1), x = new Uint16Array(T), O = [], U = 0; ; ) {
        var M = E < g.length;
        if (!M || U >= T - 1) {
          var C = x.subarray(0, U), H = C;
          if (O.push(String.fromCharCode.apply(null, H)), !M) return O.join("");
          g = g.subarray(E), E = 0, U = 0;
        }
        var q = g[E++];
        if ((q & 128) === 0) x[U++] = q;
        else if ((q & 224) === 192) {
          var Y = g[E++] & 63;
          x[U++] = (q & 31) << 6 | Y;
        } else if ((q & 240) === 224) {
          var Y = g[E++] & 63, Z = g[E++] & 63;
          x[U++] = (q & 31) << 12 | Y << 6 | Z;
        } else if ((q & 248) === 240) {
          var Y = g[E++] & 63, Z = g[E++] & 63, it = g[E++] & 63, z = (q & 7) << 18 | Y << 12 | Z << 6 | it;
          z > 65535 && (z -= 65536, x[U++] = z >>> 10 & 1023 | 55296, z = 56320 | z & 1023), x[U++] = z;
        }
      }
    }
    function p(g) {
      for (var E = 0, T = g.length, x = 0, O = Math.max(32, T + (T >>> 1) + 7), U = new Uint8Array(O >>> 3 << 3); E < T; ) {
        var M = g.charCodeAt(E++);
        if (M >= 55296 && M <= 56319) {
          if (E < T) {
            var C = g.charCodeAt(E);
            (C & 64512) === 56320 && (++E, M = ((M & 1023) << 10) + (C & 1023) + 65536);
          }
          if (M >= 55296 && M <= 56319) continue;
        }
        if (x + 4 > U.length) {
          O += 8, O *= 1 + E / g.length * 2, O = O >>> 3 << 3;
          var H = new Uint8Array(O);
          H.set(U), U = H;
        }
        if ((M & 4294967168) === 0) {
          U[x++] = M;
          continue;
        } else if ((M & 4294965248) === 0) U[x++] = M >>> 6 & 31 | 192;
        else if ((M & 4294901760) === 0) U[x++] = M >>> 12 & 15 | 224, U[x++] = M >>> 6 & 63 | 128;
        else if ((M & 4292870144) === 0) U[x++] = M >>> 18 & 7 | 240, U[x++] = M >>> 12 & 63 | 128, U[x++] = M >>> 6 & 63 | 128;
        else continue;
        U[x++] = M & 63 | 128;
      }
      return U.slice ? U.slice(0, x) : U.subarray(0, x);
    }
    var h = "Failed to ", d = function(g, E, T) {
      if (g) throw new Error("".concat(h).concat(E, ": the '").concat(T, "' option is unsupported."));
    }, n = typeof K == "function" && K.from, a = n ? f : p;
    function _() {
      this.encoding = "utf-8";
    }
    _.prototype.encode = function(g, E) {
      return d(E && E.stream, "encode", "stream"), a(g);
    };
    function o(g) {
      var E;
      try {
        var T = new Blob([g], { type: "text/plain;charset=UTF-8" });
        E = URL.createObjectURL(T);
        var x = new XMLHttpRequest();
        return x.open("GET", E, !1), x.send(), x.responseText;
      } finally {
        E && URL.revokeObjectURL(E);
      }
    }
    var k = !n && typeof Blob == "function" && typeof URL == "function" && typeof URL.createObjectURL == "function", v = ["utf-8", "utf8", "unicode-1-1-utf-8"], y = m;
    n ? y = l : k && (y = function(g) {
      try {
        return o(g);
      } catch {
        return m(g);
      }
    });
    var B = "construct 'TextDecoder'", b = "".concat(h, " ").concat(B, ": the ");
    function S(g, E) {
      d(E && E.fatal, B, "fatal"), g = g || "utf-8";
      var T;
      if (n ? T = K.isEncoding(g) : T = v.indexOf(g.toLowerCase()) !== -1, !T) throw new RangeError("".concat(b, " encoding label provided ('").concat(g, "') is invalid."));
      this.encoding = g, this.fatal = !1, this.ignoreBOM = !1;
    }
    S.prototype.decode = function(g, E) {
      d(E && E.stream, "decode", "stream");
      var T;
      return g instanceof Uint8Array ? T = g : g.buffer instanceof ArrayBuffer ? T = new Uint8Array(g.buffer) : T = new Uint8Array(g), y(T, this.encoding);
    }, c.TextEncoder = c.TextEncoder || _, c.TextDecoder = c.TextDecoder || S;
  }(typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : ut)), ut;
}
var ht, Ot;
function Te() {
  return Ot || (Ot = 1, Se(), ht = {
    encode: (c) => new TextEncoder().encode(c),
    decode: (c) => new TextDecoder().decode(c)
  }), ht;
}
var ct, Ct;
function xe() {
  if (Ct) return ct;
  Ct = 1, ct = c;
  function c(l, f, m) {
    var p;
    return function() {
      if (!f)
        return l.apply(this, arguments);
      var h = this, d = arguments, n = m && !p;
      if (clearTimeout(p), p = setTimeout(function() {
        if (p = null, !n)
          return l.apply(h, d);
      }, f), n)
        return l.apply(this, arguments);
    };
  }
  return ct;
}
var lt, Lt;
function It() {
  if (Lt) return lt;
  Lt = 1;
  function c(n) {
    if (n.length === 0)
      return ".";
    let a = m(n);
    return a = a.reduce(d, []), f(...a);
  }
  function l(...n) {
    let a = "";
    for (let _ of n)
      _.startsWith("/") ? a = _ : a = c(f(a, _));
    return a;
  }
  function f(...n) {
    if (n.length === 0) return "";
    let a = n.join("/");
    return a = a.replace(/\/{2,}/g, "/"), a;
  }
  function m(n) {
    if (n.length === 0) return [];
    if (n === "/") return ["/"];
    let a = n.split("/");
    return a[a.length - 1] === "" && a.pop(), n[0] === "/" ? a[0] = "/" : a[0] !== "." && a.unshift("."), a;
  }
  function p(n) {
    const a = n.lastIndexOf("/");
    if (a === -1) throw new Error(`Cannot get dirname of "${n}"`);
    return a === 0 ? "/" : n.slice(0, a);
  }
  function h(n) {
    if (n === "/") throw new Error(`Cannot get basename of "${n}"`);
    const a = n.lastIndexOf("/");
    return a === -1 ? n : n.slice(a + 1);
  }
  function d(n, a) {
    if (n.length === 0)
      return n.push(a), n;
    if (a === ".") return n;
    if (a === "..") {
      if (n.length === 1) {
        if (n[0] === "/")
          throw new Error("Unable to normalize path - traverses above root directory");
        if (n[0] === ".")
          return n.push(a), n;
      }
      return n[n.length - 1] === ".." ? (n.push(".."), n) : (n.pop(), n);
    }
    return n.push(a), n;
  }
  return lt = {
    join: f,
    normalize: c,
    split: m,
    basename: h,
    dirname: p,
    resolve: l
  }, lt;
}
var ft, qt;
function Zt() {
  if (qt) return ft;
  qt = 1;
  function c(d) {
    return class extends Error {
      constructor(...n) {
        super(...n), this.code = d, this.message ? this.message = d + ": " + this.message : this.message = d;
      }
    };
  }
  const l = c("EEXIST"), f = c("ENOENT"), m = c("ENOTDIR"), p = c("ENOTEMPTY"), h = c("ETIMEDOUT");
  return ft = { EEXIST: l, ENOENT: f, ENOTDIR: m, ENOTEMPTY: p, ETIMEDOUT: h }, ft;
}
var pt, jt;
function Re() {
  if (jt) return pt;
  jt = 1;
  const c = It(), { EEXIST: l, ENOENT: f, ENOTDIR: m, ENOTEMPTY: p } = Zt(), h = 0;
  return pt = class {
    constructor() {
    }
    _makeRoot(n = /* @__PURE__ */ new Map()) {
      return n.set(h, { mode: 511, type: "dir", size: 0, ino: 0, mtimeMs: Date.now() }), n;
    }
    activate(n = null) {
      n === null ? this._root = /* @__PURE__ */ new Map([["/", this._makeRoot()]]) : typeof n == "string" ? this._root = /* @__PURE__ */ new Map([["/", this._makeRoot(this.parse(n))]]) : this._root = n;
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
    _countInodes(n) {
      let a = 1;
      for (let [_, o] of n)
        _ !== h && (a += this._countInodes(o));
      return a;
    }
    autoinc() {
      return this._maxInode(this._root.get("/")) + 1;
    }
    _maxInode(n) {
      let a = n.get(h).ino;
      for (let [_, o] of n)
        _ !== h && (a = Math.max(a, this._maxInode(o)));
      return a;
    }
    print(n = this._root.get("/")) {
      let a = "";
      const _ = (o, k) => {
        for (let [v, y] of o) {
          if (v === 0) continue;
          let B = y.get(h), b = B.mode.toString(8);
          a += `${"	".repeat(k)}${v}	${b}`, B.type === "file" ? a += `	${B.size}	${B.mtimeMs}
` : (a += `
`, _(y, k + 1));
        }
      };
      return _(n, 0), a;
    }
    parse(n) {
      let a = 0;
      function _(y) {
        const B = ++a, b = y.length === 1 ? "dir" : "file";
        let [S, g, E] = y;
        return S = parseInt(S, 8), g = g ? parseInt(g) : 0, E = E ? parseInt(E) : Date.now(), /* @__PURE__ */ new Map([[h, { mode: S, type: b, size: g, mtimeMs: E, ino: B }]]);
      }
      let o = n.trim().split(`
`), k = this._makeRoot(), v = [
        { indent: -1, node: k },
        { indent: 0, node: null }
      ];
      for (let y of o) {
        let b = y.match(/^\t*/)[0].length;
        y = y.slice(b);
        let [S, ...g] = y.split("	"), E = _(g);
        if (b <= v[v.length - 1].indent)
          for (; b <= v[v.length - 1].indent; )
            v.pop();
        v.push({ indent: b, node: E }), v[v.length - 2].node.set(S, E);
      }
      return k;
    }
    _lookup(n, a = !0) {
      let _ = this._root, o = "/", k = c.split(n);
      for (let v = 0; v < k.length; ++v) {
        let y = k[v];
        if (_ = _.get(y), !_) throw new f(n);
        if (a || v < k.length - 1) {
          const B = _.get(h);
          if (B.type === "symlink") {
            let b = c.resolve(o, B.target);
            _ = this._lookup(b);
          }
          o ? o = c.join(o, y) : o = y;
        }
      }
      return _;
    }
    mkdir(n, { mode: a }) {
      if (n === "/") throw new l();
      let _ = this._lookup(c.dirname(n)), o = c.basename(n);
      if (_.has(o))
        throw new l();
      let k = /* @__PURE__ */ new Map(), v = {
        mode: a,
        type: "dir",
        size: 0,
        mtimeMs: Date.now(),
        ino: this.autoinc()
      };
      k.set(h, v), _.set(o, k);
    }
    rmdir(n) {
      let a = this._lookup(n);
      if (a.get(h).type !== "dir") throw new m();
      if (a.size > 1) throw new p();
      let _ = this._lookup(c.dirname(n)), o = c.basename(n);
      _.delete(o);
    }
    readdir(n) {
      let a = this._lookup(n);
      if (a.get(h).type !== "dir") throw new m();
      return [...a.keys()].filter((_) => typeof _ == "string");
    }
    writeStat(n, a, { mode: _ }) {
      let o;
      try {
        let b = this.stat(n);
        _ == null && (_ = b.mode), o = b.ino;
      } catch {
      }
      _ == null && (_ = 438), o == null && (o = this.autoinc());
      let k = this._lookup(c.dirname(n)), v = c.basename(n), y = {
        mode: _,
        type: "file",
        size: a,
        mtimeMs: Date.now(),
        ino: o
      }, B = /* @__PURE__ */ new Map();
      return B.set(h, y), k.set(v, B), y;
    }
    unlink(n) {
      let a = this._lookup(c.dirname(n)), _ = c.basename(n);
      a.delete(_);
    }
    rename(n, a) {
      let _ = c.basename(a), o = this._lookup(n);
      this._lookup(c.dirname(a)).set(_, o), this.unlink(n);
    }
    stat(n) {
      return this._lookup(n).get(h);
    }
    lstat(n) {
      return this._lookup(n, !1).get(h);
    }
    readlink(n) {
      return this._lookup(n, !1).get(h).target;
    }
    symlink(n, a) {
      let _, o;
      try {
        let b = this.stat(a);
        o === null && (o = b.mode), _ = b.ino;
      } catch {
      }
      o == null && (o = 40960), _ == null && (_ = this.autoinc());
      let k = this._lookup(c.dirname(a)), v = c.basename(a), y = {
        mode: o,
        type: "symlink",
        target: n,
        size: 0,
        mtimeMs: Date.now(),
        ino: _
      }, B = /* @__PURE__ */ new Map();
      return B.set(h, y), k.set(v, B), y;
    }
    _du(n) {
      let a = 0;
      for (const [_, o] of n.entries())
        _ === h ? a += o.size : a += this._du(o);
      return a;
    }
    du(n) {
      let a = this._lookup(n);
      return this._du(a);
    }
  }, pt;
}
class Qt {
  constructor(l = "keyval-store", f = "keyval") {
    this.storeName = f, this._dbName = l, this._storeName = f, this._init();
  }
  _init() {
    this._dbp || (this._dbp = new Promise((l, f) => {
      const m = indexedDB.open(this._dbName);
      m.onerror = () => f(m.error), m.onsuccess = () => l(m.result), m.onupgradeneeded = () => {
        m.result.createObjectStore(this._storeName);
      };
    }));
  }
  _withIDBStore(l, f) {
    return this._init(), this._dbp.then((m) => new Promise((p, h) => {
      const d = m.transaction(this.storeName, l);
      d.oncomplete = () => p(), d.onabort = d.onerror = () => h(d.error), f(d.objectStore(this.storeName));
    }));
  }
  _close() {
    return this._init(), this._dbp.then((l) => {
      l.close(), this._dbp = void 0;
    });
  }
}
let dt;
function W() {
  return dt || (dt = new Qt()), dt;
}
function Ue(c, l = W()) {
  let f;
  return l._withIDBStore("readwrite", (m) => {
    f = m.get(c);
  }).then(() => f.result);
}
function Ae(c, l, f = W()) {
  return f._withIDBStore("readwrite", (m) => {
    m.put(l, c);
  });
}
function Me(c, l, f = W()) {
  return f._withIDBStore("readwrite", (m) => {
    const p = m.get(c);
    p.onsuccess = () => {
      m.put(l(p.result), c);
    };
  });
}
function Pe(c, l = W()) {
  return l._withIDBStore("readwrite", (f) => {
    f.delete(c);
  });
}
function Fe(c = W()) {
  return c._withIDBStore("readwrite", (l) => {
    l.clear();
  });
}
function Ne(c = W()) {
  const l = [];
  return c._withIDBStore("readwrite", (f) => {
    (f.openKeyCursor || f.openCursor).call(f).onsuccess = function() {
      this.result && (l.push(this.result.key), this.result.continue());
    };
  }).then(() => l);
}
function De(c = W()) {
  return c._close();
}
const Oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Store: Qt,
  clear: Fe,
  close: De,
  del: Pe,
  get: Ue,
  keys: Ne,
  set: Ae,
  update: Me
}, Symbol.toStringTag, { value: "Module" })), te = /* @__PURE__ */ me(Oe);
var wt, $t;
function Ce() {
  if ($t) return wt;
  $t = 1;
  const c = te;
  return wt = class {
    constructor(f, m) {
      this._database = f, this._storename = m, this._store = new c.Store(this._database, this._storename);
    }
    saveSuperblock(f) {
      return c.set("!root", f, this._store);
    }
    loadSuperblock() {
      return c.get("!root", this._store);
    }
    readFile(f) {
      return c.get(f, this._store);
    }
    writeFile(f, m) {
      return c.set(f, m, this._store);
    }
    unlink(f) {
      return c.del(f, this._store);
    }
    wipe() {
      return c.clear(this._store);
    }
    close() {
      return c.close(this._store);
    }
  }, wt;
}
var mt, zt;
function Le() {
  return zt || (zt = 1, mt = class {
    constructor(l) {
      this._url = l;
    }
    loadSuperblock() {
      return fetch(this._url + "/.superblock.txt").then((l) => l.ok ? l.text() : null);
    }
    async readFile(l) {
      const f = await fetch(this._url + l);
      if (f.status === 200)
        return f.arrayBuffer();
      throw new Error("ENOENT");
    }
    async sizeFile(l) {
      const f = await fetch(this._url + l, { method: "HEAD" });
      if (f.status === 200)
        return f.headers.get("content-length");
      throw new Error("ENOENT");
    }
  }), mt;
}
var yt, Gt;
function qe() {
  if (Gt) return yt;
  Gt = 1;
  const c = te, l = (f) => new Promise((m) => setTimeout(m, f));
  return yt = class {
    constructor(m, p) {
      this._id = Math.random(), this._database = m, this._storename = p, this._store = new c.Store(this._database, this._storename), this._lock = null;
    }
    async has({ margin: m = 2e3 } = {}) {
      if (this._lock && this._lock.holder === this._id) {
        const p = Date.now();
        return this._lock.expires > p + m ? !0 : await this.renew();
      } else
        return !1;
    }
    // Returns true if successful
    async renew({ ttl: m = 5e3 } = {}) {
      let p;
      return await c.update("lock", (h) => {
        const n = Date.now() + m;
        return p = h && h.holder === this._id, this._lock = p ? { holder: this._id, expires: n } : h, this._lock;
      }, this._store), p;
    }
    // Returns true if successful
    async acquire({ ttl: m = 5e3 } = {}) {
      let p, h, d;
      if (await c.update("lock", (n) => {
        const a = Date.now(), _ = a + m;
        return h = n && n.expires < a, p = n === void 0 || h, d = n && n.holder === this._id, this._lock = p ? { holder: this._id, expires: _ } : n, this._lock;
      }, this._store), d)
        throw new Error("Mutex double-locked");
      return p;
    }
    // check at 10Hz, give up after 10 minutes
    async wait({ interval: m = 100, limit: p = 6e3, ttl: h } = {}) {
      for (; p--; ) {
        if (await this.acquire({ ttl: h })) return !0;
        await l(m);
      }
      throw new Error("Mutex timeout");
    }
    // Returns true if successful
    async release({ force: m = !1 } = {}) {
      let p, h, d;
      if (await c.update("lock", (n) => (p = m || n && n.holder === this._id, h = n === void 0, d = n && n.holder !== this._id, this._lock = p ? void 0 : n, this._lock), this._store), await c.close(this._store), !p && !m) {
        if (h) throw new Error("Mutex double-freed");
        if (d) throw new Error("Mutex lost ownership");
      }
      return p;
    }
  }, yt;
}
var _t, Ht;
function je() {
  return Ht || (Ht = 1, _t = class {
    constructor(l) {
      this._id = Math.random(), this._database = l, this._has = !1, this._release = null;
    }
    async has() {
      return this._has;
    }
    // Returns true if successful
    async acquire() {
      return new Promise((l) => {
        navigator.locks.request(this._database + "_lock", { ifAvailable: !0 }, (f) => (this._has = !!f, l(!!f), new Promise((m) => {
          this._release = m;
        })));
      });
    }
    // Returns true if successful, gives up after 10 minutes
    async wait({ timeout: l = 6e5 } = {}) {
      return new Promise((f, m) => {
        const p = new AbortController();
        setTimeout(() => {
          p.abort(), m(new Error("Mutex timeout"));
        }, l), navigator.locks.request(this._database + "_lock", { signal: p.signal }, (h) => (this._has = !!h, f(!!h), new Promise((d) => {
          this._release = d;
        })));
      });
    }
    // Returns true if successful
    async release({ force: l = !1 } = {}) {
      this._has = !1, this._release ? this._release() : l && navigator.locks.request(this._database + "_lock", { steal: !0 }, (f) => !0);
    }
  }), _t;
}
var gt, Yt;
function $e() {
  if (Yt) return gt;
  Yt = 1;
  const { encode: c, decode: l } = Te(), f = xe(), m = Re(), { ENOENT: p, ENOTEMPTY: h, ETIMEDOUT: d } = Zt(), n = Ce(), a = Le(), _ = qe(), o = je(), k = It();
  return gt = class {
    constructor() {
      this.saveSuperblock = f(() => {
        this.flush();
      }, 500);
    }
    async init(y, {
      wipe: B,
      url: b,
      urlauto: S,
      fileDbName: g = y,
      db: E = null,
      fileStoreName: T = y + "_files",
      lockDbName: x = y + "_lock",
      lockStoreName: O = y + "_lock"
    } = {}) {
      this._name = y, this._idb = E || new n(g, T), this._mutex = navigator.locks ? new o(y) : new _(x, O), this._cache = new m(y), this._opts = { wipe: B, url: b }, this._needsWipe = !!B, b && (this._http = new a(b), this._urlauto = !!S);
    }
    async activate() {
      if (this._cache.activated) return;
      this._needsWipe && (this._needsWipe = !1, await this._idb.wipe(), await this._mutex.release({ force: !0 })), await this._mutex.has() || await this._mutex.wait();
      const y = await this._idb.loadSuperblock();
      if (y)
        this._cache.activate(y);
      else if (this._http) {
        const B = await this._http.loadSuperblock();
        this._cache.activate(B), await this._saveSuperblock();
      } else
        this._cache.activate();
      if (!await this._mutex.has())
        throw new d();
    }
    async deactivate() {
      await this._mutex.has() && await this._saveSuperblock(), this._cache.deactivate();
      try {
        await this._mutex.release();
      } catch (y) {
        console.log(y);
      }
      await this._idb.close();
    }
    async _saveSuperblock() {
      this._cache.activated && (this._lastSavedAt = Date.now(), await this._idb.saveSuperblock(this._cache._root));
    }
    _writeStat(y, B, b) {
      let S = k.split(k.dirname(y)), g = S.shift();
      for (let E of S) {
        g = k.join(g, E);
        try {
          this._cache.mkdir(g, { mode: 511 });
        } catch {
        }
      }
      return this._cache.writeStat(y, B, b);
    }
    async readFile(y, B) {
      const { encoding: b } = B;
      if (b && b !== "utf8") throw new Error('Only "utf8" encoding is supported in readFile');
      let S = null, g = null;
      try {
        g = this._cache.stat(y), S = await this._idb.readFile(g.ino);
      } catch (E) {
        if (!this._urlauto) throw E;
      }
      if (!S && this._http) {
        let E = this._cache.lstat(y);
        for (; E.type === "symlink"; )
          y = k.resolve(k.dirname(y), E.target), E = this._cache.lstat(y);
        S = await this._http.readFile(y);
      }
      if (S && ((!g || g.size != S.byteLength) && (g = await this._writeStat(y, S.byteLength, { mode: g ? g.mode : 438 }), this.saveSuperblock()), b === "utf8" ? S = l(S) : S.toString = () => l(S)), !g) throw new p(y);
      return S;
    }
    async writeFile(y, B, b) {
      const { mode: S, encoding: g = "utf8" } = b;
      if (typeof B == "string") {
        if (g !== "utf8")
          throw new Error('Only "utf8" encoding is supported in writeFile');
        B = c(B);
      }
      const E = await this._cache.writeStat(y, B.byteLength, { mode: S });
      await this._idb.writeFile(E.ino, B);
    }
    async unlink(y, B) {
      const b = this._cache.lstat(y);
      this._cache.unlink(y), b.type !== "symlink" && await this._idb.unlink(b.ino);
    }
    readdir(y, B) {
      return this._cache.readdir(y);
    }
    mkdir(y, B) {
      const { mode: b = 511 } = B;
      this._cache.mkdir(y, { mode: b });
    }
    rmdir(y, B) {
      if (y === "/")
        throw new h();
      this._cache.rmdir(y);
    }
    rename(y, B) {
      this._cache.rename(y, B);
    }
    stat(y, B) {
      return this._cache.stat(y);
    }
    lstat(y, B) {
      return this._cache.lstat(y);
    }
    readlink(y, B) {
      return this._cache.readlink(y);
    }
    symlink(y, B) {
      this._cache.symlink(y, B);
    }
    async backFile(y, B) {
      let b = await this._http.sizeFile(y);
      await this._writeStat(y, b, B);
    }
    du(y) {
      return this._cache.du(y);
    }
    flush() {
      return this._saveSuperblock();
    }
  }, gt;
}
var Et, Wt;
function ze() {
  return Wt || (Wt = 1, Et = class {
    constructor(l) {
      this.type = l.type, this.mode = l.mode, this.size = l.size, this.ino = l.ino, this.mtimeMs = l.mtimeMs, this.ctimeMs = l.ctimeMs || l.mtimeMs, this.uid = 1, this.gid = 1, this.dev = 1;
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
  }), Et;
}
var Bt, Xt;
function Ge() {
  if (Xt) return Bt;
  Xt = 1;
  const c = $e(), l = ze(), f = It();
  function m(d, n, ...a) {
    return d = f.normalize(d), (typeof n > "u" || typeof n == "function") && (n = {}), typeof n == "string" && (n = {
      encoding: n
    }), [d, n, ...a];
  }
  function p(d, n, a, ..._) {
    return d = f.normalize(d), (typeof a > "u" || typeof a == "function") && (a = {}), typeof a == "string" && (a = {
      encoding: a
    }), [d, n, a, ..._];
  }
  function h(d, n, ...a) {
    return [f.normalize(d), f.normalize(n), ...a];
  }
  return Bt = class {
    constructor(n, a = {}) {
      this.init = this.init.bind(this), this.readFile = this._wrap(this.readFile, m, !1), this.writeFile = this._wrap(this.writeFile, p, !0), this.unlink = this._wrap(this.unlink, m, !0), this.readdir = this._wrap(this.readdir, m, !1), this.mkdir = this._wrap(this.mkdir, m, !0), this.rmdir = this._wrap(this.rmdir, m, !0), this.rename = this._wrap(this.rename, h, !0), this.stat = this._wrap(this.stat, m, !1), this.lstat = this._wrap(this.lstat, m, !1), this.readlink = this._wrap(this.readlink, m, !1), this.symlink = this._wrap(this.symlink, h, !0), this.backFile = this._wrap(this.backFile, m, !0), this.du = this._wrap(this.du, m, !1), this._deactivationPromise = null, this._deactivationTimeout = null, this._activationPromise = null, this._operations = /* @__PURE__ */ new Set(), n && this.init(n, a);
    }
    async init(...n) {
      return this._initPromiseResolve && await this._initPromise, this._initPromise = this._init(...n), this._initPromise;
    }
    async _init(n, a = {}) {
      await this._gracefulShutdown(), this._activationPromise && await this._deactivate(), this._backend && this._backend.destroy && await this._backend.destroy(), this._backend = a.backend || new c(), this._backend.init && await this._backend.init(n, a), this._initPromiseResolve && (this._initPromiseResolve(), this._initPromiseResolve = null), a.defer || this.stat("/");
    }
    async _gracefulShutdown() {
      this._operations.size > 0 && (this._isShuttingDown = !0, await new Promise((n) => this._gracefulShutdownResolve = n), this._isShuttingDown = !1, this._gracefulShutdownResolve = null);
    }
    _wrap(n, a, _) {
      return async (...o) => {
        o = a(...o);
        let k = {
          name: n.name,
          args: o
        };
        this._operations.add(k);
        try {
          return await this._activate(), await n.apply(this, o);
        } finally {
          this._operations.delete(k), _ && this._backend.saveSuperblock(), this._operations.size === 0 && (this._deactivationTimeout || clearTimeout(this._deactivationTimeout), this._deactivationTimeout = setTimeout(this._deactivate.bind(this), 500));
        }
      };
    }
    async _activate() {
      this._initPromise || console.warn(new Error(`Attempted to use LightningFS ${this._name} before it was initialized.`)), await this._initPromise, this._deactivationTimeout && (clearTimeout(this._deactivationTimeout), this._deactivationTimeout = null), this._deactivationPromise && await this._deactivationPromise, this._deactivationPromise = null, this._activationPromise || (this._activationPromise = this._backend.activate ? this._backend.activate() : Promise.resolve()), await this._activationPromise;
    }
    async _deactivate() {
      return this._activationPromise && await this._activationPromise, this._deactivationPromise || (this._deactivationPromise = this._backend.deactivate ? this._backend.deactivate() : Promise.resolve()), this._activationPromise = null, this._gracefulShutdownResolve && this._gracefulShutdownResolve(), this._deactivationPromise;
    }
    async readFile(n, a) {
      return this._backend.readFile(n, a);
    }
    async writeFile(n, a, _) {
      return await this._backend.writeFile(n, a, _), null;
    }
    async unlink(n, a) {
      return await this._backend.unlink(n, a), null;
    }
    async readdir(n, a) {
      return this._backend.readdir(n, a);
    }
    async mkdir(n, a) {
      return await this._backend.mkdir(n, a), null;
    }
    async rmdir(n, a) {
      return await this._backend.rmdir(n, a), null;
    }
    async rename(n, a) {
      return await this._backend.rename(n, a), null;
    }
    async stat(n, a) {
      const _ = await this._backend.stat(n, a);
      return new l(_);
    }
    async lstat(n, a) {
      const _ = await this._backend.lstat(n, a);
      return new l(_);
    }
    async readlink(n, a) {
      return this._backend.readlink(n, a);
    }
    async symlink(n, a) {
      return await this._backend.symlink(n, a), null;
    }
    async backFile(n, a) {
      return await this._backend.backFile(n, a), null;
    }
    async du(n) {
      return this._backend.du(n);
    }
    async flush() {
      return this._backend.flush();
    }
  }, Bt;
}
var kt, Jt;
function He() {
  if (Jt) return kt;
  Jt = 1;
  const c = ye(), l = Ge();
  function f(m, p) {
    return typeof m == "function" && (p = m), p = c(p), [(...d) => p(null, ...d), p];
  }
  return kt = class {
    constructor(...p) {
      this.promises = new l(...p), this.init = this.init.bind(this), this.readFile = this.readFile.bind(this), this.writeFile = this.writeFile.bind(this), this.unlink = this.unlink.bind(this), this.readdir = this.readdir.bind(this), this.mkdir = this.mkdir.bind(this), this.rmdir = this.rmdir.bind(this), this.rename = this.rename.bind(this), this.stat = this.stat.bind(this), this.lstat = this.lstat.bind(this), this.readlink = this.readlink.bind(this), this.symlink = this.symlink.bind(this), this.backFile = this.backFile.bind(this), this.du = this.du.bind(this), this.flush = this.flush.bind(this);
    }
    init(p, h) {
      return this.promises.init(p, h);
    }
    readFile(p, h, d) {
      const [n, a] = f(h, d);
      this.promises.readFile(p, h).then(n).catch(a);
    }
    writeFile(p, h, d, n) {
      const [a, _] = f(d, n);
      this.promises.writeFile(p, h, d).then(a).catch(_);
    }
    unlink(p, h, d) {
      const [n, a] = f(h, d);
      this.promises.unlink(p, h).then(n).catch(a);
    }
    readdir(p, h, d) {
      const [n, a] = f(h, d);
      this.promises.readdir(p, h).then(n).catch(a);
    }
    mkdir(p, h, d) {
      const [n, a] = f(h, d);
      this.promises.mkdir(p, h).then(n).catch(a);
    }
    rmdir(p, h, d) {
      const [n, a] = f(h, d);
      this.promises.rmdir(p, h).then(n).catch(a);
    }
    rename(p, h, d) {
      const [n, a] = f(d);
      this.promises.rename(p, h).then(n).catch(a);
    }
    stat(p, h, d) {
      const [n, a] = f(h, d);
      this.promises.stat(p).then(n).catch(a);
    }
    lstat(p, h, d) {
      const [n, a] = f(h, d);
      this.promises.lstat(p).then(n).catch(a);
    }
    readlink(p, h, d) {
      const [n, a] = f(h, d);
      this.promises.readlink(p).then(n).catch(a);
    }
    symlink(p, h, d) {
      const [n, a] = f(d);
      this.promises.symlink(p, h).then(n).catch(a);
    }
    backFile(p, h, d) {
      const [n, a] = f(h, d);
      this.promises.backFile(p, h).then(n).catch(a);
    }
    du(p, h) {
      const [d, n] = f(h);
      this.promises.du(p).then(d).catch(n);
    }
    flush(p) {
      const [h, d] = f(p);
      this.promises.flush().then(h).catch(d);
    }
  }, kt;
}
var Ye = He();
const ri = /* @__PURE__ */ we(Ye);
export {
  K as B,
  ri as L,
  we as g
};
//# sourceMappingURL=index-jVhJ2jaE.js.map
