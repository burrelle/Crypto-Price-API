FROM node:alpine
RUN npm install -g yarn
WORKDIR /app
COPY .env /app
EXPOSE ${PORT}
COPY package.json /app
RUN yarn install
COPY . /app
CMD ["yarn", "start"] 