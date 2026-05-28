(function () {
  const LEFT_CLASS = "hdl-sidebar-left-collapsed";
  const RIGHT_CLASS = "hdl-sidebar-right-collapsed";
  const LEFT_SELECTOR = ".hdl-sidebar-toggle-left";
  const RIGHT_SELECTOR = ".hdl-sidebar-toggle-right";
  const TOGGLE_SELECTOR = `${LEFT_SELECTOR}, ${RIGHT_SELECTOR}`;
  const COLAB_ICON = [
    '<svg class="myst-fm-colab-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">',
    '<path d="M14.8 4.9c1.4-.9 3.2-1 4.7-.2 2.9 1.5 3.9 5 2.3 7.8l-1.1 2c-1.6 2.8-5.2 3.8-8 2.3-.7-.4-1.3-.9-1.8-1.5l2.1-1.2c.3.3.6.5.9.7 1.8 1 4.1.3 5.1-1.5l1.1-2c1-1.8.3-4-1.5-5-1-.6-2.2-.6-3.2 0l-.6-1.4ZM9.2 19.1c-1.4.9-3.2 1-4.7.2-2.9-1.5-3.9-5-2.3-7.8l1.1-2c1.6-2.8 5.2-3.8 8-2.3.7.4 1.3.9 1.8 1.5L11 9.9c-.3-.3-.6-.5-.9-.7-1.8-1-4.1-.3-5.1 1.5l-1.1 2c-1 1.8-.3 4 1.5 5 1 .6 2.2.6 3.2 0l.6 1.4Zm7.2-10.6 1.9 1.1-10.7 6-1.9-1.1 10.7-6Z"></path>',
    "</svg>",
  ].join("");

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

  function colabUrlFromEditUrl(editUrl) {
    const match = editUrl.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)\/edit\/([^/]+)\/(.+\.ipynb)$/);
    if (!match) return null;
    const [, repo, branch, notebookPath] = match;
    return `https://colab.research.google.com/github/${repo}/blob/${branch}/${notebookPath}`;
  }

  function ensureColabLink() {
    const badges = document.querySelector(".myst-fm-block-badges");
    if (!badges) return false;

    const editLink = document.querySelector(".myst-fm-edit-link");
    const colabUrl = editLink ? colabUrlFromEditUrl(editLink.href) : null;
    const existing = badges.querySelector(".myst-fm-colab-link");

    if (!colabUrl) {
      if (existing) existing.remove();
      return false;
    }

    if (existing) {
      existing.href = colabUrl;
      return true;
    }

    const link = document.createElement("a");
    link.href = colabUrl;
    link.title = "Open in Google Colab";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "myst-fm-colab-link text-inherit hover:text-inherit";
    link.setAttribute("aria-label", "Open this notebook in Google Colab");
    link.innerHTML = COLAB_ICON;
    badges.prepend(link);
    return true;
  }

  function startColabLinkSync() {
    let attempts = 0;
    const retry = () => {
      const ready = ensureColabLink();
      attempts += 1;
      if (!ready && attempts < 20) {
        window.setTimeout(retry, 250);
      }
    };

    retry();
    const observer = new MutationObserver(() => {
      ensureColabLink();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function scheduleColabLinkSync() {
    window.setTimeout(startColabLinkSync, 1000);
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
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        syncButtonState();
        scheduleColabLinkSync();
      },
      { once: true },
    );
  } else {
    syncButtonState();
    scheduleColabLinkSync();
  }
})();
