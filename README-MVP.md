# Iwas Medical Scribe — MVP integration contract

This frontend deliberately does **not** hard-code common diagnoses, patients, notifications, AI models, statistics, or treatment templates. It expects a backend API and shows loading/empty/error states when that API is unavailable.

## Suggested API contract

- `POST /auth/login` — doctor login
- `POST /auth/signup` — doctor registration
- `POST /auth/forgot-password` — credential recovery
- `GET /patients/search?q=` — search by patient name, phone, email, or caretaker name
- `POST /patients` — create patient
- `GET /notifications` — notifications with `type`: `subscription | patient | alert | info`
- `GET /ai/models` — available models: `{ id, name, description, specialty?, default? }`
- `PUT /ai/models/selection` — save selected model
- `GET /statistics/overview` — KPI cards, diagnosis distribution, activity mix and trend
- `GET /treatment-templates` — treatment plans/templates; PDF templates should expose signed/authorized `pdf_url`
- `GET /diagnoses/common` — common diagnoses for the right-hand panel
- `GET /diagnoses/search?q=` — diagnosis search
- `GET /medicines/search?q=` — medicine search
- `GET /tests/search?q=` — tests/lab/imaging search
- `GET /availability/diagnoses?q=&location=` — diagnoses/services available in an area
- `POST /scribe/transcriptions` — audio/document transcription
- `POST /scribe/encounters` — create/update clinical encounter
- `POST /documents/presign` — secure document upload URL

## Things required before asking doctors to use it

1. Real authentication and session management; protect every patient endpoint server-side.
2. Role/permission model for doctors, clinic admins and staff.
3. Patient consent, privacy policy, retention/deletion rules and audit logs.
4. Encryption in transit and at rest; secure object storage and short-lived signed URLs for medical files.
5. Clinical AI guardrails: clearly label AI suggestions, keep the doctor as final decision maker, capture source/evidence where appropriate, and never silently turn suggestions into prescriptions/orders.
6. Human-review workflow for generated notes, diagnoses, treatment plans and medication suggestions.
7. Immutable or auditable history for clinical records and changes.
8. Backups, restore testing, monitoring, error tracking and rate limiting.
9. Secure secrets management; no API keys in Nuxt client code.
10. Production billing/webhooks and subscription entitlement checks on the backend, not only in the payment UI.
11. File validation/virus scanning and size limits for uploaded reports/images/PDFs.
12. Proper clinical terminology/diagnosis source and local availability data rather than an arbitrary static list.
13. A staging environment and test doctor accounts before real patient data is used.

## Nuxt runtime config

Set the backend URL with:

`NUXT_PUBLIC_API_BASE=https://api.example.com`

For local development:

`NUXT_PUBLIC_API_BASE=http://localhost:8000`

If the API uses cookie-based sessions, configure CORS and credentials appropriately and use CSRF protection where applicable.
