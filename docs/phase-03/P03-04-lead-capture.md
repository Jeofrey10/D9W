# P03-04: Centralized WhatsApp Lead Capture + OneDrive Excel CRM — Architecture Documentation

**Milestone:** Phase 03 / P03-04  
**Status:** Completed & Production Ready  
**Component Scope:** Centralized Lead Capture Modal, Vercel Serverless Endpoint (`/api/leads`), Microsoft Power Automate Webhook Forwarder, and OneDrive Excel Table CRM (`D9W-Leads.xlsx`)  
**Design Language:** Modern Skeuomorphism & Premium European Editorial  
**Official WhatsApp Integration:** Reuses verified institute line `+49 1520 D9W-INFO` (`4915203994636`)

---

## 1. System Vision & Purpose

The D9W Lead Capture System centralizes all prospective student admissions enquiries across the platform into a single, structured, institute-owned Microsoft Excel CRM workbook stored in OneDrive for Business, with Microsoft Power Automate acting as the secure enterprise integration layer.

Unlike generic marketing popups, the D9W lead engine:
1. **Preserves Editorial & Skeuomorphic Integrity:** Matches the tactile physical paper, recessed trays, and embossed controls of the D9W design system.
2. **Maintains Zero Frontend Secrets:** Never writes directly to OneDrive or exposes Power Automate URLs or tokens in the client bundle.
3. **Guarantees Honest Statuses:** Displays a confirmed success state only after upstream confirmation is verified. If synchronization fails, the student's entered data is preserved with a direct WhatsApp alternative.
4. **Contextually Adapts:** Seamlessly pre-selects course levels, learning modes, batch schedules, and enquiry categories depending on where the student launched the modal.
5. **Harmonizes with WhatsApp:** Generates a formatted, pre-filled WhatsApp click-to-chat message incorporating the verified Lead Reference ID upon successful registration.

---

## 2. End-to-End Integration Architecture

```text
┌────────────────────────────────────────────────────────┐
│                   D9W React Website                    │
│   (Course Comparison, Batch Calendar, Syllabus, Demo)  │
└───────────────────────────┬────────────────────────────┘
                            │
                            │ User clicks "Enquire" / "Register"
                            ▼
┌────────────────────────────────────────────────────────┐
│             Shared LeadCaptureModal (<dialog>)         │
│   - Validates student name, phone, level, consent      │
│   - Generates client idempotency key                   │
│   - Checks invisible honeypot field (anti-bot)         │
└───────────────────────────┬────────────────────────────┘
                            │
                            │ POST /api/leads (JSON Payload)
                            ▼
┌────────────────────────────────────────────────────────┐
│             Vercel Serverless Function                 │
│                 (api/leads.ts)                         │
│   - Validates schema, types, lengths, and enums        │
│   - Enforces IP rate limiting (5 req/min)              │
│   - Generates collision-resistant Lead ID              │
│     (e.g. D9W-2026-XXXXXX)                             │
│   - Formats exact 15-column Excel row payload          │
│   - Reads server-side POWER_AUTOMATE_LEAD_WEBHOOK_URL  │
└───────────────────────────┬────────────────────────────┘
                            │
                            │ HTTPS POST (TLS 1.3 + Secret Header)
                            ▼
┌────────────────────────────────────────────────────────┐
│               Microsoft Power Automate                 │
│         (Flow: "D9W Website Lead Capture")             │
│   - Concurrency Degree = 1 (Prevents file write locks) │
│   - Validates Lead ID & payload                        │
└───────────────────────────┬────────────────────────────┘
                            │
                            │ Excel Online (Business) Connector
                            ▼
┌────────────────────────────────────────────────────────┐
│               OneDrive for Business                    │
│                 (D9W-Leads.xlsx)                       │
│   - Worksheet: "Leads"                                 │
│   - Table: "D9W_Enquiries"                             │
│   - Appends single row (Status = "New")                │
│   - Worksheet: "Dashboard" formulas update             │
└───────────────────────────┬────────────────────────────┘
                            │
                            │ 200 OK Confirmed Insertion
                            ▼
┌────────────────────────────────────────────────────────┐
│         Vercel Returns { success: true, leadId }       │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│         Modal Displays LeadSuccessView                 │
│   - Displays official Lead ID with copy action         │
│   - "Continue on WhatsApp" button with prefilled       │
│     lead reference and course metadata                 │
└────────────────────────────────────────────────────────┘
```

---

## 3. Serverless API Specification (`POST /api/leads`)

### 3.1 Request Contract
```http
POST /api/leads HTTP/1.1
Host: d9w-german.edu
Content-Type: application/json
Accept: application/json

{
  "fullName": "Clara Schumann",
  "phone": "+49 170 9876543",
  "email": "clara.schumann@example.com",
  "courseLevel": "B1",
  "learningMode": "Online",
  "enquiryType": "Course Enquiry",
  "preferredBatch": "b-2026-11-b1-onl",
  "preferredContactTime": "Evening",
  "message": "Interested in German for healthcare licensure.",
  "privacyConsent": true,
  "source": "Course Comparison",
  "idempotencyKey": "idemp_kv18a_90f2b84"
}
```

### 3.2 Response Contracts

#### Success Response (`200 OK`):
```json
{
  "success": true,
  "leadId": "D9W-2026-482019",
  "message": "Your enquiry has been saved successfully in the admissions system."
}
```

#### Duplicate Idempotent Request (`200 OK`):
```json
{
  "success": true,
  "leadId": "D9W-2026-482019",
  "message": "Your enquiry has been saved successfully (duplicate request acknowledged)."
}
```

#### Validation Error (`400 Bad Request`):
```json
{
  "success": false,
  "code": "VALIDATION_FAILED",
  "message": "Full name must be at least 2 characters. A valid phone number is required.",
  "details": [
    "Full name must be at least 2 characters.",
    "A valid phone number is required."
  ]
}
```

#### Rate Limit Reached (`429 Too Many Requests`):
```json
{
  "success": false,
  "code": "RATE_LIMIT_EXCEEDED",
  "message": "Too many enquiries from this network. Please wait a minute before retrying."
}
```

#### Upstream Excel Insertion Failure (`502 Bad Gateway`):
```json
{
  "success": false,
  "code": "EXCEL_SYNC_FAILED",
  "message": "We could not confirm insertion into the central admissions workbook. Please retry or contact us on WhatsApp."
}
```

---

## 4. Frontend Component Breakdown

The feature is encapsulated inside `src/features/lead-capture/`:

| Component / Service | Responsibility |
| :--- | :--- |
| `LeadCaptureProvider` & `useLeadCapture` | Global context providing `openLeadModal(options)` and `closeLeadModal()` anywhere in the application. |
| `LeadCaptureModal.tsx` | Accessible dialog with keyboard `Escape` handling, backdrop dismissal, and multi-state view switching. |
| `LeadCaptureForm.tsx` | Tactile form featuring recessed inputs, level selector buttons, mode radio pills, and privacy consent toggle. |
| `LeadFormField.tsx` | Skeuomorphic input wrapper with icons, character count, and inline validation errors. |
| `LeadSubmissionState.tsx` | Real-time loading indicator notifying students that their slot is registering with the admissions desk. |
| `LeadSuccessView.tsx` | Ink-stamped confirmation ticket showing the unique Lead ID and the "Continue on WhatsApp" trigger. |
| `LeadErrorView.tsx` | Non-destructive error screen that preserves entered text and provides a direct WhatsApp fallback. |
| `useLeadSubmission.ts` | State machine managing form lifecycle, validation, idempotency, and serverless communication. |
| `leadValidation.ts` | Field validator for names, international telephone formats, CEFR enums, and privacy consent. |
| `leadPayload.ts` | Payload builder, idempotency generator, and official post-registration WhatsApp URL constructor. |
| `leadApi.ts` | Fetch wrapper with 12s timeout controller and standardized error parsing. |

---

## 5. Official WhatsApp Integration Reuse

The lead capture engine strictly reuses the single source of truth for the institute's verified WhatsApp contact number:
```ts
export const D9W_WHATSAPP_NUMBER = '4915203994636' // +49 1520 D9W-INFO
```

### Pre-filled WhatsApp Post-Registration Message Format
Upon confirmed Excel insertion, the student can click **"Continue on WhatsApp"**, opening a pre-filled click-to-chat window:

```text
Hello D9W Team,

My enquiry has been registered.

Lead Reference: D9W-2026-482019
Name: Clara Schumann
Course Level: B1
Learning Mode: Online
Enquiry Type: Course Enquiry

I would like to know more about the course and next steps.

Thank you.
```

- Encoded cleanly via `encodeURIComponent`.
- Never implies the message was automatically dispatched; it remains an explicit, user-initiated action.

---

## 6. Security, Anti-Bot & Data Privacy

1. **Honeypot Bot Trap:** Includes an off-screen field (`instituteReferralCode`) with `-z-50 pointer-events-none tabIndex={-1}`. Automated bots filling all inputs are immediately caught and silently acknowledged with a fake 200 without triggering Power Automate or creating CRM entries.
2. **IP Rate Limiting:** Enforces a sliding 60-second window limiting any single client IP to a maximum of 5 requests, blocking automated form flooding.
3. **Idempotency Cache:** Client-generated idempotency tokens ensure that network retries or rapid double-clicks return the original Lead ID rather than creating duplicate Excel rows.
4. **Zero Client Secrets:** All webhooks and API secrets (`POWER_AUTOMATE_LEAD_WEBHOOK_URL`, `LEAD_API_SECRET`) are strictly server-side.
5. **No Personally Identifiable Information in Logs:** Serverless logs omit full telephone numbers, email addresses, and message text, outputting only sanitized metadata (`[LEAD CREATED] ID: D9W-2026-XXXXXX, Level: B1`).

---

## 7. Verification & Automated Test Suite

Run the automated test suite with:
```bash
npm run test:leads
```

### Automated Test Coverage (`scripts/test-leads-api.mjs`)
- `✓ Method Not Allowed (GET -> 405)`
- `✓ Missing required fields returns 400`
- `✓ Invalid email format rejected with 400`
- `✓ Invalid CEFR level rejected with 400`
- `✓ Honeypot field drops bot quietly (200 without CRM sync)`
- `✓ Valid submission returns 200 with formatted Lead ID`
- `✓ Duplicate submission returns identical Lead ID (Idempotency guarantee)`
- `✓ Rate limiter enforces max requests per minute (429)`
