from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticated, IsAuthenticatedOrReadOnly, SAFE_METHODS
from django.shortcuts import get_object_or_404
from tasks.models import Task
from .serializers import TaskSerializer


class TaskUserWritePermission(BasePermission):
    message = "Editing tasks is restricted to the author only."
    
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user


class TaskViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Task, slug=item)

    def get_queryset(self):
        return Task.objects.all()


# class TaskList(generics.ListCreateAPIView):
#     permission_classes = [AllowAny]
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer


# class TaskDetail(generics.RetrieveUpdateDestroyAPIView, TaskUserWritePermission):
#     permission_classes = [TaskUserWritePermission]
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer