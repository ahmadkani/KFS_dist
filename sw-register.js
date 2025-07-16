import { g, L as d } from "./configES6-vU0hiYhv.js";
const l = await g(), c = new d(l.logging.ServiceWorkerRegistration);
function t(...o) {
  c.consoleDotLog(...o);
}
function s(...o) {
  c.consoleDotError(...o);
}
let i;
class u {
  constructor() {
    "serviceWorker" in navigator && navigator.serviceWorker.addEventListener("controllerchange", () => {
      t("Service Worker controller changed."), i && (i.close(), i = null), window.location.reload();
    });
  }
  async register({ scope: e = "/", enableSync: r = !1 } = {}) {
    if ("serviceWorker" in navigator)
      try {
        const n = await navigator.serviceWorker.getRegistration();
        if (n)
          return t("Service Worker already registered:", n), n;
        const a = await navigator.serviceWorker.register(
          "./service-worker.js",
          { scope: e, type: "module" }
        );
        return t("Service Worker registered with scope:", e, a), this._setupUpdateHandling(a), r && "SyncManager" in window && this._setupBackgroundSync(a), a;
      } catch (n) {
        throw s("Service Worker registration failed:", n), n;
      }
    else {
      t("Service Worker not supported");
      return;
    }
  }
  async unregister() {
    if ("serviceWorker" in navigator)
      try {
        const e = await navigator.serviceWorker.getRegistration();
        e && (await e.unregister(), t("Service Worker unregistered."));
      } catch (e) {
        throw s("Service Worker unregistration failed:", e), e;
      }
  }
  _setupUpdateHandling(e) {
    e.waiting && this._updateReady(e.waiting), e.onupdatefound = () => {
      const r = e.installing;
      r.onstatechange = () => {
        r.state === "installed" && navigator.serviceWorker.controller && this._updateReady(r);
      };
    };
  }
  _updateReady(e) {
    t("New update ready:", e), i || (i = new BroadcastChannel("sw-update-channel")), confirm("A new version is available. Would you like to update?") && (e.postMessage({ action: "skipWaiting" }), e.addEventListener("statechange", () => {
      e.state === "activated" && setTimeout(() => {
        i && i.close(), window.location.reload();
      }, 0);
    }));
  }
  _setupBackgroundSync(e) {
    e.sync.register("my-sync").then(() => t("Sync registered")).catch((r) => s("Sync registration failed:", r));
  }
}
const w = new u();
export {
  w as serviceWorker
};
//# sourceMappingURL=sw-register.js.map
