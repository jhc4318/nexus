from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('api/tasks/', include('tasks.urls', namespace='tasks')),
    path('api/users/', include('users.urls', namespace='users')),
    path('api/rfp/', include('rfp.urls', namespace='rfp')),
    path('api/market/', include('market.urls', namespace='market')),
    path('api/company/', include('company.urls', namespace='company')),
]

urlpatterns += [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]