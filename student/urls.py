from django.conf.urls import url
from .views import DocumentListView
urlpatterns = [
  url(r'^docs', DocumentListView.as_view())
]