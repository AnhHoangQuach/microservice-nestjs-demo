FROM node:20.12.0-alpine
RUN npm install -g pnpm
RUN mkdir -p /var/www/order-service
WORKDIR /var/www/order-service
ADD . /var/www/order-service
RUN pnpm install
CMD pnpm run build && pnpm run start:prod
