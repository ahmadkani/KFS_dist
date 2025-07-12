var nr = function(t) {
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
nr.prototype.onInit = function(t) {
  this.connectionEstablished = !0;
  var e = this.queue;
  this.queue = [];
  for (var r = 0, i = e; r < i.length; r += 1)
    this.channel.postMessage(i[r]);
  t.reply && this.channel.postMessage({ type: "MP_INIT", reply: !1 });
}, nr.prototype.onSet = function(t) {
  for (var e = this, r = {}, i = t.object, n = function() {
    var l = o[a], f = !t.void.includes(l);
    r[l] = function() {
      for (var u = [], m = arguments.length; m--; ) u[m] = arguments[m];
      return e.rpc_counter = (e.rpc_counter + 1) % Number.MAX_SAFE_INTEGER, new Promise(function(p, y) {
        e.postMessage({ type: "MP_CALL", object: i, method: l, id: e.rpc_counter, args: u, reply: f }), f ? e.calls.set(e.rpc_counter, { resolve: p, reject: y }) : p();
      });
    };
  }, a = 0, o = t.methods; a < o.length; a += 1) n();
  var s = this.foreign.get(t.object);
  this.foreign.set(t.object, r), typeof s == "function" && s(r);
}, nr.prototype.onCall = function(t) {
  var e = this, r = this.local.get(t.object);
  r && r[t.method].apply(r, t.args).then(function(i) {
    return t.reply && e.channel.postMessage({ type: "MP_RETURN", id: t.id, result: i });
  }).catch(function(i) {
    return e.channel.postMessage({ type: "MP_RETURN", id: t.id, error: i.message });
  });
}, nr.prototype.onReturn = function(t) {
  if (this.calls.has(t.id)) {
    var e = this.calls.get(t.id), r = e.resolve, i = e.reject;
    this.calls.clear(t.id), t.error ? i(t.error) : r(t.result);
  }
}, nr.prototype.postMessage = function(t) {
  this.connectionEstablished ? this.channel.postMessage(t) : this.queue.push(t);
}, nr.prototype.set = function(t, e, r) {
  r === void 0 && (r = {}), this.local.set(t, e);
  var i = Object.entries(e).filter(function(n) {
    return typeof n[1] == "function";
  }).map(function(n) {
    return n[0];
  });
  this.postMessage({ type: "MP_SET", object: t, methods: i, void: r.void || [] });
}, nr.prototype.get = function(t) {
  return new Promise(function(e, r) {
    var i = this;
    return this.foreign.has(t) ? e(this.foreign.get(t)) : e(new Promise(function(n, a) {
      return i.foreign.set(t, n);
    }));
  }.bind(this));
};
function Wc(t) {
  var e = new nr(t);
  Object.defineProperties(this, { get: { writable: !1, configurable: !1, value: e.get.bind(e) }, set: { writable: !1, configurable: !1, value: e.set.bind(e) } });
}
var Jo = {}, Wi = {};
Wi.byteLength = Zc;
Wi.toByteArray = Xc;
Wi.fromByteArray = Jc;
var jt = [], Rt = [], qc = typeof Uint8Array < "u" ? Uint8Array : Array, Qi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var xr = 0, Gc = Qi.length; xr < Gc; ++xr)
  jt[xr] = Qi[xr], Rt[Qi.charCodeAt(xr)] = xr;
Rt[45] = 62;
Rt[95] = 63;
function Qo(t) {
  var e = t.length;
  if (e % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var r = t.indexOf("=");
  r === -1 && (r = e);
  var i = r === e ? 0 : 4 - r % 4;
  return [r, i];
}
function Zc(t) {
  var e = Qo(t), r = e[0], i = e[1];
  return (r + i) * 3 / 4 - i;
}
function Vc(t, e, r) {
  return (e + r) * 3 / 4 - r;
}
function Xc(t) {
  var e, r = Qo(t), i = r[0], n = r[1], a = new qc(Vc(t, i, n)), o = 0, s = n > 0 ? i - 4 : i, l;
  for (l = 0; l < s; l += 4)
    e = Rt[t.charCodeAt(l)] << 18 | Rt[t.charCodeAt(l + 1)] << 12 | Rt[t.charCodeAt(l + 2)] << 6 | Rt[t.charCodeAt(l + 3)], a[o++] = e >> 16 & 255, a[o++] = e >> 8 & 255, a[o++] = e & 255;
  return n === 2 && (e = Rt[t.charCodeAt(l)] << 2 | Rt[t.charCodeAt(l + 1)] >> 4, a[o++] = e & 255), n === 1 && (e = Rt[t.charCodeAt(l)] << 10 | Rt[t.charCodeAt(l + 1)] << 4 | Rt[t.charCodeAt(l + 2)] >> 2, a[o++] = e >> 8 & 255, a[o++] = e & 255), a;
}
function Yc(t) {
  return jt[t >> 18 & 63] + jt[t >> 12 & 63] + jt[t >> 6 & 63] + jt[t & 63];
}
function Kc(t, e, r) {
  for (var i, n = [], a = e; a < r; a += 3)
    i = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (t[a + 2] & 255), n.push(Yc(i));
  return n.join("");
}
function Jc(t) {
  for (var e, r = t.length, i = r % 3, n = [], a = 16383, o = 0, s = r - i; o < s; o += a)
    n.push(Kc(t, o, o + a > s ? s : o + a));
  return i === 1 ? (e = t[r - 1], n.push(
    jt[e >> 2] + jt[e << 4 & 63] + "=="
  )) : i === 2 && (e = (t[r - 2] << 8) + t[r - 1], n.push(
    jt[e >> 10] + jt[e >> 4 & 63] + jt[e << 2 & 63] + "="
  )), n.join("");
}
var ua = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ua.read = function(t, e, r, i, n) {
  var a, o, s = n * 8 - i - 1, l = (1 << s) - 1, f = l >> 1, u = -7, m = r ? n - 1 : 0, p = r ? -1 : 1, y = t[e + m];
  for (m += p, a = y & (1 << -u) - 1, y >>= -u, u += s; u > 0; a = a * 256 + t[e + m], m += p, u -= 8)
    ;
  for (o = a & (1 << -u) - 1, a >>= -u, u += i; u > 0; o = o * 256 + t[e + m], m += p, u -= 8)
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
ua.write = function(t, e, r, i, n, a) {
  var o, s, l, f = a * 8 - n - 1, u = (1 << f) - 1, m = u >> 1, p = n === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, y = i ? 0 : a - 1, E = i ? 1 : -1, R = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
  for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, o = u) : (o = Math.floor(Math.log(e) / Math.LN2), e * (l = Math.pow(2, -o)) < 1 && (o--, l *= 2), o + m >= 1 ? e += p / l : e += p * Math.pow(2, 1 - m), e * l >= 2 && (o++, l /= 2), o + m >= u ? (s = 0, o = u) : o + m >= 1 ? (s = (e * l - 1) * Math.pow(2, n), o = o + m) : (s = e * Math.pow(2, m - 1) * Math.pow(2, n), o = 0)); n >= 8; t[r + y] = s & 255, y += E, s /= 256, n -= 8)
    ;
  for (o = o << n | s, f += n; f > 0; t[r + y] = o & 255, y += E, o /= 256, f -= 8)
    ;
  t[r + y - E] |= R * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(t) {
  const e = Wi, r = ua, i = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  t.Buffer = u, t.SlowBuffer = U, t.INSPECT_MAX_BYTES = 50;
  const n = 2147483647;
  t.kMaxLength = n;
  const { Uint8Array: a, ArrayBuffer: o, SharedArrayBuffer: s } = globalThis;
  u.TYPED_ARRAY_SUPPORT = l(), !u.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
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
      return R(k, c);
    if (o.isView(k))
      return I(k);
    if (k == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof k
      );
    if (Ge(k, o) || k && Ge(k.buffer, o) || typeof s < "u" && (Ge(k, s) || k && Ge(k.buffer, s)))
      return T(k, c, d);
    if (typeof k == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const v = k.valueOf && k.valueOf();
    if (v != null && v !== k)
      return u.from(v, c, d);
    const C = A(k);
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
  function p(k) {
    if (typeof k != "number")
      throw new TypeError('"size" argument must be of type number');
    if (k < 0)
      throw new RangeError('The value "' + k + '" is invalid for option "size"');
  }
  function y(k, c, d) {
    return p(k), k <= 0 ? f(k) : c !== void 0 ? typeof d == "string" ? f(k).fill(c, d) : f(k).fill(c) : f(k);
  }
  u.alloc = function(k, c, d) {
    return y(k, c, d);
  };
  function E(k) {
    return p(k), f(k < 0 ? 0 : P(k) | 0);
  }
  u.allocUnsafe = function(k) {
    return E(k);
  }, u.allocUnsafeSlow = function(k) {
    return E(k);
  };
  function R(k, c) {
    if ((typeof c != "string" || c === "") && (c = "utf8"), !u.isEncoding(c))
      throw new TypeError("Unknown encoding: " + c);
    const d = M(k, c) | 0;
    let v = f(d);
    const C = v.write(k, c);
    return C !== d && (v = v.slice(0, C)), v;
  }
  function $(k) {
    const c = k.length < 0 ? 0 : P(k.length) | 0, d = f(c);
    for (let v = 0; v < c; v += 1)
      d[v] = k[v] & 255;
    return d;
  }
  function I(k) {
    if (Ge(k, a)) {
      const c = new a(k);
      return T(c.buffer, c.byteOffset, c.byteLength);
    }
    return $(k);
  }
  function T(k, c, d) {
    if (c < 0 || k.byteLength < c)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (k.byteLength < c + (d || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let v;
    return c === void 0 && d === void 0 ? v = new a(k) : d === void 0 ? v = new a(k, c) : v = new a(k, c, d), Object.setPrototypeOf(v, u.prototype), v;
  }
  function A(k) {
    if (u.isBuffer(k)) {
      const c = P(k.length) | 0, d = f(c);
      return d.length === 0 || k.copy(d, 0, 0, c), d;
    }
    if (k.length !== void 0)
      return typeof k.length != "number" || vt(k.length) ? f(0) : $(k);
    if (k.type === "Buffer" && Array.isArray(k.data))
      return $(k.data);
  }
  function P(k) {
    if (k >= n)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + n.toString(16) + " bytes");
    return k | 0;
  }
  function U(k) {
    return +k != k && (k = 0), u.alloc(+k);
  }
  u.isBuffer = function(c) {
    return c != null && c._isBuffer === !0 && c !== u.prototype;
  }, u.compare = function(c, d) {
    if (Ge(c, a) && (c = u.from(c, c.offset, c.byteLength)), Ge(d, a) && (d = u.from(d, d.offset, d.byteLength)), !u.isBuffer(c) || !u.isBuffer(d))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (c === d) return 0;
    let v = c.length, C = d.length;
    for (let x = 0, F = Math.min(v, C); x < F; ++x)
      if (c[x] !== d[x]) {
        v = c[x], C = d[x];
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
    let x = 0;
    for (v = 0; v < c.length; ++v) {
      let F = c[v];
      if (Ge(F, a))
        x + F.length > C.length ? (u.isBuffer(F) || (F = u.from(F)), F.copy(C, x)) : a.prototype.set.call(
          C,
          F,
          x
        );
      else if (u.isBuffer(F))
        F.copy(C, x);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      x += F.length;
    }
    return C;
  };
  function M(k, c) {
    if (u.isBuffer(k))
      return k.length;
    if (o.isView(k) || Ge(k, o))
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
          return xt(k).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return d * 2;
        case "hex":
          return d >>> 1;
        case "base64":
          return Ve(k).length;
        default:
          if (C)
            return v ? -1 : xt(k).length;
          c = ("" + c).toLowerCase(), C = !0;
      }
  }
  u.byteLength = M;
  function B(k, c, d) {
    let v = !1;
    if ((c === void 0 || c < 0) && (c = 0), c > this.length || ((d === void 0 || d > this.length) && (d = this.length), d <= 0) || (d >>>= 0, c >>>= 0, d <= c))
      return "";
    for (k || (k = "utf8"); ; )
      switch (k) {
        case "hex":
          return be(this, c, d);
        case "utf8":
        case "utf-8":
          return Y(this, c, d);
        case "ascii":
          return Se(this, c, d);
        case "latin1":
        case "binary":
          return $e(this, c, d);
        case "base64":
          return ne(this, c, d);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Be(this, c, d);
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
    return c === 0 ? "" : arguments.length === 0 ? Y(this, 0, c) : B.apply(this, arguments);
  }, u.prototype.toLocaleString = u.prototype.toString, u.prototype.equals = function(c) {
    if (!u.isBuffer(c)) throw new TypeError("Argument must be a Buffer");
    return this === c ? !0 : u.compare(this, c) === 0;
  }, u.prototype.inspect = function() {
    let c = "";
    const d = t.INSPECT_MAX_BYTES;
    return c = this.toString("hex", 0, d).replace(/(.{2})/g, "$1 ").trim(), this.length > d && (c += " ... "), "<Buffer " + c + ">";
  }, i && (u.prototype[i] = u.prototype.inspect), u.prototype.compare = function(c, d, v, C, x) {
    if (Ge(c, a) && (c = u.from(c, c.offset, c.byteLength)), !u.isBuffer(c))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof c
      );
    if (d === void 0 && (d = 0), v === void 0 && (v = c ? c.length : 0), C === void 0 && (C = 0), x === void 0 && (x = this.length), d < 0 || v > c.length || C < 0 || x > this.length)
      throw new RangeError("out of range index");
    if (C >= x && d >= v)
      return 0;
    if (C >= x)
      return -1;
    if (d >= v)
      return 1;
    if (d >>>= 0, v >>>= 0, C >>>= 0, x >>>= 0, this === c) return 0;
    let F = x - C, b = v - d;
    const ee = Math.min(F, b), le = this.slice(C, x), h = c.slice(d, v);
    for (let q = 0; q < ee; ++q)
      if (le[q] !== h[q]) {
        F = le[q], b = h[q];
        break;
      }
    return F < b ? -1 : b < F ? 1 : 0;
  };
  function W(k, c, d, v, C) {
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
    let x = 1, F = k.length, b = c.length;
    if (v !== void 0 && (v = String(v).toLowerCase(), v === "ucs2" || v === "ucs-2" || v === "utf16le" || v === "utf-16le")) {
      if (k.length < 2 || c.length < 2)
        return -1;
      x = 2, F /= 2, b /= 2, d /= 2;
    }
    function ee(h, q) {
      return x === 1 ? h[q] : h.readUInt16BE(q * x);
    }
    let le;
    if (C) {
      let h = -1;
      for (le = d; le < F; le++)
        if (ee(k, le) === ee(c, h === -1 ? 0 : le - h)) {
          if (h === -1 && (h = le), le - h + 1 === b) return h * x;
        } else
          h !== -1 && (le -= le - h), h = -1;
    } else
      for (d + b > F && (d = F - b), le = d; le >= 0; le--) {
        let h = !0;
        for (let q = 0; q < b; q++)
          if (ee(k, le + q) !== ee(c, q)) {
            h = !1;
            break;
          }
        if (h) return le;
      }
    return -1;
  }
  u.prototype.includes = function(c, d, v) {
    return this.indexOf(c, d, v) !== -1;
  }, u.prototype.indexOf = function(c, d, v) {
    return W(this, c, d, v, !0);
  }, u.prototype.lastIndexOf = function(c, d, v) {
    return W(this, c, d, v, !1);
  };
  function K(k, c, d, v) {
    d = Number(d) || 0;
    const C = k.length - d;
    v ? (v = Number(v), v > C && (v = C)) : v = C;
    const x = c.length;
    v > x / 2 && (v = x / 2);
    let F;
    for (F = 0; F < v; ++F) {
      const b = parseInt(c.substr(F * 2, 2), 16);
      if (vt(b)) return F;
      k[d + F] = b;
    }
    return F;
  }
  function N(k, c, d, v) {
    return ft(xt(c, k.length - d), k, d, v);
  }
  function Q(k, c, d, v) {
    return ft(It(c), k, d, v);
  }
  function ce(k, c, d, v) {
    return ft(Ve(c), k, d, v);
  }
  function _e(k, c, d, v) {
    return ft(Fe(c, k.length - d), k, d, v);
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
    const x = this.length - d;
    if ((v === void 0 || v > x) && (v = x), c.length > 0 && (v < 0 || d < 0) || d > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    C || (C = "utf8");
    let F = !1;
    for (; ; )
      switch (C) {
        case "hex":
          return K(this, c, d, v);
        case "utf8":
        case "utf-8":
          return N(this, c, d, v);
        case "ascii":
        case "latin1":
        case "binary":
          return Q(this, c, d, v);
        case "base64":
          return ce(this, c, d, v);
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
  function ne(k, c, d) {
    return c === 0 && d === k.length ? e.fromByteArray(k) : e.fromByteArray(k.slice(c, d));
  }
  function Y(k, c, d) {
    d = Math.min(k.length, d);
    const v = [];
    let C = c;
    for (; C < d; ) {
      const x = k[C];
      let F = null, b = x > 239 ? 4 : x > 223 ? 3 : x > 191 ? 2 : 1;
      if (C + b <= d) {
        let ee, le, h, q;
        switch (b) {
          case 1:
            x < 128 && (F = x);
            break;
          case 2:
            ee = k[C + 1], (ee & 192) === 128 && (q = (x & 31) << 6 | ee & 63, q > 127 && (F = q));
            break;
          case 3:
            ee = k[C + 1], le = k[C + 2], (ee & 192) === 128 && (le & 192) === 128 && (q = (x & 15) << 12 | (ee & 63) << 6 | le & 63, q > 2047 && (q < 55296 || q > 57343) && (F = q));
            break;
          case 4:
            ee = k[C + 1], le = k[C + 2], h = k[C + 3], (ee & 192) === 128 && (le & 192) === 128 && (h & 192) === 128 && (q = (x & 15) << 18 | (ee & 63) << 12 | (le & 63) << 6 | h & 63, q > 65535 && q < 1114112 && (F = q));
        }
      }
      F === null ? (F = 65533, b = 1) : F > 65535 && (F -= 65536, v.push(F >>> 10 & 1023 | 55296), F = 56320 | F & 1023), v.push(F), C += b;
    }
    return we(v);
  }
  const ae = 4096;
  function we(k) {
    const c = k.length;
    if (c <= ae)
      return String.fromCharCode.apply(String, k);
    let d = "", v = 0;
    for (; v < c; )
      d += String.fromCharCode.apply(
        String,
        k.slice(v, v += ae)
      );
    return d;
  }
  function Se(k, c, d) {
    let v = "";
    d = Math.min(k.length, d);
    for (let C = c; C < d; ++C)
      v += String.fromCharCode(k[C] & 127);
    return v;
  }
  function $e(k, c, d) {
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
    for (let x = c; x < d; ++x)
      C += Et[k[x]];
    return C;
  }
  function Be(k, c, d) {
    const v = k.slice(c, d);
    let C = "";
    for (let x = 0; x < v.length - 1; x += 2)
      C += String.fromCharCode(v[x] + v[x + 1] * 256);
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
    let C = this[c], x = 1, F = 0;
    for (; ++F < d && (x *= 256); )
      C += this[c + F] * x;
    return C;
  }, u.prototype.readUintBE = u.prototype.readUIntBE = function(c, d, v) {
    c = c >>> 0, d = d >>> 0, v || ye(c, d, this.length);
    let C = this[c + --d], x = 1;
    for (; d > 0 && (x *= 256); )
      C += this[c + --d] * x;
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
    const C = d + this[++c] * 2 ** 8 + this[++c] * 2 ** 16 + this[++c] * 2 ** 24, x = this[++c] + this[++c] * 2 ** 8 + this[++c] * 2 ** 16 + v * 2 ** 24;
    return BigInt(C) + (BigInt(x) << BigInt(32));
  }), u.prototype.readBigUInt64BE = Le(function(c) {
    c = c >>> 0, ze(c, "offset");
    const d = this[c], v = this[c + 7];
    (d === void 0 || v === void 0) && Ce(c, this.length - 8);
    const C = d * 2 ** 24 + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + this[++c], x = this[++c] * 2 ** 24 + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + v;
    return (BigInt(C) << BigInt(32)) + BigInt(x);
  }), u.prototype.readIntLE = function(c, d, v) {
    c = c >>> 0, d = d >>> 0, v || ye(c, d, this.length);
    let C = this[c], x = 1, F = 0;
    for (; ++F < d && (x *= 256); )
      C += this[c + F] * x;
    return x *= 128, C >= x && (C -= Math.pow(2, 8 * d)), C;
  }, u.prototype.readIntBE = function(c, d, v) {
    c = c >>> 0, d = d >>> 0, v || ye(c, d, this.length);
    let C = d, x = 1, F = this[c + --C];
    for (; C > 0 && (x *= 256); )
      F += this[c + --C] * x;
    return x *= 128, F >= x && (F -= Math.pow(2, 8 * d)), F;
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
  function Re(k, c, d, v, C, x) {
    if (!u.isBuffer(k)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (c > C || c < x) throw new RangeError('"value" argument is out of bounds');
    if (d + v > k.length) throw new RangeError("Index out of range");
  }
  u.prototype.writeUintLE = u.prototype.writeUIntLE = function(c, d, v, C) {
    if (c = +c, d = d >>> 0, v = v >>> 0, !C) {
      const b = Math.pow(2, 8 * v) - 1;
      Re(this, c, d, v, b, 0);
    }
    let x = 1, F = 0;
    for (this[d] = c & 255; ++F < v && (x *= 256); )
      this[d + F] = c / x & 255;
    return d + v;
  }, u.prototype.writeUintBE = u.prototype.writeUIntBE = function(c, d, v, C) {
    if (c = +c, d = d >>> 0, v = v >>> 0, !C) {
      const b = Math.pow(2, 8 * v) - 1;
      Re(this, c, d, v, b, 0);
    }
    let x = v - 1, F = 1;
    for (this[d + x] = c & 255; --x >= 0 && (F *= 256); )
      this[d + x] = c / F & 255;
    return d + v;
  }, u.prototype.writeUint8 = u.prototype.writeUInt8 = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Re(this, c, d, 1, 255, 0), this[d] = c & 255, d + 1;
  }, u.prototype.writeUint16LE = u.prototype.writeUInt16LE = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Re(this, c, d, 2, 65535, 0), this[d] = c & 255, this[d + 1] = c >>> 8, d + 2;
  }, u.prototype.writeUint16BE = u.prototype.writeUInt16BE = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Re(this, c, d, 2, 65535, 0), this[d] = c >>> 8, this[d + 1] = c & 255, d + 2;
  }, u.prototype.writeUint32LE = u.prototype.writeUInt32LE = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Re(this, c, d, 4, 4294967295, 0), this[d + 3] = c >>> 24, this[d + 2] = c >>> 16, this[d + 1] = c >>> 8, this[d] = c & 255, d + 4;
  }, u.prototype.writeUint32BE = u.prototype.writeUInt32BE = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Re(this, c, d, 4, 4294967295, 0), this[d] = c >>> 24, this[d + 1] = c >>> 16, this[d + 2] = c >>> 8, this[d + 3] = c & 255, d + 4;
  };
  function ke(k, c, d, v, C) {
    Me(c, v, C, k, d, 7);
    let x = Number(c & BigInt(4294967295));
    k[d++] = x, x = x >> 8, k[d++] = x, x = x >> 8, k[d++] = x, x = x >> 8, k[d++] = x;
    let F = Number(c >> BigInt(32) & BigInt(4294967295));
    return k[d++] = F, F = F >> 8, k[d++] = F, F = F >> 8, k[d++] = F, F = F >> 8, k[d++] = F, d;
  }
  function Ee(k, c, d, v, C) {
    Me(c, v, C, k, d, 7);
    let x = Number(c & BigInt(4294967295));
    k[d + 7] = x, x = x >> 8, k[d + 6] = x, x = x >> 8, k[d + 5] = x, x = x >> 8, k[d + 4] = x;
    let F = Number(c >> BigInt(32) & BigInt(4294967295));
    return k[d + 3] = F, F = F >> 8, k[d + 2] = F, F = F >> 8, k[d + 1] = F, F = F >> 8, k[d] = F, d + 8;
  }
  u.prototype.writeBigUInt64LE = Le(function(c, d = 0) {
    return ke(this, c, d, BigInt(0), BigInt("0xffffffffffffffff"));
  }), u.prototype.writeBigUInt64BE = Le(function(c, d = 0) {
    return Ee(this, c, d, BigInt(0), BigInt("0xffffffffffffffff"));
  }), u.prototype.writeIntLE = function(c, d, v, C) {
    if (c = +c, d = d >>> 0, !C) {
      const ee = Math.pow(2, 8 * v - 1);
      Re(this, c, d, v, ee - 1, -ee);
    }
    let x = 0, F = 1, b = 0;
    for (this[d] = c & 255; ++x < v && (F *= 256); )
      c < 0 && b === 0 && this[d + x - 1] !== 0 && (b = 1), this[d + x] = (c / F >> 0) - b & 255;
    return d + v;
  }, u.prototype.writeIntBE = function(c, d, v, C) {
    if (c = +c, d = d >>> 0, !C) {
      const ee = Math.pow(2, 8 * v - 1);
      Re(this, c, d, v, ee - 1, -ee);
    }
    let x = v - 1, F = 1, b = 0;
    for (this[d + x] = c & 255; --x >= 0 && (F *= 256); )
      c < 0 && b === 0 && this[d + x + 1] !== 0 && (b = 1), this[d + x] = (c / F >> 0) - b & 255;
    return d + v;
  }, u.prototype.writeInt8 = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Re(this, c, d, 1, 127, -128), c < 0 && (c = 255 + c + 1), this[d] = c & 255, d + 1;
  }, u.prototype.writeInt16LE = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Re(this, c, d, 2, 32767, -32768), this[d] = c & 255, this[d + 1] = c >>> 8, d + 2;
  }, u.prototype.writeInt16BE = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Re(this, c, d, 2, 32767, -32768), this[d] = c >>> 8, this[d + 1] = c & 255, d + 2;
  }, u.prototype.writeInt32LE = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Re(this, c, d, 4, 2147483647, -2147483648), this[d] = c & 255, this[d + 1] = c >>> 8, this[d + 2] = c >>> 16, this[d + 3] = c >>> 24, d + 4;
  }, u.prototype.writeInt32BE = function(c, d, v) {
    return c = +c, d = d >>> 0, v || Re(this, c, d, 4, 2147483647, -2147483648), c < 0 && (c = 4294967295 + c + 1), this[d] = c >>> 24, this[d + 1] = c >>> 16, this[d + 2] = c >>> 8, this[d + 3] = c & 255, d + 4;
  }, u.prototype.writeBigInt64LE = Le(function(c, d = 0) {
    return ke(this, c, d, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), u.prototype.writeBigInt64BE = Le(function(c, d = 0) {
    return Ee(this, c, d, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function Ae(k, c, d, v, C, x) {
    if (d + v > k.length) throw new RangeError("Index out of range");
    if (d < 0) throw new RangeError("Index out of range");
  }
  function qe(k, c, d, v, C) {
    return c = +c, d = d >>> 0, C || Ae(k, c, d, 4), r.write(k, c, d, v, 23, 4), d + 4;
  }
  u.prototype.writeFloatLE = function(c, d, v) {
    return qe(this, c, d, !0, v);
  }, u.prototype.writeFloatBE = function(c, d, v) {
    return qe(this, c, d, !1, v);
  };
  function rt(k, c, d, v, C) {
    return c = +c, d = d >>> 0, C || Ae(k, c, d, 8), r.write(k, c, d, v, 52, 8), d + 8;
  }
  u.prototype.writeDoubleLE = function(c, d, v) {
    return rt(this, c, d, !0, v);
  }, u.prototype.writeDoubleBE = function(c, d, v) {
    return rt(this, c, d, !1, v);
  }, u.prototype.copy = function(c, d, v, C) {
    if (!u.isBuffer(c)) throw new TypeError("argument should be a Buffer");
    if (v || (v = 0), !C && C !== 0 && (C = this.length), d >= c.length && (d = c.length), d || (d = 0), C > 0 && C < v && (C = v), C === v || c.length === 0 || this.length === 0) return 0;
    if (d < 0)
      throw new RangeError("targetStart out of bounds");
    if (v < 0 || v >= this.length) throw new RangeError("Index out of range");
    if (C < 0) throw new RangeError("sourceEnd out of bounds");
    C > this.length && (C = this.length), c.length - d < C - v && (C = c.length - d + v);
    const x = C - v;
    return this === c && typeof a.prototype.copyWithin == "function" ? this.copyWithin(d, v, C) : a.prototype.set.call(
      c,
      this.subarray(v, C),
      d
    ), x;
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
    let x;
    if (typeof c == "number")
      for (x = d; x < v; ++x)
        this[x] = c;
    else {
      const F = u.isBuffer(c) ? c : u.from(c, C), b = F.length;
      if (b === 0)
        throw new TypeError('The value "' + c + '" is invalid for argument "value"');
      for (x = 0; x < v - d; ++x)
        this[x + d] = F[x % b];
    }
    return this;
  };
  const je = {};
  function pe(k, c, d) {
    je[k] = class extends d {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: c.apply(this, arguments),
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
  pe(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(k) {
      return k ? `${k} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), pe(
    "ERR_INVALID_ARG_TYPE",
    function(k, c) {
      return `The "${k}" argument must be of type number. Received type ${typeof c}`;
    },
    TypeError
  ), pe(
    "ERR_OUT_OF_RANGE",
    function(k, c, d) {
      let v = `The value of "${k}" is out of range.`, C = d;
      return Number.isInteger(d) && Math.abs(d) > 2 ** 32 ? C = Oe(String(d)) : typeof d == "bigint" && (C = String(d), (d > BigInt(2) ** BigInt(32) || d < -(BigInt(2) ** BigInt(32))) && (C = Oe(C)), C += "n"), v += ` It must be ${c}. Received ${C}`, v;
    },
    RangeError
  );
  function Oe(k) {
    let c = "", d = k.length;
    const v = k[0] === "-" ? 1 : 0;
    for (; d >= v + 4; d -= 3)
      c = `_${k.slice(d - 3, d)}${c}`;
    return `${k.slice(0, d)}${c}`;
  }
  function Ze(k, c, d) {
    ze(c, "offset"), (k[c] === void 0 || k[c + d] === void 0) && Ce(c, k.length - (d + 1));
  }
  function Me(k, c, d, v, C, x) {
    if (k > d || k < c) {
      const F = typeof c == "bigint" ? "n" : "";
      let b;
      throw c === 0 || c === BigInt(0) ? b = `>= 0${F} and < 2${F} ** ${(x + 1) * 8}${F}` : b = `>= -(2${F} ** ${(x + 1) * 8 - 1}${F}) and < 2 ** ${(x + 1) * 8 - 1}${F}`, new je.ERR_OUT_OF_RANGE("value", b, k);
    }
    Ze(v, C, x);
  }
  function ze(k, c) {
    if (typeof k != "number")
      throw new je.ERR_INVALID_ARG_TYPE(c, "number", k);
  }
  function Ce(k, c, d) {
    throw Math.floor(k) !== k ? (ze(k, d), new je.ERR_OUT_OF_RANGE("offset", "an integer", k)) : c < 0 ? new je.ERR_BUFFER_OUT_OF_BOUNDS() : new je.ERR_OUT_OF_RANGE(
      "offset",
      `>= 0 and <= ${c}`,
      k
    );
  }
  const xe = /[^+/0-9A-Za-z-_]/g;
  function ut(k) {
    if (k = k.split("=")[0], k = k.trim().replace(xe, ""), k.length < 2) return "";
    for (; k.length % 4 !== 0; )
      k = k + "=";
    return k;
  }
  function xt(k, c) {
    c = c || 1 / 0;
    let d;
    const v = k.length;
    let C = null;
    const x = [];
    for (let F = 0; F < v; ++F) {
      if (d = k.charCodeAt(F), d > 55295 && d < 57344) {
        if (!C) {
          if (d > 56319) {
            (c -= 3) > -1 && x.push(239, 191, 189);
            continue;
          } else if (F + 1 === v) {
            (c -= 3) > -1 && x.push(239, 191, 189);
            continue;
          }
          C = d;
          continue;
        }
        if (d < 56320) {
          (c -= 3) > -1 && x.push(239, 191, 189), C = d;
          continue;
        }
        d = (C - 55296 << 10 | d - 56320) + 65536;
      } else C && (c -= 3) > -1 && x.push(239, 191, 189);
      if (C = null, d < 128) {
        if ((c -= 1) < 0) break;
        x.push(d);
      } else if (d < 2048) {
        if ((c -= 2) < 0) break;
        x.push(
          d >> 6 | 192,
          d & 63 | 128
        );
      } else if (d < 65536) {
        if ((c -= 3) < 0) break;
        x.push(
          d >> 12 | 224,
          d >> 6 & 63 | 128,
          d & 63 | 128
        );
      } else if (d < 1114112) {
        if ((c -= 4) < 0) break;
        x.push(
          d >> 18 | 240,
          d >> 12 & 63 | 128,
          d >> 6 & 63 | 128,
          d & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return x;
  }
  function It(k) {
    const c = [];
    for (let d = 0; d < k.length; ++d)
      c.push(k.charCodeAt(d) & 255);
    return c;
  }
  function Fe(k, c) {
    let d, v, C;
    const x = [];
    for (let F = 0; F < k.length && !((c -= 2) < 0); ++F)
      d = k.charCodeAt(F), v = d >> 8, C = d % 256, x.push(C), x.push(v);
    return x;
  }
  function Ve(k) {
    return e.toByteArray(ut(k));
  }
  function ft(k, c, d, v) {
    let C;
    for (C = 0; C < v && !(C + d >= c.length || C >= k.length); ++C)
      c[C + d] = k[C];
    return C;
  }
  function Ge(k, c) {
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
    return typeof BigInt > "u" ? nt : k;
  }
  function nt() {
    throw new Error("BigInt not supported");
  }
})(Jo);
const fe = Jo.Buffer;
function Qc(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var es = { exports: {} }, tt = es.exports = {}, Lt, Pt;
function Qn() {
  throw new Error("setTimeout has not been defined");
}
function ea() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Lt = setTimeout : Lt = Qn;
  } catch {
    Lt = Qn;
  }
  try {
    typeof clearTimeout == "function" ? Pt = clearTimeout : Pt = ea;
  } catch {
    Pt = ea;
  }
})();
function ts(t) {
  if (Lt === setTimeout)
    return setTimeout(t, 0);
  if ((Lt === Qn || !Lt) && setTimeout)
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
function el(t) {
  if (Pt === clearTimeout)
    return clearTimeout(t);
  if ((Pt === ea || !Pt) && clearTimeout)
    return Pt = clearTimeout, clearTimeout(t);
  try {
    return Pt(t);
  } catch {
    try {
      return Pt.call(null, t);
    } catch {
      return Pt.call(this, t);
    }
  }
}
var Yt = [], $r = !1, _r, Ai = -1;
function tl() {
  !$r || !_r || ($r = !1, _r.length ? Yt = _r.concat(Yt) : Ai = -1, Yt.length && rs());
}
function rs() {
  if (!$r) {
    var t = ts(tl);
    $r = !0;
    for (var e = Yt.length; e; ) {
      for (_r = Yt, Yt = []; ++Ai < e; )
        _r && _r[Ai].run();
      Ai = -1, e = Yt.length;
    }
    _r = null, $r = !1, el(t);
  }
}
tt.nextTick = function(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var r = 1; r < arguments.length; r++)
      e[r - 1] = arguments[r];
  Yt.push(new is(t, e)), Yt.length === 1 && !$r && ts(rs);
};
function is(t, e) {
  this.fun = t, this.array = e;
}
is.prototype.run = function() {
  this.fun.apply(null, this.array);
};
tt.title = "browser";
tt.browser = !0;
tt.env = {};
tt.argv = [];
tt.version = "";
tt.versions = {};
function tr() {
}
tt.on = tr;
tt.addListener = tr;
tt.once = tr;
tt.off = tr;
tt.removeListener = tr;
tt.removeAllListeners = tr;
tt.emit = tr;
tt.prependListener = tr;
tt.prependOnceListener = tr;
tt.listeners = function(t) {
  return [];
};
tt.binding = function(t) {
  throw new Error("process.binding is not supported");
};
tt.cwd = function() {
  return "/";
};
tt.chdir = function(t) {
  throw new Error("process.chdir is not supported");
};
tt.umask = function() {
  return 0;
};
var rl = es.exports;
const gt = /* @__PURE__ */ Qc(rl);
function rr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function il(t) {
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
var en, $a;
function nl() {
  if ($a) return en;
  $a = 1;
  var t = function(e) {
    if (e = e || {}, this.Promise = e.Promise || Promise, this.queues = /* @__PURE__ */ Object.create(null), this.domainReentrant = e.domainReentrant || !1, this.domainReentrant) {
      if (typeof gt > "u" || typeof gt.domain > "u")
        throw new Error(
          "Domain-reentrant locks require `process.domain` to exist. Please flip `opts.domainReentrant = false`, use a NodeJS version that still implements Domain, or install a browser polyfill."
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
    typeof i != "function" && (n = i, i = null, s = new this.Promise(function(A, P) {
      a = A, o = P;
    })), n = n || {};
    var l = !1, f = null, u = null, m = null, p = this, y = function(A, P, U) {
      u && (clearTimeout(u), u = null), m && (clearTimeout(m), m = null), A && (p.queues[e] && p.queues[e].length === 0 && delete p.queues[e], p.domainReentrant && delete p.domains[e]), l || (s ? P ? o(P) : a(U) : typeof i == "function" && i(P, U), l = !0), A && p.queues[e] && p.queues[e].length > 0 && p.queues[e].shift()();
    }, E = function(A) {
      if (l)
        return y(A);
      f && (clearTimeout(f), f = null), p.domainReentrant && A && (p.domains[e] = gt.domain);
      var P = n.maxExecutionTime || p.maxExecutionTime;
      if (P && (m = setTimeout(function() {
        p.queues[e] && y(A, new Error("Maximum execution time is exceeded " + e));
      }, P)), r.length === 1) {
        var U = !1;
        try {
          r(function(M, B) {
            U || (U = !0, y(A, M, B));
          });
        } catch (M) {
          U || (U = !0, y(A, M));
        }
      } else
        p._promiseTry(function() {
          return r();
        }).then(function(M) {
          y(A, void 0, M);
        }, function(M) {
          y(A, M);
        });
    };
    p.domainReentrant && gt.domain && (E = gt.domain.bind(E));
    var R = n.maxPending || p.maxPending;
    if (!p.queues[e])
      p.queues[e] = [], E(!0);
    else if (p.domainReentrant && gt.domain && gt.domain === p.domains[e])
      E(!1);
    else if (p.queues[e].length >= R)
      y(!1, new Error("Too many pending tasks in queue " + e));
    else {
      var $ = function() {
        E(!0);
      };
      n.skipQueue ? p.queues[e].unshift($) : p.queues[e].push($);
      var I = n.timeout || p.timeout;
      I && (f = setTimeout(function() {
        f = null, y(!1, new Error("async-lock timed out in queue " + e));
      }, I));
    }
    var T = n.maxOccupationTime || p.maxOccupationTime;
    if (T && (u = setTimeout(function() {
      p.queues[e] && y(!1, new Error("Maximum occupation time is exceeded in queue " + e));
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
  }, en = t, en;
}
var tn, Ra;
function al() {
  return Ra || (Ra = 1, tn = nl()), tn;
}
var ol = al(), Qr = /* @__PURE__ */ rr(ol), xi = { exports: {} }, Da;
function sl() {
  return Da || (Da = 1, typeof Object.create == "function" ? xi.exports = function(e, r) {
    r && (e.super_ = r, e.prototype = Object.create(r.prototype, {
      constructor: {
        value: e,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : xi.exports = function(e, r) {
    if (r) {
      e.super_ = r;
      var i = function() {
      };
      i.prototype = r.prototype, e.prototype = new i(), e.prototype.constructor = e;
    }
  }), xi.exports;
}
var Ii = { exports: {} }, rn = {}, Ba;
function cl() {
  return Ba || (Ba = 1, function(t) {
    Object.defineProperties(t, { __esModule: { value: !0 }, [Symbol.toStringTag]: { value: "Module" } });
    var e = {}, r = {};
    r.byteLength = u, r.toByteArray = p, r.fromByteArray = R;
    for (var i = [], n = [], a = typeof Uint8Array < "u" ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, l = o.length; s < l; ++s)
      i[s] = o[s], n[o.charCodeAt(s)] = s;
    n[45] = 62, n[95] = 63;
    function f(T) {
      var A = T.length;
      if (A % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      var P = T.indexOf("=");
      P === -1 && (P = A);
      var U = P === A ? 0 : 4 - P % 4;
      return [P, U];
    }
    function u(T) {
      var A = f(T), P = A[0], U = A[1];
      return (P + U) * 3 / 4 - U;
    }
    function m(T, A, P) {
      return (A + P) * 3 / 4 - P;
    }
    function p(T) {
      var A, P = f(T), U = P[0], M = P[1], B = new a(m(T, U, M)), O = 0, W = M > 0 ? U - 4 : U, z;
      for (z = 0; z < W; z += 4)
        A = n[T.charCodeAt(z)] << 18 | n[T.charCodeAt(z + 1)] << 12 | n[T.charCodeAt(z + 2)] << 6 | n[T.charCodeAt(z + 3)], B[O++] = A >> 16 & 255, B[O++] = A >> 8 & 255, B[O++] = A & 255;
      return M === 2 && (A = n[T.charCodeAt(z)] << 2 | n[T.charCodeAt(z + 1)] >> 4, B[O++] = A & 255), M === 1 && (A = n[T.charCodeAt(z)] << 10 | n[T.charCodeAt(z + 1)] << 4 | n[T.charCodeAt(z + 2)] >> 2, B[O++] = A >> 8 & 255, B[O++] = A & 255), B;
    }
    function y(T) {
      return i[T >> 18 & 63] + i[T >> 12 & 63] + i[T >> 6 & 63] + i[T & 63];
    }
    function E(T, A, P) {
      for (var U, M = [], B = A; B < P; B += 3)
        U = (T[B] << 16 & 16711680) + (T[B + 1] << 8 & 65280) + (T[B + 2] & 255), M.push(y(U));
      return M.join("");
    }
    function R(T) {
      for (var A, P = T.length, U = P % 3, M = [], B = 16383, O = 0, W = P - U; O < W; O += B)
        M.push(E(T, O, O + B > W ? W : O + B));
      return U === 1 ? (A = T[P - 1], M.push(
        i[A >> 2] + i[A << 4 & 63] + "=="
      )) : U === 2 && (A = (T[P - 2] << 8) + T[P - 1], M.push(
        i[A >> 10] + i[A >> 4 & 63] + i[A << 2 & 63] + "="
      )), M.join("");
    }
    var $ = {};
    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    $.read = function(T, A, P, U, M) {
      var B, O, W = M * 8 - U - 1, z = (1 << W) - 1, K = z >> 1, N = -7, Q = P ? M - 1 : 0, ce = P ? -1 : 1, _e = T[A + Q];
      for (Q += ce, B = _e & (1 << -N) - 1, _e >>= -N, N += W; N > 0; B = B * 256 + T[A + Q], Q += ce, N -= 8)
        ;
      for (O = B & (1 << -N) - 1, B >>= -N, N += U; N > 0; O = O * 256 + T[A + Q], Q += ce, N -= 8)
        ;
      if (B === 0)
        B = 1 - K;
      else {
        if (B === z)
          return O ? NaN : (_e ? -1 : 1) * (1 / 0);
        O = O + Math.pow(2, U), B = B - K;
      }
      return (_e ? -1 : 1) * O * Math.pow(2, B - U);
    }, $.write = function(T, A, P, U, M, B) {
      var O, W, z, K = B * 8 - M - 1, N = (1 << K) - 1, Q = N >> 1, ce = M === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, _e = U ? 0 : B - 1, ne = U ? 1 : -1, Y = A < 0 || A === 0 && 1 / A < 0 ? 1 : 0;
      for (A = Math.abs(A), isNaN(A) || A === 1 / 0 ? (W = isNaN(A) ? 1 : 0, O = N) : (O = Math.floor(Math.log(A) / Math.LN2), A * (z = Math.pow(2, -O)) < 1 && (O--, z *= 2), O + Q >= 1 ? A += ce / z : A += ce * Math.pow(2, 1 - Q), A * z >= 2 && (O++, z /= 2), O + Q >= N ? (W = 0, O = N) : O + Q >= 1 ? (W = (A * z - 1) * Math.pow(2, M), O = O + Q) : (W = A * Math.pow(2, Q - 1) * Math.pow(2, M), O = 0)); M >= 8; T[P + _e] = W & 255, _e += ne, W /= 256, M -= 8)
        ;
      for (O = O << M | W, K += M; K > 0; T[P + _e] = O & 255, _e += ne, O /= 256, K -= 8)
        ;
      T[P + _e - ne] |= Y * 128;
    };
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */
    (function(T) {
      const A = r, P = $, U = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
      T.Buffer = N, T.SlowBuffer = Be, T.INSPECT_MAX_BYTES = 50;
      const M = 2147483647;
      T.kMaxLength = M;
      const { Uint8Array: B, ArrayBuffer: O, SharedArrayBuffer: W } = globalThis;
      N.TYPED_ARRAY_SUPPORT = z(), !N.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
      function z() {
        try {
          const _ = new B(1), w = { foo: function() {
            return 42;
          } };
          return Object.setPrototypeOf(w, B.prototype), Object.setPrototypeOf(_, w), _.foo() === 42;
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
      function K(_) {
        if (_ > M)
          throw new RangeError('The value "' + _ + '" is invalid for option "size"');
        const w = new B(_);
        return Object.setPrototypeOf(w, N.prototype), w;
      }
      function N(_, w, g) {
        if (typeof _ == "number") {
          if (typeof w == "string")
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          return ne(_);
        }
        return Q(_, w, g);
      }
      N.poolSize = 8192;
      function Q(_, w, g) {
        if (typeof _ == "string")
          return Y(_, w);
        if (O.isView(_))
          return we(_);
        if (_ == null)
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof _
          );
        if (S(_, O) || _ && S(_.buffer, O) || typeof W < "u" && (S(_, W) || _ && S(_.buffer, W)))
          return Se(_, w, g);
        if (typeof _ == "number")
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        const D = _.valueOf && _.valueOf();
        if (D != null && D !== _)
          return N.from(D, w, g);
        const L = $e(_);
        if (L) return L;
        if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof _[Symbol.toPrimitive] == "function")
          return N.from(_[Symbol.toPrimitive]("string"), w, g);
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof _
        );
      }
      N.from = function(_, w, g) {
        return Q(_, w, g);
      }, Object.setPrototypeOf(N.prototype, B.prototype), Object.setPrototypeOf(N, B);
      function ce(_) {
        if (typeof _ != "number")
          throw new TypeError('"size" argument must be of type number');
        if (_ < 0)
          throw new RangeError('The value "' + _ + '" is invalid for option "size"');
      }
      function _e(_, w, g) {
        return ce(_), _ <= 0 ? K(_) : w !== void 0 ? typeof g == "string" ? K(_).fill(w, g) : K(_).fill(w) : K(_);
      }
      N.alloc = function(_, w, g) {
        return _e(_, w, g);
      };
      function ne(_) {
        return ce(_), K(_ < 0 ? 0 : be(_) | 0);
      }
      N.allocUnsafe = function(_) {
        return ne(_);
      }, N.allocUnsafeSlow = function(_) {
        return ne(_);
      };
      function Y(_, w) {
        if ((typeof w != "string" || w === "") && (w = "utf8"), !N.isEncoding(w))
          throw new TypeError("Unknown encoding: " + w);
        const g = ye(_, w) | 0;
        let D = K(g);
        const L = D.write(_, w);
        return L !== g && (D = D.slice(0, L)), D;
      }
      function ae(_) {
        const w = _.length < 0 ? 0 : be(_.length) | 0, g = K(w);
        for (let D = 0; D < w; D += 1)
          g[D] = _[D] & 255;
        return g;
      }
      function we(_) {
        if (S(_, B)) {
          const w = new B(_);
          return Se(w.buffer, w.byteOffset, w.byteLength);
        }
        return ae(_);
      }
      function Se(_, w, g) {
        if (w < 0 || _.byteLength < w)
          throw new RangeError('"offset" is outside of buffer bounds');
        if (_.byteLength < w + (g || 0))
          throw new RangeError('"length" is outside of buffer bounds');
        let D;
        return w === void 0 && g === void 0 ? D = new B(_) : g === void 0 ? D = new B(_, w) : D = new B(_, w, g), Object.setPrototypeOf(D, N.prototype), D;
      }
      function $e(_) {
        if (N.isBuffer(_)) {
          const w = be(_.length) | 0, g = K(w);
          return g.length === 0 || _.copy(g, 0, 0, w), g;
        }
        if (_.length !== void 0)
          return typeof _.length != "number" || j(_.length) ? K(0) : ae(_);
        if (_.type === "Buffer" && Array.isArray(_.data))
          return ae(_.data);
      }
      function be(_) {
        if (_ >= M)
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + M.toString(16) + " bytes");
        return _ | 0;
      }
      function Be(_) {
        return +_ != _ && (_ = 0), N.alloc(+_);
      }
      N.isBuffer = function(w) {
        return w != null && w._isBuffer === !0 && w !== N.prototype;
      }, N.compare = function(w, g) {
        if (S(w, B) && (w = N.from(w, w.offset, w.byteLength)), S(g, B) && (g = N.from(g, g.offset, g.byteLength)), !N.isBuffer(w) || !N.isBuffer(g))
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        if (w === g) return 0;
        let D = w.length, L = g.length;
        for (let G = 0, J = Math.min(D, L); G < J; ++G)
          if (w[G] !== g[G]) {
            D = w[G], L = g[G];
            break;
          }
        return D < L ? -1 : L < D ? 1 : 0;
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
      }, N.concat = function(w, g) {
        if (!Array.isArray(w))
          throw new TypeError('"list" argument must be an Array of Buffers');
        if (w.length === 0)
          return N.alloc(0);
        let D;
        if (g === void 0)
          for (g = 0, D = 0; D < w.length; ++D)
            g += w[D].length;
        const L = N.allocUnsafe(g);
        let G = 0;
        for (D = 0; D < w.length; ++D) {
          let J = w[D];
          if (S(J, B))
            G + J.length > L.length ? (N.isBuffer(J) || (J = N.from(J)), J.copy(L, G)) : B.prototype.set.call(
              L,
              J,
              G
            );
          else if (N.isBuffer(J))
            J.copy(L, G);
          else
            throw new TypeError('"list" argument must be an Array of Buffers');
          G += J.length;
        }
        return L;
      };
      function ye(_, w) {
        if (N.isBuffer(_))
          return _.length;
        if (O.isView(_) || S(_, O))
          return _.byteLength;
        if (typeof _ != "string")
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof _
          );
        const g = _.length, D = arguments.length > 2 && arguments[2] === !0;
        if (!D && g === 0) return 0;
        let L = !1;
        for (; ; )
          switch (w) {
            case "ascii":
            case "latin1":
            case "binary":
              return g;
            case "utf8":
            case "utf-8":
              return ee(_).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return g * 2;
            case "hex":
              return g >>> 1;
            case "base64":
              return q(_).length;
            default:
              if (L)
                return D ? -1 : ee(_).length;
              w = ("" + w).toLowerCase(), L = !0;
          }
      }
      N.byteLength = ye;
      function Re(_, w, g) {
        let D = !1;
        if ((w === void 0 || w < 0) && (w = 0), w > this.length || ((g === void 0 || g > this.length) && (g = this.length), g <= 0) || (g >>>= 0, w >>>= 0, g <= w))
          return "";
        for (_ || (_ = "utf8"); ; )
          switch (_) {
            case "hex":
              return xt(this, w, g);
            case "utf8":
            case "utf-8":
              return Me(this, w, g);
            case "ascii":
              return xe(this, w, g);
            case "latin1":
            case "binary":
              return ut(this, w, g);
            case "base64":
              return Ze(this, w, g);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return It(this, w, g);
            default:
              if (D) throw new TypeError("Unknown encoding: " + _);
              _ = (_ + "").toLowerCase(), D = !0;
          }
      }
      N.prototype._isBuffer = !0;
      function ke(_, w, g) {
        const D = _[w];
        _[w] = _[g], _[g] = D;
      }
      N.prototype.swap16 = function() {
        const w = this.length;
        if (w % 2 !== 0)
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (let g = 0; g < w; g += 2)
          ke(this, g, g + 1);
        return this;
      }, N.prototype.swap32 = function() {
        const w = this.length;
        if (w % 4 !== 0)
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (let g = 0; g < w; g += 4)
          ke(this, g, g + 3), ke(this, g + 1, g + 2);
        return this;
      }, N.prototype.swap64 = function() {
        const w = this.length;
        if (w % 8 !== 0)
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (let g = 0; g < w; g += 8)
          ke(this, g, g + 7), ke(this, g + 1, g + 6), ke(this, g + 2, g + 5), ke(this, g + 3, g + 4);
        return this;
      }, N.prototype.toString = function() {
        const w = this.length;
        return w === 0 ? "" : arguments.length === 0 ? Me(this, 0, w) : Re.apply(this, arguments);
      }, N.prototype.toLocaleString = N.prototype.toString, N.prototype.equals = function(w) {
        if (!N.isBuffer(w)) throw new TypeError("Argument must be a Buffer");
        return this === w ? !0 : N.compare(this, w) === 0;
      }, N.prototype.inspect = function() {
        let w = "";
        const g = T.INSPECT_MAX_BYTES;
        return w = this.toString("hex", 0, g).replace(/(.{2})/g, "$1 ").trim(), this.length > g && (w += " ... "), "<Buffer " + w + ">";
      }, U && (N.prototype[U] = N.prototype.inspect), N.prototype.compare = function(w, g, D, L, G) {
        if (S(w, B) && (w = N.from(w, w.offset, w.byteLength)), !N.isBuffer(w))
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof w
          );
        if (g === void 0 && (g = 0), D === void 0 && (D = w ? w.length : 0), L === void 0 && (L = 0), G === void 0 && (G = this.length), g < 0 || D > w.length || L < 0 || G > this.length)
          throw new RangeError("out of range index");
        if (L >= G && g >= D)
          return 0;
        if (L >= G)
          return -1;
        if (g >= D)
          return 1;
        if (g >>>= 0, D >>>= 0, L >>>= 0, G >>>= 0, this === w) return 0;
        let J = G - L, ve = D - g;
        const He = Math.min(J, ve), Ue = this.slice(L, G), Ie = w.slice(g, D);
        for (let De = 0; De < He; ++De)
          if (Ue[De] !== Ie[De]) {
            J = Ue[De], ve = Ie[De];
            break;
          }
        return J < ve ? -1 : ve < J ? 1 : 0;
      };
      function Ee(_, w, g, D, L) {
        if (_.length === 0) return -1;
        if (typeof g == "string" ? (D = g, g = 0) : g > 2147483647 ? g = 2147483647 : g < -2147483648 && (g = -2147483648), g = +g, j(g) && (g = L ? 0 : _.length - 1), g < 0 && (g = _.length + g), g >= _.length) {
          if (L) return -1;
          g = _.length - 1;
        } else if (g < 0)
          if (L) g = 0;
          else return -1;
        if (typeof w == "string" && (w = N.from(w, D)), N.isBuffer(w))
          return w.length === 0 ? -1 : Ae(_, w, g, D, L);
        if (typeof w == "number")
          return w = w & 255, typeof B.prototype.indexOf == "function" ? L ? B.prototype.indexOf.call(_, w, g) : B.prototype.lastIndexOf.call(_, w, g) : Ae(_, [w], g, D, L);
        throw new TypeError("val must be string, number or Buffer");
      }
      function Ae(_, w, g, D, L) {
        let G = 1, J = _.length, ve = w.length;
        if (D !== void 0 && (D = String(D).toLowerCase(), D === "ucs2" || D === "ucs-2" || D === "utf16le" || D === "utf-16le")) {
          if (_.length < 2 || w.length < 2)
            return -1;
          G = 2, J /= 2, ve /= 2, g /= 2;
        }
        function He(Ie, De) {
          return G === 1 ? Ie[De] : Ie.readUInt16BE(De * G);
        }
        let Ue;
        if (L) {
          let Ie = -1;
          for (Ue = g; Ue < J; Ue++)
            if (He(_, Ue) === He(w, Ie === -1 ? 0 : Ue - Ie)) {
              if (Ie === -1 && (Ie = Ue), Ue - Ie + 1 === ve) return Ie * G;
            } else
              Ie !== -1 && (Ue -= Ue - Ie), Ie = -1;
        } else
          for (g + ve > J && (g = J - ve), Ue = g; Ue >= 0; Ue--) {
            let Ie = !0;
            for (let De = 0; De < ve; De++)
              if (He(_, Ue + De) !== He(w, De)) {
                Ie = !1;
                break;
              }
            if (Ie) return Ue;
          }
        return -1;
      }
      N.prototype.includes = function(w, g, D) {
        return this.indexOf(w, g, D) !== -1;
      }, N.prototype.indexOf = function(w, g, D) {
        return Ee(this, w, g, D, !0);
      }, N.prototype.lastIndexOf = function(w, g, D) {
        return Ee(this, w, g, D, !1);
      };
      function qe(_, w, g, D) {
        g = Number(g) || 0;
        const L = _.length - g;
        D ? (D = Number(D), D > L && (D = L)) : D = L;
        const G = w.length;
        D > G / 2 && (D = G / 2);
        let J;
        for (J = 0; J < D; ++J) {
          const ve = parseInt(w.substr(J * 2, 2), 16);
          if (j(ve)) return J;
          _[g + J] = ve;
        }
        return J;
      }
      function rt(_, w, g, D) {
        return X(ee(w, _.length - g), _, g, D);
      }
      function je(_, w, g, D) {
        return X(le(w), _, g, D);
      }
      function pe(_, w, g, D) {
        return X(q(w), _, g, D);
      }
      function Oe(_, w, g, D) {
        return X(h(w, _.length - g), _, g, D);
      }
      N.prototype.write = function(w, g, D, L) {
        if (g === void 0)
          L = "utf8", D = this.length, g = 0;
        else if (D === void 0 && typeof g == "string")
          L = g, D = this.length, g = 0;
        else if (isFinite(g))
          g = g >>> 0, isFinite(D) ? (D = D >>> 0, L === void 0 && (L = "utf8")) : (L = D, D = void 0);
        else
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        const G = this.length - g;
        if ((D === void 0 || D > G) && (D = G), w.length > 0 && (D < 0 || g < 0) || g > this.length)
          throw new RangeError("Attempt to write outside buffer bounds");
        L || (L = "utf8");
        let J = !1;
        for (; ; )
          switch (L) {
            case "hex":
              return qe(this, w, g, D);
            case "utf8":
            case "utf-8":
              return rt(this, w, g, D);
            case "ascii":
            case "latin1":
            case "binary":
              return je(this, w, g, D);
            case "base64":
              return pe(this, w, g, D);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return Oe(this, w, g, D);
            default:
              if (J) throw new TypeError("Unknown encoding: " + L);
              L = ("" + L).toLowerCase(), J = !0;
          }
      }, N.prototype.toJSON = function() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function Ze(_, w, g) {
        return w === 0 && g === _.length ? A.fromByteArray(_) : A.fromByteArray(_.slice(w, g));
      }
      function Me(_, w, g) {
        g = Math.min(_.length, g);
        const D = [];
        let L = w;
        for (; L < g; ) {
          const G = _[L];
          let J = null, ve = G > 239 ? 4 : G > 223 ? 3 : G > 191 ? 2 : 1;
          if (L + ve <= g) {
            let He, Ue, Ie, De;
            switch (ve) {
              case 1:
                G < 128 && (J = G);
                break;
              case 2:
                He = _[L + 1], (He & 192) === 128 && (De = (G & 31) << 6 | He & 63, De > 127 && (J = De));
                break;
              case 3:
                He = _[L + 1], Ue = _[L + 2], (He & 192) === 128 && (Ue & 192) === 128 && (De = (G & 15) << 12 | (He & 63) << 6 | Ue & 63, De > 2047 && (De < 55296 || De > 57343) && (J = De));
                break;
              case 4:
                He = _[L + 1], Ue = _[L + 2], Ie = _[L + 3], (He & 192) === 128 && (Ue & 192) === 128 && (Ie & 192) === 128 && (De = (G & 15) << 18 | (He & 63) << 12 | (Ue & 63) << 6 | Ie & 63, De > 65535 && De < 1114112 && (J = De));
            }
          }
          J === null ? (J = 65533, ve = 1) : J > 65535 && (J -= 65536, D.push(J >>> 10 & 1023 | 55296), J = 56320 | J & 1023), D.push(J), L += ve;
        }
        return Ce(D);
      }
      const ze = 4096;
      function Ce(_) {
        const w = _.length;
        if (w <= ze)
          return String.fromCharCode.apply(String, _);
        let g = "", D = 0;
        for (; D < w; )
          g += String.fromCharCode.apply(
            String,
            _.slice(D, D += ze)
          );
        return g;
      }
      function xe(_, w, g) {
        let D = "";
        g = Math.min(_.length, g);
        for (let L = w; L < g; ++L)
          D += String.fromCharCode(_[L] & 127);
        return D;
      }
      function ut(_, w, g) {
        let D = "";
        g = Math.min(_.length, g);
        for (let L = w; L < g; ++L)
          D += String.fromCharCode(_[L]);
        return D;
      }
      function xt(_, w, g) {
        const D = _.length;
        (!w || w < 0) && (w = 0), (!g || g < 0 || g > D) && (g = D);
        let L = "";
        for (let G = w; G < g; ++G)
          L += V[_[G]];
        return L;
      }
      function It(_, w, g) {
        const D = _.slice(w, g);
        let L = "";
        for (let G = 0; G < D.length - 1; G += 2)
          L += String.fromCharCode(D[G] + D[G + 1] * 256);
        return L;
      }
      N.prototype.slice = function(w, g) {
        const D = this.length;
        w = ~~w, g = g === void 0 ? D : ~~g, w < 0 ? (w += D, w < 0 && (w = 0)) : w > D && (w = D), g < 0 ? (g += D, g < 0 && (g = 0)) : g > D && (g = D), g < w && (g = w);
        const L = this.subarray(w, g);
        return Object.setPrototypeOf(L, N.prototype), L;
      };
      function Fe(_, w, g) {
        if (_ % 1 !== 0 || _ < 0) throw new RangeError("offset is not uint");
        if (_ + w > g) throw new RangeError("Trying to access beyond buffer length");
      }
      N.prototype.readUintLE = N.prototype.readUIntLE = function(w, g, D) {
        w = w >>> 0, g = g >>> 0, D || Fe(w, g, this.length);
        let L = this[w], G = 1, J = 0;
        for (; ++J < g && (G *= 256); )
          L += this[w + J] * G;
        return L;
      }, N.prototype.readUintBE = N.prototype.readUIntBE = function(w, g, D) {
        w = w >>> 0, g = g >>> 0, D || Fe(w, g, this.length);
        let L = this[w + --g], G = 1;
        for (; g > 0 && (G *= 256); )
          L += this[w + --g] * G;
        return L;
      }, N.prototype.readUint8 = N.prototype.readUInt8 = function(w, g) {
        return w = w >>> 0, g || Fe(w, 1, this.length), this[w];
      }, N.prototype.readUint16LE = N.prototype.readUInt16LE = function(w, g) {
        return w = w >>> 0, g || Fe(w, 2, this.length), this[w] | this[w + 1] << 8;
      }, N.prototype.readUint16BE = N.prototype.readUInt16BE = function(w, g) {
        return w = w >>> 0, g || Fe(w, 2, this.length), this[w] << 8 | this[w + 1];
      }, N.prototype.readUint32LE = N.prototype.readUInt32LE = function(w, g) {
        return w = w >>> 0, g || Fe(w, 4, this.length), (this[w] | this[w + 1] << 8 | this[w + 2] << 16) + this[w + 3] * 16777216;
      }, N.prototype.readUint32BE = N.prototype.readUInt32BE = function(w, g) {
        return w = w >>> 0, g || Fe(w, 4, this.length), this[w] * 16777216 + (this[w + 1] << 16 | this[w + 2] << 8 | this[w + 3]);
      }, N.prototype.readBigUInt64LE = he(function(w) {
        w = w >>> 0, C(w, "offset");
        const g = this[w], D = this[w + 7];
        (g === void 0 || D === void 0) && x(w, this.length - 8);
        const L = g + this[++w] * 2 ** 8 + this[++w] * 2 ** 16 + this[++w] * 2 ** 24, G = this[++w] + this[++w] * 2 ** 8 + this[++w] * 2 ** 16 + D * 2 ** 24;
        return BigInt(L) + (BigInt(G) << BigInt(32));
      }), N.prototype.readBigUInt64BE = he(function(w) {
        w = w >>> 0, C(w, "offset");
        const g = this[w], D = this[w + 7];
        (g === void 0 || D === void 0) && x(w, this.length - 8);
        const L = g * 2 ** 24 + this[++w] * 2 ** 16 + this[++w] * 2 ** 8 + this[++w], G = this[++w] * 2 ** 24 + this[++w] * 2 ** 16 + this[++w] * 2 ** 8 + D;
        return (BigInt(L) << BigInt(32)) + BigInt(G);
      }), N.prototype.readIntLE = function(w, g, D) {
        w = w >>> 0, g = g >>> 0, D || Fe(w, g, this.length);
        let L = this[w], G = 1, J = 0;
        for (; ++J < g && (G *= 256); )
          L += this[w + J] * G;
        return G *= 128, L >= G && (L -= Math.pow(2, 8 * g)), L;
      }, N.prototype.readIntBE = function(w, g, D) {
        w = w >>> 0, g = g >>> 0, D || Fe(w, g, this.length);
        let L = g, G = 1, J = this[w + --L];
        for (; L > 0 && (G *= 256); )
          J += this[w + --L] * G;
        return G *= 128, J >= G && (J -= Math.pow(2, 8 * g)), J;
      }, N.prototype.readInt8 = function(w, g) {
        return w = w >>> 0, g || Fe(w, 1, this.length), this[w] & 128 ? (255 - this[w] + 1) * -1 : this[w];
      }, N.prototype.readInt16LE = function(w, g) {
        w = w >>> 0, g || Fe(w, 2, this.length);
        const D = this[w] | this[w + 1] << 8;
        return D & 32768 ? D | 4294901760 : D;
      }, N.prototype.readInt16BE = function(w, g) {
        w = w >>> 0, g || Fe(w, 2, this.length);
        const D = this[w + 1] | this[w] << 8;
        return D & 32768 ? D | 4294901760 : D;
      }, N.prototype.readInt32LE = function(w, g) {
        return w = w >>> 0, g || Fe(w, 4, this.length), this[w] | this[w + 1] << 8 | this[w + 2] << 16 | this[w + 3] << 24;
      }, N.prototype.readInt32BE = function(w, g) {
        return w = w >>> 0, g || Fe(w, 4, this.length), this[w] << 24 | this[w + 1] << 16 | this[w + 2] << 8 | this[w + 3];
      }, N.prototype.readBigInt64LE = he(function(w) {
        w = w >>> 0, C(w, "offset");
        const g = this[w], D = this[w + 7];
        (g === void 0 || D === void 0) && x(w, this.length - 8);
        const L = this[w + 4] + this[w + 5] * 2 ** 8 + this[w + 6] * 2 ** 16 + (D << 24);
        return (BigInt(L) << BigInt(32)) + BigInt(g + this[++w] * 2 ** 8 + this[++w] * 2 ** 16 + this[++w] * 2 ** 24);
      }), N.prototype.readBigInt64BE = he(function(w) {
        w = w >>> 0, C(w, "offset");
        const g = this[w], D = this[w + 7];
        (g === void 0 || D === void 0) && x(w, this.length - 8);
        const L = (g << 24) + // Overflow
        this[++w] * 2 ** 16 + this[++w] * 2 ** 8 + this[++w];
        return (BigInt(L) << BigInt(32)) + BigInt(this[++w] * 2 ** 24 + this[++w] * 2 ** 16 + this[++w] * 2 ** 8 + D);
      }), N.prototype.readFloatLE = function(w, g) {
        return w = w >>> 0, g || Fe(w, 4, this.length), P.read(this, w, !0, 23, 4);
      }, N.prototype.readFloatBE = function(w, g) {
        return w = w >>> 0, g || Fe(w, 4, this.length), P.read(this, w, !1, 23, 4);
      }, N.prototype.readDoubleLE = function(w, g) {
        return w = w >>> 0, g || Fe(w, 8, this.length), P.read(this, w, !0, 52, 8);
      }, N.prototype.readDoubleBE = function(w, g) {
        return w = w >>> 0, g || Fe(w, 8, this.length), P.read(this, w, !1, 52, 8);
      };
      function Ve(_, w, g, D, L, G) {
        if (!N.isBuffer(_)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (w > L || w < G) throw new RangeError('"value" argument is out of bounds');
        if (g + D > _.length) throw new RangeError("Index out of range");
      }
      N.prototype.writeUintLE = N.prototype.writeUIntLE = function(w, g, D, L) {
        if (w = +w, g = g >>> 0, D = D >>> 0, !L) {
          const ve = Math.pow(2, 8 * D) - 1;
          Ve(this, w, g, D, ve, 0);
        }
        let G = 1, J = 0;
        for (this[g] = w & 255; ++J < D && (G *= 256); )
          this[g + J] = w / G & 255;
        return g + D;
      }, N.prototype.writeUintBE = N.prototype.writeUIntBE = function(w, g, D, L) {
        if (w = +w, g = g >>> 0, D = D >>> 0, !L) {
          const ve = Math.pow(2, 8 * D) - 1;
          Ve(this, w, g, D, ve, 0);
        }
        let G = D - 1, J = 1;
        for (this[g + G] = w & 255; --G >= 0 && (J *= 256); )
          this[g + G] = w / J & 255;
        return g + D;
      }, N.prototype.writeUint8 = N.prototype.writeUInt8 = function(w, g, D) {
        return w = +w, g = g >>> 0, D || Ve(this, w, g, 1, 255, 0), this[g] = w & 255, g + 1;
      }, N.prototype.writeUint16LE = N.prototype.writeUInt16LE = function(w, g, D) {
        return w = +w, g = g >>> 0, D || Ve(this, w, g, 2, 65535, 0), this[g] = w & 255, this[g + 1] = w >>> 8, g + 2;
      }, N.prototype.writeUint16BE = N.prototype.writeUInt16BE = function(w, g, D) {
        return w = +w, g = g >>> 0, D || Ve(this, w, g, 2, 65535, 0), this[g] = w >>> 8, this[g + 1] = w & 255, g + 2;
      }, N.prototype.writeUint32LE = N.prototype.writeUInt32LE = function(w, g, D) {
        return w = +w, g = g >>> 0, D || Ve(this, w, g, 4, 4294967295, 0), this[g + 3] = w >>> 24, this[g + 2] = w >>> 16, this[g + 1] = w >>> 8, this[g] = w & 255, g + 4;
      }, N.prototype.writeUint32BE = N.prototype.writeUInt32BE = function(w, g, D) {
        return w = +w, g = g >>> 0, D || Ve(this, w, g, 4, 4294967295, 0), this[g] = w >>> 24, this[g + 1] = w >>> 16, this[g + 2] = w >>> 8, this[g + 3] = w & 255, g + 4;
      };
      function ft(_, w, g, D, L) {
        v(w, D, L, _, g, 7);
        let G = Number(w & BigInt(4294967295));
        _[g++] = G, G = G >> 8, _[g++] = G, G = G >> 8, _[g++] = G, G = G >> 8, _[g++] = G;
        let J = Number(w >> BigInt(32) & BigInt(4294967295));
        return _[g++] = J, J = J >> 8, _[g++] = J, J = J >> 8, _[g++] = J, J = J >> 8, _[g++] = J, g;
      }
      function Ge(_, w, g, D, L) {
        v(w, D, L, _, g, 7);
        let G = Number(w & BigInt(4294967295));
        _[g + 7] = G, G = G >> 8, _[g + 6] = G, G = G >> 8, _[g + 5] = G, G = G >> 8, _[g + 4] = G;
        let J = Number(w >> BigInt(32) & BigInt(4294967295));
        return _[g + 3] = J, J = J >> 8, _[g + 2] = J, J = J >> 8, _[g + 1] = J, J = J >> 8, _[g] = J, g + 8;
      }
      N.prototype.writeBigUInt64LE = he(function(w, g = 0) {
        return ft(this, w, g, BigInt(0), BigInt("0xffffffffffffffff"));
      }), N.prototype.writeBigUInt64BE = he(function(w, g = 0) {
        return Ge(this, w, g, BigInt(0), BigInt("0xffffffffffffffff"));
      }), N.prototype.writeIntLE = function(w, g, D, L) {
        if (w = +w, g = g >>> 0, !L) {
          const He = Math.pow(2, 8 * D - 1);
          Ve(this, w, g, D, He - 1, -He);
        }
        let G = 0, J = 1, ve = 0;
        for (this[g] = w & 255; ++G < D && (J *= 256); )
          w < 0 && ve === 0 && this[g + G - 1] !== 0 && (ve = 1), this[g + G] = (w / J >> 0) - ve & 255;
        return g + D;
      }, N.prototype.writeIntBE = function(w, g, D, L) {
        if (w = +w, g = g >>> 0, !L) {
          const He = Math.pow(2, 8 * D - 1);
          Ve(this, w, g, D, He - 1, -He);
        }
        let G = D - 1, J = 1, ve = 0;
        for (this[g + G] = w & 255; --G >= 0 && (J *= 256); )
          w < 0 && ve === 0 && this[g + G + 1] !== 0 && (ve = 1), this[g + G] = (w / J >> 0) - ve & 255;
        return g + D;
      }, N.prototype.writeInt8 = function(w, g, D) {
        return w = +w, g = g >>> 0, D || Ve(this, w, g, 1, 127, -128), w < 0 && (w = 255 + w + 1), this[g] = w & 255, g + 1;
      }, N.prototype.writeInt16LE = function(w, g, D) {
        return w = +w, g = g >>> 0, D || Ve(this, w, g, 2, 32767, -32768), this[g] = w & 255, this[g + 1] = w >>> 8, g + 2;
      }, N.prototype.writeInt16BE = function(w, g, D) {
        return w = +w, g = g >>> 0, D || Ve(this, w, g, 2, 32767, -32768), this[g] = w >>> 8, this[g + 1] = w & 255, g + 2;
      }, N.prototype.writeInt32LE = function(w, g, D) {
        return w = +w, g = g >>> 0, D || Ve(this, w, g, 4, 2147483647, -2147483648), this[g] = w & 255, this[g + 1] = w >>> 8, this[g + 2] = w >>> 16, this[g + 3] = w >>> 24, g + 4;
      }, N.prototype.writeInt32BE = function(w, g, D) {
        return w = +w, g = g >>> 0, D || Ve(this, w, g, 4, 2147483647, -2147483648), w < 0 && (w = 4294967295 + w + 1), this[g] = w >>> 24, this[g + 1] = w >>> 16, this[g + 2] = w >>> 8, this[g + 3] = w & 255, g + 4;
      }, N.prototype.writeBigInt64LE = he(function(w, g = 0) {
        return ft(this, w, g, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      }), N.prototype.writeBigInt64BE = he(function(w, g = 0) {
        return Ge(this, w, g, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function vt(_, w, g, D, L, G) {
        if (g + D > _.length) throw new RangeError("Index out of range");
        if (g < 0) throw new RangeError("Index out of range");
      }
      function Et(_, w, g, D, L) {
        return w = +w, g = g >>> 0, L || vt(_, w, g, 4), P.write(_, w, g, D, 23, 4), g + 4;
      }
      N.prototype.writeFloatLE = function(w, g, D) {
        return Et(this, w, g, !0, D);
      }, N.prototype.writeFloatBE = function(w, g, D) {
        return Et(this, w, g, !1, D);
      };
      function Le(_, w, g, D, L) {
        return w = +w, g = g >>> 0, L || vt(_, w, g, 8), P.write(_, w, g, D, 52, 8), g + 8;
      }
      N.prototype.writeDoubleLE = function(w, g, D) {
        return Le(this, w, g, !0, D);
      }, N.prototype.writeDoubleBE = function(w, g, D) {
        return Le(this, w, g, !1, D);
      }, N.prototype.copy = function(w, g, D, L) {
        if (!N.isBuffer(w)) throw new TypeError("argument should be a Buffer");
        if (D || (D = 0), !L && L !== 0 && (L = this.length), g >= w.length && (g = w.length), g || (g = 0), L > 0 && L < D && (L = D), L === D || w.length === 0 || this.length === 0) return 0;
        if (g < 0)
          throw new RangeError("targetStart out of bounds");
        if (D < 0 || D >= this.length) throw new RangeError("Index out of range");
        if (L < 0) throw new RangeError("sourceEnd out of bounds");
        L > this.length && (L = this.length), w.length - g < L - D && (L = w.length - g + D);
        const G = L - D;
        return this === w && typeof B.prototype.copyWithin == "function" ? this.copyWithin(g, D, L) : B.prototype.set.call(
          w,
          this.subarray(D, L),
          g
        ), G;
      }, N.prototype.fill = function(w, g, D, L) {
        if (typeof w == "string") {
          if (typeof g == "string" ? (L = g, g = 0, D = this.length) : typeof D == "string" && (L = D, D = this.length), L !== void 0 && typeof L != "string")
            throw new TypeError("encoding must be a string");
          if (typeof L == "string" && !N.isEncoding(L))
            throw new TypeError("Unknown encoding: " + L);
          if (w.length === 1) {
            const J = w.charCodeAt(0);
            (L === "utf8" && J < 128 || L === "latin1") && (w = J);
          }
        } else typeof w == "number" ? w = w & 255 : typeof w == "boolean" && (w = Number(w));
        if (g < 0 || this.length < g || this.length < D)
          throw new RangeError("Out of range index");
        if (D <= g)
          return this;
        g = g >>> 0, D = D === void 0 ? this.length : D >>> 0, w || (w = 0);
        let G;
        if (typeof w == "number")
          for (G = g; G < D; ++G)
            this[G] = w;
        else {
          const J = N.isBuffer(w) ? w : N.from(w, L), ve = J.length;
          if (ve === 0)
            throw new TypeError('The value "' + w + '" is invalid for argument "value"');
          for (G = 0; G < D - g; ++G)
            this[G + g] = J[G % ve];
        }
        return this;
      };
      const nt = {};
      function k(_, w, g) {
        nt[_] = class extends g {
          constructor() {
            super(), Object.defineProperty(this, "message", {
              value: w.apply(this, arguments),
              writable: !0,
              configurable: !0
            }), this.name = `${this.name} [${_}]`, this.stack, delete this.name;
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
            return `${this.name} [${_}]: ${this.message}`;
          }
        };
      }
      k(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(_) {
          return _ ? `${_} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
        },
        RangeError
      ), k(
        "ERR_INVALID_ARG_TYPE",
        function(_, w) {
          return `The "${_}" argument must be of type number. Received type ${typeof w}`;
        },
        TypeError
      ), k(
        "ERR_OUT_OF_RANGE",
        function(_, w, g) {
          let D = `The value of "${_}" is out of range.`, L = g;
          return Number.isInteger(g) && Math.abs(g) > 2 ** 32 ? L = c(String(g)) : typeof g == "bigint" && (L = String(g), (g > BigInt(2) ** BigInt(32) || g < -(BigInt(2) ** BigInt(32))) && (L = c(L)), L += "n"), D += ` It must be ${w}. Received ${L}`, D;
        },
        RangeError
      );
      function c(_) {
        let w = "", g = _.length;
        const D = _[0] === "-" ? 1 : 0;
        for (; g >= D + 4; g -= 3)
          w = `_${_.slice(g - 3, g)}${w}`;
        return `${_.slice(0, g)}${w}`;
      }
      function d(_, w, g) {
        C(w, "offset"), (_[w] === void 0 || _[w + g] === void 0) && x(w, _.length - (g + 1));
      }
      function v(_, w, g, D, L, G) {
        if (_ > g || _ < w) {
          const J = typeof w == "bigint" ? "n" : "";
          let ve;
          throw w === 0 || w === BigInt(0) ? ve = `>= 0${J} and < 2${J} ** ${(G + 1) * 8}${J}` : ve = `>= -(2${J} ** ${(G + 1) * 8 - 1}${J}) and < 2 ** ${(G + 1) * 8 - 1}${J}`, new nt.ERR_OUT_OF_RANGE("value", ve, _);
        }
        d(D, L, G);
      }
      function C(_, w) {
        if (typeof _ != "number")
          throw new nt.ERR_INVALID_ARG_TYPE(w, "number", _);
      }
      function x(_, w, g) {
        throw Math.floor(_) !== _ ? (C(_, g), new nt.ERR_OUT_OF_RANGE("offset", "an integer", _)) : w < 0 ? new nt.ERR_BUFFER_OUT_OF_BOUNDS() : new nt.ERR_OUT_OF_RANGE(
          "offset",
          `>= 0 and <= ${w}`,
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
      function ee(_, w) {
        w = w || 1 / 0;
        let g;
        const D = _.length;
        let L = null;
        const G = [];
        for (let J = 0; J < D; ++J) {
          if (g = _.charCodeAt(J), g > 55295 && g < 57344) {
            if (!L) {
              if (g > 56319) {
                (w -= 3) > -1 && G.push(239, 191, 189);
                continue;
              } else if (J + 1 === D) {
                (w -= 3) > -1 && G.push(239, 191, 189);
                continue;
              }
              L = g;
              continue;
            }
            if (g < 56320) {
              (w -= 3) > -1 && G.push(239, 191, 189), L = g;
              continue;
            }
            g = (L - 55296 << 10 | g - 56320) + 65536;
          } else L && (w -= 3) > -1 && G.push(239, 191, 189);
          if (L = null, g < 128) {
            if ((w -= 1) < 0) break;
            G.push(g);
          } else if (g < 2048) {
            if ((w -= 2) < 0) break;
            G.push(
              g >> 6 | 192,
              g & 63 | 128
            );
          } else if (g < 65536) {
            if ((w -= 3) < 0) break;
            G.push(
              g >> 12 | 224,
              g >> 6 & 63 | 128,
              g & 63 | 128
            );
          } else if (g < 1114112) {
            if ((w -= 4) < 0) break;
            G.push(
              g >> 18 | 240,
              g >> 12 & 63 | 128,
              g >> 6 & 63 | 128,
              g & 63 | 128
            );
          } else
            throw new Error("Invalid code point");
        }
        return G;
      }
      function le(_) {
        const w = [];
        for (let g = 0; g < _.length; ++g)
          w.push(_.charCodeAt(g) & 255);
        return w;
      }
      function h(_, w) {
        let g, D, L;
        const G = [];
        for (let J = 0; J < _.length && !((w -= 2) < 0); ++J)
          g = _.charCodeAt(J), D = g >> 8, L = g % 256, G.push(L), G.push(D);
        return G;
      }
      function q(_) {
        return A.toByteArray(b(_));
      }
      function X(_, w, g, D) {
        let L;
        for (L = 0; L < D && !(L + g >= w.length || L >= _.length); ++L)
          w[L + g] = _[L];
        return L;
      }
      function S(_, w) {
        return _ instanceof w || _ != null && _.constructor != null && _.constructor.name != null && _.constructor.name === w.name;
      }
      function j(_) {
        return _ !== _;
      }
      const V = function() {
        const _ = "0123456789abcdef", w = new Array(256);
        for (let g = 0; g < 16; ++g) {
          const D = g * 16;
          for (let L = 0; L < 16; ++L)
            w[D + L] = _[g] + _[L];
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
  }(rn)), rn;
}
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var Aa;
function ns() {
  return Aa || (Aa = 1, function(t, e) {
    var r = cl(), i = r.Buffer;
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
  }(Ii, Ii.exports)), Ii.exports;
}
var nn, Oa;
function ll() {
  if (Oa) return nn;
  Oa = 1;
  var t = ns().Buffer;
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
  }, nn = e, nn;
}
var an, Ca;
function ul() {
  if (Ca) return an;
  Ca = 1;
  var t = sl(), e = ll(), r = ns().Buffer, i = [
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
  function f(u, m, p, y) {
    return u === 0 ? m & p | ~m & y : u === 2 ? m & p | m & y | p & y : m ^ p ^ y;
  }
  return a.prototype._update = function(u) {
    for (var m = this._w, p = this._a | 0, y = this._b | 0, E = this._c | 0, R = this._d | 0, $ = this._e | 0, I = 0; I < 16; ++I) m[I] = u.readInt32BE(I * 4);
    for (; I < 80; ++I) m[I] = o(m[I - 3] ^ m[I - 8] ^ m[I - 14] ^ m[I - 16]);
    for (var T = 0; T < 80; ++T) {
      var A = ~~(T / 20), P = s(p) + f(A, y, E, R) + $ + m[T] + i[A] | 0;
      $ = R, R = E, E = l(y), y = p, p = P;
    }
    this._a = p + this._a | 0, this._b = y + this._b | 0, this._c = E + this._c | 0, this._d = R + this._d | 0, this._e = $ + this._e | 0;
  }, a.prototype._hash = function() {
    var u = r.allocUnsafe(20);
    return u.writeInt32BE(this._a | 0, 0), u.writeInt32BE(this._b | 0, 4), u.writeInt32BE(this._c | 0, 8), u.writeInt32BE(this._d | 0, 12), u.writeInt32BE(this._e | 0, 16), u;
  }, an = a, an;
}
var fl = ul(), as = /* @__PURE__ */ rr(fl), on, Na;
function hl() {
  if (Na) return on;
  Na = 1;
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
              var p = o.lastIndexOf("/");
              if (p !== o.length - 1) {
                p === -1 ? (o = "", s = 0) : (o = o.slice(0, p), s = o.length - 1 - o.lastIndexOf("/")), l = m, f = 0;
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
      for (var m = o.length, p = m - u, y = f < p ? f : p, E = -1, R = 0; R <= y; ++R) {
        if (R === y) {
          if (p > y) {
            if (o.charCodeAt(u + R) === 47)
              return o.slice(u + R + 1);
            if (R === 0)
              return o.slice(u + R);
          } else f > y && (a.charCodeAt(s + R) === 47 ? E = R : R === 0 && (E = 0));
          break;
        }
        var $ = a.charCodeAt(s + R), I = o.charCodeAt(u + R);
        if ($ !== I)
          break;
        $ === 47 && (E = R);
      }
      var T = "";
      for (R = s + E + 1; R <= l; ++R)
        (R === l || a.charCodeAt(R) === 47) && (T.length === 0 ? T += ".." : T += "/..");
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
        var m = o.length - 1, p = -1;
        for (u = a.length - 1; u >= 0; --u) {
          var y = a.charCodeAt(u);
          if (y === 47) {
            if (!f) {
              s = u + 1;
              break;
            }
          } else
            p === -1 && (f = !1, p = u + 1), m >= 0 && (y === o.charCodeAt(m) ? --m === -1 && (l = u) : (m = -1, l = p));
        }
        return s === l ? l = p : l === -1 && (l = a.length), a.slice(s, l);
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
        var p = a.charCodeAt(m);
        if (p === 47) {
          if (!f) {
            s = m + 1;
            break;
          }
          continue;
        }
        l === -1 && (f = !1, l = m + 1), p === 46 ? o === -1 ? o = m : u !== 1 && (u = 1) : o !== -1 && (u = -1);
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
      for (var u = -1, m = 0, p = -1, y = !0, E = a.length - 1, R = 0; E >= f; --E) {
        if (s = a.charCodeAt(E), s === 47) {
          if (!y) {
            m = E + 1;
            break;
          }
          continue;
        }
        p === -1 && (y = !1, p = E + 1), s === 46 ? u === -1 ? u = E : R !== 1 && (R = 1) : u !== -1 && (R = -1);
      }
      return u === -1 || p === -1 || // We saw a non-dot character immediately before the dot
      R === 0 || // The (right-most) trimmed path component is exactly '..'
      R === 1 && u === p - 1 && u === m + 1 ? p !== -1 && (m === 0 && l ? o.base = o.name = a.slice(1, p) : o.base = o.name = a.slice(m, p)) : (m === 0 && l ? (o.name = a.slice(1, u), o.base = a.slice(1, p)) : (o.name = a.slice(m, u), o.base = a.slice(m, p)), o.ext = a.slice(u, p)), m > 0 ? o.dir = a.slice(0, m - 1) : l && (o.dir = "/"), o;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
  };
  return i.posix = i, on = i, on;
}
var re = hl(), sn = {};
/*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */
var Fa;
function dl() {
  return Fa || (Fa = 1, function(t) {
    (function(e) {
      e(typeof DO_NOT_EXPORT_CRC > "u" ? t : {});
    })(function(e) {
      e.version = "1.2.2";
      function r() {
        for (var O = 0, W = new Array(256), z = 0; z != 256; ++z)
          O = z, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, O = O & 1 ? -306674912 ^ O >>> 1 : O >>> 1, W[z] = O;
        return typeof Int32Array < "u" ? new Int32Array(W) : W;
      }
      var i = r();
      function n(O) {
        var W = 0, z = 0, K = 0, N = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
        for (K = 0; K != 256; ++K) N[K] = O[K];
        for (K = 0; K != 256; ++K)
          for (z = O[K], W = 256 + K; W < 4096; W += 256) z = N[W] = z >>> 8 ^ O[z & 255];
        var Q = [];
        for (K = 1; K != 16; ++K) Q[K - 1] = typeof Int32Array < "u" ? N.subarray(K * 256, K * 256 + 256) : N.slice(K * 256, K * 256 + 256);
        return Q;
      }
      var a = n(i), o = a[0], s = a[1], l = a[2], f = a[3], u = a[4], m = a[5], p = a[6], y = a[7], E = a[8], R = a[9], $ = a[10], I = a[11], T = a[12], A = a[13], P = a[14];
      function U(O, W) {
        for (var z = W ^ -1, K = 0, N = O.length; K < N; ) z = z >>> 8 ^ i[(z ^ O.charCodeAt(K++)) & 255];
        return ~z;
      }
      function M(O, W) {
        for (var z = W ^ -1, K = O.length - 15, N = 0; N < K; ) z = P[O[N++] ^ z & 255] ^ A[O[N++] ^ z >> 8 & 255] ^ T[O[N++] ^ z >> 16 & 255] ^ I[O[N++] ^ z >>> 24] ^ $[O[N++]] ^ R[O[N++]] ^ E[O[N++]] ^ y[O[N++]] ^ p[O[N++]] ^ m[O[N++]] ^ u[O[N++]] ^ f[O[N++]] ^ l[O[N++]] ^ s[O[N++]] ^ o[O[N++]] ^ i[O[N++]];
        for (K += 15; N < K; ) z = z >>> 8 ^ i[(z ^ O[N++]) & 255];
        return ~z;
      }
      function B(O, W) {
        for (var z = W ^ -1, K = 0, N = O.length, Q = 0, ce = 0; K < N; )
          Q = O.charCodeAt(K++), Q < 128 ? z = z >>> 8 ^ i[(z ^ Q) & 255] : Q < 2048 ? (z = z >>> 8 ^ i[(z ^ (192 | Q >> 6 & 31)) & 255], z = z >>> 8 ^ i[(z ^ (128 | Q & 63)) & 255]) : Q >= 55296 && Q < 57344 ? (Q = (Q & 1023) + 64, ce = O.charCodeAt(K++) & 1023, z = z >>> 8 ^ i[(z ^ (240 | Q >> 8 & 7)) & 255], z = z >>> 8 ^ i[(z ^ (128 | Q >> 2 & 63)) & 255], z = z >>> 8 ^ i[(z ^ (128 | ce >> 6 & 15 | (Q & 3) << 4)) & 255], z = z >>> 8 ^ i[(z ^ (128 | ce & 63)) & 255]) : (z = z >>> 8 ^ i[(z ^ (224 | Q >> 12 & 15)) & 255], z = z >>> 8 ^ i[(z ^ (128 | Q >> 6 & 63)) & 255], z = z >>> 8 ^ i[(z ^ (128 | Q & 63)) & 255]);
        return ~z;
      }
      e.table = i, e.bstr = U, e.buf = M, e.str = B;
    });
  }(sn)), sn;
}
var wl = dl(), pl = /* @__PURE__ */ rr(wl), cn = {}, Ma;
function ur() {
  return Ma || (Ma = 1, function(t) {
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
  }(cn)), cn;
}
var Ir = {}, Ot = {}, dr = {}, Ua;
function ml() {
  if (Ua) return dr;
  Ua = 1;
  var t = ur(), e = 4, r = 0, i = 1, n = 2;
  function a(c) {
    for (var d = c.length; --d >= 0; )
      c[d] = 0;
  }
  var o = 0, s = 1, l = 2, f = 3, u = 258, m = 29, p = 256, y = p + 1 + m, E = 30, R = 19, $ = 2 * y + 1, I = 15, T = 16, A = 7, P = 256, U = 16, M = 17, B = 18, O = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  ), W = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  ), z = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  ), K = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], N = 512, Q = new Array((y + 2) * 2);
  a(Q);
  var ce = new Array(E * 2);
  a(ce);
  var _e = new Array(N);
  a(_e);
  var ne = new Array(u - f + 1);
  a(ne);
  var Y = new Array(m);
  a(Y);
  var ae = new Array(E);
  a(ae);
  function we(c, d, v, C, x) {
    this.static_tree = c, this.extra_bits = d, this.extra_base = v, this.elems = C, this.max_length = x, this.has_stree = c && c.length;
  }
  var Se, $e, be;
  function Be(c, d) {
    this.dyn_tree = c, this.max_code = 0, this.stat_desc = d;
  }
  function ye(c) {
    return c < 256 ? _e[c] : _e[256 + (c >>> 7)];
  }
  function Re(c, d) {
    c.pending_buf[c.pending++] = d & 255, c.pending_buf[c.pending++] = d >>> 8 & 255;
  }
  function ke(c, d, v) {
    c.bi_valid > T - v ? (c.bi_buf |= d << c.bi_valid & 65535, Re(c, c.bi_buf), c.bi_buf = d >> T - c.bi_valid, c.bi_valid += v - T) : (c.bi_buf |= d << c.bi_valid & 65535, c.bi_valid += v);
  }
  function Ee(c, d, v) {
    ke(
      c,
      v[d * 2],
      v[d * 2 + 1]
      /*.Len*/
    );
  }
  function Ae(c, d) {
    var v = 0;
    do
      v |= c & 1, c >>>= 1, v <<= 1;
    while (--d > 0);
    return v >>> 1;
  }
  function qe(c) {
    c.bi_valid === 16 ? (Re(c, c.bi_buf), c.bi_buf = 0, c.bi_valid = 0) : c.bi_valid >= 8 && (c.pending_buf[c.pending++] = c.bi_buf & 255, c.bi_buf >>= 8, c.bi_valid -= 8);
  }
  function rt(c, d) {
    var v = d.dyn_tree, C = d.max_code, x = d.stat_desc.static_tree, F = d.stat_desc.has_stree, b = d.stat_desc.extra_bits, ee = d.stat_desc.extra_base, le = d.stat_desc.max_length, h, q, X, S, j, V, he = 0;
    for (S = 0; S <= I; S++)
      c.bl_count[S] = 0;
    for (v[c.heap[c.heap_max] * 2 + 1] = 0, h = c.heap_max + 1; h < $; h++)
      q = c.heap[h], S = v[v[q * 2 + 1] * 2 + 1] + 1, S > le && (S = le, he++), v[q * 2 + 1] = S, !(q > C) && (c.bl_count[S]++, j = 0, q >= ee && (j = b[q - ee]), V = v[q * 2], c.opt_len += V * (S + j), F && (c.static_len += V * (x[q * 2 + 1] + j)));
    if (he !== 0) {
      do {
        for (S = le - 1; c.bl_count[S] === 0; )
          S--;
        c.bl_count[S]--, c.bl_count[S + 1] += 2, c.bl_count[le]--, he -= 2;
      } while (he > 0);
      for (S = le; S !== 0; S--)
        for (q = c.bl_count[S]; q !== 0; )
          X = c.heap[--h], !(X > C) && (v[X * 2 + 1] !== S && (c.opt_len += (S - v[X * 2 + 1]) * v[X * 2], v[X * 2 + 1] = S), q--);
    }
  }
  function je(c, d, v) {
    var C = new Array(I + 1), x = 0, F, b;
    for (F = 1; F <= I; F++)
      C[F] = x = x + v[F - 1] << 1;
    for (b = 0; b <= d; b++) {
      var ee = c[b * 2 + 1];
      ee !== 0 && (c[b * 2] = Ae(C[ee]++, ee));
    }
  }
  function pe() {
    var c, d, v, C, x, F = new Array(I + 1);
    for (v = 0, C = 0; C < m - 1; C++)
      for (Y[C] = v, c = 0; c < 1 << O[C]; c++)
        ne[v++] = C;
    for (ne[v - 1] = C, x = 0, C = 0; C < 16; C++)
      for (ae[C] = x, c = 0; c < 1 << W[C]; c++)
        _e[x++] = C;
    for (x >>= 7; C < E; C++)
      for (ae[C] = x << 7, c = 0; c < 1 << W[C] - 7; c++)
        _e[256 + x++] = C;
    for (d = 0; d <= I; d++)
      F[d] = 0;
    for (c = 0; c <= 143; )
      Q[c * 2 + 1] = 8, c++, F[8]++;
    for (; c <= 255; )
      Q[c * 2 + 1] = 9, c++, F[9]++;
    for (; c <= 279; )
      Q[c * 2 + 1] = 7, c++, F[7]++;
    for (; c <= 287; )
      Q[c * 2 + 1] = 8, c++, F[8]++;
    for (je(Q, y + 1, F), c = 0; c < E; c++)
      ce[c * 2 + 1] = 5, ce[c * 2] = Ae(c, 5);
    Se = new we(Q, O, p + 1, y, I), $e = new we(ce, W, 0, E, I), be = new we(new Array(0), z, 0, R, A);
  }
  function Oe(c) {
    var d;
    for (d = 0; d < y; d++)
      c.dyn_ltree[d * 2] = 0;
    for (d = 0; d < E; d++)
      c.dyn_dtree[d * 2] = 0;
    for (d = 0; d < R; d++)
      c.bl_tree[d * 2] = 0;
    c.dyn_ltree[P * 2] = 1, c.opt_len = c.static_len = 0, c.last_lit = c.matches = 0;
  }
  function Ze(c) {
    c.bi_valid > 8 ? Re(c, c.bi_buf) : c.bi_valid > 0 && (c.pending_buf[c.pending++] = c.bi_buf), c.bi_buf = 0, c.bi_valid = 0;
  }
  function Me(c, d, v, C) {
    Ze(c), Re(c, v), Re(c, ~v), t.arraySet(c.pending_buf, c.window, d, v, c.pending), c.pending += v;
  }
  function ze(c, d, v, C) {
    var x = d * 2, F = v * 2;
    return c[x] < c[F] || c[x] === c[F] && C[d] <= C[v];
  }
  function Ce(c, d, v) {
    for (var C = c.heap[v], x = v << 1; x <= c.heap_len && (x < c.heap_len && ze(d, c.heap[x + 1], c.heap[x], c.depth) && x++, !ze(d, C, c.heap[x], c.depth)); )
      c.heap[v] = c.heap[x], v = x, x <<= 1;
    c.heap[v] = C;
  }
  function xe(c, d, v) {
    var C, x, F = 0, b, ee;
    if (c.last_lit !== 0)
      do
        C = c.pending_buf[c.d_buf + F * 2] << 8 | c.pending_buf[c.d_buf + F * 2 + 1], x = c.pending_buf[c.l_buf + F], F++, C === 0 ? Ee(c, x, d) : (b = ne[x], Ee(c, b + p + 1, d), ee = O[b], ee !== 0 && (x -= Y[b], ke(c, x, ee)), C--, b = ye(C), Ee(c, b, v), ee = W[b], ee !== 0 && (C -= ae[b], ke(c, C, ee)));
      while (F < c.last_lit);
    Ee(c, P, d);
  }
  function ut(c, d) {
    var v = d.dyn_tree, C = d.stat_desc.static_tree, x = d.stat_desc.has_stree, F = d.stat_desc.elems, b, ee, le = -1, h;
    for (c.heap_len = 0, c.heap_max = $, b = 0; b < F; b++)
      v[b * 2] !== 0 ? (c.heap[++c.heap_len] = le = b, c.depth[b] = 0) : v[b * 2 + 1] = 0;
    for (; c.heap_len < 2; )
      h = c.heap[++c.heap_len] = le < 2 ? ++le : 0, v[h * 2] = 1, c.depth[h] = 0, c.opt_len--, x && (c.static_len -= C[h * 2 + 1]);
    for (d.max_code = le, b = c.heap_len >> 1; b >= 1; b--)
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
      ), ee = c.heap[
        1
        /*SMALLEST*/
      ], c.heap[--c.heap_max] = b, c.heap[--c.heap_max] = ee, v[h * 2] = v[b * 2] + v[ee * 2], c.depth[h] = (c.depth[b] >= c.depth[ee] ? c.depth[b] : c.depth[ee]) + 1, v[b * 2 + 1] = v[ee * 2 + 1] = h, c.heap[
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
    ], rt(c, d), je(v, le, c.bl_count);
  }
  function xt(c, d, v) {
    var C, x = -1, F, b = d[0 * 2 + 1], ee = 0, le = 7, h = 4;
    for (b === 0 && (le = 138, h = 3), d[(v + 1) * 2 + 1] = 65535, C = 0; C <= v; C++)
      F = b, b = d[(C + 1) * 2 + 1], !(++ee < le && F === b) && (ee < h ? c.bl_tree[F * 2] += ee : F !== 0 ? (F !== x && c.bl_tree[F * 2]++, c.bl_tree[U * 2]++) : ee <= 10 ? c.bl_tree[M * 2]++ : c.bl_tree[B * 2]++, ee = 0, x = F, b === 0 ? (le = 138, h = 3) : F === b ? (le = 6, h = 3) : (le = 7, h = 4));
  }
  function It(c, d, v) {
    var C, x = -1, F, b = d[0 * 2 + 1], ee = 0, le = 7, h = 4;
    for (b === 0 && (le = 138, h = 3), C = 0; C <= v; C++)
      if (F = b, b = d[(C + 1) * 2 + 1], !(++ee < le && F === b)) {
        if (ee < h)
          do
            Ee(c, F, c.bl_tree);
          while (--ee !== 0);
        else F !== 0 ? (F !== x && (Ee(c, F, c.bl_tree), ee--), Ee(c, U, c.bl_tree), ke(c, ee - 3, 2)) : ee <= 10 ? (Ee(c, M, c.bl_tree), ke(c, ee - 3, 3)) : (Ee(c, B, c.bl_tree), ke(c, ee - 11, 7));
        ee = 0, x = F, b === 0 ? (le = 138, h = 3) : F === b ? (le = 6, h = 3) : (le = 7, h = 4);
      }
  }
  function Fe(c) {
    var d;
    for (xt(c, c.dyn_ltree, c.l_desc.max_code), xt(c, c.dyn_dtree, c.d_desc.max_code), ut(c, c.bl_desc), d = R - 1; d >= 3 && c.bl_tree[K[d] * 2 + 1] === 0; d--)
      ;
    return c.opt_len += 3 * (d + 1) + 5 + 5 + 4, d;
  }
  function Ve(c, d, v, C) {
    var x;
    for (ke(c, d - 257, 5), ke(c, v - 1, 5), ke(c, C - 4, 4), x = 0; x < C; x++)
      ke(c, c.bl_tree[K[x] * 2 + 1], 3);
    It(c, c.dyn_ltree, d - 1), It(c, c.dyn_dtree, v - 1);
  }
  function ft(c) {
    var d = 4093624447, v;
    for (v = 0; v <= 31; v++, d >>>= 1)
      if (d & 1 && c.dyn_ltree[v * 2] !== 0)
        return r;
    if (c.dyn_ltree[9 * 2] !== 0 || c.dyn_ltree[10 * 2] !== 0 || c.dyn_ltree[13 * 2] !== 0)
      return i;
    for (v = 32; v < p; v++)
      if (c.dyn_ltree[v * 2] !== 0)
        return i;
    return r;
  }
  var Ge = !1;
  function vt(c) {
    Ge || (pe(), Ge = !0), c.l_desc = new Be(c.dyn_ltree, Se), c.d_desc = new Be(c.dyn_dtree, $e), c.bl_desc = new Be(c.bl_tree, be), c.bi_buf = 0, c.bi_valid = 0, Oe(c);
  }
  function Et(c, d, v, C) {
    ke(c, (o << 1) + (C ? 1 : 0), 3), Me(c, d, v);
  }
  function Le(c) {
    ke(c, s << 1, 3), Ee(c, P, Q), qe(c);
  }
  function nt(c, d, v, C) {
    var x, F, b = 0;
    c.level > 0 ? (c.strm.data_type === n && (c.strm.data_type = ft(c)), ut(c, c.l_desc), ut(c, c.d_desc), b = Fe(c), x = c.opt_len + 3 + 7 >>> 3, F = c.static_len + 3 + 7 >>> 3, F <= x && (x = F)) : x = F = v + 5, v + 4 <= x && d !== -1 ? Et(c, d, v, C) : c.strategy === e || F === x ? (ke(c, (s << 1) + (C ? 1 : 0), 3), xe(c, Q, ce)) : (ke(c, (l << 1) + (C ? 1 : 0), 3), Ve(c, c.l_desc.max_code + 1, c.d_desc.max_code + 1, b + 1), xe(c, c.dyn_ltree, c.dyn_dtree)), Oe(c), C && Ze(c);
  }
  function k(c, d, v) {
    return c.pending_buf[c.d_buf + c.last_lit * 2] = d >>> 8 & 255, c.pending_buf[c.d_buf + c.last_lit * 2 + 1] = d & 255, c.pending_buf[c.l_buf + c.last_lit] = v & 255, c.last_lit++, d === 0 ? c.dyn_ltree[v * 2]++ : (c.matches++, d--, c.dyn_ltree[(ne[v] + p + 1) * 2]++, c.dyn_dtree[ye(d) * 2]++), c.last_lit === c.lit_bufsize - 1;
  }
  return dr._tr_init = vt, dr._tr_stored_block = Et, dr._tr_flush_block = nt, dr._tr_tally = k, dr._tr_align = Le, dr;
}
var ln, La;
function os() {
  if (La) return ln;
  La = 1;
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
  return ln = t, ln;
}
var un, Pa;
function ss() {
  if (Pa) return un;
  Pa = 1;
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
  return un = r, un;
}
var fn, ja;
function fa() {
  return ja || (ja = 1, fn = {
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
  }), fn;
}
var za;
function gl() {
  if (za) return Ot;
  za = 1;
  var t = ur(), e = ml(), r = os(), i = ss(), n = fa(), a = 0, o = 1, s = 3, l = 4, f = 5, u = 0, m = 1, p = -2, y = -3, E = -5, R = -1, $ = 1, I = 2, T = 3, A = 4, P = 0, U = 2, M = 8, B = 9, O = 15, W = 8, z = 29, K = 256, N = K + 1 + z, Q = 30, ce = 19, _e = 2 * N + 1, ne = 15, Y = 3, ae = 258, we = ae + Y + 1, Se = 32, $e = 42, be = 69, Be = 73, ye = 91, Re = 103, ke = 113, Ee = 666, Ae = 1, qe = 2, rt = 3, je = 4, pe = 3;
  function Oe(h, q) {
    return h.msg = n[q], q;
  }
  function Ze(h) {
    return (h << 1) - (h > 4 ? 9 : 0);
  }
  function Me(h) {
    for (var q = h.length; --q >= 0; )
      h[q] = 0;
  }
  function ze(h) {
    var q = h.state, X = q.pending;
    X > h.avail_out && (X = h.avail_out), X !== 0 && (t.arraySet(h.output, q.pending_buf, q.pending_out, X, h.next_out), h.next_out += X, q.pending_out += X, h.total_out += X, h.avail_out -= X, q.pending -= X, q.pending === 0 && (q.pending_out = 0));
  }
  function Ce(h, q) {
    e._tr_flush_block(h, h.block_start >= 0 ? h.block_start : -1, h.strstart - h.block_start, q), h.block_start = h.strstart, ze(h.strm);
  }
  function xe(h, q) {
    h.pending_buf[h.pending++] = q;
  }
  function ut(h, q) {
    h.pending_buf[h.pending++] = q >>> 8 & 255, h.pending_buf[h.pending++] = q & 255;
  }
  function xt(h, q, X, S) {
    var j = h.avail_in;
    return j > S && (j = S), j === 0 ? 0 : (h.avail_in -= j, t.arraySet(q, h.input, h.next_in, j, X), h.state.wrap === 1 ? h.adler = r(h.adler, q, j, X) : h.state.wrap === 2 && (h.adler = i(h.adler, q, j, X)), h.next_in += j, h.total_in += j, j);
  }
  function It(h, q) {
    var X = h.max_chain_length, S = h.strstart, j, V, he = h.prev_length, ue = h.nice_match, _ = h.strstart > h.w_size - we ? h.strstart - (h.w_size - we) : 0, w = h.window, g = h.w_mask, D = h.prev, L = h.strstart + ae, G = w[S + he - 1], J = w[S + he];
    h.prev_length >= h.good_match && (X >>= 2), ue > h.lookahead && (ue = h.lookahead);
    do
      if (j = q, !(w[j + he] !== J || w[j + he - 1] !== G || w[j] !== w[S] || w[++j] !== w[S + 1])) {
        S += 2, j++;
        do
          ;
        while (w[++S] === w[++j] && w[++S] === w[++j] && w[++S] === w[++j] && w[++S] === w[++j] && w[++S] === w[++j] && w[++S] === w[++j] && w[++S] === w[++j] && w[++S] === w[++j] && S < L);
        if (V = ae - (L - S), S = L - ae, V > he) {
          if (h.match_start = q, he = V, V >= ue)
            break;
          G = w[S + he - 1], J = w[S + he];
        }
      }
    while ((q = D[q & g]) > _ && --X !== 0);
    return he <= h.lookahead ? he : h.lookahead;
  }
  function Fe(h) {
    var q = h.w_size, X, S, j, V, he;
    do {
      if (V = h.window_size - h.lookahead - h.strstart, h.strstart >= q + (q - we)) {
        t.arraySet(h.window, h.window, q, q, 0), h.match_start -= q, h.strstart -= q, h.block_start -= q, S = h.hash_size, X = S;
        do
          j = h.head[--X], h.head[X] = j >= q ? j - q : 0;
        while (--S);
        S = q, X = S;
        do
          j = h.prev[--X], h.prev[X] = j >= q ? j - q : 0;
        while (--S);
        V += q;
      }
      if (h.strm.avail_in === 0)
        break;
      if (S = xt(h.strm, h.window, h.strstart + h.lookahead, V), h.lookahead += S, h.lookahead + h.insert >= Y)
        for (he = h.strstart - h.insert, h.ins_h = h.window[he], h.ins_h = (h.ins_h << h.hash_shift ^ h.window[he + 1]) & h.hash_mask; h.insert && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[he + Y - 1]) & h.hash_mask, h.prev[he & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = he, he++, h.insert--, !(h.lookahead + h.insert < Y)); )
          ;
    } while (h.lookahead < we && h.strm.avail_in !== 0);
  }
  function Ve(h, q) {
    var X = 65535;
    for (X > h.pending_buf_size - 5 && (X = h.pending_buf_size - 5); ; ) {
      if (h.lookahead <= 1) {
        if (Fe(h), h.lookahead === 0 && q === a)
          return Ae;
        if (h.lookahead === 0)
          break;
      }
      h.strstart += h.lookahead, h.lookahead = 0;
      var S = h.block_start + X;
      if ((h.strstart === 0 || h.strstart >= S) && (h.lookahead = h.strstart - S, h.strstart = S, Ce(h, !1), h.strm.avail_out === 0) || h.strstart - h.block_start >= h.w_size - we && (Ce(h, !1), h.strm.avail_out === 0))
        return Ae;
    }
    return h.insert = 0, q === l ? (Ce(h, !0), h.strm.avail_out === 0 ? rt : je) : (h.strstart > h.block_start && (Ce(h, !1), h.strm.avail_out === 0), Ae);
  }
  function ft(h, q) {
    for (var X, S; ; ) {
      if (h.lookahead < we) {
        if (Fe(h), h.lookahead < we && q === a)
          return Ae;
        if (h.lookahead === 0)
          break;
      }
      if (X = 0, h.lookahead >= Y && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + Y - 1]) & h.hash_mask, X = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), X !== 0 && h.strstart - X <= h.w_size - we && (h.match_length = It(h, X)), h.match_length >= Y)
        if (S = e._tr_tally(h, h.strstart - h.match_start, h.match_length - Y), h.lookahead -= h.match_length, h.match_length <= h.max_lazy_match && h.lookahead >= Y) {
          h.match_length--;
          do
            h.strstart++, h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + Y - 1]) & h.hash_mask, X = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart;
          while (--h.match_length !== 0);
          h.strstart++;
        } else
          h.strstart += h.match_length, h.match_length = 0, h.ins_h = h.window[h.strstart], h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + 1]) & h.hash_mask;
      else
        S = e._tr_tally(h, 0, h.window[h.strstart]), h.lookahead--, h.strstart++;
      if (S && (Ce(h, !1), h.strm.avail_out === 0))
        return Ae;
    }
    return h.insert = h.strstart < Y - 1 ? h.strstart : Y - 1, q === l ? (Ce(h, !0), h.strm.avail_out === 0 ? rt : je) : h.last_lit && (Ce(h, !1), h.strm.avail_out === 0) ? Ae : qe;
  }
  function Ge(h, q) {
    for (var X, S, j; ; ) {
      if (h.lookahead < we) {
        if (Fe(h), h.lookahead < we && q === a)
          return Ae;
        if (h.lookahead === 0)
          break;
      }
      if (X = 0, h.lookahead >= Y && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + Y - 1]) & h.hash_mask, X = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), h.prev_length = h.match_length, h.prev_match = h.match_start, h.match_length = Y - 1, X !== 0 && h.prev_length < h.max_lazy_match && h.strstart - X <= h.w_size - we && (h.match_length = It(h, X), h.match_length <= 5 && (h.strategy === $ || h.match_length === Y && h.strstart - h.match_start > 4096) && (h.match_length = Y - 1)), h.prev_length >= Y && h.match_length <= h.prev_length) {
        j = h.strstart + h.lookahead - Y, S = e._tr_tally(h, h.strstart - 1 - h.prev_match, h.prev_length - Y), h.lookahead -= h.prev_length - 1, h.prev_length -= 2;
        do
          ++h.strstart <= j && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + Y - 1]) & h.hash_mask, X = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart);
        while (--h.prev_length !== 0);
        if (h.match_available = 0, h.match_length = Y - 1, h.strstart++, S && (Ce(h, !1), h.strm.avail_out === 0))
          return Ae;
      } else if (h.match_available) {
        if (S = e._tr_tally(h, 0, h.window[h.strstart - 1]), S && Ce(h, !1), h.strstart++, h.lookahead--, h.strm.avail_out === 0)
          return Ae;
      } else
        h.match_available = 1, h.strstart++, h.lookahead--;
    }
    return h.match_available && (S = e._tr_tally(h, 0, h.window[h.strstart - 1]), h.match_available = 0), h.insert = h.strstart < Y - 1 ? h.strstart : Y - 1, q === l ? (Ce(h, !0), h.strm.avail_out === 0 ? rt : je) : h.last_lit && (Ce(h, !1), h.strm.avail_out === 0) ? Ae : qe;
  }
  function vt(h, q) {
    for (var X, S, j, V, he = h.window; ; ) {
      if (h.lookahead <= ae) {
        if (Fe(h), h.lookahead <= ae && q === a)
          return Ae;
        if (h.lookahead === 0)
          break;
      }
      if (h.match_length = 0, h.lookahead >= Y && h.strstart > 0 && (j = h.strstart - 1, S = he[j], S === he[++j] && S === he[++j] && S === he[++j])) {
        V = h.strstart + ae;
        do
          ;
        while (S === he[++j] && S === he[++j] && S === he[++j] && S === he[++j] && S === he[++j] && S === he[++j] && S === he[++j] && S === he[++j] && j < V);
        h.match_length = ae - (V - j), h.match_length > h.lookahead && (h.match_length = h.lookahead);
      }
      if (h.match_length >= Y ? (X = e._tr_tally(h, 1, h.match_length - Y), h.lookahead -= h.match_length, h.strstart += h.match_length, h.match_length = 0) : (X = e._tr_tally(h, 0, h.window[h.strstart]), h.lookahead--, h.strstart++), X && (Ce(h, !1), h.strm.avail_out === 0))
        return Ae;
    }
    return h.insert = 0, q === l ? (Ce(h, !0), h.strm.avail_out === 0 ? rt : je) : h.last_lit && (Ce(h, !1), h.strm.avail_out === 0) ? Ae : qe;
  }
  function Et(h, q) {
    for (var X; ; ) {
      if (h.lookahead === 0 && (Fe(h), h.lookahead === 0)) {
        if (q === a)
          return Ae;
        break;
      }
      if (h.match_length = 0, X = e._tr_tally(h, 0, h.window[h.strstart]), h.lookahead--, h.strstart++, X && (Ce(h, !1), h.strm.avail_out === 0))
        return Ae;
    }
    return h.insert = 0, q === l ? (Ce(h, !0), h.strm.avail_out === 0 ? rt : je) : h.last_lit && (Ce(h, !1), h.strm.avail_out === 0) ? Ae : qe;
  }
  function Le(h, q, X, S, j) {
    this.good_length = h, this.max_lazy = q, this.nice_length = X, this.max_chain = S, this.func = j;
  }
  var nt;
  nt = [
    /*      good lazy nice chain */
    new Le(0, 0, 0, 0, Ve),
    /* 0 store only */
    new Le(4, 4, 8, 4, ft),
    /* 1 max speed, no lazy matches */
    new Le(4, 5, 16, 8, ft),
    /* 2 */
    new Le(4, 6, 32, 32, ft),
    /* 3 */
    new Le(4, 4, 16, 16, Ge),
    /* 4 lazy matches */
    new Le(8, 16, 32, 32, Ge),
    /* 5 */
    new Le(8, 16, 128, 128, Ge),
    /* 6 */
    new Le(8, 32, 128, 256, Ge),
    /* 7 */
    new Le(32, 128, 258, 1024, Ge),
    /* 8 */
    new Le(32, 258, 258, 4096, Ge)
    /* 9 max compression */
  ];
  function k(h) {
    h.window_size = 2 * h.w_size, Me(h.head), h.max_lazy_match = nt[h.level].max_lazy, h.good_match = nt[h.level].good_length, h.nice_match = nt[h.level].nice_length, h.max_chain_length = nt[h.level].max_chain, h.strstart = 0, h.block_start = 0, h.lookahead = 0, h.insert = 0, h.match_length = h.prev_length = Y - 1, h.match_available = 0, h.ins_h = 0;
  }
  function c() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = M, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new t.Buf16(_e * 2), this.dyn_dtree = new t.Buf16((2 * Q + 1) * 2), this.bl_tree = new t.Buf16((2 * ce + 1) * 2), Me(this.dyn_ltree), Me(this.dyn_dtree), Me(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new t.Buf16(ne + 1), this.heap = new t.Buf16(2 * N + 1), Me(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new t.Buf16(2 * N + 1), Me(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  function d(h) {
    var q;
    return !h || !h.state ? Oe(h, p) : (h.total_in = h.total_out = 0, h.data_type = U, q = h.state, q.pending = 0, q.pending_out = 0, q.wrap < 0 && (q.wrap = -q.wrap), q.status = q.wrap ? $e : ke, h.adler = q.wrap === 2 ? 0 : 1, q.last_flush = a, e._tr_init(q), u);
  }
  function v(h) {
    var q = d(h);
    return q === u && k(h.state), q;
  }
  function C(h, q) {
    return !h || !h.state || h.state.wrap !== 2 ? p : (h.state.gzhead = q, u);
  }
  function x(h, q, X, S, j, V) {
    if (!h)
      return p;
    var he = 1;
    if (q === R && (q = 6), S < 0 ? (he = 0, S = -S) : S > 15 && (he = 2, S -= 16), j < 1 || j > B || X !== M || S < 8 || S > 15 || q < 0 || q > 9 || V < 0 || V > A)
      return Oe(h, p);
    S === 8 && (S = 9);
    var ue = new c();
    return h.state = ue, ue.strm = h, ue.wrap = he, ue.gzhead = null, ue.w_bits = S, ue.w_size = 1 << ue.w_bits, ue.w_mask = ue.w_size - 1, ue.hash_bits = j + 7, ue.hash_size = 1 << ue.hash_bits, ue.hash_mask = ue.hash_size - 1, ue.hash_shift = ~~((ue.hash_bits + Y - 1) / Y), ue.window = new t.Buf8(ue.w_size * 2), ue.head = new t.Buf16(ue.hash_size), ue.prev = new t.Buf16(ue.w_size), ue.lit_bufsize = 1 << j + 6, ue.pending_buf_size = ue.lit_bufsize * 4, ue.pending_buf = new t.Buf8(ue.pending_buf_size), ue.d_buf = 1 * ue.lit_bufsize, ue.l_buf = 3 * ue.lit_bufsize, ue.level = q, ue.strategy = V, ue.method = X, v(h);
  }
  function F(h, q) {
    return x(h, q, M, O, W, P);
  }
  function b(h, q) {
    var X, S, j, V;
    if (!h || !h.state || q > f || q < 0)
      return h ? Oe(h, p) : p;
    if (S = h.state, !h.output || !h.input && h.avail_in !== 0 || S.status === Ee && q !== l)
      return Oe(h, h.avail_out === 0 ? E : p);
    if (S.strm = h, X = S.last_flush, S.last_flush = q, S.status === $e)
      if (S.wrap === 2)
        h.adler = 0, xe(S, 31), xe(S, 139), xe(S, 8), S.gzhead ? (xe(
          S,
          (S.gzhead.text ? 1 : 0) + (S.gzhead.hcrc ? 2 : 0) + (S.gzhead.extra ? 4 : 0) + (S.gzhead.name ? 8 : 0) + (S.gzhead.comment ? 16 : 0)
        ), xe(S, S.gzhead.time & 255), xe(S, S.gzhead.time >> 8 & 255), xe(S, S.gzhead.time >> 16 & 255), xe(S, S.gzhead.time >> 24 & 255), xe(S, S.level === 9 ? 2 : S.strategy >= I || S.level < 2 ? 4 : 0), xe(S, S.gzhead.os & 255), S.gzhead.extra && S.gzhead.extra.length && (xe(S, S.gzhead.extra.length & 255), xe(S, S.gzhead.extra.length >> 8 & 255)), S.gzhead.hcrc && (h.adler = i(h.adler, S.pending_buf, S.pending, 0)), S.gzindex = 0, S.status = be) : (xe(S, 0), xe(S, 0), xe(S, 0), xe(S, 0), xe(S, 0), xe(S, S.level === 9 ? 2 : S.strategy >= I || S.level < 2 ? 4 : 0), xe(S, pe), S.status = ke);
      else {
        var he = M + (S.w_bits - 8 << 4) << 8, ue = -1;
        S.strategy >= I || S.level < 2 ? ue = 0 : S.level < 6 ? ue = 1 : S.level === 6 ? ue = 2 : ue = 3, he |= ue << 6, S.strstart !== 0 && (he |= Se), he += 31 - he % 31, S.status = ke, ut(S, he), S.strstart !== 0 && (ut(S, h.adler >>> 16), ut(S, h.adler & 65535)), h.adler = 1;
      }
    if (S.status === be)
      if (S.gzhead.extra) {
        for (j = S.pending; S.gzindex < (S.gzhead.extra.length & 65535) && !(S.pending === S.pending_buf_size && (S.gzhead.hcrc && S.pending > j && (h.adler = i(h.adler, S.pending_buf, S.pending - j, j)), ze(h), j = S.pending, S.pending === S.pending_buf_size)); )
          xe(S, S.gzhead.extra[S.gzindex] & 255), S.gzindex++;
        S.gzhead.hcrc && S.pending > j && (h.adler = i(h.adler, S.pending_buf, S.pending - j, j)), S.gzindex === S.gzhead.extra.length && (S.gzindex = 0, S.status = Be);
      } else
        S.status = Be;
    if (S.status === Be)
      if (S.gzhead.name) {
        j = S.pending;
        do {
          if (S.pending === S.pending_buf_size && (S.gzhead.hcrc && S.pending > j && (h.adler = i(h.adler, S.pending_buf, S.pending - j, j)), ze(h), j = S.pending, S.pending === S.pending_buf_size)) {
            V = 1;
            break;
          }
          S.gzindex < S.gzhead.name.length ? V = S.gzhead.name.charCodeAt(S.gzindex++) & 255 : V = 0, xe(S, V);
        } while (V !== 0);
        S.gzhead.hcrc && S.pending > j && (h.adler = i(h.adler, S.pending_buf, S.pending - j, j)), V === 0 && (S.gzindex = 0, S.status = ye);
      } else
        S.status = ye;
    if (S.status === ye)
      if (S.gzhead.comment) {
        j = S.pending;
        do {
          if (S.pending === S.pending_buf_size && (S.gzhead.hcrc && S.pending > j && (h.adler = i(h.adler, S.pending_buf, S.pending - j, j)), ze(h), j = S.pending, S.pending === S.pending_buf_size)) {
            V = 1;
            break;
          }
          S.gzindex < S.gzhead.comment.length ? V = S.gzhead.comment.charCodeAt(S.gzindex++) & 255 : V = 0, xe(S, V);
        } while (V !== 0);
        S.gzhead.hcrc && S.pending > j && (h.adler = i(h.adler, S.pending_buf, S.pending - j, j)), V === 0 && (S.status = Re);
      } else
        S.status = Re;
    if (S.status === Re && (S.gzhead.hcrc ? (S.pending + 2 > S.pending_buf_size && ze(h), S.pending + 2 <= S.pending_buf_size && (xe(S, h.adler & 255), xe(S, h.adler >> 8 & 255), h.adler = 0, S.status = ke)) : S.status = ke), S.pending !== 0) {
      if (ze(h), h.avail_out === 0)
        return S.last_flush = -1, u;
    } else if (h.avail_in === 0 && Ze(q) <= Ze(X) && q !== l)
      return Oe(h, E);
    if (S.status === Ee && h.avail_in !== 0)
      return Oe(h, E);
    if (h.avail_in !== 0 || S.lookahead !== 0 || q !== a && S.status !== Ee) {
      var _ = S.strategy === I ? Et(S, q) : S.strategy === T ? vt(S, q) : nt[S.level].func(S, q);
      if ((_ === rt || _ === je) && (S.status = Ee), _ === Ae || _ === rt)
        return h.avail_out === 0 && (S.last_flush = -1), u;
      if (_ === qe && (q === o ? e._tr_align(S) : q !== f && (e._tr_stored_block(S, 0, 0, !1), q === s && (Me(S.head), S.lookahead === 0 && (S.strstart = 0, S.block_start = 0, S.insert = 0))), ze(h), h.avail_out === 0))
        return S.last_flush = -1, u;
    }
    return q !== l ? u : S.wrap <= 0 ? m : (S.wrap === 2 ? (xe(S, h.adler & 255), xe(S, h.adler >> 8 & 255), xe(S, h.adler >> 16 & 255), xe(S, h.adler >> 24 & 255), xe(S, h.total_in & 255), xe(S, h.total_in >> 8 & 255), xe(S, h.total_in >> 16 & 255), xe(S, h.total_in >> 24 & 255)) : (ut(S, h.adler >>> 16), ut(S, h.adler & 65535)), ze(h), S.wrap > 0 && (S.wrap = -S.wrap), S.pending !== 0 ? u : m);
  }
  function ee(h) {
    var q;
    return !h || !h.state ? p : (q = h.state.status, q !== $e && q !== be && q !== Be && q !== ye && q !== Re && q !== ke && q !== Ee ? Oe(h, p) : (h.state = null, q === ke ? Oe(h, y) : u));
  }
  function le(h, q) {
    var X = q.length, S, j, V, he, ue, _, w, g;
    if (!h || !h.state || (S = h.state, he = S.wrap, he === 2 || he === 1 && S.status !== $e || S.lookahead))
      return p;
    for (he === 1 && (h.adler = r(h.adler, q, X, 0)), S.wrap = 0, X >= S.w_size && (he === 0 && (Me(S.head), S.strstart = 0, S.block_start = 0, S.insert = 0), g = new t.Buf8(S.w_size), t.arraySet(g, q, X - S.w_size, S.w_size, 0), q = g, X = S.w_size), ue = h.avail_in, _ = h.next_in, w = h.input, h.avail_in = X, h.next_in = 0, h.input = q, Fe(S); S.lookahead >= Y; ) {
      j = S.strstart, V = S.lookahead - (Y - 1);
      do
        S.ins_h = (S.ins_h << S.hash_shift ^ S.window[j + Y - 1]) & S.hash_mask, S.prev[j & S.w_mask] = S.head[S.ins_h], S.head[S.ins_h] = j, j++;
      while (--V);
      S.strstart = j, S.lookahead = Y - 1, Fe(S);
    }
    return S.strstart += S.lookahead, S.block_start = S.strstart, S.insert = S.lookahead, S.lookahead = 0, S.match_length = S.prev_length = Y - 1, S.match_available = 0, h.next_in = _, h.input = w, h.avail_in = ue, S.wrap = he, u;
  }
  return Ot.deflateInit = F, Ot.deflateInit2 = x, Ot.deflateReset = v, Ot.deflateResetKeep = d, Ot.deflateSetHeader = C, Ot.deflate = b, Ot.deflateEnd = ee, Ot.deflateSetDictionary = le, Ot.deflateInfo = "pako deflate (from Nodeca project)", Ot;
}
var wr = {}, Ha;
function cs() {
  if (Ha) return wr;
  Ha = 1;
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
  for (var i = new t.Buf8(256), n = 0; n < 256; n++)
    i[n] = n >= 252 ? 6 : n >= 248 ? 5 : n >= 240 ? 4 : n >= 224 ? 3 : n >= 192 ? 2 : 1;
  i[254] = i[254] = 1, wr.string2buf = function(o) {
    var s, l, f, u, m, p = o.length, y = 0;
    for (u = 0; u < p; u++)
      l = o.charCodeAt(u), (l & 64512) === 55296 && u + 1 < p && (f = o.charCodeAt(u + 1), (f & 64512) === 56320 && (l = 65536 + (l - 55296 << 10) + (f - 56320), u++)), y += l < 128 ? 1 : l < 2048 ? 2 : l < 65536 ? 3 : 4;
    for (s = new t.Buf8(y), m = 0, u = 0; m < y; u++)
      l = o.charCodeAt(u), (l & 64512) === 55296 && u + 1 < p && (f = o.charCodeAt(u + 1), (f & 64512) === 56320 && (l = 65536 + (l - 55296 << 10) + (f - 56320), u++)), l < 128 ? s[m++] = l : l < 2048 ? (s[m++] = 192 | l >>> 6, s[m++] = 128 | l & 63) : l < 65536 ? (s[m++] = 224 | l >>> 12, s[m++] = 128 | l >>> 6 & 63, s[m++] = 128 | l & 63) : (s[m++] = 240 | l >>> 18, s[m++] = 128 | l >>> 12 & 63, s[m++] = 128 | l >>> 6 & 63, s[m++] = 128 | l & 63);
    return s;
  };
  function a(o, s) {
    if (s < 65534 && (o.subarray && r || !o.subarray && e))
      return String.fromCharCode.apply(null, t.shrinkBuf(o, s));
    for (var l = "", f = 0; f < s; f++)
      l += String.fromCharCode(o[f]);
    return l;
  }
  return wr.buf2binstring = function(o) {
    return a(o, o.length);
  }, wr.binstring2buf = function(o) {
    for (var s = new t.Buf8(o.length), l = 0, f = s.length; l < f; l++)
      s[l] = o.charCodeAt(l);
    return s;
  }, wr.buf2string = function(o, s) {
    var l, f, u, m, p = s || o.length, y = new Array(p * 2);
    for (f = 0, l = 0; l < p; ) {
      if (u = o[l++], u < 128) {
        y[f++] = u;
        continue;
      }
      if (m = i[u], m > 4) {
        y[f++] = 65533, l += m - 1;
        continue;
      }
      for (u &= m === 2 ? 31 : m === 3 ? 15 : 7; m > 1 && l < p; )
        u = u << 6 | o[l++] & 63, m--;
      if (m > 1) {
        y[f++] = 65533;
        continue;
      }
      u < 65536 ? y[f++] = u : (u -= 65536, y[f++] = 55296 | u >> 10 & 1023, y[f++] = 56320 | u & 1023);
    }
    return a(y, f);
  }, wr.utf8border = function(o, s) {
    var l;
    for (s = s || o.length, s > o.length && (s = o.length), l = s - 1; l >= 0 && (o[l] & 192) === 128; )
      l--;
    return l < 0 || l === 0 ? s : l + i[o[l]] > s ? l : s;
  }, wr;
}
var hn, Wa;
function ls() {
  if (Wa) return hn;
  Wa = 1;
  function t() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return hn = t, hn;
}
var qa;
function yl() {
  if (qa) return Ir;
  qa = 1;
  var t = gl(), e = ur(), r = cs(), i = fa(), n = ls(), a = Object.prototype.toString, o = 0, s = 4, l = 0, f = 1, u = 2, m = -1, p = 0, y = 8;
  function E(T) {
    if (!(this instanceof E)) return new E(T);
    this.options = e.assign({
      level: m,
      method: y,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: p,
      to: ""
    }, T || {});
    var A = this.options;
    A.raw && A.windowBits > 0 ? A.windowBits = -A.windowBits : A.gzip && A.windowBits > 0 && A.windowBits < 16 && (A.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new n(), this.strm.avail_out = 0;
    var P = t.deflateInit2(
      this.strm,
      A.level,
      A.method,
      A.windowBits,
      A.memLevel,
      A.strategy
    );
    if (P !== l)
      throw new Error(i[P]);
    if (A.header && t.deflateSetHeader(this.strm, A.header), A.dictionary) {
      var U;
      if (typeof A.dictionary == "string" ? U = r.string2buf(A.dictionary) : a.call(A.dictionary) === "[object ArrayBuffer]" ? U = new Uint8Array(A.dictionary) : U = A.dictionary, P = t.deflateSetDictionary(this.strm, U), P !== l)
        throw new Error(i[P]);
      this._dict_set = !0;
    }
  }
  E.prototype.push = function(T, A) {
    var P = this.strm, U = this.options.chunkSize, M, B;
    if (this.ended)
      return !1;
    B = A === ~~A ? A : A === !0 ? s : o, typeof T == "string" ? P.input = r.string2buf(T) : a.call(T) === "[object ArrayBuffer]" ? P.input = new Uint8Array(T) : P.input = T, P.next_in = 0, P.avail_in = P.input.length;
    do {
      if (P.avail_out === 0 && (P.output = new e.Buf8(U), P.next_out = 0, P.avail_out = U), M = t.deflate(P, B), M !== f && M !== l)
        return this.onEnd(M), this.ended = !0, !1;
      (P.avail_out === 0 || P.avail_in === 0 && (B === s || B === u)) && (this.options.to === "string" ? this.onData(r.buf2binstring(e.shrinkBuf(P.output, P.next_out))) : this.onData(e.shrinkBuf(P.output, P.next_out)));
    } while ((P.avail_in > 0 || P.avail_out === 0) && M !== f);
    return B === s ? (M = t.deflateEnd(this.strm), this.onEnd(M), this.ended = !0, M === l) : (B === u && (this.onEnd(l), P.avail_out = 0), !0);
  }, E.prototype.onData = function(T) {
    this.chunks.push(T);
  }, E.prototype.onEnd = function(T) {
    T === l && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = T, this.msg = this.strm.msg;
  };
  function R(T, A) {
    var P = new E(A);
    if (P.push(T, !0), P.err)
      throw P.msg || i[P.err];
    return P.result;
  }
  function $(T, A) {
    return A = A || {}, A.raw = !0, R(T, A);
  }
  function I(T, A) {
    return A = A || {}, A.gzip = !0, R(T, A);
  }
  return Ir.Deflate = E, Ir.deflate = R, Ir.deflateRaw = $, Ir.gzip = I, Ir;
}
var Tr = {}, Tt = {}, dn, Ga;
function _l() {
  if (Ga) return dn;
  Ga = 1;
  var t = 30, e = 12;
  return dn = function(i, n) {
    var a, o, s, l, f, u, m, p, y, E, R, $, I, T, A, P, U, M, B, O, W, z, K, N, Q;
    a = i.state, o = i.next_in, N = i.input, s = o + (i.avail_in - 5), l = i.next_out, Q = i.output, f = l - (n - i.avail_out), u = l + (i.avail_out - 257), m = a.dmax, p = a.wsize, y = a.whave, E = a.wnext, R = a.window, $ = a.hold, I = a.bits, T = a.lencode, A = a.distcode, P = (1 << a.lenbits) - 1, U = (1 << a.distbits) - 1;
    e:
      do {
        I < 15 && ($ += N[o++] << I, I += 8, $ += N[o++] << I, I += 8), M = T[$ & P];
        t:
          for (; ; ) {
            if (B = M >>> 24, $ >>>= B, I -= B, B = M >>> 16 & 255, B === 0)
              Q[l++] = M & 65535;
            else if (B & 16) {
              O = M & 65535, B &= 15, B && (I < B && ($ += N[o++] << I, I += 8), O += $ & (1 << B) - 1, $ >>>= B, I -= B), I < 15 && ($ += N[o++] << I, I += 8, $ += N[o++] << I, I += 8), M = A[$ & U];
              r:
                for (; ; ) {
                  if (B = M >>> 24, $ >>>= B, I -= B, B = M >>> 16 & 255, B & 16) {
                    if (W = M & 65535, B &= 15, I < B && ($ += N[o++] << I, I += 8, I < B && ($ += N[o++] << I, I += 8)), W += $ & (1 << B) - 1, W > m) {
                      i.msg = "invalid distance too far back", a.mode = t;
                      break e;
                    }
                    if ($ >>>= B, I -= B, B = l - f, W > B) {
                      if (B = W - B, B > y && a.sane) {
                        i.msg = "invalid distance too far back", a.mode = t;
                        break e;
                      }
                      if (z = 0, K = R, E === 0) {
                        if (z += p - B, B < O) {
                          O -= B;
                          do
                            Q[l++] = R[z++];
                          while (--B);
                          z = l - W, K = Q;
                        }
                      } else if (E < B) {
                        if (z += p + E - B, B -= E, B < O) {
                          O -= B;
                          do
                            Q[l++] = R[z++];
                          while (--B);
                          if (z = 0, E < O) {
                            B = E, O -= B;
                            do
                              Q[l++] = R[z++];
                            while (--B);
                            z = l - W, K = Q;
                          }
                        }
                      } else if (z += E - B, B < O) {
                        O -= B;
                        do
                          Q[l++] = R[z++];
                        while (--B);
                        z = l - W, K = Q;
                      }
                      for (; O > 2; )
                        Q[l++] = K[z++], Q[l++] = K[z++], Q[l++] = K[z++], O -= 3;
                      O && (Q[l++] = K[z++], O > 1 && (Q[l++] = K[z++]));
                    } else {
                      z = l - W;
                      do
                        Q[l++] = Q[z++], Q[l++] = Q[z++], Q[l++] = Q[z++], O -= 3;
                      while (O > 2);
                      O && (Q[l++] = Q[z++], O > 1 && (Q[l++] = Q[z++]));
                    }
                  } else if ((B & 64) === 0) {
                    M = A[(M & 65535) + ($ & (1 << B) - 1)];
                    continue r;
                  } else {
                    i.msg = "invalid distance code", a.mode = t;
                    break e;
                  }
                  break;
                }
            } else if ((B & 64) === 0) {
              M = T[(M & 65535) + ($ & (1 << B) - 1)];
              continue t;
            } else if (B & 32) {
              a.mode = e;
              break e;
            } else {
              i.msg = "invalid literal/length code", a.mode = t;
              break e;
            }
            break;
          }
      } while (o < s && l < u);
    O = I >> 3, o -= O, I -= O << 3, $ &= (1 << I) - 1, i.next_in = o, i.next_out = l, i.avail_in = o < s ? 5 + (s - o) : 5 - (o - s), i.avail_out = l < u ? 257 + (u - l) : 257 - (l - u), a.hold = $, a.bits = I;
  }, dn;
}
var wn, Za;
function bl() {
  if (Za) return wn;
  Za = 1;
  var t = ur(), e = 15, r = 852, i = 592, n = 0, a = 1, o = 2, s = [
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
  return wn = function(p, y, E, R, $, I, T, A) {
    var P = A.bits, U = 0, M = 0, B = 0, O = 0, W = 0, z = 0, K = 0, N = 0, Q = 0, ce = 0, _e, ne, Y, ae, we, Se = null, $e = 0, be, Be = new t.Buf16(e + 1), ye = new t.Buf16(e + 1), Re = null, ke = 0, Ee, Ae, qe;
    for (U = 0; U <= e; U++)
      Be[U] = 0;
    for (M = 0; M < R; M++)
      Be[y[E + M]]++;
    for (W = P, O = e; O >= 1 && Be[O] === 0; O--)
      ;
    if (W > O && (W = O), O === 0)
      return $[I++] = 1 << 24 | 64 << 16 | 0, $[I++] = 1 << 24 | 64 << 16 | 0, A.bits = 1, 0;
    for (B = 1; B < O && Be[B] === 0; B++)
      ;
    for (W < B && (W = B), N = 1, U = 1; U <= e; U++)
      if (N <<= 1, N -= Be[U], N < 0)
        return -1;
    if (N > 0 && (p === n || O !== 1))
      return -1;
    for (ye[1] = 0, U = 1; U < e; U++)
      ye[U + 1] = ye[U] + Be[U];
    for (M = 0; M < R; M++)
      y[E + M] !== 0 && (T[ye[y[E + M]]++] = M);
    if (p === n ? (Se = Re = T, be = 19) : p === a ? (Se = s, $e -= 257, Re = l, ke -= 257, be = 256) : (Se = f, Re = u, be = -1), ce = 0, M = 0, U = B, we = I, z = W, K = 0, Y = -1, Q = 1 << W, ae = Q - 1, p === a && Q > r || p === o && Q > i)
      return 1;
    for (; ; ) {
      Ee = U - K, T[M] < be ? (Ae = 0, qe = T[M]) : T[M] > be ? (Ae = Re[ke + T[M]], qe = Se[$e + T[M]]) : (Ae = 96, qe = 0), _e = 1 << U - K, ne = 1 << z, B = ne;
      do
        ne -= _e, $[we + (ce >> K) + ne] = Ee << 24 | Ae << 16 | qe | 0;
      while (ne !== 0);
      for (_e = 1 << U - 1; ce & _e; )
        _e >>= 1;
      if (_e !== 0 ? (ce &= _e - 1, ce += _e) : ce = 0, M++, --Be[U] === 0) {
        if (U === O)
          break;
        U = y[E + T[M]];
      }
      if (U > W && (ce & ae) !== Y) {
        for (K === 0 && (K = W), we += B, z = U - K, N = 1 << z; z + K < O && (N -= Be[z + K], !(N <= 0)); )
          z++, N <<= 1;
        if (Q += 1 << z, p === a && Q > r || p === o && Q > i)
          return 1;
        Y = ce & ae, $[Y] = W << 24 | z << 16 | we - I | 0;
      }
    }
    return ce !== 0 && ($[we + ce] = U - K << 24 | 64 << 16 | 0), A.bits = W, 0;
  }, wn;
}
var Va;
function vl() {
  if (Va) return Tt;
  Va = 1;
  var t = ur(), e = os(), r = ss(), i = _l(), n = bl(), a = 0, o = 1, s = 2, l = 4, f = 5, u = 6, m = 0, p = 1, y = 2, E = -2, R = -3, $ = -4, I = -5, T = 8, A = 1, P = 2, U = 3, M = 4, B = 5, O = 6, W = 7, z = 8, K = 9, N = 10, Q = 11, ce = 12, _e = 13, ne = 14, Y = 15, ae = 16, we = 17, Se = 18, $e = 19, be = 20, Be = 21, ye = 22, Re = 23, ke = 24, Ee = 25, Ae = 26, qe = 27, rt = 28, je = 29, pe = 30, Oe = 31, Ze = 32, Me = 852, ze = 592, Ce = 15, xe = Ce;
  function ut(x) {
    return (x >>> 24 & 255) + (x >>> 8 & 65280) + ((x & 65280) << 8) + ((x & 255) << 24);
  }
  function xt() {
    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new t.Buf16(320), this.work = new t.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  function It(x) {
    var F;
    return !x || !x.state ? E : (F = x.state, x.total_in = x.total_out = F.total = 0, x.msg = "", F.wrap && (x.adler = F.wrap & 1), F.mode = A, F.last = 0, F.havedict = 0, F.dmax = 32768, F.head = null, F.hold = 0, F.bits = 0, F.lencode = F.lendyn = new t.Buf32(Me), F.distcode = F.distdyn = new t.Buf32(ze), F.sane = 1, F.back = -1, m);
  }
  function Fe(x) {
    var F;
    return !x || !x.state ? E : (F = x.state, F.wsize = 0, F.whave = 0, F.wnext = 0, It(x));
  }
  function Ve(x, F) {
    var b, ee;
    return !x || !x.state || (ee = x.state, F < 0 ? (b = 0, F = -F) : (b = (F >> 4) + 1, F < 48 && (F &= 15)), F && (F < 8 || F > 15)) ? E : (ee.window !== null && ee.wbits !== F && (ee.window = null), ee.wrap = b, ee.wbits = F, Fe(x));
  }
  function ft(x, F) {
    var b, ee;
    return x ? (ee = new xt(), x.state = ee, ee.window = null, b = Ve(x, F), b !== m && (x.state = null), b) : E;
  }
  function Ge(x) {
    return ft(x, xe);
  }
  var vt = !0, Et, Le;
  function nt(x) {
    if (vt) {
      var F;
      for (Et = new t.Buf32(512), Le = new t.Buf32(32), F = 0; F < 144; )
        x.lens[F++] = 8;
      for (; F < 256; )
        x.lens[F++] = 9;
      for (; F < 280; )
        x.lens[F++] = 7;
      for (; F < 288; )
        x.lens[F++] = 8;
      for (n(o, x.lens, 0, 288, Et, 0, x.work, { bits: 9 }), F = 0; F < 32; )
        x.lens[F++] = 5;
      n(s, x.lens, 0, 32, Le, 0, x.work, { bits: 5 }), vt = !1;
    }
    x.lencode = Et, x.lenbits = 9, x.distcode = Le, x.distbits = 5;
  }
  function k(x, F, b, ee) {
    var le, h = x.state;
    return h.window === null && (h.wsize = 1 << h.wbits, h.wnext = 0, h.whave = 0, h.window = new t.Buf8(h.wsize)), ee >= h.wsize ? (t.arraySet(h.window, F, b - h.wsize, h.wsize, 0), h.wnext = 0, h.whave = h.wsize) : (le = h.wsize - h.wnext, le > ee && (le = ee), t.arraySet(h.window, F, b - ee, le, h.wnext), ee -= le, ee ? (t.arraySet(h.window, F, b - ee, ee, 0), h.wnext = ee, h.whave = h.wsize) : (h.wnext += le, h.wnext === h.wsize && (h.wnext = 0), h.whave < h.wsize && (h.whave += le))), 0;
  }
  function c(x, F) {
    var b, ee, le, h, q, X, S, j, V, he, ue, _, w, g, D = 0, L, G, J, ve, He, Ue, Ie, De, ct = new t.Buf8(4), Vt, Mt, Ta = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!x || !x.state || !x.output || !x.input && x.avail_in !== 0)
      return E;
    b = x.state, b.mode === ce && (b.mode = _e), q = x.next_out, le = x.output, S = x.avail_out, h = x.next_in, ee = x.input, X = x.avail_in, j = b.hold, V = b.bits, he = X, ue = S, De = m;
    e:
      for (; ; )
        switch (b.mode) {
          case A:
            if (b.wrap === 0) {
              b.mode = _e;
              break;
            }
            for (; V < 16; ) {
              if (X === 0)
                break e;
              X--, j += ee[h++] << V, V += 8;
            }
            if (b.wrap & 2 && j === 35615) {
              b.check = 0, ct[0] = j & 255, ct[1] = j >>> 8 & 255, b.check = r(b.check, ct, 2, 0), j = 0, V = 0, b.mode = P;
              break;
            }
            if (b.flags = 0, b.head && (b.head.done = !1), !(b.wrap & 1) || /* check if zlib header allowed */
            (((j & 255) << 8) + (j >> 8)) % 31) {
              x.msg = "incorrect header check", b.mode = pe;
              break;
            }
            if ((j & 15) !== T) {
              x.msg = "unknown compression method", b.mode = pe;
              break;
            }
            if (j >>>= 4, V -= 4, Ie = (j & 15) + 8, b.wbits === 0)
              b.wbits = Ie;
            else if (Ie > b.wbits) {
              x.msg = "invalid window size", b.mode = pe;
              break;
            }
            b.dmax = 1 << Ie, x.adler = b.check = 1, b.mode = j & 512 ? N : ce, j = 0, V = 0;
            break;
          case P:
            for (; V < 16; ) {
              if (X === 0)
                break e;
              X--, j += ee[h++] << V, V += 8;
            }
            if (b.flags = j, (b.flags & 255) !== T) {
              x.msg = "unknown compression method", b.mode = pe;
              break;
            }
            if (b.flags & 57344) {
              x.msg = "unknown header flags set", b.mode = pe;
              break;
            }
            b.head && (b.head.text = j >> 8 & 1), b.flags & 512 && (ct[0] = j & 255, ct[1] = j >>> 8 & 255, b.check = r(b.check, ct, 2, 0)), j = 0, V = 0, b.mode = U;
          /* falls through */
          case U:
            for (; V < 32; ) {
              if (X === 0)
                break e;
              X--, j += ee[h++] << V, V += 8;
            }
            b.head && (b.head.time = j), b.flags & 512 && (ct[0] = j & 255, ct[1] = j >>> 8 & 255, ct[2] = j >>> 16 & 255, ct[3] = j >>> 24 & 255, b.check = r(b.check, ct, 4, 0)), j = 0, V = 0, b.mode = M;
          /* falls through */
          case M:
            for (; V < 16; ) {
              if (X === 0)
                break e;
              X--, j += ee[h++] << V, V += 8;
            }
            b.head && (b.head.xflags = j & 255, b.head.os = j >> 8), b.flags & 512 && (ct[0] = j & 255, ct[1] = j >>> 8 & 255, b.check = r(b.check, ct, 2, 0)), j = 0, V = 0, b.mode = B;
          /* falls through */
          case B:
            if (b.flags & 1024) {
              for (; V < 16; ) {
                if (X === 0)
                  break e;
                X--, j += ee[h++] << V, V += 8;
              }
              b.length = j, b.head && (b.head.extra_len = j), b.flags & 512 && (ct[0] = j & 255, ct[1] = j >>> 8 & 255, b.check = r(b.check, ct, 2, 0)), j = 0, V = 0;
            } else b.head && (b.head.extra = null);
            b.mode = O;
          /* falls through */
          case O:
            if (b.flags & 1024 && (_ = b.length, _ > X && (_ = X), _ && (b.head && (Ie = b.head.extra_len - b.length, b.head.extra || (b.head.extra = new Array(b.head.extra_len)), t.arraySet(
              b.head.extra,
              ee,
              h,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              _,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              Ie
            )), b.flags & 512 && (b.check = r(b.check, ee, _, h)), X -= _, h += _, b.length -= _), b.length))
              break e;
            b.length = 0, b.mode = W;
          /* falls through */
          case W:
            if (b.flags & 2048) {
              if (X === 0)
                break e;
              _ = 0;
              do
                Ie = ee[h + _++], b.head && Ie && b.length < 65536 && (b.head.name += String.fromCharCode(Ie));
              while (Ie && _ < X);
              if (b.flags & 512 && (b.check = r(b.check, ee, _, h)), X -= _, h += _, Ie)
                break e;
            } else b.head && (b.head.name = null);
            b.length = 0, b.mode = z;
          /* falls through */
          case z:
            if (b.flags & 4096) {
              if (X === 0)
                break e;
              _ = 0;
              do
                Ie = ee[h + _++], b.head && Ie && b.length < 65536 && (b.head.comment += String.fromCharCode(Ie));
              while (Ie && _ < X);
              if (b.flags & 512 && (b.check = r(b.check, ee, _, h)), X -= _, h += _, Ie)
                break e;
            } else b.head && (b.head.comment = null);
            b.mode = K;
          /* falls through */
          case K:
            if (b.flags & 512) {
              for (; V < 16; ) {
                if (X === 0)
                  break e;
                X--, j += ee[h++] << V, V += 8;
              }
              if (j !== (b.check & 65535)) {
                x.msg = "header crc mismatch", b.mode = pe;
                break;
              }
              j = 0, V = 0;
            }
            b.head && (b.head.hcrc = b.flags >> 9 & 1, b.head.done = !0), x.adler = b.check = 0, b.mode = ce;
            break;
          case N:
            for (; V < 32; ) {
              if (X === 0)
                break e;
              X--, j += ee[h++] << V, V += 8;
            }
            x.adler = b.check = ut(j), j = 0, V = 0, b.mode = Q;
          /* falls through */
          case Q:
            if (b.havedict === 0)
              return x.next_out = q, x.avail_out = S, x.next_in = h, x.avail_in = X, b.hold = j, b.bits = V, y;
            x.adler = b.check = 1, b.mode = ce;
          /* falls through */
          case ce:
            if (F === f || F === u)
              break e;
          /* falls through */
          case _e:
            if (b.last) {
              j >>>= V & 7, V -= V & 7, b.mode = qe;
              break;
            }
            for (; V < 3; ) {
              if (X === 0)
                break e;
              X--, j += ee[h++] << V, V += 8;
            }
            switch (b.last = j & 1, j >>>= 1, V -= 1, j & 3) {
              case 0:
                b.mode = ne;
                break;
              case 1:
                if (nt(b), b.mode = be, F === u) {
                  j >>>= 2, V -= 2;
                  break e;
                }
                break;
              case 2:
                b.mode = we;
                break;
              case 3:
                x.msg = "invalid block type", b.mode = pe;
            }
            j >>>= 2, V -= 2;
            break;
          case ne:
            for (j >>>= V & 7, V -= V & 7; V < 32; ) {
              if (X === 0)
                break e;
              X--, j += ee[h++] << V, V += 8;
            }
            if ((j & 65535) !== (j >>> 16 ^ 65535)) {
              x.msg = "invalid stored block lengths", b.mode = pe;
              break;
            }
            if (b.length = j & 65535, j = 0, V = 0, b.mode = Y, F === u)
              break e;
          /* falls through */
          case Y:
            b.mode = ae;
          /* falls through */
          case ae:
            if (_ = b.length, _) {
              if (_ > X && (_ = X), _ > S && (_ = S), _ === 0)
                break e;
              t.arraySet(le, ee, h, _, q), X -= _, h += _, S -= _, q += _, b.length -= _;
              break;
            }
            b.mode = ce;
            break;
          case we:
            for (; V < 14; ) {
              if (X === 0)
                break e;
              X--, j += ee[h++] << V, V += 8;
            }
            if (b.nlen = (j & 31) + 257, j >>>= 5, V -= 5, b.ndist = (j & 31) + 1, j >>>= 5, V -= 5, b.ncode = (j & 15) + 4, j >>>= 4, V -= 4, b.nlen > 286 || b.ndist > 30) {
              x.msg = "too many length or distance symbols", b.mode = pe;
              break;
            }
            b.have = 0, b.mode = Se;
          /* falls through */
          case Se:
            for (; b.have < b.ncode; ) {
              for (; V < 3; ) {
                if (X === 0)
                  break e;
                X--, j += ee[h++] << V, V += 8;
              }
              b.lens[Ta[b.have++]] = j & 7, j >>>= 3, V -= 3;
            }
            for (; b.have < 19; )
              b.lens[Ta[b.have++]] = 0;
            if (b.lencode = b.lendyn, b.lenbits = 7, Vt = { bits: b.lenbits }, De = n(a, b.lens, 0, 19, b.lencode, 0, b.work, Vt), b.lenbits = Vt.bits, De) {
              x.msg = "invalid code lengths set", b.mode = pe;
              break;
            }
            b.have = 0, b.mode = $e;
          /* falls through */
          case $e:
            for (; b.have < b.nlen + b.ndist; ) {
              for (; D = b.lencode[j & (1 << b.lenbits) - 1], L = D >>> 24, G = D >>> 16 & 255, J = D & 65535, !(L <= V); ) {
                if (X === 0)
                  break e;
                X--, j += ee[h++] << V, V += 8;
              }
              if (J < 16)
                j >>>= L, V -= L, b.lens[b.have++] = J;
              else {
                if (J === 16) {
                  for (Mt = L + 2; V < Mt; ) {
                    if (X === 0)
                      break e;
                    X--, j += ee[h++] << V, V += 8;
                  }
                  if (j >>>= L, V -= L, b.have === 0) {
                    x.msg = "invalid bit length repeat", b.mode = pe;
                    break;
                  }
                  Ie = b.lens[b.have - 1], _ = 3 + (j & 3), j >>>= 2, V -= 2;
                } else if (J === 17) {
                  for (Mt = L + 3; V < Mt; ) {
                    if (X === 0)
                      break e;
                    X--, j += ee[h++] << V, V += 8;
                  }
                  j >>>= L, V -= L, Ie = 0, _ = 3 + (j & 7), j >>>= 3, V -= 3;
                } else {
                  for (Mt = L + 7; V < Mt; ) {
                    if (X === 0)
                      break e;
                    X--, j += ee[h++] << V, V += 8;
                  }
                  j >>>= L, V -= L, Ie = 0, _ = 11 + (j & 127), j >>>= 7, V -= 7;
                }
                if (b.have + _ > b.nlen + b.ndist) {
                  x.msg = "invalid bit length repeat", b.mode = pe;
                  break;
                }
                for (; _--; )
                  b.lens[b.have++] = Ie;
              }
            }
            if (b.mode === pe)
              break;
            if (b.lens[256] === 0) {
              x.msg = "invalid code -- missing end-of-block", b.mode = pe;
              break;
            }
            if (b.lenbits = 9, Vt = { bits: b.lenbits }, De = n(o, b.lens, 0, b.nlen, b.lencode, 0, b.work, Vt), b.lenbits = Vt.bits, De) {
              x.msg = "invalid literal/lengths set", b.mode = pe;
              break;
            }
            if (b.distbits = 6, b.distcode = b.distdyn, Vt = { bits: b.distbits }, De = n(s, b.lens, b.nlen, b.ndist, b.distcode, 0, b.work, Vt), b.distbits = Vt.bits, De) {
              x.msg = "invalid distances set", b.mode = pe;
              break;
            }
            if (b.mode = be, F === u)
              break e;
          /* falls through */
          case be:
            b.mode = Be;
          /* falls through */
          case Be:
            if (X >= 6 && S >= 258) {
              x.next_out = q, x.avail_out = S, x.next_in = h, x.avail_in = X, b.hold = j, b.bits = V, i(x, ue), q = x.next_out, le = x.output, S = x.avail_out, h = x.next_in, ee = x.input, X = x.avail_in, j = b.hold, V = b.bits, b.mode === ce && (b.back = -1);
              break;
            }
            for (b.back = 0; D = b.lencode[j & (1 << b.lenbits) - 1], L = D >>> 24, G = D >>> 16 & 255, J = D & 65535, !(L <= V); ) {
              if (X === 0)
                break e;
              X--, j += ee[h++] << V, V += 8;
            }
            if (G && (G & 240) === 0) {
              for (ve = L, He = G, Ue = J; D = b.lencode[Ue + ((j & (1 << ve + He) - 1) >> ve)], L = D >>> 24, G = D >>> 16 & 255, J = D & 65535, !(ve + L <= V); ) {
                if (X === 0)
                  break e;
                X--, j += ee[h++] << V, V += 8;
              }
              j >>>= ve, V -= ve, b.back += ve;
            }
            if (j >>>= L, V -= L, b.back += L, b.length = J, G === 0) {
              b.mode = Ae;
              break;
            }
            if (G & 32) {
              b.back = -1, b.mode = ce;
              break;
            }
            if (G & 64) {
              x.msg = "invalid literal/length code", b.mode = pe;
              break;
            }
            b.extra = G & 15, b.mode = ye;
          /* falls through */
          case ye:
            if (b.extra) {
              for (Mt = b.extra; V < Mt; ) {
                if (X === 0)
                  break e;
                X--, j += ee[h++] << V, V += 8;
              }
              b.length += j & (1 << b.extra) - 1, j >>>= b.extra, V -= b.extra, b.back += b.extra;
            }
            b.was = b.length, b.mode = Re;
          /* falls through */
          case Re:
            for (; D = b.distcode[j & (1 << b.distbits) - 1], L = D >>> 24, G = D >>> 16 & 255, J = D & 65535, !(L <= V); ) {
              if (X === 0)
                break e;
              X--, j += ee[h++] << V, V += 8;
            }
            if ((G & 240) === 0) {
              for (ve = L, He = G, Ue = J; D = b.distcode[Ue + ((j & (1 << ve + He) - 1) >> ve)], L = D >>> 24, G = D >>> 16 & 255, J = D & 65535, !(ve + L <= V); ) {
                if (X === 0)
                  break e;
                X--, j += ee[h++] << V, V += 8;
              }
              j >>>= ve, V -= ve, b.back += ve;
            }
            if (j >>>= L, V -= L, b.back += L, G & 64) {
              x.msg = "invalid distance code", b.mode = pe;
              break;
            }
            b.offset = J, b.extra = G & 15, b.mode = ke;
          /* falls through */
          case ke:
            if (b.extra) {
              for (Mt = b.extra; V < Mt; ) {
                if (X === 0)
                  break e;
                X--, j += ee[h++] << V, V += 8;
              }
              b.offset += j & (1 << b.extra) - 1, j >>>= b.extra, V -= b.extra, b.back += b.extra;
            }
            if (b.offset > b.dmax) {
              x.msg = "invalid distance too far back", b.mode = pe;
              break;
            }
            b.mode = Ee;
          /* falls through */
          case Ee:
            if (S === 0)
              break e;
            if (_ = ue - S, b.offset > _) {
              if (_ = b.offset - _, _ > b.whave && b.sane) {
                x.msg = "invalid distance too far back", b.mode = pe;
                break;
              }
              _ > b.wnext ? (_ -= b.wnext, w = b.wsize - _) : w = b.wnext - _, _ > b.length && (_ = b.length), g = b.window;
            } else
              g = le, w = q - b.offset, _ = b.length;
            _ > S && (_ = S), S -= _, b.length -= _;
            do
              le[q++] = g[w++];
            while (--_);
            b.length === 0 && (b.mode = Be);
            break;
          case Ae:
            if (S === 0)
              break e;
            le[q++] = b.length, S--, b.mode = Be;
            break;
          case qe:
            if (b.wrap) {
              for (; V < 32; ) {
                if (X === 0)
                  break e;
                X--, j |= ee[h++] << V, V += 8;
              }
              if (ue -= S, x.total_out += ue, b.total += ue, ue && (x.adler = b.check = /*UPDATE(state.check, put - _out, _out);*/
              b.flags ? r(b.check, le, ue, q - ue) : e(b.check, le, ue, q - ue)), ue = S, (b.flags ? j : ut(j)) !== b.check) {
                x.msg = "incorrect data check", b.mode = pe;
                break;
              }
              j = 0, V = 0;
            }
            b.mode = rt;
          /* falls through */
          case rt:
            if (b.wrap && b.flags) {
              for (; V < 32; ) {
                if (X === 0)
                  break e;
                X--, j += ee[h++] << V, V += 8;
              }
              if (j !== (b.total & 4294967295)) {
                x.msg = "incorrect length check", b.mode = pe;
                break;
              }
              j = 0, V = 0;
            }
            b.mode = je;
          /* falls through */
          case je:
            De = p;
            break e;
          case pe:
            De = R;
            break e;
          case Oe:
            return $;
          case Ze:
          /* falls through */
          default:
            return E;
        }
    return x.next_out = q, x.avail_out = S, x.next_in = h, x.avail_in = X, b.hold = j, b.bits = V, (b.wsize || ue !== x.avail_out && b.mode < pe && (b.mode < qe || F !== l)) && k(x, x.output, x.next_out, ue - x.avail_out), he -= x.avail_in, ue -= x.avail_out, x.total_in += he, x.total_out += ue, b.total += ue, b.wrap && ue && (x.adler = b.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    b.flags ? r(b.check, le, ue, x.next_out - ue) : e(b.check, le, ue, x.next_out - ue)), x.data_type = b.bits + (b.last ? 64 : 0) + (b.mode === ce ? 128 : 0) + (b.mode === be || b.mode === Y ? 256 : 0), (he === 0 && ue === 0 || F === l) && De === m && (De = I), De;
  }
  function d(x) {
    if (!x || !x.state)
      return E;
    var F = x.state;
    return F.window && (F.window = null), x.state = null, m;
  }
  function v(x, F) {
    var b;
    return !x || !x.state || (b = x.state, (b.wrap & 2) === 0) ? E : (b.head = F, F.done = !1, m);
  }
  function C(x, F) {
    var b = F.length, ee, le, h;
    return !x || !x.state || (ee = x.state, ee.wrap !== 0 && ee.mode !== Q) ? E : ee.mode === Q && (le = 1, le = e(le, F, b, 0), le !== ee.check) ? R : (h = k(x, F, b, b), h ? (ee.mode = Oe, $) : (ee.havedict = 1, m));
  }
  return Tt.inflateReset = Fe, Tt.inflateReset2 = Ve, Tt.inflateResetKeep = It, Tt.inflateInit = Ge, Tt.inflateInit2 = ft, Tt.inflate = c, Tt.inflateEnd = d, Tt.inflateGetHeader = v, Tt.inflateSetDictionary = C, Tt.inflateInfo = "pako inflate (from Nodeca project)", Tt;
}
var pn, Xa;
function us() {
  return Xa || (Xa = 1, pn = {
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
  }), pn;
}
var mn, Ya;
function El() {
  if (Ya) return mn;
  Ya = 1;
  function t() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
  }
  return mn = t, mn;
}
var Ka;
function kl() {
  if (Ka) return Tr;
  Ka = 1;
  var t = vl(), e = ur(), r = cs(), i = us(), n = fa(), a = ls(), o = El(), s = Object.prototype.toString;
  function l(m) {
    if (!(this instanceof l)) return new l(m);
    this.options = e.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, m || {});
    var p = this.options;
    p.raw && p.windowBits >= 0 && p.windowBits < 16 && (p.windowBits = -p.windowBits, p.windowBits === 0 && (p.windowBits = -15)), p.windowBits >= 0 && p.windowBits < 16 && !(m && m.windowBits) && (p.windowBits += 32), p.windowBits > 15 && p.windowBits < 48 && (p.windowBits & 15) === 0 && (p.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new a(), this.strm.avail_out = 0;
    var y = t.inflateInit2(
      this.strm,
      p.windowBits
    );
    if (y !== i.Z_OK)
      throw new Error(n[y]);
    if (this.header = new o(), t.inflateGetHeader(this.strm, this.header), p.dictionary && (typeof p.dictionary == "string" ? p.dictionary = r.string2buf(p.dictionary) : s.call(p.dictionary) === "[object ArrayBuffer]" && (p.dictionary = new Uint8Array(p.dictionary)), p.raw && (y = t.inflateSetDictionary(this.strm, p.dictionary), y !== i.Z_OK)))
      throw new Error(n[y]);
  }
  l.prototype.push = function(m, p) {
    var y = this.strm, E = this.options.chunkSize, R = this.options.dictionary, $, I, T, A, P, U = !1;
    if (this.ended)
      return !1;
    I = p === ~~p ? p : p === !0 ? i.Z_FINISH : i.Z_NO_FLUSH, typeof m == "string" ? y.input = r.binstring2buf(m) : s.call(m) === "[object ArrayBuffer]" ? y.input = new Uint8Array(m) : y.input = m, y.next_in = 0, y.avail_in = y.input.length;
    do {
      if (y.avail_out === 0 && (y.output = new e.Buf8(E), y.next_out = 0, y.avail_out = E), $ = t.inflate(y, i.Z_NO_FLUSH), $ === i.Z_NEED_DICT && R && ($ = t.inflateSetDictionary(this.strm, R)), $ === i.Z_BUF_ERROR && U === !0 && ($ = i.Z_OK, U = !1), $ !== i.Z_STREAM_END && $ !== i.Z_OK)
        return this.onEnd($), this.ended = !0, !1;
      y.next_out && (y.avail_out === 0 || $ === i.Z_STREAM_END || y.avail_in === 0 && (I === i.Z_FINISH || I === i.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (T = r.utf8border(y.output, y.next_out), A = y.next_out - T, P = r.buf2string(y.output, T), y.next_out = A, y.avail_out = E - A, A && e.arraySet(y.output, y.output, T, A, 0), this.onData(P)) : this.onData(e.shrinkBuf(y.output, y.next_out))), y.avail_in === 0 && y.avail_out === 0 && (U = !0);
    } while ((y.avail_in > 0 || y.avail_out === 0) && $ !== i.Z_STREAM_END);
    return $ === i.Z_STREAM_END && (I = i.Z_FINISH), I === i.Z_FINISH ? ($ = t.inflateEnd(this.strm), this.onEnd($), this.ended = !0, $ === i.Z_OK) : (I === i.Z_SYNC_FLUSH && (this.onEnd(i.Z_OK), y.avail_out = 0), !0);
  }, l.prototype.onData = function(m) {
    this.chunks.push(m);
  }, l.prototype.onEnd = function(m) {
    m === i.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = m, this.msg = this.strm.msg;
  };
  function f(m, p) {
    var y = new l(p);
    if (y.push(m, !0), y.err)
      throw y.msg || n[y.err];
    return y.result;
  }
  function u(m, p) {
    return p = p || {}, p.raw = !0, f(m, p);
  }
  return Tr.Inflate = l, Tr.inflate = f, Tr.inflateRaw = u, Tr.ungzip = f, Tr;
}
var gn, Ja;
function Sl() {
  if (Ja) return gn;
  Ja = 1;
  var t = ur().assign, e = yl(), r = kl(), i = us(), n = {};
  return t(n, e, r, i), gn = n, gn;
}
var xl = Sl(), ha = /* @__PURE__ */ rr(xl), yn, Qa;
function Il() {
  if (Qa) return yn;
  Qa = 1;
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
  return yn = (e, r) => {
    r = Object.assign({
      exclude: [/.+(Sync|Stream)$/],
      errorFirst: !0,
      promiseModule: Promise
    }, r);
    const i = typeof e;
    if (!(e !== null && (i === "object" || i === "function")))
      throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${e === null ? "null" : i}\``);
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
  }, yn;
}
var Tl = Il(), _n = /* @__PURE__ */ rr(Tl), bn, eo;
function $l() {
  if (eo) return bn;
  eo = 1;
  function t(ne) {
    return Array.isArray(ne) ? ne : [ne];
  }
  const e = "", r = " ", i = "\\", n = /^\s+$/, a = /(?:[^\\]|^)\\$/, o = /^\\!/, s = /^\\#/, l = /\r?\n/g, f = /^\.*\/|^\.+$/, u = "/";
  let m = "node-ignore";
  typeof Symbol < "u" && (m = Symbol.for("node-ignore"));
  const p = m, y = (ne, Y, ae) => Object.defineProperty(ne, Y, { value: ae }), E = /([0-z])-([0-z])/g, R = () => !1, $ = (ne) => ne.replace(
    E,
    (Y, ae, we) => ae.charCodeAt(0) <= we.charCodeAt(0) ? Y : e
  ), I = (ne) => {
    const { length: Y } = ne;
    return ne.slice(0, Y - Y % 2);
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
      (ne, Y, ae) => Y + (ae.indexOf("\\") === 0 ? r : e)
    ],
    // replace (\ ) with ' '
    // (\ ) -> ' '
    // (\\ ) -> '\\ '
    // (\\\ ) -> '\\ '
    [
      /(\\+?)\s/g,
      (ne, Y) => {
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
      (ne) => `\\${ne}`
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
      (ne, Y, ae) => Y + 6 < ae.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
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
      (ne, Y, ae) => {
        const we = ae.replace(/\\\*/g, "[^\\/]*");
        return Y + we;
      }
    ],
    [
      // unescape, revert step 3 except for back slash
      // For example, if a user escape a '\\*',
      // after step 3, the result will be '\\\\\\*'
      /\\\\\\(?=[$.|*+(){^])/g,
      () => i
    ],
    [
      // '\\\\' -> '\\'
      /\\\\/g,
      () => i
    ],
    [
      // > The range notation, e.g. [a-zA-Z],
      // > can be used to match one of the characters in a range.
      // `\` is escaped by step 3
      /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
      (ne, Y, ae, we, Se) => Y === i ? `\\[${ae}${I(we)}${Se}` : Se === "]" && we.length % 2 === 0 ? `[${$(ae)}${we}]` : "[]"
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
      (ne) => /\/$/.test(ne) ? `${ne}$` : `${ne}(?=$|\\/$)`
    ],
    // trailing wildcard
    [
      /(\^|\\\/)?\\\*$/,
      (ne, Y) => `${Y ? `${Y}[^/]+` : "[^/]*"}(?=$|\\/$)`
    ]
  ], A = /* @__PURE__ */ Object.create(null), P = (ne, Y) => {
    let ae = A[ne];
    return ae || (ae = T.reduce(
      (we, [Se, $e]) => we.replace(Se, $e.bind(ne)),
      ne
    ), A[ne] = ae), Y ? new RegExp(ae, "i") : new RegExp(ae);
  }, U = (ne) => typeof ne == "string", M = (ne) => ne && U(ne) && !n.test(ne) && !a.test(ne) && ne.indexOf("#") !== 0, B = (ne) => ne.split(l);
  class O {
    constructor(Y, ae, we, Se) {
      this.origin = Y, this.pattern = ae, this.negative = we, this.regex = Se;
    }
  }
  const W = (ne, Y) => {
    const ae = ne;
    let we = !1;
    ne.indexOf("!") === 0 && (we = !0, ne = ne.substr(1)), ne = ne.replace(o, "!").replace(s, "#");
    const Se = P(ne, Y);
    return new O(
      ae,
      ne,
      we,
      Se
    );
  }, z = (ne, Y) => {
    throw new Y(ne);
  }, K = (ne, Y, ae) => U(ne) ? ne ? K.isNotRelative(ne) ? ae(
    `path should be a \`path.relative()\`d string, but got "${Y}"`,
    RangeError
  ) : !0 : ae("path must not be empty", TypeError) : ae(
    `path must be a string, but got \`${Y}\``,
    TypeError
  ), N = (ne) => f.test(ne);
  K.isNotRelative = N, K.convert = (ne) => ne;
  class Q {
    constructor({
      ignorecase: Y = !0,
      ignoreCase: ae = Y,
      allowRelativePaths: we = !1
    } = {}) {
      y(this, p, !0), this._rules = [], this._ignoreCase = ae, this._allowRelativePaths = we, this._initCache();
    }
    _initCache() {
      this._ignoreCache = /* @__PURE__ */ Object.create(null), this._testCache = /* @__PURE__ */ Object.create(null);
    }
    _addPattern(Y) {
      if (Y && Y[p]) {
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
        U(Y) ? B(Y) : Y
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
      let we = !1, Se = !1;
      return this._rules.forEach(($e) => {
        const { negative: be } = $e;
        if (Se === be && we !== Se || be && !we && !Se && !ae)
          return;
        $e.regex.test(Y) && (we = !be, Se = be);
      }), {
        ignored: we,
        unignored: Se
      };
    }
    // @returns {TestResult}
    _test(Y, ae, we, Se) {
      const $e = Y && K.convert(Y);
      return K(
        $e,
        Y,
        this._allowRelativePaths ? R : z
      ), this._t($e, ae, we, Se);
    }
    _t(Y, ae, we, Se) {
      if (Y in ae)
        return ae[Y];
      if (Se || (Se = Y.split(u)), Se.pop(), !Se.length)
        return ae[Y] = this._testOne(Y, we);
      const $e = this._t(
        Se.join(u) + u,
        ae,
        we,
        Se
      );
      return ae[Y] = $e.ignored ? $e : this._testOne(Y, we);
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
  const ce = (ne) => new Q(ne), _e = (ne) => K(ne && K.convert(ne), ne, R);
  if (ce.isPathValid = _e, ce.default = ce, bn = ce, // Detect `process` so that it can run in browsers.
  typeof gt < "u" && (gt.env && gt.env.IGNORE_TEST_WIN32 || gt.platform === "win32")) {
    const ne = (ae) => /^\\\\\?\\/.test(ae) || /["<>|\u0000-\u001F]+/u.test(ae) ? ae : ae.replace(/\\/g, "/");
    K.convert = ne;
    const Y = /^[a-z]:\//i;
    K.isNotRelative = (ae) => Y.test(ae) || N(ae);
  }
  return bn;
}
var Rl = $l(), Dl = /* @__PURE__ */ rr(Rl), vn, to;
function Bl() {
  if (to) return vn;
  to = 1;
  function t(i) {
    return i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function e(i, n, a) {
    return n = n instanceof RegExp ? n : new RegExp(t(n), "g"), i.replace(n, a);
  }
  var r = {
    clean: function(n) {
      if (typeof n != "string")
        throw new Error("Expected a string, received: " + n);
      return n = e(n, "./", "/"), n = e(n, "..", "."), n = e(n, " ", "-"), n = e(n, /^[~^:?*\\\-]/g, ""), n = e(n, /[~^:?*\\]/g, "-"), n = e(n, /[~^:?*\\\-]$/g, ""), n = e(n, "@{", "-"), n = e(n, /\.$/g, ""), n = e(n, /\/$/g, ""), n = e(n, /\.lock$/g, ""), n;
    }
  };
  return vn = r, vn;
}
var Al = Bl(), Ht = /* @__PURE__ */ rr(Al), En, ro;
function Ol() {
  return ro || (ro = 1, En = function(t, e) {
    var r = t, i = e, n = r.length, a = i.length, o = !1, s = null, l = n + 1, f = [], u = [], m = [], p = "", y = -1, E = 0, R = 1, $, I, T = function() {
      n >= a && ($ = r, I = n, r = i, i = $, n = a, a = I, o = !0, l = n + 1);
    }, A = function(B, O, W) {
      return {
        x: B,
        y: O,
        k: W
      };
    }, P = function(B, O) {
      return {
        elem: B,
        t: O
      };
    }, U = function(B, O, W) {
      var z, K, N;
      for (O > W ? z = f[B - 1 + l] : z = f[B + 1 + l], N = Math.max(O, W), K = N - B; K < n && N < a && r[K] === i[N]; )
        ++K, ++N;
      return f[B + l] = u.length, u[u.length] = new A(K, N, z), N;
    }, M = function(B) {
      var O, W, z;
      for (O = W = 0, z = B.length - 1; z >= 0; --z)
        for (; O < B[z].x || W < B[z].y; )
          B[z].y - B[z].x > W - O ? (o ? m[m.length] = new P(i[W], y) : m[m.length] = new P(i[W], R), ++W) : B[z].y - B[z].x < W - O ? (o ? m[m.length] = new P(r[O], R) : m[m.length] = new P(r[O], y), ++O) : (m[m.length] = new P(r[O], E), p += r[O], ++O, ++W);
    };
    return T(), {
      SES_DELETE: -1,
      SES_COMMON: 0,
      SES_ADD: 1,
      editdistance: function() {
        return s;
      },
      getlcs: function() {
        return p;
      },
      getses: function() {
        return m;
      },
      compose: function() {
        var B, O, W, z, K, N, Q, ce;
        for (B = a - n, O = n + a + 3, W = {}, Q = 0; Q < O; ++Q)
          W[Q] = -1, f[Q] = -1;
        z = -1;
        do {
          for (++z, ce = -z; ce <= B - 1; ++ce)
            W[ce + l] = U(ce, W[ce - 1 + l] + 1, W[ce + 1 + l]);
          for (ce = B + z; ce >= B + 1; --ce)
            W[ce + l] = U(ce, W[ce - 1 + l] + 1, W[ce + 1 + l]);
          W[B + l] = U(B, W[B - 1 + l] + 1, W[B + 1 + l]);
        } while (W[B + l] !== a);
        for (s = B + 2 * z, K = f[B + l], N = []; K !== -1; )
          N[N.length] = new A(u[K].x, u[K].y, null), K = u[K].k;
        M(N);
      }
    };
  }), En;
}
var kn, io;
function Cl() {
  if (io) return kn;
  io = 1;
  var t = Ol();
  function e(a, o) {
    var s = new t(a, o);
    s.compose();
    for (var l = s.getses(), f, u, m = a.length - 1, p = o.length - 1, y = l.length - 1; y >= 0; --y)
      l[y].t === s.SES_COMMON ? (u ? (u.chain = {
        file1index: m,
        file2index: p,
        chain: null
      }, u = u.chain) : (f = {
        file1index: m,
        file2index: p,
        chain: null
      }, u = f), m--, p--) : l[y].t === s.SES_DELETE ? m-- : l[y].t === s.SES_ADD && p--;
    var E = {
      file1index: -1,
      file2index: -1,
      chain: null
    };
    return u ? (u.chain = E, f) : E;
  }
  function r(a, o) {
    for (var s = [], l = a.length, f = o.length, u = e(a, o); u !== null; u = u.chain) {
      var m = l - u.file1index - 1, p = f - u.file2index - 1;
      l = u.file1index, f = u.file2index, (m || p) && s.push({
        file1: [l + 1, m],
        file2: [f + 1, p]
      });
    }
    return s.reverse(), s;
  }
  function i(a, o, s) {
    var l, f = r(o, a), u = r(o, s), m = [];
    function p(ae, we) {
      m.push([ae.file1[0], we, ae.file1[1], ae.file2[0], ae.file2[1]]);
    }
    for (l = 0; l < f.length; l++)
      p(f[l], 0);
    for (l = 0; l < u.length; l++)
      p(u[l], 2);
    m.sort(function(ae, we) {
      return ae[0] - we[0];
    });
    var y = [], E = 0;
    function R(ae) {
      ae > E && (y.push([1, E, ae - E]), E = ae);
    }
    for (var $ = 0; $ < m.length; $++) {
      for (var I = $, T = m[$], A = T[0], P = A + T[2]; $ < m.length - 1; ) {
        var U = m[$ + 1], M = U[0];
        if (M > P) break;
        P = Math.max(P, M + U[2]), $++;
      }
      if (R(A), I == $)
        T[4] > 0 && y.push([T[1], T[3], T[4]]);
      else {
        var B = {
          0: [a.length, -1, o.length, -1],
          2: [s.length, -1, o.length, -1]
        };
        for (l = I; l <= $; l++) {
          T = m[l];
          var O = T[1], W = B[O], z = T[0], K = z + T[2], N = T[3], Q = N + T[4];
          W[0] = Math.min(N, W[0]), W[1] = Math.max(Q, W[1]), W[2] = Math.min(z, W[2]), W[3] = Math.max(K, W[3]);
        }
        var ce = B[0][0] + (A - B[0][2]), _e = B[0][1] + (P - B[0][3]), ne = B[2][0] + (A - B[2][2]), Y = B[2][1] + (P - B[2][3]);
        y.push([
          -1,
          ce,
          _e - ce,
          A,
          P - A,
          ne,
          Y - ne
        ]);
      }
      E = P;
    }
    return R(o.length), y;
  }
  function n(a, o, s) {
    var l = [], f = [a, o, s], u = i(a, o, s), m = [];
    function p() {
      m.length && l.push({
        ok: m
      }), m = [];
    }
    function y(T) {
      for (var A = 0; A < T.length; A++)
        m.push(T[A]);
    }
    function E(T) {
      if (T[2] != T[6]) return !0;
      for (var A = T[1], P = T[5], U = 0; U < T[2]; U++)
        if (a[U + A] != s[U + P]) return !0;
      return !1;
    }
    for (var R = 0; R < u.length; R++) {
      var $ = u[R], I = $[0];
      I == -1 ? E($) ? (p(), l.push({
        conflict: {
          a: a.slice($[1], $[1] + $[2]),
          aIndex: $[1],
          o: o.slice($[3], $[3] + $[4]),
          oIndex: $[3],
          b: s.slice($[5], $[5] + $[6]),
          bIndex: $[5]
        }
      })) : y(f[0].slice($[1], $[1] + $[2])) : y(f[I].slice($[1], $[1] + $[2]));
    }
    return p(), l;
  }
  return kn = n, kn;
}
var Nl = Cl(), Fl = /* @__PURE__ */ rr(Nl);
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
class ii extends Ne {
  /**
   * @param {Array<string>} filepaths
   */
  constructor(e) {
    super(
      `Modifying the index is not possible because you have unmerged files: ${e.toString}. Fix them up in the work tree, and then use 'git add/rm as appropriate to mark resolution and make a commit.`
    ), this.code = this.name = ii.code, this.data = { filepaths: e };
  }
}
ii.code = "UnmergedPathsError";
class Te extends Ne {
  /**
   * @param {string} message
   */
  constructor(e) {
    super(
      `An internal error caused this command to fail. Please file a bug report at https://github.com/isomorphic-git/isomorphic-git/issues with this error message: ${e}`
    ), this.code = this.name = Te.code, this.data = { message: e };
  }
}
Te.code = "InternalError";
class Ur extends Ne {
  /**
   * @param {string} filepath
   */
  constructor(e) {
    super(`The filepath "${e}" contains unsafe character sequences`), this.code = this.name = Ur.code, this.data = { filepath: e };
  }
}
Ur.code = "UnsafeFilepathError";
class zt {
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
function qi(t, e) {
  return -(t < e) || +(t > e);
}
function fs(t, e) {
  return qi(t.path, e.path);
}
function hs(t) {
  let e = t > 0 ? t >> 12 : 0;
  e !== 4 && e !== 8 && e !== 10 && e !== 14 && (e = 8);
  let r = t & 511;
  return r & 73 ? r = 493 : r = 420, e !== 8 && (r = 0), (e << 12) + r;
}
const Ut = 2 ** 32;
function no(t, e, r, i) {
  if (t !== void 0 && e !== void 0)
    return [t, e];
  r === void 0 && (r = i.valueOf());
  const n = Math.floor(r / 1e3), a = (r - n * 1e3) * 1e6;
  return [n, a];
}
function Rr(t) {
  const [e, r] = no(
    t.ctimeSeconds,
    t.ctimeNanoseconds,
    t.ctimeMs,
    t.ctime
  ), [i, n] = no(
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
    mode: hs(t.mode % Ut),
    uid: t.uid % Ut,
    gid: t.gid % Ut,
    // size of -1 happens over a BrowserFS HTTP Backend that doesn't serve Content-Length headers
    // (like the Karma webserver) because BrowserFS HTTP Backend uses HTTP HEAD requests to do fs.stat
    size: t.size > -1 ? t.size % Ut : 0
  };
}
function Ml(t) {
  let e = "";
  for (const r of new Uint8Array(t))
    r < 16 && (e += "0"), e += r.toString(16);
  return e;
}
let Sn = null;
async function Jt(t) {
  return Sn === null && (Sn = await Ll()), Sn ? ds(t) : Ul(t);
}
function Ul(t) {
  return new as().update(t).digest("hex");
}
async function ds(t) {
  const e = await crypto.subtle.digest("SHA-1", t);
  return Ml(e);
}
async function Ll() {
  try {
    if (await ds(new Uint8Array([])) === "da39a3ee5e6b4b0d3255bfef95601890afd80709") return !0;
  } catch {
  }
  return !1;
}
function Pl(t) {
  return {
    assumeValid: !!(t & 32768),
    extended: !!(t & 16384),
    stage: (t & 12288) >> 12,
    nameLength: t & 4095
  };
}
function jl(t) {
  const e = t.flags;
  return e.extended = !1, e.nameLength = Math.min(fe.from(t.path).length, 4095), (e.assumeValid ? 32768 : 0) + (e.extended ? 16384 : 0) + ((e.stage & 3) << 12) + (e.nameLength & 4095);
}
class yr {
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
      return yr.fromBuffer(e);
    if (e === null)
      return new yr(null);
    throw new Te("invalid type passed to GitIndex.from");
  }
  static async fromBuffer(e) {
    if (e.length === 0)
      throw new Te("Index file is empty (.git/index)");
    const r = new yr(), i = new zt(e), n = i.toString("utf8", 4);
    if (n !== "DIRC")
      throw new Te(`Invalid dircache magic file number: ${n}`);
    const a = await Jt(e.slice(0, -20)), o = e.slice(-20).toString("hex");
    if (o !== a)
      throw new Te(
        `Invalid checksum in GitIndex buffer: expected ${o} but saw ${a}`
      );
    const s = i.readUInt32BE();
    if (s !== 2)
      throw new Te(`Unsupported dircache version: ${s}`);
    const l = i.readUInt32BE();
    let f = 0;
    for (; !i.eof() && f < l; ) {
      const u = {};
      u.ctimeSeconds = i.readUInt32BE(), u.ctimeNanoseconds = i.readUInt32BE(), u.mtimeSeconds = i.readUInt32BE(), u.mtimeNanoseconds = i.readUInt32BE(), u.dev = i.readUInt32BE(), u.ino = i.readUInt32BE(), u.mode = i.readUInt32BE(), u.uid = i.readUInt32BE(), u.gid = i.readUInt32BE(), u.size = i.readUInt32BE(), u.oid = i.slice(20).toString("hex");
      const m = i.readUInt16BE();
      u.flags = Pl(m);
      const p = e.indexOf(0, i.tell() + 1) - i.tell();
      if (p < 1)
        throw new Te(`Got a path length of: ${p}`);
      if (u.path = i.toString("utf8", p), u.path.includes("..\\") || u.path.includes("../"))
        throw new Ur(u.path);
      let y = 8 - (i.tell() - 12) % 8;
      for (y === 0 && (y = 8); y--; ) {
        const E = i.readUInt8();
        if (E !== 0)
          throw new Te(
            `Expected 1-8 null characters but got '${E}' after ${u.path}`
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
    return [...this._entries.values()].sort(fs);
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
    }), r = Rr(r);
    const a = fe.from(e), o = {
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
    return this.entries.map((e) => `${e.mode.toString(8)} ${e.oid}    ${e.path}`).join(`
`);
  }
  static async _entryToBuffer(e) {
    const r = fe.from(e.path), i = Math.ceil((62 + r.length + 1) / 8) * 8, n = fe.alloc(i), a = new zt(n), o = Rr(e);
    return a.writeUInt32BE(o.ctimeSeconds), a.writeUInt32BE(o.ctimeNanoseconds), a.writeUInt32BE(o.mtimeSeconds), a.writeUInt32BE(o.mtimeNanoseconds), a.writeUInt32BE(o.dev), a.writeUInt32BE(o.ino), a.writeUInt32BE(o.mode), a.writeUInt32BE(o.uid), a.writeUInt32BE(o.gid), a.writeUInt32BE(o.size), a.write(e.oid, 20, "hex"), a.writeUInt16BE(jl(e)), a.write(e.path, r.length, "utf8"), n;
  }
  async toObject() {
    const e = fe.alloc(12), r = new zt(e);
    r.write("DIRC", 4, "utf8"), r.writeUInt32BE(2), r.writeUInt32BE(this.entriesFlat.length);
    let i = [];
    for (const s of this.entries)
      if (i.push(yr._entryToBuffer(s)), s.stages.length > 1)
        for (const l of s.stages)
          l && l !== s && i.push(yr._entryToBuffer(l));
    i = await Promise.all(i);
    const n = fe.concat(i), a = fe.concat([e, n]), o = await Jt(a);
    return fe.concat([a, fe.from(o, "hex")]);
  }
}
function Ci(t, e, r = !0, i = !0) {
  const n = Rr(t), a = Rr(e);
  return r && n.mode !== a.mode || n.mtimeSeconds !== a.mtimeSeconds || n.ctimeSeconds !== a.ctimeSeconds || n.uid !== a.uid || n.gid !== a.gid || i && n.ino !== a.ino || n.size !== a.size;
}
let xn = null;
const In = Symbol("IndexCache");
function zl() {
  return {
    map: /* @__PURE__ */ new Map(),
    stats: /* @__PURE__ */ new Map()
  };
}
async function Hl(t, e, r) {
  const [i, n] = await Promise.all([
    t.lstat(e),
    t.read(e)
  ]), a = await yr.from(n);
  r.map.set(e, a), r.stats.set(e, i);
}
async function Wl(t, e, r) {
  const i = r.stats.get(e);
  if (i === void 0) return !0;
  if (i === null) return !1;
  const n = await t.lstat(e);
  return n === null ? !1 : Ci(i, n);
}
class ot {
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
    i[In] || (i[In] = zl());
    const o = `${r}/index`;
    xn === null && (xn = new Qr({ maxPending: 1 / 0 }));
    let s, l = [];
    return await xn.acquire(o, async () => {
      const f = i[In];
      await Wl(e, o, f) && await Hl(e, o, f);
      const u = f.map.get(o);
      if (l = u.unmergedPaths, l.length && !n)
        throw new ii(l);
      if (s = await a(u), u._dirty) {
        const m = await u.toObject();
        await e.write(o, m), f.stats.set(o, await e.lstat(o)), u._dirty = !1;
      }
    }), s;
  }
}
function Ni(t) {
  const e = Math.max(t.lastIndexOf("/"), t.lastIndexOf("\\"));
  return e > -1 && (t = t.slice(e + 1)), t;
}
function Dr(t) {
  const e = Math.max(t.lastIndexOf("/"), t.lastIndexOf("\\"));
  return e === -1 ? "." : e === 0 ? "/" : t.slice(0, e);
}
function ws(t) {
  const e = /* @__PURE__ */ new Map(), r = function(n) {
    if (!e.has(n)) {
      const a = {
        type: "tree",
        fullpath: n,
        basename: Ni(n),
        metadata: {},
        children: []
      };
      e.set(n, a), a.parent = r(Dr(n)), a.parent && a.parent !== a && a.parent.children.push(a);
    }
    return e.get(n);
  }, i = function(n, a) {
    if (!e.has(n)) {
      const o = {
        type: "blob",
        fullpath: n,
        basename: Ni(n),
        metadata: a,
        // This recursively generates any missing parent folders.
        parent: r(Dr(n)),
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
function ql(t) {
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
  throw new Te(`Unexpected GitTree entry mode: ${t.toString(8)}`);
}
class Gl {
  constructor({ fs: e, gitdir: r, cache: i }) {
    this.treePromise = ot.acquire(
      { fs: e, gitdir: r, cache: i },
      async function(a) {
        return ws(a.entries);
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
      throw new Error(`ENOTDIR: not a directory, scandir '${r}'`);
    const a = n.children.map((o) => o.fullpath);
    return a.sort(qi), a;
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
          `ENOENT: no such file or directory, lstat '${e._fullpath}'`
        );
      const n = i.type === "tree" ? {} : Rr(i.metadata);
      e._type = i.type === "tree" ? "tree" : ql(n.mode), e._mode = n.mode, i.type === "tree" ? e._stat = void 0 : e._stat = n;
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
const Gi = Symbol("GitWalkSymbol");
function Lr() {
  const t = /* @__PURE__ */ Object.create(null);
  return Object.defineProperty(t, Gi, {
    value: function({ fs: e, gitdir: r, cache: i }) {
      return new Gl({ fs: e, gitdir: r, cache: i });
    }
  }), Object.freeze(t), t;
}
class Pe extends Ne {
  /**
   * @param {string} what
   */
  constructor(e) {
    super(`Could not find ${e}.`), this.code = this.name = Pe.code, this.data = { what: e };
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
      `Object ${e} ${n ? `at ${n}` : ""}was anticipated to be a ${i} but it is a ${r}.`
    ), this.code = this.name = pt.code, this.data = { oid: e, actual: r, expected: i, filepath: n };
  }
}
pt.code = "ObjectTypeError";
class or extends Ne {
  /**
   * @param {string} value
   */
  constructor(e) {
    super(`Expected a 40-char hex object id but saw "${e}".`), this.code = this.name = or.code, this.data = { value: e };
  }
}
or.code = "InvalidOidError";
class ni extends Ne {
  /**
   * @param {string} remote
   */
  constructor(e) {
    super(`Could not find a fetch refspec for remote "${e}". Make sure the config file has an entry like the following:
[remote "${e}"]
	fetch = +refs/heads/*:refs/remotes/origin/*
`), this.code = this.name = ni.code, this.data = { remote: e };
  }
}
ni.code = "NoRefspecError";
class Fi {
  constructor(e) {
    if (this.refs = /* @__PURE__ */ new Map(), this.parsedConfig = [], e) {
      let r = null;
      this.parsedConfig = e.trim().split(`
`).map((i) => {
        if (/^\s*#/.test(i))
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
    return new Fi(e);
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
class Mi {
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
    ] = e.match(/^(\+?)(.*?)(\*?):(.*?)(\*?)$/).slice(1), s = r === "+", l = n === "*";
    if (l !== (o === "*"))
      throw new Te("Invalid refspec");
    return new Mi({
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
class da {
  constructor(e = []) {
    this.rules = e;
  }
  static from(e) {
    const r = [];
    for (const i of e)
      r.push(Mi.from(i));
    return new da(r);
  }
  add(e) {
    const r = Mi.from(e);
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
    return this.rules.filter((e) => e.matchPrefix).map((e) => e.localPath.replace(/\/$/, ""));
  }
}
function Zl(t, e) {
  const r = t.replace(/\^\{\}$/, ""), i = e.replace(/\^\{\}$/, ""), n = -(r < i) || +(r > i);
  return n === 0 ? t.endsWith("^{}") ? 1 : -1 : n;
}
const Vl = (t) => {
  if (typeof t == "number")
    return t;
  t = t.toLowerCase();
  let e = parseInt(t);
  return t.endsWith("k") && (e *= 1024), t.endsWith("m") && (e *= 1024 * 1024), t.endsWith("g") && (e *= 1024 * 1024 * 1024), e;
}, Yr = (t) => {
  if (typeof t == "boolean")
    return t;
  if (t = t.trim().toLowerCase(), t === "true" || t === "yes" || t === "on") return !0;
  if (t === "false" || t === "no" || t === "off") return !1;
  throw Error(
    `Expected 'true', 'false', 'yes', 'no', 'on', or 'off', but got ${t}`
  );
}, ao = {
  core: {
    filemode: Yr,
    bare: Yr,
    logallrefupdates: Yr,
    symlinks: Yr,
    ignorecase: Yr,
    bigFileThreshold: Vl
  }
}, Xl = /^\[([A-Za-z0-9-.]+)(?: "(.*)")?\]$/, Yl = /^[A-Za-z0-9-.]+$/, Kl = /^([A-Za-z][A-Za-z-]*)(?: *= *(.*))?$/, Jl = /^[A-Za-z][A-Za-z-]*$/, Ql = /^(.*?)( *[#;].*)$/, eu = (t) => {
  const e = Xl.exec(t);
  if (e != null) {
    const [r, i] = e.slice(1);
    return [r, i];
  }
  return null;
}, tu = (t) => {
  const e = Kl.exec(t);
  if (e != null) {
    const [r, i = "true"] = e.slice(1), n = ru(i), a = iu(n);
    return [r, a];
  }
  return null;
}, ru = (t) => {
  const e = Ql.exec(t);
  if (e == null)
    return t;
  const [r, i] = e.slice(1);
  return oo(r) && oo(i) ? `${r}${i}` : r;
}, oo = (t) => (t.match(/(?:^|[^\\])"/g) || []).length % 2 !== 0, iu = (t) => t.split("").reduce((e, r, i, n) => {
  const a = r === '"' && n[i - 1] !== "\\", o = r === "\\" && n[i + 1] === '"';
  return a || o ? e : e + r;
}, ""), so = (t) => t != null ? t.toLowerCase() : null, ta = (t, e, r) => [so(t), e, so(r)].filter((i) => i != null).join("."), co = (t) => {
  const e = t.split("."), r = e.shift(), i = e.pop(), n = e.length ? e.join(".") : void 0;
  return {
    section: r,
    subsection: n,
    name: i,
    path: ta(r, n, i),
    sectionPath: ta(r, n, null),
    isSection: !!r
  };
}, nu = (t, e) => t.reduce((r, i, n) => e(i) ? n : r, -1);
class wa {
  constructor(e) {
    let r = null, i = null;
    this.parsedConfig = e ? e.split(`
`).map((n) => {
      let a = null, o = null;
      const s = n.trim(), l = eu(s), f = l != null;
      if (f)
        [r, i] = l;
      else {
        const m = tu(s);
        m != null && ([a, o] = m);
      }
      const u = ta(r, i, a);
      return { line: n, isSection: f, section: r, subsection: i, name: a, value: o, path: u };
    }) : [];
  }
  static from(e) {
    return new wa(e);
  }
  async get(e, r = !1) {
    const i = co(e).path, n = this.parsedConfig.filter((a) => a.path === i).map(({ section: a, name: o, value: s }) => {
      const l = ao[a] && ao[a][o];
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
    } = co(e), u = nu(
      this.parsedConfig,
      (m) => m.path === s
    );
    if (r == null)
      u !== -1 && this.parsedConfig.splice(u, 1);
    else if (u !== -1) {
      const m = this.parsedConfig[u], p = Object.assign({}, m, {
        name: o,
        value: r,
        modified: !0
      });
      i ? this.parsedConfig.splice(u + 1, 0, p) : this.parsedConfig[u] = p;
    } else {
      const m = this.parsedConfig.findIndex(
        (y) => y.path === l
      ), p = {
        section: n,
        subsection: a,
        name: o,
        value: r,
        modified: !0,
        path: s
      };
      if (Yl.test(n) && Jl.test(o))
        if (m >= 0)
          this.parsedConfig.splice(m + 1, 0, p);
        else {
          const y = {
            isSection: f,
            section: n,
            subsection: a,
            modified: !0,
            path: l
          };
          this.parsedConfig.push(y, p);
        }
    }
  }
  toString() {
    return this.parsedConfig.map(({ line: e, section: r, subsection: i, name: n, value: a, modified: o = !1 }) => o ? n != null && a != null ? typeof a == "string" && /[#;]/.test(a) ? `	${n} = "${a}"` : `	${n} = ${a}` : i != null ? `[${r} "${i}"]` : `[${r}]` : e).join(`
`);
  }
}
class it {
  static async get({ fs: e, gitdir: r }) {
    const i = await e.read(`${r}/config`, { encoding: "utf8" });
    return wa.from(i);
  }
  static async save({ fs: e, gitdir: r, config: i }) {
    await e.write(`${r}/config`, i.toString(), {
      encoding: "utf8"
    });
  }
}
const Ti = (t) => [
  `${t}`,
  `refs/${t}`,
  `refs/tags/${t}`,
  `refs/heads/${t}`,
  `refs/remotes/${t}`,
  `refs/remotes/${t}/HEAD`
], au = ["config", "description", "index", "shallow", "commondir"];
let Tn;
async function ir(t, e) {
  return Tn === void 0 && (Tn = new Qr()), Tn.acquire(t, e);
}
class se {
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
    for (const $ of n.values())
      if (!$.match(/[0-9a-f]{40}/))
        throw new or($);
    const u = await it.get({ fs: e, gitdir: r });
    if (!s) {
      if (s = await u.getall(`remote.${i}.fetch`), s.length === 0)
        throw new ni(i);
      s.unshift(`+HEAD:refs/remotes/${i}/HEAD`);
    }
    const m = da.from(s), p = /* @__PURE__ */ new Map();
    if (f) {
      const $ = await se.listRefs({
        fs: e,
        gitdir: r,
        filepath: "refs/tags"
      });
      await se.deleteRefs({
        fs: e,
        gitdir: r,
        refs: $.map((I) => `refs/tags/${I}`)
      });
    }
    if (o) {
      for (const $ of n.keys())
        if ($.startsWith("refs/tags") && !$.endsWith("^{}") && !await se.exists({ fs: e, gitdir: r, ref: $ })) {
          const I = n.get($);
          p.set($, I);
        }
    }
    const y = m.translate([...n.keys()]);
    for (const [$, I] of y) {
      const T = n.get($);
      p.set(I, T);
    }
    const E = m.translate([...a.keys()]);
    for (const [$, I] of E) {
      const T = a.get($), A = m.translateOne(T);
      A && p.set(I, `ref: ${A}`);
    }
    const R = [];
    if (l) {
      for (const $ of m.localNamespaces()) {
        const I = (await se.listRefs({
          fs: e,
          gitdir: r,
          filepath: $
        })).map((T) => `${$}/${T}`);
        for (const T of I)
          p.has(T) || R.push(T);
      }
      R.length > 0 && await se.deleteRefs({ fs: e, gitdir: r, refs: R });
    }
    for (const [$, I] of p)
      await ir(
        $,
        async () => e.write(re.join(r, $), `${I.trim()}
`, "utf8")
      );
    return { pruned: R };
  }
  // TODO: make this less crude?
  static async writeRef({ fs: e, gitdir: r, ref: i, value: n }) {
    if (!n.match(/[0-9a-f]{40}/))
      throw new or(n);
    await ir(
      i,
      async () => e.write(re.join(r, i), `${n.trim()}
`, "utf8")
    );
  }
  static async writeSymbolicRef({ fs: e, gitdir: r, ref: i, value: n }) {
    await ir(
      i,
      async () => e.write(re.join(r, i), `ref: ${n.trim()}
`, "utf8")
    );
  }
  static async deleteRef({ fs: e, gitdir: r, ref: i }) {
    return se.deleteRefs({ fs: e, gitdir: r, refs: [i] });
  }
  static async deleteRefs({ fs: e, gitdir: r, refs: i }) {
    await Promise.all(i.map((s) => e.rm(re.join(r, s))));
    let n = await ir(
      "packed-refs",
      async () => e.read(`${r}/packed-refs`, { encoding: "utf8" })
    );
    const a = Fi.from(n), o = a.refs.size;
    for (const s of i)
      a.refs.has(s) && a.delete(s);
    a.refs.size < o && (n = a.toString(), await ir(
      "packed-refs",
      async () => e.write(`${r}/packed-refs`, n, { encoding: "utf8" })
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
      return i = i.slice(5), se.resolve({ fs: e, gitdir: r, ref: i, depth: n });
    if (i.length === 40 && /[0-9a-f]{40}/.test(i))
      return i;
    const a = await se.packedRefs({ fs: e, gitdir: r }), o = Ti(i).filter((s) => !au.includes(s));
    for (const s of o) {
      const l = await ir(
        s,
        async () => await e.read(`${r}/${s}`, { encoding: "utf8" }) || a.get(s)
      );
      if (l)
        return se.resolve({ fs: e, gitdir: r, ref: l.trim(), depth: n });
    }
    throw new Pe(i);
  }
  static async exists({ fs: e, gitdir: r, ref: i }) {
    try {
      return await se.expand({ fs: e, gitdir: r, ref: i }), !0;
    } catch {
      return !1;
    }
  }
  static async expand({ fs: e, gitdir: r, ref: i }) {
    if (i.length === 40 && /[0-9a-f]{40}/.test(i))
      return i;
    const n = await se.packedRefs({ fs: e, gitdir: r }), a = Ti(i);
    for (const o of a)
      if (await ir(
        o,
        async () => e.exists(`${r}/${o}`)
      ) || n.has(o)) return o;
    throw new Pe(i);
  }
  static async expandAgainstMap({ ref: e, map: r }) {
    const i = Ti(e);
    for (const n of i)
      if (await r.has(n)) return n;
    throw new Pe(e);
  }
  static resolveAgainstMap({ ref: e, fullref: r = e, depth: i = void 0, map: n }) {
    if (i !== void 0 && (i--, i === -1))
      return { fullref: r, oid: e };
    if (e.startsWith("ref: "))
      return e = e.slice(5), se.resolveAgainstMap({ ref: e, fullref: r, depth: i, map: n });
    if (e.length === 40 && /[0-9a-f]{40}/.test(e))
      return { fullref: r, oid: e };
    const a = Ti(e);
    for (const o of a) {
      const s = n.get(o);
      if (s)
        return se.resolveAgainstMap({
          ref: s.trim(),
          fullref: o,
          depth: i,
          map: n
        });
    }
    throw new Pe(e);
  }
  static async packedRefs({ fs: e, gitdir: r }) {
    const i = await ir(
      "packed-refs",
      async () => e.read(`${r}/packed-refs`, { encoding: "utf8" })
    );
    return Fi.from(i).refs;
  }
  // List all the refs that match the `filepath` prefix
  static async listRefs({ fs: e, gitdir: r, filepath: i }) {
    const n = se.packedRefs({ fs: e, gitdir: r });
    let a = null;
    try {
      a = await e.readdirDeep(`${r}/${i}`), a = a.map((o) => o.replace(`${r}/${i}/`, ""));
    } catch {
      a = [];
    }
    for (let o of (await n).keys())
      o.startsWith(i) && (o = o.replace(i + "/", ""), a.includes(o) || a.push(o));
    return a.sort(Zl), a;
  }
  static async listBranches({ fs: e, gitdir: r, remote: i }) {
    return i ? se.listRefs({
      fs: e,
      gitdir: r,
      filepath: `refs/remotes/${i}`
    }) : se.listRefs({ fs: e, gitdir: r, filepath: "refs/heads" });
  }
  static async listTags({ fs: e, gitdir: r }) {
    return (await se.listRefs({
      fs: e,
      gitdir: r,
      filepath: "refs/tags"
    })).filter((n) => !n.endsWith("^{}"));
  }
}
function ou(t, e) {
  return qi(lo(t), lo(e));
}
function lo(t) {
  return t.mode === "040000" ? t.path + "/" : t.path;
}
function ps(t) {
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
  throw new Te(`Unexpected GitTree entry mode: ${t}`);
}
function su(t) {
  const e = [];
  let r = 0;
  for (; r < t.length; ) {
    const i = t.indexOf(32, r);
    if (i === -1)
      throw new Te(
        `GitTree: Error parsing buffer at byte location ${r}: Could not find the next space character.`
      );
    const n = t.indexOf(0, r);
    if (n === -1)
      throw new Te(
        `GitTree: Error parsing buffer at byte location ${r}: Could not find the next null character.`
      );
    let a = t.slice(r, i).toString("utf8");
    a === "40000" && (a = "040000");
    const o = ps(a), s = t.slice(i + 1, n).toString("utf8");
    if (s.includes("\\") || s.includes("/"))
      throw new Ur(s);
    const l = t.slice(n + 1, n + 21).toString("hex");
    r = n + 21, e.push({ mode: a, path: s, oid: l, type: o });
  }
  return e;
}
function cu(t) {
  if (typeof t == "number" && (t = t.toString(8)), t.match(/^0?4.*/)) return "040000";
  if (t.match(/^1006.*/)) return "100644";
  if (t.match(/^1007.*/)) return "100755";
  if (t.match(/^120.*/)) return "120000";
  if (t.match(/^160.*/)) return "160000";
  throw new Te(`Could not understand file mode: ${t}`);
}
function lu(t) {
  return !t.oid && t.sha && (t.oid = t.sha), t.mode = cu(t.mode), t.type || (t.type = ps(t.mode)), t;
}
class _t {
  constructor(e) {
    if (fe.isBuffer(e))
      this._entries = su(e);
    else if (Array.isArray(e))
      this._entries = e.map(lu);
    else
      throw new Te("invalid type passed to GitTree constructor");
    this._entries.sort(fs);
  }
  static from(e) {
    return new _t(e);
  }
  render() {
    return this._entries.map((e) => `${e.mode} ${e.type} ${e.oid}    ${e.path}`).join(`
`);
  }
  toObject() {
    const e = [...this._entries];
    return e.sort(ou), fe.concat(
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
class Pr {
  static wrap({ type: e, object: r }) {
    return fe.concat([
      fe.from(`${e} ${r.byteLength.toString()}\0`),
      fe.from(r)
    ]);
  }
  static unwrap(e) {
    const r = e.indexOf(32), i = e.indexOf(0), n = e.slice(0, r).toString("utf8"), a = e.slice(r + 1, i).toString("utf8"), o = e.length - (i + 1);
    if (parseInt(a) !== o)
      throw new Te(
        `Length mismatch: expected ${a} bytes but got ${o} instead.`
      );
    return {
      type: n,
      object: fe.from(e.slice(i + 1))
    };
  }
}
async function ms({ fs: t, gitdir: e, oid: r }) {
  const i = `objects/${r.slice(0, 2)}/${r.slice(2)}`, n = await t.read(`${e}/${i}`);
  return n ? { object: n, format: "deflated", source: i } : null;
}
function uu(t, e) {
  const r = new zt(t), i = uo(r);
  if (i !== e.byteLength)
    throw new Te(
      `applyDelta expected source buffer to be ${i} bytes but the provided buffer was ${e.length} bytes`
    );
  const n = uo(r);
  let a;
  const o = ho(r, e);
  if (o.byteLength === n)
    a = o;
  else {
    a = fe.alloc(n);
    const s = new zt(a);
    for (s.copy(o); !r.eof(); )
      s.copy(ho(r, e));
    const l = s.tell();
    if (n !== l)
      throw new Te(
        `applyDelta expected target buffer to be ${n} bytes but the resulting buffer was ${l} bytes`
      );
  }
  return a;
}
function uo(t) {
  let e = 0, r = 0, i = null;
  do
    i = t.readUInt8(), e |= (i & 127) << r, r += 7;
  while (i & 128);
  return e;
}
function fo(t, e, r) {
  let i = 0, n = 0;
  for (; r--; )
    e & 1 && (i |= t.readUInt8() << n), e >>= 1, n += 8;
  return i;
}
function ho(t, e) {
  const r = t.readUInt8(), i = 128, n = 15, a = 112;
  if (r & i) {
    const o = fo(t, r & n, 4);
    let s = fo(t, (r & a) >> 4, 3);
    return s === 0 && (s = 65536), e.slice(o, o + s);
  } else
    return t.slice(r);
}
function fu(t) {
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
function gs(t) {
  return t[Symbol.asyncIterator] ? t[Symbol.asyncIterator]() : t[Symbol.iterator] ? t[Symbol.iterator]() : t.next ? t : fu(t);
}
class ys {
  constructor(e) {
    if (typeof fe > "u")
      throw new Error("Missing Buffer dependency");
    this.stream = gs(e), this.buffer = null, this.cursor = 0, this.undoCursor = 0, this.started = !1, this._ended = !1, this._discardedBytes = 0;
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
    for (; this.cursor + e > hu(r); ) {
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
function hu(t) {
  return t.reduce((e, r) => e + r.length, 0);
}
async function du(t, e) {
  const r = new ys(t);
  let i = await r.read(4);
  if (i = i.toString("utf8"), i !== "PACK")
    throw new Te(`Invalid PACK header '${i}'`);
  let n = await r.read(4);
  if (n = n.readUInt32BE(0), n !== 2)
    throw new Te(`Invalid packfile version: ${n}`);
  let a = await r.read(4);
  if (a = a.readUInt32BE(0), !(a < 1))
    for (; !r.eof() && a--; ) {
      const o = r.tell(), { type: s, length: l, ofs: f, reference: u } = await wu(r), m = new ha.Inflate();
      for (; !m.result; ) {
        const p = await r.chunk();
        if (!p) break;
        if (m.push(p, !1), m.err)
          throw new Te(`Pako error: ${m.msg}`);
        if (m.result) {
          if (m.result.length !== l)
            throw new Te(
              "Inflated object size is different from that stated in packfile."
            );
          await r.undo(), await r.read(p.length - m.strm.avail_in);
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
async function wu(t) {
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
async function _s(t) {
  return ha.inflate(t);
}
function pu(t) {
  const e = [];
  let r = 0, i = 0;
  do {
    r = t.readUInt8();
    const n = r & 127;
    e.push(n), i = r & 128;
  } while (i);
  return e.reduce((n, a) => n + 1 << 7 | a, -1);
}
function mu(t, e) {
  let r = e, i = 4, n = null;
  do
    n = t.readUInt8(), r |= (n & 127) << i, i += 7;
  while (n & 128);
  return r;
}
class Br {
  constructor(e) {
    Object.assign(this, e), this.offsetCache = {};
  }
  static async fromIdx({ idx: e, getExternalRefDelta: r }) {
    const i = new zt(e);
    if (i.slice(4).toString("hex") !== "ff744f63")
      return;
    const a = i.readUInt32BE();
    if (a !== 2)
      throw new Te(
        `Unable to read version ${a} packfile IDX. (Only version 2 supported)`
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
    return new Br({
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
    await du([e], async ({ data: $, type: I, reference: T, offset: A, num: P }) => {
      u === null && (u = P);
      const U = Math.floor(
        (u - P) * 100 / u
      );
      U !== m && i && await i({
        phase: "Receiving objects",
        loaded: u - P,
        total: u
      }), m = U, I = n[I], ["commit", "tree", "blob", "tag"].includes(I) ? a[A] = {
        type: I,
        offset: A
      } : I === "ofs-delta" ? a[A] = {
        type: I,
        offset: A
      } : I === "ref-delta" && (a[A] = {
        type: I,
        offset: A
      });
    });
    const p = Object.keys(a).map(Number);
    for (const [$, I] of p.entries()) {
      const T = $ + 1 === p.length ? e.byteLength - 20 : p[$ + 1], A = a[I], P = pl.buf(e.slice(I, T)) >>> 0;
      A.end = T, A.crc = P;
    }
    const y = new Br({
      pack: Promise.resolve(e),
      packfileSha: o,
      crcs: l,
      hashes: s,
      offsets: f,
      getExternalRefDelta: r
    });
    m = null;
    let E = 0;
    const R = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let $ in a) {
      $ = Number($);
      const I = Math.floor(E * 100 / u);
      I !== m && i && await i({
        phase: "Resolving deltas",
        loaded: E,
        total: u
      }), E++, m = I;
      const T = a[$];
      if (!T.oid)
        try {
          y.readDepth = 0, y.externalReadDepth = 0;
          const { type: A, object: P } = await y.readSlice({ start: $ });
          R[y.readDepth] += 1;
          const U = await Jt(Pr.wrap({ type: A, object: P }));
          T.oid = U, s.push(U), f.set(U, $), l[U] = T.crc;
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
    const i = new zt(fe.alloc(256 * 4));
    for (let f = 0; f < 256; f++) {
      let u = 0;
      for (const m of this.hashes)
        parseInt(m.slice(0, 2), 16) <= f && u++;
      i.writeUInt32BE(u);
    }
    e.push(i.buffer);
    for (const f of this.hashes)
      r(f, "hex");
    const n = new zt(fe.alloc(this.hashes.length * 4));
    for (const f of this.hashes)
      n.writeUInt32BE(this.crcs[f]);
    e.push(n.buffer);
    const a = new zt(fe.alloc(this.hashes.length * 4));
    for (const f of this.hashes)
      a.writeUInt32BE(this.offsets.get(f));
    e.push(a.buffer), r(this.packfileSha, "hex");
    const o = fe.concat(e), s = await Jt(o), l = fe.alloc(20);
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
      throw new Te(`Could not read object ${e} from packfile`);
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
    const i = (await this.pack).slice(e), n = new zt(i), a = n.readUInt8(), o = a & 112;
    let s = r[o];
    if (s === void 0)
      throw new Te("Unrecognized type: 0b" + o.toString(2));
    const l = a & 15;
    let f = l;
    a & 128 && (f = mu(n, l));
    let m = null, p = null;
    if (s === "ofs_delta") {
      const E = pu(n), R = e - E;
      ({ object: m, type: s } = await this.readSlice({ start: R }));
    }
    if (s === "ref_delta") {
      const E = n.slice(20).toString("hex");
      ({ object: m, type: s } = await this.read({ oid: E }));
    }
    const y = i.slice(n.tell());
    if (p = fe.from(await _s(y)), p.byteLength !== f)
      throw new Te(
        `Packfile told us object would have length ${f} but it had length ${p.byteLength}`
      );
    return m && (p = fe.from(uu(p, m))), this.readDepth > 3 && (this.offsetCache[e] = { type: s, object: p }), { type: s, format: "content", object: p };
  }
}
const $i = Symbol("PackfileCache");
async function gu({
  fs: t,
  filename: e,
  getExternalRefDelta: r,
  emitter: i,
  emitterPrefix: n
}) {
  const a = await t.read(e);
  return Br.fromIdx({ idx: a, getExternalRefDelta: r });
}
function pa({
  fs: t,
  cache: e,
  filename: r,
  getExternalRefDelta: i,
  emitter: n,
  emitterPrefix: a
}) {
  e[$i] || (e[$i] = /* @__PURE__ */ new Map());
  let o = e[$i].get(r);
  return o || (o = gu({
    fs: t,
    filename: r,
    getExternalRefDelta: i,
    emitter: n,
    emitterPrefix: a
  }), e[$i].set(r, o)), o;
}
async function yu({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  format: n = "content",
  getExternalRefDelta: a
}) {
  let o = await t.readdir(re.join(r, "objects/pack"));
  o = o.filter((s) => s.endsWith(".idx"));
  for (const s of o) {
    const l = `${r}/objects/pack/${s}`, f = await pa({
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
      return u.format = "content", u.source = `objects/pack/${s.replace(/idx$/, "pack")}`, u;
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
  if (i === "4b825dc642cb6eb9a060e54bf8d69288fbee4904" && (o = { format: "wrapped", object: fe.from("tree 0\0") }), o || (o = await ms({ fs: t, gitdir: r, oid: i })), !o) {
    if (o = await yu({
      fs: t,
      cache: e,
      gitdir: r,
      oid: i,
      getExternalRefDelta: a
    }), !o)
      throw new Pe(i);
    return o;
  }
  if (n === "deflated" || (o.format === "deflated" && (o.object = fe.from(await _s(o.object)), o.format = "wrapped"), n === "wrapped"))
    return o;
  const s = await Jt(o.object);
  if (s !== i)
    throw new Te(
      `SHA check failed! Expected ${i}, computed ${s}`
    );
  const { object: l, type: f } = Pr.unwrap(o.object);
  if (o.type = f, o.object = l, o.format = "content", n === "content")
    return o;
  throw new Te(`invalid requested format "${n}"`);
}
class Ft extends Ne {
  /**
   * @param {'note'|'remote'|'tag'|'branch'} noun
   * @param {string} where
   * @param {boolean} canForce
   */
  constructor(e, r, i = !0) {
    super(
      `Failed to create ${e} at ${r} because it already exists.${i ? ` (Hint: use 'force: true' parameter to overwrite existing ${e}.)` : ""}`
    ), this.code = this.name = Ft.code, this.data = { noun: e, where: r, canForce: i };
  }
}
Ft.code = "AlreadyExistsError";
class ai extends Ne {
  /**
   * @param {'oids'|'refs'} nouns
   * @param {string} short
   * @param {string[]} matches
   */
  constructor(e, r, i) {
    super(
      `Found multiple ${e} matching "${r}" (${i.join(
        ", "
      )}). Use a longer abbreviation length to disambiguate them.`
    ), this.code = this.name = ai.code, this.data = { nouns: e, short: r, matches: i };
  }
}
ai.code = "AmbiguousError";
class oi extends Ne {
  /**
   * @param {string[]} filepaths
   */
  constructor(e) {
    super(
      `Your local changes to the following files would be overwritten by checkout: ${e.join(
        ", "
      )}`
    ), this.code = this.name = oi.code, this.data = { filepaths: e };
  }
}
oi.code = "CheckoutConflictError";
class si extends Ne {
  /**
   * @param {string} ref
   * @param {string} oid
   */
  constructor(e, r) {
    super(
      `Failed to checkout "${e}" because commit ${r} is not available locally. Do a git fetch to make the branch available locally.`
    ), this.code = this.name = si.code, this.data = { ref: e, oid: r };
  }
}
si.code = "CommitNotFetchedError";
class ci extends Ne {
  constructor() {
    super("Empty response from git server."), this.code = this.name = ci.code, this.data = {};
  }
}
ci.code = "EmptyServerResponseError";
class li extends Ne {
  constructor() {
    super("A simple fast-forward merge was not possible."), this.code = this.name = li.code, this.data = {};
  }
}
li.code = "FastForwardError";
class ui extends Ne {
  /**
   * @param {string} prettyDetails
   * @param {PushResult} result
   */
  constructor(e, r) {
    super(`One or more branches were not updated: ${e}`), this.code = this.name = ui.code, this.data = { prettyDetails: e, result: r };
  }
}
ui.code = "GitPushError";
class Ar extends Ne {
  /**
   * @param {number} statusCode
   * @param {string} statusMessage
   * @param {string} response
   */
  constructor(e, r, i) {
    super(`HTTP Error: ${e} ${r}`), this.code = this.name = Ar.code, this.data = { statusCode: e, statusMessage: r, response: i };
  }
}
Ar.code = "HttpError";
class sr extends Ne {
  /**
   * @param {'leading-slash'|'trailing-slash'|'directory'} [reason]
   */
  constructor(e) {
    let r = "invalid filepath";
    e === "leading-slash" || e === "trailing-slash" ? r = '"filepath" parameter should not include leading or trailing directory separators because these can cause problems on some platforms.' : e === "directory" && (r = '"filepath" should not be a directory.'), super(r), this.code = this.name = sr.code, this.data = { reason: e };
  }
}
sr.code = "InvalidFilepathError";
class Nt extends Ne {
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
class fi extends Ne {
  /**
   * @param {number} depth
   */
  constructor(e) {
    super(`Maximum search depth of ${e} exceeded.`), this.code = this.name = fi.code, this.data = { depth: e };
  }
}
fi.code = "MaxDepthError";
class jr extends Ne {
  constructor() {
    super("Merges with conflicts are not supported yet."), this.code = this.name = jr.code, this.data = {};
  }
}
jr.code = "MergeNotSupportedError";
class zr extends Ne {
  /**
   * @param {Array<string>} filepaths
   * @param {Array<string>} bothModified
   * @param {Array<string>} deleteByUs
   * @param {Array<string>} deleteByTheirs
   */
  constructor(e, r, i, n) {
    super(
      `Automatic merge failed with one or more merge conflicts in the following files: ${e.toString()}. Fix conflicts then commit the result.`
    ), this.code = this.name = zr.code, this.data = { filepaths: e, bothModified: r, deleteByUs: i, deleteByTheirs: n };
  }
}
zr.code = "MergeConflictError";
class ht extends Ne {
  /**
   * @param {'author'|'committer'|'tagger'} role
   */
  constructor(e) {
    super(
      `No name was provided for ${e} in the argument or in the .git/config file.`
    ), this.code = this.name = ht.code, this.data = { role: e };
  }
}
ht.code = "MissingNameError";
class yt extends Ne {
  /**
   * @param {string} parameter
   */
  constructor(e) {
    super(
      `The function requires a "${e}" parameter but none was provided.`
    ), this.code = this.name = yt.code, this.data = { parameter: e };
  }
}
yt.code = "MissingParameterError";
class hi extends Ne {
  /**
   * @param {Error[]} errors
   * @param {string} message
   */
  constructor(e) {
    super(
      'There are multiple errors that were thrown by the method. Please refer to the "errors" property to see more'
    ), this.code = this.name = hi.code, this.data = { errors: e }, this.errors = e;
  }
}
hi.code = "MultipleGitError";
class vr extends Ne {
  /**
   * @param {string} expected
   * @param {string} actual
   */
  constructor(e, r) {
    super(`Expected "${e}" but received "${r}".`), this.code = this.name = vr.code, this.data = { expected: e, actual: r };
  }
}
vr.code = "ParseError";
class Or extends Ne {
  /**
   * @param {'not-fast-forward'|'tag-exists'} reason
   */
  constructor(e) {
    let r = "";
    e === "not-fast-forward" ? r = " because it was not a simple fast-forward" : e === "tag-exists" && (r = " because tag already exists"), super(`Push rejected${r}. Use "force: true" to override.`), this.code = this.name = Or.code, this.data = { reason: e };
  }
}
Or.code = "PushRejectedError";
class ar extends Ne {
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
class di extends Ne {
  /**
   * @param {string} preview
   * @param {string} response
   */
  constructor(e, r) {
    super(
      `Remote did not reply using the "smart" HTTP protocol. Expected "001e# service=git-upload-pack" but received: ${e}`
    ), this.code = this.name = di.code, this.data = { preview: e, response: r };
  }
}
di.code = "SmartHttpError";
class wi extends Ne {
  /**
   * @param {string} url
   * @param {string} transport
   * @param {string} [suggestion]
   */
  constructor(e, r, i) {
    super(
      `Git remote "${e}" uses an unrecognized transport protocol: "${r}"`
    ), this.code = this.name = wi.code, this.data = { url: e, transport: r, suggestion: i };
  }
}
wi.code = "UnknownTransportError";
class pi extends Ne {
  /**
   * @param {string} url
   */
  constructor(e) {
    super(`Cannot parse remote URL: "${e}"`), this.code = this.name = pi.code, this.data = { url: e };
  }
}
pi.code = "UrlParseError";
class Hr extends Ne {
  constructor() {
    super("The operation was canceled."), this.code = this.name = Hr.code, this.data = {};
  }
}
Hr.code = "UserCanceledError";
class mi extends Ne {
  /**
   * @param {Array<string>} filepaths
   */
  constructor(e) {
    super(
      `Could not merge index: Entry for '${e}' is not up to date. Either reset the index entry to HEAD, or stage your unstaged changes.`
    ), this.code = this.name = mi.code, this.data = { filepath: e };
  }
}
mi.code = "IndexResetError";
class gi extends Ne {
  /**
   * @param {string} ref
   */
  constructor(e) {
    super(
      `"${e}" does not point to any commit. You're maybe working on a repository with no commits yet. `
    ), this.code = this.name = gi.code, this.data = { ref: e };
  }
}
gi.code = "NoCommitError";
var _u = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  AlreadyExistsError: Ft,
  AmbiguousError: ai,
  CheckoutConflictError: oi,
  CommitNotFetchedError: si,
  EmptyServerResponseError: ci,
  FastForwardError: li,
  GitPushError: ui,
  HttpError: Ar,
  InternalError: Te,
  InvalidFilepathError: sr,
  InvalidOidError: or,
  InvalidRefNameError: Nt,
  MaxDepthError: fi,
  MergeNotSupportedError: jr,
  MergeConflictError: zr,
  MissingNameError: ht,
  MissingParameterError: yt,
  MultipleGitError: hi,
  NoRefspecError: ni,
  NotFoundError: Pe,
  ObjectTypeError: pt,
  ParseError: vr,
  PushRejectedError: Or,
  RemoteCapabilityError: ar,
  SmartHttpError: di,
  UnknownTransportError: wi,
  UnsafeFilepathError: Ur,
  UrlParseError: pi,
  UserCanceledError: Hr,
  UnmergedPathsError: ii,
  IndexResetError: mi,
  NoCommitError: gi
});
function ra({ name: t, email: e, timestamp: r, timezoneOffset: i }) {
  return i = bu(i), `${t} <${e}> ${r} ${i}`;
}
function bu(t) {
  const e = vu(Eu(t));
  t = Math.abs(t);
  const r = Math.floor(t / 60);
  t -= r * 60;
  let i = String(r), n = String(t);
  return i.length < 2 && (i = "0" + i), n.length < 2 && (n = "0" + n), (e === -1 ? "-" : "+") + i + n;
}
function vu(t) {
  return Math.sign(t) || (Object.is(t, -0) ? -1 : 1);
}
function Eu(t) {
  return t === 0 ? t : -t;
}
function Xt(t) {
  return t = t.replace(/\r/g, ""), t = t.replace(/^\n+/, ""), t = t.replace(/\n+$/, "") + `
`, t;
}
function Ui(t) {
  const [, e, r, i, n] = t.match(
    /^(.*) <(.*)> (.*) (.*)$/
  );
  return {
    name: e,
    email: r,
    timestamp: Number(i),
    timezoneOffset: ku(n)
  };
}
function ku(t) {
  let [, e, r, i] = t.match(/(\+|-)(\d\d)(\d\d)/);
  return i = (e === "+" ? 1 : -1) * (Number(r) * 60 + Number(i)), Su(i);
}
function Su(t) {
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
    return `object ${e.object}
type ${e.type}
tag ${e.tag}
tagger ${ra(e.tagger)}

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
    for (const n of e)
      n[0] === " " ? r[r.length - 1] += `
` + n.slice(1) : r.push(n);
    const i = {};
    for (const n of r) {
      const a = n.slice(0, n.indexOf(" ")), o = n.slice(n.indexOf(" ") + 1);
      Array.isArray(i[a]) ? i[a].push(o) : i[a] = o;
    }
    return i.tagger && (i.tagger = Ui(i.tagger)), i.committer && (i.committer = Ui(i.committer)), i;
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
    return fe.from(this._tag, "utf8");
  }
  static async sign(e, r, i) {
    const n = e.payload();
    let { signature: a } = await r({ payload: n, secretKey: i });
    a = Xt(a);
    const o = n + a;
    return wt.from(o);
  }
}
function $n(t) {
  return t.trim().split(`
`).map((e) => " " + e).join(`
`) + `
`;
}
function xu(t) {
  return t.split(`
`).map((e) => e.replace(/^ /, "")).join(`
`);
}
class Xe {
  constructor(e) {
    if (typeof e == "string")
      this._commit = e;
    else if (fe.isBuffer(e))
      this._commit = e.toString("utf8");
    else if (typeof e == "object")
      this._commit = Xe.render(e);
    else
      throw new Te("invalid type passed to GitCommit constructor");
  }
  static fromPayloadSignature({ payload: e, signature: r }) {
    const i = Xe.justHeaders(e), n = Xe.justMessage(e), a = Xt(
      i + `
gpgsig` + $n(r) + `
` + n
    );
    return new Xe(a);
  }
  static from(e) {
    return new Xe(e);
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
    return Xe.justMessage(this._commit);
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
    const e = Xe.justHeaders(this._commit).split(`
`), r = [];
    for (const n of e)
      n[0] === " " ? r[r.length - 1] += `
` + n.slice(1) : r.push(n);
    const i = {
      parent: []
    };
    for (const n of r) {
      const a = n.slice(0, n.indexOf(" ")), o = n.slice(n.indexOf(" ") + 1);
      Array.isArray(i[a]) ? i[a].push(o) : i[a] = o;
    }
    return i.author && (i.author = Ui(i.author)), i.committer && (i.committer = Ui(i.committer)), i;
  }
  static renderHeaders(e) {
    let r = "";
    if (e.tree ? r += `tree ${e.tree}
` : r += `tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
`, e.parent) {
      if (e.parent.length === void 0)
        throw new Te("commit 'parent' property should be an array");
      for (const a of e.parent)
        r += `parent ${a}
`;
    }
    const i = e.author;
    r += `author ${ra(i)}
`;
    const n = e.committer || e.author;
    return r += `committer ${ra(n)}
`, e.gpgsig && (r += "gpgsig" + $n(e.gpgsig)), r;
  }
  static render(e) {
    return Xe.renderHeaders(e) + `
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
gpgsig`)), i = e.slice(
      e.indexOf(`-----END PGP SIGNATURE-----
`) + 28
    );
    return Xt(r + `
` + i);
  }
  isolateSignature() {
    const e = this._commit.slice(
      this._commit.indexOf("-----BEGIN PGP SIGNATURE-----"),
      this._commit.indexOf("-----END PGP SIGNATURE-----") + 27
    );
    return xu(e);
  }
  static async sign(e, r, i) {
    const n = e.withoutSignature(), a = Xe.justMessage(e._commit);
    let { signature: o } = await r({ payload: n, secretKey: i });
    o = Xt(o);
    const l = Xe.justHeaders(e._commit) + `
gpgsig` + $n(o) + `
` + a;
    return Xe.from(l);
  }
}
async function Cr({ fs: t, cache: e, gitdir: r, oid: i }) {
  if (i === "4b825dc642cb6eb9a060e54bf8d69288fbee4904")
    return { tree: _t.from([]), oid: i };
  const { type: n, object: a } = await Je({ fs: t, cache: e, gitdir: r, oid: i });
  if (n === "tag")
    return i = wt.from(a).parse().object, Cr({ fs: t, cache: e, gitdir: r, oid: i });
  if (n === "commit")
    return i = Xe.from(a).parse().tree, Cr({ fs: t, cache: e, gitdir: r, oid: i });
  if (n !== "tree")
    throw new pt(i, n, "tree");
  return { tree: _t.from(a), oid: i };
}
class Iu {
  constructor({ fs: e, gitdir: r, ref: i, cache: n }) {
    this.fs = e, this.cache = n, this.gitdir = r, this.mapPromise = (async () => {
      const o = /* @__PURE__ */ new Map();
      let s;
      try {
        s = await se.resolve({ fs: e, gitdir: r, ref: i });
      } catch (f) {
        f instanceof Pe && (s = "4b825dc642cb6eb9a060e54bf8d69288fbee4904");
      }
      const l = await Cr({ fs: e, cache: this.cache, gitdir: r, oid: s });
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
    if (!s) throw new Error(`No obj for ${r}`);
    const l = s.oid;
    if (!l) throw new Error(`No oid for obj ${JSON.stringify(s)}`);
    if (s.type !== "tree")
      return null;
    const { type: f, object: u } = await Je({ fs: i, cache: n, gitdir: a, oid: l });
    if (f !== s.type)
      throw new pt(l, f, s.type);
    const m = _t.from(u);
    for (const p of m)
      o.set(re.join(r, p.path), p);
    return m.entries().map((p) => re.join(r, p.path));
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
      e._mode = hs(parseInt(i, 8));
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
function Dt({ ref: t = "HEAD" } = {}) {
  const e = /* @__PURE__ */ Object.create(null);
  return Object.defineProperty(e, Gi, {
    value: function({ fs: r, gitdir: i, cache: n }) {
      return new Iu({ fs: r, gitdir: i, ref: t, cache: n });
    }
  }), Object.freeze(e), e;
}
class Tu {
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
    const r = e._fullpath, { fs: i, dir: n } = this, a = await i.readdir(re.join(n, r));
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
      const { fs: r, dir: i } = this;
      let n = await r.lstat(`${i}/${e._fullpath}`);
      if (!n)
        throw new Error(
          `ENOENT: no such file or directory, lstat '${e._fullpath}'`
        );
      let a = n.isDirectory() ? "tree" : "blob";
      a === "blob" && !n.isFile() && !n.isSymbolicLink() && (a = "special"), e._type = a, n = Rr(n), e._mode = n.mode, n.size === -1 && e._actualSize && (n.size = e._actualSize), e._stat = n;
    }
    return e._stat;
  }
  async content(e) {
    if (e._content === !1) {
      const { fs: r, dir: i, gitdir: n } = this;
      if (await e.type() === "tree")
        e._content = void 0;
      else {
        const o = await (await this._getGitConfig(r, n)).get("core.autocrlf"), s = await r.read(`${i}/${e._fullpath}`, { autocrlf: o });
        e._actualSize = s.length, e._stat && e._stat.size === -1 && (e._stat.size = e._actualSize), e._content = new Uint8Array(s);
      }
    }
    return e._content;
  }
  async oid(e) {
    if (e._oid === !1) {
      const r = this, { fs: i, gitdir: n, cache: a } = this;
      let o;
      await ot.acquire({ fs: i, gitdir: n, cache: a }, async function(s) {
        const l = s.entriesMap.get(e._fullpath), f = await e.stat(), m = await (await r._getGitConfig(i, n)).get("core.filemode"), p = typeof gt < "u" ? gt.platform !== "win32" : !0;
        if (!l || Ci(f, l, m, p)) {
          const y = await e.content();
          y === void 0 ? o = void 0 : (o = await Jt(
            Pr.wrap({ type: "blob", object: y })
          ), l && o === l.oid && (!m || f.mode === l.mode) && Ci(f, l, m, p) && s.insert({
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
    return this.config ? this.config : (this.config = await it.get({ fs: e, gitdir: r }), this.config);
  }
}
function yi() {
  const t = /* @__PURE__ */ Object.create(null);
  return Object.defineProperty(t, Gi, {
    value: function({ fs: e, dir: r, gitdir: i, cache: n }) {
      return new Tu({ fs: e, dir: r, gitdir: i, cache: n });
    }
  }), Object.freeze(t), t;
}
function $u(t, e) {
  const r = e - t;
  return Array.from({ length: r }, (i, n) => t + n);
}
const bs = typeof Array.prototype.flat > "u" ? (t) => t.reduce((e, r) => e.concat(r), []) : (t) => t.flat();
class Ru {
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
function* Du(t) {
  const e = new Ru();
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
async function cr({
  fs: t,
  cache: e,
  dir: r,
  gitdir: i,
  trees: n,
  // @ts-ignore
  map: a = async (l, f) => f,
  // The default reducer is a flatmap that filters out undefineds.
  reduce: o = async (l, f) => {
    const u = bs(f);
    return l !== void 0 && u.unshift(l), u;
  },
  // The default iterate function walks all children concurrently
  iterate: s = (l, f) => Promise.all([...f].map(l))
}) {
  const l = n.map(
    (y) => y[Gi]({ fs: t, dir: r, gitdir: i, cache: e })
  ), f = new Array(l.length).fill("."), u = $u(0, l.length), m = async (y) => {
    u.map(($) => {
      const I = y[$];
      y[$] = I && new l[$].ConstructEntry(I);
    });
    const R = (await Promise.all(
      u.map(($) => {
        const I = y[$];
        return I ? l[$].readdir(I) : [];
      })
    )).map(($) => ($ === null ? [] : $)[Symbol.iterator]());
    return {
      entries: y,
      children: Du(R)
    };
  }, p = async (y) => {
    const { entries: E, children: R } = await m(y), $ = E.find((T) => T && T._fullpath)._fullpath, I = await a($, E);
    if (I !== null) {
      let T = await s(p, R);
      return T = T.filter((A) => A !== void 0), o(I, T);
    }
  };
  return p(f);
}
async function ia(t, e) {
  const r = await t.readdir(e);
  r == null ? await t.rm(e) : r.length ? await Promise.all(
    r.map((i) => {
      const n = re.join(e, i);
      return t.lstat(n).then((a) => {
        if (a)
          return a.isDirectory() ? ia(t, n) : t.rm(n);
      });
    })
  ).then(() => t.rmdir(e)) : await t.rmdir(e);
}
function Bu(t) {
  return Au(t) && wo(t.then) && wo(t.catch);
}
function Au(t) {
  return t && typeof t == "object";
}
function wo(t) {
  return typeof t == "function";
}
function po(t) {
  return Bu(((r) => {
    try {
      return r.readFile().catch((i) => i);
    } catch (i) {
      return i;
    }
  })(t));
}
const mo = [
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
function go(t, e) {
  if (po(e))
    for (const r of mo)
      t[`_${r}`] = e[r].bind(e);
  else
    for (const r of mo)
      t[`_${r}`] = _n(e[r].bind(e));
  po(e) ? e.rm ? t._rm = e.rm.bind(e) : e.rmdir.length > 1 ? t._rm = e.rmdir.bind(e) : t._rm = ia.bind(null, t) : e.rm ? t._rm = _n(e.rm.bind(e)) : e.rmdir.length > 2 ? t._rm = _n(e.rmdir.bind(e)) : t._rm = ia.bind(null, t);
}
class ge {
  constructor(e) {
    if (typeof e._original_unwrapped_fs < "u") return e;
    const r = Object.getOwnPropertyDescriptor(e, "promises");
    r && r.enumerable ? go(this, e.promises) : go(this, e), this._original_unwrapped_fs = e;
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
          i = new TextDecoder("utf8", { fatal: !0 }).decode(i), i = i.replace(/\r\n/g, `
`), i = new TextEncoder().encode(i);
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
      await this.mkdir(Dr(e)), await this._writeFile(e, r, i);
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
        const n = Dr(e);
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
      return r.sort(qi), r;
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
async function Li(t, e) {
  return !t && !e ? !1 : t && !e || !t && e ? !0 : !(await t.type() === "tree" && await e.type() === "tree" || await t.type() === await e.type() && await t.mode() === await e.mode() && await t.oid() === await e.oid());
}
async function Ou({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  commit: i = "HEAD",
  cache: n = {}
}) {
  try {
    H("fs", t), H("dir", e), H("gitdir", r);
    const a = new ge(t), o = [Dt({ ref: i }), yi(), Lr()];
    let s = [];
    await ot.acquire({ fs: a, gitdir: r, cache: n }, async function(f) {
      s = f.unmergedPaths;
    });
    const l = await cr({
      fs: a,
      cache: n,
      dir: e,
      gitdir: r,
      trees: o,
      map: async function(f, [u, m, p]) {
        const y = !await Li(m, p), E = s.includes(f), R = !await Li(p, u);
        if (y || E)
          return u ? {
            path: f,
            mode: await u.mode(),
            oid: await u.oid(),
            type: await u.type(),
            content: await u.content()
          } : void 0;
        if (R) return !1;
        throw new mi(f);
      }
    });
    await ot.acquire({ fs: a, gitdir: r, cache: n }, async function(f) {
      for (const u of l)
        if (u !== !1) {
          if (!u) {
            await a.rmdir(`${e}/${u.path}`, { recursive: !0 }), f.delete({ filepath: u.path });
            continue;
          }
          if (u.type === "blob") {
            const m = new TextDecoder().decode(u.content);
            await a.write(`${e}/${u.path}`, m, { mode: u.mode }), f.insert({
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
class Wr {
  static async isIgnored({ fs: e, dir: r, gitdir: i = re.join(r, ".git"), filepath: n }) {
    if (Ni(n) === ".git") return !0;
    if (n === ".") return !1;
    let a = "";
    const o = re.join(i, "info", "exclude");
    await e.exists(o) && (a = await e.read(o, "utf8"));
    const s = [
      {
        gitignore: re.join(r, ".gitignore"),
        filepath: n
      }
    ], l = n.split("/").filter(Boolean);
    for (let u = 1; u < l.length; u++) {
      const m = l.slice(0, u).join("/"), p = l.slice(u).join("/");
      s.push({
        gitignore: re.join(r, m, ".gitignore"),
        filepath: p
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
      const p = Dl().add(a);
      p.add(m);
      const y = Dr(u.filepath);
      if (y !== "." && p.ignores(y)) return !0;
      f ? f = !p.test(u.filepath).unignored : f = p.test(u.filepath).ignored;
    }
    return f;
  }
}
async function Cu({ fs: t, gitdir: e, object: r, format: i, oid: n }) {
  const a = `objects/${n.slice(0, 2)}/${n.slice(2)}`, o = `${e}/${a}`;
  await t.exists(o) || await t.write(o, r);
}
let Rn = null;
async function vs(t) {
  return Rn === null && (Rn = Fu()), Rn ? Nu(t) : ha.deflate(t);
}
async function Nu(t) {
  const e = new CompressionStream("deflate"), r = new Blob([t]).stream().pipeThrough(e);
  return new Uint8Array(await new Response(r).arrayBuffer());
}
function Fu() {
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
  return n !== "deflated" && (n !== "wrapped" && (i = Pr.wrap({ type: r, object: i })), a = await Jt(i), i = fe.from(await vs(i))), o || await Cu({ fs: t, gitdir: e, object: i, format: "deflated", oid: a }), a;
}
function Es(t) {
  let e;
  for (; ~(e = t.indexOf(92)); ) t[e] = 47;
  return t;
}
async function Mu({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  filepath: i,
  cache: n = {},
  force: a = !1,
  parallel: o = !0
}) {
  try {
    H("fs", t), H("dir", e), H("gitdir", r), H("filepath", i);
    const s = new ge(t);
    await ot.acquire({ fs: s, gitdir: r, cache: n }, async (l) => {
      const u = await (await it.get({ fs: s, gitdir: r })).get("core.autocrlf");
      return na({
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
async function na({
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
  const l = i.map(async (p) => {
    if (!a && await Wr.isIgnored({
      fs: r,
      dir: t,
      gitdir: e,
      filepath: p
    }))
      return;
    const y = await r.lstat(re.join(t, p));
    if (!y) throw new Pe(p);
    if (y.isDirectory()) {
      const E = await r.readdir(re.join(t, p));
      if (o) {
        const R = E.map(
          ($) => na({
            dir: t,
            gitdir: e,
            fs: r,
            filepath: [re.join(p, $)],
            index: n,
            force: a,
            parallel: o,
            autocrlf: s
          })
        );
        await Promise.all(R);
      } else
        for (const R of E)
          await na({
            dir: t,
            gitdir: e,
            fs: r,
            filepath: [re.join(p, R)],
            index: n,
            force: a,
            parallel: o,
            autocrlf: s
          });
    } else {
      const E = y.isSymbolicLink() ? await r.readlink(re.join(t, p)).then(Es) : await r.read(re.join(t, p), { autocrlf: s });
      if (E === null) throw new Pe(p);
      const R = await bt({ fs: r, gitdir: e, type: "blob", object: E });
      n.insert({ filepath: p, stats: y, oid: R });
    }
  }), f = await Promise.allSettled(l), u = f.filter((p) => p.status === "rejected").map((p) => p.reason);
  if (u.length > 1)
    throw new hi(u);
  if (u.length === 1)
    throw u[0];
  return f.filter((p) => p.status === "fulfilled" && p.value).map((p) => p.value);
}
async function ei({ fs: t, gitdir: e, path: r }) {
  return (await it.get({ fs: t, gitdir: e })).get(r);
}
function ks(t, ...e) {
  for (const r of e)
    if (r)
      for (const i of Object.keys(r)) {
        const n = r[i];
        n !== void 0 && (t[i] = n);
      }
  return t;
}
async function lr({ fs: t, gitdir: e, author: r, commit: i }) {
  const n = Math.floor(Date.now() / 1e3), a = {
    name: await ei({ fs: t, gitdir: e, path: "user.name" }),
    email: await ei({ fs: t, gitdir: e, path: "user.email" }) || "",
    // author.email is allowed to be empty string
    timestamp: n,
    timezoneOffset: new Date(n * 1e3).getTimezoneOffset()
  }, o = ks(
    {},
    a,
    i ? i.author : void 0,
    r
  );
  if (o.name !== void 0)
    return o;
}
async function Nr({
  fs: t,
  gitdir: e,
  author: r,
  committer: i,
  commit: n
}) {
  const a = Math.floor(Date.now() / 1e3), o = {
    name: await ei({ fs: t, gitdir: e, path: "user.name" }),
    email: await ei({ fs: t, gitdir: e, path: "user.email" }) || "",
    // committer.email is allowed to be empty string
    timestamp: a,
    timezoneOffset: new Date(a * 1e3).getTimezoneOffset()
  }, s = ks(
    {},
    o,
    n ? n.committer : void 0,
    r,
    i
  );
  if (s.name !== void 0)
    return s;
}
async function Ss({ fs: t, cache: e, gitdir: r, oid: i }) {
  const { type: n, object: a } = await Je({ fs: t, cache: e, gitdir: r, oid: i });
  if (n === "tag")
    return i = wt.from(a).parse().object, Ss({ fs: t, cache: e, gitdir: r, oid: i });
  if (n !== "commit")
    throw new pt(i, n, "commit");
  return { commit: Xe.from(a), oid: i };
}
async function Fr({ fs: t, cache: e, gitdir: r, oid: i }) {
  const { commit: n, oid: a } = await Ss({
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
async function Zi({
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
  parent: p,
  tree: y
}) {
  let E = !1;
  m || (m = await se.resolve({
    fs: t,
    gitdir: i,
    ref: "HEAD",
    depth: 2
  }));
  let R, $;
  try {
    R = await se.resolve({
      fs: t,
      gitdir: i,
      ref: m
    }), $ = await Fr({ fs: t, gitdir: i, oid: R, cache: {} });
  } catch {
    E = !0;
  }
  if (l && E)
    throw new gi(m);
  const I = l ? await lr({
    fs: t,
    gitdir: i,
    author: a,
    commit: $.commit
  }) : await lr({ fs: t, gitdir: i, author: a });
  if (!I) throw new ht("author");
  const T = l ? await Nr({
    fs: t,
    gitdir: i,
    author: I,
    committer: o,
    commit: $.commit
  }) : await Nr({
    fs: t,
    gitdir: i,
    author: I,
    committer: o
  });
  if (!T) throw new ht("committer");
  return ot.acquire(
    { fs: t, gitdir: i, cache: e, allowUnmerged: !1 },
    async function(A) {
      const U = ws(A.entries).get(".");
      if (y || (y = await xs({ fs: t, gitdir: i, inode: U, dryRun: f })), p ? p = await Promise.all(
        p.map((O) => se.resolve({ fs: t, gitdir: i, ref: O }))
      ) : l ? p = $.commit.parent : p = R ? [R] : [], !n)
        if (l)
          n = $.commit.message;
        else
          throw new yt("message");
      let M = Xe.from({
        tree: y,
        parent: p,
        author: I,
        committer: T,
        message: n
      });
      s && (M = await Xe.sign(M, r, s));
      const B = await bt({
        fs: t,
        gitdir: i,
        type: "commit",
        object: M.toObject(),
        dryRun: f
      });
      return !u && !f && await se.writeRef({
        fs: t,
        gitdir: i,
        ref: m,
        value: B
      }), B;
    }
  );
}
async function xs({ fs: t, gitdir: e, inode: r, dryRun: i }) {
  const n = r.children;
  for (const l of n)
    l.type === "tree" && (l.metadata.mode = "040000", l.metadata.oid = await xs({ fs: t, gitdir: e, inode: l, dryRun: i }));
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
async function _i({ fs: t, cache: e, gitdir: r, oid: i, filepath: n }) {
  if (n.startsWith("/"))
    throw new sr("leading-slash");
  if (n.endsWith("/"))
    throw new sr("trailing-slash");
  const a = i, o = await Cr({ fs: t, cache: e, gitdir: r, oid: i }), s = o.tree;
  if (n === "")
    i = o.oid;
  else {
    const l = n.split("/");
    i = await Is({
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
async function Is({
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
        return i = _t.from(u), Is({
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
  throw new Pe(`file or directory found at "${a}:${o}"`);
}
async function qr({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  filepath: n = void 0
}) {
  n !== void 0 && (i = await _i({ fs: t, cache: e, gitdir: r, oid: i, filepath: n }));
  const { tree: a, oid: o } = await Cr({ fs: t, cache: e, gitdir: r, oid: i });
  return {
    oid: o,
    tree: a.entries()
  };
}
async function bi({ fs: t, gitdir: e, tree: r }) {
  const i = _t.from(r).toObject();
  return await bt({
    fs: t,
    gitdir: e,
    type: "tree",
    object: i,
    format: "content"
  });
}
async function Uu({
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
    m = await se.resolve({ gitdir: i, fs: t, ref: n });
  } catch (I) {
    if (!(I instanceof Pe))
      throw I;
  }
  let y = (await qr({
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
        throw new Ft("note", a);
  typeof o == "string" && (o = fe.from(o, "utf8"));
  const E = await bt({
    fs: t,
    gitdir: i,
    type: "blob",
    object: o,
    format: "content"
  });
  y.push({ mode: "100644", path: a, oid: E, type: "blob" });
  const R = await bi({
    fs: t,
    gitdir: i,
    tree: y
  });
  return await Zi({
    fs: t,
    cache: e,
    onSign: r,
    gitdir: i,
    ref: n,
    tree: R,
    parent: m && [m],
    message: `Note added by 'isomorphic-git addNote'
`,
    author: l,
    committer: f,
    signingKey: u
  });
}
async function Lu({
  fs: t,
  onSign: e,
  dir: r,
  gitdir: i = re.join(r, ".git"),
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
    const p = new ge(t), y = await lr({ fs: p, gitdir: i, author: l });
    if (!y) throw new ht("author");
    const E = await Nr({
      fs: p,
      gitdir: i,
      author: y,
      committer: f
    });
    if (!E) throw new ht("committer");
    return await Uu({
      fs: new ge(p),
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
  } catch (p) {
    throw p.caller = "git.addNote", p;
  }
}
async function Ts({ fs: t, gitdir: e, remote: r, url: i, force: n }) {
  if (r !== Ht.clean(r))
    throw new Nt(r, Ht.clean(r));
  const a = await it.get({ fs: t, gitdir: e });
  if (!n && (await a.getSubsections("remote")).includes(r) && i !== await a.get(`remote.${r}.url`))
    throw new Ft("remote", r);
  await a.set(`remote.${r}.url`, i), await a.set(
    `remote.${r}.fetch`,
    `+refs/heads/*:refs/remotes/${r}/*`
  ), await it.save({ fs: t, gitdir: e, config: a });
}
async function Pu({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  remote: i,
  url: n,
  force: a = !1
}) {
  try {
    return H("fs", t), H("gitdir", r), H("remote", i), H("url", n), await Ts({
      fs: new ge(t),
      gitdir: r,
      remote: i,
      url: n,
      force: a
    });
  } catch (o) {
    throw o.caller = "git.addRemote", o;
  }
}
async function ju({
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
  if (n = n.startsWith("refs/tags/") ? n : `refs/tags/${n}`, !u && await se.exists({ fs: t, gitdir: i, ref: n }))
    throw new Ft("tag", n);
  const m = await se.resolve({
    fs: t,
    gitdir: i,
    ref: l || "HEAD"
  }), { type: p } = await Je({ fs: t, cache: e, gitdir: i, oid: m });
  let y = wt.from({
    object: m,
    type: p,
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
  await se.writeRef({ fs: t, gitdir: i, ref: n, value: E });
}
async function zu({
  fs: t,
  onSign: e,
  dir: r,
  gitdir: i = re.join(r, ".git"),
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
    const p = new ge(t), y = await lr({ fs: p, gitdir: i, author: a });
    if (!y) throw new ht("tagger");
    return await ju({
      fs: p,
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
  } catch (p) {
    throw p.caller = "git.annotatedTag", p;
  }
}
async function Hu({
  fs: t,
  gitdir: e,
  ref: r,
  object: i,
  checkout: n = !1,
  force: a = !1
}) {
  if (r !== Ht.clean(r))
    throw new Nt(r, Ht.clean(r));
  const o = `refs/heads/${r}`;
  if (!a && await se.exists({ fs: t, gitdir: e, ref: o }))
    throw new Ft("branch", r, !1);
  let s;
  try {
    s = await se.resolve({ fs: t, gitdir: e, ref: i || "HEAD" });
  } catch {
  }
  s && await se.writeRef({ fs: t, gitdir: e, ref: o, value: s }), n && await se.writeSymbolicRef({
    fs: t,
    gitdir: e,
    ref: "HEAD",
    value: o
  });
}
async function Wu({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: i,
  object: n,
  checkout: a = !1,
  force: o = !1
}) {
  try {
    return H("fs", t), H("gitdir", r), H("ref", i), await Hu({
      fs: new ge(t),
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
const $s = (t, e) => t === "." || e == null || e.length === 0 || e === "." ? !0 : e.length >= t.length ? e.startsWith(t) : t.startsWith(e);
async function ma({
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
  force: p,
  track: y = !0
}) {
  let E;
  if (i)
    try {
      E = await se.resolve({ fs: t, gitdir: a, ref: "HEAD" });
    } catch {
      E = "0000000000000000000000000000000000000000";
    }
  let R;
  try {
    R = await se.resolve({ fs: t, gitdir: a, ref: s });
  } catch ($) {
    if (s === "HEAD") throw $;
    const I = `${o}/${s}`;
    if (R = await se.resolve({
      fs: t,
      gitdir: a,
      ref: I
    }), y) {
      const T = await it.get({ fs: t, gitdir: a });
      await T.set(`branch.${s}.remote`, o), await T.set(`branch.${s}.merge`, `refs/heads/${s}`), await it.save({ fs: t, gitdir: a, config: T });
    }
    await se.writeRef({
      fs: t,
      gitdir: a,
      ref: `refs/heads/${s}`,
      value: R
    });
  }
  if (!f) {
    let $;
    try {
      $ = await qu({
        fs: t,
        cache: e,
        onProgress: r,
        dir: n,
        gitdir: a,
        ref: s,
        force: p,
        filepaths: l
      });
    } catch (U) {
      throw U instanceof Pe && U.data.what === R ? new si(s, R) : U;
    }
    const I = $.filter(([U]) => U === "conflict").map(([U, M]) => M);
    if (I.length > 0)
      throw new oi(I);
    const T = $.filter(([U]) => U === "error").map(([U, M]) => M);
    if (T.length > 0)
      throw new Te(T.join(", "));
    if (m) {
      i && await i({
        previousHead: E,
        newHead: R,
        type: l != null && l.length > 0 ? "file" : "branch"
      });
      return;
    }
    let A = 0;
    const P = $.length;
    await ot.acquire({ fs: t, gitdir: a, cache: e }, async function(U) {
      await Promise.all(
        $.filter(
          ([M]) => M === "delete" || M === "delete-index"
        ).map(async function([M, B]) {
          const O = `${n}/${B}`;
          M === "delete" && await t.rm(O), U.delete({ filepath: B }), r && await r({
            phase: "Updating workdir",
            loaded: ++A,
            total: P
          });
        })
      );
    }), await ot.acquire({ fs: t, gitdir: a, cache: e }, async function(U) {
      for (const [M, B] of $)
        if (M === "rmdir" || M === "rmdir-index") {
          const O = `${n}/${B}`;
          try {
            M === "rmdir-index" && U.delete({ filepath: B }), await t.rmdir(O), r && await r({
              phase: "Updating workdir",
              loaded: ++A,
              total: P
            });
          } catch (W) {
            if (W.code === "ENOTEMPTY")
              console.log(
                `Did not delete ${B} because directory is not empty`
              );
            else
              throw W;
          }
        }
    }), await Promise.all(
      $.filter(([U]) => U === "mkdir" || U === "mkdir-index").map(async function([U, M]) {
        const B = `${n}/${M}`;
        await t.mkdir(B), r && await r({
          phase: "Updating workdir",
          loaded: ++A,
          total: P
        });
      })
    ), await ot.acquire({ fs: t, gitdir: a, cache: e }, async function(U) {
      await Promise.all(
        $.filter(
          ([M]) => M === "create" || M === "create-index" || M === "update" || M === "mkdir-index"
        ).map(async function([M, B, O, W, z]) {
          const K = `${n}/${B}`;
          try {
            if (M !== "create-index" && M !== "mkdir-index") {
              const { object: Q } = await Je({ fs: t, cache: e, gitdir: a, oid: O });
              if (z && await t.rm(K), W === 33188)
                await t.write(K, Q);
              else if (W === 33261)
                await t.write(K, Q, { mode: 511 });
              else if (W === 40960)
                await t.writelink(K, Q);
              else
                throw new Te(
                  `Invalid mode 0o${W.toString(8)} detected in blob ${O}`
                );
            }
            const N = await t.lstat(K);
            W === 33261 && (N.mode = 493), M === "mkdir-index" && (N.mode = 57344), U.insert({
              filepath: B,
              stats: N,
              oid: O
            }), r && await r({
              phase: "Updating workdir",
              loaded: ++A,
              total: P
            });
          } catch (N) {
            console.log(N);
          }
        })
      );
    }), i && await i({
      previousHead: E,
      newHead: R,
      type: l != null && l.length > 0 ? "file" : "branch"
    });
  }
  if (!u) {
    const $ = await se.expand({ fs: t, gitdir: a, ref: s });
    $.startsWith("refs/heads") ? await se.writeSymbolicRef({
      fs: t,
      gitdir: a,
      ref: "HEAD",
      value: $
    }) : await se.writeRef({ fs: t, gitdir: a, ref: "HEAD", value: R });
  }
}
async function qu({
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
  return cr({
    fs: t,
    cache: e,
    dir: i,
    gitdir: n,
    trees: [Dt({ ref: a }), yi(), Lr()],
    map: async function(f, [u, m, p]) {
      if (f === ".") return;
      if (s && !s.some((E) => $s(f, E)))
        return null;
      switch (r && await r({ phase: "Analyzing workdir", loaded: ++l }), [!!p, !!u, !!m].map(Number).join("")) {
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
                `new entry Unhandled type ${await u.type()}`
              ];
          }
        // New entries but there is already something in the workdir there.
        case "011":
          switch (`${await u.type()}-${await m.type()}`) {
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
              return ["error", `new entry Unhandled type ${u.type}`];
          }
        // Something in stage but not in the commit OR the workdir.
        // Note: I verified this behavior against canonical git.
        case "100":
          return ["delete-index", f];
        // Deleted entries
        // TODO: How to handle if stage type and workdir type mismatch?
        case "101":
          switch (await p.type()) {
            case "tree":
              return ["rmdir", f];
            case "blob":
              return await p.oid() !== await m.oid() ? o ? ["delete", f] : ["conflict", f] : ["delete", f];
            case "commit":
              return ["rmdir-index", f];
            default:
              return [
                "error",
                `delete entry Unhandled type ${await p.type()}`
              ];
          }
        /* eslint-disable no-fallthrough */
        // File missing from workdir
        case "110":
        // Possibly modified entries
        case "111":
          switch (`${await p.type()}-${await u.type()}`) {
            case "tree-tree":
              return;
            case "blob-blob": {
              if (await p.oid() === await u.oid() && await p.mode() === await u.mode() && !o)
                return;
              if (m) {
                if (await m.oid() !== await p.oid() && await m.oid() !== await u.oid())
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
                  await u.mode() !== await p.mode()
                ];
              return await u.mode() !== await p.mode() ? [
                "update",
                f,
                await u.oid(),
                await u.mode(),
                !0
              ] : await u.oid() !== await p.oid() ? [
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
                `update entry Unhandled type ${await p.type()}-${await u.type()}`
              ];
          }
      }
    },
    // Modify the default flat mapping
    reduce: async function(f, u) {
      return u = bs(u), f ? f && f[0] === "rmdir" ? (u.push(f), u) : (u.unshift(f), u) : u;
    }
  });
}
async function Rs({
  fs: t,
  onProgress: e,
  onPostCheckout: r,
  dir: i,
  gitdir: n = re.join(i, ".git"),
  remote: a = "origin",
  ref: o,
  filepaths: s,
  noCheckout: l = !1,
  noUpdateHead: f = o === void 0,
  dryRun: u = !1,
  force: m = !1,
  track: p = !0,
  cache: y = {}
}) {
  try {
    H("fs", t), H("dir", i), H("gitdir", n);
    const E = o || "HEAD";
    return await ma({
      fs: new ge(t),
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
      track: p
    });
  } catch (E) {
    throw E.caller = "git.checkout", E;
  }
}
const Gu = new RegExp("^refs/(heads/|tags/|remotes/)?(.*)");
function br(t) {
  const e = Gu.exec(t);
  return e ? e[1] === "remotes/" && t.endsWith("/HEAD") ? e[2].slice(0, -5) : e[2] : t;
}
async function fr({
  fs: t,
  gitdir: e,
  fullname: r = !1,
  test: i = !1
}) {
  const n = await se.resolve({
    fs: t,
    gitdir: e,
    ref: "HEAD",
    depth: 2
  });
  if (i)
    try {
      await se.resolve({ fs: t, gitdir: e, ref: n });
    } catch {
      return;
    }
  if (n.startsWith("refs/"))
    return r ? n : br(n);
}
function Zu(t) {
  return t = t.replace(/^git@([^:]+):/, "https://$1/"), t = t.replace(/^ssh:\/\//, "https://"), t;
}
function Ds({ username: t = "", password: e = "" }) {
  return `Basic ${fe.from(`${t}:${e}`).toString("base64")}`;
}
async function vi(t, e) {
  const r = gs(t);
  for (; ; ) {
    const { value: i, done: n } = await r.next();
    if (i && await e(i), n) break;
  }
  r.return && r.return();
}
async function Pi(t) {
  let e = 0;
  const r = [];
  await vi(t, (a) => {
    r.push(a), e += a.byteLength;
  });
  const i = new Uint8Array(e);
  let n = 0;
  for (const a of r)
    i.set(a, n), n += a.byteLength;
  return i;
}
function yo(t) {
  let e = t.match(/^https?:\/\/([^/]+)@/);
  if (e == null) return { url: t, auth: {} };
  e = e[1];
  const [r, i] = e.split(":");
  return t = t.replace(`${e}@`, ""), { url: t, auth: { username: r, password: i } };
}
function aa(t, e) {
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
    const r = e.length + 4, i = aa(4, r);
    return fe.concat([fe.from(i, "utf8"), e]);
  }
  static streamReader(e) {
    const r = new ys(e);
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
async function _o(t) {
  const e = {};
  let r;
  for (; r = await t(), r !== !0; ) {
    if (r === null) continue;
    r = r.toString("utf8").replace(/\n$/, "");
    const i = r.indexOf("=");
    if (i > -1) {
      const n = r.slice(0, i), a = r.slice(i + 1);
      e[n] = a;
    } else
      e[r] = !0;
  }
  return { protocolVersion: 2, capabilities2: e };
}
async function bo(t, { service: e }) {
  const r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), a = Qe.streamReader(t);
  let o = await a();
  for (; o === null; ) o = await a();
  if (o === !0) throw new ci();
  if (o.includes("version 2"))
    return _o(a);
  if (o.toString("utf8").replace(/\n$/, "") !== `# service=${e}`)
    throw new vr(`# service=${e}\\n`, o.toString("utf8"));
  let s = await a();
  for (; s === null; ) s = await a();
  if (s === !0) return { capabilities: r, refs: i, symrefs: n };
  if (s = s.toString("utf8"), s.includes("version 2"))
    return _o(a);
  const [l, f] = Dn(s, "\0", "\\x00");
  if (f.split(" ").map((u) => r.add(u)), l !== "0000000000000000000000000000000000000000 capabilities^{}") {
    const [u, m] = Dn(l, " ", " ");
    for (i.set(m, u); ; ) {
      const p = await a();
      if (p === !0) break;
      if (p !== null) {
        const [y, E] = Dn(p.toString("utf8"), " ", " ");
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
function Dn(t, e, r) {
  const i = t.trim().split(e);
  if (i.length !== 2)
    throw new vr(
      `Two strings separated by '${r}'`,
      t.toString("utf8")
    );
  return i;
}
const vo = (t, e) => t.endsWith("?") ? `${t}${e}` : `${t}/${e.replace(/^https?:\/\//, "")}`, Eo = (t, e) => {
  (e.username || e.password) && (t.Authorization = Ds(e)), e.headers && Object.assign(t, e.headers);
}, Bn = async (t) => {
  try {
    const e = fe.from(await Pi(t.body)), r = e.toString("utf8");
    return { preview: r.length < 256 ? r : r.slice(0, 256) + "...", response: r, data: e };
  } catch {
    return {};
  }
};
class ji {
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
    let { url: m, auth: p } = yo(l);
    const y = o ? vo(o, m) : m;
    (p.username || p.password) && (f.Authorization = Ds(p)), u === 2 && (f["Git-Protocol"] = "version=2");
    let E, R, $ = !1;
    do
      if (E = await e.request({
        onProgress: r,
        method: "GET",
        url: `${y}/info/refs?service=${s}`,
        headers: f
      }), R = !1, E.statusCode === 401 || E.statusCode === 203) {
        const I = $ ? a : i;
        if (I) {
          if (p = await I(m, {
            ...p,
            headers: { ...f }
          }), p && p.cancel)
            throw new Hr();
          p && (Eo(f, p), $ = !0, R = !0);
        }
      } else E.statusCode === 200 && $ && n && await n(m, p);
    while (R);
    if (E.statusCode !== 200) {
      const { response: I } = await Bn(E);
      throw new Ar(E.statusCode, E.statusMessage, I);
    }
    if (E.headers["content-type"] === `application/x-${s}-advertisement`) {
      const I = await bo(E.body, { service: s });
      return I.auth = p, I;
    } else {
      const { preview: I, response: T, data: A } = await Bn(E);
      try {
        const P = await bo([A], { service: s });
        return P.auth = p, P;
      } catch {
        throw new di(I, T);
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
    const f = yo(a);
    f && (a = f.url), i && (a = vo(i, a)), l["content-type"] = `application/x-${n}-request`, l.accept = `application/x-${n}-result`, Eo(l, o);
    const u = await e.request({
      onProgress: r,
      method: "POST",
      url: `${a}/${n}`,
      body: s,
      headers: l
    });
    if (u.statusCode !== 200) {
      const { response: m } = Bn(u);
      throw new Ar(u.statusCode, u.statusMessage, m);
    }
    return u;
  }
}
function Vu({ url: t }) {
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
class Vi {
  static getRemoteHelperFor({ url: e }) {
    const r = /* @__PURE__ */ new Map();
    r.set("http", ji), r.set("https", ji);
    const i = Vu({ url: e });
    if (!i)
      throw new pi(e);
    if (r.has(i.transport))
      return r.get(i.transport);
    throw new wi(
      e,
      i.transport,
      i.transport === "ssh" ? Zu(e) : void 0
    );
  }
}
let pr = null;
class ti {
  static async read({ fs: e, gitdir: r }) {
    pr === null && (pr = new Qr());
    const i = re.join(r, "shallow"), n = /* @__PURE__ */ new Set();
    return await pr.acquire(i, async function() {
      const a = await e.read(i, { encoding: "utf8" });
      if (a === null || a.trim() === "") return n;
      a.trim().split(`
`).map((o) => n.add(o));
    }), n;
  }
  static async write({ fs: e, gitdir: r, oids: i }) {
    pr === null && (pr = new Qr());
    const n = re.join(r, "shallow");
    if (i.size > 0) {
      const a = [...i].join(`
`) + `
`;
      await pr.acquire(n, async function() {
        await e.write(n, a, {
          encoding: "utf8"
        });
      });
    } else
      await pr.acquire(n, async function() {
        await e.rm(n);
      });
  }
}
async function Xu({ fs: t, gitdir: e, oid: r }) {
  const i = `objects/${r.slice(0, 2)}/${r.slice(2)}`;
  return t.exists(`${e}/${i}`);
}
async function Yu({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  getExternalRefDelta: n
}) {
  let a = await t.readdir(re.join(r, "objects/pack"));
  a = a.filter((o) => o.endsWith(".idx"));
  for (const o of a) {
    const s = `${r}/objects/pack/${o}`, l = await pa({
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
async function ko({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  format: n = "content"
}) {
  const a = (s) => Je({ fs: t, cache: e, gitdir: r, oid: s });
  let o = await Xu({ fs: t, gitdir: r, oid: i });
  return o || (o = await Yu({
    fs: t,
    cache: e,
    gitdir: r,
    oid: i,
    getExternalRefDelta: a
  })), o;
}
function Ku(t) {
  const n = "5041434b" + "00000002" + "00000000";
  return t.slice(0, 12).toString("hex") === n;
}
function Bs(t, e) {
  const r = t.map((i) => i.split("=", 1)[0]);
  return e.filter((i) => {
    const n = i.split("=", 1)[0];
    return r.includes(n);
  });
}
const Xi = {
  name: "isomorphic-git",
  version: "1.30.1",
  agent: "git/isomorphic-git@1.30.1"
};
class Oi {
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
function Ju(t) {
  const e = t.indexOf("\r"), r = t.indexOf(`
`);
  return e === -1 && r === -1 ? -1 : e === -1 ? r + 1 : r === -1 ? e + 1 : r === e + 1 ? r + 1 : Math.min(e, r) + 1;
}
function As(t) {
  const e = new Oi();
  let r = "";
  return (async () => (await vi(t, (i) => {
    for (i = i.toString("utf8"), r += i; ; ) {
      const n = Ju(r);
      if (n === -1) break;
      e.write(r.slice(0, n)), r = r.slice(n);
    }
  }), r.length > 0 && e.write(r), e.end()))(), e;
}
class Os {
  static demux(e) {
    const r = Qe.streamReader(e), i = new Oi(), n = new Oi(), a = new Oi(), o = async function() {
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
async function Qu(t) {
  const { packetlines: e, packfile: r, progress: i } = Os.demux(t), n = [], a = [], o = [];
  let s = !1, l = !1;
  return new Promise((f, u) => {
    vi(e, (m) => {
      const p = m.toString("utf8").trim();
      if (p.startsWith("shallow")) {
        const y = p.slice(-41).trim();
        y.length !== 40 && u(new or(y)), n.push(y);
      } else if (p.startsWith("unshallow")) {
        const y = p.slice(-41).trim();
        y.length !== 40 && u(new or(y)), a.push(y);
      } else if (p.startsWith("ACK")) {
        const [, y, E] = p.split(" ");
        o.push({ oid: y, status: E }), E || (l = !0);
      } else p.startsWith("NAK") ? (s = !0, l = !0) : (l = !0, s = !0);
      l && (t.error ? u(t.error) : f({ shallows: n, unshallows: a, acks: o, nak: s, packfile: r, progress: i }));
    }).finally(() => {
      l || (t.error ? u(t.error) : f({ shallows: n, unshallows: a, acks: o, nak: s, packfile: r, progress: i }));
    });
  });
}
function ef({
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
  let l = ` ${t.join(" ")}`;
  for (const f of e)
    s.push(Qe.encode(`want ${f}${l}
`)), l = "";
  for (const f of i)
    s.push(Qe.encode(`shallow ${f}
`));
  n !== null && s.push(Qe.encode(`deepen ${n}
`)), a !== null && s.push(
    Qe.encode(`deepen-since ${Math.floor(a.valueOf() / 1e3)}
`)
  );
  for (const f of o)
    s.push(Qe.encode(`deepen-not ${f}
`));
  s.push(Qe.flush());
  for (const f of r)
    s.push(Qe.encode(`have ${f}
`));
  return s.push(Qe.encode(`done
`)), s;
}
async function ga({
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
  url: p,
  corsProxy: y,
  depth: E = null,
  since: R = null,
  exclude: $ = [],
  relative: I = !1,
  tags: T = !1,
  singleBranch: A = !1,
  headers: P = {},
  prune: U = !1,
  pruneTags: M = !1
}) {
  const B = f || await fr({ fs: t, gitdir: l, test: !0 }), O = await it.get({ fs: t, gitdir: l }), W = m || B && await O.get(`branch.${B}.remote`) || "origin", z = p || await O.get(`remote.${W}.url`);
  if (typeof z > "u")
    throw new yt("remote OR url");
  const K = u || B && await O.get(`branch.${B}.merge`) || f || "HEAD";
  y === void 0 && (y = await O.get("http.corsProxy"));
  const N = Vi.getRemoteHelperFor({ url: z }), Q = await N.discover({
    http: r,
    onAuth: a,
    onAuthSuccess: o,
    onAuthFailure: s,
    corsProxy: y,
    service: "git-upload-pack",
    url: z,
    headers: P,
    protocolVersion: 1
  }), ce = Q.auth, _e = Q.refs;
  if (_e.size === 0)
    return {
      defaultBranch: null,
      fetchHead: null,
      fetchHeadDescription: null
    };
  if (E !== null && !Q.capabilities.has("shallow"))
    throw new ar("shallow", "depth");
  if (R !== null && !Q.capabilities.has("deepen-since"))
    throw new ar("deepen-since", "since");
  if ($.length > 0 && !Q.capabilities.has("deepen-not"))
    throw new ar("deepen-not", "exclude");
  if (I === !0 && !Q.capabilities.has("deepen-relative"))
    throw new ar("deepen-relative", "relative");
  const { oid: ne, fullref: Y } = se.resolveAgainstMap({
    ref: K,
    map: _e
  });
  for (const pe of _e.keys())
    pe === Y || pe === "HEAD" || pe.startsWith("refs/heads/") || T && pe.startsWith("refs/tags/") || _e.delete(pe);
  const ae = Bs(
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
      `agent=${Xi.agent}`
    ]
  );
  I && ae.push("deepen-relative");
  const we = A ? [ne] : _e.values(), Se = A ? [B] : await se.listRefs({
    fs: t,
    gitdir: l,
    filepath: "refs"
  });
  let $e = [];
  for (let pe of Se)
    try {
      pe = await se.expand({ fs: t, gitdir: l, ref: pe });
      const Oe = await se.resolve({ fs: t, gitdir: l, ref: pe });
      await ko({ fs: t, cache: e, gitdir: l, oid: Oe }) && $e.push(Oe);
    } catch {
    }
  $e = [...new Set($e)];
  const be = await ti.read({ fs: t, gitdir: l }), Be = Q.capabilities.has("shallow") ? [...be] : [], ye = ef({
    capabilities: ae,
    wants: we,
    haves: $e,
    shallows: Be,
    depth: E,
    since: R,
    exclude: $
  }), Re = fe.from(await Pi(ye)), ke = await N.connect({
    http: r,
    onProgress: i,
    corsProxy: y,
    service: "git-upload-pack",
    url: z,
    auth: ce,
    body: [Re],
    headers: P
  }), Ee = await Qu(ke.body);
  ke.headers && (Ee.headers = ke.headers);
  for (const pe of Ee.shallows)
    if (!be.has(pe))
      try {
        const { object: Oe } = await Je({ fs: t, cache: e, gitdir: l, oid: pe }), Ze = new Xe(Oe), Me = await Promise.all(
          Ze.headers().parent.map((Ce) => ko({ fs: t, cache: e, gitdir: l, oid: Ce }))
        );
        Me.length === 0 || Me.every((Ce) => Ce) || be.add(pe);
      } catch {
        be.add(pe);
      }
  for (const pe of Ee.unshallows)
    be.delete(pe);
  if (await ti.write({ fs: t, gitdir: l, oids: be }), A) {
    const pe = /* @__PURE__ */ new Map([[Y, ne]]), Oe = /* @__PURE__ */ new Map();
    let Ze = 10, Me = Y;
    for (; Ze--; ) {
      const xe = Q.symrefs.get(Me);
      if (xe === void 0) break;
      Oe.set(Me, xe), Me = xe;
    }
    const ze = _e.get(Me);
    ze && pe.set(Me, ze);
    const { pruned: Ce } = await se.updateRemoteRefs({
      fs: t,
      gitdir: l,
      remote: W,
      refs: pe,
      symrefs: Oe,
      tags: T,
      prune: U
    });
    U && (Ee.pruned = Ce);
  } else {
    const { pruned: pe } = await se.updateRemoteRefs({
      fs: t,
      gitdir: l,
      remote: W,
      refs: _e,
      symrefs: Q.symrefs,
      tags: T,
      prune: U,
      pruneTags: M
    });
    U && (Ee.pruned = pe);
  }
  if (Ee.HEAD = Q.symrefs.get("HEAD"), Ee.HEAD === void 0) {
    const { oid: pe } = se.resolveAgainstMap({
      ref: "HEAD",
      map: _e
    });
    for (const [Oe, Ze] of _e.entries())
      if (Oe !== "HEAD" && Ze === pe) {
        Ee.HEAD = Oe;
        break;
      }
  }
  const Ae = Y.startsWith("refs/tags") ? "tag" : "branch";
  if (Ee.FETCH_HEAD = {
    oid: ne,
    description: `${Ae} '${br(Y)}' of ${z}`
  }, i || n) {
    const pe = As(Ee.progress);
    vi(pe, async (Oe) => {
      if (n && await n(Oe), i) {
        const Ze = Oe.match(/([^:]*).*\((\d+?)\/(\d+?)\)/);
        Ze && await i({
          phase: Ze[1].trim(),
          loaded: parseInt(Ze[2], 10),
          total: parseInt(Ze[3], 10)
        });
      }
    });
  }
  const qe = fe.from(await Pi(Ee.packfile));
  if (ke.body.error) throw ke.body.error;
  const rt = qe.slice(-20).toString("hex"), je = {
    defaultBranch: Ee.HEAD,
    fetchHead: Ee.FETCH_HEAD.oid,
    fetchHeadDescription: Ee.FETCH_HEAD.description
  };
  if (Ee.headers && (je.headers = Ee.headers), U && (je.pruned = Ee.pruned), rt !== "" && !Ku(qe)) {
    je.packfile = `objects/pack/pack-${rt}.pack`;
    const pe = re.join(l, je.packfile);
    await t.write(pe, qe);
    const Oe = (Me) => Je({ fs: t, cache: e, gitdir: l, oid: Me }), Ze = await Br.fromPack({
      pack: qe,
      getExternalRefDelta: Oe,
      onProgress: i
    });
    await t.write(pe.replace(/\.pack$/, ".idx"), await Ze.toBuffer());
  }
  return je;
}
async function Cs({
  fs: t,
  bare: e = !1,
  dir: r,
  gitdir: i = e ? r : re.join(r, ".git"),
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
    `[core]
	repositoryformatversion = 0
	filemode = false
	bare = ${e}
` + (e ? "" : `	logallrefupdates = true
`) + `	symlinks = false
	ignorecase = true
`
  ), await t.write(i + "/HEAD", `ref: refs/heads/${n}
`);
}
async function tf({
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
  corsProxy: p,
  ref: y,
  remote: E,
  depth: R,
  since: $,
  exclude: I,
  relative: T,
  singleBranch: A,
  noCheckout: P,
  noTags: U,
  headers: M
}) {
  try {
    if (await Cs({ fs: t, gitdir: u }), await Ts({ fs: t, gitdir: u, remote: E, url: m, force: !1 }), p) {
      const W = await it.get({ fs: t, gitdir: u });
      await W.set("http.corsProxy", p), await it.save({ fs: t, gitdir: u, config: W });
    }
    const { defaultBranch: B, fetchHead: O } = await ga({
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
      corsProxy: p,
      depth: R,
      since: $,
      exclude: I,
      relative: T,
      singleBranch: A,
      headers: M,
      tags: !U
    });
    if (O === null) return;
    y = y || B, y = y.replace("refs/heads/", ""), await ma({
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
  } catch (B) {
    throw await t.rmdir(u, { recursive: !0, maxRetries: 10 }).catch(() => {
    }), B;
  }
}
async function rf({
  fs: t,
  http: e,
  onProgress: r,
  onMessage: i,
  onAuth: n,
  onAuthSuccess: a,
  onAuthFailure: o,
  onPostCheckout: s,
  dir: l,
  gitdir: f = re.join(l, ".git"),
  url: u,
  corsProxy: m = void 0,
  ref: p = void 0,
  remote: y = "origin",
  depth: E = void 0,
  since: R = void 0,
  exclude: $ = [],
  relative: I = !1,
  singleBranch: T = !1,
  noCheckout: A = !1,
  noTags: P = !1,
  headers: U = {},
  cache: M = {}
}) {
  try {
    return H("fs", t), H("http", e), H("gitdir", f), A || H("dir", l), H("url", u), await tf({
      fs: new ge(t),
      cache: M,
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
      ref: p,
      remote: y,
      depth: E,
      since: R,
      exclude: $,
      relative: I,
      singleBranch: T,
      noCheckout: A,
      noTags: P,
      headers: U
    });
  } catch (B) {
    throw B.caller = "git.clone", B;
  }
}
async function nf({
  fs: t,
  onSign: e,
  dir: r,
  gitdir: i = re.join(r, ".git"),
  message: n,
  author: a,
  committer: o,
  signingKey: s,
  amend: l = !1,
  dryRun: f = !1,
  noUpdateBranch: u = !1,
  ref: m,
  parent: p,
  tree: y,
  cache: E = {}
}) {
  try {
    H("fs", t), l || H("message", n), s && H("onSign", e);
    const R = new ge(t);
    return await Zi({
      fs: R,
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
      parent: p,
      tree: y
    });
  } catch (R) {
    throw R.caller = "git.commit", R;
  }
}
async function af({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  fullname: i = !1,
  test: n = !1
}) {
  try {
    return H("fs", t), H("gitdir", r), await fr({
      fs: new ge(t),
      gitdir: r,
      fullname: i,
      test: n
    });
  } catch (a) {
    throw a.caller = "git.currentBranch", a;
  }
}
async function of({ fs: t, gitdir: e, ref: r }) {
  if (r = r.startsWith("refs/heads/") ? r : `refs/heads/${r}`, !await se.exists({ fs: t, gitdir: e, ref: r }))
    throw new Pe(r);
  const n = await se.expand({ fs: t, gitdir: e, ref: r }), a = await fr({ fs: t, gitdir: e, fullname: !0 });
  if (n === a) {
    const l = await se.resolve({ fs: t, gitdir: e, ref: n });
    await se.writeRef({ fs: t, gitdir: e, ref: "HEAD", value: l });
  }
  await se.deleteRef({ fs: t, gitdir: e, ref: n });
  const o = br(r), s = await it.get({ fs: t, gitdir: e });
  await s.deleteSection("branch", o), await it.save({ fs: t, gitdir: e, config: s });
}
async function sf({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: i
}) {
  try {
    return H("fs", t), H("ref", i), await of({
      fs: new ge(t),
      gitdir: r,
      ref: i
    });
  } catch (n) {
    throw n.caller = "git.deleteBranch", n;
  }
}
async function cf({ fs: t, dir: e, gitdir: r = re.join(e, ".git"), ref: i }) {
  try {
    H("fs", t), H("ref", i), await se.deleteRef({ fs: new ge(t), gitdir: r, ref: i });
  } catch (n) {
    throw n.caller = "git.deleteRef", n;
  }
}
async function lf({ fs: t, gitdir: e, remote: r }) {
  const i = await it.get({ fs: t, gitdir: e });
  await i.deleteSection("remote", r), await it.save({ fs: t, gitdir: e, config: i });
}
async function uf({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  remote: i
}) {
  try {
    return H("fs", t), H("remote", i), await lf({
      fs: new ge(t),
      gitdir: r,
      remote: i
    });
  } catch (n) {
    throw n.caller = "git.deleteRemote", n;
  }
}
async function ff({ fs: t, gitdir: e, ref: r }) {
  r = r.startsWith("refs/tags/") ? r : `refs/tags/${r}`, await se.deleteRef({ fs: t, gitdir: e, ref: r });
}
async function hf({ fs: t, dir: e, gitdir: r = re.join(e, ".git"), ref: i }) {
  try {
    return H("fs", t), H("ref", i), await ff({
      fs: new ge(t),
      gitdir: r,
      ref: i
    });
  } catch (n) {
    throw n.caller = "git.deleteTag", n;
  }
}
async function df({ fs: t, gitdir: e, oid: r }) {
  const i = r.slice(0, 2);
  return (await t.readdir(`${e}/objects/${i}`)).map((a) => `${i}${a}`).filter((a) => a.startsWith(r));
}
async function wf({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  getExternalRefDelta: n
}) {
  const a = [];
  let o = await t.readdir(re.join(r, "objects/pack"));
  o = o.filter((s) => s.endsWith(".idx"));
  for (const s of o) {
    const l = `${r}/objects/pack/${s}`, f = await pa({
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
async function pf({ fs: t, cache: e, gitdir: r, oid: i }) {
  const n = (s) => Je({ fs: t, cache: e, gitdir: r, oid: s }), a = await df({ fs: t, gitdir: r, oid: i }), o = await wf({
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
  throw a.length > 1 ? new ai("oids", i, a) : new Pe(`an object matching "${i}"`);
}
async function mf({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oid: i,
  cache: n = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("oid", i), await pf({
      fs: new ge(t),
      cache: n,
      gitdir: r,
      oid: i
    });
  } catch (a) {
    throw a.caller = "git.expandOid", a;
  }
}
async function gf({ fs: t, dir: e, gitdir: r = re.join(e, ".git"), ref: i }) {
  try {
    return H("fs", t), H("gitdir", r), H("ref", i), await se.expand({
      fs: new ge(t),
      gitdir: r,
      ref: i
    });
  } catch (n) {
    throw n.caller = "git.expandRef", n;
  }
}
async function ya({ fs: t, cache: e, gitdir: r, oids: i }) {
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
        const { object: m } = await Je({ fs: t, cache: e, gitdir: r, oid: f }), p = Xe.from(m), { parent: y } = p.parseHeaders();
        for (const E of y)
          (!n[E] || !n[E].has(u)) && l.set(E + ":" + u, { oid: E, index: u });
      } catch {
      }
    o = Array.from(l.values());
  }
  return [];
}
const An = /^.*(\r?\n|$)/gm;
function yf({ branches: t, contents: e }) {
  const r = t[1], i = t[2], n = e[0], a = e[1], o = e[2], s = a.match(An), l = n.match(An), f = o.match(An), u = Fl(s, l, f), m = 7;
  let p = "", y = !0;
  for (const E of u)
    E.ok && (p += E.ok.join("")), E.conflict && (y = !1, p += `${"<".repeat(m)} ${r}
`, p += E.conflict.a.join(""), p += `${"=".repeat(m)}
`, p += E.conflict.b.join(""), p += `${">".repeat(m)} ${i}
`);
  return { cleanMerge: y, mergedText: p };
}
async function _f({
  fs: t,
  cache: e,
  dir: r,
  gitdir: i = re.join(r, ".git"),
  index: n,
  ourOid: a,
  baseOid: o,
  theirOid: s,
  ourName: l = "ours",
  baseName: f = "base",
  theirName: u = "theirs",
  dryRun: m = !1,
  abortOnConflict: p = !0,
  mergeDriver: y
}) {
  const E = Dt({ ref: a }), R = Dt({ ref: o }), $ = Dt({ ref: s }), I = [], T = [], A = [], P = [], U = await cr({
    fs: t,
    cache: e,
    dir: r,
    gitdir: i,
    trees: [E, R, $],
    map: async function(M, [B, O, W]) {
      const z = Ni(M), K = await Li(B, O), N = await Li(W, O);
      switch (`${K}-${N}`) {
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
          return B ? {
            mode: await B.mode(),
            path: z,
            oid: await B.oid(),
            type: await B.type()
          } : void 0;
        case "true-true": {
          if (B && O && W && await B.type() === "blob" && await O.type() === "blob" && await W.type() === "blob")
            return bf({
              fs: t,
              gitdir: i,
              path: z,
              ours: B,
              base: O,
              theirs: W,
              ourName: l,
              baseName: f,
              theirName: u,
              mergeDriver: y
            }).then(async (Q) => {
              if (Q.cleanMerge)
                p || n.insert({ filepath: M, oid: Q.mergeResult.oid, stage: 0 });
              else if (I.push(M), T.push(M), !p) {
                const ce = await O.oid(), _e = await B.oid(), ne = await W.oid();
                n.delete({ filepath: M }), n.insert({ filepath: M, oid: ce, stage: 1 }), n.insert({ filepath: M, oid: _e, stage: 2 }), n.insert({ filepath: M, oid: ne, stage: 3 });
              }
              return Q.mergeResult;
            });
          if (O && !B && W && await O.type() === "blob" && await W.type() === "blob") {
            if (I.push(M), A.push(M), !p) {
              const Q = await O.oid(), ce = await W.oid();
              n.delete({ filepath: M }), n.insert({ filepath: M, oid: Q, stage: 1 }), n.insert({ filepath: M, oid: ce, stage: 3 });
            }
            return {
              mode: await W.mode(),
              oid: await W.oid(),
              type: "blob",
              path: z
            };
          }
          if (O && B && !W && await O.type() === "blob" && await B.type() === "blob") {
            if (I.push(M), P.push(M), !p) {
              const Q = await O.oid(), ce = await B.oid();
              n.delete({ filepath: M }), n.insert({ filepath: M, oid: Q, stage: 1 }), n.insert({ filepath: M, oid: ce, stage: 2 });
            }
            return {
              mode: await B.mode(),
              oid: await B.oid(),
              type: "blob",
              path: z
            };
          }
          if (O && !B && !W && await O.type() === "blob")
            return;
          throw new jr();
        }
      }
    },
    /**
     * @param {TreeEntry} [parent]
     * @param {Array<TreeEntry>} children
     */
    reduce: I.length !== 0 && (!r || p) ? void 0 : async (M, B) => {
      const O = B.filter(Boolean);
      if (M && !(M && M.type === "tree" && O.length === 0)) {
        if (O.length > 0) {
          const z = new _t(O).toObject(), K = await bt({
            fs: t,
            gitdir: i,
            type: "tree",
            object: z,
            dryRun: m
          });
          M.oid = K;
        }
        return M;
      }
    }
  });
  return I.length !== 0 ? (r && !p && await cr({
    fs: t,
    cache: e,
    dir: r,
    gitdir: i,
    trees: [Dt({ ref: U.oid })],
    map: async function(M, [B]) {
      const O = `${r}/${M}`;
      if (await B.type() === "blob") {
        const W = await B.mode(), z = new TextDecoder().decode(await B.content());
        await t.write(O, z, { mode: W });
      }
      return !0;
    }
  }), new zr(
    I,
    T,
    A,
    P
  )) : U.oid;
}
async function bf({
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
  mergeDriver: u = yf
}) {
  const m = "blob", p = await n.mode() === await i.mode() ? await a.mode() : await i.mode();
  if (await i.oid() === await a.oid())
    return {
      cleanMerge: !0,
      mergeResult: { mode: p, path: r, oid: await i.oid(), type: m }
    };
  if (await i.oid() === await n.oid())
    return {
      cleanMerge: !0,
      mergeResult: { mode: p, path: r, oid: await a.oid(), type: m }
    };
  if (await a.oid() === await n.oid())
    return {
      cleanMerge: !0,
      mergeResult: { mode: p, path: r, oid: await i.oid(), type: m }
    };
  const y = fe.from(await i.content()).toString("utf8"), E = fe.from(await n.content()).toString("utf8"), R = fe.from(await a.content()).toString("utf8"), { mergedText: $, cleanMerge: I } = await u({
    branches: [l, o, s],
    contents: [E, y, R],
    path: r
  }), T = await bt({
    fs: t,
    gitdir: e,
    type: "blob",
    object: fe.from($, "utf8"),
    dryRun: f
  });
  return { cleanMerge: I, mergeResult: { mode: p, path: r, oid: T, type: m } };
}
async function Ns({
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
  author: p,
  committer: y,
  signingKey: E,
  onSign: R,
  mergeDriver: $
}) {
  n === void 0 && (n = await fr({ fs: t, gitdir: i, fullname: !0 })), n = await se.expand({
    fs: t,
    gitdir: i,
    ref: n
  }), a = await se.expand({
    fs: t,
    gitdir: i,
    ref: a
  });
  const I = await se.resolve({
    fs: t,
    gitdir: i,
    ref: n
  }), T = await se.resolve({
    fs: t,
    gitdir: i,
    ref: a
  }), A = await ya({
    fs: t,
    cache: e,
    gitdir: i,
    oids: [I, T]
  });
  if (A.length !== 1)
    throw new jr();
  const P = A[0];
  if (P === T)
    return {
      oid: I,
      alreadyMerged: !0
    };
  if (o && P === I)
    return !l && !f && await se.writeRef({ fs: t, gitdir: i, ref: n, value: T }), {
      oid: T,
      fastForward: !0
    };
  {
    if (s)
      throw new li();
    const U = await ot.acquire(
      { fs: t, gitdir: i, cache: e, allowUnmerged: !1 },
      async (B) => _f({
        fs: t,
        cache: e,
        dir: r,
        gitdir: i,
        index: B,
        ourOid: I,
        theirOid: T,
        baseOid: P,
        ourName: br(n),
        baseName: "base",
        theirName: br(a),
        dryRun: l,
        abortOnConflict: u,
        mergeDriver: $
      })
    );
    if (U instanceof zr) throw U;
    return m || (m = `Merge branch '${br(a)}' into ${br(
      n
    )}`), {
      oid: await Zi({
        fs: t,
        cache: e,
        gitdir: i,
        message: m,
        ref: n,
        tree: U,
        parent: [I, T],
        author: p,
        committer: y,
        signingKey: E,
        onSign: R,
        dryRun: l,
        noUpdateBranch: f
      }),
      tree: U,
      mergeCommit: !0
    };
  }
}
async function Fs({
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
  remote: p,
  remoteRef: y,
  prune: E,
  pruneTags: R,
  fastForward: $,
  fastForwardOnly: I,
  corsProxy: T,
  singleBranch: A,
  headers: P,
  author: U,
  committer: M,
  signingKey: B
}) {
  try {
    if (!u) {
      const z = await fr({ fs: t, gitdir: f });
      if (!z)
        throw new yt("ref");
      u = z;
    }
    const { fetchHead: O, fetchHeadDescription: W } = await ga({
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
      remote: p,
      remoteRef: y,
      singleBranch: A,
      headers: P,
      prune: E,
      pruneTags: R
    });
    await Ns({
      fs: t,
      cache: e,
      gitdir: f,
      ours: u,
      theirs: O,
      fastForward: $,
      fastForwardOnly: I,
      message: `Merge ${W}`,
      author: U,
      committer: M,
      signingKey: B,
      dryRun: !1,
      noUpdateBranch: !1
    }), await ma({
      fs: t,
      cache: e,
      onProgress: i,
      dir: l,
      gitdir: f,
      ref: u,
      remote: p,
      noCheckout: !1
    });
  } catch (O) {
    throw O.caller = "git.pull", O;
  }
}
async function vf({
  fs: t,
  http: e,
  onProgress: r,
  onMessage: i,
  onAuth: n,
  onAuthSuccess: a,
  onAuthFailure: o,
  dir: s,
  gitdir: l = re.join(s, ".git"),
  ref: f,
  url: u,
  remote: m,
  remoteRef: p,
  corsProxy: y,
  singleBranch: E,
  headers: R = {},
  cache: $ = {}
}) {
  try {
    H("fs", t), H("http", e), H("gitdir", l);
    const I = {
      name: "",
      email: "",
      timestamp: Date.now(),
      timezoneOffset: 0
    };
    return await Fs({
      fs: new ge(t),
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
      remoteRef: p,
      fastForwardOnly: !0,
      corsProxy: y,
      singleBranch: E,
      headers: R,
      author: I,
      committer: I
    });
  } catch (I) {
    throw I.caller = "git.fastForward", I;
  }
}
async function Ef({
  fs: t,
  http: e,
  onProgress: r,
  onMessage: i,
  onAuth: n,
  onAuthSuccess: a,
  onAuthFailure: o,
  dir: s,
  gitdir: l = re.join(s, ".git"),
  ref: f,
  remote: u,
  remoteRef: m,
  url: p,
  corsProxy: y,
  depth: E = null,
  since: R = null,
  exclude: $ = [],
  relative: I = !1,
  tags: T = !1,
  singleBranch: A = !1,
  headers: P = {},
  prune: U = !1,
  pruneTags: M = !1,
  cache: B = {}
}) {
  try {
    return H("fs", t), H("http", e), H("gitdir", l), await ga({
      fs: new ge(t),
      cache: B,
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
      url: p,
      corsProxy: y,
      depth: E,
      since: R,
      exclude: $,
      relative: I,
      tags: T,
      singleBranch: A,
      headers: P,
      prune: U,
      pruneTags: M
    });
  } catch (O) {
    throw O.caller = "git.fetch", O;
  }
}
async function kf({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oids: i,
  cache: n = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("oids", i), await ya({
      fs: new ge(t),
      cache: n,
      gitdir: r,
      oids: i
    });
  } catch (a) {
    throw a.caller = "git.findMergeBase", a;
  }
}
async function Ms({ fs: t, filepath: e }) {
  if (await t.exists(re.join(e, ".git")))
    return e;
  {
    const r = Dr(e);
    if (r === e)
      throw new Pe(`git root for ${e}`);
    return Ms({ fs: t, filepath: r });
  }
}
async function Sf({ fs: t, filepath: e }) {
  try {
    return H("fs", t), H("filepath", e), await Ms({ fs: new ge(t), filepath: e });
  } catch (r) {
    throw r.caller = "git.findRoot", r;
  }
}
async function xf({ fs: t, dir: e, gitdir: r = re.join(e, ".git"), path: i }) {
  try {
    return H("fs", t), H("gitdir", r), H("path", i), await ei({
      fs: new ge(t),
      gitdir: r,
      path: i
    });
  } catch (n) {
    throw n.caller = "git.getConfig", n;
  }
}
async function If({ fs: t, gitdir: e, path: r }) {
  return (await it.get({ fs: t, gitdir: e })).getall(r);
}
async function Tf({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  path: i
}) {
  try {
    return H("fs", t), H("gitdir", r), H("path", i), await If({
      fs: new ge(t),
      gitdir: r,
      path: i
    });
  } catch (n) {
    throw n.caller = "git.getConfigAll", n;
  }
}
async function $f({
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
    const f = await Vi.getRemoteHelperFor({ url: a }).discover({
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
    for (const [m, p] of f.refs) {
      const y = m.split("/"), E = y.pop();
      let R = u;
      for (const $ of y)
        R[$] = R[$] || {}, R = R[$];
      R[E] = p;
    }
    for (const [m, p] of f.symrefs) {
      const y = m.split("/"), E = y.pop();
      let R = u;
      for (const $ of y)
        R[$] = R[$] || {}, R = R[$];
      R[E] = p;
    }
    return u;
  } catch (l) {
    throw l.caller = "git.getRemoteInfo", l;
  }
}
function Us(t, e, r, i) {
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
async function Rf({
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
    const u = await Vi.getRemoteHelperFor({ url: a }).discover({
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
    for (const p of u.capabilities) {
      const [y, E] = p.split("=");
      E ? m[y] = E : m[y] = !0;
    }
    return {
      protocolVersion: 1,
      capabilities: m,
      refs: Us(u, void 0, !0, !0)
    };
  } catch (f) {
    throw f.caller = "git.getRemoteInfo2", f;
  }
}
async function Df({
  type: t,
  object: e,
  format: r = "content",
  oid: i = void 0
}) {
  return r !== "deflated" && (r !== "wrapped" && (e = Pr.wrap({ type: t, object: e })), i = await Jt(e)), { oid: i, object: e };
}
async function Bf({ object: t }) {
  try {
    H("object", t), typeof t == "string" ? t = fe.from(t, "utf8") : t = fe.from(t);
    const e = "blob", { oid: r, object: i } = await Df({
      type: "blob",
      format: "content",
      object: t
    });
    return { oid: r, type: e, object: new Uint8Array(i), format: "wrapped" };
  } catch (e) {
    throw e.caller = "git.hashBlob", e;
  }
}
async function Af({
  fs: t,
  cache: e,
  onProgress: r,
  dir: i,
  gitdir: n,
  filepath: a
}) {
  try {
    a = re.join(i, a);
    const o = await t.read(a), s = (f) => Je({ fs: t, cache: e, gitdir: n, oid: f }), l = await Br.fromPack({
      pack: o,
      getExternalRefDelta: s,
      onProgress: r
    });
    return await t.write(a.replace(/\.pack$/, ".idx"), await l.toBuffer()), {
      oids: [...l.hashes]
    };
  } catch (o) {
    throw o.caller = "git.indexPack", o;
  }
}
async function Of({
  fs: t,
  onProgress: e,
  dir: r,
  gitdir: i = re.join(r, ".git"),
  filepath: n,
  cache: a = {}
}) {
  try {
    return H("fs", t), H("dir", r), H("gitdir", r), H("filepath", n), await Af({
      fs: new ge(t),
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
async function Cf({
  fs: t,
  bare: e = !1,
  dir: r,
  gitdir: i = e ? r : re.join(r, ".git"),
  defaultBranch: n = "master"
}) {
  try {
    return H("fs", t), H("gitdir", i), e || H("dir", r), await Cs({
      fs: new ge(t),
      bare: e,
      dir: r,
      gitdir: i,
      defaultBranch: n
    });
  } catch (a) {
    throw a.caller = "git.init", a;
  }
}
async function Ls({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  ancestor: n,
  depth: a
}) {
  const o = await ti.read({ fs: t, gitdir: r });
  if (!i)
    throw new yt("oid");
  if (!n)
    throw new yt("ancestor");
  if (i === n) return !1;
  const s = [i], l = /* @__PURE__ */ new Set();
  let f = 0;
  for (; s.length; ) {
    if (f++ === a)
      throw new fi(a);
    const u = s.shift(), { type: m, object: p } = await Je({
      fs: t,
      cache: e,
      gitdir: r,
      oid: u
    });
    if (m !== "commit")
      throw new pt(u, m, "commit");
    const y = Xe.from(p).parse();
    for (const E of y.parent)
      if (E === n) return !0;
    if (!o.has(u))
      for (const E of y.parent)
        l.has(E) || (s.push(E), l.add(E));
  }
  return !1;
}
async function Nf({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oid: i,
  ancestor: n,
  depth: a = -1,
  cache: o = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("oid", i), H("ancestor", n), await Ls({
      fs: new ge(t),
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
async function Ff({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  filepath: i
}) {
  try {
    return H("fs", t), H("dir", e), H("gitdir", r), H("filepath", i), Wr.isIgnored({
      fs: new ge(t),
      dir: e,
      gitdir: r,
      filepath: i
    });
  } catch (n) {
    throw n.caller = "git.isIgnored", n;
  }
}
async function Mf({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  remote: i
}) {
  try {
    return H("fs", t), H("gitdir", r), se.listBranches({
      fs: new ge(t),
      gitdir: r,
      remote: i
    });
  } catch (n) {
    throw n.caller = "git.listBranches", n;
  }
}
async function Uf({ fs: t, gitdir: e, ref: r, cache: i }) {
  if (r) {
    const n = await se.resolve({ gitdir: e, fs: t, ref: r }), a = [];
    return await Ps({
      fs: t,
      cache: i,
      gitdir: e,
      oid: n,
      filenames: a,
      prefix: ""
    }), a;
  } else
    return ot.acquire({ fs: t, gitdir: e, cache: i }, async function(n) {
      return n.entries.map((a) => a.path);
    });
}
async function Ps({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  filenames: n,
  prefix: a
}) {
  const { tree: o } = await qr({ fs: t, cache: e, gitdir: r, oid: i });
  for (const s of o)
    s.type === "tree" ? await Ps({
      fs: t,
      cache: e,
      gitdir: r,
      oid: s.oid,
      filenames: n,
      prefix: re.join(a, s.path)
    }) : n.push(re.join(a, s.path));
}
async function Lf({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: i,
  cache: n = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), await Uf({
      fs: new ge(t),
      cache: n,
      gitdir: r,
      ref: i
    });
  } catch (a) {
    throw a.caller = "git.listFiles", a;
  }
}
async function Pf({ fs: t, cache: e, gitdir: r, ref: i }) {
  let n;
  try {
    n = await se.resolve({ gitdir: r, fs: t, ref: i });
  } catch (s) {
    if (s instanceof Pe)
      return [];
  }
  return (await qr({
    fs: t,
    cache: e,
    gitdir: r,
    oid: n
  })).tree.map((s) => ({
    target: s.path,
    note: s.oid
  }));
}
async function jf({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: i = "refs/notes/commits",
  cache: n = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("ref", i), await Pf({
      fs: new ge(t),
      cache: n,
      gitdir: r,
      ref: i
    });
  } catch (a) {
    throw a.caller = "git.listNotes", a;
  }
}
async function zf({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  filepath: i
}) {
  try {
    return H("fs", t), H("gitdir", r), se.listRefs({ fs: new ge(t), gitdir: r, filepath: i });
  } catch (n) {
    throw n.caller = "git.listRefs", n;
  }
}
async function Hf({ fs: t, gitdir: e }) {
  const r = await it.get({ fs: t, gitdir: e }), i = await r.getSubsections("remote");
  return Promise.all(
    i.map(async (a) => {
      const o = await r.get(`remote.${a}.url`);
      return { remote: a, url: o };
    })
  );
}
async function Wf({ fs: t, dir: e, gitdir: r = re.join(e, ".git") }) {
  try {
    return H("fs", t), H("gitdir", r), await Hf({
      fs: new ge(t),
      gitdir: r
    });
  } catch (i) {
    throw i.caller = "git.listRemotes", i;
  }
}
async function qf(t) {
  const e = Qe.streamReader(t), r = [];
  let i;
  for (; i = await e(), i !== !0; ) {
    if (i === null) continue;
    i = i.toString("utf8").replace(/\n$/, "");
    const [n, a, ...o] = i.split(" "), s = { ref: a, oid: n };
    for (const l of o) {
      const [f, u] = l.split(":");
      f === "symref-target" ? s.target = u : f === "peeled" && (s.peeled = u);
    }
    r.push(s);
  }
  return r;
}
async function Gf({ prefix: t, symrefs: e, peelTags: r }) {
  const i = [];
  return i.push(Qe.encode(`command=ls-refs
`)), i.push(Qe.encode(`agent=${Xi.agent}
`)), (r || e || t) && i.push(Qe.delim()), r && i.push(Qe.encode("peel")), e && i.push(Qe.encode("symrefs")), t && i.push(Qe.encode(`ref-prefix ${t}`)), i.push(Qe.flush()), i;
}
async function Zf({
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
    const p = await ji.discover({
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
    if (p.protocolVersion === 1)
      return Us(p, f, u, m);
    const y = await Gf({ prefix: f, symrefs: u, peelTags: m }), E = await ji.connect({
      http: t,
      auth: p.auth,
      headers: o,
      corsProxy: n,
      service: s ? "git-receive-pack" : "git-upload-pack",
      url: a,
      body: y
    });
    return qf(E.body);
  } catch (p) {
    throw p.caller = "git.listServerRefs", p;
  }
}
async function Vf({ fs: t, dir: e, gitdir: r = re.join(e, ".git") }) {
  try {
    return H("fs", t), H("gitdir", r), se.listTags({ fs: new ge(t), gitdir: r });
  } catch (i) {
    throw i.caller = "git.listTags", i;
  }
}
function Xf(t, e) {
  return t.committer.timestamp - e.committer.timestamp;
}
const Yf = "e69de29bb2d1d6434b8b29ae775ad8c2e48c5391";
async function So({ fs: t, cache: e, gitdir: r, oid: i, fileId: n }) {
  if (n === Yf) return;
  const a = i;
  let o;
  const s = await Cr({ fs: t, cache: e, gitdir: r, oid: i }), l = s.tree;
  return n === s.oid ? o = s.path : (o = await js({
    fs: t,
    cache: e,
    gitdir: r,
    tree: l,
    fileId: n,
    oid: a
  }), Array.isArray(o) && (o.length === 0 ? o = void 0 : o.length === 1 && (o = o[0]))), o;
}
async function js({
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
    return f.oid === n ? (u = re.join(s, f.path), o.push(u)) : f.type === "tree" && (u = Je({
      fs: t,
      cache: e,
      gitdir: r,
      oid: f.oid
    }).then(function({ object: m }) {
      return js({
        fs: t,
        cache: e,
        gitdir: r,
        tree: _t.from(m),
        fileId: n,
        oid: a,
        filepaths: o,
        parentPath: re.join(s, f.path)
      });
    })), u;
  });
  return await Promise.all(l), o;
}
async function Kf({
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
  const f = typeof o > "u" ? void 0 : Math.floor(o.valueOf() / 1e3), u = [], m = await ti.read({ fs: t, gitdir: r }), p = await se.resolve({ fs: t, gitdir: r, ref: n }), y = [await Fr({ fs: t, cache: e, gitdir: r, oid: p })];
  let E, R, $;
  function I(T) {
    $ && i && u.push(T);
  }
  for (; y.length > 0; ) {
    const T = y.pop();
    if (f !== void 0 && T.commit.committer.timestamp <= f)
      break;
    if (i) {
      let A;
      try {
        A = await _i({
          fs: t,
          cache: e,
          gitdir: r,
          oid: T.commit.tree,
          filepath: i
        }), R && E !== A && u.push(R), E = A, R = T, $ = !0;
      } catch (P) {
        if (P instanceof Pe) {
          let U = l && E;
          if (U && (U = await So({
            fs: t,
            cache: e,
            gitdir: r,
            oid: T.commit.tree,
            fileId: E
          }), U))
            if (Array.isArray(U)) {
              if (R) {
                const M = await So({
                  fs: t,
                  cache: e,
                  gitdir: r,
                  oid: R.commit.tree,
                  fileId: E
                });
                if (Array.isArray(M))
                  if (U = U.filter((B) => M.indexOf(B) === -1), U.length === 1)
                    U = U[0], i = U, R && u.push(R);
                  else {
                    U = !1, R && u.push(R);
                    break;
                  }
              }
            } else
              i = U, R && u.push(R);
          if (!U) {
            if ($ && E && (u.push(R), !s))
              break;
            if (!s && !l) throw P;
          }
          R = T, $ = !1;
        } else throw P;
      }
    } else
      u.push(T);
    if (a !== void 0 && u.length === a) {
      I(T);
      break;
    }
    if (!m.has(T.oid))
      for (const A of T.commit.parent) {
        const P = await Fr({ fs: t, cache: e, gitdir: r, oid: A });
        y.map((U) => U.oid).includes(P.oid) || y.push(P);
      }
    y.length === 0 && I(T), y.sort((A, P) => Xf(A.commit, P.commit));
  }
  return u;
}
async function Jf({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
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
    return H("fs", t), H("gitdir", r), H("ref", n), await Kf({
      fs: new ge(t),
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
async function Qf({
  fs: t,
  onSign: e,
  dir: r,
  gitdir: i = re.join(r, ".git"),
  ours: n,
  theirs: a,
  fastForward: o = !0,
  fastForwardOnly: s = !1,
  dryRun: l = !1,
  noUpdateBranch: f = !1,
  abortOnConflict: u = !0,
  message: m,
  author: p,
  committer: y,
  signingKey: E,
  cache: R = {},
  mergeDriver: $
}) {
  try {
    H("fs", t), E && H("onSign", e);
    const I = new ge(t), T = await lr({ fs: I, gitdir: i, author: p });
    if (!T && (!s || !o))
      throw new ht("author");
    const A = await Nr({
      fs: I,
      gitdir: i,
      author: T,
      committer: y
    });
    if (!A && (!s || !o))
      throw new ht("committer");
    return await Ns({
      fs: I,
      cache: R,
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
      committer: A,
      signingKey: E,
      onSign: e,
      mergeDriver: $
    });
  } catch (I) {
    throw I.caller = "git.merge", I;
  }
}
const eh = {
  commit: 16,
  tree: 32,
  blob: 48,
  tag: 64,
  ofs_delta: 96,
  ref_delta: 112
};
async function zs({
  fs: t,
  cache: e,
  dir: r,
  gitdir: i = re.join(r, ".git"),
  oids: n
}) {
  const a = new as(), o = [];
  function s(u, m) {
    const p = fe.from(u, m);
    o.push(p), a.update(p);
  }
  async function l({ stype: u, object: m }) {
    const p = eh[u];
    let y = m.length, E = y > 15 ? 128 : 0;
    const R = y & 15;
    y = y >>> 4;
    let $ = (E | p | R).toString(16);
    for (s($, "hex"); E; )
      E = y > 127 ? 128 : 0, $ = E | y & 127, s(aa(2, $), "hex"), y = y >>> 7;
    s(fe.from(await vs(m)));
  }
  s("PACK"), s("00000002", "hex"), s(aa(8, n.length), "hex");
  for (const u of n) {
    const { type: m, object: p } = await Je({ fs: t, cache: e, gitdir: i, oid: u });
    await l({ object: p, stype: m });
  }
  const f = a.digest();
  return o.push(f), o;
}
async function th({ fs: t, cache: e, gitdir: r, oids: i, write: n }) {
  const a = await zs({ fs: t, cache: e, gitdir: r, oids: i }), o = fe.from(await Pi(a)), l = `pack-${o.slice(-20).toString("hex")}.pack`;
  return n ? (await t.write(re.join(r, `objects/pack/${l}`), o), { filename: l }) : {
    filename: l,
    packfile: new Uint8Array(o)
  };
}
async function rh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oids: i,
  write: n = !1,
  cache: a = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("oids", i), await th({
      fs: new ge(t),
      cache: a,
      gitdir: r,
      oids: i,
      write: n
    });
  } catch (o) {
    throw o.caller = "git.packObjects", o;
  }
}
async function ih({
  fs: t,
  http: e,
  onProgress: r,
  onMessage: i,
  onAuth: n,
  onAuthSuccess: a,
  onAuthFailure: o,
  dir: s,
  gitdir: l = re.join(s, ".git"),
  ref: f,
  url: u,
  remote: m,
  remoteRef: p,
  prune: y = !1,
  pruneTags: E = !1,
  fastForward: R = !0,
  fastForwardOnly: $ = !1,
  corsProxy: I,
  singleBranch: T,
  headers: A = {},
  author: P,
  committer: U,
  signingKey: M,
  cache: B = {}
}) {
  try {
    H("fs", t), H("gitdir", l);
    const O = new ge(t), W = await lr({ fs: O, gitdir: l, author: P });
    if (!W) throw new ht("author");
    const z = await Nr({
      fs: O,
      gitdir: l,
      author: W,
      committer: U
    });
    if (!z) throw new ht("committer");
    return await Fs({
      fs: O,
      cache: B,
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
      remoteRef: p,
      fastForward: R,
      fastForwardOnly: $,
      corsProxy: I,
      singleBranch: T,
      headers: A,
      author: W,
      committer: z,
      signingKey: M,
      prune: y,
      pruneTags: E
    });
  } catch (O) {
    throw O.caller = "git.pull", O;
  }
}
async function nh({
  fs: t,
  cache: e,
  dir: r,
  gitdir: i = re.join(r, ".git"),
  start: n,
  finish: a
}) {
  const o = await ti.read({ fs: t, gitdir: i }), s = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set();
  for (const m of n)
    s.add(await se.resolve({ fs: t, gitdir: i, ref: m }));
  for (const m of a)
    try {
      const p = await se.resolve({ fs: t, gitdir: i, ref: m });
      l.add(p);
    } catch {
    }
  const f = /* @__PURE__ */ new Set();
  async function u(m) {
    f.add(m);
    const { type: p, object: y } = await Je({ fs: t, cache: e, gitdir: i, oid: m });
    if (p === "tag") {
      const R = wt.from(y).headers().object;
      return u(R);
    }
    if (p !== "commit")
      throw new pt(m, p, "commit");
    if (!o.has(m)) {
      const R = Xe.from(y).headers().parent;
      for (m of R)
        !l.has(m) && !f.has(m) && await u(m);
    }
  }
  for (const m of s)
    await u(m);
  return f;
}
async function On({
  fs: t,
  cache: e,
  dir: r,
  gitdir: i = re.join(r, ".git"),
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
      const m = Xe.from(f).headers().tree;
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
async function ah(t) {
  const e = {};
  let r = "";
  const i = Qe.streamReader(t);
  let n = await i();
  for (; n !== !0; )
    n !== null && (r += n.toString("utf8") + `
`), n = await i();
  const a = r.toString("utf8").split(`
`);
  if (n = a.shift(), !n.startsWith("unpack "))
    throw new vr('unpack ok" or "unpack [error message]', n);
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
async function oh({
  capabilities: t = [],
  triplets: e = []
}) {
  const r = [];
  let i = `\0 ${t.join(" ")}`;
  for (const n of e)
    r.push(
      Qe.encode(
        `${n.oldoid} ${n.oid} ${n.fullRef}${i}
`
      )
    ), i = "";
  return r.push(Qe.flush()), r;
}
async function sh({
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
  remote: p,
  url: y,
  force: E = !1,
  delete: R = !1,
  corsProxy: $,
  headers: I = {}
}) {
  const T = u || await fr({ fs: t, gitdir: f });
  if (typeof T > "u")
    throw new yt("ref");
  const A = await it.get({ fs: t, gitdir: f });
  p = p || await A.get(`branch.${T}.pushRemote`) || await A.get("remote.pushDefault") || await A.get(`branch.${T}.remote`) || "origin";
  const P = y || await A.get(`remote.${p}.pushurl`) || await A.get(`remote.${p}.url`);
  if (typeof P > "u")
    throw new yt("remote OR url");
  const U = m || await A.get(`branch.${T}.merge`);
  if (typeof P > "u")
    throw new yt("remoteRef");
  $ === void 0 && ($ = await A.get("http.corsProxy"));
  const M = await se.expand({ fs: t, gitdir: f, ref: T }), B = R ? "0000000000000000000000000000000000000000" : await se.resolve({ fs: t, gitdir: f, ref: M }), O = Vi.getRemoteHelperFor({ url: P }), W = await O.discover({
    http: r,
    onAuth: a,
    onAuthSuccess: o,
    onAuthFailure: s,
    corsProxy: $,
    service: "git-receive-pack",
    url: P,
    headers: I,
    protocolVersion: 1
  }), z = W.auth;
  let K;
  if (!U)
    K = M;
  else
    try {
      K = await se.expandAgainstMap({
        ref: U,
        map: W.refs
      });
    } catch (be) {
      if (be instanceof Pe)
        K = U.startsWith("refs/") ? U : `refs/heads/${U}`;
      else
        throw be;
    }
  const N = W.refs.get(K) || "0000000000000000000000000000000000000000";
  if (l && !await l({
    remote: p,
    url: P,
    localRef: { ref: R ? "(delete)" : M, oid: B },
    remoteRef: { ref: K, oid: N }
  }))
    throw new Hr();
  const Q = !W.capabilities.has("no-thin");
  let ce = /* @__PURE__ */ new Set();
  if (!R) {
    const be = [...W.refs.values()];
    let Be = /* @__PURE__ */ new Set();
    if (N !== "0000000000000000000000000000000000000000") {
      const ye = await ya({
        fs: t,
        cache: e,
        gitdir: f,
        oids: [B, N]
      });
      for (const Re of ye) be.push(Re);
      Q && (Be = await On({ fs: t, cache: e, gitdir: f, oids: ye }));
    }
    if (!be.includes(B)) {
      const ye = await nh({
        fs: t,
        cache: e,
        gitdir: f,
        start: [B],
        finish: be
      });
      ce = await On({ fs: t, cache: e, gitdir: f, oids: ye });
    }
    if (Q) {
      try {
        const ye = await se.resolve({
          fs: t,
          gitdir: f,
          ref: `refs/remotes/${p}/HEAD`,
          depth: 2
        }), { oid: Re } = await se.resolveAgainstMap({
          ref: ye.replace(`refs/remotes/${p}/`, ""),
          fullref: ye,
          map: W.refs
        }), ke = [Re];
        for (const Ee of await On({ fs: t, cache: e, gitdir: f, oids: ke }))
          Be.add(Ee);
      } catch {
      }
      for (const ye of Be)
        ce.delete(ye);
    }
    if (B === N && (E = !0), !E) {
      if (M.startsWith("refs/tags") && N !== "0000000000000000000000000000000000000000")
        throw new Or("tag-exists");
      if (B !== "0000000000000000000000000000000000000000" && N !== "0000000000000000000000000000000000000000" && !await Ls({
        fs: t,
        cache: e,
        gitdir: f,
        oid: B,
        ancestor: N,
        depth: -1
      }))
        throw new Or("not-fast-forward");
    }
  }
  const _e = Bs(
    [...W.capabilities],
    ["report-status", "side-band-64k", `agent=${Xi.agent}`]
  ), ne = await oh({
    capabilities: _e,
    triplets: [{ oldoid: N, oid: B, fullRef: K }]
  }), Y = R ? [] : await zs({
    fs: t,
    cache: e,
    gitdir: f,
    oids: [...ce]
  }), ae = await O.connect({
    http: r,
    onProgress: i,
    corsProxy: $,
    service: "git-receive-pack",
    url: P,
    auth: z,
    headers: I,
    body: [...ne, ...Y]
  }), { packfile: we, progress: Se } = await Os.demux(ae.body);
  if (n) {
    const be = As(Se);
    vi(be, async (Be) => {
      await n(Be);
    });
  }
  const $e = await ah(we);
  if (ae.headers && ($e.headers = ae.headers), p && $e.ok && $e.refs[K].ok && !M.startsWith("refs/tags")) {
    const be = `refs/remotes/${p}/${K.replace(
      "refs/heads",
      ""
    )}`;
    R ? await se.deleteRef({ fs: t, gitdir: f, ref: be }) : await se.writeRef({ fs: t, gitdir: f, ref: be, value: B });
  }
  if ($e.ok && Object.values($e.refs).every((be) => be.ok))
    return $e;
  {
    const be = Object.entries($e.refs).filter(([Be, ye]) => !ye.ok).map(([Be, ye]) => `
  - ${Be}: ${ye.error}`).join("");
    throw new ui(be, $e);
  }
}
async function ch({
  fs: t,
  http: e,
  onProgress: r,
  onMessage: i,
  onAuth: n,
  onAuthSuccess: a,
  onAuthFailure: o,
  onPrePush: s,
  dir: l,
  gitdir: f = re.join(l, ".git"),
  ref: u,
  remoteRef: m,
  remote: p = "origin",
  url: y,
  force: E = !1,
  delete: R = !1,
  corsProxy: $,
  headers: I = {},
  cache: T = {}
}) {
  try {
    return H("fs", t), H("http", e), H("gitdir", f), await sh({
      fs: new ge(t),
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
      remote: p,
      url: y,
      force: E,
      delete: R,
      corsProxy: $,
      headers: I
    });
  } catch (A) {
    throw A.caller = "git.push", A;
  }
}
async function Hs({ fs: t, cache: e, gitdir: r, oid: i }) {
  const { type: n, object: a } = await Je({ fs: t, cache: e, gitdir: r, oid: i });
  if (n === "tag")
    return i = wt.from(a).parse().object, Hs({ fs: t, cache: e, gitdir: r, oid: i });
  if (n !== "blob")
    throw new pt(i, n, "blob");
  return { oid: i, blob: new Uint8Array(a) };
}
async function Ws({
  fs: t,
  cache: e,
  gitdir: r,
  oid: i,
  filepath: n = void 0
}) {
  return n !== void 0 && (i = await _i({ fs: t, cache: e, gitdir: r, oid: i, filepath: n })), await Hs({
    fs: t,
    cache: e,
    gitdir: r,
    oid: i
  });
}
async function lh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oid: i,
  filepath: n,
  cache: a = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("oid", i), await Ws({
      fs: new ge(t),
      cache: a,
      gitdir: r,
      oid: i,
      filepath: n
    });
  } catch (o) {
    throw o.caller = "git.readBlob", o;
  }
}
async function qs({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oid: i,
  cache: n = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("oid", i), await Fr({
      fs: new ge(t),
      cache: n,
      gitdir: r,
      oid: i
    });
  } catch (a) {
    throw a.caller = "git.readCommit", a;
  }
}
async function uh({
  fs: t,
  cache: e,
  gitdir: r,
  ref: i = "refs/notes/commits",
  oid: n
}) {
  const a = await se.resolve({ gitdir: r, fs: t, ref: i }), { blob: o } = await Ws({
    fs: t,
    cache: e,
    gitdir: r,
    oid: a,
    filepath: n
  });
  return o;
}
async function fh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: i = "refs/notes/commits",
  oid: n,
  cache: a = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("ref", i), H("oid", n), await uh({
      fs: new ge(t),
      cache: a,
      gitdir: r,
      ref: i,
      oid: n
    });
  } catch (o) {
    throw o.caller = "git.readNote", o;
  }
}
async function hh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oid: i,
  format: n = "parsed",
  filepath: a = void 0,
  encoding: o = void 0,
  cache: s = {}
}) {
  try {
    H("fs", t), H("gitdir", r), H("oid", i);
    const l = new ge(t);
    a !== void 0 && (i = await _i({
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
          u.object = Xe.from(u.object).parse();
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
async function dh({ fs: t, cache: e, gitdir: r, oid: i }) {
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
async function wh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oid: i,
  cache: n = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("oid", i), await dh({
      fs: new ge(t),
      cache: n,
      gitdir: r,
      oid: i
    });
  } catch (a) {
    throw a.caller = "git.readTag", a;
  }
}
async function ph({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  oid: i,
  filepath: n = void 0,
  cache: a = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("oid", i), await qr({
      fs: new ge(t),
      cache: a,
      gitdir: r,
      oid: i,
      filepath: n
    });
  } catch (o) {
    throw o.caller = "git.readTree", o;
  }
}
async function mh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  filepath: i,
  cache: n = {}
}) {
  try {
    H("fs", t), H("gitdir", r), H("filepath", i), await ot.acquire(
      { fs: new ge(t), gitdir: r, cache: n },
      async function(a) {
        a.delete({ filepath: i });
      }
    );
  } catch (a) {
    throw a.caller = "git.remove", a;
  }
}
async function gh({
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
    f = await se.resolve({ gitdir: i, fs: t, ref: n });
  } catch (E) {
    if (!(E instanceof Pe))
      throw E;
  }
  let m = (await qr({
    fs: t,
    gitdir: i,
    oid: f || "4b825dc642cb6eb9a060e54bf8d69288fbee4904"
  })).tree;
  m = m.filter((E) => E.path !== a);
  const p = await bi({
    fs: t,
    gitdir: i,
    tree: m
  });
  return await Zi({
    fs: t,
    cache: e,
    onSign: r,
    gitdir: i,
    ref: n,
    tree: p,
    parent: f && [f],
    message: `Note removed by 'isomorphic-git removeNote'
`,
    author: o,
    committer: s,
    signingKey: l
  });
}
async function yh({
  fs: t,
  onSign: e,
  dir: r,
  gitdir: i = re.join(r, ".git"),
  ref: n = "refs/notes/commits",
  oid: a,
  author: o,
  committer: s,
  signingKey: l,
  cache: f = {}
}) {
  try {
    H("fs", t), H("gitdir", i), H("oid", a);
    const u = new ge(t), m = await lr({ fs: u, gitdir: i, author: o });
    if (!m) throw new ht("author");
    const p = await Nr({
      fs: u,
      gitdir: i,
      author: m,
      committer: s
    });
    if (!p) throw new ht("committer");
    return await gh({
      fs: u,
      cache: f,
      onSign: e,
      gitdir: i,
      ref: n,
      oid: a,
      author: m,
      committer: p,
      signingKey: l
    });
  } catch (u) {
    throw u.caller = "git.removeNote", u;
  }
}
async function _h({
  fs: t,
  gitdir: e,
  oldref: r,
  ref: i,
  checkout: n = !1
}) {
  if (i !== Ht.clean(i))
    throw new Nt(i, Ht.clean(i));
  if (r !== Ht.clean(r))
    throw new Nt(r, Ht.clean(r));
  const a = `refs/heads/${r}`, o = `refs/heads/${i}`;
  if (await se.exists({ fs: t, gitdir: e, ref: o }))
    throw new Ft("branch", i, !1);
  const l = await se.resolve({
    fs: t,
    gitdir: e,
    ref: a,
    depth: 1
  });
  await se.writeRef({ fs: t, gitdir: e, ref: o, value: l }), await se.deleteRef({ fs: t, gitdir: e, ref: a });
  const u = await fr({
    fs: t,
    gitdir: e,
    fullname: !0
  }) === a;
  (n || u) && await se.writeSymbolicRef({
    fs: t,
    gitdir: e,
    ref: "HEAD",
    value: o
  });
}
async function bh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: i,
  oldref: n,
  checkout: a = !1
}) {
  try {
    return H("fs", t), H("gitdir", r), H("ref", i), H("oldref", n), await _h({
      fs: new ge(t),
      gitdir: r,
      ref: i,
      oldref: n,
      checkout: a
    });
  } catch (o) {
    throw o.caller = "git.renameBranch", o;
  }
}
async function Gs({ gitdir: t, type: e, object: r }) {
  return Jt(Pr.wrap({ type: e, object: r }));
}
async function vh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  filepath: i,
  ref: n,
  cache: a = {}
}) {
  try {
    H("fs", t), H("gitdir", r), H("filepath", i);
    const o = new ge(t);
    let s, l;
    try {
      s = await se.resolve({ fs: o, gitdir: r, ref: n || "HEAD" });
    } catch (m) {
      if (n)
        throw m;
    }
    if (s)
      try {
        s = await _i({
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
    const u = e && await o.read(re.join(e, i));
    u && (l = await Gs({
      gitdir: r,
      type: "blob",
      object: u
    }), s === l && (f = await o.lstat(re.join(e, i)))), await ot.acquire({ fs: o, gitdir: r, cache: a }, async function(m) {
      m.delete({ filepath: i }), s && m.insert({ filepath: i, stats: f, oid: s });
    });
  } catch (o) {
    throw o.caller = "git.reset", o;
  }
}
async function Eh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: i,
  depth: n
}) {
  try {
    return H("fs", t), H("gitdir", r), H("ref", i), await se.resolve({
      fs: new ge(t),
      gitdir: r,
      ref: i,
      depth: n
    });
  } catch (a) {
    throw a.caller = "git.resolveRef", a;
  }
}
async function kh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  path: i,
  value: n,
  append: a = !1
}) {
  try {
    H("fs", t), H("gitdir", r), H("path", i);
    const o = new ge(t), s = await it.get({ fs: o, gitdir: r });
    a ? await s.append(i, n) : await s.set(i, n), await it.save({ fs: o, gitdir: r, config: s });
  } catch (o) {
    throw o.caller = "git.setConfig", o;
  }
}
async function Zs({ fs: t, gitdir: e, commit: r }) {
  const i = Xe.from(r).toObject();
  return await bt({
    fs: t,
    gitdir: e,
    type: "commit",
    object: i,
    format: "content"
  });
}
class zi {
  // constructor removed
  static get timezoneOffsetForRefLogEntry() {
    const e = (/* @__PURE__ */ new Date()).getTimezoneOffset(), r = Math.abs(Math.floor(e / 60)), i = Math.abs(e % 60).toString().padStart(2, "0");
    return `${e > 0 ? "-" : "+"}${r.toString().padStart(2, "0")}${i}`;
  }
  static createStashReflogEntry(e, r, i) {
    const n = e.name.replace(/\s/g, ""), a = "0000000000000000000000000000000000000000", o = Math.floor(Date.now() / 1e3), s = zi.timezoneOffsetForRefLogEntry;
    return `${a} ${r} ${n} ${e.email} ${o} ${s}	${i}
`;
  }
  static getStashReflogEntry(e, r = !1) {
    return e.split(`
`).filter((a) => a).reverse().map(
      (a, o) => r ? `stash@{${o}}: ${a.split("	")[1]}` : a
    );
  }
}
const Sh = {
  stage: Lr,
  workdir: yi
};
let Cn;
async function Mr(t, e) {
  return Cn === void 0 && (Cn = new Qr()), Cn.acquire(t, e);
}
async function xh(t, e, r, i, n = null) {
  const a = re.join(r, i), o = await t.lstat(a);
  if (!o) throw new Pe(a);
  if (o.isDirectory())
    throw new Te(
      `${a}: file expected, but found directory`
    );
  const s = n ? await ms({ fs: t, gitdir: e, oid: n }) : void 0;
  let l = s ? n : void 0;
  return s || await Mr({ fs: t, gitdir: e, currentFilepath: a }, async () => {
    const f = o.isSymbolicLink() ? await t.readlink(a).then(Es) : await t.read(a);
    if (f === null) throw new Pe(a);
    l = await bt({ fs: t, gitdir: e, type: "blob", object: f });
  }), l;
}
async function Ih({ fs: t, dir: e, gitdir: r, entries: i }) {
  async function n(a) {
    if (a.type === "tree") {
      if (!a.oid) {
        const o = await Promise.all(a.children.map(n));
        a.oid = await bi({
          fs: t,
          gitdir: r,
          tree: o
        }), a.mode = 16384;
      }
    } else a.type === "blob" && (a.oid = await xh(
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
async function xo({
  fs: t,
  dir: e,
  gitdir: r,
  treePair: i
  // [TREE({ ref: 'HEAD' }), 'STAGE'] would be the equivalent of `git write-tree`
}) {
  const n = i[1] === "stage", a = i.map((y) => typeof y == "string" ? Sh[y]() : y), o = [], u = await cr({
    fs: t,
    cache: {},
    dir: e,
    gitdir: r,
    trees: a,
    map: async (y, [E, R]) => {
      if (!(y === "." || await Wr.isIgnored({ fs: t, dir: e, gitdir: r, filepath: y })) && R)
        return (!E || await E.oid() !== await R.oid() && await R.oid() !== void 0) && o.push([E, R]), {
          mode: await R.mode(),
          path: y,
          oid: await R.oid(),
          type: await R.type()
        };
    },
    reduce: async (y, E) => (E = E.filter(Boolean), y ? (y.children = E, y) : E.length > 0 ? E : void 0),
    iterate: async (y, E) => {
      const R = [];
      for (const $ of E) {
        const [I, T] = $;
        n ? T && (await t.exists(`${e}/${T.toString()}`) ? R.push($) : o.push([null, T])) : I && (T ? R.push($) : o.push([I, null]));
      }
      return R.length ? Promise.all(R.map(y)) : [];
    }
  });
  if (o.length === 0 || u.length === 0)
    return null;
  const p = (await Ih({
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
  return bi({ fs: t, gitdir: r, tree: p });
}
async function Th({
  fs: t,
  dir: e,
  gitdir: r,
  stashCommit: i,
  parentCommit: n,
  wasStaged: a
}) {
  const o = [], s = [], l = await cr({
    fs: t,
    cache: {},
    dir: e,
    gitdir: r,
    trees: [Dt({ ref: n }), Dt({ ref: i })],
    map: async (f, [u, m]) => {
      if (f === "." || await Wr.isIgnored({ fs: t, dir: e, gitdir: r, filepath: f }))
        return;
      const p = m ? await m.type() : await u.type();
      if (p !== "tree" && p !== "blob")
        return;
      if (!m && u) {
        const E = p === "tree" ? "rmdir" : "rm";
        return p === "tree" && o.push(f), p === "blob" && a && s.push({ filepath: f, oid: await u.oid() }), { method: E, filepath: f };
      }
      const y = await m.oid();
      if (!u || await u.oid() !== y)
        return p === "tree" ? { method: "mkdir", filepath: f } : (a && s.push({
          filepath: f,
          oid: y,
          stats: await t.lstat(re.join(e, f))
        }), {
          method: "write",
          filepath: f,
          oid: y
        });
    }
  });
  await Mr({ fs: t, gitdir: r, dirRemoved: o, ops: l }, async () => {
    for (const f of l) {
      const u = re.join(e, f.filepath);
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
  }), await ot.acquire({ fs: t, gitdir: r, cache: {} }, async (f) => {
    s.forEach(({ filepath: u, stats: m, oid: p }) => {
      f.insert({ filepath: u, stats: m, oid: p });
    });
  });
}
class Kt {
  constructor({ fs: e, dir: r, gitdir: i = re.join(r, ".git") }) {
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
      throw new ht("author");
    return this._author;
  }
  async getStashSHA(e, r) {
    return await this.fs.exists(this.refStashPath) ? (r || await this.readStashReflogs({ parsed: !1 }))[e].split(" ")[1] : null;
  }
  async writeStashCommit({ message: e, tree: r, parent: i }) {
    return Zs({
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
      throw new Nt(
        `stash@${e}`,
        "number that is in range of [0, num of stash pushed]"
      );
    const i = await this.getStashSHA(e, r);
    return i ? Fr({
      fs: this.fs,
      cache: {},
      gitdir: this.gitdir,
      oid: i
    }) : {};
  }
  async writeStashRef(e) {
    return se.writeRef({
      fs: this.fs,
      gitdir: this.gitdir,
      ref: Kt.refStash,
      value: e
    });
  }
  async writeStashReflogEntry({ stashCommit: e, message: r }) {
    const i = await this.getAuthor(), n = zi.createStashReflogEntry(
      i,
      e,
      r
    ), a = this.refLogsStashPath;
    await Mr({ filepath: a, entry: n }, async () => {
      const o = await this.fs.exists(a) ? await this.fs.read(a, "utf8") : "";
      await this.fs.write(a, o + n, "utf8");
    });
  }
  async readStashReflogs({ parsed: e = !1 }) {
    if (!await this.fs.exists(this.refLogsStashPath))
      return [];
    const i = (await this.fs.read(this.refLogsStashPath)).toString();
    return zi.getStashReflogEntry(i, e);
  }
}
async function $h({ fs: t, dir: e, gitdir: r, message: i = "" }) {
  const n = new Kt({ fs: t, dir: e, gitdir: r });
  await n.getAuthor();
  const a = await fr({
    fs: t,
    gitdir: r,
    fullname: !1
  }), o = await se.resolve({
    fs: t,
    gitdir: r,
    ref: "HEAD"
  }), l = (await qs({ fs: t, dir: e, gitdir: r, oid: o })).commit.message, f = [o];
  let u = null, m = Dt({ ref: "HEAD" });
  const p = await xo({
    fs: t,
    dir: e,
    gitdir: r,
    treePair: [Dt({ ref: "HEAD" }), "stage"]
  });
  if (p) {
    const $ = await n.writeStashCommit({
      message: `stash-Index: WIP on ${a} - ${(/* @__PURE__ */ new Date()).toISOString()}`,
      tree: p,
      // stashCommitTree
      parent: f
    });
    f.push($), u = p, m = Lr();
  }
  const y = await xo({
    fs: t,
    dir: e,
    gitdir: r,
    treePair: [m, "workdir"]
  });
  if (y) {
    const $ = await n.writeStashCommit({
      message: `stash-WorkDir: WIP on ${a} - ${(/* @__PURE__ */ new Date()).toISOString()}`,
      tree: y,
      parent: [f[f.length - 1]]
    });
    f.push($), u = y;
  }
  if (!u || !p && !y)
    throw new Pe("changes, nothing to stash");
  const E = (i.trim() || `WIP on ${a}`) + `: ${o.substring(0, 7)} ${l}`, R = await n.writeStashCommit({
    message: E,
    tree: u,
    parent: f
  });
  return await n.writeStashRef(R), await n.writeStashReflogEntry({
    stashCommit: R,
    message: E
  }), await Rs({
    fs: t,
    dir: e,
    gitdir: r,
    ref: a,
    track: !1,
    force: !0
    // force checkout to discard changes
  }), R;
}
async function Vs({ fs: t, dir: e, gitdir: r, refIdx: i = 0 }) {
  const a = await new Kt({ fs: t, dir: e, gitdir: r }).readStashCommit(i), { parent: o = null } = a.commit ? a.commit : {};
  if (!(!o || !Array.isArray(o)))
    for (let s = 0; s < o.length - 1; s++) {
      const f = (await Fr({
        fs: t,
        cache: {},
        gitdir: r,
        oid: o[s + 1]
      })).commit.message.startsWith("stash-Index");
      await Th({
        fs: t,
        dir: e,
        gitdir: r,
        stashCommit: o[s + 1],
        parentCommit: o[s],
        wasStaged: f
      });
    }
}
async function Xs({ fs: t, dir: e, gitdir: r, refIdx: i = 0 }) {
  const n = new Kt({ fs: t, dir: e, gitdir: r });
  if (!(await n.readStashCommit(i)).commit)
    return;
  const o = n.refStashPath;
  await Mr(o, async () => {
    await t.exists(o) && await t.rm(o);
  });
  const s = await n.readStashReflogs({ parsed: !1 });
  if (!s.length)
    return;
  s.splice(i, 1);
  const l = n.refLogsStashPath;
  await Mr({ reflogEntries: s, stashReflogPath: l, stashMgr: n }, async () => {
    if (s.length) {
      await t.write(l, s.join(`
`), "utf8");
      const f = s[s.length - 1].split(
        " "
      )[1];
      await n.writeStashRef(f);
    } else
      await t.rm(l);
  });
}
async function Rh({ fs: t, dir: e, gitdir: r }) {
  return new Kt({ fs: t, dir: e, gitdir: r }).readStashReflogs({ parsed: !0 });
}
async function Dh({ fs: t, dir: e, gitdir: r }) {
  const i = new Kt({ fs: t, dir: e, gitdir: r }), n = [i.refStashPath, i.refLogsStashPath];
  await Mr(n, async () => {
    await Promise.all(
      n.map(async (a) => {
        if (await t.exists(a))
          return t.rm(a);
      })
    );
  });
}
async function Bh({ fs: t, dir: e, gitdir: r, refIdx: i = 0 }) {
  await Vs({ fs: t, dir: e, gitdir: r, refIdx: i }), await Xs({ fs: t, dir: e, gitdir: r, refIdx: i });
}
async function Ah({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  op: i = "push",
  message: n = "",
  refIdx: a = 0
}) {
  H("fs", t), H("dir", e), H("gitdir", r), H("op", i);
  const o = {
    push: $h,
    apply: Vs,
    drop: Xs,
    list: Rh,
    clear: Dh,
    pop: Bh
  }, s = ["apply", "drop", "pop"];
  try {
    const l = new ge(t);
    ["refs", "logs", "logs/refs"].map((m) => re.join(r, m)).forEach(async (m) => {
      await l.exists(m) || await l.mkdir(m);
    });
    const u = o[i];
    if (u) {
      if (s.includes(i) && a < 0)
        throw new Nt(
          `stash@${a}`,
          "number that is in range of [0, num of stash pushed]"
        );
      return await u({ fs: l, dir: e, gitdir: r, message: n, refIdx: a });
    }
    throw new Error(`To be implemented: ${i}`);
  } catch (l) {
    throw l.caller = "git.stash", l;
  }
}
async function Oh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  filepath: i,
  cache: n = {}
}) {
  try {
    H("fs", t), H("gitdir", r), H("filepath", i);
    const a = new ge(t);
    if (await Wr.isIgnored({
      fs: a,
      gitdir: r,
      dir: e,
      filepath: i
    }))
      return "ignored";
    const s = await Ch({ fs: a, cache: n, gitdir: r }), l = await Ys({
      fs: a,
      cache: n,
      gitdir: r,
      tree: s,
      path: i
    }), f = await ot.acquire(
      { fs: a, gitdir: r, cache: n },
      async function(R) {
        for (const $ of R)
          if ($.path === i) return $;
        return null;
      }
    ), u = await a.lstat(re.join(e, i)), m = l !== null, p = f !== null, y = u !== null, E = async () => {
      if (p && !Ci(f, u))
        return f.oid;
      {
        const R = await a.read(re.join(e, i)), $ = await Gs({
          gitdir: r,
          type: "blob",
          object: R
        });
        return p && f.oid === $ && u.size !== -1 && ot.acquire({ fs: a, gitdir: r, cache: n }, async function(I) {
          I.insert({ filepath: i, stats: u, oid: $ });
        }), $;
      }
    };
    if (!m && !y && !p) return "absent";
    if (!m && !y && p) return "*absent";
    if (!m && y && !p) return "*added";
    if (!m && y && p)
      return await E() === f.oid ? "added" : "*added";
    if (m && !y && !p) return "deleted";
    if (m && !y && p)
      return l === f.oid, "*deleted";
    if (m && y && !p)
      return await E() === l ? "*undeleted" : "*undeletemodified";
    if (m && y && p) {
      const R = await E();
      return R === l ? R === f.oid ? "unmodified" : "*unmodified" : R === f.oid ? "modified" : "*modified";
    }
  } catch (a) {
    throw a.caller = "git.status", a;
  }
}
async function Ys({ fs: t, cache: e, gitdir: r, tree: i, path: n }) {
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
        return Ys({ fs: t, cache: e, gitdir: r, tree: f, path: n });
      }
      if (s === "blob")
        throw new pt(o.oid, s, "blob", n.join("/"));
    }
  return null;
}
async function Ch({ fs: t, cache: e, gitdir: r }) {
  let i;
  try {
    i = await se.resolve({ fs: t, gitdir: r, ref: "HEAD" });
  } catch (a) {
    if (a instanceof Pe)
      return [];
  }
  const { tree: n } = await qr({ fs: t, cache: e, gitdir: r, oid: i });
  return n;
}
async function Nh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: i = "HEAD",
  filepaths: n = ["."],
  filter: a,
  cache: o = {},
  ignored: s = !1
}) {
  try {
    H("fs", t), H("gitdir", r), H("ref", i);
    const l = new ge(t);
    return await cr({
      fs: l,
      cache: o,
      dir: e,
      gitdir: r,
      trees: [Dt({ ref: i }), yi(), Lr()],
      map: async function(f, [u, m, p]) {
        if (!u && !p && m && !s && await Wr.isIgnored({
          fs: l,
          dir: e,
          filepath: f
        }) || !n.some((M) => $s(f, M)))
          return null;
        if (a && !a(f))
          return;
        const [y, E, R] = await Promise.all([
          u && u.type(),
          m && m.type(),
          p && p.type()
        ]), $ = [y, E, R].includes("blob");
        if ((y === "tree" || y === "special") && !$) return;
        if (y === "commit") return null;
        if ((E === "tree" || E === "special") && !$)
          return;
        if (R === "commit") return null;
        if ((R === "tree" || R === "special") && !$) return;
        const I = y === "blob" ? await u.oid() : void 0, T = R === "blob" ? await p.oid() : void 0;
        let A;
        y !== "blob" && E === "blob" && R !== "blob" ? A = "42" : E === "blob" && (A = await m.oid());
        const P = [void 0, I, A, T], U = P.map((M) => P.indexOf(M));
        return U.shift(), [f, ...U];
      }
    });
  } catch (l) {
    throw l.caller = "git.statusMatrix", l;
  }
}
async function Fh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: i,
  object: n,
  force: a = !1
}) {
  try {
    H("fs", t), H("gitdir", r), H("ref", i);
    const o = new ge(t);
    if (i === void 0)
      throw new yt("ref");
    i = i.startsWith("refs/tags/") ? i : `refs/tags/${i}`;
    const s = await se.resolve({
      fs: o,
      gitdir: r,
      ref: n || "HEAD"
    });
    if (!a && await se.exists({ fs: o, gitdir: r, ref: i }))
      throw new Ft("tag", i);
    await se.writeRef({ fs: o, gitdir: r, ref: i, value: s });
  } catch (o) {
    throw o.caller = "git.tag", o;
  }
}
async function Mh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
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
    const u = new ge(t);
    if (l)
      return await ot.acquire(
        { fs: u, gitdir: r, cache: i },
        async function(p) {
          if (!f) {
            const y = await u.lstat(re.join(e, n));
            if (y) {
              if (y.isDirectory())
                throw new sr("directory");
              return;
            }
          }
          p.has({ filepath: n }) && p.delete({
            filepath: n
          });
        }
      );
    let m;
    if (!a) {
      if (m = await u.lstat(re.join(e, n)), !m)
        throw new Pe(
          `file at "${n}" on disk and "remove" not set`
        );
      if (m.isDirectory())
        throw new sr("directory");
    }
    return await ot.acquire({ fs: u, gitdir: r, cache: i }, async function(p) {
      if (!s && !p.has({ filepath: n }))
        throw new Pe(
          `file at "${n}" in index and "add" not set`
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
        const E = y.isSymbolicLink() ? await u.readlink(re.join(e, n)) : await u.read(re.join(e, n));
        a = await bt({
          fs: u,
          gitdir: r,
          type: "blob",
          format: "content",
          object: E
        });
      }
      return p.insert({
        filepath: n,
        oid: a,
        stats: y
      }), a;
    });
  } catch (u) {
    throw u.caller = "git.updateIndex", u;
  }
}
function Uh() {
  try {
    return Xi.version;
  } catch (t) {
    throw t.caller = "git.version", t;
  }
}
async function Lh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  trees: i,
  map: n,
  reduce: a,
  iterate: o,
  cache: s = {}
}) {
  try {
    return H("fs", t), H("gitdir", r), H("trees", i), await cr({
      fs: new ge(t),
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
async function Ph({ fs: t, dir: e, gitdir: r = re.join(e, ".git"), blob: i }) {
  try {
    return H("fs", t), H("gitdir", r), H("blob", i), await bt({
      fs: new ge(t),
      gitdir: r,
      type: "blob",
      object: i,
      format: "content"
    });
  } catch (n) {
    throw n.caller = "git.writeBlob", n;
  }
}
async function jh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  commit: i
}) {
  try {
    return H("fs", t), H("gitdir", r), H("commit", i), await Zs({
      fs: new ge(t),
      gitdir: r,
      commit: i
    });
  } catch (n) {
    throw n.caller = "git.writeCommit", n;
  }
}
async function zh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  type: i,
  object: n,
  format: a = "parsed",
  oid: o,
  encoding: s = void 0
}) {
  try {
    const l = new ge(t);
    if (a === "parsed") {
      switch (i) {
        case "commit":
          n = Xe.from(n).toObject();
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
async function Hh({
  fs: t,
  dir: e,
  gitdir: r = re.join(e, ".git"),
  ref: i,
  value: n,
  force: a = !1,
  symbolic: o = !1
}) {
  try {
    H("fs", t), H("gitdir", r), H("ref", i), H("value", n);
    const s = new ge(t);
    if (i !== Ht.clean(i))
      throw new Nt(i, Ht.clean(i));
    if (!a && await se.exists({ fs: s, gitdir: r, ref: i }))
      throw new Ft("ref", i);
    o ? await se.writeSymbolicRef({
      fs: s,
      gitdir: r,
      ref: i,
      value: n
    }) : (n = await se.resolve({
      fs: s,
      gitdir: r,
      ref: n
    }), await se.writeRef({
      fs: s,
      gitdir: r,
      ref: i,
      value: n
    }));
  } catch (s) {
    throw s.caller = "git.writeRef", s;
  }
}
async function Wh({ fs: t, gitdir: e, tag: r }) {
  const i = wt.from(r).toObject();
  return await bt({
    fs: t,
    gitdir: e,
    type: "tag",
    object: i,
    format: "content"
  });
}
async function qh({ fs: t, dir: e, gitdir: r = re.join(e, ".git"), tag: i }) {
  try {
    return H("fs", t), H("gitdir", r), H("tag", i), await Wh({
      fs: new ge(t),
      gitdir: r,
      tag: i
    });
  } catch (n) {
    throw n.caller = "git.writeTag", n;
  }
}
async function Gh({ fs: t, dir: e, gitdir: r = re.join(e, ".git"), tree: i }) {
  try {
    return H("fs", t), H("gitdir", r), H("tree", i), await bi({
      fs: new ge(t),
      gitdir: r,
      tree: i
    });
  } catch (n) {
    throw n.caller = "git.writeTree", n;
  }
}
var te = {
  Errors: _u,
  STAGE: Lr,
  TREE: Dt,
  WORKDIR: yi,
  add: Mu,
  abortMerge: Ou,
  addNote: Lu,
  addRemote: Pu,
  annotatedTag: zu,
  branch: Wu,
  checkout: Rs,
  clone: rf,
  commit: nf,
  getConfig: xf,
  getConfigAll: Tf,
  setConfig: kh,
  currentBranch: af,
  deleteBranch: sf,
  deleteRef: cf,
  deleteRemote: uf,
  deleteTag: hf,
  expandOid: mf,
  expandRef: gf,
  fastForward: vf,
  fetch: Ef,
  findMergeBase: kf,
  findRoot: Sf,
  getRemoteInfo: $f,
  getRemoteInfo2: Rf,
  hashBlob: Bf,
  indexPack: Of,
  init: Cf,
  isDescendent: Nf,
  isIgnored: Ff,
  listBranches: Mf,
  listFiles: Lf,
  listNotes: jf,
  listRefs: zf,
  listRemotes: Wf,
  listServerRefs: Zf,
  listTags: Vf,
  log: Jf,
  merge: Qf,
  packObjects: rh,
  pull: ih,
  push: ch,
  readBlob: lh,
  readCommit: qs,
  readNote: fh,
  readObject: hh,
  readTag: wh,
  readTree: ph,
  remove: mh,
  removeNote: yh,
  renameBranch: bh,
  resetIndex: vh,
  updateIndex: Mh,
  resolveRef: Eh,
  status: Oh,
  statusMatrix: Nh,
  tag: Fh,
  version: Uh,
  walk: Lh,
  writeBlob: Ph,
  writeCommit: jh,
  writeObject: zh,
  writeRef: Hh,
  writeTag: qh,
  writeTree: Gh,
  stash: Ah
};
function Zh(t) {
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
function Vh(t) {
  return t[Symbol.asyncIterator] ? t[Symbol.asyncIterator]() : t[Symbol.iterator] ? t[Symbol.iterator]() : t.next ? t : Zh(t);
}
async function Xh(t, e) {
  const r = Vh(t);
  for (; ; ) {
    const { value: i, done: n } = await r.next();
    if (i && await e(i), n) break;
  }
  r.return && r.return();
}
async function Yh(t) {
  let e = 0;
  const r = [];
  await Xh(t, (a) => {
    r.push(a), e += a.byteLength;
  });
  const i = new Uint8Array(e);
  let n = 0;
  for (const a of r)
    i.set(a, n), n += a.byteLength;
  return i;
}
function Kh(t) {
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
async function Jh({
  onProgress: t,
  url: e,
  method: r = "GET",
  headers: i = {},
  body: n
}) {
  n && (n = await Yh(n));
  const a = await fetch(e, { method: r, headers: i, body: n }), o = a.body && a.body.getReader ? Kh(a.body) : [new Uint8Array(await a.arrayBuffer())];
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
var Bt = { request: Jh };
class Gr {
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
const Er = {
  corsProxy: "http://localhost:9000/",
  logging: {
    fsManagerES6: !1,
    swUtils: !0,
    memoryBackendES6: !1,
    gitNoteManager: !0,
    dotGit: !0
  }
}, Ks = new Gr(Er.logging.swUtils);
function mr(...t) {
  Ks.consoleDotLog("[ SWUtils ]", ...t);
}
function Ri(...t) {
  Ks.consoleDotError("[ SWUtils ]", ...t);
}
class Js {
  constructor() {
  }
  async fetchWithServiceWorker(e, r) {
    mr("Starting fetchWithServiceWorker with operation:", e, "and args:", r);
    try {
      const i = new URL("/git", self.location.origin).toString();
      mr("Constructed URL for fetch:", i);
      const n = {
        method: "POST",
        body: JSON.stringify({ operation: e, args: r }),
        headers: { "Content-Type": "application/json" }
      };
      mr("Request options:", n);
      const a = await fetch(i, n);
      mr("Fetch response received:", a);
      let o;
      try {
        o = await a.json(), mr("Parsed JSON response:", o);
      } catch (s) {
        throw Ri("Error parsing JSON response:", s), new Error("Response is not valid JSON");
      }
      if (!a.ok) {
        let s = `Fetch failed with status: ${a.status}`;
        switch (mr("Response status is not OK:", a.status), a.status) {
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
        throw Ri("Error message based on status code:", s), Ri("Response details:", o.details), new Error(JSON.stringify(o.details));
      }
      return mr("Fetch completed successfully with response:", o), o;
    } catch (i) {
      throw Ri("Fetch error:", i), i;
    }
  }
  async sendMessageToChannel(e, r = "worker-channel") {
    return new Promise((i) => {
      const n = new BroadcastChannel(r);
      n.onmessage = (a) => {
        a.data.operation === `${e.operation}` && (n.close(), i(a.data));
      }, n.postMessage(e);
    });
  }
}
const Qs = new Gr(Er.logging.memoryBackendES6);
function lt(...t) {
  Qs.consoleDotLog("[MemoryBackend ES6]", ...t);
}
function Kr(...t) {
  Qs.consoleDotError("[MemoryBackend ES6]", ...t);
}
function Qh() {
  return "tab-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
}
lt("Loading memoryBackend module");
class Io {
  constructor(e = {}, r = "default") {
    this.dbName = r, this.options = e, this.deviceId = e.deviceId || Qh(), this._files = /* @__PURE__ */ new Map(), this.versionVector = { [this.deviceId]: 0 }, this.swUtilsInstance = new Js(), this.channel = null, this.isProcessing = !1, this.pendingUpdates = [], this.processingQueue = !1, this._initializeRoot(), this.options?.supportsServiceWorker && this.options?.useSW && this._setupReceiveChannel(), Promise.resolve().then(() => this._requestInitialSync()), lt(`Initialized with dbName: ${this.dbName}, deviceId: ${this.deviceId}`);
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
      const e = new BroadcastChannel(`memory-backend-${this.dbName}`);
      e.postMessage({
        operation: "memorySyncRequest",
        data: {
          dbName: this.dbName,
          requesterVV: this.versionVector,
          requesterId: this.deviceId
        }
      }), e.close(), lt("Initial sync request sent");
    } catch (e) {
      Kr("Failed to send initial sync request:", e);
    }
  }
  async getFiles() {
    return new Map(
      Array.from(this._files.entries()).map(([r, i]) => [r, { ...i }])
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
      lt("Queueing update due to ongoing processing"), this.pendingUpdates.push(r);
      return;
    }
    try {
      this.isProcessing = !0, lt("Sending files to SW:", r);
      const i = new BroadcastChannel(`memory-backend-${this.dbName}`);
      i.postMessage(r), i.close(), lt("Files sent to SW successfully"), await this._processPendingUpdates();
    } catch (i) {
      Kr("Failed to send files to SW:", i);
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
          lt("Processing queued update:", e);
          const r = new BroadcastChannel(`memory-backend-${this.dbName}`);
          r.postMessage(e), r.close();
        }
      } catch (e) {
        Kr("Error processing queued updates:", e);
      } finally {
        this.processingQueue = !1;
      }
    }
  }
  _setupReceiveChannel() {
    try {
      const e = new BroadcastChannel(`memory-backend-${this.dbName}`);
      lt("Listening for updates on:", e.name), this.channel = e, this.channel.onmessage = async (r) => {
        Promise.resolve().then(() => this._handleChannelMessage(r));
      }, this._requestInitialSync();
    } catch (e) {
      Kr("BroadcastChannel init failed:", e);
    }
  }
  async _handleChannelMessage(e) {
    const { operation: r, data: i } = e.data || {};
    if (!i?.dbName || i.dbName !== this.dbName) return;
    if (r === "memorySyncRequest") {
      this._isNewerVersionVector(i.requesterVV) ? (lt("Responding to sync request with newer data"), Promise.resolve().then(() => this.sendFilesToSW(i.requesterId))) : lt("No newer data to send to requester");
      return;
    }
    if (r !== "memorySync") return;
    const n = i.versionVector;
    if (i.sender === this.deviceId) {
      lt("Skipping own update");
      return;
    }
    if (i.targetId && i.targetId !== this.deviceId) {
      lt("Message not meant for this tab. Ignoring.");
      return;
    }
    if (!this._isNewerVersionVector(n)) {
      lt("Skipping received update - not newer than current", this.versionVector, n);
      return;
    }
    try {
      lt("Applying update from channel:", i), this._files = new Map(i.files), this._mergeVersionVector(n), lt("Memory updated from channel successfully");
    } catch (o) {
      Kr("Failed to apply channel message:", o);
    }
  }
  async wipe() {
    lt(`Wiping db: ${this.dbName}`), this._files.clear(), this._initializeRoot(), this.versionVector = { [this.deviceId]: 0 }, await this._handleFilesChange();
  }
  async _handleFilesChange() {
    this._incrementVersionVector(), this.options?.supportsServiceWorker && this.options?.useSW && await this.sendFilesToSW();
  }
  async readFile(e, r = {}) {
    if (lt("this.files", this._files), !this._files.has(e))
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
    const i = /* @__PURE__ */ new Set(), n = e === "/" ? "/" : `${e}/`;
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
    const r = e === "/" ? "/" : e.replace(/\/+$/, "");
    if (!this._files.has(r))
      throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
    if (this._files.get(r).type !== "dir")
      throw Object.assign(new Error("ENOTDIR"), { code: "ENOTDIR" });
    for (const n of this._files.keys())
      if (n.startsWith(`${r}/`))
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
var Nn, To;
function ed() {
  if (To) return Nn;
  To = 1, Nn = t;
  function t(e) {
    var r, i;
    if (typeof e != "function")
      throw new Error("expected a function but got " + e);
    return function() {
      return r || (r = !0, i = e.apply(this, arguments)), i;
    };
  }
  return Nn;
}
var Fn = {}, $o;
function td() {
  return $o || ($o = 1, function(t) {
    function e(I, T) {
      var A;
      return I instanceof fe ? A = I : A = fe.from(I.buffer, I.byteOffset, I.byteLength), A.toString(T);
    }
    var r = function(I) {
      return fe.from(I);
    };
    function i(I) {
      for (var T = 0, A = Math.min(256 * 256, I.length + 1), P = new Uint16Array(A), U = [], M = 0; ; ) {
        var B = T < I.length;
        if (!B || M >= A - 1) {
          var O = P.subarray(0, M), W = O;
          if (U.push(String.fromCharCode.apply(null, W)), !B) return U.join("");
          I = I.subarray(T), T = 0, M = 0;
        }
        var z = I[T++];
        if ((z & 128) === 0) P[M++] = z;
        else if ((z & 224) === 192) {
          var K = I[T++] & 63;
          P[M++] = (z & 31) << 6 | K;
        } else if ((z & 240) === 224) {
          var K = I[T++] & 63, N = I[T++] & 63;
          P[M++] = (z & 31) << 12 | K << 6 | N;
        } else if ((z & 248) === 240) {
          var K = I[T++] & 63, N = I[T++] & 63, Q = I[T++] & 63, ce = (z & 7) << 18 | K << 12 | N << 6 | Q;
          ce > 65535 && (ce -= 65536, P[M++] = ce >>> 10 & 1023 | 55296, ce = 56320 | ce & 1023), P[M++] = ce;
        }
      }
    }
    function n(I) {
      for (var T = 0, A = I.length, P = 0, U = Math.max(32, A + (A >>> 1) + 7), M = new Uint8Array(U >>> 3 << 3); T < A; ) {
        var B = I.charCodeAt(T++);
        if (B >= 55296 && B <= 56319) {
          if (T < A) {
            var O = I.charCodeAt(T);
            (O & 64512) === 56320 && (++T, B = ((B & 1023) << 10) + (O & 1023) + 65536);
          }
          if (B >= 55296 && B <= 56319) continue;
        }
        if (P + 4 > M.length) {
          U += 8, U *= 1 + T / I.length * 2, U = U >>> 3 << 3;
          var W = new Uint8Array(U);
          W.set(M), M = W;
        }
        if ((B & 4294967168) === 0) {
          M[P++] = B;
          continue;
        } else if ((B & 4294965248) === 0) M[P++] = B >>> 6 & 31 | 192;
        else if ((B & 4294901760) === 0) M[P++] = B >>> 12 & 15 | 224, M[P++] = B >>> 6 & 63 | 128;
        else if ((B & 4292870144) === 0) M[P++] = B >>> 18 & 7 | 240, M[P++] = B >>> 12 & 63 | 128, M[P++] = B >>> 6 & 63 | 128;
        else continue;
        M[P++] = B & 63 | 128;
      }
      return M.slice ? M.slice(0, P) : M.subarray(0, P);
    }
    var a = "Failed to ", o = function(I, T, A) {
      if (I) throw new Error("".concat(a).concat(T, ": the '").concat(A, "' option is unsupported."));
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
        var A = new Blob([I], { type: "text/plain;charset=UTF-8" });
        T = URL.createObjectURL(A);
        var P = new XMLHttpRequest();
        return P.open("GET", T, !1), P.send(), P.responseText;
      } finally {
        T && URL.revokeObjectURL(T);
      }
    }
    var m = !s && typeof Blob == "function" && typeof URL == "function" && typeof URL.createObjectURL == "function", p = ["utf-8", "utf8", "unicode-1-1-utf-8"], y = i;
    s ? y = e : m && (y = function(I) {
      try {
        return u(I);
      } catch {
        return i(I);
      }
    });
    var E = "construct 'TextDecoder'", R = "".concat(a, " ").concat(E, ": the ");
    function $(I, T) {
      o(T && T.fatal, E, "fatal"), I = I || "utf-8";
      var A;
      if (s ? A = fe.isEncoding(I) : A = p.indexOf(I.toLowerCase()) !== -1, !A) throw new RangeError("".concat(R, " encoding label provided ('").concat(I, "') is invalid."));
      this.encoding = I, this.fatal = !1, this.ignoreBOM = !1;
    }
    $.prototype.decode = function(I, T) {
      o(T && T.stream, "decode", "stream");
      var A;
      return I instanceof Uint8Array ? A = I : I.buffer instanceof ArrayBuffer ? A = new Uint8Array(I.buffer) : A = new Uint8Array(I), y(A, this.encoding);
    }, t.TextEncoder = t.TextEncoder || f, t.TextDecoder = t.TextDecoder || $;
  }(typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : Fn)), Fn;
}
var Mn, Ro;
function rd() {
  return Ro || (Ro = 1, td(), Mn = {
    encode: (t) => new TextEncoder().encode(t),
    decode: (t) => new TextDecoder().decode(t)
  }), Mn;
}
var Un, Do;
function id() {
  if (Do) return Un;
  Do = 1, Un = t;
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
  return Un;
}
var Ln, Bo;
function _a() {
  if (Bo) return Ln;
  Bo = 1;
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
    return l = l.replace(/\/{2,}/g, "/"), l;
  }
  function i(s) {
    if (s.length === 0) return [];
    if (s === "/") return ["/"];
    let l = s.split("/");
    return l[l.length - 1] === "" && l.pop(), s[0] === "/" ? l[0] = "/" : l[0] !== "." && l.unshift("."), l;
  }
  function n(s) {
    const l = s.lastIndexOf("/");
    if (l === -1) throw new Error(`Cannot get dirname of "${s}"`);
    return l === 0 ? "/" : s.slice(0, l);
  }
  function a(s) {
    if (s === "/") throw new Error(`Cannot get basename of "${s}"`);
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
  return Ln = {
    join: r,
    normalize: t,
    split: i,
    basename: a,
    dirname: n,
    resolve: e
  }, Ln;
}
var Pn, Ao;
function ec() {
  if (Ao) return Pn;
  Ao = 1;
  function t(o) {
    return class extends Error {
      constructor(...s) {
        super(...s), this.code = o, this.message ? this.message = o + ": " + this.message : this.message = o;
      }
    };
  }
  const e = t("EEXIST"), r = t("ENOENT"), i = t("ENOTDIR"), n = t("ENOTEMPTY"), a = t("ETIMEDOUT");
  return Pn = { EEXIST: e, ENOENT: r, ENOTDIR: i, ENOTEMPTY: n, ETIMEDOUT: a }, Pn;
}
var jn, Oo;
function nd() {
  if (Oo) return jn;
  Oo = 1;
  const t = _a(), { EEXIST: e, ENOENT: r, ENOTDIR: i, ENOTEMPTY: n } = ec(), a = 0;
  return jn = class {
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
        for (let [p, y] of u) {
          if (p === 0) continue;
          let E = y.get(a), R = E.mode.toString(8);
          l += `${"	".repeat(m)}${p}	${R}`, E.type === "file" ? l += `	${E.size}	${E.mtimeMs}
` : (l += `
`, f(y, m + 1));
        }
      };
      return f(s, 0), l;
    }
    parse(s) {
      let l = 0;
      function f(y) {
        const E = ++l, R = y.length === 1 ? "dir" : "file";
        let [$, I, T] = y;
        return $ = parseInt($, 8), I = I ? parseInt(I) : 0, T = T ? parseInt(T) : Date.now(), /* @__PURE__ */ new Map([[a, { mode: $, type: R, size: I, mtimeMs: T, ino: E }]]);
      }
      let u = s.trim().split(`
`), m = this._makeRoot(), p = [
        { indent: -1, node: m },
        { indent: 0, node: null }
      ];
      for (let y of u) {
        let R = y.match(/^\t*/)[0].length;
        y = y.slice(R);
        let [$, ...I] = y.split("	"), T = f(I);
        if (R <= p[p.length - 1].indent)
          for (; R <= p[p.length - 1].indent; )
            p.pop();
        p.push({ indent: R, node: T }), p[p.length - 2].node.set($, T);
      }
      return m;
    }
    _lookup(s, l = !0) {
      let f = this._root, u = "/", m = t.split(s);
      for (let p = 0; p < m.length; ++p) {
        let y = m[p];
        if (f = f.get(y), !f) throw new r(s);
        if (l || p < m.length - 1) {
          const E = f.get(a);
          if (E.type === "symlink") {
            let R = t.resolve(u, E.target);
            f = this._lookup(R);
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
      let m = /* @__PURE__ */ new Map(), p = {
        mode: l,
        type: "dir",
        size: 0,
        mtimeMs: Date.now(),
        ino: this.autoinc()
      };
      m.set(a, p), f.set(u, m);
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
        let R = this.stat(s);
        f == null && (f = R.mode), u = R.ino;
      } catch {
      }
      f == null && (f = 438), u == null && (u = this.autoinc());
      let m = this._lookup(t.dirname(s)), p = t.basename(s), y = {
        mode: f,
        type: "file",
        size: l,
        mtimeMs: Date.now(),
        ino: u
      }, E = /* @__PURE__ */ new Map();
      return E.set(a, y), m.set(p, E), y;
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
        let R = this.stat(l);
        u === null && (u = R.mode), f = R.ino;
      } catch {
      }
      u == null && (u = 40960), f == null && (f = this.autoinc());
      let m = this._lookup(t.dirname(l)), p = t.basename(l), y = {
        mode: u,
        type: "symlink",
        target: s,
        size: 0,
        mtimeMs: Date.now(),
        ino: f
      }, E = /* @__PURE__ */ new Map();
      return E.set(a, y), m.set(p, E), y;
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
  }, jn;
}
class tc {
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
let zn;
function kr() {
  return zn || (zn = new tc()), zn;
}
function ad(t, e = kr()) {
  let r;
  return e._withIDBStore("readwrite", (i) => {
    r = i.get(t);
  }).then(() => r.result);
}
function od(t, e, r = kr()) {
  return r._withIDBStore("readwrite", (i) => {
    i.put(e, t);
  });
}
function sd(t, e, r = kr()) {
  return r._withIDBStore("readwrite", (i) => {
    const n = i.get(t);
    n.onsuccess = () => {
      i.put(e(n.result), t);
    };
  });
}
function cd(t, e = kr()) {
  return e._withIDBStore("readwrite", (r) => {
    r.delete(t);
  });
}
function ld(t = kr()) {
  return t._withIDBStore("readwrite", (e) => {
    e.clear();
  });
}
function ud(t = kr()) {
  const e = [];
  return t._withIDBStore("readwrite", (r) => {
    (r.openKeyCursor || r.openCursor).call(r).onsuccess = function() {
      this.result && (e.push(this.result.key), this.result.continue());
    };
  }).then(() => e);
}
function fd(t = kr()) {
  return t._close();
}
var hd = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Store: tc,
  clear: ld,
  close: fd,
  del: cd,
  get: ad,
  keys: ud,
  set: od,
  update: sd
}), rc = /* @__PURE__ */ il(hd), Hn, Co;
function dd() {
  if (Co) return Hn;
  Co = 1;
  const t = rc;
  return Hn = class {
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
  }, Hn;
}
var Wn, No;
function wd() {
  return No || (No = 1, Wn = class {
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
  }), Wn;
}
var qn, Fo;
function pd() {
  if (Fo) return qn;
  Fo = 1;
  const t = rc, e = (r) => new Promise((i) => setTimeout(i, r));
  return qn = class {
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
  }, qn;
}
var Gn, Mo;
function md() {
  return Mo || (Mo = 1, Gn = class {
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
  }), Gn;
}
var Zn, Uo;
function gd() {
  if (Uo) return Zn;
  Uo = 1;
  const { encode: t, decode: e } = rd(), r = id(), i = nd(), { ENOENT: n, ENOTEMPTY: a, ETIMEDOUT: o } = ec(), s = dd(), l = wd(), f = pd(), u = md(), m = _a();
  return Zn = class {
    constructor() {
      this.saveSuperblock = r(() => {
        this.flush();
      }, 500);
    }
    async init(y, {
      wipe: E,
      url: R,
      urlauto: $,
      fileDbName: I = y,
      db: T = null,
      fileStoreName: A = y + "_files",
      lockDbName: P = y + "_lock",
      lockStoreName: U = y + "_lock"
    } = {}) {
      this._name = y, this._idb = T || new s(I, A), this._mutex = navigator.locks ? new u(y) : new f(P, U), this._cache = new i(y), this._opts = { wipe: E, url: R }, this._needsWipe = !!E, R && (this._http = new l(R), this._urlauto = !!$);
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
    _writeStat(y, E, R) {
      let $ = m.split(m.dirname(y)), I = $.shift();
      for (let T of $) {
        I = m.join(I, T);
        try {
          this._cache.mkdir(I, { mode: 511 });
        } catch {
        }
      }
      return this._cache.writeStat(y, E, R);
    }
    async readFile(y, E) {
      const { encoding: R } = E;
      if (R && R !== "utf8") throw new Error('Only "utf8" encoding is supported in readFile');
      let $ = null, I = null;
      try {
        I = this._cache.stat(y), $ = await this._idb.readFile(I.ino);
      } catch (T) {
        if (!this._urlauto) throw T;
      }
      if (!$ && this._http) {
        let T = this._cache.lstat(y);
        for (; T.type === "symlink"; )
          y = m.resolve(m.dirname(y), T.target), T = this._cache.lstat(y);
        $ = await this._http.readFile(y);
      }
      if ($ && ((!I || I.size != $.byteLength) && (I = await this._writeStat(y, $.byteLength, { mode: I ? I.mode : 438 }), this.saveSuperblock()), R === "utf8" ? $ = e($) : $.toString = () => e($)), !I) throw new n(y);
      return $;
    }
    async writeFile(y, E, R) {
      const { mode: $, encoding: I = "utf8" } = R;
      if (typeof E == "string") {
        if (I !== "utf8")
          throw new Error('Only "utf8" encoding is supported in writeFile');
        E = t(E);
      }
      const T = await this._cache.writeStat(y, E.byteLength, { mode: $ });
      await this._idb.writeFile(T.ino, E);
    }
    async unlink(y, E) {
      const R = this._cache.lstat(y);
      this._cache.unlink(y), R.type !== "symlink" && await this._idb.unlink(R.ino);
    }
    readdir(y, E) {
      return this._cache.readdir(y);
    }
    mkdir(y, E) {
      const { mode: R = 511 } = E;
      this._cache.mkdir(y, { mode: R });
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
      let R = await this._http.sizeFile(y);
      await this._writeStat(y, R, E);
    }
    du(y) {
      return this._cache.du(y);
    }
    flush() {
      return this._saveSuperblock();
    }
  }, Zn;
}
var Vn, Lo;
function yd() {
  return Lo || (Lo = 1, Vn = class {
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
  }), Vn;
}
var Xn, Po;
function _d() {
  if (Po) return Xn;
  Po = 1;
  const t = gd(), e = yd(), r = _a();
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
  return Xn = class {
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
      this._initPromise || console.warn(new Error(`Attempted to use LightningFS ${this._name} before it was initialized.`)), await this._initPromise, this._deactivationTimeout && (clearTimeout(this._deactivationTimeout), this._deactivationTimeout = null), this._deactivationPromise && await this._deactivationPromise, this._deactivationPromise = null, this._activationPromise || (this._activationPromise = this._backend.activate ? this._backend.activate() : Promise.resolve()), await this._activationPromise;
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
  }, Xn;
}
var Yn, jo;
function bd() {
  if (jo) return Yn;
  jo = 1;
  const t = ed(), e = _d();
  function r(i, n) {
    return typeof i == "function" && (n = i), n = t(n), [(...o) => n(null, ...o), n];
  }
  return Yn = class {
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
  }, Yn;
}
var vd = bd(), Di = /* @__PURE__ */ rr(vd);
const ic = new Gr(Er.logging.fsManagerES6);
function $t(...t) {
  ic.consoleDotLog("[fsManagerES6] ", ...t);
}
function Kn(...t) {
  ic.consoleDotError("[fsManagerES6] ", ...t);
}
$t("Loading fsmanagerES6.");
class Ed {
  constructor(e = { supportsServiceWorker: !0, useSW: !0 }) {
    this.fsInstances = /* @__PURE__ */ new Map(), this.initializationLocks = /* @__PURE__ */ new Map(), this.debug = !0, this.options = e, this.memoryBackends = /* @__PURE__ */ new Map();
  }
  _log(...e) {
    this.debug && $t("[fsManager]", ...e);
  }
  _error(...e) {
    Kn("[fsManager]", ...e);
  }
  async initializeFS(e, r) {
    const i = `${e}-${r}`;
    this._log(`Initializing FS: ${i}`);
    try {
      if ($t("Initializing."), this.fsInstances.has(i))
        return this._log(`FS ${i} already exists`), this.fsInstances.get(i);
      let n;
      if (r === "memory") {
        $t(`Creating memory FS for ${i}`);
        const a = new Io(this.options, e);
        $t(`Memory backend created for ${i} backend: `, a), this.memoryBackends.set(i, a), n = new Di(e, { backend: a }), $t(`Memory FS created for ${i}`), this._log(`Created memory FS with backend for ${i}`);
      } else if (r === "idb")
        n = new Di(e), this._log(`Created IDB FS for ${i}`);
      else
        throw new Error(`Unsupported FS type: ${r}`);
      return this.fsInstances.set(i, n), n;
    } catch (n) {
      throw this._error(`Failed to initialize ${i}:`, n), n;
    }
  }
  async getFS(e, r) {
    const i = `${e}-${r}`;
    if (this._log(`Requesting FS: ${i}`), this.initializationLocks.has(i))
      return this._log(`Waiting for existing initialization of ${i}`), this.initializationLocks.get(i);
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
    const i = `${e}-${r}`;
    this._log(`Deleting FS: ${i}`);
    try {
      if (!this.fsInstances.has(i)) {
        this._log(`File system ${i} does not exist. Nothing to delete.`);
        return;
      }
      const n = this.fsInstances.get(i);
      if (r === "idb")
        try {
          await this.deleteIndexedDB(e), this._log(`IndexedDB file system ${i} deleted successfully.`);
        } catch (a) {
          throw this._error(`Error deleting IndexedDB file system ${i}:`, a), a;
        }
      else if (r === "memory") {
        if (this.memoryBackends.has(i)) {
          const a = this.memoryBackends.get(i);
          if (a && a.close)
            try {
              await a.close(), this._log(`Memory backend for ${i} closed successfully.`);
            } catch (o) {
              this._error(`Error closing memory backend for ${i}:`, o);
            }
          this.memoryBackends.delete(i);
        }
        this._log(`Memory file system ${i} deleted successfully.`);
      } else
        throw new Error(`Unsupported file system type: ${r}`);
      this.fsInstances.delete(i);
    } catch (n) {
      throw this._error(`Failed to delete ${i}:`, n), n;
    }
  }
  // Enhanced createBackupFS method with better memory support
  async createBackupFS(e, r, i = "_replica") {
    const n = `${e}${i}`, a = `${e}-${r}`, o = `${n}-${r}`;
    this._log(`Creating backup of ${a} as ${o}`);
    try {
      const s = await this.getFS(e, r);
      if (r === "memory") {
        const l = this.memoryBackends.get(a);
        if (!l)
          throw new Error("Original memory backend not found");
        const f = new Io({
          ...this.options,
          deviceId: `${this.options.deviceId || "default"}-${Date.now()}`
        }, n);
        if (l._files instanceof Map)
          for (const [m, p] of l._files)
            f._files.set(m, { ...p });
        else
          throw new Error("Original memory backend files not in expected format");
        const u = new Di(n, { backend: f });
        this.fsInstances.set(o, u), this.memoryBackends.set(o, f);
      } else if (r === "idb") {
        const l = new Di(n);
        this.fsInstances.set(o, l), await this._copyIDBContents(s, l, "/");
      } else
        throw new Error(`Unsupported FS type for backup: ${r}`);
      return await this._registerBackupMount(e, n), this._log(`Backup created successfully: ${o}`), this.fsInstances.get(o);
    } catch (s) {
      throw this._error(`Failed to create backup ${o}:`, s), this.fsInstances.has(o) && this.fsInstances.delete(o), this.memoryBackends.has(o) && this.memoryBackends.delete(o), s;
    }
  }
  // Memory-specific methods
  async getMemorySnapshot(e) {
    const r = `${e}-memory`;
    if (!this.memoryBackends.has(r))
      throw new Error(`Memory filesystem ${e} not found`);
    const i = this.memoryBackends.get(r);
    if (!i._files)
      throw new Error("Memory backend files not initialized");
    const n = /* @__PURE__ */ new Map();
    for (const [a, o] of i._files)
      n.set(a, { ...o });
    return n;
  }
  async restoreMemorySnapshot(e, r) {
    const i = `${e}-memory`;
    if (!this.memoryBackends.has(i))
      throw new Error(`Memory filesystem ${e} not found`);
    const n = this.memoryBackends.get(i);
    n._files || n._initializeRoot(), n._files.clear();
    for (const [a, o] of r)
      n._files.set(a, { ...o });
    this._log(`Memory filesystem ${e} restored from snapshot`);
  }
  async getMemoryStats(e) {
    const r = `${e}-memory`;
    if (!this.memoryBackends.has(r))
      throw new Error(`Memory filesystem ${e} not found`);
    const i = this.memoryBackends.get(r);
    if (!i._files)
      return {
        fileCount: 0,
        totalSize: 0,
        paths: []
      };
    let n = 0, a = 0;
    const o = [];
    for (const [s, l] of i._files)
      n++, a += l.data ? l.data.byteLength : 0, o.push(s);
    return {
      fileCount: n,
      totalSize: a,
      paths: o.sort()
    };
  }
  async _copyIDBContents(e, r, i = "/") {
    try {
      const n = i === "/" ? "/" : i.replace(/\/+$/, ""), a = await e.promises.readdir(n);
      for (const o of a) {
        const s = n === "/" ? `/${o}` : `${n}/${o}`, l = s;
        try {
          if ((await e.promises.stat(s)).isDirectory()) {
            try {
              await r.promises.mkdir(l, { recursive: !0 });
            } catch (u) {
              if (u.code !== "EEXIST")
                throw u;
              $t(`Directory ${l} already exists, continuing`);
            }
            await this._copyIDBContents(e, r, s);
          } else {
            const u = await e.promises.readFile(s);
            await r.promises.writeFile(l, u);
          }
        } catch (f) {
          this._error(`Error processing ${s}:`, f);
          continue;
        }
      }
    } catch (n) {
      throw n.code === "ENOENT" ? this._error(`Source path ${i} does not exist`) : n.code === "EEXIST" ? $t(`Path ${i} already exists`) : this._error(`Error copying path ${i}:`, n), n;
    }
  }
  async _registerBackupMount(e, r, i = {}) {
    const a = { ...{
      readOnly: !0,
      // Backups are typically read-only
      hidden: !1,
      // Whether to hide from normal listings
      preserveOriginal: !0,
      // Keep original metadata
      mountPath: `/${r}`
      // Customizable mount path
    }, ...i }, { mountPath: o } = a;
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
    return new Promise((r, i) => {
      const n = indexedDB.deleteDatabase(e);
      n.onsuccess = () => {
        $t(`Deleted database ${e} successfully`), r();
      }, n.onerror = (a) => {
        Kn(`Error deleting database ${e}:`, a), i(a);
      }, n.onblocked = () => {
        console.warn(`Delete database ${e} blocked`);
      };
    });
  }
  async getFileStoreNames(e, r) {
    const i = `${e}-${r}`;
    if (!this.fsInstances.has(i))
      throw new Error(`File system ${i} not found. Call initializeFS first.`);
    if (r === "idb")
      try {
        const n = await this.getFileStoresFromDatabases();
        return $t(`File store names for ${i}:`, n), n;
      } catch (n) {
        throw Kn(`Error retrieving file store names for ${i}:`, n), n;
      }
    else if (r === "memory") {
      if (this.memoryBackends.has(i)) {
        const n = this.memoryBackends.get(i);
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
      throw new Error(`Unsupported file system type: ${r}`);
  }
  async processDatabaseList(e) {
    const r = [];
    for (const i of e) {
      const n = typeof i == "string" ? i : i.name, o = (await this.openDatabase(n)).objectStoreNames, s = Array.from(o).filter((l) => l.startsWith("fs_")).map((l) => ({ database: n, fileStore: l }));
      r.push(...s);
    }
    return $t("Processing database list:", r), r;
  }
  async openDatabase(e) {
    return $t("Opening database:", e), new Promise((r, i) => {
      const n = indexedDB.open(e);
      n.onsuccess = (a) => {
        const o = a.target.result;
        r(o);
      }, n.onerror = (a) => {
        i(`Error opening database ${e}: ${a.target.error}`);
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
        r(`Error retrieving database list: ${n.target.error}`);
      });
    });
  }
}
var at = {
  async resolveRef(t, e, r = "HEAD") {
    try {
      return await te.resolveRef({
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
      return await te.readCommit({
        fs: t,
        dir: e,
        oid: r
      });
    } catch (i) {
      throw console.error("Error reading commit:", i), i;
    }
  }
};
const me = new Gr(Er.logging.dotGit), gr = /* @__PURE__ */ new Map();
function mt(...t) {
  me.consoleDotLog("[DotGit] ", ...t);
}
function kd(...t) {
  me.consoleDotError("[DotGit] ", ...t);
}
var Zt = {
  staged: gr,
  async commitStagedChanges(t, e, r = null, i = "System", n = "system@example.com") {
    try {
      if (me.consoleDotLog("staged", gr, e), this.staged.size === 0)
        return me.consoleDotLog("No staged changes to commit"), { committed: !1 };
      let a;
      try {
        a = await te.resolveRef({ fs: t, dir: e, ref: "HEAD" }), me.consoleDotLog(`Parent commit OID: ${a}`);
      } catch {
        me.consoleDotLog("No existing commit, starting fresh repository"), a = null;
      }
      let o = [];
      if (a) {
        const { commit: y } = await te.readCommit({ fs: t, dir: e, oid: a });
        o = (await te.readTree({ fs: t, dir: e, oid: y.tree })).tree;
      }
      const s = async (y, E) => {
        const R = JSON.parse(JSON.stringify(y));
        for (const [$, I] of E) {
          if (!$ || typeof $ != "string") {
            me.consoleDotError("Invalid file path in staged changes:", $);
            continue;
          }
          const A = $.replace(/^\/+|\/+$/g, "").split("/").filter((B) => B.length > 0);
          if (A.length === 0) {
            me.consoleDotError("Empty path in staged changes");
            continue;
          }
          const P = A.pop();
          let U = R, M = [];
          for (const B of A) {
            let O = U.find((z) => z.path === B && z.type === "tree");
            if (!O) {
              const z = await te.writeTree({ fs: t, dir: e, tree: [] });
              O = {
                mode: "040000",
                path: B,
                oid: z,
                type: "tree"
              }, U.push(O);
            }
            const { tree: W } = await te.readTree({ fs: t, dir: e, oid: O.oid });
            O.tree = W, U = W, M.push(B);
          }
          try {
            if (I.type === "write" || I.type === "writeDir") {
              const B = U.findIndex((W) => W.path === P), O = I.type === "writeDir" ? I.treeOid : I.oid;
              if (!O)
                throw new Error(`Missing OID for ${I.type} operation on ${$}`);
              B >= 0 ? (U[B].oid = O, U[B].type = I.type === "write" ? "blob" : "tree", U[B].mode = I.type === "write" ? "100644" : "040000") : U.push({
                mode: I.type === "write" ? "100644" : "040000",
                path: P,
                oid: O,
                type: I.type === "write" ? "blob" : "tree"
              });
            } else if (I.type === "remove" || I.type === "removeDir") {
              const B = U.findIndex((O) => O.path === P);
              B >= 0 && U.splice(B, 1);
            }
          } catch (B) {
            throw me.consoleDotError(`Error processing ${I.type} for ${$}:`, B), B;
          }
        }
        return R;
      }, l = Array.from(this.staged.entries()), f = await s(o, l);
      for (const y of f)
        console.log("entry of updated tree, ", y), y.path || console.error("❌ Missing path:", y), y.oid || console.error("❌ Missing oid:", y);
      ((y) => {
        for (const E of y) {
          if (!E.path || typeof E.path != "string")
            throw new Error(`Invalid tree entry: ${JSON.stringify(E)}`);
          if (!E.oid || typeof E.oid != "string")
            throw new Error(`Invalid OID for path ${E.path}`);
        }
      })(f);
      const m = await this._writeFullTree(t, e, f), p = await this.commitChanges(t, e, {
        message: r || `Batch commit ${l.length} staged changes`,
        treeOid: m,
        parentCommitOids: a ? [a] : [],
        name: i,
        email: n,
        actionType: "batch",
        filePath: null
      });
      return this.staged.clear(), {
        committed: !0,
        commitOid: p,
        treeOid: m,
        stagedCount: l.length
      };
    } catch (a) {
      throw me.consoleDotError("Error committing staged changes:", a), a;
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
      const f = await te.commit({
        fs: t,
        dir: e,
        message: r,
        tree: i,
        parent: n,
        author: { name: a, email: o }
      });
      return me.consoleDotLog(`Committed ${s} for ${l || "repository"}: ${f}`), f;
    } catch (f) {
      throw me.consoleDotError("Error committing changes:", f), f;
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
      return await te.writeTree({ fs: t, dir: e, tree: a });
    };
    return await i(r);
  },
  async findInGitHistory(t, e, r) {
    try {
      me.consoleDotLog("Starting findInGitHistory function..."), me.consoleDotLog(`File path: ${r}`);
      const n = r.replace(/^\/+|\/+$/g, "").split("/");
      me.consoleDotLog(`Path parts: ${JSON.stringify(n)}`);
      let a = await at.resolveRef(t, e);
      for (me.consoleDotLog(`Starting from commit: ${a}`); a; ) {
        me.consoleDotLog(`Processing commit: ${a}`);
        const { commit: o } = await at.readCommit(t, e, a);
        let s = o.tree;
        me.consoleDotLog(`Root tree OID: ${s}`);
        let l = !0;
        for (let f = 0; f < n.length; f++) {
          const u = n[f];
          me.consoleDotLog(`Processing path part: ${u}`);
          const { tree: m } = await te.readTree({
            fs: t,
            dir: e,
            oid: s
          }), p = m.find((y) => y.path === u);
          if (!p) {
            me.consoleDotLog(`Path part "${u}" not found in tree.`), l = !1;
            break;
          }
          if (f === n.length - 1)
            return me.consoleDotLog(`Found path "${r}" in commit ${a}`, m), me.consoleDotLog(p), {
              type: p.type,
              oid: p.oid,
              commitOid: a,
              treeOid: s
            };
          if (p.type === "tree")
            s = p.oid, me.consoleDotLog(`Found subtree OID: ${s}`);
          else {
            me.consoleDotLog(`Path part "${u}" is not a directory.`), l = !1;
            break;
          }
        }
        if (l)
          return me.consoleDotLog(`Path "${r}" found in commit ${a}`), {
            type: "tree",
            oid: s,
            commitOid: a
          };
        a = o.parent.length > 0 ? o.parent[0] : null, me.consoleDotLog(`Moving to parent commit: ${a}`);
      }
      throw new Error(`Path "${r}" not found in any commit.`);
    } catch (i) {
      throw me.consoleDotLog("Error in findInGitHistory:", i), i;
    }
  },
  async readFileDot(t, e, r, i = null) {
    try {
      if (me.consoleDotLog(`args are fs: ${t}, dir: ${e}, filePath: ${r}, commitOid: ${i}`), r = r.replace(/^\/+|\/+$/g, ""), i === "staged") {
        const m = this.staged.get(r);
        if (m && m.type === "write")
          try {
            const p = await te.readBlob({
              fs: t,
              dir: e,
              oid: m.oid
            }), y = p.blob instanceof ArrayBuffer ? new Uint8Array(p.blob) : p.blob instanceof Uint8Array ? p.blob : null;
            if (!y) throw new Error("Invalid blob data");
            return new TextDecoder().decode(y);
          } catch (p) {
            me.consoleDotError("Error reading staged blob, falling back:", p);
          }
        else
          me.consoleDotLog(`File "${r}" not found in staged changes. Falling back...`);
      }
      const n = r.split("/"), a = n.pop(), o = i && i !== "staged" ? i : await at.resolveRef(t, e), { commit: s } = await at.readCommit(t, e, o);
      let l = s.tree;
      for (const m of n) {
        const { tree: p } = await te.readTree({ fs: t, dir: e, oid: l }), y = p.find((E) => E.path === m && E.type === "tree");
        if (!y)
          return me.consoleDotLog(`Directory "${m}" not found`), "";
        l = y.oid;
      }
      const f = await te.readBlob({
        fs: t,
        dir: e,
        oid: l,
        filepath: a
      }), u = f.blob instanceof ArrayBuffer ? new Uint8Array(f.blob) : f.blob instanceof Uint8Array ? f.blob : null;
      return u ? new TextDecoder().decode(u) : (me.consoleDotError("Invalid blob data from commit"), "");
    } catch (n) {
      return me.consoleDotError("Error in readFileDot:", n), "";
    }
  },
  async readDirDot(t, e, r, i = null) {
    try {
      if (r = r.replace(/^\/+|\/+$/g, ""), i === "staged")
        try {
          const f = Array.from(this.staged.entries()).filter(([u, m]) => {
            const p = u.replace(/^\/+|\/+$/g, ""), y = p.split("/"), E = r.split("/");
            return y.length === E.length + 1 && p.startsWith(r + (r ? "/" : ""));
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
          me.consoleDotLog(`No staged entries for "${r}", falling back...`);
        } catch (f) {
          me.consoleDotError("Error reading staged directory, falling back:", f);
        }
      const n = i && i !== "staged" ? i : await at.resolveRef(t, e), { commit: a } = await at.readCommit(t, e, n);
      let o = a.tree;
      const s = r.split("/").filter(Boolean);
      for (const f of s) {
        const { tree: u } = await te.readTree({ fs: t, dir: e, oid: o }), m = u.find((p) => p.path === f && p.type === "tree");
        if (!m)
          return me.consoleDotLog(`Directory "${f}" not found in commit tree.`), { entries: [], dirPath: r, commitOid: n, treeOid: o };
        o = m.oid;
      }
      const { tree: l } = await te.readTree({ fs: t, dir: e, oid: o });
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
      return me.consoleDotError("Error in readDirDot:", n), { entries: [], dirPath: r, commitOid: null, treeOid: null };
    }
  },
  async writeFileDot(t, e, r, i, n = "sample", a = "sample@email.com", o = 1) {
    try {
      me.consoleDotLog("Starting writeFileDot function..."), r = r.replace(/^\/+|\/+$/g, "");
      const s = r.split("/"), l = s.pop(), f = await this.isDirectoryDot(t, e, r);
      if (f.exists) {
        if (f.isDirectory)
          throw new Error(`Path ${r} exists and is a directory - cannot write as file`);
        me.consoleDotLog(`File ${r} exists and will be overwritten`);
      }
      const u = await te.writeBlob({
        fs: t,
        dir: e,
        blob: new TextEncoder().encode(i)
      });
      me.consoleDotLog(`Blob OID created: ${u}`);
      let m;
      try {
        m = await te.resolveRef({ fs: t, dir: e, ref: "HEAD" }), me.consoleDotLog(`Latest commit OID resolved: ${m}`);
      } catch {
        me.consoleDotLog("No existing commit, starting fresh repository"), m = null;
      }
      let p = [];
      if (m) {
        const { commit: I } = await te.readCommit({ fs: t, dir: e, oid: m });
        p = (await te.readTree({ fs: t, dir: e, oid: I.tree })).tree, me.consoleDotLog(`Current tree loaded with ${p.length} entries`);
      }
      const y = async (I, T, A) => {
        if (T.length === 0) {
          const W = I.findIndex((z) => z.path === l);
          if (W >= 0 && I[W].type === "tree")
            throw new Error(`Cannot overwrite directory ${l} with file content`);
          return W >= 0 ? I[W] = {
            mode: "100644",
            path: l,
            oid: A,
            type: "blob"
          } : I.push({
            mode: "100644",
            path: l,
            oid: A,
            type: "blob"
          }), I;
        }
        const P = T.shift();
        let U = I.find((W) => W.path === P && W.type === "tree");
        if (!U) {
          const W = await te.writeTree({ fs: t, dir: e, tree: [] });
          U = {
            mode: "040000",
            path: P,
            oid: W,
            type: "tree"
          }, I.push(U);
        }
        const { tree: M } = await te.readTree({ fs: t, dir: e, oid: U.oid }), B = await y([...M], T, A), O = await te.writeTree({ fs: t, dir: e, tree: B });
        return U.oid = O, I;
      }, E = await y([...p], [...s], u), R = await te.writeTree({ fs: t, dir: e, tree: E });
      me.consoleDotLog(`New tree OID: ${R}`);
      let $ = null;
      return o ? ($ = await te.commit({
        fs: t,
        dir: e,
        message: `Updated ${r}`,
        tree: R,
        parent: m ? [m] : [],
        author: { name: n, email: a }
      }), me.consoleDotLog(`New commit OID: ${$}`)) : (gr.set(r, {
        type: "write",
        oid: u,
        treeOid: R,
        filePath: r,
        action: "staged"
      }), me.consoleDotLog(`Staged write for ${r} with blobOid ${u}`)), {
        blobOid: u,
        treeOid: R,
        commitOid: $,
        filePath: r,
        action: o ? "committed" : "staged",
        createdTrees: s.length
      };
    } catch (s) {
      throw me.consoleDotError("Error in writeFileDot:", s), s;
    }
  },
  async isDirectoryDot(t, e, r) {
    try {
      if (mt("[isDirectoryDot] Checking path:", r), !r || r === "/") {
        mt("[isDirectoryDot] Path is root or empty, resolving root directory...");
        const l = await at.resolveRef(t, e);
        mt("[isDirectoryDot] Resolved commit OID:", l);
        const f = await at.readCommit(t, e, l), u = await te.readTree({
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
      const n = await at.resolveRef(t, e);
      mt("[isDirectoryDot] Resolved commit OID:", n);
      const a = await at.readCommit(t, e, n), o = await te.readTree({
        fs: t,
        dir: e,
        oid: a.commit.tree
      });
      mt("[isDirectoryDot] Initial tree loaded:", o.tree);
      let s = o.tree;
      for (let l = 0; l < i.length; l++) {
        const f = i[l];
        mt(`[isDirectoryDot] Checking part "${f}" in current tree...`);
        const u = s.find((m) => m.path === f);
        if (!u)
          return mt(`[isDirectoryDot] Part "${f}" not found in current tree.`), {
            exists: !1,
            isDirectory: !1,
            hasChildren: !1
          };
        if (u.type === "tree") {
          if (mt(`[isDirectoryDot] Part "${f}" is a directory.`), l === i.length - 1) {
            const p = await te.readTree({ fs: t, dir: e, oid: u.oid });
            return mt("[isDirectoryDot] Subtree loaded:", p.tree), {
              exists: !0,
              isDirectory: !0,
              hasChildren: p.tree.length > 0
            };
          }
          s = (await te.readTree({ fs: t, dir: e, oid: u.oid })).tree;
        } else return l === i.length - 1 ? (mt(`[isDirectoryDot] Part "${f}" is a file.`), {
          exists: !0,
          isDirectory: !1,
          hasChildren: !1
        }) : (mt(`[isDirectoryDot] Part "${f}" is not a directory.`), {
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
      return kd("[isDirectoryDot] Error checking directory:", i), {
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
        i = await at.resolveRef(t, e);
      } catch {
        return me.consoleDotLog("No commit found, returning empty list."), [];
      }
      const n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set(), o = async (f, u = "") => {
        if (a.has(f)) return;
        a.add(f), me.consoleDotLog("Traversing tree:", f, "Path:", u);
        const { tree: m } = await te.readTree({ fs: t, dir: e, oid: f });
        await Promise.all(m.map(async (p) => {
          const y = u ? `${u}/${p.path}` : p.path;
          if (n.has(y) || n.set(y, {
            path: y,
            type: p.type,
            oid: p.oid,
            commitOid: i
          }), p.type === "tree")
            return o(p.oid, y);
        }));
      }, { commit: s } = await at.readCommit(t, e, i);
      await o(s.tree);
      let l = Array.from(n.values());
      return r || (l = l.filter((f) => f.type !== "tree")), me.consoleDotLog("Total entries:", l.length, "Entries:", l), l;
    } catch (i) {
      throw me.consoleDotLog("Error in listFilesDot:", i), i;
    }
  },
  async mkdirDot(t, e, r, i = "sample", n = "sample@email.com", a = 1) {
    try {
      me.consoleDotLog(`Creating directories for path: ${r}`), r = r.replace(/^\/+|\/+$/g, "");
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
      let l = await at.resolveRef(t, e).catch(() => null), f = l ? (await at.readCommit(t, e, l)).commit.tree : null, u = f ? (await te.readTree({ fs: t, dir: e, oid: f })).tree : [], m = [], p = f, y = u, E = 0;
      for (const $ of o) {
        let I = y.find((T) => T.path === $ && T.type === "tree");
        if (!I) {
          const T = await te.writeTree({ fs: t, dir: e, tree: [] });
          I = { path: $, mode: "040000", oid: T, type: "tree" }, y.push(I), E++;
        }
        m.push({ tree: y, subtree: I }), p = I.oid, y = (await te.readTree({ fs: t, dir: e, oid: p })).tree;
      }
      for (let $ = m.length - 1; $ >= 0; $--) {
        const { tree: I, subtree: T } = m[$];
        I.find((A) => A.path === T.path).oid = p, p = await te.writeTree({ fs: t, dir: e, tree: I });
      }
      let R = null;
      return a ? (R = await te.commit({
        fs: t,
        dir: e,
        author: { name: i, email: n },
        message: `Created directory: ${r}`,
        tree: p,
        parent: l ? [l] : []
      }), me.consoleDotLog(`New commit OID for directory creation: ${R}`)) : (gr.set(r, {
        type: "writeDir",
        treeOid: p,
        filePath: r,
        action: "staged"
      }), me.consoleDotLog(`Staged write for ${r} with treeOid ${p}`)), {
        dirPath: r,
        treeOid: p,
        commitOid: R,
        createdTrees: E,
        action: a ? "committed" : "staged"
      };
    } catch (o) {
      throw me.consoleDotLog("Error in mkdirdot:", o), o;
    }
  },
  async removeFileDot(t, e, r, i = 1) {
    try {
      me.consoleDotLog(`[removeFileDot] Starting removal for: ${r}, staged files: `, gr), r = r.replace(/^\/+|\/+$/g, "");
      const n = r.split("/"), a = n.pop(), o = await at.resolveRef(t, e), { commit: s } = await at.readCommit(t, e, o), { tree: l } = await te.readTree({
        fs: t,
        dir: e,
        oid: s.tree
      });
      let f = null, u = null;
      const p = l.filter((E) => E.type === "tree").find((E) => E.path === "");
      if (p) {
        const { tree: E } = await te.readTree({
          fs: t,
          dir: e,
          oid: p.oid
        });
        if (f = E.find((R) => R.path === a), f) {
          me.consoleDotLog(`[removeFileDot] Found ${a} in unnamed subtree`);
          const R = E.filter((T) => T.path !== a), $ = await te.writeTree({
            fs: t,
            dir: e,
            tree: R
          }), I = l.map(
            (T) => T.path === "" && T.type === "tree" ? { ...T, oid: $ } : T
          );
          u = await te.writeTree({
            fs: t,
            dir: e,
            tree: I
          });
        }
      }
      if (!f) {
        const E = async (R, $) => {
          const { tree: I } = await te.readTree({ fs: t, dir: e, oid: R });
          if ($.length === 0) {
            if (f = I.find((O) => O.path === a), !f)
              throw new Error(`File ${a} not found in tree`);
            const M = I.filter((O) => O.path !== a);
            return await te.writeTree({ fs: t, dir: e, tree: M });
          }
          const T = $[0], A = I.find((M) => M.path === T && M.type === "tree");
          if (!A) throw new Error(`Directory ${T} not found`);
          const P = await E(A.oid, $.slice(1)), U = I.map(
            (M) => M.path === T && M.type === "tree" ? { ...M, oid: P } : M
          );
          return await te.writeTree({ fs: t, dir: e, tree: U });
        };
        u = await E(s.tree, n);
      }
      if (!f)
        throw new Error(`File ${r} not found in repository`);
      let y = null;
      return i ? (y = await te.commit({
        fs: t,
        dir: e,
        author: { name: "System", email: "system@example.com" },
        message: `Removed file ${r}`,
        tree: u,
        parent: [o]
      }), me.consoleDotLog(`[removeFileDot] Committed removal: ${y}`)) : (gr.set(r, {
        type: "remove",
        oid: f.oid,
        treeOid: u,
        filePath: r,
        action: "staged"
      }), me.consoleDotLog(`Staged removal for ${r} with blobOid ${f.oid}`)), {
        filePath: r,
        treeOid: u,
        commitOid: y,
        action: i ? "committed" : "staged",
        blobOid: f.oid
      };
    } catch (n) {
      throw me.consoleDotLog("[removeFileDot] ERROR:", n), n;
    }
  },
  async removeDirDot(t, e, r, i = 1) {
    try {
      r = r.replace(/^\/+|\/+$/g, "");
      const n = r.split("/"), a = n.pop(), o = await at.resolveRef(t, e), { commit: s } = await at.readCommit(t, e, o), l = async (p, y) => {
        const { tree: E } = await te.readTree({ fs: t, dir: e, oid: p });
        if (y.length === 0) {
          const R = E.find((T) => T.path === a && T.type === "tree");
          if (!R)
            throw new Error(`Directory ${a} not found`);
          const $ = E.filter((T) => T.path !== a);
          return { newTreeOid: await te.writeTree({ fs: t, dir: e, tree: $ }), removedTreeOid: R.oid };
        } else {
          const R = y[0], $ = E.find((U) => U.path === R && U.type === "tree");
          if (!$)
            throw new Error(`Directory not found: ${R}`);
          const { newTreeOid: I, removedTreeOid: T } = await l($.oid, y.slice(1)), A = E.map((U) => U.path === R && U.type === "tree" ? { ...U, oid: I } : U);
          return { newTreeOid: await te.writeTree({ fs: t, dir: e, tree: A }), removedTreeOid: T };
        }
      }, { newTreeOid: f, removedTreeOid: u } = await l(s.tree, n);
      let m = null;
      return i ? m = await te.commit({
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
      }), me.consoleDotLog(`Staged removal for ${r} with newTreeOid ${f}`)), {
        dirPath: r,
        treeOid: f,
        commitOid: m,
        removedTreeOid: u,
        action: i ? "committed" : "staged"
      };
    } catch (n) {
      throw me.consoleDotLog("Error in removeDirDot:", n), n;
    }
  }
};
const Sd = {
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
}, zo = {
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
}, Ho = {
  root: { uid: 0, gid: 0, groups: ["admin"] },
  admin: { uid: 1e3, gid: 1e3, groups: ["admin"] },
  user: { uid: 1001, gid: 1001, groups: ["users"] }
};
class xd {
  constructor() {
    this.aclStore = /* @__PURE__ */ new Map(), this.loadDefaultACLs();
  }
  loadDefaultACLs() {
    for (const e in zo)
      this.aclStore.set(e, zo[e]);
  }
  getDefaultACL(e) {
    return this.aclStore.has(e) ? this.aclStore.get(e) : JSON.parse(JSON.stringify(Sd));
  }
  getACL(e) {
    return this.aclStore.get(e) || this.getDefaultACL(e);
  }
  setACL(e, r) {
    if (!r.owner || !r.group || !r.others)
      throw new Error("Invalid ACL structure");
    this.aclStore.set(e, r);
  }
  checkPermission(e, r, i) {
    const n = this.getACL(e), a = Ho[r] || Ho.user;
    return a.uid === 0 || r === n.owner ? n.owner[i] : a.groups.some((o) => o === n.group) ? n.group[i] : n.others[i];
  }
}
const Jn = new xd();
let Bi = 1e3;
class Id {
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
    const i = {
      ...this.generateFileStats(e),
      ...r
    };
    return this.fileStats.set(e, i), i;
  }
  setDirStats(e, r) {
    const i = {
      ...this.generateDirStats(e),
      ...r
    };
    return this.dirStats.set(e, i), i;
  }
  generateFileStats(e) {
    return Bi++, {
      inode: Bi,
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
    return Bi++, {
      inode: Bi,
      mode: "040755",
      uid: 1e3,
      gid: 1e3,
      atime: (/* @__PURE__ */ new Date()).toISOString(),
      mtime: (/* @__PURE__ */ new Date()).toISOString(),
      ctime: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  updateTimestamp(e, r, i = "mtime") {
    const n = (/* @__PURE__ */ new Date()).toISOString(), a = r ? this.dirStats : this.fileStats, o = a.get(e) || (r ? this.generateDirStats(e) : this.generateFileStats(e));
    return o[i] = n, a.set(e, o), o;
  }
}
const Wo = new Id(), nc = new Gr(Er.logging.gitNoteManager);
function Qt(...t) {
  nc.consoleDotLog("[gitNoteManager] ", ...t);
}
function Zr(...t) {
  nc.consoleDotError("[gitNoteManager] ", ...t);
}
Qt("Loading gitNoteManager.");
const qo = 1e3, Go = 1e3, Td = "100644", $d = "040755", Rd = 0;
async function kt(t, e, r, i = null, n = {}) {
  try {
    switch (r) {
      case "add":
        return await Ad(t, e, i, n);
      case "read":
        return await Od(t, e, i, n);
      case "remove":
        return await Md(t, e, i, n);
      case "list":
        return await Cd(t, e, i);
      case "findNotesByPath":
        return await Nd(t, e, n);
      default:
        throw new Error(`Unsupported operation: ${r}`);
    }
  } catch (a) {
    throw Zr(`Error in gitNoteManager: ${a.message}`), a;
  }
}
async function Yi(t, e, r, i = !1) {
  try {
    return i ? (await te.readTree({ fs: t, dir: e, filepath: r })).oid : (await te.readBlob({ fs: t, dir: e, filepath: r })).oid;
  } catch (n) {
    throw Zr(`Failed to get OID for ${r}: ${n.message}`), n;
  }
}
function ac() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function Zo() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}
function Dd() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
    const e = Math.random() * 16 | 0;
    return (t === "x" ? e : e & 3 | 8).toString(16);
  });
}
async function Bd(t, e, r, i) {
  const n = ac(), { filepath: a, customMetadata: o = {} } = i, s = {
    created_at: n,
    updated_at: n,
    full_path: a,
    ...o
  };
  switch (r) {
    case "inode": {
      const l = Wo.getFileStats(a) || {}, f = a?.split("/").pop() || a;
      return {
        ...s,
        inode: l.inode || Zo(),
        mode: l.mode || Td,
        name: f,
        uid: l.uid || qo,
        gid: l.gid || Go,
        acl: Jn.getDefaultACL(a),
        atime: l.atime || n,
        mtime: l.mtime || n,
        ctime: l.ctime || n,
        size: l.size || Rd,
        type: "file"
      };
    }
    case "dentry": {
      const l = Wo.getDirStats(a) || {}, f = a?.split("/")?.pop() || a, u = a?.split("/")?.slice(0, -1)?.join("/") || "/";
      let m = 0;
      try {
        const p = i?.customMetadata?.parentOid || await Yi(t, e, u, !0), y = await te.readNote({ fs: t, dir: e, oid: p });
        m = JSON.parse(y).inode || 0;
      } catch {
        Qt(`Could not get parent inode for ${a}, using 0`);
      }
      return {
        ...s,
        dentry_id: l.inode || Zo(),
        name: f,
        parent_inode: m,
        mode: l.mode || $d,
        uid: l.uid || qo,
        gid: l.gid || Go,
        acl: Jn.getDefaultACL(a),
        atime: l.atime || n,
        mtime: l.mtime || n,
        ctime: l.ctime || n,
        type: "directory"
      };
    }
    case "superblock": {
      if (!i.fsType)
        throw new Error("fsType is required for superblock notes");
      return {
        ...s,
        fsType: i?.fsType || null,
        owner: i.owner || "root",
        created_at: n,
        default_acl: Jn.getDefaultACL("/") || null,
        users: ["root"],
        acl_policy: "strict",
        block_size: i.block_size || 4096,
        features: i.features || [],
        uuid: Dd()
      };
    }
    default:
      throw new Error(`Unsupported note type: ${r}`);
  }
}
async function Ad(t, e, r, i) {
  try {
    let { oid: n, filepath: a, customMetadata: o, fsType: s } = i;
    if (r === "superblock" && !i.fsType)
      throw new Error("fsType parameter is required for superblock notes");
    if (!n && !a)
      throw new Error("Either oid or filepath must be provided");
    a && !n && (n = await Yi(t, e, a, r === "dentry"));
    let f = null;
    try {
      const R = await te.readNote({ fs: t, dir: e, oid: n });
      f = JSON.parse(new TextDecoder().decode(R));
    } catch {
    }
    const u = await Bd(t, e, r, {
      filepath: a,
      customMetadata: o,
      fsType: s
    }), m = ac(), p = {
      full_path: a,
      associated_at: m,
      metadata: u
    };
    let y;
    if (f) {
      Qt(`Note already exists for ${n}, adding filepath association`);
      const R = f.paths || {};
      f.full_path && !R[f.full_path] && (R[f.full_path] = {
        full_path: f.full_path,
        associated_at: f.updated_at || m,
        metadata: {
          ...f,
          paths: void 0,
          has_multiple_paths: void 0,
          updated_at: void 0
        }
      }), R[a] = p, y = {
        has_multiple_paths: Object.keys(R).length > 1,
        paths: R
      };
    } else
      y = {
        has_multiple_paths: !1,
        paths: {
          [a]: p
        }
      };
    const E = JSON.stringify(y);
    return await te.addNote({
      fs: t,
      dir: e,
      oid: n,
      note: E,
      force: !0,
      author: {
        name: "gitNoteManager",
        email: "gitnotemanager@system"
      }
    }), Qt(`Successfully added ${r} note to ${n}`), y;
  } catch (n) {
    throw Zr(`Failed to add ${r} note: ${n.message}`), n;
  }
}
async function Od(t, e, r, i) {
  let n;
  try {
    const { oid: a, filepath: o } = i;
    if (n = a, o && !a && (n = await Yi(t, e, o, r === "dentry").catch(() => null)), !n)
      throw new Error("Valid OID or filepath must be provided");
    const s = await te.readNote({
      fs: t,
      dir: e,
      oid: n
    }).catch(() => null);
    if (!s) {
      if (r === "superblock") {
        const u = i?.fsType || "memory";
        return await Fd(t, e, u);
      }
      throw new Error(`Note not found for ${r}`);
    }
    if (o && !s) {
      const u = await te.listNotes({ fs: t, dir: e });
      for (const m of u)
        try {
          const p = await te.readNote({ fs: t, dir: e, oid: m }), y = JSON.parse(new TextDecoder().decode(p));
          if (y.full_path === o)
            return y;
        } catch {
        }
    }
    const l = new TextDecoder().decode(s), f = JSON.parse(l);
    return Qt("result: ", f), f;
  } catch (a) {
    return Zr(`Failed to get ${r} note: ${a.message}`), {
      error: a.message,
      type: r,
      oid: n || null,
      exists: !1
    };
  }
}
async function Cd(t, e) {
  try {
    const r = await te.listNotes({ fs: t, dir: e });
    return Qt("Successfully listed notes"), r;
  } catch (r) {
    throw Zr(`Failed to list notes: ${r.message}`), r;
  }
}
async function Nd(t, e, r) {
  const { path: i } = r;
  Qt("path: ", i);
  const n = await te.listNotes({ fs: t, dir: e });
  Qt("notes: ", n);
  const a = [];
  for (const o of n)
    try {
      const s = await te.readNote({ fs: t, dir: e, oid: o }), l = JSON.parse(new TextDecoder().decode(s));
      l.full_path === i && a.push({ oid: o, metadata: l });
    } catch {
      continue;
    }
  return a;
}
async function Fd(t, e, r) {
  const i = {
    fsType: r,
    owner: "root",
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    block_size: 4096,
    features: []
  }, n = await te.resolveRef({ fs: t, dir: e, ref: "HEAD" });
  return await te.addNote({
    fs: t,
    dir: e,
    oid: n,
    force: !1,
    note: new TextEncoder().encode(JSON.stringify(i)),
    author: { name: "system", email: "system@git" },
    force: !0
  }), i;
}
async function Md(t, e, r, i) {
  try {
    const { oid: n, filepath: a } = i;
    let o = n;
    return a && !n && (o = await Yi(t, e, a)), await te.removeNote({
      fs: t,
      dir: e,
      oid: o
    }), Qt(`Successfully removed ${r} note from ${o}`), !0;
  } catch (n) {
    throw Zr(`Failed to remove ${r} note: ${n.message}`), n;
  }
}
self.onerror = (t) => {
  console.error("Worker initialization error:", t);
};
const Ud = new Wc(self), oc = new Gr(Er.logging.dotGit), Ei = new Ed(), sc = new Js();
function Z(...t) {
  oc.consoleDotLog(...t);
}
function de(...t) {
  oc.consoleDotError(...t);
}
Z("gitWorker loaded.");
let oe = "/", st, dt, Ye = "main", et = "", We = "origin", er = 10, ki = "testUser", Si = "testUser@example.com", cc = {}, ie = null, oa = "/settings", ba = {}, Ct = !0, Wt, qt, St = Er.corsProxy, Gt = !1;
const Ke = {
  async fill() {
    return Z("authenticate", st, dt), { username: st, password: dt };
  },
  async rejected() {
    const t = new Error("Authentication rejected");
    throw Z("Authentication rejected", t), t;
  }
};
async function hr(t) {
  Gt && Ct ? await sc.sendMessageToChannel(t) : Z("This browser doesn't support service worker");
}
self.setAuthParams = async function() {
  await hr({
    operation: "setAuthParams",
    data: { username: st, password: dt }
  });
};
self.setDir = async function() {
  await hr({ operation: "setDir", data: oe });
};
self.setRef = async function() {
  await hr({ operation: "setRef", data: Ye });
};
self.setDepth = async function() {
  await hr({ operation: "setDepth", data: er });
};
self.setRemote = async function() {
  await hr({ operation: "setRemote", data: We });
};
self.passFsArgs = async function() {
  await hr({ operation: "passFsArgs", data: ba });
};
self.setRepoDir = async function() {
  await hr({ operation: "setRepoDir", data: oe });
};
self.setSettingsAddresses = async function() {
  await hr({ operation: "setSettingsAddresses", data: cc });
};
async function Vr(t, e) {
  if (Gt && Ct)
    return await sc.fetchWithServiceWorker(t, e);
  Z("This browser doesn't support service worker");
}
async function Ld(t, e = Ct) {
  Gt = t, Ct = e, Ei.options = { supportsServiceWorker: Gt, useSW: Ct };
}
async function Pd(t) {
  oe = t, await self.setDir();
}
function jd(t) {
  return /^https?:\/\/.+/.test(t);
}
async function Sr(t) {
  if (Z("seturl url ", t), !jd(t))
    throw new Error("Invalid Git URL format.");
  et = t;
}
async function sa(t) {
  Ye = t, await self.setRef();
}
async function lc(t) {
  er = t, await self.setDepth();
}
async function zd(t) {
  St = t;
}
async function Hd(t, e) {
  st = t, dt = e, await self.setAuthParams();
}
async function uc(t) {
  We = t, await self.setRemote();
}
async function Wd() {
  return We;
}
async function qd() {
  try {
    const t = await hc("library");
    Z("libs", t);
    const e = await Sa();
    if (Z("directories", e), t && e)
      for (const [r, i] of Object.entries(t)) {
        if (!e[i])
          throw new Error(`File not found: ${i}`);
        return cc[i] = {
          fileName: r,
          filePath: i
        }, console.log(`File mapped: ${i}`), await self.setSettingsAddresses(), { success: !0 };
      }
    else
      return { success: !1 };
  } catch (t) {
    console.error(`Error in setSettingsAddresses: ${t.message}`);
  }
}
async function Gd(t, e) {
  return Z("entering getFileStoresFromDatabases object"), Ei.getFileStoreNames(t, e);
}
async function Hi({ fsName: t, fsType: e }) {
  try {
    if (Z("Initializing FS with:", { _fsName: t, _fsType: e }), !t || !e)
      throw new Error("fsName and fsType are required");
    if (ba = { fsName: t, fsType: e }, qt = t, Wt = e, Z("Getting FS instance from FSManager"), ie = await Ei.getFS(t, e), !ie)
      throw new Error("Failed to initialize file system");
    return Z("FS initialized successfully:", ie), await self.passFsArgs(), ie;
  } catch (r) {
    throw de("Error initializing file system:", r), r;
  }
}
async function Zd(t) {
  let e = await ri();
  Z("current branch", e), Z("ref", Ye), Z("_ref", t);
  let r = await Ea();
  if (Z("branchesList", r), r.includes(t) || await va({ ref: t }), Ye === t || e === t) {
    Z(`you are already on the branch ${t}`);
    return;
  } else {
    let i = await Mw();
    if (Object.keys(i).length === 0) {
      await Vd({ ref: t, noCheckout: !1, noUpdateHead: !1 }), Ye = t, await dc({ url: et }), Z("done");
      return;
    } else
      return Z("failed"), 0;
  }
}
async function va(t) {
  return await te.branch({
    ...t,
    fs: ie,
    dir: oe
  });
}
async function Vd(t) {
  return await te.checkout({
    ...t,
    fs: ie,
    dir: oe,
    remote: We
  });
}
async function Ea() {
  return await te.listBranches({
    fs: ie,
    dir: oe
  });
}
async function fc() {
  try {
    return await te.listBranches({ fs: ie, dir: oe, remote: We });
  } catch (t) {
    de("Error in listBranches:", t);
  }
}
async function ri() {
  return await te.currentBranch({
    fs: ie,
    dir: oe,
    fullname: !1
  });
}
async function Xd() {
  const t = await ri();
  return await Ac(`branch.${t}.remote`);
}
function Yd(t) {
  const e = {};
  let r = null;
  return t.split(/\r?\n/).forEach((i) => {
    if (i = i.trim(), !(!i || i.startsWith(";") || i.startsWith("#")))
      if (i.startsWith("[") && i.endsWith("]"))
        r = i.slice(1, -1).trim(), e[r] = e[r] || {};
      else {
        const [n, a] = i.split("=").map((o) => o.trim());
        r && (e[r][n] = a);
      }
  }), e;
}
function Kd(t) {
  let e = "";
  return Object.keys(t).forEach((r) => {
    e += `[${r}]
`, Object.entries(t[r]).forEach(([i, n]) => {
      e += `    ${i} = ${n}
`;
    }), e += `
`;
  }), e;
}
async function hc(t = null, e = null) {
  try {
    if (!await ie.promises.lstat(oa).catch(() => null))
      return de("Settings file does not exist yet."), {};
    if ((await ie.promises.readdir(`${oe}`)).includes("settings")) {
      const n = await ie.promises.readFile(oa), a = Yd(n);
      return Z("settingsData,", a), t && e ? a[t] && a[t][e] ? a[t][e] : null : t ? a[t] ? a[t] : null : a;
    } else {
      de("The settings file dosen't exist yet!");
      return;
    }
  } catch (r) {
    if (r.code === "ENOENT") return {};
    throw r;
  }
}
async function Jd(t) {
  const e = Kd(t);
  await Ia({ filePath: oa, fileContents: e });
}
async function Qd(t, e, r) {
  let i = {};
  try {
    i = await hc(), Z(i), i || (i = {}, Z("No past data is available. New file will be created.")), i[t] || (i[t] = {}), i[t][e] = r, Z("settingsData", i), await Jd(i), Z("done");
  } catch {
    Z("No past data is available.");
  }
}
async function ew(t) {
  try {
    return await Ji(t), await xa(t), await ka(t);
  } catch (e) {
    Z("Something bad happened pushing your file: ", e);
  }
}
async function tw(t) {
  try {
    return await Lc(), await xa(t), await ka(t);
  } catch (e) {
    Z("Something bad happened pushing your files: ", e);
  }
}
async function dc(t) {
  t?.attempt;
  let e = t?.ref || Ye;
  const r = 1;
  Z("Doing fetch operation"), !et && await Sr(t?.url);
  try {
    if (Gt && Ct)
      try {
        return await Vr("fetch", t), { success: !0 };
      } catch (i) {
        return Z("Service Worker fetch failed, falling back to Web Worker", i), await te.fetch({
          ...t,
          fs: ie,
          http: Bt,
          dir: oe,
          corsProxy: St,
          ref: e,
          url: et,
          remote: We,
          depth: er,
          tags: !0,
          headers: At(st, dt),
          onProgress: (n) => {
            Z("Fetch progress event:", n);
          },
          onAuth() {
            return Ke.fill();
          },
          onAuthFailure() {
            return Ke.rejected();
          }
        }), { success: !0 };
      }
    else
      return Z("Service Worker not supported, using Web Worker directly"), await te.fetch({
        ...t,
        fs: ie,
        http: Bt,
        dir: oe,
        corsProxy: St,
        ref: e,
        url: et,
        remote: We,
        depth: er,
        tags: !0,
        headers: At(st, dt),
        onProgress: (i) => {
          Z("Fetch progress event:", i);
        },
        onAuth() {
          return Ke.fill();
        },
        onAuthFailure() {
          return Ke.rejected();
        }
      }), await Nc(), { success: !0 };
  } catch (i) {
    return de("some error happend while fetching: ", i), await Xr(i, t, "doFetch", r), { success: !1 };
  }
}
async function wc(t = "/", e = "") {
  let r;
  try {
    r = await ie.promises.readdir(t);
  } catch (i) {
    de(`Failed to read ${t}:`, i);
    return;
  }
  for (const i of r) {
    const n = t.endsWith("/") ? t + i : t + "/" + i;
    let a;
    try {
      a = await ie.promises.stat(n);
    } catch {
      continue;
    }
    a.type === "dir" ? (Z(`${e}📁 ${i}`), await wc(n, e + "  ")) : Z(`${e}📄 ${i}`);
  }
}
async function pc(t) {
  t?.attempt;
  const e = 1;
  !et && await Sr(t?.url);
  try {
    await Ki(t);
    try {
      if (Gt && Ct)
        try {
          const r = await Vr("listServerRefs", { ...t, url: et });
          return Z("listServerRefs result with sw:", r), r;
        } catch (r) {
          Z("Service Worker listServerRefs failed, falling back to Web Worker", r);
          const i = await te.listServerRefs({
            ...t,
            fs: ie,
            url: et,
            http: Bt,
            dir: oe,
            corsProxy: St,
            remote: We,
            headers: At(st, dt),
            onAuth() {
              return Ke.fill();
            },
            onAuthFailure() {
              return Ke.rejected();
            }
          });
          return Z("listServerRefs result:", i), { success: !0, refs: i };
        }
      else {
        Z("Service Worker not supported, using Web Worker directly");
        const r = await te.listServerRefs({
          ...t,
          fs: ie,
          url: et,
          http: Bt,
          dir: oe,
          corsProxy: St,
          remote: We,
          headers: At(st, dt),
          onAuth() {
            return Ke.fill();
          },
          onAuthFailure() {
            return Ke.rejected();
          }
        });
        return Z("listServerRefs result:", r), { success: !0, refs: r };
      }
    } catch (r) {
      throw r;
    }
  } catch (r) {
    return de("some error happened while listing server refs: ", r), await Xr(r, t, "listServerRefs", e), { success: !1, error: r.message };
  }
}
const rw = ({ contents: t, filepath: e }, r = "theirs") => {
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
async function iw(t = "main", e = "origin/main", r = "theirs", {
  onConflict: i = null,
  author: n = { name: ki, email: Si }
} = {}) {
  try {
    const a = i || (({ contents: s, filepath: l }) => rw({ contents: s, filepath: l }, r));
    return await te.merge({
      fs: ie,
      dir: oe,
      ours: t,
      theirs: e,
      mergeDriver: a,
      fastForwardOnly: !1
    });
  } catch (a) {
    if (a.message.includes("MergeConflictError")) {
      const s = (await te.statusMatrix({ fs: ie, dir: oe })).filter((l) => l[2] === 2).map((l) => l[0]);
      if (r === "combine")
        return console.log("Merge conflicts preserved. Resolve these files:"), console.log(s.join(`
`)), {
          status: "conflicted",
          conflictedFiles: s,
          message: "Resolve conflicts and commit",
          commit: async () => {
            for (const l of s)
              await te.add({ fs: ie, dir: oe, filepath: l });
            return te.commit({
              fs: ie,
              dir: oe,
              author: n,
              message: "Merge with conflicts resolved"
            });
          }
        };
      throw await te.mergeReset({ fs: ie, dir: oe }), a;
    }
    throw a;
  }
}
async function nw(t = {}) {
  try {
    Z("Received args in getCommitHistoryFromReplica:", t);
    const e = t?.depth || 10, r = qt;
    Z("Initializing replica FS..."), await Hi({ fsName: `${r}_replica`, fsType: Wt }), Z("Pulling from remote..."), await Mc({ url: et, depth: e }), Z("Getting commit logs...");
    const i = await xc({ depth: e });
    Z("Replica commit logs:", i), Z("Restoring main FS..."), await Hi({ fsName: r, fsType: Wt });
    const n = i.map((a) => a.oid);
    return Z("Returning commits:", n), {
      success: !0,
      commits: n,
      head: n[0] || null
    };
  } catch (e) {
    return de("Error getting commit history from replica:", e), {
      success: !1,
      error: e.message,
      commits: []
    };
  }
}
async function mc(t) {
  Z("getLatestRemoteCommit args:", t);
  const e = t?.url || e, r = await pc({ ...t, url: e });
  Z("getLatestRemoteCommit result:", r);
  const i = t?.ref || Ye || "HEAD";
  if (Z("getLatestRemoteCommit _ref:", i), !r.success)
    return de("Failed to fetch server refs", r.error), { success: !1, error: r.error };
  const n = r.refs;
  let a = n.find((o) => o.ref === `refs/heads/${i}`)?.oid;
  return a || (a = n.find("refs/heads/main")?.oid), a ? (Z("headOid", a), {
    success: !0,
    commit: a
  }) : (de("Could not determine latest remote commit."), { success: !1, error: `No HEAD or ${Ye} main/master ref found` });
}
async function gc(t = et) {
  try {
    const e = await yc(), r = t || r || await Bc() || "", i = await mc({ url: r });
    if (!i.success)
      return de("Failed to get latest remote commit:", i.error), !0;
    const n = i.commit;
    return n === e ? (Z("lastRemoteCommit", n, "localRef", e), !0) : (Z("lastRemoteCommit", n, "localRef", e), !1);
  } catch (e) {
    return Z(
      "Some error happened while checking whether you are in sync or not:",
      e
    ), !1;
  }
}
async function aw() {
  try {
    return (await te.resolveRef({ fs: ie, dir: oe, ref: `/refs/remotes/${We}/${Ye}` }))?.trim();
  } catch (t) {
    Z(
      "some error happend while getting last remote commit: ",
      t
    );
  }
}
async function yc(t) {
  try {
    const e = t || Ye || "HEAD";
    return Z("branch", e), (await te.resolveRef({ fs: ie, dir: oe, ref: `refs/heads/${e}` }))?.trim();
  } catch (e) {
    Z(
      "some error happend while getting last local commit: ",
      e
    );
  }
}
async function _c(t = et, e = We) {
  try {
    return await uc(e), await te.addRemote({
      url: t,
      force: !0,
      fs: ie,
      dir: oe,
      remote: e
    });
  } catch (r) {
    Z("some error happend while adding remote: ", r);
  }
}
async function ow(t = We) {
  try {
    return await te.deleteRemote({
      fs: ie,
      dir: oe,
      remote: t
    });
  } catch (e) {
    Z("some error happend while adding remote: ", e);
  }
}
async function bc() {
  return await te.listRemotes({
    fs: ie,
    dir: oe
  });
}
async function sw(t) {
  try {
    const e = et || t?.url, r = We || t?.remote;
    Z("handleNoRef args: ", t, e, r, et, We), await _c(e, r);
    let i = await fc() || [];
    if (Z(i), i.length == 0)
      return !1;
  } catch (e) {
    throw de("Error handling no ref:", e), e;
  }
}
async function cw() {
  try {
    await te.init({
      fs: ie,
      dir: oe
    });
  } catch (t) {
    Z("something went wrong while initing the repo: ", t);
  }
}
async function lw() {
  try {
    const t = await ie.promises.readdir(oe), e = await bc();
    let r = [];
    return e.forEach((i) => r.push(i.url)), Z("urls:", r, e, t), !(r.length > 0 && !r.includes(et) || t.length === 0 || r.length === 0);
  } catch (t) {
    if (t.code === "ENOENT")
      return Z("Directory does not exist:", oe), !1;
    throw de("Error checking directory existence:", t), t;
  }
}
async function uw(t) {
  try {
    return await te.findMergeBase({
      fs: ie,
      dir: oe,
      oids: t
    });
  } catch (e) {
    de("Error finding merge base:", e);
  }
}
async function vc() {
  try {
    Z("🔄 Handling merge conflict in git-only storage...");
    const e = (await te.statusMatrix({ fs: ie, dir: oe })).filter((r) => r[3] === 3).map((r) => r[0]);
    if (e.length === 0)
      return Z("✅ No conflicted files found in git index"), { success: !0, resolved: !1 };
    Z(`⚠️ Found ${e.length} conflicted files in git:`, e);
    for (const r of e)
      try {
        Z(`🔧 Resolving ${r} in git index...`);
        const i = await te.readBlob({
          fs: ie,
          dir: oe,
          oid: await te.resolveRef({ fs: ie, dir: oe, ref: "HEAD" }),
          filepath: r
        }).catch(() => null), n = await te.readBlob({
          fs: ie,
          dir: oe,
          oid: await te.resolveRef({ fs: ie, dir: oe, ref: `refs/remotes/${We}/${Ye}` }),
          filepath: r
        }).catch(() => null), a = i?.blob || n?.blob || "";
        await te.add({
          fs: ie,
          dir: oe,
          filepath: r,
          // Force add even if file doesn't exist in working directory
          force: !0
        }), Z(`✅ Resolved ${r} in git index`);
      } catch (i) {
        de(`❌ Failed to resolve ${r} in git index:`, i);
      }
    return Z("✅ All conflicts resolved in git index"), { success: !0, resolved: !0, conflictedFiles: e };
  } catch (t) {
    return de("❌ Failed to resolve git-only merge conflicts:", t), { success: !1, error: t.message };
  }
}
async function Xr(t, e, r, i = 1, n = 0) {
  de(`Some error happened while ${r}: `, t);
  const a = t && (t.toString().includes("401") || t.toString().includes("403")), o = t && (t.toString().toLowerCase().includes("network") || t.toString().toLowerCase().includes("fetch")), s = t instanceof te.Errors.MergeConflictError || t.toString().includes("MergeConflictError") || t.toString().includes("CheckoutConflictError") || t.toString().includes("merge conflicts");
  if (t && (t.toString().includes("NotFoundError") || t.toString().toLowerCase().includes("could not find head")), a || o)
    throw Z("Authentication or network error detected. Not deleting the repository."), t;
  if (s) {
    Z("Merge conflict detected. Attempting to resolve...");
    try {
      if ((await vc()).success) {
        Z("Merge conflicts resolved successfully");
        return;
      } else
        throw Z("Merge conflict resolution failed"), t;
    } catch (f) {
      throw de("Error during merge conflict resolution:", f), f;
    }
  }
  const l = e?.attempt || 0;
  if (l < i)
    if (n) {
      const f = await gc();
      !f && await fw({ ...e, attempt: l + 1 }), f && await ca({ ...e, attempt: l + 1 });
    } else
      await ca({ ...e, attempt: l + 1 });
  else
    throw new Error(`${r} wasn't successful: ${t}`);
}
async function fw(t) {
  const e = t?.attempt + 1 || 1;
  Z(`Attempting hard reset for ${qt}. Attempt: ${e}`);
  try {
    return await Ic({ dir: oe, ref: "HEAD~1", branch: Ye }), Z(`Hard reset to HEAD~1 successful for ${qt}`), e;
  } catch (r) {
    throw de(`Error during hard reset for ${qt}: `, r), r;
  }
}
async function ca(t) {
  const e = t?.attempt + 1 || 1, r = t?.reclone || !1, i = t?.fsName || qt, n = t?.fsType || Wt;
  try {
    await Ei.deleteFS(i, n), r && await Ec({ ...t, url: t.url, attempt: e });
    return;
  } catch (a) {
    de(`Error during delete, close, and reclone process for ${qt}: `, a);
  }
}
async function Ec(t) {
  Z("doCloneAndStuff args: ", t);
  let e = !1;
  t?.attempt;
  const r = 1;
  !et && await Sr(t?.url), await lc(er);
  try {
    let i = !0, n = await lw();
    if (Z("dirExists", n), n && !e) {
      Z("Directory already exists. Using existing directory...");
      let a = await ri();
      return await sa(a), { handleNoRefResult: i, message: "exists", success: !0 };
    } else {
      Z("Cloning repository ...");
      const a = await dw(t);
      await Ei.createBackupFS(qt, Wt), Z("createBackupFS created backup"), await Hi({ fsName: qt, fsType: Wt });
      let o = await ri();
      await sa(o), Z(a, o), a?.data && a?.data?.isCacheUsed && await Uc({
        url: t.url
      }), i = await sw(t), await hw();
    }
    return await Ow(Wt, "root"), { handleNoRefResult: i, message: "notExist", success: !0 };
  } catch (i) {
    return await Xr(i, t, "doCloneAndStuff", r), { handleNoRefResult: !1, message: "error", success: !1 };
  }
}
async function la(t) {
  return (await ie.promises.lstat(t)).isDirectory();
}
async function kc(t) {
  try {
    if (!await la(t))
      await Vo(t);
    else {
      const e = await ie.promises.readdir(t);
      for (const r of e) {
        const i = `${t}/${r}`;
        await la(i) ? (await kc(i), await ie.promises.rmdir(i)) : await Vo(i), await ie.promises.rmdir(t);
      }
    }
  } catch (e) {
    if (e.code === "ENOENT") {
      Z(`File ${t} already deleted, skipping...`);
      return;
    }
    de("Error while removing directory contents:", e);
  }
}
async function hw() {
  try {
    let t = await fc(), e = await Ea();
    Z("remoteBranches", t), Z("localBranches", e), e.push("HEAD");
    const r = t.filter((n) => !e.includes(n));
    Z("filteredBranches", r);
    let i = oe === "/" ? "" : oe;
    await Promise.all(
      r.map(async (n) => {
        await va({
          ref: n,
          object: i + `/.git/refs/remotes/${We}/${n}`
        }), await Ia({
          filePath: i + `/.git/refs/heads/${n}`,
          fileContents: await te.readFile({ fs: ie, dir: oe, filePath: i + `/.git/refs/remotes/${We}/${n}` })
        });
      })
    );
  } catch (t) {
    throw de("Error initializing local branches:", t), t;
  }
}
function At(t, e) {
  return !t && !e ? (Z("No username or password provided. Returning empty headers."), {}) : {
    authorization: `Basic ${btoa(`${t}:${e}`)}`
  };
}
async function dw(t) {
  try {
    let e;
    if (Gt && Ct)
      try {
        e = await Vr("clone", t);
      } catch (r) {
        Z("Service Worker clone failed, falling back to Web Worker", r), e = await te.clone({
          ...t,
          fs: ie,
          http: Bt,
          dir: oe,
          remote: We,
          ref: Ye,
          corsProxy: St,
          depth: er,
          noCheckout: !0,
          singleBranch: !1,
          headers: At(st, dt),
          onAuth() {
            return Ke.fill();
          },
          onAuthFailure() {
            return Ke.rejected();
          }
        });
      }
    else
      Z("Service Worker not supported, using Web Worker directly"), e = await te.clone({
        ...t,
        fs: ie,
        http: Bt,
        dir: oe,
        remote: We,
        ref: Ye,
        corsProxy: St,
        depth: er,
        noCheckout: !0,
        singleBranch: !1,
        headers: At(st, dt),
        onAuth() {
          return Ke.fill();
        },
        onAuthFailure() {
          return Ke.rejected();
        }
      });
    return e;
  } catch (e) {
    throw de("Some error happened while cloning:", e), e;
  }
}
async function Sc(t) {
  let e = t.split("/").filter((i) => i.trim() !== ""), r = oe.split("/").filter((i) => i.trim() !== "").join("").length;
  return e = e.join("/"), e = oe === "/" ? e : e.slice(r + 1), e;
}
async function ww(t) {
  try {
    let e = await Sc(t.filePath);
    await te.remove({
      fs: ie,
      dir: oe,
      filepath: e
    }), await kc(t.filePath);
  } catch (e) {
    de("Error while removing the file:", e);
  }
}
async function Vo(t) {
  try {
    await ie.promises.unlink(t);
  } catch (e) {
    de("Error occured while unlinking:", e);
  }
}
async function pw(t, e) {
  try {
    if (t === e)
      return;
    await Oc(e), await ie.promises.rename(t, e);
  } catch (r) {
    de("Error occured while renaming filePath:", r);
  }
}
async function xc(t = {}) {
  try {
    Z("Attempting to retrieve log with the following args:", { ...t, fs: ie, depth: er, dir: oe, ref: Ye });
    const e = await te.log({ ...t, fs: ie, depth: er, dir: oe, ref: Ye });
    return Z("git.log result:", e), e;
  } catch (e) {
    throw de("Error in log:", e), e && typeof e == "object" && Object.keys(e).length > 0 ? (de("Error properties:", Object.keys(e)), de("Full error object:", JSON.stringify(e, null, 2))) : de("An unknown error occurred, and no additional error details are available."), new Error("An unknown error occurred during the log operation");
  }
}
async function ka(t) {
  Z("Starting to push with these args: ", t), t?.attempt;
  let e = t?.ref || Ye;
  const r = 1, i = t?.force || !0;
  !et && await Sr(t?.url);
  try {
    await Ki(t);
    try {
      if (Gt && Ct)
        try {
          return await Vr("push", t), { success: !0 };
        } catch (n) {
          return Z("Service Worker push failed, falling back to Web Worker", n), await te.push({
            ...t,
            fs: ie,
            http: Bt,
            dir: oe,
            corsProxy: St,
            remote: We,
            ref: e,
            force: i,
            headers: At(st, dt),
            onAuth() {
              return Ke.fill();
            },
            onAuthFailure() {
              return Ke.rejected();
            }
          }), { success: !0 };
        }
      else
        return Z("Service Worker not supported, using Web Worker directly"), await te.push({
          ...t,
          fs: ie,
          http: Bt,
          dir: oe,
          corsProxy: St,
          remote: We,
          ref: e,
          force: !0,
          headers: At(st, dt),
          onAuth() {
            return Ke.fill();
          },
          onAuthFailure() {
            return Ke.rejected();
          }
        }), Z("Pushing was successful."), { success: !0 };
    } catch (n) {
      throw n;
    }
  } catch (n) {
    return de("some error happend while pushing: ", n), await Xr(n, t, "push", r), { success: !1 };
  }
}
async function mw(t = "push") {
  try {
    await Rc() && await Dc() || (await Tc({ username: ki }), await $c({ email: Si })), await te.stash({
      fs: ie,
      dir: oe,
      op: t
    });
  } catch (e) {
    de("An error occurred while stashing:", e);
  }
}
async function gw(t) {
  return await te.status({
    fs: ie,
    dir: oe,
    filepath: t?.filePath
  });
}
async function yw(t, e = Ye = "HEAD") {
  ie.writeFile(oe + `/.git/refs/heads/${e}`, t, (r) => {
    if (r) throw r;
    console.log("git reset has successfully done.");
  });
}
async function Ic({ dir: t, ref: e, branch: r }) {
  var i = /^HEAD~([0-9]+)$/, n = e.match(i);
  if (n) {
    var a = +n[1], o = await te.log({ fs: ie, dir: t, depth: a + 1 }), s = o.pop().oid;
    return new Promise((l, f) => {
      ie.writeFile(t + `/.git/refs/heads/${r}`, s, (u) => {
        if (u)
          return f(u);
        ie.unlink(t + "/.git/index", (m) => {
          if (m)
            return f(m);
          te.checkout({ fs: ie, dir: t, ref: r, force: !0 }).then(l);
        });
      });
    });
  }
  return Promise.reject(`Wrong ref ${e}`);
}
async function Tc(t) {
  try {
    const e = t?.name ? t?.name : "sampleUser";
    ki = e, await te.setConfig({
      fs: ie,
      dir: oe,
      path: "user.name",
      value: e
    });
  } catch (e) {
    de("An error occurred while setting user name:", e);
  }
}
async function $c(t) {
  try {
    const e = t?.email ? t?.email : "sampleUser";
    Si = e, await te.setConfig({
      fs: ie,
      dir: oe,
      path: "user.email",
      value: e
    });
  } catch (e) {
    de("An error occurred while setting email:", e);
  }
}
async function Rc() {
  try {
    const t = await te.getConfig({
      fs: ie,
      dir: oe,
      path: "user.email"
    });
    return Z(t), t;
  } catch (t) {
    de("An error occurred while getting email:", t);
  }
}
async function Dc() {
  try {
    const t = await te.getConfig({
      fs: ie,
      dir: oe,
      path: "user.name"
    });
    return Z(t), t;
  } catch (t) {
    de("An error occurred while getting username:", t);
  }
}
async function Bc(t = We) {
  try {
    return await te.getConfig({
      fs: ie,
      dir: oe,
      path: `remote.${t}.url`
    });
  } catch (e) {
    de("An error occurred while getting remote url:", e);
  }
}
async function _w(t = et, e = We) {
  try {
    await te.setConfig({
      fs: ie,
      dir: oe,
      path: `remote.${e}.url`,
      value: t
    });
  } catch (r) {
    de("An error occurred while setting remote url:", r);
  }
}
async function Ac(t) {
  try {
    const e = await te.getConfig({
      fs: ie,
      dir: oe,
      path: t
    });
    return Z(e), e;
  } catch (e) {
    de("An error occurred while getting config:", e);
  }
}
async function bw(t, e, r) {
  try {
    await te.setConfig({
      ...r,
      fs: ie,
      dir: oe,
      path: t,
      value: e
    });
  } catch (i) {
    de("An error occurred while setting config:", i);
  }
}
async function Ki(t) {
  try {
    await Tc(t), await $c(t);
  } catch (e) {
    de("An error occurred while setting configs:", e);
  }
}
async function vw(t = "HEAD") {
  return await te.resolveRef({
    fs: ie,
    dir: oe,
    ref: t
  });
}
async function Ew(t) {
  return await te.readCommit({
    fs: ie,
    dir: oe,
    oid: t
  });
}
async function kw(t) {
  await te.writeCommit({
    fs: ie,
    dir: oe,
    commit: t
  });
}
async function Sw(t, e = "refs/heads/main") {
  await te.writeRef({
    fs: ie,
    dir: oe,
    ref: e,
    value: t
  });
}
async function xw(t = "") {
  await Zt.commitStagedChanges(ie, oe);
}
async function Iw(t, e = "staged") {
  try {
    Z(`[GITWorker] Reading file: ${t}`), Z("Current FS state:", { fs: ie, fsName: qt, fsType: Wt, fsArgs: ba });
    const r = await ie.promises.readdir("/");
    Z("Root directory contents:", r);
    const i = await Zt.readFileDot(ie, oe, t, e);
    return Z(`[GITWorker] Successfully read file: ${t}`), i;
  } catch (r) {
    throw de(`[GITWorker] Failed to read file ${t}:`, r), new Error(`Failed to read file: ${r.message}`);
  }
}
async function Xo(t, e = "staged") {
  try {
    await wc(), Z(`[GITWorker] Reading directory: ${t}`);
    const r = await Zt.readDirDot(ie, oe, t, e);
    return Z(`[GITWorker] Directory contents for ${t}:`, r), Z("ATTACK: ", await Cc()), r;
  } catch (r) {
    throw de(`[GITWorker] Failed to read directory ${t}:`, r), new Error(`Failed to read directory: ${r.message}`);
  }
}
async function Yo(t) {
  try {
    Z(`[GITWorker] Checking if path is directory: ${t}`);
    const e = await Zt.isDirectoryDot(ie, oe, t);
    return Z(`[GITWorker] Path ${t} is directory:`, e), e;
  } catch (e) {
    throw de(`[GITWorker] Failed to check directory status for ${t}:`, e), new Error(`Failed to check directory: ${e.message}`);
  }
}
async function Sa(t = 1) {
  try {
    Z("[GITWorker] Listing all files");
    const e = await Zt.listFilesDot(ie, oe, t);
    return Z("[GITWorker] File list:", e), e;
  } catch (e) {
    throw de("[GITWorker] Failed to list files:", e), new Error(`Failed to list files: ${e.message}`);
  }
}
async function Tw(t, e, r = 1) {
  try {
    Z(`[GITWorker] Writing to file: ${t}`);
    const i = await Zt.writeFileDot(
      ie,
      oe,
      t,
      e,
      ki,
      Si,
      r
    );
    let n = i.blobOid;
    return await kt(ie, oe, "add", "inode", {
      oid: n,
      filepath: t,
      customMetadata: {
        size: e.length,
        operation: "write",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    }).catch((a) => de("Note addition failed:", a)), Z(`[GITWorker] Successfully wrote to file: ${t}`), i;
  } catch (i) {
    throw de(`[GITWorker] Failed to write to file ${t}:`, i), new Error(`Failed to write file: ${i.message}`);
  }
}
async function Oc(t, e = 1) {
  try {
    Z(`[GITWorker] Creating directory: ${t}`);
    const r = await Zt.mkdirDot(ie, oe, t, ki, Si, e);
    let i = r.treeOid;
    return await kt(ie, oe, "add", "dentry", {
      oid: i,
      filepath: t,
      customMetadata: {
        operation: "create",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    }), Z(`[GITWorker] Successfully created directory: ${t}`), r;
  } catch (r) {
    throw de(`[GITWorker] Failed to create directory ${t}:`, r), new Error(`Failed to create directory: ${r.message}`);
  }
}
async function $w(t) {
  const e = t.split("/").filter((i) => i.trim() !== "");
  let r = "";
  for (const i of e) {
    r === "/" ? r += i : r += "/" + i;
    try {
      Z("recur", r), await ie.promises.mkdir(r);
    } catch (n) {
      n.code === "EEXIST" || de(`Error creating directory: ${r}`, n);
    }
  }
}
async function Rw(t, e = 1) {
  try {
    Z(`[GITWorker] Removing file: ${t}`);
    const r = await Zt.removeFileDot(ie, oe, t, e);
    return Z(`[GITWorker] Successfully removed file: ${t}`), r;
  } catch (r) {
    throw de(`[GITWorker] Failed to remove file ${t}:`, r), new Error(`Failed to remove file: ${r.message}`);
  }
}
async function Dw(t, e = 1) {
  try {
    Z(`[GITWorker] Removing directory: ${t}`);
    const r = await Zt.removeDirDot(ie, oe, t, e);
    return Z(`[GITWorker] Successfully removed directory: ${t}`), r;
  } catch (r) {
    throw de(`[GITWorker] Failed to remove directory ${t}:`, r), new Error(`Failed to remove directory: ${r.message}`);
  }
}
async function Bw(t) {
  try {
    if (Z("entering with path : ", t), t === "/")
      return await kt(ie, oe, "read", "superblock", { oid: "HEAD", fsType: Wt }).catch(() => null);
    {
      let e = await Fc(t);
      return Z("kiri : ", e), await Aw(e.oid, "commits");
    }
  } catch (e) {
    throw de(`Failed to get note for ${t}:`, e), e;
  }
}
async function Aw(t, e) {
  try {
    return await kt(ie, oe, "read", e, { oid: t });
  } catch (r) {
    if (r.message?.includes("Note not found"))
      return null;
    throw r;
  }
}
async function Cc(t = !0) {
  try {
    const [e, r] = await Promise.all([
      kt(ie, oe, "list"),
      kt(ie, oe, "read", "superblock", { oid: "HEAD", fsType: Wt }).catch(() => null)
    ]);
    let i = [];
    if (t) {
      e.forEach((a) => {
        i.push(kt(ie, oe, "read", "commits", { oid: a.target }));
      });
      const n = await Promise.all(i);
      return { listOfNotes: e, detailed: n, superblock: r };
    }
  } catch (e) {
    throw de("Failed to list notes:", e), e;
  }
}
async function Ow(t = "memory", e = "root") {
  try {
    Z("[GITWorker] Initializing repository notes");
    let r = await te.resolveRef({ fs: ie, dir: oe, ref: "HEAD" });
    try {
      await kt(ie, oe, "read", "superblock", { oid: "HEAD", fsType: t }), Z("Superblock note already exists");
    } catch {
      await kt(ie, oe, "add", "superblock", {
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
      await kt(ie, oe, "read", "dentry", { oid: r }), Z("Root directory note already exists");
    } catch {
      await kt(ie, oe, "add", "dentry", {
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
    throw de("[GITWorker] Failed to initialize notes:", r), new Error(`Failed to initialize notes: ${r.message}`);
  }
}
async function Nc(t = st) {
  Z("[GITWorker] Starting ensureAllFilesHaveNotes..."), Z(`[GITWorker] Owner: ${t}`);
  let e = [], r = [];
  try {
    Z("[GITWorker] Listing all files in the repository..."), e = await Sa(1), Z(`[GITWorker] Total files/directories found: ${e.length}`);
  } catch (a) {
    return de("[GITWorker] Failed to list files:", a), 0;
  }
  const i = /* @__PURE__ */ new Map();
  Z("[GITWorker] Building file map...");
  for (const a of e)
    i.set(a.path, a), Z(`[GITWorker] Mapped: ${a.path} (type: ${a.type}, oid: ${a.oid})`);
  try {
    const a = await Cc();
    Z("[GITWorker] notes list: ", a), a.listOfNotes.forEach((o) => r.push(o.target)), Z("[GITWorker] notes list: ", r);
  } catch (a) {
    de(a);
  }
  const n = [];
  Z("[GITWorker] Checking for missing notes...");
  for (const a of e) {
    const { path: o, type: s, oid: l } = a, f = s === "tree" ? "dentry" : "inode";
    if (!l) {
      de(`[GITWorker] Skipping ${o}: missing OID.`);
      continue;
    }
    Z(`[GITWorker] Checking for existing ${f} note for ${o}...`);
    try {
      !(a.oid in r) && n.push({ path: o, type: f, oid: l });
    } catch (u) {
      Z(`[GITWorker] Error fetching note for ${o}. Assuming missing.`, u), n.push({ path: o, type: f, oid: l });
    }
  }
  Z(`[GITWorker] Total missing notes: ${n.length}`, n);
  for (const { path: a, type: o, oid: s } of n) {
    Z(`[GITWorker] Adding ${o} note for ${a}...`);
    const l = {
      owner: t,
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      operation: "auto-generated",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (o === "dentry") {
      const f = a.split("/"), u = f.slice(0, -1).join("/") || "/";
      if (f.length === 1)
        try {
          const m = "HEAD";
          l.parentOid = m;
        } catch {
          l.parentOid = "HEAD";
        }
      else {
        const m = i.get(u);
        if (m)
          try {
            const p = m.oid;
            l.parentOid = p || "HEAD";
          } catch {
            l.parentOid = "HEAD";
          }
        else
          l.parentOid = "HEAD";
      }
    }
    try {
      await kt(ie, oe, "add", o, {
        oid: s,
        filepath: a,
        customMetadata: l
      }), Z(`[GITWorker] Successfully added ${o} note for ${a}`);
    } catch (f) {
      de(`[GITWorker] Failed to add ${o} note for ${a}`, f);
    }
  }
  return Z(`[GITWorker] ensureAllFilesHaveNotes completed. Total notes added: ${n.length}`), n.length;
}
async function Cw() {
  try {
    Z("[GITWorker] Checking for local notes");
    const t = await kt(ie, oe, "list");
    return t.length > 0 ? (Z("[GITWorker] Local notes found:", t), !0) : (Z("[GITWorker] No local notes found"), !1);
  } catch (t) {
    throw de("[GITWorker] Failed to check for local notes:", t), new Error(`Failed to check for local notes: ${t.message}`);
  }
}
async function Fc(t) {
  try {
    Z(`[GITWorker] Searching git history for: ${t}`);
    const e = await Zt.findInGitHistory(ie, oe, t);
    return Z(`[GITWorker] Found git history for ${t}:`, e), e;
  } catch (e) {
    throw de(`[GITWorker] Failed to search git history for ${t}:`, e), new Error(`Failed to search git history: ${e.message}`);
  }
}
async function Mc(t) {
  t?.attempt;
  const e = 1;
  !et && await Sr(t?.url);
  try {
    await Ki(t);
    try {
      if (Gt && Ct)
        try {
          return await Vr("pull", t), { success: !0 };
        } catch (r) {
          return Z("Service Worker pull failed, falling back to Web Worker", r), await te.pull({
            ...t,
            fs: ie,
            http: Bt,
            dir: oe,
            corsProxy: St,
            remote: We,
            url: et,
            remoteRef: Ye,
            fastForward: !0,
            fastForwardOnly: !1,
            forced: !0,
            noCheckout: !0,
            // Ensure this is true to prevent file checkout
            singleBranch: !1,
            // Consider adding this to match clone behavior
            headers: At(st, dt),
            onAuth() {
              return Ke.fill();
            },
            onAuthFailure() {
              return Ke.rejected();
            }
          }), { success: !0 };
        }
      else
        return Z("Service Worker not supported, using Web Worker directly"), await te.pull({
          ...t,
          fs: ie,
          http: Bt,
          dir: oe,
          corsProxy: St,
          remote: We,
          remoteRef: Ye,
          fastForward: !0,
          fastForwardOnly: !1,
          forced: !0,
          noCheckout: !0,
          // Ensure this is true to prevent file checkout
          singleBranch: !1,
          // Consider adding this to match clone behavior
          headers: At(st, dt),
          onAuth() {
            return Ke.fill();
          },
          onAuthFailure() {
            return Ke.rejected();
          }
        }), { success: !0 };
    } catch (r) {
      throw r;
    }
  } catch (r) {
    return de("some error happend while pulling: ", r), await Xr(r, t, "pull", e), { success: !1 };
  }
}
async function Uc(t) {
  t?.attempt;
  const e = 1;
  try {
    if (!et && await Sr(t?.url), Gt && Ct)
      try {
        return await Vr("fastForward", t), { success: !0 };
      } catch (r) {
        return Z("Service Worker fastForward failed, falling back to Web Worker", r), await te.fastForward({
          ...t,
          fs: ie,
          http: Bt,
          dir: oe,
          remote: We,
          corsProxy: St,
          ref: Ye,
          remoteref: Ye,
          forced: !0,
          headers: At(st, dt),
          onAuth() {
            return Ke.fill();
          },
          onAuthFailure() {
            return Ke.rejected();
          }
        }), { success: !0 };
      }
    else
      return Z("Service Worker not supported, using Web Worker directly"), await te.fastForward({
        ...t,
        fs: ie,
        http: Bt,
        dir: oe,
        remote: We,
        corsProxy: St,
        ref: Ye,
        remoteref: Ye,
        forced: !0,
        headers: At(st, dt),
        onAuth() {
          return Ke.fill();
        },
        onAuthFailure() {
          return Ke.rejected();
        }
      }), { success: !0 };
  } catch (r) {
    return Z("This error occured while fast-forwarding: ", r), await Xr(r, t, "fastForward", e), { success: !1 };
  }
}
async function Ji(t) {
  try {
    Z("addFile log", t);
    let e = await Sc(t.filePath);
    await te.add({
      fs: ie,
      dir: oe,
      filepath: e
    });
  } catch (e) {
    de("An error occurred while adding the file(s):", e);
  }
}
async function Lc() {
  try {
    const t = await Pc();
    Z("changedFiles", t);
    for (let e in t)
      t[e].includes("deleted") ? await ww({ filePath: e }) : await Ji({ filePath: e });
  } catch (t) {
    de("Error adding all changed files:", t);
  }
}
async function Nw(t) {
  try {
    await Ia(t), await Ji(t);
  } catch (e) {
    de("Error adding file to staging area:", e);
  }
}
async function xa(t) {
  try {
    const e = t?.username || st, r = t?.email || "sample@email.com";
    await te.commit({
      fs: ie,
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
async function Fw(t) {
  try {
    return await ie.promises.readdir(t);
  } catch (e) {
    throw de("Error reading directory:", e), e;
  }
}
async function Ia(t) {
  try {
    await ie.promises.writeFile(t.filePath, t.fileContents, "utf8");
  } catch (e) {
    de("an error happend while writing to file:", e);
  }
}
async function Pc() {
  let i = await te.statusMatrix({ fs: ie, dir: oe });
  return i = i.filter((n) => n[1] !== n[2] || n[1] !== n[3]), await jc(i);
}
async function Mw() {
  let i = await te.statusMatrix({ fs: ie, dir: oe });
  return i = i.filter((n) => n[2] !== n[3] || n[1] !== n[3]), await jc(i);
}
async function jc(t) {
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
      oe !== "/" ? i[oe + "/" + a] = o : i[oe + a] = o;
    }), Z(i), i;
  } catch (i) {
    de("Error getting changed files list:", i);
  }
}
function Uw(t) {
  return {
    message: t.message,
    stack: t.stack,
    name: t.name,
    code: t.code
  };
}
function Jr(t) {
  if (!(t === void 0 || typeof t == "function")) {
    if (t instanceof Error)
      return Uw(t);
    if (Array.isArray(t))
      return t.map(Jr);
    if (t && typeof t == "object") {
      const e = {};
      for (const r in t)
        e[r] = Jr(t[r]);
      return e;
    }
    return t;
  }
}
const Ko = {
  setFs: Hi,
  doCloneAndStuff: Ec,
  doFetch: (t) => dc(t),
  doPushFile: ew,
  doPushAll: tw,
  addFile: ({ filePath: t }) => Ji({ filePath: t }),
  commit: ({ username: t, email: e, commitMessage: r }) => xa({ username: t, email: e, commitMessage: r }),
  push: ({ url: t, remote: e, ref: r, force: i = !0 }) => ka({ url: t, remote: e, ref: r, force: i }),
  pull: ({ url: t, remote: e, ref: r }) => Mc({ url: t, remote: e, ref: r }),
  addDot: Lc,
  merge: ({ ours: t, theirs: e, strategy: r }) => iw(t, e, r),
  addFileToStaging: Nw,
  commitStagedChanges: xw,
  status: gw,
  log: xc,
  listRemotes: bc,
  listBranches: Ea,
  checkoutBranch: ({ ref: t }) => Zd(t),
  currentBranch: ri,
  currentRemote: Xd,
  createBranch: (t) => va(t),
  setRemote: ({ remote: t }) => uc(t),
  setRemoteUrl: ({ url: t, remote: e }) => _w(t, e),
  getRemoteUrl: ({ remote: t }) => Bc(t),
  getRemote: ({ remote: t }) => Wd(),
  getRemoteCommitInLocalRepo: ({ remote: t }) => aw(),
  getChangedFilesList: Pc,
  getCommitHistoryFromReplica: nw,
  getLatestRemoteCommit: ({ url: t, remote: e }) => mc({ url: t, remote: e }),
  getLastLocalCommit: ({ ref: t }) => yc(t),
  handleDeleteCloseAndReclone: ({ args: t }) => ca(t),
  isSync: ({ url: t }) => gc(t),
  hardReset: Ic,
  softReset: ({ commitHash: t, branch: e }) => yw(t, e),
  addRemote: ({ url: t, remote: e }) => _c(t, e),
  deleteRemote: ({ remote: t }) => ow(t),
  findMergeBase: ({ oids: t }) => uw(t),
  findInGitHistory: Fc,
  resolveMergeConflict: vc,
  fastForward: Uc,
  setConfigs: Ki,
  setUrl: ({ url: t }) => Sr(t),
  setCorsProxy: ({ corsProxy: t }) => zd(t),
  setSWUsage: ({ useSW: t }) => Ld(t),
  setDir: ({ dir: t }) => Pd(t),
  setDepth: ({ depth: t }) => lc(t),
  setRef: ({ ref: t }) => sa(t),
  setAuthParams: ({ username: t, password: e }) => Hd(t, e),
  setSettingsAddresses: qd,
  addToSetting: Qd,
  stash: ({ operation: t }) => mw(t),
  readFileDot: ({ filePath: t, commitOid: e = "staged" }) => Iw(t, e),
  writeFileDot: ({ filePath: t, fileContent: e, doCommit: r = 1 }) => Tw(t, e, r),
  readDirDot: ({ path: t, commitOid: e = "staged" }) => Xo(t, e),
  isDirectoryDot: ({ path: t }) => Yo(t),
  listFilesDot: ({ listDirs: t = 1 }) => Sa(t),
  mkdirDot: ({ dirPath: t, doCommit: e = 1 }) => Oc(t, e),
  mkdirRecursive: ({ path: t }) => $w(t),
  removeDirDot: ({ dirPath: t, doCommit: e = 1 }) => Dw(t, e),
  removeFileDot: ({ filePath: t, doCommit: e = 1 }) => Rw(t, e),
  rename: ({ oldPath: t, newPath: e }) => pw(t, e),
  listServerRefs: ({ args: t }) => pc(t),
  getUsername: Dc,
  getEmail: Rc,
  getConfig: ({ path: t }) => Ac(t),
  setConfig: ({ path: t, value: e, args: r }) => bw(t, e, r),
  resolveRef: ({ ref: t }) => vw(t),
  readCommit: ({ head: t }) => Ew(t),
  writeCommit: kw,
  writeRef: Sw,
  init: cw,
  isDirectory: ({ path: t }) => la(t),
  isDirectoryDot: ({ path: t }) => Yo(t),
  readdir: ({ path: t }) => Fw(t),
  readDirDot: ({ path: t }) => Xo(t),
  getFileStoresFromDatabases: Gd,
  checkForLocalNotes: Cw,
  getPathNote: ({ path: t }) => Bw(t),
  ensureAllFilesHaveNotes: ({ owner: t }) => Nc(t)
};
let zc;
const Lw = new Promise((t) => {
  zc = t;
}), Hc = {
  execute: async (t, e = {}) => {
    try {
      const r = Ko[t];
      if (!r) throw new Error(`Unknown operation: ${t}`);
      const i = Jr(e), n = await r(i);
      return Jr(n);
    } catch (r) {
      throw Jr(r);
    }
  },
  // Special case for ready check
  ready: () => Lw,
  // Maintain backward compatibility with direct method calls
  // by proxying them to execute()
  ...Object.fromEntries(
    Object.keys(Ko).map((t) => [
      t,
      async (e) => Hc.execute(t, e)
    ])
  )
};
zc();
Ud.set("workerThread", Hc);
Z("Worker initialized and ready");
//# sourceMappingURL=gitWorker.js.map
