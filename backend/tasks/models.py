from django.db import models
from django.utils import timezone


class Task(models.Model):
    title = models.CharField(max_length=250)
    info = models.TextField()
    published = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ('-published',)


    def __str__(self):
        return self.title
