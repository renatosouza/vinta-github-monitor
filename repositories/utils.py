from .services import GitHubClient


class GitHubData:
    def __init__(self, token, owner, repo):
        self.token = token
        self.owner = owner
        self.repo = repo

    def get_data_github(self):
        github_client = GitHubClient()
        github_data = github_client.get_commits(
            self.owner, self.repo, self.get_token_header()
        )
        return self.format_data(github_data)

    def check_repo_github(self):
        github_client = GitHubClient()
        return github_client.get_repository(
            self.owner, self.repo, self.get_token_header()
        )

    def get_token_header(self):
        return {"Authorization": "Bearer " + self.token}

    def format_data(self, data):
        return [self.specific_data_from_commit(commit) for commit in data]

    def specific_data_from_commit(self, commit):
        return {
            "message": commit.get("commit").get("message"),
            "sha": commit.get("sha"),
            "author": commit.get("commit").get("author").get("name"),
            "url": commit.get("url"),
            "date": commit.get("commit").get("author").get("date"),
            "avatar": (
                commit.get("author").get("avatar_url")
                if commit.get("author", None) else ""
            ),
        }
