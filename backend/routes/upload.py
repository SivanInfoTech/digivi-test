
from fastapi import APIRouter, UploadFile, Form
from fastapi.responses import JSONResponse
import os, shutil, json

router = APIRouter()

@router.post("/upload-documents")
async def upload_documents(
    resume_file: UploadFile,
    epfo_file: UploadFile,
    form26as_file: UploadFile,
    candidate_details: str = Form(...)
):
    os.makedirs("uploads", exist_ok=True)

    # Save files
    with open("uploads/resume.pdf", "wb") as f:
        shutil.copyfileobj(resume_file.file, f)

    with open("uploads/epfo.pdf", "wb") as f:
        shutil.copyfileobj(epfo_file.file, f)

    with open("uploads/26as.pdf", "wb") as f:
        shutil.copyfileobj(form26as_file.file, f)

    # Save candidate details
    try:
        details = json.loads(candidate_details)
        with open("uploads/candidate_details.json", "w") as f:
            json.dump(details, f)
    except json.JSONDecodeError:
        return JSONResponse(status_code=400, content={"error": "Invalid candidate_details JSON"})

    return {"status": "success", "message": "Documents uploaded successfully"}
