from rest_framework import serializers
from database.models import Document
class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('id','_user', '_file', '_title', '_created_at')