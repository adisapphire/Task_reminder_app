from django.db import models
from django.conf import settings
from django.contrib.auth.models import User



class Task(models.Model):
    title = models.CharField(max_length=120)
    detail = models.CharField(max_length=2000)
    deadline = models.DateTimeField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL,null=True,blank=True, on_delete=models.CASCADE)
    assignee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assignee')
    
    def create_by(self):
        if self.created_by:
            return self.created_by.username
        return None

    def assign_to(self):
        return self.assignee.username


    def __str__(self):
        return self.title





    

    def save_model(self, request, obj, form, change):
        obj.created_by = request.user
        super.save_model(request, obj, form, change)
    