from django.urls import path
from .views import TaskList, TaskDetail

app_name = 'tasks'


urlpatterns = [
    path('', TaskList.as_view(), name='list'),
    path('<int:pk>/', TaskDetail.as_view(), name='detail'),
]