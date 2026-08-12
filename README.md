# Fullscreen Video Menu

Open `index.html` in a browser.

The app now does this:

- Shows a main menu with only one button: `Play`.
- Uses a fullscreen background video behind the menu.
- On each `Play` click, starts the next video in the playlist (fullscreen).
- At 0:56, 1:41, and 2:37, pauses and asks: "Do you still want to watch?"
- If `Yes`, playback resumes.
- If `No`, it tries to close the site (`window.close()`).

Edit `script.js` to configure your files:

- `MENU_BACKGROUND_VIDEO`: menu background video path.
- `PLAYLIST`: videos to play when `Play` is clicked.
- `WATCH_PROMPT_TIMES`: video timestamps where the watch prompt appears.

Example timestamps:

```js
const WATCH_PROMPT_TIMES = [56, 101, 157];
```

Note: browsers only allow `window.close()` reliably for tabs opened by script.

## Publish to GitHub Pages

This repository includes a workflow at `.github/workflows/pages.yml` that deploys automatically from the `main` branch.

1. Push your latest changes to `main`.
2. In GitHub, open repository Settings -> Pages.
3. Under Build and deployment, set Source to `GitHub Actions`.
4. Wait for the `Deploy static site to GitHub Pages` workflow to complete.
5. Your site will be live at:
   `https://albertvanbeest.github.io/Vulture/`

Because videos are tracked with Git LFS, the workflow checks out LFS files before deployment so media is included.
