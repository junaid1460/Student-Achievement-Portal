from rest_framework import serializers
from database.models import Document
class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('id', '_file','_domain','_category',
        '_date','_place', '_title','_year','_verified',
        '_avail_for_verification', '_created_at')