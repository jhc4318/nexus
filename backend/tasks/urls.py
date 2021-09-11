from rest_framework.routers import DefaultRouter
from .views import TaskViewset

app_name = 'tasks'


router = DefaultRouter()
router.register('', TaskViewset, basename='task')
urlpatterns = router.urls