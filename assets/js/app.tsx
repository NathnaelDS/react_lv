// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html";
// Establish Phoenix Socket and LiveView configuration.
import { Socket } from "phoenix";
import { LiveSocket } from "phoenix_live_view";
import topbar from "../vendor/topbar";
import { mount, update_mount } from "./mounter";
import { MyReactAppProps } from "./MyReactApp";

let Hooks = {};
Hooks.Greeter = {
  mounted() {
    const { root, unmount } = mount(this.el.id, this.opts());
    this.mountRoot = root;
    this.unmountComponent = unmount;

    this.handleEvent("react.update_count", ({ new_count: newCount }) => {
      update_mount(this.mountRoot, this.opts(newCount));
    });
  },

  destroyed() {
    if (!this.unmountComponent) {
      console.error("Greeter unmountComponent not set");
      return;
    }

    this.unmountComponent();
  },

  updateCount(newCount) {
    this.pushEventTo(this.el, "actions.countInc", { new_count: newCount });
  },

  opts(givenCount = 0): MyReactAppProps {
    return {
      name: "Fun",
      count: givenCount,
      updateCount: this.updateCount.bind(this),
      pushEventTo: (event, payload) =>
        this.pushEventTo(this.el, event, payload).bind(this),
      // todo: Passing the function `this.pushEvent` is not working as expected
      pushEvent: (payload) => this.pushEvent("actions.countInc", payload),
      handleEvent: this.handleEvent.bind(this),
    };
  },
};

let csrfToken = document
  .querySelector("meta[name='csrf-token']")
  ?.getAttribute("content");

let liveSocket = new LiveSocket("/live", Socket, {
  hooks: Hooks, // <---- don't forget!
  params: { _csrf_token: csrfToken },
});

// Show progress bar on live navigation and form submits
topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
window.addEventListener("phx:page-loading-start", (_info) => topbar.show(300));
window.addEventListener("phx:page-loading-stop", (_info) => topbar.hide());

// connect if there are any LiveViews on the page
liveSocket.connect();

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket;
