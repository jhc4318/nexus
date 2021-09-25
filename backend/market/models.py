from django.db import models
from django.utils import timezone


class Product(models.Model):

    class ProductObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()

    TYPE_CHOICES = [
        ('service', 'Service'),
        ('commodity', 'Commodity'),
    ]

    name = models.CharField(max_length=250)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    objects = models.Manager()
    productobjects = ProductObjects()

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name


class Subcontractor(models.Model):

    class SubcontractorObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()

    name = models.CharField(max_length=250)
    objects = models.Manager()
    subcontractorobjects = SubcontractorObjects()

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name


class Location(models.Model):

    class LocationObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()

    name = models.CharField(max_length=250)
    objects = models.Manager()
    locationobjects = LocationObjects()

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name


class Item(models.Model):

    class ItemObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()

    subcontractor = models.ForeignKey(Subcontractor, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=15, decimal_places=2) # in £/unit
    objects = models.Manager()
    itemobjects = ItemObjects()

    @property
    def name(self):
        return f"{self.product.name} [{self.subcontractor.name}, {self.location.name}] - £{self.price}"

    class Meta:
        ordering = ('product',)

    def __str__(self):
        return f"{self.product.name} [{self.subcontractor.name}, {self.location.name}] - £{self.price}"