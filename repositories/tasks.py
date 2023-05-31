# from githubmonitor.celery import app
# Uncomment and create your tasks here.
from celery import shared_task
from .utils import GitHubData
from .models import Repository, Commit


@shared_task
def fetch_data_from_github(token, owner, repo_name):
    data_from_github = GitHubData(token, owner, repo_name).get_data_github()
    repository = Repository.objects.get(name=repo_name)
    github_data_for_model = []

    for commit in data_from_github:
        commit.update({"repository": repository})
        github_data_for_model.append(Commit(**commit))

    Commit.objects.bulk_create(github_data_for_model)
