FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

ARG gitUser
ARG gitToken

ENV GITHUB_USERNAME=${gitUser}
ENV GITHUB_USER_ACCESS_TOKEN=${gitToken}

COPY . .

RUN npm run-script build

EXPOSE 3000

CMD ["npm", "start"]

