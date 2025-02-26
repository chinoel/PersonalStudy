FROM node:20.10.0-alpine AS deps
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

# 2
FROM node:20.10.0-alpine AS builder

ARG JWT_SECRET
ARG DATABASE_URL

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

ENV JWT_SECRET=$JWT_SECRET
ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma generate

RUN yarn build

#3
FROM node:20.10.0-alpine AS runner

WORKDIR /usr/src/app
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

EXPOSE 3000

CMD ["yarn", "start"]