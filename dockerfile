# syntax=docker/dockerfile:1
FROM node:19-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . ./

EXPOSE $PORT
EXPOSE $JWT_KEY
EXPOSE $DB_HOST
EXPOSE $DB_PORT
EXPOSE $DB_USER
EXPOSE $DB_PASSS
EXPOSE $DB_NAME

CMD ["npm", "start"]
