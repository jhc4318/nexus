# from django.urls import reverse
# from django.test import TestCase
# from django.contrib.auth import get_user, get_user_model
# from rest_framework import status
# from rest_framework.test import APIClient, APITestCase, force_authenticate
# from tasks.models import Task


# class TaskModelTests(TestCase):

#     @classmethod
#     def setUpTestData(cls):
#         db = get_user_model()
#         test_user1 = db.objects.create_user(
#             user_name='test_user1', email='email@test.com', password='pass'
#         )
#         test_task = Task.objects.create(
#             title='Test title', info='Test info', slug='task-title', 
#             author=test_user1
#         )
    
#     def test_task_content(self):
#         task = Task.objects.get(id=1)
#         title = f'{task.title}'
#         info = f'{task.info}'
#         author = f'{task.author}'
#         slug = f'{task.slug}'
#         self.assertEqual(title, 'Test title')
#         self.assertEqual(info, 'Test info')
#         self.assertEqual(author, 'test_user1')
#         self.assertEqual(slug, 'task-title')
#         self.assertEqual(str(task), 'Test title')


# class TaskAPITests(APITestCase):

#     def test_create_task(self):
#         db = get_user_model()
#         self.test_user1 = db.objects.create_superuser(
#             username='test_user1', password='pass'
#         )

#         self.client.login(username=self.test_user1.username, password='pass')
        
#         data = {
#             'title': 'Test title',
#             'info': 'Test info',
#             'author': 1,
#         }

#         url = reverse('tasks:list')
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
#     def test_list_task(self):
#         url = reverse('tasks:list')
#         response = self.client.get(url, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)