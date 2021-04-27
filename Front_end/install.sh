#!/usr/bin/env bash

echo "1. Install yarn pkg manager."
sudo apt update && sudo apt -y install npm
npm install --global yarn

echo "2. Install yarn dependencies."
yarn install

echo "Done!"