# inkvert - Client-Side File Converter

## Vision

A fully client-side file converter inspired by VERT.sh. All processing happens in the browser using WebAssembly and WebCodecs. No server required, no uploads, complete privacy.

## Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **UI Library:** @oidanice/kindle-ui (monochrome design system)
- **Styling:** Tailwind CSS (via kindle-ui preset, strictly black/white)
- **Image Conversion:** @aspect-build/wasm-imagemagick
- **Audio Conversion:** @ffmpeg/ffmpeg (WASM)
- **Document Conversion:** pandoc-wasm (or similar)
- **Video Conversion:** WebCodecs API + mp4box.js (max 90 seconds)
- **State Management:** React useState/useReducer + Context
- **Routing:** React Router v6

## Design Rules (CRITICAL)

- Colors: ONLY #000000 and #FFFFFF - NO grays except --bg-secondary/#f5f5f5
- No shadows, no gradients, no border-radius
- 1px solid borders for structure
- Serif font for titles, Monospace for data/filenames
- Hover states: background inversion

## Goals

- [ ] Multi-file drag & drop with batch conversion
- [ ] Image conversion (ImageMagick WASM, ~150 formats)
- [ ] Audio conversion (FFmpeg WASM, ~55 formats)
- [ ] Document conversion (Pandoc WASM, 12 formats)
- [ ] Video conversion (WebCodecs + MP4Box.js, 90s limit)
- [ ] Settings page with persistence (quality, bitrate, etc.)
- [ ] Responsive Kindle-style UI via @oidanice/kindle-ui
- [ ] PWA ready

## Non-Goals

- No server-side processing
- No file uploads to external services
- No tracking or analytics
- No user accounts

## Success Metrics

- All four converter categories working in-browser
- Smooth multi-file queue with progress tracking
- Clean monochrome UI consistent with kindle-ui design system
