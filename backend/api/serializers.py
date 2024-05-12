from .models import *
from rest_framework import serializers


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"

class WaterTanksSerializer(serializers.ModelSerializer):
    class Meta:
        model=WaterTanks
        fields='__all__'

class PostSerializer(serializers.ModelSerializer):
    posted_by=serializers.CharField(source='posted_by.name')
    class Meta:
        model=Post
        fields='__all__'