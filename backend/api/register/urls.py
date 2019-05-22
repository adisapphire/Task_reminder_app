from django.urls import path

from .views import UserView, UserApiView, UsersView

app_name = "register"

urlpatterns = [
    path('users/add', UserView.as_view()),
    path('users/profile/<int:pk>', UserApiView.as_view()),
    path('users/', UsersView.as_view()),
]