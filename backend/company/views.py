from .serializers import AccountSerializer
from .models import Account
from rest_framework import viewsets
from rest_framework.permissions import AllowAny


class AccountList(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = AccountSerializer
    queryset = Account.objects.all()