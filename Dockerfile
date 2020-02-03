FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run-script build

RUN npm run-script test

EXPOSE 3000

CMD ["npm", "start"]

