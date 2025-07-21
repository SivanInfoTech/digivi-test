
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.upload import router as upload_router
from routes.parse import router as parse_router
from routes.validate import router as validate_router

app = FastAPI()

# ✅ Add CORS config so frontend can access backend APIs
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(upload_router)
app.include_router(parse_router)
app.include_router(validate_router)

from routes.result import router as result_router
app.include_router(result_router)