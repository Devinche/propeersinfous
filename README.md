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

By default, submitting the form on `contact.html` opens the visitor's email app
with all the fields filled into a message to `sales@propeersinfo.com`. That needs
no backend.

To collect submissions in a dashboard instead, use a service like Formspree:

1. Create a form at formspree.io and copy your endpoint, for example
   `https://formspree.io/f/abcdwxyz`.
2. In `contact.html`, change the opening form tag to:
   ```html
   <form class="cform" action="https://formspree.io/f/abcdwxyz" method="POST">
   ```
   (remove the `onsubmit="return submitContact(event)"` attribute).
3. Add `name` attributes that match what you want in the email. The fields
   already have them: `fullname`, `email`, `company`, `need`, `message`.

## Before going live

These are placeholders pulled from the parent company. Replace them with the
real US details:

- Entity name "ProPeers Inc." (confirm the legal name).
- Contact email `sales@propeersinfo.com` and phone `+1 781-724-4137`.
- The stats on the home and company pages (years, projects, retention) reflect
  the parent company. Confirm what is accurate for the US entity.
- Add a real US mailing address if you want one shown.
