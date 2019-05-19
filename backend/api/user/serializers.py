from rest_framework import serializers
from .models import Task


class Taskserializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','title','detail', 'deadline','assignee','created_by')
        model = Task