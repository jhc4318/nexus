from django.contrib import admin
from . import models


@admin.register(models.Account)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'item', 'quantity', 'total_price')