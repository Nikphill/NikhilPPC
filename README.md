# NikhilPPC

Media planning and campaign assessment tool for Google, Meta and LinkedIn ads. It is a static site: no build step and no dependencies.

## Structure

    index.html        Start: the 8 steps
    goals.html        Step 1: goals, targets, platform budget split
    funnel.html       Step 2: funnel design and funnel math
    tracking.html     Step 3: IDs and tracking checklist (data in js/tracking-data.js)
    events.html       Step 4: conversion event map (data in js/events-data.js)
    campaign.html     Step 5: weekly campaign log with status and rule-based tips
    dashboard.html    Step 6: roll-up by platform, incrementality-adjusted ROAS and CAC
    incrementality.html  Step 7: lift test results, significance and factor
    optimize.html     Step 8: routine, symptom-to-fix library, change log
    pacing.html       Step 9: daily spend pacing, month-end forecast, charts
    earlier-version.html  Earlier single-page planner (kept for now, uses js/data.js and js/v2.js)
    css/style.css     Shared styles (light and dark)
    js/calc.js        Pure calculation functions (no DOM)
    js/ui.js          Shared helpers: nav, formatting, saving
    js/goals.js, js/funnel.js   Page logic for Steps 1 to 9

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

## Notes

Everything you enter is saved in the browser (localStorage), so each tab reuses the same targets. Nothing is sent to a server.

No AI and no external services: every score, forecast and tip comes from fixed rules in the code, and the site loads no third-party scripts, fonts or APIs. If AI-written tips are added later, they should be a separate, optional module.
