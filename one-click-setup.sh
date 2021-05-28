#!/usr/bin/env bash
set -e

ORIGIN=$"https://api.cervidae.com.au"
ORIGIN_DOMAIN=$"api.cervidae.com.au"
ENDPOINT=$(curl -s ipinfo.io/ip)

GIT=${GIT:-https://github.com/ccarner/COMP90082-RS-2021.git}
CERT=${CERT:-false}
DOMAIN=${DOMAIN:-$ENDPOINT}

if [ $CERT = true ]; then
  BASE=$"https://"
else
  BASE=$"http://"
fi

if [ -t 1 ]; then
  RED=$(printf '\033[31m')
  GREEN=$(printf '\033[32m')
  YELLOW=$(printf '\033[33m')
  BLUE=$(printf '\033[34m')
  BOLD=$(printf '\033[1m')
  DIM=$(printf '\033[2m')
  RESET=$(printf '\033[m')
fi

printf "%s%sWelcome to RS REPO installer, starting in 5 seconds...%s\n" $GREEN $BOLD $RESET
printf "%s%s%sCourtesy of Aaron Du and the RS2021 team ;)%s\n" $BLUE $DIM $BOLD $RESET
printf "%s%sENDPOINT: $ENDPOINT%s\n" $YELLOW $BOLD $RESET
printf "%s%sDOMAIN: $DOMAIN%s\n" $YELLOW $BOLD $RESET
printf "%s%sSSL: $CERT%s\n" $YELLOW $BOLD $RESET
sleep 5

printf "\n\n"
printf "%s%sA. Configure firewall%s\n" $RED $BOLD $RESET
iptables -I INPUT -p tcp --dport 8000 -j ACCEPT
iptables -I INPUT -p tcp --dport 4000 -j ACCEPT
iptables -I INPUT -p tcp --dport 80 -j ACCEPT
iptables -I INPUT -p tcp --dport 443 -j ACCEPT
iptables -I INPUT -p tcp --dport 27017 -j ACCEPT
mkdir -p /etc/network/if-pre-up.d
echo "#\!/bin/bash\niptables-restore < /etc/iptables.rules" > /etc/network/if-pre-up.d/iptables
iptables-save | sudo tee -a /etc/iptables.rules >> /dev/null
chmod  +x /etc/network/if-pre-up.d/iptables
ufw allow 8000
ufw allow 4000
ufw allow 80
ufw allow 27017
ufw allow 443

printf "\n\n"
printf "%s%sB. Clone from Github%s\n" $RED $BOLD $RESET
rm -rf /var/node
cd /var || return
git clone -c core.eol=lf -c core.autocrlf=false \
  -c fsck.zeroPaddedFilemode=ignore \
  -c fetch.fsck.zeroPaddedFilemode=ignore \
  -c receive.fsck.zeroPaddedFilemode=ignore \
  --depth=1 "$GIT" || {
  fmt_error "git clone of repo failed"
  exit 1
}
mv COMP90082-RS-2021 node
cd node|| exit

printf "\n\n"
printf "%s%sC. Install dependencies%s\n" $RED $BOLD $RESET
apt update && apt -y install npm && apt -y install python3
npm install --global yarn
sudo apt install snapd
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

if [ "$CERT" = true ]; then
  sudo certbot certonly --nginx
fi

sudo apt-get install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod


printf "\n\n"
printf "%s%sD. Install CI/CD Admin API%s\n" $RED $BOLD $RESET
cd ServerAdminAPI|| exit
chmod +x install.sh
sh install.sh


printf "\n\n"
printf "%s%sE. Install Backend service%s\n" $RED $BOLD $RESET
cd ../backend|| exit
chmod +x install.sh
sh install.sh


printf "\n\n"
printf "%s%sF. Install Frontend service%s\n" $RED $BOLD $RESET
cd ../Front_end|| exit
chmod +x install.sh
sh install.sh "$CERT"


printf "\n\n"
printf "%s%sAll Done! Enjoy%s\n" $GREEN $BOLD $RESET
printf "\n"
systemctl status rsadmin | cat
printf "\n\n"
systemctl status rsrepo | cat
printf "\n\n"
systemctl status nginx | cat
printf "\n\n"