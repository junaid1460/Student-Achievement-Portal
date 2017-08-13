from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from database.models import Extended
from django.http import JsonResponse
import json
import defaults

def home(request):
    print("hello")
    print(request.user)
    if request.user.is_staff and request.user.is_superuser:
        return redirect('/django-admin')
    if not request.user.is_authenticated :
        #login and verification
        if request.method == 'POST':
            return home_post(request)
        elif request.method == 'GET':
            return home_get(request)
    else:
        #send template for faculty or student
        type = request.user.extended.type
        if type == 'F':
            return render(request, defaults.faculty_template, {})
        else:
            return render(request, defaults.student_template, {})
def log_out(req):
    try:
        logout(req)
    except object:
        pass
    return redirect('/')

def home_get(req):
    return render(req, defaults.unauthenticated_template , {})

def change_pass(req):
    if not req.user.is_authenticated() or req.method != 'POST':
        return JsonResponse({'status':False})

    try:
        data = json.loads(req.body.decode('utf-8'))
        print(data)
        current_password = data['current_password']
        new_password = data['new_password']
        print('new password set to', new_password,current_password)
        if req.user.check_password(raw_password = current_password):
            req.user.set_password(new_password)
            req.user.save()
            print('new password set to', new_password,current_password)
            return JsonResponse({'status':True})
        else:
            return JsonResponse({'status':False})
    except BaseException:
        return JsonResponse({'status':False})
            


def home_post(req):
    username = req.POST['username']
    password = req.POST['password']
    user = authenticate(username = username, password = password)
    if user is None:
        print("user not found")
        #send some error message
        return render(req, defaults.unauthenticated_template, {'error_message' : 'Username or Password did not match'})
    else:
        login(req,user)
        return redirect('/')

def new_user(username, email, password, faculty = False, fname = '', lname = ''):
    try:
        user = User.objects.get(username = username)
    except User.DoesNotExist:
        user = None
    if user is None:
        user = User.objects.create_user(username , email= email, password= password)
        user.first_name = fname
        user.last_name =  lname
        user.save()
        ext = Extended(user = user, type = 'F' if faculty else 'S')
        ext.save()

    else:
        try:
            ext = Extended(user = user, type = 'F' if faculty else 'S')
            ext.save()
        except BaseException:
            pass
        print("User exist")
        return False


from weasyprint import HTML
def make_pdf(req):
    html = HTML(string= render(req,defaults.certificate_template,{}).content.decode('utf-8'))
    pdf = html.write_pdf()

    return HttpResponse(pdf, content_type='application/pdf')

def admin(req):
    if req.user.is_authenticated() and req.user.is_superuser:
        return render(req, defaults.admin_template, {})
    raise Http404
import pandas as pd
from io import StringIO

def addUsers(req):
    if not req.user.is_authenticated() or not req.user.is_superuser:
        raise Http404
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
    if not req.user.is_authenticated() or not req.user.is_superuser:
        raise Http404
    data = pd.read_csv(StringIO(req.FILES['_file'].read().decode('utf-8')))
    return  HttpResponse(data.to_json(orient='records'))
