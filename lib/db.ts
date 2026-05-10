import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export const db = sql;

let isInitialized = false;

// Helper to initialize the database schema if needed
export async function initDB() {
  if (isInitialized) return;
  try {
    await sql`CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT, email TEXT UNIQUE NOT NULL, password TEXT, image TEXT)`;
    
    await sql`CREATE TABLE IF NOT EXISTS posts (id SERIAL PRIMARY KEY, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, content TEXT, excerpt TEXT, category TEXT, image_url TEXT, author_id INTEGER REFERENCES users(id), published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

    // Add default user Pratap
    await sql`INSERT INTO users (name, email, password) VALUES ('Pratap', 'pratap@blog.com', 'password123') ON CONFLICT (email) DO NOTHING`;

    // Add some static blog posts
    const welcomeTitle = "Welcome to My New Blog";
    const welcomeSlug = "welcome-to-my-new-blog";
    const welcomeContent = "This is the first post on my brand new WordPress-style blog! I'm excited to share my thoughts here.";
    const welcomeExcerpt = "The journey begins here.";
    const welcomeCategory = "Personal";

    const techTitle = "The Power of Next.js and Neon";
    const techSlug = "power-of-next-neon";
    const techContent = "Combining Next.js with Neon Postgres creates a powerful, scalable platform for modern web applications.";
    const techExcerpt = "Exploring the tech stack.";
    const techCategory = "Technology";

    await sql`INSERT INTO posts (title, slug, content, excerpt, category, author_id) VALUES (${welcomeTitle}, ${welcomeSlug}, ${welcomeContent}, ${welcomeExcerpt}, ${welcomeCategory}, (SELECT id FROM users WHERE email = 'pratap@blog.com')) ON CONFLICT (slug) DO NOTHING`;
    
    await sql`INSERT INTO posts (title, slug, content, excerpt, category, author_id) VALUES (${techTitle}, ${techSlug}, ${techContent}, ${techExcerpt}, ${techCategory}, (SELECT id FROM users WHERE email = 'pratap@blog.com')) ON CONFLICT (slug) DO NOTHING`;

    isInitialized = true;
    console.log("Neon Database initialized with static blogs and user Pratap");
  } catch (error) {
    console.error("Neon Database initialization failed:", error);
  }
}
