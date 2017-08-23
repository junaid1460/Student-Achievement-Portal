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
        subcats = data['subcat']
        # print(data)
        # return Document.objects.all()
        tmp  =None
        if len(domains) != 0:
            tmp = Document.objects.filter(_domain__in  = domains)
        if len(cats) != 0:
            if tmp is None:
                tmp = Document.objects.filter(_category__in  = cats)
            else:
                tmp = (tmp & Document.objects.filter(_category__in  = cats))
        if len(years) != 0:
            if tmp is None:
                tmp = Document.objects.filter(_year__in  = years)
            else:
                tmp = (tmp & Document.objects.filter(_year__in  = years))
        if len(subcats) != 0:
            if tmp is None:
                tmp = Document.objects.filter(_sub_cat__in  = subcats)
            else:
                tmp = (tmp & Document.objects.filter(_sub_cat__in  = subcats))
        if len(types) != 0:
            if tmp is None:
                tmp = Document.objects.filter(_type__in  = types)
            else:
                tmp = (tmp & Document.objects.filter(_type__in  = types))
        
        print(tmp)
        #keys
        if tmp is None:
            tmp = Document.objects.all()
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
        subcats = data['subcat']
        # print(data)
        # return Document.objects.all()
        tmp  =None
        if len(domains) != 0:
            tmp = Document.objects.filter(_domain__in  = domains)
        if len(cats) != 0:
            if tmp is None:
                tmp = Document.objects.filter(_category__in  = cats)
            else:
                tmp = (tmp & Document.objects.filter(_category__in  = cats))
        if len(years) != 0:
            if tmp is None:
                tmp = Document.objects.filter(_year__in  = years)
            else:
                tmp = (tmp & Document.objects.filter(_year__in  = years))
        if len(subcats) != 0:
            if tmp is None:
                tmp = Document.objects.filter(_sub_cat__in  = subcats)
            else:
                tmp = (tmp & Document.objects.filter(_sub_cat__in  = subcats))
        if len(types) != 0:
            if tmp is None:
                tmp = Document.objects.filter(_type__in  = types)
            else:
                tmp = (tmp & Document.objects.filter(_type__in  = types))
        
        print(tmp)
        #keys
        if tmp is None:
            tmp = Document.objects.all()
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
             
        if res is None:
            return User.objects.filter(id__in = current.filter(_verified=True).only('_user').distinct().values('_user'))
        return User.objects.filter(id__in = res.filter(_verified=True).only('_user').distinct().values('_user'))


class CurrentStudentList(generics.ListAPIView):
    serializer_class = DocumentSerializer
    def get_queryset(self):
        
        print(self.request.GET)
        return Document.objects.all()