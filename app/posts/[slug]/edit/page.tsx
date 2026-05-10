"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Save as SaveIcon, ChevronLeft as ChevronLeftIcon, Loader, Trash2 } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";

const EditPostPage = () => {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${params.slug}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        
        setTitle(data.title);
        setContent(data.content);
        setExcerpt(data.excerpt || "");
        setCategory(data.category || "");
        setImageUrl(data.image_url || "");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    if (params.slug) {
      fetchPost();
    }
  }, [params.slug, status, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let currentImageUrl = imageUrl;

      if (image) {
        const response = await fetch(
          `/api/upload?filename=${encodeURIComponent(image.name)}`,
          {
            method: "POST",
            body: image,
          }
        );

        if (!response.ok) throw new Error("Image upload failed");
        const blob = await response.json();
        currentImageUrl = blob.url;
      }

      const res = await fetch(`/api/posts/${params.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          category: category || "Uncategorized",
          imageUrl: currentImageUrl,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update post");
      }

      const updatedPost = await res.json();
      router.push(`/posts/${updatedPost.slug}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${params.slug}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete post");
      
      router.push("/");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-gray-300 w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white transition-colors">
      <div className="max-w-3xl mx-auto py-12 px-6">
        <div className="flex justify-between items-center mb-12">
          <Link 
            href={`/posts/${params.slug}`}
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
          >
            <ChevronLeftIcon size={14} className="mr-1" /> Back to Post
          </Link>
          
          <button 
            onClick={handleDelete}
            className="text-red-400 hover:text-red-600 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Title Area */}
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            rows={1}
            className="w-full text-5xl md:text-6xl font-serif font-black border-none focus:ring-0 placeholder-gray-100 bg-transparent resize-none overflow-hidden p-0 text-gray-900"
            required
            onInput={(e: any) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />

          {/* Meta Info */}
          <div className="flex flex-col md:flex-row gap-6 border-y border-gray-50 py-6">
            <div className="flex-1">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-300 mb-2">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Story, Tech, Design..."
                className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-gray-600"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-300 mb-2">Image</label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-serif italic text-gray-400 hover:text-black transition-colors"
              >
                {image ? image.name : (imageUrl ? "Change featured image +" : "Add a featured image +")}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>

          {/* Editor */}
          <div className="min-h-[500px]">
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          {error && <p className="text-red-500 text-sm font-serif italic">{error}</p>}

          {/* Action Bar */}
          <div className="fixed bottom-12 right-12 z-50">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
              title="Update Post"
            >
              {loading ? <Loader className="animate-spin text-white" /> : <SaveIcon size={24} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
