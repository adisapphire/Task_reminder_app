from django.db import models
from user.models import Task
from django.contrib.auth.models import User
# Create your models here.




class Notification(models.Model):
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE)
    notify = models.ForeignKey(Task, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.notify.title