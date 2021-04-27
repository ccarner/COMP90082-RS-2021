#!/usr/bin/env bash

echo "1. Install yarn pkg manager."
sudo apt update && sudo apt -y install npm
npm install --global yarn

echo "2. Install backend"
yarn install

echo "3. Install systemd service"
sudo cp ../rsrepo.service /lib/systemd/system
sudo systemctl daemon-reload
sudo systemctl start rsrepo

echo "Done!"