# Fonts

This project is configured to use **Chronicle Display** site-wide.

To enable it locally and in production, place your licensed font files in this folder with these exact names:

- `ChronicleDisplay-Regular.woff2` (weight 400, normal)
- `ChronicleDisplay-Italic.woff2` (weight 400, italic)
- `ChronicleDisplay-Bold.woff2` (weight 700, normal)

The global font stack is defined in `src/index.css` using `@font-face` and the CSS variable `--font-primary`.

Note: Chronicle Display is a commercial font. Do not commit font binaries unless your license permits redistribution.
