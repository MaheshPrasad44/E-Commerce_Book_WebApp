echo "after install"
cd /
sudo chmod 757 data.txt
sudo cp data.txt /home/ubuntu
cd home
cd ubuntu
sudo chmod 757 ip.txt
sudo chmod 757 data.txt
cat data.txt ip.txt > .env
echo "node update"
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
echo "npm install for server"
npm install 
cd clientside/cloud-ui
pwd
echo "npm install for client side"
npm install 


