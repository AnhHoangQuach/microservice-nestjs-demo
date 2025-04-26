FROM node:20.12.0-alpine
RUN npm install -g pnpm
RUN mkdir -p /var/www/product-service
WORKDIR /var/www/product-service
ADD . /var/www/product-service
RUN pnpm install
CMD pnpm run build && pnpm run start:prod
