class c {
  constructor(e = !0, t = !1) {
    this.on = e, this.trace = t;
  }
  consoleDotLog(...e) {
    this.on && (console.log(...e), this.trace && console.trace());
  }
  consoleDotError(...e) {
    this.on && (console.error(...e), this.trace && console.trace());
  }
}
let n = null;
const s = {
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
}, o = {
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
let g = null;
async function l() {
  try {
    const r = await fetch("/config.json");
    if (!r.ok)
      throw new Error("Config file not found");
    const e = await r.json();
    if (e.logging) {
      for (const t in s)
        if (e.logging.hasOwnProperty(t)) {
          const a = e.logging[t];
          s[t].forEach((i) => {
            e.logging.hasOwnProperty(i) && (e.logging[i] = a);
          });
        }
    }
    return {
      ...o,
      ...e,
      logging: {
        ...o.logging,
        ...e.logging || {}
      },
      versioning: {
        ...o.versioning,
        ...e.versioning || {}
      },
      merging: {
        ...o.merging,
        ...e.merging || {}
      }
    };
  } catch (r) {
    return console.warn("Using default configuration:", r.message), o;
  }
}
g = l().then((r) => (n = r, n)).catch((r) => (console.error("Failed to load config:", r), n = o, n));
async function u() {
  return await g, n;
}
export {
  c as L,
  u as g
};
//# sourceMappingURL=configES6-CEaFOXV3.js.map
