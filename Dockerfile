From node:6-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json /app/package.json

RUN npm install
