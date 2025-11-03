@echo off
echo Installing Heroku CLI...
npm install -g heroku

echo Logging into Heroku...
heroku login

echo Creating Heroku app...
heroku create your-restaurant-menu-app

echo Setting up MongoDB...
heroku addons:create mongolab:sandbox

echo Deploying to Heroku...
git add .
git commit -m "Add deployment config"
git push heroku main

echo Opening app...
heroku open