#!/bin/bash
apt-get update
apt-get install -y cloud-utils apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
apt-get update
apt-get install -y docker-ce
usermod -aG docker ubuntu

# Install docker-compose
curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Run container
ec2_ip=$(curl https://checkip.amazonaws.com) 

echo "
version: '3.8'
services:
  web:
    image: claudeperrin228/healthhub:latest
    ports:
      - '3000:3000'
    command: sh -c 'echo NEXTAUTH_URL=http://${ec2_ip}:3000 >> .env && node server.js'
" >> ./docker-compose.yml

sudo docker compose -p "healthhub" pull; sudo docker compose -p "healthhub" up
