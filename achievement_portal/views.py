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
        return redirect('/admin')
    if request.user.is_staff:
        return redirect('/stats')
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

def home_get(req, context = {'error':None}):
    return render(req, defaults.unauthenticated_template , context)

def change_pass(req):
    '''
        controller to change password
        request.body is data source (body is bytedata decode and parse it json before access)
        fileds : `current_password`
                 `new_password`
    '''
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
    '''
        data source : request.POST
        fileds : username
                 password
    '''
    username = req.POST['username']
    password = req.POST['password']
    user = authenticate(username = username, password = password)
    if user is None:
        print("user not found")
        #send some error message
        return render(req, defaults.unauthenticated_template, {'error' : 'Username or Password did not match'})
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


def new_coordinator(username, password):
    try:
        user = User.objects.get(username = username)
    except User.DoesNotExist:
        user = None
    if user is None:
        user = User.objects.create_user(username , email= None, password= password)
        user.is_staff = True
        user.save()
    else:
        print("Coordinator account exist.")
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

