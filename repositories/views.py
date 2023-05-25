from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer


class CommitListView(generics.ListAPIView):
    serializer_class = CommitSerializer
    queryset = Commit.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = None


class RepositoryCreateView(generics.CreateAPIView):
    serializer_class = RepositorySerializer
    queryset = Repository.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = None
