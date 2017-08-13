from django.shortcuts import render
import defaults as d
from rest_framework  import views, generics
from student.serializers import DocumentSerializer, Document
from rest_framework.filters import SearchFilter, OrderingFilter
from .paginator import StatsPaginator
from django.db.models import Q
import json
from django.http import JsonResponse
from .serializers import DocStatsSerializer
# Create your views here.

def stats_view(req):
    return render(req, d.stats_template, {})


                    

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
        # return Document.objects.all()
        result = None
       
            
        #cats
        current = Document.objects.all()
        res = None
        if len(domains) > 0:
            res = None
            for i in domains:
                tmp = current.filter(Q(_domain = i))
                if res == None:
                    res = tmp
                else:
                    if tmp.count() > 0 and  res.count()> 0:
                        res = (res | tmp).distinct()
                    elif res.count() == 0:
                        res = tmp
        if res != None:
            current = res
        #domain
        res = None
        if len(cats) > 0:
            res = None
            for i in cats:
                tmp = current.filter(Q(_category = i))
                if res == None:
                    res = tmp
                else:
                    if tmp.count() > 0 and  res.count()> 0:
                        res = (res | tmp).distinct()
                    elif res.count() == 0:
                        res = tmp
        if res != None:
            current = res
        #year
        res = None
        if len(years) > 0:
            res = None
            for i in years:
                tmp = current.filter(Q(_year = i))
                if res == None:
                    res = tmp
                else:
                    if tmp.count() > 0 and  res.count()> 0:
                        res = (res | tmp).distinct()
                    elif res.count() == 0:
                        res = tmp
        if res != None:
            current = res
        
        #keys
        res = None
        if len(keys) > 0:
            for k in keys:
                try:
                    intk = int(k)
                    print(intk)
                except BaseException:
                    intk = 1
                tmp = current.filter(
                    Q(_user__user__username__iexact = k)|
                    Q(_event_time__year__lte = intk,_event_time__year__gte = intk),
                )
                if res == None:
                    res = tmp
                else:
                    if tmp.count() > 0:
                        if res.count()> 0:
                            res = (res | tmp).distinct()
                        else:
                            res = tmp
             
        if res is None:
            return current
        return res

        