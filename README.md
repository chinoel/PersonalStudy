# Study Program
#### This is a web-based word study designed for language study purposes.

## Setup
- Database : sqlite
- Front, Back Server : Next.js

## Terms of Use
- This server is not suitable for multiple users. Use it as a private server.
- There are no user accounts by default. Please temporarily activate the membership registration function in the source code and use it after signing up.
- Add additional security rules yourself. Not provided by default.

## purpose
- Created to study English and Japanese. The functions of PC and mobile are different.
- You can add things like typing practice, memorizing words, etc., and I don't think you will have any trouble using it.

## Start
- yarn
- yarn build
- yarn start

## Make Database
- DB was not initially created. So you have to use it after creating it.
- npx tsx src/lib/initDb.ts

## Help Code
1️⃣ .env 파일 설정
2️⃣ schema.prisma에서 MySQL 지정
3️⃣ npx prisma db pull 실행 (DB에서 테이블 불러오기)
4️⃣ npx prisma generate 실행 (Prisma Client 생성)