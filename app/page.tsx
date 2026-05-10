"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

// Static blogs as requested
const STATIC_POSTS = [
  {
    id: "static-1",
    title: "The Art of Modern Minimalist Design",
    slug: "art-of-minimalist-design",
    excerpt: "Why less is often more when it comes to creating premium web experiences.",
    category: "Design",
    published_at: new Date().toISOString(),
    author: "Pratap"
  },
  {
    id: "static-2",
    title: "Mastering Next.js 15 for Performance",
    slug: "mastering-nextjs-15",
    excerpt: "A deep dive into the latest features and optimizations in the Next.js ecosystem.",
    category: "Technology",
    published_at: new Date().toISOString(),
    author: "Pratap"
  },
  {
    id: "static-3",
    title: "The Future of Serverless Databases",
    slug: "future-of-serverless-db",
    excerpt: "How Neon and other providers are changing the way we think about data at scale.",
    category: "Architecture",
    published_at: new Date().toISOString(),
    author: "Pratap"
  }
];

export default function Home() {
  const [posts, setPosts] = useState<any[]>(STATIC_POSTS); // Default to static data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setPosts([...STATIC_POSTS, ...data]); // Combine static and dynamic
          }
        }
      } catch (error) {
        console.error("Failed to fetch posts, showing static content only:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="animate-spin w-8 h-8 text-gray-300" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <div className="space-y-24">
        {posts.map((post) => (
          <article key={post.id} className="group">
            <header className="mb-6">
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-3">
                <span>{new Date(post.published_at).toLocaleDateString()}</span>
                <span>•</span>
                <span className="text-gray-900">{post.category}</span>
              </div>
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                  {post.title}
                </h2>
              </Link>
            </header>
            <div className="text-gray-600 font-serif text-lg leading-relaxed mb-8">
              <p>{post.excerpt || post.content.substring(0, 150) + "..."}</p>
            </div>
            <footer className="flex items-center justify-between">
              <Link 
                href={`/posts/${post.slug}`}
                className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b-2 border-black pb-1 hover:border-gray-400 transition-colors"
              >
                Continue Reading
              </Link>
              <span className="text-xs font-serif italic text-gray-400">By {post.author || "Pratpa"}</span>
            </footer>
          </article>
        ))}
      </div>

      <div className="mt-24 pt-12 border-t border-gray-100 flex justify-between items-center text-sm font-bold uppercase tracking-widest">
        <button className="text-gray-300 cursor-not-allowed">← Newer Posts</button>
        <button className="hover:text-gray-400 transition-colors">Older Posts →</button>
      </div>
    </div>
  );
}
