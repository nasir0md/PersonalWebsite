##Installing
- Create ec2 instance.
- `sudo yum update -y`
- `sudo yum install -y httpd24`
- `sudo service httpd start`
- `sudo yum install -y git`
- `git clone https://Mathologica@bitbucket.org/Mathologica/andrew-website.git`
- `sudo groupadd www`
- `sudo usermod -a -G www ec2-user`
- `exit`
- SSH back into the server.
- `sudo chown -R root:www /var/www`
- `sudo chmod 2775 /var/www`
- `find /var/www -type d -exec sudo chmod 2775 {} \;`
- `find /var/www -type f -exec sudo chmod 0664 {} \;`

##Deploying
- `sh deploy.sh`
