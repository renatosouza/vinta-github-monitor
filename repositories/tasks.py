# from githubmonitor.celery import app
# Uncomment and create your tasks here.
from celery import shared_task
from .utils import GitHubData


@shared_task
def fetch_data_from_github(token, owner, repo):
    return GitHubData(token, owner, repo).get_data_github()
