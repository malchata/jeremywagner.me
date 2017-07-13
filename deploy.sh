clear
echo "-------------------"
echo "Pulling from git..."
echo "-------------------"
git pull

echo ""
echo "----------------"
echo "Building site..."
echo "----------------"
npm run build

echo ""
echo "---------------------------"
echo "Clearing checksum caches..."
echo "---------------------------"
rm -rf /var/www/caches/**
chown -R apache:apache ./dist
chown -R apache:apache ./caches

echo ""
echo "---------------------------"
echo "Restarting Apache server..."
echo "---------------------------"
/usr/local/apache2/bin/apachectl -k restart

echo ""
echo "---------------------------"
echo "Restarting PHP FastCGI service..."
echo "---------------------------"
systemctl restart php-fpm

echo ""
echo "---------"
echo "Deployed!"
echo "---------"
