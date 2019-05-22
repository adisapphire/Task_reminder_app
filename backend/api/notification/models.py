from django.db import models
from user.models import Task
# Create your models here.




class Notification(models.Model):
    notify = models.ForeignKey(Task, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.notify.title