#!/usr/bin/env bash

rm -rf /var/node
cd /var || return

echo "Configuring firewall."
sudo iptables -I INPUT -p tcp --dport 8000 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 4000 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 3000 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT

sudo ufw allow 8000
sudo ufw allow 4000
sudo ufw allow 3000
sudo ufw allow 80

echo "A. Cloning from Github Source."
sudo git clone https://github.com/ccarner/COMP90082-RS-2021.git
sudo mv COMP90082-RS-2021 node
cd node
sudo git checkout backend/develop


echo "B. Installing dependencies."
sudo apt update && sudo apt -y install npm && sudo apt -y install python3
npm install --global yarn

echo "C. Installing admin API."
cd ServerAdminAPI
sudo chmod +x install.sh
sudo sh install.sh

echo "D. Installing backend service."
cd ../backend
sudo chmod +x install.sh
sudo sh install.sh

echo "E. Installing frontend service."
cd ../Front_end
sudo chmod +x install.sh
sudo sh install.sh

echo "Done!"
sudo systemctl status rsadmin
sudo systemctl status rsrepo