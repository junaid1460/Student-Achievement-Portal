from django.shortcuts import render
import defaults as d
from rest_framework  import views, generics
from student.serializers import DocumentSerializer, Document
from rest_framework.filters import SearchFilter, OrderingFilter
from .paginator import StatsPaginator
from django.db.models import Q
import json
from django.http import JsonResponse
from .serializers import DocStatsSerializer, StudentStatsSerializer
from database.models import User
from student.serializers import DocumentSerializer
from django.views import View
from django.http import Http404
# Create your views here.

def stats_view(req):
    if not req.user.is_authenticated() or not req.user.is_staff:
        raise Http404
    return render(req, d.stats_template, {})

class StudentView(generics.ListAPIView):
    serializer_class = DocumentSerializer

    def get_queryset(self):
        try:
            return Document.objects.filter(_user__user__username = self.request.GET['user'])
        except BaseException:
            return []
                    

class StatsListing(generics.ListAPIView):
    serializer_class = DocStatsSerializer
    filter_backends = [SearchFilter, OrderingFilter]

    pagination_class = StatsPaginator
    def get_queryset(self):
        # data = json.loads(self.request.body.decode('utf-8'))

        try:
            data = json.loads(self.request.META['HTTP_DATA'])
        except BaseException:
            return []
        tmp = getDocs(data)

        return tmp.filter(_verified=True)

class StudentStatsListing(generics.ListAPIView):
    
    serializer_class = StudentStatsSerializer
    filter_backends = [SearchFilter]

    pagination_class = StatsPaginator
    def get_queryset(self):
        # data = json.loads(self.request.body.decode('utf-8'))

        try:
            data = json.loads(self.request.META['HTTP_DATA'])
        except BaseException:
            return []
        tmp = getDocs(data)

        return User.objects.filter(id__in = [i['_user__user__id'] for i in tmp.filter(_verified=True).only('_user__user__id').values('_user__user__id').distinct()]).order_by('username')


class CurrentStudentList(generics.ListAPIView):
    serializer_class = DocumentSerializer
    def get_queryset(self):
        
        print(self.request.GET)
        return Document.objects.all()

def getDocs(data):
    keys = data['keys']
    cats = data['cats']
    years = data['years']
    domains = data['domains']
    types = data['types']
    subcats = set(data['subcat'])
    sortby = data['sortby']
    # print(data)
    # return Document.objects.all()
    
    tmp = Document.objects.all() 
    # print("after sorting", len(tmp))
    # print()
    if len(domains) != 0:
        tmp = tmp.filter(_domain__in  = domains)
    # print("after domain:", len(tmp))
    # print()
    if len(subcats) != 0:
        tmp = tmp.filter(_sub_cat__in  = subcats)
    # print("after subcats:", len(tmp))
    # print()
    if len(cats) != 0:
        tmp = tmp.filter(_category__in  = cats)
    # print("after cats:", len(tmp))
    # print()
    if len(years) != 0:
        tmp = tmp.filter(_year__in  = years)
    # print("after years:", len(tmp))
    # print()
    if len(types) != 0:
        tmp = tmp.filter(_type__in  = types)
    # print("after types:", len(tmp))
    # print()
    # print(tmp)
    #keys
    current = tmp
    res = None
    intkeys = []
    for k in keys:
        try:
            intk = int(k)
            if intk < 6410:
                intkeys += [intk]
        except BaseException:
            pass
    print(intkeys, keys)
    # print(tmp.filter(_event_time__year__in = intkeys))
    print()
    temp = None
    if len(keys) > 0 :
        for k in keys:
            t = tmp.filter(_user__user__username__iexact = k)
            if len(t) > 0:
                if temp == None:
                    temp = t
                else:
                    temp |= t
        for k in intkeys:
            t = tmp.filter(_event_time__year = k)
            if len(t) > 0:
                if temp == None:
                    temp = t
                else:
                    temp |= t
        if temp == None:
            return t
    else:
        temp = tmp
    try:
        if sortby != '':
            tmp = temp.order_by(sortby)
        else:
            tmp = temp.order_by('id')
    except BaseException:
        tmp = temp.order_by('id')
    return tmp

class PDFview(View):
    def get(self, request):
        try:
            data = json.loads(self.request.META['HTTP_DATA'])
        except BaseException:
            return []

        #indexs keys, cats, years, domains
        # print(data)
        tmp = getDocs(data)
       
        tmp =  User.objects.filter(id__in = [i['_user__user__id'] for i in tmp.filter(_verified=True).only('_user__user__id').values('_user__user__id').distinct()]).order_by('username')

        from weasyprint import HTML
        import defaults
        from django.http import HttpResponse
        html = HTML(string= render(request,defaults.list_template,{'users':tmp}).content.decode('utf-8'))
        pdf = html.write_pdf()
        
        return HttpResponse(pdf, content_type='application/pdf',)