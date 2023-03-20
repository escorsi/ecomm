FROM node
WORKDIR /app-node-gateway
COPY package.json .
COPY . .
RUN npm install
EXPOSE 3004
ENTRYPOINT npm start
