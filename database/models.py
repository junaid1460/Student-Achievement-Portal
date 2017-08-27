from django.db import models

from django.contrib.auth.models import User

class Extended(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)
    def __str__(self):
        return str(self.user)

doc_type_choce = (
    (1,'Participation'),
    (2,'Achievement')
)

doc_year_choice = (
    (1,'1st year'),
    (2,'2nd year'),
    (3,'3rd year'),
    (4,'4th year')
)

doc_domain_choice = (
    (1, 'Department'),
    (2, 'Institution'),
    (3, 'National'),
    (4, 'International')
)

doc_category_choice = (
    (0, 'Other'),
    (1, 'Academic'),
    (2, 'Technical'),
    (3, 'Cultural'),
    (4, 'Sport')
)

doc_sub_cat_choice = (
    #Techical
    (1, 'Work shops'),
    (2, 'Conferences'),
    (3, 'Projects'),
    (4, 'Competitions'),
    (9, 'Other'),
    #Academic
    (5, 'Addon courses'),
    (6, 'Audit courses'),
    (7, 'Interships'),
    (8, 'Skill development programs'),
    #other
    
    (0, 'Other')
)
class Document(models.Model):
    _event_time = models.DateTimeField() #year at which achievement earned
    _user = models.ForeignKey(Extended) #belongs to which user?
    _file = models.FileField() # document
    _title = models.CharField(max_length = 1000, default = '') #title of achievement
    _year = models.IntegerField(choices=doc_year_choice) #academic year ()
    _place = models.CharField(max_length = 400, default="") #place if needed
    _created_at = models.DateTimeField(auto_now_add=True) #automatic created date field
    _verified = models.BooleanField(default= False) # whether verified or not

    _domain = models.IntegerField(choices=doc_domain_choice) #national, international, local etc.
    _category = models.IntegerField(choices=doc_category_choice) #academic, cultural or sport
    _sub_cat = models.IntegerField(choices=doc_sub_cat_choice) #sub category
    # _avail_for_verification = models.BooleanField(default= False) #whether sent for verification or not
    _has_error = models.BooleanField(default = False)
    _error_message = models.CharField(max_length = 2000, default="")
    _type = models.IntegerField(choices=doc_type_choce)
    def __str__(self):
        return self._title




class VerifiedDoc(models.Model):
    _verified_by = models.ForeignKey(Extended)
    _document = models.OneToOneField(Document)
    _created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return str(Extended.objects.get(id = self._verified_by))

 