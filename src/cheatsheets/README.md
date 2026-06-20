# Cheatsheet Entry Structure

Each cheatsheet entry lives in one folder:

```text
src/cheatsheets/entries/example-entry/
  Component.jsx      # reusable component or effect
  Component.css      # core component styles
  Preview.jsx        # how this entry appears in the cheatsheet preview
  preview.css        # easy visual tweaks for the cheatsheet demo
  entry.js           # title, defaults, controls, code strings, prompt
```

Use `preview.css` for quick visual edits like demo background, button size, display text, fonts, and texture presentation. Use the component CSS file for the reusable effect itself.

To add an entry manually:

1. Copy an existing folder in `src/cheatsheets/entries/`.
2. Rename the component, preview, and CSS selectors.
3. Update `entry.js` with a unique `id`, title, defaults, controls, code sections, and prompt.
4. Add the new entry import to `src/cheatsheets/index.js`.
5. Add the entry id to the right folder's `entries` array in `src/cheatsheets/index.js`.
