"""
D9W German Language Institute — Excel Workbook Generator
Creates the standardized 'D9W-Leads.xlsx' workbook for OneDrive for Business & Power Automate.
Includes:
- Sheet 1: 'Leads' with Table 'D9W_Enquiries' (15 Columns A through O)
- Sheet 2: 'Dashboard' with live formula-driven enquiry metrics
Zero third-party library dependencies (pure Python standard library zipfile + XML).
"""

import os
import zipfile

COLUMNS = [
    ("Lead ID", 22),
    ("Submitted At", 24),
    ("Student Name", 26),
    ("Phone", 22),
    ("Email", 28),
    ("Course Level", 16),
    ("Learning Mode", 16),
    ("Enquiry Type", 22),
    ("Preferred Batch", 32),
    ("Preferred Contact Time", 24),
    ("Message", 40),
    ("Lead Source", 24),
    ("Lead Status", 16),
    ("Consent", 20),
    ("Last Updated", 24),
]

def build_xlsx(filename="D9W-Leads.xlsx"):
    # Target path
    filepath = os.path.abspath(filename)

    # 1. [Content_Types].xml
    content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/tables/table1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>"""

    # 2. _rels/.rels
    rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>"""

    # 3. xl/_rels/workbook.xml.rels
    workbook_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>"""

    # 4. xl/workbook.xml
    workbook_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Leads" sheetId="1" r:id="rId1"/>
    <sheet name="Dashboard" sheetId="2" r:id="rId2"/>
  </sheets>
</workbook>"""

    # 5. xl/worksheets/_rels/sheet1.xml.rels
    sheet1_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/table" Target="../tables/table1.xml"/>
</Relationships>"""

    # 6. xl/styles.xml (Professional D9W charcoal & gold styling)
    styles_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="3">
    <font><name val="Segoe UI"/><sz val="11"/><color theme="1"/></font>
    <font><b/><name val="Segoe UI"/><sz val="11"/><color rgb="FFFFFFFF"/></font>
    <font><b/><name val="Segoe UI"/><sz val="13"/><color rgb="FF171717"/></font>
  </fonts>
  <fills count="4">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF171717"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF7F5F0"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/></border>
    <border>
      <left style="thin"><color rgb="FFDEDAD1"/></left>
      <right style="thin"><color rgb="FFDEDAD1"/></right>
      <top style="thin"><color rgb="FFDEDAD1"/></top>
      <bottom style="thin"><color rgb="FFDEDAD1"/></bottom>
    </border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="4">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <!-- Style 1: Table Header (Dark Charcoal, White Bold Text) -->
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1">
      <alignment horizontal="center" vertical="center"/>
    </xf>
    <!-- Style 2: Data Row (Normal text) -->
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1"/>
    <!-- Style 3: Dashboard Header -->
    <xf numFmtId="0" fontId="2" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/>
  </cellXfs>
</styleSheet>"""

    # 7. xl/worksheets/sheet1.xml (Leads sheet)
    col_tags = "".join(f'<col min="{i+1}" max="{i+1}" width="{width}" customWidth="1"/>' for i, (_, width) in enumerate(COLUMNS))
    
    header_cells = ""
    for i, (col_name, _) in enumerate(COLUMNS):
        col_letter = chr(ord('A') + i)
        header_cells += f'<c r="{col_letter}1" t="inlineStr" s="1"><is><t>{col_name}</t></is></c>'

    sheet1_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetViews>
    <sheetView tabSelected="1" workbookViewId="0">
      <pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>
    </sheetView>
  </sheetViews>
  <sheetFormatPr defaultRowHeight="20"/>
  <cols>{col_tags}</cols>
  <sheetData>
    <row r="1" ht="26" customHeight="1">{header_cells}</row>
  </sheetData>
  <tableParts count="1">
    <tablePart r:id="rId1"/>
  </tableParts>
</worksheet>"""

    # 8. xl/tables/table1.xml (Table D9W_Enquiries)
    table_cols = "".join(f'<tableColumn id="{i+1}" name="{col_name}"/>' for i, (col_name, _) in enumerate(COLUMNS))
    table1_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<table xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" id="1" name="D9W_Enquiries" displayName="D9W_Enquiries" ref="A1:O2" totalsRowShown="0">
  <autoFilter ref="A1:O2"/>
  <tableColumns count="{len(COLUMNS)}">
    {table_cols}
  </tableColumns>
  <tableStyleInfo name="TableStyleLight1" showFirstColumn="0" showLastColumn="0" showRowStripes="1" showColumnStripes="0"/>
</table>"""

    # 9. xl/worksheets/sheet2.xml (Dashboard sheet with formulas)
    sheet2_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetFormatPr defaultRowHeight="20"/>
  <cols>
    <col min="1" max="1" width="30" customWidth="1"/>
    <col min="2" max="2" width="20" customWidth="1"/>
  </cols>
  <sheetData>
    <row r="1" ht="26" customHeight="1">
      <c r="A1" t="inlineStr" s="3"><is><t>D9W Admissions CRM Metric</t></is></c>
      <c r="B1" t="inlineStr" s="3"><is><t>Live Count</t></is></c>
    </row>
    <row r="2">
      <c r="A2" t="inlineStr" s="2"><is><t>Total Enquiries</t></is></c>
      <c r="B2" s="2"><f>COUNTA(D9W_Enquiries[Lead ID])</f></c>
    </row>
    <row r="3">
      <c r="A3" t="inlineStr" s="2"><is><t>New Enquiries (Pending Action)</t></is></c>
      <c r="B3" s="2"><f>COUNTIF(D9W_Enquiries[Lead Status], "New")</f></c>
    </row>
    <row r="4">
      <c r="A4" t="inlineStr" s="2"><is><t>Contacted Enquiries</t></is></c>
      <c r="B4" s="2"><f>COUNTIF(D9W_Enquiries[Lead Status], "Contacted")</f></c>
    </row>
    <row r="5">
      <c r="A5" t="inlineStr" s="2"><is><t>Converted Students</t></is></c>
      <c r="B5" s="2"><f>COUNTIF(D9W_Enquiries[Lead Status], "Converted")</f></c>
    </row>
    <row r="6">
      <c r="A6" t="inlineStr" s="2"><is><t>Closed Enquiries</t></is></c>
      <c r="B6" s="2"><f>COUNTIF(D9W_Enquiries[Lead Status], "Closed")</f></c>
    </row>
    <row r="8" ht="24" customHeight="1">
      <c r="A8" t="inlineStr" s="3"><is><t>Enquiries by Course Level</t></is></c>
      <c r="B8" t="inlineStr" s="3"><is><t>Count</t></is></c>
    </row>
    <row r="9">
      <c r="A9" t="inlineStr" s="2"><is><t>A1 (Beginner)</t></is></c>
      <c r="B9" s="2"><f>COUNTIF(D9W_Enquiries[Course Level], "A1")</f></c>
    </row>
    <row r="10">
      <c r="A10" t="inlineStr" s="2"><is><t>A2 (Elementary)</t></is></c>
      <c r="B10" s="2"><f>COUNTIF(D9W_Enquiries[Course Level], "A2")</f></c>
    </row>
    <row r="11">
      <c r="A11" t="inlineStr" s="2"><is><t>B1 (Intermediate)</t></is></c>
      <c r="B11" s="2"><f>COUNTIF(D9W_Enquiries[Course Level], "B1")</f></c>
    </row>
    <row r="12">
      <c r="A12" t="inlineStr" s="2"><is><t>B2 (Upper Intermediate)</t></is></c>
      <c r="B12" s="2"><f>COUNTIF(D9W_Enquiries[Course Level], "B2")</f></c>
    </row>
    <row r="13">
      <c r="A13" t="inlineStr" s="2"><is><t>C1 (Advanced)</t></is></c>
      <c r="B13" s="2"><f>COUNTIF(D9W_Enquiries[Course Level], "C1")</f></c>
    </row>
    <row r="14">
      <c r="A14" t="inlineStr" s="2"><is><t>Undecided / Assessment Needed</t></is></c>
      <c r="B14" s="2"><f>COUNTIF(D9W_Enquiries[Course Level], "Undecided")</f></c>
    </row>
  </sheetData>
</worksheet>"""

    # Assemble ZIP file as .xlsx
    with zipfile.ZipFile(filepath, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", content_types)
        z.writestr("_rels/.rels", rels)
        z.writestr("xl/workbook.xml", workbook_xml)
        z.writestr("xl/_rels/workbook.xml.rels", workbook_rels)
        z.writestr("xl/styles.xml", styles_xml)
        z.writestr("xl/worksheets/sheet1.xml", sheet1_xml)
        z.writestr("xl/worksheets/_rels/sheet1.xml.rels", sheet1_rels)
        z.writestr("xl/tables/table1.xml", table1_xml)
        z.writestr("xl/worksheets/sheet2.xml", sheet2_xml)

    print(f"Successfully generated Excel CRM template at: {filepath}")

if __name__ == "__main__":
    build_xlsx("D9W-Leads.xlsx")
