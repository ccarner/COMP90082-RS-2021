#!/usr/bin/env bash
set -e
rm -rf /var/node
cd /var || return

echo "Configuring firewall."
sudo iptables -I INPUT -p tcp --dport 8000 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 4000 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 3000 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT
echo "#\!/bin/bash\niptables-restore < /etc/iptables.rules" > /etc/network/if-pre-up.d/iptables
iptables-save | sudo tee -a /etc/iptables.rules >> /dev/null
chmod  +x /etc/network/if-pre-up.d/iptables

sudo ufw enable
sudo ufw allow 8000
sudo ufw allow 4000
sudo ufw allow 3000
sudo ufw allow 80

printf "\n\n\n"
echo "A. Cloning from Github Source."
sudo git clone https://github.com/ccarner/COMP90082-RS-2021.git
sudo mv COMP90082-RS-2021 node
cd node|| exit
sudo git checkout backend/develop


printf "\n\n\n"
echo "B. Installing dependencies."
sudo apt update && sudo apt -y install npm && sudo apt -y install python3
npm install --global yarn

printf "\n\n\n"
echo "C. Installing admin API."
cd ServerAdminAPI|| exit
sudo chmod +x install.sh
sudo sh install.sh

printf "\n\n\n"
echo "D. Installing backend service."
cd ../backend|| exit
sudo chmod +x install.sh
sudo sh install.sh

printf "\n\n\n"
echo "E. Installing frontend service."
cd ../Front_end|| exit
sudo chmod +x install.sh
sudo sh install.sh

echo "All Done!"
sudo systemctl status rsadmin | cat
printf "\n\n\n"
sudo systemctl status rsrepo | cat
printf "\n\n\n"
sudo systemctl status nginx | cat