class o {
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
const s = {
  corsProxy: "http://localhost:9000/",
  dir: "/",
  logging: {
    vfs: !0,
    kfs: !0,
    IDBFs: !0,
    gitWorker: !0,
    fsType: !0,
    fsManagerES6: !0,
    fsManagerGlobal: !0,
    swUtils: !0,
    memoryFS: !0,
    memoryBackendES6: !0,
    memoryBackendGlobal: !0,
    VFSutils: !0,
    ServiceWorkerRegistration: !0,
    storageUtils: !0,
    supportChecker: !0,
    dotGit: !0,
    GitAuth: !0,
    serviceWorker: !0,
    workerPool: !0
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
};
export {
  o as L,
  s as c
};
//# sourceMappingURL=configES6-cRERl-FC.js.map
