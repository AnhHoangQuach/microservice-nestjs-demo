FROM node:16.16.0-alpine
RUN npm install -g pnpm
RUN mkdir -p /var/www/user-service
WORKDIR /var/www/user-service
ADD . /var/www/user-service
RUN pnpm install
CMD pnpm run build && pnpm run start:prod
