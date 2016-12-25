clear
echo "------------"
echo "Deploying..."
echo "------------"
git pull
gulp build
rm -rf /var/www/caches/**
chown -R apache:apache ./dist
chown -R apache:apache ./caches
/usr/local/apache2/bin/apachectl -k restart
echo "---------"
echo "Deployed."
echo "---------"