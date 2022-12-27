FROM node:19-alpine3.15

ARG NODE_ENV
ARG PORT

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

ENV TZ=America/Manaus
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY package.json yarn.lock ./

COPY . ./

RUN yarn --prod --silent
RUN npx prisma generate
RUN yarn build

EXPOSE ${PORT}

CMD ["yarn", "start"]
