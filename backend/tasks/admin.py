from django.contrib import admin
from . import models


@admin.register(models.Task)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'slug', 'author')
    repopulated_fields = {'slug': ('title',), }

