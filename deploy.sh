clear
echo "Deploying..."
git pull
gulp clean
gulp build
rm -rf /var/lib/php/session/**
/usr/local/apache2/bin/apachectl -k restart
clear
echo "Deployed."