ssh -i PersonalWebsiteKey.pem ec2-user@35.160.192.213 "cd andrew-website && git fetch origin master && git reset --hard origin/master && rm -rf /var/www/html/* && mv dist/* /var/www/html/ && exit"
