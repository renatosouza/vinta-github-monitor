# Generated by Django 4.2.1 on 2023-05-31 15:09

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("repositories", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="repository",
            name="name",
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
