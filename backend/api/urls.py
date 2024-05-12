from django.urls import path
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()

router.register("users", UserViewset)
router.register("watertanks", WaterTanksViewset)
router.register("posts", PostViewset)

urlpatterns = router.urls

urlpatterns+=[
    path("login/", login),
    path("userwatertanks/", get_water_tanks),
    path("getprediction/", get_prediction),
    path("savepost/", save_post),
]