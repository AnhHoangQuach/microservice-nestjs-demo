FROM node:16.16.0-alpine
RUN npm install -g pnpm
RUN mkdir -p /var/www/token-service
WORKDIR /var/www/token-service
ADD . /var/www/token-service
RUN npm install
CMD npm run build && npm run start:prod
