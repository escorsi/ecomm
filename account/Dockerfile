FROM node
WORKDIR /app-node-account
COPY package.json .
COPY . .
RUN npm install
EXPOSE 3001
ENTRYPOINT npm start
