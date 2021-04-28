#!/usr/bin/env bash

rm -rf /var/node
mkdir /var/node
cd /var/node || return

echo "Configuring firewall."
sudo iptables -I INPUT -p tcp --dport 8000 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 4000 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 3000 -j ACCEPT

sudo ufw allow 8000
sudo ufw allow 4000
sudo ufw allow 3000

echo "A. Cloning from Github Source."
git clone git@github.com:ccarner/COMP90082-RS-2021.git


echo "B. Installing dependencies."
sudo apt update && sudo apt -y install npm && sudo apt -y install python3
npm install --global yarn

echo "C. Installing admin API."
sudo sh ServerAdminAPI/install.sh

echo "D. Installing backend service."
sudo sh backend/install.sh

#echo "E. Installing frontend service."
#sudo sh Front_end/install.sh

echo "Done!"
sudo systemctl status rsadmin
sudo systemctl status rsrepo
#sudo systemctl status rsfront
