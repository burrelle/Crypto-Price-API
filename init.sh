#!/bin/bash
cd adonis
yarn global add @adonisjs/cli
cp .env.example .env
adonis key:generate
sed -i -e "s/HOST=.*/HOST=0.0.0.0/g" .env
sed -i -e "s/DB_CONNECTION=.*/DB_CONNECTION=pg/g" .env
sed -i -e "s/DB_HOST=.*/DB_HOST=crypto-test-db.cbfos9h7uumt.us-west-2.rds.amazonaws.com/g" .env
sed -i -e "s/DB_PORT=.*/DB_PORT=5432/g" .env
sed -i -e "s/DB_USER=.*/DB_USER=master/g" .env
sed -i -e "s/DB_PASSWORD=.*/DB_PASSWORD=cryptoapi/g" .env
sed -i -e "s/DB_DATABASE=.*/DB_DATABASE=cryptoapi/g" .env
rm -rf .env-e
cd ../update-process
cp .env.example .env
sed -i -e "s/DB_USER=.*/DB_USER=master/g" .env
sed -i -e "s/DB_HOST=.*/DB_HOST=crypto-test-db.cbfos9h7uumt.us-west-2.rds.amazonaws.com/g" .env
sed -i -e "s/DB_DATABASE=.*/DB_DATABASE=cryptoapi/g" .env
sed -i -e "s/DB_PASSWORD=.*/DB_PASSWORD=cryptoapi/g" .env
rm -rf .env-e
cd ..
# docker-compose build
# docker-compose up -d