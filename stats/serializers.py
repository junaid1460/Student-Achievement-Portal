from rest_framework import serializers
from database.models import Document, User, Extended

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name')
class ExtSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Extended
        depth = 1
        fields = ('user',)



class DocStatsSerializer(serializers.ModelSerializer):
    _user = ExtSerializer()
    class Meta:
        model = Document
        depth = 1
        fields = ('_user','_file','_domain','_category',
        '_event_time','_place', '_title','_year','_verified',
        '_created_at', )