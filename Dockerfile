FROM node:latest
MAINTAINER zhoujundi <zhoujundi711@163.com>

WORKDIR /app
VOLUME /app
ADD * /app

EXPOSE 80
ENTRYPOINT ["bash", "npm run dev"]
CMD []
