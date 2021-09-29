from django.urls import path
from .views import BlacklistTokenView, CustomUserCreate, UserViewset
from rest_framework.routers import DefaultRouter


app_name = 'users'

router = DefaultRouter()
router.register('', UserViewset, basename='users')

urlpatterns = router.urls

urlpatterns += [
    # path('', UserList.as_view(), name='list'),
    # path('<int:pk>/', UserDetail.as_view(), name='detail'),
    path('register/', CustomUserCreate.as_view(), name='create'),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),
]