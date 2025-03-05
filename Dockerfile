# 1. Dependencies
FROM node:20.10.0-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# 2. Build stage
FROM node:20.10.0-alpine AS builder

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

# 민감한 데이터는 ARG나 ENV로 전달하지 않음
RUN npx prisma generate
RUN yarn build

# 3. Run stage
FROM node:20.10.0-alpine AS runner

WORKDIR /usr/src/app

COPY --from=builder --chown=nextjs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

EXPOSE 3000

# JWT_SECRET와 DATABASE_URL은 환경 변수로 런타임 시 전달
CMD ["yarn", "start"]
