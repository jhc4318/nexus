from django.urls import path
from .views import UserList, UserDetail, BlacklistTokenView, CustomUserCreate


app_name = 'users'

urlpatterns = [
    path('', UserList.as_view(), name='list'),
    path('<int:pk>/', UserDetail.as_view(), name='detail'),
    path('register/', CustomUserCreate.as_view(), name='create'),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),
]