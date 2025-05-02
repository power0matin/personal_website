from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
from jinja2 import Environment, FileSystemLoader
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASS')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

# Set up Jinja2 environment
env = Environment(loader=FileSystemLoader('templates'))

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    try:
        # Load and render the email template
        template = env.get_template('email_template.html')
        html_content = template.render(name=name, email=email, message=message)

        # Create email
        msg = Message(
            subject="New Contact Form Submission",
            sender=os.getenv("EMAIL_USER"),
            recipients=["your_email@example.com"],
            html=html_content
        )

        # Send email
        mail.send(msg)
        return jsonify({"message": "Message sent successfully"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to send message"}), 500

if __name__ == "__main__":
    app.run(debug=True)