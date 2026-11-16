(function () {
  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (error) {}
    });
  }

  var side = document.querySelector("details.side");
  if (side && window.matchMedia("(max-width: 800px)").matches) side.open = false;

  document.querySelectorAll("figure.code").forEach(function (figure) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "copy";
    button.textContent = figure.dataset.copy;
    button.addEventListener("click", function () {
      var text = figure.querySelector("code").innerText;
      navigator.clipboard.writeText(text).then(function () {
        button.textContent = figure.dataset.copied;
        setTimeout(function () {
          button.textContent = figure.dataset.copy;
        }, 1500);
      });
    });
    figure.querySelector("figcaption").appendChild(button);
  });
})();
