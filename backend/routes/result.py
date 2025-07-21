
from fastapi import APIRouter
from fastapi.responses import FileResponse
from fpdf import FPDF
import json
import os

router = APIRouter()

@router.get("/download-report")
def download_report():
    try:
        with open("data/validation_result.json") as f:
            results = json.load(f)

        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)

        pdf.cell(200, 10, txt="Digiverifier Background Verification Report", ln=True, align="C")
        pdf.ln(10)

        for item in results:
            pdf.cell(200, 10, txt=f"Resume Entry: {item.get('resume')}", ln=True)
            pdf.cell(200, 10, txt=f"EPFO Match: {item.get('epfo_match')}, ITR Match: {item.get('itr_match')}", ln=True)
            pdf.cell(200, 10, txt=f"Component: {item.get('component')} - Color: {item.get('color')}", ln=True)
            pdf.cell(200, 10, txt=f"Reason: {item.get('reason')}", ln=True)
            pdf.ln(5)

        os.makedirs("data", exist_ok=True)
        pdf_path = "data/verification_report.pdf"
        pdf.output(pdf_path)

        return FileResponse(pdf_path, filename="verification_report.pdf", media_type="application/pdf")

    except Exception as e:
        return {"error": str(e)}
