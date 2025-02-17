import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const users = db.prepare("SELECT * FROM users").all();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const { name, email } = await req.json();
  const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
  const result = stmt.run(name, email);
  return NextResponse.json({ id: result.lastInsertRowid, name, email }, { status: 201 });
}
