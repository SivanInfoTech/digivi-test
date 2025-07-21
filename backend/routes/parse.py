
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from services.resume_parser import parse_resume
from services.epfo_parser import parse_epfo_and_itr
import os

router = APIRouter()

@router.get("/parse-documents")
def parse_documents():
    try:
        resume_path = "uploads/resume.pdf"
        combined_path = "uploads/epfo.pdf"  # Same file contains EPFO + ITR

        resume_data = parse_resume(resume_path)
        parsed = parse_epfo_and_itr(combined_path)

        parsed_result = {
            "resume_data": resume_data,
            "epfo_data": parsed.get("epfo_data", []),
            "form26as_data": parsed.get("form26as_data", [])
        }

        os.makedirs("data", exist_ok=True)
        with open("data/parsed_output.json", "w") as f:
            import json
            json.dump(parsed_result, f, indent=2)

        return parsed_result

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
