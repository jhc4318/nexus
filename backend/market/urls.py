from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter
from .views import ProductList, SubcontractorList, LocationList, ItemList

app_name = 'market'


router = DefaultRouter()
router.register('products', ProductList, basename='products')
router.register('subcontractors', SubcontractorList, basename='subcontractors')
router.register('locations', LocationList, basename='locations')
router.register('items', ItemList, basename='items')
urlpatterns = router.urls