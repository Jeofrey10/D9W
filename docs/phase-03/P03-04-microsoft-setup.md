# P03-04: Microsoft 365, OneDrive & Power Automate Setup Guide

**Audience:** Institute Technical Leads, Microsoft 365 Administrators, and Academic Admissions Coordinators  
**Scope:** Configuration of `D9W-Leads.xlsx` in OneDrive for Business, Power Automate Flow `"D9W Website Lead Capture"`, and Vercel Environment Variables

---

## 1. Microsoft 365 Account & License Requirements

### Recommended Production Architecture: OneDrive for Business
To use the native **Excel Online (Business)** connector and HTTP triggers seamlessly without third-party gateways, the institute requires:
- **Microsoft 365 Business Basic, Standard, or Enterprise** (E3/E5).
- **Power Automate Premium** (or a per-flow/per-user license covering HTTP Request triggers).
- **OneDrive for Business** storage quota associated with the institute's domain (`@d9w-german.edu` or institutional tenant).

### Alternative Architecture: Personal OneDrive (Limitation & Graph Alternative)
> [!WARNING] Personal Microsoft Account Limitation
> Personal OneDrive accounts (free or Microsoft 365 Personal/Family) **do not support** the "Excel Online (Business)" Power Automate connector, and personal Power Automate free tiers do not support the `"When an HTTP request is received"` trigger.
>
> If the institute currently operates under a personal Microsoft account, do not attempt to force consumer connectors. Instead, adopt the **Microsoft Graph API Direct Integration** outlined in Section 6 below.

---

## 2. OneDrive Excel Workbook Setup (`D9W-Leads.xlsx`)

The institute administrator can generate the exact pre-formatted workbook automatically or configure it manually:

### Automated Generation (Recommended)
Run the bundled generator in the project repository:
```bash
python scripts/create_d9w_leads_workbook.py
```
This generates `D9W-Leads.xlsx` in the project root, complete with table `D9W_Enquiries`, frozen header row, and the formula-driven `Dashboard` worksheet.

### Manual Setup Instructions
1. Log in to **OneDrive for Business** at [portal.office.com](https://portal.office.com).
2. Create a secure folder named `D9W-Admissions-CRM`.
3. Create or upload a new Excel workbook named **`D9W-Leads.xlsx`**.
4. Rename `Sheet1` to **`Leads`**.
5. In row 1, enter the following 15 headers in exact order from Column A to Column O:

| Col | Header Name | Format | Recommended Width | Description |
|:---:|:---|:---|:---:|:---|
| **A** | `Lead ID` | Text (`@`) | 22 | Unique submission ID (e.g. `D9W-2026-739102`) |
| **B** | `Submitted At` | Date/Time (ISO) | 24 | UTC timestamp of submission |
| **C** | `Student Name` | Text | 26 | Full student name |
| **D** | `Phone` | Text (`@`) | 22 | WhatsApp/Contact telephone |
| **E** | `Email` | Text | 28 | Student email (or `N/A`) |
| **F** | `Course Level` | Text | 16 | `A1`, `A2`, `B1`, `B2`, `C1`, or `Undecided` |
| **G** | `Learning Mode` | Text | 16 | `Online`, `Offline`, or `Undecided` |
| **H** | `Enquiry Type` | Text | 22 | `Course Enquiry`, `Free Demo Class`, etc. |
| **I** | `Preferred Batch` | Text | 32 | Batch title or ID (or `N/A`) |
| **J** | `Preferred Contact Time` | Text | 24 | `Morning`, `Afternoon`, `Evening`, `Any time` |
| **K** | `Message` | Text (Wrap text) | 40 | Student specific questions or visa deadlines |
| **L** | `Lead Source` | Text | 24 | Page origin (e.g. `Course Comparison`) |
| **M** | `Lead Status` | Text | 16 | `New`, `Contacted`, `Converted`, `Closed` |
| **N** | `Consent` | Text | 20 | Privacy consent acknowledgement |
| **O** | `Last Updated` | Date/Time (ISO) | 24 | CRM status modification timestamp |

6. Select range `A1:O2` and click **Insert → Table** (check *"My table has headers"*).
7. In the **Table Design** tab, set the **Table Name** to exactly:
   ```text
   D9W_Enquiries
   ```
8. Select row 2, navigate to **View → Freeze Panes → Freeze Top Row**.
9. Format Column A and Column D explicitly as **Text** (`Format Cells → Text`) to ensure phone numbers (with leading zeros and `+`) and Lead IDs are preserved without numeric truncation.

### Setting Up the `Dashboard` Worksheet
1. Create a second worksheet named **`Dashboard`**.
2. Add the following live formulas in column B:
   - **Total Enquiries:** `=COUNTA(D9W_Enquiries[Lead ID])`
   - **New Enquiries (Pending Action):** `=COUNTIF(D9W_Enquiries[Lead Status], "New")`
   - **Contacted Enquiries:** `=COUNTIF(D9W_Enquiries[Lead Status], "Contacted")`
   - **Converted Students:** `=COUNTIF(D9W_Enquiries[Lead Status], "Converted")`
   - **Closed Enquiries:** `=COUNTIF(D9W_Enquiries[Lead Status], "Closed")`
   - **A1 Enquiries:** `=COUNTIF(D9W_Enquiries[Course Level], "A1")`
   - **A2 Enquiries:** `=COUNTIF(D9W_Enquiries[Course Level], "A2")`
   - **B1 Enquiries:** `=COUNTIF(D9W_Enquiries[Course Level], "B1")`
   - **B2 Enquiries:** `=COUNTIF(D9W_Enquiries[Course Level], "B2")`
   - **C1 Enquiries:** `=COUNTIF(D9W_Enquiries[Course Level], "C1")`
   - **Undecided:** `=COUNTIF(D9W_Enquiries[Course Level], "Undecided")`

---

## 3. Power Automate Flow Configuration

### Step 3.1: Create New Cloud Flow
1. Open [make.powerautomate.com](https://make.powerautomate.com) and log in with the institute administrator account.
2. Click **Create → Automated cloud flow → Skip**.
3. Name the flow: **`D9W Website Lead Capture`**.

### Step 3.2: Configure Trigger ("When an HTTP request is received")
1. Search for and add the trigger **When an HTTP request is received**.
2. Set **Who can trigger the flow**: `Anyone with the URL` (or specify tenant if authenticated).
3. Set **Request Body JSON Schema**:
```json
{
  "type": "object",
  "properties": {
    "leadId": { "type": "string" },
    "submittedAt": { "type": "string" },
    "excelRow": {
      "type": "object",
      "properties": {
        "Lead ID": { "type": "string" },
        "Submitted At": { "type": "string" },
        "Student Name": { "type": "string" },
        "Phone": { "type": "string" },
        "Email": { "type": "string" },
        "Course Level": { "type": "string" },
        "Learning Mode": { "type": "string" },
        "Enquiry Type": { "type": "string" },
        "Preferred Batch": { "type": "string" },
        "Preferred Contact Time": { "type": "string" },
        "Message": { "type": "string" },
        "Lead Source": { "type": "string" },
        "Lead Status": { "type": "string" },
        "Consent": { "type": "string" },
        "Last Updated": { "type": "string" }
      },
      "required": [
        "Lead ID",
        "Submitted At",
        "Student Name",
        "Phone",
        "Course Level",
        "Learning Mode",
        "Enquiry Type",
        "Lead Status"
      ]
    }
  },
  "required": ["leadId", "submittedAt", "excelRow"]
}
```

### Step 3.3: Configure Concurrency (Crucial for Excel Online)
Excel Online does not support concurrent write operations across parallel executions of the same file.
1. Click the **... (three dots)** on the trigger card → **Settings**.
2. Turn **Concurrency Control** to **ON**.
3. Set **Degree of Parallelism** to **1**.
4. Click **Done**.

### Step 3.4: Add Excel Online Action ("Add a row into a table")
1. Add a new action: Search for **Excel Online (Business)** → **Add a row into a table**.
2. Configure parameters:
   - **Location:** `OneDrive for Business`
   - **Document Library:** `OneDrive`
   - **File:** Browse and select `/D9W-Admissions-CRM/D9W-Leads.xlsx`
   - **Table:** Select `D9W_Enquiries`
3. Map the dynamic fields from `excelRow`:
   - `Lead ID` → `@{triggerBody()?['excelRow']?['Lead ID']}`
   - `Submitted At` → `@{triggerBody()?['excelRow']?['Submitted At']}`
   - `Student Name` → `@{triggerBody()?['excelRow']?['Student Name']}`
   - `Phone` → `@{triggerBody()?['excelRow']?['Phone']}`
   - `Email` → `@{triggerBody()?['excelRow']?['Email']}`
   - `Course Level` → `@{triggerBody()?['excelRow']?['Course Level']}`
   - `Learning Mode` → `@{triggerBody()?['excelRow']?['Learning Mode']}`
   - `Enquiry Type` → `@{triggerBody()?['excelRow']?['Enquiry Type']}`
   - `Preferred Batch` → `@{triggerBody()?['excelRow']?['Preferred Batch']}`
   - `Preferred Contact Time` → `@{triggerBody()?['excelRow']?['Preferred Contact Time']}`
   - `Message` → `@{triggerBody()?['excelRow']?['Message']}`
   - `Lead Source` → `@{triggerBody()?['excelRow']?['Lead Source']}`
   - `Lead Status` → `@{triggerBody()?['excelRow']?['Lead Status']}`
   - `Consent` → `@{triggerBody()?['excelRow']?['Consent']}`
   - `Last Updated` → `@{triggerBody()?['excelRow']?['Last Updated']}`

### Step 3.5: Configure Success Response Action
1. Add an action: **Response**.
2. Set **Status Code**: `200`.
3. Set **Headers**: `Content-Type: application/json`.
4. Set **Body**:
```json
{
  "success": true,
  "leadId": "@{triggerBody()?['leadId']}",
  "message": "Enquiry successfully recorded in D9W central CRM."
}
```

### Step 3.6: Configure Error Handling Branch
1. Add a parallel action or configure a second **Response** card.
2. In the card's **Settings**, set **Run after** to execute if the Excel insertion has **failed** or **timed out**.
3. Set **Status Code**: `502`.
4. Set **Body**:
```json
{
  "success": false,
  "code": "EXCEL_INSERTION_FAILED",
  "message": "Upstream Excel table write failed."
}
```

5. Click **Save**.
6. Copy the generated **HTTP POST URL** from the trigger card.

---

## 4. Vercel Environment Configuration

Add the generated webhook URL to your Vercel project:

### In Vercel Project Dashboard:
1. Navigate to **Project Settings → Environment Variables**.
2. Add:
   - **Key:** `POWER_AUTOMATE_LEAD_WEBHOOK_URL`
   - **Value:** `[Pasted Power Automate HTTP POST URL]`
   - **Environment:** Select `Production`, `Preview`, `Development`.
3. (Optional) Add a verification secret:
   - **Key:** `LEAD_API_SECRET`
   - **Value:** `[32-character secure random alphanumeric string]`
4. Redeploy the application.

---

## 5. End-to-End Verification Checklist

Perform these steps before declaring production readiness:

1. [ ] Open the D9W website (or local dev with webhook configured).
2. [ ] Click **"Enquire on WhatsApp"** or **"Register Enquiry"** on any course card or the `/batches` page.
3. [ ] Submit the form with test data:
   - Name: `Test Student`
   - Phone: `+49 1520 0000000`
   - Level: `B1`
4. [ ] Verify that the modal displays **"Enquiry Registered Successfully"** with a valid `D9W-2026-XXXXXX` Lead ID.
5. [ ] Open **OneDrive for Business** and open `D9W-Leads.xlsx`.
6. [ ] Confirm that exactly one new row has been added to the `D9W_Enquiries` table.
7. [ ] Confirm that `Lead Status` is set to `New` and that all 15 columns are aligned.
8. [ ] Check the `Dashboard` worksheet and confirm that `Total Enquiries` and `New Enquiries` incremented.
9. [ ] On the website success screen, click **"Continue on WhatsApp"** and verify that the pre-filled chat text contains the identical Lead ID and student name.

---

## 6. Personal OneDrive Architecture (Microsoft Graph API Alternative)

If the institute lacks Microsoft 365 Business and operates under a personal Microsoft account:

```text
POST /api/leads ──▶ Vercel Serverless Function ──▶ Microsoft Graph API (v1.0) ──▶ Personal OneDrive
```

### Implementation Blueprint:
1. Register an application in **Microsoft Entra ID** ([entra.microsoft.com](https://entra.microsoft.com)).
2. Grant application permission `Files.ReadWrite.All`.
3. In `api/leads.ts`, exchange `CLIENT_ID` and `CLIENT_SECRET` for an OAuth token via MSAL:
   ```text
   POST https://login.microsoftonline.com/common/oauth2/v2.0/token
   ```
4. Append row directly to the personal OneDrive workbook via Microsoft Graph:
   ```text
   POST https://graph.microsoft.com/v1.0/me/drive/root:/D9W-Admissions-CRM/D9W-Leads.xlsx:/workbook/tables/D9W_Enquiries/rows/add
   ```
5. Maintain the identical 15-column schema and response contract.

---

## 7. Administrator Operational Guide: Managing Leads in Excel

Admissions coordinators should follow these daily operational procedures:

1. **Viewing Pending Leads:** Open `D9W-Leads.xlsx` in Excel Online. Filter Column M (`Lead Status`) by selecting only `New`.
2. **Contacting Students:** Call or message the student on WhatsApp using the phone number in Column D.
3. **Updating Status:** Once initial communication occurs, update Column M (`Lead Status`) to `Contacted`, and update Column O (`Last Updated`) to the current date.
4. **Enrolment:** When the student confirms enrollment and makes payment, change Column M to `Converted`.
5. **Declined/Inactive:** If the student declines or is unreachable after 3 follow-ups, change Column M to `Closed`.
6. **Data Retention:** In compliance with European data privacy standards, leads older than 180 days with status `Closed` should be archived or purged by the institute data officer.
