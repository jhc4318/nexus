from django.test import TestCase
from django.contrib.auth import get_user_model


class UserAccountTests(TestCase):
    def test_createuser(self):
        db = get_user_model()
        user = db.objects.create_user(
            'username', 'email@test.com', 'password'
        )
        self.assertEqual(str(user), 'username')
