from django.shortcuts import render
from django.http import Http404, HttpResponse, JsonResponse
from achievement_portal.views import new_coordinator, new_user
from database.models import User
# Create your views here.
import pandas as pd
from io import StringIO

def deleteUsers(req):
    pass

def addUsers(req):
    data = pd.read_csv(StringIO(req.FILES['_file'].read().decode('utf-8')))
    for row in data.iterrows():
        try:
            new_user(username = str(row[1]['username']), 
                email = str(row[1]['username']) + "@nmamit.in", password = str(row[1]['username']),
                faculty = row[1]['is_faculty'] == 1,fname = str(row[1]['first_name']),
                lname = str(row[1]['last_name']))
        except BaseException as e:
            pass
    return JsonResponse({})

def removeUsers(req):
    data = pd.read_csv(StringIO(req.FILES['_file'].read().decode('utf-8')))
    for row in data.iterrows():
        try:
            user = User.objects.get(username = row[1]['username'])
            user.delete()
        except BaseException as e:
            print(e)
    return JsonResponse({})

def getUsernameJson(req):
    data = pd.read_csv(StringIO(req.FILES['_file'].read().decode('utf-8')))
    return  HttpResponse(data.to_json(orient='records'))

def getUserJson(req):
    data = pd.read_csv(StringIO(req.FILES['_file'].read().decode('utf-8')))
    return  HttpResponse(data.to_json(orient='records'))
