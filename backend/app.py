from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail
from dotenv import load_dotenv
from config import Config
from email.sender import send_contact_email
from services.recaptcha import verify_recaptcha

app = Flask(__name__)
CORS(app, origins=["https://yourdomain.com", "http://localhost:3000"])
load_dotenv()

# Mail config
app.config.from_object(Config)
mail = Mail(app)


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")
    recaptcha_token = data.get("recaptcha_token")

    if not verify_recaptcha(recaptcha_token):
        return jsonify({"error": "reCAPTCHA failed"}), 400

    try:
        send_contact_email(mail, name, email, message)
        return jsonify({"message": "Message sent successfully"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to send message"}), 500


if __name__ == "__main__":
    app.run()
