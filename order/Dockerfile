FROM node
WORKDIR /app-node-order
COPY package.json .
COPY . .
RUN npm install
EXPOSE 3004
ENTRYPOINT npm start