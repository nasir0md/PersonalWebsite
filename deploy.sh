# Checks if comand line argument $1 exists.
# -z is the if statment option for this.
if [ -z "$1" ]
then
        echo "Missing commit message command line argument"
        exit 1
fi

npm run build

commitMsg=$1

git add -A
git commit -m "${commitMsg}"
git push origin master

ssh -i PersonalWebsiteKey.pem ec2-user@35.160.192.213 "cd andrew-website && git fetch origin master && git reset --hard origin/master && rm -rf /var/www/html/* && mv dist/* /var/www/html/ && exit"
