from .services import GitHubClient


class GitHubData:

    def __init__(self, token, owner, repo):
        self.token = token
        self.owner = owner
        self.repo = repo

    def get_data_github(self):
        github_client = GitHubClient()
        github_data = github_client.get_commits(
            self.owner,
            self.repo,
            self.get_token_header()
        )
        return self.filter_data(github_data)

    def get_token_header(self):
        return {'Authorization' : 'Bearer ' + self.token}

    def filter_data(self, data):
        return [self.specific_data_from_commit(commit) for commit in data]

    def specific_data_from_commit(self, commit):
        return {
            'message': commit['commit']['message'],
            'sha': commit["sha"],
            'author': commit['commit']['author']['name'],
            'url': commit['url'],
            'date': commit['commit']['author']['date'],
            'avatar': commit['author']['avatar_url']
        }
