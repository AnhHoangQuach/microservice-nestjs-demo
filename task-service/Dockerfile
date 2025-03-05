FROM node:20.12.0-alpine
RUN npm install -g pnpm
RUN mkdir -p /var/www/task-service
WORKDIR /var/www/task-service
ADD . /var/www/task-service
RUN pnpm install
CMD pnpm run build && pnpm run start:prod
