
echo "application start"
cd /home/ubuntu

sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/home/ubuntu/cloudwatch-config.json -s


cd /home/ubuntu

value=`cat ip2.txt`
echo "$value"
value2=`cat ip2.txt`
echo "$value2"
echo " npm install pm2 for server"
npm install pm2 -g -f

echo " starting server side "
pm2 start server.js 
cd clientside/cloud-ui
cd src/API
echo "passing ip"

cd ../
cd components/mybooks

echo "passing ip complete"
cd ../../../ 
npm install pm2 -g -f
echo " npm install pm2 for client"

echo " starting clientside...."
pm2 start node_modules/react-scripts/scripts/start.js --name "cloud-ui" 


cd /home/ubuntu

sudo pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
sudo systemctl daemon-reload
echo "restarting systemctl check 2"
sudo pm2 save 

