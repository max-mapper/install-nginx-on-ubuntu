sudo -s
apt-get install -y software-properties-common python-software-properties
add-apt-repository -y ppa:nginx/stable
apt-get update
apt-get install -y nginx
initctl start nginx
