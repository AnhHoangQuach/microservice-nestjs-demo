FROM node:20.12.0-alpine
RUN npm install -g pnpm
RUN mkdir -p /var/www/gateway
WORKDIR /var/www/gateway
ADD . /var/www/gateway
RUN pnpm install
CMD pnpm run build && pnpm run start:prod
