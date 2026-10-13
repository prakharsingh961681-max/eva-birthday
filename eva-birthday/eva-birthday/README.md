# A birthday surprise for Eva ♡

React + Vite. No backend, no keys. Deploys free on GitHub Pages.

## 1. Add photos
Put files in `public/images/` (keep names, or change paths in `src/config/content.js`):
`eva-hero.jpg`, `eva-photo-1.jpg` ... `eva-photo-6.jpg`.
Resize to ~1600px, under ~400 KB (squoosh.app). Add/remove/reorder gallery photos in `content.js` (`gallery.photos`).
Missing photos never show broken icons. While previewing, empty slots show a heart frame; set `showEmptyPhotoSlots: false` before sending.

## 2. Edit words
Everything lives in `src/config/content.js`: names, `creatorName`, letter, envelope note, wishes, final message, music path.

## 3. Music (optional)
Add your own `public/music/birthday-song.mp3`. Without it the music button hides. Audio only plays after a tap.

## 4. Run locally
    npm install
    npm run dev       # preview
    npm run build     # production build in dist/

## 5. Publish
    git init && git add . && git commit -m "Birthday site"
    git branch -M main
    git remote add origin https://github.com/YOURNAME/REPO.git
    git push -u origin main
Then in the repo: Settings > Pages > Source: **GitHub Actions**. The included workflow deploys on every push.
Your link: `https://YOURNAME.github.io/REPO/`
