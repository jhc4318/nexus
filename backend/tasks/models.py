from django.db import models
from django.utils import timezone
from django.conf import settings


class Task(models.Model):

    class TaskObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()   

    title = models.CharField(max_length=250)
    info = models.TextField()
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_tasks')
    slug = models.SlugField(max_length=250, unique_for_date='published')
    assigned_to = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)
    objects = models.Manager()
    taskobjects = TaskObjects()

    class Meta:
        ordering = ('-published',)


    def __str__(self):
        return self.title
