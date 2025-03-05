FROM node:20.12.0-alpine
RUN npm install -g pnpm
RUN mkdir -p /var/www/permission-service
WORKDIR /var/www/permission-service
ADD . /var/www/permission-service
RUN pnpm install
CMD pnpm run build && pnpm run start:prod
