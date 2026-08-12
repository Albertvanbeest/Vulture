# Fullscreen Video Menu

Open `index.html` in a browser.

The app now does this:

- Shows a main menu with only one button: `Play`.
- Uses a fullscreen background video behind the menu.
- On each `Play` click, starts the next video in the playlist (fullscreen).
- At configured timestamps, pauses and asks: "Are you still watching?"
- If `Yes`, playback resumes.
- If `No`, it tries to close the site (`window.close()`).

Edit `script.js` to configure your files:

- `MENU_BACKGROUND_VIDEO`: menu background video path.
- `PLAYLIST`: videos to play when `Play` is clicked.
- `WATCH_CHECKPOINTS`: array of timestamp/message objects.

Example checkpoint format:

```js
const WATCH_CHECKPOINTS = [
	{ time: 90, message: "Are you still watching?" },
	{ time: 240, message: "Still there? Press Yes to continue." }
];
```

Note: browsers only allow `window.close()` reliably for tabs opened by script.
