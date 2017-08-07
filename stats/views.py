from django.shortcuts import render
import defaults as d
# Create your views here.

def stats_view(req):
    return render(req, d.stats_template, {})