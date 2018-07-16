FROM node:alpine
RUN npm install -g yarn
RUN npm install -g typescript
WORKDIR /app
COPY .env /app
COPY package.json /app
RUN yarn install
COPY . /app
CMD ["yarn", "start"] 