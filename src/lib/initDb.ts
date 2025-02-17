// src/lib/initDb.ts
import { createTables } from './db';  // db.ts에서 createTables 함수 가져오기

createTables();

console.log('✅ 데이터베이스 초기화 완료!');
