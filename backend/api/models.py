from django.db import models


# Create your models here.
class Users(models.Model):
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    name = models.CharField(max_length=1000)

    def __str__(self) -> str:
        return self.name


class WaterTanks(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    capacity = models.DecimalField(max_digits=10, decimal_places=3)
    current_level = models.DecimalField(max_digits=10, decimal_places=3)

    def __str__(self) -> str:
        return self.user.name


class WaterTanksUpdation(models.Model):
    userid = models.ForeignKey(Users, on_delete=models.CASCADE)
    tankid = models.ForeignKey(WaterTanks, on_delete=models.CASCADE)
    requirement = models.DecimalField(max_digits=10, decimal_places=3)
    updated_on = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.userid.name + " - " + self.tankid


class Post(models.Model):
    posted_by = models.ForeignKey(Users, on_delete=models.CASCADE)
    water_needed = models.DecimalField(max_digits=5, decimal_places=2)
    posted_on=models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return self.posted_by.name
