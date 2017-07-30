from django.conf.urls import url
from .views import DocumentListView,delete
urlpatterns = [
  url(r'^docs$', DocumentListView.as_view()),
  url(r'^docs/delete$', delete)
]