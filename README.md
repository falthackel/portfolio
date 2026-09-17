# Project proof files go here

Put real files for a project in their own subfolder, e.g.:

```
assets/projects/wheel-rim/proposal.pdf
assets/projects/wheel-rim/station.jpg
assets/projects/financial-chatbot/architecture.png
```

Then reference them from that project's `attachments` array in
`content.js`, using the path relative to `index.html`:

```js
attachments: [
  { type: "pdf",   label: "Client proposal deck", href: "assets/projects/wheel-rim/proposal.pdf" },
  { type: "image", label: "Inspection station",   href: "assets/projects/wheel-rim/station.jpg" },
  { type: "link",  label: "Live demo",             href: "https://example.com/demo" }
]
```

- `type: "image"` renders a small thumbnail that opens the full file in a new tab.
- `type: "pdf"` renders a labeled link with a 📄 icon.
- `type: "link"` renders a labeled link with a 🔗 icon — use this for URLs that
  aren't a file in this folder (a live demo, a GitHub repo, a paper).

Keep image files reasonably small (compress before adding — a phone photo
straight off the camera is overkill for a thumbnail) since everything in
this folder gets uploaded with the rest of the site.
