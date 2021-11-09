import {useDebounce, useWindowResize} from "stimulus-use";
import type {WindowResizePayload } from "stimulus-use/dist/use-window-resize/use-window-resize";
import {BaseController} from "../utilities/base_controller";
import {useEventListener} from "../mixins/use_event_listener";

interface ResponsiveIframeMessage {
  name: string,
  height: number,
}

export class ResponsiveIframeWrapperController extends BaseController {

  connect() {
    useEventListener(this, window, "message", this.messageReceived);
  }

  messageReceived(message: MessageEvent<ResponsiveIframeMessage>) {
    let data = message.data;
    if (data.hasOwnProperty("name") && data.name === "iframe-body" && data.hasOwnProperty("height")) {
      this.resize(data.height);
    }
  }

  resize(height: number) {
    (this.el as HTMLIFrameElement).style.height = `${height}px`;
  }

}

export class ResponsiveIframeBodyController extends BaseController {

  static debounces = ["postUpdate"];

  declare observe: () => void;
  declare unobserve: () => void;

  connect() {
    // If this Window is inside a frame
    if (window.self !== window.top) {
      useWindowResize(this);
      useDebounce(this, {});
      this.postUpdate();
    } else {
      // Not an iframe
    }
  }

  windowResize(payload: WindowResizePayload) {
    this.postUpdate();
  };

  postUpdate() {
    let payload: ResponsiveIframeMessage = {name: "iframe-body", height: this.getHeight()};
    window.parent.postMessage(
      payload,
      "*",
    );
  }

  getHeight(): number {
    const body = document.body;
    const html = document.documentElement;

    // Get the largest height out of body and html's various height measurements
    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  }

}
