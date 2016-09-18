clear
echo "Deploying..."
git pull
gulp clean
gulp build
rm -rf /var/www/caches/**
/usr/local/apache2/bin/apachectl -k restart
echo "Deployed."