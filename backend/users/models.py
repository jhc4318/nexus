from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import (
    AbstractBaseUser, 
    PermissionsMixin, 
    BaseUserManager
)
from tasks.models import Task

class CustomAccountManager(BaseUserManager):
    def create_user(self, user_name, email, password, **other_fields):
        if not email:
            raise ValueError(_('You must provide an email address.'))

        email = self.normalize_email(email)
        user = self.model(user_name=user_name, email=email, **other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, user_name, email, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if other_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        
        return self.create_user(user_name, email, password, **other_fields)


class User(AbstractBaseUser, PermissionsMixin):
    user_name = models.CharField(max_length=50, unique=True)
    email = models.EmailField(_('email address'), unique=True)
    start_date = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'user_name'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.user_name