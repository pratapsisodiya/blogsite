import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto py-24 px-6">
      <header className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-8 leading-tight">
          About Us
        </h1>
        <div className="h-1 bg-black w-20 mx-auto"></div>
      </header>

      <div className="prose prose-lg mx-auto text-gray-700 font-serif leading-relaxed">
        <p>
          Welcome to <strong>The Daily Blog</strong>, a space dedicated to sharing insightful stories, technical guides, and personal reflections. 
          Our mission is to provide a clean, focused reading experience that puts the content first—just like the classic blogs of the early web.
        </p>
        
        <h2>Our Vision</h2>
        <p>
          We believe that in an age of digital noise, there is still immense value in long-form writing and thoughtful analysis. 
          Whether we're exploring the latest in web development or sharing a travel diary, we aim to deliver quality over quantity.
        </p>

        <h2>Why WordPress Style?</h2>
        <p>
          There's a reason WordPress has powered over 40% of the web for decades. Its focus on typography and hierarchy makes it the 
          gold standard for publishing. We've recreated that timeless aesthetic using modern technologies like Next.js, Neon Postgres, and Tailwind CSS.
        </p>

        <p className="mt-12 italic text-gray-500">
          Thank you for being part of our journey. Happy reading!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
