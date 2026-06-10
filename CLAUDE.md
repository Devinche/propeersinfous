# ProPeers Inc. (US) website

Static marketing site for ProPeers Inc., the US subsidiary of Professional Peers
Info Services. Plain HTML, one shared CSS file, and vanilla JavaScript. No build
step, no framework, no package.json. It is meant to be served as static files.

## Architecture

- Eight pages: `index.html`, `what-we-do.html`, `it-consulting.html`,
  `ai-solutions.html`, `affiliate-marketing.html`, `about.html`,
  `approach.html`, `contact.html`.
- `styles.css` is the only stylesheet. All design tokens live in `:root` as CSS
  variables (`--ink`, `--acc`, fonts, etc.). Reuse these variables. Do not
  hardcode colors.
- `site.js` is the single source of truth for the header and footer. Each page
  has empty `<div id="site-header"></div>` and `<div id="site-footer"></div>`
  placeholders, and `site.js` fills them on load. To change the nav or footer,
  edit `site.js` only, never the individual pages.
- Each page sets `<body data-page="...">` so `site.js` can highlight the active
  nav link. Valid values: `home`, `whatwedo`, `company`, `approach`, `contact`.

## Design

- Dark theme. Deep ink background with one green accent (`--acc`), everything
  else neutral ink/gray. Keep the palette to this single accent; `--blue` and
  `--amber` exist only for the accent-switcher themes.
- Fonts: Bricolage Grotesque for headings, Hanken Grotesk for body, loaded from
  Google Fonts in each page head.
- Keep the existing look unless asked to change it.

## Writing style (important)

The copy was deliberately humanized. Hold this line on any new or edited text:

- No em dashes anywhere. Use commas or periods.
- Avoid rhetorical lists of three in sentences.
- No marketing filler: avoid "world-class", "seamless", "end-to-end",
  "journey", "leverage", "unlock", "robust", "cutting-edge".
- Plain, direct, operator voice. Short sentences mixed with longer ones.
- Contractions are fine.

## Contact form

`contact.html` posts to Formspree (`https://formspree.io/f/mvznanjz`, set as
the `action` on the form; see `submitContact` in `site.js`), which stores
submissions in a dashboard and emails a copy to
`propeersinfoaffiliate@gmail.com`. Submission happens via `fetch` with an
inline confirmation, no email client is opened. If the request fails, it
falls back to a pre-filled `mailto:`. See README to point it at a different
Formspree form later.

## Placeholders to confirm before launch

- Legal entity name ("ProPeers Inc.").
- Email `propeersinfoaffiliate@gmail.com` and phone `+1 781-724-4137`.
- Stats (years, projects, retention) currently reflect the parent company.

## Conventions

- Internal links are relative filenames, for example `href="about.html"`.
- Keep every button pointed at a real page. No dead `#` anchors.
- When adding a page, copy the structure of an existing one: link `styles.css`,
  add the two placeholder divs, set `data-page`, and load `site.js` at the end.
