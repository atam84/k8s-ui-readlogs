FROM ubuntu:16.04

WORKDIR /app/src
ENV METEOR_ALLOW_SUPERUSER=1
ENV APP_SOURCE /app/src
ENV APP_BASE_DIR /app
ENV APP_BUNDLE_DIR /app/bundle

RUN apt-get update && \
    apt-get -y install curl git  && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y nodejs g++ gcc python make build-essential && \
    curl https://install.meteor.com/ | sh  && \
    git clone https://github.com/atam84/k8s-ui-readlogs.git .  && \
    git checkout current-dev && \
    meteor npm install  && \
    meteor build --allow-superuser --directory ${APP_BASE_DIR} && \
    (cd ${APP_BUNDLE_DIR}/programs/server && npm install --production) && \
    apt-get autoclean && \
    npm cache clear --force && \
    apt-get --purge autoremove curl git -y && \
    rm -rf ${APP_SOURCE} && \
    rm -rf ~/.meteor && rm /usr/local/bin/meteor && \
    rm -rf /var/lib/apt/lists/*
    


FROM node:10-alpine

ENV PORT 8080
ENV BIND_IP 0.0.0.0
ENV ROOT_URL http://localhost/

RUN apk add bash && \
    mkdir -p ~/.kube

COPY --from=0 /app/bundle /app

WORKDIR /app
EXPOSE 8080
CMD []
ENTRYPOINT [ "/usr/local/bin/node", "/app/main.js" ]
#COPY --from=nginx:latest /etc/nginx/nginx.conf /nginx.conf
