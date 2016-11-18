#!/bin/bash
# Based on https://github.com/knomedia/ember-cli-rails/blob/master/build.sh
# and https://blog.abuiles.com/blog/2014/05/21/deploying-ember-cli-and-rails-to-heroku/

printMessage () {
  color=$(tput setaf $1)
  message=$2
  reset=$(tput sgr0)
  echo "${color}${message}${reset}"
}

boldMessage () {
  color=$(tput setaf $1)
  message=$2
  reset=$(tput sgr0)
  echo "${color}*************************************${reset}"
  echo "${color}${message}${reset}"
  echo "${color}*************************************${reset}"
}

#echo -e "${color}Building Ember app${reset}"
boldMessage 4 "Building Ember app"

cd Ember
ember build --environment production
cd ../

rm -rf Rails/public/assets

printMessage 4 "Copying ember build files to rails"
cp -r Ember/dist/ Rails/public/

printMessage 4 "Pushing to Heroku"
# as per http://stackoverflow.com/a/20555895
cd Rails

git init
git add .
git commit -m "deploying"
# Travis Only
git remote add heroku git@heroku.com:radetailing.git
heroku keys:clear
yes | heroku keys:add
git push heroku master -f
# uncomment this locally
# git push --set-upstream https://git.heroku.com/radetailing.git master -f
rm -fr .git

printMessage 4 "Cleaning"
cd ..
rm Rails/public/crossdomain.xml
rm -rf Rails/public/assets/
rm -rf Rails/public/fonts/
rm Rails/public/index.html

boldMessage 4 "Done"
