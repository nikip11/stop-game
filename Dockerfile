FROM node:lts AS development
ENV NODE_ENV development
ENV NODE_OPTIONS --openssl-legacy-provider


RUN npm install -g vite

WORKDIR /app