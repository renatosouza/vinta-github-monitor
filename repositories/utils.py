from .services import GitHubClient
from .exceptions import RepositoryDoesNotExistException
from requests.exceptions import HTTPError


class GitHubData:
    def __init__(self, token, owner, repo):
        self.token = token
        self.owner = owner
        self.repo = repo

    def get_data_github(self):
        try:
            github_client = GitHubClient()
            github_data = github_client.get_commits(
                self.owner, self.repo, self.get_token_header()
            )
            if not github_data:
                return self.add_error_info(
                    github_data,
                    True,
                    True,
                    (
                        "The repository doesn't have \
                        any commits in the last 30 days!"
                    ),
                )
            return self.add_error_info(self.filter_data(github_data))
        except RepositoryDoesNotExistException as error:
            return self.add_error_info(None, True, True, error.message)
        except HTTPError or ConnectionError or TimeoutError as error:
            return self.add_error_info(None, True, False, error.message)

    def add_error_info(
        self, data, error=False, field_error=False, error_message=None
    ):
        return {
            "data": data,
            "error": error,
            "field_error": field_error,
            "error_message": error_message,
        }

    def get_token_header(self):
        return {"Authorization": "Bearer " + self.token}

    def filter_data(self, data):
        return [self.specific_data_from_commit(commit) for commit in data]

    def specific_data_from_commit(self, commit):
        return {
            "message": commit.get("commit").get("message"),
            "sha": commit.get("sha"),
            "author": commit.get("commit").get("author").get("name"),
            "url": commit.get("url"),
            "date": commit.get("commit").get("author").get("date"),
            "avatar": commit.get("author").get("avatar_url") or "",
        }
