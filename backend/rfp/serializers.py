from rest_framework import serializers
from rfp.models import Section


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ('id', 'title', 'info', 'parentsection')