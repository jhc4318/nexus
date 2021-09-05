from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter
from .views import AccountList

app_name = 'company'


router = DefaultRouter()
router.register('accounts', AccountList, basename='accounts')
urlpatterns = router.urls