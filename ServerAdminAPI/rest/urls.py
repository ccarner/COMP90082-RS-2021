from django.urls import path

from . import views

urlpatterns = [
    path('restart', views.restart, name='restart'),
    path('info', views.info, name='info'),
    path('rebuild', views.rebuild, name='rebuild'),
    path('check', views.check, name='check'),
]
