import unittest
from backend.app import app

class ContactFormTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_contact_form_success(self):
        response = self.app.post(
            "/api/contact",
            json={
                "name": "Test User",
                "email": "test@example.com",
                "message": "This is a test message."
            }
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Message sent successfully", response.data)

    def test_contact_form_missing_fields(self):
        response = self.app.post(
            "/api/contact",
            json={
                "name": "Test User",
                "email": "test@example.com"
                # Missing message field
            }
        )
        self.assertEqual(response.status_code, 500)
        self.assertIn(b"Failed to send message", response.data)

    def test_contact_form_invalid_email(self):
        response = self.app.post(
            "/api/contact",
            json={
                "name": "Test User",
                "email": "invalid-email",
                "message": "This is a test message."
            }
        )
        self.assertEqual(response.status_code, 500)
        self.assertIn(b"Failed to send message", response.data)

if __name__ == "__main__":
    unittest.main()