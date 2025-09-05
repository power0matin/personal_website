import os
from typing import Any
from flask_mail import Mail, Message
from jinja2 import Environment, FileSystemLoader, TemplateNotFound

# Initialize Jinja2 environment
env = Environment(loader=FileSystemLoader("email"))


def send_contact_email(mail: Mail, name: str, email: str, message: str) -> bool:
    """
    Sends a contact form submission email using Flask-Mail and Jinja2 template.

    Args:
        mail (Mail): Flask-Mail instance.
        name (str): Name of the person submitting the form.
        email (str): Email address of the sender.
        message (str): Message content from the contact form.

    Returns:
        bool: True if email sent successfully, False otherwise.
    """
    try:
        # Load email template
        template = env.get_template("template.html")
        html_content = template.render(name=name, email=email, message=message)

        msg = Message(
            subject="New Contact Form Submission",
            sender=os.getenv("EMAIL_USER"),
            recipients=[os.getenv("EMAIL_RECEIVER")],
            html=html_content,
        )

        mail.send(msg)
        return True

    except TemplateNotFound:
        print("Error: Email template not found in the 'email' folder.")
    except Exception as e:
        print(f"Error sending email: {e}")

    return False
