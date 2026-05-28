(function () {
  const LEFT_CLASS = "hdl-sidebar-left-collapsed";
  const RIGHT_CLASS = "hdl-sidebar-right-collapsed";
  const LEFT_SELECTOR = ".hdl-sidebar-toggle-left";
  const RIGHT_SELECTOR = ".hdl-sidebar-toggle-right";
  const TOGGLE_SELECTOR = `${LEFT_SELECTOR}, ${RIGHT_SELECTOR}`;

  function setButtonState(selector, pressed) {
    document.querySelectorAll(selector).forEach((button) => {
      button.setAttribute("role", "button");
      button.setAttribute("aria-pressed", String(pressed));
      button.removeAttribute("target");
      button.removeAttribute("rel");
    });
  }

  function syncButtonState() {
    setButtonState(LEFT_SELECTOR, document.body.classList.contains(LEFT_CLASS));
    setButtonState(RIGHT_SELECTOR, document.body.classList.contains(RIGHT_CLASS));
  }

  document.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest(TOGGLE_SELECTOR);
      if (!button) return;

      event.preventDefault();
      event.stopPropagation();

      if (button.matches(LEFT_SELECTOR)) {
        document.body.classList.toggle(LEFT_CLASS);
      }
      if (button.matches(RIGHT_SELECTOR)) {
        document.body.classList.toggle(RIGHT_CLASS);
      }
      syncButtonState();
    },
    true,
  );

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncButtonState, { once: true });
  } else {
    syncButtonState();
  }
})();
