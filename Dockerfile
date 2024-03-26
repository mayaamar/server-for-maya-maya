FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx tsc -p .


FROM node:20-alpine
WORKDIR /app
COPY package*.json .
COPY --from=build app/dist .
RUN npm install --omit
EXPOSE 3000
CMD [ "node", "./src/index.js" ]