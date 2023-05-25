from django.urls import path

from .views import CommitListView, RepositoryCreateView

app_name = 'repositories'

urlpatterns = [
    path('api/commits/', CommitListView.as_view(), name='commits-list'),
    path('api/repositories/', RepositoryCreateView.as_view(), name='repositories-create'),
]
