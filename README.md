# NikhilPPC

Media planning and campaign assessment tool for Google, Meta and LinkedIn ads. It is a static site: no build step and no dependencies.

## Structure

    index.html     Step 1: Assess (unit economics and channel fit)
    css/style.css  Shared styles (light and dark)
    js/app.js      Assessment logic

## Run locally

Open `index.html` in a browser, or from this folder run `python3 -m http.server 8000` and visit http://localhost:8000.

## Put it on GitHub

Create an empty repository on GitHub first, then from this folder:

    git init
    git add .
    git commit -m "NikhilPPC: assessment module"
    git branch -M main
    git remote add origin https://github.com/<your-username>/NikhilPPC.git
    git push -u origin main

## Deploy on Cloudflare Pages

1. In the Cloudflare dashboard go to Workers & Pages, then Create, then Pages, then Connect to Git.
2. Choose the repository.
3. Name the project `nikhilppc` (if the name is free the site will be `nikhilppc.pages.dev`). Production branch `main`, framework preset None, build command empty, output directory `/`.
4. Save and deploy. Every push to `main` redeploys the site.

Optional: add a custom domain from the project's Custom domains tab, or put Cloudflare Access in front of it to require a login. Menu names in the dashboard change from time to time.

## Roadmap

1. Assess (done)
2. Google forecast
3. Meta forecast
4. LinkedIn forecast
5. Budget allocator
6. Campaign advisor (rule-based tips)

Each new module is a new page plus a script in `js/`, using the same nav and styles.

## Notes

Inputs are saved in the browser (localStorage) so later pages can reuse the unit economics. Nothing is sent to a server.

No AI and no external services: every score, forecast and tip comes from fixed rules in the code, and the site loads no third-party scripts, fonts or APIs. If AI-written tips are added later, they should be a separate, optional module.
