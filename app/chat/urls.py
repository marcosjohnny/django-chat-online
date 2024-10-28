from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<pk>", views.RoomDetailView.as_view(), name="room_datail"),
    path("<pk>/send", views.send, name="send"),
]
