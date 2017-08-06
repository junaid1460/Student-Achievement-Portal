from django.db import models

from django.contrib.auth.models import User

class Extended(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)

class Document(models.Model):
    _user = models.ForeignKey(Extended) #belongs to which user?
    _file = models.FileField() # document
    _title = models.CharField(max_length = 1000, default = '') #title of achievement
    _year = models.IntegerField(default=0) #academic year
    _place = models.CharField(max_length = 400, default="") #place if needed
    _created_at = models.DateTimeField(auto_now_add=True) #automatic created date field
    _verified = models.BooleanField(default= False) # whether verified or not
    _date = models.DateField() #year at which achievement earned
    _domain = models.CharField(max_length = 20, default = "") #national, international, local etc.
    _category = models.CharField(max_length = 20, default = "") #academic, cultural or sport
    _avail_for_verification = models.BooleanField(default= False) #whether sent for verification or not


class VerifiedDoc(models.Model):
    _verified_by = models.ForeignKey(Extended)
    _document = models.OneToOneField(Document)
    _created_at = models.DateTimeField(auto_now_add=True)

 