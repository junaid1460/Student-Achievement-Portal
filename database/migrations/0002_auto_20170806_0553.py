# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-08-06 05:53
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='document',
            old_name='_scope',
            new_name='_category',
        ),
        migrations.RenameField(
            model_name='document',
            old_name='_type',
            new_name='_domain',
        ),
    ]
