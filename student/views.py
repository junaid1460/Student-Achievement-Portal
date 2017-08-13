from django.shortcuts import render, HttpResponse, Http404
from django.http import JsonResponse
from rest_framework import generics, views
from .serializers import DocumentSerializer
from database.models import Document
from rest_framework.parsers import FileUploadParser,MultiPartParser,FormParser
import os
from achievement_portal.settings import BASE_DIR
import json
# Create your views here.

class DocumentListView(generics.ListCreateAPIView):
    serializer_class = DocumentSerializer
    parser_classes = (FormParser, MultiPartParser)
    def perform_create(self, serializer):
        serializer.save(_user = self.request.user.extended)
        
    def get_queryset(self):
        
        return Document.objects.filter(_user = self.request.user.extended)

def delete(req):
    if req.user.is_authenticated():
        if req.method == 'POST':
            print(req.body.decode('utf-8'))
            data = json.loads(req.body.decode('utf-8'))
            print(data.get('id'))
            ids = data.get('id')
            cd = False
            vd = False
            for id in ids:
                try:
                    doc =  Document.objects.get(pk = id)
                    print(doc)
                    if doc._verified != True:
                        doc._file.delete(False)
                        doc.delete()
                    else:
                        print("Document verified, cannot delete")
                except Document.DoesNotExist:
                    
                    print("already deleted")
                    # return JsonResponse({'status':'Does not exist or Already delted. please refresh.'})
            return JsonResponse({'status':'deleted'})
        # else:
        #     return render(req, 'test.html')
    raise Http404
