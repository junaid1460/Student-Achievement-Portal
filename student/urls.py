from django.conf.urls import url
from .views import DocumentListView,delete, DocumentSetView
urlpatterns = [
  # listing current user documents
  url(r'^docs$', DocumentListView.as_view()),
  # create view for upploading documents
  url(r'^docs/upload$', DocumentSetView.as_view()),
  # delete control
  url(r'^docs/delete$', delete)
]