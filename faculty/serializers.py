from rest_framework import serializers
from database.models import User, Extended


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'first_name', 'last_name', 'email')