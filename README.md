# inkvert

Client-side file converter. All processing happens in the browser using WebAssembly — no uploads, no server, complete privacy.

## Setup

```bash
npm install
npm run dev
```

## Supported Formats

**Images** — PNG, JPG, WebP, BMP, GIF, TIFF, ICO, SVG, AVIF (via ImageMagick WASM)

**Audio** — MP3, WAV, OGG, FLAC, AAC, M4A, WMA, AIFF, OPUS, AC3 (via FFmpeg WASM)

**Documents** — DOCX, HTML, Markdown, Plain Text (via mammoth + showdown)

**Video** — MP4, WebM, AVI, MOV, MKV, FLV, OGG (via FFmpeg WASM, 90s limit)

## Notes

- Requires `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` headers for SharedArrayBuffer (FFmpeg WASM). Vite dev server sets these automatically.
- WASM engines are loaded lazily on first conversion.
- Video files longer than 90 seconds are rejected before conversion.
