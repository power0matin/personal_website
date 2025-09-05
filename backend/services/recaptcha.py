import os
import requests
from typing import Literal


def verify_recaptcha(token: str, min_score: float = 0.5) -> bool:
    """
    Verify a Google reCAPTCHA v3 token.

    Args:
        token (str): The reCAPTCHA token received from the client.
        min_score (float): Minimum score threshold for success (default 0.5).

    Returns:
        bool: True if verification passes and score is above threshold, False otherwise.
    """
    secret_key = os.getenv("RECAPTCHA_SECRET_KEY")
    if not secret_key:
        raise ValueError("RECAPTCHA_SECRET_KEY environment variable is not set.")

    url = "https://www.google.com/recaptcha/api/siteverify"
    payload = {"secret": secret_key, "response": token}

    try:
        response = requests.post(url, data=payload, timeout=5)
        response.raise_for_status()
        result = response.json()
    except requests.RequestException as e:
        # Log error in real application
        print(f"reCAPTCHA verification failed: {e}")
        return False
    except ValueError:
        # JSON decoding failed
        return False

    success: bool = result.get("success", False)
    score: float = result.get("score", 0.0)
    return success and score >= min_score
