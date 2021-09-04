from .serializers import SectionSerializer
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rfp.models import Section


class SectionList(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SectionSerializer

    @action(detail=True)
    def subsections(self, request, pk):
        section = Section.objects.get(pk=pk)
        queryset = section.section_set.all() # Get all subsections
        serializer = self.get_serializer(queryset, many=True)
        
        return Response(serializer.data)
        


