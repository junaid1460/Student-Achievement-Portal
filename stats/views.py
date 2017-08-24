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
# Create your views here.

def stats_view(req):
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
        #indexs keys, cats, years, domains
        print(data)
        keys = data['keys']
        cats = data['cats']
        years = data['years']
        domains = data['domains']
        types = data['types']
        subcats = set(data['subcat'] + [0])
        sortby = data['sortby']
        # print(data)
        # return Document.objects.all()
        try:
            if sortby != '':
                tmp = Document.objects.order_by(sortby)
            else:
                tmp = Document.objects.all() 
        except BaseException:
            tmp = Document.objects.all() 
            
        if len(domains) != 0:
            tmp = tmp.filter(_domain__in  = domains)
        if len(subcats) != 0:
            tmp = tmp.filter(_sub_cat__in  = subcats)
        if len(cats) != 0:
            tmp = tmp.filter(_category__in  = cats)
        if len(years) != 0:
            tmp = tmp.filter(_year__in  = years)
        
        if len(types) != 0:
            tmp = tmp.filter(_type__in  = types)
        
        print(tmp)
        #keys
        current = tmp
        res = None
        if len(keys) > 0:
            for k in keys:
                try:
                    intk = int(k)
                    if intk > 4610:
                        intk = 1
                    print(intk)
                except BaseException:
                    intk = 1
                try:
                    tmp = current.filter(
                        Q(_user__user__username__iexact = k)|
                        Q(_event_time__year__lte = intk,_event_time__year__gte = intk),
                    )
                except BaseException as e:

                    print("myerror:",e)
                    continue
                restmp = res
                try:
                    if res == None:
                        res = tmp
                    else:
                        if tmp.count() > 0:
                            if res.count()> 0:
                                res = (res | tmp).distinct()
                            else:
                                res = tmp
                except BaseException as e:
                    res = restmp
                    print(e)
             
        if res is None:
            return current.filter(_verified=True)
        return res.filter(_verified=True)

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
        #indexs keys, cats, years, domains
        print(data)
        keys = data['keys']
        cats = data['cats']
        years = data['years']
        domains = data['domains']
        types = data['types']
        subcats = set(data['subcat'] + [0])
        sortby = data['sortby']
        # print(data)
        try:
            if sortby != '':
                tmp = Document.objects.order_by(sortby)
            else:
                tmp = Document.objects.all() 
        except BaseException:
            tmp = Document.objects.all() 

        if len(domains) != 0:
            tmp = tmp.filter(_domain__in  = domains)
        if len(subcats) != 0:
            tmp = tmp.filter(_sub_cat__in  = subcats)
        if len(cats) != 0:
            tmp = tmp.filter(_category__in  = cats)
        if len(years) != 0:
            tmp = tmp.filter(_year__in  = years)
        
        if len(types) != 0:
            tmp = tmp.filter(_type__in  = types)
        
        print(tmp)
        #keys
        current = tmp
        
        
        #keys
        res = None
        if len(keys) > 0:
            for k in keys:
                try:
                    intk = int(k)
                    if intk > 4610:
                        intk = 1
                    print(intk)
                except BaseException:
                    intk = 1
                try:
                    tmp = current.filter(
                        Q(_user__user__username__iexact = k)|
                        Q(_event_time__year__lte = intk,_event_time__year__gte = intk),
                    )
                except BaseException as e:

                    print("myerror:",e)
                    continue
                restmp = res
                try:
                    if res == None:
                        res = tmp
                    else:
                        if tmp.count() > 0:
                            if res.count()> 0:
                                res = (res | tmp).distinct()
                            else:
                                res = tmp
                except BaseException as e:
                    res = restmp
                    print(e)
        print(current, res)
        if res is None:
            return User.objects.filter(id__in = [i['_user__user__id'] for i in current.filter(_verified=True).only('_user__user__id').values('_user__user__id').distinct()])
        return User.objects.filter(id__in = [i['_user__user__id'] for i in res.filter(_verified=True).only('_user__user__id').values('_user__user__id').distinct()])


class CurrentStudentList(generics.ListAPIView):
    serializer_class = DocumentSerializer
    def get_queryset(self):
        
        print(self.request.GET)
        return Document.objects.all()