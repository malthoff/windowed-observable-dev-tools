chrome.devtools.panels.create("Windowed Observable", null, "index.html", (panel) => {
  var appIsMounted = false;

  panel.onShown.addListener(() => {
    if (appIsMounted) {
      chrome.runtime.sendMessage("onShow");
    }
  });

  panel.onHidden.addListener(() => {
    if (appIsMounted) {
      chrome.runtime.sendMessage("onHidden");
    }
  });

  // listen for onMounted event from vue app.
  chrome.runtime.onMessage.addListener((message) => {
    if (message === "onMounted") {
      appIsMounted = true;
    }
  });
});
