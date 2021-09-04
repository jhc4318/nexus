from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter
from .views import SectionList

app_name = 'rfp'


router = DefaultRouter()
router.register('', SectionList, basename='rfp')
urlpatterns = router.urls