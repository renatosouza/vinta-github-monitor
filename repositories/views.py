from django_filters import rest_framework as filters
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer
from .filters import CommitFilter


class CommitListView(generics.ListAPIView):
    serializer_class = CommitSerializer
    queryset = Commit.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = None
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CommitFilter


class RepositoryCreateView(generics.ListCreateAPIView):
    serializer_class = RepositorySerializer
    queryset = Repository.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = None
