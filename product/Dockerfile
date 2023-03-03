FROM node
WORKDIR /app-node-product
COPY package.json .
COPY . .
RUN npm install
EXPOSE 3000
ENTRYPOINT npm start
