#!/usr/bin/env bash
set -e
echo "1. Install dependencies."
sudo apt -y install python3
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py
python3 -m pip install Django

echo "2. Install systemd service"
sudo cp ../rsadmin.service /lib/systemd/system
sudo systemctl daemon-reload
sudo systemctl enable rsadmin
sudo systemctl start rsadmin

