from .serializers import ProductSerializer, SubcontractorSerializer, LocationSerializer, ItemSerializer
from market.models import Product, Subcontractor, Location, Item
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated


class ProductList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class SubcontractorList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = SubcontractorSerializer
    queryset = Subcontractor.objects.all()


class LocationList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = LocationSerializer
    queryset = Location.objects.all()


class ItemList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

