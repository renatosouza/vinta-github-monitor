from requests import request, ConnectionError
from .exceptions import RepositoryDoesNotExistException
from datetime import datetime, timedelta


class GitHubClient:
    base_url = "https://api.github.com"
    default_headers = {
        "accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    default_timeout = 100

    def get_commits(self, owner, repo, headers={}):
        one_month_ago = self.get_one_month_ago()
        path = f"/repos/{owner}/{repo}/commits?since={one_month_ago}"
        try:
            response = request(
                "get",
                self.get_url(path),
                headers=self.get_headers(headers),
                timeout=self.default_timeout,
            )
            if response.status_code == 404:
                raise RepositoryDoesNotExistException(
                    "The repository does not exist!"
                )
            response.raise_for_status()
            return response.json()
        except ConnectionError or TimeoutError as error:
            raise error

    def get_url(self, path):
        return self.base_url + path

    def get_headers(self, headers):
        return {**self.default_headers, **headers}

    def get_one_month_ago(self):
        today = datetime.now()
        one_month_ago = today - timedelta(days=30)
        return one_month_ago.strftime("%Y-%m-%dT%H:%M:%SZ")
