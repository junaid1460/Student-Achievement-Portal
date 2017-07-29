from django.shortcuts import render
from rest_framework import generics, views
from .serializers import DocumentSerializer
from database.models import Document
from rest_framework.parsers import FileUploadParser
import os
from achievement_portal.settings import BASE_DIR
# Create your views here.

class DocumentListView(generics.ListCreateAPIView):
    serializer_class = DocumentSerializer
    def perform_create(self, serializer):
        serializer.save(_user = self.request.user.extended)
        
    def get_queryset(self):
        return Document.objects.filter(_user = self.request.user.extended)
