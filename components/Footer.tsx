import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-16 px-6 border-t border-gray-100 bg-gray-50 mt-20">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-gray-500">
        <div className="text-center md:text-left">
          <p className="font-serif italic">&copy; {new Date().getFullYear()} The Daily Blog</p>
        </div>
        <div className="flex items-center space-x-6 uppercase tracking-widest text-[10px] font-bold">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Cookies</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>Proudly powered by</span>
          <a href="#" className="font-bold text-gray-800 hover:underline">WordPress</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
