from django.shortcuts import render
from rest_framework import generics, views
from .serializers import StudentSerializer
from database.models import User, Extended
from student.serializers import DocumentSerializer, Document
from django.http import JsonResponse
from database.models import VerifiedDoc
import json
# Create your views here.
from random import shuffle
class StudentListView(generics.ListAPIView):
    serializer_class = StudentSerializer
    def get_queryset(self):
        # tmp = Extended.objects.filter(type='S').values('user')
        tmp =  Document.objects.filter(_verified = False)
        x = tmp.only('_user__user__id').distinct().values('_user__user__id')
        
      
        return User.objects.filter(id__in  = x).order_by('?')

class StudentDocumentListView(generics.ListAPIView):
    serializer_class = DocumentSerializer
    def get_queryset(self):
        id = -1
        try:
            id = self.request.GET['id']
            print(id)
        except BaseException:
            id = -1
        print(Document.objects.filter(_user = id), id)
        return Document.objects.filter(_user__user__id = id)



def verify(request):
    if request.user.is_authenticated() and request.method == 'POST':
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
            res[0]._has_error = False
            res[0]._error_message = ""
            print()
            res[0].save()
            print("proper 2")
            verifier = VerifiedDoc(_document = res[0], _verified_by = request.user.extended)
            verifier.save()
        return JsonResponse({'status' : 'Document verified!'})

def setErrorMessage(request):
    if request.user.is_authenticated() and request.method == 'POST':
        if request.user.extended.type != 'F':
            return JsonResponse({'status' : 'You\'re not authorised to perform this operation.'})
        #from here

        data = json.loads(request.body.decode('utf-8'))
        doc_id = data['doc_id']
        message = data['message']
        try:
            doc_id = int(doc_id)
        except BaseException:
            return JsonResponse({'status' : 'something is not right'})
        doc = None
        try:
            doc = Document.objects.get(id = doc_id)
            if doc is None:
                raise Document.DoesNotExist
        except BaseException:
            return JsonResponse({'status' : 'document not found'})

        doc._has_error = True
        doc._error_message = message
        try:
            doc._verified = False
            doc.verifieddoc.delete()
        except BaseException:
            pass
        doc.save()
        return JsonResponse({'status' : 'Worked!'})

        #till here
    return JsonResponse({'status' : 'You\'re not authorised to perform this operation.'})

        
