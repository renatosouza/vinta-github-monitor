from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Commit, Repository


class RepositorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        validators=[UniqueValidator(
            queryset=Repository.objects.all(),
            message='A repository with this name already exists!'
        )]
    )

    class Meta:
        model = Repository
        fields = ("name",)


class CommitSerializer(serializers.ModelSerializer):
    repository = serializers.StringRelatedField(many=False)

    class Meta:
        model = Commit
        fields = (
            "message",
            "sha",
            "author",
            "url",
            "avatar",
            "date",
            "repository",
        )
