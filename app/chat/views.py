import json
from django.shortcuts import render
from .models import Message, Room
from django.views.generic.detail import DetailView

def index(request):
    rooms = Room.objects.all()

    return render(request, "chat/index.html", {
        'rooms': rooms,
    })

class RoomDetailView(DetailView):
    model = Room
    template_name = 'chat/messages.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context
    
def send(request, pk):
    data = json.loads(request.body)

    message = Message.objects.create(user = request.user, text=data['message'])

    room = Room.objects.get(id=pk)
    room.messages.add(message)

    return render(request, "chat/index.html", {
        'message': message
    })