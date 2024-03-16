from django.shortcuts import render
from .models import Message, Room

def index(request):

    rooms = Room.objects.all()
    messages = Message.objects.all()

    return render(request, "chat/index.html", {
        'rooms': rooms,
        'messages': messages,
    })
