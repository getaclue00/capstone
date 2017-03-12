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

boldMessage 4 "Deploying Ember app to surge.sh"
cd dist
cp index.html 200.html
surge --domain http://radetailing.surge.sh/

cd ../../

boldMessage 4 "Cleaning Ember app build"
rm -rf Ember/dist

boldMessage 4 "Cleaning Rails assets"
rm -rf Rails/public/assets

# printMessage 4 "Copying ember build files to rails"
# cp -r Ember/dist/ Rails/public/

printMessage 4 "Pushing to Heroku"
# as per http://stackoverflow.com/a/20555895
cd Rails

# sed -i .bck 's/<\/head>/<%= csrf_meta_tags %>&/' public/index.html
# sed -i .bck 's/<body>/&<%= yield %>/' public/index.html
# mv public/index.html app/views/layouts/application.html.erb

git init
git add .
git commit -m "deploying"
git push --set-upstream https://git.heroku.com/radetailing.git master -f
rm -fr .git

printMessage 4 "Cleaning"
cd ..
rm Rails/public/crossdomain.xml
rm -rf Rails/public/assets/
rm -rf Rails/public/fonts/
rm -rf Rails/public/testem.js
rm -rf Rails/public/tests/
rm Rails/public/robots.txt
rm Rails/public/index.html

boldMessage 4 "Done"