
from notification.models import Notification
from user.models import Task
from ws4redis.publisher import RedisPublisher
from ws4redis.redis_store import RedisMessage
from celery import shared_task
from django.contrib.auth.models import User


@shared_task
def create_notification(assignee,task_title):
    task = Task.objects.get(title=task_title)
    user = User.objects.get(pk=assignee)
    if task:
        notify = Notification.objects.create(assigned_to=user,notify= task)
        redis_publisher = RedisPublisher(facility="foobar",broadcast=True)
        message = RedisMessage("new")
        redis_publisher.publish_message(message)
        return True
    
