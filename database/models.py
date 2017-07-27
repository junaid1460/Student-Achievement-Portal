from django.db import models

from django.contrib.auth.models import User

class Extended(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)

class Document(models.Model):
    _document_of = models.ForeignKey(Extended)
    _file = models.CharField(max_length = 500)

class VerifiedDoc(models.Model):
    _verified_by = models.ForeignKey(Extended)
    _document = models.OneToOneField(Document)

