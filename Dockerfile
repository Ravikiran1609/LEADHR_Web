FROM node:14

WORKDIR /app

COPY backend/package*.json ./
RUN npm install
COPY backend/ .

COPY frontend/ /app/public

RUN npm install -g serve

EXPOSE 3000

CMD ["node", "server.js"]
