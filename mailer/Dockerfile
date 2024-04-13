FROM node:16.16.0-alpine
RUN npm install -g pnpm
RUN mkdir -p /var/www/mailer
WORKDIR /var/www/mailer
ADD . /var/www/mailer
RUN pnpm install
CMD pnpm run build && pnpm run start:prod
