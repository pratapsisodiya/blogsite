"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User as UserIcon } from "lucide-react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-serif font-black tracking-tighter hover:opacity-70 transition-opacity">
            THE DAILY BLOG
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 text-[11px] uppercase tracking-[0.2em] font-bold text-gray-500">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            {session?.user && (
              <Link href="/posts/create" className="hover:text-black transition-colors">Write</Link>
            )}
            <Link href="/about" className="hover:text-black transition-colors">About</Link>
            <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-6">
          {session?.user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-serif italic text-gray-600">Hi, {session.user.name || "Pratap"}</span>
              <button 
                onClick={() => signOut()}
                className="text-xs font-bold uppercase tracking-widest hover:text-red-500 transition-colors"
              >
                Exit
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-all"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
