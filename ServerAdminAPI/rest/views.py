from django.shortcuts import render
from django.http import HttpResponse
import os, subprocess, time

def restart(request):
    os.system("systemctl restart rsrepo")
    result = b"Restart succeeded.\n\n" + info(request).content
    return HttpResponse(result, content_type="text/plain; charset=utf-8")

def info(request):
    batcmd="systemctl status rsrepo"
    result = subprocess.check_output(batcmd, shell=True)
    return HttpResponse(result, content_type="text/plain; charset=utf-8")

def rebuild(request):
    batcmd="cd /var/node/backend && git pull"
    result = subprocess.check_output(batcmd, shell=True)

    if b'Already up to date.\n' not in result:
        result = b"Rebuild succeeded.\n\n" + result + b"\n\n" +restart(request).content
    else:
        result = result + b"\n\n" + info(request).content
    return HttpResponse(result, content_type="text/plain; charset=utf-8")


