# 1. Dependencies
FROM node:20.10.0-alpine AS deps

# 필요한 패키지 설치 (예: libc6-compat)
RUN apk add --no-cache libc6-compat

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 파일 복사
COPY package.json yarn.lock ./

# yarn을 사용해 의존성 설치
RUN yarn install --frozen-lockfile

# 2. Build stage
FROM node:20.10.0-alpine AS builder

# 환경 변수 설정
ARG JWT_SECRET
ARG DATABASE_URL

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# node_modules와 소스 코드 복사
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

# 환경 변수 전달
ENV JWT_SECRET=$JWT_SECRET
ENV DATABASE_URL=$DATABASE_URL

# Prisma generate 실행
RUN npx prisma generate

# 3. Run stage
FROM node:20.10.0-alpine AS runner

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 빌드 결과물 복사
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./ 
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

# 3000 포트 열기
EXPOSE 3000

# 애플리케이션 실행
CMD ["yarn", "start"]
