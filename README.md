# ProPeers Inc. (US) website

Marketing site for ProPeers Inc., the US subsidiary of Professional Peers Info
Services. Static HTML, CSS, and a little vanilla JavaScript. No build step and
no framework, so it runs anywhere that serves files.

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `what-we-do.html` | What We Do (overview + service grid) |
| `it-consulting.html` | IT Consulting practice |
| `ai-solutions.html` | AI Platforming and Solutions practice |
| `affiliate-marketing.html` | Affiliate Marketing practice |
| `about.html` | Company |
| `approach.html` | How we work |
| `contact.html` | Contact (form + details) |

## Shared files

- `styles.css` is the single stylesheet for every page.
- `site.js` builds the header and footer and drops them into every page, so the
  nav is identical site-wide. It also runs the scroll effects, the mobile menu,
  and the contact form. Edit the menu or footer once in `site.js` and it changes
  everywhere.

## Run it locally

The header and footer are injected by `site.js`, so open the folder through a
local server rather than double-clicking a single file.

```bash
# from inside this folder, pick one:
python3 -m http.server 8000
# or
npx serve .
```

Then visit `http://localhost:8000`.

## Deploy

Any static host works. Easiest options:

- **Netlify Drop**: go to app.netlify.com/drop and drag this folder onto the page.
- **Vercel** or **Cloudflare Pages**: connect the repo or drag the folder.
- **GitHub Pages**: push to a repo, enable Pages, and it serves from the root.
- **Your own host**: upload everything to the web root via FTP or a file manager.

## Contact form

The form on `contact.html` is wired to Formspree
(`https://formspree.io/f/mvznanjz`), which stores every submission in a
dashboard (acting as the database) and forwards a copy by email to
`propeersinfoaffiliate@gmail.com`. The JS in `site.js` (`submitContact`)
submits it via `fetch` and shows an inline confirmation without ever leaving
the page or opening the visitor's email app. If the request fails for some
reason, it falls back to a pre-filled `mailto:` so the message still gets
through.

To point it at a different Formspree form later, just swap the `action` URL
on the `<form id="cform">` tag in `contact.html` for the new endpoint, no
other changes needed. The `name` attributes Formspree needs are already in
place (`fullname`, `email`, `company`, `need`, `message`, plus hidden
`_subject` and `_replyto` fields).

## Before going live

These are placeholders pulled from the parent company. Replace them with the
real US details:

- Entity name "ProPeers Inc." (confirm the legal name).
- Contact email `propeersinfoaffiliate@gmail.com` and phone `+1 781-724-4137`.
- The stats on the home and company pages (years, projects, retention) reflect
  the parent company. Confirm what is accurate for the US entity.
- Add a real US mailing address if you want one shown.
- The three client quotes on the home page are illustrative placeholders.
  Swap in real testimonials (with permission) before launch.
