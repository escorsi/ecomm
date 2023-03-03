FROM node
WORKDIR /app-node-order
COPY package.json .
COPY . .
RUN npm install
EXPOSE 3002
ENTRYPOINT npm start