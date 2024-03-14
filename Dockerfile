FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx tsc -p .
ENV MONGO_URL=mongodb://mongo:27017/
EXPOSE 3000
CMD [ "node", "./dist/src/index.js" ]