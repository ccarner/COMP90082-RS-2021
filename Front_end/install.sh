#!/usr/bin/env bash
set -e

CERT=$1

echo "1. Install yarn pkg manager."
sudo apt update && sudo apt -y install npm
sudo npm install --global yarn

echo "2. Install yarn dependencies & build frontend from source"
sudo yarn install
sudo yarn build

echo "3. Install nginx."
sudo apt install -y nginx
sudo rm -rf /etc/nginx/sites-enabled/default

if [ $CERT = true ]; then
  sudo cp default /etc/nginx/sites-enabled
else
  sudo cp default_ssl /etc/nginx/sites-enabled/
  sudo mv /etc/nginx/sites-enabled/default_ssl /etc/nginx/sites-enabled/default
fi

sudo mkdir --parents /var/www/front/public
sudo cp -r build/* /var/www/front/public
sudo chmod -R +r /var/www/front/public
sudo systemctl restart nginx

echo "Done!"
