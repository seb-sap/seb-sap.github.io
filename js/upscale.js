
/**
 *  Utilities
 */
function sendMessage(event, origin = "*") {
  // web
  if (window.parent !== window) {
    window.parent.postMessage(event, origin);
  }
  // android
  else if (window.Android) {
    window.Android.sendMessage(JSON.stringify(event));
  }
  // ios
  else if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.upscaleHandler
  ) {
    window.webkit.messageHandlers.upscaleHandler.postMessage(
      JSON.stringify(event)
    );
  } else {
    console.log("no send method detected");
  }
}
const SIZE_CHANGE_HEIGHT = 650;

/**
 * The code.
 */
console.log(`3D Viewer Initializing`);

const handleMessage = event => {
  console.log("------EVENT DATA------: ", event);

  const data = event.data;
  console.log("data.eventType: ", data.eventType);

  if (data.eventType !== "product_detail_component_init") {
    return;
  }

  if (data.keys.product.id !== 'rayban-glasses') {
    return;
  }

  const sizeEvent = { type: "sizeChange", data: { height: SIZE_CHANGE_HEIGHT } };
  sendMessage(sizeEvent);
};

/**
 * Setup
 */
window.addEventListener("message", handleMessage, false);
sendStartupEvents();

function sendStartupEvents() {
  const initEvent = { type: "initialized", data: null };
  sendMessage(initEvent);

  const sizeEvent = { type: "sizeChange", data: { height: 0 } };
  sendMessage(sizeEvent);
}

