#!/usr/bin/env bash
set -e
echo "1. Install yarn pkg manager."
sudo apt update && sudo apt -y install npm
sudo npm install --global yarn

echo "2. Enable Swap"
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo "/swapfile swap swap defaults 0 0" | sudo tee -a /etc/fstab >> /dev/null

echo "3. Install yarn dependencies & build frontend from source"
sudo yarn install
sudo yarn build

echo "4. Install nginx."
sudo apt install -y nginx
sudo rm -rf /etc/nginx/sites-enabled/default
sudo cp default /etc/nginx/sites-enabled
sudo rm -rf /etc/nginx/sites-enabled/default
sudo mkdir --parents /var/www/front/public
sudo cp -r build/* /var/www/front/public
sudo chmod -R +r /var/www/front/public
sudo systemctl restart nginx

echo "Done!"
