# Personal site

Static site, no build step. Pages: `index.html`, `about.html`, `cv.html`, `contact.html`,
sharing `css/style.css` and `js/main.js`.

`blogs.html` also exists but isn't linked from the nav — it's kept in the repo for
whenever there are posts to add, without needing to rebuild it from scratch.

## Before you deploy — replace these placeholders

Search the HTML files for these and fill in your real details:

- `your.email@example.com` — in `contact.html`
- `linkedin.com/in/YOUR-USERNAME` — in `contact.html`
- `assets/photo.jpg` — your hero photo, referenced in `index.html`
- `assets/CV.pdf` — drop your actual CV PDF here, or update the link in `cv.html`
  to match whatever you name it
- The middle paragraph in `about.html` is intentionally left for you to write —
  it's marked with an HTML comment

If you ever want `blogs.html` live again, add it back into the `<ul class="nav-links">`
block on every page:
```html
<li><a href="blogs.html" data-page="blogs.html">Blogs</a></li>
```
Posts themselves live in `js/blogs-data.js` — one object per post, no HTML editing needed.

## Deploy on GitHub Pages (free, no domain needed)

1. Create a GitHub repo. Name it `YOUR-USERNAME.github.io` for the site to live at
   that URL directly, or any name for `YOUR-USERNAME.github.io/repo-name/`.
2. From this folder:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
3. On the repo: **Settings → Pages** → Source: "Deploy from a branch" → Branch: `main`,
   folder `/ (root)` → Save.
4. Wait a minute, then visit the URL shown on that same Pages settings page.

Future updates: `git add . && git commit -m "..." && git push` — the live site
updates automatically, no redeploy step.
