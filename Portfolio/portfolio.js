document.querySelectorAll(".portfolio-box").forEach((box) => {
  box.addEventListener("click", () => {
    const title = box.getAttribute("data-title");
    console.log(`You clicked on: ${title}`);
    // window.open("https://your-link.com", "_blank");
  });
});
