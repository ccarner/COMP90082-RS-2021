#!/usr/bin/env bash

echo "1. Install yarn pkg manager."
sudo apt update && sudo apt -y install npm
npm install --global yarn

echo "2. Install yarn dependencies."
yarn install

echo "3. Install systemd service"
sudo cp ../rsfront.service /lib/systemd/system
sudo systemctl daemon-reload
sudo systemctl start rsfront

echo "Done!"
