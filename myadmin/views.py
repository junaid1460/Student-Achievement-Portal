from django.shortcuts import render
from django.http import Http404, HttpResponse, JsonResponse

# Create your views here.
import pandas as pd
from io import StringIO

def deleteUsers(req):
    pass

def addUsers(req):
    data = pd.read_csv(StringIO(req.FILES['_file'].read().decode('utf-8')))
    for row in data.iterrows():
        new_user(username = row[1]['username'], 
            email = row[1]['email'], password = row[1]['username'],
            faculty = row[1]['is_faculty'],fname = row[1]['first_name'],
            lname = row[1]['last_name'])
        print(row[1]['username'])
    # for index, row in data.iterrows():
    #     print(row)
    #     print()
    return JsonResponse({})

def getUserJson(req):
    data = pd.read_csv(StringIO(req.FILES['_file'].read().decode('utf-8')))
    return  HttpResponse(data.to_json(orient='records'))