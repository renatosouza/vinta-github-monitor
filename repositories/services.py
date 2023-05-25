from requests import request, ConnectionError


class GitHubClient:
    base_url = 'https://api.github.com'
    default_headers = {
        'accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
    }
    default_timeout = 100

    def get_commits(self, owner, repo, headers={}):
        path = f'/repos/{owner}/{repo}/commits'
        try:
            response = request(
                'get',
                self.get_url(path),
                headers=self.get_headers(headers),
                timeout=self.default_timeout
            )
            if not response.ok:
                response.raise_for_status()
            return response.json()
        except ConnectionError or TimeoutError as error:
            raise error

    def get_url(self, path):
        return self.base_url + path

    def get_headers(self, headers):
        return {**self.default_headers, **headers}
