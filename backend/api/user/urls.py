from django.urls import path

from .views import TaskView

app_name = "tasks"

urlpatterns = [
    path('tasks/', TaskView.as_view())
]