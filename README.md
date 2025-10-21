# Essam Suliman — Portfolio

This folder contains a ready-to-deploy static site built from your uploaded files.
- Pages: `index.html`, `about.html`, `projects.html`, `contact.html`
- Scripts: `main.js`
- Assets: `resources/*`

## How to run locally
Open `index.html` in a browser, or serve the folder with a simple HTTP server:
```bash
python3 -m http.server 8080
```
Then visit http://localhost:8080/

## Deploy options
- **GitHub Pages**: Push this folder to a repo → Settings → Pages → Source: `main` → `/ (root)`
- **Netlify**: Drag-and-drop this folder into the Netlify dashboard
- **Cloudflare Pages**: Create a project and select this folder as your build output

## Notes
- Contact form is front-end only; connect it to a service (e.g., Formspree) or your backend if you need submissions.
- Replace placeholder images in `resources/` with your real screenshots when ready.
