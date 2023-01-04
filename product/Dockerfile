FROM node:14
WORKDIR /app-node-product
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install
ENTRYPOINT npm start
