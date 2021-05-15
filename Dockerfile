FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN npm install
RUN apk add --no-cache make gcc g++ python && \
  npm install && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python
COPY . .
EXPOSE 3300
CMD ["npm", "start"]
