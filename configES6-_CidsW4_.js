class g {
  constructor(r = !0, t = !1) {
    this.on = r, this.trace = t;
  }
  consoleDotLog(...r) {
    this.on && (console.log(...r), this.trace && console.trace());
  }
  consoleDotError(...r) {
    this.on && (console.error(...r), this.trace && console.trace());
  }
}
const e = {
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
    serviceWorker: !0,
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
    onConflict: "remote"
    // remote, local, combine
  }
}, n = {
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
};
async function l(s) {
  if (e === null)
    throw new Error("Configuration has already been set and cannot be modified.");
  for (const r in s)
    if (r === "logging") {
      const t = s.logging;
      for (const o in n)
        if (t.hasOwnProperty(o)) {
          const a = t[o];
          n[o].forEach((i) => {
            e.logging.hasOwnProperty(i) && (e.logging[i] = a);
          });
        }
      for (const o in t)
        e.logging.hasOwnProperty(o) && !n.hasOwnProperty(o) && (e.logging[o] = t[o]);
    } else if (e.hasOwnProperty(r))
      e[r] = s[r];
    else
      throw new Error(`Invalid configuration key: ${r}`);
}
async function c() {
  if (e === null)
    throw new Error("Configuration has not been set yet.");
  return e;
}
export {
  g as L,
  e as c,
  c as g,
  l as s
};
//# sourceMappingURL=configES6-_CidsW4_.js.map
