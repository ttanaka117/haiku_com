FROM node:20

WORKDIR /server

COPY package.json ./
COPY nodemon.json ./
COPY tsconfig.json ./
RUN npm install

COPY .env ./
COPY src ./src/

CMD ["npm", "run", "start"]