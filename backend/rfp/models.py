from django.db import models
from django.utils import timezone


class Section(models.Model):

    class SectionObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()

    title = models.CharField(max_length=250)
    info = models.TextField(blank=True)
    updated = models.DateTimeField(default=timezone.now)
    parentsection = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True)
    objects = models.Manager()
    sectionobjects = SectionObjects()

    class Meta:
        ordering = ('updated',)

    def __str__(self):
        return self.title
