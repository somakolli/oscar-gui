FROM node AS builder
COPY . /oscar-gui
WORKDIR /oscar-gui
RUN rm package-lock.json; exit 0
RUN yarn install
RUN $(npm bin)/ng build --prod
RUN ls dist/oscar-gui

FROM nginx:1.15.6-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder oscar-gui/dist/oscar-gui/ /usr/share/nginx/html
RUN ls /usr/share/nginx/html
COPY --from=builder oscar-gui/nginx.conf /etc/nginx/nginx.conf
RUN cat /etc/nginx/nginx.conf
