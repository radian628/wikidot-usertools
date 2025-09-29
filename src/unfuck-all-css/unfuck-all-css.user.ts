window.addEventListener("load", () => {
  setTimeout(() => {
    const styles = Array.from(document.querySelectorAll("style"));
    for (const s of styles) {
      s.parentElement!.removeChild(s);
    }

    setTimeout(() => {
      for (const s of styles) {
        s.textContent += "/*force refresh lol*/";
        document.head.appendChild(s);
      }
    }, 200);
    console.log("hi");
  }, 100);
});
