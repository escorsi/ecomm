FROM node:14
WORKDIR /app-node-account
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install
ENTRYPOINT npm start
