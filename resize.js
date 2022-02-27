let lastMousePosition = [0, 0];
let resizing = false;
const handler = document.querySelectorAll(".handler");
handler.forEach((handle) => {
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
    prev.style.width =
      prev.offsetWidth - (lastMousePosition[0] - e.pageX) + "px";
    console.log(next.offsetWidth);
    next.style.width =
      next.offsetWidth + (lastMousePosition[0] - e.pageX) + "px";
  }

  lastMousePosition = [e.pageX, e.pageY];
});
