from pydantic import BaseModel, EmailStr, Field

class ContactForm(BaseModel):
    name: str = Field(..., max_length=50)
    email: EmailStr
    message: str = Field(..., max_length=1000)
    recaptcha_token: str
