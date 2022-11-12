FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY nest-cli.json ./
COPY src ./src
COPY prisma ./
COPY test ./test

RUN yarn --production=true

COPY . .

RUN yarn build

EXPOSE 8081

CMD ["npm", "start"]