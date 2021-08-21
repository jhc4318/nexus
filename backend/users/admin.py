from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin


class UserAdminConfig(UserAdmin):
    model = User
    search_fields = ('user_name', 'email',)
    ordering = ('-start_date',)
    list_display = ('id', 'user_name', 'email', 'is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('user_name', 'email',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('user_name', 'email', 'password1', 'password2', 'is_active', 'is_staff'),
        }),
    )


admin.site.register(User, UserAdminConfig)