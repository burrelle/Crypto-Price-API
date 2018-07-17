FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Typescript
RUN npm install -g yarn

# Install app dependencies
COPY package*.json ./

RUN yarn install -s
# Bundle app source
COPY . .

CMD [ "yarn", "start" ]