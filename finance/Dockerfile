FROM node
WORKDIR /app-node-finance
COPY package.json .
COPY . .
RUN npm install
EXPOSE 3003
ENTRYPOINT npm start
