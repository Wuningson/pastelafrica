FROM node:16.16.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --production

RUN npm install serve --location=global

EXPOSE 3000

CMD serve -s build
