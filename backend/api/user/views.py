from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics
# Create your views here.
from .models import Task
from .serializers import Taskserializer, TaskDserializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from notification.task import create_notification
from rest_framework import filters


class TaskDView(generics.ListAPIView):
    # permission_classes = (IsAuthenticated,)
    queryset  = Task.objects.all()
    serializer_class = TaskDserializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('assignee__username',)

class TaskView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset  = Task.objects.all()
    serializer_class = Taskserializer

    def post(self, request):
        task = request.data
        serializer = Taskserializer(data=task)
        if serializer.is_valid(raise_exception=True):
            task_saved = serializer.save()
            task_saved.created_by = request.user
            task_saved.save()
            try:
                print(task_saved.assignee.id)
                create_notification.apply_async(args=[task_saved.assignee.id,task_saved.title], eta=task['deadline'])
            except:
                print("error in celery part") 
            return Response({"success": "Task '{}' created successfully".format(task_saved.title)})

class TaskDetailView(generics.RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset  = Task.objects.all()
    serializer_class = Taskserializer 

    def delete(self, request, pk):
        # Get object with this pk
        task = get_object_or_404(Task.objects.all(), pk=pk)
        task.delete()
        return Response({"message": "Task with id `{}` has been deleted.".format(pk)},status=204)

