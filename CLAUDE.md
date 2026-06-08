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

- Dark theme. Deep ink background, lime accent (`--acc`), blue secondary.
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

`contact.html` posts to Formspree (see the `action` on the form and
`submitContact` in `site.js`), which stores submissions in a dashboard and
emails a copy to `propeersinfoaffiliate@gmail.com`. Until a real Formspree
endpoint is dropped in (the form ships with a placeholder `your-form-id`
action), it falls back to opening the visitor's email client instead. See
README for the setup steps.

## Placeholders to confirm before launch

- Legal entity name ("ProPeers Inc.").
- Email `propeersinfoaffiliate@gmail.com` and phone `+1 781-724-4137`.
- Stats (years, projects, retention) currently reflect the parent company.

## Conventions

- Internal links are relative filenames, for example `href="about.html"`.
- Keep every button pointed at a real page. No dead `#` anchors.
- When adding a page, copy the structure of an existing one: link `styles.css`,
  add the two placeholder divs, set `data-page`, and load `site.js` at the end.
