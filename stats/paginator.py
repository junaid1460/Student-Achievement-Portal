from rest_framework.pagination import PageNumberPagination


class StatsPaginator(PageNumberPagination):
    page_size = 15
    max_limit = 10