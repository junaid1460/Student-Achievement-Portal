# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-07-26 19:19
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0004_auto_20170726_1918'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserType',
            new_name='Type',
        ),
    ]
