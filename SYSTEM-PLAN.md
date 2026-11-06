# Al-Azhar Academy — proposed school portal system plan

**Prepared by:** AU Connection Services  
**Purpose:** Management review and prototype planning  
**Status:** Proposal for discussion; not an approved school policy or production specification.

## Language and presentation
- English is the primary interface language (target roughly 75–80%).
- Arabic is retained for the academy's Arabic identity, Bismillah, selected Islamic learning terms, Qur'an-related areas and occasional section headings.
- English navigation, forms, instructions, error messages and reports are the default.
- Arabic text must use correct right-to-left direction locally, without forcing the entire page into RTL.

## Individual accounts and scale
The intended system should support individual student accounts and staff accounts, with a parent/guardian account that can be linked to one or more children. A target of 10,000–20,000 learner records is reasonable for a properly designed PHP/MySQL application on suitable hosting. Actual capacity depends on hosting CPU, RAM, database limits, storage, traffic, backups and query design; load testing is required before launch.

Recommended production structure:
- One central database, not one website or database per student.
- Unique admission number and internal student ID for every learner.
- Individual login credentials; password hashes, secure sessions and password reset.
- Parent/guardian accounts linked to their children, with restricted access.
- Teacher accounts assigned to approved classes and subjects.
- Class teacher, head teacher, bursar/finance officer, registrar and school administrator roles.
- Role-based access control and an audit log for every sensitive change.
- Pagination, database indexes, search filters and reports that process records in manageable batches.
- Automated backups, restore testing, HTTPS, server-side validation and monitoring.

## Recommended user roles

| Role | Main permitted functions |
|---|---|
| Student | Own profile, timetable, published results, attendance, notices and fee statement |
| Parent/Guardian | Linked children, fee statements, attendance, published results, notices and admission enquiries |
| Subject teacher | Assigned classes/subjects, attendance where authorised, marks entry and draft results |
| Class teacher | Assigned class roster, attendance, class notices and student progress |
| Head teacher / Principal | Oversight of approved sections, review of attendance and results, school reports |
| Bursar / Finance officer | Record verified bank/cash payments, attach receipt evidence, manage fee balances and finance reports |
| Registrar / Admissions officer | Admission applications, applicant review, enrolment and student records |
| System administrator | Accounts, role assignments, school setup, academic years, classes, backups and audit review |

Access should be limited by both role and assignment. For example, a teacher should not see every learner's financial details merely because they are a staff member.

## Academic result workflow
1. The school configures academic year, term, classes, subjects and approved grading rules.
2. Teachers enter continuous assessment and examination marks for their assigned subjects.
3. The system validates mark limits and calculates totals, grades and any approved averages.
4. Teachers save results as drafts.
5. The head teacher or authorised academic officer reviews and returns or approves them.
6. The school publishes results.
7. Students and linked parents can view only published results for their own learner account.
8. Corrections after publication require permission, a reason and an audit record.

The current prototype demonstrates CA (40) + examination (60) = total (100), with example grade bands. These are placeholders only. The school must approve assessment weights, grading bands, subject structures, class positions, remarks and report-card format.

## Fees and payment verification
- Parents continue paying by the school's approved bank deposit, transfer or cash procedures.
- Authorised bursar/finance staff record payments only after confirming receipt.
- Each entry stores learner, term, amount, date, payment channel, reference/receipt number, recording staff and verification status.
- Part-payments, balances, discounts, waivers and refunds need approved rules.
- Receipt files must be uploaded securely and access controlled.
- Students and parents can view their own statements; staff permissions are limited by role.
- Optional online payment integration can be added later without removing offline payment recording.

## Additional modules recommended
- Admissions, applicant screening and enrolment.
- Student and parent profiles.
- Class, subject, teacher and timetable management.
- Attendance and lateness records.
- Assessments, report cards and result publication.
- Fees, invoices/statements, receipts and arrears reporting.
- Announcements, SMS/email/WhatsApp notifications (subject to consent and provider integration).
- Homework and learning resources.
- Qur'an memorisation/revision progress and Islamic studies tracking, if approved by school.
- Staff directory, leave and basic staff administration.
- School calendar, events and term dates.
- Library and book lending, if required.
- Transport/boarding modules only if the academy actually operates those services.
- Data export, backups, audit logs and management reports.

## Production technology proposal
For compatibility with conventional cPanel hosting, a practical first production architecture is:
- PHP (supported stable version on the selected host) for server-side application logic.
- MySQL or MariaDB for relational records.
- HTML, CSS and JavaScript for responsive interfaces.
- Secure server-side authentication, role and record-level permissions.
- Private file storage for receipts and documents, not public unrestricted folders.

Before selecting hosting, confirm PHP version, MySQL limits, storage, memory, backup capability, cron jobs, HTTPS, email delivery and whether the provider supports the expected concurrent user load. If shared hosting cannot pass load and security testing, use a suitable VPS or managed application/database hosting.

## Data protection and school approval
- Do not use real student data in public demos.
- Obtain management approval for data fields, retention periods, access policies, privacy notices and parent/guardian access.
- Collect only necessary data, especially for minors.
- Require secure backups, staff training, incident response and account deactivation when staff leave.
- Confirm applicable Nigerian data-protection requirements with the school's responsible management/legal adviser before production.

## Decisions needed from management before production
- Official school name in Arabic and English and approved logo usage.
- School sections, class names, arms/streams and admission-number format.
- Academic calendar, term dates and subject list by level.
- Assessment components, grade bands, result approval and publication process.
- School-fee schedule, payment categories, part-payment and refund rules.
- Staff roles and who is authorised to record or verify payments.
- Parent account verification and how parents are linked to learners.
- Contact details, communication channels and consent/notification preferences.
- Hosting, backup, support and data protection responsibilities.

## Prototype limitations
The current GitHub Pages demonstration uses fictional browser-local sample data. It is not multi-user, not securely authenticated, does not share records between devices and must not be used for real learners or school finance. Production implementation requires a server, database, secure accounts, permissions, private uploads, testing and school approval.
