from django.db import models
from market.models import Item


class Account(models.Model):

    class AccountObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()

    TYPE_CHOICES = [
        ('income', 'Income'),
        ('expenditure', 'Expenditure'),
    ]

    type = models.CharField(max_length=12, choices=TYPE_CHOICES, default='expenditure')
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    @property
    def total_price(self):
        return self.quantity * self.item.price

    objects = models.Manager()
    accountobjects = AccountObjects()