FROM node:latest
MAINTAINER zhoujundi <zhoujundi711@163.com>

WORKDIR /app
VOLUME /app
ADD / /app

EXPOSE 8000
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
CMD npm run dev
