from pydantic import BaseModel, EmailStr, Field


class ContactForm(BaseModel):
    name: str = Field(
        ...,
        max_length=50,
        description="Full name of the person submitting the contact form",
    )
    email: EmailStr = Field(
        ..., description="Email address of the sender, must be valid"
    )
    message: str = Field(
        ...,
        max_length=1000,
        description="Message content from the sender, up to 1000 characters",
    )
    recaptcha_token: str = Field(
        ..., description="Google reCAPTCHA token to verify the user is human"
    )
