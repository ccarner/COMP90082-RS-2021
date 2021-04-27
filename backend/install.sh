#!/usr/bin/env bash

echo "1. Install npm pkg manager."
sudo apt update && sudo apt -y install npm

echo "2. Install npm dependencies."
npm install

echo "3. Install systemd service"
sudo cp ../rsfront.service /lib/systemd/system
sudo systemctl daemon-reload
sudo systemctl start rsfront

echo "Done!"