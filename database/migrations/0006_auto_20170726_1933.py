# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-07-26 19:33
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('database', '0005_auto_20170726_1919'),
    ]

    operations = [
        migrations.CreateModel(
            name='Extended',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_student', models.CharField(max_length=100)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='type',
            name='user',
        ),
        migrations.DeleteModel(
            name='Type',
        ),
    ]
