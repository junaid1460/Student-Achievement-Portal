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
    _domain = serializers.SerializerMethodField()
    _category = serializers.SerializerMethodField()
    _year = serializers.SerializerMethodField()
    _type = serializers.SerializerMethodField()
    _sub_cat = serializers.SerializerMethodField()

    class Meta:
        model = Document
        fields = ('_user', '_file','_domain','_category', '_type',
        '_event_time','_place', '_title','_year','_verified',
        '_sub_cat', '_created_at', '_has_error', '_error_message')
    def get__domain(self, obj):
        return obj.get__domain_display()
    def get__category(self, obj):
        return obj.get__category_display()
    def get__year(self, obj):
        return obj.get__year_display()
    def get__type(self, obj):
        return obj.get__type_display()
    def get__sub_cat(self, obj):
        return obj.get__sub_cat_display()

class StudentStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'first_name', 'last_name')