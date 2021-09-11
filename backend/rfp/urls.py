from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter
from .views import SectionViewset

app_name = 'rfp'


router = DefaultRouter()
router.register('', SectionViewset, basename='rfp')
urlpatterns = router.urls