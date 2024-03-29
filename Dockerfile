FROM node:18

WORKDIR /usr/src
COPY . .

RUN yarn install && \
    yarn dist && \
    mkdir -p /usr/app/dist && \
    cp -r ./dist /usr/app/ && \
    cp ./package.json /usr/app/package.json

WORKDIR /usr/app

RUN yarn --production && \
    rm -rf /usr/src

CMD ["yarn", "start"]
