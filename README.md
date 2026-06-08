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

The form on `contact.html` posts to Formspree, which stores every submission in
a dashboard (acting as your database) and forwards a copy by email to
`propeersinfoaffiliate@gmail.com`. The JS in `site.js` (`submitContact`) submits
it via `fetch` and shows an inline confirmation without leaving the page. If the
endpoint can't be reached, or hasn't been configured yet, it falls back to
opening the visitor's email app with the message pre-filled, no backend needed.

To finish wiring it up:

1. Create a free account at formspree.io, make a form, and connect/verify
   `propeersinfoaffiliate@gmail.com` as the recipient. Copy the endpoint, for
   example `https://formspree.io/f/abcdwxyz`.
2. In `contact.html`, replace the placeholder form action:
   ```html
   <form class="cform" id="cform" action="https://formspree.io/f/abcdwxyz" method="POST" onsubmit="return submitContact(event)">
   ```
3. That's it. The `name` attributes Formspree needs are already in place
   (`fullname`, `email`, `company`, `need`, `message`, plus hidden `_subject`
   and `_replyto` fields), and submissions will start appearing in your
   Formspree dashboard and inbox immediately.

## Before going live

These are placeholders pulled from the parent company. Replace them with the
real US details:

- Entity name "ProPeers Inc." (confirm the legal name).
- Contact email `propeersinfoaffiliate@gmail.com` and phone `+1 781-724-4137`.
- The stats on the home and company pages (years, projects, retention) reflect
  the parent company. Confirm what is accurate for the US entity.
- Add a real US mailing address if you want one shown.
