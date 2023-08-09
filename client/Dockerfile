FROM node:18.14.2 as build

LABEL version="1.0"
LABEL description="Front End Docker Image Kagwave.com - React"
LABEL maintainer = ["contact@kagwave.com"]

WORKDIR /client

COPY package*.json .

RUN npm install 

COPY . ./

#CMD ["npm", "run", "build"]
RUN npm run build


FROM nginx:latest
EXPOSE 80
COPY ./nginx.conf /etc/nginx.conf
COPY --from=build /client/build /usr/share/nginx/html
