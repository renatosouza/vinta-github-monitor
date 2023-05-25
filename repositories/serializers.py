from rest_framework import serializers
from django.utils.functional import cached_property

from .models import Commit, Repository
from .utils import GitHubData
from requests import exceptions


class RepositorySerializer(serializers.ModelSerializer):

    @cached_property
    def _data_from_github(self):
        repo_name = self.initial_data['name']
        user = self.context['request'].user
        social = user.social_auth.get(provider='github')
        token = social.extra_data['access_token']
        return GitHubData(token, user, repo_name).get_data_github()

    def create(self, validated_data):
        repository_instance = Repository.objects.create(**validated_data)
        github_data_for_model = []
        for commit in self._data_from_github:
            commit.update({'repository': repository_instance})
            github_data_for_model.append(Commit(**commit))

        Commit.objects.bulk_create(github_data_for_model)
        return repository_instance

    def validate_name(self, name):
        try:
            self._data_from_github
            return name
        except exceptions.HTTPError as error:
            raise serializers.ValidationError('Repository does not exist!')
    class Meta:
        model = Repository
        fields = ('name',)


class CommitSerializer(serializers.ModelSerializer):
    repository = serializers.StringRelatedField(many=False)

    class Meta:
        model = Commit
        fields = (
            'message',
            'sha',
            'author',
            'url',
            'avatar',
            'date',
            'repository',
        )
