from django.conf.urls import url
from .views import StudentListView, StudentDocumentListView, verify
urlpatterns = [
  url(r'^studentlist$',StudentListView.as_view()),
  url(r'^docs/student$',StudentDocumentListView.as_view()),
  url(r'^docs/student/verify$',verify),

]