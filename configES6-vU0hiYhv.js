class s {
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
const r = {
  corsProxy: "http://localhost:10000/",
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
};
async function n() {
  if (r === null)
    throw new Error("Configuration has not been set yet.");
  return r;
}
export {
  s as L,
  r as c,
  n as g
};
//# sourceMappingURL=configES6-vU0hiYhv.js.map
