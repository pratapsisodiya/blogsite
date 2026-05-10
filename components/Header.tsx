"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User as UserIcon, Menu, X } from "lucide-react";

const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all">
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
          <div className="hidden md:flex items-center space-x-6">
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

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full left-0 animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col p-8 space-y-6 text-sm font-bold uppercase tracking-widest text-gray-500">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-black">Home</Link>
            {session?.user && (
              <Link href="/posts/create" onClick={() => setIsMenuOpen(false)} className="hover:text-black">Write</Link>
            )}
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-black">About</Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-black">Contact</Link>
            
            <div className="pt-6 border-t border-gray-50">
              {session?.user ? (
                <div className="flex flex-col space-y-4">
                  <span className="text-sm font-serif italic text-gray-600">Hi, {session.user.name || "Pratap"}</span>
                  <button 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-red-500"
                  >
                    Exit
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-black"
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
