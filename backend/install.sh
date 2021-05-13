#!/usr/bin/env bash
set -e
echo "1. Install npm pkg manager."
sudo apt update && sudo apt -y install npm

echo "2. Install npm dependencies."
sudo npm install

echo "3. Install systemd service"
sudo cp ../rsrepo.service /lib/systemd/system
sudo systemctl daemon-reload
sudo systemctl start rsrepo

echo "Done!"
