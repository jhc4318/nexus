from rest_framework.routers import DefaultRouter
from .views import TaskList

app_name = 'tasks'


router = DefaultRouter()
router.register('', TaskList, basename='task')
urlpatterns = router.urls