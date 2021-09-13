from django.contrib import admin
from . import models


@admin.register(models.Task)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'slug', 'author', 'status')
    repopulated_fields = {'slug': ('title',), }

