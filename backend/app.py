from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    # Email configuration
    sender = os.getenv("EMAIL_USER")
    receiver = "your_email@example.com"
    password = os.getenv("EMAIL_PASS")

    msg = MIMEText(f"Name: {name}\nEmail: {email}\nMessage: {message}")
    msg["Subject"] = "New Contact Form Submission"
    msg["From"] = sender
    msg["To"] = receiver

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender, password)
            server.sendmail(sender, receiver, msg.as_string())
        return jsonify({"message": "Message sent successfully"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to send message"}), 500

if __name__ == "__main__":
    app.run(debug=True)