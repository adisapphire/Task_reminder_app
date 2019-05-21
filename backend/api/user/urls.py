from django.urls import path

from .views import TaskView, TaskDetailView
app_name = "tasks"

urlpatterns = [
    path('tasks/', TaskView.as_view()),
    path('tasks/<int:pk>', TaskDetailView.as_view()),
]