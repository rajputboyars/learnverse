# Jahia course screenshots

Real captures of the Jahia UI for the Jahia course. Until a file exists here,
the lesson shows a drawn illustration of the same screen, labelled
"Illustration".

## Adding a screenshot

1. Capture the screen from a Jahia 8.x install (the course's local Docker setup
   is fine). Crop to the relevant panel, 1600px wide or less, PNG.
2. Save it at the exact path the lesson declares (the list below).
3. Add that path to `AVAILABLE_SCREENSHOTS` in
   `src/data/jahia/screenshots.js`.
4. Optional: give markers `x` / `y` percentages in the lesson content
   (`scripts/content/jahia/*.mjs`) to pin the numbered dots on the image, then
   re-run `node scripts/add-course.mjs --course jahia`.

## Folders

```
authoring/        dashboard, Page Composer, preview, publication
content-editor/   the form authors fill in
jcontent/         jContent: pages, content folders, media
media/            images, videos, documents
studio/           module source in an IDE (definitions.cnd, views)
modeler/          content-type modelling views
workflow/         workflow requests and tasks
permissions/      roles, users, groups
graphql/          GraphiQL
administration/   site settings, modules, cache, server settings
```

Use descriptive names — `content-editor-title-field.png`, not `img1.png`. The
paths each lesson expects are listed in `scripts/content/jahia/` (search for
`src: '/images/jahia/`).
