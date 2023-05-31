from django.urls import include, path
from rest_framework.routers import SimpleRouter

from .views import CommitListView, RepositoryViewSet

app_name = "repositories"


router = SimpleRouter()
router.register(r"repositories", RepositoryViewSet, "repository")

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/commits/", CommitListView.as_view(), name="commits-list"),
]
