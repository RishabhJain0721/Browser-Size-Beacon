chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: injectedFunction,
  });
});

// Function to be injected
function injectedFunction() {
  if (document.getElementById("size")) {
    document.getElementById("size").remove();
    return 0;
  } else {
    const pTag = document.createElement("p");
    pTag.id = "size";
    pTag.textContent = ` Size : `;
    pTag.style.position = "fixed";
    pTag.style.top = "0";
    pTag.style.left = "0";
    pTag.style.zIndex = "10000"; // High z-index to ensure it's above other elements
    pTag.style.backgroundColor = "#FFF";
    pTag.style.color = "#000";
    pTag.style.padding = "10px";
    document.body.appendChild(pTag);
    function updateWindowSize() {
      if(!document.getElementById("size")) return 0;
      var width = window.innerWidth;
      var height = window.innerHeight;
      document.getElementById(
        "size"
      ).textContent = `Size: ${width} x ${height}`;
    }

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
  }
}
