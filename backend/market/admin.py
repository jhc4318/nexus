from django.contrib import admin
from . import models


@admin.register(models.Product)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'type')


@admin.register(models.Subcontractor)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(models.Location)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(models.Item)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'subcontractor', 'product', 'location', 'price')