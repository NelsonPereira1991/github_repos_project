FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

ENV GITHUB_USERNAME="NelsonPereira1991"

COPY . .

RUN npm run-script build

EXPOSE 3000

CMD ["npm", "start"]

