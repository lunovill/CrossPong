# build step
FROM node:16.13.2-alpine as build

WORKDIR /app

COPY package*.json ./
COPY . . 

RUN npm install

EXPOSE 5173
EXPOSE 5174
EXPOSE 5175
EXPOSE 5176


CMD [ "npm", "run", "dev" ]
#ENTRYPOINT ["tail", "-f", "/dev/null"]