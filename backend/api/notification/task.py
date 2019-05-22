
from notification.models import Notification
from user.models import Task
from ws4redis.publisher import RedisPublisher
from ws4redis.redis_store import RedisMessage
from celery import shared_task

@shared_task
def create_notification(task_title):
    task = Task.objects.get(title=task_title)
    print("dmvcefnvjcefk",task)
    if task:
        notify = Notification.objects.create(notify= task)
        redis_publisher = RedisPublisher(facility="foobar",broadcast="True")
        message = RedisMessage("new")
        redis_publisher.publish_message(message)
        return True
    
