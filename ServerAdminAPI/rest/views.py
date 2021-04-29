from django.shortcuts import render
from django.http import HttpResponse
import os, subprocess, time

def restart(request):
    os.system("systemctl restart rsrepo")
    result = b"Restart succeeded.\n\n" + info(request).content
    return HttpResponse(result, content_type="text/plain; charset=utf-8")

def info(request):
    bash = "systemctl status rsrepo --lines=100"
    result = subprocess.check_output(bash, shell=True)
    return HttpResponse(result, content_type="text/plain; charset=utf-8")

def check(request):
    bash = "systemctl show rsrepo.service | grep ActiveState"
    result = subprocess.check_output(bash, shell=True)
    if result == b'ActiveState=active\n':
        return HttpResponse(1, content_type="text/plain; charset=utf-8")
    else:
        return HttpResponse(0, content_type="text/plain; charset=utf-8")

def rebuild(request):
    bash = "cd /var/node/backend && git pull --no-edit --quiet"
    result = subprocess.check_output(bash, shell=True)

    if b'Already up to date.\n' not in result:
        result = b"Rebuild succeeded.\n\n" + result + b"\n\n" +restart(request).content
    else:
        result = result + b"\n\n" + info(request).content
    return HttpResponse(result, content_type="text/plain; charset=utf-8")


