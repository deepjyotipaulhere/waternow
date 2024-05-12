from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
import google.generativeai as genai
import json


# Create your views here.
class UserViewset(ModelViewSet):
    serializer_class = UsersSerializer
    queryset = Users.objects.all()


class WaterTanksViewset(ModelViewSet):
    serializer_class = WaterTanksSerializer
    queryset = WaterTanks.objects.all()


class PostViewset(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


@api_view(["POST"])
def save_post(request, format=None):
    u = Users.objects.get(pk=request.data["posted_by"])
    p = Post.objects.create(posted_by=u, water_needed=request.data["water_needed"])
    p.save()
    return Response("OK")


@api_view(["POST"])
def login(request, format=None):
    user = Users.objects.filter(
        email=request.data["email"], password=request.data["password"]
    ).first()
    if user:
        print(UsersSerializer(user).data)
        return Response(UsersSerializer(user).data)
    else:
        return Response("Invalid credentials", status=status.HTTP_401_UNAUTHORIZED)


@api_view(["POST"])
def get_water_tanks(request, format=None):
    tanks = WaterTanks.objects.filter(user=request.data["userid"])
    wtser = WaterTanksSerializer(tanks, many=True)
    return Response(wtser.data)


@api_view(["POST"])
def get_prediction(request, format=None):
    api_key = "AIzaSyCHoLwFWQwzdSLx6VqpS6oZzJn_xl5qkv4"
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(
        "gemini-1.5-pro-latest",
        generation_config={"response_mime_type": "application/json"},
    )
    prompt = 'You are data predictor from given structured data in the form of [{"month":<month>,"water_needed":<float>}] and return predicted data as json output in the form of {"water_prediction": <float>, "days":<int>} for days=30'
    if request.data["userid"] == 1:
        response = model.generate_content(
            [
                prompt,
                """[{"month":"January","water_needed":60},{"month":"February","water_needed":30},{"month":"March","water_needed":40},{"month":"April","water_needed":50}]""",
            ]
        )
        return Response(json.loads(response.text))
    else:
        response = model.generate_content(
            [
                prompt,
                """[{"month":"January","water_needed":10},{"month":"February","water_needed":5},{"month":"March","water_needed":3},{"month":"April","water_needed":6}]""",
            ]
        )
        return Response(json.loads(response.text))


# @api_view(['POST'])
# def update_water_stock(request, format=None):
