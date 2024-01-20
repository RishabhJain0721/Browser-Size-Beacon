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
    pTag.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    pTag.style.color = "#000";
    pTag.style.padding = "10px";
    document.body.appendChild(pTag);
    function updateWindowSize() {
      if (!document.getElementById("size")) return 0;
      let width = window.innerWidth;
      let height = window.innerHeight;
      let tailwindBreakpoint;
      if (width > 1536) tailwindBreakpoint = "2xl";
      else if (width > 1280) tailwindBreakpoint = "xl";
      else if (width > 1024) tailwindBreakpoint = "lg";
      else if (width > 768) tailwindBreakpoint = "md";
      else if (width > 640) tailwindBreakpoint = "sm";
      else tailwindBreakpoint = "";

      document.getElementById(
        "size"
      ).innerHTML = `Size: ${width} x ${height} <br> TW breakpoint : ${tailwindBreakpoint} `;
    }

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
  }
}
