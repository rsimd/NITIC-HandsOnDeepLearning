"""Post-process MyST HTML output for local and GitHub Pages previews."""

from __future__ import annotations

import os
from pathlib import Path
from shutil import copyfile


BUILD_DIR = Path("_build/html")
SCRIPT_SOURCE = Path("assets/sidebar_toggles.js")
SCRIPT_TARGET = BUILD_DIR / "sidebar_toggles.js"


def normalized_base_url() -> str:
    base_url = os.environ.get("BASE_URL", "").strip()
    if not base_url or base_url == "/":
        return ""
    return "/" + base_url.strip("/")


def inject_script(html_path: Path, script_src: str) -> None:
    html = html_path.read_text(encoding="utf-8")
    if script_src in html:
        return

    tag = f'<script src="{script_src}" defer></script>'
    if "</body>" in html:
        html = html.replace("</body>", f"{tag}</body>", 1)
    else:
        html = f"{html}{tag}"
    html_path.write_text(html, encoding="utf-8")


def main() -> None:
    if not BUILD_DIR.exists():
        raise SystemExit(f"Build directory does not exist: {BUILD_DIR}")
    if not SCRIPT_SOURCE.exists():
        raise SystemExit(f"Sidebar script does not exist: {SCRIPT_SOURCE}")

    copyfile(SCRIPT_SOURCE, SCRIPT_TARGET)
    script_src = f"{normalized_base_url()}/sidebar_toggles.js"
    for html_path in BUILD_DIR.rglob("index.html"):
        inject_script(html_path, script_src)


if __name__ == "__main__":
    main()
