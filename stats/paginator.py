from rest_framework.pagination import PageNumberPagination


class StatsPaginator(PageNumberPagination):
    page_size = 15