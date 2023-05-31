from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from ..models import Repository, Commit


class EndpointsTests(APITestCase):
    def setUp(self):
        test_user = User.objects.create_user(
            username="renato", password="password"
        )
        test_user.save()
        self.client = APIClient()
        self.client.force_authenticate(user=test_user)

        # repositories
        repo1 = Repository.objects.create(name="repo1")
        repo2 = Repository.objects.create(name="repo2")
        repo3 = Repository.objects.create(name="repo3")

        # commits repo1
        Commit.objects.create(
            message="initial commit",
            sha="afgpakjf",
            author="renato",
            url="www.example1.com",
            date="2023-05-21T19:07:16Z",
            avatar="",
            repository=repo1,
        )
        Commit.objects.create(
            message="new commit",
            sha="afgsdgf",
            author="felipe",
            url="www.example2.com",
            date="2023-05-22T19:07:16Z",
            avatar="",
            repository=repo1,
        )
        Commit.objects.create(
            message="final commit",
            sha="af4984jf",
            author="felipe",
            url="www.example3.com",
            date="2023-05-23T19:07:16Z",
            avatar="",
            repository=repo1,
        )

        # commits repo2
        Commit.objects.create(
            message="brand new commit",
            sha="afgpakj78479",
            author="renato",
            url="www.example4.com",
            date="2023-05-21T19:07:16Z",
            avatar="",
            repository=repo2,
        )
        Commit.objects.create(
            message="super new commit",
            sha="afgsdgffs",
            author="renato",
            url="www.example5.com",
            date="2023-05-22T19:07:16Z",
            avatar="",
            repository=repo2,
        )
        Commit.objects.create(
            message="sad final commit",
            sha="af4984jfhsdg",
            author="renato",
            url="www.example6.com",
            date="2023-05-23T19:07:16Z",
            avatar="",
            repository=repo2,
        )

        # commits repo2
        Commit.objects.create(
            message="last new commit",
            sha="afgpakjfasg78479",
            author="felipe",
            url="www.example7.com",
            date="2023-05-21T19:07:16Z",
            avatar="",
            repository=repo3,
        )
        Commit.objects.create(
            message="second to last commit",
            sha="afgsdgffgsdgs",
            author="felipe",
            url="www.example8.com",
            date="2023-05-22T19:07:16Z",
            avatar="",
            repository=repo3,
        )
        Commit.objects.create(
            message="the last one",
            sha="af4984jfhsdg777",
            author="felipe",
            url="www.example9.com",
            date="2023-05-23T19:07:16Z",
            avatar="",
            repository=repo3,
        )

        pass

    def test_list_commits(self):
        response = self.client.get("/api/commits/", format="json")
        self.assertEqual(response.data.get("count"), 9)

    def test_list_commits_filtered_author(self):
        response1 = self.client.get(
            "/api/commits/?author=renato", format="json"
        )
        self.assertEqual(response1.data.get("count"), 4)
        response2 = self.client.get(
            "/api/commits/?author=felipe", format="json"
        )
        self.assertEqual(response2.data.get("count"), 5)

    def test_list_commits_filtered_repo(self):
        response1 = self.client.get(
            "/api/commits/?repository=repo1", format="json"
        )
        self.assertEqual(response1.data.get("count"), 3)
        response2 = self.client.get(
            "/api/commits/?repository=repo2", format="json"
        )
        self.assertEqual(response2.data.get("count"), 3)
        response3 = self.client.get(
            "/api/commits/?repository=repo3", format="json"
        )
        self.assertEqual(response3.data.get("count"), 3)

    def test_list_commits_filtered_author_and_repo(self):
        response1 = self.client.get(
            "/api/commits/?author=renato&repository=repo1", format="json"
        )
        self.assertEqual(response1.data.get("count"), 1)
        response2 = self.client.get(
            "/api/commits/?author=felipe&repository=repo1", format="json"
        )
        self.assertEqual(response2.data.get("count"), 2)
        response3 = self.client.get(
            "/api/commits/?author=renato&repository=repo2", format="json"
        )
        self.assertEqual(response3.data.get("count"), 3)
        response4 = self.client.get(
            "/api/commits/?author=felipe&repository=repo2", format="json"
        )
        self.assertEqual(response4.data.get("count"), 0)
        response5 = self.client.get(
            "/api/commits/?author=renato&repository=repo3", format="json"
        )
        self.assertEqual(response5.data.get("count"), 0)
        response6 = self.client.get(
            "/api/commits/?author=felipe&repository=repo3", format="json"
        )
        self.assertEqual(response6.data.get("count"), 3)

    def test_list_repos(self):
        response = self.client.get("/api/repositories/", format="json")
        self.assertEqual(len(response.data), 3)

    def test_create_repo(self):
        pass

    def test_repo_already_exists(self):
        pass
