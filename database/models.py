from django.db import models

# Create your models here.
class Student(models.Model):
    _usn = models.CharField(max_length = 40)
    _fname = models.CharField(max_length = 100)

class Faculty(models.Model):
    _name = models.CharField(max_length = 100)

class Document(models.Model):
    _document_of = models.ForeignKey(Student)
    _file = models.CharField(max_length = 500)

class VerifiedDoc(models.Model):
    _verified_by = models.ForeignKey(Faculty)
    _document = models.OneToOneField(Document)

