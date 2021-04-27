#!/usr/bin/env bash

sudo rm -rf /var/node
mkdir /var/node
cd /var/node || return

echo "A. Cloning from Github Source"
git clone git@github.com:ccarner/COMP90082-RS-2021.git


echo "B. Installing dependencies."
sudo apt update && sudo apt -y install npm && sudo apt -y install python3
npm install --global yarn

echo "C. Installing admin API."
sh ServerAdminAPI/install.sh

echo "D. Installing backend service."
sh backend/install.sh

#echo "E. Installing frontend service."
#sh Front_end/install.sh

echo "Done!"
sudo systemctl status rsadmin
sudo systemctl status rsrepo
#sudo systemctl status rsfront