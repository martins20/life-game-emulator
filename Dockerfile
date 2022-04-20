FROM node:alpine

WORKDIR /usr/life-game-emulator/api

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]

# EXPOSE 3333