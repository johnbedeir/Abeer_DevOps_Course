FROM node:latest

WORKDIR /app

COPY . /app/

RUN npm init -y && \
  npm install express 

EXPOSE 5000

CMD ["node","app.js"]
