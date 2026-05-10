"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Send as SendIcon, ChevronLeft as ChevronLeftIcon, Loader } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";

const CreatePostPage = () => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

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
      let imageUrl = "";

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
        imageUrl = blob.url;
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          category: category || "Uncategorized",
          imageUrl,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create post");
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white transition-colors">
      <div className="max-w-3xl mx-auto py-12 px-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black mb-12 transition-colors"
        >
          <ChevronLeftIcon size={14} className="mr-1" /> Back
        </Link>

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
                {image ? image.name : "Add a featured image +"}
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
              title="Publish Post"
            >
              {loading ? <Loader className="animate-spin text-white" /> : <SendIcon size={24} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
