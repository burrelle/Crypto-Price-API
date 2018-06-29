# Adonis API

## Getting started
Install Docker
Install Postgresql

## Install
Install node dependencies
```
npm install 
```

## Start container
To run application in container
```
docker-compose up --build
```
Create database
```
psql -h localhost -U postgres
CREATE DATABASE adonis;
```
Run migrations
```
adonis migration:run
```