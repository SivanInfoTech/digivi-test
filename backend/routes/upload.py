from fastapi import APIRouter, UploadFile, File
from services.verification_engine import process_uploaded_files

router = APIRouter()

@router.post("/upload-documents")
async def upload_documents(
    resume_file: UploadFile = File(...),
    epfo_itr_file: UploadFile = File(...),
    matrix_file: UploadFile = File(...)
):
    result = await process_uploaded_files(resume_file, epfo_itr_file, matrix_file)
    return {
        "message": "Files processed successfully",
        "verdict": result.get("final_verdict"),
        "report": result
    }