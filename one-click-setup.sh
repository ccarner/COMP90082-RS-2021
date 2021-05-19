#!/usr/bin/env bash
set -e
rm -rf /var/node
cd /var || return

echo "Configuring firewall."
iptables -I INPUT -p tcp --dport 8000 -j ACCEPT
iptables -I INPUT -p tcp --dport 4000 -j ACCEPT
iptables -I INPUT -p tcp --dport 80 -j ACCEPT
iptables -I INPUT -p tcp --dport 27017 -j ACCEPT

mkdir -p /etc/network/if-pre-up.d
echo "#\!/bin/bash\niptables-restore < /etc/iptables.rules" > /etc/network/if-pre-up.d/iptables
iptables-save | sudo tee -a /etc/iptables.rules >> /dev/null
chmod  +x /etc/network/if-pre-up.d/iptables

ufw enable
ufw allow 8000
ufw allow 4000
ufw allow 80
ufw allow 27017

ulimit -n 64000 && ulimit -u 64000

printf "\n\n\n"
echo "A. Cloning from Github Source."
git clone https://github.com/ccarner/COMP90082-RS-2021.git
mv COMP90082-RS-2021 node
cd node|| exit
git checkout backend/develop


printf "\n\n\n"
echo "B. Installing dependencies."
apt update && apt -y install npm && apt -y install python3
npm install --global yarn

printf "\n\n\n"
echo "C. Installing admin API."
cd ServerAdminAPI|| exit
chmod +x install.sh
sh install.sh

printf "\n\n\n"
echo "D. Installing backend service."
cd ../backend|| exit
chmod +x install.sh
sh install.sh

printf "\n\n\n"
echo "E. Installing frontend service."
cd ../Front_end|| exit
chmod +x install.sh
sh install.sh

printf "\n\n\n"
echo "All Done!"
systemctl status rsadmin | cat
printf "\n\n"
systemctl status rsrepo | cat
printf "\n\n"
systemctl status nginx | cat