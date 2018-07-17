FROM node:alpine
RUN npm install -g yarn
RUN npm install -g typescript
WORKDIR /app
COPY . /app
RUN yarn install
CMD ["yarn", "start"] 