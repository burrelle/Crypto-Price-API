FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Typescript
RUN npm install -g typescript

# Install app dependencies
COPY package*.json ./

RUN npm install -s
# Bundle app source
COPY . .

CMD [ "npm", "start" ]