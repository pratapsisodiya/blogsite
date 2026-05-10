import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { initDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await initDB();
  try {
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);

    // Check if user exists using tagged template literals
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})`;

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
