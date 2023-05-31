from django_filters import rest_framework as filters
from requests import HTTPError
from rest_framework import generics, viewsets, status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .exceptions import RepositoryDoesNotExistException
from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer
from .filters import CommitFilter
from .pagination import CustomPagination
from .tasks import fetch_data_from_github
from .utils import GitHubData


class CommitListView(generics.ListAPIView):
    serializer_class = CommitSerializer
    queryset = Commit.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CommitFilter


class RepositoryViewSet(viewsets.ModelViewSet):
    serializer_class = RepositorySerializer
    queryset = Repository.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = None
    lookup_field = 'name'

    def create(self, request):
        user = request.user
        social = user.social_auth.get(provider="github")
        token = social.extra_data["access_token"]
        repo_name = request.data.get('name')
        try:
            GitHubData(token, user.username, repo_name).check_repo_github()
        except HTTPError:
            raise serializers.ValidationError(
                "The repository doesn't exist!"
            )
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        fetch_data_from_github.delay(token, user.username, repo_name)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
