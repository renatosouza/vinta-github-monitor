from rest_framework import serializers
from django.utils.functional import cached_property

from .models import Commit, Repository
from .tasks import fetch_data_from_github
from .shortcuts import wait_for_data_ready


class RepositorySerializer(serializers.ModelSerializer):

    @cached_property
    def _data_from_github(self):
        repo_name = self.initial_data['name']
        user = self.context['request'].user
        social = user.social_auth.get(provider='github')
        token = social.extra_data['access_token']
        async_result = fetch_data_from_github.delay(
            token, user.username, repo_name
        )
        try:
            return wait_for_data_ready(async_result)
        except TimeoutError:
            return {
                'data': None,
                'error': True,
                'field_error': False,
                'error_message': 'Could not finish task in time!'
            }

    def create(self, validated_data):
        Repository.objects.filter(name=validated_data['name']).delete()
        repository_instance = Repository.objects.create(**validated_data)
        results = self._data_from_github
        github_data_for_model = []
        for commit in results.get('data'):
            commit.update({'repository': repository_instance})
            github_data_for_model.append(Commit(**commit))

        Commit.objects.bulk_create(github_data_for_model)
        return repository_instance

    def validate_name(self, name):
        results = self._data_from_github
        if results.get('error') and results.get('field_error'):
            Repository.objects.filter(name=name).delete()
            raise serializers.ValidationError(results.get('error_message'))
        return name

    def validate(self, data):
        results = self._data_from_github
        if results.get('error') and not results.get('field_error'):
            raise serializers.ValidationError(results.get('error_message'))
        return data

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
