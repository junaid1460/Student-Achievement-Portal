from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from database.models import Extended
import defaults

def home(request):
    print("hello")
    print(request.user)
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
        user.last_name = lname
        user.save()
        ext = Extended(user = user, type = 'F' if faculty else 'S')
        ext.save()

    else:
        print("User exist")
        return False

