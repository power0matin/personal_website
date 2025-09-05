import requests
import os


def verify_recaptcha(token):
    url = "https://www.google.com/recaptcha/api/siteverify"
    payload = {
        "secret": os.getenv("RECAPTCHA_SECRET_KEY"),
        "response": token,
    }
    response = requests.post(url, data=payload)
    result = response.json()
    return result.get("success", False) and result.get("score", 0) >= 0.5
