from django.urls import path

from .views import UserView, UserApiView

app_name = "register"

urlpatterns = [
    path('register/', UserView.as_view()),
    path('profile/<int:pk>', UserApiView.as_view()),
]