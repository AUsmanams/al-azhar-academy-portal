# Al-Azhar Academy, Zaria — Website Prototype

**Developer:** AU Connection Services  
**Status:** Presentation prototype only  
**Technology:** HTML5, CSS3 and vanilla JavaScript

## Prototype features

- Responsive public-facing school website concept.
- School identity based on the original logo and photograph uploaded to the repository root.
- School photograph supplied for this project.
- Overview sections for Nursery, Primary and Secondary.
- Islamic and Western education positioning.
- Admission enquiry form with demonstration feedback only.
- Interactive sample dashboards for parent, student, teacher/staff and administration roles.
- Clear placeholders for unconfirmed school information.

## Important limitations

This is a static frontend prototype. It does **not** include a backend, database, real admission submission, user accounts, authentication, student records, examination results, fee payments, or administrator functions. The enquiry form does not transmit or save information. Portal dashboards and fee-record entry use fictional in-browser sample data only; nothing is sent to or stored in a school database. Receipt file selection is not uploaded.

School history, leadership, exact address, contact channels, curriculum details and other institution-specific claims must be reviewed and confirmed by school management. Obtain the school's permission and any required consent before publicly publishing photographs that identify students, especially minors.

## Run locally

Open `index.html` in a modern browser. Alternatively, from this folder run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push changes to `main`; the workflow in `.github/workflows/pages.yml` publishes the site.
4. Wait for the Actions workflow to complete successfully.

## Project files

- `index.html` — page structure and content.
- `styles.css` — layout, colours and responsive styling.
- `script.js` — mobile navigation, portal preview and demo enquiry interaction.
- `school-logo.jpg` — original school logo uploaded to the repository root.
- `school-photo.jpg` — original school photograph uploaded to the repository root.

Code comments are included to make future edits easier. Replace placeholders only after the academy confirms the relevant information.
