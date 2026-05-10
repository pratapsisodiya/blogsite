"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Loader2, Edit3 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Static blogs matching the landing page
const STATIC_POSTS: Record<string, any> = {
  "art-of-minimalist-design": {
    title: "The Art of Modern Minimalist Design",
    content: `
      <p>Minimalism is not just about having less. It's about making sure that what you do have is meaningful and purposeful.</p>
      <p>In web design, this translates to clean typography, plenty of white space, and a clear visual hierarchy. When you remove the clutter, the message becomes the hero.</p>
      <h2>The Core Principles</h2>
      <ul>
        <li>Focus on functionality</li>
        <li>Intentional use of color</li>
        <li>Powerful typography</li>
      </ul>
      <p>By following these principles, we can create experiences that feel premium and effortless.</p>
    `,
    date: new Date().toLocaleDateString(),
    category: "Design",
    author: "Pratap"
  },
  "mastering-nextjs-15": {
    title: "Mastering Next.js 15 for Performance",
    content: `
      <p>Next.js 15 brings a host of new features that make building high-performance web applications easier than ever.</p>
      <p>From the new React Server Components to advanced caching strategies, the framework continues to lead the way in modern web development.</p>
      <h2>What's New?</h2>
      <p>The latest version focuses on developer experience and runtime performance. By leveraging the App Router effectively, you can achieve lightning-fast load times.</p>
    `,
    date: new Date().toLocaleDateString(),
    category: "Technology",
    author: "Pratap"
  },
  "future-of-serverless-db": {
    title: "The Future of Serverless Databases",
    content: `
      <p>Serverless databases like Neon are transforming how we manage data. No longer do we need to worry about provisioning or scaling—the database handles it for us.</p>
      <p>This post explores the shift towards serverless architecture and what it means for developers in 2026.</p>
    `,
    date: new Date().toLocaleDateString(),
    category: "Architecture",
    author: "Pratap"
  }
};

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        // Check static data first
        const staticPost = STATIC_POSTS[params.slug as string];
        if (staticPost) {
          setPost(staticPost);
          setLoading(false);
          return;
        }

        // Otherwise fetch from API
        const res = await fetch("/api/posts");
        if (res.ok) {
          const posts = await res.json();
          const found = posts.find((p: any) => p.slug === params.slug);
          if (found) {
            setPost({
              ...found,
              date: new Date(found.published_at).toLocaleDateString()
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="animate-spin w-8 h-8 text-gray-300" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-32 px-6 text-center">
        <h1 className="text-4xl font-serif font-bold mb-4 text-gray-900">Post Not Found</h1>
        <p className="text-gray-500 font-serif italic mb-8">It seems the page you are looking for does not exist.</p>
        <Link href="/" className="text-sm font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1">Return to Home</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto py-24 px-6">
      <header className="mb-16 text-center">
        <div className="flex items-center justify-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-6">
          <span>{post.date}</span>
          <span>•</span>
          <span className="text-gray-900">{post.category}</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-8 leading-tight">
          {post.title}
        </h1>
        {session?.user && (
          <div className="flex justify-center mb-10">
            <Link 
              href={`/posts/${params.slug}/edit`}
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all shadow-lg"
            >
              <Edit3 size={14} /> Edit This Post
            </Link>
          </div>
        )}
        {post.image_url && (
          <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
            <img src={post.image_url} alt={post.title} className="w-full h-auto object-cover" />
          </div>
        )}
        <div className="text-sm text-gray-500 font-serif italic">
          By {post.author || "Pratpa"}
        </div>
      </header>

      <div 
        className="prose prose-lg mx-auto text-gray-700 font-serif leading-relaxed whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <footer className="mt-24 pt-12 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <Link 
            href="/"
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-900 hover:text-gray-500 transition-colors"
          >
            <ChevronLeft size={16} /> Back to Blog
          </Link>
          <div className="flex gap-4">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Share:</span>
            <span className="text-xs uppercase tracking-widest text-gray-900 font-bold cursor-pointer hover:text-gray-500">Twitter</span>
            <span className="text-xs uppercase tracking-widest text-gray-900 font-bold cursor-pointer hover:text-gray-500">Facebook</span>
          </div>
        </div>
      </footer>
    </article>
  );
}
