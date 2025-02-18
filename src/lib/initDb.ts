// src/lib/initDb.ts
import { createAdminUser, createTables } from './db';  // db.ts에서 createTables 함수 가져오기

createTables();
createAdminUser();

console.log('✅ 데이터베이스 초기화 완료!');
