from django.contrib import admin
from . import models


@admin.register(models.Section)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'parentsection')