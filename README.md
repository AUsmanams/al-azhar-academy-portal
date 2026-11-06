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

This remains a frontend prototype, not a production school system. The portal's forms and dashboards are interactive and save fictional demonstration records in the current browser using localStorage. They do not connect to a server or shared database, do not provide real authentication or access control, and do not upload receipt files. Different devices and browsers will not share the demo records. Never enter real student, parent, staff, financial or other confidential information.

School history, leadership, exact address, contact channels, curriculum details and other institution-specific claims must be reviewed and confirmed by school management. Obtain the school's permission and any required consent before publicly publishing photographs that identify students, especially minors.

## Interactive portal demonstration

Open `portal.html` from the deployed site or locally. Choose Parent, Student, Teacher/Staff or Administration to explore the sample workflows. Administration can add sample students, staff, admission applications, fee records, attendance, assessment results and announcements. Parents and students can view the sample learner's records. The demo data remains in that browser until reset or cleared.

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
- `script.js` — public website interactions and portal preview.
- `portal.html` — interactive Arabic-first school portal.
- `portal.css` — portal layout and responsive styling.
- `portal.js` — sample role dashboards and management workflows.
- `school-logo.jpg` — original school logo uploaded to the repository root.
- `school-photo.jpg` — original school photograph uploaded to the repository root.

Code comments are included to make future edits easier. Replace placeholders only after the academy confirms the relevant information.
