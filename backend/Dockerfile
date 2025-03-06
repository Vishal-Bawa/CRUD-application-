FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x server.js
EXPOSE 5000
CMD ["node", "server.js"]

