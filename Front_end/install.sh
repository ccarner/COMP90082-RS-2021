#!/usr/bin/env bash

echo "1. Install yarn pkg manager."
sudo apt update && sudo apt -y install npm
npm install --global yarn

echo "2. Install yarn dependencies & build frontend from source"
yarn install
yarn build

echo "3. Install nginx."
sudo apt install nginx
sudo cp nginx_front.conf /etc/nginx/sites-enabled
mkdir --parents /var/www/front/public
sudo cp ../build /var/www/front/public
sudo chmod -R +r /var/www/front/public
sudo systemctl restart nginx

echo "4. Install systemd service"
sudo cp ../rsfront.service /lib/systemd/system
sudo systemctl daemon-reload
sudo systemctl start rsfront

echo "Done!"
