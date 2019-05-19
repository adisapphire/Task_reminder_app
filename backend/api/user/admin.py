from django.contrib import admin

# Register your models here.

from .models import Task


class TaskAdmin(admin.ModelAdmin):
    exclude = ('created_by',)


admin.site.register(Task, TaskAdmin)