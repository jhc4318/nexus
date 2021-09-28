from django.db import models
from market.models import Item


class Account(models.Model):

    class AccountObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()
    
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    @property
    def total_price(self):
        return self.quantity * self.item.price

    objects = models.Manager()
    accountobjects = AccountObjects()