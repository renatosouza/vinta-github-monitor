from django.test import TestCase
from ..models import Repository
from ..serializers import RepositorySerializer


class SerializersTests(TestCase):
    def setUp(self):
        # repositories
        Repository.objects.create(name="repo1")
        Repository.objects.create(name="repo2")
        Repository.objects.create(name="repo3")

    def test_repo_same_name(self):
        serializer = RepositorySerializer(data={"name": "repo1"})
        self.assertFalse(serializer.is_valid())
