from django.urls import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from tasks.models import Task


class TaskModelTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        test_task = Task.objects.create(
            title='Test title', info='Test info',
        )
    
    def test_task_content(self):
        task = Task.objects.get(id=1)
        title = f'{task.title}'
        info = f'{task.info}'
        self.assertEqual(title, 'Test title')
        self.assertEqual(info, 'Test info')
        self.assertEqual(str(task), 'Test title')


class TaskAPITests(APITestCase):
    def test_create_task(self):
        data = {
            'title': 'Test title',
            'info': 'Test info',
        }
        url = reverse('tasks:list')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_list_task(self):
        url = reverse('tasks:list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)