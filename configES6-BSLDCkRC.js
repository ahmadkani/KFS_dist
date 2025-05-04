class l {
  constructor(e = !0, s = !1) {
    this.on = e, this.trace = s;
  }
  consoleDotLog(...e) {
    this.on && (console.log(...e), this.trace && console.trace());
  }
  consoleDotError(...e) {
    this.on && (console.error(...e), this.trace && console.trace());
  }
}
const o = {
  corsProxy: "http://localhost:9000/",
  dir: "/",
  logging: {
    vfs: !1,
    kfs: !1,
    IDBFs: !1,
    gitWorker: !1,
    fsType: !1,
    fsManagerES6: !1,
    fsManagerGlobal: !1,
    swUtils: !1,
    memoryFS: !1,
    memoryBackendES6: !1,
    memoryBackendGlobal: !1,
    VFSutils: !1,
    ServiceWorkerRegistration: !1,
    serviceWorker: !1,
    storageUtils: !1,
    supportChecker: !1,
    dotGit: !1,
    GitAuth: !1,
    serviceWorker: !1,
    WorkerPool: !1
  },
  versioning: {
    strategy: "immediate",
    interval: 10,
    number: 5
  },
  merging: {
    strategy: "immediate",
    interval: 60
  }
}, a = {
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
    "GitAuth",
    "WorkerPool"
  ],
  storage: [
    "memoryFS",
    "memoryBackendES6",
    "memoryBackendGlobal",
    "IDBFs"
  ]
};
async function g(t) {
  if (o === null)
    throw new Error("Configuration has already been set and cannot be modified.");
  for (const e in t)
    if (e === "logging") {
      const s = t.logging;
      for (const r in a)
        if (s.hasOwnProperty(r)) {
          const i = s[r];
          a[r].forEach((n) => {
            o.logging.hasOwnProperty(n) && (o.logging[n] = i);
          });
        }
      for (const r in s)
        o.logging.hasOwnProperty(r) && !a.hasOwnProperty(r) && (o.logging[r] = s[r]);
    } else if (o.hasOwnProperty(e))
      o[e] = t[e];
    else
      throw new Error(`Invalid configuration key: ${e}`);
}
async function f() {
  if (o === null)
    throw new Error("Configuration has not been set yet.");
  return o;
}
export {
  l as L,
  o as c,
  f as g,
  g as s
};
//# sourceMappingURL=configES6-BSLDCkRC.js.map
