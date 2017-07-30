from django.db import models

from django.contrib.auth.models import User

class Extended(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)

class Document(models.Model):
    _user = models.ForeignKey(Extended)
    _file = models.FileField()
    _title = models.CharField(max_length = 1000, default = '')
    _year = models.IntegerField(default=0)
    _place = models.CharField(max_length = 400, default="")
    _result = models.CharField(max_length = 100, default ="")
    _created_at = models.DateTimeField(auto_now_add=True)
    _verified = models.BooleanField(default= False)
    _avail_for_verification = models.BooleanField(default= False)

class VerifiedDoc(models.Model):
    _verified_by = models.ForeignKey(Extended)
    _document = models.OneToOneField(Document)

