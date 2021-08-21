from rest_framework import generics
from rest_framework.permissions import BasePermission, IsAuthenticatedOrReadOnly, SAFE_METHODS
from tasks.models import Task
from .serializers import TaskSerializer


class TaskUserWritePermission(BasePermission):
    message = "Editing tasks is restricted to the author only."
    
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user


class TaskList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskDetail(generics.RetrieveUpdateDestroyAPIView, TaskUserWritePermission):
    permission_classes = [TaskUserWritePermission]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer