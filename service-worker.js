var Sl = (N, g) => () => (g || N((g = { exports: {} }).exports, g), g.exports);
import { L as Ur, c as zr } from "./configES6-cRERl-FC.js";
var Dh = Sl((xe, ze) => {
  (function(N, g) {
    typeof xe == "object" && typeof ze == "object" ? ze.exports = g() : typeof define == "function" && define.amd ? define([], g) : typeof xe == "object" ? xe.git = g() : N.git = g();
  })(self, function() {
    return function(N) {
      var g = {};
      function t(n) {
        if (g[n]) return g[n].exports;
        var u = g[n] = { i: n, l: !1, exports: {} };
        return N[n].call(u.exports, u, u.exports, t), u.l = !0, u.exports;
      }
      return t.m = N, t.c = g, t.d = function(n, u, O) {
        t.o(n, u) || Object.defineProperty(n, u, { enumerable: !0, get: O });
      }, t.r = function(n) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(n, "__esModule", { value: !0 });
      }, t.t = function(n, u) {
        if (1 & u && (n = t(n)), 8 & u || 4 & u && typeof n == "object" && n && n.__esModule) return n;
        var O = /* @__PURE__ */ Object.create(null);
        if (t.r(O), Object.defineProperty(O, "default", { enumerable: !0, value: n }), 2 & u && typeof n != "string") for (var l in n) t.d(O, l, function(i) {
          return n[i];
        }.bind(null, l));
        return O;
      }, t.n = function(n) {
        var u = n && n.__esModule ? function() {
          return n.default;
        } : function() {
          return n;
        };
        return t.d(u, "a", u), u;
      }, t.o = function(n, u) {
        return Object.prototype.hasOwnProperty.call(n, u);
      }, t.p = "", t(t.s = 167);
    }([function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(24);
      function u(O, l) {
        if (l === void 0) throw new n.a(O);
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return n;
      });
      class n extends Error {
        constructor(O) {
          super(O), this.caller = "";
        }
        toJSON() {
          return { code: this.code, data: this.data, caller: this.caller, message: this.message, stack: this.stack };
        }
        fromJSON(O) {
          const l = new n(O.message);
          return l.code = O.code, l.data = O.data, l.caller = O.caller, l.stack = O.stack, l;
        }
        get isIsomorphicGitError() {
          return !0;
        }
      }
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return h;
        });
        var u = t(91), O = t.n(u), l = t(38), i = t(27), s = t(116), o = t(136);
        function e(S, x, R, c, P, w, I) {
          try {
            var T = S[w](I), M = T.value;
          } catch (A) {
            return void R(A);
          }
          T.done ? x(M) : Promise.resolve(M).then(c, P);
        }
        function j(S) {
          return function() {
            var x = this, R = arguments;
            return new Promise(function(c, P) {
              var w = S.apply(x, R);
              function I(M) {
                e(w, c, P, I, T, "next", M);
              }
              function T(M) {
                e(w, c, P, I, T, "throw", M);
              }
              I(void 0);
            });
          };
        }
        function E(S) {
          return Object(o.a)(((x) => {
            try {
              return x.readFile().catch((R) => R);
            } catch (R) {
              return R;
            }
          })(S));
        }
        const m = ["readFile", "writeFile", "mkdir", "rmdir", "unlink", "stat", "lstat", "readdir", "readlink", "symlink"];
        function _(S, x) {
          if (E(x)) for (const R of m) S[`_${R}`] = x[R].bind(x);
          else for (const R of m) S[`_${R}`] = O()(x[R].bind(x));
          E(x) ? x.rm ? S._rm = x.rm.bind(x) : x.rmdir.length > 1 ? S._rm = x.rmdir.bind(x) : S._rm = s.a.bind(null, S) : x.rm ? S._rm = O()(x.rm.bind(x)) : x.rmdir.length > 2 ? S._rm = O()(x.rmdir.bind(x)) : S._rm = s.a.bind(null, S);
        }
        class h {
          constructor(x) {
            if (x._original_unwrapped_fs !== void 0) return x;
            const R = Object.getOwnPropertyDescriptor(x, "promises");
            R && R.enumerable ? _(this, x.promises) : _(this, x), this._original_unwrapped_fs = x;
          }
          exists(x, R = {}) {
            var c = this;
            return j(function* () {
              try {
                return yield c._stat(x), !0;
              } catch (P) {
                if (P.code === "ENOENT" || P.code === "ENOTDIR" || (P.code || "").includes("ENS")) return !1;
                throw console.log('Unhandled error in "FileSystem.exists()" function', P), P;
              }
            })();
          }
          read(x, R = {}) {
            var c = this;
            return j(function* () {
              try {
                let P = yield c._readFile(x, R);
                if (R.autocrlf === "true") try {
                  P = new TextDecoder("utf8", { fatal: !0 }).decode(P), P = P.replace(/\r\n/g, `
`), P = new TextEncoder().encode(P);
                } catch {
                }
                return typeof P != "string" && (P = n.from(P)), P;
              } catch {
                return null;
              }
            })();
          }
          write(x, R, c = {}) {
            var P = this;
            return j(function* () {
              try {
                return void (yield P._writeFile(x, R, c));
              } catch {
                yield P.mkdir(Object(i.a)(x)), yield P._writeFile(x, R, c);
              }
            })();
          }
          mkdir(x, R = !1) {
            var c = this;
            return j(function* () {
              try {
                return void (yield c._mkdir(x));
              } catch (P) {
                if (P === null || P.code === "EEXIST") return;
                if (R) throw P;
                if (P.code === "ENOENT") {
                  const w = Object(i.a)(x);
                  if (w === "." || w === "/" || w === x) throw P;
                  yield c.mkdir(w), yield c.mkdir(x, !0);
                }
              }
            })();
          }
          rm(x) {
            var R = this;
            return j(function* () {
              try {
                yield R._unlink(x);
              } catch (c) {
                if (c.code !== "ENOENT") throw c;
              }
            })();
          }
          rmdir(x, R) {
            var c = this;
            return j(function* () {
              try {
                R && R.recursive ? yield c._rm(x, R) : yield c._rmdir(x);
              } catch (P) {
                if (P.code !== "ENOENT") throw P;
              }
            })();
          }
          readdir(x) {
            var R = this;
            return j(function* () {
              try {
                const c = yield R._readdir(x);
                return c.sort(l.a), c;
              } catch (c) {
                return c.code === "ENOTDIR" ? null : [];
              }
            })();
          }
          readdirDeep(x) {
            var R = this;
            return j(function* () {
              const c = yield R._readdir(x);
              return (yield Promise.all(c.map(function() {
                var P = j(function* (w) {
                  const I = x + "/" + w;
                  return (yield R._stat(I)).isDirectory() ? R.readdirDeep(I) : I;
                });
                return function(w) {
                  return P.apply(this, arguments);
                };
              }()))).reduce((P, w) => P.concat(w), []);
            })();
          }
          lstat(x) {
            var R = this;
            return j(function* () {
              try {
                return yield R._lstat(x);
              } catch (c) {
                if (c.code === "ENOENT" || (c.code || "").includes("ENS")) return null;
                throw c;
              }
            })();
          }
          readlink(x, R = { encoding: "buffer" }) {
            var c = this;
            return j(function* () {
              try {
                const P = yield c._readlink(x, R);
                return n.isBuffer(P) ? P : n.from(P);
              } catch (P) {
                if (P.code === "ENOENT" || (P.code || "").includes("ENS")) return null;
                throw P;
              }
            })();
          }
          writelink(x, R) {
            var c = this;
            return j(function* () {
              return c._symlink(R.toString("utf8"), x);
            })();
          }
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      var n = t(33), u = t.n(n), O = t(32), l = t(72), i = t(8);
      class s {
        constructor(I) {
          if (this.refs = /* @__PURE__ */ new Map(), this.parsedConfig = [], I) {
            let T = null;
            this.parsedConfig = I.trim().split(`
`).map((M) => {
              if (/^\s*#/.test(M)) return { line: M, comment: !0 };
              const A = M.indexOf(" ");
              if (M.startsWith("^")) {
                const F = M.slice(1);
                return this.refs.set(T + "^{}", F), { line: M, ref: T, peeled: F };
              }
              {
                const F = M.slice(0, A);
                return T = M.slice(A + 1), this.refs.set(T, F), { line: M, ref: T, oid: F };
              }
            });
          }
          return this;
        }
        static from(I) {
          return new s(I);
        }
        delete(I) {
          this.parsedConfig = this.parsedConfig.filter((T) => T.ref !== I), this.refs.delete(I);
        }
        toString() {
          return this.parsedConfig.map(({ line: I }) => I).join(`
`) + `
`;
        }
      }
      var o = t(109);
      function e(w, I) {
        const T = w.replace(/\^\{\}$/, ""), M = I.replace(/\^\{\}$/, ""), A = -(T < M) || +(T > M);
        return A === 0 ? w.endsWith("^{}") ? 1 : -1 : A;
      }
      var j = t(16), E = t(11);
      function m(w, I, T, M, A, F, z) {
        try {
          var $ = w[F](z), H = $.value;
        } catch (nt) {
          return void T(nt);
        }
        $.done ? I(H) : Promise.resolve(H).then(M, A);
      }
      function _(w) {
        return function() {
          var I = this, T = arguments;
          return new Promise(function(M, A) {
            var F = w.apply(I, T);
            function z(H) {
              m(F, M, A, z, $, "next", H);
            }
            function $(H) {
              m(F, M, A, z, $, "throw", H);
            }
            z(void 0);
          });
        };
      }
      t.d(g, "a", function() {
        return P;
      });
      const h = (w) => [`${w}`, `refs/${w}`, `refs/tags/${w}`, `refs/heads/${w}`, `refs/remotes/${w}`, `refs/remotes/${w}/HEAD`], S = ["config", "description", "index", "shallow", "commondir"];
      let x;
      function R(w, I) {
        return c.apply(this, arguments);
      }
      function c() {
        return (c = _(function* (w, I) {
          return x === void 0 && (x = new u.a()), x.acquire(w, I);
        })).apply(this, arguments);
      }
      class P {
        static updateRemoteRefs({ fs: I, gitdir: T, remote: M, refs: A, symrefs: F, tags: z, refspecs: $, prune: H = !1, pruneTags: nt = !1 }) {
          return _(function* () {
            for (const Z of A.values()) if (!Z.match(/[0-9a-f]{40}/)) throw new O.a(Z);
            const ot = yield E.a.get({ fs: I, gitdir: T });
            if (!$) {
              if (($ = yield ot.getall(`remote.${M}.fetch`)).length === 0) throw new l.a(M);
              $.unshift(`+HEAD:refs/remotes/${M}/HEAD`);
            }
            const V = o.a.from($), it = /* @__PURE__ */ new Map();
            if (nt) {
              const Z = yield P.listRefs({ fs: I, gitdir: T, filepath: "refs/tags" });
              yield P.deleteRefs({ fs: I, gitdir: T, refs: Z.map((ut) => `refs/tags/${ut}`) });
            }
            if (z) {
              for (const Z of A.keys()) if (Z.startsWith("refs/tags") && !Z.endsWith("^{}") && !(yield P.exists({ fs: I, gitdir: T, ref: Z }))) {
                const ut = A.get(Z);
                it.set(Z, ut);
              }
            }
            const lt = V.translate([...A.keys()]);
            for (const [Z, ut] of lt) {
              const pt = A.get(Z);
              it.set(ut, pt);
            }
            const dt = V.translate([...F.keys()]);
            for (const [Z, ut] of dt) {
              const pt = F.get(Z), st = V.translateOne(pt);
              st && it.set(ut, `ref: ${st}`);
            }
            const G = [];
            if (H) {
              for (const Z of V.localNamespaces()) {
                const ut = (yield P.listRefs({ fs: I, gitdir: T, filepath: Z })).map((pt) => `${Z}/${pt}`);
                for (const pt of ut) it.has(pt) || G.push(pt);
              }
              G.length > 0 && (yield P.deleteRefs({ fs: I, gitdir: T, refs: G }));
            }
            for (const [Z, ut] of it) yield R(Z, _(function* () {
              return I.write(Object(j.join)(T, Z), `${ut.trim()}
`, "utf8");
            }));
            return { pruned: G };
          })();
        }
        static writeRef({ fs: I, gitdir: T, ref: M, value: A }) {
          return _(function* () {
            if (!A.match(/[0-9a-f]{40}/)) throw new O.a(A);
            yield R(M, _(function* () {
              return I.write(Object(j.join)(T, M), `${A.trim()}
`, "utf8");
            }));
          })();
        }
        static writeSymbolicRef({ fs: I, gitdir: T, ref: M, value: A }) {
          return _(function* () {
            yield R(M, _(function* () {
              return I.write(Object(j.join)(T, M), `ref: ${A.trim()}
`, "utf8");
            }));
          })();
        }
        static deleteRef({ fs: I, gitdir: T, ref: M }) {
          return _(function* () {
            return P.deleteRefs({ fs: I, gitdir: T, refs: [M] });
          })();
        }
        static deleteRefs({ fs: I, gitdir: T, refs: M }) {
          return _(function* () {
            yield Promise.all(M.map(($) => I.rm(Object(j.join)(T, $))));
            let A = yield R("packed-refs", _(function* () {
              return I.read(`${T}/packed-refs`, { encoding: "utf8" });
            }));
            const F = s.from(A), z = F.refs.size;
            for (const $ of M) F.refs.has($) && F.delete($);
            F.refs.size < z && (A = F.toString(), yield R("packed-refs", _(function* () {
              return I.write(`${T}/packed-refs`, A, { encoding: "utf8" });
            })));
          })();
        }
        static resolve({ fs: I, gitdir: T, ref: M, depth: A }) {
          return _(function* () {
            if (A !== void 0 && --A === -1) return M;
            if (M.startsWith("ref: ")) return M = M.slice(5), P.resolve({ fs: I, gitdir: T, ref: M, depth: A });
            if (M.length === 40 && /[0-9a-f]{40}/.test(M)) return M;
            const F = yield P.packedRefs({ fs: I, gitdir: T }), z = h(M).filter(($) => !S.includes($));
            for (const $ of z) {
              const H = yield R($, _(function* () {
                return (yield I.read(`${T}/${$}`, { encoding: "utf8" })) || F.get($);
              }));
              if (H) return P.resolve({ fs: I, gitdir: T, ref: H.trim(), depth: A });
            }
            throw new i.a(M);
          })();
        }
        static exists({ fs: I, gitdir: T, ref: M }) {
          return _(function* () {
            try {
              return yield P.expand({ fs: I, gitdir: T, ref: M }), !0;
            } catch {
              return !1;
            }
          })();
        }
        static expand({ fs: I, gitdir: T, ref: M }) {
          return _(function* () {
            if (M.length === 40 && /[0-9a-f]{40}/.test(M)) return M;
            const A = yield P.packedRefs({ fs: I, gitdir: T }), F = h(M);
            for (const z of F)
              if ((yield R(z, _(function* () {
                return I.exists(`${T}/${z}`);
              }))) || A.has(z)) return z;
            throw new i.a(M);
          })();
        }
        static expandAgainstMap({ ref: I, map: T }) {
          return _(function* () {
            const M = h(I);
            for (const A of M) if (yield T.has(A)) return A;
            throw new i.a(I);
          })();
        }
        static resolveAgainstMap({ ref: I, fullref: T = I, depth: M, map: A }) {
          if (M !== void 0 && --M === -1) return { fullref: T, oid: I };
          if (I.startsWith("ref: ")) return I = I.slice(5), P.resolveAgainstMap({ ref: I, fullref: T, depth: M, map: A });
          if (I.length === 40 && /[0-9a-f]{40}/.test(I)) return { fullref: T, oid: I };
          const F = h(I);
          for (const z of F) {
            const $ = A.get(z);
            if ($) return P.resolveAgainstMap({ ref: $.trim(), fullref: z, depth: M, map: A });
          }
          throw new i.a(I);
        }
        static packedRefs({ fs: I, gitdir: T }) {
          return _(function* () {
            const M = yield R("packed-refs", _(function* () {
              return I.read(`${T}/packed-refs`, { encoding: "utf8" });
            }));
            return s.from(M).refs;
          })();
        }
        static listRefs({ fs: I, gitdir: T, filepath: M }) {
          return _(function* () {
            const A = P.packedRefs({ fs: I, gitdir: T });
            let F = null;
            try {
              F = yield I.readdirDeep(`${T}/${M}`), F = F.map((z) => z.replace(`${T}/${M}/`, ""));
            } catch {
              F = [];
            }
            for (let z of (yield A).keys()) z.startsWith(M) && (z = z.replace(M + "/", ""), F.includes(z) || F.push(z));
            return F.sort(e), F;
          })();
        }
        static listBranches({ fs: I, gitdir: T, remote: M }) {
          return _(function* () {
            return M ? P.listRefs({ fs: I, gitdir: T, filepath: `refs/remotes/${M}` }) : P.listRefs({ fs: I, gitdir: T, filepath: "refs/heads" });
          })();
        }
        static listTags({ fs: I, gitdir: T }) {
          return _(function* () {
            return (yield P.listRefs({ fs: I, gitdir: T, filepath: "refs/tags" })).filter((M) => !M.endsWith("^{}"));
          })();
        }
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l) {
          super(`An internal error caused this command to fail. Please file a bug report at https://github.com/isomorphic-git/isomorphic-git/issues with this error message: ${l}`), this.code = this.name = u.code, this.data = { message: l };
        }
      }
      u.code = "InternalError";
    }, , , function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return m;
        });
        var u = t(4), O = t(8), l = t(25), i = t(113), s = t(110), o = t(83), e = t(19);
        function j(h, S, x, R, c, P, w) {
          try {
            var I = h[P](w), T = I.value;
          } catch (M) {
            return void x(M);
          }
          I.done ? S(T) : Promise.resolve(T).then(R, c);
        }
        function E(h) {
          return function() {
            var S = this, x = arguments;
            return new Promise(function(R, c) {
              var P = h.apply(S, x);
              function w(T) {
                j(P, R, c, w, I, "next", T);
              }
              function I(T) {
                j(P, R, c, w, I, "throw", T);
              }
              w(void 0);
            });
          };
        }
        function m(h) {
          return _.apply(this, arguments);
        }
        function _() {
          return (_ = E(function* ({ fs: h, cache: S, gitdir: x, oid: R, format: c = "content" }) {
            const P = (A) => m({ fs: h, cache: S, gitdir: x, oid: A });
            let w;
            if (R === "4b825dc642cb6eb9a060e54bf8d69288fbee4904" && (w = { format: "wrapped", object: n.from("tree 0\0") }), w || (w = yield Object(i.a)({ fs: h, gitdir: x, oid: R })), !w) {
              if (w = yield Object(s.a)({ fs: h, cache: S, gitdir: x, oid: R, getExternalRefDelta: P }), !w) throw new O.a(R);
              return w;
            }
            if (c === "deflated" || (w.format === "deflated" && (w.object = n.from(yield Object(o.a)(w.object)), w.format = "wrapped"), c === "wrapped")) return w;
            const I = yield Object(e.a)(w.object);
            if (I !== R) throw new u.a(`SHA check failed! Expected ${R}, computed ${I}`);
            const { object: T, type: M } = l.a.unwrap(w.object);
            if (w.type = M, w.object = T, w.format = "content", c === "content") return w;
            throw new u.a(`invalid requested format "${c}"`);
          })).apply(this, arguments);
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l) {
          super(`Could not find ${l}.`), this.code = this.name = u.code, this.data = { what: l };
        }
      }
      u.code = "NotFoundError";
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return i;
        });
        var u = t(82), O = t(50);
        function l(s, o, e, j, E, m, _) {
          try {
            var h = s[m](_), S = h.value;
          } catch (x) {
            return void e(x);
          }
          h.done ? o(S) : Promise.resolve(S).then(j, E);
        }
        class i {
          static flush() {
            return n.from("0000", "utf8");
          }
          static delim() {
            return n.from("0001", "utf8");
          }
          static encode(o) {
            typeof o == "string" && (o = n.from(o));
            const e = o.length + 4, j = Object(O.a)(4, e);
            return n.concat([n.from(j, "utf8"), o]);
          }
          static streamReader(o) {
            const e = new u.a(o);
            return function() {
              var j, E = (j = function* () {
                try {
                  let m = yield e.read(4);
                  if (m == null) return !0;
                  if (m = parseInt(m.toString("utf8"), 16), m === 0 || m === 1) return null;
                  const _ = yield e.read(m - 4);
                  return _ == null || _;
                } catch (m) {
                  return o.error = m, !0;
                }
              }, function() {
                var m = this, _ = arguments;
                return new Promise(function(h, S) {
                  var x = j.apply(m, _);
                  function R(P) {
                    l(x, h, S, R, c, "next", P);
                  }
                  function c(P) {
                    l(x, h, S, R, c, "throw", P);
                  }
                  R(void 0);
                });
              });
              return function() {
                return E.apply(this, arguments);
              };
            }();
          }
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      (function(n) {
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <http://feross.org>
         * @license  MIT
         */
        var u = t(145), O = t(146), l = t(147);
        function i() {
          return o.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function s(C, U) {
          if (i() < U) throw new RangeError("Invalid typed array length");
          return o.TYPED_ARRAY_SUPPORT ? (C = new Uint8Array(U)).__proto__ = o.prototype : (C === null && (C = new o(U)), C.length = U), C;
        }
        function o(C, U, L) {
          if (!(o.TYPED_ARRAY_SUPPORT || this instanceof o)) return new o(C, U, L);
          if (typeof C == "number") {
            if (typeof U == "string") throw new Error("If encoding is specified then the first argument must be a string");
            return E(this, C);
          }
          return e(this, C, U, L);
        }
        function e(C, U, L, K) {
          if (typeof U == "number") throw new TypeError('"value" argument must not be a number');
          return typeof ArrayBuffer < "u" && U instanceof ArrayBuffer ? function(X, rt, yt, jt) {
            if (rt.byteLength, yt < 0 || rt.byteLength < yt) throw new RangeError("'offset' is out of bounds");
            if (rt.byteLength < yt + (jt || 0)) throw new RangeError("'length' is out of bounds");
            return rt = yt === void 0 && jt === void 0 ? new Uint8Array(rt) : jt === void 0 ? new Uint8Array(rt, yt) : new Uint8Array(rt, yt, jt), o.TYPED_ARRAY_SUPPORT ? (X = rt).__proto__ = o.prototype : X = m(X, rt), X;
          }(C, U, L, K) : typeof U == "string" ? function(X, rt, yt) {
            if (typeof yt == "string" && yt !== "" || (yt = "utf8"), !o.isEncoding(yt)) throw new TypeError('"encoding" must be a valid string encoding');
            var jt = 0 | h(rt, yt), Rt = (X = s(X, jt)).write(rt, yt);
            return Rt !== jt && (X = X.slice(0, Rt)), X;
          }(C, U, L) : function(X, rt) {
            if (o.isBuffer(rt)) {
              var yt = 0 | _(rt.length);
              return (X = s(X, yt)).length === 0 || rt.copy(X, 0, 0, yt), X;
            }
            if (rt) {
              if (typeof ArrayBuffer < "u" && rt.buffer instanceof ArrayBuffer || "length" in rt) return typeof rt.length != "number" || (jt = rt.length) != jt ? s(X, 0) : m(X, rt);
              if (rt.type === "Buffer" && l(rt.data)) return m(X, rt.data);
            }
            var jt;
            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
          }(C, U);
        }
        function j(C) {
          if (typeof C != "number") throw new TypeError('"size" argument must be a number');
          if (C < 0) throw new RangeError('"size" argument must not be negative');
        }
        function E(C, U) {
          if (j(U), C = s(C, U < 0 ? 0 : 0 | _(U)), !o.TYPED_ARRAY_SUPPORT) for (var L = 0; L < U; ++L) C[L] = 0;
          return C;
        }
        function m(C, U) {
          var L = U.length < 0 ? 0 : 0 | _(U.length);
          C = s(C, L);
          for (var K = 0; K < L; K += 1) C[K] = 255 & U[K];
          return C;
        }
        function _(C) {
          if (C >= i()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i().toString(16) + " bytes");
          return 0 | C;
        }
        function h(C, U) {
          if (o.isBuffer(C)) return C.length;
          if (typeof ArrayBuffer < "u" && typeof ArrayBuffer.isView == "function" && (ArrayBuffer.isView(C) || C instanceof ArrayBuffer)) return C.byteLength;
          typeof C != "string" && (C = "" + C);
          var L = C.length;
          if (L === 0) return 0;
          for (var K = !1; ; ) switch (U) {
            case "ascii":
            case "latin1":
            case "binary":
              return L;
            case "utf8":
            case "utf-8":
            case void 0:
              return mt(C).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * L;
            case "hex":
              return L >>> 1;
            case "base64":
              return bt(C).length;
            default:
              if (K) return mt(C).length;
              U = ("" + U).toLowerCase(), K = !0;
          }
        }
        function S(C, U, L) {
          var K = !1;
          if ((U === void 0 || U < 0) && (U = 0), U > this.length || ((L === void 0 || L > this.length) && (L = this.length), L <= 0) || (L >>>= 0) <= (U >>>= 0)) return "";
          for (C || (C = "utf8"); ; ) switch (C) {
            case "hex":
              return nt(this, U, L);
            case "utf8":
            case "utf-8":
              return z(this, U, L);
            case "ascii":
              return $(this, U, L);
            case "latin1":
            case "binary":
              return H(this, U, L);
            case "base64":
              return F(this, U, L);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ot(this, U, L);
            default:
              if (K) throw new TypeError("Unknown encoding: " + C);
              C = (C + "").toLowerCase(), K = !0;
          }
        }
        function x(C, U, L) {
          var K = C[U];
          C[U] = C[L], C[L] = K;
        }
        function R(C, U, L, K, X) {
          if (C.length === 0) return -1;
          if (typeof L == "string" ? (K = L, L = 0) : L > 2147483647 ? L = 2147483647 : L < -2147483648 && (L = -2147483648), L = +L, isNaN(L) && (L = X ? 0 : C.length - 1), L < 0 && (L = C.length + L), L >= C.length) {
            if (X) return -1;
            L = C.length - 1;
          } else if (L < 0) {
            if (!X) return -1;
            L = 0;
          }
          if (typeof U == "string" && (U = o.from(U, K)), o.isBuffer(U)) return U.length === 0 ? -1 : c(C, U, L, K, X);
          if (typeof U == "number") return U &= 255, o.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf == "function" ? X ? Uint8Array.prototype.indexOf.call(C, U, L) : Uint8Array.prototype.lastIndexOf.call(C, U, L) : c(C, [U], L, K, X);
          throw new TypeError("val must be string, number or Buffer");
        }
        function c(C, U, L, K, X) {
          var rt, yt = 1, jt = C.length, Rt = U.length;
          if (K !== void 0 && ((K = String(K).toLowerCase()) === "ucs2" || K === "ucs-2" || K === "utf16le" || K === "utf-16le")) {
            if (C.length < 2 || U.length < 2) return -1;
            yt = 2, jt /= 2, Rt /= 2, L /= 2;
          }
          function Tt(re, vt) {
            return yt === 1 ? re[vt] : re.readUInt16BE(vt * yt);
          }
          if (X) {
            var Et = -1;
            for (rt = L; rt < jt; rt++) if (Tt(C, rt) === Tt(U, Et === -1 ? 0 : rt - Et)) {
              if (Et === -1 && (Et = rt), rt - Et + 1 === Rt) return Et * yt;
            } else Et !== -1 && (rt -= rt - Et), Et = -1;
          } else for (L + Rt > jt && (L = jt - Rt), rt = L; rt >= 0; rt--) {
            for (var Wt = !0, Vt = 0; Vt < Rt; Vt++) if (Tt(C, rt + Vt) !== Tt(U, Vt)) {
              Wt = !1;
              break;
            }
            if (Wt) return rt;
          }
          return -1;
        }
        function P(C, U, L, K) {
          L = Number(L) || 0;
          var X = C.length - L;
          K ? (K = Number(K)) > X && (K = X) : K = X;
          var rt = U.length;
          if (rt % 2 != 0) throw new TypeError("Invalid hex string");
          K > rt / 2 && (K = rt / 2);
          for (var yt = 0; yt < K; ++yt) {
            var jt = parseInt(U.substr(2 * yt, 2), 16);
            if (isNaN(jt)) return yt;
            C[L + yt] = jt;
          }
          return yt;
        }
        function w(C, U, L, K) {
          return wt(mt(U, C.length - L), C, L, K);
        }
        function I(C, U, L, K) {
          return wt(function(X) {
            for (var rt = [], yt = 0; yt < X.length; ++yt) rt.push(255 & X.charCodeAt(yt));
            return rt;
          }(U), C, L, K);
        }
        function T(C, U, L, K) {
          return I(C, U, L, K);
        }
        function M(C, U, L, K) {
          return wt(bt(U), C, L, K);
        }
        function A(C, U, L, K) {
          return wt(function(X, rt) {
            for (var yt, jt, Rt, Tt = [], Et = 0; Et < X.length && !((rt -= 2) < 0); ++Et) yt = X.charCodeAt(Et), jt = yt >> 8, Rt = yt % 256, Tt.push(Rt), Tt.push(jt);
            return Tt;
          }(U, C.length - L), C, L, K);
        }
        function F(C, U, L) {
          return U === 0 && L === C.length ? u.fromByteArray(C) : u.fromByteArray(C.slice(U, L));
        }
        function z(C, U, L) {
          L = Math.min(C.length, L);
          for (var K = [], X = U; X < L; ) {
            var rt, yt, jt, Rt, Tt = C[X], Et = null, Wt = Tt > 239 ? 4 : Tt > 223 ? 3 : Tt > 191 ? 2 : 1;
            if (X + Wt <= L) switch (Wt) {
              case 1:
                Tt < 128 && (Et = Tt);
                break;
              case 2:
                (192 & (rt = C[X + 1])) == 128 && (Rt = (31 & Tt) << 6 | 63 & rt) > 127 && (Et = Rt);
                break;
              case 3:
                rt = C[X + 1], yt = C[X + 2], (192 & rt) == 128 && (192 & yt) == 128 && (Rt = (15 & Tt) << 12 | (63 & rt) << 6 | 63 & yt) > 2047 && (Rt < 55296 || Rt > 57343) && (Et = Rt);
                break;
              case 4:
                rt = C[X + 1], yt = C[X + 2], jt = C[X + 3], (192 & rt) == 128 && (192 & yt) == 128 && (192 & jt) == 128 && (Rt = (15 & Tt) << 18 | (63 & rt) << 12 | (63 & yt) << 6 | 63 & jt) > 65535 && Rt < 1114112 && (Et = Rt);
            }
            Et === null ? (Et = 65533, Wt = 1) : Et > 65535 && (Et -= 65536, K.push(Et >>> 10 & 1023 | 55296), Et = 56320 | 1023 & Et), K.push(Et), X += Wt;
          }
          return function(Vt) {
            var re = Vt.length;
            if (re <= 4096) return String.fromCharCode.apply(String, Vt);
            for (var vt = "", Zt = 0; Zt < re; ) vt += String.fromCharCode.apply(String, Vt.slice(Zt, Zt += 4096));
            return vt;
          }(K);
        }
        g.Buffer = o, g.SlowBuffer = function(C) {
          return +C != C && (C = 0), o.alloc(+C);
        }, g.INSPECT_MAX_BYTES = 50, o.TYPED_ARRAY_SUPPORT = n.TYPED_ARRAY_SUPPORT !== void 0 ? n.TYPED_ARRAY_SUPPORT : function() {
          try {
            var C = new Uint8Array(1);
            return C.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
              return 42;
            } }, C.foo() === 42 && typeof C.subarray == "function" && C.subarray(1, 1).byteLength === 0;
          } catch {
            return !1;
          }
        }(), g.kMaxLength = i(), o.poolSize = 8192, o._augment = function(C) {
          return C.__proto__ = o.prototype, C;
        }, o.from = function(C, U, L) {
          return e(null, C, U, L);
        }, o.TYPED_ARRAY_SUPPORT && (o.prototype.__proto__ = Uint8Array.prototype, o.__proto__ = Uint8Array, typeof Symbol < "u" && Symbol.species && o[Symbol.species] === o && Object.defineProperty(o, Symbol.species, { value: null, configurable: !0 })), o.alloc = function(C, U, L) {
          return function(K, X, rt, yt) {
            return j(X), X <= 0 ? s(K, X) : rt !== void 0 ? typeof yt == "string" ? s(K, X).fill(rt, yt) : s(K, X).fill(rt) : s(K, X);
          }(null, C, U, L);
        }, o.allocUnsafe = function(C) {
          return E(null, C);
        }, o.allocUnsafeSlow = function(C) {
          return E(null, C);
        }, o.isBuffer = function(C) {
          return !(C == null || !C._isBuffer);
        }, o.compare = function(C, U) {
          if (!o.isBuffer(C) || !o.isBuffer(U)) throw new TypeError("Arguments must be Buffers");
          if (C === U) return 0;
          for (var L = C.length, K = U.length, X = 0, rt = Math.min(L, K); X < rt; ++X) if (C[X] !== U[X]) {
            L = C[X], K = U[X];
            break;
          }
          return L < K ? -1 : K < L ? 1 : 0;
        }, o.isEncoding = function(C) {
          switch (String(C).toLowerCase()) {
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
        }, o.concat = function(C, U) {
          if (!l(C)) throw new TypeError('"list" argument must be an Array of Buffers');
          if (C.length === 0) return o.alloc(0);
          var L;
          if (U === void 0) for (U = 0, L = 0; L < C.length; ++L) U += C[L].length;
          var K = o.allocUnsafe(U), X = 0;
          for (L = 0; L < C.length; ++L) {
            var rt = C[L];
            if (!o.isBuffer(rt)) throw new TypeError('"list" argument must be an Array of Buffers');
            rt.copy(K, X), X += rt.length;
          }
          return K;
        }, o.byteLength = h, o.prototype._isBuffer = !0, o.prototype.swap16 = function() {
          var C = this.length;
          if (C % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var U = 0; U < C; U += 2) x(this, U, U + 1);
          return this;
        }, o.prototype.swap32 = function() {
          var C = this.length;
          if (C % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var U = 0; U < C; U += 4) x(this, U, U + 3), x(this, U + 1, U + 2);
          return this;
        }, o.prototype.swap64 = function() {
          var C = this.length;
          if (C % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var U = 0; U < C; U += 8) x(this, U, U + 7), x(this, U + 1, U + 6), x(this, U + 2, U + 5), x(this, U + 3, U + 4);
          return this;
        }, o.prototype.toString = function() {
          var C = 0 | this.length;
          return C === 0 ? "" : arguments.length === 0 ? z(this, 0, C) : S.apply(this, arguments);
        }, o.prototype.equals = function(C) {
          if (!o.isBuffer(C)) throw new TypeError("Argument must be a Buffer");
          return this === C || o.compare(this, C) === 0;
        }, o.prototype.inspect = function() {
          var C = "", U = g.INSPECT_MAX_BYTES;
          return this.length > 0 && (C = this.toString("hex", 0, U).match(/.{2}/g).join(" "), this.length > U && (C += " ... ")), "<Buffer " + C + ">";
        }, o.prototype.compare = function(C, U, L, K, X) {
          if (!o.isBuffer(C)) throw new TypeError("Argument must be a Buffer");
          if (U === void 0 && (U = 0), L === void 0 && (L = C ? C.length : 0), K === void 0 && (K = 0), X === void 0 && (X = this.length), U < 0 || L > C.length || K < 0 || X > this.length) throw new RangeError("out of range index");
          if (K >= X && U >= L) return 0;
          if (K >= X) return -1;
          if (U >= L) return 1;
          if (this === C) return 0;
          for (var rt = (X >>>= 0) - (K >>>= 0), yt = (L >>>= 0) - (U >>>= 0), jt = Math.min(rt, yt), Rt = this.slice(K, X), Tt = C.slice(U, L), Et = 0; Et < jt; ++Et) if (Rt[Et] !== Tt[Et]) {
            rt = Rt[Et], yt = Tt[Et];
            break;
          }
          return rt < yt ? -1 : yt < rt ? 1 : 0;
        }, o.prototype.includes = function(C, U, L) {
          return this.indexOf(C, U, L) !== -1;
        }, o.prototype.indexOf = function(C, U, L) {
          return R(this, C, U, L, !0);
        }, o.prototype.lastIndexOf = function(C, U, L) {
          return R(this, C, U, L, !1);
        }, o.prototype.write = function(C, U, L, K) {
          if (U === void 0) K = "utf8", L = this.length, U = 0;
          else if (L === void 0 && typeof U == "string") K = U, L = this.length, U = 0;
          else {
            if (!isFinite(U)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            U |= 0, isFinite(L) ? (L |= 0, K === void 0 && (K = "utf8")) : (K = L, L = void 0);
          }
          var X = this.length - U;
          if ((L === void 0 || L > X) && (L = X), C.length > 0 && (L < 0 || U < 0) || U > this.length) throw new RangeError("Attempt to write outside buffer bounds");
          K || (K = "utf8");
          for (var rt = !1; ; ) switch (K) {
            case "hex":
              return P(this, C, U, L);
            case "utf8":
            case "utf-8":
              return w(this, C, U, L);
            case "ascii":
              return I(this, C, U, L);
            case "latin1":
            case "binary":
              return T(this, C, U, L);
            case "base64":
              return M(this, C, U, L);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return A(this, C, U, L);
            default:
              if (rt) throw new TypeError("Unknown encoding: " + K);
              K = ("" + K).toLowerCase(), rt = !0;
          }
        }, o.prototype.toJSON = function() {
          return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
        };
        function $(C, U, L) {
          var K = "";
          L = Math.min(C.length, L);
          for (var X = U; X < L; ++X) K += String.fromCharCode(127 & C[X]);
          return K;
        }
        function H(C, U, L) {
          var K = "";
          L = Math.min(C.length, L);
          for (var X = U; X < L; ++X) K += String.fromCharCode(C[X]);
          return K;
        }
        function nt(C, U, L) {
          var K = C.length;
          (!U || U < 0) && (U = 0), (!L || L < 0 || L > K) && (L = K);
          for (var X = "", rt = U; rt < L; ++rt) X += st(C[rt]);
          return X;
        }
        function ot(C, U, L) {
          for (var K = C.slice(U, L), X = "", rt = 0; rt < K.length; rt += 2) X += String.fromCharCode(K[rt] + 256 * K[rt + 1]);
          return X;
        }
        function V(C, U, L) {
          if (C % 1 != 0 || C < 0) throw new RangeError("offset is not uint");
          if (C + U > L) throw new RangeError("Trying to access beyond buffer length");
        }
        function it(C, U, L, K, X, rt) {
          if (!o.isBuffer(C)) throw new TypeError('"buffer" argument must be a Buffer instance');
          if (U > X || U < rt) throw new RangeError('"value" argument is out of bounds');
          if (L + K > C.length) throw new RangeError("Index out of range");
        }
        function lt(C, U, L, K) {
          U < 0 && (U = 65535 + U + 1);
          for (var X = 0, rt = Math.min(C.length - L, 2); X < rt; ++X) C[L + X] = (U & 255 << 8 * (K ? X : 1 - X)) >>> 8 * (K ? X : 1 - X);
        }
        function dt(C, U, L, K) {
          U < 0 && (U = 4294967295 + U + 1);
          for (var X = 0, rt = Math.min(C.length - L, 4); X < rt; ++X) C[L + X] = U >>> 8 * (K ? X : 3 - X) & 255;
        }
        function G(C, U, L, K, X, rt) {
          if (L + K > C.length) throw new RangeError("Index out of range");
          if (L < 0) throw new RangeError("Index out of range");
        }
        function Z(C, U, L, K, X) {
          return X || G(C, 0, L, 4), O.write(C, U, L, K, 23, 4), L + 4;
        }
        function ut(C, U, L, K, X) {
          return X || G(C, 0, L, 8), O.write(C, U, L, K, 52, 8), L + 8;
        }
        o.prototype.slice = function(C, U) {
          var L, K = this.length;
          if ((C = ~~C) < 0 ? (C += K) < 0 && (C = 0) : C > K && (C = K), (U = U === void 0 ? K : ~~U) < 0 ? (U += K) < 0 && (U = 0) : U > K && (U = K), U < C && (U = C), o.TYPED_ARRAY_SUPPORT) (L = this.subarray(C, U)).__proto__ = o.prototype;
          else {
            var X = U - C;
            L = new o(X, void 0);
            for (var rt = 0; rt < X; ++rt) L[rt] = this[rt + C];
          }
          return L;
        }, o.prototype.readUIntLE = function(C, U, L) {
          C |= 0, U |= 0, L || V(C, U, this.length);
          for (var K = this[C], X = 1, rt = 0; ++rt < U && (X *= 256); ) K += this[C + rt] * X;
          return K;
        }, o.prototype.readUIntBE = function(C, U, L) {
          C |= 0, U |= 0, L || V(C, U, this.length);
          for (var K = this[C + --U], X = 1; U > 0 && (X *= 256); ) K += this[C + --U] * X;
          return K;
        }, o.prototype.readUInt8 = function(C, U) {
          return U || V(C, 1, this.length), this[C];
        }, o.prototype.readUInt16LE = function(C, U) {
          return U || V(C, 2, this.length), this[C] | this[C + 1] << 8;
        }, o.prototype.readUInt16BE = function(C, U) {
          return U || V(C, 2, this.length), this[C] << 8 | this[C + 1];
        }, o.prototype.readUInt32LE = function(C, U) {
          return U || V(C, 4, this.length), (this[C] | this[C + 1] << 8 | this[C + 2] << 16) + 16777216 * this[C + 3];
        }, o.prototype.readUInt32BE = function(C, U) {
          return U || V(C, 4, this.length), 16777216 * this[C] + (this[C + 1] << 16 | this[C + 2] << 8 | this[C + 3]);
        }, o.prototype.readIntLE = function(C, U, L) {
          C |= 0, U |= 0, L || V(C, U, this.length);
          for (var K = this[C], X = 1, rt = 0; ++rt < U && (X *= 256); ) K += this[C + rt] * X;
          return K >= (X *= 128) && (K -= Math.pow(2, 8 * U)), K;
        }, o.prototype.readIntBE = function(C, U, L) {
          C |= 0, U |= 0, L || V(C, U, this.length);
          for (var K = U, X = 1, rt = this[C + --K]; K > 0 && (X *= 256); ) rt += this[C + --K] * X;
          return rt >= (X *= 128) && (rt -= Math.pow(2, 8 * U)), rt;
        }, o.prototype.readInt8 = function(C, U) {
          return U || V(C, 1, this.length), 128 & this[C] ? -1 * (255 - this[C] + 1) : this[C];
        }, o.prototype.readInt16LE = function(C, U) {
          U || V(C, 2, this.length);
          var L = this[C] | this[C + 1] << 8;
          return 32768 & L ? 4294901760 | L : L;
        }, o.prototype.readInt16BE = function(C, U) {
          U || V(C, 2, this.length);
          var L = this[C + 1] | this[C] << 8;
          return 32768 & L ? 4294901760 | L : L;
        }, o.prototype.readInt32LE = function(C, U) {
          return U || V(C, 4, this.length), this[C] | this[C + 1] << 8 | this[C + 2] << 16 | this[C + 3] << 24;
        }, o.prototype.readInt32BE = function(C, U) {
          return U || V(C, 4, this.length), this[C] << 24 | this[C + 1] << 16 | this[C + 2] << 8 | this[C + 3];
        }, o.prototype.readFloatLE = function(C, U) {
          return U || V(C, 4, this.length), O.read(this, C, !0, 23, 4);
        }, o.prototype.readFloatBE = function(C, U) {
          return U || V(C, 4, this.length), O.read(this, C, !1, 23, 4);
        }, o.prototype.readDoubleLE = function(C, U) {
          return U || V(C, 8, this.length), O.read(this, C, !0, 52, 8);
        }, o.prototype.readDoubleBE = function(C, U) {
          return U || V(C, 8, this.length), O.read(this, C, !1, 52, 8);
        }, o.prototype.writeUIntLE = function(C, U, L, K) {
          C = +C, U |= 0, L |= 0, K || it(this, C, U, L, Math.pow(2, 8 * L) - 1, 0);
          var X = 1, rt = 0;
          for (this[U] = 255 & C; ++rt < L && (X *= 256); ) this[U + rt] = C / X & 255;
          return U + L;
        }, o.prototype.writeUIntBE = function(C, U, L, K) {
          C = +C, U |= 0, L |= 0, K || it(this, C, U, L, Math.pow(2, 8 * L) - 1, 0);
          var X = L - 1, rt = 1;
          for (this[U + X] = 255 & C; --X >= 0 && (rt *= 256); ) this[U + X] = C / rt & 255;
          return U + L;
        }, o.prototype.writeUInt8 = function(C, U, L) {
          return C = +C, U |= 0, L || it(this, C, U, 1, 255, 0), o.TYPED_ARRAY_SUPPORT || (C = Math.floor(C)), this[U] = 255 & C, U + 1;
        }, o.prototype.writeUInt16LE = function(C, U, L) {
          return C = +C, U |= 0, L || it(this, C, U, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[U] = 255 & C, this[U + 1] = C >>> 8) : lt(this, C, U, !0), U + 2;
        }, o.prototype.writeUInt16BE = function(C, U, L) {
          return C = +C, U |= 0, L || it(this, C, U, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[U] = C >>> 8, this[U + 1] = 255 & C) : lt(this, C, U, !1), U + 2;
        }, o.prototype.writeUInt32LE = function(C, U, L) {
          return C = +C, U |= 0, L || it(this, C, U, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[U + 3] = C >>> 24, this[U + 2] = C >>> 16, this[U + 1] = C >>> 8, this[U] = 255 & C) : dt(this, C, U, !0), U + 4;
        }, o.prototype.writeUInt32BE = function(C, U, L) {
          return C = +C, U |= 0, L || it(this, C, U, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[U] = C >>> 24, this[U + 1] = C >>> 16, this[U + 2] = C >>> 8, this[U + 3] = 255 & C) : dt(this, C, U, !1), U + 4;
        }, o.prototype.writeIntLE = function(C, U, L, K) {
          if (C = +C, U |= 0, !K) {
            var X = Math.pow(2, 8 * L - 1);
            it(this, C, U, L, X - 1, -X);
          }
          var rt = 0, yt = 1, jt = 0;
          for (this[U] = 255 & C; ++rt < L && (yt *= 256); ) C < 0 && jt === 0 && this[U + rt - 1] !== 0 && (jt = 1), this[U + rt] = (C / yt >> 0) - jt & 255;
          return U + L;
        }, o.prototype.writeIntBE = function(C, U, L, K) {
          if (C = +C, U |= 0, !K) {
            var X = Math.pow(2, 8 * L - 1);
            it(this, C, U, L, X - 1, -X);
          }
          var rt = L - 1, yt = 1, jt = 0;
          for (this[U + rt] = 255 & C; --rt >= 0 && (yt *= 256); ) C < 0 && jt === 0 && this[U + rt + 1] !== 0 && (jt = 1), this[U + rt] = (C / yt >> 0) - jt & 255;
          return U + L;
        }, o.prototype.writeInt8 = function(C, U, L) {
          return C = +C, U |= 0, L || it(this, C, U, 1, 127, -128), o.TYPED_ARRAY_SUPPORT || (C = Math.floor(C)), C < 0 && (C = 255 + C + 1), this[U] = 255 & C, U + 1;
        }, o.prototype.writeInt16LE = function(C, U, L) {
          return C = +C, U |= 0, L || it(this, C, U, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[U] = 255 & C, this[U + 1] = C >>> 8) : lt(this, C, U, !0), U + 2;
        }, o.prototype.writeInt16BE = function(C, U, L) {
          return C = +C, U |= 0, L || it(this, C, U, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[U] = C >>> 8, this[U + 1] = 255 & C) : lt(this, C, U, !1), U + 2;
        }, o.prototype.writeInt32LE = function(C, U, L) {
          return C = +C, U |= 0, L || it(this, C, U, 4, 2147483647, -2147483648), o.TYPED_ARRAY_SUPPORT ? (this[U] = 255 & C, this[U + 1] = C >>> 8, this[U + 2] = C >>> 16, this[U + 3] = C >>> 24) : dt(this, C, U, !0), U + 4;
        }, o.prototype.writeInt32BE = function(C, U, L) {
          return C = +C, U |= 0, L || it(this, C, U, 4, 2147483647, -2147483648), C < 0 && (C = 4294967295 + C + 1), o.TYPED_ARRAY_SUPPORT ? (this[U] = C >>> 24, this[U + 1] = C >>> 16, this[U + 2] = C >>> 8, this[U + 3] = 255 & C) : dt(this, C, U, !1), U + 4;
        }, o.prototype.writeFloatLE = function(C, U, L) {
          return Z(this, C, U, !0, L);
        }, o.prototype.writeFloatBE = function(C, U, L) {
          return Z(this, C, U, !1, L);
        }, o.prototype.writeDoubleLE = function(C, U, L) {
          return ut(this, C, U, !0, L);
        }, o.prototype.writeDoubleBE = function(C, U, L) {
          return ut(this, C, U, !1, L);
        }, o.prototype.copy = function(C, U, L, K) {
          if (L || (L = 0), K || K === 0 || (K = this.length), U >= C.length && (U = C.length), U || (U = 0), K > 0 && K < L && (K = L), K === L || C.length === 0 || this.length === 0) return 0;
          if (U < 0) throw new RangeError("targetStart out of bounds");
          if (L < 0 || L >= this.length) throw new RangeError("sourceStart out of bounds");
          if (K < 0) throw new RangeError("sourceEnd out of bounds");
          K > this.length && (K = this.length), C.length - U < K - L && (K = C.length - U + L);
          var X, rt = K - L;
          if (this === C && L < U && U < K) for (X = rt - 1; X >= 0; --X) C[X + U] = this[X + L];
          else if (rt < 1e3 || !o.TYPED_ARRAY_SUPPORT) for (X = 0; X < rt; ++X) C[X + U] = this[X + L];
          else Uint8Array.prototype.set.call(C, this.subarray(L, L + rt), U);
          return rt;
        }, o.prototype.fill = function(C, U, L, K) {
          if (typeof C == "string") {
            if (typeof U == "string" ? (K = U, U = 0, L = this.length) : typeof L == "string" && (K = L, L = this.length), C.length === 1) {
              var X = C.charCodeAt(0);
              X < 256 && (C = X);
            }
            if (K !== void 0 && typeof K != "string") throw new TypeError("encoding must be a string");
            if (typeof K == "string" && !o.isEncoding(K)) throw new TypeError("Unknown encoding: " + K);
          } else typeof C == "number" && (C &= 255);
          if (U < 0 || this.length < U || this.length < L) throw new RangeError("Out of range index");
          if (L <= U) return this;
          var rt;
          if (U >>>= 0, L = L === void 0 ? this.length : L >>> 0, C || (C = 0), typeof C == "number") for (rt = U; rt < L; ++rt) this[rt] = C;
          else {
            var yt = o.isBuffer(C) ? C : mt(new o(C, K).toString()), jt = yt.length;
            for (rt = 0; rt < L - U; ++rt) this[rt + U] = yt[rt % jt];
          }
          return this;
        };
        var pt = /[^+\/0-9A-Za-z-_]/g;
        function st(C) {
          return C < 16 ? "0" + C.toString(16) : C.toString(16);
        }
        function mt(C, U) {
          var L;
          U = U || 1 / 0;
          for (var K = C.length, X = null, rt = [], yt = 0; yt < K; ++yt) {
            if ((L = C.charCodeAt(yt)) > 55295 && L < 57344) {
              if (!X) {
                if (L > 56319) {
                  (U -= 3) > -1 && rt.push(239, 191, 189);
                  continue;
                }
                if (yt + 1 === K) {
                  (U -= 3) > -1 && rt.push(239, 191, 189);
                  continue;
                }
                X = L;
                continue;
              }
              if (L < 56320) {
                (U -= 3) > -1 && rt.push(239, 191, 189), X = L;
                continue;
              }
              L = 65536 + (X - 55296 << 10 | L - 56320);
            } else X && (U -= 3) > -1 && rt.push(239, 191, 189);
            if (X = null, L < 128) {
              if ((U -= 1) < 0) break;
              rt.push(L);
            } else if (L < 2048) {
              if ((U -= 2) < 0) break;
              rt.push(L >> 6 | 192, 63 & L | 128);
            } else if (L < 65536) {
              if ((U -= 3) < 0) break;
              rt.push(L >> 12 | 224, L >> 6 & 63 | 128, 63 & L | 128);
            } else {
              if (!(L < 1114112)) throw new Error("Invalid code point");
              if ((U -= 4) < 0) break;
              rt.push(L >> 18 | 240, L >> 12 & 63 | 128, L >> 6 & 63 | 128, 63 & L | 128);
            }
          }
          return rt;
        }
        function bt(C) {
          return u.toByteArray(function(U) {
            if ((U = function(L) {
              return L.trim ? L.trim() : L.replace(/^\s+|\s+$/g, "");
            }(U).replace(pt, "")).length < 2) return "";
            for (; U.length % 4 != 0; ) U += "=";
            return U;
          }(C));
        }
        function wt(C, U, L, K) {
          for (var X = 0; X < K && !(X + L >= U.length || X >= C.length); ++X) U[X + L] = C[X];
          return X;
        }
      }).call(this, t(144));
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return l;
      });
      var n = t(108);
      function u(i, s, o, e, j, E, m) {
        try {
          var _ = i[E](m), h = _.value;
        } catch (S) {
          return void o(S);
        }
        _.done ? s(h) : Promise.resolve(h).then(e, j);
      }
      function O(i) {
        return function() {
          var s = this, o = arguments;
          return new Promise(function(e, j) {
            var E = i.apply(s, o);
            function m(h) {
              u(E, e, j, m, _, "next", h);
            }
            function _(h) {
              u(E, e, j, m, _, "throw", h);
            }
            m(void 0);
          });
        };
      }
      class l {
        static get({ fs: s, gitdir: o }) {
          return O(function* () {
            const e = yield s.read(`${o}/config`, { encoding: "utf8" });
            return n.a.from(e);
          })();
        }
        static save({ fs: s, gitdir: o, config: e }) {
          return O(function* () {
            yield s.write(`${o}/config`, e.toString(), { encoding: "utf8" });
          })();
        }
      }
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return e;
        });
        var u = t(4), O = t(46), l = t(61), i = t(131);
        function s(j) {
          switch (j) {
            case "040000":
              return "tree";
            case "100644":
            case "100755":
            case "120000":
              return "blob";
            case "160000":
              return "commit";
          }
          throw new u.a(`Unexpected GitTree entry mode: ${j}`);
        }
        function o(j) {
          return !j.oid && j.sha && (j.oid = j.sha), j.mode = function(E) {
            if (typeof E == "number" && (E = E.toString(8)), E.match(/^0?4.*/)) return "040000";
            if (E.match(/^1006.*/)) return "100644";
            if (E.match(/^1007.*/)) return "100755";
            if (E.match(/^120.*/)) return "120000";
            if (E.match(/^160.*/)) return "160000";
            throw new u.a(`Could not understand file mode: ${E}`);
          }(j.mode), j.type || (j.type = s(j.mode)), j;
        }
        class e {
          constructor(E) {
            if (n.isBuffer(E)) this._entries = function(m) {
              const _ = [];
              let h = 0;
              for (; h < m.length; ) {
                const S = m.indexOf(32, h);
                if (S === -1) throw new u.a(`GitTree: Error parsing buffer at byte location ${h}: Could not find the next space character.`);
                const x = m.indexOf(0, h);
                if (x === -1) throw new u.a(`GitTree: Error parsing buffer at byte location ${h}: Could not find the next null character.`);
                let R = m.slice(h, S).toString("utf8");
                R === "40000" && (R = "040000");
                const c = s(R), P = m.slice(S + 1, x).toString("utf8");
                if (P.includes("\\") || P.includes("/")) throw new O.a(P);
                const w = m.slice(x + 1, x + 21).toString("hex");
                h = x + 21, _.push({ mode: R, path: P, oid: w, type: c });
              }
              return _;
            }(E);
            else {
              if (!Array.isArray(E)) throw new u.a("invalid type passed to GitTree constructor");
              this._entries = E.map(o);
            }
            this._entries.sort(l.a);
          }
          static from(E) {
            return new e(E);
          }
          render() {
            return this._entries.map((E) => `${E.mode} ${E.type} ${E.oid}    ${E.path}`).join(`
`);
          }
          toObject() {
            const E = [...this._entries];
            return E.sort(i.a), n.concat(E.map((m) => {
              const _ = n.from(m.mode.replace(/^0/, "")), h = n.from(" "), S = n.from(m.path, "utf8"), x = n.from([0]), R = n.from(m.oid, "hex");
              return n.concat([_, h, S, x, R]);
            }));
          }
          entries() {
            return this._entries;
          }
          *[Symbol.iterator]() {
            for (const E of this._entries) yield E;
          }
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return _;
      });
      var n = t(33), u = t.n(n), O = t(76), l = t(106), i = t(69);
      function s(h, S, x, R, c, P, w) {
        try {
          var I = h[P](w), T = I.value;
        } catch (M) {
          return void x(M);
        }
        I.done ? S(T) : Promise.resolve(T).then(R, c);
      }
      function o(h) {
        return function() {
          var S = this, x = arguments;
          return new Promise(function(R, c) {
            var P = h.apply(S, x);
            function w(T) {
              s(P, R, c, w, I, "next", T);
            }
            function I(T) {
              s(P, R, c, w, I, "throw", T);
            }
            w(void 0);
          });
        };
      }
      let e = null;
      const j = Symbol("IndexCache");
      function E() {
        return (E = o(function* (h, S, x) {
          const R = yield h.lstat(S), c = yield h.read(S), P = yield l.a.from(c);
          x.map.set(S, P), x.stats.set(S, R);
        })).apply(this, arguments);
      }
      function m() {
        return (m = o(function* (h, S, x) {
          const R = x.stats.get(S);
          if (R === void 0) return !0;
          const c = yield h.lstat(S);
          return R !== null && c !== null && Object(i.a)(R, c);
        })).apply(this, arguments);
      }
      class _ {
        static acquire({ fs: S, gitdir: x, cache: R, allowUnmerged: c = !0 }, P) {
          return o(function* () {
            R[j] || (R[j] = { map: /* @__PURE__ */ new Map(), stats: /* @__PURE__ */ new Map() });
            const w = `${x}/index`;
            let I;
            e === null && (e = new u.a({ maxPending: 1 / 0 }));
            let T = [];
            return yield e.acquire(w, o(function* () {
              (yield function(A, F, z) {
                return m.apply(this, arguments);
              }(S, w, R[j])) && (yield function(A, F, z) {
                return E.apply(this, arguments);
              }(S, w, R[j]));
              const M = R[j].map.get(w);
              if (T = M.unmergedPaths, T.length && !c) throw new O.a(T);
              if (I = yield P(M), M._dirty) {
                const A = yield M.toObject();
                yield S.write(w, A), R[j].stats.set(w, yield S.lstat(w)), M._dirty = !1;
              }
            })), I;
          })();
        }
      }
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return j;
        });
        var u = t(4), O = t(64), l = t(90), i = t(23), s = t(135), o = t(51);
        function e(E, m, _, h, S, x, R) {
          try {
            var c = E[x](R), P = c.value;
          } catch (w) {
            return void _(w);
          }
          c.done ? m(P) : Promise.resolve(P).then(h, S);
        }
        class j {
          constructor(m) {
            if (typeof m == "string") this._commit = m;
            else if (n.isBuffer(m)) this._commit = m.toString("utf8");
            else {
              if (typeof m != "object") throw new u.a("invalid type passed to GitCommit constructor");
              this._commit = j.render(m);
            }
          }
          static fromPayloadSignature({ payload: m, signature: _ }) {
            const h = j.justHeaders(m), S = j.justMessage(m), x = Object(i.a)(h + `
gpgsig` + Object(l.a)(_) + `
` + S);
            return new j(x);
          }
          static from(m) {
            return new j(m);
          }
          toObject() {
            return n.from(this._commit, "utf8");
          }
          headers() {
            return this.parseHeaders();
          }
          message() {
            return j.justMessage(this._commit);
          }
          parse() {
            return Object.assign({ message: this.message() }, this.headers());
          }
          static justMessage(m) {
            return Object(i.a)(m.slice(m.indexOf(`

`) + 2));
          }
          static justHeaders(m) {
            return m.slice(0, m.indexOf(`

`));
          }
          parseHeaders() {
            const m = j.justHeaders(this._commit).split(`
`), _ = [];
            for (const S of m) S[0] === " " ? _[_.length - 1] += `
` + S.slice(1) : _.push(S);
            const h = { parent: [] };
            for (const S of _) {
              const x = S.slice(0, S.indexOf(" ")), R = S.slice(S.indexOf(" ") + 1);
              Array.isArray(h[x]) ? h[x].push(R) : h[x] = R;
            }
            return h.author && (h.author = Object(o.a)(h.author)), h.committer && (h.committer = Object(o.a)(h.committer)), h;
          }
          static renderHeaders(m) {
            let _ = "";
            if (m.tree ? _ += `tree ${m.tree}
` : _ += `tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
`, m.parent) {
              if (m.parent.length === void 0) throw new u.a("commit 'parent' property should be an array");
              for (const x of m.parent) _ += `parent ${x}
`;
            }
            const h = m.author;
            _ += `author ${Object(O.a)(h)}
`;
            const S = m.committer || m.author;
            return _ += `committer ${Object(O.a)(S)}
`, m.gpgsig && (_ += "gpgsig" + Object(l.a)(m.gpgsig)), _;
          }
          static render(m) {
            return j.renderHeaders(m) + `
` + Object(i.a)(m.message);
          }
          render() {
            return this._commit;
          }
          withoutSignature() {
            const m = Object(i.a)(this._commit);
            if (m.indexOf(`
gpgsig`) === -1) return m;
            const _ = m.slice(0, m.indexOf(`
gpgsig`)), h = m.slice(m.indexOf(`-----END PGP SIGNATURE-----
`) + 28);
            return Object(i.a)(_ + `
` + h);
          }
          isolateSignature() {
            const m = this._commit.slice(this._commit.indexOf("-----BEGIN PGP SIGNATURE-----"), this._commit.indexOf("-----END PGP SIGNATURE-----") + 27);
            return Object(s.a)(m);
          }
          static sign(m, _, h) {
            return (S = function* () {
              const x = m.withoutSignature(), R = j.justMessage(m._commit);
              let { signature: c } = yield _({ payload: x, secretKey: h });
              c = Object(i.a)(c);
              const P = j.justHeaders(m._commit) + `
gpgsig` + Object(l.a)(c) + `
` + R;
              return j.from(P);
            }, function() {
              var x = this, R = arguments;
              return new Promise(function(c, P) {
                var w = S.apply(x, R);
                function I(M) {
                  e(w, c, P, I, T, "next", M);
                }
                function T(M) {
                  e(w, c, P, I, T, "throw", M);
                }
                I(void 0);
              });
            })();
            var S;
          }
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return e;
        });
        var u = t(25), O = t(138), l = t(84), i = t(19);
        function s(E, m, _, h, S, x, R) {
          try {
            var c = E[x](R), P = c.value;
          } catch (w) {
            return void _(w);
          }
          c.done ? m(P) : Promise.resolve(P).then(h, S);
        }
        function o(E) {
          return function() {
            var m = this, _ = arguments;
            return new Promise(function(h, S) {
              var x = E.apply(m, _);
              function R(P) {
                s(x, h, S, R, c, "next", P);
              }
              function c(P) {
                s(x, h, S, R, c, "throw", P);
              }
              R(void 0);
            });
          };
        }
        function e(E) {
          return j.apply(this, arguments);
        }
        function j() {
          return (j = o(function* ({ fs: E, gitdir: m, type: _, object: h, format: S = "content", oid: x, dryRun: R = !1 }) {
            return S !== "deflated" && (S !== "wrapped" && (h = u.a.wrap({ type: _, object: h })), x = yield Object(i.a)(h), h = n.from(yield Object(l.a)(h))), R || (yield Object(O.a)({ fs: E, gitdir: m, object: h, format: "deflated", oid: x })), x;
          })).apply(this, arguments);
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      (function(n) {
        function u(i) {
          if (typeof i != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(i));
        }
        function O(i, s) {
          for (var o, e = "", j = 0, E = -1, m = 0, _ = 0; _ <= i.length; ++_) {
            if (_ < i.length) o = i.charCodeAt(_);
            else {
              if (o === 47) break;
              o = 47;
            }
            if (o === 47) {
              if (!(E === _ - 1 || m === 1)) if (E !== _ - 1 && m === 2) {
                if (e.length < 2 || j !== 2 || e.charCodeAt(e.length - 1) !== 46 || e.charCodeAt(e.length - 2) !== 46) {
                  if (e.length > 2) {
                    var h = e.lastIndexOf("/");
                    if (h !== e.length - 1) {
                      h === -1 ? (e = "", j = 0) : j = (e = e.slice(0, h)).length - 1 - e.lastIndexOf("/"), E = _, m = 0;
                      continue;
                    }
                  } else if (e.length === 2 || e.length === 1) {
                    e = "", j = 0, E = _, m = 0;
                    continue;
                  }
                }
                s && (e.length > 0 ? e += "/.." : e = "..", j = 2);
              } else e.length > 0 ? e += "/" + i.slice(E + 1, _) : e = i.slice(E + 1, _), j = _ - E - 1;
              E = _, m = 0;
            } else o === 46 && m !== -1 ? ++m : m = -1;
          }
          return e;
        }
        var l = { resolve: function() {
          for (var i, s = "", o = !1, e = arguments.length - 1; e >= -1 && !o; e--) {
            var j;
            e >= 0 ? j = arguments[e] : (i === void 0 && (i = n.cwd()), j = i), u(j), j.length !== 0 && (s = j + "/" + s, o = j.charCodeAt(0) === 47);
          }
          return s = O(s, !o), o ? s.length > 0 ? "/" + s : "/" : s.length > 0 ? s : ".";
        }, normalize: function(i) {
          if (u(i), i.length === 0) return ".";
          var s = i.charCodeAt(0) === 47, o = i.charCodeAt(i.length - 1) === 47;
          return (i = O(i, !s)).length !== 0 || s || (i = "."), i.length > 0 && o && (i += "/"), s ? "/" + i : i;
        }, isAbsolute: function(i) {
          return u(i), i.length > 0 && i.charCodeAt(0) === 47;
        }, join: function() {
          if (arguments.length === 0) return ".";
          for (var i, s = 0; s < arguments.length; ++s) {
            var o = arguments[s];
            u(o), o.length > 0 && (i === void 0 ? i = o : i += "/" + o);
          }
          return i === void 0 ? "." : l.normalize(i);
        }, relative: function(i, s) {
          if (u(i), u(s), i === s || (i = l.resolve(i)) === (s = l.resolve(s))) return "";
          for (var o = 1; o < i.length && i.charCodeAt(o) === 47; ++o) ;
          for (var e = i.length, j = e - o, E = 1; E < s.length && s.charCodeAt(E) === 47; ++E) ;
          for (var m = s.length - E, _ = j < m ? j : m, h = -1, S = 0; S <= _; ++S) {
            if (S === _) {
              if (m > _) {
                if (s.charCodeAt(E + S) === 47) return s.slice(E + S + 1);
                if (S === 0) return s.slice(E + S);
              } else j > _ && (i.charCodeAt(o + S) === 47 ? h = S : S === 0 && (h = 0));
              break;
            }
            var x = i.charCodeAt(o + S);
            if (x !== s.charCodeAt(E + S)) break;
            x === 47 && (h = S);
          }
          var R = "";
          for (S = o + h + 1; S <= e; ++S) S !== e && i.charCodeAt(S) !== 47 || (R.length === 0 ? R += ".." : R += "/..");
          return R.length > 0 ? R + s.slice(E + h) : (E += h, s.charCodeAt(E) === 47 && ++E, s.slice(E));
        }, _makeLong: function(i) {
          return i;
        }, dirname: function(i) {
          if (u(i), i.length === 0) return ".";
          for (var s = i.charCodeAt(0), o = s === 47, e = -1, j = !0, E = i.length - 1; E >= 1; --E) if ((s = i.charCodeAt(E)) === 47) {
            if (!j) {
              e = E;
              break;
            }
          } else j = !1;
          return e === -1 ? o ? "/" : "." : o && e === 1 ? "//" : i.slice(0, e);
        }, basename: function(i, s) {
          if (s !== void 0 && typeof s != "string") throw new TypeError('"ext" argument must be a string');
          u(i);
          var o, e = 0, j = -1, E = !0;
          if (s !== void 0 && s.length > 0 && s.length <= i.length) {
            if (s.length === i.length && s === i) return "";
            var m = s.length - 1, _ = -1;
            for (o = i.length - 1; o >= 0; --o) {
              var h = i.charCodeAt(o);
              if (h === 47) {
                if (!E) {
                  e = o + 1;
                  break;
                }
              } else _ === -1 && (E = !1, _ = o + 1), m >= 0 && (h === s.charCodeAt(m) ? --m == -1 && (j = o) : (m = -1, j = _));
            }
            return e === j ? j = _ : j === -1 && (j = i.length), i.slice(e, j);
          }
          for (o = i.length - 1; o >= 0; --o) if (i.charCodeAt(o) === 47) {
            if (!E) {
              e = o + 1;
              break;
            }
          } else j === -1 && (E = !1, j = o + 1);
          return j === -1 ? "" : i.slice(e, j);
        }, extname: function(i) {
          u(i);
          for (var s = -1, o = 0, e = -1, j = !0, E = 0, m = i.length - 1; m >= 0; --m) {
            var _ = i.charCodeAt(m);
            if (_ !== 47) e === -1 && (j = !1, e = m + 1), _ === 46 ? s === -1 ? s = m : E !== 1 && (E = 1) : s !== -1 && (E = -1);
            else if (!j) {
              o = m + 1;
              break;
            }
          }
          return s === -1 || e === -1 || E === 0 || E === 1 && s === e - 1 && s === o + 1 ? "" : i.slice(s, e);
        }, format: function(i) {
          if (i === null || typeof i != "object") throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof i);
          return function(s, o) {
            var e = o.dir || o.root, j = o.base || (o.name || "") + (o.ext || "");
            return e ? e === o.root ? e + j : e + s + j : j;
          }("/", i);
        }, parse: function(i) {
          u(i);
          var s = { root: "", dir: "", base: "", ext: "", name: "" };
          if (i.length === 0) return s;
          var o, e = i.charCodeAt(0), j = e === 47;
          j ? (s.root = "/", o = 1) : o = 0;
          for (var E = -1, m = 0, _ = -1, h = !0, S = i.length - 1, x = 0; S >= o; --S) if ((e = i.charCodeAt(S)) !== 47) _ === -1 && (h = !1, _ = S + 1), e === 46 ? E === -1 ? E = S : x !== 1 && (x = 1) : E !== -1 && (x = -1);
          else if (!h) {
            m = S + 1;
            break;
          }
          return E === -1 || _ === -1 || x === 0 || x === 1 && E === _ - 1 && E === m + 1 ? _ !== -1 && (s.base = s.name = m === 0 && j ? i.slice(1, _) : i.slice(m, _)) : (m === 0 && j ? (s.name = i.slice(1, E), s.base = i.slice(1, _)) : (s.name = i.slice(m, E), s.base = i.slice(m, _)), s.ext = i.slice(E, _)), m > 0 ? s.dir = i.slice(0, m - 1) : j && (s.dir = "/"), s;
        }, sep: "/", delimiter: ":", win32: null, posix: null };
        l.posix = l, N.exports = l;
      }).call(this, t(92));
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l, i, s, o) {
          super(`Object ${l} ${o ? `at ${o}` : ""}was anticipated to be a ${s} but it is a ${i}.`), this.code = this.name = u.code, this.data = { oid: l, actual: i, expected: s, filepath: o };
        }
      }
      u.code = "ObjectTypeError";
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return o;
        });
        var u = t(4), O = t(64), l = t(23), i = t(51);
        function s(e, j, E, m, _, h, S) {
          try {
            var x = e[h](S), R = x.value;
          } catch (c) {
            return void E(c);
          }
          x.done ? j(R) : Promise.resolve(R).then(m, _);
        }
        class o {
          constructor(j) {
            if (typeof j == "string") this._tag = j;
            else if (n.isBuffer(j)) this._tag = j.toString("utf8");
            else {
              if (typeof j != "object") throw new u.a("invalid type passed to GitAnnotatedTag constructor");
              this._tag = o.render(j);
            }
          }
          static from(j) {
            return new o(j);
          }
          static render(j) {
            return `object ${j.object}
type ${j.type}
tag ${j.tag}
tagger ${Object(O.a)(j.tagger)}

${j.message}
${j.gpgsig ? j.gpgsig : ""}`;
          }
          justHeaders() {
            return this._tag.slice(0, this._tag.indexOf(`

`));
          }
          message() {
            const j = this.withoutSignature();
            return j.slice(j.indexOf(`

`) + 2);
          }
          parse() {
            return Object.assign(this.headers(), { message: this.message(), gpgsig: this.gpgsig() });
          }
          render() {
            return this._tag;
          }
          headers() {
            const j = this.justHeaders().split(`
`), E = [];
            for (const _ of j) _[0] === " " ? E[E.length - 1] += `
` + _.slice(1) : E.push(_);
            const m = {};
            for (const _ of E) {
              const h = _.slice(0, _.indexOf(" ")), S = _.slice(_.indexOf(" ") + 1);
              Array.isArray(m[h]) ? m[h].push(S) : m[h] = S;
            }
            return m.tagger && (m.tagger = Object(i.a)(m.tagger)), m.committer && (m.committer = Object(i.a)(m.committer)), m;
          }
          withoutSignature() {
            const j = Object(l.a)(this._tag);
            return j.indexOf(`
-----BEGIN PGP SIGNATURE-----`) === -1 ? j : j.slice(0, j.lastIndexOf(`
-----BEGIN PGP SIGNATURE-----`));
          }
          gpgsig() {
            if (this._tag.indexOf(`
-----BEGIN PGP SIGNATURE-----`) === -1) return;
            const j = this._tag.slice(this._tag.indexOf("-----BEGIN PGP SIGNATURE-----"), this._tag.indexOf("-----END PGP SIGNATURE-----") + 27);
            return Object(l.a)(j);
          }
          payload() {
            return this.withoutSignature() + `
`;
          }
          toObject() {
            return n.from(this._tag, "utf8");
          }
          static sign(j, E, m) {
            return (_ = function* () {
              const h = j.payload();
              let { signature: S } = yield E({ payload: h, secretKey: m });
              S = Object(l.a)(S);
              const x = h + S;
              return o.from(x);
            }, function() {
              var h = this, S = arguments;
              return new Promise(function(x, R) {
                var c = _.apply(h, S);
                function P(I) {
                  s(c, x, R, P, w, "next", I);
                }
                function w(I) {
                  s(c, x, R, P, w, "throw", I);
                }
                P(void 0);
              });
            })();
            var _;
          }
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      var n = t(78), u = t.n(n);
      function O(S) {
        let x = "";
        for (const R of new Uint8Array(S)) R < 16 && (x += "0"), x += R.toString(16);
        return x;
      }
      function l(S, x, R, c, P, w, I) {
        try {
          var T = S[w](I), M = T.value;
        } catch (A) {
          return void R(A);
        }
        T.done ? x(M) : Promise.resolve(M).then(c, P);
      }
      function i(S) {
        return function() {
          var x = this, R = arguments;
          return new Promise(function(c, P) {
            var w = S.apply(x, R);
            function I(M) {
              l(w, c, P, I, T, "next", M);
            }
            function T(M) {
              l(w, c, P, I, T, "throw", M);
            }
            I(void 0);
          });
        };
      }
      t.d(g, "a", function() {
        return o;
      });
      let s = null;
      function o(S) {
        return e.apply(this, arguments);
      }
      function e() {
        return (e = i(function* (S) {
          return s === null && (s = yield _()), s ? E(S) : j(S);
        })).apply(this, arguments);
      }
      function j(S) {
        return new u.a().update(S).digest("hex");
      }
      function E(S) {
        return m.apply(this, arguments);
      }
      function m() {
        return (m = i(function* (S) {
          return O(yield crypto.subtle.digest("SHA-1", S));
        })).apply(this, arguments);
      }
      function _() {
        return h.apply(this, arguments);
      }
      function h() {
        return (h = i(function* () {
          try {
            if ((yield E(new Uint8Array([]))) === "da39a3ee5e6b4b0d3255bfef95601890afd80709") return !0;
          } catch {
          }
          return !1;
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return n;
      });
      class n {
        constructor(O) {
          this.buffer = O, this._start = 0;
        }
        eof() {
          return this._start >= this.buffer.length;
        }
        tell() {
          return this._start;
        }
        seek(O) {
          this._start = O;
        }
        slice(O) {
          const l = this.buffer.slice(this._start, this._start + O);
          return this._start += O, l;
        }
        toString(O, l) {
          const i = this.buffer.toString(O, this._start, this._start + l);
          return this._start += l, i;
        }
        write(O, l, i) {
          const s = this.buffer.write(O, this._start, l, i);
          return this._start += l, s;
        }
        copy(O, l, i) {
          const s = O.copy(this.buffer, this._start, l, i);
          return this._start += s, s;
        }
        readUInt8() {
          const O = this.buffer.readUInt8(this._start);
          return this._start += 1, O;
        }
        writeUInt8(O) {
          const l = this.buffer.writeUInt8(O, this._start);
          return this._start += 1, l;
        }
        readUInt16BE() {
          const O = this.buffer.readUInt16BE(this._start);
          return this._start += 2, O;
        }
        writeUInt16BE(O) {
          const l = this.buffer.writeUInt16BE(O, this._start);
          return this._start += 2, l;
        }
        readUInt32BE() {
          const O = this.buffer.readUInt32BE(this._start);
          return this._start += 4, O;
        }
        writeUInt32BE(O) {
          const l = this.buffer.writeUInt32BE(O, this._start);
          return this._start += 4, l;
        }
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l) {
          super(`No name was provided for ${l} in the argument or in the .git/config file.`), this.code = this.name = u.code, this.data = { role: l };
        }
      }
      u.code = "MissingNameError";
    }, function(N, g, t) {
      var n = t(8), u = t(17), O = t(3), l = t(12), i = t(7), s = t(16), o = t(79), e = t(47);
      function j(S, x, R, c, P, w, I) {
        try {
          var T = S[w](I), M = T.value;
        } catch (A) {
          return void R(A);
        }
        T.done ? x(M) : Promise.resolve(M).then(c, P);
      }
      function E(S) {
        return function() {
          var x = this, R = arguments;
          return new Promise(function(c, P) {
            var w = S.apply(x, R);
            function I(M) {
              j(w, c, P, I, T, "next", M);
            }
            function T(M) {
              j(w, c, P, I, T, "throw", M);
            }
            I(void 0);
          });
        };
      }
      class m {
        constructor({ fs: x, gitdir: R, ref: c, cache: P }) {
          var w = this;
          this.fs = x, this.cache = P, this.gitdir = R, this.mapPromise = E(function* () {
            const T = /* @__PURE__ */ new Map();
            let M;
            try {
              M = yield O.a.resolve({ fs: x, gitdir: R, ref: c });
            } catch (F) {
              F instanceof n.a && (M = "4b825dc642cb6eb9a060e54bf8d69288fbee4904");
            }
            const A = yield Object(e.a)({ fs: x, cache: w.cache, gitdir: R, oid: M });
            return A.type = "tree", A.mode = "40000", T.set(".", A), T;
          })();
          const I = this;
          this.ConstructEntry = class {
            constructor(T) {
              this._fullpath = T, this._type = !1, this._mode = !1, this._stat = !1, this._content = !1, this._oid = !1;
            }
            type() {
              var T = this;
              return E(function* () {
                return I.type(T);
              })();
            }
            mode() {
              var T = this;
              return E(function* () {
                return I.mode(T);
              })();
            }
            stat() {
              var T = this;
              return E(function* () {
                return I.stat(T);
              })();
            }
            content() {
              var T = this;
              return E(function* () {
                return I.content(T);
              })();
            }
            oid() {
              var T = this;
              return E(function* () {
                return I.oid(T);
              })();
            }
          };
        }
        readdir(x) {
          var R = this;
          return E(function* () {
            const c = x._fullpath, { fs: P, cache: w, gitdir: I } = R, T = yield R.mapPromise, M = T.get(c);
            if (!M) throw new Error(`No obj for ${c}`);
            const A = M.oid;
            if (!A) throw new Error(`No oid for obj ${JSON.stringify(M)}`);
            if (M.type !== "tree") return null;
            const { type: F, object: z } = yield Object(i.a)({ fs: P, cache: w, gitdir: I, oid: A });
            if (F !== M.type) throw new u.a(A, F, M.type);
            const $ = l.a.from(z);
            for (const H of $) T.set(Object(s.join)(c, H.path), H);
            return $.entries().map((H) => Object(s.join)(c, H.path));
          })();
        }
        type(x) {
          var R = this;
          return E(function* () {
            if (x._type === !1) {
              const c = yield R.mapPromise, { type: P } = c.get(x._fullpath);
              x._type = P;
            }
            return x._type;
          })();
        }
        mode(x) {
          var R = this;
          return E(function* () {
            if (x._mode === !1) {
              const c = yield R.mapPromise, { mode: P } = c.get(x._fullpath);
              x._mode = Object(o.a)(parseInt(P, 8));
            }
            return x._mode;
          })();
        }
        stat(x) {
          return E(function* () {
          })();
        }
        content(x) {
          var R = this;
          return E(function* () {
            if (x._content === !1) {
              const c = yield R.mapPromise, { fs: P, cache: w, gitdir: I } = R, T = c.get(x._fullpath).oid, { type: M, object: A } = yield Object(i.a)({ fs: P, cache: w, gitdir: I, oid: T });
              x._content = M !== "blob" ? void 0 : new Uint8Array(A);
            }
            return x._content;
          })();
        }
        oid(x) {
          var R = this;
          return E(function* () {
            if (x._oid === !1) {
              const c = (yield R.mapPromise).get(x._fullpath);
              x._oid = c.oid;
            }
            return x._oid;
          })();
        }
      }
      var _ = t(37);
      function h({ ref: S = "HEAD" } = {}) {
        const x = /* @__PURE__ */ Object.create(null);
        return Object.defineProperty(x, _.a, { value: function({ fs: R, gitdir: c, cache: P }) {
          return new m({ fs: R, gitdir: c, ref: S, cache: P });
        } }), Object.freeze(x), x;
      }
      t.d(g, "a", function() {
        return h;
      });
    }, function(N, g, t) {
      function n(u) {
        return u = (u = (u = u.replace(/\r/g, "")).replace(/^\n+/, "")).replace(/\n+$/, "") + `
`;
      }
      t.d(g, "a", function() {
        return n;
      });
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l) {
          super(`The function requires a "${l}" parameter but none was provided.`), this.code = this.name = u.code, this.data = { parameter: l };
        }
      }
      u.code = "MissingParameterError";
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return O;
        });
        var u = t(4);
        class O {
          static wrap({ type: i, object: s }) {
            return n.concat([n.from(`${i} ${s.byteLength.toString()}\0`), n.from(s)]);
          }
          static unwrap(i) {
            const s = i.indexOf(32), o = i.indexOf(0), e = i.slice(0, s).toString("utf8"), j = i.slice(s + 1, o).toString("utf8"), E = i.length - (o + 1);
            if (parseInt(j) !== E) throw new u.a(`Length mismatch: expected ${j} bytes but got ${E} instead.`);
            return { type: e, object: n.from(i.slice(o + 1)) };
          }
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l, i, s = !0) {
          super(`Failed to create ${l} at ${i} because it already exists.${s ? ` (Hint: use 'force: true' parameter to overwrite existing ${l}.)` : ""}`), this.code = this.name = u.code, this.data = { noun: l, where: i, canForce: s };
        }
      }
      u.code = "AlreadyExistsError";
    }, function(N, g, t) {
      function n(u) {
        const O = Math.max(u.lastIndexOf("/"), u.lastIndexOf("\\"));
        return O === -1 ? "." : O === 0 ? "/" : u.slice(0, O);
      }
      t.d(g, "a", function() {
        return n;
      });
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l, i) {
          super(`"${l}" would be an invalid git reference. (Hint: a valid alternative would be "${i}".)`), this.code = this.name = u.code, this.data = { ref: l, suggestion: i };
        }
      }
      u.code = "InvalidRefNameError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return i;
      });
      var n = t(41), u = t(85);
      function O(o, e, j, E, m, _, h) {
        try {
          var S = o[_](h), x = S.value;
        } catch (R) {
          return void j(R);
        }
        S.done ? e(x) : Promise.resolve(x).then(E, m);
      }
      function l(o) {
        return function() {
          var e = this, j = arguments;
          return new Promise(function(E, m) {
            var _ = o.apply(e, j);
            function h(x) {
              O(_, E, m, h, S, "next", x);
            }
            function S(x) {
              O(_, E, m, h, S, "throw", x);
            }
            h(void 0);
          });
        };
      }
      function i(o) {
        return s.apply(this, arguments);
      }
      function s() {
        return (s = l(function* ({ fs: o, gitdir: e, author: j, commit: E }) {
          const m = Math.floor(Date.now() / 1e3), _ = { name: yield Object(n.a)({ fs: o, gitdir: e, path: "user.name" }), email: (yield Object(n.a)({ fs: o, gitdir: e, path: "user.email" })) || "", timestamp: m, timezoneOffset: new Date(1e3 * m).getTimezoneOffset() }, h = Object(u.a)({}, _, E ? E.author : void 0, j);
          if (h.name !== void 0) return h;
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      function n(E, m) {
        const _ = m - E;
        return Array.from({ length: _ }, (h, S) => E + S);
      }
      var u = t(114), O = t(37);
      class l {
        constructor() {
          this.value = null;
        }
        consider(m) {
          m != null && (this.value === null ? this.value = m : m < this.value && (this.value = m));
        }
        reset() {
          this.value = null;
        }
      }
      function* i(E) {
        const m = new l();
        let _;
        const h = [], S = E.length;
        for (let x = 0; x < S; x++) h[x] = E[x].next().value, h[x] !== void 0 && m.consider(h[x]);
        if (m.value !== null) for (; ; ) {
          const x = [];
          _ = m.value, m.reset();
          for (let R = 0; R < S; R++) h[R] !== void 0 && h[R] === _ ? (x[R] = h[R], h[R] = E[R].next().value) : x[R] = null, h[R] !== void 0 && m.consider(h[R]);
          if (yield x, m.value === null) return;
        }
      }
      function s(E, m, _, h, S, x, R) {
        try {
          var c = E[x](R), P = c.value;
        } catch (w) {
          return void _(w);
        }
        c.done ? m(P) : Promise.resolve(P).then(h, S);
      }
      function o(E) {
        return function() {
          var m = this, _ = arguments;
          return new Promise(function(h, S) {
            var x = E.apply(m, _);
            function R(P) {
              s(x, h, S, R, c, "next", P);
            }
            function c(P) {
              s(x, h, S, R, c, "throw", P);
            }
            R(void 0);
          });
        };
      }
      function e(E) {
        return j.apply(this, arguments);
      }
      function j() {
        return (j = o(function* ({ fs: E, cache: m, dir: _, gitdir: h, trees: S, map: x = function() {
          var P = o(function* (w, I) {
            return I;
          });
          return function(w, I) {
            return P.apply(this, arguments);
          };
        }(), reduce: R = function() {
          var P = o(function* (w, I) {
            const T = Object(u.a)(I);
            return w !== void 0 && T.unshift(w), T;
          });
          return function(w, I) {
            return P.apply(this, arguments);
          };
        }(), iterate: c = (P, w) => Promise.all([...w].map(P)) }) {
          const P = S.map((A) => A[O.a]({ fs: E, dir: _, gitdir: h, cache: m })), w = new Array(P.length).fill("."), I = n(0, P.length), T = function() {
            var A = o(function* (F) {
              I.map(($) => {
                F[$] = F[$] && new P[$].ConstructEntry(F[$]);
              });
              const z = (yield Promise.all(I.map(($) => F[$] ? P[$].readdir(F[$]) : []))).map(($) => $ === null ? [] : $).map(($) => $[Symbol.iterator]());
              return { entries: F, children: i(z) };
            });
            return function(F) {
              return A.apply(this, arguments);
            };
          }(), M = function() {
            var A = o(function* (F) {
              const { entries: z, children: $ } = yield T(F), H = z.find((ot) => ot && ot._fullpath)._fullpath, nt = yield x(H, z);
              if (nt !== null) {
                let ot = yield c(M, $);
                return ot = ot.filter((V) => V !== void 0), R(nt, ot);
              }
            });
            return function(F) {
              return A.apply(this, arguments);
            };
          }();
          return M(w);
        })).apply(this, arguments);
      }
      t.d(g, "a", function() {
        return e;
      });
    }, function(N, g, t) {
      var n = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
      function u(i, s) {
        return Object.prototype.hasOwnProperty.call(i, s);
      }
      g.assign = function(i) {
        for (var s = Array.prototype.slice.call(arguments, 1); s.length; ) {
          var o = s.shift();
          if (o) {
            if (typeof o != "object") throw new TypeError(o + "must be non-object");
            for (var e in o) u(o, e) && (i[e] = o[e]);
          }
        }
        return i;
      }, g.shrinkBuf = function(i, s) {
        return i.length === s ? i : i.subarray ? i.subarray(0, s) : (i.length = s, i);
      };
      var O = { arraySet: function(i, s, o, e, j) {
        if (s.subarray && i.subarray) i.set(s.subarray(o, o + e), j);
        else for (var E = 0; E < e; E++) i[j + E] = s[o + E];
      }, flattenChunks: function(i) {
        var s, o, e, j, E, m;
        for (e = 0, s = 0, o = i.length; s < o; s++) e += i[s].length;
        for (m = new Uint8Array(e), j = 0, s = 0, o = i.length; s < o; s++) E = i[s], m.set(E, j), j += E.length;
        return m;
      } }, l = { arraySet: function(i, s, o, e, j) {
        for (var E = 0; E < e; E++) i[j + E] = s[o + E];
      }, flattenChunks: function(i) {
        return [].concat.apply([], i);
      } };
      g.setTyped = function(i) {
        i ? (g.Buf8 = Uint8Array, g.Buf16 = Uint16Array, g.Buf32 = Int32Array, g.assign(g, O)) : (g.Buf8 = Array, g.Buf16 = Array, g.Buf32 = Array, g.assign(g, l));
      }, g.setTyped(n);
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l) {
          super(`Expected a 40-char hex object id but saw "${l}".`), this.code = this.name = u.code, this.data = { value: l };
        }
      }
      u.code = "InvalidOidError";
    }, function(N, g, t) {
      N.exports = t(143);
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return O;
      });
      var n = t(79);
      function u(l, i, s, o) {
        if (l !== void 0 && i !== void 0) return [l, i];
        s === void 0 && (s = o.valueOf());
        const e = Math.floor(s / 1e3);
        return [e, 1e6 * (s - 1e3 * e)];
      }
      function O(l) {
        const [i, s] = u(l.ctimeSeconds, l.ctimeNanoseconds, l.ctimeMs, l.ctime), [o, e] = u(l.mtimeSeconds, l.mtimeNanoseconds, l.mtimeMs, l.mtime);
        return { ctimeSeconds: i % 2 ** 32, ctimeNanoseconds: s % 2 ** 32, mtimeSeconds: o % 2 ** 32, mtimeNanoseconds: e % 2 ** 32, dev: l.dev % 2 ** 32, ino: l.ino % 2 ** 32, mode: Object(n.a)(l.mode % 2 ** 32), uid: l.uid % 2 ** 32, gid: l.gid % 2 ** 32, size: l.size > -1 ? l.size % 2 ** 32 : 0 };
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return i;
      });
      var n = t(3), u = t(66);
      function O(o, e, j, E, m, _, h) {
        try {
          var S = o[_](h), x = S.value;
        } catch (R) {
          return void j(R);
        }
        S.done ? e(x) : Promise.resolve(x).then(E, m);
      }
      function l(o) {
        return function() {
          var e = this, j = arguments;
          return new Promise(function(E, m) {
            var _ = o.apply(e, j);
            function h(x) {
              O(_, E, m, h, S, "next", x);
            }
            function S(x) {
              O(_, E, m, h, S, "throw", x);
            }
            h(void 0);
          });
        };
      }
      function i(o) {
        return s.apply(this, arguments);
      }
      function s() {
        return (s = l(function* ({ fs: o, gitdir: e, fullname: j = !1, test: E = !1 }) {
          const m = yield n.a.resolve({ fs: o, gitdir: e, ref: "HEAD", depth: 2 });
          if (E) try {
            yield n.a.resolve({ fs: o, gitdir: e, ref: m });
          } catch {
            return;
          }
          if (m.startsWith("refs/")) return j ? m : Object(u.a)(m);
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l, i) {
          super(`Expected "${l}" but received "${i}".`), this.code = this.name = u.code, this.data = { expected: l, actual: i };
        }
      }
      u.code = "ParseError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return n;
      });
      const n = Symbol("GitWalkSymbol");
    }, function(N, g, t) {
      function n(u, O) {
        return -(u < O) || +(u > O);
      }
      t.d(g, "a", function() {
        return n;
      });
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return l;
      });
      var n = t(88);
      function u(s, o, e, j, E, m, _) {
        try {
          var h = s[m](_), S = h.value;
        } catch (x) {
          return void e(x);
        }
        h.done ? o(S) : Promise.resolve(S).then(j, E);
      }
      function O(s) {
        return function() {
          var o = this, e = arguments;
          return new Promise(function(j, E) {
            var m = s.apply(o, e);
            function _(S) {
              u(m, j, E, _, h, "next", S);
            }
            function h(S) {
              u(m, j, E, _, h, "throw", S);
            }
            _(void 0);
          });
        };
      }
      function l(s, o) {
        return i.apply(this, arguments);
      }
      function i() {
        return (i = O(function* (s, o) {
          const e = Object(n.a)(s);
          for (; ; ) {
            const { value: j, done: E } = yield e.next();
            if (j && (yield o(j)), E) break;
          }
          e.return && e.return();
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      function n(u) {
        const O = Math.max(u.lastIndexOf("/"), u.lastIndexOf("\\"));
        return O > -1 && (u = u.slice(O + 1)), u;
      }
      t.d(g, "a", function() {
        return n;
      });
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return l;
      });
      var n = t(11);
      function u(s, o, e, j, E, m, _) {
        try {
          var h = s[m](_), S = h.value;
        } catch (x) {
          return void e(x);
        }
        h.done ? o(S) : Promise.resolve(S).then(j, E);
      }
      function O(s) {
        return function() {
          var o = this, e = arguments;
          return new Promise(function(j, E) {
            var m = s.apply(o, e);
            function _(S) {
              u(m, j, E, _, h, "next", S);
            }
            function h(S) {
              u(m, j, E, _, h, "throw", S);
            }
            _(void 0);
          });
        };
      }
      function l(s) {
        return i.apply(this, arguments);
      }
      function i() {
        return (i = O(function* ({ fs: s, gitdir: o, path: e }) {
          return (yield n.a.get({ fs: s, gitdir: o })).get(e);
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return o;
      });
      var n = t(137), u = t.n(n), O = t(40), l = t(27), i = t(16);
      function s(e, j, E, m, _, h, S) {
        try {
          var x = e[h](S), R = x.value;
        } catch (c) {
          return void E(c);
        }
        x.done ? j(R) : Promise.resolve(R).then(m, _);
      }
      class o {
        static isIgnored({ fs: j, dir: E, gitdir: m = Object(i.join)(E, ".git"), filepath: _ }) {
          return (h = function* () {
            if (Object(O.a)(_) === ".git") return !0;
            if (_ === ".") return !1;
            let S = "";
            const x = Object(i.join)(m, "info", "exclude");
            (yield j.exists(x)) && (S = yield j.read(x, "utf8"));
            const R = [{ gitignore: Object(i.join)(E, ".gitignore"), filepath: _ }], c = _.split("/").filter(Boolean);
            for (let w = 1; w < c.length; w++) {
              const I = c.slice(0, w).join("/"), T = c.slice(w).join("/");
              R.push({ gitignore: Object(i.join)(E, I, ".gitignore"), filepath: T });
            }
            let P = !1;
            for (const w of R) {
              let I;
              try {
                I = yield j.read(w.gitignore, "utf8");
              } catch (A) {
                if (A.code === "NOENT") continue;
              }
              const T = u()().add(S);
              T.add(I);
              const M = Object(l.a)(w.filepath);
              if (M !== "." && T.ignores(M)) return !0;
              P = P ? !T.test(w.filepath).unignored : T.test(w.filepath).ignored;
            }
            return P;
          }, function() {
            var S = this, x = arguments;
            return new Promise(function(R, c) {
              var P = h.apply(S, x);
              function w(T) {
                s(P, R, c, w, I, "next", T);
              }
              function I(T) {
                s(P, R, c, w, I, "throw", T);
              }
              w(void 0);
            });
          })();
          var h;
        }
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return i;
      });
      var n = t(41), u = t(85);
      function O(o, e, j, E, m, _, h) {
        try {
          var S = o[_](h), x = S.value;
        } catch (R) {
          return void j(R);
        }
        S.done ? e(x) : Promise.resolve(x).then(E, m);
      }
      function l(o) {
        return function() {
          var e = this, j = arguments;
          return new Promise(function(E, m) {
            var _ = o.apply(e, j);
            function h(x) {
              O(_, E, m, h, S, "next", x);
            }
            function S(x) {
              O(_, E, m, h, S, "throw", x);
            }
            h(void 0);
          });
        };
      }
      function i(o) {
        return s.apply(this, arguments);
      }
      function s() {
        return (s = l(function* ({ fs: o, gitdir: e, author: j, committer: E, commit: m }) {
          const _ = Math.floor(Date.now() / 1e3), h = { name: yield Object(n.a)({ fs: o, gitdir: e, path: "user.name" }), email: (yield Object(n.a)({ fs: o, gitdir: e, path: "user.email" })) || "", timestamp: _, timezoneOffset: new Date(1e3 * _).getTimezoneOffset() }, S = Object(u.a)({}, h, m ? m.committer : void 0, j, E);
          if (S.name !== void 0) return S;
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return o;
      });
      var n = t(33), u = t.n(n), O = t(16);
      function l(e, j, E, m, _, h, S) {
        try {
          var x = e[h](S), R = x.value;
        } catch (c) {
          return void E(c);
        }
        x.done ? j(R) : Promise.resolve(R).then(m, _);
      }
      function i(e) {
        return function() {
          var j = this, E = arguments;
          return new Promise(function(m, _) {
            var h = e.apply(j, E);
            function S(R) {
              l(h, m, _, S, x, "next", R);
            }
            function x(R) {
              l(h, m, _, S, x, "throw", R);
            }
            S(void 0);
          });
        };
      }
      let s = null;
      class o {
        static read({ fs: j, gitdir: E }) {
          return i(function* () {
            s === null && (s = new u.a());
            const m = Object(O.join)(E, "shallow"), _ = /* @__PURE__ */ new Set();
            return yield s.acquire(m, i(function* () {
              const h = yield j.read(m, { encoding: "utf8" });
              return h === null || h.trim() === "" ? _ : void h.trim().split(`
`).map((S) => _.add(S));
            })), _;
          })();
        }
        static write({ fs: j, gitdir: E, oids: m }) {
          return i(function* () {
            s === null && (s = new u.a());
            const _ = Object(O.join)(E, "shallow");
            if (m.size > 0) {
              const h = [...m].join(`
`) + `
`;
              yield s.acquire(_, i(function* () {
                yield j.write(_, h, { encoding: "utf8" });
              }));
            } else yield s.acquire(_, i(function* () {
              yield j.rm(_);
            }));
          })();
        }
      }
    }, function(N, g, t) {
      function n(O, l, i) {
        return l = l instanceof RegExp ? l : new RegExp(l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), O.replace(l, i);
      }
      var u = { clean: function(O) {
        if (typeof O != "string") throw new Error("Expected a string, received: " + O);
        return O = n(O, "./", "/"), O = n(O, "..", "."), O = n(O, " ", "-"), O = n(O, /^[~^:?*\\\-]/g, ""), O = n(O, /[~^:?*\\]/g, "-"), O = n(O, /[~^:?*\\\-]$/g, ""), O = n(O, "@{", "-"), O = n(O, /\.$/g, ""), O = n(O, /\/$/g, ""), O = n(O, /\.lock$/g, "");
      } };
      N.exports = u;
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l) {
          super(`The filepath "${l}" contains unsafe character sequences`), this.code = this.name = u.code, this.data = { filepath: l };
        }
      }
      u.code = "UnsafeFilepathError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return e;
      });
      var n = t(17), u = t(18), O = t(14), l = t(12), i = t(7);
      function s(E, m, _, h, S, x, R) {
        try {
          var c = E[x](R), P = c.value;
        } catch (w) {
          return void _(w);
        }
        c.done ? m(P) : Promise.resolve(P).then(h, S);
      }
      function o(E) {
        return function() {
          var m = this, _ = arguments;
          return new Promise(function(h, S) {
            var x = E.apply(m, _);
            function R(P) {
              s(x, h, S, R, c, "next", P);
            }
            function c(P) {
              s(x, h, S, R, c, "throw", P);
            }
            R(void 0);
          });
        };
      }
      function e(E) {
        return j.apply(this, arguments);
      }
      function j() {
        return (j = o(function* ({ fs: E, cache: m, gitdir: _, oid: h }) {
          if (h === "4b825dc642cb6eb9a060e54bf8d69288fbee4904") return { tree: l.a.from([]), oid: h };
          const { type: S, object: x } = yield Object(i.a)({ fs: E, cache: m, gitdir: _, oid: h });
          if (S === "tag") return e({ fs: E, cache: m, gitdir: _, oid: h = u.a.from(x).parse().object });
          if (S === "commit") return e({ fs: E, cache: m, gitdir: _, oid: h = O.a.from(x).parse().tree });
          if (S !== "tree") throw new n.a(h, S, "tree");
          return { tree: l.a.from(x), oid: h };
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return n;
      });
      const n = { name: "isomorphic-git", version: "1.29.0", agent: "git/isomorphic-git@1.29.0" };
    }, function(N, g, t) {
      var n = {};
      (0, t(31).assign)(n, t(150), t(153), t(124)), N.exports = n;
    }, function(N, g, t) {
      function n(u, O) {
        const l = O.toString(16);
        return "0".repeat(u - l.length) + l;
      }
      t.d(g, "a", function() {
        return n;
      });
    }, function(N, g, t) {
      function n(O) {
        const [, l, i, s, o] = O.match(/^(.*) <(.*)> (.*) (.*)$/);
        return { name: l, email: i, timestamp: Number(s), timezoneOffset: u(o) };
      }
      function u(O) {
        let [, l, i, s] = O.match(/(\+|-)(\d\d)(\d\d)/);
        return s = (l === "+" ? 1 : -1) * (60 * Number(i) + Number(s)), (o = s) === 0 ? o : -o;
        var o;
      }
      t.d(g, "a", function() {
        return n;
      });
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return l;
      });
      var n = t(39);
      function u(s, o, e, j, E, m, _) {
        try {
          var h = s[m](_), S = h.value;
        } catch (x) {
          return void e(x);
        }
        h.done ? o(S) : Promise.resolve(S).then(j, E);
      }
      function O(s) {
        return function() {
          var o = this, e = arguments;
          return new Promise(function(j, E) {
            var m = s.apply(o, e);
            function _(S) {
              u(m, j, E, _, h, "next", S);
            }
            function h(S) {
              u(m, j, E, _, h, "throw", S);
            }
            _(void 0);
          });
        };
      }
      function l(s) {
        return i.apply(this, arguments);
      }
      function i() {
        return (i = O(function* (s) {
          let o = 0;
          const e = [];
          yield Object(n.a)(s, (m) => {
            e.push(m), o += m.byteLength;
          });
          const j = new Uint8Array(o);
          let E = 0;
          for (const m of e) j.set(m, E), E += m.byteLength;
          return j;
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      function n(i, s, o, e, j, E, m) {
        try {
          var _ = i[E](m), h = _.value;
        } catch (S) {
          return void o(S);
        }
        _.done ? s(h) : Promise.resolve(h).then(e, j);
      }
      function u(i) {
        return function() {
          var s = this, o = arguments;
          return new Promise(function(e, j) {
            var E = i.apply(s, o);
            function m(h) {
              n(E, e, j, m, _, "next", h);
            }
            function _(h) {
              n(E, e, j, m, _, "throw", h);
            }
            m(void 0);
          });
        };
      }
      function O(i, s) {
        return l.apply(this, arguments);
      }
      function l() {
        return (l = u(function* (i, s) {
          return !(!i && !s) && (!(!i || s) || !(i || !s) || ((yield i.type()) !== "tree" || (yield s.type()) !== "tree") && ((yield i.type()) !== (yield s.type()) || (yield i.mode()) !== (yield s.mode()) || (yield i.oid()) !== (yield s.oid())));
        })).apply(this, arguments);
      }
      t.d(g, "a", function() {
        return O;
      });
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return i;
      });
      var n = t(70), u = t(47);
      function O(o, e, j, E, m, _, h) {
        try {
          var S = o[_](h), x = S.value;
        } catch (R) {
          return void j(R);
        }
        S.done ? e(x) : Promise.resolve(x).then(E, m);
      }
      function l(o) {
        return function() {
          var e = this, j = arguments;
          return new Promise(function(E, m) {
            var _ = o.apply(e, j);
            function h(x) {
              O(_, E, m, h, S, "next", x);
            }
            function S(x) {
              O(_, E, m, h, S, "throw", x);
            }
            h(void 0);
          });
        };
      }
      function i(o) {
        return s.apply(this, arguments);
      }
      function s() {
        return (s = l(function* ({ fs: o, cache: e, gitdir: j, oid: E, filepath: m }) {
          m !== void 0 && (E = yield Object(n.a)({ fs: o, cache: e, gitdir: j, oid: E, filepath: m }));
          const { tree: _, oid: h } = yield Object(u.a)({ fs: o, cache: e, gitdir: j, oid: E });
          return { oid: h, tree: _.entries() };
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return c;
        });
        var u = t(59), O = t(73), l = t(58), i = t(86), s = t(52), o = t(117), e = t(87);
        function j(P, w) {
          var I = Object.keys(P);
          if (Object.getOwnPropertySymbols) {
            var T = Object.getOwnPropertySymbols(P);
            w && (T = T.filter(function(M) {
              return Object.getOwnPropertyDescriptor(P, M).enumerable;
            })), I.push.apply(I, T);
          }
          return I;
        }
        function E(P) {
          for (var w = 1; w < arguments.length; w++) {
            var I = arguments[w] != null ? arguments[w] : {};
            w % 2 ? j(Object(I), !0).forEach(function(T) {
              m(P, T, I[T]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(P, Object.getOwnPropertyDescriptors(I)) : j(Object(I)).forEach(function(T) {
              Object.defineProperty(P, T, Object.getOwnPropertyDescriptor(I, T));
            });
          }
          return P;
        }
        function m(P, w, I) {
          return w in P ? Object.defineProperty(P, w, { value: I, enumerable: !0, configurable: !0, writable: !0 }) : P[w] = I, P;
        }
        function _(P, w, I, T, M, A, F) {
          try {
            var z = P[A](F), $ = z.value;
          } catch (H) {
            return void I(H);
          }
          z.done ? w($) : Promise.resolve($).then(T, M);
        }
        function h(P) {
          return function() {
            var w = this, I = arguments;
            return new Promise(function(T, M) {
              var A = P.apply(w, I);
              function F($) {
                _(A, T, M, F, z, "next", $);
              }
              function z($) {
                _(A, T, M, F, z, "throw", $);
              }
              F(void 0);
            });
          };
        }
        const S = (P, w) => P.endsWith("?") ? `${P}${w}` : `${P}/${w.replace(/^https?:\/\//, "")}`, x = (P, w) => {
          (w.username || w.password) && (P.Authorization = Object(i.a)(w)), w.headers && Object.assign(P, w.headers);
        }, R = function() {
          var P = h(function* (w) {
            try {
              const I = n.from(yield Object(s.a)(w.body)), T = I.toString("utf8");
              return { preview: T.length < 256 ? T : T.slice(0, 256) + "...", response: T, data: I };
            } catch {
              return {};
            }
          });
          return function(w) {
            return P.apply(this, arguments);
          };
        }();
        class c {
          static capabilities() {
            return h(function* () {
              return ["discover", "connect"];
            })();
          }
          static discover({ http: w, onProgress: I, onAuth: T, onAuthSuccess: M, onAuthFailure: A, corsProxy: F, service: z, url: $, headers: H, protocolVersion: nt }) {
            return h(function* () {
              let { url: ot, auth: V } = Object(o.a)($);
              const it = F ? S(F, ot) : ot;
              let lt, dt;
              (V.username || V.password) && (H.Authorization = Object(i.a)(V)), nt === 2 && (H["Git-Protocol"] = "version=2");
              let G = !1;
              do
                if (lt = yield w.request({ onProgress: I, method: "GET", url: `${it}/info/refs?service=${z}`, headers: H }), dt = !1, lt.statusCode === 401 || lt.statusCode === 203) {
                  const Z = G ? A : T;
                  if (Z) {
                    if (V = yield Z(ot, E({}, V, { headers: E({}, H) })), V && V.cancel) throw new l.a();
                    V && (x(H, V), G = !0, dt = !0);
                  }
                } else lt.statusCode === 200 && G && M && (yield M(ot, V));
              while (dt);
              if (lt.statusCode !== 200) {
                const { response: Z } = yield R(lt);
                throw new u.a(lt.statusCode, lt.statusMessage, Z);
              }
              if (lt.headers["content-type"] === `application/x-${z}-advertisement`) {
                const Z = yield Object(e.a)(lt.body, { service: z });
                return Z.auth = V, Z;
              }
              {
                const { preview: Z, response: ut, data: pt } = yield R(lt);
                try {
                  const st = yield Object(e.a)([pt], { service: z });
                  return st.auth = V, st;
                } catch {
                  throw new O.a(Z, ut);
                }
              }
            })();
          }
          static connect({ http: w, onProgress: I, corsProxy: T, service: M, url: A, auth: F, body: z, headers: $ }) {
            return h(function* () {
              const H = Object(o.a)(A);
              H && (A = H.url), T && (A = S(T, A)), $["content-type"] = `application/x-${M}-request`, $.accept = `application/x-${M}-result`, x($, F);
              const nt = yield w.request({ onProgress: I, method: "POST", url: `${A}/${M}`, body: z, headers: $ });
              if (nt.statusCode !== 200) {
                const { response: ot } = R(nt);
                throw new u.a(nt.statusCode, nt.statusMessage, ot);
              }
              return nt;
            })();
          }
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor() {
          super("Merges with conflicts are not supported yet."), this.code = this.name = u.code, this.data = {};
        }
      }
      u.code = "MergeNotSupportedError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l, i, s, o) {
          super(`Automatic merge failed with one or more merge conflicts in the following files: ${l.toString()}. Fix conflicts then commit the result.`), this.code = this.name = u.code, this.data = { filepaths: l, bothModified: i, deleteByUs: s, deleteByTheirs: o };
        }
      }
      u.code = "MergeConflictError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor() {
          super("The operation was canceled."), this.code = this.name = u.code, this.data = {};
        }
      }
      u.code = "UserCanceledError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l, i, s) {
          super(`HTTP Error: ${l} ${i}`), this.code = this.name = u.code, this.data = { statusCode: l, statusMessage: i, response: s };
        }
      }
      u.code = "HttpError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l) {
          let i = "invalid filepath";
          l === "leading-slash" || l === "trailing-slash" ? i = '"filepath" parameter should not include leading or trailing directory separators because these can cause problems on some platforms.' : l === "directory" && (i = '"filepath" should not be a directory.'), super(i), this.code = this.name = u.code, this.data = { reason: l };
        }
      }
      u.code = "InvalidFilepathError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(38);
      function u(O, l) {
        return Object(n.a)(O.path, l.path);
      }
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return h;
        });
        var u = t(132), O = t.n(u), l = t(4), i = t(25), s = t(20), o = t(134), e = t(133), j = t(83), E = t(19);
        function m(S, x, R, c, P, w, I) {
          try {
            var T = S[w](I), M = T.value;
          } catch (A) {
            return void R(A);
          }
          T.done ? x(M) : Promise.resolve(M).then(c, P);
        }
        function _(S) {
          return function() {
            var x = this, R = arguments;
            return new Promise(function(c, P) {
              var w = S.apply(x, R);
              function I(M) {
                m(w, c, P, I, T, "next", M);
              }
              function T(M) {
                m(w, c, P, I, T, "throw", M);
              }
              I(void 0);
            });
          };
        }
        class h {
          constructor(x) {
            Object.assign(this, x), this.offsetCache = {};
          }
          static fromIdx({ idx: x, getExternalRefDelta: R }) {
            return _(function* () {
              const c = new s.a(x);
              if (c.slice(4).toString("hex") !== "ff744f63") return;
              const P = c.readUInt32BE();
              if (P !== 2) throw new l.a(`Unable to read version ${P} packfile IDX. (Only version 2 supported)`);
              if (x.byteLength > 2147483648) throw new l.a("To keep implementation simple, I haven't implemented the layer 5 feature needed to support packfiles > 2GB in size.");
              c.seek(c.tell() + 1020);
              const w = c.readUInt32BE(), I = [];
              for (let A = 0; A < w; A++) {
                const F = c.slice(20).toString("hex");
                I[A] = F;
              }
              c.seek(c.tell() + 4 * w);
              const T = /* @__PURE__ */ new Map();
              for (let A = 0; A < w; A++) T.set(I[A], c.readUInt32BE());
              const M = c.slice(20).toString("hex");
              return new h({ hashes: I, crcs: {}, offsets: T, packfileSha: M, getExternalRefDelta: R });
            })();
          }
          static fromPack({ pack: x, getExternalRefDelta: R, onProgress: c }) {
            return _(function* () {
              const P = { 1: "commit", 2: "tree", 3: "blob", 4: "tag", 6: "ofs-delta", 7: "ref-delta" }, w = {}, I = x.slice(-20).toString("hex"), T = [], M = {}, A = /* @__PURE__ */ new Map();
              let F = null, z = null;
              yield Object(e.a)([x], function() {
                var V = _(function* ({ data: it, type: lt, reference: dt, offset: G, num: Z }) {
                  F === null && (F = Z);
                  const ut = Math.floor(100 * (F - Z) / F);
                  ut !== z && c && (yield c({ phase: "Receiving objects", loaded: F - Z, total: F })), z = ut, ["commit", "tree", "blob", "tag"].includes(lt = P[lt]) ? w[G] = { type: lt, offset: G } : lt === "ofs-delta" ? w[G] = { type: lt, offset: G } : lt === "ref-delta" && (w[G] = { type: lt, offset: G });
                });
                return function(it) {
                  return V.apply(this, arguments);
                };
              }());
              const $ = Object.keys(w).map(Number);
              for (const [V, it] of $.entries()) {
                const lt = V + 1 === $.length ? x.byteLength - 20 : $[V + 1], dt = w[it], G = O.a.buf(x.slice(it, lt)) >>> 0;
                dt.end = lt, dt.crc = G;
              }
              const H = new h({ pack: Promise.resolve(x), packfileSha: I, crcs: M, hashes: T, offsets: A, getExternalRefDelta: R });
              z = null;
              let nt = 0;
              const ot = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
              for (let V in w) {
                V = Number(V);
                const it = Math.floor(100 * nt / F);
                it !== z && c && (yield c({ phase: "Resolving deltas", loaded: nt, total: F })), nt++, z = it;
                const lt = w[V];
                if (!lt.oid) try {
                  H.readDepth = 0, H.externalReadDepth = 0;
                  const { type: dt, object: G } = yield H.readSlice({ start: V });
                  ot[H.readDepth] += 1;
                  const Z = yield Object(E.a)(i.a.wrap({ type: dt, object: G }));
                  lt.oid = Z, T.push(Z), A.set(Z, V), M[Z] = lt.crc;
                } catch {
                  continue;
                }
              }
              return T.sort(), H;
            })();
          }
          toBuffer() {
            var x = this;
            return _(function* () {
              const R = [], c = (F, z) => {
                R.push(n.from(F, z));
              };
              c("ff744f63", "hex"), c("00000002", "hex");
              const P = new s.a(n.alloc(1024));
              for (let F = 0; F < 256; F++) {
                let z = 0;
                for (const $ of x.hashes) parseInt($.slice(0, 2), 16) <= F && z++;
                P.writeUInt32BE(z);
              }
              R.push(P.buffer);
              for (const F of x.hashes) c(F, "hex");
              const w = new s.a(n.alloc(4 * x.hashes.length));
              for (const F of x.hashes) w.writeUInt32BE(x.crcs[F]);
              R.push(w.buffer);
              const I = new s.a(n.alloc(4 * x.hashes.length));
              for (const F of x.hashes) I.writeUInt32BE(x.offsets.get(F));
              R.push(I.buffer), c(x.packfileSha, "hex");
              const T = n.concat(R), M = yield Object(E.a)(T), A = n.alloc(20);
              return A.write(M, "hex"), n.concat([T, A]);
            })();
          }
          load({ pack: x }) {
            var R = this;
            return _(function* () {
              R.pack = x;
            })();
          }
          unload() {
            var x = this;
            return _(function* () {
              x.pack = null;
            })();
          }
          read({ oid: x }) {
            var R = this;
            return _(function* () {
              if (!R.offsets.get(x)) {
                if (R.getExternalRefDelta) return R.externalReadDepth++, R.getExternalRefDelta(x);
                throw new l.a(`Could not read object ${x} from packfile`);
              }
              const c = R.offsets.get(x);
              return R.readSlice({ start: c });
            })();
          }
          readSlice({ start: x }) {
            var R = this;
            return _(function* () {
              if (R.offsetCache[x]) return Object.assign({}, R.offsetCache[x]);
              if (R.readDepth++, !R.pack) throw new l.a("Tried to read from a GitPackIndex with no packfile loaded into memory");
              const c = (yield R.pack).slice(x), P = new s.a(c), w = P.readUInt8(), I = 112 & w;
              let T = { 16: "commit", 32: "tree", 48: "blob", 64: "tag", 96: "ofs_delta", 112: "ref_delta" }[I];
              if (T === void 0) throw new l.a("Unrecognized type: 0b" + I.toString(2));
              const M = 15 & w;
              let A = M;
              128 & w && (A = function(H, nt) {
                let ot = nt, V = 4, it = null;
                do
                  it = H.readUInt8(), ot |= (127 & it) << V, V += 7;
                while (128 & it);
                return ot;
              }(P, M));
              let F = null, z = null;
              if (T === "ofs_delta") {
                const H = function(ot) {
                  const V = [];
                  let it = 0, lt = 0;
                  do {
                    it = ot.readUInt8();
                    const dt = 127 & it;
                    V.push(dt), lt = 128 & it;
                  } while (lt);
                  return V.reduce((dt, G) => dt + 1 << 7 | G, -1);
                }(P), nt = x - H;
                ({ object: F, type: T } = yield R.readSlice({ start: nt }));
              }
              if (T === "ref_delta") {
                const H = P.slice(20).toString("hex");
                ({ object: F, type: T } = yield R.read({ oid: H }));
              }
              const $ = c.slice(P.tell());
              if (z = n.from(yield Object(j.a)($)), z.byteLength !== A) throw new l.a(`Packfile told us object would have length ${A} but it had length ${z.byteLength}`);
              return F && (z = n.from(Object(o.a)(z, F))), R.readDepth > 3 && (R.offsetCache[x] = { type: T, object: z }), { type: T, format: "content", object: z };
            })();
          }
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      var n = t(74), u = t(75), O = t(55);
      t.d(g, "a", function() {
        return l;
      });
      class l {
        static getRemoteHelperFor({ url: s }) {
          const o = /* @__PURE__ */ new Map();
          o.set("http", O.a), o.set("https", O.a);
          const e = function({ url: j }) {
            if (j.startsWith("git@")) return { transport: "ssh", address: j };
            const E = j.match(/(\w+)(:\/\/|::)(.*)/);
            return E !== null ? E[2] === "://" ? { transport: E[1], address: E[0] } : E[2] === "::" ? { transport: E[1], address: E[3] } : void 0 : void 0;
          }({ url: s });
          if (!e) throw new u.a(s);
          if (o.has(e.transport)) return o.get(e.transport);
          throw new n.a(s, e.transport, e.transport === "ssh" ? function(j) {
            return j = (j = j.replace(/^git@([^:]+):/, "https://$1/")).replace(/^ssh:\/\//, "https://");
          }(s) : void 0);
        }
      }
    }, function(N, g, t) {
      function n({ name: u, email: O, timestamp: l, timezoneOffset: i }) {
        return `${u} <${O}> ${l} ${i = function(s) {
          const o = function(_) {
            return Math.sign(_) || (Object.is(_, -0) ? -1 : 1);
          }((e = s, e === 0 ? e : -e));
          var e;
          s = Math.abs(s);
          const j = Math.floor(s / 60);
          s -= 60 * j;
          let E = String(j), m = String(s);
          return E.length < 2 && (E = "0" + E), m.length < 2 && (m = "0" + m), (o === -1 ? "-" : "+") + E + m;
        }(i)}`;
      }
      t.d(g, "a", function() {
        return n;
      });
    }, function(N, g, t) {
      var n = t(17), u = t(18), O = t(14), l = t(7);
      function i(h, S, x, R, c, P, w) {
        try {
          var I = h[P](w), T = I.value;
        } catch (M) {
          return void x(M);
        }
        I.done ? S(T) : Promise.resolve(T).then(R, c);
      }
      function s(h) {
        return function() {
          var S = this, x = arguments;
          return new Promise(function(R, c) {
            var P = h.apply(S, x);
            function w(T) {
              i(P, R, c, w, I, "next", T);
            }
            function I(T) {
              i(P, R, c, w, I, "throw", T);
            }
            w(void 0);
          });
        };
      }
      function o(h) {
        return e.apply(this, arguments);
      }
      function e() {
        return (e = s(function* ({ fs: h, cache: S, gitdir: x, oid: R }) {
          const { type: c, object: P } = yield Object(l.a)({ fs: h, cache: S, gitdir: x, oid: R });
          if (c === "tag") return o({ fs: h, cache: S, gitdir: x, oid: R = u.a.from(P).parse().object });
          if (c !== "commit") throw new n.a(R, c, "commit");
          return { commit: O.a.from(P), oid: R };
        })).apply(this, arguments);
      }
      function j(h, S, x, R, c, P, w) {
        try {
          var I = h[P](w), T = I.value;
        } catch (M) {
          return void x(M);
        }
        I.done ? S(T) : Promise.resolve(T).then(R, c);
      }
      function E(h) {
        return function() {
          var S = this, x = arguments;
          return new Promise(function(R, c) {
            var P = h.apply(S, x);
            function w(T) {
              j(P, R, c, w, I, "next", T);
            }
            function I(T) {
              j(P, R, c, w, I, "throw", T);
            }
            w(void 0);
          });
        };
      }
      function m(h) {
        return _.apply(this, arguments);
      }
      function _() {
        return (_ = E(function* ({ fs: h, cache: S, gitdir: x, oid: R }) {
          const { commit: c, oid: P } = yield o({ fs: h, cache: S, gitdir: x, oid: R });
          return { oid: P, commit: c.parse(), payload: c.withoutSignature() };
        })).apply(this, arguments);
      }
      t.d(g, "a", function() {
        return m;
      });
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      const n = new RegExp("^refs/(heads/|tags/|remotes/)?(.*)");
      function u(O) {
        const l = n.exec(O);
        return l ? l[1] === "remotes/" && O.endsWith("/HEAD") ? l[2].slice(0, -5) : l[2] : O;
      }
    }, function(N, g, t) {
      function n(O, l, i, s, o, e, j) {
        try {
          var E = O[e](j), m = E.value;
        } catch (_) {
          return void i(_);
        }
        E.done ? l(m) : Promise.resolve(m).then(s, o);
      }
      t.d(g, "a", function() {
        return u;
      });
      class u {
        constructor() {
          this._queue = [];
        }
        write(l) {
          if (this._ended) throw Error("You cannot write to a FIFO that has already been ended!");
          if (this._waiting) {
            const i = this._waiting;
            this._waiting = null, i({ value: l });
          } else this._queue.push(l);
        }
        end() {
          if (this._ended = !0, this._waiting) {
            const l = this._waiting;
            this._waiting = null, l({ done: !0 });
          }
        }
        destroy(l) {
          this.error = l, this.end();
        }
        next() {
          var l, i = this;
          return (l = function* () {
            if (i._queue.length > 0) return { value: i._queue.shift() };
            if (i._ended) return { done: !0 };
            if (i._waiting) throw Error("You cannot call read until the previous call to read has returned!");
            return new Promise((s) => {
              i._waiting = s;
            });
          }, function() {
            var s = this, o = arguments;
            return new Promise(function(e, j) {
              var E = l.apply(s, o);
              function m(h) {
                n(E, e, j, m, _, "next", h);
              }
              function _(h) {
                n(E, e, j, m, _, "throw", h);
              }
              m(void 0);
            });
          })();
        }
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l, i) {
          super(`Remote does not support the "${l}" so the "${i}" parameter cannot be used.`), this.code = this.name = u.code, this.data = { capability: l, parameter: i };
        }
      }
      u.code = "RemoteCapabilityError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(34);
      function u(O, l, i = !0, s = !0) {
        const o = Object(n.a)(O), e = Object(n.a)(l);
        return i && o.mode !== e.mode || o.mtimeSeconds !== e.mtimeSeconds || o.ctimeSeconds !== e.ctimeSeconds || o.uid !== e.uid || o.gid !== e.gid || s && o.ino !== e.ino || o.size !== e.size;
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return j;
      });
      var n = t(60), u = t(8), O = t(17), l = t(12), i = t(7), s = t(47);
      function o(h, S, x, R, c, P, w) {
        try {
          var I = h[P](w), T = I.value;
        } catch (M) {
          return void x(M);
        }
        I.done ? S(T) : Promise.resolve(T).then(R, c);
      }
      function e(h) {
        return function() {
          var S = this, x = arguments;
          return new Promise(function(R, c) {
            var P = h.apply(S, x);
            function w(T) {
              o(P, R, c, w, I, "next", T);
            }
            function I(T) {
              o(P, R, c, w, I, "throw", T);
            }
            w(void 0);
          });
        };
      }
      function j(h) {
        return E.apply(this, arguments);
      }
      function E() {
        return (E = e(function* ({ fs: h, cache: S, gitdir: x, oid: R, filepath: c }) {
          if (c.startsWith("/")) throw new n.a("leading-slash");
          if (c.endsWith("/")) throw new n.a("trailing-slash");
          const P = R, w = yield Object(s.a)({ fs: h, cache: S, gitdir: x, oid: R }), I = w.tree;
          if (c === "") R = w.oid;
          else {
            const T = c.split("/");
            R = yield m({ fs: h, cache: S, gitdir: x, tree: I, pathArray: T, oid: P, filepath: c });
          }
          return R;
        })).apply(this, arguments);
      }
      function m(h) {
        return _.apply(this, arguments);
      }
      function _() {
        return (_ = e(function* ({ fs: h, cache: S, gitdir: x, tree: R, pathArray: c, oid: P, filepath: w }) {
          const I = c.shift();
          for (const T of R) if (T.path === I) {
            if (c.length === 0) return T.oid;
            {
              const { type: M, object: A } = yield Object(i.a)({ fs: h, cache: S, gitdir: x, oid: T.oid });
              if (M !== "tree") throw new O.a(P, M, "tree", w);
              return m({ fs: h, cache: S, gitdir: x, tree: R = l.a.from(A), pathArray: c, oid: P, filepath: w });
            }
          }
          throw new u.a(`file or directory found at "${P}:${w}"`);
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor() {
          super("Empty response from git server."), this.code = this.name = u.code, this.data = {};
        }
      }
      u.code = "EmptyServerResponseError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l) {
          super(`Could not find a fetch refspec for remote "${l}". Make sure the config file has an entry like the following:
[remote "${l}"]
	fetch = +refs/heads/*:refs/remotes/origin/*
`), this.code = this.name = u.code, this.data = { remote: l };
        }
      }
      u.code = "NoRefspecError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l, i) {
          super(`Remote did not reply using the "smart" HTTP protocol. Expected "001e# service=git-upload-pack" but received: ${l}`), this.code = this.name = u.code, this.data = { preview: l, response: i };
        }
      }
      u.code = "SmartHttpError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l, i, s) {
          super(`Git remote "${l}" uses an unrecognized transport protocol: "${i}"`), this.code = this.name = u.code, this.data = { url: l, transport: i, suggestion: s };
        }
      }
      u.code = "UnknownTransportError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l) {
          super(`Cannot parse remote URL: "${l}"`), this.code = this.name = u.code, this.data = { url: l };
        }
      }
      u.code = "UrlParseError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l) {
          super(`Modifying the index is not possible because you have unmerged files: ${l.toString}. Fix them up in the work tree, and then use 'git add/rm as appropriate to mark resolution and make a commit.`), this.code = this.name = u.code, this.data = { filepaths: l };
        }
      }
      u.code = "UnmergedPathsError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return l;
      });
      var n = t(67), u = t(9);
      function O(i, s, o, e, j, E, m) {
        try {
          var _ = i[E](m), h = _.value;
        } catch (S) {
          return void o(S);
        }
        _.done ? s(h) : Promise.resolve(h).then(e, j);
      }
      class l {
        static demux(s) {
          const o = u.a.streamReader(s), e = new n.a(), j = new n.a(), E = new n.a(), m = function() {
            var _, h = (_ = function* () {
              const S = yield o();
              if (S === null) return m();
              if (S === !0) return e.end(), E.end(), void (s.error ? j.destroy(s.error) : j.end());
              switch (S[0]) {
                case 1:
                  j.write(S.slice(1));
                  break;
                case 2:
                  E.write(S.slice(1));
                  break;
                case 3: {
                  const x = S.slice(1);
                  return E.write(x), e.end(), E.end(), void j.destroy(new Error(x.toString("utf8")));
                }
                default:
                  e.write(S);
              }
              m();
            }, function() {
              var S = this, x = arguments;
              return new Promise(function(R, c) {
                var P = _.apply(S, x);
                function w(T) {
                  O(P, R, c, w, I, "next", T);
                }
                function I(T) {
                  O(P, R, c, w, I, "throw", T);
                }
                w(void 0);
              });
            });
            return function() {
              return h.apply(this, arguments);
            };
          }();
          return m(), { packetlines: e, packfile: j, progress: E };
        }
      }
    }, function(N, g, t) {
      var n = t(148), u = t(149), O = t(119).Buffer, l = [1518500249, 1859775393, -1894007588, -899497514], i = new Array(80);
      function s() {
        this.init(), this._w = i, u.call(this, 64, 56);
      }
      function o(E) {
        return E << 5 | E >>> 27;
      }
      function e(E) {
        return E << 30 | E >>> 2;
      }
      function j(E, m, _, h) {
        return E === 0 ? m & _ | ~m & h : E === 2 ? m & _ | m & h | _ & h : m ^ _ ^ h;
      }
      n(s, u), s.prototype.init = function() {
        return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
      }, s.prototype._update = function(E) {
        for (var m, _ = this._w, h = 0 | this._a, S = 0 | this._b, x = 0 | this._c, R = 0 | this._d, c = 0 | this._e, P = 0; P < 16; ++P) _[P] = E.readInt32BE(4 * P);
        for (; P < 80; ++P) _[P] = (m = _[P - 3] ^ _[P - 8] ^ _[P - 14] ^ _[P - 16]) << 1 | m >>> 31;
        for (var w = 0; w < 80; ++w) {
          var I = ~~(w / 20), T = o(h) + j(I, S, x, R) + c + _[w] + l[I] | 0;
          c = R, R = x, x = e(S), S = h, h = T;
        }
        this._a = h + this._a | 0, this._b = S + this._b | 0, this._c = x + this._c | 0, this._d = R + this._d | 0, this._e = c + this._e | 0;
      }, s.prototype._hash = function() {
        var E = O.allocUnsafe(20);
        return E.writeInt32BE(0 | this._a, 0), E.writeInt32BE(0 | this._b, 4), E.writeInt32BE(0 | this._c, 8), E.writeInt32BE(0 | this._d, 12), E.writeInt32BE(0 | this._e, 16), E;
      }, N.exports = s;
    }, function(N, g, t) {
      function n(u) {
        let O = u > 0 ? u >> 12 : 0;
        O !== 4 && O !== 8 && O !== 10 && O !== 14 && (O = 8);
        let l = 511 & u;
        return l = 73 & l ? 493 : 420, O !== 8 && (l = 0), (O << 12) + l;
      }
      t.d(g, "a", function() {
        return n;
      });
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(4);
      class u {
        constructor({ remotePath: l, localPath: i, force: s, matchPrefix: o }) {
          Object.assign(this, { remotePath: l, localPath: i, force: s, matchPrefix: o });
        }
        static from(l) {
          const [i, s, o, e, j] = l.match(/^(\+?)(.*?)(\*?):(.*?)(\*?)$/).slice(1), E = i === "+", m = o === "*";
          if (m !== (j === "*")) throw new n.a("Invalid refspec");
          return new u({ remotePath: s, localPath: e, force: E, matchPrefix: m });
        }
        translate(l) {
          if (this.matchPrefix) {
            if (l.startsWith(this.remotePath)) return this.localPath + l.replace(this.remotePath, "");
          } else if (l === this.remotePath) return this.localPath;
          return null;
        }
        reverseTranslate(l) {
          if (this.matchPrefix) {
            if (l.startsWith(this.localPath)) return this.remotePath + l.replace(this.localPath, "");
          } else if (l === this.localPath) return this.remotePath;
          return null;
        }
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return s;
      });
      var n = t(62);
      function u(o, e, j, E, m, _, h) {
        try {
          var S = o[_](h), x = S.value;
        } catch (R) {
          return void j(R);
        }
        S.done ? e(x) : Promise.resolve(x).then(E, m);
      }
      function O(o) {
        return function() {
          var e = this, j = arguments;
          return new Promise(function(E, m) {
            var _ = o.apply(e, j);
            function h(x) {
              u(_, E, m, h, S, "next", x);
            }
            function S(x) {
              u(_, E, m, h, S, "throw", x);
            }
            h(void 0);
          });
        };
      }
      const l = Symbol("PackfileCache");
      function i() {
        return (i = O(function* ({ fs: o, filename: e, getExternalRefDelta: j, emitter: E, emitterPrefix: m }) {
          const _ = yield o.read(e);
          return n.a.fromIdx({ idx: _, getExternalRefDelta: j });
        })).apply(this, arguments);
      }
      function s({ fs: o, cache: e, filename: j, getExternalRefDelta: E, emitter: m, emitterPrefix: _ }) {
        e[l] || (e[l] = /* @__PURE__ */ new Map());
        let h = e[l].get(j);
        return h || (h = function(S) {
          return i.apply(this, arguments);
        }({ fs: o, filename: j, getExternalRefDelta: E, emitter: m, emitterPrefix: _ }), e[l].set(j, h)), h;
      }
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return i;
        });
        var u = t(88);
        function O(o, e, j, E, m, _, h) {
          try {
            var S = o[_](h), x = S.value;
          } catch (R) {
            return void j(R);
          }
          S.done ? e(x) : Promise.resolve(x).then(E, m);
        }
        function l(o) {
          return function() {
            var e = this, j = arguments;
            return new Promise(function(E, m) {
              var _ = o.apply(e, j);
              function h(x) {
                O(_, E, m, h, S, "next", x);
              }
              function S(x) {
                O(_, E, m, h, S, "throw", x);
              }
              h(void 0);
            });
          };
        }
        class i {
          constructor(e) {
            if (n === void 0) throw new Error("Missing Buffer dependency");
            this.stream = Object(u.a)(e), this.buffer = null, this.cursor = 0, this.undoCursor = 0, this.started = !1, this._ended = !1, this._discardedBytes = 0;
          }
          eof() {
            return this._ended && this.cursor === this.buffer.length;
          }
          tell() {
            return this._discardedBytes + this.cursor;
          }
          byte() {
            var e = this;
            return l(function* () {
              if (!e.eof() && (e.started || (yield e._init()), e.cursor !== e.buffer.length || (yield e._loadnext(), !e._ended))) return e._moveCursor(1), e.buffer[e.undoCursor];
            })();
          }
          chunk() {
            var e = this;
            return l(function* () {
              if (!e.eof() && (e.started || (yield e._init()), e.cursor !== e.buffer.length || (yield e._loadnext(), !e._ended))) return e._moveCursor(e.buffer.length), e.buffer.slice(e.undoCursor, e.cursor);
            })();
          }
          read(e) {
            var j = this;
            return l(function* () {
              if (!j.eof()) return j.started || (yield j._init()), j.cursor + e > j.buffer.length && (j._trim(), yield j._accumulate(e)), j._moveCursor(e), j.buffer.slice(j.undoCursor, j.cursor);
            })();
          }
          skip(e) {
            var j = this;
            return l(function* () {
              j.eof() || (j.started || (yield j._init()), j.cursor + e > j.buffer.length && (j._trim(), yield j._accumulate(e)), j._moveCursor(e));
            })();
          }
          undo() {
            var e = this;
            return l(function* () {
              e.cursor = e.undoCursor;
            })();
          }
          _next() {
            var e = this;
            return l(function* () {
              e.started = !0;
              let { done: j, value: E } = yield e.stream.next();
              return j && (e._ended = !0, !E) ? n.alloc(0) : (E && (E = n.from(E)), E);
            })();
          }
          _trim() {
            this.buffer = this.buffer.slice(this.undoCursor), this.cursor -= this.undoCursor, this._discardedBytes += this.undoCursor, this.undoCursor = 0;
          }
          _moveCursor(e) {
            this.undoCursor = this.cursor, this.cursor += e, this.cursor > this.buffer.length && (this.cursor = this.buffer.length);
          }
          _accumulate(e) {
            var j = this;
            return l(function* () {
              if (j._ended) return;
              const E = [j.buffer];
              for (; j.cursor + e > s(E); ) {
                const m = yield j._next();
                if (j._ended) break;
                E.push(m);
              }
              j.buffer = n.concat(E);
            })();
          }
          _loadnext() {
            var e = this;
            return l(function* () {
              e._discardedBytes += e.buffer.length, e.undoCursor = 0, e.cursor = 0, e.buffer = yield e._next();
            })();
          }
          _init() {
            var e = this;
            return l(function* () {
              e.buffer = yield e._next();
            })();
          }
        }
        function s(o) {
          return o.reduce((e, j) => e + j.length, 0);
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return i;
      });
      var n = t(49), u = t.n(n);
      function O(o, e, j, E, m, _, h) {
        try {
          var S = o[_](h), x = S.value;
        } catch (R) {
          return void j(R);
        }
        S.done ? e(x) : Promise.resolve(x).then(E, m);
      }
      function l(o) {
        return function() {
          var e = this, j = arguments;
          return new Promise(function(E, m) {
            var _ = o.apply(e, j);
            function h(x) {
              O(_, E, m, h, S, "next", x);
            }
            function S(x) {
              O(_, E, m, h, S, "throw", x);
            }
            h(void 0);
          });
        };
      }
      function i(o) {
        return s.apply(this, arguments);
      }
      function s() {
        return (s = l(function* (o) {
          return u.a.inflate(o);
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return s;
      });
      var n = t(49), u = t.n(n);
      function O(m, _, h, S, x, R, c) {
        try {
          var P = m[R](c), w = P.value;
        } catch (I) {
          return void h(I);
        }
        P.done ? _(w) : Promise.resolve(w).then(S, x);
      }
      function l(m) {
        return function() {
          var _ = this, h = arguments;
          return new Promise(function(S, x) {
            var R = m.apply(_, h);
            function c(w) {
              O(R, S, x, c, P, "next", w);
            }
            function P(w) {
              O(R, S, x, c, P, "throw", w);
            }
            c(void 0);
          });
        };
      }
      let i = null;
      function s(m) {
        return o.apply(this, arguments);
      }
      function o() {
        return (o = l(function* (m) {
          return i === null && (i = E()), i ? e(m) : u.a.deflate(m);
        })).apply(this, arguments);
      }
      function e(m) {
        return j.apply(this, arguments);
      }
      function j() {
        return (j = l(function* (m) {
          const _ = new CompressionStream("deflate"), h = new Blob([m]).stream().pipeThrough(_);
          return new Uint8Array(yield new Response(h).arrayBuffer());
        })).apply(this, arguments);
      }
      function E() {
        try {
          return new CompressionStream("deflate").writable.close(), new Blob([]).stream().cancel(), !0;
        } catch {
          return !1;
        }
      }
    }, function(N, g, t) {
      function n(u, ...O) {
        for (const l of O) if (l) for (const i of Object.keys(l)) {
          const s = l[i];
          s !== void 0 && (u[i] = s);
        }
        return u;
      }
      t.d(g, "a", function() {
        return n;
      });
    }, function(N, g, t) {
      (function(n) {
        function u({ username: O = "", password: l = "" }) {
          return `Basic ${n.from(`${O}:${l}`).toString("base64")}`;
        }
        t.d(g, "a", function() {
          return u;
        });
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      var n = t(71), u = t(36), O = t(9);
      function l(h, S, x, R, c, P, w) {
        try {
          var I = h[P](w), T = I.value;
        } catch (M) {
          return void x(M);
        }
        I.done ? S(T) : Promise.resolve(T).then(R, c);
      }
      function i(h) {
        return function() {
          var S = this, x = arguments;
          return new Promise(function(R, c) {
            var P = h.apply(S, x);
            function w(T) {
              l(P, R, c, w, I, "next", T);
            }
            function I(T) {
              l(P, R, c, w, I, "throw", T);
            }
            w(void 0);
          });
        };
      }
      function s(h) {
        return o.apply(this, arguments);
      }
      function o() {
        return (o = i(function* (h) {
          const S = {};
          let x;
          for (; x = yield h(), x !== !0; ) {
            if (x === null) continue;
            x = x.toString("utf8").replace(/\n$/, "");
            const R = x.indexOf("=");
            if (R > -1) {
              const c = x.slice(0, R), P = x.slice(R + 1);
              S[c] = P;
            } else S[x] = !0;
          }
          return { protocolVersion: 2, capabilities2: S };
        })).apply(this, arguments);
      }
      function e(h, S, x, R, c, P, w) {
        try {
          var I = h[P](w), T = I.value;
        } catch (M) {
          return void x(M);
        }
        I.done ? S(T) : Promise.resolve(T).then(R, c);
      }
      function j(h) {
        return function() {
          var S = this, x = arguments;
          return new Promise(function(R, c) {
            var P = h.apply(S, x);
            function w(T) {
              e(P, R, c, w, I, "next", T);
            }
            function I(T) {
              e(P, R, c, w, I, "throw", T);
            }
            w(void 0);
          });
        };
      }
      function E(h, S) {
        return m.apply(this, arguments);
      }
      function m() {
        return (m = j(function* (h, { service: S }) {
          const x = /* @__PURE__ */ new Set(), R = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), P = O.a.streamReader(h);
          let w = yield P();
          for (; w === null; ) w = yield P();
          if (w === !0) throw new n.a();
          if (w.includes("version 2")) return s(P);
          if (w.toString("utf8").replace(/\n$/, "") !== `# service=${S}`) throw new u.a(`# service=${S}\\n`, w.toString("utf8"));
          let I = yield P();
          for (; I === null; ) I = yield P();
          if (I === !0) return { capabilities: x, refs: R, symrefs: c };
          if (I = I.toString("utf8"), I.includes("version 2")) return s(P);
          const [T, M] = _(I, "\0", "\\x00");
          if (M.split(" ").map((A) => x.add(A)), T !== "0000000000000000000000000000000000000000 capabilities^{}") {
            const [A, F] = _(T, " ", " ");
            for (R.set(F, A); ; ) {
              const z = yield P();
              if (z === !0) break;
              if (z !== null) {
                const [$, H] = _(z.toString("utf8"), " ", " ");
                R.set(H, $);
              }
            }
          }
          for (const A of x) if (A.startsWith("symref=")) {
            const F = A.match(/symref=([^:]+):(.*)/);
            F.length === 3 && c.set(F[1], F[2]);
          }
          return { protocolVersion: 1, capabilities: x, refs: R, symrefs: c };
        })).apply(this, arguments);
      }
      function _(h, S, x) {
        const R = h.trim().split(S);
        if (R.length !== 2) throw new u.a(`Two strings separated by '${x}'`, h.toString("utf8"));
        return R;
      }
      t.d(g, "a", function() {
        return E;
      });
    }, function(N, g, t) {
      function n(u) {
        return u[Symbol.asyncIterator] ? u[Symbol.asyncIterator]() : u[Symbol.iterator] ? u[Symbol.iterator]() : u.next ? u : /* @__PURE__ */ function(O) {
          let l = [O];
          return { next: () => Promise.resolve({ done: l.length === 0, value: l.pop() }), return: () => (l = [], {}), [Symbol.asyncIterator]() {
            return this;
          } };
        }(u);
      }
      t.d(g, "a", function() {
        return n;
      });
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return i;
      });
      var n = t(12), u = t(15);
      function O(o, e, j, E, m, _, h) {
        try {
          var S = o[_](h), x = S.value;
        } catch (R) {
          return void j(R);
        }
        S.done ? e(x) : Promise.resolve(x).then(E, m);
      }
      function l(o) {
        return function() {
          var e = this, j = arguments;
          return new Promise(function(E, m) {
            var _ = o.apply(e, j);
            function h(x) {
              O(_, E, m, h, S, "next", x);
            }
            function S(x) {
              O(_, E, m, h, S, "throw", x);
            }
            h(void 0);
          });
        };
      }
      function i(o) {
        return s.apply(this, arguments);
      }
      function s() {
        return (s = l(function* ({ fs: o, gitdir: e, tree: j }) {
          const E = n.a.from(j).toObject();
          return yield Object(u.a)({ fs: o, gitdir: e, type: "tree", object: E, format: "content" });
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      function n(u) {
        return u.trim().split(`
`).map((O) => " " + O).join(`
`) + `
`;
      }
      t.d(g, "a", function() {
        return n;
      });
    }, function(N, g, t) {
      const n = (u, O) => function(...l) {
        return new O.promiseModule((i, s) => {
          O.multiArgs ? l.push((...o) => {
            O.errorFirst ? o[0] ? s(o) : (o.shift(), i(o)) : i(o);
          }) : O.errorFirst ? l.push((o, e) => {
            o ? s(o) : i(e);
          }) : l.push(i), u.apply(this, l);
        });
      };
      N.exports = (u, O) => {
        O = Object.assign({ exclude: [/.+(Sync|Stream)$/], errorFirst: !0, promiseModule: Promise }, O);
        const l = typeof u;
        if (u === null || l !== "object" && l !== "function") throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${u === null ? "null" : l}\``);
        const i = (o) => {
          const e = (j) => typeof j == "string" ? o === j : j.test(o);
          return O.include ? O.include.some(e) : !O.exclude.some(e);
        };
        let s;
        s = l === "function" ? function(...o) {
          return O.excludeMain ? u(...o) : n(u, O).apply(this, o);
        } : Object.create(Object.getPrototypeOf(u));
        for (const o in u) {
          const e = u[o];
          s[o] = typeof e == "function" && i(o) ? n(e, O) : e;
        }
        return s;
      };
    }, function(N, g) {
      var t, n, u = N.exports = {};
      function O() {
        throw new Error("setTimeout has not been defined");
      }
      function l() {
        throw new Error("clearTimeout has not been defined");
      }
      function i(S) {
        if (t === setTimeout) return setTimeout(S, 0);
        if ((t === O || !t) && setTimeout) return t = setTimeout, setTimeout(S, 0);
        try {
          return t(S, 0);
        } catch {
          try {
            return t.call(null, S, 0);
          } catch {
            return t.call(this, S, 0);
          }
        }
      }
      (function() {
        try {
          t = typeof setTimeout == "function" ? setTimeout : O;
        } catch {
          t = O;
        }
        try {
          n = typeof clearTimeout == "function" ? clearTimeout : l;
        } catch {
          n = l;
        }
      })();
      var s, o = [], e = !1, j = -1;
      function E() {
        e && s && (e = !1, s.length ? o = s.concat(o) : j = -1, o.length && m());
      }
      function m() {
        if (!e) {
          var S = i(E);
          e = !0;
          for (var x = o.length; x; ) {
            for (s = o, o = []; ++j < x; ) s && s[j].run();
            j = -1, x = o.length;
          }
          s = null, e = !1, function(R) {
            if (n === clearTimeout) return clearTimeout(R);
            if ((n === l || !n) && clearTimeout) return n = clearTimeout, clearTimeout(R);
            try {
              n(R);
            } catch {
              try {
                return n.call(null, R);
              } catch {
                return n.call(this, R);
              }
            }
          }(S);
        }
      }
      function _(S, x) {
        this.fun = S, this.array = x;
      }
      function h() {
      }
      u.nextTick = function(S) {
        var x = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var R = 1; R < arguments.length; R++) x[R - 1] = arguments[R];
        o.push(new _(S, x)), o.length !== 1 || e || i(m);
      }, _.prototype.run = function() {
        this.fun.apply(null, this.array);
      }, u.title = "browser", u.browser = !0, u.env = {}, u.argv = [], u.version = "", u.versions = {}, u.on = h, u.addListener = h, u.once = h, u.off = h, u.removeListener = h, u.removeAllListeners = h, u.emit = h, u.prependListener = h, u.prependOnceListener = h, u.listeners = function(S) {
        return [];
      }, u.binding = function(S) {
        throw new Error("process.binding is not supported");
      }, u.cwd = function() {
        return "/";
      }, u.chdir = function(S) {
        throw new Error("process.chdir is not supported");
      }, u.umask = function() {
        return 0;
      };
    }, function(N, g, t) {
      t.r(g);
      var n = t(26);
      t.d(g, "AlreadyExistsError", function() {
        return n.a;
      });
      var u = t(97);
      t.d(g, "AmbiguousError", function() {
        return u.a;
      });
      var O = t(98);
      t.d(g, "CheckoutConflictError", function() {
        return O.a;
      });
      var l = t(99);
      t.d(g, "CommitNotFetchedError", function() {
        return l.a;
      });
      var i = t(71);
      t.d(g, "EmptyServerResponseError", function() {
        return i.a;
      });
      var s = t(100);
      t.d(g, "FastForwardError", function() {
        return s.a;
      });
      var o = t(101);
      t.d(g, "GitPushError", function() {
        return o.a;
      });
      var e = t(59);
      t.d(g, "HttpError", function() {
        return e.a;
      });
      var j = t(4);
      t.d(g, "InternalError", function() {
        return j.a;
      });
      var E = t(60);
      t.d(g, "InvalidFilepathError", function() {
        return E.a;
      });
      var m = t(32);
      t.d(g, "InvalidOidError", function() {
        return m.a;
      });
      var _ = t(28);
      t.d(g, "InvalidRefNameError", function() {
        return _.a;
      });
      var h = t(102);
      t.d(g, "MaxDepthError", function() {
        return h.a;
      });
      var S = t(56);
      t.d(g, "MergeNotSupportedError", function() {
        return S.a;
      });
      var x = t(57);
      t.d(g, "MergeConflictError", function() {
        return x.a;
      });
      var R = t(21);
      t.d(g, "MissingNameError", function() {
        return R.a;
      });
      var c = t(24);
      t.d(g, "MissingParameterError", function() {
        return c.a;
      });
      var P = t(103);
      t.d(g, "MultipleGitError", function() {
        return P.a;
      });
      var w = t(72);
      t.d(g, "NoRefspecError", function() {
        return w.a;
      });
      var I = t(8);
      t.d(g, "NotFoundError", function() {
        return I.a;
      });
      var T = t(17);
      t.d(g, "ObjectTypeError", function() {
        return T.a;
      });
      var M = t(36);
      t.d(g, "ParseError", function() {
        return M.a;
      });
      var A = t(94);
      t.d(g, "PushRejectedError", function() {
        return A.a;
      });
      var F = t(68);
      t.d(g, "RemoteCapabilityError", function() {
        return F.a;
      });
      var z = t(73);
      t.d(g, "SmartHttpError", function() {
        return z.a;
      });
      var $ = t(74);
      t.d(g, "UnknownTransportError", function() {
        return $.a;
      });
      var H = t(46);
      t.d(g, "UnsafeFilepathError", function() {
        return H.a;
      });
      var nt = t(75);
      t.d(g, "UrlParseError", function() {
        return nt.a;
      });
      var ot = t(58);
      t.d(g, "UserCanceledError", function() {
        return ot.a;
      });
      var V = t(76);
      t.d(g, "UnmergedPathsError", function() {
        return V.a;
      });
      var it = t(104);
      t.d(g, "IndexResetError", function() {
        return it.a;
      });
      var lt = t(105);
      t.d(g, "NoCommitError", function() {
        return lt.a;
      });
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l) {
          let i = "";
          l === "not-fast-forward" ? i = " because it was not a simple fast-forward" : l === "tag-exists" && (i = " because tag already exists"), super(`Push rejected${i}. Use "force: true" to override.`), this.code = this.name = u.code, this.data = { reason: l };
        }
      }
      u.code = "PushRejectedError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return x;
      });
      var n = t(21), u = t(24), O = t(105), l = t(13), i = t(3), s = t(14), o = t(12), e = t(15), j = t(107), E = t(29), m = t(43), _ = t(65);
      function h(w, I, T, M, A, F, z) {
        try {
          var $ = w[F](z), H = $.value;
        } catch (nt) {
          return void T(nt);
        }
        $.done ? I(H) : Promise.resolve(H).then(M, A);
      }
      function S(w) {
        return function() {
          var I = this, T = arguments;
          return new Promise(function(M, A) {
            var F = w.apply(I, T);
            function z(H) {
              h(F, M, A, z, $, "next", H);
            }
            function $(H) {
              h(F, M, A, z, $, "throw", H);
            }
            z(void 0);
          });
        };
      }
      function x(w) {
        return R.apply(this, arguments);
      }
      function R() {
        return (R = S(function* ({ fs: w, cache: I, onSign: T, gitdir: M, message: A, author: F, committer: z, signingKey: $, amend: H = !1, dryRun: nt = !1, noUpdateBranch: ot = !1, ref: V, parent: it, tree: lt }) {
          let dt, G, Z = !1;
          V || (V = yield i.a.resolve({ fs: w, gitdir: M, ref: "HEAD", depth: 2 }));
          try {
            dt = yield i.a.resolve({ fs: w, gitdir: M, ref: V }), G = yield Object(_.a)({ fs: w, gitdir: M, oid: dt, cache: {} });
          } catch {
            Z = !0;
          }
          if (H && Z) throw new O.a(V);
          const ut = H ? yield Object(E.a)({ fs: w, gitdir: M, author: F, commit: G.commit }) : yield Object(E.a)({ fs: w, gitdir: M, author: F });
          if (!ut) throw new n.a("author");
          const pt = H ? yield Object(m.a)({ fs: w, gitdir: M, author: ut, committer: z, commit: G.commit }) : yield Object(m.a)({ fs: w, gitdir: M, author: ut, committer: z });
          if (!pt) throw new n.a("committer");
          return l.a.acquire({ fs: w, gitdir: M, cache: I, allowUnmerged: !1 }, function() {
            var st = S(function* (mt) {
              const bt = Object(j.a)(mt.entries).get(".");
              if (lt || (lt = yield c({ fs: w, gitdir: M, inode: bt, dryRun: nt })), it = it ? yield Promise.all(it.map((U) => i.a.resolve({ fs: w, gitdir: M, ref: U }))) : H ? G.commit.parent : dt ? [dt] : [], !A) {
                if (!H) throw new u.a("message");
                A = G.commit.message;
              }
              let wt = s.a.from({ tree: lt, parent: it, author: ut, committer: pt, message: A });
              $ && (wt = yield s.a.sign(wt, T, $));
              const C = yield Object(e.a)({ fs: w, gitdir: M, type: "commit", object: wt.toObject(), dryRun: nt });
              return ot || nt || (yield i.a.writeRef({ fs: w, gitdir: M, ref: V, value: C })), C;
            });
            return function(mt) {
              return st.apply(this, arguments);
            };
          }());
        })).apply(this, arguments);
      }
      function c(w) {
        return P.apply(this, arguments);
      }
      function P() {
        return (P = S(function* ({ fs: w, gitdir: I, inode: T, dryRun: M }) {
          const A = T.children;
          for (const $ of A) $.type === "tree" && ($.metadata.mode = "040000", $.metadata.oid = yield c({ fs: w, gitdir: I, inode: $, dryRun: M }));
          const F = A.map(($) => ({ mode: $.metadata.mode, path: $.basename, oid: $.metadata.oid, type: $.type })), z = o.a.from(F);
          return yield Object(e.a)({ fs: w, gitdir: I, type: "tree", object: z.toObject(), dryRun: M });
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      N.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l, i, s) {
          super(`Found multiple ${l} matching "${i}" (${s.join(", ")}). Use a longer abbreviation length to disambiguate them.`), this.code = this.name = u.code, this.data = { nouns: l, short: i, matches: s };
        }
      }
      u.code = "AmbiguousError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l) {
          super(`Your local changes to the following files would be overwritten by checkout: ${l.join(", ")}`), this.code = this.name = u.code, this.data = { filepaths: l };
        }
      }
      u.code = "CheckoutConflictError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l, i) {
          super(`Failed to checkout "${l}" because commit ${i} is not available locally. Do a git fetch to make the branch available locally.`), this.code = this.name = u.code, this.data = { ref: l, oid: i };
        }
      }
      u.code = "CommitNotFetchedError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor() {
          super("A simple fast-forward merge was not possible."), this.code = this.name = u.code, this.data = {};
        }
      }
      u.code = "FastForwardError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l, i) {
          super(`One or more branches were not updated: ${l}`), this.code = this.name = u.code, this.data = { prettyDetails: l, result: i };
        }
      }
      u.code = "GitPushError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l) {
          super(`Maximum search depth of ${l} exceeded.`), this.code = this.name = u.code, this.data = { depth: l };
        }
      }
      u.code = "MaxDepthError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l) {
          super('There are multiple errors that were thrown by the method. Please refer to the "errors" property to see more'), this.code = this.name = u.code, this.data = { errors: l }, this.errors = l;
        }
      }
      u.code = "MultipleGitError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l) {
          super(`Could not merge index: Entry for '${l}' is not up to date. Either reset the index entry to HEAD, or stage your unstaged changes.`), this.code = this.name = u.code, this.data = { filepath: l };
        }
      }
      u.code = "IndexResetError";
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(1);
      class u extends n.a {
        constructor(l) {
          super(`"${l}" does not point to any commit. You're maybe working on a repository with no commits yet. `), this.code = this.name = u.code, this.data = { ref: l };
        }
      }
      u.code = "NoCommitError";
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return E;
        });
        var u = t(4), O = t(46), l = t(20), i = t(61), s = t(34), o = t(19);
        function e(m, _, h, S, x, R, c) {
          try {
            var P = m[R](c), w = P.value;
          } catch (I) {
            return void h(I);
          }
          P.done ? _(w) : Promise.resolve(w).then(S, x);
        }
        function j(m) {
          return function() {
            var _ = this, h = arguments;
            return new Promise(function(S, x) {
              var R = m.apply(_, h);
              function c(w) {
                e(R, S, x, c, P, "next", w);
              }
              function P(w) {
                e(R, S, x, c, P, "throw", w);
              }
              c(void 0);
            });
          };
        }
        class E {
          constructor(_, h) {
            this._dirty = !1, this._unmergedPaths = h || /* @__PURE__ */ new Set(), this._entries = _ || /* @__PURE__ */ new Map();
          }
          _addEntry(_) {
            if (_.flags.stage === 0) _.stages = [_], this._entries.set(_.path, _), this._unmergedPaths.delete(_.path);
            else {
              let h = this._entries.get(_.path);
              h || (this._entries.set(_.path, _), h = _), h.stages[_.flags.stage] = _, this._unmergedPaths.add(_.path);
            }
          }
          static from(_) {
            return j(function* () {
              if (n.isBuffer(_)) return E.fromBuffer(_);
              if (_ === null) return new E(null);
              throw new u.a("invalid type passed to GitIndex.from");
            })();
          }
          static fromBuffer(_) {
            return j(function* () {
              if (_.length === 0) throw new u.a("Index file is empty (.git/index)");
              const h = new E(), S = new l.a(_), x = S.toString("utf8", 4);
              if (x !== "DIRC") throw new u.a(`Invalid dircache magic file number: ${x}`);
              const R = yield Object(o.a)(_.slice(0, -20)), c = _.slice(-20).toString("hex");
              if (c !== R) throw new u.a(`Invalid checksum in GitIndex buffer: expected ${c} but saw ${R}`);
              const P = S.readUInt32BE();
              if (P !== 2) throw new u.a(`Unsupported dircache version: ${P}`);
              const w = S.readUInt32BE();
              let I = 0;
              for (; !S.eof() && I < w; ) {
                const M = {};
                M.ctimeSeconds = S.readUInt32BE(), M.ctimeNanoseconds = S.readUInt32BE(), M.mtimeSeconds = S.readUInt32BE(), M.mtimeNanoseconds = S.readUInt32BE(), M.dev = S.readUInt32BE(), M.ino = S.readUInt32BE(), M.mode = S.readUInt32BE(), M.uid = S.readUInt32BE(), M.gid = S.readUInt32BE(), M.size = S.readUInt32BE(), M.oid = S.slice(20).toString("hex");
                const A = S.readUInt16BE();
                M.flags = (T = A, { assumeValid: !!(32768 & T), extended: !!(16384 & T), stage: (12288 & T) >> 12, nameLength: 4095 & T });
                const F = _.indexOf(0, S.tell() + 1) - S.tell();
                if (F < 1) throw new u.a(`Got a path length of: ${F}`);
                if (M.path = S.toString("utf8", F), M.path.includes("..\\") || M.path.includes("../")) throw new O.a(M.path);
                let z = 8 - (S.tell() - 12) % 8;
                for (z === 0 && (z = 8); z--; ) {
                  const $ = S.readUInt8();
                  if ($ !== 0) throw new u.a(`Expected 1-8 null characters but got '${$}' after ${M.path}`);
                  if (S.eof()) throw new u.a("Unexpected end of file");
                }
                M.stages = [], h._addEntry(M), I++;
              }
              var T;
              return h;
            })();
          }
          get unmergedPaths() {
            return [...this._unmergedPaths];
          }
          get entries() {
            return [...this._entries.values()].sort(i.a);
          }
          get entriesMap() {
            return this._entries;
          }
          get entriesFlat() {
            return [...this.entries].flatMap((_) => _.stages.length > 1 ? _.stages.filter((h) => h) : _);
          }
          *[Symbol.iterator]() {
            for (const _ of this.entries) yield _;
          }
          insert({ filepath: _, stats: h, oid: S, stage: x = 0 }) {
            h || (h = { ctimeSeconds: 0, ctimeNanoseconds: 0, mtimeSeconds: 0, mtimeNanoseconds: 0, dev: 0, ino: 0, mode: 0, uid: 0, gid: 0, size: 0 }), h = Object(s.a)(h);
            const R = n.from(_), c = { ctimeSeconds: h.ctimeSeconds, ctimeNanoseconds: h.ctimeNanoseconds, mtimeSeconds: h.mtimeSeconds, mtimeNanoseconds: h.mtimeNanoseconds, dev: h.dev, ino: h.ino, mode: h.mode || 33188, uid: h.uid, gid: h.gid, size: h.size, path: _, oid: S, flags: { assumeValid: !1, extended: !1, stage: x, nameLength: R.length < 4095 ? R.length : 4095 }, stages: [] };
            this._addEntry(c), this._dirty = !0;
          }
          delete({ filepath: _ }) {
            if (this._entries.has(_)) this._entries.delete(_);
            else for (const h of this._entries.keys()) h.startsWith(_ + "/") && this._entries.delete(h);
            this._unmergedPaths.has(_) && this._unmergedPaths.delete(_), this._dirty = !0;
          }
          clear() {
            this._entries.clear(), this._dirty = !0;
          }
          has({ filepath: _ }) {
            return this._entries.has(_);
          }
          render() {
            return this.entries.map((_) => `${_.mode.toString(8)} ${_.oid}    ${_.path}`).join(`
`);
          }
          static _entryToBuffer(_) {
            return j(function* () {
              const h = n.from(_.path), S = 8 * Math.ceil((62 + h.length + 1) / 8), x = n.alloc(S), R = new l.a(x), c = Object(s.a)(_);
              return R.writeUInt32BE(c.ctimeSeconds), R.writeUInt32BE(c.ctimeNanoseconds), R.writeUInt32BE(c.mtimeSeconds), R.writeUInt32BE(c.mtimeNanoseconds), R.writeUInt32BE(c.dev), R.writeUInt32BE(c.ino), R.writeUInt32BE(c.mode), R.writeUInt32BE(c.uid), R.writeUInt32BE(c.gid), R.writeUInt32BE(c.size), R.write(_.oid, 20, "hex"), R.writeUInt16BE(function(P) {
                const w = P.flags;
                return w.extended = !1, w.nameLength = Math.min(n.from(P.path).length, 4095), (w.assumeValid ? 32768 : 0) + (w.extended ? 16384 : 0) + ((3 & w.stage) << 12) + (4095 & w.nameLength);
              }(_)), R.write(_.path, h.length, "utf8"), x;
            })();
          }
          toObject() {
            var _ = this;
            return j(function* () {
              const h = n.alloc(12), S = new l.a(h);
              S.write("DIRC", 4, "utf8"), S.writeUInt32BE(2), S.writeUInt32BE(_.entriesFlat.length);
              let x = [];
              for (const w of _.entries) if (x.push(E._entryToBuffer(w)), w.stages.length > 1) for (const I of w.stages) I && I !== w && x.push(E._entryToBuffer(I));
              x = yield Promise.all(x);
              const R = n.concat(x), c = n.concat([h, R]), P = yield Object(o.a)(c);
              return n.concat([c, n.from(P, "hex")]);
            })();
          }
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return O;
      });
      var n = t(40), u = t(27);
      function O(l) {
        const i = /* @__PURE__ */ new Map(), s = function(e) {
          if (!i.has(e)) {
            const j = { type: "tree", fullpath: e, basename: Object(n.a)(e), metadata: {}, children: [] };
            i.set(e, j), j.parent = s(Object(u.a)(e)), j.parent && j.parent !== j && j.parent.children.push(j);
          }
          return i.get(e);
        }, o = function(e, j) {
          if (!i.has(e)) {
            const E = { type: "blob", fullpath: e, basename: Object(n.a)(e), metadata: j, parent: s(Object(u.a)(e)), children: [] };
            E.parent && E.parent.children.push(E), i.set(e, E);
          }
          return i.get(e);
        };
        s(".");
        for (const e of l) o(e.path, e);
        return i;
      }
    }, function(N, g, t) {
      function n(c, P, w, I, T, M, A) {
        try {
          var F = c[M](A), z = F.value;
        } catch ($) {
          return void w($);
        }
        F.done ? P(z) : Promise.resolve(z).then(I, T);
      }
      function u(c) {
        return function() {
          var P = this, w = arguments;
          return new Promise(function(I, T) {
            var M = c.apply(P, w);
            function A(z) {
              n(M, I, T, A, F, "next", z);
            }
            function F(z) {
              n(M, I, T, A, F, "throw", z);
            }
            A(void 0);
          });
        };
      }
      t.d(g, "a", function() {
        return R;
      });
      const O = (c) => {
        if ((c = c.trim().toLowerCase()) === "true" || c === "yes" || c === "on") return !0;
        if (c === "false" || c === "no" || c === "off") return !1;
        throw Error(`Expected 'true', 'false', 'yes', 'no', 'on', or 'off', but got ${c}`);
      }, l = { core: { filemode: O, bare: O, logallrefupdates: O, symlinks: O, ignorecase: O, bigFileThreshold: (c) => {
        c = c.toLowerCase();
        let P = parseInt(c);
        return c.endsWith("k") && (P *= 1024), c.endsWith("m") && (P *= 1048576), c.endsWith("g") && (P *= 1073741824), P;
      } } }, i = /^\[([A-Za-z0-9-.]+)(?: "(.*)")?\]$/, s = /^[A-Za-z0-9-.]+$/, o = /^([A-Za-z][A-Za-z-]*)(?: *= *(.*))?$/, e = /^[A-Za-z][A-Za-z-]*$/, j = /^(.*?)( *[#;].*)$/, E = (c) => {
        const P = j.exec(c);
        if (P == null) return c;
        const [w, I] = P.slice(1);
        return m(w) && m(I) ? `${w}${I}` : w;
      }, m = (c) => (c.match(/(?:^|[^\\])"/g) || []).length % 2 != 0, _ = (c) => c.split("").reduce((P, w, I, T) => {
        const M = w === '"' && T[I - 1] !== "\\", A = w === "\\" && T[I + 1] === '"';
        return M || A ? P : P + w;
      }, ""), h = (c) => c != null ? c.toLowerCase() : null, S = (c, P, w) => [h(c), P, h(w)].filter((I) => I != null).join("."), x = (c) => {
        const P = c.split("."), w = P.shift(), I = P.pop(), T = P.length ? P.join(".") : void 0;
        return { section: w, subsection: T, name: I, path: S(w, T, I), sectionPath: S(w, T, null) };
      };
      class R {
        constructor(P) {
          let w = null, I = null;
          this.parsedConfig = P ? P.split(`
`).map((T) => {
            let M = null, A = null;
            const F = T.trim(), z = ((nt) => {
              const ot = i.exec(nt);
              if (ot != null) {
                const [V, it] = ot.slice(1);
                return [V, it];
              }
              return null;
            })(F), $ = z != null;
            if ($) [w, I] = z;
            else {
              const nt = ((ot) => {
                const V = o.exec(ot);
                if (V != null) {
                  const [it, lt = "true"] = V.slice(1), dt = E(lt);
                  return [it, _(dt)];
                }
                return null;
              })(F);
              nt != null && ([M, A] = nt);
            }
            const H = S(w, I, M);
            return { line: T, isSection: $, section: w, subsection: I, name: M, value: A, path: H };
          }) : [];
        }
        static from(P) {
          return new R(P);
        }
        get(P, w = !1) {
          var I = this;
          return u(function* () {
            const T = x(P).path, M = I.parsedConfig.filter((A) => A.path === T).map(({ section: A, name: F, value: z }) => {
              const $ = l[A] && l[A][F];
              return $ ? $(z) : z;
            });
            return w ? M : M.pop();
          })();
        }
        getall(P) {
          var w = this;
          return u(function* () {
            return w.get(P, !0);
          })();
        }
        getSubsections(P) {
          var w = this;
          return u(function* () {
            return w.parsedConfig.filter((I) => I.section === P && I.isSection).map((I) => I.subsection);
          })();
        }
        deleteSection(P, w) {
          var I = this;
          return u(function* () {
            I.parsedConfig = I.parsedConfig.filter((T) => !(T.section === P && T.subsection === w));
          })();
        }
        append(P, w) {
          var I = this;
          return u(function* () {
            return I.set(P, w, !0);
          })();
        }
        set(P, w, I = !1) {
          var T = this;
          return u(function* () {
            const { section: M, subsection: A, name: F, path: z, sectionPath: $ } = x(P), H = (nt = T.parsedConfig, ot = (V) => V.path === z, nt.reduce((V, it, lt) => ot(it) ? lt : V, -1));
            var nt, ot;
            if (w == null) H !== -1 && T.parsedConfig.splice(H, 1);
            else if (H !== -1) {
              const V = T.parsedConfig[H], it = Object.assign({}, V, { name: F, value: w, modified: !0 });
              I ? T.parsedConfig.splice(H + 1, 0, it) : T.parsedConfig[H] = it;
            } else {
              const V = T.parsedConfig.findIndex((lt) => lt.path === $), it = { section: M, subsection: A, name: F, value: w, modified: !0, path: z };
              if (s.test(M) && e.test(F)) if (V >= 0) T.parsedConfig.splice(V + 1, 0, it);
              else {
                const lt = { section: M, subsection: A, modified: !0, path: $ };
                T.parsedConfig.push(lt, it);
              }
            }
          })();
        }
        toString() {
          return this.parsedConfig.map(({ line: P, section: w, subsection: I, name: T, value: M, modified: A = !1 }) => A ? T != null && M != null ? typeof M == "string" && /[#;]/.test(M) ? `	${T} = "${M}"` : `	${T} = ${M}` : I != null ? `[${w} "${I}"]` : `[${w}]` : P).join(`
`);
        }
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(80);
      class u {
        constructor(l = []) {
          this.rules = l;
        }
        static from(l) {
          const i = [];
          for (const s of l) i.push(n.a.from(s));
          return new u(i);
        }
        add(l) {
          const i = n.a.from(l);
          this.rules.push(i);
        }
        translate(l) {
          const i = [];
          for (const s of this.rules) for (const o of l) {
            const e = s.translate(o);
            e && i.push([o, e]);
          }
          return i;
        }
        translateOne(l) {
          let i = null;
          for (const s of this.rules) {
            const o = s.translate(l);
            o && (i = o);
          }
          return i;
        }
        localNamespaces() {
          return this.rules.filter((l) => l.matchPrefix).map((l) => l.localPath.replace(/\/$/, ""));
        }
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return s;
      });
      var n = t(4), u = t(81), O = t(16);
      function l(e, j, E, m, _, h, S) {
        try {
          var x = e[h](S), R = x.value;
        } catch (c) {
          return void E(c);
        }
        x.done ? j(R) : Promise.resolve(R).then(m, _);
      }
      function i(e) {
        return function() {
          var j = this, E = arguments;
          return new Promise(function(m, _) {
            var h = e.apply(j, E);
            function S(R) {
              l(h, m, _, S, x, "next", R);
            }
            function x(R) {
              l(h, m, _, S, x, "throw", R);
            }
            S(void 0);
          });
        };
      }
      function s(e) {
        return o.apply(this, arguments);
      }
      function o() {
        return (o = i(function* ({ fs: e, cache: j, gitdir: E, oid: m, format: _ = "content", getExternalRefDelta: h }) {
          let S = yield e.readdir(Object(O.join)(E, "objects/pack"));
          S = S.filter((x) => x.endsWith(".idx"));
          for (const x of S) {
            const R = `${E}/objects/pack/${x}`, c = yield Object(u.a)({ fs: e, cache: j, filename: R, getExternalRefDelta: h });
            if (c.error) throw new n.a(c.error);
            if (c.offsets.has(m)) {
              if (!c.pack) {
                const w = R.replace(/idx$/, "pack");
                c.pack = e.read(w);
              }
              const P = yield c.read({ oid: m, getExternalRefDelta: h });
              return P.format = "content", P.source = `objects/pack/${x.replace(/idx$/, "pack")}`, P;
            }
          }
          return null;
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return l;
      });
      var n = t(139), u = t.n(n);
      const O = /^.*(\r?\n|$)/gm;
      function l({ branches: i, contents: s }) {
        const o = i[1], e = i[2], j = s[0], E = s[1], m = s[2], _ = E.match(O), h = j.match(O), S = m.match(O), x = u()(_, h, S);
        let R = "", c = !0;
        for (const P of x) P.ok && (R += P.ok.join("")), P.conflict && (c = !1, R += `${"<".repeat(7)} ${o}
`, R += P.conflict.a.join(""), R += `${"=".repeat(7)}
`, R += P.conflict.b.join(""), R += `${">".repeat(7)} ${e}
`);
        return { cleanMerge: c, mergedText: R };
      }
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return m;
        });
        var u = t(78), O = t.n(u), l = t(140), i = t(7), s = t(84), o = t(16), e = t(50);
        function j(h, S, x, R, c, P, w) {
          try {
            var I = h[P](w), T = I.value;
          } catch (M) {
            return void x(M);
          }
          I.done ? S(T) : Promise.resolve(T).then(R, c);
        }
        function E(h) {
          return function() {
            var S = this, x = arguments;
            return new Promise(function(R, c) {
              var P = h.apply(S, x);
              function w(T) {
                j(P, R, c, w, I, "next", T);
              }
              function I(T) {
                j(P, R, c, w, I, "throw", T);
              }
              w(void 0);
            });
          };
        }
        function m(h) {
          return _.apply(this, arguments);
        }
        function _() {
          return (_ = E(function* ({ fs: h, cache: S, dir: x, gitdir: R = Object(o.join)(x, ".git"), oids: c }) {
            const P = new O.a(), w = [];
            function I(F, z) {
              const $ = n.from(F, z);
              w.push($), P.update($);
            }
            function T(F) {
              return M.apply(this, arguments);
            }
            function M() {
              return (M = E(function* ({ stype: F, object: z }) {
                const $ = l.a[F];
                let H = z.length, nt = H > 15 ? 128 : 0;
                const ot = 15 & H;
                H >>>= 4;
                let V = (nt | $ | ot).toString(16);
                for (I(V, "hex"); nt; ) nt = H > 127 ? 128 : 0, V = nt | 127 & H, I(Object(e.a)(2, V), "hex"), H >>>= 7;
                I(n.from(yield Object(s.a)(z)));
              })).apply(this, arguments);
            }
            I("PACK"), I("00000002", "hex"), I(Object(e.a)(8, c.length), "hex");
            for (const F of c) {
              const { type: z, object: $ } = yield Object(i.a)({ fs: h, cache: S, gitdir: R, oid: F });
              yield T({ write: I, object: $, stype: z });
            }
            const A = P.digest();
            return w.push(A), w;
          })).apply(this, arguments);
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      function n(i, s, o, e, j, E, m) {
        try {
          var _ = i[E](m), h = _.value;
        } catch (S) {
          return void o(S);
        }
        _.done ? s(h) : Promise.resolve(h).then(e, j);
      }
      function u(i) {
        return function() {
          var s = this, o = arguments;
          return new Promise(function(e, j) {
            var E = i.apply(s, o);
            function m(h) {
              n(E, e, j, m, _, "next", h);
            }
            function _(h) {
              n(E, e, j, m, _, "throw", h);
            }
            m(void 0);
          });
        };
      }
      function O(i) {
        return l.apply(this, arguments);
      }
      function l() {
        return (l = u(function* ({ fs: i, gitdir: s, oid: o }) {
          const e = `objects/${o.slice(0, 2)}/${o.slice(2)}`, j = yield i.read(`${s}/${e}`);
          return j ? { object: j, format: "deflated", source: e } : null;
        })).apply(this, arguments);
      }
      t.d(g, "a", function() {
        return O;
      });
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return n;
      });
      const n = Array.prototype.flat === void 0 ? (u) => u.reduce((O, l) => O.concat(l), []) : (u) => u.flat();
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return e;
      });
      var n = t(18), u = t(14), O = t(12), l = t(7), i = t(16);
      function s(E, m, _, h, S, x, R) {
        try {
          var c = E[x](R), P = c.value;
        } catch (w) {
          return void _(w);
        }
        c.done ? m(P) : Promise.resolve(P).then(h, S);
      }
      function o(E) {
        return function() {
          var m = this, _ = arguments;
          return new Promise(function(h, S) {
            var x = E.apply(m, _);
            function R(P) {
              s(x, h, S, R, c, "next", P);
            }
            function c(P) {
              s(x, h, S, R, c, "throw", P);
            }
            R(void 0);
          });
        };
      }
      function e(E) {
        return j.apply(this, arguments);
      }
      function j() {
        return (j = o(function* ({ fs: E, cache: m, dir: _, gitdir: h = Object(i.join)(_, ".git"), oids: S }) {
          const x = /* @__PURE__ */ new Set();
          function R(P) {
            return c.apply(this, arguments);
          }
          function c() {
            return (c = o(function* (P) {
              if (x.has(P)) return;
              x.add(P);
              const { type: w, object: I } = yield Object(l.a)({ fs: E, cache: m, gitdir: h, oid: P });
              if (w === "tag") {
                const T = n.a.from(I).headers().object;
                yield R(T);
              } else if (w === "commit") {
                const T = u.a.from(I).headers().tree;
                yield R(T);
              } else if (w === "tree") {
                const T = O.a.from(I);
                for (const M of T) M.type === "blob" && x.add(M.oid), M.type === "tree" && (yield R(M.oid));
              }
            })).apply(this, arguments);
          }
          for (const P of S) yield R(P);
          return x;
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return l;
      });
      var n = t(16);
      function u(s, o, e, j, E, m, _) {
        try {
          var h = s[m](_), S = h.value;
        } catch (x) {
          return void e(x);
        }
        h.done ? o(S) : Promise.resolve(S).then(j, E);
      }
      function O(s) {
        return function() {
          var o = this, e = arguments;
          return new Promise(function(j, E) {
            var m = s.apply(o, e);
            function _(S) {
              u(m, j, E, _, h, "next", S);
            }
            function h(S) {
              u(m, j, E, _, h, "throw", S);
            }
            _(void 0);
          });
        };
      }
      function l(s, o) {
        return i.apply(this, arguments);
      }
      function i() {
        return (i = O(function* (s, o) {
          const e = yield s.readdir(o);
          e == null ? yield s.rm(o) : e.length ? yield Promise.all(e.map((j) => {
            const E = Object(n.join)(o, j);
            return s.lstat(E).then((m) => {
              if (m) return m.isDirectory() ? l(s, E) : s.rm(E);
            });
          })).then(() => s.rmdir(o)) : yield s.rmdir(o);
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      function n(u) {
        let O = u.match(/^https?:\/\/([^/]+)@/);
        if (O == null) return { url: u, auth: {} };
        O = O[1];
        const [l, i] = O.split(":");
        return { url: u = u.replace(`${O}@`, ""), auth: { username: l, password: i } };
      }
      t.d(g, "a", function() {
        return n;
      });
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return z;
        });
        var u = t(35), O = t(24), l = t(68), i = t(11), s = t(3), o = t(63), e = t(44), j = t(14), E = t(62), m = t(161), _ = t(7), h = t(66), S = t(52), x = t(164), R = t(141), c = t(39), P = t(16), w = t(48), I = t(142), T = t(126), M = t(125);
        function A(H, nt, ot, V, it, lt, dt) {
          try {
            var G = H[lt](dt), Z = G.value;
          } catch (ut) {
            return void ot(ut);
          }
          G.done ? nt(Z) : Promise.resolve(Z).then(V, it);
        }
        function F(H) {
          return function() {
            var nt = this, ot = arguments;
            return new Promise(function(V, it) {
              var lt = H.apply(nt, ot);
              function dt(Z) {
                A(lt, V, it, dt, G, "next", Z);
              }
              function G(Z) {
                A(lt, V, it, dt, G, "throw", Z);
              }
              dt(void 0);
            });
          };
        }
        function z(H) {
          return $.apply(this, arguments);
        }
        function $() {
          return ($ = F(function* ({ fs: H, cache: nt, http: ot, onProgress: V, onMessage: it, onAuth: lt, onAuthSuccess: dt, onAuthFailure: G, gitdir: Z, ref: ut, remoteRef: pt, remote: st, url: mt, corsProxy: bt, depth: wt = null, since: C = null, exclude: U = [], relative: L = !1, tags: K = !1, singleBranch: X = !1, headers: rt = {}, prune: yt = !1, pruneTags: jt = !1 }) {
            const Rt = ut || (yield Object(u.a)({ fs: H, gitdir: Z, test: !0 })), Tt = yield i.a.get({ fs: H, gitdir: Z }), Et = st || Rt && (yield Tt.get(`branch.${Rt}.remote`)) || "origin", Wt = mt || (yield Tt.get(`remote.${Et}.url`));
            if (Wt === void 0) throw new O.a("remote OR url");
            const Vt = pt || Rt && (yield Tt.get(`branch.${Rt}.merge`)) || ut || "HEAD";
            bt === void 0 && (bt = yield Tt.get("http.corsProxy"));
            const re = o.a.getRemoteHelperFor({ url: Wt }), vt = yield re.discover({ http: ot, onAuth: lt, onAuthSuccess: dt, onAuthFailure: G, corsProxy: bt, service: "git-upload-pack", url: Wt, headers: rt, protocolVersion: 1 }), Zt = vt.auth, Dt = vt.refs;
            if (Dt.size === 0) return { defaultBranch: null, fetchHead: null, fetchHeadDescription: null };
            if (wt !== null && !vt.capabilities.has("shallow")) throw new l.a("shallow", "depth");
            if (C !== null && !vt.capabilities.has("deepen-since")) throw new l.a("deepen-since", "since");
            if (U.length > 0 && !vt.capabilities.has("deepen-not")) throw new l.a("deepen-not", "exclude");
            if (L === !0 && !vt.capabilities.has("deepen-relative")) throw new l.a("deepen-relative", "relative");
            const { oid: qt, fullref: pe } = s.a.resolveAgainstMap({ ref: Vt, map: Dt });
            for (const xt of Dt.keys()) xt === pe || xt === "HEAD" || xt.startsWith("refs/heads/") || K && xt.startsWith("refs/tags/") || Dt.delete(xt);
            const Ce = Object(R.a)([...vt.capabilities], ["multi_ack_detailed", "no-done", "side-band-64k", "ofs-delta", `agent=${w.a.agent}`]);
            L && Ce.push("deepen-relative");
            const oe = X ? [qt] : Dt.values(), De = X ? [Rt] : yield s.a.listRefs({ fs: H, gitdir: Z, filepath: "refs" });
            let W = [];
            for (let xt of De) try {
              xt = yield s.a.expand({ fs: H, gitdir: Z, ref: xt });
              const Kt = yield s.a.resolve({ fs: H, gitdir: Z, ref: xt });
              (yield Object(m.a)({ fs: H, cache: nt, gitdir: Z, oid: Kt })) && W.push(Kt);
            } catch {
            }
            W = [...new Set(W)];
            const B = yield e.a.read({ fs: H, gitdir: Z }), D = vt.capabilities.has("shallow") ? [...B] : [], Y = Object(M.a)({ capabilities: Ce, wants: oe, haves: W, shallows: D, depth: wt, since: C, exclude: U }), tt = n.from(yield Object(S.a)(Y)), at = yield re.connect({ http: ot, onProgress: V, corsProxy: bt, service: "git-upload-pack", url: Wt, auth: Zt, body: [tt], headers: rt }), ct = yield Object(T.a)(at.body);
            at.headers && (ct.headers = at.headers);
            for (const xt of ct.shallows) if (!B.has(xt)) try {
              const { object: Kt } = yield Object(_.a)({ fs: H, cache: nt, gitdir: Z, oid: xt }), ae = new j.a(Kt), Jt = yield Promise.all(ae.headers().parent.map((_e) => Object(m.a)({ fs: H, cache: nt, gitdir: Z, oid: _e })));
              Jt.length === 0 || Jt.every((_e) => _e) || B.add(xt);
            } catch {
              B.add(xt);
            }
            for (const xt of ct.unshallows) B.delete(xt);
            if (yield e.a.write({ fs: H, gitdir: Z, oids: B }), X) {
              const xt = /* @__PURE__ */ new Map([[pe, qt]]), Kt = /* @__PURE__ */ new Map();
              let ae = 10, Jt = pe;
              for (; ae--; ) {
                const Be = vt.symrefs.get(Jt);
                if (Be === void 0) break;
                Kt.set(Jt, Be), Jt = Be;
              }
              const _e = Dt.get(Jt);
              _e && xt.set(Jt, _e);
              const { pruned: le } = yield s.a.updateRemoteRefs({ fs: H, gitdir: Z, remote: Et, refs: xt, symrefs: Kt, tags: K, prune: yt });
              yt && (ct.pruned = le);
            } else {
              const { pruned: xt } = yield s.a.updateRemoteRefs({ fs: H, gitdir: Z, remote: Et, refs: Dt, symrefs: vt.symrefs, tags: K, prune: yt, pruneTags: jt });
              yt && (ct.pruned = xt);
            }
            if (ct.HEAD = vt.symrefs.get("HEAD"), ct.HEAD === void 0) {
              const { oid: xt } = s.a.resolveAgainstMap({ ref: "HEAD", map: Dt });
              for (const [Kt, ae] of Dt.entries()) if (Kt !== "HEAD" && ae === xt) {
                ct.HEAD = Kt;
                break;
              }
            }
            const Bt = pe.startsWith("refs/tags") ? "tag" : "branch";
            if (ct.FETCH_HEAD = { oid: qt, description: `${Bt} '${Object(h.a)(pe)}' of ${Wt}` }, V || it) {
              const xt = Object(I.a)(ct.progress);
              Object(c.a)(xt, function() {
                var Kt = F(function* (ae) {
                  if (it && (yield it(ae)), V) {
                    const Jt = ae.match(/([^:]*).*\((\d+?)\/(\d+?)\)/);
                    Jt && (yield V({ phase: Jt[1].trim(), loaded: parseInt(Jt[2], 10), total: parseInt(Jt[3], 10) }));
                  }
                });
                return function(ae) {
                  return Kt.apply(this, arguments);
                };
              }());
            }
            const zt = n.from(yield Object(S.a)(ct.packfile));
            if (at.body.error) throw at.body.error;
            const Ut = zt.slice(-20).toString("hex"), Ft = { defaultBranch: ct.HEAD, fetchHead: ct.FETCH_HEAD.oid, fetchHeadDescription: ct.FETCH_HEAD.description };
            if (ct.headers && (Ft.headers = ct.headers), yt && (Ft.pruned = ct.pruned), Ut !== "" && !Object(x.a)(zt)) {
              Ft.packfile = `objects/pack/pack-${Ut}.pack`;
              const xt = Object(P.join)(Z, Ft.packfile);
              yield H.write(xt, zt);
              const Kt = (Jt) => Object(_.a)({ fs: H, cache: nt, gitdir: Z, oid: Jt }), ae = yield E.a.fromPack({ pack: zt, getExternalRefDelta: Kt, onProgress: V });
              yield H.write(xt.replace(/\.pack$/, ".idx"), yield ae.toBuffer());
            }
            return Ft;
          })).apply(this, arguments);
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      var n = t(10), u = n.Buffer;
      function O(i, s) {
        for (var o in i) s[o] = i[o];
      }
      function l(i, s, o) {
        return u(i, s, o);
      }
      u.from && u.alloc && u.allocUnsafe && u.allocUnsafeSlow ? N.exports = n : (O(n, g), g.Buffer = l), O(u, l), l.from = function(i, s, o) {
        if (typeof i == "number") throw new TypeError("Argument must not be a number");
        return u(i, s, o);
      }, l.alloc = function(i, s, o) {
        if (typeof i != "number") throw new TypeError("Argument must be a number");
        var e = u(i);
        return s !== void 0 ? typeof o == "string" ? e.fill(s, o) : e.fill(s) : e.fill(0), e;
      }, l.allocUnsafe = function(i) {
        if (typeof i != "number") throw new TypeError("Argument must be a number");
        return u(i);
      }, l.allocUnsafeSlow = function(i) {
        if (typeof i != "number") throw new TypeError("Argument must be a number");
        return n.SlowBuffer(i);
      };
    }, function(N, g, t) {
      N.exports = function(n, u, O, l) {
        for (var i = 65535 & n | 0, s = n >>> 16 & 65535 | 0, o = 0; O !== 0; ) {
          O -= o = O > 2e3 ? 2e3 : O;
          do
            s = s + (i = i + u[l++] | 0) | 0;
          while (--o);
          i %= 65521, s %= 65521;
        }
        return i | s << 16 | 0;
      };
    }, function(N, g, t) {
      var n = function() {
        for (var u, O = [], l = 0; l < 256; l++) {
          u = l;
          for (var i = 0; i < 8; i++) u = 1 & u ? 3988292384 ^ u >>> 1 : u >>> 1;
          O[l] = u;
        }
        return O;
      }();
      N.exports = function(u, O, l, i) {
        var s = n, o = i + l;
        u ^= -1;
        for (var e = i; e < o; e++) u = u >>> 8 ^ s[255 & (u ^ O[e])];
        return -1 ^ u;
      };
    }, function(N, g, t) {
      var n = t(31), u = !0, O = !0;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch {
        u = !1;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch {
        O = !1;
      }
      for (var l = new n.Buf8(256), i = 0; i < 256; i++) l[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
      function s(o, e) {
        if (e < 65534 && (o.subarray && O || !o.subarray && u)) return String.fromCharCode.apply(null, n.shrinkBuf(o, e));
        for (var j = "", E = 0; E < e; E++) j += String.fromCharCode(o[E]);
        return j;
      }
      l[254] = l[254] = 1, g.string2buf = function(o) {
        var e, j, E, m, _, h = o.length, S = 0;
        for (m = 0; m < h; m++) (64512 & (j = o.charCodeAt(m))) == 55296 && m + 1 < h && (64512 & (E = o.charCodeAt(m + 1))) == 56320 && (j = 65536 + (j - 55296 << 10) + (E - 56320), m++), S += j < 128 ? 1 : j < 2048 ? 2 : j < 65536 ? 3 : 4;
        for (e = new n.Buf8(S), _ = 0, m = 0; _ < S; m++) (64512 & (j = o.charCodeAt(m))) == 55296 && m + 1 < h && (64512 & (E = o.charCodeAt(m + 1))) == 56320 && (j = 65536 + (j - 55296 << 10) + (E - 56320), m++), j < 128 ? e[_++] = j : j < 2048 ? (e[_++] = 192 | j >>> 6, e[_++] = 128 | 63 & j) : j < 65536 ? (e[_++] = 224 | j >>> 12, e[_++] = 128 | j >>> 6 & 63, e[_++] = 128 | 63 & j) : (e[_++] = 240 | j >>> 18, e[_++] = 128 | j >>> 12 & 63, e[_++] = 128 | j >>> 6 & 63, e[_++] = 128 | 63 & j);
        return e;
      }, g.buf2binstring = function(o) {
        return s(o, o.length);
      }, g.binstring2buf = function(o) {
        for (var e = new n.Buf8(o.length), j = 0, E = e.length; j < E; j++) e[j] = o.charCodeAt(j);
        return e;
      }, g.buf2string = function(o, e) {
        var j, E, m, _, h = e || o.length, S = new Array(2 * h);
        for (E = 0, j = 0; j < h; ) if ((m = o[j++]) < 128) S[E++] = m;
        else if ((_ = l[m]) > 4) S[E++] = 65533, j += _ - 1;
        else {
          for (m &= _ === 2 ? 31 : _ === 3 ? 15 : 7; _ > 1 && j < h; ) m = m << 6 | 63 & o[j++], _--;
          _ > 1 ? S[E++] = 65533 : m < 65536 ? S[E++] = m : (m -= 65536, S[E++] = 55296 | m >> 10 & 1023, S[E++] = 56320 | 1023 & m);
        }
        return s(S, E);
      }, g.utf8border = function(o, e) {
        var j;
        for ((e = e || o.length) > o.length && (e = o.length), j = e - 1; j >= 0 && (192 & o[j]) == 128; ) j--;
        return j < 0 || j === 0 ? e : j + l[o[j]] > e ? j : e;
      };
    }, function(N, g, t) {
      N.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, function(N, g, t) {
      N.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(9);
      function u({ capabilities: O = [], wants: l = [], haves: i = [], shallows: s = [], depth: o = null, since: e = null, exclude: j = [] }) {
        const E = [];
        l = [...new Set(l)];
        let m = ` ${O.join(" ")}`;
        for (const _ of l) E.push(n.a.encode(`want ${_}${m}
`)), m = "";
        for (const _ of s) E.push(n.a.encode(`shallow ${_}
`));
        o !== null && E.push(n.a.encode(`deepen ${o}
`)), e !== null && E.push(n.a.encode(`deepen-since ${Math.floor(e.valueOf() / 1e3)}
`));
        for (const _ of j) E.push(n.a.encode(`deepen-not ${_}
`));
        E.push(n.a.flush());
        for (const _ of i) E.push(n.a.encode(`have ${_}
`));
        return E.push(n.a.encode(`done
`)), E;
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return s;
      });
      var n = t(32), u = t(77), O = t(39);
      function l(e, j, E, m, _, h, S) {
        try {
          var x = e[h](S), R = x.value;
        } catch (c) {
          return void E(c);
        }
        x.done ? j(R) : Promise.resolve(R).then(m, _);
      }
      function i(e) {
        return function() {
          var j = this, E = arguments;
          return new Promise(function(m, _) {
            var h = e.apply(j, E);
            function S(R) {
              l(h, m, _, S, x, "next", R);
            }
            function x(R) {
              l(h, m, _, S, x, "throw", R);
            }
            S(void 0);
          });
        };
      }
      function s(e) {
        return o.apply(this, arguments);
      }
      function o() {
        return (o = i(function* (e) {
          const { packetlines: j, packfile: E, progress: m } = u.a.demux(e), _ = [], h = [], S = [];
          let x = !1, R = !1;
          return new Promise((c, P) => {
            Object(O.a)(j, (w) => {
              const I = w.toString("utf8").trim();
              if (I.startsWith("shallow")) {
                const T = I.slice(-41).trim();
                T.length !== 40 && P(new n.a(T)), _.push(T);
              } else if (I.startsWith("unshallow")) {
                const T = I.slice(-41).trim();
                T.length !== 40 && P(new n.a(T)), h.push(T);
              } else if (I.startsWith("ACK")) {
                const [, T, M] = I.split(" ");
                S.push({ oid: T, status: M }), M || (R = !0);
              } else I.startsWith("NAK") ? (x = !0, R = !0) : (R = !0, x = !0);
              R && (e.error ? P(e.error) : c({ shallows: _, unshallows: h, acks: S, nak: x, packfile: E, progress: m }));
            }).finally(() => {
              R || (e.error ? P(e.error) : c({ shallows: _, unshallows: h, acks: S, nak: x, packfile: E, progress: m }));
            });
          });
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return S;
        });
        var u = t(22), O = t(30), l = t(57), i = t(56), s = t(12), o = t(15), e = t(40), j = t(16), E = t(111), m = t(53);
        function _(P, w, I, T, M, A, F) {
          try {
            var z = P[A](F), $ = z.value;
          } catch (H) {
            return void I(H);
          }
          z.done ? w($) : Promise.resolve($).then(T, M);
        }
        function h(P) {
          return function() {
            var w = this, I = arguments;
            return new Promise(function(T, M) {
              var A = P.apply(w, I);
              function F($) {
                _(A, T, M, F, z, "next", $);
              }
              function z($) {
                _(A, T, M, F, z, "throw", $);
              }
              F(void 0);
            });
          };
        }
        function S(P) {
          return x.apply(this, arguments);
        }
        function x() {
          return (x = h(function* ({ fs: P, cache: w, dir: I, gitdir: T = Object(j.join)(I, ".git"), index: M, ourOid: A, baseOid: F, theirOid: z, ourName: $ = "ours", baseName: H = "base", theirName: nt = "theirs", dryRun: ot = !1, abortOnConflict: V = !0, mergeDriver: it }) {
            const lt = Object(u.a)({ ref: A }), dt = Object(u.a)({ ref: F }), G = Object(u.a)({ ref: z }), Z = [], ut = [], pt = [], st = [], mt = yield Object(O.a)({ fs: P, cache: w, dir: I, gitdir: T, trees: [lt, dt, G], map: (bt = h(function* (C, [U, L, K]) {
              const X = Object(e.a)(C);
              switch (`${yield Object(m.a)(U, L)}-${yield Object(m.a)(K, L)}`) {
                case "false-false":
                  return { mode: yield L.mode(), path: X, oid: yield L.oid(), type: yield L.type() };
                case "false-true":
                  return K ? { mode: yield K.mode(), path: X, oid: yield K.oid(), type: yield K.type() } : void 0;
                case "true-false":
                  return U ? { mode: yield U.mode(), path: X, oid: yield U.oid(), type: yield U.type() } : void 0;
                case "true-true":
                  if (U && L && K && (yield U.type()) === "blob" && (yield L.type()) === "blob" && (yield K.type()) === "blob") return R({ fs: P, gitdir: T, path: X, ours: U, base: L, theirs: K, ourName: $, baseName: H, theirName: nt, mergeDriver: it }).then(function() {
                    var rt = h(function* (yt) {
                      if (yt.cleanMerge) V || M.insert({ filepath: C, oid: yt.mergeResult.oid, stage: 0 });
                      else if (Z.push(C), ut.push(C), !V) {
                        const jt = yield L.oid(), Rt = yield U.oid(), Tt = yield K.oid();
                        M.delete({ filepath: C }), M.insert({ filepath: C, oid: jt, stage: 1 }), M.insert({ filepath: C, oid: Rt, stage: 2 }), M.insert({ filepath: C, oid: Tt, stage: 3 });
                      }
                      return yt.mergeResult;
                    });
                    return function(yt) {
                      return rt.apply(this, arguments);
                    };
                  }());
                  if (L && !U && K && (yield L.type()) === "blob" && (yield K.type()) === "blob") {
                    if (Z.push(C), pt.push(C), !V) {
                      const rt = yield L.oid(), yt = yield K.oid();
                      M.delete({ filepath: C }), M.insert({ filepath: C, oid: rt, stage: 1 }), M.insert({ filepath: C, oid: yt, stage: 3 });
                    }
                    return { mode: yield K.mode(), oid: yield K.oid(), type: "blob", path: X };
                  }
                  if (L && U && !K && (yield L.type()) === "blob" && (yield U.type()) === "blob") {
                    if (Z.push(C), st.push(C), !V) {
                      const rt = yield L.oid(), yt = yield U.oid();
                      M.delete({ filepath: C }), M.insert({ filepath: C, oid: rt, stage: 1 }), M.insert({ filepath: C, oid: yt, stage: 2 });
                    }
                    return { mode: yield U.mode(), oid: yield U.oid(), type: "blob", path: X };
                  }
                  if (L && !U && !K && (yield L.type()) === "blob") return;
                  throw new i.a();
              }
            }), function(C, U) {
              return bt.apply(this, arguments);
            }), reduce: Z.length === 0 || I && !V ? function() {
              var C = h(function* (U, L) {
                const K = L.filter(Boolean);
                if (U && (!U || U.type !== "tree" || K.length !== 0)) {
                  if (K.length > 0) {
                    const X = new s.a(K).toObject(), rt = yield Object(o.a)({ fs: P, gitdir: T, type: "tree", object: X, dryRun: ot });
                    U.oid = rt;
                  }
                  return U;
                }
              });
              return function(U, L) {
                return C.apply(this, arguments);
              };
            }() : void 0 });
            var bt, wt;
            return Z.length !== 0 ? (I && !V && (yield Object(O.a)({ fs: P, cache: w, dir: I, gitdir: T, trees: [Object(u.a)({ ref: mt.oid })], map: (wt = h(function* (C, [U]) {
              const L = `${I}/${C}`;
              if ((yield U.type()) === "blob") {
                const K = yield U.mode(), X = new TextDecoder().decode(yield U.content());
                yield P.write(L, X, { mode: K });
              }
              return !0;
            }), function(C, U) {
              return wt.apply(this, arguments);
            }) })), new l.a(Z, ut, pt, st)) : mt.oid;
          })).apply(this, arguments);
        }
        function R(P) {
          return c.apply(this, arguments);
        }
        function c() {
          return (c = h(function* ({ fs: P, gitdir: w, path: I, ours: T, base: M, theirs: A, ourName: F, theirName: z, baseName: $, dryRun: H, mergeDriver: nt = E.a }) {
            const ot = (yield M.mode()) === (yield T.mode()) ? yield A.mode() : yield T.mode();
            if ((yield T.oid()) === (yield A.oid())) return { cleanMerge: !0, mergeResult: { mode: ot, path: I, oid: yield T.oid(), type: "blob" } };
            if ((yield T.oid()) === (yield M.oid())) return { cleanMerge: !0, mergeResult: { mode: ot, path: I, oid: yield A.oid(), type: "blob" } };
            if ((yield A.oid()) === (yield M.oid())) return { cleanMerge: !0, mergeResult: { mode: ot, path: I, oid: yield T.oid(), type: "blob" } };
            const V = n.from(yield T.content()).toString("utf8"), it = n.from(yield M.content()).toString("utf8"), lt = n.from(yield A.content()).toString("utf8"), { mergedText: dt, cleanMerge: G } = yield nt({ branches: [$, F, z], contents: [it, V, lt], path: I });
            return { cleanMerge: G, mergeResult: { mode: ot, path: I, oid: yield Object(o.a)({ fs: P, gitdir: w, type: "blob", object: n.from(dt, "utf8"), dryRun: H }), type: "blob" } };
          })).apply(this, arguments);
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return E;
      });
      var n = t(17), u = t(3), O = t(44), l = t(18), i = t(14), s = t(7), o = t(16);
      function e(_, h, S, x, R, c, P) {
        try {
          var w = _[c](P), I = w.value;
        } catch (T) {
          return void S(T);
        }
        w.done ? h(I) : Promise.resolve(I).then(x, R);
      }
      function j(_) {
        return function() {
          var h = this, S = arguments;
          return new Promise(function(x, R) {
            var c = _.apply(h, S);
            function P(I) {
              e(c, x, R, P, w, "next", I);
            }
            function w(I) {
              e(c, x, R, P, w, "throw", I);
            }
            P(void 0);
          });
        };
      }
      function E(_) {
        return m.apply(this, arguments);
      }
      function m() {
        return (m = j(function* ({ fs: _, cache: h, dir: S, gitdir: x = Object(o.join)(S, ".git"), start: R, finish: c }) {
          const P = yield O.a.read({ fs: _, gitdir: x }), w = /* @__PURE__ */ new Set(), I = /* @__PURE__ */ new Set();
          for (const F of R) w.add(yield u.a.resolve({ fs: _, gitdir: x, ref: F }));
          for (const F of c) try {
            const z = yield u.a.resolve({ fs: _, gitdir: x, ref: F });
            I.add(z);
          } catch {
          }
          const T = /* @__PURE__ */ new Set();
          function M(F) {
            return A.apply(this, arguments);
          }
          function A() {
            return (A = j(function* (F) {
              T.add(F);
              const { type: z, object: $ } = yield Object(s.a)({ fs: _, cache: h, gitdir: x, oid: F });
              if (z === "tag")
                return M(l.a.from($).headers().object);
              if (z !== "commit") throw new n.a(F, z, "commit");
              if (!P.has(F)) {
                const H = i.a.from($).headers().parent;
                for (F of H) I.has(F) || T.has(F) || (yield M(F));
              }
            })).apply(this, arguments);
          }
          for (const F of w) yield M(F);
          return T;
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return l;
      });
      var n = t(9);
      function u(s, o, e, j, E, m, _) {
        try {
          var h = s[m](_), S = h.value;
        } catch (x) {
          return void e(x);
        }
        h.done ? o(S) : Promise.resolve(S).then(j, E);
      }
      function O(s) {
        return function() {
          var o = this, e = arguments;
          return new Promise(function(j, E) {
            var m = s.apply(o, e);
            function _(S) {
              u(m, j, E, _, h, "next", S);
            }
            function h(S) {
              u(m, j, E, _, h, "throw", S);
            }
            _(void 0);
          });
        };
      }
      function l(s) {
        return i.apply(this, arguments);
      }
      function i() {
        return (i = O(function* ({ capabilities: s = [], triplets: o = [] }) {
          const e = [];
          let j = `\0 ${s.join(" ")}`;
          for (const E of o) e.push(n.a.encode(`${E.oldoid} ${E.oid} ${E.fullRef}${j}
`)), j = "";
          return e.push(n.a.flush()), e;
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return i;
      });
      var n = t(36), u = t(9);
      function O(o, e, j, E, m, _, h) {
        try {
          var S = o[_](h), x = S.value;
        } catch (R) {
          return void j(R);
        }
        S.done ? e(x) : Promise.resolve(x).then(E, m);
      }
      function l(o) {
        return function() {
          var e = this, j = arguments;
          return new Promise(function(E, m) {
            var _ = o.apply(e, j);
            function h(x) {
              O(_, E, m, h, S, "next", x);
            }
            function S(x) {
              O(_, E, m, h, S, "throw", x);
            }
            h(void 0);
          });
        };
      }
      function i(o) {
        return s.apply(this, arguments);
      }
      function s() {
        return (s = l(function* (o) {
          const e = {};
          let j = "";
          const E = u.a.streamReader(o);
          let m = yield E();
          for (; m !== !0; ) m !== null && (j += m.toString("utf8") + `
`), m = yield E();
          const _ = j.toString("utf8").split(`
`);
          if (m = _.shift(), !m.startsWith("unpack ")) throw new n.a('unpack ok" or "unpack [error message]', m);
          e.ok = m === "unpack ok", e.ok || (e.error = m.slice(7)), e.refs = {};
          for (const h of _) {
            if (h.trim() === "") continue;
            const S = h.slice(0, 2), x = h.slice(3);
            let R = x.indexOf(" ");
            R === -1 && (R = x.length);
            const c = x.slice(0, R), P = x.slice(R + 1);
            e.refs[c] = { ok: S === "ok", error: P };
          }
          return e;
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return u;
      });
      var n = t(38);
      function u(l, i) {
        return Object(n.a)(O(l), O(i));
      }
      function O(l) {
        return l.mode === "040000" ? l.path + "/" : l.path;
      }
    }, function(N, g, t) {
      var n;
      n = function(u) {
        u.version = "1.2.0";
        var O = function() {
          for (var l = 0, i = new Array(256), s = 0; s != 256; ++s) l = 1 & (l = 1 & (l = 1 & (l = 1 & (l = 1 & (l = 1 & (l = 1 & (l = 1 & (l = s) ? -306674912 ^ l >>> 1 : l >>> 1) ? -306674912 ^ l >>> 1 : l >>> 1) ? -306674912 ^ l >>> 1 : l >>> 1) ? -306674912 ^ l >>> 1 : l >>> 1) ? -306674912 ^ l >>> 1 : l >>> 1) ? -306674912 ^ l >>> 1 : l >>> 1) ? -306674912 ^ l >>> 1 : l >>> 1) ? -306674912 ^ l >>> 1 : l >>> 1, i[s] = l;
          return typeof Int32Array < "u" ? new Int32Array(i) : i;
        }();
        u.table = O, u.bstr = function(l, i) {
          for (var s = -1 ^ i, o = l.length - 1, e = 0; e < o; ) s = (s = s >>> 8 ^ O[255 & (s ^ l.charCodeAt(e++))]) >>> 8 ^ O[255 & (s ^ l.charCodeAt(e++))];
          return e === o && (s = s >>> 8 ^ O[255 & (s ^ l.charCodeAt(e))]), -1 ^ s;
        }, u.buf = function(l, i) {
          if (l.length > 1e4) return function(j, E) {
            for (var m = -1 ^ E, _ = j.length - 7, h = 0; h < _; ) m = (m = (m = (m = (m = (m = (m = (m = m >>> 8 ^ O[255 & (m ^ j[h++])]) >>> 8 ^ O[255 & (m ^ j[h++])]) >>> 8 ^ O[255 & (m ^ j[h++])]) >>> 8 ^ O[255 & (m ^ j[h++])]) >>> 8 ^ O[255 & (m ^ j[h++])]) >>> 8 ^ O[255 & (m ^ j[h++])]) >>> 8 ^ O[255 & (m ^ j[h++])]) >>> 8 ^ O[255 & (m ^ j[h++])];
            for (; h < _ + 7; ) m = m >>> 8 ^ O[255 & (m ^ j[h++])];
            return -1 ^ m;
          }(l, i);
          for (var s = -1 ^ i, o = l.length - 3, e = 0; e < o; ) s = (s = (s = (s = s >>> 8 ^ O[255 & (s ^ l[e++])]) >>> 8 ^ O[255 & (s ^ l[e++])]) >>> 8 ^ O[255 & (s ^ l[e++])]) >>> 8 ^ O[255 & (s ^ l[e++])];
          for (; e < o + 3; ) s = s >>> 8 ^ O[255 & (s ^ l[e++])];
          return -1 ^ s;
        }, u.str = function(l, i) {
          for (var s, o, e = -1 ^ i, j = 0, E = l.length; j < E; ) (s = l.charCodeAt(j++)) < 128 ? e = e >>> 8 ^ O[255 & (e ^ s)] : s < 2048 ? e = (e = e >>> 8 ^ O[255 & (e ^ (192 | s >> 6 & 31))]) >>> 8 ^ O[255 & (e ^ (128 | 63 & s))] : s >= 55296 && s < 57344 ? (s = 64 + (1023 & s), o = 1023 & l.charCodeAt(j++), e = (e = (e = (e = e >>> 8 ^ O[255 & (e ^ (240 | s >> 8 & 7))]) >>> 8 ^ O[255 & (e ^ (128 | s >> 2 & 63))]) >>> 8 ^ O[255 & (e ^ (128 | o >> 6 & 15 | (3 & s) << 4))]) >>> 8 ^ O[255 & (e ^ (128 | 63 & o))]) : e = (e = (e = e >>> 8 ^ O[255 & (e ^ (224 | s >> 12 & 15))]) >>> 8 ^ O[255 & (e ^ (128 | s >> 6 & 63))]) >>> 8 ^ O[255 & (e ^ (128 | 63 & s))];
          return -1 ^ e;
        };
      }, n(typeof DO_NOT_EXPORT_CRC > "u" ? g : {});
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return e;
        });
        var u = t(49), O = t.n(u), l = t(4), i = t(82);
        function s(_, h, S, x, R, c, P) {
          try {
            var w = _[c](P), I = w.value;
          } catch (T) {
            return void S(T);
          }
          w.done ? h(I) : Promise.resolve(I).then(x, R);
        }
        function o(_) {
          return function() {
            var h = this, S = arguments;
            return new Promise(function(x, R) {
              var c = _.apply(h, S);
              function P(I) {
                s(c, x, R, P, w, "next", I);
              }
              function w(I) {
                s(c, x, R, P, w, "throw", I);
              }
              P(void 0);
            });
          };
        }
        function e(_, h) {
          return j.apply(this, arguments);
        }
        function j() {
          return (j = o(function* (_, h) {
            const S = new i.a(_);
            let x = yield S.read(4);
            if (x = x.toString("utf8"), x !== "PACK") throw new l.a(`Invalid PACK header '${x}'`);
            let R = yield S.read(4);
            if (R = R.readUInt32BE(0), R !== 2) throw new l.a(`Invalid packfile version: ${R}`);
            let c = yield S.read(4);
            if (c = c.readUInt32BE(0), !(c < 1)) for (; !S.eof() && c--; ) {
              const P = S.tell(), { type: w, length: I, ofs: T, reference: M } = yield E(S), A = new O.a.Inflate();
              for (; !A.result; ) {
                const F = yield S.chunk();
                if (!F) break;
                if (A.push(F, !1), A.err) throw new l.a(`Pako error: ${A.msg}`);
                if (A.result) {
                  if (A.result.length !== I) throw new l.a("Inflated object size is different from that stated in packfile.");
                  yield S.undo(), yield S.read(F.length - A.strm.avail_in);
                  const z = S.tell();
                  yield h({ data: A.result, type: w, num: c, offset: P, end: z, reference: M, ofs: T });
                }
              }
            }
          })).apply(this, arguments);
        }
        function E(_) {
          return m.apply(this, arguments);
        }
        function m() {
          return (m = o(function* (_) {
            let h = yield _.byte();
            const S = h >> 4 & 7;
            let x, R, c = 15 & h;
            if (128 & h) {
              let P = 4;
              do
                h = yield _.byte(), c |= (127 & h) << P, P += 7;
              while (128 & h);
            }
            if (S === 6) {
              let P = 0;
              x = 0;
              const w = [];
              do
                h = yield _.byte(), x |= (127 & h) << P, P += 7, w.push(h);
              while (128 & h);
              R = n.from(w);
            }
            return S === 7 && (R = yield _.read(20)), { type: S, length: c, ofs: x, reference: R };
          })).apply(this, arguments);
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return l;
        });
        var u = t(4), O = t(20);
        function l(e, j) {
          const E = new O.a(e), m = i(E);
          if (m !== j.byteLength) throw new u.a(`applyDelta expected source buffer to be ${m} bytes but the provided buffer was ${j.length} bytes`);
          const _ = i(E);
          let h;
          const S = o(E, j);
          if (S.byteLength === _) h = S;
          else {
            h = n.alloc(_);
            const x = new O.a(h);
            for (x.copy(S); !E.eof(); ) x.copy(o(E, j));
            const R = x.tell();
            if (_ !== R) throw new u.a(`applyDelta expected target buffer to be ${_} bytes but the resulting buffer was ${R} bytes`);
          }
          return h;
        }
        function i(e) {
          let j = 0, E = 0, m = null;
          do
            m = e.readUInt8(), j |= (127 & m) << E, E += 7;
          while (128 & m);
          return j;
        }
        function s(e, j, E) {
          let m = 0, _ = 0;
          for (; E--; ) 1 & j && (m |= e.readUInt8() << _), j >>= 1, _ += 8;
          return m;
        }
        function o(e, j) {
          const E = e.readUInt8();
          if (128 & E) {
            const m = s(e, 15 & E, 4);
            let _ = s(e, (112 & E) >> 4, 3);
            return _ === 0 && (_ = 65536), j.slice(m, m + _);
          }
          return e.slice(E);
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      function n(u) {
        return u.split(`
`).map((O) => O.replace(/^ /, "")).join(`
`);
      }
      t.d(g, "a", function() {
        return n;
      });
    }, function(N, g, t) {
      function n(O) {
        return /* @__PURE__ */ function(l) {
          return l && typeof l == "object";
        }(O) && u(O.then) && u(O.catch);
      }
      function u(O) {
        return typeof O == "function";
      }
      t.d(g, "a", function() {
        return n;
      });
    }, function(N, g, t) {
      (function(n) {
        function u(T) {
          return Array.isArray(T) ? T : [T];
        }
        const O = /^\s+$/, l = /^\\!/, i = /^\\#/, s = /\r?\n/g, o = /^\.*\/|^\.+$/, e = typeof Symbol < "u" ? Symbol.for("node-ignore") : "node-ignore", j = /([0-z])-([0-z])/g, E = () => !1, m = [[/\\?\s+$/, (T) => T.indexOf("\\") === 0 ? " " : ""], [/\\\s/g, () => " "], [/[\\$.|*+(){^]/g, (T) => `\\${T}`], [/(?!\\)\?/g, () => "[^/]"], [/^\//, () => "^"], [/\//g, () => "\\/"], [/^\^*\\\*\\\*\\\//, () => "^(?:.*\\/)?"], [/^(?=[^^])/, function() {
          return /\/(?!$)/.test(this) ? "^" : "(?:^|\\/)";
        }], [/\\\/\\\*\\\*(?=\\\/|$)/g, (T, M, A) => M + 6 < A.length ? "(?:\\/[^\\/]+)*" : "\\/.+"], [/(^|[^\\]+)\\\*(?=.+)/g, (T, M) => `${M}[^\\/]*`], [/\\\\\\(?=[$.|*+(){^])/g, () => "\\"], [/\\\\/g, () => "\\"], [/(\\)?\[([^\]/]*?)(\\*)($|\])/g, (T, M, A, F, z) => M === "\\" ? `\\[${A}${(($) => {
          const { length: H } = $;
          return $.slice(0, H - H % 2);
        })(F)}${z}` : z === "]" && F.length % 2 == 0 ? `[${(($) => $.replace(j, (H, nt, ot) => nt.charCodeAt(0) <= ot.charCodeAt(0) ? H : ""))(A)}${F}]` : "[]"], [/(?:[^*])$/, (T) => /\/$/.test(T) ? `${T}$` : `${T}(?=$|\\/$)`], [/(\^|\\\/)?\\\*$/, (T, M) => `${M ? `${M}[^/]+` : "[^/]*"}(?=$|\\/$)`]], _ = /* @__PURE__ */ Object.create(null), h = (T) => typeof T == "string";
        class S {
          constructor(M, A, F, z) {
            this.origin = M, this.pattern = A, this.negative = F, this.regex = z;
          }
        }
        const x = (T, M) => {
          const A = T;
          let F = !1;
          T.indexOf("!") === 0 && (F = !0, T = T.substr(1));
          const z = (($, H) => {
            let nt = _[$];
            return nt || (nt = m.reduce((ot, V) => ot.replace(V[0], V[1].bind($)), $), _[$] = nt), H ? new RegExp(nt, "i") : new RegExp(nt);
          })(T = T.replace(l, "!").replace(i, "#"), M);
          return new S(A, T, F, z);
        }, R = (T, M) => {
          throw new M(T);
        }, c = (T, M, A) => h(T) ? T ? c.isNotRelative(T) ? A(`path should be a \`path.relative()\`d string, but got "${M}"`, RangeError) : !0 : A("path must not be empty", TypeError) : A(`path must be a string, but got \`${M}\``, TypeError), P = (T) => o.test(T);
        c.isNotRelative = P, c.convert = (T) => T;
        class w {
          constructor({ ignorecase: M = !0, ignoreCase: A = M, allowRelativePaths: F = !1 } = {}) {
            var z, $, H;
            z = this, $ = e, H = !0, Object.defineProperty(z, $, { value: H }), this._rules = [], this._ignoreCase = A, this._allowRelativePaths = F, this._initCache();
          }
          _initCache() {
            this._ignoreCache = /* @__PURE__ */ Object.create(null), this._testCache = /* @__PURE__ */ Object.create(null);
          }
          _addPattern(M) {
            if (M && M[e]) return this._rules = this._rules.concat(M._rules), void (this._added = !0);
            if (((A) => A && h(A) && !O.test(A) && A.indexOf("#") !== 0)(M)) {
              const A = x(M, this._ignoreCase);
              this._added = !0, this._rules.push(A);
            }
          }
          add(M) {
            return this._added = !1, u(h(M) ? ((A) => A.split(s))(M) : M).forEach(this._addPattern, this), this._added && this._initCache(), this;
          }
          addPattern(M) {
            return this.add(M);
          }
          _testOne(M, A) {
            let F = !1, z = !1;
            return this._rules.forEach(($) => {
              const { negative: H } = $;
              z === H && F !== z || H && !F && !z && !A || $.regex.test(M) && (F = !H, z = H);
            }), { ignored: F, unignored: z };
          }
          _test(M, A, F, z) {
            const $ = M && c.convert(M);
            return c($, M, this._allowRelativePaths ? E : R), this._t($, A, F, z);
          }
          _t(M, A, F, z) {
            if (M in A) return A[M];
            if (z || (z = M.split("/")), z.pop(), !z.length) return A[M] = this._testOne(M, F);
            const $ = this._t(z.join("/") + "/", A, F, z);
            return A[M] = $.ignored ? $ : this._testOne(M, F);
          }
          ignores(M) {
            return this._test(M, this._ignoreCache, !1).ignored;
          }
          createFilter() {
            return (M) => !this.ignores(M);
          }
          filter(M) {
            return u(M).filter(this.createFilter());
          }
          test(M) {
            return this._test(M, this._testCache, !0);
          }
        }
        const I = (T) => new w(T);
        if (I.isPathValid = (T) => c(T && c.convert(T), T, E), I.default = I, N.exports = I, n !== void 0 && (n.env && n.env.IGNORE_TEST_WIN32 || n.platform === "win32")) {
          const T = (A) => /^\\\\\?\\/.test(A) || /["<>|\u0000-\u001F]+/u.test(A) ? A : A.replace(/\\/g, "/");
          c.convert = T;
          const M = /^[a-z]:\//i;
          c.isNotRelative = (A) => M.test(A) || P(A);
        }
      }).call(this, t(92));
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return l;
      });
      var n = t(4);
      function u(s, o, e, j, E, m, _) {
        try {
          var h = s[m](_), S = h.value;
        } catch (x) {
          return void e(x);
        }
        h.done ? o(S) : Promise.resolve(S).then(j, E);
      }
      function O(s) {
        return function() {
          var o = this, e = arguments;
          return new Promise(function(j, E) {
            var m = s.apply(o, e);
            function _(S) {
              u(m, j, E, _, h, "next", S);
            }
            function h(S) {
              u(m, j, E, _, h, "throw", S);
            }
            _(void 0);
          });
        };
      }
      function l(s) {
        return i.apply(this, arguments);
      }
      function i() {
        return (i = O(function* ({ fs: s, gitdir: o, object: e, format: j, oid: E }) {
          if (j !== "deflated") throw new n.a("GitObjectStoreLoose expects objects to write to be in deflated format");
          const m = `${o}/${`objects/${E.slice(0, 2)}/${E.slice(2)}`}`;
          (yield s.exists(m)) || (yield s.write(m, e));
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      var n = t(158);
      function u(O, l) {
        for (var i = [], s = O.length, o = l.length, e = function(m, _) {
          var h = new n(m, _);
          h.compose();
          for (var S, x, R = h.getses(), c = m.length - 1, P = _.length - 1, w = R.length - 1; w >= 0; --w) R[w].t === h.SES_COMMON ? (x ? (x.chain = { file1index: c, file2index: P, chain: null }, x = x.chain) : x = S = { file1index: c, file2index: P, chain: null }, c--, P--) : R[w].t === h.SES_DELETE ? c-- : R[w].t === h.SES_ADD && P--;
          var I = { file1index: -1, file2index: -1, chain: null };
          return x ? (x.chain = I, S) : I;
        }(O, l); e !== null; e = e.chain) {
          var j = s - e.file1index - 1, E = o - e.file2index - 1;
          s = e.file1index, o = e.file2index, (j || E) && i.push({ file1: [s + 1, j], file2: [o + 1, E] });
        }
        return i.reverse(), i;
      }
      N.exports = function(O, l, i) {
        var s = [], o = [O, l, i], e = function(R, c, P) {
          var w, I = u(c, R), T = u(c, P), M = [];
          function A(L, K) {
            M.push([L.file1[0], K, L.file1[1], L.file2[0], L.file2[1]]);
          }
          for (w = 0; w < I.length; w++) A(I[w], 0);
          for (w = 0; w < T.length; w++) A(T[w], 2);
          M.sort(function(L, K) {
            return L[0] - K[0];
          });
          var F = [], z = 0;
          function $(L) {
            L > z && (F.push([1, z, L - z]), z = L);
          }
          for (var H = 0; H < M.length; H++) {
            for (var nt = H, ot = M[H], V = ot[0], it = V + ot[2]; H < M.length - 1; ) {
              var lt = M[H + 1], dt = lt[0];
              if (dt > it) break;
              it = Math.max(it, dt + lt[2]), H++;
            }
            if ($(V), nt == H) ot[4] > 0 && F.push([ot[1], ot[3], ot[4]]);
            else {
              var G = { 0: [R.length, -1, c.length, -1], 2: [P.length, -1, c.length, -1] };
              for (w = nt; w <= H; w++) {
                var Z = G[(ot = M[w])[1]], ut = ot[0], pt = ut + ot[2], st = ot[3], mt = st + ot[4];
                Z[0] = Math.min(st, Z[0]), Z[1] = Math.max(mt, Z[1]), Z[2] = Math.min(ut, Z[2]), Z[3] = Math.max(pt, Z[3]);
              }
              var bt = G[0][0] + (V - G[0][2]), wt = G[0][1] + (it - G[0][3]), C = G[2][0] + (V - G[2][2]), U = G[2][1] + (it - G[2][3]);
              F.push([-1, bt, wt - bt, V, it - V, C, U - C]);
            }
            z = it;
          }
          return $(c.length), F;
        }(O, l, i), j = [];
        function E() {
          j.length && s.push({ ok: j }), j = [];
        }
        function m(R) {
          for (var c = 0; c < R.length; c++) j.push(R[c]);
        }
        function _(R) {
          if (R[2] != R[6]) return !0;
          for (var c = R[1], P = R[5], w = 0; w < R[2]; w++) if (O[w + c] != i[w + P]) return !0;
          return !1;
        }
        for (var h = 0; h < e.length; h++) {
          var S = e[h], x = S[0];
          x == -1 ? _(S) ? (E(), s.push({ conflict: { a: O.slice(S[1], S[1] + S[2]), aIndex: S[1], o: l.slice(S[3], S[3] + S[4]), oIndex: S[3], b: i.slice(S[5], S[5] + S[6]), bIndex: S[5] } })) : m(o[0].slice(S[1], S[1] + S[2])) : m(o[x].slice(S[1], S[1] + S[2]));
        }
        return E(), s;
      };
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return n;
      });
      const n = { commit: 16, tree: 32, blob: 48, tag: 64, ofs_delta: 96, ref_delta: 112 };
    }, function(N, g, t) {
      function n(u, O) {
        const l = u.map((i) => i.split("=", 1)[0]);
        return O.filter((i) => {
          const s = i.split("=", 1)[0];
          return l.includes(s);
        });
      }
      t.d(g, "a", function() {
        return n;
      });
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return i;
      });
      var n = t(67), u = t(39);
      function O(s, o, e, j, E, m, _) {
        try {
          var h = s[m](_), S = h.value;
        } catch (x) {
          return void e(x);
        }
        h.done ? o(S) : Promise.resolve(S).then(j, E);
      }
      function l(s) {
        const o = s.indexOf("\r"), e = s.indexOf(`
`);
        return o === -1 && e === -1 ? -1 : o === -1 ? e + 1 : e === -1 ? o + 1 : e === o + 1 ? e + 1 : Math.min(o, e) + 1;
      }
      function i(s) {
        const o = new n.a();
        let e = "";
        var j;
        return (j = function* () {
          yield Object(u.a)(s, (E) => {
            for (E = E.toString("utf8"), e += E; ; ) {
              const m = l(e);
              if (m === -1) break;
              o.write(e.slice(0, m)), e = e.slice(m);
            }
          }), e.length > 0 && o.write(e), o.end();
        }, function() {
          var E = this, m = arguments;
          return new Promise(function(_, h) {
            var S = j.apply(E, m);
            function x(c) {
              O(S, _, h, x, R, "next", c);
            }
            function R(c) {
              O(S, _, h, x, R, "throw", c);
            }
            x(void 0);
          });
        })(), o;
      }
    }, function(N, g, t) {
      (function(n) {
        var u = function(O) {
          if (O = O || {}, this.Promise = O.Promise || Promise, this.queues = /* @__PURE__ */ Object.create(null), this.domainReentrant = O.domainReentrant || !1, this.domainReentrant) {
            if (n === void 0 || n.domain === void 0) throw new Error("Domain-reentrant locks require `process.domain` to exist. Please flip `opts.domainReentrant = false`, use a NodeJS version that still implements Domain, or install a browser polyfill.");
            this.domains = /* @__PURE__ */ Object.create(null);
          }
          this.timeout = O.timeout || u.DEFAULT_TIMEOUT, this.maxOccupationTime = O.maxOccupationTime || u.DEFAULT_MAX_OCCUPATION_TIME, this.maxExecutionTime = O.maxExecutionTime || u.DEFAULT_MAX_EXECUTION_TIME, O.maxPending === 1 / 0 || Number.isInteger(O.maxPending) && O.maxPending >= 0 ? this.maxPending = O.maxPending : this.maxPending = u.DEFAULT_MAX_PENDING;
        };
        u.DEFAULT_TIMEOUT = 0, u.DEFAULT_MAX_OCCUPATION_TIME = 0, u.DEFAULT_MAX_EXECUTION_TIME = 0, u.DEFAULT_MAX_PENDING = 1e3, u.prototype.acquire = function(O, l, i, s) {
          if (Array.isArray(O)) return this._acquireBatch(O, l, i, s);
          if (typeof l != "function") throw new Error("You must pass a function to execute");
          var o = null, e = null, j = null;
          typeof i != "function" && (s = i, i = null, j = new this.Promise(function(T, M) {
            o = T, e = M;
          })), s = s || {};
          var E = !1, m = null, _ = null, h = null, S = this, x = function(T, M, A) {
            _ && (clearTimeout(_), _ = null), h && (clearTimeout(h), h = null), T && (S.queues[O] && S.queues[O].length === 0 && delete S.queues[O], S.domainReentrant && delete S.domains[O]), E || (j ? M ? e(M) : o(A) : typeof i == "function" && i(M, A), E = !0), T && S.queues[O] && S.queues[O].length > 0 && S.queues[O].shift()();
          }, R = function(T) {
            if (E) return x(T);
            m && (clearTimeout(m), m = null), S.domainReentrant && T && (S.domains[O] = n.domain);
            var M = s.maxExecutionTime || S.maxExecutionTime;
            if (M && (h = setTimeout(function() {
              S.queues[O] && x(T, new Error("Maximum execution time is exceeded " + O));
            }, M)), l.length === 1) {
              var A = !1;
              try {
                l(function(F, z) {
                  A || (A = !0, x(T, F, z));
                });
              } catch (F) {
                A || (A = !0, x(T, F));
              }
            } else S._promiseTry(function() {
              return l();
            }).then(function(F) {
              x(T, void 0, F);
            }, function(F) {
              x(T, F);
            });
          };
          S.domainReentrant && n.domain && (R = n.domain.bind(R));
          var c = s.maxPending || S.maxPending;
          if (S.queues[O]) if (S.domainReentrant && n.domain && n.domain === S.domains[O]) R(!1);
          else if (S.queues[O].length >= c) x(!1, new Error("Too many pending tasks in queue " + O));
          else {
            var P = function() {
              R(!0);
            };
            s.skipQueue ? S.queues[O].unshift(P) : S.queues[O].push(P);
            var w = s.timeout || S.timeout;
            w && (m = setTimeout(function() {
              m = null, x(!1, new Error("async-lock timed out in queue " + O));
            }, w));
          }
          else S.queues[O] = [], R(!0);
          var I = s.maxOccupationTime || S.maxOccupationTime;
          return I && (_ = setTimeout(function() {
            S.queues[O] && x(!1, new Error("Maximum occupation time is exceeded in queue " + O));
          }, I)), j || void 0;
        }, u.prototype._acquireBatch = function(O, l, i, s) {
          typeof i != "function" && (s = i, i = null);
          var o = this, e = O.reduceRight(function(j, E) {
            return /* @__PURE__ */ function(m, _) {
              return function(h) {
                o.acquire(m, _, h, s);
              };
            }(E, j);
          }, l);
          if (typeof i != "function") return new this.Promise(function(j, E) {
            e.length === 1 ? e(function(m, _) {
              m ? E(m) : j(_);
            }) : j(e());
          });
          e(i);
        }, u.prototype.isBusy = function(O) {
          return O ? !!this.queues[O] : Object.keys(this.queues).length > 0;
        }, u.prototype._promiseTry = function(O) {
          try {
            return this.Promise.resolve(O());
          } catch (l) {
            return this.Promise.reject(l);
          }
        }, N.exports = u;
      }).call(this, t(92));
    }, function(N, g) {
      var t;
      t = /* @__PURE__ */ function() {
        return this;
      }();
      try {
        t = t || new Function("return this")();
      } catch {
        typeof window == "object" && (t = window);
      }
      N.exports = t;
    }, function(N, g, t) {
      g.byteLength = function(j) {
        var E = o(j), m = E[0], _ = E[1];
        return 3 * (m + _) / 4 - _;
      }, g.toByteArray = function(j) {
        var E, m, _ = o(j), h = _[0], S = _[1], x = new O(function(P, w, I) {
          return 3 * (w + I) / 4 - I;
        }(0, h, S)), R = 0, c = S > 0 ? h - 4 : h;
        for (m = 0; m < c; m += 4) E = u[j.charCodeAt(m)] << 18 | u[j.charCodeAt(m + 1)] << 12 | u[j.charCodeAt(m + 2)] << 6 | u[j.charCodeAt(m + 3)], x[R++] = E >> 16 & 255, x[R++] = E >> 8 & 255, x[R++] = 255 & E;
        return S === 2 && (E = u[j.charCodeAt(m)] << 2 | u[j.charCodeAt(m + 1)] >> 4, x[R++] = 255 & E), S === 1 && (E = u[j.charCodeAt(m)] << 10 | u[j.charCodeAt(m + 1)] << 4 | u[j.charCodeAt(m + 2)] >> 2, x[R++] = E >> 8 & 255, x[R++] = 255 & E), x;
      }, g.fromByteArray = function(j) {
        for (var E, m = j.length, _ = m % 3, h = [], S = 0, x = m - _; S < x; S += 16383) h.push(e(j, S, S + 16383 > x ? x : S + 16383));
        return _ === 1 ? (E = j[m - 1], h.push(n[E >> 2] + n[E << 4 & 63] + "==")) : _ === 2 && (E = (j[m - 2] << 8) + j[m - 1], h.push(n[E >> 10] + n[E >> 4 & 63] + n[E << 2 & 63] + "=")), h.join("");
      };
      for (var n = [], u = [], O = typeof Uint8Array < "u" ? Uint8Array : Array, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, s = l.length; i < s; ++i) n[i] = l[i], u[l.charCodeAt(i)] = i;
      function o(j) {
        var E = j.length;
        if (E % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var m = j.indexOf("=");
        return m === -1 && (m = E), [m, m === E ? 0 : 4 - m % 4];
      }
      function e(j, E, m) {
        for (var _, h, S = [], x = E; x < m; x += 3) _ = (j[x] << 16 & 16711680) + (j[x + 1] << 8 & 65280) + (255 & j[x + 2]), S.push(n[(h = _) >> 18 & 63] + n[h >> 12 & 63] + n[h >> 6 & 63] + n[63 & h]);
        return S.join("");
      }
      u[45] = 62, u[95] = 63;
    }, function(N, g) {
      g.read = function(t, n, u, O, l) {
        var i, s, o = 8 * l - O - 1, e = (1 << o) - 1, j = e >> 1, E = -7, m = u ? l - 1 : 0, _ = u ? -1 : 1, h = t[n + m];
        for (m += _, i = h & (1 << -E) - 1, h >>= -E, E += o; E > 0; i = 256 * i + t[n + m], m += _, E -= 8) ;
        for (s = i & (1 << -E) - 1, i >>= -E, E += O; E > 0; s = 256 * s + t[n + m], m += _, E -= 8) ;
        if (i === 0) i = 1 - j;
        else {
          if (i === e) return s ? NaN : 1 / 0 * (h ? -1 : 1);
          s += Math.pow(2, O), i -= j;
        }
        return (h ? -1 : 1) * s * Math.pow(2, i - O);
      }, g.write = function(t, n, u, O, l, i) {
        var s, o, e, j = 8 * i - l - 1, E = (1 << j) - 1, m = E >> 1, _ = l === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, h = O ? 0 : i - 1, S = O ? 1 : -1, x = n < 0 || n === 0 && 1 / n < 0 ? 1 : 0;
        for (n = Math.abs(n), isNaN(n) || n === 1 / 0 ? (o = isNaN(n) ? 1 : 0, s = E) : (s = Math.floor(Math.log(n) / Math.LN2), n * (e = Math.pow(2, -s)) < 1 && (s--, e *= 2), (n += s + m >= 1 ? _ / e : _ * Math.pow(2, 1 - m)) * e >= 2 && (s++, e /= 2), s + m >= E ? (o = 0, s = E) : s + m >= 1 ? (o = (n * e - 1) * Math.pow(2, l), s += m) : (o = n * Math.pow(2, m - 1) * Math.pow(2, l), s = 0)); l >= 8; t[u + h] = 255 & o, h += S, o /= 256, l -= 8) ;
        for (s = s << l | o, j += l; j > 0; t[u + h] = 255 & s, h += S, s /= 256, j -= 8) ;
        t[u + h - S] |= 128 * x;
      };
    }, function(N, g) {
      var t = {}.toString;
      N.exports = Array.isArray || function(n) {
        return t.call(n) == "[object Array]";
      };
    }, function(N, g) {
      typeof Object.create == "function" ? N.exports = function(t, n) {
        t.super_ = n, t.prototype = Object.create(n.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } });
      } : N.exports = function(t, n) {
        t.super_ = n;
        var u = function() {
        };
        u.prototype = n.prototype, t.prototype = new u(), t.prototype.constructor = t;
      };
    }, function(N, g, t) {
      var n = t(119).Buffer;
      function u(O, l) {
        this._block = n.alloc(O), this._finalSize = l, this._blockSize = O, this._len = 0;
      }
      u.prototype.update = function(O, l) {
        typeof O == "string" && (l = l || "utf8", O = n.from(O, l));
        for (var i = this._block, s = this._blockSize, o = O.length, e = this._len, j = 0; j < o; ) {
          for (var E = e % s, m = Math.min(o - j, s - E), _ = 0; _ < m; _++) i[E + _] = O[j + _];
          j += m, (e += m) % s == 0 && this._update(i);
        }
        return this._len += o, this;
      }, u.prototype.digest = function(O) {
        var l = this._len % this._blockSize;
        this._block[l] = 128, this._block.fill(0, l + 1), l >= this._finalSize && (this._update(this._block), this._block.fill(0));
        var i = 8 * this._len;
        if (i <= 4294967295) this._block.writeUInt32BE(i, this._blockSize - 4);
        else {
          var s = (4294967295 & i) >>> 0, o = (i - s) / 4294967296;
          this._block.writeUInt32BE(o, this._blockSize - 8), this._block.writeUInt32BE(s, this._blockSize - 4);
        }
        this._update(this._block);
        var e = this._hash();
        return O ? e.toString(O) : e;
      }, u.prototype._update = function() {
        throw new Error("_update must be implemented by subclass");
      }, N.exports = u;
    }, function(N, g, t) {
      var n = t(151), u = t(31), O = t(122), l = t(96), i = t(123), s = Object.prototype.toString;
      function o(j) {
        if (!(this instanceof o)) return new o(j);
        this.options = u.assign({ level: -1, method: 8, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: 0, to: "" }, j || {});
        var E = this.options;
        E.raw && E.windowBits > 0 ? E.windowBits = -E.windowBits : E.gzip && E.windowBits > 0 && E.windowBits < 16 && (E.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new i(), this.strm.avail_out = 0;
        var m = n.deflateInit2(this.strm, E.level, E.method, E.windowBits, E.memLevel, E.strategy);
        if (m !== 0) throw new Error(l[m]);
        if (E.header && n.deflateSetHeader(this.strm, E.header), E.dictionary) {
          var _;
          if (_ = typeof E.dictionary == "string" ? O.string2buf(E.dictionary) : s.call(E.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(E.dictionary) : E.dictionary, (m = n.deflateSetDictionary(this.strm, _)) !== 0) throw new Error(l[m]);
          this._dict_set = !0;
        }
      }
      function e(j, E) {
        var m = new o(E);
        if (m.push(j, !0), m.err) throw m.msg || l[m.err];
        return m.result;
      }
      o.prototype.push = function(j, E) {
        var m, _, h = this.strm, S = this.options.chunkSize;
        if (this.ended) return !1;
        _ = E === ~~E ? E : E === !0 ? 4 : 0, typeof j == "string" ? h.input = O.string2buf(j) : s.call(j) === "[object ArrayBuffer]" ? h.input = new Uint8Array(j) : h.input = j, h.next_in = 0, h.avail_in = h.input.length;
        do {
          if (h.avail_out === 0 && (h.output = new u.Buf8(S), h.next_out = 0, h.avail_out = S), (m = n.deflate(h, _)) !== 1 && m !== 0) return this.onEnd(m), this.ended = !0, !1;
          h.avail_out !== 0 && (h.avail_in !== 0 || _ !== 4 && _ !== 2) || (this.options.to === "string" ? this.onData(O.buf2binstring(u.shrinkBuf(h.output, h.next_out))) : this.onData(u.shrinkBuf(h.output, h.next_out)));
        } while ((h.avail_in > 0 || h.avail_out === 0) && m !== 1);
        return _ === 4 ? (m = n.deflateEnd(this.strm), this.onEnd(m), this.ended = !0, m === 0) : _ !== 2 || (this.onEnd(0), h.avail_out = 0, !0);
      }, o.prototype.onData = function(j) {
        this.chunks.push(j);
      }, o.prototype.onEnd = function(j) {
        j === 0 && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = u.flattenChunks(this.chunks)), this.chunks = [], this.err = j, this.msg = this.strm.msg;
      }, g.Deflate = o, g.deflate = e, g.deflateRaw = function(j, E) {
        return (E = E || {}).raw = !0, e(j, E);
      }, g.gzip = function(j, E) {
        return (E = E || {}).gzip = !0, e(j, E);
      };
    }, function(N, g, t) {
      var n, u = t(31), O = t(152), l = t(120), i = t(121), s = t(96);
      function o(A, F) {
        return A.msg = s[F], F;
      }
      function e(A) {
        return (A << 1) - (A > 4 ? 9 : 0);
      }
      function j(A) {
        for (var F = A.length; --F >= 0; ) A[F] = 0;
      }
      function E(A) {
        var F = A.state, z = F.pending;
        z > A.avail_out && (z = A.avail_out), z !== 0 && (u.arraySet(A.output, F.pending_buf, F.pending_out, z, A.next_out), A.next_out += z, F.pending_out += z, A.total_out += z, A.avail_out -= z, F.pending -= z, F.pending === 0 && (F.pending_out = 0));
      }
      function m(A, F) {
        O._tr_flush_block(A, A.block_start >= 0 ? A.block_start : -1, A.strstart - A.block_start, F), A.block_start = A.strstart, E(A.strm);
      }
      function _(A, F) {
        A.pending_buf[A.pending++] = F;
      }
      function h(A, F) {
        A.pending_buf[A.pending++] = F >>> 8 & 255, A.pending_buf[A.pending++] = 255 & F;
      }
      function S(A, F) {
        var z, $, H = A.max_chain_length, nt = A.strstart, ot = A.prev_length, V = A.nice_match, it = A.strstart > A.w_size - 262 ? A.strstart - (A.w_size - 262) : 0, lt = A.window, dt = A.w_mask, G = A.prev, Z = A.strstart + 258, ut = lt[nt + ot - 1], pt = lt[nt + ot];
        A.prev_length >= A.good_match && (H >>= 2), V > A.lookahead && (V = A.lookahead);
        do
          if (lt[(z = F) + ot] === pt && lt[z + ot - 1] === ut && lt[z] === lt[nt] && lt[++z] === lt[nt + 1]) {
            nt += 2, z++;
            do
              ;
            while (lt[++nt] === lt[++z] && lt[++nt] === lt[++z] && lt[++nt] === lt[++z] && lt[++nt] === lt[++z] && lt[++nt] === lt[++z] && lt[++nt] === lt[++z] && lt[++nt] === lt[++z] && lt[++nt] === lt[++z] && nt < Z);
            if ($ = 258 - (Z - nt), nt = Z - 258, $ > ot) {
              if (A.match_start = F, ot = $, $ >= V) break;
              ut = lt[nt + ot - 1], pt = lt[nt + ot];
            }
          }
        while ((F = G[F & dt]) > it && --H != 0);
        return ot <= A.lookahead ? ot : A.lookahead;
      }
      function x(A) {
        var F, z, $, H, nt, ot, V, it, lt, dt, G = A.w_size;
        do {
          if (H = A.window_size - A.lookahead - A.strstart, A.strstart >= G + (G - 262)) {
            u.arraySet(A.window, A.window, G, G, 0), A.match_start -= G, A.strstart -= G, A.block_start -= G, F = z = A.hash_size;
            do
              $ = A.head[--F], A.head[F] = $ >= G ? $ - G : 0;
            while (--z);
            F = z = G;
            do
              $ = A.prev[--F], A.prev[F] = $ >= G ? $ - G : 0;
            while (--z);
            H += G;
          }
          if (A.strm.avail_in === 0) break;
          if (ot = A.strm, V = A.window, it = A.strstart + A.lookahead, lt = H, dt = void 0, (dt = ot.avail_in) > lt && (dt = lt), z = dt === 0 ? 0 : (ot.avail_in -= dt, u.arraySet(V, ot.input, ot.next_in, dt, it), ot.state.wrap === 1 ? ot.adler = l(ot.adler, V, dt, it) : ot.state.wrap === 2 && (ot.adler = i(ot.adler, V, dt, it)), ot.next_in += dt, ot.total_in += dt, dt), A.lookahead += z, A.lookahead + A.insert >= 3) for (nt = A.strstart - A.insert, A.ins_h = A.window[nt], A.ins_h = (A.ins_h << A.hash_shift ^ A.window[nt + 1]) & A.hash_mask; A.insert && (A.ins_h = (A.ins_h << A.hash_shift ^ A.window[nt + 3 - 1]) & A.hash_mask, A.prev[nt & A.w_mask] = A.head[A.ins_h], A.head[A.ins_h] = nt, nt++, A.insert--, !(A.lookahead + A.insert < 3)); ) ;
        } while (A.lookahead < 262 && A.strm.avail_in !== 0);
      }
      function R(A, F) {
        for (var z, $; ; ) {
          if (A.lookahead < 262) {
            if (x(A), A.lookahead < 262 && F === 0) return 1;
            if (A.lookahead === 0) break;
          }
          if (z = 0, A.lookahead >= 3 && (A.ins_h = (A.ins_h << A.hash_shift ^ A.window[A.strstart + 3 - 1]) & A.hash_mask, z = A.prev[A.strstart & A.w_mask] = A.head[A.ins_h], A.head[A.ins_h] = A.strstart), z !== 0 && A.strstart - z <= A.w_size - 262 && (A.match_length = S(A, z)), A.match_length >= 3) if ($ = O._tr_tally(A, A.strstart - A.match_start, A.match_length - 3), A.lookahead -= A.match_length, A.match_length <= A.max_lazy_match && A.lookahead >= 3) {
            A.match_length--;
            do
              A.strstart++, A.ins_h = (A.ins_h << A.hash_shift ^ A.window[A.strstart + 3 - 1]) & A.hash_mask, z = A.prev[A.strstart & A.w_mask] = A.head[A.ins_h], A.head[A.ins_h] = A.strstart;
            while (--A.match_length != 0);
            A.strstart++;
          } else A.strstart += A.match_length, A.match_length = 0, A.ins_h = A.window[A.strstart], A.ins_h = (A.ins_h << A.hash_shift ^ A.window[A.strstart + 1]) & A.hash_mask;
          else $ = O._tr_tally(A, 0, A.window[A.strstart]), A.lookahead--, A.strstart++;
          if ($ && (m(A, !1), A.strm.avail_out === 0)) return 1;
        }
        return A.insert = A.strstart < 2 ? A.strstart : 2, F === 4 ? (m(A, !0), A.strm.avail_out === 0 ? 3 : 4) : A.last_lit && (m(A, !1), A.strm.avail_out === 0) ? 1 : 2;
      }
      function c(A, F) {
        for (var z, $, H; ; ) {
          if (A.lookahead < 262) {
            if (x(A), A.lookahead < 262 && F === 0) return 1;
            if (A.lookahead === 0) break;
          }
          if (z = 0, A.lookahead >= 3 && (A.ins_h = (A.ins_h << A.hash_shift ^ A.window[A.strstart + 3 - 1]) & A.hash_mask, z = A.prev[A.strstart & A.w_mask] = A.head[A.ins_h], A.head[A.ins_h] = A.strstart), A.prev_length = A.match_length, A.prev_match = A.match_start, A.match_length = 2, z !== 0 && A.prev_length < A.max_lazy_match && A.strstart - z <= A.w_size - 262 && (A.match_length = S(A, z), A.match_length <= 5 && (A.strategy === 1 || A.match_length === 3 && A.strstart - A.match_start > 4096) && (A.match_length = 2)), A.prev_length >= 3 && A.match_length <= A.prev_length) {
            H = A.strstart + A.lookahead - 3, $ = O._tr_tally(A, A.strstart - 1 - A.prev_match, A.prev_length - 3), A.lookahead -= A.prev_length - 1, A.prev_length -= 2;
            do
              ++A.strstart <= H && (A.ins_h = (A.ins_h << A.hash_shift ^ A.window[A.strstart + 3 - 1]) & A.hash_mask, z = A.prev[A.strstart & A.w_mask] = A.head[A.ins_h], A.head[A.ins_h] = A.strstart);
            while (--A.prev_length != 0);
            if (A.match_available = 0, A.match_length = 2, A.strstart++, $ && (m(A, !1), A.strm.avail_out === 0)) return 1;
          } else if (A.match_available) {
            if (($ = O._tr_tally(A, 0, A.window[A.strstart - 1])) && m(A, !1), A.strstart++, A.lookahead--, A.strm.avail_out === 0) return 1;
          } else A.match_available = 1, A.strstart++, A.lookahead--;
        }
        return A.match_available && ($ = O._tr_tally(A, 0, A.window[A.strstart - 1]), A.match_available = 0), A.insert = A.strstart < 2 ? A.strstart : 2, F === 4 ? (m(A, !0), A.strm.avail_out === 0 ? 3 : 4) : A.last_lit && (m(A, !1), A.strm.avail_out === 0) ? 1 : 2;
      }
      function P(A, F, z, $, H) {
        this.good_length = A, this.max_lazy = F, this.nice_length = z, this.max_chain = $, this.func = H;
      }
      function w() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = 8, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new u.Buf16(1146), this.dyn_dtree = new u.Buf16(122), this.bl_tree = new u.Buf16(78), j(this.dyn_ltree), j(this.dyn_dtree), j(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new u.Buf16(16), this.heap = new u.Buf16(573), j(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new u.Buf16(573), j(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function I(A) {
        var F;
        return A && A.state ? (A.total_in = A.total_out = 0, A.data_type = 2, (F = A.state).pending = 0, F.pending_out = 0, F.wrap < 0 && (F.wrap = -F.wrap), F.status = F.wrap ? 42 : 113, A.adler = F.wrap === 2 ? 0 : 1, F.last_flush = 0, O._tr_init(F), 0) : o(A, -2);
      }
      function T(A) {
        var F, z = I(A);
        return z === 0 && ((F = A.state).window_size = 2 * F.w_size, j(F.head), F.max_lazy_match = n[F.level].max_lazy, F.good_match = n[F.level].good_length, F.nice_match = n[F.level].nice_length, F.max_chain_length = n[F.level].max_chain, F.strstart = 0, F.block_start = 0, F.lookahead = 0, F.insert = 0, F.match_length = F.prev_length = 2, F.match_available = 0, F.ins_h = 0), z;
      }
      function M(A, F, z, $, H, nt) {
        if (!A) return -2;
        var ot = 1;
        if (F === -1 && (F = 6), $ < 0 ? (ot = 0, $ = -$) : $ > 15 && (ot = 2, $ -= 16), H < 1 || H > 9 || z !== 8 || $ < 8 || $ > 15 || F < 0 || F > 9 || nt < 0 || nt > 4) return o(A, -2);
        $ === 8 && ($ = 9);
        var V = new w();
        return A.state = V, V.strm = A, V.wrap = ot, V.gzhead = null, V.w_bits = $, V.w_size = 1 << V.w_bits, V.w_mask = V.w_size - 1, V.hash_bits = H + 7, V.hash_size = 1 << V.hash_bits, V.hash_mask = V.hash_size - 1, V.hash_shift = ~~((V.hash_bits + 3 - 1) / 3), V.window = new u.Buf8(2 * V.w_size), V.head = new u.Buf16(V.hash_size), V.prev = new u.Buf16(V.w_size), V.lit_bufsize = 1 << H + 6, V.pending_buf_size = 4 * V.lit_bufsize, V.pending_buf = new u.Buf8(V.pending_buf_size), V.d_buf = 1 * V.lit_bufsize, V.l_buf = 3 * V.lit_bufsize, V.level = F, V.strategy = nt, V.method = z, T(A);
      }
      n = [new P(0, 0, 0, 0, function(A, F) {
        var z = 65535;
        for (z > A.pending_buf_size - 5 && (z = A.pending_buf_size - 5); ; ) {
          if (A.lookahead <= 1) {
            if (x(A), A.lookahead === 0 && F === 0) return 1;
            if (A.lookahead === 0) break;
          }
          A.strstart += A.lookahead, A.lookahead = 0;
          var $ = A.block_start + z;
          if ((A.strstart === 0 || A.strstart >= $) && (A.lookahead = A.strstart - $, A.strstart = $, m(A, !1), A.strm.avail_out === 0) || A.strstart - A.block_start >= A.w_size - 262 && (m(A, !1), A.strm.avail_out === 0)) return 1;
        }
        return A.insert = 0, F === 4 ? (m(A, !0), A.strm.avail_out === 0 ? 3 : 4) : (A.strstart > A.block_start && (m(A, !1), A.strm.avail_out), 1);
      }), new P(4, 4, 8, 4, R), new P(4, 5, 16, 8, R), new P(4, 6, 32, 32, R), new P(4, 4, 16, 16, c), new P(8, 16, 32, 32, c), new P(8, 16, 128, 128, c), new P(8, 32, 128, 256, c), new P(32, 128, 258, 1024, c), new P(32, 258, 258, 4096, c)], g.deflateInit = function(A, F) {
        return M(A, F, 8, 15, 8, 0);
      }, g.deflateInit2 = M, g.deflateReset = T, g.deflateResetKeep = I, g.deflateSetHeader = function(A, F) {
        return A && A.state ? A.state.wrap !== 2 ? -2 : (A.state.gzhead = F, 0) : -2;
      }, g.deflate = function(A, F) {
        var z, $, H, nt;
        if (!A || !A.state || F > 5 || F < 0) return A ? o(A, -2) : -2;
        if ($ = A.state, !A.output || !A.input && A.avail_in !== 0 || $.status === 666 && F !== 4) return o(A, A.avail_out === 0 ? -5 : -2);
        if ($.strm = A, z = $.last_flush, $.last_flush = F, $.status === 42) if ($.wrap === 2) A.adler = 0, _($, 31), _($, 139), _($, 8), $.gzhead ? (_($, ($.gzhead.text ? 1 : 0) + ($.gzhead.hcrc ? 2 : 0) + ($.gzhead.extra ? 4 : 0) + ($.gzhead.name ? 8 : 0) + ($.gzhead.comment ? 16 : 0)), _($, 255 & $.gzhead.time), _($, $.gzhead.time >> 8 & 255), _($, $.gzhead.time >> 16 & 255), _($, $.gzhead.time >> 24 & 255), _($, $.level === 9 ? 2 : $.strategy >= 2 || $.level < 2 ? 4 : 0), _($, 255 & $.gzhead.os), $.gzhead.extra && $.gzhead.extra.length && (_($, 255 & $.gzhead.extra.length), _($, $.gzhead.extra.length >> 8 & 255)), $.gzhead.hcrc && (A.adler = i(A.adler, $.pending_buf, $.pending, 0)), $.gzindex = 0, $.status = 69) : (_($, 0), _($, 0), _($, 0), _($, 0), _($, 0), _($, $.level === 9 ? 2 : $.strategy >= 2 || $.level < 2 ? 4 : 0), _($, 3), $.status = 113);
        else {
          var ot = 8 + ($.w_bits - 8 << 4) << 8;
          ot |= ($.strategy >= 2 || $.level < 2 ? 0 : $.level < 6 ? 1 : $.level === 6 ? 2 : 3) << 6, $.strstart !== 0 && (ot |= 32), ot += 31 - ot % 31, $.status = 113, h($, ot), $.strstart !== 0 && (h($, A.adler >>> 16), h($, 65535 & A.adler)), A.adler = 1;
        }
        if ($.status === 69) if ($.gzhead.extra) {
          for (H = $.pending; $.gzindex < (65535 & $.gzhead.extra.length) && ($.pending !== $.pending_buf_size || ($.gzhead.hcrc && $.pending > H && (A.adler = i(A.adler, $.pending_buf, $.pending - H, H)), E(A), H = $.pending, $.pending !== $.pending_buf_size)); ) _($, 255 & $.gzhead.extra[$.gzindex]), $.gzindex++;
          $.gzhead.hcrc && $.pending > H && (A.adler = i(A.adler, $.pending_buf, $.pending - H, H)), $.gzindex === $.gzhead.extra.length && ($.gzindex = 0, $.status = 73);
        } else $.status = 73;
        if ($.status === 73) if ($.gzhead.name) {
          H = $.pending;
          do {
            if ($.pending === $.pending_buf_size && ($.gzhead.hcrc && $.pending > H && (A.adler = i(A.adler, $.pending_buf, $.pending - H, H)), E(A), H = $.pending, $.pending === $.pending_buf_size)) {
              nt = 1;
              break;
            }
            nt = $.gzindex < $.gzhead.name.length ? 255 & $.gzhead.name.charCodeAt($.gzindex++) : 0, _($, nt);
          } while (nt !== 0);
          $.gzhead.hcrc && $.pending > H && (A.adler = i(A.adler, $.pending_buf, $.pending - H, H)), nt === 0 && ($.gzindex = 0, $.status = 91);
        } else $.status = 91;
        if ($.status === 91) if ($.gzhead.comment) {
          H = $.pending;
          do {
            if ($.pending === $.pending_buf_size && ($.gzhead.hcrc && $.pending > H && (A.adler = i(A.adler, $.pending_buf, $.pending - H, H)), E(A), H = $.pending, $.pending === $.pending_buf_size)) {
              nt = 1;
              break;
            }
            nt = $.gzindex < $.gzhead.comment.length ? 255 & $.gzhead.comment.charCodeAt($.gzindex++) : 0, _($, nt);
          } while (nt !== 0);
          $.gzhead.hcrc && $.pending > H && (A.adler = i(A.adler, $.pending_buf, $.pending - H, H)), nt === 0 && ($.status = 103);
        } else $.status = 103;
        if ($.status === 103 && ($.gzhead.hcrc ? ($.pending + 2 > $.pending_buf_size && E(A), $.pending + 2 <= $.pending_buf_size && (_($, 255 & A.adler), _($, A.adler >> 8 & 255), A.adler = 0, $.status = 113)) : $.status = 113), $.pending !== 0) {
          if (E(A), A.avail_out === 0) return $.last_flush = -1, 0;
        } else if (A.avail_in === 0 && e(F) <= e(z) && F !== 4) return o(A, -5);
        if ($.status === 666 && A.avail_in !== 0) return o(A, -5);
        if (A.avail_in !== 0 || $.lookahead !== 0 || F !== 0 && $.status !== 666) {
          var V = $.strategy === 2 ? function(it, lt) {
            for (var dt; ; ) {
              if (it.lookahead === 0 && (x(it), it.lookahead === 0)) {
                if (lt === 0) return 1;
                break;
              }
              if (it.match_length = 0, dt = O._tr_tally(it, 0, it.window[it.strstart]), it.lookahead--, it.strstart++, dt && (m(it, !1), it.strm.avail_out === 0)) return 1;
            }
            return it.insert = 0, lt === 4 ? (m(it, !0), it.strm.avail_out === 0 ? 3 : 4) : it.last_lit && (m(it, !1), it.strm.avail_out === 0) ? 1 : 2;
          }($, F) : $.strategy === 3 ? function(it, lt) {
            for (var dt, G, Z, ut, pt = it.window; ; ) {
              if (it.lookahead <= 258) {
                if (x(it), it.lookahead <= 258 && lt === 0) return 1;
                if (it.lookahead === 0) break;
              }
              if (it.match_length = 0, it.lookahead >= 3 && it.strstart > 0 && (G = pt[Z = it.strstart - 1]) === pt[++Z] && G === pt[++Z] && G === pt[++Z]) {
                ut = it.strstart + 258;
                do
                  ;
                while (G === pt[++Z] && G === pt[++Z] && G === pt[++Z] && G === pt[++Z] && G === pt[++Z] && G === pt[++Z] && G === pt[++Z] && G === pt[++Z] && Z < ut);
                it.match_length = 258 - (ut - Z), it.match_length > it.lookahead && (it.match_length = it.lookahead);
              }
              if (it.match_length >= 3 ? (dt = O._tr_tally(it, 1, it.match_length - 3), it.lookahead -= it.match_length, it.strstart += it.match_length, it.match_length = 0) : (dt = O._tr_tally(it, 0, it.window[it.strstart]), it.lookahead--, it.strstart++), dt && (m(it, !1), it.strm.avail_out === 0)) return 1;
            }
            return it.insert = 0, lt === 4 ? (m(it, !0), it.strm.avail_out === 0 ? 3 : 4) : it.last_lit && (m(it, !1), it.strm.avail_out === 0) ? 1 : 2;
          }($, F) : n[$.level].func($, F);
          if (V !== 3 && V !== 4 || ($.status = 666), V === 1 || V === 3) return A.avail_out === 0 && ($.last_flush = -1), 0;
          if (V === 2 && (F === 1 ? O._tr_align($) : F !== 5 && (O._tr_stored_block($, 0, 0, !1), F === 3 && (j($.head), $.lookahead === 0 && ($.strstart = 0, $.block_start = 0, $.insert = 0))), E(A), A.avail_out === 0)) return $.last_flush = -1, 0;
        }
        return F !== 4 ? 0 : $.wrap <= 0 ? 1 : ($.wrap === 2 ? (_($, 255 & A.adler), _($, A.adler >> 8 & 255), _($, A.adler >> 16 & 255), _($, A.adler >> 24 & 255), _($, 255 & A.total_in), _($, A.total_in >> 8 & 255), _($, A.total_in >> 16 & 255), _($, A.total_in >> 24 & 255)) : (h($, A.adler >>> 16), h($, 65535 & A.adler)), E(A), $.wrap > 0 && ($.wrap = -$.wrap), $.pending !== 0 ? 0 : 1);
      }, g.deflateEnd = function(A) {
        var F;
        return A && A.state ? (F = A.state.status) !== 42 && F !== 69 && F !== 73 && F !== 91 && F !== 103 && F !== 113 && F !== 666 ? o(A, -2) : (A.state = null, F === 113 ? o(A, -3) : 0) : -2;
      }, g.deflateSetDictionary = function(A, F) {
        var z, $, H, nt, ot, V, it, lt, dt = F.length;
        if (!A || !A.state || (nt = (z = A.state).wrap) === 2 || nt === 1 && z.status !== 42 || z.lookahead) return -2;
        for (nt === 1 && (A.adler = l(A.adler, F, dt, 0)), z.wrap = 0, dt >= z.w_size && (nt === 0 && (j(z.head), z.strstart = 0, z.block_start = 0, z.insert = 0), lt = new u.Buf8(z.w_size), u.arraySet(lt, F, dt - z.w_size, z.w_size, 0), F = lt, dt = z.w_size), ot = A.avail_in, V = A.next_in, it = A.input, A.avail_in = dt, A.next_in = 0, A.input = F, x(z); z.lookahead >= 3; ) {
          $ = z.strstart, H = z.lookahead - 2;
          do
            z.ins_h = (z.ins_h << z.hash_shift ^ z.window[$ + 3 - 1]) & z.hash_mask, z.prev[$ & z.w_mask] = z.head[z.ins_h], z.head[z.ins_h] = $, $++;
          while (--H);
          z.strstart = $, z.lookahead = 2, x(z);
        }
        return z.strstart += z.lookahead, z.block_start = z.strstart, z.insert = z.lookahead, z.lookahead = 0, z.match_length = z.prev_length = 2, z.match_available = 0, A.next_in = V, A.input = it, A.avail_in = ot, z.wrap = nt, 0;
      }, g.deflateInfo = "pako deflate (from Nodeca project)";
    }, function(N, g, t) {
      var n = t(31);
      function u(G) {
        for (var Z = G.length; --Z >= 0; ) G[Z] = 0;
      }
      var O = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], l = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], s = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], o = new Array(576);
      u(o);
      var e = new Array(60);
      u(e);
      var j = new Array(512);
      u(j);
      var E = new Array(256);
      u(E);
      var m = new Array(29);
      u(m);
      var _, h, S, x = new Array(30);
      function R(G, Z, ut, pt, st) {
        this.static_tree = G, this.extra_bits = Z, this.extra_base = ut, this.elems = pt, this.max_length = st, this.has_stree = G && G.length;
      }
      function c(G, Z) {
        this.dyn_tree = G, this.max_code = 0, this.stat_desc = Z;
      }
      function P(G) {
        return G < 256 ? j[G] : j[256 + (G >>> 7)];
      }
      function w(G, Z) {
        G.pending_buf[G.pending++] = 255 & Z, G.pending_buf[G.pending++] = Z >>> 8 & 255;
      }
      function I(G, Z, ut) {
        G.bi_valid > 16 - ut ? (G.bi_buf |= Z << G.bi_valid & 65535, w(G, G.bi_buf), G.bi_buf = Z >> 16 - G.bi_valid, G.bi_valid += ut - 16) : (G.bi_buf |= Z << G.bi_valid & 65535, G.bi_valid += ut);
      }
      function T(G, Z, ut) {
        I(G, ut[2 * Z], ut[2 * Z + 1]);
      }
      function M(G, Z) {
        var ut = 0;
        do
          ut |= 1 & G, G >>>= 1, ut <<= 1;
        while (--Z > 0);
        return ut >>> 1;
      }
      function A(G, Z, ut) {
        var pt, st, mt = new Array(16), bt = 0;
        for (pt = 1; pt <= 15; pt++) mt[pt] = bt = bt + ut[pt - 1] << 1;
        for (st = 0; st <= Z; st++) {
          var wt = G[2 * st + 1];
          wt !== 0 && (G[2 * st] = M(mt[wt]++, wt));
        }
      }
      function F(G) {
        var Z;
        for (Z = 0; Z < 286; Z++) G.dyn_ltree[2 * Z] = 0;
        for (Z = 0; Z < 30; Z++) G.dyn_dtree[2 * Z] = 0;
        for (Z = 0; Z < 19; Z++) G.bl_tree[2 * Z] = 0;
        G.dyn_ltree[512] = 1, G.opt_len = G.static_len = 0, G.last_lit = G.matches = 0;
      }
      function z(G) {
        G.bi_valid > 8 ? w(G, G.bi_buf) : G.bi_valid > 0 && (G.pending_buf[G.pending++] = G.bi_buf), G.bi_buf = 0, G.bi_valid = 0;
      }
      function $(G, Z, ut, pt) {
        var st = 2 * Z, mt = 2 * ut;
        return G[st] < G[mt] || G[st] === G[mt] && pt[Z] <= pt[ut];
      }
      function H(G, Z, ut) {
        for (var pt = G.heap[ut], st = ut << 1; st <= G.heap_len && (st < G.heap_len && $(Z, G.heap[st + 1], G.heap[st], G.depth) && st++, !$(Z, pt, G.heap[st], G.depth)); ) G.heap[ut] = G.heap[st], ut = st, st <<= 1;
        G.heap[ut] = pt;
      }
      function nt(G, Z, ut) {
        var pt, st, mt, bt, wt = 0;
        if (G.last_lit !== 0) do
          pt = G.pending_buf[G.d_buf + 2 * wt] << 8 | G.pending_buf[G.d_buf + 2 * wt + 1], st = G.pending_buf[G.l_buf + wt], wt++, pt === 0 ? T(G, st, Z) : (T(G, (mt = E[st]) + 256 + 1, Z), (bt = O[mt]) !== 0 && I(G, st -= m[mt], bt), T(G, mt = P(--pt), ut), (bt = l[mt]) !== 0 && I(G, pt -= x[mt], bt));
        while (wt < G.last_lit);
        T(G, 256, Z);
      }
      function ot(G, Z) {
        var ut, pt, st, mt = Z.dyn_tree, bt = Z.stat_desc.static_tree, wt = Z.stat_desc.has_stree, C = Z.stat_desc.elems, U = -1;
        for (G.heap_len = 0, G.heap_max = 573, ut = 0; ut < C; ut++) mt[2 * ut] !== 0 ? (G.heap[++G.heap_len] = U = ut, G.depth[ut] = 0) : mt[2 * ut + 1] = 0;
        for (; G.heap_len < 2; ) mt[2 * (st = G.heap[++G.heap_len] = U < 2 ? ++U : 0)] = 1, G.depth[st] = 0, G.opt_len--, wt && (G.static_len -= bt[2 * st + 1]);
        for (Z.max_code = U, ut = G.heap_len >> 1; ut >= 1; ut--) H(G, mt, ut);
        st = C;
        do
          ut = G.heap[1], G.heap[1] = G.heap[G.heap_len--], H(G, mt, 1), pt = G.heap[1], G.heap[--G.heap_max] = ut, G.heap[--G.heap_max] = pt, mt[2 * st] = mt[2 * ut] + mt[2 * pt], G.depth[st] = (G.depth[ut] >= G.depth[pt] ? G.depth[ut] : G.depth[pt]) + 1, mt[2 * ut + 1] = mt[2 * pt + 1] = st, G.heap[1] = st++, H(G, mt, 1);
        while (G.heap_len >= 2);
        G.heap[--G.heap_max] = G.heap[1], function(L, K) {
          var X, rt, yt, jt, Rt, Tt, Et = K.dyn_tree, Wt = K.max_code, Vt = K.stat_desc.static_tree, re = K.stat_desc.has_stree, vt = K.stat_desc.extra_bits, Zt = K.stat_desc.extra_base, Dt = K.stat_desc.max_length, qt = 0;
          for (jt = 0; jt <= 15; jt++) L.bl_count[jt] = 0;
          for (Et[2 * L.heap[L.heap_max] + 1] = 0, X = L.heap_max + 1; X < 573; X++) (jt = Et[2 * Et[2 * (rt = L.heap[X]) + 1] + 1] + 1) > Dt && (jt = Dt, qt++), Et[2 * rt + 1] = jt, rt > Wt || (L.bl_count[jt]++, Rt = 0, rt >= Zt && (Rt = vt[rt - Zt]), Tt = Et[2 * rt], L.opt_len += Tt * (jt + Rt), re && (L.static_len += Tt * (Vt[2 * rt + 1] + Rt)));
          if (qt !== 0) {
            do {
              for (jt = Dt - 1; L.bl_count[jt] === 0; ) jt--;
              L.bl_count[jt]--, L.bl_count[jt + 1] += 2, L.bl_count[Dt]--, qt -= 2;
            } while (qt > 0);
            for (jt = Dt; jt !== 0; jt--) for (rt = L.bl_count[jt]; rt !== 0; ) (yt = L.heap[--X]) > Wt || (Et[2 * yt + 1] !== jt && (L.opt_len += (jt - Et[2 * yt + 1]) * Et[2 * yt], Et[2 * yt + 1] = jt), rt--);
          }
        }(G, Z), A(mt, U, G.bl_count);
      }
      function V(G, Z, ut) {
        var pt, st, mt = -1, bt = Z[1], wt = 0, C = 7, U = 4;
        for (bt === 0 && (C = 138, U = 3), Z[2 * (ut + 1) + 1] = 65535, pt = 0; pt <= ut; pt++) st = bt, bt = Z[2 * (pt + 1) + 1], ++wt < C && st === bt || (wt < U ? G.bl_tree[2 * st] += wt : st !== 0 ? (st !== mt && G.bl_tree[2 * st]++, G.bl_tree[32]++) : wt <= 10 ? G.bl_tree[34]++ : G.bl_tree[36]++, wt = 0, mt = st, bt === 0 ? (C = 138, U = 3) : st === bt ? (C = 6, U = 3) : (C = 7, U = 4));
      }
      function it(G, Z, ut) {
        var pt, st, mt = -1, bt = Z[1], wt = 0, C = 7, U = 4;
        for (bt === 0 && (C = 138, U = 3), pt = 0; pt <= ut; pt++) if (st = bt, bt = Z[2 * (pt + 1) + 1], !(++wt < C && st === bt)) {
          if (wt < U) do
            T(G, st, G.bl_tree);
          while (--wt != 0);
          else st !== 0 ? (st !== mt && (T(G, st, G.bl_tree), wt--), T(G, 16, G.bl_tree), I(G, wt - 3, 2)) : wt <= 10 ? (T(G, 17, G.bl_tree), I(G, wt - 3, 3)) : (T(G, 18, G.bl_tree), I(G, wt - 11, 7));
          wt = 0, mt = st, bt === 0 ? (C = 138, U = 3) : st === bt ? (C = 6, U = 3) : (C = 7, U = 4);
        }
      }
      u(x);
      var lt = !1;
      function dt(G, Z, ut, pt) {
        I(G, 0 + (pt ? 1 : 0), 3), function(st, mt, bt, wt) {
          z(st), w(st, bt), w(st, ~bt), n.arraySet(st.pending_buf, st.window, mt, bt, st.pending), st.pending += bt;
        }(G, Z, ut);
      }
      g._tr_init = function(G) {
        lt || (function() {
          var Z, ut, pt, st, mt, bt = new Array(16);
          for (pt = 0, st = 0; st < 28; st++) for (m[st] = pt, Z = 0; Z < 1 << O[st]; Z++) E[pt++] = st;
          for (E[pt - 1] = st, mt = 0, st = 0; st < 16; st++) for (x[st] = mt, Z = 0; Z < 1 << l[st]; Z++) j[mt++] = st;
          for (mt >>= 7; st < 30; st++) for (x[st] = mt << 7, Z = 0; Z < 1 << l[st] - 7; Z++) j[256 + mt++] = st;
          for (ut = 0; ut <= 15; ut++) bt[ut] = 0;
          for (Z = 0; Z <= 143; ) o[2 * Z + 1] = 8, Z++, bt[8]++;
          for (; Z <= 255; ) o[2 * Z + 1] = 9, Z++, bt[9]++;
          for (; Z <= 279; ) o[2 * Z + 1] = 7, Z++, bt[7]++;
          for (; Z <= 287; ) o[2 * Z + 1] = 8, Z++, bt[8]++;
          for (A(o, 287, bt), Z = 0; Z < 30; Z++) e[2 * Z + 1] = 5, e[2 * Z] = M(Z, 5);
          _ = new R(o, O, 257, 286, 15), h = new R(e, l, 0, 30, 15), S = new R(new Array(0), i, 0, 19, 7);
        }(), lt = !0), G.l_desc = new c(G.dyn_ltree, _), G.d_desc = new c(G.dyn_dtree, h), G.bl_desc = new c(G.bl_tree, S), G.bi_buf = 0, G.bi_valid = 0, F(G);
      }, g._tr_stored_block = dt, g._tr_flush_block = function(G, Z, ut, pt) {
        var st, mt, bt = 0;
        G.level > 0 ? (G.strm.data_type === 2 && (G.strm.data_type = function(wt) {
          var C, U = 4093624447;
          for (C = 0; C <= 31; C++, U >>>= 1) if (1 & U && wt.dyn_ltree[2 * C] !== 0) return 0;
          if (wt.dyn_ltree[18] !== 0 || wt.dyn_ltree[20] !== 0 || wt.dyn_ltree[26] !== 0) return 1;
          for (C = 32; C < 256; C++) if (wt.dyn_ltree[2 * C] !== 0) return 1;
          return 0;
        }(G)), ot(G, G.l_desc), ot(G, G.d_desc), bt = function(wt) {
          var C;
          for (V(wt, wt.dyn_ltree, wt.l_desc.max_code), V(wt, wt.dyn_dtree, wt.d_desc.max_code), ot(wt, wt.bl_desc), C = 18; C >= 3 && wt.bl_tree[2 * s[C] + 1] === 0; C--) ;
          return wt.opt_len += 3 * (C + 1) + 5 + 5 + 4, C;
        }(G), st = G.opt_len + 3 + 7 >>> 3, (mt = G.static_len + 3 + 7 >>> 3) <= st && (st = mt)) : st = mt = ut + 5, ut + 4 <= st && Z !== -1 ? dt(G, Z, ut, pt) : G.strategy === 4 || mt === st ? (I(G, 2 + (pt ? 1 : 0), 3), nt(G, o, e)) : (I(G, 4 + (pt ? 1 : 0), 3), function(wt, C, U, L) {
          var K;
          for (I(wt, C - 257, 5), I(wt, U - 1, 5), I(wt, L - 4, 4), K = 0; K < L; K++) I(wt, wt.bl_tree[2 * s[K] + 1], 3);
          it(wt, wt.dyn_ltree, C - 1), it(wt, wt.dyn_dtree, U - 1);
        }(G, G.l_desc.max_code + 1, G.d_desc.max_code + 1, bt + 1), nt(G, G.dyn_ltree, G.dyn_dtree)), F(G), pt && z(G);
      }, g._tr_tally = function(G, Z, ut) {
        return G.pending_buf[G.d_buf + 2 * G.last_lit] = Z >>> 8 & 255, G.pending_buf[G.d_buf + 2 * G.last_lit + 1] = 255 & Z, G.pending_buf[G.l_buf + G.last_lit] = 255 & ut, G.last_lit++, Z === 0 ? G.dyn_ltree[2 * ut]++ : (G.matches++, Z--, G.dyn_ltree[2 * (E[ut] + 256 + 1)]++, G.dyn_dtree[2 * P(Z)]++), G.last_lit === G.lit_bufsize - 1;
      }, g._tr_align = function(G) {
        I(G, 2, 3), T(G, 256, o), function(Z) {
          Z.bi_valid === 16 ? (w(Z, Z.bi_buf), Z.bi_buf = 0, Z.bi_valid = 0) : Z.bi_valid >= 8 && (Z.pending_buf[Z.pending++] = 255 & Z.bi_buf, Z.bi_buf >>= 8, Z.bi_valid -= 8);
        }(G);
      };
    }, function(N, g, t) {
      var n = t(154), u = t(31), O = t(122), l = t(124), i = t(96), s = t(123), o = t(157), e = Object.prototype.toString;
      function j(m) {
        if (!(this instanceof j)) return new j(m);
        this.options = u.assign({ chunkSize: 16384, windowBits: 0, to: "" }, m || {});
        var _ = this.options;
        _.raw && _.windowBits >= 0 && _.windowBits < 16 && (_.windowBits = -_.windowBits, _.windowBits === 0 && (_.windowBits = -15)), !(_.windowBits >= 0 && _.windowBits < 16) || m && m.windowBits || (_.windowBits += 32), _.windowBits > 15 && _.windowBits < 48 && (15 & _.windowBits) == 0 && (_.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
        var h = n.inflateInit2(this.strm, _.windowBits);
        if (h !== l.Z_OK) throw new Error(i[h]);
        if (this.header = new o(), n.inflateGetHeader(this.strm, this.header), _.dictionary && (typeof _.dictionary == "string" ? _.dictionary = O.string2buf(_.dictionary) : e.call(_.dictionary) === "[object ArrayBuffer]" && (_.dictionary = new Uint8Array(_.dictionary)), _.raw && (h = n.inflateSetDictionary(this.strm, _.dictionary)) !== l.Z_OK)) throw new Error(i[h]);
      }
      function E(m, _) {
        var h = new j(_);
        if (h.push(m, !0), h.err) throw h.msg || i[h.err];
        return h.result;
      }
      j.prototype.push = function(m, _) {
        var h, S, x, R, c, P = this.strm, w = this.options.chunkSize, I = this.options.dictionary, T = !1;
        if (this.ended) return !1;
        S = _ === ~~_ ? _ : _ === !0 ? l.Z_FINISH : l.Z_NO_FLUSH, typeof m == "string" ? P.input = O.binstring2buf(m) : e.call(m) === "[object ArrayBuffer]" ? P.input = new Uint8Array(m) : P.input = m, P.next_in = 0, P.avail_in = P.input.length;
        do {
          if (P.avail_out === 0 && (P.output = new u.Buf8(w), P.next_out = 0, P.avail_out = w), (h = n.inflate(P, l.Z_NO_FLUSH)) === l.Z_NEED_DICT && I && (h = n.inflateSetDictionary(this.strm, I)), h === l.Z_BUF_ERROR && T === !0 && (h = l.Z_OK, T = !1), h !== l.Z_STREAM_END && h !== l.Z_OK) return this.onEnd(h), this.ended = !0, !1;
          P.next_out && (P.avail_out !== 0 && h !== l.Z_STREAM_END && (P.avail_in !== 0 || S !== l.Z_FINISH && S !== l.Z_SYNC_FLUSH) || (this.options.to === "string" ? (x = O.utf8border(P.output, P.next_out), R = P.next_out - x, c = O.buf2string(P.output, x), P.next_out = R, P.avail_out = w - R, R && u.arraySet(P.output, P.output, x, R, 0), this.onData(c)) : this.onData(u.shrinkBuf(P.output, P.next_out)))), P.avail_in === 0 && P.avail_out === 0 && (T = !0);
        } while ((P.avail_in > 0 || P.avail_out === 0) && h !== l.Z_STREAM_END);
        return h === l.Z_STREAM_END && (S = l.Z_FINISH), S === l.Z_FINISH ? (h = n.inflateEnd(this.strm), this.onEnd(h), this.ended = !0, h === l.Z_OK) : S !== l.Z_SYNC_FLUSH || (this.onEnd(l.Z_OK), P.avail_out = 0, !0);
      }, j.prototype.onData = function(m) {
        this.chunks.push(m);
      }, j.prototype.onEnd = function(m) {
        m === l.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = u.flattenChunks(this.chunks)), this.chunks = [], this.err = m, this.msg = this.strm.msg;
      }, g.Inflate = j, g.inflate = E, g.inflateRaw = function(m, _) {
        return (_ = _ || {}).raw = !0, E(m, _);
      }, g.ungzip = E;
    }, function(N, g, t) {
      var n = t(31), u = t(120), O = t(121), l = t(155), i = t(156);
      function s(c) {
        return (c >>> 24 & 255) + (c >>> 8 & 65280) + ((65280 & c) << 8) + ((255 & c) << 24);
      }
      function o() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new n.Buf16(320), this.work = new n.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function e(c) {
        var P;
        return c && c.state ? (P = c.state, c.total_in = c.total_out = P.total = 0, c.msg = "", P.wrap && (c.adler = 1 & P.wrap), P.mode = 1, P.last = 0, P.havedict = 0, P.dmax = 32768, P.head = null, P.hold = 0, P.bits = 0, P.lencode = P.lendyn = new n.Buf32(852), P.distcode = P.distdyn = new n.Buf32(592), P.sane = 1, P.back = -1, 0) : -2;
      }
      function j(c) {
        var P;
        return c && c.state ? ((P = c.state).wsize = 0, P.whave = 0, P.wnext = 0, e(c)) : -2;
      }
      function E(c, P) {
        var w, I;
        return c && c.state ? (I = c.state, P < 0 ? (w = 0, P = -P) : (w = 1 + (P >> 4), P < 48 && (P &= 15)), P && (P < 8 || P > 15) ? -2 : (I.window !== null && I.wbits !== P && (I.window = null), I.wrap = w, I.wbits = P, j(c))) : -2;
      }
      function m(c, P) {
        var w, I;
        return c ? (I = new o(), c.state = I, I.window = null, (w = E(c, P)) !== 0 && (c.state = null), w) : -2;
      }
      var _, h, S = !0;
      function x(c) {
        if (S) {
          var P;
          for (_ = new n.Buf32(512), h = new n.Buf32(32), P = 0; P < 144; ) c.lens[P++] = 8;
          for (; P < 256; ) c.lens[P++] = 9;
          for (; P < 280; ) c.lens[P++] = 7;
          for (; P < 288; ) c.lens[P++] = 8;
          for (i(1, c.lens, 0, 288, _, 0, c.work, { bits: 9 }), P = 0; P < 32; ) c.lens[P++] = 5;
          i(2, c.lens, 0, 32, h, 0, c.work, { bits: 5 }), S = !1;
        }
        c.lencode = _, c.lenbits = 9, c.distcode = h, c.distbits = 5;
      }
      function R(c, P, w, I) {
        var T, M = c.state;
        return M.window === null && (M.wsize = 1 << M.wbits, M.wnext = 0, M.whave = 0, M.window = new n.Buf8(M.wsize)), I >= M.wsize ? (n.arraySet(M.window, P, w - M.wsize, M.wsize, 0), M.wnext = 0, M.whave = M.wsize) : ((T = M.wsize - M.wnext) > I && (T = I), n.arraySet(M.window, P, w - I, T, M.wnext), (I -= T) ? (n.arraySet(M.window, P, w - I, I, 0), M.wnext = I, M.whave = M.wsize) : (M.wnext += T, M.wnext === M.wsize && (M.wnext = 0), M.whave < M.wsize && (M.whave += T))), 0;
      }
      g.inflateReset = j, g.inflateReset2 = E, g.inflateResetKeep = e, g.inflateInit = function(c) {
        return m(c, 15);
      }, g.inflateInit2 = m, g.inflate = function(c, P) {
        var w, I, T, M, A, F, z, $, H, nt, ot, V, it, lt, dt, G, Z, ut, pt, st, mt, bt, wt, C, U = 0, L = new n.Buf8(4), K = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!c || !c.state || !c.output || !c.input && c.avail_in !== 0) return -2;
        (w = c.state).mode === 12 && (w.mode = 13), A = c.next_out, T = c.output, z = c.avail_out, M = c.next_in, I = c.input, F = c.avail_in, $ = w.hold, H = w.bits, nt = F, ot = z, bt = 0;
        t: for (; ; ) switch (w.mode) {
          case 1:
            if (w.wrap === 0) {
              w.mode = 13;
              break;
            }
            for (; H < 16; ) {
              if (F === 0) break t;
              F--, $ += I[M++] << H, H += 8;
            }
            if (2 & w.wrap && $ === 35615) {
              w.check = 0, L[0] = 255 & $, L[1] = $ >>> 8 & 255, w.check = O(w.check, L, 2, 0), $ = 0, H = 0, w.mode = 2;
              break;
            }
            if (w.flags = 0, w.head && (w.head.done = !1), !(1 & w.wrap) || (((255 & $) << 8) + ($ >> 8)) % 31) {
              c.msg = "incorrect header check", w.mode = 30;
              break;
            }
            if ((15 & $) != 8) {
              c.msg = "unknown compression method", w.mode = 30;
              break;
            }
            if (H -= 4, mt = 8 + (15 & ($ >>>= 4)), w.wbits === 0) w.wbits = mt;
            else if (mt > w.wbits) {
              c.msg = "invalid window size", w.mode = 30;
              break;
            }
            w.dmax = 1 << mt, c.adler = w.check = 1, w.mode = 512 & $ ? 10 : 12, $ = 0, H = 0;
            break;
          case 2:
            for (; H < 16; ) {
              if (F === 0) break t;
              F--, $ += I[M++] << H, H += 8;
            }
            if (w.flags = $, (255 & w.flags) != 8) {
              c.msg = "unknown compression method", w.mode = 30;
              break;
            }
            if (57344 & w.flags) {
              c.msg = "unknown header flags set", w.mode = 30;
              break;
            }
            w.head && (w.head.text = $ >> 8 & 1), 512 & w.flags && (L[0] = 255 & $, L[1] = $ >>> 8 & 255, w.check = O(w.check, L, 2, 0)), $ = 0, H = 0, w.mode = 3;
          case 3:
            for (; H < 32; ) {
              if (F === 0) break t;
              F--, $ += I[M++] << H, H += 8;
            }
            w.head && (w.head.time = $), 512 & w.flags && (L[0] = 255 & $, L[1] = $ >>> 8 & 255, L[2] = $ >>> 16 & 255, L[3] = $ >>> 24 & 255, w.check = O(w.check, L, 4, 0)), $ = 0, H = 0, w.mode = 4;
          case 4:
            for (; H < 16; ) {
              if (F === 0) break t;
              F--, $ += I[M++] << H, H += 8;
            }
            w.head && (w.head.xflags = 255 & $, w.head.os = $ >> 8), 512 & w.flags && (L[0] = 255 & $, L[1] = $ >>> 8 & 255, w.check = O(w.check, L, 2, 0)), $ = 0, H = 0, w.mode = 5;
          case 5:
            if (1024 & w.flags) {
              for (; H < 16; ) {
                if (F === 0) break t;
                F--, $ += I[M++] << H, H += 8;
              }
              w.length = $, w.head && (w.head.extra_len = $), 512 & w.flags && (L[0] = 255 & $, L[1] = $ >>> 8 & 255, w.check = O(w.check, L, 2, 0)), $ = 0, H = 0;
            } else w.head && (w.head.extra = null);
            w.mode = 6;
          case 6:
            if (1024 & w.flags && ((V = w.length) > F && (V = F), V && (w.head && (mt = w.head.extra_len - w.length, w.head.extra || (w.head.extra = new Array(w.head.extra_len)), n.arraySet(w.head.extra, I, M, V, mt)), 512 & w.flags && (w.check = O(w.check, I, V, M)), F -= V, M += V, w.length -= V), w.length)) break t;
            w.length = 0, w.mode = 7;
          case 7:
            if (2048 & w.flags) {
              if (F === 0) break t;
              V = 0;
              do
                mt = I[M + V++], w.head && mt && w.length < 65536 && (w.head.name += String.fromCharCode(mt));
              while (mt && V < F);
              if (512 & w.flags && (w.check = O(w.check, I, V, M)), F -= V, M += V, mt) break t;
            } else w.head && (w.head.name = null);
            w.length = 0, w.mode = 8;
          case 8:
            if (4096 & w.flags) {
              if (F === 0) break t;
              V = 0;
              do
                mt = I[M + V++], w.head && mt && w.length < 65536 && (w.head.comment += String.fromCharCode(mt));
              while (mt && V < F);
              if (512 & w.flags && (w.check = O(w.check, I, V, M)), F -= V, M += V, mt) break t;
            } else w.head && (w.head.comment = null);
            w.mode = 9;
          case 9:
            if (512 & w.flags) {
              for (; H < 16; ) {
                if (F === 0) break t;
                F--, $ += I[M++] << H, H += 8;
              }
              if ($ !== (65535 & w.check)) {
                c.msg = "header crc mismatch", w.mode = 30;
                break;
              }
              $ = 0, H = 0;
            }
            w.head && (w.head.hcrc = w.flags >> 9 & 1, w.head.done = !0), c.adler = w.check = 0, w.mode = 12;
            break;
          case 10:
            for (; H < 32; ) {
              if (F === 0) break t;
              F--, $ += I[M++] << H, H += 8;
            }
            c.adler = w.check = s($), $ = 0, H = 0, w.mode = 11;
          case 11:
            if (w.havedict === 0) return c.next_out = A, c.avail_out = z, c.next_in = M, c.avail_in = F, w.hold = $, w.bits = H, 2;
            c.adler = w.check = 1, w.mode = 12;
          case 12:
            if (P === 5 || P === 6) break t;
          case 13:
            if (w.last) {
              $ >>>= 7 & H, H -= 7 & H, w.mode = 27;
              break;
            }
            for (; H < 3; ) {
              if (F === 0) break t;
              F--, $ += I[M++] << H, H += 8;
            }
            switch (w.last = 1 & $, H -= 1, 3 & ($ >>>= 1)) {
              case 0:
                w.mode = 14;
                break;
              case 1:
                if (x(w), w.mode = 20, P === 6) {
                  $ >>>= 2, H -= 2;
                  break t;
                }
                break;
              case 2:
                w.mode = 17;
                break;
              case 3:
                c.msg = "invalid block type", w.mode = 30;
            }
            $ >>>= 2, H -= 2;
            break;
          case 14:
            for ($ >>>= 7 & H, H -= 7 & H; H < 32; ) {
              if (F === 0) break t;
              F--, $ += I[M++] << H, H += 8;
            }
            if ((65535 & $) != ($ >>> 16 ^ 65535)) {
              c.msg = "invalid stored block lengths", w.mode = 30;
              break;
            }
            if (w.length = 65535 & $, $ = 0, H = 0, w.mode = 15, P === 6) break t;
          case 15:
            w.mode = 16;
          case 16:
            if (V = w.length) {
              if (V > F && (V = F), V > z && (V = z), V === 0) break t;
              n.arraySet(T, I, M, V, A), F -= V, M += V, z -= V, A += V, w.length -= V;
              break;
            }
            w.mode = 12;
            break;
          case 17:
            for (; H < 14; ) {
              if (F === 0) break t;
              F--, $ += I[M++] << H, H += 8;
            }
            if (w.nlen = 257 + (31 & $), $ >>>= 5, H -= 5, w.ndist = 1 + (31 & $), $ >>>= 5, H -= 5, w.ncode = 4 + (15 & $), $ >>>= 4, H -= 4, w.nlen > 286 || w.ndist > 30) {
              c.msg = "too many length or distance symbols", w.mode = 30;
              break;
            }
            w.have = 0, w.mode = 18;
          case 18:
            for (; w.have < w.ncode; ) {
              for (; H < 3; ) {
                if (F === 0) break t;
                F--, $ += I[M++] << H, H += 8;
              }
              w.lens[K[w.have++]] = 7 & $, $ >>>= 3, H -= 3;
            }
            for (; w.have < 19; ) w.lens[K[w.have++]] = 0;
            if (w.lencode = w.lendyn, w.lenbits = 7, wt = { bits: w.lenbits }, bt = i(0, w.lens, 0, 19, w.lencode, 0, w.work, wt), w.lenbits = wt.bits, bt) {
              c.msg = "invalid code lengths set", w.mode = 30;
              break;
            }
            w.have = 0, w.mode = 19;
          case 19:
            for (; w.have < w.nlen + w.ndist; ) {
              for (; G = (U = w.lencode[$ & (1 << w.lenbits) - 1]) >>> 16 & 255, Z = 65535 & U, !((dt = U >>> 24) <= H); ) {
                if (F === 0) break t;
                F--, $ += I[M++] << H, H += 8;
              }
              if (Z < 16) $ >>>= dt, H -= dt, w.lens[w.have++] = Z;
              else {
                if (Z === 16) {
                  for (C = dt + 2; H < C; ) {
                    if (F === 0) break t;
                    F--, $ += I[M++] << H, H += 8;
                  }
                  if ($ >>>= dt, H -= dt, w.have === 0) {
                    c.msg = "invalid bit length repeat", w.mode = 30;
                    break;
                  }
                  mt = w.lens[w.have - 1], V = 3 + (3 & $), $ >>>= 2, H -= 2;
                } else if (Z === 17) {
                  for (C = dt + 3; H < C; ) {
                    if (F === 0) break t;
                    F--, $ += I[M++] << H, H += 8;
                  }
                  H -= dt, mt = 0, V = 3 + (7 & ($ >>>= dt)), $ >>>= 3, H -= 3;
                } else {
                  for (C = dt + 7; H < C; ) {
                    if (F === 0) break t;
                    F--, $ += I[M++] << H, H += 8;
                  }
                  H -= dt, mt = 0, V = 11 + (127 & ($ >>>= dt)), $ >>>= 7, H -= 7;
                }
                if (w.have + V > w.nlen + w.ndist) {
                  c.msg = "invalid bit length repeat", w.mode = 30;
                  break;
                }
                for (; V--; ) w.lens[w.have++] = mt;
              }
            }
            if (w.mode === 30) break;
            if (w.lens[256] === 0) {
              c.msg = "invalid code -- missing end-of-block", w.mode = 30;
              break;
            }
            if (w.lenbits = 9, wt = { bits: w.lenbits }, bt = i(1, w.lens, 0, w.nlen, w.lencode, 0, w.work, wt), w.lenbits = wt.bits, bt) {
              c.msg = "invalid literal/lengths set", w.mode = 30;
              break;
            }
            if (w.distbits = 6, w.distcode = w.distdyn, wt = { bits: w.distbits }, bt = i(2, w.lens, w.nlen, w.ndist, w.distcode, 0, w.work, wt), w.distbits = wt.bits, bt) {
              c.msg = "invalid distances set", w.mode = 30;
              break;
            }
            if (w.mode = 20, P === 6) break t;
          case 20:
            w.mode = 21;
          case 21:
            if (F >= 6 && z >= 258) {
              c.next_out = A, c.avail_out = z, c.next_in = M, c.avail_in = F, w.hold = $, w.bits = H, l(c, ot), A = c.next_out, T = c.output, z = c.avail_out, M = c.next_in, I = c.input, F = c.avail_in, $ = w.hold, H = w.bits, w.mode === 12 && (w.back = -1);
              break;
            }
            for (w.back = 0; G = (U = w.lencode[$ & (1 << w.lenbits) - 1]) >>> 16 & 255, Z = 65535 & U, !((dt = U >>> 24) <= H); ) {
              if (F === 0) break t;
              F--, $ += I[M++] << H, H += 8;
            }
            if (G && (240 & G) == 0) {
              for (ut = dt, pt = G, st = Z; G = (U = w.lencode[st + (($ & (1 << ut + pt) - 1) >> ut)]) >>> 16 & 255, Z = 65535 & U, !(ut + (dt = U >>> 24) <= H); ) {
                if (F === 0) break t;
                F--, $ += I[M++] << H, H += 8;
              }
              $ >>>= ut, H -= ut, w.back += ut;
            }
            if ($ >>>= dt, H -= dt, w.back += dt, w.length = Z, G === 0) {
              w.mode = 26;
              break;
            }
            if (32 & G) {
              w.back = -1, w.mode = 12;
              break;
            }
            if (64 & G) {
              c.msg = "invalid literal/length code", w.mode = 30;
              break;
            }
            w.extra = 15 & G, w.mode = 22;
          case 22:
            if (w.extra) {
              for (C = w.extra; H < C; ) {
                if (F === 0) break t;
                F--, $ += I[M++] << H, H += 8;
              }
              w.length += $ & (1 << w.extra) - 1, $ >>>= w.extra, H -= w.extra, w.back += w.extra;
            }
            w.was = w.length, w.mode = 23;
          case 23:
            for (; G = (U = w.distcode[$ & (1 << w.distbits) - 1]) >>> 16 & 255, Z = 65535 & U, !((dt = U >>> 24) <= H); ) {
              if (F === 0) break t;
              F--, $ += I[M++] << H, H += 8;
            }
            if ((240 & G) == 0) {
              for (ut = dt, pt = G, st = Z; G = (U = w.distcode[st + (($ & (1 << ut + pt) - 1) >> ut)]) >>> 16 & 255, Z = 65535 & U, !(ut + (dt = U >>> 24) <= H); ) {
                if (F === 0) break t;
                F--, $ += I[M++] << H, H += 8;
              }
              $ >>>= ut, H -= ut, w.back += ut;
            }
            if ($ >>>= dt, H -= dt, w.back += dt, 64 & G) {
              c.msg = "invalid distance code", w.mode = 30;
              break;
            }
            w.offset = Z, w.extra = 15 & G, w.mode = 24;
          case 24:
            if (w.extra) {
              for (C = w.extra; H < C; ) {
                if (F === 0) break t;
                F--, $ += I[M++] << H, H += 8;
              }
              w.offset += $ & (1 << w.extra) - 1, $ >>>= w.extra, H -= w.extra, w.back += w.extra;
            }
            if (w.offset > w.dmax) {
              c.msg = "invalid distance too far back", w.mode = 30;
              break;
            }
            w.mode = 25;
          case 25:
            if (z === 0) break t;
            if (V = ot - z, w.offset > V) {
              if ((V = w.offset - V) > w.whave && w.sane) {
                c.msg = "invalid distance too far back", w.mode = 30;
                break;
              }
              V > w.wnext ? (V -= w.wnext, it = w.wsize - V) : it = w.wnext - V, V > w.length && (V = w.length), lt = w.window;
            } else lt = T, it = A - w.offset, V = w.length;
            V > z && (V = z), z -= V, w.length -= V;
            do
              T[A++] = lt[it++];
            while (--V);
            w.length === 0 && (w.mode = 21);
            break;
          case 26:
            if (z === 0) break t;
            T[A++] = w.length, z--, w.mode = 21;
            break;
          case 27:
            if (w.wrap) {
              for (; H < 32; ) {
                if (F === 0) break t;
                F--, $ |= I[M++] << H, H += 8;
              }
              if (ot -= z, c.total_out += ot, w.total += ot, ot && (c.adler = w.check = w.flags ? O(w.check, T, ot, A - ot) : u(w.check, T, ot, A - ot)), ot = z, (w.flags ? $ : s($)) !== w.check) {
                c.msg = "incorrect data check", w.mode = 30;
                break;
              }
              $ = 0, H = 0;
            }
            w.mode = 28;
          case 28:
            if (w.wrap && w.flags) {
              for (; H < 32; ) {
                if (F === 0) break t;
                F--, $ += I[M++] << H, H += 8;
              }
              if ($ !== (4294967295 & w.total)) {
                c.msg = "incorrect length check", w.mode = 30;
                break;
              }
              $ = 0, H = 0;
            }
            w.mode = 29;
          case 29:
            bt = 1;
            break t;
          case 30:
            bt = -3;
            break t;
          case 31:
            return -4;
          case 32:
          default:
            return -2;
        }
        return c.next_out = A, c.avail_out = z, c.next_in = M, c.avail_in = F, w.hold = $, w.bits = H, (w.wsize || ot !== c.avail_out && w.mode < 30 && (w.mode < 27 || P !== 4)) && R(c, c.output, c.next_out, ot - c.avail_out) ? (w.mode = 31, -4) : (nt -= c.avail_in, ot -= c.avail_out, c.total_in += nt, c.total_out += ot, w.total += ot, w.wrap && ot && (c.adler = w.check = w.flags ? O(w.check, T, ot, c.next_out - ot) : u(w.check, T, ot, c.next_out - ot)), c.data_type = w.bits + (w.last ? 64 : 0) + (w.mode === 12 ? 128 : 0) + (w.mode === 20 || w.mode === 15 ? 256 : 0), (nt === 0 && ot === 0 || P === 4) && bt === 0 && (bt = -5), bt);
      }, g.inflateEnd = function(c) {
        if (!c || !c.state) return -2;
        var P = c.state;
        return P.window && (P.window = null), c.state = null, 0;
      }, g.inflateGetHeader = function(c, P) {
        var w;
        return c && c.state ? (2 & (w = c.state).wrap) == 0 ? -2 : (w.head = P, P.done = !1, 0) : -2;
      }, g.inflateSetDictionary = function(c, P) {
        var w, I = P.length;
        return c && c.state ? (w = c.state).wrap !== 0 && w.mode !== 11 ? -2 : w.mode === 11 && u(1, P, I, 0) !== w.check ? -3 : R(c, P, I, I) ? (w.mode = 31, -4) : (w.havedict = 1, 0) : -2;
      }, g.inflateInfo = "pako inflate (from Nodeca project)";
    }, function(N, g, t) {
      N.exports = function(n, u) {
        var O, l, i, s, o, e, j, E, m, _, h, S, x, R, c, P, w, I, T, M, A, F, z, $, H;
        O = n.state, l = n.next_in, $ = n.input, i = l + (n.avail_in - 5), s = n.next_out, H = n.output, o = s - (u - n.avail_out), e = s + (n.avail_out - 257), j = O.dmax, E = O.wsize, m = O.whave, _ = O.wnext, h = O.window, S = O.hold, x = O.bits, R = O.lencode, c = O.distcode, P = (1 << O.lenbits) - 1, w = (1 << O.distbits) - 1;
        t: do {
          x < 15 && (S += $[l++] << x, x += 8, S += $[l++] << x, x += 8), I = R[S & P];
          e: for (; ; ) {
            if (S >>>= T = I >>> 24, x -= T, (T = I >>> 16 & 255) === 0) H[s++] = 65535 & I;
            else {
              if (!(16 & T)) {
                if ((64 & T) == 0) {
                  I = R[(65535 & I) + (S & (1 << T) - 1)];
                  continue e;
                }
                if (32 & T) {
                  O.mode = 12;
                  break t;
                }
                n.msg = "invalid literal/length code", O.mode = 30;
                break t;
              }
              M = 65535 & I, (T &= 15) && (x < T && (S += $[l++] << x, x += 8), M += S & (1 << T) - 1, S >>>= T, x -= T), x < 15 && (S += $[l++] << x, x += 8, S += $[l++] << x, x += 8), I = c[S & w];
              r: for (; ; ) {
                if (S >>>= T = I >>> 24, x -= T, !(16 & (T = I >>> 16 & 255))) {
                  if ((64 & T) == 0) {
                    I = c[(65535 & I) + (S & (1 << T) - 1)];
                    continue r;
                  }
                  n.msg = "invalid distance code", O.mode = 30;
                  break t;
                }
                if (A = 65535 & I, x < (T &= 15) && (S += $[l++] << x, (x += 8) < T && (S += $[l++] << x, x += 8)), (A += S & (1 << T) - 1) > j) {
                  n.msg = "invalid distance too far back", O.mode = 30;
                  break t;
                }
                if (S >>>= T, x -= T, A > (T = s - o)) {
                  if ((T = A - T) > m && O.sane) {
                    n.msg = "invalid distance too far back", O.mode = 30;
                    break t;
                  }
                  if (F = 0, z = h, _ === 0) {
                    if (F += E - T, T < M) {
                      M -= T;
                      do
                        H[s++] = h[F++];
                      while (--T);
                      F = s - A, z = H;
                    }
                  } else if (_ < T) {
                    if (F += E + _ - T, (T -= _) < M) {
                      M -= T;
                      do
                        H[s++] = h[F++];
                      while (--T);
                      if (F = 0, _ < M) {
                        M -= T = _;
                        do
                          H[s++] = h[F++];
                        while (--T);
                        F = s - A, z = H;
                      }
                    }
                  } else if (F += _ - T, T < M) {
                    M -= T;
                    do
                      H[s++] = h[F++];
                    while (--T);
                    F = s - A, z = H;
                  }
                  for (; M > 2; ) H[s++] = z[F++], H[s++] = z[F++], H[s++] = z[F++], M -= 3;
                  M && (H[s++] = z[F++], M > 1 && (H[s++] = z[F++]));
                } else {
                  F = s - A;
                  do
                    H[s++] = H[F++], H[s++] = H[F++], H[s++] = H[F++], M -= 3;
                  while (M > 2);
                  M && (H[s++] = H[F++], M > 1 && (H[s++] = H[F++]));
                }
                break;
              }
            }
            break;
          }
        } while (l < i && s < e);
        l -= M = x >> 3, S &= (1 << (x -= M << 3)) - 1, n.next_in = l, n.next_out = s, n.avail_in = l < i ? i - l + 5 : 5 - (l - i), n.avail_out = s < e ? e - s + 257 : 257 - (s - e), O.hold = S, O.bits = x;
      };
    }, function(N, g, t) {
      var n = t(31), u = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], O = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], l = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], i = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      N.exports = function(s, o, e, j, E, m, _, h) {
        var S, x, R, c, P, w, I, T, M, A = h.bits, F = 0, z = 0, $ = 0, H = 0, nt = 0, ot = 0, V = 0, it = 0, lt = 0, dt = 0, G = null, Z = 0, ut = new n.Buf16(16), pt = new n.Buf16(16), st = null, mt = 0;
        for (F = 0; F <= 15; F++) ut[F] = 0;
        for (z = 0; z < j; z++) ut[o[e + z]]++;
        for (nt = A, H = 15; H >= 1 && ut[H] === 0; H--) ;
        if (nt > H && (nt = H), H === 0) return E[m++] = 20971520, E[m++] = 20971520, h.bits = 1, 0;
        for ($ = 1; $ < H && ut[$] === 0; $++) ;
        for (nt < $ && (nt = $), it = 1, F = 1; F <= 15; F++) if (it <<= 1, (it -= ut[F]) < 0) return -1;
        if (it > 0 && (s === 0 || H !== 1)) return -1;
        for (pt[1] = 0, F = 1; F < 15; F++) pt[F + 1] = pt[F] + ut[F];
        for (z = 0; z < j; z++) o[e + z] !== 0 && (_[pt[o[e + z]]++] = z);
        if (s === 0 ? (G = st = _, w = 19) : s === 1 ? (G = u, Z -= 257, st = O, mt -= 257, w = 256) : (G = l, st = i, w = -1), dt = 0, z = 0, F = $, P = m, ot = nt, V = 0, R = -1, c = (lt = 1 << nt) - 1, s === 1 && lt > 852 || s === 2 && lt > 592) return 1;
        for (; ; ) {
          I = F - V, _[z] < w ? (T = 0, M = _[z]) : _[z] > w ? (T = st[mt + _[z]], M = G[Z + _[z]]) : (T = 96, M = 0), S = 1 << F - V, $ = x = 1 << ot;
          do
            E[P + (dt >> V) + (x -= S)] = I << 24 | T << 16 | M | 0;
          while (x !== 0);
          for (S = 1 << F - 1; dt & S; ) S >>= 1;
          if (S !== 0 ? (dt &= S - 1, dt += S) : dt = 0, z++, --ut[F] == 0) {
            if (F === H) break;
            F = o[e + _[z]];
          }
          if (F > nt && (dt & c) !== R) {
            for (V === 0 && (V = nt), P += $, it = 1 << (ot = F - V); ot + V < H && !((it -= ut[ot + V]) <= 0); ) ot++, it <<= 1;
            if (lt += 1 << ot, s === 1 && lt > 852 || s === 2 && lt > 592) return 1;
            E[R = dt & c] = nt << 24 | ot << 16 | P - m | 0;
          }
        }
        return dt !== 0 && (E[P + dt] = F - V << 24 | 64 << 16 | 0), h.bits = nt, 0;
      };
    }, function(N, g, t) {
      N.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
      };
    }, function(N, g) {
      N.exports = function(t, n) {
        var u, O, l = t, i = n, s = l.length, o = i.length, e = !1, j = null, E = s + 1, m = [], _ = [], h = [], S = "", x = function(P, w, I) {
          return { x: P, y: w, k: I };
        }, R = function(P, w) {
          return { elem: P, t: w };
        }, c = function(P, w, I) {
          var T, M, A;
          for (T = w > I ? m[P - 1 + E] : m[P + 1 + E], M = (A = Math.max(w, I)) - P; M < s && A < o && l[M] === i[A]; ) ++M, ++A;
          return m[P + E] = _.length, _[_.length] = new x(M, A, T), A;
        };
        return s >= o && (u = l, O = s, l = i, i = u, s = o, o = O, e = !0, E = s + 1), { SES_DELETE: -1, SES_COMMON: 0, SES_ADD: 1, editdistance: function() {
          return j;
        }, getlcs: function() {
          return S;
        }, getses: function() {
          return h;
        }, compose: function() {
          var P, w, I, T, M, A, F, z;
          for (P = o - s, w = s + o + 3, I = {}, F = 0; F < w; ++F) I[F] = -1, m[F] = -1;
          T = -1;
          do {
            for (z = -++T; z <= P - 1; ++z) I[z + E] = c(z, I[z - 1 + E] + 1, I[z + 1 + E]);
            for (z = P + T; z >= P + 1; --z) I[z + E] = c(z, I[z - 1 + E] + 1, I[z + 1 + E]);
            I[P + E] = c(P, I[P - 1 + E] + 1, I[P + 1 + E]);
          } while (I[P + E] !== o);
          for (j = P + 2 * T, M = m[P + E], A = []; M !== -1; ) A[A.length] = new x(_[M].x, _[M].y, null), M = _[M].k;
          (function($) {
            var H, nt, ot;
            for (H = nt = 0, ot = $.length - 1; ot >= 0; --ot) for (; H < $[ot].x || nt < $[ot].y; ) $[ot].y - $[ot].x > nt - H ? (h[h.length] = new R(i[nt], e ? -1 : 1), ++nt) : $[ot].y - $[ot].x < nt - H ? (h[h.length] = new R(l[H], e ? 1 : -1), ++H) : (h[h.length] = new R(l[H], 0), S += l[H], ++H, ++nt);
          })(A);
        } };
      };
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return s;
        });
        var u = t(165), O = t(0);
        function l(e, j, E, m, _, h, S) {
          try {
            var x = e[h](S), R = x.value;
          } catch (c) {
            return void E(c);
          }
          x.done ? j(R) : Promise.resolve(R).then(m, _);
        }
        function i(e) {
          return function() {
            var j = this, E = arguments;
            return new Promise(function(m, _) {
              var h = e.apply(j, E);
              function S(R) {
                l(h, m, _, S, x, "next", R);
              }
              function x(R) {
                l(h, m, _, S, x, "throw", R);
              }
              S(void 0);
            });
          };
        }
        function s(e) {
          return o.apply(this, arguments);
        }
        function o() {
          return (o = i(function* ({ object: e }) {
            try {
              Object(O.a)("object", e), e = typeof e == "string" ? n.from(e, "utf8") : n.from(e);
              const j = "blob", { oid: E, object: m } = yield Object(u.a)({ type: "blob", format: "content", object: e });
              return { oid: E, type: j, object: new Uint8Array(m), format: "wrapped" };
            } catch (j) {
              throw j.caller = "git.hashBlob", j;
            }
          })).apply(this, arguments);
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return m;
        });
        var u = t(17), O = t(2), l = t(18), i = t(14), s = t(12), o = t(15), e = t(16);
        function j(h, S, x, R, c, P, w) {
          try {
            var I = h[P](w), T = I.value;
          } catch (M) {
            return void x(M);
          }
          I.done ? S(T) : Promise.resolve(T).then(R, c);
        }
        function E(h) {
          return function() {
            var S = this, x = arguments;
            return new Promise(function(R, c) {
              var P = h.apply(S, x);
              function w(T) {
                j(P, R, c, w, I, "next", T);
              }
              function I(T) {
                j(P, R, c, w, I, "throw", T);
              }
              w(void 0);
            });
          };
        }
        function m(h) {
          return _.apply(this, arguments);
        }
        function _() {
          return (_ = E(function* ({ fs: h, dir: S, gitdir: x = Object(e.join)(S, ".git"), type: R, object: c, format: P = "parsed", oid: w, encoding: I }) {
            try {
              const T = new O.a(h);
              if (P === "parsed") {
                switch (R) {
                  case "commit":
                    c = i.a.from(c).toObject();
                    break;
                  case "tree":
                    c = s.a.from(c).toObject();
                    break;
                  case "blob":
                    c = n.from(c, I);
                    break;
                  case "tag":
                    c = l.a.from(c).toObject();
                    break;
                  default:
                    throw new u.a(w || "", R, "blob|commit|tag|tree");
                }
                P = "content";
              }
              return w = yield Object(o.a)({ fs: T, gitdir: x, type: R, object: c, oid: w, format: P });
            } catch (T) {
              throw T.caller = "git.writeObject", T;
            }
          })).apply(this, arguments);
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      function n(c, P, w, I, T, M, A) {
        try {
          var F = c[M](A), z = F.value;
        } catch ($) {
          return void w($);
        }
        F.done ? P(z) : Promise.resolve(z).then(I, T);
      }
      function u(c) {
        return function() {
          var P = this, w = arguments;
          return new Promise(function(I, T) {
            var M = c.apply(P, w);
            function A(z) {
              n(M, I, T, A, F, "next", z);
            }
            function F(z) {
              n(M, I, T, A, F, "throw", z);
            }
            A(void 0);
          });
        };
      }
      function O(c) {
        return l.apply(this, arguments);
      }
      function l() {
        return (l = u(function* ({ fs: c, gitdir: P, oid: w }) {
          const I = `objects/${w.slice(0, 2)}/${w.slice(2)}`;
          return c.exists(`${P}/${I}`);
        })).apply(this, arguments);
      }
      var i = t(4), s = t(81), o = t(16);
      function e(c, P, w, I, T, M, A) {
        try {
          var F = c[M](A), z = F.value;
        } catch ($) {
          return void w($);
        }
        F.done ? P(z) : Promise.resolve(z).then(I, T);
      }
      function j(c) {
        return function() {
          var P = this, w = arguments;
          return new Promise(function(I, T) {
            var M = c.apply(P, w);
            function A(z) {
              e(M, I, T, A, F, "next", z);
            }
            function F(z) {
              e(M, I, T, A, F, "throw", z);
            }
            A(void 0);
          });
        };
      }
      function E(c) {
        return m.apply(this, arguments);
      }
      function m() {
        return (m = j(function* ({ fs: c, cache: P, gitdir: w, oid: I, getExternalRefDelta: T }) {
          let M = yield c.readdir(Object(o.join)(w, "objects/pack"));
          M = M.filter((A) => A.endsWith(".idx"));
          for (const A of M) {
            const F = `${w}/objects/pack/${A}`, z = yield Object(s.a)({ fs: c, cache: P, filename: F, getExternalRefDelta: T });
            if (z.error) throw new i.a(z.error);
            if (z.offsets.has(I)) return !0;
          }
          return !1;
        })).apply(this, arguments);
      }
      var _ = t(7);
      function h(c, P, w, I, T, M, A) {
        try {
          var F = c[M](A), z = F.value;
        } catch ($) {
          return void w($);
        }
        F.done ? P(z) : Promise.resolve(z).then(I, T);
      }
      function S(c) {
        return function() {
          var P = this, w = arguments;
          return new Promise(function(I, T) {
            var M = c.apply(P, w);
            function A(z) {
              h(M, I, T, A, F, "next", z);
            }
            function F(z) {
              h(M, I, T, A, F, "throw", z);
            }
            A(void 0);
          });
        };
      }
      function x(c) {
        return R.apply(this, arguments);
      }
      function R() {
        return (R = S(function* ({ fs: c, cache: P, gitdir: w, oid: I, format: T = "content" }) {
          const M = (F) => Object(_.a)({ fs: c, cache: P, gitdir: w, oid: F });
          let A = yield O({ fs: c, gitdir: w, oid: I });
          return A || (A = yield E({ fs: c, cache: P, gitdir: w, oid: I, getExternalRefDelta: M })), A;
        })).apply(this, arguments);
      }
      t.d(g, "a", function() {
        return x;
      });
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return m;
        });
        var u = t(11), O = t(13), l = t(69), i = t(16), s = t(34), o = t(19), e = t(25);
        function j(_, h, S, x, R, c, P) {
          try {
            var w = _[c](P), I = w.value;
          } catch (T) {
            return void S(T);
          }
          w.done ? h(I) : Promise.resolve(I).then(x, R);
        }
        function E(_) {
          return function() {
            var h = this, S = arguments;
            return new Promise(function(x, R) {
              var c = _.apply(h, S);
              function P(I) {
                j(c, x, R, P, w, "next", I);
              }
              function w(I) {
                j(c, x, R, P, w, "throw", I);
              }
              P(void 0);
            });
          };
        }
        class m {
          constructor({ fs: h, dir: S, gitdir: x, cache: R }) {
            this.fs = h, this.cache = R, this.dir = S, this.gitdir = x;
            const c = this;
            this.ConstructEntry = class {
              constructor(P) {
                this._fullpath = P, this._type = !1, this._mode = !1, this._stat = !1, this._content = !1, this._oid = !1;
              }
              type() {
                var P = this;
                return E(function* () {
                  return c.type(P);
                })();
              }
              mode() {
                var P = this;
                return E(function* () {
                  return c.mode(P);
                })();
              }
              stat() {
                var P = this;
                return E(function* () {
                  return c.stat(P);
                })();
              }
              content() {
                var P = this;
                return E(function* () {
                  return c.content(P);
                })();
              }
              oid() {
                var P = this;
                return E(function* () {
                  return c.oid(P);
                })();
              }
            };
          }
          readdir(h) {
            var S = this;
            return E(function* () {
              const x = h._fullpath, { fs: R, dir: c } = S, P = yield R.readdir(Object(i.join)(c, x));
              return P === null ? null : P.map((w) => Object(i.join)(x, w));
            })();
          }
          type(h) {
            return E(function* () {
              return h._type === !1 && (yield h.stat()), h._type;
            })();
          }
          mode(h) {
            return E(function* () {
              return h._mode === !1 && (yield h.stat()), h._mode;
            })();
          }
          stat(h) {
            var S = this;
            return E(function* () {
              if (h._stat === !1) {
                const { fs: x, dir: R } = S;
                let c = yield x.lstat(`${R}/${h._fullpath}`);
                if (!c) throw new Error(`ENOENT: no such file or directory, lstat '${h._fullpath}'`);
                let P = c.isDirectory() ? "tree" : "blob";
                P !== "blob" || c.isFile() || c.isSymbolicLink() || (P = "special"), h._type = P, c = Object(s.a)(c), h._mode = c.mode, c.size === -1 && h._actualSize && (c.size = h._actualSize), h._stat = c;
              }
              return h._stat;
            })();
          }
          content(h) {
            var S = this;
            return E(function* () {
              if (h._content === !1) {
                const { fs: x, dir: R, gitdir: c } = S;
                if ((yield h.type()) === "tree") h._content = void 0;
                else {
                  const P = yield u.a.get({ fs: x, gitdir: c }), w = yield P.get("core.autocrlf"), I = yield x.read(`${R}/${h._fullpath}`, { autocrlf: w });
                  h._actualSize = I.length, h._stat && h._stat.size === -1 && (h._stat.size = h._actualSize), h._content = new Uint8Array(I);
                }
              }
              return h._content;
            })();
          }
          oid(h) {
            var S = this;
            return E(function* () {
              if (h._oid === !1) {
                const { fs: x, gitdir: R, cache: c } = S;
                let P;
                yield O.a.acquire({ fs: x, gitdir: R, cache: c }, function() {
                  var w = E(function* (I) {
                    const T = I.entriesMap.get(h._fullpath), M = yield h.stat(), A = yield u.a.get({ fs: x, gitdir: R }), F = yield A.get("core.filemode"), z = n === void 0 || n.platform !== "win32";
                    !T || Object(l.a)(M, T, F, z) ? (yield h.content()) === void 0 ? P = void 0 : (P = yield Object(o.a)(e.a.wrap({ type: "blob", object: yield h.content() })), !T || P !== T.oid || F && M.mode !== T.mode || !Object(l.a)(M, T, F, z) || I.insert({ filepath: h._fullpath, stats: M, oid: P })) : P = T.oid;
                  });
                  return function(I) {
                    return w.apply(this, arguments);
                  };
                }()), h._oid = P;
              }
              return h._oid;
            })();
          }
        }
      }).call(this, t(92));
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return m;
        });
        var u = t(95), O = t(54), l = t(89), i = t(26), s = t(8), o = t(3), e = t(15);
        function j(h, S, x, R, c, P, w) {
          try {
            var I = h[P](w), T = I.value;
          } catch (M) {
            return void x(M);
          }
          I.done ? S(T) : Promise.resolve(T).then(R, c);
        }
        function E(h) {
          return function() {
            var S = this, x = arguments;
            return new Promise(function(R, c) {
              var P = h.apply(S, x);
              function w(T) {
                j(P, R, c, w, I, "next", T);
              }
              function I(T) {
                j(P, R, c, w, I, "throw", T);
              }
              w(void 0);
            });
          };
        }
        function m(h) {
          return _.apply(this, arguments);
        }
        function _() {
          return (_ = E(function* ({ fs: h, cache: S, onSign: x, gitdir: R, ref: c, oid: P, note: w, force: I, author: T, committer: M, signingKey: A }) {
            let F;
            try {
              F = yield o.a.resolve({ gitdir: R, fs: h, ref: c });
            } catch (nt) {
              if (!(nt instanceof s.a)) throw nt;
            }
            let z = (yield Object(O.a)({ fs: h, cache: S, gitdir: R, oid: F || "4b825dc642cb6eb9a060e54bf8d69288fbee4904" })).tree;
            if (I) z = z.filter((nt) => nt.path !== P);
            else for (const nt of z) if (nt.path === P) throw new i.a("note", P);
            typeof w == "string" && (w = n.from(w, "utf8"));
            const $ = yield Object(e.a)({ fs: h, gitdir: R, type: "blob", object: w, format: "content" });
            z.push({ mode: "100644", path: P, oid: $, type: "blob" });
            const H = yield Object(l.a)({ fs: h, gitdir: R, tree: z });
            return yield Object(u.a)({ fs: h, cache: S, onSign: x, gitdir: R, ref: c, tree: H, parent: F && [F], message: `Note added by 'isomorphic-git addNote'
`, author: T, committer: M, signingKey: A });
          })).apply(this, arguments);
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      function n(u) {
        return u.slice(0, 12).toString("hex") === "5041434b0000000200000000";
      }
      t.d(g, "a", function() {
        return n;
      });
    }, function(N, g, t) {
      t.d(g, "a", function() {
        return i;
      });
      var n = t(25), u = t(19);
      function O(o, e, j, E, m, _, h) {
        try {
          var S = o[_](h), x = S.value;
        } catch (R) {
          return void j(R);
        }
        S.done ? e(x) : Promise.resolve(x).then(E, m);
      }
      function l(o) {
        return function() {
          var e = this, j = arguments;
          return new Promise(function(E, m) {
            var _ = o.apply(e, j);
            function h(x) {
              O(_, E, m, h, S, "next", x);
            }
            function S(x) {
              O(_, E, m, h, S, "throw", x);
            }
            h(void 0);
          });
        };
      }
      function i(o) {
        return s.apply(this, arguments);
      }
      function s() {
        return (s = l(function* ({ type: o, object: e, format: j = "content", oid: E }) {
          return j !== "deflated" && (j !== "wrapped" && (e = n.a.wrap({ type: o, object: e })), E = yield Object(u.a)(e)), { oid: E, object: e };
        })).apply(this, arguments);
      }
    }, function(N, g, t) {
      (function(n) {
        t.d(g, "a", function() {
          return o;
        });
        var u = t(52), O = t(16), l = t(112);
        function i(j, E, m, _, h, S, x) {
          try {
            var R = j[S](x), c = R.value;
          } catch (P) {
            return void m(P);
          }
          R.done ? E(c) : Promise.resolve(c).then(_, h);
        }
        function s(j) {
          return function() {
            var E = this, m = arguments;
            return new Promise(function(_, h) {
              var S = j.apply(E, m);
              function x(c) {
                i(S, _, h, x, R, "next", c);
              }
              function R(c) {
                i(S, _, h, x, R, "throw", c);
              }
              x(void 0);
            });
          };
        }
        function o(j) {
          return e.apply(this, arguments);
        }
        function e() {
          return (e = s(function* ({ fs: j, cache: E, gitdir: m, oids: _, write: h }) {
            const S = yield Object(l.a)({ fs: j, cache: E, gitdir: m, oids: _ }), x = n.from(yield Object(u.a)(S)), R = `pack-${x.slice(-20).toString("hex")}.pack`;
            return h ? (yield j.write(Object(O.join)(m, `objects/pack/${R}`), x), { filename: R }) : { filename: R, packfile: new Uint8Array(x) };
          })).apply(this, arguments);
        }
      }).call(this, t(10).Buffer);
    }, function(N, g, t) {
      t.r(g);
      var n = t(13), u = t(38), O = t(107), l = t(4), i = t(34);
      function s(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function o(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              s(b, a, p, f, k, "next", d);
            }
            function k(d) {
              s(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      class e {
        constructor({ fs: v, gitdir: y, cache: a }) {
          this.treePromise = n.a.acquire({ fs: v, gitdir: y, cache: a }, function() {
            var b = o(function* (f) {
              return Object(O.a)(f.entries);
            });
            return function(f) {
              return b.apply(this, arguments);
            };
          }());
          const p = this;
          this.ConstructEntry = class {
            constructor(b) {
              this._fullpath = b, this._type = !1, this._mode = !1, this._stat = !1, this._oid = !1;
            }
            type() {
              var b = this;
              return o(function* () {
                return p.type(b);
              })();
            }
            mode() {
              var b = this;
              return o(function* () {
                return p.mode(b);
              })();
            }
            stat() {
              var b = this;
              return o(function* () {
                return p.stat(b);
              })();
            }
            content() {
              var b = this;
              return o(function* () {
                return p.content(b);
              })();
            }
            oid() {
              var b = this;
              return o(function* () {
                return p.oid(b);
              })();
            }
          };
        }
        readdir(v) {
          var y = this;
          return o(function* () {
            const a = v._fullpath, p = (yield y.treePromise).get(a);
            if (!p || p.type === "blob") return null;
            if (p.type !== "tree") throw new Error(`ENOTDIR: not a directory, scandir '${a}'`);
            const b = p.children.map((f) => f.fullpath);
            return b.sort(u.a), b;
          })();
        }
        type(v) {
          return o(function* () {
            return v._type === !1 && (yield v.stat()), v._type;
          })();
        }
        mode(v) {
          return o(function* () {
            return v._mode === !1 && (yield v.stat()), v._mode;
          })();
        }
        stat(v) {
          var y = this;
          return o(function* () {
            if (v._stat === !1) {
              const a = (yield y.treePromise).get(v._fullpath);
              if (!a) throw new Error(`ENOENT: no such file or directory, lstat '${v._fullpath}'`);
              const p = a.type === "tree" ? {} : Object(i.a)(a.metadata);
              v._type = a.type === "tree" ? "tree" : function(b) {
                switch (b) {
                  case 16384:
                    return "tree";
                  case 33188:
                  case 33261:
                  case 40960:
                    return "blob";
                  case 57344:
                    return "commit";
                }
                throw new l.a(`Unexpected GitTree entry mode: ${b.toString(8)}`);
              }(p.mode), v._mode = p.mode, a.type === "tree" ? v._stat = void 0 : v._stat = p;
            }
            return v._stat;
          })();
        }
        content(v) {
          return o(function* () {
          })();
        }
        oid(v) {
          var y = this;
          return o(function* () {
            if (v._oid === !1) {
              const a = (yield y.treePromise).get(v._fullpath);
              v._oid = a.metadata.oid;
            }
            return v._oid;
          })();
        }
      }
      var j = t(37);
      function E() {
        const r = /* @__PURE__ */ Object.create(null);
        return Object.defineProperty(r, j.a, { value: function({ fs: v, gitdir: y, cache: a }) {
          return new e({ fs: v, gitdir: y, cache: a });
        } }), Object.freeze(r), r;
      }
      var m = t(22), _ = t(162);
      function h() {
        const r = /* @__PURE__ */ Object.create(null);
        return Object.defineProperty(r, j.a, { value: function({ fs: v, dir: y, gitdir: a, cache: p }) {
          return new _.a({ fs: v, dir: y, gitdir: a, cache: p });
        } }), Object.freeze(r), r;
      }
      var S = t(30), x = t(104), R = t(2), c = t(0), P = t(16), w = t(53);
      function I(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function T(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              I(b, a, p, f, k, "next", d);
            }
            function k(d) {
              I(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function M(r) {
        return A.apply(this, arguments);
      }
      function A() {
        return (A = T(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), commit: a = "HEAD", cache: p = {} }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("dir", v), Object(c.a)("gitdir", y);
            const f = new R.a(r), k = [Object(m.a)({ ref: a }), h(), E()];
            let d = [];
            yield n.a.acquire({ fs: f, gitdir: y, cache: p }, function() {
              var J = T(function* (et) {
                d = et.unmergedPaths;
              });
              return function(et) {
                return J.apply(this, arguments);
              };
            }());
            const q = yield Object(S.a)({ fs: f, cache: p, dir: v, gitdir: y, trees: k, map: (b = T(function* (J, [et, Q, ht]) {
              const ft = !(yield Object(w.a)(Q, ht)), gt = d.includes(J), _t = !(yield Object(w.a)(ht, et));
              if (ft || gt) return et ? { path: J, mode: yield et.mode(), oid: yield et.oid(), type: yield et.type(), content: yield et.content() } : void 0;
              if (_t) return !1;
              throw new x.a(J);
            }), function(J, et) {
              return b.apply(this, arguments);
            }) });
            yield n.a.acquire({ fs: f, gitdir: y, cache: p }, function() {
              var J = T(function* (et) {
                for (const Q of q) if (Q !== !1) if (Q) {
                  if (Q.type === "blob") {
                    const ht = new TextDecoder().decode(Q.content);
                    yield f.write(`${v}/${Q.path}`, ht, { mode: Q.mode }), et.insert({ filepath: Q.path, oid: Q.oid, stage: 0 });
                  }
                } else yield f.rmdir(`${v}/${Q.path}`, { recursive: !0 }), et.delete({ filepath: Q.path });
              });
              return function(et) {
                return J.apply(this, arguments);
              };
            }());
          } catch (f) {
            throw f.caller = "git.abortMerge", f;
          }
          var b;
        })).apply(this, arguments);
      }
      var F = t(103), z = t(8), $ = t(11), H = t(42), nt = t(15);
      function ot(r) {
        let v;
        for (; ~(v = r.indexOf(92)); ) r[v] = 47;
        return r;
      }
      function V(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function it(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              V(b, a, p, f, k, "next", d);
            }
            function k(d) {
              V(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function lt(r) {
        return dt.apply(this, arguments);
      }
      function dt() {
        return (dt = it(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), filepath: a, cache: p = {}, force: b = !1, parallel: f = !0 }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("dir", v), Object(c.a)("gitdir", y), Object(c.a)("filepath", a);
            const k = new R.a(r);
            yield n.a.acquire({ fs: k, gitdir: y, cache: p }, function() {
              var d = it(function* (q) {
                return G({ dir: v, gitdir: y, fs: k, filepath: a, index: q, force: b, parallel: f });
              });
              return function(q) {
                return d.apply(this, arguments);
              };
            }());
          } catch (k) {
            throw k.caller = "git.add", k;
          }
        })).apply(this, arguments);
      }
      function G(r) {
        return Z.apply(this, arguments);
      }
      function Z() {
        return (Z = it(function* ({ dir: r, gitdir: v, fs: y, filepath: a, index: p, force: b, parallel: f }) {
          const k = (a = Array.isArray(a) ? a : [a]).map(function() {
            var J = it(function* (et) {
              if (!b && (yield H.a.isIgnored({ fs: y, dir: r, gitdir: v, filepath: et })))
                return;
              const Q = yield y.lstat(Object(P.join)(r, et));
              if (!Q) throw new z.a(et);
              if (Q.isDirectory()) {
                const ht = yield y.readdir(Object(P.join)(r, et));
                if (f) {
                  const ft = ht.map((gt) => G({ dir: r, gitdir: v, fs: y, filepath: [Object(P.join)(et, gt)], index: p, force: b, parallel: f }));
                  yield Promise.all(ft);
                } else for (const ft of ht) yield G({ dir: r, gitdir: v, fs: y, filepath: [Object(P.join)(et, ft)], index: p, force: b, parallel: f });
              } else {
                const ht = yield $.a.get({ fs: y, gitdir: v }), ft = yield ht.get("core.autocrlf"), gt = Q.isSymbolicLink() ? yield y.readlink(Object(P.join)(r, et)).then(ot) : yield y.read(Object(P.join)(r, et), { autocrlf: ft });
                if (gt === null) throw new z.a(et);
                const _t = yield Object(nt.a)({ fs: y, gitdir: v, type: "blob", object: gt });
                p.insert({ filepath: et, stats: Q, oid: _t });
              }
            });
            return function(et) {
              return J.apply(this, arguments);
            };
          }()), d = yield Promise.allSettled(k), q = d.filter((J) => J.status === "rejected").map((J) => J.reason);
          if (q.length > 1) throw new F.a(q);
          if (q.length === 1) throw q[0];
          return d.filter((J) => J.status === "fulfilled" && J.value).map((J) => J.value);
        })).apply(this, arguments);
      }
      var ut = t(163), pt = t(21), st = t(29), mt = t(43);
      function bt(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function wt(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              bt(b, a, p, f, k, "next", d);
            }
            function k(d) {
              bt(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function C(r) {
        return U.apply(this, arguments);
      }
      function U() {
        return (U = wt(function* ({ fs: r, onSign: v, dir: y, gitdir: a = Object(P.join)(y, ".git"), ref: p = "refs/notes/commits", oid: b, note: f, force: k, author: d, committer: q, signingKey: J, cache: et = {} }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("gitdir", a), Object(c.a)("oid", b), Object(c.a)("note", f), J && Object(c.a)("onSign", v);
            const Q = new R.a(r), ht = yield Object(st.a)({ fs: Q, gitdir: a, author: d });
            if (!ht) throw new pt.a("author");
            const ft = yield Object(mt.a)({ fs: Q, gitdir: a, author: ht, committer: q });
            if (!ft) throw new pt.a("committer");
            return yield Object(ut.a)({ fs: new R.a(Q), cache: et, onSign: v, gitdir: a, ref: p, oid: b, note: f, force: k, author: ht, committer: ft, signingKey: J });
          } catch (Q) {
            throw Q.caller = "git.addNote", Q;
          }
        })).apply(this, arguments);
      }
      var L = t(45), K = t.n(L), X = t(26), rt = t(28);
      function yt(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function jt(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              yt(b, a, p, f, k, "next", d);
            }
            function k(d) {
              yt(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Rt(r) {
        return Tt.apply(this, arguments);
      }
      function Tt() {
        return (Tt = jt(function* ({ fs: r, gitdir: v, remote: y, url: a, force: p }) {
          if (y !== K.a.clean(y)) throw new rt.a(y, K.a.clean(y));
          const b = yield $.a.get({ fs: r, gitdir: v });
          if (!p && (yield b.getSubsections("remote")).includes(y) && a !== (yield b.get(`remote.${y}.url`)))
            throw new X.a("remote", y);
          yield b.set(`remote.${y}.url`, a), yield b.set(`remote.${y}.fetch`, `+refs/heads/*:refs/remotes/${y}/*`), yield $.a.save({ fs: r, gitdir: v, config: b });
        })).apply(this, arguments);
      }
      function Et(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Wt(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Et(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Et(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Vt(r) {
        return re.apply(this, arguments);
      }
      function re() {
        return (re = Wt(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), remote: a, url: p, force: b = !1 }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("remote", a), Object(c.a)("url", p), yield Rt({ fs: new R.a(r), gitdir: y, remote: a, url: p, force: b });
          } catch (f) {
            throw f.caller = "git.addRemote", f;
          }
        })).apply(this, arguments);
      }
      var vt = t(3), Zt = t(18), Dt = t(7);
      function qt(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function pe(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              qt(b, a, p, f, k, "next", d);
            }
            function k(d) {
              qt(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Ce(r) {
        return oe.apply(this, arguments);
      }
      function oe() {
        return (oe = pe(function* ({ fs: r, cache: v, onSign: y, gitdir: a, ref: p, tagger: b, message: f = p, gpgsig: k, object: d, signingKey: q, force: J = !1 }) {
          if (p = p.startsWith("refs/tags/") ? p : `refs/tags/${p}`, !J && (yield vt.a.exists({ fs: r, gitdir: a, ref: p }))) throw new X.a("tag", p);
          const et = yield vt.a.resolve({ fs: r, gitdir: a, ref: d || "HEAD" }), { type: Q } = yield Object(Dt.a)({ fs: r, cache: v, gitdir: a, oid: et });
          let ht = Zt.a.from({ object: et, type: Q, tag: p.replace("refs/tags/", ""), tagger: b, message: f, gpgsig: k });
          q && (ht = yield Zt.a.sign(ht, y, q));
          const ft = yield Object(nt.a)({ fs: r, gitdir: a, type: "tag", object: ht.toObject() });
          yield vt.a.writeRef({ fs: r, gitdir: a, ref: p, value: ft });
        })).apply(this, arguments);
      }
      function De(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function W(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              De(b, a, p, f, k, "next", d);
            }
            function k(d) {
              De(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function B(r) {
        return D.apply(this, arguments);
      }
      function D() {
        return (D = W(function* ({ fs: r, onSign: v, dir: y, gitdir: a = Object(P.join)(y, ".git"), ref: p, tagger: b, message: f = p, gpgsig: k, object: d, signingKey: q, force: J = !1, cache: et = {} }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("gitdir", a), Object(c.a)("ref", p), q && Object(c.a)("onSign", v);
            const Q = new R.a(r), ht = yield Object(st.a)({ fs: Q, gitdir: a, author: b });
            if (!ht) throw new pt.a("tagger");
            return yield Ce({ fs: Q, cache: et, onSign: v, gitdir: a, ref: p, tagger: ht, message: f, gpgsig: k, object: d, signingKey: q, force: J });
          } catch (Q) {
            throw Q.caller = "git.annotatedTag", Q;
          }
        })).apply(this, arguments);
      }
      function Y(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function tt(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Y(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Y(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function at(r) {
        return ct.apply(this, arguments);
      }
      function ct() {
        return (ct = tt(function* ({ fs: r, gitdir: v, ref: y, object: a, checkout: p = !1, force: b = !1 }) {
          if (y !== K.a.clean(y)) throw new rt.a(y, K.a.clean(y));
          const f = `refs/heads/${y}`;
          if (!b && (yield vt.a.exists({ fs: r, gitdir: v, ref: f })))
            throw new X.a("branch", y, !1);
          let k;
          try {
            k = yield vt.a.resolve({ fs: r, gitdir: v, ref: a || "HEAD" });
          } catch {
          }
          k && (yield vt.a.writeRef({ fs: r, gitdir: v, ref: f, value: k })), p && (yield vt.a.writeSymbolicRef({ fs: r, gitdir: v, ref: "HEAD", value: f }));
        })).apply(this, arguments);
      }
      function Bt(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function zt(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Bt(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Bt(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Ut(r) {
        return Ft.apply(this, arguments);
      }
      function Ft() {
        return (Ft = zt(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), ref: a, object: p, checkout: b = !1, force: f = !1 }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("ref", a), yield at({ fs: new R.a(r), gitdir: y, ref: a, object: p, checkout: b, force: f });
          } catch (k) {
            throw k.caller = "git.branch", k;
          }
        })).apply(this, arguments);
      }
      var xt = t(98), Kt = t(99), ae = t(114);
      const Jt = (r, v) => r === "." || v == null || v.length === 0 || v === "." || (v.length >= r.length ? v.startsWith(r) : r.startsWith(v));
      function _e(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function le(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              _e(b, a, p, f, k, "next", d);
            }
            function k(d) {
              _e(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Be(r) {
        return Gr.apply(this, arguments);
      }
      function Gr() {
        return (Gr = le(function* ({ fs: r, cache: v, onProgress: y, onPostCheckout: a, dir: p, gitdir: b, remote: f, ref: k, filepaths: d, noCheckout: q, noUpdateHead: J, dryRun: et, force: Q, track: ht = !0 }) {
          let ft, gt;
          if (a) try {
            ft = yield vt.a.resolve({ fs: r, gitdir: b, ref: "HEAD" });
          } catch {
            ft = "0000000000000000000000000000000000000000";
          }
          try {
            gt = yield vt.a.resolve({ fs: r, gitdir: b, ref: k });
          } catch (_t) {
            if (k === "HEAD") throw _t;
            const Pt = `${f}/${k}`;
            if (gt = yield vt.a.resolve({ fs: r, gitdir: b, ref: Pt }), ht) {
              const Ot = yield $.a.get({ fs: r, gitdir: b });
              yield Ot.set(`branch.${k}.remote`, f), yield Ot.set(`branch.${k}.merge`, `refs/heads/${k}`), yield $.a.save({ fs: r, gitdir: b, config: Ot });
            }
            yield vt.a.writeRef({ fs: r, gitdir: b, ref: `refs/heads/${k}`, value: gt });
          }
          if (!q) {
            let _t;
            try {
              _t = yield Hu({ fs: r, cache: v, onProgress: y, dir: p, gitdir: b, ref: k, force: Q, filepaths: d });
            } catch (kt) {
              throw kt instanceof z.a && kt.data.what === gt ? new Kt.a(k, gt) : kt;
            }
            const Pt = _t.filter(([kt]) => kt === "conflict").map(([kt, Ct]) => Ct);
            if (Pt.length > 0) throw new xt.a(Pt);
            const Ot = _t.filter(([kt]) => kt === "error").map(([kt, Ct]) => Ct);
            if (Ot.length > 0) throw new l.a(Ot.join(", "));
            if (et) return void (a && (yield a({ previousHead: ft, newHead: gt, type: d != null && d.length > 0 ? "file" : "branch" })));
            let It = 0;
            const $t = _t.length;
            yield n.a.acquire({ fs: r, gitdir: b, cache: v }, function() {
              var kt = le(function* (Ct) {
                yield Promise.all(_t.filter(([St]) => St === "delete" || St === "delete-index").map(function() {
                  var St = le(function* ([Mt, Lt]) {
                    const ee = `${p}/${Lt}`;
                    Mt === "delete" && (yield r.rm(ee)), Ct.delete({ filepath: Lt }), y && (yield y({ phase: "Updating workdir", loaded: ++It, total: $t }));
                  });
                  return function(Mt) {
                    return St.apply(this, arguments);
                  };
                }()));
              });
              return function(Ct) {
                return kt.apply(this, arguments);
              };
            }()), yield n.a.acquire({ fs: r, gitdir: b, cache: v }, function() {
              var kt = le(function* (Ct) {
                for (const [St, Mt] of _t) if (St === "rmdir" || St === "rmdir-index") {
                  const Lt = `${p}/${Mt}`;
                  try {
                    St === "rmdir-index" && Ct.delete({ filepath: Mt }), yield r.rmdir(Lt), y && (yield y({ phase: "Updating workdir", loaded: ++It, total: $t }));
                  } catch (ee) {
                    if (ee.code !== "ENOTEMPTY") throw ee;
                    console.log(`Did not delete ${Mt} because directory is not empty`);
                  }
                }
              });
              return function(Ct) {
                return kt.apply(this, arguments);
              };
            }()), yield Promise.all(_t.filter(([kt]) => kt === "mkdir" || kt === "mkdir-index").map(function() {
              var kt = le(function* ([Ct, St]) {
                const Mt = `${p}/${St}`;
                yield r.mkdir(Mt), y && (yield y({ phase: "Updating workdir", loaded: ++It, total: $t }));
              });
              return function(Ct) {
                return kt.apply(this, arguments);
              };
            }())), yield n.a.acquire({ fs: r, gitdir: b, cache: v }, function() {
              var kt = le(function* (Ct) {
                yield Promise.all(_t.filter(([St]) => St === "create" || St === "create-index" || St === "update" || St === "mkdir-index").map(function() {
                  var St = le(function* ([Mt, Lt, ee, ie, we]) {
                    const Se = `${p}/${Lt}`;
                    try {
                      if (Mt !== "create-index" && Mt !== "mkdir-index") {
                        const { object: Xe } = yield Object(Dt.a)({ fs: r, cache: v, gitdir: b, oid: ee });
                        if (we && (yield r.rm(Se)), ie === 33188) yield r.write(Se, Xe);
                        else if (ie === 33261) yield r.write(Se, Xe, { mode: 511 });
                        else {
                          if (ie !== 40960) throw new l.a(`Invalid mode 0o${ie.toString(8)} detected in blob ${ee}`);
                          yield r.writelink(Se, Xe);
                        }
                      }
                      const ke = yield r.lstat(Se);
                      ie === 33261 && (ke.mode = 493), Mt === "mkdir-index" && (ke.mode = 57344), Ct.insert({ filepath: Lt, stats: ke, oid: ee }), y && (yield y({ phase: "Updating workdir", loaded: ++It, total: $t }));
                    } catch (ke) {
                      console.log(ke);
                    }
                  });
                  return function(Mt) {
                    return St.apply(this, arguments);
                  };
                }()));
              });
              return function(Ct) {
                return kt.apply(this, arguments);
              };
            }()), a && (yield a({ previousHead: ft, newHead: gt, type: d != null && d.length > 0 ? "file" : "branch" }));
          }
          if (!J) {
            const _t = yield vt.a.expand({ fs: r, gitdir: b, ref: k });
            _t.startsWith("refs/heads") ? yield vt.a.writeSymbolicRef({ fs: r, gitdir: b, ref: "HEAD", value: _t }) : yield vt.a.writeRef({ fs: r, gitdir: b, ref: "HEAD", value: gt });
          }
        })).apply(this, arguments);
      }
      function Hu(r) {
        return Yr.apply(this, arguments);
      }
      function Yr() {
        return (Yr = le(function* ({ fs: r, cache: v, onProgress: y, dir: a, gitdir: p, ref: b, force: f, filepaths: k }) {
          let d = 0;
          return Object(S.a)({ fs: r, cache: v, dir: a, gitdir: p, trees: [Object(m.a)({ ref: b }), h(), E()], map: (J = le(function* (et, [Q, ht, ft]) {
            if (et !== ".") {
              if (k && !k.some((gt) => Jt(et, gt))) return null;
              switch (y && (yield y({ phase: "Analyzing workdir", loaded: ++d })), [!!ft, !!Q, !!ht].map(Number).join("")) {
                case "000":
                  return;
                case "001":
                  return f && k && k.includes(et) ? ["delete", et] : void 0;
                case "010":
                  switch (yield Q.type()) {
                    case "tree":
                      return ["mkdir", et];
                    case "blob":
                      return ["create", et, yield Q.oid(), yield Q.mode()];
                    case "commit":
                      return ["mkdir-index", et, yield Q.oid(), yield Q.mode()];
                    default:
                      return ["error", `new entry Unhandled type ${yield Q.type()}`];
                  }
                case "011":
                  switch (`${yield Q.type()}-${yield ht.type()}`) {
                    case "tree-tree":
                      return;
                    case "tree-blob":
                    case "blob-tree":
                      return ["conflict", et];
                    case "blob-blob":
                      return (yield Q.oid()) !== (yield ht.oid()) ? f ? ["update", et, yield Q.oid(), yield Q.mode(), (yield Q.mode()) !== (yield ht.mode())] : ["conflict", et] : (yield Q.mode()) !== (yield ht.mode()) ? f ? ["update", et, yield Q.oid(), yield Q.mode(), !0] : ["conflict", et] : ["create-index", et, yield Q.oid(), yield Q.mode()];
                    case "commit-tree":
                      return;
                    case "commit-blob":
                      return ["conflict", et];
                    default:
                      return ["error", `new entry Unhandled type ${Q.type}`];
                  }
                case "100":
                  return ["delete-index", et];
                case "101":
                  switch (yield ft.type()) {
                    case "tree":
                      return ["rmdir", et];
                    case "blob":
                      return (yield ft.oid()) !== (yield ht.oid()) ? f ? ["delete", et] : ["conflict", et] : ["delete", et];
                    case "commit":
                      return ["rmdir-index", et];
                    default:
                      return ["error", `delete entry Unhandled type ${yield ft.type()}`];
                  }
                case "110":
                case "111":
                  switch (`${yield ft.type()}-${yield Q.type()}`) {
                    case "tree-tree":
                      return;
                    case "blob-blob":
                      if ((yield ft.oid()) === (yield Q.oid()) && (yield ft.mode()) === (yield Q.mode()) && !f) return;
                      if (ht) {
                        if ((yield ht.oid()) !== (yield ft.oid()) && (yield ht.oid()) !== (yield Q.oid())) return f ? ["update", et, yield Q.oid(), yield Q.mode(), (yield Q.mode()) !== (yield ht.mode())] : ["conflict", et];
                      } else if (f) return ["update", et, yield Q.oid(), yield Q.mode(), (yield Q.mode()) !== (yield ft.mode())];
                      return (yield Q.mode()) !== (yield ft.mode()) ? ["update", et, yield Q.oid(), yield Q.mode(), !0] : (yield Q.oid()) !== (yield ft.oid()) ? ["update", et, yield Q.oid(), yield Q.mode(), !1] : void 0;
                    case "tree-blob":
                      return ["update-dir-to-blob", et, yield Q.oid()];
                    case "blob-tree":
                      return ["update-blob-to-tree", et];
                    case "commit-commit":
                      return ["mkdir-index", et, yield Q.oid(), yield Q.mode()];
                    default:
                      return ["error", `update entry Unhandled type ${yield ft.type()}-${yield Q.type()}`];
                  }
              }
            }
          }), function(et, Q) {
            return J.apply(this, arguments);
          }), reduce: (q = le(function* (et, Q) {
            return Q = Object(ae.a)(Q), et ? et && et[0] === "rmdir" ? (Q.push(et), Q) : (Q.unshift(et), Q) : Q;
          }), function(et, Q) {
            return q.apply(this, arguments);
          }) });
          var q, J;
        })).apply(this, arguments);
      }
      function Vr(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Wu(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Vr(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Vr(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function ur(r) {
        return Zr.apply(this, arguments);
      }
      function Zr() {
        return (Zr = Wu(function* ({ fs: r, onProgress: v, onPostCheckout: y, dir: a, gitdir: p = Object(P.join)(a, ".git"), remote: b = "origin", ref: f, filepaths: k, noCheckout: d = !1, noUpdateHead: q = f === void 0, dryRun: J = !1, force: et = !1, track: Q = !0, cache: ht = {} }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("dir", a), Object(c.a)("gitdir", p);
            const ft = f || "HEAD";
            return yield Be({ fs: new R.a(r), cache: ht, onProgress: v, onPostCheckout: y, dir: a, gitdir: p, remote: b, ref: ft, filepaths: k, noCheckout: d, noUpdateHead: q, dryRun: J, force: et, track: Q });
          } catch (ft) {
            throw ft.caller = "git.checkout", ft;
          }
        })).apply(this, arguments);
      }
      var cr = t(118);
      function Kr(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Gu(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Kr(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Kr(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Jr(r) {
        return Xr.apply(this, arguments);
      }
      function Xr() {
        return (Xr = Gu(function* ({ fs: r, bare: v = !1, dir: y, gitdir: a = v ? y : Object(P.join)(y, ".git"), defaultBranch: p = "master" }) {
          if (yield r.exists(a + "/config")) return;
          let b = ["hooks", "info", "objects/info", "objects/pack", "refs/heads", "refs/tags"];
          b = b.map((f) => a + "/" + f);
          for (const f of b) yield r.mkdir(f);
          yield r.write(a + "/config", `[core]
	repositoryformatversion = 0
	filemode = false
	bare = ${v}
` + (v ? "" : `	logallrefupdates = true
`) + `	symlinks = false
	ignorecase = true
`), yield r.write(a + "/HEAD", `ref: refs/heads/${p}
`);
        })).apply(this, arguments);
      }
      function Qr(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Yu(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Qr(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Qr(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Vu(r) {
        return tn.apply(this, arguments);
      }
      function tn() {
        return (tn = Yu(function* ({ fs: r, cache: v, http: y, onProgress: a, onMessage: p, onAuth: b, onAuthSuccess: f, onAuthFailure: k, onPostCheckout: d, dir: q, gitdir: J, url: et, corsProxy: Q, ref: ht, remote: ft, depth: gt, since: _t, exclude: Pt, relative: Ot, singleBranch: It, noCheckout: $t, noTags: kt, headers: Ct }) {
          try {
            if (yield Jr({ fs: r, gitdir: J }), yield Rt({ fs: r, gitdir: J, remote: ft, url: et, force: !1 }), Q) {
              const Lt = yield $.a.get({ fs: r, gitdir: J });
              yield Lt.set("http.corsProxy", Q), yield $.a.save({ fs: r, gitdir: J, config: Lt });
            }
            const { defaultBranch: St, fetchHead: Mt } = yield Object(cr.a)({ fs: r, cache: v, http: y, onProgress: a, onMessage: p, onAuth: b, onAuthSuccess: f, onAuthFailure: k, gitdir: J, ref: ht, remote: ft, corsProxy: Q, depth: gt, since: _t, exclude: Pt, relative: Ot, singleBranch: It, headers: Ct, tags: !kt });
            if (Mt === null) return;
            ht = (ht = ht || St).replace("refs/heads/", ""), yield Be({ fs: r, cache: v, onProgress: a, onPostCheckout: d, dir: q, gitdir: J, ref: ht, remote: ft, noCheckout: $t });
          } catch (St) {
            throw yield r.rmdir(J, { recursive: !0, maxRetries: 10 }).catch(() => {
            }), St;
          }
        })).apply(this, arguments);
      }
      function en(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Zu(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              en(b, a, p, f, k, "next", d);
            }
            function k(d) {
              en(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function rn(r) {
        return nn.apply(this, arguments);
      }
      function nn() {
        return (nn = Zu(function* ({ fs: r, http: v, onProgress: y, onMessage: a, onAuth: p, onAuthSuccess: b, onAuthFailure: f, onPostCheckout: k, dir: d, gitdir: q = Object(P.join)(d, ".git"), url: J, corsProxy: et, ref: Q, remote: ht = "origin", depth: ft, since: gt, exclude: _t = [], relative: Pt = !1, singleBranch: Ot = !1, noCheckout: It = !1, noTags: $t = !1, headers: kt = {}, cache: Ct = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("http", v), Object(c.a)("gitdir", q), It || Object(c.a)("dir", d), Object(c.a)("url", J), yield Vu({ fs: new R.a(r), cache: Ct, http: v, onProgress: y, onMessage: a, onAuth: p, onAuthSuccess: b, onAuthFailure: f, onPostCheckout: k, dir: d, gitdir: q, url: J, corsProxy: et, ref: Q, remote: ht, depth: ft, since: gt, exclude: _t, relative: Pt, singleBranch: Ot, noCheckout: It, noTags: $t, headers: kt });
          } catch (St) {
            throw St.caller = "git.clone", St;
          }
        })).apply(this, arguments);
      }
      var fr = t(95);
      function on(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Ku(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              on(b, a, p, f, k, "next", d);
            }
            function k(d) {
              on(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function an(r) {
        return sn.apply(this, arguments);
      }
      function sn() {
        return (sn = Ku(function* ({ fs: r, onSign: v, dir: y, gitdir: a = Object(P.join)(y, ".git"), message: p, author: b, committer: f, signingKey: k, amend: d = !1, dryRun: q = !1, noUpdateBranch: J = !1, ref: et, parent: Q, tree: ht, cache: ft = {} }) {
          try {
            Object(c.a)("fs", r), d || Object(c.a)("message", p), k && Object(c.a)("onSign", v);
            const gt = new R.a(r);
            return yield Object(fr.a)({ fs: gt, cache: ft, onSign: v, gitdir: a, message: p, author: b, committer: f, signingKey: k, amend: d, dryRun: q, noUpdateBranch: J, ref: et, parent: Q, tree: ht });
          } catch (gt) {
            throw gt.caller = "git.commit", gt;
          }
        })).apply(this, arguments);
      }
      var Ie = t(35);
      function un(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Ju(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              un(b, a, p, f, k, "next", d);
            }
            function k(d) {
              un(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function cn(r) {
        return fn.apply(this, arguments);
      }
      function fn() {
        return (fn = Ju(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), fullname: a = !1, test: p = !1 }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), yield Object(Ie.a)({ fs: new R.a(r), gitdir: y, fullname: a, test: p });
          } catch (b) {
            throw b.caller = "git.currentBranch", b;
          }
        })).apply(this, arguments);
      }
      var Ve = t(66);
      function ln(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Xu(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              ln(b, a, p, f, k, "next", d);
            }
            function k(d) {
              ln(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Qu(r) {
        return hn.apply(this, arguments);
      }
      function hn() {
        return (hn = Xu(function* ({ fs: r, gitdir: v, ref: y }) {
          if (y = y.startsWith("refs/heads/") ? y : `refs/heads/${y}`, !(yield vt.a.exists({ fs: r, gitdir: v, ref: y }))) throw new z.a(y);
          const a = yield vt.a.expand({ fs: r, gitdir: v, ref: y });
          if (a === (yield Object(Ie.a)({ fs: r, gitdir: v, fullname: !0 }))) {
            const f = yield vt.a.resolve({ fs: r, gitdir: v, ref: a });
            yield vt.a.writeRef({ fs: r, gitdir: v, ref: "HEAD", value: f });
          }
          yield vt.a.deleteRef({ fs: r, gitdir: v, ref: a });
          const p = Object(Ve.a)(y), b = yield $.a.get({ fs: r, gitdir: v });
          yield b.deleteSection("branch", p), yield $.a.save({ fs: r, gitdir: v, config: b });
        })).apply(this, arguments);
      }
      function dn(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function tc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              dn(b, a, p, f, k, "next", d);
            }
            function k(d) {
              dn(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function pn(r) {
        return gn.apply(this, arguments);
      }
      function gn() {
        return (gn = tc(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), ref: a }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("ref", a), yield Qu({ fs: new R.a(r), gitdir: y, ref: a });
          } catch (p) {
            throw p.caller = "git.deleteBranch", p;
          }
        })).apply(this, arguments);
      }
      function mn(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function ec(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              mn(b, a, p, f, k, "next", d);
            }
            function k(d) {
              mn(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function yn(r) {
        return wn.apply(this, arguments);
      }
      function wn() {
        return (wn = ec(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), ref: a }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("ref", a), yield vt.a.deleteRef({ fs: new R.a(r), gitdir: y, ref: a });
          } catch (p) {
            throw p.caller = "git.deleteRef", p;
          }
        })).apply(this, arguments);
      }
      function vn(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function rc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              vn(b, a, p, f, k, "next", d);
            }
            function k(d) {
              vn(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function nc(r) {
        return bn.apply(this, arguments);
      }
      function bn() {
        return (bn = rc(function* ({ fs: r, gitdir: v, remote: y }) {
          const a = yield $.a.get({ fs: r, gitdir: v });
          yield a.deleteSection("remote", y), yield $.a.save({ fs: r, gitdir: v, config: a });
        })).apply(this, arguments);
      }
      function _n(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function ic(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              _n(b, a, p, f, k, "next", d);
            }
            function k(d) {
              _n(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function jn(r) {
        return kn.apply(this, arguments);
      }
      function kn() {
        return (kn = ic(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), remote: a }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("remote", a), yield nc({ fs: new R.a(r), gitdir: y, remote: a });
          } catch (p) {
            throw p.caller = "git.deleteRemote", p;
          }
        })).apply(this, arguments);
      }
      function xn(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function oc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              xn(b, a, p, f, k, "next", d);
            }
            function k(d) {
              xn(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function ac(r) {
        return On.apply(this, arguments);
      }
      function On() {
        return (On = oc(function* ({ fs: r, gitdir: v, ref: y }) {
          y = y.startsWith("refs/tags/") ? y : `refs/tags/${y}`, yield vt.a.deleteRef({ fs: r, gitdir: v, ref: y });
        })).apply(this, arguments);
      }
      function En(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function sc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              En(b, a, p, f, k, "next", d);
            }
            function k(d) {
              En(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Pn(r) {
        return Sn.apply(this, arguments);
      }
      function Sn() {
        return (Sn = sc(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), ref: a }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("ref", a), yield ac({ fs: new R.a(r), gitdir: y, ref: a });
          } catch (p) {
            throw p.caller = "git.deleteTag", p;
          }
        })).apply(this, arguments);
      }
      var uc = t(97);
      function An(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function cc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              An(b, a, p, f, k, "next", d);
            }
            function k(d) {
              An(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function fc(r) {
        return Rn.apply(this, arguments);
      }
      function Rn() {
        return (Rn = cc(function* ({ fs: r, gitdir: v, oid: y }) {
          const a = y.slice(0, 2);
          return (yield r.readdir(`${v}/objects/${a}`)).map((p) => `${a}${p}`).filter((p) => p.startsWith(y));
        })).apply(this, arguments);
      }
      var lc = t(81);
      function Bn(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function hc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Bn(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Bn(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function dc(r) {
        return In.apply(this, arguments);
      }
      function In() {
        return (In = hc(function* ({ fs: r, cache: v, gitdir: y, oid: a, getExternalRefDelta: p }) {
          const b = [];
          let f = yield r.readdir(Object(P.join)(y, "objects/pack"));
          f = f.filter((k) => k.endsWith(".idx"));
          for (const k of f) {
            const d = `${y}/objects/pack/${k}`, q = yield Object(lc.a)({ fs: r, cache: v, filename: d, getExternalRefDelta: p });
            if (q.error) throw new l.a(q.error);
            for (const J of q.offsets.keys()) J.startsWith(a) && b.push(J);
          }
          return b;
        })).apply(this, arguments);
      }
      function Tn(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function pc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Tn(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Tn(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function gc(r) {
        return $n.apply(this, arguments);
      }
      function $n() {
        return ($n = pc(function* ({ fs: r, cache: v, gitdir: y, oid: a }) {
          const p = yield fc({ fs: r, gitdir: y, oid: a }), b = yield dc({ fs: r, cache: v, gitdir: y, oid: a, getExternalRefDelta: (f) => Object(Dt.a)({ fs: r, cache: v, gitdir: y, oid: f }) });
          for (const f of b) p.indexOf(f) === -1 && p.push(f);
          if (p.length === 1) return p[0];
          throw p.length > 1 ? new uc.a("oids", a, p) : new z.a(`an object matching "${a}"`);
        })).apply(this, arguments);
      }
      function Cn(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function mc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Cn(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Cn(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Dn(r) {
        return Mn.apply(this, arguments);
      }
      function Mn() {
        return (Mn = mc(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), oid: a, cache: p = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("oid", a), yield gc({ fs: new R.a(r), cache: p, gitdir: y, oid: a });
          } catch (b) {
            throw b.caller = "git.expandOid", b;
          }
        })).apply(this, arguments);
      }
      function Nn(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function yc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Nn(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Nn(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Fn(r) {
        return Un.apply(this, arguments);
      }
      function Un() {
        return (Un = yc(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), ref: a }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("ref", a), yield vt.a.expand({ fs: new R.a(r), gitdir: y, ref: a });
          } catch (p) {
            throw p.caller = "git.expandRef", p;
          }
        })).apply(this, arguments);
      }
      var er = t(14);
      function zn(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function wc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              zn(b, a, p, f, k, "next", d);
            }
            function k(d) {
              zn(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function lr(r) {
        return Ln.apply(this, arguments);
      }
      function Ln() {
        return (Ln = wc(function* ({ fs: r, cache: v, gitdir: y, oids: a }) {
          const p = {}, b = a.length;
          let f = a.map((k, d) => ({ index: d, oid: k }));
          for (; f.length; ) {
            const k = /* @__PURE__ */ new Set();
            for (const q of f) {
              const { oid: J, index: et } = q;
              p[J] || (p[J] = /* @__PURE__ */ new Set()), p[J].add(et), p[J].size === b && k.add(J);
            }
            if (k.size > 0) return [...k];
            const d = /* @__PURE__ */ new Map();
            for (const q of f) {
              const { oid: J, index: et } = q;
              try {
                const { object: Q } = yield Object(Dt.a)({ fs: r, cache: v, gitdir: y, oid: J }), ht = er.a.from(Q), { parent: ft } = ht.parseHeaders();
                for (const gt of ft) p[gt] && p[gt].has(et) || d.set(gt + ":" + et, { oid: gt, index: et });
              } catch {
              }
            }
            f = Array.from(d.values());
          }
          return [];
        })).apply(this, arguments);
      }
      var vc = t(100), bc = t(57), _c = t(56), jc = t(127);
      function qn(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Hn(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              qn(b, a, p, f, k, "next", d);
            }
            function k(d) {
              qn(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Wn(r) {
        return Gn.apply(this, arguments);
      }
      function Gn() {
        return (Gn = Hn(function* ({ fs: r, cache: v, dir: y, gitdir: a, ours: p, theirs: b, fastForward: f = !0, fastForwardOnly: k = !1, dryRun: d = !1, noUpdateBranch: q = !1, abortOnConflict: J = !0, message: et, author: Q, committer: ht, signingKey: ft, onSign: gt, mergeDriver: _t }) {
          p === void 0 && (p = yield Object(Ie.a)({ fs: r, gitdir: a, fullname: !0 })), p = yield vt.a.expand({ fs: r, gitdir: a, ref: p }), b = yield vt.a.expand({ fs: r, gitdir: a, ref: b });
          const Pt = yield vt.a.resolve({ fs: r, gitdir: a, ref: p }), Ot = yield vt.a.resolve({ fs: r, gitdir: a, ref: b }), It = yield lr({ fs: r, cache: v, gitdir: a, oids: [Pt, Ot] });
          if (It.length !== 1) throw new _c.a();
          const $t = It[0];
          if ($t === Ot) return { oid: Pt, alreadyMerged: !0 };
          if (f && $t === Pt) return d || q || (yield vt.a.writeRef({ fs: r, gitdir: a, ref: p, value: Ot })), { oid: Ot, fastForward: !0 };
          {
            if (k) throw new vc.a();
            const kt = yield n.a.acquire({ fs: r, gitdir: a, cache: v, allowUnmerged: !1 }, function() {
              var Ct = Hn(function* (St) {
                return Object(jc.a)({ fs: r, cache: v, dir: y, gitdir: a, index: St, ourOid: Pt, theirOid: Ot, baseOid: $t, ourName: Object(Ve.a)(p), baseName: "base", theirName: Object(Ve.a)(b), dryRun: d, abortOnConflict: J, mergeDriver: _t });
              });
              return function(St) {
                return Ct.apply(this, arguments);
              };
            }());
            if (kt instanceof bc.a) throw kt;
            return et || (et = `Merge branch '${Object(Ve.a)(b)}' into ${Object(Ve.a)(p)}`), { oid: yield Object(fr.a)({ fs: r, cache: v, gitdir: a, message: et, ref: p, tree: kt, parent: [Pt, Ot], author: Q, committer: ht, signingKey: ft, onSign: gt, dryRun: d, noUpdateBranch: q }), tree: kt, mergeCommit: !0 };
          }
        })).apply(this, arguments);
      }
      var Te = t(24);
      function Yn(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function kc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Yn(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Yn(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Vn(r) {
        return Zn.apply(this, arguments);
      }
      function Zn() {
        return (Zn = kc(function* ({ fs: r, cache: v, http: y, onProgress: a, onMessage: p, onAuth: b, onAuthSuccess: f, onAuthFailure: k, dir: d, gitdir: q, ref: J, url: et, remote: Q, remoteRef: ht, prune: ft, pruneTags: gt, fastForward: _t, fastForwardOnly: Pt, corsProxy: Ot, singleBranch: It, headers: $t, author: kt, committer: Ct, signingKey: St }) {
          try {
            if (!J) {
              const ee = yield Object(Ie.a)({ fs: r, gitdir: q });
              if (!ee) throw new Te.a("ref");
              J = ee;
            }
            const { fetchHead: Mt, fetchHeadDescription: Lt } = yield Object(cr.a)({ fs: r, cache: v, http: y, onProgress: a, onMessage: p, onAuth: b, onAuthSuccess: f, onAuthFailure: k, gitdir: q, corsProxy: Ot, ref: J, url: et, remote: Q, remoteRef: ht, singleBranch: It, headers: $t, prune: ft, pruneTags: gt });
            yield Wn({ fs: r, cache: v, gitdir: q, ours: J, theirs: Mt, fastForward: _t, fastForwardOnly: Pt, message: `Merge ${Lt}`, author: kt, committer: Ct, signingKey: St, dryRun: !1, noUpdateBranch: !1 }), yield Be({ fs: r, cache: v, onProgress: a, dir: d, gitdir: q, ref: J, remote: Q, noCheckout: !1 });
          } catch (Mt) {
            throw Mt.caller = "git.pull", Mt;
          }
        })).apply(this, arguments);
      }
      function Kn(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function xc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Kn(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Kn(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Jn(r) {
        return Xn.apply(this, arguments);
      }
      function Xn() {
        return (Xn = xc(function* ({ fs: r, http: v, onProgress: y, onMessage: a, onAuth: p, onAuthSuccess: b, onAuthFailure: f, dir: k, gitdir: d = Object(P.join)(k, ".git"), ref: q, url: J, remote: et, remoteRef: Q, corsProxy: ht, singleBranch: ft, headers: gt = {}, cache: _t = {} }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("http", v), Object(c.a)("gitdir", d);
            const Pt = { name: "", email: "", timestamp: Date.now(), timezoneOffset: 0 };
            return yield Vn({ fs: new R.a(r), cache: _t, http: v, onProgress: y, onMessage: a, onAuth: p, onAuthSuccess: b, onAuthFailure: f, dir: k, gitdir: d, ref: q, url: J, remote: et, remoteRef: Q, fastForwardOnly: !0, corsProxy: ht, singleBranch: ft, headers: gt, author: Pt, committer: Pt });
          } catch (Pt) {
            throw Pt.caller = "git.fastForward", Pt;
          }
        })).apply(this, arguments);
      }
      function Qn(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Oc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Qn(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Qn(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function ti(r) {
        return ei.apply(this, arguments);
      }
      function ei() {
        return (ei = Oc(function* ({ fs: r, http: v, onProgress: y, onMessage: a, onAuth: p, onAuthSuccess: b, onAuthFailure: f, dir: k, gitdir: d = Object(P.join)(k, ".git"), ref: q, remote: J, remoteRef: et, url: Q, corsProxy: ht, depth: ft = null, since: gt = null, exclude: _t = [], relative: Pt = !1, tags: Ot = !1, singleBranch: It = !1, headers: $t = {}, prune: kt = !1, pruneTags: Ct = !1, cache: St = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("http", v), Object(c.a)("gitdir", d), yield Object(cr.a)({ fs: new R.a(r), cache: St, http: v, onProgress: y, onMessage: a, onAuth: p, onAuthSuccess: b, onAuthFailure: f, gitdir: d, ref: q, remote: J, remoteRef: et, url: Q, corsProxy: ht, depth: ft, since: gt, exclude: _t, relative: Pt, tags: Ot, singleBranch: It, headers: $t, prune: kt, pruneTags: Ct });
          } catch (Mt) {
            throw Mt.caller = "git.fetch", Mt;
          }
        })).apply(this, arguments);
      }
      function ri(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Ec(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              ri(b, a, p, f, k, "next", d);
            }
            function k(d) {
              ri(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function ni(r) {
        return ii.apply(this, arguments);
      }
      function ii() {
        return (ii = Ec(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), oids: a, cache: p = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("oids", a), yield lr({ fs: new R.a(r), cache: p, gitdir: y, oids: a });
          } catch (b) {
            throw b.caller = "git.findMergeBase", b;
          }
        })).apply(this, arguments);
      }
      var Pc = t(27);
      function oi(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Sc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              oi(b, a, p, f, k, "next", d);
            }
            function k(d) {
              oi(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function ai(r) {
        return si.apply(this, arguments);
      }
      function si() {
        return (si = Sc(function* ({ fs: r, filepath: v }) {
          if (yield r.exists(Object(P.join)(v, ".git"))) return v;
          {
            const y = Object(Pc.a)(v);
            if (y === v) throw new z.a(`git root for ${v}`);
            return ai({ fs: r, filepath: y });
          }
        })).apply(this, arguments);
      }
      function ui(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Ac(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              ui(b, a, p, f, k, "next", d);
            }
            function k(d) {
              ui(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function ci(r) {
        return fi.apply(this, arguments);
      }
      function fi() {
        return (fi = Ac(function* ({ fs: r, filepath: v }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("filepath", v), yield ai({ fs: new R.a(r), filepath: v });
          } catch (y) {
            throw y.caller = "git.findRoot", y;
          }
        })).apply(this, arguments);
      }
      var Rc = t(41);
      function li(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Bc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              li(b, a, p, f, k, "next", d);
            }
            function k(d) {
              li(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function hi(r) {
        return di.apply(this, arguments);
      }
      function di() {
        return (di = Bc(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), path: a }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("path", a), yield Object(Rc.a)({ fs: new R.a(r), gitdir: y, path: a });
          } catch (p) {
            throw p.caller = "git.getConfig", p;
          }
        })).apply(this, arguments);
      }
      function pi(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Ic(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              pi(b, a, p, f, k, "next", d);
            }
            function k(d) {
              pi(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Tc(r) {
        return gi.apply(this, arguments);
      }
      function gi() {
        return (gi = Ic(function* ({ fs: r, gitdir: v, path: y }) {
          return (yield $.a.get({ fs: r, gitdir: v })).getall(y);
        })).apply(this, arguments);
      }
      function mi(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function $c(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              mi(b, a, p, f, k, "next", d);
            }
            function k(d) {
              mi(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function yi(r) {
        return wi.apply(this, arguments);
      }
      function wi() {
        return (wi = $c(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), path: a }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("path", a), yield Tc({ fs: new R.a(r), gitdir: y, path: a });
          } catch (p) {
            throw p.caller = "git.getConfigAll", p;
          }
        })).apply(this, arguments);
      }
      var hr = t(63);
      function vi(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Cc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              vi(b, a, p, f, k, "next", d);
            }
            function k(d) {
              vi(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function bi(r) {
        return _i.apply(this, arguments);
      }
      function _i() {
        return (_i = Cc(function* ({ http: r, onAuth: v, onAuthSuccess: y, onAuthFailure: a, corsProxy: p, url: b, headers: f = {}, forPush: k = !1 }) {
          try {
            Object(c.a)("http", r), Object(c.a)("url", b);
            const d = hr.a.getRemoteHelperFor({ url: b }), q = yield d.discover({ http: r, onAuth: v, onAuthSuccess: y, onAuthFailure: a, corsProxy: p, service: k ? "git-receive-pack" : "git-upload-pack", url: b, headers: f, protocolVersion: 1 }), J = { capabilities: [...q.capabilities] };
            for (const [et, Q] of q.refs) {
              const ht = et.split("/"), ft = ht.pop();
              let gt = J;
              for (const _t of ht) gt[_t] = gt[_t] || {}, gt = gt[_t];
              gt[ft] = Q;
            }
            for (const [et, Q] of q.symrefs) {
              const ht = et.split("/"), ft = ht.pop();
              let gt = J;
              for (const _t of ht) gt[_t] = gt[_t] || {}, gt = gt[_t];
              gt[ft] = Q;
            }
            return J;
          } catch (d) {
            throw d.caller = "git.getRemoteInfo", d;
          }
        })).apply(this, arguments);
      }
      function ji(r, v, y, a) {
        const p = [];
        for (const [b, f] of r.refs) {
          if (v && !b.startsWith(v)) continue;
          if (b.endsWith("^{}")) {
            if (a) {
              const d = b.replace("^{}", ""), q = p[p.length - 1], J = q.ref === d ? q : p.find((et) => et.ref === d);
              if (J === void 0) throw new Error("I did not expect this to happen");
              J.peeled = f;
            }
            continue;
          }
          const k = { ref: b, oid: f };
          y && r.symrefs.has(b) && (k.target = r.symrefs.get(b)), p.push(k);
        }
        return p;
      }
      function ki(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Dc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              ki(b, a, p, f, k, "next", d);
            }
            function k(d) {
              ki(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function xi(r) {
        return Oi.apply(this, arguments);
      }
      function Oi() {
        return (Oi = Dc(function* ({ http: r, onAuth: v, onAuthSuccess: y, onAuthFailure: a, corsProxy: p, url: b, headers: f = {}, forPush: k = !1, protocolVersion: d = 2 }) {
          try {
            Object(c.a)("http", r), Object(c.a)("url", b);
            const q = hr.a.getRemoteHelperFor({ url: b }), J = yield q.discover({ http: r, onAuth: v, onAuthSuccess: y, onAuthFailure: a, corsProxy: p, service: k ? "git-receive-pack" : "git-upload-pack", url: b, headers: f, protocolVersion: d });
            if (J.protocolVersion === 2) return { protocolVersion: J.protocolVersion, capabilities: J.capabilities2 };
            const et = {};
            for (const Q of J.capabilities) {
              const [ht, ft] = Q.split("=");
              et[ht] = ft || !0;
            }
            return { protocolVersion: 1, capabilities: et, refs: ji(J, void 0, !0, !0) };
          } catch (q) {
            throw q.caller = "git.getRemoteInfo2", q;
          }
        })).apply(this, arguments);
      }
      var Ei = t(159), Mc = t(62);
      function Pi(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Nc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Pi(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Pi(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Fc(r) {
        return Si.apply(this, arguments);
      }
      function Si() {
        return (Si = Nc(function* ({ fs: r, cache: v, onProgress: y, dir: a, gitdir: p, filepath: b }) {
          try {
            b = Object(P.join)(a, b);
            const f = yield r.read(b), k = (q) => Object(Dt.a)({ fs: r, cache: v, gitdir: p, oid: q }), d = yield Mc.a.fromPack({ pack: f, getExternalRefDelta: k, onProgress: y });
            return yield r.write(b.replace(/\.pack$/, ".idx"), yield d.toBuffer()), { oids: [...d.hashes] };
          } catch (f) {
            throw f.caller = "git.indexPack", f;
          }
        })).apply(this, arguments);
      }
      function Ai(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Uc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Ai(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Ai(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Ri(r) {
        return Bi.apply(this, arguments);
      }
      function Bi() {
        return (Bi = Uc(function* ({ fs: r, onProgress: v, dir: y, gitdir: a = Object(P.join)(y, ".git"), filepath: p, cache: b = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("dir", y), Object(c.a)("gitdir", y), Object(c.a)("filepath", p), yield Fc({ fs: new R.a(r), cache: b, onProgress: v, dir: y, gitdir: a, filepath: p });
          } catch (f) {
            throw f.caller = "git.indexPack", f;
          }
        })).apply(this, arguments);
      }
      function Ii(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function zc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Ii(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Ii(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Ti(r) {
        return $i.apply(this, arguments);
      }
      function $i() {
        return ($i = zc(function* ({ fs: r, bare: v = !1, dir: y, gitdir: a = v ? y : Object(P.join)(y, ".git"), defaultBranch: p = "master" }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", a), v || Object(c.a)("dir", y), yield Jr({ fs: new R.a(r), bare: v, dir: y, gitdir: a, defaultBranch: p });
          } catch (b) {
            throw b.caller = "git.init", b;
          }
        })).apply(this, arguments);
      }
      var Lc = t(102), Ze = t(17), Ci = t(44);
      function Di(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function qc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Di(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Di(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Mi(r) {
        return Ni.apply(this, arguments);
      }
      function Ni() {
        return (Ni = qc(function* ({ fs: r, cache: v, gitdir: y, oid: a, ancestor: p, depth: b }) {
          const f = yield Ci.a.read({ fs: r, gitdir: y });
          if (!a) throw new Te.a("oid");
          if (!p) throw new Te.a("ancestor");
          if (a === p) return !1;
          const k = [a], d = /* @__PURE__ */ new Set();
          let q = 0;
          for (; k.length; ) {
            if (q++ === b) throw new Lc.a(b);
            const J = k.shift(), { type: et, object: Q } = yield Object(Dt.a)({ fs: r, cache: v, gitdir: y, oid: J });
            if (et !== "commit") throw new Ze.a(J, et, "commit");
            const ht = er.a.from(Q).parse();
            for (const ft of ht.parent) if (ft === p) return !0;
            if (!f.has(J)) for (const ft of ht.parent) d.has(ft) || (k.push(ft), d.add(ft));
          }
          return !1;
        })).apply(this, arguments);
      }
      function Fi(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Hc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Fi(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Fi(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Ui(r) {
        return zi.apply(this, arguments);
      }
      function zi() {
        return (zi = Hc(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), oid: a, ancestor: p, depth: b = -1, cache: f = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("oid", a), Object(c.a)("ancestor", p), yield Mi({ fs: new R.a(r), cache: f, gitdir: y, oid: a, ancestor: p, depth: b });
          } catch (k) {
            throw k.caller = "git.isDescendent", k;
          }
        })).apply(this, arguments);
      }
      function Li(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Wc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Li(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Li(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function qi(r) {
        return Hi.apply(this, arguments);
      }
      function Hi() {
        return (Hi = Wc(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), filepath: a }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("dir", v), Object(c.a)("gitdir", y), Object(c.a)("filepath", a), H.a.isIgnored({ fs: new R.a(r), dir: v, gitdir: y, filepath: a });
          } catch (p) {
            throw p.caller = "git.isIgnored", p;
          }
        })).apply(this, arguments);
      }
      function Wi(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Gc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Wi(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Wi(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Gi(r) {
        return Yi.apply(this, arguments);
      }
      function Yi() {
        return (Yi = Gc(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), remote: a }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), vt.a.listBranches({ fs: new R.a(r), gitdir: y, remote: a });
          } catch (p) {
            throw p.caller = "git.listBranches", p;
          }
        })).apply(this, arguments);
      }
      var Ke = t(54);
      function Vi(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function dr(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Vi(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Vi(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Yc(r) {
        return Zi.apply(this, arguments);
      }
      function Zi() {
        return (Zi = dr(function* ({ fs: r, gitdir: v, ref: y, cache: a }) {
          if (y) {
            const p = yield vt.a.resolve({ gitdir: v, fs: r, ref: y }), b = [];
            return yield Ki({ fs: r, cache: a, gitdir: v, oid: p, filenames: b, prefix: "" }), b;
          }
          return n.a.acquire({ fs: r, gitdir: v, cache: a }, function() {
            var p = dr(function* (b) {
              return b.entries.map((f) => f.path);
            });
            return function(b) {
              return p.apply(this, arguments);
            };
          }());
        })).apply(this, arguments);
      }
      function Ki(r) {
        return Ji.apply(this, arguments);
      }
      function Ji() {
        return (Ji = dr(function* ({ fs: r, cache: v, gitdir: y, oid: a, filenames: p, prefix: b }) {
          const { tree: f } = yield Object(Ke.a)({ fs: r, cache: v, gitdir: y, oid: a });
          for (const k of f) k.type === "tree" ? yield Ki({ fs: r, cache: v, gitdir: y, oid: k.oid, filenames: p, prefix: Object(P.join)(b, k.path) }) : p.push(Object(P.join)(b, k.path));
        })).apply(this, arguments);
      }
      function Xi(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Vc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Xi(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Xi(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Qi(r) {
        return to.apply(this, arguments);
      }
      function to() {
        return (to = Vc(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), ref: a, cache: p = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), yield Yc({ fs: new R.a(r), cache: p, gitdir: y, ref: a });
          } catch (b) {
            throw b.caller = "git.listFiles", b;
          }
        })).apply(this, arguments);
      }
      function eo(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Zc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              eo(b, a, p, f, k, "next", d);
            }
            function k(d) {
              eo(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Kc(r) {
        return ro.apply(this, arguments);
      }
      function ro() {
        return (ro = Zc(function* ({ fs: r, cache: v, gitdir: y, ref: a }) {
          let p;
          try {
            p = yield vt.a.resolve({ gitdir: y, fs: r, ref: a });
          } catch (b) {
            if (b instanceof z.a) return [];
          }
          return (yield Object(Ke.a)({ fs: r, cache: v, gitdir: y, oid: p })).tree.map((b) => ({ target: b.path, note: b.oid }));
        })).apply(this, arguments);
      }
      function no(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Jc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              no(b, a, p, f, k, "next", d);
            }
            function k(d) {
              no(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function io(r) {
        return oo.apply(this, arguments);
      }
      function oo() {
        return (oo = Jc(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), ref: a = "refs/notes/commits", cache: p = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("ref", a), yield Kc({ fs: new R.a(r), cache: p, gitdir: y, ref: a });
          } catch (b) {
            throw b.caller = "git.listNotes", b;
          }
        })).apply(this, arguments);
      }
      function ao(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Xc(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              ao(b, a, p, f, k, "next", d);
            }
            function k(d) {
              ao(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function so(r) {
        return uo.apply(this, arguments);
      }
      function uo() {
        return (uo = Xc(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), filepath: a }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), vt.a.listRefs({ fs: new R.a(r), gitdir: y, filepath: a });
          } catch (p) {
            throw p.caller = "git.listRefs", p;
          }
        })).apply(this, arguments);
      }
      function co(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function fo(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              co(b, a, p, f, k, "next", d);
            }
            function k(d) {
              co(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Qc(r) {
        return lo.apply(this, arguments);
      }
      function lo() {
        return (lo = fo(function* ({ fs: r, gitdir: v }) {
          const y = yield $.a.get({ fs: r, gitdir: v }), a = yield y.getSubsections("remote");
          return Promise.all(a.map(function() {
            var p = fo(function* (b) {
              return { remote: b, url: yield y.get(`remote.${b}.url`) };
            });
            return function(b) {
              return p.apply(this, arguments);
            };
          }()));
        })).apply(this, arguments);
      }
      function ho(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function tf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              ho(b, a, p, f, k, "next", d);
            }
            function k(d) {
              ho(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function po(r) {
        return go.apply(this, arguments);
      }
      function go() {
        return (go = tf(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git") }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), yield Qc({ fs: new R.a(r), gitdir: y });
          } catch (a) {
            throw a.caller = "git.listRemotes", a;
          }
        })).apply(this, arguments);
      }
      var mo = t(55), Ee = t(9);
      function yo(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function ef(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              yo(b, a, p, f, k, "next", d);
            }
            function k(d) {
              yo(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function rf(r) {
        return wo.apply(this, arguments);
      }
      function wo() {
        return (wo = ef(function* (r) {
          const v = Ee.a.streamReader(r), y = [];
          let a;
          for (; a = yield v(), a !== !0; ) {
            if (a === null) continue;
            a = a.toString("utf8").replace(/\n$/, "");
            const [p, b, ...f] = a.split(" "), k = { ref: b, oid: p };
            for (const d of f) {
              const [q, J] = d.split(":");
              q === "symref-target" ? k.target = J : q === "peeled" && (k.peeled = J);
            }
            y.push(k);
          }
          return y;
        })).apply(this, arguments);
      }
      var pr = t(48);
      function vo(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function nf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              vo(b, a, p, f, k, "next", d);
            }
            function k(d) {
              vo(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function of(r) {
        return bo.apply(this, arguments);
      }
      function bo() {
        return (bo = nf(function* ({ prefix: r, symrefs: v, peelTags: y }) {
          const a = [];
          return a.push(Ee.a.encode(`command=ls-refs
`)), a.push(Ee.a.encode(`agent=${pr.a.agent}
`)), (y || v || r) && a.push(Ee.a.delim()), y && a.push(Ee.a.encode("peel")), v && a.push(Ee.a.encode("symrefs")), r && a.push(Ee.a.encode(`ref-prefix ${r}`)), a.push(Ee.a.flush()), a;
        })).apply(this, arguments);
      }
      function _o(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function af(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              _o(b, a, p, f, k, "next", d);
            }
            function k(d) {
              _o(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function jo(r) {
        return ko.apply(this, arguments);
      }
      function ko() {
        return (ko = af(function* ({ http: r, onAuth: v, onAuthSuccess: y, onAuthFailure: a, corsProxy: p, url: b, headers: f = {}, forPush: k = !1, protocolVersion: d = 2, prefix: q, symrefs: J, peelTags: et }) {
          try {
            Object(c.a)("http", r), Object(c.a)("url", b);
            const Q = yield mo.a.discover({ http: r, onAuth: v, onAuthSuccess: y, onAuthFailure: a, corsProxy: p, service: k ? "git-receive-pack" : "git-upload-pack", url: b, headers: f, protocolVersion: d });
            if (Q.protocolVersion === 1) return ji(Q, q, J, et);
            const ht = yield of({ prefix: q, symrefs: J, peelTags: et });
            return rf((yield mo.a.connect({ http: r, auth: Q.auth, headers: f, corsProxy: p, service: k ? "git-receive-pack" : "git-upload-pack", url: b, body: ht })).body);
          } catch (Q) {
            throw Q.caller = "git.listServerRefs", Q;
          }
        })).apply(this, arguments);
      }
      function xo(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function sf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              xo(b, a, p, f, k, "next", d);
            }
            function k(d) {
              xo(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Oo(r) {
        return Eo.apply(this, arguments);
      }
      function Eo() {
        return (Eo = sf(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git") }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), vt.a.listTags({ fs: new R.a(r), gitdir: y });
          } catch (a) {
            throw a.caller = "git.listTags", a;
          }
        })).apply(this, arguments);
      }
      var Je = t(65);
      function uf(r, v) {
        return r.committer.timestamp - v.committer.timestamp;
      }
      var gr = t(12), cf = t(47);
      function Po(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function So(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Po(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Po(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      const ff = "e69de29bb2d1d6434b8b29ae775ad8c2e48c5391";
      function Ao(r) {
        return Ro.apply(this, arguments);
      }
      function Ro() {
        return (Ro = So(function* ({ fs: r, cache: v, gitdir: y, oid: a, fileId: p }) {
          if (p === ff) return;
          const b = a;
          let f;
          const k = yield Object(cf.a)({ fs: r, cache: v, gitdir: y, oid: a }), d = k.tree;
          return p === k.oid ? f = k.path : (f = yield Bo({ fs: r, cache: v, gitdir: y, tree: d, fileId: p, oid: b }), Array.isArray(f) && (f.length === 0 ? f = void 0 : f.length === 1 && (f = f[0]))), f;
        })).apply(this, arguments);
      }
      function Bo(r) {
        return Io.apply(this, arguments);
      }
      function Io() {
        return (Io = So(function* ({ fs: r, cache: v, gitdir: y, tree: a, fileId: p, oid: b, filepaths: f = [], parentPath: k = "" }) {
          const d = a.entries().map(function(q) {
            let J;
            return q.oid === p ? (J = Object(P.join)(k, q.path), f.push(J)) : q.type === "tree" && (J = Object(Dt.a)({ fs: r, cache: v, gitdir: y, oid: q.oid }).then(function({ object: et }) {
              return Bo({ fs: r, cache: v, gitdir: y, tree: gr.a.from(et), fileId: p, oid: b, filepaths: f, parentPath: Object(P.join)(k, q.path) });
            })), J;
          });
          return yield Promise.all(d), f;
        })).apply(this, arguments);
      }
      var rr = t(70);
      function To(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function lf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              To(b, a, p, f, k, "next", d);
            }
            function k(d) {
              To(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function hf(r) {
        return $o.apply(this, arguments);
      }
      function $o() {
        return ($o = lf(function* ({ fs: r, cache: v, gitdir: y, filepath: a, ref: p, depth: b, since: f, force: k, follow: d }) {
          const q = f === void 0 ? void 0 : Math.floor(f.valueOf() / 1e3), J = [], et = yield Ci.a.read({ fs: r, gitdir: y }), Q = yield vt.a.resolve({ fs: r, gitdir: y, ref: p }), ht = [yield Object(Je.a)({ fs: r, cache: v, gitdir: y, oid: Q })];
          let ft, gt, _t;
          function Pt(Ot) {
            _t && a && J.push(Ot);
          }
          for (; ht.length > 0; ) {
            const Ot = ht.pop();
            if (q !== void 0 && Ot.commit.committer.timestamp <= q) break;
            if (a) {
              let It;
              try {
                It = yield Object(rr.a)({ fs: r, cache: v, gitdir: y, oid: Ot.commit.tree, filepath: a }), gt && ft !== It && J.push(gt), ft = It, gt = Ot, _t = !0;
              } catch ($t) {
                if (!($t instanceof z.a)) throw $t;
                {
                  let kt = d && ft;
                  if (kt && (kt = yield Ao({ fs: r, cache: v, gitdir: y, oid: Ot.commit.tree, fileId: ft }), kt)) if (Array.isArray(kt)) {
                    if (gt) {
                      const Ct = yield Ao({ fs: r, cache: v, gitdir: y, oid: gt.commit.tree, fileId: ft });
                      if (Array.isArray(Ct)) {
                        if (kt = kt.filter((St) => Ct.indexOf(St) === -1), kt.length !== 1) {
                          kt = !1, gt && J.push(gt);
                          break;
                        }
                        kt = kt[0], a = kt, gt && J.push(gt);
                      }
                    }
                  } else a = kt, gt && J.push(gt);
                  if (!kt) {
                    if (_t && ft && (J.push(gt), !k)) break;
                    if (!k && !d) throw $t;
                  }
                  gt = Ot, _t = !1;
                }
              }
            } else J.push(Ot);
            if (b !== void 0 && J.length === b) {
              Pt(Ot);
              break;
            }
            if (!et.has(Ot.oid)) for (const It of Ot.commit.parent) {
              const $t = yield Object(Je.a)({ fs: r, cache: v, gitdir: y, oid: It });
              ht.map((kt) => kt.oid).includes($t.oid) || ht.push($t);
            }
            ht.length === 0 && Pt(Ot), ht.sort((It, $t) => uf(It.commit, $t.commit));
          }
          return J;
        })).apply(this, arguments);
      }
      function Co(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function df(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Co(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Co(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Do(r) {
        return Mo.apply(this, arguments);
      }
      function Mo() {
        return (Mo = df(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), filepath: a, ref: p = "HEAD", depth: b, since: f, force: k, follow: d, cache: q = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("ref", p), yield hf({ fs: new R.a(r), cache: q, gitdir: y, filepath: a, ref: p, depth: b, since: f, force: k, follow: d });
          } catch (J) {
            throw J.caller = "git.log", J;
          }
        })).apply(this, arguments);
      }
      function No(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function pf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              No(b, a, p, f, k, "next", d);
            }
            function k(d) {
              No(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Fo(r) {
        return Uo.apply(this, arguments);
      }
      function Uo() {
        return (Uo = pf(function* ({ fs: r, onSign: v, dir: y, gitdir: a = Object(P.join)(y, ".git"), ours: p, theirs: b, fastForward: f = !0, fastForwardOnly: k = !1, dryRun: d = !1, noUpdateBranch: q = !1, abortOnConflict: J = !0, message: et, author: Q, committer: ht, signingKey: ft, cache: gt = {}, mergeDriver: _t }) {
          try {
            Object(c.a)("fs", r), ft && Object(c.a)("onSign", v);
            const Pt = new R.a(r), Ot = yield Object(st.a)({ fs: Pt, gitdir: a, author: Q });
            if (!(Ot || k && f)) throw new pt.a("author");
            const It = yield Object(mt.a)({ fs: Pt, gitdir: a, author: Ot, committer: ht });
            if (!(It || k && f)) throw new pt.a("committer");
            return yield Wn({ fs: Pt, cache: gt, dir: y, gitdir: a, ours: p, theirs: b, fastForward: f, fastForwardOnly: k, dryRun: d, noUpdateBranch: q, abortOnConflict: J, message: et, author: Ot, committer: It, signingKey: ft, onSign: v, mergeDriver: _t });
          } catch (Pt) {
            throw Pt.caller = "git.merge", Pt;
          }
        })).apply(this, arguments);
      }
      var gf = t(166);
      function zo(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function mf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              zo(b, a, p, f, k, "next", d);
            }
            function k(d) {
              zo(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Lo(r) {
        return qo.apply(this, arguments);
      }
      function qo() {
        return (qo = mf(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), oids: a, write: p = !1, cache: b = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("oids", a), yield Object(gf.a)({ fs: new R.a(r), cache: b, gitdir: y, oids: a, write: p });
          } catch (f) {
            throw f.caller = "git.packObjects", f;
          }
        })).apply(this, arguments);
      }
      function Ho(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function yf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Ho(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Ho(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Wo(r) {
        return Go.apply(this, arguments);
      }
      function Go() {
        return (Go = yf(function* ({ fs: r, http: v, onProgress: y, onMessage: a, onAuth: p, onAuthSuccess: b, onAuthFailure: f, dir: k, gitdir: d = Object(P.join)(k, ".git"), ref: q, url: J, remote: et, remoteRef: Q, prune: ht = !1, pruneTags: ft = !1, fastForward: gt = !0, fastForwardOnly: _t = !1, corsProxy: Pt, singleBranch: Ot, headers: It = {}, author: $t, committer: kt, signingKey: Ct, cache: St = {} }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("gitdir", d);
            const Mt = new R.a(r), Lt = yield Object(st.a)({ fs: Mt, gitdir: d, author: $t });
            if (!Lt) throw new pt.a("author");
            const ee = yield Object(mt.a)({ fs: Mt, gitdir: d, author: Lt, committer: kt });
            if (!ee) throw new pt.a("committer");
            return yield Vn({ fs: Mt, cache: St, http: v, onProgress: y, onMessage: a, onAuth: p, onAuthSuccess: b, onAuthFailure: f, dir: k, gitdir: d, ref: q, url: J, remote: et, remoteRef: Q, fastForward: gt, fastForwardOnly: _t, corsProxy: Pt, singleBranch: Ot, headers: It, author: Lt, committer: ee, signingKey: Ct, prune: ht, pruneTags: ft });
          } catch (Mt) {
            throw Mt.caller = "git.pull", Mt;
          }
        })).apply(this, arguments);
      }
      var wf = t(128), mr = t(115), vf = t(112), bf = t(101), Yo = t(94), _f = t(58), jf = t(77), kf = t(141), xf = t(39), Of = t(142), Ef = t(130), Pf = t(129);
      function Vo(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Zo(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Vo(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Vo(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Sf(r) {
        return Ko.apply(this, arguments);
      }
      function Ko() {
        return (Ko = Zo(function* ({ fs: r, cache: v, http: y, onProgress: a, onMessage: p, onAuth: b, onAuthSuccess: f, onAuthFailure: k, onPrePush: d, gitdir: q, ref: J, remoteRef: et, remote: Q, url: ht, force: ft = !1, delete: gt = !1, corsProxy: _t, headers: Pt = {} }) {
          const Ot = J || (yield Object(Ie.a)({ fs: r, gitdir: q }));
          if (Ot === void 0) throw new Te.a("ref");
          const It = yield $.a.get({ fs: r, gitdir: q });
          Q = Q || (yield It.get(`branch.${Ot}.pushRemote`)) || (yield It.get("remote.pushDefault")) || (yield It.get(`branch.${Ot}.remote`)) || "origin";
          const $t = ht || (yield It.get(`remote.${Q}.pushurl`)) || (yield It.get(`remote.${Q}.url`));
          if ($t === void 0) throw new Te.a("remote OR url");
          const kt = et || (yield It.get(`branch.${Ot}.merge`));
          if ($t === void 0) throw new Te.a("remoteRef");
          _t === void 0 && (_t = yield It.get("http.corsProxy"));
          const Ct = yield vt.a.expand({ fs: r, gitdir: q, ref: Ot }), St = gt ? "0000000000000000000000000000000000000000" : yield vt.a.resolve({ fs: r, gitdir: q, ref: Ct }), Mt = hr.a.getRemoteHelperFor({ url: $t }), Lt = yield Mt.discover({ http: y, onAuth: b, onAuthSuccess: f, onAuthFailure: k, corsProxy: _t, service: "git-receive-pack", url: $t, headers: Pt, protocolVersion: 1 }), ee = Lt.auth;
          let ie;
          if (kt) try {
            ie = yield vt.a.expandAgainstMap({ ref: kt, map: Lt.refs });
          } catch (ne) {
            if (!(ne instanceof z.a)) throw ne;
            ie = kt.startsWith("refs/") ? kt : `refs/heads/${kt}`;
          }
          else ie = Ct;
          const we = Lt.refs.get(ie) || "0000000000000000000000000000000000000000";
          if (d && !(yield d({ remote: Q, url: $t, localRef: { ref: gt ? "(delete)" : Ct, oid: St }, remoteRef: { ref: ie, oid: we } })))
            throw new _f.a();
          const Se = !Lt.capabilities.has("no-thin");
          let ke = /* @__PURE__ */ new Set();
          if (!gt) {
            const ne = [...Lt.refs.values()];
            let Re = /* @__PURE__ */ new Set();
            if (we !== "0000000000000000000000000000000000000000") {
              const Qt = yield lr({ fs: r, cache: v, gitdir: q, oids: [St, we] });
              for (const _r of Qt) ne.push(_r);
              Se && (Re = yield Object(mr.a)({ fs: r, cache: v, gitdir: q, oids: Qt }));
            }
            if (!ne.includes(St)) {
              const Qt = yield Object(wf.a)({ fs: r, cache: v, gitdir: q, start: [St], finish: ne });
              ke = yield Object(mr.a)({ fs: r, cache: v, gitdir: q, oids: Qt });
            }
            if (Se) {
              try {
                const Qt = yield vt.a.resolve({ fs: r, gitdir: q, ref: `refs/remotes/${Q}/HEAD`, depth: 2 }), { oid: _r } = yield vt.a.resolveAgainstMap({ ref: Qt.replace(`refs/remotes/${Q}/`, ""), fullref: Qt, map: Lt.refs }), El = [_r];
                for (const Pl of yield Object(mr.a)({ fs: r, cache: v, gitdir: q, oids: El })) Re.add(Pl);
              } catch {
              }
              for (const Qt of Re) ke.delete(Qt);
            }
            if (St === we && (ft = !0), !ft) {
              if (Ct.startsWith("refs/tags") && we !== "0000000000000000000000000000000000000000") throw new Yo.a("tag-exists");
              if (St !== "0000000000000000000000000000000000000000" && we !== "0000000000000000000000000000000000000000" && !(yield Mi({ fs: r, cache: v, gitdir: q, oid: St, ancestor: we, depth: -1 }))) throw new Yo.a("not-fast-forward");
            }
          }
          const Xe = Object(kf.a)([...Lt.capabilities], ["report-status", "side-band-64k", `agent=${pr.a.agent}`]), jl = yield Object(Pf.a)({ capabilities: Xe, triplets: [{ oldoid: we, oid: St, fullRef: ie }] }), kl = gt ? [] : yield Object(vf.a)({ fs: r, cache: v, gitdir: q, oids: [...ke] }), br = yield Mt.connect({ http: y, onProgress: a, corsProxy: _t, service: "git-receive-pack", url: $t, auth: ee, headers: Pt, body: [...jl, ...kl] }), { packfile: xl, progress: Ol } = yield jf.a.demux(br.body);
          if (p) {
            const ne = Object(Of.a)(Ol);
            Object(xf.a)(ne, function() {
              var Re = Zo(function* (Qt) {
                yield p(Qt);
              });
              return function(Qt) {
                return Re.apply(this, arguments);
              };
            }());
          }
          const Ae = yield Object(Ef.a)(xl);
          if (br.headers && (Ae.headers = br.headers), Q && Ae.ok && Ae.refs[ie].ok && !Ct.startsWith("refs/tags")) {
            const ne = `refs/remotes/${Q}/${ie.replace("refs/heads", "")}`;
            gt ? yield vt.a.deleteRef({ fs: r, gitdir: q, ref: ne }) : yield vt.a.writeRef({ fs: r, gitdir: q, ref: ne, value: St });
          }
          if (Ae.ok && Object.values(Ae.refs).every((ne) => ne.ok)) return Ae;
          {
            const ne = Object.entries(Ae.refs).filter(([Re, Qt]) => !Qt.ok).map(([Re, Qt]) => `
  - ${Re}: ${Qt.error}`).join("");
            throw new bf.a(ne, Ae);
          }
        })).apply(this, arguments);
      }
      function Jo(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Af(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Jo(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Jo(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Xo(r) {
        return Qo.apply(this, arguments);
      }
      function Qo() {
        return (Qo = Af(function* ({ fs: r, http: v, onProgress: y, onMessage: a, onAuth: p, onAuthSuccess: b, onAuthFailure: f, onPrePush: k, dir: d, gitdir: q = Object(P.join)(d, ".git"), ref: J, remoteRef: et, remote: Q = "origin", url: ht, force: ft = !1, delete: gt = !1, corsProxy: _t, headers: Pt = {}, cache: Ot = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("http", v), Object(c.a)("gitdir", q), yield Sf({ fs: new R.a(r), cache: Ot, http: v, onProgress: y, onMessage: a, onAuth: p, onAuthSuccess: b, onAuthFailure: f, onPrePush: k, gitdir: q, ref: J, remoteRef: et, remote: Q, url: ht, force: ft, delete: gt, corsProxy: _t, headers: Pt });
          } catch (It) {
            throw It.caller = "git.push", It;
          }
        })).apply(this, arguments);
      }
      function ta(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Rf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              ta(b, a, p, f, k, "next", d);
            }
            function k(d) {
              ta(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function ea(r) {
        return ra.apply(this, arguments);
      }
      function ra() {
        return (ra = Rf(function* ({ fs: r, cache: v, gitdir: y, oid: a }) {
          const { type: p, object: b } = yield Object(Dt.a)({ fs: r, cache: v, gitdir: y, oid: a });
          if (p === "tag") return ea({ fs: r, cache: v, gitdir: y, oid: a = Zt.a.from(b).parse().object });
          if (p !== "blob") throw new Ze.a(a, p, "blob");
          return { oid: a, blob: new Uint8Array(b) };
        })).apply(this, arguments);
      }
      function na(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Bf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              na(b, a, p, f, k, "next", d);
            }
            function k(d) {
              na(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function ia(r) {
        return oa.apply(this, arguments);
      }
      function oa() {
        return (oa = Bf(function* ({ fs: r, cache: v, gitdir: y, oid: a, filepath: p }) {
          return p !== void 0 && (a = yield Object(rr.a)({ fs: r, cache: v, gitdir: y, oid: a, filepath: p })), yield ea({ fs: r, cache: v, gitdir: y, oid: a });
        })).apply(this, arguments);
      }
      function aa(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function If(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              aa(b, a, p, f, k, "next", d);
            }
            function k(d) {
              aa(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function sa(r) {
        return ua.apply(this, arguments);
      }
      function ua() {
        return (ua = If(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), oid: a, filepath: p, cache: b = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("oid", a), yield ia({ fs: new R.a(r), cache: b, gitdir: y, oid: a, filepath: p });
          } catch (f) {
            throw f.caller = "git.readBlob", f;
          }
        })).apply(this, arguments);
      }
      function ca(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Tf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              ca(b, a, p, f, k, "next", d);
            }
            function k(d) {
              ca(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function yr(r) {
        return fa.apply(this, arguments);
      }
      function fa() {
        return (fa = Tf(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), oid: a, cache: p = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("oid", a), yield Object(Je.a)({ fs: new R.a(r), cache: p, gitdir: y, oid: a });
          } catch (b) {
            throw b.caller = "git.readCommit", b;
          }
        })).apply(this, arguments);
      }
      function la(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function $f(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              la(b, a, p, f, k, "next", d);
            }
            function k(d) {
              la(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Cf(r) {
        return ha.apply(this, arguments);
      }
      function ha() {
        return (ha = $f(function* ({ fs: r, cache: v, gitdir: y, ref: a = "refs/notes/commits", oid: p }) {
          const b = yield vt.a.resolve({ gitdir: y, fs: r, ref: a }), { blob: f } = yield ia({ fs: r, cache: v, gitdir: y, oid: b, filepath: p });
          return f;
        })).apply(this, arguments);
      }
      function da(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Df(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              da(b, a, p, f, k, "next", d);
            }
            function k(d) {
              da(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function pa(r) {
        return ga.apply(this, arguments);
      }
      function ga() {
        return (ga = Df(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), ref: a = "refs/notes/commits", oid: p, cache: b = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("ref", a), Object(c.a)("oid", p), yield Cf({ fs: new R.a(r), cache: b, gitdir: y, ref: a, oid: p });
          } catch (f) {
            throw f.caller = "git.readNote", f;
          }
        })).apply(this, arguments);
      }
      function ma(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Mf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              ma(b, a, p, f, k, "next", d);
            }
            function k(d) {
              ma(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function ya(r) {
        return wa.apply(this, arguments);
      }
      function wa() {
        return (wa = Mf(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), oid: a, format: p = "parsed", filepath: b, encoding: f, cache: k = {} }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("oid", a);
            const d = new R.a(r);
            b !== void 0 && (a = yield Object(rr.a)({ fs: d, cache: k, gitdir: y, oid: a, filepath: b }));
            const q = p === "parsed" ? "content" : p, J = yield Object(Dt.a)({ fs: d, cache: k, gitdir: y, oid: a, format: q });
            if (J.oid = a, p === "parsed") switch (J.format = "parsed", J.type) {
              case "commit":
                J.object = er.a.from(J.object).parse();
                break;
              case "tree":
                J.object = gr.a.from(J.object).entries();
                break;
              case "blob":
                f ? J.object = J.object.toString(f) : (J.object = new Uint8Array(J.object), J.format = "content");
                break;
              case "tag":
                J.object = Zt.a.from(J.object).parse();
                break;
              default:
                throw new Ze.a(J.oid, J.type, "blob|commit|tag|tree");
            }
            else J.format !== "deflated" && J.format !== "wrapped" || (J.type = J.format);
            return J;
          } catch (d) {
            throw d.caller = "git.readObject", d;
          }
        })).apply(this, arguments);
      }
      function va(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Nf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              va(b, a, p, f, k, "next", d);
            }
            function k(d) {
              va(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Ff(r) {
        return ba.apply(this, arguments);
      }
      function ba() {
        return (ba = Nf(function* ({ fs: r, cache: v, gitdir: y, oid: a }) {
          const { type: p, object: b } = yield Object(Dt.a)({ fs: r, cache: v, gitdir: y, oid: a, format: "content" });
          if (p !== "tag") throw new Ze.a(a, p, "tag");
          const f = Zt.a.from(b);
          return { oid: a, tag: f.parse(), payload: f.payload() };
        })).apply(this, arguments);
      }
      function _a(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Uf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              _a(b, a, p, f, k, "next", d);
            }
            function k(d) {
              _a(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function ja(r) {
        return ka.apply(this, arguments);
      }
      function ka() {
        return (ka = Uf(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), oid: a, cache: p = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("oid", a), yield Ff({ fs: new R.a(r), cache: p, gitdir: y, oid: a });
          } catch (b) {
            throw b.caller = "git.readTag", b;
          }
        })).apply(this, arguments);
      }
      function xa(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function zf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              xa(b, a, p, f, k, "next", d);
            }
            function k(d) {
              xa(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Oa(r) {
        return Ea.apply(this, arguments);
      }
      function Ea() {
        return (Ea = zf(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), oid: a, filepath: p, cache: b = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("oid", a), yield Object(Ke.a)({ fs: new R.a(r), cache: b, gitdir: y, oid: a, filepath: p });
          } catch (f) {
            throw f.caller = "git.readTree", f;
          }
        })).apply(this, arguments);
      }
      function Pa(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Sa(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Pa(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Pa(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Aa(r) {
        return Ra.apply(this, arguments);
      }
      function Ra() {
        return (Ra = Sa(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), filepath: a, cache: p = {} }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("filepath", a), yield n.a.acquire({ fs: new R.a(r), gitdir: y, cache: p }, function() {
              var b = Sa(function* (f) {
                f.delete({ filepath: a });
              });
              return function(f) {
                return b.apply(this, arguments);
              };
            }());
          } catch (b) {
            throw b.caller = "git.remove", b;
          }
        })).apply(this, arguments);
      }
      var nr = t(89);
      function Ba(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Lf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Ba(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Ba(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function qf(r) {
        return Ia.apply(this, arguments);
      }
      function Ia() {
        return (Ia = Lf(function* ({ fs: r, cache: v, onSign: y, gitdir: a, ref: p = "refs/notes/commits", oid: b, author: f, committer: k, signingKey: d }) {
          let q;
          try {
            q = yield vt.a.resolve({ gitdir: a, fs: r, ref: p });
          } catch (Q) {
            if (!(Q instanceof z.a)) throw Q;
          }
          let J = (yield Object(Ke.a)({ fs: r, gitdir: a, oid: q || "4b825dc642cb6eb9a060e54bf8d69288fbee4904" })).tree;
          J = J.filter((Q) => Q.path !== b);
          const et = yield Object(nr.a)({ fs: r, gitdir: a, tree: J });
          return yield Object(fr.a)({ fs: r, cache: v, onSign: y, gitdir: a, ref: p, tree: et, parent: q && [q], message: `Note removed by 'isomorphic-git removeNote'
`, author: f, committer: k, signingKey: d });
        })).apply(this, arguments);
      }
      function Ta(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Hf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Ta(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Ta(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function $a(r) {
        return Ca.apply(this, arguments);
      }
      function Ca() {
        return (Ca = Hf(function* ({ fs: r, onSign: v, dir: y, gitdir: a = Object(P.join)(y, ".git"), ref: p = "refs/notes/commits", oid: b, author: f, committer: k, signingKey: d, cache: q = {} }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("gitdir", a), Object(c.a)("oid", b);
            const J = new R.a(r), et = yield Object(st.a)({ fs: J, gitdir: a, author: f });
            if (!et) throw new pt.a("author");
            const Q = yield Object(mt.a)({ fs: J, gitdir: a, author: et, committer: k });
            if (!Q) throw new pt.a("committer");
            return yield qf({ fs: J, cache: q, onSign: v, gitdir: a, ref: p, oid: b, author: et, committer: Q, signingKey: d });
          } catch (J) {
            throw J.caller = "git.removeNote", J;
          }
        })).apply(this, arguments);
      }
      function Da(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Wf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Da(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Da(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Gf(r) {
        return Ma.apply(this, arguments);
      }
      function Ma() {
        return (Ma = Wf(function* ({ fs: r, gitdir: v, oldref: y, ref: a, checkout: p = !1 }) {
          if (a !== K.a.clean(a)) throw new rt.a(a, K.a.clean(a));
          if (y !== K.a.clean(y)) throw new rt.a(y, K.a.clean(y));
          const b = `refs/heads/${y}`, f = `refs/heads/${a}`;
          if (yield vt.a.exists({ fs: r, gitdir: v, ref: f })) throw new X.a("branch", a, !1);
          const k = yield vt.a.resolve({ fs: r, gitdir: v, ref: b, depth: 1 });
          yield vt.a.writeRef({ fs: r, gitdir: v, ref: f, value: k }), yield vt.a.deleteRef({ fs: r, gitdir: v, ref: b });
          const d = yield Object(Ie.a)({ fs: r, gitdir: v, fullname: !0 });
          (p || d === b) && (yield vt.a.writeSymbolicRef({ fs: r, gitdir: v, ref: "HEAD", value: f }));
        })).apply(this, arguments);
      }
      function Na(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Yf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Na(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Na(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Fa(r) {
        return Ua.apply(this, arguments);
      }
      function Ua() {
        return (Ua = Yf(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), ref: a, oldref: p, checkout: b = !1 }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("ref", a), Object(c.a)("oldref", p), yield Gf({ fs: new R.a(r), gitdir: y, ref: a, oldref: p, checkout: b });
          } catch (f) {
            throw f.caller = "git.renameBranch", f;
          }
        })).apply(this, arguments);
      }
      var Vf = t(25), Zf = t(19);
      function za(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Kf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              za(b, a, p, f, k, "next", d);
            }
            function k(d) {
              za(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function La(r) {
        return qa.apply(this, arguments);
      }
      function qa() {
        return (qa = Kf(function* ({ gitdir: r, type: v, object: y }) {
          return Object(Zf.a)(Vf.a.wrap({ type: v, object: y }));
        })).apply(this, arguments);
      }
      function Ha(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Wa(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Ha(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Ha(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Ga(r) {
        return Ya.apply(this, arguments);
      }
      function Ya() {
        return (Ya = Wa(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), filepath: a, ref: p, cache: b = {} }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("filepath", a);
            const f = new R.a(r);
            let k, d;
            try {
              k = yield vt.a.resolve({ fs: f, gitdir: y, ref: p || "HEAD" });
            } catch (et) {
              if (p) throw et;
            }
            if (k) try {
              k = yield Object(rr.a)({ fs: f, cache: b, gitdir: y, oid: k, filepath: a });
            } catch {
              k = null;
            }
            let q = { ctime: /* @__PURE__ */ new Date(0), mtime: /* @__PURE__ */ new Date(0), dev: 0, ino: 0, mode: 0, uid: 0, gid: 0, size: 0 };
            const J = v && (yield f.read(Object(P.join)(v, a)));
            J && (d = yield La({ gitdir: y, type: "blob", object: J }), k === d && (q = yield f.lstat(Object(P.join)(v, a)))), yield n.a.acquire({ fs: f, gitdir: y, cache: b }, function() {
              var et = Wa(function* (Q) {
                Q.delete({ filepath: a }), k && Q.insert({ filepath: a, stats: q, oid: k });
              });
              return function(Q) {
                return et.apply(this, arguments);
              };
            }());
          } catch (f) {
            throw f.caller = "git.reset", f;
          }
        })).apply(this, arguments);
      }
      function Va(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Jf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Va(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Va(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Za(r) {
        return Ka.apply(this, arguments);
      }
      function Ka() {
        return (Ka = Jf(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), ref: a, depth: p }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("ref", a), yield vt.a.resolve({ fs: new R.a(r), gitdir: y, ref: a, depth: p });
          } catch (b) {
            throw b.caller = "git.resolveRef", b;
          }
        })).apply(this, arguments);
      }
      function Ja(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Xf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Ja(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Ja(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Xa(r) {
        return Qa.apply(this, arguments);
      }
      function Qa() {
        return (Qa = Xf(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), path: a, value: p, append: b = !1 }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("path", a);
            const f = new R.a(r), k = yield $.a.get({ fs: f, gitdir: y });
            b ? yield k.append(a, p) : yield k.set(a, p), yield $.a.save({ fs: f, gitdir: y, config: k });
          } catch (f) {
            throw f.caller = "git.setConfig", f;
          }
        })).apply(this, arguments);
      }
      function ts(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Qf(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              ts(b, a, p, f, k, "next", d);
            }
            function k(d) {
              ts(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function es(r) {
        return rs.apply(this, arguments);
      }
      function rs() {
        return (rs = Qf(function* ({ fs: r, gitdir: v, commit: y }) {
          const a = er.a.from(y).toObject();
          return yield Object(nt.a)({ fs: r, gitdir: v, type: "commit", object: a, format: "content" });
        })).apply(this, arguments);
      }
      class ir {
        static get timezoneOffsetForRefLogEntry() {
          const v = (/* @__PURE__ */ new Date()).getTimezoneOffset(), y = Math.abs(Math.floor(v / 60)), a = Math.abs(v % 60).toString().padStart(2, "0");
          return `${v > 0 ? "-" : "+"}${y.toString().padStart(2, "0")}${a}`;
        }
        static createStashReflogEntry(v, y, a) {
          const p = v.name.replace(/\s/g, ""), b = Math.floor(Date.now() / 1e3), f = ir.timezoneOffsetForRefLogEntry;
          return `0000000000000000000000000000000000000000 ${y} ${p} ${v.email} ${b} ${f}	${a}
`;
        }
        static getStashReflogEntry(v, y = !1) {
          return v.split(`
`).filter((a) => a).reverse().map((a, p) => y ? `stash@{${p}}: ${a.split("	")[1]}` : a);
        }
      }
      var tl = t(33), el = t.n(tl), rl = t(113);
      function ns(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function se(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              ns(b, a, p, f, k, "next", d);
            }
            function k(d) {
              ns(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      const nl = { stage: E, workdir: h };
      let wr;
      function Me(r, v) {
        return is.apply(this, arguments);
      }
      function is() {
        return (is = se(function* (r, v) {
          return wr === void 0 && (wr = new el.a()), wr.acquire(r, v);
        })).apply(this, arguments);
      }
      function il(r, v, y, a) {
        return os.apply(this, arguments);
      }
      function os() {
        return (os = se(function* (r, v, y, a, p = null) {
          const b = Object(P.join)(y, a), f = yield r.lstat(b);
          if (!f) throw new z.a(b);
          if (f.isDirectory()) throw new l.a(`${b}: file expected, but found directory`);
          const k = p ? yield Object(rl.a)({ fs: r, gitdir: v, oid: p }) : void 0;
          let d = k ? p : void 0;
          return k || (yield Me({ fs: r, gitdir: v, currentFilepath: b }, se(function* () {
            const q = f.isSymbolicLink() ? yield r.readlink(b).then(ot) : yield r.read(b);
            if (q === null) throw new z.a(b);
            d = yield Object(nt.a)({ fs: r, gitdir: v, type: "blob", object: q });
          }))), d;
        })).apply(this, arguments);
      }
      function ol(r) {
        return as.apply(this, arguments);
      }
      function as() {
        return (as = se(function* ({ fs: r, dir: v, gitdir: y, entries: a }) {
          function p(f) {
            return b.apply(this, arguments);
          }
          function b() {
            return (b = se(function* (f) {
              if (f.type === "tree") {
                if (!f.oid) {
                  const k = yield Promise.all(f.children.map(p));
                  f.oid = yield Object(nr.a)({ fs: r, gitdir: y, tree: k }), f.mode = 16384;
                }
              } else f.type === "blob" && (f.oid = yield il(r, y, v, f.path, f.oid), f.mode = 33188);
              return f.path = f.path.split("/").pop(), f;
            })).apply(this, arguments);
          }
          return Promise.all(a.map(p));
        })).apply(this, arguments);
      }
      function ss(r) {
        return us.apply(this, arguments);
      }
      function us() {
        return (us = se(function* ({ fs: r, dir: v, gitdir: y, treePair: a }) {
          const p = a[1] === "stage", b = a.map((Q) => typeof Q == "string" ? nl[Q]() : Q), f = [], k = function() {
            var Q = se(function* (ht, [ft, gt]) {
              if (ht !== "." && !(yield H.a.isIgnored({ fs: r, dir: v, gitdir: y, filepath: ht }))) return gt ? ((!ft || (yield ft.oid()) !== (yield gt.oid()) && (yield gt.oid()) !== void 0) && f.push([ft, gt]), { mode: yield gt.mode(), path: ht, oid: yield gt.oid(), type: yield gt.type() }) : void 0;
            });
            return function(ht, ft) {
              return Q.apply(this, arguments);
            };
          }(), d = function() {
            var Q = se(function* (ht, ft) {
              return ft = ft.filter(Boolean), ht ? (ht.children = ft, ht) : ft.length > 0 ? ft : void 0;
            });
            return function(ht, ft) {
              return Q.apply(this, arguments);
            };
          }(), q = function() {
            var Q = se(function* (ht, ft) {
              const gt = [];
              for (const _t of ft) {
                const [Pt, Ot] = _t;
                p ? Ot && ((yield r.exists(`${v}/${Ot.toString()}`)) ? gt.push(_t) : f.push([null, Ot])) : Pt && (Ot ? gt.push(_t) : f.push([Pt, null]));
              }
              return gt.length ? Promise.all(gt.map(ht)) : [];
            });
            return function(ht, ft) {
              return Q.apply(this, arguments);
            };
          }(), J = yield Object(S.a)({ fs: r, cache: {}, dir: v, gitdir: y, trees: b, map: k, reduce: d, iterate: q });
          if (f.length === 0 || J.length === 0) return null;
          const et = (yield ol({ fs: r, dir: v, gitdir: y, entries: J })).filter(Boolean).map((Q) => ({ mode: Q.mode, path: Q.path, oid: Q.oid, type: Q.type }));
          return Object(nr.a)({ fs: r, gitdir: y, tree: et });
        })).apply(this, arguments);
      }
      function al(r) {
        return cs.apply(this, arguments);
      }
      function cs() {
        return (cs = se(function* ({ fs: r, dir: v, gitdir: y, stashCommit: a, parentCommit: p, wasStaged: b }) {
          const f = [], k = [], d = yield Object(S.a)({ fs: r, cache: {}, dir: v, gitdir: y, trees: [Object(m.a)({ ref: p }), Object(m.a)({ ref: a })], map: (q = se(function* (J, [et, Q]) {
            if (J === "." || (yield H.a.isIgnored({ fs: r, dir: v, gitdir: y, filepath: J }))) return;
            const ht = Q ? yield Q.type() : yield et.type();
            if (ht !== "tree" && ht !== "blob") return;
            if (!Q && et) {
              const gt = ht === "tree" ? "rmdir" : "rm";
              return ht === "tree" && f.push(J), ht === "blob" && b && k.push({ filepath: J, oid: yield et.oid() }), { method: gt, filepath: J };
            }
            const ft = yield Q.oid();
            return et && (yield et.oid()) === ft ? void 0 : ht === "tree" ? { method: "mkdir", filepath: J } : (b && k.push({ filepath: J, oid: ft, stats: yield r.lstat(Object(P.join)(v, J)) }), { method: "write", filepath: J, oid: ft });
          }), function(J, et) {
            return q.apply(this, arguments);
          }) });
          var q;
          yield Me({ fs: r, gitdir: y, dirRemoved: f, ops: d }, se(function* () {
            for (const J of d) {
              const et = Object(P.join)(v, J.filepath);
              switch (J.method) {
                case "rmdir":
                  yield r.rmdir(et);
                  break;
                case "mkdir":
                  yield r.mkdir(et);
                  break;
                case "rm":
                  yield r.rm(et);
                  break;
                case "write":
                  if (!f.some((Q) => et.startsWith(Q))) {
                    const { object: Q } = yield Object(Dt.a)({ fs: r, cache: {}, gitdir: y, oid: J.oid });
                    (yield r.exists(et)) && (yield r.rm(et)), yield r.write(et, Q);
                  }
              }
            }
          })), yield n.a.acquire({ fs: r, gitdir: y, cache: {} }, function() {
            var J = se(function* (et) {
              k.forEach(({ filepath: Q, stats: ht, oid: ft }) => {
                et.insert({ filepath: Q, stats: ht, oid: ft });
              });
            });
            return function(et) {
              return J.apply(this, arguments);
            };
          }());
        })).apply(this, arguments);
      }
      function fs(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Pe(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              fs(b, a, p, f, k, "next", d);
            }
            function k(d) {
              fs(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      class je {
        constructor({ fs: v, dir: y, gitdir: a = Object(P.join)(y, ".git") }) {
          Object.assign(this, { fs: v, dir: y, gitdir: a, _author: null });
        }
        static get refStash() {
          return "refs/stash";
        }
        static get refLogsStash() {
          return "logs/refs/stash";
        }
        get refStashPath() {
          return Object(P.join)(this.gitdir, je.refStash);
        }
        get refLogsStashPath() {
          return Object(P.join)(this.gitdir, je.refLogsStash);
        }
        getAuthor() {
          var v = this;
          return Pe(function* () {
            if (!v._author && (v._author = yield Object(st.a)({ fs: v.fs, gitdir: v.gitdir, author: {} }), !v._author)) throw new pt.a("author");
            return v._author;
          })();
        }
        getStashSHA(v, y) {
          var a = this;
          return Pe(function* () {
            return (yield a.fs.exists(a.refStashPath)) ? (y || (yield a.readStashReflogs({ parsed: !1 })))[v].split(" ")[1] : null;
          })();
        }
        writeStashCommit({ message: v, tree: y, parent: a }) {
          var p = this;
          return Pe(function* () {
            return es({ fs: p.fs, gitdir: p.gitdir, commit: { message: v, tree: y, parent: a, author: yield p.getAuthor(), committer: yield p.getAuthor() } });
          })();
        }
        readStashCommit(v) {
          var y = this;
          return Pe(function* () {
            const a = yield y.readStashReflogs({ parsed: !1 });
            if (v !== 0 && (v < 0 || v > a.length - 1)) throw new rt.a(`stash@${v}`, "number that is in range of [0, num of stash pushed]");
            const p = yield y.getStashSHA(v, a);
            return p ? Object(Je.a)({ fs: y.fs, cache: {}, gitdir: y.gitdir, oid: p }) : {};
          })();
        }
        writeStashRef(v) {
          var y = this;
          return Pe(function* () {
            return vt.a.writeRef({ fs: y.fs, gitdir: y.gitdir, ref: je.refStash, value: v });
          })();
        }
        writeStashReflogEntry({ stashCommit: v, message: y }) {
          var a = this;
          return Pe(function* () {
            const p = yield a.getAuthor(), b = ir.createStashReflogEntry(p, v, y), f = a.refLogsStashPath;
            yield Me({ filepath: f, entry: b }, Pe(function* () {
              const k = (yield a.fs.exists(f)) ? yield a.fs.read(f, "utf8") : "";
              yield a.fs.write(f, k + b, "utf8");
            }));
          })();
        }
        readStashReflogs({ parsed: v = !1 }) {
          var y = this;
          return Pe(function* () {
            if (!(yield y.fs.exists(y.refLogsStashPath))) return [];
            const a = (yield y.fs.read(y.refLogsStashPath)).toString();
            return ir.getStashReflogEntry(a, v);
          })();
        }
      }
      function ls(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function ye(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              ls(b, a, p, f, k, "next", d);
            }
            function k(d) {
              ls(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function sl(r) {
        return hs.apply(this, arguments);
      }
      function hs() {
        return (hs = ye(function* ({ fs: r, dir: v, gitdir: y, message: a = "" }) {
          const p = new je({ fs: r, dir: v, gitdir: y });
          yield p.getAuthor();
          const b = yield Object(Ie.a)({ fs: r, gitdir: y, fullname: !1 }), f = yield vt.a.resolve({ fs: r, gitdir: y, ref: "HEAD" }), k = (yield yr({ fs: r, dir: v, gitdir: y, oid: f })).commit.message, d = [f];
          let q = null, J = Object(m.a)({ ref: "HEAD" });
          const et = yield ss({ fs: r, dir: v, gitdir: y, treePair: [Object(m.a)({ ref: "HEAD" }), "stage"] });
          if (et) {
            const gt = yield p.writeStashCommit({ message: `stash-Index: WIP on ${b} - ${(/* @__PURE__ */ new Date()).toISOString()}`, tree: et, parent: d });
            d.push(gt), q = et, J = E();
          }
          const Q = yield ss({ fs: r, dir: v, gitdir: y, treePair: [J, "workdir"] });
          if (Q) {
            const gt = yield p.writeStashCommit({ message: `stash-WorkDir: WIP on ${b} - ${(/* @__PURE__ */ new Date()).toISOString()}`, tree: Q, parent: [d[d.length - 1]] });
            d.push(gt), q = Q;
          }
          if (!q || !et && !Q) throw new z.a("changes, nothing to stash");
          const ht = (a.trim() || `WIP on ${b}`) + `: ${f.substring(0, 7)} ${k}`, ft = yield p.writeStashCommit({ message: ht, tree: q, parent: d });
          return yield p.writeStashRef(ft), yield p.writeStashReflogEntry({ stashCommit: ft, message: ht }), yield ur({ fs: r, dir: v, gitdir: y, ref: b, track: !1, force: !0 }), ft;
        })).apply(this, arguments);
      }
      function ds(r) {
        return ps.apply(this, arguments);
      }
      function ps() {
        return (ps = ye(function* ({ fs: r, dir: v, gitdir: y, refIdx: a = 0 }) {
          const p = new je({ fs: r, dir: v, gitdir: y }), b = yield p.readStashCommit(a), { parent: f = null } = b.commit ? b.commit : {};
          if (f && Array.isArray(f)) for (let k = 0; k < f.length - 1; k++) {
            const d = (yield Object(Je.a)({ fs: r, cache: {}, gitdir: y, oid: f[k + 1] })).commit.message.startsWith("stash-Index");
            yield al({ fs: r, dir: v, gitdir: y, stashCommit: f[k + 1], parentCommit: f[k], wasStaged: d });
          }
        })).apply(this, arguments);
      }
      function gs(r) {
        return ms.apply(this, arguments);
      }
      function ms() {
        return (ms = ye(function* ({ fs: r, dir: v, gitdir: y, refIdx: a = 0 }) {
          const p = new je({ fs: r, dir: v, gitdir: y });
          if (!(yield p.readStashCommit(a)).commit) return;
          const b = p.refStashPath;
          yield Me(b, ye(function* () {
            (yield r.exists(b)) && (yield r.rm(b));
          }));
          const f = yield p.readStashReflogs({ parsed: !1 });
          if (!f.length) return;
          f.splice(a, 1);
          const k = p.refLogsStashPath;
          yield Me({ reflogEntries: f, stashReflogPath: k, stashMgr: p }, ye(function* () {
            if (f.length) {
              yield r.write(k, f.join(`
`), "utf8");
              const d = f[f.length - 1].split(" ")[1];
              yield p.writeStashRef(d);
            } else yield r.rm(k);
          }));
        })).apply(this, arguments);
      }
      function ul(r) {
        return ys.apply(this, arguments);
      }
      function ys() {
        return (ys = ye(function* ({ fs: r, dir: v, gitdir: y }) {
          return new je({ fs: r, dir: v, gitdir: y }).readStashReflogs({ parsed: !0 });
        })).apply(this, arguments);
      }
      function cl(r) {
        return ws.apply(this, arguments);
      }
      function ws() {
        return (ws = ye(function* ({ fs: r, dir: v, gitdir: y }) {
          const a = new je({ fs: r, dir: v, gitdir: y }), p = [a.refStashPath, a.refLogsStashPath];
          yield Me(p, ye(function* () {
            yield Promise.all(p.map(function() {
              var b = ye(function* (f) {
                if (yield r.exists(f)) return r.rm(f);
              });
              return function(f) {
                return b.apply(this, arguments);
              };
            }()));
          }));
        })).apply(this, arguments);
      }
      function fl(r) {
        return vs.apply(this, arguments);
      }
      function vs() {
        return (vs = ye(function* ({ fs: r, dir: v, gitdir: y, refIdx: a = 0 }) {
          yield ds({ fs: r, dir: v, gitdir: y, refIdx: a }), yield gs({ fs: r, dir: v, gitdir: y, refIdx: a });
        })).apply(this, arguments);
      }
      function bs(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function _s(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              bs(b, a, p, f, k, "next", d);
            }
            function k(d) {
              bs(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function js(r) {
        return ks.apply(this, arguments);
      }
      function ks() {
        return (ks = _s(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), op: a = "push", message: p = "", refIdx: b = 0 }) {
          Object(c.a)("fs", r), Object(c.a)("dir", v), Object(c.a)("gitdir", y), Object(c.a)("op", a);
          const f = { push: sl, apply: ds, drop: gs, list: ul, clear: cl, pop: fl }, k = ["apply", "drop", "pop"];
          try {
            const d = new R.a(r);
            ["refs", "logs", "logs/refs"].map((J) => Object(P.join)(y, J)).forEach(function() {
              var J = _s(function* (et) {
                (yield d.exists(et)) || (yield d.mkdir(et));
              });
              return function(et) {
                return J.apply(this, arguments);
              };
            }());
            const q = f[a];
            if (q) {
              if (k.includes(a) && b < 0) throw new rt.a(`stash@${b}`, "number that is in range of [0, num of stash pushed]");
              return yield q({ fs: d, dir: v, gitdir: y, message: p, refIdx: b });
            }
            throw new Error(`To be implemented: ${a}`);
          } catch (d) {
            throw d.caller = "git.stash", d;
          }
        })).apply(this, arguments);
      }
      var ll = t(69);
      function xs(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Ne(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              xs(b, a, p, f, k, "next", d);
            }
            function k(d) {
              xs(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Os(r) {
        return Es.apply(this, arguments);
      }
      function Es() {
        return (Es = Ne(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), filepath: a, cache: p = {} }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("filepath", a);
            const b = new R.a(r);
            if (yield H.a.isIgnored({ fs: b, gitdir: y, dir: v, filepath: a })) return "ignored";
            const f = yield hl({ fs: b, cache: p, gitdir: y }), k = yield Ps({ fs: b, cache: p, gitdir: y, tree: f, path: a }), d = yield n.a.acquire({ fs: b, gitdir: y, cache: p }, function() {
              var ft = Ne(function* (gt) {
                for (const _t of gt) if (_t.path === a) return _t;
                return null;
              });
              return function(gt) {
                return ft.apply(this, arguments);
              };
            }()), q = yield b.lstat(Object(P.join)(v, a)), J = k !== null, et = d !== null, Q = q !== null, ht = function() {
              var ft = Ne(function* () {
                if (et && !Object(ll.a)(d, q)) return d.oid;
                {
                  const gt = yield b.read(Object(P.join)(v, a)), _t = yield La({ gitdir: y, type: "blob", object: gt });
                  return et && d.oid === _t && q.size !== -1 && n.a.acquire({ fs: b, gitdir: y, cache: p }, function() {
                    var Pt = Ne(function* (Ot) {
                      Ot.insert({ filepath: a, stats: q, oid: _t });
                    });
                    return function(Ot) {
                      return Pt.apply(this, arguments);
                    };
                  }()), _t;
                }
              });
              return function() {
                return ft.apply(this, arguments);
              };
            }();
            if (!J && !Q && !et) return "absent";
            if (!J && !Q && et) return "*absent";
            if (!J && Q && !et) return "*added";
            if (!J && Q && et)
              return (yield ht()) === d.oid ? "added" : "*added";
            if (J && !Q && !et) return "deleted";
            if (J && !Q && et) return d.oid, "*deleted";
            if (J && Q && !et)
              return (yield ht()) === k ? "*undeleted" : "*undeletemodified";
            if (J && Q && et) {
              const ft = yield ht();
              return ft === k ? ft === d.oid ? "unmodified" : "*unmodified" : ft === d.oid ? "modified" : "*modified";
            }
          } catch (b) {
            throw b.caller = "git.status", b;
          }
        })).apply(this, arguments);
      }
      function Ps(r) {
        return Ss.apply(this, arguments);
      }
      function Ss() {
        return (Ss = Ne(function* ({ fs: r, cache: v, gitdir: y, tree: a, path: p }) {
          typeof p == "string" && (p = p.split("/"));
          const b = p.shift();
          for (const f of a) if (f.path === b) {
            if (p.length === 0) return f.oid;
            const { type: k, object: d } = yield Object(Dt.a)({ fs: r, cache: v, gitdir: y, oid: f.oid });
            if (k === "tree")
              return Ps({ fs: r, cache: v, gitdir: y, tree: gr.a.from(d), path: p });
            if (k === "blob") throw new Ze.a(f.oid, k, "blob", p.join("/"));
          }
          return null;
        })).apply(this, arguments);
      }
      function hl(r) {
        return As.apply(this, arguments);
      }
      function As() {
        return (As = Ne(function* ({ fs: r, cache: v, gitdir: y }) {
          let a;
          try {
            a = yield vt.a.resolve({ fs: r, gitdir: y, ref: "HEAD" });
          } catch (b) {
            if (b instanceof z.a) return [];
          }
          const { tree: p } = yield Object(Ke.a)({ fs: r, cache: v, gitdir: y, oid: a });
          return p;
        })).apply(this, arguments);
      }
      function Rs(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function Bs(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Rs(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Rs(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Is(r) {
        return Ts.apply(this, arguments);
      }
      function Ts() {
        return (Ts = Bs(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), ref: a = "HEAD", filepaths: p = ["."], filter: b, cache: f = {}, ignored: k = !1 }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("ref", a);
            const q = new R.a(r);
            return yield Object(S.a)({ fs: q, cache: f, dir: v, gitdir: y, trees: [Object(m.a)({ ref: a }), h(), E()], map: (d = Bs(function* (J, [et, Q, ht]) {
              if (!et && !ht && Q && !k && (yield H.a.isIgnored({ fs: q, dir: v, filepath: J })) || !p.some((St) => Jt(J, St))) return null;
              if (b && !b(J)) return;
              const [ft, gt, _t] = yield Promise.all([et && et.type(), Q && Q.type(), ht && ht.type()]), Pt = [ft, gt, _t].includes("blob");
              if ((ft === "tree" || ft === "special") && !Pt) return;
              if (ft === "commit") return null;
              if ((gt === "tree" || gt === "special") && !Pt) return;
              if (_t === "commit") return null;
              if ((_t === "tree" || _t === "special") && !Pt) return;
              const Ot = ft === "blob" ? yield et.oid() : void 0, It = _t === "blob" ? yield ht.oid() : void 0;
              let $t;
              ft !== "blob" && gt === "blob" && _t !== "blob" ? $t = "42" : gt === "blob" && ($t = yield Q.oid());
              const kt = [void 0, Ot, $t, It], Ct = kt.map((St) => kt.indexOf(St));
              return Ct.shift(), [J, ...Ct];
            }), function(J, et) {
              return d.apply(this, arguments);
            }) });
          } catch (q) {
            throw q.caller = "git.statusMatrix", q;
          }
          var d;
        })).apply(this, arguments);
      }
      function $s(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function dl(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              $s(b, a, p, f, k, "next", d);
            }
            function k(d) {
              $s(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Cs(r) {
        return Ds.apply(this, arguments);
      }
      function Ds() {
        return (Ds = dl(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), ref: a, object: p, force: b = !1 }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("ref", a);
            const f = new R.a(r);
            if (a === void 0) throw new Te.a("ref");
            a = a.startsWith("refs/tags/") ? a : `refs/tags/${a}`;
            const k = yield vt.a.resolve({ fs: f, gitdir: y, ref: p || "HEAD" });
            if (!b && (yield vt.a.exists({ fs: f, gitdir: y, ref: a }))) throw new X.a("tag", a);
            yield vt.a.writeRef({ fs: f, gitdir: y, ref: a, value: k });
          } catch (f) {
            throw f.caller = "git.tag", f;
          }
        })).apply(this, arguments);
      }
      var Ms = t(60);
      function Ns(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function vr(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Ns(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Ns(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Fs(r) {
        return Us.apply(this, arguments);
      }
      function Us() {
        return (Us = vr(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), cache: a = {}, filepath: p, oid: b, mode: f, add: k, remove: d, force: q }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("filepath", p);
            const J = new R.a(r);
            if (d) return yield n.a.acquire({ fs: J, gitdir: y, cache: a }, function() {
              var Q = vr(function* (ht) {
                let ft;
                if (q || (ft = yield J.lstat(Object(P.join)(v, p)), !ft)) ht.has({ filepath: p }) && ht.delete({ filepath: p });
                else if (ft.isDirectory()) throw new Ms.a("directory");
              });
              return function(ht) {
                return Q.apply(this, arguments);
              };
            }());
            let et;
            if (!b) {
              if (et = yield J.lstat(Object(P.join)(v, p)), !et) throw new z.a(`file at "${p}" on disk and "remove" not set`);
              if (et.isDirectory()) throw new Ms.a("directory");
            }
            return yield n.a.acquire({ fs: J, gitdir: y, cache: a }, function() {
              var Q = vr(function* (ht) {
                if (!k && !ht.has({ filepath: p })) throw new z.a(`file at "${p}" in index and "add" not set`);
                let ft = { ctime: /* @__PURE__ */ new Date(0), mtime: /* @__PURE__ */ new Date(0), dev: 0, ino: 0, mode: f, uid: 0, gid: 0, size: 0 };
                if (!b) {
                  ft = et;
                  const gt = ft.isSymbolicLink() ? yield J.readlink(Object(P.join)(v, p)) : yield J.read(Object(P.join)(v, p));
                  b = yield Object(nt.a)({ fs: J, gitdir: y, type: "blob", format: "content", object: gt });
                }
                return ht.insert({ filepath: p, oid: b, stats: ft }), b;
              });
              return function(ht) {
                return Q.apply(this, arguments);
              };
            }());
          } catch (J) {
            throw J.caller = "git.updateIndex", J;
          }
        })).apply(this, arguments);
      }
      function zs() {
        try {
          return pr.a.version;
        } catch (r) {
          throw r.caller = "git.version", r;
        }
      }
      function Ls(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function pl(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Ls(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Ls(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function qs(r) {
        return Hs.apply(this, arguments);
      }
      function Hs() {
        return (Hs = pl(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), trees: a, map: p, reduce: b, iterate: f, cache: k = {} }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("trees", a), yield Object(S.a)({ fs: new R.a(r), cache: k, dir: v, gitdir: y, trees: a, map: p, reduce: b, iterate: f });
          } catch (d) {
            throw d.caller = "git.walk", d;
          }
        })).apply(this, arguments);
      }
      function Ws(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function gl(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Ws(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Ws(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Gs(r) {
        return Ys.apply(this, arguments);
      }
      function Ys() {
        return (Ys = gl(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), blob: a }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("blob", a), yield Object(nt.a)({ fs: new R.a(r), gitdir: y, type: "blob", object: a, format: "content" });
          } catch (p) {
            throw p.caller = "git.writeBlob", p;
          }
        })).apply(this, arguments);
      }
      function Vs(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function ml(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Vs(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Vs(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Zs(r) {
        return Ks.apply(this, arguments);
      }
      function Ks() {
        return (Ks = ml(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), commit: a }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("commit", a), yield es({ fs: new R.a(r), gitdir: y, commit: a });
          } catch (p) {
            throw p.caller = "git.writeCommit", p;
          }
        })).apply(this, arguments);
      }
      var Js = t(160);
      function Xs(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function yl(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              Xs(b, a, p, f, k, "next", d);
            }
            function k(d) {
              Xs(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function Qs(r) {
        return tu.apply(this, arguments);
      }
      function tu() {
        return (tu = yl(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), ref: a, value: p, force: b = !1, symbolic: f = !1 }) {
          try {
            Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("ref", a), Object(c.a)("value", p);
            const k = new R.a(r);
            if (a !== K.a.clean(a)) throw new rt.a(a, K.a.clean(a));
            if (!b && (yield vt.a.exists({ fs: k, gitdir: y, ref: a }))) throw new X.a("ref", a);
            f ? yield vt.a.writeSymbolicRef({ fs: k, gitdir: y, ref: a, value: p }) : (p = yield vt.a.resolve({ fs: k, gitdir: y, ref: p }), yield vt.a.writeRef({ fs: k, gitdir: y, ref: a, value: p }));
          } catch (k) {
            throw k.caller = "git.writeRef", k;
          }
        })).apply(this, arguments);
      }
      function eu(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function wl(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              eu(b, a, p, f, k, "next", d);
            }
            function k(d) {
              eu(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function vl(r) {
        return ru.apply(this, arguments);
      }
      function ru() {
        return (ru = wl(function* ({ fs: r, gitdir: v, tag: y }) {
          const a = Zt.a.from(y).toObject();
          return yield Object(nt.a)({ fs: r, gitdir: v, type: "tag", object: a, format: "content" });
        })).apply(this, arguments);
      }
      function nu(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function bl(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              nu(b, a, p, f, k, "next", d);
            }
            function k(d) {
              nu(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function iu(r) {
        return ou.apply(this, arguments);
      }
      function ou() {
        return (ou = bl(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), tag: a }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("tag", a), yield vl({ fs: new R.a(r), gitdir: y, tag: a });
          } catch (p) {
            throw p.caller = "git.writeTag", p;
          }
        })).apply(this, arguments);
      }
      function au(r, v, y, a, p, b, f) {
        try {
          var k = r[b](f), d = k.value;
        } catch (q) {
          return void y(q);
        }
        k.done ? v(d) : Promise.resolve(d).then(a, p);
      }
      function _l(r) {
        return function() {
          var v = this, y = arguments;
          return new Promise(function(a, p) {
            var b = r.apply(v, y);
            function f(d) {
              au(b, a, p, f, k, "next", d);
            }
            function k(d) {
              au(b, a, p, f, k, "throw", d);
            }
            f(void 0);
          });
        };
      }
      function su(r) {
        return uu.apply(this, arguments);
      }
      function uu() {
        return (uu = _l(function* ({ fs: r, dir: v, gitdir: y = Object(P.join)(v, ".git"), tree: a }) {
          try {
            return Object(c.a)("fs", r), Object(c.a)("gitdir", y), Object(c.a)("tree", a), yield Object(nr.a)({ fs: new R.a(r), gitdir: y, tree: a });
          } catch (p) {
            throw p.caller = "git.writeTree", p;
          }
        })).apply(this, arguments);
      }
      var cu = t(93);
      t.d(g, "Errors", function() {
        return cu;
      }), t.d(g, "STAGE", function() {
        return E;
      }), t.d(g, "TREE", function() {
        return m.a;
      }), t.d(g, "WORKDIR", function() {
        return h;
      }), t.d(g, "abortMerge", function() {
        return M;
      }), t.d(g, "add", function() {
        return lt;
      }), t.d(g, "addNote", function() {
        return C;
      }), t.d(g, "addRemote", function() {
        return Vt;
      }), t.d(g, "annotatedTag", function() {
        return B;
      }), t.d(g, "branch", function() {
        return Ut;
      }), t.d(g, "checkout", function() {
        return ur;
      }), t.d(g, "clone", function() {
        return rn;
      }), t.d(g, "commit", function() {
        return an;
      }), t.d(g, "getConfig", function() {
        return hi;
      }), t.d(g, "getConfigAll", function() {
        return yi;
      }), t.d(g, "setConfig", function() {
        return Xa;
      }), t.d(g, "currentBranch", function() {
        return cn;
      }), t.d(g, "deleteBranch", function() {
        return pn;
      }), t.d(g, "deleteRef", function() {
        return yn;
      }), t.d(g, "deleteRemote", function() {
        return jn;
      }), t.d(g, "deleteTag", function() {
        return Pn;
      }), t.d(g, "expandOid", function() {
        return Dn;
      }), t.d(g, "expandRef", function() {
        return Fn;
      }), t.d(g, "fastForward", function() {
        return Jn;
      }), t.d(g, "fetch", function() {
        return ti;
      }), t.d(g, "findMergeBase", function() {
        return ni;
      }), t.d(g, "findRoot", function() {
        return ci;
      }), t.d(g, "getRemoteInfo", function() {
        return bi;
      }), t.d(g, "getRemoteInfo2", function() {
        return xi;
      }), t.d(g, "hashBlob", function() {
        return Ei.a;
      }), t.d(g, "indexPack", function() {
        return Ri;
      }), t.d(g, "init", function() {
        return Ti;
      }), t.d(g, "isDescendent", function() {
        return Ui;
      }), t.d(g, "isIgnored", function() {
        return qi;
      }), t.d(g, "listBranches", function() {
        return Gi;
      }), t.d(g, "listFiles", function() {
        return Qi;
      }), t.d(g, "listNotes", function() {
        return io;
      }), t.d(g, "listRefs", function() {
        return so;
      }), t.d(g, "listRemotes", function() {
        return po;
      }), t.d(g, "listServerRefs", function() {
        return jo;
      }), t.d(g, "listTags", function() {
        return Oo;
      }), t.d(g, "log", function() {
        return Do;
      }), t.d(g, "merge", function() {
        return Fo;
      }), t.d(g, "packObjects", function() {
        return Lo;
      }), t.d(g, "pull", function() {
        return Wo;
      }), t.d(g, "push", function() {
        return Xo;
      }), t.d(g, "readBlob", function() {
        return sa;
      }), t.d(g, "readCommit", function() {
        return yr;
      }), t.d(g, "readNote", function() {
        return pa;
      }), t.d(g, "readObject", function() {
        return ya;
      }), t.d(g, "readTag", function() {
        return ja;
      }), t.d(g, "readTree", function() {
        return Oa;
      }), t.d(g, "remove", function() {
        return Aa;
      }), t.d(g, "removeNote", function() {
        return $a;
      }), t.d(g, "renameBranch", function() {
        return Fa;
      }), t.d(g, "resetIndex", function() {
        return Ga;
      }), t.d(g, "updateIndex", function() {
        return Fs;
      }), t.d(g, "resolveRef", function() {
        return Za;
      }), t.d(g, "status", function() {
        return Os;
      }), t.d(g, "statusMatrix", function() {
        return Is;
      }), t.d(g, "tag", function() {
        return Cs;
      }), t.d(g, "version", function() {
        return zs;
      }), t.d(g, "walk", function() {
        return qs;
      }), t.d(g, "writeBlob", function() {
        return Gs;
      }), t.d(g, "writeCommit", function() {
        return Zs;
      }), t.d(g, "writeObject", function() {
        return Js.a;
      }), t.d(g, "writeRef", function() {
        return Qs;
      }), t.d(g, "writeTag", function() {
        return iu;
      }), t.d(g, "writeTree", function() {
        return su;
      }), t.d(g, "stash", function() {
        return js;
      }), g.default = { Errors: cu, STAGE: E, TREE: m.a, WORKDIR: h, add: lt, abortMerge: M, addNote: C, addRemote: Vt, annotatedTag: B, branch: Ut, checkout: ur, clone: rn, commit: an, getConfig: hi, getConfigAll: yi, setConfig: Xa, currentBranch: cn, deleteBranch: pn, deleteRef: yn, deleteRemote: jn, deleteTag: Pn, expandOid: Dn, expandRef: Fn, fastForward: Jn, fetch: ti, findMergeBase: ni, findRoot: ci, getRemoteInfo: bi, getRemoteInfo2: xi, hashBlob: Ei.a, indexPack: Ri, init: Ti, isDescendent: Ui, isIgnored: qi, listBranches: Gi, listFiles: Qi, listNotes: io, listRefs: so, listRemotes: po, listServerRefs: jo, listTags: Oo, log: Do, merge: Fo, packObjects: Lo, pull: Wo, push: Xo, readBlob: sa, readCommit: yr, readNote: pa, readObject: ya, readTag: ja, readTree: Oa, remove: Aa, removeNote: $a, renameBranch: Fa, resetIndex: Ga, updateIndex: Fs, resolveRef: Za, status: Os, statusMatrix: Is, tag: Cs, version: zs, walk: qs, writeBlob: Gs, writeCommit: Zs, writeObject: Js.a, writeRef: Qs, writeTag: iu, writeTree: su, stash: js };
    }]);
  });
  (function(N, g) {
    typeof xe == "object" && typeof ze < "u" ? g(xe) : typeof define == "function" && define.amd ? define(["exports"], g) : g((N = N || self).GitHttp = {});
  })(void 0, function(N) {
    async function g(n) {
      const u = [];
      let O = 0;
      for await (const s of n)
        u.push(s), O += s.byteLength;
      const l = new Uint8Array(O);
      let i = 0;
      for (const s of u)
        l.set(s, i), i += s.byteLength;
      return l;
    }
    async function t({ onProgress: n, url: u, method: O = "GET", headers: l = {}, body: i }) {
      try {
        i && (i = await g(i));
        const s = {
          method: O,
          headers: {
            ...l,
            Connection: "keep-alive"
          },
          body: i
        }, o = await fetch(u, s);
        if (!o.ok)
          throw new Error(`HTTP error: ${o.status} ${o.statusText}`);
        const e = o.body?.getReader(), j = e ? {
          async *[Symbol.asyncIterator]() {
            let m = 0;
            for (; ; ) {
              const { done: _, value: h } = await e.read();
              if (_) break;
              m += h.byteLength, n && n(m), yield h;
            }
            e.releaseLock();
          }
        } : [new Uint8Array(await o.arrayBuffer())], E = {};
        for (const [m, _] of o.headers.entries())
          E[m] = _;
        return {
          url: o.url,
          method: o.method,
          statusCode: o.status,
          statusMessage: o.statusText,
          body: j,
          headers: E
        };
      } catch (s) {
        throw console.error("Request failed:", s), s;
      }
    }
    N.default = { request: t }, N.request = t, Object.defineProperty(N, "__esModule", { value: !0 });
  });
  const Al = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null
  }, Symbol.toStringTag, { value: "Module" }));
  (function(N, g) {
    typeof xe == "object" && typeof ze == "object" ? ze.exports = g() : typeof define == "function" && define.amd ? define([], g) : typeof xe == "object" ? xe.LightningFS = g() : N.LightningFS = g();
  })(self, function() {
    return function(N) {
      var g = {};
      function t(n) {
        if (g[n]) return g[n].exports;
        var u = g[n] = { i: n, l: !1, exports: {} };
        return N[n].call(u.exports, u, u.exports, t), u.l = !0, u.exports;
      }
      return t.m = N, t.c = g, t.d = function(n, u, O) {
        t.o(n, u) || Object.defineProperty(n, u, { enumerable: !0, get: O });
      }, t.r = function(n) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(n, "__esModule", { value: !0 });
      }, t.t = function(n, u) {
        if (1 & u && (n = t(n)), 8 & u || 4 & u && typeof n == "object" && n && n.__esModule) return n;
        var O = /* @__PURE__ */ Object.create(null);
        if (t.r(O), Object.defineProperty(O, "default", { enumerable: !0, value: n }), 2 & u && typeof n != "string") for (var l in n) t.d(O, l, function(i) {
          return n[i];
        }.bind(null, l));
        return O;
      }, t.n = function(n) {
        var u = n && n.__esModule ? function() {
          return n.default;
        } : function() {
          return n;
        };
        return t.d(u, "a", u), u;
      }, t.o = function(n, u) {
        return Object.prototype.hasOwnProperty.call(n, u);
      }, t.p = "", t(t.s = 3);
    }([function(N, g) {
      function t(l) {
        if (l.length === 0) return ".";
        let i = u(l);
        return i = i.reduce(O, []), n(...i);
      }
      function n(...l) {
        if (l.length === 0) return "";
        let i = l.join("/");
        return i = i.replace(/\/{2,}/g, "/");
      }
      function u(l) {
        if (l.length === 0) return [];
        if (l === "/") return ["/"];
        let i = l.split("/");
        return i[i.length - 1] === "" && i.pop(), l[0] === "/" ? i[0] = "/" : i[0] !== "." && i.unshift("."), i;
      }
      function O(l, i) {
        if (l.length === 0) return l.push(i), l;
        if (i === ".") return l;
        if (i === "..") {
          if (l.length === 1) {
            if (l[0] === "/") throw new Error("Unable to normalize path - traverses above root directory");
            if (l[0] === ".") return l.push(i), l;
          }
          return l[l.length - 1] === ".." ? (l.push(".."), l) : (l.pop(), l);
        }
        return l.push(i), l;
      }
      N.exports = { join: n, normalize: t, split: u, basename: function(l) {
        if (l === "/") throw new Error(`Cannot get basename of "${l}"`);
        const i = l.lastIndexOf("/");
        return i === -1 ? l : l.slice(i + 1);
      }, dirname: function(l) {
        const i = l.lastIndexOf("/");
        if (i === -1) throw new Error(`Cannot get dirname of "${l}"`);
        return i === 0 ? "/" : l.slice(0, i);
      }, resolve: function(...l) {
        let i = "";
        for (let s of l) i = s.startsWith("/") ? s : t(n(i, s));
        return i;
      } };
    }, function(N, g) {
      function t(s) {
        return class extends Error {
          constructor(...o) {
            super(...o), this.code = s, this.message ? this.message = s + ": " + this.message : this.message = s;
          }
        };
      }
      const n = t("EEXIST"), u = t("ENOENT"), O = t("ENOTDIR"), l = t("ENOTEMPTY"), i = t("ETIMEDOUT");
      N.exports = { EEXIST: n, ENOENT: u, ENOTDIR: O, ENOTEMPTY: l, ETIMEDOUT: i };
    }, function(N, g, t) {
      t.r(g), t.d(g, "Store", function() {
        return n;
      }), t.d(g, "get", function() {
        return l;
      }), t.d(g, "set", function() {
        return i;
      }), t.d(g, "update", function() {
        return s;
      }), t.d(g, "del", function() {
        return o;
      }), t.d(g, "clear", function() {
        return e;
      }), t.d(g, "keys", function() {
        return j;
      }), t.d(g, "close", function() {
        return E;
      });
      class n {
        constructor(_ = "keyval-store", h = "keyval") {
          this.storeName = h, this._dbName = _, this._storeName = h, this._init();
        }
        _init() {
          this._dbp || (this._dbp = new Promise((_, h) => {
            const S = indexedDB.open(this._dbName);
            S.onerror = () => h(S.error), S.onsuccess = () => _(S.result), S.onupgradeneeded = () => {
              S.result.createObjectStore(this._storeName);
            };
          }));
        }
        _withIDBStore(_, h) {
          return this._init(), this._dbp.then((S) => new Promise((x, R) => {
            const c = S.transaction(this.storeName, _);
            c.oncomplete = () => x(), c.onabort = c.onerror = () => R(c.error), h(c.objectStore(this.storeName));
          }));
        }
        _close() {
          return this._init(), this._dbp.then((_) => {
            _.close(), this._dbp = void 0;
          });
        }
      }
      let u;
      function O() {
        return u || (u = new n()), u;
      }
      function l(m, _ = O()) {
        let h;
        return _._withIDBStore("readwrite", (S) => {
          h = S.get(m);
        }).then(() => h.result);
      }
      function i(m, _, h = O()) {
        return h._withIDBStore("readwrite", (S) => {
          S.put(_, m);
        });
      }
      function s(m, _, h = O()) {
        return h._withIDBStore("readwrite", (S) => {
          const x = S.get(m);
          x.onsuccess = () => {
            S.put(_(x.result), m);
          };
        });
      }
      function o(m, _ = O()) {
        return _._withIDBStore("readwrite", (h) => {
          h.delete(m);
        });
      }
      function e(m = O()) {
        return m._withIDBStore("readwrite", (_) => {
          _.clear();
        });
      }
      function j(m = O()) {
        const _ = [];
        return m._withIDBStore("readwrite", (h) => {
          (h.openKeyCursor || h.openCursor).call(h).onsuccess = function() {
            this.result && (_.push(this.result.key), this.result.continue());
          };
        }).then(() => _);
      }
      function E(m = O()) {
        return m._close();
      }
    }, function(N, g, t) {
      const n = t(4), u = t(5);
      function O(l, i) {
        return typeof l == "function" && (i = l), [(...s) => i(null, ...s), i = n(i)];
      }
      N.exports = class {
        constructor(...l) {
          this.promises = new u(...l), this.init = this.init.bind(this), this.readFile = this.readFile.bind(this), this.writeFile = this.writeFile.bind(this), this.unlink = this.unlink.bind(this), this.readdir = this.readdir.bind(this), this.mkdir = this.mkdir.bind(this), this.rmdir = this.rmdir.bind(this), this.rename = this.rename.bind(this), this.stat = this.stat.bind(this), this.lstat = this.lstat.bind(this), this.readlink = this.readlink.bind(this), this.symlink = this.symlink.bind(this), this.backFile = this.backFile.bind(this), this.du = this.du.bind(this), this.flush = this.flush.bind(this);
        }
        init(l, i) {
          return this.promises.init(l, i);
        }
        readFile(l, i, s) {
          const [o, e] = O(i, s);
          this.promises.readFile(l, i).then(o).catch(e);
        }
        writeFile(l, i, s, o) {
          const [e, j] = O(s, o);
          this.promises.writeFile(l, i, s).then(e).catch(j);
        }
        unlink(l, i, s) {
          const [o, e] = O(i, s);
          this.promises.unlink(l, i).then(o).catch(e);
        }
        readdir(l, i, s) {
          const [o, e] = O(i, s);
          this.promises.readdir(l, i).then(o).catch(e);
        }
        mkdir(l, i, s) {
          const [o, e] = O(i, s);
          this.promises.mkdir(l, i).then(o).catch(e);
        }
        rmdir(l, i, s) {
          const [o, e] = O(i, s);
          this.promises.rmdir(l, i).then(o).catch(e);
        }
        rename(l, i, s) {
          const [o, e] = O(s);
          this.promises.rename(l, i).then(o).catch(e);
        }
        stat(l, i, s) {
          const [o, e] = O(i, s);
          this.promises.stat(l).then(o).catch(e);
        }
        lstat(l, i, s) {
          const [o, e] = O(i, s);
          this.promises.lstat(l).then(o).catch(e);
        }
        readlink(l, i, s) {
          const [o, e] = O(i, s);
          this.promises.readlink(l).then(o).catch(e);
        }
        symlink(l, i, s) {
          const [o, e] = O(s);
          this.promises.symlink(l, i).then(o).catch(e);
        }
        backFile(l, i, s) {
          const [o, e] = O(i, s);
          this.promises.backFile(l, i).then(o).catch(e);
        }
        du(l, i) {
          const [s, o] = O(i);
          this.promises.du(l).then(s).catch(o);
        }
        flush(l) {
          const [i, s] = O(l);
          this.promises.flush().then(i).catch(s);
        }
      };
    }, function(N, g) {
      N.exports = function(t) {
        var n, u;
        if (typeof t != "function") throw new Error("expected a function but got " + t);
        return function() {
          return n ? u : (n = !0, u = t.apply(this, arguments));
        };
      };
    }, function(N, g, t) {
      const n = t(6), u = t(16), O = t(0);
      function l(o, e, ...j) {
        return e !== void 0 && typeof e != "function" || (e = {}), typeof e == "string" && (e = { encoding: e }), [o = O.normalize(o), e, ...j];
      }
      function i(o, e, j, ...E) {
        return j !== void 0 && typeof j != "function" || (j = {}), typeof j == "string" && (j = { encoding: j }), [o = O.normalize(o), e, j, ...E];
      }
      function s(o, e, ...j) {
        return [O.normalize(o), O.normalize(e), ...j];
      }
      N.exports = class {
        constructor(o, e = {}) {
          this.init = this.init.bind(this), this.readFile = this._wrap(this.readFile, l, !1), this.writeFile = this._wrap(this.writeFile, i, !0), this.unlink = this._wrap(this.unlink, l, !0), this.readdir = this._wrap(this.readdir, l, !1), this.mkdir = this._wrap(this.mkdir, l, !0), this.rmdir = this._wrap(this.rmdir, l, !0), this.rename = this._wrap(this.rename, s, !0), this.stat = this._wrap(this.stat, l, !1), this.lstat = this._wrap(this.lstat, l, !1), this.readlink = this._wrap(this.readlink, l, !1), this.symlink = this._wrap(this.symlink, s, !0), this.backFile = this._wrap(this.backFile, l, !0), this.du = this._wrap(this.du, l, !1), this._deactivationPromise = null, this._deactivationTimeout = null, this._activationPromise = null, this._operations = /* @__PURE__ */ new Set(), o && this.init(o, e);
        }
        async init(...o) {
          return this._initPromiseResolve && await this._initPromise, this._initPromise = this._init(...o), this._initPromise;
        }
        async _init(o, e = {}) {
          await this._gracefulShutdown(), this._activationPromise && await this._deactivate(), this._backend && this._backend.destroy && await this._backend.destroy(), this._backend = e.backend || new n(), this._backend.init && await this._backend.init(o, e), this._initPromiseResolve && (this._initPromiseResolve(), this._initPromiseResolve = null), e.defer || this.stat("/");
        }
        async _gracefulShutdown() {
          this._operations.size > 0 && (this._isShuttingDown = !0, await new Promise((o) => this._gracefulShutdownResolve = o), this._isShuttingDown = !1, this._gracefulShutdownResolve = null);
        }
        _wrap(o, e, j) {
          return async (...E) => {
            E = e(...E);
            let m = { name: o.name, args: E };
            this._operations.add(m);
            try {
              return await this._activate(), await o.apply(this, E);
            } finally {
              this._operations.delete(m), j && this._backend.saveSuperblock(), this._operations.size === 0 && (this._deactivationTimeout || clearTimeout(this._deactivationTimeout), this._deactivationTimeout = setTimeout(this._deactivate.bind(this), 500));
            }
          };
        }
        async _activate() {
          this._initPromise || console.warn(new Error(`Attempted to use LightningFS ${this._name} before it was initialized.`)), await this._initPromise, this._deactivationTimeout && (clearTimeout(this._deactivationTimeout), this._deactivationTimeout = null), this._deactivationPromise && await this._deactivationPromise, this._deactivationPromise = null, this._activationPromise || (this._activationPromise = this._backend.activate ? this._backend.activate() : Promise.resolve()), await this._activationPromise;
        }
        async _deactivate() {
          return this._activationPromise && await this._activationPromise, this._deactivationPromise || (this._deactivationPromise = this._backend.deactivate ? this._backend.deactivate() : Promise.resolve()), this._activationPromise = null, this._gracefulShutdownResolve && this._gracefulShutdownResolve(), this._deactivationPromise;
        }
        async readFile(o, e) {
          return this._backend.readFile(o, e);
        }
        async writeFile(o, e, j) {
          return await this._backend.writeFile(o, e, j), null;
        }
        async unlink(o, e) {
          return await this._backend.unlink(o, e), null;
        }
        async readdir(o, e) {
          return this._backend.readdir(o, e);
        }
        async mkdir(o, e) {
          return await this._backend.mkdir(o, e), null;
        }
        async rmdir(o, e) {
          return await this._backend.rmdir(o, e), null;
        }
        async rename(o, e) {
          return await this._backend.rename(o, e), null;
        }
        async stat(o, e) {
          const j = await this._backend.stat(o, e);
          return new u(j);
        }
        async lstat(o, e) {
          const j = await this._backend.lstat(o, e);
          return new u(j);
        }
        async readlink(o, e) {
          return this._backend.readlink(o, e);
        }
        async symlink(o, e) {
          return await this._backend.symlink(o, e), null;
        }
        async backFile(o, e) {
          return await this._backend.backFile(o, e), null;
        }
        async du(o) {
          return this._backend.du(o);
        }
        async flush() {
          return this._backend.flush();
        }
      };
    }, function(N, g, t) {
      const { encode: n, decode: u } = t(7), O = t(10), l = t(11), { ENOENT: i, ENOTEMPTY: s, ETIMEDOUT: o } = t(1), e = t(12), j = t(13), E = t(14), m = t(15), _ = t(0);
      N.exports = class {
        constructor() {
          this.saveSuperblock = O(() => {
            this.flush();
          }, 500);
        }
        async init(h, { wipe: S, url: x, urlauto: R, fileDbName: c = h, db: P = null, fileStoreName: w = h + "_files", lockDbName: I = h + "_lock", lockStoreName: T = h + "_lock" } = {}) {
          this._name = h, this._idb = P || new e(c, w), this._mutex = navigator.locks ? new m(h) : new E(I, T), this._cache = new l(h), this._opts = { wipe: S, url: x }, this._needsWipe = !!S, x && (this._http = new j(x), this._urlauto = !!R);
        }
        async activate() {
          if (this._cache.activated) return;
          this._needsWipe && (this._needsWipe = !1, await this._idb.wipe(), await this._mutex.release({ force: !0 })), await this._mutex.has() || await this._mutex.wait();
          const h = await this._idb.loadSuperblock();
          if (h) this._cache.activate(h);
          else if (this._http) {
            const S = await this._http.loadSuperblock();
            this._cache.activate(S), await this._saveSuperblock();
          } else this._cache.activate();
          if (!await this._mutex.has()) throw new o();
        }
        async deactivate() {
          await this._mutex.has() && await this._saveSuperblock(), this._cache.deactivate();
          try {
            await this._mutex.release();
          } catch (h) {
            console.log(h);
          }
          await this._idb.close();
        }
        async _saveSuperblock() {
          this._cache.activated && (this._lastSavedAt = Date.now(), await this._idb.saveSuperblock(this._cache._root));
        }
        _writeStat(h, S, x) {
          let R = _.split(_.dirname(h)), c = R.shift();
          for (let P of R) {
            c = _.join(c, P);
            try {
              this._cache.mkdir(c, { mode: 511 });
            } catch {
            }
          }
          return this._cache.writeStat(h, S, x);
        }
        async readFile(h, S) {
          const { encoding: x } = S;
          if (x && x !== "utf8") throw new Error('Only "utf8" encoding is supported in readFile');
          let R = null, c = null;
          try {
            c = this._cache.stat(h), R = await this._idb.readFile(c.ino);
          } catch (P) {
            if (!this._urlauto) throw P;
          }
          if (!R && this._http) {
            let P = this._cache.lstat(h);
            for (; P.type === "symlink"; ) h = _.resolve(_.dirname(h), P.target), P = this._cache.lstat(h);
            R = await this._http.readFile(h);
          }
          if (R && (c && c.size == R.byteLength || (c = await this._writeStat(h, R.byteLength, { mode: c ? c.mode : 438 }), this.saveSuperblock()), x === "utf8" ? R = u(R) : R.toString = () => u(R)), !c) throw new i(h);
          return R;
        }
        async writeFile(h, S, x) {
          const { mode: R, encoding: c = "utf8" } = x;
          if (typeof S == "string") {
            if (c !== "utf8") throw new Error('Only "utf8" encoding is supported in writeFile');
            S = n(S);
          }
          const P = await this._cache.writeStat(h, S.byteLength, { mode: R });
          await this._idb.writeFile(P.ino, S);
        }
        async unlink(h, S) {
          const x = this._cache.lstat(h);
          this._cache.unlink(h), x.type !== "symlink" && await this._idb.unlink(x.ino);
        }
        readdir(h, S) {
          return this._cache.readdir(h);
        }
        mkdir(h, S) {
          const { mode: x = 511 } = S;
          this._cache.mkdir(h, { mode: x });
        }
        rmdir(h, S) {
          if (h === "/") throw new s();
          this._cache.rmdir(h);
        }
        rename(h, S) {
          this._cache.rename(h, S);
        }
        stat(h, S) {
          return this._cache.stat(h);
        }
        lstat(h, S) {
          return this._cache.lstat(h);
        }
        readlink(h, S) {
          return this._cache.readlink(h);
        }
        symlink(h, S) {
          this._cache.symlink(h, S);
        }
        async backFile(h, S) {
          let x = await this._http.sizeFile(h);
          await this._writeStat(h, x, S);
        }
        du(h) {
          return this._cache.du(h);
        }
        flush() {
          return this._saveSuperblock();
        }
      };
    }, function(N, g, t) {
      t(8), N.exports = { encode: (n) => new TextEncoder().encode(n), decode: (n) => new TextDecoder().decode(n) };
    }, function(N, g, t) {
      (function(n) {
        (function(u) {
          function O(i) {
            if ((i = i === void 0 ? "utf-8" : i) !== "utf-8") throw new RangeError("Failed to construct 'TextEncoder': The encoding label provided ('" + i + "') is invalid.");
          }
          function l(i, s) {
            if (s = s === void 0 ? { fatal: !1 } : s, (i = i === void 0 ? "utf-8" : i) !== "utf-8") throw new RangeError("Failed to construct 'TextDecoder': The encoding label provided ('" + i + "') is invalid.");
            if (s.fatal) throw Error("Failed to construct 'TextDecoder': the 'fatal' option is unsupported.");
          }
          if (u.TextEncoder && u.TextDecoder) return !1;
          Object.defineProperty(O.prototype, "encoding", { value: "utf-8" }), O.prototype.encode = function(i, s) {
            if ((s = s === void 0 ? { stream: !1 } : s).stream) throw Error("Failed to encode: the 'stream' option is unsupported.");
            s = 0;
            for (var o = i.length, e = 0, j = Math.max(32, o + (o >> 1) + 7), E = new Uint8Array(j >> 3 << 3); s < o; ) {
              var m = i.charCodeAt(s++);
              if (55296 <= m && 56319 >= m) {
                if (s < o) {
                  var _ = i.charCodeAt(s);
                  (64512 & _) == 56320 && (++s, m = ((1023 & m) << 10) + (1023 & _) + 65536);
                }
                if (55296 <= m && 56319 >= m) continue;
              }
              if (e + 4 > E.length && (j += 8, j = (j *= 1 + s / i.length * 2) >> 3 << 3, (_ = new Uint8Array(j)).set(E), E = _), (4294967168 & m) == 0) E[e++] = m;
              else {
                if ((4294965248 & m) == 0) E[e++] = m >> 6 & 31 | 192;
                else if ((4294901760 & m) == 0) E[e++] = m >> 12 & 15 | 224, E[e++] = m >> 6 & 63 | 128;
                else {
                  if ((4292870144 & m) != 0) continue;
                  E[e++] = m >> 18 & 7 | 240, E[e++] = m >> 12 & 63 | 128, E[e++] = m >> 6 & 63 | 128;
                }
                E[e++] = 63 & m | 128;
              }
            }
            return E.slice(0, e);
          }, Object.defineProperty(l.prototype, "encoding", { value: "utf-8" }), Object.defineProperty(l.prototype, "fatal", { value: !1 }), Object.defineProperty(l.prototype, "ignoreBOM", { value: !1 }), l.prototype.decode = function(i, s) {
            if ((s = s === void 0 ? { stream: !1 } : s).stream) throw Error("Failed to decode: the 'stream' option is unsupported.");
            s = 0;
            for (var o = (i = new Uint8Array(i)).length, e = []; s < o; ) {
              var j = i[s++];
              if (j === 0) break;
              if ((128 & j) == 0) e.push(j);
              else if ((224 & j) == 192) {
                var E = 63 & i[s++];
                e.push((31 & j) << 6 | E);
              } else if ((240 & j) == 224) {
                E = 63 & i[s++];
                var m = 63 & i[s++];
                e.push((31 & j) << 12 | E << 6 | m);
              } else (248 & j) == 240 && (65535 < (j = (7 & j) << 18 | (E = 63 & i[s++]) << 12 | (m = 63 & i[s++]) << 6 | 63 & i[s++]) && (j -= 65536, e.push(j >>> 10 & 1023 | 55296), j = 56320 | 1023 & j), e.push(j));
            }
            return String.fromCharCode.apply(null, e);
          }, u.TextEncoder = O, u.TextDecoder = l;
        })(typeof window < "u" ? window : n !== void 0 ? n : this);
      }).call(this, t(9));
    }, function(N, g) {
      var t;
      t = /* @__PURE__ */ function() {
        return this;
      }();
      try {
        t = t || new Function("return this")();
      } catch {
        typeof window == "object" && (t = window);
      }
      N.exports = t;
    }, function(N, g) {
      N.exports = function(t, n, u) {
        var O;
        return function() {
          if (!n) return t.apply(this, arguments);
          var l = this, i = arguments, s = u && !O;
          return clearTimeout(O), O = setTimeout(function() {
            if (O = null, !s) return t.apply(l, i);
          }, n), s ? t.apply(this, arguments) : void 0;
        };
      };
    }, function(N, g, t) {
      const n = t(0), { EEXIST: u, ENOENT: O, ENOTDIR: l, ENOTEMPTY: i } = t(1), s = 0;
      N.exports = class {
        constructor() {
        }
        _makeRoot(o = /* @__PURE__ */ new Map()) {
          return o.set(s, { mode: 511, type: "dir", size: 0, ino: 0, mtimeMs: Date.now() }), o;
        }
        activate(o = null) {
          this._root = o === null ? /* @__PURE__ */ new Map([["/", this._makeRoot()]]) : typeof o == "string" ? /* @__PURE__ */ new Map([["/", this._makeRoot(this.parse(o))]]) : o;
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
        _countInodes(o) {
          let e = 1;
          for (let [j, E] of o) j !== s && (e += this._countInodes(E));
          return e;
        }
        autoinc() {
          return this._maxInode(this._root.get("/")) + 1;
        }
        _maxInode(o) {
          let e = o.get(s).ino;
          for (let [j, E] of o) j !== s && (e = Math.max(e, this._maxInode(E)));
          return e;
        }
        print(o = this._root.get("/")) {
          let e = "";
          const j = (E, m) => {
            for (let [_, h] of E) {
              if (_ === 0) continue;
              let S = h.get(s), x = S.mode.toString(8);
              e += `${"	".repeat(m)}${_}	${x}`, S.type === "file" ? e += `	${S.size}	${S.mtimeMs}
` : (e += `
`, j(h, m + 1));
            }
          };
          return j(o, 0), e;
        }
        parse(o) {
          let e = 0;
          function j(h) {
            const S = ++e, x = h.length === 1 ? "dir" : "file";
            let [R, c, P] = h;
            return R = parseInt(R, 8), c = c ? parseInt(c) : 0, P = P ? parseInt(P) : Date.now(), /* @__PURE__ */ new Map([[s, { mode: R, type: x, size: c, mtimeMs: P, ino: S }]]);
          }
          let E = o.trim().split(`
`), m = this._makeRoot(), _ = [{ indent: -1, node: m }, { indent: 0, node: null }];
          for (let h of E) {
            let S = h.match(/^\t*/)[0].length;
            h = h.slice(S);
            let [x, ...R] = h.split("	"), c = j(R);
            if (S <= _[_.length - 1].indent) for (; S <= _[_.length - 1].indent; ) _.pop();
            _.push({ indent: S, node: c }), _[_.length - 2].node.set(x, c);
          }
          return m;
        }
        _lookup(o, e = !0) {
          let j = this._root, E = "/", m = n.split(o);
          for (let _ = 0; _ < m.length; ++_) {
            let h = m[_];
            if (!(j = j.get(h))) throw new O(o);
            if (e || _ < m.length - 1) {
              const S = j.get(s);
              if (S.type === "symlink") {
                let x = n.resolve(E, S.target);
                j = this._lookup(x);
              }
              E = E ? n.join(E, h) : h;
            }
          }
          return j;
        }
        mkdir(o, { mode: e }) {
          if (o === "/") throw new u();
          let j = this._lookup(n.dirname(o)), E = n.basename(o);
          if (j.has(E)) throw new u();
          let m = /* @__PURE__ */ new Map(), _ = { mode: e, type: "dir", size: 0, mtimeMs: Date.now(), ino: this.autoinc() };
          m.set(s, _), j.set(E, m);
        }
        rmdir(o) {
          let e = this._lookup(o);
          if (e.get(s).type !== "dir") throw new l();
          if (e.size > 1) throw new i();
          let j = this._lookup(n.dirname(o)), E = n.basename(o);
          j.delete(E);
        }
        readdir(o) {
          let e = this._lookup(o);
          if (e.get(s).type !== "dir") throw new l();
          return [...e.keys()].filter((j) => typeof j == "string");
        }
        writeStat(o, e, { mode: j }) {
          let E;
          try {
            let x = this.stat(o);
            j == null && (j = x.mode), E = x.ino;
          } catch {
          }
          j == null && (j = 438), E == null && (E = this.autoinc());
          let m = this._lookup(n.dirname(o)), _ = n.basename(o), h = { mode: j, type: "file", size: e, mtimeMs: Date.now(), ino: E }, S = /* @__PURE__ */ new Map();
          return S.set(s, h), m.set(_, S), h;
        }
        unlink(o) {
          let e = this._lookup(n.dirname(o)), j = n.basename(o);
          e.delete(j);
        }
        rename(o, e) {
          let j = n.basename(e), E = this._lookup(o);
          this._lookup(n.dirname(e)).set(j, E), this.unlink(o);
        }
        stat(o) {
          return this._lookup(o).get(s);
        }
        lstat(o) {
          return this._lookup(o, !1).get(s);
        }
        readlink(o) {
          return this._lookup(o, !1).get(s).target;
        }
        symlink(o, e) {
          let j, E;
          try {
            let x = this.stat(e);
            E === null && (E = x.mode), j = x.ino;
          } catch {
          }
          E == null && (E = 40960), j == null && (j = this.autoinc());
          let m = this._lookup(n.dirname(e)), _ = n.basename(e), h = { mode: E, type: "symlink", target: o, size: 0, mtimeMs: Date.now(), ino: j }, S = /* @__PURE__ */ new Map();
          return S.set(s, h), m.set(_, S), h;
        }
        _du(o) {
          let e = 0;
          for (const [j, E] of o.entries()) e += j === s ? E.size : this._du(E);
          return e;
        }
        du(o) {
          let e = this._lookup(o);
          return this._du(e);
        }
      };
    }, function(N, g, t) {
      const n = t(2);
      N.exports = class {
        constructor(u, O) {
          this._database = u, this._storename = O, this._store = new n.Store(this._database, this._storename);
        }
        saveSuperblock(u) {
          return n.set("!root", u, this._store);
        }
        loadSuperblock() {
          return n.get("!root", this._store);
        }
        readFile(u) {
          return n.get(u, this._store);
        }
        writeFile(u, O) {
          return n.set(u, O, this._store);
        }
        unlink(u) {
          return n.del(u, this._store);
        }
        wipe() {
          return n.clear(this._store);
        }
        close() {
          return n.close(this._store);
        }
      };
    }, function(N, g) {
      N.exports = class {
        constructor(t) {
          this._url = t;
        }
        loadSuperblock() {
          return fetch(this._url + "/.superblock.txt").then((t) => t.ok ? t.text() : null);
        }
        async readFile(t) {
          const n = await fetch(this._url + t);
          if (n.status === 200) return n.arrayBuffer();
          throw new Error("ENOENT");
        }
        async sizeFile(t) {
          const n = await fetch(this._url + t, { method: "HEAD" });
          if (n.status === 200) return n.headers.get("content-length");
          throw new Error("ENOENT");
        }
      };
    }, function(N, g, t) {
      const n = t(2), u = (O) => new Promise((l) => setTimeout(l, O));
      N.exports = class {
        constructor(O, l) {
          this._id = Math.random(), this._database = O, this._storename = l, this._store = new n.Store(this._database, this._storename), this._lock = null;
        }
        async has({ margin: O = 2e3 } = {}) {
          if (this._lock && this._lock.holder === this._id) {
            const l = Date.now();
            return this._lock.expires > l + O || await this.renew();
          }
          return !1;
        }
        async renew({ ttl: O = 5e3 } = {}) {
          let l;
          return await n.update("lock", (i) => {
            const s = Date.now() + O;
            return l = i && i.holder === this._id, this._lock = l ? { holder: this._id, expires: s } : i, this._lock;
          }, this._store), l;
        }
        async acquire({ ttl: O = 5e3 } = {}) {
          let l, i, s;
          if (await n.update("lock", (o) => {
            const e = Date.now(), j = e + O;
            return i = o && o.expires < e, l = o === void 0 || i, s = o && o.holder === this._id, this._lock = l ? { holder: this._id, expires: j } : o, this._lock;
          }, this._store), s) throw new Error("Mutex double-locked");
          return l;
        }
        async wait({ interval: O = 100, limit: l = 6e3, ttl: i } = {}) {
          for (; l--; ) {
            if (await this.acquire({ ttl: i })) return !0;
            await u(O);
          }
          throw new Error("Mutex timeout");
        }
        async release({ force: O = !1 } = {}) {
          let l, i, s;
          if (await n.update("lock", (o) => (l = O || o && o.holder === this._id, i = o === void 0, s = o && o.holder !== this._id, this._lock = l ? void 0 : o, this._lock), this._store), await n.close(this._store), !l && !O) {
            if (i) throw new Error("Mutex double-freed");
            if (s) throw new Error("Mutex lost ownership");
          }
          return l;
        }
      };
    }, function(N, g) {
      N.exports = class {
        constructor(t) {
          this._id = Math.random(), this._database = t, this._has = !1, this._release = null;
        }
        async has() {
          return this._has;
        }
        async acquire() {
          return new Promise((t) => {
            navigator.locks.request(this._database + "_lock", { ifAvailable: !0 }, (n) => (this._has = !!n, t(!!n), new Promise((u) => {
              this._release = u;
            })));
          });
        }
        async wait({ timeout: t = 6e5 } = {}) {
          return new Promise((n, u) => {
            const O = new AbortController();
            setTimeout(() => {
              O.abort(), u(new Error("Mutex timeout"));
            }, t), navigator.locks.request(this._database + "_lock", { signal: O.signal }, (l) => (this._has = !!l, n(!!l), new Promise((i) => {
              this._release = i;
            })));
          });
        }
        async release({ force: t = !1 } = {}) {
          this._has = !1, this._release ? this._release() : t && navigator.locks.request(this._database + "_lock", { steal: !0 }, (n) => !0);
        }
      };
    }, function(N, g) {
      N.exports = class {
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
  const Rl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null
  }, Symbol.toStringTag, { value: "Module" })), Bl = new Ur(zr.logging.memoryBackendAMD);
  function fu(...N) {
    Bl.consoleDotError("[ SWUtils ]", ...N);
  }
  class Il {
    constructor() {
    }
    async fetchWithServiceWorker(g, t) {
      try {
        const n = await fetch("/git", {
          method: "POST",
          body: JSON.stringify({ operation: g, args: t }),
          headers: { "Content-Type": "application/json" }
        });
        let u;
        try {
          u = await n.json();
        } catch (O) {
          throw fu("Error parsing JSON response:", O), new Error("Response is not valid JSON");
        }
        if (!n.ok) {
          let O = `Fetch failed with status: ${n.status}`;
          switch (n.status) {
            case 400:
              O = "Bad Request: The server could not understand the request.";
              break;
            case 401:
              O = "Unauthorized: Authentication is required or has failed.";
              break;
            case 403:
              O = "Forbidden: You do not have permission to access this resource.";
              break;
            case 404:
              O = "Not Found: The requested resource could not be found.";
              break;
            case 500:
              O = "Internal Server Error: The server encountered an error.";
              break;
            case 502:
              O = "Bad Gateway: The server received an invalid response from the upstream server.";
              break;
            case 503:
              O = "Service Unavailable: The server is currently unable to handle the request.";
              break;
            case 504:
              O = "Gateway Timeout: The server did not receive a timely response from the upstream server.";
              break;
            default:
              O = `Unexpected status code: ${n.status}`;
          }
          throw new Error(JSON.stringify(u.details));
        }
      } catch (n) {
        throw fu("Fetch error:", n), n;
      }
    }
    async sendMessageToChannel(g, t = "worker-channel") {
      return new Promise((n) => {
        const u = new BroadcastChannel(t);
        u.onmessage = (O) => {
          O.data.operation === `${g.operation}` && (u.close(), n(O.data));
        }, u.postMessage(g);
      });
    }
  }
  const Au = new Ur(zr.logging.memoryBackendES6);
  function te(...N) {
    Au.consoleDotLog("[MemoryBackend ES6]", ...N);
  }
  function Qe(...N) {
    Au.consoleDotError("[MemoryBackend ES6]", ...N);
  }
  function Tl() {
    return "tab-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }
  te("Loading memoryBackend module");
  class $l {
    constructor(g = {}, t = "default") {
      this.dbName = t, this.options = g, this.deviceId = g.deviceId || Tl(), this._files = /* @__PURE__ */ new Map(), this.versionVector = { [this.deviceId]: 0 }, this.swUtilsInstance = new Il(), this.channel = null, this.isProcessing = !1, this.pendingUpdates = [], this.processingQueue = !1, this._initializeRoot(), this.options?.supportsServiceWorker && this.options?.useSW && this._setupReceiveChannel(), Promise.resolve().then(() => this._requestInitialSync()), te(`Initialized with dbName: ${this.dbName}, deviceId: ${this.deviceId}`);
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
    _isNewerVersionVector(g) {
      let t = !1;
      for (const n in g) {
        const u = this.versionVector[n] || 0;
        g[n] > u && (t = !0);
      }
      return t;
    }
    _mergeVersionVector(g) {
      for (const t in g)
        (!this.versionVector[t] || g[t] > this.versionVector[t]) && (this.versionVector[t] = g[t]);
    }
    _requestInitialSync() {
      try {
        const g = new BroadcastChannel(`memory-backend-${this.dbName}`);
        g.postMessage({
          operation: "memorySyncRequest",
          data: {
            dbName: this.dbName,
            requesterVV: this.versionVector,
            requesterId: this.deviceId
          }
        }), g.close(), te("Initial sync request sent");
      } catch (g) {
        Qe("Failed to send initial sync request:", g);
      }
    }
    async sendFilesToSW(g = null) {
      const t = {
        operation: "memorySync",
        data: {
          files: Array.from(this._files.entries()),
          dbName: this.dbName,
          versionVector: { ...this.versionVector },
          sender: this.deviceId,
          targetId: g
        }
      };
      if (this.isProcessing) {
        te("Queueing update due to ongoing processing"), this.pendingUpdates.push(t);
        return;
      }
      try {
        this.isProcessing = !0, te("Sending files to SW:", t);
        const n = new BroadcastChannel(`memory-backend-${this.dbName}`);
        n.postMessage(t), n.close(), te("Files sent to SW successfully"), await this._processPendingUpdates();
      } catch (n) {
        Qe("Failed to send files to SW:", n);
      } finally {
        this.isProcessing = !1;
      }
    }
    async _processPendingUpdates() {
      if (!(this.processingQueue || this.pendingUpdates.length === 0)) {
        this.processingQueue = !0;
        try {
          for (; this.pendingUpdates.length > 0; ) {
            const g = this.pendingUpdates.shift();
            te("Processing queued update:", g);
            const t = new BroadcastChannel(`memory-backend-${this.dbName}`);
            t.postMessage(g), t.close();
          }
        } catch (g) {
          Qe("Error processing queued updates:", g);
        } finally {
          this.processingQueue = !1;
        }
      }
    }
    _setupReceiveChannel() {
      try {
        const g = new BroadcastChannel(`memory-backend-${this.dbName}`);
        te("Listening for updates on:", g.name), this.channel = g, this.channel.onmessage = async (t) => {
          Promise.resolve().then(() => this._handleChannelMessage(t));
        }, this._requestInitialSync();
      } catch (g) {
        Qe("BroadcastChannel init failed:", g);
      }
    }
    async _handleChannelMessage(g) {
      const { operation: t, data: n } = g.data || {};
      if (!n?.dbName || n.dbName !== this.dbName) return;
      if (t === "memorySyncRequest") {
        this._isNewerVersionVector(n.requesterVV) ? (te("Responding to sync request with newer data"), Promise.resolve().then(() => this.sendFilesToSW(n.requesterId))) : te("No newer data to send to requester");
        return;
      }
      if (t !== "memorySync") return;
      const u = n.versionVector;
      if (n.sender === this.deviceId) {
        te("Skipping own update");
        return;
      }
      if (n.targetId && n.targetId !== this.deviceId) {
        te("Message not meant for this tab. Ignoring.");
        return;
      }
      if (!this._isNewerVersionVector(u)) {
        te("Skipping received update - not newer than current", this.versionVector, u);
        return;
      }
      try {
        te("Applying update from channel:", n), this._files = new Map(n.files), this._mergeVersionVector(u), te("Memory updated from channel successfully");
      } catch (l) {
        Qe("Failed to apply channel message:", l);
      }
    }
    async wipe() {
      te(`Wiping db: ${this.dbName}`), this._files.clear(), this._initializeRoot(), this.versionVector = { [this.deviceId]: 0 }, await this._handleFilesChange();
    }
    async _handleFilesChange() {
      this._incrementVersionVector(), this.options?.supportsServiceWorker && this.options?.useSW && await this.sendFilesToSW();
    }
    async readFile(g, t = {}) {
      if (te("this.files", this._files), !this._files.has(g))
        throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
      const n = this._files.get(g);
      if (n.type !== "file")
        throw Object.assign(new Error("EISDIR"), { code: "EISDIR" });
      return t.encoding === "utf8" ? new TextDecoder().decode(n.data) : n.data;
    }
    async writeFile(g, t, n = {}) {
      const u = typeof t == "string" ? new TextEncoder().encode(t) : t || new Uint8Array();
      this._files.set(g, {
        type: "file",
        mode: n.mode || 438,
        data: u,
        size: u.length,
        ino: g,
        mtimeMs: Date.now(),
        ctimeMs: Date.now()
      }), await this._handleFilesChange();
    }
    async unlink(g) {
      if (!this._files.has(g))
        throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
      this._files.delete(g), await this._handleFilesChange();
    }
    async readdir(g) {
      if (!this._files.has(g))
        throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
      if (this._files.get(g).type !== "dir")
        throw Object.assign(new Error("ENOTDIR"), { code: "ENOTDIR" });
      const n = /* @__PURE__ */ new Set(), u = g === "/" ? "/" : `${g}/`;
      for (const O of this._files.keys())
        if (O.startsWith(u) && O !== g) {
          const l = O.slice(u.length).split("/")[0];
          n.add(l);
        }
      return [...n];
    }
    async stat(g) {
      if (!this._files.has(g))
        throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
      return this._files.get(g);
    }
    async lstat(g) {
      return this.stat(g);
    }
    async mkdir(g) {
      const t = this._getParentDir(g);
      if (t !== "/" && !this._files.has(t))
        throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
      this._files.set(g, {
        type: "dir",
        mode: 511,
        size: 0,
        ino: g,
        mtimeMs: Date.now(),
        ctimeMs: Date.now()
      }), await this._handleFilesChange();
    }
    async rmdir(g) {
      const t = g === "/" ? "/" : g.replace(/\/+$/, "");
      if (!this._files.has(t))
        throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
      if (this._files.get(t).type !== "dir")
        throw Object.assign(new Error("ENOTDIR"), { code: "ENOTDIR" });
      for (const u of this._files.keys())
        if (u.startsWith(`${t}/`))
          throw Object.assign(new Error("ENOTEMPTY"), { code: "ENOTEMPTY" });
      this._files.delete(t), await this._handleFilesChange();
    }
    _getParentDir(g) {
      const t = g.lastIndexOf("/");
      return t <= 0 ? "/" : g.slice(0, t);
    }
    _getBaseName(g) {
      return g.slice(g.lastIndexOf("/") + 1);
    }
    async saveSuperblock() {
    }
    async loadSuperblock() {
    }
  }
  function Cl(N) {
    return N && N.__esModule && Object.prototype.hasOwnProperty.call(N, "default") ? N.default : N;
  }
  function Dl(N) {
    if (Object.prototype.hasOwnProperty.call(N, "__esModule")) return N;
    var g = N.default;
    if (typeof g == "function") {
      var t = function n() {
        return this instanceof n ? Reflect.construct(g, arguments, this.constructor) : g.apply(this, arguments);
      };
      t.prototype = g.prototype;
    } else t = {};
    return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(N).forEach(function(n) {
      var u = Object.getOwnPropertyDescriptor(N, n);
      Object.defineProperty(t, n, u.get ? u : {
        enumerable: !0,
        get: function() {
          return N[n];
        }
      });
    }), t;
  }
  var jr, lu;
  function Ml() {
    if (lu) return jr;
    lu = 1, jr = N;
    function N(g) {
      var t, n;
      if (typeof g != "function")
        throw new Error("expected a function but got " + g);
      return function() {
        return t || (t = !0, n = g.apply(this, arguments)), n;
      };
    }
    return jr;
  }
  var Ru = {}, sr = {};
  sr.byteLength = Ul;
  sr.toByteArray = Ll;
  sr.fromByteArray = Wl;
  var ve = [], he = [], Nl = typeof Uint8Array < "u" ? Uint8Array : Array, kr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var Fe = 0, Fl = kr.length; Fe < Fl; ++Fe)
    ve[Fe] = kr[Fe], he[kr.charCodeAt(Fe)] = Fe;
  he[45] = 62;
  he[95] = 63;
  function Bu(N) {
    var g = N.length;
    if (g % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var t = N.indexOf("=");
    t === -1 && (t = g);
    var n = t === g ? 0 : 4 - t % 4;
    return [t, n];
  }
  function Ul(N) {
    var g = Bu(N), t = g[0], n = g[1];
    return (t + n) * 3 / 4 - n;
  }
  function zl(N, g, t) {
    return (g + t) * 3 / 4 - t;
  }
  function Ll(N) {
    var g, t = Bu(N), n = t[0], u = t[1], O = new Nl(zl(N, n, u)), l = 0, i = u > 0 ? n - 4 : n, s;
    for (s = 0; s < i; s += 4)
      g = he[N.charCodeAt(s)] << 18 | he[N.charCodeAt(s + 1)] << 12 | he[N.charCodeAt(s + 2)] << 6 | he[N.charCodeAt(s + 3)], O[l++] = g >> 16 & 255, O[l++] = g >> 8 & 255, O[l++] = g & 255;
    return u === 2 && (g = he[N.charCodeAt(s)] << 2 | he[N.charCodeAt(s + 1)] >> 4, O[l++] = g & 255), u === 1 && (g = he[N.charCodeAt(s)] << 10 | he[N.charCodeAt(s + 1)] << 4 | he[N.charCodeAt(s + 2)] >> 2, O[l++] = g >> 8 & 255, O[l++] = g & 255), O;
  }
  function ql(N) {
    return ve[N >> 18 & 63] + ve[N >> 12 & 63] + ve[N >> 6 & 63] + ve[N & 63];
  }
  function Hl(N, g, t) {
    for (var n, u = [], O = g; O < t; O += 3)
      n = (N[O] << 16 & 16711680) + (N[O + 1] << 8 & 65280) + (N[O + 2] & 255), u.push(ql(n));
    return u.join("");
  }
  function Wl(N) {
    for (var g, t = N.length, n = t % 3, u = [], O = 16383, l = 0, i = t - n; l < i; l += O)
      u.push(Hl(N, l, l + O > i ? i : l + O));
    return n === 1 ? (g = N[t - 1], u.push(
      ve[g >> 2] + ve[g << 4 & 63] + "=="
    )) : n === 2 && (g = (N[t - 2] << 8) + N[t - 1], u.push(
      ve[g >> 10] + ve[g >> 4 & 63] + ve[g << 2 & 63] + "="
    )), u.join("");
  }
  var Lr = {};
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
  Lr.read = function(N, g, t, n, u) {
    var O, l, i = u * 8 - n - 1, s = (1 << i) - 1, o = s >> 1, e = -7, j = t ? u - 1 : 0, E = t ? -1 : 1, m = N[g + j];
    for (j += E, O = m & (1 << -e) - 1, m >>= -e, e += i; e > 0; O = O * 256 + N[g + j], j += E, e -= 8)
      ;
    for (l = O & (1 << -e) - 1, O >>= -e, e += n; e > 0; l = l * 256 + N[g + j], j += E, e -= 8)
      ;
    if (O === 0)
      O = 1 - o;
    else {
      if (O === s)
        return l ? NaN : (m ? -1 : 1) * (1 / 0);
      l = l + Math.pow(2, n), O = O - o;
    }
    return (m ? -1 : 1) * l * Math.pow(2, O - n);
  };
  Lr.write = function(N, g, t, n, u, O) {
    var l, i, s, o = O * 8 - u - 1, e = (1 << o) - 1, j = e >> 1, E = u === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, m = n ? 0 : O - 1, _ = n ? 1 : -1, h = g < 0 || g === 0 && 1 / g < 0 ? 1 : 0;
    for (g = Math.abs(g), isNaN(g) || g === 1 / 0 ? (i = isNaN(g) ? 1 : 0, l = e) : (l = Math.floor(Math.log(g) / Math.LN2), g * (s = Math.pow(2, -l)) < 1 && (l--, s *= 2), l + j >= 1 ? g += E / s : g += E * Math.pow(2, 1 - j), g * s >= 2 && (l++, s /= 2), l + j >= e ? (i = 0, l = e) : l + j >= 1 ? (i = (g * s - 1) * Math.pow(2, u), l = l + j) : (i = g * Math.pow(2, j - 1) * Math.pow(2, u), l = 0)); u >= 8; N[t + m] = i & 255, m += _, i /= 256, u -= 8)
      ;
    for (l = l << u | i, o += u; o > 0; N[t + m] = l & 255, m += _, l /= 256, o -= 8)
      ;
    N[t + m - _] |= h * 128;
  };
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  (function(N) {
    const g = sr, t = Lr, n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    N.Buffer = e, N.SlowBuffer = w, N.INSPECT_MAX_BYTES = 50;
    const u = 2147483647;
    N.kMaxLength = u;
    const { Uint8Array: O, ArrayBuffer: l, SharedArrayBuffer: i } = globalThis;
    e.TYPED_ARRAY_SUPPORT = s(), !e.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
    function s() {
      try {
        const W = new O(1), B = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(B, O.prototype), Object.setPrototypeOf(W, B), W.foo() === 42;
      } catch {
        return !1;
      }
    }
    Object.defineProperty(e.prototype, "parent", {
      enumerable: !0,
      get: function() {
        if (e.isBuffer(this))
          return this.buffer;
      }
    }), Object.defineProperty(e.prototype, "offset", {
      enumerable: !0,
      get: function() {
        if (e.isBuffer(this))
          return this.byteOffset;
      }
    });
    function o(W) {
      if (W > u)
        throw new RangeError('The value "' + W + '" is invalid for option "size"');
      const B = new O(W);
      return Object.setPrototypeOf(B, e.prototype), B;
    }
    function e(W, B, D) {
      if (typeof W == "number") {
        if (typeof B == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return _(W);
      }
      return j(W, B, D);
    }
    e.poolSize = 8192;
    function j(W, B, D) {
      if (typeof W == "string")
        return h(W, B);
      if (l.isView(W))
        return x(W);
      if (W == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof W
        );
      if (qt(W, l) || W && qt(W.buffer, l) || typeof i < "u" && (qt(W, i) || W && qt(W.buffer, i)))
        return R(W, B, D);
      if (typeof W == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      const Y = W.valueOf && W.valueOf();
      if (Y != null && Y !== W)
        return e.from(Y, B, D);
      const tt = c(W);
      if (tt) return tt;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof W[Symbol.toPrimitive] == "function")
        return e.from(W[Symbol.toPrimitive]("string"), B, D);
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof W
      );
    }
    e.from = function(W, B, D) {
      return j(W, B, D);
    }, Object.setPrototypeOf(e.prototype, O.prototype), Object.setPrototypeOf(e, O);
    function E(W) {
      if (typeof W != "number")
        throw new TypeError('"size" argument must be of type number');
      if (W < 0)
        throw new RangeError('The value "' + W + '" is invalid for option "size"');
    }
    function m(W, B, D) {
      return E(W), W <= 0 ? o(W) : B !== void 0 ? typeof D == "string" ? o(W).fill(B, D) : o(W).fill(B) : o(W);
    }
    e.alloc = function(W, B, D) {
      return m(W, B, D);
    };
    function _(W) {
      return E(W), o(W < 0 ? 0 : P(W) | 0);
    }
    e.allocUnsafe = function(W) {
      return _(W);
    }, e.allocUnsafeSlow = function(W) {
      return _(W);
    };
    function h(W, B) {
      if ((typeof B != "string" || B === "") && (B = "utf8"), !e.isEncoding(B))
        throw new TypeError("Unknown encoding: " + B);
      const D = I(W, B) | 0;
      let Y = o(D);
      const tt = Y.write(W, B);
      return tt !== D && (Y = Y.slice(0, tt)), Y;
    }
    function S(W) {
      const B = W.length < 0 ? 0 : P(W.length) | 0, D = o(B);
      for (let Y = 0; Y < B; Y += 1)
        D[Y] = W[Y] & 255;
      return D;
    }
    function x(W) {
      if (qt(W, O)) {
        const B = new O(W);
        return R(B.buffer, B.byteOffset, B.byteLength);
      }
      return S(W);
    }
    function R(W, B, D) {
      if (B < 0 || W.byteLength < B)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (W.byteLength < B + (D || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      let Y;
      return B === void 0 && D === void 0 ? Y = new O(W) : D === void 0 ? Y = new O(W, B) : Y = new O(W, B, D), Object.setPrototypeOf(Y, e.prototype), Y;
    }
    function c(W) {
      if (e.isBuffer(W)) {
        const B = P(W.length) | 0, D = o(B);
        return D.length === 0 || W.copy(D, 0, 0, B), D;
      }
      if (W.length !== void 0)
        return typeof W.length != "number" || pe(W.length) ? o(0) : S(W);
      if (W.type === "Buffer" && Array.isArray(W.data))
        return S(W.data);
    }
    function P(W) {
      if (W >= u)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + u.toString(16) + " bytes");
      return W | 0;
    }
    function w(W) {
      return +W != W && (W = 0), e.alloc(+W);
    }
    e.isBuffer = function(B) {
      return B != null && B._isBuffer === !0 && B !== e.prototype;
    }, e.compare = function(B, D) {
      if (qt(B, O) && (B = e.from(B, B.offset, B.byteLength)), qt(D, O) && (D = e.from(D, D.offset, D.byteLength)), !e.isBuffer(B) || !e.isBuffer(D))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (B === D) return 0;
      let Y = B.length, tt = D.length;
      for (let at = 0, ct = Math.min(Y, tt); at < ct; ++at)
        if (B[at] !== D[at]) {
          Y = B[at], tt = D[at];
          break;
        }
      return Y < tt ? -1 : tt < Y ? 1 : 0;
    }, e.isEncoding = function(B) {
      switch (String(B).toLowerCase()) {
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
    }, e.concat = function(B, D) {
      if (!Array.isArray(B))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (B.length === 0)
        return e.alloc(0);
      let Y;
      if (D === void 0)
        for (D = 0, Y = 0; Y < B.length; ++Y)
          D += B[Y].length;
      const tt = e.allocUnsafe(D);
      let at = 0;
      for (Y = 0; Y < B.length; ++Y) {
        let ct = B[Y];
        if (qt(ct, O))
          at + ct.length > tt.length ? (e.isBuffer(ct) || (ct = e.from(ct)), ct.copy(tt, at)) : O.prototype.set.call(
            tt,
            ct,
            at
          );
        else if (e.isBuffer(ct))
          ct.copy(tt, at);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        at += ct.length;
      }
      return tt;
    };
    function I(W, B) {
      if (e.isBuffer(W))
        return W.length;
      if (l.isView(W) || qt(W, l))
        return W.byteLength;
      if (typeof W != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof W
        );
      const D = W.length, Y = arguments.length > 2 && arguments[2] === !0;
      if (!Y && D === 0) return 0;
      let tt = !1;
      for (; ; )
        switch (B) {
          case "ascii":
          case "latin1":
          case "binary":
            return D;
          case "utf8":
          case "utf-8":
            return Vt(W).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return D * 2;
          case "hex":
            return D >>> 1;
          case "base64":
            return Zt(W).length;
          default:
            if (tt)
              return Y ? -1 : Vt(W).length;
            B = ("" + B).toLowerCase(), tt = !0;
        }
    }
    e.byteLength = I;
    function T(W, B, D) {
      let Y = !1;
      if ((B === void 0 || B < 0) && (B = 0), B > this.length || ((D === void 0 || D > this.length) && (D = this.length), D <= 0) || (D >>>= 0, B >>>= 0, D <= B))
        return "";
      for (W || (W = "utf8"); ; )
        switch (W) {
          case "hex":
            return ut(this, B, D);
          case "utf8":
          case "utf-8":
            return it(this, B, D);
          case "ascii":
            return G(this, B, D);
          case "latin1":
          case "binary":
            return Z(this, B, D);
          case "base64":
            return V(this, B, D);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return pt(this, B, D);
          default:
            if (Y) throw new TypeError("Unknown encoding: " + W);
            W = (W + "").toLowerCase(), Y = !0;
        }
    }
    e.prototype._isBuffer = !0;
    function M(W, B, D) {
      const Y = W[B];
      W[B] = W[D], W[D] = Y;
    }
    e.prototype.swap16 = function() {
      const B = this.length;
      if (B % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let D = 0; D < B; D += 2)
        M(this, D, D + 1);
      return this;
    }, e.prototype.swap32 = function() {
      const B = this.length;
      if (B % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let D = 0; D < B; D += 4)
        M(this, D, D + 3), M(this, D + 1, D + 2);
      return this;
    }, e.prototype.swap64 = function() {
      const B = this.length;
      if (B % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let D = 0; D < B; D += 8)
        M(this, D, D + 7), M(this, D + 1, D + 6), M(this, D + 2, D + 5), M(this, D + 3, D + 4);
      return this;
    }, e.prototype.toString = function() {
      const B = this.length;
      return B === 0 ? "" : arguments.length === 0 ? it(this, 0, B) : T.apply(this, arguments);
    }, e.prototype.toLocaleString = e.prototype.toString, e.prototype.equals = function(B) {
      if (!e.isBuffer(B)) throw new TypeError("Argument must be a Buffer");
      return this === B ? !0 : e.compare(this, B) === 0;
    }, e.prototype.inspect = function() {
      let B = "";
      const D = N.INSPECT_MAX_BYTES;
      return B = this.toString("hex", 0, D).replace(/(.{2})/g, "$1 ").trim(), this.length > D && (B += " ... "), "<Buffer " + B + ">";
    }, n && (e.prototype[n] = e.prototype.inspect), e.prototype.compare = function(B, D, Y, tt, at) {
      if (qt(B, O) && (B = e.from(B, B.offset, B.byteLength)), !e.isBuffer(B))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof B
        );
      if (D === void 0 && (D = 0), Y === void 0 && (Y = B ? B.length : 0), tt === void 0 && (tt = 0), at === void 0 && (at = this.length), D < 0 || Y > B.length || tt < 0 || at > this.length)
        throw new RangeError("out of range index");
      if (tt >= at && D >= Y)
        return 0;
      if (tt >= at)
        return -1;
      if (D >= Y)
        return 1;
      if (D >>>= 0, Y >>>= 0, tt >>>= 0, at >>>= 0, this === B) return 0;
      let ct = at - tt, Bt = Y - D;
      const zt = Math.min(ct, Bt), Ut = this.slice(tt, at), Ft = B.slice(D, Y);
      for (let xt = 0; xt < zt; ++xt)
        if (Ut[xt] !== Ft[xt]) {
          ct = Ut[xt], Bt = Ft[xt];
          break;
        }
      return ct < Bt ? -1 : Bt < ct ? 1 : 0;
    };
    function A(W, B, D, Y, tt) {
      if (W.length === 0) return -1;
      if (typeof D == "string" ? (Y = D, D = 0) : D > 2147483647 ? D = 2147483647 : D < -2147483648 && (D = -2147483648), D = +D, pe(D) && (D = tt ? 0 : W.length - 1), D < 0 && (D = W.length + D), D >= W.length) {
        if (tt) return -1;
        D = W.length - 1;
      } else if (D < 0)
        if (tt) D = 0;
        else return -1;
      if (typeof B == "string" && (B = e.from(B, Y)), e.isBuffer(B))
        return B.length === 0 ? -1 : F(W, B, D, Y, tt);
      if (typeof B == "number")
        return B = B & 255, typeof O.prototype.indexOf == "function" ? tt ? O.prototype.indexOf.call(W, B, D) : O.prototype.lastIndexOf.call(W, B, D) : F(W, [B], D, Y, tt);
      throw new TypeError("val must be string, number or Buffer");
    }
    function F(W, B, D, Y, tt) {
      let at = 1, ct = W.length, Bt = B.length;
      if (Y !== void 0 && (Y = String(Y).toLowerCase(), Y === "ucs2" || Y === "ucs-2" || Y === "utf16le" || Y === "utf-16le")) {
        if (W.length < 2 || B.length < 2)
          return -1;
        at = 2, ct /= 2, Bt /= 2, D /= 2;
      }
      function zt(Ft, xt) {
        return at === 1 ? Ft[xt] : Ft.readUInt16BE(xt * at);
      }
      let Ut;
      if (tt) {
        let Ft = -1;
        for (Ut = D; Ut < ct; Ut++)
          if (zt(W, Ut) === zt(B, Ft === -1 ? 0 : Ut - Ft)) {
            if (Ft === -1 && (Ft = Ut), Ut - Ft + 1 === Bt) return Ft * at;
          } else
            Ft !== -1 && (Ut -= Ut - Ft), Ft = -1;
      } else
        for (D + Bt > ct && (D = ct - Bt), Ut = D; Ut >= 0; Ut--) {
          let Ft = !0;
          for (let xt = 0; xt < Bt; xt++)
            if (zt(W, Ut + xt) !== zt(B, xt)) {
              Ft = !1;
              break;
            }
          if (Ft) return Ut;
        }
      return -1;
    }
    e.prototype.includes = function(B, D, Y) {
      return this.indexOf(B, D, Y) !== -1;
    }, e.prototype.indexOf = function(B, D, Y) {
      return A(this, B, D, Y, !0);
    }, e.prototype.lastIndexOf = function(B, D, Y) {
      return A(this, B, D, Y, !1);
    };
    function z(W, B, D, Y) {
      D = Number(D) || 0;
      const tt = W.length - D;
      Y ? (Y = Number(Y), Y > tt && (Y = tt)) : Y = tt;
      const at = B.length;
      Y > at / 2 && (Y = at / 2);
      let ct;
      for (ct = 0; ct < Y; ++ct) {
        const Bt = parseInt(B.substr(ct * 2, 2), 16);
        if (pe(Bt)) return ct;
        W[D + ct] = Bt;
      }
      return ct;
    }
    function $(W, B, D, Y) {
      return Dt(Vt(B, W.length - D), W, D, Y);
    }
    function H(W, B, D, Y) {
      return Dt(re(B), W, D, Y);
    }
    function nt(W, B, D, Y) {
      return Dt(Zt(B), W, D, Y);
    }
    function ot(W, B, D, Y) {
      return Dt(vt(B, W.length - D), W, D, Y);
    }
    e.prototype.write = function(B, D, Y, tt) {
      if (D === void 0)
        tt = "utf8", Y = this.length, D = 0;
      else if (Y === void 0 && typeof D == "string")
        tt = D, Y = this.length, D = 0;
      else if (isFinite(D))
        D = D >>> 0, isFinite(Y) ? (Y = Y >>> 0, tt === void 0 && (tt = "utf8")) : (tt = Y, Y = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      const at = this.length - D;
      if ((Y === void 0 || Y > at) && (Y = at), B.length > 0 && (Y < 0 || D < 0) || D > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      tt || (tt = "utf8");
      let ct = !1;
      for (; ; )
        switch (tt) {
          case "hex":
            return z(this, B, D, Y);
          case "utf8":
          case "utf-8":
            return $(this, B, D, Y);
          case "ascii":
          case "latin1":
          case "binary":
            return H(this, B, D, Y);
          case "base64":
            return nt(this, B, D, Y);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ot(this, B, D, Y);
          default:
            if (ct) throw new TypeError("Unknown encoding: " + tt);
            tt = ("" + tt).toLowerCase(), ct = !0;
        }
    }, e.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function V(W, B, D) {
      return B === 0 && D === W.length ? g.fromByteArray(W) : g.fromByteArray(W.slice(B, D));
    }
    function it(W, B, D) {
      D = Math.min(W.length, D);
      const Y = [];
      let tt = B;
      for (; tt < D; ) {
        const at = W[tt];
        let ct = null, Bt = at > 239 ? 4 : at > 223 ? 3 : at > 191 ? 2 : 1;
        if (tt + Bt <= D) {
          let zt, Ut, Ft, xt;
          switch (Bt) {
            case 1:
              at < 128 && (ct = at);
              break;
            case 2:
              zt = W[tt + 1], (zt & 192) === 128 && (xt = (at & 31) << 6 | zt & 63, xt > 127 && (ct = xt));
              break;
            case 3:
              zt = W[tt + 1], Ut = W[tt + 2], (zt & 192) === 128 && (Ut & 192) === 128 && (xt = (at & 15) << 12 | (zt & 63) << 6 | Ut & 63, xt > 2047 && (xt < 55296 || xt > 57343) && (ct = xt));
              break;
            case 4:
              zt = W[tt + 1], Ut = W[tt + 2], Ft = W[tt + 3], (zt & 192) === 128 && (Ut & 192) === 128 && (Ft & 192) === 128 && (xt = (at & 15) << 18 | (zt & 63) << 12 | (Ut & 63) << 6 | Ft & 63, xt > 65535 && xt < 1114112 && (ct = xt));
          }
        }
        ct === null ? (ct = 65533, Bt = 1) : ct > 65535 && (ct -= 65536, Y.push(ct >>> 10 & 1023 | 55296), ct = 56320 | ct & 1023), Y.push(ct), tt += Bt;
      }
      return dt(Y);
    }
    const lt = 4096;
    function dt(W) {
      const B = W.length;
      if (B <= lt)
        return String.fromCharCode.apply(String, W);
      let D = "", Y = 0;
      for (; Y < B; )
        D += String.fromCharCode.apply(
          String,
          W.slice(Y, Y += lt)
        );
      return D;
    }
    function G(W, B, D) {
      let Y = "";
      D = Math.min(W.length, D);
      for (let tt = B; tt < D; ++tt)
        Y += String.fromCharCode(W[tt] & 127);
      return Y;
    }
    function Z(W, B, D) {
      let Y = "";
      D = Math.min(W.length, D);
      for (let tt = B; tt < D; ++tt)
        Y += String.fromCharCode(W[tt]);
      return Y;
    }
    function ut(W, B, D) {
      const Y = W.length;
      (!B || B < 0) && (B = 0), (!D || D < 0 || D > Y) && (D = Y);
      let tt = "";
      for (let at = B; at < D; ++at)
        tt += Ce[W[at]];
      return tt;
    }
    function pt(W, B, D) {
      const Y = W.slice(B, D);
      let tt = "";
      for (let at = 0; at < Y.length - 1; at += 2)
        tt += String.fromCharCode(Y[at] + Y[at + 1] * 256);
      return tt;
    }
    e.prototype.slice = function(B, D) {
      const Y = this.length;
      B = ~~B, D = D === void 0 ? Y : ~~D, B < 0 ? (B += Y, B < 0 && (B = 0)) : B > Y && (B = Y), D < 0 ? (D += Y, D < 0 && (D = 0)) : D > Y && (D = Y), D < B && (D = B);
      const tt = this.subarray(B, D);
      return Object.setPrototypeOf(tt, e.prototype), tt;
    };
    function st(W, B, D) {
      if (W % 1 !== 0 || W < 0) throw new RangeError("offset is not uint");
      if (W + B > D) throw new RangeError("Trying to access beyond buffer length");
    }
    e.prototype.readUintLE = e.prototype.readUIntLE = function(B, D, Y) {
      B = B >>> 0, D = D >>> 0, Y || st(B, D, this.length);
      let tt = this[B], at = 1, ct = 0;
      for (; ++ct < D && (at *= 256); )
        tt += this[B + ct] * at;
      return tt;
    }, e.prototype.readUintBE = e.prototype.readUIntBE = function(B, D, Y) {
      B = B >>> 0, D = D >>> 0, Y || st(B, D, this.length);
      let tt = this[B + --D], at = 1;
      for (; D > 0 && (at *= 256); )
        tt += this[B + --D] * at;
      return tt;
    }, e.prototype.readUint8 = e.prototype.readUInt8 = function(B, D) {
      return B = B >>> 0, D || st(B, 1, this.length), this[B];
    }, e.prototype.readUint16LE = e.prototype.readUInt16LE = function(B, D) {
      return B = B >>> 0, D || st(B, 2, this.length), this[B] | this[B + 1] << 8;
    }, e.prototype.readUint16BE = e.prototype.readUInt16BE = function(B, D) {
      return B = B >>> 0, D || st(B, 2, this.length), this[B] << 8 | this[B + 1];
    }, e.prototype.readUint32LE = e.prototype.readUInt32LE = function(B, D) {
      return B = B >>> 0, D || st(B, 4, this.length), (this[B] | this[B + 1] << 8 | this[B + 2] << 16) + this[B + 3] * 16777216;
    }, e.prototype.readUint32BE = e.prototype.readUInt32BE = function(B, D) {
      return B = B >>> 0, D || st(B, 4, this.length), this[B] * 16777216 + (this[B + 1] << 16 | this[B + 2] << 8 | this[B + 3]);
    }, e.prototype.readBigUInt64LE = oe(function(B) {
      B = B >>> 0, Rt(B, "offset");
      const D = this[B], Y = this[B + 7];
      (D === void 0 || Y === void 0) && Tt(B, this.length - 8);
      const tt = D + this[++B] * 2 ** 8 + this[++B] * 2 ** 16 + this[++B] * 2 ** 24, at = this[++B] + this[++B] * 2 ** 8 + this[++B] * 2 ** 16 + Y * 2 ** 24;
      return BigInt(tt) + (BigInt(at) << BigInt(32));
    }), e.prototype.readBigUInt64BE = oe(function(B) {
      B = B >>> 0, Rt(B, "offset");
      const D = this[B], Y = this[B + 7];
      (D === void 0 || Y === void 0) && Tt(B, this.length - 8);
      const tt = D * 2 ** 24 + this[++B] * 2 ** 16 + this[++B] * 2 ** 8 + this[++B], at = this[++B] * 2 ** 24 + this[++B] * 2 ** 16 + this[++B] * 2 ** 8 + Y;
      return (BigInt(tt) << BigInt(32)) + BigInt(at);
    }), e.prototype.readIntLE = function(B, D, Y) {
      B = B >>> 0, D = D >>> 0, Y || st(B, D, this.length);
      let tt = this[B], at = 1, ct = 0;
      for (; ++ct < D && (at *= 256); )
        tt += this[B + ct] * at;
      return at *= 128, tt >= at && (tt -= Math.pow(2, 8 * D)), tt;
    }, e.prototype.readIntBE = function(B, D, Y) {
      B = B >>> 0, D = D >>> 0, Y || st(B, D, this.length);
      let tt = D, at = 1, ct = this[B + --tt];
      for (; tt > 0 && (at *= 256); )
        ct += this[B + --tt] * at;
      return at *= 128, ct >= at && (ct -= Math.pow(2, 8 * D)), ct;
    }, e.prototype.readInt8 = function(B, D) {
      return B = B >>> 0, D || st(B, 1, this.length), this[B] & 128 ? (255 - this[B] + 1) * -1 : this[B];
    }, e.prototype.readInt16LE = function(B, D) {
      B = B >>> 0, D || st(B, 2, this.length);
      const Y = this[B] | this[B + 1] << 8;
      return Y & 32768 ? Y | 4294901760 : Y;
    }, e.prototype.readInt16BE = function(B, D) {
      B = B >>> 0, D || st(B, 2, this.length);
      const Y = this[B + 1] | this[B] << 8;
      return Y & 32768 ? Y | 4294901760 : Y;
    }, e.prototype.readInt32LE = function(B, D) {
      return B = B >>> 0, D || st(B, 4, this.length), this[B] | this[B + 1] << 8 | this[B + 2] << 16 | this[B + 3] << 24;
    }, e.prototype.readInt32BE = function(B, D) {
      return B = B >>> 0, D || st(B, 4, this.length), this[B] << 24 | this[B + 1] << 16 | this[B + 2] << 8 | this[B + 3];
    }, e.prototype.readBigInt64LE = oe(function(B) {
      B = B >>> 0, Rt(B, "offset");
      const D = this[B], Y = this[B + 7];
      (D === void 0 || Y === void 0) && Tt(B, this.length - 8);
      const tt = this[B + 4] + this[B + 5] * 2 ** 8 + this[B + 6] * 2 ** 16 + (Y << 24);
      return (BigInt(tt) << BigInt(32)) + BigInt(D + this[++B] * 2 ** 8 + this[++B] * 2 ** 16 + this[++B] * 2 ** 24);
    }), e.prototype.readBigInt64BE = oe(function(B) {
      B = B >>> 0, Rt(B, "offset");
      const D = this[B], Y = this[B + 7];
      (D === void 0 || Y === void 0) && Tt(B, this.length - 8);
      const tt = (D << 24) + // Overflow
      this[++B] * 2 ** 16 + this[++B] * 2 ** 8 + this[++B];
      return (BigInt(tt) << BigInt(32)) + BigInt(this[++B] * 2 ** 24 + this[++B] * 2 ** 16 + this[++B] * 2 ** 8 + Y);
    }), e.prototype.readFloatLE = function(B, D) {
      return B = B >>> 0, D || st(B, 4, this.length), t.read(this, B, !0, 23, 4);
    }, e.prototype.readFloatBE = function(B, D) {
      return B = B >>> 0, D || st(B, 4, this.length), t.read(this, B, !1, 23, 4);
    }, e.prototype.readDoubleLE = function(B, D) {
      return B = B >>> 0, D || st(B, 8, this.length), t.read(this, B, !0, 52, 8);
    }, e.prototype.readDoubleBE = function(B, D) {
      return B = B >>> 0, D || st(B, 8, this.length), t.read(this, B, !1, 52, 8);
    };
    function mt(W, B, D, Y, tt, at) {
      if (!e.isBuffer(W)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (B > tt || B < at) throw new RangeError('"value" argument is out of bounds');
      if (D + Y > W.length) throw new RangeError("Index out of range");
    }
    e.prototype.writeUintLE = e.prototype.writeUIntLE = function(B, D, Y, tt) {
      if (B = +B, D = D >>> 0, Y = Y >>> 0, !tt) {
        const Bt = Math.pow(2, 8 * Y) - 1;
        mt(this, B, D, Y, Bt, 0);
      }
      let at = 1, ct = 0;
      for (this[D] = B & 255; ++ct < Y && (at *= 256); )
        this[D + ct] = B / at & 255;
      return D + Y;
    }, e.prototype.writeUintBE = e.prototype.writeUIntBE = function(B, D, Y, tt) {
      if (B = +B, D = D >>> 0, Y = Y >>> 0, !tt) {
        const Bt = Math.pow(2, 8 * Y) - 1;
        mt(this, B, D, Y, Bt, 0);
      }
      let at = Y - 1, ct = 1;
      for (this[D + at] = B & 255; --at >= 0 && (ct *= 256); )
        this[D + at] = B / ct & 255;
      return D + Y;
    }, e.prototype.writeUint8 = e.prototype.writeUInt8 = function(B, D, Y) {
      return B = +B, D = D >>> 0, Y || mt(this, B, D, 1, 255, 0), this[D] = B & 255, D + 1;
    }, e.prototype.writeUint16LE = e.prototype.writeUInt16LE = function(B, D, Y) {
      return B = +B, D = D >>> 0, Y || mt(this, B, D, 2, 65535, 0), this[D] = B & 255, this[D + 1] = B >>> 8, D + 2;
    }, e.prototype.writeUint16BE = e.prototype.writeUInt16BE = function(B, D, Y) {
      return B = +B, D = D >>> 0, Y || mt(this, B, D, 2, 65535, 0), this[D] = B >>> 8, this[D + 1] = B & 255, D + 2;
    }, e.prototype.writeUint32LE = e.prototype.writeUInt32LE = function(B, D, Y) {
      return B = +B, D = D >>> 0, Y || mt(this, B, D, 4, 4294967295, 0), this[D + 3] = B >>> 24, this[D + 2] = B >>> 16, this[D + 1] = B >>> 8, this[D] = B & 255, D + 4;
    }, e.prototype.writeUint32BE = e.prototype.writeUInt32BE = function(B, D, Y) {
      return B = +B, D = D >>> 0, Y || mt(this, B, D, 4, 4294967295, 0), this[D] = B >>> 24, this[D + 1] = B >>> 16, this[D + 2] = B >>> 8, this[D + 3] = B & 255, D + 4;
    };
    function bt(W, B, D, Y, tt) {
      jt(B, Y, tt, W, D, 7);
      let at = Number(B & BigInt(4294967295));
      W[D++] = at, at = at >> 8, W[D++] = at, at = at >> 8, W[D++] = at, at = at >> 8, W[D++] = at;
      let ct = Number(B >> BigInt(32) & BigInt(4294967295));
      return W[D++] = ct, ct = ct >> 8, W[D++] = ct, ct = ct >> 8, W[D++] = ct, ct = ct >> 8, W[D++] = ct, D;
    }
    function wt(W, B, D, Y, tt) {
      jt(B, Y, tt, W, D, 7);
      let at = Number(B & BigInt(4294967295));
      W[D + 7] = at, at = at >> 8, W[D + 6] = at, at = at >> 8, W[D + 5] = at, at = at >> 8, W[D + 4] = at;
      let ct = Number(B >> BigInt(32) & BigInt(4294967295));
      return W[D + 3] = ct, ct = ct >> 8, W[D + 2] = ct, ct = ct >> 8, W[D + 1] = ct, ct = ct >> 8, W[D] = ct, D + 8;
    }
    e.prototype.writeBigUInt64LE = oe(function(B, D = 0) {
      return bt(this, B, D, BigInt(0), BigInt("0xffffffffffffffff"));
    }), e.prototype.writeBigUInt64BE = oe(function(B, D = 0) {
      return wt(this, B, D, BigInt(0), BigInt("0xffffffffffffffff"));
    }), e.prototype.writeIntLE = function(B, D, Y, tt) {
      if (B = +B, D = D >>> 0, !tt) {
        const zt = Math.pow(2, 8 * Y - 1);
        mt(this, B, D, Y, zt - 1, -zt);
      }
      let at = 0, ct = 1, Bt = 0;
      for (this[D] = B & 255; ++at < Y && (ct *= 256); )
        B < 0 && Bt === 0 && this[D + at - 1] !== 0 && (Bt = 1), this[D + at] = (B / ct >> 0) - Bt & 255;
      return D + Y;
    }, e.prototype.writeIntBE = function(B, D, Y, tt) {
      if (B = +B, D = D >>> 0, !tt) {
        const zt = Math.pow(2, 8 * Y - 1);
        mt(this, B, D, Y, zt - 1, -zt);
      }
      let at = Y - 1, ct = 1, Bt = 0;
      for (this[D + at] = B & 255; --at >= 0 && (ct *= 256); )
        B < 0 && Bt === 0 && this[D + at + 1] !== 0 && (Bt = 1), this[D + at] = (B / ct >> 0) - Bt & 255;
      return D + Y;
    }, e.prototype.writeInt8 = function(B, D, Y) {
      return B = +B, D = D >>> 0, Y || mt(this, B, D, 1, 127, -128), B < 0 && (B = 255 + B + 1), this[D] = B & 255, D + 1;
    }, e.prototype.writeInt16LE = function(B, D, Y) {
      return B = +B, D = D >>> 0, Y || mt(this, B, D, 2, 32767, -32768), this[D] = B & 255, this[D + 1] = B >>> 8, D + 2;
    }, e.prototype.writeInt16BE = function(B, D, Y) {
      return B = +B, D = D >>> 0, Y || mt(this, B, D, 2, 32767, -32768), this[D] = B >>> 8, this[D + 1] = B & 255, D + 2;
    }, e.prototype.writeInt32LE = function(B, D, Y) {
      return B = +B, D = D >>> 0, Y || mt(this, B, D, 4, 2147483647, -2147483648), this[D] = B & 255, this[D + 1] = B >>> 8, this[D + 2] = B >>> 16, this[D + 3] = B >>> 24, D + 4;
    }, e.prototype.writeInt32BE = function(B, D, Y) {
      return B = +B, D = D >>> 0, Y || mt(this, B, D, 4, 2147483647, -2147483648), B < 0 && (B = 4294967295 + B + 1), this[D] = B >>> 24, this[D + 1] = B >>> 16, this[D + 2] = B >>> 8, this[D + 3] = B & 255, D + 4;
    }, e.prototype.writeBigInt64LE = oe(function(B, D = 0) {
      return bt(this, B, D, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), e.prototype.writeBigInt64BE = oe(function(B, D = 0) {
      return wt(this, B, D, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function C(W, B, D, Y, tt, at) {
      if (D + Y > W.length) throw new RangeError("Index out of range");
      if (D < 0) throw new RangeError("Index out of range");
    }
    function U(W, B, D, Y, tt) {
      return B = +B, D = D >>> 0, tt || C(W, B, D, 4), t.write(W, B, D, Y, 23, 4), D + 4;
    }
    e.prototype.writeFloatLE = function(B, D, Y) {
      return U(this, B, D, !0, Y);
    }, e.prototype.writeFloatBE = function(B, D, Y) {
      return U(this, B, D, !1, Y);
    };
    function L(W, B, D, Y, tt) {
      return B = +B, D = D >>> 0, tt || C(W, B, D, 8), t.write(W, B, D, Y, 52, 8), D + 8;
    }
    e.prototype.writeDoubleLE = function(B, D, Y) {
      return L(this, B, D, !0, Y);
    }, e.prototype.writeDoubleBE = function(B, D, Y) {
      return L(this, B, D, !1, Y);
    }, e.prototype.copy = function(B, D, Y, tt) {
      if (!e.isBuffer(B)) throw new TypeError("argument should be a Buffer");
      if (Y || (Y = 0), !tt && tt !== 0 && (tt = this.length), D >= B.length && (D = B.length), D || (D = 0), tt > 0 && tt < Y && (tt = Y), tt === Y || B.length === 0 || this.length === 0) return 0;
      if (D < 0)
        throw new RangeError("targetStart out of bounds");
      if (Y < 0 || Y >= this.length) throw new RangeError("Index out of range");
      if (tt < 0) throw new RangeError("sourceEnd out of bounds");
      tt > this.length && (tt = this.length), B.length - D < tt - Y && (tt = B.length - D + Y);
      const at = tt - Y;
      return this === B && typeof O.prototype.copyWithin == "function" ? this.copyWithin(D, Y, tt) : O.prototype.set.call(
        B,
        this.subarray(Y, tt),
        D
      ), at;
    }, e.prototype.fill = function(B, D, Y, tt) {
      if (typeof B == "string") {
        if (typeof D == "string" ? (tt = D, D = 0, Y = this.length) : typeof Y == "string" && (tt = Y, Y = this.length), tt !== void 0 && typeof tt != "string")
          throw new TypeError("encoding must be a string");
        if (typeof tt == "string" && !e.isEncoding(tt))
          throw new TypeError("Unknown encoding: " + tt);
        if (B.length === 1) {
          const ct = B.charCodeAt(0);
          (tt === "utf8" && ct < 128 || tt === "latin1") && (B = ct);
        }
      } else typeof B == "number" ? B = B & 255 : typeof B == "boolean" && (B = Number(B));
      if (D < 0 || this.length < D || this.length < Y)
        throw new RangeError("Out of range index");
      if (Y <= D)
        return this;
      D = D >>> 0, Y = Y === void 0 ? this.length : Y >>> 0, B || (B = 0);
      let at;
      if (typeof B == "number")
        for (at = D; at < Y; ++at)
          this[at] = B;
      else {
        const ct = e.isBuffer(B) ? B : e.from(B, tt), Bt = ct.length;
        if (Bt === 0)
          throw new TypeError('The value "' + B + '" is invalid for argument "value"');
        for (at = 0; at < Y - D; ++at)
          this[at + D] = ct[at % Bt];
      }
      return this;
    };
    const K = {};
    function X(W, B, D) {
      K[W] = class extends D {
        constructor() {
          super(), Object.defineProperty(this, "message", {
            value: B.apply(this, arguments),
            writable: !0,
            configurable: !0
          }), this.name = `${this.name} [${W}]`, this.stack, delete this.name;
        }
        get code() {
          return W;
        }
        set code(tt) {
          Object.defineProperty(this, "code", {
            configurable: !0,
            enumerable: !0,
            value: tt,
            writable: !0
          });
        }
        toString() {
          return `${this.name} [${W}]: ${this.message}`;
        }
      };
    }
    X(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(W) {
        return W ? `${W} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
      },
      RangeError
    ), X(
      "ERR_INVALID_ARG_TYPE",
      function(W, B) {
        return `The "${W}" argument must be of type number. Received type ${typeof B}`;
      },
      TypeError
    ), X(
      "ERR_OUT_OF_RANGE",
      function(W, B, D) {
        let Y = `The value of "${W}" is out of range.`, tt = D;
        return Number.isInteger(D) && Math.abs(D) > 2 ** 32 ? tt = rt(String(D)) : typeof D == "bigint" && (tt = String(D), (D > BigInt(2) ** BigInt(32) || D < -(BigInt(2) ** BigInt(32))) && (tt = rt(tt)), tt += "n"), Y += ` It must be ${B}. Received ${tt}`, Y;
      },
      RangeError
    );
    function rt(W) {
      let B = "", D = W.length;
      const Y = W[0] === "-" ? 1 : 0;
      for (; D >= Y + 4; D -= 3)
        B = `_${W.slice(D - 3, D)}${B}`;
      return `${W.slice(0, D)}${B}`;
    }
    function yt(W, B, D) {
      Rt(B, "offset"), (W[B] === void 0 || W[B + D] === void 0) && Tt(B, W.length - (D + 1));
    }
    function jt(W, B, D, Y, tt, at) {
      if (W > D || W < B) {
        const ct = typeof B == "bigint" ? "n" : "";
        let Bt;
        throw B === 0 || B === BigInt(0) ? Bt = `>= 0${ct} and < 2${ct} ** ${(at + 1) * 8}${ct}` : Bt = `>= -(2${ct} ** ${(at + 1) * 8 - 1}${ct}) and < 2 ** ${(at + 1) * 8 - 1}${ct}`, new K.ERR_OUT_OF_RANGE("value", Bt, W);
      }
      yt(Y, tt, at);
    }
    function Rt(W, B) {
      if (typeof W != "number")
        throw new K.ERR_INVALID_ARG_TYPE(B, "number", W);
    }
    function Tt(W, B, D) {
      throw Math.floor(W) !== W ? (Rt(W, D), new K.ERR_OUT_OF_RANGE("offset", "an integer", W)) : B < 0 ? new K.ERR_BUFFER_OUT_OF_BOUNDS() : new K.ERR_OUT_OF_RANGE(
        "offset",
        `>= 0 and <= ${B}`,
        W
      );
    }
    const Et = /[^+/0-9A-Za-z-_]/g;
    function Wt(W) {
      if (W = W.split("=")[0], W = W.trim().replace(Et, ""), W.length < 2) return "";
      for (; W.length % 4 !== 0; )
        W = W + "=";
      return W;
    }
    function Vt(W, B) {
      B = B || 1 / 0;
      let D;
      const Y = W.length;
      let tt = null;
      const at = [];
      for (let ct = 0; ct < Y; ++ct) {
        if (D = W.charCodeAt(ct), D > 55295 && D < 57344) {
          if (!tt) {
            if (D > 56319) {
              (B -= 3) > -1 && at.push(239, 191, 189);
              continue;
            } else if (ct + 1 === Y) {
              (B -= 3) > -1 && at.push(239, 191, 189);
              continue;
            }
            tt = D;
            continue;
          }
          if (D < 56320) {
            (B -= 3) > -1 && at.push(239, 191, 189), tt = D;
            continue;
          }
          D = (tt - 55296 << 10 | D - 56320) + 65536;
        } else tt && (B -= 3) > -1 && at.push(239, 191, 189);
        if (tt = null, D < 128) {
          if ((B -= 1) < 0) break;
          at.push(D);
        } else if (D < 2048) {
          if ((B -= 2) < 0) break;
          at.push(
            D >> 6 | 192,
            D & 63 | 128
          );
        } else if (D < 65536) {
          if ((B -= 3) < 0) break;
          at.push(
            D >> 12 | 224,
            D >> 6 & 63 | 128,
            D & 63 | 128
          );
        } else if (D < 1114112) {
          if ((B -= 4) < 0) break;
          at.push(
            D >> 18 | 240,
            D >> 12 & 63 | 128,
            D >> 6 & 63 | 128,
            D & 63 | 128
          );
        } else
          throw new Error("Invalid code point");
      }
      return at;
    }
    function re(W) {
      const B = [];
      for (let D = 0; D < W.length; ++D)
        B.push(W.charCodeAt(D) & 255);
      return B;
    }
    function vt(W, B) {
      let D, Y, tt;
      const at = [];
      for (let ct = 0; ct < W.length && !((B -= 2) < 0); ++ct)
        D = W.charCodeAt(ct), Y = D >> 8, tt = D % 256, at.push(tt), at.push(Y);
      return at;
    }
    function Zt(W) {
      return g.toByteArray(Wt(W));
    }
    function Dt(W, B, D, Y) {
      let tt;
      for (tt = 0; tt < Y && !(tt + D >= B.length || tt >= W.length); ++tt)
        B[tt + D] = W[tt];
      return tt;
    }
    function qt(W, B) {
      return W instanceof B || W != null && W.constructor != null && W.constructor.name != null && W.constructor.name === B.name;
    }
    function pe(W) {
      return W !== W;
    }
    const Ce = function() {
      const W = "0123456789abcdef", B = new Array(256);
      for (let D = 0; D < 16; ++D) {
        const Y = D * 16;
        for (let tt = 0; tt < 16; ++tt)
          B[Y + tt] = W[D] + W[tt];
      }
      return B;
    }();
    function oe(W) {
      return typeof BigInt > "u" ? De : W;
    }
    function De() {
      throw new Error("BigInt not supported");
    }
  })(Ru);
  const Ue = Ru.Buffer;
  var xr = {}, hu;
  function Gl() {
    return hu || (hu = 1, function(N) {
      function g(x, R) {
        var c;
        return x instanceof Ue ? c = x : c = Ue.from(x.buffer, x.byteOffset, x.byteLength), c.toString(R);
      }
      var t = function(x) {
        return Ue.from(x);
      };
      function n(x) {
        for (var R = 0, c = Math.min(256 * 256, x.length + 1), P = new Uint16Array(c), w = [], I = 0; ; ) {
          var T = R < x.length;
          if (!T || I >= c - 1) {
            var M = P.subarray(0, I), A = M;
            if (w.push(String.fromCharCode.apply(null, A)), !T) return w.join("");
            x = x.subarray(R), R = 0, I = 0;
          }
          var F = x[R++];
          if ((F & 128) === 0) P[I++] = F;
          else if ((F & 224) === 192) {
            var z = x[R++] & 63;
            P[I++] = (F & 31) << 6 | z;
          } else if ((F & 240) === 224) {
            var z = x[R++] & 63, $ = x[R++] & 63;
            P[I++] = (F & 31) << 12 | z << 6 | $;
          } else if ((F & 248) === 240) {
            var z = x[R++] & 63, $ = x[R++] & 63, H = x[R++] & 63, nt = (F & 7) << 18 | z << 12 | $ << 6 | H;
            nt > 65535 && (nt -= 65536, P[I++] = nt >>> 10 & 1023 | 55296, nt = 56320 | nt & 1023), P[I++] = nt;
          }
        }
      }
      function u(x) {
        for (var R = 0, c = x.length, P = 0, w = Math.max(32, c + (c >>> 1) + 7), I = new Uint8Array(w >>> 3 << 3); R < c; ) {
          var T = x.charCodeAt(R++);
          if (T >= 55296 && T <= 56319) {
            if (R < c) {
              var M = x.charCodeAt(R);
              (M & 64512) === 56320 && (++R, T = ((T & 1023) << 10) + (M & 1023) + 65536);
            }
            if (T >= 55296 && T <= 56319) continue;
          }
          if (P + 4 > I.length) {
            w += 8, w *= 1 + R / x.length * 2, w = w >>> 3 << 3;
            var A = new Uint8Array(w);
            A.set(I), I = A;
          }
          if ((T & 4294967168) === 0) {
            I[P++] = T;
            continue;
          } else if ((T & 4294965248) === 0) I[P++] = T >>> 6 & 31 | 192;
          else if ((T & 4294901760) === 0) I[P++] = T >>> 12 & 15 | 224, I[P++] = T >>> 6 & 63 | 128;
          else if ((T & 4292870144) === 0) I[P++] = T >>> 18 & 7 | 240, I[P++] = T >>> 12 & 63 | 128, I[P++] = T >>> 6 & 63 | 128;
          else continue;
          I[P++] = T & 63 | 128;
        }
        return I.slice ? I.slice(0, P) : I.subarray(0, P);
      }
      var O = "Failed to ", l = function(x, R, c) {
        if (x) throw new Error("".concat(O).concat(R, ": the '").concat(c, "' option is unsupported."));
      }, i = typeof Ue == "function" && Ue.from, s = i ? t : u;
      function o() {
        this.encoding = "utf-8";
      }
      o.prototype.encode = function(x, R) {
        return l(R && R.stream, "encode", "stream"), s(x);
      };
      function e(x) {
        var R;
        try {
          var c = new Blob([x], { type: "text/plain;charset=UTF-8" });
          R = URL.createObjectURL(c);
          var P = new XMLHttpRequest();
          return P.open("GET", R, !1), P.send(), P.responseText;
        } finally {
          R && URL.revokeObjectURL(R);
        }
      }
      var j = !i && typeof Blob == "function" && typeof URL == "function" && typeof URL.createObjectURL == "function", E = ["utf-8", "utf8", "unicode-1-1-utf-8"], m = n;
      i ? m = g : j && (m = function(x) {
        try {
          return e(x);
        } catch {
          return n(x);
        }
      });
      var _ = "construct 'TextDecoder'", h = "".concat(O, " ").concat(_, ": the ");
      function S(x, R) {
        l(R && R.fatal, _, "fatal"), x = x || "utf-8";
        var c;
        if (i ? c = Ue.isEncoding(x) : c = E.indexOf(x.toLowerCase()) !== -1, !c) throw new RangeError("".concat(h, " encoding label provided ('").concat(x, "') is invalid."));
        this.encoding = x, this.fatal = !1, this.ignoreBOM = !1;
      }
      S.prototype.decode = function(x, R) {
        l(R && R.stream, "decode", "stream");
        var c;
        return x instanceof Uint8Array ? c = x : x.buffer instanceof ArrayBuffer ? c = new Uint8Array(x.buffer) : c = new Uint8Array(x), m(c, this.encoding);
      }, N.TextEncoder = N.TextEncoder || o, N.TextDecoder = N.TextDecoder || S;
    }(typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : xr)), xr;
  }
  var Or, du;
  function Yl() {
    return du || (du = 1, Gl(), Or = {
      encode: (N) => new TextEncoder().encode(N),
      decode: (N) => new TextDecoder().decode(N)
    }), Or;
  }
  var Er, pu;
  function Vl() {
    if (pu) return Er;
    pu = 1, Er = N;
    function N(g, t, n) {
      var u;
      return function() {
        if (!t)
          return g.apply(this, arguments);
        var O = this, l = arguments, i = n && !u;
        if (clearTimeout(u), u = setTimeout(function() {
          if (u = null, !i)
            return g.apply(O, l);
        }, t), i)
          return g.apply(this, arguments);
      };
    }
    return Er;
  }
  var Pr, gu;
  function qr() {
    if (gu) return Pr;
    gu = 1;
    function N(i) {
      if (i.length === 0)
        return ".";
      let s = n(i);
      return s = s.reduce(l, []), t(...s);
    }
    function g(...i) {
      let s = "";
      for (let o of i)
        o.startsWith("/") ? s = o : s = N(t(s, o));
      return s;
    }
    function t(...i) {
      if (i.length === 0) return "";
      let s = i.join("/");
      return s = s.replace(/\/{2,}/g, "/"), s;
    }
    function n(i) {
      if (i.length === 0) return [];
      if (i === "/") return ["/"];
      let s = i.split("/");
      return s[s.length - 1] === "" && s.pop(), i[0] === "/" ? s[0] = "/" : s[0] !== "." && s.unshift("."), s;
    }
    function u(i) {
      const s = i.lastIndexOf("/");
      if (s === -1) throw new Error(`Cannot get dirname of "${i}"`);
      return s === 0 ? "/" : i.slice(0, s);
    }
    function O(i) {
      if (i === "/") throw new Error(`Cannot get basename of "${i}"`);
      const s = i.lastIndexOf("/");
      return s === -1 ? i : i.slice(s + 1);
    }
    function l(i, s) {
      if (i.length === 0)
        return i.push(s), i;
      if (s === ".") return i;
      if (s === "..") {
        if (i.length === 1) {
          if (i[0] === "/")
            throw new Error("Unable to normalize path - traverses above root directory");
          if (i[0] === ".")
            return i.push(s), i;
        }
        return i[i.length - 1] === ".." ? (i.push(".."), i) : (i.pop(), i);
      }
      return i.push(s), i;
    }
    return Pr = {
      join: t,
      normalize: N,
      split: n,
      basename: O,
      dirname: u,
      resolve: g
    }, Pr;
  }
  var Sr, mu;
  function Iu() {
    if (mu) return Sr;
    mu = 1;
    function N(l) {
      return class extends Error {
        constructor(...i) {
          super(...i), this.code = l, this.message ? this.message = l + ": " + this.message : this.message = l;
        }
      };
    }
    const g = N("EEXIST"), t = N("ENOENT"), n = N("ENOTDIR"), u = N("ENOTEMPTY"), O = N("ETIMEDOUT");
    return Sr = { EEXIST: g, ENOENT: t, ENOTDIR: n, ENOTEMPTY: u, ETIMEDOUT: O }, Sr;
  }
  var Ar, yu;
  function Zl() {
    if (yu) return Ar;
    yu = 1;
    const N = qr(), { EEXIST: g, ENOENT: t, ENOTDIR: n, ENOTEMPTY: u } = Iu(), O = 0;
    return Ar = class {
      constructor() {
      }
      _makeRoot(i = /* @__PURE__ */ new Map()) {
        return i.set(O, { mode: 511, type: "dir", size: 0, ino: 0, mtimeMs: Date.now() }), i;
      }
      activate(i = null) {
        i === null ? this._root = /* @__PURE__ */ new Map([["/", this._makeRoot()]]) : typeof i == "string" ? this._root = /* @__PURE__ */ new Map([["/", this._makeRoot(this.parse(i))]]) : this._root = i;
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
      _countInodes(i) {
        let s = 1;
        for (let [o, e] of i)
          o !== O && (s += this._countInodes(e));
        return s;
      }
      autoinc() {
        return this._maxInode(this._root.get("/")) + 1;
      }
      _maxInode(i) {
        let s = i.get(O).ino;
        for (let [o, e] of i)
          o !== O && (s = Math.max(s, this._maxInode(e)));
        return s;
      }
      print(i = this._root.get("/")) {
        let s = "";
        const o = (e, j) => {
          for (let [E, m] of e) {
            if (E === 0) continue;
            let _ = m.get(O), h = _.mode.toString(8);
            s += `${"	".repeat(j)}${E}	${h}`, _.type === "file" ? s += `	${_.size}	${_.mtimeMs}
` : (s += `
`, o(m, j + 1));
          }
        };
        return o(i, 0), s;
      }
      parse(i) {
        let s = 0;
        function o(m) {
          const _ = ++s, h = m.length === 1 ? "dir" : "file";
          let [S, x, R] = m;
          return S = parseInt(S, 8), x = x ? parseInt(x) : 0, R = R ? parseInt(R) : Date.now(), /* @__PURE__ */ new Map([[O, { mode: S, type: h, size: x, mtimeMs: R, ino: _ }]]);
        }
        let e = i.trim().split(`
`), j = this._makeRoot(), E = [
          { indent: -1, node: j },
          { indent: 0, node: null }
        ];
        for (let m of e) {
          let h = m.match(/^\t*/)[0].length;
          m = m.slice(h);
          let [S, ...x] = m.split("	"), R = o(x);
          if (h <= E[E.length - 1].indent)
            for (; h <= E[E.length - 1].indent; )
              E.pop();
          E.push({ indent: h, node: R }), E[E.length - 2].node.set(S, R);
        }
        return j;
      }
      _lookup(i, s = !0) {
        let o = this._root, e = "/", j = N.split(i);
        for (let E = 0; E < j.length; ++E) {
          let m = j[E];
          if (o = o.get(m), !o) throw new t(i);
          if (s || E < j.length - 1) {
            const _ = o.get(O);
            if (_.type === "symlink") {
              let h = N.resolve(e, _.target);
              o = this._lookup(h);
            }
            e ? e = N.join(e, m) : e = m;
          }
        }
        return o;
      }
      mkdir(i, { mode: s }) {
        if (i === "/") throw new g();
        let o = this._lookup(N.dirname(i)), e = N.basename(i);
        if (o.has(e))
          throw new g();
        let j = /* @__PURE__ */ new Map(), E = {
          mode: s,
          type: "dir",
          size: 0,
          mtimeMs: Date.now(),
          ino: this.autoinc()
        };
        j.set(O, E), o.set(e, j);
      }
      rmdir(i) {
        let s = this._lookup(i);
        if (s.get(O).type !== "dir") throw new n();
        if (s.size > 1) throw new u();
        let o = this._lookup(N.dirname(i)), e = N.basename(i);
        o.delete(e);
      }
      readdir(i) {
        let s = this._lookup(i);
        if (s.get(O).type !== "dir") throw new n();
        return [...s.keys()].filter((o) => typeof o == "string");
      }
      writeStat(i, s, { mode: o }) {
        let e;
        try {
          let h = this.stat(i);
          o == null && (o = h.mode), e = h.ino;
        } catch {
        }
        o == null && (o = 438), e == null && (e = this.autoinc());
        let j = this._lookup(N.dirname(i)), E = N.basename(i), m = {
          mode: o,
          type: "file",
          size: s,
          mtimeMs: Date.now(),
          ino: e
        }, _ = /* @__PURE__ */ new Map();
        return _.set(O, m), j.set(E, _), m;
      }
      unlink(i) {
        let s = this._lookup(N.dirname(i)), o = N.basename(i);
        s.delete(o);
      }
      rename(i, s) {
        let o = N.basename(s), e = this._lookup(i);
        this._lookup(N.dirname(s)).set(o, e), this.unlink(i);
      }
      stat(i) {
        return this._lookup(i).get(O);
      }
      lstat(i) {
        return this._lookup(i, !1).get(O);
      }
      readlink(i) {
        return this._lookup(i, !1).get(O).target;
      }
      symlink(i, s) {
        let o, e;
        try {
          let h = this.stat(s);
          e === null && (e = h.mode), o = h.ino;
        } catch {
        }
        e == null && (e = 40960), o == null && (o = this.autoinc());
        let j = this._lookup(N.dirname(s)), E = N.basename(s), m = {
          mode: e,
          type: "symlink",
          target: i,
          size: 0,
          mtimeMs: Date.now(),
          ino: o
        }, _ = /* @__PURE__ */ new Map();
        return _.set(O, m), j.set(E, _), m;
      }
      _du(i) {
        let s = 0;
        for (const [o, e] of i.entries())
          o === O ? s += e.size : s += this._du(e);
        return s;
      }
      du(i) {
        let s = this._lookup(i);
        return this._du(s);
      }
    }, Ar;
  }
  class Tu {
    constructor(g = "keyval-store", t = "keyval") {
      this.storeName = t, this._dbName = g, this._storeName = t, this._init();
    }
    _init() {
      this._dbp || (this._dbp = new Promise((g, t) => {
        const n = indexedDB.open(this._dbName);
        n.onerror = () => t(n.error), n.onsuccess = () => g(n.result), n.onupgradeneeded = () => {
          n.result.createObjectStore(this._storeName);
        };
      }));
    }
    _withIDBStore(g, t) {
      return this._init(), this._dbp.then((n) => new Promise((u, O) => {
        const l = n.transaction(this.storeName, g);
        l.oncomplete = () => u(), l.onabort = l.onerror = () => O(l.error), t(l.objectStore(this.storeName));
      }));
    }
    _close() {
      return this._init(), this._dbp.then((g) => {
        g.close(), this._dbp = void 0;
      });
    }
  }
  let Rr;
  function $e() {
    return Rr || (Rr = new Tu()), Rr;
  }
  function Kl(N, g = $e()) {
    let t;
    return g._withIDBStore("readwrite", (n) => {
      t = n.get(N);
    }).then(() => t.result);
  }
  function Jl(N, g, t = $e()) {
    return t._withIDBStore("readwrite", (n) => {
      n.put(g, N);
    });
  }
  function Xl(N, g, t = $e()) {
    return t._withIDBStore("readwrite", (n) => {
      const u = n.get(N);
      u.onsuccess = () => {
        n.put(g(u.result), N);
      };
    });
  }
  function Ql(N, g = $e()) {
    return g._withIDBStore("readwrite", (t) => {
      t.delete(N);
    });
  }
  function th(N = $e()) {
    return N._withIDBStore("readwrite", (g) => {
      g.clear();
    });
  }
  function eh(N = $e()) {
    const g = [];
    return N._withIDBStore("readwrite", (t) => {
      (t.openKeyCursor || t.openCursor).call(t).onsuccess = function() {
        this.result && (g.push(this.result.key), this.result.continue());
      };
    }).then(() => g);
  }
  function rh(N = $e()) {
    return N._close();
  }
  const nh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Store: Tu,
    clear: th,
    close: rh,
    del: Ql,
    get: Kl,
    keys: eh,
    set: Jl,
    update: Xl
  }, Symbol.toStringTag, { value: "Module" })), $u = /* @__PURE__ */ Dl(nh);
  var Br, wu;
  function ih() {
    if (wu) return Br;
    wu = 1;
    const N = $u;
    return Br = class {
      constructor(t, n) {
        this._database = t, this._storename = n, this._store = new N.Store(this._database, this._storename);
      }
      saveSuperblock(t) {
        return N.set("!root", t, this._store);
      }
      loadSuperblock() {
        return N.get("!root", this._store);
      }
      readFile(t) {
        return N.get(t, this._store);
      }
      writeFile(t, n) {
        return N.set(t, n, this._store);
      }
      unlink(t) {
        return N.del(t, this._store);
      }
      wipe() {
        return N.clear(this._store);
      }
      close() {
        return N.close(this._store);
      }
    }, Br;
  }
  var Ir, vu;
  function oh() {
    return vu || (vu = 1, Ir = class {
      constructor(g) {
        this._url = g;
      }
      loadSuperblock() {
        return fetch(this._url + "/.superblock.txt").then((g) => g.ok ? g.text() : null);
      }
      async readFile(g) {
        const t = await fetch(this._url + g);
        if (t.status === 200)
          return t.arrayBuffer();
        throw new Error("ENOENT");
      }
      async sizeFile(g) {
        const t = await fetch(this._url + g, { method: "HEAD" });
        if (t.status === 200)
          return t.headers.get("content-length");
        throw new Error("ENOENT");
      }
    }), Ir;
  }
  var Tr, bu;
  function ah() {
    if (bu) return Tr;
    bu = 1;
    const N = $u, g = (t) => new Promise((n) => setTimeout(n, t));
    return Tr = class {
      constructor(n, u) {
        this._id = Math.random(), this._database = n, this._storename = u, this._store = new N.Store(this._database, this._storename), this._lock = null;
      }
      async has({ margin: n = 2e3 } = {}) {
        if (this._lock && this._lock.holder === this._id) {
          const u = Date.now();
          return this._lock.expires > u + n ? !0 : await this.renew();
        } else
          return !1;
      }
      // Returns true if successful
      async renew({ ttl: n = 5e3 } = {}) {
        let u;
        return await N.update("lock", (O) => {
          const i = Date.now() + n;
          return u = O && O.holder === this._id, this._lock = u ? { holder: this._id, expires: i } : O, this._lock;
        }, this._store), u;
      }
      // Returns true if successful
      async acquire({ ttl: n = 5e3 } = {}) {
        let u, O, l;
        if (await N.update("lock", (i) => {
          const s = Date.now(), o = s + n;
          return O = i && i.expires < s, u = i === void 0 || O, l = i && i.holder === this._id, this._lock = u ? { holder: this._id, expires: o } : i, this._lock;
        }, this._store), l)
          throw new Error("Mutex double-locked");
        return u;
      }
      // check at 10Hz, give up after 10 minutes
      async wait({ interval: n = 100, limit: u = 6e3, ttl: O } = {}) {
        for (; u--; ) {
          if (await this.acquire({ ttl: O })) return !0;
          await g(n);
        }
        throw new Error("Mutex timeout");
      }
      // Returns true if successful
      async release({ force: n = !1 } = {}) {
        let u, O, l;
        if (await N.update("lock", (i) => (u = n || i && i.holder === this._id, O = i === void 0, l = i && i.holder !== this._id, this._lock = u ? void 0 : i, this._lock), this._store), await N.close(this._store), !u && !n) {
          if (O) throw new Error("Mutex double-freed");
          if (l) throw new Error("Mutex lost ownership");
        }
        return u;
      }
    }, Tr;
  }
  var $r, _u;
  function sh() {
    return _u || (_u = 1, $r = class {
      constructor(g) {
        this._id = Math.random(), this._database = g, this._has = !1, this._release = null;
      }
      async has() {
        return this._has;
      }
      // Returns true if successful
      async acquire() {
        return new Promise((g) => {
          navigator.locks.request(this._database + "_lock", { ifAvailable: !0 }, (t) => (this._has = !!t, g(!!t), new Promise((n) => {
            this._release = n;
          })));
        });
      }
      // Returns true if successful, gives up after 10 minutes
      async wait({ timeout: g = 6e5 } = {}) {
        return new Promise((t, n) => {
          const u = new AbortController();
          setTimeout(() => {
            u.abort(), n(new Error("Mutex timeout"));
          }, g), navigator.locks.request(this._database + "_lock", { signal: u.signal }, (O) => (this._has = !!O, t(!!O), new Promise((l) => {
            this._release = l;
          })));
        });
      }
      // Returns true if successful
      async release({ force: g = !1 } = {}) {
        this._has = !1, this._release ? this._release() : g && navigator.locks.request(this._database + "_lock", { steal: !0 }, (t) => !0);
      }
    }), $r;
  }
  var Cr, ju;
  function uh() {
    if (ju) return Cr;
    ju = 1;
    const { encode: N, decode: g } = Yl(), t = Vl(), n = Zl(), { ENOENT: u, ENOTEMPTY: O, ETIMEDOUT: l } = Iu(), i = ih(), s = oh(), o = ah(), e = sh(), j = qr();
    return Cr = class {
      constructor() {
        this.saveSuperblock = t(() => {
          this.flush();
        }, 500);
      }
      async init(m, {
        wipe: _,
        url: h,
        urlauto: S,
        fileDbName: x = m,
        db: R = null,
        fileStoreName: c = m + "_files",
        lockDbName: P = m + "_lock",
        lockStoreName: w = m + "_lock"
      } = {}) {
        this._name = m, this._idb = R || new i(x, c), this._mutex = navigator.locks ? new e(m) : new o(P, w), this._cache = new n(m), this._opts = { wipe: _, url: h }, this._needsWipe = !!_, h && (this._http = new s(h), this._urlauto = !!S);
      }
      async activate() {
        if (this._cache.activated) return;
        this._needsWipe && (this._needsWipe = !1, await this._idb.wipe(), await this._mutex.release({ force: !0 })), await this._mutex.has() || await this._mutex.wait();
        const m = await this._idb.loadSuperblock();
        if (m)
          this._cache.activate(m);
        else if (this._http) {
          const _ = await this._http.loadSuperblock();
          this._cache.activate(_), await this._saveSuperblock();
        } else
          this._cache.activate();
        if (!await this._mutex.has())
          throw new l();
      }
      async deactivate() {
        await this._mutex.has() && await this._saveSuperblock(), this._cache.deactivate();
        try {
          await this._mutex.release();
        } catch (m) {
          console.log(m);
        }
        await this._idb.close();
      }
      async _saveSuperblock() {
        this._cache.activated && (this._lastSavedAt = Date.now(), await this._idb.saveSuperblock(this._cache._root));
      }
      _writeStat(m, _, h) {
        let S = j.split(j.dirname(m)), x = S.shift();
        for (let R of S) {
          x = j.join(x, R);
          try {
            this._cache.mkdir(x, { mode: 511 });
          } catch {
          }
        }
        return this._cache.writeStat(m, _, h);
      }
      async readFile(m, _) {
        const { encoding: h } = _;
        if (h && h !== "utf8") throw new Error('Only "utf8" encoding is supported in readFile');
        let S = null, x = null;
        try {
          x = this._cache.stat(m), S = await this._idb.readFile(x.ino);
        } catch (R) {
          if (!this._urlauto) throw R;
        }
        if (!S && this._http) {
          let R = this._cache.lstat(m);
          for (; R.type === "symlink"; )
            m = j.resolve(j.dirname(m), R.target), R = this._cache.lstat(m);
          S = await this._http.readFile(m);
        }
        if (S && ((!x || x.size != S.byteLength) && (x = await this._writeStat(m, S.byteLength, { mode: x ? x.mode : 438 }), this.saveSuperblock()), h === "utf8" ? S = g(S) : S.toString = () => g(S)), !x) throw new u(m);
        return S;
      }
      async writeFile(m, _, h) {
        const { mode: S, encoding: x = "utf8" } = h;
        if (typeof _ == "string") {
          if (x !== "utf8")
            throw new Error('Only "utf8" encoding is supported in writeFile');
          _ = N(_);
        }
        const R = await this._cache.writeStat(m, _.byteLength, { mode: S });
        await this._idb.writeFile(R.ino, _);
      }
      async unlink(m, _) {
        const h = this._cache.lstat(m);
        this._cache.unlink(m), h.type !== "symlink" && await this._idb.unlink(h.ino);
      }
      readdir(m, _) {
        return this._cache.readdir(m);
      }
      mkdir(m, _) {
        const { mode: h = 511 } = _;
        this._cache.mkdir(m, { mode: h });
      }
      rmdir(m, _) {
        if (m === "/")
          throw new O();
        this._cache.rmdir(m);
      }
      rename(m, _) {
        this._cache.rename(m, _);
      }
      stat(m, _) {
        return this._cache.stat(m);
      }
      lstat(m, _) {
        return this._cache.lstat(m);
      }
      readlink(m, _) {
        return this._cache.readlink(m);
      }
      symlink(m, _) {
        this._cache.symlink(m, _);
      }
      async backFile(m, _) {
        let h = await this._http.sizeFile(m);
        await this._writeStat(m, h, _);
      }
      du(m) {
        return this._cache.du(m);
      }
      flush() {
        return this._saveSuperblock();
      }
    }, Cr;
  }
  var Dr, ku;
  function ch() {
    return ku || (ku = 1, Dr = class {
      constructor(g) {
        this.type = g.type, this.mode = g.mode, this.size = g.size, this.ino = g.ino, this.mtimeMs = g.mtimeMs, this.ctimeMs = g.ctimeMs || g.mtimeMs, this.uid = 1, this.gid = 1, this.dev = 1;
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
    }), Dr;
  }
  var Mr, xu;
  function fh() {
    if (xu) return Mr;
    xu = 1;
    const N = uh(), g = ch(), t = qr();
    function n(l, i, ...s) {
      return l = t.normalize(l), (typeof i > "u" || typeof i == "function") && (i = {}), typeof i == "string" && (i = {
        encoding: i
      }), [l, i, ...s];
    }
    function u(l, i, s, ...o) {
      return l = t.normalize(l), (typeof s > "u" || typeof s == "function") && (s = {}), typeof s == "string" && (s = {
        encoding: s
      }), [l, i, s, ...o];
    }
    function O(l, i, ...s) {
      return [t.normalize(l), t.normalize(i), ...s];
    }
    return Mr = class {
      constructor(i, s = {}) {
        this.init = this.init.bind(this), this.readFile = this._wrap(this.readFile, n, !1), this.writeFile = this._wrap(this.writeFile, u, !0), this.unlink = this._wrap(this.unlink, n, !0), this.readdir = this._wrap(this.readdir, n, !1), this.mkdir = this._wrap(this.mkdir, n, !0), this.rmdir = this._wrap(this.rmdir, n, !0), this.rename = this._wrap(this.rename, O, !0), this.stat = this._wrap(this.stat, n, !1), this.lstat = this._wrap(this.lstat, n, !1), this.readlink = this._wrap(this.readlink, n, !1), this.symlink = this._wrap(this.symlink, O, !0), this.backFile = this._wrap(this.backFile, n, !0), this.du = this._wrap(this.du, n, !1), this._deactivationPromise = null, this._deactivationTimeout = null, this._activationPromise = null, this._operations = /* @__PURE__ */ new Set(), i && this.init(i, s);
      }
      async init(...i) {
        return this._initPromiseResolve && await this._initPromise, this._initPromise = this._init(...i), this._initPromise;
      }
      async _init(i, s = {}) {
        await this._gracefulShutdown(), this._activationPromise && await this._deactivate(), this._backend && this._backend.destroy && await this._backend.destroy(), this._backend = s.backend || new N(), this._backend.init && await this._backend.init(i, s), this._initPromiseResolve && (this._initPromiseResolve(), this._initPromiseResolve = null), s.defer || this.stat("/");
      }
      async _gracefulShutdown() {
        this._operations.size > 0 && (this._isShuttingDown = !0, await new Promise((i) => this._gracefulShutdownResolve = i), this._isShuttingDown = !1, this._gracefulShutdownResolve = null);
      }
      _wrap(i, s, o) {
        return async (...e) => {
          e = s(...e);
          let j = {
            name: i.name,
            args: e
          };
          this._operations.add(j);
          try {
            return await this._activate(), await i.apply(this, e);
          } finally {
            this._operations.delete(j), o && this._backend.saveSuperblock(), this._operations.size === 0 && (this._deactivationTimeout || clearTimeout(this._deactivationTimeout), this._deactivationTimeout = setTimeout(this._deactivate.bind(this), 500));
          }
        };
      }
      async _activate() {
        this._initPromise || console.warn(new Error(`Attempted to use LightningFS ${this._name} before it was initialized.`)), await this._initPromise, this._deactivationTimeout && (clearTimeout(this._deactivationTimeout), this._deactivationTimeout = null), this._deactivationPromise && await this._deactivationPromise, this._deactivationPromise = null, this._activationPromise || (this._activationPromise = this._backend.activate ? this._backend.activate() : Promise.resolve()), await this._activationPromise;
      }
      async _deactivate() {
        return this._activationPromise && await this._activationPromise, this._deactivationPromise || (this._deactivationPromise = this._backend.deactivate ? this._backend.deactivate() : Promise.resolve()), this._activationPromise = null, this._gracefulShutdownResolve && this._gracefulShutdownResolve(), this._deactivationPromise;
      }
      async readFile(i, s) {
        return this._backend.readFile(i, s);
      }
      async writeFile(i, s, o) {
        return await this._backend.writeFile(i, s, o), null;
      }
      async unlink(i, s) {
        return await this._backend.unlink(i, s), null;
      }
      async readdir(i, s) {
        return this._backend.readdir(i, s);
      }
      async mkdir(i, s) {
        return await this._backend.mkdir(i, s), null;
      }
      async rmdir(i, s) {
        return await this._backend.rmdir(i, s), null;
      }
      async rename(i, s) {
        return await this._backend.rename(i, s), null;
      }
      async stat(i, s) {
        const o = await this._backend.stat(i, s);
        return new g(o);
      }
      async lstat(i, s) {
        const o = await this._backend.lstat(i, s);
        return new g(o);
      }
      async readlink(i, s) {
        return this._backend.readlink(i, s);
      }
      async symlink(i, s) {
        return await this._backend.symlink(i, s), null;
      }
      async backFile(i, s) {
        return await this._backend.backFile(i, s), null;
      }
      async du(i) {
        return this._backend.du(i);
      }
      async flush() {
        return this._backend.flush();
      }
    }, Mr;
  }
  var Nr, Ou;
  function lh() {
    if (Ou) return Nr;
    Ou = 1;
    const N = Ml(), g = fh();
    function t(n, u) {
      return typeof n == "function" && (u = n), u = N(u), [(...l) => u(null, ...l), u];
    }
    return Nr = class {
      constructor(...u) {
        this.promises = new g(...u), this.init = this.init.bind(this), this.readFile = this.readFile.bind(this), this.writeFile = this.writeFile.bind(this), this.unlink = this.unlink.bind(this), this.readdir = this.readdir.bind(this), this.mkdir = this.mkdir.bind(this), this.rmdir = this.rmdir.bind(this), this.rename = this.rename.bind(this), this.stat = this.stat.bind(this), this.lstat = this.lstat.bind(this), this.readlink = this.readlink.bind(this), this.symlink = this.symlink.bind(this), this.backFile = this.backFile.bind(this), this.du = this.du.bind(this), this.flush = this.flush.bind(this);
      }
      init(u, O) {
        return this.promises.init(u, O);
      }
      readFile(u, O, l) {
        const [i, s] = t(O, l);
        this.promises.readFile(u, O).then(i).catch(s);
      }
      writeFile(u, O, l, i) {
        const [s, o] = t(l, i);
        this.promises.writeFile(u, O, l).then(s).catch(o);
      }
      unlink(u, O, l) {
        const [i, s] = t(O, l);
        this.promises.unlink(u, O).then(i).catch(s);
      }
      readdir(u, O, l) {
        const [i, s] = t(O, l);
        this.promises.readdir(u, O).then(i).catch(s);
      }
      mkdir(u, O, l) {
        const [i, s] = t(O, l);
        this.promises.mkdir(u, O).then(i).catch(s);
      }
      rmdir(u, O, l) {
        const [i, s] = t(O, l);
        this.promises.rmdir(u, O).then(i).catch(s);
      }
      rename(u, O, l) {
        const [i, s] = t(l);
        this.promises.rename(u, O).then(i).catch(s);
      }
      stat(u, O, l) {
        const [i, s] = t(O, l);
        this.promises.stat(u).then(i).catch(s);
      }
      lstat(u, O, l) {
        const [i, s] = t(O, l);
        this.promises.lstat(u).then(i).catch(s);
      }
      readlink(u, O, l) {
        const [i, s] = t(O, l);
        this.promises.readlink(u).then(i).catch(s);
      }
      symlink(u, O, l) {
        const [i, s] = t(l);
        this.promises.symlink(u, O).then(i).catch(s);
      }
      backFile(u, O, l) {
        const [i, s] = t(O, l);
        this.promises.backFile(u, O).then(i).catch(s);
      }
      du(u, O) {
        const [l, i] = t(O);
        this.promises.du(u).then(l).catch(i);
      }
      flush(u) {
        const [O, l] = t(u);
        this.promises.flush().then(O).catch(l);
      }
    }, Nr;
  }
  var hh = lh();
  const Eu = /* @__PURE__ */ Cl(hh), Cu = new Ur(zr.logging.fsManagerES6);
  function ue(...N) {
    Cu.consoleDotLog("[fsManagerES6] ", ...N);
  }
  function or(...N) {
    Cu.consoleDotError("[fsManagerES6] ", ...N);
  }
  ue("Loading fsmanagerES6.");
  class dh {
    constructor(g = {}) {
      this.fsInstances = /* @__PURE__ */ new Map(), this.initializationLocks = /* @__PURE__ */ new Map(), this.debug = !0, this.options = g;
    }
    _log(...g) {
      this.debug && ue("[fsManager]", ...g);
    }
    _error(...g) {
      or("[fsManager]", ...g);
    }
    async initializeFS(g, t) {
      const n = `${g}-${t}`;
      this._log(`Initializing FS: ${n}`);
      try {
        if (ue("Initializing."), this.fsInstances.has(n))
          return this._log(`FS ${n} already exists`), this.fsInstances.get(n);
        let u;
        if (t === "memory") {
          ue(`Creating memory FS for ${n}`);
          const O = new $l(this.options, g);
          ue(`Memory backend created for ${n}`), u = new Eu(g, { backend: O }), ue(`Memory FS created for ${n}`), this._log(`Created memory FS with backend for ${n}`);
        } else if (t === "idb")
          u = new Eu(g), this._log(`Created IDB FS for ${n}`);
        else
          throw new Error(`Unsupported FS type: ${t}`);
        return this.fsInstances.set(n, u), u;
      } catch (u) {
        throw this._error(`Failed to initialize ${n}:`, u), u;
      }
    }
    async getFS(g, t) {
      const n = `${g}-${t}`;
      if (this._log(`Requesting FS: ${n}`), this.initializationLocks.has(n))
        return this._log(`Waiting for existing initialization of ${n}`), this.initializationLocks.get(n);
      const u = (async () => {
        try {
          return this.fsInstances.has(n) ? this.fsInstances.get(n) : await this.initializeFS(g, t);
        } finally {
          this.initializationLocks.delete(n);
        }
      })();
      return this.initializationLocks.set(n, u), u;
    }
    async deleteFS(g, t) {
      const n = `${g}-${t}`;
      if (!this.fsInstances.has(n)) {
        console.warn(`File system ${n} does not exist. Nothing to delete.`);
        return;
      }
      if (t === "idb")
        try {
          await this.deleteIndexedDB(g), ue(`IndexedDB file system ${n} deleted successfully.`);
        } catch (u) {
          throw or(`Error deleting IndexedDB file system ${n}:`, u), u;
        }
      else if (t === "memory")
        ue(`Memory file system ${n} deleted successfully.`);
      else
        throw new Error(`Unsupported file system type: ${t}`);
      this.fsInstances.delete(n);
    }
    async deleteIndexedDB(g) {
      return new Promise((t, n) => {
        const u = indexedDB.deleteDatabase(g);
        u.onsuccess = () => {
          ue(`Deleted database ${g} successfully`), t();
        }, u.onerror = (O) => {
          or(`Error deleting database ${g}:`, O), n(O);
        }, u.onblocked = () => {
          console.warn(`Delete database ${g} blocked`);
        };
      });
    }
    async getFileStoreNames(g, t) {
      const n = `${g}-${t}`;
      if (!this.fsInstances.has(n))
        throw new Error(`File system ${n} not found. Call initializeFS first.`);
      if (t === "idb")
        try {
          const u = await this.getFileStoresFromDatabases();
          return ue(`File store names for ${n}:`, u), u;
        } catch (u) {
          throw or(`Error retrieving file store names for ${n}:`, u), u;
        }
      else {
        if (t === "memory")
          return ue(`Memory file system ${n} does not have persistent file stores.`), [];
        throw new Error(`Unsupported file system type: ${t}`);
      }
    }
    async processDatabaseList(g) {
      const t = [];
      for (const n of g) {
        const u = typeof n == "string" ? n : n.name, l = (await this.openDatabase(u)).objectStoreNames, i = Array.from(l).filter((s) => s.startsWith("fs_")).map((s) => ({ database: u, fileStore: s }));
        t.push(...i);
      }
      return ue("Processing database list:", t), t;
    }
    async openDatabase(g) {
      return ue("Opening database:", g), new Promise((t, n) => {
        const u = indexedDB.open(g);
        u.onsuccess = (O) => {
          const l = O.target.result;
          t(l);
        }, u.onerror = (O) => {
          n(`Error opening database ${g}: ${O.target.error}`);
        };
      });
    }
    async getFileStoresFromDatabases() {
      return new Promise((g, t) => {
        const n = indexedDB.webkitGetDatabaseNames ? indexedDB.webkitGetDatabaseNames() : indexedDB.databases ? indexedDB.databases() : null;
        if (!n) {
          t("Your browser does not support retrieving a list of IndexedDB databases");
          return;
        }
        n instanceof Promise ? n.then((u) => {
          this.processDatabaseList(u).then((O) => g(O)).catch((O) => t(O));
        }).catch((u) => t(u)) : (n.onsuccess = async (u) => {
          const O = u.target.result;
          try {
            const l = await this.processDatabaseList(O);
            g(l);
          } catch (l) {
            t(l);
          }
        }, n.onerror = (u) => {
          t(`Error retrieving database list: ${u.target.error}`);
        });
      });
    }
  }
  const ph = self.__WB_MANIFEST;
  console.log("Service Worker loaded with manifest:", ph);
  let ge = "", me = "", ce = "/", tr = 1, Le = Al, Oe = "origin", Nt = "main", qe = "http://localhost:9000", Hr = {}, ar = {}, Du = 0, Xt, Gt = null, Yt = {
    cloneCount: 0,
    pushCount: 0,
    pullCount: 0,
    fetchCount: 0,
    ffCount: 0
  }, Wr = !0, be = {};
  const gh = new dh();
  function At(...N) {
    Wr && console.log(...N);
  }
  function Ht(...N) {
    Wr && (console.error(...N), console.trace());
  }
  const He = "cache-v1", mh = [], Pu = new URL(self.registration.scope).pathname.split("/")[1], Fr = Pu ? `/${Pu}/` : "/";
  self.addEventListener("install", (N) => {
    self.skipWaiting(), At("install"), N.waitUntil(
      caches.open(He).then((g) => (At("Opened cache"), g.addAll(mh))).catch((g) => {
        Ht("Failed to cache", g);
      })
    );
  });
  self.addEventListener("activate", (N) => (N.waitUntil(
    (async () => {
      ge = "", me = "", ce = "/", tr = 1, Oe = "origin", Nt = "main", Hr = {}, ar = {}, Du = 0, Gt = new Rl("fs"), Yt = {
        cloneCount: 0,
        pushCount: 0,
        pullCount: 0,
        fetchCount: 0,
        ffCount: 0,
        listServerRefsCount: 0
      }, Wr = !0, be = {};
      const g = await caches.keys();
      await Promise.all(
        g.map((t) => {
          if (t !== He)
            return caches.delete(t);
        })
      );
    })()
  ), self.clients.claim()));
  self.addEventListener("message", (N) => {
    N.data.action === "skipWaiting" && self.skipWaiting();
  });
  self.broadcastChannelInitialized = !1;
  self.broadcastChannelInitialized || (Xt = new BroadcastChannel("worker-channel"), Xt.onmessage = async function(N) {
    const g = N.data;
    At(g);
    try {
      switch (g.operation) {
        case "setAuthParams":
          await wh(g.data);
          break;
        case "setDir":
          await vh(g.data);
          break;
        case "setRepoDir":
          await _h(g.data);
          break;
        case "setDepth":
          await jh(g.data);
          break;
        case "setRemote":
          await kh(g.data);
          break;
        case "setRef":
          await bh(g.data);
          break;
        case "setSettingsAddresses":
          await xh(g.data);
          break;
        case "passFsArgs":
          await Oh(g.data);
          break;
        case "memorySync":
          await Eh(g.data);
          break;
        default:
          await yh(g);
          break;
      }
    } catch (t) {
      throw Ht(`${g.operation} failed`, t), new Error(t);
    }
  }, self.broadcastChannelInitialized = !0);
  async function yh(N) {
    Ht("Unhandled message operation:", N.operation);
  }
  async function wh(N) {
    ge !== N.username || me !== N.password ? (ge = N.username || "", me = N.password || "", At("handlesetauthparame: ", N), Xt.postMessage({ operation: "setAuthParams", success: !0 })) : Xt.postMessage({ operation: "setAuthParams", success: !0 });
  }
  async function vh(N) {
    ce !== N ? (ce = N, Xt.postMessage({ operation: "setDir", success: !0 })) : Xt.postMessage({ operation: "setDir", success: !0 });
  }
  async function bh(N) {
    Nt !== N ? (Nt = N, Xt.postMessage({ operation: "setRef", success: !0 })) : Xt.postMessage({ operation: "setRef", success: !0 });
  }
  async function _h(N) {
    ce !== N ? (ce = N, Xt.postMessage({ operation: "setRepoDir", success: !0 })) : Xt.postMessage({ operation: "setRepoDir", success: !0 });
  }
  async function jh(N) {
    tr !== N ? (tr = N, Xt.postMessage({ operation: "setDepth", success: !0 })) : Xt.postMessage({ operation: "setDepth", success: !0 });
  }
  async function kh(N) {
    Oe !== N ? (Oe = N, Xt.postMessage({ operation: "setRemote", success: !0 })) : Xt.postMessage({ operation: "setRemote", success: !0 });
  }
  async function xh(N) {
    ar !== N ? (ar = N, Xt.postMessage({ operation: "setSettingsAddresses", success: !0 })) : Xt.postMessage({ operation: "setSettingsAddresses", success: !0 });
  }
  async function Oh(N) {
    try {
      be !== N ? (be = N, At("fsArgs", be), Gt = await gh.getFS(be.fsName, be.fsType), Xt.postMessage({ operation: "passFsArgs", success: !0 })) : Xt.postMessage({ operation: "passFsArgs", success: !0 });
    } catch (g) {
      Ht("some error happened in passFsArgs: ", g);
    }
  }
  async function Eh(N) {
    At("handle sync yoo hoo: ", N);
  }
  async function Ph(N) {
    try {
      At("pathname", N);
      const g = await Gt.promises.readFile(N, "utf8");
      if (g)
        return At("fetch content", g), g;
    } catch (g) {
      throw new Error("Unable to fetch file content: " + g);
    }
  }
  self.addEventListener("fetch", (N) => {
    try {
      const g = new URL(N.request.url);
      if (console.log(`Fetching: ${g.pathname}`), g.pathname === "/git") {
        N.respondWith(
          Ah(N.request).catch((n) => (console.error("Error handling Git request:", n), new Response(
            JSON.stringify({ error: "Git request failed", details: n.message || n.toString() }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          )))
        );
        return;
      }
      const t = Fr && g.pathname.startsWith(Fr) ? g.pathname.slice(Fr.length - 1) : g.pathname;
      if (console.log(`Extracted path: ${t}`), ar[t]) {
        console.log("Matched settings file path:", t), N.respondWith(
          Ph(t).then(
            (n) => new Response(n, {
              headers: { "Content-Type": "application/json" }
            })
          ).catch((n) => (console.error("Error reading file:", n), new Response(
            JSON.stringify({ error: "File not found or inaccessible", details: n.message || n.toString() }),
            { status: 404, headers: { "Content-Type": "application/json" } }
          )))
        );
        return;
      }
      N.respondWith(
        fetch(N.request).then((n) => n.ok ? n : (console.error("HTTP error response:", n.status), new Response(
          JSON.stringify({ error: "HTTP error", status: n.status }),
          { status: n.status, headers: { "Content-Type": "application/json" } }
        ))).catch((n) => (console.error("Network fetch failed:", n), new Response(
          JSON.stringify({ error: "Network error", details: n.message || n.toString() }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        )))
      );
    } catch (g) {
      console.error("Error in fetch handler:", g), N.respondWith(
        new Response(
          JSON.stringify({ error: "Unexpected error", details: g.message || g.toString() }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        )
      );
    }
  });
  class Sh {
    constructor() {
      this.queue = [], this.locked = !1;
    }
    async lock() {
      return new Promise((g) => {
        const t = () => {
          this.locked = !0, g();
        };
        this.locked ? this.queue.push(t) : t();
      });
    }
    unlock() {
      this.queue.length > 0 ? this.queue.shift()() : this.locked = !1;
    }
  }
  const fe = new Sh();
  async function Ah(N) {
    try {
      const g = await N.json().catch(() => {
        throw new Error("Invalid JSON in request body");
      }), { operation: t, args: n } = g;
      if (!t)
        return new Response(
          JSON.stringify({ error: "Missing operation field" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      let u;
      try {
        switch (t) {
          case "clone":
            u = await Nu(n);
            break;
          case "pull":
            u = await Uu(n);
            break;
          case "push":
            u = await Lu(n);
            break;
          case "fetch":
            u = await qu(n);
            break;
          case "fastForward":
            u = await zu(n);
            break;
          case "listServerRefs":
            u = await Mu(n);
            break;
          default:
            return new Response(
              JSON.stringify({ error: "Invalid operation" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
      } catch (O) {
        return console.error(`Error executing ${t}:`, O), new Response(
          JSON.stringify({
            error: `Error executing ${t}`,
            details: O.message || O.toString()
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify(u),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (g) {
      return console.error("Error in handleGitRequest:", g), new Response(
        JSON.stringify({ error: "Unexpected error", details: g.message || g.toString() }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  async function Rh({ dir: N, ref: g, branch: t }) {
    var n = /^HEAD~([0-9]+)$/, u = g.match(n);
    if (u) {
      var O = +u[1], l = await (void 0)({ fs: Gt, dir: N, depth: O + 1 }), i = l.pop().oid;
      return new Promise((s, o) => {
        Gt.writeFile(N + `/.git/refs/heads/${t}`, i, (e) => {
          if (e)
            return o(e);
          Gt.unlink(N + "/.git/index", (j) => {
            if (j)
              return o(j);
            (void 0)({ dir: N, fs: Gt, ref: t, force: !0 }).then(s);
          });
        });
      });
    }
    return Promise.reject(`Wrong ref ${g}`);
  }
  async function We(N, g, t = 2) {
    let n = 0, u = 1e3;
    for (; n <= t; )
      try {
        return await N(g);
      } catch (O) {
        if (O.message.includes("Failed to fetch") || O.message.includes("CORS") || O.message.includes("HTTP Error")) {
          if (n++, n > t) throw new Error("Max retries reached for operation.");
          At(`Network error, Retrying operation in ${u / 1e3} seconds... (Attempt ${n})`), await new Promise((l) => setTimeout(l, u)), u *= 2;
        } else
          throw O;
      }
  }
  function Ge(N, g) {
    return !N && !g ? (At("No username or password provided. Returning empty headers."), {}) : {
      authorization: `Basic ${btoa(`${N}:${g}`)}`
    };
  }
  async function Mu(N) {
    return At("listServerRefs args", N), await We(async (g) => {
      Yt.listServerRefsCount++, await fe.lock();
      try {
        if (At("Entering listServerRefs function with arguments:", g), !g.url)
          throw new Error("URL parameter is required for listServerRefs");
        const t = await (void 0)({
          ...g,
          fs: Gt,
          http: Le,
          dir: ce,
          corsProxy: qe,
          remote: g.remote || Oe,
          // Fallback to global remote
          headers: Ge(ge, me),
          onAuth() {
            return de.fill();
          },
          onAuthFailure() {
            return de.rejected();
          }
        });
        return At("ListServerRefs successful. Result:", t), { success: !0, refs: t };
      } catch (t) {
        if (t?.message?.includes("Could not find") && t?.code === "NotFoundError") {
          if (!await Ye(Mu, g, Yt.listServerRefsCount))
            throw t;
          return Yt.listServerRefsCount = 0, { success: !0, message: "listServerRefs was successful" };
        }
        return Ht("Error occurred during listServerRefs operation:", t), { success: !1, error: t.message };
      } finally {
        At("Exiting listServerRefs function."), fe.unlock();
      }
    }, N);
  }
  async function Nu(N) {
    return At("entering clone with : ", N), await We(async (g) => {
      At("Entering clone function with arguments:", g), Yt.cloneCount++;
      let t = {};
      await fe.lock();
      try {
        if (t = await Ih(be.fsName), t)
          await Th(t), await Rh({ dir: ce, ref: "HEAD~1", branch: Nt }), await Su("clone (from cache)", { fsName: be.fsName }), At("log", await Ch()), t = { isCacheUsed: !0, ref: Nt };
        else {
          const n = await (void 0)({
            ...g,
            fs: Gt,
            cache: Hr,
            http: Le,
            dir: ce,
            remote: Oe,
            ref: Nt,
            corsProxy: qe,
            depth: tr,
            headers: Ge(ge, me),
            onAuth() {
              return de.fill();
            },
            onAuthFailure() {
              return de.rejected();
            }
          });
          if (Du) {
            const u = await Fu();
            await Bh(be.fsName, u);
          }
          t = { isCacheUsed: !1, ref: Nt }, await Su("clone", { fsName: be.fsName, result: n });
        }
        return { success: !0, message: "The repo has successfully cloned", data: t };
      } catch (n) {
        if (Ht("Clone failed with error:", n), n?.message?.includes("Could not find") && n?.code === "NotFoundError") {
          if (!await Ye(Nu, g, Yt.cloneCount))
            throw n;
          return Yt.cloneCount = 0, t = { isCacheUsed: !1, ref: Nt }, { success: !0, message: "The repo has successfully cloned", data: t };
        } else throw n?.response?.status === 500 ? (Ht("Server responded with 500 Internal Server Error"), new Error("Internal Server Error: The server encountered an error.")) : typeof n == "object" ? (Ht("Error properties:", Object.keys(n)), new Error(n || "An unknown error occurred during the clone operation")) : (Ht("Unknown error:", n), new Error("An unknown error occurred during the clone operation"));
      } finally {
        fe.unlock();
      }
    }, N);
  }
  async function Bh(N, g) {
    try {
      const t = await caches.open(He), n = {};
      At("fl", g);
      for (const [O, l] of Object.entries(g)) {
        At("fn, fp", O, l);
        const i = await Gt.promises.stat(l);
        if (i.isDirectory())
          n[l] = "";
        else if (i.isFile()) {
          const s = await Gt.promises.readFile(l, "utf8");
          n[l] = s;
        }
      }
      At("filesWithContent", n);
      const u = new Response(JSON.stringify(n), {
        headers: { "Content-Type": "application/json" }
      });
      await t.put(N, u), At("File list and contents cached successfully", u);
    } catch (t) {
      Ht("Error caching file list and contents:", t);
    }
  }
  async function Fu(N = ce) {
    try {
      let g = N, t = await Gt.promises.readdir(N), n = {};
      At("files", t), n[N] = N;
      for (const u of t) {
        At("file", u);
        let O = g !== "/" ? `${g}/${u}` : `${g}${u}`;
        (await Gt.promises.lstat(O)).isDirectory() ? (At("fullPath", O), n = { ...n, ...await Fu(O) }) : (At("result", n), n[O] = O);
      }
      return n;
    } catch (g) {
      throw Ht("Error listing files:", g), g;
    }
  }
  async function Ih(N) {
    try {
      const t = await (await caches.open(He)).match(N);
      if (t) {
        const n = await t.json();
        return At("Files and contents fetched from cache:", n), n;
      } else
        return At("No cached file list found"), null;
    } catch (g) {
      return Ht("Error fetching cached file list and contents:", g), null;
    }
  }
  async function Th(N) {
    for (const [g, t] of Object.entries(N)) {
      const n = g.split("/").slice(0, -1).join("/");
      n && await $h(Gt, n), t === "" ? (await Gt.promises.mkdir(g, { recursive: !0 }), At(`Directory created: ${g}`)) : await Gt.promises.writeFile(g, t);
    }
    At("All files and contents have been written to IndexedDB using LightningFS.");
  }
  async function $h(N, g) {
    const t = g.split("/").filter((u) => u);
    let n = "";
    for (const u of t) {
      n += `/${u}`;
      try {
        await N.promises.mkdir(n), At(`Directory created: ${n}`);
      } catch (O) {
        if (O.code !== "EEXIST")
          throw Ht(`Error creating directory: ${n}`, O), O;
      }
    }
  }
  const de = {
    async fill() {
      return At("authenticate", ge, me), { username: ge, password: me };
    },
    async rejected() {
      const N = new Error("Authentication rejected");
      throw At("Authentication rejected", N), N;
    }
  };
  async function Uu(N) {
    return await We(async (g) => {
      Yt.pullCount++;
      let t = {};
      await fe.lock();
      try {
        if (At("Entering pull function with arguments:", g), !Nt)
          throw new Error("Reference (ref) is not defined.");
        At("Using reference (ref):", Nt);
        const n = await (void 0)({
          ...g,
          fs: Gt,
          http: Le,
          dir: ce,
          corsProxy: qe,
          remote: Oe,
          remoteRef: Nt,
          fastForward: !0,
          forced: !0,
          singleBranch: !0,
          headers: Ge(ge, me),
          onAuth() {
            return de.fill();
          },
          onAuthFailure() {
            return de.rejected();
          }
        });
        return t = { ref: Nt }, At("Pull successful. Result:", n), { success: !0, message: n, data: t };
      } catch (n) {
        if (n?.message?.includes("Could not find") && n?.code === "NotFoundError") {
          if (!await Ye(Uu, g, Yt.pullCount))
            throw n;
          return Yt.pullCount = 0, t = { ref: Nt }, { success: !0, message: "pull was successful", data: t };
        }
        throw Ht("Error occurred during pull operation:", n), new Error(`Pull failed: ${n}`);
      } finally {
        At("Exiting pull function."), fe.unlock();
      }
    }, N);
  }
  async function zu(N) {
    return await We(async (g) => {
      Yt.ffCount++;
      let t = {};
      await fe.lock();
      try {
        if (At("Entering fastForward function with arguments:", g), !Nt)
          throw new Error("Reference (ref) is not defined.");
        const n = await (void 0)({
          ...g,
          fs: Gt,
          cache: Hr,
          http: Le,
          dir: ce,
          remote: Oe,
          corsProxy: qe,
          ref: Nt,
          remoteref: Nt,
          forced: !0,
          singleBranch: !1,
          headers: Ge(ge, me),
          onAuth() {
            return de.fill();
          },
          onAuthFailure() {
            return de.rejected();
          }
        });
        return t = { ref: Nt }, At("FastForward pull successful. Result:", n), { success: !0, message: n, data: t };
      } catch (n) {
        if (n?.message?.includes("Could not find") && n?.code === "NotFoundError") {
          if (!await Ye(zu, g, Yt.ffCount))
            throw n;
          return Yt.ffCount = 0, t = { ref: Nt }, { success: !0, message: "FastForward was successful", data: t };
        }
        throw Ht("Error occurred during fastForward operation:", n), new Error(`FastForward pull failed: ${n}`);
      } finally {
        At("Exiting fastForward function."), fe.unlock();
      }
    }, N);
  }
  async function Lu(N) {
    return await We(async (g) => {
      Yt.pushCount++;
      let t = {};
      await fe.lock();
      try {
        if (At("Entering push function with arguments:", g), !Nt)
          throw new Error("Reference (ref) is not defined.");
        const n = await (void 0)({
          ...g,
          fs: Gt,
          http: Le,
          dir: ce,
          corsProxy: qe,
          remote: Oe,
          ref: Nt,
          force: !0,
          headers: Ge(ge, me),
          onAuth() {
            return de.fill();
          },
          onAuthFailure() {
            return de.rejected();
          }
        });
        return t = { ref: Nt }, At("Push successful. Result:", n), { success: !0, message: "Push was successful", data: t };
      } catch (n) {
        if (n?.message?.includes("Could not find") && n?.code === "NotFoundError") {
          if (!await Ye(Lu, g, Yt.pushCount))
            throw n;
          return Yt.pushCount = 0, t = { ref: Nt }, { success: !0, message: "Push was successful", data: t };
        }
        Ht("Error occurred during push operation:", n);
      } finally {
        At("Exiting push function."), fe.unlock();
      }
    }, N);
  }
  async function qu(N) {
    return await We(async (g) => {
      Yt.fetchCount++;
      let t = {};
      await fe.lock();
      try {
        if (At("Entering doFetch function with arguments:", g), !Nt)
          throw new Error("Reference (ref) is not defined.");
        const n = await (void 0)({
          ...g,
          fs: Gt,
          http: Le,
          dir: ce,
          corsProxy: qe,
          ref: Nt,
          remote: Oe,
          depth: tr,
          singleBranch: !1,
          tags: !1,
          headers: Ge(ge, me),
          onAuth() {
            return de.fill();
          },
          onAuthFailure() {
            return de.rejected();
          }
        });
        return t = { ref: Nt }, At("Fetch successful. Result:", n), { success: !0, message: "Fetch was successful", data: t };
      } catch (n) {
        if (n?.message?.includes("Could not find") && n?.code === "NotFoundError") {
          if (!await Ye(qu, g, Yt.fetchCount))
            throw n;
          return Yt.fetchCount = 0, t = { ref: Nt }, { success: !0, message: "The repo has successfully cloned", data: t };
        }
        throw Ht("Error occurred during fetch operation:", n), new Error(`Fetch failed: ${n}`);
      } finally {
        At("Exiting doFetch function."), fe.unlock();
      }
    }, N);
  }
  async function Su(N, g) {
    try {
      const t = await caches.open(He);
      let n = await caches.match("log"), u = n ? await n.json() : [];
      const O = (/* @__PURE__ */ new Date()).toISOString(), l = { action: N, data: g, timestamp: O };
      u.push(l);
      let i = new Blob([JSON.stringify(u)]).size;
      const s = 5 * 1024;
      for (; i > s; )
        u.shift(), i = new Blob([JSON.stringify(u)]).size;
      const o = new Response(JSON.stringify(u), { headers: { "Content-Type": "application/json" } });
      await t.put("log", o), At(`Logged action: ${N} at ${O}`, l);
    } catch (t) {
      Ht("Error logging data to cache:", t);
    }
  }
  async function Ch() {
    try {
      const g = await (await caches.open(He)).match("log");
      if (g) {
        const t = await g.json();
        return At("Retrieved logs from cache:", t), t;
      } else
        return At("No logs found in cache."), [];
    } catch (N) {
      return Ht("Error retrieving logs from cache:", N), [];
    }
  }
  async function Ye(N, g, t) {
    At(`Attempt ${t + 1}: Branch "${Nt}" not found. Attempting to checkout to the other branch.`);
    try {
      if (t < 2)
        return fe.unlock(), Nt = Nt === "main" ? "master" : Nt === "master" ? "main" : void 0, Nt === void 0 ? (Ht("No default branch name found, you should set it manually!"), !1) : await N(g, t + 1);
      throw Ht("Exceeded the maximum number of retries. Please check the branch name manually."), Yt = {
        cloneCount: 0,
        pushCount: 0,
        pullCount: 0,
        fetchCount: 0,
        ffCount: 0
      }, new Error("Exceeded the maximum number of retries.");
    } catch (n) {
      throw Ht(`Checkout to branch "${Nt}" failed:`, n), n;
    }
  }
});
export default Dh();
//# sourceMappingURL=service-worker.js.map
