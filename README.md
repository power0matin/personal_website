Personal Portfolio Website
A modern and responsive portfolio website for Matin Shahabadi, showcasing skills, projects, and contact information.
Project Structure
personal_website/
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── fonts/
│   │   ├── css/
│   │   │   ├── styles.css
│   │   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   └── form-handler.js
│   ├── pages/
│   │   ├── index.html
│   │   ├── about.html
│   │   ├── portfolio.html
│   │   └── contact.html
│   └── favicon.ico
├── backend/
│   ├── app.py
│   ├── templates/
│   │   └── email_template.html
│   ├── static/
│   ├── requirements.txt
│   └── .env
├── tests/
│   └── test_contact_form.py
├── docs/
│   └── README.md
├── .gitignore
├── package.json
├── LICENSE
└── README.md

Setup Instructions
Frontend

Navigate to the src directory.
Open index.html in a browser to view the website locally.
Ensure all assets (images, CSS, JS) are correctly linked.

Backend

Navigate to the backend directory.
Install dependencies:pip install -r requirements.txt


Create a .env file with your email credentials:EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password


Run the Flask server:python app.py



Deployment

Frontend: Deploy static files to a service like Netlify or Vercel.
Backend: Deploy the Flask app to a service like Heroku or Render.

License
MIT License. See LICENSE for details.
