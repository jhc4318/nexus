# Generated by Django 3.2.6 on 2021-08-12 12:21

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('info', models.TextField()),
                ('published', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'ordering': ('-published',),
            },
        ),
    ]
