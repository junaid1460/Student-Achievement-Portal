from achievement_portal.views import new_user
# this function creates two user for development use
def init():
    # this function must be called within a exception handler
    print('creating student')
    new_user('junaid1460', 'junaid1460@gmail.com', 'junaid1460')
    print('creating faculty')
    new_user('junaid14600', 'junaid1460@gmail.com', 'junaid14600', faculty = True)

