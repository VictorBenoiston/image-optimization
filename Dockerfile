FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-scripts

COPY . .

ENV PORT=3000

RUN yarn postinstall

EXPOSE 3000

CMD ["yarn", "start"]

