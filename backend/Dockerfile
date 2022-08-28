FROM node:16.16.0

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install typescript --location=global
RUN npm install

COPY . .

RUN tsc

EXPOSE 4444

CMD ["npm", "run", "start"]