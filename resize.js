let lastMousePosition = [0, 0];
let resizing = false;
const handler = document.querySelectorAll(".handler");
handler.forEach((handle) => {
  handle.addEventListener("mousedown", (e) => {
    console.log("clicked resize");
    resizing = e.target;
  });
});

const verticalHandler = document.querySelectorAll(".handler-vertical");
verticalHandler.forEach((handle) => {
  handle.addEventListener("mousedown", (e) => {
    console.log("clicked resize");
    resizing = e.target;
  });
});

window.addEventListener("mouseup", (e) => {
  resizing = false;
});

window.addEventListener("mousemove", (e) => {
  if (resizing) {
    const prev = resizing.previousElementSibling;
    const next = resizing.nextElementSibling;
    if (resizing.classList.contains("handler")) {
      prev.style.width =
        prev.offsetWidth - (lastMousePosition[0] - e.pageX) + "px";
      next.style.width =
        next.offsetWidth + (lastMousePosition[0] - e.pageX) + "px";
    } else if (resizing.classList.contains("handler-vertical")) {
      prev.style.height =
        prev.offsetHeight - (lastMousePosition[1] - e.pageY) + "px";
      next.style.height =
        next.offsetHeight + (lastMousePosition[1] - e.pageY) + "px";
    }
  }
  lastMousePosition = [e.pageX, e.pageY];
});
