from .serializers import AccountSerializer
from .models import Account
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated


class AccountList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = AccountSerializer
    queryset = Account.objects.all()