FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM node:22

WORKDIR /app

COPY --from=build /app/dist/web ./dist/web
COPY --from=build /app/package.json ./package.json

ENV PORT=4000

EXPOSE 4000

CMD ["node", "dist/web/server/server.mjs"]