cd /home/ubuntu
echo "aaplication stopppp"
echo " before process stop server cloud ui 1"
pm2 stop server
pm2 stop cloud-ui
echo "after process stop server cloud ui 1"
pm2 list
sudo apt remove unattended-upgrades
sudo rm -f /var/lib/dpkg/lock-frontend
sudo rm  -f /var/lib/dpkg/lock
sudo rm -f /var/lib/apt/lists/lock
sudo rm  -f /var/cache/apt/archives/lock
sudo killall lock-front
echo "Before delete residual files 1"
sudo rm -rf  clientside code_deployment_scripts config controllers models services test ip.txt ip2.txt data.txt .env .git .circleci .gitignore README.md appspec.yml package-lock.json package.json route.js server.js
echo "after delete residual files 1"
echo " before process stop server cloud ui 2"
pm2 stop server
pm2 stop cloud-ui
echo " after process stop server cloud ui 2"
sudo apt remove unattended-upgrades
sudo rm -f /var/lib/dpkg/lock-frontend
sudo rm  -f /var/lib/dpkg/lock
sudo rm -f /var/lib/apt/lists/lock
sudo rm  -f /var/cache/apt/archives/lock
sudo killall lock-front
