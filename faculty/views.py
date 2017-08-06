from django.shortcuts import render
from rest_framework import generics, views
from .serializers import StudentSerializer
from database.models import User, Extended
from student.serializers import DocumentSerializer, Document
from django.http import JsonResponse
from database.models import VerifiedDoc
import json
# Create your views here.
class StudentListView(generics.ListAPIView):
    serializer_class = StudentSerializer
    def get_queryset(self):
        tmp = Extended.objects.filter(type='S').values('user')
        return User.objects.filter(id__in = tmp)

class StudentDocumentListView(generics.ListAPIView):
    serializer_class = DocumentSerializer
    def get_queryset(self):
        try:
            id = self.request.GET['id']
            print(id)
        except BaseException:
            id = -1
        return Document.objects.filter(_user = id)



def verify(request):
    if request.user.is_authenticated():
        if request.user.extended.type != 'F':
            return JsonResponse({'status' : 'You\'re not authorised to perform this operation.'})
        

        data = json.loads(request.body.decode('utf-8'))
        print(data)
        try:
            doc = data['doc_id']
        except BaseException:
            JsonResponse({'status' : 'Something went wrong'})
        

        for doc_id in doc:
            print(doc_id)
            try:
                doc_id = int(doc_id)
            except BaseException:
                return JsonResponse({'status' : 'Document not found.'})
            print("proper")
            res = Document.objects.filter(id = doc_id)
            if len(res) == 0:
                return JsonResponse({'status' : 'Document not found.'})
            if res[0]._verified == True:
                continue
            print("proper 1")
            res[0]._verified = True
            print(res[0]._date)
            res[0].save()
            print("proper 2")
            verifier = VerifiedDoc(_document = res[0], _verified_by = request.user.extended)
            verifier.save()
        return JsonResponse({'status' : 'Document verified!'})
        
