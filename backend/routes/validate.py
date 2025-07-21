
from fastapi import APIRouter
from services.matcher import match_employer
import json
import os

router = APIRouter()

@router.get("/validate-employment")
def validate_employment():
    try:
        with open("data/parsed_output.json") as f:
            parsed_data = json.load(f)

        resume_list = parsed_data.get("resume_data", [])
        epfo_list = parsed_data.get("epfo_data", [])
        itr_list = parsed_data.get("form26as_data", [])

        result = match_employer(resume_list, epfo_list, itr_list)

        with open("data/validation_result.json", "w") as f:
            json.dump(result, f, indent=2)

        return {"status": "success", "result": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}
