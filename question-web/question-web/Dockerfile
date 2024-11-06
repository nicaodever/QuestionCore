FROM trion/ng-cli:10.2.0 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

FROM nginx:alpine

COPY --from=builder /app/dist/question-web /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]