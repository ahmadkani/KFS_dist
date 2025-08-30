var ir = function(t) {
  var e = this;
  this.rpc_counter = 0, this.channel = t, this.foreign = /* @__PURE__ */ new Map(), this.local = /* @__PURE__ */ new Map(), this.calls = /* @__PURE__ */ new Map(), this.queue = [], this.connectionEstablished = !1, this.channel.addEventListener("message", function(r) {
    var n = r.data;
    if (n && typeof n == "object") switch (n.type) {
      case "MP_INIT":
        return e.onInit(n);
      case "MP_SET":
        return e.onSet(n);
      case "MP_CALL":
        return e.onCall(n);
      case "MP_RETURN":
        return e.onReturn(n);
    }
  }), this.channel.postMessage({ type: "MP_INIT", id: 1, reply: !0 });
};
ir.prototype.onInit = function(t) {
  this.connectionEstablished = !0;
  var e = this.queue;
  this.queue = [];
  for (var r = 0, n = e; r < n.length; r += 1)
    this.channel.postMessage(n[r]);
  t.reply && this.channel.postMessage({ type: "MP_INIT", reply: !1 });
}, ir.prototype.onSet = function(t) {
  for (var e = this, r = {}, n = t.object, i = function() {
    var c = o[a], f = !t.void.includes(c);
    r[c] = function() {
      for (var l = [], w = arguments.length; w--; ) l[w] = arguments[w];
      return e.rpc_counter = (e.rpc_counter + 1) % Number.MAX_SAFE_INTEGER, new Promise(function(m, g) {
        e.postMessage({ type: "MP_CALL", object: n, method: c, id: e.rpc_counter, args: l, reply: f }), f ? e.calls.set(e.rpc_counter, { resolve: m, reject: g }) : m();
      });
    };
  }, a = 0, o = t.methods; a < o.length; a += 1) i();
  var s = this.foreign.get(t.object);
  this.foreign.set(t.object, r), typeof s == "function" && s(r);
}, ir.prototype.onCall = function(t) {
  var e = this, r = this.local.get(t.object);
  r && r[t.method].apply(r, t.args).then(function(n) {
    return t.reply && e.channel.postMessage({ type: "MP_RETURN", id: t.id, result: n });
  }).catch(function(n) {
    return e.channel.postMessage({ type: "MP_RETURN", id: t.id, error: n.message });
  });
}, ir.prototype.onReturn = function(t) {
  if (this.calls.has(t.id)) {
    var e = this.calls.get(t.id), r = e.resolve, n = e.reject;
    this.calls.clear(t.id), t.error ? n(t.error) : r(t.result);
  }
}, ir.prototype.postMessage = function(t) {
  this.connectionEstablished ? this.channel.postMessage(t) : this.queue.push(t);
}, ir.prototype.set = function(t, e, r) {
  r === void 0 && (r = {}), this.local.set(t, e);
  var n = Object.entries(e).filter(function(i) {
    return typeof i[1] == "function";
  }).map(function(i) {
    return i[0];
  });
  this.postMessage({ type: "MP_SET", object: t, methods: n, void: r.void || [] });
}, ir.prototype.get = function(t) {
  return new Promise(function(e, r) {
    var n = this;
    return this.foreign.has(t) ? e(this.foreign.get(t)) : e(new Promise(function(i, a) {
      return n.foreign.set(t, i);
    }));
  }.bind(this));
};
function af(t) {
  var e = new ir(t);
  Object.defineProperties(this, { get: { writable: !1, configurable: !1, value: e.get.bind(e) }, set: { writable: !1, configurable: !1, value: e.set.bind(e) } });
}
var tl = {}, Yn = {};
Yn.byteLength = cf;
Yn.toByteArray = uf;
Yn.fromByteArray = df;
var qt = [], Tt = [], of = typeof Uint8Array < "u" ? Uint8Array : Array, oi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Ir = 0, sf = oi.length; Ir < sf; ++Ir)
  qt[Ir] = oi[Ir], Tt[oi.charCodeAt(Ir)] = Ir;
Tt[45] = 62;
Tt[95] = 63;
function rl(t) {
  var e = t.length;
  if (e % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var r = t.indexOf("=");
  r === -1 && (r = e);
  var n = r === e ? 0 : 4 - r % 4;
  return [r, n];
}
function cf(t) {
  var e = rl(t), r = e[0], n = e[1];
  return (r + n) * 3 / 4 - n;
}
function lf(t, e, r) {
  return (e + r) * 3 / 4 - r;
}
function uf(t) {
  var e, r = rl(t), n = r[0], i = r[1], a = new of(lf(t, n, i)), o = 0, s = i > 0 ? n - 4 : n, c;
  for (c = 0; c < s; c += 4)
    e = Tt[t.charCodeAt(c)] << 18 | Tt[t.charCodeAt(c + 1)] << 12 | Tt[t.charCodeAt(c + 2)] << 6 | Tt[t.charCodeAt(c + 3)], a[o++] = e >> 16 & 255, a[o++] = e >> 8 & 255, a[o++] = e & 255;
  return i === 2 && (e = Tt[t.charCodeAt(c)] << 2 | Tt[t.charCodeAt(c + 1)] >> 4, a[o++] = e & 255), i === 1 && (e = Tt[t.charCodeAt(c)] << 10 | Tt[t.charCodeAt(c + 1)] << 4 | Tt[t.charCodeAt(c + 2)] >> 2, a[o++] = e >> 8 & 255, a[o++] = e & 255), a;
}
function ff(t) {
  return qt[t >> 18 & 63] + qt[t >> 12 & 63] + qt[t >> 6 & 63] + qt[t & 63];
}
function hf(t, e, r) {
  for (var n, i = [], a = e; a < r; a += 3)
    n = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (t[a + 2] & 255), i.push(ff(n));
  return i.join("");
}
function df(t) {
  for (var e, r = t.length, n = r % 3, i = [], a = 16383, o = 0, s = r - n; o < s; o += a)
    i.push(hf(t, o, o + a > s ? s : o + a));
  return n === 1 ? (e = t[r - 1], i.push(
    qt[e >> 2] + qt[e << 4 & 63] + "=="
  )) : n === 2 && (e = (t[r - 2] << 8) + t[r - 1], i.push(
    qt[e >> 10] + qt[e >> 4 & 63] + qt[e << 2 & 63] + "="
  )), i.join("");
}
var ho = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ho.read = function(t, e, r, n, i) {
  var a, o, s = i * 8 - n - 1, c = (1 << s) - 1, f = c >> 1, l = -7, w = r ? i - 1 : 0, m = r ? -1 : 1, g = t[e + w];
  for (w += m, a = g & (1 << -l) - 1, g >>= -l, l += s; l > 0; a = a * 256 + t[e + w], w += m, l -= 8)
    ;
  for (o = a & (1 << -l) - 1, a >>= -l, l += n; l > 0; o = o * 256 + t[e + w], w += m, l -= 8)
    ;
  if (a === 0)
    a = 1 - f;
  else {
    if (a === c)
      return o ? NaN : (g ? -1 : 1) * (1 / 0);
    o = o + Math.pow(2, n), a = a - f;
  }
  return (g ? -1 : 1) * o * Math.pow(2, a - n);
};
ho.write = function(t, e, r, n, i, a) {
  var o, s, c, f = a * 8 - i - 1, l = (1 << f) - 1, w = l >> 1, m = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, g = n ? 0 : a - 1, b = n ? 1 : -1, T = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
  for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, o = l) : (o = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -o)) < 1 && (o--, c *= 2), o + w >= 1 ? e += m / c : e += m * Math.pow(2, 1 - w), e * c >= 2 && (o++, c /= 2), o + w >= l ? (s = 0, o = l) : o + w >= 1 ? (s = (e * c - 1) * Math.pow(2, i), o = o + w) : (s = e * Math.pow(2, w - 1) * Math.pow(2, i), o = 0)); i >= 8; t[r + g] = s & 255, g += b, s /= 256, i -= 8)
    ;
  for (o = o << i | s, f += i; f > 0; t[r + g] = o & 255, g += b, o /= 256, f -= 8)
    ;
  t[r + g - b] |= T * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(t) {
  const e = Yn, r = ho, n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  t.Buffer = l, t.SlowBuffer = U, t.INSPECT_MAX_BYTES = 50;
  const i = 2147483647;
  t.kMaxLength = i;
  const { Uint8Array: a, ArrayBuffer: o, SharedArrayBuffer: s } = globalThis;
  l.TYPED_ARRAY_SUPPORT = c(), !l.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function c() {
    try {
      const k = new a(1), u = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(u, a.prototype), Object.setPrototypeOf(k, u), k.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(l.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (l.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(l.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (l.isBuffer(this))
        return this.byteOffset;
    }
  });
  function f(k) {
    if (k > i)
      throw new RangeError('The value "' + k + '" is invalid for option "size"');
    const u = new a(k);
    return Object.setPrototypeOf(u, l.prototype), u;
  }
  function l(k, u, d) {
    if (typeof k == "number") {
      if (typeof u == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return b(k);
    }
    return w(k, u, d);
  }
  l.poolSize = 8192;
  function w(k, u, d) {
    if (typeof k == "string")
      return T(k, u);
    if (o.isView(k))
      return S(k);
    if (k == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof k
      );
    if (Xe(k, o) || k && Xe(k.buffer, o) || typeof s < "u" && (Xe(k, s) || k && Xe(k.buffer, s)))
      return A(k, u, d);
    if (typeof k == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const E = k.valueOf && k.valueOf();
    if (E != null && E !== k)
      return l.from(E, u, d);
    const C = B(k);
    if (C) return C;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof k[Symbol.toPrimitive] == "function")
      return l.from(k[Symbol.toPrimitive]("string"), u, d);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof k
    );
  }
  l.from = function(k, u, d) {
    return w(k, u, d);
  }, Object.setPrototypeOf(l.prototype, a.prototype), Object.setPrototypeOf(l, a);
  function m(k) {
    if (typeof k != "number")
      throw new TypeError('"size" argument must be of type number');
    if (k < 0)
      throw new RangeError('The value "' + k + '" is invalid for option "size"');
  }
  function g(k, u, d) {
    return m(k), k <= 0 ? f(k) : u !== void 0 ? typeof d == "string" ? f(k).fill(u, d) : f(k).fill(u) : f(k);
  }
  l.alloc = function(k, u, d) {
    return g(k, u, d);
  };
  function b(k) {
    return m(k), f(k < 0 ? 0 : N(k) | 0);
  }
  l.allocUnsafe = function(k) {
    return b(k);
  }, l.allocUnsafeSlow = function(k) {
    return b(k);
  };
  function T(k, u) {
    if ((typeof u != "string" || u === "") && (u = "utf8"), !l.isEncoding(u))
      throw new TypeError("Unknown encoding: " + u);
    const d = M(k, u) | 0;
    let E = f(d);
    const C = E.write(k, u);
    return C !== d && (E = E.slice(0, C)), E;
  }
  function R(k) {
    const u = k.length < 0 ? 0 : N(k.length) | 0, d = f(u);
    for (let E = 0; E < u; E += 1)
      d[E] = k[E] & 255;
    return d;
  }
  function S(k) {
    if (Xe(k, a)) {
      const u = new a(k);
      return A(u.buffer, u.byteOffset, u.byteLength);
    }
    return R(k);
  }
  function A(k, u, d) {
    if (u < 0 || k.byteLength < u)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (k.byteLength < u + (d || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let E;
    return u === void 0 && d === void 0 ? E = new a(k) : d === void 0 ? E = new a(k, u) : E = new a(k, u, d), Object.setPrototypeOf(E, l.prototype), E;
  }
  function B(k) {
    if (l.isBuffer(k)) {
      const u = N(k.length) | 0, d = f(u);
      return d.length === 0 || k.copy(d, 0, 0, u), d;
    }
    if (k.length !== void 0)
      return typeof k.length != "number" || St(k.length) ? f(0) : R(k);
    if (k.type === "Buffer" && Array.isArray(k.data))
      return R(k.data);
  }
  function N(k) {
    if (k >= i)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
    return k | 0;
  }
  function U(k) {
    return +k != k && (k = 0), l.alloc(+k);
  }
  l.isBuffer = function(u) {
    return u != null && u._isBuffer === !0 && u !== l.prototype;
  }, l.compare = function(u, d) {
    if (Xe(u, a) && (u = l.from(u, u.offset, u.byteLength)), Xe(d, a) && (d = l.from(d, d.offset, d.byteLength)), !l.isBuffer(u) || !l.isBuffer(d))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (u === d) return 0;
    let E = u.length, C = d.length;
    for (let I = 0, P = Math.min(E, C); I < P; ++I)
      if (u[I] !== d[I]) {
        E = u[I], C = d[I];
        break;
      }
    return E < C ? -1 : C < E ? 1 : 0;
  }, l.isEncoding = function(u) {
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
  }, l.concat = function(u, d) {
    if (!Array.isArray(u))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (u.length === 0)
      return l.alloc(0);
    let E;
    if (d === void 0)
      for (d = 0, E = 0; E < u.length; ++E)
        d += u[E].length;
    const C = l.allocUnsafe(d);
    let I = 0;
    for (E = 0; E < u.length; ++E) {
      let P = u[E];
      if (Xe(P, a))
        I + P.length > C.length ? (l.isBuffer(P) || (P = l.from(P)), P.copy(C, I)) : a.prototype.set.call(
          C,
          P,
          I
        );
      else if (l.isBuffer(P))
        P.copy(C, I);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      I += P.length;
    }
    return C;
  };
  function M(k, u) {
    if (l.isBuffer(k))
      return k.length;
    if (o.isView(k) || Xe(k, o))
      return k.byteLength;
    if (typeof k != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof k
      );
    const d = k.length, E = arguments.length > 2 && arguments[2] === !0;
    if (!E && d === 0) return 0;
    let C = !1;
    for (; ; )
      switch (u) {
        case "ascii":
        case "latin1":
        case "binary":
          return d;
        case "utf8":
        case "utf-8":
          return ct(k).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return d * 2;
        case "hex":
          return d >>> 1;
        case "base64":
          return qe(k).length;
        default:
          if (C)
            return E ? -1 : ct(k).length;
          u = ("" + u).toLowerCase(), C = !0;
      }
  }
  l.byteLength = M;
  function $(k, u, d) {
    let E = !1;
    if ((u === void 0 || u < 0) && (u = 0), u > this.length || ((d === void 0 || d > this.length) && (d = this.length), d <= 0) || (d >>>= 0, u >>>= 0, d <= u))
      return "";
    for (k || (k = "utf8"); ; )
      switch (k) {
        case "hex":
          return _e(this, u, d);
        case "utf8":
        case "utf-8":
          return Y(this, u, d);
        case "ascii":
          return Ae(this, u, d);
        case "latin1":
        case "binary":
          return Ie(this, u, d);
        case "base64":
          return ie(this, u, d);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Te(this, u, d);
        default:
          if (E) throw new TypeError("Unknown encoding: " + k);
          k = (k + "").toLowerCase(), E = !0;
      }
  }
  l.prototype._isBuffer = !0;
  function O(k, u, d) {
    const E = k[u];
    k[u] = k[d], k[d] = E;
  }
  l.prototype.swap16 = function() {
    const u = this.length;
    if (u % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let d = 0; d < u; d += 2)
      O(this, d, d + 1);
    return this;
  }, l.prototype.swap32 = function() {
    const u = this.length;
    if (u % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let d = 0; d < u; d += 4)
      O(this, d, d + 3), O(this, d + 1, d + 2);
    return this;
  }, l.prototype.swap64 = function() {
    const u = this.length;
    if (u % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let d = 0; d < u; d += 8)
      O(this, d, d + 7), O(this, d + 1, d + 6), O(this, d + 2, d + 5), O(this, d + 3, d + 4);
    return this;
  }, l.prototype.toString = function() {
    const u = this.length;
    return u === 0 ? "" : arguments.length === 0 ? Y(this, 0, u) : $.apply(this, arguments);
  }, l.prototype.toLocaleString = l.prototype.toString, l.prototype.equals = function(u) {
    if (!l.isBuffer(u)) throw new TypeError("Argument must be a Buffer");
    return this === u ? !0 : l.compare(this, u) === 0;
  }, l.prototype.inspect = function() {
    let u = "";
    const d = t.INSPECT_MAX_BYTES;
    return u = this.toString("hex", 0, d).replace(/(.{2})/g, "$1 ").trim(), this.length > d && (u += " ... "), "<Buffer " + u + ">";
  }, n && (l.prototype[n] = l.prototype.inspect), l.prototype.compare = function(u, d, E, C, I) {
    if (Xe(u, a) && (u = l.from(u, u.offset, u.byteLength)), !l.isBuffer(u))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof u
      );
    if (d === void 0 && (d = 0), E === void 0 && (E = u ? u.length : 0), C === void 0 && (C = 0), I === void 0 && (I = this.length), d < 0 || E > u.length || C < 0 || I > this.length)
      throw new RangeError("out of range index");
    if (C >= I && d >= E)
      return 0;
    if (C >= I)
      return -1;
    if (d >= E)
      return 1;
    if (d >>>= 0, E >>>= 0, C >>>= 0, I >>>= 0, this === u) return 0;
    let P = I - C, _ = E - d;
    const ee = Math.min(P, _), ue = this.slice(C, I), h = u.slice(d, E);
    for (let H = 0; H < ee; ++H)
      if (ue[H] !== h[H]) {
        P = ue[H], _ = h[H];
        break;
      }
    return P < _ ? -1 : _ < P ? 1 : 0;
  };
  function W(k, u, d, E, C) {
    if (k.length === 0) return -1;
    if (typeof d == "string" ? (E = d, d = 0) : d > 2147483647 ? d = 2147483647 : d < -2147483648 && (d = -2147483648), d = +d, St(d) && (d = C ? 0 : k.length - 1), d < 0 && (d = k.length + d), d >= k.length) {
      if (C) return -1;
      d = k.length - 1;
    } else if (d < 0)
      if (C) d = 0;
      else return -1;
    if (typeof u == "string" && (u = l.from(u, E)), l.isBuffer(u))
      return u.length === 0 ? -1 : z(k, u, d, E, C);
    if (typeof u == "number")
      return u = u & 255, typeof a.prototype.indexOf == "function" ? C ? a.prototype.indexOf.call(k, u, d) : a.prototype.lastIndexOf.call(k, u, d) : z(k, [u], d, E, C);
    throw new TypeError("val must be string, number or Buffer");
  }
  function z(k, u, d, E, C) {
    let I = 1, P = k.length, _ = u.length;
    if (E !== void 0 && (E = String(E).toLowerCase(), E === "ucs2" || E === "ucs-2" || E === "utf16le" || E === "utf-16le")) {
      if (k.length < 2 || u.length < 2)
        return -1;
      I = 2, P /= 2, _ /= 2, d /= 2;
    }
    function ee(h, H) {
      return I === 1 ? h[H] : h.readUInt16BE(H * I);
    }
    let ue;
    if (C) {
      let h = -1;
      for (ue = d; ue < P; ue++)
        if (ee(k, ue) === ee(u, h === -1 ? 0 : ue - h)) {
          if (h === -1 && (h = ue), ue - h + 1 === _) return h * I;
        } else
          h !== -1 && (ue -= ue - h), h = -1;
    } else
      for (d + _ > P && (d = P - _), ue = d; ue >= 0; ue--) {
        let h = !0;
        for (let H = 0; H < _; H++)
          if (ee(k, ue + H) !== ee(u, H)) {
            h = !1;
            break;
          }
        if (h) return ue;
      }
    return -1;
  }
  l.prototype.includes = function(u, d, E) {
    return this.indexOf(u, d, E) !== -1;
  }, l.prototype.indexOf = function(u, d, E) {
    return W(this, u, d, E, !0);
  }, l.prototype.lastIndexOf = function(u, d, E) {
    return W(this, u, d, E, !1);
  };
  function K(k, u, d, E) {
    d = Number(d) || 0;
    const C = k.length - d;
    E ? (E = Number(E), E > C && (E = C)) : E = C;
    const I = u.length;
    E > I / 2 && (E = I / 2);
    let P;
    for (P = 0; P < E; ++P) {
      const _ = parseInt(u.substr(P * 2, 2), 16);
      if (St(_)) return P;
      k[d + P] = _;
    }
    return P;
  }
  function F(k, u, d, E) {
    return nt(ct(u, k.length - d), k, d, E);
  }
  function Q(k, u, d, E) {
    return nt(et(u), k, d, E);
  }
  function se(k, u, d, E) {
    return nt(qe(u), k, d, E);
  }
  function ve(k, u, d, E) {
    return nt(Me(u, k.length - d), k, d, E);
  }
  l.prototype.write = function(u, d, E, C) {
    if (d === void 0)
      C = "utf8", E = this.length, d = 0;
    else if (E === void 0 && typeof d == "string")
      C = d, E = this.length, d = 0;
    else if (isFinite(d))
      d = d >>> 0, isFinite(E) ? (E = E >>> 0, C === void 0 && (C = "utf8")) : (C = E, E = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const I = this.length - d;
    if ((E === void 0 || E > I) && (E = I), u.length > 0 && (E < 0 || d < 0) || d > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    C || (C = "utf8");
    let P = !1;
    for (; ; )
      switch (C) {
        case "hex":
          return K(this, u, d, E);
        case "utf8":
        case "utf-8":
          return F(this, u, d, E);
        case "ascii":
        case "latin1":
        case "binary":
          return Q(this, u, d, E);
        case "base64":
          return se(this, u, d, E);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ve(this, u, d, E);
        default:
          if (P) throw new TypeError("Unknown encoding: " + C);
          C = ("" + C).toLowerCase(), P = !0;
      }
  }, l.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function ie(k, u, d) {
    return u === 0 && d === k.length ? e.fromByteArray(k) : e.fromByteArray(k.slice(u, d));
  }
  function Y(k, u, d) {
    d = Math.min(k.length, d);
    const E = [];
    let C = u;
    for (; C < d; ) {
      const I = k[C];
      let P = null, _ = I > 239 ? 4 : I > 223 ? 3 : I > 191 ? 2 : 1;
      if (C + _ <= d) {
        let ee, ue, h, H;
        switch (_) {
          case 1:
            I < 128 && (P = I);
            break;
          case 2:
            ee = k[C + 1], (ee & 192) === 128 && (H = (I & 31) << 6 | ee & 63, H > 127 && (P = H));
            break;
          case 3:
            ee = k[C + 1], ue = k[C + 2], (ee & 192) === 128 && (ue & 192) === 128 && (H = (I & 15) << 12 | (ee & 63) << 6 | ue & 63, H > 2047 && (H < 55296 || H > 57343) && (P = H));
            break;
          case 4:
            ee = k[C + 1], ue = k[C + 2], h = k[C + 3], (ee & 192) === 128 && (ue & 192) === 128 && (h & 192) === 128 && (H = (I & 15) << 18 | (ee & 63) << 12 | (ue & 63) << 6 | h & 63, H > 65535 && H < 1114112 && (P = H));
        }
      }
      P === null ? (P = 65533, _ = 1) : P > 65535 && (P -= 65536, E.push(P >>> 10 & 1023 | 55296), P = 56320 | P & 1023), E.push(P), C += _;
    }
    return de(E);
  }
  const ae = 4096;
  function de(k) {
    const u = k.length;
    if (u <= ae)
      return String.fromCharCode.apply(String, k);
    let d = "", E = 0;
    for (; E < u; )
      d += String.fromCharCode.apply(
        String,
        k.slice(E, E += ae)
      );
    return d;
  }
  function Ae(k, u, d) {
    let E = "";
    d = Math.min(k.length, d);
    for (let C = u; C < d; ++C)
      E += String.fromCharCode(k[C] & 127);
    return E;
  }
  function Ie(k, u, d) {
    let E = "";
    d = Math.min(k.length, d);
    for (let C = u; C < d; ++C)
      E += String.fromCharCode(k[C]);
    return E;
  }
  function _e(k, u, d) {
    const E = k.length;
    (!u || u < 0) && (u = 0), (!d || d < 0 || d > E) && (d = E);
    let C = "";
    for (let I = u; I < d; ++I)
      C += kt[k[I]];
    return C;
  }
  function Te(k, u, d) {
    const E = k.slice(u, d);
    let C = "";
    for (let I = 0; I < E.length - 1; I += 2)
      C += String.fromCharCode(E[I] + E[I + 1] * 256);
    return C;
  }
  l.prototype.slice = function(u, d) {
    const E = this.length;
    u = ~~u, d = d === void 0 ? E : ~~d, u < 0 ? (u += E, u < 0 && (u = 0)) : u > E && (u = E), d < 0 ? (d += E, d < 0 && (d = 0)) : d > E && (d = E), d < u && (d = u);
    const C = this.subarray(u, d);
    return Object.setPrototypeOf(C, l.prototype), C;
  };
  function ge(k, u, d) {
    if (k % 1 !== 0 || k < 0) throw new RangeError("offset is not uint");
    if (k + u > d) throw new RangeError("Trying to access beyond buffer length");
  }
  l.prototype.readUintLE = l.prototype.readUIntLE = function(u, d, E) {
    u = u >>> 0, d = d >>> 0, E || ge(u, d, this.length);
    let C = this[u], I = 1, P = 0;
    for (; ++P < d && (I *= 256); )
      C += this[u + P] * I;
    return C;
  }, l.prototype.readUintBE = l.prototype.readUIntBE = function(u, d, E) {
    u = u >>> 0, d = d >>> 0, E || ge(u, d, this.length);
    let C = this[u + --d], I = 1;
    for (; d > 0 && (I *= 256); )
      C += this[u + --d] * I;
    return C;
  }, l.prototype.readUint8 = l.prototype.readUInt8 = function(u, d) {
    return u = u >>> 0, d || ge(u, 1, this.length), this[u];
  }, l.prototype.readUint16LE = l.prototype.readUInt16LE = function(u, d) {
    return u = u >>> 0, d || ge(u, 2, this.length), this[u] | this[u + 1] << 8;
  }, l.prototype.readUint16BE = l.prototype.readUInt16BE = function(u, d) {
    return u = u >>> 0, d || ge(u, 2, this.length), this[u] << 8 | this[u + 1];
  }, l.prototype.readUint32LE = l.prototype.readUInt32LE = function(u, d) {
    return u = u >>> 0, d || ge(u, 4, this.length), (this[u] | this[u + 1] << 8 | this[u + 2] << 16) + this[u + 3] * 16777216;
  }, l.prototype.readUint32BE = l.prototype.readUInt32BE = function(u, d) {
    return u = u >>> 0, d || ge(u, 4, this.length), this[u] * 16777216 + (this[u + 1] << 16 | this[u + 2] << 8 | this[u + 3]);
  }, l.prototype.readBigUInt64LE = He(function(u) {
    u = u >>> 0, Ce(u, "offset");
    const d = this[u], E = this[u + 7];
    (d === void 0 || E === void 0) && Fe(u, this.length - 8);
    const C = d + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + this[++u] * 2 ** 24, I = this[++u] + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + E * 2 ** 24;
    return BigInt(C) + (BigInt(I) << BigInt(32));
  }), l.prototype.readBigUInt64BE = He(function(u) {
    u = u >>> 0, Ce(u, "offset");
    const d = this[u], E = this[u + 7];
    (d === void 0 || E === void 0) && Fe(u, this.length - 8);
    const C = d * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + this[++u], I = this[++u] * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + E;
    return (BigInt(C) << BigInt(32)) + BigInt(I);
  }), l.prototype.readIntLE = function(u, d, E) {
    u = u >>> 0, d = d >>> 0, E || ge(u, d, this.length);
    let C = this[u], I = 1, P = 0;
    for (; ++P < d && (I *= 256); )
      C += this[u + P] * I;
    return I *= 128, C >= I && (C -= Math.pow(2, 8 * d)), C;
  }, l.prototype.readIntBE = function(u, d, E) {
    u = u >>> 0, d = d >>> 0, E || ge(u, d, this.length);
    let C = d, I = 1, P = this[u + --C];
    for (; C > 0 && (I *= 256); )
      P += this[u + --C] * I;
    return I *= 128, P >= I && (P -= Math.pow(2, 8 * d)), P;
  }, l.prototype.readInt8 = function(u, d) {
    return u = u >>> 0, d || ge(u, 1, this.length), this[u] & 128 ? (255 - this[u] + 1) * -1 : this[u];
  }, l.prototype.readInt16LE = function(u, d) {
    u = u >>> 0, d || ge(u, 2, this.length);
    const E = this[u] | this[u + 1] << 8;
    return E & 32768 ? E | 4294901760 : E;
  }, l.prototype.readInt16BE = function(u, d) {
    u = u >>> 0, d || ge(u, 2, this.length);
    const E = this[u + 1] | this[u] << 8;
    return E & 32768 ? E | 4294901760 : E;
  }, l.prototype.readInt32LE = function(u, d) {
    return u = u >>> 0, d || ge(u, 4, this.length), this[u] | this[u + 1] << 8 | this[u + 2] << 16 | this[u + 3] << 24;
  }, l.prototype.readInt32BE = function(u, d) {
    return u = u >>> 0, d || ge(u, 4, this.length), this[u] << 24 | this[u + 1] << 16 | this[u + 2] << 8 | this[u + 3];
  }, l.prototype.readBigInt64LE = He(function(u) {
    u = u >>> 0, Ce(u, "offset");
    const d = this[u], E = this[u + 7];
    (d === void 0 || E === void 0) && Fe(u, this.length - 8);
    const C = this[u + 4] + this[u + 5] * 2 ** 8 + this[u + 6] * 2 ** 16 + (E << 24);
    return (BigInt(C) << BigInt(32)) + BigInt(d + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + this[++u] * 2 ** 24);
  }), l.prototype.readBigInt64BE = He(function(u) {
    u = u >>> 0, Ce(u, "offset");
    const d = this[u], E = this[u + 7];
    (d === void 0 || E === void 0) && Fe(u, this.length - 8);
    const C = (d << 24) + // Overflow
    this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + this[++u];
    return (BigInt(C) << BigInt(32)) + BigInt(this[++u] * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + E);
  }), l.prototype.readFloatLE = function(u, d) {
    return u = u >>> 0, d || ge(u, 4, this.length), r.read(this, u, !0, 23, 4);
  }, l.prototype.readFloatBE = function(u, d) {
    return u = u >>> 0, d || ge(u, 4, this.length), r.read(this, u, !1, 23, 4);
  }, l.prototype.readDoubleLE = function(u, d) {
    return u = u >>> 0, d || ge(u, 8, this.length), r.read(this, u, !0, 52, 8);
  }, l.prototype.readDoubleBE = function(u, d) {
    return u = u >>> 0, d || ge(u, 8, this.length), r.read(this, u, !1, 52, 8);
  };
  function $e(k, u, d, E, C, I) {
    if (!l.isBuffer(k)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (u > C || u < I) throw new RangeError('"value" argument is out of bounds');
    if (d + E > k.length) throw new RangeError("Index out of range");
  }
  l.prototype.writeUintLE = l.prototype.writeUIntLE = function(u, d, E, C) {
    if (u = +u, d = d >>> 0, E = E >>> 0, !C) {
      const _ = Math.pow(2, 8 * E) - 1;
      $e(this, u, d, E, _, 0);
    }
    let I = 1, P = 0;
    for (this[d] = u & 255; ++P < E && (I *= 256); )
      this[d + P] = u / I & 255;
    return d + E;
  }, l.prototype.writeUintBE = l.prototype.writeUIntBE = function(u, d, E, C) {
    if (u = +u, d = d >>> 0, E = E >>> 0, !C) {
      const _ = Math.pow(2, 8 * E) - 1;
      $e(this, u, d, E, _, 0);
    }
    let I = E - 1, P = 1;
    for (this[d + I] = u & 255; --I >= 0 && (P *= 256); )
      this[d + I] = u / P & 255;
    return d + E;
  }, l.prototype.writeUint8 = l.prototype.writeUInt8 = function(u, d, E) {
    return u = +u, d = d >>> 0, E || $e(this, u, d, 1, 255, 0), this[d] = u & 255, d + 1;
  }, l.prototype.writeUint16LE = l.prototype.writeUInt16LE = function(u, d, E) {
    return u = +u, d = d >>> 0, E || $e(this, u, d, 2, 65535, 0), this[d] = u & 255, this[d + 1] = u >>> 8, d + 2;
  }, l.prototype.writeUint16BE = l.prototype.writeUInt16BE = function(u, d, E) {
    return u = +u, d = d >>> 0, E || $e(this, u, d, 2, 65535, 0), this[d] = u >>> 8, this[d + 1] = u & 255, d + 2;
  }, l.prototype.writeUint32LE = l.prototype.writeUInt32LE = function(u, d, E) {
    return u = +u, d = d >>> 0, E || $e(this, u, d, 4, 4294967295, 0), this[d + 3] = u >>> 24, this[d + 2] = u >>> 16, this[d + 1] = u >>> 8, this[d] = u & 255, d + 4;
  }, l.prototype.writeUint32BE = l.prototype.writeUInt32BE = function(u, d, E) {
    return u = +u, d = d >>> 0, E || $e(this, u, d, 4, 4294967295, 0), this[d] = u >>> 24, this[d + 1] = u >>> 16, this[d + 2] = u >>> 8, this[d + 3] = u & 255, d + 4;
  };
  function ke(k, u, d, E, C) {
    je(u, E, C, k, d, 7);
    let I = Number(u & BigInt(4294967295));
    k[d++] = I, I = I >> 8, k[d++] = I, I = I >> 8, k[d++] = I, I = I >> 8, k[d++] = I;
    let P = Number(u >> BigInt(32) & BigInt(4294967295));
    return k[d++] = P, P = P >> 8, k[d++] = P, P = P >> 8, k[d++] = P, P = P >> 8, k[d++] = P, d;
  }
  function Se(k, u, d, E, C) {
    je(u, E, C, k, d, 7);
    let I = Number(u & BigInt(4294967295));
    k[d + 7] = I, I = I >> 8, k[d + 6] = I, I = I >> 8, k[d + 5] = I, I = I >> 8, k[d + 4] = I;
    let P = Number(u >> BigInt(32) & BigInt(4294967295));
    return k[d + 3] = P, P = P >> 8, k[d + 2] = P, P = P >> 8, k[d + 1] = P, P = P >> 8, k[d] = P, d + 8;
  }
  l.prototype.writeBigUInt64LE = He(function(u, d = 0) {
    return ke(this, u, d, BigInt(0), BigInt("0xffffffffffffffff"));
  }), l.prototype.writeBigUInt64BE = He(function(u, d = 0) {
    return Se(this, u, d, BigInt(0), BigInt("0xffffffffffffffff"));
  }), l.prototype.writeIntLE = function(u, d, E, C) {
    if (u = +u, d = d >>> 0, !C) {
      const ee = Math.pow(2, 8 * E - 1);
      $e(this, u, d, E, ee - 1, -ee);
    }
    let I = 0, P = 1, _ = 0;
    for (this[d] = u & 255; ++I < E && (P *= 256); )
      u < 0 && _ === 0 && this[d + I - 1] !== 0 && (_ = 1), this[d + I] = (u / P >> 0) - _ & 255;
    return d + E;
  }, l.prototype.writeIntBE = function(u, d, E, C) {
    if (u = +u, d = d >>> 0, !C) {
      const ee = Math.pow(2, 8 * E - 1);
      $e(this, u, d, E, ee - 1, -ee);
    }
    let I = E - 1, P = 1, _ = 0;
    for (this[d + I] = u & 255; --I >= 0 && (P *= 256); )
      u < 0 && _ === 0 && this[d + I + 1] !== 0 && (_ = 1), this[d + I] = (u / P >> 0) - _ & 255;
    return d + E;
  }, l.prototype.writeInt8 = function(u, d, E) {
    return u = +u, d = d >>> 0, E || $e(this, u, d, 1, 127, -128), u < 0 && (u = 255 + u + 1), this[d] = u & 255, d + 1;
  }, l.prototype.writeInt16LE = function(u, d, E) {
    return u = +u, d = d >>> 0, E || $e(this, u, d, 2, 32767, -32768), this[d] = u & 255, this[d + 1] = u >>> 8, d + 2;
  }, l.prototype.writeInt16BE = function(u, d, E) {
    return u = +u, d = d >>> 0, E || $e(this, u, d, 2, 32767, -32768), this[d] = u >>> 8, this[d + 1] = u & 255, d + 2;
  }, l.prototype.writeInt32LE = function(u, d, E) {
    return u = +u, d = d >>> 0, E || $e(this, u, d, 4, 2147483647, -2147483648), this[d] = u & 255, this[d + 1] = u >>> 8, this[d + 2] = u >>> 16, this[d + 3] = u >>> 24, d + 4;
  }, l.prototype.writeInt32BE = function(u, d, E) {
    return u = +u, d = d >>> 0, E || $e(this, u, d, 4, 2147483647, -2147483648), u < 0 && (u = 4294967295 + u + 1), this[d] = u >>> 24, this[d + 1] = u >>> 16, this[d + 2] = u >>> 8, this[d + 3] = u & 255, d + 4;
  }, l.prototype.writeBigInt64LE = He(function(u, d = 0) {
    return ke(this, u, d, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), l.prototype.writeBigInt64BE = He(function(u, d = 0) {
    return Se(this, u, d, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function Pe(k, u, d, E, C, I) {
    if (d + E > k.length) throw new RangeError("Index out of range");
    if (d < 0) throw new RangeError("Index out of range");
  }
  function Ue(k, u, d, E, C) {
    return u = +u, d = d >>> 0, C || Pe(k, u, d, 4), r.write(k, u, d, E, 23, 4), d + 4;
  }
  l.prototype.writeFloatLE = function(u, d, E) {
    return Ue(this, u, d, !0, E);
  }, l.prototype.writeFloatBE = function(u, d, E) {
    return Ue(this, u, d, !1, E);
  };
  function Be(k, u, d, E, C) {
    return u = +u, d = d >>> 0, C || Pe(k, u, d, 8), r.write(k, u, d, E, 52, 8), d + 8;
  }
  l.prototype.writeDoubleLE = function(u, d, E) {
    return Be(this, u, d, !0, E);
  }, l.prototype.writeDoubleBE = function(u, d, E) {
    return Be(this, u, d, !1, E);
  }, l.prototype.copy = function(u, d, E, C) {
    if (!l.isBuffer(u)) throw new TypeError("argument should be a Buffer");
    if (E || (E = 0), !C && C !== 0 && (C = this.length), d >= u.length && (d = u.length), d || (d = 0), C > 0 && C < E && (C = E), C === E || u.length === 0 || this.length === 0) return 0;
    if (d < 0)
      throw new RangeError("targetStart out of bounds");
    if (E < 0 || E >= this.length) throw new RangeError("Index out of range");
    if (C < 0) throw new RangeError("sourceEnd out of bounds");
    C > this.length && (C = this.length), u.length - d < C - E && (C = u.length - d + E);
    const I = C - E;
    return this === u && typeof a.prototype.copyWithin == "function" ? this.copyWithin(d, E, C) : a.prototype.set.call(
      u,
      this.subarray(E, C),
      d
    ), I;
  }, l.prototype.fill = function(u, d, E, C) {
    if (typeof u == "string") {
      if (typeof d == "string" ? (C = d, d = 0, E = this.length) : typeof E == "string" && (C = E, E = this.length), C !== void 0 && typeof C != "string")
        throw new TypeError("encoding must be a string");
      if (typeof C == "string" && !l.isEncoding(C))
        throw new TypeError("Unknown encoding: " + C);
      if (u.length === 1) {
        const P = u.charCodeAt(0);
        (C === "utf8" && P < 128 || C === "latin1") && (u = P);
      }
    } else typeof u == "number" ? u = u & 255 : typeof u == "boolean" && (u = Number(u));
    if (d < 0 || this.length < d || this.length < E)
      throw new RangeError("Out of range index");
    if (E <= d)
      return this;
    d = d >>> 0, E = E === void 0 ? this.length : E >>> 0, u || (u = 0);
    let I;
    if (typeof u == "number")
      for (I = d; I < E; ++I)
        this[I] = u;
    else {
      const P = l.isBuffer(u) ? u : l.from(u, C), _ = P.length;
      if (_ === 0)
        throw new TypeError('The value "' + u + '" is invalid for argument "value"');
      for (I = 0; I < E - d; ++I)
        this[I + d] = P[I % _];
    }
    return this;
  };
  const Re = {};
  function le(k, u, d) {
    Re[k] = class extends d {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: u.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${k}]`, this.stack, delete this.name;
      }
      get code() {
        return k;
      }
      set code(C) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: C,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${k}]: ${this.message}`;
      }
    };
  }
  le(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(k) {
      return k ? `${k} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), le(
    "ERR_INVALID_ARG_TYPE",
    function(k, u) {
      return `The "${k}" argument must be of type number. Received type ${typeof u}`;
    },
    TypeError
  ), le(
    "ERR_OUT_OF_RANGE",
    function(k, u, d) {
      let E = `The value of "${k}" is out of range.`, C = d;
      return Number.isInteger(d) && Math.abs(d) > 2 ** 32 ? C = be(String(d)) : typeof d == "bigint" && (C = String(d), (d > BigInt(2) ** BigInt(32) || d < -(BigInt(2) ** BigInt(32))) && (C = be(C)), C += "n"), E += ` It must be ${u}. Received ${C}`, E;
    },
    RangeError
  );
  function be(k) {
    let u = "", d = k.length;
    const E = k[0] === "-" ? 1 : 0;
    for (; d >= E + 4; d -= 3)
      u = `_${k.slice(d - 3, d)}${u}`;
    return `${k.slice(0, d)}${u}`;
  }
  function Le(k, u, d) {
    Ce(u, "offset"), (k[u] === void 0 || k[u + d] === void 0) && Fe(u, k.length - (d + 1));
  }
  function je(k, u, d, E, C, I) {
    if (k > d || k < u) {
      const P = typeof u == "bigint" ? "n" : "";
      let _;
      throw u === 0 || u === BigInt(0) ? _ = `>= 0${P} and < 2${P} ** ${(I + 1) * 8}${P}` : _ = `>= -(2${P} ** ${(I + 1) * 8 - 1}${P}) and < 2 ** ${(I + 1) * 8 - 1}${P}`, new Re.ERR_OUT_OF_RANGE("value", _, k);
    }
    Le(E, C, I);
  }
  function Ce(k, u) {
    if (typeof k != "number")
      throw new Re.ERR_INVALID_ARG_TYPE(u, "number", k);
  }
  function Fe(k, u, d) {
    throw Math.floor(k) !== k ? (Ce(k, d), new Re.ERR_OUT_OF_RANGE("offset", "an integer", k)) : u < 0 ? new Re.ERR_BUFFER_OUT_OF_BOUNDS() : new Re.ERR_OUT_OF_RANGE(
      "offset",
      `>= 0 and <= ${u}`,
      k
    );
  }
  const xe = /[^+/0-9A-Za-z-_]/g;
  function rt(k) {
    if (k = k.split("=")[0], k = k.trim().replace(xe, ""), k.length < 2) return "";
    for (; k.length % 4 !== 0; )
      k = k + "=";
    return k;
  }
  function ct(k, u) {
    u = u || 1 / 0;
    let d;
    const E = k.length;
    let C = null;
    const I = [];
    for (let P = 0; P < E; ++P) {
      if (d = k.charCodeAt(P), d > 55295 && d < 57344) {
        if (!C) {
          if (d > 56319) {
            (u -= 3) > -1 && I.push(239, 191, 189);
            continue;
          } else if (P + 1 === E) {
            (u -= 3) > -1 && I.push(239, 191, 189);
            continue;
          }
          C = d;
          continue;
        }
        if (d < 56320) {
          (u -= 3) > -1 && I.push(239, 191, 189), C = d;
          continue;
        }
        d = (C - 55296 << 10 | d - 56320) + 65536;
      } else C && (u -= 3) > -1 && I.push(239, 191, 189);
      if (C = null, d < 128) {
        if ((u -= 1) < 0) break;
        I.push(d);
      } else if (d < 2048) {
        if ((u -= 2) < 0) break;
        I.push(
          d >> 6 | 192,
          d & 63 | 128
        );
      } else if (d < 65536) {
        if ((u -= 3) < 0) break;
        I.push(
          d >> 12 | 224,
          d >> 6 & 63 | 128,
          d & 63 | 128
        );
      } else if (d < 1114112) {
        if ((u -= 4) < 0) break;
        I.push(
          d >> 18 | 240,
          d >> 12 & 63 | 128,
          d >> 6 & 63 | 128,
          d & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return I;
  }
  function et(k) {
    const u = [];
    for (let d = 0; d < k.length; ++d)
      u.push(k.charCodeAt(d) & 255);
    return u;
  }
  function Me(k, u) {
    let d, E, C;
    const I = [];
    for (let P = 0; P < k.length && !((u -= 2) < 0); ++P)
      d = k.charCodeAt(P), E = d >> 8, C = d % 256, I.push(C), I.push(E);
    return I;
  }
  function qe(k) {
    return e.toByteArray(rt(k));
  }
  function nt(k, u, d, E) {
    let C;
    for (C = 0; C < E && !(C + d >= u.length || C >= k.length); ++C)
      u[C + d] = k[C];
    return C;
  }
  function Xe(k, u) {
    return k instanceof u || k != null && k.constructor != null && k.constructor.name != null && k.constructor.name === u.name;
  }
  function St(k) {
    return k !== k;
  }
  const kt = function() {
    const k = "0123456789abcdef", u = new Array(256);
    for (let d = 0; d < 16; ++d) {
      const E = d * 16;
      for (let C = 0; C < 16; ++C)
        u[E + C] = k[d] + k[C];
    }
    return u;
  }();
  function He(k) {
    return typeof BigInt > "u" ? st : k;
  }
  function st() {
    throw new Error("BigInt not supported");
  }
})(tl);
const he = tl.Buffer;
function pf(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var nl = { exports: {} }, at = nl.exports = {}, Lt, zt;
function to() {
  throw new Error("setTimeout has not been defined");
}
function ro() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Lt = setTimeout : Lt = to;
  } catch {
    Lt = to;
  }
  try {
    typeof clearTimeout == "function" ? zt = clearTimeout : zt = ro;
  } catch {
    zt = ro;
  }
})();
function il(t) {
  if (Lt === setTimeout)
    return setTimeout(t, 0);
  if ((Lt === to || !Lt) && setTimeout)
    return Lt = setTimeout, setTimeout(t, 0);
  try {
    return Lt(t, 0);
  } catch {
    try {
      return Lt.call(null, t, 0);
    } catch {
      return Lt.call(this, t, 0);
    }
  }
}
function wf(t) {
  if (zt === clearTimeout)
    return clearTimeout(t);
  if ((zt === ro || !zt) && clearTimeout)
    return zt = clearTimeout, clearTimeout(t);
  try {
    return zt(t);
  } catch {
    try {
      return zt.call(null, t);
    } catch {
      return zt.call(this, t);
    }
  }
}
var Yt = [], Br = !1, _r, Un = -1;
function mf() {
  !Br || !_r || (Br = !1, _r.length ? Yt = _r.concat(Yt) : Un = -1, Yt.length && al());
}
function al() {
  if (!Br) {
    var t = il(mf);
    Br = !0;
    for (var e = Yt.length; e; ) {
      for (_r = Yt, Yt = []; ++Un < e; )
        _r && _r[Un].run();
      Un = -1, e = Yt.length;
    }
    _r = null, Br = !1, wf(t);
  }
}
at.nextTick = function(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var r = 1; r < arguments.length; r++)
      e[r - 1] = arguments[r];
  Yt.push(new ol(t, e)), Yt.length === 1 && !Br && il(al);
};
function ol(t, e) {
  this.fun = t, this.array = e;
}
ol.prototype.run = function() {
  this.fun.apply(null, this.array);
};
at.title = "browser";
at.browser = !0;
at.env = {};
at.argv = [];
at.version = "";
at.versions = {};
function tr() {
}
at.on = tr;
at.addListener = tr;
at.once = tr;
at.off = tr;
at.removeListener = tr;
at.removeAllListeners = tr;
at.emit = tr;
at.prependListener = tr;
at.prependOnceListener = tr;
at.listeners = function(t) {
  return [];
};
at.binding = function(t) {
  throw new Error("process.binding is not supported");
};
at.cwd = function() {
  return "/";
};
at.chdir = function(t) {
  throw new Error("process.chdir is not supported");
};
at.umask = function() {
  return 0;
};
var yf = nl.exports;
const vt = /* @__PURE__ */ pf(yf);
function rr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function gf(t) {
  if (Object.prototype.hasOwnProperty.call(t, "__esModule")) return t;
  var e = t.default;
  if (typeof e == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(t, n);
    Object.defineProperty(r, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return t[n];
      }
    });
  }), r;
}
var si, Fo;
function vf() {
  if (Fo) return si;
  Fo = 1;
  var t = function(e) {
    if (e = e || {}, this.Promise = e.Promise || Promise, this.queues = /* @__PURE__ */ Object.create(null), this.domainReentrant = e.domainReentrant || !1, this.domainReentrant) {
      if (typeof vt > "u" || typeof vt.domain > "u")
        throw new Error(
          "Domain-reentrant locks require `process.domain` to exist. Please flip `opts.domainReentrant = false`, use a NodeJS version that still implements Domain, or install a browser polyfill."
        );
      this.domains = /* @__PURE__ */ Object.create(null);
    }
    this.timeout = e.timeout || t.DEFAULT_TIMEOUT, this.maxOccupationTime = e.maxOccupationTime || t.DEFAULT_MAX_OCCUPATION_TIME, this.maxExecutionTime = e.maxExecutionTime || t.DEFAULT_MAX_EXECUTION_TIME, e.maxPending === 1 / 0 || Number.isInteger(e.maxPending) && e.maxPending >= 0 ? this.maxPending = e.maxPending : this.maxPending = t.DEFAULT_MAX_PENDING;
  };
  return t.DEFAULT_TIMEOUT = 0, t.DEFAULT_MAX_OCCUPATION_TIME = 0, t.DEFAULT_MAX_EXECUTION_TIME = 0, t.DEFAULT_MAX_PENDING = 1e3, t.prototype.acquire = function(e, r, n, i) {
    if (Array.isArray(e))
      return this._acquireBatch(e, r, n, i);
    if (typeof r != "function")
      throw new Error("You must pass a function to execute");
    var a = null, o = null, s = null;
    typeof n != "function" && (i = n, n = null, s = new this.Promise(function(B, N) {
      a = B, o = N;
    })), i = i || {};
    var c = !1, f = null, l = null, w = null, m = this, g = function(B, N, U) {
      l && (clearTimeout(l), l = null), w && (clearTimeout(w), w = null), B && (m.queues[e] && m.queues[e].length === 0 && delete m.queues[e], m.domainReentrant && delete m.domains[e]), c || (s ? N ? o(N) : a(U) : typeof n == "function" && n(N, U), c = !0), B && m.queues[e] && m.queues[e].length > 0 && m.queues[e].shift()();
    }, b = function(B) {
      if (c)
        return g(B);
      f && (clearTimeout(f), f = null), m.domainReentrant && B && (m.domains[e] = vt.domain);
      var N = i.maxExecutionTime || m.maxExecutionTime;
      if (N && (w = setTimeout(function() {
        m.queues[e] && g(B, new Error("Maximum execution time is exceeded " + e));
      }, N)), r.length === 1) {
        var U = !1;
        try {
          r(function(M, $) {
            U || (U = !0, g(B, M, $));
          });
        } catch (M) {
          U || (U = !0, g(B, M));
        }
      } else
        m._promiseTry(function() {
          return r();
        }).then(function(M) {
          g(B, void 0, M);
        }, function(M) {
          g(B, M);
        });
    };
    m.domainReentrant && vt.domain && (b = vt.domain.bind(b));
    var T = i.maxPending || m.maxPending;
    if (!m.queues[e])
      m.queues[e] = [], b(!0);
    else if (m.domainReentrant && vt.domain && vt.domain === m.domains[e])
      b(!1);
    else if (m.queues[e].length >= T)
      g(!1, new Error("Too many pending tasks in queue " + e));
    else {
      var R = function() {
        b(!0);
      };
      i.skipQueue ? m.queues[e].unshift(R) : m.queues[e].push(R);
      var S = i.timeout || m.timeout;
      S && (f = setTimeout(function() {
        f = null, g(!1, new Error("async-lock timed out in queue " + e));
      }, S));
    }
    var A = i.maxOccupationTime || m.maxOccupationTime;
    if (A && (l = setTimeout(function() {
      m.queues[e] && g(!1, new Error("Maximum occupation time is exceeded in queue " + e));
    }, A)), s)
      return s;
  }, t.prototype._acquireBatch = function(e, r, n, i) {
    typeof n != "function" && (i = n, n = null);
    var a = this, o = function(c, f) {
      return function(l) {
        a.acquire(c, f, l, i);
      };
    }, s = e.reduceRight(function(c, f) {
      return o(f, c);
    }, r);
    if (typeof n == "function")
      s(n);
    else
      return new this.Promise(function(c, f) {
        s.length === 1 ? s(function(l, w) {
          l ? f(l) : c(w);
        }) : c(s());
      });
  }, t.prototype.isBusy = function(e) {
    return e ? !!this.queues[e] : Object.keys(this.queues).length > 0;
  }, t.prototype._promiseTry = function(e) {
    try {
      return this.Promise.resolve(e());
    } catch (r) {
      return this.Promise.reject(r);
    }
  }, si = t, si;
}
var ci, Po;
function _f() {
  return Po || (Po = 1, ci = vf()), ci;
}
var bf = _f(), tn = /* @__PURE__ */ rr(bf), Dn = { exports: {} }, No;
function Ef() {
  return No || (No = 1, typeof Object.create == "function" ? Dn.exports = function(e, r) {
    r && (e.super_ = r, e.prototype = Object.create(r.prototype, {
      constructor: {
        value: e,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : Dn.exports = function(e, r) {
    if (r) {
      e.super_ = r;
      var n = function() {
      };
      n.prototype = r.prototype, e.prototype = new n(), e.prototype.constructor = e;
    }
  }), Dn.exports;
}
var On = { exports: {} }, li = {}, Mo;
function Sf() {
  return Mo || (Mo = 1, function(t) {
    Object.defineProperties(t, { __esModule: { value: !0 }, [Symbol.toStringTag]: { value: "Module" } });
    var e = {}, r = {};
    r.byteLength = l, r.toByteArray = m, r.fromByteArray = T;
    for (var n = [], i = [], a = typeof Uint8Array < "u" ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, c = o.length; s < c; ++s)
      n[s] = o[s], i[o.charCodeAt(s)] = s;
    i[45] = 62, i[95] = 63;
    function f(A) {
      var B = A.length;
      if (B % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      var N = A.indexOf("=");
      N === -1 && (N = B);
      var U = N === B ? 0 : 4 - N % 4;
      return [N, U];
    }
    function l(A) {
      var B = f(A), N = B[0], U = B[1];
      return (N + U) * 3 / 4 - U;
    }
    function w(A, B, N) {
      return (B + N) * 3 / 4 - N;
    }
    function m(A) {
      var B, N = f(A), U = N[0], M = N[1], $ = new a(w(A, U, M)), O = 0, W = M > 0 ? U - 4 : U, z;
      for (z = 0; z < W; z += 4)
        B = i[A.charCodeAt(z)] << 18 | i[A.charCodeAt(z + 1)] << 12 | i[A.charCodeAt(z + 2)] << 6 | i[A.charCodeAt(z + 3)], $[O++] = B >> 16 & 255, $[O++] = B >> 8 & 255, $[O++] = B & 255;
      return M === 2 && (B = i[A.charCodeAt(z)] << 2 | i[A.charCodeAt(z + 1)] >> 4, $[O++] = B & 255), M === 1 && (B = i[A.charCodeAt(z)] << 10 | i[A.charCodeAt(z + 1)] << 4 | i[A.charCodeAt(z + 2)] >> 2, $[O++] = B >> 8 & 255, $[O++] = B & 255), $;
    }
    function g(A) {
      return n[A >> 18 & 63] + n[A >> 12 & 63] + n[A >> 6 & 63] + n[A & 63];
    }
    function b(A, B, N) {
      for (var U, M = [], $ = B; $ < N; $ += 3)
        U = (A[$] << 16 & 16711680) + (A[$ + 1] << 8 & 65280) + (A[$ + 2] & 255), M.push(g(U));
      return M.join("");
    }
    function T(A) {
      for (var B, N = A.length, U = N % 3, M = [], $ = 16383, O = 0, W = N - U; O < W; O += $)
        M.push(b(A, O, O + $ > W ? W : O + $));
      return U === 1 ? (B = A[N - 1], M.push(
        n[B >> 2] + n[B << 4 & 63] + "=="
      )) : U === 2 && (B = (A[N - 2] << 8) + A[N - 1], M.push(
        n[B >> 10] + n[B >> 4 & 63] + n[B << 2 & 63] + "="
      )), M.join("");
    }
    var R = {};
    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    R.read = function(A, B, N, U, M) {
      var $, O, W = M * 8 - U - 1, z = (1 << W) - 1, K = z >> 1, F = -7, Q = N ? M - 1 : 0, se = N ? -1 : 1, ve = A[B + Q];
      for (Q += se, $ = ve & (1 << -F) - 1, ve >>= -F, F += W; F > 0; $ = $ * 256 + A[B + Q], Q += se, F -= 8)
        ;
      for (O = $ & (1 << -F) - 1, $ >>= -F, F += U; F > 0; O = O * 256 + A[B + Q], Q += se, F -= 8)
        ;
      if ($ === 0)
        $ = 1 - K;
      else {
        if ($ === z)
          return O ? NaN : (ve ? -1 : 1) * (1 / 0);
        O = O + Math.pow(2, U), $ = $ - K;
      }
      return (ve ? -1 : 1) * O * Math.pow(2, $ - U);
    }, R.write = function(A, B, N, U, M, $) {
      var O, W, z, K = $ * 8 - M - 1, F = (1 << K) - 1, Q = F >> 1, se = M === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, ve = U ? 0 : $ - 1, ie = U ? 1 : -1, Y = B < 0 || B === 0 && 1 / B < 0 ? 1 : 0;
      for (B = Math.abs(B), isNaN(B) || B === 1 / 0 ? (W = isNaN(B) ? 1 : 0, O = F) : (O = Math.floor(Math.log(B) / Math.LN2), B * (z = Math.pow(2, -O)) < 1 && (O--, z *= 2), O + Q >= 1 ? B += se / z : B += se * Math.pow(2, 1 - Q), B * z >= 2 && (O++, z /= 2), O + Q >= F ? (W = 0, O = F) : O + Q >= 1 ? (W = (B * z - 1) * Math.pow(2, M), O = O + Q) : (W = B * Math.pow(2, Q - 1) * Math.pow(2, M), O = 0)); M >= 8; A[N + ve] = W & 255, ve += ie, W /= 256, M -= 8)
        ;
      for (O = O << M | W, K += M; K > 0; A[N + ve] = O & 255, ve += ie, O /= 256, K -= 8)
        ;
      A[N + ve - ie] |= Y * 128;
    };
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */
    (function(A) {
      const B = r, N = R, U = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
      A.Buffer = F, A.SlowBuffer = Te, A.INSPECT_MAX_BYTES = 50;
      const M = 2147483647;
      A.kMaxLength = M;
      const { Uint8Array: $, ArrayBuffer: O, SharedArrayBuffer: W } = globalThis;
      F.TYPED_ARRAY_SUPPORT = z(), !F.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
      function z() {
        try {
          const v = new $(1), p = { foo: function() {
            return 42;
          } };
          return Object.setPrototypeOf(p, $.prototype), Object.setPrototypeOf(v, p), v.foo() === 42;
        } catch {
          return !1;
        }
      }
      Object.defineProperty(F.prototype, "parent", {
        enumerable: !0,
        get: function() {
          if (F.isBuffer(this))
            return this.buffer;
        }
      }), Object.defineProperty(F.prototype, "offset", {
        enumerable: !0,
        get: function() {
          if (F.isBuffer(this))
            return this.byteOffset;
        }
      });
      function K(v) {
        if (v > M)
          throw new RangeError('The value "' + v + '" is invalid for option "size"');
        const p = new $(v);
        return Object.setPrototypeOf(p, F.prototype), p;
      }
      function F(v, p, y) {
        if (typeof v == "number") {
          if (typeof p == "string")
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          return ie(v);
        }
        return Q(v, p, y);
      }
      F.poolSize = 8192;
      function Q(v, p, y) {
        if (typeof v == "string")
          return Y(v, p);
        if (O.isView(v))
          return de(v);
        if (v == null)
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof v
          );
        if (x(v, O) || v && x(v.buffer, O) || typeof W < "u" && (x(v, W) || v && x(v.buffer, W)))
          return Ae(v, p, y);
        if (typeof v == "number")
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        const D = v.valueOf && v.valueOf();
        if (D != null && D !== v)
          return F.from(D, p, y);
        const j = Ie(v);
        if (j) return j;
        if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof v[Symbol.toPrimitive] == "function")
          return F.from(v[Symbol.toPrimitive]("string"), p, y);
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof v
        );
      }
      F.from = function(v, p, y) {
        return Q(v, p, y);
      }, Object.setPrototypeOf(F.prototype, $.prototype), Object.setPrototypeOf(F, $);
      function se(v) {
        if (typeof v != "number")
          throw new TypeError('"size" argument must be of type number');
        if (v < 0)
          throw new RangeError('The value "' + v + '" is invalid for option "size"');
      }
      function ve(v, p, y) {
        return se(v), v <= 0 ? K(v) : p !== void 0 ? typeof y == "string" ? K(v).fill(p, y) : K(v).fill(p) : K(v);
      }
      F.alloc = function(v, p, y) {
        return ve(v, p, y);
      };
      function ie(v) {
        return se(v), K(v < 0 ? 0 : _e(v) | 0);
      }
      F.allocUnsafe = function(v) {
        return ie(v);
      }, F.allocUnsafeSlow = function(v) {
        return ie(v);
      };
      function Y(v, p) {
        if ((typeof p != "string" || p === "") && (p = "utf8"), !F.isEncoding(p))
          throw new TypeError("Unknown encoding: " + p);
        const y = ge(v, p) | 0;
        let D = K(y);
        const j = D.write(v, p);
        return j !== y && (D = D.slice(0, j)), D;
      }
      function ae(v) {
        const p = v.length < 0 ? 0 : _e(v.length) | 0, y = K(p);
        for (let D = 0; D < p; D += 1)
          y[D] = v[D] & 255;
        return y;
      }
      function de(v) {
        if (x(v, $)) {
          const p = new $(v);
          return Ae(p.buffer, p.byteOffset, p.byteLength);
        }
        return ae(v);
      }
      function Ae(v, p, y) {
        if (p < 0 || v.byteLength < p)
          throw new RangeError('"offset" is outside of buffer bounds');
        if (v.byteLength < p + (y || 0))
          throw new RangeError('"length" is outside of buffer bounds');
        let D;
        return p === void 0 && y === void 0 ? D = new $(v) : y === void 0 ? D = new $(v, p) : D = new $(v, p, y), Object.setPrototypeOf(D, F.prototype), D;
      }
      function Ie(v) {
        if (F.isBuffer(v)) {
          const p = _e(v.length) | 0, y = K(p);
          return y.length === 0 || v.copy(y, 0, 0, p), y;
        }
        if (v.length !== void 0)
          return typeof v.length != "number" || L(v.length) ? K(0) : ae(v);
        if (v.type === "Buffer" && Array.isArray(v.data))
          return ae(v.data);
      }
      function _e(v) {
        if (v >= M)
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + M.toString(16) + " bytes");
        return v | 0;
      }
      function Te(v) {
        return +v != v && (v = 0), F.alloc(+v);
      }
      F.isBuffer = function(p) {
        return p != null && p._isBuffer === !0 && p !== F.prototype;
      }, F.compare = function(p, y) {
        if (x(p, $) && (p = F.from(p, p.offset, p.byteLength)), x(y, $) && (y = F.from(y, y.offset, y.byteLength)), !F.isBuffer(p) || !F.isBuffer(y))
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        if (p === y) return 0;
        let D = p.length, j = y.length;
        for (let G = 0, J = Math.min(D, j); G < J; ++G)
          if (p[G] !== y[G]) {
            D = p[G], j = y[G];
            break;
          }
        return D < j ? -1 : j < D ? 1 : 0;
      }, F.isEncoding = function(p) {
        switch (String(p).toLowerCase()) {
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
      }, F.concat = function(p, y) {
        if (!Array.isArray(p))
          throw new TypeError('"list" argument must be an Array of Buffers');
        if (p.length === 0)
          return F.alloc(0);
        let D;
        if (y === void 0)
          for (y = 0, D = 0; D < p.length; ++D)
            y += p[D].length;
        const j = F.allocUnsafe(y);
        let G = 0;
        for (D = 0; D < p.length; ++D) {
          let J = p[D];
          if (x(J, $))
            G + J.length > j.length ? (F.isBuffer(J) || (J = F.from(J)), J.copy(j, G)) : $.prototype.set.call(
              j,
              J,
              G
            );
          else if (F.isBuffer(J))
            J.copy(j, G);
          else
            throw new TypeError('"list" argument must be an Array of Buffers');
          G += J.length;
        }
        return j;
      };
      function ge(v, p) {
        if (F.isBuffer(v))
          return v.length;
        if (O.isView(v) || x(v, O))
          return v.byteLength;
        if (typeof v != "string")
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof v
          );
        const y = v.length, D = arguments.length > 2 && arguments[2] === !0;
        if (!D && y === 0) return 0;
        let j = !1;
        for (; ; )
          switch (p) {
            case "ascii":
            case "latin1":
            case "binary":
              return y;
            case "utf8":
            case "utf-8":
              return ee(v).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return y * 2;
            case "hex":
              return y >>> 1;
            case "base64":
              return H(v).length;
            default:
              if (j)
                return D ? -1 : ee(v).length;
              p = ("" + p).toLowerCase(), j = !0;
          }
      }
      F.byteLength = ge;
      function $e(v, p, y) {
        let D = !1;
        if ((p === void 0 || p < 0) && (p = 0), p > this.length || ((y === void 0 || y > this.length) && (y = this.length), y <= 0) || (y >>>= 0, p >>>= 0, y <= p))
          return "";
        for (v || (v = "utf8"); ; )
          switch (v) {
            case "hex":
              return ct(this, p, y);
            case "utf8":
            case "utf-8":
              return je(this, p, y);
            case "ascii":
              return xe(this, p, y);
            case "latin1":
            case "binary":
              return rt(this, p, y);
            case "base64":
              return Le(this, p, y);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return et(this, p, y);
            default:
              if (D) throw new TypeError("Unknown encoding: " + v);
              v = (v + "").toLowerCase(), D = !0;
          }
      }
      F.prototype._isBuffer = !0;
      function ke(v, p, y) {
        const D = v[p];
        v[p] = v[y], v[y] = D;
      }
      F.prototype.swap16 = function() {
        const p = this.length;
        if (p % 2 !== 0)
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (let y = 0; y < p; y += 2)
          ke(this, y, y + 1);
        return this;
      }, F.prototype.swap32 = function() {
        const p = this.length;
        if (p % 4 !== 0)
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (let y = 0; y < p; y += 4)
          ke(this, y, y + 3), ke(this, y + 1, y + 2);
        return this;
      }, F.prototype.swap64 = function() {
        const p = this.length;
        if (p % 8 !== 0)
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (let y = 0; y < p; y += 8)
          ke(this, y, y + 7), ke(this, y + 1, y + 6), ke(this, y + 2, y + 5), ke(this, y + 3, y + 4);
        return this;
      }, F.prototype.toString = function() {
        const p = this.length;
        return p === 0 ? "" : arguments.length === 0 ? je(this, 0, p) : $e.apply(this, arguments);
      }, F.prototype.toLocaleString = F.prototype.toString, F.prototype.equals = function(p) {
        if (!F.isBuffer(p)) throw new TypeError("Argument must be a Buffer");
        return this === p ? !0 : F.compare(this, p) === 0;
      }, F.prototype.inspect = function() {
        let p = "";
        const y = A.INSPECT_MAX_BYTES;
        return p = this.toString("hex", 0, y).replace(/(.{2})/g, "$1 ").trim(), this.length > y && (p += " ... "), "<Buffer " + p + ">";
      }, U && (F.prototype[U] = F.prototype.inspect), F.prototype.compare = function(p, y, D, j, G) {
        if (x(p, $) && (p = F.from(p, p.offset, p.byteLength)), !F.isBuffer(p))
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof p
          );
        if (y === void 0 && (y = 0), D === void 0 && (D = p ? p.length : 0), j === void 0 && (j = 0), G === void 0 && (G = this.length), y < 0 || D > p.length || j < 0 || G > this.length)
          throw new RangeError("out of range index");
        if (j >= G && y >= D)
          return 0;
        if (j >= G)
          return -1;
        if (y >= D)
          return 1;
        if (y >>>= 0, D >>>= 0, j >>>= 0, G >>>= 0, this === p) return 0;
        let J = G - j, Ee = D - y;
        const Ze = Math.min(J, Ee), We = this.slice(j, G), De = p.slice(y, D);
        for (let Ne = 0; Ne < Ze; ++Ne)
          if (We[Ne] !== De[Ne]) {
            J = We[Ne], Ee = De[Ne];
            break;
          }
        return J < Ee ? -1 : Ee < J ? 1 : 0;
      };
      function Se(v, p, y, D, j) {
        if (v.length === 0) return -1;
        if (typeof y == "string" ? (D = y, y = 0) : y > 2147483647 ? y = 2147483647 : y < -2147483648 && (y = -2147483648), y = +y, L(y) && (y = j ? 0 : v.length - 1), y < 0 && (y = v.length + y), y >= v.length) {
          if (j) return -1;
          y = v.length - 1;
        } else if (y < 0)
          if (j) y = 0;
          else return -1;
        if (typeof p == "string" && (p = F.from(p, D)), F.isBuffer(p))
          return p.length === 0 ? -1 : Pe(v, p, y, D, j);
        if (typeof p == "number")
          return p = p & 255, typeof $.prototype.indexOf == "function" ? j ? $.prototype.indexOf.call(v, p, y) : $.prototype.lastIndexOf.call(v, p, y) : Pe(v, [p], y, D, j);
        throw new TypeError("val must be string, number or Buffer");
      }
      function Pe(v, p, y, D, j) {
        let G = 1, J = v.length, Ee = p.length;
        if (D !== void 0 && (D = String(D).toLowerCase(), D === "ucs2" || D === "ucs-2" || D === "utf16le" || D === "utf-16le")) {
          if (v.length < 2 || p.length < 2)
            return -1;
          G = 2, J /= 2, Ee /= 2, y /= 2;
        }
        function Ze(De, Ne) {
          return G === 1 ? De[Ne] : De.readUInt16BE(Ne * G);
        }
        let We;
        if (j) {
          let De = -1;
          for (We = y; We < J; We++)
            if (Ze(v, We) === Ze(p, De === -1 ? 0 : We - De)) {
              if (De === -1 && (De = We), We - De + 1 === Ee) return De * G;
            } else
              De !== -1 && (We -= We - De), De = -1;
        } else
          for (y + Ee > J && (y = J - Ee), We = y; We >= 0; We--) {
            let De = !0;
            for (let Ne = 0; Ne < Ee; Ne++)
              if (Ze(v, We + Ne) !== Ze(p, Ne)) {
                De = !1;
                break;
              }
            if (De) return We;
          }
        return -1;
      }
      F.prototype.includes = function(p, y, D) {
        return this.indexOf(p, y, D) !== -1;
      }, F.prototype.indexOf = function(p, y, D) {
        return Se(this, p, y, D, !0);
      }, F.prototype.lastIndexOf = function(p, y, D) {
        return Se(this, p, y, D, !1);
      };
      function Ue(v, p, y, D) {
        y = Number(y) || 0;
        const j = v.length - y;
        D ? (D = Number(D), D > j && (D = j)) : D = j;
        const G = p.length;
        D > G / 2 && (D = G / 2);
        let J;
        for (J = 0; J < D; ++J) {
          const Ee = parseInt(p.substr(J * 2, 2), 16);
          if (L(Ee)) return J;
          v[y + J] = Ee;
        }
        return J;
      }
      function Be(v, p, y, D) {
        return X(ee(p, v.length - y), v, y, D);
      }
      function Re(v, p, y, D) {
        return X(ue(p), v, y, D);
      }
      function le(v, p, y, D) {
        return X(H(p), v, y, D);
      }
      function be(v, p, y, D) {
        return X(h(p, v.length - y), v, y, D);
      }
      F.prototype.write = function(p, y, D, j) {
        if (y === void 0)
          j = "utf8", D = this.length, y = 0;
        else if (D === void 0 && typeof y == "string")
          j = y, D = this.length, y = 0;
        else if (isFinite(y))
          y = y >>> 0, isFinite(D) ? (D = D >>> 0, j === void 0 && (j = "utf8")) : (j = D, D = void 0);
        else
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        const G = this.length - y;
        if ((D === void 0 || D > G) && (D = G), p.length > 0 && (D < 0 || y < 0) || y > this.length)
          throw new RangeError("Attempt to write outside buffer bounds");
        j || (j = "utf8");
        let J = !1;
        for (; ; )
          switch (j) {
            case "hex":
              return Ue(this, p, y, D);
            case "utf8":
            case "utf-8":
              return Be(this, p, y, D);
            case "ascii":
            case "latin1":
            case "binary":
              return Re(this, p, y, D);
            case "base64":
              return le(this, p, y, D);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return be(this, p, y, D);
            default:
              if (J) throw new TypeError("Unknown encoding: " + j);
              j = ("" + j).toLowerCase(), J = !0;
          }
      }, F.prototype.toJSON = function() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function Le(v, p, y) {
        return p === 0 && y === v.length ? B.fromByteArray(v) : B.fromByteArray(v.slice(p, y));
      }
      function je(v, p, y) {
        y = Math.min(v.length, y);
        const D = [];
        let j = p;
        for (; j < y; ) {
          const G = v[j];
          let J = null, Ee = G > 239 ? 4 : G > 223 ? 3 : G > 191 ? 2 : 1;
          if (j + Ee <= y) {
            let Ze, We, De, Ne;
            switch (Ee) {
              case 1:
                G < 128 && (J = G);
                break;
              case 2:
                Ze = v[j + 1], (Ze & 192) === 128 && (Ne = (G & 31) << 6 | Ze & 63, Ne > 127 && (J = Ne));
                break;
              case 3:
                Ze = v[j + 1], We = v[j + 2], (Ze & 192) === 128 && (We & 192) === 128 && (Ne = (G & 15) << 12 | (Ze & 63) << 6 | We & 63, Ne > 2047 && (Ne < 55296 || Ne > 57343) && (J = Ne));
                break;
              case 4:
                Ze = v[j + 1], We = v[j + 2], De = v[j + 3], (Ze & 192) === 128 && (We & 192) === 128 && (De & 192) === 128 && (Ne = (G & 15) << 18 | (Ze & 63) << 12 | (We & 63) << 6 | De & 63, Ne > 65535 && Ne < 1114112 && (J = Ne));
            }
          }
          J === null ? (J = 65533, Ee = 1) : J > 65535 && (J -= 65536, D.push(J >>> 10 & 1023 | 55296), J = 56320 | J & 1023), D.push(J), j += Ee;
        }
        return Fe(D);
      }
      const Ce = 4096;
      function Fe(v) {
        const p = v.length;
        if (p <= Ce)
          return String.fromCharCode.apply(String, v);
        let y = "", D = 0;
        for (; D < p; )
          y += String.fromCharCode.apply(
            String,
            v.slice(D, D += Ce)
          );
        return y;
      }
      function xe(v, p, y) {
        let D = "";
        y = Math.min(v.length, y);
        for (let j = p; j < y; ++j)
          D += String.fromCharCode(v[j] & 127);
        return D;
      }
      function rt(v, p, y) {
        let D = "";
        y = Math.min(v.length, y);
        for (let j = p; j < y; ++j)
          D += String.fromCharCode(v[j]);
        return D;
      }
      function ct(v, p, y) {
        const D = v.length;
        (!p || p < 0) && (p = 0), (!y || y < 0 || y > D) && (y = D);
        let j = "";
        for (let G = p; G < y; ++G)
          j += V[v[G]];
        return j;
      }
      function et(v, p, y) {
        const D = v.slice(p, y);
        let j = "";
        for (let G = 0; G < D.length - 1; G += 2)
          j += String.fromCharCode(D[G] + D[G + 1] * 256);
        return j;
      }
      F.prototype.slice = function(p, y) {
        const D = this.length;
        p = ~~p, y = y === void 0 ? D : ~~y, p < 0 ? (p += D, p < 0 && (p = 0)) : p > D && (p = D), y < 0 ? (y += D, y < 0 && (y = 0)) : y > D && (y = D), y < p && (y = p);
        const j = this.subarray(p, y);
        return Object.setPrototypeOf(j, F.prototype), j;
      };
      function Me(v, p, y) {
        if (v % 1 !== 0 || v < 0) throw new RangeError("offset is not uint");
        if (v + p > y) throw new RangeError("Trying to access beyond buffer length");
      }
      F.prototype.readUintLE = F.prototype.readUIntLE = function(p, y, D) {
        p = p >>> 0, y = y >>> 0, D || Me(p, y, this.length);
        let j = this[p], G = 1, J = 0;
        for (; ++J < y && (G *= 256); )
          j += this[p + J] * G;
        return j;
      }, F.prototype.readUintBE = F.prototype.readUIntBE = function(p, y, D) {
        p = p >>> 0, y = y >>> 0, D || Me(p, y, this.length);
        let j = this[p + --y], G = 1;
        for (; y > 0 && (G *= 256); )
          j += this[p + --y] * G;
        return j;
      }, F.prototype.readUint8 = F.prototype.readUInt8 = function(p, y) {
        return p = p >>> 0, y || Me(p, 1, this.length), this[p];
      }, F.prototype.readUint16LE = F.prototype.readUInt16LE = function(p, y) {
        return p = p >>> 0, y || Me(p, 2, this.length), this[p] | this[p + 1] << 8;
      }, F.prototype.readUint16BE = F.prototype.readUInt16BE = function(p, y) {
        return p = p >>> 0, y || Me(p, 2, this.length), this[p] << 8 | this[p + 1];
      }, F.prototype.readUint32LE = F.prototype.readUInt32LE = function(p, y) {
        return p = p >>> 0, y || Me(p, 4, this.length), (this[p] | this[p + 1] << 8 | this[p + 2] << 16) + this[p + 3] * 16777216;
      }, F.prototype.readUint32BE = F.prototype.readUInt32BE = function(p, y) {
        return p = p >>> 0, y || Me(p, 4, this.length), this[p] * 16777216 + (this[p + 1] << 16 | this[p + 2] << 8 | this[p + 3]);
      }, F.prototype.readBigUInt64LE = pe(function(p) {
        p = p >>> 0, C(p, "offset");
        const y = this[p], D = this[p + 7];
        (y === void 0 || D === void 0) && I(p, this.length - 8);
        const j = y + this[++p] * 2 ** 8 + this[++p] * 2 ** 16 + this[++p] * 2 ** 24, G = this[++p] + this[++p] * 2 ** 8 + this[++p] * 2 ** 16 + D * 2 ** 24;
        return BigInt(j) + (BigInt(G) << BigInt(32));
      }), F.prototype.readBigUInt64BE = pe(function(p) {
        p = p >>> 0, C(p, "offset");
        const y = this[p], D = this[p + 7];
        (y === void 0 || D === void 0) && I(p, this.length - 8);
        const j = y * 2 ** 24 + this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + this[++p], G = this[++p] * 2 ** 24 + this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + D;
        return (BigInt(j) << BigInt(32)) + BigInt(G);
      }), F.prototype.readIntLE = function(p, y, D) {
        p = p >>> 0, y = y >>> 0, D || Me(p, y, this.length);
        let j = this[p], G = 1, J = 0;
        for (; ++J < y && (G *= 256); )
          j += this[p + J] * G;
        return G *= 128, j >= G && (j -= Math.pow(2, 8 * y)), j;
      }, F.prototype.readIntBE = function(p, y, D) {
        p = p >>> 0, y = y >>> 0, D || Me(p, y, this.length);
        let j = y, G = 1, J = this[p + --j];
        for (; j > 0 && (G *= 256); )
          J += this[p + --j] * G;
        return G *= 128, J >= G && (J -= Math.pow(2, 8 * y)), J;
      }, F.prototype.readInt8 = function(p, y) {
        return p = p >>> 0, y || Me(p, 1, this.length), this[p] & 128 ? (255 - this[p] + 1) * -1 : this[p];
      }, F.prototype.readInt16LE = function(p, y) {
        p = p >>> 0, y || Me(p, 2, this.length);
        const D = this[p] | this[p + 1] << 8;
        return D & 32768 ? D | 4294901760 : D;
      }, F.prototype.readInt16BE = function(p, y) {
        p = p >>> 0, y || Me(p, 2, this.length);
        const D = this[p + 1] | this[p] << 8;
        return D & 32768 ? D | 4294901760 : D;
      }, F.prototype.readInt32LE = function(p, y) {
        return p = p >>> 0, y || Me(p, 4, this.length), this[p] | this[p + 1] << 8 | this[p + 2] << 16 | this[p + 3] << 24;
      }, F.prototype.readInt32BE = function(p, y) {
        return p = p >>> 0, y || Me(p, 4, this.length), this[p] << 24 | this[p + 1] << 16 | this[p + 2] << 8 | this[p + 3];
      }, F.prototype.readBigInt64LE = pe(function(p) {
        p = p >>> 0, C(p, "offset");
        const y = this[p], D = this[p + 7];
        (y === void 0 || D === void 0) && I(p, this.length - 8);
        const j = this[p + 4] + this[p + 5] * 2 ** 8 + this[p + 6] * 2 ** 16 + (D << 24);
        return (BigInt(j) << BigInt(32)) + BigInt(y + this[++p] * 2 ** 8 + this[++p] * 2 ** 16 + this[++p] * 2 ** 24);
      }), F.prototype.readBigInt64BE = pe(function(p) {
        p = p >>> 0, C(p, "offset");
        const y = this[p], D = this[p + 7];
        (y === void 0 || D === void 0) && I(p, this.length - 8);
        const j = (y << 24) + // Overflow
        this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + this[++p];
        return (BigInt(j) << BigInt(32)) + BigInt(this[++p] * 2 ** 24 + this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + D);
      }), F.prototype.readFloatLE = function(p, y) {
        return p = p >>> 0, y || Me(p, 4, this.length), N.read(this, p, !0, 23, 4);
      }, F.prototype.readFloatBE = function(p, y) {
        return p = p >>> 0, y || Me(p, 4, this.length), N.read(this, p, !1, 23, 4);
      }, F.prototype.readDoubleLE = function(p, y) {
        return p = p >>> 0, y || Me(p, 8, this.length), N.read(this, p, !0, 52, 8);
      }, F.prototype.readDoubleBE = function(p, y) {
        return p = p >>> 0, y || Me(p, 8, this.length), N.read(this, p, !1, 52, 8);
      };
      function qe(v, p, y, D, j, G) {
        if (!F.isBuffer(v)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (p > j || p < G) throw new RangeError('"value" argument is out of bounds');
        if (y + D > v.length) throw new RangeError("Index out of range");
      }
      F.prototype.writeUintLE = F.prototype.writeUIntLE = function(p, y, D, j) {
        if (p = +p, y = y >>> 0, D = D >>> 0, !j) {
          const Ee = Math.pow(2, 8 * D) - 1;
          qe(this, p, y, D, Ee, 0);
        }
        let G = 1, J = 0;
        for (this[y] = p & 255; ++J < D && (G *= 256); )
          this[y + J] = p / G & 255;
        return y + D;
      }, F.prototype.writeUintBE = F.prototype.writeUIntBE = function(p, y, D, j) {
        if (p = +p, y = y >>> 0, D = D >>> 0, !j) {
          const Ee = Math.pow(2, 8 * D) - 1;
          qe(this, p, y, D, Ee, 0);
        }
        let G = D - 1, J = 1;
        for (this[y + G] = p & 255; --G >= 0 && (J *= 256); )
          this[y + G] = p / J & 255;
        return y + D;
      }, F.prototype.writeUint8 = F.prototype.writeUInt8 = function(p, y, D) {
        return p = +p, y = y >>> 0, D || qe(this, p, y, 1, 255, 0), this[y] = p & 255, y + 1;
      }, F.prototype.writeUint16LE = F.prototype.writeUInt16LE = function(p, y, D) {
        return p = +p, y = y >>> 0, D || qe(this, p, y, 2, 65535, 0), this[y] = p & 255, this[y + 1] = p >>> 8, y + 2;
      }, F.prototype.writeUint16BE = F.prototype.writeUInt16BE = function(p, y, D) {
        return p = +p, y = y >>> 0, D || qe(this, p, y, 2, 65535, 0), this[y] = p >>> 8, this[y + 1] = p & 255, y + 2;
      }, F.prototype.writeUint32LE = F.prototype.writeUInt32LE = function(p, y, D) {
        return p = +p, y = y >>> 0, D || qe(this, p, y, 4, 4294967295, 0), this[y + 3] = p >>> 24, this[y + 2] = p >>> 16, this[y + 1] = p >>> 8, this[y] = p & 255, y + 4;
      }, F.prototype.writeUint32BE = F.prototype.writeUInt32BE = function(p, y, D) {
        return p = +p, y = y >>> 0, D || qe(this, p, y, 4, 4294967295, 0), this[y] = p >>> 24, this[y + 1] = p >>> 16, this[y + 2] = p >>> 8, this[y + 3] = p & 255, y + 4;
      };
      function nt(v, p, y, D, j) {
        E(p, D, j, v, y, 7);
        let G = Number(p & BigInt(4294967295));
        v[y++] = G, G = G >> 8, v[y++] = G, G = G >> 8, v[y++] = G, G = G >> 8, v[y++] = G;
        let J = Number(p >> BigInt(32) & BigInt(4294967295));
        return v[y++] = J, J = J >> 8, v[y++] = J, J = J >> 8, v[y++] = J, J = J >> 8, v[y++] = J, y;
      }
      function Xe(v, p, y, D, j) {
        E(p, D, j, v, y, 7);
        let G = Number(p & BigInt(4294967295));
        v[y + 7] = G, G = G >> 8, v[y + 6] = G, G = G >> 8, v[y + 5] = G, G = G >> 8, v[y + 4] = G;
        let J = Number(p >> BigInt(32) & BigInt(4294967295));
        return v[y + 3] = J, J = J >> 8, v[y + 2] = J, J = J >> 8, v[y + 1] = J, J = J >> 8, v[y] = J, y + 8;
      }
      F.prototype.writeBigUInt64LE = pe(function(p, y = 0) {
        return nt(this, p, y, BigInt(0), BigInt("0xffffffffffffffff"));
      }), F.prototype.writeBigUInt64BE = pe(function(p, y = 0) {
        return Xe(this, p, y, BigInt(0), BigInt("0xffffffffffffffff"));
      }), F.prototype.writeIntLE = function(p, y, D, j) {
        if (p = +p, y = y >>> 0, !j) {
          const Ze = Math.pow(2, 8 * D - 1);
          qe(this, p, y, D, Ze - 1, -Ze);
        }
        let G = 0, J = 1, Ee = 0;
        for (this[y] = p & 255; ++G < D && (J *= 256); )
          p < 0 && Ee === 0 && this[y + G - 1] !== 0 && (Ee = 1), this[y + G] = (p / J >> 0) - Ee & 255;
        return y + D;
      }, F.prototype.writeIntBE = function(p, y, D, j) {
        if (p = +p, y = y >>> 0, !j) {
          const Ze = Math.pow(2, 8 * D - 1);
          qe(this, p, y, D, Ze - 1, -Ze);
        }
        let G = D - 1, J = 1, Ee = 0;
        for (this[y + G] = p & 255; --G >= 0 && (J *= 256); )
          p < 0 && Ee === 0 && this[y + G + 1] !== 0 && (Ee = 1), this[y + G] = (p / J >> 0) - Ee & 255;
        return y + D;
      }, F.prototype.writeInt8 = function(p, y, D) {
        return p = +p, y = y >>> 0, D || qe(this, p, y, 1, 127, -128), p < 0 && (p = 255 + p + 1), this[y] = p & 255, y + 1;
      }, F.prototype.writeInt16LE = function(p, y, D) {
        return p = +p, y = y >>> 0, D || qe(this, p, y, 2, 32767, -32768), this[y] = p & 255, this[y + 1] = p >>> 8, y + 2;
      }, F.prototype.writeInt16BE = function(p, y, D) {
        return p = +p, y = y >>> 0, D || qe(this, p, y, 2, 32767, -32768), this[y] = p >>> 8, this[y + 1] = p & 255, y + 2;
      }, F.prototype.writeInt32LE = function(p, y, D) {
        return p = +p, y = y >>> 0, D || qe(this, p, y, 4, 2147483647, -2147483648), this[y] = p & 255, this[y + 1] = p >>> 8, this[y + 2] = p >>> 16, this[y + 3] = p >>> 24, y + 4;
      }, F.prototype.writeInt32BE = function(p, y, D) {
        return p = +p, y = y >>> 0, D || qe(this, p, y, 4, 2147483647, -2147483648), p < 0 && (p = 4294967295 + p + 1), this[y] = p >>> 24, this[y + 1] = p >>> 16, this[y + 2] = p >>> 8, this[y + 3] = p & 255, y + 4;
      }, F.prototype.writeBigInt64LE = pe(function(p, y = 0) {
        return nt(this, p, y, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      }), F.prototype.writeBigInt64BE = pe(function(p, y = 0) {
        return Xe(this, p, y, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function St(v, p, y, D, j, G) {
        if (y + D > v.length) throw new RangeError("Index out of range");
        if (y < 0) throw new RangeError("Index out of range");
      }
      function kt(v, p, y, D, j) {
        return p = +p, y = y >>> 0, j || St(v, p, y, 4), N.write(v, p, y, D, 23, 4), y + 4;
      }
      F.prototype.writeFloatLE = function(p, y, D) {
        return kt(this, p, y, !0, D);
      }, F.prototype.writeFloatBE = function(p, y, D) {
        return kt(this, p, y, !1, D);
      };
      function He(v, p, y, D, j) {
        return p = +p, y = y >>> 0, j || St(v, p, y, 8), N.write(v, p, y, D, 52, 8), y + 8;
      }
      F.prototype.writeDoubleLE = function(p, y, D) {
        return He(this, p, y, !0, D);
      }, F.prototype.writeDoubleBE = function(p, y, D) {
        return He(this, p, y, !1, D);
      }, F.prototype.copy = function(p, y, D, j) {
        if (!F.isBuffer(p)) throw new TypeError("argument should be a Buffer");
        if (D || (D = 0), !j && j !== 0 && (j = this.length), y >= p.length && (y = p.length), y || (y = 0), j > 0 && j < D && (j = D), j === D || p.length === 0 || this.length === 0) return 0;
        if (y < 0)
          throw new RangeError("targetStart out of bounds");
        if (D < 0 || D >= this.length) throw new RangeError("Index out of range");
        if (j < 0) throw new RangeError("sourceEnd out of bounds");
        j > this.length && (j = this.length), p.length - y < j - D && (j = p.length - y + D);
        const G = j - D;
        return this === p && typeof $.prototype.copyWithin == "function" ? this.copyWithin(y, D, j) : $.prototype.set.call(
          p,
          this.subarray(D, j),
          y
        ), G;
      }, F.prototype.fill = function(p, y, D, j) {
        if (typeof p == "string") {
          if (typeof y == "string" ? (j = y, y = 0, D = this.length) : typeof D == "string" && (j = D, D = this.length), j !== void 0 && typeof j != "string")
            throw new TypeError("encoding must be a string");
          if (typeof j == "string" && !F.isEncoding(j))
            throw new TypeError("Unknown encoding: " + j);
          if (p.length === 1) {
            const J = p.charCodeAt(0);
            (j === "utf8" && J < 128 || j === "latin1") && (p = J);
          }
        } else typeof p == "number" ? p = p & 255 : typeof p == "boolean" && (p = Number(p));
        if (y < 0 || this.length < y || this.length < D)
          throw new RangeError("Out of range index");
        if (D <= y)
          return this;
        y = y >>> 0, D = D === void 0 ? this.length : D >>> 0, p || (p = 0);
        let G;
        if (typeof p == "number")
          for (G = y; G < D; ++G)
            this[G] = p;
        else {
          const J = F.isBuffer(p) ? p : F.from(p, j), Ee = J.length;
          if (Ee === 0)
            throw new TypeError('The value "' + p + '" is invalid for argument "value"');
          for (G = 0; G < D - y; ++G)
            this[G + y] = J[G % Ee];
        }
        return this;
      };
      const st = {};
      function k(v, p, y) {
        st[v] = class extends y {
          constructor() {
            super(), Object.defineProperty(this, "message", {
              value: p.apply(this, arguments),
              writable: !0,
              configurable: !0
            }), this.name = `${this.name} [${v}]`, this.stack, delete this.name;
          }
          get code() {
            return v;
          }
          set code(j) {
            Object.defineProperty(this, "code", {
              configurable: !0,
              enumerable: !0,
              value: j,
              writable: !0
            });
          }
          toString() {
            return `${this.name} [${v}]: ${this.message}`;
          }
        };
      }
      k(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(v) {
          return v ? `${v} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
        },
        RangeError
      ), k(
        "ERR_INVALID_ARG_TYPE",
        function(v, p) {
          return `The "${v}" argument must be of type number. Received type ${typeof p}`;
        },
        TypeError
      ), k(
        "ERR_OUT_OF_RANGE",
        function(v, p, y) {
          let D = `The value of "${v}" is out of range.`, j = y;
          return Number.isInteger(y) && Math.abs(y) > 2 ** 32 ? j = u(String(y)) : typeof y == "bigint" && (j = String(y), (y > BigInt(2) ** BigInt(32) || y < -(BigInt(2) ** BigInt(32))) && (j = u(j)), j += "n"), D += ` It must be ${p}. Received ${j}`, D;
        },
        RangeError
      );
      function u(v) {
        let p = "", y = v.length;
        const D = v[0] === "-" ? 1 : 0;
        for (; y >= D + 4; y -= 3)
          p = `_${v.slice(y - 3, y)}${p}`;
        return `${v.slice(0, y)}${p}`;
      }
      function d(v, p, y) {
        C(p, "offset"), (v[p] === void 0 || v[p + y] === void 0) && I(p, v.length - (y + 1));
      }
      function E(v, p, y, D, j, G) {
        if (v > y || v < p) {
          const J = typeof p == "bigint" ? "n" : "";
          let Ee;
          throw p === 0 || p === BigInt(0) ? Ee = `>= 0${J} and < 2${J} ** ${(G + 1) * 8}${J}` : Ee = `>= -(2${J} ** ${(G + 1) * 8 - 1}${J}) and < 2 ** ${(G + 1) * 8 - 1}${J}`, new st.ERR_OUT_OF_RANGE("value", Ee, v);
        }
        d(D, j, G);
      }
      function C(v, p) {
        if (typeof v != "number")
          throw new st.ERR_INVALID_ARG_TYPE(p, "number", v);
      }
      function I(v, p, y) {
        throw Math.floor(v) !== v ? (C(v, y), new st.ERR_OUT_OF_RANGE("offset", "an integer", v)) : p < 0 ? new st.ERR_BUFFER_OUT_OF_BOUNDS() : new st.ERR_OUT_OF_RANGE(
          "offset",
          `>= 0 and <= ${p}`,
          v
        );
      }
      const P = /[^+/0-9A-Za-z-_]/g;
      function _(v) {
        if (v = v.split("=")[0], v = v.trim().replace(P, ""), v.length < 2) return "";
        for (; v.length % 4 !== 0; )
          v = v + "=";
        return v;
      }
      function ee(v, p) {
        p = p || 1 / 0;
        let y;
        const D = v.length;
        let j = null;
        const G = [];
        for (let J = 0; J < D; ++J) {
          if (y = v.charCodeAt(J), y > 55295 && y < 57344) {
            if (!j) {
              if (y > 56319) {
                (p -= 3) > -1 && G.push(239, 191, 189);
                continue;
              } else if (J + 1 === D) {
                (p -= 3) > -1 && G.push(239, 191, 189);
                continue;
              }
              j = y;
              continue;
            }
            if (y < 56320) {
              (p -= 3) > -1 && G.push(239, 191, 189), j = y;
              continue;
            }
            y = (j - 55296 << 10 | y - 56320) + 65536;
          } else j && (p -= 3) > -1 && G.push(239, 191, 189);
          if (j = null, y < 128) {
            if ((p -= 1) < 0) break;
            G.push(y);
          } else if (y < 2048) {
            if ((p -= 2) < 0) break;
            G.push(
              y >> 6 | 192,
              y & 63 | 128
            );
          } else if (y < 65536) {
            if ((p -= 3) < 0) break;
            G.push(
              y >> 12 | 224,
              y >> 6 & 63 | 128,
              y & 63 | 128
            );
          } else if (y < 1114112) {
            if ((p -= 4) < 0) break;
            G.push(
              y >> 18 | 240,
              y >> 12 & 63 | 128,
              y >> 6 & 63 | 128,
              y & 63 | 128
            );
          } else
            throw new Error("Invalid code point");
        }
        return G;
      }
      function ue(v) {
        const p = [];
        for (let y = 0; y < v.length; ++y)
          p.push(v.charCodeAt(y) & 255);
        return p;
      }
      function h(v, p) {
        let y, D, j;
        const G = [];
        for (let J = 0; J < v.length && !((p -= 2) < 0); ++J)
          y = v.charCodeAt(J), D = y >> 8, j = y % 256, G.push(j), G.push(D);
        return G;
      }
      function H(v) {
        return B.toByteArray(_(v));
      }
      function X(v, p, y, D) {
        let j;
        for (j = 0; j < D && !(j + y >= p.length || j >= v.length); ++j)
          p[j + y] = v[j];
        return j;
      }
      function x(v, p) {
        return v instanceof p || v != null && v.constructor != null && v.constructor.name != null && v.constructor.name === p.name;
      }
      function L(v) {
        return v !== v;
      }
      const V = function() {
        const v = "0123456789abcdef", p = new Array(256);
        for (let y = 0; y < 16; ++y) {
          const D = y * 16;
          for (let j = 0; j < 16; ++j)
            p[D + j] = v[y] + v[j];
        }
        return p;
      }();
      function pe(v) {
        return typeof BigInt > "u" ? fe : v;
      }
      function fe() {
        throw new Error("BigInt not supported");
      }
    })(e);
    const S = e.Buffer;
    t.Blob = e.Blob, t.BlobOptions = e.BlobOptions, t.Buffer = e.Buffer, t.File = e.File, t.FileOptions = e.FileOptions, t.INSPECT_MAX_BYTES = e.INSPECT_MAX_BYTES, t.SlowBuffer = e.SlowBuffer, t.TranscodeEncoding = e.TranscodeEncoding, t.atob = e.atob, t.btoa = e.btoa, t.constants = e.constants, t.default = S, t.isAscii = e.isAscii, t.isUtf8 = e.isUtf8, t.kMaxLength = e.kMaxLength, t.kStringMaxLength = e.kStringMaxLength, t.resolveObjectURL = e.resolveObjectURL, t.transcode = e.transcode;
  }(li)), li;
}
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var Uo;
function po() {
  return Uo || (Uo = 1, function(t, e) {
    var r = Sf(), n = r.Buffer;
    function i(o, s) {
      for (var c in o)
        s[c] = o[c];
    }
    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? t.exports = r : (i(r, e), e.Buffer = a);
    function a(o, s, c) {
      return n(o, s, c);
    }
    a.prototype = Object.create(n.prototype), i(n, a), a.from = function(o, s, c) {
      if (typeof o == "number")
        throw new TypeError("Argument must not be a number");
      return n(o, s, c);
    }, a.alloc = function(o, s, c) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      var f = n(o);
      return s !== void 0 ? typeof c == "string" ? f.fill(s, c) : f.fill(s) : f.fill(0), f;
    }, a.allocUnsafe = function(o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return n(o);
    }, a.allocUnsafeSlow = function(o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return r.SlowBuffer(o);
    };
  }(On, On.exports)), On.exports;
}
var ui, jo;
function kf() {
  if (jo) return ui;
  jo = 1;
  var t = {}.toString;
  return ui = Array.isArray || function(e) {
    return t.call(e) == "[object Array]";
  }, ui;
}
var fi, Lo;
function sn() {
  return Lo || (Lo = 1, fi = TypeError), fi;
}
var hi, zo;
function sl() {
  return zo || (zo = 1, hi = Object), hi;
}
var di, qo;
function xf() {
  return qo || (qo = 1, di = Error), di;
}
var pi, Wo;
function Af() {
  return Wo || (Wo = 1, pi = EvalError), pi;
}
var wi, Ho;
function If() {
  return Ho || (Ho = 1, wi = RangeError), wi;
}
var mi, Go;
function Rf() {
  return Go || (Go = 1, mi = ReferenceError), mi;
}
var yi, Zo;
function cl() {
  return Zo || (Zo = 1, yi = SyntaxError), yi;
}
var gi, Vo;
function Tf() {
  return Vo || (Vo = 1, gi = URIError), gi;
}
var vi, Xo;
function $f() {
  return Xo || (Xo = 1, vi = Math.abs), vi;
}
var _i, Yo;
function Bf() {
  return Yo || (Yo = 1, _i = Math.floor), _i;
}
var bi, Ko;
function Df() {
  return Ko || (Ko = 1, bi = Math.max), bi;
}
var Ei, Jo;
function Of() {
  return Jo || (Jo = 1, Ei = Math.min), Ei;
}
var Si, Qo;
function Cf() {
  return Qo || (Qo = 1, Si = Math.pow), Si;
}
var ki, es;
function Ff() {
  return es || (es = 1, ki = Math.round), ki;
}
var xi, ts;
function Pf() {
  return ts || (ts = 1, xi = Number.isNaN || function(e) {
    return e !== e;
  }), xi;
}
var Ai, rs;
function Nf() {
  if (rs) return Ai;
  rs = 1;
  var t = /* @__PURE__ */ Pf();
  return Ai = function(r) {
    return t(r) || r === 0 ? r : r < 0 ? -1 : 1;
  }, Ai;
}
var Ii, ns;
function Mf() {
  return ns || (ns = 1, Ii = Object.getOwnPropertyDescriptor), Ii;
}
var Ri, is;
function cn() {
  if (is) return Ri;
  is = 1;
  var t = /* @__PURE__ */ Mf();
  if (t)
    try {
      t([], "length");
    } catch {
      t = null;
    }
  return Ri = t, Ri;
}
var Ti, as;
function Kn() {
  if (as) return Ti;
  as = 1;
  var t = Object.defineProperty || !1;
  if (t)
    try {
      t({}, "a", { value: 1 });
    } catch {
      t = !1;
    }
  return Ti = t, Ti;
}
var $i, os;
function ll() {
  return os || (os = 1, $i = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, r = Symbol("test"), n = Object(r);
    if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
      return !1;
    var i = 42;
    e[r] = i;
    for (var a in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(e);
    if (o.length !== 1 || o[0] !== r || !Object.prototype.propertyIsEnumerable.call(e, r))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var s = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(e, r)
      );
      if (s.value !== i || s.enumerable !== !0)
        return !1;
    }
    return !0;
  }), $i;
}
var Bi, ss;
function Uf() {
  if (ss) return Bi;
  ss = 1;
  var t = typeof Symbol < "u" && Symbol, e = ll();
  return Bi = function() {
    return typeof t != "function" || typeof Symbol != "function" || typeof t("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, Bi;
}
var Di, cs;
function ul() {
  return cs || (cs = 1, Di = typeof Reflect < "u" && Reflect.getPrototypeOf || null), Di;
}
var Oi, ls;
function fl() {
  if (ls) return Oi;
  ls = 1;
  var t = /* @__PURE__ */ sl();
  return Oi = t.getPrototypeOf || null, Oi;
}
var Ci, us;
function jf() {
  if (us) return Ci;
  us = 1;
  var t = "Function.prototype.bind called on incompatible ", e = Object.prototype.toString, r = Math.max, n = "[object Function]", i = function(c, f) {
    for (var l = [], w = 0; w < c.length; w += 1)
      l[w] = c[w];
    for (var m = 0; m < f.length; m += 1)
      l[m + c.length] = f[m];
    return l;
  }, a = function(c, f) {
    for (var l = [], w = f, m = 0; w < c.length; w += 1, m += 1)
      l[m] = c[w];
    return l;
  }, o = function(s, c) {
    for (var f = "", l = 0; l < s.length; l += 1)
      f += s[l], l + 1 < s.length && (f += c);
    return f;
  };
  return Ci = function(c) {
    var f = this;
    if (typeof f != "function" || e.apply(f) !== n)
      throw new TypeError(t + f);
    for (var l = a(arguments, 1), w, m = function() {
      if (this instanceof w) {
        var S = f.apply(
          this,
          i(l, arguments)
        );
        return Object(S) === S ? S : this;
      }
      return f.apply(
        c,
        i(l, arguments)
      );
    }, g = r(0, f.length - l.length), b = [], T = 0; T < g; T++)
      b[T] = "$" + T;
    if (w = Function("binder", "return function (" + o(b, ",") + "){ return binder.apply(this,arguments); }")(m), f.prototype) {
      var R = function() {
      };
      R.prototype = f.prototype, w.prototype = new R(), R.prototype = null;
    }
    return w;
  }, Ci;
}
var Fi, fs;
function ln() {
  if (fs) return Fi;
  fs = 1;
  var t = jf();
  return Fi = Function.prototype.bind || t, Fi;
}
var Pi, hs;
function wo() {
  return hs || (hs = 1, Pi = Function.prototype.call), Pi;
}
var Ni, ds;
function mo() {
  return ds || (ds = 1, Ni = Function.prototype.apply), Ni;
}
var Mi, ps;
function Lf() {
  return ps || (ps = 1, Mi = typeof Reflect < "u" && Reflect && Reflect.apply), Mi;
}
var Ui, ws;
function hl() {
  if (ws) return Ui;
  ws = 1;
  var t = ln(), e = mo(), r = wo(), n = Lf();
  return Ui = n || t.call(r, e), Ui;
}
var ji, ms;
function yo() {
  if (ms) return ji;
  ms = 1;
  var t = ln(), e = /* @__PURE__ */ sn(), r = wo(), n = hl();
  return ji = function(a) {
    if (a.length < 1 || typeof a[0] != "function")
      throw new e("a function is required");
    return n(t, r, a);
  }, ji;
}
var Li, ys;
function zf() {
  if (ys) return Li;
  ys = 1;
  var t = yo(), e = /* @__PURE__ */ cn(), r;
  try {
    r = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (o) {
    if (!o || typeof o != "object" || !("code" in o) || o.code !== "ERR_PROTO_ACCESS")
      throw o;
  }
  var n = !!r && e && e(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), i = Object, a = i.getPrototypeOf;
  return Li = n && typeof n.get == "function" ? t([n.get]) : typeof a == "function" ? (
    /** @type {import('./get')} */
    function(s) {
      return a(s == null ? s : i(s));
    }
  ) : !1, Li;
}
var zi, gs;
function dl() {
  if (gs) return zi;
  gs = 1;
  var t = ul(), e = fl(), r = /* @__PURE__ */ zf();
  return zi = t ? function(i) {
    return t(i);
  } : e ? function(i) {
    if (!i || typeof i != "object" && typeof i != "function")
      throw new TypeError("getProto: not an object");
    return e(i);
  } : r ? function(i) {
    return r(i);
  } : null, zi;
}
var qi, vs;
function qf() {
  if (vs) return qi;
  vs = 1;
  var t = Function.prototype.call, e = Object.prototype.hasOwnProperty, r = ln();
  return qi = r.call(t, e), qi;
}
var Wi, _s;
function pl() {
  if (_s) return Wi;
  _s = 1;
  var t, e = /* @__PURE__ */ sl(), r = /* @__PURE__ */ xf(), n = /* @__PURE__ */ Af(), i = /* @__PURE__ */ If(), a = /* @__PURE__ */ Rf(), o = /* @__PURE__ */ cl(), s = /* @__PURE__ */ sn(), c = /* @__PURE__ */ Tf(), f = /* @__PURE__ */ $f(), l = /* @__PURE__ */ Bf(), w = /* @__PURE__ */ Df(), m = /* @__PURE__ */ Of(), g = /* @__PURE__ */ Cf(), b = /* @__PURE__ */ Ff(), T = /* @__PURE__ */ Nf(), R = Function, S = function(Ue) {
    try {
      return R('"use strict"; return (' + Ue + ").constructor;")();
    } catch {
    }
  }, A = /* @__PURE__ */ cn(), B = /* @__PURE__ */ Kn(), N = function() {
    throw new s();
  }, U = A ? function() {
    try {
      return arguments.callee, N;
    } catch {
      try {
        return A(arguments, "callee").get;
      } catch {
        return N;
      }
    }
  }() : N, M = Uf()(), $ = dl(), O = fl(), W = ul(), z = mo(), K = wo(), F = {}, Q = typeof Uint8Array > "u" || !$ ? t : $(Uint8Array), se = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? t : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? t : ArrayBuffer,
    "%ArrayIteratorPrototype%": M && $ ? $([][Symbol.iterator]()) : t,
    "%AsyncFromSyncIteratorPrototype%": t,
    "%AsyncFunction%": F,
    "%AsyncGenerator%": F,
    "%AsyncGeneratorFunction%": F,
    "%AsyncIteratorPrototype%": F,
    "%Atomics%": typeof Atomics > "u" ? t : Atomics,
    "%BigInt%": typeof BigInt > "u" ? t : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? t : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? t : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? t : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": r,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": n,
    "%Float16Array%": typeof Float16Array > "u" ? t : Float16Array,
    "%Float32Array%": typeof Float32Array > "u" ? t : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? t : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? t : FinalizationRegistry,
    "%Function%": R,
    "%GeneratorFunction%": F,
    "%Int8Array%": typeof Int8Array > "u" ? t : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? t : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? t : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": M && $ ? $($([][Symbol.iterator]())) : t,
    "%JSON%": typeof JSON == "object" ? JSON : t,
    "%Map%": typeof Map > "u" ? t : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !M || !$ ? t : $((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": e,
    "%Object.getOwnPropertyDescriptor%": A,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? t : Promise,
    "%Proxy%": typeof Proxy > "u" ? t : Proxy,
    "%RangeError%": i,
    "%ReferenceError%": a,
    "%Reflect%": typeof Reflect > "u" ? t : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? t : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !M || !$ ? t : $((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? t : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": M && $ ? $(""[Symbol.iterator]()) : t,
    "%Symbol%": M ? Symbol : t,
    "%SyntaxError%": o,
    "%ThrowTypeError%": U,
    "%TypedArray%": Q,
    "%TypeError%": s,
    "%Uint8Array%": typeof Uint8Array > "u" ? t : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? t : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? t : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? t : Uint32Array,
    "%URIError%": c,
    "%WeakMap%": typeof WeakMap > "u" ? t : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? t : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? t : WeakSet,
    "%Function.prototype.call%": K,
    "%Function.prototype.apply%": z,
    "%Object.defineProperty%": B,
    "%Object.getPrototypeOf%": O,
    "%Math.abs%": f,
    "%Math.floor%": l,
    "%Math.max%": w,
    "%Math.min%": m,
    "%Math.pow%": g,
    "%Math.round%": b,
    "%Math.sign%": T,
    "%Reflect.getPrototypeOf%": W
  };
  if ($)
    try {
      null.error;
    } catch (Ue) {
      var ve = $($(Ue));
      se["%Error.prototype%"] = ve;
    }
  var ie = function Ue(Be) {
    var Re;
    if (Be === "%AsyncFunction%")
      Re = S("async function () {}");
    else if (Be === "%GeneratorFunction%")
      Re = S("function* () {}");
    else if (Be === "%AsyncGeneratorFunction%")
      Re = S("async function* () {}");
    else if (Be === "%AsyncGenerator%") {
      var le = Ue("%AsyncGeneratorFunction%");
      le && (Re = le.prototype);
    } else if (Be === "%AsyncIteratorPrototype%") {
      var be = Ue("%AsyncGenerator%");
      be && $ && (Re = $(be.prototype));
    }
    return se[Be] = Re, Re;
  }, Y = {
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
  }, ae = ln(), de = /* @__PURE__ */ qf(), Ae = ae.call(K, Array.prototype.concat), Ie = ae.call(z, Array.prototype.splice), _e = ae.call(K, String.prototype.replace), Te = ae.call(K, String.prototype.slice), ge = ae.call(K, RegExp.prototype.exec), $e = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, ke = /\\(\\)?/g, Se = function(Be) {
    var Re = Te(Be, 0, 1), le = Te(Be, -1);
    if (Re === "%" && le !== "%")
      throw new o("invalid intrinsic syntax, expected closing `%`");
    if (le === "%" && Re !== "%")
      throw new o("invalid intrinsic syntax, expected opening `%`");
    var be = [];
    return _e(Be, $e, function(Le, je, Ce, Fe) {
      be[be.length] = Ce ? _e(Fe, ke, "$1") : je || Le;
    }), be;
  }, Pe = function(Be, Re) {
    var le = Be, be;
    if (de(Y, le) && (be = Y[le], le = "%" + be[0] + "%"), de(se, le)) {
      var Le = se[le];
      if (Le === F && (Le = ie(le)), typeof Le > "u" && !Re)
        throw new s("intrinsic " + Be + " exists, but is not available. Please file an issue!");
      return {
        alias: be,
        name: le,
        value: Le
      };
    }
    throw new o("intrinsic " + Be + " does not exist!");
  };
  return Wi = function(Be, Re) {
    if (typeof Be != "string" || Be.length === 0)
      throw new s("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof Re != "boolean")
      throw new s('"allowMissing" argument must be a boolean');
    if (ge(/^%?[^%]*%?$/, Be) === null)
      throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var le = Se(Be), be = le.length > 0 ? le[0] : "", Le = Pe("%" + be + "%", Re), je = Le.name, Ce = Le.value, Fe = !1, xe = Le.alias;
    xe && (be = xe[0], Ie(le, Ae([0, 1], xe)));
    for (var rt = 1, ct = !0; rt < le.length; rt += 1) {
      var et = le[rt], Me = Te(et, 0, 1), qe = Te(et, -1);
      if ((Me === '"' || Me === "'" || Me === "`" || qe === '"' || qe === "'" || qe === "`") && Me !== qe)
        throw new o("property names with quotes must have matching quotes");
      if ((et === "constructor" || !ct) && (Fe = !0), be += "." + et, je = "%" + be + "%", de(se, je))
        Ce = se[je];
      else if (Ce != null) {
        if (!(et in Ce)) {
          if (!Re)
            throw new s("base intrinsic for " + Be + " exists, but the property is not available.");
          return;
        }
        if (A && rt + 1 >= le.length) {
          var nt = A(Ce, et);
          ct = !!nt, ct && "get" in nt && !("originalValue" in nt.get) ? Ce = nt.get : Ce = Ce[et];
        } else
          ct = de(Ce, et), Ce = Ce[et];
        ct && !Fe && (se[je] = Ce);
      }
    }
    return Ce;
  }, Wi;
}
var Hi, bs;
function wl() {
  if (bs) return Hi;
  bs = 1;
  var t = /* @__PURE__ */ pl(), e = yo(), r = e([t("%String.prototype.indexOf%")]);
  return Hi = function(i, a) {
    var o = (
      /** @type {(this: unknown, ...args: unknown[]) => unknown} */
      t(i, !!a)
    );
    return typeof o == "function" && r(i, ".prototype.") > -1 ? e(
      /** @type {const} */
      [o]
    ) : o;
  }, Hi;
}
var Gi, Es;
function Wf() {
  if (Es) return Gi;
  Es = 1;
  var t = Function.prototype.toString, e = typeof Reflect == "object" && Reflect !== null && Reflect.apply, r, n;
  if (typeof e == "function" && typeof Object.defineProperty == "function")
    try {
      r = Object.defineProperty({}, "length", {
        get: function() {
          throw n;
        }
      }), n = {}, e(function() {
        throw 42;
      }, null, r);
    } catch (A) {
      A !== n && (e = null);
    }
  else
    e = null;
  var i = /^\s*class\b/, a = function(B) {
    try {
      var N = t.call(B);
      return i.test(N);
    } catch {
      return !1;
    }
  }, o = function(B) {
    try {
      return a(B) ? !1 : (t.call(B), !0);
    } catch {
      return !1;
    }
  }, s = Object.prototype.toString, c = "[object Object]", f = "[object Function]", l = "[object GeneratorFunction]", w = "[object HTMLAllCollection]", m = "[object HTML document.all class]", g = "[object HTMLCollection]", b = typeof Symbol == "function" && !!Symbol.toStringTag, T = !(0 in [,]), R = function() {
    return !1;
  };
  if (typeof document == "object") {
    var S = document.all;
    s.call(S) === s.call(document.all) && (R = function(B) {
      if ((T || !B) && (typeof B > "u" || typeof B == "object"))
        try {
          var N = s.call(B);
          return (N === w || N === m || N === g || N === c) && B("") == null;
        } catch {
        }
      return !1;
    });
  }
  return Gi = e ? function(B) {
    if (R(B))
      return !0;
    if (!B || typeof B != "function" && typeof B != "object")
      return !1;
    try {
      e(B, null, r);
    } catch (N) {
      if (N !== n)
        return !1;
    }
    return !a(B) && o(B);
  } : function(B) {
    if (R(B))
      return !0;
    if (!B || typeof B != "function" && typeof B != "object")
      return !1;
    if (b)
      return o(B);
    if (a(B))
      return !1;
    var N = s.call(B);
    return N !== f && N !== l && !/^\[object HTML/.test(N) ? !1 : o(B);
  }, Gi;
}
var Zi, Ss;
function Hf() {
  if (Ss) return Zi;
  Ss = 1;
  var t = Wf(), e = Object.prototype.toString, r = Object.prototype.hasOwnProperty, n = function(c, f, l) {
    for (var w = 0, m = c.length; w < m; w++)
      r.call(c, w) && (l == null ? f(c[w], w, c) : f.call(l, c[w], w, c));
  }, i = function(c, f, l) {
    for (var w = 0, m = c.length; w < m; w++)
      l == null ? f(c.charAt(w), w, c) : f.call(l, c.charAt(w), w, c);
  }, a = function(c, f, l) {
    for (var w in c)
      r.call(c, w) && (l == null ? f(c[w], w, c) : f.call(l, c[w], w, c));
  };
  function o(s) {
    return e.call(s) === "[object Array]";
  }
  return Zi = function(c, f, l) {
    if (!t(f))
      throw new TypeError("iterator must be a function");
    var w;
    arguments.length >= 3 && (w = l), o(c) ? n(c, f, w) : typeof c == "string" ? i(c, f, w) : a(c, f, w);
  }, Zi;
}
var Vi, ks;
function Gf() {
  return ks || (ks = 1, Vi = [
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
  ]), Vi;
}
var Xi, xs;
function Zf() {
  if (xs) return Xi;
  xs = 1;
  var t = /* @__PURE__ */ Gf(), e = globalThis;
  return Xi = function() {
    for (var n = [], i = 0; i < t.length; i++)
      typeof e[t[i]] == "function" && (n[n.length] = t[i]);
    return n;
  }, Xi;
}
var Yi = { exports: {} }, Ki, As;
function Vf() {
  if (As) return Ki;
  As = 1;
  var t = /* @__PURE__ */ Kn(), e = /* @__PURE__ */ cl(), r = /* @__PURE__ */ sn(), n = /* @__PURE__ */ cn();
  return Ki = function(a, o, s) {
    if (!a || typeof a != "object" && typeof a != "function")
      throw new r("`obj` must be an object or a function`");
    if (typeof o != "string" && typeof o != "symbol")
      throw new r("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new r("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new r("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new r("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new r("`loose`, if provided, must be a boolean");
    var c = arguments.length > 3 ? arguments[3] : null, f = arguments.length > 4 ? arguments[4] : null, l = arguments.length > 5 ? arguments[5] : null, w = arguments.length > 6 ? arguments[6] : !1, m = !!n && n(a, o);
    if (t)
      t(a, o, {
        configurable: l === null && m ? m.configurable : !l,
        enumerable: c === null && m ? m.enumerable : !c,
        value: s,
        writable: f === null && m ? m.writable : !f
      });
    else if (w || !c && !f && !l)
      a[o] = s;
    else
      throw new e("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, Ki;
}
var Ji, Is;
function Xf() {
  if (Is) return Ji;
  Is = 1;
  var t = /* @__PURE__ */ Kn(), e = function() {
    return !!t;
  };
  return e.hasArrayLengthDefineBug = function() {
    if (!t)
      return null;
    try {
      return t([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, Ji = e, Ji;
}
var Qi, Rs;
function Yf() {
  if (Rs) return Qi;
  Rs = 1;
  var t = /* @__PURE__ */ pl(), e = /* @__PURE__ */ Vf(), r = /* @__PURE__ */ Xf()(), n = /* @__PURE__ */ cn(), i = /* @__PURE__ */ sn(), a = t("%Math.floor%");
  return Qi = function(s, c) {
    if (typeof s != "function")
      throw new i("`fn` is not a function");
    if (typeof c != "number" || c < 0 || c > 4294967295 || a(c) !== c)
      throw new i("`length` must be a positive 32-bit integer");
    var f = arguments.length > 2 && !!arguments[2], l = !0, w = !0;
    if ("length" in s && n) {
      var m = n(s, "length");
      m && !m.configurable && (l = !1), m && !m.writable && (w = !1);
    }
    return (l || w || !f) && (r ? e(
      /** @type {Parameters<define>[0]} */
      s,
      "length",
      c,
      !0,
      !0
    ) : e(
      /** @type {Parameters<define>[0]} */
      s,
      "length",
      c
    )), s;
  }, Qi;
}
var ea, Ts;
function Kf() {
  if (Ts) return ea;
  Ts = 1;
  var t = ln(), e = mo(), r = hl();
  return ea = function() {
    return r(t, e, arguments);
  }, ea;
}
var $s;
function Jf() {
  return $s || ($s = 1, function(t) {
    var e = /* @__PURE__ */ Yf(), r = /* @__PURE__ */ Kn(), n = yo(), i = Kf();
    t.exports = function(o) {
      var s = n(arguments), c = o.length - (arguments.length - 1);
      return e(
        s,
        1 + (c > 0 ? c : 0),
        !0
      );
    }, r ? r(t.exports, "apply", { value: i }) : t.exports.apply = i;
  }(Yi)), Yi.exports;
}
var ta, Bs;
function Qf() {
  if (Bs) return ta;
  Bs = 1;
  var t = ll();
  return ta = function() {
    return t() && !!Symbol.toStringTag;
  }, ta;
}
var ra, Ds;
function eh() {
  if (Ds) return ra;
  Ds = 1;
  var t = Hf(), e = /* @__PURE__ */ Zf(), r = Jf(), n = /* @__PURE__ */ wl(), i = /* @__PURE__ */ cn(), a = dl(), o = n("Object.prototype.toString"), s = Qf()(), c = globalThis, f = e(), l = n("String.prototype.slice"), w = n("Array.prototype.indexOf", !0) || function(R, S) {
    for (var A = 0; A < R.length; A += 1)
      if (R[A] === S)
        return A;
    return -1;
  }, m = { __proto__: null };
  s && i && a ? t(f, function(T) {
    var R = new c[T]();
    if (Symbol.toStringTag in R && a) {
      var S = a(R), A = i(S, Symbol.toStringTag);
      if (!A && S) {
        var B = a(S);
        A = i(B, Symbol.toStringTag);
      }
      m["$" + T] = r(A.get);
    }
  }) : t(f, function(T) {
    var R = new c[T](), S = R.slice || R.set;
    S && (m[
      /** @type {`$${import('.').TypedArrayName}`} */
      "$" + T
    ] = /** @type {import('./types').BoundSlice | import('./types').BoundSet} */
    // @ts-expect-error TODO FIXME
    r(S));
  });
  var g = function(R) {
    var S = !1;
    return t(
      /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
      m,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(A, B) {
        if (!S)
          try {
            "$" + A(R) === B && (S = /** @type {import('.').TypedArrayName} */
            l(B, 1));
          } catch {
          }
      }
    ), S;
  }, b = function(R) {
    var S = !1;
    return t(
      /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
      m,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(A, B) {
        if (!S)
          try {
            A(R), S = /** @type {import('.').TypedArrayName} */
            l(B, 1);
          } catch {
          }
      }
    ), S;
  };
  return ra = function(R) {
    if (!R || typeof R != "object")
      return !1;
    if (!s) {
      var S = l(o(R), 8, -1);
      return w(f, S) > -1 ? S : S !== "Object" ? !1 : b(R);
    }
    return i ? g(R) : null;
  }, ra;
}
var na, Os;
function th() {
  if (Os) return na;
  Os = 1;
  var t = /* @__PURE__ */ eh();
  return na = function(r) {
    return !!t(r);
  }, na;
}
var ia, Cs;
function rh() {
  if (Cs) return ia;
  Cs = 1;
  var t = /* @__PURE__ */ sn(), e = /* @__PURE__ */ wl(), r = e("TypedArray.prototype.buffer", !0), n = /* @__PURE__ */ th();
  return ia = r || function(a) {
    if (!n(a))
      throw new t("Not a Typed Array");
    return a.buffer;
  }, ia;
}
var aa, Fs;
function nh() {
  if (Fs) return aa;
  Fs = 1;
  var t = po().Buffer, e = kf(), r = /* @__PURE__ */ rh(), n = ArrayBuffer.isView || function(c) {
    try {
      return r(c), !0;
    } catch {
      return !1;
    }
  }, i = typeof Uint8Array < "u", a = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", o = a && (t.prototype instanceof Uint8Array || t.TYPED_ARRAY_SUPPORT);
  return aa = function(c, f) {
    if (c instanceof t)
      return c;
    if (typeof c == "string")
      return t.from(c, f);
    if (a && n(c)) {
      if (c.byteLength === 0)
        return t.alloc(0);
      if (o) {
        var l = t.from(c.buffer, c.byteOffset, c.byteLength);
        if (l.byteLength === c.byteLength)
          return l;
      }
      var w = c instanceof Uint8Array ? c : new Uint8Array(c.buffer, c.byteOffset, c.byteLength), m = t.from(w);
      if (m.length === c.byteLength)
        return m;
    }
    if (i && c instanceof Uint8Array)
      return t.from(c);
    var g = e(c);
    if (g)
      for (var b = 0; b < c.length; b += 1) {
        var T = c[b];
        if (typeof T != "number" || T < 0 || T > 255 || ~~T !== T)
          throw new RangeError("Array items must be numbers in the range 0-255.");
      }
    if (g || t.isBuffer(c) && c.constructor && typeof c.constructor.isBuffer == "function" && c.constructor.isBuffer(c))
      return t.from(c);
    throw new TypeError('The "data" argument must be a string, an Array, a Buffer, a Uint8Array, or a DataView.');
  }, aa;
}
var oa, Ps;
function ih() {
  if (Ps) return oa;
  Ps = 1;
  var t = po().Buffer, e = /* @__PURE__ */ nh();
  function r(n, i) {
    this._block = t.alloc(n), this._finalSize = i, this._blockSize = n, this._len = 0;
  }
  return r.prototype.update = function(n, i) {
    n = e(n, i || "utf8");
    for (var a = this._block, o = this._blockSize, s = n.length, c = this._len, f = 0; f < s; ) {
      for (var l = c % o, w = Math.min(s - f, o - l), m = 0; m < w; m++)
        a[l + m] = n[f + m];
      c += w, f += w, c % o === 0 && this._update(a);
    }
    return this._len += s, this;
  }, r.prototype.digest = function(n) {
    var i = this._len % this._blockSize;
    this._block[i] = 128, this._block.fill(0, i + 1), i >= this._finalSize && (this._update(this._block), this._block.fill(0));
    var a = this._len * 8;
    if (a <= 4294967295)
      this._block.writeUInt32BE(a, this._blockSize - 4);
    else {
      var o = (a & 4294967295) >>> 0, s = (a - o) / 4294967296;
      this._block.writeUInt32BE(s, this._blockSize - 8), this._block.writeUInt32BE(o, this._blockSize - 4);
    }
    this._update(this._block);
    var c = this._hash();
    return n ? c.toString(n) : c;
  }, r.prototype._update = function() {
    throw new Error("_update must be implemented by subclass");
  }, oa = r, oa;
}
var sa, Ns;
function ah() {
  if (Ns) return sa;
  Ns = 1;
  var t = Ef(), e = ih(), r = po().Buffer, n = [
    1518500249,
    1859775393,
    -1894007588,
    -899497514
  ], i = new Array(80);
  function a() {
    this.init(), this._w = i, e.call(this, 64, 56);
  }
  t(a, e), a.prototype.init = function() {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
  };
  function o(l) {
    return l << 1 | l >>> 31;
  }
  function s(l) {
    return l << 5 | l >>> 27;
  }
  function c(l) {
    return l << 30 | l >>> 2;
  }
  function f(l, w, m, g) {
    return l === 0 ? w & m | ~w & g : l === 2 ? w & m | w & g | m & g : w ^ m ^ g;
  }
  return a.prototype._update = function(l) {
    for (var w = this._w, m = this._a | 0, g = this._b | 0, b = this._c | 0, T = this._d | 0, R = this._e | 0, S = 0; S < 16; ++S)
      w[S] = l.readInt32BE(S * 4);
    for (; S < 80; ++S)
      w[S] = o(w[S - 3] ^ w[S - 8] ^ w[S - 14] ^ w[S - 16]);
    for (var A = 0; A < 80; ++A) {
      var B = ~~(A / 20), N = s(m) + f(B, g, b, T) + R + w[A] + n[B] | 0;
      R = T, T = b, b = c(g), g = m, m = N;
    }
    this._a = m + this._a | 0, this._b = g + this._b | 0, this._c = b + this._c | 0, this._d = T + this._d | 0, this._e = R + this._e | 0;
  }, a.prototype._hash = function() {
    var l = r.allocUnsafe(20);
    return l.writeInt32BE(this._a | 0, 0), l.writeInt32BE(this._b | 0, 4), l.writeInt32BE(this._c | 0, 8), l.writeInt32BE(this._d | 0, 12), l.writeInt32BE(this._e | 0, 16), l;
  }, sa = a, sa;
}
var oh = ah(), ml = /* @__PURE__ */ rr(oh), ca, Ms;
function sh() {
  if (Ms) return ca;
  Ms = 1;
  function t(i) {
    if (typeof i != "string")
      throw new TypeError("Path must be a string. Received " + JSON.stringify(i));
  }
  function e(i, a) {
    for (var o = "", s = 0, c = -1, f = 0, l, w = 0; w <= i.length; ++w) {
      if (w < i.length)
        l = i.charCodeAt(w);
      else {
        if (l === 47)
          break;
        l = 47;
      }
      if (l === 47) {
        if (!(c === w - 1 || f === 1)) if (c !== w - 1 && f === 2) {
          if (o.length < 2 || s !== 2 || o.charCodeAt(o.length - 1) !== 46 || o.charCodeAt(o.length - 2) !== 46) {
            if (o.length > 2) {
              var m = o.lastIndexOf("/");
              if (m !== o.length - 1) {
                m === -1 ? (o = "", s = 0) : (o = o.slice(0, m), s = o.length - 1 - o.lastIndexOf("/")), c = w, f = 0;
                continue;
              }
            } else if (o.length === 2 || o.length === 1) {
              o = "", s = 0, c = w, f = 0;
              continue;
            }
          }
          a && (o.length > 0 ? o += "/.." : o = "..", s = 2);
        } else
          o.length > 0 ? o += "/" + i.slice(c + 1, w) : o = i.slice(c + 1, w), s = w - c - 1;
        c = w, f = 0;
      } else l === 46 && f !== -1 ? ++f : f = -1;
    }
    return o;
  }
  function r(i, a) {
    var o = a.dir || a.root, s = a.base || (a.name || "") + (a.ext || "");
    return o ? o === a.root ? o + s : o + i + s : s;
  }
  var n = {
    // path.resolve([from ...], to)
    resolve: function() {
      for (var a = "", o = !1, s, c = arguments.length - 1; c >= -1 && !o; c--) {
        var f;
        c >= 0 ? f = arguments[c] : (s === void 0 && (s = vt.cwd()), f = s), t(f), f.length !== 0 && (a = f + "/" + a, o = f.charCodeAt(0) === 47);
      }
      return a = e(a, !o), o ? a.length > 0 ? "/" + a : "/" : a.length > 0 ? a : ".";
    },
    normalize: function(a) {
      if (t(a), a.length === 0) return ".";
      var o = a.charCodeAt(0) === 47, s = a.charCodeAt(a.length - 1) === 47;
      return a = e(a, !o), a.length === 0 && !o && (a = "."), a.length > 0 && s && (a += "/"), o ? "/" + a : a;
    },
    isAbsolute: function(a) {
      return t(a), a.length > 0 && a.charCodeAt(0) === 47;
    },
    join: function() {
      if (arguments.length === 0)
        return ".";
      for (var a, o = 0; o < arguments.length; ++o) {
        var s = arguments[o];
        t(s), s.length > 0 && (a === void 0 ? a = s : a += "/" + s);
      }
      return a === void 0 ? "." : n.normalize(a);
    },
    relative: function(a, o) {
      if (t(a), t(o), a === o || (a = n.resolve(a), o = n.resolve(o), a === o)) return "";
      for (var s = 1; s < a.length && a.charCodeAt(s) === 47; ++s)
        ;
      for (var c = a.length, f = c - s, l = 1; l < o.length && o.charCodeAt(l) === 47; ++l)
        ;
      for (var w = o.length, m = w - l, g = f < m ? f : m, b = -1, T = 0; T <= g; ++T) {
        if (T === g) {
          if (m > g) {
            if (o.charCodeAt(l + T) === 47)
              return o.slice(l + T + 1);
            if (T === 0)
              return o.slice(l + T);
          } else f > g && (a.charCodeAt(s + T) === 47 ? b = T : T === 0 && (b = 0));
          break;
        }
        var R = a.charCodeAt(s + T), S = o.charCodeAt(l + T);
        if (R !== S)
          break;
        R === 47 && (b = T);
      }
      var A = "";
      for (T = s + b + 1; T <= c; ++T)
        (T === c || a.charCodeAt(T) === 47) && (A.length === 0 ? A += ".." : A += "/..");
      return A.length > 0 ? A + o.slice(l + b) : (l += b, o.charCodeAt(l) === 47 && ++l, o.slice(l));
    },
    _makeLong: function(a) {
      return a;
    },
    dirname: function(a) {
      if (t(a), a.length === 0) return ".";
      for (var o = a.charCodeAt(0), s = o === 47, c = -1, f = !0, l = a.length - 1; l >= 1; --l)
        if (o = a.charCodeAt(l), o === 47) {
          if (!f) {
            c = l;
            break;
          }
        } else
          f = !1;
      return c === -1 ? s ? "/" : "." : s && c === 1 ? "//" : a.slice(0, c);
    },
    basename: function(a, o) {
      if (o !== void 0 && typeof o != "string") throw new TypeError('"ext" argument must be a string');
      t(a);
      var s = 0, c = -1, f = !0, l;
      if (o !== void 0 && o.length > 0 && o.length <= a.length) {
        if (o.length === a.length && o === a) return "";
        var w = o.length - 1, m = -1;
        for (l = a.length - 1; l >= 0; --l) {
          var g = a.charCodeAt(l);
          if (g === 47) {
            if (!f) {
              s = l + 1;
              break;
            }
          } else
            m === -1 && (f = !1, m = l + 1), w >= 0 && (g === o.charCodeAt(w) ? --w === -1 && (c = l) : (w = -1, c = m));
        }
        return s === c ? c = m : c === -1 && (c = a.length), a.slice(s, c);
      } else {
        for (l = a.length - 1; l >= 0; --l)
          if (a.charCodeAt(l) === 47) {
            if (!f) {
              s = l + 1;
              break;
            }
          } else c === -1 && (f = !1, c = l + 1);
        return c === -1 ? "" : a.slice(s, c);
      }
    },
    extname: function(a) {
      t(a);
      for (var o = -1, s = 0, c = -1, f = !0, l = 0, w = a.length - 1; w >= 0; --w) {
        var m = a.charCodeAt(w);
        if (m === 47) {
          if (!f) {
            s = w + 1;
            break;
          }
          continue;
        }
        c === -1 && (f = !1, c = w + 1), m === 46 ? o === -1 ? o = w : l !== 1 && (l = 1) : o !== -1 && (l = -1);
      }
      return o === -1 || c === -1 || // We saw a non-dot character immediately before the dot
      l === 0 || // The (right-most) trimmed path component is exactly '..'
      l === 1 && o === c - 1 && o === s + 1 ? "" : a.slice(o, c);
    },
    format: function(a) {
      if (a === null || typeof a != "object")
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof a);
      return r("/", a);
    },
    parse: function(a) {
      t(a);
      var o = { root: "", dir: "", base: "", ext: "", name: "" };
      if (a.length === 0) return o;
      var s = a.charCodeAt(0), c = s === 47, f;
      c ? (o.root = "/", f = 1) : f = 0;
      for (var l = -1, w = 0, m = -1, g = !0, b = a.length - 1, T = 0; b >= f; --b) {
        if (s = a.charCodeAt(b), s === 47) {
          if (!g) {
            w = b + 1;
            break;
          }
          continue;
        }
        m === -1 && (g = !1, m = b + 1), s === 46 ? l === -1 ? l = b : T !== 1 && (T = 1) : l !== -1 && (T = -1);
      }
      return l === -1 || m === -1 || // We saw a non-dot character immediately before the dot
      T === 0 || // The (right-most) trimmed path component is exactly '..'
      T === 1 && l === m - 1 && l === w + 1 ? m !== -1 && (w === 0 && c ? o.base = o.name = a.slice(1, m) : o.base = o.name = a.slice(w, m)) : (w === 0 && c ? (o.name = a.slice(1, l), o.base = a.slice(1, m)) : (o.name = a.slice(w, l), o.base = a.slice(w, m)), o.ext = a.slice(l, m)), w > 0 ? o.dir = a.slice(0, w - 1) : c && (o.dir = "/"), o;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
  };
  return n.posix = n, ca = n, ca;
}
var re = sh(), la = {};
/*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */
var Us;
function ch() {
  return Us || (Us = 1, function(t) {
    (function(e) {
      e(typeof DO_NOT_EXPORT_CRC > "u" ? t : {});
    })(function(e) {
      e.version = "1.2.2";
      function r() {
        for (var O = 0, W = new Array(256), z = 0; z != 256; ++z)
          O = z, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, W[z] = O;
        return typeof Int32Array < "u" ? new Int32Array(W) : W;
      }
      var n = r();
      function i(O) {
        var W = 0, z = 0, K = 0, F = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
        for (K = 0; K != 256; ++K) F[K] = O[K];
        for (K = 0; K != 256; ++K)
          for (z = O[K], W = 256 + K; W < 4096; W += 256) z = F[W] = z >>> 8 ^ O[z & 255];
        var Q = [];
        for (K = 1; K != 16; ++K) Q[K - 1] = typeof Int32Array < "u" ? F.subarray(K * 256, K * 256 + 256) : F.slice(K * 256, K * 256 + 256);
        return Q;
      }
      var a = i(n), o = a[0], s = a[1], c = a[2], f = a[3], l = a[4], w = a[5], m = a[6], g = a[7], b = a[8], T = a[9], R = a[10], S = a[11], A = a[12], B = a[13], N = a[14];
      function U(O, W) {
        for (var z = W ^ -1, K = 0, F = O.length; K < F; ) z = z >>> 8 ^ n[(z ^ O.charCodeAt(K++)) & 255];
        return ~z;
      }
      function M(O, W) {
        for (var z = W ^ -1, K = O.length - 15, F = 0; F < K; ) z = N[O[F++] ^ z & 255] ^ B[O[F++] ^ z >> 8 & 255] ^ A[O[F++] ^ z >> 16 & 255] ^ S[O[F++] ^ z >>> 24] ^ R[O[F++]] ^ T[O[F++]] ^ b[O[F++]] ^ g[O[F++]] ^ m[O[F++]] ^ w[O[F++]] ^ l[O[F++]] ^ f[O[F++]] ^ c[O[F++]] ^ s[O[F++]] ^ o[O[F++]] ^ n[O[F++]];
        for (K += 15; F < K; ) z = z >>> 8 ^ n[(z ^ O[F++]) & 255];
        return ~z;
      }
      function $(O, W) {
        for (var z = W ^ -1, K = 0, F = O.length, Q = 0, se = 0; K < F; )
          Q = O.charCodeAt(K++), Q < 128 ? z = z >>> 8 ^ n[(z ^ Q) & 255] : Q < 2048 ? (z = z >>> 8 ^ n[(z ^ (192 | Q >> 6 & 31)) & 255], z = z >>> 8 ^ n[(z ^ (128 | Q & 63)) & 255]) : Q >= 55296 && Q < 57344 ? (Q = (Q & 1023) + 64, se = O.charCodeAt(K++) & 1023, z = z >>> 8 ^ n[(z ^ (240 | Q >> 8 & 7)) & 255], z = z >>> 8 ^ n[(z ^ (128 | Q >> 2 & 63)) & 255], z = z >>> 8 ^ n[(z ^ (128 | se >> 6 & 15 | (Q & 3) << 4)) & 255], z = z >>> 8 ^ n[(z ^ (128 | se & 63)) & 255]) : (z = z >>> 8 ^ n[(z ^ (224 | Q >> 12 & 15)) & 255], z = z >>> 8 ^ n[(z ^ (128 | Q >> 6 & 63)) & 255], z = z >>> 8 ^ n[(z ^ (128 | Q & 63)) & 255]);
        return ~z;
      }
      e.table = n, e.bstr = U, e.buf = M, e.str = $;
    });
  }(la)), la;
}
var lh = ch(), uh = /* @__PURE__ */ rr(lh), ua = {}, js;
function ur() {
  return js || (js = 1, function(t) {
    var e = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
    function r(a, o) {
      return Object.prototype.hasOwnProperty.call(a, o);
    }
    t.assign = function(a) {
      for (var o = Array.prototype.slice.call(arguments, 1); o.length; ) {
        var s = o.shift();
        if (s) {
          if (typeof s != "object")
            throw new TypeError(s + "must be non-object");
          for (var c in s)
            r(s, c) && (a[c] = s[c]);
        }
      }
      return a;
    }, t.shrinkBuf = function(a, o) {
      return a.length === o ? a : a.subarray ? a.subarray(0, o) : (a.length = o, a);
    };
    var n = {
      arraySet: function(a, o, s, c, f) {
        if (o.subarray && a.subarray) {
          a.set(o.subarray(s, s + c), f);
          return;
        }
        for (var l = 0; l < c; l++)
          a[f + l] = o[s + l];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        var o, s, c, f, l, w;
        for (c = 0, o = 0, s = a.length; o < s; o++)
          c += a[o].length;
        for (w = new Uint8Array(c), f = 0, o = 0, s = a.length; o < s; o++)
          l = a[o], w.set(l, f), f += l.length;
        return w;
      }
    }, i = {
      arraySet: function(a, o, s, c, f) {
        for (var l = 0; l < c; l++)
          a[f + l] = o[s + l];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        return [].concat.apply([], a);
      }
    };
    t.setTyped = function(a) {
      a ? (t.Buf8 = Uint8Array, t.Buf16 = Uint16Array, t.Buf32 = Int32Array, t.assign(t, n)) : (t.Buf8 = Array, t.Buf16 = Array, t.Buf32 = Array, t.assign(t, i));
    }, t.setTyped(e);
  }(ua)), ua;
}
var Rr = {}, Ct = {}, pr = {}, Ls;
function fh() {
  if (Ls) return pr;
  Ls = 1;
  var t = ur(), e = 4, r = 0, n = 1, i = 2;
  function a(u) {
    for (var d = u.length; --d >= 0; )
      u[d] = 0;
  }
  var o = 0, s = 1, c = 2, f = 3, l = 258, w = 29, m = 256, g = m + 1 + w, b = 30, T = 19, R = 2 * g + 1, S = 15, A = 16, B = 7, N = 256, U = 16, M = 17, $ = 18, O = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  ), W = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  ), z = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  ), K = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], F = 512, Q = new Array((g + 2) * 2);
  a(Q);
  var se = new Array(b * 2);
  a(se);
  var ve = new Array(F);
  a(ve);
  var ie = new Array(l - f + 1);
  a(ie);
  var Y = new Array(w);
  a(Y);
  var ae = new Array(b);
  a(ae);
  function de(u, d, E, C, I) {
    this.static_tree = u, this.extra_bits = d, this.extra_base = E, this.elems = C, this.max_length = I, this.has_stree = u && u.length;
  }
  var Ae, Ie, _e;
  function Te(u, d) {
    this.dyn_tree = u, this.max_code = 0, this.stat_desc = d;
  }
  function ge(u) {
    return u < 256 ? ve[u] : ve[256 + (u >>> 7)];
  }
  function $e(u, d) {
    u.pending_buf[u.pending++] = d & 255, u.pending_buf[u.pending++] = d >>> 8 & 255;
  }
  function ke(u, d, E) {
    u.bi_valid > A - E ? (u.bi_buf |= d << u.bi_valid & 65535, $e(u, u.bi_buf), u.bi_buf = d >> A - u.bi_valid, u.bi_valid += E - A) : (u.bi_buf |= d << u.bi_valid & 65535, u.bi_valid += E);
  }
  function Se(u, d, E) {
    ke(
      u,
      E[d * 2],
      E[d * 2 + 1]
      /*.Len*/
    );
  }
  function Pe(u, d) {
    var E = 0;
    do
      E |= u & 1, u >>>= 1, E <<= 1;
    while (--d > 0);
    return E >>> 1;
  }
  function Ue(u) {
    u.bi_valid === 16 ? ($e(u, u.bi_buf), u.bi_buf = 0, u.bi_valid = 0) : u.bi_valid >= 8 && (u.pending_buf[u.pending++] = u.bi_buf & 255, u.bi_buf >>= 8, u.bi_valid -= 8);
  }
  function Be(u, d) {
    var E = d.dyn_tree, C = d.max_code, I = d.stat_desc.static_tree, P = d.stat_desc.has_stree, _ = d.stat_desc.extra_bits, ee = d.stat_desc.extra_base, ue = d.stat_desc.max_length, h, H, X, x, L, V, pe = 0;
    for (x = 0; x <= S; x++)
      u.bl_count[x] = 0;
    for (E[u.heap[u.heap_max] * 2 + 1] = 0, h = u.heap_max + 1; h < R; h++)
      H = u.heap[h], x = E[E[H * 2 + 1] * 2 + 1] + 1, x > ue && (x = ue, pe++), E[H * 2 + 1] = x, !(H > C) && (u.bl_count[x]++, L = 0, H >= ee && (L = _[H - ee]), V = E[H * 2], u.opt_len += V * (x + L), P && (u.static_len += V * (I[H * 2 + 1] + L)));
    if (pe !== 0) {
      do {
        for (x = ue - 1; u.bl_count[x] === 0; )
          x--;
        u.bl_count[x]--, u.bl_count[x + 1] += 2, u.bl_count[ue]--, pe -= 2;
      } while (pe > 0);
      for (x = ue; x !== 0; x--)
        for (H = u.bl_count[x]; H !== 0; )
          X = u.heap[--h], !(X > C) && (E[X * 2 + 1] !== x && (u.opt_len += (x - E[X * 2 + 1]) * E[X * 2], E[X * 2 + 1] = x), H--);
    }
  }
  function Re(u, d, E) {
    var C = new Array(S + 1), I = 0, P, _;
    for (P = 1; P <= S; P++)
      C[P] = I = I + E[P - 1] << 1;
    for (_ = 0; _ <= d; _++) {
      var ee = u[_ * 2 + 1];
      ee !== 0 && (u[_ * 2] = Pe(C[ee]++, ee));
    }
  }
  function le() {
    var u, d, E, C, I, P = new Array(S + 1);
    for (E = 0, C = 0; C < w - 1; C++)
      for (Y[C] = E, u = 0; u < 1 << O[C]; u++)
        ie[E++] = C;
    for (ie[E - 1] = C, I = 0, C = 0; C < 16; C++)
      for (ae[C] = I, u = 0; u < 1 << W[C]; u++)
        ve[I++] = C;
    for (I >>= 7; C < b; C++)
      for (ae[C] = I << 7, u = 0; u < 1 << W[C] - 7; u++)
        ve[256 + I++] = C;
    for (d = 0; d <= S; d++)
      P[d] = 0;
    for (u = 0; u <= 143; )
      Q[u * 2 + 1] = 8, u++, P[8]++;
    for (; u <= 255; )
      Q[u * 2 + 1] = 9, u++, P[9]++;
    for (; u <= 279; )
      Q[u * 2 + 1] = 7, u++, P[7]++;
    for (; u <= 287; )
      Q[u * 2 + 1] = 8, u++, P[8]++;
    for (Re(Q, g + 1, P), u = 0; u < b; u++)
      se[u * 2 + 1] = 5, se[u * 2] = Pe(u, 5);
    Ae = new de(Q, O, m + 1, g, S), Ie = new de(se, W, 0, b, S), _e = new de(new Array(0), z, 0, T, B);
  }
  function be(u) {
    var d;
    for (d = 0; d < g; d++)
      u.dyn_ltree[d * 2] = 0;
    for (d = 0; d < b; d++)
      u.dyn_dtree[d * 2] = 0;
    for (d = 0; d < T; d++)
      u.bl_tree[d * 2] = 0;
    u.dyn_ltree[N * 2] = 1, u.opt_len = u.static_len = 0, u.last_lit = u.matches = 0;
  }
  function Le(u) {
    u.bi_valid > 8 ? $e(u, u.bi_buf) : u.bi_valid > 0 && (u.pending_buf[u.pending++] = u.bi_buf), u.bi_buf = 0, u.bi_valid = 0;
  }
  function je(u, d, E, C) {
    Le(u), $e(u, E), $e(u, ~E), t.arraySet(u.pending_buf, u.window, d, E, u.pending), u.pending += E;
  }
  function Ce(u, d, E, C) {
    var I = d * 2, P = E * 2;
    return u[I] < u[P] || u[I] === u[P] && C[d] <= C[E];
  }
  function Fe(u, d, E) {
    for (var C = u.heap[E], I = E << 1; I <= u.heap_len && (I < u.heap_len && Ce(d, u.heap[I + 1], u.heap[I], u.depth) && I++, !Ce(d, C, u.heap[I], u.depth)); )
      u.heap[E] = u.heap[I], E = I, I <<= 1;
    u.heap[E] = C;
  }
  function xe(u, d, E) {
    var C, I, P = 0, _, ee;
    if (u.last_lit !== 0)
      do
        C = u.pending_buf[u.d_buf + P * 2] << 8 | u.pending_buf[u.d_buf + P * 2 + 1], I = u.pending_buf[u.l_buf + P], P++, C === 0 ? Se(u, I, d) : (_ = ie[I], Se(u, _ + m + 1, d), ee = O[_], ee !== 0 && (I -= Y[_], ke(u, I, ee)), C--, _ = ge(C), Se(u, _, E), ee = W[_], ee !== 0 && (C -= ae[_], ke(u, C, ee)));
      while (P < u.last_lit);
    Se(u, N, d);
  }
  function rt(u, d) {
    var E = d.dyn_tree, C = d.stat_desc.static_tree, I = d.stat_desc.has_stree, P = d.stat_desc.elems, _, ee, ue = -1, h;
    for (u.heap_len = 0, u.heap_max = R, _ = 0; _ < P; _++)
      E[_ * 2] !== 0 ? (u.heap[++u.heap_len] = ue = _, u.depth[_] = 0) : E[_ * 2 + 1] = 0;
    for (; u.heap_len < 2; )
      h = u.heap[++u.heap_len] = ue < 2 ? ++ue : 0, E[h * 2] = 1, u.depth[h] = 0, u.opt_len--, I && (u.static_len -= C[h * 2 + 1]);
    for (d.max_code = ue, _ = u.heap_len >> 1; _ >= 1; _--)
      Fe(u, E, _);
    h = P;
    do
      _ = u.heap[
        1
        /*SMALLEST*/
      ], u.heap[
        1
        /*SMALLEST*/
      ] = u.heap[u.heap_len--], Fe(
        u,
        E,
        1
        /*SMALLEST*/
      ), ee = u.heap[
        1
        /*SMALLEST*/
      ], u.heap[--u.heap_max] = _, u.heap[--u.heap_max] = ee, E[h * 2] = E[_ * 2] + E[ee * 2], u.depth[h] = (u.depth[_] >= u.depth[ee] ? u.depth[_] : u.depth[ee]) + 1, E[_ * 2 + 1] = E[ee * 2 + 1] = h, u.heap[
        1
        /*SMALLEST*/
      ] = h++, Fe(
        u,
        E,
        1
        /*SMALLEST*/
      );
    while (u.heap_len >= 2);
    u.heap[--u.heap_max] = u.heap[
      1
      /*SMALLEST*/
    ], Be(u, d), Re(E, ue, u.bl_count);
  }
  function ct(u, d, E) {
    var C, I = -1, P, _ = d[0 * 2 + 1], ee = 0, ue = 7, h = 4;
    for (_ === 0 && (ue = 138, h = 3), d[(E + 1) * 2 + 1] = 65535, C = 0; C <= E; C++)
      P = _, _ = d[(C + 1) * 2 + 1], !(++ee < ue && P === _) && (ee < h ? u.bl_tree[P * 2] += ee : P !== 0 ? (P !== I && u.bl_tree[P * 2]++, u.bl_tree[U * 2]++) : ee <= 10 ? u.bl_tree[M * 2]++ : u.bl_tree[$ * 2]++, ee = 0, I = P, _ === 0 ? (ue = 138, h = 3) : P === _ ? (ue = 6, h = 3) : (ue = 7, h = 4));
  }
  function et(u, d, E) {
    var C, I = -1, P, _ = d[0 * 2 + 1], ee = 0, ue = 7, h = 4;
    for (_ === 0 && (ue = 138, h = 3), C = 0; C <= E; C++)
      if (P = _, _ = d[(C + 1) * 2 + 1], !(++ee < ue && P === _)) {
        if (ee < h)
          do
            Se(u, P, u.bl_tree);
          while (--ee !== 0);
        else P !== 0 ? (P !== I && (Se(u, P, u.bl_tree), ee--), Se(u, U, u.bl_tree), ke(u, ee - 3, 2)) : ee <= 10 ? (Se(u, M, u.bl_tree), ke(u, ee - 3, 3)) : (Se(u, $, u.bl_tree), ke(u, ee - 11, 7));
        ee = 0, I = P, _ === 0 ? (ue = 138, h = 3) : P === _ ? (ue = 6, h = 3) : (ue = 7, h = 4);
      }
  }
  function Me(u) {
    var d;
    for (ct(u, u.dyn_ltree, u.l_desc.max_code), ct(u, u.dyn_dtree, u.d_desc.max_code), rt(u, u.bl_desc), d = T - 1; d >= 3 && u.bl_tree[K[d] * 2 + 1] === 0; d--)
      ;
    return u.opt_len += 3 * (d + 1) + 5 + 5 + 4, d;
  }
  function qe(u, d, E, C) {
    var I;
    for (ke(u, d - 257, 5), ke(u, E - 1, 5), ke(u, C - 4, 4), I = 0; I < C; I++)
      ke(u, u.bl_tree[K[I] * 2 + 1], 3);
    et(u, u.dyn_ltree, d - 1), et(u, u.dyn_dtree, E - 1);
  }
  function nt(u) {
    var d = 4093624447, E;
    for (E = 0; E <= 31; E++, d >>>= 1)
      if (d & 1 && u.dyn_ltree[E * 2] !== 0)
        return r;
    if (u.dyn_ltree[9 * 2] !== 0 || u.dyn_ltree[10 * 2] !== 0 || u.dyn_ltree[13 * 2] !== 0)
      return n;
    for (E = 32; E < m; E++)
      if (u.dyn_ltree[E * 2] !== 0)
        return n;
    return r;
  }
  var Xe = !1;
  function St(u) {
    Xe || (le(), Xe = !0), u.l_desc = new Te(u.dyn_ltree, Ae), u.d_desc = new Te(u.dyn_dtree, Ie), u.bl_desc = new Te(u.bl_tree, _e), u.bi_buf = 0, u.bi_valid = 0, be(u);
  }
  function kt(u, d, E, C) {
    ke(u, (o << 1) + (C ? 1 : 0), 3), je(u, d, E);
  }
  function He(u) {
    ke(u, s << 1, 3), Se(u, N, Q), Ue(u);
  }
  function st(u, d, E, C) {
    var I, P, _ = 0;
    u.level > 0 ? (u.strm.data_type === i && (u.strm.data_type = nt(u)), rt(u, u.l_desc), rt(u, u.d_desc), _ = Me(u), I = u.opt_len + 3 + 7 >>> 3, P = u.static_len + 3 + 7 >>> 3, P <= I && (I = P)) : I = P = E + 5, E + 4 <= I && d !== -1 ? kt(u, d, E, C) : u.strategy === e || P === I ? (ke(u, (s << 1) + (C ? 1 : 0), 3), xe(u, Q, se)) : (ke(u, (c << 1) + (C ? 1 : 0), 3), qe(u, u.l_desc.max_code + 1, u.d_desc.max_code + 1, _ + 1), xe(u, u.dyn_ltree, u.dyn_dtree)), be(u), C && Le(u);
  }
  function k(u, d, E) {
    return u.pending_buf[u.d_buf + u.last_lit * 2] = d >>> 8 & 255, u.pending_buf[u.d_buf + u.last_lit * 2 + 1] = d & 255, u.pending_buf[u.l_buf + u.last_lit] = E & 255, u.last_lit++, d === 0 ? u.dyn_ltree[E * 2]++ : (u.matches++, d--, u.dyn_ltree[(ie[E] + m + 1) * 2]++, u.dyn_dtree[ge(d) * 2]++), u.last_lit === u.lit_bufsize - 1;
  }
  return pr._tr_init = St, pr._tr_stored_block = kt, pr._tr_flush_block = st, pr._tr_tally = k, pr._tr_align = He, pr;
}
var fa, zs;
function yl() {
  if (zs) return fa;
  zs = 1;
  function t(e, r, n, i) {
    for (var a = e & 65535 | 0, o = e >>> 16 & 65535 | 0, s = 0; n !== 0; ) {
      s = n > 2e3 ? 2e3 : n, n -= s;
      do
        a = a + r[i++] | 0, o = o + a | 0;
      while (--s);
      a %= 65521, o %= 65521;
    }
    return a | o << 16 | 0;
  }
  return fa = t, fa;
}
var ha, qs;
function gl() {
  if (qs) return ha;
  qs = 1;
  function t() {
    for (var n, i = [], a = 0; a < 256; a++) {
      n = a;
      for (var o = 0; o < 8; o++)
        n = n & 1 ? 3988292384 ^ n >>> 1 : n >>> 1;
      i[a] = n;
    }
    return i;
  }
  var e = t();
  function r(n, i, a, o) {
    var s = e, c = o + a;
    n ^= -1;
    for (var f = o; f < c; f++)
      n = n >>> 8 ^ s[(n ^ i[f]) & 255];
    return n ^ -1;
  }
  return ha = r, ha;
}
var da, Ws;
function go() {
  return Ws || (Ws = 1, da = {
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
  }), da;
}
var Hs;
function hh() {
  if (Hs) return Ct;
  Hs = 1;
  var t = ur(), e = fh(), r = yl(), n = gl(), i = go(), a = 0, o = 1, s = 3, c = 4, f = 5, l = 0, w = 1, m = -2, g = -3, b = -5, T = -1, R = 1, S = 2, A = 3, B = 4, N = 0, U = 2, M = 8, $ = 9, O = 15, W = 8, z = 29, K = 256, F = K + 1 + z, Q = 30, se = 19, ve = 2 * F + 1, ie = 15, Y = 3, ae = 258, de = ae + Y + 1, Ae = 32, Ie = 42, _e = 69, Te = 73, ge = 91, $e = 103, ke = 113, Se = 666, Pe = 1, Ue = 2, Be = 3, Re = 4, le = 3;
  function be(h, H) {
    return h.msg = i[H], H;
  }
  function Le(h) {
    return (h << 1) - (h > 4 ? 9 : 0);
  }
  function je(h) {
    for (var H = h.length; --H >= 0; )
      h[H] = 0;
  }
  function Ce(h) {
    var H = h.state, X = H.pending;
    X > h.avail_out && (X = h.avail_out), X !== 0 && (t.arraySet(h.output, H.pending_buf, H.pending_out, X, h.next_out), h.next_out += X, H.pending_out += X, h.total_out += X, h.avail_out -= X, H.pending -= X, H.pending === 0 && (H.pending_out = 0));
  }
  function Fe(h, H) {
    e._tr_flush_block(h, h.block_start >= 0 ? h.block_start : -1, h.strstart - h.block_start, H), h.block_start = h.strstart, Ce(h.strm);
  }
  function xe(h, H) {
    h.pending_buf[h.pending++] = H;
  }
  function rt(h, H) {
    h.pending_buf[h.pending++] = H >>> 8 & 255, h.pending_buf[h.pending++] = H & 255;
  }
  function ct(h, H, X, x) {
    var L = h.avail_in;
    return L > x && (L = x), L === 0 ? 0 : (h.avail_in -= L, t.arraySet(H, h.input, h.next_in, L, X), h.state.wrap === 1 ? h.adler = r(h.adler, H, L, X) : h.state.wrap === 2 && (h.adler = n(h.adler, H, L, X)), h.next_in += L, h.total_in += L, L);
  }
  function et(h, H) {
    var X = h.max_chain_length, x = h.strstart, L, V, pe = h.prev_length, fe = h.nice_match, v = h.strstart > h.w_size - de ? h.strstart - (h.w_size - de) : 0, p = h.window, y = h.w_mask, D = h.prev, j = h.strstart + ae, G = p[x + pe - 1], J = p[x + pe];
    h.prev_length >= h.good_match && (X >>= 2), fe > h.lookahead && (fe = h.lookahead);
    do
      if (L = H, !(p[L + pe] !== J || p[L + pe - 1] !== G || p[L] !== p[x] || p[++L] !== p[x + 1])) {
        x += 2, L++;
        do
          ;
        while (p[++x] === p[++L] && p[++x] === p[++L] && p[++x] === p[++L] && p[++x] === p[++L] && p[++x] === p[++L] && p[++x] === p[++L] && p[++x] === p[++L] && p[++x] === p[++L] && x < j);
        if (V = ae - (j - x), x = j - ae, V > pe) {
          if (h.match_start = H, pe = V, V >= fe)
            break;
          G = p[x + pe - 1], J = p[x + pe];
        }
      }
    while ((H = D[H & y]) > v && --X !== 0);
    return pe <= h.lookahead ? pe : h.lookahead;
  }
  function Me(h) {
    var H = h.w_size, X, x, L, V, pe;
    do {
      if (V = h.window_size - h.lookahead - h.strstart, h.strstart >= H + (H - de)) {
        t.arraySet(h.window, h.window, H, H, 0), h.match_start -= H, h.strstart -= H, h.block_start -= H, x = h.hash_size, X = x;
        do
          L = h.head[--X], h.head[X] = L >= H ? L - H : 0;
        while (--x);
        x = H, X = x;
        do
          L = h.prev[--X], h.prev[X] = L >= H ? L - H : 0;
        while (--x);
        V += H;
      }
      if (h.strm.avail_in === 0)
        break;
      if (x = ct(h.strm, h.window, h.strstart + h.lookahead, V), h.lookahead += x, h.lookahead + h.insert >= Y)
        for (pe = h.strstart - h.insert, h.ins_h = h.window[pe], h.ins_h = (h.ins_h << h.hash_shift ^ h.window[pe + 1]) & h.hash_mask; h.insert && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[pe + Y - 1]) & h.hash_mask, h.prev[pe & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = pe, pe++, h.insert--, !(h.lookahead + h.insert < Y)); )
          ;
    } while (h.lookahead < de && h.strm.avail_in !== 0);
  }
  function qe(h, H) {
    var X = 65535;
    for (X > h.pending_buf_size - 5 && (X = h.pending_buf_size - 5); ; ) {
      if (h.lookahead <= 1) {
        if (Me(h), h.lookahead === 0 && H === a)
          return Pe;
        if (h.lookahead === 0)
          break;
      }
      h.strstart += h.lookahead, h.lookahead = 0;
      var x = h.block_start + X;
      if ((h.strstart === 0 || h.strstart >= x) && (h.lookahead = h.strstart - x, h.strstart = x, Fe(h, !1), h.strm.avail_out === 0) || h.strstart - h.block_start >= h.w_size - de && (Fe(h, !1), h.strm.avail_out === 0))
        return Pe;
    }
    return h.insert = 0, H === c ? (Fe(h, !0), h.strm.avail_out === 0 ? Be : Re) : (h.strstart > h.block_start && (Fe(h, !1), h.strm.avail_out === 0), Pe);
  }
  function nt(h, H) {
    for (var X, x; ; ) {
      if (h.lookahead < de) {
        if (Me(h), h.lookahead < de && H === a)
          return Pe;
        if (h.lookahead === 0)
          break;
      }
      if (X = 0, h.lookahead >= Y && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + Y - 1]) & h.hash_mask, X = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), X !== 0 && h.strstart - X <= h.w_size - de && (h.match_length = et(h, X)), h.match_length >= Y)
        if (x = e._tr_tally(h, h.strstart - h.match_start, h.match_length - Y), h.lookahead -= h.match_length, h.match_length <= h.max_lazy_match && h.lookahead >= Y) {
          h.match_length--;
          do
            h.strstart++, h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + Y - 1]) & h.hash_mask, X = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart;
          while (--h.match_length !== 0);
          h.strstart++;
        } else
          h.strstart += h.match_length, h.match_length = 0, h.ins_h = h.window[h.strstart], h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + 1]) & h.hash_mask;
      else
        x = e._tr_tally(h, 0, h.window[h.strstart]), h.lookahead--, h.strstart++;
      if (x && (Fe(h, !1), h.strm.avail_out === 0))
        return Pe;
    }
    return h.insert = h.strstart < Y - 1 ? h.strstart : Y - 1, H === c ? (Fe(h, !0), h.strm.avail_out === 0 ? Be : Re) : h.last_lit && (Fe(h, !1), h.strm.avail_out === 0) ? Pe : Ue;
  }
  function Xe(h, H) {
    for (var X, x, L; ; ) {
      if (h.lookahead < de) {
        if (Me(h), h.lookahead < de && H === a)
          return Pe;
        if (h.lookahead === 0)
          break;
      }
      if (X = 0, h.lookahead >= Y && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + Y - 1]) & h.hash_mask, X = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), h.prev_length = h.match_length, h.prev_match = h.match_start, h.match_length = Y - 1, X !== 0 && h.prev_length < h.max_lazy_match && h.strstart - X <= h.w_size - de && (h.match_length = et(h, X), h.match_length <= 5 && (h.strategy === R || h.match_length === Y && h.strstart - h.match_start > 4096) && (h.match_length = Y - 1)), h.prev_length >= Y && h.match_length <= h.prev_length) {
        L = h.strstart + h.lookahead - Y, x = e._tr_tally(h, h.strstart - 1 - h.prev_match, h.prev_length - Y), h.lookahead -= h.prev_length - 1, h.prev_length -= 2;
        do
          ++h.strstart <= L && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + Y - 1]) & h.hash_mask, X = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart);
        while (--h.prev_length !== 0);
        if (h.match_available = 0, h.match_length = Y - 1, h.strstart++, x && (Fe(h, !1), h.strm.avail_out === 0))
          return Pe;
      } else if (h.match_available) {
        if (x = e._tr_tally(h, 0, h.window[h.strstart - 1]), x && Fe(h, !1), h.strstart++, h.lookahead--, h.strm.avail_out === 0)
          return Pe;
      } else
        h.match_available = 1, h.strstart++, h.lookahead--;
    }
    return h.match_available && (x = e._tr_tally(h, 0, h.window[h.strstart - 1]), h.match_available = 0), h.insert = h.strstart < Y - 1 ? h.strstart : Y - 1, H === c ? (Fe(h, !0), h.strm.avail_out === 0 ? Be : Re) : h.last_lit && (Fe(h, !1), h.strm.avail_out === 0) ? Pe : Ue;
  }
  function St(h, H) {
    for (var X, x, L, V, pe = h.window; ; ) {
      if (h.lookahead <= ae) {
        if (Me(h), h.lookahead <= ae && H === a)
          return Pe;
        if (h.lookahead === 0)
          break;
      }
      if (h.match_length = 0, h.lookahead >= Y && h.strstart > 0 && (L = h.strstart - 1, x = pe[L], x === pe[++L] && x === pe[++L] && x === pe[++L])) {
        V = h.strstart + ae;
        do
          ;
        while (x === pe[++L] && x === pe[++L] && x === pe[++L] && x === pe[++L] && x === pe[++L] && x === pe[++L] && x === pe[++L] && x === pe[++L] && L < V);
        h.match_length = ae - (V - L), h.match_length > h.lookahead && (h.match_length = h.lookahead);
      }
      if (h.match_length >= Y ? (X = e._tr_tally(h, 1, h.match_length - Y), h.lookahead -= h.match_length, h.strstart += h.match_length, h.match_length = 0) : (X = e._tr_tally(h, 0, h.window[h.strstart]), h.lookahead--, h.strstart++), X && (Fe(h, !1), h.strm.avail_out === 0))
        return Pe;
    }
    return h.insert = 0, H === c ? (Fe(h, !0), h.strm.avail_out === 0 ? Be : Re) : h.last_lit && (Fe(h, !1), h.strm.avail_out === 0) ? Pe : Ue;
  }
  function kt(h, H) {
    for (var X; ; ) {
      if (h.lookahead === 0 && (Me(h), h.lookahead === 0)) {
        if (H === a)
          return Pe;
        break;
      }
      if (h.match_length = 0, X = e._tr_tally(h, 0, h.window[h.strstart]), h.lookahead--, h.strstart++, X && (Fe(h, !1), h.strm.avail_out === 0))
        return Pe;
    }
    return h.insert = 0, H === c ? (Fe(h, !0), h.strm.avail_out === 0 ? Be : Re) : h.last_lit && (Fe(h, !1), h.strm.avail_out === 0) ? Pe : Ue;
  }
  function He(h, H, X, x, L) {
    this.good_length = h, this.max_lazy = H, this.nice_length = X, this.max_chain = x, this.func = L;
  }
  var st;
  st = [
    /*      good lazy nice chain */
    new He(0, 0, 0, 0, qe),
    /* 0 store only */
    new He(4, 4, 8, 4, nt),
    /* 1 max speed, no lazy matches */
    new He(4, 5, 16, 8, nt),
    /* 2 */
    new He(4, 6, 32, 32, nt),
    /* 3 */
    new He(4, 4, 16, 16, Xe),
    /* 4 lazy matches */
    new He(8, 16, 32, 32, Xe),
    /* 5 */
    new He(8, 16, 128, 128, Xe),
    /* 6 */
    new He(8, 32, 128, 256, Xe),
    /* 7 */
    new He(32, 128, 258, 1024, Xe),
    /* 8 */
    new He(32, 258, 258, 4096, Xe)
    /* 9 max compression */
  ];
  function k(h) {
    h.window_size = 2 * h.w_size, je(h.head), h.max_lazy_match = st[h.level].max_lazy, h.good_match = st[h.level].good_length, h.nice_match = st[h.level].nice_length, h.max_chain_length = st[h.level].max_chain, h.strstart = 0, h.block_start = 0, h.lookahead = 0, h.insert = 0, h.match_length = h.prev_length = Y - 1, h.match_available = 0, h.ins_h = 0;
  }
  function u() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = M, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new t.Buf16(ve * 2), this.dyn_dtree = new t.Buf16((2 * Q + 1) * 2), this.bl_tree = new t.Buf16((2 * se + 1) * 2), je(this.dyn_ltree), je(this.dyn_dtree), je(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new t.Buf16(ie + 1), this.heap = new t.Buf16(2 * F + 1), je(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new t.Buf16(2 * F + 1), je(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  function d(h) {
    var H;
    return !h || !h.state ? be(h, m) : (h.total_in = h.total_out = 0, h.data_type = U, H = h.state, H.pending = 0, H.pending_out = 0, H.wrap < 0 && (H.wrap = -H.wrap), H.status = H.wrap ? Ie : ke, h.adler = H.wrap === 2 ? 0 : 1, H.last_flush = a, e._tr_init(H), l);
  }
  function E(h) {
    var H = d(h);
    return H === l && k(h.state), H;
  }
  function C(h, H) {
    return !h || !h.state || h.state.wrap !== 2 ? m : (h.state.gzhead = H, l);
  }
  function I(h, H, X, x, L, V) {
    if (!h)
      return m;
    var pe = 1;
    if (H === T && (H = 6), x < 0 ? (pe = 0, x = -x) : x > 15 && (pe = 2, x -= 16), L < 1 || L > $ || X !== M || x < 8 || x > 15 || H < 0 || H > 9 || V < 0 || V > B)
      return be(h, m);
    x === 8 && (x = 9);
    var fe = new u();
    return h.state = fe, fe.strm = h, fe.wrap = pe, fe.gzhead = null, fe.w_bits = x, fe.w_size = 1 << fe.w_bits, fe.w_mask = fe.w_size - 1, fe.hash_bits = L + 7, fe.hash_size = 1 << fe.hash_bits, fe.hash_mask = fe.hash_size - 1, fe.hash_shift = ~~((fe.hash_bits + Y - 1) / Y), fe.window = new t.Buf8(fe.w_size * 2), fe.head = new t.Buf16(fe.hash_size), fe.prev = new t.Buf16(fe.w_size), fe.lit_bufsize = 1 << L + 6, fe.pending_buf_size = fe.lit_bufsize * 4, fe.pending_buf = new t.Buf8(fe.pending_buf_size), fe.d_buf = 1 * fe.lit_bufsize, fe.l_buf = 3 * fe.lit_bufsize, fe.level = H, fe.strategy = V, fe.method = X, E(h);
  }
  function P(h, H) {
    return I(h, H, M, O, W, N);
  }
  function _(h, H) {
    var X, x, L, V;
    if (!h || !h.state || H > f || H < 0)
      return h ? be(h, m) : m;
    if (x = h.state, !h.output || !h.input && h.avail_in !== 0 || x.status === Se && H !== c)
      return be(h, h.avail_out === 0 ? b : m);
    if (x.strm = h, X = x.last_flush, x.last_flush = H, x.status === Ie)
      if (x.wrap === 2)
        h.adler = 0, xe(x, 31), xe(x, 139), xe(x, 8), x.gzhead ? (xe(
          x,
          (x.gzhead.text ? 1 : 0) + (x.gzhead.hcrc ? 2 : 0) + (x.gzhead.extra ? 4 : 0) + (x.gzhead.name ? 8 : 0) + (x.gzhead.comment ? 16 : 0)
        ), xe(x, x.gzhead.time & 255), xe(x, x.gzhead.time >> 8 & 255), xe(x, x.gzhead.time >> 16 & 255), xe(x, x.gzhead.time >> 24 & 255), xe(x, x.level === 9 ? 2 : x.strategy >= S || x.level < 2 ? 4 : 0), xe(x, x.gzhead.os & 255), x.gzhead.extra && x.gzhead.extra.length && (xe(x, x.gzhead.extra.length & 255), xe(x, x.gzhead.extra.length >> 8 & 255)), x.gzhead.hcrc && (h.adler = n(h.adler, x.pending_buf, x.pending, 0)), x.gzindex = 0, x.status = _e) : (xe(x, 0), xe(x, 0), xe(x, 0), xe(x, 0), xe(x, 0), xe(x, x.level === 9 ? 2 : x.strategy >= S || x.level < 2 ? 4 : 0), xe(x, le), x.status = ke);
      else {
        var pe = M + (x.w_bits - 8 << 4) << 8, fe = -1;
        x.strategy >= S || x.level < 2 ? fe = 0 : x.level < 6 ? fe = 1 : x.level === 6 ? fe = 2 : fe = 3, pe |= fe << 6, x.strstart !== 0 && (pe |= Ae), pe += 31 - pe % 31, x.status = ke, rt(x, pe), x.strstart !== 0 && (rt(x, h.adler >>> 16), rt(x, h.adler & 65535)), h.adler = 1;
      }
    if (x.status === _e)
      if (x.gzhead.extra) {
        for (L = x.pending; x.gzindex < (x.gzhead.extra.length & 65535) && !(x.pending === x.pending_buf_size && (x.gzhead.hcrc && x.pending > L && (h.adler = n(h.adler, x.pending_buf, x.pending - L, L)), Ce(h), L = x.pending, x.pending === x.pending_buf_size)); )
          xe(x, x.gzhead.extra[x.gzindex] & 255), x.gzindex++;
        x.gzhead.hcrc && x.pending > L && (h.adler = n(h.adler, x.pending_buf, x.pending - L, L)), x.gzindex === x.gzhead.extra.length && (x.gzindex = 0, x.status = Te);
      } else
        x.status = Te;
    if (x.status === Te)
      if (x.gzhead.name) {
        L = x.pending;
        do {
          if (x.pending === x.pending_buf_size && (x.gzhead.hcrc && x.pending > L && (h.adler = n(h.adler, x.pending_buf, x.pending - L, L)), Ce(h), L = x.pending, x.pending === x.pending_buf_size)) {
            V = 1;
            break;
          }
          x.gzindex < x.gzhead.name.length ? V = x.gzhead.name.charCodeAt(x.gzindex++) & 255 : V = 0, xe(x, V);
        } while (V !== 0);
        x.gzhead.hcrc && x.pending > L && (h.adler = n(h.adler, x.pending_buf, x.pending - L, L)), V === 0 && (x.gzindex = 0, x.status = ge);
      } else
        x.status = ge;
    if (x.status === ge)
      if (x.gzhead.comment) {
        L = x.pending;
        do {
          if (x.pending === x.pending_buf_size && (x.gzhead.hcrc && x.pending > L && (h.adler = n(h.adler, x.pending_buf, x.pending - L, L)), Ce(h), L = x.pending, x.pending === x.pending_buf_size)) {
            V = 1;
            break;
          }
          x.gzindex < x.gzhead.comment.length ? V = x.gzhead.comment.charCodeAt(x.gzindex++) & 255 : V = 0, xe(x, V);
        } while (V !== 0);
        x.gzhead.hcrc && x.pending > L && (h.adler = n(h.adler, x.pending_buf, x.pending - L, L)), V === 0 && (x.status = $e);
      } else
        x.status = $e;
    if (x.status === $e && (x.gzhead.hcrc ? (x.pending + 2 > x.pending_buf_size && Ce(h), x.pending + 2 <= x.pending_buf_size && (xe(x, h.adler & 255), xe(x, h.adler >> 8 & 255), h.adler = 0, x.status = ke)) : x.status = ke), x.pending !== 0) {
      if (Ce(h), h.avail_out === 0)
        return x.last_flush = -1, l;
    } else if (h.avail_in === 0 && Le(H) <= Le(X) && H !== c)
      return be(h, b);
    if (x.status === Se && h.avail_in !== 0)
      return be(h, b);
    if (h.avail_in !== 0 || x.lookahead !== 0 || H !== a && x.status !== Se) {
      var v = x.strategy === S ? kt(x, H) : x.strategy === A ? St(x, H) : st[x.level].func(x, H);
      if ((v === Be || v === Re) && (x.status = Se), v === Pe || v === Be)
        return h.avail_out === 0 && (x.last_flush = -1), l;
      if (v === Ue && (H === o ? e._tr_align(x) : H !== f && (e._tr_stored_block(x, 0, 0, !1), H === s && (je(x.head), x.lookahead === 0 && (x.strstart = 0, x.block_start = 0, x.insert = 0))), Ce(h), h.avail_out === 0))
        return x.last_flush = -1, l;
    }
    return H !== c ? l : x.wrap <= 0 ? w : (x.wrap === 2 ? (xe(x, h.adler & 255), xe(x, h.adler >> 8 & 255), xe(x, h.adler >> 16 & 255), xe(x, h.adler >> 24 & 255), xe(x, h.total_in & 255), xe(x, h.total_in >> 8 & 255), xe(x, h.total_in >> 16 & 255), xe(x, h.total_in >> 24 & 255)) : (rt(x, h.adler >>> 16), rt(x, h.adler & 65535)), Ce(h), x.wrap > 0 && (x.wrap = -x.wrap), x.pending !== 0 ? l : w);
  }
  function ee(h) {
    var H;
    return !h || !h.state ? m : (H = h.state.status, H !== Ie && H !== _e && H !== Te && H !== ge && H !== $e && H !== ke && H !== Se ? be(h, m) : (h.state = null, H === ke ? be(h, g) : l));
  }
  function ue(h, H) {
    var X = H.length, x, L, V, pe, fe, v, p, y;
    if (!h || !h.state || (x = h.state, pe = x.wrap, pe === 2 || pe === 1 && x.status !== Ie || x.lookahead))
      return m;
    for (pe === 1 && (h.adler = r(h.adler, H, X, 0)), x.wrap = 0, X >= x.w_size && (pe === 0 && (je(x.head), x.strstart = 0, x.block_start = 0, x.insert = 0), y = new t.Buf8(x.w_size), t.arraySet(y, H, X - x.w_size, x.w_size, 0), H = y, X = x.w_size), fe = h.avail_in, v = h.next_in, p = h.input, h.avail_in = X, h.next_in = 0, h.input = H, Me(x); x.lookahead >= Y; ) {
      L = x.strstart, V = x.lookahead - (Y - 1);
      do
        x.ins_h = (x.ins_h << x.hash_shift ^ x.window[L + Y - 1]) & x.hash_mask, x.prev[L & x.w_mask] = x.head[x.ins_h], x.head[x.ins_h] = L, L++;
      while (--V);
      x.strstart = L, x.lookahead = Y - 1, Me(x);
    }
    return x.strstart += x.lookahead, x.block_start = x.strstart, x.insert = x.lookahead, x.lookahead = 0, x.match_length = x.prev_length = Y - 1, x.match_available = 0, h.next_in = v, h.input = p, h.avail_in = fe, x.wrap = pe, l;
  }
  return Ct.deflateInit = P, Ct.deflateInit2 = I, Ct.deflateReset = E, Ct.deflateResetKeep = d, Ct.deflateSetHeader = C, Ct.deflate = _, Ct.deflateEnd = ee, Ct.deflateSetDictionary = ue, Ct.deflateInfo = "pako deflate (from Nodeca project)", Ct;
}
var wr = {}, Gs;
function vl() {
  if (Gs) return wr;
  Gs = 1;
  var t = ur(), e = !0, r = !0;
  try {
    String.fromCharCode.apply(null, [0]);
  } catch {
    e = !1;
  }
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch {
    r = !1;
  }
  for (var n = new t.Buf8(256), i = 0; i < 256; i++)
    n[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
  n[254] = n[254] = 1, wr.string2buf = function(o) {
    var s, c, f, l, w, m = o.length, g = 0;
    for (l = 0; l < m; l++)
      c = o.charCodeAt(l), (c & 64512) === 55296 && l + 1 < m && (f = o.charCodeAt(l + 1), (f & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (f - 56320), l++)), g += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    for (s = new t.Buf8(g), w = 0, l = 0; w < g; l++)
      c = o.charCodeAt(l), (c & 64512) === 55296 && l + 1 < m && (f = o.charCodeAt(l + 1), (f & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (f - 56320), l++)), c < 128 ? s[w++] = c : c < 2048 ? (s[w++] = 192 | c >>> 6, s[w++] = 128 | c & 63) : c < 65536 ? (s[w++] = 224 | c >>> 12, s[w++] = 128 | c >>> 6 & 63, s[w++] = 128 | c & 63) : (s[w++] = 240 | c >>> 18, s[w++] = 128 | c >>> 12 & 63, s[w++] = 128 | c >>> 6 & 63, s[w++] = 128 | c & 63);
    return s;
  };
  function a(o, s) {
    if (s < 65534 && (o.subarray && r || !o.subarray && e))
      return String.fromCharCode.apply(null, t.shrinkBuf(o, s));
    for (var c = "", f = 0; f < s; f++)
      c += String.fromCharCode(o[f]);
    return c;
  }
  return wr.buf2binstring = function(o) {
    return a(o, o.length);
  }, wr.binstring2buf = function(o) {
    for (var s = new t.Buf8(o.length), c = 0, f = s.length; c < f; c++)
      s[c] = o.charCodeAt(c);
    return s;
  }, wr.buf2string = function(o, s) {
    var c, f, l, w, m = s || o.length, g = new Array(m * 2);
    for (f = 0, c = 0; c < m; ) {
      if (l = o[c++], l < 128) {
        g[f++] = l;
        continue;
      }
      if (w = n[l], w > 4) {
        g[f++] = 65533, c += w - 1;
        continue;
      }
      for (l &= w === 2 ? 31 : w === 3 ? 15 : 7; w > 1 && c < m; )
        l = l << 6 | o[c++] & 63, w--;
      if (w > 1) {
        g[f++] = 65533;
        continue;
      }
      l < 65536 ? g[f++] = l : (l -= 65536, g[f++] = 55296 | l >> 10 & 1023, g[f++] = 56320 | l & 1023);
    }
    return a(g, f);
  }, wr.utf8border = function(o, s) {
    var c;
    for (s = s || o.length, s > o.length && (s = o.length), c = s - 1; c >= 0 && (o[c] & 192) === 128; )
      c--;
    return c < 0 || c === 0 ? s : c + n[o[c]] > s ? c : s;
  }, wr;
}
var pa, Zs;
function _l() {
  if (Zs) return pa;
  Zs = 1;
  function t() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return pa = t, pa;
}
var Vs;
function dh() {
  if (Vs) return Rr;
  Vs = 1;
  var t = hh(), e = ur(), r = vl(), n = go(), i = _l(), a = Object.prototype.toString, o = 0, s = 4, c = 0, f = 1, l = 2, w = -1, m = 0, g = 8;
  function b(A) {
    if (!(this instanceof b)) return new b(A);
    this.options = e.assign({
      level: w,
      method: g,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: m,
      to: ""
    }, A || {});
    var B = this.options;
    B.raw && B.windowBits > 0 ? B.windowBits = -B.windowBits : B.gzip && B.windowBits > 0 && B.windowBits < 16 && (B.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new i(), this.strm.avail_out = 0;
    var N = t.deflateInit2(
      this.strm,
      B.level,
      B.method,
      B.windowBits,
      B.memLevel,
      B.strategy
    );
    if (N !== c)
      throw new Error(n[N]);
    if (B.header && t.deflateSetHeader(this.strm, B.header), B.dictionary) {
      var U;
      if (typeof B.dictionary == "string" ? U = r.string2buf(B.dictionary) : a.call(B.dictionary) === "[object ArrayBuffer]" ? U = new Uint8Array(B.dictionary) : U = B.dictionary, N = t.deflateSetDictionary(this.strm, U), N !== c)
        throw new Error(n[N]);
      this._dict_set = !0;
    }
  }
  b.prototype.push = function(A, B) {
    var N = this.strm, U = this.options.chunkSize, M, $;
    if (this.ended)
      return !1;
    $ = B === ~~B ? B : B === !0 ? s : o, typeof A == "string" ? N.input = r.string2buf(A) : a.call(A) === "[object ArrayBuffer]" ? N.input = new Uint8Array(A) : N.input = A, N.next_in = 0, N.avail_in = N.input.length;
    do {
      if (N.avail_out === 0 && (N.output = new e.Buf8(U), N.next_out = 0, N.avail_out = U), M = t.deflate(N, $), M !== f && M !== c)
        return this.onEnd(M), this.ended = !0, !1;
      (N.avail_out === 0 || N.avail_in === 0 && ($ === s || $ === l)) && (this.options.to === "string" ? this.onData(r.buf2binstring(e.shrinkBuf(N.output, N.next_out))) : this.onData(e.shrinkBuf(N.output, N.next_out)));
    } while ((N.avail_in > 0 || N.avail_out === 0) && M !== f);
    return $ === s ? (M = t.deflateEnd(this.strm), this.onEnd(M), this.ended = !0, M === c) : ($ === l && (this.onEnd(c), N.avail_out = 0), !0);
  }, b.prototype.onData = function(A) {
    this.chunks.push(A);
  }, b.prototype.onEnd = function(A) {
    A === c && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = A, this.msg = this.strm.msg;
  };
  function T(A, B) {
    var N = new b(B);
    if (N.push(A, !0), N.err)
      throw N.msg || n[N.err];
    return N.result;
  }
  function R(A, B) {
    return B = B || {}, B.raw = !0, T(A, B);
  }
  function S(A, B) {
    return B = B || {}, B.gzip = !0, T(A, B);
  }
  return Rr.Deflate = b, Rr.deflate = T, Rr.deflateRaw = R, Rr.gzip = S, Rr;
}
var Tr = {}, It = {}, wa, Xs;
function ph() {
  if (Xs) return wa;
  Xs = 1;
  var t = 30, e = 12;
  return wa = function(n, i) {
    var a, o, s, c, f, l, w, m, g, b, T, R, S, A, B, N, U, M, $, O, W, z, K, F, Q;
    a = n.state, o = n.next_in, F = n.input, s = o + (n.avail_in - 5), c = n.next_out, Q = n.output, f = c - (i - n.avail_out), l = c + (n.avail_out - 257), w = a.dmax, m = a.wsize, g = a.whave, b = a.wnext, T = a.window, R = a.hold, S = a.bits, A = a.lencode, B = a.distcode, N = (1 << a.lenbits) - 1, U = (1 << a.distbits) - 1;
    e:
      do {
        S < 15 && (R += F[o++] << S, S += 8, R += F[o++] << S, S += 8), M = A[R & N];
        t:
          for (; ; ) {
            if ($ = M >>> 24, R >>>= $, S -= $, $ = M >>> 16 & 255, $ === 0)
              Q[c++] = M & 65535;
            else if ($ & 16) {
              O = M & 65535, $ &= 15, $ && (S < $ && (R += F[o++] << S, S += 8), O += R & (1 << $) - 1, R >>>= $, S -= $), S < 15 && (R += F[o++] << S, S += 8, R += F[o++] << S, S += 8), M = B[R & U];
              r:
                for (; ; ) {
                  if ($ = M >>> 24, R >>>= $, S -= $, $ = M >>> 16 & 255, $ & 16) {
                    if (W = M & 65535, $ &= 15, S < $ && (R += F[o++] << S, S += 8, S < $ && (R += F[o++] << S, S += 8)), W += R & (1 << $) - 1, W > w) {
                      n.msg = "invalid distance too far back", a.mode = t;
                      break e;
                    }
                    if (R >>>= $, S -= $, $ = c - f, W > $) {
                      if ($ = W - $, $ > g && a.sane) {
                        n.msg = "invalid distance too far back", a.mode = t;
                        break e;
                      }
                      if (z = 0, K = T, b === 0) {
                        if (z += m - $, $ < O) {
                          O -= $;
                          do
                            Q[c++] = T[z++];
                          while (--$);
                          z = c - W, K = Q;
                        }
                      } else if (b < $) {
                        if (z += m + b - $, $ -= b, $ < O) {
                          O -= $;
                          do
                            Q[c++] = T[z++];
                          while (--$);
                          if (z = 0, b < O) {
                            $ = b, O -= $;
                            do
                              Q[c++] = T[z++];
                            while (--$);
                            z = c - W, K = Q;
                          }
                        }
                      } else if (z += b - $, $ < O) {
                        O -= $;
                        do
                          Q[c++] = T[z++];
                        while (--$);
                        z = c - W, K = Q;
                      }
                      for (; O > 2; )
                        Q[c++] = K[z++], Q[c++] = K[z++], Q[c++] = K[z++], O -= 3;
                      O && (Q[c++] = K[z++], O > 1 && (Q[c++] = K[z++]));
                    } else {
                      z = c - W;
                      do
                        Q[c++] = Q[z++], Q[c++] = Q[z++], Q[c++] = Q[z++], O -= 3;
                      while (O > 2);
                      O && (Q[c++] = Q[z++], O > 1 && (Q[c++] = Q[z++]));
                    }
                  } else if (($ & 64) === 0) {
                    M = B[(M & 65535) + (R & (1 << $) - 1)];
                    continue r;
                  } else {
                    n.msg = "invalid distance code", a.mode = t;
                    break e;
                  }
                  break;
                }
            } else if (($ & 64) === 0) {
              M = A[(M & 65535) + (R & (1 << $) - 1)];
              continue t;
            } else if ($ & 32) {
              a.mode = e;
              break e;
            } else {
              n.msg = "invalid literal/length code", a.mode = t;
              break e;
            }
            break;
          }
      } while (o < s && c < l);
    O = S >> 3, o -= O, S -= O << 3, R &= (1 << S) - 1, n.next_in = o, n.next_out = c, n.avail_in = o < s ? 5 + (s - o) : 5 - (o - s), n.avail_out = c < l ? 257 + (l - c) : 257 - (c - l), a.hold = R, a.bits = S;
  }, wa;
}
var ma, Ys;
function wh() {
  if (Ys) return ma;
  Ys = 1;
  var t = ur(), e = 15, r = 852, n = 592, i = 0, a = 1, o = 2, s = [
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
  ], c = [
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
  ], f = [
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
  return ma = function(m, g, b, T, R, S, A, B) {
    var N = B.bits, U = 0, M = 0, $ = 0, O = 0, W = 0, z = 0, K = 0, F = 0, Q = 0, se = 0, ve, ie, Y, ae, de, Ae = null, Ie = 0, _e, Te = new t.Buf16(e + 1), ge = new t.Buf16(e + 1), $e = null, ke = 0, Se, Pe, Ue;
    for (U = 0; U <= e; U++)
      Te[U] = 0;
    for (M = 0; M < T; M++)
      Te[g[b + M]]++;
    for (W = N, O = e; O >= 1 && Te[O] === 0; O--)
      ;
    if (W > O && (W = O), O === 0)
      return R[S++] = 1 << 24 | 64 << 16 | 0, R[S++] = 1 << 24 | 64 << 16 | 0, B.bits = 1, 0;
    for ($ = 1; $ < O && Te[$] === 0; $++)
      ;
    for (W < $ && (W = $), F = 1, U = 1; U <= e; U++)
      if (F <<= 1, F -= Te[U], F < 0)
        return -1;
    if (F > 0 && (m === i || O !== 1))
      return -1;
    for (ge[1] = 0, U = 1; U < e; U++)
      ge[U + 1] = ge[U] + Te[U];
    for (M = 0; M < T; M++)
      g[b + M] !== 0 && (A[ge[g[b + M]]++] = M);
    if (m === i ? (Ae = $e = A, _e = 19) : m === a ? (Ae = s, Ie -= 257, $e = c, ke -= 257, _e = 256) : (Ae = f, $e = l, _e = -1), se = 0, M = 0, U = $, de = S, z = W, K = 0, Y = -1, Q = 1 << W, ae = Q - 1, m === a && Q > r || m === o && Q > n)
      return 1;
    for (; ; ) {
      Se = U - K, A[M] < _e ? (Pe = 0, Ue = A[M]) : A[M] > _e ? (Pe = $e[ke + A[M]], Ue = Ae[Ie + A[M]]) : (Pe = 96, Ue = 0), ve = 1 << U - K, ie = 1 << z, $ = ie;
      do
        ie -= ve, R[de + (se >> K) + ie] = Se << 24 | Pe << 16 | Ue | 0;
      while (ie !== 0);
      for (ve = 1 << U - 1; se & ve; )
        ve >>= 1;
      if (ve !== 0 ? (se &= ve - 1, se += ve) : se = 0, M++, --Te[U] === 0) {
        if (U === O)
          break;
        U = g[b + A[M]];
      }
      if (U > W && (se & ae) !== Y) {
        for (K === 0 && (K = W), de += $, z = U - K, F = 1 << z; z + K < O && (F -= Te[z + K], !(F <= 0)); )
          z++, F <<= 1;
        if (Q += 1 << z, m === a && Q > r || m === o && Q > n)
          return 1;
        Y = se & ae, R[Y] = W << 24 | z << 16 | de - S | 0;
      }
    }
    return se !== 0 && (R[de + se] = U - K << 24 | 64 << 16 | 0), B.bits = W, 0;
  }, ma;
}
var Ks;
function mh() {
  if (Ks) return It;
  Ks = 1;
  var t = ur(), e = yl(), r = gl(), n = ph(), i = wh(), a = 0, o = 1, s = 2, c = 4, f = 5, l = 6, w = 0, m = 1, g = 2, b = -2, T = -3, R = -4, S = -5, A = 8, B = 1, N = 2, U = 3, M = 4, $ = 5, O = 6, W = 7, z = 8, K = 9, F = 10, Q = 11, se = 12, ve = 13, ie = 14, Y = 15, ae = 16, de = 17, Ae = 18, Ie = 19, _e = 20, Te = 21, ge = 22, $e = 23, ke = 24, Se = 25, Pe = 26, Ue = 27, Be = 28, Re = 29, le = 30, be = 31, Le = 32, je = 852, Ce = 592, Fe = 15, xe = Fe;
  function rt(I) {
    return (I >>> 24 & 255) + (I >>> 8 & 65280) + ((I & 65280) << 8) + ((I & 255) << 24);
  }
  function ct() {
    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new t.Buf16(320), this.work = new t.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  function et(I) {
    var P;
    return !I || !I.state ? b : (P = I.state, I.total_in = I.total_out = P.total = 0, I.msg = "", P.wrap && (I.adler = P.wrap & 1), P.mode = B, P.last = 0, P.havedict = 0, P.dmax = 32768, P.head = null, P.hold = 0, P.bits = 0, P.lencode = P.lendyn = new t.Buf32(je), P.distcode = P.distdyn = new t.Buf32(Ce), P.sane = 1, P.back = -1, w);
  }
  function Me(I) {
    var P;
    return !I || !I.state ? b : (P = I.state, P.wsize = 0, P.whave = 0, P.wnext = 0, et(I));
  }
  function qe(I, P) {
    var _, ee;
    return !I || !I.state || (ee = I.state, P < 0 ? (_ = 0, P = -P) : (_ = (P >> 4) + 1, P < 48 && (P &= 15)), P && (P < 8 || P > 15)) ? b : (ee.window !== null && ee.wbits !== P && (ee.window = null), ee.wrap = _, ee.wbits = P, Me(I));
  }
  function nt(I, P) {
    var _, ee;
    return I ? (ee = new ct(), I.state = ee, ee.window = null, _ = qe(I, P), _ !== w && (I.state = null), _) : b;
  }
  function Xe(I) {
    return nt(I, xe);
  }
  var St = !0, kt, He;
  function st(I) {
    if (St) {
      var P;
      for (kt = new t.Buf32(512), He = new t.Buf32(32), P = 0; P < 144; )
        I.lens[P++] = 8;
      for (; P < 256; )
        I.lens[P++] = 9;
      for (; P < 280; )
        I.lens[P++] = 7;
      for (; P < 288; )
        I.lens[P++] = 8;
      for (i(o, I.lens, 0, 288, kt, 0, I.work, { bits: 9 }), P = 0; P < 32; )
        I.lens[P++] = 5;
      i(s, I.lens, 0, 32, He, 0, I.work, { bits: 5 }), St = !1;
    }
    I.lencode = kt, I.lenbits = 9, I.distcode = He, I.distbits = 5;
  }
  function k(I, P, _, ee) {
    var ue, h = I.state;
    return h.window === null && (h.wsize = 1 << h.wbits, h.wnext = 0, h.whave = 0, h.window = new t.Buf8(h.wsize)), ee >= h.wsize ? (t.arraySet(h.window, P, _ - h.wsize, h.wsize, 0), h.wnext = 0, h.whave = h.wsize) : (ue = h.wsize - h.wnext, ue > ee && (ue = ee), t.arraySet(h.window, P, _ - ee, ue, h.wnext), ee -= ue, ee ? (t.arraySet(h.window, P, _ - ee, ee, 0), h.wnext = ee, h.whave = h.wsize) : (h.wnext += ue, h.wnext === h.wsize && (h.wnext = 0), h.whave < h.wsize && (h.whave += ue))), 0;
  }
  function u(I, P) {
    var _, ee, ue, h, H, X, x, L, V, pe, fe, v, p, y, D = 0, j, G, J, Ee, Ze, We, De, Ne, ht = new t.Buf8(4), Vt, Ut, Co = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!I || !I.state || !I.output || !I.input && I.avail_in !== 0)
      return b;
    _ = I.state, _.mode === se && (_.mode = ve), H = I.next_out, ue = I.output, x = I.avail_out, h = I.next_in, ee = I.input, X = I.avail_in, L = _.hold, V = _.bits, pe = X, fe = x, Ne = w;
    e:
      for (; ; )
        switch (_.mode) {
          case B:
            if (_.wrap === 0) {
              _.mode = ve;
              break;
            }
            for (; V < 16; ) {
              if (X === 0)
                break e;
              X--, L += ee[h++] << V, V += 8;
            }
            if (_.wrap & 2 && L === 35615) {
              _.check = 0, ht[0] = L & 255, ht[1] = L >>> 8 & 255, _.check = r(_.check, ht, 2, 0), L = 0, V = 0, _.mode = N;
              break;
            }
            if (_.flags = 0, _.head && (_.head.done = !1), !(_.wrap & 1) || /* check if zlib header allowed */
            (((L & 255) << 8) + (L >> 8)) % 31) {
              I.msg = "incorrect header check", _.mode = le;
              break;
            }
            if ((L & 15) !== A) {
              I.msg = "unknown compression method", _.mode = le;
              break;
            }
            if (L >>>= 4, V -= 4, De = (L & 15) + 8, _.wbits === 0)
              _.wbits = De;
            else if (De > _.wbits) {
              I.msg = "invalid window size", _.mode = le;
              break;
            }
            _.dmax = 1 << De, I.adler = _.check = 1, _.mode = L & 512 ? F : se, L = 0, V = 0;
            break;
          case N:
            for (; V < 16; ) {
              if (X === 0)
                break e;
              X--, L += ee[h++] << V, V += 8;
            }
            if (_.flags = L, (_.flags & 255) !== A) {
              I.msg = "unknown compression method", _.mode = le;
              break;
            }
            if (_.flags & 57344) {
              I.msg = "unknown header flags set", _.mode = le;
              break;
            }
            _.head && (_.head.text = L >> 8 & 1), _.flags & 512 && (ht[0] = L & 255, ht[1] = L >>> 8 & 255, _.check = r(_.check, ht, 2, 0)), L = 0, V = 0, _.mode = U;
          /* falls through */
          case U:
            for (; V < 32; ) {
              if (X === 0)
                break e;
              X--, L += ee[h++] << V, V += 8;
            }
            _.head && (_.head.time = L), _.flags & 512 && (ht[0] = L & 255, ht[1] = L >>> 8 & 255, ht[2] = L >>> 16 & 255, ht[3] = L >>> 24 & 255, _.check = r(_.check, ht, 4, 0)), L = 0, V = 0, _.mode = M;
          /* falls through */
          case M:
            for (; V < 16; ) {
              if (X === 0)
                break e;
              X--, L += ee[h++] << V, V += 8;
            }
            _.head && (_.head.xflags = L & 255, _.head.os = L >> 8), _.flags & 512 && (ht[0] = L & 255, ht[1] = L >>> 8 & 255, _.check = r(_.check, ht, 2, 0)), L = 0, V = 0, _.mode = $;
          /* falls through */
          case $:
            if (_.flags & 1024) {
              for (; V < 16; ) {
                if (X === 0)
                  break e;
                X--, L += ee[h++] << V, V += 8;
              }
              _.length = L, _.head && (_.head.extra_len = L), _.flags & 512 && (ht[0] = L & 255, ht[1] = L >>> 8 & 255, _.check = r(_.check, ht, 2, 0)), L = 0, V = 0;
            } else _.head && (_.head.extra = null);
            _.mode = O;
          /* falls through */
          case O:
            if (_.flags & 1024 && (v = _.length, v > X && (v = X), v && (_.head && (De = _.head.extra_len - _.length, _.head.extra || (_.head.extra = new Array(_.head.extra_len)), t.arraySet(
              _.head.extra,
              ee,
              h,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              v,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              De
            )), _.flags & 512 && (_.check = r(_.check, ee, v, h)), X -= v, h += v, _.length -= v), _.length))
              break e;
            _.length = 0, _.mode = W;
          /* falls through */
          case W:
            if (_.flags & 2048) {
              if (X === 0)
                break e;
              v = 0;
              do
                De = ee[h + v++], _.head && De && _.length < 65536 && (_.head.name += String.fromCharCode(De));
              while (De && v < X);
              if (_.flags & 512 && (_.check = r(_.check, ee, v, h)), X -= v, h += v, De)
                break e;
            } else _.head && (_.head.name = null);
            _.length = 0, _.mode = z;
          /* falls through */
          case z:
            if (_.flags & 4096) {
              if (X === 0)
                break e;
              v = 0;
              do
                De = ee[h + v++], _.head && De && _.length < 65536 && (_.head.comment += String.fromCharCode(De));
              while (De && v < X);
              if (_.flags & 512 && (_.check = r(_.check, ee, v, h)), X -= v, h += v, De)
                break e;
            } else _.head && (_.head.comment = null);
            _.mode = K;
          /* falls through */
          case K:
            if (_.flags & 512) {
              for (; V < 16; ) {
                if (X === 0)
                  break e;
                X--, L += ee[h++] << V, V += 8;
              }
              if (L !== (_.check & 65535)) {
                I.msg = "header crc mismatch", _.mode = le;
                break;
              }
              L = 0, V = 0;
            }
            _.head && (_.head.hcrc = _.flags >> 9 & 1, _.head.done = !0), I.adler = _.check = 0, _.mode = se;
            break;
          case F:
            for (; V < 32; ) {
              if (X === 0)
                break e;
              X--, L += ee[h++] << V, V += 8;
            }
            I.adler = _.check = rt(L), L = 0, V = 0, _.mode = Q;
          /* falls through */
          case Q:
            if (_.havedict === 0)
              return I.next_out = H, I.avail_out = x, I.next_in = h, I.avail_in = X, _.hold = L, _.bits = V, g;
            I.adler = _.check = 1, _.mode = se;
          /* falls through */
          case se:
            if (P === f || P === l)
              break e;
          /* falls through */
          case ve:
            if (_.last) {
              L >>>= V & 7, V -= V & 7, _.mode = Ue;
              break;
            }
            for (; V < 3; ) {
              if (X === 0)
                break e;
              X--, L += ee[h++] << V, V += 8;
            }
            switch (_.last = L & 1, L >>>= 1, V -= 1, L & 3) {
              case 0:
                _.mode = ie;
                break;
              case 1:
                if (st(_), _.mode = _e, P === l) {
                  L >>>= 2, V -= 2;
                  break e;
                }
                break;
              case 2:
                _.mode = de;
                break;
              case 3:
                I.msg = "invalid block type", _.mode = le;
            }
            L >>>= 2, V -= 2;
            break;
          case ie:
            for (L >>>= V & 7, V -= V & 7; V < 32; ) {
              if (X === 0)
                break e;
              X--, L += ee[h++] << V, V += 8;
            }
            if ((L & 65535) !== (L >>> 16 ^ 65535)) {
              I.msg = "invalid stored block lengths", _.mode = le;
              break;
            }
            if (_.length = L & 65535, L = 0, V = 0, _.mode = Y, P === l)
              break e;
          /* falls through */
          case Y:
            _.mode = ae;
          /* falls through */
          case ae:
            if (v = _.length, v) {
              if (v > X && (v = X), v > x && (v = x), v === 0)
                break e;
              t.arraySet(ue, ee, h, v, H), X -= v, h += v, x -= v, H += v, _.length -= v;
              break;
            }
            _.mode = se;
            break;
          case de:
            for (; V < 14; ) {
              if (X === 0)
                break e;
              X--, L += ee[h++] << V, V += 8;
            }
            if (_.nlen = (L & 31) + 257, L >>>= 5, V -= 5, _.ndist = (L & 31) + 1, L >>>= 5, V -= 5, _.ncode = (L & 15) + 4, L >>>= 4, V -= 4, _.nlen > 286 || _.ndist > 30) {
              I.msg = "too many length or distance symbols", _.mode = le;
              break;
            }
            _.have = 0, _.mode = Ae;
          /* falls through */
          case Ae:
            for (; _.have < _.ncode; ) {
              for (; V < 3; ) {
                if (X === 0)
                  break e;
                X--, L += ee[h++] << V, V += 8;
              }
              _.lens[Co[_.have++]] = L & 7, L >>>= 3, V -= 3;
            }
            for (; _.have < 19; )
              _.lens[Co[_.have++]] = 0;
            if (_.lencode = _.lendyn, _.lenbits = 7, Vt = { bits: _.lenbits }, Ne = i(a, _.lens, 0, 19, _.lencode, 0, _.work, Vt), _.lenbits = Vt.bits, Ne) {
              I.msg = "invalid code lengths set", _.mode = le;
              break;
            }
            _.have = 0, _.mode = Ie;
          /* falls through */
          case Ie:
            for (; _.have < _.nlen + _.ndist; ) {
              for (; D = _.lencode[L & (1 << _.lenbits) - 1], j = D >>> 24, G = D >>> 16 & 255, J = D & 65535, !(j <= V); ) {
                if (X === 0)
                  break e;
                X--, L += ee[h++] << V, V += 8;
              }
              if (J < 16)
                L >>>= j, V -= j, _.lens[_.have++] = J;
              else {
                if (J === 16) {
                  for (Ut = j + 2; V < Ut; ) {
                    if (X === 0)
                      break e;
                    X--, L += ee[h++] << V, V += 8;
                  }
                  if (L >>>= j, V -= j, _.have === 0) {
                    I.msg = "invalid bit length repeat", _.mode = le;
                    break;
                  }
                  De = _.lens[_.have - 1], v = 3 + (L & 3), L >>>= 2, V -= 2;
                } else if (J === 17) {
                  for (Ut = j + 3; V < Ut; ) {
                    if (X === 0)
                      break e;
                    X--, L += ee[h++] << V, V += 8;
                  }
                  L >>>= j, V -= j, De = 0, v = 3 + (L & 7), L >>>= 3, V -= 3;
                } else {
                  for (Ut = j + 7; V < Ut; ) {
                    if (X === 0)
                      break e;
                    X--, L += ee[h++] << V, V += 8;
                  }
                  L >>>= j, V -= j, De = 0, v = 11 + (L & 127), L >>>= 7, V -= 7;
                }
                if (_.have + v > _.nlen + _.ndist) {
                  I.msg = "invalid bit length repeat", _.mode = le;
                  break;
                }
                for (; v--; )
                  _.lens[_.have++] = De;
              }
            }
            if (_.mode === le)
              break;
            if (_.lens[256] === 0) {
              I.msg = "invalid code -- missing end-of-block", _.mode = le;
              break;
            }
            if (_.lenbits = 9, Vt = { bits: _.lenbits }, Ne = i(o, _.lens, 0, _.nlen, _.lencode, 0, _.work, Vt), _.lenbits = Vt.bits, Ne) {
              I.msg = "invalid literal/lengths set", _.mode = le;
              break;
            }
            if (_.distbits = 6, _.distcode = _.distdyn, Vt = { bits: _.distbits }, Ne = i(s, _.lens, _.nlen, _.ndist, _.distcode, 0, _.work, Vt), _.distbits = Vt.bits, Ne) {
              I.msg = "invalid distances set", _.mode = le;
              break;
            }
            if (_.mode = _e, P === l)
              break e;
          /* falls through */
          case _e:
            _.mode = Te;
          /* falls through */
          case Te:
            if (X >= 6 && x >= 258) {
              I.next_out = H, I.avail_out = x, I.next_in = h, I.avail_in = X, _.hold = L, _.bits = V, n(I, fe), H = I.next_out, ue = I.output, x = I.avail_out, h = I.next_in, ee = I.input, X = I.avail_in, L = _.hold, V = _.bits, _.mode === se && (_.back = -1);
              break;
            }
            for (_.back = 0; D = _.lencode[L & (1 << _.lenbits) - 1], j = D >>> 24, G = D >>> 16 & 255, J = D & 65535, !(j <= V); ) {
              if (X === 0)
                break e;
              X--, L += ee[h++] << V, V += 8;
            }
            if (G && (G & 240) === 0) {
              for (Ee = j, Ze = G, We = J; D = _.lencode[We + ((L & (1 << Ee + Ze) - 1) >> Ee)], j = D >>> 24, G = D >>> 16 & 255, J = D & 65535, !(Ee + j <= V); ) {
                if (X === 0)
                  break e;
                X--, L += ee[h++] << V, V += 8;
              }
              L >>>= Ee, V -= Ee, _.back += Ee;
            }
            if (L >>>= j, V -= j, _.back += j, _.length = J, G === 0) {
              _.mode = Pe;
              break;
            }
            if (G & 32) {
              _.back = -1, _.mode = se;
              break;
            }
            if (G & 64) {
              I.msg = "invalid literal/length code", _.mode = le;
              break;
            }
            _.extra = G & 15, _.mode = ge;
          /* falls through */
          case ge:
            if (_.extra) {
              for (Ut = _.extra; V < Ut; ) {
                if (X === 0)
                  break e;
                X--, L += ee[h++] << V, V += 8;
              }
              _.length += L & (1 << _.extra) - 1, L >>>= _.extra, V -= _.extra, _.back += _.extra;
            }
            _.was = _.length, _.mode = $e;
          /* falls through */
          case $e:
            for (; D = _.distcode[L & (1 << _.distbits) - 1], j = D >>> 24, G = D >>> 16 & 255, J = D & 65535, !(j <= V); ) {
              if (X === 0)
                break e;
              X--, L += ee[h++] << V, V += 8;
            }
            if ((G & 240) === 0) {
              for (Ee = j, Ze = G, We = J; D = _.distcode[We + ((L & (1 << Ee + Ze) - 1) >> Ee)], j = D >>> 24, G = D >>> 16 & 255, J = D & 65535, !(Ee + j <= V); ) {
                if (X === 0)
                  break e;
                X--, L += ee[h++] << V, V += 8;
              }
              L >>>= Ee, V -= Ee, _.back += Ee;
            }
            if (L >>>= j, V -= j, _.back += j, G & 64) {
              I.msg = "invalid distance code", _.mode = le;
              break;
            }
            _.offset = J, _.extra = G & 15, _.mode = ke;
          /* falls through */
          case ke:
            if (_.extra) {
              for (Ut = _.extra; V < Ut; ) {
                if (X === 0)
                  break e;
                X--, L += ee[h++] << V, V += 8;
              }
              _.offset += L & (1 << _.extra) - 1, L >>>= _.extra, V -= _.extra, _.back += _.extra;
            }
            if (_.offset > _.dmax) {
              I.msg = "invalid distance too far back", _.mode = le;
              break;
            }
            _.mode = Se;
          /* falls through */
          case Se:
            if (x === 0)
              break e;
            if (v = fe - x, _.offset > v) {
              if (v = _.offset - v, v > _.whave && _.sane) {
                I.msg = "invalid distance too far back", _.mode = le;
                break;
              }
              v > _.wnext ? (v -= _.wnext, p = _.wsize - v) : p = _.wnext - v, v > _.length && (v = _.length), y = _.window;
            } else
              y = ue, p = H - _.offset, v = _.length;
            v > x && (v = x), x -= v, _.length -= v;
            do
              ue[H++] = y[p++];
            while (--v);
            _.length === 0 && (_.mode = Te);
            break;
          case Pe:
            if (x === 0)
              break e;
            ue[H++] = _.length, x--, _.mode = Te;
            break;
          case Ue:
            if (_.wrap) {
              for (; V < 32; ) {
                if (X === 0)
                  break e;
                X--, L |= ee[h++] << V, V += 8;
              }
              if (fe -= x, I.total_out += fe, _.total += fe, fe && (I.adler = _.check = /*UPDATE(state.check, put - _out, _out);*/
              _.flags ? r(_.check, ue, fe, H - fe) : e(_.check, ue, fe, H - fe)), fe = x, (_.flags ? L : rt(L)) !== _.check) {
                I.msg = "incorrect data check", _.mode = le;
                break;
              }
              L = 0, V = 0;
            }
            _.mode = Be;
          /* falls through */
          case Be:
            if (_.wrap && _.flags) {
              for (; V < 32; ) {
                if (X === 0)
                  break e;
                X--, L += ee[h++] << V, V += 8;
              }
              if (L !== (_.total & 4294967295)) {
                I.msg = "incorrect length check", _.mode = le;
                break;
              }
              L = 0, V = 0;
            }
            _.mode = Re;
          /* falls through */
          case Re:
            Ne = m;
            break e;
          case le:
            Ne = T;
            break e;
          case be:
            return R;
          case Le:
          /* falls through */
          default:
            return b;
        }
    return I.next_out = H, I.avail_out = x, I.next_in = h, I.avail_in = X, _.hold = L, _.bits = V, (_.wsize || fe !== I.avail_out && _.mode < le && (_.mode < Ue || P !== c)) && k(I, I.output, I.next_out, fe - I.avail_out), pe -= I.avail_in, fe -= I.avail_out, I.total_in += pe, I.total_out += fe, _.total += fe, _.wrap && fe && (I.adler = _.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    _.flags ? r(_.check, ue, fe, I.next_out - fe) : e(_.check, ue, fe, I.next_out - fe)), I.data_type = _.bits + (_.last ? 64 : 0) + (_.mode === se ? 128 : 0) + (_.mode === _e || _.mode === Y ? 256 : 0), (pe === 0 && fe === 0 || P === c) && Ne === w && (Ne = S), Ne;
  }
  function d(I) {
    if (!I || !I.state)
      return b;
    var P = I.state;
    return P.window && (P.window = null), I.state = null, w;
  }
  function E(I, P) {
    var _;
    return !I || !I.state || (_ = I.state, (_.wrap & 2) === 0) ? b : (_.head = P, P.done = !1, w);
  }
  function C(I, P) {
    var _ = P.length, ee, ue, h;
    return !I || !I.state || (ee = I.state, ee.wrap !== 0 && ee.mode !== Q) ? b : ee.mode === Q && (ue = 1, ue = e(ue, P, _, 0), ue !== ee.check) ? T : (h = k(I, P, _, _), h ? (ee.mode = be, R) : (ee.havedict = 1, w));
  }
  return It.inflateReset = Me, It.inflateReset2 = qe, It.inflateResetKeep = et, It.inflateInit = Xe, It.inflateInit2 = nt, It.inflate = u, It.inflateEnd = d, It.inflateGetHeader = E, It.inflateSetDictionary = C, It.inflateInfo = "pako inflate (from Nodeca project)", It;
}
var ya, Js;
function bl() {
  return Js || (Js = 1, ya = {
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
  }), ya;
}
var ga, Qs;
function yh() {
  if (Qs) return ga;
  Qs = 1;
  function t() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
  }
  return ga = t, ga;
}
var ec;
function gh() {
  if (ec) return Tr;
  ec = 1;
  var t = mh(), e = ur(), r = vl(), n = bl(), i = go(), a = _l(), o = yh(), s = Object.prototype.toString;
  function c(w) {
    if (!(this instanceof c)) return new c(w);
    this.options = e.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, w || {});
    var m = this.options;
    m.raw && m.windowBits >= 0 && m.windowBits < 16 && (m.windowBits = -m.windowBits, m.windowBits === 0 && (m.windowBits = -15)), m.windowBits >= 0 && m.windowBits < 16 && !(w && w.windowBits) && (m.windowBits += 32), m.windowBits > 15 && m.windowBits < 48 && (m.windowBits & 15) === 0 && (m.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new a(), this.strm.avail_out = 0;
    var g = t.inflateInit2(
      this.strm,
      m.windowBits
    );
    if (g !== n.Z_OK)
      throw new Error(i[g]);
    if (this.header = new o(), t.inflateGetHeader(this.strm, this.header), m.dictionary && (typeof m.dictionary == "string" ? m.dictionary = r.string2buf(m.dictionary) : s.call(m.dictionary) === "[object ArrayBuffer]" && (m.dictionary = new Uint8Array(m.dictionary)), m.raw && (g = t.inflateSetDictionary(this.strm, m.dictionary), g !== n.Z_OK)))
      throw new Error(i[g]);
  }
  c.prototype.push = function(w, m) {
    var g = this.strm, b = this.options.chunkSize, T = this.options.dictionary, R, S, A, B, N, U = !1;
    if (this.ended)
      return !1;
    S = m === ~~m ? m : m === !0 ? n.Z_FINISH : n.Z_NO_FLUSH, typeof w == "string" ? g.input = r.binstring2buf(w) : s.call(w) === "[object ArrayBuffer]" ? g.input = new Uint8Array(w) : g.input = w, g.next_in = 0, g.avail_in = g.input.length;
    do {
      if (g.avail_out === 0 && (g.output = new e.Buf8(b), g.next_out = 0, g.avail_out = b), R = t.inflate(g, n.Z_NO_FLUSH), R === n.Z_NEED_DICT && T && (R = t.inflateSetDictionary(this.strm, T)), R === n.Z_BUF_ERROR && U === !0 && (R = n.Z_OK, U = !1), R !== n.Z_STREAM_END && R !== n.Z_OK)
        return this.onEnd(R), this.ended = !0, !1;
      g.next_out && (g.avail_out === 0 || R === n.Z_STREAM_END || g.avail_in === 0 && (S === n.Z_FINISH || S === n.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (A = r.utf8border(g.output, g.next_out), B = g.next_out - A, N = r.buf2string(g.output, A), g.next_out = B, g.avail_out = b - B, B && e.arraySet(g.output, g.output, A, B, 0), this.onData(N)) : this.onData(e.shrinkBuf(g.output, g.next_out))), g.avail_in === 0 && g.avail_out === 0 && (U = !0);
    } while ((g.avail_in > 0 || g.avail_out === 0) && R !== n.Z_STREAM_END);
    return R === n.Z_STREAM_END && (S = n.Z_FINISH), S === n.Z_FINISH ? (R = t.inflateEnd(this.strm), this.onEnd(R), this.ended = !0, R === n.Z_OK) : (S === n.Z_SYNC_FLUSH && (this.onEnd(n.Z_OK), g.avail_out = 0), !0);
  }, c.prototype.onData = function(w) {
    this.chunks.push(w);
  }, c.prototype.onEnd = function(w) {
    w === n.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = w, this.msg = this.strm.msg;
  };
  function f(w, m) {
    var g = new c(m);
    if (g.push(w, !0), g.err)
      throw g.msg || i[g.err];
    return g.result;
  }
  function l(w, m) {
    return m = m || {}, m.raw = !0, f(w, m);
  }
  return Tr.Inflate = c, Tr.inflate = f, Tr.inflateRaw = l, Tr.ungzip = f, Tr;
}
var va, tc;
function vh() {
  if (tc) return va;
  tc = 1;
  var t = ur().assign, e = dh(), r = gh(), n = bl(), i = {};
  return t(i, e, r, n), va = i, va;
}
var _h = vh(), vo = /* @__PURE__ */ rr(_h), _a, rc;
function bh() {
  if (rc) return _a;
  rc = 1;
  const t = (e, r) => function(...n) {
    const i = r.promiseModule;
    return new i((a, o) => {
      r.multiArgs ? n.push((...s) => {
        r.errorFirst ? s[0] ? o(s) : (s.shift(), a(s)) : a(s);
      }) : r.errorFirst ? n.push((s, c) => {
        s ? o(s) : a(c);
      }) : n.push(a), e.apply(this, n);
    });
  };
  return _a = (e, r) => {
    r = Object.assign({
      exclude: [/.+(Sync|Stream)$/],
      errorFirst: !0,
      promiseModule: Promise
    }, r);
    const n = typeof e;
    if (!(e !== null && (n === "object" || n === "function")))
      throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${e === null ? "null" : n}\``);
    const i = (o) => {
      const s = (c) => typeof c == "string" ? o === c : c.test(o);
      return r.include ? r.include.some(s) : !r.exclude.some(s);
    };
    let a;
    n === "function" ? a = function(...o) {
      return r.excludeMain ? e(...o) : t(e, r).apply(this, o);
    } : a = Object.create(Object.getPrototypeOf(e));
    for (const o in e) {
      const s = e[o];
      a[o] = typeof s == "function" && i(o) ? t(s, r) : s;
    }
    return a;
  }, _a;
}
var Eh = bh(), ba = /* @__PURE__ */ rr(Eh), Ea, nc;
function Sh() {
  if (nc) return Ea;
  nc = 1;
  function t(ie) {
    return Array.isArray(ie) ? ie : [ie];
  }
  const e = "", r = " ", n = "\\", i = /^\s+$/, a = /(?:[^\\]|^)\\$/, o = /^\\!/, s = /^\\#/, c = /\r?\n/g, f = /^\.*\/|^\.+$/, l = "/";
  let w = "node-ignore";
  typeof Symbol < "u" && (w = Symbol.for("node-ignore"));
  const m = w, g = (ie, Y, ae) => Object.defineProperty(ie, Y, { value: ae }), b = /([0-z])-([0-z])/g, T = () => !1, R = (ie) => ie.replace(
    b,
    (Y, ae, de) => ae.charCodeAt(0) <= de.charCodeAt(0) ? Y : e
  ), S = (ie) => {
    const { length: Y } = ie;
    return ie.slice(0, Y - Y % 2);
  }, A = [
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
      (ie, Y, ae) => Y + (ae.indexOf("\\") === 0 ? r : e)
    ],
    // replace (\ ) with ' '
    // (\ ) -> ' '
    // (\\ ) -> '\\ '
    // (\\\ ) -> '\\ '
    [
      /(\\+?)\s/g,
      (ie, Y) => {
        const { length: ae } = Y;
        return Y.slice(0, ae - ae % 2) + r;
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
      (ie) => `\\${ie}`
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
      (ie, Y, ae) => Y + 6 < ae.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
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
      (ie, Y, ae) => {
        const de = ae.replace(/\\\*/g, "[^\\/]*");
        return Y + de;
      }
    ],
    [
      // unescape, revert step 3 except for back slash
      // For example, if a user escape a '\\*',
      // after step 3, the result will be '\\\\\\*'
      /\\\\\\(?=[$.|*+(){^])/g,
      () => n
    ],
    [
      // '\\\\' -> '\\'
      /\\\\/g,
      () => n
    ],
    [
      // > The range notation, e.g. [a-zA-Z],
      // > can be used to match one of the characters in a range.
      // `\` is escaped by step 3
      /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
      (ie, Y, ae, de, Ae) => Y === n ? `\\[${ae}${S(de)}${Ae}` : Ae === "]" && de.length % 2 === 0 ? `[${R(ae)}${de}]` : "[]"
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
      (ie) => /\/$/.test(ie) ? `${ie}$` : `${ie}(?=$|\\/$)`
    ],
    // trailing wildcard
    [
      /(\^|\\\/)?\\\*$/,
      (ie, Y) => `${Y ? `${Y}[^/]+` : "[^/]*"}(?=$|\\/$)`
    ]
  ], B = /* @__PURE__ */ Object.create(null), N = (ie, Y) => {
    let ae = B[ie];
    return ae || (ae = A.reduce(
      (de, [Ae, Ie]) => de.replace(Ae, Ie.bind(ie)),
      ie
    ), B[ie] = ae), Y ? new RegExp(ae, "i") : new RegExp(ae);
  }, U = (ie) => typeof ie == "string", M = (ie) => ie && U(ie) && !i.test(ie) && !a.test(ie) && ie.indexOf("#") !== 0, $ = (ie) => ie.split(c);
  class O {
    constructor(Y, ae, de, Ae) {
      this.origin = Y, this.pattern = ae, this.negative = de, this.regex = Ae;
    }
  }
  const W = (ie, Y) => {
    const ae = ie;
    let de = !1;
    ie.indexOf("!") === 0 && (de = !0, ie = ie.substr(1)), ie = ie.replace(o, "!").replace(s, "#");
    const Ae = N(ie, Y);
    return new O(
      ae,
      ie,
      de,
      Ae
    );
  }, z = (ie, Y) => {
    throw new Y(ie);
  }, K = (ie, Y, ae) => U(ie) ? ie ? K.isNotRelative(ie) ? ae(
    `path should be a \`path.relative()\`d string, but got "${Y}"`,
    RangeError
  ) : !0 : ae("path must not be empty", TypeError) : ae(
    `path must be a string, but got \`${Y}\``,
    TypeError
  ), F = (ie) => f.test(ie);
  K.isNotRelative = F, K.convert = (ie) => ie;
  class Q {
    constructor({
      ignorecase: Y = !0,
      ignoreCase: ae = Y,
      allowRelativePaths: de = !1
    } = {}) {
      g(this, m, !0), this._rules = [], this._ignoreCase = ae, this._allowRelativePaths = de, this._initCache();
    }
    _initCache() {
      this._ignoreCache = /* @__PURE__ */ Object.create(null), this._testCache = /* @__PURE__ */ Object.create(null);
    }
    _addPattern(Y) {
      if (Y && Y[m]) {
        this._rules = this._rules.concat(Y._rules), this._added = !0;
        return;
      }
      if (M(Y)) {
        const ae = W(Y, this._ignoreCase);
        this._added = !0, this._rules.push(ae);
      }
    }
    // @param {Array<string> | string | Ignore} pattern
    add(Y) {
      return this._added = !1, t(
        U(Y) ? $(Y) : Y
      ).forEach(this._addPattern, this), this._added && this._initCache(), this;
    }
    // legacy
    addPattern(Y) {
      return this.add(Y);
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
    _testOne(Y, ae) {
      let de = !1, Ae = !1;
      return this._rules.forEach((Ie) => {
        const { negative: _e } = Ie;
        if (Ae === _e && de !== Ae || _e && !de && !Ae && !ae)
          return;
        Ie.regex.test(Y) && (de = !_e, Ae = _e);
      }), {
        ignored: de,
        unignored: Ae
      };
    }
    // @returns {TestResult}
    _test(Y, ae, de, Ae) {
      const Ie = Y && K.convert(Y);
      return K(
        Ie,
        Y,
        this._allowRelativePaths ? T : z
      ), this._t(Ie, ae, de, Ae);
    }
    _t(Y, ae, de, Ae) {
      if (Y in ae)
        return ae[Y];
      if (Ae || (Ae = Y.split(l)), Ae.pop(), !Ae.length)
        return ae[Y] = this._testOne(Y, de);
      const Ie = this._t(
        Ae.join(l) + l,
        ae,
        de,
        Ae
      );
      return ae[Y] = Ie.ignored ? Ie : this._testOne(Y, de);
    }
    ignores(Y) {
      return this._test(Y, this._ignoreCache, !1).ignored;
    }
    createFilter() {
      return (Y) => !this.ignores(Y);
    }
    filter(Y) {
      return t(Y).filter(this.createFilter());
    }
    // @returns {TestResult}
    test(Y) {
      return this._test(Y, this._testCache, !0);
    }
  }
  const se = (ie) => new Q(ie), ve = (ie) => K(ie && K.convert(ie), ie, T);
  if (se.isPathValid = ve, se.default = se, Ea = se, // Detect `process` so that it can run in browsers.
  typeof vt < "u" && (vt.env && vt.env.IGNORE_TEST_WIN32 || vt.platform === "win32")) {
    const ie = (ae) => /^\\\\\?\\/.test(ae) || /["<>|\u0000-\u001F]+/u.test(ae) ? ae : ae.replace(/\\/g, "/");
    K.convert = ie;
    const Y = /^[a-z]:\//i;
    K.isNotRelative = (ae) => Y.test(ae) || F(ae);
  }
  return Ea;
}
var kh = Sh(), xh = /* @__PURE__ */ rr(kh), Sa, ic;
function Ah() {
  if (ic) return Sa;
  ic = 1;
  function t(n) {
    return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function e(n, i, a) {
    return i = i instanceof RegExp ? i : new RegExp(t(i), "g"), n.replace(i, a);
  }
  var r = {
    clean: function(i) {
      if (typeof i != "string")
        throw new Error("Expected a string, received: " + i);
      return i = e(i, "./", "/"), i = e(i, "..", "."), i = e(i, " ", "-"), i = e(i, /^[~^:?*\\\-]/g, ""), i = e(i, /[~^:?*\\]/g, "-"), i = e(i, /[~^:?*\\\-]$/g, ""), i = e(i, "@{", "-"), i = e(i, /\.$/g, ""), i = e(i, /\/$/g, ""), i = e(i, /\.lock$/g, ""), i;
    }
  };
  return Sa = r, Sa;
}
var Ih = Ah(), Ht = /* @__PURE__ */ rr(Ih), ka, ac;
function Rh() {
  return ac || (ac = 1, ka = function(t, e) {
    var r = t, n = e, i = r.length, a = n.length, o = !1, s = null, c = i + 1, f = [], l = [], w = [], m = "", g = -1, b = 0, T = 1, R, S, A = function() {
      i >= a && (R = r, S = i, r = n, n = R, i = a, a = S, o = !0, c = i + 1);
    }, B = function($, O, W) {
      return {
        x: $,
        y: O,
        k: W
      };
    }, N = function($, O) {
      return {
        elem: $,
        t: O
      };
    }, U = function($, O, W) {
      var z, K, F;
      for (O > W ? z = f[$ - 1 + c] : z = f[$ + 1 + c], F = Math.max(O, W), K = F - $; K < i && F < a && r[K] === n[F]; )
        ++K, ++F;
      return f[$ + c] = l.length, l[l.length] = new B(K, F, z), F;
    }, M = function($) {
      var O, W, z;
      for (O = W = 0, z = $.length - 1; z >= 0; --z)
        for (; O < $[z].x || W < $[z].y; )
          $[z].y - $[z].x > W - O ? (o ? w[w.length] = new N(n[W], g) : w[w.length] = new N(n[W], T), ++W) : $[z].y - $[z].x < W - O ? (o ? w[w.length] = new N(r[O], T) : w[w.length] = new N(r[O], g), ++O) : (w[w.length] = new N(r[O], b), m += r[O], ++O, ++W);
    };
    return A(), {
      SES_DELETE: -1,
      SES_COMMON: 0,
      SES_ADD: 1,
      editdistance: function() {
        return s;
      },
      getlcs: function() {
        return m;
      },
      getses: function() {
        return w;
      },
      compose: function() {
        var $, O, W, z, K, F, Q, se;
        for ($ = a - i, O = i + a + 3, W = {}, Q = 0; Q < O; ++Q)
          W[Q] = -1, f[Q] = -1;
        z = -1;
        do {
          for (++z, se = -z; se <= $ - 1; ++se)
            W[se + c] = U(se, W[se - 1 + c] + 1, W[se + 1 + c]);
          for (se = $ + z; se >= $ + 1; --se)
            W[se + c] = U(se, W[se - 1 + c] + 1, W[se + 1 + c]);
          W[$ + c] = U($, W[$ - 1 + c] + 1, W[$ + 1 + c]);
        } while (W[$ + c] !== a);
        for (s = $ + 2 * z, K = f[$ + c], F = []; K !== -1; )
          F[F.length] = new B(l[K].x, l[K].y, null), K = l[K].k;
        M(F);
      }
    };
  }), ka;
}
var xa, oc;
function Th() {
  if (oc) return xa;
  oc = 1;
  var t = Rh();
  function e(a, o) {
    var s = new t(a, o);
    s.compose();
    for (var c = s.getses(), f, l, w = a.length - 1, m = o.length - 1, g = c.length - 1; g >= 0; --g)
      c[g].t === s.SES_COMMON ? (l ? (l.chain = {
        file1index: w,
        file2index: m,
        chain: null
      }, l = l.chain) : (f = {
        file1index: w,
        file2index: m,
        chain: null
      }, l = f), w--, m--) : c[g].t === s.SES_DELETE ? w-- : c[g].t === s.SES_ADD && m--;
    var b = {
      file1index: -1,
      file2index: -1,
      chain: null
    };
    return l ? (l.chain = b, f) : b;
  }
  function r(a, o) {
    for (var s = [], c = a.length, f = o.length, l = e(a, o); l !== null; l = l.chain) {
      var w = c - l.file1index - 1, m = f - l.file2index - 1;
      c = l.file1index, f = l.file2index, (w || m) && s.push({
        file1: [c + 1, w],
        file2: [f + 1, m]
      });
    }
    return s.reverse(), s;
  }
  function n(a, o, s) {
    var c, f = r(o, a), l = r(o, s), w = [];
    function m(ae, de) {
      w.push([ae.file1[0], de, ae.file1[1], ae.file2[0], ae.file2[1]]);
    }
    for (c = 0; c < f.length; c++)
      m(f[c], 0);
    for (c = 0; c < l.length; c++)
      m(l[c], 2);
    w.sort(function(ae, de) {
      return ae[0] - de[0];
    });
    var g = [], b = 0;
    function T(ae) {
      ae > b && (g.push([1, b, ae - b]), b = ae);
    }
    for (var R = 0; R < w.length; R++) {
      for (var S = R, A = w[R], B = A[0], N = B + A[2]; R < w.length - 1; ) {
        var U = w[R + 1], M = U[0];
        if (M > N) break;
        N = Math.max(N, M + U[2]), R++;
      }
      if (T(B), S == R)
        A[4] > 0 && g.push([A[1], A[3], A[4]]);
      else {
        var $ = {
          0: [a.length, -1, o.length, -1],
          2: [s.length, -1, o.length, -1]
        };
        for (c = S; c <= R; c++) {
          A = w[c];
          var O = A[1], W = $[O], z = A[0], K = z + A[2], F = A[3], Q = F + A[4];
          W[0] = Math.min(F, W[0]), W[1] = Math.max(Q, W[1]), W[2] = Math.min(z, W[2]), W[3] = Math.max(K, W[3]);
        }
        var se = $[0][0] + (B - $[0][2]), ve = $[0][1] + (N - $[0][3]), ie = $[2][0] + (B - $[2][2]), Y = $[2][1] + (N - $[2][3]);
        g.push([
          -1,
          se,
          ve - se,
          B,
          N - B,
          ie,
          Y - ie
        ]);
      }
      b = N;
    }
    return T(o.length), g;
  }
  function i(a, o, s) {
    var c = [], f = [a, o, s], l = n(a, o, s), w = [];
    function m() {
      w.length && c.push({
        ok: w
      }), w = [];
    }
    function g(A) {
      for (var B = 0; B < A.length; B++)
        w.push(A[B]);
    }
    function b(A) {
      if (A[2] != A[6]) return !0;
      for (var B = A[1], N = A[5], U = 0; U < A[2]; U++)
        if (a[U + B] != s[U + N]) return !0;
      return !1;
    }
    for (var T = 0; T < l.length; T++) {
      var R = l[T], S = R[0];
      S == -1 ? b(R) ? (m(), c.push({
        conflict: {
          a: a.slice(R[1], R[1] + R[2]),
          aIndex: R[1],
          o: o.slice(R[3], R[3] + R[4]),
          oIndex: R[3],
          b: s.slice(R[5], R[5] + R[6]),
          bIndex: R[5]
        }
      })) : g(f[0].slice(R[1], R[1] + R[2])) : g(f[S].slice(R[1], R[1] + R[2]));
    }
    return m(), c;
  }
  return xa = i, xa;
}
var $h = Th(), Bh = /* @__PURE__ */ rr($h);
class ze extends Error {
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
    const r = new ze(e.message);
    return r.code = e.code, r.data = e.data, r.caller = e.caller, r.stack = e.stack, r;
  }
  get isIsomorphicGitError() {
    return !0;
  }
}
class un extends ze {
  /**
   * @param {Array<string>} filepaths
   */
  constructor(e) {
    super(
      `Modifying the index is not possible because you have unmerged files: ${e.toString}. Fix them up in the work tree, and then use 'git add/rm as appropriate to mark resolution and make a commit.`
    ), this.code = this.name = un.code, this.data = { filepaths: e };
  }
}
un.code = "UnmergedPathsError";
class Oe extends ze {
  /**
   * @param {string} message
   */
  constructor(e) {
    super(
      `An internal error caused this command to fail. Please file a bug report at https://github.com/isomorphic-git/isomorphic-git/issues with this error message: ${e}`
    ), this.code = this.name = Oe.code, this.data = { message: e };
  }
}
Oe.code = "InternalError";
class Lr extends ze {
  /**
   * @param {string} filepath
   */
  constructor(e) {
    super(`The filepath "${e}" contains unsafe character sequences`), this.code = this.name = Lr.code, this.data = { filepath: e };
  }
}
Lr.code = "UnsafeFilepathError";
class Wt {
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
    const r = this.buffer.slice(this._start, this._start + e);
    return this._start += e, r;
  }
  toString(e, r) {
    const n = this.buffer.toString(e, this._start, this._start + r);
    return this._start += r, n;
  }
  write(e, r, n) {
    const i = this.buffer.write(e, this._start, r, n);
    return this._start += r, i;
  }
  copy(e, r, n) {
    const i = e.copy(this.buffer, this._start, r, n);
    return this._start += i, i;
  }
  readUInt8() {
    const e = this.buffer.readUInt8(this._start);
    return this._start += 1, e;
  }
  writeUInt8(e) {
    const r = this.buffer.writeUInt8(e, this._start);
    return this._start += 1, r;
  }
  readUInt16BE() {
    const e = this.buffer.readUInt16BE(this._start);
    return this._start += 2, e;
  }
  writeUInt16BE(e) {
    const r = this.buffer.writeUInt16BE(e, this._start);
    return this._start += 2, r;
  }
  readUInt32BE() {
    const e = this.buffer.readUInt32BE(this._start);
    return this._start += 4, e;
  }
  writeUInt32BE(e) {
    const r = this.buffer.writeUInt32BE(e, this._start);
    return this._start += 4, r;
  }
}
function Jn(t, e) {
  return -(t < e) || +(t > e);
}
function El(t, e) {
  return Jn(t.path, e.path);
}
function Sl(t) {
  let e = t > 0 ? t >> 12 : 0;
  e !== 4 && e !== 8 && e !== 10 && e !== 14 && (e = 8);
  let r = t & 511;
  return r & 73 ? r = 493 : r = 420, e !== 8 && (r = 0), (e << 12) + r;
}
const jt = 2 ** 32;
function sc(t, e, r, n) {
  if (t !== void 0 && e !== void 0)
    return [t, e];
  r === void 0 && (r = n.valueOf());
  const i = Math.floor(r / 1e3), a = (r - i * 1e3) * 1e6;
  return [i, a];
}
function Dr(t) {
  const [e, r] = sc(
    t.ctimeSeconds,
    t.ctimeNanoseconds,
    t.ctimeMs,
    t.ctime
  ), [n, i] = sc(
    t.mtimeSeconds,
    t.mtimeNanoseconds,
    t.mtimeMs,
    t.mtime
  );
  return {
    ctimeSeconds: e % jt,
    ctimeNanoseconds: r % jt,
    mtimeSeconds: n % jt,
    mtimeNanoseconds: i % jt,
    dev: t.dev % jt,
    ino: t.ino % jt,
    mode: Sl(t.mode % jt),
    uid: t.uid % jt,
    gid: t.gid % jt,
    // size of -1 happens over a BrowserFS HTTP Backend that doesn't serve Content-Length headers
    // (like the Karma webserver) because BrowserFS HTTP Backend uses HTTP HEAD requests to do fs.stat
    size: t.size > -1 ? t.size % jt : 0
  };
}
function Dh(t) {
  let e = "";
  for (const r of new Uint8Array(t))
    r < 16 && (e += "0"), e += r.toString(16);
  return e;
}
let Aa = null;
async function Jt(t) {
  return Aa === null && (Aa = await Ch()), Aa ? kl(t) : Oh(t);
}
function Oh(t) {
  return new ml().update(t).digest("hex");
}
async function kl(t) {
  const e = await crypto.subtle.digest("SHA-1", t);
  return Dh(e);
}
async function Ch() {
  try {
    if (await kl(new Uint8Array([])) === "da39a3ee5e6b4b0d3255bfef95601890afd80709") return !0;
  } catch {
  }
  return !1;
}
function Fh(t) {
  return {
    assumeValid: !!(t & 32768),
    extended: !!(t & 16384),
    stage: (t & 12288) >> 12,
    nameLength: t & 4095
  };
}
function Ph(t) {
  const e = t.flags;
  return e.extended = !1, e.nameLength = Math.min(he.from(t.path).length, 4095), (e.assumeValid ? 32768 : 0) + (e.extended ? 16384 : 0) + ((e.stage & 3) << 12) + (e.nameLength & 4095);
}
class vr {
  /*::
   _entries: Map<string, CacheEntry>
   _dirty: boolean // Used to determine if index needs to be saved to filesystem
   */
  constructor(e, r) {
    this._dirty = !1, this._unmergedPaths = r || /* @__PURE__ */ new Set(), this._entries = e || /* @__PURE__ */ new Map();
  }
  _addEntry(e) {
    if (e.flags.stage === 0)
      e.stages = [e], this._entries.set(e.path, e), this._unmergedPaths.delete(e.path);
    else {
      let r = this._entries.get(e.path);
      r || (this._entries.set(e.path, e), r = e), r.stages[e.flags.stage] = e, this._unmergedPaths.add(e.path);
    }
  }
  static async from(e) {
    if (he.isBuffer(e))
      return vr.fromBuffer(e);
    if (e === null)
      return new vr(null);
    throw new Oe("invalid type passed to GitIndex.from");
  }
  static async fromBuffer(e) {
    if (e.length === 0)
      throw new Oe("Index file is empty (.git/index)");
    const r = new vr(), n = new Wt(e), i = n.toString("utf8", 4);
    if (i !== "DIRC")
      throw new Oe(`Invalid dircache magic file number: ${i}`);
    const a = await Jt(e.slice(0, -20)), o = e.slice(-20).toString("hex");
    if (o !== a)
      throw new Oe(
        `Invalid checksum in GitIndex buffer: expected ${o} but saw ${a}`
      );
    const s = n.readUInt32BE();
    if (s !== 2)
      throw new Oe(`Unsupported dircache version: ${s}`);
    const c = n.readUInt32BE();
    let f = 0;
    for (; !n.eof() && f < c; ) {
      const l = {};
      l.ctimeSeconds = n.readUInt32BE(), l.ctimeNanoseconds = n.readUInt32BE(), l.mtimeSeconds = n.readUInt32BE(), l.mtimeNanoseconds = n.readUInt32BE(), l.dev = n.readUInt32BE(), l.ino = n.readUInt32BE(), l.mode = n.readUInt32BE(), l.uid = n.readUInt32BE(), l.gid = n.readUInt32BE(), l.size = n.readUInt32BE(), l.oid = n.slice(20).toString("hex");
      const w = n.readUInt16BE();
      l.flags = Fh(w);
      const m = e.indexOf(0, n.tell() + 1) - n.tell();
      if (m < 1)
        throw new Oe(`Got a path length of: ${m}`);
      if (l.path = n.toString("utf8", m), l.path.includes("..\\") || l.path.includes("../"))
        throw new Lr(l.path);
      let g = 8 - (n.tell() - 12) % 8;
      for (g === 0 && (g = 8); g--; ) {
        const b = n.readUInt8();
        if (b !== 0)
          throw new Oe(
            `Expected 1-8 null characters but got '${b}' after ${l.path}`
          );
        if (n.eof())
          throw new Oe("Unexpected end of file");
      }
      l.stages = [], r._addEntry(l), f++;
    }
    return r;
  }
  get unmergedPaths() {
    return [...this._unmergedPaths];
  }
  get entries() {
    return [...this._entries.values()].sort(El);
  }
  get entriesMap() {
    return this._entries;
  }
  get entriesFlat() {
    return [...this.entries].flatMap((e) => e.stages.length > 1 ? e.stages.filter((r) => r) : e);
  }
  *[Symbol.iterator]() {
    for (const e of this.entries)
      yield e;
  }
  insert({ filepath: e, stats: r, oid: n, stage: i = 0 }) {
    r || (r = {
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
    }), r = Dr(r);
    const a = he.from(e), o = {
      ctimeSeconds: r.ctimeSeconds,
      ctimeNanoseconds: r.ctimeNanoseconds,
      mtimeSeconds: r.mtimeSeconds,
      mtimeNanoseconds: r.mtimeNanoseconds,
      dev: r.dev,
      ino: r.ino,
      // We provide a fallback value for `mode` here because not all fs
      // implementations assign it, but we use it in GitTree.
      // '100644' is for a "regular non-executable file"
      mode: r.mode || 33188,
      uid: r.uid,
      gid: r.gid,
      size: r.size,
      path: e,
      oid: n,
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
      for (const r of this._entries.keys())
        r.startsWith(e + "/") && this._entries.delete(r);
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
    const r = he.from(e.path), n = Math.ceil((62 + r.length + 1) / 8) * 8, i = he.alloc(n), a = new Wt(i), o = Dr(e);
    return a.writeUInt32BE(o.ctimeSeconds), a.writeUInt32BE(o.ctimeNanoseconds), a.writeUInt32BE(o.mtimeSeconds), a.writeUInt32BE(o.mtimeNanoseconds), a.writeUInt32BE(o.dev), a.writeUInt32BE(o.ino), a.writeUInt32BE(o.mode), a.writeUInt32BE(o.uid), a.writeUInt32BE(o.gid), a.writeUInt32BE(o.size), a.write(e.oid, 20, "hex"), a.writeUInt16BE(Ph(e)), a.write(e.path, r.length, "utf8"), i;
  }
  async toObject() {
    const e = he.alloc(12), r = new Wt(e);
    r.write("DIRC", 4, "utf8"), r.writeUInt32BE(2), r.writeUInt32BE(this.entriesFlat.length);
    let n = [];
    for (const s of this.entries)
      if (n.push(vr._entryToBuffer(s)), s.stages.length > 1)
        for (const c of s.stages)
          c && c !== s && n.push(vr._entryToBuffer(c));
    n = await Promise.all(n);
    const i = he.concat(n), a = he.concat([e, i]), o = await Jt(a);
    return he.concat([a, he.from(o, "hex")]);
  }
}
function Ln(t, e, r = !0, n = !0) {
  const i = Dr(t), a = Dr(e);
  return r && i.mode !== a.mode || i.mtimeSeconds !== a.mtimeSeconds || i.ctimeSeconds !== a.ctimeSeconds || i.uid !== a.uid || i.gid !== a.gid || n && i.ino !== a.ino || i.size !== a.size;
}
let Ia = null;
const Ra = Symbol("IndexCache");
function Nh() {
  return {
    map: /* @__PURE__ */ new Map(),
    stats: /* @__PURE__ */ new Map()
  };
}
async function Mh(t, e, r) {
  const [n, i] = await Promise.all([
    t.lstat(e),
    t.read(e)
  ]), a = await vr.from(i);
  r.map.set(e, a), r.stats.set(e, n);
}
async function Uh(t, e, r) {
  const n = r.stats.get(e);
  if (n === void 0) return !0;
  if (n === null) return !1;
  const i = await t.lstat(e);
  return i === null ? !1 : Ln(n, i);
}
class ut {
  /**
   *
   * @param {object} opts
   * @param {import('../models/FileSystem.js').FileSystem} opts.fs
   * @param {string} opts.gitdir
   * @param {object} opts.cache
   * @param {bool} opts.allowUnmerged
   * @param {function(GitIndex): any} closure
   */
  static async acquire({ fs: e, gitdir: r, cache: n, allowUnmerged: i = !0 }, a) {
    n[Ra] || (n[Ra] = Nh());
    const o = `${r}/index`;
    Ia === null && (Ia = new tn({ maxPending: 1 / 0 }));
    let s, c = [];
    return await Ia.acquire(o, async () => {
      const f = n[Ra];
      await Uh(e, o, f) && await Mh(e, o, f);
      const l = f.map.get(o);
      if (c = l.unmergedPaths, c.length && !i)
        throw new un(c);
      if (s = await a(l), l._dirty) {
        const w = await l.toObject();
        await e.write(o, w), f.stats.set(o, await e.lstat(o)), l._dirty = !1;
      }
    }), s;
  }
}
function zn(t) {
  const e = Math.max(t.lastIndexOf("/"), t.lastIndexOf("\\"));
  return e > -1 && (t = t.slice(e + 1)), t;
}
function Or(t) {
  const e = Math.max(t.lastIndexOf("/"), t.lastIndexOf("\\"));
  return e === -1 ? "." : e === 0 ? "/" : t.slice(0, e);
}
function xl(t) {
  const e = /* @__PURE__ */ new Map(), r = function(i) {
    if (!e.has(i)) {
      const a = {
        type: "tree",
        fullpath: i,
        basename: zn(i),
        metadata: {},
        children: []
      };
      e.set(i, a), a.parent = r(Or(i)), a.parent && a.parent !== a && a.parent.children.push(a);
    }
    return e.get(i);
  }, n = function(i, a) {
    if (!e.has(i)) {
      const o = {
        type: "blob",
        fullpath: i,
        basename: zn(i),
        metadata: a,
        // This recursively generates any missing parent folders.
        parent: r(Or(i)),
        children: []
      };
      o.parent && o.parent.children.push(o), e.set(i, o);
    }
    return e.get(i);
  };
  r(".");
  for (const i of t)
    n(i.path, i);
  return e;
}
function jh(t) {
  switch (t) {
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
  throw new Oe(`Unexpected GitTree entry mode: ${t.toString(8)}`);
}
class Lh {
  constructor({ fs: e, gitdir: r, cache: n }) {
    this.treePromise = ut.acquire(
      { fs: e, gitdir: r, cache: n },
      async function(a) {
        return xl(a.entries);
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
    const r = e._fullpath, i = (await this.treePromise).get(r);
    if (!i || i.type === "blob") return null;
    if (i.type !== "tree")
      throw new Error(`ENOTDIR: not a directory, scandir '${r}'`);
    const a = i.children.map((o) => o.fullpath);
    return a.sort(Jn), a;
  }
  async type(e) {
    return e._type === !1 && await e.stat(), e._type;
  }
  async mode(e) {
    return e._mode === !1 && await e.stat(), e._mode;
  }
  async stat(e) {
    if (e._stat === !1) {
      const n = (await this.treePromise).get(e._fullpath);
      if (!n)
        throw new Error(
          `ENOENT: no such file or directory, lstat '${e._fullpath}'`
        );
      const i = n.type === "tree" ? {} : Dr(n.metadata);
      e._type = n.type === "tree" ? "tree" : jh(i.mode), e._mode = i.mode, n.type === "tree" ? e._stat = void 0 : e._stat = i;
    }
    return e._stat;
  }
  async content(e) {
  }
  async oid(e) {
    if (e._oid === !1) {
      const n = (await this.treePromise).get(e._fullpath);
      e._oid = n.metadata.oid;
    }
    return e._oid;
  }
}
const Qn = Symbol("GitWalkSymbol");
function zr() {
  const t = /* @__PURE__ */ Object.create(null);
  return Object.defineProperty(t, Qn, {
    value: function({ fs: e, gitdir: r, cache: n }) {
      return new Lh({ fs: e, gitdir: r, cache: n });
    }
  }), Object.freeze(t), t;
}
class Ge extends ze {
  /**
   * @param {string} what
   */
  constructor(e) {
    super(`Could not find ${e}.`), this.code = this.name = Ge.code, this.data = { what: e };
  }
}
Ge.code = "NotFoundError";
class yt extends ze {
  /**
   * @param {string} oid
   * @param {'blob'|'commit'|'tag'|'tree'} actual
   * @param {'blob'|'commit'|'tag'|'tree'} expected
   * @param {string} [filepath]
   */
  constructor(e, r, n, i) {
    super(
      `Object ${e} ${i ? `at ${i}` : ""}was anticipated to be a ${n} but it is a ${r}.`
    ), this.code = this.name = yt.code, this.data = { oid: e, actual: r, expected: n, filepath: i };
  }
}
yt.code = "ObjectTypeError";
class or extends ze {
  /**
   * @param {string} value
   */
  constructor(e) {
    super(`Expected a 40-char hex object id but saw "${e}".`), this.code = this.name = or.code, this.data = { value: e };
  }
}
or.code = "InvalidOidError";
class fn extends ze {
  /**
   * @param {string} remote
   */
  constructor(e) {
    super(`Could not find a fetch refspec for remote "${e}". Make sure the config file has an entry like the following:
[remote "${e}"]
	fetch = +refs/heads/*:refs/remotes/origin/*
`), this.code = this.name = fn.code, this.data = { remote: e };
  }
}
fn.code = "NoRefspecError";
class qn {
  constructor(e) {
    if (this.refs = /* @__PURE__ */ new Map(), this.parsedConfig = [], e) {
      let r = null;
      this.parsedConfig = e.trim().split(`
`).map((n) => {
        if (/^\s*#/.test(n))
          return { line: n, comment: !0 };
        const i = n.indexOf(" ");
        if (n.startsWith("^")) {
          const a = n.slice(1);
          return this.refs.set(r + "^{}", a), { line: n, ref: r, peeled: a };
        } else {
          const a = n.slice(0, i);
          return r = n.slice(i + 1), this.refs.set(r, a), { line: n, ref: r, oid: a };
        }
      });
    }
    return this;
  }
  static from(e) {
    return new qn(e);
  }
  delete(e) {
    this.parsedConfig = this.parsedConfig.filter((r) => r.ref !== e), this.refs.delete(e);
  }
  toString() {
    return this.parsedConfig.map(({ line: e }) => e).join(`
`) + `
`;
  }
}
class Wn {
  constructor({ remotePath: e, localPath: r, force: n, matchPrefix: i }) {
    Object.assign(this, {
      remotePath: e,
      localPath: r,
      force: n,
      matchPrefix: i
    });
  }
  static from(e) {
    const [
      r,
      n,
      i,
      a,
      o
    ] = e.match(/^(\+?)(.*?)(\*?):(.*?)(\*?)$/).slice(1), s = r === "+", c = i === "*";
    if (c !== (o === "*"))
      throw new Oe("Invalid refspec");
    return new Wn({
      remotePath: n,
      localPath: a,
      force: s,
      matchPrefix: c
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
class _o {
  constructor(e = []) {
    this.rules = e;
  }
  static from(e) {
    const r = [];
    for (const n of e)
      r.push(Wn.from(n));
    return new _o(r);
  }
  add(e) {
    const r = Wn.from(e);
    this.rules.push(r);
  }
  translate(e) {
    const r = [];
    for (const n of this.rules)
      for (const i of e) {
        const a = n.translate(i);
        a && r.push([i, a]);
      }
    return r;
  }
  translateOne(e) {
    let r = null;
    for (const n of this.rules) {
      const i = n.translate(e);
      i && (r = i);
    }
    return r;
  }
  localNamespaces() {
    return this.rules.filter((e) => e.matchPrefix).map((e) => e.localPath.replace(/\/$/, ""));
  }
}
function zh(t, e) {
  const r = t.replace(/\^\{\}$/, ""), n = e.replace(/\^\{\}$/, ""), i = -(r < n) || +(r > n);
  return i === 0 ? t.endsWith("^{}") ? 1 : -1 : i;
}
const qh = (t) => {
  if (typeof t == "number")
    return t;
  t = t.toLowerCase();
  let e = parseInt(t);
  return t.endsWith("k") && (e *= 1024), t.endsWith("m") && (e *= 1024 * 1024), t.endsWith("g") && (e *= 1024 * 1024 * 1024), e;
}, Jr = (t) => {
  if (typeof t == "boolean")
    return t;
  if (t = t.trim().toLowerCase(), t === "true" || t === "yes" || t === "on") return !0;
  if (t === "false" || t === "no" || t === "off") return !1;
  throw Error(
    `Expected 'true', 'false', 'yes', 'no', 'on', or 'off', but got ${t}`
  );
}, cc = {
  core: {
    filemode: Jr,
    bare: Jr,
    logallrefupdates: Jr,
    symlinks: Jr,
    ignorecase: Jr,
    bigFileThreshold: qh
  }
}, Wh = /^\[([A-Za-z0-9-.]+)(?: "(.*)")?\]$/, Hh = /^[A-Za-z0-9-.]+$/, Gh = /^([A-Za-z][A-Za-z-]*)(?: *= *(.*))?$/, Zh = /^[A-Za-z][A-Za-z-]*$/, Vh = /^(.*?)( *[#;].*)$/, Xh = (t) => {
  const e = Wh.exec(t);
  if (e != null) {
    const [r, n] = e.slice(1);
    return [r, n];
  }
  return null;
}, Yh = (t) => {
  const e = Gh.exec(t);
  if (e != null) {
    const [r, n = "true"] = e.slice(1), i = Kh(n), a = Jh(i);
    return [r, a];
  }
  return null;
}, Kh = (t) => {
  const e = Vh.exec(t);
  if (e == null)
    return t;
  const [r, n] = e.slice(1);
  return lc(r) && lc(n) ? `${r}${n}` : r;
}, lc = (t) => (t.match(/(?:^|[^\\])"/g) || []).length % 2 !== 0, Jh = (t) => t.split("").reduce((e, r, n, i) => {
  const a = r === '"' && i[n - 1] !== "\\", o = r === "\\" && i[n + 1] === '"';
  return a || o ? e : e + r;
}, ""), uc = (t) => t != null ? t.toLowerCase() : null, no = (t, e, r) => [uc(t), e, uc(r)].filter((n) => n != null).join("."), fc = (t) => {
  const e = t.split("."), r = e.shift(), n = e.pop(), i = e.length ? e.join(".") : void 0;
  return {
    section: r,
    subsection: i,
    name: n,
    path: no(r, i, n),
    sectionPath: no(r, i, null),
    isSection: !!r
  };
}, Qh = (t, e) => t.reduce((r, n, i) => e(n) ? i : r, -1);
class bo {
  constructor(e) {
    let r = null, n = null;
    this.parsedConfig = e ? e.split(`
`).map((i) => {
      let a = null, o = null;
      const s = i.trim(), c = Xh(s), f = c != null;
      if (f)
        [r, n] = c;
      else {
        const w = Yh(s);
        w != null && ([a, o] = w);
      }
      const l = no(r, n, a);
      return { line: i, isSection: f, section: r, subsection: n, name: a, value: o, path: l };
    }) : [];
  }
  static from(e) {
    return new bo(e);
  }
  async get(e, r = !1) {
    const n = fc(e).path, i = this.parsedConfig.filter((a) => a.path === n).map(({ section: a, name: o, value: s }) => {
      const c = cc[a] && cc[a][o];
      return c ? c(s) : s;
    });
    return r ? i : i.pop();
  }
  async getall(e) {
    return this.get(e, !0);
  }
  async getSubsections(e) {
    return this.parsedConfig.filter((r) => r.isSection && r.section === e).map((r) => r.subsection);
  }
  async deleteSection(e, r) {
    this.parsedConfig = this.parsedConfig.filter(
      (n) => !(n.section === e && n.subsection === r)
    );
  }
  async append(e, r) {
    return this.set(e, r, !0);
  }
  async set(e, r, n = !1) {
    const {
      section: i,
      subsection: a,
      name: o,
      path: s,
      sectionPath: c,
      isSection: f
    } = fc(e), l = Qh(
      this.parsedConfig,
      (w) => w.path === s
    );
    if (r == null)
      l !== -1 && this.parsedConfig.splice(l, 1);
    else if (l !== -1) {
      const w = this.parsedConfig[l], m = Object.assign({}, w, {
        name: o,
        value: r,
        modified: !0
      });
      n ? this.parsedConfig.splice(l + 1, 0, m) : this.parsedConfig[l] = m;
    } else {
      const w = this.parsedConfig.findIndex(
        (g) => g.path === c
      ), m = {
        section: i,
        subsection: a,
        name: o,
        value: r,
        modified: !0,
        path: s
      };
      if (Hh.test(i) && Zh.test(o))
        if (w >= 0)
          this.parsedConfig.splice(w + 1, 0, m);
        else {
          const g = {
            isSection: f,
            section: i,
            subsection: a,
            modified: !0,
            path: c
          };
          this.parsedConfig.push(g, m);
        }
    }
  }
  toString() {
    return this.parsedConfig.map(({ line: e, section: r, subsection: n, name: i, value: a, modified: o = !1 }) => o ? i != null && a != null ? typeof a == "string" && /[#;]/.test(a) ? `	${i} = "${a}"` : `	${i} = ${a}` : n != null ? `[${r} "${n}"]` : `[${r}]` : e).join(`
`);
  }
}
class ot {
  static async get({ fs: e, gitdir: r }) {
    const n = await e.read(`${r}/config`, { encoding: "utf8" });
    return bo.from(n);
  }
  static async save({ fs: e, gitdir: r, config: n }) {
    await e.write(`${r}/config`, n.toString(), {
      encoding: "utf8"
    });
  }
}
const Cn = (t) => [
  `${t}`,
  `refs/${t}`,
  `refs/tags/${t}`,
  `refs/heads/${t}`,
  `refs/remotes/${t}`,
  `refs/remotes/${t}/HEAD`
], ed = ["config", "description", "index", "shallow", "commondir"];
let Ta;
async function nr(t, e) {
  return Ta === void 0 && (Ta = new tn()), Ta.acquire(t, e);
}
class ce {
  static async updateRemoteRefs({
    fs: e,
    gitdir: r,
    remote: n,
    refs: i,
    symrefs: a,
    tags: o,
    refspecs: s = void 0,
    prune: c = !1,
    pruneTags: f = !1
  }) {
    for (const R of i.values())
      if (!R.match(/[0-9a-f]{40}/))
        throw new or(R);
    const l = await ot.get({ fs: e, gitdir: r });
    if (!s) {
      if (s = await l.getall(`remote.${n}.fetch`), s.length === 0)
        throw new fn(n);
      s.unshift(`+HEAD:refs/remotes/${n}/HEAD`);
    }
    const w = _o.from(s), m = /* @__PURE__ */ new Map();
    if (f) {
      const R = await ce.listRefs({
        fs: e,
        gitdir: r,
        filepath: "refs/tags"
      });
      await ce.deleteRefs({
        fs: e,
        gitdir: r,
        refs: R.map((S) => `refs/tags/${S}`)
      });
    }
    if (o) {
      for (const R of i.keys())
        if (R.startsWith("refs/tags") && !R.endsWith("^{}") && !await ce.exists({ fs: e, gitdir: r, ref: R })) {
          const S = i.get(R);
          m.set(R, S);
        }
    }
    const g = w.translate([...i.keys()]);
    for (const [R, S] of g) {
      const A = i.get(R);
      m.set(S, A);
    }
    const b = w.translate([...a.keys()]);
    for (const [R, S] of b) {
      const A = a.get(R), B = w.translateOne(A);
      B && m.set(S, `ref: ${B}`);
    }
    const T = [];
    if (c) {
      for (const R of w.localNamespaces()) {
        const S = (await ce.listRefs({
          fs: e,
          gitdir: r,
          filepath: R
        })).map((A) => `${R}/${A}`);
        for (const A of S)
          m.has(A) || T.push(A);
      }
      T.length > 0 && await ce.deleteRefs({ fs: e, gitdir: r, refs: T });
    }
    for (const [R, S] of m)
      await nr(
        R,
        async () => e.write(re.join(r, R), `${S.trim()}
`, "utf8")
      );
    return { pruned: T };
  }
  // TODO: make this less crude?
  static async writeRef({ fs: e, gitdir: r, ref: n, value: i }) {
    if (!i.match(/[0-9a-f]{40}/))
      throw new or(i);
    await nr(
      n,
      async () => e.write(re.join(r, n), `${i.trim()}
`, "utf8")
    );
  }
  static async writeSymbolicRef({ fs: e, gitdir: r, ref: n, value: i }) {
    await nr(
      n,
      async () => e.write(re.join(r, n), `ref: ${i.trim()}
`, "utf8")
    );
  }
  static async deleteRef({ fs: e, gitdir: r, ref: n }) {
    return ce.deleteRefs({ fs: e, gitdir: r, refs: [n] });
  }
  static async deleteRefs({ fs: e, gitdir: r, refs: n }) {
    await Promise.all(n.map((s) => e.rm(re.join(r, s))));
    let i = await nr(
      "packed-refs",
      async () => e.read(`${r}/packed-refs`, { encoding: "utf8" })
    );
    const a = qn.from(i), o = a.refs.size;
    for (const s of n)
      a.refs.has(s) && a.delete(s);
    a.refs.size < o && (i = a.toString(), await nr(
      "packed-refs",
      async () => e.write(`${r}/packed-refs`, i, { encoding: "utf8" })
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
  static async resolve({ fs: e, gitdir: r, ref: n, depth: i = void 0 }) {
    if (i !== void 0 && (i--, i === -1))
      return n;
    if (n.startsWith("ref: "))
      return n = n.slice(5), ce.resolve({ fs: e, gitdir: r, ref: n, depth: i });
    if (n.length === 40 && /[0-9a-f]{40}/.test(n))
      return n;
    const a = await ce.packedRefs({ fs: e, gitdir: r }), o = Cn(n).filter((s) => !ed.includes(s));
    for (const s of o) {
      const c = await nr(
        s,
        async () => await e.read(`${r}/${s}`, { encoding: "utf8" }) || a.get(s)
      );
      if (c)
        return ce.resolve({ fs: e, gitdir: r, ref: c.trim(), depth: i });
    }
    throw new Ge(n);
  }
  static async exists({ fs: e, gitdir: r, ref: n }) {
    try {
      return await ce.expand({ fs: e, gitdir: r, ref: n }), !0;
    } catch {
      return !1;
    }
  }
  static async expand({ fs: e, gitdir: r, ref: n }) {
    if (n.length === 40 && /[0-9a-f]{40}/.test(n))
      return n;
    const i = await ce.packedRefs({ fs: e, gitdir: r }), a = Cn(n);
    for (const o of a)
      if (await nr(
        o,
        async () => e.exists(`${r}/${o}`)
      ) || i.has(o)) return o;
    throw new Ge(n);
  }
  static async expandAgainstMap({ ref: e, map: r }) {
    const n = Cn(e);
    for (const i of n)
      if (await r.has(i)) return i;
    throw new Ge(e);
  }
  static resolveAgainstMap({ ref: e, fullref: r = e, depth: n = void 0, map: i }) {
    if (n !== void 0 && (n--, n === -1))
      return { fullref: r, oid: e };
    if (e.startsWith("ref: "))
      return e = e.slice(5), ce.resolveAgainstMap({ ref: e, fullref: r, depth: n, map: i });
    if (e.length === 40 && /[0-9a-f]{40}/.test(e))
      return { fullref: r, oid: e };
    const a = Cn(e);
    for (const o of a) {
      const s = i.get(o);
      if (s)
        return ce.resolveAgainstMap({
          ref: s.trim(),
          fullref: o,
          depth: n,
          map: i
        });
    }
    throw new Ge(e);
  }
  static async packedRefs({ fs: e, gitdir: r }) {
    const n = await nr(
      "packed-refs",
      async () => e.read(`${r}/packed-refs`, { encoding: "utf8" })
    );
    return qn.from(n).refs;
  }
  // List all the refs that match the `filepath` prefix
  static async listRefs({ fs: e, gitdir: r, filepath: n }) {
    const i = ce.packedRefs({ fs: e, gitdir: r });
    let a = null;
    try {
      a = await e.readdirDeep(`${r}/${n}`), a = a.map((o) => o.replace(`${r}/${n}/`, ""));
    } catch {
      a = [];
    }
    for (let o of (await i).keys())
      o.startsWith(n) && (o = o.replace(n + "/", ""), a.includes(o) || a.push(o));
    return a.sort(zh), a;
  }
  static async listBranches({ fs: e, gitdir: r, remote: n }) {
    return n ? ce.listRefs({
      fs: e,
      gitdir: r,
      filepath: `refs/remotes/${n}`
    }) : ce.listRefs({ fs: e, gitdir: r, filepath: "refs/heads" });
  }
  static async listTags({ fs: e, gitdir: r }) {
    return (await ce.listRefs({
      fs: e,
      gitdir: r,
      filepath: "refs/tags"
    })).filter((i) => !i.endsWith("^{}"));
  }
}
function td(t, e) {
  return Jn(hc(t), hc(e));
}
function hc(t) {
  return t.mode === "040000" ? t.path + "/" : t.path;
}
function Al(t) {
  switch (t) {
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
  throw new Oe(`Unexpected GitTree entry mode: ${t}`);
}
function rd(t) {
  const e = [];
  let r = 0;
  for (; r < t.length; ) {
    const n = t.indexOf(32, r);
    if (n === -1)
      throw new Oe(
        `GitTree: Error parsing buffer at byte location ${r}: Could not find the next space character.`
      );
    const i = t.indexOf(0, r);
    if (i === -1)
      throw new Oe(
        `GitTree: Error parsing buffer at byte location ${r}: Could not find the next null character.`
      );
    let a = t.slice(r, n).toString("utf8");
    a === "40000" && (a = "040000");
    const o = Al(a), s = t.slice(n + 1, i).toString("utf8");
    if (s.includes("\\") || s.includes("/"))
      throw new Lr(s);
    const c = t.slice(i + 1, i + 21).toString("hex");
    r = i + 21, e.push({ mode: a, path: s, oid: c, type: o });
  }
  return e;
}
function nd(t) {
  if (typeof t == "number" && (t = t.toString(8)), t.match(/^0?4.*/)) return "040000";
  if (t.match(/^1006.*/)) return "100644";
  if (t.match(/^1007.*/)) return "100755";
  if (t.match(/^120.*/)) return "120000";
  if (t.match(/^160.*/)) return "160000";
  throw new Oe(`Could not understand file mode: ${t}`);
}
function id(t) {
  return !t.oid && t.sha && (t.oid = t.sha), t.mode = nd(t.mode), t.type || (t.type = Al(t.mode)), t;
}
class bt {
  constructor(e) {
    if (he.isBuffer(e))
      this._entries = rd(e);
    else if (Array.isArray(e))
      this._entries = e.map(id);
    else
      throw new Oe("invalid type passed to GitTree constructor");
    this._entries.sort(El);
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
    return e.sort(td), he.concat(
      e.map((r) => {
        const n = he.from(r.mode.replace(/^0/, "")), i = he.from(" "), a = he.from(r.path, "utf8"), o = he.from([0]), s = he.from(r.oid, "hex");
        return he.concat([n, i, a, o, s]);
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
class qr {
  static wrap({ type: e, object: r }) {
    return he.concat([
      he.from(`${e} ${r.byteLength.toString()}\0`),
      he.from(r)
    ]);
  }
  static unwrap(e) {
    const r = e.indexOf(32), n = e.indexOf(0), i = e.slice(0, r).toString("utf8"), a = e.slice(r + 1, n).toString("utf8"), o = e.length - (n + 1);
    if (parseInt(a) !== o)
      throw new Oe(
        `Length mismatch: expected ${a} bytes but got ${o} instead.`
      );
    return {
      type: i,
      object: he.from(e.slice(n + 1))
    };
  }
}
async function Il({ fs: t, gitdir: e, oid: r }) {
  const n = `objects/${r.slice(0, 2)}/${r.slice(2)}`, i = await t.read(`${e}/${n}`);
  return i ? { object: i, format: "deflated", source: n } : null;
}
function ad(t, e) {
  const r = new Wt(t), n = dc(r);
  if (n !== e.byteLength)
    throw new Oe(
      `applyDelta expected source buffer to be ${n} bytes but the provided buffer was ${e.length} bytes`
    );
  const i = dc(r);
  let a;
  const o = wc(r, e);
  if (o.byteLength === i)
    a = o;
  else {
    a = he.alloc(i);
    const s = new Wt(a);
    for (s.copy(o); !r.eof(); )
      s.copy(wc(r, e));
    const c = s.tell();
    if (i !== c)
      throw new Oe(
        `applyDelta expected target buffer to be ${i} bytes but the resulting buffer was ${c} bytes`
      );
  }
  return a;
}
function dc(t) {
  let e = 0, r = 0, n = null;
  do
    n = t.readUInt8(), e |= (n & 127) << r, r += 7;
  while (n & 128);
  return e;
}
function pc(t, e, r) {
  let n = 0, i = 0;
  for (; r--; )
    e & 1 && (n |= t.readUInt8() << i), e >>= 1, i += 8;
  return n;
}
function wc(t, e) {
  const r = t.readUInt8(), n = 128, i = 15, a = 112;
  if (r & n) {
    const o = pc(t, r & i, 4);
    let s = pc(t, (r & a) >> 4, 3);
    return s === 0 && (s = 65536), e.slice(o, o + s);
  } else
    return t.slice(r);
}
function od(t) {
  let e = [t];
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
function Rl(t) {
  return t[Symbol.asyncIterator] ? t[Symbol.asyncIterator]() : t[Symbol.iterator] ? t[Symbol.iterator]() : t.next ? t : od(t);
}
class Tl {
  constructor(e) {
    if (typeof he > "u")
      throw new Error("Missing Buffer dependency");
    this.stream = Rl(e), this.buffer = null, this.cursor = 0, this.undoCursor = 0, this.started = !1, this._ended = !1, this._discardedBytes = 0;
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
    let { done: e, value: r } = await this.stream.next();
    return e && (this._ended = !0, !r) ? he.alloc(0) : (r && (r = he.from(r)), r);
  }
  _trim() {
    this.buffer = this.buffer.slice(this.undoCursor), this.cursor -= this.undoCursor, this._discardedBytes += this.undoCursor, this.undoCursor = 0;
  }
  _moveCursor(e) {
    this.undoCursor = this.cursor, this.cursor += e, this.cursor > this.buffer.length && (this.cursor = this.buffer.length);
  }
  async _accumulate(e) {
    if (this._ended) return;
    const r = [this.buffer];
    for (; this.cursor + e > sd(r); ) {
      const n = await this._next();
      if (this._ended) break;
      r.push(n);
    }
    this.buffer = he.concat(r);
  }
  async _loadnext() {
    this._discardedBytes += this.buffer.length, this.undoCursor = 0, this.cursor = 0, this.buffer = await this._next();
  }
  async _init() {
    this.buffer = await this._next();
  }
}
function sd(t) {
  return t.reduce((e, r) => e + r.length, 0);
}
async function cd(t, e) {
  const r = new Tl(t);
  let n = await r.read(4);
  if (n = n.toString("utf8"), n !== "PACK")
    throw new Oe(`Invalid PACK header '${n}'`);
  let i = await r.read(4);
  if (i = i.readUInt32BE(0), i !== 2)
    throw new Oe(`Invalid packfile version: ${i}`);
  let a = await r.read(4);
  if (a = a.readUInt32BE(0), !(a < 1))
    for (; !r.eof() && a--; ) {
      const o = r.tell(), { type: s, length: c, ofs: f, reference: l } = await ld(r), w = new vo.Inflate();
      for (; !w.result; ) {
        const m = await r.chunk();
        if (!m) break;
        if (w.push(m, !1), w.err)
          throw new Oe(`Pako error: ${w.msg}`);
        if (w.result) {
          if (w.result.length !== c)
            throw new Oe(
              "Inflated object size is different from that stated in packfile."
            );
          await r.undo(), await r.read(m.length - w.strm.avail_in);
          const g = r.tell();
          await e({
            data: w.result,
            type: s,
            num: a,
            offset: o,
            end: g,
            reference: l,
            ofs: f
          });
        }
      }
    }
}
async function ld(t) {
  let e = await t.byte();
  const r = e >> 4 & 7;
  let n = e & 15;
  if (e & 128) {
    let o = 4;
    do
      e = await t.byte(), n |= (e & 127) << o, o += 7;
    while (e & 128);
  }
  let i, a;
  if (r === 6) {
    let o = 0;
    i = 0;
    const s = [];
    do
      e = await t.byte(), i |= (e & 127) << o, o += 7, s.push(e);
    while (e & 128);
    a = he.from(s);
  }
  return r === 7 && (a = await t.read(20)), { type: r, length: n, ofs: i, reference: a };
}
async function $l(t) {
  return vo.inflate(t);
}
function ud(t) {
  const e = [];
  let r = 0, n = 0;
  do {
    r = t.readUInt8();
    const i = r & 127;
    e.push(i), n = r & 128;
  } while (n);
  return e.reduce((i, a) => i + 1 << 7 | a, -1);
}
function fd(t, e) {
  let r = e, n = 4, i = null;
  do
    i = t.readUInt8(), r |= (i & 127) << n, n += 7;
  while (i & 128);
  return r;
}
class Cr {
  constructor(e) {
    Object.assign(this, e), this.offsetCache = {};
  }
  static async fromIdx({ idx: e, getExternalRefDelta: r }) {
    const n = new Wt(e);
    if (n.slice(4).toString("hex") !== "ff744f63")
      return;
    const a = n.readUInt32BE();
    if (a !== 2)
      throw new Oe(
        `Unable to read version ${a} packfile IDX. (Only version 2 supported)`
      );
    if (e.byteLength > 2048 * 1024 * 1024)
      throw new Oe(
        "To keep implementation simple, I haven't implemented the layer 5 feature needed to support packfiles > 2GB in size."
      );
    n.seek(n.tell() + 4 * 255);
    const o = n.readUInt32BE(), s = [];
    for (let l = 0; l < o; l++) {
      const w = n.slice(20).toString("hex");
      s[l] = w;
    }
    n.seek(n.tell() + 4 * o);
    const c = /* @__PURE__ */ new Map();
    for (let l = 0; l < o; l++)
      c.set(s[l], n.readUInt32BE());
    const f = n.slice(20).toString("hex");
    return new Cr({
      hashes: s,
      crcs: {},
      offsets: c,
      packfileSha: f,
      getExternalRefDelta: r
    });
  }
  static async fromPack({ pack: e, getExternalRefDelta: r, onProgress: n }) {
    const i = {
      1: "commit",
      2: "tree",
      3: "blob",
      4: "tag",
      6: "ofs-delta",
      7: "ref-delta"
    }, a = {}, o = e.slice(-20).toString("hex"), s = [], c = {}, f = /* @__PURE__ */ new Map();
    let l = null, w = null;
    await cd([e], async ({ data: R, type: S, reference: A, offset: B, num: N }) => {
      l === null && (l = N);
      const U = Math.floor(
        (l - N) * 100 / l
      );
      U !== w && n && await n({
        phase: "Receiving objects",
        loaded: l - N,
        total: l
      }), w = U, S = i[S], ["commit", "tree", "blob", "tag"].includes(S) ? a[B] = {
        type: S,
        offset: B
      } : S === "ofs-delta" ? a[B] = {
        type: S,
        offset: B
      } : S === "ref-delta" && (a[B] = {
        type: S,
        offset: B
      });
    });
    const m = Object.keys(a).map(Number);
    for (const [R, S] of m.entries()) {
      const A = R + 1 === m.length ? e.byteLength - 20 : m[R + 1], B = a[S], N = uh.buf(e.slice(S, A)) >>> 0;
      B.end = A, B.crc = N;
    }
    const g = new Cr({
      pack: Promise.resolve(e),
      packfileSha: o,
      crcs: c,
      hashes: s,
      offsets: f,
      getExternalRefDelta: r
    });
    w = null;
    let b = 0;
    const T = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let R in a) {
      R = Number(R);
      const S = Math.floor(b * 100 / l);
      S !== w && n && await n({
        phase: "Resolving deltas",
        loaded: b,
        total: l
      }), b++, w = S;
      const A = a[R];
      if (!A.oid)
        try {
          g.readDepth = 0, g.externalReadDepth = 0;
          const { type: B, object: N } = await g.readSlice({ start: R });
          T[g.readDepth] += 1;
          const U = await Jt(qr.wrap({ type: B, object: N }));
          A.oid = U, s.push(U), f.set(U, R), c[U] = A.crc;
        } catch {
          continue;
        }
    }
    return s.sort(), g;
  }
  async toBuffer() {
    const e = [], r = (f, l) => {
      e.push(he.from(f, l));
    };
    r("ff744f63", "hex"), r("00000002", "hex");
    const n = new Wt(he.alloc(256 * 4));
    for (let f = 0; f < 256; f++) {
      let l = 0;
      for (const w of this.hashes)
        parseInt(w.slice(0, 2), 16) <= f && l++;
      n.writeUInt32BE(l);
    }
    e.push(n.buffer);
    for (const f of this.hashes)
      r(f, "hex");
    const i = new Wt(he.alloc(this.hashes.length * 4));
    for (const f of this.hashes)
      i.writeUInt32BE(this.crcs[f]);
    e.push(i.buffer);
    const a = new Wt(he.alloc(this.hashes.length * 4));
    for (const f of this.hashes)
      a.writeUInt32BE(this.offsets.get(f));
    e.push(a.buffer), r(this.packfileSha, "hex");
    const o = he.concat(e), s = await Jt(o), c = he.alloc(20);
    return c.write(s, "hex"), he.concat([o, c]);
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
      throw new Oe(`Could not read object ${e} from packfile`);
    }
    const r = this.offsets.get(e);
    return this.readSlice({ start: r });
  }
  async readSlice({ start: e }) {
    if (this.offsetCache[e])
      return Object.assign({}, this.offsetCache[e]);
    this.readDepth++;
    const r = {
      16: "commit",
      32: "tree",
      48: "blob",
      64: "tag",
      96: "ofs_delta",
      112: "ref_delta"
    };
    if (!this.pack)
      throw new Oe(
        "Tried to read from a GitPackIndex with no packfile loaded into memory"
      );
    const n = (await this.pack).slice(e), i = new Wt(n), a = i.readUInt8(), o = a & 112;
    let s = r[o];
    if (s === void 0)
      throw new Oe("Unrecognized type: 0b" + o.toString(2));
    const c = a & 15;
    let f = c;
    a & 128 && (f = fd(i, c));
    let w = null, m = null;
    if (s === "ofs_delta") {
      const b = ud(i), T = e - b;
      ({ object: w, type: s } = await this.readSlice({ start: T }));
    }
    if (s === "ref_delta") {
      const b = i.slice(20).toString("hex");
      ({ object: w, type: s } = await this.read({ oid: b }));
    }
    const g = n.slice(i.tell());
    if (m = he.from(await $l(g)), m.byteLength !== f)
      throw new Oe(
        `Packfile told us object would have length ${f} but it had length ${m.byteLength}`
      );
    return w && (m = he.from(ad(m, w))), this.readDepth > 3 && (this.offsetCache[e] = { type: s, object: m }), { type: s, format: "content", object: m };
  }
}
const Fn = Symbol("PackfileCache");
async function hd({
  fs: t,
  filename: e,
  getExternalRefDelta: r,
  emitter: n,
  emitterPrefix: i
}) {
  const a = await t.read(e);
  return Cr.fromIdx({ idx: a, getExternalRefDelta: r });
}
function Eo({
  fs: t,
  cache: e,
  filename: r,
  getExternalRefDelta: n,
  emitter: i,
  emitterPrefix: a
}) {
  e[Fn] || (e[Fn] = /* @__PURE__ */ new Map());
  let o = e[Fn].get(r);
  return o || (o = hd({
    fs: t,
    filename: r,
    getExternalRefDelta: n,
    emitter: i,
    emitterPrefix: a
  }), e[Fn].set(r, o)), o;
}
async function dd({
  fs: t,
  cache: e,
  gitdir: r,
  oid: n,
  format: i = "content",
  getExternalRefDelta: a
}) {
  let o = await t.readdir(re.join(r, "objects/pack"));
  o = o.filter((s) => s.endsWith(".idx"));
  for (const s of o) {
    const c = `${r}/objects/pack/${s}`, f = await Eo({
      fs: t,
      cache: e,
      filename: c,
      getExternalRefDelta: a
    });
    if (f.error) throw new Oe(f.error);
    if (f.offsets.has(n)) {
      if (!f.pack) {
        const w = c.replace(/idx$/, "pack");
        f.pack = t.read(w);
      }
      const l = await f.read({ oid: n, getExternalRefDelta: a });
      return l.format = "content", l.source = `objects/pack/${s.replace(/idx$/, "pack")}`, l;
    }
  }
  return null;
}
async function Qe({
  fs: t,
  cache: e,
  gitdir: r,
  oid: n,
  format: i = "content"
}) {
  const a = (l) => Qe({ fs: t, cache: e, gitdir: r, oid: l });
  let o;
  if (n === "4b825dc642cb6eb9a060e54bf8d69288fbee4904" && (o = { format: "wrapped", object: he.from("tree 0\0") }), o || (o = await Il({ fs: t, gitdir: r, oid: n })), !o) {
    if (o = await dd({
      fs: t,
      cache: e,
      gitdir: r,
      oid: n,
      getExternalRefDelta: a
    }), !o)
      throw new Ge(n);
    return o;
  }
  if (i === "deflated" || (o.format === "deflated" && (o.object = he.from(await $l(o.object)), o.format = "wrapped"), i === "wrapped"))
    return o;
  const s = await Jt(o.object);
  if (s !== n)
    throw new Oe(
      `SHA check failed! Expected ${n}, computed ${s}`
    );
  const { object: c, type: f } = qr.unwrap(o.object);
  if (o.type = f, o.object = c, o.format = "content", i === "content")
    return o;
  throw new Oe(`invalid requested format "${i}"`);
}
class Mt extends ze {
  /**
   * @param {'note'|'remote'|'tag'|'branch'} noun
   * @param {string} where
   * @param {boolean} canForce
   */
  constructor(e, r, n = !0) {
    super(
      `Failed to create ${e} at ${r} because it already exists.${n ? ` (Hint: use 'force: true' parameter to overwrite existing ${e}.)` : ""}`
    ), this.code = this.name = Mt.code, this.data = { noun: e, where: r, canForce: n };
  }
}
Mt.code = "AlreadyExistsError";
class hn extends ze {
  /**
   * @param {'oids'|'refs'} nouns
   * @param {string} short
   * @param {string[]} matches
   */
  constructor(e, r, n) {
    super(
      `Found multiple ${e} matching "${r}" (${n.join(
        ", "
      )}). Use a longer abbreviation length to disambiguate them.`
    ), this.code = this.name = hn.code, this.data = { nouns: e, short: r, matches: n };
  }
}
hn.code = "AmbiguousError";
class dn extends ze {
  /**
   * @param {string[]} filepaths
   */
  constructor(e) {
    super(
      `Your local changes to the following files would be overwritten by checkout: ${e.join(
        ", "
      )}`
    ), this.code = this.name = dn.code, this.data = { filepaths: e };
  }
}
dn.code = "CheckoutConflictError";
class pn extends ze {
  /**
   * @param {string} ref
   * @param {string} oid
   */
  constructor(e, r) {
    super(
      `Failed to checkout "${e}" because commit ${r} is not available locally. Do a git fetch to make the branch available locally.`
    ), this.code = this.name = pn.code, this.data = { ref: e, oid: r };
  }
}
pn.code = "CommitNotFetchedError";
class wn extends ze {
  constructor() {
    super("Empty response from git server."), this.code = this.name = wn.code, this.data = {};
  }
}
wn.code = "EmptyServerResponseError";
class mn extends ze {
  constructor() {
    super("A simple fast-forward merge was not possible."), this.code = this.name = mn.code, this.data = {};
  }
}
mn.code = "FastForwardError";
class yn extends ze {
  /**
   * @param {string} prettyDetails
   * @param {PushResult} result
   */
  constructor(e, r) {
    super(`One or more branches were not updated: ${e}`), this.code = this.name = yn.code, this.data = { prettyDetails: e, result: r };
  }
}
yn.code = "GitPushError";
class Fr extends ze {
  /**
   * @param {number} statusCode
   * @param {string} statusMessage
   * @param {string} response
   */
  constructor(e, r, n) {
    super(`HTTP Error: ${e} ${r}`), this.code = this.name = Fr.code, this.data = { statusCode: e, statusMessage: r, response: n };
  }
}
Fr.code = "HttpError";
class sr extends ze {
  /**
   * @param {'leading-slash'|'trailing-slash'|'directory'} [reason]
   */
  constructor(e) {
    let r = "invalid filepath";
    e === "leading-slash" || e === "trailing-slash" ? r = '"filepath" parameter should not include leading or trailing directory separators because these can cause problems on some platforms.' : e === "directory" && (r = '"filepath" should not be a directory.'), super(r), this.code = this.name = sr.code, this.data = { reason: e };
  }
}
sr.code = "InvalidFilepathError";
class Nt extends ze {
  /**
   * @param {string} ref
   * @param {string} suggestion
   * @param {boolean} canForce
   */
  constructor(e, r) {
    super(
      `"${e}" would be an invalid git reference. (Hint: a valid alternative would be "${r}".)`
    ), this.code = this.name = Nt.code, this.data = { ref: e, suggestion: r };
  }
}
Nt.code = "InvalidRefNameError";
class gn extends ze {
  /**
   * @param {number} depth
   */
  constructor(e) {
    super(`Maximum search depth of ${e} exceeded.`), this.code = this.name = gn.code, this.data = { depth: e };
  }
}
gn.code = "MaxDepthError";
class Wr extends ze {
  constructor() {
    super("Merges with conflicts are not supported yet."), this.code = this.name = Wr.code, this.data = {};
  }
}
Wr.code = "MergeNotSupportedError";
class Hr extends ze {
  /**
   * @param {Array<string>} filepaths
   * @param {Array<string>} bothModified
   * @param {Array<string>} deleteByUs
   * @param {Array<string>} deleteByTheirs
   */
  constructor(e, r, n, i) {
    super(
      `Automatic merge failed with one or more merge conflicts in the following files: ${e.toString()}. Fix conflicts then commit the result.`
    ), this.code = this.name = Hr.code, this.data = { filepaths: e, bothModified: r, deleteByUs: n, deleteByTheirs: i };
  }
}
Hr.code = "MergeConflictError";
class pt extends ze {
  /**
   * @param {'author'|'committer'|'tagger'} role
   */
  constructor(e) {
    super(
      `No name was provided for ${e} in the argument or in the .git/config file.`
    ), this.code = this.name = pt.code, this.data = { role: e };
  }
}
pt.code = "MissingNameError";
class _t extends ze {
  /**
   * @param {string} parameter
   */
  constructor(e) {
    super(
      `The function requires a "${e}" parameter but none was provided.`
    ), this.code = this.name = _t.code, this.data = { parameter: e };
  }
}
_t.code = "MissingParameterError";
class vn extends ze {
  /**
   * @param {Error[]} errors
   * @param {string} message
   */
  constructor(e) {
    super(
      'There are multiple errors that were thrown by the method. Please refer to the "errors" property to see more'
    ), this.code = this.name = vn.code, this.data = { errors: e }, this.errors = e;
  }
}
vn.code = "MultipleGitError";
class Sr extends ze {
  /**
   * @param {string} expected
   * @param {string} actual
   */
  constructor(e, r) {
    super(`Expected "${e}" but received "${r}".`), this.code = this.name = Sr.code, this.data = { expected: e, actual: r };
  }
}
Sr.code = "ParseError";
class Pr extends ze {
  /**
   * @param {'not-fast-forward'|'tag-exists'} reason
   */
  constructor(e) {
    let r = "";
    e === "not-fast-forward" ? r = " because it was not a simple fast-forward" : e === "tag-exists" && (r = " because tag already exists"), super(`Push rejected${r}. Use "force: true" to override.`), this.code = this.name = Pr.code, this.data = { reason: e };
  }
}
Pr.code = "PushRejectedError";
class ar extends ze {
  /**
   * @param {'shallow'|'deepen-since'|'deepen-not'|'deepen-relative'} capability
   * @param {'depth'|'since'|'exclude'|'relative'} parameter
   */
  constructor(e, r) {
    super(
      `Remote does not support the "${e}" so the "${r}" parameter cannot be used.`
    ), this.code = this.name = ar.code, this.data = { capability: e, parameter: r };
  }
}
ar.code = "RemoteCapabilityError";
class _n extends ze {
  /**
   * @param {string} preview
   * @param {string} response
   */
  constructor(e, r) {
    super(
      `Remote did not reply using the "smart" HTTP protocol. Expected "001e# service=git-upload-pack" but received: ${e}`
    ), this.code = this.name = _n.code, this.data = { preview: e, response: r };
  }
}
_n.code = "SmartHttpError";
class bn extends ze {
  /**
   * @param {string} url
   * @param {string} transport
   * @param {string} [suggestion]
   */
  constructor(e, r, n) {
    super(
      `Git remote "${e}" uses an unrecognized transport protocol: "${r}"`
    ), this.code = this.name = bn.code, this.data = { url: e, transport: r, suggestion: n };
  }
}
bn.code = "UnknownTransportError";
class En extends ze {
  /**
   * @param {string} url
   */
  constructor(e) {
    super(`Cannot parse remote URL: "${e}"`), this.code = this.name = En.code, this.data = { url: e };
  }
}
En.code = "UrlParseError";
class Gr extends ze {
  constructor() {
    super("The operation was canceled."), this.code = this.name = Gr.code, this.data = {};
  }
}
Gr.code = "UserCanceledError";
class Sn extends ze {
  /**
   * @param {Array<string>} filepaths
   */
  constructor(e) {
    super(
      `Could not merge index: Entry for '${e}' is not up to date. Either reset the index entry to HEAD, or stage your unstaged changes.`
    ), this.code = this.name = Sn.code, this.data = { filepath: e };
  }
}
Sn.code = "IndexResetError";
class kn extends ze {
  /**
   * @param {string} ref
   */
  constructor(e) {
    super(
      `"${e}" does not point to any commit. You're maybe working on a repository with no commits yet. `
    ), this.code = this.name = kn.code, this.data = { ref: e };
  }
}
kn.code = "NoCommitError";
var pd = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  AlreadyExistsError: Mt,
  AmbiguousError: hn,
  CheckoutConflictError: dn,
  CommitNotFetchedError: pn,
  EmptyServerResponseError: wn,
  FastForwardError: mn,
  GitPushError: yn,
  HttpError: Fr,
  InternalError: Oe,
  InvalidFilepathError: sr,
  InvalidOidError: or,
  InvalidRefNameError: Nt,
  MaxDepthError: gn,
  MergeNotSupportedError: Wr,
  MergeConflictError: Hr,
  MissingNameError: pt,
  MissingParameterError: _t,
  MultipleGitError: vn,
  NoRefspecError: fn,
  NotFoundError: Ge,
  ObjectTypeError: yt,
  ParseError: Sr,
  PushRejectedError: Pr,
  RemoteCapabilityError: ar,
  SmartHttpError: _n,
  UnknownTransportError: bn,
  UnsafeFilepathError: Lr,
  UrlParseError: En,
  UserCanceledError: Gr,
  UnmergedPathsError: un,
  IndexResetError: Sn,
  NoCommitError: kn
});
function io({ name: t, email: e, timestamp: r, timezoneOffset: n }) {
  return n = wd(n), `${t} <${e}> ${r} ${n}`;
}
function wd(t) {
  const e = md(yd(t));
  t = Math.abs(t);
  const r = Math.floor(t / 60);
  t -= r * 60;
  let n = String(r), i = String(t);
  return n.length < 2 && (n = "0" + n), i.length < 2 && (i = "0" + i), (e === -1 ? "-" : "+") + n + i;
}
function md(t) {
  return Math.sign(t) || (Object.is(t, -0) ? -1 : 1);
}
function yd(t) {
  return t === 0 ? t : -t;
}
function Xt(t) {
  return t = t.replace(/\r/g, ""), t = t.replace(/^\n+/, ""), t = t.replace(/\n+$/, "") + `
`, t;
}
function Hn(t) {
  const [, e, r, n, i] = t.match(
    /^(.*) <(.*)> (.*) (.*)$/
  );
  return {
    name: e,
    email: r,
    timestamp: Number(n),
    timezoneOffset: gd(i)
  };
}
function gd(t) {
  let [, e, r, n] = t.match(/(\+|-)(\d\d)(\d\d)/);
  return n = (e === "+" ? 1 : -1) * (Number(r) * 60 + Number(n)), vd(n);
}
function vd(t) {
  return t === 0 ? t : -t;
}
class mt {
  constructor(e) {
    if (typeof e == "string")
      this._tag = e;
    else if (he.isBuffer(e))
      this._tag = e.toString("utf8");
    else if (typeof e == "object")
      this._tag = mt.render(e);
    else
      throw new Oe(
        "invalid type passed to GitAnnotatedTag constructor"
      );
  }
  static from(e) {
    return new mt(e);
  }
  static render(e) {
    return `object ${e.object}
type ${e.type}
tag ${e.tag}
tagger ${io(e.tagger)}

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
`), r = [];
    for (const i of e)
      i[0] === " " ? r[r.length - 1] += `
` + i.slice(1) : r.push(i);
    const n = {};
    for (const i of r) {
      const a = i.slice(0, i.indexOf(" ")), o = i.slice(i.indexOf(" ") + 1);
      Array.isArray(n[a]) ? n[a].push(o) : n[a] = o;
    }
    return n.tagger && (n.tagger = Hn(n.tagger)), n.committer && (n.committer = Hn(n.committer)), n;
  }
  withoutSignature() {
    const e = Xt(this._tag);
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
    return Xt(e);
  }
  payload() {
    return this.withoutSignature() + `
`;
  }
  toObject() {
    return he.from(this._tag, "utf8");
  }
  static async sign(e, r, n) {
    const i = e.payload();
    let { signature: a } = await r({ payload: i, secretKey: n });
    a = Xt(a);
    const o = i + a;
    return mt.from(o);
  }
}
function $a(t) {
  return t.trim().split(`
`).map((e) => " " + e).join(`
`) + `
`;
}
function _d(t) {
  return t.split(`
`).map((e) => e.replace(/^ /, "")).join(`
`);
}
class Ye {
  constructor(e) {
    if (typeof e == "string")
      this._commit = e;
    else if (he.isBuffer(e))
      this._commit = e.toString("utf8");
    else if (typeof e == "object")
      this._commit = Ye.render(e);
    else
      throw new Oe("invalid type passed to GitCommit constructor");
  }
  static fromPayloadSignature({ payload: e, signature: r }) {
    const n = Ye.justHeaders(e), i = Ye.justMessage(e), a = Xt(
      n + `
gpgsig` + $a(r) + `
` + i
    );
    return new Ye(a);
  }
  static from(e) {
    return new Ye(e);
  }
  toObject() {
    return he.from(this._commit, "utf8");
  }
  // Todo: allow setting the headers and message
  headers() {
    return this.parseHeaders();
  }
  // Todo: allow setting the headers and message
  message() {
    return Ye.justMessage(this._commit);
  }
  parse() {
    return Object.assign({ message: this.message() }, this.headers());
  }
  static justMessage(e) {
    return Xt(e.slice(e.indexOf(`

`) + 2));
  }
  static justHeaders(e) {
    return e.slice(0, e.indexOf(`

`));
  }
  parseHeaders() {
    const e = Ye.justHeaders(this._commit).split(`
`), r = [];
    for (const i of e)
      i[0] === " " ? r[r.length - 1] += `
` + i.slice(1) : r.push(i);
    const n = {
      parent: []
    };
    for (const i of r) {
      const a = i.slice(0, i.indexOf(" ")), o = i.slice(i.indexOf(" ") + 1);
      Array.isArray(n[a]) ? n[a].push(o) : n[a] = o;
    }
    return n.author && (n.author = Hn(n.author)), n.committer && (n.committer = Hn(n.committer)), n;
  }
  static renderHeaders(e) {
    let r = "";
    if (e.tree ? r += `tree ${e.tree}
` : r += `tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
`, e.parent) {
      if (e.parent.length === void 0)
        throw new Oe("commit 'parent' property should be an array");
      for (const a of e.parent)
        r += `parent ${a}
`;
    }
    const n = e.author;
    r += `author ${io(n)}
`;
    const i = e.committer || e.author;
    return r += `committer ${io(i)}
`, e.gpgsig && (r += "gpgsig" + $a(e.gpgsig)), r;
  }
  static render(e) {
    return Ye.renderHeaders(e) + `
` + Xt(e.message);
  }
  render() {
    return this._commit;
  }
  withoutSignature() {
    const e = Xt(this._commit);
    if (e.indexOf(`
gpgsig`) === -1) return e;
    const r = e.slice(0, e.indexOf(`
gpgsig`)), n = e.slice(
      e.indexOf(`-----END PGP SIGNATURE-----
`) + 28
    );
    return Xt(r + `
` + n);
  }
  isolateSignature() {
    const e = this._commit.slice(
      this._commit.indexOf("-----BEGIN PGP SIGNATURE-----"),
      this._commit.indexOf("-----END PGP SIGNATURE-----") + 27
    );
    return _d(e);
  }
  static async sign(e, r, n) {
    const i = e.withoutSignature(), a = Ye.justMessage(e._commit);
    let { signature: o } = await r({ payload: i, secretKey: n });
    o = Xt(o);
    const c = Ye.justHeaders(e._commit) + `
gpgsig` + $a(o) + `
` + a;
    return Ye.from(c);
  }
}
async function Nr({ fs: t, cache: e, gitdir: r, oid: n }) {
  if (n === "4b825dc642cb6eb9a060e54bf8d69288fbee4904")
    return { tree: bt.from([]), oid: n };
  const { type: i, object: a } = await Qe({ fs: t, cache: e, gitdir: r, oid: n });
  if (i === "tag")
    return n = mt.from(a).parse().object, Nr({ fs: t, cache: e, gitdir: r, oid: n });
  if (i === "commit")
    return n = Ye.from(a).parse().tree, Nr({ fs: t, cache: e, gitdir: r, oid: n });
  if (i !== "tree")
    throw new yt(n, i, "tree");
  return { tree: bt.from(a), oid: n };
}
class bd {
  constructor({ fs: e, gitdir: r, ref: n, cache: i }) {
    this.fs = e, this.cache = i, this.gitdir = r, this.mapPromise = (async () => {
      const o = /* @__PURE__ */ new Map();
      let s;
      try {
        s = await ce.resolve({ fs: e, gitdir: r, ref: n });
      } catch (f) {
        f instanceof Ge && (s = "4b825dc642cb6eb9a060e54bf8d69288fbee4904");
      }
      const c = await Nr({ fs: e, cache: this.cache, gitdir: r, oid: s });
      return c.type = "tree", c.mode = "40000", o.set(".", c), o;
    })();
    const a = this;
    this.ConstructEntry = class {
      constructor(s) {
        this._fullpath = s, this._type = !1, this._mode = !1, this._stat = !1, this._content = !1, this._oid = !1;
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
    const r = e._fullpath, { fs: n, cache: i, gitdir: a } = this, o = await this.mapPromise, s = o.get(r);
    if (!s) throw new Error(`No obj for ${r}`);
    const c = s.oid;
    if (!c) throw new Error(`No oid for obj ${JSON.stringify(s)}`);
    if (s.type !== "tree")
      return null;
    const { type: f, object: l } = await Qe({ fs: n, cache: i, gitdir: a, oid: c });
    if (f !== s.type)
      throw new yt(c, f, s.type);
    const w = bt.from(l);
    for (const m of w)
      o.set(re.join(r, m.path), m);
    return w.entries().map((m) => re.join(r, m.path));
  }
  async type(e) {
    if (e._type === !1) {
      const r = await this.mapPromise, { type: n } = r.get(e._fullpath);
      e._type = n;
    }
    return e._type;
  }
  async mode(e) {
    if (e._mode === !1) {
      const r = await this.mapPromise, { mode: n } = r.get(e._fullpath);
      e._mode = Sl(parseInt(n, 8));
    }
    return e._mode;
  }
  async stat(e) {
  }
  async content(e) {
    if (e._content === !1) {
      const r = await this.mapPromise, { fs: n, cache: i, gitdir: a } = this, s = r.get(e._fullpath).oid, { type: c, object: f } = await Qe({ fs: n, cache: i, gitdir: a, oid: s });
      c !== "blob" ? e._content = void 0 : e._content = new Uint8Array(f);
    }
    return e._content;
  }
  async oid(e) {
    if (e._oid === !1) {
      const n = (await this.mapPromise).get(e._fullpath);
      e._oid = n.oid;
    }
    return e._oid;
  }
}
function $t({ ref: t = "HEAD" } = {}) {
  const e = /* @__PURE__ */ Object.create(null);
  return Object.defineProperty(e, Qn, {
    value: function({ fs: r, gitdir: n, cache: i }) {
      return new bd({ fs: r, gitdir: n, ref: t, cache: i });
    }
  }), Object.freeze(e), e;
}
class Ed {
  constructor({ fs: e, dir: r, gitdir: n, cache: i }) {
    this.fs = e, this.cache = i, this.dir = r, this.gitdir = n, this.config = null;
    const a = this;
    this.ConstructEntry = class {
      constructor(s) {
        this._fullpath = s, this._type = !1, this._mode = !1, this._stat = !1, this._content = !1, this._oid = !1;
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
    const r = e._fullpath, { fs: n, dir: i } = this, a = await n.readdir(re.join(i, r));
    return a === null ? null : a.map((o) => re.join(r, o));
  }
  async type(e) {
    return e._type === !1 && await e.stat(), e._type;
  }
  async mode(e) {
    return e._mode === !1 && await e.stat(), e._mode;
  }
  async stat(e) {
    if (e._stat === !1) {
      const { fs: r, dir: n } = this;
      let i = await r.lstat(`${n}/${e._fullpath}`);
      if (!i)
        throw new Error(
          `ENOENT: no such file or directory, lstat '${e._fullpath}'`
        );
      let a = i.isDirectory() ? "tree" : "blob";
      a === "blob" && !i.isFile() && !i.isSymbolicLink() && (a = "special"), e._type = a, i = Dr(i), e._mode = i.mode, i.size === -1 && e._actualSize && (i.size = e._actualSize), e._stat = i;
    }
    return e._stat;
  }
  async content(e) {
    if (e._content === !1) {
      const { fs: r, dir: n, gitdir: i } = this;
      if (await e.type() === "tree")
        e._content = void 0;
      else {
        const o = await (await this._getGitConfig(r, i)).get("core.autocrlf"), s = await r.read(`${n}/${e._fullpath}`, { autocrlf: o });
        e._actualSize = s.length, e._stat && e._stat.size === -1 && (e._stat.size = e._actualSize), e._content = new Uint8Array(s);
      }
    }
    return e._content;
  }
  async oid(e) {
    if (e._oid === !1) {
      const r = this, { fs: n, gitdir: i, cache: a } = this;
      let o;
      await ut.acquire({ fs: n, gitdir: i, cache: a }, async function(s) {
        const c = s.entriesMap.get(e._fullpath), f = await e.stat(), w = await (await r._getGitConfig(n, i)).get("core.filemode"), m = typeof vt < "u" ? vt.platform !== "win32" : !0;
        if (!c || Ln(f, c, w, m)) {
          const g = await e.content();
          g === void 0 ? o = void 0 : (o = await Jt(
            qr.wrap({ type: "blob", object: g })
          ), c && o === c.oid && (!w || f.mode === c.mode) && Ln(f, c, w, m) && s.insert({
            filepath: e._fullpath,
            stats: f,
            oid: o
          }));
        } else
          o = c.oid;
      }), e._oid = o;
    }
    return e._oid;
  }
  async _getGitConfig(e, r) {
    return this.config ? this.config : (this.config = await ot.get({ fs: e, gitdir: r }), this.config);
  }
}
function xn() {
  const t = /* @__PURE__ */ Object.create(null);
  return Object.defineProperty(t, Qn, {
    value: function({ fs: e, dir: r, gitdir: n, cache: i }) {
      return new Ed({ fs: e, dir: r, gitdir: n, cache: i });
    }
  }), Object.freeze(t), t;
}
function Sd(t, e) {
  const r = e - t;
  return Array.from({ length: r }, (n, i) => t + i);
}
const Bl = typeof Array.prototype.flat > "u" ? (t) => t.reduce((e, r) => e.concat(r), []) : (t) => t.flat();
class kd {
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
function* xd(t) {
  const e = new kd();
  let r;
  const n = [], i = t.length;
  for (let a = 0; a < i; a++)
    n[a] = t[a].next().value, n[a] !== void 0 && e.consider(n[a]);
  if (e.value !== null)
    for (; ; ) {
      const a = [];
      r = e.value, e.reset();
      for (let o = 0; o < i; o++)
        n[o] !== void 0 && n[o] === r ? (a[o] = n[o], n[o] = t[o].next().value) : a[o] = null, n[o] !== void 0 && e.consider(n[o]);
      if (yield a, e.value === null) return;
    }
}
async function cr({
  fs: t,
  cache: e,
  dir: r,
  gitdir: n,
  trees: i,
  // @ts-ignore
  map: a = async (c, f) => f,
  // The default reducer is a flatmap that filters out undefineds.
  reduce: o = async (c, f) => {
    const l = Bl(f);
    return c !== void 0 && l.unshift(c), l;
  },
  // The default iterate function walks all children concurrently
  iterate: s = (c, f) => Promise.all([...f].map(c))
}) {
  const c = i.map(
    (g) => g[Qn]({ fs: t, dir: r, gitdir: n, cache: e })
  ), f = new Array(c.length).fill("."), l = Sd(0, c.length), w = async (g) => {
    l.map((R) => {
      const S = g[R];
      g[R] = S && new c[R].ConstructEntry(S);
    });
    const T = (await Promise.all(
      l.map((R) => {
        const S = g[R];
        return S ? c[R].readdir(S) : [];
      })
    )).map((R) => (R === null ? [] : R)[Symbol.iterator]());
    return {
      entries: g,
      children: xd(T)
    };
  }, m = async (g) => {
    const { entries: b, children: T } = await w(g), R = b.find((A) => A && A._fullpath)._fullpath, S = await a(R, b);
    if (S !== null) {
      let A = await s(m, T);
      return A = A.filter((B) => B !== void 0), o(S, A);
    }
  };
  return m(f);
}
async function ao(t, e) {
  const r = await t.readdir(e);
  r == null ? await t.rm(e) : r.length ? await Promise.all(
    r.map((n) => {
      const i = re.join(e, n);
      return t.lstat(i).then((a) => {
        if (a)
          return a.isDirectory() ? ao(t, i) : t.rm(i);
      });
    })
  ).then(() => t.rmdir(e)) : await t.rmdir(e);
}
function Ad(t) {
  return Id(t) && mc(t.then) && mc(t.catch);
}
function Id(t) {
  return t && typeof t == "object";
}
function mc(t) {
  return typeof t == "function";
}
function yc(t) {
  return Ad(((r) => {
    try {
      return r.readFile().catch((n) => n);
    } catch (n) {
      return n;
    }
  })(t));
}
const gc = [
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
function vc(t, e) {
  if (yc(e))
    for (const r of gc)
      t[`_${r}`] = e[r].bind(e);
  else
    for (const r of gc)
      t[`_${r}`] = ba(e[r].bind(e));
  yc(e) ? e.rm ? t._rm = e.rm.bind(e) : e.rmdir.length > 1 ? t._rm = e.rmdir.bind(e) : t._rm = ao.bind(null, t) : e.rm ? t._rm = ba(e.rm.bind(e)) : e.rmdir.length > 2 ? t._rm = ba(e.rmdir.bind(e)) : t._rm = ao.bind(null, t);
}
class ye {
  constructor(e) {
    if (typeof e._original_unwrapped_fs < "u") return e;
    const r = Object.getOwnPropertyDescriptor(e, "promises");
    r && r.enumerable ? vc(this, e.promises) : vc(this, e), this._original_unwrapped_fs = e;
  }
  /**
   * Return true if a file exists, false if it doesn't exist.
   * Rethrows errors that aren't related to file existence.
   */
  async exists(e, r = {}) {
    try {
      return await this._stat(e), !0;
    } catch (n) {
      if (n.code === "ENOENT" || n.code === "ENOTDIR" || (n.code || "").includes("ENS"))
        return !1;
      throw console.log('Unhandled error in "FileSystem.exists()" function', n), n;
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
  async read(e, r = {}) {
    try {
      let n = await this._readFile(e, r);
      if (r.autocrlf === "true")
        try {
          n = new TextDecoder("utf8", { fatal: !0 }).decode(n), n = n.replace(/\r\n/g, `
`), n = new TextEncoder().encode(n);
        } catch {
        }
      return typeof n != "string" && (n = he.from(n)), n;
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
  async write(e, r, n = {}) {
    try {
      await this._writeFile(e, r, n);
      return;
    } catch {
      await this.mkdir(Or(e)), await this._writeFile(e, r, n);
    }
  }
  /**
   * Make a directory (or series of nested directories) without throwing an error if it already exists.
   */
  async mkdir(e, r = !1) {
    try {
      await this._mkdir(e);
      return;
    } catch (n) {
      if (n === null || n.code === "EEXIST") return;
      if (r) throw n;
      if (n.code === "ENOENT") {
        const i = Or(e);
        if (i === "." || i === "/" || i === e) throw n;
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
    } catch (r) {
      if (r.code !== "ENOENT") throw r;
    }
  }
  /**
   * Delete a directory without throwing an error if it is already deleted.
   */
  async rmdir(e, r) {
    try {
      r && r.recursive ? await this._rm(e, r) : await this._rmdir(e);
    } catch (n) {
      if (n.code !== "ENOENT") throw n;
    }
  }
  /**
   * Read a directory without throwing an error is the directory doesn't exist
   */
  async readdir(e) {
    try {
      const r = await this._readdir(e);
      return r.sort(Jn), r;
    } catch (r) {
      return r.code === "ENOTDIR" ? null : [];
    }
  }
  /**
   * Return a flast list of all the files nested inside a directory
   *
   * Based on an elegant concurrent recursive solution from SO
   * https://stackoverflow.com/a/45130990/2168416
   */
  async readdirDeep(e) {
    const r = await this._readdir(e);
    return (await Promise.all(
      r.map(async (i) => {
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
    } catch (r) {
      if (r.code === "ENOENT" || (r.code || "").includes("ENS"))
        return null;
      throw r;
    }
  }
  /**
   * Reads the contents of a symlink if it exists, otherwise returns null.
   * Rethrows errors that aren't related to file existence.
   */
  async readlink(e, r = { encoding: "buffer" }) {
    try {
      const n = await this._readlink(e, r);
      return he.isBuffer(n) ? n : he.from(n);
    } catch (n) {
      if (n.code === "ENOENT" || (n.code || "").includes("ENS"))
        return null;
      throw n;
    }
  }
  /**
   * Write the contents of buffer to a symlink.
   */
  async writelink(e, r) {
    return this._symlink(r.toString("utf8"), e);
  }
}
function q(t, e) {
  if (e === void 0)
    throw new _t(t);
}
async function Gn(t, e) {
  return !t && !e ? !1 : t && !e || !t && e ? !0 : !(await t.type() === "tree" && await e.type() === "tree" || await t.type() === await e.type() && await t.mode() === await e.mode() && await t.oid() === await e.oid());
}
async function Rd({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  commit: n = "HEAD",
  cache: i = {}
}) {
  try {
    q("fs", t), q("dir", e), q("gitdir", r);
    const a = new ye(t), o = [$t({ ref: n }), xn(), zr()];
    let s = [];
    await ut.acquire({ fs: a, gitdir: r, cache: i }, async function(f) {
      s = f.unmergedPaths;
    });
    const c = await cr({
      fs: a,
      cache: i,
      dir: e,
      gitdir: r,
      trees: o,
      map: async function(f, [l, w, m]) {
        const g = !await Gn(w, m), b = s.includes(f), T = !await Gn(m, l);
        if (g || b)
          return l ? {
            path: f,
            mode: await l.mode(),
            oid: await l.oid(),
            type: await l.type(),
            content: await l.content()
          } : void 0;
        if (T) return !1;
        throw new Sn(f);
      }
    });
    await ut.acquire({ fs: a, gitdir: r, cache: i }, async function(f) {
      for (const l of c)
        if (l !== !1) {
          if (!l) {
            await a.rmdir(`${e}/${l.path}`, { recursive: !0 }), f.delete({ filepath: l.path });
            continue;
          }
          if (l.type === "blob") {
            const w = new TextDecoder().decode(l.content);
            await a.write(`${e}/${l.path}`, w, { mode: l.mode }), f.insert({
              filepath: l.path,
              oid: l.oid,
              stage: 0
            });
          }
        }
    });
  } catch (a) {
    throw a.caller = "git.abortMerge", a;
  }
}
class Zr {
  static async isIgnored({ fs: e, dir: r, gitdir: n = re.join(r, ".git"), filepath: i }) {
    if (zn(i) === ".git") return !0;
    if (i === ".") return !1;
    let a = "";
    const o = re.join(n, "info", "exclude");
    await e.exists(o) && (a = await e.read(o, "utf8"));
    const s = [
      {
        gitignore: re.join(r, ".gitignore"),
        filepath: i
      }
    ], c = i.split("/").filter(Boolean);
    for (let l = 1; l < c.length; l++) {
      const w = c.slice(0, l).join("/"), m = c.slice(l).join("/");
      s.push({
        gitignore: re.join(r, w, ".gitignore"),
        filepath: m
      });
    }
    let f = !1;
    for (const l of s) {
      let w;
      try {
        w = await e.read(l.gitignore, "utf8");
      } catch (b) {
        if (b.code === "NOENT") continue;
      }
      const m = xh().add(a);
      m.add(w);
      const g = Or(l.filepath);
      if (g !== "." && m.ignores(g)) return !0;
      f ? f = !m.test(l.filepath).unignored : f = m.test(l.filepath).ignored;
    }
    return f;
  }
}
async function Td({ fs: t, gitdir: e, object: r, format: n, oid: i }) {
  const a = `objects/${i.slice(0, 2)}/${i.slice(2)}`, o = `${e}/${a}`;
  await t.exists(o) || await t.write(o, r);
}
let Ba = null;
async function Dl(t) {
  return Ba === null && (Ba = Bd()), Ba ? $d(t) : vo.deflate(t);
}
async function $d(t) {
  const e = new CompressionStream("deflate"), r = new Blob([t]).stream().pipeThrough(e);
  return new Uint8Array(await new Response(r).arrayBuffer());
}
function Bd() {
  try {
    return new CompressionStream("deflate").writable.close(), new Blob([]).stream().cancel(), !0;
  } catch {
    return !1;
  }
}
async function Et({
  fs: t,
  gitdir: e,
  type: r,
  object: n,
  format: i = "content",
  oid: a = void 0,
  dryRun: o = !1
}) {
  return i !== "deflated" && (i !== "wrapped" && (n = qr.wrap({ type: r, object: n })), a = await Jt(n), n = he.from(await Dl(n))), o || await Td({ fs: t, gitdir: e, object: n, format: "deflated", oid: a }), a;
}
function Ol(t) {
  let e;
  for (; ~(e = t.indexOf(92)); ) t[e] = 47;
  return t;
}
async function Dd({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  filepath: n,
  cache: i = {},
  force: a = !1,
  parallel: o = !0
}) {
  try {
    q("fs", t), q("dir", e), q("gitdir", r), q("filepath", n);
    const s = new ye(t);
    await ut.acquire({ fs: s, gitdir: r, cache: i }, async (c) => {
      const l = await (await ot.get({ fs: s, gitdir: r })).get("core.autocrlf");
      return oo({
        dir: e,
        gitdir: r,
        fs: s,
        filepath: n,
        index: c,
        force: a,
        parallel: o,
        autocrlf: l
      });
    });
  } catch (s) {
    throw s.caller = "git.add", s;
  }
}
async function oo({
  dir: t,
  gitdir: e,
  fs: r,
  filepath: n,
  index: i,
  force: a,
  parallel: o,
  autocrlf: s
}) {
  n = Array.isArray(n) ? n : [n];
  const c = n.map(async (m) => {
    if (!a && await Zr.isIgnored({
      fs: r,
      dir: t,
      gitdir: e,
      filepath: m
    }))
      return;
    const g = await r.lstat(re.join(t, m));
    if (!g) throw new Ge(m);
    if (g.isDirectory()) {
      const b = await r.readdir(re.join(t, m));
      if (o) {
        const T = b.map(
          (R) => oo({
            dir: t,
            gitdir: e,
            fs: r,
            filepath: [re.join(m, R)],
            index: i,
            force: a,
            parallel: o,
            autocrlf: s
          })
        );
        await Promise.all(T);
      } else
        for (const T of b)
          await oo({
            dir: t,
            gitdir: e,
            fs: r,
            filepath: [re.join(m, T)],
            index: i,
            force: a,
            parallel: o,
            autocrlf: s
          });
    } else {
      const b = g.isSymbolicLink() ? await r.readlink(re.join(t, m)).then(Ol) : await r.read(re.join(t, m), { autocrlf: s });
      if (b === null) throw new Ge(m);
      const T = await Et({ fs: r, gitdir: e, type: "blob", object: b });
      i.insert({ filepath: m, stats: g, oid: T });
    }
  }), f = await Promise.allSettled(c), l = f.filter((m) => m.status === "rejected").map((m) => m.reason);
  if (l.length > 1)
    throw new vn(l);
  if (l.length === 1)
    throw l[0];
  return f.filter((m) => m.status === "fulfilled" && m.value).map((m) => m.value);
}
async function rn({ fs: t, gitdir: e, path: r }) {
  return (await ot.get({ fs: t, gitdir: e })).get(r);
}
function Cl(t, ...e) {
  for (const r of e)
    if (r)
      for (const n of Object.keys(r)) {
        const i = r[n];
        i !== void 0 && (t[n] = i);
      }
  return t;
}
async function lr({ fs: t, gitdir: e, author: r, commit: n }) {
  const i = Math.floor(Date.now() / 1e3), a = {
    name: await rn({ fs: t, gitdir: e, path: "user.name" }),
    email: await rn({ fs: t, gitdir: e, path: "user.email" }) || "",
    // author.email is allowed to be empty string
    timestamp: i,
    timezoneOffset: new Date(i * 1e3).getTimezoneOffset()
  }, o = Cl(
    {},
    a,
    n ? n.author : void 0,
    r
  );
  if (o.name !== void 0)
    return o;
}
async function Mr({
  fs: t,
  gitdir: e,
  author: r,
  committer: n,
  commit: i
}) {
  const a = Math.floor(Date.now() / 1e3), o = {
    name: await rn({ fs: t, gitdir: e, path: "user.name" }),
    email: await rn({ fs: t, gitdir: e, path: "user.email" }) || "",
    // committer.email is allowed to be empty string
    timestamp: a,
    timezoneOffset: new Date(a * 1e3).getTimezoneOffset()
  }, s = Cl(
    {},
    o,
    i ? i.committer : void 0,
    r,
    n
  );
  if (s.name !== void 0)
    return s;
}
async function Fl({ fs: t, cache: e, gitdir: r, oid: n }) {
  const { type: i, object: a } = await Qe({ fs: t, cache: e, gitdir: r, oid: n });
  if (i === "tag")
    return n = mt.from(a).parse().object, Fl({ fs: t, cache: e, gitdir: r, oid: n });
  if (i !== "commit")
    throw new yt(n, i, "commit");
  return { commit: Ye.from(a), oid: n };
}
async function Ur({ fs: t, cache: e, gitdir: r, oid: n }) {
  const { commit: i, oid: a } = await Fl({
    fs: t,
    cache: e,
    gitdir: r,
    oid: n
  });
  return {
    oid: a,
    commit: i.parse(),
    payload: i.withoutSignature()
  };
}
async function ei({
  fs: t,
  cache: e,
  onSign: r,
  gitdir: n,
  message: i,
  author: a,
  committer: o,
  signingKey: s,
  amend: c = !1,
  dryRun: f = !1,
  noUpdateBranch: l = !1,
  ref: w,
  parent: m,
  tree: g
}) {
  let b = !1;
  w || (w = await ce.resolve({
    fs: t,
    gitdir: n,
    ref: "HEAD",
    depth: 2
  }));
  let T, R;
  try {
    T = await ce.resolve({
      fs: t,
      gitdir: n,
      ref: w
    }), R = await Ur({ fs: t, gitdir: n, oid: T, cache: {} });
  } catch {
    b = !0;
  }
  if (c && b)
    throw new kn(w);
  const S = c ? await lr({
    fs: t,
    gitdir: n,
    author: a,
    commit: R.commit
  }) : await lr({ fs: t, gitdir: n, author: a });
  if (!S) throw new pt("author");
  const A = c ? await Mr({
    fs: t,
    gitdir: n,
    author: S,
    committer: o,
    commit: R.commit
  }) : await Mr({
    fs: t,
    gitdir: n,
    author: S,
    committer: o
  });
  if (!A) throw new pt("committer");
  return ut.acquire(
    { fs: t, gitdir: n, cache: e, allowUnmerged: !1 },
    async function(B) {
      const U = xl(B.entries).get(".");
      if (g || (g = await Pl({ fs: t, gitdir: n, inode: U, dryRun: f })), m ? m = await Promise.all(
        m.map((O) => ce.resolve({ fs: t, gitdir: n, ref: O }))
      ) : c ? m = R.commit.parent : m = T ? [T] : [], !i)
        if (c)
          i = R.commit.message;
        else
          throw new _t("message");
      let M = Ye.from({
        tree: g,
        parent: m,
        author: S,
        committer: A,
        message: i
      });
      s && (M = await Ye.sign(M, r, s));
      const $ = await Et({
        fs: t,
        gitdir: n,
        type: "commit",
        object: M.toObject(),
        dryRun: f
      });
      return !l && !f && await ce.writeRef({
        fs: t,
        gitdir: n,
        ref: w,
        value: $
      }), $;
    }
  );
}
async function Pl({ fs: t, gitdir: e, inode: r, dryRun: n }) {
  const i = r.children;
  for (const c of i)
    c.type === "tree" && (c.metadata.mode = "040000", c.metadata.oid = await Pl({ fs: t, gitdir: e, inode: c, dryRun: n }));
  const a = i.map((c) => ({
    mode: c.metadata.mode,
    path: c.basename,
    oid: c.metadata.oid,
    type: c.type
  })), o = bt.from(a);
  return await Et({
    fs: t,
    gitdir: e,
    type: "tree",
    object: o.toObject(),
    dryRun: n
  });
}
async function An({ fs: t, cache: e, gitdir: r, oid: n, filepath: i }) {
  if (i.startsWith("/"))
    throw new sr("leading-slash");
  if (i.endsWith("/"))
    throw new sr("trailing-slash");
  const a = n, o = await Nr({ fs: t, cache: e, gitdir: r, oid: n }), s = o.tree;
  if (i === "")
    n = o.oid;
  else {
    const c = i.split("/");
    n = await Nl({
      fs: t,
      cache: e,
      gitdir: r,
      tree: s,
      pathArray: c,
      oid: a,
      filepath: i
    });
  }
  return n;
}
async function Nl({
  fs: t,
  cache: e,
  gitdir: r,
  tree: n,
  pathArray: i,
  oid: a,
  filepath: o
}) {
  const s = i.shift();
  for (const c of n)
    if (c.path === s) {
      if (i.length === 0)
        return c.oid;
      {
        const { type: f, object: l } = await Qe({
          fs: t,
          cache: e,
          gitdir: r,
          oid: c.oid
        });
        if (f !== "tree")
          throw new yt(a, f, "tree", o);
        return n = bt.from(l), Nl({
          fs: t,
          cache: e,
          gitdir: r,
          tree: n,
          pathArray: i,
          oid: a,
          filepath: o
        });
      }
    }
  throw new Ge(`file or directory found at "${a}:${o}"`);
}
async function Vr({
  fs: t,
  cache: e,
  gitdir: r,
  oid: n,
  filepath: i = void 0
}) {
  i !== void 0 && (n = await An({ fs: t, cache: e, gitdir: r, oid: n, filepath: i }));
  const { tree: a, oid: o } = await Nr({ fs: t, cache: e, gitdir: r, oid: n });
  return {
    oid: o,
    tree: a.entries()
  };
}
async function In({ fs: t, gitdir: e, tree: r }) {
  const n = bt.from(r).toObject();
  return await Et({
    fs: t,
    gitdir: e,
    type: "tree",
    object: n,
    format: "content"
  });
}
async function Od({
  fs: t,
  cache: e,
  onSign: r,
  gitdir: n,
  ref: i,
  oid: a,
  note: o,
  force: s,
  author: c,
  committer: f,
  signingKey: l
}) {
  let w;
  try {
    w = await ce.resolve({ gitdir: n, fs: t, ref: i });
  } catch (S) {
    if (!(S instanceof Ge))
      throw S;
  }
  let g = (await Vr({
    fs: t,
    cache: e,
    gitdir: n,
    oid: w || "4b825dc642cb6eb9a060e54bf8d69288fbee4904"
  })).tree;
  if (s)
    g = g.filter((S) => S.path !== a);
  else
    for (const S of g)
      if (S.path === a)
        throw new Mt("note", a);
  typeof o == "string" && (o = he.from(o, "utf8"));
  const b = await Et({
    fs: t,
    gitdir: n,
    type: "blob",
    object: o,
    format: "content"
  });
  g.push({ mode: "100644", path: a, oid: b, type: "blob" });
  const T = await In({
    fs: t,
    gitdir: n,
    tree: g
  });
  return await ei({
    fs: t,
    cache: e,
    onSign: r,
    gitdir: n,
    ref: i,
    tree: T,
    parent: w && [w],
    message: `Note added by 'isomorphic-git addNote'
`,
    author: c,
    committer: f,
    signingKey: l
  });
}
async function Cd({
  fs: t,
  onSign: e,
  dir: r,
  gitdir: n = re.join(r, ".git"),
  ref: i = "refs/notes/commits",
  oid: a,
  note: o,
  force: s,
  author: c,
  committer: f,
  signingKey: l,
  cache: w = {}
}) {
  try {
    q("fs", t), q("gitdir", n), q("oid", a), q("note", o), l && q("onSign", e);
    const m = new ye(t), g = await lr({ fs: m, gitdir: n, author: c });
    if (!g) throw new pt("author");
    const b = await Mr({
      fs: m,
      gitdir: n,
      author: g,
      committer: f
    });
    if (!b) throw new pt("committer");
    return await Od({
      fs: new ye(m),
      cache: w,
      onSign: e,
      gitdir: n,
      ref: i,
      oid: a,
      note: o,
      force: s,
      author: g,
      committer: b,
      signingKey: l
    });
  } catch (m) {
    throw m.caller = "git.addNote", m;
  }
}
async function Ml({ fs: t, gitdir: e, remote: r, url: n, force: i }) {
  if (r !== Ht.clean(r))
    throw new Nt(r, Ht.clean(r));
  const a = await ot.get({ fs: t, gitdir: e });
  if (!i && (await a.getSubsections("remote")).includes(r) && n !== await a.get(`remote.${r}.url`))
    throw new Mt("remote", r);
  await a.set(`remote.${r}.url`, n), await a.set(
    `remote.${r}.fetch`,
    `+refs/heads/*:refs/remotes/${r}/*`
  ), await ot.save({ fs: t, gitdir: e, config: a });
}
async function Fd({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  remote: n,
  url: i,
  force: a = !1
}) {
  try {
    return q("fs", t), q("gitdir", r), q("remote", n), q("url", i), await Ml({
      fs: new ye(t),
      gitdir: r,
      remote: n,
      url: i,
      force: a
    });
  } catch (o) {
    throw o.caller = "git.addRemote", o;
  }
}
async function Pd({
  fs: t,
  cache: e,
  onSign: r,
  gitdir: n,
  ref: i,
  tagger: a,
  message: o = i,
  gpgsig: s,
  object: c,
  signingKey: f,
  force: l = !1
}) {
  if (i = i.startsWith("refs/tags/") ? i : `refs/tags/${i}`, !l && await ce.exists({ fs: t, gitdir: n, ref: i }))
    throw new Mt("tag", i);
  const w = await ce.resolve({
    fs: t,
    gitdir: n,
    ref: c || "HEAD"
  }), { type: m } = await Qe({ fs: t, cache: e, gitdir: n, oid: w });
  let g = mt.from({
    object: w,
    type: m,
    tag: i.replace("refs/tags/", ""),
    tagger: a,
    message: o,
    gpgsig: s
  });
  f && (g = await mt.sign(g, r, f));
  const b = await Et({
    fs: t,
    gitdir: n,
    type: "tag",
    object: g.toObject()
  });
  await ce.writeRef({ fs: t, gitdir: n, ref: i, value: b });
}
async function Nd({
  fs: t,
  onSign: e,
  dir: r,
  gitdir: n = re.join(r, ".git"),
  ref: i,
  tagger: a,
  message: o = i,
  gpgsig: s,
  object: c,
  signingKey: f,
  force: l = !1,
  cache: w = {}
}) {
  try {
    q("fs", t), q("gitdir", n), q("ref", i), f && q("onSign", e);
    const m = new ye(t), g = await lr({ fs: m, gitdir: n, author: a });
    if (!g) throw new pt("tagger");
    return await Pd({
      fs: m,
      cache: w,
      onSign: e,
      gitdir: n,
      ref: i,
      tagger: g,
      message: o,
      gpgsig: s,
      object: c,
      signingKey: f,
      force: l
    });
  } catch (m) {
    throw m.caller = "git.annotatedTag", m;
  }
}
async function Md({
  fs: t,
  gitdir: e,
  ref: r,
  object: n,
  checkout: i = !1,
  force: a = !1
}) {
  if (r !== Ht.clean(r))
    throw new Nt(r, Ht.clean(r));
  const o = `refs/heads/${r}`;
  if (!a && await ce.exists({ fs: t, gitdir: e, ref: o }))
    throw new Mt("branch", r, !1);
  let s;
  try {
    s = await ce.resolve({ fs: t, gitdir: e, ref: n || "HEAD" });
  } catch {
  }
  s && await ce.writeRef({ fs: t, gitdir: e, ref: o, value: s }), i && await ce.writeSymbolicRef({
    fs: t,
    gitdir: e,
    ref: "HEAD",
    value: o
  });
}
async function Ud({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: n,
  object: i,
  checkout: a = !1,
  force: o = !1
}) {
  try {
    return q("fs", t), q("gitdir", r), q("ref", n), await Md({
      fs: new ye(t),
      gitdir: r,
      ref: n,
      object: i,
      checkout: a,
      force: o
    });
  } catch (s) {
    throw s.caller = "git.branch", s;
  }
}
const Ul = (t, e) => t === "." || e == null || e.length === 0 || e === "." ? !0 : e.length >= t.length ? e.startsWith(t) : t.startsWith(e);
async function So({
  fs: t,
  cache: e,
  onProgress: r,
  onPostCheckout: n,
  dir: i,
  gitdir: a,
  remote: o,
  ref: s,
  filepaths: c,
  noCheckout: f,
  noUpdateHead: l,
  dryRun: w,
  force: m,
  track: g = !0
}) {
  let b;
  if (n)
    try {
      b = await ce.resolve({ fs: t, gitdir: a, ref: "HEAD" });
    } catch {
      b = "0000000000000000000000000000000000000000";
    }
  let T;
  try {
    T = await ce.resolve({ fs: t, gitdir: a, ref: s });
  } catch (R) {
    if (s === "HEAD") throw R;
    const S = `${o}/${s}`;
    if (T = await ce.resolve({
      fs: t,
      gitdir: a,
      ref: S
    }), g) {
      const A = await ot.get({ fs: t, gitdir: a });
      await A.set(`branch.${s}.remote`, o), await A.set(`branch.${s}.merge`, `refs/heads/${s}`), await ot.save({ fs: t, gitdir: a, config: A });
    }
    await ce.writeRef({
      fs: t,
      gitdir: a,
      ref: `refs/heads/${s}`,
      value: T
    });
  }
  if (!f) {
    let R;
    try {
      R = await jd({
        fs: t,
        cache: e,
        onProgress: r,
        dir: i,
        gitdir: a,
        ref: s,
        force: m,
        filepaths: c
      });
    } catch (U) {
      throw U instanceof Ge && U.data.what === T ? new pn(s, T) : U;
    }
    const S = R.filter(([U]) => U === "conflict").map(([U, M]) => M);
    if (S.length > 0)
      throw new dn(S);
    const A = R.filter(([U]) => U === "error").map(([U, M]) => M);
    if (A.length > 0)
      throw new Oe(A.join(", "));
    if (w) {
      n && await n({
        previousHead: b,
        newHead: T,
        type: c != null && c.length > 0 ? "file" : "branch"
      });
      return;
    }
    let B = 0;
    const N = R.length;
    await ut.acquire({ fs: t, gitdir: a, cache: e }, async function(U) {
      await Promise.all(
        R.filter(
          ([M]) => M === "delete" || M === "delete-index"
        ).map(async function([M, $]) {
          const O = `${i}/${$}`;
          M === "delete" && await t.rm(O), U.delete({ filepath: $ }), r && await r({
            phase: "Updating workdir",
            loaded: ++B,
            total: N
          });
        })
      );
    }), await ut.acquire({ fs: t, gitdir: a, cache: e }, async function(U) {
      for (const [M, $] of R)
        if (M === "rmdir" || M === "rmdir-index") {
          const O = `${i}/${$}`;
          try {
            M === "rmdir-index" && U.delete({ filepath: $ }), await t.rmdir(O), r && await r({
              phase: "Updating workdir",
              loaded: ++B,
              total: N
            });
          } catch (W) {
            if (W.code === "ENOTEMPTY")
              console.log(
                `Did not delete ${$} because directory is not empty`
              );
            else
              throw W;
          }
        }
    }), await Promise.all(
      R.filter(([U]) => U === "mkdir" || U === "mkdir-index").map(async function([U, M]) {
        const $ = `${i}/${M}`;
        await t.mkdir($), r && await r({
          phase: "Updating workdir",
          loaded: ++B,
          total: N
        });
      })
    ), await ut.acquire({ fs: t, gitdir: a, cache: e }, async function(U) {
      await Promise.all(
        R.filter(
          ([M]) => M === "create" || M === "create-index" || M === "update" || M === "mkdir-index"
        ).map(async function([M, $, O, W, z]) {
          const K = `${i}/${$}`;
          try {
            if (M !== "create-index" && M !== "mkdir-index") {
              const { object: Q } = await Qe({ fs: t, cache: e, gitdir: a, oid: O });
              if (z && await t.rm(K), W === 33188)
                await t.write(K, Q);
              else if (W === 33261)
                await t.write(K, Q, { mode: 511 });
              else if (W === 40960)
                await t.writelink(K, Q);
              else
                throw new Oe(
                  `Invalid mode 0o${W.toString(8)} detected in blob ${O}`
                );
            }
            const F = await t.lstat(K);
            W === 33261 && (F.mode = 493), M === "mkdir-index" && (F.mode = 57344), U.insert({
              filepath: $,
              stats: F,
              oid: O
            }), r && await r({
              phase: "Updating workdir",
              loaded: ++B,
              total: N
            });
          } catch (F) {
            console.log(F);
          }
        })
      );
    }), n && await n({
      previousHead: b,
      newHead: T,
      type: c != null && c.length > 0 ? "file" : "branch"
    });
  }
  if (!l) {
    const R = await ce.expand({ fs: t, gitdir: a, ref: s });
    R.startsWith("refs/heads") ? await ce.writeSymbolicRef({
      fs: t,
      gitdir: a,
      ref: "HEAD",
      value: R
    }) : await ce.writeRef({ fs: t, gitdir: a, ref: "HEAD", value: T });
  }
}
async function jd({
  fs: t,
  cache: e,
  onProgress: r,
  dir: n,
  gitdir: i,
  ref: a,
  force: o,
  filepaths: s
}) {
  let c = 0;
  return cr({
    fs: t,
    cache: e,
    dir: n,
    gitdir: i,
    trees: [$t({ ref: a }), xn(), zr()],
    map: async function(f, [l, w, m]) {
      if (f === ".") return;
      if (s && !s.some((b) => Ul(f, b)))
        return null;
      switch (r && await r({ phase: "Analyzing workdir", loaded: ++c }), [!!m, !!l, !!w].map(Number).join("")) {
        // Impossible case.
        case "000":
          return;
        // Ignore workdir files that are not tracked and not part of the new commit.
        case "001":
          return o && s && s.includes(f) ? ["delete", f] : void 0;
        // New entries
        case "010":
          switch (await l.type()) {
            case "tree":
              return ["mkdir", f];
            case "blob":
              return [
                "create",
                f,
                await l.oid(),
                await l.mode()
              ];
            case "commit":
              return [
                "mkdir-index",
                f,
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
          switch (`${await l.type()}-${await w.type()}`) {
            case "tree-tree":
              return;
            case "tree-blob":
            case "blob-tree":
              return ["conflict", f];
            case "blob-blob":
              return await l.oid() !== await w.oid() ? o ? [
                "update",
                f,
                await l.oid(),
                await l.mode(),
                await l.mode() !== await w.mode()
              ] : ["conflict", f] : await l.mode() !== await w.mode() ? o ? [
                "update",
                f,
                await l.oid(),
                await l.mode(),
                !0
              ] : ["conflict", f] : [
                "create-index",
                f,
                await l.oid(),
                await l.mode()
              ];
            case "commit-tree":
              return;
            case "commit-blob":
              return ["conflict", f];
            default:
              return ["error", `new entry Unhandled type ${l.type}`];
          }
        // Something in stage but not in the commit OR the workdir.
        // Note: I verified this behavior against canonical git.
        case "100":
          return ["delete-index", f];
        // Deleted entries
        // TODO: How to handle if stage type and workdir type mismatch?
        case "101":
          switch (await m.type()) {
            case "tree":
              return ["rmdir", f];
            case "blob":
              return await m.oid() !== await w.oid() ? o ? ["delete", f] : ["conflict", f] : ["delete", f];
            case "commit":
              return ["rmdir-index", f];
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
          switch (`${await m.type()}-${await l.type()}`) {
            case "tree-tree":
              return;
            case "blob-blob": {
              if (await m.oid() === await l.oid() && await m.mode() === await l.mode() && !o)
                return;
              if (w) {
                if (await w.oid() !== await m.oid() && await w.oid() !== await l.oid())
                  return o ? [
                    "update",
                    f,
                    await l.oid(),
                    await l.mode(),
                    await l.mode() !== await w.mode()
                  ] : ["conflict", f];
              } else if (o)
                return [
                  "update",
                  f,
                  await l.oid(),
                  await l.mode(),
                  await l.mode() !== await m.mode()
                ];
              return await l.mode() !== await m.mode() ? [
                "update",
                f,
                await l.oid(),
                await l.mode(),
                !0
              ] : await l.oid() !== await m.oid() ? [
                "update",
                f,
                await l.oid(),
                await l.mode(),
                !1
              ] : void 0;
            }
            case "tree-blob":
              return ["update-dir-to-blob", f, await l.oid()];
            case "blob-tree":
              return ["update-blob-to-tree", f];
            case "commit-commit":
              return [
                "mkdir-index",
                f,
                await l.oid(),
                await l.mode()
              ];
            default:
              return [
                "error",
                `update entry Unhandled type ${await m.type()}-${await l.type()}`
              ];
          }
      }
    },
    // Modify the default flat mapping
    reduce: async function(f, l) {
      return l = Bl(l), f ? f && f[0] === "rmdir" ? (l.push(f), l) : (l.unshift(f), l) : l;
    }
  });
}
async function jl({
  fs: t,
  onProgress: e,
  onPostCheckout: r,
  dir: n,
  gitdir: i = re.join(n, ".git"),
  remote: a = "origin",
  ref: o,
  filepaths: s,
  noCheckout: c = !1,
  noUpdateHead: f = o === void 0,
  dryRun: l = !1,
  force: w = !1,
  track: m = !0,
  cache: g = {}
}) {
  try {
    q("fs", t), q("dir", n), q("gitdir", i);
    const b = o || "HEAD";
    return await So({
      fs: new ye(t),
      cache: g,
      onProgress: e,
      onPostCheckout: r,
      dir: n,
      gitdir: i,
      remote: a,
      ref: b,
      filepaths: s,
      noCheckout: c,
      noUpdateHead: f,
      dryRun: l,
      force: w,
      track: m
    });
  } catch (b) {
    throw b.caller = "git.checkout", b;
  }
}
const Ld = new RegExp("^refs/(heads/|tags/|remotes/)?(.*)");
function br(t) {
  const e = Ld.exec(t);
  return e ? e[1] === "remotes/" && t.endsWith("/HEAD") ? e[2].slice(0, -5) : e[2] : t;
}
async function fr({
  fs: t,
  gitdir: e,
  fullname: r = !1,
  test: n = !1
}) {
  const i = await ce.resolve({
    fs: t,
    gitdir: e,
    ref: "HEAD",
    depth: 2
  });
  if (n)
    try {
      await ce.resolve({ fs: t, gitdir: e, ref: i });
    } catch {
      return;
    }
  if (i.startsWith("refs/"))
    return r ? i : br(i);
}
function zd(t) {
  return t = t.replace(/^git@([^:]+):/, "https://$1/"), t = t.replace(/^ssh:\/\//, "https://"), t;
}
function Ll({ username: t = "", password: e = "" }) {
  return `Basic ${he.from(`${t}:${e}`).toString("base64")}`;
}
async function Rn(t, e) {
  const r = Rl(t);
  for (; ; ) {
    const { value: n, done: i } = await r.next();
    if (n && await e(n), i) break;
  }
  r.return && r.return();
}
async function Zn(t) {
  let e = 0;
  const r = [];
  await Rn(t, (a) => {
    r.push(a), e += a.byteLength;
  });
  const n = new Uint8Array(e);
  let i = 0;
  for (const a of r)
    n.set(a, i), i += a.byteLength;
  return n;
}
function _c(t) {
  let e = t.match(/^https?:\/\/([^/]+)@/);
  if (e == null) return { url: t, auth: {} };
  e = e[1];
  const [r, n] = e.split(":");
  return t = t.replace(`${e}@`, ""), { url: t, auth: { username: r, password: n } };
}
function so(t, e) {
  const r = e.toString(16);
  return "0".repeat(t - r.length) + r;
}
class it {
  static flush() {
    return he.from("0000", "utf8");
  }
  static delim() {
    return he.from("0001", "utf8");
  }
  static encode(e) {
    typeof e == "string" && (e = he.from(e));
    const r = e.length + 4, n = so(4, r);
    return he.concat([he.from(n, "utf8"), e]);
  }
  static streamReader(e) {
    const r = new Tl(e);
    return async function() {
      try {
        let i = await r.read(4);
        if (i == null) return !0;
        if (i = parseInt(i.toString("utf8"), 16), i === 0 || i === 1) return null;
        const a = await r.read(i - 4);
        return a ?? !0;
      } catch (i) {
        return e.error = i, !0;
      }
    };
  }
}
async function bc(t) {
  const e = {};
  let r;
  for (; r = await t(), r !== !0; ) {
    if (r === null) continue;
    r = r.toString("utf8").replace(/\n$/, "");
    const n = r.indexOf("=");
    if (n > -1) {
      const i = r.slice(0, n), a = r.slice(n + 1);
      e[i] = a;
    } else
      e[r] = !0;
  }
  return { protocolVersion: 2, capabilities2: e };
}
async function Ec(t, { service: e }) {
  const r = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = it.streamReader(t);
  let o = await a();
  for (; o === null; ) o = await a();
  if (o === !0) throw new wn();
  if (o.includes("version 2"))
    return bc(a);
  if (o.toString("utf8").replace(/\n$/, "") !== `# service=${e}`)
    throw new Sr(`# service=${e}\\n`, o.toString("utf8"));
  let s = await a();
  for (; s === null; ) s = await a();
  if (s === !0) return { capabilities: r, refs: n, symrefs: i };
  if (s = s.toString("utf8"), s.includes("version 2"))
    return bc(a);
  const [c, f] = Da(s, "\0", "\\x00");
  if (f.split(" ").map((l) => r.add(l)), c !== "0000000000000000000000000000000000000000 capabilities^{}") {
    const [l, w] = Da(c, " ", " ");
    for (n.set(w, l); ; ) {
      const m = await a();
      if (m === !0) break;
      if (m !== null) {
        const [g, b] = Da(m.toString("utf8"), " ", " ");
        n.set(b, g);
      }
    }
  }
  for (const l of r)
    if (l.startsWith("symref=")) {
      const w = l.match(/symref=([^:]+):(.*)/);
      w.length === 3 && i.set(w[1], w[2]);
    }
  return { protocolVersion: 1, capabilities: r, refs: n, symrefs: i };
}
function Da(t, e, r) {
  const n = t.trim().split(e);
  if (n.length !== 2)
    throw new Sr(
      `Two strings separated by '${r}'`,
      t.toString("utf8")
    );
  return n;
}
const Sc = (t, e) => t.endsWith("?") ? `${t}${e}` : `${t}/${e.replace(/^https?:\/\//, "")}`, kc = (t, e) => {
  (e.username || e.password) && (t.Authorization = Ll(e)), e.headers && Object.assign(t, e.headers);
}, Oa = async (t) => {
  try {
    const e = he.from(await Zn(t.body)), r = e.toString("utf8");
    return { preview: r.length < 256 ? r : r.slice(0, 256) + "...", response: r, data: e };
  } catch {
    return {};
  }
};
class Vn {
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
    onProgress: r,
    onAuth: n,
    onAuthSuccess: i,
    onAuthFailure: a,
    corsProxy: o,
    service: s,
    url: c,
    headers: f,
    protocolVersion: l
  }) {
    let { url: w, auth: m } = _c(c);
    const g = o ? Sc(o, w) : w;
    (m.username || m.password) && (f.Authorization = Ll(m)), l === 2 && (f["Git-Protocol"] = "version=2");
    let b, T, R = !1;
    do
      if (b = await e.request({
        onProgress: r,
        method: "GET",
        url: `${g}/info/refs?service=${s}`,
        headers: f
      }), T = !1, b.statusCode === 401 || b.statusCode === 203) {
        const S = R ? a : n;
        if (S) {
          if (m = await S(w, {
            ...m,
            headers: { ...f }
          }), m && m.cancel)
            throw new Gr();
          m && (kc(f, m), R = !0, T = !0);
        }
      } else b.statusCode === 200 && R && i && await i(w, m);
    while (T);
    if (b.statusCode !== 200) {
      const { response: S } = await Oa(b);
      throw new Fr(b.statusCode, b.statusMessage, S);
    }
    if (b.headers["content-type"] === `application/x-${s}-advertisement`) {
      const S = await Ec(b.body, { service: s });
      return S.auth = m, S;
    } else {
      const { preview: S, response: A, data: B } = await Oa(b);
      try {
        const N = await Ec([B], { service: s });
        return N.auth = m, N;
      } catch {
        throw new _n(S, A);
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
    onProgress: r,
    corsProxy: n,
    service: i,
    url: a,
    auth: o,
    body: s,
    headers: c
  }) {
    const f = _c(a);
    f && (a = f.url), n && (a = Sc(n, a)), c["content-type"] = `application/x-${i}-request`, c.accept = `application/x-${i}-result`, kc(c, o);
    const l = await e.request({
      onProgress: r,
      method: "POST",
      url: `${a}/${i}`,
      body: s,
      headers: c
    });
    if (l.statusCode !== 200) {
      const { response: w } = Oa(l);
      throw new Fr(l.statusCode, l.statusMessage, w);
    }
    return l;
  }
}
function qd({ url: t }) {
  if (t.startsWith("git@"))
    return {
      transport: "ssh",
      address: t
    };
  const e = t.match(/(\w+)(:\/\/|::)(.*)/);
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
class ti {
  static getRemoteHelperFor({ url: e }) {
    const r = /* @__PURE__ */ new Map();
    r.set("http", Vn), r.set("https", Vn);
    const n = qd({ url: e });
    if (!n)
      throw new En(e);
    if (r.has(n.transport))
      return r.get(n.transport);
    throw new bn(
      e,
      n.transport,
      n.transport === "ssh" ? zd(e) : void 0
    );
  }
}
let mr = null;
class nn {
  static async read({ fs: e, gitdir: r }) {
    mr === null && (mr = new tn());
    const n = re.join(r, "shallow"), i = /* @__PURE__ */ new Set();
    return await mr.acquire(n, async function() {
      const a = await e.read(n, { encoding: "utf8" });
      if (a === null || a.trim() === "") return i;
      a.trim().split(`
`).map((o) => i.add(o));
    }), i;
  }
  static async write({ fs: e, gitdir: r, oids: n }) {
    mr === null && (mr = new tn());
    const i = re.join(r, "shallow");
    if (n.size > 0) {
      const a = [...n].join(`
`) + `
`;
      await mr.acquire(i, async function() {
        await e.write(i, a, {
          encoding: "utf8"
        });
      });
    } else
      await mr.acquire(i, async function() {
        await e.rm(i);
      });
  }
}
async function Wd({ fs: t, gitdir: e, oid: r }) {
  const n = `objects/${r.slice(0, 2)}/${r.slice(2)}`;
  return t.exists(`${e}/${n}`);
}
async function Hd({
  fs: t,
  cache: e,
  gitdir: r,
  oid: n,
  getExternalRefDelta: i
}) {
  let a = await t.readdir(re.join(r, "objects/pack"));
  a = a.filter((o) => o.endsWith(".idx"));
  for (const o of a) {
    const s = `${r}/objects/pack/${o}`, c = await Eo({
      fs: t,
      cache: e,
      filename: s,
      getExternalRefDelta: i
    });
    if (c.error) throw new Oe(c.error);
    if (c.offsets.has(n))
      return !0;
  }
  return !1;
}
async function xc({
  fs: t,
  cache: e,
  gitdir: r,
  oid: n,
  format: i = "content"
}) {
  const a = (s) => Qe({ fs: t, cache: e, gitdir: r, oid: s });
  let o = await Wd({ fs: t, gitdir: r, oid: n });
  return o || (o = await Hd({
    fs: t,
    cache: e,
    gitdir: r,
    oid: n,
    getExternalRefDelta: a
  })), o;
}
function Gd(t) {
  const i = "5041434b" + "00000002" + "00000000";
  return t.slice(0, 12).toString("hex") === i;
}
function zl(t, e) {
  const r = t.map((n) => n.split("=", 1)[0]);
  return e.filter((n) => {
    const i = n.split("=", 1)[0];
    return r.includes(i);
  });
}
const ri = {
  name: "isomorphic-git",
  version: "1.30.1",
  agent: "git/isomorphic-git@1.30.1"
};
class jn {
  constructor() {
    this._queue = [];
  }
  write(e) {
    if (this._ended)
      throw Error("You cannot write to a FIFO that has already been ended!");
    if (this._waiting) {
      const r = this._waiting;
      this._waiting = null, r({ value: e });
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
function Zd(t) {
  const e = t.indexOf("\r"), r = t.indexOf(`
`);
  return e === -1 && r === -1 ? -1 : e === -1 ? r + 1 : r === -1 ? e + 1 : r === e + 1 ? r + 1 : Math.min(e, r) + 1;
}
function ql(t) {
  const e = new jn();
  let r = "";
  return (async () => (await Rn(t, (n) => {
    for (n = n.toString("utf8"), r += n; ; ) {
      const i = Zd(r);
      if (i === -1) break;
      e.write(r.slice(0, i)), r = r.slice(i);
    }
  }), r.length > 0 && e.write(r), e.end()))(), e;
}
class Wl {
  static demux(e) {
    const r = it.streamReader(e), n = new jn(), i = new jn(), a = new jn(), o = async function() {
      const s = await r();
      if (s === null) return o();
      if (s === !0) {
        n.end(), a.end(), e.error ? i.destroy(e.error) : i.end();
        return;
      }
      switch (s[0]) {
        case 1: {
          i.write(s.slice(1));
          break;
        }
        case 2: {
          a.write(s.slice(1));
          break;
        }
        case 3: {
          const c = s.slice(1);
          a.write(c), n.end(), a.end(), i.destroy(new Error(c.toString("utf8")));
          return;
        }
        default:
          n.write(s);
      }
      o();
    };
    return o(), {
      packetlines: n,
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
async function Vd(t) {
  const { packetlines: e, packfile: r, progress: n } = Wl.demux(t), i = [], a = [], o = [];
  let s = !1, c = !1;
  return new Promise((f, l) => {
    Rn(e, (w) => {
      const m = w.toString("utf8").trim();
      if (m.startsWith("shallow")) {
        const g = m.slice(-41).trim();
        g.length !== 40 && l(new or(g)), i.push(g);
      } else if (m.startsWith("unshallow")) {
        const g = m.slice(-41).trim();
        g.length !== 40 && l(new or(g)), a.push(g);
      } else if (m.startsWith("ACK")) {
        const [, g, b] = m.split(" ");
        o.push({ oid: g, status: b }), b || (c = !0);
      } else m.startsWith("NAK") ? (s = !0, c = !0) : (c = !0, s = !0);
      c && (t.error ? l(t.error) : f({ shallows: i, unshallows: a, acks: o, nak: s, packfile: r, progress: n }));
    }).finally(() => {
      c || (t.error ? l(t.error) : f({ shallows: i, unshallows: a, acks: o, nak: s, packfile: r, progress: n }));
    });
  });
}
function Xd({
  capabilities: t = [],
  wants: e = [],
  haves: r = [],
  shallows: n = [],
  depth: i = null,
  since: a = null,
  exclude: o = []
}) {
  const s = [];
  e = [...new Set(e)];
  let c = ` ${t.join(" ")}`;
  for (const f of e)
    s.push(it.encode(`want ${f}${c}
`)), c = "";
  for (const f of n)
    s.push(it.encode(`shallow ${f}
`));
  i !== null && s.push(it.encode(`deepen ${i}
`)), a !== null && s.push(
    it.encode(`deepen-since ${Math.floor(a.valueOf() / 1e3)}
`)
  );
  for (const f of o)
    s.push(it.encode(`deepen-not ${f}
`));
  s.push(it.flush());
  for (const f of r)
    s.push(it.encode(`have ${f}
`));
  return s.push(it.encode(`done
`)), s;
}
async function ko({
  fs: t,
  cache: e,
  http: r,
  onProgress: n,
  onMessage: i,
  onAuth: a,
  onAuthSuccess: o,
  onAuthFailure: s,
  gitdir: c,
  ref: f,
  remoteRef: l,
  remote: w,
  url: m,
  corsProxy: g,
  depth: b = null,
  since: T = null,
  exclude: R = [],
  relative: S = !1,
  tags: A = !1,
  singleBranch: B = !1,
  headers: N = {},
  prune: U = !1,
  pruneTags: M = !1
}) {
  const $ = f || await fr({ fs: t, gitdir: c, test: !0 }), O = await ot.get({ fs: t, gitdir: c }), W = w || $ && await O.get(`branch.${$}.remote`) || "origin", z = m || await O.get(`remote.${W}.url`);
  if (typeof z > "u")
    throw new _t("remote OR url");
  const K = l || $ && await O.get(`branch.${$}.merge`) || f || "HEAD";
  g === void 0 && (g = await O.get("http.corsProxy"));
  const F = ti.getRemoteHelperFor({ url: z }), Q = await F.discover({
    http: r,
    onAuth: a,
    onAuthSuccess: o,
    onAuthFailure: s,
    corsProxy: g,
    service: "git-upload-pack",
    url: z,
    headers: N,
    protocolVersion: 1
  }), se = Q.auth, ve = Q.refs;
  if (ve.size === 0)
    return {
      defaultBranch: null,
      fetchHead: null,
      fetchHeadDescription: null
    };
  if (b !== null && !Q.capabilities.has("shallow"))
    throw new ar("shallow", "depth");
  if (T !== null && !Q.capabilities.has("deepen-since"))
    throw new ar("deepen-since", "since");
  if (R.length > 0 && !Q.capabilities.has("deepen-not"))
    throw new ar("deepen-not", "exclude");
  if (S === !0 && !Q.capabilities.has("deepen-relative"))
    throw new ar("deepen-relative", "relative");
  const { oid: ie, fullref: Y } = ce.resolveAgainstMap({
    ref: K,
    map: ve
  });
  for (const le of ve.keys())
    le === Y || le === "HEAD" || le.startsWith("refs/heads/") || A && le.startsWith("refs/tags/") || ve.delete(le);
  const ae = zl(
    [...Q.capabilities],
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
      `agent=${ri.agent}`
    ]
  );
  S && ae.push("deepen-relative");
  const de = B ? [ie] : ve.values(), Ae = B ? [$] : await ce.listRefs({
    fs: t,
    gitdir: c,
    filepath: "refs"
  });
  let Ie = [];
  for (let le of Ae)
    try {
      le = await ce.expand({ fs: t, gitdir: c, ref: le });
      const be = await ce.resolve({ fs: t, gitdir: c, ref: le });
      await xc({ fs: t, cache: e, gitdir: c, oid: be }) && Ie.push(be);
    } catch {
    }
  Ie = [...new Set(Ie)];
  const _e = await nn.read({ fs: t, gitdir: c }), Te = Q.capabilities.has("shallow") ? [..._e] : [], ge = Xd({
    capabilities: ae,
    wants: de,
    haves: Ie,
    shallows: Te,
    depth: b,
    since: T,
    exclude: R
  }), $e = he.from(await Zn(ge)), ke = await F.connect({
    http: r,
    onProgress: n,
    corsProxy: g,
    service: "git-upload-pack",
    url: z,
    auth: se,
    body: [$e],
    headers: N
  }), Se = await Vd(ke.body);
  ke.headers && (Se.headers = ke.headers);
  for (const le of Se.shallows)
    if (!_e.has(le))
      try {
        const { object: be } = await Qe({ fs: t, cache: e, gitdir: c, oid: le }), Le = new Ye(be), je = await Promise.all(
          Le.headers().parent.map((Fe) => xc({ fs: t, cache: e, gitdir: c, oid: Fe }))
        );
        je.length === 0 || je.every((Fe) => Fe) || _e.add(le);
      } catch {
        _e.add(le);
      }
  for (const le of Se.unshallows)
    _e.delete(le);
  if (await nn.write({ fs: t, gitdir: c, oids: _e }), B) {
    const le = /* @__PURE__ */ new Map([[Y, ie]]), be = /* @__PURE__ */ new Map();
    let Le = 10, je = Y;
    for (; Le--; ) {
      const xe = Q.symrefs.get(je);
      if (xe === void 0) break;
      be.set(je, xe), je = xe;
    }
    const Ce = ve.get(je);
    Ce && le.set(je, Ce);
    const { pruned: Fe } = await ce.updateRemoteRefs({
      fs: t,
      gitdir: c,
      remote: W,
      refs: le,
      symrefs: be,
      tags: A,
      prune: U
    });
    U && (Se.pruned = Fe);
  } else {
    const { pruned: le } = await ce.updateRemoteRefs({
      fs: t,
      gitdir: c,
      remote: W,
      refs: ve,
      symrefs: Q.symrefs,
      tags: A,
      prune: U,
      pruneTags: M
    });
    U && (Se.pruned = le);
  }
  if (Se.HEAD = Q.symrefs.get("HEAD"), Se.HEAD === void 0) {
    const { oid: le } = ce.resolveAgainstMap({
      ref: "HEAD",
      map: ve
    });
    for (const [be, Le] of ve.entries())
      if (be !== "HEAD" && Le === le) {
        Se.HEAD = be;
        break;
      }
  }
  const Pe = Y.startsWith("refs/tags") ? "tag" : "branch";
  if (Se.FETCH_HEAD = {
    oid: ie,
    description: `${Pe} '${br(Y)}' of ${z}`
  }, n || i) {
    const le = ql(Se.progress);
    Rn(le, async (be) => {
      if (i && await i(be), n) {
        const Le = be.match(/([^:]*).*\((\d+?)\/(\d+?)\)/);
        Le && await n({
          phase: Le[1].trim(),
          loaded: parseInt(Le[2], 10),
          total: parseInt(Le[3], 10)
        });
      }
    });
  }
  const Ue = he.from(await Zn(Se.packfile));
  if (ke.body.error) throw ke.body.error;
  const Be = Ue.slice(-20).toString("hex"), Re = {
    defaultBranch: Se.HEAD,
    fetchHead: Se.FETCH_HEAD.oid,
    fetchHeadDescription: Se.FETCH_HEAD.description
  };
  if (Se.headers && (Re.headers = Se.headers), U && (Re.pruned = Se.pruned), Be !== "" && !Gd(Ue)) {
    Re.packfile = `objects/pack/pack-${Be}.pack`;
    const le = re.join(c, Re.packfile);
    await t.write(le, Ue);
    const be = (je) => Qe({ fs: t, cache: e, gitdir: c, oid: je }), Le = await Cr.fromPack({
      pack: Ue,
      getExternalRefDelta: be,
      onProgress: n
    });
    await t.write(le.replace(/\.pack$/, ".idx"), await Le.toBuffer());
  }
  return Re;
}
async function Hl({
  fs: t,
  bare: e = !1,
  dir: r,
  gitdir: n = e ? r : re.join(r, ".git"),
  defaultBranch: i = "master"
}) {
  if (await t.exists(n + "/config")) return;
  let a = [
    "hooks",
    "info",
    "objects/info",
    "objects/pack",
    "refs/heads",
    "refs/tags"
  ];
  a = a.map((o) => n + "/" + o);
  for (const o of a)
    await t.mkdir(o);
  await t.write(
    n + "/config",
    `[core]
	repositoryformatversion = 0
	filemode = false
	bare = ${e}
` + (e ? "" : `	logallrefupdates = true
`) + `	symlinks = false
	ignorecase = true
`
  ), await t.write(n + "/HEAD", `ref: refs/heads/${i}
`);
}
async function Yd({
  fs: t,
  cache: e,
  http: r,
  onProgress: n,
  onMessage: i,
  onAuth: a,
  onAuthSuccess: o,
  onAuthFailure: s,
  onPostCheckout: c,
  dir: f,
  gitdir: l,
  url: w,
  corsProxy: m,
  ref: g,
  remote: b,
  depth: T,
  since: R,
  exclude: S,
  relative: A,
  singleBranch: B,
  noCheckout: N,
  noTags: U,
  headers: M
}) {
  try {
    if (await Hl({ fs: t, gitdir: l }), await Ml({ fs: t, gitdir: l, remote: b, url: w, force: !1 }), m) {
      const W = await ot.get({ fs: t, gitdir: l });
      await W.set("http.corsProxy", m), await ot.save({ fs: t, gitdir: l, config: W });
    }
    const { defaultBranch: $, fetchHead: O } = await ko({
      fs: t,
      cache: e,
      http: r,
      onProgress: n,
      onMessage: i,
      onAuth: a,
      onAuthSuccess: o,
      onAuthFailure: s,
      gitdir: l,
      ref: g,
      remote: b,
      corsProxy: m,
      depth: T,
      since: R,
      exclude: S,
      relative: A,
      singleBranch: B,
      headers: M,
      tags: !U
    });
    if (O === null) return;
    g = g || $, g = g.replace("refs/heads/", ""), await So({
      fs: t,
      cache: e,
      onProgress: n,
      onPostCheckout: c,
      dir: f,
      gitdir: l,
      ref: g,
      remote: b,
      noCheckout: N
    });
  } catch ($) {
    throw await t.rmdir(l, { recursive: !0, maxRetries: 10 }).catch(() => {
    }), $;
  }
}
async function Kd({
  fs: t,
  http: e,
  onProgress: r,
  onMessage: n,
  onAuth: i,
  onAuthSuccess: a,
  onAuthFailure: o,
  onPostCheckout: s,
  dir: c,
  gitdir: f = re.join(c, ".git"),
  url: l,
  corsProxy: w = void 0,
  ref: m = void 0,
  remote: g = "origin",
  depth: b = void 0,
  since: T = void 0,
  exclude: R = [],
  relative: S = !1,
  singleBranch: A = !1,
  noCheckout: B = !1,
  noTags: N = !1,
  headers: U = {},
  cache: M = {}
}) {
  try {
    return q("fs", t), q("http", e), q("gitdir", f), B || q("dir", c), q("url", l), await Yd({
      fs: new ye(t),
      cache: M,
      http: e,
      onProgress: r,
      onMessage: n,
      onAuth: i,
      onAuthSuccess: a,
      onAuthFailure: o,
      onPostCheckout: s,
      dir: c,
      gitdir: f,
      url: l,
      corsProxy: w,
      ref: m,
      remote: g,
      depth: b,
      since: T,
      exclude: R,
      relative: S,
      singleBranch: A,
      noCheckout: B,
      noTags: N,
      headers: U
    });
  } catch ($) {
    throw $.caller = "git.clone", $;
  }
}
async function Jd({
  fs: t,
  onSign: e,
  dir: r,
  gitdir: n = re.join(r, ".git"),
  message: i,
  author: a,
  committer: o,
  signingKey: s,
  amend: c = !1,
  dryRun: f = !1,
  noUpdateBranch: l = !1,
  ref: w,
  parent: m,
  tree: g,
  cache: b = {}
}) {
  try {
    q("fs", t), c || q("message", i), s && q("onSign", e);
    const T = new ye(t);
    return await ei({
      fs: T,
      cache: b,
      onSign: e,
      gitdir: n,
      message: i,
      author: a,
      committer: o,
      signingKey: s,
      amend: c,
      dryRun: f,
      noUpdateBranch: l,
      ref: w,
      parent: m,
      tree: g
    });
  } catch (T) {
    throw T.caller = "git.commit", T;
  }
}
async function Qd({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  fullname: n = !1,
  test: i = !1
}) {
  try {
    return q("fs", t), q("gitdir", r), await fr({
      fs: new ye(t),
      gitdir: r,
      fullname: n,
      test: i
    });
  } catch (a) {
    throw a.caller = "git.currentBranch", a;
  }
}
async function ep({ fs: t, gitdir: e, ref: r }) {
  if (r = r.startsWith("refs/heads/") ? r : `refs/heads/${r}`, !await ce.exists({ fs: t, gitdir: e, ref: r }))
    throw new Ge(r);
  const i = await ce.expand({ fs: t, gitdir: e, ref: r }), a = await fr({ fs: t, gitdir: e, fullname: !0 });
  if (i === a) {
    const c = await ce.resolve({ fs: t, gitdir: e, ref: i });
    await ce.writeRef({ fs: t, gitdir: e, ref: "HEAD", value: c });
  }
  await ce.deleteRef({ fs: t, gitdir: e, ref: i });
  const o = br(r), s = await ot.get({ fs: t, gitdir: e });
  await s.deleteSection("branch", o), await ot.save({ fs: t, gitdir: e, config: s });
}
async function tp({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: n
}) {
  try {
    return q("fs", t), q("ref", n), await ep({
      fs: new ye(t),
      gitdir: r,
      ref: n
    });
  } catch (i) {
    throw i.caller = "git.deleteBranch", i;
  }
}
async function rp({ fs: t, dir: e, gitdir: r = re.join(e, ".git"), ref: n }) {
  try {
    q("fs", t), q("ref", n), await ce.deleteRef({ fs: new ye(t), gitdir: r, ref: n });
  } catch (i) {
    throw i.caller = "git.deleteRef", i;
  }
}
async function np({ fs: t, gitdir: e, remote: r }) {
  const n = await ot.get({ fs: t, gitdir: e });
  await n.deleteSection("remote", r), await ot.save({ fs: t, gitdir: e, config: n });
}
async function ip({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  remote: n
}) {
  try {
    return q("fs", t), q("remote", n), await np({
      fs: new ye(t),
      gitdir: r,
      remote: n
    });
  } catch (i) {
    throw i.caller = "git.deleteRemote", i;
  }
}
async function ap({ fs: t, gitdir: e, ref: r }) {
  r = r.startsWith("refs/tags/") ? r : `refs/tags/${r}`, await ce.deleteRef({ fs: t, gitdir: e, ref: r });
}
async function op({ fs: t, dir: e, gitdir: r = re.join(e, ".git"), ref: n }) {
  try {
    return q("fs", t), q("ref", n), await ap({
      fs: new ye(t),
      gitdir: r,
      ref: n
    });
  } catch (i) {
    throw i.caller = "git.deleteTag", i;
  }
}
async function sp({ fs: t, gitdir: e, oid: r }) {
  const n = r.slice(0, 2);
  return (await t.readdir(`${e}/objects/${n}`)).map((a) => `${n}${a}`).filter((a) => a.startsWith(r));
}
async function cp({
  fs: t,
  cache: e,
  gitdir: r,
  oid: n,
  getExternalRefDelta: i
}) {
  const a = [];
  let o = await t.readdir(re.join(r, "objects/pack"));
  o = o.filter((s) => s.endsWith(".idx"));
  for (const s of o) {
    const c = `${r}/objects/pack/${s}`, f = await Eo({
      fs: t,
      cache: e,
      filename: c,
      getExternalRefDelta: i
    });
    if (f.error) throw new Oe(f.error);
    for (const l of f.offsets.keys())
      l.startsWith(n) && a.push(l);
  }
  return a;
}
async function lp({ fs: t, cache: e, gitdir: r, oid: n }) {
  const i = (s) => Qe({ fs: t, cache: e, gitdir: r, oid: s }), a = await sp({ fs: t, gitdir: r, oid: n }), o = await cp({
    fs: t,
    cache: e,
    gitdir: r,
    oid: n,
    getExternalRefDelta: i
  });
  for (const s of o)
    a.indexOf(s) === -1 && a.push(s);
  if (a.length === 1)
    return a[0];
  throw a.length > 1 ? new hn("oids", n, a) : new Ge(`an object matching "${n}"`);
}
async function up({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oid: n,
  cache: i = {}
}) {
  try {
    return q("fs", t), q("gitdir", r), q("oid", n), await lp({
      fs: new ye(t),
      cache: i,
      gitdir: r,
      oid: n
    });
  } catch (a) {
    throw a.caller = "git.expandOid", a;
  }
}
async function fp({ fs: t, dir: e, gitdir: r = re.join(e, ".git"), ref: n }) {
  try {
    return q("fs", t), q("gitdir", r), q("ref", n), await ce.expand({
      fs: new ye(t),
      gitdir: r,
      ref: n
    });
  } catch (i) {
    throw i.caller = "git.expandRef", i;
  }
}
async function xo({ fs: t, cache: e, gitdir: r, oids: n }) {
  const i = {}, a = n.length;
  let o = n.map((s, c) => ({ index: c, oid: s }));
  for (; o.length; ) {
    const s = /* @__PURE__ */ new Set();
    for (const { oid: f, index: l } of o)
      i[f] || (i[f] = /* @__PURE__ */ new Set()), i[f].add(l), i[f].size === a && s.add(f);
    if (s.size > 0)
      return [...s];
    const c = /* @__PURE__ */ new Map();
    for (const { oid: f, index: l } of o)
      try {
        const { object: w } = await Qe({ fs: t, cache: e, gitdir: r, oid: f }), m = Ye.from(w), { parent: g } = m.parseHeaders();
        for (const b of g)
          (!i[b] || !i[b].has(l)) && c.set(b + ":" + l, { oid: b, index: l });
      } catch {
      }
    o = Array.from(c.values());
  }
  return [];
}
const Ca = /^.*(\r?\n|$)/gm;
function hp({ branches: t, contents: e }) {
  const r = t[1], n = t[2], i = e[0], a = e[1], o = e[2], s = a.match(Ca), c = i.match(Ca), f = o.match(Ca), l = Bh(s, c, f), w = 7;
  let m = "", g = !0;
  for (const b of l)
    b.ok && (m += b.ok.join("")), b.conflict && (g = !1, m += `${"<".repeat(w)} ${r}
`, m += b.conflict.a.join(""), m += `${"=".repeat(w)}
`, m += b.conflict.b.join(""), m += `${">".repeat(w)} ${n}
`);
  return { cleanMerge: g, mergedText: m };
}
async function dp({
  fs: t,
  cache: e,
  dir: r,
  gitdir: n = re.join(r, ".git"),
  index: i,
  ourOid: a,
  baseOid: o,
  theirOid: s,
  ourName: c = "ours",
  baseName: f = "base",
  theirName: l = "theirs",
  dryRun: w = !1,
  abortOnConflict: m = !0,
  mergeDriver: g
}) {
  const b = $t({ ref: a }), T = $t({ ref: o }), R = $t({ ref: s }), S = [], A = [], B = [], N = [], U = await cr({
    fs: t,
    cache: e,
    dir: r,
    gitdir: n,
    trees: [b, T, R],
    map: async function(M, [$, O, W]) {
      const z = zn(M), K = await Gn($, O), F = await Gn(W, O);
      switch (`${K}-${F}`) {
        case "false-false":
          return {
            mode: await O.mode(),
            path: z,
            oid: await O.oid(),
            type: await O.type()
          };
        case "false-true":
          return W ? {
            mode: await W.mode(),
            path: z,
            oid: await W.oid(),
            type: await W.type()
          } : void 0;
        case "true-false":
          return $ ? {
            mode: await $.mode(),
            path: z,
            oid: await $.oid(),
            type: await $.type()
          } : void 0;
        case "true-true": {
          if ($ && O && W && await $.type() === "blob" && await O.type() === "blob" && await W.type() === "blob")
            return pp({
              fs: t,
              gitdir: n,
              path: z,
              ours: $,
              base: O,
              theirs: W,
              ourName: c,
              baseName: f,
              theirName: l,
              mergeDriver: g
            }).then(async (Q) => {
              if (Q.cleanMerge)
                m || i.insert({ filepath: M, oid: Q.mergeResult.oid, stage: 0 });
              else if (S.push(M), A.push(M), !m) {
                const se = await O.oid(), ve = await $.oid(), ie = await W.oid();
                i.delete({ filepath: M }), i.insert({ filepath: M, oid: se, stage: 1 }), i.insert({ filepath: M, oid: ve, stage: 2 }), i.insert({ filepath: M, oid: ie, stage: 3 });
              }
              return Q.mergeResult;
            });
          if (O && !$ && W && await O.type() === "blob" && await W.type() === "blob") {
            if (S.push(M), B.push(M), !m) {
              const Q = await O.oid(), se = await W.oid();
              i.delete({ filepath: M }), i.insert({ filepath: M, oid: Q, stage: 1 }), i.insert({ filepath: M, oid: se, stage: 3 });
            }
            return {
              mode: await W.mode(),
              oid: await W.oid(),
              type: "blob",
              path: z
            };
          }
          if (O && $ && !W && await O.type() === "blob" && await $.type() === "blob") {
            if (S.push(M), N.push(M), !m) {
              const Q = await O.oid(), se = await $.oid();
              i.delete({ filepath: M }), i.insert({ filepath: M, oid: Q, stage: 1 }), i.insert({ filepath: M, oid: se, stage: 2 });
            }
            return {
              mode: await $.mode(),
              oid: await $.oid(),
              type: "blob",
              path: z
            };
          }
          if (O && !$ && !W && await O.type() === "blob")
            return;
          throw new Wr();
        }
      }
    },
    /**
     * @param {TreeEntry} [parent]
     * @param {Array<TreeEntry>} children
     */
    reduce: S.length !== 0 && (!r || m) ? void 0 : async (M, $) => {
      const O = $.filter(Boolean);
      if (M && !(M && M.type === "tree" && O.length === 0)) {
        if (O.length > 0) {
          const z = new bt(O).toObject(), K = await Et({
            fs: t,
            gitdir: n,
            type: "tree",
            object: z,
            dryRun: w
          });
          M.oid = K;
        }
        return M;
      }
    }
  });
  return S.length !== 0 ? (r && !m && await cr({
    fs: t,
    cache: e,
    dir: r,
    gitdir: n,
    trees: [$t({ ref: U.oid })],
    map: async function(M, [$]) {
      const O = `${r}/${M}`;
      if (await $.type() === "blob") {
        const W = await $.mode(), z = new TextDecoder().decode(await $.content());
        await t.write(O, z, { mode: W });
      }
      return !0;
    }
  }), new Hr(
    S,
    A,
    B,
    N
  )) : U.oid;
}
async function pp({
  fs: t,
  gitdir: e,
  path: r,
  ours: n,
  base: i,
  theirs: a,
  ourName: o,
  theirName: s,
  baseName: c,
  dryRun: f,
  mergeDriver: l = hp
}) {
  const w = "blob", m = await i.mode() === await n.mode() ? await a.mode() : await n.mode();
  if (await n.oid() === await a.oid())
    return {
      cleanMerge: !0,
      mergeResult: { mode: m, path: r, oid: await n.oid(), type: w }
    };
  if (await n.oid() === await i.oid())
    return {
      cleanMerge: !0,
      mergeResult: { mode: m, path: r, oid: await a.oid(), type: w }
    };
  if (await a.oid() === await i.oid())
    return {
      cleanMerge: !0,
      mergeResult: { mode: m, path: r, oid: await n.oid(), type: w }
    };
  const g = he.from(await n.content()).toString("utf8"), b = he.from(await i.content()).toString("utf8"), T = he.from(await a.content()).toString("utf8"), { mergedText: R, cleanMerge: S } = await l({
    branches: [c, o, s],
    contents: [b, g, T],
    path: r
  }), A = await Et({
    fs: t,
    gitdir: e,
    type: "blob",
    object: he.from(R, "utf8"),
    dryRun: f
  });
  return { cleanMerge: S, mergeResult: { mode: m, path: r, oid: A, type: w } };
}
async function Gl({
  fs: t,
  cache: e,
  dir: r,
  gitdir: n,
  ours: i,
  theirs: a,
  fastForward: o = !0,
  fastForwardOnly: s = !1,
  dryRun: c = !1,
  noUpdateBranch: f = !1,
  abortOnConflict: l = !0,
  message: w,
  author: m,
  committer: g,
  signingKey: b,
  onSign: T,
  mergeDriver: R
}) {
  i === void 0 && (i = await fr({ fs: t, gitdir: n, fullname: !0 })), i = await ce.expand({
    fs: t,
    gitdir: n,
    ref: i
  }), a = await ce.expand({
    fs: t,
    gitdir: n,
    ref: a
  });
  const S = await ce.resolve({
    fs: t,
    gitdir: n,
    ref: i
  }), A = await ce.resolve({
    fs: t,
    gitdir: n,
    ref: a
  }), B = await xo({
    fs: t,
    cache: e,
    gitdir: n,
    oids: [S, A]
  });
  if (B.length !== 1)
    throw new Wr();
  const N = B[0];
  if (N === A)
    return {
      oid: S,
      alreadyMerged: !0
    };
  if (o && N === S)
    return !c && !f && await ce.writeRef({ fs: t, gitdir: n, ref: i, value: A }), {
      oid: A,
      fastForward: !0
    };
  {
    if (s)
      throw new mn();
    const U = await ut.acquire(
      { fs: t, gitdir: n, cache: e, allowUnmerged: !1 },
      async ($) => dp({
        fs: t,
        cache: e,
        dir: r,
        gitdir: n,
        index: $,
        ourOid: S,
        theirOid: A,
        baseOid: N,
        ourName: br(i),
        baseName: "base",
        theirName: br(a),
        dryRun: c,
        abortOnConflict: l,
        mergeDriver: R
      })
    );
    if (U instanceof Hr) throw U;
    return w || (w = `Merge branch '${br(a)}' into ${br(
      i
    )}`), {
      oid: await ei({
        fs: t,
        cache: e,
        gitdir: n,
        message: w,
        ref: i,
        tree: U,
        parent: [S, A],
        author: m,
        committer: g,
        signingKey: b,
        onSign: T,
        dryRun: c,
        noUpdateBranch: f
      }),
      tree: U,
      mergeCommit: !0
    };
  }
}
async function Zl({
  fs: t,
  cache: e,
  http: r,
  onProgress: n,
  onMessage: i,
  onAuth: a,
  onAuthSuccess: o,
  onAuthFailure: s,
  dir: c,
  gitdir: f,
  ref: l,
  url: w,
  remote: m,
  remoteRef: g,
  prune: b,
  pruneTags: T,
  fastForward: R,
  fastForwardOnly: S,
  corsProxy: A,
  singleBranch: B,
  headers: N,
  author: U,
  committer: M,
  signingKey: $
}) {
  try {
    if (!l) {
      const z = await fr({ fs: t, gitdir: f });
      if (!z)
        throw new _t("ref");
      l = z;
    }
    const { fetchHead: O, fetchHeadDescription: W } = await ko({
      fs: t,
      cache: e,
      http: r,
      onProgress: n,
      onMessage: i,
      onAuth: a,
      onAuthSuccess: o,
      onAuthFailure: s,
      gitdir: f,
      corsProxy: A,
      ref: l,
      url: w,
      remote: m,
      remoteRef: g,
      singleBranch: B,
      headers: N,
      prune: b,
      pruneTags: T
    });
    await Gl({
      fs: t,
      cache: e,
      gitdir: f,
      ours: l,
      theirs: O,
      fastForward: R,
      fastForwardOnly: S,
      message: `Merge ${W}`,
      author: U,
      committer: M,
      signingKey: $,
      dryRun: !1,
      noUpdateBranch: !1
    }), await So({
      fs: t,
      cache: e,
      onProgress: n,
      dir: c,
      gitdir: f,
      ref: l,
      remote: m,
      noCheckout: !1
    });
  } catch (O) {
    throw O.caller = "git.pull", O;
  }
}
async function wp({
  fs: t,
  http: e,
  onProgress: r,
  onMessage: n,
  onAuth: i,
  onAuthSuccess: a,
  onAuthFailure: o,
  dir: s,
  gitdir: c = re.join(s, ".git"),
  ref: f,
  url: l,
  remote: w,
  remoteRef: m,
  corsProxy: g,
  singleBranch: b,
  headers: T = {},
  cache: R = {}
}) {
  try {
    q("fs", t), q("http", e), q("gitdir", c);
    const S = {
      name: "",
      email: "",
      timestamp: Date.now(),
      timezoneOffset: 0
    };
    return await Zl({
      fs: new ye(t),
      cache: R,
      http: e,
      onProgress: r,
      onMessage: n,
      onAuth: i,
      onAuthSuccess: a,
      onAuthFailure: o,
      dir: s,
      gitdir: c,
      ref: f,
      url: l,
      remote: w,
      remoteRef: m,
      fastForwardOnly: !0,
      corsProxy: g,
      singleBranch: b,
      headers: T,
      author: S,
      committer: S
    });
  } catch (S) {
    throw S.caller = "git.fastForward", S;
  }
}
async function mp({
  fs: t,
  http: e,
  onProgress: r,
  onMessage: n,
  onAuth: i,
  onAuthSuccess: a,
  onAuthFailure: o,
  dir: s,
  gitdir: c = re.join(s, ".git"),
  ref: f,
  remote: l,
  remoteRef: w,
  url: m,
  corsProxy: g,
  depth: b = null,
  since: T = null,
  exclude: R = [],
  relative: S = !1,
  tags: A = !1,
  singleBranch: B = !1,
  headers: N = {},
  prune: U = !1,
  pruneTags: M = !1,
  cache: $ = {}
}) {
  try {
    return q("fs", t), q("http", e), q("gitdir", c), await ko({
      fs: new ye(t),
      cache: $,
      http: e,
      onProgress: r,
      onMessage: n,
      onAuth: i,
      onAuthSuccess: a,
      onAuthFailure: o,
      gitdir: c,
      ref: f,
      remote: l,
      remoteRef: w,
      url: m,
      corsProxy: g,
      depth: b,
      since: T,
      exclude: R,
      relative: S,
      tags: A,
      singleBranch: B,
      headers: N,
      prune: U,
      pruneTags: M
    });
  } catch (O) {
    throw O.caller = "git.fetch", O;
  }
}
async function yp({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oids: n,
  cache: i = {}
}) {
  try {
    return q("fs", t), q("gitdir", r), q("oids", n), await xo({
      fs: new ye(t),
      cache: i,
      gitdir: r,
      oids: n
    });
  } catch (a) {
    throw a.caller = "git.findMergeBase", a;
  }
}
async function Vl({ fs: t, filepath: e }) {
  if (await t.exists(re.join(e, ".git")))
    return e;
  {
    const r = Or(e);
    if (r === e)
      throw new Ge(`git root for ${e}`);
    return Vl({ fs: t, filepath: r });
  }
}
async function gp({ fs: t, filepath: e }) {
  try {
    return q("fs", t), q("filepath", e), await Vl({ fs: new ye(t), filepath: e });
  } catch (r) {
    throw r.caller = "git.findRoot", r;
  }
}
async function vp({ fs: t, dir: e, gitdir: r = re.join(e, ".git"), path: n }) {
  try {
    return q("fs", t), q("gitdir", r), q("path", n), await rn({
      fs: new ye(t),
      gitdir: r,
      path: n
    });
  } catch (i) {
    throw i.caller = "git.getConfig", i;
  }
}
async function _p({ fs: t, gitdir: e, path: r }) {
  return (await ot.get({ fs: t, gitdir: e })).getall(r);
}
async function bp({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  path: n
}) {
  try {
    return q("fs", t), q("gitdir", r), q("path", n), await _p({
      fs: new ye(t),
      gitdir: r,
      path: n
    });
  } catch (i) {
    throw i.caller = "git.getConfigAll", i;
  }
}
async function Ep({
  http: t,
  onAuth: e,
  onAuthSuccess: r,
  onAuthFailure: n,
  corsProxy: i,
  url: a,
  headers: o = {},
  forPush: s = !1
}) {
  try {
    q("http", t), q("url", a);
    const f = await ti.getRemoteHelperFor({ url: a }).discover({
      http: t,
      onAuth: e,
      onAuthSuccess: r,
      onAuthFailure: n,
      corsProxy: i,
      service: s ? "git-receive-pack" : "git-upload-pack",
      url: a,
      headers: o,
      protocolVersion: 1
    }), l = {
      capabilities: [...f.capabilities]
    };
    for (const [w, m] of f.refs) {
      const g = w.split("/"), b = g.pop();
      let T = l;
      for (const R of g)
        T[R] = T[R] || {}, T = T[R];
      T[b] = m;
    }
    for (const [w, m] of f.symrefs) {
      const g = w.split("/"), b = g.pop();
      let T = l;
      for (const R of g)
        T[R] = T[R] || {}, T = T[R];
      T[b] = m;
    }
    return l;
  } catch (c) {
    throw c.caller = "git.getRemoteInfo", c;
  }
}
function Xl(t, e, r, n) {
  const i = [];
  for (const [a, o] of t.refs) {
    if (e && !a.startsWith(e)) continue;
    if (a.endsWith("^{}")) {
      if (n) {
        const c = a.replace("^{}", ""), f = i[i.length - 1], l = f.ref === c ? f : i.find((w) => w.ref === c);
        if (l === void 0)
          throw new Error("I did not expect this to happen");
        l.peeled = o;
      }
      continue;
    }
    const s = { ref: a, oid: o };
    r && t.symrefs.has(a) && (s.target = t.symrefs.get(a)), i.push(s);
  }
  return i;
}
async function Sp({
  http: t,
  onAuth: e,
  onAuthSuccess: r,
  onAuthFailure: n,
  corsProxy: i,
  url: a,
  headers: o = {},
  forPush: s = !1,
  protocolVersion: c = 2
}) {
  try {
    q("http", t), q("url", a);
    const l = await ti.getRemoteHelperFor({ url: a }).discover({
      http: t,
      onAuth: e,
      onAuthSuccess: r,
      onAuthFailure: n,
      corsProxy: i,
      service: s ? "git-receive-pack" : "git-upload-pack",
      url: a,
      headers: o,
      protocolVersion: c
    });
    if (l.protocolVersion === 2)
      return {
        protocolVersion: l.protocolVersion,
        capabilities: l.capabilities2
      };
    const w = {};
    for (const m of l.capabilities) {
      const [g, b] = m.split("=");
      b ? w[g] = b : w[g] = !0;
    }
    return {
      protocolVersion: 1,
      capabilities: w,
      refs: Xl(l, void 0, !0, !0)
    };
  } catch (f) {
    throw f.caller = "git.getRemoteInfo2", f;
  }
}
async function kp({
  type: t,
  object: e,
  format: r = "content",
  oid: n = void 0
}) {
  return r !== "deflated" && (r !== "wrapped" && (e = qr.wrap({ type: t, object: e })), n = await Jt(e)), { oid: n, object: e };
}
async function xp({ object: t }) {
  try {
    q("object", t), typeof t == "string" ? t = he.from(t, "utf8") : t = he.from(t);
    const e = "blob", { oid: r, object: n } = await kp({
      type: "blob",
      format: "content",
      object: t
    });
    return { oid: r, type: e, object: new Uint8Array(n), format: "wrapped" };
  } catch (e) {
    throw e.caller = "git.hashBlob", e;
  }
}
async function Ap({
  fs: t,
  cache: e,
  onProgress: r,
  dir: n,
  gitdir: i,
  filepath: a
}) {
  try {
    a = re.join(n, a);
    const o = await t.read(a), s = (f) => Qe({ fs: t, cache: e, gitdir: i, oid: f }), c = await Cr.fromPack({
      pack: o,
      getExternalRefDelta: s,
      onProgress: r
    });
    return await t.write(a.replace(/\.pack$/, ".idx"), await c.toBuffer()), {
      oids: [...c.hashes]
    };
  } catch (o) {
    throw o.caller = "git.indexPack", o;
  }
}
async function Ip({
  fs: t,
  onProgress: e,
  dir: r,
  gitdir: n = re.join(r, ".git"),
  filepath: i,
  cache: a = {}
}) {
  try {
    return q("fs", t), q("dir", r), q("gitdir", r), q("filepath", i), await Ap({
      fs: new ye(t),
      cache: a,
      onProgress: e,
      dir: r,
      gitdir: n,
      filepath: i
    });
  } catch (o) {
    throw o.caller = "git.indexPack", o;
  }
}
async function Rp({
  fs: t,
  bare: e = !1,
  dir: r,
  gitdir: n = e ? r : re.join(r, ".git"),
  defaultBranch: i = "master"
}) {
  try {
    return q("fs", t), q("gitdir", n), e || q("dir", r), await Hl({
      fs: new ye(t),
      bare: e,
      dir: r,
      gitdir: n,
      defaultBranch: i
    });
  } catch (a) {
    throw a.caller = "git.init", a;
  }
}
async function Yl({
  fs: t,
  cache: e,
  gitdir: r,
  oid: n,
  ancestor: i,
  depth: a
}) {
  const o = await nn.read({ fs: t, gitdir: r });
  if (!n)
    throw new _t("oid");
  if (!i)
    throw new _t("ancestor");
  if (n === i) return !1;
  const s = [n], c = /* @__PURE__ */ new Set();
  let f = 0;
  for (; s.length; ) {
    if (f++ === a)
      throw new gn(a);
    const l = s.shift(), { type: w, object: m } = await Qe({
      fs: t,
      cache: e,
      gitdir: r,
      oid: l
    });
    if (w !== "commit")
      throw new yt(l, w, "commit");
    const g = Ye.from(m).parse();
    for (const b of g.parent)
      if (b === i) return !0;
    if (!o.has(l))
      for (const b of g.parent)
        c.has(b) || (s.push(b), c.add(b));
  }
  return !1;
}
async function Tp({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oid: n,
  ancestor: i,
  depth: a = -1,
  cache: o = {}
}) {
  try {
    return q("fs", t), q("gitdir", r), q("oid", n), q("ancestor", i), await Yl({
      fs: new ye(t),
      cache: o,
      gitdir: r,
      oid: n,
      ancestor: i,
      depth: a
    });
  } catch (s) {
    throw s.caller = "git.isDescendent", s;
  }
}
async function $p({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  filepath: n
}) {
  try {
    return q("fs", t), q("dir", e), q("gitdir", r), q("filepath", n), Zr.isIgnored({
      fs: new ye(t),
      dir: e,
      gitdir: r,
      filepath: n
    });
  } catch (i) {
    throw i.caller = "git.isIgnored", i;
  }
}
async function Bp({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  remote: n
}) {
  try {
    return q("fs", t), q("gitdir", r), ce.listBranches({
      fs: new ye(t),
      gitdir: r,
      remote: n
    });
  } catch (i) {
    throw i.caller = "git.listBranches", i;
  }
}
async function Dp({ fs: t, gitdir: e, ref: r, cache: n }) {
  if (r) {
    const i = await ce.resolve({ gitdir: e, fs: t, ref: r }), a = [];
    return await Kl({
      fs: t,
      cache: n,
      gitdir: e,
      oid: i,
      filenames: a,
      prefix: ""
    }), a;
  } else
    return ut.acquire({ fs: t, gitdir: e, cache: n }, async function(i) {
      return i.entries.map((a) => a.path);
    });
}
async function Kl({
  fs: t,
  cache: e,
  gitdir: r,
  oid: n,
  filenames: i,
  prefix: a
}) {
  const { tree: o } = await Vr({ fs: t, cache: e, gitdir: r, oid: n });
  for (const s of o)
    s.type === "tree" ? await Kl({
      fs: t,
      cache: e,
      gitdir: r,
      oid: s.oid,
      filenames: i,
      prefix: re.join(a, s.path)
    }) : i.push(re.join(a, s.path));
}
async function Op({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: n,
  cache: i = {}
}) {
  try {
    return q("fs", t), q("gitdir", r), await Dp({
      fs: new ye(t),
      cache: i,
      gitdir: r,
      ref: n
    });
  } catch (a) {
    throw a.caller = "git.listFiles", a;
  }
}
async function Cp({ fs: t, cache: e, gitdir: r, ref: n }) {
  let i;
  try {
    i = await ce.resolve({ gitdir: r, fs: t, ref: n });
  } catch (s) {
    if (s instanceof Ge)
      return [];
  }
  return (await Vr({
    fs: t,
    cache: e,
    gitdir: r,
    oid: i
  })).tree.map((s) => ({
    target: s.path,
    note: s.oid
  }));
}
async function Fp({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: n = "refs/notes/commits",
  cache: i = {}
}) {
  try {
    return q("fs", t), q("gitdir", r), q("ref", n), await Cp({
      fs: new ye(t),
      cache: i,
      gitdir: r,
      ref: n
    });
  } catch (a) {
    throw a.caller = "git.listNotes", a;
  }
}
async function Pp({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  filepath: n
}) {
  try {
    return q("fs", t), q("gitdir", r), ce.listRefs({ fs: new ye(t), gitdir: r, filepath: n });
  } catch (i) {
    throw i.caller = "git.listRefs", i;
  }
}
async function Np({ fs: t, gitdir: e }) {
  const r = await ot.get({ fs: t, gitdir: e }), n = await r.getSubsections("remote");
  return Promise.all(
    n.map(async (a) => {
      const o = await r.get(`remote.${a}.url`);
      return { remote: a, url: o };
    })
  );
}
async function Mp({ fs: t, dir: e, gitdir: r = re.join(e, ".git") }) {
  try {
    return q("fs", t), q("gitdir", r), await Np({
      fs: new ye(t),
      gitdir: r
    });
  } catch (n) {
    throw n.caller = "git.listRemotes", n;
  }
}
async function Up(t) {
  const e = it.streamReader(t), r = [];
  let n;
  for (; n = await e(), n !== !0; ) {
    if (n === null) continue;
    n = n.toString("utf8").replace(/\n$/, "");
    const [i, a, ...o] = n.split(" "), s = { ref: a, oid: i };
    for (const c of o) {
      const [f, l] = c.split(":");
      f === "symref-target" ? s.target = l : f === "peeled" && (s.peeled = l);
    }
    r.push(s);
  }
  return r;
}
async function jp({ prefix: t, symrefs: e, peelTags: r }) {
  const n = [];
  return n.push(it.encode(`command=ls-refs
`)), n.push(it.encode(`agent=${ri.agent}
`)), (r || e || t) && n.push(it.delim()), r && n.push(it.encode("peel")), e && n.push(it.encode("symrefs")), t && n.push(it.encode(`ref-prefix ${t}`)), n.push(it.flush()), n;
}
async function Lp({
  http: t,
  onAuth: e,
  onAuthSuccess: r,
  onAuthFailure: n,
  corsProxy: i,
  url: a,
  headers: o = {},
  forPush: s = !1,
  protocolVersion: c = 2,
  prefix: f,
  symrefs: l,
  peelTags: w
}) {
  try {
    q("http", t), q("url", a);
    const m = await Vn.discover({
      http: t,
      onAuth: e,
      onAuthSuccess: r,
      onAuthFailure: n,
      corsProxy: i,
      service: s ? "git-receive-pack" : "git-upload-pack",
      url: a,
      headers: o,
      protocolVersion: c
    });
    if (m.protocolVersion === 1)
      return Xl(m, f, l, w);
    const g = await jp({ prefix: f, symrefs: l, peelTags: w }), b = await Vn.connect({
      http: t,
      auth: m.auth,
      headers: o,
      corsProxy: i,
      service: s ? "git-receive-pack" : "git-upload-pack",
      url: a,
      body: g
    });
    return Up(b.body);
  } catch (m) {
    throw m.caller = "git.listServerRefs", m;
  }
}
async function zp({ fs: t, dir: e, gitdir: r = re.join(e, ".git") }) {
  try {
    return q("fs", t), q("gitdir", r), ce.listTags({ fs: new ye(t), gitdir: r });
  } catch (n) {
    throw n.caller = "git.listTags", n;
  }
}
function qp(t, e) {
  return t.committer.timestamp - e.committer.timestamp;
}
const Wp = "e69de29bb2d1d6434b8b29ae775ad8c2e48c5391";
async function Ac({ fs: t, cache: e, gitdir: r, oid: n, fileId: i }) {
  if (i === Wp) return;
  const a = n;
  let o;
  const s = await Nr({ fs: t, cache: e, gitdir: r, oid: n }), c = s.tree;
  return i === s.oid ? o = s.path : (o = await Jl({
    fs: t,
    cache: e,
    gitdir: r,
    tree: c,
    fileId: i,
    oid: a
  }), Array.isArray(o) && (o.length === 0 ? o = void 0 : o.length === 1 && (o = o[0]))), o;
}
async function Jl({
  fs: t,
  cache: e,
  gitdir: r,
  tree: n,
  fileId: i,
  oid: a,
  filepaths: o = [],
  parentPath: s = ""
}) {
  const c = n.entries().map(function(f) {
    let l;
    return f.oid === i ? (l = re.join(s, f.path), o.push(l)) : f.type === "tree" && (l = Qe({
      fs: t,
      cache: e,
      gitdir: r,
      oid: f.oid
    }).then(function({ object: w }) {
      return Jl({
        fs: t,
        cache: e,
        gitdir: r,
        tree: bt.from(w),
        fileId: i,
        oid: a,
        filepaths: o,
        parentPath: re.join(s, f.path)
      });
    })), l;
  });
  return await Promise.all(c), o;
}
async function Hp({
  fs: t,
  cache: e,
  gitdir: r,
  filepath: n,
  ref: i,
  depth: a,
  since: o,
  force: s,
  follow: c
}) {
  const f = typeof o > "u" ? void 0 : Math.floor(o.valueOf() / 1e3), l = [], w = await nn.read({ fs: t, gitdir: r }), m = await ce.resolve({ fs: t, gitdir: r, ref: i }), g = [await Ur({ fs: t, cache: e, gitdir: r, oid: m })];
  let b, T, R;
  function S(A) {
    R && n && l.push(A);
  }
  for (; g.length > 0; ) {
    const A = g.pop();
    if (f !== void 0 && A.commit.committer.timestamp <= f)
      break;
    if (n) {
      let B;
      try {
        B = await An({
          fs: t,
          cache: e,
          gitdir: r,
          oid: A.commit.tree,
          filepath: n
        }), T && b !== B && l.push(T), b = B, T = A, R = !0;
      } catch (N) {
        if (N instanceof Ge) {
          let U = c && b;
          if (U && (U = await Ac({
            fs: t,
            cache: e,
            gitdir: r,
            oid: A.commit.tree,
            fileId: b
          }), U))
            if (Array.isArray(U)) {
              if (T) {
                const M = await Ac({
                  fs: t,
                  cache: e,
                  gitdir: r,
                  oid: T.commit.tree,
                  fileId: b
                });
                if (Array.isArray(M))
                  if (U = U.filter(($) => M.indexOf($) === -1), U.length === 1)
                    U = U[0], n = U, T && l.push(T);
                  else {
                    U = !1, T && l.push(T);
                    break;
                  }
              }
            } else
              n = U, T && l.push(T);
          if (!U) {
            if (R && b && (l.push(T), !s))
              break;
            if (!s && !c) throw N;
          }
          T = A, R = !1;
        } else throw N;
      }
    } else
      l.push(A);
    if (a !== void 0 && l.length === a) {
      S(A);
      break;
    }
    if (!w.has(A.oid))
      for (const B of A.commit.parent) {
        const N = await Ur({ fs: t, cache: e, gitdir: r, oid: B });
        g.map((U) => U.oid).includes(N.oid) || g.push(N);
      }
    g.length === 0 && S(A), g.sort((B, N) => qp(B.commit, N.commit));
  }
  return l;
}
async function Gp({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  filepath: n,
  ref: i = "HEAD",
  depth: a,
  since: o,
  // Date
  force: s,
  follow: c,
  cache: f = {}
}) {
  try {
    return q("fs", t), q("gitdir", r), q("ref", i), await Hp({
      fs: new ye(t),
      cache: f,
      gitdir: r,
      filepath: n,
      ref: i,
      depth: a,
      since: o,
      force: s,
      follow: c
    });
  } catch (l) {
    throw l.caller = "git.log", l;
  }
}
async function Zp({
  fs: t,
  onSign: e,
  dir: r,
  gitdir: n = re.join(r, ".git"),
  ours: i,
  theirs: a,
  fastForward: o = !0,
  fastForwardOnly: s = !1,
  dryRun: c = !1,
  noUpdateBranch: f = !1,
  abortOnConflict: l = !0,
  message: w,
  author: m,
  committer: g,
  signingKey: b,
  cache: T = {},
  mergeDriver: R
}) {
  try {
    q("fs", t), b && q("onSign", e);
    const S = new ye(t), A = await lr({ fs: S, gitdir: n, author: m });
    if (!A && (!s || !o))
      throw new pt("author");
    const B = await Mr({
      fs: S,
      gitdir: n,
      author: A,
      committer: g
    });
    if (!B && (!s || !o))
      throw new pt("committer");
    return await Gl({
      fs: S,
      cache: T,
      dir: r,
      gitdir: n,
      ours: i,
      theirs: a,
      fastForward: o,
      fastForwardOnly: s,
      dryRun: c,
      noUpdateBranch: f,
      abortOnConflict: l,
      message: w,
      author: A,
      committer: B,
      signingKey: b,
      onSign: e,
      mergeDriver: R
    });
  } catch (S) {
    throw S.caller = "git.merge", S;
  }
}
const Vp = {
  commit: 16,
  tree: 32,
  blob: 48,
  tag: 64,
  ofs_delta: 96,
  ref_delta: 112
};
async function Ql({
  fs: t,
  cache: e,
  dir: r,
  gitdir: n = re.join(r, ".git"),
  oids: i
}) {
  const a = new ml(), o = [];
  function s(l, w) {
    const m = he.from(l, w);
    o.push(m), a.update(m);
  }
  async function c({ stype: l, object: w }) {
    const m = Vp[l];
    let g = w.length, b = g > 15 ? 128 : 0;
    const T = g & 15;
    g = g >>> 4;
    let R = (b | m | T).toString(16);
    for (s(R, "hex"); b; )
      b = g > 127 ? 128 : 0, R = b | g & 127, s(so(2, R), "hex"), g = g >>> 7;
    s(he.from(await Dl(w)));
  }
  s("PACK"), s("00000002", "hex"), s(so(8, i.length), "hex");
  for (const l of i) {
    const { type: w, object: m } = await Qe({ fs: t, cache: e, gitdir: n, oid: l });
    await c({ object: m, stype: w });
  }
  const f = a.digest();
  return o.push(f), o;
}
async function Xp({ fs: t, cache: e, gitdir: r, oids: n, write: i }) {
  const a = await Ql({ fs: t, cache: e, gitdir: r, oids: n }), o = he.from(await Zn(a)), c = `pack-${o.slice(-20).toString("hex")}.pack`;
  return i ? (await t.write(re.join(r, `objects/pack/${c}`), o), { filename: c }) : {
    filename: c,
    packfile: new Uint8Array(o)
  };
}
async function Yp({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oids: n,
  write: i = !1,
  cache: a = {}
}) {
  try {
    return q("fs", t), q("gitdir", r), q("oids", n), await Xp({
      fs: new ye(t),
      cache: a,
      gitdir: r,
      oids: n,
      write: i
    });
  } catch (o) {
    throw o.caller = "git.packObjects", o;
  }
}
async function Kp({
  fs: t,
  http: e,
  onProgress: r,
  onMessage: n,
  onAuth: i,
  onAuthSuccess: a,
  onAuthFailure: o,
  dir: s,
  gitdir: c = re.join(s, ".git"),
  ref: f,
  url: l,
  remote: w,
  remoteRef: m,
  prune: g = !1,
  pruneTags: b = !1,
  fastForward: T = !0,
  fastForwardOnly: R = !1,
  corsProxy: S,
  singleBranch: A,
  headers: B = {},
  author: N,
  committer: U,
  signingKey: M,
  cache: $ = {}
}) {
  try {
    q("fs", t), q("gitdir", c);
    const O = new ye(t), W = await lr({ fs: O, gitdir: c, author: N });
    if (!W) throw new pt("author");
    const z = await Mr({
      fs: O,
      gitdir: c,
      author: W,
      committer: U
    });
    if (!z) throw new pt("committer");
    return await Zl({
      fs: O,
      cache: $,
      http: e,
      onProgress: r,
      onMessage: n,
      onAuth: i,
      onAuthSuccess: a,
      onAuthFailure: o,
      dir: s,
      gitdir: c,
      ref: f,
      url: l,
      remote: w,
      remoteRef: m,
      fastForward: T,
      fastForwardOnly: R,
      corsProxy: S,
      singleBranch: A,
      headers: B,
      author: W,
      committer: z,
      signingKey: M,
      prune: g,
      pruneTags: b
    });
  } catch (O) {
    throw O.caller = "git.pull", O;
  }
}
async function Jp({
  fs: t,
  cache: e,
  dir: r,
  gitdir: n = re.join(r, ".git"),
  start: i,
  finish: a
}) {
  const o = await nn.read({ fs: t, gitdir: n }), s = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set();
  for (const w of i)
    s.add(await ce.resolve({ fs: t, gitdir: n, ref: w }));
  for (const w of a)
    try {
      const m = await ce.resolve({ fs: t, gitdir: n, ref: w });
      c.add(m);
    } catch {
    }
  const f = /* @__PURE__ */ new Set();
  async function l(w) {
    f.add(w);
    const { type: m, object: g } = await Qe({ fs: t, cache: e, gitdir: n, oid: w });
    if (m === "tag") {
      const T = mt.from(g).headers().object;
      return l(T);
    }
    if (m !== "commit")
      throw new yt(w, m, "commit");
    if (!o.has(w)) {
      const T = Ye.from(g).headers().parent;
      for (w of T)
        !c.has(w) && !f.has(w) && await l(w);
    }
  }
  for (const w of s)
    await l(w);
  return f;
}
async function Fa({
  fs: t,
  cache: e,
  dir: r,
  gitdir: n = re.join(r, ".git"),
  oids: i
}) {
  const a = /* @__PURE__ */ new Set();
  async function o(s) {
    if (a.has(s)) return;
    a.add(s);
    const { type: c, object: f } = await Qe({ fs: t, cache: e, gitdir: n, oid: s });
    if (c === "tag") {
      const w = mt.from(f).headers().object;
      await o(w);
    } else if (c === "commit") {
      const w = Ye.from(f).headers().tree;
      await o(w);
    } else if (c === "tree") {
      const l = bt.from(f);
      for (const w of l)
        w.type === "blob" && a.add(w.oid), w.type === "tree" && await o(w.oid);
    }
  }
  for (const s of i)
    await o(s);
  return a;
}
async function Qp(t) {
  const e = {};
  let r = "";
  const n = it.streamReader(t);
  let i = await n();
  for (; i !== !0; )
    i !== null && (r += i.toString("utf8") + `
`), i = await n();
  const a = r.toString("utf8").split(`
`);
  if (i = a.shift(), !i.startsWith("unpack "))
    throw new Sr('unpack ok" or "unpack [error message]', i);
  e.ok = i === "unpack ok", e.ok || (e.error = i.slice(7)), e.refs = {};
  for (const o of a) {
    if (o.trim() === "") continue;
    const s = o.slice(0, 2), c = o.slice(3);
    let f = c.indexOf(" ");
    f === -1 && (f = c.length);
    const l = c.slice(0, f), w = c.slice(f + 1);
    e.refs[l] = {
      ok: s === "ok",
      error: w
    };
  }
  return e;
}
async function ew({
  capabilities: t = [],
  triplets: e = []
}) {
  const r = [];
  let n = `\0 ${t.join(" ")}`;
  for (const i of e)
    r.push(
      it.encode(
        `${i.oldoid} ${i.oid} ${i.fullRef}${n}
`
      )
    ), n = "";
  return r.push(it.flush()), r;
}
async function tw({
  fs: t,
  cache: e,
  http: r,
  onProgress: n,
  onMessage: i,
  onAuth: a,
  onAuthSuccess: o,
  onAuthFailure: s,
  onPrePush: c,
  gitdir: f,
  ref: l,
  remoteRef: w,
  remote: m,
  url: g,
  force: b = !1,
  delete: T = !1,
  corsProxy: R,
  headers: S = {}
}) {
  const A = l || await fr({ fs: t, gitdir: f });
  if (typeof A > "u")
    throw new _t("ref");
  const B = await ot.get({ fs: t, gitdir: f });
  m = m || await B.get(`branch.${A}.pushRemote`) || await B.get("remote.pushDefault") || await B.get(`branch.${A}.remote`) || "origin";
  const N = g || await B.get(`remote.${m}.pushurl`) || await B.get(`remote.${m}.url`);
  if (typeof N > "u")
    throw new _t("remote OR url");
  const U = w || await B.get(`branch.${A}.merge`);
  if (typeof N > "u")
    throw new _t("remoteRef");
  R === void 0 && (R = await B.get("http.corsProxy"));
  const M = await ce.expand({ fs: t, gitdir: f, ref: A }), $ = T ? "0000000000000000000000000000000000000000" : await ce.resolve({ fs: t, gitdir: f, ref: M }), O = ti.getRemoteHelperFor({ url: N }), W = await O.discover({
    http: r,
    onAuth: a,
    onAuthSuccess: o,
    onAuthFailure: s,
    corsProxy: R,
    service: "git-receive-pack",
    url: N,
    headers: S,
    protocolVersion: 1
  }), z = W.auth;
  let K;
  if (!U)
    K = M;
  else
    try {
      K = await ce.expandAgainstMap({
        ref: U,
        map: W.refs
      });
    } catch (_e) {
      if (_e instanceof Ge)
        K = U.startsWith("refs/") ? U : `refs/heads/${U}`;
      else
        throw _e;
    }
  const F = W.refs.get(K) || "0000000000000000000000000000000000000000";
  if (c && !await c({
    remote: m,
    url: N,
    localRef: { ref: T ? "(delete)" : M, oid: $ },
    remoteRef: { ref: K, oid: F }
  }))
    throw new Gr();
  const Q = !W.capabilities.has("no-thin");
  let se = /* @__PURE__ */ new Set();
  if (!T) {
    const _e = [...W.refs.values()];
    let Te = /* @__PURE__ */ new Set();
    if (F !== "0000000000000000000000000000000000000000") {
      const ge = await xo({
        fs: t,
        cache: e,
        gitdir: f,
        oids: [$, F]
      });
      for (const $e of ge) _e.push($e);
      Q && (Te = await Fa({ fs: t, cache: e, gitdir: f, oids: ge }));
    }
    if (!_e.includes($)) {
      const ge = await Jp({
        fs: t,
        cache: e,
        gitdir: f,
        start: [$],
        finish: _e
      });
      se = await Fa({ fs: t, cache: e, gitdir: f, oids: ge });
    }
    if (Q) {
      try {
        const ge = await ce.resolve({
          fs: t,
          gitdir: f,
          ref: `refs/remotes/${m}/HEAD`,
          depth: 2
        }), { oid: $e } = await ce.resolveAgainstMap({
          ref: ge.replace(`refs/remotes/${m}/`, ""),
          fullref: ge,
          map: W.refs
        }), ke = [$e];
        for (const Se of await Fa({ fs: t, cache: e, gitdir: f, oids: ke }))
          Te.add(Se);
      } catch {
      }
      for (const ge of Te)
        se.delete(ge);
    }
    if ($ === F && (b = !0), !b) {
      if (M.startsWith("refs/tags") && F !== "0000000000000000000000000000000000000000")
        throw new Pr("tag-exists");
      if ($ !== "0000000000000000000000000000000000000000" && F !== "0000000000000000000000000000000000000000" && !await Yl({
        fs: t,
        cache: e,
        gitdir: f,
        oid: $,
        ancestor: F,
        depth: -1
      }))
        throw new Pr("not-fast-forward");
    }
  }
  const ve = zl(
    [...W.capabilities],
    ["report-status", "side-band-64k", `agent=${ri.agent}`]
  ), ie = await ew({
    capabilities: ve,
    triplets: [{ oldoid: F, oid: $, fullRef: K }]
  }), Y = T ? [] : await Ql({
    fs: t,
    cache: e,
    gitdir: f,
    oids: [...se]
  }), ae = await O.connect({
    http: r,
    onProgress: n,
    corsProxy: R,
    service: "git-receive-pack",
    url: N,
    auth: z,
    headers: S,
    body: [...ie, ...Y]
  }), { packfile: de, progress: Ae } = await Wl.demux(ae.body);
  if (i) {
    const _e = ql(Ae);
    Rn(_e, async (Te) => {
      await i(Te);
    });
  }
  const Ie = await Qp(de);
  if (ae.headers && (Ie.headers = ae.headers), m && Ie.ok && Ie.refs[K].ok && !M.startsWith("refs/tags")) {
    const _e = `refs/remotes/${m}/${K.replace(
      "refs/heads",
      ""
    )}`;
    T ? await ce.deleteRef({ fs: t, gitdir: f, ref: _e }) : await ce.writeRef({ fs: t, gitdir: f, ref: _e, value: $ });
  }
  if (Ie.ok && Object.values(Ie.refs).every((_e) => _e.ok))
    return Ie;
  {
    const _e = Object.entries(Ie.refs).filter(([Te, ge]) => !ge.ok).map(([Te, ge]) => `
  - ${Te}: ${ge.error}`).join("");
    throw new yn(_e, Ie);
  }
}
async function rw({
  fs: t,
  http: e,
  onProgress: r,
  onMessage: n,
  onAuth: i,
  onAuthSuccess: a,
  onAuthFailure: o,
  onPrePush: s,
  dir: c,
  gitdir: f = re.join(c, ".git"),
  ref: l,
  remoteRef: w,
  remote: m = "origin",
  url: g,
  force: b = !1,
  delete: T = !1,
  corsProxy: R,
  headers: S = {},
  cache: A = {}
}) {
  try {
    return q("fs", t), q("http", e), q("gitdir", f), await tw({
      fs: new ye(t),
      cache: A,
      http: e,
      onProgress: r,
      onMessage: n,
      onAuth: i,
      onAuthSuccess: a,
      onAuthFailure: o,
      onPrePush: s,
      gitdir: f,
      ref: l,
      remoteRef: w,
      remote: m,
      url: g,
      force: b,
      delete: T,
      corsProxy: R,
      headers: S
    });
  } catch (B) {
    throw B.caller = "git.push", B;
  }
}
async function eu({ fs: t, cache: e, gitdir: r, oid: n }) {
  const { type: i, object: a } = await Qe({ fs: t, cache: e, gitdir: r, oid: n });
  if (i === "tag")
    return n = mt.from(a).parse().object, eu({ fs: t, cache: e, gitdir: r, oid: n });
  if (i !== "blob")
    throw new yt(n, i, "blob");
  return { oid: n, blob: new Uint8Array(a) };
}
async function tu({
  fs: t,
  cache: e,
  gitdir: r,
  oid: n,
  filepath: i = void 0
}) {
  return i !== void 0 && (n = await An({ fs: t, cache: e, gitdir: r, oid: n, filepath: i })), await eu({
    fs: t,
    cache: e,
    gitdir: r,
    oid: n
  });
}
async function nw({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oid: n,
  filepath: i,
  cache: a = {}
}) {
  try {
    return q("fs", t), q("gitdir", r), q("oid", n), await tu({
      fs: new ye(t),
      cache: a,
      gitdir: r,
      oid: n,
      filepath: i
    });
  } catch (o) {
    throw o.caller = "git.readBlob", o;
  }
}
async function ru({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oid: n,
  cache: i = {}
}) {
  try {
    return q("fs", t), q("gitdir", r), q("oid", n), await Ur({
      fs: new ye(t),
      cache: i,
      gitdir: r,
      oid: n
    });
  } catch (a) {
    throw a.caller = "git.readCommit", a;
  }
}
async function iw({
  fs: t,
  cache: e,
  gitdir: r,
  ref: n = "refs/notes/commits",
  oid: i
}) {
  const a = await ce.resolve({ gitdir: r, fs: t, ref: n }), { blob: o } = await tu({
    fs: t,
    cache: e,
    gitdir: r,
    oid: a,
    filepath: i
  });
  return o;
}
async function aw({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: n = "refs/notes/commits",
  oid: i,
  cache: a = {}
}) {
  try {
    return q("fs", t), q("gitdir", r), q("ref", n), q("oid", i), await iw({
      fs: new ye(t),
      cache: a,
      gitdir: r,
      ref: n,
      oid: i
    });
  } catch (o) {
    throw o.caller = "git.readNote", o;
  }
}
async function ow({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oid: n,
  format: i = "parsed",
  filepath: a = void 0,
  encoding: o = void 0,
  cache: s = {}
}) {
  try {
    q("fs", t), q("gitdir", r), q("oid", n);
    const c = new ye(t);
    a !== void 0 && (n = await An({
      fs: c,
      cache: s,
      gitdir: r,
      oid: n,
      filepath: a
    }));
    const l = await Qe({
      fs: c,
      cache: s,
      gitdir: r,
      oid: n,
      format: i === "parsed" ? "content" : i
    });
    if (l.oid = n, i === "parsed")
      switch (l.format = "parsed", l.type) {
        case "commit":
          l.object = Ye.from(l.object).parse();
          break;
        case "tree":
          l.object = bt.from(l.object).entries();
          break;
        case "blob":
          o ? l.object = l.object.toString(o) : (l.object = new Uint8Array(l.object), l.format = "content");
          break;
        case "tag":
          l.object = mt.from(l.object).parse();
          break;
        default:
          throw new yt(
            l.oid,
            l.type,
            "blob|commit|tag|tree"
          );
      }
    else (l.format === "deflated" || l.format === "wrapped") && (l.type = l.format);
    return l;
  } catch (c) {
    throw c.caller = "git.readObject", c;
  }
}
async function sw({ fs: t, cache: e, gitdir: r, oid: n }) {
  const { type: i, object: a } = await Qe({
    fs: t,
    cache: e,
    gitdir: r,
    oid: n,
    format: "content"
  });
  if (i !== "tag")
    throw new yt(n, i, "tag");
  const o = mt.from(a);
  return {
    oid: n,
    tag: o.parse(),
    payload: o.payload()
  };
}
async function cw({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oid: n,
  cache: i = {}
}) {
  try {
    return q("fs", t), q("gitdir", r), q("oid", n), await sw({
      fs: new ye(t),
      cache: i,
      gitdir: r,
      oid: n
    });
  } catch (a) {
    throw a.caller = "git.readTag", a;
  }
}
async function lw({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oid: n,
  filepath: i = void 0,
  cache: a = {}
}) {
  try {
    return q("fs", t), q("gitdir", r), q("oid", n), await Vr({
      fs: new ye(t),
      cache: a,
      gitdir: r,
      oid: n,
      filepath: i
    });
  } catch (o) {
    throw o.caller = "git.readTree", o;
  }
}
async function uw({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  filepath: n,
  cache: i = {}
}) {
  try {
    q("fs", t), q("gitdir", r), q("filepath", n), await ut.acquire(
      { fs: new ye(t), gitdir: r, cache: i },
      async function(a) {
        a.delete({ filepath: n });
      }
    );
  } catch (a) {
    throw a.caller = "git.remove", a;
  }
}
async function fw({
  fs: t,
  cache: e,
  onSign: r,
  gitdir: n,
  ref: i = "refs/notes/commits",
  oid: a,
  author: o,
  committer: s,
  signingKey: c
}) {
  let f;
  try {
    f = await ce.resolve({ gitdir: n, fs: t, ref: i });
  } catch (b) {
    if (!(b instanceof Ge))
      throw b;
  }
  let w = (await Vr({
    fs: t,
    gitdir: n,
    oid: f || "4b825dc642cb6eb9a060e54bf8d69288fbee4904"
  })).tree;
  w = w.filter((b) => b.path !== a);
  const m = await In({
    fs: t,
    gitdir: n,
    tree: w
  });
  return await ei({
    fs: t,
    cache: e,
    onSign: r,
    gitdir: n,
    ref: i,
    tree: m,
    parent: f && [f],
    message: `Note removed by 'isomorphic-git removeNote'
`,
    author: o,
    committer: s,
    signingKey: c
  });
}
async function hw({
  fs: t,
  onSign: e,
  dir: r,
  gitdir: n = re.join(r, ".git"),
  ref: i = "refs/notes/commits",
  oid: a,
  author: o,
  committer: s,
  signingKey: c,
  cache: f = {}
}) {
  try {
    q("fs", t), q("gitdir", n), q("oid", a);
    const l = new ye(t), w = await lr({ fs: l, gitdir: n, author: o });
    if (!w) throw new pt("author");
    const m = await Mr({
      fs: l,
      gitdir: n,
      author: w,
      committer: s
    });
    if (!m) throw new pt("committer");
    return await fw({
      fs: l,
      cache: f,
      onSign: e,
      gitdir: n,
      ref: i,
      oid: a,
      author: w,
      committer: m,
      signingKey: c
    });
  } catch (l) {
    throw l.caller = "git.removeNote", l;
  }
}
async function dw({
  fs: t,
  gitdir: e,
  oldref: r,
  ref: n,
  checkout: i = !1
}) {
  if (n !== Ht.clean(n))
    throw new Nt(n, Ht.clean(n));
  if (r !== Ht.clean(r))
    throw new Nt(r, Ht.clean(r));
  const a = `refs/heads/${r}`, o = `refs/heads/${n}`;
  if (await ce.exists({ fs: t, gitdir: e, ref: o }))
    throw new Mt("branch", n, !1);
  const c = await ce.resolve({
    fs: t,
    gitdir: e,
    ref: a,
    depth: 1
  });
  await ce.writeRef({ fs: t, gitdir: e, ref: o, value: c }), await ce.deleteRef({ fs: t, gitdir: e, ref: a });
  const l = await fr({
    fs: t,
    gitdir: e,
    fullname: !0
  }) === a;
  (i || l) && await ce.writeSymbolicRef({
    fs: t,
    gitdir: e,
    ref: "HEAD",
    value: o
  });
}
async function pw({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: n,
  oldref: i,
  checkout: a = !1
}) {
  try {
    return q("fs", t), q("gitdir", r), q("ref", n), q("oldref", i), await dw({
      fs: new ye(t),
      gitdir: r,
      ref: n,
      oldref: i,
      checkout: a
    });
  } catch (o) {
    throw o.caller = "git.renameBranch", o;
  }
}
async function nu({ gitdir: t, type: e, object: r }) {
  return Jt(qr.wrap({ type: e, object: r }));
}
async function ww({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  filepath: n,
  ref: i,
  cache: a = {}
}) {
  try {
    q("fs", t), q("gitdir", r), q("filepath", n);
    const o = new ye(t);
    let s, c;
    try {
      s = await ce.resolve({ fs: o, gitdir: r, ref: i || "HEAD" });
    } catch (w) {
      if (i)
        throw w;
    }
    if (s)
      try {
        s = await An({
          fs: o,
          cache: a,
          gitdir: r,
          oid: s,
          filepath: n
        });
      } catch {
        s = null;
      }
    let f = {
      ctime: /* @__PURE__ */ new Date(0),
      mtime: /* @__PURE__ */ new Date(0),
      dev: 0,
      ino: 0,
      mode: 0,
      uid: 0,
      gid: 0,
      size: 0
    };
    const l = e && await o.read(re.join(e, n));
    l && (c = await nu({
      gitdir: r,
      type: "blob",
      object: l
    }), s === c && (f = await o.lstat(re.join(e, n)))), await ut.acquire({ fs: o, gitdir: r, cache: a }, async function(w) {
      w.delete({ filepath: n }), s && w.insert({ filepath: n, stats: f, oid: s });
    });
  } catch (o) {
    throw o.caller = "git.reset", o;
  }
}
async function mw({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: n,
  depth: i
}) {
  try {
    return q("fs", t), q("gitdir", r), q("ref", n), await ce.resolve({
      fs: new ye(t),
      gitdir: r,
      ref: n,
      depth: i
    });
  } catch (a) {
    throw a.caller = "git.resolveRef", a;
  }
}
async function yw({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  path: n,
  value: i,
  append: a = !1
}) {
  try {
    q("fs", t), q("gitdir", r), q("path", n);
    const o = new ye(t), s = await ot.get({ fs: o, gitdir: r });
    a ? await s.append(n, i) : await s.set(n, i), await ot.save({ fs: o, gitdir: r, config: s });
  } catch (o) {
    throw o.caller = "git.setConfig", o;
  }
}
async function iu({ fs: t, gitdir: e, commit: r }) {
  const n = Ye.from(r).toObject();
  return await Et({
    fs: t,
    gitdir: e,
    type: "commit",
    object: n,
    format: "content"
  });
}
class Xn {
  // constructor removed
  static get timezoneOffsetForRefLogEntry() {
    const e = (/* @__PURE__ */ new Date()).getTimezoneOffset(), r = Math.abs(Math.floor(e / 60)), n = Math.abs(e % 60).toString().padStart(2, "0");
    return `${e > 0 ? "-" : "+"}${r.toString().padStart(2, "0")}${n}`;
  }
  static createStashReflogEntry(e, r, n) {
    const i = e.name.replace(/\s/g, ""), a = "0000000000000000000000000000000000000000", o = Math.floor(Date.now() / 1e3), s = Xn.timezoneOffsetForRefLogEntry;
    return `${a} ${r} ${i} ${e.email} ${o} ${s}	${n}
`;
  }
  static getStashReflogEntry(e, r = !1) {
    return e.split(`
`).filter((a) => a).reverse().map(
      (a, o) => r ? `stash@{${o}}: ${a.split("	")[1]}` : a
    );
  }
}
const gw = {
  stage: zr,
  workdir: xn
};
let Pa;
async function jr(t, e) {
  return Pa === void 0 && (Pa = new tn()), Pa.acquire(t, e);
}
async function vw(t, e, r, n, i = null) {
  const a = re.join(r, n), o = await t.lstat(a);
  if (!o) throw new Ge(a);
  if (o.isDirectory())
    throw new Oe(
      `${a}: file expected, but found directory`
    );
  const s = i ? await Il({ fs: t, gitdir: e, oid: i }) : void 0;
  let c = s ? i : void 0;
  return s || await jr({ fs: t, gitdir: e, currentFilepath: a }, async () => {
    const f = o.isSymbolicLink() ? await t.readlink(a).then(Ol) : await t.read(a);
    if (f === null) throw new Ge(a);
    c = await Et({ fs: t, gitdir: e, type: "blob", object: f });
  }), c;
}
async function _w({ fs: t, dir: e, gitdir: r, entries: n }) {
  async function i(a) {
    if (a.type === "tree") {
      if (!a.oid) {
        const o = await Promise.all(a.children.map(i));
        a.oid = await In({
          fs: t,
          gitdir: r,
          tree: o
        }), a.mode = 16384;
      }
    } else a.type === "blob" && (a.oid = await vw(
      t,
      r,
      e,
      a.path,
      a.oid
    ), a.mode = 33188);
    return a.path = a.path.split("/").pop(), a;
  }
  return Promise.all(n.map(i));
}
async function Ic({
  fs: t,
  dir: e,
  gitdir: r,
  treePair: n
  // [TREE({ ref: 'HEAD' }), 'STAGE'] would be the equivalent of `git write-tree`
}) {
  const i = n[1] === "stage", a = n.map((g) => typeof g == "string" ? gw[g]() : g), o = [], l = await cr({
    fs: t,
    cache: {},
    dir: e,
    gitdir: r,
    trees: a,
    map: async (g, [b, T]) => {
      if (!(g === "." || await Zr.isIgnored({ fs: t, dir: e, gitdir: r, filepath: g })) && T)
        return (!b || await b.oid() !== await T.oid() && await T.oid() !== void 0) && o.push([b, T]), {
          mode: await T.mode(),
          path: g,
          oid: await T.oid(),
          type: await T.type()
        };
    },
    reduce: async (g, b) => (b = b.filter(Boolean), g ? (g.children = b, g) : b.length > 0 ? b : void 0),
    iterate: async (g, b) => {
      const T = [];
      for (const R of b) {
        const [S, A] = R;
        i ? A && (await t.exists(`${e}/${A.toString()}`) ? T.push(R) : o.push([null, A])) : S && (A ? T.push(R) : o.push([S, null]));
      }
      return T.length ? Promise.all(T.map(g)) : [];
    }
  });
  if (o.length === 0 || l.length === 0)
    return null;
  const m = (await _w({
    fs: t,
    dir: e,
    gitdir: r,
    entries: l
  })).filter(Boolean).map((g) => ({
    mode: g.mode,
    path: g.path,
    oid: g.oid,
    type: g.type
  }));
  return In({ fs: t, gitdir: r, tree: m });
}
async function bw({
  fs: t,
  dir: e,
  gitdir: r,
  stashCommit: n,
  parentCommit: i,
  wasStaged: a
}) {
  const o = [], s = [], c = await cr({
    fs: t,
    cache: {},
    dir: e,
    gitdir: r,
    trees: [$t({ ref: i }), $t({ ref: n })],
    map: async (f, [l, w]) => {
      if (f === "." || await Zr.isIgnored({ fs: t, dir: e, gitdir: r, filepath: f }))
        return;
      const m = w ? await w.type() : await l.type();
      if (m !== "tree" && m !== "blob")
        return;
      if (!w && l) {
        const b = m === "tree" ? "rmdir" : "rm";
        return m === "tree" && o.push(f), m === "blob" && a && s.push({ filepath: f, oid: await l.oid() }), { method: b, filepath: f };
      }
      const g = await w.oid();
      if (!l || await l.oid() !== g)
        return m === "tree" ? { method: "mkdir", filepath: f } : (a && s.push({
          filepath: f,
          oid: g,
          stats: await t.lstat(re.join(e, f))
        }), {
          method: "write",
          filepath: f,
          oid: g
        });
    }
  });
  await jr({ fs: t, gitdir: r, dirRemoved: o, ops: c }, async () => {
    for (const f of c) {
      const l = re.join(e, f.filepath);
      switch (f.method) {
        case "rmdir":
          await t.rmdir(l);
          break;
        case "mkdir":
          await t.mkdir(l);
          break;
        case "rm":
          await t.rm(l);
          break;
        case "write":
          if (!o.some(
            (w) => l.startsWith(w)
          )) {
            const { object: w } = await Qe({
              fs: t,
              cache: {},
              gitdir: r,
              oid: f.oid
            });
            await t.exists(l) && await t.rm(l), await t.write(l, w);
          }
          break;
      }
    }
  }), await ut.acquire({ fs: t, gitdir: r, cache: {} }, async (f) => {
    s.forEach(({ filepath: l, stats: w, oid: m }) => {
      f.insert({ filepath: l, stats: w, oid: m });
    });
  });
}
class Kt {
  constructor({ fs: e, dir: r, gitdir: n = re.join(r, ".git") }) {
    Object.assign(this, {
      fs: e,
      dir: r,
      gitdir: n,
      _author: null
    });
  }
  static get refStash() {
    return "refs/stash";
  }
  static get refLogsStash() {
    return "logs/refs/stash";
  }
  get refStashPath() {
    return re.join(this.gitdir, Kt.refStash);
  }
  get refLogsStashPath() {
    return re.join(this.gitdir, Kt.refLogsStash);
  }
  async getAuthor() {
    if (!this._author && (this._author = await lr({
      fs: this.fs,
      gitdir: this.gitdir,
      author: {}
    }), !this._author))
      throw new pt("author");
    return this._author;
  }
  async getStashSHA(e, r) {
    return await this.fs.exists(this.refStashPath) ? (r || await this.readStashReflogs({ parsed: !1 }))[e].split(" ")[1] : null;
  }
  async writeStashCommit({ message: e, tree: r, parent: n }) {
    return iu({
      fs: this.fs,
      gitdir: this.gitdir,
      commit: {
        message: e,
        tree: r,
        parent: n,
        author: await this.getAuthor(),
        committer: await this.getAuthor()
      }
    });
  }
  async readStashCommit(e) {
    const r = await this.readStashReflogs({ parsed: !1 });
    if (e !== 0 && (e < 0 || e > r.length - 1))
      throw new Nt(
        `stash@${e}`,
        "number that is in range of [0, num of stash pushed]"
      );
    const n = await this.getStashSHA(e, r);
    return n ? Ur({
      fs: this.fs,
      cache: {},
      gitdir: this.gitdir,
      oid: n
    }) : {};
  }
  async writeStashRef(e) {
    return ce.writeRef({
      fs: this.fs,
      gitdir: this.gitdir,
      ref: Kt.refStash,
      value: e
    });
  }
  async writeStashReflogEntry({ stashCommit: e, message: r }) {
    const n = await this.getAuthor(), i = Xn.createStashReflogEntry(
      n,
      e,
      r
    ), a = this.refLogsStashPath;
    await jr({ filepath: a, entry: i }, async () => {
      const o = await this.fs.exists(a) ? await this.fs.read(a, "utf8") : "";
      await this.fs.write(a, o + i, "utf8");
    });
  }
  async readStashReflogs({ parsed: e = !1 }) {
    if (!await this.fs.exists(this.refLogsStashPath))
      return [];
    const n = (await this.fs.read(this.refLogsStashPath)).toString();
    return Xn.getStashReflogEntry(n, e);
  }
}
async function Ew({ fs: t, dir: e, gitdir: r, message: n = "" }) {
  const i = new Kt({ fs: t, dir: e, gitdir: r });
  await i.getAuthor();
  const a = await fr({
    fs: t,
    gitdir: r,
    fullname: !1
  }), o = await ce.resolve({
    fs: t,
    gitdir: r,
    ref: "HEAD"
  }), c = (await ru({ fs: t, dir: e, gitdir: r, oid: o })).commit.message, f = [o];
  let l = null, w = $t({ ref: "HEAD" });
  const m = await Ic({
    fs: t,
    dir: e,
    gitdir: r,
    treePair: [$t({ ref: "HEAD" }), "stage"]
  });
  if (m) {
    const R = await i.writeStashCommit({
      message: `stash-Index: WIP on ${a} - ${(/* @__PURE__ */ new Date()).toISOString()}`,
      tree: m,
      // stashCommitTree
      parent: f
    });
    f.push(R), l = m, w = zr();
  }
  const g = await Ic({
    fs: t,
    dir: e,
    gitdir: r,
    treePair: [w, "workdir"]
  });
  if (g) {
    const R = await i.writeStashCommit({
      message: `stash-WorkDir: WIP on ${a} - ${(/* @__PURE__ */ new Date()).toISOString()}`,
      tree: g,
      parent: [f[f.length - 1]]
    });
    f.push(R), l = g;
  }
  if (!l || !m && !g)
    throw new Ge("changes, nothing to stash");
  const b = (n.trim() || `WIP on ${a}`) + `: ${o.substring(0, 7)} ${c}`, T = await i.writeStashCommit({
    message: b,
    tree: l,
    parent: f
  });
  return await i.writeStashRef(T), await i.writeStashReflogEntry({
    stashCommit: T,
    message: b
  }), await jl({
    fs: t,
    dir: e,
    gitdir: r,
    ref: a,
    track: !1,
    force: !0
    // force checkout to discard changes
  }), T;
}
async function au({ fs: t, dir: e, gitdir: r, refIdx: n = 0 }) {
  const a = await new Kt({ fs: t, dir: e, gitdir: r }).readStashCommit(n), { parent: o = null } = a.commit ? a.commit : {};
  if (!(!o || !Array.isArray(o)))
    for (let s = 0; s < o.length - 1; s++) {
      const f = (await Ur({
        fs: t,
        cache: {},
        gitdir: r,
        oid: o[s + 1]
      })).commit.message.startsWith("stash-Index");
      await bw({
        fs: t,
        dir: e,
        gitdir: r,
        stashCommit: o[s + 1],
        parentCommit: o[s],
        wasStaged: f
      });
    }
}
async function ou({ fs: t, dir: e, gitdir: r, refIdx: n = 0 }) {
  const i = new Kt({ fs: t, dir: e, gitdir: r });
  if (!(await i.readStashCommit(n)).commit)
    return;
  const o = i.refStashPath;
  await jr(o, async () => {
    await t.exists(o) && await t.rm(o);
  });
  const s = await i.readStashReflogs({ parsed: !1 });
  if (!s.length)
    return;
  s.splice(n, 1);
  const c = i.refLogsStashPath;
  await jr({ reflogEntries: s, stashReflogPath: c, stashMgr: i }, async () => {
    if (s.length) {
      await t.write(c, s.join(`
`), "utf8");
      const f = s[s.length - 1].split(
        " "
      )[1];
      await i.writeStashRef(f);
    } else
      await t.rm(c);
  });
}
async function Sw({ fs: t, dir: e, gitdir: r }) {
  return new Kt({ fs: t, dir: e, gitdir: r }).readStashReflogs({ parsed: !0 });
}
async function kw({ fs: t, dir: e, gitdir: r }) {
  const n = new Kt({ fs: t, dir: e, gitdir: r }), i = [n.refStashPath, n.refLogsStashPath];
  await jr(i, async () => {
    await Promise.all(
      i.map(async (a) => {
        if (await t.exists(a))
          return t.rm(a);
      })
    );
  });
}
async function xw({ fs: t, dir: e, gitdir: r, refIdx: n = 0 }) {
  await au({ fs: t, dir: e, gitdir: r, refIdx: n }), await ou({ fs: t, dir: e, gitdir: r, refIdx: n });
}
async function Aw({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  op: n = "push",
  message: i = "",
  refIdx: a = 0
}) {
  q("fs", t), q("dir", e), q("gitdir", r), q("op", n);
  const o = {
    push: Ew,
    apply: au,
    drop: ou,
    list: Sw,
    clear: kw,
    pop: xw
  }, s = ["apply", "drop", "pop"];
  try {
    const c = new ye(t);
    ["refs", "logs", "logs/refs"].map((w) => re.join(r, w)).forEach(async (w) => {
      await c.exists(w) || await c.mkdir(w);
    });
    const l = o[n];
    if (l) {
      if (s.includes(n) && a < 0)
        throw new Nt(
          `stash@${a}`,
          "number that is in range of [0, num of stash pushed]"
        );
      return await l({ fs: c, dir: e, gitdir: r, message: i, refIdx: a });
    }
    throw new Error(`To be implemented: ${n}`);
  } catch (c) {
    throw c.caller = "git.stash", c;
  }
}
async function Iw({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  filepath: n,
  cache: i = {}
}) {
  try {
    q("fs", t), q("gitdir", r), q("filepath", n);
    const a = new ye(t);
    if (await Zr.isIgnored({
      fs: a,
      gitdir: r,
      dir: e,
      filepath: n
    }))
      return "ignored";
    const s = await Rw({ fs: a, cache: i, gitdir: r }), c = await su({
      fs: a,
      cache: i,
      gitdir: r,
      tree: s,
      path: n
    }), f = await ut.acquire(
      { fs: a, gitdir: r, cache: i },
      async function(T) {
        for (const R of T)
          if (R.path === n) return R;
        return null;
      }
    ), l = await a.lstat(re.join(e, n)), w = c !== null, m = f !== null, g = l !== null, b = async () => {
      if (m && !Ln(f, l))
        return f.oid;
      {
        const T = await a.read(re.join(e, n)), R = await nu({
          gitdir: r,
          type: "blob",
          object: T
        });
        return m && f.oid === R && l.size !== -1 && ut.acquire({ fs: a, gitdir: r, cache: i }, async function(S) {
          S.insert({ filepath: n, stats: l, oid: R });
        }), R;
      }
    };
    if (!w && !g && !m) return "absent";
    if (!w && !g && m) return "*absent";
    if (!w && g && !m) return "*added";
    if (!w && g && m)
      return await b() === f.oid ? "added" : "*added";
    if (w && !g && !m) return "deleted";
    if (w && !g && m)
      return c === f.oid, "*deleted";
    if (w && g && !m)
      return await b() === c ? "*undeleted" : "*undeletemodified";
    if (w && g && m) {
      const T = await b();
      return T === c ? T === f.oid ? "unmodified" : "*unmodified" : T === f.oid ? "modified" : "*modified";
    }
  } catch (a) {
    throw a.caller = "git.status", a;
  }
}
async function su({ fs: t, cache: e, gitdir: r, tree: n, path: i }) {
  typeof i == "string" && (i = i.split("/"));
  const a = i.shift();
  for (const o of n)
    if (o.path === a) {
      if (i.length === 0)
        return o.oid;
      const { type: s, object: c } = await Qe({
        fs: t,
        cache: e,
        gitdir: r,
        oid: o.oid
      });
      if (s === "tree") {
        const f = bt.from(c);
        return su({ fs: t, cache: e, gitdir: r, tree: f, path: i });
      }
      if (s === "blob")
        throw new yt(o.oid, s, "blob", i.join("/"));
    }
  return null;
}
async function Rw({ fs: t, cache: e, gitdir: r }) {
  let n;
  try {
    n = await ce.resolve({ fs: t, gitdir: r, ref: "HEAD" });
  } catch (a) {
    if (a instanceof Ge)
      return [];
  }
  const { tree: i } = await Vr({ fs: t, cache: e, gitdir: r, oid: n });
  return i;
}
async function Tw({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: n = "HEAD",
  filepaths: i = ["."],
  filter: a,
  cache: o = {},
  ignored: s = !1
}) {
  try {
    q("fs", t), q("gitdir", r), q("ref", n);
    const c = new ye(t);
    return await cr({
      fs: c,
      cache: o,
      dir: e,
      gitdir: r,
      trees: [$t({ ref: n }), xn(), zr()],
      map: async function(f, [l, w, m]) {
        if (!l && !m && w && !s && await Zr.isIgnored({
          fs: c,
          dir: e,
          filepath: f
        }) || !i.some((M) => Ul(f, M)))
          return null;
        if (a && !a(f))
          return;
        const [g, b, T] = await Promise.all([
          l && l.type(),
          w && w.type(),
          m && m.type()
        ]), R = [g, b, T].includes("blob");
        if ((g === "tree" || g === "special") && !R) return;
        if (g === "commit") return null;
        if ((b === "tree" || b === "special") && !R)
          return;
        if (T === "commit") return null;
        if ((T === "tree" || T === "special") && !R) return;
        const S = g === "blob" ? await l.oid() : void 0, A = T === "blob" ? await m.oid() : void 0;
        let B;
        g !== "blob" && b === "blob" && T !== "blob" ? B = "42" : b === "blob" && (B = await w.oid());
        const N = [void 0, S, B, A], U = N.map((M) => N.indexOf(M));
        return U.shift(), [f, ...U];
      }
    });
  } catch (c) {
    throw c.caller = "git.statusMatrix", c;
  }
}
async function $w({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: n,
  object: i,
  force: a = !1
}) {
  try {
    q("fs", t), q("gitdir", r), q("ref", n);
    const o = new ye(t);
    if (n === void 0)
      throw new _t("ref");
    n = n.startsWith("refs/tags/") ? n : `refs/tags/${n}`;
    const s = await ce.resolve({
      fs: o,
      gitdir: r,
      ref: i || "HEAD"
    });
    if (!a && await ce.exists({ fs: o, gitdir: r, ref: n }))
      throw new Mt("tag", n);
    await ce.writeRef({ fs: o, gitdir: r, ref: n, value: s });
  } catch (o) {
    throw o.caller = "git.tag", o;
  }
}
async function Bw({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  cache: n = {},
  filepath: i,
  oid: a,
  mode: o,
  add: s,
  remove: c,
  force: f
}) {
  try {
    q("fs", t), q("gitdir", r), q("filepath", i);
    const l = new ye(t);
    if (c)
      return await ut.acquire(
        { fs: l, gitdir: r, cache: n },
        async function(m) {
          if (!f) {
            const g = await l.lstat(re.join(e, i));
            if (g) {
              if (g.isDirectory())
                throw new sr("directory");
              return;
            }
          }
          m.has({ filepath: i }) && m.delete({
            filepath: i
          });
        }
      );
    let w;
    if (!a) {
      if (w = await l.lstat(re.join(e, i)), !w)
        throw new Ge(
          `file at "${i}" on disk and "remove" not set`
        );
      if (w.isDirectory())
        throw new sr("directory");
    }
    return await ut.acquire({ fs: l, gitdir: r, cache: n }, async function(m) {
      if (!s && !m.has({ filepath: i }))
        throw new Ge(
          `file at "${i}" in index and "add" not set`
        );
      let g;
      if (a)
        g = {
          ctime: /* @__PURE__ */ new Date(0),
          mtime: /* @__PURE__ */ new Date(0),
          dev: 0,
          ino: 0,
          mode: o,
          uid: 0,
          gid: 0,
          size: 0
        };
      else {
        g = w;
        const b = g.isSymbolicLink() ? await l.readlink(re.join(e, i)) : await l.read(re.join(e, i));
        a = await Et({
          fs: l,
          gitdir: r,
          type: "blob",
          format: "content",
          object: b
        });
      }
      return m.insert({
        filepath: i,
        oid: a,
        stats: g
      }), a;
    });
  } catch (l) {
    throw l.caller = "git.updateIndex", l;
  }
}
function Dw() {
  try {
    return ri.version;
  } catch (t) {
    throw t.caller = "git.version", t;
  }
}
async function Ow({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  trees: n,
  map: i,
  reduce: a,
  iterate: o,
  cache: s = {}
}) {
  try {
    return q("fs", t), q("gitdir", r), q("trees", n), await cr({
      fs: new ye(t),
      cache: s,
      dir: e,
      gitdir: r,
      trees: n,
      map: i,
      reduce: a,
      iterate: o
    });
  } catch (c) {
    throw c.caller = "git.walk", c;
  }
}
async function Cw({ fs: t, dir: e, gitdir: r = re.join(e, ".git"), blob: n }) {
  try {
    return q("fs", t), q("gitdir", r), q("blob", n), await Et({
      fs: new ye(t),
      gitdir: r,
      type: "blob",
      object: n,
      format: "content"
    });
  } catch (i) {
    throw i.caller = "git.writeBlob", i;
  }
}
async function Fw({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  commit: n
}) {
  try {
    return q("fs", t), q("gitdir", r), q("commit", n), await iu({
      fs: new ye(t),
      gitdir: r,
      commit: n
    });
  } catch (i) {
    throw i.caller = "git.writeCommit", i;
  }
}
async function Pw({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  type: n,
  object: i,
  format: a = "parsed",
  oid: o,
  encoding: s = void 0
}) {
  try {
    const c = new ye(t);
    if (a === "parsed") {
      switch (n) {
        case "commit":
          i = Ye.from(i).toObject();
          break;
        case "tree":
          i = bt.from(i).toObject();
          break;
        case "blob":
          i = he.from(i, s);
          break;
        case "tag":
          i = mt.from(i).toObject();
          break;
        default:
          throw new yt(o || "", n, "blob|commit|tag|tree");
      }
      a = "content";
    }
    return o = await Et({
      fs: c,
      gitdir: r,
      type: n,
      object: i,
      oid: o,
      format: a
    }), o;
  } catch (c) {
    throw c.caller = "git.writeObject", c;
  }
}
async function Nw({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: n,
  value: i,
  force: a = !1,
  symbolic: o = !1
}) {
  try {
    q("fs", t), q("gitdir", r), q("ref", n), q("value", i);
    const s = new ye(t);
    if (n !== Ht.clean(n))
      throw new Nt(n, Ht.clean(n));
    if (!a && await ce.exists({ fs: s, gitdir: r, ref: n }))
      throw new Mt("ref", n);
    o ? await ce.writeSymbolicRef({
      fs: s,
      gitdir: r,
      ref: n,
      value: i
    }) : (i = await ce.resolve({
      fs: s,
      gitdir: r,
      ref: i
    }), await ce.writeRef({
      fs: s,
      gitdir: r,
      ref: n,
      value: i
    }));
  } catch (s) {
    throw s.caller = "git.writeRef", s;
  }
}
async function Mw({ fs: t, gitdir: e, tag: r }) {
  const n = mt.from(r).toObject();
  return await Et({
    fs: t,
    gitdir: e,
    type: "tag",
    object: n,
    format: "content"
  });
}
async function Uw({ fs: t, dir: e, gitdir: r = re.join(e, ".git"), tag: n }) {
  try {
    return q("fs", t), q("gitdir", r), q("tag", n), await Mw({
      fs: new ye(t),
      gitdir: r,
      tag: n
    });
  } catch (i) {
    throw i.caller = "git.writeTag", i;
  }
}
async function jw({ fs: t, dir: e, gitdir: r = re.join(e, ".git"), tree: n }) {
  try {
    return q("fs", t), q("gitdir", r), q("tree", n), await In({
      fs: new ye(t),
      gitdir: r,
      tree: n
    });
  } catch (i) {
    throw i.caller = "git.writeTree", i;
  }
}
var te = {
  Errors: pd,
  STAGE: zr,
  TREE: $t,
  WORKDIR: xn,
  add: Dd,
  abortMerge: Rd,
  addNote: Cd,
  addRemote: Fd,
  annotatedTag: Nd,
  branch: Ud,
  checkout: jl,
  clone: Kd,
  commit: Jd,
  getConfig: vp,
  getConfigAll: bp,
  setConfig: yw,
  currentBranch: Qd,
  deleteBranch: tp,
  deleteRef: rp,
  deleteRemote: ip,
  deleteTag: op,
  expandOid: up,
  expandRef: fp,
  fastForward: wp,
  fetch: mp,
  findMergeBase: yp,
  findRoot: gp,
  getRemoteInfo: Ep,
  getRemoteInfo2: Sp,
  hashBlob: xp,
  indexPack: Ip,
  init: Rp,
  isDescendent: Tp,
  isIgnored: $p,
  listBranches: Bp,
  listFiles: Op,
  listNotes: Fp,
  listRefs: Pp,
  listRemotes: Mp,
  listServerRefs: Lp,
  listTags: zp,
  log: Gp,
  merge: Zp,
  packObjects: Yp,
  pull: Kp,
  push: rw,
  readBlob: nw,
  readCommit: ru,
  readNote: aw,
  readObject: ow,
  readTag: cw,
  readTree: lw,
  remove: uw,
  removeNote: hw,
  renameBranch: pw,
  resetIndex: ww,
  updateIndex: Bw,
  resolveRef: mw,
  status: Iw,
  statusMatrix: Tw,
  tag: $w,
  version: Dw,
  walk: Ow,
  writeBlob: Cw,
  writeCommit: Fw,
  writeObject: Pw,
  writeRef: Nw,
  writeTag: Uw,
  writeTree: jw,
  stash: Aw
};
function Lw(t) {
  let e = [t];
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
function zw(t) {
  return t[Symbol.asyncIterator] ? t[Symbol.asyncIterator]() : t[Symbol.iterator] ? t[Symbol.iterator]() : t.next ? t : Lw(t);
}
async function qw(t, e) {
  const r = zw(t);
  for (; ; ) {
    const { value: n, done: i } = await r.next();
    if (n && await e(n), i) break;
  }
  r.return && r.return();
}
async function Ww(t) {
  let e = 0;
  const r = [];
  await qw(t, (a) => {
    r.push(a), e += a.byteLength;
  });
  const n = new Uint8Array(e);
  let i = 0;
  for (const a of r)
    n.set(a, i), i += a.byteLength;
  return n;
}
function Hw(t) {
  if (t[Symbol.asyncIterator]) return t;
  const e = t.getReader();
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
async function Gw({
  onProgress: t,
  url: e,
  method: r = "GET",
  headers: n = {},
  body: i
}) {
  i && (i = await Ww(i));
  const a = await fetch(e, { method: r, headers: n, body: i }), o = a.body && a.body.getReader ? Hw(a.body) : [new Uint8Array(await a.arrayBuffer())];
  n = {};
  for (const [s, c] of a.headers.entries())
    n[s] = c;
  return {
    url: a.url,
    method: a.method,
    statusCode: a.status,
    statusMessage: a.statusText,
    body: o,
    headers: n
  };
}
var Dt = { request: Gw };
class hr {
  constructor(e = !0, r = !1) {
    this.on = e, this.trace = r;
  }
  consoleDotLog(...e) {
    this.on && (console.log(...e), this.trace && console.trace());
  }
  consoleDotError(...e) {
    this.on && (console.error(...e), this.trace && console.trace());
  }
}
let Er = null;
const Rc = {
  serviceWorker: [
    "serviceWorker",
    "ServiceWorkerRegistration",
    "swUtils"
  ],
  kfs: [
    "kfs",
    "fsType",
    "fsManagerES6",
    "fsManagerGlobal",
    "vfs",
    "VFSutils"
  ],
  gitWorker: [
    "gitWorker",
    "dotGit",
    "acl",
    "stats",
    "GitAuth",
    "WorkerPool",
    "gitNoteManager"
  ],
  storage: [
    "memoryFS",
    "memoryBackendES6",
    "memoryBackendGlobal",
    "IDBFs"
  ]
}, $r = {
  corsProxy: "http://localhost:9000/",
  dir: "/",
  logging: {
    vfs: !0,
    kfs: !0,
    IDBFs: !0,
    gitWorker: !0,
    acl: !0,
    stats: !0,
    fsType: !0,
    fsManagerES6: !1,
    fsManagerGlobal: !1,
    swUtils: !0,
    memoryFS: !0,
    memoryBackendES6: !1,
    memoryBackendGlobal: !1,
    VFSutils: !0,
    gitNoteManager: !0,
    ServiceWorkerRegistration: !0,
    serviceWorker: !0,
    storageUtils: !0,
    supportChecker: !0,
    dotGit: !0,
    GitAuth: !0,
    WorkerPool: !0
  },
  versioning: {
    strategy: "immediate",
    interval: 10,
    number: 5
  },
  merging: {
    strategy: "immediate",
    interval: 60,
    onConflictStrategy: "remote"
  }
};
let cu = null;
async function Zw() {
  try {
    const t = await fetch("/config.json");
    if (!t.ok)
      throw new Error("Config file not found");
    const e = await t.json();
    if (e.logging) {
      for (const r in Rc)
        if (e.logging.hasOwnProperty(r)) {
          const n = e.logging[r];
          Rc[r].forEach((i) => {
            e.logging.hasOwnProperty(i) && (e.logging[i] = n);
          });
        }
    }
    return {
      ...$r,
      ...e,
      logging: {
        ...$r.logging,
        ...e.logging || {}
      },
      versioning: {
        ...$r.versioning,
        ...e.versioning || {}
      },
      merging: {
        ...$r.merging,
        ...e.merging || {}
      }
    };
  } catch (t) {
    return console.warn("Using default configuration:", t.message), $r;
  }
}
cu = Zw().then((t) => (Er = t, Er)).catch((t) => (console.error("Failed to load config:", t), Er = $r, Er));
async function kr() {
  return await cu, Er;
}
const Vw = await kr(), lu = new hr(Vw.logging.swUtils);
function yr(...t) {
  lu.consoleDotLog("[ SWUtils ]", ...t);
}
function Pn(...t) {
  lu.consoleDotError("[ SWUtils ]", ...t);
}
class uu {
  constructor() {
  }
  async fetchWithServiceWorker(e, r) {
    yr("Starting fetchWithServiceWorker with operation:", e, "and args:", r);
    try {
      const n = new URL("/git", self.location.origin).toString();
      yr("Constructed URL for fetch:", n);
      const i = {
        method: "POST",
        body: JSON.stringify({ operation: e, args: r }),
        headers: { "Content-Type": "application/json" }
      };
      yr("Request options:", i);
      const a = await fetch(n, i);
      yr("Fetch response received:", a);
      let o;
      try {
        o = await a.json(), yr("Parsed JSON response:", o);
      } catch (s) {
        throw Pn("Error parsing JSON response:", s), new Error("Response is not valid JSON");
      }
      if (!a.ok) {
        let s = `Fetch failed with status: ${a.status}`;
        switch (yr("Response status is not OK:", a.status), a.status) {
          case 400:
            s = "Bad Request: The server could not understand the request.";
            break;
          case 401:
            s = "Unauthorized: Authentication is required or has failed.";
            break;
          case 403:
            s = "Forbidden: You do not have permission to access this resource.";
            break;
          case 404:
            s = "Not Found: The requested resource could not be found.";
            break;
          case 500:
            s = "Internal Server Error: The server encountered an error.";
            break;
          case 502:
            s = "Bad Gateway: The server received an invalid response from the upstream server.";
            break;
          case 503:
            s = "Service Unavailable: The server is currently unable to handle the request.";
            break;
          case 504:
            s = "Gateway Timeout: The server did not receive a timely response from the upstream server.";
            break;
          default:
            s = `Unexpected status code: ${a.status}`;
        }
        throw Pn("Error message based on status code:", s), Pn("Response details:", o.details), new Error(JSON.stringify(o.details));
      }
      return yr("Fetch completed successfully with response:", o), o;
    } catch (n) {
      throw Pn("Fetch error:", n), n;
    }
  }
  async sendMessageToChannel(e, r = "worker-channel") {
    return new Promise((n) => {
      const i = new BroadcastChannel(r);
      i.onmessage = (a) => {
        a.data.operation === `${e.operation}` && (i.close(), n(a.data));
      }, i.postMessage(e);
    });
  }
}
const Xw = await kr(), fu = new hr(Xw.logging.memoryBackendES6);
function dt(...t) {
  fu.consoleDotLog("[MemoryBackend ES6]", ...t);
}
function Qr(...t) {
  fu.consoleDotError("[MemoryBackend ES6]", ...t);
}
function Yw() {
  return "tab-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
}
dt("Loading memoryBackend module");
class Tc {
  constructor(e = {}, r = "default") {
    this.dbName = r, this.options = e, this.deviceId = e.deviceId || Yw(), this._files = /* @__PURE__ */ new Map(), this.versionVector = { [this.deviceId]: 0 }, this.swUtilsInstance = new uu(), this.channel = null, this.isProcessing = !1, this.pendingUpdates = [], this.processingQueue = !1, this._initializeRoot(), this.options?.supportsServiceWorker && this.options?.useSW && this._setupReceiveChannel(), Promise.resolve().then(() => this._requestInitialSync()), dt(`Initialized with dbName: ${this.dbName}, deviceId: ${this.deviceId}`);
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
    let r = !1;
    for (const n in e) {
      const i = this.versionVector[n] || 0;
      e[n] > i && (r = !0);
    }
    return r;
  }
  _mergeVersionVector(e) {
    for (const r in e)
      (!this.versionVector[r] || e[r] > this.versionVector[r]) && (this.versionVector[r] = e[r]);
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
      }), e.close(), dt("Initial sync request sent");
    } catch (e) {
      Qr("Failed to send initial sync request:", e);
    }
  }
  async getFiles() {
    return new Map(
      Array.from(this._files.entries()).map(([r, n]) => [r, { ...n }])
    );
  }
  async sendFilesToSW(e = null) {
    const r = {
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
      dt("Queueing update due to ongoing processing"), this.pendingUpdates.push(r);
      return;
    }
    try {
      this.isProcessing = !0, dt("Sending files to SW:", r);
      const n = new BroadcastChannel(`memory-backend-${this.dbName}`);
      n.postMessage(r), n.close(), dt("Files sent to SW successfully"), await this._processPendingUpdates();
    } catch (n) {
      Qr("Failed to send files to SW:", n);
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
          dt("Processing queued update:", e);
          const r = new BroadcastChannel(`memory-backend-${this.dbName}`);
          r.postMessage(e), r.close();
        }
      } catch (e) {
        Qr("Error processing queued updates:", e);
      } finally {
        this.processingQueue = !1;
      }
    }
  }
  _setupReceiveChannel() {
    try {
      const e = new BroadcastChannel(`memory-backend-${this.dbName}`);
      dt("Listening for updates on:", e.name), this.channel = e, this.channel.onmessage = async (r) => {
        Promise.resolve().then(() => this._handleChannelMessage(r));
      }, this._requestInitialSync();
    } catch (e) {
      Qr("BroadcastChannel init failed:", e);
    }
  }
  async _handleChannelMessage(e) {
    const { operation: r, data: n } = e.data || {};
    if (!n?.dbName || n.dbName !== this.dbName) return;
    if (r === "memorySyncRequest") {
      this._isNewerVersionVector(n.requesterVV) ? (dt("Responding to sync request with newer data"), Promise.resolve().then(() => this.sendFilesToSW(n.requesterId))) : dt("No newer data to send to requester");
      return;
    }
    if (r !== "memorySync") return;
    const i = n.versionVector;
    if (n.sender === this.deviceId) {
      dt("Skipping own update");
      return;
    }
    if (n.targetId && n.targetId !== this.deviceId) {
      dt("Message not meant for this tab. Ignoring.");
      return;
    }
    if (!this._isNewerVersionVector(i)) {
      dt("Skipping received update - not newer than current", this.versionVector, i);
      return;
    }
    try {
      dt("Applying update from channel:", n), this._files = new Map(n.files), this._mergeVersionVector(i), dt("Memory updated from channel successfully");
    } catch (o) {
      Qr("Failed to apply channel message:", o);
    }
  }
  async wipe() {
    dt(`Wiping db: ${this.dbName}`), this._files.clear(), this._initializeRoot(), this.versionVector = { [this.deviceId]: 0 }, await this._handleFilesChange();
  }
  async _handleFilesChange() {
    this._incrementVersionVector(), this.options?.supportsServiceWorker && this.options?.useSW && await this.sendFilesToSW();
  }
  async readFile(e, r = {}) {
    if (dt("this.files", this._files), !this._files.has(e))
      throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
    const n = this._files.get(e);
    if (n.type !== "file")
      throw Object.assign(new Error("EISDIR"), { code: "EISDIR" });
    return r.encoding === "utf8" ? new TextDecoder().decode(n.data) : n.data;
  }
  async writeFile(e, r, n = {}) {
    const i = typeof r == "string" ? new TextEncoder().encode(r) : r || new Uint8Array();
    this._files.set(e, {
      type: "file",
      mode: n.mode || 438,
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
    const n = /* @__PURE__ */ new Set(), i = e === "/" ? "/" : `${e}/`;
    for (const a of this._files.keys())
      if (a.startsWith(i) && a !== e) {
        const o = a.slice(i.length).split("/")[0];
        n.add(o);
      }
    return [...n];
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
    const r = this._getParentDir(e);
    if (r !== "/" && !this._files.has(r))
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
    const r = e === "/" ? "/" : e.replace(/\/+$/, "");
    if (!this._files.has(r))
      throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
    if (this._files.get(r).type !== "dir")
      throw Object.assign(new Error("ENOTDIR"), { code: "ENOTDIR" });
    for (const i of this._files.keys())
      if (i.startsWith(`${r}/`))
        throw Object.assign(new Error("ENOTEMPTY"), { code: "ENOTEMPTY" });
    this._files.delete(r), await this._handleFilesChange();
  }
  _getParentDir(e) {
    const r = e.lastIndexOf("/");
    return r <= 0 ? "/" : e.slice(0, r);
  }
  _getBaseName(e) {
    return e.slice(e.lastIndexOf("/") + 1);
  }
  async saveSuperblock() {
  }
  async loadSuperblock() {
  }
}
var Na, $c;
function Kw() {
  if ($c) return Na;
  $c = 1, Na = t;
  function t(e) {
    var r, n;
    if (typeof e != "function")
      throw new Error("expected a function but got " + e);
    return function() {
      return r || (r = !0, n = e.apply(this, arguments)), n;
    };
  }
  return Na;
}
var Ma = {}, Bc;
function Jw() {
  return Bc || (Bc = 1, function(t) {
    function e(S, A) {
      var B;
      return S instanceof he ? B = S : B = he.from(S.buffer, S.byteOffset, S.byteLength), B.toString(A);
    }
    var r = function(S) {
      return he.from(S);
    };
    function n(S) {
      for (var A = 0, B = Math.min(256 * 256, S.length + 1), N = new Uint16Array(B), U = [], M = 0; ; ) {
        var $ = A < S.length;
        if (!$ || M >= B - 1) {
          var O = N.subarray(0, M), W = O;
          if (U.push(String.fromCharCode.apply(null, W)), !$) return U.join("");
          S = S.subarray(A), A = 0, M = 0;
        }
        var z = S[A++];
        if ((z & 128) === 0) N[M++] = z;
        else if ((z & 224) === 192) {
          var K = S[A++] & 63;
          N[M++] = (z & 31) << 6 | K;
        } else if ((z & 240) === 224) {
          var K = S[A++] & 63, F = S[A++] & 63;
          N[M++] = (z & 31) << 12 | K << 6 | F;
        } else if ((z & 248) === 240) {
          var K = S[A++] & 63, F = S[A++] & 63, Q = S[A++] & 63, se = (z & 7) << 18 | K << 12 | F << 6 | Q;
          se > 65535 && (se -= 65536, N[M++] = se >>> 10 & 1023 | 55296, se = 56320 | se & 1023), N[M++] = se;
        }
      }
    }
    function i(S) {
      for (var A = 0, B = S.length, N = 0, U = Math.max(32, B + (B >>> 1) + 7), M = new Uint8Array(U >>> 3 << 3); A < B; ) {
        var $ = S.charCodeAt(A++);
        if ($ >= 55296 && $ <= 56319) {
          if (A < B) {
            var O = S.charCodeAt(A);
            (O & 64512) === 56320 && (++A, $ = (($ & 1023) << 10) + (O & 1023) + 65536);
          }
          if ($ >= 55296 && $ <= 56319) continue;
        }
        if (N + 4 > M.length) {
          U += 8, U *= 1 + A / S.length * 2, U = U >>> 3 << 3;
          var W = new Uint8Array(U);
          W.set(M), M = W;
        }
        if (($ & 4294967168) === 0) {
          M[N++] = $;
          continue;
        } else if (($ & 4294965248) === 0) M[N++] = $ >>> 6 & 31 | 192;
        else if (($ & 4294901760) === 0) M[N++] = $ >>> 12 & 15 | 224, M[N++] = $ >>> 6 & 63 | 128;
        else if (($ & 4292870144) === 0) M[N++] = $ >>> 18 & 7 | 240, M[N++] = $ >>> 12 & 63 | 128, M[N++] = $ >>> 6 & 63 | 128;
        else continue;
        M[N++] = $ & 63 | 128;
      }
      return M.slice ? M.slice(0, N) : M.subarray(0, N);
    }
    var a = "Failed to ", o = function(S, A, B) {
      if (S) throw new Error("".concat(a).concat(A, ": the '").concat(B, "' option is unsupported."));
    }, s = typeof he == "function" && he.from, c = s ? r : i;
    function f() {
      this.encoding = "utf-8";
    }
    f.prototype.encode = function(S, A) {
      return o(A && A.stream, "encode", "stream"), c(S);
    };
    function l(S) {
      var A;
      try {
        var B = new Blob([S], { type: "text/plain;charset=UTF-8" });
        A = URL.createObjectURL(B);
        var N = new XMLHttpRequest();
        return N.open("GET", A, !1), N.send(), N.responseText;
      } finally {
        A && URL.revokeObjectURL(A);
      }
    }
    var w = !s && typeof Blob == "function" && typeof URL == "function" && typeof URL.createObjectURL == "function", m = ["utf-8", "utf8", "unicode-1-1-utf-8"], g = n;
    s ? g = e : w && (g = function(S) {
      try {
        return l(S);
      } catch {
        return n(S);
      }
    });
    var b = "construct 'TextDecoder'", T = "".concat(a, " ").concat(b, ": the ");
    function R(S, A) {
      o(A && A.fatal, b, "fatal"), S = S || "utf-8";
      var B;
      if (s ? B = he.isEncoding(S) : B = m.indexOf(S.toLowerCase()) !== -1, !B) throw new RangeError("".concat(T, " encoding label provided ('").concat(S, "') is invalid."));
      this.encoding = S, this.fatal = !1, this.ignoreBOM = !1;
    }
    R.prototype.decode = function(S, A) {
      o(A && A.stream, "decode", "stream");
      var B;
      return S instanceof Uint8Array ? B = S : S.buffer instanceof ArrayBuffer ? B = new Uint8Array(S.buffer) : B = new Uint8Array(S), g(B, this.encoding);
    }, t.TextEncoder = t.TextEncoder || f, t.TextDecoder = t.TextDecoder || R;
  }(typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : Ma)), Ma;
}
var Ua, Dc;
function Qw() {
  return Dc || (Dc = 1, Jw(), Ua = {
    encode: (t) => new TextEncoder().encode(t),
    decode: (t) => new TextDecoder().decode(t)
  }), Ua;
}
var ja, Oc;
function em() {
  if (Oc) return ja;
  Oc = 1, ja = t;
  function t(e, r, n) {
    var i;
    return function() {
      if (!r)
        return e.apply(this, arguments);
      var a = this, o = arguments, s = n && !i;
      if (clearTimeout(i), i = setTimeout(function() {
        if (i = null, !s)
          return e.apply(a, o);
      }, r), s)
        return e.apply(this, arguments);
    };
  }
  return ja;
}
var La, Cc;
function Ao() {
  if (Cc) return La;
  Cc = 1;
  function t(s) {
    if (s.length === 0)
      return ".";
    let c = n(s);
    return c = c.reduce(o, []), r(...c);
  }
  function e(...s) {
    let c = "";
    for (let f of s)
      f.startsWith("/") ? c = f : c = t(r(c, f));
    return c;
  }
  function r(...s) {
    if (s.length === 0) return "";
    let c = s.join("/");
    return c = c.replace(/\/{2,}/g, "/"), c;
  }
  function n(s) {
    if (s.length === 0) return [];
    if (s === "/") return ["/"];
    let c = s.split("/");
    return c[c.length - 1] === "" && c.pop(), s[0] === "/" ? c[0] = "/" : c[0] !== "." && c.unshift("."), c;
  }
  function i(s) {
    const c = s.lastIndexOf("/");
    if (c === -1) throw new Error(`Cannot get dirname of "${s}"`);
    return c === 0 ? "/" : s.slice(0, c);
  }
  function a(s) {
    if (s === "/") throw new Error(`Cannot get basename of "${s}"`);
    const c = s.lastIndexOf("/");
    return c === -1 ? s : s.slice(c + 1);
  }
  function o(s, c) {
    if (s.length === 0)
      return s.push(c), s;
    if (c === ".") return s;
    if (c === "..") {
      if (s.length === 1) {
        if (s[0] === "/")
          throw new Error("Unable to normalize path - traverses above root directory");
        if (s[0] === ".")
          return s.push(c), s;
      }
      return s[s.length - 1] === ".." ? (s.push(".."), s) : (s.pop(), s);
    }
    return s.push(c), s;
  }
  return La = {
    join: r,
    normalize: t,
    split: n,
    basename: a,
    dirname: i,
    resolve: e
  }, La;
}
var za, Fc;
function hu() {
  if (Fc) return za;
  Fc = 1;
  function t(o) {
    return class extends Error {
      constructor(...s) {
        super(...s), this.code = o, this.message ? this.message = o + ": " + this.message : this.message = o;
      }
    };
  }
  const e = t("EEXIST"), r = t("ENOENT"), n = t("ENOTDIR"), i = t("ENOTEMPTY"), a = t("ETIMEDOUT");
  return za = { EEXIST: e, ENOENT: r, ENOTDIR: n, ENOTEMPTY: i, ETIMEDOUT: a }, za;
}
var qa, Pc;
function tm() {
  if (Pc) return qa;
  Pc = 1;
  const t = Ao(), { EEXIST: e, ENOENT: r, ENOTDIR: n, ENOTEMPTY: i } = hu(), a = 0;
  return qa = class {
    constructor() {
    }
    _makeRoot(s = /* @__PURE__ */ new Map()) {
      return s.set(a, { mode: 511, type: "dir", size: 0, ino: 0, mtimeMs: Date.now() }), s;
    }
    activate(s = null) {
      s === null ? this._root = /* @__PURE__ */ new Map([["/", this._makeRoot()]]) : typeof s == "string" ? this._root = /* @__PURE__ */ new Map([["/", this._makeRoot(this.parse(s))]]) : this._root = s;
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
    _countInodes(s) {
      let c = 1;
      for (let [f, l] of s)
        f !== a && (c += this._countInodes(l));
      return c;
    }
    autoinc() {
      return this._maxInode(this._root.get("/")) + 1;
    }
    _maxInode(s) {
      let c = s.get(a).ino;
      for (let [f, l] of s)
        f !== a && (c = Math.max(c, this._maxInode(l)));
      return c;
    }
    print(s = this._root.get("/")) {
      let c = "";
      const f = (l, w) => {
        for (let [m, g] of l) {
          if (m === 0) continue;
          let b = g.get(a), T = b.mode.toString(8);
          c += `${"	".repeat(w)}${m}	${T}`, b.type === "file" ? c += `	${b.size}	${b.mtimeMs}
` : (c += `
`, f(g, w + 1));
        }
      };
      return f(s, 0), c;
    }
    parse(s) {
      let c = 0;
      function f(g) {
        const b = ++c, T = g.length === 1 ? "dir" : "file";
        let [R, S, A] = g;
        return R = parseInt(R, 8), S = S ? parseInt(S) : 0, A = A ? parseInt(A) : Date.now(), /* @__PURE__ */ new Map([[a, { mode: R, type: T, size: S, mtimeMs: A, ino: b }]]);
      }
      let l = s.trim().split(`
`), w = this._makeRoot(), m = [
        { indent: -1, node: w },
        { indent: 0, node: null }
      ];
      for (let g of l) {
        let T = g.match(/^\t*/)[0].length;
        g = g.slice(T);
        let [R, ...S] = g.split("	"), A = f(S);
        if (T <= m[m.length - 1].indent)
          for (; T <= m[m.length - 1].indent; )
            m.pop();
        m.push({ indent: T, node: A }), m[m.length - 2].node.set(R, A);
      }
      return w;
    }
    _lookup(s, c = !0) {
      let f = this._root, l = "/", w = t.split(s);
      for (let m = 0; m < w.length; ++m) {
        let g = w[m];
        if (f = f.get(g), !f) throw new r(s);
        if (c || m < w.length - 1) {
          const b = f.get(a);
          if (b.type === "symlink") {
            let T = t.resolve(l, b.target);
            f = this._lookup(T);
          }
          l ? l = t.join(l, g) : l = g;
        }
      }
      return f;
    }
    mkdir(s, { mode: c }) {
      if (s === "/") throw new e();
      let f = this._lookup(t.dirname(s)), l = t.basename(s);
      if (f.has(l))
        throw new e();
      let w = /* @__PURE__ */ new Map(), m = {
        mode: c,
        type: "dir",
        size: 0,
        mtimeMs: Date.now(),
        ino: this.autoinc()
      };
      w.set(a, m), f.set(l, w);
    }
    rmdir(s) {
      let c = this._lookup(s);
      if (c.get(a).type !== "dir") throw new n();
      if (c.size > 1) throw new i();
      let f = this._lookup(t.dirname(s)), l = t.basename(s);
      f.delete(l);
    }
    readdir(s) {
      let c = this._lookup(s);
      if (c.get(a).type !== "dir") throw new n();
      return [...c.keys()].filter((f) => typeof f == "string");
    }
    writeStat(s, c, { mode: f }) {
      let l;
      try {
        let T = this.stat(s);
        f == null && (f = T.mode), l = T.ino;
      } catch {
      }
      f == null && (f = 438), l == null && (l = this.autoinc());
      let w = this._lookup(t.dirname(s)), m = t.basename(s), g = {
        mode: f,
        type: "file",
        size: c,
        mtimeMs: Date.now(),
        ino: l
      }, b = /* @__PURE__ */ new Map();
      return b.set(a, g), w.set(m, b), g;
    }
    unlink(s) {
      let c = this._lookup(t.dirname(s)), f = t.basename(s);
      c.delete(f);
    }
    rename(s, c) {
      let f = t.basename(c), l = this._lookup(s);
      this._lookup(t.dirname(c)).set(f, l), this.unlink(s);
    }
    stat(s) {
      return this._lookup(s).get(a);
    }
    lstat(s) {
      return this._lookup(s, !1).get(a);
    }
    readlink(s) {
      return this._lookup(s, !1).get(a).target;
    }
    symlink(s, c) {
      let f, l;
      try {
        let T = this.stat(c);
        l === null && (l = T.mode), f = T.ino;
      } catch {
      }
      l == null && (l = 40960), f == null && (f = this.autoinc());
      let w = this._lookup(t.dirname(c)), m = t.basename(c), g = {
        mode: l,
        type: "symlink",
        target: s,
        size: 0,
        mtimeMs: Date.now(),
        ino: f
      }, b = /* @__PURE__ */ new Map();
      return b.set(a, g), w.set(m, b), g;
    }
    _du(s) {
      let c = 0;
      for (const [f, l] of s.entries())
        f === a ? c += l.size : c += this._du(l);
      return c;
    }
    du(s) {
      let c = this._lookup(s);
      return this._du(c);
    }
  }, qa;
}
class du {
  constructor(e = "keyval-store", r = "keyval") {
    this.storeName = r, this._dbName = e, this._storeName = r, this._init();
  }
  _init() {
    this._dbp || (this._dbp = new Promise((e, r) => {
      const n = indexedDB.open(this._dbName);
      n.onerror = () => r(n.error), n.onsuccess = () => e(n.result), n.onupgradeneeded = () => {
        n.result.createObjectStore(this._storeName);
      };
    }));
  }
  _withIDBStore(e, r) {
    return this._init(), this._dbp.then((n) => new Promise((i, a) => {
      const o = n.transaction(this.storeName, e);
      o.oncomplete = () => i(), o.onabort = o.onerror = () => a(o.error), r(o.objectStore(this.storeName));
    }));
  }
  _close() {
    return this._init(), this._dbp.then((e) => {
      e.close(), this._dbp = void 0;
    });
  }
}
let Wa;
function xr() {
  return Wa || (Wa = new du()), Wa;
}
function rm(t, e = xr()) {
  let r;
  return e._withIDBStore("readwrite", (n) => {
    r = n.get(t);
  }).then(() => r.result);
}
function nm(t, e, r = xr()) {
  return r._withIDBStore("readwrite", (n) => {
    n.put(e, t);
  });
}
function im(t, e, r = xr()) {
  return r._withIDBStore("readwrite", (n) => {
    const i = n.get(t);
    i.onsuccess = () => {
      n.put(e(i.result), t);
    };
  });
}
function am(t, e = xr()) {
  return e._withIDBStore("readwrite", (r) => {
    r.delete(t);
  });
}
function om(t = xr()) {
  return t._withIDBStore("readwrite", (e) => {
    e.clear();
  });
}
function sm(t = xr()) {
  const e = [];
  return t._withIDBStore("readwrite", (r) => {
    (r.openKeyCursor || r.openCursor).call(r).onsuccess = function() {
      this.result && (e.push(this.result.key), this.result.continue());
    };
  }).then(() => e);
}
function cm(t = xr()) {
  return t._close();
}
var lm = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Store: du,
  clear: om,
  close: cm,
  del: am,
  get: rm,
  keys: sm,
  set: nm,
  update: im
}), pu = /* @__PURE__ */ gf(lm), Ha, Nc;
function um() {
  if (Nc) return Ha;
  Nc = 1;
  const t = pu;
  return Ha = class {
    constructor(r, n) {
      this._database = r, this._storename = n, this._store = new t.Store(this._database, this._storename);
    }
    saveSuperblock(r) {
      return t.set("!root", r, this._store);
    }
    loadSuperblock() {
      return t.get("!root", this._store);
    }
    readFile(r) {
      return t.get(r, this._store);
    }
    writeFile(r, n) {
      return t.set(r, n, this._store);
    }
    unlink(r) {
      return t.del(r, this._store);
    }
    wipe() {
      return t.clear(this._store);
    }
    close() {
      return t.close(this._store);
    }
  }, Ha;
}
var Ga, Mc;
function fm() {
  return Mc || (Mc = 1, Ga = class {
    constructor(e) {
      this._url = e;
    }
    loadSuperblock() {
      return fetch(this._url + "/.superblock.txt").then((e) => e.ok ? e.text() : null);
    }
    async readFile(e) {
      const r = await fetch(this._url + e);
      if (r.status === 200)
        return r.arrayBuffer();
      throw new Error("ENOENT");
    }
    async sizeFile(e) {
      const r = await fetch(this._url + e, { method: "HEAD" });
      if (r.status === 200)
        return r.headers.get("content-length");
      throw new Error("ENOENT");
    }
  }), Ga;
}
var Za, Uc;
function hm() {
  if (Uc) return Za;
  Uc = 1;
  const t = pu, e = (r) => new Promise((n) => setTimeout(n, r));
  return Za = class {
    constructor(n, i) {
      this._id = Math.random(), this._database = n, this._storename = i, this._store = new t.Store(this._database, this._storename), this._lock = null;
    }
    async has({ margin: n = 2e3 } = {}) {
      if (this._lock && this._lock.holder === this._id) {
        const i = Date.now();
        return this._lock.expires > i + n ? !0 : await this.renew();
      } else
        return !1;
    }
    // Returns true if successful
    async renew({ ttl: n = 5e3 } = {}) {
      let i;
      return await t.update("lock", (a) => {
        const s = Date.now() + n;
        return i = a && a.holder === this._id, this._lock = i ? { holder: this._id, expires: s } : a, this._lock;
      }, this._store), i;
    }
    // Returns true if successful
    async acquire({ ttl: n = 5e3 } = {}) {
      let i, a, o;
      if (await t.update("lock", (s) => {
        const c = Date.now(), f = c + n;
        return a = s && s.expires < c, i = s === void 0 || a, o = s && s.holder === this._id, this._lock = i ? { holder: this._id, expires: f } : s, this._lock;
      }, this._store), o)
        throw new Error("Mutex double-locked");
      return i;
    }
    // check at 10Hz, give up after 10 minutes
    async wait({ interval: n = 100, limit: i = 6e3, ttl: a } = {}) {
      for (; i--; ) {
        if (await this.acquire({ ttl: a })) return !0;
        await e(n);
      }
      throw new Error("Mutex timeout");
    }
    // Returns true if successful
    async release({ force: n = !1 } = {}) {
      let i, a, o;
      if (await t.update("lock", (s) => (i = n || s && s.holder === this._id, a = s === void 0, o = s && s.holder !== this._id, this._lock = i ? void 0 : s, this._lock), this._store), await t.close(this._store), !i && !n) {
        if (a) throw new Error("Mutex double-freed");
        if (o) throw new Error("Mutex lost ownership");
      }
      return i;
    }
  }, Za;
}
var Va, jc;
function dm() {
  return jc || (jc = 1, Va = class {
    constructor(e) {
      this._id = Math.random(), this._database = e, this._has = !1, this._release = null;
    }
    async has() {
      return this._has;
    }
    // Returns true if successful
    async acquire() {
      return new Promise((e) => {
        navigator.locks.request(this._database + "_lock", { ifAvailable: !0 }, (r) => (this._has = !!r, e(!!r), new Promise((n) => {
          this._release = n;
        })));
      });
    }
    // Returns true if successful, gives up after 10 minutes
    async wait({ timeout: e = 6e5 } = {}) {
      return new Promise((r, n) => {
        const i = new AbortController();
        setTimeout(() => {
          i.abort(), n(new Error("Mutex timeout"));
        }, e), navigator.locks.request(this._database + "_lock", { signal: i.signal }, (a) => (this._has = !!a, r(!!a), new Promise((o) => {
          this._release = o;
        })));
      });
    }
    // Returns true if successful
    async release({ force: e = !1 } = {}) {
      this._has = !1, this._release ? this._release() : e && navigator.locks.request(this._database + "_lock", { steal: !0 }, (r) => !0);
    }
  }), Va;
}
var Xa, Lc;
function pm() {
  if (Lc) return Xa;
  Lc = 1;
  const { encode: t, decode: e } = Qw(), r = em(), n = tm(), { ENOENT: i, ENOTEMPTY: a, ETIMEDOUT: o } = hu(), s = um(), c = fm(), f = hm(), l = dm(), w = Ao();
  return Xa = class {
    constructor() {
      this.saveSuperblock = r(() => {
        this.flush();
      }, 500);
    }
    async init(g, {
      wipe: b,
      url: T,
      urlauto: R,
      fileDbName: S = g,
      db: A = null,
      fileStoreName: B = g + "_files",
      lockDbName: N = g + "_lock",
      lockStoreName: U = g + "_lock"
    } = {}) {
      this._name = g, this._idb = A || new s(S, B), this._mutex = navigator.locks ? new l(g) : new f(N, U), this._cache = new n(g), this._opts = { wipe: b, url: T }, this._needsWipe = !!b, T && (this._http = new c(T), this._urlauto = !!R);
    }
    async activate() {
      if (this._cache.activated) return;
      this._needsWipe && (this._needsWipe = !1, await this._idb.wipe(), await this._mutex.release({ force: !0 })), await this._mutex.has() || await this._mutex.wait();
      const g = await this._idb.loadSuperblock();
      if (g)
        this._cache.activate(g);
      else if (this._http) {
        const b = await this._http.loadSuperblock();
        this._cache.activate(b), await this._saveSuperblock();
      } else
        this._cache.activate();
      if (!await this._mutex.has())
        throw new o();
    }
    async deactivate() {
      await this._mutex.has() && await this._saveSuperblock(), this._cache.deactivate();
      try {
        await this._mutex.release();
      } catch (g) {
        console.log(g);
      }
      await this._idb.close();
    }
    async _saveSuperblock() {
      this._cache.activated && (this._lastSavedAt = Date.now(), await this._idb.saveSuperblock(this._cache._root));
    }
    _writeStat(g, b, T) {
      let R = w.split(w.dirname(g)), S = R.shift();
      for (let A of R) {
        S = w.join(S, A);
        try {
          this._cache.mkdir(S, { mode: 511 });
        } catch {
        }
      }
      return this._cache.writeStat(g, b, T);
    }
    async readFile(g, b) {
      const { encoding: T } = b;
      if (T && T !== "utf8") throw new Error('Only "utf8" encoding is supported in readFile');
      let R = null, S = null;
      try {
        S = this._cache.stat(g), R = await this._idb.readFile(S.ino);
      } catch (A) {
        if (!this._urlauto) throw A;
      }
      if (!R && this._http) {
        let A = this._cache.lstat(g);
        for (; A.type === "symlink"; )
          g = w.resolve(w.dirname(g), A.target), A = this._cache.lstat(g);
        R = await this._http.readFile(g);
      }
      if (R && ((!S || S.size != R.byteLength) && (S = await this._writeStat(g, R.byteLength, { mode: S ? S.mode : 438 }), this.saveSuperblock()), T === "utf8" ? R = e(R) : R.toString = () => e(R)), !S) throw new i(g);
      return R;
    }
    async writeFile(g, b, T) {
      const { mode: R, encoding: S = "utf8" } = T;
      if (typeof b == "string") {
        if (S !== "utf8")
          throw new Error('Only "utf8" encoding is supported in writeFile');
        b = t(b);
      }
      const A = await this._cache.writeStat(g, b.byteLength, { mode: R });
      await this._idb.writeFile(A.ino, b);
    }
    async unlink(g, b) {
      const T = this._cache.lstat(g);
      this._cache.unlink(g), T.type !== "symlink" && await this._idb.unlink(T.ino);
    }
    readdir(g, b) {
      return this._cache.readdir(g);
    }
    mkdir(g, b) {
      const { mode: T = 511 } = b;
      this._cache.mkdir(g, { mode: T });
    }
    rmdir(g, b) {
      if (g === "/")
        throw new a();
      this._cache.rmdir(g);
    }
    rename(g, b) {
      this._cache.rename(g, b);
    }
    stat(g, b) {
      return this._cache.stat(g);
    }
    lstat(g, b) {
      return this._cache.lstat(g);
    }
    readlink(g, b) {
      return this._cache.readlink(g);
    }
    symlink(g, b) {
      this._cache.symlink(g, b);
    }
    async backFile(g, b) {
      let T = await this._http.sizeFile(g);
      await this._writeStat(g, T, b);
    }
    du(g) {
      return this._cache.du(g);
    }
    flush() {
      return this._saveSuperblock();
    }
  }, Xa;
}
var Ya, zc;
function wm() {
  return zc || (zc = 1, Ya = class {
    constructor(e) {
      this.type = e.type, this.mode = e.mode, this.size = e.size, this.ino = e.ino, this.mtimeMs = e.mtimeMs, this.ctimeMs = e.ctimeMs || e.mtimeMs, this.uid = 1, this.gid = 1, this.dev = 1;
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
  }), Ya;
}
var Ka, qc;
function mm() {
  if (qc) return Ka;
  qc = 1;
  const t = pm(), e = wm(), r = Ao();
  function n(o, s, ...c) {
    return o = r.normalize(o), (typeof s > "u" || typeof s == "function") && (s = {}), typeof s == "string" && (s = {
      encoding: s
    }), [o, s, ...c];
  }
  function i(o, s, c, ...f) {
    return o = r.normalize(o), (typeof c > "u" || typeof c == "function") && (c = {}), typeof c == "string" && (c = {
      encoding: c
    }), [o, s, c, ...f];
  }
  function a(o, s, ...c) {
    return [r.normalize(o), r.normalize(s), ...c];
  }
  return Ka = class {
    constructor(s, c = {}) {
      this.init = this.init.bind(this), this.readFile = this._wrap(this.readFile, n, !1), this.writeFile = this._wrap(this.writeFile, i, !0), this.unlink = this._wrap(this.unlink, n, !0), this.readdir = this._wrap(this.readdir, n, !1), this.mkdir = this._wrap(this.mkdir, n, !0), this.rmdir = this._wrap(this.rmdir, n, !0), this.rename = this._wrap(this.rename, a, !0), this.stat = this._wrap(this.stat, n, !1), this.lstat = this._wrap(this.lstat, n, !1), this.readlink = this._wrap(this.readlink, n, !1), this.symlink = this._wrap(this.symlink, a, !0), this.backFile = this._wrap(this.backFile, n, !0), this.du = this._wrap(this.du, n, !1), this._deactivationPromise = null, this._deactivationTimeout = null, this._activationPromise = null, this._operations = /* @__PURE__ */ new Set(), s && this.init(s, c);
    }
    async init(...s) {
      return this._initPromiseResolve && await this._initPromise, this._initPromise = this._init(...s), this._initPromise;
    }
    async _init(s, c = {}) {
      await this._gracefulShutdown(), this._activationPromise && await this._deactivate(), this._backend && this._backend.destroy && await this._backend.destroy(), this._backend = c.backend || new t(), this._backend.init && await this._backend.init(s, c), this._initPromiseResolve && (this._initPromiseResolve(), this._initPromiseResolve = null), c.defer || this.stat("/");
    }
    async _gracefulShutdown() {
      this._operations.size > 0 && (this._isShuttingDown = !0, await new Promise((s) => this._gracefulShutdownResolve = s), this._isShuttingDown = !1, this._gracefulShutdownResolve = null);
    }
    _wrap(s, c, f) {
      return async (...l) => {
        l = c(...l);
        let w = {
          name: s.name,
          args: l
        };
        this._operations.add(w);
        try {
          return await this._activate(), await s.apply(this, l);
        } finally {
          this._operations.delete(w), f && this._backend.saveSuperblock(), this._operations.size === 0 && (this._deactivationTimeout || clearTimeout(this._deactivationTimeout), this._deactivationTimeout = setTimeout(this._deactivate.bind(this), 500));
        }
      };
    }
    async _activate() {
      this._initPromise || console.warn(new Error(`Attempted to use LightningFS ${this._name} before it was initialized.`)), await this._initPromise, this._deactivationTimeout && (clearTimeout(this._deactivationTimeout), this._deactivationTimeout = null), this._deactivationPromise && await this._deactivationPromise, this._deactivationPromise = null, this._activationPromise || (this._activationPromise = this._backend.activate ? this._backend.activate() : Promise.resolve()), await this._activationPromise;
    }
    async _deactivate() {
      return this._activationPromise && await this._activationPromise, this._deactivationPromise || (this._deactivationPromise = this._backend.deactivate ? this._backend.deactivate() : Promise.resolve()), this._activationPromise = null, this._gracefulShutdownResolve && this._gracefulShutdownResolve(), this._deactivationPromise;
    }
    async readFile(s, c) {
      return this._backend.readFile(s, c);
    }
    async writeFile(s, c, f) {
      return await this._backend.writeFile(s, c, f), null;
    }
    async unlink(s, c) {
      return await this._backend.unlink(s, c), null;
    }
    async readdir(s, c) {
      return this._backend.readdir(s, c);
    }
    async mkdir(s, c) {
      return await this._backend.mkdir(s, c), null;
    }
    async rmdir(s, c) {
      return await this._backend.rmdir(s, c), null;
    }
    async rename(s, c) {
      return await this._backend.rename(s, c), null;
    }
    async stat(s, c) {
      const f = await this._backend.stat(s, c);
      return new e(f);
    }
    async lstat(s, c) {
      const f = await this._backend.lstat(s, c);
      return new e(f);
    }
    async readlink(s, c) {
      return this._backend.readlink(s, c);
    }
    async symlink(s, c) {
      return await this._backend.symlink(s, c), null;
    }
    async backFile(s, c) {
      return await this._backend.backFile(s, c), null;
    }
    async du(s) {
      return this._backend.du(s);
    }
    async flush() {
      return this._backend.flush();
    }
  }, Ka;
}
var Ja, Wc;
function ym() {
  if (Wc) return Ja;
  Wc = 1;
  const t = Kw(), e = mm();
  function r(n, i) {
    return typeof n == "function" && (i = n), i = t(i), [(...o) => i(null, ...o), i];
  }
  return Ja = class {
    constructor(...i) {
      this.promises = new e(...i), this.init = this.init.bind(this), this.readFile = this.readFile.bind(this), this.writeFile = this.writeFile.bind(this), this.unlink = this.unlink.bind(this), this.readdir = this.readdir.bind(this), this.mkdir = this.mkdir.bind(this), this.rmdir = this.rmdir.bind(this), this.rename = this.rename.bind(this), this.stat = this.stat.bind(this), this.lstat = this.lstat.bind(this), this.readlink = this.readlink.bind(this), this.symlink = this.symlink.bind(this), this.backFile = this.backFile.bind(this), this.du = this.du.bind(this), this.flush = this.flush.bind(this);
    }
    init(i, a) {
      return this.promises.init(i, a);
    }
    readFile(i, a, o) {
      const [s, c] = r(a, o);
      this.promises.readFile(i, a).then(s).catch(c);
    }
    writeFile(i, a, o, s) {
      const [c, f] = r(o, s);
      this.promises.writeFile(i, a, o).then(c).catch(f);
    }
    unlink(i, a, o) {
      const [s, c] = r(a, o);
      this.promises.unlink(i, a).then(s).catch(c);
    }
    readdir(i, a, o) {
      const [s, c] = r(a, o);
      this.promises.readdir(i, a).then(s).catch(c);
    }
    mkdir(i, a, o) {
      const [s, c] = r(a, o);
      this.promises.mkdir(i, a).then(s).catch(c);
    }
    rmdir(i, a, o) {
      const [s, c] = r(a, o);
      this.promises.rmdir(i, a).then(s).catch(c);
    }
    rename(i, a, o) {
      const [s, c] = r(o);
      this.promises.rename(i, a).then(s).catch(c);
    }
    stat(i, a, o) {
      const [s, c] = r(a, o);
      this.promises.stat(i).then(s).catch(c);
    }
    lstat(i, a, o) {
      const [s, c] = r(a, o);
      this.promises.lstat(i).then(s).catch(c);
    }
    readlink(i, a, o) {
      const [s, c] = r(a, o);
      this.promises.readlink(i).then(s).catch(c);
    }
    symlink(i, a, o) {
      const [s, c] = r(o);
      this.promises.symlink(i, a).then(s).catch(c);
    }
    backFile(i, a, o) {
      const [s, c] = r(a, o);
      this.promises.backFile(i, a).then(s).catch(c);
    }
    du(i, a) {
      const [o, s] = r(a);
      this.promises.du(i).then(o).catch(s);
    }
    flush(i) {
      const [a, o] = r(i);
      this.promises.flush().then(a).catch(o);
    }
  }, Ja;
}
var gm = ym(), Nn = /* @__PURE__ */ rr(gm);
const vm = await kr(), wu = new hr(vm.logging.fsManagerES6);
function Rt(...t) {
  wu.consoleDotLog("[fsManagerES6] ", ...t);
}
function Qa(...t) {
  wu.consoleDotError("[fsManagerES6] ", ...t);
}
Rt("Loading fsmanagerES6.");
class _m {
  constructor(e = { supportsServiceWorker: !0, useSW: !0 }) {
    this.fsInstances = /* @__PURE__ */ new Map(), this.initializationLocks = /* @__PURE__ */ new Map(), this.debug = !0, this.options = e, this.memoryBackends = /* @__PURE__ */ new Map();
  }
  _log(...e) {
    this.debug && Rt("[fsManager]", ...e);
  }
  _error(...e) {
    Qa("[fsManager]", ...e);
  }
  async initializeFS(e, r) {
    const n = `${e}-${r}`;
    this._log(`Initializing FS: ${n}`);
    try {
      if (Rt("Initializing."), this.fsInstances.has(n))
        return this._log(`FS ${n} already exists`), this.fsInstances.get(n);
      let i;
      if (r === "memory") {
        Rt(`Creating memory FS for ${n}`);
        const a = new Tc(this.options, e);
        Rt(`Memory backend created for ${n} backend: `, a), this.memoryBackends.set(n, a), i = new Nn(e, { backend: a }), Rt(`Memory FS created for ${n}`), this._log(`Created memory FS with backend for ${n}`);
      } else if (r === "idb")
        i = new Nn(e), this._log(`Created IDB FS for ${n}`);
      else
        throw new Error(`Unsupported FS type: ${r}`);
      return this.fsInstances.set(n, i), i;
    } catch (i) {
      throw this._error(`Failed to initialize ${n}:`, i), i;
    }
  }
  async getFS(e, r) {
    const n = `${e}-${r}`;
    if (this._log(`Requesting FS: ${n}`), this.initializationLocks.has(n))
      return this._log(`Waiting for existing initialization of ${n}`), this.initializationLocks.get(n);
    const i = (async () => {
      try {
        return this.fsInstances.has(n) ? { new: !1, fs: this.fsInstances.get(n) } : { new: !0, fs: await this.initializeFS(e, r) };
      } finally {
        this.initializationLocks.delete(n);
      }
    })();
    return this.initializationLocks.set(n, i), i;
  }
  async deleteFS(e, r) {
    const n = `${e}-${r}`;
    this._log(`Deleting FS: ${n}`);
    try {
      if (!this.fsInstances.has(n)) {
        this._log(`File system ${n} does not exist. Nothing to delete.`);
        return;
      }
      const i = this.fsInstances.get(n);
      if (r === "idb")
        try {
          await this.deleteIndexedDB(e), this._log(`IndexedDB file system ${n} deleted successfully.`);
        } catch (a) {
          throw this._error(`Error deleting IndexedDB file system ${n}:`, a), a;
        }
      else if (r === "memory") {
        if (this.memoryBackends.has(n)) {
          const a = this.memoryBackends.get(n);
          if (a && a.close)
            try {
              await a.close(), this._log(`Memory backend for ${n} closed successfully.`);
            } catch (o) {
              this._error(`Error closing memory backend for ${n}:`, o);
            }
          this.memoryBackends.delete(n);
        }
        this._log(`Memory file system ${n} deleted successfully.`);
      } else
        throw new Error(`Unsupported file system type: ${r}`);
      this.fsInstances.delete(n);
    } catch (i) {
      throw this._error(`Failed to delete ${n}:`, i), i;
    }
  }
  // Enhanced createBackupFS method with better memory support
  async createBackupFS(e, r, n = "_replica") {
    const i = `${e}${n}`, a = `${e}-${r}`, o = `${i}-${r}`;
    this._log(`Creating backup of ${a} as ${o}`);
    try {
      const c = (await this.getFS(e, r))?.fs;
      if (r === "memory") {
        const f = this.memoryBackends.get(a);
        if (!f)
          throw new Error("Original memory backend not found");
        const l = new Tc({
          ...this.options,
          deviceId: `${this.options.deviceId || "default"}-${Date.now()}`
        }, i);
        if (f._files instanceof Map)
          for (const [m, g] of f._files)
            l._files.set(m, { ...g });
        else
          throw new Error("Original memory backend files not in expected format");
        const w = new Nn(i, { backend: l });
        this.fsInstances.set(o, w), this.memoryBackends.set(o, l);
      } else if (r === "idb") {
        const f = new Nn(i);
        this.fsInstances.set(o, f), await this._copyIDBContents(c, f, "/");
      } else
        throw new Error(`Unsupported FS type for backup: ${r}`);
      return await this._registerBackupMount(e, i), this._log(`Backup created successfully: ${o}`), this.fsInstances.get(o);
    } catch (s) {
      throw this._error(`Failed to create backup ${o}:`, s), this.fsInstances.has(o) && this.fsInstances.delete(o), this.memoryBackends.has(o) && this.memoryBackends.delete(o), s;
    }
  }
  // Memory-specific methods
  async getMemorySnapshot(e) {
    const r = `${e}-memory`;
    if (!this.memoryBackends.has(r))
      throw new Error(`Memory filesystem ${e} not found`);
    const n = this.memoryBackends.get(r);
    if (!n._files)
      throw new Error("Memory backend files not initialized");
    const i = /* @__PURE__ */ new Map();
    for (const [a, o] of n._files)
      i.set(a, { ...o });
    return i;
  }
  async restoreMemorySnapshot(e, r) {
    const n = `${e}-memory`;
    if (!this.memoryBackends.has(n))
      throw new Error(`Memory filesystem ${e} not found`);
    const i = this.memoryBackends.get(n);
    i._files || i._initializeRoot(), i._files.clear();
    for (const [a, o] of r)
      i._files.set(a, { ...o });
    this._log(`Memory filesystem ${e} restored from snapshot`);
  }
  async getMemoryStats(e) {
    const r = `${e}-memory`;
    if (!this.memoryBackends.has(r))
      throw new Error(`Memory filesystem ${e} not found`);
    const n = this.memoryBackends.get(r);
    if (!n._files)
      return {
        fileCount: 0,
        totalSize: 0,
        paths: []
      };
    let i = 0, a = 0;
    const o = [];
    for (const [s, c] of n._files)
      i++, a += c.data ? c.data.byteLength : 0, o.push(s);
    return {
      fileCount: i,
      totalSize: a,
      paths: o.sort()
    };
  }
  async _copyIDBContents(e, r, n = "/") {
    try {
      const i = n === "/" ? "/" : n.replace(/\/+$/, ""), a = await e.promises.readdir(i);
      for (const o of a) {
        const s = i === "/" ? `/${o}` : `${i}/${o}`, c = s;
        try {
          if ((await e.promises.stat(s)).isDirectory()) {
            try {
              await r.promises.mkdir(c, { recursive: !0 });
            } catch (l) {
              if (l.code !== "EEXIST")
                throw l;
              Rt(`Directory ${c} already exists, continuing`);
            }
            await this._copyIDBContents(e, r, s);
          } else {
            const l = await e.promises.readFile(s);
            await r.promises.writeFile(c, l);
          }
        } catch (f) {
          this._error(`Error processing ${s}:`, f);
          continue;
        }
      }
    } catch (i) {
      throw i.code === "ENOENT" ? this._error(`Source path ${n} does not exist`) : i.code === "EEXIST" ? Rt(`Path ${n} already exists`) : this._error(`Error copying path ${n}:`, i), i;
    }
  }
  async _registerBackupMount(e, r, n = {}) {
    const a = { ...{
      readOnly: !0,
      // Backups are typically read-only
      hidden: !1,
      // Whether to hide from normal listings
      preserveOriginal: !0,
      // Keep original metadata
      mountPath: `/${r}`
      // Customizable mount path
    }, ...n }, { mountPath: o } = a;
    this._log(`Registering backup mount from ${e} to ${o}`);
    try {
      if (typeof this.mounts != "object" && (this.mounts = {}), this.backupRegistry || (this.backupRegistry = /* @__PURE__ */ new Map()), this.mounts[o])
        throw new Error(`Mount path ${o} already in use`);
      const s = this.mounts[`/${e}`] || {};
      return this.mounts[o] = {
        ...a.preserveOriginal ? s : {},
        fsName: r,
        isBackup: !0,
        originalFsName: e,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        lastAccessed: null,
        accessCount: 0,
        metadata: {
          ...s.metadata || {},
          backupType: "full",
          // could be 'incremental' or 'differential'
          backupVersion: 1,
          ...a
        }
      }, this.backupRegistry.set(r, {
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
        backupName: r,
        originalName: e,
        details: this.mounts[o]
      };
    } catch (s) {
      throw this._error("Failed to register backup mount:", s), this.mounts && this.mounts[o] && delete this.mounts[o], this.backupRegistry && this.backupRegistry.has(r) && this.backupRegistry.delete(r), s;
    }
  }
  async deleteIndexedDB(e) {
    return new Promise((r, n) => {
      const i = indexedDB.deleteDatabase(e);
      i.onsuccess = () => {
        Rt(`Deleted database ${e} successfully`), r();
      }, i.onerror = (a) => {
        Qa(`Error deleting database ${e}:`, a), n(a);
      }, i.onblocked = () => {
        console.warn(`Delete database ${e} blocked`);
      };
    });
  }
  async getFileStoreNames(e, r) {
    const n = `${e}-${r}`;
    if (!this.fsInstances.has(n))
      throw new Error(`File system ${n} not found. Call initializeFS first.`);
    if (r === "idb")
      try {
        const i = await this.getFileStoresFromDatabases();
        return Rt(`File store names for ${n}:`, i), i;
      } catch (i) {
        throw Qa(`Error retrieving file store names for ${n}:`, i), i;
      }
    else if (r === "memory") {
      if (this.memoryBackends.has(n)) {
        const i = this.memoryBackends.get(n);
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
      throw new Error(`Unsupported file system type: ${r}`);
  }
  async processDatabaseList(e) {
    const r = [];
    for (const n of e) {
      const i = typeof n == "string" ? n : n.name, o = (await this.openDatabase(i)).objectStoreNames, s = Array.from(o).filter((c) => c.startsWith("fs_")).map((c) => ({ database: i, fileStore: c }));
      r.push(...s);
    }
    return Rt("Processing database list:", r), r;
  }
  async openDatabase(e) {
    return Rt("Opening database:", e), new Promise((r, n) => {
      const i = indexedDB.open(e);
      i.onsuccess = (a) => {
        const o = a.target.result;
        r(o);
      }, i.onerror = (a) => {
        n(`Error opening database ${e}: ${a.target.error}`);
      };
    });
  }
  async getFileStoresFromDatabases() {
    return new Promise((e, r) => {
      const n = indexedDB.webkitGetDatabaseNames ? indexedDB.webkitGetDatabaseNames() : indexedDB.databases ? indexedDB.databases() : null;
      if (!n) {
        r("Your browser does not support retrieving a list of IndexedDB databases");
        return;
      }
      n instanceof Promise ? n.then((i) => {
        this.processDatabaseList(i).then((a) => e(a)).catch((a) => r(a));
      }).catch((i) => r(i)) : (n.onsuccess = async (i) => {
        const a = i.target.result;
        try {
          const o = await this.processDatabaseList(a);
          e(o);
        } catch (o) {
          r(o);
        }
      }, n.onerror = (i) => {
        r(`Error retrieving database list: ${i.target.error}`);
      });
    });
  }
}
var lt = {
  async resolveRef(t, e, r = "HEAD") {
    try {
      return await te.resolveRef({
        fs: t,
        dir: e,
        ref: r
      });
    } catch (n) {
      if (n.message.includes("Could not find HEAD") || n.message.includes("Could not find refs/heads"))
        return console.log("HEAD reference not found, repository may be empty"), null;
      throw console.error("Error resolving ref:", n), n;
    }
  },
  async readCommit(t, e, r) {
    try {
      return r ? await te.readCommit({
        fs: t,
        dir: e,
        oid: r
      }) : (console.log("No OID provided, cannot read commit"), null);
    } catch (n) {
      throw console.error("Error reading commit:", n), n;
    }
  },
  // Check if repository is properly initialized
  async isRepoInitialized(t, e) {
    try {
      await t.readFile(`${e}/.git/HEAD`);
      try {
        return await te.resolveRef({ fs: t, dir: e, ref: "HEAD" }), !0;
      } catch {
        return !1;
      }
    } catch {
      return !1;
    }
  },
  // Safely get the current commit
  async getCurrentCommit(t, e) {
    try {
      const r = await this.resolveRef(t, e, "HEAD");
      return r ? await this.readCommit(t, e, r) : null;
    } catch (r) {
      return console.log("No current commit found:", r.message), null;
    }
  }
};
const bm = await kr(), we = new hr(bm.logging.dotGit), gr = /* @__PURE__ */ new Map();
function gt(...t) {
  we.consoleDotLog("[DotGit] ", ...t);
}
function Em(...t) {
  we.consoleDotError("[DotGit] ", ...t);
}
var Zt = {
  staged: gr,
  async commitStagedChanges(t, e, r = null, n = "System", i = "system@example.com") {
    try {
      if (we.consoleDotLog("staged", gr, e), this.staged.size === 0)
        return we.consoleDotLog("No staged changes to commit"), { committed: !1 };
      let a;
      try {
        a = await te.resolveRef({ fs: t, dir: e, ref: "HEAD" }), we.consoleDotLog(`Parent commit OID: ${a}`);
      } catch {
        we.consoleDotLog("No existing commit, starting fresh repository"), a = null;
      }
      let o = [];
      if (a) {
        const { commit: g } = await te.readCommit({ fs: t, dir: e, oid: a });
        o = (await te.readTree({ fs: t, dir: e, oid: g.tree })).tree;
      }
      const s = async (g, b) => {
        const T = JSON.parse(JSON.stringify(g));
        for (const [R, S] of b) {
          if (!R || typeof R != "string") {
            we.consoleDotError("Invalid file path in staged changes:", R);
            continue;
          }
          const B = R.replace(/^\/+|\/+$/g, "").split("/").filter(($) => $.length > 0);
          if (B.length === 0) {
            we.consoleDotError("Empty path in staged changes");
            continue;
          }
          const N = B.pop();
          let U = T, M = [];
          for (const $ of B) {
            let O = U.find((z) => z.path === $ && z.type === "tree");
            if (!O) {
              const z = await te.writeTree({ fs: t, dir: e, tree: [] });
              O = {
                mode: "040000",
                path: $,
                oid: z,
                type: "tree"
              }, U.push(O);
            }
            const { tree: W } = await te.readTree({ fs: t, dir: e, oid: O.oid });
            O.tree = W, U = W, M.push($);
          }
          try {
            if (S.type === "write" || S.type === "writeDir") {
              const $ = U.findIndex((W) => W.path === N), O = S.type === "writeDir" ? S.treeOid : S.oid;
              if (!O)
                throw new Error(`Missing OID for ${S.type} operation on ${R}`);
              $ >= 0 ? (U[$].oid = O, U[$].type = S.type === "write" ? "blob" : "tree", U[$].mode = S.type === "write" ? "100644" : "040000") : U.push({
                mode: S.type === "write" ? "100644" : "040000",
                path: N,
                oid: O,
                type: S.type === "write" ? "blob" : "tree"
              });
            } else if (S.type === "remove" || S.type === "removeDir") {
              const $ = U.findIndex((O) => O.path === N);
              $ >= 0 && U.splice($, 1);
            }
          } catch ($) {
            throw we.consoleDotError(`Error processing ${S.type} for ${R}:`, $), $;
          }
        }
        return T;
      }, c = Array.from(this.staged.entries()), f = await s(o, c);
      for (const g of f)
        console.log("entry of updated tree, ", g), g.path || console.error("❌ Missing path:", g), g.oid || console.error("❌ Missing oid:", g);
      ((g) => {
        for (const b of g) {
          if (!b.path || typeof b.path != "string")
            throw new Error(`Invalid tree entry: ${JSON.stringify(b)}`);
          if (!b.oid || typeof b.oid != "string")
            throw new Error(`Invalid OID for path ${b.path}`);
        }
      })(f);
      const w = await this._writeFullTree(t, e, f), m = await this.commitChanges(t, e, {
        message: r || `Batch commit ${c.length} staged changes`,
        treeOid: w,
        parentCommitOids: a ? [a] : [],
        name: n,
        email: i,
        actionType: "batch",
        filePath: null
      });
      return this.staged.clear(), {
        committed: !0,
        commitOid: m,
        treeOid: w,
        stagedCount: c.length
      };
    } catch (a) {
      throw we.consoleDotError("Error committing staged changes:", a), a;
    }
  },
  async commitChanges(t, e, {
    message: r,
    treeOid: n,
    parentCommitOids: i = [],
    name: a = "System",
    email: o = "system@example.com",
    actionType: s = "change",
    filePath: c = null
  }) {
    try {
      const f = await te.commit({
        fs: t,
        dir: e,
        message: r,
        tree: n,
        parent: i,
        author: { name: a, email: o }
      });
      return we.consoleDotLog(`Committed ${s} for ${c || "repository"}: ${f}`), f;
    } catch (f) {
      throw we.consoleDotError("Error committing changes:", f), f;
    }
  },
  async _writeFullTree(t, e, r) {
    const n = async (i) => {
      const a = [];
      for (const o of i)
        if (o.type === "tree") {
          const s = await n(o.tree || []);
          a.push({
            mode: "040000",
            path: o.path,
            oid: s,
            type: "tree"
          });
        } else
          a.push(o);
      return await te.writeTree({ fs: t, dir: e, tree: a });
    };
    return await n(r);
  },
  async findInGitHistory(t, e, r) {
    try {
      we.consoleDotLog("Starting findInGitHistory function..."), we.consoleDotLog(`File path: ${r}`);
      const i = r.replace(/^\/+|\/+$/g, "").split("/");
      we.consoleDotLog(`Path parts: ${JSON.stringify(i)}`);
      let a = await lt.resolveRef(t, e);
      for (we.consoleDotLog(`Starting from commit: ${a}`); a; ) {
        we.consoleDotLog(`Processing commit: ${a}`);
        const { commit: o } = await lt.readCommit(t, e, a);
        let s = o.tree;
        we.consoleDotLog(`Root tree OID: ${s}`);
        let c = !0;
        for (let f = 0; f < i.length; f++) {
          const l = i[f];
          we.consoleDotLog(`Processing path part: ${l}`);
          const { tree: w } = await te.readTree({
            fs: t,
            dir: e,
            oid: s
          }), m = w.find((g) => g.path === l);
          if (!m) {
            we.consoleDotLog(`Path part "${l}" not found in tree.`), c = !1;
            break;
          }
          if (f === i.length - 1)
            return we.consoleDotLog(`Found path "${r}" in commit ${a}`, w), we.consoleDotLog(m), {
              type: m.type,
              oid: m.oid,
              commitOid: a,
              treeOid: s
            };
          if (m.type === "tree")
            s = m.oid, we.consoleDotLog(`Found subtree OID: ${s}`);
          else {
            we.consoleDotLog(`Path part "${l}" is not a directory.`), c = !1;
            break;
          }
        }
        if (c)
          return we.consoleDotLog(`Path "${r}" found in commit ${a}`), {
            type: "tree",
            oid: s,
            commitOid: a
          };
        a = o.parent.length > 0 ? o.parent[0] : null, we.consoleDotLog(`Moving to parent commit: ${a}`);
      }
      throw new Error(`Path "${r}" not found in any commit.`);
    } catch (n) {
      throw we.consoleDotLog("Error in findInGitHistory:", n), n;
    }
  },
  async readFileDot(t, e, r, n = null) {
    try {
      if (we.consoleDotLog(`args are fs: ${t}, dir: ${e}, filePath: ${r}, commitOid: ${n}`), r = r.replace(/^\/+|\/+$/g, ""), n === "staged") {
        const w = this.staged.get(r);
        if (w && w.type === "write")
          try {
            const m = await te.readBlob({
              fs: t,
              dir: e,
              oid: w.oid
            }), g = m.blob instanceof ArrayBuffer ? new Uint8Array(m.blob) : m.blob instanceof Uint8Array ? m.blob : null;
            if (!g) throw new Error("Invalid blob data");
            return new TextDecoder().decode(g);
          } catch (m) {
            we.consoleDotError("Error reading staged blob, falling back:", m);
          }
        else
          we.consoleDotLog(`File "${r}" not found in staged changes. Falling back...`);
      }
      const i = r.split("/"), a = i.pop(), o = n && n !== "staged" ? n : await lt.resolveRef(t, e), { commit: s } = await lt.readCommit(t, e, o);
      let c = s.tree;
      for (const w of i) {
        const { tree: m } = await te.readTree({ fs: t, dir: e, oid: c }), g = m.find((b) => b.path === w && b.type === "tree");
        if (!g)
          return we.consoleDotLog(`Directory "${w}" not found`), "";
        c = g.oid;
      }
      const f = await te.readBlob({
        fs: t,
        dir: e,
        oid: c,
        filepath: a
      }), l = f.blob instanceof ArrayBuffer ? new Uint8Array(f.blob) : f.blob instanceof Uint8Array ? f.blob : null;
      return l ? new TextDecoder().decode(l) : (we.consoleDotError("Invalid blob data from commit"), "");
    } catch (i) {
      return we.consoleDotError("Error in readFileDot:", i), "";
    }
  },
  async readDirDot(t, e, r, n = null) {
    try {
      if (r = r.replace(/^\/+|\/+$/g, ""), n === "staged")
        try {
          const f = Array.from(this.staged.entries()).filter(([l, w]) => {
            const m = l.replace(/^\/+|\/+$/g, ""), g = m.split("/"), b = r.split("/");
            return g.length === b.length + 1 && m.startsWith(r + (r ? "/" : ""));
          });
          if (f.length > 0)
            return {
              entries: f.map(([l, w]) => ({
                path: l.split("/").pop(),
                type: w.type === "write" ? "blob" : "tree",
                oid: w.oid,
                mode: w.type === "write" ? "100644" : "040000"
              })),
              dirPath: r,
              commitOid: "staged",
              treeOid: "staged"
            };
          we.consoleDotLog(`No staged entries for "${r}", falling back...`);
        } catch (f) {
          we.consoleDotError("Error reading staged directory, falling back:", f);
        }
      const i = n && n !== "staged" ? n : await lt.resolveRef(t, e), { commit: a } = await lt.readCommit(t, e, i);
      let o = a.tree;
      const s = r.split("/").filter(Boolean);
      for (const f of s) {
        const { tree: l } = await te.readTree({ fs: t, dir: e, oid: o }), w = l.find((m) => m.path === f && m.type === "tree");
        if (!w)
          return we.consoleDotLog(`Directory "${f}" not found in commit tree.`), { entries: [], dirPath: r, commitOid: i, treeOid: o };
        o = w.oid;
      }
      const { tree: c } = await te.readTree({ fs: t, dir: e, oid: o });
      return {
        entries: c.map((f) => ({
          path: f.path,
          type: f.type,
          oid: f.oid,
          mode: f.mode
        })),
        dirPath: r,
        commitOid: i,
        treeOid: o
      };
    } catch (i) {
      return we.consoleDotError("Error in readDirDot:", i), { entries: [], dirPath: r, commitOid: null, treeOid: null };
    }
  },
  async writeFileDot(t, e, r, n, i = "sample", a = "sample@email.com", o = 1) {
    try {
      we.consoleDotLog("Starting writeFileDot function..."), r = r.replace(/^\/+|\/+$/g, "");
      const s = r.split("/"), c = s.pop(), f = await this.isDirectoryDot(t, e, r);
      if (f.exists) {
        if (f.isDirectory)
          throw new Error(`Path ${r} exists and is a directory - cannot write as file`);
        we.consoleDotLog(`File ${r} exists and will be overwritten`);
      }
      const l = await te.writeBlob({
        fs: t,
        dir: e,
        blob: new TextEncoder().encode(n)
      });
      we.consoleDotLog(`Blob OID created: ${l}`);
      let w;
      try {
        w = await te.resolveRef({ fs: t, dir: e, ref: "HEAD" }), we.consoleDotLog(`Latest commit OID resolved: ${w}`);
      } catch {
        we.consoleDotLog("No existing commit, starting fresh repository"), w = null;
      }
      let m = [];
      if (w) {
        const { commit: S } = await te.readCommit({ fs: t, dir: e, oid: w });
        m = (await te.readTree({ fs: t, dir: e, oid: S.tree })).tree, we.consoleDotLog(`Current tree loaded with ${m.length} entries`);
      }
      const g = async (S, A, B) => {
        if (A.length === 0) {
          const W = S.findIndex((z) => z.path === c);
          if (W >= 0 && S[W].type === "tree")
            throw new Error(`Cannot overwrite directory ${c} with file content`);
          return W >= 0 ? S[W] = {
            mode: "100644",
            path: c,
            oid: B,
            type: "blob"
          } : S.push({
            mode: "100644",
            path: c,
            oid: B,
            type: "blob"
          }), S;
        }
        const N = A.shift();
        let U = S.find((W) => W.path === N && W.type === "tree");
        if (!U) {
          const W = await te.writeTree({ fs: t, dir: e, tree: [] });
          U = {
            mode: "040000",
            path: N,
            oid: W,
            type: "tree"
          }, S.push(U);
        }
        const { tree: M } = await te.readTree({ fs: t, dir: e, oid: U.oid }), $ = await g([...M], A, B), O = await te.writeTree({ fs: t, dir: e, tree: $ });
        return U.oid = O, S;
      }, b = await g([...m], [...s], l), T = await te.writeTree({ fs: t, dir: e, tree: b });
      we.consoleDotLog(`New tree OID: ${T}`);
      let R = null;
      return o ? (R = await te.commit({
        fs: t,
        dir: e,
        message: `Updated ${r}`,
        tree: T,
        parent: w ? [w] : [],
        author: { name: i, email: a }
      }), we.consoleDotLog(`New commit OID: ${R}`)) : (gr.set(r, {
        type: "write",
        oid: l,
        treeOid: T,
        filePath: r,
        action: "staged"
      }), we.consoleDotLog(`Staged write for ${r} with blobOid ${l}`)), {
        blobOid: l,
        treeOid: T,
        commitOid: R,
        filePath: r,
        action: o ? "committed" : "staged",
        createdTrees: s.length
      };
    } catch (s) {
      throw we.consoleDotError("Error in writeFileDot:", s), s;
    }
  },
  async isDirectoryDot(t, e, r) {
    try {
      if (gt("[isDirectoryDot] Checking path:", r), !r || r === "/") {
        gt("[isDirectoryDot] Path is root or empty, resolving root directory...");
        const c = await lt.resolveRef(t, e);
        gt("[isDirectoryDot] Resolved commit OID:", c);
        const f = await lt.readCommit(t, e, c), l = await te.readTree({
          fs: t,
          dir: e,
          oid: f?.commit?.tree
        });
        return gt("[isDirectoryDot] Root directory tree loaded:", l.tree), {
          exists: !0,
          isDirectory: !0,
          hasChildren: l.tree.length > 0
        };
      }
      const n = r.split("/").filter((c) => c.length > 0);
      gt("[isDirectoryDot] Path parts:", n);
      const i = await lt.resolveRef(t, e);
      gt("[isDirectoryDot] Resolved commit OID:", i);
      const a = await lt.readCommit(t, e, i), o = await te.readTree({
        fs: t,
        dir: e,
        oid: a.commit.tree
      });
      gt("[isDirectoryDot] Initial tree loaded:", o.tree);
      let s = o.tree;
      for (let c = 0; c < n.length; c++) {
        const f = n[c];
        gt(`[isDirectoryDot] Checking part "${f}" in current tree...`);
        const l = s.find((w) => w.path === f);
        if (!l)
          return gt(`[isDirectoryDot] Part "${f}" not found in current tree.`), {
            exists: !1,
            isDirectory: !1,
            hasChildren: !1
          };
        if (l.type === "tree") {
          if (gt(`[isDirectoryDot] Part "${f}" is a directory.`), c === n.length - 1) {
            const m = await te.readTree({ fs: t, dir: e, oid: l.oid });
            return gt("[isDirectoryDot] Subtree loaded:", m.tree), {
              exists: !0,
              isDirectory: !0,
              hasChildren: m.tree.length > 0
            };
          }
          s = (await te.readTree({ fs: t, dir: e, oid: l.oid })).tree;
        } else return c === n.length - 1 ? (gt(`[isDirectoryDot] Part "${f}" is a file.`), {
          exists: !0,
          isDirectory: !1,
          hasChildren: !1
        }) : (gt(`[isDirectoryDot] Part "${f}" is not a directory.`), {
          exists: !1,
          isDirectory: !1,
          hasChildren: !1
        });
      }
      return gt("[isDirectoryDot] Path does not exist."), {
        exists: !1,
        isDirectory: !1,
        hasChildren: !1
      };
    } catch (n) {
      return Em("[isDirectoryDot] Error checking directory:", n), {
        exists: !1,
        isDirectory: !1,
        hasChildren: !1
      };
    }
  },
  async listFilesDot(t, e, r = !0) {
    try {
      let n;
      try {
        n = await lt.resolveRef(t, e);
      } catch {
        return we.consoleDotLog("No commit found, returning empty list."), [];
      }
      if (!n)
        return we.consoleDotLog("No commit OID found, repository is empty."), [];
      const i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
      let o;
      try {
        o = await lt.readCommit(t, e, n);
      } catch (f) {
        if (f.message.includes("Cannot read properties of null") || f.message.includes("readObjectLoose"))
          return we.consoleDotLog("Commit reading failed, repository may be empty."), [];
        throw f;
      }
      if (!o)
        return we.consoleDotLog("No commit found, returning empty list."), [];
      const s = async (f, l = "") => {
        if (a.has(f)) return;
        a.add(f), we.consoleDotLog("Traversing tree:", f, "Path:", l);
        let w;
        try {
          w = (await te.readTree({ fs: t, dir: e, oid: f })).tree;
        } catch (m) {
          we.consoleDotLog("Error reading tree:", m);
          return;
        }
        await Promise.all(w.map(async (m) => {
          const g = l ? `${l}/${m.path}` : m.path;
          if (i.has(g) || i.set(g, {
            path: g,
            type: m.type,
            oid: m.oid,
            commitOid: n
          }), m.type === "tree")
            return s(m.oid, g);
        }));
      };
      await s(o.commit.tree);
      let c = Array.from(i.values());
      return r || (c = c.filter((f) => f.type !== "tree")), we.consoleDotLog("Total entries:", c.length, "Entries:", c), c;
    } catch (n) {
      if (n.message.includes("Could not find HEAD") || n.message.includes("Could not find refs/heads") || n.message.includes("Cannot read properties of null") || n.message.includes("readObjectLoose") || n.message.includes("ENOENT"))
        return we.consoleDotLog("Repository is empty or not fully initialized, returning empty list."), [];
      throw we.consoleDotLog("Error in listFilesDot:", n), n;
    }
  },
  async mkdirDot(t, e, r, n = "sample", i = "sample@email.com", a = 1) {
    try {
      we.consoleDotLog(`Creating directories for path: ${r}`), r = r.replace(/^\/+|\/+$/g, "");
      const o = r.split("/"), s = await this.isDirectoryDot(t, e, r);
      if (s.exists) {
        if (!s.isDirectory)
          throw new Error(`Path ${r} exists and is a file - cannot create as directory`);
        return {
          dirPath: r,
          existing: !0,
          treeOid: s.treeOid,
          commitOid: null,
          action: "none"
        };
      }
      let c = await lt.resolveRef(t, e).catch(() => null), f = c ? (await lt.readCommit(t, e, c)).commit.tree : null, l = f ? (await te.readTree({ fs: t, dir: e, oid: f })).tree : [], w = [], m = f, g = l, b = 0;
      for (const R of o) {
        let S = g.find((A) => A.path === R && A.type === "tree");
        if (!S) {
          const A = await te.writeTree({ fs: t, dir: e, tree: [] });
          S = { path: R, mode: "040000", oid: A, type: "tree" }, g.push(S), b++;
        }
        w.push({ tree: g, subtree: S }), m = S.oid, g = (await te.readTree({ fs: t, dir: e, oid: m })).tree;
      }
      for (let R = w.length - 1; R >= 0; R--) {
        const { tree: S, subtree: A } = w[R];
        S.find((B) => B.path === A.path).oid = m, m = await te.writeTree({ fs: t, dir: e, tree: S });
      }
      let T = null;
      return a ? (T = await te.commit({
        fs: t,
        dir: e,
        author: { name: n, email: i },
        message: `Created directory: ${r}`,
        tree: m,
        parent: c ? [c] : []
      }), we.consoleDotLog(`New commit OID for directory creation: ${T}`)) : (gr.set(r, {
        type: "writeDir",
        treeOid: m,
        filePath: r,
        action: "staged"
      }), we.consoleDotLog(`Staged write for ${r} with treeOid ${m}`)), {
        dirPath: r,
        treeOid: m,
        commitOid: T,
        createdTrees: b,
        action: a ? "committed" : "staged"
      };
    } catch (o) {
      throw we.consoleDotLog("Error in mkdirdot:", o), o;
    }
  },
  async removeFileDot(t, e, r, n = 1) {
    try {
      we.consoleDotLog(`[removeFileDot] Starting removal for: ${r}, staged files: `, gr), r = r.replace(/^\/+|\/+$/g, "");
      const i = r.split("/"), a = i.pop(), o = await lt.resolveRef(t, e), { commit: s } = await lt.readCommit(t, e, o), { tree: c } = await te.readTree({
        fs: t,
        dir: e,
        oid: s.tree
      });
      let f = null, l = null;
      const m = c.filter((b) => b.type === "tree").find((b) => b.path === "");
      if (m) {
        const { tree: b } = await te.readTree({
          fs: t,
          dir: e,
          oid: m.oid
        });
        if (f = b.find((T) => T.path === a), f) {
          we.consoleDotLog(`[removeFileDot] Found ${a} in unnamed subtree`);
          const T = b.filter((A) => A.path !== a), R = await te.writeTree({
            fs: t,
            dir: e,
            tree: T
          }), S = c.map(
            (A) => A.path === "" && A.type === "tree" ? { ...A, oid: R } : A
          );
          l = await te.writeTree({
            fs: t,
            dir: e,
            tree: S
          });
        }
      }
      if (!f) {
        const b = async (T, R) => {
          const { tree: S } = await te.readTree({ fs: t, dir: e, oid: T });
          if (R.length === 0) {
            if (f = S.find((O) => O.path === a), !f)
              throw new Error(`File ${a} not found in tree`);
            const M = S.filter((O) => O.path !== a);
            return await te.writeTree({ fs: t, dir: e, tree: M });
          }
          const A = R[0], B = S.find((M) => M.path === A && M.type === "tree");
          if (!B) throw new Error(`Directory ${A} not found`);
          const N = await b(B.oid, R.slice(1)), U = S.map(
            (M) => M.path === A && M.type === "tree" ? { ...M, oid: N } : M
          );
          return await te.writeTree({ fs: t, dir: e, tree: U });
        };
        l = await b(s.tree, i);
      }
      if (!f)
        throw new Error(`File ${r} not found in repository`);
      let g = null;
      return n ? (g = await te.commit({
        fs: t,
        dir: e,
        author: { name: "System", email: "system@example.com" },
        message: `Removed file ${r}`,
        tree: l,
        parent: [o]
      }), we.consoleDotLog(`[removeFileDot] Committed removal: ${g}`)) : (gr.set(r, {
        type: "remove",
        oid: f.oid,
        treeOid: l,
        filePath: r,
        action: "staged"
      }), we.consoleDotLog(`Staged removal for ${r} with blobOid ${f.oid}`)), {
        filePath: r,
        treeOid: l,
        commitOid: g,
        action: n ? "committed" : "staged",
        blobOid: f.oid
      };
    } catch (i) {
      throw we.consoleDotLog("[removeFileDot] ERROR:", i), i;
    }
  },
  async removeDirDot(t, e, r, n = 1) {
    try {
      r = r.replace(/^\/+|\/+$/g, "");
      const i = r.split("/"), a = i.pop(), o = await lt.resolveRef(t, e), { commit: s } = await lt.readCommit(t, e, o), c = async (m, g) => {
        const { tree: b } = await te.readTree({ fs: t, dir: e, oid: m });
        if (g.length === 0) {
          const T = b.find((A) => A.path === a && A.type === "tree");
          if (!T)
            throw new Error(`Directory ${a} not found`);
          const R = b.filter((A) => A.path !== a);
          return { newTreeOid: await te.writeTree({ fs: t, dir: e, tree: R }), removedTreeOid: T.oid };
        } else {
          const T = g[0], R = b.find((U) => U.path === T && U.type === "tree");
          if (!R)
            throw new Error(`Directory not found: ${T}`);
          const { newTreeOid: S, removedTreeOid: A } = await c(R.oid, g.slice(1)), B = b.map((U) => U.path === T && U.type === "tree" ? { ...U, oid: S } : U);
          return { newTreeOid: await te.writeTree({ fs: t, dir: e, tree: B }), removedTreeOid: A };
        }
      }, { newTreeOid: f, removedTreeOid: l } = await c(s.tree, i);
      let w = null;
      return n ? w = await te.commit({
        fs: t,
        dir: e,
        author: { name: "System", email: "system@example.com" },
        message: `Removed directory ${r}`,
        tree: f,
        parent: [o]
      }) : (gr.set(r, {
        type: "removeDir",
        treeOid: f,
        filePath: r,
        action: "staged"
      }), we.consoleDotLog(`Staged removal for ${r} with newTreeOid ${f}`)), {
        dirPath: r,
        treeOid: f,
        commitOid: w,
        removedTreeOid: l,
        action: n ? "committed" : "staged"
      };
    } catch (i) {
      throw we.consoleDotLog("Error in removeDirDot:", i), i;
    }
  }
};
const Sm = await kr();
new hr(Sm.logging.acl);
const km = {
  owner: {
    read: !0,
    write: !0,
    execute: !0
  },
  group: {
    read: !0,
    write: !1,
    execute: !0
  },
  others: {
    read: !0,
    write: !1,
    execute: !1
  }
}, Hc = {
  "/": {
    owner: {
      read: !0,
      write: !0,
      execute: !0
    },
    group: {
      read: !0,
      write: !1,
      execute: !0
    },
    others: {
      read: !0,
      write: !1,
      execute: !0
    }
  },
  "/system": {
    owner: {
      read: !0,
      write: !0,
      execute: !0
    },
    group: {
      read: !1,
      write: !1,
      execute: !1
    },
    others: {
      read: !1,
      write: !1,
      execute: !1
    }
  }
}, Gc = {
  root: { uid: 0, gid: 0, groups: ["admin"] },
  admin: { uid: 1e3, gid: 1e3, groups: ["admin"] },
  user: { uid: 1001, gid: 1001, groups: ["users"] }
};
class xm {
  constructor() {
    this.aclStore = /* @__PURE__ */ new Map(), this.loadDefaultACLs();
  }
  loadDefaultACLs() {
    for (const e in Hc)
      this.aclStore.set(e, Hc[e]);
  }
  getDefaultACL(e) {
    return this.aclStore.has(e) ? this.aclStore.get(e) : JSON.parse(JSON.stringify(km));
  }
  getACL(e) {
    return this.aclStore.get(e) || this.getDefaultACL(e);
  }
  setACL(e, r) {
    if (!r.owner || !r.group || !r.others)
      throw new Error("Invalid ACL structure");
    this.aclStore.set(e, r);
  }
  checkPermission(e, r, n) {
    const i = this.getACL(e), a = Gc[r] || Gc.user;
    return a.uid === 0 || r === i.owner ? i.owner[n] : a.groups.some((o) => o === i.group) ? i.group[n] : i.others[n];
  }
}
const eo = new xm(), Am = await kr();
new hr(Am.logging.stats);
let Mn = 1e3;
class Im {
  constructor() {
    this.fileStats = /* @__PURE__ */ new Map(), this.dirStats = /* @__PURE__ */ new Map(), this.loadRootStats();
  }
  loadRootStats() {
    this.dirStats.set("/", {
      inode: 1,
      mode: "040755",
      uid: 0,
      gid: 0,
      atime: (/* @__PURE__ */ new Date()).toISOString(),
      mtime: (/* @__PURE__ */ new Date()).toISOString(),
      ctime: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  getFileStats(e) {
    return this.fileStats.get(e) || this.generateFileStats(e);
  }
  getDirStats(e) {
    return this.dirStats.get(e) || this.generateDirStats(e);
  }
  setFileStats(e, r) {
    const n = {
      ...this.generateFileStats(e),
      ...r
    };
    return this.fileStats.set(e, n), n;
  }
  setDirStats(e, r) {
    const n = {
      ...this.generateDirStats(e),
      ...r
    };
    return this.dirStats.set(e, n), n;
  }
  generateFileStats(e) {
    return Mn++, {
      inode: Mn,
      mode: "100644",
      uid: 1e3,
      gid: 1e3,
      size: 0,
      atime: (/* @__PURE__ */ new Date()).toISOString(),
      mtime: (/* @__PURE__ */ new Date()).toISOString(),
      ctime: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  generateDirStats(e) {
    return Mn++, {
      inode: Mn,
      mode: "040755",
      uid: 1e3,
      gid: 1e3,
      atime: (/* @__PURE__ */ new Date()).toISOString(),
      mtime: (/* @__PURE__ */ new Date()).toISOString(),
      ctime: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  updateTimestamp(e, r, n = "mtime") {
    const i = (/* @__PURE__ */ new Date()).toISOString(), a = r ? this.dirStats : this.fileStats, o = a.get(e) || (r ? this.generateDirStats(e) : this.generateFileStats(e));
    return o[n] = i, a.set(e, o), o;
  }
}
const Zc = new Im(), Rm = await kr(), mu = new hr(Rm.logging.gitNoteManager);
function Qt(...t) {
  mu.consoleDotLog("[gitNoteManager] ", ...t);
}
function Xr(...t) {
  mu.consoleDotError("[gitNoteManager] ", ...t);
}
Qt("Loading gitNoteManager.");
const Vc = 1e3, Xc = 1e3, Tm = "100644", $m = "040755", Bm = 0;
async function xt(t, e, r, n = null, i = {}) {
  try {
    switch (r) {
      case "add":
        return await Cm(t, e, n, i);
      case "read":
        return await Fm(t, e, n, i);
      case "remove":
        return await Um(t, e, n, i);
      case "list":
        return await Pm(t, e, n);
      case "findNotesByPath":
        return await Nm(t, e, i);
      default:
        throw new Error(`Unsupported operation: ${r}`);
    }
  } catch (a) {
    throw Xr(`Error in gitNoteManager: ${a.message}`), a;
  }
}
async function ni(t, e, r, n = !1) {
  try {
    return n ? (await te.readTree({ fs: t, dir: e, filepath: r })).oid : (await te.readBlob({ fs: t, dir: e, filepath: r })).oid;
  } catch (i) {
    throw Xr(`Failed to get OID for ${r}: ${i.message}`), i;
  }
}
function yu() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function Yc() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}
function Dm() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
    const e = Math.random() * 16 | 0;
    return (t === "x" ? e : e & 3 | 8).toString(16);
  });
}
async function Om(t, e, r, n) {
  const i = yu(), { filepath: a, customMetadata: o = {} } = n, s = {
    created_at: i,
    updated_at: i,
    full_path: a,
    ...o
  };
  switch (r) {
    case "inode": {
      const c = Zc.getFileStats(a) || {}, f = a?.split("/").pop() || a;
      return {
        ...s,
        inode: c.inode || Yc(),
        mode: c.mode || Tm,
        name: f,
        uid: c.uid || Vc,
        gid: c.gid || Xc,
        acl: eo.getDefaultACL(a),
        atime: c.atime || i,
        mtime: c.mtime || i,
        ctime: c.ctime || i,
        size: c.size || Bm,
        type: "file"
      };
    }
    case "dentry": {
      const c = Zc.getDirStats(a) || {}, f = a?.split("/")?.pop() || a, l = a?.split("/")?.slice(0, -1)?.join("/") || "/";
      let w = 0;
      try {
        const m = n?.customMetadata?.parentOid || await ni(t, e, l, !0), g = await te.readNote({ fs: t, dir: e, oid: m });
        w = JSON.parse(g).inode || 0;
      } catch {
        Qt(`Could not get parent inode for ${a}, using 0`);
      }
      return {
        ...s,
        dentry_id: c.inode || Yc(),
        name: f,
        parent_inode: w,
        mode: c.mode || $m,
        uid: c.uid || Vc,
        gid: c.gid || Xc,
        acl: eo.getDefaultACL(a),
        atime: c.atime || i,
        mtime: c.mtime || i,
        ctime: c.ctime || i,
        type: "directory"
      };
    }
    case "superblock": {
      if (!n.fsType)
        throw new Error("fsType is required for superblock notes");
      return {
        ...s,
        fsType: n?.fsType || null,
        owner: n.owner || "root",
        created_at: i,
        default_acl: eo.getDefaultACL("/") || null,
        users: ["root"],
        acl_policy: "strict",
        block_size: n.block_size || 4096,
        features: n.features || [],
        uuid: Dm()
      };
    }
    default:
      throw new Error(`Unsupported note type: ${r}`);
  }
}
async function Cm(t, e, r, n) {
  try {
    let { oid: i, filepath: a, customMetadata: o, fsType: s } = n;
    if (r === "superblock" && !n.fsType)
      throw new Error("fsType parameter is required for superblock notes");
    if (!i && !a)
      throw new Error("Either oid or filepath must be provided");
    a && !i && (i = await ni(t, e, a, r === "dentry"));
    let f = null;
    try {
      const T = await te.readNote({ fs: t, dir: e, oid: i });
      f = JSON.parse(new TextDecoder().decode(T));
    } catch {
    }
    const l = await Om(t, e, r, {
      filepath: a,
      customMetadata: o,
      fsType: s
    }), w = yu(), m = {
      full_path: a,
      associated_at: w,
      metadata: l
    };
    let g;
    if (f) {
      Qt(`Note already exists for ${i}, adding filepath association`);
      const T = f.paths || {};
      f.full_path && !T[f.full_path] && (T[f.full_path] = {
        full_path: f.full_path,
        associated_at: f.updated_at || w,
        metadata: {
          ...f,
          paths: void 0,
          has_multiple_paths: void 0,
          updated_at: void 0
        }
      }), T[a] = m, g = {
        has_multiple_paths: Object.keys(T).length > 1,
        paths: T
      };
    } else
      g = {
        has_multiple_paths: !1,
        paths: {
          [a]: m
        }
      };
    const b = JSON.stringify(g);
    return await te.addNote({
      fs: t,
      dir: e,
      oid: i,
      note: b,
      force: !0,
      author: {
        name: "gitNoteManager",
        email: "gitnotemanager@system"
      }
    }), Qt(`Successfully added ${r} note to ${i}`), g;
  } catch (i) {
    throw Xr(`Failed to add ${r} note: ${i.message}`), i;
  }
}
async function Fm(t, e, r, n) {
  let i;
  try {
    const { oid: a, filepath: o } = n;
    if (i = a, o && !a && (i = await ni(t, e, o, r === "dentry").catch(() => null)), !i)
      throw new Error("Valid OID or filepath must be provided");
    const s = await te.readNote({
      fs: t,
      dir: e,
      oid: i
    }).catch(() => null);
    if (!s) {
      if (r === "superblock") {
        const l = n?.fsType || "memory";
        return await Mm(t, e, l);
      }
      throw new Error(`Note not found for ${r}`);
    }
    if (o && !s) {
      const l = await te.listNotes({ fs: t, dir: e });
      for (const w of l)
        try {
          const m = await te.readNote({ fs: t, dir: e, oid: w }), g = JSON.parse(new TextDecoder().decode(m));
          if (g.full_path === o)
            return g;
        } catch {
        }
    }
    const c = new TextDecoder().decode(s), f = JSON.parse(c);
    return Qt("result: ", f), f;
  } catch (a) {
    return Xr(`Failed to get ${r} note: ${a.message}`), {
      error: a.message,
      type: r,
      oid: i || null,
      exists: !1
    };
  }
}
async function Pm(t, e) {
  try {
    const r = await te.listNotes({ fs: t, dir: e });
    return Qt("Successfully listed notes"), r;
  } catch (r) {
    throw Xr(`Failed to list notes: ${r.message}`), r;
  }
}
async function Nm(t, e, r) {
  const { path: n } = r;
  Qt("path: ", n);
  const i = await te.listNotes({ fs: t, dir: e });
  Qt("notes: ", i);
  const a = [];
  for (const o of i)
    try {
      const s = await te.readNote({ fs: t, dir: e, oid: o }), c = JSON.parse(new TextDecoder().decode(s));
      c.full_path === n && a.push({ oid: o, metadata: c });
    } catch {
      continue;
    }
  return a;
}
async function Mm(t, e, r) {
  const n = {
    fsType: r,
    owner: "root",
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    block_size: 4096,
    features: []
  }, i = await te.resolveRef({ fs: t, dir: e, ref: "HEAD" });
  return await te.addNote({
    fs: t,
    dir: e,
    oid: i,
    force: !1,
    note: new TextEncoder().encode(JSON.stringify(n)),
    author: { name: "system", email: "system@git" },
    force: !0
  }), n;
}
async function Um(t, e, r, n) {
  try {
    const { oid: i, filepath: a } = n;
    let o = i;
    return a && !i && (o = await ni(t, e, a)), await te.removeNote({
      fs: t,
      dir: e,
      oid: o
    }), Qt(`Successfully removed ${r} note from ${o}`), !0;
  } catch (i) {
    throw Xr(`Failed to remove ${r} note: ${i.message}`), i;
  }
}
self.onerror = (t) => {
  console.error("Worker initialization error:", t);
};
const jm = new af(self), gu = new hr(Er.logging.dotGit), Tn = new _m(), vu = new uu();
function Z(...t) {
  gu.consoleDotLog(...t);
}
function me(...t) {
  gu.consoleDotError(...t);
}
Z("gitWorker loaded.");
let oe = "/", ft, wt, Ke = "main", tt = "", Ve = "origin", er = 10, $n = "testUser", Bn = "testUser@example.com", _u = {}, ne = null, co = "/settings", Io = {}, Ft = !0, Bt, Pt, At = Er.corsProxy, Gt = !1;
const Je = {
  async fill() {
    return Z("authenticate", ft, wt), { username: ft, password: wt };
  },
  async rejected() {
    const t = new Error("Authentication rejected");
    throw Z("Authentication rejected", t), t;
  }
};
async function dr(t) {
  Gt && Ft ? await vu.sendMessageToChannel(t) : Z("This browser doesn't support service worker");
}
self.setAuthParams = async function() {
  await dr({
    operation: "setAuthParams",
    data: { username: ft, password: wt }
  });
};
self.setDir = async function() {
  await dr({ operation: "setDir", data: oe });
};
self.setRef = async function() {
  await dr({ operation: "setRef", data: Ke });
};
self.setDepth = async function() {
  await dr({ operation: "setDepth", data: er });
};
self.setRemote = async function() {
  await dr({ operation: "setRemote", data: Ve });
};
self.passFsArgs = async function() {
  await dr({ operation: "passFsArgs", data: Io });
};
self.setRepoDir = async function() {
  await dr({ operation: "setRepoDir", data: oe });
};
self.setSettingsAddresses = async function() {
  await dr({ operation: "setSettingsAddresses", data: _u });
};
async function Yr(t, e) {
  if (Gt && Ft)
    return await vu.fetchWithServiceWorker(t, e);
  Z("This browser doesn't support service worker");
}
async function Lm(t, e = Ft) {
  Gt = t, Ft = e, Tn.options = { supportsServiceWorker: Gt, useSW: Ft };
}
async function zm(t) {
  oe = t, await self.setDir();
}
function qm(t) {
  return /^https?:\/\/.+/.test(t);
}
async function Ar(t) {
  if (Z("seturl url ", t), !qm(t))
    throw new Error("Invalid Git URL format.");
  tt = t;
}
async function lo(t) {
  Ke = t, await self.setRef();
}
async function bu(t) {
  er = t, await self.setDepth();
}
async function Wm(t) {
  At = t;
}
async function Hm(t, e) {
  ft = t, wt = e, await self.setAuthParams();
}
async function Eu(t) {
  Ve = t, await self.setRemote();
}
async function Gm() {
  return Ve;
}
async function Zm() {
  try {
    const t = await ku("library");
    Z("libs", t);
    const e = await Bo();
    if (Z("directories", e), t && e)
      for (const [r, n] of Object.entries(t)) {
        if (!e[n])
          throw new Error(`File not found: ${n}`);
        return _u[n] = {
          fileName: r,
          filePath: n
        }, console.log(`File mapped: ${n}`), await self.setSettingsAddresses(), { success: !0 };
      }
    else
      return { success: !1 };
  } catch (t) {
    console.error(`Error in setSettingsAddresses: ${t.message}`);
  }
}
async function Vm(t, e) {
  return Z("entering getFileStoresFromDatabases object"), Tn.getFileStoreNames(t, e);
}
async function an({ fsName: t, fsType: e }) {
  try {
    if (Z("Initializing FS with:", { _fsName: t, _fsType: e }), !t || !e)
      throw new Error("fsName and fsType are required");
    if (Io = { fsName: t, fsType: e }, Pt = t, Bt = e, Z("Getting FS instance from FSManager"), ne = (await Tn.getFS(t, e)).fs, !ne)
      throw new Error("Failed to initialize file system");
    return Z("FS initialized successfully:", ne), await self.passFsArgs(), ne;
  } catch (r) {
    throw me("Error initializing file system:", r), r;
  }
}
async function Xm(t) {
  let e = await on();
  Z("current branch", e), Z("ref", Ke), Z("_ref", t);
  let r = await To();
  if (Z("branchesList", r), r.includes(t) || await Ro({ ref: t }), Ke === t || e === t) {
    Z(`you are already on the branch ${t}`);
    return;
  } else {
    let n = await Ny();
    if (Object.keys(n).length === 0) {
      await Ym({ ref: t, noCheckout: !1, noUpdateHead: !1 }), Ke = t, await xu({ url: tt }), Z("done");
      return;
    } else
      return Z("failed"), 0;
  }
}
async function Ro(t) {
  return await te.branch({
    ...t,
    fs: ne,
    dir: oe
  });
}
async function Ym(t) {
  return await te.checkout({
    ...t,
    fs: ne,
    dir: oe,
    remote: Ve
  });
}
async function To() {
  return await te.listBranches({
    fs: ne,
    dir: oe
  });
}
async function Su() {
  try {
    return await te.listBranches({ fs: ne, dir: oe, remote: Ve });
  } catch (t) {
    me("Error in listBranches:", t);
  }
}
async function on() {
  return await te.currentBranch({
    fs: ne,
    dir: oe,
    fullname: !1
  });
}
async function Km() {
  const t = await on();
  return await Hu(`branch.${t}.remote`);
}
function Jm(t) {
  const e = {};
  let r = null;
  return t.split(/\r?\n/).forEach((n) => {
    if (n = n.trim(), !(!n || n.startsWith(";") || n.startsWith("#")))
      if (n.startsWith("[") && n.endsWith("]"))
        r = n.slice(1, -1).trim(), e[r] = e[r] || {};
      else {
        const [i, a] = n.split("=").map((o) => o.trim());
        r && (e[r][i] = a);
      }
  }), e;
}
function Qm(t) {
  let e = "";
  return Object.keys(t).forEach((r) => {
    e += `[${r}]
`, Object.entries(t[r]).forEach(([n, i]) => {
      e += `    ${n} = ${i}
`;
    }), e += `
`;
  }), e;
}
async function ku(t = null, e = null) {
  try {
    if (!await ne.promises.lstat(co).catch(() => null))
      return me("Settings file does not exist yet."), {};
    if ((await ne.promises.readdir(`${oe}`)).includes("settings")) {
      const i = await ne.promises.readFile(co), a = Jm(i);
      return Z("settingsData,", a), t && e ? a[t] && a[t][e] ? a[t][e] : null : t ? a[t] ? a[t] : null : a;
    } else {
      me("The settings file dosen't exist yet!");
      return;
    }
  } catch (r) {
    if (r.code === "ENOENT") return {};
    throw r;
  }
}
async function ey(t) {
  const e = Qm(t);
  await Oo({ filePath: co, fileContents: e });
}
async function ty(t, e, r) {
  let n = {};
  try {
    n = await ku(), Z(n), n || (n = {}, Z("No past data is available. New file will be created.")), n[t] || (n[t] = {}), n[t][e] = r, Z("settingsData", n), await ey(n), Z("done");
  } catch {
    Z("No past data is available.");
  }
}
async function ry(t) {
  try {
    return await ai(t), await Do(t), await $o(t);
  } catch (e) {
    Z("Something bad happened pushing your file: ", e);
  }
}
async function ny(t) {
  try {
    return await Qu(), await Do(t), await $o(t);
  } catch (e) {
    Z("Something bad happened pushing your files: ", e);
  }
}
async function xu(t) {
  t?.attempt;
  let e = t?.ref || Ke;
  const r = 1;
  Z("Doing fetch operation"), !tt && await Ar(t?.url);
  try {
    if (Gt && Ft)
      try {
        return await Yr("fetch", t), { success: !0 };
      } catch (n) {
        return Z("Service Worker fetch failed, falling back to Web Worker", n), await te.fetch({
          ...t,
          fs: ne,
          http: Dt,
          dir: oe,
          corsProxy: At,
          ref: e,
          url: tt,
          remote: Ve,
          depth: er,
          tags: !0,
          headers: Ot(ft, wt),
          onProgress: (i) => {
            Z("Fetch progress event:", i);
          },
          onAuth() {
            return Je.fill();
          },
          onAuthFailure() {
            return Je.rejected();
          }
        }), { success: !0 };
      }
    else
      return Z("Service Worker not supported, using Web Worker directly"), await te.fetch({
        ...t,
        fs: ne,
        http: Dt,
        dir: oe,
        corsProxy: At,
        ref: e,
        url: tt,
        remote: Ve,
        depth: er,
        tags: !0,
        headers: Ot(ft, wt),
        onProgress: (n) => {
          Z("Fetch progress event:", n);
        },
        onAuth() {
          return Je.fill();
        },
        onAuthFailure() {
          return Je.rejected();
        }
      }), await Xu(), { success: !0 };
  } catch (n) {
    return me("some error happend while fetching: ", n), await Kr(n, t, "doFetch", r), { success: !1 };
  }
}
async function Au(t) {
  t?.attempt;
  const e = 1;
  !tt && await Ar(t?.url);
  try {
    await ii(t);
    try {
      if (Gt && Ft)
        try {
          const r = await Yr("listServerRefs", { ...t, url: tt });
          return Z("listServerRefs result with sw:", r), r;
        } catch (r) {
          Z("Service Worker listServerRefs failed, falling back to Web Worker", r);
          const n = await te.listServerRefs({
            ...t,
            fs: ne,
            url: tt,
            http: Dt,
            dir: oe,
            corsProxy: At,
            remote: Ve,
            headers: Ot(ft, wt),
            onAuth() {
              return Je.fill();
            },
            onAuthFailure() {
              return Je.rejected();
            }
          });
          return Z("listServerRefs result:", n), { success: !0, refs: n };
        }
      else {
        Z("Service Worker not supported, using Web Worker directly");
        const r = await te.listServerRefs({
          ...t,
          fs: ne,
          url: tt,
          http: Dt,
          dir: oe,
          corsProxy: At,
          remote: Ve,
          headers: Ot(ft, wt),
          onAuth() {
            return Je.fill();
          },
          onAuthFailure() {
            return Je.rejected();
          }
        });
        return Z("listServerRefs result:", r), { success: !0, refs: r };
      }
    } catch (r) {
      throw r;
    }
  } catch (r) {
    return me("some error happened while listing server refs: ", r), await Kr(r, t, "listServerRefs", e), { success: !1, error: r.message };
  }
}
const iy = ({ contents: t, filepath: e }, r = "theirs") => {
  if (t[1] === t[2]) return { cleanMerge: !0, mergedText: t[1] };
  if (t[0] === t[2]) return { cleanMerge: !0, mergedText: t[1] };
  if (t[0] === t[1]) return { cleanMerge: !0, mergedText: t[2] };
  switch (r) {
    case "ours":
      return { cleanMerge: !0, mergedText: t[1] };
    case "theirs":
      return { cleanMerge: !0, mergedText: t[2] };
    case "combine":
      return {
        cleanMerge: !0,
        mergedText: `<<<<<<< ours
${t[1]}
=======
${t[2]}
>>>>>>> theirs
`
      };
    default:
      return { cleanMerge: !0, mergedText: t[2] };
  }
};
async function ay(t = "main", e = "origin/main", r = "theirs", {
  onConflict: n = null,
  author: i = { name: $n, email: Bn }
} = {}) {
  try {
    const a = n || (({ contents: s, filepath: c }) => iy({ contents: s, filepath: c }, r));
    return await te.merge({
      fs: ne,
      dir: oe,
      ours: t,
      theirs: e,
      mergeDriver: a,
      fastForwardOnly: !1
    });
  } catch (a) {
    if (a.message.includes("MergeConflictError")) {
      const s = (await te.statusMatrix({ fs: ne, dir: oe })).filter((c) => c[2] === 2).map((c) => c[0]);
      if (r === "combine")
        return console.log("Merge conflicts preserved. Resolve these files:"), console.log(s.join(`
`)), {
          status: "conflicted",
          conflictedFiles: s,
          message: "Resolve conflicts and commit",
          commit: async () => {
            for (const c of s)
              await te.add({ fs: ne, dir: oe, filepath: c });
            return te.commit({
              fs: ne,
              dir: oe,
              author: i,
              message: "Merge with conflicts resolved"
            });
          }
        };
      throw await te.mergeReset({ fs: ne, dir: oe }), a;
    }
    throw a;
  }
}
async function oy(t = {}) {
  try {
    Z("Received args in getCommitHistoryFromReplica:", t);
    const e = t?.depth || 10, r = Pt;
    Z("Initializing replica FS..."), await an({ fsName: `${r}_replica`, fsType: Bt }), Z("Pulling from remote..."), await Ku({ url: tt, depth: e }), Z("Getting commit logs...");
    const n = await Mu({ depth: e });
    Z("Replica commit logs:", n), Z("Restoring main FS..."), await an({ fsName: r, fsType: Bt });
    const i = n.map((a) => a.oid);
    return Z("Returning commits:", i), {
      success: !0,
      commits: i,
      head: i[0] || null
    };
  } catch (e) {
    return me("Error getting commit history from replica:", e), {
      success: !1,
      error: e.message,
      commits: []
    };
  }
}
async function Iu(t) {
  Z("getLatestRemoteCommit args:", t);
  let e = { success: !1, refs: null };
  const r = t?.url || tt;
  if (r)
    e = await Au({ ...t, url: r });
  else
    return e;
  Z("getLatestRemoteCommit result:", e);
  const n = t?.ref || Ke || "HEAD";
  if (Z("getLatestRemoteCommit _ref:", n), !e.success)
    return me("Failed to fetch server refs", e.error), { success: !1, error: e.error };
  const i = e?.refs;
  let a = i.find((o) => o.ref === `refs/heads/${n}`)?.oid;
  return a || (a = i.find("refs/heads/main")?.oid), a ? (Z("headOid", a), {
    success: !0,
    commit: a
  }) : (me("Could not determine latest remote commit."), { success: !1, error: `No HEAD or ${Ke} main/master ref found` });
}
async function Ru(t = tt) {
  try {
    const e = await Tu(), r = t || r || await Wu() || "", n = await Iu({ url: r });
    if (!n.success)
      return me("Failed to get latest remote commit:", n.error), !0;
    const i = n.commit;
    return i === e ? (Z("lastRemoteCommit", i, "localRef", e), !0) : (Z("lastRemoteCommit", i, "localRef", e), !1);
  } catch (e) {
    return Z(
      "Some error happened while checking whether you are in sync or not:",
      e
    ), !1;
  }
}
async function sy() {
  try {
    return (await te.resolveRef({ fs: ne, dir: oe, ref: `/refs/remotes/${Ve}/${Ke}` }))?.trim();
  } catch (t) {
    Z(
      "some error happend while getting last remote commit: ",
      t
    );
  }
}
async function Tu(t) {
  try {
    const e = t || Ke || "HEAD";
    return Z("branch", e), (await te.resolveRef({ fs: ne, dir: oe, ref: `refs/heads/${e}` }))?.trim();
  } catch (e) {
    Z(
      "some error happend while getting last local commit: ",
      e
    );
  }
}
async function $u(t = tt, e = Ve) {
  try {
    return await Eu(e), await te.addRemote({
      url: t,
      force: !0,
      fs: ne,
      dir: oe,
      remote: e
    });
  } catch (r) {
    Z("some error happend while adding remote: ", r);
  }
}
async function cy(t = Ve) {
  try {
    return await te.deleteRemote({
      fs: ne,
      dir: oe,
      remote: t
    });
  } catch (e) {
    Z("some error happend while adding remote: ", e);
  }
}
async function Bu() {
  return await te.listRemotes({
    fs: ne,
    dir: oe
  });
}
async function ly(t) {
  try {
    const e = tt || t?.url, r = Ve || t?.remote;
    Z("handleNoRef args: ", t, e, r, tt, Ve), await $u(e, r);
    let n = await Su() || [];
    if (Z(n), n.length == 0)
      return !1;
  } catch (e) {
    throw me("Error handling no ref:", e), e;
  }
}
async function uy() {
  try {
    const t = await Du();
    return Z("Directory exists:", t), t ? {
      message: "Directory already exists",
      success: !0,
      alreadyInitialized: !0
    } : (await te.init({ fs: ne, dir: "/", defaultBranch: "main" }), t ? (Z("Directory already exists. Skipping initialization..."), {
      message: "Directory already exists",
      success: !0,
      alreadyInitialized: !0
    }) : (Z("Initializing repository..."), await an({ fsName: Pt, fsType: Bt }), await fy(), await Pu(), await Vu(Bt, "root"), Z("Initialization completed successfully"), {
      message: "Initialization successful",
      success: !0,
      alreadyInitialized: !1
    }));
  } catch (t) {
    return Z("Initialization failed:", t), {
      message: "Initialization failed",
      success: !1,
      error: t.message
    };
  }
}
async function fy() {
  try {
    const t = await te.commit({
      fs: ne,
      dir: "/",
      message: "Initial commit",
      author: {
        name: "ahmad",
        email: "ahmad@kani.com"
      }
    });
    return Z(`Created initial commit: ${t}`), {
      success: !0,
      commitOid: t,
      message: "Initial commit created successfully"
    };
  } catch (t) {
    return Z("Failed to create initial commit:", t), {
      success: !1,
      error: t.message,
      message: "Failed to create initial commit"
    };
  }
}
async function Du() {
  try {
    const t = await ne.promises.readdir(oe), e = await Bu();
    let r = [];
    return e.forEach((n) => r.push(n.url)), Z("urls:", r, e, t), !(r.length > 0 && !r.includes(tt) || t.length == 0 && r.length == 0);
  } catch (t) {
    if (t.code === "ENOENT")
      return Z("Directory does not exist:", oe), !1;
    throw me("Error checking directory existence:", t), t;
  }
}
async function hy(t) {
  try {
    return await te.findMergeBase({
      fs: ne,
      dir: oe,
      oids: t
    });
  } catch (e) {
    me("Error finding merge base:", e);
  }
}
async function Ou() {
  try {
    Z("🔄 Handling merge conflict in git-only storage...");
    const e = (await te.statusMatrix({ fs: ne, dir: oe })).filter((r) => r[3] === 3).map((r) => r[0]);
    if (e.length === 0)
      return Z("✅ No conflicted files found in git index"), { success: !0, resolved: !1 };
    Z(`⚠️ Found ${e.length} conflicted files in git:`, e);
    for (const r of e)
      try {
        Z(`🔧 Resolving ${r} in git index...`);
        const n = await te.readBlob({
          fs: ne,
          dir: oe,
          oid: await te.resolveRef({ fs: ne, dir: oe, ref: "HEAD" }),
          filepath: r
        }).catch(() => null), i = await te.readBlob({
          fs: ne,
          dir: oe,
          oid: await te.resolveRef({ fs: ne, dir: oe, ref: `refs/remotes/${Ve}/${Ke}` }),
          filepath: r
        }).catch(() => null), a = n?.blob || i?.blob || "";
        await te.add({
          fs: ne,
          dir: oe,
          filepath: r,
          // Force add even if file doesn't exist in working directory
          force: !0
        }), Z(`✅ Resolved ${r} in git index`);
      } catch (n) {
        me(`❌ Failed to resolve ${r} in git index:`, n);
      }
    return Z("✅ All conflicts resolved in git index"), { success: !0, resolved: !0, conflictedFiles: e };
  } catch (t) {
    return me("❌ Failed to resolve git-only merge conflicts:", t), { success: !1, error: t.message };
  }
}
async function Kr(t, e, r, n = 1, i = 0) {
  me(`Some error happened while ${r}: `, t);
  const a = t && (t.toString().includes("401") || t.toString().includes("403")), o = t && (t.toString().toLowerCase().includes("network") || t.toString().toLowerCase().includes("fetch")), s = t instanceof te.Errors.MergeConflictError || t.toString().includes("MergeConflictError") || t.toString().includes("CheckoutConflictError") || t.toString().includes("merge conflicts");
  if (t && (t.toString().includes("NotFoundError") || t.toString().toLowerCase().includes("could not find head")), a || o)
    throw Z("Authentication or network error detected. Not deleting the repository."), t;
  if (s) {
    Z("Merge conflict detected. Attempting to resolve...");
    try {
      if ((await Ou()).success) {
        Z("Merge conflicts resolved successfully");
        return;
      } else
        throw Z("Merge conflict resolution failed"), t;
    } catch (f) {
      throw me("Error during merge conflict resolution:", f), f;
    }
  }
  const c = e?.attempt || 0;
  if (c < n)
    if (i) {
      const f = await Ru();
      !f && await dy({ ...e, attempt: c + 1 }), f && await uo({ ...e, attempt: c + 1 });
    } else
      await uo({ ...e, attempt: c + 1 });
  else
    throw new Error(`${r} wasn't successful: ${t}`);
}
async function dy(t) {
  const e = t?.attempt + 1 || 1;
  Z(`Attempting hard reset for ${Pt}. Attempt: ${e}`);
  try {
    return await Uu({ dir: oe, ref: "HEAD~1", branch: Ke }), Z(`Hard reset to HEAD~1 successful for ${Pt}`), e;
  } catch (r) {
    throw me(`Error during hard reset for ${Pt}: `, r), r;
  }
}
async function uo(t) {
  const e = t?.attempt + 1 || 1, r = t?.reclone || !1, n = t?.fsName || Pt, i = t?.fsType || Bt;
  try {
    await Tn.deleteFS(n, i), r && await Cu({ ...t, url: t.url, attempt: e });
    return;
  } catch (a) {
    me(`Error during delete, close, and reclone process for ${Pt}: `, a);
  }
}
async function Cu(t) {
  Z("doCloneAndStuff args: ", t);
  let e = !1;
  t?.attempt;
  const r = 1;
  !tt && await Ar(t?.url), await bu(er);
  try {
    let n = !0, i = await Du();
    if (Z("dirExists", i), i && !e) {
      Z("Directory already exists. Using existing directory...");
      let a = await on();
      return await lo(a), { handleNoRefResult: n, message: "exists", success: !0 };
    } else {
      Z("Cloning repository ...");
      const a = await py(t);
      await Tn.createBackupFS(Pt, Bt), Z("createBackupFS created backup"), await an({ fsName: Pt, fsType: Bt });
      let o = await on();
      await lo(o), Z(a, o), a?.data && a?.data?.isCacheUsed && await Ju({
        url: t.url
      }), n = await ly(t), await Pu();
    }
    return await Vu(Bt, "root"), { handleNoRefResult: n, message: "notExist", success: !0 };
  } catch (n) {
    return await Kr(n, t, "doCloneAndStuff", r), { handleNoRefResult: !1, message: "error", success: !1 };
  }
}
async function fo(t) {
  return (await ne.promises.lstat(t)).isDirectory();
}
async function Fu(t) {
  try {
    if (!await fo(t))
      await Kc(t);
    else {
      const e = await ne.promises.readdir(t);
      for (const r of e) {
        const n = `${t}/${r}`;
        await fo(n) ? (await Fu(n), await ne.promises.rmdir(n)) : await Kc(n), await ne.promises.rmdir(t);
      }
    }
  } catch (e) {
    if (e.code === "ENOENT") {
      Z(`File ${t} already deleted, skipping...`);
      return;
    }
    me("Error while removing directory contents:", e);
  }
}
async function Pu() {
  try {
    let t = await Su(), e = await To();
    Z("remoteBranches", t), Z("localBranches", e), e.push("HEAD");
    const r = t.filter((i) => !e.includes(i));
    Z("filteredBranches", r);
    let n = oe === "/" ? "" : oe;
    await Promise.all(
      r.map(async (i) => {
        await Ro({
          ref: i,
          object: n + `/.git/refs/remotes/${Ve}/${i}`
        }), await Oo({
          filePath: n + `/.git/refs/heads/${i}`,
          fileContents: await ne.promises.readFile({ fs: ne, dir: oe, filePath: n + `/.git/refs/remotes/${Ve}/${i}` })
        });
      })
    );
  } catch (t) {
    throw me("Error initializing local branches:", t), t;
  }
}
function Ot(t, e) {
  return !t && !e ? (Z("No username or password provided. Returning empty headers."), {}) : {
    authorization: `Basic ${btoa(`${t}:${e}`)}`
  };
}
async function py(t) {
  try {
    let e;
    if (Gt && Ft)
      try {
        e = await Yr("clone", t);
      } catch (r) {
        Z("Service Worker clone failed, falling back to Web Worker", r), e = await te.clone({
          ...t,
          fs: ne,
          http: Dt,
          dir: oe,
          remote: Ve,
          ref: Ke,
          corsProxy: At,
          depth: er,
          noCheckout: !0,
          singleBranch: !1,
          headers: Ot(ft, wt),
          onAuth() {
            return Je.fill();
          },
          onAuthFailure() {
            return Je.rejected();
          }
        });
      }
    else
      Z("Service Worker not supported, using Web Worker directly"), e = await te.clone({
        ...t,
        fs: ne,
        http: Dt,
        dir: oe,
        remote: Ve,
        ref: Ke,
        corsProxy: At,
        depth: er,
        noCheckout: !0,
        singleBranch: !1,
        headers: Ot(ft, wt),
        onAuth() {
          return Je.fill();
        },
        onAuthFailure() {
          return Je.rejected();
        }
      });
    return e;
  } catch (e) {
    throw me("Some error happened while cloning:", e), e;
  }
}
async function Nu(t) {
  let e = t.split("/").filter((n) => n.trim() !== ""), r = oe.split("/").filter((n) => n.trim() !== "").join("").length;
  return e = e.join("/"), e = oe === "/" ? e : e.slice(r + 1), e;
}
async function wy(t) {
  try {
    let e = await Nu(t.filePath);
    await te.remove({
      fs: ne,
      dir: oe,
      filepath: e
    }), await Fu(t.filePath);
  } catch (e) {
    me("Error while removing the file:", e);
  }
}
async function Kc(t) {
  try {
    await ne.promises.unlink(t);
  } catch (e) {
    me("Error occured while unlinking:", e);
  }
}
async function my(t, e) {
  try {
    if (t === e)
      return;
    await Gu(e), await ne.promises.rename(t, e);
  } catch (r) {
    me("Error occured while renaming filePath:", r);
  }
}
async function Mu(t = {}) {
  try {
    Z("Attempting to retrieve log with the following args:", { ...t, fs: ne, depth: er, dir: oe, ref: Ke });
    const e = await te.log({ ...t, fs: ne, depth: er, dir: oe, ref: Ke });
    return Z("git.log result:", e), e;
  } catch (e) {
    throw me("Error in log:", e), e && typeof e == "object" && Object.keys(e).length > 0 ? (me("Error properties:", Object.keys(e)), me("Full error object:", JSON.stringify(e, null, 2))) : me("An unknown error occurred, and no additional error details are available."), new Error("An unknown error occurred during the log operation");
  }
}
async function $o(t) {
  Z("Starting to push with these args: ", t), t?.attempt;
  let e = t?.ref || Ke;
  try {
    const i = await ne.promises.readFile("/.git/config", "utf8");
  } catch (i) {
    me(i);
  }
  const r = 1, n = t?.force || !0;
  !tt && await Ar(t?.url);
  try {
    await ii(t);
    try {
      if (Gt && Ft)
        try {
          return await Yr("push", t), { success: !0 };
        } catch (i) {
          return Z("Service Worker push failed, falling back to Web Worker", i), await te.push({
            ...t,
            fs: ne,
            http: Dt,
            dir: oe,
            corsProxy: At,
            remote: Ve,
            ref: e,
            force: n,
            headers: Ot(ft, wt),
            onAuth() {
              return Je.fill();
            },
            onAuthFailure() {
              return Je.rejected();
            }
          }), { success: !0 };
        }
      else
        return Z("Service Worker not supported, using Web Worker directly"), await te.push({
          ...t,
          fs: ne,
          http: Dt,
          dir: oe,
          corsProxy: At,
          remote: Ve,
          ref: e,
          force: !0,
          headers: Ot(ft, wt),
          onAuth() {
            return Je.fill();
          },
          onAuthFailure() {
            return Je.rejected();
          }
        }), Z("Pushing was successful."), { success: !0 };
    } catch (i) {
      throw i;
    }
  } catch (i) {
    return me("some error happend while pushing: ", i), await Kr(i, t, "push", r), { success: !1 };
  }
}
async function yy(t = "push") {
  try {
    await zu() && await qu() || (await ju({ username: $n }), await Lu({ email: Bn })), await te.stash({
      fs: ne,
      dir: oe,
      op: t
    });
  } catch (e) {
    me("An error occurred while stashing:", e);
  }
}
async function gy(t) {
  return await te.status({
    fs: ne,
    dir: oe,
    filepath: t?.filePath
  });
}
async function vy(t, e = Ke = "HEAD") {
  ne.writeFile(oe + `/.git/refs/heads/${e}`, t, (r) => {
    if (r) throw r;
    console.log("git reset has successfully done.");
  });
}
async function Uu({ dir: t, ref: e, branch: r }) {
  var n = /^HEAD~([0-9]+)$/, i = e.match(n);
  if (i) {
    var a = +i[1], o = await te.log({ fs: ne, dir: t, depth: a + 1 }), s = o.pop().oid;
    return new Promise((c, f) => {
      ne.writeFile(t + `/.git/refs/heads/${r}`, s, (l) => {
        if (l)
          return f(l);
        ne.unlink(t + "/.git/index", (w) => {
          if (w)
            return f(w);
          te.checkout({ fs: ne, dir: t, ref: r, force: !0 }).then(c);
        });
      });
    });
  }
  return Promise.reject(`Wrong ref ${e}`);
}
async function ju(t) {
  try {
    const e = t?.name ? t?.name : "sampleUser";
    $n = e, await te.setConfig({
      fs: ne,
      dir: oe,
      path: "user.name",
      value: e
    });
  } catch (e) {
    me("An error occurred while setting user name:", e);
  }
}
async function Lu(t) {
  try {
    const e = t?.email ? t?.email : "sampleUser";
    Bn = e, await te.setConfig({
      fs: ne,
      dir: oe,
      path: "user.email",
      value: e
    });
  } catch (e) {
    me("An error occurred while setting email:", e);
  }
}
async function zu() {
  try {
    const t = await te.getConfig({
      fs: ne,
      dir: oe,
      path: "user.email"
    });
    return Z(t), t;
  } catch (t) {
    me("An error occurred while getting email:", t);
  }
}
async function qu() {
  try {
    const t = await te.getConfig({
      fs: ne,
      dir: oe,
      path: "user.name"
    });
    return Z(t), t;
  } catch (t) {
    me("An error occurred while getting username:", t);
  }
}
async function Wu(t = Ve) {
  try {
    return await te.getConfig({
      fs: ne,
      dir: oe,
      path: `remote.${t}.url`
    });
  } catch (e) {
    me("An error occurred while getting remote url:", e);
  }
}
async function _y(t = tt, e = Ve) {
  try {
    await te.setConfig({
      fs: ne,
      dir: oe,
      path: `remote.${e}.url`,
      value: t
    });
  } catch (r) {
    me("An error occurred while setting remote url:", r);
  }
}
async function Hu(t) {
  try {
    const e = await te.getConfig({
      fs: ne,
      dir: oe,
      path: t
    });
    return Z(e), e;
  } catch (e) {
    me("An error occurred while getting config:", e);
  }
}
async function by(t, e, r) {
  try {
    await te.setConfig({
      ...r,
      fs: ne,
      dir: oe,
      path: t,
      value: e
    });
  } catch (n) {
    me("An error occurred while setting config:", n);
  }
}
async function ii(t) {
  try {
    await ju(t), await Lu(t);
  } catch (e) {
    me("An error occurred while setting configs:", e);
  }
}
async function Ey(t = "HEAD") {
  return await te.resolveRef({
    fs: ne,
    dir: oe,
    ref: t
  });
}
async function Sy(t) {
  return await te.readCommit({
    fs: ne,
    dir: oe,
    oid: t
  });
}
async function ky(t) {
  await te.writeCommit({
    fs: ne,
    dir: oe,
    commit: t
  });
}
async function xy(t, e = "refs/heads/main") {
  await te.writeRef({
    fs: ne,
    dir: oe,
    ref: e,
    value: t
  });
}
async function Ay(t = "") {
  await Zt.commitStagedChanges(ne, oe);
}
async function Iy(t, e = "staged") {
  try {
    Z(`[GITWorker] Reading file: ${t}`), Z("Current FS state:", { fs: ne, fsName: Pt, fsType: Bt, fsArgs: Io });
    const r = await ne.promises.readdir("/");
    Z("Root directory contents:", r);
    const n = await Zt.readFileDot(ne, oe, t, e);
    return Z(`[GITWorker] Successfully read file: ${t}`), n;
  } catch (r) {
    throw me(`[GITWorker] Failed to read file ${t}:`, r), new Error(`Failed to read file: ${r.message}`);
  }
}
async function Jc(t, e = "staged") {
  try {
    Z(`[GITWorker] Reading directory: ${t}`);
    const r = await Zt.readDirDot(ne, oe, t, e);
    return Z(`[GITWorker] Directory contents for ${t}:`, r), Z("ATTACK: ", await Zu()), r;
  } catch (r) {
    throw me(`[GITWorker] Failed to read directory ${t}:`, r), new Error(`Failed to read directory: ${r.message}`);
  }
}
async function Qc(t) {
  try {
    Z(`[GITWorker] Checking if path is directory: ${t}`);
    const e = await Zt.isDirectoryDot(ne, oe, t);
    return Z(`[GITWorker] Path ${t} is directory:`, e), e;
  } catch (e) {
    throw me(`[GITWorker] Failed to check directory status for ${t}:`, e), new Error(`Failed to check directory: ${e.message}`);
  }
}
async function Bo(t = 1) {
  try {
    Z("[GITWorker] Listing all files");
    const e = await Zt.listFilesDot(ne, oe, t);
    return Z("[GITWorker] File list:", e), e;
  } catch (e) {
    throw me("[GITWorker] Failed to list files:", e), new Error(`Failed to list files: ${e.message}`);
  }
}
async function Ry(t, e, r = 1) {
  try {
    Z(`[GITWorker] Writing to file: ${t}`);
    const n = await Zt.writeFileDot(
      ne,
      oe,
      t,
      e,
      $n,
      Bn,
      r
    );
    let i = n.blobOid;
    return await xt(ne, oe, "add", "inode", {
      oid: i,
      filepath: t,
      customMetadata: {
        size: e.length,
        operation: "write",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    }).catch((a) => me("Note addition failed:", a)), Z(`[GITWorker] Successfully wrote to file: ${t}`), n;
  } catch (n) {
    throw me(`[GITWorker] Failed to write to file ${t}:`, n), new Error(`Failed to write file: ${n.message}`);
  }
}
async function Gu(t, e = 1) {
  try {
    Z(`[GITWorker] Creating directory: ${t}`);
    const r = await Zt.mkdirDot(ne, oe, t, $n, Bn, e);
    let n = r.treeOid;
    return await xt(ne, oe, "add", "dentry", {
      oid: n,
      filepath: t,
      customMetadata: {
        operation: "create",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    }), Z(`[GITWorker] Successfully created directory: ${t}`), r;
  } catch (r) {
    throw me(`[GITWorker] Failed to create directory ${t}:`, r), new Error(`Failed to create directory: ${r.message}`);
  }
}
async function Ty(t) {
  const e = t.split("/").filter((n) => n.trim() !== "");
  let r = "";
  for (const n of e) {
    r === "/" ? r += n : r += "/" + n;
    try {
      Z("recur", r), await ne.promises.mkdir(r);
    } catch (i) {
      i.code === "EEXIST" || me(`Error creating directory: ${r}`, i);
    }
  }
}
async function $y(t, e = 1) {
  try {
    Z(`[GITWorker] Removing file: ${t}`);
    const r = await Zt.removeFileDot(ne, oe, t, e);
    return Z(`[GITWorker] Successfully removed file: ${t}`), r;
  } catch (r) {
    throw me(`[GITWorker] Failed to remove file ${t}:`, r), new Error(`Failed to remove file: ${r.message}`);
  }
}
async function By(t, e = 1) {
  try {
    Z(`[GITWorker] Removing directory: ${t}`);
    const r = await Zt.removeDirDot(ne, oe, t, e);
    return Z(`[GITWorker] Successfully removed directory: ${t}`), r;
  } catch (r) {
    throw me(`[GITWorker] Failed to remove directory ${t}:`, r), new Error(`Failed to remove directory: ${r.message}`);
  }
}
async function Dy(t) {
  try {
    if (Z("entering with path : ", t), t === "/")
      return await xt(ne, oe, "read", "superblock", { oid: "HEAD", fsType: Bt }).catch(() => null);
    {
      let e = await Yu(t);
      return await Oy(e.oid, "commits");
    }
  } catch (e) {
    throw me(`Failed to get note for ${t}:`, e), e;
  }
}
async function Oy(t, e) {
  try {
    return await xt(ne, oe, "read", e, { oid: t });
  } catch (r) {
    if (r.message?.includes("Note not found"))
      return null;
    throw r;
  }
}
async function Zu(t = !0) {
  try {
    const [e, r] = await Promise.all([
      xt(ne, oe, "list"),
      xt(ne, oe, "read", "superblock", { oid: "HEAD", fsType: Bt }).catch(() => null)
    ]);
    let n = [];
    if (t) {
      e.forEach((a) => {
        n.push(xt(ne, oe, "read", "commits", { oid: a.target }));
      });
      const i = await Promise.all(n);
      return { listOfNotes: e, detailed: i, superblock: r };
    }
  } catch (e) {
    throw me("Failed to list notes:", e), e;
  }
}
async function Vu(t = "memory", e = "root") {
  try {
    Z("[GITWorker] Initializing repository notes");
    let r = await te.resolveRef({ fs: ne, dir: oe, ref: "HEAD" });
    try {
      await xt(ne, oe, "read", "superblock", { oid: "HEAD", fsType: t }), Z("Superblock note already exists");
    } catch {
      await xt(ne, oe, "add", "superblock", {
        oid: "HEAD",
        fsType: t,
        customMetadata: {
          owner: e,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          block_size: 4096,
          features: []
        }
      }), Z("Created superblock note");
    }
    try {
      await xt(ne, oe, "read", "dentry", { oid: r }), Z("Root directory note already exists");
    } catch {
      await xt(ne, oe, "add", "dentry", {
        oid: r,
        customMetadata: {
          is_root: !0,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          name: "/",
          parent_inode: 0,
          mode: "040755"
        }
      }), Z("Created root directory note");
    }
    return Z("[GITWorker] Repository notes initialized"), !0;
  } catch (r) {
    throw me("[GITWorker] Failed to initialize notes:", r), new Error(`Failed to initialize notes: ${r.message}`);
  }
}
async function Xu(t = ft) {
  Z("[GITWorker] Starting ensureAllFilesHaveNotes..."), Z(`[GITWorker] Owner: ${t}`);
  let e = [], r = [];
  try {
    Z("[GITWorker] Listing all files in the repository..."), e = await Bo(1), Z(`[GITWorker] Total files/directories found: ${e.length}`);
  } catch (a) {
    return me("[GITWorker] Failed to list files:", a), 0;
  }
  const n = /* @__PURE__ */ new Map();
  Z("[GITWorker] Building file map...");
  for (const a of e)
    n.set(a.path, a), Z(`[GITWorker] Mapped: ${a.path} (type: ${a.type}, oid: ${a.oid})`);
  try {
    const a = await Zu();
    Z("[GITWorker] notes list: ", a), a.listOfNotes.forEach((o) => r.push(o.target)), Z("[GITWorker] notes list: ", r);
  } catch (a) {
    me(a);
  }
  const i = [];
  Z("[GITWorker] Checking for missing notes...");
  for (const a of e) {
    const { path: o, type: s, oid: c } = a, f = s === "tree" ? "dentry" : "inode";
    if (!c) {
      me(`[GITWorker] Skipping ${o}: missing OID.`);
      continue;
    }
    Z(`[GITWorker] Checking for existing ${f} note for ${o}...`);
    try {
      !(a.oid in r) && i.push({ path: o, type: f, oid: c });
    } catch (l) {
      Z(`[GITWorker] Error fetching note for ${o}. Assuming missing.`, l), i.push({ path: o, type: f, oid: c });
    }
  }
  Z(`[GITWorker] Total missing notes: ${i.length}`, i);
  for (const { path: a, type: o, oid: s } of i) {
    Z(`[GITWorker] Adding ${o} note for ${a}...`);
    const c = {
      owner: t,
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      operation: "auto-generated",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (o === "dentry") {
      const f = a.split("/"), l = f.slice(0, -1).join("/") || "/";
      if (f.length === 1)
        try {
          const w = "HEAD";
          c.parentOid = w;
        } catch {
          c.parentOid = "HEAD";
        }
      else {
        const w = n.get(l);
        if (w)
          try {
            const m = w.oid;
            c.parentOid = m || "HEAD";
          } catch {
            c.parentOid = "HEAD";
          }
        else
          c.parentOid = "HEAD";
      }
    }
    try {
      await xt(ne, oe, "add", o, {
        oid: s,
        filepath: a,
        customMetadata: c
      }), Z(`[GITWorker] Successfully added ${o} note for ${a}`);
    } catch (f) {
      me(`[GITWorker] Failed to add ${o} note for ${a}`, f);
    }
  }
  return Z(`[GITWorker] ensureAllFilesHaveNotes completed. Total notes added: ${i.length}`), i.length;
}
async function Cy() {
  try {
    Z("[GITWorker] Checking for local notes");
    const t = await xt(ne, oe, "list");
    return t.length > 0 ? (Z("[GITWorker] Local notes found:", t), !0) : (Z("[GITWorker] No local notes found"), !1);
  } catch (t) {
    throw me("[GITWorker] Failed to check for local notes:", t), new Error(`Failed to check for local notes: ${t.message}`);
  }
}
async function Yu(t) {
  try {
    Z(`[GITWorker] Searching git history for: ${t}`);
    const e = await Zt.findInGitHistory(ne, oe, t);
    return Z(`[GITWorker] Found git history for ${t}:`, e), e;
  } catch (e) {
    throw me(`[GITWorker] Failed to search git history for ${t}:`, e), new Error(`Failed to search git history: ${e.message}`);
  }
}
async function Ku(t) {
  t?.attempt;
  const e = 1;
  !tt && await Ar(t?.url);
  try {
    await ii(t);
    try {
      if (Gt && Ft)
        try {
          return await Yr("pull", t), { success: !0 };
        } catch (r) {
          return Z("Service Worker pull failed, falling back to Web Worker", r), await te.pull({
            ...t,
            fs: ne,
            http: Dt,
            dir: oe,
            corsProxy: At,
            remote: Ve,
            url: tt,
            remoteRef: Ke,
            fastForward: !0,
            fastForwardOnly: !1,
            forced: !0,
            noCheckout: !0,
            // Ensure this is true to prevent file checkout
            singleBranch: !1,
            // Consider adding this to match clone behavior
            headers: Ot(ft, wt),
            onAuth() {
              return Je.fill();
            },
            onAuthFailure() {
              return Je.rejected();
            }
          }), { success: !0 };
        }
      else
        return Z("Service Worker not supported, using Web Worker directly"), await te.pull({
          ...t,
          fs: ne,
          http: Dt,
          dir: oe,
          corsProxy: At,
          remote: Ve,
          remoteRef: Ke,
          fastForward: !0,
          fastForwardOnly: !1,
          forced: !0,
          noCheckout: !0,
          // Ensure this is true to prevent file checkout
          singleBranch: !1,
          // Consider adding this to match clone behavior
          headers: Ot(ft, wt),
          onAuth() {
            return Je.fill();
          },
          onAuthFailure() {
            return Je.rejected();
          }
        }), { success: !0 };
    } catch (r) {
      throw r;
    }
  } catch (r) {
    return me("some error happend while pulling: ", r), await Kr(r, t, "pull", e), { success: !1 };
  }
}
async function Ju(t) {
  t?.attempt;
  const e = 1;
  try {
    if (!tt && await Ar(t?.url), Gt && Ft)
      try {
        return await Yr("fastForward", t), { success: !0 };
      } catch (r) {
        return Z("Service Worker fastForward failed, falling back to Web Worker", r), await te.fastForward({
          ...t,
          fs: ne,
          http: Dt,
          dir: oe,
          remote: Ve,
          corsProxy: At,
          ref: Ke,
          remoteref: Ke,
          forced: !0,
          headers: Ot(ft, wt),
          onAuth() {
            return Je.fill();
          },
          onAuthFailure() {
            return Je.rejected();
          }
        }), { success: !0 };
      }
    else
      return Z("Service Worker not supported, using Web Worker directly"), await te.fastForward({
        ...t,
        fs: ne,
        http: Dt,
        dir: oe,
        remote: Ve,
        corsProxy: At,
        ref: Ke,
        remoteref: Ke,
        forced: !0,
        headers: Ot(ft, wt),
        onAuth() {
          return Je.fill();
        },
        onAuthFailure() {
          return Je.rejected();
        }
      }), { success: !0 };
  } catch (r) {
    return Z("This error occured while fast-forwarding: ", r), await Kr(r, t, "fastForward", e), { success: !1 };
  }
}
async function ai(t) {
  try {
    Z("addFile log", t);
    let e = await Nu(t.filePath);
    await te.add({
      fs: ne,
      dir: oe,
      filepath: e
    });
  } catch (e) {
    me("An error occurred while adding the file(s):", e);
  }
}
async function Qu() {
  try {
    const t = await ef();
    Z("changedFiles", t);
    for (let e in t)
      t[e].includes("deleted") ? await wy({ filePath: e }) : await ai({ filePath: e });
  } catch (t) {
    me("Error adding all changed files:", t);
  }
}
async function Fy(t) {
  try {
    await Oo(t), await ai(t);
  } catch (e) {
    me("Error adding file to staging area:", e);
  }
}
async function Do(t) {
  try {
    const e = t?.username || ft, r = t?.email || "sample@email.com";
    await te.commit({
      fs: ne,
      dir: oe,
      author: {
        name: e,
        email: r
      },
      message: t.commitMessage || "Commit by dnegar"
    });
  } catch (e) {
    Z("This error occured while commiting: ", e);
  }
}
async function Py(t) {
  try {
    return await ne.promises.readdir(t);
  } catch (e) {
    throw me("Error reading directory:", e), e;
  }
}
async function Oo(t) {
  try {
    await ne.promises.writeFile(t.filePath, t.fileContents, "utf8");
  } catch (e) {
    me("an error happend while writing to file:", e);
  }
}
async function ef() {
  let n = await te.statusMatrix({ fs: ne, dir: oe });
  return n = n.filter((i) => i[1] !== i[2] || i[1] !== i[3]), await tf(n);
}
async function Ny() {
  let n = await te.statusMatrix({ fs: ne, dir: oe });
  return n = n.filter((i) => i[2] !== i[3] || i[1] !== i[3]), await tf(n);
}
async function tf(t) {
  const r = {
    "003": "added, staged, deleted unstaged",
    "020": "new, untracked",
    "022": "added, staged",
    "023": "added, staged, with unstaged changes",
    100: "deleted, staged",
    101: "deleted, unstaged",
    103: "modified, staged, deleted unstaged",
    111: "unmodified",
    121: "modified, unstaged",
    122: "modified, staged",
    123: "modified, staged, with unstaged changes"
  };
  try {
    const n = {};
    return t.forEach((i) => {
      const a = i[0], o = r[i.slice(1).join("")];
      oe !== "/" ? n[oe + "/" + a] = o : n[oe + a] = o;
    }), Z(n), n;
  } catch (n) {
    me("Error getting changed files list:", n);
  }
}
function My(t) {
  return {
    message: t.message,
    stack: t.stack,
    name: t.name,
    code: t.code
  };
}
function en(t) {
  if (!(t === void 0 || typeof t == "function")) {
    if (t instanceof Error)
      return My(t);
    if (Array.isArray(t))
      return t.map(en);
    if (t && typeof t == "object") {
      const e = {};
      for (const r in t)
        e[r] = en(t[r]);
      return e;
    }
    return t;
  }
}
const el = {
  setFs: an,
  doCloneAndStuff: Cu,
  doFetch: (t) => xu(t),
  doPushFile: ry,
  doPushAll: ny,
  addFile: ({ filePath: t }) => ai({ filePath: t }),
  commit: ({ username: t, email: e, commitMessage: r }) => Do({ username: t, email: e, commitMessage: r }),
  push: ({ url: t, remote: e, ref: r, force: n = !0 }) => $o({ url: t, remote: e, ref: r, force: n }),
  pull: ({ url: t, remote: e, ref: r }) => Ku({ url: t, remote: e, ref: r }),
  addDot: Qu,
  merge: ({ ours: t, theirs: e, strategy: r }) => ay(t, e, r),
  addFileToStaging: Fy,
  commitStagedChanges: Ay,
  status: gy,
  log: Mu,
  listRemotes: Bu,
  listBranches: To,
  checkoutBranch: ({ ref: t }) => Xm(t),
  currentBranch: on,
  currentRemote: Km,
  createBranch: (t) => Ro(t),
  setRemote: ({ remote: t }) => Eu(t),
  setRemoteUrl: ({ url: t, remote: e }) => _y(t, e),
  getRemoteUrl: ({ remote: t }) => Wu(t),
  getRemote: ({ remote: t }) => Gm(),
  getRemoteCommitInLocalRepo: ({ remote: t }) => sy(),
  getChangedFilesList: ef,
  getCommitHistoryFromReplica: oy,
  getLatestRemoteCommit: ({ url: t, remote: e }) => Iu({ url: t, remote: e }),
  getLastLocalCommit: ({ ref: t }) => Tu(t),
  handleDeleteCloseAndReclone: ({ args: t }) => uo(t),
  isSync: ({ url: t }) => Ru(t),
  hardReset: Uu,
  softReset: ({ commitHash: t, branch: e }) => vy(t, e),
  addRemote: ({ url: t, remote: e }) => $u(t, e),
  deleteRemote: ({ remote: t }) => cy(t),
  findMergeBase: ({ oids: t }) => hy(t),
  findInGitHistory: Yu,
  resolveMergeConflict: Ou,
  fastForward: Ju,
  setConfigs: ii,
  setUrl: ({ url: t }) => Ar(t),
  setCorsProxy: ({ corsProxy: t }) => Wm(t),
  setSWUsage: ({ useSW: t }) => Lm(t),
  setDir: ({ dir: t }) => zm(t),
  setDepth: ({ depth: t }) => bu(t),
  setRef: ({ ref: t }) => lo(t),
  setAuthParams: ({ username: t, password: e }) => Hm(t, e),
  setSettingsAddresses: Zm,
  addToSetting: ty,
  stash: ({ operation: t }) => yy(t),
  readFileDot: ({ filePath: t, commitOid: e = "staged" }) => Iy(t, e),
  writeFileDot: ({ filePath: t, fileContent: e, doCommit: r = 1 }) => Ry(t, e, r),
  readDirDot: ({ path: t, commitOid: e = "staged" }) => Jc(t, e),
  isDirectoryDot: ({ path: t }) => Qc(t),
  listFilesDot: ({ listDirs: t = 1 }) => Bo(t),
  mkdirDot: ({ dirPath: t, doCommit: e = 1 }) => Gu(t, e),
  mkdirRecursive: ({ path: t }) => Ty(t),
  removeDirDot: ({ dirPath: t, doCommit: e = 1 }) => By(t, e),
  removeFileDot: ({ filePath: t, doCommit: e = 1 }) => $y(t, e),
  rename: ({ oldPath: t, newPath: e }) => my(t, e),
  listServerRefs: ({ args: t }) => Au(t),
  getUsername: qu,
  getEmail: zu,
  getConfig: ({ path: t }) => Hu(t),
  setConfig: ({ path: t, value: e, args: r }) => by(t, e, r),
  resolveRef: ({ ref: t }) => Ey(t),
  readCommit: ({ head: t }) => Sy(t),
  writeCommit: ky,
  writeRef: xy,
  init: uy,
  isDirectory: ({ path: t }) => fo(t),
  isDirectoryDot: ({ path: t }) => Qc(t),
  readdir: ({ path: t }) => Py(t),
  readDirDot: ({ path: t }) => Jc(t),
  getFileStoresFromDatabases: Vm,
  checkForLocalNotes: Cy,
  getPathNote: ({ path: t }) => Dy(t),
  ensureAllFilesHaveNotes: ({ owner: t }) => Xu(t)
};
let rf;
const Uy = new Promise((t) => {
  rf = t;
}), nf = {
  execute: async (t, e = {}) => {
    try {
      const r = el[t];
      if (!r) throw new Error(`Unknown operation: ${t}`);
      const n = en(e), i = await r(n);
      return en(i);
    } catch (r) {
      throw en(r);
    }
  },
  // Special case for ready check
  ready: () => Uy,
  // Maintain backward compatibility with direct method calls
  // by proxying them to execute()
  ...Object.fromEntries(
    Object.keys(el).map((t) => [
      t,
      async (e) => nf.execute(t, e)
    ])
  )
};
rf();
jm.set("workerThread", nf);
Z("Worker initialized and ready");
//# sourceMappingURL=gitWorker.js.map
