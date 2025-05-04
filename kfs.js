import { L as F, c as p, g as j } from "./configES6-BSLDCkRC.js";
import { s as ht } from "./configES6-BSLDCkRC.js";
import { L as O } from "./index-jVhJ2jaE.js";
import { serviceWorker as ft } from "./sw-register.js";
var S = function(n) {
  var t = this;
  this.rpc_counter = 0, this.channel = n, this.foreign = /* @__PURE__ */ new Map(), this.local = /* @__PURE__ */ new Map(), this.calls = /* @__PURE__ */ new Map(), this.queue = [], this.connectionEstablished = !1, this.channel.addEventListener("message", function(e) {
    var r = e.data;
    if (r && typeof r == "object") switch (r.type) {
      case "MP_INIT":
        return t.onInit(r);
      case "MP_SET":
        return t.onSet(r);
      case "MP_CALL":
        return t.onCall(r);
      case "MP_RETURN":
        return t.onReturn(r);
    }
  }), this.channel.postMessage({ type: "MP_INIT", id: 1, reply: !0 });
};
S.prototype.onInit = function(n) {
  this.connectionEstablished = !0;
  var t = this.queue;
  this.queue = [];
  for (var e = 0, r = t; e < r.length; e += 1)
    this.channel.postMessage(r[e]);
  n.reply && this.channel.postMessage({ type: "MP_INIT", reply: !1 });
}, S.prototype.onSet = function(n) {
  for (var t = this, e = {}, r = n.object, i = function() {
    var c = o[s], d = !n.void.includes(c);
    e[c] = function() {
      for (var g = [], $ = arguments.length; $--; ) g[$] = arguments[$];
      return t.rpc_counter = (t.rpc_counter + 1) % Number.MAX_SAFE_INTEGER, new Promise(function(v, A) {
        t.postMessage({ type: "MP_CALL", object: r, method: c, id: t.rpc_counter, args: g, reply: d }), d ? t.calls.set(t.rpc_counter, { resolve: v, reject: A }) : v();
      });
    };
  }, s = 0, o = n.methods; s < o.length; s += 1) i();
  var l = this.foreign.get(n.object);
  this.foreign.set(n.object, e), typeof l == "function" && l(e);
}, S.prototype.onCall = function(n) {
  var t = this, e = this.local.get(n.object);
  e && e[n.method].apply(e, n.args).then(function(r) {
    return n.reply && t.channel.postMessage({ type: "MP_RETURN", id: n.id, result: r });
  }).catch(function(r) {
    return t.channel.postMessage({ type: "MP_RETURN", id: n.id, error: r.message });
  });
}, S.prototype.onReturn = function(n) {
  if (this.calls.has(n.id)) {
    var t = this.calls.get(n.id), e = t.resolve, r = t.reject;
    this.calls.clear(n.id), n.error ? r(n.error) : e(n.result);
  }
}, S.prototype.postMessage = function(n) {
  this.connectionEstablished ? this.channel.postMessage(n) : this.queue.push(n);
}, S.prototype.set = function(n, t, e) {
  e === void 0 && (e = {}), this.local.set(n, t);
  var r = Object.entries(t).filter(function(i) {
    return typeof i[1] == "function";
  }).map(function(i) {
    return i[0];
  });
  this.postMessage({ type: "MP_SET", object: n, methods: r, void: e.void || [] });
}, S.prototype.get = function(n) {
  return new Promise(function(t, e) {
    var r = this;
    return this.foreign.has(n) ? t(this.foreign.get(n)) : t(new Promise(function(i, s) {
      return r.foreign.set(n, i);
    }));
  }.bind(this));
};
function G(n) {
  var t = new S(n);
  Object.defineProperties(this, { get: { writable: !1, configurable: !1, value: t.get.bind(t) }, set: { writable: !1, configurable: !1, value: t.set.bind(t) } });
}
function q(n) {
  return new Worker(
    "/workers/gitWorker.js",
    {
      type: "module",
      name: n?.name
    }
  );
}
const W = new F(p.logging.WorkerPool);
function D(...n) {
  W.consoleDotLog("[WorkerPool]", ...n);
}
function _(...n) {
  W.consoleDotError("[WorkerPool]", ...n);
}
D("Loading workerPool.");
class K {
  constructor(t = null) {
    this.workers = /* @__PURE__ */ new Map(), this.workerCount = 0, this.WorkerClass = t || (typeof Worker < "u" ? Worker : null);
  }
  async getWorker(t, e = !1) {
    try {
      if (!this.WorkerClass)
        throw new Error("Worker class not available in this environment");
      if (!this.workers.has(t)) {
        D(`Creating new worker for ${t}`);
        const i = new q();
        i.onerror = (c) => {
          throw _("Worker error:", c), _("Error details:", {
            filename: c.filename,
            lineno: c.lineno,
            colno: c.colno,
            message: c.message
          }), c;
        };
        const s = new G(i), o = await Promise.race([
          s.get("workerThread"),
          new Promise(
            (c, d) => setTimeout(() => d(new Error("Worker thread timeout")), 5e3)
          )
        ]);
        D("Worker thread obtained, waiting for readiness..."), await o.ready(), D("Worker is ready");
        const l = typeof navigator < "u" && "serviceWorker" in navigator;
        await o.execute("setSWUsage", { supportsServiceWorker: l, useSW: e }), this.workers.set(t, {
          worker: i,
          portal: s,
          thread: o,
          users: 0
        }), this.workerCount++, D(`Worker for ${t} initialized`);
      }
      const r = this.workers.get(t);
      return r.users++, r;
    } catch (r) {
      throw _(`Failed to get worker for ${t}:`, r), r;
    }
  }
  async releaseWorker(t) {
    if (this.workers.has(t)) {
      const e = this.workers.get(t);
      e.users--, e.users <= 0 && (e.worker.terminate(), this.workers.delete(t), this.workerCount--, D(`Terminated worker for ${t}`));
    }
  }
  async forceTerminateAll() {
    for (const [t, { worker: e }] of this.workers)
      e.terminate(), D(`Force terminated worker for ${t}`);
    this.workers.clear(), this.workerCount = 0;
  }
  getActiveCount() {
    return this.workerCount;
  }
}
const C = new K(), V = new F(p.logging.memoryFS);
function h(...n) {
  V.consoleDotLog("[ MemoryFS ] ", ...n);
}
function w(...n) {
  V.consoleDotError("[ MemoryFS ] ", ...n);
}
h("memoryFs loaded.");
class z {
  constructor(t, e = {}) {
    this.fsName = t, this.fileDescriptors = /* @__PURE__ */ new Map(), this.fdCounter = 3, this.workerEntry = null, this.workerThread = null, this.useSW = e?.useSW || null, this.versioningStrategy = e?.versioning?.strategy || p.versioning.strategy, this.doImmediateCommit = this.versioningStrategy === "immediate", h(`MemoryFS created for ${t}`);
  }
  async initializeWorker() {
    this.workerEntry = await C.getWorker(this.fsName, this.useSW), this.workerThread = this.workerEntry.thread, await this.workerThread.execute("setFs", {
      fsName: this.fsName,
      fsType: "memory"
    }), h(`Worker initialized for ${this.fsName}`);
  }
  async cleanup() {
    this.workerEntry && (await C.releaseWorker(this.fsName), this.workerEntry = null, this.workerThread = null);
  }
  async fs_fopen(t, e) {
    this.workerThread || await this.initializeWorker();
    const r = this.fdCounter++;
    return this.fileDescriptors.set(r, { path: t, pos: 0, mode: e }), h(`File descriptor ${r} created for ${t}`), r;
  }
  async fs_fclose(t) {
    return h(`Closing file descriptor: ${t}`), this.fileDescriptors.has(t) ? (this.fileDescriptors.delete(t), h(`File descriptor ${t} closed successfully.`), 0) : (w(`File descriptor ${t} not found.`), -1);
  }
  async fs_fread(t, e) {
    h(`Reading ${e} bytes from file descriptor: ${t}`);
    const r = this.fileDescriptors.get(t);
    if (!r)
      return w(`File descriptor ${t} not found.`), null;
    try {
      this.workerThread || await this.initializeWorker();
      const i = await this.workerThread.execute("readFileDot", { filePath: r.path });
      if (h(`Data read from file ${r.path}:`, i), i === null)
        return w(`Data is null for file ${r.path}.`), null;
      const s = i.slice(r.pos, r.pos + e);
      return r.pos += s.length, h(`Read chunk: ${s}, new position: ${r.pos}`), s;
    } catch (i) {
      return w(`Error reading file ${r.path}:`, i), null;
    }
  }
  async fs_fwrite(t, e) {
    h(`Writing content to file descriptor: ${t}`);
    const r = this.fileDescriptors.get(t);
    if (!r)
      return w(`File descriptor ${t} not found.`), -1;
    try {
      this.workerThread || await this.initializeWorker();
      let s = await this.workerThread.execute("readFileDot", { filePath: r.path }).catch(() => "");
      return h(`Current data in file ${r.path}:`, s), s === null && (s = ""), s = s.slice(0, r.pos) + e + s.slice(r.pos + e.length), await this.workerThread.execute("writeFileDot", {
        filePath: r.path,
        fileContent: s,
        doCommit: this.doImmediateCommit
      }), r.pos += e.length, h(`Content written to file ${r.path}, new position: ${r.pos}`), e.length;
    } catch (i) {
      return w(`Error writing to file ${r.path}:`, i), -1;
    }
  }
  async fs_fseek(t, e, r) {
    h(`Seeking in file descriptor: ${t}, offset: ${e}, whence: ${r}`);
    const i = this.fileDescriptors.get(t);
    if (!i)
      return w(`File descriptor ${t} not found.`), -1;
    try {
      this.workerThread || await this.initializeWorker();
      const s = await this.workerThread.execute("readFileDot", { filePath: i.path }).catch(() => "");
      return r === "SEEK_SET" ? i.pos = e : r === "SEEK_CUR" ? i.pos += e : r === "SEEK_END" && (i.pos = s.length + e), i.pos = Math.max(0, Math.min(i.pos, s.length)), h(`New position in file ${i.path}: ${i.pos}`), 0;
    } catch (s) {
      return w(`Error seeking in file ${i.path}:`, s), -1;
    }
  }
  async fs_ftell(t) {
    h(`Getting current position for file descriptor: ${t}`);
    const e = this.fileDescriptors.get(t);
    return e ? (h(`Current position in file ${e.path}: ${e.pos}`), e.pos) : (w(`File descriptor ${t} not found.`), -1);
  }
  async fs_ftruncate(t, e) {
    h(`Truncating file descriptor: ${t} to length: ${e}`);
    const r = this.fileDescriptors.get(t);
    if (!r)
      return w(`File descriptor ${t} not found.`), -1;
    try {
      this.workerThread || await this.initializeWorker();
      let s = await this.workerThread.execute("readFileDot", { filePath: r.path }).catch(() => "");
      return h(`Current data in file ${r.path}:`, s), s = s.slice(0, e), await this.workerThread.execute("writeFileDot", {
        filePath: r.path,
        fileContent: s,
        doCommit: this.doImmediateCommit
      }), h(`File ${r.path} truncated to length: ${e}`), 0;
    } catch (i) {
      return w(`Error truncating file ${r.path}:`, i), -1;
    }
  }
  async fs_stat(t) {
    h(`Getting stats for path: ${t}`);
    try {
      this.workerThread || await this.initializeWorker();
      const e = "...";
      return {
        ...e,
        isDirectory: async () => {
          h("path: ", t);
          const r = await this.workerThread.execute("isDirectoryDot", { path: t });
          return r.exists ? r.isDirectory : !1;
        },
        isFile: async () => {
          const r = await this.workerThread.execute("isDirectoryDot", { path: t });
          return r.exists ? !r.isDirectory : !1;
        }
      };
    } catch (e) {
      return w(`Error getting stats for path ${t}:`, e), null;
    }
  }
  async fs_fstat(t) {
    h(`Getting stats for file descriptor: ${t}`);
    const e = this.fileDescriptors.get(t);
    return e ? this.fs_stat(e.path) : (w(`File descriptor ${t} not found.`), null);
  }
  async fs_remove(t) {
    this.workerThread || await this.initializeWorker(), h(`Removing file: ${t}`);
    try {
      return await this.workerThread.execute("removeFileDot", {
        filePath: t,
        doCommit: this.doImmediateCommit
      }), 0;
    } catch (e) {
      return w(`Error removing file ${t}:`, e), -1;
    }
  }
  async fs_mkdir(t) {
    this.workerThread || await this.initializeWorker(), h(`Creating directory: ${t}`);
    try {
      return await this.workerThread.execute("mkdirDot", {
        dirPath: t,
        doCommit: this.doImmediateCommit
      }), 0;
    } catch (e) {
      return w(`Error creating directory ${t}:`, e), -1;
    }
  }
  async fs_rmdir(t) {
    this.workerThread || await this.initializeWorker(), h(`Removing directory: ${t}`);
    try {
      return await this.workerThread.execute("removeDirDot", {
        dirPath: t,
        doCommit: this.doImmediateCommit
      }), 0;
    } catch (e) {
      return w(`Error removing directory ${t}:`, e), -1;
    }
  }
  async fs_rename(t, e) {
    this.workerThread || await this.initializeWorker(), h(`Renaming ${t} to ${e}`);
    try {
      return await this.workerThread.execute("rename", {
        oldPath: t,
        newPath: e
      }), 0;
    } catch (r) {
      return w(`Error renaming ${t} to ${e}:`, r), -1;
    }
  }
  async fs_opendir(t) {
    this.workerThread || await this.initializeWorker(), h(`Opening directory: ${t}`);
    try {
      return await this.workerThread.execute("opendir", { path: t }), 0;
    } catch (e) {
      return w(`Error opening directory ${t}:`, e), -1;
    }
  }
  async fs_readdir(t, e = {}) {
    h(`Reading directory: ${t}`);
    try {
      this.workerThread || await this.initializeWorker();
      const i = (await this.workerThread.execute("readDirDot", { path: t }))?.entries || [];
      return e.fullObjects ? i : i.map((s) => s.path);
    } catch (r) {
      return w(`Error reading directory ${t}:`, r), [];
    }
  }
  async fs_feof(t) {
    h(`Checking EOF for file descriptor: ${t}`);
    const e = this.fileDescriptors.get(t);
    if (!e)
      return w(`File descriptor ${t} not found.`), !0;
    try {
      this.workerThread || await this.initializeWorker();
      const r = await this.workerThread.execute("readFileDot", { filePath: e.path }).catch(() => "");
      h(`Current data in file ${e.path}:`, r);
      const i = e.pos >= r.length;
      return h(`EOF status for file ${e.path}: ${i}`), i;
    } catch (r) {
      return w(`Error checking EOF for file ${e.path}:`, r), !0;
    }
  }
  async fs_fflush(t) {
    return h(`Flushing file descriptor: ${t}`), 0;
  }
  async fs_fcloseall() {
    return h("Closing all file descriptors."), this.fileDescriptors = null, this.fs = null, this.workerThread = null, h("Closed all file descriptors", this.fileDescriptors, this.fs, this.workerThread), 0;
  }
}
const P = new F(p.logging.IDBFs);
function u(...n) {
  P.consoleDotLog(...n);
}
function y(...n) {
  P.consoleDotError(...n);
}
class H {
  constructor(t, e = {}) {
    this.fs = new O(t, e), this.fileDescriptors = /* @__PURE__ */ new Map(), this.fdCounter = 3, this.workerEntry = null, this.workerThread = null, this.fsName = t, this.useSW = e?.useSW || null, this.versioningStrategy = e?.versioning?.strategy || p.versioning.strategy, this.doImmediateCommit = this.versioningStrategy === "immediate", (async () => await this.initializeWorker())(), u("IDBFS initialized with LightningFS.");
  }
  async initializeWorker() {
    this.workerEntry = await C.getWorker(this.fsName, this.useSW), this.workerThread = this.workerEntry.thread, await this.workerThread.execute("setFs", {
      fsName: this.fsName,
      fsType: "idb",
      gitDir: "/"
    }), u(`Worker initialized for ${this.fsName}`);
  }
  async cleanup() {
    this.workerEntry && (await C.releaseWorker(this.fsName), this.workerEntry = null, this.workerThread = null);
  }
  async fs_fopen(t, e) {
    this.workerThread || await this.initializeWorker(), u(`Opening file: ${t} with mode: ${e}`);
    const r = this.fdCounter++;
    return this.fileDescriptors.set(r, { path: t, pos: 0, mode: e }), u(`File descriptor ${r} created for file: ${t}`), r;
  }
  async fs_fclose(t) {
    return u(`Closing file descriptor: ${t}`), this.fileDescriptors.has(t) ? (this.fileDescriptors.delete(t), u(`File descriptor ${t} closed successfully.`), 0) : (y(`File descriptor ${t} not found.`), -1);
  }
  async fs_fread(t, e) {
    u(`Reading ${e} bytes from file descriptor: ${t}`);
    const r = this.fileDescriptors.get(t);
    if (!r)
      return y(`File descriptor ${t} not found.`), null;
    try {
      this.workerThread || await this.initializeWorker();
      const i = await this.workerThread.execute("readFileDot", { filePath: r.path });
      if (u(`Data read from file ${r.path}:`, i), i === null)
        return y(`Data is null for file ${r.path}.`), null;
      const s = i.slice(r.pos, r.pos + e);
      return r.pos += s.length, u(`Read chunk: ${s}, new position: ${r.pos}`), s;
    } catch (i) {
      return y(`Error reading file ${r.path}:`, i), null;
    }
  }
  async fs_fwrite(t, e) {
    u(`Writing content to file descriptor: ${t}`);
    const r = this.fileDescriptors.get(t);
    if (!r)
      return y(`File descriptor ${t} not found.`), -1;
    try {
      this.workerThread || await this.initializeWorker();
      let s = await this.workerThread.execute("readFileDot", { filePath: r.path }).catch(() => "");
      return u(`Current data in file ${r.path}:`, s), s === null && (s = ""), s = s.slice(0, r.pos) + e + s.slice(r.pos + e.length), await this.workerThread.execute("writeFileDot", {
        filePath: r.path,
        fileContent: s,
        doCommit: this.doImmediateCommit
      }), r.pos += e.length, u(`Content written to file ${r.path}, new position: ${r.pos}`), e.length;
    } catch (i) {
      return y(`Error writing to file ${r.path}:`, i), -1;
    }
  }
  async fs_fseek(t, e, r) {
    u(`Seeking in file descriptor: ${t}, offset: ${e}, whence: ${r}`);
    const i = this.fileDescriptors.get(t);
    if (!i)
      return y(`File descriptor ${t} not found.`), -1;
    try {
      this.workerThread || await this.initializeWorker();
      const s = await this.workerThread.execute("readFileDot", { filePath: i.path }).catch(() => "");
      return r === "SEEK_SET" ? i.pos = e : r === "SEEK_CUR" ? i.pos += e : r === "SEEK_END" && (i.pos = s.length + e), i.pos = Math.max(0, Math.min(i.pos, s.length)), u(`New position in file ${i.path}: ${i.pos}`), 0;
    } catch (s) {
      return y(`Error seeking in file ${i.path}:`, s), -1;
    }
  }
  async fs_ftell(t) {
    u(`Getting current position for file descriptor: ${t}`);
    const e = this.fileDescriptors.get(t);
    return e ? (u(`Current position in file ${e.path}: ${e.pos}`), e.pos) : (y(`File descriptor ${t} not found.`), -1);
  }
  async fs_ftruncate(t, e) {
    u(`Truncating file descriptor: ${t} to length: ${e}`);
    const r = this.fileDescriptors.get(t);
    if (!r)
      return y(`File descriptor ${t} not found.`), -1;
    try {
      this.workerThread || await this.initializeWorker();
      let s = await this.workerThread.execute("readFileDot", { filePath: r.path }).catch(() => "");
      return u(`Current data in file ${r.path}:`, s), s = s.slice(0, e), await this.workerThread.execute("writeFileDot", {
        filePath: r.path,
        fileContent: s,
        doCommit: this.doImmediateCommit
      }), u(`File ${r.path} truncated to length: ${e}`), 0;
    } catch (i) {
      return y(`Error truncating file ${r.path}:`, i), -1;
    }
  }
  async fs_stat(t) {
    u(`Getting stats for path: ${t}`);
    try {
      this.workerThread || await this.initializeWorker();
      const e = "...";
      return {
        ...e,
        isDirectory: async () => {
          u("path: ", t);
          const r = await this.workerThread.execute("isDirectoryDot", { path: t });
          return r.exists ? r.isDirectory : !1;
        },
        isFile: async () => {
          const r = await this.workerThread.execute("isDirectoryDot", { path: t });
          return r.exists ? !r.isDirectory : !1;
        }
      };
    } catch (e) {
      return y(`Error getting stats for path ${t}:`, e), null;
    }
  }
  async fs_fstat(t) {
    u(`Getting stats for file descriptor: ${t}`);
    const e = this.fileDescriptors.get(t);
    return e ? this.fs_stat(e.path) : (y(`File descriptor ${t} not found.`), null);
  }
  async fs_remove(t) {
    this.workerThread || await this.initializeWorker(), u(`Removing file: ${t}`);
    try {
      return await this.workerThread.execute("removeFileDot", {
        filePath: t,
        doCommit: this.doImmediateCommit
      }), 0;
    } catch (e) {
      return y(`Error removing file ${t}:`, e), -1;
    }
  }
  async fs_mkdir(t) {
    this.workerThread || await this.initializeWorker(), u(`Creating directory: ${t}`);
    try {
      return await this.workerThread.execute("mkdirDot", {
        dirPath: t,
        doCommit: this.doImmediateCommit
      }), 0;
    } catch (e) {
      return y(`Error creating directory ${t}:`, e), -1;
    }
  }
  async fs_rmdir(t) {
    this.workerThread || await this.initializeWorker(), u(`Removing directory: ${t}`);
    try {
      return await this.workerThread.execute("removeDirDot", {
        dirPath: t,
        doCommit: this.doImmediateCommit
      }), 0;
    } catch (e) {
      return y(`Error removing directory ${t}:`, e), -1;
    }
  }
  async fs_rename(t, e) {
    this.workerThread || await this.initializeWorker(), u(`Renaming ${t} to ${e}`);
    try {
      return await this.workerThread.execute("rename", {
        oldPath: t,
        newPath: e
      }), 0;
    } catch (r) {
      return y(`Error renaming ${t} to ${e}:`, r), -1;
    }
  }
  async fs_opendir(t) {
    this.workerThread || await this.initializeWorker(), u(`Opening directory: ${t}`);
    try {
      return await this.workerThread.execute("opendir", { path: t }), 0;
    } catch (e) {
      return y(`Error opening directory ${t}:`, e), -1;
    }
  }
  async fs_readdir(t, e = {}) {
    u(`Reading directory: ${t}`);
    try {
      this.workerThread || await this.initializeWorker();
      const i = (await this.workerThread.execute("readDirDot", { path: t }))?.entries || [];
      return e.fullObjects ? i : i.map((s) => s.path);
    } catch (r) {
      return y(`Error reading directory ${t}:`, r), [];
    }
  }
  async fs_feof(t) {
    u(`Checking EOF for file descriptor: ${t}`);
    const e = this.fileDescriptors.get(t);
    if (!e)
      return y(`File descriptor ${t} not found.`), !0;
    try {
      this.workerThread || await this.initializeWorker();
      const r = await this.workerThread.execute("readFileDot", { filePath: e.path }).catch(() => "");
      u(`Current data in file ${e.path}:`, r);
      const i = e.pos >= r.length;
      return u(`EOF status for file ${e.path}: ${i}`), i;
    } catch (r) {
      return y(`Error checking EOF for file ${e.path}:`, r), !0;
    }
  }
  async fs_fflush(t) {
    return u(`Flushing file descriptor: ${t}`), 0;
  }
  async fs_fcloseall() {
    return u("Closing all file descriptors."), this.fileDescriptors.clear(), 0;
  }
}
const R = new F(p.logging.GitAuth);
function T(...n) {
  R.consoleDotLog(...n);
}
function M(...n) {
  R.consoleDotError(...n);
}
class Q {
  constructor(t) {
    this.workerThread = t, this.AuthChecked = !1;
  }
  /**
   * Sets authentication credentials for Git operations
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<boolean>}
   */
  async setAuthParams(t, e) {
    try {
      if (!this.workerThread)
        throw new Error("Worker thread not initialized");
      return await this.workerThread.execute("setAuthParams", { username: t, password: e }), T("Auth params set successfully"), this.AuthChecked || (this.AuthChecked = !0), T("Auth params verified successfully"), !0;
    } catch (r) {
      throw M("Failed to set auth params:", r), r;
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
    } catch (t) {
      if (t.toString().includes("401") || t.toString().includes("403"))
        return T("Auth verification failed - invalid credentials"), !1;
      throw M("Auth verification error:", t), t;
    }
  }
  /**
   * Sets Git user config (name and email)
   * @param {string} name 
   * @param {string} email 
   */
  async setUserConfig(t, e) {
    try {
      return await this.workerThread.execute("setConfigs", { name: t, email: e }), T(`User config set, name: ${t}, email: ${e}`), !0;
    } catch (r) {
      throw M(`Failed to set user config: ${r}`), r;
    }
  }
}
const N = new F(p.logging.VFSutils);
function f(...n) {
  N.consoleDotLog("[ VFSUtils ]", ...n);
}
function k(...n) {
  N.consoleDotError("[ VFSUtils ]", ...n);
}
f("Loading VFSUtils module");
class J {
  constructor(t, e, r, i, s = !1) {
    this.fsType = t, this.fsInstance = e, this.fsName = r, this.fetchInfo = i, this.workerEntry = null, this.workerThread = null, this.inodeCounter = 12341, this.fsTable = {}, this.initialized = !1, this.useSW = s, this.auth = null;
  }
  async initialize() {
    if (!this.initialized)
      try {
        this.workerEntry = await C.getWorker(this.fsName, this.useSW), this.workerThread = this.workerEntry.thread, f("Setting Fs for VFSUtils."), await this.workerThread.execute("setFs", {
          fsName: this.fsName,
          fsType: this.fsType
        }), f("Fs set."), this.fetchInfo.corsProxy && await this.workerThread.execute("setCorsProxy", {
          corsProxy: this.fetchInfo.corsProxy
        }), f("workerThread:", this.workerThread), this.auth = new Q(this.workerThread), this.fetchInfo.username && this.fetchInfo.password && await this.setAuthParams(this.fetchInfo.username, this.fetchInfo.password), this.initialized = !0, f(`VFSutils initialized for ${this.fsName} with type ${this.fsType}`);
      } catch (t) {
        throw await this.terminate(), t;
      }
  }
  async terminate() {
    try {
      return this.workerEntry && (await C.releaseWorker(this.fsName), this.workerEntry = null, this.workerThread = null), this.initialized = !1, !0;
    } catch (t) {
      return k("VFSutils termination error:", t), !1;
    }
  }
  async fetchFromGit() {
    try {
      f("Fetching from Git repository..."), this.initialized || await this.initialize(), f("initialized.");
      const { url: t, dir: e = "/" } = this.fetchInfo;
      f(`Cloning repository from ${t} to ${e}`), await this.workerThread.execute("doCloneAndStuff", { url: t }), this.fetchInfo.name && this.fetchInfo.email && await this.setUserConfig(this.fetchInfo.name, this.fetchInfo.email), await this.generateFsTable(), f("Repository successfully cloned and indexed");
    } catch (t) {
      throw k(`Git fetch failed: ${t}`), await this.terminate(), t;
    }
  }
  async fetchFromDisk() {
    try {
      this.initialized || await this.initialize();
      const { dir: t } = this.fetchInfo;
      f(`Loading filesystem from disk at ${t}`), await this.generateFsTable(), f("Successfully loaded filesystem from disk");
    } catch (t) {
      throw k(`Disk load failed: ${t.message}`), await this.terminate(), t;
    }
  }
  async fetchFromGoogleDrive() {
    try {
      this.initialized || await this.initialize();
      const { fileId: t } = this.fetchInfo;
      f(`Fetching from Google Drive file ${t}`), await this.generateFsTable(), f("Successfully fetched from Google Drive");
    } catch (t) {
      throw k(`Google Drive fetch failed: ${t.message}`), await this.terminate(), t;
    }
  }
  /* FS Table Management */
  async generateFsTable() {
    try {
      this.initialized || await this.initialize(), f("Generating FS table...");
      const t = await this.workerThread.execute("listFilesDot", { listDirs: !0 });
      return f("File list:", t), this.fsTable = this.buildHierarchicalFsTable(t), f(
        "FS table generated with",
        Object.keys(this.fsTable["/"].children).length,
        "root entries"
      ), this.fsTable;
    } catch (t) {
      throw k("FS table generation failed:", t), t;
    }
  }
  buildHierarchicalFsTable(t) {
    const e = this.createRootEntry();
    return f("Root entry:", t), t.forEach((r) => {
      const i = r.path.split("/").filter((o) => o !== "");
      let s = e;
      i.forEach((o, l) => {
        const c = l === i.length - 1;
        s.children[o] || (s.children[o] = this.createFsTableEntry(
          o,
          c && r.type !== "tree" ? "file" : "directory",
          r.size || 0,
          s.dentry_id
        )), (!c || r.type === "tree") && (s = s.children[o]);
      });
    }), { "/": e };
  }
  async updateFsTable(t, e, r = "file", i = 0) {
    try {
      const s = e.replace(/^\/+|\/+$/g, "");
      this.fsTable["/"] || (this.fsTable["/"] = this.createRootEntry());
      const o = s.split("/");
      let l = this.fsTable["/"];
      if (t === "remove" && o.length === 0)
        throw new Error("Cannot remove root directory");
      for (let d = 0; d < o.length - 1; d++) {
        const g = o[d];
        if (!l.children || !l.children[g]) {
          if (t === "remove")
            throw new Error(`Parent path not found: ${o.slice(0, d + 1).join("/")}`);
          l.children[g] = this.createFsTableEntry(
            g,
            "directory",
            0,
            l.dentry_id
          );
        }
        l = l.children[g];
      }
      const c = o[o.length - 1];
      switch (t) {
        case "create":
          l.children || (l.children = {}), l.children[c] && f(`path ${e} already exists, updating its content`), l.children[c] = this.createFsTableEntry(
            c,
            r,
            i,
            l.dentry_id
          );
          break;
        case "remove":
          if (!l.children || !l.children[c])
            return { success: !1, message: `Path not found: ${e}` };
          if (l.children[c].type === "directory" && Object.keys(l.children[c].children || {}).length > 0)
            throw new Error(`Cannot remove non-empty directory: ${e}`);
          delete l.children[c];
          break;
        default:
          throw new Error(`Invalid action: ${t}`);
      }
      return { success: !0, fsTable: this.fsTable };
    } catch (s) {
      throw k("FS table update failed:", s), s;
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
  createFsTableEntry(t, e, r, i) {
    const s = e === "directory";
    return {
      inode: this.inodeCounter++,
      type: e,
      name: t,
      mode: s ? 16877 : 100644,
      size: s ? 0 : r,
      uid: 1e3,
      gid: 100,
      parent_inode: i,
      acl: {
        owner: "user",
        permissions: s ? "rwx" : "rw-",
        groups: { users: "r" }
      },
      children: s ? {} : void 0,
      ctime: Date.now(),
      mtime: Date.now()
    };
  }
  async getFsTableSize(t) {
    try {
      return t ? JSON.stringify(t).length : 0;
    } catch (e) {
      return k("Size calculation failed:", e), 0;
    }
  }
  async commitStagedChanges(t) {
    try {
      return this.initialized || await this.initialize(), await this.workerThread.execute("setFs", {
        fsName: this.fsName,
        fsType: this.fsType
      }), await this.workerThread.execute("commitStagedChanges", { message: t });
    } catch (e) {
      throw k("Version commit failed:", e), e;
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
      const t = await this.getSyncStatus();
      switch (f("Auto-sync: Sync status:", t), t) {
        case "up-to-date":
          f("Auto-sync: Repo is already up to date.");
          return;
        case "local-ahead":
          f("Auto-sync: Local changes detected, syncing with remote..."), await this.syncWithRemote("local-ahead");
          break;
        case "other-cases":
          f("Auto-sync: Other cases detected, syncing with remote..."), await this.syncWithRemote("other-cases");
          break;
        case "remote-branch-not-found":
          k("No remote branch found, cannot sync.");
          break;
        default:
          k("No remote branch found, cannot sync.");
          break;
      }
    } catch (t) {
      k("autoSyncFlow() failed:", t);
    }
  }
  /**
  * Syncs the local repo with the remote by pulling changes.
  * Abstract logic — assumes `doFetch` does a pull or fetch + merge.
  */
  async syncWithRemote(t) {
    try {
      this.initialized || await this.initialize();
      const { url: e } = this.fetchInfo;
      switch (f("Attempting to sync with remote:", e), await this.setAuthParams(this.fetchInfo.username, this.fetchInfo.password), await this.setUserConfig(this.fetchInfo.name, this.fetchInfo.email), t) {
        case "local-ahead":
          f("Syncing with remote by pushing local changes..."), await this.workerThread.execute("push", { url: e, ref: "main" });
          break;
        case "other-cases":
          break;
        default:
          if (f("Could not determine sync strategy, defaulting to pull..."), !pullResult.success)
            throw new Error(`Pull failed: ${pullResult.error}`);
          break;
      }
      await this.generateFsTable(), f("Local repo successfully synced with remote.");
    } catch (e) {
      throw k("syncWithRemote failed:", e), e;
    }
  }
  async getSyncStatus(t = null, e = "main") {
    try {
      const r = t || this.fetchInfo?.url, i = await this.workerThread.execute("getLastLocalCommit", { ref: e }), s = await this.workerThread.execute("getLatestRemoteCommit", { url: r, ref: e });
      if (!s.success) return "remote-branch-not-found";
      const o = s.commit;
      f("localHead:", i, "remoteHead:", o);
      const l = await this.workerThread.execute("findMergeBase", {
        oids: [i, o]
      }), c = l[0];
      f("Merge base:", l);
      const d = c === o;
      return o ? i === o ? "up-to-date" : d ? "local-ahead" : "other-cases" : "remote-branch-not-found";
    } catch (r) {
      return `error: ${r.message}`;
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
  async setAuthParams(t, e) {
    return this.auth.setAuthParams(t, e);
  }
  /**
   * Sets Git user config (name and email)
   * @param {string} name
   * @param {string} email
   * @returns {Promise<void>}
   */
  async setUserConfig(t, e) {
    return this.auth.setUserConfig(t, e);
  }
  /**
   * Verifies if current auth credentials are valid
   * @returns {Promise<boolean>}
   */
  async verifyAuth() {
    return this.auth.verifyAuth();
  }
  async updateFetchInfo(t) {
    return this.initialized || await this.initialize(), this.fetchInfo = { ...this.fetchInfo, ...t }, f("Fetch info updated:", this.fetchInfo), this.fetchInfo;
  }
}
class X {
  constructor(t = "VFS_Mounts") {
    this.dbName = t;
  }
  supportsIndexedDB() {
    return typeof window < "u" && !!window.indexedDB;
  }
  /** IndexedDB Methods **/
  async getFromIndexedDB(t) {
    return new Promise((e, r) => {
      const i = indexedDB.open(this.dbName, 1);
      i.onerror = () => e(null), i.onsuccess = () => {
        const c = i.result.transaction("mounts", "readonly").objectStore("mounts").get(t);
        c.onsuccess = () => e(c.result || null), c.onerror = () => e(null);
      }, i.onupgradeneeded = (s) => {
        s.target.result.createObjectStore("mounts");
      };
    });
  }
  async storeInIndexedDB(t, e) {
    return new Promise((r, i) => {
      const s = indexedDB.open(this.dbName, 1);
      s.onerror = () => r(!1), s.onsuccess = () => {
        const l = s.result.transaction("mounts", "readwrite");
        l.objectStore("mounts").put(e, t), l.oncomplete = () => r(!0), l.onerror = () => r(!1);
      }, s.onupgradeneeded = (o) => {
        o.target.result.createObjectStore("mounts");
      };
    });
  }
  async removeFromIndexedDB(t) {
    return new Promise((e, r) => {
      const i = indexedDB.open(this.dbName, 1);
      i.onerror = () => e(!1), i.onsuccess = () => {
        const o = i.result.transaction("mounts", "readwrite");
        o.objectStore("mounts").delete(t), o.oncomplete = () => e(!0), o.onerror = () => e(!1);
      };
    });
  }
  /** LocalStorage Methods **/
  async getFromLocalStorage(t) {
    try {
      const e = localStorage.getItem(t);
      return e ? JSON.parse(e) : null;
    } catch {
      return null;
    }
  }
  async storeInLocalStorage(t, e) {
    localStorage.setItem(t, JSON.stringify(e));
  }
  async removeFromLocalStorage(t) {
    localStorage.removeItem(t);
  }
  /** Unified Storage Methods **/
  async get(t) {
    return this.supportsIndexedDB() ? this.getFromIndexedDB(t) : this.getFromLocalStorage(t);
  }
  async store(t, e) {
    return this.supportsIndexedDB() ? this.storeInIndexedDB(t, e) : this.storeInLocalStorage(t, e);
  }
  async remove(t) {
    return this.supportsIndexedDB() ? this.removeFromIndexedDB(t) : this.removeFromLocalStorage(t);
  }
}
const Y = new F(p.logging.supportChecker);
function b(...n) {
  Y.consoleDotLog(...n);
}
async function Z() {
  try {
    return window.indexedDB ? await new Promise((n) => {
      const t = "testIDBSupport", e = indexedDB.open(t);
      e.onerror = () => {
        b("IndexedDB not available"), n(!1);
      }, e.onsuccess = (r) => {
        r.target.result.close();
        const s = indexedDB.deleteDatabase(t);
        s.onerror = () => {
          b("Failed to delete test database"), n(!0);
        }, s.onsuccess = () => {
          b("IndexedDB test successful"), n(!0);
        };
      }, e.onblocked = () => {
        b("IndexedDB request blocked"), n(!1);
      };
    }) : (b("IndexedDB not supported in this browser"), !1);
  } catch (n) {
    return b("IndexedDB test failed:", n), !1;
  }
}
const L = new F(p.logging.vfs);
function a(...n) {
  L.consoleDotLog("[VFS] ", ...n);
}
function m(...n) {
  L.consoleDotError("[VFS] ", ...n);
}
class tt {
  // Initialization and Core Setup
  constructor(t = "VFS_Mounts") {
    a(`Initializing VFS with storage name: ${t}`), this.mounts = /* @__PURE__ */ Object.create(null), this.initializedMounts = /* @__PURE__ */ new Set(), this.VFSutils = null, this.storageUtils = new X(t), this.currentMountPath = "", this.idbSupported = null, a("VFS instance created");
  }
  // Utility functions for versioning and merging
  getVersioningConfig(t = {}) {
    const e = t.versioning || p.versioning || {};
    return {
      strategy: e.strategy,
      interval: e.interval,
      number: e.number
    };
  }
  getMergingConfig(t = {}) {
    const e = t.merging || p.merging || {};
    return {
      strategy: e.strategy || "none",
      conflictResolution: e.conflictResolution || "timestamp"
    };
  }
  // Storage and Support Checking
  async checkIndexedDBSupport() {
    if (a("Checking IndexedDB support..."), this.idbSupported !== null)
      return this.idbSupported;
    try {
      return await Z(), a("IndexedDB is supported"), this.idbSupported = !0, !0;
    } catch (t) {
      return m("IndexedDB not supported:", t), this.idbSupported = !1, !1;
    }
  }
  async determineUseSW(t, e) {
    return e.useSW !== void 0 ? e.useSW : t === "idb" ? await this.checkIndexedDBSupport() : !1;
  }
  async loadMountFromStorage(t) {
    a(`Attempting to load mount from storage: ${t}`);
    try {
      const e = await this.storageUtils.get(t);
      return e ? (a(`Successfully loaded mount from storage: ${t}`), e) : (a(`No mount found in storage for path: ${t}`), null);
    } catch (e) {
      throw m(`Failed to load mount from storage (path: ${t}):`, e), e;
    }
  }
  async persistMountData(t, e) {
    a(`Persisting mount data for ${t}`);
    try {
      const r = { ...e };
      delete r.fsInstance, await this.storageUtils.store(t, r), a(`Successfully persisted mount data for ${t}`);
    } catch (r) {
      throw m(`Failed to persist mount data for ${t}:`, r), r;
    }
  }
  // Filesystem Instance Management
  async createFSInstance(t, e, r = {}) {
    a(`Creating FS instance of type ${t} for mount path ${e}`);
    try {
      const i = await this.determineUseSW(t, r);
      t === "idb" && (a("Checking IndexedDB support for IDB FS"), await this.checkIndexedDBSupport() || (a(`IndexedDB not supported, falling back to memory FS for ${e}`), t = "memory"));
      let s;
      switch (t) {
        case "memory":
          a("Creating MemoryFS instance"), s = new z(e, { ...r, useSW: !1 });
          break;
        case "idb":
          a("Creating IDBFs instance"), s = new H(e, { ...r, useSW: i });
          break;
        default:
          const o = `Unknown FS type: ${t}`;
          throw m(o), new Error(o);
      }
      return a(`Successfully created ${t} FS instance for ${e}`), s;
    } catch (i) {
      throw m(`Failed to create FS instance (type: ${t}, path: ${e}):`, i), i;
    }
  }
  async ensureFSInitialized(t) {
    if (a(`Ensuring FS is initialized for path: ${t}`), this.initializedMounts.has(t))
      return a(`FS already initialized for path: ${t}`), !0;
    const e = this.mounts[t];
    if (!e) {
      const r = `Mount not found: ${t}`;
      throw m(r), new Error(r);
    }
    if (!e.fsInstance) {
      a(`Creating new FS instance for mount at ${t}`);
      const r = await this.determineUseSW(e.fsType, e);
      e.fsInstance = await this.createFSInstance(
        e.fsType,
        t,
        {
          useSW: r,
          versioning: this.getVersioningConfig(e),
          merging: this.getMergingConfig(e)
        }
      );
    }
    return a(`Fetching data for mount at ${t}`), await this.fetchFS(
      e.fetchMethod,
      e.fsType,
      e.fsInstance,
      t,
      e.fetchInfo
    ), this.initializedMounts.add(t), a(`Successfully initialized FS for path: ${t}`), !0;
  }
  // Mount/Unmount Operations
  async mount(t, e, r, i, s = {}) {
    a(`Mounting filesystem - path: ${t}, type: ${e}, name: ${r}, method: ${i}, options: ${JSON.stringify(s)}`);
    try {
      const o = s.fetchInfo || {}, l = this.getVersioningConfig(s), c = this.getMergingConfig(s), g = `${t.endsWith("/") ? t : `${t}/`}${r}`;
      if (a(`Normalized mount path: ${g}`), this.mounts[g]) {
        const v = `Path ${g} is already mounted`;
        throw m(v), new Error(v);
      }
      this.currentMountPath = g, a(`Checking storage for existing mount at ${g}`);
      const $ = await this.loadMountFromStorage(g);
      return $ ? (a(`Found stored mount, initializing existing mount at ${g}`), this.initializeStoredMount(g, $, i, o, { versioning: l, merging: c })) : (a(`No stored mount found, creating new mount at ${g}`), this.createNewMount(g, e, r, i, o, l, c));
    } catch (o) {
      throw m("Mount operation failed:", o), o;
    }
  }
  async initializeStoredMount(t, e, r, i, s) {
    a(`Initializing stored mount at ${t}`);
    try {
      a(`Creating FS instance for stored mount (type: ${e.fsType})`);
      const o = await this.createFSInstance(
        e.fsType,
        t,
        {
          versioning: this.getVersioningConfig(e),
          merging: this.getMergingConfig(e)
        }
      );
      return a(`Fetching data for stored mount using method: ${e.fetchMethod || r}`), await this.fetchFS(
        e.fetchMethod || r,
        e.fsType,
        o,
        t,
        e.fetchInfo || i
      ), this.mounts[t] = {
        ...e,
        fsInstance: o,
        fetchMethod: e.fetchMethod || r,
        fetchInfo: e.fetchInfo || i,
        versioning: this.getVersioningConfig(e),
        merging: this.getMergingConfig(e)
      }, this.initializedMounts.add(t), a(`Successfully initialized stored mount at ${t}`), this.mounts[t];
    } catch (o) {
      throw m(`Failed to initialize stored mount at ${t}:`, o), o;
    }
  }
  async createNewMount(t, e, r, i, s, o = {}, l = {}) {
    a(`Creating new mount at ${t}`);
    try {
      a(`Creating new FS instance (type: ${e})`);
      const c = await this.createFSInstance(e, t, { versioning: o, merging: l });
      a(`Fetching data for new mount using method: ${i}`), await this.fetchFS(i, e, c, t, s), a("Generating filesystem table");
      const d = await this.VFSutils.generateFsTable(), g = await this.VFSutils.getFsTableSize(d);
      a(`Filesystem table generated, size: ${g}`);
      const $ = {
        fsInstance: c,
        fsType: c instanceof z ? "memory" : e,
        fsName: r,
        fsTable: d,
        fetchMethod: i,
        fetchInfo: {
          ...s,
          time: (/* @__PURE__ */ new Date()).toISOString(),
          size: g
        },
        versioning: this.getVersioningConfig({ versioning: o }),
        merging: this.getMergingConfig({ merging: l })
      };
      return this.mounts[t] = $, a(`Persisting mount data for ${t}`), await this.persistMountData(t, $), this.initializedMounts.add(t), a(`Successfully mounted new filesystem at ${t}`), $;
    } catch (c) {
      throw m(`Failed to create new mount at ${t}:`, c), c;
    }
  }
  async unmount(t, e) {
    const r = t + "/" + e;
    if (a(`Unmounting filesystem at ${r}`), !this.mounts[r]) {
      const i = `Path ${r} is not mounted`;
      throw m(i), new Error(i);
    }
    try {
      return this.mounts[r].fsInstance && (a(`Closing all files for mount at ${r}`), await this.mounts[r].fsInstance.fs_fcloseall(), this.mounts[r].fsInstance = null), delete this.mounts[r], this.initializedMounts.delete(r), Object.keys(this.mounts).length === 0 && this.VFSutils && (a("Terminating VFSutils instance (no more mounts)"), await this.VFSutils.terminate(), this.VFSutils = null), a(`Successfully unmounted ${r}`), !0;
    } catch (i) {
      throw m(`Error unmounting ${r}:`, i), i;
    }
  }
  // Filesystem Operations
  async fetchFS(t, e, r, i, s, o = !1) {
    a(`Fetching filesystem data - method: ${t}, type: ${e}, name: ${i}`);
    try {
      this.VFSutils && (a("Terminating existing VFSutils instance"), await this.VFSutils.terminate(), this.VFSutils = null), a("Creating new VFSutils instance"), this.VFSutils = new J(e, r, i, s, o);
      const c = {
        git: () => this.VFSutils.fetchFromGit(),
        disk: () => this.VFSutils.fetchFromDisk(),
        googleDrive: () => this.VFSutils.fetchFromGoogleDrive()
      }[t];
      if (!c) {
        const d = `Unknown fetch method: ${t}`;
        throw m(d), new Error(d);
      }
      a(`Executing fetch strategy for ${t}`), await c(), a(`Successfully fetched data using ${t} method`);
    } catch (l) {
      throw m(`Fetch operation failed (method: ${t}):`, l), this.VFSutils && (a("Cleaning up VFSutils after fetch failure"), await this.VFSutils.terminate(), this.VFSutils = null), l;
    }
  }
  async resolveFS(t) {
    a(`Resolving filesystem for path: ${t}`);
    try {
      for (const r in this.mounts)
        if (t.startsWith(r)) {
          a("Found matching mount at ", r), await this.ensureFSInitialized(r);
          const i = t.slice(r.length) || "/";
          return a(`Resolved path: ${t} to mount: ${r}, relative path: ${i}, this.mounts[mountPath] : `, this.mounts[r]), a(
            "resolveFs returned value: ",
            {
              fs: this.mounts[r],
              relativePath: i,
              versioning: this.mounts[r].versioning || p.versioning,
              merging: this.mounts[r].merging || p.merging
            }
          ), {
            fs: this.mounts[r],
            relativePath: i,
            versioning: this.mounts[r].versioning || p.versioning,
            merging: this.mounts[r].merging || p.merging
          };
        }
      const e = `No filesystem mounted for path: ${t}`;
      throw m(e), new Error(e);
    } catch (e) {
      throw m(`Failed to resolve filesystem for path ${t}:`, e), e;
    }
  }
  // Filesystem Table Operations
  async writeToFsTable(t, e = "file", r = 0) {
    a(`Writing to fsTable - path: ${t}, type: ${e}, size: ${r}`), await this.validateVFSutils();
    try {
      a(`Updating fsTable with create operation for ${t}`);
      const i = await this.VFSutils.updateFsTable("create", t, e, r);
      return a("Updating mount fsTable with new data"), await this.updateMountFsTable(i.fsTable), a(`Successfully updated fsTable for ${t}`), i.fsTable;
    } catch (i) {
      throw m("Failed to write to fsTable:", i), i;
    }
  }
  async removeFromFsTable(t) {
    a(`Removing from fsTable - path: ${t}`), await this.validateVFSutils();
    try {
      a(`Updating fsTable with remove operation for ${t}`);
      const e = await this.VFSutils.updateFsTable("remove", t);
      return a("Updating mount fsTable with removal data"), await this.updateMountFsTable(e.fsTable), a(`Successfully removed ${t} from fsTable`), e.fsTable;
    } catch (e) {
      throw m("Failed to remove from fsTable:", e), e;
    }
  }
  async updateMountFsTable(t) {
    if (a("Updating mount fsTable for current mount path"), !this.currentMountPath) {
      const r = "No active mount path available";
      throw m(r), new Error(r);
    }
    a(`Loading mount data for ${this.currentMountPath}`);
    const e = await this.storageUtils.get(this.currentMountPath);
    if (!e) {
      const r = `Mount data not found for path: ${this.currentMountPath}`;
      throw m(r), new Error(r);
    }
    a("Updating fsTable in mount data"), e.fsTable = t, a(`Storing updated mount data for ${this.currentMountPath}`), await this.storageUtils.store(this.currentMountPath, e), a("Successfully updated mount fsTable");
  }
  // Validation Utilities
  async validateVFSutils() {
    if (a("Validating VFSutils instance"), !this.VFSutils) {
      const t = "VFSutils not initialized";
      throw m(t), new Error(t);
    }
    a("VFSutils validation passed");
  }
  //----------------------
  // Versioning Operations
  //----------------------
  async versioner(t) {
    a(`Committing version with message: ${t}`), await this.validateVFSutils();
    try {
      const e = await this.VFSutils.commitStagedChanges(t);
      return a("Version committed successfully"), e;
    } catch (e) {
      throw m("Failed to commit version:", e), e;
    }
  }
  //--------------------
  // Merging Operations
  //--------------------
  async merger() {
    a("Starting merge operation"), await this.validateVFSutils();
    try {
      const t = await this.VFSutils.autoSyncFlow();
      return a("Merge operation completed successfully:", t), t;
    } catch (t) {
      throw m("Merge operation failed:", t), t;
    }
  }
  //-------------------
  // Some info setters for vfsUtils
  //-------------------
  async setMergingStrategy(t) {
    a("Setting merging strategy");
    let e = this.mounts[this.currentMountPath];
    return e = { ...e, merging: t }, await this.persistMountData(this.currentMountPath, e), a("Merging strategy set successfully:", t), !0;
  }
  async setVersioingStrategy(t) {
    a("Setting versioning strategy");
    let e = this.mounts[this.currentMountPath];
    return e = { ...e, versioning: t }, await this.persistMountData(mountPath, e), a("Versioning strategy set successfully:", t), !0;
  }
  async setUserConfigs(t) {
    await this.validateVFSutils(), a("Setting user configurations:", t), await this.VFSutils.updateFetchInfo(t);
    let e = this.mounts[this.currentMountPath];
    return e = { ...e, fetchInfo: { ...e.fetchInfo, ...t } }, this.persistMountData(this.currentMountPath, e), t;
  }
}
const B = new F(p.logging.kfs);
function I(...n) {
  B.consoleDotLog("[Versioning]", ...n);
}
function et(...n) {
  B.consoleDotError("[Versioning]", ...n);
}
class rt {
  constructor(t) {
    this.vfs = t, this.clockIntervalID = null, this.operationQueueCount = 0, this.config = this._getDefaultVersioningConfig();
  }
  _getDefaultVersioningConfig() {
    const t = p.versioning || {};
    return {
      strategy: t.strategy,
      interval: t.interval,
      number: t.number
    };
  }
  async _getVersioningConfig(t = {}) {
    const e = this._getDefaultVersioningConfig(), r = t.versioning || {};
    return {
      strategy: r.strategy || e.strategy,
      interval: r.interval || e.interval,
      number: r.number || e.number
    };
  }
  async setup(t = {}) {
    this.config = await this._getVersioningConfig(t), I("Versioning configuration:", this.config), this.config.strategy === "clock" ? this._startClockVersioning() : this.clearClock();
  }
  clearClock() {
    this.clockIntervalID && (clearInterval(this.clockIntervalID), this.clockIntervalID = null);
  }
  _startClockVersioning() {
    this.clearClock();
    const t = (this.config.interval || 10) * 1e3;
    I("Starting clock-based versioning with interval:", t, "ms"), this.clockIntervalID = setInterval(async () => {
      I("Clock-based auto commit triggered");
      try {
        await this.vfs.versioner("Clock-based auto commit");
      } catch (e) {
        et("Error in clock-based versioning:", e);
      }
    }, t);
  }
  async maybeTriggerVersioning(t = null) {
    const e = t || this.config;
    if (e.strategy !== "immediate" && e.strategy === "batch") {
      this.operationQueueCount++;
      const r = e.number || 5;
      I(`Batch operation count: ${this.operationQueueCount}/${r}`), this.operationQueueCount >= r && (this.operationQueueCount = 0, await this.vfs.versioner(`Batch commit after ${r} operations`));
    }
  }
  async getConfig() {
    return this.config;
  }
}
new F(p.logging.kfs);
class it {
  constructor(t) {
    this.vfs = t, this.clockIntervalID = null, this.config = this._getDefaultMergingConfig();
  }
  _getDefaultMergingConfig() {
    return {
      strategy: p.merging?.strategy || null,
      interval: p.merging?.interval || 10,
      number: p.merging?.number || 5
    };
  }
  async setup(t = {}) {
    this.config = {
      ...this._getDefaultMergingConfig(),
      ...t.merging || {}
    }, this.config.strategy === "clock" ? await this._startClockMerging() : this.clearClock();
  }
  async _startClockMerging() {
    this.clearClock();
    const t = this.config.interval * 1e3;
    this.clockIntervalID = setInterval(async () => {
      try {
        await this.vfs.merger.merge("Clock-based auto merge");
      } catch (e) {
        console.error("Clock-based merge failed:", e);
      }
    }, t);
  }
  clearClock() {
    this.clockIntervalID && (clearInterval(this.clockIntervalID), this.clockIntervalID = null);
  }
  async getConfig() {
    return this.config;
  }
}
const st = await j(), U = new F(st.logging.kfs);
function x(...n) {
  U.consoleDotLog("[KFS]", ...n);
}
function E(...n) {
  U.consoleDotError("[KFS]", ...n);
}
class at {
  constructor() {
    this.vfs = new tt(), this.fsInstance = null, this.versioningManager = new rt(this.vfs), this.mergingManager = new it(this.vfs), this.commitCount = 0;
  }
  // -------------------------------
  // Versioning Configuration
  // -------------------------------
  _setupVersioningAndMerging(t) {
    this.versioningManager.setup(t), this.mergingManager.setup(t);
  }
  _clearClocks() {
    this.versioningManager.clearClock(), this.mergingManager.clearClock();
  }
  async _handleCommit(t) {
    await this.versioningManager.getConfig();
    const e = await this.mergingManager.getConfig();
    await this.vfs.versioner(t), this.commitCount++, e.strategy === "immediate" && await this.vfs.merger();
  }
  // -------------------------------
  // Filesystem Operations
  // -------------------------------
  async mount(t, e, r, i, s = {}) {
    try {
      this._setupVersioningAndMerging(s), t = this._normalizePath(t);
      const o = await this.versioningManager.getConfig(), l = await this.mergingManager.getConfig(), c = await this.vfs.mount(t, e, r, i, {
        ...s,
        versioning: o,
        merging: l
      });
      this.fsInstance = c.fsInstance;
      const d = await this.read(`${t}/${r}`);
      return x("Mount successful, root:", d), c;
    } catch (o) {
      throw E(`Failed to mount filesystem at ${t}:`, o), new Error(`Failed to mount filesystem: ${o.message}`);
    }
  }
  async unmount(t, e) {
    try {
      return t = this._normalizePath(t), await this.vfs.unmount(t, e), this.fsInstance = null, this._clearClocks(), this.commitCount = 0, { success: !0 };
    } catch (r) {
      throw E(`Failed to unmount filesystem at ${t}:`, r), new Error(`Failed to unmount filesystem: ${r.message}`);
    }
  }
  async setMergingStrategy(t) {
    await this.vfs.setMergingStrategy(t), x("Merging strategy set to:", t);
  }
  async setVersioingStrategy(t) {
    await this.vfs.setVersioingStrategy(t), x("Versioning strategy set to:", t);
  }
  /**
   * Sets user configurations for the KFS instance.
    * @param {string} [args.name] - The name of the user.
    * @param {string} [args.email] - The email of the user.
    * @param {string} [args.username] - The username of the user.
    * @param {string} [args.password] - The password of the user.
    * @throws {Error} - Throws an error if the arguments are invalid or if the operation fails.
   */
  async setUserConfigs(t) {
    if (!t || typeof t != "object")
      throw new Error("Invalid arguments: must be an object");
    const e = ["password", "username", "email", "name"], r = Object.keys(t).filter(
      (i) => !e.includes(i)
    );
    if (r.length > 0)
      throw new Error(
        `Invalid field(s) provided: ${r.join(", ")}. Allowed fields are: ${e.join(", ")}`
      );
    return this.vfs.setUserConfigs(t), t;
  }
  async create(t, e = "file", r = "", i = "w") {
    try {
      if (!["file", "dir"].includes(e))
        throw new Error(`Invalid type: ${e}. Must be 'file' or 'dir'`);
      if (!["a", "w"].includes(i))
        throw new Error(`Invalid mode: ${i}. Must be 'a' (append) or 'w' (write)`);
      t = this._normalizePath(t);
      const { fs: s, relativePath: o, versioning: l } = await this.vfs.resolveFS(t);
      if (e === "file") {
        await this._ensurePathExists(s, o);
        let c = r, d = `Created file at ${t}`;
        if (i === "a")
          try {
            const $ = await s.fsInstance.fs_fopen(o, "r"), v = await s.fsInstance.fs_fread($, 1024 * 1024);
            await s.fsInstance.fs_fclose($), c = v + r, d = `Appended to file at ${t}`;
          } catch {
            d = `Created file at ${t}`;
          }
        const g = await s.fsInstance.fs_fopen(o, "w");
        await s.fsInstance.fs_fwrite(g, c), await s.fsInstance.fs_fclose(g), await this.vfs.writeToFsTable(o, e, c.length), l?.strategy === "immediate" ? await this._handleCommit(d) : await this.versioningManager.maybeTriggerVersioning(l);
      } else if (e === "dir")
        if (i === "a")
          try {
            await s.fsInstance.fs_mkdir(o), await this.vfs.writeToFsTable(o, e, 0), l?.strategy === "immediate" && await this._handleCommit(`Created directory at ${t}`);
          } catch (c) {
            if (!c.message.includes("exists")) throw c;
          }
        else {
          try {
            await (await s.fsInstance.fs_stat(o)).isDirectory() ? await s.fsInstance.fs_rmdir(o) : await s.fsInstance.fs_remove(o);
          } catch {
          }
          await s.fsInstance.fs_mkdir(o), await this.vfs.writeToFsTable(o, e, 0), l?.strategy === "immediate" && await this._handleCommit(`Created directory at ${t}`);
        }
      return { success: !0 };
    } catch (s) {
      throw E(`Failed to create ${e} at ${t}:`, s), new Error(`Failed to create: ${s.message}`);
    }
  }
  async remove(t) {
    try {
      t = this._normalizePath(t);
      const { fs: e, relativePath: r, versioning: i } = await this.vfs.resolveFS(t), s = await e.fsInstance.fs_stat(r);
      if (!s) throw new Error("ENOENT: no such file or directory");
      return await s.isDirectory() ? await e.fsInstance.fs_rmdir(r) : await e.fsInstance.fs_remove(r), await this.vfs.removeFromFsTable(r), i?.strategy === "immediate" ? await this._handleCommit(`Removed ${t}`) : await this.versioningManager.maybeTriggerVersioning(i), { success: !0 };
    } catch (e) {
      throw E(`Failed to remove ${t}:`, e), new Error(`Failed to remove: ${e.message}`);
    }
  }
  async read(t) {
    try {
      t = this._normalizePath(t);
      const { fs: e, relativePath: r } = await this.vfs.resolveFS(t);
      this.fsInstance = e.fsInstance;
      const i = await this.fsInstance.fs_stat(r);
      if (!i) throw new Error("ENOENT: no such file or directory");
      if (await i.isDirectory())
        return await this.fsInstance.fs_readdir(r);
      {
        const s = await this.fsInstance.fs_fopen(r, "r"), o = await this.fsInstance.fs_fread(s, 1024 * 1024);
        return await this.fsInstance.fs_fclose(s), o;
      }
    } catch (e) {
      throw new Error(`Failed to read file: ${e.message}`);
    }
  }
  // -------------------------------
  // Utility Methods
  // -------------------------------
  async _ensurePathExists(t, e) {
    const i = e.split("/").filter((o) => o !== "").slice(0, -1);
    let s = "";
    for (const o of i) {
      s = s ? `${s}/${o}` : `/${o}`;
      try {
        await t.fsInstance.fs_mkdir(s), await this.vfs.writeToFsTable(s, "dir");
      } catch (l) {
        if (!l.message.includes("exists")) throw l;
      }
    }
  }
  _normalizePath(t) {
    if (typeof t != "string") throw new Error("Path must be a string");
    return t.startsWith("/") ? t : `/${t}`;
  }
}
export {
  at as KFS,
  ft as serviceWorker,
  ht as setConfig
};
//# sourceMappingURL=kfs.js.map
