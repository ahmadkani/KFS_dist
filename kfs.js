import { L as E, c as m } from "./configES6-cRERl-FC.js";
import { serviceWorker as ln } from "./sw-register.js";
var k = function(s) {
  var n = this;
  this.rpc_counter = 0, this.channel = s, this.foreign = /* @__PURE__ */ new Map(), this.local = /* @__PURE__ */ new Map(), this.calls = /* @__PURE__ */ new Map(), this.queue = [], this.connectionEstablished = !1, this.channel.addEventListener("message", function(e) {
    var t = e.data;
    if (t && typeof t == "object") switch (t.type) {
      case "MP_INIT":
        return n.onInit(t);
      case "MP_SET":
        return n.onSet(t);
      case "MP_CALL":
        return n.onCall(t);
      case "MP_RETURN":
        return n.onReturn(t);
    }
  }), this.channel.postMessage({ type: "MP_INIT", id: 1, reply: !0 });
};
k.prototype.onInit = function(s) {
  this.connectionEstablished = !0;
  var n = this.queue;
  this.queue = [];
  for (var e = 0, t = n; e < t.length; e += 1)
    this.channel.postMessage(t[e]);
  s.reply && this.channel.postMessage({ type: "MP_INIT", reply: !1 });
}, k.prototype.onSet = function(s) {
  for (var n = this, e = {}, t = s.object, r = function() {
    var l = a[i], d = !s.void.includes(l);
    e[l] = function() {
      for (var _ = [], y = arguments.length; y--; ) _[y] = arguments[y];
      return n.rpc_counter = (n.rpc_counter + 1) % Number.MAX_SAFE_INTEGER, new Promise(function(v, I) {
        n.postMessage({ type: "MP_CALL", object: t, method: l, id: n.rpc_counter, args: _, reply: d }), d ? n.calls.set(n.rpc_counter, { resolve: v, reject: I }) : v();
      });
    };
  }, i = 0, a = s.methods; i < a.length; i += 1) r();
  var c = this.foreign.get(s.object);
  this.foreign.set(s.object, e), typeof c == "function" && c(e);
}, k.prototype.onCall = function(s) {
  var n = this, e = this.local.get(s.object);
  e && e[s.method].apply(e, s.args).then(function(t) {
    return s.reply && n.channel.postMessage({ type: "MP_RETURN", id: s.id, result: t });
  }).catch(function(t) {
    return n.channel.postMessage({ type: "MP_RETURN", id: s.id, error: t.message });
  });
}, k.prototype.onReturn = function(s) {
  if (this.calls.has(s.id)) {
    var n = this.calls.get(s.id), e = n.resolve, t = n.reject;
    this.calls.clear(s.id), s.error ? t(s.error) : e(s.result);
  }
}, k.prototype.postMessage = function(s) {
  this.connectionEstablished ? this.channel.postMessage(s) : this.queue.push(s);
}, k.prototype.set = function(s, n, e) {
  e === void 0 && (e = {}), this.local.set(s, n);
  var t = Object.entries(n).filter(function(r) {
    return typeof r[1] == "function";
  }).map(function(r) {
    return r[0];
  });
  this.postMessage({ type: "MP_SET", object: s, methods: t, void: e.void || [] });
}, k.prototype.get = function(s) {
  return new Promise(function(n, e) {
    var t = this;
    return this.foreign.has(s) ? n(this.foreign.get(s)) : n(new Promise(function(r, i) {
      return t.foreign.set(s, r);
    }));
  }.bind(this));
};
function G(s) {
  var n = new k(s);
  Object.defineProperties(this, { get: { writable: !1, configurable: !1, value: n.get.bind(n) }, set: { writable: !1, configurable: !1, value: n.set.bind(n) } });
}
const O = `var er = function(t) {
  var e = this;
  this.rpc_counter = 0, this.channel = t, this.foreign = /* @__PURE__ */ new Map(), this.local = /* @__PURE__ */ new Map(), this.calls = /* @__PURE__ */ new Map(), this.queue = [], this.connectionEstablished = !1, this.channel.addEventListener("message", function(r) {
    var i = r.data;
    if (i && typeof i == "object") switch (i.type) {
      case "MP_INIT":
        return e.onInit(i);
      case "MP_SET":
        return e.onSet(i);
      case "MP_CALL":
        return e.onCall(i);
      case "MP_RETURN":
        return e.onReturn(i);
    }
  }), this.channel.postMessage({ type: "MP_INIT", id: 1, reply: !0 });
};
er.prototype.onInit = function(t) {
  this.connectionEstablished = !0;
  var e = this.queue;
  this.queue = [];
  for (var r = 0, i = e; r < i.length; r += 1)
    this.channel.postMessage(i[r]);
  t.reply && this.channel.postMessage({ type: "MP_INIT", reply: !1 });
}, er.prototype.onSet = function(t) {
  for (var e = this, r = {}, i = t.object, n = function() {
    var l = o[a], f = !t.void.includes(l);
    r[l] = function() {
      for (var u = [], m = arguments.length; m--; ) u[m] = arguments[m];
      return e.rpc_counter = (e.rpc_counter + 1) % Number.MAX_SAFE_INTEGER, new Promise(function(g, y) {
        e.postMessage({ type: "MP_CALL", object: i, method: l, id: e.rpc_counter, args: u, reply: f }), f ? e.calls.set(e.rpc_counter, { resolve: g, reject: y }) : g();
      });
    };
  }, a = 0, o = t.methods; a < o.length; a += 1) n();
  var s = this.foreign.get(t.object);
  this.foreign.set(t.object, r), typeof s == "function" && s(r);
}, er.prototype.onCall = function(t) {
  var e = this, r = this.local.get(t.object);
  r && r[t.method].apply(r, t.args).then(function(i) {
    return t.reply && e.channel.postMessage({ type: "MP_RETURN", id: t.id, result: i });
  }).catch(function(i) {
    return e.channel.postMessage({ type: "MP_RETURN", id: t.id, error: i.message });
  });
}, er.prototype.onReturn = function(t) {
  if (this.calls.has(t.id)) {
    var e = this.calls.get(t.id), r = e.resolve, i = e.reject;
    this.calls.clear(t.id), t.error ? i(t.error) : r(t.result);
  }
}, er.prototype.postMessage = function(t) {
  this.connectionEstablished ? this.channel.postMessage(t) : this.queue.push(t);
}, er.prototype.set = function(t, e, r) {
  r === void 0 && (r = {}), this.local.set(t, e);
  var i = Object.entries(e).filter(function(n) {
    return typeof n[1] == "function";
  }).map(function(n) {
    return n[0];
  });
  this.postMessage({ type: "MP_SET", object: t, methods: i, void: r.void || [] });
}, er.prototype.get = function(t) {
  return new Promise(function(e, r) {
    var i = this;
    return this.foreign.has(t) ? e(this.foreign.get(t)) : e(new Promise(function(n, a) {
      return i.foreign.set(t, n);
    }));
  }.bind(this));
};
function xc(t) {
  var e = new er(t);
  Object.defineProperties(this, { get: { writable: !1, configurable: !1, value: e.get.bind(e) }, set: { writable: !1, configurable: !1, value: e.set.bind(e) } });
}
var Po = {}, Ci = {};
Ci.byteLength = Tc;
Ci.toByteArray = Bc;
Ci.fromByteArray = Dc;
var Pt = [], Rt = [], Sc = typeof Uint8Array < "u" ? Uint8Array : Array, Wi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var br = 0, Ic = Wi.length; br < Ic; ++br)
  Pt[br] = Wi[br], Rt[Wi.charCodeAt(br)] = br;
Rt[45] = 62;
Rt[95] = 63;
function jo(t) {
  var e = t.length;
  if (e % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var r = t.indexOf("=");
  r === -1 && (r = e);
  var i = r === e ? 0 : 4 - r % 4;
  return [r, i];
}
function Tc(t) {
  var e = jo(t), r = e[0], i = e[1];
  return (r + i) * 3 / 4 - i;
}
function Rc(t, e, r) {
  return (e + r) * 3 / 4 - r;
}
function Bc(t) {
  var e, r = jo(t), i = r[0], n = r[1], a = new Sc(Rc(t, i, n)), o = 0, s = n > 0 ? i - 4 : i, l;
  for (l = 0; l < s; l += 4)
    e = Rt[t.charCodeAt(l)] << 18 | Rt[t.charCodeAt(l + 1)] << 12 | Rt[t.charCodeAt(l + 2)] << 6 | Rt[t.charCodeAt(l + 3)], a[o++] = e >> 16 & 255, a[o++] = e >> 8 & 255, a[o++] = e & 255;
  return n === 2 && (e = Rt[t.charCodeAt(l)] << 2 | Rt[t.charCodeAt(l + 1)] >> 4, a[o++] = e & 255), n === 1 && (e = Rt[t.charCodeAt(l)] << 10 | Rt[t.charCodeAt(l + 1)] << 4 | Rt[t.charCodeAt(l + 2)] >> 2, a[o++] = e >> 8 & 255, a[o++] = e & 255), a;
}
function $c(t) {
  return Pt[t >> 18 & 63] + Pt[t >> 12 & 63] + Pt[t >> 6 & 63] + Pt[t & 63];
}
function Ac(t, e, r) {
  for (var i, n = [], a = e; a < r; a += 3)
    i = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (t[a + 2] & 255), n.push($c(i));
  return n.join("");
}
function Dc(t) {
  for (var e, r = t.length, i = r % 3, n = [], a = 16383, o = 0, s = r - i; o < s; o += a)
    n.push(Ac(t, o, o + a > s ? s : o + a));
  return i === 1 ? (e = t[r - 1], n.push(
    Pt[e >> 2] + Pt[e << 4 & 63] + "=="
  )) : i === 2 && (e = (t[r - 2] << 8) + t[r - 1], n.push(
    Pt[e >> 10] + Pt[e >> 4 & 63] + Pt[e << 2 & 63] + "="
  )), n.join("");
}
var Qn = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
Qn.read = function(t, e, r, i, n) {
  var a, o, s = n * 8 - i - 1, l = (1 << s) - 1, f = l >> 1, u = -7, m = r ? n - 1 : 0, g = r ? -1 : 1, y = t[e + m];
  for (m += g, a = y & (1 << -u) - 1, y >>= -u, u += s; u > 0; a = a * 256 + t[e + m], m += g, u -= 8)
    ;
  for (o = a & (1 << -u) - 1, a >>= -u, u += i; u > 0; o = o * 256 + t[e + m], m += g, u -= 8)
    ;
  if (a === 0)
    a = 1 - f;
  else {
    if (a === l)
      return o ? NaN : (y ? -1 : 1) * (1 / 0);
    o = o + Math.pow(2, i), a = a - f;
  }
  return (y ? -1 : 1) * o * Math.pow(2, a - i);
};
Qn.write = function(t, e, r, i, n, a) {
  var o, s, l, f = a * 8 - n - 1, u = (1 << f) - 1, m = u >> 1, g = n === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, y = i ? 0 : a - 1, E = i ? 1 : -1, A = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
  for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, o = u) : (o = Math.floor(Math.log(e) / Math.LN2), e * (l = Math.pow(2, -o)) < 1 && (o--, l *= 2), o + m >= 1 ? e += g / l : e += g * Math.pow(2, 1 - m), e * l >= 2 && (o++, l /= 2), o + m >= u ? (s = 0, o = u) : o + m >= 1 ? (s = (e * l - 1) * Math.pow(2, n), o = o + m) : (s = e * Math.pow(2, m - 1) * Math.pow(2, n), o = 0)); n >= 8; t[r + y] = s & 255, y += E, s /= 256, n -= 8)
    ;
  for (o = o << n | s, f += n; f > 0; t[r + y] = o & 255, y += E, o /= 256, f -= 8)
    ;
  t[r + y - E] |= A * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(t) {
  const e = Ci, r = Qn, i = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  t.Buffer = u, t.SlowBuffer = M, t.INSPECT_MAX_BYTES = 50;
  const n = 2147483647;
  t.kMaxLength = n;
  const { Uint8Array: a, ArrayBuffer: o, SharedArrayBuffer: s } = globalThis;
  u.TYPED_ARRAY_SUPPORT = l(), !u.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by \`buffer\` v5.x. Use \`buffer\` v4.x if you require old browser support."
  );
  function l() {
    try {
      const k = new a(1), c = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(c, a.prototype), Object.setPrototypeOf(k, c), k.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(u.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (u.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(u.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (u.isBuffer(this))
        return this.byteOffset;
    }
  });
  function f(k) {
    if (k > n)
      throw new RangeError('The value "' + k + '" is invalid for option "size"');
    const c = new a(k);
    return Object.setPrototypeOf(c, u.prototype), c;
  }
  function u(k, c, d) {
    if (typeof k == "number") {
      if (typeof c == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return E(k);
    }
    return m(k, c, d);
  }
  u.poolSize = 8192;
  function m(k, c, d) {
    if (typeof k == "string")
      return A(k, c);
    if (o.isView(k))
      return I(k);
    if (k == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof k
      );
    if (Ze(k, o) || k && Ze(k.buffer, o) || typeof s < "u" && (Ze(k, s) || k && Ze(k.buffer, s)))
      return T(k, c, d);
    if (typeof k == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const v = k.valueOf && k.valueOf();
    if (v != null && v !== k)
      return u.from(v, c, d);
    const C = D(k);
    if (C) return C;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof k[Symbol.toPrimitive] == "function")
      return u.from(k[Symbol.toPrimitive]("string"), c, d);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof k
    );
  }
  u.from = function(k, c, d) {
    return m(k, c, d);
  }, Object.setPrototypeOf(u.prototype, a.prototype), Object.setPrototypeOf(u, a);
  function g(k) {
    if (typeof k != "number")
      throw new TypeError('"size" argument must be of type number');
    if (k < 0)
      throw new RangeError('The value "' + k + '" is invalid for option "size"');
  }
  function y(k, c, d) {
    return g(k), k <= 0 ? f(k) : c !== void 0 ? typeof d == "string" ? f(k).fill(c, d) : f(k).fill(c) : f(k);
  }
  u.alloc = function(k, c, d) {
    return y(k, c, d);
  };
  function E(k) {
    return g(k), f(k < 0 ? 0 : P(k) | 0);
  }
  u.allocUnsafe = function(k) {
    return E(k);
  }, u.allocUnsafeSlow = function(k) {
    return E(k);
  };
  function A(k, c) {
    if ((typeof c != "string" || c === "") && (c = "utf8"), !u.isEncoding(c))
      throw new TypeError("Unknown encoding: " + c);
    const d = U(k, c) | 0;
    let v = f(d);
    const C = v.write(k, c);
    return C !== d && (v = v.slice(0, C)), v;
  }
  function R(k) {
    const c = k.length < 0 ? 0 : P(k.length) | 0, d = f(c);
    for (let v = 0; v < c; v += 1)
      d[v] = k[v] & 255;
    return d;
  }
  function I(k) {
    if (Ze(k, a)) {
      const c = new a(k);
      return T(c.buffer, c.byteOffset, c.byteLength);
    }
    return R(k);
  }
  function T(k, c, d) {
    if (c < 0 || k.byteLength < c)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (k.byteLength < c + (d || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let v;
    return c === void 0 && d === void 0 ? v = new a(k) : d === void 0 ? v = new a(k, c) : v = new a(k, c, d), Object.setPrototypeOf(v, u.prototype), v;
  }
  function D(k) {
    if (u.isBuffer(k)) {
      const c = P(k.length) | 0, d = f(c);
      return d.length === 0 || k.copy(d, 0, 0, c), d;
    }
    if (k.length !== void 0)
      return typeof k.length != "number" || vt(k.length) ? f(0) : R(k);
    if (k.type === "Buffer" && Array.isArray(k.data))
      return R(k.data);
  }
  function P(k) {
    if (k >= n)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + n.toString(16) + " bytes");
    return k | 0;
  }
  function M(k) {
    return +k != k && (k = 0), u.alloc(+k);
  }
  u.isBuffer = function(c) {
    return c != null && c._isBuffer === !0 && c !== u.prototype;
  }, u.compare = function(c, d) {
    if (Ze(c, a) && (c = u.from(c, c.offset, c.byteLength)), Ze(d, a) && (d = u.from(d, d.offset, d.byteLength)), !u.isBuffer(c) || !u.isBuffer(d))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (c === d) return 0;
    let v = c.length, C = d.length;
    for (let S = 0, F = Math.min(v, C); S < F; ++S)
      if (c[S] !== d[S]) {
        v = c[S], C = d[S];
        break;
      }
    return v < C ? -1 : C < v ? 1 : 0;
  }, u.isEncoding = function(c) {
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
  }, u.concat = function(c, d) {
    if (!Array.isArray(c))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (c.length === 0)
      return u.alloc(0);
    let v;
    if (d === void 0)
      for (d = 0, v = 0; v < c.length; ++v)
        d += c[v].length;
    const C = u.allocUnsafe(d);
    let S = 0;
    for (v = 0; v < c.length; ++v) {
      let F = c[v];
      if (Ze(F, a))
        S + F.length > C.length ? (u.isBuffer(F) || (F = u.from(F)), F.copy(C, S)) : a.prototype.set.call(
          C,
          F,
          S
        );
      else if (u.isBuffer(F))
        F.copy(C, S);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      S += F.length;
    }
    return C;
  };
  function U(k, c) {
    if (u.isBuffer(k))
      return k.length;
    if (o.isView(k) || Ze(k, o))
      return k.byteLength;
    if (typeof k != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof k
      );
    const d = k.length, v = arguments.length > 2 && arguments[2] === !0;
    if (!v && d === 0) return 0;
    let C = !1;
    for (; ; )
      switch (c) {
        case "ascii":
        case "latin1":
        case "binary":
          return d;
        case "utf8":
        case "utf-8":
          return St(k).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return d * 2;
        case "hex":
          return d >>> 1;
        case "base64":
          return Xe(k).length;
        default:
          if (C)
            return v ? -1 : St(k).length;
          c = ("" + c).toLowerCase(), C = !0;
      }
  }
  u.byteLength = U;
  function $(k, c, d) {
    let v = !1;
    if ((c === void 0 || c < 0) && (c = 0), c > this.length || ((d === void 0 || d > this.length) && (d = this.length), d <= 0) || (d >>>= 0, c >>>= 0, d <= c))
      return "";
    for (k || (k = "utf8"); ; )
      switch (k) {
        case "hex":
          return be(this, c, d);
        case "utf8":
        case "utf-8":
          return X(this, c, d);
        case "ascii":
          return xe(this, c, d);
        case "latin1":
        case "binary":
          return Re(this, c, d);
        case "base64":
          return re(this, c, d);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Ae(this, c, d);
        default:
          if (v) throw new TypeError("Unknown encoding: " + k);
          k = (k + "").toLowerCase(), v = !0;
      }
  }
  u.prototype._isBuffer = !0;
  function O(k, c, d) {
    const v = k[c];
    k[c] = k[d], k[d] = v;
  }
  u.prototype.swap16 = function() {
    const c = this.length;
    if (c % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let d = 0; d < c; d += 2)
      O(this, d, d + 1);
    return this;
  }, u.prototype.swap32 = function() {
    const c = this.length;
    if (c % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let d = 0; d < c; d += 4)
      O(this, d, d + 3), O(this, d + 1, d + 2);
    return this;
  }, u.prototype.swap64 = function() {
    const c = this.length;
    if (c % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let d = 0; d < c; d += 8)
      O(this, d, d + 7), O(this, d + 1, d + 6), O(this, d + 2, d + 5), O(this, d + 3, d + 4);
    return this;
  }, u.prototype.toString = function() {
    const c = this.length;
    return c === 0 ? "" : arguments.length === 0 ? X(this, 0, c) : $.apply(this, arguments);
  }, u.prototype.toLocaleString = u.prototype.toString, u.prototype.equals = function(c) {
    if (!u.isBuffer(c)) throw new TypeError("Argument must be a Buffer");
    return this === c ? !0 : u.compare(this, c) === 0;
  }, u.prototype.inspect = function() {
    let c = "";
    const d = t.INSPECT_MAX_BYTES;
    return c = this.toString("hex", 0, d).replace(/(.{2})/g, "$1 ").trim(), this.length > d && (c += " ... "), "<Buffer " + c + ">";
  }, i && (u.prototype[i] = u.prototype.inspect), u.prototype.compare = function(c, d, v, C, S) {
    if (Ze(c, a) && (c = u.from(c, c.offset, c.byteLength)), !u.isBuffer(c))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof c
      );
    if (d === void 0 && (d = 0), v === void 0 && (v = c ? c.length : 0), C === void 0 && (C = 0), S === void 0 && (S = this.length), d < 0 || v > c.length || C < 0 || S > this.length)
      throw new RangeError("out of range index");
    if (C >= S && d >= v)
      return 0;
    if (C >= S)
      return -1;
    if (d >= v)
      return 1;
    if (d >>>= 0, v >>>= 0, C >>>= 0, S >>>= 0, this === c) return 0;
    let F = S - C, b = v - d;
    const Q = Math.min(F, b), ce = this.slice(C, S), h = c.slice(d, v);
    for (let W = 0; W < Q; ++W)
      if (ce[W] !== h[W]) {
        F = ce[W], b = h[W];
        break;
      }
    return F < b ? -1 : b < F ? 1 : 0;
  };
  function q(k, c, d, v, C) {
    if (k.length === 0) return -1;
    if (typeof d == "string" ? (v = d, d = 0) : d > 2147483647 ? d = 2147483647 : d < -2147483648 && (d = -2147483648), d = +d, vt(d) && (d = C ? 0 : k.length - 1), d < 0 && (d = k.length + d), d >= k.length) {
      if (C) return -1;
      d = k.length - 1;
    } else if (d < 0)
      if (C) d = 0;
      else return -1;
    if (typeof c == "string" && (c = u.from(c, v)), u.isBuffer(c))
      return c.length === 0 ? -1 : z(k, c, d, v, C);
    if (typeof c == "number")
      return c = c & 255, typeof a.prototype.indexOf == "function" ? C ? a.prototype.indexOf.call(k, c, d) : a.prototype.lastIndexOf.call(k, c, d) : z(k, [c], d, v, C);
    throw new TypeError("val must be string, number or Buffer");
  }
  function z(k, c, d, v, C) {
    let S = 1, F = k.length, b = c.length;
    if (v !== void 0 && (v = String(v).toLowerCase(), v === "ucs2" || v === "ucs-2" || v === "utf16le" || v === "utf-16le")) {
      if (k.length < 2 || c.length < 2)
        return -1;
      S = 2, F /= 2, b /= 2, d /= 2;
    }
    function Q(h, W) {
      return S === 1 ? h[W] : h.readUInt16BE(W * S);
    }
    let ce;
    if (C) {
      let h = -1;
      for (ce = d; ce < F; ce++)
        if (Q(k, ce) === Q(c, h === -1 ? 0 : ce - h)) {
          if (h === -1 && (h = ce), ce - h + 1 === b) return h * S;
        } else
          h !== -1 && (ce -= ce - h), h = -1;
    } else
      for (d + b > F && (d = F - b), ce = d; ce >= 0; ce--) {
        let h = !0;
        for (let W = 0; W < b; W++)
          if (Q(k, ce + W) !== Q(c, W)) {
            h = !1;
            break;
          }
        if (h) return ce;
      }
    return -1;
  }
  u.prototype.includes = function(c, d, v) {
    return this.indexOf(c, d, v) !== -1;
  }, u.prototype.indexOf = function(c, d, v) {
    return q(this, c, d, v, !0);
  }, u.prototype.lastIndexOf = function(c, d, v) {
    return q(this, c, d, v, !1);
  };
  function Y(k, c, d, v) {
    d = Number(d) || 0;
    const C = k.length - d;
    v ? (v = Number(v), v > C && (v = C)) : v = C;
    const S = c.length;
    v > S / 2 && (v = S / 2);
    let F;
    for (F = 0; F < v; ++F) {
      const b = parseInt(c.substr(F * 2, 2), 16);
      if (vt(b)) return F;
      k[d + F] = b;
    }
    return F;
  }
  function N(k, c, d, v) {
    return ut(St(c, k.length - d), k, d, v);
  }
  function J(k, c, d, v) {
    return ut(It(c), k, d, v);
  }
  function oe(k, c, d, v) {
    return ut(Xe(c), k, d, v);
  }
  function _e(k, c, d, v) {
    return ut(Fe(c, k.length - d), k, d, v);
  }
  u.prototype.write = function(c, d, v, C) {
    if (d === void 0)
      C = "utf8", v = this.length, d = 0;
    else if (v === void 0 && typeof d == "string")
      C = d, v = this.length, d = 0;
    else if (isFinite(d))
      d = d >>> 0, isFinite(v) ? (v = v >>> 0, C === void 0 && (C = "utf8")) : (C = v, v = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const S = this.length - d;
    if ((v === void 0 || v > S) && (v = S), c.length > 0 && (v < 0 || d < 0) || d > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    C || (C = "utf8");
    let F = !1;
    for (; ; )
      switch (C) {
        case "hex":
          return Y(this, c, d, v);
        case "utf8":
        case "utf-8":
          return N(this, c, d, v);
        case "ascii":
        case "latin1":
        case "binary":
          return J(this, c, d, v);
        case "base64":
          return oe(this, c, d, v);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return _e(this, c, d, v);
        default:
          if (F) throw new TypeError("Unknown encoding: " + C);
          C = ("" + C).toLowerCase(), F = !0;
      }
  }, u.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function re(k, c, d) {
    return c === 0 && d === k.length ? e.fromByteArray(k) : e.fromByteArray(k.slice(c, d));
  }
  function X(k, c, d) {
    d = Math.min(k.length, d);
    const v = [];
    let C = c;
    for (; C < d; ) {
      const S = k[C];
      let F = null, b = S > 239 ? 4 : S > 223 ? 3 : S > 191 ? 2 : 1;
      if (C + b <= d) {
        let Q, ce, h, W;
        switch (b) {
          case 1:
            S < 128 && (F = S);
            break;
          case 2:
            Q = k[C + 1], (Q & 192) === 128 && (W = (S & 31) << 6 | Q & 63, W > 127 && (F = W));
            break;
          case 3:
            Q = k[C + 1], ce = k[C + 2], (Q & 192) === 128 && (ce & 192) === 128 && (W = (S & 15) << 12 | (Q & 63) << 6 | ce & 63, W > 2047 && (W < 55296 || W > 57343) && (F = W));
            break;
          case 4:
            Q = k[C + 1], ce = k[C + 2], h = k[C + 3], (Q & 192) === 128 && (ce & 192) === 128 && (h & 192) === 128 && (W = (S & 15) << 18 | (Q & 63) << 12 | (ce & 63) << 6 | h & 63, W > 65535 && W < 1114112 && (F = W));
        }
      }
      F === null ? (F = 65533, b = 1) : F > 65535 && (F -= 65536, v.push(F >>> 10 & 1023 | 55296), F = 56320 | F & 1023), v.push(F), C += b;
    }
    return de(v);
  }
  const ie = 4096;
  function de(k) {
    const c = k.length;
    if (c <= ie)
      return String.fromCharCode.apply(String, k);
    let d = "", v = 0;
    for (; v < c; )
      d += String.fromCharCode.apply(
        String,
        k.slice(v, v += ie)
      );
    return d;
  }
  function xe(k, c, d) {
    let v = "";
    d = Math.min(k.length, d);
    for (let C = c; C < d; ++C)
      v += String.fromCharCode(k[C] & 127);
    return v;
  }
  function Re(k, c, d) {
    let v = "";
    d = Math.min(k.length, d);
    for (let C = c; C < d; ++C)
      v += String.fromCharCode(k[C]);
    return v;
  }
  function be(k, c, d) {
    const v = k.length;
    (!c || c < 0) && (c = 0), (!d || d < 0 || d > v) && (d = v);
    let C = "";
    for (let S = c; S < d; ++S)
      C += Et[k[S]];
    return C;
  }
  function Ae(k, c, d) {
    const v = k.slice(c, d);
    let C = "";
    for (let S = 0; S < v.length - 1; S += 2)
      C += String.fromCharCode(v[S] + v[S + 1] * 256);
    return C;
  }
  u.prototype.slice = function(c, d) {
    const v = this.length;
    c = ~~c, d = d === void 0 ? v : ~~d, c < 0 ? (c += v, c < 0 && (c = 0)) : c > v && (c = v), d < 0 ? (d += v, d < 0 && (d = 0)) : d > v && (d = v), d < c && (d = c);
    const C = this.subarray(c, d);
    return Object.setPrototypeOf(C, u.prototype), C;
  };
  function ye(k, c, d) {
    if (k % 1 !== 0 || k < 0) throw new RangeError("offset is not uint");
    if (k + c > d) throw new RangeError("Trying to access beyond buffer length");
  }
  u.prototype.readUintLE = u.prototype.readUIntLE = function(c, d, v) {
    c = c >>> 0, d = d >>> 0, v || ye(c, d, this.length);
    let C = this[c], S = 1, F = 0;
    for (; ++F < d && (S *= 256); )
      C += this[c + F] * S;
    return C;
  }, u.prototype.readUintBE = u.prototype.readUIntBE = function(c, d, v) {
    c = c >>> 0, d = d >>> 0, v || ye(c, d, this.length);
    let C = this[c + --d], S = 1;
    for (; d > 0 && (S *= 256); )
      C += this[c + --d] * S;
    return C;
  }, u.prototype.readUint8 = u.prototype.readUInt8 = function(c, d) {
    return c = c >>> 0, d || ye(c, 1, this.length), this[c];
  }, u.prototype.readUint16LE = u.prototype.readUInt16LE = function(c, d) {
    return c = c >>> 0, d || ye(c, 2, this.length), this[c] | this[c + 1] << 8;
  }, u.prototype.readUint16BE = u.prototype.readUInt16BE = function(c, d) {
    return c = c >>> 0, d || ye(c, 2, this.length), this[c] << 8 | this[c + 1];
  }, u.prototype.readUint32LE = u.prototype.readUInt32LE = function(c, d) {
    return c = c >>> 0, d || ye(c, 4, this.length), (this[c] | this[c + 1] << 8 | this[c + 2] << 16) + this[c + 3] * 16777216;
  }, u.prototype.readUint32BE = u.prototype.readUInt32BE = function(c, d) {
    return c = c >>> 0, d || ye(c, 4, this.length), this[c] * 16777216 + (this[c + 1] << 16 | this[c + 2] << 8 | this[c + 3]);
  }, u.prototype.readBigUInt64LE = Le(function(c) {
    c = c >>> 0, ze(c, "offset");
    const d = this[c], v = this[c + 7];
    (d === void 0 || v === void 0) && Ce(c, this.length - 8);
    const C = d + this[++c] * 2 ** 8 + this[++c] * 2 ** 16 + this[++c] * 2 ** 24, S = this[++c] + this[++c] * 2 ** 8 + this[++c] * 2 ** 16 + v * 2 ** 24;
    return BigInt(C) + (BigInt(S) << BigInt(32));
  }), u.prototype.readBigUInt64BE = Le(function(c) {
    c = c >>> 0, ze(c, "offset");
    const d = this[c], v = this[c + 7];
    (d === void 0 || v === void 0) && Ce(c, this.length - 8);
    const C = d * 2 ** 24 + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + this[++c], S = this[++c] * 2 ** 24 + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + v;
    return (BigInt(C) << BigInt(32)) + BigInt(S);
  }), u.prototype.readIntLE = function(c, d, v) {
    c = c >>> 0, d = d >>> 0, v || ye(c, d, this.length);
    let C = this[c], S = 1, F = 0;
    for (; ++F < d && (S *= 256); )
      C += this[c + F] * S;
    return S *= 128, C >= S && (C -= Math.pow(2, 8 * d)), C;
  }, u.prototype.readIntBE = function(c, d, v) {
    c = c >>> 0, d = d >>> 0, v || ye(c, d, this.length);
    let C = d, S = 1, F = this[c + --C];
    for (; C > 0 && (S *= 256); )
      F += this[c + --C] * S;
    return S *= 128, F >= S && (F -= Math.pow(2, 8 * d)), F;
  }, u.prototype.readInt8 = function(c, d) {
    return c = c >>> 0, d || ye(c, 1, this.length), this[c] & 128 ? (255 - this[c] + 1) * -1 : this[c];
  }, u.prototype.readInt16LE = function(c, d) {
    c = c >>> 0, d || ye(c, 2, this.length);
    const v = this[c] | this[c + 1] << 8;
    return v & 32768 ? v | 4294901760 : v;
  }, u.prototype.readInt16BE = function(c, d) {
    c = c >>> 0, d || ye(c, 2, this.length);
    const v = this[c + 1] | this[c] << 8;
    return v & 32768 ? v | 4294901760 : v;
  }, u.prototype.readInt32LE = function(c, d) {
    return c = c >>> 0, d || ye(c, 4, this.length), this[c] | this[c + 1] << 8 | this[c + 2] << 16 | this[c + 3] << 24;
  }, u.prototype.readInt32BE = function(c, d) {
    return c = c >>> 0, d || ye(c, 4, this.length), this[c] << 24 | this[c + 1] << 16 | this[c + 2] << 8 | this[c + 3];
  }, u.prototype.readBigInt64LE = Le(function(c) {
    c = c >>> 0, ze(c, "offset");
    const d = this[c], v = this[c + 7];
    (d === void 0 || v === void 0) && Ce(c, this.length - 8);
    const C = this[c + 4] + this[c + 5] * 2 ** 8 + this[c + 6] * 2 ** 16 + (v << 24);
    return (BigInt(C) << BigInt(32)) + BigInt(d + this[++c] * 2 ** 8 + this[++c] * 2 ** 16 + this[++c] * 2 ** 24);
  }), u.prototype.readBigInt64BE = Le(function(c) {
    c = c >>> 0, ze(c, "offset");
    const d = this[c], v = this[c + 7];
    (d === void 0 || v === void 0) && Ce(c, this.length - 8);
    const C = (d << 24) + // Overflow
    this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + this[++c];
    return (BigInt(C) << BigInt(32)) + BigInt(this[++c] * 2 ** 24 + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + v);
  }), u.prototype.readFloatLE = function(c, d) {
    return c = c >>> 0, d || ye(c, 4, this.length), r.read(this, c, !0, 23, 4);
  }, u.prototype.readFloatBE = function(c, d) {
    return c = c >>> 0, d || ye(c, 4, this.length), r.read(this, c, !1, 23, 4);
  }, u.prototype.readDoubleLE = function(c, d) {
    return c = c >>> 0, d || ye(c, 8, this.length), r.read(this, c, !0, 52, 8);
  }, u.prototype.readDoubleBE = function(c, d) {
    return c = c >>> 0, d || ye(c, 8, this.length), r.read(this, c, !1, 52, 8);
  };
  function Be(k, c, d, v, C, S) {
    if (!u.isBuffer(k)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (c > C || c < S) throw new RangeError('"value" argument is out of bounds');
    if (d + v > k.length) throw new RangeError("Index out of range");
  }
  u.prototype.writeUintLE = u.prototype.writeUIntLE = function(c, d, v, C) {
    if (c = +c, d = d >>> 0, v = v >>> 0, !C) {
      const b = Math.pow(2, 8 * v) - 1;
      Be(this, c, d, v, b, 0);
    }
    let S = 1, F = 0;
    for (this[d] = c & 255; ++F < v && (S *= 256); )
      this[d + F] = c / S & 255;
    return d + v;
  }, u.prototype.writeUintBE = u.prototype.writeUIntBE = function(c, d, v, C) {
    if (c = +c, d = d >>> 0, v = v >>> 0, !C) {
      const b = Math.pow(2, 8 * v) - 1;
      Be(this, c, d, v, b, 0);
    }
    let S = v - 1, F = 1;
    for (this[d + S] = c & 255; --S >= 0 && (F *= 256); )
      this[d + S] = c / F & 255;
    return d + v;
  }, u.prototype.writeUint8 = u.prototype.writeUInt8 = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Be(this, c, d, 1, 255, 0), this[d] = c & 255, d + 1;
  }, u.prototype.writeUint16LE = u.prototype.writeUInt16LE = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Be(this, c, d, 2, 65535, 0), this[d] = c & 255, this[d + 1] = c >>> 8, d + 2;
  }, u.prototype.writeUint16BE = u.prototype.writeUInt16BE = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Be(this, c, d, 2, 65535, 0), this[d] = c >>> 8, this[d + 1] = c & 255, d + 2;
  }, u.prototype.writeUint32LE = u.prototype.writeUInt32LE = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Be(this, c, d, 4, 4294967295, 0), this[d + 3] = c >>> 24, this[d + 2] = c >>> 16, this[d + 1] = c >>> 8, this[d] = c & 255, d + 4;
  }, u.prototype.writeUint32BE = u.prototype.writeUInt32BE = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Be(this, c, d, 4, 4294967295, 0), this[d] = c >>> 24, this[d + 1] = c >>> 16, this[d + 2] = c >>> 8, this[d + 3] = c & 255, d + 4;
  };
  function ke(k, c, d, v, C) {
    Ue(c, v, C, k, d, 7);
    let S = Number(c & BigInt(4294967295));
    k[d++] = S, S = S >> 8, k[d++] = S, S = S >> 8, k[d++] = S, S = S >> 8, k[d++] = S;
    let F = Number(c >> BigInt(32) & BigInt(4294967295));
    return k[d++] = F, F = F >> 8, k[d++] = F, F = F >> 8, k[d++] = F, F = F >> 8, k[d++] = F, d;
  }
  function Ee(k, c, d, v, C) {
    Ue(c, v, C, k, d, 7);
    let S = Number(c & BigInt(4294967295));
    k[d + 7] = S, S = S >> 8, k[d + 6] = S, S = S >> 8, k[d + 5] = S, S = S >> 8, k[d + 4] = S;
    let F = Number(c >> BigInt(32) & BigInt(4294967295));
    return k[d + 3] = F, F = F >> 8, k[d + 2] = F, F = F >> 8, k[d + 1] = F, F = F >> 8, k[d] = F, d + 8;
  }
  u.prototype.writeBigUInt64LE = Le(function(c, d = 0) {
    return ke(this, c, d, BigInt(0), BigInt("0xffffffffffffffff"));
  }), u.prototype.writeBigUInt64BE = Le(function(c, d = 0) {
    return Ee(this, c, d, BigInt(0), BigInt("0xffffffffffffffff"));
  }), u.prototype.writeIntLE = function(c, d, v, C) {
    if (c = +c, d = d >>> 0, !C) {
      const Q = Math.pow(2, 8 * v - 1);
      Be(this, c, d, v, Q - 1, -Q);
    }
    let S = 0, F = 1, b = 0;
    for (this[d] = c & 255; ++S < v && (F *= 256); )
      c < 0 && b === 0 && this[d + S - 1] !== 0 && (b = 1), this[d + S] = (c / F >> 0) - b & 255;
    return d + v;
  }, u.prototype.writeIntBE = function(c, d, v, C) {
    if (c = +c, d = d >>> 0, !C) {
      const Q = Math.pow(2, 8 * v - 1);
      Be(this, c, d, v, Q - 1, -Q);
    }
    let S = v - 1, F = 1, b = 0;
    for (this[d + S] = c & 255; --S >= 0 && (F *= 256); )
      c < 0 && b === 0 && this[d + S + 1] !== 0 && (b = 1), this[d + S] = (c / F >> 0) - b & 255;
    return d + v;
  }, u.prototype.writeInt8 = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Be(this, c, d, 1, 127, -128), c < 0 && (c = 255 + c + 1), this[d] = c & 255, d + 1;
  }, u.prototype.writeInt16LE = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Be(this, c, d, 2, 32767, -32768), this[d] = c & 255, this[d + 1] = c >>> 8, d + 2;
  }, u.prototype.writeInt16BE = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Be(this, c, d, 2, 32767, -32768), this[d] = c >>> 8, this[d + 1] = c & 255, d + 2;
  }, u.prototype.writeInt32LE = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Be(this, c, d, 4, 2147483647, -2147483648), this[d] = c & 255, this[d + 1] = c >>> 8, this[d + 2] = c >>> 16, this[d + 3] = c >>> 24, d + 4;
  }, u.prototype.writeInt32BE = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Be(this, c, d, 4, 2147483647, -2147483648), c < 0 && (c = 4294967295 + c + 1), this[d] = c >>> 24, this[d + 1] = c >>> 16, this[d + 2] = c >>> 8, this[d + 3] = c & 255, d + 4;
  }, u.prototype.writeBigInt64LE = Le(function(c, d = 0) {
    return ke(this, c, d, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), u.prototype.writeBigInt64BE = Le(function(c, d = 0) {
    return Ee(this, c, d, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function De(k, c, d, v, C, S) {
    if (d + v > k.length) throw new RangeError("Index out of range");
    if (d < 0) throw new RangeError("Index out of range");
  }
  function Ge(k, c, d, v, C) {
    return c = +c, d = d >>> 0, C || De(k, c, d, 4), r.write(k, c, d, v, 23, 4), d + 4;
  }
  u.prototype.writeFloatLE = function(c, d, v) {
    return Ge(this, c, d, !0, v);
  }, u.prototype.writeFloatBE = function(c, d, v) {
    return Ge(this, c, d, !1, v);
  };
  function tt(k, c, d, v, C) {
    return c = +c, d = d >>> 0, C || De(k, c, d, 8), r.write(k, c, d, v, 52, 8), d + 8;
  }
  u.prototype.writeDoubleLE = function(c, d, v) {
    return tt(this, c, d, !0, v);
  }, u.prototype.writeDoubleBE = function(c, d, v) {
    return tt(this, c, d, !1, v);
  }, u.prototype.copy = function(c, d, v, C) {
    if (!u.isBuffer(c)) throw new TypeError("argument should be a Buffer");
    if (v || (v = 0), !C && C !== 0 && (C = this.length), d >= c.length && (d = c.length), d || (d = 0), C > 0 && C < v && (C = v), C === v || c.length === 0 || this.length === 0) return 0;
    if (d < 0)
      throw new RangeError("targetStart out of bounds");
    if (v < 0 || v >= this.length) throw new RangeError("Index out of range");
    if (C < 0) throw new RangeError("sourceEnd out of bounds");
    C > this.length && (C = this.length), c.length - d < C - v && (C = c.length - d + v);
    const S = C - v;
    return this === c && typeof a.prototype.copyWithin == "function" ? this.copyWithin(d, v, C) : a.prototype.set.call(
      c,
      this.subarray(v, C),
      d
    ), S;
  }, u.prototype.fill = function(c, d, v, C) {
    if (typeof c == "string") {
      if (typeof d == "string" ? (C = d, d = 0, v = this.length) : typeof v == "string" && (C = v, v = this.length), C !== void 0 && typeof C != "string")
        throw new TypeError("encoding must be a string");
      if (typeof C == "string" && !u.isEncoding(C))
        throw new TypeError("Unknown encoding: " + C);
      if (c.length === 1) {
        const F = c.charCodeAt(0);
        (C === "utf8" && F < 128 || C === "latin1") && (c = F);
      }
    } else typeof c == "number" ? c = c & 255 : typeof c == "boolean" && (c = Number(c));
    if (d < 0 || this.length < d || this.length < v)
      throw new RangeError("Out of range index");
    if (v <= d)
      return this;
    d = d >>> 0, v = v === void 0 ? this.length : v >>> 0, c || (c = 0);
    let S;
    if (typeof c == "number")
      for (S = d; S < v; ++S)
        this[S] = c;
    else {
      const F = u.isBuffer(c) ? c : u.from(c, C), b = F.length;
      if (b === 0)
        throw new TypeError('The value "' + c + '" is invalid for argument "value"');
      for (S = 0; S < v - d; ++S)
        this[S + d] = F[S % b];
    }
    return this;
  };
  const je = {};
  function we(k, c, d) {
    je[k] = class extends d {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: c.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = \`\${this.name} [\${k}]\`, this.stack, delete this.name;
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
        return \`\${this.name} [\${k}]: \${this.message}\`;
      }
    };
  }
  we(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(k) {
      return k ? \`\${k} is outside of buffer bounds\` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), we(
    "ERR_INVALID_ARG_TYPE",
    function(k, c) {
      return \`The "\${k}" argument must be of type number. Received type \${typeof c}\`;
    },
    TypeError
  ), we(
    "ERR_OUT_OF_RANGE",
    function(k, c, d) {
      let v = \`The value of "\${k}" is out of range.\`, C = d;
      return Number.isInteger(d) && Math.abs(d) > 2 ** 32 ? C = Oe(String(d)) : typeof d == "bigint" && (C = String(d), (d > BigInt(2) ** BigInt(32) || d < -(BigInt(2) ** BigInt(32))) && (C = Oe(C)), C += "n"), v += \` It must be \${c}. Received \${C}\`, v;
    },
    RangeError
  );
  function Oe(k) {
    let c = "", d = k.length;
    const v = k[0] === "-" ? 1 : 0;
    for (; d >= v + 4; d -= 3)
      c = \`_\${k.slice(d - 3, d)}\${c}\`;
    return \`\${k.slice(0, d)}\${c}\`;
  }
  function Ve(k, c, d) {
    ze(c, "offset"), (k[c] === void 0 || k[c + d] === void 0) && Ce(c, k.length - (d + 1));
  }
  function Ue(k, c, d, v, C, S) {
    if (k > d || k < c) {
      const F = typeof c == "bigint" ? "n" : "";
      let b;
      throw c === 0 || c === BigInt(0) ? b = \`>= 0\${F} and < 2\${F} ** \${(S + 1) * 8}\${F}\` : b = \`>= -(2\${F} ** \${(S + 1) * 8 - 1}\${F}) and < 2 ** \${(S + 1) * 8 - 1}\${F}\`, new je.ERR_OUT_OF_RANGE("value", b, k);
    }
    Ve(v, C, S);
  }
  function ze(k, c) {
    if (typeof k != "number")
      throw new je.ERR_INVALID_ARG_TYPE(c, "number", k);
  }
  function Ce(k, c, d) {
    throw Math.floor(k) !== k ? (ze(k, d), new je.ERR_OUT_OF_RANGE("offset", "an integer", k)) : c < 0 ? new je.ERR_BUFFER_OUT_OF_BOUNDS() : new je.ERR_OUT_OF_RANGE(
      "offset",
      \`>= 0 and <= \${c}\`,
      k
    );
  }
  const Se = /[^+/0-9A-Za-z-_]/g;
  function lt(k) {
    if (k = k.split("=")[0], k = k.trim().replace(Se, ""), k.length < 2) return "";
    for (; k.length % 4 !== 0; )
      k = k + "=";
    return k;
  }
  function St(k, c) {
    c = c || 1 / 0;
    let d;
    const v = k.length;
    let C = null;
    const S = [];
    for (let F = 0; F < v; ++F) {
      if (d = k.charCodeAt(F), d > 55295 && d < 57344) {
        if (!C) {
          if (d > 56319) {
            (c -= 3) > -1 && S.push(239, 191, 189);
            continue;
          } else if (F + 1 === v) {
            (c -= 3) > -1 && S.push(239, 191, 189);
            continue;
          }
          C = d;
          continue;
        }
        if (d < 56320) {
          (c -= 3) > -1 && S.push(239, 191, 189), C = d;
          continue;
        }
        d = (C - 55296 << 10 | d - 56320) + 65536;
      } else C && (c -= 3) > -1 && S.push(239, 191, 189);
      if (C = null, d < 128) {
        if ((c -= 1) < 0) break;
        S.push(d);
      } else if (d < 2048) {
        if ((c -= 2) < 0) break;
        S.push(
          d >> 6 | 192,
          d & 63 | 128
        );
      } else if (d < 65536) {
        if ((c -= 3) < 0) break;
        S.push(
          d >> 12 | 224,
          d >> 6 & 63 | 128,
          d & 63 | 128
        );
      } else if (d < 1114112) {
        if ((c -= 4) < 0) break;
        S.push(
          d >> 18 | 240,
          d >> 12 & 63 | 128,
          d >> 6 & 63 | 128,
          d & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return S;
  }
  function It(k) {
    const c = [];
    for (let d = 0; d < k.length; ++d)
      c.push(k.charCodeAt(d) & 255);
    return c;
  }
  function Fe(k, c) {
    let d, v, C;
    const S = [];
    for (let F = 0; F < k.length && !((c -= 2) < 0); ++F)
      d = k.charCodeAt(F), v = d >> 8, C = d % 256, S.push(C), S.push(v);
    return S;
  }
  function Xe(k) {
    return e.toByteArray(lt(k));
  }
  function ut(k, c, d, v) {
    let C;
    for (C = 0; C < v && !(C + d >= c.length || C >= k.length); ++C)
      c[C + d] = k[C];
    return C;
  }
  function Ze(k, c) {
    return k instanceof c || k != null && k.constructor != null && k.constructor.name != null && k.constructor.name === c.name;
  }
  function vt(k) {
    return k !== k;
  }
  const Et = function() {
    const k = "0123456789abcdef", c = new Array(256);
    for (let d = 0; d < 16; ++d) {
      const v = d * 16;
      for (let C = 0; C < 16; ++C)
        c[v + C] = k[d] + k[C];
    }
    return c;
  }();
  function Le(k) {
    return typeof BigInt > "u" ? it : k;
  }
  function it() {
    throw new Error("BigInt not supported");
  }
})(Po);
const fe = Po.Buffer;
function Oc(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var zo = { exports: {} }, et = zo.exports = {}, Mt, Lt;
function qn() {
  throw new Error("setTimeout has not been defined");
}
function Wn() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Mt = setTimeout : Mt = qn;
  } catch {
    Mt = qn;
  }
  try {
    typeof clearTimeout == "function" ? Lt = clearTimeout : Lt = Wn;
  } catch {
    Lt = Wn;
  }
})();
function Ho(t) {
  if (Mt === setTimeout)
    return setTimeout(t, 0);
  if ((Mt === qn || !Mt) && setTimeout)
    return Mt = setTimeout, setTimeout(t, 0);
  try {
    return Mt(t, 0);
  } catch {
    try {
      return Mt.call(null, t, 0);
    } catch {
      return Mt.call(this, t, 0);
    }
  }
}
function Cc(t) {
  if (Lt === clearTimeout)
    return clearTimeout(t);
  if ((Lt === Wn || !Lt) && clearTimeout)
    return Lt = clearTimeout, clearTimeout(t);
  try {
    return Lt(t);
  } catch {
    try {
      return Lt.call(null, t);
    } catch {
      return Lt.call(this, t);
    }
  }
}
var Zt = [], kr = !1, wr, Ei = -1;
function Nc() {
  !kr || !wr || (kr = !1, wr.length ? Zt = wr.concat(Zt) : Ei = -1, Zt.length && qo());
}
function qo() {
  if (!kr) {
    var t = Ho(Nc);
    kr = !0;
    for (var e = Zt.length; e; ) {
      for (wr = Zt, Zt = []; ++Ei < e; )
        wr && wr[Ei].run();
      Ei = -1, e = Zt.length;
    }
    wr = null, kr = !1, Cc(t);
  }
}
et.nextTick = function(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var r = 1; r < arguments.length; r++)
      e[r - 1] = arguments[r];
  Zt.push(new Wo(t, e)), Zt.length === 1 && !kr && Ho(qo);
};
function Wo(t, e) {
  this.fun = t, this.array = e;
}
Wo.prototype.run = function() {
  this.fun.apply(null, this.array);
};
et.title = "browser";
et.browser = !0;
et.env = {};
et.argv = [];
et.version = "";
et.versions = {};
function Kt() {
}
et.on = Kt;
et.addListener = Kt;
et.once = Kt;
et.off = Kt;
et.removeListener = Kt;
et.removeAllListeners = Kt;
et.emit = Kt;
et.prependListener = Kt;
et.prependOnceListener = Kt;
et.listeners = function(t) {
  return [];
};
et.binding = function(t) {
  throw new Error("process.binding is not supported");
};
et.cwd = function() {
  return "/";
};
et.chdir = function(t) {
  throw new Error("process.chdir is not supported");
};
et.umask = function() {
  return 0;
};
var Fc = zo.exports;
const gt = /* @__PURE__ */ Oc(Fc);
function Jt(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Uc(t) {
  if (Object.prototype.hasOwnProperty.call(t, "__esModule")) return t;
  var e = t.default;
  if (typeof e == "function") {
    var r = function i() {
      return this instanceof i ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach(function(i) {
    var n = Object.getOwnPropertyDescriptor(t, i);
    Object.defineProperty(r, i, n.get ? n : {
      enumerable: !0,
      get: function() {
        return t[i];
      }
    });
  }), r;
}
var Gi, _a;
function Mc() {
  if (_a) return Gi;
  _a = 1;
  var t = function(e) {
    if (e = e || {}, this.Promise = e.Promise || Promise, this.queues = /* @__PURE__ */ Object.create(null), this.domainReentrant = e.domainReentrant || !1, this.domainReentrant) {
      if (typeof gt > "u" || typeof gt.domain > "u")
        throw new Error(
          "Domain-reentrant locks require \`process.domain\` to exist. Please flip \`opts.domainReentrant = false\`, use a NodeJS version that still implements Domain, or install a browser polyfill."
        );
      this.domains = /* @__PURE__ */ Object.create(null);
    }
    this.timeout = e.timeout || t.DEFAULT_TIMEOUT, this.maxOccupationTime = e.maxOccupationTime || t.DEFAULT_MAX_OCCUPATION_TIME, this.maxExecutionTime = e.maxExecutionTime || t.DEFAULT_MAX_EXECUTION_TIME, e.maxPending === 1 / 0 || Number.isInteger(e.maxPending) && e.maxPending >= 0 ? this.maxPending = e.maxPending : this.maxPending = t.DEFAULT_MAX_PENDING;
  };
  return t.DEFAULT_TIMEOUT = 0, t.DEFAULT_MAX_OCCUPATION_TIME = 0, t.DEFAULT_MAX_EXECUTION_TIME = 0, t.DEFAULT_MAX_PENDING = 1e3, t.prototype.acquire = function(e, r, i, n) {
    if (Array.isArray(e))
      return this._acquireBatch(e, r, i, n);
    if (typeof r != "function")
      throw new Error("You must pass a function to execute");
    var a = null, o = null, s = null;
    typeof i != "function" && (n = i, i = null, s = new this.Promise(function(D, P) {
      a = D, o = P;
    })), n = n || {};
    var l = !1, f = null, u = null, m = null, g = this, y = function(D, P, M) {
      u && (clearTimeout(u), u = null), m && (clearTimeout(m), m = null), D && (g.queues[e] && g.queues[e].length === 0 && delete g.queues[e], g.domainReentrant && delete g.domains[e]), l || (s ? P ? o(P) : a(M) : typeof i == "function" && i(P, M), l = !0), D && g.queues[e] && g.queues[e].length > 0 && g.queues[e].shift()();
    }, E = function(D) {
      if (l)
        return y(D);
      f && (clearTimeout(f), f = null), g.domainReentrant && D && (g.domains[e] = gt.domain);
      var P = n.maxExecutionTime || g.maxExecutionTime;
      if (P && (m = setTimeout(function() {
        g.queues[e] && y(D, new Error("Maximum execution time is exceeded " + e));
      }, P)), r.length === 1) {
        var M = !1;
        try {
          r(function(U, $) {
            M || (M = !0, y(D, U, $));
          });
        } catch (U) {
          M || (M = !0, y(D, U));
        }
      } else
        g._promiseTry(function() {
          return r();
        }).then(function(U) {
          y(D, void 0, U);
        }, function(U) {
          y(D, U);
        });
    };
    g.domainReentrant && gt.domain && (E = gt.domain.bind(E));
    var A = n.maxPending || g.maxPending;
    if (!g.queues[e])
      g.queues[e] = [], E(!0);
    else if (g.domainReentrant && gt.domain && gt.domain === g.domains[e])
      E(!1);
    else if (g.queues[e].length >= A)
      y(!1, new Error("Too many pending tasks in queue " + e));
    else {
      var R = function() {
        E(!0);
      };
      n.skipQueue ? g.queues[e].unshift(R) : g.queues[e].push(R);
      var I = n.timeout || g.timeout;
      I && (f = setTimeout(function() {
        f = null, y(!1, new Error("async-lock timed out in queue " + e));
      }, I));
    }
    var T = n.maxOccupationTime || g.maxOccupationTime;
    if (T && (u = setTimeout(function() {
      g.queues[e] && y(!1, new Error("Maximum occupation time is exceeded in queue " + e));
    }, T)), s)
      return s;
  }, t.prototype._acquireBatch = function(e, r, i, n) {
    typeof i != "function" && (n = i, i = null);
    var a = this, o = function(l, f) {
      return function(u) {
        a.acquire(l, f, u, n);
      };
    }, s = e.reduceRight(function(l, f) {
      return o(f, l);
    }, r);
    if (typeof i == "function")
      s(i);
    else
      return new this.Promise(function(l, f) {
        s.length === 1 ? s(function(u, m) {
          u ? f(u) : l(m);
        }) : l(s());
      });
  }, t.prototype.isBusy = function(e) {
    return e ? !!this.queues[e] : Object.keys(this.queues).length > 0;
  }, t.prototype._promiseTry = function(e) {
    try {
      return this.Promise.resolve(e());
    } catch (r) {
      return this.Promise.reject(r);
    }
  }, Gi = t, Gi;
}
var Zi, ba;
function Lc() {
  return ba || (ba = 1, Zi = Mc()), Zi;
}
var Pc = Lc(), Zr = /* @__PURE__ */ Jt(Pc), gi = { exports: {} }, va;
function jc() {
  return va || (va = 1, typeof Object.create == "function" ? gi.exports = function(e, r) {
    r && (e.super_ = r, e.prototype = Object.create(r.prototype, {
      constructor: {
        value: e,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : gi.exports = function(e, r) {
    if (r) {
      e.super_ = r;
      var i = function() {
      };
      i.prototype = r.prototype, e.prototype = new i(), e.prototype.constructor = e;
    }
  }), gi.exports;
}
var yi = { exports: {} }, Vi = {}, Ea;
function zc() {
  return Ea || (Ea = 1, function(t) {
    Object.defineProperties(t, { __esModule: { value: !0 }, [Symbol.toStringTag]: { value: "Module" } });
    var e = {}, r = {};
    r.byteLength = u, r.toByteArray = g, r.fromByteArray = A;
    for (var i = [], n = [], a = typeof Uint8Array < "u" ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, l = o.length; s < l; ++s)
      i[s] = o[s], n[o.charCodeAt(s)] = s;
    n[45] = 62, n[95] = 63;
    function f(T) {
      var D = T.length;
      if (D % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      var P = T.indexOf("=");
      P === -1 && (P = D);
      var M = P === D ? 0 : 4 - P % 4;
      return [P, M];
    }
    function u(T) {
      var D = f(T), P = D[0], M = D[1];
      return (P + M) * 3 / 4 - M;
    }
    function m(T, D, P) {
      return (D + P) * 3 / 4 - P;
    }
    function g(T) {
      var D, P = f(T), M = P[0], U = P[1], $ = new a(m(T, M, U)), O = 0, q = U > 0 ? M - 4 : M, z;
      for (z = 0; z < q; z += 4)
        D = n[T.charCodeAt(z)] << 18 | n[T.charCodeAt(z + 1)] << 12 | n[T.charCodeAt(z + 2)] << 6 | n[T.charCodeAt(z + 3)], $[O++] = D >> 16 & 255, $[O++] = D >> 8 & 255, $[O++] = D & 255;
      return U === 2 && (D = n[T.charCodeAt(z)] << 2 | n[T.charCodeAt(z + 1)] >> 4, $[O++] = D & 255), U === 1 && (D = n[T.charCodeAt(z)] << 10 | n[T.charCodeAt(z + 1)] << 4 | n[T.charCodeAt(z + 2)] >> 2, $[O++] = D >> 8 & 255, $[O++] = D & 255), $;
    }
    function y(T) {
      return i[T >> 18 & 63] + i[T >> 12 & 63] + i[T >> 6 & 63] + i[T & 63];
    }
    function E(T, D, P) {
      for (var M, U = [], $ = D; $ < P; $ += 3)
        M = (T[$] << 16 & 16711680) + (T[$ + 1] << 8 & 65280) + (T[$ + 2] & 255), U.push(y(M));
      return U.join("");
    }
    function A(T) {
      for (var D, P = T.length, M = P % 3, U = [], $ = 16383, O = 0, q = P - M; O < q; O += $)
        U.push(E(T, O, O + $ > q ? q : O + $));
      return M === 1 ? (D = T[P - 1], U.push(
        i[D >> 2] + i[D << 4 & 63] + "=="
      )) : M === 2 && (D = (T[P - 2] << 8) + T[P - 1], U.push(
        i[D >> 10] + i[D >> 4 & 63] + i[D << 2 & 63] + "="
      )), U.join("");
    }
    var R = {};
    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    R.read = function(T, D, P, M, U) {
      var $, O, q = U * 8 - M - 1, z = (1 << q) - 1, Y = z >> 1, N = -7, J = P ? U - 1 : 0, oe = P ? -1 : 1, _e = T[D + J];
      for (J += oe, $ = _e & (1 << -N) - 1, _e >>= -N, N += q; N > 0; $ = $ * 256 + T[D + J], J += oe, N -= 8)
        ;
      for (O = $ & (1 << -N) - 1, $ >>= -N, N += M; N > 0; O = O * 256 + T[D + J], J += oe, N -= 8)
        ;
      if ($ === 0)
        $ = 1 - Y;
      else {
        if ($ === z)
          return O ? NaN : (_e ? -1 : 1) * (1 / 0);
        O = O + Math.pow(2, M), $ = $ - Y;
      }
      return (_e ? -1 : 1) * O * Math.pow(2, $ - M);
    }, R.write = function(T, D, P, M, U, $) {
      var O, q, z, Y = $ * 8 - U - 1, N = (1 << Y) - 1, J = N >> 1, oe = U === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, _e = M ? 0 : $ - 1, re = M ? 1 : -1, X = D < 0 || D === 0 && 1 / D < 0 ? 1 : 0;
      for (D = Math.abs(D), isNaN(D) || D === 1 / 0 ? (q = isNaN(D) ? 1 : 0, O = N) : (O = Math.floor(Math.log(D) / Math.LN2), D * (z = Math.pow(2, -O)) < 1 && (O--, z *= 2), O + J >= 1 ? D += oe / z : D += oe * Math.pow(2, 1 - J), D * z >= 2 && (O++, z /= 2), O + J >= N ? (q = 0, O = N) : O + J >= 1 ? (q = (D * z - 1) * Math.pow(2, U), O = O + J) : (q = D * Math.pow(2, J - 1) * Math.pow(2, U), O = 0)); U >= 8; T[P + _e] = q & 255, _e += re, q /= 256, U -= 8)
        ;
      for (O = O << U | q, Y += U; Y > 0; T[P + _e] = O & 255, _e += re, O /= 256, Y -= 8)
        ;
      T[P + _e - re] |= X * 128;
    };
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */
    (function(T) {
      const D = r, P = R, M = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
      T.Buffer = N, T.SlowBuffer = Ae, T.INSPECT_MAX_BYTES = 50;
      const U = 2147483647;
      T.kMaxLength = U;
      const { Uint8Array: $, ArrayBuffer: O, SharedArrayBuffer: q } = globalThis;
      N.TYPED_ARRAY_SUPPORT = z(), !N.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
        "This browser lacks typed array (Uint8Array) support which is required by \`buffer\` v5.x. Use \`buffer\` v4.x if you require old browser support."
      );
      function z() {
        try {
          const _ = new $(1), w = { foo: function() {
            return 42;
          } };
          return Object.setPrototypeOf(w, $.prototype), Object.setPrototypeOf(_, w), _.foo() === 42;
        } catch {
          return !1;
        }
      }
      Object.defineProperty(N.prototype, "parent", {
        enumerable: !0,
        get: function() {
          if (N.isBuffer(this))
            return this.buffer;
        }
      }), Object.defineProperty(N.prototype, "offset", {
        enumerable: !0,
        get: function() {
          if (N.isBuffer(this))
            return this.byteOffset;
        }
      });
      function Y(_) {
        if (_ > U)
          throw new RangeError('The value "' + _ + '" is invalid for option "size"');
        const w = new $(_);
        return Object.setPrototypeOf(w, N.prototype), w;
      }
      function N(_, w, p) {
        if (typeof _ == "number") {
          if (typeof w == "string")
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          return re(_);
        }
        return J(_, w, p);
      }
      N.poolSize = 8192;
      function J(_, w, p) {
        if (typeof _ == "string")
          return X(_, w);
        if (O.isView(_))
          return de(_);
        if (_ == null)
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof _
          );
        if (x(_, O) || _ && x(_.buffer, O) || typeof q < "u" && (x(_, q) || _ && x(_.buffer, q)))
          return xe(_, w, p);
        if (typeof _ == "number")
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        const B = _.valueOf && _.valueOf();
        if (B != null && B !== _)
          return N.from(B, w, p);
        const L = Re(_);
        if (L) return L;
        if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof _[Symbol.toPrimitive] == "function")
          return N.from(_[Symbol.toPrimitive]("string"), w, p);
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof _
        );
      }
      N.from = function(_, w, p) {
        return J(_, w, p);
      }, Object.setPrototypeOf(N.prototype, $.prototype), Object.setPrototypeOf(N, $);
      function oe(_) {
        if (typeof _ != "number")
          throw new TypeError('"size" argument must be of type number');
        if (_ < 0)
          throw new RangeError('The value "' + _ + '" is invalid for option "size"');
      }
      function _e(_, w, p) {
        return oe(_), _ <= 0 ? Y(_) : w !== void 0 ? typeof p == "string" ? Y(_).fill(w, p) : Y(_).fill(w) : Y(_);
      }
      N.alloc = function(_, w, p) {
        return _e(_, w, p);
      };
      function re(_) {
        return oe(_), Y(_ < 0 ? 0 : be(_) | 0);
      }
      N.allocUnsafe = function(_) {
        return re(_);
      }, N.allocUnsafeSlow = function(_) {
        return re(_);
      };
      function X(_, w) {
        if ((typeof w != "string" || w === "") && (w = "utf8"), !N.isEncoding(w))
          throw new TypeError("Unknown encoding: " + w);
        const p = ye(_, w) | 0;
        let B = Y(p);
        const L = B.write(_, w);
        return L !== p && (B = B.slice(0, L)), B;
      }
      function ie(_) {
        const w = _.length < 0 ? 0 : be(_.length) | 0, p = Y(w);
        for (let B = 0; B < w; B += 1)
          p[B] = _[B] & 255;
        return p;
      }
      function de(_) {
        if (x(_, $)) {
          const w = new $(_);
          return xe(w.buffer, w.byteOffset, w.byteLength);
        }
        return ie(_);
      }
      function xe(_, w, p) {
        if (w < 0 || _.byteLength < w)
          throw new RangeError('"offset" is outside of buffer bounds');
        if (_.byteLength < w + (p || 0))
          throw new RangeError('"length" is outside of buffer bounds');
        let B;
        return w === void 0 && p === void 0 ? B = new $(_) : p === void 0 ? B = new $(_, w) : B = new $(_, w, p), Object.setPrototypeOf(B, N.prototype), B;
      }
      function Re(_) {
        if (N.isBuffer(_)) {
          const w = be(_.length) | 0, p = Y(w);
          return p.length === 0 || _.copy(p, 0, 0, w), p;
        }
        if (_.length !== void 0)
          return typeof _.length != "number" || j(_.length) ? Y(0) : ie(_);
        if (_.type === "Buffer" && Array.isArray(_.data))
          return ie(_.data);
      }
      function be(_) {
        if (_ >= U)
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + U.toString(16) + " bytes");
        return _ | 0;
      }
      function Ae(_) {
        return +_ != _ && (_ = 0), N.alloc(+_);
      }
      N.isBuffer = function(w) {
        return w != null && w._isBuffer === !0 && w !== N.prototype;
      }, N.compare = function(w, p) {
        if (x(w, $) && (w = N.from(w, w.offset, w.byteLength)), x(p, $) && (p = N.from(p, p.offset, p.byteLength)), !N.isBuffer(w) || !N.isBuffer(p))
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        if (w === p) return 0;
        let B = w.length, L = p.length;
        for (let G = 0, K = Math.min(B, L); G < K; ++G)
          if (w[G] !== p[G]) {
            B = w[G], L = p[G];
            break;
          }
        return B < L ? -1 : L < B ? 1 : 0;
      }, N.isEncoding = function(w) {
        switch (String(w).toLowerCase()) {
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
      }, N.concat = function(w, p) {
        if (!Array.isArray(w))
          throw new TypeError('"list" argument must be an Array of Buffers');
        if (w.length === 0)
          return N.alloc(0);
        let B;
        if (p === void 0)
          for (p = 0, B = 0; B < w.length; ++B)
            p += w[B].length;
        const L = N.allocUnsafe(p);
        let G = 0;
        for (B = 0; B < w.length; ++B) {
          let K = w[B];
          if (x(K, $))
            G + K.length > L.length ? (N.isBuffer(K) || (K = N.from(K)), K.copy(L, G)) : $.prototype.set.call(
              L,
              K,
              G
            );
          else if (N.isBuffer(K))
            K.copy(L, G);
          else
            throw new TypeError('"list" argument must be an Array of Buffers');
          G += K.length;
        }
        return L;
      };
      function ye(_, w) {
        if (N.isBuffer(_))
          return _.length;
        if (O.isView(_) || x(_, O))
          return _.byteLength;
        if (typeof _ != "string")
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof _
          );
        const p = _.length, B = arguments.length > 2 && arguments[2] === !0;
        if (!B && p === 0) return 0;
        let L = !1;
        for (; ; )
          switch (w) {
            case "ascii":
            case "latin1":
            case "binary":
              return p;
            case "utf8":
            case "utf-8":
              return Q(_).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return p * 2;
            case "hex":
              return p >>> 1;
            case "base64":
              return W(_).length;
            default:
              if (L)
                return B ? -1 : Q(_).length;
              w = ("" + w).toLowerCase(), L = !0;
          }
      }
      N.byteLength = ye;
      function Be(_, w, p) {
        let B = !1;
        if ((w === void 0 || w < 0) && (w = 0), w > this.length || ((p === void 0 || p > this.length) && (p = this.length), p <= 0) || (p >>>= 0, w >>>= 0, p <= w))
          return "";
        for (_ || (_ = "utf8"); ; )
          switch (_) {
            case "hex":
              return St(this, w, p);
            case "utf8":
            case "utf-8":
              return Ue(this, w, p);
            case "ascii":
              return Se(this, w, p);
            case "latin1":
            case "binary":
              return lt(this, w, p);
            case "base64":
              return Ve(this, w, p);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return It(this, w, p);
            default:
              if (B) throw new TypeError("Unknown encoding: " + _);
              _ = (_ + "").toLowerCase(), B = !0;
          }
      }
      N.prototype._isBuffer = !0;
      function ke(_, w, p) {
        const B = _[w];
        _[w] = _[p], _[p] = B;
      }
      N.prototype.swap16 = function() {
        const w = this.length;
        if (w % 2 !== 0)
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (let p = 0; p < w; p += 2)
          ke(this, p, p + 1);
        return this;
      }, N.prototype.swap32 = function() {
        const w = this.length;
        if (w % 4 !== 0)
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (let p = 0; p < w; p += 4)
          ke(this, p, p + 3), ke(this, p + 1, p + 2);
        return this;
      }, N.prototype.swap64 = function() {
        const w = this.length;
        if (w % 8 !== 0)
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (let p = 0; p < w; p += 8)
          ke(this, p, p + 7), ke(this, p + 1, p + 6), ke(this, p + 2, p + 5), ke(this, p + 3, p + 4);
        return this;
      }, N.prototype.toString = function() {
        const w = this.length;
        return w === 0 ? "" : arguments.length === 0 ? Ue(this, 0, w) : Be.apply(this, arguments);
      }, N.prototype.toLocaleString = N.prototype.toString, N.prototype.equals = function(w) {
        if (!N.isBuffer(w)) throw new TypeError("Argument must be a Buffer");
        return this === w ? !0 : N.compare(this, w) === 0;
      }, N.prototype.inspect = function() {
        let w = "";
        const p = T.INSPECT_MAX_BYTES;
        return w = this.toString("hex", 0, p).replace(/(.{2})/g, "$1 ").trim(), this.length > p && (w += " ... "), "<Buffer " + w + ">";
      }, M && (N.prototype[M] = N.prototype.inspect), N.prototype.compare = function(w, p, B, L, G) {
        if (x(w, $) && (w = N.from(w, w.offset, w.byteLength)), !N.isBuffer(w))
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof w
          );
        if (p === void 0 && (p = 0), B === void 0 && (B = w ? w.length : 0), L === void 0 && (L = 0), G === void 0 && (G = this.length), p < 0 || B > w.length || L < 0 || G > this.length)
          throw new RangeError("out of range index");
        if (L >= G && p >= B)
          return 0;
        if (L >= G)
          return -1;
        if (p >= B)
          return 1;
        if (p >>>= 0, B >>>= 0, L >>>= 0, G >>>= 0, this === w) return 0;
        let K = G - L, ve = B - p;
        const He = Math.min(K, ve), Me = this.slice(L, G), Ie = w.slice(p, B);
        for (let $e = 0; $e < He; ++$e)
          if (Me[$e] !== Ie[$e]) {
            K = Me[$e], ve = Ie[$e];
            break;
          }
        return K < ve ? -1 : ve < K ? 1 : 0;
      };
      function Ee(_, w, p, B, L) {
        if (_.length === 0) return -1;
        if (typeof p == "string" ? (B = p, p = 0) : p > 2147483647 ? p = 2147483647 : p < -2147483648 && (p = -2147483648), p = +p, j(p) && (p = L ? 0 : _.length - 1), p < 0 && (p = _.length + p), p >= _.length) {
          if (L) return -1;
          p = _.length - 1;
        } else if (p < 0)
          if (L) p = 0;
          else return -1;
        if (typeof w == "string" && (w = N.from(w, B)), N.isBuffer(w))
          return w.length === 0 ? -1 : De(_, w, p, B, L);
        if (typeof w == "number")
          return w = w & 255, typeof $.prototype.indexOf == "function" ? L ? $.prototype.indexOf.call(_, w, p) : $.prototype.lastIndexOf.call(_, w, p) : De(_, [w], p, B, L);
        throw new TypeError("val must be string, number or Buffer");
      }
      function De(_, w, p, B, L) {
        let G = 1, K = _.length, ve = w.length;
        if (B !== void 0 && (B = String(B).toLowerCase(), B === "ucs2" || B === "ucs-2" || B === "utf16le" || B === "utf-16le")) {
          if (_.length < 2 || w.length < 2)
            return -1;
          G = 2, K /= 2, ve /= 2, p /= 2;
        }
        function He(Ie, $e) {
          return G === 1 ? Ie[$e] : Ie.readUInt16BE($e * G);
        }
        let Me;
        if (L) {
          let Ie = -1;
          for (Me = p; Me < K; Me++)
            if (He(_, Me) === He(w, Ie === -1 ? 0 : Me - Ie)) {
              if (Ie === -1 && (Ie = Me), Me - Ie + 1 === ve) return Ie * G;
            } else
              Ie !== -1 && (Me -= Me - Ie), Ie = -1;
        } else
          for (p + ve > K && (p = K - ve), Me = p; Me >= 0; Me--) {
            let Ie = !0;
            for (let $e = 0; $e < ve; $e++)
              if (He(_, Me + $e) !== He(w, $e)) {
                Ie = !1;
                break;
              }
            if (Ie) return Me;
          }
        return -1;
      }
      N.prototype.includes = function(w, p, B) {
        return this.indexOf(w, p, B) !== -1;
      }, N.prototype.indexOf = function(w, p, B) {
        return Ee(this, w, p, B, !0);
      }, N.prototype.lastIndexOf = function(w, p, B) {
        return Ee(this, w, p, B, !1);
      };
      function Ge(_, w, p, B) {
        p = Number(p) || 0;
        const L = _.length - p;
        B ? (B = Number(B), B > L && (B = L)) : B = L;
        const G = w.length;
        B > G / 2 && (B = G / 2);
        let K;
        for (K = 0; K < B; ++K) {
          const ve = parseInt(w.substr(K * 2, 2), 16);
          if (j(ve)) return K;
          _[p + K] = ve;
        }
        return K;
      }
      function tt(_, w, p, B) {
        return V(Q(w, _.length - p), _, p, B);
      }
      function je(_, w, p, B) {
        return V(ce(w), _, p, B);
      }
      function we(_, w, p, B) {
        return V(W(w), _, p, B);
      }
      function Oe(_, w, p, B) {
        return V(h(w, _.length - p), _, p, B);
      }
      N.prototype.write = function(w, p, B, L) {
        if (p === void 0)
          L = "utf8", B = this.length, p = 0;
        else if (B === void 0 && typeof p == "string")
          L = p, B = this.length, p = 0;
        else if (isFinite(p))
          p = p >>> 0, isFinite(B) ? (B = B >>> 0, L === void 0 && (L = "utf8")) : (L = B, B = void 0);
        else
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        const G = this.length - p;
        if ((B === void 0 || B > G) && (B = G), w.length > 0 && (B < 0 || p < 0) || p > this.length)
          throw new RangeError("Attempt to write outside buffer bounds");
        L || (L = "utf8");
        let K = !1;
        for (; ; )
          switch (L) {
            case "hex":
              return Ge(this, w, p, B);
            case "utf8":
            case "utf-8":
              return tt(this, w, p, B);
            case "ascii":
            case "latin1":
            case "binary":
              return je(this, w, p, B);
            case "base64":
              return we(this, w, p, B);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return Oe(this, w, p, B);
            default:
              if (K) throw new TypeError("Unknown encoding: " + L);
              L = ("" + L).toLowerCase(), K = !0;
          }
      }, N.prototype.toJSON = function() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function Ve(_, w, p) {
        return w === 0 && p === _.length ? D.fromByteArray(_) : D.fromByteArray(_.slice(w, p));
      }
      function Ue(_, w, p) {
        p = Math.min(_.length, p);
        const B = [];
        let L = w;
        for (; L < p; ) {
          const G = _[L];
          let K = null, ve = G > 239 ? 4 : G > 223 ? 3 : G > 191 ? 2 : 1;
          if (L + ve <= p) {
            let He, Me, Ie, $e;
            switch (ve) {
              case 1:
                G < 128 && (K = G);
                break;
              case 2:
                He = _[L + 1], (He & 192) === 128 && ($e = (G & 31) << 6 | He & 63, $e > 127 && (K = $e));
                break;
              case 3:
                He = _[L + 1], Me = _[L + 2], (He & 192) === 128 && (Me & 192) === 128 && ($e = (G & 15) << 12 | (He & 63) << 6 | Me & 63, $e > 2047 && ($e < 55296 || $e > 57343) && (K = $e));
                break;
              case 4:
                He = _[L + 1], Me = _[L + 2], Ie = _[L + 3], (He & 192) === 128 && (Me & 192) === 128 && (Ie & 192) === 128 && ($e = (G & 15) << 18 | (He & 63) << 12 | (Me & 63) << 6 | Ie & 63, $e > 65535 && $e < 1114112 && (K = $e));
            }
          }
          K === null ? (K = 65533, ve = 1) : K > 65535 && (K -= 65536, B.push(K >>> 10 & 1023 | 55296), K = 56320 | K & 1023), B.push(K), L += ve;
        }
        return Ce(B);
      }
      const ze = 4096;
      function Ce(_) {
        const w = _.length;
        if (w <= ze)
          return String.fromCharCode.apply(String, _);
        let p = "", B = 0;
        for (; B < w; )
          p += String.fromCharCode.apply(
            String,
            _.slice(B, B += ze)
          );
        return p;
      }
      function Se(_, w, p) {
        let B = "";
        p = Math.min(_.length, p);
        for (let L = w; L < p; ++L)
          B += String.fromCharCode(_[L] & 127);
        return B;
      }
      function lt(_, w, p) {
        let B = "";
        p = Math.min(_.length, p);
        for (let L = w; L < p; ++L)
          B += String.fromCharCode(_[L]);
        return B;
      }
      function St(_, w, p) {
        const B = _.length;
        (!w || w < 0) && (w = 0), (!p || p < 0 || p > B) && (p = B);
        let L = "";
        for (let G = w; G < p; ++G)
          L += Z[_[G]];
        return L;
      }
      function It(_, w, p) {
        const B = _.slice(w, p);
        let L = "";
        for (let G = 0; G < B.length - 1; G += 2)
          L += String.fromCharCode(B[G] + B[G + 1] * 256);
        return L;
      }
      N.prototype.slice = function(w, p) {
        const B = this.length;
        w = ~~w, p = p === void 0 ? B : ~~p, w < 0 ? (w += B, w < 0 && (w = 0)) : w > B && (w = B), p < 0 ? (p += B, p < 0 && (p = 0)) : p > B && (p = B), p < w && (p = w);
        const L = this.subarray(w, p);
        return Object.setPrototypeOf(L, N.prototype), L;
      };
      function Fe(_, w, p) {
        if (_ % 1 !== 0 || _ < 0) throw new RangeError("offset is not uint");
        if (_ + w > p) throw new RangeError("Trying to access beyond buffer length");
      }
      N.prototype.readUintLE = N.prototype.readUIntLE = function(w, p, B) {
        w = w >>> 0, p = p >>> 0, B || Fe(w, p, this.length);
        let L = this[w], G = 1, K = 0;
        for (; ++K < p && (G *= 256); )
          L += this[w + K] * G;
        return L;
      }, N.prototype.readUintBE = N.prototype.readUIntBE = function(w, p, B) {
        w = w >>> 0, p = p >>> 0, B || Fe(w, p, this.length);
        let L = this[w + --p], G = 1;
        for (; p > 0 && (G *= 256); )
          L += this[w + --p] * G;
        return L;
      }, N.prototype.readUint8 = N.prototype.readUInt8 = function(w, p) {
        return w = w >>> 0, p || Fe(w, 1, this.length), this[w];
      }, N.prototype.readUint16LE = N.prototype.readUInt16LE = function(w, p) {
        return w = w >>> 0, p || Fe(w, 2, this.length), this[w] | this[w + 1] << 8;
      }, N.prototype.readUint16BE = N.prototype.readUInt16BE = function(w, p) {
        return w = w >>> 0, p || Fe(w, 2, this.length), this[w] << 8 | this[w + 1];
      }, N.prototype.readUint32LE = N.prototype.readUInt32LE = function(w, p) {
        return w = w >>> 0, p || Fe(w, 4, this.length), (this[w] | this[w + 1] << 8 | this[w + 2] << 16) + this[w + 3] * 16777216;
      }, N.prototype.readUint32BE = N.prototype.readUInt32BE = function(w, p) {
        return w = w >>> 0, p || Fe(w, 4, this.length), this[w] * 16777216 + (this[w + 1] << 16 | this[w + 2] << 8 | this[w + 3]);
      }, N.prototype.readBigUInt64LE = he(function(w) {
        w = w >>> 0, C(w, "offset");
        const p = this[w], B = this[w + 7];
        (p === void 0 || B === void 0) && S(w, this.length - 8);
        const L = p + this[++w] * 2 ** 8 + this[++w] * 2 ** 16 + this[++w] * 2 ** 24, G = this[++w] + this[++w] * 2 ** 8 + this[++w] * 2 ** 16 + B * 2 ** 24;
        return BigInt(L) + (BigInt(G) << BigInt(32));
      }), N.prototype.readBigUInt64BE = he(function(w) {
        w = w >>> 0, C(w, "offset");
        const p = this[w], B = this[w + 7];
        (p === void 0 || B === void 0) && S(w, this.length - 8);
        const L = p * 2 ** 24 + this[++w] * 2 ** 16 + this[++w] * 2 ** 8 + this[++w], G = this[++w] * 2 ** 24 + this[++w] * 2 ** 16 + this[++w] * 2 ** 8 + B;
        return (BigInt(L) << BigInt(32)) + BigInt(G);
      }), N.prototype.readIntLE = function(w, p, B) {
        w = w >>> 0, p = p >>> 0, B || Fe(w, p, this.length);
        let L = this[w], G = 1, K = 0;
        for (; ++K < p && (G *= 256); )
          L += this[w + K] * G;
        return G *= 128, L >= G && (L -= Math.pow(2, 8 * p)), L;
      }, N.prototype.readIntBE = function(w, p, B) {
        w = w >>> 0, p = p >>> 0, B || Fe(w, p, this.length);
        let L = p, G = 1, K = this[w + --L];
        for (; L > 0 && (G *= 256); )
          K += this[w + --L] * G;
        return G *= 128, K >= G && (K -= Math.pow(2, 8 * p)), K;
      }, N.prototype.readInt8 = function(w, p) {
        return w = w >>> 0, p || Fe(w, 1, this.length), this[w] & 128 ? (255 - this[w] + 1) * -1 : this[w];
      }, N.prototype.readInt16LE = function(w, p) {
        w = w >>> 0, p || Fe(w, 2, this.length);
        const B = this[w] | this[w + 1] << 8;
        return B & 32768 ? B | 4294901760 : B;
      }, N.prototype.readInt16BE = function(w, p) {
        w = w >>> 0, p || Fe(w, 2, this.length);
        const B = this[w + 1] | this[w] << 8;
        return B & 32768 ? B | 4294901760 : B;
      }, N.prototype.readInt32LE = function(w, p) {
        return w = w >>> 0, p || Fe(w, 4, this.length), this[w] | this[w + 1] << 8 | this[w + 2] << 16 | this[w + 3] << 24;
      }, N.prototype.readInt32BE = function(w, p) {
        return w = w >>> 0, p || Fe(w, 4, this.length), this[w] << 24 | this[w + 1] << 16 | this[w + 2] << 8 | this[w + 3];
      }, N.prototype.readBigInt64LE = he(function(w) {
        w = w >>> 0, C(w, "offset");
        const p = this[w], B = this[w + 7];
        (p === void 0 || B === void 0) && S(w, this.length - 8);
        const L = this[w + 4] + this[w + 5] * 2 ** 8 + this[w + 6] * 2 ** 16 + (B << 24);
        return (BigInt(L) << BigInt(32)) + BigInt(p + this[++w] * 2 ** 8 + this[++w] * 2 ** 16 + this[++w] * 2 ** 24);
      }), N.prototype.readBigInt64BE = he(function(w) {
        w = w >>> 0, C(w, "offset");
        const p = this[w], B = this[w + 7];
        (p === void 0 || B === void 0) && S(w, this.length - 8);
        const L = (p << 24) + // Overflow
        this[++w] * 2 ** 16 + this[++w] * 2 ** 8 + this[++w];
        return (BigInt(L) << BigInt(32)) + BigInt(this[++w] * 2 ** 24 + this[++w] * 2 ** 16 + this[++w] * 2 ** 8 + B);
      }), N.prototype.readFloatLE = function(w, p) {
        return w = w >>> 0, p || Fe(w, 4, this.length), P.read(this, w, !0, 23, 4);
      }, N.prototype.readFloatBE = function(w, p) {
        return w = w >>> 0, p || Fe(w, 4, this.length), P.read(this, w, !1, 23, 4);
      }, N.prototype.readDoubleLE = function(w, p) {
        return w = w >>> 0, p || Fe(w, 8, this.length), P.read(this, w, !0, 52, 8);
      }, N.prototype.readDoubleBE = function(w, p) {
        return w = w >>> 0, p || Fe(w, 8, this.length), P.read(this, w, !1, 52, 8);
      };
      function Xe(_, w, p, B, L, G) {
        if (!N.isBuffer(_)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (w > L || w < G) throw new RangeError('"value" argument is out of bounds');
        if (p + B > _.length) throw new RangeError("Index out of range");
      }
      N.prototype.writeUintLE = N.prototype.writeUIntLE = function(w, p, B, L) {
        if (w = +w, p = p >>> 0, B = B >>> 0, !L) {
          const ve = Math.pow(2, 8 * B) - 1;
          Xe(this, w, p, B, ve, 0);
        }
        let G = 1, K = 0;
        for (this[p] = w & 255; ++K < B && (G *= 256); )
          this[p + K] = w / G & 255;
        return p + B;
      }, N.prototype.writeUintBE = N.prototype.writeUIntBE = function(w, p, B, L) {
        if (w = +w, p = p >>> 0, B = B >>> 0, !L) {
          const ve = Math.pow(2, 8 * B) - 1;
          Xe(this, w, p, B, ve, 0);
        }
        let G = B - 1, K = 1;
        for (this[p + G] = w & 255; --G >= 0 && (K *= 256); )
          this[p + G] = w / K & 255;
        return p + B;
      }, N.prototype.writeUint8 = N.prototype.writeUInt8 = function(w, p, B) {
        return w = +w, p = p >>> 0, B || Xe(this, w, p, 1, 255, 0), this[p] = w & 255, p + 1;
      }, N.prototype.writeUint16LE = N.prototype.writeUInt16LE = function(w, p, B) {
        return w = +w, p = p >>> 0, B || Xe(this, w, p, 2, 65535, 0), this[p] = w & 255, this[p + 1] = w >>> 8, p + 2;
      }, N.prototype.writeUint16BE = N.prototype.writeUInt16BE = function(w, p, B) {
        return w = +w, p = p >>> 0, B || Xe(this, w, p, 2, 65535, 0), this[p] = w >>> 8, this[p + 1] = w & 255, p + 2;
      }, N.prototype.writeUint32LE = N.prototype.writeUInt32LE = function(w, p, B) {
        return w = +w, p = p >>> 0, B || Xe(this, w, p, 4, 4294967295, 0), this[p + 3] = w >>> 24, this[p + 2] = w >>> 16, this[p + 1] = w >>> 8, this[p] = w & 255, p + 4;
      }, N.prototype.writeUint32BE = N.prototype.writeUInt32BE = function(w, p, B) {
        return w = +w, p = p >>> 0, B || Xe(this, w, p, 4, 4294967295, 0), this[p] = w >>> 24, this[p + 1] = w >>> 16, this[p + 2] = w >>> 8, this[p + 3] = w & 255, p + 4;
      };
      function ut(_, w, p, B, L) {
        v(w, B, L, _, p, 7);
        let G = Number(w & BigInt(4294967295));
        _[p++] = G, G = G >> 8, _[p++] = G, G = G >> 8, _[p++] = G, G = G >> 8, _[p++] = G;
        let K = Number(w >> BigInt(32) & BigInt(4294967295));
        return _[p++] = K, K = K >> 8, _[p++] = K, K = K >> 8, _[p++] = K, K = K >> 8, _[p++] = K, p;
      }
      function Ze(_, w, p, B, L) {
        v(w, B, L, _, p, 7);
        let G = Number(w & BigInt(4294967295));
        _[p + 7] = G, G = G >> 8, _[p + 6] = G, G = G >> 8, _[p + 5] = G, G = G >> 8, _[p + 4] = G;
        let K = Number(w >> BigInt(32) & BigInt(4294967295));
        return _[p + 3] = K, K = K >> 8, _[p + 2] = K, K = K >> 8, _[p + 1] = K, K = K >> 8, _[p] = K, p + 8;
      }
      N.prototype.writeBigUInt64LE = he(function(w, p = 0) {
        return ut(this, w, p, BigInt(0), BigInt("0xffffffffffffffff"));
      }), N.prototype.writeBigUInt64BE = he(function(w, p = 0) {
        return Ze(this, w, p, BigInt(0), BigInt("0xffffffffffffffff"));
      }), N.prototype.writeIntLE = function(w, p, B, L) {
        if (w = +w, p = p >>> 0, !L) {
          const He = Math.pow(2, 8 * B - 1);
          Xe(this, w, p, B, He - 1, -He);
        }
        let G = 0, K = 1, ve = 0;
        for (this[p] = w & 255; ++G < B && (K *= 256); )
          w < 0 && ve === 0 && this[p + G - 1] !== 0 && (ve = 1), this[p + G] = (w / K >> 0) - ve & 255;
        return p + B;
      }, N.prototype.writeIntBE = function(w, p, B, L) {
        if (w = +w, p = p >>> 0, !L) {
          const He = Math.pow(2, 8 * B - 1);
          Xe(this, w, p, B, He - 1, -He);
        }
        let G = B - 1, K = 1, ve = 0;
        for (this[p + G] = w & 255; --G >= 0 && (K *= 256); )
          w < 0 && ve === 0 && this[p + G + 1] !== 0 && (ve = 1), this[p + G] = (w / K >> 0) - ve & 255;
        return p + B;
      }, N.prototype.writeInt8 = function(w, p, B) {
        return w = +w, p = p >>> 0, B || Xe(this, w, p, 1, 127, -128), w < 0 && (w = 255 + w + 1), this[p] = w & 255, p + 1;
      }, N.prototype.writeInt16LE = function(w, p, B) {
        return w = +w, p = p >>> 0, B || Xe(this, w, p, 2, 32767, -32768), this[p] = w & 255, this[p + 1] = w >>> 8, p + 2;
      }, N.prototype.writeInt16BE = function(w, p, B) {
        return w = +w, p = p >>> 0, B || Xe(this, w, p, 2, 32767, -32768), this[p] = w >>> 8, this[p + 1] = w & 255, p + 2;
      }, N.prototype.writeInt32LE = function(w, p, B) {
        return w = +w, p = p >>> 0, B || Xe(this, w, p, 4, 2147483647, -2147483648), this[p] = w & 255, this[p + 1] = w >>> 8, this[p + 2] = w >>> 16, this[p + 3] = w >>> 24, p + 4;
      }, N.prototype.writeInt32BE = function(w, p, B) {
        return w = +w, p = p >>> 0, B || Xe(this, w, p, 4, 2147483647, -2147483648), w < 0 && (w = 4294967295 + w + 1), this[p] = w >>> 24, this[p + 1] = w >>> 16, this[p + 2] = w >>> 8, this[p + 3] = w & 255, p + 4;
      }, N.prototype.writeBigInt64LE = he(function(w, p = 0) {
        return ut(this, w, p, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      }), N.prototype.writeBigInt64BE = he(function(w, p = 0) {
        return Ze(this, w, p, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function vt(_, w, p, B, L, G) {
        if (p + B > _.length) throw new RangeError("Index out of range");
        if (p < 0) throw new RangeError("Index out of range");
      }
      function Et(_, w, p, B, L) {
        return w = +w, p = p >>> 0, L || vt(_, w, p, 4), P.write(_, w, p, B, 23, 4), p + 4;
      }
      N.prototype.writeFloatLE = function(w, p, B) {
        return Et(this, w, p, !0, B);
      }, N.prototype.writeFloatBE = function(w, p, B) {
        return Et(this, w, p, !1, B);
      };
      function Le(_, w, p, B, L) {
        return w = +w, p = p >>> 0, L || vt(_, w, p, 8), P.write(_, w, p, B, 52, 8), p + 8;
      }
      N.prototype.writeDoubleLE = function(w, p, B) {
        return Le(this, w, p, !0, B);
      }, N.prototype.writeDoubleBE = function(w, p, B) {
        return Le(this, w, p, !1, B);
      }, N.prototype.copy = function(w, p, B, L) {
        if (!N.isBuffer(w)) throw new TypeError("argument should be a Buffer");
        if (B || (B = 0), !L && L !== 0 && (L = this.length), p >= w.length && (p = w.length), p || (p = 0), L > 0 && L < B && (L = B), L === B || w.length === 0 || this.length === 0) return 0;
        if (p < 0)
          throw new RangeError("targetStart out of bounds");
        if (B < 0 || B >= this.length) throw new RangeError("Index out of range");
        if (L < 0) throw new RangeError("sourceEnd out of bounds");
        L > this.length && (L = this.length), w.length - p < L - B && (L = w.length - p + B);
        const G = L - B;
        return this === w && typeof $.prototype.copyWithin == "function" ? this.copyWithin(p, B, L) : $.prototype.set.call(
          w,
          this.subarray(B, L),
          p
        ), G;
      }, N.prototype.fill = function(w, p, B, L) {
        if (typeof w == "string") {
          if (typeof p == "string" ? (L = p, p = 0, B = this.length) : typeof B == "string" && (L = B, B = this.length), L !== void 0 && typeof L != "string")
            throw new TypeError("encoding must be a string");
          if (typeof L == "string" && !N.isEncoding(L))
            throw new TypeError("Unknown encoding: " + L);
          if (w.length === 1) {
            const K = w.charCodeAt(0);
            (L === "utf8" && K < 128 || L === "latin1") && (w = K);
          }
        } else typeof w == "number" ? w = w & 255 : typeof w == "boolean" && (w = Number(w));
        if (p < 0 || this.length < p || this.length < B)
          throw new RangeError("Out of range index");
        if (B <= p)
          return this;
        p = p >>> 0, B = B === void 0 ? this.length : B >>> 0, w || (w = 0);
        let G;
        if (typeof w == "number")
          for (G = p; G < B; ++G)
            this[G] = w;
        else {
          const K = N.isBuffer(w) ? w : N.from(w, L), ve = K.length;
          if (ve === 0)
            throw new TypeError('The value "' + w + '" is invalid for argument "value"');
          for (G = 0; G < B - p; ++G)
            this[G + p] = K[G % ve];
        }
        return this;
      };
      const it = {};
      function k(_, w, p) {
        it[_] = class extends p {
          constructor() {
            super(), Object.defineProperty(this, "message", {
              value: w.apply(this, arguments),
              writable: !0,
              configurable: !0
            }), this.name = \`\${this.name} [\${_}]\`, this.stack, delete this.name;
          }
          get code() {
            return _;
          }
          set code(L) {
            Object.defineProperty(this, "code", {
              configurable: !0,
              enumerable: !0,
              value: L,
              writable: !0
            });
          }
          toString() {
            return \`\${this.name} [\${_}]: \${this.message}\`;
          }
        };
      }
      k(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(_) {
          return _ ? \`\${_} is outside of buffer bounds\` : "Attempt to access memory outside buffer bounds";
        },
        RangeError
      ), k(
        "ERR_INVALID_ARG_TYPE",
        function(_, w) {
          return \`The "\${_}" argument must be of type number. Received type \${typeof w}\`;
        },
        TypeError
      ), k(
        "ERR_OUT_OF_RANGE",
        function(_, w, p) {
          let B = \`The value of "\${_}" is out of range.\`, L = p;
          return Number.isInteger(p) && Math.abs(p) > 2 ** 32 ? L = c(String(p)) : typeof p == "bigint" && (L = String(p), (p > BigInt(2) ** BigInt(32) || p < -(BigInt(2) ** BigInt(32))) && (L = c(L)), L += "n"), B += \` It must be \${w}. Received \${L}\`, B;
        },
        RangeError
      );
      function c(_) {
        let w = "", p = _.length;
        const B = _[0] === "-" ? 1 : 0;
        for (; p >= B + 4; p -= 3)
          w = \`_\${_.slice(p - 3, p)}\${w}\`;
        return \`\${_.slice(0, p)}\${w}\`;
      }
      function d(_, w, p) {
        C(w, "offset"), (_[w] === void 0 || _[w + p] === void 0) && S(w, _.length - (p + 1));
      }
      function v(_, w, p, B, L, G) {
        if (_ > p || _ < w) {
          const K = typeof w == "bigint" ? "n" : "";
          let ve;
          throw w === 0 || w === BigInt(0) ? ve = \`>= 0\${K} and < 2\${K} ** \${(G + 1) * 8}\${K}\` : ve = \`>= -(2\${K} ** \${(G + 1) * 8 - 1}\${K}) and < 2 ** \${(G + 1) * 8 - 1}\${K}\`, new it.ERR_OUT_OF_RANGE("value", ve, _);
        }
        d(B, L, G);
      }
      function C(_, w) {
        if (typeof _ != "number")
          throw new it.ERR_INVALID_ARG_TYPE(w, "number", _);
      }
      function S(_, w, p) {
        throw Math.floor(_) !== _ ? (C(_, p), new it.ERR_OUT_OF_RANGE("offset", "an integer", _)) : w < 0 ? new it.ERR_BUFFER_OUT_OF_BOUNDS() : new it.ERR_OUT_OF_RANGE(
          "offset",
          \`>= 0 and <= \${w}\`,
          _
        );
      }
      const F = /[^+/0-9A-Za-z-_]/g;
      function b(_) {
        if (_ = _.split("=")[0], _ = _.trim().replace(F, ""), _.length < 2) return "";
        for (; _.length % 4 !== 0; )
          _ = _ + "=";
        return _;
      }
      function Q(_, w) {
        w = w || 1 / 0;
        let p;
        const B = _.length;
        let L = null;
        const G = [];
        for (let K = 0; K < B; ++K) {
          if (p = _.charCodeAt(K), p > 55295 && p < 57344) {
            if (!L) {
              if (p > 56319) {
                (w -= 3) > -1 && G.push(239, 191, 189);
                continue;
              } else if (K + 1 === B) {
                (w -= 3) > -1 && G.push(239, 191, 189);
                continue;
              }
              L = p;
              continue;
            }
            if (p < 56320) {
              (w -= 3) > -1 && G.push(239, 191, 189), L = p;
              continue;
            }
            p = (L - 55296 << 10 | p - 56320) + 65536;
          } else L && (w -= 3) > -1 && G.push(239, 191, 189);
          if (L = null, p < 128) {
            if ((w -= 1) < 0) break;
            G.push(p);
          } else if (p < 2048) {
            if ((w -= 2) < 0) break;
            G.push(
              p >> 6 | 192,
              p & 63 | 128
            );
          } else if (p < 65536) {
            if ((w -= 3) < 0) break;
            G.push(
              p >> 12 | 224,
              p >> 6 & 63 | 128,
              p & 63 | 128
            );
          } else if (p < 1114112) {
            if ((w -= 4) < 0) break;
            G.push(
              p >> 18 | 240,
              p >> 12 & 63 | 128,
              p >> 6 & 63 | 128,
              p & 63 | 128
            );
          } else
            throw new Error("Invalid code point");
        }
        return G;
      }
      function ce(_) {
        const w = [];
        for (let p = 0; p < _.length; ++p)
          w.push(_.charCodeAt(p) & 255);
        return w;
      }
      function h(_, w) {
        let p, B, L;
        const G = [];
        for (let K = 0; K < _.length && !((w -= 2) < 0); ++K)
          p = _.charCodeAt(K), B = p >> 8, L = p % 256, G.push(L), G.push(B);
        return G;
      }
      function W(_) {
        return D.toByteArray(b(_));
      }
      function V(_, w, p, B) {
        let L;
        for (L = 0; L < B && !(L + p >= w.length || L >= _.length); ++L)
          w[L + p] = _[L];
        return L;
      }
      function x(_, w) {
        return _ instanceof w || _ != null && _.constructor != null && _.constructor.name != null && _.constructor.name === w.name;
      }
      function j(_) {
        return _ !== _;
      }
      const Z = function() {
        const _ = "0123456789abcdef", w = new Array(256);
        for (let p = 0; p < 16; ++p) {
          const B = p * 16;
          for (let L = 0; L < 16; ++L)
            w[B + L] = _[p] + _[L];
        }
        return w;
      }();
      function he(_) {
        return typeof BigInt > "u" ? ue : _;
      }
      function ue() {
        throw new Error("BigInt not supported");
      }
    })(e);
    const I = e.Buffer;
    t.Blob = e.Blob, t.BlobOptions = e.BlobOptions, t.Buffer = e.Buffer, t.File = e.File, t.FileOptions = e.FileOptions, t.INSPECT_MAX_BYTES = e.INSPECT_MAX_BYTES, t.SlowBuffer = e.SlowBuffer, t.TranscodeEncoding = e.TranscodeEncoding, t.atob = e.atob, t.btoa = e.btoa, t.constants = e.constants, t.default = I, t.isAscii = e.isAscii, t.isUtf8 = e.isUtf8, t.kMaxLength = e.kMaxLength, t.kStringMaxLength = e.kStringMaxLength, t.resolveObjectURL = e.resolveObjectURL, t.transcode = e.transcode;
  }(Vi)), Vi;
}
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var ka;
function Go() {
  return ka || (ka = 1, function(t, e) {
    var r = zc(), i = r.Buffer;
    function n(o, s) {
      for (var l in o)
        s[l] = o[l];
    }
    i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = r : (n(r, e), e.Buffer = a);
    function a(o, s, l) {
      return i(o, s, l);
    }
    a.prototype = Object.create(i.prototype), n(i, a), a.from = function(o, s, l) {
      if (typeof o == "number")
        throw new TypeError("Argument must not be a number");
      return i(o, s, l);
    }, a.alloc = function(o, s, l) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      var f = i(o);
      return s !== void 0 ? typeof l == "string" ? f.fill(s, l) : f.fill(s) : f.fill(0), f;
    }, a.allocUnsafe = function(o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return i(o);
    }, a.allocUnsafeSlow = function(o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return r.SlowBuffer(o);
    };
  }(yi, yi.exports)), yi.exports;
}
var Xi, xa;
function Hc() {
  if (xa) return Xi;
  xa = 1;
  var t = Go().Buffer;
  function e(r, i) {
    this._block = t.alloc(r), this._finalSize = i, this._blockSize = r, this._len = 0;
  }
  return e.prototype.update = function(r, i) {
    typeof r == "string" && (i = i || "utf8", r = t.from(r, i));
    for (var n = this._block, a = this._blockSize, o = r.length, s = this._len, l = 0; l < o; ) {
      for (var f = s % a, u = Math.min(o - l, a - f), m = 0; m < u; m++)
        n[f + m] = r[l + m];
      s += u, l += u, s % a === 0 && this._update(n);
    }
    return this._len += o, this;
  }, e.prototype.digest = function(r) {
    var i = this._len % this._blockSize;
    this._block[i] = 128, this._block.fill(0, i + 1), i >= this._finalSize && (this._update(this._block), this._block.fill(0));
    var n = this._len * 8;
    if (n <= 4294967295)
      this._block.writeUInt32BE(n, this._blockSize - 4);
    else {
      var a = (n & 4294967295) >>> 0, o = (n - a) / 4294967296;
      this._block.writeUInt32BE(o, this._blockSize - 8), this._block.writeUInt32BE(a, this._blockSize - 4);
    }
    this._update(this._block);
    var s = this._hash();
    return r ? s.toString(r) : s;
  }, e.prototype._update = function() {
    throw new Error("_update must be implemented by subclass");
  }, Xi = e, Xi;
}
var Yi, Sa;
function qc() {
  if (Sa) return Yi;
  Sa = 1;
  var t = jc(), e = Hc(), r = Go().Buffer, i = [
    1518500249,
    1859775393,
    -1894007588,
    -899497514
  ], n = new Array(80);
  function a() {
    this.init(), this._w = n, e.call(this, 64, 56);
  }
  t(a, e), a.prototype.init = function() {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
  };
  function o(u) {
    return u << 1 | u >>> 31;
  }
  function s(u) {
    return u << 5 | u >>> 27;
  }
  function l(u) {
    return u << 30 | u >>> 2;
  }
  function f(u, m, g, y) {
    return u === 0 ? m & g | ~m & y : u === 2 ? m & g | m & y | g & y : m ^ g ^ y;
  }
  return a.prototype._update = function(u) {
    for (var m = this._w, g = this._a | 0, y = this._b | 0, E = this._c | 0, A = this._d | 0, R = this._e | 0, I = 0; I < 16; ++I) m[I] = u.readInt32BE(I * 4);
    for (; I < 80; ++I) m[I] = o(m[I - 3] ^ m[I - 8] ^ m[I - 14] ^ m[I - 16]);
    for (var T = 0; T < 80; ++T) {
      var D = ~~(T / 20), P = s(g) + f(D, y, E, A) + R + m[T] + i[D] | 0;
      R = A, A = E, E = l(y), y = g, g = P;
    }
    this._a = g + this._a | 0, this._b = y + this._b | 0, this._c = E + this._c | 0, this._d = A + this._d | 0, this._e = R + this._e | 0;
  }, a.prototype._hash = function() {
    var u = r.allocUnsafe(20);
    return u.writeInt32BE(this._a | 0, 0), u.writeInt32BE(this._b | 0, 4), u.writeInt32BE(this._c | 0, 8), u.writeInt32BE(this._d | 0, 12), u.writeInt32BE(this._e | 0, 16), u;
  }, Yi = a, Yi;
}
var Wc = qc(), Zo = /* @__PURE__ */ Jt(Wc), Ki, Ia;
function Gc() {
  if (Ia) return Ki;
  Ia = 1;
  function t(n) {
    if (typeof n != "string")
      throw new TypeError("Path must be a string. Received " + JSON.stringify(n));
  }
  function e(n, a) {
    for (var o = "", s = 0, l = -1, f = 0, u, m = 0; m <= n.length; ++m) {
      if (m < n.length)
        u = n.charCodeAt(m);
      else {
        if (u === 47)
          break;
        u = 47;
      }
      if (u === 47) {
        if (!(l === m - 1 || f === 1)) if (l !== m - 1 && f === 2) {
          if (o.length < 2 || s !== 2 || o.charCodeAt(o.length - 1) !== 46 || o.charCodeAt(o.length - 2) !== 46) {
            if (o.length > 2) {
              var g = o.lastIndexOf("/");
              if (g !== o.length - 1) {
                g === -1 ? (o = "", s = 0) : (o = o.slice(0, g), s = o.length - 1 - o.lastIndexOf("/")), l = m, f = 0;
                continue;
              }
            } else if (o.length === 2 || o.length === 1) {
              o = "", s = 0, l = m, f = 0;
              continue;
            }
          }
          a && (o.length > 0 ? o += "/.." : o = "..", s = 2);
        } else
          o.length > 0 ? o += "/" + n.slice(l + 1, m) : o = n.slice(l + 1, m), s = m - l - 1;
        l = m, f = 0;
      } else u === 46 && f !== -1 ? ++f : f = -1;
    }
    return o;
  }
  function r(n, a) {
    var o = a.dir || a.root, s = a.base || (a.name || "") + (a.ext || "");
    return o ? o === a.root ? o + s : o + n + s : s;
  }
  var i = {
    // path.resolve([from ...], to)
    resolve: function() {
      for (var a = "", o = !1, s, l = arguments.length - 1; l >= -1 && !o; l--) {
        var f;
        l >= 0 ? f = arguments[l] : (s === void 0 && (s = gt.cwd()), f = s), t(f), f.length !== 0 && (a = f + "/" + a, o = f.charCodeAt(0) === 47);
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
      return a === void 0 ? "." : i.normalize(a);
    },
    relative: function(a, o) {
      if (t(a), t(o), a === o || (a = i.resolve(a), o = i.resolve(o), a === o)) return "";
      for (var s = 1; s < a.length && a.charCodeAt(s) === 47; ++s)
        ;
      for (var l = a.length, f = l - s, u = 1; u < o.length && o.charCodeAt(u) === 47; ++u)
        ;
      for (var m = o.length, g = m - u, y = f < g ? f : g, E = -1, A = 0; A <= y; ++A) {
        if (A === y) {
          if (g > y) {
            if (o.charCodeAt(u + A) === 47)
              return o.slice(u + A + 1);
            if (A === 0)
              return o.slice(u + A);
          } else f > y && (a.charCodeAt(s + A) === 47 ? E = A : A === 0 && (E = 0));
          break;
        }
        var R = a.charCodeAt(s + A), I = o.charCodeAt(u + A);
        if (R !== I)
          break;
        R === 47 && (E = A);
      }
      var T = "";
      for (A = s + E + 1; A <= l; ++A)
        (A === l || a.charCodeAt(A) === 47) && (T.length === 0 ? T += ".." : T += "/..");
      return T.length > 0 ? T + o.slice(u + E) : (u += E, o.charCodeAt(u) === 47 && ++u, o.slice(u));
    },
    _makeLong: function(a) {
      return a;
    },
    dirname: function(a) {
      if (t(a), a.length === 0) return ".";
      for (var o = a.charCodeAt(0), s = o === 47, l = -1, f = !0, u = a.length - 1; u >= 1; --u)
        if (o = a.charCodeAt(u), o === 47) {
          if (!f) {
            l = u;
            break;
          }
        } else
          f = !1;
      return l === -1 ? s ? "/" : "." : s && l === 1 ? "//" : a.slice(0, l);
    },
    basename: function(a, o) {
      if (o !== void 0 && typeof o != "string") throw new TypeError('"ext" argument must be a string');
      t(a);
      var s = 0, l = -1, f = !0, u;
      if (o !== void 0 && o.length > 0 && o.length <= a.length) {
        if (o.length === a.length && o === a) return "";
        var m = o.length - 1, g = -1;
        for (u = a.length - 1; u >= 0; --u) {
          var y = a.charCodeAt(u);
          if (y === 47) {
            if (!f) {
              s = u + 1;
              break;
            }
          } else
            g === -1 && (f = !1, g = u + 1), m >= 0 && (y === o.charCodeAt(m) ? --m === -1 && (l = u) : (m = -1, l = g));
        }
        return s === l ? l = g : l === -1 && (l = a.length), a.slice(s, l);
      } else {
        for (u = a.length - 1; u >= 0; --u)
          if (a.charCodeAt(u) === 47) {
            if (!f) {
              s = u + 1;
              break;
            }
          } else l === -1 && (f = !1, l = u + 1);
        return l === -1 ? "" : a.slice(s, l);
      }
    },
    extname: function(a) {
      t(a);
      for (var o = -1, s = 0, l = -1, f = !0, u = 0, m = a.length - 1; m >= 0; --m) {
        var g = a.charCodeAt(m);
        if (g === 47) {
          if (!f) {
            s = m + 1;
            break;
          }
          continue;
        }
        l === -1 && (f = !1, l = m + 1), g === 46 ? o === -1 ? o = m : u !== 1 && (u = 1) : o !== -1 && (u = -1);
      }
      return o === -1 || l === -1 || // We saw a non-dot character immediately before the dot
      u === 0 || // The (right-most) trimmed path component is exactly '..'
      u === 1 && o === l - 1 && o === s + 1 ? "" : a.slice(o, l);
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
      var s = a.charCodeAt(0), l = s === 47, f;
      l ? (o.root = "/", f = 1) : f = 0;
      for (var u = -1, m = 0, g = -1, y = !0, E = a.length - 1, A = 0; E >= f; --E) {
        if (s = a.charCodeAt(E), s === 47) {
          if (!y) {
            m = E + 1;
            break;
          }
          continue;
        }
        g === -1 && (y = !1, g = E + 1), s === 46 ? u === -1 ? u = E : A !== 1 && (A = 1) : u !== -1 && (A = -1);
      }
      return u === -1 || g === -1 || // We saw a non-dot character immediately before the dot
      A === 0 || // The (right-most) trimmed path component is exactly '..'
      A === 1 && u === g - 1 && u === m + 1 ? g !== -1 && (m === 0 && l ? o.base = o.name = a.slice(1, g) : o.base = o.name = a.slice(m, g)) : (m === 0 && l ? (o.name = a.slice(1, u), o.base = a.slice(1, g)) : (o.name = a.slice(m, u), o.base = a.slice(m, g)), o.ext = a.slice(u, g)), m > 0 ? o.dir = a.slice(0, m - 1) : l && (o.dir = "/"), o;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
  };
  return i.posix = i, Ki = i, Ki;
}
var ee = Gc(), Ji = {};
/*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */
var Ta;
function Zc() {
  return Ta || (Ta = 1, function(t) {
    (function(e) {
      e(typeof DO_NOT_EXPORT_CRC > "u" ? t : {});
    })(function(e) {
      e.version = "1.2.2";
      function r() {
        for (var O = 0, q = new Array(256), z = 0; z != 256; ++z)
          O = z, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, q[z] = O;
        return typeof Int32Array < "u" ? new Int32Array(q) : q;
      }
      var i = r();
      function n(O) {
        var q = 0, z = 0, Y = 0, N = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
        for (Y = 0; Y != 256; ++Y) N[Y] = O[Y];
        for (Y = 0; Y != 256; ++Y)
          for (z = O[Y], q = 256 + Y; q < 4096; q += 256) z = N[q] = z >>> 8 ^ O[z & 255];
        var J = [];
        for (Y = 1; Y != 16; ++Y) J[Y - 1] = typeof Int32Array < "u" ? N.subarray(Y * 256, Y * 256 + 256) : N.slice(Y * 256, Y * 256 + 256);
        return J;
      }
      var a = n(i), o = a[0], s = a[1], l = a[2], f = a[3], u = a[4], m = a[5], g = a[6], y = a[7], E = a[8], A = a[9], R = a[10], I = a[11], T = a[12], D = a[13], P = a[14];
      function M(O, q) {
        for (var z = q ^ -1, Y = 0, N = O.length; Y < N; ) z = z >>> 8 ^ i[(z ^ O.charCodeAt(Y++)) & 255];
        return ~z;
      }
      function U(O, q) {
        for (var z = q ^ -1, Y = O.length - 15, N = 0; N < Y; ) z = P[O[N++] ^ z & 255] ^ D[O[N++] ^ z >> 8 & 255] ^ T[O[N++] ^ z >> 16 & 255] ^ I[O[N++] ^ z >>> 24] ^ R[O[N++]] ^ A[O[N++]] ^ E[O[N++]] ^ y[O[N++]] ^ g[O[N++]] ^ m[O[N++]] ^ u[O[N++]] ^ f[O[N++]] ^ l[O[N++]] ^ s[O[N++]] ^ o[O[N++]] ^ i[O[N++]];
        for (Y += 15; N < Y; ) z = z >>> 8 ^ i[(z ^ O[N++]) & 255];
        return ~z;
      }
      function $(O, q) {
        for (var z = q ^ -1, Y = 0, N = O.length, J = 0, oe = 0; Y < N; )
          J = O.charCodeAt(Y++), J < 128 ? z = z >>> 8 ^ i[(z ^ J) & 255] : J < 2048 ? (z = z >>> 8 ^ i[(z ^ (192 | J >> 6 & 31)) & 255], z = z >>> 8 ^ i[(z ^ (128 | J & 63)) & 255]) : J >= 55296 && J < 57344 ? (J = (J & 1023) + 64, oe = O.charCodeAt(Y++) & 1023, z = z >>> 8 ^ i[(z ^ (240 | J >> 8 & 7)) & 255], z = z >>> 8 ^ i[(z ^ (128 | J >> 2 & 63)) & 255], z = z >>> 8 ^ i[(z ^ (128 | oe >> 6 & 15 | (J & 3) << 4)) & 255], z = z >>> 8 ^ i[(z ^ (128 | oe & 63)) & 255]) : (z = z >>> 8 ^ i[(z ^ (224 | J >> 12 & 15)) & 255], z = z >>> 8 ^ i[(z ^ (128 | J >> 6 & 63)) & 255], z = z >>> 8 ^ i[(z ^ (128 | J & 63)) & 255]);
        return ~z;
      }
      e.table = i, e.bstr = M, e.buf = U, e.str = $;
    });
  }(Ji)), Ji;
}
var Vc = Zc(), Xc = /* @__PURE__ */ Jt(Vc), Qi = {}, Ra;
function or() {
  return Ra || (Ra = 1, function(t) {
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
          for (var l in s)
            r(s, l) && (a[l] = s[l]);
        }
      }
      return a;
    }, t.shrinkBuf = function(a, o) {
      return a.length === o ? a : a.subarray ? a.subarray(0, o) : (a.length = o, a);
    };
    var i = {
      arraySet: function(a, o, s, l, f) {
        if (o.subarray && a.subarray) {
          a.set(o.subarray(s, s + l), f);
          return;
        }
        for (var u = 0; u < l; u++)
          a[f + u] = o[s + u];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        var o, s, l, f, u, m;
        for (l = 0, o = 0, s = a.length; o < s; o++)
          l += a[o].length;
        for (m = new Uint8Array(l), f = 0, o = 0, s = a.length; o < s; o++)
          u = a[o], m.set(u, f), f += u.length;
        return m;
      }
    }, n = {
      arraySet: function(a, o, s, l, f) {
        for (var u = 0; u < l; u++)
          a[f + u] = o[s + u];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        return [].concat.apply([], a);
      }
    };
    t.setTyped = function(a) {
      a ? (t.Buf8 = Uint8Array, t.Buf16 = Uint16Array, t.Buf32 = Int32Array, t.assign(t, i)) : (t.Buf8 = Array, t.Buf16 = Array, t.Buf32 = Array, t.assign(t, n));
    }, t.setTyped(e);
  }(Qi)), Qi;
}
var vr = {}, Dt = {}, lr = {}, Ba;
function Yc() {
  if (Ba) return lr;
  Ba = 1;
  var t = or(), e = 4, r = 0, i = 1, n = 2;
  function a(c) {
    for (var d = c.length; --d >= 0; )
      c[d] = 0;
  }
  var o = 0, s = 1, l = 2, f = 3, u = 258, m = 29, g = 256, y = g + 1 + m, E = 30, A = 19, R = 2 * y + 1, I = 15, T = 16, D = 7, P = 256, M = 16, U = 17, $ = 18, O = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  ), q = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  ), z = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  ), Y = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], N = 512, J = new Array((y + 2) * 2);
  a(J);
  var oe = new Array(E * 2);
  a(oe);
  var _e = new Array(N);
  a(_e);
  var re = new Array(u - f + 1);
  a(re);
  var X = new Array(m);
  a(X);
  var ie = new Array(E);
  a(ie);
  function de(c, d, v, C, S) {
    this.static_tree = c, this.extra_bits = d, this.extra_base = v, this.elems = C, this.max_length = S, this.has_stree = c && c.length;
  }
  var xe, Re, be;
  function Ae(c, d) {
    this.dyn_tree = c, this.max_code = 0, this.stat_desc = d;
  }
  function ye(c) {
    return c < 256 ? _e[c] : _e[256 + (c >>> 7)];
  }
  function Be(c, d) {
    c.pending_buf[c.pending++] = d & 255, c.pending_buf[c.pending++] = d >>> 8 & 255;
  }
  function ke(c, d, v) {
    c.bi_valid > T - v ? (c.bi_buf |= d << c.bi_valid & 65535, Be(c, c.bi_buf), c.bi_buf = d >> T - c.bi_valid, c.bi_valid += v - T) : (c.bi_buf |= d << c.bi_valid & 65535, c.bi_valid += v);
  }
  function Ee(c, d, v) {
    ke(
      c,
      v[d * 2],
      v[d * 2 + 1]
      /*.Len*/
    );
  }
  function De(c, d) {
    var v = 0;
    do
      v |= c & 1, c >>>= 1, v <<= 1;
    while (--d > 0);
    return v >>> 1;
  }
  function Ge(c) {
    c.bi_valid === 16 ? (Be(c, c.bi_buf), c.bi_buf = 0, c.bi_valid = 0) : c.bi_valid >= 8 && (c.pending_buf[c.pending++] = c.bi_buf & 255, c.bi_buf >>= 8, c.bi_valid -= 8);
  }
  function tt(c, d) {
    var v = d.dyn_tree, C = d.max_code, S = d.stat_desc.static_tree, F = d.stat_desc.has_stree, b = d.stat_desc.extra_bits, Q = d.stat_desc.extra_base, ce = d.stat_desc.max_length, h, W, V, x, j, Z, he = 0;
    for (x = 0; x <= I; x++)
      c.bl_count[x] = 0;
    for (v[c.heap[c.heap_max] * 2 + 1] = 0, h = c.heap_max + 1; h < R; h++)
      W = c.heap[h], x = v[v[W * 2 + 1] * 2 + 1] + 1, x > ce && (x = ce, he++), v[W * 2 + 1] = x, !(W > C) && (c.bl_count[x]++, j = 0, W >= Q && (j = b[W - Q]), Z = v[W * 2], c.opt_len += Z * (x + j), F && (c.static_len += Z * (S[W * 2 + 1] + j)));
    if (he !== 0) {
      do {
        for (x = ce - 1; c.bl_count[x] === 0; )
          x--;
        c.bl_count[x]--, c.bl_count[x + 1] += 2, c.bl_count[ce]--, he -= 2;
      } while (he > 0);
      for (x = ce; x !== 0; x--)
        for (W = c.bl_count[x]; W !== 0; )
          V = c.heap[--h], !(V > C) && (v[V * 2 + 1] !== x && (c.opt_len += (x - v[V * 2 + 1]) * v[V * 2], v[V * 2 + 1] = x), W--);
    }
  }
  function je(c, d, v) {
    var C = new Array(I + 1), S = 0, F, b;
    for (F = 1; F <= I; F++)
      C[F] = S = S + v[F - 1] << 1;
    for (b = 0; b <= d; b++) {
      var Q = c[b * 2 + 1];
      Q !== 0 && (c[b * 2] = De(C[Q]++, Q));
    }
  }
  function we() {
    var c, d, v, C, S, F = new Array(I + 1);
    for (v = 0, C = 0; C < m - 1; C++)
      for (X[C] = v, c = 0; c < 1 << O[C]; c++)
        re[v++] = C;
    for (re[v - 1] = C, S = 0, C = 0; C < 16; C++)
      for (ie[C] = S, c = 0; c < 1 << q[C]; c++)
        _e[S++] = C;
    for (S >>= 7; C < E; C++)
      for (ie[C] = S << 7, c = 0; c < 1 << q[C] - 7; c++)
        _e[256 + S++] = C;
    for (d = 0; d <= I; d++)
      F[d] = 0;
    for (c = 0; c <= 143; )
      J[c * 2 + 1] = 8, c++, F[8]++;
    for (; c <= 255; )
      J[c * 2 + 1] = 9, c++, F[9]++;
    for (; c <= 279; )
      J[c * 2 + 1] = 7, c++, F[7]++;
    for (; c <= 287; )
      J[c * 2 + 1] = 8, c++, F[8]++;
    for (je(J, y + 1, F), c = 0; c < E; c++)
      oe[c * 2 + 1] = 5, oe[c * 2] = De(c, 5);
    xe = new de(J, O, g + 1, y, I), Re = new de(oe, q, 0, E, I), be = new de(new Array(0), z, 0, A, D);
  }
  function Oe(c) {
    var d;
    for (d = 0; d < y; d++)
      c.dyn_ltree[d * 2] = 0;
    for (d = 0; d < E; d++)
      c.dyn_dtree[d * 2] = 0;
    for (d = 0; d < A; d++)
      c.bl_tree[d * 2] = 0;
    c.dyn_ltree[P * 2] = 1, c.opt_len = c.static_len = 0, c.last_lit = c.matches = 0;
  }
  function Ve(c) {
    c.bi_valid > 8 ? Be(c, c.bi_buf) : c.bi_valid > 0 && (c.pending_buf[c.pending++] = c.bi_buf), c.bi_buf = 0, c.bi_valid = 0;
  }
  function Ue(c, d, v, C) {
    Ve(c), Be(c, v), Be(c, ~v), t.arraySet(c.pending_buf, c.window, d, v, c.pending), c.pending += v;
  }
  function ze(c, d, v, C) {
    var S = d * 2, F = v * 2;
    return c[S] < c[F] || c[S] === c[F] && C[d] <= C[v];
  }
  function Ce(c, d, v) {
    for (var C = c.heap[v], S = v << 1; S <= c.heap_len && (S < c.heap_len && ze(d, c.heap[S + 1], c.heap[S], c.depth) && S++, !ze(d, C, c.heap[S], c.depth)); )
      c.heap[v] = c.heap[S], v = S, S <<= 1;
    c.heap[v] = C;
  }
  function Se(c, d, v) {
    var C, S, F = 0, b, Q;
    if (c.last_lit !== 0)
      do
        C = c.pending_buf[c.d_buf + F * 2] << 8 | c.pending_buf[c.d_buf + F * 2 + 1], S = c.pending_buf[c.l_buf + F], F++, C === 0 ? Ee(c, S, d) : (b = re[S], Ee(c, b + g + 1, d), Q = O[b], Q !== 0 && (S -= X[b], ke(c, S, Q)), C--, b = ye(C), Ee(c, b, v), Q = q[b], Q !== 0 && (C -= ie[b], ke(c, C, Q)));
      while (F < c.last_lit);
    Ee(c, P, d);
  }
  function lt(c, d) {
    var v = d.dyn_tree, C = d.stat_desc.static_tree, S = d.stat_desc.has_stree, F = d.stat_desc.elems, b, Q, ce = -1, h;
    for (c.heap_len = 0, c.heap_max = R, b = 0; b < F; b++)
      v[b * 2] !== 0 ? (c.heap[++c.heap_len] = ce = b, c.depth[b] = 0) : v[b * 2 + 1] = 0;
    for (; c.heap_len < 2; )
      h = c.heap[++c.heap_len] = ce < 2 ? ++ce : 0, v[h * 2] = 1, c.depth[h] = 0, c.opt_len--, S && (c.static_len -= C[h * 2 + 1]);
    for (d.max_code = ce, b = c.heap_len >> 1; b >= 1; b--)
      Ce(c, v, b);
    h = F;
    do
      b = c.heap[
        1
        /*SMALLEST*/
      ], c.heap[
        1
        /*SMALLEST*/
      ] = c.heap[c.heap_len--], Ce(
        c,
        v,
        1
        /*SMALLEST*/
      ), Q = c.heap[
        1
        /*SMALLEST*/
      ], c.heap[--c.heap_max] = b, c.heap[--c.heap_max] = Q, v[h * 2] = v[b * 2] + v[Q * 2], c.depth[h] = (c.depth[b] >= c.depth[Q] ? c.depth[b] : c.depth[Q]) + 1, v[b * 2 + 1] = v[Q * 2 + 1] = h, c.heap[
        1
        /*SMALLEST*/
      ] = h++, Ce(
        c,
        v,
        1
        /*SMALLEST*/
      );
    while (c.heap_len >= 2);
    c.heap[--c.heap_max] = c.heap[
      1
      /*SMALLEST*/
    ], tt(c, d), je(v, ce, c.bl_count);
  }
  function St(c, d, v) {
    var C, S = -1, F, b = d[0 * 2 + 1], Q = 0, ce = 7, h = 4;
    for (b === 0 && (ce = 138, h = 3), d[(v + 1) * 2 + 1] = 65535, C = 0; C <= v; C++)
      F = b, b = d[(C + 1) * 2 + 1], !(++Q < ce && F === b) && (Q < h ? c.bl_tree[F * 2] += Q : F !== 0 ? (F !== S && c.bl_tree[F * 2]++, c.bl_tree[M * 2]++) : Q <= 10 ? c.bl_tree[U * 2]++ : c.bl_tree[$ * 2]++, Q = 0, S = F, b === 0 ? (ce = 138, h = 3) : F === b ? (ce = 6, h = 3) : (ce = 7, h = 4));
  }
  function It(c, d, v) {
    var C, S = -1, F, b = d[0 * 2 + 1], Q = 0, ce = 7, h = 4;
    for (b === 0 && (ce = 138, h = 3), C = 0; C <= v; C++)
      if (F = b, b = d[(C + 1) * 2 + 1], !(++Q < ce && F === b)) {
        if (Q < h)
          do
            Ee(c, F, c.bl_tree);
          while (--Q !== 0);
        else F !== 0 ? (F !== S && (Ee(c, F, c.bl_tree), Q--), Ee(c, M, c.bl_tree), ke(c, Q - 3, 2)) : Q <= 10 ? (Ee(c, U, c.bl_tree), ke(c, Q - 3, 3)) : (Ee(c, $, c.bl_tree), ke(c, Q - 11, 7));
        Q = 0, S = F, b === 0 ? (ce = 138, h = 3) : F === b ? (ce = 6, h = 3) : (ce = 7, h = 4);
      }
  }
  function Fe(c) {
    var d;
    for (St(c, c.dyn_ltree, c.l_desc.max_code), St(c, c.dyn_dtree, c.d_desc.max_code), lt(c, c.bl_desc), d = A - 1; d >= 3 && c.bl_tree[Y[d] * 2 + 1] === 0; d--)
      ;
    return c.opt_len += 3 * (d + 1) + 5 + 5 + 4, d;
  }
  function Xe(c, d, v, C) {
    var S;
    for (ke(c, d - 257, 5), ke(c, v - 1, 5), ke(c, C - 4, 4), S = 0; S < C; S++)
      ke(c, c.bl_tree[Y[S] * 2 + 1], 3);
    It(c, c.dyn_ltree, d - 1), It(c, c.dyn_dtree, v - 1);
  }
  function ut(c) {
    var d = 4093624447, v;
    for (v = 0; v <= 31; v++, d >>>= 1)
      if (d & 1 && c.dyn_ltree[v * 2] !== 0)
        return r;
    if (c.dyn_ltree[9 * 2] !== 0 || c.dyn_ltree[10 * 2] !== 0 || c.dyn_ltree[13 * 2] !== 0)
      return i;
    for (v = 32; v < g; v++)
      if (c.dyn_ltree[v * 2] !== 0)
        return i;
    return r;
  }
  var Ze = !1;
  function vt(c) {
    Ze || (we(), Ze = !0), c.l_desc = new Ae(c.dyn_ltree, xe), c.d_desc = new Ae(c.dyn_dtree, Re), c.bl_desc = new Ae(c.bl_tree, be), c.bi_buf = 0, c.bi_valid = 0, Oe(c);
  }
  function Et(c, d, v, C) {
    ke(c, (o << 1) + (C ? 1 : 0), 3), Ue(c, d, v);
  }
  function Le(c) {
    ke(c, s << 1, 3), Ee(c, P, J), Ge(c);
  }
  function it(c, d, v, C) {
    var S, F, b = 0;
    c.level > 0 ? (c.strm.data_type === n && (c.strm.data_type = ut(c)), lt(c, c.l_desc), lt(c, c.d_desc), b = Fe(c), S = c.opt_len + 3 + 7 >>> 3, F = c.static_len + 3 + 7 >>> 3, F <= S && (S = F)) : S = F = v + 5, v + 4 <= S && d !== -1 ? Et(c, d, v, C) : c.strategy === e || F === S ? (ke(c, (s << 1) + (C ? 1 : 0), 3), Se(c, J, oe)) : (ke(c, (l << 1) + (C ? 1 : 0), 3), Xe(c, c.l_desc.max_code + 1, c.d_desc.max_code + 1, b + 1), Se(c, c.dyn_ltree, c.dyn_dtree)), Oe(c), C && Ve(c);
  }
  function k(c, d, v) {
    return c.pending_buf[c.d_buf + c.last_lit * 2] = d >>> 8 & 255, c.pending_buf[c.d_buf + c.last_lit * 2 + 1] = d & 255, c.pending_buf[c.l_buf + c.last_lit] = v & 255, c.last_lit++, d === 0 ? c.dyn_ltree[v * 2]++ : (c.matches++, d--, c.dyn_ltree[(re[v] + g + 1) * 2]++, c.dyn_dtree[ye(d) * 2]++), c.last_lit === c.lit_bufsize - 1;
  }
  return lr._tr_init = vt, lr._tr_stored_block = Et, lr._tr_flush_block = it, lr._tr_tally = k, lr._tr_align = Le, lr;
}
var en, $a;
function Vo() {
  if ($a) return en;
  $a = 1;
  function t(e, r, i, n) {
    for (var a = e & 65535 | 0, o = e >>> 16 & 65535 | 0, s = 0; i !== 0; ) {
      s = i > 2e3 ? 2e3 : i, i -= s;
      do
        a = a + r[n++] | 0, o = o + a | 0;
      while (--s);
      a %= 65521, o %= 65521;
    }
    return a | o << 16 | 0;
  }
  return en = t, en;
}
var tn, Aa;
function Xo() {
  if (Aa) return tn;
  Aa = 1;
  function t() {
    for (var i, n = [], a = 0; a < 256; a++) {
      i = a;
      for (var o = 0; o < 8; o++)
        i = i & 1 ? 3988292384 ^ i >>> 1 : i >>> 1;
      n[a] = i;
    }
    return n;
  }
  var e = t();
  function r(i, n, a, o) {
    var s = e, l = o + a;
    i ^= -1;
    for (var f = o; f < l; f++)
      i = i >>> 8 ^ s[(i ^ n[f]) & 255];
    return i ^ -1;
  }
  return tn = r, tn;
}
var rn, Da;
function ea() {
  return Da || (Da = 1, rn = {
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
  }), rn;
}
var Oa;
function Kc() {
  if (Oa) return Dt;
  Oa = 1;
  var t = or(), e = Yc(), r = Vo(), i = Xo(), n = ea(), a = 0, o = 1, s = 3, l = 4, f = 5, u = 0, m = 1, g = -2, y = -3, E = -5, A = -1, R = 1, I = 2, T = 3, D = 4, P = 0, M = 2, U = 8, $ = 9, O = 15, q = 8, z = 29, Y = 256, N = Y + 1 + z, J = 30, oe = 19, _e = 2 * N + 1, re = 15, X = 3, ie = 258, de = ie + X + 1, xe = 32, Re = 42, be = 69, Ae = 73, ye = 91, Be = 103, ke = 113, Ee = 666, De = 1, Ge = 2, tt = 3, je = 4, we = 3;
  function Oe(h, W) {
    return h.msg = n[W], W;
  }
  function Ve(h) {
    return (h << 1) - (h > 4 ? 9 : 0);
  }
  function Ue(h) {
    for (var W = h.length; --W >= 0; )
      h[W] = 0;
  }
  function ze(h) {
    var W = h.state, V = W.pending;
    V > h.avail_out && (V = h.avail_out), V !== 0 && (t.arraySet(h.output, W.pending_buf, W.pending_out, V, h.next_out), h.next_out += V, W.pending_out += V, h.total_out += V, h.avail_out -= V, W.pending -= V, W.pending === 0 && (W.pending_out = 0));
  }
  function Ce(h, W) {
    e._tr_flush_block(h, h.block_start >= 0 ? h.block_start : -1, h.strstart - h.block_start, W), h.block_start = h.strstart, ze(h.strm);
  }
  function Se(h, W) {
    h.pending_buf[h.pending++] = W;
  }
  function lt(h, W) {
    h.pending_buf[h.pending++] = W >>> 8 & 255, h.pending_buf[h.pending++] = W & 255;
  }
  function St(h, W, V, x) {
    var j = h.avail_in;
    return j > x && (j = x), j === 0 ? 0 : (h.avail_in -= j, t.arraySet(W, h.input, h.next_in, j, V), h.state.wrap === 1 ? h.adler = r(h.adler, W, j, V) : h.state.wrap === 2 && (h.adler = i(h.adler, W, j, V)), h.next_in += j, h.total_in += j, j);
  }
  function It(h, W) {
    var V = h.max_chain_length, x = h.strstart, j, Z, he = h.prev_length, ue = h.nice_match, _ = h.strstart > h.w_size - de ? h.strstart - (h.w_size - de) : 0, w = h.window, p = h.w_mask, B = h.prev, L = h.strstart + ie, G = w[x + he - 1], K = w[x + he];
    h.prev_length >= h.good_match && (V >>= 2), ue > h.lookahead && (ue = h.lookahead);
    do
      if (j = W, !(w[j + he] !== K || w[j + he - 1] !== G || w[j] !== w[x] || w[++j] !== w[x + 1])) {
        x += 2, j++;
        do
          ;
        while (w[++x] === w[++j] && w[++x] === w[++j] && w[++x] === w[++j] && w[++x] === w[++j] && w[++x] === w[++j] && w[++x] === w[++j] && w[++x] === w[++j] && w[++x] === w[++j] && x < L);
        if (Z = ie - (L - x), x = L - ie, Z > he) {
          if (h.match_start = W, he = Z, Z >= ue)
            break;
          G = w[x + he - 1], K = w[x + he];
        }
      }
    while ((W = B[W & p]) > _ && --V !== 0);
    return he <= h.lookahead ? he : h.lookahead;
  }
  function Fe(h) {
    var W = h.w_size, V, x, j, Z, he;
    do {
      if (Z = h.window_size - h.lookahead - h.strstart, h.strstart >= W + (W - de)) {
        t.arraySet(h.window, h.window, W, W, 0), h.match_start -= W, h.strstart -= W, h.block_start -= W, x = h.hash_size, V = x;
        do
          j = h.head[--V], h.head[V] = j >= W ? j - W : 0;
        while (--x);
        x = W, V = x;
        do
          j = h.prev[--V], h.prev[V] = j >= W ? j - W : 0;
        while (--x);
        Z += W;
      }
      if (h.strm.avail_in === 0)
        break;
      if (x = St(h.strm, h.window, h.strstart + h.lookahead, Z), h.lookahead += x, h.lookahead + h.insert >= X)
        for (he = h.strstart - h.insert, h.ins_h = h.window[he], h.ins_h = (h.ins_h << h.hash_shift ^ h.window[he + 1]) & h.hash_mask; h.insert && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[he + X - 1]) & h.hash_mask, h.prev[he & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = he, he++, h.insert--, !(h.lookahead + h.insert < X)); )
          ;
    } while (h.lookahead < de && h.strm.avail_in !== 0);
  }
  function Xe(h, W) {
    var V = 65535;
    for (V > h.pending_buf_size - 5 && (V = h.pending_buf_size - 5); ; ) {
      if (h.lookahead <= 1) {
        if (Fe(h), h.lookahead === 0 && W === a)
          return De;
        if (h.lookahead === 0)
          break;
      }
      h.strstart += h.lookahead, h.lookahead = 0;
      var x = h.block_start + V;
      if ((h.strstart === 0 || h.strstart >= x) && (h.lookahead = h.strstart - x, h.strstart = x, Ce(h, !1), h.strm.avail_out === 0) || h.strstart - h.block_start >= h.w_size - de && (Ce(h, !1), h.strm.avail_out === 0))
        return De;
    }
    return h.insert = 0, W === l ? (Ce(h, !0), h.strm.avail_out === 0 ? tt : je) : (h.strstart > h.block_start && (Ce(h, !1), h.strm.avail_out === 0), De);
  }
  function ut(h, W) {
    for (var V, x; ; ) {
      if (h.lookahead < de) {
        if (Fe(h), h.lookahead < de && W === a)
          return De;
        if (h.lookahead === 0)
          break;
      }
      if (V = 0, h.lookahead >= X && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + X - 1]) & h.hash_mask, V = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), V !== 0 && h.strstart - V <= h.w_size - de && (h.match_length = It(h, V)), h.match_length >= X)
        if (x = e._tr_tally(h, h.strstart - h.match_start, h.match_length - X), h.lookahead -= h.match_length, h.match_length <= h.max_lazy_match && h.lookahead >= X) {
          h.match_length--;
          do
            h.strstart++, h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + X - 1]) & h.hash_mask, V = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart;
          while (--h.match_length !== 0);
          h.strstart++;
        } else
          h.strstart += h.match_length, h.match_length = 0, h.ins_h = h.window[h.strstart], h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + 1]) & h.hash_mask;
      else
        x = e._tr_tally(h, 0, h.window[h.strstart]), h.lookahead--, h.strstart++;
      if (x && (Ce(h, !1), h.strm.avail_out === 0))
        return De;
    }
    return h.insert = h.strstart < X - 1 ? h.strstart : X - 1, W === l ? (Ce(h, !0), h.strm.avail_out === 0 ? tt : je) : h.last_lit && (Ce(h, !1), h.strm.avail_out === 0) ? De : Ge;
  }
  function Ze(h, W) {
    for (var V, x, j; ; ) {
      if (h.lookahead < de) {
        if (Fe(h), h.lookahead < de && W === a)
          return De;
        if (h.lookahead === 0)
          break;
      }
      if (V = 0, h.lookahead >= X && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + X - 1]) & h.hash_mask, V = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), h.prev_length = h.match_length, h.prev_match = h.match_start, h.match_length = X - 1, V !== 0 && h.prev_length < h.max_lazy_match && h.strstart - V <= h.w_size - de && (h.match_length = It(h, V), h.match_length <= 5 && (h.strategy === R || h.match_length === X && h.strstart - h.match_start > 4096) && (h.match_length = X - 1)), h.prev_length >= X && h.match_length <= h.prev_length) {
        j = h.strstart + h.lookahead - X, x = e._tr_tally(h, h.strstart - 1 - h.prev_match, h.prev_length - X), h.lookahead -= h.prev_length - 1, h.prev_length -= 2;
        do
          ++h.strstart <= j && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + X - 1]) & h.hash_mask, V = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart);
        while (--h.prev_length !== 0);
        if (h.match_available = 0, h.match_length = X - 1, h.strstart++, x && (Ce(h, !1), h.strm.avail_out === 0))
          return De;
      } else if (h.match_available) {
        if (x = e._tr_tally(h, 0, h.window[h.strstart - 1]), x && Ce(h, !1), h.strstart++, h.lookahead--, h.strm.avail_out === 0)
          return De;
      } else
        h.match_available = 1, h.strstart++, h.lookahead--;
    }
    return h.match_available && (x = e._tr_tally(h, 0, h.window[h.strstart - 1]), h.match_available = 0), h.insert = h.strstart < X - 1 ? h.strstart : X - 1, W === l ? (Ce(h, !0), h.strm.avail_out === 0 ? tt : je) : h.last_lit && (Ce(h, !1), h.strm.avail_out === 0) ? De : Ge;
  }
  function vt(h, W) {
    for (var V, x, j, Z, he = h.window; ; ) {
      if (h.lookahead <= ie) {
        if (Fe(h), h.lookahead <= ie && W === a)
          return De;
        if (h.lookahead === 0)
          break;
      }
      if (h.match_length = 0, h.lookahead >= X && h.strstart > 0 && (j = h.strstart - 1, x = he[j], x === he[++j] && x === he[++j] && x === he[++j])) {
        Z = h.strstart + ie;
        do
          ;
        while (x === he[++j] && x === he[++j] && x === he[++j] && x === he[++j] && x === he[++j] && x === he[++j] && x === he[++j] && x === he[++j] && j < Z);
        h.match_length = ie - (Z - j), h.match_length > h.lookahead && (h.match_length = h.lookahead);
      }
      if (h.match_length >= X ? (V = e._tr_tally(h, 1, h.match_length - X), h.lookahead -= h.match_length, h.strstart += h.match_length, h.match_length = 0) : (V = e._tr_tally(h, 0, h.window[h.strstart]), h.lookahead--, h.strstart++), V && (Ce(h, !1), h.strm.avail_out === 0))
        return De;
    }
    return h.insert = 0, W === l ? (Ce(h, !0), h.strm.avail_out === 0 ? tt : je) : h.last_lit && (Ce(h, !1), h.strm.avail_out === 0) ? De : Ge;
  }
  function Et(h, W) {
    for (var V; ; ) {
      if (h.lookahead === 0 && (Fe(h), h.lookahead === 0)) {
        if (W === a)
          return De;
        break;
      }
      if (h.match_length = 0, V = e._tr_tally(h, 0, h.window[h.strstart]), h.lookahead--, h.strstart++, V && (Ce(h, !1), h.strm.avail_out === 0))
        return De;
    }
    return h.insert = 0, W === l ? (Ce(h, !0), h.strm.avail_out === 0 ? tt : je) : h.last_lit && (Ce(h, !1), h.strm.avail_out === 0) ? De : Ge;
  }
  function Le(h, W, V, x, j) {
    this.good_length = h, this.max_lazy = W, this.nice_length = V, this.max_chain = x, this.func = j;
  }
  var it;
  it = [
    /*      good lazy nice chain */
    new Le(0, 0, 0, 0, Xe),
    /* 0 store only */
    new Le(4, 4, 8, 4, ut),
    /* 1 max speed, no lazy matches */
    new Le(4, 5, 16, 8, ut),
    /* 2 */
    new Le(4, 6, 32, 32, ut),
    /* 3 */
    new Le(4, 4, 16, 16, Ze),
    /* 4 lazy matches */
    new Le(8, 16, 32, 32, Ze),
    /* 5 */
    new Le(8, 16, 128, 128, Ze),
    /* 6 */
    new Le(8, 32, 128, 256, Ze),
    /* 7 */
    new Le(32, 128, 258, 1024, Ze),
    /* 8 */
    new Le(32, 258, 258, 4096, Ze)
    /* 9 max compression */
  ];
  function k(h) {
    h.window_size = 2 * h.w_size, Ue(h.head), h.max_lazy_match = it[h.level].max_lazy, h.good_match = it[h.level].good_length, h.nice_match = it[h.level].nice_length, h.max_chain_length = it[h.level].max_chain, h.strstart = 0, h.block_start = 0, h.lookahead = 0, h.insert = 0, h.match_length = h.prev_length = X - 1, h.match_available = 0, h.ins_h = 0;
  }
  function c() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = U, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new t.Buf16(_e * 2), this.dyn_dtree = new t.Buf16((2 * J + 1) * 2), this.bl_tree = new t.Buf16((2 * oe + 1) * 2), Ue(this.dyn_ltree), Ue(this.dyn_dtree), Ue(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new t.Buf16(re + 1), this.heap = new t.Buf16(2 * N + 1), Ue(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new t.Buf16(2 * N + 1), Ue(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  function d(h) {
    var W;
    return !h || !h.state ? Oe(h, g) : (h.total_in = h.total_out = 0, h.data_type = M, W = h.state, W.pending = 0, W.pending_out = 0, W.wrap < 0 && (W.wrap = -W.wrap), W.status = W.wrap ? Re : ke, h.adler = W.wrap === 2 ? 0 : 1, W.last_flush = a, e._tr_init(W), u);
  }
  function v(h) {
    var W = d(h);
    return W === u && k(h.state), W;
  }
  function C(h, W) {
    return !h || !h.state || h.state.wrap !== 2 ? g : (h.state.gzhead = W, u);
  }
  function S(h, W, V, x, j, Z) {
    if (!h)
      return g;
    var he = 1;
    if (W === A && (W = 6), x < 0 ? (he = 0, x = -x) : x > 15 && (he = 2, x -= 16), j < 1 || j > $ || V !== U || x < 8 || x > 15 || W < 0 || W > 9 || Z < 0 || Z > D)
      return Oe(h, g);
    x === 8 && (x = 9);
    var ue = new c();
    return h.state = ue, ue.strm = h, ue.wrap = he, ue.gzhead = null, ue.w_bits = x, ue.w_size = 1 << ue.w_bits, ue.w_mask = ue.w_size - 1, ue.hash_bits = j + 7, ue.hash_size = 1 << ue.hash_bits, ue.hash_mask = ue.hash_size - 1, ue.hash_shift = ~~((ue.hash_bits + X - 1) / X), ue.window = new t.Buf8(ue.w_size * 2), ue.head = new t.Buf16(ue.hash_size), ue.prev = new t.Buf16(ue.w_size), ue.lit_bufsize = 1 << j + 6, ue.pending_buf_size = ue.lit_bufsize * 4, ue.pending_buf = new t.Buf8(ue.pending_buf_size), ue.d_buf = 1 * ue.lit_bufsize, ue.l_buf = 3 * ue.lit_bufsize, ue.level = W, ue.strategy = Z, ue.method = V, v(h);
  }
  function F(h, W) {
    return S(h, W, U, O, q, P);
  }
  function b(h, W) {
    var V, x, j, Z;
    if (!h || !h.state || W > f || W < 0)
      return h ? Oe(h, g) : g;
    if (x = h.state, !h.output || !h.input && h.avail_in !== 0 || x.status === Ee && W !== l)
      return Oe(h, h.avail_out === 0 ? E : g);
    if (x.strm = h, V = x.last_flush, x.last_flush = W, x.status === Re)
      if (x.wrap === 2)
        h.adler = 0, Se(x, 31), Se(x, 139), Se(x, 8), x.gzhead ? (Se(
          x,
          (x.gzhead.text ? 1 : 0) + (x.gzhead.hcrc ? 2 : 0) + (x.gzhead.extra ? 4 : 0) + (x.gzhead.name ? 8 : 0) + (x.gzhead.comment ? 16 : 0)
        ), Se(x, x.gzhead.time & 255), Se(x, x.gzhead.time >> 8 & 255), Se(x, x.gzhead.time >> 16 & 255), Se(x, x.gzhead.time >> 24 & 255), Se(x, x.level === 9 ? 2 : x.strategy >= I || x.level < 2 ? 4 : 0), Se(x, x.gzhead.os & 255), x.gzhead.extra && x.gzhead.extra.length && (Se(x, x.gzhead.extra.length & 255), Se(x, x.gzhead.extra.length >> 8 & 255)), x.gzhead.hcrc && (h.adler = i(h.adler, x.pending_buf, x.pending, 0)), x.gzindex = 0, x.status = be) : (Se(x, 0), Se(x, 0), Se(x, 0), Se(x, 0), Se(x, 0), Se(x, x.level === 9 ? 2 : x.strategy >= I || x.level < 2 ? 4 : 0), Se(x, we), x.status = ke);
      else {
        var he = U + (x.w_bits - 8 << 4) << 8, ue = -1;
        x.strategy >= I || x.level < 2 ? ue = 0 : x.level < 6 ? ue = 1 : x.level === 6 ? ue = 2 : ue = 3, he |= ue << 6, x.strstart !== 0 && (he |= xe), he += 31 - he % 31, x.status = ke, lt(x, he), x.strstart !== 0 && (lt(x, h.adler >>> 16), lt(x, h.adler & 65535)), h.adler = 1;
      }
    if (x.status === be)
      if (x.gzhead.extra) {
        for (j = x.pending; x.gzindex < (x.gzhead.extra.length & 65535) && !(x.pending === x.pending_buf_size && (x.gzhead.hcrc && x.pending > j && (h.adler = i(h.adler, x.pending_buf, x.pending - j, j)), ze(h), j = x.pending, x.pending === x.pending_buf_size)); )
          Se(x, x.gzhead.extra[x.gzindex] & 255), x.gzindex++;
        x.gzhead.hcrc && x.pending > j && (h.adler = i(h.adler, x.pending_buf, x.pending - j, j)), x.gzindex === x.gzhead.extra.length && (x.gzindex = 0, x.status = Ae);
      } else
        x.status = Ae;
    if (x.status === Ae)
      if (x.gzhead.name) {
        j = x.pending;
        do {
          if (x.pending === x.pending_buf_size && (x.gzhead.hcrc && x.pending > j && (h.adler = i(h.adler, x.pending_buf, x.pending - j, j)), ze(h), j = x.pending, x.pending === x.pending_buf_size)) {
            Z = 1;
            break;
          }
          x.gzindex < x.gzhead.name.length ? Z = x.gzhead.name.charCodeAt(x.gzindex++) & 255 : Z = 0, Se(x, Z);
        } while (Z !== 0);
        x.gzhead.hcrc && x.pending > j && (h.adler = i(h.adler, x.pending_buf, x.pending - j, j)), Z === 0 && (x.gzindex = 0, x.status = ye);
      } else
        x.status = ye;
    if (x.status === ye)
      if (x.gzhead.comment) {
        j = x.pending;
        do {
          if (x.pending === x.pending_buf_size && (x.gzhead.hcrc && x.pending > j && (h.adler = i(h.adler, x.pending_buf, x.pending - j, j)), ze(h), j = x.pending, x.pending === x.pending_buf_size)) {
            Z = 1;
            break;
          }
          x.gzindex < x.gzhead.comment.length ? Z = x.gzhead.comment.charCodeAt(x.gzindex++) & 255 : Z = 0, Se(x, Z);
        } while (Z !== 0);
        x.gzhead.hcrc && x.pending > j && (h.adler = i(h.adler, x.pending_buf, x.pending - j, j)), Z === 0 && (x.status = Be);
      } else
        x.status = Be;
    if (x.status === Be && (x.gzhead.hcrc ? (x.pending + 2 > x.pending_buf_size && ze(h), x.pending + 2 <= x.pending_buf_size && (Se(x, h.adler & 255), Se(x, h.adler >> 8 & 255), h.adler = 0, x.status = ke)) : x.status = ke), x.pending !== 0) {
      if (ze(h), h.avail_out === 0)
        return x.last_flush = -1, u;
    } else if (h.avail_in === 0 && Ve(W) <= Ve(V) && W !== l)
      return Oe(h, E);
    if (x.status === Ee && h.avail_in !== 0)
      return Oe(h, E);
    if (h.avail_in !== 0 || x.lookahead !== 0 || W !== a && x.status !== Ee) {
      var _ = x.strategy === I ? Et(x, W) : x.strategy === T ? vt(x, W) : it[x.level].func(x, W);
      if ((_ === tt || _ === je) && (x.status = Ee), _ === De || _ === tt)
        return h.avail_out === 0 && (x.last_flush = -1), u;
      if (_ === Ge && (W === o ? e._tr_align(x) : W !== f && (e._tr_stored_block(x, 0, 0, !1), W === s && (Ue(x.head), x.lookahead === 0 && (x.strstart = 0, x.block_start = 0, x.insert = 0))), ze(h), h.avail_out === 0))
        return x.last_flush = -1, u;
    }
    return W !== l ? u : x.wrap <= 0 ? m : (x.wrap === 2 ? (Se(x, h.adler & 255), Se(x, h.adler >> 8 & 255), Se(x, h.adler >> 16 & 255), Se(x, h.adler >> 24 & 255), Se(x, h.total_in & 255), Se(x, h.total_in >> 8 & 255), Se(x, h.total_in >> 16 & 255), Se(x, h.total_in >> 24 & 255)) : (lt(x, h.adler >>> 16), lt(x, h.adler & 65535)), ze(h), x.wrap > 0 && (x.wrap = -x.wrap), x.pending !== 0 ? u : m);
  }
  function Q(h) {
    var W;
    return !h || !h.state ? g : (W = h.state.status, W !== Re && W !== be && W !== Ae && W !== ye && W !== Be && W !== ke && W !== Ee ? Oe(h, g) : (h.state = null, W === ke ? Oe(h, y) : u));
  }
  function ce(h, W) {
    var V = W.length, x, j, Z, he, ue, _, w, p;
    if (!h || !h.state || (x = h.state, he = x.wrap, he === 2 || he === 1 && x.status !== Re || x.lookahead))
      return g;
    for (he === 1 && (h.adler = r(h.adler, W, V, 0)), x.wrap = 0, V >= x.w_size && (he === 0 && (Ue(x.head), x.strstart = 0, x.block_start = 0, x.insert = 0), p = new t.Buf8(x.w_size), t.arraySet(p, W, V - x.w_size, x.w_size, 0), W = p, V = x.w_size), ue = h.avail_in, _ = h.next_in, w = h.input, h.avail_in = V, h.next_in = 0, h.input = W, Fe(x); x.lookahead >= X; ) {
      j = x.strstart, Z = x.lookahead - (X - 1);
      do
        x.ins_h = (x.ins_h << x.hash_shift ^ x.window[j + X - 1]) & x.hash_mask, x.prev[j & x.w_mask] = x.head[x.ins_h], x.head[x.ins_h] = j, j++;
      while (--Z);
      x.strstart = j, x.lookahead = X - 1, Fe(x);
    }
    return x.strstart += x.lookahead, x.block_start = x.strstart, x.insert = x.lookahead, x.lookahead = 0, x.match_length = x.prev_length = X - 1, x.match_available = 0, h.next_in = _, h.input = w, h.avail_in = ue, x.wrap = he, u;
  }
  return Dt.deflateInit = F, Dt.deflateInit2 = S, Dt.deflateReset = v, Dt.deflateResetKeep = d, Dt.deflateSetHeader = C, Dt.deflate = b, Dt.deflateEnd = Q, Dt.deflateSetDictionary = ce, Dt.deflateInfo = "pako deflate (from Nodeca project)", Dt;
}
var ur = {}, Ca;
function Yo() {
  if (Ca) return ur;
  Ca = 1;
  var t = or(), e = !0, r = !0;
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
  for (var i = new t.Buf8(256), n = 0; n < 256; n++)
    i[n] = n >= 252 ? 6 : n >= 248 ? 5 : n >= 240 ? 4 : n >= 224 ? 3 : n >= 192 ? 2 : 1;
  i[254] = i[254] = 1, ur.string2buf = function(o) {
    var s, l, f, u, m, g = o.length, y = 0;
    for (u = 0; u < g; u++)
      l = o.charCodeAt(u), (l & 64512) === 55296 && u + 1 < g && (f = o.charCodeAt(u + 1), (f & 64512) === 56320 && (l = 65536 + (l - 55296 << 10) + (f - 56320), u++)), y += l < 128 ? 1 : l < 2048 ? 2 : l < 65536 ? 3 : 4;
    for (s = new t.Buf8(y), m = 0, u = 0; m < y; u++)
      l = o.charCodeAt(u), (l & 64512) === 55296 && u + 1 < g && (f = o.charCodeAt(u + 1), (f & 64512) === 56320 && (l = 65536 + (l - 55296 << 10) + (f - 56320), u++)), l < 128 ? s[m++] = l : l < 2048 ? (s[m++] = 192 | l >>> 6, s[m++] = 128 | l & 63) : l < 65536 ? (s[m++] = 224 | l >>> 12, s[m++] = 128 | l >>> 6 & 63, s[m++] = 128 | l & 63) : (s[m++] = 240 | l >>> 18, s[m++] = 128 | l >>> 12 & 63, s[m++] = 128 | l >>> 6 & 63, s[m++] = 128 | l & 63);
    return s;
  };
  function a(o, s) {
    if (s < 65534 && (o.subarray && r || !o.subarray && e))
      return String.fromCharCode.apply(null, t.shrinkBuf(o, s));
    for (var l = "", f = 0; f < s; f++)
      l += String.fromCharCode(o[f]);
    return l;
  }
  return ur.buf2binstring = function(o) {
    return a(o, o.length);
  }, ur.binstring2buf = function(o) {
    for (var s = new t.Buf8(o.length), l = 0, f = s.length; l < f; l++)
      s[l] = o.charCodeAt(l);
    return s;
  }, ur.buf2string = function(o, s) {
    var l, f, u, m, g = s || o.length, y = new Array(g * 2);
    for (f = 0, l = 0; l < g; ) {
      if (u = o[l++], u < 128) {
        y[f++] = u;
        continue;
      }
      if (m = i[u], m > 4) {
        y[f++] = 65533, l += m - 1;
        continue;
      }
      for (u &= m === 2 ? 31 : m === 3 ? 15 : 7; m > 1 && l < g; )
        u = u << 6 | o[l++] & 63, m--;
      if (m > 1) {
        y[f++] = 65533;
        continue;
      }
      u < 65536 ? y[f++] = u : (u -= 65536, y[f++] = 55296 | u >> 10 & 1023, y[f++] = 56320 | u & 1023);
    }
    return a(y, f);
  }, ur.utf8border = function(o, s) {
    var l;
    for (s = s || o.length, s > o.length && (s = o.length), l = s - 1; l >= 0 && (o[l] & 192) === 128; )
      l--;
    return l < 0 || l === 0 ? s : l + i[o[l]] > s ? l : s;
  }, ur;
}
var nn, Na;
function Ko() {
  if (Na) return nn;
  Na = 1;
  function t() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return nn = t, nn;
}
var Fa;
function Jc() {
  if (Fa) return vr;
  Fa = 1;
  var t = Kc(), e = or(), r = Yo(), i = ea(), n = Ko(), a = Object.prototype.toString, o = 0, s = 4, l = 0, f = 1, u = 2, m = -1, g = 0, y = 8;
  function E(T) {
    if (!(this instanceof E)) return new E(T);
    this.options = e.assign({
      level: m,
      method: y,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: g,
      to: ""
    }, T || {});
    var D = this.options;
    D.raw && D.windowBits > 0 ? D.windowBits = -D.windowBits : D.gzip && D.windowBits > 0 && D.windowBits < 16 && (D.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new n(), this.strm.avail_out = 0;
    var P = t.deflateInit2(
      this.strm,
      D.level,
      D.method,
      D.windowBits,
      D.memLevel,
      D.strategy
    );
    if (P !== l)
      throw new Error(i[P]);
    if (D.header && t.deflateSetHeader(this.strm, D.header), D.dictionary) {
      var M;
      if (typeof D.dictionary == "string" ? M = r.string2buf(D.dictionary) : a.call(D.dictionary) === "[object ArrayBuffer]" ? M = new Uint8Array(D.dictionary) : M = D.dictionary, P = t.deflateSetDictionary(this.strm, M), P !== l)
        throw new Error(i[P]);
      this._dict_set = !0;
    }
  }
  E.prototype.push = function(T, D) {
    var P = this.strm, M = this.options.chunkSize, U, $;
    if (this.ended)
      return !1;
    $ = D === ~~D ? D : D === !0 ? s : o, typeof T == "string" ? P.input = r.string2buf(T) : a.call(T) === "[object ArrayBuffer]" ? P.input = new Uint8Array(T) : P.input = T, P.next_in = 0, P.avail_in = P.input.length;
    do {
      if (P.avail_out === 0 && (P.output = new e.Buf8(M), P.next_out = 0, P.avail_out = M), U = t.deflate(P, $), U !== f && U !== l)
        return this.onEnd(U), this.ended = !0, !1;
      (P.avail_out === 0 || P.avail_in === 0 && ($ === s || $ === u)) && (this.options.to === "string" ? this.onData(r.buf2binstring(e.shrinkBuf(P.output, P.next_out))) : this.onData(e.shrinkBuf(P.output, P.next_out)));
    } while ((P.avail_in > 0 || P.avail_out === 0) && U !== f);
    return $ === s ? (U = t.deflateEnd(this.strm), this.onEnd(U), this.ended = !0, U === l) : ($ === u && (this.onEnd(l), P.avail_out = 0), !0);
  }, E.prototype.onData = function(T) {
    this.chunks.push(T);
  }, E.prototype.onEnd = function(T) {
    T === l && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = T, this.msg = this.strm.msg;
  };
  function A(T, D) {
    var P = new E(D);
    if (P.push(T, !0), P.err)
      throw P.msg || i[P.err];
    return P.result;
  }
  function R(T, D) {
    return D = D || {}, D.raw = !0, A(T, D);
  }
  function I(T, D) {
    return D = D || {}, D.gzip = !0, A(T, D);
  }
  return vr.Deflate = E, vr.deflate = A, vr.deflateRaw = R, vr.gzip = I, vr;
}
var Er = {}, Tt = {}, an, Ua;
function Qc() {
  if (Ua) return an;
  Ua = 1;
  var t = 30, e = 12;
  return an = function(i, n) {
    var a, o, s, l, f, u, m, g, y, E, A, R, I, T, D, P, M, U, $, O, q, z, Y, N, J;
    a = i.state, o = i.next_in, N = i.input, s = o + (i.avail_in - 5), l = i.next_out, J = i.output, f = l - (n - i.avail_out), u = l + (i.avail_out - 257), m = a.dmax, g = a.wsize, y = a.whave, E = a.wnext, A = a.window, R = a.hold, I = a.bits, T = a.lencode, D = a.distcode, P = (1 << a.lenbits) - 1, M = (1 << a.distbits) - 1;
    e:
      do {
        I < 15 && (R += N[o++] << I, I += 8, R += N[o++] << I, I += 8), U = T[R & P];
        t:
          for (; ; ) {
            if ($ = U >>> 24, R >>>= $, I -= $, $ = U >>> 16 & 255, $ === 0)
              J[l++] = U & 65535;
            else if ($ & 16) {
              O = U & 65535, $ &= 15, $ && (I < $ && (R += N[o++] << I, I += 8), O += R & (1 << $) - 1, R >>>= $, I -= $), I < 15 && (R += N[o++] << I, I += 8, R += N[o++] << I, I += 8), U = D[R & M];
              r:
                for (; ; ) {
                  if ($ = U >>> 24, R >>>= $, I -= $, $ = U >>> 16 & 255, $ & 16) {
                    if (q = U & 65535, $ &= 15, I < $ && (R += N[o++] << I, I += 8, I < $ && (R += N[o++] << I, I += 8)), q += R & (1 << $) - 1, q > m) {
                      i.msg = "invalid distance too far back", a.mode = t;
                      break e;
                    }
                    if (R >>>= $, I -= $, $ = l - f, q > $) {
                      if ($ = q - $, $ > y && a.sane) {
                        i.msg = "invalid distance too far back", a.mode = t;
                        break e;
                      }
                      if (z = 0, Y = A, E === 0) {
                        if (z += g - $, $ < O) {
                          O -= $;
                          do
                            J[l++] = A[z++];
                          while (--$);
                          z = l - q, Y = J;
                        }
                      } else if (E < $) {
                        if (z += g + E - $, $ -= E, $ < O) {
                          O -= $;
                          do
                            J[l++] = A[z++];
                          while (--$);
                          if (z = 0, E < O) {
                            $ = E, O -= $;
                            do
                              J[l++] = A[z++];
                            while (--$);
                            z = l - q, Y = J;
                          }
                        }
                      } else if (z += E - $, $ < O) {
                        O -= $;
                        do
                          J[l++] = A[z++];
                        while (--$);
                        z = l - q, Y = J;
                      }
                      for (; O > 2; )
                        J[l++] = Y[z++], J[l++] = Y[z++], J[l++] = Y[z++], O -= 3;
                      O && (J[l++] = Y[z++], O > 1 && (J[l++] = Y[z++]));
                    } else {
                      z = l - q;
                      do
                        J[l++] = J[z++], J[l++] = J[z++], J[l++] = J[z++], O -= 3;
                      while (O > 2);
                      O && (J[l++] = J[z++], O > 1 && (J[l++] = J[z++]));
                    }
                  } else if (($ & 64) === 0) {
                    U = D[(U & 65535) + (R & (1 << $) - 1)];
                    continue r;
                  } else {
                    i.msg = "invalid distance code", a.mode = t;
                    break e;
                  }
                  break;
                }
            } else if (($ & 64) === 0) {
              U = T[(U & 65535) + (R & (1 << $) - 1)];
              continue t;
            } else if ($ & 32) {
              a.mode = e;
              break e;
            } else {
              i.msg = "invalid literal/length code", a.mode = t;
              break e;
            }
            break;
          }
      } while (o < s && l < u);
    O = I >> 3, o -= O, I -= O << 3, R &= (1 << I) - 1, i.next_in = o, i.next_out = l, i.avail_in = o < s ? 5 + (s - o) : 5 - (o - s), i.avail_out = l < u ? 257 + (u - l) : 257 - (l - u), a.hold = R, a.bits = I;
  }, an;
}
var on, Ma;
function el() {
  if (Ma) return on;
  Ma = 1;
  var t = or(), e = 15, r = 852, i = 592, n = 0, a = 1, o = 2, s = [
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
  ], u = [
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
  return on = function(g, y, E, A, R, I, T, D) {
    var P = D.bits, M = 0, U = 0, $ = 0, O = 0, q = 0, z = 0, Y = 0, N = 0, J = 0, oe = 0, _e, re, X, ie, de, xe = null, Re = 0, be, Ae = new t.Buf16(e + 1), ye = new t.Buf16(e + 1), Be = null, ke = 0, Ee, De, Ge;
    for (M = 0; M <= e; M++)
      Ae[M] = 0;
    for (U = 0; U < A; U++)
      Ae[y[E + U]]++;
    for (q = P, O = e; O >= 1 && Ae[O] === 0; O--)
      ;
    if (q > O && (q = O), O === 0)
      return R[I++] = 1 << 24 | 64 << 16 | 0, R[I++] = 1 << 24 | 64 << 16 | 0, D.bits = 1, 0;
    for ($ = 1; $ < O && Ae[$] === 0; $++)
      ;
    for (q < $ && (q = $), N = 1, M = 1; M <= e; M++)
      if (N <<= 1, N -= Ae[M], N < 0)
        return -1;
    if (N > 0 && (g === n || O !== 1))
      return -1;
    for (ye[1] = 0, M = 1; M < e; M++)
      ye[M + 1] = ye[M] + Ae[M];
    for (U = 0; U < A; U++)
      y[E + U] !== 0 && (T[ye[y[E + U]]++] = U);
    if (g === n ? (xe = Be = T, be = 19) : g === a ? (xe = s, Re -= 257, Be = l, ke -= 257, be = 256) : (xe = f, Be = u, be = -1), oe = 0, U = 0, M = $, de = I, z = q, Y = 0, X = -1, J = 1 << q, ie = J - 1, g === a && J > r || g === o && J > i)
      return 1;
    for (; ; ) {
      Ee = M - Y, T[U] < be ? (De = 0, Ge = T[U]) : T[U] > be ? (De = Be[ke + T[U]], Ge = xe[Re + T[U]]) : (De = 96, Ge = 0), _e = 1 << M - Y, re = 1 << z, $ = re;
      do
        re -= _e, R[de + (oe >> Y) + re] = Ee << 24 | De << 16 | Ge | 0;
      while (re !== 0);
      for (_e = 1 << M - 1; oe & _e; )
        _e >>= 1;
      if (_e !== 0 ? (oe &= _e - 1, oe += _e) : oe = 0, U++, --Ae[M] === 0) {
        if (M === O)
          break;
        M = y[E + T[U]];
      }
      if (M > q && (oe & ie) !== X) {
        for (Y === 0 && (Y = q), de += $, z = M - Y, N = 1 << z; z + Y < O && (N -= Ae[z + Y], !(N <= 0)); )
          z++, N <<= 1;
        if (J += 1 << z, g === a && J > r || g === o && J > i)
          return 1;
        X = oe & ie, R[X] = q << 24 | z << 16 | de - I | 0;
      }
    }
    return oe !== 0 && (R[de + oe] = M - Y << 24 | 64 << 16 | 0), D.bits = q, 0;
  }, on;
}
var La;
function tl() {
  if (La) return Tt;
  La = 1;
  var t = or(), e = Vo(), r = Xo(), i = Qc(), n = el(), a = 0, o = 1, s = 2, l = 4, f = 5, u = 6, m = 0, g = 1, y = 2, E = -2, A = -3, R = -4, I = -5, T = 8, D = 1, P = 2, M = 3, U = 4, $ = 5, O = 6, q = 7, z = 8, Y = 9, N = 10, J = 11, oe = 12, _e = 13, re = 14, X = 15, ie = 16, de = 17, xe = 18, Re = 19, be = 20, Ae = 21, ye = 22, Be = 23, ke = 24, Ee = 25, De = 26, Ge = 27, tt = 28, je = 29, we = 30, Oe = 31, Ve = 32, Ue = 852, ze = 592, Ce = 15, Se = Ce;
  function lt(S) {
    return (S >>> 24 & 255) + (S >>> 8 & 65280) + ((S & 65280) << 8) + ((S & 255) << 24);
  }
  function St() {
    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new t.Buf16(320), this.work = new t.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  function It(S) {
    var F;
    return !S || !S.state ? E : (F = S.state, S.total_in = S.total_out = F.total = 0, S.msg = "", F.wrap && (S.adler = F.wrap & 1), F.mode = D, F.last = 0, F.havedict = 0, F.dmax = 32768, F.head = null, F.hold = 0, F.bits = 0, F.lencode = F.lendyn = new t.Buf32(Ue), F.distcode = F.distdyn = new t.Buf32(ze), F.sane = 1, F.back = -1, m);
  }
  function Fe(S) {
    var F;
    return !S || !S.state ? E : (F = S.state, F.wsize = 0, F.whave = 0, F.wnext = 0, It(S));
  }
  function Xe(S, F) {
    var b, Q;
    return !S || !S.state || (Q = S.state, F < 0 ? (b = 0, F = -F) : (b = (F >> 4) + 1, F < 48 && (F &= 15)), F && (F < 8 || F > 15)) ? E : (Q.window !== null && Q.wbits !== F && (Q.window = null), Q.wrap = b, Q.wbits = F, Fe(S));
  }
  function ut(S, F) {
    var b, Q;
    return S ? (Q = new St(), S.state = Q, Q.window = null, b = Xe(S, F), b !== m && (S.state = null), b) : E;
  }
  function Ze(S) {
    return ut(S, Se);
  }
  var vt = !0, Et, Le;
  function it(S) {
    if (vt) {
      var F;
      for (Et = new t.Buf32(512), Le = new t.Buf32(32), F = 0; F < 144; )
        S.lens[F++] = 8;
      for (; F < 256; )
        S.lens[F++] = 9;
      for (; F < 280; )
        S.lens[F++] = 7;
      for (; F < 288; )
        S.lens[F++] = 8;
      for (n(o, S.lens, 0, 288, Et, 0, S.work, { bits: 9 }), F = 0; F < 32; )
        S.lens[F++] = 5;
      n(s, S.lens, 0, 32, Le, 0, S.work, { bits: 5 }), vt = !1;
    }
    S.lencode = Et, S.lenbits = 9, S.distcode = Le, S.distbits = 5;
  }
  function k(S, F, b, Q) {
    var ce, h = S.state;
    return h.window === null && (h.wsize = 1 << h.wbits, h.wnext = 0, h.whave = 0, h.window = new t.Buf8(h.wsize)), Q >= h.wsize ? (t.arraySet(h.window, F, b - h.wsize, h.wsize, 0), h.wnext = 0, h.whave = h.wsize) : (ce = h.wsize - h.wnext, ce > Q && (ce = Q), t.arraySet(h.window, F, b - Q, ce, h.wnext), Q -= ce, Q ? (t.arraySet(h.window, F, b - Q, Q, 0), h.wnext = Q, h.whave = h.wsize) : (h.wnext += ce, h.wnext === h.wsize && (h.wnext = 0), h.whave < h.wsize && (h.whave += ce))), 0;
  }
  function c(S, F) {
    var b, Q, ce, h, W, V, x, j, Z, he, ue, _, w, p, B = 0, L, G, K, ve, He, Me, Ie, $e, ot = new t.Buf8(4), Wt, Ft, ya = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!S || !S.state || !S.output || !S.input && S.avail_in !== 0)
      return E;
    b = S.state, b.mode === oe && (b.mode = _e), W = S.next_out, ce = S.output, x = S.avail_out, h = S.next_in, Q = S.input, V = S.avail_in, j = b.hold, Z = b.bits, he = V, ue = x, $e = m;
    e:
      for (; ; )
        switch (b.mode) {
          case D:
            if (b.wrap === 0) {
              b.mode = _e;
              break;
            }
            for (; Z < 16; ) {
              if (V === 0)
                break e;
              V--, j += Q[h++] << Z, Z += 8;
            }
            if (b.wrap & 2 && j === 35615) {
              b.check = 0, ot[0] = j & 255, ot[1] = j >>> 8 & 255, b.check = r(b.check, ot, 2, 0), j = 0, Z = 0, b.mode = P;
              break;
            }
            if (b.flags = 0, b.head && (b.head.done = !1), !(b.wrap & 1) || /* check if zlib header allowed */
            (((j & 255) << 8) + (j >> 8)) % 31) {
              S.msg = "incorrect header check", b.mode = we;
              break;
            }
            if ((j & 15) !== T) {
              S.msg = "unknown compression method", b.mode = we;
              break;
            }
            if (j >>>= 4, Z -= 4, Ie = (j & 15) + 8, b.wbits === 0)
              b.wbits = Ie;
            else if (Ie > b.wbits) {
              S.msg = "invalid window size", b.mode = we;
              break;
            }
            b.dmax = 1 << Ie, S.adler = b.check = 1, b.mode = j & 512 ? N : oe, j = 0, Z = 0;
            break;
          case P:
            for (; Z < 16; ) {
              if (V === 0)
                break e;
              V--, j += Q[h++] << Z, Z += 8;
            }
            if (b.flags = j, (b.flags & 255) !== T) {
              S.msg = "unknown compression method", b.mode = we;
              break;
            }
            if (b.flags & 57344) {
              S.msg = "unknown header flags set", b.mode = we;
              break;
            }
            b.head && (b.head.text = j >> 8 & 1), b.flags & 512 && (ot[0] = j & 255, ot[1] = j >>> 8 & 255, b.check = r(b.check, ot, 2, 0)), j = 0, Z = 0, b.mode = M;
          /* falls through */
          case M:
            for (; Z < 32; ) {
              if (V === 0)
                break e;
              V--, j += Q[h++] << Z, Z += 8;
            }
            b.head && (b.head.time = j), b.flags & 512 && (ot[0] = j & 255, ot[1] = j >>> 8 & 255, ot[2] = j >>> 16 & 255, ot[3] = j >>> 24 & 255, b.check = r(b.check, ot, 4, 0)), j = 0, Z = 0, b.mode = U;
          /* falls through */
          case U:
            for (; Z < 16; ) {
              if (V === 0)
                break e;
              V--, j += Q[h++] << Z, Z += 8;
            }
            b.head && (b.head.xflags = j & 255, b.head.os = j >> 8), b.flags & 512 && (ot[0] = j & 255, ot[1] = j >>> 8 & 255, b.check = r(b.check, ot, 2, 0)), j = 0, Z = 0, b.mode = $;
          /* falls through */
          case $:
            if (b.flags & 1024) {
              for (; Z < 16; ) {
                if (V === 0)
                  break e;
                V--, j += Q[h++] << Z, Z += 8;
              }
              b.length = j, b.head && (b.head.extra_len = j), b.flags & 512 && (ot[0] = j & 255, ot[1] = j >>> 8 & 255, b.check = r(b.check, ot, 2, 0)), j = 0, Z = 0;
            } else b.head && (b.head.extra = null);
            b.mode = O;
          /* falls through */
          case O:
            if (b.flags & 1024 && (_ = b.length, _ > V && (_ = V), _ && (b.head && (Ie = b.head.extra_len - b.length, b.head.extra || (b.head.extra = new Array(b.head.extra_len)), t.arraySet(
              b.head.extra,
              Q,
              h,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              _,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              Ie
            )), b.flags & 512 && (b.check = r(b.check, Q, _, h)), V -= _, h += _, b.length -= _), b.length))
              break e;
            b.length = 0, b.mode = q;
          /* falls through */
          case q:
            if (b.flags & 2048) {
              if (V === 0)
                break e;
              _ = 0;
              do
                Ie = Q[h + _++], b.head && Ie && b.length < 65536 && (b.head.name += String.fromCharCode(Ie));
              while (Ie && _ < V);
              if (b.flags & 512 && (b.check = r(b.check, Q, _, h)), V -= _, h += _, Ie)
                break e;
            } else b.head && (b.head.name = null);
            b.length = 0, b.mode = z;
          /* falls through */
          case z:
            if (b.flags & 4096) {
              if (V === 0)
                break e;
              _ = 0;
              do
                Ie = Q[h + _++], b.head && Ie && b.length < 65536 && (b.head.comment += String.fromCharCode(Ie));
              while (Ie && _ < V);
              if (b.flags & 512 && (b.check = r(b.check, Q, _, h)), V -= _, h += _, Ie)
                break e;
            } else b.head && (b.head.comment = null);
            b.mode = Y;
          /* falls through */
          case Y:
            if (b.flags & 512) {
              for (; Z < 16; ) {
                if (V === 0)
                  break e;
                V--, j += Q[h++] << Z, Z += 8;
              }
              if (j !== (b.check & 65535)) {
                S.msg = "header crc mismatch", b.mode = we;
                break;
              }
              j = 0, Z = 0;
            }
            b.head && (b.head.hcrc = b.flags >> 9 & 1, b.head.done = !0), S.adler = b.check = 0, b.mode = oe;
            break;
          case N:
            for (; Z < 32; ) {
              if (V === 0)
                break e;
              V--, j += Q[h++] << Z, Z += 8;
            }
            S.adler = b.check = lt(j), j = 0, Z = 0, b.mode = J;
          /* falls through */
          case J:
            if (b.havedict === 0)
              return S.next_out = W, S.avail_out = x, S.next_in = h, S.avail_in = V, b.hold = j, b.bits = Z, y;
            S.adler = b.check = 1, b.mode = oe;
          /* falls through */
          case oe:
            if (F === f || F === u)
              break e;
          /* falls through */
          case _e:
            if (b.last) {
              j >>>= Z & 7, Z -= Z & 7, b.mode = Ge;
              break;
            }
            for (; Z < 3; ) {
              if (V === 0)
                break e;
              V--, j += Q[h++] << Z, Z += 8;
            }
            switch (b.last = j & 1, j >>>= 1, Z -= 1, j & 3) {
              case 0:
                b.mode = re;
                break;
              case 1:
                if (it(b), b.mode = be, F === u) {
                  j >>>= 2, Z -= 2;
                  break e;
                }
                break;
              case 2:
                b.mode = de;
                break;
              case 3:
                S.msg = "invalid block type", b.mode = we;
            }
            j >>>= 2, Z -= 2;
            break;
          case re:
            for (j >>>= Z & 7, Z -= Z & 7; Z < 32; ) {
              if (V === 0)
                break e;
              V--, j += Q[h++] << Z, Z += 8;
            }
            if ((j & 65535) !== (j >>> 16 ^ 65535)) {
              S.msg = "invalid stored block lengths", b.mode = we;
              break;
            }
            if (b.length = j & 65535, j = 0, Z = 0, b.mode = X, F === u)
              break e;
          /* falls through */
          case X:
            b.mode = ie;
          /* falls through */
          case ie:
            if (_ = b.length, _) {
              if (_ > V && (_ = V), _ > x && (_ = x), _ === 0)
                break e;
              t.arraySet(ce, Q, h, _, W), V -= _, h += _, x -= _, W += _, b.length -= _;
              break;
            }
            b.mode = oe;
            break;
          case de:
            for (; Z < 14; ) {
              if (V === 0)
                break e;
              V--, j += Q[h++] << Z, Z += 8;
            }
            if (b.nlen = (j & 31) + 257, j >>>= 5, Z -= 5, b.ndist = (j & 31) + 1, j >>>= 5, Z -= 5, b.ncode = (j & 15) + 4, j >>>= 4, Z -= 4, b.nlen > 286 || b.ndist > 30) {
              S.msg = "too many length or distance symbols", b.mode = we;
              break;
            }
            b.have = 0, b.mode = xe;
          /* falls through */
          case xe:
            for (; b.have < b.ncode; ) {
              for (; Z < 3; ) {
                if (V === 0)
                  break e;
                V--, j += Q[h++] << Z, Z += 8;
              }
              b.lens[ya[b.have++]] = j & 7, j >>>= 3, Z -= 3;
            }
            for (; b.have < 19; )
              b.lens[ya[b.have++]] = 0;
            if (b.lencode = b.lendyn, b.lenbits = 7, Wt = { bits: b.lenbits }, $e = n(a, b.lens, 0, 19, b.lencode, 0, b.work, Wt), b.lenbits = Wt.bits, $e) {
              S.msg = "invalid code lengths set", b.mode = we;
              break;
            }
            b.have = 0, b.mode = Re;
          /* falls through */
          case Re:
            for (; b.have < b.nlen + b.ndist; ) {
              for (; B = b.lencode[j & (1 << b.lenbits) - 1], L = B >>> 24, G = B >>> 16 & 255, K = B & 65535, !(L <= Z); ) {
                if (V === 0)
                  break e;
                V--, j += Q[h++] << Z, Z += 8;
              }
              if (K < 16)
                j >>>= L, Z -= L, b.lens[b.have++] = K;
              else {
                if (K === 16) {
                  for (Ft = L + 2; Z < Ft; ) {
                    if (V === 0)
                      break e;
                    V--, j += Q[h++] << Z, Z += 8;
                  }
                  if (j >>>= L, Z -= L, b.have === 0) {
                    S.msg = "invalid bit length repeat", b.mode = we;
                    break;
                  }
                  Ie = b.lens[b.have - 1], _ = 3 + (j & 3), j >>>= 2, Z -= 2;
                } else if (K === 17) {
                  for (Ft = L + 3; Z < Ft; ) {
                    if (V === 0)
                      break e;
                    V--, j += Q[h++] << Z, Z += 8;
                  }
                  j >>>= L, Z -= L, Ie = 0, _ = 3 + (j & 7), j >>>= 3, Z -= 3;
                } else {
                  for (Ft = L + 7; Z < Ft; ) {
                    if (V === 0)
                      break e;
                    V--, j += Q[h++] << Z, Z += 8;
                  }
                  j >>>= L, Z -= L, Ie = 0, _ = 11 + (j & 127), j >>>= 7, Z -= 7;
                }
                if (b.have + _ > b.nlen + b.ndist) {
                  S.msg = "invalid bit length repeat", b.mode = we;
                  break;
                }
                for (; _--; )
                  b.lens[b.have++] = Ie;
              }
            }
            if (b.mode === we)
              break;
            if (b.lens[256] === 0) {
              S.msg = "invalid code -- missing end-of-block", b.mode = we;
              break;
            }
            if (b.lenbits = 9, Wt = { bits: b.lenbits }, $e = n(o, b.lens, 0, b.nlen, b.lencode, 0, b.work, Wt), b.lenbits = Wt.bits, $e) {
              S.msg = "invalid literal/lengths set", b.mode = we;
              break;
            }
            if (b.distbits = 6, b.distcode = b.distdyn, Wt = { bits: b.distbits }, $e = n(s, b.lens, b.nlen, b.ndist, b.distcode, 0, b.work, Wt), b.distbits = Wt.bits, $e) {
              S.msg = "invalid distances set", b.mode = we;
              break;
            }
            if (b.mode = be, F === u)
              break e;
          /* falls through */
          case be:
            b.mode = Ae;
          /* falls through */
          case Ae:
            if (V >= 6 && x >= 258) {
              S.next_out = W, S.avail_out = x, S.next_in = h, S.avail_in = V, b.hold = j, b.bits = Z, i(S, ue), W = S.next_out, ce = S.output, x = S.avail_out, h = S.next_in, Q = S.input, V = S.avail_in, j = b.hold, Z = b.bits, b.mode === oe && (b.back = -1);
              break;
            }
            for (b.back = 0; B = b.lencode[j & (1 << b.lenbits) - 1], L = B >>> 24, G = B >>> 16 & 255, K = B & 65535, !(L <= Z); ) {
              if (V === 0)
                break e;
              V--, j += Q[h++] << Z, Z += 8;
            }
            if (G && (G & 240) === 0) {
              for (ve = L, He = G, Me = K; B = b.lencode[Me + ((j & (1 << ve + He) - 1) >> ve)], L = B >>> 24, G = B >>> 16 & 255, K = B & 65535, !(ve + L <= Z); ) {
                if (V === 0)
                  break e;
                V--, j += Q[h++] << Z, Z += 8;
              }
              j >>>= ve, Z -= ve, b.back += ve;
            }
            if (j >>>= L, Z -= L, b.back += L, b.length = K, G === 0) {
              b.mode = De;
              break;
            }
            if (G & 32) {
              b.back = -1, b.mode = oe;
              break;
            }
            if (G & 64) {
              S.msg = "invalid literal/length code", b.mode = we;
              break;
            }
            b.extra = G & 15, b.mode = ye;
          /* falls through */
          case ye:
            if (b.extra) {
              for (Ft = b.extra; Z < Ft; ) {
                if (V === 0)
                  break e;
                V--, j += Q[h++] << Z, Z += 8;
              }
              b.length += j & (1 << b.extra) - 1, j >>>= b.extra, Z -= b.extra, b.back += b.extra;
            }
            b.was = b.length, b.mode = Be;
          /* falls through */
          case Be:
            for (; B = b.distcode[j & (1 << b.distbits) - 1], L = B >>> 24, G = B >>> 16 & 255, K = B & 65535, !(L <= Z); ) {
              if (V === 0)
                break e;
              V--, j += Q[h++] << Z, Z += 8;
            }
            if ((G & 240) === 0) {
              for (ve = L, He = G, Me = K; B = b.distcode[Me + ((j & (1 << ve + He) - 1) >> ve)], L = B >>> 24, G = B >>> 16 & 255, K = B & 65535, !(ve + L <= Z); ) {
                if (V === 0)
                  break e;
                V--, j += Q[h++] << Z, Z += 8;
              }
              j >>>= ve, Z -= ve, b.back += ve;
            }
            if (j >>>= L, Z -= L, b.back += L, G & 64) {
              S.msg = "invalid distance code", b.mode = we;
              break;
            }
            b.offset = K, b.extra = G & 15, b.mode = ke;
          /* falls through */
          case ke:
            if (b.extra) {
              for (Ft = b.extra; Z < Ft; ) {
                if (V === 0)
                  break e;
                V--, j += Q[h++] << Z, Z += 8;
              }
              b.offset += j & (1 << b.extra) - 1, j >>>= b.extra, Z -= b.extra, b.back += b.extra;
            }
            if (b.offset > b.dmax) {
              S.msg = "invalid distance too far back", b.mode = we;
              break;
            }
            b.mode = Ee;
          /* falls through */
          case Ee:
            if (x === 0)
              break e;
            if (_ = ue - x, b.offset > _) {
              if (_ = b.offset - _, _ > b.whave && b.sane) {
                S.msg = "invalid distance too far back", b.mode = we;
                break;
              }
              _ > b.wnext ? (_ -= b.wnext, w = b.wsize - _) : w = b.wnext - _, _ > b.length && (_ = b.length), p = b.window;
            } else
              p = ce, w = W - b.offset, _ = b.length;
            _ > x && (_ = x), x -= _, b.length -= _;
            do
              ce[W++] = p[w++];
            while (--_);
            b.length === 0 && (b.mode = Ae);
            break;
          case De:
            if (x === 0)
              break e;
            ce[W++] = b.length, x--, b.mode = Ae;
            break;
          case Ge:
            if (b.wrap) {
              for (; Z < 32; ) {
                if (V === 0)
                  break e;
                V--, j |= Q[h++] << Z, Z += 8;
              }
              if (ue -= x, S.total_out += ue, b.total += ue, ue && (S.adler = b.check = /*UPDATE(state.check, put - _out, _out);*/
              b.flags ? r(b.check, ce, ue, W - ue) : e(b.check, ce, ue, W - ue)), ue = x, (b.flags ? j : lt(j)) !== b.check) {
                S.msg = "incorrect data check", b.mode = we;
                break;
              }
              j = 0, Z = 0;
            }
            b.mode = tt;
          /* falls through */
          case tt:
            if (b.wrap && b.flags) {
              for (; Z < 32; ) {
                if (V === 0)
                  break e;
                V--, j += Q[h++] << Z, Z += 8;
              }
              if (j !== (b.total & 4294967295)) {
                S.msg = "incorrect length check", b.mode = we;
                break;
              }
              j = 0, Z = 0;
            }
            b.mode = je;
          /* falls through */
          case je:
            $e = g;
            break e;
          case we:
            $e = A;
            break e;
          case Oe:
            return R;
          case Ve:
          /* falls through */
          default:
            return E;
        }
    return S.next_out = W, S.avail_out = x, S.next_in = h, S.avail_in = V, b.hold = j, b.bits = Z, (b.wsize || ue !== S.avail_out && b.mode < we && (b.mode < Ge || F !== l)) && k(S, S.output, S.next_out, ue - S.avail_out), he -= S.avail_in, ue -= S.avail_out, S.total_in += he, S.total_out += ue, b.total += ue, b.wrap && ue && (S.adler = b.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    b.flags ? r(b.check, ce, ue, S.next_out - ue) : e(b.check, ce, ue, S.next_out - ue)), S.data_type = b.bits + (b.last ? 64 : 0) + (b.mode === oe ? 128 : 0) + (b.mode === be || b.mode === X ? 256 : 0), (he === 0 && ue === 0 || F === l) && $e === m && ($e = I), $e;
  }
  function d(S) {
    if (!S || !S.state)
      return E;
    var F = S.state;
    return F.window && (F.window = null), S.state = null, m;
  }
  function v(S, F) {
    var b;
    return !S || !S.state || (b = S.state, (b.wrap & 2) === 0) ? E : (b.head = F, F.done = !1, m);
  }
  function C(S, F) {
    var b = F.length, Q, ce, h;
    return !S || !S.state || (Q = S.state, Q.wrap !== 0 && Q.mode !== J) ? E : Q.mode === J && (ce = 1, ce = e(ce, F, b, 0), ce !== Q.check) ? A : (h = k(S, F, b, b), h ? (Q.mode = Oe, R) : (Q.havedict = 1, m));
  }
  return Tt.inflateReset = Fe, Tt.inflateReset2 = Xe, Tt.inflateResetKeep = It, Tt.inflateInit = Ze, Tt.inflateInit2 = ut, Tt.inflate = c, Tt.inflateEnd = d, Tt.inflateGetHeader = v, Tt.inflateSetDictionary = C, Tt.inflateInfo = "pako inflate (from Nodeca project)", Tt;
}
var sn, Pa;
function Jo() {
  return Pa || (Pa = 1, sn = {
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
  }), sn;
}
var cn, ja;
function rl() {
  if (ja) return cn;
  ja = 1;
  function t() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
  }
  return cn = t, cn;
}
var za;
function il() {
  if (za) return Er;
  za = 1;
  var t = tl(), e = or(), r = Yo(), i = Jo(), n = ea(), a = Ko(), o = rl(), s = Object.prototype.toString;
  function l(m) {
    if (!(this instanceof l)) return new l(m);
    this.options = e.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, m || {});
    var g = this.options;
    g.raw && g.windowBits >= 0 && g.windowBits < 16 && (g.windowBits = -g.windowBits, g.windowBits === 0 && (g.windowBits = -15)), g.windowBits >= 0 && g.windowBits < 16 && !(m && m.windowBits) && (g.windowBits += 32), g.windowBits > 15 && g.windowBits < 48 && (g.windowBits & 15) === 0 && (g.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new a(), this.strm.avail_out = 0;
    var y = t.inflateInit2(
      this.strm,
      g.windowBits
    );
    if (y !== i.Z_OK)
      throw new Error(n[y]);
    if (this.header = new o(), t.inflateGetHeader(this.strm, this.header), g.dictionary && (typeof g.dictionary == "string" ? g.dictionary = r.string2buf(g.dictionary) : s.call(g.dictionary) === "[object ArrayBuffer]" && (g.dictionary = new Uint8Array(g.dictionary)), g.raw && (y = t.inflateSetDictionary(this.strm, g.dictionary), y !== i.Z_OK)))
      throw new Error(n[y]);
  }
  l.prototype.push = function(m, g) {
    var y = this.strm, E = this.options.chunkSize, A = this.options.dictionary, R, I, T, D, P, M = !1;
    if (this.ended)
      return !1;
    I = g === ~~g ? g : g === !0 ? i.Z_FINISH : i.Z_NO_FLUSH, typeof m == "string" ? y.input = r.binstring2buf(m) : s.call(m) === "[object ArrayBuffer]" ? y.input = new Uint8Array(m) : y.input = m, y.next_in = 0, y.avail_in = y.input.length;
    do {
      if (y.avail_out === 0 && (y.output = new e.Buf8(E), y.next_out = 0, y.avail_out = E), R = t.inflate(y, i.Z_NO_FLUSH), R === i.Z_NEED_DICT && A && (R = t.inflateSetDictionary(this.strm, A)), R === i.Z_BUF_ERROR && M === !0 && (R = i.Z_OK, M = !1), R !== i.Z_STREAM_END && R !== i.Z_OK)
        return this.onEnd(R), this.ended = !0, !1;
      y.next_out && (y.avail_out === 0 || R === i.Z_STREAM_END || y.avail_in === 0 && (I === i.Z_FINISH || I === i.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (T = r.utf8border(y.output, y.next_out), D = y.next_out - T, P = r.buf2string(y.output, T), y.next_out = D, y.avail_out = E - D, D && e.arraySet(y.output, y.output, T, D, 0), this.onData(P)) : this.onData(e.shrinkBuf(y.output, y.next_out))), y.avail_in === 0 && y.avail_out === 0 && (M = !0);
    } while ((y.avail_in > 0 || y.avail_out === 0) && R !== i.Z_STREAM_END);
    return R === i.Z_STREAM_END && (I = i.Z_FINISH), I === i.Z_FINISH ? (R = t.inflateEnd(this.strm), this.onEnd(R), this.ended = !0, R === i.Z_OK) : (I === i.Z_SYNC_FLUSH && (this.onEnd(i.Z_OK), y.avail_out = 0), !0);
  }, l.prototype.onData = function(m) {
    this.chunks.push(m);
  }, l.prototype.onEnd = function(m) {
    m === i.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = m, this.msg = this.strm.msg;
  };
  function f(m, g) {
    var y = new l(g);
    if (y.push(m, !0), y.err)
      throw y.msg || n[y.err];
    return y.result;
  }
  function u(m, g) {
    return g = g || {}, g.raw = !0, f(m, g);
  }
  return Er.Inflate = l, Er.inflate = f, Er.inflateRaw = u, Er.ungzip = f, Er;
}
var ln, Ha;
function nl() {
  if (Ha) return ln;
  Ha = 1;
  var t = or().assign, e = Jc(), r = il(), i = Jo(), n = {};
  return t(n, e, r, i), ln = n, ln;
}
var al = nl(), ta = /* @__PURE__ */ Jt(al), un, qa;
function ol() {
  if (qa) return un;
  qa = 1;
  const t = (e, r) => function(...i) {
    const n = r.promiseModule;
    return new n((a, o) => {
      r.multiArgs ? i.push((...s) => {
        r.errorFirst ? s[0] ? o(s) : (s.shift(), a(s)) : a(s);
      }) : r.errorFirst ? i.push((s, l) => {
        s ? o(s) : a(l);
      }) : i.push(a), e.apply(this, i);
    });
  };
  return un = (e, r) => {
    r = Object.assign({
      exclude: [/.+(Sync|Stream)$/],
      errorFirst: !0,
      promiseModule: Promise
    }, r);
    const i = typeof e;
    if (!(e !== null && (i === "object" || i === "function")))
      throw new TypeError(\`Expected \\\`input\\\` to be a \\\`Function\\\` or \\\`Object\\\`, got \\\`\${e === null ? "null" : i}\\\`\`);
    const n = (o) => {
      const s = (l) => typeof l == "string" ? o === l : l.test(o);
      return r.include ? r.include.some(s) : !r.exclude.some(s);
    };
    let a;
    i === "function" ? a = function(...o) {
      return r.excludeMain ? e(...o) : t(e, r).apply(this, o);
    } : a = Object.create(Object.getPrototypeOf(e));
    for (const o in e) {
      const s = e[o];
      a[o] = typeof s == "function" && n(o) ? t(s, r) : s;
    }
    return a;
  }, un;
}
var sl = ol(), fn = /* @__PURE__ */ Jt(sl), hn, Wa;
function cl() {
  if (Wa) return hn;
  Wa = 1;
  function t(re) {
    return Array.isArray(re) ? re : [re];
  }
  const e = "", r = " ", i = "\\\\", n = /^\\s+$/, a = /(?:[^\\\\]|^)\\\\$/, o = /^\\\\!/, s = /^\\\\#/, l = /\\r?\\n/g, f = /^\\.*\\/|^\\.+$/, u = "/";
  let m = "node-ignore";
  typeof Symbol < "u" && (m = Symbol.for("node-ignore"));
  const g = m, y = (re, X, ie) => Object.defineProperty(re, X, { value: ie }), E = /([0-z])-([0-z])/g, A = () => !1, R = (re) => re.replace(
    E,
    (X, ie, de) => ie.charCodeAt(0) <= de.charCodeAt(0) ? X : e
  ), I = (re) => {
    const { length: X } = re;
    return re.slice(0, X - X % 2);
  }, T = [
    [
      // remove BOM
      // TODO:
      // Other similar zero-width characters?
      /^\\uFEFF/,
      () => e
    ],
    // > Trailing spaces are ignored unless they are quoted with backslash ("\\")
    [
      // (a\\ ) -> (a )
      // (a  ) -> (a)
      // (a ) -> (a)
      // (a \\ ) -> (a  )
      /((?:\\\\\\\\)*?)(\\\\?\\s+)$/,
      (re, X, ie) => X + (ie.indexOf("\\\\") === 0 ? r : e)
    ],
    // replace (\\ ) with ' '
    // (\\ ) -> ' '
    // (\\\\ ) -> '\\\\ '
    // (\\\\\\ ) -> '\\\\ '
    [
      /(\\\\+?)\\s/g,
      (re, X) => {
        const { length: ie } = X;
        return X.slice(0, ie - ie % 2) + r;
      }
    ],
    // Escape metacharacters
    // which is written down by users but means special for regular expressions.
    // > There are 12 characters with special meanings:
    // > - the backslash \\,
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
      /[\\\\$.|*+(){^]/g,
      (re) => \`\\\\\${re}\`
    ],
    [
      // > a question mark (?) matches a single character
      /(?!\\\\)\\?/g,
      () => "[^/]"
    ],
    // leading slash
    [
      // > A leading slash matches the beginning of the pathname.
      // > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
      // A leading slash matches the beginning of the pathname
      /^\\//,
      () => "^"
    ],
    // replace special metacharacter slash after the leading slash
    [
      /\\//g,
      () => "\\\\/"
    ],
    [
      // > A leading "**" followed by a slash means match in all directories.
      // > For example, "**/foo" matches file or directory "foo" anywhere,
      // > the same as pattern "foo".
      // > "**/foo/bar" matches file or directory "bar" anywhere that is directly
      // >   under directory "foo".
      // Notice that the '*'s have been replaced as '\\\\*'
      /^\\^*\\\\\\*\\\\\\*\\\\\\//,
      // '**/foo' <-> 'foo'
      () => "^(?:.*\\\\/)?"
    ],
    // starting
    [
      // there will be no leading '/'
      //   (which has been replaced by section "leading slash")
      // If starts with '**', adding a '^' to the regular expression also works
      /^(?=[^^])/,
      function() {
        return /\\/(?!$)/.test(this) ? "^" : "(?:^|\\\\/)";
      }
    ],
    // two globstars
    [
      // Use lookahead assertions so that we could match more than one \`'/**'\`
      /\\\\\\/\\\\\\*\\\\\\*(?=\\\\\\/|$)/g,
      // Zero, one or several directories
      // should not use '*', or it will be replaced by the next replacer
      // Check if it is not the last \`'/**'\`
      (re, X, ie) => X + 6 < ie.length ? "(?:\\\\/[^\\\\/]+)*" : "\\\\/.+"
    ],
    // normal intermediate wildcards
    [
      // Never replace escaped '*'
      // ignore rule '\\*' will match the path '*'
      // 'abc.*/' -> go
      // 'abc.*'  -> skip this rule,
      //    coz trailing single wildcard will be handed by [trailing wildcard]
      /(^|[^\\\\]+)(\\\\\\*)+(?=.+)/g,
      // '*.js' matches '.js'
      // '*.js' doesn't match 'abc'
      (re, X, ie) => {
        const de = ie.replace(/\\\\\\*/g, "[^\\\\/]*");
        return X + de;
      }
    ],
    [
      // unescape, revert step 3 except for back slash
      // For example, if a user escape a '\\\\*',
      // after step 3, the result will be '\\\\\\\\\\\\*'
      /\\\\\\\\\\\\(?=[$.|*+(){^])/g,
      () => i
    ],
    [
      // '\\\\\\\\' -> '\\\\'
      /\\\\\\\\/g,
      () => i
    ],
    [
      // > The range notation, e.g. [a-zA-Z],
      // > can be used to match one of the characters in a range.
      // \`\\\` is escaped by step 3
      /(\\\\)?\\[([^\\]/]*?)(\\\\*)($|\\])/g,
      (re, X, ie, de, xe) => X === i ? \`\\\\[\${ie}\${I(de)}\${xe}\` : xe === "]" && de.length % 2 === 0 ? \`[\${R(ie)}\${de}]\` : "[]"
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
      (re) => /\\/$/.test(re) ? \`\${re}$\` : \`\${re}(?=$|\\\\/$)\`
    ],
    // trailing wildcard
    [
      /(\\^|\\\\\\/)?\\\\\\*$/,
      (re, X) => \`\${X ? \`\${X}[^/]+\` : "[^/]*"}(?=$|\\\\/$)\`
    ]
  ], D = /* @__PURE__ */ Object.create(null), P = (re, X) => {
    let ie = D[re];
    return ie || (ie = T.reduce(
      (de, [xe, Re]) => de.replace(xe, Re.bind(re)),
      re
    ), D[re] = ie), X ? new RegExp(ie, "i") : new RegExp(ie);
  }, M = (re) => typeof re == "string", U = (re) => re && M(re) && !n.test(re) && !a.test(re) && re.indexOf("#") !== 0, $ = (re) => re.split(l);
  class O {
    constructor(X, ie, de, xe) {
      this.origin = X, this.pattern = ie, this.negative = de, this.regex = xe;
    }
  }
  const q = (re, X) => {
    const ie = re;
    let de = !1;
    re.indexOf("!") === 0 && (de = !0, re = re.substr(1)), re = re.replace(o, "!").replace(s, "#");
    const xe = P(re, X);
    return new O(
      ie,
      re,
      de,
      xe
    );
  }, z = (re, X) => {
    throw new X(re);
  }, Y = (re, X, ie) => M(re) ? re ? Y.isNotRelative(re) ? ie(
    \`path should be a \\\`path.relative()\\\`d string, but got "\${X}"\`,
    RangeError
  ) : !0 : ie("path must not be empty", TypeError) : ie(
    \`path must be a string, but got \\\`\${X}\\\`\`,
    TypeError
  ), N = (re) => f.test(re);
  Y.isNotRelative = N, Y.convert = (re) => re;
  class J {
    constructor({
      ignorecase: X = !0,
      ignoreCase: ie = X,
      allowRelativePaths: de = !1
    } = {}) {
      y(this, g, !0), this._rules = [], this._ignoreCase = ie, this._allowRelativePaths = de, this._initCache();
    }
    _initCache() {
      this._ignoreCache = /* @__PURE__ */ Object.create(null), this._testCache = /* @__PURE__ */ Object.create(null);
    }
    _addPattern(X) {
      if (X && X[g]) {
        this._rules = this._rules.concat(X._rules), this._added = !0;
        return;
      }
      if (U(X)) {
        const ie = q(X, this._ignoreCase);
        this._added = !0, this._rules.push(ie);
      }
    }
    // @param {Array<string> | string | Ignore} pattern
    add(X) {
      return this._added = !1, t(
        M(X) ? $(X) : X
      ).forEach(this._addPattern, this), this._added && this._initCache(), this;
    }
    // legacy
    addPattern(X) {
      return this.add(X);
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
    //   setting \`checkUnignored\` to \`false\` could reduce additional
    //   path matching.
    // @returns {TestResult} true if a file is ignored
    _testOne(X, ie) {
      let de = !1, xe = !1;
      return this._rules.forEach((Re) => {
        const { negative: be } = Re;
        if (xe === be && de !== xe || be && !de && !xe && !ie)
          return;
        Re.regex.test(X) && (de = !be, xe = be);
      }), {
        ignored: de,
        unignored: xe
      };
    }
    // @returns {TestResult}
    _test(X, ie, de, xe) {
      const Re = X && Y.convert(X);
      return Y(
        Re,
        X,
        this._allowRelativePaths ? A : z
      ), this._t(Re, ie, de, xe);
    }
    _t(X, ie, de, xe) {
      if (X in ie)
        return ie[X];
      if (xe || (xe = X.split(u)), xe.pop(), !xe.length)
        return ie[X] = this._testOne(X, de);
      const Re = this._t(
        xe.join(u) + u,
        ie,
        de,
        xe
      );
      return ie[X] = Re.ignored ? Re : this._testOne(X, de);
    }
    ignores(X) {
      return this._test(X, this._ignoreCache, !1).ignored;
    }
    createFilter() {
      return (X) => !this.ignores(X);
    }
    filter(X) {
      return t(X).filter(this.createFilter());
    }
    // @returns {TestResult}
    test(X) {
      return this._test(X, this._testCache, !0);
    }
  }
  const oe = (re) => new J(re), _e = (re) => Y(re && Y.convert(re), re, A);
  if (oe.isPathValid = _e, oe.default = oe, hn = oe, // Detect \`process\` so that it can run in browsers.
  typeof gt < "u" && (gt.env && gt.env.IGNORE_TEST_WIN32 || gt.platform === "win32")) {
    const re = (ie) => /^\\\\\\\\\\?\\\\/.test(ie) || /["<>|\\u0000-\\u001F]+/u.test(ie) ? ie : ie.replace(/\\\\/g, "/");
    Y.convert = re;
    const X = /^[a-z]:\\//i;
    Y.isNotRelative = (ie) => X.test(ie) || N(ie);
  }
  return hn;
}
var ll = cl(), ul = /* @__PURE__ */ Jt(ll), dn, Ga;
function fl() {
  if (Ga) return dn;
  Ga = 1;
  function t(i) {
    return i.replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&");
  }
  function e(i, n, a) {
    return n = n instanceof RegExp ? n : new RegExp(t(n), "g"), i.replace(n, a);
  }
  var r = {
    clean: function(n) {
      if (typeof n != "string")
        throw new Error("Expected a string, received: " + n);
      return n = e(n, "./", "/"), n = e(n, "..", "."), n = e(n, " ", "-"), n = e(n, /^[~^:?*\\\\\\-]/g, ""), n = e(n, /[~^:?*\\\\]/g, "-"), n = e(n, /[~^:?*\\\\\\-]$/g, ""), n = e(n, "@{", "-"), n = e(n, /\\.$/g, ""), n = e(n, /\\/$/g, ""), n = e(n, /\\.lock$/g, ""), n;
    }
  };
  return dn = r, dn;
}
var hl = fl(), zt = /* @__PURE__ */ Jt(hl), wn, Za;
function dl() {
  return Za || (Za = 1, wn = function(t, e) {
    var r = t, i = e, n = r.length, a = i.length, o = !1, s = null, l = n + 1, f = [], u = [], m = [], g = "", y = -1, E = 0, A = 1, R, I, T = function() {
      n >= a && (R = r, I = n, r = i, i = R, n = a, a = I, o = !0, l = n + 1);
    }, D = function($, O, q) {
      return {
        x: $,
        y: O,
        k: q
      };
    }, P = function($, O) {
      return {
        elem: $,
        t: O
      };
    }, M = function($, O, q) {
      var z, Y, N;
      for (O > q ? z = f[$ - 1 + l] : z = f[$ + 1 + l], N = Math.max(O, q), Y = N - $; Y < n && N < a && r[Y] === i[N]; )
        ++Y, ++N;
      return f[$ + l] = u.length, u[u.length] = new D(Y, N, z), N;
    }, U = function($) {
      var O, q, z;
      for (O = q = 0, z = $.length - 1; z >= 0; --z)
        for (; O < $[z].x || q < $[z].y; )
          $[z].y - $[z].x > q - O ? (o ? m[m.length] = new P(i[q], y) : m[m.length] = new P(i[q], A), ++q) : $[z].y - $[z].x < q - O ? (o ? m[m.length] = new P(r[O], A) : m[m.length] = new P(r[O], y), ++O) : (m[m.length] = new P(r[O], E), g += r[O], ++O, ++q);
    };
    return T(), {
      SES_DELETE: -1,
      SES_COMMON: 0,
      SES_ADD: 1,
      editdistance: function() {
        return s;
      },
      getlcs: function() {
        return g;
      },
      getses: function() {
        return m;
      },
      compose: function() {
        var $, O, q, z, Y, N, J, oe;
        for ($ = a - n, O = n + a + 3, q = {}, J = 0; J < O; ++J)
          q[J] = -1, f[J] = -1;
        z = -1;
        do {
          for (++z, oe = -z; oe <= $ - 1; ++oe)
            q[oe + l] = M(oe, q[oe - 1 + l] + 1, q[oe + 1 + l]);
          for (oe = $ + z; oe >= $ + 1; --oe)
            q[oe + l] = M(oe, q[oe - 1 + l] + 1, q[oe + 1 + l]);
          q[$ + l] = M($, q[$ - 1 + l] + 1, q[$ + 1 + l]);
        } while (q[$ + l] !== a);
        for (s = $ + 2 * z, Y = f[$ + l], N = []; Y !== -1; )
          N[N.length] = new D(u[Y].x, u[Y].y, null), Y = u[Y].k;
        U(N);
      }
    };
  }), wn;
}
var pn, Va;
function wl() {
  if (Va) return pn;
  Va = 1;
  var t = dl();
  function e(a, o) {
    var s = new t(a, o);
    s.compose();
    for (var l = s.getses(), f, u, m = a.length - 1, g = o.length - 1, y = l.length - 1; y >= 0; --y)
      l[y].t === s.SES_COMMON ? (u ? (u.chain = {
        file1index: m,
        file2index: g,
        chain: null
      }, u = u.chain) : (f = {
        file1index: m,
        file2index: g,
        chain: null
      }, u = f), m--, g--) : l[y].t === s.SES_DELETE ? m-- : l[y].t === s.SES_ADD && g--;
    var E = {
      file1index: -1,
      file2index: -1,
      chain: null
    };
    return u ? (u.chain = E, f) : E;
  }
  function r(a, o) {
    for (var s = [], l = a.length, f = o.length, u = e(a, o); u !== null; u = u.chain) {
      var m = l - u.file1index - 1, g = f - u.file2index - 1;
      l = u.file1index, f = u.file2index, (m || g) && s.push({
        file1: [l + 1, m],
        file2: [f + 1, g]
      });
    }
    return s.reverse(), s;
  }
  function i(a, o, s) {
    var l, f = r(o, a), u = r(o, s), m = [];
    function g(ie, de) {
      m.push([ie.file1[0], de, ie.file1[1], ie.file2[0], ie.file2[1]]);
    }
    for (l = 0; l < f.length; l++)
      g(f[l], 0);
    for (l = 0; l < u.length; l++)
      g(u[l], 2);
    m.sort(function(ie, de) {
      return ie[0] - de[0];
    });
    var y = [], E = 0;
    function A(ie) {
      ie > E && (y.push([1, E, ie - E]), E = ie);
    }
    for (var R = 0; R < m.length; R++) {
      for (var I = R, T = m[R], D = T[0], P = D + T[2]; R < m.length - 1; ) {
        var M = m[R + 1], U = M[0];
        if (U > P) break;
        P = Math.max(P, U + M[2]), R++;
      }
      if (A(D), I == R)
        T[4] > 0 && y.push([T[1], T[3], T[4]]);
      else {
        var $ = {
          0: [a.length, -1, o.length, -1],
          2: [s.length, -1, o.length, -1]
        };
        for (l = I; l <= R; l++) {
          T = m[l];
          var O = T[1], q = $[O], z = T[0], Y = z + T[2], N = T[3], J = N + T[4];
          q[0] = Math.min(N, q[0]), q[1] = Math.max(J, q[1]), q[2] = Math.min(z, q[2]), q[3] = Math.max(Y, q[3]);
        }
        var oe = $[0][0] + (D - $[0][2]), _e = $[0][1] + (P - $[0][3]), re = $[2][0] + (D - $[2][2]), X = $[2][1] + (P - $[2][3]);
        y.push([
          -1,
          oe,
          _e - oe,
          D,
          P - D,
          re,
          X - re
        ]);
      }
      E = P;
    }
    return A(o.length), y;
  }
  function n(a, o, s) {
    var l = [], f = [a, o, s], u = i(a, o, s), m = [];
    function g() {
      m.length && l.push({
        ok: m
      }), m = [];
    }
    function y(T) {
      for (var D = 0; D < T.length; D++)
        m.push(T[D]);
    }
    function E(T) {
      if (T[2] != T[6]) return !0;
      for (var D = T[1], P = T[5], M = 0; M < T[2]; M++)
        if (a[M + D] != s[M + P]) return !0;
      return !1;
    }
    for (var A = 0; A < u.length; A++) {
      var R = u[A], I = R[0];
      I == -1 ? E(R) ? (g(), l.push({
        conflict: {
          a: a.slice(R[1], R[1] + R[2]),
          aIndex: R[1],
          o: o.slice(R[3], R[3] + R[4]),
          oIndex: R[3],
          b: s.slice(R[5], R[5] + R[6]),
          bIndex: R[5]
        }
      })) : y(f[0].slice(R[1], R[1] + R[2])) : y(f[I].slice(R[1], R[1] + R[2]));
    }
    return g(), l;
  }
  return pn = n, pn;
}
var pl = wl(), ml = /* @__PURE__ */ Jt(pl);
class Ne extends Error {
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
    const r = new Ne(e.message);
    return r.code = e.code, r.data = e.data, r.caller = e.caller, r.stack = e.stack, r;
  }
  get isIsomorphicGitError() {
    return !0;
  }
}
class Kr extends Ne {
  /**
   * @param {Array<string>} filepaths
   */
  constructor(e) {
    super(
      \`Modifying the index is not possible because you have unmerged files: \${e.toString}. Fix them up in the work tree, and then use 'git add/rm as appropriate to mark resolution and make a commit.\`
    ), this.code = this.name = Kr.code, this.data = { filepaths: e };
  }
}
Kr.code = "UnmergedPathsError";
class Te extends Ne {
  /**
   * @param {string} message
   */
  constructor(e) {
    super(
      \`An internal error caused this command to fail. Please file a bug report at https://github.com/isomorphic-git/isomorphic-git/issues with this error message: \${e}\`
    ), this.code = this.name = Te.code, this.data = { message: e };
  }
}
Te.code = "InternalError";
class Or extends Ne {
  /**
   * @param {string} filepath
   */
  constructor(e) {
    super(\`The filepath "\${e}" contains unsafe character sequences\`), this.code = this.name = Or.code, this.data = { filepath: e };
  }
}
Or.code = "UnsafeFilepathError";
class jt {
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
    const i = this.buffer.toString(e, this._start, this._start + r);
    return this._start += r, i;
  }
  write(e, r, i) {
    const n = this.buffer.write(e, this._start, r, i);
    return this._start += r, n;
  }
  copy(e, r, i) {
    const n = e.copy(this.buffer, this._start, r, i);
    return this._start += n, n;
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
function Ni(t, e) {
  return -(t < e) || +(t > e);
}
function Qo(t, e) {
  return Ni(t.path, e.path);
}
function es(t) {
  let e = t > 0 ? t >> 12 : 0;
  e !== 4 && e !== 8 && e !== 10 && e !== 14 && (e = 8);
  let r = t & 511;
  return r & 73 ? r = 493 : r = 420, e !== 8 && (r = 0), (e << 12) + r;
}
const Ut = 2 ** 32;
function Xa(t, e, r, i) {
  if (t !== void 0 && e !== void 0)
    return [t, e];
  r === void 0 && (r = i.valueOf());
  const n = Math.floor(r / 1e3), a = (r - n * 1e3) * 1e6;
  return [n, a];
}
function xr(t) {
  const [e, r] = Xa(
    t.ctimeSeconds,
    t.ctimeNanoseconds,
    t.ctimeMs,
    t.ctime
  ), [i, n] = Xa(
    t.mtimeSeconds,
    t.mtimeNanoseconds,
    t.mtimeMs,
    t.mtime
  );
  return {
    ctimeSeconds: e % Ut,
    ctimeNanoseconds: r % Ut,
    mtimeSeconds: i % Ut,
    mtimeNanoseconds: n % Ut,
    dev: t.dev % Ut,
    ino: t.ino % Ut,
    mode: es(t.mode % Ut),
    uid: t.uid % Ut,
    gid: t.gid % Ut,
    // size of -1 happens over a BrowserFS HTTP Backend that doesn't serve Content-Length headers
    // (like the Karma webserver) because BrowserFS HTTP Backend uses HTTP HEAD requests to do fs.stat
    size: t.size > -1 ? t.size % Ut : 0
  };
}
function gl(t) {
  let e = "";
  for (const r of new Uint8Array(t))
    r < 16 && (e += "0"), e += r.toString(16);
  return e;
}
let mn = null;
async function Xt(t) {
  return mn === null && (mn = await _l()), mn ? ts(t) : yl(t);
}
function yl(t) {
  return new Zo().update(t).digest("hex");
}
async function ts(t) {
  const e = await crypto.subtle.digest("SHA-1", t);
  return gl(e);
}
async function _l() {
  try {
    if (await ts(new Uint8Array([])) === "da39a3ee5e6b4b0d3255bfef95601890afd80709") return !0;
  } catch {
  }
  return !1;
}
function bl(t) {
  return {
    assumeValid: !!(t & 32768),
    extended: !!(t & 16384),
    stage: (t & 12288) >> 12,
    nameLength: t & 4095
  };
}
function vl(t) {
  const e = t.flags;
  return e.extended = !1, e.nameLength = Math.min(fe.from(t.path).length, 4095), (e.assumeValid ? 32768 : 0) + (e.extended ? 16384 : 0) + ((e.stage & 3) << 12) + (e.nameLength & 4095);
}
class dr {
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
    if (fe.isBuffer(e))
      return dr.fromBuffer(e);
    if (e === null)
      return new dr(null);
    throw new Te("invalid type passed to GitIndex.from");
  }
  static async fromBuffer(e) {
    if (e.length === 0)
      throw new Te("Index file is empty (.git/index)");
    const r = new dr(), i = new jt(e), n = i.toString("utf8", 4);
    if (n !== "DIRC")
      throw new Te(\`Invalid dircache magic file number: \${n}\`);
    const a = await Xt(e.slice(0, -20)), o = e.slice(-20).toString("hex");
    if (o !== a)
      throw new Te(
        \`Invalid checksum in GitIndex buffer: expected \${o} but saw \${a}\`
      );
    const s = i.readUInt32BE();
    if (s !== 2)
      throw new Te(\`Unsupported dircache version: \${s}\`);
    const l = i.readUInt32BE();
    let f = 0;
    for (; !i.eof() && f < l; ) {
      const u = {};
      u.ctimeSeconds = i.readUInt32BE(), u.ctimeNanoseconds = i.readUInt32BE(), u.mtimeSeconds = i.readUInt32BE(), u.mtimeNanoseconds = i.readUInt32BE(), u.dev = i.readUInt32BE(), u.ino = i.readUInt32BE(), u.mode = i.readUInt32BE(), u.uid = i.readUInt32BE(), u.gid = i.readUInt32BE(), u.size = i.readUInt32BE(), u.oid = i.slice(20).toString("hex");
      const m = i.readUInt16BE();
      u.flags = bl(m);
      const g = e.indexOf(0, i.tell() + 1) - i.tell();
      if (g < 1)
        throw new Te(\`Got a path length of: \${g}\`);
      if (u.path = i.toString("utf8", g), u.path.includes("..\\\\") || u.path.includes("../"))
        throw new Or(u.path);
      let y = 8 - (i.tell() - 12) % 8;
      for (y === 0 && (y = 8); y--; ) {
        const E = i.readUInt8();
        if (E !== 0)
          throw new Te(
            \`Expected 1-8 null characters but got '\${E}' after \${u.path}\`
          );
        if (i.eof())
          throw new Te("Unexpected end of file");
      }
      u.stages = [], r._addEntry(u), f++;
    }
    return r;
  }
  get unmergedPaths() {
    return [...this._unmergedPaths];
  }
  get entries() {
    return [...this._entries.values()].sort(Qo);
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
  insert({ filepath: e, stats: r, oid: i, stage: n = 0 }) {
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
    }), r = xr(r);
    const a = fe.from(e), o = {
      ctimeSeconds: r.ctimeSeconds,
      ctimeNanoseconds: r.ctimeNanoseconds,
      mtimeSeconds: r.mtimeSeconds,
      mtimeNanoseconds: r.mtimeNanoseconds,
      dev: r.dev,
      ino: r.ino,
      // We provide a fallback value for \`mode\` here because not all fs
      // implementations assign it, but we use it in GitTree.
      // '100644' is for a "regular non-executable file"
      mode: r.mode || 33188,
      uid: r.uid,
      gid: r.gid,
      size: r.size,
      path: e,
      oid: i,
      flags: {
        assumeValid: !1,
        extended: !1,
        stage: n,
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
    return this.entries.map((e) => \`\${e.mode.toString(8)} \${e.oid}    \${e.path}\`).join(\`
\`);
  }
  static async _entryToBuffer(e) {
    const r = fe.from(e.path), i = Math.ceil((62 + r.length + 1) / 8) * 8, n = fe.alloc(i), a = new jt(n), o = xr(e);
    return a.writeUInt32BE(o.ctimeSeconds), a.writeUInt32BE(o.ctimeNanoseconds), a.writeUInt32BE(o.mtimeSeconds), a.writeUInt32BE(o.mtimeNanoseconds), a.writeUInt32BE(o.dev), a.writeUInt32BE(o.ino), a.writeUInt32BE(o.mode), a.writeUInt32BE(o.uid), a.writeUInt32BE(o.gid), a.writeUInt32BE(o.size), a.write(e.oid, 20, "hex"), a.writeUInt16BE(vl(e)), a.write(e.path, r.length, "utf8"), n;
  }
  async toObject() {
    const e = fe.alloc(12), r = new jt(e);
    r.write("DIRC", 4, "utf8"), r.writeUInt32BE(2), r.writeUInt32BE(this.entriesFlat.length);
    let i = [];
    for (const s of this.entries)
      if (i.push(dr._entryToBuffer(s)), s.stages.length > 1)
        for (const l of s.stages)
          l && l !== s && i.push(dr._entryToBuffer(l));
    i = await Promise.all(i);
    const n = fe.concat(i), a = fe.concat([e, n]), o = await Xt(a);
    return fe.concat([a, fe.from(o, "hex")]);
  }
}
function xi(t, e, r = !0, i = !0) {
  const n = xr(t), a = xr(e);
  return r && n.mode !== a.mode || n.mtimeSeconds !== a.mtimeSeconds || n.ctimeSeconds !== a.ctimeSeconds || n.uid !== a.uid || n.gid !== a.gid || i && n.ino !== a.ino || n.size !== a.size;
}
let gn = null;
const yn = Symbol("IndexCache");
function El() {
  return {
    map: /* @__PURE__ */ new Map(),
    stats: /* @__PURE__ */ new Map()
  };
}
async function kl(t, e, r) {
  const [i, n] = await Promise.all([
    t.lstat(e),
    t.read(e)
  ]), a = await dr.from(n);
  r.map.set(e, a), r.stats.set(e, i);
}
async function xl(t, e, r) {
  const i = r.stats.get(e);
  if (i === void 0) return !0;
  if (i === null) return !1;
  const n = await t.lstat(e);
  return n === null ? !1 : xi(i, n);
}
class at {
  /**
   *
   * @param {object} opts
   * @param {import('../models/FileSystem.js').FileSystem} opts.fs
   * @param {string} opts.gitdir
   * @param {object} opts.cache
   * @param {bool} opts.allowUnmerged
   * @param {function(GitIndex): any} closure
   */
  static async acquire({ fs: e, gitdir: r, cache: i, allowUnmerged: n = !0 }, a) {
    i[yn] || (i[yn] = El());
    const o = \`\${r}/index\`;
    gn === null && (gn = new Zr({ maxPending: 1 / 0 }));
    let s, l = [];
    return await gn.acquire(o, async () => {
      const f = i[yn];
      await xl(e, o, f) && await kl(e, o, f);
      const u = f.map.get(o);
      if (l = u.unmergedPaths, l.length && !n)
        throw new Kr(l);
      if (s = await a(u), u._dirty) {
        const m = await u.toObject();
        await e.write(o, m), f.stats.set(o, await e.lstat(o)), u._dirty = !1;
      }
    }), s;
  }
}
function Si(t) {
  const e = Math.max(t.lastIndexOf("/"), t.lastIndexOf("\\\\"));
  return e > -1 && (t = t.slice(e + 1)), t;
}
function Sr(t) {
  const e = Math.max(t.lastIndexOf("/"), t.lastIndexOf("\\\\"));
  return e === -1 ? "." : e === 0 ? "/" : t.slice(0, e);
}
function rs(t) {
  const e = /* @__PURE__ */ new Map(), r = function(n) {
    if (!e.has(n)) {
      const a = {
        type: "tree",
        fullpath: n,
        basename: Si(n),
        metadata: {},
        children: []
      };
      e.set(n, a), a.parent = r(Sr(n)), a.parent && a.parent !== a && a.parent.children.push(a);
    }
    return e.get(n);
  }, i = function(n, a) {
    if (!e.has(n)) {
      const o = {
        type: "blob",
        fullpath: n,
        basename: Si(n),
        metadata: a,
        // This recursively generates any missing parent folders.
        parent: r(Sr(n)),
        children: []
      };
      o.parent && o.parent.children.push(o), e.set(n, o);
    }
    return e.get(n);
  };
  r(".");
  for (const n of t)
    i(n.path, n);
  return e;
}
function Sl(t) {
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
  throw new Te(\`Unexpected GitTree entry mode: \${t.toString(8)}\`);
}
class Il {
  constructor({ fs: e, gitdir: r, cache: i }) {
    this.treePromise = at.acquire(
      { fs: e, gitdir: r, cache: i },
      async function(a) {
        return rs(a.entries);
      }
    );
    const n = this;
    this.ConstructEntry = class {
      constructor(o) {
        this._fullpath = o, this._type = !1, this._mode = !1, this._stat = !1, this._oid = !1;
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
    const r = e._fullpath, n = (await this.treePromise).get(r);
    if (!n || n.type === "blob") return null;
    if (n.type !== "tree")
      throw new Error(\`ENOTDIR: not a directory, scandir '\${r}'\`);
    const a = n.children.map((o) => o.fullpath);
    return a.sort(Ni), a;
  }
  async type(e) {
    return e._type === !1 && await e.stat(), e._type;
  }
  async mode(e) {
    return e._mode === !1 && await e.stat(), e._mode;
  }
  async stat(e) {
    if (e._stat === !1) {
      const i = (await this.treePromise).get(e._fullpath);
      if (!i)
        throw new Error(
          \`ENOENT: no such file or directory, lstat '\${e._fullpath}'\`
        );
      const n = i.type === "tree" ? {} : xr(i.metadata);
      e._type = i.type === "tree" ? "tree" : Sl(n.mode), e._mode = n.mode, i.type === "tree" ? e._stat = void 0 : e._stat = n;
    }
    return e._stat;
  }
  async content(e) {
  }
  async oid(e) {
    if (e._oid === !1) {
      const i = (await this.treePromise).get(e._fullpath);
      e._oid = i.metadata.oid;
    }
    return e._oid;
  }
}
const Fi = Symbol("GitWalkSymbol");
function Cr() {
  const t = /* @__PURE__ */ Object.create(null);
  return Object.defineProperty(t, Fi, {
    value: function({ fs: e, gitdir: r, cache: i }) {
      return new Il({ fs: e, gitdir: r, cache: i });
    }
  }), Object.freeze(t), t;
}
class Pe extends Ne {
  /**
   * @param {string} what
   */
  constructor(e) {
    super(\`Could not find \${e}.\`), this.code = this.name = Pe.code, this.data = { what: e };
  }
}
Pe.code = "NotFoundError";
class pt extends Ne {
  /**
   * @param {string} oid
   * @param {'blob'|'commit'|'tag'|'tree'} actual
   * @param {'blob'|'commit'|'tag'|'tree'} expected
   * @param {string} [filepath]
   */
  constructor(e, r, i, n) {
    super(
      \`Object \${e} \${n ? \`at \${n}\` : ""}was anticipated to be a \${i} but it is a \${r}.\`
    ), this.code = this.name = pt.code, this.data = { oid: e, actual: r, expected: i, filepath: n };
  }
}
pt.code = "ObjectTypeError";
class rr extends Ne {
  /**
   * @param {string} value
   */
  constructor(e) {
    super(\`Expected a 40-char hex object id but saw "\${e}".\`), this.code = this.name = rr.code, this.data = { value: e };
  }
}
rr.code = "InvalidOidError";
class Jr extends Ne {
  /**
   * @param {string} remote
   */
  constructor(e) {
    super(\`Could not find a fetch refspec for remote "\${e}". Make sure the config file has an entry like the following:
[remote "\${e}"]
	fetch = +refs/heads/*:refs/remotes/origin/*
\`), this.code = this.name = Jr.code, this.data = { remote: e };
  }
}
Jr.code = "NoRefspecError";
class Ii {
  constructor(e) {
    if (this.refs = /* @__PURE__ */ new Map(), this.parsedConfig = [], e) {
      let r = null;
      this.parsedConfig = e.trim().split(\`
\`).map((i) => {
        if (/^\\s*#/.test(i))
          return { line: i, comment: !0 };
        const n = i.indexOf(" ");
        if (i.startsWith("^")) {
          const a = i.slice(1);
          return this.refs.set(r + "^{}", a), { line: i, ref: r, peeled: a };
        } else {
          const a = i.slice(0, n);
          return r = i.slice(n + 1), this.refs.set(r, a), { line: i, ref: r, oid: a };
        }
      });
    }
    return this;
  }
  static from(e) {
    return new Ii(e);
  }
  delete(e) {
    this.parsedConfig = this.parsedConfig.filter((r) => r.ref !== e), this.refs.delete(e);
  }
  toString() {
    return this.parsedConfig.map(({ line: e }) => e).join(\`
\`) + \`
\`;
  }
}
class Ti {
  constructor({ remotePath: e, localPath: r, force: i, matchPrefix: n }) {
    Object.assign(this, {
      remotePath: e,
      localPath: r,
      force: i,
      matchPrefix: n
    });
  }
  static from(e) {
    const [
      r,
      i,
      n,
      a,
      o
    ] = e.match(/^(\\+?)(.*?)(\\*?):(.*?)(\\*?)$/).slice(1), s = r === "+", l = n === "*";
    if (l !== (o === "*"))
      throw new Te("Invalid refspec");
    return new Ti({
      remotePath: i,
      localPath: a,
      force: s,
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
class ra {
  constructor(e = []) {
    this.rules = e;
  }
  static from(e) {
    const r = [];
    for (const i of e)
      r.push(Ti.from(i));
    return new ra(r);
  }
  add(e) {
    const r = Ti.from(e);
    this.rules.push(r);
  }
  translate(e) {
    const r = [];
    for (const i of this.rules)
      for (const n of e) {
        const a = i.translate(n);
        a && r.push([n, a]);
      }
    return r;
  }
  translateOne(e) {
    let r = null;
    for (const i of this.rules) {
      const n = i.translate(e);
      n && (r = n);
    }
    return r;
  }
  localNamespaces() {
    return this.rules.filter((e) => e.matchPrefix).map((e) => e.localPath.replace(/\\/$/, ""));
  }
}
function Tl(t, e) {
  const r = t.replace(/\\^\\{\\}$/, ""), i = e.replace(/\\^\\{\\}$/, ""), n = -(r < i) || +(r > i);
  return n === 0 ? t.endsWith("^{}") ? 1 : -1 : n;
}
const Rl = (t) => {
  if (typeof t == "number")
    return t;
  t = t.toLowerCase();
  let e = parseInt(t);
  return t.endsWith("k") && (e *= 1024), t.endsWith("m") && (e *= 1024 * 1024), t.endsWith("g") && (e *= 1024 * 1024 * 1024), e;
}, qr = (t) => {
  if (typeof t == "boolean")
    return t;
  if (t = t.trim().toLowerCase(), t === "true" || t === "yes" || t === "on") return !0;
  if (t === "false" || t === "no" || t === "off") return !1;
  throw Error(
    \`Expected 'true', 'false', 'yes', 'no', 'on', or 'off', but got \${t}\`
  );
}, Ya = {
  core: {
    filemode: qr,
    bare: qr,
    logallrefupdates: qr,
    symlinks: qr,
    ignorecase: qr,
    bigFileThreshold: Rl
  }
}, Bl = /^\\[([A-Za-z0-9-.]+)(?: "(.*)")?\\]$/, $l = /^[A-Za-z0-9-.]+$/, Al = /^([A-Za-z][A-Za-z-]*)(?: *= *(.*))?$/, Dl = /^[A-Za-z][A-Za-z-]*$/, Ol = /^(.*?)( *[#;].*)$/, Cl = (t) => {
  const e = Bl.exec(t);
  if (e != null) {
    const [r, i] = e.slice(1);
    return [r, i];
  }
  return null;
}, Nl = (t) => {
  const e = Al.exec(t);
  if (e != null) {
    const [r, i = "true"] = e.slice(1), n = Fl(i), a = Ul(n);
    return [r, a];
  }
  return null;
}, Fl = (t) => {
  const e = Ol.exec(t);
  if (e == null)
    return t;
  const [r, i] = e.slice(1);
  return Ka(r) && Ka(i) ? \`\${r}\${i}\` : r;
}, Ka = (t) => (t.match(/(?:^|[^\\\\])"/g) || []).length % 2 !== 0, Ul = (t) => t.split("").reduce((e, r, i, n) => {
  const a = r === '"' && n[i - 1] !== "\\\\", o = r === "\\\\" && n[i + 1] === '"';
  return a || o ? e : e + r;
}, ""), Ja = (t) => t != null ? t.toLowerCase() : null, Gn = (t, e, r) => [Ja(t), e, Ja(r)].filter((i) => i != null).join("."), Qa = (t) => {
  const e = t.split("."), r = e.shift(), i = e.pop(), n = e.length ? e.join(".") : void 0;
  return {
    section: r,
    subsection: n,
    name: i,
    path: Gn(r, n, i),
    sectionPath: Gn(r, n, null),
    isSection: !!r
  };
}, Ml = (t, e) => t.reduce((r, i, n) => e(i) ? n : r, -1);
class ia {
  constructor(e) {
    let r = null, i = null;
    this.parsedConfig = e ? e.split(\`
\`).map((n) => {
      let a = null, o = null;
      const s = n.trim(), l = Cl(s), f = l != null;
      if (f)
        [r, i] = l;
      else {
        const m = Nl(s);
        m != null && ([a, o] = m);
      }
      const u = Gn(r, i, a);
      return { line: n, isSection: f, section: r, subsection: i, name: a, value: o, path: u };
    }) : [];
  }
  static from(e) {
    return new ia(e);
  }
  async get(e, r = !1) {
    const i = Qa(e).path, n = this.parsedConfig.filter((a) => a.path === i).map(({ section: a, name: o, value: s }) => {
      const l = Ya[a] && Ya[a][o];
      return l ? l(s) : s;
    });
    return r ? n : n.pop();
  }
  async getall(e) {
    return this.get(e, !0);
  }
  async getSubsections(e) {
    return this.parsedConfig.filter((r) => r.isSection && r.section === e).map((r) => r.subsection);
  }
  async deleteSection(e, r) {
    this.parsedConfig = this.parsedConfig.filter(
      (i) => !(i.section === e && i.subsection === r)
    );
  }
  async append(e, r) {
    return this.set(e, r, !0);
  }
  async set(e, r, i = !1) {
    const {
      section: n,
      subsection: a,
      name: o,
      path: s,
      sectionPath: l,
      isSection: f
    } = Qa(e), u = Ml(
      this.parsedConfig,
      (m) => m.path === s
    );
    if (r == null)
      u !== -1 && this.parsedConfig.splice(u, 1);
    else if (u !== -1) {
      const m = this.parsedConfig[u], g = Object.assign({}, m, {
        name: o,
        value: r,
        modified: !0
      });
      i ? this.parsedConfig.splice(u + 1, 0, g) : this.parsedConfig[u] = g;
    } else {
      const m = this.parsedConfig.findIndex(
        (y) => y.path === l
      ), g = {
        section: n,
        subsection: a,
        name: o,
        value: r,
        modified: !0,
        path: s
      };
      if ($l.test(n) && Dl.test(o))
        if (m >= 0)
          this.parsedConfig.splice(m + 1, 0, g);
        else {
          const y = {
            isSection: f,
            section: n,
            subsection: a,
            modified: !0,
            path: l
          };
          this.parsedConfig.push(y, g);
        }
    }
  }
  toString() {
    return this.parsedConfig.map(({ line: e, section: r, subsection: i, name: n, value: a, modified: o = !1 }) => o ? n != null && a != null ? typeof a == "string" && /[#;]/.test(a) ? \`	\${n} = "\${a}"\` : \`	\${n} = \${a}\` : i != null ? \`[\${r} "\${i}"]\` : \`[\${r}]\` : e).join(\`
\`);
  }
}
class rt {
  static async get({ fs: e, gitdir: r }) {
    const i = await e.read(\`\${r}/config\`, { encoding: "utf8" });
    return ia.from(i);
  }
  static async save({ fs: e, gitdir: r, config: i }) {
    await e.write(\`\${r}/config\`, i.toString(), {
      encoding: "utf8"
    });
  }
}
const _i = (t) => [
  \`\${t}\`,
  \`refs/\${t}\`,
  \`refs/tags/\${t}\`,
  \`refs/heads/\${t}\`,
  \`refs/remotes/\${t}\`,
  \`refs/remotes/\${t}/HEAD\`
], Ll = ["config", "description", "index", "shallow", "commondir"];
let _n;
async function Qt(t, e) {
  return _n === void 0 && (_n = new Zr()), _n.acquire(t, e);
}
class ae {
  static async updateRemoteRefs({
    fs: e,
    gitdir: r,
    remote: i,
    refs: n,
    symrefs: a,
    tags: o,
    refspecs: s = void 0,
    prune: l = !1,
    pruneTags: f = !1
  }) {
    for (const R of n.values())
      if (!R.match(/[0-9a-f]{40}/))
        throw new rr(R);
    const u = await rt.get({ fs: e, gitdir: r });
    if (!s) {
      if (s = await u.getall(\`remote.\${i}.fetch\`), s.length === 0)
        throw new Jr(i);
      s.unshift(\`+HEAD:refs/remotes/\${i}/HEAD\`);
    }
    const m = ra.from(s), g = /* @__PURE__ */ new Map();
    if (f) {
      const R = await ae.listRefs({
        fs: e,
        gitdir: r,
        filepath: "refs/tags"
      });
      await ae.deleteRefs({
        fs: e,
        gitdir: r,
        refs: R.map((I) => \`refs/tags/\${I}\`)
      });
    }
    if (o) {
      for (const R of n.keys())
        if (R.startsWith("refs/tags") && !R.endsWith("^{}") && !await ae.exists({ fs: e, gitdir: r, ref: R })) {
          const I = n.get(R);
          g.set(R, I);
        }
    }
    const y = m.translate([...n.keys()]);
    for (const [R, I] of y) {
      const T = n.get(R);
      g.set(I, T);
    }
    const E = m.translate([...a.keys()]);
    for (const [R, I] of E) {
      const T = a.get(R), D = m.translateOne(T);
      D && g.set(I, \`ref: \${D}\`);
    }
    const A = [];
    if (l) {
      for (const R of m.localNamespaces()) {
        const I = (await ae.listRefs({
          fs: e,
          gitdir: r,
          filepath: R
        })).map((T) => \`\${R}/\${T}\`);
        for (const T of I)
          g.has(T) || A.push(T);
      }
      A.length > 0 && await ae.deleteRefs({ fs: e, gitdir: r, refs: A });
    }
    for (const [R, I] of g)
      await Qt(
        R,
        async () => e.write(ee.join(r, R), \`\${I.trim()}
\`, "utf8")
      );
    return { pruned: A };
  }
  // TODO: make this less crude?
  static async writeRef({ fs: e, gitdir: r, ref: i, value: n }) {
    if (!n.match(/[0-9a-f]{40}/))
      throw new rr(n);
    await Qt(
      i,
      async () => e.write(ee.join(r, i), \`\${n.trim()}
\`, "utf8")
    );
  }
  static async writeSymbolicRef({ fs: e, gitdir: r, ref: i, value: n }) {
    await Qt(
      i,
      async () => e.write(ee.join(r, i), \`ref: \${n.trim()}
\`, "utf8")
    );
  }
  static async deleteRef({ fs: e, gitdir: r, ref: i }) {
    return ae.deleteRefs({ fs: e, gitdir: r, refs: [i] });
  }
  static async deleteRefs({ fs: e, gitdir: r, refs: i }) {
    await Promise.all(i.map((s) => e.rm(ee.join(r, s))));
    let n = await Qt(
      "packed-refs",
      async () => e.read(\`\${r}/packed-refs\`, { encoding: "utf8" })
    );
    const a = Ii.from(n), o = a.refs.size;
    for (const s of i)
      a.refs.has(s) && a.delete(s);
    a.refs.size < o && (n = a.toString(), await Qt(
      "packed-refs",
      async () => e.write(\`\${r}/packed-refs\`, n, { encoding: "utf8" })
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
  static async resolve({ fs: e, gitdir: r, ref: i, depth: n = void 0 }) {
    if (n !== void 0 && (n--, n === -1))
      return i;
    if (i.startsWith("ref: "))
      return i = i.slice(5), ae.resolve({ fs: e, gitdir: r, ref: i, depth: n });
    if (i.length === 40 && /[0-9a-f]{40}/.test(i))
      return i;
    const a = await ae.packedRefs({ fs: e, gitdir: r }), o = _i(i).filter((s) => !Ll.includes(s));
    for (const s of o) {
      const l = await Qt(
        s,
        async () => await e.read(\`\${r}/\${s}\`, { encoding: "utf8" }) || a.get(s)
      );
      if (l)
        return ae.resolve({ fs: e, gitdir: r, ref: l.trim(), depth: n });
    }
    throw new Pe(i);
  }
  static async exists({ fs: e, gitdir: r, ref: i }) {
    try {
      return await ae.expand({ fs: e, gitdir: r, ref: i }), !0;
    } catch {
      return !1;
    }
  }
  static async expand({ fs: e, gitdir: r, ref: i }) {
    if (i.length === 40 && /[0-9a-f]{40}/.test(i))
      return i;
    const n = await ae.packedRefs({ fs: e, gitdir: r }), a = _i(i);
    for (const o of a)
      if (await Qt(
        o,
        async () => e.exists(\`\${r}/\${o}\`)
      ) || n.has(o)) return o;
    throw new Pe(i);
  }
  static async expandAgainstMap({ ref: e, map: r }) {
    const i = _i(e);
    for (const n of i)
      if (await r.has(n)) return n;
    throw new Pe(e);
  }
  static resolveAgainstMap({ ref: e, fullref: r = e, depth: i = void 0, map: n }) {
    if (i !== void 0 && (i--, i === -1))
      return { fullref: r, oid: e };
    if (e.startsWith("ref: "))
      return e = e.slice(5), ae.resolveAgainstMap({ ref: e, fullref: r, depth: i, map: n });
    if (e.length === 40 && /[0-9a-f]{40}/.test(e))
      return { fullref: r, oid: e };
    const a = _i(e);
    for (const o of a) {
      const s = n.get(o);
      if (s)
        return ae.resolveAgainstMap({
          ref: s.trim(),
          fullref: o,
          depth: i,
          map: n
        });
    }
    throw new Pe(e);
  }
  static async packedRefs({ fs: e, gitdir: r }) {
    const i = await Qt(
      "packed-refs",
      async () => e.read(\`\${r}/packed-refs\`, { encoding: "utf8" })
    );
    return Ii.from(i).refs;
  }
  // List all the refs that match the \`filepath\` prefix
  static async listRefs({ fs: e, gitdir: r, filepath: i }) {
    const n = ae.packedRefs({ fs: e, gitdir: r });
    let a = null;
    try {
      a = await e.readdirDeep(\`\${r}/\${i}\`), a = a.map((o) => o.replace(\`\${r}/\${i}/\`, ""));
    } catch {
      a = [];
    }
    for (let o of (await n).keys())
      o.startsWith(i) && (o = o.replace(i + "/", ""), a.includes(o) || a.push(o));
    return a.sort(Tl), a;
  }
  static async listBranches({ fs: e, gitdir: r, remote: i }) {
    return i ? ae.listRefs({
      fs: e,
      gitdir: r,
      filepath: \`refs/remotes/\${i}\`
    }) : ae.listRefs({ fs: e, gitdir: r, filepath: "refs/heads" });
  }
  static async listTags({ fs: e, gitdir: r }) {
    return (await ae.listRefs({
      fs: e,
      gitdir: r,
      filepath: "refs/tags"
    })).filter((n) => !n.endsWith("^{}"));
  }
}
function Pl(t, e) {
  return Ni(eo(t), eo(e));
}
function eo(t) {
  return t.mode === "040000" ? t.path + "/" : t.path;
}
function is(t) {
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
  throw new Te(\`Unexpected GitTree entry mode: \${t}\`);
}
function jl(t) {
  const e = [];
  let r = 0;
  for (; r < t.length; ) {
    const i = t.indexOf(32, r);
    if (i === -1)
      throw new Te(
        \`GitTree: Error parsing buffer at byte location \${r}: Could not find the next space character.\`
      );
    const n = t.indexOf(0, r);
    if (n === -1)
      throw new Te(
        \`GitTree: Error parsing buffer at byte location \${r}: Could not find the next null character.\`
      );
    let a = t.slice(r, i).toString("utf8");
    a === "40000" && (a = "040000");
    const o = is(a), s = t.slice(i + 1, n).toString("utf8");
    if (s.includes("\\\\") || s.includes("/"))
      throw new Or(s);
    const l = t.slice(n + 1, n + 21).toString("hex");
    r = n + 21, e.push({ mode: a, path: s, oid: l, type: o });
  }
  return e;
}
function zl(t) {
  if (typeof t == "number" && (t = t.toString(8)), t.match(/^0?4.*/)) return "040000";
  if (t.match(/^1006.*/)) return "100644";
  if (t.match(/^1007.*/)) return "100755";
  if (t.match(/^120.*/)) return "120000";
  if (t.match(/^160.*/)) return "160000";
  throw new Te(\`Could not understand file mode: \${t}\`);
}
function Hl(t) {
  return !t.oid && t.sha && (t.oid = t.sha), t.mode = zl(t.mode), t.type || (t.type = is(t.mode)), t;
}
class _t {
  constructor(e) {
    if (fe.isBuffer(e))
      this._entries = jl(e);
    else if (Array.isArray(e))
      this._entries = e.map(Hl);
    else
      throw new Te("invalid type passed to GitTree constructor");
    this._entries.sort(Qo);
  }
  static from(e) {
    return new _t(e);
  }
  render() {
    return this._entries.map((e) => \`\${e.mode} \${e.type} \${e.oid}    \${e.path}\`).join(\`
\`);
  }
  toObject() {
    const e = [...this._entries];
    return e.sort(Pl), fe.concat(
      e.map((r) => {
        const i = fe.from(r.mode.replace(/^0/, "")), n = fe.from(" "), a = fe.from(r.path, "utf8"), o = fe.from([0]), s = fe.from(r.oid, "hex");
        return fe.concat([i, n, a, o, s]);
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
class Nr {
  static wrap({ type: e, object: r }) {
    return fe.concat([
      fe.from(\`\${e} \${r.byteLength.toString()}\\0\`),
      fe.from(r)
    ]);
  }
  static unwrap(e) {
    const r = e.indexOf(32), i = e.indexOf(0), n = e.slice(0, r).toString("utf8"), a = e.slice(r + 1, i).toString("utf8"), o = e.length - (i + 1);
    if (parseInt(a) !== o)
      throw new Te(
        \`Length mismatch: expected \${a} bytes but got \${o} instead.\`
      );
    return {
      type: n,
      object: fe.from(e.slice(i + 1))
    };
  }
}
async function ns({ fs: t, gitdir: e, oid: r }) {
  const i = \`objects/\${r.slice(0, 2)}/\${r.slice(2)}\`, n = await t.read(\`\${e}/\${i}\`);
  return n ? { object: n, format: "deflated", source: i } : null;
}
function ql(t, e) {
  const r = new jt(t), i = to(r);
  if (i !== e.byteLength)
    throw new Te(
      \`applyDelta expected source buffer to be \${i} bytes but the provided buffer was \${e.length} bytes\`
    );
  const n = to(r);
  let a;
  const o = io(r, e);
  if (o.byteLength === n)
    a = o;
  else {
    a = fe.alloc(n);
    const s = new jt(a);
    for (s.copy(o); !r.eof(); )
      s.copy(io(r, e));
    const l = s.tell();
    if (n !== l)
      throw new Te(
        \`applyDelta expected target buffer to be \${n} bytes but the resulting buffer was \${l} bytes\`
      );
  }
  return a;
}
function to(t) {
  let e = 0, r = 0, i = null;
  do
    i = t.readUInt8(), e |= (i & 127) << r, r += 7;
  while (i & 128);
  return e;
}
function ro(t, e, r) {
  let i = 0, n = 0;
  for (; r--; )
    e & 1 && (i |= t.readUInt8() << n), e >>= 1, n += 8;
  return i;
}
function io(t, e) {
  const r = t.readUInt8(), i = 128, n = 15, a = 112;
  if (r & i) {
    const o = ro(t, r & n, 4);
    let s = ro(t, (r & a) >> 4, 3);
    return s === 0 && (s = 65536), e.slice(o, o + s);
  } else
    return t.slice(r);
}
function Wl(t) {
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
function as(t) {
  return t[Symbol.asyncIterator] ? t[Symbol.asyncIterator]() : t[Symbol.iterator] ? t[Symbol.iterator]() : t.next ? t : Wl(t);
}
class os {
  constructor(e) {
    if (typeof fe > "u")
      throw new Error("Missing Buffer dependency");
    this.stream = as(e), this.buffer = null, this.cursor = 0, this.undoCursor = 0, this.started = !1, this._ended = !1, this._discardedBytes = 0;
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
    return e && (this._ended = !0, !r) ? fe.alloc(0) : (r && (r = fe.from(r)), r);
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
    for (; this.cursor + e > Gl(r); ) {
      const i = await this._next();
      if (this._ended) break;
      r.push(i);
    }
    this.buffer = fe.concat(r);
  }
  async _loadnext() {
    this._discardedBytes += this.buffer.length, this.undoCursor = 0, this.cursor = 0, this.buffer = await this._next();
  }
  async _init() {
    this.buffer = await this._next();
  }
}
function Gl(t) {
  return t.reduce((e, r) => e + r.length, 0);
}
async function Zl(t, e) {
  const r = new os(t);
  let i = await r.read(4);
  if (i = i.toString("utf8"), i !== "PACK")
    throw new Te(\`Invalid PACK header '\${i}'\`);
  let n = await r.read(4);
  if (n = n.readUInt32BE(0), n !== 2)
    throw new Te(\`Invalid packfile version: \${n}\`);
  let a = await r.read(4);
  if (a = a.readUInt32BE(0), !(a < 1))
    for (; !r.eof() && a--; ) {
      const o = r.tell(), { type: s, length: l, ofs: f, reference: u } = await Vl(r), m = new ta.Inflate();
      for (; !m.result; ) {
        const g = await r.chunk();
        if (!g) break;
        if (m.push(g, !1), m.err)
          throw new Te(\`Pako error: \${m.msg}\`);
        if (m.result) {
          if (m.result.length !== l)
            throw new Te(
              "Inflated object size is different from that stated in packfile."
            );
          await r.undo(), await r.read(g.length - m.strm.avail_in);
          const y = r.tell();
          await e({
            data: m.result,
            type: s,
            num: a,
            offset: o,
            end: y,
            reference: u,
            ofs: f
          });
        }
      }
    }
}
async function Vl(t) {
  let e = await t.byte();
  const r = e >> 4 & 7;
  let i = e & 15;
  if (e & 128) {
    let o = 4;
    do
      e = await t.byte(), i |= (e & 127) << o, o += 7;
    while (e & 128);
  }
  let n, a;
  if (r === 6) {
    let o = 0;
    n = 0;
    const s = [];
    do
      e = await t.byte(), n |= (e & 127) << o, o += 7, s.push(e);
    while (e & 128);
    a = fe.from(s);
  }
  return r === 7 && (a = await t.read(20)), { type: r, length: i, ofs: n, reference: a };
}
async function ss(t) {
  return ta.inflate(t);
}
function Xl(t) {
  const e = [];
  let r = 0, i = 0;
  do {
    r = t.readUInt8();
    const n = r & 127;
    e.push(n), i = r & 128;
  } while (i);
  return e.reduce((n, a) => n + 1 << 7 | a, -1);
}
function Yl(t, e) {
  let r = e, i = 4, n = null;
  do
    n = t.readUInt8(), r |= (n & 127) << i, i += 7;
  while (n & 128);
  return r;
}
class Ir {
  constructor(e) {
    Object.assign(this, e), this.offsetCache = {};
  }
  static async fromIdx({ idx: e, getExternalRefDelta: r }) {
    const i = new jt(e);
    if (i.slice(4).toString("hex") !== "ff744f63")
      return;
    const a = i.readUInt32BE();
    if (a !== 2)
      throw new Te(
        \`Unable to read version \${a} packfile IDX. (Only version 2 supported)\`
      );
    if (e.byteLength > 2048 * 1024 * 1024)
      throw new Te(
        "To keep implementation simple, I haven't implemented the layer 5 feature needed to support packfiles > 2GB in size."
      );
    i.seek(i.tell() + 4 * 255);
    const o = i.readUInt32BE(), s = [];
    for (let u = 0; u < o; u++) {
      const m = i.slice(20).toString("hex");
      s[u] = m;
    }
    i.seek(i.tell() + 4 * o);
    const l = /* @__PURE__ */ new Map();
    for (let u = 0; u < o; u++)
      l.set(s[u], i.readUInt32BE());
    const f = i.slice(20).toString("hex");
    return new Ir({
      hashes: s,
      crcs: {},
      offsets: l,
      packfileSha: f,
      getExternalRefDelta: r
    });
  }
  static async fromPack({ pack: e, getExternalRefDelta: r, onProgress: i }) {
    const n = {
      1: "commit",
      2: "tree",
      3: "blob",
      4: "tag",
      6: "ofs-delta",
      7: "ref-delta"
    }, a = {}, o = e.slice(-20).toString("hex"), s = [], l = {}, f = /* @__PURE__ */ new Map();
    let u = null, m = null;
    await Zl([e], async ({ data: R, type: I, reference: T, offset: D, num: P }) => {
      u === null && (u = P);
      const M = Math.floor(
        (u - P) * 100 / u
      );
      M !== m && i && await i({
        phase: "Receiving objects",
        loaded: u - P,
        total: u
      }), m = M, I = n[I], ["commit", "tree", "blob", "tag"].includes(I) ? a[D] = {
        type: I,
        offset: D
      } : I === "ofs-delta" ? a[D] = {
        type: I,
        offset: D
      } : I === "ref-delta" && (a[D] = {
        type: I,
        offset: D
      });
    });
    const g = Object.keys(a).map(Number);
    for (const [R, I] of g.entries()) {
      const T = R + 1 === g.length ? e.byteLength - 20 : g[R + 1], D = a[I], P = Xc.buf(e.slice(I, T)) >>> 0;
      D.end = T, D.crc = P;
    }
    const y = new Ir({
      pack: Promise.resolve(e),
      packfileSha: o,
      crcs: l,
      hashes: s,
      offsets: f,
      getExternalRefDelta: r
    });
    m = null;
    let E = 0;
    const A = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let R in a) {
      R = Number(R);
      const I = Math.floor(E * 100 / u);
      I !== m && i && await i({
        phase: "Resolving deltas",
        loaded: E,
        total: u
      }), E++, m = I;
      const T = a[R];
      if (!T.oid)
        try {
          y.readDepth = 0, y.externalReadDepth = 0;
          const { type: D, object: P } = await y.readSlice({ start: R });
          A[y.readDepth] += 1;
          const M = await Xt(Nr.wrap({ type: D, object: P }));
          T.oid = M, s.push(M), f.set(M, R), l[M] = T.crc;
        } catch {
          continue;
        }
    }
    return s.sort(), y;
  }
  async toBuffer() {
    const e = [], r = (f, u) => {
      e.push(fe.from(f, u));
    };
    r("ff744f63", "hex"), r("00000002", "hex");
    const i = new jt(fe.alloc(256 * 4));
    for (let f = 0; f < 256; f++) {
      let u = 0;
      for (const m of this.hashes)
        parseInt(m.slice(0, 2), 16) <= f && u++;
      i.writeUInt32BE(u);
    }
    e.push(i.buffer);
    for (const f of this.hashes)
      r(f, "hex");
    const n = new jt(fe.alloc(this.hashes.length * 4));
    for (const f of this.hashes)
      n.writeUInt32BE(this.crcs[f]);
    e.push(n.buffer);
    const a = new jt(fe.alloc(this.hashes.length * 4));
    for (const f of this.hashes)
      a.writeUInt32BE(this.offsets.get(f));
    e.push(a.buffer), r(this.packfileSha, "hex");
    const o = fe.concat(e), s = await Xt(o), l = fe.alloc(20);
    return l.write(s, "hex"), fe.concat([o, l]);
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
      throw new Te(\`Could not read object \${e} from packfile\`);
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
      throw new Te(
        "Tried to read from a GitPackIndex with no packfile loaded into memory"
      );
    const i = (await this.pack).slice(e), n = new jt(i), a = n.readUInt8(), o = a & 112;
    let s = r[o];
    if (s === void 0)
      throw new Te("Unrecognized type: 0b" + o.toString(2));
    const l = a & 15;
    let f = l;
    a & 128 && (f = Yl(n, l));
    let m = null, g = null;
    if (s === "ofs_delta") {
      const E = Xl(n), A = e - E;
      ({ object: m, type: s } = await this.readSlice({ start: A }));
    }
    if (s === "ref_delta") {
      const E = n.slice(20).toString("hex");
      ({ object: m, type: s } = await this.read({ oid: E }));
    }
    const y = i.slice(n.tell());
    if (g = fe.from(await ss(y)), g.byteLength !== f)
      throw new Te(
        \`Packfile told us object would have length \${f} but it had length \${g.byteLength}\`
      );
    return m && (g = fe.from(ql(g, m))), this.readDepth > 3 && (this.offsetCache[e] = { type: s, object: g }), { type: s, format: "content", object: g };
  }
}
const bi = Symbol("PackfileCache");
async function Kl({
  fs: t,
  filename: e,
  getExternalRefDelta: r,
  emitter: i,
  emitterPrefix: n
}) {
  const a = await t.read(e);
  return Ir.fromIdx({ idx: a, getExternalRefDelta: r });
}
function na({
  fs: t,
  cache: e,
  filename: r,
  getExternalRefDelta: i,
  emitter: n,
  emitterPrefix: a
}) {
  e[bi] || (e[bi] = /* @__PURE__ */ new Map());
  let o = e[bi].get(r);
  return o || (o = Kl({
    fs: t,
    filename: r,
    getExternalRefDelta: i,
    emitter: n,
    emitterPrefix: a
  }), e[bi].set(r, o)), o;
}
async function Jl({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  format: n = "content",
  getExternalRefDelta: a
}) {
  let o = await t.readdir(ee.join(r, "objects/pack"));
  o = o.filter((s) => s.endsWith(".idx"));
  for (const s of o) {
    const l = \`\${r}/objects/pack/\${s}\`, f = await na({
      fs: t,
      cache: e,
      filename: l,
      getExternalRefDelta: a
    });
    if (f.error) throw new Te(f.error);
    if (f.offsets.has(i)) {
      if (!f.pack) {
        const m = l.replace(/idx$/, "pack");
        f.pack = t.read(m);
      }
      const u = await f.read({ oid: i, getExternalRefDelta: a });
      return u.format = "content", u.source = \`objects/pack/\${s.replace(/idx$/, "pack")}\`, u;
    }
  }
  return null;
}
async function Je({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  format: n = "content"
}) {
  const a = (u) => Je({ fs: t, cache: e, gitdir: r, oid: u });
  let o;
  if (i === "4b825dc642cb6eb9a060e54bf8d69288fbee4904" && (o = { format: "wrapped", object: fe.from("tree 0\\0") }), o || (o = await ns({ fs: t, gitdir: r, oid: i })), !o) {
    if (o = await Jl({
      fs: t,
      cache: e,
      gitdir: r,
      oid: i,
      getExternalRefDelta: a
    }), !o)
      throw new Pe(i);
    return o;
  }
  if (n === "deflated" || (o.format === "deflated" && (o.object = fe.from(await ss(o.object)), o.format = "wrapped"), n === "wrapped"))
    return o;
  const s = await Xt(o.object);
  if (s !== i)
    throw new Te(
      \`SHA check failed! Expected \${i}, computed \${s}\`
    );
  const { object: l, type: f } = Nr.unwrap(o.object);
  if (o.type = f, o.object = l, o.format = "content", n === "content")
    return o;
  throw new Te(\`invalid requested format "\${n}"\`);
}
class Nt extends Ne {
  /**
   * @param {'note'|'remote'|'tag'|'branch'} noun
   * @param {string} where
   * @param {boolean} canForce
   */
  constructor(e, r, i = !0) {
    super(
      \`Failed to create \${e} at \${r} because it already exists.\${i ? \` (Hint: use 'force: true' parameter to overwrite existing \${e}.)\` : ""}\`
    ), this.code = this.name = Nt.code, this.data = { noun: e, where: r, canForce: i };
  }
}
Nt.code = "AlreadyExistsError";
class Qr extends Ne {
  /**
   * @param {'oids'|'refs'} nouns
   * @param {string} short
   * @param {string[]} matches
   */
  constructor(e, r, i) {
    super(
      \`Found multiple \${e} matching "\${r}" (\${i.join(
        ", "
      )}). Use a longer abbreviation length to disambiguate them.\`
    ), this.code = this.name = Qr.code, this.data = { nouns: e, short: r, matches: i };
  }
}
Qr.code = "AmbiguousError";
class ei extends Ne {
  /**
   * @param {string[]} filepaths
   */
  constructor(e) {
    super(
      \`Your local changes to the following files would be overwritten by checkout: \${e.join(
        ", "
      )}\`
    ), this.code = this.name = ei.code, this.data = { filepaths: e };
  }
}
ei.code = "CheckoutConflictError";
class ti extends Ne {
  /**
   * @param {string} ref
   * @param {string} oid
   */
  constructor(e, r) {
    super(
      \`Failed to checkout "\${e}" because commit \${r} is not available locally. Do a git fetch to make the branch available locally.\`
    ), this.code = this.name = ti.code, this.data = { ref: e, oid: r };
  }
}
ti.code = "CommitNotFetchedError";
class ri extends Ne {
  constructor() {
    super("Empty response from git server."), this.code = this.name = ri.code, this.data = {};
  }
}
ri.code = "EmptyServerResponseError";
class ii extends Ne {
  constructor() {
    super("A simple fast-forward merge was not possible."), this.code = this.name = ii.code, this.data = {};
  }
}
ii.code = "FastForwardError";
class ni extends Ne {
  /**
   * @param {string} prettyDetails
   * @param {PushResult} result
   */
  constructor(e, r) {
    super(\`One or more branches were not updated: \${e}\`), this.code = this.name = ni.code, this.data = { prettyDetails: e, result: r };
  }
}
ni.code = "GitPushError";
class Tr extends Ne {
  /**
   * @param {number} statusCode
   * @param {string} statusMessage
   * @param {string} response
   */
  constructor(e, r, i) {
    super(\`HTTP Error: \${e} \${r}\`), this.code = this.name = Tr.code, this.data = { statusCode: e, statusMessage: r, response: i };
  }
}
Tr.code = "HttpError";
class ir extends Ne {
  /**
   * @param {'leading-slash'|'trailing-slash'|'directory'} [reason]
   */
  constructor(e) {
    let r = "invalid filepath";
    e === "leading-slash" || e === "trailing-slash" ? r = '"filepath" parameter should not include leading or trailing directory separators because these can cause problems on some platforms.' : e === "directory" && (r = '"filepath" should not be a directory.'), super(r), this.code = this.name = ir.code, this.data = { reason: e };
  }
}
ir.code = "InvalidFilepathError";
class Ct extends Ne {
  /**
   * @param {string} ref
   * @param {string} suggestion
   * @param {boolean} canForce
   */
  constructor(e, r) {
    super(
      \`"\${e}" would be an invalid git reference. (Hint: a valid alternative would be "\${r}".)\`
    ), this.code = this.name = Ct.code, this.data = { ref: e, suggestion: r };
  }
}
Ct.code = "InvalidRefNameError";
class ai extends Ne {
  /**
   * @param {number} depth
   */
  constructor(e) {
    super(\`Maximum search depth of \${e} exceeded.\`), this.code = this.name = ai.code, this.data = { depth: e };
  }
}
ai.code = "MaxDepthError";
class Fr extends Ne {
  constructor() {
    super("Merges with conflicts are not supported yet."), this.code = this.name = Fr.code, this.data = {};
  }
}
Fr.code = "MergeNotSupportedError";
class Ur extends Ne {
  /**
   * @param {Array<string>} filepaths
   * @param {Array<string>} bothModified
   * @param {Array<string>} deleteByUs
   * @param {Array<string>} deleteByTheirs
   */
  constructor(e, r, i, n) {
    super(
      \`Automatic merge failed with one or more merge conflicts in the following files: \${e.toString()}. Fix conflicts then commit the result.\`
    ), this.code = this.name = Ur.code, this.data = { filepaths: e, bothModified: r, deleteByUs: i, deleteByTheirs: n };
  }
}
Ur.code = "MergeConflictError";
class ft extends Ne {
  /**
   * @param {'author'|'committer'|'tagger'} role
   */
  constructor(e) {
    super(
      \`No name was provided for \${e} in the argument or in the .git/config file.\`
    ), this.code = this.name = ft.code, this.data = { role: e };
  }
}
ft.code = "MissingNameError";
class yt extends Ne {
  /**
   * @param {string} parameter
   */
  constructor(e) {
    super(
      \`The function requires a "\${e}" parameter but none was provided.\`
    ), this.code = this.name = yt.code, this.data = { parameter: e };
  }
}
yt.code = "MissingParameterError";
class oi extends Ne {
  /**
   * @param {Error[]} errors
   * @param {string} message
   */
  constructor(e) {
    super(
      'There are multiple errors that were thrown by the method. Please refer to the "errors" property to see more'
    ), this.code = this.name = oi.code, this.data = { errors: e }, this.errors = e;
  }
}
oi.code = "MultipleGitError";
class gr extends Ne {
  /**
   * @param {string} expected
   * @param {string} actual
   */
  constructor(e, r) {
    super(\`Expected "\${e}" but received "\${r}".\`), this.code = this.name = gr.code, this.data = { expected: e, actual: r };
  }
}
gr.code = "ParseError";
class Rr extends Ne {
  /**
   * @param {'not-fast-forward'|'tag-exists'} reason
   */
  constructor(e) {
    let r = "";
    e === "not-fast-forward" ? r = " because it was not a simple fast-forward" : e === "tag-exists" && (r = " because tag already exists"), super(\`Push rejected\${r}. Use "force: true" to override.\`), this.code = this.name = Rr.code, this.data = { reason: e };
  }
}
Rr.code = "PushRejectedError";
class tr extends Ne {
  /**
   * @param {'shallow'|'deepen-since'|'deepen-not'|'deepen-relative'} capability
   * @param {'depth'|'since'|'exclude'|'relative'} parameter
   */
  constructor(e, r) {
    super(
      \`Remote does not support the "\${e}" so the "\${r}" parameter cannot be used.\`
    ), this.code = this.name = tr.code, this.data = { capability: e, parameter: r };
  }
}
tr.code = "RemoteCapabilityError";
class si extends Ne {
  /**
   * @param {string} preview
   * @param {string} response
   */
  constructor(e, r) {
    super(
      \`Remote did not reply using the "smart" HTTP protocol. Expected "001e# service=git-upload-pack" but received: \${e}\`
    ), this.code = this.name = si.code, this.data = { preview: e, response: r };
  }
}
si.code = "SmartHttpError";
class ci extends Ne {
  /**
   * @param {string} url
   * @param {string} transport
   * @param {string} [suggestion]
   */
  constructor(e, r, i) {
    super(
      \`Git remote "\${e}" uses an unrecognized transport protocol: "\${r}"\`
    ), this.code = this.name = ci.code, this.data = { url: e, transport: r, suggestion: i };
  }
}
ci.code = "UnknownTransportError";
class li extends Ne {
  /**
   * @param {string} url
   */
  constructor(e) {
    super(\`Cannot parse remote URL: "\${e}"\`), this.code = this.name = li.code, this.data = { url: e };
  }
}
li.code = "UrlParseError";
class Mr extends Ne {
  constructor() {
    super("The operation was canceled."), this.code = this.name = Mr.code, this.data = {};
  }
}
Mr.code = "UserCanceledError";
class ui extends Ne {
  /**
   * @param {Array<string>} filepaths
   */
  constructor(e) {
    super(
      \`Could not merge index: Entry for '\${e}' is not up to date. Either reset the index entry to HEAD, or stage your unstaged changes.\`
    ), this.code = this.name = ui.code, this.data = { filepath: e };
  }
}
ui.code = "IndexResetError";
class fi extends Ne {
  /**
   * @param {string} ref
   */
  constructor(e) {
    super(
      \`"\${e}" does not point to any commit. You're maybe working on a repository with no commits yet. \`
    ), this.code = this.name = fi.code, this.data = { ref: e };
  }
}
fi.code = "NoCommitError";
var Ql = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  AlreadyExistsError: Nt,
  AmbiguousError: Qr,
  CheckoutConflictError: ei,
  CommitNotFetchedError: ti,
  EmptyServerResponseError: ri,
  FastForwardError: ii,
  GitPushError: ni,
  HttpError: Tr,
  InternalError: Te,
  InvalidFilepathError: ir,
  InvalidOidError: rr,
  InvalidRefNameError: Ct,
  MaxDepthError: ai,
  MergeNotSupportedError: Fr,
  MergeConflictError: Ur,
  MissingNameError: ft,
  MissingParameterError: yt,
  MultipleGitError: oi,
  NoRefspecError: Jr,
  NotFoundError: Pe,
  ObjectTypeError: pt,
  ParseError: gr,
  PushRejectedError: Rr,
  RemoteCapabilityError: tr,
  SmartHttpError: si,
  UnknownTransportError: ci,
  UnsafeFilepathError: Or,
  UrlParseError: li,
  UserCanceledError: Mr,
  UnmergedPathsError: Kr,
  IndexResetError: ui,
  NoCommitError: fi
});
function Zn({ name: t, email: e, timestamp: r, timezoneOffset: i }) {
  return i = eu(i), \`\${t} <\${e}> \${r} \${i}\`;
}
function eu(t) {
  const e = tu(ru(t));
  t = Math.abs(t);
  const r = Math.floor(t / 60);
  t -= r * 60;
  let i = String(r), n = String(t);
  return i.length < 2 && (i = "0" + i), n.length < 2 && (n = "0" + n), (e === -1 ? "-" : "+") + i + n;
}
function tu(t) {
  return Math.sign(t) || (Object.is(t, -0) ? -1 : 1);
}
function ru(t) {
  return t === 0 ? t : -t;
}
function Gt(t) {
  return t = t.replace(/\\r/g, ""), t = t.replace(/^\\n+/, ""), t = t.replace(/\\n+$/, "") + \`
\`, t;
}
function Ri(t) {
  const [, e, r, i, n] = t.match(
    /^(.*) <(.*)> (.*) (.*)$/
  );
  return {
    name: e,
    email: r,
    timestamp: Number(i),
    timezoneOffset: iu(n)
  };
}
function iu(t) {
  let [, e, r, i] = t.match(/(\\+|-)(\\d\\d)(\\d\\d)/);
  return i = (e === "+" ? 1 : -1) * (Number(r) * 60 + Number(i)), nu(i);
}
function nu(t) {
  return t === 0 ? t : -t;
}
class wt {
  constructor(e) {
    if (typeof e == "string")
      this._tag = e;
    else if (fe.isBuffer(e))
      this._tag = e.toString("utf8");
    else if (typeof e == "object")
      this._tag = wt.render(e);
    else
      throw new Te(
        "invalid type passed to GitAnnotatedTag constructor"
      );
  }
  static from(e) {
    return new wt(e);
  }
  static render(e) {
    return \`object \${e.object}
type \${e.type}
tag \${e.tag}
tagger \${Zn(e.tagger)}

\${e.message}
\${e.gpgsig ? e.gpgsig : ""}\`;
  }
  justHeaders() {
    return this._tag.slice(0, this._tag.indexOf(\`

\`));
  }
  message() {
    const e = this.withoutSignature();
    return e.slice(e.indexOf(\`

\`) + 2);
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
    const e = this.justHeaders().split(\`
\`), r = [];
    for (const n of e)
      n[0] === " " ? r[r.length - 1] += \`
\` + n.slice(1) : r.push(n);
    const i = {};
    for (const n of r) {
      const a = n.slice(0, n.indexOf(" ")), o = n.slice(n.indexOf(" ") + 1);
      Array.isArray(i[a]) ? i[a].push(o) : i[a] = o;
    }
    return i.tagger && (i.tagger = Ri(i.tagger)), i.committer && (i.committer = Ri(i.committer)), i;
  }
  withoutSignature() {
    const e = Gt(this._tag);
    return e.indexOf(\`
-----BEGIN PGP SIGNATURE-----\`) === -1 ? e : e.slice(0, e.lastIndexOf(\`
-----BEGIN PGP SIGNATURE-----\`));
  }
  gpgsig() {
    if (this._tag.indexOf(\`
-----BEGIN PGP SIGNATURE-----\`) === -1) return;
    const e = this._tag.slice(
      this._tag.indexOf("-----BEGIN PGP SIGNATURE-----"),
      this._tag.indexOf("-----END PGP SIGNATURE-----") + 27
    );
    return Gt(e);
  }
  payload() {
    return this.withoutSignature() + \`
\`;
  }
  toObject() {
    return fe.from(this._tag, "utf8");
  }
  static async sign(e, r, i) {
    const n = e.payload();
    let { signature: a } = await r({ payload: n, secretKey: i });
    a = Gt(a);
    const o = n + a;
    return wt.from(o);
  }
}
function bn(t) {
  return t.trim().split(\`
\`).map((e) => " " + e).join(\`
\`) + \`
\`;
}
function au(t) {
  return t.split(\`
\`).map((e) => e.replace(/^ /, "")).join(\`
\`);
}
class Ye {
  constructor(e) {
    if (typeof e == "string")
      this._commit = e;
    else if (fe.isBuffer(e))
      this._commit = e.toString("utf8");
    else if (typeof e == "object")
      this._commit = Ye.render(e);
    else
      throw new Te("invalid type passed to GitCommit constructor");
  }
  static fromPayloadSignature({ payload: e, signature: r }) {
    const i = Ye.justHeaders(e), n = Ye.justMessage(e), a = Gt(
      i + \`
gpgsig\` + bn(r) + \`
\` + n
    );
    return new Ye(a);
  }
  static from(e) {
    return new Ye(e);
  }
  toObject() {
    return fe.from(this._commit, "utf8");
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
    return Gt(e.slice(e.indexOf(\`

\`) + 2));
  }
  static justHeaders(e) {
    return e.slice(0, e.indexOf(\`

\`));
  }
  parseHeaders() {
    const e = Ye.justHeaders(this._commit).split(\`
\`), r = [];
    for (const n of e)
      n[0] === " " ? r[r.length - 1] += \`
\` + n.slice(1) : r.push(n);
    const i = {
      parent: []
    };
    for (const n of r) {
      const a = n.slice(0, n.indexOf(" ")), o = n.slice(n.indexOf(" ") + 1);
      Array.isArray(i[a]) ? i[a].push(o) : i[a] = o;
    }
    return i.author && (i.author = Ri(i.author)), i.committer && (i.committer = Ri(i.committer)), i;
  }
  static renderHeaders(e) {
    let r = "";
    if (e.tree ? r += \`tree \${e.tree}
\` : r += \`tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
\`, e.parent) {
      if (e.parent.length === void 0)
        throw new Te("commit 'parent' property should be an array");
      for (const a of e.parent)
        r += \`parent \${a}
\`;
    }
    const i = e.author;
    r += \`author \${Zn(i)}
\`;
    const n = e.committer || e.author;
    return r += \`committer \${Zn(n)}
\`, e.gpgsig && (r += "gpgsig" + bn(e.gpgsig)), r;
  }
  static render(e) {
    return Ye.renderHeaders(e) + \`
\` + Gt(e.message);
  }
  render() {
    return this._commit;
  }
  withoutSignature() {
    const e = Gt(this._commit);
    if (e.indexOf(\`
gpgsig\`) === -1) return e;
    const r = e.slice(0, e.indexOf(\`
gpgsig\`)), i = e.slice(
      e.indexOf(\`-----END PGP SIGNATURE-----
\`) + 28
    );
    return Gt(r + \`
\` + i);
  }
  isolateSignature() {
    const e = this._commit.slice(
      this._commit.indexOf("-----BEGIN PGP SIGNATURE-----"),
      this._commit.indexOf("-----END PGP SIGNATURE-----") + 27
    );
    return au(e);
  }
  static async sign(e, r, i) {
    const n = e.withoutSignature(), a = Ye.justMessage(e._commit);
    let { signature: o } = await r({ payload: n, secretKey: i });
    o = Gt(o);
    const l = Ye.justHeaders(e._commit) + \`
gpgsig\` + bn(o) + \`
\` + a;
    return Ye.from(l);
  }
}
async function Br({ fs: t, cache: e, gitdir: r, oid: i }) {
  if (i === "4b825dc642cb6eb9a060e54bf8d69288fbee4904")
    return { tree: _t.from([]), oid: i };
  const { type: n, object: a } = await Je({ fs: t, cache: e, gitdir: r, oid: i });
  if (n === "tag")
    return i = wt.from(a).parse().object, Br({ fs: t, cache: e, gitdir: r, oid: i });
  if (n === "commit")
    return i = Ye.from(a).parse().tree, Br({ fs: t, cache: e, gitdir: r, oid: i });
  if (n !== "tree")
    throw new pt(i, n, "tree");
  return { tree: _t.from(a), oid: i };
}
class ou {
  constructor({ fs: e, gitdir: r, ref: i, cache: n }) {
    this.fs = e, this.cache = n, this.gitdir = r, this.mapPromise = (async () => {
      const o = /* @__PURE__ */ new Map();
      let s;
      try {
        s = await ae.resolve({ fs: e, gitdir: r, ref: i });
      } catch (f) {
        f instanceof Pe && (s = "4b825dc642cb6eb9a060e54bf8d69288fbee4904");
      }
      const l = await Br({ fs: e, cache: this.cache, gitdir: r, oid: s });
      return l.type = "tree", l.mode = "40000", o.set(".", l), o;
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
    const r = e._fullpath, { fs: i, cache: n, gitdir: a } = this, o = await this.mapPromise, s = o.get(r);
    if (!s) throw new Error(\`No obj for \${r}\`);
    const l = s.oid;
    if (!l) throw new Error(\`No oid for obj \${JSON.stringify(s)}\`);
    if (s.type !== "tree")
      return null;
    const { type: f, object: u } = await Je({ fs: i, cache: n, gitdir: a, oid: l });
    if (f !== s.type)
      throw new pt(l, f, s.type);
    const m = _t.from(u);
    for (const g of m)
      o.set(ee.join(r, g.path), g);
    return m.entries().map((g) => ee.join(r, g.path));
  }
  async type(e) {
    if (e._type === !1) {
      const r = await this.mapPromise, { type: i } = r.get(e._fullpath);
      e._type = i;
    }
    return e._type;
  }
  async mode(e) {
    if (e._mode === !1) {
      const r = await this.mapPromise, { mode: i } = r.get(e._fullpath);
      e._mode = es(parseInt(i, 8));
    }
    return e._mode;
  }
  async stat(e) {
  }
  async content(e) {
    if (e._content === !1) {
      const r = await this.mapPromise, { fs: i, cache: n, gitdir: a } = this, s = r.get(e._fullpath).oid, { type: l, object: f } = await Je({ fs: i, cache: n, gitdir: a, oid: s });
      l !== "blob" ? e._content = void 0 : e._content = new Uint8Array(f);
    }
    return e._content;
  }
  async oid(e) {
    if (e._oid === !1) {
      const i = (await this.mapPromise).get(e._fullpath);
      e._oid = i.oid;
    }
    return e._oid;
  }
}
function Bt({ ref: t = "HEAD" } = {}) {
  const e = /* @__PURE__ */ Object.create(null);
  return Object.defineProperty(e, Fi, {
    value: function({ fs: r, gitdir: i, cache: n }) {
      return new ou({ fs: r, gitdir: i, ref: t, cache: n });
    }
  }), Object.freeze(e), e;
}
class su {
  constructor({ fs: e, dir: r, gitdir: i, cache: n }) {
    this.fs = e, this.cache = n, this.dir = r, this.gitdir = i, this.config = null;
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
    const r = e._fullpath, { fs: i, dir: n } = this, a = await i.readdir(ee.join(n, r));
    return a === null ? null : a.map((o) => ee.join(r, o));
  }
  async type(e) {
    return e._type === !1 && await e.stat(), e._type;
  }
  async mode(e) {
    return e._mode === !1 && await e.stat(), e._mode;
  }
  async stat(e) {
    if (e._stat === !1) {
      const { fs: r, dir: i } = this;
      let n = await r.lstat(\`\${i}/\${e._fullpath}\`);
      if (!n)
        throw new Error(
          \`ENOENT: no such file or directory, lstat '\${e._fullpath}'\`
        );
      let a = n.isDirectory() ? "tree" : "blob";
      a === "blob" && !n.isFile() && !n.isSymbolicLink() && (a = "special"), e._type = a, n = xr(n), e._mode = n.mode, n.size === -1 && e._actualSize && (n.size = e._actualSize), e._stat = n;
    }
    return e._stat;
  }
  async content(e) {
    if (e._content === !1) {
      const { fs: r, dir: i, gitdir: n } = this;
      if (await e.type() === "tree")
        e._content = void 0;
      else {
        const o = await (await this._getGitConfig(r, n)).get("core.autocrlf"), s = await r.read(\`\${i}/\${e._fullpath}\`, { autocrlf: o });
        e._actualSize = s.length, e._stat && e._stat.size === -1 && (e._stat.size = e._actualSize), e._content = new Uint8Array(s);
      }
    }
    return e._content;
  }
  async oid(e) {
    if (e._oid === !1) {
      const r = this, { fs: i, gitdir: n, cache: a } = this;
      let o;
      await at.acquire({ fs: i, gitdir: n, cache: a }, async function(s) {
        const l = s.entriesMap.get(e._fullpath), f = await e.stat(), m = await (await r._getGitConfig(i, n)).get("core.filemode"), g = typeof gt < "u" ? gt.platform !== "win32" : !0;
        if (!l || xi(f, l, m, g)) {
          const y = await e.content();
          y === void 0 ? o = void 0 : (o = await Xt(
            Nr.wrap({ type: "blob", object: y })
          ), l && o === l.oid && (!m || f.mode === l.mode) && xi(f, l, m, g) && s.insert({
            filepath: e._fullpath,
            stats: f,
            oid: o
          }));
        } else
          o = l.oid;
      }), e._oid = o;
    }
    return e._oid;
  }
  async _getGitConfig(e, r) {
    return this.config ? this.config : (this.config = await rt.get({ fs: e, gitdir: r }), this.config);
  }
}
function hi() {
  const t = /* @__PURE__ */ Object.create(null);
  return Object.defineProperty(t, Fi, {
    value: function({ fs: e, dir: r, gitdir: i, cache: n }) {
      return new su({ fs: e, dir: r, gitdir: i, cache: n });
    }
  }), Object.freeze(t), t;
}
function cu(t, e) {
  const r = e - t;
  return Array.from({ length: r }, (i, n) => t + n);
}
const cs = typeof Array.prototype.flat > "u" ? (t) => t.reduce((e, r) => e.concat(r), []) : (t) => t.flat();
class lu {
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
function* uu(t) {
  const e = new lu();
  let r;
  const i = [], n = t.length;
  for (let a = 0; a < n; a++)
    i[a] = t[a].next().value, i[a] !== void 0 && e.consider(i[a]);
  if (e.value !== null)
    for (; ; ) {
      const a = [];
      r = e.value, e.reset();
      for (let o = 0; o < n; o++)
        i[o] !== void 0 && i[o] === r ? (a[o] = i[o], i[o] = t[o].next().value) : a[o] = null, i[o] !== void 0 && e.consider(i[o]);
      if (yield a, e.value === null) return;
    }
}
async function nr({
  fs: t,
  cache: e,
  dir: r,
  gitdir: i,
  trees: n,
  // @ts-ignore
  map: a = async (l, f) => f,
  // The default reducer is a flatmap that filters out undefineds.
  reduce: o = async (l, f) => {
    const u = cs(f);
    return l !== void 0 && u.unshift(l), u;
  },
  // The default iterate function walks all children concurrently
  iterate: s = (l, f) => Promise.all([...f].map(l))
}) {
  const l = n.map(
    (y) => y[Fi]({ fs: t, dir: r, gitdir: i, cache: e })
  ), f = new Array(l.length).fill("."), u = cu(0, l.length), m = async (y) => {
    u.map((R) => {
      const I = y[R];
      y[R] = I && new l[R].ConstructEntry(I);
    });
    const A = (await Promise.all(
      u.map((R) => {
        const I = y[R];
        return I ? l[R].readdir(I) : [];
      })
    )).map((R) => (R === null ? [] : R)[Symbol.iterator]());
    return {
      entries: y,
      children: uu(A)
    };
  }, g = async (y) => {
    const { entries: E, children: A } = await m(y), R = E.find((T) => T && T._fullpath)._fullpath, I = await a(R, E);
    if (I !== null) {
      let T = await s(g, A);
      return T = T.filter((D) => D !== void 0), o(I, T);
    }
  };
  return g(f);
}
async function Vn(t, e) {
  const r = await t.readdir(e);
  r == null ? await t.rm(e) : r.length ? await Promise.all(
    r.map((i) => {
      const n = ee.join(e, i);
      return t.lstat(n).then((a) => {
        if (a)
          return a.isDirectory() ? Vn(t, n) : t.rm(n);
      });
    })
  ).then(() => t.rmdir(e)) : await t.rmdir(e);
}
function fu(t) {
  return hu(t) && no(t.then) && no(t.catch);
}
function hu(t) {
  return t && typeof t == "object";
}
function no(t) {
  return typeof t == "function";
}
function ao(t) {
  return fu(((r) => {
    try {
      return r.readFile().catch((i) => i);
    } catch (i) {
      return i;
    }
  })(t));
}
const oo = [
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
function so(t, e) {
  if (ao(e))
    for (const r of oo)
      t[\`_\${r}\`] = e[r].bind(e);
  else
    for (const r of oo)
      t[\`_\${r}\`] = fn(e[r].bind(e));
  ao(e) ? e.rm ? t._rm = e.rm.bind(e) : e.rmdir.length > 1 ? t._rm = e.rmdir.bind(e) : t._rm = Vn.bind(null, t) : e.rm ? t._rm = fn(e.rm.bind(e)) : e.rmdir.length > 2 ? t._rm = fn(e.rmdir.bind(e)) : t._rm = Vn.bind(null, t);
}
class me {
  constructor(e) {
    if (typeof e._original_unwrapped_fs < "u") return e;
    const r = Object.getOwnPropertyDescriptor(e, "promises");
    r && r.enumerable ? so(this, e.promises) : so(this, e), this._original_unwrapped_fs = e;
  }
  /**
   * Return true if a file exists, false if it doesn't exist.
   * Rethrows errors that aren't related to file existence.
   */
  async exists(e, r = {}) {
    try {
      return await this._stat(e), !0;
    } catch (i) {
      if (i.code === "ENOENT" || i.code === "ENOTDIR" || (i.code || "").includes("ENS"))
        return !1;
      throw console.log('Unhandled error in "FileSystem.exists()" function', i), i;
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
      let i = await this._readFile(e, r);
      if (r.autocrlf === "true")
        try {
          i = new TextDecoder("utf8", { fatal: !0 }).decode(i), i = i.replace(/\\r\\n/g, \`
\`), i = new TextEncoder().encode(i);
        } catch {
        }
      return typeof i != "string" && (i = fe.from(i)), i;
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
  async write(e, r, i = {}) {
    try {
      await this._writeFile(e, r, i);
      return;
    } catch {
      await this.mkdir(Sr(e)), await this._writeFile(e, r, i);
    }
  }
  /**
   * Make a directory (or series of nested directories) without throwing an error if it already exists.
   */
  async mkdir(e, r = !1) {
    try {
      await this._mkdir(e);
      return;
    } catch (i) {
      if (i === null || i.code === "EEXIST") return;
      if (r) throw i;
      if (i.code === "ENOENT") {
        const n = Sr(e);
        if (n === "." || n === "/" || n === e) throw i;
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
    } catch (i) {
      if (i.code !== "ENOENT") throw i;
    }
  }
  /**
   * Read a directory without throwing an error is the directory doesn't exist
   */
  async readdir(e) {
    try {
      const r = await this._readdir(e);
      return r.sort(Ni), r;
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
      r.map(async (n) => {
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
      const i = await this._readlink(e, r);
      return fe.isBuffer(i) ? i : fe.from(i);
    } catch (i) {
      if (i.code === "ENOENT" || (i.code || "").includes("ENS"))
        return null;
      throw i;
    }
  }
  /**
   * Write the contents of buffer to a symlink.
   */
  async writelink(e, r) {
    return this._symlink(r.toString("utf8"), e);
  }
}
function H(t, e) {
  if (e === void 0)
    throw new yt(t);
}
async function Bi(t, e) {
  return !t && !e ? !1 : t && !e || !t && e ? !0 : !(await t.type() === "tree" && await e.type() === "tree" || await t.type() === await e.type() && await t.mode() === await e.mode() && await t.oid() === await e.oid());
}
async function du({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  commit: i = "HEAD",
  cache: n = {}
}) {
  try {
    H("fs", t), H("dir", e), H("gitdir", r);
    const a = new me(t), o = [Bt({ ref: i }), hi(), Cr()];
    let s = [];
    await at.acquire({ fs: a, gitdir: r, cache: n }, async function(f) {
      s = f.unmergedPaths;
    });
    const l = await nr({
      fs: a,
      cache: n,
      dir: e,
      gitdir: r,
      trees: o,
      map: async function(f, [u, m, g]) {
        const y = !await Bi(m, g), E = s.includes(f), A = !await Bi(g, u);
        if (y || E)
          return u ? {
            path: f,
            mode: await u.mode(),
            oid: await u.oid(),
            type: await u.type(),
            content: await u.content()
          } : void 0;
        if (A) return !1;
        throw new ui(f);
      }
    });
    await at.acquire({ fs: a, gitdir: r, cache: n }, async function(f) {
      for (const u of l)
        if (u !== !1) {
          if (!u) {
            await a.rmdir(\`\${e}/\${u.path}\`, { recursive: !0 }), f.delete({ filepath: u.path });
            continue;
          }
          if (u.type === "blob") {
            const m = new TextDecoder().decode(u.content);
            await a.write(\`\${e}/\${u.path}\`, m, { mode: u.mode }), f.insert({
              filepath: u.path,
              oid: u.oid,
              stage: 0
            });
          }
        }
    });
  } catch (a) {
    throw a.caller = "git.abortMerge", a;
  }
}
class Lr {
  static async isIgnored({ fs: e, dir: r, gitdir: i = ee.join(r, ".git"), filepath: n }) {
    if (Si(n) === ".git") return !0;
    if (n === ".") return !1;
    let a = "";
    const o = ee.join(i, "info", "exclude");
    await e.exists(o) && (a = await e.read(o, "utf8"));
    const s = [
      {
        gitignore: ee.join(r, ".gitignore"),
        filepath: n
      }
    ], l = n.split("/").filter(Boolean);
    for (let u = 1; u < l.length; u++) {
      const m = l.slice(0, u).join("/"), g = l.slice(u).join("/");
      s.push({
        gitignore: ee.join(r, m, ".gitignore"),
        filepath: g
      });
    }
    let f = !1;
    for (const u of s) {
      let m;
      try {
        m = await e.read(u.gitignore, "utf8");
      } catch (E) {
        if (E.code === "NOENT") continue;
      }
      const g = ul().add(a);
      g.add(m);
      const y = Sr(u.filepath);
      if (y !== "." && g.ignores(y)) return !0;
      f ? f = !g.test(u.filepath).unignored : f = g.test(u.filepath).ignored;
    }
    return f;
  }
}
async function wu({ fs: t, gitdir: e, object: r, format: i, oid: n }) {
  const a = \`objects/\${n.slice(0, 2)}/\${n.slice(2)}\`, o = \`\${e}/\${a}\`;
  await t.exists(o) || await t.write(o, r);
}
let vn = null;
async function ls(t) {
  return vn === null && (vn = mu()), vn ? pu(t) : ta.deflate(t);
}
async function pu(t) {
  const e = new CompressionStream("deflate"), r = new Blob([t]).stream().pipeThrough(e);
  return new Uint8Array(await new Response(r).arrayBuffer());
}
function mu() {
  try {
    return new CompressionStream("deflate").writable.close(), new Blob([]).stream().cancel(), !0;
  } catch {
    return !1;
  }
}
async function bt({
  fs: t,
  gitdir: e,
  type: r,
  object: i,
  format: n = "content",
  oid: a = void 0,
  dryRun: o = !1
}) {
  return n !== "deflated" && (n !== "wrapped" && (i = Nr.wrap({ type: r, object: i })), a = await Xt(i), i = fe.from(await ls(i))), o || await wu({ fs: t, gitdir: e, object: i, format: "deflated", oid: a }), a;
}
function us(t) {
  let e;
  for (; ~(e = t.indexOf(92)); ) t[e] = 47;
  return t;
}
async function gu({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  filepath: i,
  cache: n = {},
  force: a = !1,
  parallel: o = !0
}) {
  try {
    H("fs", t), H("dir", e), H("gitdir", r), H("filepath", i);
    const s = new me(t);
    await at.acquire({ fs: s, gitdir: r, cache: n }, async (l) => {
      const u = await (await rt.get({ fs: s, gitdir: r })).get("core.autocrlf");
      return Xn({
        dir: e,
        gitdir: r,
        fs: s,
        filepath: i,
        index: l,
        force: a,
        parallel: o,
        autocrlf: u
      });
    });
  } catch (s) {
    throw s.caller = "git.add", s;
  }
}
async function Xn({
  dir: t,
  gitdir: e,
  fs: r,
  filepath: i,
  index: n,
  force: a,
  parallel: o,
  autocrlf: s
}) {
  i = Array.isArray(i) ? i : [i];
  const l = i.map(async (g) => {
    if (!a && await Lr.isIgnored({
      fs: r,
      dir: t,
      gitdir: e,
      filepath: g
    }))
      return;
    const y = await r.lstat(ee.join(t, g));
    if (!y) throw new Pe(g);
    if (y.isDirectory()) {
      const E = await r.readdir(ee.join(t, g));
      if (o) {
        const A = E.map(
          (R) => Xn({
            dir: t,
            gitdir: e,
            fs: r,
            filepath: [ee.join(g, R)],
            index: n,
            force: a,
            parallel: o,
            autocrlf: s
          })
        );
        await Promise.all(A);
      } else
        for (const A of E)
          await Xn({
            dir: t,
            gitdir: e,
            fs: r,
            filepath: [ee.join(g, A)],
            index: n,
            force: a,
            parallel: o,
            autocrlf: s
          });
    } else {
      const E = y.isSymbolicLink() ? await r.readlink(ee.join(t, g)).then(us) : await r.read(ee.join(t, g), { autocrlf: s });
      if (E === null) throw new Pe(g);
      const A = await bt({ fs: r, gitdir: e, type: "blob", object: E });
      n.insert({ filepath: g, stats: y, oid: A });
    }
  }), f = await Promise.allSettled(l), u = f.filter((g) => g.status === "rejected").map((g) => g.reason);
  if (u.length > 1)
    throw new oi(u);
  if (u.length === 1)
    throw u[0];
  return f.filter((g) => g.status === "fulfilled" && g.value).map((g) => g.value);
}
async function Vr({ fs: t, gitdir: e, path: r }) {
  return (await rt.get({ fs: t, gitdir: e })).get(r);
}
function fs(t, ...e) {
  for (const r of e)
    if (r)
      for (const i of Object.keys(r)) {
        const n = r[i];
        n !== void 0 && (t[i] = n);
      }
  return t;
}
async function ar({ fs: t, gitdir: e, author: r, commit: i }) {
  const n = Math.floor(Date.now() / 1e3), a = {
    name: await Vr({ fs: t, gitdir: e, path: "user.name" }),
    email: await Vr({ fs: t, gitdir: e, path: "user.email" }) || "",
    // author.email is allowed to be empty string
    timestamp: n,
    timezoneOffset: new Date(n * 1e3).getTimezoneOffset()
  }, o = fs(
    {},
    a,
    i ? i.author : void 0,
    r
  );
  if (o.name !== void 0)
    return o;
}
async function $r({
  fs: t,
  gitdir: e,
  author: r,
  committer: i,
  commit: n
}) {
  const a = Math.floor(Date.now() / 1e3), o = {
    name: await Vr({ fs: t, gitdir: e, path: "user.name" }),
    email: await Vr({ fs: t, gitdir: e, path: "user.email" }) || "",
    // committer.email is allowed to be empty string
    timestamp: a,
    timezoneOffset: new Date(a * 1e3).getTimezoneOffset()
  }, s = fs(
    {},
    o,
    n ? n.committer : void 0,
    r,
    i
  );
  if (s.name !== void 0)
    return s;
}
async function hs({ fs: t, cache: e, gitdir: r, oid: i }) {
  const { type: n, object: a } = await Je({ fs: t, cache: e, gitdir: r, oid: i });
  if (n === "tag")
    return i = wt.from(a).parse().object, hs({ fs: t, cache: e, gitdir: r, oid: i });
  if (n !== "commit")
    throw new pt(i, n, "commit");
  return { commit: Ye.from(a), oid: i };
}
async function Ar({ fs: t, cache: e, gitdir: r, oid: i }) {
  const { commit: n, oid: a } = await hs({
    fs: t,
    cache: e,
    gitdir: r,
    oid: i
  });
  return {
    oid: a,
    commit: n.parse(),
    payload: n.withoutSignature()
  };
}
async function Ui({
  fs: t,
  cache: e,
  onSign: r,
  gitdir: i,
  message: n,
  author: a,
  committer: o,
  signingKey: s,
  amend: l = !1,
  dryRun: f = !1,
  noUpdateBranch: u = !1,
  ref: m,
  parent: g,
  tree: y
}) {
  let E = !1;
  m || (m = await ae.resolve({
    fs: t,
    gitdir: i,
    ref: "HEAD",
    depth: 2
  }));
  let A, R;
  try {
    A = await ae.resolve({
      fs: t,
      gitdir: i,
      ref: m
    }), R = await Ar({ fs: t, gitdir: i, oid: A, cache: {} });
  } catch {
    E = !0;
  }
  if (l && E)
    throw new fi(m);
  const I = l ? await ar({
    fs: t,
    gitdir: i,
    author: a,
    commit: R.commit
  }) : await ar({ fs: t, gitdir: i, author: a });
  if (!I) throw new ft("author");
  const T = l ? await $r({
    fs: t,
    gitdir: i,
    author: I,
    committer: o,
    commit: R.commit
  }) : await $r({
    fs: t,
    gitdir: i,
    author: I,
    committer: o
  });
  if (!T) throw new ft("committer");
  return at.acquire(
    { fs: t, gitdir: i, cache: e, allowUnmerged: !1 },
    async function(D) {
      const M = rs(D.entries).get(".");
      if (y || (y = await ds({ fs: t, gitdir: i, inode: M, dryRun: f })), g ? g = await Promise.all(
        g.map((O) => ae.resolve({ fs: t, gitdir: i, ref: O }))
      ) : l ? g = R.commit.parent : g = A ? [A] : [], !n)
        if (l)
          n = R.commit.message;
        else
          throw new yt("message");
      let U = Ye.from({
        tree: y,
        parent: g,
        author: I,
        committer: T,
        message: n
      });
      s && (U = await Ye.sign(U, r, s));
      const $ = await bt({
        fs: t,
        gitdir: i,
        type: "commit",
        object: U.toObject(),
        dryRun: f
      });
      return !u && !f && await ae.writeRef({
        fs: t,
        gitdir: i,
        ref: m,
        value: $
      }), $;
    }
  );
}
async function ds({ fs: t, gitdir: e, inode: r, dryRun: i }) {
  const n = r.children;
  for (const l of n)
    l.type === "tree" && (l.metadata.mode = "040000", l.metadata.oid = await ds({ fs: t, gitdir: e, inode: l, dryRun: i }));
  const a = n.map((l) => ({
    mode: l.metadata.mode,
    path: l.basename,
    oid: l.metadata.oid,
    type: l.type
  })), o = _t.from(a);
  return await bt({
    fs: t,
    gitdir: e,
    type: "tree",
    object: o.toObject(),
    dryRun: i
  });
}
async function di({ fs: t, cache: e, gitdir: r, oid: i, filepath: n }) {
  if (n.startsWith("/"))
    throw new ir("leading-slash");
  if (n.endsWith("/"))
    throw new ir("trailing-slash");
  const a = i, o = await Br({ fs: t, cache: e, gitdir: r, oid: i }), s = o.tree;
  if (n === "")
    i = o.oid;
  else {
    const l = n.split("/");
    i = await ws({
      fs: t,
      cache: e,
      gitdir: r,
      tree: s,
      pathArray: l,
      oid: a,
      filepath: n
    });
  }
  return i;
}
async function ws({
  fs: t,
  cache: e,
  gitdir: r,
  tree: i,
  pathArray: n,
  oid: a,
  filepath: o
}) {
  const s = n.shift();
  for (const l of i)
    if (l.path === s) {
      if (n.length === 0)
        return l.oid;
      {
        const { type: f, object: u } = await Je({
          fs: t,
          cache: e,
          gitdir: r,
          oid: l.oid
        });
        if (f !== "tree")
          throw new pt(a, f, "tree", o);
        return i = _t.from(u), ws({
          fs: t,
          cache: e,
          gitdir: r,
          tree: i,
          pathArray: n,
          oid: a,
          filepath: o
        });
      }
    }
  throw new Pe(\`file or directory found at "\${a}:\${o}"\`);
}
async function Pr({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  filepath: n = void 0
}) {
  n !== void 0 && (i = await di({ fs: t, cache: e, gitdir: r, oid: i, filepath: n }));
  const { tree: a, oid: o } = await Br({ fs: t, cache: e, gitdir: r, oid: i });
  return {
    oid: o,
    tree: a.entries()
  };
}
async function wi({ fs: t, gitdir: e, tree: r }) {
  const i = _t.from(r).toObject();
  return await bt({
    fs: t,
    gitdir: e,
    type: "tree",
    object: i,
    format: "content"
  });
}
async function yu({
  fs: t,
  cache: e,
  onSign: r,
  gitdir: i,
  ref: n,
  oid: a,
  note: o,
  force: s,
  author: l,
  committer: f,
  signingKey: u
}) {
  let m;
  try {
    m = await ae.resolve({ gitdir: i, fs: t, ref: n });
  } catch (I) {
    if (!(I instanceof Pe))
      throw I;
  }
  let y = (await Pr({
    fs: t,
    cache: e,
    gitdir: i,
    oid: m || "4b825dc642cb6eb9a060e54bf8d69288fbee4904"
  })).tree;
  if (s)
    y = y.filter((I) => I.path !== a);
  else
    for (const I of y)
      if (I.path === a)
        throw new Nt("note", a);
  typeof o == "string" && (o = fe.from(o, "utf8"));
  const E = await bt({
    fs: t,
    gitdir: i,
    type: "blob",
    object: o,
    format: "content"
  });
  y.push({ mode: "100644", path: a, oid: E, type: "blob" });
  const A = await wi({
    fs: t,
    gitdir: i,
    tree: y
  });
  return await Ui({
    fs: t,
    cache: e,
    onSign: r,
    gitdir: i,
    ref: n,
    tree: A,
    parent: m && [m],
    message: \`Note added by 'isomorphic-git addNote'
\`,
    author: l,
    committer: f,
    signingKey: u
  });
}
async function _u({
  fs: t,
  onSign: e,
  dir: r,
  gitdir: i = ee.join(r, ".git"),
  ref: n = "refs/notes/commits",
  oid: a,
  note: o,
  force: s,
  author: l,
  committer: f,
  signingKey: u,
  cache: m = {}
}) {
  try {
    H("fs", t), H("gitdir", i), H("oid", a), H("note", o), u && H("onSign", e);
    const g = new me(t), y = await ar({ fs: g, gitdir: i, author: l });
    if (!y) throw new ft("author");
    const E = await $r({
      fs: g,
      gitdir: i,
      author: y,
      committer: f
    });
    if (!E) throw new ft("committer");
    return await yu({
      fs: new me(g),
      cache: m,
      onSign: e,
      gitdir: i,
      ref: n,
      oid: a,
      note: o,
      force: s,
      author: y,
      committer: E,
      signingKey: u
    });
  } catch (g) {
    throw g.caller = "git.addNote", g;
  }
}
async function ps({ fs: t, gitdir: e, remote: r, url: i, force: n }) {
  if (r !== zt.clean(r))
    throw new Ct(r, zt.clean(r));
  const a = await rt.get({ fs: t, gitdir: e });
  if (!n && (await a.getSubsections("remote")).includes(r) && i !== await a.get(\`remote.\${r}.url\`))
    throw new Nt("remote", r);
  await a.set(\`remote.\${r}.url\`, i), await a.set(
    \`remote.\${r}.fetch\`,
    \`+refs/heads/*:refs/remotes/\${r}/*\`
  ), await rt.save({ fs: t, gitdir: e, config: a });
}
async function bu({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  remote: i,
  url: n,
  force: a = !1
}) {
  try {
    return H("fs", t), H("gitdir", r), H("remote", i), H("url", n), await ps({
      fs: new me(t),
      gitdir: r,
      remote: i,
      url: n,
      force: a
    });
  } catch (o) {
    throw o.caller = "git.addRemote", o;
  }
}
async function vu({
  fs: t,
  cache: e,
  onSign: r,
  gitdir: i,
  ref: n,
  tagger: a,
  message: o = n,
  gpgsig: s,
  object: l,
  signingKey: f,
  force: u = !1
}) {
  if (n = n.startsWith("refs/tags/") ? n : \`refs/tags/\${n}\`, !u && await ae.exists({ fs: t, gitdir: i, ref: n }))
    throw new Nt("tag", n);
  const m = await ae.resolve({
    fs: t,
    gitdir: i,
    ref: l || "HEAD"
  }), { type: g } = await Je({ fs: t, cache: e, gitdir: i, oid: m });
  let y = wt.from({
    object: m,
    type: g,
    tag: n.replace("refs/tags/", ""),
    tagger: a,
    message: o,
    gpgsig: s
  });
  f && (y = await wt.sign(y, r, f));
  const E = await bt({
    fs: t,
    gitdir: i,
    type: "tag",
    object: y.toObject()
  });
  await ae.writeRef({ fs: t, gitdir: i, ref: n, value: E });
}
async function Eu({
  fs: t,
  onSign: e,
  dir: r,
  gitdir: i = ee.join(r, ".git"),
  ref: n,
  tagger: a,
  message: o = n,
  gpgsig: s,
  object: l,
  signingKey: f,
  force: u = !1,
  cache: m = {}
}) {
  try {
    H("fs", t), H("gitdir", i), H("ref", n), f && H("onSign", e);
    const g = new me(t), y = await ar({ fs: g, gitdir: i, author: a });
    if (!y) throw new ft("tagger");
    return await vu({
      fs: g,
      cache: m,
      onSign: e,
      gitdir: i,
      ref: n,
      tagger: y,
      message: o,
      gpgsig: s,
      object: l,
      signingKey: f,
      force: u
    });
  } catch (g) {
    throw g.caller = "git.annotatedTag", g;
  }
}
async function ku({
  fs: t,
  gitdir: e,
  ref: r,
  object: i,
  checkout: n = !1,
  force: a = !1
}) {
  if (r !== zt.clean(r))
    throw new Ct(r, zt.clean(r));
  const o = \`refs/heads/\${r}\`;
  if (!a && await ae.exists({ fs: t, gitdir: e, ref: o }))
    throw new Nt("branch", r, !1);
  let s;
  try {
    s = await ae.resolve({ fs: t, gitdir: e, ref: i || "HEAD" });
  } catch {
  }
  s && await ae.writeRef({ fs: t, gitdir: e, ref: o, value: s }), n && await ae.writeSymbolicRef({
    fs: t,
    gitdir: e,
    ref: "HEAD",
    value: o
  });
}
async function xu({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  ref: i,
  object: n,
  checkout: a = !1,
  force: o = !1
}) {
  try {
    return H("fs", t), H("gitdir", r), H("ref", i), await ku({
      fs: new me(t),
      gitdir: r,
      ref: i,
      object: n,
      checkout: a,
      force: o
    });
  } catch (s) {
    throw s.caller = "git.branch", s;
  }
}
const ms = (t, e) => t === "." || e == null || e.length === 0 || e === "." ? !0 : e.length >= t.length ? e.startsWith(t) : t.startsWith(e);
async function aa({
  fs: t,
  cache: e,
  onProgress: r,
  onPostCheckout: i,
  dir: n,
  gitdir: a,
  remote: o,
  ref: s,
  filepaths: l,
  noCheckout: f,
  noUpdateHead: u,
  dryRun: m,
  force: g,
  track: y = !0
}) {
  let E;
  if (i)
    try {
      E = await ae.resolve({ fs: t, gitdir: a, ref: "HEAD" });
    } catch {
      E = "0000000000000000000000000000000000000000";
    }
  let A;
  try {
    A = await ae.resolve({ fs: t, gitdir: a, ref: s });
  } catch (R) {
    if (s === "HEAD") throw R;
    const I = \`\${o}/\${s}\`;
    if (A = await ae.resolve({
      fs: t,
      gitdir: a,
      ref: I
    }), y) {
      const T = await rt.get({ fs: t, gitdir: a });
      await T.set(\`branch.\${s}.remote\`, o), await T.set(\`branch.\${s}.merge\`, \`refs/heads/\${s}\`), await rt.save({ fs: t, gitdir: a, config: T });
    }
    await ae.writeRef({
      fs: t,
      gitdir: a,
      ref: \`refs/heads/\${s}\`,
      value: A
    });
  }
  if (!f) {
    let R;
    try {
      R = await Su({
        fs: t,
        cache: e,
        onProgress: r,
        dir: n,
        gitdir: a,
        ref: s,
        force: g,
        filepaths: l
      });
    } catch (M) {
      throw M instanceof Pe && M.data.what === A ? new ti(s, A) : M;
    }
    const I = R.filter(([M]) => M === "conflict").map(([M, U]) => U);
    if (I.length > 0)
      throw new ei(I);
    const T = R.filter(([M]) => M === "error").map(([M, U]) => U);
    if (T.length > 0)
      throw new Te(T.join(", "));
    if (m) {
      i && await i({
        previousHead: E,
        newHead: A,
        type: l != null && l.length > 0 ? "file" : "branch"
      });
      return;
    }
    let D = 0;
    const P = R.length;
    await at.acquire({ fs: t, gitdir: a, cache: e }, async function(M) {
      await Promise.all(
        R.filter(
          ([U]) => U === "delete" || U === "delete-index"
        ).map(async function([U, $]) {
          const O = \`\${n}/\${$}\`;
          U === "delete" && await t.rm(O), M.delete({ filepath: $ }), r && await r({
            phase: "Updating workdir",
            loaded: ++D,
            total: P
          });
        })
      );
    }), await at.acquire({ fs: t, gitdir: a, cache: e }, async function(M) {
      for (const [U, $] of R)
        if (U === "rmdir" || U === "rmdir-index") {
          const O = \`\${n}/\${$}\`;
          try {
            U === "rmdir-index" && M.delete({ filepath: $ }), await t.rmdir(O), r && await r({
              phase: "Updating workdir",
              loaded: ++D,
              total: P
            });
          } catch (q) {
            if (q.code === "ENOTEMPTY")
              console.log(
                \`Did not delete \${$} because directory is not empty\`
              );
            else
              throw q;
          }
        }
    }), await Promise.all(
      R.filter(([M]) => M === "mkdir" || M === "mkdir-index").map(async function([M, U]) {
        const $ = \`\${n}/\${U}\`;
        await t.mkdir($), r && await r({
          phase: "Updating workdir",
          loaded: ++D,
          total: P
        });
      })
    ), await at.acquire({ fs: t, gitdir: a, cache: e }, async function(M) {
      await Promise.all(
        R.filter(
          ([U]) => U === "create" || U === "create-index" || U === "update" || U === "mkdir-index"
        ).map(async function([U, $, O, q, z]) {
          const Y = \`\${n}/\${$}\`;
          try {
            if (U !== "create-index" && U !== "mkdir-index") {
              const { object: J } = await Je({ fs: t, cache: e, gitdir: a, oid: O });
              if (z && await t.rm(Y), q === 33188)
                await t.write(Y, J);
              else if (q === 33261)
                await t.write(Y, J, { mode: 511 });
              else if (q === 40960)
                await t.writelink(Y, J);
              else
                throw new Te(
                  \`Invalid mode 0o\${q.toString(8)} detected in blob \${O}\`
                );
            }
            const N = await t.lstat(Y);
            q === 33261 && (N.mode = 493), U === "mkdir-index" && (N.mode = 57344), M.insert({
              filepath: $,
              stats: N,
              oid: O
            }), r && await r({
              phase: "Updating workdir",
              loaded: ++D,
              total: P
            });
          } catch (N) {
            console.log(N);
          }
        })
      );
    }), i && await i({
      previousHead: E,
      newHead: A,
      type: l != null && l.length > 0 ? "file" : "branch"
    });
  }
  if (!u) {
    const R = await ae.expand({ fs: t, gitdir: a, ref: s });
    R.startsWith("refs/heads") ? await ae.writeSymbolicRef({
      fs: t,
      gitdir: a,
      ref: "HEAD",
      value: R
    }) : await ae.writeRef({ fs: t, gitdir: a, ref: "HEAD", value: A });
  }
}
async function Su({
  fs: t,
  cache: e,
  onProgress: r,
  dir: i,
  gitdir: n,
  ref: a,
  force: o,
  filepaths: s
}) {
  let l = 0;
  return nr({
    fs: t,
    cache: e,
    dir: i,
    gitdir: n,
    trees: [Bt({ ref: a }), hi(), Cr()],
    map: async function(f, [u, m, g]) {
      if (f === ".") return;
      if (s && !s.some((E) => ms(f, E)))
        return null;
      switch (r && await r({ phase: "Analyzing workdir", loaded: ++l }), [!!g, !!u, !!m].map(Number).join("")) {
        // Impossible case.
        case "000":
          return;
        // Ignore workdir files that are not tracked and not part of the new commit.
        case "001":
          return o && s && s.includes(f) ? ["delete", f] : void 0;
        // New entries
        case "010":
          switch (await u.type()) {
            case "tree":
              return ["mkdir", f];
            case "blob":
              return [
                "create",
                f,
                await u.oid(),
                await u.mode()
              ];
            case "commit":
              return [
                "mkdir-index",
                f,
                await u.oid(),
                await u.mode()
              ];
            default:
              return [
                "error",
                \`new entry Unhandled type \${await u.type()}\`
              ];
          }
        // New entries but there is already something in the workdir there.
        case "011":
          switch (\`\${await u.type()}-\${await m.type()}\`) {
            case "tree-tree":
              return;
            case "tree-blob":
            case "blob-tree":
              return ["conflict", f];
            case "blob-blob":
              return await u.oid() !== await m.oid() ? o ? [
                "update",
                f,
                await u.oid(),
                await u.mode(),
                await u.mode() !== await m.mode()
              ] : ["conflict", f] : await u.mode() !== await m.mode() ? o ? [
                "update",
                f,
                await u.oid(),
                await u.mode(),
                !0
              ] : ["conflict", f] : [
                "create-index",
                f,
                await u.oid(),
                await u.mode()
              ];
            case "commit-tree":
              return;
            case "commit-blob":
              return ["conflict", f];
            default:
              return ["error", \`new entry Unhandled type \${u.type}\`];
          }
        // Something in stage but not in the commit OR the workdir.
        // Note: I verified this behavior against canonical git.
        case "100":
          return ["delete-index", f];
        // Deleted entries
        // TODO: How to handle if stage type and workdir type mismatch?
        case "101":
          switch (await g.type()) {
            case "tree":
              return ["rmdir", f];
            case "blob":
              return await g.oid() !== await m.oid() ? o ? ["delete", f] : ["conflict", f] : ["delete", f];
            case "commit":
              return ["rmdir-index", f];
            default:
              return [
                "error",
                \`delete entry Unhandled type \${await g.type()}\`
              ];
          }
        /* eslint-disable no-fallthrough */
        // File missing from workdir
        case "110":
        // Possibly modified entries
        case "111":
          switch (\`\${await g.type()}-\${await u.type()}\`) {
            case "tree-tree":
              return;
            case "blob-blob": {
              if (await g.oid() === await u.oid() && await g.mode() === await u.mode() && !o)
                return;
              if (m) {
                if (await m.oid() !== await g.oid() && await m.oid() !== await u.oid())
                  return o ? [
                    "update",
                    f,
                    await u.oid(),
                    await u.mode(),
                    await u.mode() !== await m.mode()
                  ] : ["conflict", f];
              } else if (o)
                return [
                  "update",
                  f,
                  await u.oid(),
                  await u.mode(),
                  await u.mode() !== await g.mode()
                ];
              return await u.mode() !== await g.mode() ? [
                "update",
                f,
                await u.oid(),
                await u.mode(),
                !0
              ] : await u.oid() !== await g.oid() ? [
                "update",
                f,
                await u.oid(),
                await u.mode(),
                !1
              ] : void 0;
            }
            case "tree-blob":
              return ["update-dir-to-blob", f, await u.oid()];
            case "blob-tree":
              return ["update-blob-to-tree", f];
            case "commit-commit":
              return [
                "mkdir-index",
                f,
                await u.oid(),
                await u.mode()
              ];
            default:
              return [
                "error",
                \`update entry Unhandled type \${await g.type()}-\${await u.type()}\`
              ];
          }
      }
    },
    // Modify the default flat mapping
    reduce: async function(f, u) {
      return u = cs(u), f ? f && f[0] === "rmdir" ? (u.push(f), u) : (u.unshift(f), u) : u;
    }
  });
}
async function gs({
  fs: t,
  onProgress: e,
  onPostCheckout: r,
  dir: i,
  gitdir: n = ee.join(i, ".git"),
  remote: a = "origin",
  ref: o,
  filepaths: s,
  noCheckout: l = !1,
  noUpdateHead: f = o === void 0,
  dryRun: u = !1,
  force: m = !1,
  track: g = !0,
  cache: y = {}
}) {
  try {
    H("fs", t), H("dir", i), H("gitdir", n);
    const E = o || "HEAD";
    return await aa({
      fs: new me(t),
      cache: y,
      onProgress: e,
      onPostCheckout: r,
      dir: i,
      gitdir: n,
      remote: a,
      ref: E,
      filepaths: s,
      noCheckout: l,
      noUpdateHead: f,
      dryRun: u,
      force: m,
      track: g
    });
  } catch (E) {
    throw E.caller = "git.checkout", E;
  }
}
const Iu = new RegExp("^refs/(heads/|tags/|remotes/)?(.*)");
function pr(t) {
  const e = Iu.exec(t);
  return e ? e[1] === "remotes/" && t.endsWith("/HEAD") ? e[2].slice(0, -5) : e[2] : t;
}
async function sr({
  fs: t,
  gitdir: e,
  fullname: r = !1,
  test: i = !1
}) {
  const n = await ae.resolve({
    fs: t,
    gitdir: e,
    ref: "HEAD",
    depth: 2
  });
  if (i)
    try {
      await ae.resolve({ fs: t, gitdir: e, ref: n });
    } catch {
      return;
    }
  if (n.startsWith("refs/"))
    return r ? n : pr(n);
}
function Tu(t) {
  return t = t.replace(/^git@([^:]+):/, "https://$1/"), t = t.replace(/^ssh:\\/\\//, "https://"), t;
}
function ys({ username: t = "", password: e = "" }) {
  return \`Basic \${fe.from(\`\${t}:\${e}\`).toString("base64")}\`;
}
async function pi(t, e) {
  const r = as(t);
  for (; ; ) {
    const { value: i, done: n } = await r.next();
    if (i && await e(i), n) break;
  }
  r.return && r.return();
}
async function $i(t) {
  let e = 0;
  const r = [];
  await pi(t, (a) => {
    r.push(a), e += a.byteLength;
  });
  const i = new Uint8Array(e);
  let n = 0;
  for (const a of r)
    i.set(a, n), n += a.byteLength;
  return i;
}
function co(t) {
  let e = t.match(/^https?:\\/\\/([^/]+)@/);
  if (e == null) return { url: t, auth: {} };
  e = e[1];
  const [r, i] = e.split(":");
  return t = t.replace(\`\${e}@\`, ""), { url: t, auth: { username: r, password: i } };
}
function Yn(t, e) {
  const r = e.toString(16);
  return "0".repeat(t - r.length) + r;
}
class Qe {
  static flush() {
    return fe.from("0000", "utf8");
  }
  static delim() {
    return fe.from("0001", "utf8");
  }
  static encode(e) {
    typeof e == "string" && (e = fe.from(e));
    const r = e.length + 4, i = Yn(4, r);
    return fe.concat([fe.from(i, "utf8"), e]);
  }
  static streamReader(e) {
    const r = new os(e);
    return async function() {
      try {
        let n = await r.read(4);
        if (n == null) return !0;
        if (n = parseInt(n.toString("utf8"), 16), n === 0 || n === 1) return null;
        const a = await r.read(n - 4);
        return a ?? !0;
      } catch (n) {
        return e.error = n, !0;
      }
    };
  }
}
async function lo(t) {
  const e = {};
  let r;
  for (; r = await t(), r !== !0; ) {
    if (r === null) continue;
    r = r.toString("utf8").replace(/\\n$/, "");
    const i = r.indexOf("=");
    if (i > -1) {
      const n = r.slice(0, i), a = r.slice(i + 1);
      e[n] = a;
    } else
      e[r] = !0;
  }
  return { protocolVersion: 2, capabilities2: e };
}
async function uo(t, { service: e }) {
  const r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), a = Qe.streamReader(t);
  let o = await a();
  for (; o === null; ) o = await a();
  if (o === !0) throw new ri();
  if (o.includes("version 2"))
    return lo(a);
  if (o.toString("utf8").replace(/\\n$/, "") !== \`# service=\${e}\`)
    throw new gr(\`# service=\${e}\\\\n\`, o.toString("utf8"));
  let s = await a();
  for (; s === null; ) s = await a();
  if (s === !0) return { capabilities: r, refs: i, symrefs: n };
  if (s = s.toString("utf8"), s.includes("version 2"))
    return lo(a);
  const [l, f] = En(s, "\\0", "\\\\x00");
  if (f.split(" ").map((u) => r.add(u)), l !== "0000000000000000000000000000000000000000 capabilities^{}") {
    const [u, m] = En(l, " ", " ");
    for (i.set(m, u); ; ) {
      const g = await a();
      if (g === !0) break;
      if (g !== null) {
        const [y, E] = En(g.toString("utf8"), " ", " ");
        i.set(E, y);
      }
    }
  }
  for (const u of r)
    if (u.startsWith("symref=")) {
      const m = u.match(/symref=([^:]+):(.*)/);
      m.length === 3 && n.set(m[1], m[2]);
    }
  return { protocolVersion: 1, capabilities: r, refs: i, symrefs: n };
}
function En(t, e, r) {
  const i = t.trim().split(e);
  if (i.length !== 2)
    throw new gr(
      \`Two strings separated by '\${r}'\`,
      t.toString("utf8")
    );
  return i;
}
const fo = (t, e) => t.endsWith("?") ? \`\${t}\${e}\` : \`\${t}/\${e.replace(/^https?:\\/\\//, "")}\`, ho = (t, e) => {
  (e.username || e.password) && (t.Authorization = ys(e)), e.headers && Object.assign(t, e.headers);
}, kn = async (t) => {
  try {
    const e = fe.from(await $i(t.body)), r = e.toString("utf8");
    return { preview: r.length < 256 ? r : r.slice(0, 256) + "...", response: r, data: e };
  } catch {
    return {};
  }
};
class Ai {
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
    onAuth: i,
    onAuthSuccess: n,
    onAuthFailure: a,
    corsProxy: o,
    service: s,
    url: l,
    headers: f,
    protocolVersion: u
  }) {
    let { url: m, auth: g } = co(l);
    const y = o ? fo(o, m) : m;
    (g.username || g.password) && (f.Authorization = ys(g)), u === 2 && (f["Git-Protocol"] = "version=2");
    let E, A, R = !1;
    do
      if (E = await e.request({
        onProgress: r,
        method: "GET",
        url: \`\${y}/info/refs?service=\${s}\`,
        headers: f
      }), A = !1, E.statusCode === 401 || E.statusCode === 203) {
        const I = R ? a : i;
        if (I) {
          if (g = await I(m, {
            ...g,
            headers: { ...f }
          }), g && g.cancel)
            throw new Mr();
          g && (ho(f, g), R = !0, A = !0);
        }
      } else E.statusCode === 200 && R && n && await n(m, g);
    while (A);
    if (E.statusCode !== 200) {
      const { response: I } = await kn(E);
      throw new Tr(E.statusCode, E.statusMessage, I);
    }
    if (E.headers["content-type"] === \`application/x-\${s}-advertisement\`) {
      const I = await uo(E.body, { service: s });
      return I.auth = g, I;
    } else {
      const { preview: I, response: T, data: D } = await kn(E);
      try {
        const P = await uo([D], { service: s });
        return P.auth = g, P;
      } catch {
        throw new si(I, T);
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
    corsProxy: i,
    service: n,
    url: a,
    auth: o,
    body: s,
    headers: l
  }) {
    const f = co(a);
    f && (a = f.url), i && (a = fo(i, a)), l["content-type"] = \`application/x-\${n}-request\`, l.accept = \`application/x-\${n}-result\`, ho(l, o);
    const u = await e.request({
      onProgress: r,
      method: "POST",
      url: \`\${a}/\${n}\`,
      body: s,
      headers: l
    });
    if (u.statusCode !== 200) {
      const { response: m } = kn(u);
      throw new Tr(u.statusCode, u.statusMessage, m);
    }
    return u;
  }
}
function Ru({ url: t }) {
  if (t.startsWith("git@"))
    return {
      transport: "ssh",
      address: t
    };
  const e = t.match(/(\\w+)(:\\/\\/|::)(.*)/);
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
class Mi {
  static getRemoteHelperFor({ url: e }) {
    const r = /* @__PURE__ */ new Map();
    r.set("http", Ai), r.set("https", Ai);
    const i = Ru({ url: e });
    if (!i)
      throw new li(e);
    if (r.has(i.transport))
      return r.get(i.transport);
    throw new ci(
      e,
      i.transport,
      i.transport === "ssh" ? Tu(e) : void 0
    );
  }
}
let fr = null;
class Xr {
  static async read({ fs: e, gitdir: r }) {
    fr === null && (fr = new Zr());
    const i = ee.join(r, "shallow"), n = /* @__PURE__ */ new Set();
    return await fr.acquire(i, async function() {
      const a = await e.read(i, { encoding: "utf8" });
      if (a === null || a.trim() === "") return n;
      a.trim().split(\`
\`).map((o) => n.add(o));
    }), n;
  }
  static async write({ fs: e, gitdir: r, oids: i }) {
    fr === null && (fr = new Zr());
    const n = ee.join(r, "shallow");
    if (i.size > 0) {
      const a = [...i].join(\`
\`) + \`
\`;
      await fr.acquire(n, async function() {
        await e.write(n, a, {
          encoding: "utf8"
        });
      });
    } else
      await fr.acquire(n, async function() {
        await e.rm(n);
      });
  }
}
async function Bu({ fs: t, gitdir: e, oid: r }) {
  const i = \`objects/\${r.slice(0, 2)}/\${r.slice(2)}\`;
  return t.exists(\`\${e}/\${i}\`);
}
async function $u({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  getExternalRefDelta: n
}) {
  let a = await t.readdir(ee.join(r, "objects/pack"));
  a = a.filter((o) => o.endsWith(".idx"));
  for (const o of a) {
    const s = \`\${r}/objects/pack/\${o}\`, l = await na({
      fs: t,
      cache: e,
      filename: s,
      getExternalRefDelta: n
    });
    if (l.error) throw new Te(l.error);
    if (l.offsets.has(i))
      return !0;
  }
  return !1;
}
async function wo({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  format: n = "content"
}) {
  const a = (s) => Je({ fs: t, cache: e, gitdir: r, oid: s });
  let o = await Bu({ fs: t, gitdir: r, oid: i });
  return o || (o = await $u({
    fs: t,
    cache: e,
    gitdir: r,
    oid: i,
    getExternalRefDelta: a
  })), o;
}
function Au(t) {
  const n = "5041434b" + "00000002" + "00000000";
  return t.slice(0, 12).toString("hex") === n;
}
function _s(t, e) {
  const r = t.map((i) => i.split("=", 1)[0]);
  return e.filter((i) => {
    const n = i.split("=", 1)[0];
    return r.includes(n);
  });
}
const Li = {
  name: "isomorphic-git",
  version: "1.30.1",
  agent: "git/isomorphic-git@1.30.1"
};
class ki {
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
function Du(t) {
  const e = t.indexOf("\\r"), r = t.indexOf(\`
\`);
  return e === -1 && r === -1 ? -1 : e === -1 ? r + 1 : r === -1 ? e + 1 : r === e + 1 ? r + 1 : Math.min(e, r) + 1;
}
function bs(t) {
  const e = new ki();
  let r = "";
  return (async () => (await pi(t, (i) => {
    for (i = i.toString("utf8"), r += i; ; ) {
      const n = Du(r);
      if (n === -1) break;
      e.write(r.slice(0, n)), r = r.slice(n);
    }
  }), r.length > 0 && e.write(r), e.end()))(), e;
}
class vs {
  static demux(e) {
    const r = Qe.streamReader(e), i = new ki(), n = new ki(), a = new ki(), o = async function() {
      const s = await r();
      if (s === null) return o();
      if (s === !0) {
        i.end(), a.end(), e.error ? n.destroy(e.error) : n.end();
        return;
      }
      switch (s[0]) {
        case 1: {
          n.write(s.slice(1));
          break;
        }
        case 2: {
          a.write(s.slice(1));
          break;
        }
        case 3: {
          const l = s.slice(1);
          a.write(l), i.end(), a.end(), n.destroy(new Error(l.toString("utf8")));
          return;
        }
        default:
          i.write(s);
      }
      o();
    };
    return o(), {
      packetlines: i,
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
async function Ou(t) {
  const { packetlines: e, packfile: r, progress: i } = vs.demux(t), n = [], a = [], o = [];
  let s = !1, l = !1;
  return new Promise((f, u) => {
    pi(e, (m) => {
      const g = m.toString("utf8").trim();
      if (g.startsWith("shallow")) {
        const y = g.slice(-41).trim();
        y.length !== 40 && u(new rr(y)), n.push(y);
      } else if (g.startsWith("unshallow")) {
        const y = g.slice(-41).trim();
        y.length !== 40 && u(new rr(y)), a.push(y);
      } else if (g.startsWith("ACK")) {
        const [, y, E] = g.split(" ");
        o.push({ oid: y, status: E }), E || (l = !0);
      } else g.startsWith("NAK") ? (s = !0, l = !0) : (l = !0, s = !0);
      l && (t.error ? u(t.error) : f({ shallows: n, unshallows: a, acks: o, nak: s, packfile: r, progress: i }));
    }).finally(() => {
      l || (t.error ? u(t.error) : f({ shallows: n, unshallows: a, acks: o, nak: s, packfile: r, progress: i }));
    });
  });
}
function Cu({
  capabilities: t = [],
  wants: e = [],
  haves: r = [],
  shallows: i = [],
  depth: n = null,
  since: a = null,
  exclude: o = []
}) {
  const s = [];
  e = [...new Set(e)];
  let l = \` \${t.join(" ")}\`;
  for (const f of e)
    s.push(Qe.encode(\`want \${f}\${l}
\`)), l = "";
  for (const f of i)
    s.push(Qe.encode(\`shallow \${f}
\`));
  n !== null && s.push(Qe.encode(\`deepen \${n}
\`)), a !== null && s.push(
    Qe.encode(\`deepen-since \${Math.floor(a.valueOf() / 1e3)}
\`)
  );
  for (const f of o)
    s.push(Qe.encode(\`deepen-not \${f}
\`));
  s.push(Qe.flush());
  for (const f of r)
    s.push(Qe.encode(\`have \${f}
\`));
  return s.push(Qe.encode(\`done
\`)), s;
}
async function oa({
  fs: t,
  cache: e,
  http: r,
  onProgress: i,
  onMessage: n,
  onAuth: a,
  onAuthSuccess: o,
  onAuthFailure: s,
  gitdir: l,
  ref: f,
  remoteRef: u,
  remote: m,
  url: g,
  corsProxy: y,
  depth: E = null,
  since: A = null,
  exclude: R = [],
  relative: I = !1,
  tags: T = !1,
  singleBranch: D = !1,
  headers: P = {},
  prune: M = !1,
  pruneTags: U = !1
}) {
  const $ = f || await sr({ fs: t, gitdir: l, test: !0 }), O = await rt.get({ fs: t, gitdir: l }), q = m || $ && await O.get(\`branch.\${$}.remote\`) || "origin", z = g || await O.get(\`remote.\${q}.url\`);
  if (typeof z > "u")
    throw new yt("remote OR url");
  const Y = u || $ && await O.get(\`branch.\${$}.merge\`) || f || "HEAD";
  y === void 0 && (y = await O.get("http.corsProxy"));
  const N = Mi.getRemoteHelperFor({ url: z }), J = await N.discover({
    http: r,
    onAuth: a,
    onAuthSuccess: o,
    onAuthFailure: s,
    corsProxy: y,
    service: "git-upload-pack",
    url: z,
    headers: P,
    protocolVersion: 1
  }), oe = J.auth, _e = J.refs;
  if (_e.size === 0)
    return {
      defaultBranch: null,
      fetchHead: null,
      fetchHeadDescription: null
    };
  if (E !== null && !J.capabilities.has("shallow"))
    throw new tr("shallow", "depth");
  if (A !== null && !J.capabilities.has("deepen-since"))
    throw new tr("deepen-since", "since");
  if (R.length > 0 && !J.capabilities.has("deepen-not"))
    throw new tr("deepen-not", "exclude");
  if (I === !0 && !J.capabilities.has("deepen-relative"))
    throw new tr("deepen-relative", "relative");
  const { oid: re, fullref: X } = ae.resolveAgainstMap({
    ref: Y,
    map: _e
  });
  for (const we of _e.keys())
    we === X || we === "HEAD" || we.startsWith("refs/heads/") || T && we.startsWith("refs/tags/") || _e.delete(we);
  const ie = _s(
    [...J.capabilities],
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
      \`agent=\${Li.agent}\`
    ]
  );
  I && ie.push("deepen-relative");
  const de = D ? [re] : _e.values(), xe = D ? [$] : await ae.listRefs({
    fs: t,
    gitdir: l,
    filepath: "refs"
  });
  let Re = [];
  for (let we of xe)
    try {
      we = await ae.expand({ fs: t, gitdir: l, ref: we });
      const Oe = await ae.resolve({ fs: t, gitdir: l, ref: we });
      await wo({ fs: t, cache: e, gitdir: l, oid: Oe }) && Re.push(Oe);
    } catch {
    }
  Re = [...new Set(Re)];
  const be = await Xr.read({ fs: t, gitdir: l }), Ae = J.capabilities.has("shallow") ? [...be] : [], ye = Cu({
    capabilities: ie,
    wants: de,
    haves: Re,
    shallows: Ae,
    depth: E,
    since: A,
    exclude: R
  }), Be = fe.from(await $i(ye)), ke = await N.connect({
    http: r,
    onProgress: i,
    corsProxy: y,
    service: "git-upload-pack",
    url: z,
    auth: oe,
    body: [Be],
    headers: P
  }), Ee = await Ou(ke.body);
  ke.headers && (Ee.headers = ke.headers);
  for (const we of Ee.shallows)
    if (!be.has(we))
      try {
        const { object: Oe } = await Je({ fs: t, cache: e, gitdir: l, oid: we }), Ve = new Ye(Oe), Ue = await Promise.all(
          Ve.headers().parent.map((Ce) => wo({ fs: t, cache: e, gitdir: l, oid: Ce }))
        );
        Ue.length === 0 || Ue.every((Ce) => Ce) || be.add(we);
      } catch {
        be.add(we);
      }
  for (const we of Ee.unshallows)
    be.delete(we);
  if (await Xr.write({ fs: t, gitdir: l, oids: be }), D) {
    const we = /* @__PURE__ */ new Map([[X, re]]), Oe = /* @__PURE__ */ new Map();
    let Ve = 10, Ue = X;
    for (; Ve--; ) {
      const Se = J.symrefs.get(Ue);
      if (Se === void 0) break;
      Oe.set(Ue, Se), Ue = Se;
    }
    const ze = _e.get(Ue);
    ze && we.set(Ue, ze);
    const { pruned: Ce } = await ae.updateRemoteRefs({
      fs: t,
      gitdir: l,
      remote: q,
      refs: we,
      symrefs: Oe,
      tags: T,
      prune: M
    });
    M && (Ee.pruned = Ce);
  } else {
    const { pruned: we } = await ae.updateRemoteRefs({
      fs: t,
      gitdir: l,
      remote: q,
      refs: _e,
      symrefs: J.symrefs,
      tags: T,
      prune: M,
      pruneTags: U
    });
    M && (Ee.pruned = we);
  }
  if (Ee.HEAD = J.symrefs.get("HEAD"), Ee.HEAD === void 0) {
    const { oid: we } = ae.resolveAgainstMap({
      ref: "HEAD",
      map: _e
    });
    for (const [Oe, Ve] of _e.entries())
      if (Oe !== "HEAD" && Ve === we) {
        Ee.HEAD = Oe;
        break;
      }
  }
  const De = X.startsWith("refs/tags") ? "tag" : "branch";
  if (Ee.FETCH_HEAD = {
    oid: re,
    description: \`\${De} '\${pr(X)}' of \${z}\`
  }, i || n) {
    const we = bs(Ee.progress);
    pi(we, async (Oe) => {
      if (n && await n(Oe), i) {
        const Ve = Oe.match(/([^:]*).*\\((\\d+?)\\/(\\d+?)\\)/);
        Ve && await i({
          phase: Ve[1].trim(),
          loaded: parseInt(Ve[2], 10),
          total: parseInt(Ve[3], 10)
        });
      }
    });
  }
  const Ge = fe.from(await $i(Ee.packfile));
  if (ke.body.error) throw ke.body.error;
  const tt = Ge.slice(-20).toString("hex"), je = {
    defaultBranch: Ee.HEAD,
    fetchHead: Ee.FETCH_HEAD.oid,
    fetchHeadDescription: Ee.FETCH_HEAD.description
  };
  if (Ee.headers && (je.headers = Ee.headers), M && (je.pruned = Ee.pruned), tt !== "" && !Au(Ge)) {
    je.packfile = \`objects/pack/pack-\${tt}.pack\`;
    const we = ee.join(l, je.packfile);
    await t.write(we, Ge);
    const Oe = (Ue) => Je({ fs: t, cache: e, gitdir: l, oid: Ue }), Ve = await Ir.fromPack({
      pack: Ge,
      getExternalRefDelta: Oe,
      onProgress: i
    });
    await t.write(we.replace(/\\.pack$/, ".idx"), await Ve.toBuffer());
  }
  return je;
}
async function Es({
  fs: t,
  bare: e = !1,
  dir: r,
  gitdir: i = e ? r : ee.join(r, ".git"),
  defaultBranch: n = "master"
}) {
  if (await t.exists(i + "/config")) return;
  let a = [
    "hooks",
    "info",
    "objects/info",
    "objects/pack",
    "refs/heads",
    "refs/tags"
  ];
  a = a.map((o) => i + "/" + o);
  for (const o of a)
    await t.mkdir(o);
  await t.write(
    i + "/config",
    \`[core]
	repositoryformatversion = 0
	filemode = false
	bare = \${e}
\` + (e ? "" : \`	logallrefupdates = true
\`) + \`	symlinks = false
	ignorecase = true
\`
  ), await t.write(i + "/HEAD", \`ref: refs/heads/\${n}
\`);
}
async function Nu({
  fs: t,
  cache: e,
  http: r,
  onProgress: i,
  onMessage: n,
  onAuth: a,
  onAuthSuccess: o,
  onAuthFailure: s,
  onPostCheckout: l,
  dir: f,
  gitdir: u,
  url: m,
  corsProxy: g,
  ref: y,
  remote: E,
  depth: A,
  since: R,
  exclude: I,
  relative: T,
  singleBranch: D,
  noCheckout: P,
  noTags: M,
  headers: U
}) {
  try {
    if (await Es({ fs: t, gitdir: u }), await ps({ fs: t, gitdir: u, remote: E, url: m, force: !1 }), g) {
      const q = await rt.get({ fs: t, gitdir: u });
      await q.set("http.corsProxy", g), await rt.save({ fs: t, gitdir: u, config: q });
    }
    const { defaultBranch: $, fetchHead: O } = await oa({
      fs: t,
      cache: e,
      http: r,
      onProgress: i,
      onMessage: n,
      onAuth: a,
      onAuthSuccess: o,
      onAuthFailure: s,
      gitdir: u,
      ref: y,
      remote: E,
      corsProxy: g,
      depth: A,
      since: R,
      exclude: I,
      relative: T,
      singleBranch: D,
      headers: U,
      tags: !M
    });
    if (O === null) return;
    y = y || $, y = y.replace("refs/heads/", ""), await aa({
      fs: t,
      cache: e,
      onProgress: i,
      onPostCheckout: l,
      dir: f,
      gitdir: u,
      ref: y,
      remote: E,
      noCheckout: P
    });
  } catch ($) {
    throw await t.rmdir(u, { recursive: !0, maxRetries: 10 }).catch(() => {
    }), $;
  }
}
async function Fu({
  fs: t,
  http: e,
  onProgress: r,
  onMessage: i,
  onAuth: n,
  onAuthSuccess: a,
  onAuthFailure: o,
  onPostCheckout: s,
  dir: l,
  gitdir: f = ee.join(l, ".git"),
  url: u,
  corsProxy: m = void 0,
  ref: g = void 0,
  remote: y = "origin",
  depth: E = void 0,
  since: A = void 0,
  exclude: R = [],
  relative: I = !1,
  singleBranch: T = !1,
  noCheckout: D = !1,
  noTags: P = !1,
  headers: M = {},
  cache: U = {}
}) {
  try {
    return H("fs", t), H("http", e), H("gitdir", f), D || H("dir", l), H("url", u), await Nu({
      fs: new me(t),
      cache: U,
      http: e,
      onProgress: r,
      onMessage: i,
      onAuth: n,
      onAuthSuccess: a,
      onAuthFailure: o,
      onPostCheckout: s,
      dir: l,
      gitdir: f,
      url: u,
      corsProxy: m,
      ref: g,
      remote: y,
      depth: E,
      since: A,
      exclude: R,
      relative: I,
      singleBranch: T,
      noCheckout: D,
      noTags: P,
      headers: M
    });
  } catch ($) {
    throw $.caller = "git.clone", $;
  }
}
async function Uu({
  fs: t,
  onSign: e,
  dir: r,
  gitdir: i = ee.join(r, ".git"),
  message: n,
  author: a,
  committer: o,
  signingKey: s,
  amend: l = !1,
  dryRun: f = !1,
  noUpdateBranch: u = !1,
  ref: m,
  parent: g,
  tree: y,
  cache: E = {}
}) {
  try {
    H("fs", t), l || H("message", n), s && H("onSign", e);
    const A = new me(t);
    return await Ui({
      fs: A,
      cache: E,
      onSign: e,
      gitdir: i,
      message: n,
      author: a,
      committer: o,
      signingKey: s,
      amend: l,
      dryRun: f,
      noUpdateBranch: u,
      ref: m,
      parent: g,
      tree: y
    });
  } catch (A) {
    throw A.caller = "git.commit", A;
  }
}
async function Mu({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  fullname: i = !1,
  test: n = !1
}) {
  try {
    return H("fs", t), H("gitdir", r), await sr({
      fs: new me(t),
      gitdir: r,
      fullname: i,
      test: n
    });
  } catch (a) {
    throw a.caller = "git.currentBranch", a;
  }
}
async function Lu({ fs: t, gitdir: e, ref: r }) {
  if (r = r.startsWith("refs/heads/") ? r : \`refs/heads/\${r}\`, !await ae.exists({ fs: t, gitdir: e, ref: r }))
    throw new Pe(r);
  const n = await ae.expand({ fs: t, gitdir: e, ref: r }), a = await sr({ fs: t, gitdir: e, fullname: !0 });
  if (n === a) {
    const l = await ae.resolve({ fs: t, gitdir: e, ref: n });
    await ae.writeRef({ fs: t, gitdir: e, ref: "HEAD", value: l });
  }
  await ae.deleteRef({ fs: t, gitdir: e, ref: n });
  const o = pr(r), s = await rt.get({ fs: t, gitdir: e });
  await s.deleteSection("branch", o), await rt.save({ fs: t, gitdir: e, config: s });
}
async function Pu({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  ref: i
}) {
  try {
    return H("fs", t), H("ref", i), await Lu({
      fs: new me(t),
      gitdir: r,
      ref: i
    });
  } catch (n) {
    throw n.caller = "git.deleteBranch", n;
  }
}
async function ju({ fs: t, dir: e, gitdir: r = ee.join(e, ".git"), ref: i }) {
  try {
    H("fs", t), H("ref", i), await ae.deleteRef({ fs: new me(t), gitdir: r, ref: i });
  } catch (n) {
    throw n.caller = "git.deleteRef", n;
  }
}
async function zu({ fs: t, gitdir: e, remote: r }) {
  const i = await rt.get({ fs: t, gitdir: e });
  await i.deleteSection("remote", r), await rt.save({ fs: t, gitdir: e, config: i });
}
async function Hu({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  remote: i
}) {
  try {
    return H("fs", t), H("remote", i), await zu({
      fs: new me(t),
      gitdir: r,
      remote: i
    });
  } catch (n) {
    throw n.caller = "git.deleteRemote", n;
  }
}
async function qu({ fs: t, gitdir: e, ref: r }) {
  r = r.startsWith("refs/tags/") ? r : \`refs/tags/\${r}\`, await ae.deleteRef({ fs: t, gitdir: e, ref: r });
}
async function Wu({ fs: t, dir: e, gitdir: r = ee.join(e, ".git"), ref: i }) {
  try {
    return H("fs", t), H("ref", i), await qu({
      fs: new me(t),
      gitdir: r,
      ref: i
    });
  } catch (n) {
    throw n.caller = "git.deleteTag", n;
  }
}
async function Gu({ fs: t, gitdir: e, oid: r }) {
  const i = r.slice(0, 2);
  return (await t.readdir(\`\${e}/objects/\${i}\`)).map((a) => \`\${i}\${a}\`).filter((a) => a.startsWith(r));
}
async function Zu({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  getExternalRefDelta: n
}) {
  const a = [];
  let o = await t.readdir(ee.join(r, "objects/pack"));
  o = o.filter((s) => s.endsWith(".idx"));
  for (const s of o) {
    const l = \`\${r}/objects/pack/\${s}\`, f = await na({
      fs: t,
      cache: e,
      filename: l,
      getExternalRefDelta: n
    });
    if (f.error) throw new Te(f.error);
    for (const u of f.offsets.keys())
      u.startsWith(i) && a.push(u);
  }
  return a;
}
async function Vu({ fs: t, cache: e, gitdir: r, oid: i }) {
  const n = (s) => Je({ fs: t, cache: e, gitdir: r, oid: s }), a = await Gu({ fs: t, gitdir: r, oid: i }), o = await Zu({
    fs: t,
    cache: e,
    gitdir: r,
    oid: i,
    getExternalRefDelta: n
  });
  for (const s of o)
    a.indexOf(s) === -1 && a.push(s);
  if (a.length === 1)
    return a[0];
  throw a.length > 1 ? new Qr("oids", i, a) : new Pe(\`an object matching "\${i}"\`);
}
async function Xu({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  oid: i,
  cache: n = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("oid", i), await Vu({
      fs: new me(t),
      cache: n,
      gitdir: r,
      oid: i
    });
  } catch (a) {
    throw a.caller = "git.expandOid", a;
  }
}
async function Yu({ fs: t, dir: e, gitdir: r = ee.join(e, ".git"), ref: i }) {
  try {
    return H("fs", t), H("gitdir", r), H("ref", i), await ae.expand({
      fs: new me(t),
      gitdir: r,
      ref: i
    });
  } catch (n) {
    throw n.caller = "git.expandRef", n;
  }
}
async function sa({ fs: t, cache: e, gitdir: r, oids: i }) {
  const n = {}, a = i.length;
  let o = i.map((s, l) => ({ index: l, oid: s }));
  for (; o.length; ) {
    const s = /* @__PURE__ */ new Set();
    for (const { oid: f, index: u } of o)
      n[f] || (n[f] = /* @__PURE__ */ new Set()), n[f].add(u), n[f].size === a && s.add(f);
    if (s.size > 0)
      return [...s];
    const l = /* @__PURE__ */ new Map();
    for (const { oid: f, index: u } of o)
      try {
        const { object: m } = await Je({ fs: t, cache: e, gitdir: r, oid: f }), g = Ye.from(m), { parent: y } = g.parseHeaders();
        for (const E of y)
          (!n[E] || !n[E].has(u)) && l.set(E + ":" + u, { oid: E, index: u });
      } catch {
      }
    o = Array.from(l.values());
  }
  return [];
}
const xn = /^.*(\\r?\\n|$)/gm;
function Ku({ branches: t, contents: e }) {
  const r = t[1], i = t[2], n = e[0], a = e[1], o = e[2], s = a.match(xn), l = n.match(xn), f = o.match(xn), u = ml(s, l, f), m = 7;
  let g = "", y = !0;
  for (const E of u)
    E.ok && (g += E.ok.join("")), E.conflict && (y = !1, g += \`\${"<".repeat(m)} \${r}
\`, g += E.conflict.a.join(""), g += \`\${"=".repeat(m)}
\`, g += E.conflict.b.join(""), g += \`\${">".repeat(m)} \${i}
\`);
  return { cleanMerge: y, mergedText: g };
}
async function Ju({
  fs: t,
  cache: e,
  dir: r,
  gitdir: i = ee.join(r, ".git"),
  index: n,
  ourOid: a,
  baseOid: o,
  theirOid: s,
  ourName: l = "ours",
  baseName: f = "base",
  theirName: u = "theirs",
  dryRun: m = !1,
  abortOnConflict: g = !0,
  mergeDriver: y
}) {
  const E = Bt({ ref: a }), A = Bt({ ref: o }), R = Bt({ ref: s }), I = [], T = [], D = [], P = [], M = await nr({
    fs: t,
    cache: e,
    dir: r,
    gitdir: i,
    trees: [E, A, R],
    map: async function(U, [$, O, q]) {
      const z = Si(U), Y = await Bi($, O), N = await Bi(q, O);
      switch (\`\${Y}-\${N}\`) {
        case "false-false":
          return {
            mode: await O.mode(),
            path: z,
            oid: await O.oid(),
            type: await O.type()
          };
        case "false-true":
          return q ? {
            mode: await q.mode(),
            path: z,
            oid: await q.oid(),
            type: await q.type()
          } : void 0;
        case "true-false":
          return $ ? {
            mode: await $.mode(),
            path: z,
            oid: await $.oid(),
            type: await $.type()
          } : void 0;
        case "true-true": {
          if ($ && O && q && await $.type() === "blob" && await O.type() === "blob" && await q.type() === "blob")
            return Qu({
              fs: t,
              gitdir: i,
              path: z,
              ours: $,
              base: O,
              theirs: q,
              ourName: l,
              baseName: f,
              theirName: u,
              mergeDriver: y
            }).then(async (J) => {
              if (J.cleanMerge)
                g || n.insert({ filepath: U, oid: J.mergeResult.oid, stage: 0 });
              else if (I.push(U), T.push(U), !g) {
                const oe = await O.oid(), _e = await $.oid(), re = await q.oid();
                n.delete({ filepath: U }), n.insert({ filepath: U, oid: oe, stage: 1 }), n.insert({ filepath: U, oid: _e, stage: 2 }), n.insert({ filepath: U, oid: re, stage: 3 });
              }
              return J.mergeResult;
            });
          if (O && !$ && q && await O.type() === "blob" && await q.type() === "blob") {
            if (I.push(U), D.push(U), !g) {
              const J = await O.oid(), oe = await q.oid();
              n.delete({ filepath: U }), n.insert({ filepath: U, oid: J, stage: 1 }), n.insert({ filepath: U, oid: oe, stage: 3 });
            }
            return {
              mode: await q.mode(),
              oid: await q.oid(),
              type: "blob",
              path: z
            };
          }
          if (O && $ && !q && await O.type() === "blob" && await $.type() === "blob") {
            if (I.push(U), P.push(U), !g) {
              const J = await O.oid(), oe = await $.oid();
              n.delete({ filepath: U }), n.insert({ filepath: U, oid: J, stage: 1 }), n.insert({ filepath: U, oid: oe, stage: 2 });
            }
            return {
              mode: await $.mode(),
              oid: await $.oid(),
              type: "blob",
              path: z
            };
          }
          if (O && !$ && !q && await O.type() === "blob")
            return;
          throw new Fr();
        }
      }
    },
    /**
     * @param {TreeEntry} [parent]
     * @param {Array<TreeEntry>} children
     */
    reduce: I.length !== 0 && (!r || g) ? void 0 : async (U, $) => {
      const O = $.filter(Boolean);
      if (U && !(U && U.type === "tree" && O.length === 0)) {
        if (O.length > 0) {
          const z = new _t(O).toObject(), Y = await bt({
            fs: t,
            gitdir: i,
            type: "tree",
            object: z,
            dryRun: m
          });
          U.oid = Y;
        }
        return U;
      }
    }
  });
  return I.length !== 0 ? (r && !g && await nr({
    fs: t,
    cache: e,
    dir: r,
    gitdir: i,
    trees: [Bt({ ref: M.oid })],
    map: async function(U, [$]) {
      const O = \`\${r}/\${U}\`;
      if (await $.type() === "blob") {
        const q = await $.mode(), z = new TextDecoder().decode(await $.content());
        await t.write(O, z, { mode: q });
      }
      return !0;
    }
  }), new Ur(
    I,
    T,
    D,
    P
  )) : M.oid;
}
async function Qu({
  fs: t,
  gitdir: e,
  path: r,
  ours: i,
  base: n,
  theirs: a,
  ourName: o,
  theirName: s,
  baseName: l,
  dryRun: f,
  mergeDriver: u = Ku
}) {
  const m = "blob", g = await n.mode() === await i.mode() ? await a.mode() : await i.mode();
  if (await i.oid() === await a.oid())
    return {
      cleanMerge: !0,
      mergeResult: { mode: g, path: r, oid: await i.oid(), type: m }
    };
  if (await i.oid() === await n.oid())
    return {
      cleanMerge: !0,
      mergeResult: { mode: g, path: r, oid: await a.oid(), type: m }
    };
  if (await a.oid() === await n.oid())
    return {
      cleanMerge: !0,
      mergeResult: { mode: g, path: r, oid: await i.oid(), type: m }
    };
  const y = fe.from(await i.content()).toString("utf8"), E = fe.from(await n.content()).toString("utf8"), A = fe.from(await a.content()).toString("utf8"), { mergedText: R, cleanMerge: I } = await u({
    branches: [l, o, s],
    contents: [E, y, A],
    path: r
  }), T = await bt({
    fs: t,
    gitdir: e,
    type: "blob",
    object: fe.from(R, "utf8"),
    dryRun: f
  });
  return { cleanMerge: I, mergeResult: { mode: g, path: r, oid: T, type: m } };
}
async function ks({
  fs: t,
  cache: e,
  dir: r,
  gitdir: i,
  ours: n,
  theirs: a,
  fastForward: o = !0,
  fastForwardOnly: s = !1,
  dryRun: l = !1,
  noUpdateBranch: f = !1,
  abortOnConflict: u = !0,
  message: m,
  author: g,
  committer: y,
  signingKey: E,
  onSign: A,
  mergeDriver: R
}) {
  n === void 0 && (n = await sr({ fs: t, gitdir: i, fullname: !0 })), n = await ae.expand({
    fs: t,
    gitdir: i,
    ref: n
  }), a = await ae.expand({
    fs: t,
    gitdir: i,
    ref: a
  });
  const I = await ae.resolve({
    fs: t,
    gitdir: i,
    ref: n
  }), T = await ae.resolve({
    fs: t,
    gitdir: i,
    ref: a
  }), D = await sa({
    fs: t,
    cache: e,
    gitdir: i,
    oids: [I, T]
  });
  if (D.length !== 1)
    throw new Fr();
  const P = D[0];
  if (P === T)
    return {
      oid: I,
      alreadyMerged: !0
    };
  if (o && P === I)
    return !l && !f && await ae.writeRef({ fs: t, gitdir: i, ref: n, value: T }), {
      oid: T,
      fastForward: !0
    };
  {
    if (s)
      throw new ii();
    const M = await at.acquire(
      { fs: t, gitdir: i, cache: e, allowUnmerged: !1 },
      async ($) => Ju({
        fs: t,
        cache: e,
        dir: r,
        gitdir: i,
        index: $,
        ourOid: I,
        theirOid: T,
        baseOid: P,
        ourName: pr(n),
        baseName: "base",
        theirName: pr(a),
        dryRun: l,
        abortOnConflict: u,
        mergeDriver: R
      })
    );
    if (M instanceof Ur) throw M;
    return m || (m = \`Merge branch '\${pr(a)}' into \${pr(
      n
    )}\`), {
      oid: await Ui({
        fs: t,
        cache: e,
        gitdir: i,
        message: m,
        ref: n,
        tree: M,
        parent: [I, T],
        author: g,
        committer: y,
        signingKey: E,
        onSign: A,
        dryRun: l,
        noUpdateBranch: f
      }),
      tree: M,
      mergeCommit: !0
    };
  }
}
async function xs({
  fs: t,
  cache: e,
  http: r,
  onProgress: i,
  onMessage: n,
  onAuth: a,
  onAuthSuccess: o,
  onAuthFailure: s,
  dir: l,
  gitdir: f,
  ref: u,
  url: m,
  remote: g,
  remoteRef: y,
  prune: E,
  pruneTags: A,
  fastForward: R,
  fastForwardOnly: I,
  corsProxy: T,
  singleBranch: D,
  headers: P,
  author: M,
  committer: U,
  signingKey: $
}) {
  try {
    if (!u) {
      const z = await sr({ fs: t, gitdir: f });
      if (!z)
        throw new yt("ref");
      u = z;
    }
    const { fetchHead: O, fetchHeadDescription: q } = await oa({
      fs: t,
      cache: e,
      http: r,
      onProgress: i,
      onMessage: n,
      onAuth: a,
      onAuthSuccess: o,
      onAuthFailure: s,
      gitdir: f,
      corsProxy: T,
      ref: u,
      url: m,
      remote: g,
      remoteRef: y,
      singleBranch: D,
      headers: P,
      prune: E,
      pruneTags: A
    });
    await ks({
      fs: t,
      cache: e,
      gitdir: f,
      ours: u,
      theirs: O,
      fastForward: R,
      fastForwardOnly: I,
      message: \`Merge \${q}\`,
      author: M,
      committer: U,
      signingKey: $,
      dryRun: !1,
      noUpdateBranch: !1
    }), await aa({
      fs: t,
      cache: e,
      onProgress: i,
      dir: l,
      gitdir: f,
      ref: u,
      remote: g,
      noCheckout: !1
    });
  } catch (O) {
    throw O.caller = "git.pull", O;
  }
}
async function ef({
  fs: t,
  http: e,
  onProgress: r,
  onMessage: i,
  onAuth: n,
  onAuthSuccess: a,
  onAuthFailure: o,
  dir: s,
  gitdir: l = ee.join(s, ".git"),
  ref: f,
  url: u,
  remote: m,
  remoteRef: g,
  corsProxy: y,
  singleBranch: E,
  headers: A = {},
  cache: R = {}
}) {
  try {
    H("fs", t), H("http", e), H("gitdir", l);
    const I = {
      name: "",
      email: "",
      timestamp: Date.now(),
      timezoneOffset: 0
    };
    return await xs({
      fs: new me(t),
      cache: R,
      http: e,
      onProgress: r,
      onMessage: i,
      onAuth: n,
      onAuthSuccess: a,
      onAuthFailure: o,
      dir: s,
      gitdir: l,
      ref: f,
      url: u,
      remote: m,
      remoteRef: g,
      fastForwardOnly: !0,
      corsProxy: y,
      singleBranch: E,
      headers: A,
      author: I,
      committer: I
    });
  } catch (I) {
    throw I.caller = "git.fastForward", I;
  }
}
async function tf({
  fs: t,
  http: e,
  onProgress: r,
  onMessage: i,
  onAuth: n,
  onAuthSuccess: a,
  onAuthFailure: o,
  dir: s,
  gitdir: l = ee.join(s, ".git"),
  ref: f,
  remote: u,
  remoteRef: m,
  url: g,
  corsProxy: y,
  depth: E = null,
  since: A = null,
  exclude: R = [],
  relative: I = !1,
  tags: T = !1,
  singleBranch: D = !1,
  headers: P = {},
  prune: M = !1,
  pruneTags: U = !1,
  cache: $ = {}
}) {
  try {
    return H("fs", t), H("http", e), H("gitdir", l), await oa({
      fs: new me(t),
      cache: $,
      http: e,
      onProgress: r,
      onMessage: i,
      onAuth: n,
      onAuthSuccess: a,
      onAuthFailure: o,
      gitdir: l,
      ref: f,
      remote: u,
      remoteRef: m,
      url: g,
      corsProxy: y,
      depth: E,
      since: A,
      exclude: R,
      relative: I,
      tags: T,
      singleBranch: D,
      headers: P,
      prune: M,
      pruneTags: U
    });
  } catch (O) {
    throw O.caller = "git.fetch", O;
  }
}
async function rf({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  oids: i,
  cache: n = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("oids", i), await sa({
      fs: new me(t),
      cache: n,
      gitdir: r,
      oids: i
    });
  } catch (a) {
    throw a.caller = "git.findMergeBase", a;
  }
}
async function Ss({ fs: t, filepath: e }) {
  if (await t.exists(ee.join(e, ".git")))
    return e;
  {
    const r = Sr(e);
    if (r === e)
      throw new Pe(\`git root for \${e}\`);
    return Ss({ fs: t, filepath: r });
  }
}
async function nf({ fs: t, filepath: e }) {
  try {
    return H("fs", t), H("filepath", e), await Ss({ fs: new me(t), filepath: e });
  } catch (r) {
    throw r.caller = "git.findRoot", r;
  }
}
async function af({ fs: t, dir: e, gitdir: r = ee.join(e, ".git"), path: i }) {
  try {
    return H("fs", t), H("gitdir", r), H("path", i), await Vr({
      fs: new me(t),
      gitdir: r,
      path: i
    });
  } catch (n) {
    throw n.caller = "git.getConfig", n;
  }
}
async function of({ fs: t, gitdir: e, path: r }) {
  return (await rt.get({ fs: t, gitdir: e })).getall(r);
}
async function sf({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  path: i
}) {
  try {
    return H("fs", t), H("gitdir", r), H("path", i), await of({
      fs: new me(t),
      gitdir: r,
      path: i
    });
  } catch (n) {
    throw n.caller = "git.getConfigAll", n;
  }
}
async function cf({
  http: t,
  onAuth: e,
  onAuthSuccess: r,
  onAuthFailure: i,
  corsProxy: n,
  url: a,
  headers: o = {},
  forPush: s = !1
}) {
  try {
    H("http", t), H("url", a);
    const f = await Mi.getRemoteHelperFor({ url: a }).discover({
      http: t,
      onAuth: e,
      onAuthSuccess: r,
      onAuthFailure: i,
      corsProxy: n,
      service: s ? "git-receive-pack" : "git-upload-pack",
      url: a,
      headers: o,
      protocolVersion: 1
    }), u = {
      capabilities: [...f.capabilities]
    };
    for (const [m, g] of f.refs) {
      const y = m.split("/"), E = y.pop();
      let A = u;
      for (const R of y)
        A[R] = A[R] || {}, A = A[R];
      A[E] = g;
    }
    for (const [m, g] of f.symrefs) {
      const y = m.split("/"), E = y.pop();
      let A = u;
      for (const R of y)
        A[R] = A[R] || {}, A = A[R];
      A[E] = g;
    }
    return u;
  } catch (l) {
    throw l.caller = "git.getRemoteInfo", l;
  }
}
function Is(t, e, r, i) {
  const n = [];
  for (const [a, o] of t.refs) {
    if (e && !a.startsWith(e)) continue;
    if (a.endsWith("^{}")) {
      if (i) {
        const l = a.replace("^{}", ""), f = n[n.length - 1], u = f.ref === l ? f : n.find((m) => m.ref === l);
        if (u === void 0)
          throw new Error("I did not expect this to happen");
        u.peeled = o;
      }
      continue;
    }
    const s = { ref: a, oid: o };
    r && t.symrefs.has(a) && (s.target = t.symrefs.get(a)), n.push(s);
  }
  return n;
}
async function lf({
  http: t,
  onAuth: e,
  onAuthSuccess: r,
  onAuthFailure: i,
  corsProxy: n,
  url: a,
  headers: o = {},
  forPush: s = !1,
  protocolVersion: l = 2
}) {
  try {
    H("http", t), H("url", a);
    const u = await Mi.getRemoteHelperFor({ url: a }).discover({
      http: t,
      onAuth: e,
      onAuthSuccess: r,
      onAuthFailure: i,
      corsProxy: n,
      service: s ? "git-receive-pack" : "git-upload-pack",
      url: a,
      headers: o,
      protocolVersion: l
    });
    if (u.protocolVersion === 2)
      return {
        protocolVersion: u.protocolVersion,
        capabilities: u.capabilities2
      };
    const m = {};
    for (const g of u.capabilities) {
      const [y, E] = g.split("=");
      E ? m[y] = E : m[y] = !0;
    }
    return {
      protocolVersion: 1,
      capabilities: m,
      refs: Is(u, void 0, !0, !0)
    };
  } catch (f) {
    throw f.caller = "git.getRemoteInfo2", f;
  }
}
async function uf({
  type: t,
  object: e,
  format: r = "content",
  oid: i = void 0
}) {
  return r !== "deflated" && (r !== "wrapped" && (e = Nr.wrap({ type: t, object: e })), i = await Xt(e)), { oid: i, object: e };
}
async function ff({ object: t }) {
  try {
    H("object", t), typeof t == "string" ? t = fe.from(t, "utf8") : t = fe.from(t);
    const e = "blob", { oid: r, object: i } = await uf({
      type: "blob",
      format: "content",
      object: t
    });
    return { oid: r, type: e, object: new Uint8Array(i), format: "wrapped" };
  } catch (e) {
    throw e.caller = "git.hashBlob", e;
  }
}
async function hf({
  fs: t,
  cache: e,
  onProgress: r,
  dir: i,
  gitdir: n,
  filepath: a
}) {
  try {
    a = ee.join(i, a);
    const o = await t.read(a), s = (f) => Je({ fs: t, cache: e, gitdir: n, oid: f }), l = await Ir.fromPack({
      pack: o,
      getExternalRefDelta: s,
      onProgress: r
    });
    return await t.write(a.replace(/\\.pack$/, ".idx"), await l.toBuffer()), {
      oids: [...l.hashes]
    };
  } catch (o) {
    throw o.caller = "git.indexPack", o;
  }
}
async function df({
  fs: t,
  onProgress: e,
  dir: r,
  gitdir: i = ee.join(r, ".git"),
  filepath: n,
  cache: a = {}
}) {
  try {
    return H("fs", t), H("dir", r), H("gitdir", r), H("filepath", n), await hf({
      fs: new me(t),
      cache: a,
      onProgress: e,
      dir: r,
      gitdir: i,
      filepath: n
    });
  } catch (o) {
    throw o.caller = "git.indexPack", o;
  }
}
async function wf({
  fs: t,
  bare: e = !1,
  dir: r,
  gitdir: i = e ? r : ee.join(r, ".git"),
  defaultBranch: n = "master"
}) {
  try {
    return H("fs", t), H("gitdir", i), e || H("dir", r), await Es({
      fs: new me(t),
      bare: e,
      dir: r,
      gitdir: i,
      defaultBranch: n
    });
  } catch (a) {
    throw a.caller = "git.init", a;
  }
}
async function Ts({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  ancestor: n,
  depth: a
}) {
  const o = await Xr.read({ fs: t, gitdir: r });
  if (!i)
    throw new yt("oid");
  if (!n)
    throw new yt("ancestor");
  if (i === n) return !1;
  const s = [i], l = /* @__PURE__ */ new Set();
  let f = 0;
  for (; s.length; ) {
    if (f++ === a)
      throw new ai(a);
    const u = s.shift(), { type: m, object: g } = await Je({
      fs: t,
      cache: e,
      gitdir: r,
      oid: u
    });
    if (m !== "commit")
      throw new pt(u, m, "commit");
    const y = Ye.from(g).parse();
    for (const E of y.parent)
      if (E === n) return !0;
    if (!o.has(u))
      for (const E of y.parent)
        l.has(E) || (s.push(E), l.add(E));
  }
  return !1;
}
async function pf({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  oid: i,
  ancestor: n,
  depth: a = -1,
  cache: o = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("oid", i), H("ancestor", n), await Ts({
      fs: new me(t),
      cache: o,
      gitdir: r,
      oid: i,
      ancestor: n,
      depth: a
    });
  } catch (s) {
    throw s.caller = "git.isDescendent", s;
  }
}
async function mf({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  filepath: i
}) {
  try {
    return H("fs", t), H("dir", e), H("gitdir", r), H("filepath", i), Lr.isIgnored({
      fs: new me(t),
      dir: e,
      gitdir: r,
      filepath: i
    });
  } catch (n) {
    throw n.caller = "git.isIgnored", n;
  }
}
async function gf({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  remote: i
}) {
  try {
    return H("fs", t), H("gitdir", r), ae.listBranches({
      fs: new me(t),
      gitdir: r,
      remote: i
    });
  } catch (n) {
    throw n.caller = "git.listBranches", n;
  }
}
async function yf({ fs: t, gitdir: e, ref: r, cache: i }) {
  if (r) {
    const n = await ae.resolve({ gitdir: e, fs: t, ref: r }), a = [];
    return await Rs({
      fs: t,
      cache: i,
      gitdir: e,
      oid: n,
      filenames: a,
      prefix: ""
    }), a;
  } else
    return at.acquire({ fs: t, gitdir: e, cache: i }, async function(n) {
      return n.entries.map((a) => a.path);
    });
}
async function Rs({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  filenames: n,
  prefix: a
}) {
  const { tree: o } = await Pr({ fs: t, cache: e, gitdir: r, oid: i });
  for (const s of o)
    s.type === "tree" ? await Rs({
      fs: t,
      cache: e,
      gitdir: r,
      oid: s.oid,
      filenames: n,
      prefix: ee.join(a, s.path)
    }) : n.push(ee.join(a, s.path));
}
async function _f({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  ref: i,
  cache: n = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), await yf({
      fs: new me(t),
      cache: n,
      gitdir: r,
      ref: i
    });
  } catch (a) {
    throw a.caller = "git.listFiles", a;
  }
}
async function bf({ fs: t, cache: e, gitdir: r, ref: i }) {
  let n;
  try {
    n = await ae.resolve({ gitdir: r, fs: t, ref: i });
  } catch (s) {
    if (s instanceof Pe)
      return [];
  }
  return (await Pr({
    fs: t,
    cache: e,
    gitdir: r,
    oid: n
  })).tree.map((s) => ({
    target: s.path,
    note: s.oid
  }));
}
async function vf({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  ref: i = "refs/notes/commits",
  cache: n = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("ref", i), await bf({
      fs: new me(t),
      cache: n,
      gitdir: r,
      ref: i
    });
  } catch (a) {
    throw a.caller = "git.listNotes", a;
  }
}
async function Ef({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  filepath: i
}) {
  try {
    return H("fs", t), H("gitdir", r), ae.listRefs({ fs: new me(t), gitdir: r, filepath: i });
  } catch (n) {
    throw n.caller = "git.listRefs", n;
  }
}
async function kf({ fs: t, gitdir: e }) {
  const r = await rt.get({ fs: t, gitdir: e }), i = await r.getSubsections("remote");
  return Promise.all(
    i.map(async (a) => {
      const o = await r.get(\`remote.\${a}.url\`);
      return { remote: a, url: o };
    })
  );
}
async function xf({ fs: t, dir: e, gitdir: r = ee.join(e, ".git") }) {
  try {
    return H("fs", t), H("gitdir", r), await kf({
      fs: new me(t),
      gitdir: r
    });
  } catch (i) {
    throw i.caller = "git.listRemotes", i;
  }
}
async function Sf(t) {
  const e = Qe.streamReader(t), r = [];
  let i;
  for (; i = await e(), i !== !0; ) {
    if (i === null) continue;
    i = i.toString("utf8").replace(/\\n$/, "");
    const [n, a, ...o] = i.split(" "), s = { ref: a, oid: n };
    for (const l of o) {
      const [f, u] = l.split(":");
      f === "symref-target" ? s.target = u : f === "peeled" && (s.peeled = u);
    }
    r.push(s);
  }
  return r;
}
async function If({ prefix: t, symrefs: e, peelTags: r }) {
  const i = [];
  return i.push(Qe.encode(\`command=ls-refs
\`)), i.push(Qe.encode(\`agent=\${Li.agent}
\`)), (r || e || t) && i.push(Qe.delim()), r && i.push(Qe.encode("peel")), e && i.push(Qe.encode("symrefs")), t && i.push(Qe.encode(\`ref-prefix \${t}\`)), i.push(Qe.flush()), i;
}
async function Tf({
  http: t,
  onAuth: e,
  onAuthSuccess: r,
  onAuthFailure: i,
  corsProxy: n,
  url: a,
  headers: o = {},
  forPush: s = !1,
  protocolVersion: l = 2,
  prefix: f,
  symrefs: u,
  peelTags: m
}) {
  try {
    H("http", t), H("url", a);
    const g = await Ai.discover({
      http: t,
      onAuth: e,
      onAuthSuccess: r,
      onAuthFailure: i,
      corsProxy: n,
      service: s ? "git-receive-pack" : "git-upload-pack",
      url: a,
      headers: o,
      protocolVersion: l
    });
    if (g.protocolVersion === 1)
      return Is(g, f, u, m);
    const y = await If({ prefix: f, symrefs: u, peelTags: m }), E = await Ai.connect({
      http: t,
      auth: g.auth,
      headers: o,
      corsProxy: n,
      service: s ? "git-receive-pack" : "git-upload-pack",
      url: a,
      body: y
    });
    return Sf(E.body);
  } catch (g) {
    throw g.caller = "git.listServerRefs", g;
  }
}
async function Rf({ fs: t, dir: e, gitdir: r = ee.join(e, ".git") }) {
  try {
    return H("fs", t), H("gitdir", r), ae.listTags({ fs: new me(t), gitdir: r });
  } catch (i) {
    throw i.caller = "git.listTags", i;
  }
}
function Bf(t, e) {
  return t.committer.timestamp - e.committer.timestamp;
}
const $f = "e69de29bb2d1d6434b8b29ae775ad8c2e48c5391";
async function po({ fs: t, cache: e, gitdir: r, oid: i, fileId: n }) {
  if (n === $f) return;
  const a = i;
  let o;
  const s = await Br({ fs: t, cache: e, gitdir: r, oid: i }), l = s.tree;
  return n === s.oid ? o = s.path : (o = await Bs({
    fs: t,
    cache: e,
    gitdir: r,
    tree: l,
    fileId: n,
    oid: a
  }), Array.isArray(o) && (o.length === 0 ? o = void 0 : o.length === 1 && (o = o[0]))), o;
}
async function Bs({
  fs: t,
  cache: e,
  gitdir: r,
  tree: i,
  fileId: n,
  oid: a,
  filepaths: o = [],
  parentPath: s = ""
}) {
  const l = i.entries().map(function(f) {
    let u;
    return f.oid === n ? (u = ee.join(s, f.path), o.push(u)) : f.type === "tree" && (u = Je({
      fs: t,
      cache: e,
      gitdir: r,
      oid: f.oid
    }).then(function({ object: m }) {
      return Bs({
        fs: t,
        cache: e,
        gitdir: r,
        tree: _t.from(m),
        fileId: n,
        oid: a,
        filepaths: o,
        parentPath: ee.join(s, f.path)
      });
    })), u;
  });
  return await Promise.all(l), o;
}
async function Af({
  fs: t,
  cache: e,
  gitdir: r,
  filepath: i,
  ref: n,
  depth: a,
  since: o,
  force: s,
  follow: l
}) {
  const f = typeof o > "u" ? void 0 : Math.floor(o.valueOf() / 1e3), u = [], m = await Xr.read({ fs: t, gitdir: r }), g = await ae.resolve({ fs: t, gitdir: r, ref: n }), y = [await Ar({ fs: t, cache: e, gitdir: r, oid: g })];
  let E, A, R;
  function I(T) {
    R && i && u.push(T);
  }
  for (; y.length > 0; ) {
    const T = y.pop();
    if (f !== void 0 && T.commit.committer.timestamp <= f)
      break;
    if (i) {
      let D;
      try {
        D = await di({
          fs: t,
          cache: e,
          gitdir: r,
          oid: T.commit.tree,
          filepath: i
        }), A && E !== D && u.push(A), E = D, A = T, R = !0;
      } catch (P) {
        if (P instanceof Pe) {
          let M = l && E;
          if (M && (M = await po({
            fs: t,
            cache: e,
            gitdir: r,
            oid: T.commit.tree,
            fileId: E
          }), M))
            if (Array.isArray(M)) {
              if (A) {
                const U = await po({
                  fs: t,
                  cache: e,
                  gitdir: r,
                  oid: A.commit.tree,
                  fileId: E
                });
                if (Array.isArray(U))
                  if (M = M.filter(($) => U.indexOf($) === -1), M.length === 1)
                    M = M[0], i = M, A && u.push(A);
                  else {
                    M = !1, A && u.push(A);
                    break;
                  }
              }
            } else
              i = M, A && u.push(A);
          if (!M) {
            if (R && E && (u.push(A), !s))
              break;
            if (!s && !l) throw P;
          }
          A = T, R = !1;
        } else throw P;
      }
    } else
      u.push(T);
    if (a !== void 0 && u.length === a) {
      I(T);
      break;
    }
    if (!m.has(T.oid))
      for (const D of T.commit.parent) {
        const P = await Ar({ fs: t, cache: e, gitdir: r, oid: D });
        y.map((M) => M.oid).includes(P.oid) || y.push(P);
      }
    y.length === 0 && I(T), y.sort((D, P) => Bf(D.commit, P.commit));
  }
  return u;
}
async function Df({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  filepath: i,
  ref: n = "HEAD",
  depth: a,
  since: o,
  // Date
  force: s,
  follow: l,
  cache: f = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("ref", n), await Af({
      fs: new me(t),
      cache: f,
      gitdir: r,
      filepath: i,
      ref: n,
      depth: a,
      since: o,
      force: s,
      follow: l
    });
  } catch (u) {
    throw u.caller = "git.log", u;
  }
}
async function Of({
  fs: t,
  onSign: e,
  dir: r,
  gitdir: i = ee.join(r, ".git"),
  ours: n,
  theirs: a,
  fastForward: o = !0,
  fastForwardOnly: s = !1,
  dryRun: l = !1,
  noUpdateBranch: f = !1,
  abortOnConflict: u = !0,
  message: m,
  author: g,
  committer: y,
  signingKey: E,
  cache: A = {},
  mergeDriver: R
}) {
  try {
    H("fs", t), E && H("onSign", e);
    const I = new me(t), T = await ar({ fs: I, gitdir: i, author: g });
    if (!T && (!s || !o))
      throw new ft("author");
    const D = await $r({
      fs: I,
      gitdir: i,
      author: T,
      committer: y
    });
    if (!D && (!s || !o))
      throw new ft("committer");
    return await ks({
      fs: I,
      cache: A,
      dir: r,
      gitdir: i,
      ours: n,
      theirs: a,
      fastForward: o,
      fastForwardOnly: s,
      dryRun: l,
      noUpdateBranch: f,
      abortOnConflict: u,
      message: m,
      author: T,
      committer: D,
      signingKey: E,
      onSign: e,
      mergeDriver: R
    });
  } catch (I) {
    throw I.caller = "git.merge", I;
  }
}
const Cf = {
  commit: 16,
  tree: 32,
  blob: 48,
  tag: 64,
  ofs_delta: 96,
  ref_delta: 112
};
async function $s({
  fs: t,
  cache: e,
  dir: r,
  gitdir: i = ee.join(r, ".git"),
  oids: n
}) {
  const a = new Zo(), o = [];
  function s(u, m) {
    const g = fe.from(u, m);
    o.push(g), a.update(g);
  }
  async function l({ stype: u, object: m }) {
    const g = Cf[u];
    let y = m.length, E = y > 15 ? 128 : 0;
    const A = y & 15;
    y = y >>> 4;
    let R = (E | g | A).toString(16);
    for (s(R, "hex"); E; )
      E = y > 127 ? 128 : 0, R = E | y & 127, s(Yn(2, R), "hex"), y = y >>> 7;
    s(fe.from(await ls(m)));
  }
  s("PACK"), s("00000002", "hex"), s(Yn(8, n.length), "hex");
  for (const u of n) {
    const { type: m, object: g } = await Je({ fs: t, cache: e, gitdir: i, oid: u });
    await l({ object: g, stype: m });
  }
  const f = a.digest();
  return o.push(f), o;
}
async function Nf({ fs: t, cache: e, gitdir: r, oids: i, write: n }) {
  const a = await $s({ fs: t, cache: e, gitdir: r, oids: i }), o = fe.from(await $i(a)), l = \`pack-\${o.slice(-20).toString("hex")}.pack\`;
  return n ? (await t.write(ee.join(r, \`objects/pack/\${l}\`), o), { filename: l }) : {
    filename: l,
    packfile: new Uint8Array(o)
  };
}
async function Ff({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  oids: i,
  write: n = !1,
  cache: a = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("oids", i), await Nf({
      fs: new me(t),
      cache: a,
      gitdir: r,
      oids: i,
      write: n
    });
  } catch (o) {
    throw o.caller = "git.packObjects", o;
  }
}
async function Uf({
  fs: t,
  http: e,
  onProgress: r,
  onMessage: i,
  onAuth: n,
  onAuthSuccess: a,
  onAuthFailure: o,
  dir: s,
  gitdir: l = ee.join(s, ".git"),
  ref: f,
  url: u,
  remote: m,
  remoteRef: g,
  prune: y = !1,
  pruneTags: E = !1,
  fastForward: A = !0,
  fastForwardOnly: R = !1,
  corsProxy: I,
  singleBranch: T,
  headers: D = {},
  author: P,
  committer: M,
  signingKey: U,
  cache: $ = {}
}) {
  try {
    H("fs", t), H("gitdir", l);
    const O = new me(t), q = await ar({ fs: O, gitdir: l, author: P });
    if (!q) throw new ft("author");
    const z = await $r({
      fs: O,
      gitdir: l,
      author: q,
      committer: M
    });
    if (!z) throw new ft("committer");
    return await xs({
      fs: O,
      cache: $,
      http: e,
      onProgress: r,
      onMessage: i,
      onAuth: n,
      onAuthSuccess: a,
      onAuthFailure: o,
      dir: s,
      gitdir: l,
      ref: f,
      url: u,
      remote: m,
      remoteRef: g,
      fastForward: A,
      fastForwardOnly: R,
      corsProxy: I,
      singleBranch: T,
      headers: D,
      author: q,
      committer: z,
      signingKey: U,
      prune: y,
      pruneTags: E
    });
  } catch (O) {
    throw O.caller = "git.pull", O;
  }
}
async function Mf({
  fs: t,
  cache: e,
  dir: r,
  gitdir: i = ee.join(r, ".git"),
  start: n,
  finish: a
}) {
  const o = await Xr.read({ fs: t, gitdir: i }), s = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set();
  for (const m of n)
    s.add(await ae.resolve({ fs: t, gitdir: i, ref: m }));
  for (const m of a)
    try {
      const g = await ae.resolve({ fs: t, gitdir: i, ref: m });
      l.add(g);
    } catch {
    }
  const f = /* @__PURE__ */ new Set();
  async function u(m) {
    f.add(m);
    const { type: g, object: y } = await Je({ fs: t, cache: e, gitdir: i, oid: m });
    if (g === "tag") {
      const A = wt.from(y).headers().object;
      return u(A);
    }
    if (g !== "commit")
      throw new pt(m, g, "commit");
    if (!o.has(m)) {
      const A = Ye.from(y).headers().parent;
      for (m of A)
        !l.has(m) && !f.has(m) && await u(m);
    }
  }
  for (const m of s)
    await u(m);
  return f;
}
async function Sn({
  fs: t,
  cache: e,
  dir: r,
  gitdir: i = ee.join(r, ".git"),
  oids: n
}) {
  const a = /* @__PURE__ */ new Set();
  async function o(s) {
    if (a.has(s)) return;
    a.add(s);
    const { type: l, object: f } = await Je({ fs: t, cache: e, gitdir: i, oid: s });
    if (l === "tag") {
      const m = wt.from(f).headers().object;
      await o(m);
    } else if (l === "commit") {
      const m = Ye.from(f).headers().tree;
      await o(m);
    } else if (l === "tree") {
      const u = _t.from(f);
      for (const m of u)
        m.type === "blob" && a.add(m.oid), m.type === "tree" && await o(m.oid);
    }
  }
  for (const s of n)
    await o(s);
  return a;
}
async function Lf(t) {
  const e = {};
  let r = "";
  const i = Qe.streamReader(t);
  let n = await i();
  for (; n !== !0; )
    n !== null && (r += n.toString("utf8") + \`
\`), n = await i();
  const a = r.toString("utf8").split(\`
\`);
  if (n = a.shift(), !n.startsWith("unpack "))
    throw new gr('unpack ok" or "unpack [error message]', n);
  e.ok = n === "unpack ok", e.ok || (e.error = n.slice(7)), e.refs = {};
  for (const o of a) {
    if (o.trim() === "") continue;
    const s = o.slice(0, 2), l = o.slice(3);
    let f = l.indexOf(" ");
    f === -1 && (f = l.length);
    const u = l.slice(0, f), m = l.slice(f + 1);
    e.refs[u] = {
      ok: s === "ok",
      error: m
    };
  }
  return e;
}
async function Pf({
  capabilities: t = [],
  triplets: e = []
}) {
  const r = [];
  let i = \`\\0 \${t.join(" ")}\`;
  for (const n of e)
    r.push(
      Qe.encode(
        \`\${n.oldoid} \${n.oid} \${n.fullRef}\${i}
\`
      )
    ), i = "";
  return r.push(Qe.flush()), r;
}
async function jf({
  fs: t,
  cache: e,
  http: r,
  onProgress: i,
  onMessage: n,
  onAuth: a,
  onAuthSuccess: o,
  onAuthFailure: s,
  onPrePush: l,
  gitdir: f,
  ref: u,
  remoteRef: m,
  remote: g,
  url: y,
  force: E = !1,
  delete: A = !1,
  corsProxy: R,
  headers: I = {}
}) {
  const T = u || await sr({ fs: t, gitdir: f });
  if (typeof T > "u")
    throw new yt("ref");
  const D = await rt.get({ fs: t, gitdir: f });
  g = g || await D.get(\`branch.\${T}.pushRemote\`) || await D.get("remote.pushDefault") || await D.get(\`branch.\${T}.remote\`) || "origin";
  const P = y || await D.get(\`remote.\${g}.pushurl\`) || await D.get(\`remote.\${g}.url\`);
  if (typeof P > "u")
    throw new yt("remote OR url");
  const M = m || await D.get(\`branch.\${T}.merge\`);
  if (typeof P > "u")
    throw new yt("remoteRef");
  R === void 0 && (R = await D.get("http.corsProxy"));
  const U = await ae.expand({ fs: t, gitdir: f, ref: T }), $ = A ? "0000000000000000000000000000000000000000" : await ae.resolve({ fs: t, gitdir: f, ref: U }), O = Mi.getRemoteHelperFor({ url: P }), q = await O.discover({
    http: r,
    onAuth: a,
    onAuthSuccess: o,
    onAuthFailure: s,
    corsProxy: R,
    service: "git-receive-pack",
    url: P,
    headers: I,
    protocolVersion: 1
  }), z = q.auth;
  let Y;
  if (!M)
    Y = U;
  else
    try {
      Y = await ae.expandAgainstMap({
        ref: M,
        map: q.refs
      });
    } catch (be) {
      if (be instanceof Pe)
        Y = M.startsWith("refs/") ? M : \`refs/heads/\${M}\`;
      else
        throw be;
    }
  const N = q.refs.get(Y) || "0000000000000000000000000000000000000000";
  if (l && !await l({
    remote: g,
    url: P,
    localRef: { ref: A ? "(delete)" : U, oid: $ },
    remoteRef: { ref: Y, oid: N }
  }))
    throw new Mr();
  const J = !q.capabilities.has("no-thin");
  let oe = /* @__PURE__ */ new Set();
  if (!A) {
    const be = [...q.refs.values()];
    let Ae = /* @__PURE__ */ new Set();
    if (N !== "0000000000000000000000000000000000000000") {
      const ye = await sa({
        fs: t,
        cache: e,
        gitdir: f,
        oids: [$, N]
      });
      for (const Be of ye) be.push(Be);
      J && (Ae = await Sn({ fs: t, cache: e, gitdir: f, oids: ye }));
    }
    if (!be.includes($)) {
      const ye = await Mf({
        fs: t,
        cache: e,
        gitdir: f,
        start: [$],
        finish: be
      });
      oe = await Sn({ fs: t, cache: e, gitdir: f, oids: ye });
    }
    if (J) {
      try {
        const ye = await ae.resolve({
          fs: t,
          gitdir: f,
          ref: \`refs/remotes/\${g}/HEAD\`,
          depth: 2
        }), { oid: Be } = await ae.resolveAgainstMap({
          ref: ye.replace(\`refs/remotes/\${g}/\`, ""),
          fullref: ye,
          map: q.refs
        }), ke = [Be];
        for (const Ee of await Sn({ fs: t, cache: e, gitdir: f, oids: ke }))
          Ae.add(Ee);
      } catch {
      }
      for (const ye of Ae)
        oe.delete(ye);
    }
    if ($ === N && (E = !0), !E) {
      if (U.startsWith("refs/tags") && N !== "0000000000000000000000000000000000000000")
        throw new Rr("tag-exists");
      if ($ !== "0000000000000000000000000000000000000000" && N !== "0000000000000000000000000000000000000000" && !await Ts({
        fs: t,
        cache: e,
        gitdir: f,
        oid: $,
        ancestor: N,
        depth: -1
      }))
        throw new Rr("not-fast-forward");
    }
  }
  const _e = _s(
    [...q.capabilities],
    ["report-status", "side-band-64k", \`agent=\${Li.agent}\`]
  ), re = await Pf({
    capabilities: _e,
    triplets: [{ oldoid: N, oid: $, fullRef: Y }]
  }), X = A ? [] : await $s({
    fs: t,
    cache: e,
    gitdir: f,
    oids: [...oe]
  }), ie = await O.connect({
    http: r,
    onProgress: i,
    corsProxy: R,
    service: "git-receive-pack",
    url: P,
    auth: z,
    headers: I,
    body: [...re, ...X]
  }), { packfile: de, progress: xe } = await vs.demux(ie.body);
  if (n) {
    const be = bs(xe);
    pi(be, async (Ae) => {
      await n(Ae);
    });
  }
  const Re = await Lf(de);
  if (ie.headers && (Re.headers = ie.headers), g && Re.ok && Re.refs[Y].ok && !U.startsWith("refs/tags")) {
    const be = \`refs/remotes/\${g}/\${Y.replace(
      "refs/heads",
      ""
    )}\`;
    A ? await ae.deleteRef({ fs: t, gitdir: f, ref: be }) : await ae.writeRef({ fs: t, gitdir: f, ref: be, value: $ });
  }
  if (Re.ok && Object.values(Re.refs).every((be) => be.ok))
    return Re;
  {
    const be = Object.entries(Re.refs).filter(([Ae, ye]) => !ye.ok).map(([Ae, ye]) => \`
  - \${Ae}: \${ye.error}\`).join("");
    throw new ni(be, Re);
  }
}
async function zf({
  fs: t,
  http: e,
  onProgress: r,
  onMessage: i,
  onAuth: n,
  onAuthSuccess: a,
  onAuthFailure: o,
  onPrePush: s,
  dir: l,
  gitdir: f = ee.join(l, ".git"),
  ref: u,
  remoteRef: m,
  remote: g = "origin",
  url: y,
  force: E = !1,
  delete: A = !1,
  corsProxy: R,
  headers: I = {},
  cache: T = {}
}) {
  try {
    return H("fs", t), H("http", e), H("gitdir", f), await jf({
      fs: new me(t),
      cache: T,
      http: e,
      onProgress: r,
      onMessage: i,
      onAuth: n,
      onAuthSuccess: a,
      onAuthFailure: o,
      onPrePush: s,
      gitdir: f,
      ref: u,
      remoteRef: m,
      remote: g,
      url: y,
      force: E,
      delete: A,
      corsProxy: R,
      headers: I
    });
  } catch (D) {
    throw D.caller = "git.push", D;
  }
}
async function As({ fs: t, cache: e, gitdir: r, oid: i }) {
  const { type: n, object: a } = await Je({ fs: t, cache: e, gitdir: r, oid: i });
  if (n === "tag")
    return i = wt.from(a).parse().object, As({ fs: t, cache: e, gitdir: r, oid: i });
  if (n !== "blob")
    throw new pt(i, n, "blob");
  return { oid: i, blob: new Uint8Array(a) };
}
async function Ds({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  filepath: n = void 0
}) {
  return n !== void 0 && (i = await di({ fs: t, cache: e, gitdir: r, oid: i, filepath: n })), await As({
    fs: t,
    cache: e,
    gitdir: r,
    oid: i
  });
}
async function Hf({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  oid: i,
  filepath: n,
  cache: a = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("oid", i), await Ds({
      fs: new me(t),
      cache: a,
      gitdir: r,
      oid: i,
      filepath: n
    });
  } catch (o) {
    throw o.caller = "git.readBlob", o;
  }
}
async function Os({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  oid: i,
  cache: n = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("oid", i), await Ar({
      fs: new me(t),
      cache: n,
      gitdir: r,
      oid: i
    });
  } catch (a) {
    throw a.caller = "git.readCommit", a;
  }
}
async function qf({
  fs: t,
  cache: e,
  gitdir: r,
  ref: i = "refs/notes/commits",
  oid: n
}) {
  const a = await ae.resolve({ gitdir: r, fs: t, ref: i }), { blob: o } = await Ds({
    fs: t,
    cache: e,
    gitdir: r,
    oid: a,
    filepath: n
  });
  return o;
}
async function Wf({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  ref: i = "refs/notes/commits",
  oid: n,
  cache: a = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("ref", i), H("oid", n), await qf({
      fs: new me(t),
      cache: a,
      gitdir: r,
      ref: i,
      oid: n
    });
  } catch (o) {
    throw o.caller = "git.readNote", o;
  }
}
async function Gf({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  oid: i,
  format: n = "parsed",
  filepath: a = void 0,
  encoding: o = void 0,
  cache: s = {}
}) {
  try {
    H("fs", t), H("gitdir", r), H("oid", i);
    const l = new me(t);
    a !== void 0 && (i = await di({
      fs: l,
      cache: s,
      gitdir: r,
      oid: i,
      filepath: a
    }));
    const u = await Je({
      fs: l,
      cache: s,
      gitdir: r,
      oid: i,
      format: n === "parsed" ? "content" : n
    });
    if (u.oid = i, n === "parsed")
      switch (u.format = "parsed", u.type) {
        case "commit":
          u.object = Ye.from(u.object).parse();
          break;
        case "tree":
          u.object = _t.from(u.object).entries();
          break;
        case "blob":
          o ? u.object = u.object.toString(o) : (u.object = new Uint8Array(u.object), u.format = "content");
          break;
        case "tag":
          u.object = wt.from(u.object).parse();
          break;
        default:
          throw new pt(
            u.oid,
            u.type,
            "blob|commit|tag|tree"
          );
      }
    else (u.format === "deflated" || u.format === "wrapped") && (u.type = u.format);
    return u;
  } catch (l) {
    throw l.caller = "git.readObject", l;
  }
}
async function Zf({ fs: t, cache: e, gitdir: r, oid: i }) {
  const { type: n, object: a } = await Je({
    fs: t,
    cache: e,
    gitdir: r,
    oid: i,
    format: "content"
  });
  if (n !== "tag")
    throw new pt(i, n, "tag");
  const o = wt.from(a);
  return {
    oid: i,
    tag: o.parse(),
    payload: o.payload()
  };
}
async function Vf({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  oid: i,
  cache: n = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("oid", i), await Zf({
      fs: new me(t),
      cache: n,
      gitdir: r,
      oid: i
    });
  } catch (a) {
    throw a.caller = "git.readTag", a;
  }
}
async function Xf({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  oid: i,
  filepath: n = void 0,
  cache: a = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("oid", i), await Pr({
      fs: new me(t),
      cache: a,
      gitdir: r,
      oid: i,
      filepath: n
    });
  } catch (o) {
    throw o.caller = "git.readTree", o;
  }
}
async function Yf({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  filepath: i,
  cache: n = {}
}) {
  try {
    H("fs", t), H("gitdir", r), H("filepath", i), await at.acquire(
      { fs: new me(t), gitdir: r, cache: n },
      async function(a) {
        a.delete({ filepath: i });
      }
    );
  } catch (a) {
    throw a.caller = "git.remove", a;
  }
}
async function Kf({
  fs: t,
  cache: e,
  onSign: r,
  gitdir: i,
  ref: n = "refs/notes/commits",
  oid: a,
  author: o,
  committer: s,
  signingKey: l
}) {
  let f;
  try {
    f = await ae.resolve({ gitdir: i, fs: t, ref: n });
  } catch (E) {
    if (!(E instanceof Pe))
      throw E;
  }
  let m = (await Pr({
    fs: t,
    gitdir: i,
    oid: f || "4b825dc642cb6eb9a060e54bf8d69288fbee4904"
  })).tree;
  m = m.filter((E) => E.path !== a);
  const g = await wi({
    fs: t,
    gitdir: i,
    tree: m
  });
  return await Ui({
    fs: t,
    cache: e,
    onSign: r,
    gitdir: i,
    ref: n,
    tree: g,
    parent: f && [f],
    message: \`Note removed by 'isomorphic-git removeNote'
\`,
    author: o,
    committer: s,
    signingKey: l
  });
}
async function Jf({
  fs: t,
  onSign: e,
  dir: r,
  gitdir: i = ee.join(r, ".git"),
  ref: n = "refs/notes/commits",
  oid: a,
  author: o,
  committer: s,
  signingKey: l,
  cache: f = {}
}) {
  try {
    H("fs", t), H("gitdir", i), H("oid", a);
    const u = new me(t), m = await ar({ fs: u, gitdir: i, author: o });
    if (!m) throw new ft("author");
    const g = await $r({
      fs: u,
      gitdir: i,
      author: m,
      committer: s
    });
    if (!g) throw new ft("committer");
    return await Kf({
      fs: u,
      cache: f,
      onSign: e,
      gitdir: i,
      ref: n,
      oid: a,
      author: m,
      committer: g,
      signingKey: l
    });
  } catch (u) {
    throw u.caller = "git.removeNote", u;
  }
}
async function Qf({
  fs: t,
  gitdir: e,
  oldref: r,
  ref: i,
  checkout: n = !1
}) {
  if (i !== zt.clean(i))
    throw new Ct(i, zt.clean(i));
  if (r !== zt.clean(r))
    throw new Ct(r, zt.clean(r));
  const a = \`refs/heads/\${r}\`, o = \`refs/heads/\${i}\`;
  if (await ae.exists({ fs: t, gitdir: e, ref: o }))
    throw new Nt("branch", i, !1);
  const l = await ae.resolve({
    fs: t,
    gitdir: e,
    ref: a,
    depth: 1
  });
  await ae.writeRef({ fs: t, gitdir: e, ref: o, value: l }), await ae.deleteRef({ fs: t, gitdir: e, ref: a });
  const u = await sr({
    fs: t,
    gitdir: e,
    fullname: !0
  }) === a;
  (n || u) && await ae.writeSymbolicRef({
    fs: t,
    gitdir: e,
    ref: "HEAD",
    value: o
  });
}
async function eh({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  ref: i,
  oldref: n,
  checkout: a = !1
}) {
  try {
    return H("fs", t), H("gitdir", r), H("ref", i), H("oldref", n), await Qf({
      fs: new me(t),
      gitdir: r,
      ref: i,
      oldref: n,
      checkout: a
    });
  } catch (o) {
    throw o.caller = "git.renameBranch", o;
  }
}
async function Cs({ gitdir: t, type: e, object: r }) {
  return Xt(Nr.wrap({ type: e, object: r }));
}
async function th({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  filepath: i,
  ref: n,
  cache: a = {}
}) {
  try {
    H("fs", t), H("gitdir", r), H("filepath", i);
    const o = new me(t);
    let s, l;
    try {
      s = await ae.resolve({ fs: o, gitdir: r, ref: n || "HEAD" });
    } catch (m) {
      if (n)
        throw m;
    }
    if (s)
      try {
        s = await di({
          fs: o,
          cache: a,
          gitdir: r,
          oid: s,
          filepath: i
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
    const u = e && await o.read(ee.join(e, i));
    u && (l = await Cs({
      gitdir: r,
      type: "blob",
      object: u
    }), s === l && (f = await o.lstat(ee.join(e, i)))), await at.acquire({ fs: o, gitdir: r, cache: a }, async function(m) {
      m.delete({ filepath: i }), s && m.insert({ filepath: i, stats: f, oid: s });
    });
  } catch (o) {
    throw o.caller = "git.reset", o;
  }
}
async function rh({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  ref: i,
  depth: n
}) {
  try {
    return H("fs", t), H("gitdir", r), H("ref", i), await ae.resolve({
      fs: new me(t),
      gitdir: r,
      ref: i,
      depth: n
    });
  } catch (a) {
    throw a.caller = "git.resolveRef", a;
  }
}
async function ih({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  path: i,
  value: n,
  append: a = !1
}) {
  try {
    H("fs", t), H("gitdir", r), H("path", i);
    const o = new me(t), s = await rt.get({ fs: o, gitdir: r });
    a ? await s.append(i, n) : await s.set(i, n), await rt.save({ fs: o, gitdir: r, config: s });
  } catch (o) {
    throw o.caller = "git.setConfig", o;
  }
}
async function Ns({ fs: t, gitdir: e, commit: r }) {
  const i = Ye.from(r).toObject();
  return await bt({
    fs: t,
    gitdir: e,
    type: "commit",
    object: i,
    format: "content"
  });
}
class Di {
  // constructor removed
  static get timezoneOffsetForRefLogEntry() {
    const e = (/* @__PURE__ */ new Date()).getTimezoneOffset(), r = Math.abs(Math.floor(e / 60)), i = Math.abs(e % 60).toString().padStart(2, "0");
    return \`\${e > 0 ? "-" : "+"}\${r.toString().padStart(2, "0")}\${i}\`;
  }
  static createStashReflogEntry(e, r, i) {
    const n = e.name.replace(/\\s/g, ""), a = "0000000000000000000000000000000000000000", o = Math.floor(Date.now() / 1e3), s = Di.timezoneOffsetForRefLogEntry;
    return \`\${a} \${r} \${n} \${e.email} \${o} \${s}	\${i}
\`;
  }
  static getStashReflogEntry(e, r = !1) {
    return e.split(\`
\`).filter((a) => a).reverse().map(
      (a, o) => r ? \`stash@{\${o}}: \${a.split("	")[1]}\` : a
    );
  }
}
const nh = {
  stage: Cr,
  workdir: hi
};
let In;
async function Dr(t, e) {
  return In === void 0 && (In = new Zr()), In.acquire(t, e);
}
async function ah(t, e, r, i, n = null) {
  const a = ee.join(r, i), o = await t.lstat(a);
  if (!o) throw new Pe(a);
  if (o.isDirectory())
    throw new Te(
      \`\${a}: file expected, but found directory\`
    );
  const s = n ? await ns({ fs: t, gitdir: e, oid: n }) : void 0;
  let l = s ? n : void 0;
  return s || await Dr({ fs: t, gitdir: e, currentFilepath: a }, async () => {
    const f = o.isSymbolicLink() ? await t.readlink(a).then(us) : await t.read(a);
    if (f === null) throw new Pe(a);
    l = await bt({ fs: t, gitdir: e, type: "blob", object: f });
  }), l;
}
async function oh({ fs: t, dir: e, gitdir: r, entries: i }) {
  async function n(a) {
    if (a.type === "tree") {
      if (!a.oid) {
        const o = await Promise.all(a.children.map(n));
        a.oid = await wi({
          fs: t,
          gitdir: r,
          tree: o
        }), a.mode = 16384;
      }
    } else a.type === "blob" && (a.oid = await ah(
      t,
      r,
      e,
      a.path,
      a.oid
    ), a.mode = 33188);
    return a.path = a.path.split("/").pop(), a;
  }
  return Promise.all(i.map(n));
}
async function mo({
  fs: t,
  dir: e,
  gitdir: r,
  treePair: i
  // [TREE({ ref: 'HEAD' }), 'STAGE'] would be the equivalent of \`git write-tree\`
}) {
  const n = i[1] === "stage", a = i.map((y) => typeof y == "string" ? nh[y]() : y), o = [], u = await nr({
    fs: t,
    cache: {},
    dir: e,
    gitdir: r,
    trees: a,
    map: async (y, [E, A]) => {
      if (!(y === "." || await Lr.isIgnored({ fs: t, dir: e, gitdir: r, filepath: y })) && A)
        return (!E || await E.oid() !== await A.oid() && await A.oid() !== void 0) && o.push([E, A]), {
          mode: await A.mode(),
          path: y,
          oid: await A.oid(),
          type: await A.type()
        };
    },
    reduce: async (y, E) => (E = E.filter(Boolean), y ? (y.children = E, y) : E.length > 0 ? E : void 0),
    iterate: async (y, E) => {
      const A = [];
      for (const R of E) {
        const [I, T] = R;
        n ? T && (await t.exists(\`\${e}/\${T.toString()}\`) ? A.push(R) : o.push([null, T])) : I && (T ? A.push(R) : o.push([I, null]));
      }
      return A.length ? Promise.all(A.map(y)) : [];
    }
  });
  if (o.length === 0 || u.length === 0)
    return null;
  const g = (await oh({
    fs: t,
    dir: e,
    gitdir: r,
    entries: u
  })).filter(Boolean).map((y) => ({
    mode: y.mode,
    path: y.path,
    oid: y.oid,
    type: y.type
  }));
  return wi({ fs: t, gitdir: r, tree: g });
}
async function sh({
  fs: t,
  dir: e,
  gitdir: r,
  stashCommit: i,
  parentCommit: n,
  wasStaged: a
}) {
  const o = [], s = [], l = await nr({
    fs: t,
    cache: {},
    dir: e,
    gitdir: r,
    trees: [Bt({ ref: n }), Bt({ ref: i })],
    map: async (f, [u, m]) => {
      if (f === "." || await Lr.isIgnored({ fs: t, dir: e, gitdir: r, filepath: f }))
        return;
      const g = m ? await m.type() : await u.type();
      if (g !== "tree" && g !== "blob")
        return;
      if (!m && u) {
        const E = g === "tree" ? "rmdir" : "rm";
        return g === "tree" && o.push(f), g === "blob" && a && s.push({ filepath: f, oid: await u.oid() }), { method: E, filepath: f };
      }
      const y = await m.oid();
      if (!u || await u.oid() !== y)
        return g === "tree" ? { method: "mkdir", filepath: f } : (a && s.push({
          filepath: f,
          oid: y,
          stats: await t.lstat(ee.join(e, f))
        }), {
          method: "write",
          filepath: f,
          oid: y
        });
    }
  });
  await Dr({ fs: t, gitdir: r, dirRemoved: o, ops: l }, async () => {
    for (const f of l) {
      const u = ee.join(e, f.filepath);
      switch (f.method) {
        case "rmdir":
          await t.rmdir(u);
          break;
        case "mkdir":
          await t.mkdir(u);
          break;
        case "rm":
          await t.rm(u);
          break;
        case "write":
          if (!o.some(
            (m) => u.startsWith(m)
          )) {
            const { object: m } = await Je({
              fs: t,
              cache: {},
              gitdir: r,
              oid: f.oid
            });
            await t.exists(u) && await t.rm(u), await t.write(u, m);
          }
          break;
      }
    }
  }), await at.acquire({ fs: t, gitdir: r, cache: {} }, async (f) => {
    s.forEach(({ filepath: u, stats: m, oid: g }) => {
      f.insert({ filepath: u, stats: m, oid: g });
    });
  });
}
class Vt {
  constructor({ fs: e, dir: r, gitdir: i = ee.join(r, ".git") }) {
    Object.assign(this, {
      fs: e,
      dir: r,
      gitdir: i,
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
    return ee.join(this.gitdir, Vt.refStash);
  }
  get refLogsStashPath() {
    return ee.join(this.gitdir, Vt.refLogsStash);
  }
  async getAuthor() {
    if (!this._author && (this._author = await ar({
      fs: this.fs,
      gitdir: this.gitdir,
      author: {}
    }), !this._author))
      throw new ft("author");
    return this._author;
  }
  async getStashSHA(e, r) {
    return await this.fs.exists(this.refStashPath) ? (r || await this.readStashReflogs({ parsed: !1 }))[e].split(" ")[1] : null;
  }
  async writeStashCommit({ message: e, tree: r, parent: i }) {
    return Ns({
      fs: this.fs,
      gitdir: this.gitdir,
      commit: {
        message: e,
        tree: r,
        parent: i,
        author: await this.getAuthor(),
        committer: await this.getAuthor()
      }
    });
  }
  async readStashCommit(e) {
    const r = await this.readStashReflogs({ parsed: !1 });
    if (e !== 0 && (e < 0 || e > r.length - 1))
      throw new Ct(
        \`stash@\${e}\`,
        "number that is in range of [0, num of stash pushed]"
      );
    const i = await this.getStashSHA(e, r);
    return i ? Ar({
      fs: this.fs,
      cache: {},
      gitdir: this.gitdir,
      oid: i
    }) : {};
  }
  async writeStashRef(e) {
    return ae.writeRef({
      fs: this.fs,
      gitdir: this.gitdir,
      ref: Vt.refStash,
      value: e
    });
  }
  async writeStashReflogEntry({ stashCommit: e, message: r }) {
    const i = await this.getAuthor(), n = Di.createStashReflogEntry(
      i,
      e,
      r
    ), a = this.refLogsStashPath;
    await Dr({ filepath: a, entry: n }, async () => {
      const o = await this.fs.exists(a) ? await this.fs.read(a, "utf8") : "";
      await this.fs.write(a, o + n, "utf8");
    });
  }
  async readStashReflogs({ parsed: e = !1 }) {
    if (!await this.fs.exists(this.refLogsStashPath))
      return [];
    const i = (await this.fs.read(this.refLogsStashPath)).toString();
    return Di.getStashReflogEntry(i, e);
  }
}
async function ch({ fs: t, dir: e, gitdir: r, message: i = "" }) {
  const n = new Vt({ fs: t, dir: e, gitdir: r });
  await n.getAuthor();
  const a = await sr({
    fs: t,
    gitdir: r,
    fullname: !1
  }), o = await ae.resolve({
    fs: t,
    gitdir: r,
    ref: "HEAD"
  }), l = (await Os({ fs: t, dir: e, gitdir: r, oid: o })).commit.message, f = [o];
  let u = null, m = Bt({ ref: "HEAD" });
  const g = await mo({
    fs: t,
    dir: e,
    gitdir: r,
    treePair: [Bt({ ref: "HEAD" }), "stage"]
  });
  if (g) {
    const R = await n.writeStashCommit({
      message: \`stash-Index: WIP on \${a} - \${(/* @__PURE__ */ new Date()).toISOString()}\`,
      tree: g,
      // stashCommitTree
      parent: f
    });
    f.push(R), u = g, m = Cr();
  }
  const y = await mo({
    fs: t,
    dir: e,
    gitdir: r,
    treePair: [m, "workdir"]
  });
  if (y) {
    const R = await n.writeStashCommit({
      message: \`stash-WorkDir: WIP on \${a} - \${(/* @__PURE__ */ new Date()).toISOString()}\`,
      tree: y,
      parent: [f[f.length - 1]]
    });
    f.push(R), u = y;
  }
  if (!u || !g && !y)
    throw new Pe("changes, nothing to stash");
  const E = (i.trim() || \`WIP on \${a}\`) + \`: \${o.substring(0, 7)} \${l}\`, A = await n.writeStashCommit({
    message: E,
    tree: u,
    parent: f
  });
  return await n.writeStashRef(A), await n.writeStashReflogEntry({
    stashCommit: A,
    message: E
  }), await gs({
    fs: t,
    dir: e,
    gitdir: r,
    ref: a,
    track: !1,
    force: !0
    // force checkout to discard changes
  }), A;
}
async function Fs({ fs: t, dir: e, gitdir: r, refIdx: i = 0 }) {
  const a = await new Vt({ fs: t, dir: e, gitdir: r }).readStashCommit(i), { parent: o = null } = a.commit ? a.commit : {};
  if (!(!o || !Array.isArray(o)))
    for (let s = 0; s < o.length - 1; s++) {
      const f = (await Ar({
        fs: t,
        cache: {},
        gitdir: r,
        oid: o[s + 1]
      })).commit.message.startsWith("stash-Index");
      await sh({
        fs: t,
        dir: e,
        gitdir: r,
        stashCommit: o[s + 1],
        parentCommit: o[s],
        wasStaged: f
      });
    }
}
async function Us({ fs: t, dir: e, gitdir: r, refIdx: i = 0 }) {
  const n = new Vt({ fs: t, dir: e, gitdir: r });
  if (!(await n.readStashCommit(i)).commit)
    return;
  const o = n.refStashPath;
  await Dr(o, async () => {
    await t.exists(o) && await t.rm(o);
  });
  const s = await n.readStashReflogs({ parsed: !1 });
  if (!s.length)
    return;
  s.splice(i, 1);
  const l = n.refLogsStashPath;
  await Dr({ reflogEntries: s, stashReflogPath: l, stashMgr: n }, async () => {
    if (s.length) {
      await t.write(l, s.join(\`
\`), "utf8");
      const f = s[s.length - 1].split(
        " "
      )[1];
      await n.writeStashRef(f);
    } else
      await t.rm(l);
  });
}
async function lh({ fs: t, dir: e, gitdir: r }) {
  return new Vt({ fs: t, dir: e, gitdir: r }).readStashReflogs({ parsed: !0 });
}
async function uh({ fs: t, dir: e, gitdir: r }) {
  const i = new Vt({ fs: t, dir: e, gitdir: r }), n = [i.refStashPath, i.refLogsStashPath];
  await Dr(n, async () => {
    await Promise.all(
      n.map(async (a) => {
        if (await t.exists(a))
          return t.rm(a);
      })
    );
  });
}
async function fh({ fs: t, dir: e, gitdir: r, refIdx: i = 0 }) {
  await Fs({ fs: t, dir: e, gitdir: r, refIdx: i }), await Us({ fs: t, dir: e, gitdir: r, refIdx: i });
}
async function hh({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  op: i = "push",
  message: n = "",
  refIdx: a = 0
}) {
  H("fs", t), H("dir", e), H("gitdir", r), H("op", i);
  const o = {
    push: ch,
    apply: Fs,
    drop: Us,
    list: lh,
    clear: uh,
    pop: fh
  }, s = ["apply", "drop", "pop"];
  try {
    const l = new me(t);
    ["refs", "logs", "logs/refs"].map((m) => ee.join(r, m)).forEach(async (m) => {
      await l.exists(m) || await l.mkdir(m);
    });
    const u = o[i];
    if (u) {
      if (s.includes(i) && a < 0)
        throw new Ct(
          \`stash@\${a}\`,
          "number that is in range of [0, num of stash pushed]"
        );
      return await u({ fs: l, dir: e, gitdir: r, message: n, refIdx: a });
    }
    throw new Error(\`To be implemented: \${i}\`);
  } catch (l) {
    throw l.caller = "git.stash", l;
  }
}
async function dh({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  filepath: i,
  cache: n = {}
}) {
  try {
    H("fs", t), H("gitdir", r), H("filepath", i);
    const a = new me(t);
    if (await Lr.isIgnored({
      fs: a,
      gitdir: r,
      dir: e,
      filepath: i
    }))
      return "ignored";
    const s = await wh({ fs: a, cache: n, gitdir: r }), l = await Ms({
      fs: a,
      cache: n,
      gitdir: r,
      tree: s,
      path: i
    }), f = await at.acquire(
      { fs: a, gitdir: r, cache: n },
      async function(A) {
        for (const R of A)
          if (R.path === i) return R;
        return null;
      }
    ), u = await a.lstat(ee.join(e, i)), m = l !== null, g = f !== null, y = u !== null, E = async () => {
      if (g && !xi(f, u))
        return f.oid;
      {
        const A = await a.read(ee.join(e, i)), R = await Cs({
          gitdir: r,
          type: "blob",
          object: A
        });
        return g && f.oid === R && u.size !== -1 && at.acquire({ fs: a, gitdir: r, cache: n }, async function(I) {
          I.insert({ filepath: i, stats: u, oid: R });
        }), R;
      }
    };
    if (!m && !y && !g) return "absent";
    if (!m && !y && g) return "*absent";
    if (!m && y && !g) return "*added";
    if (!m && y && g)
      return await E() === f.oid ? "added" : "*added";
    if (m && !y && !g) return "deleted";
    if (m && !y && g)
      return l === f.oid, "*deleted";
    if (m && y && !g)
      return await E() === l ? "*undeleted" : "*undeletemodified";
    if (m && y && g) {
      const A = await E();
      return A === l ? A === f.oid ? "unmodified" : "*unmodified" : A === f.oid ? "modified" : "*modified";
    }
  } catch (a) {
    throw a.caller = "git.status", a;
  }
}
async function Ms({ fs: t, cache: e, gitdir: r, tree: i, path: n }) {
  typeof n == "string" && (n = n.split("/"));
  const a = n.shift();
  for (const o of i)
    if (o.path === a) {
      if (n.length === 0)
        return o.oid;
      const { type: s, object: l } = await Je({
        fs: t,
        cache: e,
        gitdir: r,
        oid: o.oid
      });
      if (s === "tree") {
        const f = _t.from(l);
        return Ms({ fs: t, cache: e, gitdir: r, tree: f, path: n });
      }
      if (s === "blob")
        throw new pt(o.oid, s, "blob", n.join("/"));
    }
  return null;
}
async function wh({ fs: t, cache: e, gitdir: r }) {
  let i;
  try {
    i = await ae.resolve({ fs: t, gitdir: r, ref: "HEAD" });
  } catch (a) {
    if (a instanceof Pe)
      return [];
  }
  const { tree: n } = await Pr({ fs: t, cache: e, gitdir: r, oid: i });
  return n;
}
async function ph({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  ref: i = "HEAD",
  filepaths: n = ["."],
  filter: a,
  cache: o = {},
  ignored: s = !1
}) {
  try {
    H("fs", t), H("gitdir", r), H("ref", i);
    const l = new me(t);
    return await nr({
      fs: l,
      cache: o,
      dir: e,
      gitdir: r,
      trees: [Bt({ ref: i }), hi(), Cr()],
      map: async function(f, [u, m, g]) {
        if (!u && !g && m && !s && await Lr.isIgnored({
          fs: l,
          dir: e,
          filepath: f
        }) || !n.some((U) => ms(f, U)))
          return null;
        if (a && !a(f))
          return;
        const [y, E, A] = await Promise.all([
          u && u.type(),
          m && m.type(),
          g && g.type()
        ]), R = [y, E, A].includes("blob");
        if ((y === "tree" || y === "special") && !R) return;
        if (y === "commit") return null;
        if ((E === "tree" || E === "special") && !R)
          return;
        if (A === "commit") return null;
        if ((A === "tree" || A === "special") && !R) return;
        const I = y === "blob" ? await u.oid() : void 0, T = A === "blob" ? await g.oid() : void 0;
        let D;
        y !== "blob" && E === "blob" && A !== "blob" ? D = "42" : E === "blob" && (D = await m.oid());
        const P = [void 0, I, D, T], M = P.map((U) => P.indexOf(U));
        return M.shift(), [f, ...M];
      }
    });
  } catch (l) {
    throw l.caller = "git.statusMatrix", l;
  }
}
async function mh({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  ref: i,
  object: n,
  force: a = !1
}) {
  try {
    H("fs", t), H("gitdir", r), H("ref", i);
    const o = new me(t);
    if (i === void 0)
      throw new yt("ref");
    i = i.startsWith("refs/tags/") ? i : \`refs/tags/\${i}\`;
    const s = await ae.resolve({
      fs: o,
      gitdir: r,
      ref: n || "HEAD"
    });
    if (!a && await ae.exists({ fs: o, gitdir: r, ref: i }))
      throw new Nt("tag", i);
    await ae.writeRef({ fs: o, gitdir: r, ref: i, value: s });
  } catch (o) {
    throw o.caller = "git.tag", o;
  }
}
async function gh({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  cache: i = {},
  filepath: n,
  oid: a,
  mode: o,
  add: s,
  remove: l,
  force: f
}) {
  try {
    H("fs", t), H("gitdir", r), H("filepath", n);
    const u = new me(t);
    if (l)
      return await at.acquire(
        { fs: u, gitdir: r, cache: i },
        async function(g) {
          if (!f) {
            const y = await u.lstat(ee.join(e, n));
            if (y) {
              if (y.isDirectory())
                throw new ir("directory");
              return;
            }
          }
          g.has({ filepath: n }) && g.delete({
            filepath: n
          });
        }
      );
    let m;
    if (!a) {
      if (m = await u.lstat(ee.join(e, n)), !m)
        throw new Pe(
          \`file at "\${n}" on disk and "remove" not set\`
        );
      if (m.isDirectory())
        throw new ir("directory");
    }
    return await at.acquire({ fs: u, gitdir: r, cache: i }, async function(g) {
      if (!s && !g.has({ filepath: n }))
        throw new Pe(
          \`file at "\${n}" in index and "add" not set\`
        );
      let y;
      if (a)
        y = {
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
        y = m;
        const E = y.isSymbolicLink() ? await u.readlink(ee.join(e, n)) : await u.read(ee.join(e, n));
        a = await bt({
          fs: u,
          gitdir: r,
          type: "blob",
          format: "content",
          object: E
        });
      }
      return g.insert({
        filepath: n,
        oid: a,
        stats: y
      }), a;
    });
  } catch (u) {
    throw u.caller = "git.updateIndex", u;
  }
}
function yh() {
  try {
    return Li.version;
  } catch (t) {
    throw t.caller = "git.version", t;
  }
}
async function _h({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  trees: i,
  map: n,
  reduce: a,
  iterate: o,
  cache: s = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("trees", i), await nr({
      fs: new me(t),
      cache: s,
      dir: e,
      gitdir: r,
      trees: i,
      map: n,
      reduce: a,
      iterate: o
    });
  } catch (l) {
    throw l.caller = "git.walk", l;
  }
}
async function bh({ fs: t, dir: e, gitdir: r = ee.join(e, ".git"), blob: i }) {
  try {
    return H("fs", t), H("gitdir", r), H("blob", i), await bt({
      fs: new me(t),
      gitdir: r,
      type: "blob",
      object: i,
      format: "content"
    });
  } catch (n) {
    throw n.caller = "git.writeBlob", n;
  }
}
async function vh({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  commit: i
}) {
  try {
    return H("fs", t), H("gitdir", r), H("commit", i), await Ns({
      fs: new me(t),
      gitdir: r,
      commit: i
    });
  } catch (n) {
    throw n.caller = "git.writeCommit", n;
  }
}
async function Eh({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  type: i,
  object: n,
  format: a = "parsed",
  oid: o,
  encoding: s = void 0
}) {
  try {
    const l = new me(t);
    if (a === "parsed") {
      switch (i) {
        case "commit":
          n = Ye.from(n).toObject();
          break;
        case "tree":
          n = _t.from(n).toObject();
          break;
        case "blob":
          n = fe.from(n, s);
          break;
        case "tag":
          n = wt.from(n).toObject();
          break;
        default:
          throw new pt(o || "", i, "blob|commit|tag|tree");
      }
      a = "content";
    }
    return o = await bt({
      fs: l,
      gitdir: r,
      type: i,
      object: n,
      oid: o,
      format: a
    }), o;
  } catch (l) {
    throw l.caller = "git.writeObject", l;
  }
}
async function kh({
  fs: t,
  dir: e,
  gitdir: r = ee.join(e, ".git"),
  ref: i,
  value: n,
  force: a = !1,
  symbolic: o = !1
}) {
  try {
    H("fs", t), H("gitdir", r), H("ref", i), H("value", n);
    const s = new me(t);
    if (i !== zt.clean(i))
      throw new Ct(i, zt.clean(i));
    if (!a && await ae.exists({ fs: s, gitdir: r, ref: i }))
      throw new Nt("ref", i);
    o ? await ae.writeSymbolicRef({
      fs: s,
      gitdir: r,
      ref: i,
      value: n
    }) : (n = await ae.resolve({
      fs: s,
      gitdir: r,
      ref: n
    }), await ae.writeRef({
      fs: s,
      gitdir: r,
      ref: i,
      value: n
    }));
  } catch (s) {
    throw s.caller = "git.writeRef", s;
  }
}
async function xh({ fs: t, gitdir: e, tag: r }) {
  const i = wt.from(r).toObject();
  return await bt({
    fs: t,
    gitdir: e,
    type: "tag",
    object: i,
    format: "content"
  });
}
async function Sh({ fs: t, dir: e, gitdir: r = ee.join(e, ".git"), tag: i }) {
  try {
    return H("fs", t), H("gitdir", r), H("tag", i), await xh({
      fs: new me(t),
      gitdir: r,
      tag: i
    });
  } catch (n) {
    throw n.caller = "git.writeTag", n;
  }
}
async function Ih({ fs: t, dir: e, gitdir: r = ee.join(e, ".git"), tree: i }) {
  try {
    return H("fs", t), H("gitdir", r), H("tree", i), await wi({
      fs: new me(t),
      gitdir: r,
      tree: i
    });
  } catch (n) {
    throw n.caller = "git.writeTree", n;
  }
}
var ne = {
  Errors: Ql,
  STAGE: Cr,
  TREE: Bt,
  WORKDIR: hi,
  add: gu,
  abortMerge: du,
  addNote: _u,
  addRemote: bu,
  annotatedTag: Eu,
  branch: xu,
  checkout: gs,
  clone: Fu,
  commit: Uu,
  getConfig: af,
  getConfigAll: sf,
  setConfig: ih,
  currentBranch: Mu,
  deleteBranch: Pu,
  deleteRef: ju,
  deleteRemote: Hu,
  deleteTag: Wu,
  expandOid: Xu,
  expandRef: Yu,
  fastForward: ef,
  fetch: tf,
  findMergeBase: rf,
  findRoot: nf,
  getRemoteInfo: cf,
  getRemoteInfo2: lf,
  hashBlob: ff,
  indexPack: df,
  init: wf,
  isDescendent: pf,
  isIgnored: mf,
  listBranches: gf,
  listFiles: _f,
  listNotes: vf,
  listRefs: Ef,
  listRemotes: xf,
  listServerRefs: Tf,
  listTags: Rf,
  log: Df,
  merge: Of,
  packObjects: Ff,
  pull: Uf,
  push: zf,
  readBlob: Hf,
  readCommit: Os,
  readNote: Wf,
  readObject: Gf,
  readTag: Vf,
  readTree: Xf,
  remove: Yf,
  removeNote: Jf,
  renameBranch: eh,
  resetIndex: th,
  updateIndex: gh,
  resolveRef: rh,
  status: dh,
  statusMatrix: ph,
  tag: mh,
  version: yh,
  walk: _h,
  writeBlob: bh,
  writeCommit: vh,
  writeObject: Eh,
  writeRef: kh,
  writeTag: Sh,
  writeTree: Ih,
  stash: hh
};
function Th(t) {
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
function Rh(t) {
  return t[Symbol.asyncIterator] ? t[Symbol.asyncIterator]() : t[Symbol.iterator] ? t[Symbol.iterator]() : t.next ? t : Th(t);
}
async function Bh(t, e) {
  const r = Rh(t);
  for (; ; ) {
    const { value: i, done: n } = await r.next();
    if (i && await e(i), n) break;
  }
  r.return && r.return();
}
async function $h(t) {
  let e = 0;
  const r = [];
  await Bh(t, (a) => {
    r.push(a), e += a.byteLength;
  });
  const i = new Uint8Array(e);
  let n = 0;
  for (const a of r)
    i.set(a, n), n += a.byteLength;
  return i;
}
function Ah(t) {
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
async function Dh({
  onProgress: t,
  url: e,
  method: r = "GET",
  headers: i = {},
  body: n
}) {
  n && (n = await $h(n));
  const a = await fetch(e, { method: r, headers: i, body: n }), o = a.body && a.body.getReader ? Ah(a.body) : [new Uint8Array(await a.arrayBuffer())];
  i = {};
  for (const [s, l] of a.headers.entries())
    i[s] = l;
  return {
    url: a.url,
    method: a.method,
    statusCode: a.status,
    statusMessage: a.statusText,
    body: o,
    headers: i
  };
}
var $t = { request: Dh };
class mi {
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
const jr = {
  corsProxy: "http://localhost:9000/",
  logging: {
    fsManagerES6: !0,
    memoryBackendES6: !0,
    dotGit: !0
  }
}, Oh = new mi(jr.logging.memoryBackendAMD);
function go(...t) {
  Oh.consoleDotError("[ SWUtils ]", ...t);
}
class Ls {
  constructor() {
  }
  async fetchWithServiceWorker(e, r) {
    try {
      const i = await fetch("/git", {
        method: "POST",
        body: JSON.stringify({ operation: e, args: r }),
        headers: { "Content-Type": "application/json" }
      });
      let n;
      try {
        n = await i.json();
      } catch (a) {
        throw go("Error parsing JSON response:", a), new Error("Response is not valid JSON");
      }
      if (!i.ok) {
        let a = \`Fetch failed with status: \${i.status}\`;
        switch (i.status) {
          case 400:
            a = "Bad Request: The server could not understand the request.";
            break;
          case 401:
            a = "Unauthorized: Authentication is required or has failed.";
            break;
          case 403:
            a = "Forbidden: You do not have permission to access this resource.";
            break;
          case 404:
            a = "Not Found: The requested resource could not be found.";
            break;
          case 500:
            a = "Internal Server Error: The server encountered an error.";
            break;
          case 502:
            a = "Bad Gateway: The server received an invalid response from the upstream server.";
            break;
          case 503:
            a = "Service Unavailable: The server is currently unable to handle the request.";
            break;
          case 504:
            a = "Gateway Timeout: The server did not receive a timely response from the upstream server.";
            break;
          default:
            a = \`Unexpected status code: \${i.status}\`;
        }
        throw new Error(JSON.stringify(n.details));
      }
    } catch (i) {
      throw go("Fetch error:", i), i;
    }
  }
  async sendMessageToChannel(e, r = "worker-channel") {
    return new Promise((i) => {
      const n = new BroadcastChannel(r);
      n.onmessage = (a) => {
        a.data.operation === \`\${e.operation}\` && (n.close(), i(a.data));
      }, n.postMessage(e);
    });
  }
}
const Ps = new mi(jr.logging.memoryBackendES6);
function st(...t) {
  Ps.consoleDotLog("[MemoryBackend ES6]", ...t);
}
function Wr(...t) {
  Ps.consoleDotError("[MemoryBackend ES6]", ...t);
}
function Ch() {
  return "tab-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
}
st("Loading memoryBackend module");
class Nh {
  constructor(e = {}, r = "default") {
    this.dbName = r, this.options = e, this.deviceId = e.deviceId || Ch(), this._files = /* @__PURE__ */ new Map(), this.versionVector = { [this.deviceId]: 0 }, this.swUtilsInstance = new Ls(), this.channel = null, this.isProcessing = !1, this.pendingUpdates = [], this.processingQueue = !1, this._initializeRoot(), this.options?.supportsServiceWorker && this.options?.useSW && this._setupReceiveChannel(), Promise.resolve().then(() => this._requestInitialSync()), st(\`Initialized with dbName: \${this.dbName}, deviceId: \${this.deviceId}\`);
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
    for (const i in e) {
      const n = this.versionVector[i] || 0;
      e[i] > n && (r = !0);
    }
    return r;
  }
  _mergeVersionVector(e) {
    for (const r in e)
      (!this.versionVector[r] || e[r] > this.versionVector[r]) && (this.versionVector[r] = e[r]);
  }
  _requestInitialSync() {
    try {
      const e = new BroadcastChannel(\`memory-backend-\${this.dbName}\`);
      e.postMessage({
        operation: "memorySyncRequest",
        data: {
          dbName: this.dbName,
          requesterVV: this.versionVector,
          requesterId: this.deviceId
        }
      }), e.close(), st("Initial sync request sent");
    } catch (e) {
      Wr("Failed to send initial sync request:", e);
    }
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
      st("Queueing update due to ongoing processing"), this.pendingUpdates.push(r);
      return;
    }
    try {
      this.isProcessing = !0, st("Sending files to SW:", r);
      const i = new BroadcastChannel(\`memory-backend-\${this.dbName}\`);
      i.postMessage(r), i.close(), st("Files sent to SW successfully"), await this._processPendingUpdates();
    } catch (i) {
      Wr("Failed to send files to SW:", i);
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
          st("Processing queued update:", e);
          const r = new BroadcastChannel(\`memory-backend-\${this.dbName}\`);
          r.postMessage(e), r.close();
        }
      } catch (e) {
        Wr("Error processing queued updates:", e);
      } finally {
        this.processingQueue = !1;
      }
    }
  }
  _setupReceiveChannel() {
    try {
      const e = new BroadcastChannel(\`memory-backend-\${this.dbName}\`);
      st("Listening for updates on:", e.name), this.channel = e, this.channel.onmessage = async (r) => {
        Promise.resolve().then(() => this._handleChannelMessage(r));
      }, this._requestInitialSync();
    } catch (e) {
      Wr("BroadcastChannel init failed:", e);
    }
  }
  async _handleChannelMessage(e) {
    const { operation: r, data: i } = e.data || {};
    if (!i?.dbName || i.dbName !== this.dbName) return;
    if (r === "memorySyncRequest") {
      this._isNewerVersionVector(i.requesterVV) ? (st("Responding to sync request with newer data"), Promise.resolve().then(() => this.sendFilesToSW(i.requesterId))) : st("No newer data to send to requester");
      return;
    }
    if (r !== "memorySync") return;
    const n = i.versionVector;
    if (i.sender === this.deviceId) {
      st("Skipping own update");
      return;
    }
    if (i.targetId && i.targetId !== this.deviceId) {
      st("Message not meant for this tab. Ignoring.");
      return;
    }
    if (!this._isNewerVersionVector(n)) {
      st("Skipping received update - not newer than current", this.versionVector, n);
      return;
    }
    try {
      st("Applying update from channel:", i), this._files = new Map(i.files), this._mergeVersionVector(n), st("Memory updated from channel successfully");
    } catch (o) {
      Wr("Failed to apply channel message:", o);
    }
  }
  async wipe() {
    st(\`Wiping db: \${this.dbName}\`), this._files.clear(), this._initializeRoot(), this.versionVector = { [this.deviceId]: 0 }, await this._handleFilesChange();
  }
  async _handleFilesChange() {
    this._incrementVersionVector(), this.options?.supportsServiceWorker && this.options?.useSW && await this.sendFilesToSW();
  }
  async readFile(e, r = {}) {
    if (st("this.files", this._files), !this._files.has(e))
      throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
    const i = this._files.get(e);
    if (i.type !== "file")
      throw Object.assign(new Error("EISDIR"), { code: "EISDIR" });
    return r.encoding === "utf8" ? new TextDecoder().decode(i.data) : i.data;
  }
  async writeFile(e, r, i = {}) {
    const n = typeof r == "string" ? new TextEncoder().encode(r) : r || new Uint8Array();
    this._files.set(e, {
      type: "file",
      mode: i.mode || 438,
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
    const i = /* @__PURE__ */ new Set(), n = e === "/" ? "/" : \`\${e}/\`;
    for (const a of this._files.keys())
      if (a.startsWith(n) && a !== e) {
        const o = a.slice(n.length).split("/")[0];
        i.add(o);
      }
    return [...i];
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
    const r = e === "/" ? "/" : e.replace(/\\/+$/, "");
    if (!this._files.has(r))
      throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
    if (this._files.get(r).type !== "dir")
      throw Object.assign(new Error("ENOTDIR"), { code: "ENOTDIR" });
    for (const n of this._files.keys())
      if (n.startsWith(\`\${r}/\`))
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
var Tn, yo;
function Fh() {
  if (yo) return Tn;
  yo = 1, Tn = t;
  function t(e) {
    var r, i;
    if (typeof e != "function")
      throw new Error("expected a function but got " + e);
    return function() {
      return r || (r = !0, i = e.apply(this, arguments)), i;
    };
  }
  return Tn;
}
var Rn = {}, _o;
function Uh() {
  return _o || (_o = 1, function(t) {
    function e(I, T) {
      var D;
      return I instanceof fe ? D = I : D = fe.from(I.buffer, I.byteOffset, I.byteLength), D.toString(T);
    }
    var r = function(I) {
      return fe.from(I);
    };
    function i(I) {
      for (var T = 0, D = Math.min(256 * 256, I.length + 1), P = new Uint16Array(D), M = [], U = 0; ; ) {
        var $ = T < I.length;
        if (!$ || U >= D - 1) {
          var O = P.subarray(0, U), q = O;
          if (M.push(String.fromCharCode.apply(null, q)), !$) return M.join("");
          I = I.subarray(T), T = 0, U = 0;
        }
        var z = I[T++];
        if ((z & 128) === 0) P[U++] = z;
        else if ((z & 224) === 192) {
          var Y = I[T++] & 63;
          P[U++] = (z & 31) << 6 | Y;
        } else if ((z & 240) === 224) {
          var Y = I[T++] & 63, N = I[T++] & 63;
          P[U++] = (z & 31) << 12 | Y << 6 | N;
        } else if ((z & 248) === 240) {
          var Y = I[T++] & 63, N = I[T++] & 63, J = I[T++] & 63, oe = (z & 7) << 18 | Y << 12 | N << 6 | J;
          oe > 65535 && (oe -= 65536, P[U++] = oe >>> 10 & 1023 | 55296, oe = 56320 | oe & 1023), P[U++] = oe;
        }
      }
    }
    function n(I) {
      for (var T = 0, D = I.length, P = 0, M = Math.max(32, D + (D >>> 1) + 7), U = new Uint8Array(M >>> 3 << 3); T < D; ) {
        var $ = I.charCodeAt(T++);
        if ($ >= 55296 && $ <= 56319) {
          if (T < D) {
            var O = I.charCodeAt(T);
            (O & 64512) === 56320 && (++T, $ = (($ & 1023) << 10) + (O & 1023) + 65536);
          }
          if ($ >= 55296 && $ <= 56319) continue;
        }
        if (P + 4 > U.length) {
          M += 8, M *= 1 + T / I.length * 2, M = M >>> 3 << 3;
          var q = new Uint8Array(M);
          q.set(U), U = q;
        }
        if (($ & 4294967168) === 0) {
          U[P++] = $;
          continue;
        } else if (($ & 4294965248) === 0) U[P++] = $ >>> 6 & 31 | 192;
        else if (($ & 4294901760) === 0) U[P++] = $ >>> 12 & 15 | 224, U[P++] = $ >>> 6 & 63 | 128;
        else if (($ & 4292870144) === 0) U[P++] = $ >>> 18 & 7 | 240, U[P++] = $ >>> 12 & 63 | 128, U[P++] = $ >>> 6 & 63 | 128;
        else continue;
        U[P++] = $ & 63 | 128;
      }
      return U.slice ? U.slice(0, P) : U.subarray(0, P);
    }
    var a = "Failed to ", o = function(I, T, D) {
      if (I) throw new Error("".concat(a).concat(T, ": the '").concat(D, "' option is unsupported."));
    }, s = typeof fe == "function" && fe.from, l = s ? r : n;
    function f() {
      this.encoding = "utf-8";
    }
    f.prototype.encode = function(I, T) {
      return o(T && T.stream, "encode", "stream"), l(I);
    };
    function u(I) {
      var T;
      try {
        var D = new Blob([I], { type: "text/plain;charset=UTF-8" });
        T = URL.createObjectURL(D);
        var P = new XMLHttpRequest();
        return P.open("GET", T, !1), P.send(), P.responseText;
      } finally {
        T && URL.revokeObjectURL(T);
      }
    }
    var m = !s && typeof Blob == "function" && typeof URL == "function" && typeof URL.createObjectURL == "function", g = ["utf-8", "utf8", "unicode-1-1-utf-8"], y = i;
    s ? y = e : m && (y = function(I) {
      try {
        return u(I);
      } catch {
        return i(I);
      }
    });
    var E = "construct 'TextDecoder'", A = "".concat(a, " ").concat(E, ": the ");
    function R(I, T) {
      o(T && T.fatal, E, "fatal"), I = I || "utf-8";
      var D;
      if (s ? D = fe.isEncoding(I) : D = g.indexOf(I.toLowerCase()) !== -1, !D) throw new RangeError("".concat(A, " encoding label provided ('").concat(I, "') is invalid."));
      this.encoding = I, this.fatal = !1, this.ignoreBOM = !1;
    }
    R.prototype.decode = function(I, T) {
      o(T && T.stream, "decode", "stream");
      var D;
      return I instanceof Uint8Array ? D = I : I.buffer instanceof ArrayBuffer ? D = new Uint8Array(I.buffer) : D = new Uint8Array(I), y(D, this.encoding);
    }, t.TextEncoder = t.TextEncoder || f, t.TextDecoder = t.TextDecoder || R;
  }(typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : Rn)), Rn;
}
var Bn, bo;
function Mh() {
  return bo || (bo = 1, Uh(), Bn = {
    encode: (t) => new TextEncoder().encode(t),
    decode: (t) => new TextDecoder().decode(t)
  }), Bn;
}
var $n, vo;
function Lh() {
  if (vo) return $n;
  vo = 1, $n = t;
  function t(e, r, i) {
    var n;
    return function() {
      if (!r)
        return e.apply(this, arguments);
      var a = this, o = arguments, s = i && !n;
      if (clearTimeout(n), n = setTimeout(function() {
        if (n = null, !s)
          return e.apply(a, o);
      }, r), s)
        return e.apply(this, arguments);
    };
  }
  return $n;
}
var An, Eo;
function ca() {
  if (Eo) return An;
  Eo = 1;
  function t(s) {
    if (s.length === 0)
      return ".";
    let l = i(s);
    return l = l.reduce(o, []), r(...l);
  }
  function e(...s) {
    let l = "";
    for (let f of s)
      f.startsWith("/") ? l = f : l = t(r(l, f));
    return l;
  }
  function r(...s) {
    if (s.length === 0) return "";
    let l = s.join("/");
    return l = l.replace(/\\/{2,}/g, "/"), l;
  }
  function i(s) {
    if (s.length === 0) return [];
    if (s === "/") return ["/"];
    let l = s.split("/");
    return l[l.length - 1] === "" && l.pop(), s[0] === "/" ? l[0] = "/" : l[0] !== "." && l.unshift("."), l;
  }
  function n(s) {
    const l = s.lastIndexOf("/");
    if (l === -1) throw new Error(\`Cannot get dirname of "\${s}"\`);
    return l === 0 ? "/" : s.slice(0, l);
  }
  function a(s) {
    if (s === "/") throw new Error(\`Cannot get basename of "\${s}"\`);
    const l = s.lastIndexOf("/");
    return l === -1 ? s : s.slice(l + 1);
  }
  function o(s, l) {
    if (s.length === 0)
      return s.push(l), s;
    if (l === ".") return s;
    if (l === "..") {
      if (s.length === 1) {
        if (s[0] === "/")
          throw new Error("Unable to normalize path - traverses above root directory");
        if (s[0] === ".")
          return s.push(l), s;
      }
      return s[s.length - 1] === ".." ? (s.push(".."), s) : (s.pop(), s);
    }
    return s.push(l), s;
  }
  return An = {
    join: r,
    normalize: t,
    split: i,
    basename: a,
    dirname: n,
    resolve: e
  }, An;
}
var Dn, ko;
function js() {
  if (ko) return Dn;
  ko = 1;
  function t(o) {
    return class extends Error {
      constructor(...s) {
        super(...s), this.code = o, this.message ? this.message = o + ": " + this.message : this.message = o;
      }
    };
  }
  const e = t("EEXIST"), r = t("ENOENT"), i = t("ENOTDIR"), n = t("ENOTEMPTY"), a = t("ETIMEDOUT");
  return Dn = { EEXIST: e, ENOENT: r, ENOTDIR: i, ENOTEMPTY: n, ETIMEDOUT: a }, Dn;
}
var On, xo;
function Ph() {
  if (xo) return On;
  xo = 1;
  const t = ca(), { EEXIST: e, ENOENT: r, ENOTDIR: i, ENOTEMPTY: n } = js(), a = 0;
  return On = class {
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
      let l = 1;
      for (let [f, u] of s)
        f !== a && (l += this._countInodes(u));
      return l;
    }
    autoinc() {
      return this._maxInode(this._root.get("/")) + 1;
    }
    _maxInode(s) {
      let l = s.get(a).ino;
      for (let [f, u] of s)
        f !== a && (l = Math.max(l, this._maxInode(u)));
      return l;
    }
    print(s = this._root.get("/")) {
      let l = "";
      const f = (u, m) => {
        for (let [g, y] of u) {
          if (g === 0) continue;
          let E = y.get(a), A = E.mode.toString(8);
          l += \`\${"	".repeat(m)}\${g}	\${A}\`, E.type === "file" ? l += \`	\${E.size}	\${E.mtimeMs}
\` : (l += \`
\`, f(y, m + 1));
        }
      };
      return f(s, 0), l;
    }
    parse(s) {
      let l = 0;
      function f(y) {
        const E = ++l, A = y.length === 1 ? "dir" : "file";
        let [R, I, T] = y;
        return R = parseInt(R, 8), I = I ? parseInt(I) : 0, T = T ? parseInt(T) : Date.now(), /* @__PURE__ */ new Map([[a, { mode: R, type: A, size: I, mtimeMs: T, ino: E }]]);
      }
      let u = s.trim().split(\`
\`), m = this._makeRoot(), g = [
        { indent: -1, node: m },
        { indent: 0, node: null }
      ];
      for (let y of u) {
        let A = y.match(/^\\t*/)[0].length;
        y = y.slice(A);
        let [R, ...I] = y.split("	"), T = f(I);
        if (A <= g[g.length - 1].indent)
          for (; A <= g[g.length - 1].indent; )
            g.pop();
        g.push({ indent: A, node: T }), g[g.length - 2].node.set(R, T);
      }
      return m;
    }
    _lookup(s, l = !0) {
      let f = this._root, u = "/", m = t.split(s);
      for (let g = 0; g < m.length; ++g) {
        let y = m[g];
        if (f = f.get(y), !f) throw new r(s);
        if (l || g < m.length - 1) {
          const E = f.get(a);
          if (E.type === "symlink") {
            let A = t.resolve(u, E.target);
            f = this._lookup(A);
          }
          u ? u = t.join(u, y) : u = y;
        }
      }
      return f;
    }
    mkdir(s, { mode: l }) {
      if (s === "/") throw new e();
      let f = this._lookup(t.dirname(s)), u = t.basename(s);
      if (f.has(u))
        throw new e();
      let m = /* @__PURE__ */ new Map(), g = {
        mode: l,
        type: "dir",
        size: 0,
        mtimeMs: Date.now(),
        ino: this.autoinc()
      };
      m.set(a, g), f.set(u, m);
    }
    rmdir(s) {
      let l = this._lookup(s);
      if (l.get(a).type !== "dir") throw new i();
      if (l.size > 1) throw new n();
      let f = this._lookup(t.dirname(s)), u = t.basename(s);
      f.delete(u);
    }
    readdir(s) {
      let l = this._lookup(s);
      if (l.get(a).type !== "dir") throw new i();
      return [...l.keys()].filter((f) => typeof f == "string");
    }
    writeStat(s, l, { mode: f }) {
      let u;
      try {
        let A = this.stat(s);
        f == null && (f = A.mode), u = A.ino;
      } catch {
      }
      f == null && (f = 438), u == null && (u = this.autoinc());
      let m = this._lookup(t.dirname(s)), g = t.basename(s), y = {
        mode: f,
        type: "file",
        size: l,
        mtimeMs: Date.now(),
        ino: u
      }, E = /* @__PURE__ */ new Map();
      return E.set(a, y), m.set(g, E), y;
    }
    unlink(s) {
      let l = this._lookup(t.dirname(s)), f = t.basename(s);
      l.delete(f);
    }
    rename(s, l) {
      let f = t.basename(l), u = this._lookup(s);
      this._lookup(t.dirname(l)).set(f, u), this.unlink(s);
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
    symlink(s, l) {
      let f, u;
      try {
        let A = this.stat(l);
        u === null && (u = A.mode), f = A.ino;
      } catch {
      }
      u == null && (u = 40960), f == null && (f = this.autoinc());
      let m = this._lookup(t.dirname(l)), g = t.basename(l), y = {
        mode: u,
        type: "symlink",
        target: s,
        size: 0,
        mtimeMs: Date.now(),
        ino: f
      }, E = /* @__PURE__ */ new Map();
      return E.set(a, y), m.set(g, E), y;
    }
    _du(s) {
      let l = 0;
      for (const [f, u] of s.entries())
        f === a ? l += u.size : l += this._du(u);
      return l;
    }
    du(s) {
      let l = this._lookup(s);
      return this._du(l);
    }
  }, On;
}
class zs {
  constructor(e = "keyval-store", r = "keyval") {
    this.storeName = r, this._dbName = e, this._storeName = r, this._init();
  }
  _init() {
    this._dbp || (this._dbp = new Promise((e, r) => {
      const i = indexedDB.open(this._dbName);
      i.onerror = () => r(i.error), i.onsuccess = () => e(i.result), i.onupgradeneeded = () => {
        i.result.createObjectStore(this._storeName);
      };
    }));
  }
  _withIDBStore(e, r) {
    return this._init(), this._dbp.then((i) => new Promise((n, a) => {
      const o = i.transaction(this.storeName, e);
      o.oncomplete = () => n(), o.onabort = o.onerror = () => a(o.error), r(o.objectStore(this.storeName));
    }));
  }
  _close() {
    return this._init(), this._dbp.then((e) => {
      e.close(), this._dbp = void 0;
    });
  }
}
let Cn;
function yr() {
  return Cn || (Cn = new zs()), Cn;
}
function jh(t, e = yr()) {
  let r;
  return e._withIDBStore("readwrite", (i) => {
    r = i.get(t);
  }).then(() => r.result);
}
function zh(t, e, r = yr()) {
  return r._withIDBStore("readwrite", (i) => {
    i.put(e, t);
  });
}
function Hh(t, e, r = yr()) {
  return r._withIDBStore("readwrite", (i) => {
    const n = i.get(t);
    n.onsuccess = () => {
      i.put(e(n.result), t);
    };
  });
}
function qh(t, e = yr()) {
  return e._withIDBStore("readwrite", (r) => {
    r.delete(t);
  });
}
function Wh(t = yr()) {
  return t._withIDBStore("readwrite", (e) => {
    e.clear();
  });
}
function Gh(t = yr()) {
  const e = [];
  return t._withIDBStore("readwrite", (r) => {
    (r.openKeyCursor || r.openCursor).call(r).onsuccess = function() {
      this.result && (e.push(this.result.key), this.result.continue());
    };
  }).then(() => e);
}
function Zh(t = yr()) {
  return t._close();
}
var Vh = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Store: zs,
  clear: Wh,
  close: Zh,
  del: qh,
  get: jh,
  keys: Gh,
  set: zh,
  update: Hh
}), Hs = /* @__PURE__ */ Uc(Vh), Nn, So;
function Xh() {
  if (So) return Nn;
  So = 1;
  const t = Hs;
  return Nn = class {
    constructor(r, i) {
      this._database = r, this._storename = i, this._store = new t.Store(this._database, this._storename);
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
    writeFile(r, i) {
      return t.set(r, i, this._store);
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
  }, Nn;
}
var Fn, Io;
function Yh() {
  return Io || (Io = 1, Fn = class {
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
  }), Fn;
}
var Un, To;
function Kh() {
  if (To) return Un;
  To = 1;
  const t = Hs, e = (r) => new Promise((i) => setTimeout(i, r));
  return Un = class {
    constructor(i, n) {
      this._id = Math.random(), this._database = i, this._storename = n, this._store = new t.Store(this._database, this._storename), this._lock = null;
    }
    async has({ margin: i = 2e3 } = {}) {
      if (this._lock && this._lock.holder === this._id) {
        const n = Date.now();
        return this._lock.expires > n + i ? !0 : await this.renew();
      } else
        return !1;
    }
    // Returns true if successful
    async renew({ ttl: i = 5e3 } = {}) {
      let n;
      return await t.update("lock", (a) => {
        const s = Date.now() + i;
        return n = a && a.holder === this._id, this._lock = n ? { holder: this._id, expires: s } : a, this._lock;
      }, this._store), n;
    }
    // Returns true if successful
    async acquire({ ttl: i = 5e3 } = {}) {
      let n, a, o;
      if (await t.update("lock", (s) => {
        const l = Date.now(), f = l + i;
        return a = s && s.expires < l, n = s === void 0 || a, o = s && s.holder === this._id, this._lock = n ? { holder: this._id, expires: f } : s, this._lock;
      }, this._store), o)
        throw new Error("Mutex double-locked");
      return n;
    }
    // check at 10Hz, give up after 10 minutes
    async wait({ interval: i = 100, limit: n = 6e3, ttl: a } = {}) {
      for (; n--; ) {
        if (await this.acquire({ ttl: a })) return !0;
        await e(i);
      }
      throw new Error("Mutex timeout");
    }
    // Returns true if successful
    async release({ force: i = !1 } = {}) {
      let n, a, o;
      if (await t.update("lock", (s) => (n = i || s && s.holder === this._id, a = s === void 0, o = s && s.holder !== this._id, this._lock = n ? void 0 : s, this._lock), this._store), await t.close(this._store), !n && !i) {
        if (a) throw new Error("Mutex double-freed");
        if (o) throw new Error("Mutex lost ownership");
      }
      return n;
    }
  }, Un;
}
var Mn, Ro;
function Jh() {
  return Ro || (Ro = 1, Mn = class {
    constructor(e) {
      this._id = Math.random(), this._database = e, this._has = !1, this._release = null;
    }
    async has() {
      return this._has;
    }
    // Returns true if successful
    async acquire() {
      return new Promise((e) => {
        navigator.locks.request(this._database + "_lock", { ifAvailable: !0 }, (r) => (this._has = !!r, e(!!r), new Promise((i) => {
          this._release = i;
        })));
      });
    }
    // Returns true if successful, gives up after 10 minutes
    async wait({ timeout: e = 6e5 } = {}) {
      return new Promise((r, i) => {
        const n = new AbortController();
        setTimeout(() => {
          n.abort(), i(new Error("Mutex timeout"));
        }, e), navigator.locks.request(this._database + "_lock", { signal: n.signal }, (a) => (this._has = !!a, r(!!a), new Promise((o) => {
          this._release = o;
        })));
      });
    }
    // Returns true if successful
    async release({ force: e = !1 } = {}) {
      this._has = !1, this._release ? this._release() : e && navigator.locks.request(this._database + "_lock", { steal: !0 }, (r) => !0);
    }
  }), Mn;
}
var Ln, Bo;
function Qh() {
  if (Bo) return Ln;
  Bo = 1;
  const { encode: t, decode: e } = Mh(), r = Lh(), i = Ph(), { ENOENT: n, ENOTEMPTY: a, ETIMEDOUT: o } = js(), s = Xh(), l = Yh(), f = Kh(), u = Jh(), m = ca();
  return Ln = class {
    constructor() {
      this.saveSuperblock = r(() => {
        this.flush();
      }, 500);
    }
    async init(y, {
      wipe: E,
      url: A,
      urlauto: R,
      fileDbName: I = y,
      db: T = null,
      fileStoreName: D = y + "_files",
      lockDbName: P = y + "_lock",
      lockStoreName: M = y + "_lock"
    } = {}) {
      this._name = y, this._idb = T || new s(I, D), this._mutex = navigator.locks ? new u(y) : new f(P, M), this._cache = new i(y), this._opts = { wipe: E, url: A }, this._needsWipe = !!E, A && (this._http = new l(A), this._urlauto = !!R);
    }
    async activate() {
      if (this._cache.activated) return;
      this._needsWipe && (this._needsWipe = !1, await this._idb.wipe(), await this._mutex.release({ force: !0 })), await this._mutex.has() || await this._mutex.wait();
      const y = await this._idb.loadSuperblock();
      if (y)
        this._cache.activate(y);
      else if (this._http) {
        const E = await this._http.loadSuperblock();
        this._cache.activate(E), await this._saveSuperblock();
      } else
        this._cache.activate();
      if (!await this._mutex.has())
        throw new o();
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
    _writeStat(y, E, A) {
      let R = m.split(m.dirname(y)), I = R.shift();
      for (let T of R) {
        I = m.join(I, T);
        try {
          this._cache.mkdir(I, { mode: 511 });
        } catch {
        }
      }
      return this._cache.writeStat(y, E, A);
    }
    async readFile(y, E) {
      const { encoding: A } = E;
      if (A && A !== "utf8") throw new Error('Only "utf8" encoding is supported in readFile');
      let R = null, I = null;
      try {
        I = this._cache.stat(y), R = await this._idb.readFile(I.ino);
      } catch (T) {
        if (!this._urlauto) throw T;
      }
      if (!R && this._http) {
        let T = this._cache.lstat(y);
        for (; T.type === "symlink"; )
          y = m.resolve(m.dirname(y), T.target), T = this._cache.lstat(y);
        R = await this._http.readFile(y);
      }
      if (R && ((!I || I.size != R.byteLength) && (I = await this._writeStat(y, R.byteLength, { mode: I ? I.mode : 438 }), this.saveSuperblock()), A === "utf8" ? R = e(R) : R.toString = () => e(R)), !I) throw new n(y);
      return R;
    }
    async writeFile(y, E, A) {
      const { mode: R, encoding: I = "utf8" } = A;
      if (typeof E == "string") {
        if (I !== "utf8")
          throw new Error('Only "utf8" encoding is supported in writeFile');
        E = t(E);
      }
      const T = await this._cache.writeStat(y, E.byteLength, { mode: R });
      await this._idb.writeFile(T.ino, E);
    }
    async unlink(y, E) {
      const A = this._cache.lstat(y);
      this._cache.unlink(y), A.type !== "symlink" && await this._idb.unlink(A.ino);
    }
    readdir(y, E) {
      return this._cache.readdir(y);
    }
    mkdir(y, E) {
      const { mode: A = 511 } = E;
      this._cache.mkdir(y, { mode: A });
    }
    rmdir(y, E) {
      if (y === "/")
        throw new a();
      this._cache.rmdir(y);
    }
    rename(y, E) {
      this._cache.rename(y, E);
    }
    stat(y, E) {
      return this._cache.stat(y);
    }
    lstat(y, E) {
      return this._cache.lstat(y);
    }
    readlink(y, E) {
      return this._cache.readlink(y);
    }
    symlink(y, E) {
      this._cache.symlink(y, E);
    }
    async backFile(y, E) {
      let A = await this._http.sizeFile(y);
      await this._writeStat(y, A, E);
    }
    du(y) {
      return this._cache.du(y);
    }
    flush() {
      return this._saveSuperblock();
    }
  }, Ln;
}
var Pn, $o;
function ed() {
  return $o || ($o = 1, Pn = class {
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
  }), Pn;
}
var jn, Ao;
function td() {
  if (Ao) return jn;
  Ao = 1;
  const t = Qh(), e = ed(), r = ca();
  function i(o, s, ...l) {
    return o = r.normalize(o), (typeof s > "u" || typeof s == "function") && (s = {}), typeof s == "string" && (s = {
      encoding: s
    }), [o, s, ...l];
  }
  function n(o, s, l, ...f) {
    return o = r.normalize(o), (typeof l > "u" || typeof l == "function") && (l = {}), typeof l == "string" && (l = {
      encoding: l
    }), [o, s, l, ...f];
  }
  function a(o, s, ...l) {
    return [r.normalize(o), r.normalize(s), ...l];
  }
  return jn = class {
    constructor(s, l = {}) {
      this.init = this.init.bind(this), this.readFile = this._wrap(this.readFile, i, !1), this.writeFile = this._wrap(this.writeFile, n, !0), this.unlink = this._wrap(this.unlink, i, !0), this.readdir = this._wrap(this.readdir, i, !1), this.mkdir = this._wrap(this.mkdir, i, !0), this.rmdir = this._wrap(this.rmdir, i, !0), this.rename = this._wrap(this.rename, a, !0), this.stat = this._wrap(this.stat, i, !1), this.lstat = this._wrap(this.lstat, i, !1), this.readlink = this._wrap(this.readlink, i, !1), this.symlink = this._wrap(this.symlink, a, !0), this.backFile = this._wrap(this.backFile, i, !0), this.du = this._wrap(this.du, i, !1), this._deactivationPromise = null, this._deactivationTimeout = null, this._activationPromise = null, this._operations = /* @__PURE__ */ new Set(), s && this.init(s, l);
    }
    async init(...s) {
      return this._initPromiseResolve && await this._initPromise, this._initPromise = this._init(...s), this._initPromise;
    }
    async _init(s, l = {}) {
      await this._gracefulShutdown(), this._activationPromise && await this._deactivate(), this._backend && this._backend.destroy && await this._backend.destroy(), this._backend = l.backend || new t(), this._backend.init && await this._backend.init(s, l), this._initPromiseResolve && (this._initPromiseResolve(), this._initPromiseResolve = null), l.defer || this.stat("/");
    }
    async _gracefulShutdown() {
      this._operations.size > 0 && (this._isShuttingDown = !0, await new Promise((s) => this._gracefulShutdownResolve = s), this._isShuttingDown = !1, this._gracefulShutdownResolve = null);
    }
    _wrap(s, l, f) {
      return async (...u) => {
        u = l(...u);
        let m = {
          name: s.name,
          args: u
        };
        this._operations.add(m);
        try {
          return await this._activate(), await s.apply(this, u);
        } finally {
          this._operations.delete(m), f && this._backend.saveSuperblock(), this._operations.size === 0 && (this._deactivationTimeout || clearTimeout(this._deactivationTimeout), this._deactivationTimeout = setTimeout(this._deactivate.bind(this), 500));
        }
      };
    }
    async _activate() {
      this._initPromise || console.warn(new Error(\`Attempted to use LightningFS \${this._name} before it was initialized.\`)), await this._initPromise, this._deactivationTimeout && (clearTimeout(this._deactivationTimeout), this._deactivationTimeout = null), this._deactivationPromise && await this._deactivationPromise, this._deactivationPromise = null, this._activationPromise || (this._activationPromise = this._backend.activate ? this._backend.activate() : Promise.resolve()), await this._activationPromise;
    }
    async _deactivate() {
      return this._activationPromise && await this._activationPromise, this._deactivationPromise || (this._deactivationPromise = this._backend.deactivate ? this._backend.deactivate() : Promise.resolve()), this._activationPromise = null, this._gracefulShutdownResolve && this._gracefulShutdownResolve(), this._deactivationPromise;
    }
    async readFile(s, l) {
      return this._backend.readFile(s, l);
    }
    async writeFile(s, l, f) {
      return await this._backend.writeFile(s, l, f), null;
    }
    async unlink(s, l) {
      return await this._backend.unlink(s, l), null;
    }
    async readdir(s, l) {
      return this._backend.readdir(s, l);
    }
    async mkdir(s, l) {
      return await this._backend.mkdir(s, l), null;
    }
    async rmdir(s, l) {
      return await this._backend.rmdir(s, l), null;
    }
    async rename(s, l) {
      return await this._backend.rename(s, l), null;
    }
    async stat(s, l) {
      const f = await this._backend.stat(s, l);
      return new e(f);
    }
    async lstat(s, l) {
      const f = await this._backend.lstat(s, l);
      return new e(f);
    }
    async readlink(s, l) {
      return this._backend.readlink(s, l);
    }
    async symlink(s, l) {
      return await this._backend.symlink(s, l), null;
    }
    async backFile(s, l) {
      return await this._backend.backFile(s, l), null;
    }
    async du(s) {
      return this._backend.du(s);
    }
    async flush() {
      return this._backend.flush();
    }
  }, jn;
}
var zn, Do;
function rd() {
  if (Do) return zn;
  Do = 1;
  const t = Fh(), e = td();
  function r(i, n) {
    return typeof i == "function" && (n = i), n = t(n), [(...o) => n(null, ...o), n];
  }
  return zn = class {
    constructor(...n) {
      this.promises = new e(...n), this.init = this.init.bind(this), this.readFile = this.readFile.bind(this), this.writeFile = this.writeFile.bind(this), this.unlink = this.unlink.bind(this), this.readdir = this.readdir.bind(this), this.mkdir = this.mkdir.bind(this), this.rmdir = this.rmdir.bind(this), this.rename = this.rename.bind(this), this.stat = this.stat.bind(this), this.lstat = this.lstat.bind(this), this.readlink = this.readlink.bind(this), this.symlink = this.symlink.bind(this), this.backFile = this.backFile.bind(this), this.du = this.du.bind(this), this.flush = this.flush.bind(this);
    }
    init(n, a) {
      return this.promises.init(n, a);
    }
    readFile(n, a, o) {
      const [s, l] = r(a, o);
      this.promises.readFile(n, a).then(s).catch(l);
    }
    writeFile(n, a, o, s) {
      const [l, f] = r(o, s);
      this.promises.writeFile(n, a, o).then(l).catch(f);
    }
    unlink(n, a, o) {
      const [s, l] = r(a, o);
      this.promises.unlink(n, a).then(s).catch(l);
    }
    readdir(n, a, o) {
      const [s, l] = r(a, o);
      this.promises.readdir(n, a).then(s).catch(l);
    }
    mkdir(n, a, o) {
      const [s, l] = r(a, o);
      this.promises.mkdir(n, a).then(s).catch(l);
    }
    rmdir(n, a, o) {
      const [s, l] = r(a, o);
      this.promises.rmdir(n, a).then(s).catch(l);
    }
    rename(n, a, o) {
      const [s, l] = r(o);
      this.promises.rename(n, a).then(s).catch(l);
    }
    stat(n, a, o) {
      const [s, l] = r(a, o);
      this.promises.stat(n).then(s).catch(l);
    }
    lstat(n, a, o) {
      const [s, l] = r(a, o);
      this.promises.lstat(n).then(s).catch(l);
    }
    readlink(n, a, o) {
      const [s, l] = r(a, o);
      this.promises.readlink(n).then(s).catch(l);
    }
    symlink(n, a, o) {
      const [s, l] = r(o);
      this.promises.symlink(n, a).then(s).catch(l);
    }
    backFile(n, a, o) {
      const [s, l] = r(a, o);
      this.promises.backFile(n, a).then(s).catch(l);
    }
    du(n, a) {
      const [o, s] = r(a);
      this.promises.du(n).then(o).catch(s);
    }
    flush(n) {
      const [a, o] = r(n);
      this.promises.flush().then(a).catch(o);
    }
  }, zn;
}
var id = rd(), Oo = /* @__PURE__ */ Jt(id);
const qs = new mi(jr.logging.fsManagerES6);
function kt(...t) {
  qs.consoleDotLog("[fsManagerES6] ", ...t);
}
function vi(...t) {
  qs.consoleDotError("[fsManagerES6] ", ...t);
}
kt("Loading fsmanagerES6.");
class Ws {
  constructor(e = {}) {
    this.fsInstances = /* @__PURE__ */ new Map(), this.initializationLocks = /* @__PURE__ */ new Map(), this.debug = !0, this.options = e;
  }
  _log(...e) {
    this.debug && kt("[fsManager]", ...e);
  }
  _error(...e) {
    vi("[fsManager]", ...e);
  }
  async initializeFS(e, r) {
    const i = \`\${e}-\${r}\`;
    this._log(\`Initializing FS: \${i}\`);
    try {
      if (kt("Initializing."), this.fsInstances.has(i))
        return this._log(\`FS \${i} already exists\`), this.fsInstances.get(i);
      let n;
      if (r === "memory") {
        kt(\`Creating memory FS for \${i}\`);
        const a = new Nh(this.options, e);
        kt(\`Memory backend created for \${i}\`), n = new Oo(e, { backend: a }), kt(\`Memory FS created for \${i}\`), this._log(\`Created memory FS with backend for \${i}\`);
      } else if (r === "idb")
        n = new Oo(e), this._log(\`Created IDB FS for \${i}\`);
      else
        throw new Error(\`Unsupported FS type: \${r}\`);
      return this.fsInstances.set(i, n), n;
    } catch (n) {
      throw this._error(\`Failed to initialize \${i}:\`, n), n;
    }
  }
  async getFS(e, r) {
    const i = \`\${e}-\${r}\`;
    if (this._log(\`Requesting FS: \${i}\`), this.initializationLocks.has(i))
      return this._log(\`Waiting for existing initialization of \${i}\`), this.initializationLocks.get(i);
    const n = (async () => {
      try {
        return this.fsInstances.has(i) ? this.fsInstances.get(i) : await this.initializeFS(e, r);
      } finally {
        this.initializationLocks.delete(i);
      }
    })();
    return this.initializationLocks.set(i, n), n;
  }
  async deleteFS(e, r) {
    const i = \`\${e}-\${r}\`;
    if (!this.fsInstances.has(i)) {
      console.warn(\`File system \${i} does not exist. Nothing to delete.\`);
      return;
    }
    if (r === "idb")
      try {
        await this.deleteIndexedDB(e), kt(\`IndexedDB file system \${i} deleted successfully.\`);
      } catch (n) {
        throw vi(\`Error deleting IndexedDB file system \${i}:\`, n), n;
      }
    else if (r === "memory")
      kt(\`Memory file system \${i} deleted successfully.\`);
    else
      throw new Error(\`Unsupported file system type: \${r}\`);
    this.fsInstances.delete(i);
  }
  async deleteIndexedDB(e) {
    return new Promise((r, i) => {
      const n = indexedDB.deleteDatabase(e);
      n.onsuccess = () => {
        kt(\`Deleted database \${e} successfully\`), r();
      }, n.onerror = (a) => {
        vi(\`Error deleting database \${e}:\`, a), i(a);
      }, n.onblocked = () => {
        console.warn(\`Delete database \${e} blocked\`);
      };
    });
  }
  async getFileStoreNames(e, r) {
    const i = \`\${e}-\${r}\`;
    if (!this.fsInstances.has(i))
      throw new Error(\`File system \${i} not found. Call initializeFS first.\`);
    if (r === "idb")
      try {
        const n = await this.getFileStoresFromDatabases();
        return kt(\`File store names for \${i}:\`, n), n;
      } catch (n) {
        throw vi(\`Error retrieving file store names for \${i}:\`, n), n;
      }
    else {
      if (r === "memory")
        return kt(\`Memory file system \${i} does not have persistent file stores.\`), [];
      throw new Error(\`Unsupported file system type: \${r}\`);
    }
  }
  async processDatabaseList(e) {
    const r = [];
    for (const i of e) {
      const n = typeof i == "string" ? i : i.name, o = (await this.openDatabase(n)).objectStoreNames, s = Array.from(o).filter((l) => l.startsWith("fs_")).map((l) => ({ database: n, fileStore: l }));
      r.push(...s);
    }
    return kt("Processing database list:", r), r;
  }
  async openDatabase(e) {
    return kt("Opening database:", e), new Promise((r, i) => {
      const n = indexedDB.open(e);
      n.onsuccess = (a) => {
        const o = a.target.result;
        r(o);
      }, n.onerror = (a) => {
        i(\`Error opening database \${e}: \${a.target.error}\`);
      };
    });
  }
  async getFileStoresFromDatabases() {
    return new Promise((e, r) => {
      const i = indexedDB.webkitGetDatabaseNames ? indexedDB.webkitGetDatabaseNames() : indexedDB.databases ? indexedDB.databases() : null;
      if (!i) {
        r("Your browser does not support retrieving a list of IndexedDB databases");
        return;
      }
      i instanceof Promise ? i.then((n) => {
        this.processDatabaseList(n).then((a) => e(a)).catch((a) => r(a));
      }).catch((n) => r(n)) : (i.onsuccess = async (n) => {
        const a = n.target.result;
        try {
          const o = await this.processDatabaseList(a);
          e(o);
        } catch (o) {
          r(o);
        }
      }, i.onerror = (n) => {
        r(\`Error retrieving database list: \${n.target.error}\`);
      });
    });
  }
}
var nt = {
  async resolveRef(t, e, r = "HEAD") {
    try {
      return await ne.resolveRef({
        fs: t,
        dir: e,
        ref: r
      });
    } catch (i) {
      throw console.error("Error resolving ref:", i), i;
    }
  },
  async readCommit(t, e, r) {
    try {
      return await ne.readCommit({
        fs: t,
        dir: e,
        oid: r
      });
    } catch (i) {
      throw console.error("Error reading commit:", i), i;
    }
  }
};
const pe = new mi(jr.logging.dotGit), hr = /* @__PURE__ */ new Map();
function mt(...t) {
  pe.consoleDotLog("[DotGit] ", ...t);
}
function nd(...t) {
  pe.consoleDotError("[DotGit] ", ...t);
}
var qt = {
  staged: hr,
  async commitStagedChanges(t, e, r = null, i = "System", n = "system@example.com") {
    try {
      if (pe.consoleDotLog("staged", hr, e), this.staged.size === 0)
        return pe.consoleDotLog("No staged changes to commit"), { committed: !1 };
      let a;
      try {
        a = await ne.resolveRef({ fs: t, dir: e, ref: "HEAD" }), pe.consoleDotLog(\`Parent commit OID: \${a}\`);
      } catch {
        pe.consoleDotLog("No existing commit, starting fresh repository"), a = null;
      }
      let o = [];
      if (a) {
        const { commit: y } = await ne.readCommit({ fs: t, dir: e, oid: a });
        o = (await ne.readTree({ fs: t, dir: e, oid: y.tree })).tree;
      }
      const s = async (y, E) => {
        const A = JSON.parse(JSON.stringify(y));
        for (const [R, I] of E) {
          if (!R || typeof R != "string") {
            pe.consoleDotError("Invalid file path in staged changes:", R);
            continue;
          }
          const D = R.replace(/^\\/+|\\/+$/g, "").split("/").filter(($) => $.length > 0);
          if (D.length === 0) {
            pe.consoleDotError("Empty path in staged changes");
            continue;
          }
          const P = D.pop();
          let M = A, U = [];
          for (const $ of D) {
            let O = M.find((z) => z.path === $ && z.type === "tree");
            if (!O) {
              const z = await ne.writeTree({ fs: t, dir: e, tree: [] });
              O = {
                mode: "040000",
                path: $,
                oid: z,
                type: "tree"
              }, M.push(O);
            }
            const { tree: q } = await ne.readTree({ fs: t, dir: e, oid: O.oid });
            O.tree = q, M = q, U.push($);
          }
          try {
            if (I.type === "write" || I.type === "writeDir") {
              const $ = M.findIndex((q) => q.path === P), O = I.type === "writeDir" ? I.treeOid : I.oid;
              if (!O)
                throw new Error(\`Missing OID for \${I.type} operation on \${R}\`);
              $ >= 0 ? (M[$].oid = O, M[$].type = I.type === "write" ? "blob" : "tree", M[$].mode = I.type === "write" ? "100644" : "040000") : M.push({
                mode: I.type === "write" ? "100644" : "040000",
                path: P,
                oid: O,
                type: I.type === "write" ? "blob" : "tree"
              });
            } else if (I.type === "remove" || I.type === "removeDir") {
              const $ = M.findIndex((O) => O.path === P);
              $ >= 0 && M.splice($, 1);
            }
          } catch ($) {
            throw pe.consoleDotError(\`Error processing \${I.type} for \${R}:\`, $), $;
          }
        }
        return A;
      }, l = Array.from(this.staged.entries()), f = await s(o, l);
      for (const y of f)
        console.log("entry of updated tree, ", y), y.path || console.error("❌ Missing path:", y), y.oid || console.error("❌ Missing oid:", y);
      ((y) => {
        for (const E of y) {
          if (!E.path || typeof E.path != "string")
            throw new Error(\`Invalid tree entry: \${JSON.stringify(E)}\`);
          if (!E.oid || typeof E.oid != "string")
            throw new Error(\`Invalid OID for path \${E.path}\`);
        }
      })(f);
      const m = await this._writeFullTree(t, e, f), g = await this.commitChanges(t, e, {
        message: r || \`Batch commit \${l.length} staged changes\`,
        treeOid: m,
        parentCommitOids: a ? [a] : [],
        name: i,
        email: n,
        actionType: "batch",
        filePath: null
      });
      return this.staged.clear(), {
        committed: !0,
        commitOid: g,
        treeOid: m,
        stagedCount: l.length
      };
    } catch (a) {
      throw pe.consoleDotError("Error committing staged changes:", a), a;
    }
  },
  async commitChanges(t, e, {
    message: r,
    treeOid: i,
    parentCommitOids: n = [],
    name: a = "System",
    email: o = "system@example.com",
    actionType: s = "change",
    filePath: l = null
  }) {
    try {
      const f = await ne.commit({
        fs: t,
        dir: e,
        message: r,
        tree: i,
        parent: n,
        author: { name: a, email: o }
      });
      return pe.consoleDotLog(\`Committed \${s} for \${l || "repository"}: \${f}\`), f;
    } catch (f) {
      throw pe.consoleDotError("Error committing changes:", f), f;
    }
  },
  async _writeFullTree(t, e, r) {
    const i = async (n) => {
      const a = [];
      for (const o of n)
        if (o.type === "tree") {
          const s = await i(o.tree || []);
          a.push({
            mode: "040000",
            path: o.path,
            oid: s,
            type: "tree"
          });
        } else
          a.push(o);
      return await ne.writeTree({ fs: t, dir: e, tree: a });
    };
    return await i(r);
  },
  async findInGitHistory(t, e, r) {
    try {
      pe.consoleDotLog("Starting findInGitHistory function..."), pe.consoleDotLog(\`File path: \${r}\`);
      const i = r.split("/");
      pe.consoleDotLog(\`Path parts: \${JSON.stringify(i)}\`);
      let n = await nt.resolveRef(t, e);
      for (pe.consoleDotLog(\`Starting from commit: \${n}\`); n; ) {
        pe.consoleDotLog(\`Processing commit: \${n}\`);
        const { commit: a } = await nt.readCommit(t, e, n);
        let o = a.tree;
        pe.consoleDotLog(\`Root tree OID: \${o}\`);
        let s = !0;
        for (let l = 0; l < i.length; l++) {
          const f = i[l];
          pe.consoleDotLog(\`Processing path part: \${f}\`);
          const { tree: u } = await ne.readTree({
            fs: t,
            dir: e,
            oid: o
          }), m = u.find((g) => g.path === f);
          if (!m) {
            pe.consoleDotLog(\`Path part "\${f}" not found in tree.\`), s = !1;
            break;
          }
          if (l === i.length - 1)
            return pe.consoleDotLog(\`Found path "\${r}" in commit \${n}\`, u), pe.consoleDotLog(m), {
              type: m.type,
              oid: m.oid,
              commitOid: n,
              treeOid: o
            };
          if (m.type === "tree")
            o = m.oid, pe.consoleDotLog(\`Found subtree OID: \${o}\`);
          else {
            pe.consoleDotLog(\`Path part "\${f}" is not a directory.\`), s = !1;
            break;
          }
        }
        if (s)
          return pe.consoleDotLog(\`Path "\${r}" found in commit \${n}\`), {
            type: "tree",
            oid: o,
            commitOid: n
          };
        n = a.parent.length > 0 ? a.parent[0] : null, pe.consoleDotLog(\`Moving to parent commit: \${n}\`);
      }
      throw new Error(\`Path "\${r}" not found in any commit.\`);
    } catch (i) {
      throw pe.consoleDotLog("Error in findInGitHistory:", i), i;
    }
  },
  async readFileDot(t, e, r, i = null) {
    try {
      if (pe.consoleDotLog(\`args are fs: \${t}, dir: \${e}, filePath: \${r}, commitOid: \${i}\`), r = r.replace(/^\\/+|\\/+$/g, ""), i === "staged") {
        const m = this.staged.get(r);
        if (m && m.type === "write")
          try {
            const g = await ne.readBlob({
              fs: t,
              dir: e,
              oid: m.oid
            }), y = g.blob instanceof ArrayBuffer ? new Uint8Array(g.blob) : g.blob instanceof Uint8Array ? g.blob : null;
            if (!y) throw new Error("Invalid blob data");
            return new TextDecoder().decode(y);
          } catch (g) {
            pe.consoleDotError("Error reading staged blob, falling back:", g);
          }
        else
          pe.consoleDotLog(\`File "\${r}" not found in staged changes. Falling back...\`);
      }
      const n = r.split("/"), a = n.pop(), o = i && i !== "staged" ? i : await nt.resolveRef(t, e), { commit: s } = await nt.readCommit(t, e, o);
      let l = s.tree;
      for (const m of n) {
        const { tree: g } = await ne.readTree({ fs: t, dir: e, oid: l }), y = g.find((E) => E.path === m && E.type === "tree");
        if (!y)
          return pe.consoleDotLog(\`Directory "\${m}" not found\`), "";
        l = y.oid;
      }
      const f = await ne.readBlob({
        fs: t,
        dir: e,
        oid: l,
        filepath: a
      }), u = f.blob instanceof ArrayBuffer ? new Uint8Array(f.blob) : f.blob instanceof Uint8Array ? f.blob : null;
      return u ? new TextDecoder().decode(u) : (pe.consoleDotError("Invalid blob data from commit"), "");
    } catch (n) {
      return pe.consoleDotError("Error in readFileDot:", n), "";
    }
  },
  async readDirDot(t, e, r, i = null) {
    try {
      if (r = r.replace(/^\\/+|\\/+$/g, ""), i === "staged")
        try {
          const f = Array.from(this.staged.entries()).filter(([u, m]) => {
            const g = u.replace(/^\\/+|\\/+$/g, ""), y = g.split("/"), E = r.split("/");
            return y.length === E.length + 1 && g.startsWith(r + (r ? "/" : ""));
          });
          if (f.length > 0)
            return {
              entries: f.map(([u, m]) => ({
                path: u.split("/").pop(),
                type: m.type === "write" ? "blob" : "tree",
                oid: m.oid,
                mode: m.type === "write" ? "100644" : "040000"
              })),
              dirPath: r,
              commitOid: "staged",
              treeOid: "staged"
            };
          pe.consoleDotLog(\`No staged entries for "\${r}", falling back...\`);
        } catch (f) {
          pe.consoleDotError("Error reading staged directory, falling back:", f);
        }
      const n = i && i !== "staged" ? i : await nt.resolveRef(t, e), { commit: a } = await nt.readCommit(t, e, n);
      let o = a.tree;
      const s = r.split("/").filter(Boolean);
      for (const f of s) {
        const { tree: u } = await ne.readTree({ fs: t, dir: e, oid: o }), m = u.find((g) => g.path === f && g.type === "tree");
        if (!m)
          return pe.consoleDotLog(\`Directory "\${f}" not found in commit tree.\`), { entries: [], dirPath: r, commitOid: n, treeOid: o };
        o = m.oid;
      }
      const { tree: l } = await ne.readTree({ fs: t, dir: e, oid: o });
      return {
        entries: l.map((f) => ({
          path: f.path,
          type: f.type,
          oid: f.oid,
          mode: f.mode
        })),
        dirPath: r,
        commitOid: n,
        treeOid: o
      };
    } catch (n) {
      return pe.consoleDotError("Error in readDirDot:", n), { entries: [], dirPath: r, commitOid: null, treeOid: null };
    }
  },
  async writeFileDot(t, e, r, i, n = "sample", a = "sample@email.com", o = 1) {
    try {
      pe.consoleDotLog("Starting writeFileDot function..."), r = r.replace(/^\\/+|\\/+$/g, "");
      const s = r.split("/"), l = s.pop(), f = await this.isDirectoryDot(t, e, r);
      if (f.exists) {
        if (f.isDirectory)
          throw new Error(\`Path \${r} exists and is a directory - cannot write as file\`);
        pe.consoleDotLog(\`File \${r} exists and will be overwritten\`);
      }
      const u = await ne.writeBlob({
        fs: t,
        dir: e,
        blob: new TextEncoder().encode(i)
      });
      pe.consoleDotLog(\`Blob OID created: \${u}\`);
      let m;
      try {
        m = await ne.resolveRef({ fs: t, dir: e, ref: "HEAD" }), pe.consoleDotLog(\`Latest commit OID resolved: \${m}\`);
      } catch {
        pe.consoleDotLog("No existing commit, starting fresh repository"), m = null;
      }
      let g = [];
      if (m) {
        const { commit: I } = await ne.readCommit({ fs: t, dir: e, oid: m });
        g = (await ne.readTree({ fs: t, dir: e, oid: I.tree })).tree, pe.consoleDotLog(\`Current tree loaded with \${g.length} entries\`);
      }
      const y = async (I, T, D) => {
        if (T.length === 0) {
          const q = I.findIndex((z) => z.path === l);
          if (q >= 0 && I[q].type === "tree")
            throw new Error(\`Cannot overwrite directory \${l} with file content\`);
          return q >= 0 ? I[q] = {
            mode: "100644",
            path: l,
            oid: D,
            type: "blob"
          } : I.push({
            mode: "100644",
            path: l,
            oid: D,
            type: "blob"
          }), I;
        }
        const P = T.shift();
        let M = I.find((q) => q.path === P && q.type === "tree");
        if (!M) {
          const q = await ne.writeTree({ fs: t, dir: e, tree: [] });
          M = {
            mode: "040000",
            path: P,
            oid: q,
            type: "tree"
          }, I.push(M);
        }
        const { tree: U } = await ne.readTree({ fs: t, dir: e, oid: M.oid }), $ = await y([...U], T, D), O = await ne.writeTree({ fs: t, dir: e, tree: $ });
        return M.oid = O, I;
      }, E = await y([...g], [...s], u), A = await ne.writeTree({ fs: t, dir: e, tree: E });
      pe.consoleDotLog(\`New tree OID: \${A}\`);
      let R = null;
      return o ? (R = await ne.commit({
        fs: t,
        dir: e,
        message: \`Updated \${r}\`,
        tree: A,
        parent: m ? [m] : [],
        author: { name: n, email: a }
      }), pe.consoleDotLog(\`New commit OID: \${R}\`)) : (hr.set(r, {
        type: "write",
        oid: u,
        treeOid: A,
        filePath: r,
        action: "staged"
      }), pe.consoleDotLog(\`Staged write for \${r} with blobOid \${u}\`)), {
        blobOid: u,
        treeOid: A,
        commitOid: R,
        filePath: r,
        action: o ? "committed" : "staged",
        createdTrees: s.length
      };
    } catch (s) {
      throw pe.consoleDotError("Error in writeFileDot:", s), s;
    }
  },
  async isDirectoryDot(t, e, r) {
    try {
      if (mt("[isDirectoryDot] Checking path:", r), !r || r === "/") {
        mt("[isDirectoryDot] Path is root or empty, resolving root directory...");
        const l = await nt.resolveRef(t, e);
        mt("[isDirectoryDot] Resolved commit OID:", l);
        const f = await nt.readCommit(t, e, l), u = await ne.readTree({
          fs: t,
          dir: e,
          oid: f.commit.tree
        });
        return mt("[isDirectoryDot] Root directory tree loaded:", u.tree), {
          exists: !0,
          isDirectory: !0,
          hasChildren: u.tree.length > 0
        };
      }
      const i = r.split("/").filter((l) => l.length > 0);
      mt("[isDirectoryDot] Path parts:", i);
      const n = await nt.resolveRef(t, e);
      mt("[isDirectoryDot] Resolved commit OID:", n);
      const a = await nt.readCommit(t, e, n), o = await ne.readTree({
        fs: t,
        dir: e,
        oid: a.commit.tree
      });
      mt("[isDirectoryDot] Initial tree loaded:", o.tree);
      let s = o.tree;
      for (let l = 0; l < i.length; l++) {
        const f = i[l];
        mt(\`[isDirectoryDot] Checking part "\${f}" in current tree...\`);
        const u = s.find((m) => m.path === f);
        if (!u)
          return mt(\`[isDirectoryDot] Part "\${f}" not found in current tree.\`), {
            exists: !1,
            isDirectory: !1,
            hasChildren: !1
          };
        if (u.type === "tree") {
          if (mt(\`[isDirectoryDot] Part "\${f}" is a directory.\`), l === i.length - 1) {
            const g = await ne.readTree({ fs: t, dir: e, oid: u.oid });
            return mt("[isDirectoryDot] Subtree loaded:", g.tree), {
              exists: !0,
              isDirectory: !0,
              hasChildren: g.tree.length > 0
            };
          }
          s = (await ne.readTree({ fs: t, dir: e, oid: u.oid })).tree;
        } else return l === i.length - 1 ? (mt(\`[isDirectoryDot] Part "\${f}" is a file.\`), {
          exists: !0,
          isDirectory: !1,
          hasChildren: !1
        }) : (mt(\`[isDirectoryDot] Part "\${f}" is not a directory.\`), {
          exists: !1,
          isDirectory: !1,
          hasChildren: !1
        });
      }
      return mt("[isDirectoryDot] Path does not exist."), {
        exists: !1,
        isDirectory: !1,
        hasChildren: !1
      };
    } catch (i) {
      return nd("[isDirectoryDot] Error checking directory:", i), {
        exists: !1,
        isDirectory: !1,
        hasChildren: !1
      };
    }
  },
  async listFilesDot(t, e, r = !0) {
    try {
      let i;
      try {
        i = await nt.resolveRef(t, e);
      } catch {
        return pe.consoleDotLog("No commit found, returning empty list."), [];
      }
      const n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set(), o = async (f, u = "") => {
        if (a.has(f)) return;
        a.add(f), pe.consoleDotLog("Traversing tree:", f, "Path:", u);
        const { tree: m } = await ne.readTree({ fs: t, dir: e, oid: f });
        await Promise.all(m.map(async (g) => {
          const y = u ? \`\${u}/\${g.path}\` : g.path;
          if (n.has(y) || n.set(y, {
            path: y,
            type: g.type,
            oid: g.oid,
            commitOid: i
          }), g.type === "tree")
            return o(g.oid, y);
        }));
      }, { commit: s } = await nt.readCommit(t, e, i);
      await o(s.tree);
      let l = Array.from(n.values());
      return r || (l = l.filter((f) => f.type !== "tree")), pe.consoleDotLog("Total entries:", l.length, "Entries:", l), l;
    } catch (i) {
      throw pe.consoleDotLog("Error in listFilesDot:", i), i;
    }
  },
  async mkdirDot(t, e, r, i = "sample", n = "sample@email.com", a = 1) {
    try {
      pe.consoleDotLog(\`Creating directories for path: \${r}\`), r = r.replace(/^\\/+|\\/+$/g, "");
      const o = r.split("/"), s = await this.isDirectoryDot(t, e, r);
      if (s.exists) {
        if (!s.isDirectory)
          throw new Error(\`Path \${r} exists and is a file - cannot create as directory\`);
        return {
          dirPath: r,
          existing: !0,
          treeOid: s.treeOid,
          commitOid: null,
          action: "none"
        };
      }
      let l = await nt.resolveRef(t, e).catch(() => null), f = l ? (await nt.readCommit(t, e, l)).commit.tree : null, u = f ? (await ne.readTree({ fs: t, dir: e, oid: f })).tree : [], m = [], g = f, y = u, E = 0;
      for (const R of o) {
        let I = y.find((T) => T.path === R && T.type === "tree");
        if (!I) {
          const T = await ne.writeTree({ fs: t, dir: e, tree: [] });
          I = { path: R, mode: "040000", oid: T, type: "tree" }, y.push(I), E++;
        }
        m.push({ tree: y, subtree: I }), g = I.oid, y = (await ne.readTree({ fs: t, dir: e, oid: g })).tree;
      }
      for (let R = m.length - 1; R >= 0; R--) {
        const { tree: I, subtree: T } = m[R];
        I.find((D) => D.path === T.path).oid = g, g = await ne.writeTree({ fs: t, dir: e, tree: I });
      }
      let A = null;
      return a ? (A = await ne.commit({
        fs: t,
        dir: e,
        author: { name: i, email: n },
        message: \`Created directory: \${r}\`,
        tree: g,
        parent: l ? [l] : []
      }), pe.consoleDotLog(\`New commit OID for directory creation: \${A}\`)) : (hr.set(r, {
        type: "writeDir",
        treeOid: g,
        filePath: r,
        action: "staged"
      }), pe.consoleDotLog(\`Staged write for \${r} with treeOid \${g}\`)), {
        dirPath: r,
        treeOid: g,
        commitOid: A,
        createdTrees: E,
        action: a ? "committed" : "staged"
      };
    } catch (o) {
      throw pe.consoleDotLog("Error in mkdirdot:", o), o;
    }
  },
  async removeFileDot(t, e, r, i = 1) {
    try {
      pe.consoleDotLog(\`[removeFileDot] Starting removal for: \${r}, staged files: \`, hr), r = r.replace(/^\\/+|\\/+$/g, "");
      const n = r.split("/"), a = n.pop(), o = await nt.resolveRef(t, e), { commit: s } = await nt.readCommit(t, e, o), { tree: l } = await ne.readTree({
        fs: t,
        dir: e,
        oid: s.tree
      });
      let f = null, u = null;
      const g = l.filter((E) => E.type === "tree").find((E) => E.path === "");
      if (g) {
        const { tree: E } = await ne.readTree({
          fs: t,
          dir: e,
          oid: g.oid
        });
        if (f = E.find((A) => A.path === a), f) {
          pe.consoleDotLog(\`[removeFileDot] Found \${a} in unnamed subtree\`);
          const A = E.filter((T) => T.path !== a), R = await ne.writeTree({
            fs: t,
            dir: e,
            tree: A
          }), I = l.map(
            (T) => T.path === "" && T.type === "tree" ? { ...T, oid: R } : T
          );
          u = await ne.writeTree({
            fs: t,
            dir: e,
            tree: I
          });
        }
      }
      if (!f) {
        const E = async (A, R) => {
          const { tree: I } = await ne.readTree({ fs: t, dir: e, oid: A });
          if (R.length === 0) {
            if (f = I.find((O) => O.path === a), !f)
              throw new Error(\`File \${a} not found in tree\`);
            const U = I.filter((O) => O.path !== a);
            return await ne.writeTree({ fs: t, dir: e, tree: U });
          }
          const T = R[0], D = I.find((U) => U.path === T && U.type === "tree");
          if (!D) throw new Error(\`Directory \${T} not found\`);
          const P = await E(D.oid, R.slice(1)), M = I.map(
            (U) => U.path === T && U.type === "tree" ? { ...U, oid: P } : U
          );
          return await ne.writeTree({ fs: t, dir: e, tree: M });
        };
        u = await E(s.tree, n);
      }
      if (!f)
        throw new Error(\`File \${r} not found in repository\`);
      let y = null;
      return i ? (y = await ne.commit({
        fs: t,
        dir: e,
        author: { name: "System", email: "system@example.com" },
        message: \`Removed file \${r}\`,
        tree: u,
        parent: [o]
      }), pe.consoleDotLog(\`[removeFileDot] Committed removal: \${y}\`)) : (hr.set(r, {
        type: "remove",
        oid: f.oid,
        treeOid: u,
        filePath: r,
        action: "staged"
      }), pe.consoleDotLog(\`Staged removal for \${r} with blobOid \${f.oid}\`)), {
        filePath: r,
        treeOid: u,
        commitOid: y,
        action: i ? "committed" : "staged",
        blobOid: f.oid
      };
    } catch (n) {
      throw pe.consoleDotLog("[removeFileDot] ERROR:", n), n;
    }
  },
  async removeDirDot(t, e, r, i = 1) {
    try {
      r = r.replace(/^\\/+|\\/+$/g, "");
      const n = r.split("/"), a = n.pop(), o = await nt.resolveRef(t, e), { commit: s } = await nt.readCommit(t, e, o), l = async (g, y) => {
        const { tree: E } = await ne.readTree({ fs: t, dir: e, oid: g });
        if (y.length === 0) {
          const A = E.find((T) => T.path === a && T.type === "tree");
          if (!A)
            throw new Error(\`Directory \${a} not found\`);
          const R = E.filter((T) => T.path !== a);
          return { newTreeOid: await ne.writeTree({ fs: t, dir: e, tree: R }), removedTreeOid: A.oid };
        } else {
          const A = y[0], R = E.find((M) => M.path === A && M.type === "tree");
          if (!R)
            throw new Error(\`Directory not found: \${A}\`);
          const { newTreeOid: I, removedTreeOid: T } = await l(R.oid, y.slice(1)), D = E.map((M) => M.path === A && M.type === "tree" ? { ...M, oid: I } : M);
          return { newTreeOid: await ne.writeTree({ fs: t, dir: e, tree: D }), removedTreeOid: T };
        }
      }, { newTreeOid: f, removedTreeOid: u } = await l(s.tree, n);
      let m = null;
      return i ? m = await ne.commit({
        fs: t,
        dir: e,
        author: { name: "System", email: "system@example.com" },
        message: \`Removed directory \${r}\`,
        tree: f,
        parent: [o]
      }) : (hr.set(r, {
        type: "removeDir",
        treeOid: f,
        filePath: r,
        action: "staged"
      }), pe.consoleDotLog(\`Staged removal for \${r} with newTreeOid \${f}\`)), {
        dirPath: r,
        treeOid: f,
        commitOid: m,
        removedTreeOid: u,
        action: i ? "committed" : "staged"
      };
    } catch (n) {
      throw pe.consoleDotLog("Error in removeDirDot:", n), n;
    }
  }
};
self.onerror = (t) => {
  console.error("Worker initialization error:", t);
};
const ad = new xc(self), Gs = new mi(jr.logging.dotGit), la = new Ws(), Zs = new Ls();
function te(...t) {
  Gs.consoleDotLog(...t);
}
function ge(...t) {
  Gs.consoleDotError(...t);
}
te("gitWorker loaded.");
let le = "/", ht, dt, qe = "main", ct = "", We = "origin", Yt = 10, Pi = "testUser", ji = "testUser@example.com", Vs = {}, se = null, Kn = "/settings", ua = {}, Ot = !0, fa, mr, xt = jr.corsProxy, Ht = !1;
const Ke = {
  async fill() {
    return te("authenticate", ht, dt), { username: ht, password: dt };
  },
  async rejected() {
    const t = new Error("Authentication rejected");
    throw te("Authentication rejected", t), t;
  }
};
async function cr(t) {
  Ht && Ot ? await Zs.sendMessageToChannel(t) : te("This browser doesn't support service worker");
}
self.setAuthParams = async function() {
  await cr({
    operation: "setAuthParams",
    data: { username: ht, password: dt }
  });
};
self.setDir = async function() {
  await cr({ operation: "setDir", data: le });
};
self.setRef = async function() {
  await cr({ operation: "setRef", data: qe });
};
self.setDepth = async function() {
  await cr({ operation: "setDepth", data: Yt });
};
self.setRemote = async function() {
  await cr({ operation: "setRemote", data: We });
};
self.passFsArgs = async function() {
  await cr({ operation: "passFsArgs", data: ua });
};
self.setRepoDir = async function() {
  await cr({ operation: "setRepoDir", data: le });
};
self.setSettingsAddresses = async function() {
  await cr({ operation: "setSettingsAddresses", data: Vs });
};
async function zr(t, e) {
  Ht && Ot ? await Zs.fetchWithServiceWorker(t, e) : te("This browser doesn't support service worker");
}
async function od(t, e = Ot) {
  Ht = t, Ot = e, la.options = { supportsServiceWorker: Ht, useSW: Ot };
}
async function sd(t) {
  le = t, await self.setDir();
}
function cd(t) {
  return /^https?:\\/\\/.+/.test(t);
}
async function _r(t) {
  if (te("seturl url ", t), !cd(t))
    throw new Error("Invalid Git URL format.");
  ct = t;
}
async function Jn(t) {
  qe = t, await self.setRef();
}
async function Xs(t) {
  Yt = t, await self.setDepth();
}
async function ld(t) {
  xt = t;
}
async function ud(t, e) {
  ht = t, dt = e, await self.setAuthParams();
}
async function Ys(t) {
  We = t, await self.setRemote();
}
async function fd() {
  return We;
}
async function hd() {
  try {
    const t = await Qs("library");
    te("libs", t);
    const e = await ga();
    if (te("directories", e), t && e)
      for (const [r, i] of Object.entries(t)) {
        if (!e[i])
          throw new Error(\`File not found: \${i}\`);
        return Vs[i] = {
          fileName: r,
          filePath: i
        }, console.log(\`File mapped: \${i}\`), await self.setSettingsAddresses(), { success: !0 };
      }
    else
      return { success: !1 };
  } catch (t) {
    console.error(\`Error in setSettingsAddresses: \${t.message}\`);
  }
}
async function dd(t, e) {
  return te("entering getFileStoresFromDatabases object"), la.getFileStoreNames(t, e);
}
async function wd({ fsName: t, fsType: e }) {
  try {
    if (te("Initializing FS with:", { _fsName: t, _fsType: e }), !t || !e)
      throw new Error("fsName and fsType are required");
    if (ua = { fsName: t, fsType: e }, mr = t, fa = e, te("Getting FS instance from FSManager"), se = await la.getFS(t, e), !se)
      throw new Error("Failed to initialize file system");
    return te("FS initialized successfully:", se), await self.passFsArgs(), se;
  } catch (r) {
    throw ge("Error initializing file system:", r), r;
  }
}
async function pd(t) {
  let e = await Yr();
  te("current branch", e), te("ref", qe), te("_ref", t);
  let r = await ha();
  if (te("branchesList", r), r.includes(t) || await Ks({ ref: t }), qe === t || e === t) {
    te(\`you are already on the branch \${t}\`);
    return;
  } else {
    let i = await ew();
    if (Object.keys(i).length === 0) {
      await md({ ref: t, noCheckout: !1, noUpdateHead: !1 }), qe = t, await ec({ url: ct }), te("done");
      return;
    } else
      return te("failed"), 0;
  }
}
async function Ks(t) {
  return await ne.branch({
    ...t,
    fs: se,
    dir: le
  });
}
async function md(t) {
  return await ne.checkout({
    ...t,
    fs: se,
    dir: le,
    remote: We
  });
}
async function ha() {
  return await ne.listBranches({
    fs: se,
    dir: le
  });
}
async function Js() {
  try {
    return await ne.listBranches({ fs: se, dir: le, remote: We });
  } catch (t) {
    ge("Error in listBranches:", t);
  }
}
async function Yr() {
  return await ne.currentBranch({
    fs: se,
    dir: le,
    fullname: !1
  });
}
async function gd() {
  const t = await Yr();
  return await gc(\`branch.\${t}.remote\`);
}
function yd(t) {
  const e = {};
  let r = null;
  return t.split(/\\r?\\n/).forEach((i) => {
    if (i = i.trim(), !(!i || i.startsWith(";") || i.startsWith("#")))
      if (i.startsWith("[") && i.endsWith("]"))
        r = i.slice(1, -1).trim(), e[r] = e[r] || {};
      else {
        const [n, a] = i.split("=").map((o) => o.trim());
        r && (e[r][n] = a);
      }
  }), e;
}
function _d(t) {
  let e = "";
  return Object.keys(t).forEach((r) => {
    e += \`[\${r}]
\`, Object.entries(t[r]).forEach(([i, n]) => {
      e += \`    \${i} = \${n}
\`;
    }), e += \`
\`;
  }), e;
}
async function Qs(t = null, e = null) {
  try {
    if (!await se.promises.lstat(Kn).catch(() => null))
      return ge("Settings file does not exist yet."), {};
    if ((await se.promises.readdir(\`\${le}\`)).includes("settings")) {
      const n = await ma({ filePath: Kn }), a = yd(n);
      return te("settingsData,", a), t && e ? a[t] && a[t][e] ? a[t][e] : null : t ? a[t] ? a[t] : null : a;
    } else {
      ge("The settings file dosen't exist yet!");
      return;
    }
  } catch (r) {
    if (r.code === "ENOENT") return {};
    throw r;
  }
}
async function bd(t) {
  const e = _d(t);
  await qi({ filePath: Kn, fileContents: e });
}
async function vd(t, e, r) {
  let i = {};
  try {
    i = await Qs(), te(i), i || (i = {}, te("No past data is available. New file will be created.")), i[t] || (i[t] = {}), i[t][e] = r, te("settingsData", i), await bd(i), te("done");
  } catch {
    te("No past data is available.");
  }
}
async function Ed(t) {
  try {
    return await Hi(t), await pa(t), await da(t);
  } catch (e) {
    te("Something bad happened pushing your file: ", e);
  }
}
async function kd(t) {
  try {
    return await _c(), await pa(t), await da(t);
  } catch (e) {
    te("Something bad happened pushing your files: ", e);
  }
}
async function ec(t) {
  let e = t.attempt || 0;
  t[e] = e;
  const r = 1;
  !ct && await _r(t?.url);
  try {
    if (Ht && Ot)
      try {
        return await zr("fetch", t), { success: !0 };
      } catch (i) {
        return te("Service Worker fetch failed, falling back to Web Worker", i), await ne.fetch({
          ...t,
          fs: se,
          http: $t,
          dir: le,
          corsProxy: xt,
          ref: qe,
          remote: We,
          depth: Yt,
          singleBranch: !1,
          tags: !1,
          headers: At(ht, dt),
          onAuth() {
            return Ke.fill();
          },
          onAuthFailure() {
            return Ke.rejected();
          }
        }), { success: !0 };
      }
    else
      return te("Service Worker not supported, using Web Worker directly"), await ne.fetch({
        ...t,
        fs: se,
        http: $t,
        dir: le,
        corsProxy: xt,
        ref: qe,
        remote: We,
        depth: Yt,
        singleBranch: !1,
        tags: !1,
        headers: At(ht, dt),
        onAuth() {
          return Ke.fill();
        },
        onAuthFailure() {
          return Ke.rejected();
        }
      }), { success: !0 };
  } catch (i) {
    return ge("some error happend while fetching: ", i), await Hr(i, t, "doFetch", r), { success: !1 };
  }
}
async function tc(t) {
  let e = t.attempt || 0;
  t[e] = e;
  const r = 1;
  !ct && await _r(t?.url);
  try {
    await zi(t);
    try {
      if (Ht && Ot)
        try {
          const i = await zr("listServerRefs", { ...t, url: ct });
          return te("listServerRefs result with sw:", i), i;
        } catch (i) {
          te("Service Worker listServerRefs failed, falling back to Web Worker", i);
          const n = await ne.listServerRefs({
            ...t,
            fs: se,
            url: ct,
            http: $t,
            dir: le,
            corsProxy: xt,
            remote: We,
            headers: At(ht, dt),
            onAuth() {
              return Ke.fill();
            },
            onAuthFailure() {
              return Ke.rejected();
            }
          });
          return te("listServerRefs result:", n), { success: !0, refs: n };
        }
      else {
        te("Service Worker not supported, using Web Worker directly");
        const i = await ne.listServerRefs({
          ...t,
          fs: se,
          url: ct,
          http: $t,
          dir: le,
          corsProxy: xt,
          remote: We,
          headers: At(ht, dt),
          onAuth() {
            return Ke.fill();
          },
          onAuthFailure() {
            return Ke.rejected();
          }
        });
        return te("listServerRefs result:", i), { success: !0, refs: i };
      }
    } catch (i) {
      throw i;
    }
  } catch (i) {
    return ge("some error happened while listing server refs: ", i), await Hr(i, t, "listServerRefs", r), { success: !1, error: i.message };
  }
}
async function rc(t) {
  te("getLatestRemoteCommit args:", t);
  const e = t?.url || e, r = await tc({ ...t, url: e });
  te("getLatestRemoteCommit result:", r);
  const i = t?.ref || qe || "HEAD";
  if (te("getLatestRemoteCommit _ref:", i), !r.success)
    return ge("Failed to fetch server refs", r.error), { success: !1, error: r.error };
  const n = r.refs;
  let a = n.find((o) => o.ref === \`refs/heads/\${i}\`)?.oid;
  return a || (a = n.find("refs/heads/main")?.oid), a ? (te("headOid", a), {
    success: !0,
    commit: a
  }) : (ge("Could not determine latest remote commit."), { success: !1, error: \`No HEAD or \${qe} main/master ref found\` });
}
async function ic(t = ct) {
  try {
    const e = await nc(), r = t || r || await mc() || "", i = await rc({ url: r });
    if (!i.success)
      return ge("Failed to get latest remote commit:", i.error), !0;
    const n = i.commit;
    return n === e ? (te("lastRemoteCommit", n, "localRef", e), !0) : (te("lastRemoteCommit", n, "localRef", e), !1);
  } catch (e) {
    return te(
      "Some error happened while checking whether you are in sync or not:",
      e
    ), !1;
  }
}
async function xd() {
  try {
    return (await ne.resolveRef({ fs: se, dir: le, ref: \`/refs/remotes/\${We}/\${qe}\` }))?.trim();
  } catch (t) {
    te(
      "some error happend while getting last remote commit: ",
      t
    );
  }
}
async function nc(t) {
  try {
    const e = t || qe || "HEAD";
    return te("branch", e), (await ne.resolveRef({ fs: se, dir: le, ref: \`refs/heads/\${e}\` }))?.trim();
  } catch (e) {
    te(
      "some error happend while getting last local commit: ",
      e
    );
  }
}
async function ac(t = ct, e = We) {
  try {
    return await Ys(e), await ne.addRemote({
      url: t,
      force: !0,
      fs: se,
      dir: le,
      remote: e
    });
  } catch (r) {
    te("some error happend while adding remote: ", r);
  }
}
async function Sd(t = We) {
  try {
    return await ne.deleteRemote({
      fs: se,
      dir: le,
      remote: t
    });
  } catch (e) {
    te("some error happend while adding remote: ", e);
  }
}
async function oc() {
  return await ne.listRemotes({
    fs: se,
    dir: le
  });
}
async function Id(t) {
  try {
    const e = ct || t?.url, r = We || t?.remote;
    te("handleNoRef args: ", t, e, r, ct, We), await ac(e, r);
    let i = await Js() || [];
    if (te(i), i.length == 0)
      return !1;
  } catch (e) {
    throw ge("Error handling no ref:", e), e;
  }
}
async function Td() {
  try {
    await ne.init({
      fs: se,
      dir: le
    });
  } catch (t) {
    te("something went wrong while initing the repo: ", t);
  }
}
async function Rd() {
  try {
    const t = await se.promises.readdir(le), e = await oc();
    let r = [];
    return e.forEach((i) => r.push(i.url)), te("urls:", r, e, t), !(r.length > 0 && !r.includes(ct) || t.length === 0 || r.length === 0);
  } catch (t) {
    if (t.code === "ENOENT")
      return te("Directory does not exist:", le), !1;
    throw ge("Error checking directory existence:", t), t;
  }
}
async function Bd(t) {
  try {
    return await ne.findMergeBase({
      fs: se,
      dir: le,
      oids: t
    });
  } catch (e) {
    ge("Error finding merge base:", e);
  }
}
async function sc() {
  console.log("🔍 Checking status matrix...");
  const t = await ne.statusMatrix({ fs: se, dir: le });
  console.log("📊 Status Matrix:", t);
  let e = [];
  for (const [i, n, a, o] of t)
    o === 3 && e.push(i);
  if (console.log("⚠️ Conflicted files detected:", e), e.length === 0) {
    console.log("✅ No conflicts found. Skipping merge resolution.");
    return;
  }
  const r = async ({ filepath: i, contents: n }) => {
    console.log(\`🛠️ Running merge driver for: \${i}\`);
    let a = await ne.readFile({ fs: se, dir: le, filepath: i, stage: 1 }).catch(() => ""), o = await ne.readFile({ fs: se, dir: le, filepath: i, stage: 2 }).catch(() => ""), s = await ne.readFile({ fs: se, dir: le, filepath: i, stage: 3 }).catch(() => "");
    return console.log("📄 Base Content:", a), console.log("📄 Our Content:", o), console.log("📄 Their Content:", s), !o || !s ? (console.log("❌ Error: One of the contents is missing. Skipping merge for this file."), { cleanMerge: !1, mergedText: o || s }) : { cleanMerge: !0, mergedText: s };
  };
  try {
    console.log("🔄 Attempting to merge..."), await ne.merge({
      fs: se,
      dir: le,
      ours: qe,
      theirs: \`remotes/\${We}/\${qe}\`,
      abortOnConflict: !0,
      mergeDriver: r
    }), console.log("✅ Merge completed successfully.");
  } catch (i) {
    if (i instanceof Errors.MergeConflictError)
      console.log(
        \`❌ Automatic merge failed for the following files: \${i.data}.\`
      ), console.log("📝 Resolve conflicts manually and commit your changes.");
    else
      throw i;
  }
}
async function Hr(t, e, r, i = 1, n = 0) {
  ge(\`Some error happened while \${r}: \`, t);
  const a = t && (t.toString().includes("401") || t.toString().includes("403")), o = t && t.toString().toLowerCase().includes("network") || t.toString().toLowerCase().includes("fetch"), s = t && t.toString().includes("CheckoutConflictError") || t.toString().toLowerCase().includes("MergeConflictError");
  if (a || o)
    throw te("Authentication or network error detected. Not deleting the repository."), t;
  if (s) {
    te("Merge conflicts resolved."), await sc(), te("Merge conflicts resolved.");
    return;
  }
  const l = e.attempt || 0;
  if (l < 1) {
    if (l < i)
      if (n) {
        const f = await ic(0);
        !f && await $d({ ...e, attempt: l + 1 }), f && await Hn({ ...e, attempt: l + 1 });
      } else
        await Hn({ ...e, attempt: l + 1 });
  } else if (l >= 1)
    l < i && await Hn({ ...e, attempt: l + 1 });
  else
    throw new Error(\`\${r} wasn't successful: \${t}\`);
}
async function $d(t) {
  const e = t?.attempt + 1 || 1;
  te(\`Attempting hard reset for \${mr}. Attempt: \${e}\`);
  try {
    return await fc({ dir: le, ref: "HEAD~1", branch: qe }), te(\`Hard reset to HEAD~1 successful for \${mr}\`), e;
  } catch (r) {
    throw ge(\`Error during hard reset for \${mr}: \`, r), r;
  }
}
async function Hn(t) {
  const e = t?.attempt + 1 || 1;
  try {
    await Ws.deleteFs(mr, fa), await cc({ ...t, url: t.url, attempt: e });
    return;
  } catch (r) {
    ge(\`Error during delete, close, and reclone process for \${mr}: \`, r);
  }
}
async function cc(t) {
  te("doCloneAndStuff args: ", t);
  let e = !1, r = t.attempt || 0;
  t[r] = r;
  const i = 1;
  !ct && await _r(t?.url), await Xs(Yt);
  try {
    let n = !0, a = await Rd();
    if (te("dirExists", a), a && !e) {
      te("Directory already exists. Using existing directory...");
      let o = await Yr();
      return await Jn(o), { handleNoRefResult: n, message: "exists", success: !0 };
    } else {
      te("Cloning repository ...");
      const o = await Dd(t);
      let s = await Yr();
      await Jn(s), te(o, s), o?.data && o?.data?.isCacheUsed && await yc({
        url: t.url
      }), n = await Id(t), await Ad();
    }
    return { handleNoRefResult: n, message: "notExist", success: !0 };
  } catch (n) {
    return await Hr(n, t, "doCloneAndStuff", i), { handleNoRefResult: !1, message: "error", success: !1 };
  }
}
async function Oi(t) {
  return (await se.promises.lstat(t)).isDirectory();
}
async function lc(t) {
  try {
    if (!await Oi(t))
      await Co(t);
    else {
      const e = await se.promises.readdir(t);
      for (const r of e) {
        const i = \`\${t}/\${r}\`;
        await Oi(i) ? (await lc(i), await se.promises.rmdir(i)) : await Co(i), await se.promises.rmdir(t);
      }
    }
  } catch (e) {
    if (e.code === "ENOENT") {
      te(\`File \${t} already deleted, skipping...\`);
      return;
    }
    ge("Error while removing directory contents:", e);
  }
}
async function Ad() {
  try {
    let t = await Js(), e = await ha();
    te("remoteBranches", t), te("localBranches", e), e.push("HEAD");
    const r = t.filter((n) => !e.includes(n));
    te("filteredBranches", r);
    let i = le === "/" ? "" : le;
    await Promise.all(
      r.map(async (n) => {
        await Ks({
          ref: n,
          object: i + \`/.git/refs/remotes/\${We}/\${n}\`
        }), await qi({
          filePath: i + \`/.git/refs/heads/\${n}\`,
          fileContents: await ma({ filePath: i + \`/.git/refs/remotes/\${We}/\${n}\` })
        });
      })
    );
  } catch (t) {
    throw ge("Error initializing local branches:", t), t;
  }
}
function At(t, e) {
  return !t && !e ? (te("No username or password provided. Returning empty headers."), {}) : {
    authorization: \`Basic \${btoa(\`\${t}:\${e}\`)}\`
  };
}
async function Dd(t) {
  try {
    let e;
    if (Ht && Ot)
      try {
        e = await zr("clone", t);
      } catch (r) {
        te("Service Worker clone failed, falling back to Web Worker", r), e = await ne.clone({
          ...t,
          fs: se,
          http: $t,
          dir: le,
          remote: We,
          ref: qe,
          corsProxy: xt,
          depth: Yt,
          headers: At(ht, dt),
          onAuth() {
            return Ke.fill();
          },
          onAuthFailure() {
            return Ke.rejected();
          }
        });
      }
    else
      te("Service Worker not supported, using Web Worker directly"), e = await ne.clone({
        ...t,
        fs: se,
        http: $t,
        dir: le,
        remote: We,
        ref: qe,
        corsProxy: xt,
        depth: Yt,
        headers: At(ht, dt),
        onAuth() {
          return Ke.fill();
        },
        onAuthFailure() {
          return Ke.rejected();
        }
      });
    return e;
  } catch (e) {
    throw ge("Some error happened while cloning:", e), e;
  }
}
async function uc(t) {
  let e = t.split("/").filter((i) => i.trim() !== ""), r = le.split("/").filter((i) => i.trim() !== "").join("").length;
  return e = e.join("/"), e = le === "/" ? e : e.slice(r + 1), e;
}
async function Od(t) {
  try {
    let e = await uc(t.filePath);
    await ne.remove({
      fs: se,
      dir: le,
      filepath: e
    }), await lc(t.filePath);
  } catch (e) {
    ge("Error while removing the file:", e);
  }
}
async function Co(t) {
  try {
    await se.promises.unlink(t);
  } catch (e) {
    ge("Error occured while unlinking:", e);
  }
}
async function Cd(t, e) {
  try {
    if (t === e)
      return;
    await wa(e), await se.promises.rename(t, e);
  } catch (r) {
    ge("Error occured while renaming filePath:", r);
  }
}
async function Nd(t = {}) {
  try {
    te("Attempting to retrieve log with the following args:", { ...t, fs: se, depth: Yt, dir: le, ref: qe });
    const e = await ne.log({ ...t, fs: se, depth: Yt, dir: le, ref: qe });
    return te("git.log result:", e), e;
  } catch (e) {
    throw ge("Error in log:", e), e && typeof e == "object" && Object.keys(e).length > 0 ? (ge("Error properties:", Object.keys(e)), ge("Full error object:", JSON.stringify(e, null, 2))) : ge("An unknown error occurred, and no additional error details are available."), new Error("An unknown error occurred during the log operation");
  }
}
async function da(t) {
  te("Starting to push with these args: ", t);
  let e = t.attempt || 0;
  t[e] = e;
  const r = 1, i = t?.force || !0;
  !ct && await _r(t?.url);
  try {
    await zi(t);
    try {
      if (Ht && Ot)
        try {
          return await zr("push", t), { success: !0 };
        } catch (n) {
          return te("Service Worker push failed, falling back to Web Worker", n), await ne.push({
            ...t,
            fs: se,
            http: $t,
            dir: le,
            corsProxy: xt,
            remote: We,
            ref: qe,
            force: i,
            headers: At(ht, dt),
            onAuth() {
              return Ke.fill();
            },
            onAuthFailure() {
              return Ke.rejected();
            }
          }), { success: !0 };
        }
      else
        return te("Service Worker not supported, using Web Worker directly"), await ne.push({
          ...t,
          fs: se,
          http: $t,
          dir: le,
          corsProxy: xt,
          remote: We,
          ref: qe,
          force: !0,
          headers: At(ht, dt),
          onAuth() {
            return Ke.fill();
          },
          onAuthFailure() {
            return Ke.rejected();
          }
        }), te("Pushing was successful."), { success: !0 };
    } catch (n) {
      throw n;
    }
  } catch (n) {
    return ge("some error happend while pushing: ", n), await Hr(n, t, "push", r), { success: !1 };
  }
}
async function Fd(t = "push") {
  try {
    await wc() && await pc() || (await hc({ username: Pi }), await dc({ email: ji })), await ne.stash({
      fs: se,
      dir: le,
      op: t
    });
  } catch (e) {
    ge("An error occurred while stashing:", e);
  }
}
async function Ud(t) {
  return await ne.status({
    fs: se,
    dir: le,
    filepath: t?.filePath
  });
}
async function Md(t, e = qe = "HEAD") {
  se.writeFile(le + \`/.git/refs/heads/\${e}\`, t, (r) => {
    if (r) throw r;
    console.log("git reset has successfully done.");
  });
}
async function fc({ dir: t, ref: e, branch: r }) {
  var i = /^HEAD~([0-9]+)$/, n = e.match(i);
  if (n) {
    var a = +n[1], o = await ne.log({ fs: se, dir: t, depth: a + 1 }), s = o.pop().oid;
    return new Promise((l, f) => {
      se.writeFile(t + \`/.git/refs/heads/\${r}\`, s, (u) => {
        if (u)
          return f(u);
        se.unlink(t + "/.git/index", (m) => {
          if (m)
            return f(m);
          ne.checkout({ fs: se, dir: t, ref: r, force: !0 }).then(l);
        });
      });
    });
  }
  return Promise.reject(\`Wrong ref \${e}\`);
}
async function hc(t) {
  try {
    const e = t?.name ? t?.name : "sampleUser";
    Pi = e, await ne.setConfig({
      fs: se,
      dir: le,
      path: "user.name",
      value: e
    });
  } catch (e) {
    ge("An error occurred while setting user name:", e);
  }
}
async function dc(t) {
  try {
    const e = t?.email ? t?.email : "sampleUser";
    ji = e, await ne.setConfig({
      fs: se,
      dir: le,
      path: "user.email",
      value: e
    });
  } catch (e) {
    ge("An error occurred while setting email:", e);
  }
}
async function wc() {
  try {
    const t = await ne.getConfig({
      fs: se,
      dir: le,
      path: "user.email"
    });
    return te(t), t;
  } catch (t) {
    ge("An error occurred while getting email:", t);
  }
}
async function pc() {
  try {
    const t = await ne.getConfig({
      fs: se,
      dir: le,
      path: "user.name"
    });
    return te(t), t;
  } catch (t) {
    ge("An error occurred while getting username:", t);
  }
}
async function mc(t = We) {
  try {
    return await ne.getConfig({
      fs: se,
      dir: le,
      path: \`remote.\${t}.url\`
    });
  } catch (e) {
    ge("An error occurred while getting remote url:", e);
  }
}
async function Ld(t = ct, e = We) {
  try {
    await ne.setConfig({
      fs: se,
      dir: le,
      path: \`remote.\${e}.url\`,
      value: t
    });
  } catch (r) {
    ge("An error occurred while setting remote url:", r);
  }
}
async function gc(t) {
  try {
    const e = await ne.getConfig({
      fs: se,
      dir: le,
      path: t
    });
    return te(e), e;
  } catch (e) {
    ge("An error occurred while getting config:", e);
  }
}
async function Pd(t, e) {
  try {
    await ne.setConfig({
      fs: se,
      dir: le,
      path: t,
      value: e
    });
  } catch (r) {
    ge("An error occurred while setting config:", r);
  }
}
async function zi(t) {
  try {
    await hc(t), await dc(t);
  } catch (e) {
    ge("An error occurred while setting configs:", e);
  }
}
async function jd(t = "HEAD") {
  return await ne.resolveRef({
    fs: se,
    dir: le,
    ref: t
  });
}
async function zd(t) {
  return await ne.readCommit({
    fs: se,
    dir: le,
    oid: t
  });
}
async function Hd(t) {
  await ne.writeCommit({
    fs: se,
    dir: le,
    commit: t
  });
}
async function qd(t) {
  await ne.writeRef({
    fs: se,
    dir: le,
    ref: "refs/heads/main",
    value: t
  });
}
async function Wd(t = "") {
  await qt.commitStagedChanges(se, le);
}
async function Gd(t, e = "staged") {
  try {
    te(\`[GITWorker] Reading file: \${t}\`), te("Current FS state:", { fs: se, fsName: mr, fsType: fa, fsArgs: ua });
    const r = await se.promises.readdir("/");
    te("Root directory contents:", r);
    const i = await qt.readFileDot(se, le, t, e);
    return te(\`[GITWorker] Successfully read file: \${t}\`), i;
  } catch (r) {
    throw ge(\`[GITWorker] Failed to read file \${t}:\`, r), new Error(\`Failed to read file: \${r.message}\`);
  }
}
async function Zd(t, e, r = 1) {
  try {
    te(\`[GITWorker] Writing to file: \${t}\`);
    const i = await qt.writeFileDot(
      se,
      le,
      t,
      e,
      Pi,
      ji,
      r
    );
    return te(\`[GITWorker] Successfully wrote to file: \${t}\`), i;
  } catch (i) {
    throw ge(\`[GITWorker] Failed to write to file \${t}:\`, i), new Error(\`Failed to write file: \${i.message}\`);
  }
}
async function No(t, e = "staged") {
  try {
    te(\`[GITWorker] Reading directory: \${t}\`);
    const r = await qt.readDirDot(se, le, t, e);
    return te(\`[GITWorker] Directory contents for \${t}:\`, r), r;
  } catch (r) {
    throw ge(\`[GITWorker] Failed to read directory \${t}:\`, r), new Error(\`Failed to read directory: \${r.message}\`);
  }
}
async function Fo(t) {
  try {
    te(\`[GITWorker] Checking if path is directory: \${t}\`);
    const e = await qt.isDirectoryDot(se, le, t);
    return te(\`[GITWorker] Path \${t} is directory:\`, e), e;
  } catch (e) {
    throw ge(\`[GITWorker] Failed to check directory status for \${t}:\`, e), new Error(\`Failed to check directory: \${e.message}\`);
  }
}
async function Uo(t = 1) {
  try {
    te("[GITWorker] Listing all files");
    const e = await qt.listFilesDot(se, le, t);
    return te("[GITWorker] File list:", e), e;
  } catch (e) {
    throw ge("[GITWorker] Failed to list files:", e), new Error(\`Failed to list files: \${e.message}\`);
  }
}
async function Mo(t, e = 1) {
  try {
    te(\`[GITWorker] Creating directory: \${t}\`);
    const r = await qt.mkdirDot(se, le, t, Pi, ji, e);
    return te(\`[GITWorker] Successfully created directory: \${t}\`), r;
  } catch (r) {
    throw ge(\`[GITWorker] Failed to create directory \${t}:\`, r), new Error(\`Failed to create directory: \${r.message}\`);
  }
}
async function Vd(t, e = 1) {
  try {
    te(\`[GITWorker] Removing directory: \${t}\`);
    const r = await qt.removeDirDot(se, le, t, e);
    return te(\`[GITWorker] Successfully removed directory: \${t}\`), r;
  } catch (r) {
    throw ge(\`[GITWorker] Failed to remove directory \${t}:\`, r), new Error(\`Failed to remove directory: \${r.message}\`);
  }
}
async function Xd(t, e = 1) {
  try {
    te(\`[GITWorker] Removing file: \${t}\`);
    const r = await qt.removeFileDot(se, le, t, e);
    return te(\`[GITWorker] Successfully removed file: \${t}\`), r;
  } catch (r) {
    throw ge(\`[GITWorker] Failed to remove file \${t}:\`, r), new Error(\`Failed to remove file: \${r.message}\`);
  }
}
async function Yd(t) {
  try {
    te(\`[GITWorker] Searching git history for: \${t}\`);
    const e = await qt.findInGitHistory(se, le, t);
    return te(\`[GITWorker] Found git history for \${t}:\`, e), e;
  } catch (e) {
    throw ge(\`[GITWorker] Failed to search git history for \${t}:\`, e), new Error(\`Failed to search git history: \${e.message}\`);
  }
}
async function wa(t) {
  const e = t.split("/").filter((i) => i.trim() !== "");
  let r = "";
  for (const i of e) {
    r === "/" ? r += i : r += "/" + i;
    try {
      te("recur", r), await se.promises.mkdir(r);
    } catch (n) {
      n.code === "EEXIST" || ge(\`Error creating directory: \${r}\`, n);
    }
  }
}
async function Kd(t) {
  let e = t.attempt || 0;
  t[e] = e;
  const r = 1;
  !ct && await _r(t?.url);
  try {
    await zi(t);
    try {
      if (Ht && Ot)
        try {
          return await zr("pull", t), { success: !0 };
        } catch (i) {
          return te("Service Worker pull failed, falling back to Web Worker", i), await ne.pull({
            ...t,
            fs: se,
            http: $t,
            dir: le,
            corsProxy: xt,
            remote: We,
            remoteRef: qe,
            fastForward: !0,
            forced: !0,
            singleBranch: !0,
            headers: At(ht, dt),
            onAuth() {
              return Ke.fill();
            },
            onAuthFailure() {
              return Ke.rejected();
            }
          }), { success: !0 };
        }
      else
        return te("Service Worker not supported, using Web Worker directly"), await ne.pull({
          ...t,
          fs: se,
          http: $t,
          dir: le,
          corsProxy: xt,
          remote: We,
          remoteRef: qe,
          fastForward: !0,
          forced: !0,
          singleBranch: !0,
          headers: At(ht, dt),
          onAuth() {
            return Ke.fill();
          },
          onAuthFailure() {
            return Ke.rejected();
          }
        }), { success: !0 };
    } catch (i) {
      throw i;
    }
  } catch (i) {
    return ge("some error happend while pulling: ", i), await Hr(i, t, "pull", r), { success: !1 };
  }
}
async function yc(t) {
  let e = t.attempt || 0;
  t[e] = e;
  const r = 1;
  try {
    if (!ct && await _r(t?.url), Ht && Ot)
      try {
        return await zr("fastForward", t), { success: !0 };
      } catch (i) {
        return te("Service Worker fastForward failed, falling back to Web Worker", i), await ne.fastForward({
          ...t,
          fs: se,
          cache,
          http: $t,
          dir: le,
          remote: We,
          corsProxy: xt,
          ref: qe,
          remoteref: qe,
          forced: !0,
          singleBranch: !1,
          headers: At(ht, dt),
          onAuth() {
            return Ke.fill();
          },
          onAuthFailure() {
            return Ke.rejected();
          }
        }), { success: !0 };
      }
    else
      return te("Service Worker not supported, using Web Worker directly"), await ne.fastForward({
        ...t,
        fs: se,
        cache,
        http: $t,
        dir: le,
        remote: We,
        corsProxy: xt,
        ref: qe,
        remoteref: qe,
        forced: !0,
        singleBranch: !1,
        headers: At(ht, dt),
        onAuth() {
          return Ke.fill();
        },
        onAuthFailure() {
          return Ke.rejected();
        }
      }), { success: !0 };
  } catch (i) {
    return te("This error occured while fast-forwarding: ", i), await Hr(i, t, "fastForward", r), { success: !1 };
  }
}
async function Hi(t) {
  try {
    te("addFile log", t);
    let e = await uc(t.filePath);
    await ne.add({
      fs: se,
      dir: le,
      filepath: e
    });
  } catch (e) {
    ge("An error occurred while adding the file(s):", e);
  }
}
async function _c() {
  try {
    const t = await bc();
    te("changedFiles", t);
    for (let e in t)
      t[e].includes("deleted") ? await Od({ filePath: e }) : await Hi({ filePath: e });
  } catch (t) {
    ge("Error adding all changed files:", t);
  }
}
async function Jd(t) {
  try {
    await qi(t), await Hi(t);
  } catch (e) {
    ge("Error adding file to staging area:", e);
  }
}
async function pa(t) {
  try {
    await ne.commit({
      fs: se,
      dir: le,
      author: {
        name: t.username,
        email: t.email
      },
      message: t.commitMessage || "Commit by dnegar"
    });
  } catch (e) {
    te("This error occured while commiting: ", e);
  }
}
async function Qd(t) {
  try {
    return await se.promises.readdir(t);
  } catch (e) {
    throw ge("Error reading directory:", e), e;
  }
}
async function ma(t) {
  try {
    return await se.promises.readFile(t.filePath, "utf8");
  } catch (e) {
    throw ge("Error reading file:", e), e;
  }
}
async function ga(t = le) {
  try {
    let e = t, r = await se.promises.readdir(t), i = {};
    for (const n of r)
      e !== "/" ? t = e + "/" + n : t = e + n, await Oi(t) ? i = Object.assign(await ga(t), i) : i[t] = n;
    return te("result", i), i;
  } catch (e) {
    throw ge("Error listing files:", e), e;
  }
}
async function qi(t) {
  try {
    await wa(t.filePath), await se.promises.writeFile(t.filePath, t.fileContents, "utf8");
  } catch (e) {
    ge("an error happend while writing to file:", e);
  }
}
async function bc() {
  let i = await ne.statusMatrix({ fs: se, dir: le });
  return i = i.filter((n) => n[1] !== n[2] || n[1] !== n[3]), await vc(i);
}
async function ew() {
  let i = await ne.statusMatrix({ fs: se, dir: le });
  return i = i.filter((n) => n[2] !== n[3] || n[1] !== n[3]), await vc(i);
}
async function vc(t) {
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
    const i = {};
    return t.forEach((n) => {
      const a = n[0], o = r[n.slice(1).join("")];
      le !== "/" ? i[le + "/" + a] = o : i[le + a] = o;
    }), te(i), i;
  } catch (i) {
    ge("Error getting changed files list:", i);
  }
}
function tw(t) {
  return {
    message: t.message,
    stack: t.stack,
    name: t.name,
    code: t.code
  };
}
function Gr(t) {
  if (!(t === void 0 || typeof t == "function")) {
    if (t instanceof Error)
      return tw(t);
    if (Array.isArray(t))
      return t.map(Gr);
    if (t && typeof t == "object") {
      const e = {};
      for (const r in t)
        e[r] = Gr(t[r]);
      return e;
    }
    return t;
  }
}
const Lo = {
  setFs: wd,
  doCloneAndStuff: cc,
  doFetch: ec,
  doPushFile: Ed,
  doPushAll: kd,
  addFile: ({ filePath: t }) => Hi({ filePath: t }),
  commit: ({ username: t, email: e, commitMessage: r }) => pa({ username: t, email: e, commitMessage: r }),
  push: ({ url: t, remote: e, ref: r, force: i = !0 }) => da({ url: t, remote: e, ref: r, force: i }),
  pull: ({ url: t, remote: e, ref: r }) => Kd({ url: t, remote: e, ref: r }),
  addDot: _c,
  addFileToStaging: Jd,
  commitStagedChanges: Wd,
  status: Ud,
  log: Nd,
  listFiles: ({ filePath: t }) => ga(t),
  listFilesDot: ({ filePath: t }) => Uo(t),
  listRemotes: oc,
  listBranches: ha,
  checkoutBranch: ({ ref: t }) => pd(t),
  currentBranch: Yr,
  currentRemote: gd,
  setRemote: ({ remote: t }) => Ys(t),
  setRemoteUrl: ({ url: t, remote: e }) => Ld(t, e),
  getRemoteUrl: ({ remote: t }) => mc(t),
  getRemote: ({ remote: t }) => fd(),
  getRemoteCommitInLocalRepo: ({ remote: t }) => xd(),
  getChangedFilesList: bc,
  getLatestRemoteCommit: ({ url: t, remote: e }) => rc({ url: t, remote: e }),
  getLastLocalCommit: ({ ref: t }) => nc(t),
  isSync: ({ url: t }) => ic(t),
  hardReset: fc,
  softReset: ({ commitHash: t, branch: e }) => Md(t, e),
  addRemote: ({ url: t, remote: e }) => ac(t, e),
  deleteRemote: ({ remote: t }) => Sd(t),
  findMergeBase: ({ oids: t }) => Bd(t),
  findInGitHistory: Yd,
  resolveMergeConflict: sc,
  fastForward: yc,
  setConfigs: zi,
  setUrl: ({ url: t }) => _r(t),
  setCorsProxy: ({ corsProxy: t }) => ld(t),
  setSWUsage: ({ useSW: t }) => od(t),
  setDir: ({ dir: t }) => sd(t),
  setDepth: ({ depth: t }) => Xs(t),
  setRef: ({ ref: t }) => Jn(t),
  setAuthParams: ({ username: t, password: e }) => ud(t, e),
  setSettingsAddresses: hd,
  addToSetting: vd,
  stash: ({ operation: t }) => Fd(t),
  readFile: ({ filePath: t }) => ma({ filePath: t }),
  readFileDot: ({ filePath: t, commitOid: e = "staged" }) => Gd(t, e),
  writeFileDot: ({ filePath: t, fileContent: e, doCommit: r = 1 }) => Zd(t, e, r),
  writeFile: ({ filePath: t, fileContents: e }) => qi({ filePath: t, fileContents: e }),
  readDirDot: ({ path: t, commitOid: e = "staged" }) => No(t, e),
  isDirectoryDot: ({ path: t }) => Fo(t),
  listFilesDot: ({ listDirs: t = 1 }) => Uo(t),
  mkdirDot: ({ dirPath: t, doCommit: e = 1 }) => Mo(t, e),
  removeDirDot: ({ dirPath: t, doCommit: e = 1 }) => Vd(t, e),
  removeFileDot: ({ filePath: t, doCommit: e = 1 }) => Xd(t, e),
  rename: ({ oldPath: t, newPath: e }) => Cd(t, e),
  mkdirRecursive: ({ path: t }) => wa(t),
  mkdirDot: ({ path: t }) => Mo(t),
  listServerRefs: ({ args: t }) => tc(t),
  getUsername: pc,
  getEmail: wc,
  getConfig: ({ path: t }) => gc(t),
  setConfig: ({ path: t, value: e }) => Pd(t, e),
  resolveRef: ({ ref: t }) => jd(t),
  readCommit: ({ head: t }) => zd(t),
  writeCommit: Hd,
  writeRef: qd,
  init: Td,
  isDirectory: ({ path: t }) => Oi(t),
  isDirectoryDot: ({ path: t }) => Fo(t),
  readdir: ({ path: t }) => Qd(t),
  readDirDot: ({ path: t }) => No(t),
  getFileStoresFromDatabases: dd
};
let Ec;
const rw = new Promise((t) => {
  Ec = t;
}), kc = {
  execute: async (t, e = {}) => {
    try {
      const r = Lo[t];
      if (!r) throw new Error(\`Unknown operation: \${t}\`);
      const i = Gr(e), n = await r(i);
      return Gr(n);
    } catch (r) {
      throw Gr(r);
    }
  },
  // Special case for ready check
  ready: () => rw,
  // Maintain backward compatibility with direct method calls
  // by proxying them to execute()
  ...Object.fromEntries(
    Object.keys(Lo).map((t) => [
      t,
      async (e) => kc.execute(t, e)
    ])
  )
};
Ec();
ad.set("workerThread", kc);
te("Worker initialized and ready");
//# sourceMappingURL=gitWorker.js.map
`, F = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", O], { type: "text/javascript;charset=utf-8" });
function q(s) {
  let n;
  try {
    if (n = F && (self.URL || self.webkitURL).createObjectURL(F), !n) throw "";
    const e = new Worker(n, {
      type: "module",
      name: s?.name
    });
    return e.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(n);
    }), e;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(O),
      {
        type: "module",
        name: s?.name
      }
    );
  }
}
const j = new E(m.logging.WorkerPool);
function x(...s) {
  j.consoleDotLog("[WorkerPool]", ...s);
}
function A(...s) {
  j.consoleDotError("[WorkerPool]", ...s);
}
x("Loading workerPool.");
class V {
  constructor(n = null) {
    this.workers = /* @__PURE__ */ new Map(), this.workerCount = 0, this.WorkerClass = n || (typeof Worker < "u" ? Worker : null);
  }
  async getWorker(n, e = !1) {
    try {
      if (!this.WorkerClass)
        throw new Error("Worker class not available in this environment");
      if (!this.workers.has(n)) {
        x(`Creating new worker for ${n}`);
        const r = new q();
        r.onerror = (l) => {
          throw A("Worker error:", l), A("Error details:", {
            filename: l.filename,
            lineno: l.lineno,
            colno: l.colno,
            message: l.message
          }), l;
        };
        const i = new G(r), a = await Promise.race([
          i.get("workerThread"),
          new Promise(
            (l, d) => setTimeout(() => d(new Error("Worker thread timeout")), 5e3)
          )
        ]);
        x("Worker thread obtained, waiting for readiness..."), await a.ready(), x("Worker is ready");
        const c = typeof navigator < "u" && "serviceWorker" in navigator;
        await a.execute("setSWUsage", { supportsServiceWorker: c, useSW: e }), this.workers.set(n, {
          worker: r,
          portal: i,
          thread: a,
          users: 0
        }), this.workerCount++, x(`Worker for ${n} initialized`);
      }
      const t = this.workers.get(n);
      return t.users++, t;
    } catch (t) {
      throw A(`Failed to get worker for ${n}:`, t), t;
    }
  }
  async releaseWorker(n) {
    if (this.workers.has(n)) {
      const e = this.workers.get(n);
      e.users--, e.users <= 0 && (e.worker.terminate(), this.workers.delete(n), this.workerCount--, x(`Terminated worker for ${n}`));
    }
  }
  async forceTerminateAll() {
    for (const [n, { worker: e }] of this.workers)
      e.terminate(), x(`Force terminated worker for ${n}`);
    this.workers.clear(), this.workerCount = 0;
  }
  getActiveCount() {
    return this.workerCount;
  }
}
const $ = new V(), M = new E(m.logging.memoryFS);
function f(...s) {
  M.consoleDotLog("[ MemoryFS ] ", ...s);
}
function p(...s) {
  M.consoleDotError("[ MemoryFS ] ", ...s);
}
f("memoryFs loaded.");
class P {
  constructor(n, e = {}) {
    this.fsName = n, this.fileDescriptors = /* @__PURE__ */ new Map(), this.fdCounter = 3, this.workerEntry = null, this.workerThread = null, this.useSW = e?.useSW || null, this.versioningStrategy = e?.versioning?.strategy || m.versioning.strategy, this.doImmediateCommit = this.versioningStrategy === "immediate", f(`MemoryFS created for ${n}`);
  }
  async initializeWorker() {
    this.workerEntry = await $.getWorker(this.fsName, this.useSW), this.workerThread = this.workerEntry.thread, await this.workerThread.execute("setFs", {
      fsName: this.fsName,
      fsType: "memory"
    }), f(`Worker initialized for ${this.fsName}`);
  }
  async cleanup() {
    this.workerEntry && (await $.releaseWorker(this.fsName), this.workerEntry = null, this.workerThread = null);
  }
  async fs_fopen(n, e) {
    this.workerThread || await this.initializeWorker();
    const t = this.fdCounter++;
    return this.fileDescriptors.set(t, { path: n, pos: 0, mode: e }), f(`File descriptor ${t} created for ${n}`), t;
  }
  async fs_fclose(n) {
    return f(`Closing file descriptor: ${n}`), this.fileDescriptors.has(n) ? (this.fileDescriptors.delete(n), f(`File descriptor ${n} closed successfully.`), 0) : (p(`File descriptor ${n} not found.`), -1);
  }
  async fs_fread(n, e) {
    f(`Reading ${e} bytes from file descriptor: ${n}`);
    const t = this.fileDescriptors.get(n);
    if (!t)
      return p(`File descriptor ${n} not found.`), null;
    try {
      this.workerThread || await this.initializeWorker();
      const r = await this.workerThread.execute("readFileDot", { filePath: t.path });
      if (f(`Data read from file ${t.path}:`, r), r === null)
        return p(`Data is null for file ${t.path}.`), null;
      const i = r.slice(t.pos, t.pos + e);
      return t.pos += i.length, f(`Read chunk: ${i}, new position: ${t.pos}`), i;
    } catch (r) {
      return p(`Error reading file ${t.path}:`, r), null;
    }
  }
  async fs_fwrite(n, e) {
    f(`Writing content to file descriptor: ${n}`);
    const t = this.fileDescriptors.get(n);
    if (!t)
      return p(`File descriptor ${n} not found.`), -1;
    try {
      this.workerThread || await this.initializeWorker();
      const r = await this.workerThread.execute("readFileDot", { filePath: t.path }).catch(() => r = "");
      let i = r;
      return f(`Current data in file ${t.path}:`, i), i === null && (i = ""), i = i.slice(0, t.pos) + e + i.slice(t.pos + e.length), await this.workerThread.execute("writeFileDot", {
        filePath: t.path,
        fileContent: i,
        doCommit: this.doImmediateCommit
      }), t.pos += e.length, f(`Content written to file ${t.path}, new position: ${t.pos}`), e.length;
    } catch (r) {
      return p(`Error writing to file ${t.path}:`, r), -1;
    }
  }
  async fs_fseek(n, e, t) {
    f(`Seeking in file descriptor: ${n}, offset: ${e}, whence: ${t}`);
    const r = this.fileDescriptors.get(n);
    if (!r)
      return p(`File descriptor ${n} not found.`), -1;
    try {
      this.workerThread || await this.initializeWorker();
      const i = await this.workerThread.execute("readFileDot", { filePath: r.path }).catch(() => i = "");
      return t === "SEEK_SET" ? r.pos = e : t === "SEEK_CUR" ? r.pos += e : t === "SEEK_END" && (r.pos = i.length + e), r.pos = Math.max(0, Math.min(r.pos, i.length)), f(`New position in file ${r.path}: ${r.pos}`), 0;
    } catch (i) {
      return p(`Error seeking in file ${r.path}:`, i), -1;
    }
  }
  async fs_ftell(n) {
    f(`Getting current position for file descriptor: ${n}`);
    const e = this.fileDescriptors.get(n);
    return e ? (f(`Current position in file ${e.path}: ${e.pos}`), e.pos) : (p(`File descriptor ${n} not found.`), -1);
  }
  async fs_ftruncate(n, e) {
    f(`Truncating file descriptor: ${n} to length: ${e}`);
    const t = this.fileDescriptors.get(n);
    if (!t)
      return p(`File descriptor ${n} not found.`), -1;
    try {
      this.workerThread || await this.initializeWorker();
      const r = await this.workerThread.execute("readFileDot", { filePath: t.path }).catch(() => r = "");
      let i = r;
      return f(`Current data in file ${t.path}:`, i), i = i.slice(0, e), await this.workerThread.execute("writeFileDot", {
        filePath: t.path,
        fileContent: i,
        doCommit: this.doImmediateCommit
      }), f(`File ${t.path} truncated to length: ${e}`), 0;
    } catch (r) {
      return p(`Error truncating file ${t.path}:`, r), -1;
    }
  }
  async fs_stat(n) {
    f(`Getting stats for path: ${n}`);
    try {
      this.workerThread || await this.initializeWorker();
      const e = "...";
      return {
        ...e,
        isDirectory: async () => {
          f("path: ", n);
          const t = await this.workerThread.execute("isDirectoryDot", { path: n });
          return t.exists ? t.isDirectory : !1;
        },
        isFile: async () => {
          const t = await this.workerThread.execute("isDirectoryDot", { path: n });
          return t.exists ? !t.isDirectory : !1;
        }
      };
    } catch (e) {
      return p(`Error getting stats for path ${n}:`, e), null;
    }
  }
  async fs_fstat(n) {
    f(`Getting stats for file descriptor: ${n}`);
    const e = this.fileDescriptors.get(n);
    return e ? this.fs_stat(e.path) : (p(`File descriptor ${n} not found.`), null);
  }
  async fs_remove(n) {
    this.workerThread || await this.initializeWorker(), f(`Removing file: ${n}`);
    try {
      return await this.workerThread.execute("removeFileDot", {
        filePath: n,
        doCommit: this.doImmediateCommit
      }), 0;
    } catch (e) {
      return p(`Error removing file ${n}:`, e), -1;
    }
  }
  async fs_mkdir(n) {
    this.workerThread || await this.initializeWorker(), f(`Creating directory: ${n}`);
    try {
      return await this.workerThread.execute("mkdirDot", {
        dirPath: n,
        doCommit: this.doImmediateCommit
      }), 0;
    } catch (e) {
      return p(`Error creating directory ${n}:`, e), -1;
    }
  }
  async fs_rmdir(n) {
    this.workerThread || await this.initializeWorker(), f(`Removing directory: ${n}`);
    try {
      return await this.workerThread.execute("removeDirDot", {
        dirPath: n,
        doCommit: this.doImmediateCommit
      }), 0;
    } catch (e) {
      return p(`Error removing directory ${n}:`, e), -1;
    }
  }
  async fs_rename(n, e) {
    this.workerThread || await this.initializeWorker(), f(`Renaming ${n} to ${e}`);
    try {
      return await this.workerThread.execute("rename", {
        oldPath: n,
        newPath: e
      }), 0;
    } catch (t) {
      return p(`Error renaming ${n} to ${e}:`, t), -1;
    }
  }
  async fs_opendir(n) {
    this.workerThread || await this.initializeWorker(), f(`Opening directory: ${n}`);
    try {
      return await this.workerThread.execute("opendir", { path: n }), 0;
    } catch (e) {
      return p(`Error opening directory ${n}:`, e), -1;
    }
  }
  async fs_readdir(n, e = {}) {
    f(`Reading directory: ${n}`);
    try {
      this.workerThread || await this.initializeWorker();
      const r = (await this.workerThread.execute("readDirDot", { path: n }))?.entries || [];
      return e.fullObjects ? r : r.map((i) => i.path);
    } catch (t) {
      return p(`Error reading directory ${n}:`, t), [];
    }
  }
  async fs_feof(n) {
    f(`Checking EOF for file descriptor: ${n}`);
    const e = this.fileDescriptors.get(n);
    if (!e)
      return p(`File descriptor ${n} not found.`), !0;
    try {
      this.workerThread || await this.initializeWorker();
      const t = await this.workerThread.execute("readFileDot", { filePath: e.path }).catch(() => t = "");
      f(`Current data in file ${e.path}:`, t);
      const r = e.pos >= t.length;
      return f(`EOF status for file ${e.path}: ${r}`), r;
    } catch (t) {
      return p(`Error checking EOF for file ${e.path}:`, t), !0;
    }
  }
  async fs_fflush(n) {
    return f(`Flushing file descriptor: ${n}`), 0;
  }
  async fs_fcloseall() {
    return f("Closing all file descriptors."), this.fileDescriptors = null, this.fs = null, this.workerThread = null, f("Closed all file descriptors", this.fileDescriptors, this.fs, this.workerThread), 0;
  }
}
const U = new E(m.logging.IDBFs);
function h(...s) {
  U.consoleDotLog(...s);
}
function w(...s) {
  U.consoleDotError(...s);
}
class Z {
  constructor(n, e = {}) {
    this.fs = new LightningFS(n, e), this.fileDescriptors = /* @__PURE__ */ new Map(), this.fdCounter = 3, this.workerEntry = null, this.workerThread = null, this.fsName = n, this.useSW = e?.useSW || null, this.versioningStrategy = e?.versioning?.strategy || m.versioning.strategy, this.doImmediateCommit = this.versioningStrategy === "immediate", (async () => await this.initializeWorker())(), h("IDBFS initialized with LightningFS.");
  }
  async initializeWorker() {
    this.workerEntry = await $.getWorker(this.fsName, this.useSW), this.workerThread = this.workerEntry.thread, await this.workerThread.execute("setFs", {
      fsName: this.fsName,
      fsType: "idb",
      gitDir: "/"
    }), h(`Worker initialized for ${this.fsName}`);
  }
  async cleanup() {
    this.workerEntry && (await $.releaseWorker(this.fsName), this.workerEntry = null, this.workerThread = null);
  }
  async fs_fopen(n, e) {
    this.workerThread || await this.initializeWorker(), h(`Opening file: ${n} with mode: ${e}`);
    const t = this.fdCounter++;
    return this.fileDescriptors.set(t, { path: n, pos: 0, mode: e }), h(`File descriptor ${t} created for file: ${n}`), t;
  }
  async fs_fclose(n) {
    return h(`Closing file descriptor: ${n}`), this.fileDescriptors.has(n) ? (this.fileDescriptors.delete(n), h(`File descriptor ${n} closed successfully.`), 0) : (w(`File descriptor ${n} not found.`), -1);
  }
  async fs_fread(n, e) {
    h(`Reading ${e} bytes from file descriptor: ${n}`);
    const t = this.fileDescriptors.get(n);
    if (!t)
      return w(`File descriptor ${n} not found.`), null;
    try {
      this.workerThread || await this.initializeWorker();
      const r = await this.workerThread.execute("readFileDot", { filePath: t.path });
      if (h(`Data read from file ${t.path}:`, r), r === null)
        return w(`Data is null for file ${t.path}.`), null;
      const i = r.slice(t.pos, t.pos + e);
      return t.pos += i.length, h(`Read chunk: ${i}, new position: ${t.pos}`), i;
    } catch (r) {
      return w(`Error reading file ${t.path}:`, r), null;
    }
  }
  async fs_fwrite(n, e) {
    h(`Writing content to file descriptor: ${n}`);
    const t = this.fileDescriptors.get(n);
    if (!t)
      return w(`File descriptor ${n} not found.`), -1;
    try {
      this.workerThread || await this.initializeWorker();
      let i = await this.workerThread.execute("readFileDot", { filePath: t.path }).catch(() => "");
      return h(`Current data in file ${t.path}:`, i), i === null && (i = ""), i = i.slice(0, t.pos) + e + i.slice(t.pos + e.length), await this.workerThread.execute("writeFileDot", {
        filePath: t.path,
        fileContent: i,
        doCommit: this.doImmediateCommit
      }), t.pos += e.length, h(`Content written to file ${t.path}, new position: ${t.pos}`), e.length;
    } catch (r) {
      return w(`Error writing to file ${t.path}:`, r), -1;
    }
  }
  async fs_fseek(n, e, t) {
    h(`Seeking in file descriptor: ${n}, offset: ${e}, whence: ${t}`);
    const r = this.fileDescriptors.get(n);
    if (!r)
      return w(`File descriptor ${n} not found.`), -1;
    try {
      this.workerThread || await this.initializeWorker();
      const i = await this.workerThread.execute("readFileDot", { filePath: r.path }).catch(() => "");
      return t === "SEEK_SET" ? r.pos = e : t === "SEEK_CUR" ? r.pos += e : t === "SEEK_END" && (r.pos = i.length + e), r.pos = Math.max(0, Math.min(r.pos, i.length)), h(`New position in file ${r.path}: ${r.pos}`), 0;
    } catch (i) {
      return w(`Error seeking in file ${r.path}:`, i), -1;
    }
  }
  async fs_ftell(n) {
    h(`Getting current position for file descriptor: ${n}`);
    const e = this.fileDescriptors.get(n);
    return e ? (h(`Current position in file ${e.path}: ${e.pos}`), e.pos) : (w(`File descriptor ${n} not found.`), -1);
  }
  async fs_ftruncate(n, e) {
    h(`Truncating file descriptor: ${n} to length: ${e}`);
    const t = this.fileDescriptors.get(n);
    if (!t)
      return w(`File descriptor ${n} not found.`), -1;
    try {
      this.workerThread || await this.initializeWorker();
      let i = await this.workerThread.execute("readFileDot", { filePath: t.path }).catch(() => "");
      return h(`Current data in file ${t.path}:`, i), i = i.slice(0, e), await this.workerThread.execute("writeFileDot", {
        filePath: t.path,
        fileContent: i,
        doCommit: this.doImmediateCommit
      }), h(`File ${t.path} truncated to length: ${e}`), 0;
    } catch (r) {
      return w(`Error truncating file ${t.path}:`, r), -1;
    }
  }
  async fs_stat(n) {
    h(`Getting stats for path: ${n}`);
    try {
      this.workerThread || await this.initializeWorker();
      const e = "...";
      return {
        ...e,
        isDirectory: async () => {
          h("path: ", n);
          const t = await this.workerThread.execute("isDirectoryDot", { path: n });
          return t.exists ? t.isDirectory : !1;
        },
        isFile: async () => {
          const t = await this.workerThread.execute("isDirectoryDot", { path: n });
          return t.exists ? !t.isDirectory : !1;
        }
      };
    } catch (e) {
      return w(`Error getting stats for path ${n}:`, e), null;
    }
  }
  async fs_fstat(n) {
    h(`Getting stats for file descriptor: ${n}`);
    const e = this.fileDescriptors.get(n);
    return e ? this.fs_stat(e.path) : (w(`File descriptor ${n} not found.`), null);
  }
  async fs_remove(n) {
    this.workerThread || await this.initializeWorker(), h(`Removing file: ${n}`);
    try {
      return await this.workerThread.execute("removeFileDot", {
        filePath: n,
        doCommit: this.doImmediateCommit
      }), 0;
    } catch (e) {
      return w(`Error removing file ${n}:`, e), -1;
    }
  }
  async fs_mkdir(n) {
    this.workerThread || await this.initializeWorker(), h(`Creating directory: ${n}`);
    try {
      return await this.workerThread.execute("mkdirDot", {
        dirPath: n,
        doCommit: this.doImmediateCommit
      }), 0;
    } catch (e) {
      return w(`Error creating directory ${n}:`, e), -1;
    }
  }
  async fs_rmdir(n) {
    this.workerThread || await this.initializeWorker(), h(`Removing directory: ${n}`);
    try {
      return await this.workerThread.execute("removeDirDot", {
        dirPath: n,
        doCommit: this.doImmediateCommit
      }), 0;
    } catch (e) {
      return w(`Error removing directory ${n}:`, e), -1;
    }
  }
  async fs_rename(n, e) {
    this.workerThread || await this.initializeWorker(), h(`Renaming ${n} to ${e}`);
    try {
      return await this.workerThread.execute("rename", {
        oldPath: n,
        newPath: e
      }), 0;
    } catch (t) {
      return w(`Error renaming ${n} to ${e}:`, t), -1;
    }
  }
  async fs_opendir(n) {
    this.workerThread || await this.initializeWorker(), h(`Opening directory: ${n}`);
    try {
      return await this.workerThread.execute("opendir", { path: n }), 0;
    } catch (e) {
      return w(`Error opening directory ${n}:`, e), -1;
    }
  }
  async fs_readdir(n, e = {}) {
    h(`Reading directory: ${n}`);
    try {
      this.workerThread || await this.initializeWorker();
      const t = await this.workerThread.execute("readDirDot", { path: n });
      return e.fullObjects ? t : t.map((r) => r.path);
    } catch (t) {
      return w(`Error reading directory ${n}:`, t), [];
    }
  }
  async fs_feof(n) {
    h(`Checking EOF for file descriptor: ${n}`);
    const e = this.fileDescriptors.get(n);
    if (!e)
      return w(`File descriptor ${n} not found.`), !0;
    try {
      this.workerThread || await this.initializeWorker();
      const t = await this.workerThread.execute("readFileDot", { filePath: e.path }).catch(() => "");
      h(`Current data in file ${e.path}:`, t);
      const r = e.pos >= t.length;
      return h(`EOF status for file ${e.path}: ${r}`), r;
    } catch (t) {
      return w(`Error checking EOF for file ${e.path}:`, t), !0;
    }
  }
  async fs_fflush(n) {
    return h(`Flushing file descriptor: ${n}`), 0;
  }
  async fs_fcloseall() {
    return h("Closing all file descriptors."), this.fileDescriptors.clear(), 0;
  }
}
const N = new E(m.logging.GitAuth);
function T(...s) {
  N.consoleDotLog(...s);
}
function B(...s) {
  N.consoleDotError(...s);
}
class K {
  constructor(n) {
    this.workerThread = n, this.AuthChecked = !1;
  }
  /**
   * Sets authentication credentials for Git operations
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<boolean>}
   */
  async setAuthParams(n, e) {
    try {
      if (!this.workerThread)
        throw new Error("Worker thread not initialized");
      return await this.workerThread.execute("setAuthParams", { username: n, password: e }), T("Auth params set successfully"), this.AuthChecked || (this.AuthChecked = !0), T("Auth params verified successfully"), !0;
    } catch (t) {
      throw B("Failed to set auth params:", t), t;
    }
  }
  /**
   * Verifies if current auth credentials are valid
   * @returns {Promise<boolean>}
   */
  async verifyAuth() {
    try {
      if (!this.workerThread)
        throw new Error("Worker thread not initialized");
      return await this.workerThread.execute("listServerRefs"), T("Auth verification successful"), !0;
    } catch (n) {
      if (n.toString().includes("401") || n.toString().includes("403"))
        return T("Auth verification failed - invalid credentials"), !1;
      throw B("Auth verification error:", n), n;
    }
  }
  /**
   * Sets Git user config (name and email)
   * @param {string} name 
   * @param {string} email 
   */
  async setUserConfig(n, e) {
    try {
      return await this.workerThread.execute("setConfigs", { name: n, email: e }), T(`User config set, name: ${n}, email: ${e}`), !0;
    } catch (t) {
      throw B(`Failed to set user config: ${t}`), t;
    }
  }
}
const L = new E(m.logging.VFSutils);
function u(...s) {
  L.consoleDotLog("[ VFSUtils ]", ...s);
}
function b(...s) {
  L.consoleDotError("[ VFSUtils ]", ...s);
}
u("Loading VFSUtils module");
class X {
  constructor(n, e, t, r, i = !1) {
    this.fsType = n, this.fsInstance = e, this.fsName = t, this.fetchInfo = r, this.workerEntry = null, this.workerThread = null, this.inodeCounter = 12341, this.fsTable = {}, this.initialized = !1, this.useSW = i, this.auth = null;
  }
  async initialize() {
    if (!this.initialized)
      try {
        this.workerEntry = await $.getWorker(this.fsName, this.useSW), this.workerThread = this.workerEntry.thread, u("Setting Fs for VFSUtils."), await this.workerThread.execute("setFs", {
          fsName: this.fsName,
          fsType: this.fsType
        }), u("Fs set."), this.fetchInfo.corsProxy && await this.workerThread.execute("setCorsProxy", {
          corsProxy: this.fetchInfo.corsProxy
        }), u("workerThread:", this.workerThread), this.auth = new K(this.workerThread), this.fetchInfo.username && this.fetchInfo.password && await this.setAuthParams(this.fetchInfo.username, this.fetchInfo.password), this.initialized = !0, u(`VFSutils initialized for ${this.fsName} with type ${this.fsType}`);
      } catch (n) {
        throw await this.terminate(), n;
      }
  }
  async terminate() {
    try {
      return this.workerEntry && (await $.releaseWorker(this.fsName), this.workerEntry = null, this.workerThread = null), this.initialized = !1, !0;
    } catch (n) {
      return b("VFSutils termination error:", n), !1;
    }
  }
  async fetchFromGit() {
    try {
      u("Fetching from Git repository..."), this.initialized || await this.initialize(), u("initialized.");
      const { url: n, dir: e = "/" } = this.fetchInfo;
      u(`Cloning repository from ${n} to ${e}`), await this.workerThread.execute("doCloneAndStuff", { url: n }), this.fetchInfo.name && this.fetchInfo.email && await this.setUserConfig(this.fetchInfo.name, this.fetchInfo.email), await this.generateFsTable(), u("Repository successfully cloned and indexed");
    } catch (n) {
      throw b(`Git fetch failed: ${n}`), await this.terminate(), n;
    }
  }
  async fetchFromDisk() {
    try {
      this.initialized || await this.initialize();
      const { dir: n } = this.fetchInfo;
      u(`Loading filesystem from disk at ${n}`), await this.generateFsTable(), u("Successfully loaded filesystem from disk");
    } catch (n) {
      throw b(`Disk load failed: ${n.message}`), await this.terminate(), n;
    }
  }
  async fetchFromGoogleDrive() {
    try {
      this.initialized || await this.initialize();
      const { fileId: n } = this.fetchInfo;
      u(`Fetching from Google Drive file ${n}`), await this.generateFsTable(), u("Successfully fetched from Google Drive");
    } catch (n) {
      throw b(`Google Drive fetch failed: ${n.message}`), await this.terminate(), n;
    }
  }
  /* FS Table Management */
  async generateFsTable() {
    try {
      this.initialized || await this.initialize(), u("Generating FS table...");
      const n = await this.workerThread.execute("listFilesDot", { listDirs: !0 });
      return u("File list:", n), this.fsTable = this.buildHierarchicalFsTable(n), u(
        "FS table generated with",
        Object.keys(this.fsTable["/"].children).length,
        "root entries"
      ), this.fsTable;
    } catch (n) {
      throw b("FS table generation failed:", n), n;
    }
  }
  buildHierarchicalFsTable(n) {
    const e = this.createRootEntry();
    return u("Root entry:", n), n.forEach((t) => {
      const r = t.path.split("/").filter((a) => a !== "");
      let i = e;
      r.forEach((a, c) => {
        const l = c === r.length - 1;
        i.children[a] || (i.children[a] = this.createFsTableEntry(
          a,
          l && t.type !== "tree" ? "file" : "directory",
          t.size || 0,
          i.dentry_id
        )), (!l || t.type === "tree") && (i = i.children[a]);
      });
    }), { "/": e };
  }
  async updateFsTable(n, e, t = "file", r = 0) {
    try {
      const i = e.replace(/^\/+|\/+$/g, "");
      this.fsTable["/"] || (this.fsTable["/"] = this.createRootEntry());
      const a = i.split("/");
      let c = this.fsTable["/"];
      if (n === "remove" && a.length === 0)
        throw new Error("Cannot remove root directory");
      for (let d = 0; d < a.length - 1; d++) {
        const _ = a[d];
        if (!c.children || !c.children[_]) {
          if (n === "remove")
            throw new Error(`Parent path not found: ${a.slice(0, d + 1).join("/")}`);
          c.children[_] = this.createFsTableEntry(
            _,
            "directory",
            0,
            c.dentry_id
          );
        }
        if (c = c.children[_], c.type !== "directory")
          throw new Error(`Path component is not a directory: ${a.slice(0, d + 1).join("/")}`);
      }
      const l = a[a.length - 1];
      switch (n) {
        case "create":
          if (c.children || (c.children = {}), c.children[l])
            throw new Error(`Path already exists: ${e}`);
          c.children[l] = this.createFsTableEntry(
            l,
            t,
            r,
            c.dentry_id
          );
          break;
        case "remove":
          if (!c.children || !c.children[l])
            return { success: !1, message: `Path not found: ${e}` };
          if (c.children[l].type === "directory" && Object.keys(c.children[l].children || {}).length > 0)
            throw new Error(`Cannot remove non-empty directory: ${e}`);
          delete c.children[l];
          break;
        default:
          throw new Error(`Invalid action: ${n}`);
      }
      return { success: !0, fsTable: this.fsTable };
    } catch (i) {
      throw b("FS table update failed:", i), i;
    }
  }
  createRootEntry() {
    return {
      type: "directory",
      dentry_id: this.inodeCounter++,
      name: "",
      parent_inode: 0,
      acl: { owner: "root", permissions: "rwx", groups: { users: "r" } },
      children: {},
      ctime: Date.now(),
      mtime: Date.now()
    };
  }
  createFsTableEntry(n, e, t, r) {
    const i = e === "directory";
    return {
      inode: this.inodeCounter++,
      type: e,
      name: n,
      mode: i ? 16877 : 100644,
      size: i ? 0 : t,
      uid: 1e3,
      gid: 100,
      parent_inode: r,
      acl: {
        owner: "user",
        permissions: i ? "rwx" : "rw-",
        groups: { users: "r" }
      },
      children: i ? {} : void 0,
      ctime: Date.now(),
      mtime: Date.now()
    };
  }
  async getFsTableSize(n) {
    try {
      return n ? JSON.stringify(n).length : 0;
    } catch (e) {
      return b("Size calculation failed:", e), 0;
    }
  }
  async commitStagedChanges(n) {
    try {
      return this.initialized || await this.initialize(), await this.workerThread.execute("setFs", {
        fsName: this.fsName,
        fsType: this.fsType
      }), await this.workerThread.execute("commitStagedChanges", { message: n });
    } catch (e) {
      throw b("Version commit failed:", e), e;
    }
  }
  // -------------------
  //  Merging Methods
  // -------------------
  /**
  * High-level sync flow: checks sync status and acts accordingly.
  * Handles different cases like local changes, remote updates, etc.
  * @returns {Promise<void>}
  * @throws {Error} If sync fails or remote branch not found
  */
  async autoSyncFlow() {
    try {
      const n = await this.getSyncStatus();
      switch (u("Auto-sync: Sync status:", n), n) {
        case "up-to-date":
          u("Auto-sync: Repo is already up to date.");
          return;
        case "local-ahead":
          u("Auto-sync: Local changes detected, syncing with remote..."), await this.syncWithRemote("local-ahead");
          break;
        case "other-cases":
          u("Auto-sync: Other cases detected, syncing with remote..."), await this.syncWithRemote("other-cases");
          break;
        case "remote-branch-not-found":
          b("No remote branch found, cannot sync.");
          break;
        default:
          b("No remote branch found, cannot sync.");
          break;
      }
    } catch (n) {
      b("autoSyncFlow() failed:", n);
    }
  }
  /**
  * Syncs the local repo with the remote by pulling changes.
  * Abstract logic — assumes `doFetch` does a pull or fetch + merge.
  */
  async syncWithRemote(n) {
    try {
      this.initialized || await this.initialize();
      const { url: e } = this.fetchInfo;
      switch (u("Attempting to sync with remote:", e), await this.setAuthParams(this.fetchInfo.username, this.fetchInfo.password), await this.setUserConfig(this.fetchInfo.name, this.fetchInfo.email), n) {
        case "local-ahead":
          u("Syncing with remote by pushing local changes..."), await this.workerThread.execute("push", { url: e, ref: "main" });
          break;
        case "other-cases":
          break;
        default:
          if (u("Could not determine sync strategy, defaulting to pull..."), !pullResult.success)
            throw new Error(`Pull failed: ${pullResult.error}`);
          break;
      }
      await this.generateFsTable(), u("Local repo successfully synced with remote.");
    } catch (e) {
      throw b("syncWithRemote failed:", e), e;
    }
  }
  async getSyncStatus(n = null, e = "main") {
    try {
      const t = n || this.fetchInfo?.url, r = await this.workerThread.execute("getLastLocalCommit", { ref: e }), i = await this.workerThread.execute("getLatestRemoteCommit", { url: t, ref: e });
      if (!i.success) return "remote-branch-not-found";
      const a = i.commit;
      u("localHead:", r, "remoteHead:", a);
      const c = await this.workerThread.execute("findMergeBase", {
        oids: [r, a]
      }), l = c[0];
      u("Merge base:", c);
      const d = l === a;
      return a ? r === a ? "up-to-date" : d ? "local-ahead" : "other-cases" : "remote-branch-not-found";
    } catch (t) {
      return `error: ${t.message}`;
    }
  }
  // ------------------------
  //  Authentication Methods
  // ------------------------
  /**
   * Sets authentication credentials
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<boolean>}
   */
  async setAuthParams(n, e) {
    return this.auth.setAuthParams(n, e);
  }
  /**
   * Sets Git user config (name and email)
   * @param {string} name
   * @param {string} email
   * @returns {Promise<void>}
   */
  async setUserConfig(n, e) {
    return this.auth.setUserConfig(n, e);
  }
  /**
   * Verifies if current auth credentials are valid
   * @returns {Promise<boolean>}
   */
  async verifyAuth() {
    return this.auth.verifyAuth();
  }
  async updateFetchInfo(n) {
    return this.initialized || await this.initialize(), this.fetchInfo = { ...this.fetchInfo, ...n }, u("Fetch info updated:", this.fetchInfo), this.fetchInfo;
  }
}
class Y {
  constructor(n = "VFS_Mounts") {
    this.dbName = n;
  }
  supportsIndexedDB() {
    return typeof window < "u" && !!window.indexedDB;
  }
  /** IndexedDB Methods **/
  async getFromIndexedDB(n) {
    return new Promise((e, t) => {
      const r = indexedDB.open(this.dbName, 1);
      r.onerror = () => e(null), r.onsuccess = () => {
        const l = r.result.transaction("mounts", "readonly").objectStore("mounts").get(n);
        l.onsuccess = () => e(l.result || null), l.onerror = () => e(null);
      }, r.onupgradeneeded = (i) => {
        i.target.result.createObjectStore("mounts");
      };
    });
  }
  async storeInIndexedDB(n, e) {
    return new Promise((t, r) => {
      const i = indexedDB.open(this.dbName, 1);
      i.onerror = () => t(!1), i.onsuccess = () => {
        const c = i.result.transaction("mounts", "readwrite");
        c.objectStore("mounts").put(e, n), c.oncomplete = () => t(!0), c.onerror = () => t(!1);
      }, i.onupgradeneeded = (a) => {
        a.target.result.createObjectStore("mounts");
      };
    });
  }
  async removeFromIndexedDB(n) {
    return new Promise((e, t) => {
      const r = indexedDB.open(this.dbName, 1);
      r.onerror = () => e(!1), r.onsuccess = () => {
        const a = r.result.transaction("mounts", "readwrite");
        a.objectStore("mounts").delete(n), a.oncomplete = () => e(!0), a.onerror = () => e(!1);
      };
    });
  }
  /** LocalStorage Methods **/
  async getFromLocalStorage(n) {
    try {
      const e = localStorage.getItem(n);
      return e ? JSON.parse(e) : null;
    } catch {
      return null;
    }
  }
  async storeInLocalStorage(n, e) {
    localStorage.setItem(n, JSON.stringify(e));
  }
  async removeFromLocalStorage(n) {
    localStorage.removeItem(n);
  }
  /** Unified Storage Methods **/
  async get(n) {
    return this.supportsIndexedDB() ? this.getFromIndexedDB(n) : this.getFromLocalStorage(n);
  }
  async store(n, e) {
    return this.supportsIndexedDB() ? this.storeInIndexedDB(n, e) : this.storeInLocalStorage(n, e);
  }
  async remove(n) {
    return this.supportsIndexedDB() ? this.removeFromIndexedDB(n) : this.removeFromLocalStorage(n);
  }
}
const J = new E(m.logging.supportChecker);
function S(...s) {
  J.consoleDotLog(...s);
}
async function Q() {
  try {
    return window.indexedDB ? await new Promise((s) => {
      const n = "testIDBSupport", e = indexedDB.open(n);
      e.onerror = () => {
        S("IndexedDB not available"), s(!1);
      }, e.onsuccess = (t) => {
        t.target.result.close();
        const i = indexedDB.deleteDatabase(n);
        i.onerror = () => {
          S("Failed to delete test database"), s(!0);
        }, i.onsuccess = () => {
          S("IndexedDB test successful"), s(!0);
        };
      }, e.onblocked = () => {
        S("IndexedDB request blocked"), s(!1);
      };
    }) : (S("IndexedDB not supported in this browser"), !1);
  } catch (s) {
    return S("IndexedDB test failed:", s), !1;
  }
}
const z = new E(m.logging.vfs);
function o(...s) {
  z.consoleDotLog("[VFS] ", ...s);
}
function g(...s) {
  z.consoleDotError("[VFS] ", ...s);
}
class nn {
  // Initialization and Core Setup
  constructor(n = "VFS_Mounts") {
    o(`Initializing VFS with storage name: ${n}`), this.mounts = /* @__PURE__ */ Object.create(null), this.initializedMounts = /* @__PURE__ */ new Set(), this.VFSutils = null, this.storageUtils = new Y(n), this.currentMountPath = "", o("VFS instance created");
  }
  // Utility functions for versioning and merging
  getVersioningConfig(n = {}) {
    const e = n.versioning || m.versioning || {};
    return {
      strategy: e.strategy,
      interval: e.interval,
      number: e.number
    };
  }
  getMergingConfig(n = {}) {
    const e = n.merging || m.merging || {};
    return {
      strategy: e.strategy || "none",
      conflictResolution: e.conflictResolution || "timestamp"
    };
  }
  // Storage and Support Checking
  async checkIndexedDBSupport() {
    o("Checking IndexedDB support...");
    try {
      return await Q(), o("IndexedDB is supported"), !0;
    } catch (n) {
      return g("IndexedDB not supported:", n), !1;
    }
  }
  async loadMountFromStorage(n) {
    o(`Attempting to load mount from storage: ${n}`);
    try {
      const e = await this.storageUtils.get(n);
      return e ? (o(`Successfully loaded mount from storage: ${n}`), e) : (o(`No mount found in storage for path: ${n}`), null);
    } catch (e) {
      throw g(`Failed to load mount from storage (path: ${n}):`, e), e;
    }
  }
  async persistMountData(n, e) {
    o(`Persisting mount data for ${n}`);
    try {
      const t = { ...e };
      delete t.fsInstance, await this.storageUtils.store(n, t), o(`Successfully persisted mount data for ${n}`);
    } catch (t) {
      throw g(`Failed to persist mount data for ${n}:`, t), t;
    }
  }
  // Filesystem Instance Management
  async createFSInstance(n, e, t = {}) {
    o(`Creating FS instance of type ${n} for mount path ${e}`);
    try {
      n === "idb" && (o("Checking IndexedDB support for IDB FS"), await this.checkIndexedDBSupport() || (o(`IndexedDB not supported, falling back to memory FS for ${e}`), n = "memory"));
      let r;
      switch (n) {
        case "memory":
          o("Creating MemoryFS instance"), r = new P(e, t);
          break;
        case "idb":
          o("Creating IDBFs instance"), r = new Z(e, t);
          break;
        default:
          const i = `Unknown FS type: ${n}`;
          throw g(i), new Error(i);
      }
      return o(`Successfully created ${n} FS instance for ${e}`), r;
    } catch (r) {
      throw g(`Failed to create FS instance (type: ${n}, path: ${e}):`, r), r;
    }
  }
  async ensureFSInitialized(n) {
    if (o(`Ensuring FS is initialized for path: ${n}`), this.initializedMounts.has(n))
      return o(`FS already initialized for path: ${n}`), !0;
    const e = this.mounts[n];
    if (!e) {
      const t = `Mount not found: ${n}`;
      throw g(t), new Error(t);
    }
    if (!e.fsInstance) {
      o(`Creating new FS instance for mount at ${n}`);
      const t = e?.useSW || !1;
      e.fsInstance = await this.createFSInstance(
        e.fsType,
        n,
        {
          useSW: t,
          versioning: this.getVersioningConfig(e),
          merging: this.getMergingConfig(e)
        }
      );
    }
    return o(`Fetching data for mount at ${n}`), await this.fetchFS(
      e.fetchMethod,
      e.fsType,
      e.fsInstance,
      n,
      e.fetchInfo
    ), this.initializedMounts.add(n), o(`Successfully initialized FS for path: ${n}`), !0;
  }
  // Mount/Unmount Operations
  async mount(n, e, t, r, i = {}) {
    o(`Mounting filesystem - path: ${n}, type: ${e}, name: ${t}, method: ${r}, options: ${JSON.stringify(i)}`);
    try {
      const a = i.fetchInfo || {}, c = i.useSW || !1, l = this.getVersioningConfig(i), d = this.getMergingConfig(i), y = `${n.endsWith("/") ? n : `${n}/`}${t}`;
      if (o(`Normalized mount path: ${y}`), this.mounts[y]) {
        const I = `Path ${y} is already mounted`;
        throw g(I), new Error(I);
      }
      this.currentMountPath = y, o(`Checking storage for existing mount at ${y}`);
      const v = await this.loadMountFromStorage(y);
      return v ? (o(`Found stored mount, initializing existing mount at ${y}`), this.initializeStoredMount(y, v, r, a, { useSW: c, versioning: l, merging: d })) : (o(`No stored mount found, creating new mount at ${y}`), this.createNewMount(y, e, t, r, a, c, l, d));
    } catch (a) {
      throw g("Mount operation failed:", a), a;
    }
  }
  async initializeStoredMount(n, e, t, r, i) {
    o(`Initializing stored mount at ${n}`);
    try {
      o(`Creating FS instance for stored mount (type: ${e.fsType})`);
      const a = await this.createFSInstance(
        e.fsType,
        n,
        {
          useSW: i.useSW,
          versioning: this.getVersioningConfig(e),
          merging: this.getMergingConfig(e)
        }
      );
      return o(`Fetching data for stored mount using method: ${e.fetchMethod || t}`), await this.fetchFS(
        e.fetchMethod || t,
        e.fsType,
        a,
        n,
        e.fetchInfo || r,
        i.useSW
      ), this.mounts[n] = {
        ...e,
        fsInstance: a,
        fetchMethod: e.fetchMethod || t,
        fetchInfo: e.fetchInfo || r,
        versioning: this.getVersioningConfig(e),
        merging: this.getMergingConfig(e),
        useSW: i.useSW
      }, this.initializedMounts.add(n), o(`Successfully initialized stored mount at ${n}`), this.mounts[n];
    } catch (a) {
      throw g(`Failed to initialize stored mount at ${n}:`, a), a;
    }
  }
  async createNewMount(n, e, t, r, i, a = !1, c = {}, l = {}) {
    o(`Creating new mount at ${n}`);
    try {
      o(`Creating new FS instance (type: ${e})`);
      const d = await this.createFSInstance(e, n, { useSW: a, versioning: c, merging: l });
      o(`Fetching data for new mount using method: ${r}`), await this.fetchFS(r, e, d, n, i, a), o("Generating filesystem table");
      const _ = await this.VFSutils.generateFsTable(), y = await this.VFSutils.getFsTableSize(_);
      o(`Filesystem table generated, size: ${y}`);
      const v = {
        fsInstance: d,
        fsType: d instanceof P ? "memory" : e,
        fsName: t,
        fsTable: _,
        fetchMethod: r,
        fetchInfo: {
          ...i,
          time: (/* @__PURE__ */ new Date()).toISOString(),
          size: y
        },
        useSW: a,
        versioning: this.getVersioningConfig({ versioning: c }),
        merging: this.getMergingConfig({ merging: l })
      };
      return this.mounts[n] = v, o(`Persisting mount data for ${n}`), await this.persistMountData(n, v), this.initializedMounts.add(n), o(`Successfully mounted new filesystem at ${n}`), v;
    } catch (d) {
      throw g(`Failed to create new mount at ${n}:`, d), d;
    }
  }
  async unmount(n, e) {
    const t = n + "/" + e;
    if (o(`Unmounting filesystem at ${t}`), !this.mounts[t]) {
      const r = `Path ${t} is not mounted`;
      throw g(r), new Error(r);
    }
    try {
      return this.mounts[t].fsInstance && (o(`Closing all files for mount at ${t}`), await this.mounts[t].fsInstance.fs_fcloseall(), this.mounts[t].fsInstance = null), delete this.mounts[t], this.initializedMounts.delete(t), Object.keys(this.mounts).length === 0 && this.VFSutils && (o("Terminating VFSutils instance (no more mounts)"), await this.VFSutils.terminate(), this.VFSutils = null), o(`Successfully unmounted ${t}`), !0;
    } catch (r) {
      throw g(`Error unmounting ${t}:`, r), r;
    }
  }
  // Filesystem Operations
  async fetchFS(n, e, t, r, i, a = !1) {
    o(`Fetching filesystem data - method: ${n}, type: ${e}, name: ${r}`);
    try {
      this.VFSutils && (o("Terminating existing VFSutils instance"), await this.VFSutils.terminate(), this.VFSutils = null), o("Creating new VFSutils instance"), this.VFSutils = new X(e, t, r, i, a);
      const l = {
        git: () => this.VFSutils.fetchFromGit(),
        disk: () => this.VFSutils.fetchFromDisk(),
        googleDrive: () => this.VFSutils.fetchFromGoogleDrive()
      }[n];
      if (!l) {
        const d = `Unknown fetch method: ${n}`;
        throw g(d), new Error(d);
      }
      o(`Executing fetch strategy for ${n}`), await l(), o(`Successfully fetched data using ${n} method`);
    } catch (c) {
      throw g(`Fetch operation failed (method: ${n}):`, c), this.VFSutils && (o("Cleaning up VFSutils after fetch failure"), await this.VFSutils.terminate(), this.VFSutils = null), c;
    }
  }
  async resolveFS(n) {
    o(`Resolving filesystem for path: ${n}`);
    try {
      for (const t in this.mounts)
        if (n.startsWith(t)) {
          o("Found matching mount at ", t), await this.ensureFSInitialized(t);
          const r = n.slice(t.length) || "/";
          return o(`Resolved path: ${n} to mount: ${t}, relative path: ${r}, this.mounts[mountPath] : `, this.mounts[t]), o(
            "resolveFs returned value: ",
            {
              fs: this.mounts[t],
              relativePath: r,
              versioning: this.mounts[t].versioning || m.versioning,
              merging: this.mounts[t].merging || m.merging
            }
          ), {
            fs: this.mounts[t],
            relativePath: r,
            versioning: this.mounts[t].versioning || m.versioning,
            merging: this.mounts[t].merging || m.merging
          };
        }
      const e = `No filesystem mounted for path: ${n}`;
      throw g(e), new Error(e);
    } catch (e) {
      throw g(`Failed to resolve filesystem for path ${n}:`, e), e;
    }
  }
  // Filesystem Table Operations
  async writeToFsTable(n, e = "file", t = 0) {
    o(`Writing to fsTable - path: ${n}, type: ${e}, size: ${t}`), await this.validateVFSutils();
    try {
      o(`Updating fsTable with create operation for ${n}`);
      const r = await this.VFSutils.updateFsTable("create", n, e, t);
      return o("Updating mount fsTable with new data"), await this.updateMountFsTable(r.fsTable), o(`Successfully updated fsTable for ${n}`), r.fsTable;
    } catch (r) {
      throw g("Failed to write to fsTable:", r), r;
    }
  }
  async removeFromFsTable(n) {
    o(`Removing from fsTable - path: ${n}`), await this.validateVFSutils();
    try {
      o(`Updating fsTable with remove operation for ${n}`);
      const e = await this.VFSutils.updateFsTable("remove", n);
      return o("Updating mount fsTable with removal data"), await this.updateMountFsTable(e.fsTable), o(`Successfully removed ${n} from fsTable`), e.fsTable;
    } catch (e) {
      throw g("Failed to remove from fsTable:", e), e;
    }
  }
  async updateMountFsTable(n) {
    if (o("Updating mount fsTable for current mount path"), !this.currentMountPath) {
      const t = "No active mount path available";
      throw g(t), new Error(t);
    }
    o(`Loading mount data for ${this.currentMountPath}`);
    const e = await this.storageUtils.get(this.currentMountPath);
    if (!e) {
      const t = `Mount data not found for path: ${this.currentMountPath}`;
      throw g(t), new Error(t);
    }
    o("Updating fsTable in mount data"), e.fsTable = n, o(`Storing updated mount data for ${this.currentMountPath}`), await this.storageUtils.store(this.currentMountPath, e), o("Successfully updated mount fsTable");
  }
  // Validation Utilities
  async validateVFSutils() {
    if (o("Validating VFSutils instance"), !this.VFSutils) {
      const n = "VFSutils not initialized";
      throw g(n), new Error(n);
    }
    o("VFSutils validation passed");
  }
  //----------------------
  // Versioning Operations
  //----------------------
  async versioner(n) {
    o(`Committing version with message: ${n}`), await this.validateVFSutils();
    try {
      const e = await this.VFSutils.commitStagedChanges(n);
      return o("Version committed successfully"), e;
    } catch (e) {
      throw g("Failed to commit version:", e), e;
    }
  }
  //--------------------
  // Merging Operations
  //--------------------
  async merger() {
    o("Starting merge operation"), await this.validateVFSutils();
    try {
      const n = await this.VFSutils.autoSyncFlow();
      return o("Merge operation completed successfully:", n), n;
    } catch (n) {
      throw g("Merge operation failed:", n), n;
    }
  }
  //-------------------
  // Some info setters for vfsUtils
  //-------------------
  async setMergingStrategy(n) {
    o("Setting merging strategy");
    let e = this.mounts[this.currentMountPath];
    return e = { ...e, merging: n }, await this.persistMountData(this.currentMountPath, e), o("Merging strategy set successfully:", n), !0;
  }
  async setVersioingStrategy(n) {
    o("Setting versioning strategy");
    let e = this.mounts[this.currentMountPath];
    return e = { ...e, versioning: n }, await this.persistMountData(mountPath, e), o("Versioning strategy set successfully:", n), !0;
  }
  async setUserConfigs(n) {
    await this.validateVFSutils(), o("Setting user configurations:", n), await this.VFSutils.updateFetchInfo(n);
    let e = this.mounts[this.currentMountPath];
    return e = { ...e, fetchInfo: { ...e.fetchInfo, ...n } }, this.persistMountData(this.currentMountPath, e), n;
  }
}
const W = new E(m.logging.kfs);
function R(...s) {
  W.consoleDotLog("[Versioning]", ...s);
}
function en(...s) {
  W.consoleDotError("[Versioning]", ...s);
}
class tn {
  constructor(n) {
    this.vfs = n, this.clockIntervalID = null, this.operationQueueCount = 0, this.config = this._getDefaultVersioningConfig();
  }
  _getDefaultVersioningConfig() {
    const n = m.versioning || {};
    return {
      strategy: n.strategy,
      interval: n.interval,
      number: n.number
    };
  }
  async _getVersioningConfig(n = {}) {
    const e = this._getDefaultVersioningConfig(), t = n.versioning || {};
    return {
      strategy: t.strategy || e.strategy,
      interval: t.interval || e.interval,
      number: t.number || e.number
    };
  }
  async setup(n = {}) {
    this.config = await this._getVersioningConfig(n), R("Versioning configuration:", this.config), this.config.strategy === "clock" ? this._startClockVersioning() : this.clearClock();
  }
  clearClock() {
    this.clockIntervalID && (clearInterval(this.clockIntervalID), this.clockIntervalID = null);
  }
  _startClockVersioning() {
    this.clearClock();
    const n = (this.config.interval || 10) * 1e3;
    R("Starting clock-based versioning with interval:", n, "ms"), this.clockIntervalID = setInterval(async () => {
      R("Clock-based auto commit triggered");
      try {
        await this.vfs.versioner("Clock-based auto commit");
      } catch (e) {
        en("Error in clock-based versioning:", e);
      }
    }, n);
  }
  async maybeTriggerVersioning(n = null) {
    const e = n || this.config;
    if (e.strategy !== "immediate" && e.strategy === "batch") {
      this.operationQueueCount++;
      const t = e.number || 5;
      R(`Batch operation count: ${this.operationQueueCount}/${t}`), this.operationQueueCount >= t && (this.operationQueueCount = 0, await this.vfs.versioner(`Batch commit after ${t} operations`));
    }
  }
  async getConfig() {
    return this.config;
  }
}
class rn {
  constructor(n) {
    this.vfs = n, this.clockIntervalID = null, this.config = this._getDefaultMergingConfig();
  }
  _getDefaultMergingConfig() {
    return {
      strategy: m.merging?.strategy || null,
      interval: m.merging?.interval || 10,
      number: m.merging?.number || 5
    };
  }
  async setup(n = {}) {
    this.config = {
      ...this._getDefaultMergingConfig(),
      ...n.merging || {}
    }, this.config.strategy === "clock" ? await this._startClockMerging() : this.clearClock();
  }
  async _startClockMerging() {
    this.clearClock();
    const n = this.config.interval * 1e3;
    this.clockIntervalID = setInterval(async () => {
      try {
        await this.vfs.merger.merge("Clock-based auto merge");
      } catch (e) {
        console.error("Clock-based merge failed:", e);
      }
    }, n);
  }
  clearClock() {
    this.clockIntervalID && (clearInterval(this.clockIntervalID), this.clockIntervalID = null);
  }
  async getConfig() {
    return this.config;
  }
}
const H = new E(m.logging.kfs);
function C(...s) {
  H.consoleDotLog("[KFS]", ...s);
}
function D(...s) {
  H.consoleDotError("[KFS]", ...s);
}
class on {
  constructor() {
    this.vfs = new nn(), this.fsInstance = null, this.versioningManager = new tn(this.vfs), this.mergingManager = new rn(this.vfs), this.commitCount = 0;
  }
  // -------------------------------
  // Versioning Configuration
  // -------------------------------
  _setupVersioningAndMerging(n) {
    this.versioningManager.setup(n), this.mergingManager.setup(n);
  }
  _clearClocks() {
    this.versioningManager.clearClock(), this.mergingManager.clearClock();
  }
  async _handleCommit(n) {
    await this.versioningManager.getConfig();
    const e = await this.mergingManager.getConfig();
    await this.vfs.versioner(n), this.commitCount++, e.strategy === "immediate" && await this.vfs.merger();
  }
  // -------------------------------
  // Filesystem Operations
  // -------------------------------
  async mount(n, e, t, r, i = {}) {
    try {
      this._setupVersioningAndMerging(i), n = this._normalizePath(n);
      const a = await this.versioningManager.getConfig(), c = await this.mergingManager.getConfig(), l = await this.vfs.mount(n, e, t, r, {
        ...i,
        versioning: a,
        merging: c
      });
      this.fsInstance = l.fsInstance;
      const d = await this.read(`${n}/${t}`);
      return C("Mount successful, root:", d), l;
    } catch (a) {
      throw D(`Failed to mount filesystem at ${n}:`, a), new Error(`Failed to mount filesystem: ${a.message}`);
    }
  }
  async unmount(n, e) {
    try {
      return n = this._normalizePath(n), await this.vfs.unmount(n, e), this.fsInstance = null, this._clearClocks(), this.commitCount = 0, { success: !0 };
    } catch (t) {
      throw D(`Failed to unmount filesystem at ${n}:`, t), new Error(`Failed to unmount filesystem: ${t.message}`);
    }
  }
  async setMergingStrategy(n) {
    await this.vfs.setMergingStrategy(n), C("Merging strategy set to:", n);
  }
  async setVersioingStrategy(n) {
    await this.vfs.setVersioingStrategy(n), C("Versioning strategy set to:", n);
  }
  /**
   * Sets user configurations for the KFS instance.
    * @param {string} [args.name] - The name of the user.
    * @param {string} [args.email] - The email of the user.
    * @param {string} [args.username] - The username of the user.
    * @param {string} [args.password] - The password of the user.
    * @throws {Error} - Throws an error if the arguments are invalid or if the operation fails.
   */
  async setUserConfigs(n) {
    if (!n || typeof n != "object")
      throw new Error("Invalid arguments: must be an object");
    const e = ["password", "username", "email", "name"], t = Object.keys(n).filter(
      (r) => !e.includes(r)
    );
    if (t.length > 0)
      throw new Error(
        `Invalid field(s) provided: ${t.join(", ")}. Allowed fields are: ${e.join(", ")}`
      );
    return this.vfs.setUserConfigs(n), n;
  }
  async create(n, e = "file", t = "") {
    try {
      if (!["file", "dir"].includes(e))
        throw new Error(`Invalid type: ${e}. Must be 'file' or 'dir'`);
      n = this._normalizePath(n);
      const { fs: r, relativePath: i, versioning: a } = await this.vfs.resolveFS(n);
      if (e === "file" && await this._ensurePathExists(r, i), e === "dir")
        await r.fsInstance.fs_mkdir(i);
      else {
        const c = await r.fsInstance.fs_fopen(i, "w");
        await r.fsInstance.fs_fwrite(c, t), await r.fsInstance.fs_fclose(c);
      }
      return await this.vfs.writeToFsTable(i, e, t.length), a?.strategy === "immediate" ? await this._handleCommit(`Created ${e} at ${n}`) : await this.versioningManager.maybeTriggerVersioning(a), { success: !0 };
    } catch (r) {
      throw D(`Failed to create ${e} at ${n}:`, r), new Error(`Failed to create: ${r.message}`);
    }
  }
  async remove(n) {
    try {
      n = this._normalizePath(n);
      const { fs: e, relativePath: t, versioning: r } = await this.vfs.resolveFS(n), i = await e.fsInstance.fs_stat(t);
      if (!i) throw new Error("ENOENT: no such file or directory");
      return await i.isDirectory() ? await e.fsInstance.fs_rmdir(t) : await e.fsInstance.fs_remove(t), await this.vfs.removeFromFsTable(t), r?.strategy === "immediate" ? await this._handleCommit(`Removed ${n}`) : await this.versioningManager.maybeTriggerVersioning(r), { success: !0 };
    } catch (e) {
      throw D(`Failed to remove ${n}:`, e), new Error(`Failed to remove: ${e.message}`);
    }
  }
  async read(n) {
    try {
      n = this._normalizePath(n);
      const { fs: e, relativePath: t } = await this.vfs.resolveFS(n);
      this.fsInstance = e.fsInstance;
      const r = await this.fsInstance.fs_stat(t);
      if (!r) throw new Error("ENOENT: no such file or directory");
      if (await r.isDirectory())
        return await this.fsInstance.fs_readdir(t);
      {
        const i = await this.fsInstance.fs_fopen(t, "r"), a = await this.fsInstance.fs_fread(i, 1024);
        return await this.fsInstance.fs_fclose(i), a;
      }
    } catch (e) {
      throw new Error(`Failed to read file: ${e.message}`);
    }
  }
  // -------------------------------
  // Utility Methods
  // -------------------------------
  async _ensurePathExists(n, e) {
    const r = e.split("/").filter((a) => a !== "").slice(0, -1);
    let i = "";
    for (const a of r) {
      i = i ? `${i}/${a}` : `/${a}`;
      try {
        await n.fsInstance.fs_mkdir(i), await this.vfs.writeToFsTable(i, "dir");
      } catch (c) {
        if (!c.message.includes("exists")) throw c;
      }
    }
  }
  _normalizePath(n) {
    if (typeof n != "string") throw new Error("Path must be a string");
    return n.startsWith("/") ? n : `/${n}`;
  }
}
export {
  on as KFS,
  ln as serviceWorker
};
//# sourceMappingURL=kfs.js.map
