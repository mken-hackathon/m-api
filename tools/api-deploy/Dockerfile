FROM node:6.10-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN npm i -g serverless@1.21.1
COPY ./sls-deploy.sh /bin/
