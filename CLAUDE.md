# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start local dev server (Vite, hot reload)
npm run build     # Production build to dist/
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

No test suite is configured.

## Architecture

This is a React + Vite personal portfolio site with a retro PC aesthetic. The entire UI is themed as a vintage computer workstation.

### Layout (`App.jsx`)

Three-column layout controlled by `App.jsx` state:

- **Left column** (`nav-panel`): A Game Boy-styled device housing either `Terminal` or `FileExplorer` (toggled by the SELECT button)
- **Center column** (`center-screen`): A CRT monitor bezel that renders React Router `<Routes>` once the machine is "booted"
- **Right column** (`hardware-buttons`): Power button + `SideButtons` (GitHub/LinkedIn/email links + decorative floppy/vents)

The monitor has three states driven by `isPowerOn` / `isBooted` state:
1. Off (dark screen + ambient darkness overlay)
2. On, booting (`BootSequence` displays fake BIOS text line by line, then calls `onComplete`)
3. On, booted (React Router routes render inside the screen)

Clicking anywhere during boot skips to booted state via `speedUpBoot`. Safari gets no ambient-darkness overlay (browser quirk).

### Navigation system (`fileSystem.js`)

`fileSystem.js` exports a tree structure (`fileSystem`) that defines the navigable "filesystem" shown in both navigation components. Each leaf node has an `action(navigate)` callback — either `navigate('/route')` for internal pages or `window.open(...)` for external links.

Both `Terminal` and `FileExplorer` import from `fileSystem.js`. **Adding a new page/project requires updating this file.**

### Navigation components

- **`Terminal.jsx`**: Bash-like terminal supporting `help`, `clear`, `ls`, `cd`, `open`. Maintains command history with arrow-key navigation. Prompt reads `julian@portfolio <path>`.
- **`FileExplorer.jsx`**: GUI file-browser with back/forward history, single-click selection, double-click to open. Path bar displays as a fake Windows path (`C:\users\julian\...`).

### Routes (`src/routes/`)

- `/` → `HomePage.jsx` — welcome/intro text
- `/resume` → `Resume.jsx` — resume view
- `/wsdot` → `WSDOT_Project.jsx` — WSDOT ferry prediction project page

### CSS organization

Each component has a paired CSS file in `src/assets/`. `Global.css` defines:
- CSS custom properties (color palette: `--old-plastic`, `--win-95-gray`, `--dusty-crt`, `--floppy-pink`, `--terra-peach`, `--charcoal-ink`)
- The full dashboard layout and all hardware chrome (monitor bezel, Game Boy shell, power button animations)
- Boot screen and ambient darkness overlay styles

`Terminal.css`, `FileExplorer.css`, `SideButtons.css`, `HomePage.css`, `WSDOT_Project.css` handle their respective components.

### Static assets

Images and the resume PDF live in `public/images/` and are referenced with root-relative paths (e.g. `/images/GitHub_logo.png`). The resume PDF is `JULIAN_BRAUN_RESUME.pdf`.
