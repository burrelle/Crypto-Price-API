#!/bin/bash
yarn global add @adonisjs/cli
cp .env.example .env
adonis key:generate
sed -i -e "s/HOST=.*/HOST=0.0.0.0/g" .env
sed -i -e "s/DB_CONNECTION=.*/DB_CONNECTION=pg/g" .env
sed -i -e "s/DB_HOST=.*/DB_HOST=localhost/g" .env
sed -i -e "s/DB_PORT=.*/DB_PORT=5432/g" .env
sed -i -e "s/DB_USER=.*/DB_USER=postgres/g" .env
sed -i -e "s/DB_PASSWORD=.*/DB_PASSWORD=postgres/g" .env
yarn install
docker-compose build
docker-compose up -d
psql -h localhost -U postgres -c "CREATE DATABASE adonis"
adonis migration:run
adonis seed
IP_ADDRESS=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' adonis_postgres_1)
docker-compose down
sed -i -e "s/DB_HOST=.*/DB_HOST=$IP_ADDRESS/g" .env
docker-compose up -d