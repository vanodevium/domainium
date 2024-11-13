FROM node:20-alpine

WORKDIR /app

COPY ./ ./

RUN npm ci --no-audit && npm cache clean --force

CMD ["node", "server.js"]
