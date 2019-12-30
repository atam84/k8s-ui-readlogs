FROM node:lts-alpine

WORKDIR /app_source
COPY . /app_source
ENV METEOR_ALLOW_SUPERUSER=1

RUN apk add --update --no-cache bash curl build-base
RUN curl https://install.meteor.com/ | sh
RUN pwd && \
    ls && \
    id && \
    which node
RUN npm install
RUN meteor npm install
RUN meteor build --directory /app



FROM node:lts-alpine

COPY --from=0 /app /app
WORKDIR /app

RUN (cd /app/bundle/programs/server && npm install)
EXPOSE 8080
CMD []
ENV PORT 8080
ENV BIND_IP 0.0.0.0
ENV ROOT_URL http://localhost
ENTRYPOINT /usr/local/bin/node main.js
