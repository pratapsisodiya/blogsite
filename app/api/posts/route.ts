import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { neon } from "@neondatabase/serverless";
import { initDB } from "@/lib/db";

export async function POST(req: Request) {
  await initDB();
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, content, excerpt, category, imageUrl } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const sql = neon(process.env.DATABASE_URL!);

    // Insert post using tagged template literals
    const userEmail = session.user.email!;
    const finalExcerpt = excerpt || "";
    const finalCategory = category || "Uncategorized";
    const finalImageUrl = imageUrl || "";

    const result = await sql`
      INSERT INTO posts (title, slug, content, excerpt, category, image_url, author_id) 
      VALUES (${title}, ${slug}, ${content}, ${finalExcerpt}, ${finalCategory}, ${finalImageUrl}, (SELECT id FROM users WHERE email = ${userEmail})) 
      RETURNING id
    `;

    return NextResponse.json({ id: (result[0] as any).id, slug }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await initDB();
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const posts = await sql`SELECT * FROM posts ORDER BY published_at DESC`;
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
