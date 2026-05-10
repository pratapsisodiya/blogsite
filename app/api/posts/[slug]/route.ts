import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { initDB, getSql } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await initDB();
  const { slug } = await params;

  try {
    const sql = getSql();
    const result = await sql`SELECT * FROM posts WHERE slug = ${slug}`;
    
    if (result.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await initDB();
  const session = await auth();
  const { slug: currentSlug } = await params;

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

    // Generate new slug if title changed (optional, but consistent)
    const newSlug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const sql = getSql();
    
    // Check if post exists and user is owner (or just allow if logged in for this "God Editor")
    // For now, let's just allow if logged in, as per the "God Editor" theme.
    
    const result = await sql`
      UPDATE posts 
      SET title = ${title}, 
          slug = ${newSlug}, 
          content = ${content}, 
          excerpt = ${excerpt || ""}, 
          category = ${category || "Uncategorized"}, 
          image_url = ${imageUrl || ""}
      WHERE slug = ${currentSlug}
      RETURNING id, slug
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await initDB();
  const session = await auth();
  const { slug } = await params;

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sql = getSql();
    await sql`DELETE FROM posts WHERE slug = ${slug}`;
    
    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
