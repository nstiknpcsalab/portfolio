# MKS Portfolio Website

A simple, responsive personal portfolio built with only HTML, CSS and JavaScript.
No build step is needed, so it works directly on GitHub Pages.

## Folder structure

```
portfolio/
├── index.html                  (all page content)
├── css/style.css               (colors, layout, fonts)
├── js/script.js                (theme toggle, menu, animations)
├── assets/
│   ├── images/
│   │   ├── profile.png         (your photo)
│   │   └── project1.png        (add your project screenshot here)
│   └── documents/
│       ├── resume.pdf          (add your own resume here)
│       └── ai-literacy-certificate.pdf
└── README.md
```

## Add your own files

1. **Resume:** save your resume as `assets/documents/resume.pdf`. Until the file exists, the
   "Download Resume" button hides itself automatically on the live site.
2. **Project screenshot:** save it as `assets/images/project1.png`. Until then a text placeholder is shown.
3. **Photo:** replace `assets/images/profile.png`. If you use a `.jpg`, also change the file name in `index.html` (search for `profile.png`).

## Edit the content

- Open `index.html`. Every section is a clearly labelled block with a comment.
- To add a skill, add another `<li>` inside a skills card.
- To add a project, certificate or education entry, copy an existing block and change the text.
- To remove a section, delete its `<section>` block and its link in the menu.
- Project buttons with `href="#"` are hidden automatically. Replace `#` with your real
  Live Demo and GitHub links in `index.html` (search for `TODO`).

## Change colors and fonts

- Colors: edit the variables at the top of `css/style.css` (`:root` for light theme, `[data-theme="dark"]` for dark theme).
- Fonts: change the Google Fonts link in `index.html` and the `--font-heading` / `--font-body` variables in `css/style.css`.

## Publish on GitHub Pages

1. Create a new repository on GitHub (for example `portfolio`) and keep it public.
2. Upload all the files and folders, so `index.html` is at the top level of the repository.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then click **Save**.
5. Wait about a minute. Your site will be at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

## Checklist before publishing

- [ ] Add `assets/documents/resume.pdf` (your own resume)
- [ ] Add `assets/images/project1.png`
- [ ] Add project Live Demo / GitHub links (optional)
- [ ] Confirm your LinkedIn link points to your own profile
- [ ] Confirm CTS passing year (currently shown as 2025–2026)
