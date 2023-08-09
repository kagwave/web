FROM node:18.14.2

LABEL version="1.0"
LABEL description="Backend Docker Image Gamewe Web - Node"
LABEL maintainer = ["contact@gamewe.world"]

WORKDIR /server/src/services/api

COPY package*.json .
RUN ls
RUN npm install

COPY . .

EXPOSE 8240

CMD ["npm", "start"];