var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { g as getBrowserState, a as getConfig, r as relative } from "./utils-Owv5OOOf.js";
import { channel, globalChannel, client } from "@vitest/browser/client";
function generateHash(str) {
  let hash = 0;
  if (str.length === 0) {
    return `${hash}`;
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return `${hash}`;
}
function getUiAPI() {
  return window.__vitest_ui_api__;
}
const url = new URL(location.href);
const ID_ALL = "__vitest_all__";
class IframeOrchestrator {
  constructor() {
    __publicField(this, "cancelled", false);
    __publicField(this, "recreateNonIsolatedIframe", false);
    __publicField(this, "iframes", /* @__PURE__ */ new Map());
    debug("init orchestrator", getBrowserState().sessionId);
    channel.addEventListener(
      "message",
      (e) => this.onIframeEvent(e)
    );
    globalChannel.addEventListener(
      "message",
      (e) => this.onGlobalChannelEvent(e)
    );
  }
  async createTesters(options) {
    this.cancelled = false;
    const config = getConfig();
    debug("create testers", options.files.join(", "));
    const container = await getContainer(config);
    if (config.browser.ui) {
      container.className = "absolute origin-top mt-[8px]";
      container.parentElement.setAttribute("data-ready", "true");
      if (container.textContent) {
        container.textContent = "";
      }
    }
    if (config.browser.isolate === false) {
      await this.runNonIsolatedTests(container, options);
      return;
    }
    this.iframes.forEach((iframe) => iframe.remove());
    this.iframes.clear();
    for (let i = 0; i < options.files.length; i++) {
      if (this.cancelled) {
        return;
      }
      const file = options.files[i];
      debug("create iframe", file);
      await this.runIsolatedTestInIframe(
        container,
        file,
        options
      );
    }
  }
  async cleanupTesters() {
    const config = getConfig();
    if (config.browser.isolate) {
      const files = Array.from(this.iframes.keys());
      const ui = getUiAPI();
      if (ui && files[0]) {
        const id = generateFileId(files[0]);
        ui.setCurrentFileId(id);
      }
      return;
    }
    const iframe = this.iframes.get(ID_ALL);
    if (!iframe) {
      return;
    }
    await sendEventToIframe({
      event: "cleanup",
      iframeId: ID_ALL
    });
    this.recreateNonIsolatedIframe = true;
  }
  async runNonIsolatedTests(container, options) {
    if (this.recreateNonIsolatedIframe) {
      this.recreateNonIsolatedIframe = false;
      this.iframes.get(ID_ALL).remove();
      this.iframes.delete(ID_ALL);
      debug("recreate non-isolated iframe");
    }
    if (!this.iframes.has(ID_ALL)) {
      debug("preparing non-isolated iframe");
      await this.prepareIframe(container, ID_ALL);
    }
    const config = getConfig();
    const { width, height } = config.browser.viewport;
    const iframe = this.iframes.get(ID_ALL);
    await setIframeViewport(iframe, width, height);
    debug("run non-isolated tests", options.files.join(", "));
    await sendEventToIframe({
      event: "execute",
      iframeId: ID_ALL,
      files: options.files,
      method: options.method,
      context: options.providedContext
    });
  }
  async runIsolatedTestInIframe(container, file, options) {
    const config = getConfig();
    const { width, height } = config.browser.viewport;
    if (this.iframes.has(file)) {
      this.iframes.get(file).remove();
      this.iframes.delete(file);
    }
    const iframe = await this.prepareIframe(container, file);
    await setIframeViewport(iframe, width, height);
    await sendEventToIframe({
      event: "execute",
      files: [file],
      method: options.method,
      iframeId: file,
      context: options.providedContext
    });
    await sendEventToIframe({
      event: "cleanup",
      iframeId: file
    });
  }
  async prepareIframe(container, iframeId) {
    const iframe = this.createTestIframe(iframeId);
    container.appendChild(iframe);
    await new Promise((resolve, reject) => {
      iframe.onload = () => {
        this.iframes.set(iframeId, iframe);
        sendEventToIframe({
          event: "prepare",
          iframeId
        }).then(resolve, reject);
      };
      iframe.onerror = (e) => {
        if (typeof e === "string") {
          reject(new Error(e));
        } else if (e instanceof ErrorEvent) {
          reject(e.error);
        } else {
          reject(new Error(`Cannot load the iframe ${iframeId}.`));
        }
      };
    });
    return iframe;
  }
  createTestIframe(iframeId) {
    const iframe = document.createElement("iframe");
    const src = `${url.pathname}__vitest_test__/__test__/?sessionId=${getBrowserState().sessionId}&iframeId=${iframeId}`;
    iframe.setAttribute("loading", "eager");
    iframe.setAttribute("src", src);
    iframe.setAttribute("data-vitest", "true");
    iframe.style.border = "none";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("allow", "clipboard-write;");
    iframe.setAttribute("name", "vitest-iframe");
    return iframe;
  }
  async onGlobalChannelEvent(e) {
    debug("global channel event", JSON.stringify(e.data));
    switch (e.data.type) {
      case "cancel": {
        this.cancelled = true;
        break;
      }
    }
  }
  async onIframeEvent(e) {
    debug("iframe event", JSON.stringify(e.data));
    switch (e.data.event) {
      case "viewport": {
        const { width, height, iframeId: id } = e.data;
        const iframe = this.iframes.get(id);
        if (!iframe) {
          const error = `Cannot find iframe with id ${id}`;
          channel.postMessage({
            event: "viewport:fail",
            iframeId: id,
            error
          });
          await client.rpc.onUnhandledError(
            {
              name: "Teardown Error",
              message: error
            },
            "Teardown Error"
          );
          break;
        }
        await setIframeViewport(iframe, width, height);
        channel.postMessage({ event: "viewport:done", iframeId: id });
        break;
      }
      default: {
        if (typeof e.data.event === "string" && e.data.event.startsWith("response:")) {
          break;
        }
        await client.rpc.onUnhandledError(
          {
            name: "Unexpected Event",
            message: `Unexpected event: ${e.data.event}`
          },
          "Unexpected Event"
        );
      }
    }
  }
}
getBrowserState().orchestrator = new IframeOrchestrator();
async function getContainer(config) {
  if (config.browser.ui) {
    const element = document.querySelector("#tester-ui");
    if (!element) {
      return new Promise((resolve) => {
        queueMicrotask(() => {
          resolve(getContainer(config));
        });
      });
    }
    return element;
  }
  return document.querySelector("#vitest-tester");
}
async function sendEventToIframe(event) {
  channel.postMessage(event);
  return new Promise((resolve) => {
    channel.addEventListener(
      "message",
      function handler(e) {
        if (e.data.iframeId === event.iframeId && e.data.event === `response:${event.event}`) {
          resolve();
          channel.removeEventListener("message", handler);
        }
      }
    );
  });
}
function generateFileId(file) {
  const config = getConfig();
  const project = config.name || "";
  const path = relative(config.root, file);
  return generateHash(`${path}${project}`);
}
async function setIframeViewport(iframe, width, height) {
  var _a, _b;
  const ui = getUiAPI();
  if (ui) {
    await ui.setIframeViewport(width, height);
  } else if (getBrowserState().provider === "webdriverio") {
    iframe.style.width = `${width}px`;
    iframe.style.height = `${height}px`;
    (_a = iframe.parentElement) == null ? void 0 : _a.setAttribute("data-scale", "1");
  } else {
    const scale = Math.min(
      1,
      iframe.parentElement.parentElement.clientWidth / width,
      iframe.parentElement.parentElement.clientHeight / height
    );
    iframe.parentElement.style.cssText = `
      width: ${width}px;
      height: ${height}px;
      transform: scale(${scale});
      transform-origin: left top;
    `;
    (_b = iframe.parentElement) == null ? void 0 : _b.setAttribute("data-scale", String(scale));
    await new Promise((r) => requestAnimationFrame(r));
  }
}
function debug(...args) {
  const debug2 = getConfig().env.VITEST_BROWSER_DEBUG;
  if (debug2 && debug2 !== "false") {
    client.rpc.debug(...args.map(String));
  }
}
