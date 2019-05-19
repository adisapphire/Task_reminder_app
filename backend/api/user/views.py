from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics
# Create your views here.
from .models import Task
from .serializers import Taskserializer

class TaskView(generics.ListAPIView):
    queryset  = Task.objects.all()
    serializer_class = Taskserializer
        

