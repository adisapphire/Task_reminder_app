from rest_framework import serializers
from .models import Task
from register.serializers import UserSerializer

class Taskserializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','title','detail', 'deadline','assignee','created_by')
        model = Task
    
    def create(self, validated_data):
        return Task.objects.create(**validated_data)

class TaskDserializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','title','assign_to')
        model = Task


