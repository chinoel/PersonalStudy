// src/lib/db.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'better-sqlite3';
import bcrypt from 'bcryptjs';

// 데이터베이스 경로 설정 (database/ 폴더에 저장)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databaseDir = path.resolve(__dirname, '../../database');
const dbPath = path.resolve(databaseDir, 'app.db');

// database 디렉토리가 없으면 생성
if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir);
}

// better-sqlite3로 데이터베이스 연결
const db = sqlite3(dbPath);

// 테이블 생성 함수
function createTables(): void {
  // 사용자 (로그인 관련) 테이블
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        display_name TEXT NOT NULL
    )
  `).run();

  // 학습 콘텐츠 테이블
  db.prepare(`
    CREATE TABLE IF NOT EXISTS learning_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL,
        level INTEGER NOT NULL,
        word TEXT NOT NULL,
        meaning TEXT NOT NULL,
        sentence TEXT,
        sentence_meaning TEXT,
        language_code TEXT NOT NULL
    )
  `).run();

  // 학습 진행 상태 테이블
  db.prepare(`
    CREATE TABLE IF NOT EXISTS learning_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        content_id INTEGER NOT NULL,
        progress_level INTEGER NOT NULL,
        completed BOOLEAN NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (content_id) REFERENCES learning_content(id)
    )
  `).run();

  // 관리자 테이블
  db.prepare(`
    CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,  -- 관리자의 사용자 ID
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `).run();

}

function createAdminUser() {
  const existingAdmin = db.prepare(`SELECT * FROM admins`).get();

  if (!existingAdmin) {
    const password = "admin";
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = db.prepare(`
      INSERT INTO users (username, password, display_name)
      VALUES (?, ?, ?)
      `).run('admin', hashedPassword, 'Administrator').lastInsertRowid;

    db.prepare(`
      INSERT INTO admins (user_id)
      VALUES (?)
      `).run(userId);

    console.log('✅ 관리자 계정 생성 완료!');
  }
}

// 데이터베이스 연결 객체와 테이블 생성 함수 반환
export { db, createTables, createAdminUser };
