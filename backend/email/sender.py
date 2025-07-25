from flask_mail import Message
from jinja2 import Environment, FileSystemLoader
import os

env = Environment(loader=FileSystemLoader("email"))


def send_contact_email(mail, name, email, message):
    template = env.get_template("template.html")
    html_content = template.render(name=name, email=email, message=message)

    msg = Message(
        subject="New Contact Form Submission",
        sender=os.getenv("EMAIL_USER"),
        recipients=[os.getenv("EMAIL_RECEIVER")],
        html=html_content,
    )
    mail.send(msg)
