FROM node:alpine

WORKDIR /app/frontend

COPY package*.json ./

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
